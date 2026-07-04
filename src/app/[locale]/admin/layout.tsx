'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useAdminPrefetch } from '@/core/hooks/useAdminPrefetch';
import ErrorBoundary from '@/core/components/ErrorBoundary';
import AdminBottomNav from './_components/AdminBottomNav';
import AdminTopNav from './_components/AdminTopNav';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const { prefetchAll } = useAdminPrefetch(user?.id);
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && user) prefetchAll();
  }, [loading, user, prefetchAll]);

  // Prevent back button from leaving the admin home page
  useEffect(() => {
    const isHome = typeof window !== 'undefined' &&
      (window.location.pathname.endsWith('/admin') || window.location.pathname === '/admin');
    if (!isHome) return;
    window.history.pushState(null, '', window.location.href);
    const handlePop = () => window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, [pathname]);

  return (
    <ErrorBoundary>
      <AdminTopNav />
      {children}
      <AdminBottomNav />
    </ErrorBoundary>
  );
}
