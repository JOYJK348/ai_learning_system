'use client';

/**
 * TamilVowelQuiz – உயிர் எழுத்துக்கள் (அ-ஊ  and  எ-ஔ)
 * Blackboard-themed, show→quiz flow.
 * Optimised for low-end devices:
 *  - No canvas / requestAnimationFrame loops
 *  - CSS animations only (GPU composited transform/opacity)
 *  - Tiny bundle: no heavy deps beyond framer-motion (already in project)
 *  - Single re-render per phase, not per frame
 *  - config.set = 'a-u' (default) | 'e-au' picks which vowel set to teach
 */

import { useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Data ─── */

interface VowelEntry {
  letter: string;       // Tamil vowel
  name: string;         // Tamil pronunciation name
  word: string;         // Tamil example word
  emoji: string;        // visual for word
  color: string;        // accent color (hsl)
  stroke: string;       // simple stroke hint shown on blackboard
}

/* Set A: அ – ஊ */
const VOWELS_A_U: VowelEntry[] = [
  { letter: 'அ', name: 'அ', word: 'அம்மா', emoji: '👩', color: '#f97316', stroke: 'M38,80 C38,40 62,40 62,80 M50,80 L50,90' },
  { letter: 'ஆ', name: 'ஆ', word: 'ஆடு', emoji: '🐐', color: '#eab308', stroke: 'M35,80 C35,40 65,40 65,80 M35,55 L65,55' },
  { letter: 'இ', name: 'இ', word: 'இலை', emoji: '🍃', color: '#22c55e', stroke: 'M50,25 L50,85 M38,55 L62,55' },
  { letter: 'ஈ', name: 'ஈ', word: 'ஈ', emoji: '🪰', color: '#10b981', stroke: 'M50,25 L50,85 M38,45 L62,45 M38,65 L62,65' },
  { letter: 'உ', name: 'உ', word: 'உலகம்', emoji: '🌍', color: '#06b6d4', stroke: 'M35,35 C35,70 50,80 50,80 C50,80 65,70 65,35' },
  { letter: 'ஊ', name: 'ஊ', word: 'ஊர்', emoji: '🏘️', color: '#6366f1', stroke: 'M35,30 C35,65 50,78 50,78 C50,78 65,65 65,30 M35,78 L65,78' },
];

/* Set B: எ – ஔ */
const VOWELS_E_AU: VowelEntry[] = [
  { letter: 'எ', name: 'எ', word: 'எலி', emoji: '🐭', color: '#e879f9', stroke: 'M65,20 L35,20 L35,80 L65,80 M35,50 L60,50' },
  { letter: 'ஏ', name: 'ஏ', word: 'ஏணி', emoji: '🪜', color: '#c084fc', stroke: 'M65,20 L35,20 L35,80 L65,80 M35,50 L60,50 M50,80 L50,95' },
  { letter: 'ஐ', name: 'ஐ', word: 'ஐந்து', emoji: '5️⃣', color: '#f472b6', stroke: 'M50,20 L50,80 M35,50 L65,50 M35,20 L65,20' },
  { letter: 'ஒ', name: 'ஒ', word: 'ஒட்டகம்', emoji: '🐪', color: '#fb923c', stroke: 'M35,50 C35,25 65,25 65,50 C65,75 35,75 35,50' },
  { letter: 'ஓ', name: 'ஓ', word: 'ஓணான்', emoji: '🦎', color: '#34d399', stroke: 'M35,50 C35,25 65,25 65,50 C65,75 35,75 35,50 M65,50 L80,50' },
  { letter: 'ஔ', name: 'ஔ', word: 'ஔடதம்', emoji: '💊', color: '#60a5fa', stroke: 'M35,50 C35,25 65,25 65,50 C65,75 35,75 35,50 M65,35 L80,35 M65,65 L80,65' },
];

// Full distractor pool across both sets
const ALL_VOWELS = [...VOWELS_A_U, ...VOWELS_E_AU];
const DISTRACTOR_POOL = ALL_VOWELS.map(v => ({ word: v.word, emoji: v.emoji, letter: v.letter }));

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─── Sub-components ─── */

/** Chalk-white dotted line (blackboard guide lines) */
function BoardLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      {[0.33, 0.66].map((y) => (
        <line
          key={y}
          x1="4%" y1={`${y * 100}%`} x2="96%" y2={`${y * 100}%`}
          stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="6 5"
        />
      ))}
    </svg>
  );
}

/** Big Tamil letter drawn on blackboard (SVG for performance) */
function BoardLetter({ vowel }: { vowel: VowelEntry }) {
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: '100%', aspectRatio: '1 / 1', maxWidth: 200 }}
    >
      {/* Chalk smudge background */}
      <div
        className="absolute inset-0 rounded-full opacity-10 blur-xl"
        style={{ background: vowel.color }}
      />
      {/* Letter */}
      <span
        className="relative z-10 font-black leading-none"
        style={{
          fontSize: 'clamp(5rem, 18vw, 8.5rem)',
          color: '#fff',
          textShadow: `0 0 30px ${vowel.color}80, 0 2px 8px rgba(0,0,0,0.5)`,
          fontFamily: '"Noto Sans Tamil", "Latha", sans-serif',
        }}
      >
        {vowel.letter}
      </span>
      {/* Stroke trace hint (lightweight SVG, not animated) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full opacity-[0.18] pointer-events-none"
        aria-hidden
      >
        <path d={vowel.stroke} fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/** Star burst confetti (CSS-only, no JS animation loop) */
function StarBurst() {
  const stars = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i / 12) * 360,
      delay: (i * 0.05).toFixed(2),
      color: ['#fbbf24', '#f97316', '#22c55e', '#06b6d4', '#a78bfa', '#f472b6'][i % 6],
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {stars.map(s => (
        <div
          key={s.id}
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
          style={{
            background: s.color,
            transform: `rotate(${s.angle}deg) translateX(0px)`,
            animation: `starShoot 0.6s ${s.delay}s ease-out forwards`,
            transformOrigin: '0 0',
          }}
        />
      ))}
      <style>{`
        @keyframes starShoot {
          0%   { transform: rotate(var(--a)) translateX(0) scale(1); opacity: 1; }
          100% { transform: rotate(var(--a)) translateX(80px) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ─── Phase: Showcase ─── */

interface ShowcaseProps {
  vowel: VowelEntry;
  index: number;
  total: number;
  onNext: () => void;
}

function Showcase({ vowel, index, total, onNext }: ShowcaseProps) {
  return (
    <motion.div
      key={`show-${vowel.letter}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="flex flex-col items-center gap-4 w-full"
    >
      {/* Header badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}>
        <span className="text-xs font-black text-white/60 tracking-widest uppercase">உயிர் எழுத்து</span>
        <span className="text-xs font-bold text-white/40">{index + 1} / {total}</span>
      </div>

      {/* Blackboard panel */}
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #1a2e1a 0%, #0d1f0d 100%)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
          border: '3px solid #2d4a2d',
        }}
      >
        <BoardLines />

        {/* Chalk-board texture overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\'%3E%3Crect width=\'4\' height=\'4\' fill=\'%23ffffff10\'/%3E%3Crect width=\'2\' height=\'2\' fill=\'%23ffffff08\'/%3E%3C/svg%3E")' }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-3 px-4 pt-6 pb-5">
          <BoardLetter vowel={vowel} />

          {/* Pronunciation name */}
          <div className="flex items-center gap-3">
            <span
              className="text-2xl sm:text-3xl font-black"
              style={{ color: vowel.color, textShadow: `0 0 16px ${vowel.color}60`, fontFamily: '"Noto Sans Tamil", sans-serif' }}
            >
              {vowel.name}
            </span>
          </div>

          {/* Example word + emoji */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{ background: `${vowel.color}22`, border: `1px solid ${vowel.color}44` }}
          >
            <span className="text-2xl sm:text-3xl">{vowel.emoji}</span>
            <span
              className="text-base sm:text-lg font-black text-white"
              style={{ fontFamily: '"Noto Sans Tamil", sans-serif' }}
            >
              {vowel.word}
            </span>
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.96 }}
        onClick={onNext}
        className="w-full max-w-xs py-3 rounded-2xl font-black text-white text-sm sm:text-base tracking-wide shadow-xl transition-all active:scale-95"
        style={{
          background: `linear-gradient(135deg, ${vowel.color}, ${vowel.color}bb)`,
          boxShadow: `0 4px 24px ${vowel.color}60, 0 2px 0 ${vowel.color}40`,
          border: `2px solid ${vowel.color}80`,
        }}
      >
        வினாடி வினா கேளுங்கள்! 🎯
      </motion.button>
    </motion.div>
  );
}

/* ─── Phase: Quiz ─── */

interface QuizOption {
  id: string;
  word: string;
  emoji: string;
  correct: boolean;
}

interface QuizProps {
  vowel: VowelEntry;
  onCorrect: () => void;
}

function Quiz({ vowel, onCorrect }: QuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [wrongShake, setWrongShake] = useState(false);

  const options = useMemo<QuizOption[]>(() => {
    const wrong = DISTRACTOR_POOL
      .filter(d => d.letter !== vowel.letter)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map((d, i) => ({ id: `w${i}`, word: d.word, emoji: d.emoji, correct: false }));
    return shuffleArray([
      { id: 'correct', word: vowel.word, emoji: vowel.emoji, correct: true },
      ...wrong,
    ]);
  }, [vowel]);

  const handleTap = useCallback((opt: QuizOption) => {
    if (selected) return;
    setSelected(opt.id);
    if (opt.correct) {
      setTimeout(onCorrect, 700);
    } else {
      setWrongShake(true);
      setTimeout(() => { setWrongShake(false); setSelected(null); }, 600);
    }
  }, [selected, onCorrect]);

  return (
    <motion.div
      key={`quiz-${vowel.letter}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col items-center gap-4 w-full"
    >
      {/* Question header */}
      <div
        className="relative w-full rounded-2xl overflow-hidden px-4 py-5 flex flex-col items-center gap-3"
        style={{
          background: 'linear-gradient(160deg, #1a2e1a 0%, #0d1f0d 100%)',
          border: '3px solid #2d4a2d',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        }}
      >
        <BoardLines />
        <p className="relative z-10 text-white/60 text-xs font-bold tracking-widest uppercase">"{vowel.letter}" எந்த சொல்லில் வருகிறது?</p>
        <span
          className="relative z-10 font-black leading-none"
          style={{
            fontSize: 'clamp(3.5rem, 14vw, 6rem)',
            color: '#fff',
            textShadow: `0 0 24px ${vowel.color}80`,
            fontFamily: '"Noto Sans Tamil", "Latha", sans-serif',
          }}
        >
          {vowel.letter}
        </span>
      </div>

      {/* Options */}
      <motion.div
        animate={wrongShake ? { x: [0, -8, 8, -5, 5, 0] } : {}}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-3 gap-2.5 w-full"
      >
        {options.map(opt => {
          const isSelected = selected === opt.id;
          const isWin = isSelected && opt.correct;
          const isLose = isSelected && !opt.correct;
          return (
            <button
              key={opt.id}
              onClick={() => handleTap(opt)}
              className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl transition-all active:scale-95 relative overflow-hidden"
              style={{
                background: isWin
                  ? 'rgba(34,197,94,0.25)'
                  : isLose
                    ? 'rgba(239,68,68,0.25)'
                    : 'rgba(255,255,255,0.08)',
                border: isWin
                  ? '2px solid rgba(34,197,94,0.6)'
                  : isLose
                    ? '2px solid rgba(239,68,68,0.5)'
                    : '1.5px solid rgba(255,255,255,0.12)',
                boxShadow: isWin ? '0 0 16px rgba(34,197,94,0.3)' : 'none',
              }}
            >
              {isWin && (
                <div className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-[9px] font-black shadow">✓</div>
              )}
              <span className="text-3xl sm:text-4xl leading-none">{opt.emoji}</span>
              <span
                className="text-[11px] sm:text-xs font-black"
                style={{
                  color: isWin ? '#4ade80' : isLose ? '#f87171' : 'rgba(255,255,255,0.7)',
                  fontFamily: '"Noto Sans Tamil", sans-serif',
                }}
              >
                {opt.word}
              </span>
            </button>
          );
        })}
      </motion.div>

      {!selected && (
        <p className="text-white/30 text-[10px] font-bold tracking-wider text-center">சரியான படத்தை தொடுங்கள் 👆</p>
      )}
    </motion.div>
  );
}

/* ─── Phase: Letter Done ─── */

function LetterDone({ vowel, onNext, isLast }: { vowel: VowelEntry; onNext: () => void; isLast: boolean }) {
  return (
    <motion.div
      key={`done-${vowel.letter}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="flex flex-col items-center gap-4 w-full relative"
    >
      <StarBurst />
      <div className="flex flex-col items-center gap-3 px-6 py-6 rounded-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.12)' }}>
        <span className="text-4xl sm:text-5xl">{vowel.emoji}</span>
        <p
          className="text-xl sm:text-2xl font-black text-white text-center"
          style={{ fontFamily: '"Noto Sans Tamil", sans-serif' }}
        >
          {vowel.word}
        </p>
        <p className="text-xs text-white/50 font-bold tracking-wider text-center">
          "{vowel.letter}" எழுத்தை கற்றீர்கள்! ⭐
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="text-5xl sm:text-6xl font-black"
            style={{ color: vowel.color, textShadow: `0 0 24px ${vowel.color}80`, fontFamily: '"Noto Sans Tamil", sans-serif' }}
          >
            {vowel.letter}
          </span>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={onNext}
        className="w-full max-w-xs py-3 rounded-2xl font-black text-white text-sm sm:text-base tracking-wide shadow-xl active:scale-95"
        style={{
          background: isLast
            ? 'linear-gradient(135deg, #f97316, #ec4899)'
            : `linear-gradient(135deg, ${vowel.color}, ${vowel.color}bb)`,
          boxShadow: `0 4px 24px ${vowel.color}50`,
        }}
      >
        {isLast ? 'முடிந்தது! 🎉' : 'அடுத்த எழுத்து →'}
      </motion.button>
    </motion.div>
  );
}

/* ─── Phase: All Done ─── */

function AllDone({ vowels, onComplete }: { vowels: VowelEntry[]; onComplete: () => void }) {
  const isSetB = vowels[0]?.letter === 'எ';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-5 w-full"
    >
      {/* Trophy */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-6xl sm:text-7xl"
      >
        🏆
      </motion.div>

      <div className="flex flex-col items-center gap-2 px-6 py-5 rounded-2xl w-full text-center" style={{ background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.15)' }}>
        <p className="text-lg sm:text-xl font-black text-white" style={{ fontFamily: '"Noto Sans Tamil", sans-serif' }}>
          அட்டகாசம்! 🎊
        </p>
        <p className="text-xs text-white/50 font-bold tracking-wide" style={{ fontFamily: '"Noto Sans Tamil", sans-serif' }}>
          {isSetB ? 'எ, ஏ, ஐ, ஒ, ஓ, ஔ — அனைத்தையும் கற்றீர்கள்!' : 'அ, ஆ, இ, ஈ, உ, ஊ — அனைத்தையும் கற்றீர்கள்!'}
        </p>

        {/* All vowels row */}
        <div className="flex items-center gap-2 sm:gap-3 mt-3 flex-wrap justify-center">
          {vowels.map((v, i) => (
            <motion.span
              key={v.letter}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 300, damping: 18 }}
              className="text-xl sm:text-2xl font-black"
              style={{ color: v.color, fontFamily: '"Noto Sans Tamil", sans-serif' }}
            >
              {v.letter}
            </motion.span>
          ))}
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={onComplete}
        className="w-full max-w-xs py-3.5 rounded-2xl font-black text-white text-base tracking-wide shadow-xl active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #f97316, #ec4899, #6366f1)',
          boxShadow: '0 4px 28px rgba(249,115,22,0.5)',
        }}
      >
        அடுத்த பாடம் ➡️
      </motion.button>
    </motion.div>
  );
}

/* ─── Main Component ─── */

type Phase = 'showcase' | 'quiz' | 'letter-done' | 'all-done';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config?: Record<string, any>;
  onComplete: (data: {
    score: number;
    max_score: number;
    completion_data: Record<string, unknown>;
    time_taken_seconds: number;
  }) => void;
};

export default function TamilVowelQuiz({ config, onComplete }: Props) {
  // Pick which set to teach based on config.set
  const VOWELS = config?.set === 'e-au' ? VOWELS_E_AU : VOWELS_A_U;

  const startTime = useRef(Date.now());
  const [vowelIndex, setVowelIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('showcase');
  const [scores, setScores] = useState<Record<string, boolean>>({});

  const vowel = VOWELS[vowelIndex];
  const isLast = vowelIndex === VOWELS.length - 1;

  const goToQuiz = useCallback(() => setPhase('quiz'), []);

  const onCorrect = useCallback(() => {
    setScores(prev => ({ ...prev, [vowel.letter]: true }));
    setPhase('letter-done');
  }, [vowel.letter]);

  const goNext = useCallback(() => {
    if (isLast) {
      setPhase('all-done');
    } else {
      setVowelIndex(i => i + 1);
      setPhase('showcase');
    }
  }, [isLast]);

  const handleComplete = useCallback(() => {
    const correct = Object.values(scores).filter(Boolean).length;
    onComplete({
      score: correct,
      max_score: VOWELS.length,
      completion_data: { scores, vowels_learned: Object.keys(scores), set: config?.set || 'a-u' },
      time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
    });
  }, [onComplete, scores, config?.set, VOWELS.length]);

  return (
    <div className="flex flex-col items-center gap-3 px-3 sm:px-5 pb-4 sm:pb-6 select-none w-full">
      {/* Progress dots */}
      <div className="flex items-center gap-1.5">
        {VOWELS.map((v, i) => (
          <div
            key={v.letter}
            className="transition-all duration-300"
            style={{
              width: i === vowelIndex ? 20 : 8,
              height: 8,
              borderRadius: 99,
              background: scores[v.letter]
                ? '#22c55e'
                : i === vowelIndex
                  ? v.color
                  : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>

      {/* Phase renderer */}
      <AnimatePresence mode="wait">
        {phase === 'showcase' && (
          <Showcase
            key={`showcase-${vowelIndex}`}
            vowel={vowel}
            index={vowelIndex}
            total={VOWELS.length}
            onNext={goToQuiz}
          />
        )}
        {phase === 'quiz' && (
          <Quiz
            key={`quiz-${vowelIndex}`}
            vowel={vowel}
            onCorrect={onCorrect}
          />
        )}
        {phase === 'letter-done' && (
          <LetterDone
            key={`done-${vowelIndex}`}
            vowel={vowel}
            onNext={goNext}
            isLast={isLast}
          />
        )}
        {phase === 'all-done' && (
          <AllDone
            key="all-done"
            vowels={VOWELS}
            onComplete={handleComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
