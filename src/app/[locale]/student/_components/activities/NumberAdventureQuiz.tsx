'use client';

import { useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NumberQuestion {
  id: string;
  type: 'mcq' | 'tap-count' | 'missing-num';
  question: string;
  options: { id: string; emoji: string; label: string; correct: boolean }[];
  visual?: string; // Representation like 🍎🍎
  requiredCount?: number;
  mascotText?: string;
}

interface NumberLessonConfig {
  id: string;
  title: string;
  steps: NumberQuestion[];
}

const LESSONS: Record<string, NumberLessonConfig> = {
  'numbers-1-2': {
    id: 'numbers-1-2',
    title: 'Numbers 1 & 2',
    steps: [
      {
        id: 'count-apple-1',
        type: 'mcq',
        question: 'How many apples do you see? 🍎',
        visual: '🍎',
        mascotText: "Let's count the delicious fruits! 🍎",
        options: [
          { id: '1', emoji: '1️⃣', label: '1 Apple', correct: true },
          { id: '2', emoji: '2️⃣', label: '2 Apples', correct: false },
          { id: '3', emoji: '3️⃣', label: '3 Apples', correct: false },
        ],
      },
      {
        id: 'count-apple-2',
        type: 'mcq',
        question: 'How many apples now? 🍎🍎',
        visual: '🍎 🍎',
        mascotText: "Great! Let's count the apples in the basket! 🧺",
        options: [
          { id: '1', emoji: '1️⃣', label: '1 Apple', correct: false },
          { id: '2', emoji: '2️⃣', label: '2 Apples', correct: true },
          { id: '3', emoji: '3️⃣', label: '3 Apples', correct: false },
        ],
      },
    ],
  },
  'numbers-3-4': {
    id: 'numbers-3-4',
    title: 'Numbers 3 & 4',
    steps: [
      {
        id: 'count-birds-3',
        type: 'mcq',
        question: 'How many birds do you see? 🐥🐥🐥',
        visual: '🐥 🐥 🐥',
        mascotText: "Let's count the little singing birds! 🐥",
        options: [
          { id: '2', emoji: '2️⃣', label: '2', correct: false },
          { id: '3', emoji: '3️⃣', label: '3', correct: true },
          { id: '4', emoji: '4️⃣', label: '4', correct: false },
        ],
      },
      {
        id: 'count-fish-4',
        type: 'mcq',
        question: 'How many fish are swimming? 🐟🐟🐟🐟',
        visual: '🐟 🐟 🐟 🐟',
        mascotText: 'Can you count all the swimming fish? 🐟',
        options: [
          { id: '2', emoji: '2️⃣', label: '2', correct: false },
          { id: '3', emoji: '3️⃣', label: '3', correct: false },
          { id: '4', emoji: '4️⃣', label: '4', correct: true },
        ],
      },
    ],
  },
  'number-5': {
    id: 'number-5',
    title: 'Number 5',
    steps: [
      {
        id: 'count-stars-5',
        type: 'mcq',
        question: 'How many stars came to play? ⭐⭐⭐⭐⭐',
        visual: '⭐ ⭐ ⭐ ⭐ ⭐',
        mascotText: 'Let\'s count the shining stars! ⭐',
        options: [
          { id: '3', emoji: '3️⃣', label: '3', correct: false },
          { id: '4', emoji: '4️⃣', label: '4', correct: false },
          { id: '5', emoji: '5️⃣', label: '5', correct: true },
        ],
      },
      {
        id: 'give-flowers-5',
        type: 'tap-count',
        question: 'Tap 5 flowers to count them! 🌸',
        visual: '🌸 🌸 🌸 🌸 🌸',
        requiredCount: 5,
        mascotText: 'Tap each flower to count to 5! 🌸',
        options: [],
      },
    ],
  },
  'count-match-1-5': {
    id: 'count-match-1-5',
    title: 'Count & Match 1-5',
    steps: [
      {
        id: 'match-quantity-3',
        type: 'mcq',
        question: 'Which group has exactly 3 apples? 🍎',
        mascotText: 'Let\'s match the number to the group! 🍎',
        options: [
          { id: '1', emoji: '🍎', label: '1 Apple', correct: false },
          { id: '2', emoji: '🍎🍎', label: '2 Apples', correct: false },
          { id: '3', emoji: '🍎🍎🍎', label: '3 Apples', correct: true },
        ],
      },
      {
        id: 'missing-number',
        type: 'missing-num',
        question: 'Which number is missing?',
        visual: '1   2   _   4   5',
        mascotText: 'Can you find the missing number? 🔢',
        options: [
          { id: '2', emoji: '2️⃣', label: '2', correct: false },
          { id: '3', emoji: '3️⃣', label: '3', correct: true },
          { id: '5', emoji: '5️⃣', label: '5', correct: false },
        ],
      },
      {
        id: 'count-bunnies-3',
        type: 'mcq',
        question: 'Count the bunnies! 🐰🐰🐰',
        visual: '🐰 🐰 🐰',
        mascotText: 'How many cute hopping bunnies? 🐰',
        options: [
          { id: '2', emoji: '2️⃣', label: '2', correct: false },
          { id: '3', emoji: '3️⃣', label: '3', correct: true },
          { id: '4', emoji: '4️⃣', label: '4', correct: false },
        ],
      },
      {
        id: 'treasure-find-4',
        type: 'mcq',
        question: 'Can you find number 4? 🔍',
        mascotText: 'Find the correct number block! 🔍',
        options: [
          { id: '2', emoji: '2️⃣', label: '2', correct: false },
          { id: '4', emoji: '4️⃣', label: '4', correct: true },
          { id: '5', emoji: '5️⃣', label: '5', correct: false },
        ],
      },
    ],
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

interface Props {
  conceptKey?: string;
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
}

export default function NumberAdventureQuiz({ conceptKey = 'numbers-1-2', onComplete }: Props) {
  const lesson = LESSONS[conceptKey] || LESSONS['numbers-1-2'];
  const startTime = useRef(Date.now());

  const [stepIndex, setStepIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(true);

  // States
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [wrongShake, setWrongShake] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'success' | 'fail' | null>(null);
  const [score, setScore] = useState(0);

  // For interactive tap-count step
  const [tappedFlowers, setTappedFlowers] = useState<Set<number>>(new Set());

  const totalSteps = lesson.steps.length;
  const currentStep = stepIndex + 1;

  const handleNextStep = () => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex(prev => prev + 1);
      setTappedFlowers(new Set());
    } else {
      onComplete({
        score: score * 10 + 20,
        max_score: totalSteps * 10 + 20,
        completion_data: { concept: lesson.id, score },
        time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
      });
    }
  };

  const handleQuizTap = (opt: { id: string; emoji: string; label: string; correct: boolean }) => {
    if (selectedOpt) return;
    setSelectedOpt(opt.id);

    if (opt.correct) {
      setScore(s => s + 1);
      setFeedbackType('success');
      setFeedbackMsg('⭐ "Super! Correct! 🎉"');
      setTimeout(() => {
        setSelectedOpt(null);
        setFeedbackMsg(null);
        setFeedbackType(null);
        handleNextStep();
      }, 1500);
    } else {
      setWrongShake(true);
      setFeedbackType('fail');
      setFeedbackMsg('"Try again! 👀"');
      setTimeout(() => {
        setWrongShake(false);
        setSelectedOpt(null);
        setFeedbackMsg(null);
        setFeedbackType(null);
      }, 1500);
    }
  };

  const handleFlowerTap = (idx: number) => {
    if (tappedFlowers.has(idx)) return;
    const nextTapped = new Set(tappedFlowers);
    nextTapped.add(idx);
    setTappedFlowers(nextTapped);

    if (nextTapped.size === 5) {
      setScore(s => s + 1);
      setFeedbackType('success');
      setFeedbackMsg('⭐ "Yay! You counted 5 flowers! 🌸"');
      setTimeout(() => {
        setFeedbackMsg(null);
        setFeedbackType(null);
        handleNextStep();
      }, 1800);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 px-3 sm:px-5 pb-4 sm:pb-6 select-none w-full">
      {/* Progress dots */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center px-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="transition-all duration-300" style={{
            width: i === stepIndex ? 16 : 6,
            height: 6,
            borderRadius: 99,
            background: i < stepIndex ? '#22c55e' : i === stepIndex ? '#38bdf8' : 'rgba(255,255,255,0.2)',
          }} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ─── SHOW START PROMPT ─── */}
        {showPrompt && (
          <motion.div
            key="start-prompt"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-6 w-full max-w-md"
          >
            <div className="relative w-full rounded-3xl overflow-hidden min-h-[300px] flex flex-col justify-center items-center px-6 py-8 border-[3px] border-[#2d4a2d]"
              style={{ background: 'linear-gradient(160deg, #1a2e1a 0%, #0d1f0d 100%)', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
              <BoardLines />
              <div className="relative z-10 flex flex-col items-center gap-5 text-center">
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="text-6xl sm:text-7xl">
                  🔢
                </motion.div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-black text-white font-sans">{lesson.title} 🚀</h3>
                  <p className="text-sm text-white/70 font-medium px-4 font-sans leading-relaxed">
                    Ready to count and learn numbers? Tap start below!
                  </p>
                </div>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowPrompt(false)}
              className="w-full max-w-xs py-3.5 rounded-2xl font-black text-white text-base tracking-wide bg-gradient-to-r from-emerald-500 to-teal-500 shadow-xl border-b-4 border-emerald-700 active:scale-95 font-sans"
            >
              Start Adventure! 🌟
            </motion.button>
          </motion.div>
        )}

        {/* ─── PHASE: GAMEPLAY ─── */}
        {!showPrompt && (() => {
          const q = lesson.steps[stepIndex];
          if (!q) return null;

          if (q.type === 'tap-count') {
            return (
              <motion.div
                key={`numbers-tap-${stepIndex}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 w-full"
              >
                {/* Blackboard */}
                <div className="relative w-full rounded-3xl overflow-hidden px-4 py-5 flex flex-col items-center justify-center gap-4 border-[3px] border-[#2d4a2d] min-h-[180px]"
                  style={{ background: 'linear-gradient(160deg, #1a2e1a 0%, #0d1f0d 100%)', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
                  <BoardLines />
                  {q.mascotText && (
                    <p className="relative z-10 text-xs text-emerald-300 font-bold uppercase tracking-wider bg-emerald-950/50 px-3 py-1 rounded-full">
                      {q.mascotText}
                    </p>
                  )}
                  <h3 className="relative z-10 text-xl sm:text-2xl font-black text-white text-center font-sans px-2 leading-snug">
                    {q.question}
                  </h3>
                  <div className="relative z-10 flex gap-1.5 text-xs text-white/50 font-bold bg-black/20 px-3 py-1 rounded-full">
                    Tapped: <span className="text-sky-400 font-black">{tappedFlowers.size}</span> / {q.requiredCount}
                  </div>
                </div>

                {/* Feedback Overlay inside option area */}
                <AnimatePresence>
                  {feedbackMsg && (
                    <div className="absolute z-20 inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none rounded-3xl">
                      <div className="px-6 py-4 rounded-2xl font-black bg-[#163e32]/95 border-2 border-emerald-500 text-white shadow-2xl text-center">
                        <p className="text-lg font-black font-sans">{feedbackMsg}</p>
                      </div>
                    </div>
                  )}
                </AnimatePresence>

                {/* Interactive Tapping Flowers */}
                <div className="flex gap-4 justify-center items-center py-6 flex-wrap max-w-sm">
                  {Array.from({ length: q.requiredCount || 5 }).map((_, idx) => {
                    const isTapped = tappedFlowers.has(idx);
                    return (
                      <motion.button
                        key={idx}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleFlowerTap(idx)}
                        className={`w-16 h-16 rounded-full flex items-center justify-center text-4xl border-3 shadow-md transition-all
                          ${isTapped ? 'bg-emerald-500/20 border-emerald-400 opacity-60 scale-90' : 'bg-white/10 border-white/20 hover:bg-white/15'}`}
                      >
                        {isTapped ? '💖' : '🌸'}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            );
          }

          // MCQ and Missing Number
          return (
            <motion.div
              key={`numbers-quiz-${stepIndex}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 w-full"
            >
              {/* Blackboard */}
              <div className="relative w-full rounded-3xl overflow-hidden px-4 py-5 flex flex-col items-center justify-center gap-4 border-[3px] border-[#2d4a2d] min-h-[180px]"
                style={{ background: 'linear-gradient(160deg, #1a2e1a 0%, #0d1f0d 100%)', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
                <BoardLines />

                {q.mascotText && (
                  <p className="relative z-10 text-[10px] sm:text-xs text-emerald-300 font-bold uppercase tracking-wider bg-emerald-950/50 px-3 py-1 rounded-full text-center">
                    {q.mascotText}
                  </p>
                )}

                {q.visual && (
                  <div className={`relative z-10 text-4xl sm:text-5xl font-mono text-emerald-400 font-bold tracking-widest leading-normal whitespace-pre`}>
                    {q.visual}
                  </div>
                )}

                <h3 className="relative z-10 text-lg sm:text-xl font-black text-white text-center font-sans px-2 leading-snug">
                  {q.question}
                </h3>
              </div>

              {/* Feedback Overlay inside options */}
              <AnimatePresence>
                {feedbackMsg && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute z-20 inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none rounded-3xl">
                    <div className="px-6 py-4 rounded-2xl font-black bg-[#163e32]/95 border-2 border-emerald-500 text-white shadow-2xl text-center">
                      <p className="text-lg font-black font-sans">{feedbackMsg}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Options Grid */}
              <motion.div animate={wrongShake ? { x: [0, -8, 8, -5, 5, 0] } : {}} transition={{ duration: 0.3 }}
                className="grid gap-3 w-full max-w-md grid-cols-3">
                {q.options.map(opt => {
                  const isSelected = selectedOpt === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleQuizTap(opt)}
                      className="flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl transition-all active:scale-95 relative overflow-hidden bg-white/10 hover:bg-white/15 border-2 border-white/10"
                      style={{
                        ...(isSelected && opt.correct && {
                          background: 'rgba(34,197,94,0.25)',
                          borderColor: 'rgba(34,197,94,0.7)',
                        }),
                        ...(isSelected && !opt.correct && {
                          background: 'rgba(239,68,68,0.25)',
                          borderColor: 'rgba(239,68,68,0.6)',
                        })
                      }}
                    >
                      <span className="text-4xl sm:text-5xl leading-none drop-shadow-md">{opt.emoji}</span>
                      <span className="text-xs sm:text-sm font-black text-white/95 font-sans">{opt.label}</span>
                    </button>
                  );
                })}
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
