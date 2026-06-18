'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreMathItem {
  id: string;
  emoji: string;
  label: string;
  tamilLabel: string;
  sizeClass?: string;
}

interface PreMathConcept {
  id: string;
  title: string;
  tamilTitle: string;
  showcases: {
    left: PreMathItem;
    right: PreMathItem;
    type: 'scale' | 'height' | 'quantity' | 'weight' | 'same-diff';
  }[];
  quizzes: {
    question: string;
    tamilQuestion: string;
    options: (PreMathItem & { correct: boolean })[];
  }[];
  matching: {
    items: { id: string; emoji: string }[];
    targets: { id: string; label: string; tamilLabel: string }[];
    pairs: Record<string, string>; // maps item.id -> target.id
  };
}

const CONCEPTS: Record<string, PreMathConcept> = {
  'big-small': {
    id: 'big-small',
    title: 'Big & Small',
    tamilTitle: 'பெரியது & சிறியது',
    showcases: [
      {
        left: { id: 'elephant', emoji: '🐘', label: 'Big', tamilLabel: 'பெரியது' },
        right: { id: 'mouse', emoji: '🐭', label: 'Small', tamilLabel: 'சிறியது' },
        type: 'scale',
      },
      {
        left: { id: 'house_big', emoji: '🏠', label: 'Big', tamilLabel: 'பெரியது' },
        right: { id: 'house_small', emoji: '🏡', label: 'Small', tamilLabel: 'சிறியது' },
        type: 'scale',
      },
      {
        left: { id: 'ball_big', emoji: '⚽', label: 'Big', tamilLabel: 'பெரியது' },
        right: { id: 'ball_small', emoji: '🎾', label: 'Small', tamilLabel: 'சிறியது' },
        type: 'scale',
      },
    ],
    quizzes: [
      {
        question: 'Which is the BIG animal?',
        tamilQuestion: 'பெரிய விலங்கு எது?',
        options: [
          { id: 'elephant', emoji: '🐘', label: 'Elephant', tamilLabel: 'யானை', correct: true },
          { id: 'mouse', emoji: '🐭', label: 'Mouse', tamilLabel: 'எலி', correct: false },
        ],
      },
      {
        question: 'Which is the SMALL house?',
        tamilQuestion: 'சின்ன வீடு எது?',
        options: [
          { id: 'house_big', emoji: '🏠', label: 'Big House', tamilLabel: 'பெரிய வீடு', correct: false },
          { id: 'house_small', emoji: '🏡', label: 'Small House', tamilLabel: 'சின்ன வீடு', correct: true },
        ],
      },
      {
        question: 'Which is the SMALL ball?',
        tamilQuestion: 'சின்ன பந்து எது?',
        options: [
          { id: 'ball_big', emoji: '⚽', label: 'Big Ball', tamilLabel: 'பெரிய பந்து', correct: false },
          { id: 'ball_small', emoji: '🎾', label: 'Small Ball', tamilLabel: 'சின்ன பந்து', correct: true },
        ],
      },
    ],
    matching: {
      items: [
        { id: 'elephant', emoji: '🐘' },
        { id: 'mouse', emoji: '🐭' },
      ],
      targets: [
        { id: 'big', label: 'Big', tamilLabel: 'பெரியது' },
        { id: 'small', label: 'Small', tamilLabel: 'சிறியது' },
      ],
      pairs: {
        elephant: 'big',
        mouse: 'small',
      },
    },
  },
  'tall-short': {
    id: 'tall-short',
    title: 'Tall & Short',
    tamilTitle: 'உயரம் & குட்டை',
    showcases: [
      {
        left: { id: 'giraffe', emoji: '🦒', label: 'Tall', tamilLabel: 'உயரமானது' },
        right: { id: 'rabbit', emoji: '🐇', label: 'Short', tamilLabel: 'குட்டையானது' },
        type: 'height',
      },
      {
        left: { id: 'tree', emoji: '🌴', label: 'Tall', tamilLabel: 'உயரமானது' },
        right: { id: 'flower', emoji: '🌷', label: 'Short', tamilLabel: 'குட்டையானது' },
        type: 'height',
      },
      {
        left: { id: 'ladder', emoji: '🪜', label: 'Tall', tamilLabel: 'உயரமானது' },
        right: { id: 'chair', emoji: '🪑', label: 'Short', tamilLabel: 'குட்டையானது' },
        type: 'height',
      },
    ],
    quizzes: [
      {
        question: 'Which is TALL?',
        tamilQuestion: 'உயரமானது எது?',
        options: [
          { id: 'giraffe', emoji: '🦒', label: 'Giraffe', tamilLabel: 'ஒட்டகச்சிவிங்கி', correct: true },
          { id: 'rabbit', emoji: '🐇', label: 'Rabbit', tamilLabel: 'முயல்', correct: false },
        ],
      },
      {
        question: 'Which is SHORT?',
        tamilQuestion: 'குட்டையானது எது?',
        options: [
          { id: 'tree', emoji: '🌴', label: 'Tree', tamilLabel: 'தென்னை மரம்', correct: false },
          { id: 'flower', emoji: '🌷', label: 'Flower', tamilLabel: 'பூச்செடி', correct: true },
        ],
      },
      {
        question: 'Which is TALL?',
        tamilQuestion: 'உயரமானது எது?',
        options: [
          { id: 'ladder', emoji: '🪜', label: 'Ladder', tamilLabel: 'ஏணி', correct: true },
          { id: 'chair', emoji: '🪑', label: 'Chair', tamilLabel: 'நாற்காலி', correct: false },
        ],
      },
    ],
    matching: {
      items: [
        { id: 'giraffe', emoji: '🦒' },
        { id: 'rabbit', emoji: '🐇' },
      ],
      targets: [
        { id: 'tall', label: 'Tall', tamilLabel: 'உயரமானது' },
        { id: 'short', label: 'Short', tamilLabel: 'குட்டையானது' },
      ],
      pairs: {
        giraffe: 'tall',
        rabbit: 'short',
      },
    },
  },
  'more-less': {
    id: 'more-less',
    title: 'More & Less',
    tamilTitle: 'அதிகம் & குறைவு',
    showcases: [
      {
        left: { id: 'cookies_more', emoji: '🍪🍪🍪🍪', label: 'More', tamilLabel: 'அதிகம்' },
        right: { id: 'cookies_less', emoji: '🍪', label: 'Less', tamilLabel: 'குறைவு' },
        type: 'quantity',
      },
      {
        left: { id: 'fish_more', emoji: '🐟🐟🐟', label: 'More', tamilLabel: 'அதிகம்' },
        right: { id: 'fish_less', emoji: '🐟', label: 'Less', tamilLabel: 'குறைவு' },
        type: 'quantity',
      },
      {
        left: { id: 'balloons_more', emoji: '🎈🎈🎈🎈🎈', label: 'More', tamilLabel: 'அதிகம்' },
        right: { id: 'balloons_less', emoji: '🎈', label: 'Less', tamilLabel: 'குறைவு' },
        type: 'quantity',
      },
    ],
    quizzes: [
      {
        question: 'Which has MORE cookies?',
        tamilQuestion: 'அதிக குக்கீஸ் உள்ள தட்டு எது?',
        options: [
          { id: 'more', emoji: '🍪🍪🍪🍪', label: 'More', tamilLabel: 'அதிகம்', correct: true },
          { id: 'less', emoji: '🍪', label: 'Less', tamilLabel: 'குறைவு', correct: false },
        ],
      },
      {
        question: 'Which has LESS fish?',
        tamilQuestion: 'குறைந்த மீன்கள் உள்ள தொட்டி எது?',
        options: [
          { id: 'more', emoji: '🐟🐟🐟', label: 'More', tamilLabel: 'அதிகம்', correct: false },
          { id: 'less', emoji: '🐟', label: 'Less', tamilLabel: 'குறைவு', correct: true },
        ],
      },
      {
        question: 'Which has MORE balloons?',
        tamilQuestion: 'அதிக பலூன் உள்ள கை எது?',
        options: [
          { id: 'more', emoji: '🎈🎈🎈🎈🎈', label: 'More', tamilLabel: 'அதிகம்', correct: true },
          { id: 'less', emoji: '🎈', label: 'Less', tamilLabel: 'குறைவு', correct: false },
        ],
      },
    ],
    matching: {
      items: [
        { id: 'cookies_more', emoji: '🍪🍪🍪' },
        { id: 'cookies_less', emoji: '🍪' },
      ],
      targets: [
        { id: 'more', label: 'More', tamilLabel: 'அதிகம்' },
        { id: 'less', label: 'Less', tamilLabel: 'குறைவு' },
      ],
      pairs: {
        cookies_more: 'more',
        cookies_less: 'less',
      },
    },
  },
  'heavy-light': {
    id: 'heavy-light',
    title: 'Heavy & Light',
    tamilTitle: 'கனம் & லேசு',
    showcases: [
      {
        left: { id: 'rock', emoji: '🪨', label: 'Heavy', tamilLabel: 'கனமானது' },
        right: { id: 'feather', emoji: '🪶', label: 'Light', tamilLabel: 'லேசானது' },
        type: 'weight',
      },
      {
        left: { id: 'log', emoji: '🪵', label: 'Heavy', tamilLabel: 'கனமானது' },
        right: { id: 'balloon', emoji: '🎈', label: 'Light', tamilLabel: 'லேசானது' },
        type: 'weight',
      },
      {
        left: { id: 'elephant', emoji: '🐘', label: 'Heavy', tamilLabel: 'கனமானது' },
        right: { id: 'butterfly', emoji: '🦋', label: 'Light', tamilLabel: 'லேசானது' },
        type: 'weight',
      },
    ],
    quizzes: [
      {
        question: 'Which is HEAVY?',
        tamilQuestion: 'கனமானது எது?',
        options: [
          { id: 'rock', emoji: '🪨', label: 'Rock', tamilLabel: 'கல்', correct: true },
          { id: 'feather', emoji: '🪶', label: 'Feather', tamilLabel: 'இறகு', correct: false },
        ],
      },
      {
        question: 'Which is LIGHT?',
        tamilQuestion: 'லேசானது எது?',
        options: [
          { id: 'log', emoji: '🪵', label: 'Log', tamilLabel: 'மரக்கட்டை', correct: false },
          { id: 'balloon', emoji: '🎈', label: 'Balloon', tamilLabel: 'பலூன்', correct: true },
        ],
      },
      {
        question: 'Which is HEAVY?',
        tamilQuestion: 'கனமானது எது?',
        options: [
          { id: 'elephant', emoji: '🐘', label: 'Elephant', tamilLabel: 'யானை', correct: true },
          { id: 'butterfly', emoji: '🦋', label: 'Butterfly', tamilLabel: 'வண்ணத்துப்பூச்சி', correct: false },
        ],
      },
    ],
    matching: {
      items: [
        { id: 'rock', emoji: '🪨' },
        { id: 'feather', emoji: '🪶' },
      ],
      targets: [
        { id: 'heavy', label: 'Heavy', tamilLabel: 'கனமானது' },
        { id: 'light', label: 'Light', tamilLabel: 'லேசானது' },
      ],
      pairs: {
        rock: 'heavy',
        feather: 'light',
      },
    },
  },
  'same-diff': {
    id: 'same-diff',
    title: 'Same & Different',
    tamilTitle: 'ஒரே மாதிரி & வேறுபட்டது',
    showcases: [
      {
        left: { id: 'apples_same', emoji: '🍎 🍎', label: 'Same', tamilLabel: 'ஒரே மாதிரி' },
        right: { id: 'fruits_diff', emoji: '🍎 🍊', label: 'Different', tamilLabel: 'வேறுபட்டது' },
        type: 'same-diff',
      },
      {
        left: { id: 'balls_same', emoji: '⚽ ⚽', label: 'Same', tamilLabel: 'ஒரே மாதிரி' },
        right: { id: 'balls_diff', emoji: '⚽ 🏀', label: 'Different', tamilLabel: 'வேறுபட்டது' },
        type: 'same-diff',
      },
      {
        left: { id: 'cats_same', emoji: '🐱 🐱', label: 'Same', tamilLabel: 'ஒரே மாதிரி' },
        right: { id: 'cats_diff', emoji: '🐱 🐶', label: 'Different', tamilLabel: 'வேறுபட்டது' },
        type: 'same-diff',
      },
    ],
    quizzes: [
      {
        question: 'Which group is DIFFERENT?',
        tamilQuestion: 'வேறுபட்டது எது?',
        options: [
          { id: 'same', emoji: '🍎 🍎', label: 'Same', tamilLabel: 'ஒரே மாதிரி', correct: false },
          { id: 'diff', emoji: '🍎 🍊', label: 'Different', tamilLabel: 'வேறுபட்டது', correct: true },
        ],
      },
      {
        question: 'Which group has the SAME objects?',
        tamilQuestion: 'ஒரே மாதிரி உள்ளவை எது?',
        options: [
          { id: 'same_balls', emoji: '⚽ ⚽', label: 'Same', tamilLabel: 'ஒரே மாதிரி', correct: true },
          { id: 'diff_balls', emoji: '⚽ 🏀', label: 'Different', tamilLabel: 'வேறுபட்டது', correct: false },
        ],
      },
      {
        question: 'Which group is DIFFERENT?',
        tamilQuestion: 'வேறுபட்டது எது?',
        options: [
          { id: 'same_cats', emoji: '🐱 🐱', label: 'Same', tamilLabel: 'ஒரே மாதிரி', correct: false },
          { id: 'diff_cats', emoji: '🐱 🐶', label: 'Different', tamilLabel: 'வேறுபட்டது', correct: true },
        ],
      },
    ],
    matching: {
      items: [
        { id: 'apples_same', emoji: '🍎 🍎' },
        { id: 'fruits_diff', emoji: '🍎 🍊' },
      ],
      targets: [
        { id: 'same', label: 'Same', tamilLabel: 'ஒரே மாதிரி' },
        { id: 'diff', label: 'Different', tamilLabel: 'வேறுபட்டது' },
      ],
      pairs: {
        apples_same: 'same',
        fruits_diff: 'diff',
      },
    },
  },
};

function BoardLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      {[0.33, 0.66].map((y) => (
        <line key={y} x1="4%" y1={`${y * 100}%`} x2="96%" y2={`${y * 100}%`}
          stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="6 5" />
      ))}
    </svg>
  );
}

function StarBurst() {
  const stars = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i, angle: (i / 6) * 360, delay: (i * 0.08).toFixed(2),
      color: ['#fbbf24', '#f97316', '#22c55e', '#06b6d4', '#a78bfa', '#f472b6'][i % 6],
    })), []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {stars.map(s => (
        <div key={s.id} className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full"
          style={{
            background: s.color,
            '--a': `${s.angle}deg`,
            animation: `starShoot 0.6s ${s.delay}s ease-out forwards`,
            transformOrigin: '0 0',
          } as React.CSSProperties} />
      ))}
      <style>{`
        @keyframes starShoot {
          0% { opacity: 1; transform: translate(-50%, -50%) rotate(var(--a)) translateX(0) scale(1.2); }
          100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--a)) translateX(90px) scale(0); }
        }
      `}</style>
    </div>
  );
}

type Phase = 'showcase' | 'quiz' | 'matching' | 'all-done';

interface Props {
  conceptKey?: string; // 'big-small', 'tall-short', etc.
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
}

export default function PreMathQuiz({ conceptKey = 'big-small', onComplete }: Props) {
  const concept = CONCEPTS[conceptKey] || CONCEPTS['big-small'];
  const startTime = useRef(Date.now());

  const [phase, setPhase] = useState<Phase>('showcase');
  const [showcaseIndex, setShowcaseIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [showQuizPrompt, setShowQuizPrompt] = useState(false);

  // Quiz states
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [wrongShake, setWrongShake] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'success' | 'fail' | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  // Matching states
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({}); // item -> target

  const totalSteps = concept.showcases.length + concept.quizzes.length + 1; // +1 for matching
  const currentStep = phase === 'showcase'
    ? showcaseIndex + 1
    : phase === 'quiz'
      ? concept.showcases.length + quizIndex + 1
      : concept.showcases.length + concept.quizzes.length + 1;

  // Showcase navigation
  const goNextShowcase = () => {
    if (showcaseIndex < concept.showcases.length - 1) {
      setShowcaseIndex(i => i + 1);
    } else {
      setShowQuizPrompt(true);
    }
  };

  // Quiz option tap
  const handleQuizTap = (opt: PreMathItem & { correct: boolean }) => {
    if (selectedOpt) return;
    setSelectedOpt(opt.id);

    if (opt.correct) {
      setQuizScore(s => s + 1);
      setFeedbackType('success');
      setFeedbackMsg('⭐ "Super! You found it!"');
      setTimeout(() => {
        setSelectedOpt(null);
        setFeedbackMsg(null);
        setFeedbackType(null);
        if (quizIndex < concept.quizzes.length - 1) {
          setQuizIndex(q => q + 1);
        } else {
          setPhase('matching');
        }
      }, 1500);
    } else {
      setWrongShake(true);
      setFeedbackType('fail');
      setFeedbackMsg('"Look again! 👀"');
      setTimeout(() => {
        setWrongShake(false);
        setSelectedOpt(null);
        setFeedbackMsg(null);
        setFeedbackType(null);
      }, 1500);
    }
  };

  // Matching tap
  const handleLeftClick = (id: string) => {
    if (matchedPairs[id]) return;
    setSelectedLeft(id);
  };

  const handleRightClick = (targetId: string) => {
    if (!selectedLeft) return;
    
    // Check if correct match
    const correctTarget = concept.matching.pairs[selectedLeft];
    if (correctTarget === targetId) {
      // Add match
      setMatchedPairs(prev => {
        const next = { ...prev, [selectedLeft]: targetId };
        // Check if all matched
        if (Object.keys(next).length === concept.matching.items.length) {
          setTimeout(() => {
            setPhase('all-done');
          }, 1000);
        }
        return next;
      });
      setSelectedLeft(null);
    } else {
      // Incorrect match
      setWrongShake(true);
      setTimeout(() => {
        setWrongShake(false);
        setSelectedLeft(null);
      }, 500);
    }
  };

  const handleFinish = () => {
    onComplete({
      score: quizScore * 10 + 10, // 10 points per quiz + 10 for matching
      max_score: concept.quizzes.length * 10 + 10,
      completion_data: { concept: concept.id, quiz_score: quizScore },
      time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
    });
  };

  return (
    <div className="flex flex-col items-center gap-3 px-3 sm:px-5 pb-4 sm:pb-6 select-none w-full">
      {/* Progress dots */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center px-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="transition-all duration-300" style={{
            width: i === currentStep - 1 ? 16 : 6,
            height: 6,
            borderRadius: 99,
            background: i < currentStep - 1
              ? '#22c55e'
              : i === currentStep - 1
                ? '#38bdf8'
                : 'rgba(255,255,255,0.2)',
          }} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ─── SHOW QUIZ PROMPT ─── */}
        {showQuizPrompt && (
          <motion.div
            key="quiz-prompt"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-6 w-full max-w-md"
          >
            {/* Blackboard */}
            <div className="relative w-full rounded-3xl overflow-hidden min-h-[300px] flex flex-col justify-center items-center px-6 py-8 border-[3px] border-[#2d4a2d]"
              style={{ background: 'linear-gradient(160deg, #1a2e1a 0%, #0d1f0d 100%)', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
              <BoardLines />
              
              <div className="relative z-10 flex flex-col items-center gap-5 text-center">
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="text-6xl sm:text-7xl">
                  🤔
                </motion.div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-black text-white font-sans">Ready for Quiz? 🧠</h3>
                  <p className="text-sm text-white/70 font-medium px-4 font-sans leading-relaxed">
                    Let's see if you can find the correct answers! Tap below to start!
                  </p>
                </div>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setShowQuizPrompt(false);
                setPhase('quiz');
              }}
              className="w-full max-w-xs py-3.5 rounded-2xl font-black text-white text-base tracking-wide bg-gradient-to-r from-amber-500 to-orange-500 shadow-xl border-b-4 border-amber-700 active:scale-95 font-sans"
            >
              Start Quiz! 🚀
            </motion.button>
          </motion.div>
        )}

        {/* ─── PHASE: SHOWCASE ─── */}
        {!showQuizPrompt && phase === 'showcase' && (() => {
          const sc = concept.showcases[showcaseIndex];
          return (
            <motion.div
              key={`showcase-${showcaseIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-4 w-full"
            >
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20">
                <span className="text-xs font-black text-white/75 tracking-wider uppercase">{concept.title}</span>
              </div>

              {/* Blackboard */}
              <div className="relative w-full rounded-3xl overflow-hidden min-h-[300px] flex flex-col justify-center items-center px-4 py-6 border-[3px] border-[#2d4a2d]"
                style={{ background: 'linear-gradient(160deg, #1a2e1a 0%, #0d1f0d 100%)', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
                <BoardLines />

                <div className="relative z-10 w-full flex justify-around items-center gap-4 max-w-sm">
                  {/* Left item */}
                  <div className="flex flex-col items-center gap-3">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{
                        scale: sc.type === 'scale' ? 1.25 : 1,
                        y: sc.type === 'weight' ? 15 : 0,
                        scaleY: sc.type === 'height' ? 1.15 : 1,
                        opacity: 1
                      }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className="text-7xl sm:text-8xl drop-shadow-lg"
                      style={{ transformOrigin: 'bottom center' }}
                    >
                      {sc.left.emoji}
                    </motion.div>
                    <span className="px-3 py-1.5 rounded-xl text-emerald-300 bg-emerald-950/40 border border-emerald-900 font-bold text-sm sm:text-base font-sans">
                      {sc.left.label}
                    </span>
                  </div>

                  {/* VS Divider or scale indicator */}
                  {sc.type === 'weight' ? (
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: -12 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className="text-3xl text-white/30"
                    >
                      ⚖️
                    </motion.div>
                  ) : (
                    <div className="text-xl font-bold text-white/20 font-sans">vs</div>
                  )}

                  {/* Right item */}
                  <div className="flex flex-col items-center gap-3">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{
                        scale: sc.type === 'scale' ? 0.75 : 1,
                        y: sc.type === 'weight' ? -15 : 0,
                        scaleY: sc.type === 'height' ? 0.8 : 1,
                        opacity: 1
                      }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      className="text-7xl sm:text-8xl drop-shadow-lg"
                      style={{ transformOrigin: 'bottom center' }}
                    >
                      {sc.right.emoji}
                    </motion.div>
                    <span className="px-3 py-1.5 rounded-xl text-amber-300 bg-amber-950/40 border border-amber-900 font-bold text-sm sm:text-base font-sans">
                      {sc.right.label}
                    </span>
                  </div>
                </div>
              </div>

              <motion.button whileTap={{ scale: 0.96 }} onClick={goNextShowcase}
                className="w-full max-w-xs py-3.5 rounded-2xl font-black text-white text-base tracking-wide bg-gradient-to-r from-emerald-500 to-teal-500 shadow-xl border-b-4 border-emerald-700 active:scale-95 font-sans">
                Next ➡️
              </motion.button>
            </motion.div>
          );
        })()}

        {/* ─── PHASE: QUIZ ─── */}
        {phase === 'quiz' && (() => {
          const q = concept.quizzes[quizIndex];
          return (
            <motion.div
              key={`quiz-${quizIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 w-full"
            >
              <div className="relative w-full rounded-3xl overflow-hidden px-4 py-5 flex flex-col items-center gap-2 border-[3px] border-[#2d4a2d]"
                style={{ background: 'linear-gradient(160deg, #1a2e1a 0%, #0d1f0d 100%)', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
                <BoardLines />
                <p className="relative z-10 text-white/50 text-[10px] font-black tracking-widest uppercase">Quiz Time!</p>
                <h3 className="relative z-10 text-2xl font-black text-white text-center font-sans">
                  {q.question}
                </h3>
              </div>

              {/* Feedback Overlay inside options */}
              <AnimatePresence>
                {feedbackMsg && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute z-20 inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none rounded-3xl">
                    <div className={`px-6 py-4 rounded-2xl font-black shadow-2xl text-center border-2 ${
                      feedbackType === 'success' ? 'bg-[#163e32]/95 border-emerald-500 text-white' : 'bg-red-950/95 border-red-500 text-red-100'
                    }`}>
                      <p className="text-lg font-black font-sans">{feedbackMsg}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Options Grid */}
              <motion.div animate={wrongShake ? { x: [0, -8, 8, -5, 5, 0] } : {}} transition={{ duration: 0.3 }}
                className="grid grid-cols-2 gap-4 w-full max-w-md">
                {q.options.map(opt => {
                  const isSelected = selectedOpt === opt.id;
                  const isCorrect = opt.correct;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleQuizTap(opt)}
                      className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl transition-all active:scale-95 relative overflow-hidden bg-white/10 hover:bg-white/15 border-2 border-white/10"
                      style={{
                        ...(isSelected && isCorrect && {
                          background: 'rgba(34,197,94,0.25)',
                          borderColor: 'rgba(34,197,94,0.7)',
                        }),
                        ...(isSelected && !isCorrect && {
                          background: 'rgba(239,68,68,0.25)',
                          borderColor: 'rgba(239,68,68,0.6)',
                        })
                      }}
                    >
                      {isSelected && isCorrect && <div className="absolute -top-0.5 -right-0.5 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] font-black shadow">✓</div>}
                      <span className="text-6xl sm:text-7xl leading-none drop-shadow-md">{opt.emoji}</span>
                      <span className="text-sm sm:text-base font-black text-white/95 font-sans">{opt.label}</span>
                    </button>
                  );
                })}
              </motion.div>
            </motion.div>
          );
        })()}

        {/* ─── PHASE: MATCHING ─── */}
        {phase === 'matching' && (() => {
          const m = concept.matching;
          return (
            <motion.div
              key="matching"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 w-full"
            >
              <div className="w-full text-center">
                <h3 className="text-xl sm:text-2xl font-black text-white font-sans">Sort the Items! 🧺</h3>
                <p className="text-xs text-white/50 font-bold font-sans">Tap an object at the top, then tap the correct basket at the bottom! 👇</p>
              </div>

              {/* Blackboard Grid */}
              <div className="relative w-full rounded-3xl overflow-hidden min-h-[340px] flex flex-col justify-between items-center px-4 py-6 border-[3px] border-[#2d4a2d]"
                style={{ background: 'linear-gradient(160deg, #1a2e1a 0%, #0d1f0d 100%)', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
                <BoardLines />

                {/* Top: Bubble items to sort */}
                <div className="relative z-10 flex flex-wrap justify-center gap-4 w-full py-2 min-h-[100px]">
                  {m.items.map(item => {
                    const isSelected = selectedLeft === item.id;
                    const isMatched = !!matchedPairs[item.id];
                    if (isMatched) return null; // hide from top when sorted!
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleLeftClick(item.id)}
                        className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-5xl sm:text-6xl transition-all relative border-4 shadow-lg active:scale-95
                          ${isSelected 
                            ? 'bg-sky-500/25 border-sky-400 scale-105 shadow-sky-500/40 ring-4 ring-sky-400/20' 
                            : 'bg-white/10 border-white/20 hover:bg-white/15'}`}
                      >
                        {item.emoji}
                      </button>
                    );
                  })}
                </div>

                {/* Bottom: The two large buckets */}
                <div className="relative z-10 flex gap-6 w-full max-w-md justify-center mt-4">
                  {m.targets.map(target => {
                    // Find all items sorted into this bucket
                    const sortedItems = Object.entries(matchedPairs)
                      .filter(([_, targetId]) => targetId === target.id)
                      .map(([itemId]) => m.items.find(item => item.id === itemId));

                    const isTargetActive = !!selectedLeft;

                    return (
                      <button
                        key={target.id}
                        onClick={() => handleRightClick(target.id)}
                        className={`flex-1 py-4 px-3 rounded-2xl text-center transition-all border-[3px] flex flex-col items-center justify-between min-h-[140px] select-none
                          ${isTargetActive
                            ? 'bg-amber-500/10 border-amber-400/60 animate-pulse text-amber-300'
                            : 'bg-white/5 border-white/10 text-white/95'}`}
                      >
                        {/* Basket title */}
                        <span className="font-black font-sans text-base sm:text-lg text-white/90 drop-shadow-md">
                          {target.label}
                        </span>

                        {/* Visual bucket symbol and current contents */}
                        <div className="flex flex-col items-center justify-center gap-2 my-2 min-h-[50px] w-full">
                          {sortedItems.length === 0 ? (
                            <span className="text-4xl sm:text-5xl opacity-40 filter grayscale">🧺</span>
                          ) : (
                            <div className="flex flex-wrap justify-center gap-1.5 px-2 py-1 bg-black/30 rounded-xl border border-white/5 max-w-[120px]">
                              {sortedItems.map(item => item && (
                                <motion.span
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  key={item.id}
                                  className="text-2xl sm:text-3xl"
                                >
                                  {item.emoji}
                                </motion.span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Status bar */}
                        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/80">
                          {sortedItems.length > 0 ? `Loaded (${sortedItems.length})` : 'Empty'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })()}

        {/* ─── PHASE: ALL DONE ─── */}
        {phase === 'all-done' && (
          <motion.div
            key="all-done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-5 w-full"
          >
            <StarBurst />
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="text-6xl sm:text-7xl">
              🏆
            </motion.div>
            <div className="flex flex-col items-center gap-2 px-6 py-5 rounded-2xl w-full text-center" style={{ background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.15)' }}>
              <p className="text-lg sm:text-xl font-black text-white font-sans">
                Awesome! 🎊
              </p>
              <p className="text-xs text-white/50 font-bold tracking-wide mt-1 font-sans">
                You have successfully completed the {concept.title} lesson!
              </p>
              <p className="text-emerald-400 font-black text-sm font-sans mt-2">
                Correct Answers: {concept.quizzes.length + 1} / {concept.quizzes.length + 1}
              </p>
            </div>
            <motion.button whileTap={{ scale: 0.96 }} onClick={handleFinish}
              className="w-full max-w-xs py-3.5 rounded-2xl font-black text-white text-base tracking-wide shadow-xl active:scale-95 font-sans"
              style={{ background: 'linear-gradient(135deg, #f97316, #ec4899, #6366f1)', boxShadow: '0 4px 28px rgba(249,115,22,0.5)' }}>
              Next Lesson ➡️
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
