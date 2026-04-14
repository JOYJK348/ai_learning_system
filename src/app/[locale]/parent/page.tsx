'use client';

import React from 'react';
import { 
  Users, 
  BookOpen, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  BrainCircuit, 
  ArrowRight,
  LogOut,
  Settings,
  Trophy,
  History,
  Lightbulb
} from 'lucide-react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Link } from '@/i18n/routing';

/* ─────────── 🔢 SUBTLE ANIMATED COUNTER ─────────── */
const AnimatedCounter = ({ value, duration = 1.5 }: { value: number; duration?: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    const controls = animate(count, value, { duration, ease: "easeOut" });
    return rounded.on("change", (latest) => setDisplayValue(latest));
  }, [value, duration, count, rounded]);

  return <span>{displayValue < 10 ? `0${displayValue}` : displayValue}</span>;
};

export default function ParentDashboard() {
  // Mock data for Phase 1 Demo
  const parentName = "Kumar";
  const childName = "Rahul";
  const childClass = "UKG";
  const childAge = "5 Years";

  const progressData = [
    { title: 'Alphabets', progress: 70, color: 'bg-orange-500', icon: '🔤' },
    { title: 'Numbers', progress: 40, color: 'bg-blue-500', icon: '🔢' },
    { title: 'Colors', progress: 100, color: 'bg-pink-500', icon: '🎨' },
  ];

  const recentActivity = [
    { text: 'Completed "A for Apple" lesson', time: '2 hours ago', icon: '🍏' },
    { text: 'Attempted Numbers Quiz', time: 'Yesterday', icon: '📝', score: '2/3' },
    { text: 'Watched "Baby Shark" rhyme', time: 'Yesterday', icon: '🦈' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans pb-24 text-slate-900">
      {/* ─── PREMIUM NAVIGATION ─── */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-2xl rotate-3">ZI</div>
            <div>
              <span className="block font-black text-slate-900 tracking-tight text-lg leading-none">Parent Portal</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1 block">ZHI LearnAI Ecosystem</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-slate-600 font-bold text-xs hover:bg-slate-100 transition-all border border-slate-100">
              <Settings size={14} /> Account Settings
            </button>
            <Link href="/" className="flex items-center gap-2 text-xs font-black text-rose-500 bg-rose-50 px-4 py-2 rounded-xl hover:bg-rose-100 transition-all border border-rose-100 uppercase tracking-widest">
              <LogOut size={14} /> Logout
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        
        {/* ─── 1. REFINED PROFILE HEADER ─── */}
        <header className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-slate-100"
          >
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border border-indigo-100">
                <Users size={12} /> Parent Dashboard
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                Greetings, {parentName} <span className="text-indigo-600">.</span>
              </h1>
              <p className="text-slate-500 font-medium text-lg leading-relaxed">
                Review <span className="text-slate-900 font-bold underline decoration-indigo-400 decoration-4 underline-offset-4">{childName}&apos;s</span> weekly performance and AI-driven learning insights.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
               <div className="bg-white px-6 py-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
                    <span className="text-xl">👦</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Student</p>
                    <p className="text-base font-black text-slate-900">{childName}</p>
                  </div>
               </div>
               <div className="bg-white px-6 py-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                    <Trophy size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Grade Level</p>
                    <p className="text-base font-black text-slate-900">{childClass}</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </header>

        {/* ─── 2. NEAT & PROFESSIONAL OVERVIEW CARDS ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20">
           {[
             { label: 'Lessons Finalized', value: 5, total: '/ 10', percent: 50, icon: BookOpen, color: 'bg-indigo-600', textColor: 'text-indigo-600', cardBg: 'bg-indigo-50/60', border: 'border-indigo-100' },
             { label: 'Active Topics', value: 3, total: ' topics', percent: 30, icon: TrendingUp, color: 'bg-slate-900', textColor: 'text-slate-900', cardBg: 'bg-slate-50/80', border: 'border-slate-100' },
             { label: 'Neural Engagements', value: 12, total: ' actions', percent: 85, icon: CheckCircle2, color: 'bg-emerald-600', textColor: 'text-emerald-600', cardBg: 'bg-emerald-50/60', border: 'border-emerald-100' },
           ].map((stat, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className={`${stat.cardBg} p-10 rounded-[2.5rem] border ${stat.border} shadow-[0_2px_10px_rgba(0,0,0,0.01)] hover:shadow-xl hover:bg-white transition-all duration-500 overflow-hidden group`}
             >
                <div className="flex justify-between items-start mb-10">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.textColor} bg-white shadow-sm transition-colors`}>
                      <stat.icon size={22} />
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Status</p>
                      <div className="flex items-center gap-2 justify-end">
                         <div className={`w-1.5 h-1.5 rounded-full ${stat.color} animate-pulse`} />
                         <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Real-time</span>
                      </div>
                   </div>
                </div>
                
                <div className="mb-8">
                   <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] mb-4">{stat.label}</p>
                   <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-slate-900 tracking-tighter">
                         <AnimatedCounter value={stat.value} />
                      </span>
                      <span className="text-sm font-black text-slate-300 uppercase tracking-wide">{stat.total}</span>
                   </div>
                </div>

                {/* Subtle Clean Bottom Progress */}
                <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${stat.percent}%` }}
                     transition={{ duration: 1.5, delay: 0.5 }}
                     className={`h-full ${stat.color} rounded-full`}
                   />
                </div>
             </motion.div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           
           {/* LEFT COLUMN: PROGRESS & ACTIVITIES */}
           <div className="lg:col-span-2 space-y-10">
              
              {/* ─── 3. REFINED PROGRESS BARS ─── */}
              <section>
                 <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <TrendingUp className="text-indigo-600" size={24} /> Learning Areas
                      </h2>
                      <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest pl-9">Performance by category</p>
                    </div>
                    <button className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 uppercase tracking-[0.15em] hover:bg-indigo-600 hover:text-white transition-all">
                       Full Analytics
                    </button>
                 </div>
                 <div className="bg-white p-10 rounded-[3rem] shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] border border-slate-50 space-y-10">
                    {progressData.map((item, i) => (
                      <div key={i} className="group">
                        <div className="flex justify-between items-center mb-4">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                                 {item.icon}
                              </div>
                              <span className="font-black text-slate-800 uppercase tracking-widest text-xs">{item.title}</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="font-black text-indigo-600 text-lg">{item.progress}</span>
                              <span className="text-[10px] font-black text-slate-300 uppercase letter-spacing-widest mt-1">%</span>
                           </div>
                        </div>
                        <div className="w-full bg-slate-50 h-[6px] rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${item.progress}%` }}
                             transition={{ duration: 1.5, ease: "circOut" }}
                             className={`h-full ${item.color} rounded-full`}
                           />
                        </div>
                      </div>
                    ))}
                 </div>
              </section>

              {/* ─── 4. REFINED RECENT ACTIVITY ─── */}
              <section>
                 <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <History className="text-indigo-600" size={24} /> Neural Activity
                      </h2>
                      <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest pl-9">Latest child interactions</p>
                    </div>
                 </div>
                 <div className="bg-white rounded-[3rem] shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] border border-slate-50 overflow-hidden">
                    {recentActivity.map((act, i) => (
                      <div key={i} className="flex items-center justify-between p-8 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-all cursor-pointer group">
                         <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:shadow-md transition-all group-hover:-rotate-3">
                               {act.icon}
                            </div>
                            <div>
                               <p className="font-extrabold text-slate-800 text-lg leading-tight group-hover:text-indigo-600 transition-colors">{act.text}</p>
                               <div className="flex items-center gap-4 mt-2">
                                  <span className="text-[10px] text-slate-400 font-black flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-tighter">
                                     <Clock size={12} className="text-slate-300" /> {act.time}
                                  </span>
                                  {act.score && (
                                    <span className="text-[10px] bg-emerald-50 text-emerald-600 font-black px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">
                                       Accuracy: {act.score}
                                    </span>
                                  )}
                               </div>
                            </div>
                         </div>
                         <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            <ArrowRight size={16} />
                         </div>
                      </div>
                    ))}
                 </div>
              </section>
           </div>

           {/* RIGHT COLUMN: INSIGHTS & NEXT STEPS */}
           <div className="space-y-10">
              
              {/* ─── 5. REFINED AI INSIGHTS ─── */}
              <section>
                 <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 uppercase tracking-tight">
                       <BrainCircuit className="text-indigo-600" /> AI Insights
                    </h2>
                 </div>
                 <div className="bg-indigo-50/40 p-8 rounded-[3rem] border border-indigo-100 shadow-sm space-y-8">
                    <div className="flex gap-5 group">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                          <CheckCircle2 size={20} />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Growth Detected</p>
                          <p className="text-sm text-slate-700 leading-relaxed font-medium">
                             Rahul has shown exceptional growth in <span className="text-slate-900 font-bold underline decoration-emerald-200">Alphabets</span>. Mastery of complex phonetic sounds is improving.
                          </p>
                       </div>
                    </div>
                    <div className="flex gap-5 group">
                       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-600 shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                          <Lightbulb size={20} />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Observation</p>
                          <p className="text-sm text-slate-700 leading-relaxed font-medium">
                             Cognitive focus on <span className="text-slate-900 font-bold underline decoration-amber-200">Numbers</span> requires attention. We recommend 10 minutes of interactive counting daily.
                          </p>
                       </div>
                    </div>
                 </div>
              </section>

              {/* ─── 6. NEAT NEXT MILESTONES ─── */}
              <section>
                 <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 uppercase tracking-tight">
                       <Trophy className="text-amber-500" /> Next Milestone
                    </h2>
                 </div>
                 <div className="bg-slate-900 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden text-white group">
                    <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Academic Roadmap</p>
                    <h3 className="text-2xl font-black mb-3 flex items-center gap-3">
                       <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">🦁</span> Animal Jungle
                    </h3>
                    <p className="text-xs text-slate-400 font-bold leading-relaxed mb-8 uppercase tracking-wide">
                       Unlock after Alpha Mastery
                    </p>
                    <button className="w-full py-4 bg-white text-slate-900 hover:bg-indigo-50 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all active:scale-95">
                       Set Active Goal
                    </button>
                 </div>
              </section>

           </div>
        </div>
      </div>
    </div>
  );
}
