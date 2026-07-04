'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function StudentRootPage() {
  const params = useParams();
  const locale = params.locale || 'en';

  useEffect(() => {
    // Use window.location.replace for instant redirect — avoids Next.js router
    // hydration delay that causes the loading screen to show for too long
    window.location.replace(`/${locale}/student/Home`);
  }, [locale]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-400">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-white font-black uppercase tracking-widest text-xs">Entering Adventure Portal...</p>
      </div>
    </div>
  );
}
