'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ParentTopNav from './_components/ParentTopNav';
import ParentBottomNav from './_components/ParentBottomNav';

export default function ParentLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const { logout: authLogout, user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace(`/${locale}/login`);
      } else if (user.role !== 'parent') {
        const route = user.role === 'super_admin' ? 'admin' : user.role === 'school_admin' ? 'school-admin' : user.role;
        router.replace(`/${locale}/${route}`);
      }
    }
  }, [user, loading, router, locale]);

  const handleLogout = async () => {
    await authLogout();
    router.push(`/${locale}/login`);
  };

  return (
    <>
      <ParentTopNav onLogout={handleLogout} />
      {children}
      <ParentBottomNav onLogout={handleLogout} />
    </>
  );
}
