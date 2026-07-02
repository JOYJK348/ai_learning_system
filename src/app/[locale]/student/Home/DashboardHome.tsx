'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Play, Star, Compass } from 'lucide-react';
import { audioEngine } from '@/core/utils/audio';
import { useData } from '@/context/DataContext';

export default function DashboardHome() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale || 'en';
  const { subjects, studentProfile, studentLoading } = useData();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeSubjects = useMemo(() => {
    return subjects.filter(s => s.chapters && s.chapters.length > 0);
  }, [subjects]);

  const studentName = studentProfile?.name || 'Explorer';

  if (!mounted || studentLoading) {
    return (
      <div className="relative min-h-screen font-sans overflow-hidden bg-sky-400 flex items-center justify-center">
        <div className="text-2xl font-black text-white">Loading your adventure...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen select-none overflow-hidden bg-sky-400 kids-font pb-24">
      {/* Playful Google Font */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;700;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font {
          font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
        }
      `}} />

      {/* Sky Background Gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-300 via-sky-400 to-emerald-300" />
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/30 blur-[130px] rounded-full" />
      </div>

      {/* Static Clouds */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <span className="absolute top-[8%] left-[10%] text-7xl opacity-30">☁️</span>
        <span className="absolute top-[20%] right-[15%] text-9xl opacity-20">☁️</span>
        <span className="absolute top-[50%] left-[5%] text-6xl opacity-30">☁️</span>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        
        {/* 1. HERO QUEST GREETING BANNER (Same Theme as Quiz/Learn pages) */}
        <div className="py-6 sm:py-8 mb-6 w-full border-b-4 border-white/10 relative">
          <div className="relative w-full flex items-center">
            {/* Skewed white reflection overlay for identical theme feel */}
            <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-white/20 to-transparent skew-x-[-20deg] transform translate-x-32 pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-6">
              <div className="text-center md:text-left flex-1 space-y-3">
                
                {/* Yellow Capsule Badge matching Quiz page */}
                <div className="inline-flex items-center gap-1.5 px-4 py-1 bg-amber-400 text-indigo-950 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-md select-none w-fit">
                  ⭐ ADVENTURE HUB
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-indigo-950 tracking-tight leading-tight font-sans">
                  Let's Play, <br />
                  <span className="text-indigo-800">{studentName.toUpperCase()}!</span>
                </h1>
                
                <p className="text-indigo-900/60 font-bold text-sm sm:text-base">Pick a magical world below to start your games! 🌟🦖</p>
              </div>

              {/* Avatar Mascot with Indigo Glow backdrop */}
              <div className="relative w-28 h-28 sm:w-44 sm:h-44 select-none shrink-0">
                <div className="absolute inset-0 bg-indigo-600/10 blur-[40px] rounded-full" />
                <img 
                  src="/assets/avatars/owl-removebg-preview.png" 
                  className="w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]" 
                  alt="Mascot Helper" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. LEARNING WORLDS */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8 px-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Compass className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-indigo-950 leading-none">Choose a World</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-6 pt-6">
            {activeSubjects.map((subject, idx) => {
              const cardColors = [
                'from-rose-400 to-pink-500 shadow-rose-250/40',
                'from-sky-400 to-blue-500 shadow-blue-250/40',
                'from-orange-400 to-amber-500 shadow-orange-250/40',
                'from-emerald-400 to-teal-500 shadow-emerald-250/40',
                'from-purple-400 to-indigo-500 shadow-purple-250/40',
                'from-lime-400 to-green-500 shadow-lime-250/40',
              ];
              const gradientClass = cardColors[idx % cardColors.length];

              const getSubjectImage = (name: string) => {
                const lower = name.toLowerCase();
                if (lower.includes('tamil') || lower.includes('தமிழ்') || lower.includes('முன்')) return '/assets/subjects/tamil-removebg-preview.png';
                if (lower.includes('english') || lower.includes('ஆங்கிலம்')) return '/assets/subjects/english-removebg-preview.png';
                if (lower.includes('math') || lower.includes('கணிதம்')) return '/assets/subjects/maths-removebg-preview.png';
                if (lower.includes('environment') || lower.includes('evs') || lower.includes('சூழ்நிலையியல்')) return '/assets/subjects/evs-removebg-preview.png';
                if (lower.includes('general') || lower.includes('gk') || lower.includes('பொது அறிவு')) return '/assets/subjects/gk-removebg-preview.png';
                if (lower.includes('hindi') || lower.includes('இந்தி')) return '/assets/subjects/hindi-removebg-preview.png';
                return '/assets/subjects/english-removebg-preview.png';
              };

              const imgUrl = getSubjectImage(subject.name);

              return (
                <button
                  key={subject.id}
                  onClick={() => {
                    audioEngine?.speak(subject.name);
                    router.push(`/${locale}/student/Learn?subject=${subject.id}`);
                  }}
                  className={`group relative w-[75vw] max-w-[280px] sm:w-full sm:max-w-[270px] aspect-square mx-auto rounded-[2.5rem] border-4 border-white shadow-2xl active:scale-95 transition-all bg-gradient-to-br ${gradientClass} flex flex-col items-center justify-between p-4`}
                >
                  {/* Character image centered in card - Optimized with Next.js Image Priority */}
                  <div className="w-full flex-1 flex items-center justify-center select-none pointer-events-none mt-2 relative">
                    <Image 
                      src={imgUrl} 
                      alt={subject.name}
                      width={200}
                      height={200}
                      priority={true}
                      className="max-h-[200px] sm:max-h-[170px] w-auto h-auto object-contain transform scale-105 group-hover:scale-110 transition-all duration-200 drop-shadow-[0_8px_8px_rgba(0,0,0,0.2)]" 
                    />
                  </div>

                  {/* Clean text directly on card (No white container) */}
                  <h3 className="text-white font-black text-base sm:text-2xl tracking-tight leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)] uppercase w-full text-center mt-2">
                    {subject.name}
                  </h3>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

