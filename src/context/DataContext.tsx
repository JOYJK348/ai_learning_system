'use client';

import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentApi, studentKeys, type Subject, type StudentProfile, type StudentDashboard } from '@/core/services/studentApi';
import { useAuth } from './AuthContext';

type DataContextType = {
  studentProfile: StudentProfile | null;
  studentDashboard: StudentDashboard | null;
  subjects: Subject[];
  studentLoading: boolean;
  dashboardLoading: boolean;
  lessonsLoading: boolean;
  updateProgress: (lessonId: string, status: 'completed' | 'in_progress') => void;
  refetchLessons: () => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const isStudent = user?.role === 'student';
  const queryClient = useQueryClient();

  const { data: studentProfile, isLoading: studentLoading } = useQuery({
    queryKey: studentKeys.me,
    queryFn: studentApi.getMe,
    enabled: isStudent,
    staleTime: 10 * 60 * 1000, // 10 minutes cache
  });

  const { data: studentDashboard, isLoading: dashboardLoading } = useQuery({
    queryKey: studentKeys.dashboard,
    queryFn: studentApi.getDashboard,
    enabled: isStudent,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });

  const { data: rawLessons, isLoading: lessonsLoading } = useQuery({
    queryKey: studentKeys.lessons,
    queryFn: studentApi.getLessons,
    enabled: isStudent,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });



  const subjects = useMemo(() => rawLessons ?? [], [rawLessons]);

  const progressMutation = useMutation({
    mutationFn: ({ lessonId, status }: { lessonId: string; status: string }) =>
      studentApi.updateProgress(lessonId, { status, completion_percentage: status === 'completed' ? 100 : 50 }),
    onMutate: async ({ lessonId, status }) => {
      await queryClient.cancelQueries({ queryKey: studentKeys.lessons });
      await queryClient.cancelQueries({ queryKey: studentKeys.dashboard });

      const previousLessons = queryClient.getQueryData<Subject[]>(studentKeys.lessons);
      const previousDashboard = queryClient.getQueryData<StudentDashboard>(studentKeys.dashboard);

      if (previousLessons) {
        const nextLessons = previousLessons.map((subject) => ({
          ...subject,
          chapters: subject.chapters.map((chapter) => {
            const hasLesson = chapter.lessons?.some((l) => l.id === lessonId);
            if (!hasLesson) return chapter;

            const nextLessonsList = chapter.lessons.map((l) =>
              l.id === lessonId
                ? { ...l, progress: { ...l.progress, status: status as any, completion_percentage: status === 'completed' ? 100 : 50 } }
                : l
            );
            const completedCount = nextLessonsList.filter((l) => l.progress.status === 'completed').length;
            const completionPerc = Math.round((completedCount / nextLessonsList.length) * 100);

            return {
              ...chapter,
              lessons: nextLessonsList,
              completed_lessons: completedCount,
              completion_percentage: completionPerc,
            };
          }),
        }));
        queryClient.setQueryData(studentKeys.lessons, nextLessons);
      }

      if (previousDashboard) {
        const nextDashboard = {
          ...previousDashboard,
          lesson_stats: {
            ...previousDashboard.lesson_stats,
            completed_lessons: status === 'completed' 
              ? previousDashboard.lesson_stats.completed_lessons + 1 
              : previousDashboard.lesson_stats.completed_lessons,
          }
        };
        queryClient.setQueryData(studentKeys.dashboard, nextDashboard);
      }

      return { previousLessons, previousDashboard };
    },
    onError: (err, variables, context: any) => {
      if (context?.previousLessons) {
        queryClient.setQueryData(studentKeys.lessons, context.previousLessons);
      }
      if (context?.previousDashboard) {
        queryClient.setQueryData(studentKeys.dashboard, context.previousDashboard);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentKeys.lessons });
      queryClient.invalidateQueries({ queryKey: studentKeys.dashboard });
      queryClient.invalidateQueries({ queryKey: studentKeys.me });
    },
  });

  const updateProgress = useCallback((lessonId: string, status: 'completed' | 'in_progress') => {
    progressMutation.mutate({ lessonId, status });
  }, [progressMutation]);

  const refetchLessons = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: studentKeys.lessons });
  }, [queryClient]);

  const value = useMemo(() => ({
    studentProfile: studentProfile ?? null,
    studentDashboard: studentDashboard ?? null,
    subjects,
    studentLoading,
    dashboardLoading,
    lessonsLoading,
    updateProgress,
    refetchLessons,
  }), [studentProfile, studentDashboard, subjects, studentLoading, dashboardLoading, lessonsLoading, updateProgress, refetchLessons]);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}
