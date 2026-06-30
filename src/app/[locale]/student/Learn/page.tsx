'use client';
import { getSubjectVisuals, getChapterVisuals, getLessonVisuals, buildTutorial, type TutorialStep } from '@/core/data/curriculum';

import React, { Suspense, useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
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
import { useAuth } from '@/context/AuthContext';
import { studentApi, studentKeys, type Chapter, type Lesson } from '@/core/services/studentApi';
import ActivityPlayer from '../_components/activities/ActivityPlayer';
import NameTraceActivity from '../_components/activities/NameTraceActivity';
import TraceActivity from '../_components/activities/TraceActivity';
import PreWritingVideo from '../_components/activities/PreWritingVideo';
import LetterCheckpoint from '../_components/activities/LetterCheckpoint';
import TamilVowelQuiz from '../_components/activities/TamilVowelQuiz';
import TamilMeiQuiz from '../_components/activities/TamilMeiQuiz';
import TamilWordShowcase from '../_components/activities/TamilWordShowcase';
import { cleanSoundTerms } from '@/core/data/curriculum/ukg/english';


import TutorialPlayer from '../_components/activities/TutorialPlayer';

/* ─── STROKE SVG ICONS ─── */
function StrokeIcon({ type, className = '' }: { type: string; className?: string }) {
  const base = 'w-full h-full';
  const stroke = { strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none', strokeWidth: 5 };
  switch (type) {
    case 'standing':
      return (
        <svg viewBox="0 0 64 64" className={`${base} ${className}`}>
          <line x1="32" y1="8" x2="32" y2="56" stroke="white" {...stroke} />
          <circle cx="32" cy="8" r="4" fill="white" />
          <polygon points="28,52 36,52 32,60" fill="white" />
        </svg>
      );
    case 'sleeping':
      return (
        <svg viewBox="0 0 64 64" className={`${base} ${className}`}>
          <line x1="8" y1="32" x2="56" y2="32" stroke="white" {...stroke} />
          <circle cx="8" cy="32" r="4" fill="white" />
          <polygon points="52,28 60,32 52,36" fill="white" />
        </svg>
      );
    case 'left-slanting':
      return (
        <svg viewBox="0 0 64 64" className={`${base} ${className}`}>
          <line x1="48" y1="10" x2="16" y2="54" stroke="white" {...stroke} />
          <circle cx="48" cy="10" r="4" fill="white" />
          <polygon points="12,50 20,58 12,54" fill="white" />
        </svg>
      );
    case 'right-slanting':
      return (
        <svg viewBox="0 0 64 64" className={`${base} ${className}`}>
          <line x1="16" y1="10" x2="48" y2="54" stroke="white" {...stroke} />
          <circle cx="16" cy="10" r="4" fill="white" />
          <polygon points="44,50 52,54 44,58" fill="white" />
        </svg>
      );
    case 'left-curve':
      return (
        <svg viewBox="0 0 64 64" className={`${base} ${className}`}>
          <path d="M 48 10 Q 12 32 48 56" stroke="white" {...stroke} />
          <circle cx="48" cy="10" r="4" fill="white" />
          <polygon points="44,52 52,60 52,52" fill="white" />
        </svg>
      );
    case 'right-curve':
      return (
        <svg viewBox="0 0 64 64" className={`${base} ${className}`}>
          <path d="M 16 10 Q 52 32 16 56" stroke="white" {...stroke} />
          <circle cx="16" cy="10" r="4" fill="white" />
          <polygon points="12,52 20,52 12,60" fill="white" />
        </svg>
      );
    case 'up-curve':
      return (
        <svg viewBox="0 0 64 64" className={`${base} ${className}`}>
          <path d="M 8 52 Q 32 8 56 52" stroke="white" {...stroke} />
          <circle cx="8" cy="52" r="4" fill="white" />
          <polygon points="52,48 60,56 52,56" fill="white" />
        </svg>
      );
    case 'down-curve':
      return (
        <svg viewBox="0 0 64 64" className={`${base} ${className}`}>
          <path d="M 8 12 Q 32 56 56 12" stroke="white" {...stroke} />
          <circle cx="8" cy="12" r="4" fill="white" />
          <polygon points="52,8 60,8 56,16" fill="white" />
        </svg>
      );
    case 'circle':
      return (
        <svg viewBox="0 0 64 64" className={`${base} ${className}`}>
          <circle cx="32" cy="32" r="22" stroke="white" {...stroke} />
          <circle cx="32" cy="10" r="4" fill="white" />
        </svg>
      );
    case 'quiz':
      return (
        <svg viewBox="0 0 64 64" className={`${base} ${className}`}>
          <line x1="32" y1="8" x2="32" y2="28" stroke="white" {...stroke} strokeWidth={4} />
          <line x1="12" y1="18" x2="52" y2="18" stroke="white" {...stroke} strokeWidth={4} />
          <path d="M 8 44 Q 32 20 56 44" stroke="white" {...stroke} strokeWidth={4} />
          <circle cx="32" cy="56" r="5" fill="white" />
        </svg>
      );
    default:
      return null;
  }
}

/* ─── STROKE KEY RESOLVER ─── */
function getStrokeKey(title: string): string | null {
  const t = title.toLowerCase();
  if (t.includes('நேர்கோடு') || t.includes('நேர் கோடு') || t.includes('standing')) return 'standing';
  if (t.includes('படுக்கைகோடு') || t.includes('படுத்த கோடு') || t.includes('sleeping')) return 'sleeping';
  if (t.includes('இடது சாய்வு') || t.includes('left slant') || t.includes('left-slant')) return 'left-slanting';
  if (t.includes('வலது சாய்வு') || t.includes('right slant') || t.includes('right-slant')) return 'right-slanting';
  if (t.includes('இடது வளைவு') || t.includes('left curve') || t.includes('left-curve')) return 'left-curve';
  if (t.includes('வலது வளைவு') || t.includes('right curve') || t.includes('right-curve')) return 'right-curve';
  if (t.includes('மேல் வளைவு') || t.includes('up curve') || t.includes('up-curve')) return 'up-curve';
  if (t.includes('கீழ் வளைவு') || t.includes('down curve') || t.includes('down-curve')) return 'down-curve';
  if (t.includes('வட்டம்') || t.includes('circle')) return 'circle';
  if (t.includes('தேர்வு') || t.includes('quiz') || t.includes('exam') || t.includes('test')) return 'quiz';
  return null;
}

/* ─── CONSONANT GROUP SVG ICONS ─── */
function ConsonantIcon({ group, className = '' }: { group: string; className?: string }) {
  const configs: Record<string, { letters: string[]; colors: string[]; bg: string }> = {
    'ka-group': {
      letters: ['க்', 'ங்', 'ச்', 'ஞ்'],
      colors: ['#FF6B6B', '#FF9F43', '#FFEAA7', '#74B9FF'],
      bg: 'from-orange-500 to-red-500',
    },
    'ta-group': {
      letters: ['ட்', 'ண்', 'த்', 'ந்'],
      colors: ['#A29BFE', '#6C5CE7', '#FD79A8', '#FDCB6E'],
      bg: 'from-violet-500 to-purple-600',
    },
    'pa-group': {
      letters: ['ப்', 'ம்'],
      colors: ['#55EFC4', '#00B894'],
      bg: 'from-emerald-400 to-teal-600',
    },
    'ya-group': {
      letters: ['ய்', 'ர்', 'ல்', 'வ்'],
      colors: ['#FD79A8', '#E17055', '#FDCB6E', '#74B9FF'],
      bg: 'from-pink-500 to-rose-500',
    },
    'zha-group': {
      letters: ['ழ்', 'ள்', 'ற்', 'ன்'],
      colors: ['#55EFC4', '#74B9FF', '#A29BFE', '#FF6B6B'],
      bg: 'from-sky-500 to-blue-600',
    },
  };
  const cfg = configs[group];
  if (!cfg) return null;

  const isFour = cfg.letters.length === 4;
  const isTwo  = cfg.letters.length === 2;

  return (
    <svg viewBox="0 0 96 96" className={className} style={{ fontFamily: 'inherit' }}>
      {/* Decorative background circles */}
      <circle cx="48" cy="48" r="44" fill="white" fillOpacity="0.12" />
      <circle cx="48" cy="48" r="32" fill="white" fillOpacity="0.08" />
      {isFour && (
        <>
          {/* Top-left */}
          <circle cx="28" cy="28" r="18" fill={cfg.colors[0]} fillOpacity="0.9" />
          <text x="28" y="35" textAnchor="middle" fontSize="15" fill="white" fontWeight="900">{cfg.letters[0]}</text>
          {/* Top-right */}
          <circle cx="68" cy="28" r="18" fill={cfg.colors[1]} fillOpacity="0.9" />
          <text x="68" y="35" textAnchor="middle" fontSize="15" fill="white" fontWeight="900">{cfg.letters[1]}</text>
          {/* Bottom-left */}
          <circle cx="28" cy="68" r="18" fill={cfg.colors[2]} fillOpacity="0.9" />
          <text x="28" y="75" textAnchor="middle" fontSize="15" fill="white" fontWeight="900">{cfg.letters[2]}</text>
          {/* Bottom-right */}
          <circle cx="68" cy="68" r="18" fill={cfg.colors[3]} fillOpacity="0.9" />
          <text x="68" y="75" textAnchor="middle" fontSize="15" fill="white" fontWeight="900">{cfg.letters[3]}</text>
        </>
      )}
      {isTwo && (
        <>
          {/* Left large */}
          <circle cx="32" cy="48" r="24" fill={cfg.colors[0]} fillOpacity="0.92" />
          <text x="32" y="57" textAnchor="middle" fontSize="20" fill="white" fontWeight="900">{cfg.letters[0]}</text>
          {/* Right large */}
          <circle cx="68" cy="48" r="20" fill={cfg.colors[1]} fillOpacity="0.92" />
          <text x="68" y="56" textAnchor="middle" fontSize="17" fill="white" fontWeight="900">{cfg.letters[1]}</text>
        </>
      )}
      {/* Sparkle stars */}
      <polygon points="48,4 50,10 56,10 51,14 53,20 48,16 43,20 45,14 40,10 46,10" fill="white" fillOpacity="0.9" />
    </svg>
  );
}

function getConsonantKey(title: string): string | null {
  if (title.includes('க்') && title.includes('ங்')) return 'ka-group';
  if (title.includes('ட்') && title.includes('ண்')) return 'ta-group';
  if (title.includes('ப்') && title.includes('ம்') && !title.includes('க்')) return 'pa-group';
  if (title.includes('ய்') && title.includes('ர்')) return 'ya-group';
  if (title.includes('ழ்') && title.includes('ள்')) return 'zha-group';
  return null;
}


/* ─── SIMPLE WORDS SVG ICONS ─── */
function WordsIcon({ type, className = '' }: { type: string; className?: string }) {
  switch (type) {
    case 'vowel-words':
      // Colourful vowel letters அ ஆ இ arranged as bubbles
      return (
        <svg viewBox="0 0 96 96" className={className}>
          <circle cx="48" cy="48" r="44" fill="white" fillOpacity="0.1" />
          {/* Big central அ */}
          <circle cx="48" cy="44" r="26" fill="#FF6B6B" fillOpacity="0.92" />
          <text x="48" y="54" textAnchor="middle" fontSize="26" fill="white" fontWeight="900">அ</text>
          {/* Small ஆ top-right */}
          <circle cx="78" cy="22" r="14" fill="#FF9F43" fillOpacity="0.92" />
          <text x="78" y="28" textAnchor="middle" fontSize="13" fill="white" fontWeight="900">ஆ</text>
          {/* Small இ bottom-right */}
          <circle cx="80" cy="70" r="13" fill="#A29BFE" fillOpacity="0.92" />
          <text x="80" y="76" textAnchor="middle" fontSize="12" fill="white" fontWeight="900">இ</text>
          {/* Tiny ஈ bottom-left */}
          <circle cx="18" cy="72" r="11" fill="#55EFC4" fillOpacity="0.92" />
          <text x="18" y="78" textAnchor="middle" fontSize="10" fill="white" fontWeight="900">ஈ</text>
          {/* Sparkle */}
          <polygon points="48,2 50,8 56,8 51,12 53,18 48,14 43,18 45,12 40,8 46,8" fill="white" fillOpacity="0.9" />
        </svg>
      );
    case 'basic-words':
      // House + sun + star = everyday items
      return (
        <svg viewBox="0 0 96 96" className={className}>
          <circle cx="48" cy="48" r="44" fill="white" fillOpacity="0.1" />
          {/* House */}
          <rect x="26" y="50" width="34" height="26" rx="3" fill="#FDCB6E" fillOpacity="0.95" />
          <polygon points="22,52 48,28 74,52" fill="#E17055" fillOpacity="0.95" />
          <rect x="40" y="62" width="10" height="14" rx="2" fill="#6C5CE7" fillOpacity="0.9" />
          {/* Sun top-right */}
          <circle cx="76" cy="20" r="11" fill="#FFEAA7" fillOpacity="1" />
          <line x1="76" y1="6" x2="76" y2="10" stroke="#FFEAA7" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="76" y1="30" x2="76" y2="34" stroke="#FFEAA7" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="62" y1="20" x2="66" y2="20" stroke="#FFEAA7" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="86" y1="20" x2="90" y2="20" stroke="#FFEAA7" strokeWidth="2.5" strokeLinecap="round" />
          {/* Star bottom-left */}
          <polygon points="16,70 18,78 26,78 20,83 22,91 16,86 10,91 12,83 6,78 14,78" fill="#74B9FF" fillOpacity="0.92" />
        </svg>
      );
    case 'animals':
      // Paw print with colourful toe pads
      return (
        <svg viewBox="0 0 96 96" className={className}>
          <circle cx="48" cy="48" r="44" fill="white" fillOpacity="0.1" />
          {/* Main paw pad */}
          <ellipse cx="48" cy="62" rx="20" ry="16" fill="#FF6B6B" fillOpacity="0.9" />
          {/* Toe pads */}
          <circle cx="30" cy="42" r="10" fill="#FF9F43" fillOpacity="0.92" />
          <circle cx="48" cy="36" r="11" fill="#FD79A8" fillOpacity="0.92" />
          <circle cx="66" cy="42" r="10" fill="#A29BFE" fillOpacity="0.92" />
          {/* Mini inner toe */}
          <circle cx="20" cy="58" r="7" fill="#FDCB6E" fillOpacity="0.92" />
          <circle cx="76" cy="58" r="7" fill="#55EFC4" fillOpacity="0.92" />
          {/* Sparkle star */}
          <polygon points="48,2 50,8 56,8 51,12 53,18 48,14 43,18 45,12 40,8 46,8" fill="white" fillOpacity="0.85" />
        </svg>
      );
    case 'things':
      // Grid of colourful everyday object shapes
      return (
        <svg viewBox="0 0 96 96" className={className}>
          <circle cx="48" cy="48" r="44" fill="white" fillOpacity="0.1" />
          {/* Book (top-left) */}
          <rect x="10" y="12" width="32" height="36" rx="4" fill="#74B9FF" fillOpacity="0.92" />
          <line x1="26" y1="12" x2="26" y2="48" stroke="white" strokeWidth="2" />
          <line x1="14" y1="22" x2="24" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="14" y1="28" x2="24" y2="28" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          {/* Ball (top-right) */}
          <circle cx="72" cy="28" r="18" fill="#FF6B6B" fillOpacity="0.92" />
          <path d="M 56 22 Q 72 14 88 22" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 54 32 Q 72 42 90 32" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Pencil (bottom-left) */}
          <rect x="12" y="56" width="10" height="30" rx="2" fill="#FDCB6E" fillOpacity="0.95" />
          <polygon points="12,86 22,86 17,96" fill="#E17055" fillOpacity="0.95" />
          {/* Star (bottom-right) */}
          <polygon points="70,58 73,68 83,68 75,74 78,84 70,78 62,84 65,74 57,68 67,68" fill="#A29BFE" fillOpacity="0.92" />
        </svg>
      );
    default:
      return null;
  }
}

function getWordsKey(title: string): string | null {
  if (title.includes('விலங்கு') || title.toLowerCase().includes('animal')) return 'animals';
  if (title.includes('பொருட்கள்') || title.toLowerCase().includes('things') || title.includes('சுற்றியுள்ள')) return 'things';
  if (title.includes('உயிரெழுத்து') || title.includes('உயிர்எழுத்து')) return 'vowel-words';
  if (title.includes('அடிப்படை') || title.includes('தினமும்') || title.includes('எளிய தமிழ்')) return 'basic-words';
  return null;
}

/* ─── CHECKPOINT SVG ICONS ─── */
function CheckpointIcon({ type, className = '' }: { type: string; className?: string }) {
  switch (type) {
    case 'balloon-pop':
      return (
        <svg viewBox="0 0 96 96" className={className}>
          <circle cx="48" cy="48" r="44" fill="white" fillOpacity="0.1" />
          {/* Balloon 1 (Left - Red/Orange) */}
          <g transform="translate(14, 18)">
            <path d="M 16 0 C 26 0, 32 8, 32 18 C 32 28, 24 36, 16 36 C 8 36, 0 28, 0 18 C 0 8, 6 0, 16 0 Z" fill="#FF6B6B" />
            <polygon points="16,36 12,41 20,41" fill="#FF6B6B" />
            <path d="M 16,41 Q 14,48 18,54" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
            <text x="16" y="24" textAnchor="middle" fontSize="14" fill="white" fontWeight="900">A</text>
          </g>
          {/* Balloon 2 (Right - Blue/Purple) */}
          <g transform="translate(48, 12)">
            <path d="M 16 0 C 26 0, 32 8, 32 18 C 32 28, 24 36, 16 36 C 8 36, 0 28, 0 18 C 0 8, 6 0, 16 0 Z" fill="#74B9FF" />
            <polygon points="16,36 12,41 20,41" fill="#74B9FF" />
            <path d="M 16,41 Q 18,48 14,54" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
            <text x="16" y="24" textAnchor="middle" fontSize="14" fill="white" fontWeight="900">B</text>
          </g>
          {/* Mini Yellow Balloon center-bottom */}
          <g transform="translate(34, 38) scale(0.7)">
            <path d="M 16 0 C 26 0, 32 8, 32 18 C 32 28, 24 36, 16 36 C 8 36, 0 28, 0 18 C 0 8, 6 0, 16 0 Z" fill="#FFEAA7" />
            <polygon points="16,36 12,41 20,41" fill="#FFEAA7" />
            <text x="16" y="24" textAnchor="middle" fontSize="14" fill="#E17055" fontWeight="900">C</text>
          </g>
        </svg>
      );
    case 'card-matching':
      return (
        <svg viewBox="0 0 96 96" className={className}>
          <circle cx="48" cy="48" r="44" fill="white" fillOpacity="0.1" />
          {/* Underlay card (Purple) */}
          <g transform="translate(18, 26) rotate(-12)">
            <rect x="0" y="0" width="36" height="50" rx="6" fill="#A29BFE" stroke="white" strokeWidth="2.5" />
            <text x="18" y="32" textAnchor="middle" fontSize="18" fill="white" fontWeight="900">A</text>
          </g>
          {/* Overlay card (Pink) */}
          <g transform="translate(44, 20) rotate(8)">
            <rect x="0" y="0" width="36" height="50" rx="6" fill="#FD79A8" stroke="white" strokeWidth="2.5" />
            <text x="18" y="32" textAnchor="middle" fontSize="18" fill="white" fontWeight="900">a</text>
          </g>
          {/* Shiny sparkles */}
          <polygon points="18,12 20,16 24,16 21,19 22,23 18,20 14,23 15,19 12,16 16,16" fill="#FFEAA7" />
          <polygon points="80,72 82,76 86,76 83,79 84,83 80,80 76,83 77,79 74,76 78,76" fill="#55EFC4" />
        </svg>
      );
    default:
      return null;
  }
}

function getCheckpointKey(title: string): string | null {
  const t = title.toLowerCase();
  if (t.includes('balloon') || t.includes('pop') || t.includes('பலூன்')) return 'balloon-pop';
  if (t.includes('card') || t.includes('pick') || t.includes('matching') || t.includes('அட்டை')) return 'card-matching';
  return null;
}


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

function UltimateLearnEngineInner() {
    const { user, loading: authLoading } = useAuth();
    const { subjects, studentProfile, updateProgress, refetchLessons } = useData();
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();
    const queryClient = useQueryClient();

    const subjectParam = searchParams.get('subject');
    const chapterParam = searchParams.get('chapter');

    const [mounted, setMounted] = useState(false);
    const [view, setView] = useState<'hub' | 'chapter'>(subjectParam ? 'chapter' : 'hub');
    const [activeSubjectId, setActiveSubjectId] = useState<string | null>(subjectParam);
    const [activeChapterId, setActiveChapterId] = useState<string | null>(chapterParam);
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
    const [showNameTrace, setShowNameTrace] = useState(false);
    const [traceRounds, setTraceRounds] = useState<{ type: 'guide' | 'trace'; path: string }[] | null>(null);
    const [roundIndex, setRoundIndex] = useState(0);
    const [roundPassed, setRoundPassed] = useState<number[]>([]);
    const [traceDone, setTraceDone] = useState(false);
    const [traceLessonId, setTraceLessonId] = useState<string | null>(null);
    const [showCheckpoint, setShowCheckpoint] = useState(false);
    const [checkpointLessonId, setCheckpointLessonId] = useState<string | null>(null);
    const [checkpointTitle, setCheckpointTitle] = useState('');
    const [showVowelQuiz, setShowVowelQuiz] = useState<null | 'a-u' | 'e-au'>(null);
    const [showMeiQuiz, setShowMeiQuiz] = useState<null | 'set-1' | 'set-2' | 'set-3' | 'set-4' | 'set-5'>(null);
    const [showWordShowcase, setShowWordShowcase] = useState<null | 'set-1' | 'set-2' | 'set-3' | 'set-4'>(null);

    useEffect(() => {
        const timer = requestAnimationFrame(() => setMounted(true));
        audioEngine?.warmUp();
        return () => cancelAnimationFrame(timer);
    }, []);

    const filteredSubjects = useMemo(() => {
        if (params?.locale === 'ta') {
            return subjects.filter(s => {
                const name = s.name.toLowerCase();
                return !(name.includes('முன் எழுத்து') || name.includes('pre-writing') || name.includes('pre writing'));
            });
        }
        return subjects;
    }, [subjects, params?.locale]);

    const activeSubject = useMemo(() =>
        filteredSubjects.find(s => s.id === activeSubjectId), [activeSubjectId, filteredSubjects]);
    const activeChapter = useMemo(() =>
        activeSubject?.chapters.find(c => c.id === activeChapterId), [activeSubject, activeChapterId]);

    // Auto-select subject from URL param when subjects are loaded
    useEffect(() => {
        if (subjectParam && filteredSubjects.length > 0 && !activeSubjectId) {
            const matched = filteredSubjects.find(s => s.id === subjectParam);
            if (matched) {
                setActiveSubjectId(matched.id);
                setView('chapter');
            }
        }
    }, [subjectParam, filteredSubjects, activeSubjectId]);

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
        setActiveSubjectId(null);
        setView('hub');
        const currentLocale = params?.locale || 'en';
        router.push(`/${currentLocale}/student/Home`, { scroll: true });
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

        // Tamil vowel lessons → TamilVowelQuiz
        const isTamilSubject = activeSubject?.name?.toLowerCase().includes('tamil') || activeSubject?.name?.toLowerCase().includes('தமிழ்');
        const chapterName = activeChapter?.name || '';
        
        if (isTamilSubject) {
            const isVowelAU =
                chapterName.includes('உயிர் எழுத்துக்கள் அ-ஊ') ||
                (chapterName.toLowerCase().includes('vowel') && !chapterName.includes('எ-ஔ') && !chapterName.includes('எ-ஃ')) ||
                ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ'].includes(lower.trim());
            const isVowelEAU =
                chapterName.includes('உயிர் எழுத்துக்கள் எ-ஔ') ||
                chapterName.includes('உயிர் எழுத்துக்கள் எ-ஃ') ||
                ['எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ', 'ஃ'].includes(lower.trim());
            if (isVowelAU) {
                setShowVowelQuiz('a-u');
                return;
            }
            if (isVowelEAU) {
                setShowVowelQuiz('e-au');
                return;
            }

            // Tamil consonant lessons → TamilMeiQuiz (both வரிசை 1 & 2)
            const isMeiChapter = chapterName.includes('மெய் எழுத்துக்கள்');
            const isMeiSet1 = isMeiChapter && (lower.includes('ய்') || lower.includes('ர்') || lower.includes('ல்') || lower.includes('வ்'));
            const isMeiSet2 = isMeiChapter && (lower.includes('ழ்') || lower.includes('ள்') || lower.includes('ற்') || lower.includes('ன்'));
            const isMeiSet3 = isMeiChapter && (lower.includes('க்') || lower.includes('ங்') || lower.includes('ச்') || lower.includes('ஞ்'));
            const isMeiSet4 = isMeiChapter && (lower.includes('ட்') || lower.includes('ண்') || lower.includes('த்') || lower.includes('ந்'));
            const isMeiSet5 = isMeiChapter && (lower.includes('ப்') || lower.includes('ம்'));
            if (isMeiSet1) { setShowMeiQuiz('set-1'); return; }
            if (isMeiSet2) { setShowMeiQuiz('set-2'); return; }
            if (isMeiSet3) { setShowMeiQuiz('set-3'); return; }
            if (isMeiSet4) { setShowMeiQuiz('set-4'); return; }
            if (isMeiSet5) { setShowMeiQuiz('set-5'); return; }

            // Tamil simple words → TamilWordShowcase
            const isWordChapter = chapterName.includes('எளிய சொற்கள்');
            if (isWordChapter) {
                if (lower.includes('உயிரெழுத்து') || lower.includes('vowel')) {
                    setShowWordShowcase('set-1');
                } else if (lower.includes('அடிப்படை') || lower.includes('simple') || lower.includes('அம்மா')) {
                    setShowWordShowcase('set-2');
                } else if (lower.includes('விலங்குகள்') || lower.includes('animal')) {
                    setShowWordShowcase('set-3');
                } else {
                    setShowWordShowcase('set-4');
                }
                return;
            }
        }

        // "My Name Writing" → direct name tracing (exclude GK/EVS/Hindi subjects)
        const isGkOrEvsSubject =
            activeSubject?.name?.toLowerCase().includes('general') ||
            activeSubject?.name?.toLowerCase().includes('knowledge') ||
            activeSubject?.name?.toLowerCase().includes('little genius') ||
            activeSubject?.name?.toLowerCase().includes('environment') ||
            activeSubject?.name?.toLowerCase().includes('evs') ||
            activeSubject?.name?.toLowerCase().includes('gk') ||
            activeSubject?.name?.toLowerCase().includes('hindi');
        if (!isGkOrEvsSubject && lower.includes('name') && !lower.includes('identity')) {
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
                setTraceLessonId(lesson.id);
                setActiveLesson(null);
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
                setTraceLessonId(lesson.id);
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
        // Auto-complete any incomplete hidden lessons in the same chapter
        if (activeLesson && subjects?.length) {
            const chapter = subjects.flatMap(s => s.chapters).find(c => c.lessons.some(l => l.id === activeLesson.id));
            if (chapter) {
                const filtered = chapter.lessons.filter(l => {
                    const t = l.title.toLowerCase();
                    return !t.includes('inside') && !t.includes('outside') && !t.includes('complete the pattern') && !(t.includes('animal') && t.includes('sound'));
                });
                const allVisibleDone = filtered.every(l => l.progress?.status === 'completed');
                if (allVisibleDone) {
                    chapter.lessons.forEach(l => {
                        if (l.progress?.status !== 'completed') {
                            studentApi.updateProgress(l.id, { status: 'completed', completion_percentage: 100 });
                        }
                    });
                }
            }
            refetchLessons();
        }
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

    if (mounted && !authLoading && !user) {
        return (
            <div className="fixed inset-0 z-[500] flex items-center justify-center bg-slate-950/90">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative w-full max-w-md mx-4 p-8 text-center bg-[#fffdf9] rounded-[2.5rem] border-4 border-amber-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden"
                >
                    {/* Playful background blobs */}
                    <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-pink-100/50 rounded-full blur-[60px] pointer-events-none" />
                    <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-sky-100/50 rounded-full blur-[60px] pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center gap-6">
                        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-4xl shadow-md border-2 border-amber-100">
                            🔒
                        </div>
                        
                        <div>
                            <h2 className="text-2xl font-black text-amber-950 tracking-tight font-sans">
                                {isTamil ? 'அமர்வு முடிந்தது!' : 'Session Expired!'}
                            </h2>
                            <p className="text-sm font-bold text-amber-800/80 mt-2 font-sans leading-relaxed">
                                {isTamil 
                                    ? 'உங்கள் அமர்வு முடிந்துவிட்டது. தயவுசெய்து மீண்டும் உள்நுழையவும்!' 
                                    : 'Your session has expired. Please log in again to continue your adventure!'}
                            </p>
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                window.location.href = `/${params?.locale || 'en'}/login?session_closed=1`;
                            }}
                            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-base rounded-2xl shadow-lg border-b-4 border-emerald-700 active:scale-95 font-sans"
                        >
                            {isTamil ? 'மீண்டும் உள்நுழைக ➡️' : 'Log In Again ➡️'}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        );
    }

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
                            <div className="absolute top-10 left-[10%] text-6xl opacity-40 cursor-default">☁️</div>
                            <div className="absolute bottom-20 left-[30%] text-4xl opacity-30 cursor-default">☁️</div>
                            <div className="absolute top-20 right-[40%] text-8xl opacity-30 cursor-default" style={{ animationDelay: '1s' }}>☁️</div>

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
                                        READY FOR A <br />
                                        <span className="text-indigo-800">MISSION, {studentName.toUpperCase()}?</span>
                                    </h1>

                                    <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                                        <div className="px-8 py-4 bg-white/95 border border-white/60 rounded-2xl flex items-center gap-4">
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
                                            className="w-full h-full object-contain"
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
                                        <div className="w-10 h-10 bg-white/95 rounded-xl flex items-center justify-center border border-white/60 shadow-lg">
                                            <MapIcon className="text-indigo-950" size={20} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-indigo-950 leading-none">Discovery Worlds</h2>
                                            <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest mt-1">Tap a picture to play</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                                        {filteredSubjects.length === 0 ? (
                                            <div className="col-span-full text-center py-20">
                                                <p className="text-white/60 font-black text-lg">No worlds loaded yet. Start your journey!</p>
                                            </div>
                                        ) : (
                                            filteredSubjects.map((subject, idx) => {
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
                                                        className={`group relative rounded-[2.5rem] p-1.5 border-2 transition-all duration-350 shadow-xl ${v.shadow} hover:shadow-2xl ${v.bg} ${v.border}`}
                                                    >
                                                        <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${v.color} opacity-10 group-hover:opacity-20 transition-opacity duration-350 blur-xl`} />
                                                        <div className="relative min-h-[220px] sm:min-h-[260px] flex flex-col items-center justify-center p-6 rounded-[2.2rem] overflow-hidden bg-white/90">
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
                                                                            className={`h-2 rounded-full transition-all ${ch.completion_percentage >= 100
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

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 justify-items-center">
                                            {activeSubject.chapters.map((chapter, idx) => {
                                                const subjectVisuals = getSubjectVisuals(activeSubject.name);
                                                const visuals = getChapterVisuals(activeSubject.name, chapter.name, studentProfile?.grade_name);
                                                return (
                                                    <motion.button
                                                        key={chapter.id}
                                                        onClick={() => openChapter(chapter)}
                                                        disabled={!chapter.is_unlocked}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: idx * 0.05 }}
                                                        whileHover={chapter.is_unlocked ? { y: -6 } : {}}
                                                        whileTap={chapter.is_unlocked ? { scale: 0.97 } : {}}
                                                        className={`group relative w-[75vw] max-w-[280px] sm:w-full sm:max-w-[270px] aspect-square mx-auto rounded-[2.5rem] border-4 border-white shadow-2xl active:scale-95 transition-all bg-gradient-to-br ${visuals.color} flex flex-col items-center justify-between p-4 ${
                                                            !chapter.is_unlocked ? 'opacity-50 cursor-not-allowed' : ''
                                                        }`}
                                                    >
                                                        {/* Lock / Status Indicator absolute top-right overlay to avoid layout shift */}
                                                        <div className="absolute top-4 right-4 z-20 flex gap-2">
                                                            {!chapter.is_unlocked && (
                                                                <span className="text-[9px] font-black text-gray-400 bg-white/20 border border-white/30 uppercase tracking-widest px-2 py-0.5 rounded-full">🔒</span>
                                                            )}
                                                            {chapter.is_unlocked && chapter.completion_percentage >= 100 && (
                                                                <span className="text-[9px] font-black text-emerald-600 bg-white border border-emerald-50 uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-md">⭐ Done</span>
                                                            )}
                                                        </div>

                                                        {/* Character image centered in card - matching DashboardHome */}
                                                        <div className="w-full flex-1 flex items-center justify-center select-none pointer-events-none mt-2 relative">
                                                            {chapter.is_unlocked ? (
                                                                visuals.image ? (
                                                                    <Image
                                                                        src={visuals.image}
                                                                        alt={chapter.name}
                                                                        width={200}
                                                                        height={200}
                                                                        priority={true}
                                                                        className="max-h-[170px] w-auto h-auto object-contain transform scale-105 group-hover:scale-110 transition-all duration-200 drop-shadow-[0_8px_8px_rgba(0,0,0,0.2)]"
                                                                    />
                                                                ) : (
                                                                    <span className="text-6xl font-black text-white drop-shadow-md">
                                                                        {visuals.mascot}
                                                                    </span>
                                                                )
                                                            ) : (
                                                                <Lock size={40} className="text-white/40" />
                                                            )}
                                                        </div>

                                                        {/* In-progress progress bar directly overlayed at the bottom of mascot */}
                                                        {chapter.is_unlocked && chapter.completion_percentage > 0 && chapter.completion_percentage < 100 && (
                                                            <div className="w-[80%] h-2.5 bg-white/20 rounded-full overflow-hidden mt-1 border border-white/10 mx-auto">
                                                                <motion.div
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: `${chapter.completion_percentage}%` }}
                                                                    transition={{ duration: 0.8, delay: 0.2 }}
                                                                    className="h-full rounded-full bg-white"
                                                                />
                                                            </div>
                                                        )}

                                                        {/* Clean text directly on card (No white container) - matching DashboardHome */}
                                                        <h3 className="text-white font-black text-base sm:text-xl tracking-tight leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)] uppercase w-full text-center mt-2">
                                                            {cleanSoundTerms(chapter.name)}
                                                        </h3>
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
                                                {getChapterVisuals(activeSubject.name, activeChapter.name, studentProfile?.grade_name).mascot}
                                            </motion.div>
                                            <h2 className="text-3xl font-black text-indigo-950 uppercase tracking-tighter">{cleanSoundTerms(activeChapter.name)}</h2>
                                            <p className="text-[11px] font-bold text-indigo-950/50 mt-2">
                                                {(() => {
                                                    const filtered = activeChapter.lessons.filter(l => {
                                                        const t = l.title.toLowerCase();
                                                        return !t.includes('inside') && !t.includes('outside') && !t.includes('complete the pattern');
                                                    });
                                                    const completed = filtered.filter(l => l.progress?.status === 'completed').length;
                                                    return `${completed}/${filtered.length}`;
                                                })()} lessons
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                                            {activeChapter.lessons.filter(l => {
                                                const t = l.title.toLowerCase();
                                                return !t.includes('inside') && !t.includes('outside') && !t.includes('complete the pattern') && !(t.includes('animal') && t.includes('sound'));
                                            }).map((lesson) => {
                                                const visuals = getLessonVisuals(activeSubject.name, lesson.title);
                                                return (
                                                    <motion.button
                                                        key={lesson.id}
                                                        onClick={() => handleLessonClick(lesson)}
                                                        disabled={!lesson.is_unlocked}
                                                        whileHover={lesson.is_unlocked ? { y: -6, scale: 1.02 } : {}}
                                                        whileTap={lesson.is_unlocked ? { scale: 0.97 } : {}}
                                                        className={`relative bg-white/40 backdrop-blur-2xl border-2 rounded-[2.5rem] p-5 text-center shadow-xl transition-all overflow-hidden group ${lesson.is_unlocked
                                                                ? 'border-white/60 hover:bg-white/60 active:scale-95'
                                                                : 'border-gray-300/30 opacity-50 cursor-not-allowed'
                                                            }`}
                                                    >
                                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                        <div className="relative inline-block mb-4">
                                                            <motion.div
                                                                animate={lesson.is_unlocked ? { y: [0, -6, 0] } : {}}
                                                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                                                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-[2rem] flex items-center justify-center text-5xl sm:text-6xl shadow-xl border-4 border-white transform group-hover:scale-110 transition-transform duration-500 ${lesson.is_unlocked
                                                                        ? `bg-gradient-to-br ${visuals.color} text-white`
                                                                        : 'bg-gray-200 grayscale'
                                                                    }`}
                                                            >
                                                                {lesson.is_unlocked ? (() => {
                                                                const checkpointKey = getCheckpointKey(lesson.title);
                                                                if (checkpointKey) return <CheckpointIcon type={checkpointKey} className="w-16 h-16 sm:w-20 sm:h-20" />;
                                                                const wordsKey = getWordsKey(lesson.title);
                                                                if (wordsKey) return <WordsIcon type={wordsKey} className="w-16 h-16 sm:w-20 sm:h-20" />;
                                                                const consonantKey = getConsonantKey(lesson.title);
                                                                if (consonantKey) return <ConsonantIcon group={consonantKey} className="w-16 h-16 sm:w-20 sm:h-20" />;
                                                                const strokeKey = getStrokeKey(lesson.title);
                                                                if (strokeKey) return <StrokeIcon type={strokeKey} className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]" />;
                                                                return <span className="text-5xl sm:text-6xl">{visuals.mascot}</span>;
                                                            })() : '🔒'}
                                                            </motion.div>
                                                            {lesson.progress?.status === 'completed' && (
                                                                <div className="absolute -top-2 -right-2">
                                                                    <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                                                        <CheckCircle size={20} className="text-white" />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <h3 className={`text-base sm:text-lg font-black mb-1 tracking-tight ${lesson.is_unlocked ? 'text-indigo-950' : 'text-gray-500'
                                                            }`}>
                                                            {cleanSoundTerms(lesson.title)}
                                                        </h3>
                                                        {lesson.description && (
                                                            <p className="text-[10px] font-bold text-indigo-900/40 mb-3 leading-tight line-clamp-1">{cleanSoundTerms(lesson.description)}</p>
                                                        )}
                                                        <div className={`w-full py-2.5 rounded-2xl text-[10px] font-black shadow-lg flex items-center justify-center gap-2 transition-all ${lesson.progress?.status === 'completed'
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

            {activeLesson && !showNameTrace && !showVowelQuiz && !showMeiQuiz && !showWordShowcase && (
                <ActivityPlayer
                    key={activeLesson.id}
                    lessonId={activeLesson.id}
                    lessonTitle={activeLesson.title}
                    onClose={() => setActiveLesson(null)}
                    onComplete={handleActivityComplete}
                    studentName={studentName}
                    subjectName={activeSubject?.name}
                />
            )}

            {/* ─── NAME TRACING ACTIVITY ─── */}
            {showNameTrace && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-gradient-to-br from-sky-300 via-sky-400 to-blue-500">
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

            {showVowelQuiz && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-slate-900/80">
                    <div className="relative w-full max-w-lg sm:max-w-2xl mx-2 sm:mx-4 my-2 sm:my-4 overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-[#fffdf9] border-4 border-amber-200/80">
                        {/* Playful background blobs */}
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-pink-100/50 rounded-full blur-[60px] pointer-events-none" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-sky-100/50 rounded-full blur-[60px] pointer-events-none" />

                        {/* Header */}
                        <div className="relative z-10 flex items-center justify-between px-6 pt-5 pb-3 border-b border-amber-100/60 bg-amber-50/30">
                            <span className="text-xs sm:text-sm font-black text-amber-700/80 tracking-wider">
                                ✍️ {showVowelQuiz === 'e-au' ? 'உயிர் எழுத்துக்கள் எ–ஔ' : 'உயிர் எழுத்துக்கள் அ–ஊ'}
                            </span>
                            <button
                                onClick={() => { setShowVowelQuiz(null); setActiveLesson(null); }}
                                className="w-8 h-8 rounded-full bg-amber-100/60 hover:bg-amber-200/80 flex items-center justify-center text-amber-800 text-xl font-bold transition-all border border-amber-200/50 active:scale-90"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="relative z-10 p-4 sm:p-6 min-h-[350px] flex flex-col justify-center">
                            <TamilVowelQuiz
                                key={showVowelQuiz}
                                config={{ set: showVowelQuiz }}
                                onComplete={() => {
                                    if (activeLesson) {
                                        studentApi.updateProgress(activeLesson.id, { status: 'completed', completion_percentage: 100 })
                                            .catch(() => {})
                                            .finally(() => refetchLessons());
                                    }
                                    setShowVowelQuiz(null);
                                    setActiveLesson(null);
                                    refetchLessons();
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ─── TAMIL MEI QUIZ ─── */}
            {showMeiQuiz && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-slate-900/80">
                    <div className="relative w-full max-w-lg sm:max-w-2xl mx-2 sm:mx-4 my-2 sm:my-4 overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-[#fffdf9] border-4 border-amber-200/80">
                        {/* Playful background blobs */}
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-pink-100/50 rounded-full blur-[60px] pointer-events-none" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-sky-100/50 rounded-full blur-[60px] pointer-events-none" />

                        {/* Header */}
                        <div className="relative z-10 flex items-center justify-between px-6 pt-5 pb-3 border-b border-amber-100/60 bg-amber-50/30">
                            <span className="text-xs sm:text-sm font-black text-amber-700/80 tracking-wider">
                                ✍️ {{
                                    'set-1': 'மெய் எழுத்துக்கள் ய்–வ்',
                                    'set-2': 'மெய் எழுத்துக்கள் ழ்–ன்',
                                    'set-3': 'மெய் எழுத்துக்கள் க்–ஞ்',
                                    'set-4': 'மெய் எழுத்துக்கள் ட்–ந்',
                                    'set-5': 'மெய் எழுத்துக்கள் ப்–ம்',
                                }[showMeiQuiz] || 'மெய் எழுத்துக்கள்'}
                            </span>
                            <button
                                onClick={() => { setShowMeiQuiz(null); setActiveLesson(null); }}
                                className="w-8 h-8 rounded-full bg-amber-100/60 hover:bg-amber-200/80 flex items-center justify-center text-amber-800 text-xl font-bold transition-all border border-amber-200/50 active:scale-90"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="relative z-10 p-4 sm:p-6 min-h-[350px] flex flex-col justify-center">
                            <TamilMeiQuiz
                                key={showMeiQuiz}
                                config={{ set: showMeiQuiz }}
                                onComplete={() => {
                                    if (activeLesson) {
                                        studentApi.updateProgress(activeLesson.id, { status: 'completed', completion_percentage: 100 })
                                            .catch(() => {})
                                            .finally(() => refetchLessons());
                                    }
                                    setShowMeiQuiz(null);
                                    setActiveLesson(null);
                                    refetchLessons();
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ─── TAMIL WORD SHOWCASE ─── */}
            {showWordShowcase && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-slate-900/80">
                    <div className="relative w-full max-w-lg sm:max-w-2xl mx-2 sm:mx-4 my-2 sm:my-4 overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-[#fffdf9] border-4 border-amber-200/80">
                        {/* Playful background blobs */}
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-pink-100/50 rounded-full blur-[60px] pointer-events-none" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-sky-100/50 rounded-full blur-[60px] pointer-events-none" />

                        {/* Header */}
                        <div className="relative z-10 flex items-center justify-between px-6 pt-5 pb-3 border-b border-amber-100/60 bg-amber-50/30">
                            <span className="text-xs sm:text-sm font-black text-amber-700/80 tracking-wider">
                                ✍️ {{
                                    'set-1': 'உயிரெழுத்து சார்ந்த சொற்கள்',
                                    'set-2': 'அடிப்படை எளிய சொற்கள்',
                                    'set-3': 'விலங்குகள் (Animals)',
                                    'set-4': 'நம்மை சுற்றியுள்ள பொருட்கள்',
                                }[showWordShowcase] || 'எளிய சொற்கள்'}
                            </span>
                            <button
                                onClick={() => { setShowWordShowcase(null); setActiveLesson(null); }}
                                className="w-8 h-8 rounded-full bg-amber-100/60 hover:bg-amber-200/80 flex items-center justify-center text-amber-800 text-xl font-bold transition-all border border-amber-200/50 active:scale-90"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="relative z-10 p-4 sm:p-6 min-h-[350px] flex flex-col justify-center">
                            <TamilWordShowcase
                                key={showWordShowcase}
                                config={{ set: showWordShowcase }}
                                onComplete={() => {
                                    if (activeLesson) {
                                        studentApi.updateProgress(activeLesson.id, { status: 'completed', completion_percentage: 100 })
                                            .catch(() => {})
                                            .finally(() => refetchLessons());
                                    }
                                    setShowWordShowcase(null);
                                    setActiveLesson(null);
                                    refetchLessons();
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ─── PRE-WRITING TRACE ROUNDS ─── */}
            {traceRounds && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-slate-900/80">
                    <div className="relative w-full max-w-lg sm:max-w-2xl mx-2 sm:mx-4 my-2 sm:my-4 overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-[#fffdf9] border-4 border-amber-200/80">
                        {/* Playful background blobs */}
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-pink-100/50 rounded-full blur-[60px] pointer-events-none" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-sky-100/50 rounded-full blur-[60px] pointer-events-none" />
                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #b45309 1px, transparent 0)', backgroundSize: '18px 18px' }} />
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
                                    <div className="relative z-10 flex items-center justify-between px-6 pt-5 pb-3 border-b border-amber-100/60 bg-amber-50/30">
                                        <span className="text-xs sm:text-sm font-black text-amber-700/80 tracking-wider">
                                            {roundIndex + 1} / {traceRounds.length}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {traceRounds.map((a, i) => (
                                                <div key={i}
                                                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-black transition-all shadow-sm
                                                        ${roundIndex > i ? 'bg-emerald-500 text-white' : i === roundIndex ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-300' : 'bg-amber-100/60 text-amber-700/40'}`}
                                                >
                                                    {roundIndex > i ? '✓' : i + 1}
                                                </div>
                                            ))}
                                        </div>
                                        <button onClick={() => { setTraceRounds(null); setActiveLesson(null); }}
                                            className="w-8 h-8 rounded-full bg-amber-100/60 hover:bg-amber-200/80 flex items-center justify-center text-amber-800 text-xl font-bold transition-all border border-amber-200/50 active:scale-90">&times;</button>
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
                                <span className="text-6xl">
                                    {roundPassed.every(a => a >= 70) ? '🎉' : '💪'}
                                </span>
                                <p className="text-xl font-black text-amber-950 font-sans">
                                    {roundPassed.every(a => a >= 70)
                                        ? (isTamil ? 'அருமை! சூப்பர்!' : 'Super!')
                                        : (isTamil ? 'மீண்டும் முயற்சி செய்!' : 'Nice try!')}
                                </p>
                                <p className="text-amber-800 font-bold text-sm font-sans">
                                    {isTamil ? 'சராசரி' : 'Avg'}: {Math.round(roundPassed.reduce((s, a) => s + a, 0) / roundPassed.length)}%
                                </p>
                                <button onClick={() => {
                                    if (traceLessonId) {
                                        updateProgress(traceLessonId, 'completed');
                                    }
                                    setTraceRounds(null);
                                    setTraceLessonId(null);
                                    setActiveLesson(null);
                                    refetchLessons();
                                }}
                                    className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-black rounded-full shadow-lg transition-all border-b-4 border-green-700 active:scale-95 font-sans">
                                    {isTamil ? 'முடிந்தது! ✅' : 'Done ✅'}
                                </button>
                            </motion.div>
                        )}

                        {/* Warm Cream Tray at the bottom of the card */}
                        <div className="w-[90%] mx-auto mb-4 sm:mb-6 h-3 sm:h-4 bg-[#fffdf9] rounded-t-lg flex items-center justify-start px-4 sm:px-8 gap-2 sm:gap-4 border-t border-amber-100">
                            <div className="w-6 h-2 sm:w-8 sm:h-2.5 bg-yellow-100 rounded-sm transform rotate-6 border border-yellow-200/50 shadow-sm" />
                            <div className="w-7 h-2 sm:w-9 sm:h-2.5 bg-white rounded-sm transform -rotate-3 border border-white/20 shadow-sm" />
                            <div className="w-5 h-2 sm:w-7 sm:h-2.5 bg-pink-200 rounded-sm transform rotate-12 border border-pink-300/30 shadow-sm" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function UltimateLearnEngine() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen"><div className="w-10 h-10 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" /></div>}>
            <UltimateLearnEngineInner />
        </Suspense>
    );
}
