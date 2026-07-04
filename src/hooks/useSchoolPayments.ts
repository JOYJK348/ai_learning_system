'use client';

import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { schoolAdminKeys } from '@/core/constants/queryKeys';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? '';

export type SubscriptionInfo = {
  plan_type: string | null;
  plan_type_name: string | null;
  plan_status: string | null;
  plan_status_name: string | null;
  plan_status_color: string | null;
  plan_started_at: string | null;
  plan_expires_at: string | null;
  days_remaining: number | null;
  plan_price: number;
  setup_fee: number;
  discount_percent: number;
  trial_days: number;
  features: Record<string, boolean>;
  max_students: number;
  max_teachers: number;
};

export type UsageInfo = {
  current_students: number;
  max_students: number;
  usage_percent: number;
};

export type Transaction = {
  id: string;
  amount: number;
  currency: string;
  plan_name_snapshot: string | null;
  payment_method: string | null;
  payment_method_code: string | null;
  payment_status: string | null;
  payment_status_name: string | null;
  payment_status_color: string | null;
  gateway_name: string | null;
  notes: string | null;
  paid_at: string | null;
  created_at: string | null;
};

export type PaymentsData = {
  subscription: SubscriptionInfo;
  usage: UsageInfo;
  transactions: Transaction[];
  revenue: { this_month: number; total: number };
  server_time: string;
};

function getAuthHeaders(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const token = sessionStorage.getItem('zhi_auth_token');
  if (!token) console.warn('[getAuthHeaders] No zhi_auth_token in sessionStorage');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

async function refreshAuthToken(): Promise<string | null> {
  try {
    const refreshToken = sessionStorage.getItem('zhi_refresh_token');
    if (!refreshToken) {
      console.warn('[authFetch] No refresh token in sessionStorage');
      return null;
    }
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
      credentials: 'include',
    });
    if (!res.ok) {
      console.warn('[authFetch] Refresh failed:', res.status, await res.text().catch(() => ''));
      return null;
    }
    const data = await res.json();
    if (data.access_token) {
      sessionStorage.setItem('zhi_auth_token', data.access_token);
      if (data.refresh_token) sessionStorage.setItem('zhi_refresh_token', data.refresh_token);
      return data.access_token;
    }
    return null;
  } catch (e) {
    console.warn('[authFetch] Refresh error:', e);
    return null;
  }
}

async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  let res = await fetch(url, { ...options, credentials: 'include', headers: { ...options.headers, ...getAuthHeaders() } });
  let refreshed = false;
  if ((res.status === 401 || res.status === 403) && typeof window !== 'undefined') {
    const newToken = await refreshAuthToken();
    if (newToken) {
      res = await fetch(url, { ...options, credentials: 'include', headers: { ...options.headers, 'Authorization': `Bearer ${newToken}`, 'Content-Type': 'application/json' } });
      refreshed = true;
    }
  }
  if (res.status === 403 && typeof window !== 'undefined') {
    sessionStorage.removeItem('zhi_auth_token');
    sessionStorage.removeItem('zhi_refresh_token');
    sessionStorage.removeItem('zhi_user');
    window.dispatchEvent(new CustomEvent('zhi-session-expired'));
    window.location.href = '/login';
  }
  return res;
}

async function fetchPayments() {
  const res = await fetch(`${API_BASE}/api/school-admin/payments`, {
    credentials: 'include',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch payments');
  const json = await res.json();
  return json.data as PaymentsData;
}

export function usePrefetchSchoolPayments() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const schoolId = user?.schoolId;

  useEffect(() => {
    if (!schoolId) return;

    queryClient.prefetchQuery({
      queryKey: schoolAdminKeys.payments(schoolId),
      queryFn: fetchPayments,
      staleTime: 120_000,
    });
  }, [schoolId, queryClient]);
}

export function useSchoolPayments() {
  const { user } = useAuth();
  const schoolId = user?.schoolId;

  return useQuery({
    queryKey: schoolAdminKeys.payments(schoolId),
    queryFn: fetchPayments,
    enabled: !!schoolId,
    staleTime: 120_000,
  });
}

export type UpgradeResult = {
  message: string;
  subscription: SubscriptionInfo;
};

async function fetchUpgrade(planType: string, maxStudents?: number) {
  const res = await fetch(`${API_BASE}/api/school-admin/upgrade`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify({ plan_type: planType, max_students: maxStudents || 100 }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Upgrade failed');
  return json.data as UpgradeResult;
}

export type PlanTier = {
  max_students: number; price: number; displayPrice: string; label: string;
};

export type PlanItem = {
  type: string; name: string; price: string; display_price: string;
  numeric_price: number; period: string; desc: string; days: number;
  features: { key: string; label: string }[];
  tiers: PlanTier[] | null;
};

async function fetchPlans() {
  const res = await fetch(`${API_BASE}/api/school-admin/plans`, {
    credentials: 'include',
    headers: getAuthHeaders()
  });
  if (!res.ok) return null;
  const json = await res.json();
  return (json.data || json) as PlanItem[];
}

const FALLBACK_PLANS: PlanItem[] = [
  { type: 'free', name: 'Basic', price: '7 Days Free Trial', display_price: '₹0', numeric_price: 0, period: '', desc: 'Essential digital learning tools to get your school started', days: 7, features: [{ key: 'videos', label: 'Video Lessons' }, { key: 'quizzes', label: 'Quizzes' }, { key: 'activities', label: 'Activities' }], tiers: null },
  { type: 'paid', name: 'Paid', price: '₹1,999', display_price: '₹1,999', numeric_price: 1999, period: '/month', desc: 'For growing schools with more needs', days: 30, features: [{ key: 'videos', label: 'Video Lessons' }, { key: 'quizzes', label: 'Quizzes' }, { key: 'activities', label: 'Activities' }, { key: 'reports', label: 'Reports & Analytics' }], tiers: null },
  {
    type: 'school', name: 'Premium', price: '₹3,000', display_price: '₹3,000', numeric_price: 3000, period: '/month',
    desc: 'Complete platform with AI-powered tutoring and bulk management', days: 365,
    features: [{ key: 'videos', label: 'Video Lessons' }, { key: 'quizzes', label: 'Quizzes' }, { key: 'activities', label: 'Activities' }, { key: 'reports', label: 'Reports & Analytics' }, { key: 'bulk_import', label: 'Bulk Student Import' }, { key: 'support', label: 'Dedicated Support' }],
    tiers: [
      { max_students: 100, price: 3000, displayPrice: '₹3,000', label: '100 Students' },
      { max_students: 200, price: 5000, displayPrice: '₹5,000', label: '200 Students' },
      { max_students: 500, price: 8000, displayPrice: '₹8,000', label: '500 Students' },
    ],
  },
];

export function usePlansConfig() {
  const { user } = useAuth();
  const schoolId = user?.schoolId;
  const { data, isSuccess } = useQuery({
    queryKey: schoolAdminKeys.plans(schoolId),
    queryFn: fetchPlans,
    enabled: !!schoolId,
    staleTime: 300_000,
  });
  return isSuccess && data ? data : FALLBACK_PLANS;
}

export function useSchoolUpgrade() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const schoolId = user?.schoolId;

  return useMutation({
    mutationFn: ({ planType, maxStudents }: { planType: string; maxStudents?: number }) => fetchUpgrade(planType, maxStudents),
    onSuccess: () => {
      if (schoolId) {
        queryClient.invalidateQueries({ queryKey: schoolAdminKeys.payments(schoolId) });
      }
    },
  });
}

// ── Hybrid Payments Hooks ───────────────────────────────────────────────────

export type CreateOrderResult = {
  payment_record_id: string;
  razorpay_order_id: string;
  amount: number;
  currency: string;
  plan_name: string;
  key_id: string;
};

async function fetchCreateOrder(planType: string, maxStudents?: number, isTierUpgrade?: boolean) {
  const tryFetch = async (): Promise<Response> => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('zhi_auth_token') : null;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return fetch(`${API_BASE}/api/school-admin/payments/create-order`, {
      method: 'POST',
      credentials: 'include',
      headers,
      body: JSON.stringify({ plan_type: planType, max_students: maxStudents || 100, is_tier_upgrade: isTierUpgrade }),
    });
  };
  let res = await tryFetch();
  let refreshed = false;
  let refreshFailed = false;
  if ((res.status === 401 || res.status === 403) && typeof window !== 'undefined') {
    const newToken = await refreshAuthToken();
    if (newToken) {
      res = await tryFetch();
      refreshed = true;
    } else {
      refreshFailed = true;
    }
  }
  const json = await res.json();
  if (!res.ok) {
    if (res.status === 403 && typeof window !== 'undefined') {
      // Token belongs to wrong user type or session is invalid — force re-login
      sessionStorage.removeItem('zhi_auth_token');
      sessionStorage.removeItem('zhi_refresh_token');
      sessionStorage.removeItem('zhi_user');
      window.dispatchEvent(new CustomEvent('zhi-session-expired'));
      window.location.href = '/login';
    }
    throw new Error(json.error || 'Failed to create payment order');
  }
  return json.data as CreateOrderResult;
}

export function useCreateSchoolOrder() {
  return useMutation({
    mutationFn: ({ planType, maxStudents, isTierUpgrade }: { planType: string; maxStudents?: number; isTierUpgrade?: boolean }) => fetchCreateOrder(planType, maxStudents, isTierUpgrade),
  });
}

export type VerifyPaymentPayload = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

async function fetchVerifyPayment(payload: VerifyPaymentPayload) {
  const res = await authFetch(`${API_BASE}/api/school-admin/payments/verify`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Payment verification failed');
  return json;
}

export function useVerifySchoolPayment() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const schoolId = user?.schoolId;

  return useMutation({
    mutationFn: (payload: VerifyPaymentPayload) => fetchVerifyPayment(payload),
    onSuccess: () => {
      if (schoolId) {
        queryClient.invalidateQueries({ queryKey: schoolAdminKeys.payments(schoolId) });
      }
    },
  });
}

async function fetchSubmitOfflinePayment(planType: string, referenceCode: string, maxStudents?: number, isTierUpgrade?: boolean) {
  const res = await authFetch(`${API_BASE}/api/school-admin/payments/offline`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan_type: planType, reference_code: referenceCode, max_students: maxStudents || 100, is_tier_upgrade: isTierUpgrade }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to submit reference');
  return json;
}

export function useSubmitOfflinePayment() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const schoolId = user?.schoolId;

  return useMutation({
    mutationFn: ({ planType, referenceCode, maxStudents, isTierUpgrade }: { planType: string; referenceCode: string; maxStudents?: number; isTierUpgrade?: boolean }) => 
      fetchSubmitOfflinePayment(planType, referenceCode, maxStudents, isTierUpgrade),
    onSuccess: () => {
      if (schoolId) {
        queryClient.invalidateQueries({ queryKey: schoolAdminKeys.payments(schoolId) });
      }
    },
  });
}

