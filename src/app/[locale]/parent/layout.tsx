'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ParentTopNav from './_components/ParentTopNav';
import ParentBottomNav from './_components/ParentBottomNav';
import { queryClientSingleton } from '@/providers/QueryProvider';
import { parentApi } from '@/core/services/parentApi';
import { parentKeys } from '@/core/constants/queryKeys';

export default function ParentLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const { logout: authLogout, user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/login');
      } else if (user.role !== 'parent') {
        const route = user.role === 'super_admin' ? 'admin' : user.role === 'school_admin' ? 'school-admin' : user.role;
        router.replace(`/${route}`);
      }
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && user.role === 'parent') {
      // 1. Eager prefetch: parent profile
      queryClientSingleton.prefetchQuery({
        queryKey: parentKeys.me,
        queryFn: parentApi.me,
        staleTime: 5 * 60 * 1000,
      });

      // 2. Eager prefetch: children list
      queryClientSingleton.prefetchQuery({
        queryKey: parentKeys.children,
        queryFn: parentApi.children,
        staleTime: 5 * 60 * 1000,
      }).then((data: any) => {
        const children = data?.children || [];
        if (children.length > 0) {
          const firstChildId = children[0].id;
          // 3. Eager prefetch first child details to warm cache
          queryClientSingleton.prefetchQuery({
            queryKey: parentKeys.childProgress(firstChildId),
            queryFn: () => parentApi.childProgress(firstChildId),
            staleTime: 60 * 1000,
          });
          queryClientSingleton.prefetchQuery({
            queryKey: parentKeys.childQuizzes(firstChildId),
            queryFn: () => parentApi.childQuizzes(firstChildId),
            staleTime: 60 * 1000,
          });
          queryClientSingleton.prefetchQuery({
            queryKey: parentKeys.childChapterProgress(firstChildId),
            queryFn: () => parentApi.childChapterProgress(firstChildId),
            staleTime: 60 * 1000,
          });
        }
      }).catch(() => {});
    }
  }, [user]);

  const handleLogout = async () => {
    await authLogout();
    window.location.replace(`/${locale}/login?session_closed=1`);
  };

  return (
    <>
      <ParentTopNav onLogout={handleLogout} />
      {children}
      <ParentBottomNav onLogout={handleLogout} />
    </>
  );
}

