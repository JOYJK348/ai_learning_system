import type { ParentProfile, ChildSummary, ChildProgress, QuizAttempt, Badge, SubjectProgress, ParentDashboard } from '@/types/parent';

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? '';

let isRefreshing = false;
let refreshQueue: Array<(token: string | null) => void> = [];

async function refreshSessionToken(): Promise<string | null> {
  if (isRefreshing) {
    return new Promise((resolve) => {
      refreshQueue.push(resolve);
    });
  }
  isRefreshing = true;
  try {
    const res = await fetch(`${BASE}/api/auth/refresh`, { credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      const newToken = data.access_token || null;
      if (newToken && typeof window !== 'undefined') {
        sessionStorage.setItem('zhi_auth_token', newToken);
      }
      refreshQueue.forEach((cb) => cb(newToken));
      refreshQueue = [];
      return newToken;
    }
  } catch (err) {
    console.error("Token refresh failed:", err);
  } finally {
    isRefreshing = false;
  }
  refreshQueue.forEach((cb) => cb(null));
  refreshQueue = [];
  return null;
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  let token = typeof window !== 'undefined' ? sessionStorage.getItem('zhi_auth_token') : null;
  const headers = {
    ...(init?.headers || {}),
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
  let res = await fetch(`${BASE}${path}`, { credentials: 'include', ...init, headers });
  
  if (res.status === 401 && typeof window !== 'undefined' && !path.includes('/auth/refresh') && !path.includes('/auth/login')) {
    const newToken = await refreshSessionToken();
    if (newToken) {
      const retryHeaders = {
        ...(init?.headers || {}),
        'Authorization': `Bearer ${newToken}`,
      };
      res = await fetch(`${BASE}${path}`, { credentials: 'include', ...init, headers: retryHeaders });
    }
  }

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    if ((res.status === 401 || res.status === 403) && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('zhi-session-expired'));
    }
    throw new Error(payload.error || `Failed to load ${path}`);
  }
  return payload.data ?? payload;
}

export type PlanFeature = {
  id: number;
  code: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  limit: unknown;
};

export type Plan = {
  id: number;
  code: string;
  name: string;
  description: string;
  amount_monthly: number;
  amount_quarterly: number | null;
  amount_yearly: number | null;
  badge_label: string | null;
  sort_order: number;
  is_active: boolean;
  trial_days: number;
  icon: string;
  features: PlanFeature[];
};

export type ParentSubscription = {
  id: string;
  parent_id: string;
  plan_id: number;
  status: 'active' | 'expired' | 'cancelled' | 'trial';
  start_date: string;
  end_date: string | null;
  trial_start: string | null;
  trial_end: string | null;
  plan: Plan;
};

export type SubscribeResult = {
  subscription: ParentSubscription;
  payment?: {
    id: string;
    order_id: string | null;
    amount: number;
    status: string;
  };
  amount: number;
  currency: string;
};

export type CreateOrderResult = {
  success: boolean;
  payment_record_id: string;
  razorpay_order_id: string;
  amount: number;           // in paise
  currency: string;
  plan: { id: number; code: string; name: string };
  key_id: string;
};

export type VerifyPaymentResult = {
  success: boolean;
  already_processed?: boolean;
  plan_id?: number;
  subscription_id?: string;
  expires_at?: string;
};

export type ChapterProgress = {
  id: string;
  name: string;
  subjects: Array<{
    id: string;
    name: string;
    chapters: Array<{
      id: string;
      name: string;
      sort_order: number;
      total_lessons: number;
      completed_lessons: number;
      completion_percentage: number;
      total_time_spent_seconds: number;
      is_complete: boolean;
    }>;
  }>;
};

export const parentApi = {
  plans: () =>
    fetchJson<Plan[]>('/api/plans'),

  subscription: () =>
    fetchJson<ParentSubscription>('/api/parent/subscribe'),

  subscribe: (planId: number, intervalType?: string) =>
    fetchJson<SubscribeResult>('/api/parent/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan_id: planId, interval_type: intervalType || 'monthly' }),
    }),

  payments: () =>
    fetchJson<unknown[]>('/api/parent/payments'),

  // ── Razorpay Payment Flow ────────────────────────────────────────────────
  // Step 1: Create a Razorpay order on backend and get order details
  createPaymentOrder: (planId: number, intervalType?: string) =>
    fetchJson<CreateOrderResult>('/api/payments/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan_id: planId, interval_type: intervalType || 'monthly' }),
    }),

  // Step 2: Verify payment signature after Razorpay checkout success
  verifyPayment: (payload: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) =>
    fetchJson<VerifyPaymentResult>('/api/payments/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),

  childChapterProgress: (childId: string) =>
    fetchJson<ChapterProgress[]>('/api/parent/children/' + childId + '/chapter-progress'),

  me: () =>
    fetchJson<ParentProfile>('/api/parent/me'),

  updateProfile: (payload: { name: string; phone: string }) =>
    fetchJson<{ success: boolean; parent: any }>('/api/parent/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),

  children: () =>
    fetchJson<{ children: ChildSummary[] }>('/api/parent/children'),

  dashboard: () =>
    fetchJson<ParentDashboard>('/api/parent/dashboard'),

  childProgress: (childId: string) =>
    fetchJson<ChildProgress>('/api/parent/children/' + childId + '/progress'),

  childQuizzes: (childId: string) =>
    fetchJson<{ quizzes: QuizAttempt[] }>('/api/parent/children/' + childId + '/quizzes'),

  childBadges: (childId: string) =>
    fetchJson<{ badges: Badge[] }>('/api/parent/children/' + childId + '/badges'),

  childTerms: (childId: string) =>
    fetchJson<{ terms: unknown[] }>('/api/parent/children/' + childId + '/terms'),

  // ── Child Link Request Operations ──
  getLinkRequests: () =>
    fetchJson<{ data: any[] }>('/api/parent/children/link-request'),

  submitLinkRequest: (payload: { name: string; grade_id: string; gender: string; dob?: string }) =>
    fetchJson<{ data: any }>('/api/parent/children/link-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),
};


