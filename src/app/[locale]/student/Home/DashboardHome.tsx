'use client';

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { audioEngine } from '@/core/utils/audio';

/* ─────────────── ZONE DATA ─────────────── */
const ZONES = [
  {
    id: 'alpha',
    name: 'ALPHABET',
    mascot: '🦉',
    color: 'from-orange-400 to-amber-500',
    unlockRequirement: null,
    unlocked: true,
    position: { top: '15%', left: '10%' },
    size: 'w-24 h-28 sm:w-40 sm:h-48',
  },
  {
    id: 'math',
    name: 'NUMBER',
    mascot: '🤖',
    color: 'from-blue-400 to-indigo-500',
    unlockRequirement: 'Finish Alphabet Forest first!',
    unlocked: true,
    position: { top: '22%', right: '10%' },
    size: 'w-24 h-28 sm:w-40 sm:h-48',
  },
  {
    id: 'animal',
    name: 'ANIMAL',
    mascot: '🦁',
    color: 'from-emerald-400 to-green-600',
    unlockRequirement: 'Climb the Number Mountain first!',
    unlocked: true,
    position: { top: '42%', left: '8%' },
    size: 'w-24 h-28 sm:w-40 sm:h-48',
  },
  {
    id: 'color',
    name: 'COLOR',
    mascot: '🦜',
    color: 'from-pink-400 to-rose-500',
    unlockRequirement: 'Explore Animal Jungle first!',
    unlocked: false,
    position: { top: '55%', right: '10%' },
    size: 'w-20 h-24 sm:w-36 sm:h-44',
  },
  {
    id: 'birds',
    name: 'BIRDS',
    mascot: '🦅',
    color: 'from-sky-400 to-cyan-500',
    unlockRequirement: 'Unlock Color Kingdom first!',
    unlocked: false,
    position: { top: '72%', left: '15%' },
    size: 'w-20 h-24 sm:w-36 sm:h-44',
  },
  {
    id: 'shapes',
    name: 'SHAPES',
    mascot: '⭐',
    color: 'from-yellow-400 to-orange-400',
    unlockRequirement: 'Visit Bird Sky first!',
    unlocked: false,
    position: { top: '82%', right: '12%' },
    size: 'w-20 h-24 sm:w-36 sm:h-44',
  },
];

/* ─────────────── LANDMARK COMPONENTS ─────────────── */

const AlphaLandmark = ({ unlocked }: { unlocked: boolean }) => (
  <div className={`relative flex flex-col items-center gap-1 ${!unlocked && 'grayscale opacity-40'}`}>
     <div className="flex -space-x-2">
        <div className="w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl sm:text-4xl shadow-xl border-b-8 border-orange-700 -rotate-6">A</div>
        <div className="w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl sm:text-4xl shadow-xl border-b-8 border-blue-700 mt-6 rotate-6">B</div>
     </div>
  </div>
);

const MathLandmark = ({ unlocked }: { unlocked: boolean }) => (
  <div className={`relative flex flex-col items-center gap-1 ${!unlocked && 'grayscale opacity-40'}`}>
     <div className="w-14 h-14 sm:w-24 sm:h-24 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center text-white font-black text-3xl sm:text-5xl shadow-2xl border-4 border-white">1</div>
     <div className="flex -mt-6 gap-2">
        <div className="w-10 h-10 sm:w-16 sm:h-16 bg-pink-500 rounded-full flex items-center justify-center text-white font-black text-xl sm:text-2xl shadow-xl border-2 border-white/40">2</div>
        <div className="w-10 h-10 sm:w-16 sm:h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white font-black text-xl sm:text-2xl shadow-xl border-2 border-white/40">3</div>
     </div>
  </div>
);

const AnimalLandmark = ({ unlocked }: { unlocked: boolean }) => (
  <div className={`relative flex items-center justify-center ${!unlocked && 'grayscale opacity-40'}`}>
      <span className="text-6xl sm:text-8xl drop-shadow-2xl z-20">🦒</span>
      <span className="text-4xl sm:text-6xl drop-shadow-xl -ml-6 mt-6 opacity-90">🐘</span>
  </div>
);

const MagicCastle = () => (
  <div className="relative w-56 h-56 sm:w-96 sm:h-96 flex items-center justify-center animate-[float_4s_ease-in-out_infinite]">
    <style>{`
      @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
    `}</style>
    <div className="absolute inset-10 bg-white/40 blur-3xl rounded-full" />
    <img 
      src="/central_magic_hub-removebg-preview.png" 
      alt="Magic Hub" 
      className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
    />
  </div>
);

const GenericLandmark = ({ unlocked, emoji }: { unlocked: boolean, emoji: string }) => (
  <div className={`relative flex flex-col items-center justify-center ${!unlocked && 'grayscale opacity-30 focus-within:grayscale-0'}`}>
     <div className="w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-[2.5rem] border-4 border-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
        <span className="text-5xl sm:text-7xl group-hover:drop-shadow-2xl transition-all">{emoji}</span>
     </div>
  </div>
);

const RoadmapPath = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" preserveAspectRatio="none">
    <path d="M 120 150 C 400 100, 600 300, 850 200 S 1100 400, 1500 300" stroke="#ffffff" strokeWidth="8" strokeDasharray="20 20" fill="none" strokeLinecap="round" className="hidden sm:block" />
    <path d="M 120 150 Q 800 200, 500 500 T 800 800" stroke="#ffffff" strokeWidth="8" strokeDasharray="20 20" fill="none" strokeLinecap="round" className="block sm:hidden" />
  </svg>
);

/* ─────────────── MAIN PAGE ─────────────── */
export default function DashboardHome() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale || 'en';

  const activeZone = [...ZONES].reverse().find(z => z.unlocked) || ZONES[0];

  return (
    <div className="relative min-h-screen font-sans select-none overflow-hidden bg-[#87CEEB]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] to-[#B2EBF2]" />
      <div className="absolute inset-0 pointer-events-none z-0">
          <span className="absolute top-[8%] left-[15%] text-7xl opacity-40">☁️</span>
          <span className="absolute top-[20%] right-[20%] text-9xl opacity-30">☁️</span>
          <span className="absolute top-[50%] left-[5%] text-6xl opacity-40">☁️</span>
          <span className="absolute top-[75%] right-[10%] text-8xl opacity-30">☁️</span>
      </div>
      <RoadmapPath />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-80 scale-75 sm:scale-100">
         <MagicCastle />
      </div>
      <div className="absolute inset-0 pointer-events-none z-0">
         <span className="absolute bottom-[30%] left-[40%] text-5xl">🌳</span>
         <span className="absolute top-[30%] right-[40%] text-4xl">🌲</span>
         <span className="absolute bottom-[10%] right-[30%] text-4xl">🌸</span>
         <span className="absolute top-[15%] left-[45%] text-3xl">🍄</span>
      </div>
      <div className="relative z-10 w-full min-h-screen">
        {ZONES.map((zone) => (
          <div key={zone.id} className={`absolute ${zone.size} transition-all active:scale-95 duration-300 group`} style={zone.position}>
            <button
              onPointerDown={() => { 
                if (zone.unlocked) {
                  audioEngine?.speak(`${zone.name} Adventure!`);
                  router.push(`/${locale}/student/Learn?category=${zone.id}`); 
                } else {
                  audioEngine?.speak("Unlock this area first!");
                }
              }}
              className="w-full h-full flex flex-col items-center justify-center cursor-pointer [touch-action:none]"
              suppressHydrationWarning
            >
              <div className="relative">
                {zone.id === 'alpha' && <AlphaLandmark unlocked={zone.unlocked} />}
                {zone.id === 'math' && <MathLandmark unlocked={zone.unlocked} />}
                {zone.id === 'animal' && <AnimalLandmark unlocked={zone.unlocked} />}
                {zone.id !== 'alpha' && zone.id !== 'math' && zone.id !== 'animal' && (
                  <GenericLandmark unlocked={zone.unlocked} emoji={zone.id === 'color' ? '🎨' : zone.id === 'birds' ? '🦅' : '⭐'} />
                )}
              </div>
              <div className={`mt-4 px-4 py-2 rounded-2xl border-4 border-white shadow-xl transition-all ${zone.unlocked ? `bg-gradient-to-r ${zone.color}` : 'bg-gray-400'} group-hover:scale-110 group-active:scale-90`}>
                <span className="text-[11px] sm:text-sm font-black text-white uppercase tracking-widest">{zone.unlocked ? zone.name : '🔒'}</span>
              </div>
            </button>
          </div>
        ))}
      </div>
      <div className="absolute z-20 pointer-events-none transition-all duration-1000 ease-in-out"
        style={{ 
          top: `calc(${activeZone.position.top} - 30px)`, 
          left: activeZone.position.left || `calc(100% - ${activeZone.position.right})`,
          transform: activeZone.position.right ? 'translateX(-100%)' : 'none'
        }}
      >
        <div className="relative">
           <div className="w-12 h-12 bg-white rounded-full border-4 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.5)] p-0.5 animate-bounce">
              <div className="w-full h-full bg-blue-50 rounded-full flex items-center justify-center text-lg">🏃</div>
           </div>
           <div className="absolute top-14 left-1/2 -translate-x-1/2 px-3 py-1 bg-yellow-400 text-white text-[8px] font-black rounded-full shadow-lg whitespace-nowrap">AGNIKA</div>
        </div>
      </div>
    </div>
  );
}
