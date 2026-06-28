'use client';

import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { schoolAdminKeys } from '@/core/constants/queryKeys';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ?? '';

export type GradeSummary = {
  id: string;
  name: string;
  subjects_count: number;
  lessons_count: number;
  quizzes_count: number;
  fun_score: number;
};

export type CurriculumOverview = {
  total_subjects: number;
  total_lessons: number;
  total_quizzes: number;
  avg_fun_score: number;
};

export type CurriculumLesson = {
  title: string;
  has_quiz: boolean;
  has_activity: boolean;
};

export type CurriculumChapter = {
  name: string;
  lessons: CurriculumLesson[];
};

export type CurriculumSubject = {
  id: string;
  name: string;
  chapters_count: number;
  lessons_count: number;
  fun_score: number;
  chapters: CurriculumChapter[];
};

export type CurriculumData = {
  grade: string;
  grade_id: string;
  subjects: CurriculumSubject[];
};

async function fetchOverview() {
  const res = await fetch(`${API_BASE}/api/school-admin/curriculum`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch curriculum overview');
  const json = await res.json();
  return json.data as { grades: GradeSummary[]; overview: CurriculumOverview };
}

async function fetchCurriculum(gradeId: string) {
  const res = await fetch(`${API_BASE}/api/school-admin/curriculum?grade_id=${gradeId}`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch curriculum');
  const json = await res.json();
  return json.data as CurriculumData;
}

export function usePrefetchSchoolCurriculum() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const schoolId = user?.schoolId;

  useEffect(() => {
    if (!schoolId) return;

    queryClient.prefetchQuery({
      queryKey: schoolAdminKeys.curriculumGrades(schoolId),
      queryFn: fetchOverview,
      staleTime: 120_000,
    }).then(() => {
      const gradesData = queryClient.getQueryData<{ grades: GradeSummary[]; overview: CurriculumOverview }>(
        schoolAdminKeys.curriculumGrades(schoolId)
      );
      if (!gradesData?.grades?.length) return;
      for (const grade of gradesData.grades) {
        queryClient.prefetchQuery({
          queryKey: schoolAdminKeys.curriculum(schoolId, grade.id),
          queryFn: () => fetchCurriculum(grade.id),
          staleTime: 120_000,
        });
      }
    });
  }, [schoolId, queryClient]);
}

export function useSchoolCurriculumOverview() {
  const { user } = useAuth();
  const schoolId = user?.schoolId;

  return useQuery({
    queryKey: schoolAdminKeys.curriculumGrades(schoolId),
    queryFn: fetchOverview,
    enabled: !!schoolId,
    staleTime: 120_000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
  });
}

export function useSchoolCurriculum(gradeId?: string | null) {
  const { user } = useAuth();
  const schoolId = user?.schoolId;

  return useQuery({
    queryKey: schoolAdminKeys.curriculum(schoolId, gradeId),
    queryFn: () => fetchCurriculum(gradeId!),
    enabled: !!schoolId && !!gradeId,
    staleTime: 120_000,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
  });
}

/* ─── Progress hooks ─────────────────────────────────── */

export type GradeProgressSummary = {
  grade_id: string;
  grade_name: string;
  total_students: number;
  active_today: number;
  avg_progress: number;
  total_lessons_completed: number;
  total_quizzes_attempted: number;
  total_quizzes_passed: number;
};

export type StudentProgressRow = {
  id: string;
  name: string;
  section: string | null;
  overall_progress: number;
  lessons_completed: number;
  quizzes_attempted: number;
  quizzes_passed: number;
  stars_earned: number;
  last_active: string | null;
  is_active_today: boolean;
};

async function fetchCurriculumProgress() {
  const res = await fetch(`${API_BASE}/api/school-admin/curriculum/progress`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch progress');
  const json = await res.json();
  return json.data as { grades: GradeProgressSummary[] };
}

async function fetchGradeProgress(gradeId: string) {
  const res = await fetch(`${API_BASE}/api/school-admin/curriculum/progress?grade_id=${gradeId}`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch grade progress');
  const json = await res.json();
  return json.data as StudentProgressRow[];
}

export function useCurriculumProgress() {
  const { user } = useAuth();
  const schoolId = user?.schoolId;
  return useQuery({
    queryKey: schoolAdminKeys.curriculumProgress(schoolId),
    queryFn: fetchCurriculumProgress,
    enabled: !!schoolId,
    staleTime: 60_000,
  });
}

export function useGradeProgress(gradeId?: string | null) {
  const { user } = useAuth();
  const schoolId = user?.schoolId;
  return useQuery({
    queryKey: schoolAdminKeys.curriculumGradeProgress(schoolId, gradeId),
    queryFn: () => fetchGradeProgress(gradeId!),
    enabled: !!schoolId && !!gradeId,
    staleTime: 60_000,
  });
}

/* ─── Quiz performance tracking hooks ────────────────── */

export type SchoolQuizAttempt = {
  student_id: string;
  student_name: string;
  section: string | null;
  score: number;
  max_score: number;
  percentage: number;
  passed: boolean;
  time_taken_seconds: number | null;
  completed_at: string | null;
};

export type SchoolQuizGroup = {
  quiz_id: string;
  quiz_title: string;
  lesson_title: string;
  total_attempts: number;
  pass_count: number;
  fail_count: number;
  avg_score: number;
  attempts: SchoolQuizAttempt[];
};

export type SchoolChapterQuizGroup = {
  chapter_id: string;
  chapter_name: string;
  quizzes: SchoolQuizGroup[];
};

export type SchoolSubjectQuizGroup = {
  subject_id: string;
  subject_name: string;
  chapters: SchoolChapterQuizGroup[];
};

async function fetchGradeQuizzes(gradeId: string, subjectId?: string | null) {
  let url = `${API_BASE}/api/school-admin/curriculum/quizzes?grade_id=${gradeId}`;
  if (subjectId) url += `&subject_id=${subjectId}`;
  const res = await fetch(url, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch grade quizzes');
  const json = await res.json();
  return json.data as SchoolSubjectQuizGroup[];
}

export function useGradeQuizzes(gradeId?: string | null, subjectId?: string | null) {
  const { user } = useAuth();
  const schoolId = user?.schoolId;
  return useQuery({
    queryKey: schoolAdminKeys.curriculumGradeQuizzes(schoolId, gradeId, subjectId),
    queryFn: () => fetchGradeQuizzes(gradeId!, subjectId),
    enabled: !!schoolId && !!gradeId,
    staleTime: 30_000,
  });
}


