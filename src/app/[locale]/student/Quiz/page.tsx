'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Star, Play, Lock, CheckCircle2, ArrowLeft, RotateCcw, 
  HelpCircle, Calendar, Target, Award, Cloud, Gamepad2, ChevronRight, X
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useData } from '@/context/DataContext';
import QuizEngine from '../_components/QuizEngine';
import { SoundMatchGame, TrueOrFalseGame, SequenceGame, MemoryMatchGame } from '../_components/GameActivities';

// ─── QUESTIONS & LEVELS DATA ───

type Option = {
  text: string;
  emoji?: string;
  img?: string;
  correct: boolean;
};

type Question = {
  type: 'trace' | 'sequence' | 'find' | 'match' | 'choice';
  instruction: string;
  instructionTa: string;
  letter?: string;
  sequence?: string[];
  options: Option[];
  matchImage?: string;
};

type Level = {
  id: number;
  title: string;
  titleEn: string;
  mascot: string;
  color: string;
  borderColor: string;
  questions: Question[];
};

const TAMIL_LEVELS: Level[] = [
  {
    id: 1,
    title: 'உயிர் எழுத்துக்கள் அ-உ (Vowels Part 1)',
    titleEn: 'Tamil Vowels (அ-உ)',
    mascot: '🦉',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which word starts with the letter "அ"?',
        instructionTa: '"அ" எழுத்தில் தொடங்கும் படம் எது? 🐿️',
        options: [
          { text: 'அணில்', emoji: '🐿️', correct: true },
          { text: 'ஆடு', emoji: '🐐', correct: false },
          { text: 'இலை', emoji: '🍃', correct: false },
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the letter "அ"',
        instructionTa: '"அ" எழுத்தை பலகையில் எழுதவும்! ✏️',
        letter: 'அ',
        options: []
      },
      {
        type: 'choice',
        instruction: 'Find the odd letter out:',
        instructionTa: 'வேறுபட்ட எழுத்தைக் கண்டுபிடி! 🔍',
        options: [
          { text: 'இ', correct: true },
          { text: 'அ', correct: false },
          { text: 'அ', correct: false },
        ]
      },
      {
        type: 'match',
        instruction: 'Match Mother to correct starting letter',
        instructionTa: '"அம்மா" - முதல் எழுத்தைத் தொடுங்கள்! 👩',
        matchImage: '/assets/quiz/family-mother.png',
        options: [
          { text: 'அ', correct: true },
          { text: 'ஆ', correct: false },
          { text: 'இ', correct: false },
        ]
      },
      {
        type: 'sequence',
        instruction: 'What comes next?',
        instructionTa: 'விடுபட்ட எழுத்தை நிரப்பவும்! 🧩',
        sequence: ['அ', 'ஆ', '_', 'ஈ'],
        options: [
          { text: 'இ', correct: true },
          { text: 'உ', correct: false },
          { text: 'ஒ', correct: false },
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'உயிர் எழுத்துக்கள் ஊ-ஐ (Vowels Part 2)',
    titleEn: 'Tamil Vowels (ஊ-ஐ)',
    mascot: '🦄',
    color: 'from-sky-400 to-indigo-500',
    borderColor: 'border-sky-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which word starts with the letter "உ"?',
        instructionTa: '"உ" எழுத்தில் தொடங்கும் படம் எது? 🪵',
        options: [
          { text: 'உரல்', emoji: '🪵', correct: true },
          { text: 'ஊசி', emoji: '🪡', correct: false },
          { text: 'எலி', emoji: '🐭', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'Find the odd letter out:',
        instructionTa: 'வேறுபட்ட எழுத்தைக் கண்டுபிடி! 🔍',
        options: [
          { text: 'ஊ', correct: true },
          { text: 'உ', correct: false },
          { text: 'உ', correct: false },
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the letter "உ"',
        instructionTa: '"உ" எழுத்தை பலகையில் எழுதவும்! ✏️',
        letter: 'உ',
        options: []
      },
      {
        type: 'sequence',
        instruction: 'What comes next?',
        instructionTa: 'விடுபட்ட எழுத்தை நிரப்பவும்! 🧩',
        sequence: ['உ', 'ஊ', '_', 'ஏ'],
        options: [
          { text: 'எ', correct: true },
          { text: 'ஏ', correct: false },
          { text: 'ஐ', correct: false },
        ]
      },
      {
        type: 'match',
        instruction: 'Match Father to correct starting letter',
        instructionTa: '"அப்பா" - முதல் எழுத்தைத் தொடுங்கள்! 👨',
        matchImage: '/assets/quiz/family-father.png',
        options: [
          { text: 'அ', correct: true },
          { text: 'ஆ', correct: false },
          { text: 'இ', correct: false },
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'உயிர் & ஆயுத எழுத்து (Vowels Part 3 & Special)',
    titleEn: 'Tamil Vowels & Special (ஒ-ஔ, ஃ)',
    mascot: '🎨',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which word starts with the letter "ஒ"?',
        instructionTa: '"ஒ" எழுத்தில் தொடங்கும் படம் எது? 🐫',
        options: [
          { text: 'ஒட்டகம்', emoji: '🐫', correct: true },
          { text: 'ஓடம்', emoji: '⛵', correct: false },
          { text: 'ஔவை', emoji: '👵', correct: false },
        ]
      },
      {
        type: 'sequence',
        instruction: 'What comes next?',
        instructionTa: 'விடுபட்ட எழுத்தை நிரப்பவும்! 🧩',
        sequence: ['ஒ', 'ஓ', '_', 'ஃ'],
        options: [
          { text: 'ஔ', correct: true },
          { text: 'எ', correct: false },
          { text: 'ஐ', correct: false },
        ]
      },
      {
        type: 'find',
        instruction: 'Which is the special weapon letter "ஃ"?',
        instructionTa: 'ஆயுத எழுத்து "ஃ" எது? 🛡️',
        options: [
          { text: 'ஃ', correct: true },
          { text: 'அ', correct: false },
          { text: 'இ', correct: false },
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the letter "எ"',
        instructionTa: '"எ" எழுத்தை பலகையில் எழுதவும்! ✏️',
        letter: 'எ',
        options: []
      },
      {
        type: 'match',
        instruction: 'Match grandma to correct starting letter',
        instructionTa: '"பாட்டி" - முதல் எழுத்தைத் தொடுங்கள்! 👵',
        matchImage: '/assets/quiz/family-grandma.png',
        options: [
          { text: 'பா', correct: true },
          { text: 'அ', correct: false },
          { text: 'தா', correct: false },
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'வல்லின மெய் எழுத்துக்கள் (Hard Consonants)',
    titleEn: 'Hard Consonants (க், ச், ப்...)',
    mascot: '🦁',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which is a dotted consonant?',
        instructionTa: 'புள்ளி வைத்த மெய் எழுத்து எது? ✏️',
        options: [
          { text: 'க்', correct: true },
          { text: 'அ', correct: false },
          { text: 'க', correct: false },
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the letter "க்"',
        instructionTa: '"க்" எழுத்தை பலகையில் எழுதவும்! ✏️',
        letter: 'க்',
        options: []
      },
      {
        type: 'choice',
        instruction: 'Find the odd letter out:',
        instructionTa: 'வேறுபட்ட எழுத்தைக் கண்டுபிடி! 🔍',
        options: [
          { text: 'ச்', correct: true },
          { text: 'க்', correct: false },
          { text: 'க்', correct: false },
        ]
      },
      {
        type: 'match',
        instruction: 'Find the dotted consonant inside "Akka":',
        instructionTa: '"அக்கா" - மெய் எழுத்தைத் தொடுங்கள்! 👧',
        matchImage: '/assets/quiz/family-sister.png',
        options: [
          { text: 'க்', correct: true },
          { text: 'அ', correct: false },
          { text: 'கா', correct: false },
        ]
      },
      {
        type: 'sequence',
        instruction: 'What comes next?',
        instructionTa: 'விடுபட்ட மெய் எழுத்தை நிரப்பவும்! 🧩',
        sequence: ['க்', 'ங்', '_', 'ஞ்'],
        options: [
          { text: 'ச்', correct: true },
          { text: 'ட்', correct: false },
          { text: 'த்', correct: false },
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'மெல்லின & இடையின மெய் (Soft & Medium)',
    titleEn: 'Soft & Medium Consonants',
    mascot: '🐬',
    color: 'from-blue-400 to-cyan-500',
    borderColor: 'border-blue-300',
    questions: [
      {
        type: 'trace',
        instruction: 'Trace the letter "ம்"',
        instructionTa: '"ம்" எழுத்தை பலகையில் எழுதவும்! ✏️',
        letter: 'ம்',
        options: []
      },
      {
        type: 'find',
        instruction: 'Find the dotted consonant inside "Kan":',
        instructionTa: '"கண்" - மெய் எழுத்தைத் தொடுங்கள்! 👁️',
        options: [
          { text: 'ண்', correct: true },
          { text: 'க', correct: false },
          { text: 'ண', correct: false },
        ]
      },
      {
        type: 'find',
        instruction: 'Find the dotted consonant inside "Pandhu":',
        instructionTa: '"பந்து" - மெய் எழுத்தைத் தொடுங்கள்! ⚽',
        options: [
          { text: 'ந்', correct: true },
          { text: 'ப', correct: false },
          { text: 'து', correct: false },
        ]
      },
      {
        type: 'find',
        instruction: 'What is the last consonant of the word "Tamil"?',
        instructionTa: '"தமிழ்" சொல்லின் கடைசி எழுத்து எது? 📕',
        options: [
          { text: 'ழ்', correct: true },
          { text: 'ல்', correct: false },
          { text: 'ள்', correct: false },
        ]
      },
      {
        type: 'sequence',
        instruction: 'What comes next?',
        instructionTa: 'விடுபட்ட எழுத்தை நிரப்பவும்! 🧩',
        sequence: ['ய்', 'ர்', '_', 'வ்'],
        options: [
          { text: 'ல்', correct: true },
          { text: 'ழ்', correct: false },
          { text: 'ள்', correct: false },
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'எளிய சொற்கள் & உறவுகள் (Words & Relations)',
    titleEn: 'Tamil Words & Relationships',
    mascot: '🦊',
    color: 'from-rose-400 to-red-500',
    borderColor: 'border-rose-350',
    questions: [
      {
        type: 'trace',
        instruction: 'Trace the letter "ப"',
        instructionTa: '"ப" எழுத்தை பலகையில் எழுதவும்! ✏️',
        letter: 'ப',
        options: []
      },
      {
        type: 'choice',
        instruction: 'Who is Grandpas wife?',
        instructionTa: 'தாத்தாவின் மனைவி யார்? 👵',
        options: [
          { text: 'பாட்டி', img: '/assets/quiz/family-grandma.png', correct: true },
          { text: 'அம்மா', img: '/assets/quiz/family-mother.png', correct: false },
          { text: 'அக்கா', img: '/assets/quiz/family-sister.png', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'Who is your fathers father?',
        instructionTa: 'அப்பாவின் தந்தை யார்? 👴',
        options: [
          { text: 'தாத்தா', img: '/assets/quiz/family-grandpa.png', correct: true },
          { text: 'தம்பி', img: '/assets/quiz/family-brother.png', correct: false },
          { text: 'அப்பா', img: '/assets/quiz/family-father.png', correct: false },
        ]
      },
      {
        type: 'sequence',
        instruction: 'Who is next in family relations?',
        instructionTa: 'விடுபட்ட உறவை நிரப்பவும்! 🧩',
        sequence: ['தாத்தா', 'பாட்டி', 'அப்பா', '_'],
        options: [
          { text: 'அம்மா', img: '/assets/quiz/family-mother.png', correct: true },
          { text: 'நாய்', emoji: '🐶', correct: false },
          { text: 'பூனை', emoji: '🐱', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'Which is the correct order from oldest to youngest?',
        instructionTa: 'பெரியவரில் இருந்து சிறியவர் யார்? 👴👨👦',
        options: [
          { text: 'தாத்தா ➔ அப்பா ➔ தம்பி', correct: true },
          { text: 'தம்பி ➔ அப்பா ➔ தாத்தா', correct: false },
          { text: 'அப்பா ➔ தாத்தா ➔ தம்பி', correct: false },
        ]
      }
    ]
  }
];

// ─── HELPERS ───

function FamilyMedia({ emojiOrPath, className = "w-10 h-10 object-contain" }: { emojiOrPath: string; className?: string }) {
  const images: Record<string, string> = {
    '👩': '/assets/quiz/family-mother.png',
    '👨': '/assets/quiz/family-father.png',
    '👧': '/assets/quiz/family-sister.png',
    '👦': '/assets/quiz/family-brother.png',
    '👵': '/assets/quiz/family-grandma.png',
    '👴': '/assets/quiz/family-grandpa.png',
  };
  const src = images[emojiOrPath] || (emojiOrPath.startsWith('/') ? emojiOrPath : null);
  if (src) {
    return <img src={src} className={className} alt="media" />;
  }
  return <span className={className.includes('w-') ? 'text-3xl select-none' : ''}>{emojiOrPath}</span>;
}

// ─── TRACE CANVAS (CREAM BOARD STYLE) ───

function SimpleTraceCanvas({ letter, onComplete }: { letter: string; onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.parentElement?.clientWidth || 300;
    canvas.height = 280;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(180, 83, 9, 0.06)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 5]);
      [0.33, 0.66].forEach(y => {
        ctx.beginPath();
        ctx.moveTo(10, y * canvas.height);
        ctx.lineTo(canvas.width - 10, y * canvas.height);
        ctx.stroke();
      });
      ctx.setLineDash([]);
    }
  }, [letter]);

  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    setHasDrawn(true);
    const coords = getCoordinates(e);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
    }
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const coords = getCoordinates(e);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = '#b45309'; // Cream board dark brown stroke
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
    }
  };

  const stopDrawing = () => setIsDrawing(false);

  const handleReset = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(180, 83, 9, 0.06)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 5]);
      [0.33, 0.66].forEach(y => {
        ctx.beginPath();
        ctx.moveTo(10, y * canvas.height);
        ctx.lineTo(canvas.width - 10, y * canvas.height);
        ctx.stroke();
      });
      ctx.setLineDash([]);
    }
    setHasDrawn(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Cream Slate Board */}
      <div className="relative w-full h-[280px] rounded-[2rem] border-4 border-[#b45309] shadow-inner bg-[#fffdf9] overflow-hidden touch-none">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 cursor-crosshair touch-none w-full h-full"
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
        />
      </div>
      <div className="flex gap-4 w-full max-w-xs justify-center font-sans">
        <button
          onClick={handleReset}
          className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow active:scale-95 transition-all text-sm"
        >
          மீண்டும் 🔄
        </button>
        <button
          onClick={onComplete}
          disabled={!hasDrawn}
          className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow active:scale-95 transition-all text-sm disabled:opacity-40"
        >
          முடிந்தது! ✅
        </button>
      </div>
    </div>
  );
}

// ─── MAIN PORTAL ARENA ───

export default function QuizArena() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const { subjects, studentProfile } = useData();
  const [mounted, setMounted] = useState(false);
  
  // Views: 'dashboard' | 'levels' | 'quiz_player' | 'score_card'
  const [view, setView] = useState<'dashboard' | 'levels' | 'quiz_player' | 'score_card'>('dashboard');
  
  // Overlays (For other subjects)
  const [activeQuiz, setActiveQuiz] = useState<any | null>(null);
  const [activeGame, setActiveGame] = useState<string | null>(null);

  // Tamil Quiz Levels state
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1]); // Levels 1 unlocked initially
  const [levelScores, setLevelScores] = useState<Record<number, number>>({});
  
  // Quiz Player state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [selectedOptionText, setSelectedOptionText] = useState<string | null>(null);

  // Load state from localStorage based on Student Profile
  useEffect(() => {
    setMounted(true);
    const profileId = studentProfile?.id || 'guest';
    
    // Load unlocked levels
    const storedUnlocked = localStorage.getItem(`lkg_tamil_quiz_unlocked_${profileId}`);
    if (storedUnlocked) {
      try {
        setUnlockedLevels(JSON.parse(storedUnlocked));
      } catch (e) {
        console.error(e);
      }
    } else {
      setUnlockedLevels([1]);
    }

    // Load levels best scores
    const scoresMap: Record<number, number> = {};
    TAMIL_LEVELS.forEach(lvl => {
      const storedScore = localStorage.getItem(`lkg_tamil_quiz_score_${profileId}_level_${lvl.id}`);
      if (storedScore !== null) {
        scoresMap[lvl.id] = parseInt(storedScore, 10);
      }
    });
    setLevelScores(scoresMap);
  }, [studentProfile]);

  useEffect(() => {
    if (activeQuiz || activeGame || view !== 'dashboard') {
      document.body.classList.add('no-bottom-nav');
    } else {
      document.body.classList.remove('no-bottom-nav');
    }

    if (activeQuiz || activeGame) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.classList.remove('no-bottom-nav');
      document.body.style.overflow = 'auto';
    };
  }, [activeQuiz, activeGame, view]);

  // Auto scroll to top on view transitions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [view, activeLevel, currentQuestionIndex]);

  const allLessonsFlat = subjects.flatMap(s => s.chapters.flatMap(c => c.lessons));

  // Process categories from API, ensuring custom attributes for Tamil
  const categoriesFromAPI = subjects.map((s, idx) => {
    const isTamilQuiz = s.name.toLowerCase().includes('tamil') || s.name === 'Tamil';
    return {
      id: s.id,
      title: s.name,
      icon: null,
      color: isTamilQuiz ? 'bg-emerald-100 text-emerald-600' : ['bg-rose-100 text-rose-500', 'bg-blue-100 text-blue-500', 'bg-emerald-100 text-emerald-500', 'bg-amber-100 text-amber-500'][idx % 4],
      border: isTamilQuiz ? 'border-emerald-300' : ['border-rose-200', 'border-blue-200', 'border-emerald-200', 'border-amber-200'][idx % 4],
      progress: s.chapters.length > 0 ? Math.round(s.chapters.filter(c => c.completion_percentage >= 100).length / s.chapters.length * 100) : 0,
      lessons: s.chapters.flatMap(c => c.lessons).length,
      isTamilQuiz: isTamilQuiz
    };
  });

  // Fallback: If Tamil is not in the subjects list, append it manually so it is always present
  const hasTamil = categoriesFromAPI.some(c => c.isTamilQuiz);
  const displayedCategories = [...categoriesFromAPI];
  if (!hasTamil && mounted) {
    displayedCategories.push({
      id: 'tamil_custom',
      title: 'Tamil',
      icon: null,
      color: 'bg-emerald-100 text-emerald-600',
      border: 'border-emerald-300',
      progress: 0,
      lessons: 4,
      isTamilQuiz: true
    });
  }

  const startDailyThree = () => {
    const randomLesson = allLessonsFlat[Math.floor(Math.random() * allLessonsFlat.length)];
    if (randomLesson) {
      setActiveQuiz({
        id: randomLesson.id,
        title: randomLesson.title,
        emoji: '📚',
        color: 'bg-sky-100',
        text: 'text-sky-600',
        border: 'border-sky-300',
        status: randomLesson.progress?.status || 'not-started',
        quiz: { question: `Let's learn ${randomLesson.title}!`, options: [
          { n: 'A', e: '🌟' }, { n: 'B', e: '🚀' }, { n: 'C', e: '💫' }
        ], correct: 'A' }
      });
    }
  };

  const handleLevelSelect = (level: Level) => {
    if (!unlockedLevels.includes(level.id)) {
      return;
    }
    setActiveLevel(level);
    setCurrentQuestionIndex(0);
    setScores([]);
    setSelectedOptionText(null);
    setView('quiz_player');
  };

  const handleAnswer = (option: Option) => {
    if (selectedOptionText !== null) return; // Prevent double taps

    const isCorrect = option.correct;
    setSelectedOptionText(option.text);
    setScores(prev => [...prev, isCorrect ? 1 : 0]);
    
    // Smooth next transition without red cross or stress animations
    setTimeout(() => {
      setSelectedOptionText(null);
      if (activeLevel && currentQuestionIndex < activeLevel.questions.length - 1) {
        setCurrentQuestionIndex(idx => idx + 1);
      } else {
        setView('score_card');
        
        // Final Score calculation
        const finalScore = scores.reduce((a, b) => a + b, 0) + (isCorrect ? 1 : 0);
        
        const profileId = studentProfile?.id || 'guest';
        if (activeLevel) {
          // Save score if it's the highest
          const currentBest = levelScores[activeLevel.id] || 0;
          if (finalScore > currentBest) {
            localStorage.setItem(`lkg_tamil_quiz_score_${profileId}_level_${activeLevel.id}`, finalScore.toString());
            setLevelScores(prev => ({
              ...prev,
              [activeLevel.id]: finalScore
            }));
          }

          // Unlock next level only on perfect score (5 out of 5)
          if (finalScore === 5) {
            const nextId = activeLevel.id + 1;
            if (nextId <= TAMIL_LEVELS.length && !unlockedLevels.includes(nextId)) {
              const newUnlocked = [...unlockedLevels, nextId];
              setUnlockedLevels(newUnlocked);
              localStorage.setItem(`lkg_tamil_quiz_unlocked_${profileId}`, JSON.stringify(newUnlocked));
            }
          }
        }
      }
    }, 500);
  };

  return (
    <div className="relative overflow-hidden min-h-screen pb-12 kids-font selection:bg-teal-350">
      {/* Injecting Rounded Kid-friendly Fonts */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font {
          font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
        }
      `}} />

      {/* Dynamic Background atmosphere */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-300 via-sky-400 to-emerald-300" />
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/30 blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        
        <AnimatePresence mode="wait">

          {/* 1. MAIN DASHBOARD VIEW */}
          {view === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full"
            >
              {/* Hero Quest Banner */}
              <div className="py-10 mb-8 w-full border-b-8 border-white/10">
                 <div className="relative w-full flex items-center">
                    <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-white/30 to-transparent skew-x-[-20deg] transform translate-x-32" />
                    
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-6">
                       <div className="text-center md:text-left flex-1 space-y-6">
                          <div className="inline-flex items-center gap-2 px-6 py-2 bg-amber-400 text-indigo-950 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-xl">
                             <Trophy size={16} fill="currentColor" /> Daily Quest
                          </div>
                          <h1 className="text-4xl sm:text-7xl font-black text-indigo-950 tracking-tighter leading-tight font-sans">
                             The <span className="text-indigo-800 italic font-medium font-sans">Daily 3</span> <br/>
                             Quest Arena
                          </h1>
                          <p className="text-indigo-900/60 font-bold text-lg">Win 3 questions today to earn a Magical Star! 🌟🌸</p>
                          
                          <div className="flex justify-center md:justify-start w-full font-sans">
                            <button 
                              onClick={startDailyThree}
                              className="bg-indigo-600 text-white px-10 py-5 rounded-[2rem] font-black text-lg shadow-2xl hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-3 group/btn"
                            >
                               ENTER ARENA <Play className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                          </div>
                       </div>

                       <div className="relative w-64 h-64 sm:w-80 sm:h-80 select-none">
                          <div className="absolute inset-0 bg-indigo-600/10 blur-[60px] rounded-full animate-pulse" />
                          <img 
                            src="/assets/avatars/owl-removebg-preview.png" 
                            className="w-full h-full object-contain animate-[float_4s_ease-in-out_infinite]" 
                            alt="Arena Master" 
                          />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 font-sans">
                 {[
                   { label: 'Weekly Streak', val: '5 Days', icon: Calendar, color: 'text-rose-600', glow: 'bg-rose-400' },
                   { label: 'Quiz Won', val: '43', icon: Trophy, color: 'text-amber-600', glow: 'bg-amber-400' },
                   { label: 'Arena Level', val: 'Level 4', icon: Target, color: 'text-blue-600', glow: 'bg-blue-400' },
                   { label: 'Global Rank', val: '#12', icon: Award, color: 'text-purple-600', glow: 'bg-purple-400' },
                 ].map((stat, i) => (
                   <div key={i} className="bg-white/40 backdrop-blur-3xl rounded-[2.5rem] p-6 sm:p-8 text-center border-2 border-white/60 shadow-2xl relative overflow-hidden group active:scale-95 transition-all">
                      <div className={`absolute -top-10 -right-10 w-24 h-24 ${stat.glow} opacity-10 blur-3xl rounded-full`} />
                      <stat.icon className={`${stat.color} mb-3 mx-auto`} size={28} />
                      <span className="text-xl sm:text-2xl font-black text-indigo-950 block mb-0.5 leading-tight">{stat.val}</span>
                      <span className="text-[10px] sm:text-[11px] font-black text-indigo-950/40 uppercase tracking-widest">{stat.label}</span>
                   </div>
                 ))}
              </div>

              {/* Practice Clouds (Subjects List) */}
              <div className="mb-16">
                 <div className="flex items-center gap-4 mb-10 px-2">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                       <Cloud className="text-white" size={20} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-indigo-950 leading-none">Practice Clouds</h2>
                      <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest mt-1">Jump into a subject</p>
                    </div>
                 </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                     {displayedCategories.map((zone, idx) => {
                       const isTamilCloud = zone.isTamilQuiz;
                       return (
                         <button
                           key={zone.id}
                           onClick={() => {
                             if (isTamilCloud) {
                               setView('levels');
                             } else {
                               const zoneLessons = allLessonsFlat.filter(l => zone.id === subjects[idx]?.id);
                               if (zoneLessons.length > 0) {
                                 setActiveQuiz({
                                   id: zoneLessons[0].id,
                                   title: zoneLessons[0].title,
                                   emoji: '📚',
                                   color: 'bg-sky-100',
                                   text: 'text-sky-600',
                                   border: 'border-sky-300',
                                   status: 'not-started',
                                   quiz: { question: `Let's learn ${zoneLessons[0].title}!`, options: [
                                     { n: 'A', e: '🌟' }, { n: 'B', e: '🚀' }, { n: 'C', e: '💫' }
                                   ], correct: 'A' }
                                 });
                               }
                             }
                           }}
                           className="group relative"
                         >
                           <div className={`absolute inset-0 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-indigo-400`} />
                           
                           <div className={`relative backdrop-blur-3xl rounded-[3.5rem] p-2 border-2 transition-all duration-700 group-hover:-translate-y-6 will-change-transform bg-white/20 border-white/40 shadow-xl`}>
                             <div className="min-h-[280px] flex flex-col items-center justify-center p-8 relative overflow-hidden text-center">
                                <div className="w-24 h-24 flex items-center justify-center mb-6 drop-shadow-[0_20px_20px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-transform duration-700">
                                   {isTamilCloud ? (
                                     <span className="text-6xl select-none animate-[bounce_2s_infinite]">🐯</span>
                                   ) : (
                                     <img 
                                        src={`/assets/portals/${['alphabet', 'numbers', 'colors', 'animals'][idx % 4]}-removebg-preview.png`}
                                        className="w-full h-full object-contain"
                                        alt={zone.title}
                                     />
                                   )}
                                </div>
                                <h3 className="text-xl font-black text-indigo-950 uppercase tracking-tight leading-none mb-1 font-sans">{zone.title}</h3>
                                {isTamilCloud && (
                                  <p className="text-[11px] font-black text-emerald-800/80 uppercase tracking-widest mb-6 font-sans">
                                    Fun Activities
                                  </p>
                                )}
                                {!isTamilCloud && <div className="h-6" />}
                                <div className="px-8 py-3 bg-indigo-600 rounded-2xl text-[10px] font-black text-white shadow-xl hover:bg-indigo-700 transition-colors uppercase tracking-widest font-sans">
                                   JUMP IN!
                                </div>
                             </div>
                           </div>
                         </button>
                        );
                      })}
                  </div>
              </div>

              {/* Fun Activities Section */}
              <div className="mt-12 mb-20">
                 <div className="flex items-center gap-4 mb-10 px-2">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                       <Gamepad2 className="text-white" size={20} />
                    </div>
                    <div>
                       <h2 className="text-2xl font-black text-indigo-950 uppercase leading-none">Fun Activities</h2>
                       <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest mt-1">Play and master together</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {[
                      { id: 'sound', title: 'Sound Match', emoji: '🔊', color: 'bg-blue-500' },
                      { id: 'truefalse', title: 'True or False', emoji: '🤪', color: 'bg-emerald-500' },
                      { id: 'sequence', title: 'Sequence', emoji: '🧩', color: 'bg-purple-500' },
                      { id: 'memory', title: 'Memory', emoji: '🧠', color: 'bg-rose-500' },
                    ].map((game) => (
                      <motion.button key={game.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveGame(game.id)}
                        className="bg-white/40 backdrop-blur-3xl rounded-[3rem] p-8 text-left border-2 border-white/60 shadow-2xl flex items-center gap-8 transition-all group hover:bg-white/60 w-full"
                      >
                         <div className={`w-20 h-20 rounded-[1.8rem] ${game.color} flex items-center justify-center text-4xl shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                           {game.emoji}
                         </div>
                         <div>
                           <h3 className="text-2xl font-black text-indigo-950 tracking-tight leading-none mb-2 font-sans">{game.title}</h3>
                           <span className="text-xs font-black text-indigo-900/40 uppercase tracking-[0.2em] font-sans">Start Training</span>
                         </div>
                         <ChevronRight className="ml-auto text-indigo-900/20 group-hover:text-indigo-900 group-hover:translate-x-2 transition-all" size={32} />
                      </motion.button>
                    ))}
                 </div>
              </div>

            </motion.div>
          )}

          {/* 2. TAMIL LEVELS SELECTION (NEAT KID-FRIENDLY ROADMAP) */}
          {view === 'levels' && (
            <motion.div
              key="levels"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="w-full flex flex-col gap-6 max-w-2xl mx-auto pt-6 px-4 pb-20 min-h-screen relative"
            >
              {/* Back navigation & Game Status Bar */}
              <div className="sticky top-4 z-50 flex items-center justify-between gap-4 bg-white/90 backdrop-blur-xl px-5 py-3 rounded-full border-2 border-indigo-150 shadow-[0_10px_30px_rgba(79,70,229,0.12)] w-full">
                {/* Back button */}
                <button
                  onClick={() => setView('dashboard')}
                  className="w-12 h-12 shrink-0 bg-gradient-to-r from-amber-400 to-orange-500 border-2 border-white text-indigo-950 rounded-full flex items-center justify-center shadow-lg hover:brightness-105 active:scale-90 transition-all"
                  title="முகப்பு"
                >
                  <ArrowLeft size={22} strokeWidth={3.5} className="text-indigo-950" />
                </button>

                {/* Center Title */}
                <div className="flex-1 text-center">
                  <h2 className="text-base sm:text-lg font-black text-indigo-950 leading-tight">
                    தமிழ் வினாடி-வினா
                  </h2>
                  <span className="text-[9px] font-bold text-indigo-900/40 uppercase tracking-widest block leading-none mt-0.5 font-sans">
                    Tamil Quiz Arena
                  </span>
                </div>

                {/* Right Stars counter */}
                <div className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-50 border border-amber-200 rounded-full shadow-inner select-none shrink-0">
                  <span className="text-base animate-pulse">⭐</span>
                  <span className="text-xs font-black text-amber-800 font-sans leading-none pt-0.5">
                    {Object.values(levelScores).reduce((a, b) => a + b, 0)} / 30
                  </span>
                </div>
              </div>

              {/* Grid / Staggered road of cards */}
              <div className="flex flex-col gap-5 relative z-10">
                {TAMIL_LEVELS.map((level, index) => {
                  const unlocked = unlockedLevels.includes(level.id);
                  const bestScore = levelScores[level.id] || 0;
                  const isCompleted = levelScores[level.id] !== undefined;

                  return (
                    <motion.div
                      key={level.id}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-full"
                    >
                      <button
                        onClick={() => unlocked && handleLevelSelect(level)}
                        disabled={!unlocked}
                        className={`w-full text-left relative overflow-hidden rounded-[2.5rem] border-4 p-5 sm:p-6 shadow-xl transition-all duration-350 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6
                          ${unlocked
                            ? 'bg-white border-indigo-100 hover:border-indigo-300 hover:shadow-2xl active:scale-[0.99] cursor-pointer'
                            : 'bg-white/60 border-slate-200 opacity-80 cursor-not-allowed'
                          }`}
                      >
                        {/* Left Side: Level Badge and Mascot */}
                        <div className="flex items-center gap-4">
                          {/* Colorful Mascot Container */}
                          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center border-4 border-white shadow-lg text-4xl select-none shrink-0 bg-gradient-to-br ${unlocked ? level.color : 'from-slate-200 to-slate-350'}`}>
                            {unlocked ? level.mascot : '🔒'}
                          </div>

                          {/* Titles */}
                          <div className="space-y-1">
                            <span className="inline-block px-3 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-black text-indigo-800 uppercase tracking-wider font-sans">
                              நிலை {level.id}
                            </span>
                            <h3 className={`text-lg sm:text-xl font-black leading-tight tracking-tight ${unlocked ? 'text-indigo-950' : 'text-slate-500'}`}>
                              {level.title.split('(')[0].trim()}
                            </h3>
                            <p className="text-xs font-bold text-slate-400 font-sans">
                              {level.titleEn}
                            </p>
                          </div>
                        </div>

                        {/* Right Side: Score Status or Locked Info */}
                        <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-dashed border-slate-100 w-full sm:w-auto">
                          {unlocked ? (
                            <div className="flex flex-col items-end gap-1.5 sm:w-auto">
                              {/* 5-Star Visual Score */}
                              {isCompleted ? (
                                <div className="flex flex-col items-end gap-1">
                                  <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((starIdx) => (
                                      <Star
                                        key={starIdx}
                                        size={14}
                                        className={starIdx <= bestScore ? 'text-amber-500 fill-amber-500' : 'text-slate-200'}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full font-sans">
                                    Best: {bestScore}/5
                                  </span>
                                </div>
                              ) : (
                                <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full font-sans animate-pulse">
                                  விளையாடு 🎮
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-slate-400 font-sans text-xs font-black bg-slate-100 px-3 py-1 rounded-full">
                              பூட்டப்பட்டது
                            </div>
                          )}

                          {/* Play / Lock Arrow Button */}
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow transition-colors shrink-0
                            ${unlocked 
                              ? 'bg-indigo-600 text-white group-hover:bg-indigo-700' 
                              : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            {unlocked ? <Play size={16} fill="currentColor" /> : <Lock size={16} />}
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* 3. ACTIVE QUIZ PLAYER VIEW */}
          {view === 'quiz_player' && activeLevel && (
            <motion.div
              key="player"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col gap-6 max-w-xl mx-auto pt-4"
            >
              {/* Quiz Header Info */}
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => setView('levels')}
                  className="w-10 h-10 shrink-0 bg-white/90 border-2 border-indigo-100 text-slate-700 rounded-xl flex items-center justify-center shadow-md hover:bg-white active:scale-95 transition-all"
                  title="வெளியேறு"
                >
                  <X size={18} strokeWidth={3.5} className="text-slate-800" />
                </button>
                <span className="text-xs font-black text-indigo-950 uppercase tracking-widest truncate flex-1">
                  {activeLevel.title}
                </span>
                <span className="px-3 py-1 bg-amber-400 text-indigo-950 rounded-full font-black text-xs font-sans shrink-0">
                  {currentQuestionIndex + 1} / {activeLevel.questions.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-450 to-teal-555 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex) / activeLevel.questions.length) * 100}%` }}
                />
              </div>

              {/* Current Question Frame */}
              {(() => {
                const question = activeLevel.questions[currentQuestionIndex];
                return (
                  <div className="w-full bg-[#fffdf9] border-4 border-[#b45309] rounded-[3rem] p-6 sm:p-8 shadow-xl flex flex-col items-center gap-6 relative">
                    
                    {/* Header instruction */}
                    <div className="text-center space-y-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-black text-emerald-800 tracking-wider uppercase font-sans">
                        {question.type === 'trace' ? 'வரைதல் பயிற்சி'
                         : question.type === 'sequence' ? 'விடுபட்ட பகுதி'
                         : question.type === 'find' ? 'அடையாளம் காணல்'
                         : question.type === 'match' ? 'பொருத்துதல்'
                         : 'சரியான விடை'}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight pt-1 leading-snug">
                        {question.instructionTa}
                      </h2>
                    </div>

                    {/* 1. Tracing Canvas */}
                    {question.type === 'trace' && question.letter && (
                      <SimpleTraceCanvas
                        letter={question.letter}
                        onComplete={() => handleAnswer({ text: 'trace', correct: true })}
                      />
                    )}

                    {/* 2. Missing Sequence */}
                    {question.type === 'sequence' && question.sequence && (
                      <div className="flex flex-col items-center gap-6 w-full">
                        {/* Horizontal Flow for Sequence */}
                        <div className="flex flex-wrap gap-2.5 sm:gap-4 justify-center items-center w-full">
                          {question.sequence.map((item, idx) => {
                            const isPlaceholder = item === '_';
                            return (
                              <div 
                                key={idx} 
                                className={`px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-3xl flex items-center justify-center font-black text-sm sm:text-lg shadow-sm border-2 transition-all
                                  ${isPlaceholder 
                                    ? 'bg-amber-50 text-amber-600 animate-pulse border-dashed border-amber-400 min-w-[70px] sm:min-w-[90px]' 
                                    : 'bg-white border-slate-150 text-slate-800'
                                  }`}
                              >
                                {isPlaceholder ? '?' : item}
                              </div>
                            );
                          })}
                        </div>

                        {/* Options Selection Grid */}
                        <div className="grid grid-cols-3 gap-3 w-full max-w-md justify-center mt-2">
                          {question.options.map((opt, i) => {
                            const isSelected = selectedOptionText === opt.text;
                            return (
                              <button
                                key={i}
                                onClick={() => handleAnswer(opt)}
                                disabled={selectedOptionText !== null}
                                className={`flex flex-col items-center gap-2 py-3.5 px-2.5 rounded-3xl border-2 shadow transition-all active:scale-95
                                  ${isSelected 
                                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                                    : 'bg-white border-slate-150 text-slate-800 hover:bg-emerald-50'}`}
                              >
                                {opt.img ? (
                                  <FamilyMedia emojiOrPath={opt.img} className="w-10 h-10 sm:w-14 sm:h-14 object-contain" />
                                ) : opt.emoji ? (
                                  <span className="text-3xl sm:text-4xl">{opt.emoji}</span>
                                ) : (
                                  <span className="text-2xl">🧩</span>
                                )}
                                <span className={`text-xs font-black mt-1 ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                                  {opt.text}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 3. Find and Mark */}
                    {question.type === 'find' && (
                      <div className="grid grid-cols-2 gap-3 w-full max-w-sm justify-center">
                        {question.options.map((opt, i) => {
                          const isSelected = selectedOptionText === opt.text;
                          return (
                            <button
                              key={i}
                              onClick={() => handleAnswer(opt)}
                              disabled={selectedOptionText !== null}
                              className={`py-4 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] text-xl sm:text-2xl font-black shadow border-2 transition-all active:scale-95
                                ${isSelected 
                                  ? 'bg-emerald-500 border-emerald-500 text-white' 
                                  : 'bg-white border-slate-150 text-slate-800 hover:bg-emerald-50'}`}
                            >
                              {opt.text}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* 4. Match Image */}
                    {question.type === 'match' && question.matchImage && (
                      <div className="flex flex-col items-center gap-6 w-full">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-3xl flex items-center justify-center shadow-md border border-slate-100">
                          <FamilyMedia emojiOrPath={question.matchImage} className="w-16 h-16 sm:w-24 sm:h-24 object-contain" />
                        </div>

                        <div className="grid grid-cols-3 gap-2.5 w-full max-w-xs justify-center">
                          {question.options.map((opt, i) => {
                            const isSelected = selectedOptionText === opt.text;
                            return (
                              <button
                                key={i}
                                onClick={() => handleAnswer(opt)}
                                disabled={selectedOptionText !== null}
                                className={`py-3 sm:py-4 rounded-2xl text-lg sm:text-xl font-black shadow border-2 transition-all active:scale-95
                                  ${isSelected 
                                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                                    : 'bg-white border-slate-150 text-slate-800 hover:bg-emerald-50'}`}
                              >
                                {opt.text}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 5. Choice Game */}
                    {question.type === 'choice' && (
                      <div className="grid grid-cols-3 gap-2 w-full max-w-md justify-center">
                        {question.options.map((opt, i) => {
                          const isSelected = selectedOptionText === opt.text;
                          return (
                            <button
                              key={i}
                              onClick={() => handleAnswer(opt)}
                              disabled={selectedOptionText !== null}
                              className={`flex flex-col items-center gap-2 py-3 sm:py-4 px-2 rounded-2xl border-2 shadow transition-all active:scale-95
                                ${isSelected 
                                  ? 'bg-emerald-500 border-emerald-500 text-white' 
                                  : 'bg-white border-slate-100 hover:bg-emerald-50 text-slate-800'}`}
                            >
                              {opt.img ? (
                                <FamilyMedia emojiOrPath={opt.img} className="w-10 h-10 sm:w-14 sm:h-14 object-contain" />
                              ) : (
                                <span className="text-3xl sm:text-5xl">{opt.emoji}</span>
                              )}
                              <span className={`text-[10px] sm:text-xs font-black mt-1 ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                                {opt.text}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* 4. SCORE CARD VIEW */}
          {view === 'score_card' && activeLevel && (
            <motion.div
              key="score"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md mx-auto bg-[#fffdf9] border-4 border-[#b45309] rounded-[3rem] p-8 text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-pink-100/50 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-emerald-100/50 rounded-full blur-[60px] pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center gap-6">
                
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-7xl sm:text-8xl drop-shadow"
                >
                  🏆
                </motion.div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                    சவால் முடிந்தது!
                  </h2>
                  <p className="text-sm font-bold text-slate-500 mt-2">
                    அருமையாக விளையாடினீர்கள்! 🎊
                  </p>
                </div>

                <div className="flex gap-2 justify-center py-2">
                  {[1, 2, 3, 4, 5].map((star, idx) => {
                    const earned = scores.filter(Boolean).length >= star;
                    return (
                      <Star
                        key={idx}
                        size={28}
                        className={earned ? 'text-amber-500 fill-amber-500 animate-bounce' : 'text-slate-200'}
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      />
                    );
                  })}
                </div>

                <div className="px-6 py-2 bg-emerald-50 border border-emerald-100 rounded-xl font-sans">
                  <span className="text-xl font-black text-emerald-800">
                    {scores.filter(Boolean).length} / {activeLevel.questions.length} சரி
                  </span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView('levels')}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg border-b-4 border-teal-750 active:scale-95"
                >
                  நிலைகளுக்குத் திரும்பு ➡️
                </motion.button>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>

      {/* OVERLAY WRAPPERS FOR OTHER SUBJECTS */}
      <AnimatePresence>
        {activeQuiz && (
          <div className="fixed inset-0 z-[200] bg-white overflow-y-auto magic-scroll font-sans">
            <QuizEngine lesson={activeQuiz} onClose={() => setActiveQuiz(null)} onComplete={() => {}} />
          </div>
        )}
        {activeGame && (
          <div className="fixed inset-0 z-[200] bg-sky-400 overflow-y-auto magic-scroll font-sans">
            <div className="relative min-h-screen">
              {activeGame === 'sound' && <SoundMatchGame onBack={() => setActiveGame(null)} />}
              {activeGame === 'truefalse' && <TrueOrFalseGame onBack={() => setActiveGame(null)} />}
              {activeGame === 'sequence' && <SequenceGame onBack={() => setActiveGame(null)} />}
              {activeGame === 'memory' && <MemoryMatchGame onBack={() => setActiveGame(null)} />}
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
