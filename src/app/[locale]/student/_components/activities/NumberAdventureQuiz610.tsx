'use client';

import { useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NumberQuestion {
  id: string;
  type: 'mcq' | 'tap-count' | 'before-after';
  question: string;
  options: { id: string; emoji: string; label: string; correct: boolean }[];
  visual?: string; // Representation like 🐧🐧🐧
  requiredCount?: number;
  mascotText?: string;
}

interface NumberLessonConfig {
  id: string;
  title: string;
  steps: NumberQuestion[];
  matching?: {
    left: { id: string; label: string }[];
    right: { id: string; emoji: string; count: number; label: string }[];
  };
}

const LESSONS: Record<string, NumberLessonConfig> = {
  'numbers-6-7': {
    id: 'numbers-6-7',
    title: 'Numbers 6 & 7',
    steps: [
      {
        id: 'count-fish-6',
        type: 'mcq',
        question: 'How many colorful fish are swimming? 🐠',
        visual: '🐠 🐠 🐠\n🐠 🐠 🐠',
        mascotText: "Let's count the swimming fish! 🐠",
        options: [
          { id: '5', emoji: '5️⃣', label: '5', correct: false },
          { id: '6', emoji: '6️⃣', label: '6', correct: true },
          { id: '7', emoji: '7️⃣', label: '7', correct: false },
        ],
      },
      {
        id: 'count-balloons-7',
        type: 'mcq',
        question: 'Let\'s count the party balloons! 🎈',
        visual: '🎈 🎈 🎈 🎈\n  🎈 🎈 🎈',
        mascotText: "Super! Now count the colorful balloons! 🎈",
        options: [
          { id: '6', emoji: '6️⃣', label: '6', correct: false },
          { id: '7', emoji: '7️⃣', label: '7', correct: true },
          { id: '8', emoji: '8️⃣', label: '8', correct: false },
        ],
      },
    ],
  },
  'numbers-8-10': {
    id: 'numbers-8-10',
    title: 'Numbers 8 to 10',
    steps: [
      {
        id: 'count-penguins-8',
        type: 'mcq',
        question: 'Count the happy penguins! 🐧',
        visual: '🐧 🐧 🐧 🐧\n🐧 🐧 🐧 🐧',
        mascotText: 'Look at the penguins marching! 🐧',
        options: [
          { id: '7', emoji: '7️⃣', label: '7', correct: false },
          { id: '8', emoji: '8️⃣', label: '8', correct: true },
          { id: '9', emoji: '9️⃣', label: '9', correct: false },
        ],
      },
      {
        id: 'count-candy-9',
        type: 'mcq',
        question: 'Let\'s count the sweet candies! 🍬',
        visual: '🍬 🍬 🍬 🍬 🍬\n  🍬 🍬 🍬 🍬',
        mascotText: 'Count all the yummy candies! 🍬',
        options: [
          { id: '8', emoji: '8️⃣', label: '8', correct: false },
          { id: '9', emoji: '9️⃣', label: '9', correct: true },
          { id: '10', emoji: '🔟', label: '10', correct: false },
        ],
      },
      {
        id: 'count-stars-10',
        type: 'mcq',
        question: 'How many glowing stars do you see? ⭐',
        visual: '⭐ ⭐ ⭐ ⭐ ⭐\n⭐ ⭐ ⭐ ⭐ ⭐',
        mascotText: 'Wow! So many glowing stars! ⭐',
        options: [
          { id: '8', emoji: '8️⃣', label: '8', correct: false },
          { id: '9', emoji: '9️⃣', label: '9', correct: false },
          { id: '10', emoji: '🔟', label: '10', correct: true },
        ],
      },
    ],
  },
  'count-objects-1-10': {
    id: 'count-objects-1-10',
    title: 'Count Objects 1-10',
    steps: [
      {
        id: 'count-toys-4',
        type: 'mcq',
        question: 'Count the soft teddy bears! 🧸',
        visual: '🧸 🧸\n🧸 🧸',
        mascotText: 'Let\'s count the toys in the play room! 🧸',
        options: [
          { id: '3', emoji: '3️⃣', label: '3', correct: false },
          { id: '4', emoji: '4️⃣', label: '4', correct: true },
          { id: '5', emoji: '5️⃣', label: '5', correct: false },
        ],
      },
      {
        id: 'tap-ladybugs-7',
        type: 'tap-count',
        question: 'Tap 7 ladybugs to help them fly! 🐞',
        visual: '🐞 🐞 🐞 🐞 🐞 🐞 🐞',
        requiredCount: 7,
        mascotText: 'Tap each ladybug to count them! 🐞',
        options: [],
      },
    ],
  },
  'count-match-1-10': {
    id: 'count-match-1-10',
    title: 'Count & Match 1-10',
    steps: [],
    matching: {
      left: [
        { id: '3', label: '3' },
        { id: '6', label: '6' },
        { id: '8', label: '8' },
        { id: '10', label: '10' },
      ],
      right: [
        { id: '6', emoji: '🎈', count: 6, label: '🎈 🎈 🎈\n🎈 🎈 🎈' },
        { id: '10', emoji: '⭐', count: 10, label: '⭐ ⭐ ⭐ ⭐ ⭐\n⭐ ⭐ ⭐ ⭐ ⭐' },
        { id: '3', emoji: '🍎', count: 3, label: '🍎 🍎 🍎' },
        { id: '8', emoji: '🐧', count: 8, label: '🐧 🐧 🐧 🐧\n🐧 🐧 🐧 🐧' },
      ],
    },
  },
  'before-after': {
    id: 'before-after',
    title: 'Before & After',
    steps: [
      {
        id: 'number-after-6',
        type: 'before-after',
        question: 'What number comes AFTER 6? ➡️',
        visual: '6 ➔ ❓',
        mascotText: 'Let\'s find the next number block! ➡️',
        options: [
          { id: '5', emoji: '5️⃣', label: '5', correct: false },
          { id: '7', emoji: '7️⃣', label: '7', correct: true },
          { id: '8', emoji: '8️⃣', label: '8', correct: false },
        ],
      },
      {
        id: 'number-before-9',
        type: 'before-after',
        question: 'What number comes BEFORE 9? ⬅️',
        visual: '❓ ➔ 9',
        mascotText: 'Find the number that comes before! ⬅️',
        options: [
          { id: '7', emoji: '7️⃣', label: '7', correct: false },
          { id: '8', emoji: '8️⃣', label: '8', correct: true },
          { id: '10', emoji: '🔟', label: '10', correct: false },
        ],
      },
      {
        id: 'number-between-7-9',
        type: 'before-after',
        question: 'What number comes in between 7 and 9? ➔',
        visual: '7 ➔ ❓ ➔ 9',
        mascotText: 'Find the middle number! ➔',
        options: [
          { id: '6', emoji: '6️⃣', label: '6', correct: false },
          { id: '8', emoji: '8️⃣', label: '8', correct: true },
          { id: '10', emoji: '🔟', label: '10', correct: false },
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

export default function NumberAdventureQuiz610({ conceptKey = 'numbers-6-7', onComplete }: Props) {
  const lesson = LESSONS[conceptKey] || LESSONS['numbers-6-7'];
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
  const [tappedBugs, setTappedBugs] = useState<Set<number>>(new Set());

  // Match the following state
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({}); // leftId -> rightId

  const isMatching = conceptKey === 'count-match-1-10';
  const totalSteps = isMatching ? 1 : lesson.steps.length;

  const handleNextStep = () => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex(prev => prev + 1);
      setTappedBugs(new Set());
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

  const handleBugTap = (idx: number) => {
    if (tappedBugs.has(idx)) return;
    const nextTapped = new Set(tappedBugs);
    nextTapped.add(idx);
    setTappedBugs(nextTapped);

    if (nextTapped.size === (lesson.steps[stepIndex].requiredCount || 7)) {
      setScore(s => s + 1);
      setFeedbackType('success');
      setFeedbackMsg('⭐ "Yay! You counted all 7 ladybugs! 🐞"');
      setTimeout(() => {
        setFeedbackMsg(null);
        setFeedbackType(null);
        handleNextStep();
      }, 1800);
    }
  };

  // Match the following click logic
  const handleLeftMatchClick = (id: string) => {
    if (matchedPairs[id]) return;
    setSelectedLeftId(id);
  };

  const handleRightMatchClick = (id: string) => {
    if (!selectedLeftId) return;

    if (selectedLeftId === id) {
      // Correct Match!
      const nextMatched = { ...matchedPairs, [selectedLeftId]: id };
      setMatchedPairs(nextMatched);
      setSelectedLeftId(null);
      setScore(s => s + 1);

      if (Object.keys(nextMatched).length >= lesson.matching!.left.length) {
        setFeedbackType('success');
        setFeedbackMsg('⭐ "Incredible! All matches connected! 🎉"');
        setTimeout(() => {
          setFeedbackMsg(null);
          setFeedbackType(null);
          onComplete({
            score: (score + 1) * 10 + 20,
            max_score: 1 * 10 + 20,
            completion_data: { concept: lesson.id, score: score + 1 },
            time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
          });
        }, 1500);
      }
    } else {
      // Wrong Match
      setWrongShake(true);
      setTimeout(() => {
        setWrongShake(false);
        setSelectedLeftId(null);
      }, 500);
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
                  🔟
                </motion.div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-black text-white font-sans">{lesson.title} 🚀</h3>
                  <p className="text-sm text-white/70 font-medium px-4 font-sans leading-relaxed">
                    Ready to count numbers 6 to 10? Tap start below!
                  </p>
                </div>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowPrompt(false)}
              className="w-full max-w-xs py-3.5 rounded-2xl font-black text-white text-base tracking-wide bg-gradient-to-r from-emerald-500 to-teal-500 shadow-xl border-b-4 border-emerald-700 active:scale-95 font-sans"
            >
              Start Game! 🌟
            </motion.button>
          </motion.div>
        )}

        {/* ─── PHASE: GAMEPLAY ─── */}
        {!showPrompt && !isMatching && (() => {
          const q = lesson.steps[stepIndex];
          if (!q) return null;

          if (q.type === 'tap-count') {
            return (
              <motion.div
                key={`numbers610-tap-${stepIndex}`}
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
                    <p className="relative z-10 text-xs text-emerald-300 font-bold uppercase tracking-wider bg-emerald-950/50 px-3 py-1 rounded-full text-center">
                      {q.mascotText}
                    </p>
                  )}
                  <h3 className="relative z-10 text-xl sm:text-2xl font-black text-white text-center font-sans px-2 leading-snug">
                    {q.question}
                  </h3>
                  <div className="relative z-10 flex gap-1.5 text-xs text-white/50 font-bold bg-black/20 px-3 py-1 rounded-full">
                    Tapped: <span className="text-sky-400 font-black">{tappedBugs.size}</span> / {q.requiredCount}
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

                {/* Interactive Tapping Ladybugs */}
                <div className="flex gap-4 justify-center items-center py-6 flex-wrap max-w-sm">
                  {Array.from({ length: q.requiredCount || 7 }).map((_, idx) => {
                    const isTapped = tappedBugs.has(idx);
                    return (
                      <motion.button
                        key={idx}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleBugTap(idx)}
                        className={`w-14 h-14 rounded-full flex items-center justify-center text-4xl border-3 shadow-md transition-all
                          ${isTapped ? 'bg-emerald-500/20 border-emerald-400 opacity-60 scale-90' : 'bg-white/10 border-white/20 hover:bg-white/15'}`}
                      >
                        {isTapped ? '✨' : '🐞'}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            );
          }

          // MCQ and Before-After
          return (
            <motion.div
              key={`numbers610-quiz-${stepIndex}`}
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
                  <div className="relative z-10 text-4xl sm:text-5xl font-mono text-emerald-400 font-bold tracking-widest leading-normal whitespace-pre text-center">
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

        {/* ─── PHASE: INTERACTIVE COUNT & MATCHING ─── */}
        {!showPrompt && isMatching && (() => {
          const m = lesson.matching!;
          return (
            <motion.div
              key="interactive-matching-step"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 w-full"
            >
              <div className="w-full text-center">
                <h3 className="text-xl sm:text-2xl font-black text-white font-sans">Match the Numbers! ➔</h3>
                <p className="text-xs text-white/50 font-bold font-sans">Tap a number on the left, then tap its matching fruit basket on the right! 🍎</p>
              </div>

              {/* Feedback Overlay inside matching area */}
              <AnimatePresence>
                {feedbackMsg && (
                  <div className="absolute z-20 inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none rounded-3xl">
                    <div className="px-6 py-4 rounded-2xl font-black bg-[#163e32]/95 border-2 border-emerald-500 text-white shadow-2xl text-center">
                      <p className="text-lg font-black font-sans">{feedbackMsg}</p>
                    </div>
                  </div>
                )}
              </AnimatePresence>

              {/* Slate board for matches */}
              <div className="relative w-full rounded-3xl overflow-hidden min-h-[340px] flex gap-8 items-stretch px-4 py-6 border-[3px] border-[#2d4a2d] bg-gradient-to-b from-[#1a2e1a] to-[#0d1f0d] shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
                <BoardLines />

                {/* Left Side: Numbers */}
                <div className="flex-1 flex flex-col justify-around gap-2.5 relative z-10">
                  {m.left.map(leftItem => {
                    const isSelected = selectedLeftId === leftItem.id;
                    const isMatched = !!matchedPairs[leftItem.id];

                    return (
                      <button
                        key={leftItem.id}
                        onClick={() => handleLeftMatchClick(leftItem.id)}
                        className={`py-3.5 px-4 rounded-2xl border-2 font-black font-sans text-2xl flex items-center justify-center transition-all active:scale-95
                          ${isMatched 
                            ? 'bg-emerald-500/20 border-emerald-500/80 text-emerald-300 pointer-events-none' 
                            : isSelected 
                              ? 'bg-sky-500/30 border-sky-400 text-sky-200 scale-105 shadow-[0_0_15px_rgba(56,189,248,0.3)]' 
                              : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                          }`}
                      >
                        {leftItem.label} {isMatched && '✓'}
                      </button>
                    );
                  })}
                </div>

                {/* Right Side: Group items */}
                <motion.div animate={wrongShake ? { x: [0, -8, 8, -5, 5, 0] } : {}} transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col justify-around gap-2.5 relative z-10">
                  {m.right.map(rightItem => {
                    const isMatched = Object.values(matchedPairs).includes(rightItem.id);
                    const isSelectable = !!selectedLeftId;

                    return (
                      <button
                        key={rightItem.id}
                        onClick={() => handleRightMatchClick(rightItem.id)}
                        className={`p-2 min-h-[64px] rounded-2xl border-2 flex flex-col items-center justify-center transition-all active:scale-95
                          ${isMatched 
                            ? 'bg-emerald-500/20 border-emerald-500/80 text-emerald-300 pointer-events-none' 
                            : isSelectable 
                              ? 'bg-amber-500/10 border-amber-400/50 text-amber-200 animate-pulse' 
                              : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                          }`}
                      >
                        <span className="text-[10px] leading-tight font-mono whitespace-pre text-emerald-400 font-bold block">{rightItem.label}</span>
                        <span className="text-[9px] font-black text-white/50 mt-1 uppercase font-sans tracking-wide">Count: {rightItem.count}</span>
                      </button>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
