'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Data Types ────────────────────────────────────────────────────────────────
interface SortItem {
  id: string;
  emoji: string;
  targetId: string;
  label: string;
}
interface SortTarget {
  id: string;
  label: string;
  emoji: string;
  color: string;
}
interface QuizStep {
  id: string;
  question: string;
  hint: string;
  visual?: string;
  options: { id: string; emoji: string; label: string; correct: boolean }[];
}

interface LessonConfig {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  themeGrad: string;
  // Sort-by mode
  sortItems?: SortItem[];
  sortTargets?: SortTarget[];
  // MCQ mode
  steps?: QuizStep[];
}

// ─── Lessons Data ──────────────────────────────────────────────────────────────
const LESSONS: Record<string, LessonConfig> = {
  'sort-by-color': {
    id: 'sort-by-color',
    title: 'Sort by Color',
    subtitle: 'Tap an item, then drop it into the matching colored basket!',
    icon: '🌈',
    themeGrad: 'linear-gradient(135deg, #6d28d9, #7c3aed, #8b5cf6)',
    sortItems: [
      { id: 'r1', emoji: '🍎', label: 'Apple',     targetId: 'red'    },
      { id: 'r2', emoji: '🍓', label: 'Strawberry',targetId: 'red'    },
      { id: 'r3', emoji: '🌹', label: 'Rose',       targetId: 'red'    },
      { id: 'b1', emoji: '🫐', label: 'Blueberry',  targetId: 'blue'   },
      { id: 'b2', emoji: '🐳', label: 'Whale',      targetId: 'blue'   },
      { id: 'y1', emoji: '🌟', label: 'Star',       targetId: 'yellow' },
      { id: 'y2', emoji: '🌻', label: 'Sunflower',  targetId: 'yellow' },
    ],
    sortTargets: [
      { id: 'red',    label: 'Red Basket',    emoji: '🔴', color: '#ef4444' },
      { id: 'blue',   label: 'Blue Basket',   emoji: '🔵', color: '#3b82f6' },
      { id: 'yellow', label: 'Yellow Basket', emoji: '🟡', color: '#eab308' },
    ],
  },

  'sort-by-size': {
    id: 'sort-by-size',
    title: 'Sort by Size',
    subtitle: 'Big or Small? Tap an item and put it in the right box!',
    icon: '📏',
    themeGrad: 'linear-gradient(135deg, #0f766e, #0d9488, #14b8a6)',
    sortItems: [
      { id: 'b1', emoji: '🐘', label: 'Elephant', targetId: 'big'   },
      { id: 'b2', emoji: '🐋', label: 'Whale',    targetId: 'big'   },
      { id: 'b3', emoji: '🦁', label: 'Lion',     targetId: 'big'   },
      { id: 's1', emoji: '🐜', label: 'Ant',      targetId: 'small' },
      { id: 's2', emoji: '🐝', label: 'Bee',      targetId: 'small' },
      { id: 's3', emoji: '🐞', label: 'Ladybug',  targetId: 'small' },
    ],
    sortTargets: [
      { id: 'big',   label: 'Big Animals',   emoji: '🐘', color: '#f97316' },
      { id: 'small', label: 'Small Insects', emoji: '🐜', color: '#22c55e' },
    ],
  },

  'compare-groups': {
    id: 'compare-groups',
    title: 'Compare Groups',
    subtitle: 'Look carefully — which group has more, fewer, or are they equal?',
    icon: '⚖️',
    themeGrad: 'linear-gradient(135deg, #b45309, #d97706, #f59e0b)',
    steps: [
      {
        id: 'q1',
        question: 'Which group has MORE 🍎?',
        hint: 'Count each group carefully!',
        visual: '🍎🍎🍎🍎   vs   🍎🍎',
        options: [
          { id: 'left',  emoji: '🍎🍎🍎🍎', label: '4 Apples', correct: true  },
          { id: 'right', emoji: '🍎🍎',     label: '2 Apples', correct: false },
        ],
      },
      {
        id: 'q2',
        question: 'Which group has FEWER 🎈?',
        hint: 'Find the smaller group!',
        visual: '🎈   vs   🎈🎈🎈🎈🎈',
        options: [
          { id: 'left',  emoji: '🎈',           label: '1 Balloon',  correct: true  },
          { id: 'right', emoji: '🎈🎈🎈🎈🎈', label: '5 Balloons', correct: false },
        ],
      },
      {
        id: 'q3',
        question: 'Are these groups EQUAL? 🍪',
        hint: 'Count both sides — are they the same?',
        visual: '🍪🍪🍪   vs   🍪🍪🍪',
        options: [
          { id: 'yes', emoji: '✅', label: 'Yes, Equal!',  correct: true  },
          { id: 'no',  emoji: '❌', label: 'No, Different!', correct: false },
        ],
      },
      {
        id: 'q4',
        question: 'Which group has MORE ⭐?',
        hint: 'One group is bigger!',
        visual: '⭐⭐   vs   ⭐⭐⭐⭐⭐',
        options: [
          { id: 'left',  emoji: '⭐⭐',         label: '2 Stars', correct: false },
          { id: 'right', emoji: '⭐⭐⭐⭐⭐', label: '5 Stars', correct: true  },
        ],
      },
      {
        id: 'q5',
        question: 'Are these groups EQUAL? 🐸',
        hint: 'Count carefully!',
        visual: '🐸🐸🐸   vs   🐸🐸🐸🐸',
        options: [
          { id: 'yes', emoji: '✅', label: 'Yes, Equal!',   correct: false },
          { id: 'no',  emoji: '❌', label: 'No, Different!', correct: true  },
        ],
      },
    ],
  },

  'same-different': {
    id: 'same-different',
    title: 'Same & Different',
    subtitle: 'One of these things is not like the others! Can you find it?',
    icon: '🔍',
    themeGrad: 'linear-gradient(135deg, #0e7490, #0891b2, #06b6d4)',
    steps: [
      {
        id: 'd1',
        question: 'Which one is DIFFERENT? 🍊',
        hint: 'Look — most are the same fruit!',
        visual: '🍎  🍎  🍊',
        options: [
          { id: 'a1', emoji: '🍎', label: 'Apple',  correct: false },
          { id: 'a2', emoji: '🍎', label: 'Apple',  correct: false },
          { id: 'o1', emoji: '🍊', label: 'Orange', correct: true  },
        ],
      },
      {
        id: 'd2',
        question: 'Which one is DIFFERENT? 🚌',
        hint: 'Most are cars!',
        visual: '🚗  🚗  🚌',
        options: [
          { id: 'c1', emoji: '🚗', label: 'Car',  correct: false },
          { id: 'c2', emoji: '🚗', label: 'Car',  correct: false },
          { id: 'b1', emoji: '🚌', label: 'Bus',  correct: true  },
        ],
      },
      {
        id: 'd3',
        question: 'Which one is DIFFERENT? 🐶',
        hint: 'One animal is totally different!',
        visual: '🐶  🐶  🐱',
        options: [
          { id: 'dg1', emoji: '🐶', label: 'Dog',  correct: false },
          { id: 'dg2', emoji: '🐶', label: 'Dog',  correct: false },
          { id: 'ct1', emoji: '🐱', label: 'Cat',  correct: true  },
        ],
      },
      {
        id: 'd4',
        question: 'Which one is DIFFERENT? 🌙',
        hint: 'The sky items are the same, except one!',
        visual: '⭐  ⭐  🌙',
        options: [
          { id: 's1', emoji: '⭐', label: 'Star', correct: false },
          { id: 's2', emoji: '⭐', label: 'Star', correct: false },
          { id: 'm1', emoji: '🌙', label: 'Moon', correct: true  },
        ],
      },
      {
        id: 'd5',
        question: 'Which one is SAME as the others? 🎯',
        hint: 'Two things match — which ones?',
        visual: '🎉  🎈  🎈',
        options: [
          { id: 'p1', emoji: '🎉', label: 'Party Popper', correct: false },
          { id: 'b1', emoji: '🎈', label: 'Balloon',      correct: true  },
          { id: 'b2', emoji: '🎈', label: 'Balloon',      correct: true  },
        ],
      },
    ],
  },
};

// ─── Helpers ───────────────────────────────────────────────────────────────────
function BoardLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      {[0.33, 0.66].map((y) => (
        <line key={y} x1="4%" y1={`${y * 100}%`} x2="96%" y2={`${y * 100}%`}
          stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="6 5" />
      ))}
    </svg>
  );
}

// ─── Component ─────────────────────────────────────────────────────────────────
interface Props {
  conceptKey?: string;
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
}

export default function SortingComparisonQuiz({ conceptKey = 'sort-by-color', onComplete }: Props) {
  const lesson = LESSONS[conceptKey] ?? LESSONS['sort-by-color'];
  const isSortMode = !!(lesson.sortItems && lesson.sortTargets);
  const startTime = useRef(Date.now());

  const [phase, setPhase] = useState<'intro' | 'game' | 'done'>('intro');
  const [stepIndex, setStepIndex] = useState(0);
  const [score, setScore] = useState(0);

  // Sort mode state
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [shakeTarget, setShakeTarget] = useState<string | null>(null);
  const [popItem, setPopItem] = useState<string | null>(null);

  // MCQ state
  const [selected, setSelected] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const totalItems = isSortMode ? (lesson.sortItems?.length ?? 0) : (lesson.steps?.length ?? 0);
  const placedCount = Object.keys(placed).length;

  const elapsed = () => Math.round((Date.now() - startTime.current) / 1000);

  const finishLesson = (finalScore: number) => {
    setPhase('done');
    setTimeout(() => {
      onComplete({
        score: finalScore,
        max_score: totalItems,
        completion_data: { concept: lesson.id, score: finalScore },
        time_taken_seconds: elapsed(),
      });
    }, 1600);
  };

  // ── Sort handlers ────────────────────────────────────────────────────────────
  const handleItemClick = (id: string) => {
    if (placed[id]) return;
    setSelectedItem(prev => prev === id ? null : id);
  };

  const handleTargetClick = (targetId: string) => {
    if (!selectedItem || !lesson.sortItems) return;
    const item = lesson.sortItems.find(i => i.id === selectedItem)!;
    if (item.targetId === targetId) {
      const next = { ...placed, [selectedItem]: targetId };
      setPlaced(next);
      setPopItem(selectedItem);
      setTimeout(() => setPopItem(null), 600);
      setSelectedItem(null);
      const newScore = score + 1;
      setScore(newScore);
      if (Object.keys(next).length >= (lesson.sortItems?.length ?? 0)) {
        finishLesson(newScore);
      }
    } else {
      setShakeTarget(targetId);
      setTimeout(() => { setShakeTarget(null); setSelectedItem(null); }, 500);
    }
  };

  // ── MCQ handlers ─────────────────────────────────────────────────────────────
  const handleOptionTap = (opt: { id: string; emoji: string; label: string; correct: boolean }) => {
    if (locked) return;
    setSelected(opt.id);
    setLocked(true);

    if (opt.correct) {
      setFeedback('correct');
      const newScore = score + 1;
      setScore(newScore);
      setTimeout(() => {
        setSelected(null); setLocked(false); setFeedback(null);
        const nextIdx = stepIndex + 1;
        if (nextIdx >= (lesson.steps?.length ?? 0)) {
          finishLesson(newScore);
        } else {
          setStepIndex(nextIdx);
        }
      }, 1400);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setSelected(null); setLocked(false); setFeedback(null);
      }, 1200);
    }
  };

  // ── Render helpers ────────────────────────────────────────────────────────────
  const steps = lesson.steps ?? [];
  const currentStep = steps[stepIndex];

  return (
    <div className="flex flex-col items-center gap-3 px-3 sm:px-5 pb-5 sm:pb-7 select-none w-full">

      {/* Progress bar */}
      {phase === 'game' && (
        <div className="w-full max-w-md flex items-center gap-2 px-1">
          <div className="flex-1 h-2 bg-amber-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-amber-400"
              initial={{ width: 0 }}
              animate={{ width: `${isSortMode ? (placedCount / totalItems) * 100 : (stepIndex / totalItems) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <span className="text-xs font-black text-amber-800/60 font-sans">
            {isSortMode ? `${placedCount}/${totalItems}` : `${stepIndex + 1}/${totalItems}`}
          </span>
        </div>
      )}

      <AnimatePresence mode="wait">

        {/* ─── INTRO ─────────────────────────────────────────────────────────── */}
        {phase === 'intro' && (() => {
          const illustUrl = lesson.id === 'sort-by-color'
            ? '/assets/quiz/color-balls.png'
            : lesson.id === 'sort-by-size'
              ? '/assets/quiz/big-small.png'
              : '/assets/quiz/shapes.png';

          return (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-5 w-full max-w-md"
            >
              <div className="relative w-full rounded-3xl overflow-hidden min-h-[260px] flex flex-col justify-center items-center px-6 py-8 border-[3px] border-amber-200 bg-amber-50/40"
                style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.03)' }}>
                <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-32 h-32 flex items-center justify-center"
                  >
                    <img src={illustUrl} className="w-full h-full object-contain" alt={lesson.title} />
                  </motion.div>
                  <h3 className="text-2xl sm:text-3xl font-black text-amber-950 font-sans">{lesson.title}</h3>
                  <p className="text-sm text-amber-900/70 font-semibold px-4 font-sans leading-relaxed">{lesson.subtitle}</p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setPhase('game')}
                className="w-full max-w-xs py-4 rounded-2xl font-black text-white text-lg tracking-wide shadow-xl border-b-4 active:scale-95 font-sans transition-all bg-gradient-to-r from-amber-500 to-orange-500 border-amber-700"
              >
                Let&apos;s Start! 🚀
              </motion.button>
            </motion.div>
          );
        })()}

        {/* ─── SORT MODE ─────────────────────────────────────────────────────── */}
        {phase === 'game' && isSortMode && lesson.sortItems && lesson.sortTargets && (
          <motion.div
            key="sort-game"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 w-full max-w-md"
          >
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-black text-amber-950 font-sans">
                {lesson.icon} {lesson.title}
              </h3>
              <p className="text-xs text-amber-800/70 font-bold font-sans mt-0.5">
                Tap an item 👆, then tap its basket below
              </p>
            </div>

            {/* Item Tray */}
            <div className="relative w-full rounded-2xl overflow-hidden px-4 py-5 border-[3px] border-amber-200 bg-amber-50/20"
              style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.02)' }}>
              <div className="flex flex-wrap justify-center gap-3 min-h-[80px] items-center">
                {lesson.sortItems.map(item => {
                  const isPlaced = !!placed[item.id];
                  if (isPlaced) return null;
                  const isSel = selectedItem === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      whileTap={{ scale: 0.9 }}
                      animate={popItem === item.id ? { scale: [1, 1.4, 0], opacity: [1, 1, 0] } : isSel ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center gap-0.5 text-4xl border-2 transition-all shadow-sm bg-white
                        ${isSel ? 'bg-amber-100/60 border-amber-400 scale-110 shadow-amber-500/20' : 'border-amber-200 hover:bg-amber-50/50'}`}
                    >
                      {item.emoji}
                      <span className="text-[9px] font-black text-amber-900/60 font-sans leading-none">{item.label}</span>
                    </motion.button>
                  );
                })}
                {lesson.sortItems.every(i => placed[i.id]) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-2xl font-black text-amber-950"
                  >
                    🎉 All sorted!
                  </motion.div>
                )}
              </div>
            </div>

            {/* Target Baskets */}
            <div className="flex gap-3 w-full">
              {lesson.sortTargets.map(target => {
                const sortedHere = Object.entries(placed)
                  .filter(([, tId]) => tId === target.id)
                  .map(([itemId]) => lesson.sortItems!.find(i => i.id === itemId))
                  .filter(Boolean);

                const isActive = !!selectedItem;
                return (
                  <motion.button
                    key={target.id}
                    animate={shakeTarget === target.id ? { x: [0, -8, 8, -6, 6, 0] } : {}}
                    transition={{ duration: 0.35 }}
                    onClick={() => handleTargetClick(target.id)}
                    className={`flex-1 py-4 px-2 rounded-2xl border-[3px] flex flex-col items-center gap-2 min-h-[120px] transition-all
                      ${isActive ? 'bg-amber-100/50 border-amber-400 animate-pulse text-amber-900' : 'bg-white border-amber-200 text-amber-950 shadow-sm'}`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-2xl">{target.emoji}</span>
                      <span className="text-xs font-black font-sans">{target.label}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center bg-amber-50 rounded-xl px-2 py-2 min-h-[44px] w-full items-center border border-amber-200">
                      {sortedHere.length === 0 ? (
                        <span className="text-2xl opacity-25">🧺</span>
                      ) : (
                        sortedHere.map(item => item && (
                          <motion.span
                            key={item.id}
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="text-2xl"
                          >
                            {item.emoji}
                          </motion.span>
                        ))
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {selectedItem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs font-bold text-amber-800/60 font-sans text-center animate-bounce"
              >
                Now tap the correct basket 👇
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ─── MCQ MODE ──────────────────────────────────────────────────────── */}
        {phase === 'game' && !isSortMode && currentStep && (
          <motion.div
            key={`step-${stepIndex}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="flex flex-col items-center gap-4 w-full max-w-md"
          >
            {/* Question card */}
            <div className="relative w-full rounded-3xl overflow-hidden px-5 py-6 flex flex-col items-center gap-3 border-[3px] border-amber-200 bg-amber-50/40 min-h-[180px] justify-center"
              style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.02)' }}>

              <p className="relative z-10 text-xs font-black text-amber-800/60 uppercase tracking-wider font-sans">
                {currentStep.hint}
              </p>

              {currentStep.visual && (
                <div className="relative z-10 text-4xl sm:text-5xl text-amber-950 text-center leading-loose font-sans">
                  {currentStep.visual}
                </div>
              )}

              <h3 className="relative z-10 text-xl sm:text-2xl font-black text-amber-950 text-center font-sans leading-snug">
                {currentStep.question}
              </h3>
            </div>

            {/* Feedback toast */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  key="feedback"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`w-full py-3 rounded-2xl text-center font-black font-sans text-base border-2
                    ${feedback === 'correct' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-rose-50 border-rose-300 text-rose-800'}`}
                >
                  {feedback === 'correct' ? '⭐ Great job! Correct!' : '❌ Oops! Try again!'}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Options */}
            <div className={`grid gap-3 w-full ${currentStep.options.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {currentStep.options.map(opt => {
                const isSel = selected === opt.id;
                const showCorrect = isSel && opt.correct;
                const showWrong = isSel && !opt.correct;
                return (
                  <motion.button
                    key={opt.id}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => handleOptionTap(opt)}
                    className="flex flex-col items-center justify-center gap-2 py-5 px-3 rounded-2xl border-2 transition-all font-sans bg-[#fffdf9] border-amber-200 hover:bg-amber-50/50 text-amber-950 shadow-sm"
                    style={{
                      background: showCorrect ? 'rgba(16,185,129,0.1)' : showWrong ? 'rgba(239,68,68,0.1)' : '',
                      borderColor: showCorrect ? 'rgba(16,185,129,0.7)' : showWrong ? 'rgba(239,68,68,0.6)' : '',
                    }}
                  >
                    <span className="text-4xl sm:text-5xl leading-none drop-shadow">{opt.emoji}</span>
                    <span className="text-xs sm:text-sm font-black font-sans">{opt.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ─── DONE ──────────────────────────────────────────────────────────── */}
        {phase === 'done' && (
          <motion.div
            key="done"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4 py-6 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 0.8 }}
              className="text-7xl"
            >
              🎉
            </motion.div>
            <h3 className="text-2xl font-black text-amber-950 font-sans">{lesson.title}</h3>
            <p className="text-lg font-bold text-emerald-700 font-sans">
              Excellent! You got {score}/{totalItems}! 🌟
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
