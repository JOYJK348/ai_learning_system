'use client';

import { useQueryClient } from '@tanstack/react-query';
import { adminKeys } from '@/core/constants/queryKeys';
import { adminApi } from '@/core/services/adminApi';
import { useCallback, useRef } from 'react';

type PrefetchItem = {
  key: readonly string[];
  fn: () => Promise<unknown>;
  scoped?: boolean;
};

const groupA: PrefetchItem[] = [
  { key: adminKeys.dashboard, fn: adminApi.dashboard },
  { key: adminKeys.schoolDirectory, fn: adminApi.schoolDirectory, scoped: true },
  { key: adminKeys.students, fn: adminApi.students },
  { key: adminKeys.parentDirectory, fn: adminApi.parentDirectory, scoped: true },
  { key: adminKeys.paymentsStats, fn: adminApi.paymentsStats },
  { key: adminKeys.paymentsTab('approvals'), fn: adminApi.paymentsApprovals },
  { key: adminKeys.boards, fn: adminApi.boards },
  { key: adminKeys.plans, fn: adminApi.paymentsPlans },
];

const groupB: PrefetchItem[] = [
  { key: adminKeys.reports('30d'), fn: () => adminApi.reports('30d') },
  { key: adminKeys.quizzes, fn: adminApi.quizzes },
];

function relayItem<T>(key: readonly string[], fn: () => Promise<T>) {
  return { key, fn };
}

export function useAdminPrefetch(userId?: string) {
  const queryClient = useQueryClient();

  const prefetchAll = useCallback(() => {
    const prefetch = (items: PrefetchItem[]) =>
      Promise.allSettled(
        items.map(({ key, fn, scoped }) => {
          const queryKey = scoped && userId ? [...key, userId] : [...key];
          return queryClient.prefetchQuery({ queryKey, queryFn: fn, staleTime: 60_000 });
        })
      );

    // Group A first to warm critical admin pages + boards
    prefetch(groupA).then(() => {
      // Group B: lower-priority pages
      prefetch(groupB);

      // Relay-prefetch curriculum hierarchy: boards → grades → subjects → chapters → lessons
      // This runs in background without blocking anything
      const boardData = queryClient.getQueryData<unknown[]>([...adminKeys.boards]);
      if (Array.isArray(boardData)) {
        const gradeItems = boardData.map(b => relayItem([...adminKeys.grades, (b as any)?.id, userId], () => adminApi.grades((b as any)?.id)));
        prefetch(gradeItems).then(() => {
          const allGrades = gradeItems.flatMap(gk => {
            const data = queryClient.getQueryData<unknown[]>(gk.key);
            return Array.isArray(data) ? data : [];
          });
          const subjectItems = allGrades.map(g => relayItem([...adminKeys.subjects, (g as any)?.id, userId], () => adminApi.subjects((g as any)?.id)));
          prefetch(subjectItems).then(() => {
            const allSubjects = subjectItems.flatMap(sk => {
              const data = queryClient.getQueryData<unknown[]>(sk.key);
              return Array.isArray(data) ? data : [];
            });
            const chapterItems = allSubjects.map(s => relayItem([...adminKeys.chapters, (s as any)?.id, userId], () => adminApi.chapters((s as any)?.id)));
            prefetch(chapterItems).then(() => {
              const allChapters = chapterItems.flatMap(ck => {
                const data = queryClient.getQueryData<unknown[]>(ck.key);
                return Array.isArray(data) ? data : [];
              });
              const lessonItems = allChapters.map(c => relayItem([...adminKeys.lessons, (c as any)?.id, userId], () => adminApi.lessons((c as any)?.id)));
              prefetch(lessonItems);
            });
          });
        });
      }
    });
  }, [queryClient, userId]);

  // Track which parent IDs we've already prefetched so we don't re-fire
  const prefetchedIds = useRef<Set<string>>(new Set());

  /**
   * Call this after the parent directory list loads.
   * It will fire off background detail-fetches for every parent
   * that isn't already in the React Query cache, staggered by 80ms
   * so we don't hammer the network at once.
   */
  const prefetchParentDetails = useCallback(
    (parents: Array<{ id: string }>) => {
      const STAGGER_MS = 80;

      parents.forEach((p, i) => {
        if (!p.id) return;
        if (prefetchedIds.current.has(p.id)) return;

        // Mark as enqueued immediately to prevent duplicate calls
        prefetchedIds.current.add(p.id);

        const qKey = [...adminKeys.parentDetail(p.id), userId];

        // If already cached and fresh, skip
        if (queryClient.getQueryData(qKey) !== undefined) return;

        setTimeout(() => {
          queryClient.prefetchQuery({
            queryKey: qKey,
            queryFn: () => adminApi.parentDetail(p.id),
            staleTime: 5 * 60_000,
          }).catch(() => {
            // Remove from set on failure so next visit can retry
            prefetchedIds.current.delete(p.id);
          });
        }, i * STAGGER_MS);
      });
    },
    [queryClient, userId]
  );

  return { prefetchAll, prefetchParentDetails };
}
