'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function QuizzesPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  useEffect(() => {
    router.replace(`/${locale}/parent?tab=quizzes`);
  }, [router, locale]);

  return null;
}
