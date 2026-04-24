'use client';

import React, { useEffect } from 'react';
import { usePathname } from '@/i18n/routing';
import StudentBottomNav from './_components/StudentBottomNav';
import { audioEngine } from '@/core/utils/audio';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Force absolute scroll reset on any internal navigation
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Prime the audio engine for the session
    audioEngine?.warmUp();
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      
      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 w-full transition-opacity duration-300">
        {children}
        <div className="h-24 sm:h-32" />
      </main>

      {/* ── NAVIGATION ── */}
      <StudentBottomNav />

    </div>
  );
}

