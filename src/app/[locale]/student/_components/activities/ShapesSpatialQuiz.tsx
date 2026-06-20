'use client';

import { useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShapesQuestion {
  id: string;
  type: 'mcq' | 'sort' | 'pattern' | 'builder';
  question: string;
  options: { id: string; emoji: string; label: string; correct: boolean }[];
  visual?: string; // Multiline layout or representation
  promptMascot?: string;
}

interface ShapesLessonConfig {
  id: string;
  title: string;
  steps: ShapesQuestion[];
  sorting?: {
    items: { id: string; emoji: string; targetId: string }[];
    targets: { id: string; label: string }[];
  };
  pattern?: {
    sequence: string[]; // ['🔴', '🔵', '🔴', '🔵']
    options: { emoji: string; correct: boolean }[];
    question: string;
  };
}

const LESSONS: Record<string, ShapesLessonConfig> = {
  'circle-square': {
    id: 'circle-square',
    title: 'Circle & Square',
    steps: [
      {
        id: 'circle-find',
        type: 'mcq',
        question: 'Which is the Round shape? ⭕',
        options: [
          { id: 'football', emoji: '⚽', label: 'Ball', correct: false },
          { id: 'circle-chalk', emoji: '⭕', label: 'Circle', correct: true },
          { id: 'cube', emoji: '🧊', label: 'Ice Cube', correct: false },
        ],
      },
      {
        id: 'square-find',
        type: 'mcq',
        question: 'Which shape is like a Box? ⬛',
        options: [
          { id: 'square-box', emoji: '⬛', label: 'Box', correct: true },
          { id: 'triangle-roof', emoji: '🔺', label: 'Triangle', correct: false },
          { id: 'circle-white', emoji: '⚪', label: 'Circle', correct: false },
        ],
      },
    ],
  },
  'triangle-rectangle': {
    id: 'triangle-rectangle',
    title: 'Triangle & Rectangle',
    steps: [
      {
        id: 'house-roof',
        type: 'mcq',
        question: 'What shape is the Roof? 🔺',
        visual: '   🔺\n ▭▭▭',
        options: [
          { id: 'roof-tri', emoji: '🔺', label: 'Triangle', correct: true },
          { id: 'door-rect', emoji: '▭', label: 'Rectangle', correct: false },
        ],
      },
      {
        id: 'house-door',
        type: 'mcq',
        question: 'What shape is the Door? ▭',
        visual: '   🔺\n ▭▭▭',
        options: [
          { id: 'roof-tri', emoji: '🔺', label: 'Triangle', correct: false },
          { id: 'door-rect', emoji: '▭', label: 'Rectangle', correct: true },
        ],
      },
    ],
  },
  'shapes-around': {
    id: 'shapes-around',
    title: 'Shapes Around Us',
    steps: [
      {
        id: 'real-world-donut',
        type: 'mcq',
        question: 'What shape is a yummy Donut? 🍩',
        options: [
          { id: 'circle', emoji: '⭕', label: 'Circle', correct: true },
          { id: 'square', emoji: '⬛', label: 'Square', correct: false },
        ],
      },
      {
        id: 'real-world-gift',
        type: 'mcq',
        question: 'What shape is a birthday Gift Box? 🎁',
        options: [
          { id: 'circle', emoji: '⭕', label: 'Circle', correct: false },
          { id: 'square', emoji: '⬛', label: 'Square', correct: true },
        ],
      },
      {
        id: 'real-world-wheel',
        type: 'mcq',
        question: 'What shape is a school Bus Wheel? 🛞',
        options: [
          { id: 'circle', emoji: '⭕', label: 'Circle', correct: true },
          { id: 'square', emoji: '⬛', label: 'Square', correct: false },
        ],
      },
      {
        id: 'real-world-watermelon',
        type: 'mcq',
        question: 'What shape is a juicy Watermelon slice? 🍉',
        options: [
          { id: 'triangle', emoji: '🔺', label: 'Triangle', correct: true },
          { id: 'rectangle', emoji: '▭', label: 'Rectangle', correct: false },
        ],
      },
      {
        id: 'real-world-chocolate',
        type: 'mcq',
        question: 'What shape is a sweet Chocolate Bar? 🍫',
        options: [
          { id: 'triangle', emoji: '🔺', label: 'Triangle', correct: false },
          { id: 'rectangle', emoji: '▭', label: 'Rectangle', correct: true },
        ],
      },
    ],
  },
  'find-shape': {
    id: 'find-shape',
    title: 'Shape Detective',
    steps: [
      {
        id: 'find-pizza-tri',
        type: 'mcq',
        question: 'Can you find the Pointy Triangle? 🍕',
        options: [
          { id: 'pizza', emoji: '🍕', label: 'Pizza', correct: true },
          { id: 'ball', emoji: '⚽', label: 'Ball', correct: false },
          { id: 'door', emoji: '🚪', label: 'Door', correct: false },
        ],
      },
      {
        id: 'find-ball-circle',
        type: 'mcq',
        question: 'Can you find the Round Circle? ⚽',
        options: [
          { id: 'door', emoji: '🚪', label: 'Door', correct: false },
          { id: 'kite', emoji: '🪁', label: 'Kite', correct: false },
          { id: 'ball', emoji: '⚽', label: 'Ball', correct: true },
        ],
      },
      {
        id: 'find-door-rect',
        type: 'mcq',
        question: 'Can you find the Tall Rectangle? 🚪',
        options: [
          { id: 'pizza', emoji: '🍕', label: 'Pizza', correct: false },
          { id: 'door', emoji: '🚪', label: 'Door', correct: true },
          { id: 'ball', emoji: '⚽', label: 'Ball', correct: false },
        ],
      },
    ],
  },
  'above-below': {
    id: 'above-below',
    title: 'Above & Below',
    steps: [
      {
        id: 'above-below-bird',
        type: 'mcq',
        question: 'Is the Bird ABOVE the tree? 🌳',
        visual: '  🐦\n  🌳',
        options: [
          { id: 'above', emoji: '⬆️', label: 'Yes (Above)', correct: true },
          { id: 'below', emoji: '⬇️', label: 'No (Below)', correct: false },
        ],
      },
      {
        id: 'above-below-fish',
        type: 'mcq',
        question: 'Is the Fish BELOW the boat? ⛵',
        visual: '  ⛵\n  🐟',
        options: [
          { id: 'below', emoji: '⬇️', label: 'Yes (Below)', correct: true },
          { id: 'above', emoji: '⬆️', label: 'No (Above)', correct: false },
        ],
      },
    ],
  },
  'top-bottom': {
    id: 'top-bottom',
    title: 'Top & Bottom',
    steps: [
      {
        id: 'top-star',
        type: 'mcq',
        question: 'Is the Star at the TOP of the tree? 🎄',
        visual: '  ⭐\n  🎄',
        options: [
          { id: 'top', emoji: '⬆️', label: 'Yes (Top)', correct: true },
          { id: 'bottom', emoji: '⬇️', label: 'No (Bottom)', correct: false },
        ],
      },
      {
        id: 'bottom-root',
        type: 'mcq',
        question: 'Is the Seedling at the BOTTOM of the tree? 🌳',
        visual: '  🌳\n  🌱',
        options: [
          { id: 'bottom', emoji: '⬇️', label: 'Yes (Bottom)', correct: true },
          { id: 'top', emoji: '⬆️', label: 'No (Top)', correct: false },
        ],
      },
    ],
  },
  'left-right': {
    id: 'left-right',
    title: 'Left & Right',
    steps: [
      {
        id: 'left-right-rabbit',
        type: 'mcq',
        question: 'Is the Rabbit on the LEFT side? 🐰',
        visual: '🐰    🐢',
        options: [
          { id: 'left', emoji: '👈', label: 'Yes (Left)', correct: true },
          { id: 'right', emoji: '👉', label: 'No (Right)', correct: false },
        ],
      },
      {
        id: 'left-right-car',
        type: 'mcq',
        question: 'Is the Car on the RIGHT side? 🚗',
        visual: '🚲    🚗',
        options: [
          { id: 'right', emoji: '👉', label: 'Yes (Right)', correct: true },
          { id: 'left', emoji: '👈', label: 'No (Left)', correct: false },
        ],
      },
    ],
  },
  'near-far': {
    id: 'near-far',
    title: 'Near & Far',
    steps: [
      {
        id: 'near-butterfly',
        type: 'mcq',
        question: 'Is the Butterfly NEAR the flower? 🌸',
        visual: '🦋🌸       🏡',
        options: [
          { id: 'near', emoji: '👉👈', label: 'Yes (Near)', correct: true },
          { id: 'far', emoji: '👈👉', label: 'No (Far)', correct: false },
        ],
      },
      {
        id: 'far-sun',
        type: 'mcq',
        question: 'Is the Sun FAR from the cloud? ☁️',
        visual: '☀️              ☁️',
        options: [
          { id: 'far', emoji: '👈👉', label: 'Yes (Far)', correct: true },
          { id: 'near', emoji: '👉👈', label: 'No (Near)', correct: false },
        ],
      },
    ],
  },
  'open-close': {
    id: 'open-close',
    title: 'Open & Close',
    steps: [
      {
        id: 'open-lock',
        type: 'mcq',
        question: 'Is the Lock OPEN? 🔓',
        visual: '🔓 📦',
        options: [
          { id: 'open', emoji: '🔓', label: 'Yes (Open)', correct: true },
          { id: 'closed', emoji: '🔒', label: 'No (Closed)', correct: false },
        ],
      },
      {
        id: 'closed-book',
        type: 'mcq',
        question: 'Is the Book CLOSED? 📕',
        visual: '📕',
        options: [
          { id: 'closed', emoji: '📕', label: 'Yes (Closed)', correct: true },
          { id: 'open', emoji: '📖', label: 'No (Open)', correct: false },
        ],
      },
    ],
  },
  'shape-sorting': {
    id: 'shape-sorting',
    title: 'Shape Sorting',
    steps: [],
    sorting: {
      items: [
        { id: 'c1', emoji: '⭕', targetId: 'round' },
        { id: 's1', emoji: '⬛', targetId: 'boxy' },
        { id: 't1', emoji: '🔺', targetId: 'round' },
        { id: 'r1', emoji: '▭', targetId: 'boxy' },
      ],
      targets: [
        { id: 'round', label: 'Round / Pointy' },
        { id: 'boxy', label: 'Boxy Shapes' },
      ],
    },
  },
  'color-patterns': {
    id: 'color-patterns',
    title: 'Color Patterns 🌈',
    steps: [
      {
        id: 'cp1',
        type: 'pattern',
        question: 'What color comes NEXT? 🔴 🔵 🔴 🔵 ...',
        visual: '🔴  🔵  🔴  🔵  ❓',
        promptMascot: 'It goes Red → Blue → Red → Blue...',
        options: [
          { id: 'red',  emoji: '🔴', label: 'Red',  correct: true  },
          { id: 'blue', emoji: '🔵', label: 'Blue', correct: false },
          { id: 'yel',  emoji: '🟡', label: 'Yellow', correct: false },
        ],
      },
      {
        id: 'cp2',
        type: 'pattern',
        question: 'What comes NEXT? 🟡 🟡 🟢 🟡 🟡 ...',
        visual: '🟡  🟡  🟢  🟡  🟡  ❓',
        promptMascot: 'Two yellows then one green!',
        options: [
          { id: 'yel', emoji: '🟡', label: 'Yellow', correct: false },
          { id: 'grn', emoji: '🟢', label: 'Green',  correct: true  },
          { id: 'red', emoji: '🔴', label: 'Red',    correct: false },
        ],
      },
      {
        id: 'cp3',
        type: 'pattern',
        question: 'What comes NEXT? 🔴 🔴 🔵 🔴 🔴 ...',
        visual: '🔴  🔴  🔵  🔴  🔴  ❓',
        promptMascot: 'Two reds then one blue!',
        options: [
          { id: 'red',  emoji: '🔴', label: 'Red',  correct: false },
          { id: 'blue', emoji: '🔵', label: 'Blue', correct: true  },
          { id: 'grn',  emoji: '🟢', label: 'Green', correct: false },
        ],
      },
      {
        id: 'cp4',
        type: 'pattern',
        question: 'What comes NEXT? 🟠 🟣 🟡 🟠 🟣 ...',
        visual: '🟠  🟣  🟡  🟠  🟣  ❓',
        promptMascot: 'Three colors repeating: Orange, Purple, Yellow!',
        options: [
          { id: 'ora', emoji: '🟠', label: 'Orange', correct: false },
          { id: 'pur', emoji: '🟣', label: 'Purple', correct: false },
          { id: 'yel', emoji: '🟡', label: 'Yellow', correct: true  },
        ],
      },
      {
        id: 'cp5',
        type: 'pattern',
        question: 'What comes NEXT? 🔴 🔴 🔵 🔵 🔴 🔴 ...',
        visual: '🔴  🔴  🔵  🔵  🔴  🔴  ❓',
        promptMascot: 'Two reds, two blues — keep going!',
        options: [
          { id: 'red',  emoji: '🔴', label: 'Red',  correct: false },
          { id: 'blue', emoji: '🔵', label: 'Blue', correct: true  },
          { id: 'grn',  emoji: '🟢', label: 'Green', correct: false },
        ],
      },
    ],
  },
  'shape-patterns': {
    id: 'shape-patterns',
    title: 'Shape Patterns 🔷',
    steps: [
      {
        id: 'sp1',
        type: 'pattern',
        question: 'What shape comes NEXT? ⭕ ⬛ ⭕ ⬛ ...',
        visual: '⭕  ⬛  ⭕  ⬛  ❓',
        promptMascot: 'Circle → Square → Circle → Square...',
        options: [
          { id: 'cir', emoji: '⭕', label: 'Circle', correct: true  },
          { id: 'sq',  emoji: '⬛', label: 'Square', correct: false },
          { id: 'tri', emoji: '🔺', label: 'Triangle', correct: false },
        ],
      },
      {
        id: 'sp2',
        type: 'pattern',
        question: 'What comes NEXT? 🔺 🔺 ⭕ 🔺 🔺 ...',
        visual: '🔺  🔺  ⭕  🔺  🔺  ❓',
        promptMascot: 'Two triangles then one circle!',
        options: [
          { id: 'tri', emoji: '🔺', label: 'Triangle', correct: false },
          { id: 'cir', emoji: '⭕', label: 'Circle',   correct: true  },
          { id: 'sq',  emoji: '⬛', label: 'Square',   correct: false },
        ],
      },
      {
        id: 'sp3',
        type: 'pattern',
        question: 'What comes NEXT? ⭕ 🔺 ⬛ ⭕ 🔺 ...',
        visual: '⭕  🔺  ⬛  ⭕  🔺  ❓',
        promptMascot: 'Circle, Triangle, Square — three shapes repeating!',
        options: [
          { id: 'cir', emoji: '⭕', label: 'Circle',   correct: false },
          { id: 'tri', emoji: '🔺', label: 'Triangle', correct: false },
          { id: 'sq',  emoji: '⬛', label: 'Square',   correct: true  },
        ],
      },
    ],
  },
  'number-patterns': {
    id: 'number-patterns',
    title: 'Number Patterns 🔢',
    steps: [
      {
        id: 'np1',
        type: 'pattern',
        question: 'What number comes NEXT? 1️⃣ 2️⃣ 1️⃣ 2️⃣ ...',
        visual: '1️⃣  2️⃣  1️⃣  2️⃣  ❓',
        promptMascot: 'One, Two, One, Two — keep going!',
        options: [
          { id: 'one', emoji: '1️⃣', label: 'One', correct: true  },
          { id: 'two', emoji: '2️⃣', label: 'Two', correct: false },
          { id: 'thr', emoji: '3️⃣', label: 'Three', correct: false },
        ],
      },
      {
        id: 'np2',
        type: 'pattern',
        question: 'What comes NEXT? 1️⃣ 2️⃣ 3️⃣ 1️⃣ 2️⃣ ...',
        visual: '1️⃣  2️⃣  3️⃣  1️⃣  2️⃣  ❓',
        promptMascot: 'One, Two, Three — then it repeats!',
        options: [
          { id: 'one', emoji: '1️⃣', label: 'One', correct: false },
          { id: 'two', emoji: '2️⃣', label: 'Two', correct: false },
          { id: 'thr', emoji: '3️⃣', label: 'Three', correct: true  },
        ],
      },
    ],
  },
  // Legacy key \u2014 redirect handled by routing
  'patterns': {
    id: 'color-patterns',
    title: 'Color Patterns 🌈',
    steps: [],
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

export default function ShapesSpatialQuiz({ conceptKey = 'circle-square', onComplete }: Props) {
  const lesson = LESSONS[conceptKey] || LESSONS['circle-square'];
  const startTime = useRef(Date.now());

  const [stepIndex, setStepIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(true);

  // States
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [wrongShake, setWrongShake] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'success' | 'fail' | null>(null);
  const [score, setScore] = useState(0);

  // Custom sorting state
  const [selectedSortItem, setSelectedSortItem] = useState<string | null>(null);
  const [matchedSortPairs, setMatchedSortPairs] = useState<Record<string, string>>({}); // item.id -> target.id

  const isSorting = conceptKey === 'shape-sorting';
  const isLegacyPatterns = conceptKey === 'patterns'; // old single-question patterns
  const totalSteps = isSorting ? 1 : isLegacyPatterns ? 1 : lesson.steps.length;

  const handleNextStep = () => {
    if (stepIndex < totalSteps - 1) {
      setStepIndex(prev => prev + 1);
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
      setFeedbackMsg('⭐ "Super! You found it!"');
      setTimeout(() => {
        setSelectedOpt(null);
        setFeedbackMsg(null);
        setFeedbackType(null);
        handleNextStep();
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

  // Sorting handlers
  const handleSortItemClick = (id: string) => {
    if (matchedSortPairs[id]) return;
    setSelectedSortItem(id);
  };

  const handleSortTargetClick = (targetId: string) => {
    if (!selectedSortItem || !lesson.sorting) return;
    const item = lesson.sorting.items.find(i => i.id === selectedSortItem);
    if (item && item.targetId === targetId) {
      const nextMatched = { ...matchedSortPairs, [selectedSortItem]: targetId };
      setMatchedSortPairs(nextMatched);
      setSelectedSortItem(null);
      setScore(s => s + 1);
      // Check if sorting is fully done
      if (Object.keys(nextMatched).length >= lesson.sorting.items.length) {
        setTimeout(() => {
          onComplete({
            score: (score + 1) * 10 + 20,
            max_score: 1 * 10 + 20,
            completion_data: { concept: lesson.id, score: score + 1 },
            time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
          });
        }, 1000);
      }
    } else {
      setWrongShake(true);
      setTimeout(() => {
        setWrongShake(false);
        setSelectedSortItem(null);
      }, 500);
    }
  };

  // Render sub-components
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
            <div className="relative w-full rounded-3xl overflow-hidden min-h-[300px] flex flex-col justify-center items-center px-6 py-8 border-[3px] border-amber-200 bg-amber-50/40"
              style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.03)' }}>
              <div className="relative z-10 flex flex-col items-center gap-5 text-center">
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="w-32 h-32 flex items-center justify-center">
                  <img src="/assets/quiz/shapes.png" className="w-full h-full object-contain" alt="Shapes Game" />
                </motion.div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-black text-amber-950 font-sans">{lesson.title} 🚀</h3>
                  <p className="text-sm text-amber-900/70 font-medium px-4 font-sans leading-relaxed">
                    Ready to play shapes and placement missions? Tap start below!
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

        {/* ─── PHASE: MCQ QUIZ STEPS (also handles color-patterns, shape-patterns, number-patterns) ─── */}
        {!showPrompt && !isSorting && !isLegacyPatterns && (() => {
          const q = lesson.steps[stepIndex];
          if (!q) return null;
          return (
            <motion.div
              key={`shapes-quiz-${stepIndex}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 w-full"
            >
              {/* Light Board Card */}
              <div className="relative w-full rounded-3xl overflow-hidden px-4 py-5 flex flex-col items-center justify-center gap-4 border-[3px] border-amber-200 bg-amber-50/40"
                style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.02)' }}>
                
                {q.promptMascot && (
                  <p className="relative z-10 text-[10px] font-black text-amber-800 uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full text-center border border-amber-200">
                    💡 {q.promptMascot}
                  </p>
                )}

                {q.visual && (
                  <div className="relative z-10 text-5xl sm:text-6xl font-sans text-amber-950 text-center tracking-widest my-2 select-none filter drop-shadow-sm leading-loose">
                    {q.visual}
                  </div>
                )}

                <h3 className="relative z-10 text-xl sm:text-2xl font-black text-amber-950 text-center font-sans px-2 leading-snug">
                  {q.question}
                </h3>
              </div>

              {/* Feedback Overlay inside options */}
              <AnimatePresence>
                {feedbackMsg && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute z-20 inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm pointer-events-none rounded-3xl">
                    <div className="px-6 py-4 rounded-2xl font-black bg-emerald-50 border-2 border-emerald-300 text-emerald-800 shadow-2xl text-center">
                      <p className="text-lg font-black font-sans">{feedbackMsg}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Options Grid */}
              <motion.div animate={wrongShake ? { x: [0, -8, 8, -5, 5, 0] } : {}} transition={{ duration: 0.3 }}
                className={`grid gap-4 w-full max-w-md ${q.options.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {q.options.map(opt => {
                  const isSelected = selectedOpt === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleQuizTap(opt)}
                      className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl transition-all active:scale-95 relative overflow-hidden bg-white/10 hover:bg-white/15 border-2 border-white/10"
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
                      <span className="text-5xl sm:text-6xl leading-none drop-shadow-md">{opt.emoji}</span>
                      <span className="text-xs sm:text-sm font-black text-white/95 font-sans">{opt.label}</span>
                    </button>
                  );
                })}
              </motion.div>
            </motion.div>
          );
        })()}

        {/* ─── PHASE: SHAPE SORTING ─── */}
        {!showPrompt && isSorting && (() => {
          const s = lesson.sorting!;
          return (
            <motion.div
              key="sorting-step"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 w-full"
            >
              <div className="w-full text-center">
                <h3 className="text-xl sm:text-2xl font-black text-amber-950 font-sans">Sort the Shapes! 🧺</h3>
                <p className="text-xs text-amber-800/70 font-bold font-sans">Tap a shape at the top, then tap the correct basket at the bottom! 👇</p>
              </div>

              <div className="relative w-full rounded-3xl overflow-hidden min-h-[300px] flex flex-col justify-between items-center px-4 py-6 border-[3px] border-amber-200 bg-amber-50/20"
                style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.02)' }}>

                {/* Top Shape bubbles */}
                <div className="relative z-10 flex gap-4 min-h-[80px] justify-center items-center">
                  {s.items.map(item => {
                    const isSelected = selectedSortItem === item.id;
                    const isMatched = !!matchedSortPairs[item.id];
                    if (isMatched) return null;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSortItemClick(item.id)}
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center text-5xl border-2 transition-all shadow-sm active:scale-95 bg-white
                          ${isSelected ? 'bg-amber-100/60 border-amber-400 scale-105 shadow-md shadow-amber-500/20' : 'border-amber-200'}`}
                      >
                        {item.emoji}
                      </button>
                    );
                  })}
                </div>

                {/* Baskets */}
                <div className="relative z-10 flex gap-6 w-full max-w-sm justify-center mt-4">
                  {s.targets.map(target => {
                    const sorted = Object.entries(matchedSortPairs)
                      .filter(([_, tId]) => tId === target.id)
                      .map(([itemId]) => s.items.find(i => i.id === itemId));

                    const isActive = !!selectedSortItem;

                    return (
                      <button
                        key={target.id}
                        onClick={() => handleSortTargetClick(target.id)}
                        className={`flex-1 py-4 px-2 rounded-2xl border-[3px] flex flex-col items-center justify-between min-h-[130px] transition-all
                          ${isActive ? 'bg-amber-100/50 border-amber-400 animate-pulse text-amber-900' : 'bg-white border-amber-200 text-amber-950 shadow-sm'}`}
                      >
                        <span className="font-black font-sans text-sm sm:text-base text-amber-950">{target.label}</span>
                        <div className="flex flex-wrap gap-1 bg-amber-50 rounded-xl px-2 py-1 min-h-[40px] items-center justify-center border border-amber-200">
                          {sorted.length === 0 ? (
                            <span className="text-3xl opacity-35">🧺</span>
                          ) : (
                            sorted.map(item => item && (
                              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} key={item.id} className="text-2xl">
                                {item.emoji}
                              </motion.span>
                            ))
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-amber-800/60 uppercase">Sort here</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })()}

        {/* ─── PHASE: LEGACY PATTERNS (single-step, kept for backward compat) ─── */}
        {!showPrompt && isLegacyPatterns && (() => {
          const p = lesson.pattern!;
          return (
            <motion.div
              key="pattern-step"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 w-full"
            >
              {/* Light Board Card */}
              <div className="relative w-full rounded-3xl overflow-hidden px-4 py-6 flex flex-col items-center justify-center gap-5 border-[3px] border-amber-200 bg-amber-50/20 min-h-[180px]"
                style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.02)' }}>

                {/* Render sequence */}
                <div className="relative z-10 flex gap-3 text-5xl justify-center items-center py-2 bg-white rounded-2xl px-4 border border-amber-200">
                  {p.sequence.map((emoji, idx) => (
                    <span key={idx}>{emoji}</span>
                  ))}
                  <span className="text-amber-800 animate-pulse">❓</span>
                </div>

                <h3 className="relative z-10 text-lg sm:text-xl font-black text-amber-950 text-center font-sans px-2">
                  {p.question}
                </h3>
              </div>

              {/* Feedback Overlay inside options */}
              <AnimatePresence>
                {feedbackMsg && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute z-20 inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm pointer-events-none rounded-3xl">
                    <div className="px-6 py-4 rounded-2xl font-black bg-emerald-50 border-2 border-emerald-300 text-emerald-800 shadow-2xl text-center">
                      <p className="text-lg font-black font-sans">{feedbackMsg}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pattern options */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                {p.options.map((opt, idx) => {
                  const isSelected = selectedOpt === opt.emoji;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (selectedOpt) return;
                        setSelectedOpt(opt.emoji);
                        if (opt.correct) {
                          setScore(s => s + 1);
                          setFeedbackType('success');
                          setFeedbackMsg('⭐ "Super! You found it!"');
                          setTimeout(() => {
                            setSelectedOpt(null);
                            setFeedbackMsg(null);
                            setFeedbackType(null);
                            onComplete({
                              score: (score + 1) * 10 + 20,
                              max_score: 1 * 10 + 20,
                              completion_data: { concept: lesson.id, score: score + 1 },
                              time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
                            });
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
                      }}
                      className="flex flex-col items-center justify-center p-6 rounded-2xl transition-all active:scale-95 bg-[#fffdf9] border-2 border-amber-200 shadow-sm"
                      style={{
                        ...(isSelected && opt.correct && {
                          background: 'rgba(16,185,129,0.1)',
                          borderColor: 'rgba(16,185,129,0.7)',
                        }),
                        ...(isSelected && !opt.correct && {
                          background: 'rgba(239,68,68,0.1)',
                          borderColor: 'rgba(239,68,68,0.6)',
                        })
                      }}
                    >
                      <span className="text-6xl leading-none">{opt.emoji}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
