'use client';

import React, { useState, useMemo } from 'react';
import { Play, Pause, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioEngine } from '@/core/utils/audio';
import { useData } from '@/context/DataContext';

/* ─────────── TYPES ─────────── */
interface RhymeEntry {
  id: number;
  title: string;
  image: string;
  color: string;
  grades: string[];
  subjects: string[]; // keywords matched against subject name
  youtubeId: string;
}

/* ─────────── RHYME CATALOGUE ─────────── */
const RHYME_CATALOGUE: RhymeEntry[] = [
  // ── LKG ──────────────────────────────────────────────
  // English
  { id: 1,  title: 'ABC Song',                    image: '🔤', color: 'from-blue-400 to-indigo-500',     grades: ['lkg'], subjects: ['english'], youtubeId: 'kpy6QEAuLJw' },
  { id: 2,  title: 'Twinkle Twinkle Little Star', image: '⭐', color: 'from-violet-400 to-purple-500',   grades: ['lkg'], subjects: ['english'], youtubeId: 'hqzvHfy-Ij0' },
  { id: 3,  title: 'Baa Baa Black Sheep',         image: '🐑', color: 'from-slate-400 to-gray-500',      grades: ['lkg'], subjects: ['english'], youtubeId: '1dttq5p0xUM' },
  // Tamil
  { id: 4,  title: 'நிலா நிலா ஓடி வா',            image: '🌙', color: 'from-amber-400 to-orange-500',    grades: ['lkg'], subjects: ['tamil','தமிழ்'], youtubeId: 'W1n592oiwrE' },
  { id: 5,  title: 'யானை யானை',                   image: '🐘', color: 'from-sky-400 to-blue-500',        grades: ['lkg'], subjects: ['tamil','தமிழ்'], youtubeId: 'JGOZ98fufIc' },
  { id: 6,  title: 'காக்கா காக்கா',               image: '🐦', color: 'from-slate-600 to-slate-800',    grades: ['lkg'], subjects: ['tamil','தமிழ்'], youtubeId: 'NvRI5SQtaOA' },
  // Hindi
  { id: 7,  title: 'मछली जल की रानी',             image: '🐟', color: 'from-cyan-500 to-teal-600',       grades: ['lkg'], subjects: ['hindi','हिंदी','இந்தி'], youtubeId: 'CUciBrtqFGM' },
  { id: 8,  title: 'नानी तेरी मोरनी',              image: '🦚', color: 'from-emerald-400 to-teal-500',    grades: ['lkg'], subjects: ['hindi','हिंदी','இந்தி'], youtubeId: 'k8sN7Vl3IFQ' },
  { id: 9,  title: 'लकड़ी की काठी',                image: '🐎', color: 'from-yellow-600 to-amber-700',    grades: ['lkg'], subjects: ['hindi','हिंदी','இந்தி'], youtubeId: 'P2r7LoytBfo' },

  // ── UKG ──────────────────────────────────────────────
  // English
  { id: 10, title: 'Rain Rain Go Away',           image: '🌧️', color: 'from-sky-400 to-blue-500',       grades: ['ukg'], subjects: ['english'], youtubeId: 'Zu6o23Pu0Do' },
  { id: 11, title: 'Jack and Jill',               image: '⛰️', color: 'from-lime-400 to-green-500',     grades: ['ukg'], subjects: ['english'], youtubeId: 'RbNQ0SQT0Z4' },
  { id: 12, title: 'Row, Row, Row Your Boat',     image: '🛶', color: 'from-cyan-400 to-sky-500',        grades: ['ukg'], subjects: ['english'], youtubeId: 'fDR_pRHYMGA' },
  // Tamil
  { id: 13, title: 'பள்ளிக்குப் போவோம்',          image: '🎒', color: 'from-pink-400 to-rose-500',       grades: ['ukg'], subjects: ['tamil','தமிழ்'], youtubeId: 'NgTUYxHzi5E' },
  { id: 14, title: 'மரம் வளர்ப்போம்',             image: '🌳', color: 'from-emerald-400 to-green-600',   grades: ['ukg'], subjects: ['tamil','தமிழ்'], youtubeId: 'mqLOxqew_Zg' },
  { id: 15, title: 'வண்ணத்துப்பூச்சி',             image: '🦋', color: 'from-fuchsia-400 to-pink-500',    grades: ['ukg'], subjects: ['tamil','தமிழ்'], youtubeId: '8hhML4oO-Zg' },
  // Hindi
  { id: 16, title: 'आलू कचालू',                   image: '🥔', color: 'from-amber-500 to-yellow-600',    grades: ['ukg'], subjects: ['hindi','हिंदी','இந்தி'], youtubeId: 'MKlM07RkGU0' },
  { id: 17, title: 'रेल चली',                     image: '🚂', color: 'from-purple-400 to-indigo-500',   grades: ['ukg'], subjects: ['hindi','हिंदी','இந்தி'], youtubeId: 'HiZ7x55IHps' },
  { id: 18, title: 'चिड़िया रानी',                 image: '🐦', color: 'from-sky-400 to-teal-500',        grades: ['ukg'], subjects: ['hindi','हिंदी','இந்தி'], youtubeId: '9-ZXyJAAsWE' },

  // ── GRADE 1 ──────────────────────────────────────────
  // English
  { id: 19, title: 'The Rainbow',                 image: '🌈', color: 'from-rose-450 to-pink-550',      grades: ['grade 1','class 1'], subjects: ['english'], youtubeId: 'wceMsYSyNUQ' },
  { id: 20, title: 'The Swing',                   image: '🎢', color: 'from-teal-400 to-cyan-500',      grades: ['grade 1','class 1'], subjects: ['english'], youtubeId: 'dv3tOAh-dH8' },
  { id: 21, title: 'My Shadow',                   image: '👤', color: 'from-slate-500 to-zinc-700',     grades: ['grade 1','class 1'], subjects: ['english'], youtubeId: 'FKSP8Efd94Y' },
  // Tamil
  { id: 22, title: 'என் பள்ளி',                   image: '🏫', color: 'from-indigo-400 to-purple-500',   grades: ['grade 1','class 1'], subjects: ['tamil','தமிழ்'], youtubeId: 'dzJr8xBwQYk' },
  { id: 23, title: 'என் நாடு',                    image: '🇮🇳', color: 'from-orange-500 to-amber-600',    grades: ['grade 1','class 1'], subjects: ['tamil','தமிழ்'], youtubeId: 'tFX7SPmxq3I' },
  { id: 24, title: 'இயற்கையை காப்போம்',            image: '🌲', color: 'from-green-500 to-emerald-600',   grades: ['grade 1','class 1'], subjects: ['tamil','தமிழ்'], youtubeId: '_Vi38gAvoQk' },
  // Hindi
  { id: 25, title: 'मेरा भारत महान',               image: '🇮🇳', color: 'from-orange-400 to-amber-600',    grades: ['grade 1','class 1'], subjects: ['hindi','हिंदी','இந்தி'], youtubeId: 'H7zLP0It0Wg' },
  { id: 26, title: 'पेड़ लगाओ',                    image: '🌳', color: 'from-green-450 to-lime-550',     grades: ['grade 1','class 1'], subjects: ['hindi','हिंदी','இந்தி'], youtubeId: 'O-DcfnNZU4Y' },
  { id: 27, title: 'मेरी किताब',                  image: '📖', color: 'from-cyan-400 to-blue-500',       grades: ['grade 1','class 1'], subjects: ['hindi','हिंदी','இந்தி'], youtubeId: 'g_meQdy3JYM' },
];



/* ─────────── SUBJECT META ─────────── */
const SUBJECT_META: Record<string, { label: string; emoji: string; tab: string; keywords: string[] }> = {
  english:     { label: 'English',     emoji: '📖', tab: 'english',     keywords: ['english'] },
  tamil:       { label: 'Tamil',       emoji: '🌸', tab: 'tamil',       keywords: ['tamil','தமிழ்','முன்'] },
  math:        { label: 'Maths',       emoji: '🔢', tab: 'math',        keywords: ['math','maths','arithmetic','கணிதம்'] },
  evs:         { label: 'EVS',         emoji: '🌿', tab: 'evs',         keywords: ['evs','environment','science','சூழல்'] },
  gk:          { label: 'GK',          emoji: '🌍', tab: 'gk',          keywords: ['general','gk','knowledge','பொது'] },
  hindi:       { label: 'Hindi',       emoji: '🕉️',  tab: 'hindi',       keywords: ['hindi','हिंदी','இந்தி'] },
};

const RHYME_COLORS = [
  'from-rose-400 to-pink-500',
  'from-sky-400 to-blue-500',
  'from-orange-400 to-amber-500',
  'from-emerald-400 to-teal-500',
  'from-purple-400 to-indigo-500',
  'from-lime-400 to-green-500',
];

/* ─────────── HELPERS ─────────── */
function normaliseGrade(gradeName: string): string {
  const g = (gradeName || '').toLowerCase().trim();
  if (g.includes('lkg') || g.includes('l.k.g')) return 'lkg';
  if (g.includes('ukg') || g.includes('u.k.g')) return 'ukg';
  if (g.includes('grade 1') || g.includes('class 1') || g.includes('1st')) return 'grade 1';
  return g;
}

function matchesTab(subjectKeywords: string[], tabKeywords: string[]): boolean {
  return subjectKeywords.some(sk =>
    tabKeywords.some(tk => sk.toLowerCase().includes(tk.toLowerCase()) || tk.toLowerCase().includes(sk.toLowerCase()))
  );
}

function detectTab(subjectName: string): string {
  const lower = (subjectName || '').toLowerCase();
  for (const [key, meta] of Object.entries(SUBJECT_META)) {
    if (meta.keywords.some(k => lower.includes(k.toLowerCase()))) return key;
  }
  return 'english';
}

/* ─────────── MAIN COMPONENT ─────────── */
export default function MediaWorld() {
  const { studentProfile, subjects } = useData();
  const [playing, setPlaying] = useState<number | null>(null);
  const [video, setVideo] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const grade = normaliseGrade(studentProfile?.grade_name || '');

  // Build tabs from student's actual enrolled subjects
  const tabs = useMemo(() => {
    const enrolled = subjects.filter(s => s.chapters?.length > 0).map(s => s.name);
    const seen = new Set<string>();
    const result: { key: string; label: string; emoji: string }[] = [];
    for (const name of enrolled) {
      const key = detectTab(name);
      if (!seen.has(key) && SUBJECT_META[key]) {
        seen.add(key);
        result.push({ key, ...SUBJECT_META[key] });
      }
    }
    return result;
  }, [subjects]);

  // Auto-select first tab if none selected
  const currentTab = activeTab ?? tabs[0]?.key ?? 'english';

  const tabMeta = SUBJECT_META[currentTab] ?? SUBJECT_META['english'];

  // Filter rhymes: grade + current tab's subject keywords
  const gradeRhymes = useMemo(() => {
    return RHYME_CATALOGUE.filter(r =>
      r.grades.includes(grade) && matchesTab(r.subjects, tabMeta.keywords)
    );
  }, [grade, tabMeta]);

  const filteredRhymes = useMemo(() =>
    gradeRhymes.filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase())),
    [gradeRhymes, searchTerm]
  );

  const handleRhymePlay = (rhyme: RhymeEntry) => {
    // Open the Youtube video player directly in popup
    setVideo({
      id: rhyme.id,
      title: rhyme.title,
      emoji: rhyme.image,
      tag: 'Rhyme Sing-along 🎤',
      youtubeId: rhyme.youtubeId
    });
  };

  const gradeLabel = grade === 'lkg' ? 'LKG' : grade === 'ukg' ? 'UKG' : 'Grade 1';

  return (
    <div className="relative w-full overflow-hidden mb-12 pb-20 pt-10 font-sans">
      <div className="relative z-10 space-y-20">

        {/* ── SUBJECT TABS ─────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-amber-400 text-indigo-950 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-xl mb-4">
              🎵 MEDIA WORLD
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-indigo-950 tracking-tighter leading-tight">
              Rhymes
            </h2>
            <p className="text-indigo-900/60 font-bold text-sm mt-2">
              Pick a subject to explore {gradeLabel} rhymes! 🌟
            </p>
          </div>

          {/* Scrollable Tab Pills */}
          <div className="flex gap-3 overflow-x-auto pb-2 justify-center flex-wrap">
            {tabs.map(tab => {
              const isActive = currentTab === tab.key;
              return (
                <motion.button
                  key={tab.key}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => { setActiveTab(tab.key); setSearchTerm(''); setPlaying(null); }}
                  className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-sm border-2 transition-all shadow-lg ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-700 shadow-indigo-300/50'
                      : 'bg-white/80 text-indigo-900 border-white hover:bg-white hover:shadow-xl'
                  }`}
                >
                  <span className="text-lg">{tab.emoji}</span>
                  <span className="uppercase tracking-wide text-xs">{tab.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-amber-300 ml-1 animate-pulse" />}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── RHYME ADVENTURE ──────────────────────────────────── */}
        <section className="relative w-full">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-6 px-4">
            <div className="w-full border-b-8 border-white/10 pb-8 mb-8">
              <h3 className="text-2xl sm:text-4xl font-black text-indigo-950 tracking-tighter">
                {tabMeta.emoji} {tabMeta.label} Rhymes
              </h3>
              <p className="text-indigo-900/50 font-bold text-sm mt-1">Tap any rhyme to hear it! 🎶</p>
            </div>
            {/* Search */}
            <div className="relative w-full max-w-md group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-indigo-400">🔍</div>
              <input
                type="text"
                placeholder={`Search ${tabMeta.label} rhymes...`}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-white/80 border-4 border-white rounded-3xl py-3.5 pl-12 pr-6 text-sm font-bold text-indigo-900 placeholder:text-indigo-300 focus:outline-none focus:border-indigo-400 shadow-lg backdrop-blur-sm"
                suppressHydrationWarning
              />
            </div>
          </div>

          <div className="relative w-full py-4 min-h-[240px]">
            {/* Wavy path decoration */}
            <div className="absolute inset-x-0 h-40 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
              <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 1440 200" preserveAspectRatio="none">
                <path d="M 0 100 Q 360 0, 720 100 T 1440 100" stroke="#818CF8" strokeWidth="6" strokeDasharray="15 15" fill="none" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-wrap items-center justify-center gap-10 px-4">
              <AnimatePresence mode="popLayout">
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
                      transition={{ duration: 0.25 }}
                      className="flex flex-col items-center"
                    >
                      <div className={`relative w-28 h-28 sm:w-36 sm:h-36 rounded-[2rem] bg-gradient-to-br ${colorClass} shadow-2xl border-4 border-white flex items-center justify-center active:scale-95 transition-transform`}>
                        <span className="text-4xl sm:text-6xl drop-shadow-md select-none">{r.image}</span>
                        <button
                          onClick={() => handleRhymePlay(r)}
                          className={`absolute -bottom-2 -right-2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white transition-colors ${isOn ? 'bg-rose-500' : 'bg-indigo-600'}`}
                          suppressHydrationWarning
                        >
                          {isOn ? <Pause size={20} /> : <Play size={24} fill="currentColor" />}
                        </button>
                        {isOn && (
                          <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center animate-bounce">
                            <span className="text-xs">🎵</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 px-4 py-1.5 bg-white/90 rounded-full shadow-lg border-2 border-white max-w-[150px]">
                        <span className="text-[10px] font-black text-indigo-950 uppercase block text-center leading-tight">{r.title}</span>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Coming-soon slot */}
                <motion.div key="add-more" layout initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center opacity-40">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-[2rem] bg-white/30 border-4 border-dashed border-white/60 flex items-center justify-center">
                    <span className="text-4xl sm:text-5xl">🎶</span>
                  </div>
                  <div className="mt-4 px-4 py-1.5 bg-white/50 rounded-full border-2 border-dashed border-white/60">
                    <span className="text-[10px] font-black text-indigo-950/60 uppercase">More Soon!</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {filteredRhymes.length === 0 && searchTerm && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-slate-400 py-10">
                  <span className="text-6xl mb-4">🔍</span>
                  <p className="font-bold uppercase text-xs tracking-widest">No rhymes found — try another word!</p>
                </motion.div>
              )}

              {filteredRhymes.length === 0 && !searchTerm && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-indigo-300 py-10 gap-3">
                  <span className="text-5xl">{tabMeta.emoji}</span>
                  <p className="font-black uppercase text-xs tracking-widest text-indigo-900/40">{tabMeta.label} rhymes coming soon!</p>
                </motion.div>
              )}
            </div>
          </div>
        </section>



      </div>

      {/* ── VIDEO LIGHTBOX ───────────────────────────────────── */}
      <AnimatePresence>
        {video && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setVideo(null)}
          >
            <div className="w-full max-w-4xl relative" onClick={e => e.stopPropagation()}>
              <div className="aspect-video bg-black rounded-3xl overflow-hidden border-4 border-white/10">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                  className="w-full h-full"
                  allowFullScreen
                  allow="autoplay"
                />
              </div>
              <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                <div>
                  <h3 className="text-white font-black text-lg">{video.emoji} {video.title}</h3>
                  <span className="text-white/40 text-xs font-bold uppercase tracking-widest">{video.tag}</span>
                </div>
                <button
                  onClick={() => setVideo(null)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-white font-black text-sm transition-all"
                >
                  <X size={16} /> CLOSE
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
