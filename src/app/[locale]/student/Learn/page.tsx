'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowLeft, CheckCircle, 
  PlayCircle, Mic2, Tv, Gamepad2,
  ChevronRight, Star, Heart, Flame,
  Compass, Zap, Award, BookOpen,
  Map as MapIcon,
  Trophy, Target, Music, PartyPopper
} from 'lucide-react';
import { audioEngine } from '@/core/utils/audio';
import { useRouter, useSearchParams } from 'next/navigation';
import { useData } from '@/context/DataContext';
import MediaWorld from '../_components/MediaWorld';
import QuizEngine from '../_components/QuizEngine';

export default function UltimateLearnEngine() {
  const { categories, lessons: allLessons, updateProgress } = useData();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<'hub' | 'zone'>(categoryParam ? 'zone' : 'hub');
  const [activeZoneId, setActiveZoneId] = useState<string | null>(categoryParam);
  const [activeQuiz, setActiveQuiz] = useState<any | null>(null);

  useEffect(() => {
    setMounted(true);
    audioEngine?.warmUp(); // Kickstart the engine
    if (categoryParam) {
      setActiveZoneId(categoryParam);
      setView('zone');
    } else {
      setView('hub');
    }
  }, [categoryParam]);

  const activeZone = useMemo(() => categories.find(c => c.id === activeZoneId), [activeZoneId, categories]);
  const zoneLessons = useMemo(() => activeZoneId ? (allLessons[activeZoneId] || []) : [], [activeZoneId, allLessons]);

  const openZone = (id: string) => router.push(`?category=${id}`, { scroll: true });
  const closeZone = () => router.push('/en/student/Learn', { scroll: true });

  const speakText = (text: string) => {
    audioEngine?.speak(text, { rate: 0.9, pitch: 1.2 });
  };

  const handleLessonInteraction = (lesson: any) => {
    if (lesson.quiz) {
      setActiveQuiz(lesson);
    } else {
      speakText(lesson.title);
    }
  };

  const handleQuizComplete = (lessonId: string) => {
    if (activeZoneId) {
      updateProgress(activeZoneId, lessonId, 'completed');
    }
    setActiveQuiz(null);
  };



  return (
    <div className="relative font-sans overflow-hidden bg-sky-400">
      
      {/* ─── GLOBAL MAGICAL SKY ATMOSPHERE ─── */}
      <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-300 via-sky-400 to-blue-500" />
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)' , backgroundSize: '40px 40px' }} />
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-blue-300/30 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 w-full pt-0">
        <div className="w-full">
          
          {/* 1. MAGICAL MISSION HERO */}
          <div className="relative px-0">
             <div className="relative w-full flex items-center overflow-hidden pt-10 pb-10 sm:pt-14 sm:pb-12 border-b-8 border-white/10">
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)' , backgroundSize: '40px 40px' }} />
                <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-white/30 to-transparent skew-x-[-20deg] transform translate-x-32" />
                <div className="absolute top-10 left-[10%] text-6xl opacity-40 animate-bounce cursor-default">☁️</div>
                <div className="absolute bottom-20 left-[30%] text-4xl opacity-30 animate-pulse cursor-default">☁️</div>
                <div className="absolute top-20 right-[40%] text-8xl opacity-30 animate-bounce cursor-default" style={{ animationDelay: '1s' }}>☁️</div>

                <div className="relative z-20 w-full px-6 sm:px-16 flex flex-col md:flex-row items-center justify-between gap-12">
                   <div className="flex-1 space-y-6 text-center md:text-left">
                      <motion.div 
                        initial={{ opacity: 1, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-600 text-white rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-indigo-600/20"
                      >
                         <Star size={16} fill="currentColor" /> Level 12 Legend
                      </motion.div>
                      
                      <h1 className="text-5xl sm:text-8xl font-black text-indigo-950 leading-[0.9] tracking-tighter drop-shadow-sm">
                         READY FOR A <br/>
                         <span className="text-indigo-800">MISSION, ARJUN?</span>
                      </h1>
                      
                      <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                         <div className="px-8 py-4 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl flex items-center gap-4">
                            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                               <Zap size={20} className="text-white" />
                            </div>
                            <div className="text-left">
                               <p className="text-[10px] font-black text-indigo-950 uppercase leading-none mb-1">Status</p>
                               <p className="text-sm font-black text-indigo-900">Hyper Active 🔥</p>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="relative group">
                      <div className="absolute inset-0 bg-white/40 blur-[100px] rounded-full group-hover:bg-white/60 transition-all duration-500" />
                      <div className="relative w-64 h-64 sm:w-[450px] sm:h-[450px] drop-shadow-[0_45px_45px_rgba(0,0,0,0.15)] transform group-hover:scale-110 transition-transform duration-700">
                         <img 
                           src="/assets/avatars/owl-removebg-preview.png" 
                           className="w-full h-full object-contain animate-[float_4s_ease-in-out_infinite]" 
                           alt="Mission Master Owl" 
                         />
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* 2. ENERGETIC STATS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 px-4 sm:px-12">
             {[
               { label: 'Words Mastered', val: '124', emoji: '📖', color: 'text-emerald-600' },
               { label: 'Star Points', val: '2,450', emoji: '⭐', color: 'text-amber-600' },
               { label: 'Time Spent', val: '4.2h', emoji: '⏰', color: 'text-blue-600' },
               { label: 'Daily Streak', val: '5 Days', emoji: '🔥', color: 'text-rose-600' },
             ].map((s, i) => (
                <div key={i} className="bg-white/40 backdrop-blur-3xl rounded-[2.5rem] p-6 sm:p-8 text-center border border-white/60 shadow-2xl relative overflow-hidden group active:scale-95 transition-all">
                   <span className="text-3xl sm:text-4xl mb-3 block transform group-hover:scale-110 transition-transform">{s.emoji}</span>
                   <span className={`text-xl sm:text-2xl font-black ${s.color} block mb-0.5 leading-tight`}>{s.val}</span>
                   <span className="text-[9px] sm:text-[10px] font-black text-indigo-950/60 uppercase tracking-widest">{s.label}</span>
                </div>
             ))}
          </div>

          <AnimatePresence mode="wait">
            {view === 'hub' ? (
              <motion.div 
                key="hub"
                initial={{ opacity: 1, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                 {/* 3. DAILY MISSIONS */}
                 <div className="px-4 sm:px-12 mb-16">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Target className="text-white" size={20} />
                       </div>
                       <h2 className="text-xl font-black text-indigo-950 uppercase tracking-wider">Your Daily Missions</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       {[
                         { title: 'Learn 5 Letters', icon: <BookOpen />, color: 'bg-blue-400', progress: 60 },
                         { title: 'Listen to a Rhyme', icon: <Music />, color: 'bg-purple-400', progress: 100 },
                         { title: 'Win 1 Animal Game', icon: <Gamepad2 />, color: 'bg-emerald-400', progress: 20 },
                       ].map((m, i) => (
                         <div key={i} className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-full p-4 flex items-center gap-4 shadow-xl hover:bg-white/50 transition-all group cursor-pointer">
                            <div className={`w-12 h-12 rounded-full ${m.color} flex items-center justify-center text-white shadow-lg`}>
                               {m.icon}
                            </div>
                            <div className="flex-1 pr-4">
                               <p className="text-xs font-black text-indigo-950 mb-1.5 leading-none">{m.title}</p>
                               <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
                                  <div className={`h-full ${m.color}`} style={{ width: `${m.progress}%` }} />
                               </div>
                            </div>
                            {m.progress === 100 && <div className="pr-4"><Sparkles className="text-amber-500" size={16} /></div>}
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* 4. DISCOVERY WORLDS */}
                 <div className="px-4 sm:px-12 mb-20">
                    <div className="flex items-center gap-4 mb-10">
                       <div className="w-10 h-10 bg-white/40 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/60 shadow-lg">
                          <MapIcon className="text-indigo-950" size={20} />
                       </div>
                       <div>
                          <h2 className="text-2xl font-black text-indigo-950 leading-none">Discovery Worlds</h2>
                          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest mt-1">Pick a kingdom to learn</p>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {categories.map((zone) => (
                        <button
                          key={zone.id}
                          onClick={() => openZone(zone.id)}
                          className="group relative"
                        >
                          <div className={`absolute inset-0 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${
                            zone.id === 'alpha' ? 'bg-orange-400' : 
                            zone.id === 'math' ? 'bg-blue-400' : 
                            zone.id === 'color' ? 'bg-pink-400' : 'bg-emerald-400'
                          }`} />
                          
                          <div className={`relative backdrop-blur-3xl rounded-[3.5rem] p-2 border-2 transition-all duration-700 group-hover:-translate-y-6 ${
                            zone.id === 'alpha' ? 'bg-orange-400/20 border-orange-300 shadow-[0_20px_40px_rgba(251,146,60,0.15)]' : 
                            zone.id === 'math' ? 'bg-blue-400/20 border-blue-300 shadow-[0_20px_40px_rgba(56,189,248,0.15)]' : 
                            zone.id === 'color' ? 'bg-pink-400/20 border-pink-300 shadow-[0_20px_40px_rgba(244,114,181,0.15)]' : 
                            'bg-emerald-400/20 border-emerald-300 shadow-[0_20px_40px_rgba(52,211,153,0.15)]'
                          }`}>
                            <div className="min-h-[320px] flex flex-col items-center justify-center p-8 relative overflow-hidden">
                               <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/40 blur-3xl rounded-full" />
                               <div className="w-full h-40 flex items-center justify-center mb-8 drop-shadow-[0_25px_25px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-transform duration-700">
                                  <img 
                                    src={`/assets/portals/${zone.id === 'alpha' ? 'alphabet' : zone.id === 'math' ? 'numbers' : zone.id === 'color' ? 'colors' : 'animals'}-removebg-preview.png`} 
                                    className="w-full h-full object-contain"
                                    alt={zone.title}
                                  />
                               </div>
                               <div className="text-center z-10">
                                  <h3 className="text-2xl font-black text-indigo-950 uppercase tracking-tighter leading-none mb-1">{zone.title}</h3>
                                  <p className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest">Tap to Explore</p>
                               </div>
                               <div className="absolute bottom-6 left-10 right-10">
                                  <div className="w-full h-2 bg-indigo-950/10 rounded-full overflow-hidden">
                                     <div className={`h-full bg-indigo-900 transition-all`} style={{ width: `${zone.progress}%` }} />
                                  </div>
                               </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                 </div>

                 {/* 6. THE LEGEND'S JOURNEY */}
                 <section className="mb-24 px-4 sm:px-12">
                   <div className="flex flex-col md:flex-row items-end justify-between mb-12 px-2">
                      <div className="text-center md:text-left mb-6 md:mb-0">
                         <h2 className="text-4xl sm:text-6xl font-black text-indigo-950 tracking-tighter uppercase leading-[0.8]">The Legend's Journey</h2>
                         <p className="text-indigo-950/40 font-bold text-xs uppercase tracking-[0.3em] mt-4">Growth Intelligence Hub</p>
                      </div>
                      <div className="flex items-center gap-4 bg-white/40 backdrop-blur-2xl px-8 py-4 rounded-[2rem] border border-white/60 shadow-2xl">
                         <div className="text-right">
                            <p className="text-[10px] font-black text-indigo-950 uppercase leading-none mb-1 opacity-40 tracking-widest">Global Rank</p>
                            <p className="text-2xl font-black text-indigo-950 leading-none">#1,425</p>
                         </div>
                         <div className="w-14 h-14 bg-amber-400 rounded-2xl flex items-center justify-center text-indigo-950 shadow-lg">
                            <Trophy size={28} />
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                          { title: 'Alpha Master', progress: 45, color: 'bg-orange-500', icon: BookOpen, val: '12/26' },
                          { title: 'Math Genius', progress: 20, color: 'bg-blue-500', icon: Zap, val: '5/20' },
                          { title: 'Nature Expert', progress: 85, color: 'bg-emerald-500', icon: Heart, val: '15/18' },
                          { title: 'Art explorer', progress: 10, color: 'bg-pink-500', icon: Sparkles, val: '2/15' }
                        ].map((skill, i) => (
                          <div key={i} className="bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[2.5rem] p-8 shadow-xl group hover:bg-white/60 transition-all">
                             <div className="flex items-center justify-between mb-8">
                                <div className={`w-14 h-14 rounded-2xl ${skill.color} flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform`}>
                                   <skill.icon size={28} />
                                </div>
                                <div className="text-right">
                                   <p className="text-2xl font-black text-indigo-950 leading-none">{skill.progress}%</p>
                                   <p className="text-[10px] font-black text-indigo-950/40 uppercase mt-1 tracking-widest">Mastery</p>
                                </div>
                             </div>
                             <h4 className="text-lg font-black text-indigo-950 uppercase mb-1 tracking-tight">{skill.title}</h4>
                             <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest mb-6">{skill.val} Badges Won</p>
                             <div className="w-full h-2 bg-indigo-950/10 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.progress}%` }}
                                  className="h-full bg-indigo-600 transition-all" 
                                />
                             </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[2.5rem] p-8 shadow-xl">
                         <h3 className="text-xl font-black text-indigo-950 uppercase mb-8 flex items-center gap-3">
                            <Award className="text-amber-500" /> Recent Glory
                         </h3>
                         <div className="space-y-4">
                            {[
                              { name: 'Fastest 🌸', date: '2h ago', points: '+50' },
                              { name: 'Word King 👑', date: 'Yesterday', points: '+150' },
                              { name: 'Streak 5 🔥', date: '2 Days ago', points: '+200' },
                              { name: 'Animal Boss 🦁', date: '3 Days ago', points: '+300' },
                            ].map((ach, i) => (
                              <div key={i} className="flex items-center justify-between p-4 bg-indigo-900/5 rounded-2xl border border-indigo-900/10 hover:bg-indigo-900/10 transition-all cursor-default">
                                 <div>
                                    <p className="text-sm font-black text-indigo-950 leading-none mb-1">{ach.name}</p>
                                    <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest">{ach.date}</p>
                                 </div>
                                 <span className="text-orange-600 font-black text-sm">{ach.points}</span>
                              </div>
                            ))}
                         </div>
                         <button className="w-full mt-10 py-5 bg-indigo-600 text-white font-black text-xs rounded-2xl uppercase tracking-[0.3em] shadow-xl hover:bg-indigo-700 transition-all active:scale-95">Hall of Fame</button>
                      </div>
                   </div>
                 </section>
              </motion.div>
            ) : (
              <motion.div 
                key="zone"
                initial={{ opacity: 1, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="px-4 sm:px-12"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
                   <button 
                     onClick={closeZone}
                     className="inline-flex items-center gap-2 text-indigo-950 font-black px-6 py-3 bg-white/40 border border-white/60 rounded-2xl shadow-xl hover:bg-white/60 transition-all"
                   >
                     <ArrowLeft size={18} /> Back to Hub
                   </button>
                   <div className="text-center sm:text-right">
                      <h2 className="text-3xl font-black text-indigo-950 uppercase tracking-tighter leading-none">Explorer Zone</h2>
                      <p className="text-[10px] font-black text-indigo-950/40 uppercase tracking-widest mt-1">Adventure starts here</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                  {zoneLessons.map((lesson: any) => (
                    <button
                      key={lesson.id}
                      onClick={() => handleLessonInteraction(lesson)}
                      className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-8 text-center shadow-xl hover:bg-white/60 transition-all group active:scale-95"
                    >
                       <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-xl">{lesson.emoji}</div>
                       <h3 className="text-lg font-black text-indigo-950 mb-8 tracking-tight">{lesson.title}</h3>
                       <div className="w-full py-4 bg-indigo-600 rounded-2xl text-[10px] font-black text-white shadow-xl flex items-center justify-center gap-2 group-hover:bg-indigo-500 transition-colors">
                          START MISSION <PlayCircle size={16} />
                       </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      <AnimatePresence>
        {activeQuiz && (
          <div className="fixed inset-0 z-[200] bg-white overflow-y-auto pb-32">
            <QuizEngine
              lesson={activeQuiz}
              onClose={() => setActiveQuiz(null)}
              onComplete={handleQuizComplete}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
