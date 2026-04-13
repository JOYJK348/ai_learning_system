'use client';

import React from 'react';
import StudentBottomNav from './_components/StudentBottomNav';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

