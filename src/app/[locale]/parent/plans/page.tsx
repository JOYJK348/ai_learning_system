'use client';

import { useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

export default function PlansPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const searchParams = useSearchParams();
  const trialExpired = searchParams?.get('trial_expired');

  useEffect(() => {
    const dest = trialExpired
      ? `/${locale}/parent/profile?tab=plans&trial_expired=1`
      : `/${locale}/parent/profile?tab=plans`;
    router.replace(dest);
  }, [router, locale, trialExpired]);

  return null;
}
