'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { clearPersistedCache, queryClientSingleton } from '@/providers/QueryProvider';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? '';
const AUTH_CACHE_KEY = 'zhi_auth_user';

type UserRole = 'super_admin' | 'school_admin' | 'parent' | 'student';

export type AuthUser = {
  id: string;
  email: string | null;
  role: UserRole;
  profileId: string;
  schoolId?: string | null;
  name: string;
};

type AuthResponse = {
  user?: AuthUser;
  error?: string;
};

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<AuthUser | null>;
  registerParent: (payload: { name: string; email: string; password: string; phone?: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function loadCachedUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(AUTH_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveCachedUser(user: AuthUser | null) {
  if (typeof window === 'undefined') return;
  try {
    if (user) sessionStorage.setItem(AUTH_CACHE_KEY, JSON.stringify(user));
    else sessionStorage.removeItem(AUTH_CACHE_KEY);
  } catch {}
}

async function api(path: string, options: RequestInit = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  return fetch(`${API_BASE}${path}`, { credentials: 'include', ...options, headers });
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => loadCachedUser());
  const [loading, setLoading] = useState(() => !loadCachedUser());
  const [error, setError] = useState<string | null>(null);

  const refreshUser = async () => {
    setError(null);
    try {
      const res = await api('/api/auth/me');
      if (!res.ok) {
        if (res.status === 401 && typeof window !== 'undefined') {
          // Session is truly expired — show modal (don't immediately clear user) if they were logged in
          if (loadCachedUser()) {
            setSessionExpired(true);
          }
          setLoading(false);
          return;
        }
        saveCachedUser(null);
        setUser(null);
        setLoading(false);
        return;
      }
      const data = (await res.json()) as AuthResponse & { plan_expired?: boolean };
      if (data.plan_expired) {
        const locale = typeof window !== 'undefined'
          ? (window.location.pathname.split('/')[1] || 'en')
          : 'en';
        const role = data.user?.role;
        // Don't hard-logout: let them reach the upgrade/payment page
        if (role === 'parent') {
          if (data.user) saveCachedUser(data.user);
          setUser(data.user ?? null);
          const isAllowedPath = window.location.pathname.includes('/parent/plans') || 
                               (window.location.pathname.includes('/parent/profile') && window.location.search.includes('tab=plans'));
          if (typeof window !== 'undefined' && !isAllowedPath) {
            window.location.href = `${window.location.origin}/${locale}/parent/profile?tab=plans&trial_expired=1`;
          }
          setLoading(false);
          return;
        } else if (role === 'school_admin') {
          if (data.user) saveCachedUser(data.user);
          setUser(data.user ?? null);
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/school-admin/payments')) {
            window.location.href = `${window.location.origin}/${locale}/school-admin/payments?trial_expired=1`;
          }
          setLoading(false);
          return;
        }
        // Fallback: hard logout for other roles
        saveCachedUser(null);
        setUser(null);
        window.location.href = `${window.location.origin}/${locale}/login?expired=1`;
        return;
      }
      if (data.user) saveCachedUser(data.user);
      setUser(data.user ?? null);
    } catch {
      // Network error — keep cached user, don't force logout
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      const data = (await res.json()) as AuthResponse & { access_token?: string; refresh_token?: string; plan_expired?: boolean };
      if (!res.ok) { setError(data.error || 'Login failed'); return null; }
      if (!data.user) { setError('Login failed'); return null; }
      saveCachedUser(data.user);
      clearPersistedCache();
      setUser(data.user);
      
      if (data.plan_expired) {
        const locale = typeof window !== 'undefined'
          ? (window.location.pathname.split('/')[1] || 'en')
          : 'en';
        if (data.user.role === 'parent') {
          window.location.href = `${window.location.origin}/${locale}/parent/profile?tab=plans&trial_expired=1`;
          return data.user;
        } else if (data.user.role === 'school_admin') {
          window.location.href = `${window.location.origin}/${locale}/school-admin/payments?trial_expired=1`;
          return data.user;
        }
      }
      // Warm admin or student cache immediately after login
      if (data.user.role === 'super_admin') {
        Promise.all([
          import('@/core/services/adminApi'),
          import('@/core/constants/queryKeys'),
        ]).then(([{ adminApi }, { adminKeys }]) => {
          const qc = queryClientSingleton;
          qc.prefetchQuery({ queryKey: adminKeys.dashboard, queryFn: adminApi.dashboard, staleTime: 60000 });
          qc.prefetchQuery({ queryKey: adminKeys.paymentsStats, queryFn: adminApi.paymentsStats, staleTime: 60000 });
          qc.prefetchQuery({ queryKey: adminKeys.paymentsTab('approvals'), queryFn: adminApi.paymentsApprovals, staleTime: 60000 });
          qc.prefetchQuery({ queryKey: adminKeys.students, queryFn: adminApi.students, staleTime: 60000 });
          qc.prefetchQuery({ queryKey: adminKeys.schoolDirectory, queryFn: adminApi.schoolDirectory, staleTime: 60000 });
          qc.prefetchQuery({ queryKey: adminKeys.plans, queryFn: adminApi.paymentsPlans, staleTime: 60000 });
        }).catch(() => {});
      } else if (data.user.role === 'school_admin') {
        // School admin cache warming can be added here if needed, avoiding super admin routes
      } else if (data.user.role === 'student') {
        Promise.all([
          import('@/core/services/studentApi'),
        ]).then(([{ studentApi, studentKeys }]) => {
          const qc = queryClientSingleton;
          qc.prefetchQuery({ queryKey: studentKeys.me, queryFn: studentApi.getMe, staleTime: 10 * 60 * 1000 });
          qc.prefetchQuery({ queryKey: studentKeys.dashboard, queryFn: studentApi.getDashboard, staleTime: 5 * 60 * 1000 });
          qc.prefetchQuery({ queryKey: studentKeys.lessons, queryFn: studentApi.getLessons, staleTime: 5 * 60 * 1000 });
        }).catch(() => {});
      } else if (data.user.role === 'parent') {
        Promise.all([
          import('@/core/services/parentApi'),
          import('@/core/constants/queryKeys'),
        ]).then(async ([{ parentApi }, { parentKeys }]) => {
          const qc = queryClientSingleton;
          qc.prefetchQuery({ queryKey: parentKeys.me, queryFn: parentApi.me, staleTime: 5 * 60 * 1000 });
          qc.prefetchQuery({ queryKey: parentKeys.dashboard, queryFn: parentApi.dashboard, staleTime: 5 * 60 * 1000 });
          
          try {
            const childrenResult = await qc.fetchQuery({
              queryKey: parentKeys.children,
              queryFn: parentApi.children,
              staleTime: 5 * 60 * 1000,
            });
            const children = childrenResult?.children || [];
            if (children.length > 0) {
              const firstChildId = children[0].id;
              qc.prefetchQuery({
                queryKey: parentKeys.childProgress(firstChildId),
                queryFn: () => parentApi.childProgress(firstChildId),
                staleTime: 60 * 1000,
              });
              qc.prefetchQuery({
                queryKey: parentKeys.childQuizzes(firstChildId),
                queryFn: () => parentApi.childQuizzes(firstChildId),
                staleTime: 60 * 1000,
              });
              qc.prefetchQuery({
                queryKey: parentKeys.childChapterProgress(firstChildId),
                queryFn: () => parentApi.childChapterProgress(firstChildId),
                staleTime: 60 * 1000,
              });
            }
          } catch (err) {
            console.error('Failed to prefetch parent child data:', err);
          }
        }).catch(() => {});
      }
      return data.user;
    } catch { setError('Unable to reach auth server'); return null; }
    finally { setLoading(false); }
  };

  const registerParent = async ({ name, email, password, phone }: { name: string; email: string; password: string; phone?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api('/api/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password, phone, role: 'parent' }) });
      const data = (await res.json()) as AuthResponse & { ok?: boolean };
      if (!res.ok) { setError(data.error || 'Registration failed'); return false; }
      return true;
    } catch { setError('Unable to reach auth server'); return false; }
    finally { setLoading(false); }
  };

  const logout = async () => {
    saveCachedUser(null);
    setUser(null);
    clearPersistedCache();
    setLoading(false);
    setError(null);
    
    // Call server logout in background — clears httpOnly cookies
    api('/api/auth/logout', { method: 'POST' }).catch(() => {});
  };

  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleExpired = () => setSessionExpired(true);
    window.addEventListener('zhi-session-expired', handleExpired);
    return () => window.removeEventListener('zhi-session-expired', handleExpired);
  }, []);

  const handleRedirectToLogin = async () => {
    setSessionExpired(false);
    await logout();
    const loc = (typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en') || 'en';
    window.location.href = `/${loc}/login?session_closed=1`;
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const value = useMemo(
    () => ({ user, loading, error, login, registerParent, logout, refreshUser }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      {sessionExpired && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 9999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(16px)',
            borderRadius: '1.8rem',
            padding: '2.5rem 2rem',
            width: 'min(28rem, 95vw)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.5)',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              marginBottom: '1.5rem'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 850,
              color: '#0f172a',
              margin: '0 0 0.75rem 0',
              letterSpacing: '-0.02em'
            }}>
              Session Expired
            </h2>
            
            <p style={{
              fontSize: '0.92rem',
              color: '#475569',
              lineHeight: '1.6',
              margin: '0 0 2rem 0'
            }}>
              Your security session has expired or is invalid. Please log in again to access the portal.
            </p>
            
            <button
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '1.25rem',
                fontSize: '0.85rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                background: 'linear-gradient(135deg, #12312f, #16a085 48%, #38bdf8)',
                boxShadow: '0 10px 20px rgba(22, 160, 133, 0.15)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                transition: 'transform 0.15s ease'
              }}
              onClick={handleRedirectToLogin}
            >
              Re-authenticate
            </button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
