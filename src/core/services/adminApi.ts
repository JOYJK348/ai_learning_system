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
    const rToken = typeof window !== 'undefined' ? sessionStorage.getItem('zhi_refresh_token') : null;
    const res = await fetch(`${BASE}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: rToken }),
      credentials: 'include'
    });
    if (res.ok) {
      const data = await res.json();
      const newToken = data.access_token || null;
      if (newToken && typeof window !== 'undefined') {
        sessionStorage.setItem('zhi_auth_token', newToken);
      }
      if (data.refresh_token && typeof window !== 'undefined') {
        sessionStorage.setItem('zhi_refresh_token', data.refresh_token);
      }
      refreshQueue.forEach((cb) => cb(newToken));
      refreshQueue = [];
      return newToken;
    }
  } catch (err) {
    console.error("Token refresh failed in adminApi:", err);
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
      const token = sessionStorage.getItem('zhi_auth_token');
      if (token) {
        window.dispatchEvent(new CustomEvent('zhi-session-expired'));
      }
    }
    throw new Error(payload.error || `Failed to load ${path}`);
  }
  return payload.data ?? payload;
}

type ReportsAggregate = {
  revenue: unknown;
  userStats: unknown;
  schoolStats: unknown;
  studentStats: unknown;
  engagement: unknown;
  subjectStats: unknown;
};

type SchoolDirectory = {
  schools: unknown[];
  stats: unknown;
};

type ParentDirectory = {
  parents: unknown[];
  monthlyRevenue: number;
};

export const adminApi = {
  dashboard: () =>
    fetchJson<unknown>('/api/admin/dashboard'),

  schools: () =>
    fetchJson<unknown>('/api/admin/schools'),

  schoolsStats: () =>
    fetchJson<unknown>('/api/admin/schools/stats'),

  schoolDirectory: async (): Promise<SchoolDirectory> => {
    const [schools, stats] = await Promise.all([
      fetchJson<unknown[]>('/api/admin/schools'),
      fetchJson<unknown>('/api/admin/schools/stats'),
    ]);
    return { schools: Array.isArray(schools) ? schools : [], stats };
  },

  students: () =>
    fetchJson<unknown>('/api/admin/students'),

  parents: () =>
    fetchJson<unknown>('/api/admin/parents'),

  parentDirectory: async (): Promise<ParentDirectory> => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('zhi_auth_token') : null;
    const headers = token ? { 'Authorization': `Bearer ${token}` } : undefined;
    const res = await fetch(`${BASE}/api/admin/parents`, { credentials: 'include', headers });
    const payload = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(payload.error || 'Failed to load parents');
    const items = Array.isArray(payload.data) ? payload.data : [];
    const revenue = (payload as any)?.meta?.monthly_revenue ?? 0;
    return { parents: items, monthlyRevenue: revenue };
  },

  parentDetail: async (id: string): Promise<unknown> =>
    fetchJson(`/api/admin/parents/${id}`),

  payments: (params?: string) =>
    fetchJson<unknown>(`/api/admin/payments${params ? `?${params}` : ''}`),

  paymentsStats: () =>
    fetchJson<unknown>('/api/admin/payments/stats'),

  paymentsApprovals: () =>
    fetchJson<unknown>('/api/admin/approvals'),

  paymentsParentsPlans: (params: string) =>
    fetchJson<unknown>(`/api/admin/parents/plans?${params}`),

  paymentsSchoolPayments: () =>
    fetchJson<unknown>('/api/admin/payments/school-payments'),

  paymentsPlans: () =>
    fetchJson<unknown>('/api/admin/plans'),

  updatePlan: (id: string, body: any) =>
    fetchJson<unknown>(`/api/admin/plans/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),

  deletePlan: (id: string) =>
    fetchJson<unknown>(`/api/admin/plans/${id}`, {
      method: 'DELETE',
    }),

  reports: (range: string): Promise<ReportsAggregate> =>
    Promise.all([
      fetchJson(`/api/admin/reports/revenue?period=${range}`),
      fetchJson('/api/admin/reports/users'),
      fetchJson('/api/admin/reports/schools'),
      fetchJson('/api/admin/reports/students'),
      fetchJson('/api/admin/reports/engagement'),
      fetchJson('/api/admin/reports/subjects'),
    ]).then(([revenue, userStats, schoolStats, studentStats, engagement, subjectStats]) => ({
      revenue, userStats, schoolStats, studentStats, engagement, subjectStats,
    })),

  reportsRevenue: (range: string) =>
    fetchJson<any>(`/api/admin/reports/revenue?period=${range}`),

  reportsUsers: () =>
    fetchJson<any>('/api/admin/reports/users'),

  reportsSchools: () =>
    fetchJson<any>('/api/admin/reports/schools'),

  reportsStudents: () =>
    fetchJson<any>('/api/admin/reports/students'),

  reportsEngagement: () =>
    fetchJson<any>('/api/admin/reports/engagement'),

  reportsSubjects: () =>
    fetchJson<any>('/api/admin/reports/subjects'),

  boards: () =>
    fetchJson<unknown[]>('/api/admin/boards'),

  grades: (boardId: string) =>
    fetchJson<unknown[]>(`/api/admin/grades?board_id=${boardId}`),

  subjects: (gradeId: string) =>
    fetchJson<unknown[]>(`/api/admin/subjects?grade_id=${gradeId}`),

  chapters: (subjectId: string) =>
    fetchJson<unknown[]>(`/api/admin/chapters?subject_id=${subjectId}`),

  lessons: (chapterId: string) =>
    fetchJson<unknown[]>(`/api/admin/lessons?chapter_id=${chapterId}`),

  quizzes: () =>
    fetchJson<unknown>('/api/admin/quizzes'),
};
