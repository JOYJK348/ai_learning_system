'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useAdminPrefetch } from '@/core/hooks/useAdminPrefetch';
import ErrorBoundary from '@/core/components/ErrorBoundary';
import AdminBottomNav from './_components/AdminBottomNav';
import AdminTopNav from './_components/AdminTopNav';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const { prefetchAll } = useAdminPrefetch(user?.id);

  useEffect(() => {
    if (!loading && user) prefetchAll();
  }, [loading, user, prefetchAll]);

  return (
    <ErrorBoundary>
      <AdminTopNav />
      {children}
      <AdminBottomNav />
    </ErrorBoundary>
  );
}
