'use client';

import { getSubjectVisuals, getChapterVisuals, getLessonVisuals, buildTutorial, type TutorialStep } from '@/core/data/curriculum';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, CheckCircle,
  Star, Zap,
  Map as MapIcon,
  Lock, Volume2, Play, RotateCcw
} from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { audioEngine } from '@/core/utils/audio';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useData } from '@/context/DataContext';
import { studentApi, studentKeys, type Chapter, type Lesson } from '@/core/services/studentApi';
import ActivityPlayer from '../_components/activities/ActivityPlayer';
import NameTraceActivity from '../_components/activities/NameTraceActivity';
import TraceActivity from '../_components/activities/TraceActivity';
import PreWritingVideo from '../_components/activities/PreWritingVideo';
import LetterCheckpoint from '../_components/activities/LetterCheckpoint';


import TutorialPlayer from '../_components/activities/TutorialPlayer';

/* ─── STROKE LABELS ─── */
const STROKE_LABELS_EN: Record<string, string> = {
  standing: 'Standing Line',
  sleeping: 'Sleeping Line',
  'left-slanting': 'Left Slanting Line',
  'right-slanting': 'Right Slanting Line',
  'left-curve': 'Left Curve',
  'right-curve': 'Right Curve',
  'up-curve': 'Up Curve',
  'down-curve': 'Down Curve',
};

const STROKE_LABELS_TA: Record<string, string> = {
  standing: 'நேர்கோடு',
  sleeping: 'படுக்கைகோடு',
  'left-slanting': 'இடது சாய்வுகோடு',
  'right-slanting': 'வலது சாய்வுகோடு',
  'left-curve': 'இடது வளைவு',
  'right-curve': 'வலது வளைவு',
  'up-curve': 'மேல் வளைவு',
  'down-curve': 'கீழ் வளைவு',
};

const QUIZ_STROKES = ['standing', 'sleeping', 'left-slanting', 'right-slanting', 'left-curve', 'right-curve', 'up-curve', 'down-curve'];
const EXAM_COUNT = 5;

export default function UltimateLearnEngine() {
  const { subjects, studentProfile, updateProgress, refetchLessons } = useData();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const queryClient = useQueryClient();

  const subjectParam = searchParams.get('subject');
  const chapterParam = searchParams.get('chapter');

  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<'hub' | 'chapter'>(subjectParam && chapterParam ? 'chapter' : 'hub');
  const [activeSubjectId, setActiveSubjectId] = useState<string | null>(subjectParam);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(chapterParam);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showNameTrace, setShowNameTrace] = useState(false);
  const [traceRounds, setTraceRounds] = useState<{ type: 'guide' | 'trace'; path: string }[] | null>(null);
  const [roundIndex, setRoundIndex] = useState(0);
  const [roundPassed, setRoundPassed] = useState<number[]>([]);
  const [traceDone, setTraceDone] = useState(false);
  const [showCheckpoint, setShowCheckpoint] = useState(false);
  const [checkpointLessonId, setCheckpointLessonId] = useState<string | null>(null);
  const [checkpointTitle, setCheckpointTitle] = useState('');

  useEffect(() => {
    const timer = requestAnimationFrame(() => setMounted(true));
    audioEngine?.warmUp();
    return () => cancelAnimationFrame(timer);
  }, []);

  const activeSubject = useMemo(() =>
    subjects.find(s => s.id === activeSubjectId), [activeSubjectId, subjects]);
  const activeChapter = useMemo(() =>
    activeSubject?.chapters.find(c => c.id === activeChapterId), [activeSubject, activeChapterId]);

  const isTamil = params?.locale === 'ta' || 
                  (activeSubject?.name ? (
                    activeSubject.name.toLowerCase().includes('tamil') || 
                    activeSubject.name.includes('தமிழ்') || 
                    activeSubject.name.includes('முன்')
                  ) : false);

  const openSubject = (subject: typeof subjects[0]) => {
    const visuals = getSubjectVisuals(subject.name);
    audioEngine?.speak(visuals.sound);
    setActiveSubjectId(subject.id);
    setView('chapter');
  };

  const openChapter = (chapter: Chapter) => {
    if (!chapter.is_unlocked) {
      audioEngine?.speak("Complete the previous chapter first!");
      return;
    }
    setActiveChapterId(chapter.id);

    // ── Prefetch all lesson activities for this chapter (staggered) ──
    if (chapter.lessons?.length) {
      chapter.lessons.forEach((lesson, i) => {
        setTimeout(() => {
          queryClient.prefetchQuery({
            queryKey: studentKeys.activities(lesson.id),
            queryFn: () => studentApi.getLessonActivities(lesson.id),
            staleTime: 5 * 60 * 1000,
          });
        }, i * 200); // 200ms stagger — first one fires immediately
      });
    }
  };

  const closeChapter = () => {
    setActiveChapterId(null);
    setView('hub');
    router.push(`/${window.location.pathname.split('/')[1]}/student/Learn`, { scroll: true });
  };

  const goBackToChapters = () => {
    setActiveChapterId(null);
    setActiveLesson(null);
  };

  const speakText = (text: string) => audioEngine?.speak(text);

  const handleLessonClick = (lesson: Lesson) => {
    if (!lesson.is_unlocked) return;
    speakText(lesson.title);
    setActiveLesson(lesson);

    const lower = lesson.title.toLowerCase();

    // "My Name Writing" → direct name tracing
    if (lower.includes('name')) {
      setShowNameTrace(true);
      return;
    }

    // Letter Checkpoint games
    if (lower.includes('find the letter') || lower.includes('pop the balloon') || lower.includes('pick the card') || lower.includes('checkpoint')) {
      setCheckpointLessonId(lesson.id);
      setCheckpointTitle(lesson.title);
      setShowCheckpoint(true);
      setActiveLesson(null);
      return;
    }

    // Pre-writing foundation strokes → trace → quiz (all trace, no buttons)
    // Only trigger for the actual Pre-Writing chapter (supports Tamil name "முன் எழுத்து பயிற்சிகள்")
    const isPreWritingChapter = 
      activeChapter?.name?.toLowerCase().includes('pre-writing') || 
      activeChapter?.name?.toLowerCase().includes('pattern') ||
      activeChapter?.name?.toLowerCase().includes('முன் எழுத்து') ||
      activeChapter?.name?.toLowerCase().includes('பயிற்சி');

    if (isPreWritingChapter && (
        lower.includes('standing') || lower.includes('sleeping') || lower.includes('slanting') ||
        lower.includes('curved') || lower.includes('curve') || lower.includes('zig') || lower.includes('zag') ||
        lower.includes('s-curve') || lower.includes('circle') ||
        lower.includes('exam') || lower.includes('review') || lower.includes('assessment') || lower.includes('mix') ||
        lower.includes('left-slanting') || lower.includes('right-slanting') ||
        lower.includes('left-curve') || lower.includes('right-curve') ||
        lower.includes('up-curve') || lower.includes('down-curve') ||
        lower.includes('up curve') || lower.includes('down curve') ||
        // Tamil shapes support
        lower.includes('நேர்') || lower.includes('படுத்த') || lower.includes('படுக்கை') ||
        lower.includes('சாய்வு') || lower.includes('வளைவு') || lower.includes('வட்டம்') ||
        lower.includes('தேர்வு')
      )) {
      // Mixed exam — all CBSE strokes as trace rounds
      if (lower.includes('exam') || lower.includes('review') || lower.includes('assessment') || lower.includes('mix') || lower.includes('தேர்வு')) {
        const shuffled = [...QUIZ_STROKES].sort(() => Math.random() - 0.5).slice(0, EXAM_COUNT);
        setTraceRounds(shuffled.map(p => ({ type: 'trace' as const, path: p })));
        setRoundIndex(0);
        setRoundPassed([]);
        setTraceDone(false);
        return;
      }
      // Individual stroke path map (CBSE names with backward compat + Tamil names)
      const pathMap: Record<string, string> = {
        standing: 'standing', sleeping: 'sleeping',
        'left slanting': 'left-slanting', 'right slanting': 'right-slanting',
        'left curve': 'left-curve', 'right curve': 'right-curve',
        'up curve': 'up-curve', 'down curve': 'down-curve',
        'left-curve': 'left-curve', 'right-curve': 'right-curve',
        'up-curve': 'up-curve', 'down-curve': 'down-curve',
        'left-slanting': 'left-slanting', 'right-slanting': 'right-slanting',
        slanting: 'left-slanting', curved: 'up-curve',
        zig: 'zigzag', zag: 'zigzag',
        's-curve': 's-curve', circle: 'circle',
        // Tamil translations
        'நேர்கோடு': 'standing',
        'நேர் கோடு': 'standing',
        'படுக்கைகோடு': 'sleeping',
        'படுக்கை கோடு': 'sleeping',
        'படுத்த கோடு': 'sleeping',
        'இடது சாய்வு': 'left-slanting',
        'வலது சாய்வு': 'right-slanting',
        'இடது வளைவு': 'left-curve',
        'வலது வளைவு': 'right-curve',
        'மேல் வளைவு': 'up-curve',
        'கீழ் வளைவு': 'down-curve',
        'வட்டம்': 'circle',
      };
      let path = '';
      for (const [key, p] of Object.entries(pathMap)) {
        if (lower.includes(key)) { path = p; break; }
      }
      if (path) {
        setTraceRounds([{ type: 'guide', path }, { type: 'trace', path }]);
        setRoundIndex(0);
        setRoundPassed([]);
        setTraceDone(false);
        setActiveLesson(null);
      }
      return;
    }

    queryClient.prefetchQuery({
      queryKey: studentKeys.activities(lesson.id),
      queryFn: () => studentApi.getLessonActivities(lesson.id),
      staleTime: 5 * 60 * 1000,
    });

    // ── Prefetch next lesson's activities for instant transition ──
    const ch = subjects
      .flatMap(s => s.chapters)
      .find(c => c.id === activeChapterId);
    if (ch?.lessons) {
      const currentIdx = ch.lessons.findIndex(l => l.id === lesson.id);
      if (currentIdx >= 0 && currentIdx < ch.lessons.length - 1) {
        const nextLesson = ch.lessons[currentIdx + 1];
        queryClient.prefetchQuery({
          queryKey: studentKeys.activities(nextLesson.id),
          queryFn: () => studentApi.getLessonActivities(nextLesson.id),
          staleTime: 5 * 60 * 1000,
        });
      }
    }
  };

  const handleActivityComplete = () => {
    refetchLessons();
    setActiveLesson(null);
  };

  const handleNameTraceComplete = () => {
    setShowNameTrace(false);
    setActiveLesson(null);
    refetchLessons();
  };

  const studentName = studentProfile?.name || 'Explorer';
  const level = studentProfile?.current_streak_days || 0;

  if (!mounted) return null;

  return (
    <div className="relative font-sans overflow-hidden bg-sky-400">
      <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-300 via-sky-400 to-blue-500" />
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-blue-300/30 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 w-full pt-0">
        <div className="w-full">
          <div className="relative px-0">
             <div className="relative w-full flex items-center overflow-hidden pt-10 pb-10 sm:pt-14 sm:pb-12 border-b-8 border-white/10">
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
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
                         <Star size={16} fill="currentColor" /> Level {level} Legend
                      </motion.div>

                      <h1 className="text-5xl sm:text-8xl font-black text-indigo-950 leading-[0.9] tracking-tighter drop-shadow-sm">
                         READY FOR A <br/>
                         <span className="text-indigo-800">MISSION, {studentName.toUpperCase()}?</span>
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

          <AnimatePresence mode="wait">
            {view === 'hub' ? (
              <motion.div
                key="hub"
                initial={{ opacity: 1, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="px-4 sm:px-12 mb-20">
                   <div className="flex items-center gap-4 mb-10">
                      <div className="w-10 h-10 bg-white/40 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/60 shadow-lg">
                         <MapIcon className="text-indigo-950" size={20} />
                      </div>
                      <div>
                         <h2 className="text-2xl font-black text-indigo-950 leading-none">Discovery Worlds</h2>
                         <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest mt-1">Tap a picture to play</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                     {subjects.length === 0 ? (
                       <div className="col-span-full text-center py-20">
                         <p className="text-white/60 font-black text-lg">No worlds loaded yet. Start your journey!</p>
                       </div>
                     ) : (
                       subjects.map((subject, idx) => {
                         const v = getSubjectVisuals(subject.name);
                         const total = subject.chapters.length;

                         return (
                           <motion.button
                             key={subject.id}
                             onClick={() => openSubject(subject)}
                             whileHover={{ y: -8, scale: 1.02 }}
                             whileTap={{ scale: 0.95 }}
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: idx * 0.05 }}
                             className={`group relative rounded-[2.5rem] p-1.5 border-2 transition-all duration-500 backdrop-blur-3xl shadow-xl ${v.shadow} hover:shadow-2xl ${v.bg} ${v.border}`}
                           >
                             <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${v.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                             <div className="relative min-h-[220px] sm:min-h-[260px] flex flex-col items-center justify-center p-6 rounded-[2.2rem] overflow-hidden bg-white/40">
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/50 blur-3xl rounded-full" />

                                {/* Floating mascot */}
                                <motion.div
                                  animate={{ y: [0, -8, 0] }}
                                  transition={{ duration: 2.5 + (idx % 3) * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                                  className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center mb-4"
                                >
                                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${v.color} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity`} />
                                  <span className="relative text-7xl sm:text-8xl drop-shadow-[0_20px_20px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-transform duration-500">
                                    {v.mascot}
                                  </span>
                                </motion.div>

                                {/* Small icon badge */}
                                <div className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-md border border-white/60 text-lg">
                                  {v.emoji}
                                </div>

                                {/* Minimal text */}
                                <div className="text-center z-10">
                                   <h3 className="text-xl sm:text-2xl font-black text-indigo-950 uppercase tracking-tighter leading-none mb-1">{v.label}</h3>
                                   <p className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest">
                                     {total} {total === 1 ? 'level' : 'levels'}
                                   </p>
                                </div>

                                {/* Tiny progress dots */}
                                {total > 0 && (
                                  <div className="absolute bottom-5 left-6 right-6 flex items-center justify-center gap-1.5">
                                    {subject.chapters.slice(0, Math.min(total, 8)).map((ch) => (
                                      <div
                                        key={ch.id}
                                        className={`h-2 rounded-full transition-all ${
                                          ch.completion_percentage >= 100
                                            ? `w-4 bg-gradient-to-r ${v.color}`
                                            : 'w-2 bg-indigo-950/10'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                )}
                             </div>
                           </motion.button>
                         );
                       })
                     )}
                   </div>
                </div>
              </motion.div>
            ) : activeSubject && (
              <motion.div
                key="chapters"
                initial={{ opacity: 1, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="px-4 sm:px-12 pb-20"
              >
                {!activeChapterId ? (
                  <>
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
                      <button
                        onClick={closeChapter}
                        className="inline-flex items-center gap-2 text-indigo-950 font-black px-6 py-3 bg-white/40 border border-white/60 rounded-2xl shadow-xl hover:bg-white/60 transition-all"
                      >
                        <ArrowLeft size={18} /> Back
                      </button>
                      <div className="text-center sm:text-right">
                        <h2 className="text-3xl font-black text-indigo-950 uppercase tracking-tighter leading-none">{activeSubject.name}</h2>
                        <p className="text-[10px] font-black text-indigo-950/40 uppercase tracking-widest mt-1">Pick a level</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                      {activeSubject.chapters.map((chapter, idx) => {
                      const visuals = getChapterVisuals(activeSubject.name, chapter.name);
                      return (
                        <motion.button
                          key={chapter.id}
                          onClick={() => openChapter(chapter)}
                          disabled={!chapter.is_unlocked}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={chapter.is_unlocked ? { y: -6, scale: 1.02 } : {}}
                          whileTap={chapter.is_unlocked ? { scale: 0.97 } : {}}
                          className={`relative text-left bg-white/40 backdrop-blur-2xl border-2 rounded-[2.5rem] p-5 shadow-xl transition-all overflow-hidden group ${
                            chapter.is_unlocked
                              ? 'border-white/60 hover:bg-white/60 active:scale-[0.98]'
                              : 'border-gray-300/30 opacity-60 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex flex-col items-center text-center">
                            <motion.div
                              animate={chapter.is_unlocked ? { y: [0, -8, 0] } : {}}
                              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                              className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-[2.5rem] flex items-center justify-center text-6xl shadow-xl mb-4 transition-transform group-hover:scale-110 border-4 border-white ${
                                chapter.is_unlocked
                                  ? chapter.completion_percentage >= 100
                                    ? 'bg-gradient-to-br from-emerald-400 to-green-500 text-white'
                                    : `bg-gradient-to-br ${visuals.color} text-white`
                                  : 'bg-gray-200'
                              }`}
                            >
                              {chapter.is_unlocked ? (
                                visuals.mascot
                              ) : (
                                <Lock size={32} className="text-gray-400" />
                              )}
                            </motion.div>

                            <h3 className={`text-lg sm:text-xl font-black tracking-tight mb-1 ${
                              chapter.is_unlocked ? 'text-indigo-950' : 'text-gray-500'
                            }`}>
                              {chapter.name}
                            </h3>

                            {!chapter.is_unlocked && (
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-3 py-1 bg-gray-200 rounded-full mb-2">🔒 Locked</span>
                            )}
                            {chapter.is_unlocked && chapter.completion_percentage >= 100 && (
                              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest px-3 py-1 bg-emerald-100 rounded-full mb-2">⭐ Done</span>
                            )}

                            {chapter.is_unlocked && chapter.completion_percentage > 0 && chapter.completion_percentage < 100 && (
                              <div className="w-full h-2.5 bg-indigo-950/10 rounded-full overflow-hidden mt-3">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${chapter.completion_percentage}%` }}
                                  transition={{ duration: 0.8, delay: 0.2 }}
                                  className={`h-full rounded-full bg-gradient-to-r ${visuals.color}`}
                                />
                              </div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                    </>
                ) : activeChapter && (
                  /* Lessons within a chapter */
                  <div>
                    <button
                      onClick={goBackToChapters}
                      className="inline-flex items-center gap-2 text-indigo-950 font-black px-6 py-3 bg-white/40 border border-white/60 rounded-2xl shadow-xl hover:bg-white/60 transition-all mb-10"
                    >
                      <ArrowLeft size={18} /> Back
                    </button>

                    <div className="text-center mb-12">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-[2rem] bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-5xl shadow-xl border-4 border-white mb-4"
                      >
                        {getChapterVisuals(activeSubject.name, activeChapter.name).mascot}
                      </motion.div>
                      <h2 className="text-3xl font-black text-indigo-950 uppercase tracking-tighter">{activeChapter.name}</h2>
                      <p className="text-[11px] font-bold text-indigo-950/50 mt-2">
                        {activeChapter.completed_lessons}/{activeChapter.total_lessons} lessons
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                      {activeChapter.lessons.map((lesson) => {
                        const visuals = getLessonVisuals(activeSubject.name, lesson.title);
                        return (
                          <motion.button
                            key={lesson.id}
                            onClick={() => handleLessonClick(lesson)}
                            disabled={!lesson.is_unlocked}
                            whileHover={lesson.is_unlocked ? { y: -6, scale: 1.02 } : {}}
                            whileTap={lesson.is_unlocked ? { scale: 0.97 } : {}}
                            className={`relative bg-white/40 backdrop-blur-2xl border-2 rounded-[2.5rem] p-5 text-center shadow-xl transition-all overflow-hidden group ${
                              lesson.is_unlocked
                                ? 'border-white/60 hover:bg-white/60 active:scale-95'
                                : 'border-gray-300/30 opacity-50 cursor-not-allowed'
                            }`}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative inline-block mb-4">
                              <motion.div
                                animate={lesson.is_unlocked ? { y: [0, -6, 0] } : {}}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-[2rem] flex items-center justify-center text-5xl sm:text-6xl shadow-xl border-4 border-white transform group-hover:scale-110 transition-transform duration-500 ${
                                  lesson.is_unlocked
                                    ? `bg-gradient-to-br ${visuals.color} text-white`
                                    : 'bg-gray-200 grayscale'
                                }`}
                              >
                                {lesson.is_unlocked ? visuals.mascot : '🔒'}
                              </motion.div>
                              {lesson.progress?.status === 'completed' && (
                                <div className="absolute -top-2 -right-2">
                                  <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                    <CheckCircle size={20} className="text-white" />
                                  </div>
                                </div>
                              )}
                            </div>
                            <h3 className={`text-base sm:text-lg font-black mb-1 tracking-tight ${
                              lesson.is_unlocked ? 'text-indigo-950' : 'text-gray-500'
                            }`}>
                              {lesson.title}
                            </h3>
                            {lesson.description && (
                              <p className="text-[10px] font-bold text-indigo-900/40 mb-3 leading-tight line-clamp-1">{lesson.description}</p>
                            )}
                            <div className={`w-full py-2.5 rounded-2xl text-[10px] font-black shadow-lg flex items-center justify-center gap-2 transition-all ${
                              lesson.progress?.status === 'completed'
                                ? 'bg-emerald-500 text-white'
                                : lesson.progress?.status === 'in_progress'
                                ? 'bg-amber-500 text-white'
                                : lesson.is_unlocked
                                ? `bg-gradient-to-r ${visuals.color} text-white group-hover:brightness-110`
                                : 'bg-gray-300 text-gray-500'
                            }`}>
                              {lesson.progress?.status === 'completed' ? 'DONE ✅' :
                               lesson.progress?.status === 'in_progress' ? 'PLAY ▶' :
                               lesson.is_unlocked ? 'START' : '🔒 LOCKED'}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {showCheckpoint && checkpointLessonId && (
        <LetterCheckpoint
          lessonId={checkpointLessonId}
          lessonTitle={checkpointTitle}
          onClose={() => { setShowCheckpoint(false); setCheckpointLessonId(null); setCheckpointTitle(''); }}
          onComplete={() => { setShowCheckpoint(false); setCheckpointLessonId(null); setCheckpointTitle(''); refetchLessons(); }}
        />
      )}

      {activeLesson && !showNameTrace && (
        <ActivityPlayer
          key={activeLesson.id}
          lessonId={activeLesson.id}
          lessonTitle={activeLesson.title}
          onClose={() => setActiveLesson(null)}
          onComplete={handleActivityComplete}
        />
      )}

      {/* ─── NAME TRACING ACTIVITY ─── */}
      {showNameTrace && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-gradient-to-br from-sky-300 via-sky-400 to-blue-500">
          <div className="relative w-full max-w-lg mx-3 my-4 overflow-hidden rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.2)] bg-white/95">
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #013237 1px, transparent 0)', backgroundSize: '18px 18px' }} />
            <div className="relative z-10">
              <div className="flex items-center justify-between px-5 pt-4 pb-0">
                <span className="text-[10px] font-black text-amber-700/60 uppercase tracking-widest">✏️ Name Writing</span>
                <button
                  onClick={() => { setShowNameTrace(false); setActiveLesson(null); }}
                  className="w-7 h-7 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center text-amber-500 text-base font-bold transition-all"
                >
                  &times;
                </button>
              </div>
              <NameTraceActivity
                config={{}}
                studentName={studentName}
                onComplete={() => handleNameTraceComplete()}
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── PRE-WRITING TRACE ROUNDS ─── */}
      {traceRounds && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto"
          style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(8px)' }}>
          <div className="relative w-full max-w-lg sm:max-w-2xl mx-2 sm:mx-4 my-2 sm:my-4 overflow-y-auto max-h-[96vh] sm:max-h-[90vh] rounded-[1.5rem] sm:rounded-[2.5rem] border-[8px] sm:border-[14px] border-[#5a3825] shadow-[0_24px_50px_rgba(0,0,0,0.5),_inset_0_4px_24px_rgba(0,0,0,0.8)]"
            style={{ 
              backgroundColor: '#0c2e22',
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 12%, transparent 13%)',
              backgroundSize: '10px 10px',
            }}>
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '18px 18px' }} />
            {!traceDone ? (() => {
               const cur = traceRounds[roundIndex];
               const isGuide = cur.type === 'guide';
               const path = cur.path;
               const guideColors: Record<string, string> = {
                 standing: '#6366F1', sleeping: '#22C55E', 'left-slanting': '#F59E0B', 'right-slanting': '#F97316',
                 'left-curve': '#8B5CF6', 'right-curve': '#EC4899', 'up-curve': '#06B6D4', 'down-curve': '#10B981',
               };
               return (
                 <>
                   <div className="flex items-center justify-between px-3 sm:px-5 pt-3 sm:pt-5 pb-0">
                     <span className="text-white/50 text-xs font-bold">
                       {roundIndex + 1} / {traceRounds.length}
                     </span>
                     <button onClick={() => { setTraceRounds(null); setActiveLesson(null); }}
                       className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white/60 hover:text-white text-base sm:text-lg font-bold transition-all">&times;</button>
                   </div>
                   {isGuide ? (
                     <PreWritingVideo key={`${roundIndex}-${path}`}
                       config={{ path, color: guideColors[path] || '#8B5CF6', isTamil, borderless: true }}
                       onComplete={() => {
                         setRoundPassed(prev => [...prev, 100]);
                         if (roundIndex < traceRounds.length - 1) setRoundIndex(i => i + 1);
                         else setTraceDone(true);
                       }}
                     />
                   ) : (
                     <TraceActivity
                       key={`${roundIndex}-${path}`}
                       config={{ path, isTamil, borderless: true }}
                       onComplete={(data) => {
                         const acc = Number(data.completion_data?.accuracy) || 0;
                         setRoundPassed(prev => [...prev, acc]);
                         if (roundIndex < traceRounds.length - 1) setRoundIndex(i => i + 1);
                         else setTraceDone(true);
                       }}
                     />
                   )}
                 </>
               );
            })() : (
              <motion.div key="score" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 px-6 py-10">
                <span className="text-6xl animate-bounce">
                  {roundPassed.every(a => a >= 70) ? '🎉' : '💪'}
                </span>
                <p className="text-xl font-black text-white font-sans">
                  {roundPassed.every(a => a >= 70) 
                    ? (isTamil ? 'அருமை! சூப்பர்!' : 'Super!') 
                    : (isTamil ? 'மீண்டும் முயற்சி செய்!' : 'Nice try!')}
                </p>
                <p className="text-white/60 font-bold text-sm font-sans">
                  {isTamil ? 'சராசரி' : 'Avg'}: {Math.round(roundPassed.reduce((s, a) => s + a, 0) / roundPassed.length)}%
                </p>
                <button onClick={() => { setTraceRounds(null); setActiveLesson(null); refetchLessons(); }}
                  className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-black rounded-full shadow-lg transition-all border-b-4 border-green-700 active:scale-95 font-sans">
                  {isTamil ? 'முடிந்தது! ✅' : 'Done ✅'}
                </button>
              </motion.div>
            )}

            {/* Wooden Chalk Tray at the bottom of the main chalkboard card */}
            <div className="w-[90%] mx-auto h-4 bg-[#4a2e1f] rounded-t-lg shadow-md flex items-center justify-start px-8 gap-4 relative z-10 border-t border-black/20 mt-2">
              <div className="w-8 h-2.5 bg-yellow-100 rounded-sm transform rotate-6 border border-yellow-200/50 shadow-sm animate-pulse" />
              <div className="w-9 h-2.5 bg-white rounded-sm transform -rotate-3 border border-white/20 shadow-sm" />
              <div className="w-7 h-2.5 bg-pink-200 rounded-sm transform rotate-12 border border-pink-300/30 shadow-sm" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
