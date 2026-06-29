'use client';

const RHYME_COLORS = [
  'from-rose-400 to-pink-500',
  'from-sky-400 to-blue-500',
  'from-orange-400 to-amber-500',
  'from-emerald-400 to-teal-500',
  'from-purple-400 to-indigo-500',
  'from-lime-400 to-green-500',
];

import React, { useState, useRef, useEffect } from 'react';
import { Play, X, Disc, Music, Film, Pause, Sparkles, Tv, Monitor, ArrowRight, Plus, Star, Compass, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioEngine } from '@/core/utils/audio';

/* ─────────── DATA ─────────── */
const RHYMES = [
  { id: 1, title: 'Twinkle Star', image: '⭐', color: 'from-violet-400 to-purple-500' },
  { id: 2, title: 'ABC Fun',     image: '🔤', color: 'from-blue-400 to-indigo-500' },
  { id: 3, title: 'Baby Shark',  image: '🦈', color: 'from-cyan-400 to-sky-500' },
  { id: 4, title: 'Old Farm',    image: '🐄', color: 'from-emerald-400 to-green-500' },
  { id: 5, title: 'Wheels Bus',  image: '🚌', color: 'from-yellow-400 to-orange-500' },
  { id: 6, title: 'Humpty Dumpty', image: '🥚', color: 'from-red-400 to-rose-500' },
];

const VIDEOS = [
  { 
    id: 1, title: 'Alphabet Forest', emoji: '🔡', tag: 'A - Z WORLD', youtubeId: 'hq3yfQnllfQ', color: 'from-orange-400 to-amber-500',
    thumb: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?q=80&w=600&h=800&fit=crop' 
  },
  { 
    id: 2, title: 'Number Galaxy', emoji: '🔢', tag: 'MATH LAND', youtubeId: 'DR-cfDsHuGA', color: 'from-indigo-400 to-purple-600',
    thumb: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=600&h=800&fit=crop'
  },
  { 
    id: 3, title: 'Animal Jungle', emoji: '🦁', tag: 'ZOO SAFARI', youtubeId: 'F3YoHSuXSJ4', color: 'from-emerald-400 to-green-600',
    thumb: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=600&h=800&fit=crop'
  },
];

/* ─────────── MAIN ─────────── */
export default function MediaWorld() {
  const [playing, setPlaying] = useState<number | null>(null);
  const [video, setVideo] = useState<typeof VIDEOS[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    // Warm up the engine on mount
    audioEngine?.warmUp();

    return () => {
      audioEngine?.stopAllAudio();
    };
  }, []);

  const speakText = (text: string) => {
    audioEngine?.speak(text);
  };

  const handleRhymePlay = (rhyme: typeof RHYMES[0]) => {
    if (playing === rhyme.id) {
      audioEngine?.stopAllAudio();
      setPlaying(null);
    } else {
      audioEngine?.stopAllAudio();
      setPlaying(rhyme.id);
      speakText(`Let's sing ${rhyme.title}!`);
      setTimeout(() => {
        setPlaying(prev => prev === rhyme.id ? null : prev);
      }, 3000);
    }
  };

  const filteredRhymes = RHYMES.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full overflow-hidden mb-12 pb-20 pt-10 font-sans">

      <div className="relative z-10 space-y-20">
        
        {/* RHYME PATH */}
        <section className="relative w-full">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-6 px-4">
            <div className="w-full border-b-8 border-white/10 pb-8 mb-8">
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-amber-400 text-indigo-950 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-xl mb-4">
                  🎵 RHYME ADVENTURE
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-indigo-950 tracking-tighter leading-tight">Rhyme Adventure</h2>
                <p className="text-indigo-900/60 font-bold text-sm mt-2">Tap any rhyme to listen! 🎶</p>
              </div>
            </div>
            {/* SEARCH BAR */}
            <div className="relative w-full max-w-md group">
               <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search size={18} className="text-indigo-400 group-focus-within:text-indigo-600 transition-colors" />
               </div>
               <input 
                 type="text"
                 placeholder="Search your favorite rhyme..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full bg-white/80 border-4 border-white rounded-3xl py-4 pl-12 pr-6 text-sm font-bold text-indigo-900 placeholder:text-indigo-300 focus:outline-none focus:border-indigo-400 shadow-lg transition-all backdrop-blur-sm"
                 suppressHydrationWarning
               />
            </div>
          </div>

          <div className="relative w-full py-4 min-h-[300px]">
             {/* ROADMAP PATH */}
             <div className="absolute inset-x-0 h-40 top-1/2 -translate-y-1/2 w-full opacity-20 pointer-events-none">
                <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 1440 200" preserveAspectRatio="none">
                  <path d="M 0 100 Q 360 0, 720 100 T 1440 100" stroke="#818CF8" strokeWidth="6" strokeDasharray="15 15" fill="none" />
                </svg>
             </div>

            <div className="relative z-10 flex flex-wrap items-center justify-center gap-10 px-4">
              <AnimatePresence mode='popLayout'>
                {filteredRhymes.map((r, idx) => {
                  const isOn = playing === r.id;
                  const colorClass = RHYME_COLORS[idx % RHYME_COLORS.length];
                  return (
                    <motion.div 
                      key={r.id} 
                      layout
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex flex-col items-center"
                    >
                      <div className={`relative w-28 h-28 sm:w-36 sm:h-36 rounded-[2rem] bg-gradient-to-br ${colorClass} shadow-2xl border-4 border-white flex items-center justify-center transition-transform active:scale-95`}>
                         <span className="text-4xl sm:text-6xl drop-shadow-md">{r.image}</span>
                         <button 
                           onClick={() => handleRhymePlay(r)} 
                           className={`absolute -bottom-2 -right-2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white ${isOn ? 'bg-rose-500' : 'bg-indigo-600'}`}
                           suppressHydrationWarning
                         >
                            {isOn ? <Pause size={20} /> : <Play size={24} fill="currentColor" />}
                         </button>
                      </div>
                      <div className="mt-4 px-4 py-1.5 bg-white/90 rounded-full shadow-lg border-2 border-white">
                         <span className="text-[10px] font-black text-indigo-950 uppercase">{r.title}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              
              {filteredRhymes.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center text-slate-400 py-10"
                >
                  <span className="text-6xl mb-4">🔍</span>
                  <p className="font-bold uppercase text-xs tracking-widest">No rhymes found! Try another magic word.</p>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* CINEMA PORTAL */}
        <section className="relative px-6 pb-12">
          <div className="flex flex-col items-center text-center mb-12 px-4">
            <div className="w-full border-b-8 border-white/10 pb-8 mb-8">
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-amber-400 text-indigo-950 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-xl mb-4">
                  🎬 CINEMA PORTAL
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-indigo-950 tracking-tighter leading-tight">Cinema Portal</h2>
                <p className="text-indigo-900/60 font-bold text-sm mt-2">Watch & Learn! 🍿</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {VIDEOS.map((v, i) => (
              <div key={i} className="group relative bg-white/90 rounded-[2.5rem] border-4 border-white p-3 shadow-2xl active:scale-95 transition-transform overflow-hidden backdrop-blur-sm">
                <div className="aspect-video rounded-2xl overflow-hidden relative mb-4">
                   <img src={v.thumb} className="w-full h-full object-cover" alt={v.title} />
                   <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60">
                      <button onClick={() => setVideo(v)} className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl" suppressHydrationWarning>
                         <Play size={32} className="text-indigo-600" fill="currentColor" />
                      </button>
                   </div>
                </div>
                <div className="px-2 pb-2">
                   <h4 className="text-sm font-black text-indigo-950 uppercase mb-1">{v.title}</h4>
                   <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">{v.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <AnimatePresence>
        {video && (
          <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4" onClick={() => setVideo(null)}>
            <div className="w-full max-w-4xl relative" onClick={e => e.stopPropagation()}>
               <div className="aspect-video bg-black rounded-3xl overflow-hidden border-4 border-white/10">
                  <iframe src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`} className="w-full h-full" allowFullScreen />
               </div>
               <button onClick={() => setVideo(null)} className="absolute -top-12 right-0 text-white font-black">CLOSE ✕</button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
