'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { audioEngine } from '@/core/utils/audio';
import { useData } from '@/context/DataContext';

const ZONE_EMOJIS = ['🦉', '🤖', '🦁', '🦜', '🦅', '⭐', '🐘', '🐬', '🦋', '🌸'];
const ZONE_COLORS = [
  'from-orange-400 to-amber-500',
  'from-blue-400 to-indigo-500',
  'from-emerald-400 to-green-600',
  'from-pink-400 to-rose-500',
  'from-sky-400 to-cyan-500',
  'from-yellow-400 to-orange-400',
  'from-purple-400 to-violet-500',
  'from-teal-400 to-cyan-500',
  'from-rose-400 to-pink-500',
  'from-lime-400 to-green-500',
];

const POSITIONS = [
  { top: '20%', left: '10%' },
  { top: '25%', right: '10%' },
  { top: '45%', left: '8%' },
  { top: '55%', right: '10%' },
  { top: '72%', left: '15%' },
  { top: '82%', right: '12%' },
  { top: '15%', left: '45%' },
  { top: '35%', right: '35%' },
  { top: '65%', left: '45%' },
  { top: '88%', left: '40%' },
];

const MagicCastle = () => (
  <div className="relative w-56 h-56 sm:w-96 sm:h-96 flex items-center justify-center animate-[float_4s_ease-in-out_infinite] [will-change:transform]">
    <style>{`
      @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    `}</style>
    <div className="absolute inset-10 bg-white/20 rounded-full" />
    <img
      src="/central_magic_hub-removebg-preview.png"
      alt="Magic Hub"
      className="relative z-10 w-full h-full object-contain drop-shadow-md"
    />
  </div>
);

const RoadmapPath = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
    <path d="M 120 150 C 400 100, 600 300, 850 200 S 1100 400, 1500 300" stroke="#ffffff" strokeWidth="8" strokeDasharray="20 20" fill="none" strokeLinecap="round" className="hidden sm:block" />
    <path d="M 120 150 Q 800 200, 500 500 T 800 800" stroke="#ffffff" strokeWidth="8" strokeDasharray="20 20" fill="none" strokeLinecap="round" className="block sm:hidden" />
  </svg>
);

export default function DashboardHome() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale || 'en';
  const { subjects, studentProfile, studentLoading } = useData();

  // Filter out subjects that do not have chapters
  const activeSubjects = useMemo(() => {
    return subjects.filter(s => s.chapters && s.chapters.length > 0);
  }, [subjects]);

  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  useEffect(() => {
    if (activeSubjects.length > 0 && !selectedSubjectId) {
      setSelectedSubjectId(activeSubjects[0].id);
    }
  }, [activeSubjects, selectedSubjectId]);

  const currentSubject = useMemo(() => {
    return activeSubjects.find(s => s.id === selectedSubjectId) || activeSubjects[0];
  }, [activeSubjects, selectedSubjectId]);

  const zones = useMemo(() => {
    if (!currentSubject) return [];
    return currentSubject.chapters.map((ch, i) => ({
      id: ch.id,
      name: ch.name,
      mascot: ZONE_EMOJIS[i % ZONE_EMOJIS.length],
      color: ZONE_COLORS[i % ZONE_COLORS.length],
      unlocked: ch.is_unlocked,
      position: POSITIONS[i % POSITIONS.length],
      progress: ch.completion_percentage,
    }));
  }, [currentSubject]);

  const studentName = studentProfile?.name || 'Explorer';
  const activeZone = useMemo(() => {
    return [...zones].reverse().find(z => z.unlocked) || zones[0];
  }, [zones]);

  if (studentLoading) {
    return (
      <div className="relative min-h-screen font-sans select-none overflow-hidden bg-[#87CEEB] flex items-center justify-center">
        <div className="text-2xl font-black text-white animate-pulse">Loading your world...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-sans select-none overflow-hidden bg-[#87CEEB]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] to-[#B2EBF2]" />
      
      {/* Clouds - Flat CSS positioned */}
      <div className="absolute inset-0 pointer-events-none z-0">
          <span className="absolute top-[8%] left-[15%] text-7xl opacity-30">☁️</span>
          <span className="absolute top-[20%] right-[20%] text-9xl opacity-20">☁️</span>
          <span className="absolute top-[50%] left-[5%] text-6xl opacity-30">☁️</span>
          <span className="absolute top-[75%] right-[10%] text-8xl opacity-20">☁️</span>
      </div>

      <RoadmapPath />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-70 scale-75 sm:scale-100">
         <MagicCastle />
      </div>

      <div className="absolute inset-0 pointer-events-none z-0">
         <span className="absolute bottom-[30%] left-[40%] text-5xl opacity-40">🌳</span>
         <span className="absolute top-[30%] right-[40%] text-4xl opacity-40">🌲</span>
         <span className="absolute bottom-[10%] right-[30%] text-4xl opacity-40">🌸</span>
         <span className="absolute top-[15%] left-[45%] text-3xl opacity-40">🍄</span>
      </div>

      {/* Active Subject Pills Selector */}
      {activeSubjects.length > 1 && (
        <div className="absolute top-6 left-0 right-0 z-30 flex justify-center gap-3 px-4">
          <div className="bg-white/80 p-1.5 rounded-[2rem] shadow-xl flex gap-2 border border-white/60">
            {activeSubjects.map((s) => {
              const isSelected = s.id === selectedSubjectId;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedSubjectId(s.id);
                    audioEngine?.speak(`${s.name} World!`);
                  }}
                  className={`px-6 py-2.5 rounded-[1.8rem] text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md scale-105'
                      : 'text-indigo-950 hover:bg-white/50'
                  }`}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Chapters (Zones) */}
      <div className="relative z-10 w-full min-h-screen pt-24">
        {zones.map((zone, idx) => (
          <div key={zone.id} className="absolute w-24 h-28 sm:w-40 sm:h-48 transition-transform active:scale-95 duration-200 group" style={zone.position}>
            <button
              onClick={() => {
                if (zone.unlocked) {
                  audioEngine?.speak(`${zone.name} Adventure!`);
                  router.push(`/${locale}/student/Learn?subject=${currentSubject?.id}&chapter=${zone.id}`);
                } else {
                  audioEngine?.speak("Unlock this area first!");
                }
              }}
              className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
              suppressHydrationWarning
            >
              <div className={`relative flex flex-col items-center justify-center ${!zone.unlocked && 'grayscale opacity-30'}`}>
                {idx < 3 ? (
                  <div className="relative flex items-center justify-center">
                    <span className="text-5xl sm:text-7xl drop-shadow-md">{zone.mascot}</span>
                  </div>
                ) : (
                  <div className="w-16 h-16 sm:w-28 sm:h-28 bg-white rounded-[2rem] border-4 border-white shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    <span className="text-4xl sm:text-6xl">{zone.mascot}</span>
                  </div>
                )}
              </div>
              <div className={`mt-2 px-3 py-1.5 rounded-2xl border-4 border-white shadow-md transition-all text-center max-w-[120px] sm:max-w-[160px] ${
                zone.unlocked ? `bg-gradient-to-r ${zone.color}` : 'bg-gray-400'
              } group-hover:scale-105 group-active:scale-95`}>
                <span className="text-[8px] sm:text-[10px] font-black text-white uppercase tracking-tight leading-tight block">
                  {zone.unlocked ? zone.name : '🔒'}
                </span>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Avatar Tracker */}
      {activeZone && (
        <div className="absolute z-20 pointer-events-none transition-all duration-700 ease-out"
          style={{
            top: `calc(${activeZone?.position?.top || '20%'} - 30px)`,
            left: activeZone?.position?.left || `calc(100% - ${(activeZone?.position as any)?.right || '10%'})`,
            transform: (activeZone?.position as any)?.right ? 'translateX(-100%)' : 'none'
          }}
        >
          <div className="relative">
             <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full border-4 border-yellow-400 shadow-md p-0.5 animate-bounce">
                <div className="w-full h-full bg-blue-50 rounded-full flex items-center justify-center text-base sm:text-lg">🏃</div>
             </div>
             <div className="absolute top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-yellow-400 text-white text-[8px] font-black rounded-full shadow whitespace-nowrap">
               {studentName.toUpperCase()}
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
