'use client';

import { useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WordEntry {
  word: string;
  emoji: string;
  color: string;
  letterHint?: string; // e.g. "அ" for "அம்மா"
}

// 1. உயிரெழுத்து சார்ந்த சொற்கள் (Vowel-related words)
const SET_1_VOWELS: WordEntry[] = [
  { letterHint: 'அ', word: 'அம்மா', emoji: '👩', color: '#f97316' },
  { letterHint: 'ஆ', word: 'ஆடு', emoji: '🐐', color: '#eab308' },
  { letterHint: 'இ', word: 'இலை', emoji: '🍃', color: '#22c55e' },
  { letterHint: 'ஈ', word: 'ஈ', emoji: '🪰', color: '#10b981' },
  { letterHint: 'உ', word: 'உரல்', emoji: '🥣', color: '#06b6d4' },
  { letterHint: 'ஊ', word: 'ஊசி', emoji: '🪡', color: '#6366f1' },
  { letterHint: 'எ', word: 'எலி', emoji: '🐭', color: '#e879f9' },
  { letterHint: 'ஏ', word: 'ஏணி', emoji: '🪜', color: '#c084fc' },
  { letterHint: 'ஐ', word: 'ஐந்து', emoji: '5️⃣', color: '#f472b6' },
  { letterHint: 'ஒ', word: 'ஒட்டகம்', emoji: '🐪', color: '#fb923c' },
  { letterHint: 'ஓ', word: 'ஓநாய்', emoji: '🐺', color: '#34d399' },
  { letterHint: 'ஔ', word: 'ஔவை', emoji: '👵', color: '#60a5fa' },
];

// 2. Simple 2 letter / easy words
const SET_2_EASY: WordEntry[] = [
  { word: 'அம்மா', emoji: '👩', color: '#ec4899' },
  { word: 'அparent', emoji: '👨', color: '#3b82f6' }, // Note: using அப்பா
  { word: 'அப்பா', emoji: '👨', color: '#3b82f6' },
  { word: 'அக்கா', emoji: '👧', color: '#10b981' },
  { word: 'அண்ணா', emoji: '👦', color: '#f59e0b' },
  { word: 'அம்மி', emoji: '🪨', color: '#6b7280' },
  { word: 'ஆடு', emoji: '🐐', color: '#84cc16' },
  { word: 'மாடு', emoji: '🐄', color: '#a855f7' },
  { word: 'பூ', emoji: '🌸', color: '#ec4899' },
  { word: 'காய்', emoji: '🥦', color: '#22c55e' },
  { word: 'பழம்', emoji: '🍎', color: '#ef4444' },
  { word: 'நீர்', emoji: '💧', color: '#06b6d4' },
  { word: 'பால்', emoji: '🥛', color: '#f3f4f6' },
  { word: 'வீடு', emoji: '🏠', color: '#eab308' },
  { word: 'மரம்', emoji: '🌳', color: '#10b981' },
  { word: 'இலை', emoji: '🍃', color: '#22c55e' },
  { word: 'கல்', emoji: '🪨', color: '#9ca3af' },
  { word: 'மண்', emoji: '🪵', color: '#78350f' },
  { word: 'மீன்', emoji: '🐟', color: '#3b82f6' },
  { word: 'பறவை', emoji: '🐦', color: '#06b6d4' },
  { word: 'நாய்', emoji: '🐶', color: '#f97316' },
  { word: 'பூனை', emoji: '🐱', color: '#fb923c' },
].filter(e => e.word !== 'அparent'); // Clean duplicate dummy helper

// 3. Animals
const SET_3_ANIMALS: WordEntry[] = [
  { word: 'நாய்', emoji: '🐶', color: '#f97316' },
  { word: 'பூனை', emoji: '🐱', color: '#fb923c' },
  { word: 'ஆடு', emoji: '🐐', color: '#eab308' },
  { word: 'மாடு', emoji: '🐄', color: '#a855f7' },
  { word: 'யானை', emoji: '🐘', color: '#8b5cf6' },
  { word: 'புலி', emoji: '🐯', color: '#f97316' },
  { word: 'குரங்கு', emoji: '🐵', color: '#854d0e' },
];

// 4. Things around them
const SET_4_THINGS: WordEntry[] = [
  { word: 'பேனா', emoji: '🖊️', color: '#3b82f6' },
  { word: 'புத்தகம்', emoji: '📖', color: '#ef4444' },
  { word: 'பை', emoji: '🎒', color: '#ec4899' },
  { word: 'பந்து', emoji: '⚽', color: '#22c55e' },
  { word: 'கார்', emoji: '🚗', color: '#f43f5e' },
  { word: 'பொம்மை', emoji: '🧸', color: '#fb923c' },
];

const WORD_SETS: Record<string, WordEntry[]> = {
  'set-1': SET_1_VOWELS,
  'set-2': SET_2_EASY,
  'set-3': SET_3_ANIMALS,
  'set-4': SET_4_THINGS,
};

// Global pool for distractors during quiz phase
const GLOBAL_DISTRACTORS = [...SET_1_VOWELS, ...SET_2_EASY, ...SET_3_ANIMALS, ...SET_4_THINGS];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function BoardLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      {[0.33, 0.66].map((y) => (
        <line key={y} x1="4%" y1={`${y * 100}%`} x2="96%" y2={`${y * 100}%`}
          stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="6 5" />
      ))}
    </svg>
  );
}

function StarBurst() {
  const stars = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i, angle: (i / 12) * 360, delay: (i * 0.05).toFixed(2),
      color: ['#fbbf24', '#f97316', '#22c55e', '#06b6d4', '#a78bfa', '#f472b6'][i % 6],
    })), []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {stars.map(s => (
        <div key={s.id} className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full"
          style={{
            background: s.color,
            animation: `starShoot 0.6s ${s.delay}s ease-out forwards`,
            transformOrigin: '0 0',
          }} />
      ))}
      <style>{`
        @keyframes starShoot {
          0% { opacity: 1; transform: translate(-50%, -50%) rotate(var(--a)) translateX(0) scale(1.2); }
          100% { opacity: 0; transform: translate(-50%, -50%) rotate(var(--a)) translateX(100px) scale(0); }
        }
      `}</style>
    </div>
  );
}

/* ─── Phase: Showcase ─── */
interface ShowcaseProps { entry: WordEntry; index: number; total: number; onNext: () => void; }

function Showcase({ entry, index, total, onNext }: ShowcaseProps) {
  return (
    <motion.div key={`show-${entry.word}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.28, ease: 'easeOut' }}
      className="flex flex-col items-center gap-4 w-full">
      
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}>
        <span className="text-xs font-black text-white/60 tracking-widest uppercase">படம் அறிதல்</span>
        <span className="text-xs font-bold text-white/40">{index + 1} / {total}</span>
      </div>

      {/* Blackboard container */}
      <div className="relative w-full rounded-2xl overflow-hidden min-h-[280px] flex flex-col justify-center items-center" style={{
        background: 'linear-gradient(160deg, #1a2e1a 0%, #0d1f0d 100%)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
        border: '3px solid #2d4a2d',
      }}>
        <BoardLines />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\'%3E%3Crect width=\'4\' height=\'4\' fill=\'%23ffffff10\'/%3E%3Crect width=\'2\' height=\'2\' fill=\'%23ffffff08\'/%3E%3C/svg%3E")' }} />

        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-6 text-center">
          
          {/* Optional Vowel Letter Hint badge */}
          {entry.letterHint && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 px-3 py-1 bg-white/10 rounded-lg border border-white/20 text-emerald-400 font-black text-lg font-sans">
              {entry.letterHint}
            </motion.div>
          )}

          {/* Big Emoji with float/bounce animation */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-7xl sm:text-8xl drop-shadow-xl select-none mt-2"
          >
            {entry.emoji}
          </motion.div>

          {/* Word Label */}
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-5 tracking-wide" style={{
            fontFamily: '"Noto Sans Tamil", "Latha", sans-serif',
            textShadow: `0 0 24px ${entry.color}70, 0 2px 5px rgba(0,0,0,0.5)`
          }}>
            {entry.word}
          </h2>
        </div>
      </div>

      {/* Next Button */}
      <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.96 }} onClick={onNext}
        className="w-full max-w-xs py-3 rounded-2xl font-black text-white text-sm sm:text-base tracking-wide shadow-xl transition-all active:scale-95 mt-1"
        style={{
          background: `linear-gradient(135deg, ${entry.color}, ${entry.color}bb)`,
          boxShadow: `0 4px 24px ${entry.color}60, 0 2px 0 ${entry.color}40`,
          border: `2px solid ${entry.color}80`,
        }}>
        அடுத்து ➡️
      </motion.button>
    </motion.div>
  );
}

/* ─── Phase: Quiz ─── */
interface QuizOption { id: string; word: string; emoji: string; correct: boolean; }

interface QuizProps { entry: WordEntry; onCorrect: () => void; }

function Quiz({ entry, onCorrect }: QuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [wrongShake, setWrongShake] = useState(false);

  const options = useMemo<QuizOption[]>(() => {
    // Pick 2 unique wrong options from global pool
    const wrong = GLOBAL_DISTRACTORS
      .filter(d => d.word !== entry.word && d.emoji !== entry.emoji)
      .filter((value, index, self) => self.findIndex(t => t.emoji === value.emoji) === index) // unique emojis
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map((d, i) => ({ id: `w${i}`, word: d.word, emoji: d.emoji, correct: false }));
      
    return shuffleArray([
      { id: 'correct', word: entry.word, emoji: entry.emoji, correct: true },
      ...wrong,
    ]);
  }, [entry]);

  const handleTap = useCallback((opt: QuizOption) => {
    if (selected) return;
    setSelected(opt.id);
    if (opt.correct) {
      setTimeout(onCorrect, 800);
    } else {
      setWrongShake(true);
      setTimeout(() => { setWrongShake(false); setSelected(null); }, 600);
    }
  }, [selected, onCorrect]);

  return (
    <motion.div key={`quiz-${entry.word}`} initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
      className="flex flex-col items-center gap-4 w-full">
      
      {/* Question Blackboard */}
      <div className="relative w-full rounded-2xl overflow-hidden px-4 py-5 flex flex-col items-center gap-2"
        style={{ background: 'linear-gradient(160deg, #1a2e1a 0%, #0d1f0d 100%)', border: '3px solid #2d4a2d', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
        <BoardLines />
        <p className="relative z-10 text-white/50 text-[11px] font-black tracking-widest uppercase">படம் பார்த்து கண்டுபிடி!</p>
        
        <div className="flex items-center gap-3 relative z-10">
          <span className="text-3xl sm:text-4xl font-black text-white" style={{ fontFamily: '"Noto Sans Tamil", "Latha", sans-serif' }}>
            {entry.word}
          </span>
        </div>
        
        <p className="relative z-10 text-white/40 text-[10px] font-bold">சரியான படத்தை தொடுங்கள் 👇</p>
      </div>

      {/* 3 Picture Options */}
      <motion.div animate={wrongShake ? { x: [0, -8, 8, -5, 5, 0] } : {}} transition={{ duration: 0.3 }}
        className="grid grid-cols-3 gap-3 w-full">
        {options.map(opt => {
          const isSelected = selected === opt.id;
          const isWin = isSelected && opt.correct;
          const isLose = isSelected && !opt.correct;
          return (
            <button key={opt.id} onClick={() => handleTap(opt)}
              className="flex flex-col items-center gap-2 py-4 px-2 rounded-2xl transition-all active:scale-95 relative overflow-hidden"
              style={{
                background: isWin ? 'rgba(34,197,94,0.25)' : isLose ? 'rgba(239,68,68,0.25)' : 'rgba(255,255,255,0.08)',
                border: isWin ? '2.5px solid rgba(34,197,94,0.7)' : isLose ? '2.5px solid rgba(239,68,68,0.5)' : '1.5px solid rgba(255,255,255,0.12)',
                boxShadow: isWin ? '0 0 20px rgba(34,197,94,0.35)' : 'none',
              }}>
              {isWin && <div className="absolute -top-0.5 -right-0.5 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] font-black shadow">✓</div>}
              
              <span className="text-4xl sm:text-5xl leading-none drop-shadow">{opt.emoji}</span>
              <span className="text-[11px] sm:text-xs font-black mt-1" style={{ color: isWin ? '#4ade80' : isLose ? '#f87171' : 'rgba(255,255,255,0.7)', fontFamily: '"Noto Sans Tamil", sans-serif' }}>
                {opt.word}
              </span>
            </button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

/* ─── Phase: Word Done ─── */
function WordDone({ entry, onNext, isLast }: { entry: WordEntry; onNext: () => void; isLast: boolean }) {
  return (
    <motion.div key={`done-${entry.word}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="flex flex-col items-center gap-4 w-full relative">
      <StarBurst />
      <div className="flex flex-col items-center gap-3 px-6 py-6 rounded-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.12)' }}>
        <span className="text-6xl sm:text-7xl">{entry.emoji}</span>
        <p className="text-2xl sm:text-3xl font-black text-white text-center" style={{ fontFamily: '"Noto Sans Tamil", sans-serif' }}>
          {entry.word}
        </p>
        <p className="text-xs text-white/50 font-bold tracking-wider text-center">
          அருமையாக கற்றீர்கள்! ⭐
        </p>
      </div>
      <motion.button whileTap={{ scale: 0.96 }} onClick={onNext}
        className="w-full max-w-xs py-3.5 rounded-2xl font-black text-white text-sm sm:text-base tracking-wide shadow-xl active:scale-95"
        style={{
          background: isLast ? 'linear-gradient(135deg, #f97316, #ec4899)' : `linear-gradient(135deg, ${entry.color}, ${entry.color}bb)`,
          boxShadow: `0 4px 24px ${entry.color}50`,
        }}>
        {isLast ? 'முடிந்தது! 🎉' : 'அடுத்த சொல் →'}
      </motion.button>
    </motion.div>
  );
}

/* ─── Phase: All Done ─── */
function AllDone({ entries, onComplete }: { entries: WordEntry[]; onComplete: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-5 w-full">
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="text-6xl sm:text-7xl">
        🏆
      </motion.div>
      <div className="flex flex-col items-center gap-3 px-6 py-5 rounded-2xl w-full text-center" style={{ background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.15)' }}>
        <p className="text-lg sm:text-xl font-black text-white" style={{ fontFamily: '"Noto Sans Tamil", sans-serif' }}>
          மிகவும் அருமை! 🎊
        </p>
        <p className="text-xs text-white/50 font-bold tracking-wide" style={{ fontFamily: '"Noto Sans Tamil", sans-serif' }}>
          அனைத்து சொற்களையும் வெற்றிகரமாக கற்றீர்கள்!
        </p>
        <div className="flex items-center gap-2 mt-2 flex-wrap justify-center max-w-sm">
          {entries.map((e, i) => (
            <motion.span key={e.word} initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 18 }}
              className="text-2xl" title={e.word}>
              {e.emoji}
            </motion.span>
          ))}
        </div>
      </div>
      <motion.button whileTap={{ scale: 0.96 }} onClick={onComplete}
        className="w-full max-w-xs py-3.5 rounded-2xl font-black text-white text-base tracking-wide shadow-xl active:scale-95"
        style={{ background: 'linear-gradient(135deg, #f97316, #ec4899, #6366f1)', boxShadow: '0 4px 28px rgba(249,115,22,0.5)' }}>
        அடுத்த பாடம் ➡️
      </motion.button>
    </motion.div>
  );
}

type Phase = 'showcase' | 'quiz' | 'word-done' | 'all-done';

type Props = {
  config?: Record<string, unknown>;
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

export default function TamilWordShowcase({ config, onComplete }: Props) {
  const startTime = useRef(Date.now());
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('showcase');
  const [scores, setScores] = useState<Record<string, boolean>>({});

  // Select the appropriate word list based on config.set
  const activeSetKey = (config?.set as string) || 'set-1';
  const WORDS = WORD_SETS[activeSetKey] || SET_1_VOWELS;

  const entry = WORDS[wordIndex];
  const isLast = wordIndex === WORDS.length - 1;

  const goToQuiz = useCallback(() => setPhase('quiz'), []);
  const onCorrect = useCallback(() => {
    setScores(prev => ({ ...prev, [entry.word]: true }));
    setPhase('word-done');
  }, [entry.word]);

  const goNext = useCallback(() => {
    if (isLast) setPhase('all-done');
    else { setWordIndex(i => i + 1); setPhase('showcase'); }
  }, [isLast]);

  const handleComplete = useCallback(() => {
    const correct = Object.values(scores).filter(Boolean).length;
    onComplete({
      score: correct, max_score: WORDS.length,
      completion_data: { scores, words_learned: Object.keys(scores), set: activeSetKey },
      time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
    });
  }, [onComplete, scores, WORDS.length, activeSetKey]);

  return (
    <div className="flex flex-col items-center gap-3 px-3 sm:px-5 pb-4 sm:pb-6 select-none w-full">
      {/* Progress dots */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center px-2">
        {WORDS.map((e, i) => (
          <div key={e.word} className="transition-all duration-300" style={{
            width: i === wordIndex ? 16 : 6, height: 6, borderRadius: 99,
            background: scores[e.word] ? '#22c55e' : i === wordIndex ? e.color : 'rgba(255,255,255,0.2)',
          }} />
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        {phase === 'showcase' && <Showcase key={`show-${wordIndex}`} entry={entry} index={wordIndex} total={WORDS.length} onNext={goToQuiz} />}
        {phase === 'quiz' && <Quiz key={`quiz-${wordIndex}`} entry={entry} onCorrect={onCorrect} />}
        {phase === 'word-done' && <WordDone key={`done-${wordIndex}`} entry={entry} onNext={goNext} isLast={isLast} />}
        {phase === 'all-done' && <AllDone key="all-done" entries={WORDS} onComplete={handleComplete} />}
      </AnimatePresence>
    </div>
  );
}
