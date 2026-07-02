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
    console.error("Token refresh failed in studentApi:", err);
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

export type LessonProgress = {
  status: 'not_started' | 'in_progress' | 'completed';
  completion_percentage: number;
  time_spent_seconds?: number;
  last_accessed_at?: string;
};

export type Lesson = {
  id: string;
  title: string;
  description?: string;
  youtube_video_id?: string | null;
  thumbnail_url?: string | null;
  duration_seconds?: number;
  sort_order: number;
  is_unlocked: boolean;
  progress: LessonProgress;
};

export type Chapter = {
  id: string;
  name: string;
  sort_order: number;
  is_unlocked: boolean;
  completion_percentage: number;
  total_lessons: number;
  completed_lessons: number;
  lessons: Lesson[];
};

export type Subject = {
  id: string;
  name: string;
  chapters: Chapter[];
};

export type StudentProfile = {
  id: string;
  name: string;
  email?: string;
  grade_name?: string;
  school_name?: string;
  photo_url?: string;
  overall_progress: number;
  total_stars_earned: number;
  total_badges_earned: number;
  current_streak_days: number;
  total_lessons_completed: number;
  total_quizzes_attempted: number;
  total_quizzes_passed: number;
};

export type StudentDashboard = {
  student: {
    id: string;
    name: string;
    overall_progress: number;
    total_stars: number;
    total_badges: number;
    current_streak_days: number;
  };
  lesson_stats: {
    total_lessons: number;
    completed_lessons: number;
    in_progress_lessons: number;
    total_time_spent_seconds: number;
  };
  today_activity: {
    lessons_completed: number;
    lessons_accessed: number;
  };
  recent_badges: Array<{ name: string; image_url: string | null; earned_at: string }>;
  subject_progress: Array<{ subject_name: string; completed: number; total: number; percentage: number }>;
};

export type ActivityAttempt = {
  id: string;
  activity_id: string;
  score: number;
  max_score: number;
  completion_data: Record<string, unknown>;
  time_taken_seconds: number;
  completed_at: string;
  created_at: string;
};

export type Activity = {
  id: string;
  name: string;
  activity_type_id: number;
  config: Record<string, unknown>;
  sort_order: number;
  attempt: ActivityAttempt | null;
};

export const studentKeys = {
  me: ['student', 'me'] as const,
  lessons: ['student', 'lessons'] as const,
  dashboard: ['student', 'dashboard'] as const,
  activities: (lessonId: string) => ['student', 'activities', lessonId] as const,
};

export const studentApi = {
  getMe: (): Promise<StudentProfile> =>
    fetchJson<any>('/api/student/me').then(d => d.student ?? d),

  getLessons: (): Promise<Subject[]> =>
    fetchJson<Subject[]>('/api/student/lessons'),

  getDashboard: (): Promise<StudentDashboard> =>
    fetchJson<StudentDashboard>('/api/student/dashboard'),

  updateProgress: (lessonId: string, body: { 
    status?: string; 
    completion_percentage?: number;
    quiz_completed?: boolean;
    quiz_score?: number;
    quiz_max_score?: number;
  }) =>
    fetchJson(`/api/student/lessons/${lessonId}/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),

  getLessonActivities: (lessonId: string): Promise<Activity[]> =>
    fetchJson<Activity[]>(`/api/student/lessons/${lessonId}/activities`),

  submitActivityAttempt: (lessonId: string, activityId: string, body: {
    score?: number;
    max_score?: number;
    time_taken_seconds?: number;
    completion_data?: Record<string, unknown>;
  }) =>
    fetchJson(`/api/student/lessons/${lessonId}/activities/${activityId}/attempt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),

  // Submit a quiz score — creates a quiz_attempts row so parent portal can see it.
  // Uses pre-computed score (for custom Quiz page with local hardcoded questions).
  submitQuizScore: (lessonId: string, quizId: string, body: {
    score: number;
    max_score: number;
    time_taken_seconds?: number;
  }) =>
    fetchJson(`/api/student/lessons/${lessonId}/quizzes/${quizId}/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),
};
