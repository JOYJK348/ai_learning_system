'use client';

import { useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MeiEntry {
  letter: string;
  name: string;
  word: string;
  emoji: string;
  color: string;
  stroke: string;
}

const MEI_SET_1: MeiEntry[] = [
  { letter: 'ய்', name: 'ய்', word: 'யானை', emoji: '🐘', color: '#8B5CF6', stroke: 'M50,20 L50,80 M50,20 C35,40 65,40 50,60' },
  { letter: 'ர்', name: 'ர்', word: 'ராக்கெட்', emoji: '🚀', color: '#F43F5E', stroke: 'M50,20 L50,80 M35,35 L65,35 M35,65 L65,65' },
  { letter: 'ல்', name: 'ல்', word: 'லட்டு', emoji: '🍡', color: '#F59E0B', stroke: 'M50,20 L50,80 M35,50 L65,50' },
  { letter: 'வ்', name: 'வ்', word: 'வானவில்', emoji: '🌈', color: '#EC4899', stroke: 'M35,35 C35,60 50,75 50,75 C50,75 65,60 65,35 M50,20 L50,50' },
];

const MEI_SET_2: MeiEntry[] = [
  { letter: 'ழ்', name: 'ழ்', word: 'மழை', emoji: '🌧️', color: '#60A5FA', stroke: 'M50,20 L50,80 M35,35 L65,35 M35,65 L65,65 M35,50 L65,50' },
  { letter: 'ள்', name: 'ள்', word: 'விளக்கு', emoji: '💡', color: '#22C55E', stroke: 'M50,20 L50,80 M50,20 C35,35 65,35 65,50 C65,65 50,65 50,50' },
  { letter: 'ற்', name: 'ற்', word: 'பறவை', emoji: '🕊️', color: '#0EA5E9', stroke: 'M35,50 L50,20 L65,50 M50,20 L50,80 M35,65 L65,65' },
  { letter: 'ன்', name: 'ன்', word: 'கண்', emoji: '👁️', color: '#F97316', stroke: 'M50,20 L50,80 M35,35 C35,50 65,50 65,65 C65,80 35,80 35,65' },
];

const MEI_SET_3: MeiEntry[] = [
  { letter: 'க்', name: 'க்', word: 'குடை', emoji: '☂️', color: '#F97316', stroke: 'M50,20 L50,80 M35,20 C35,50 65,50 65,20' },
  { letter: 'ங்', name: 'ங்', word: 'அங்கம்', emoji: '💪', color: '#8B5CF6', stroke: 'M35,50 C35,25 65,25 65,50 C65,75 35,75 35,50 M50,20 L50,80' },
  { letter: 'ச்', name: 'ச்', word: 'சந்திரன்', emoji: '🌙', color: '#FACC15', stroke: 'M50,20 L50,80 M35,30 C35,55 65,55 65,30' },
  { letter: 'ஞ்', name: 'ஞ்', word: 'பஞ்சு', emoji: '☁️', color: '#EC4899', stroke: 'M50,20 L50,80 M35,50 C50,20 65,50 50,80' },
];

const MEI_SET_4: MeiEntry[] = [
  { letter: 'ட்', name: 'ட்', word: 'குடம்', emoji: '🏺', color: '#0EA5E9', stroke: 'M50,20 L50,80 M35,40 C35,20 65,20 65,40' },
  { letter: 'ண்', name: 'ண்', word: 'மண்', emoji: '🪨', color: '#92400E', stroke: 'M50,20 L50,80 M35,50 L65,50 M50,35 L50,65' },
  { letter: 'த்', name: 'த்', word: 'தமிழ்', emoji: '📖', color: '#F43F5E', stroke: 'M35,20 L35,80 M50,20 L50,80 M65,20 L65,80 M50,50 L65,50' },
  { letter: 'ந்', name: 'ந்', word: 'நட்சத்திரம்', emoji: '⭐', color: '#F59E0B', stroke: 'M35,50 L50,20 L65,50 M50,20 L50,80' },
];

const MEI_SET_5: MeiEntry[] = [
  { letter: 'ப்', name: 'ப்', word: 'பட்டம்', emoji: '🪁', color: '#60A5FA', stroke: 'M50,20 L50,80 M35,50 L65,50 M35,35 L65,65' },
  { letter: 'ம்', name: 'ம்', word: 'மரம்', emoji: '🌳', color: '#22C55E', stroke: 'M35,50 L50,20 L65,50 M50,20 L50,80 M35,80 L65,80' },
];

const ALL_MEI = [...MEI_SET_1, ...MEI_SET_2, ...MEI_SET_3, ...MEI_SET_4, ...MEI_SET_5];
const DISTRACTOR_POOL = ALL_MEI.map(v => ({ word: v.word, emoji: v.emoji, letter: v.letter }));

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
        <line
          key={y}
          x1="4%" y1={`${y * 100}%`} x2="96%" y2={`${y * 100}%`}
          stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="6 5"
        />
      ))}
    </svg>
  );
}

function BoardLetter({ mei }: { mei: MeiEntry }) {
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: '100%', aspectRatio: '1 / 1', maxWidth: 200 }}
    >
      <div
        className="absolute inset-0 rounded-full opacity-10 blur-xl"
        style={{ background: mei.color }}
      />
      <span
        className="relative z-10 font-black leading-none"
        style={{
          fontSize: 'clamp(5rem, 18vw, 8.5rem)',
          color: '#fff',
          textShadow: `0 0 30px ${mei.color}80, 0 2px 8px rgba(0,0,0,0.5)`,
          fontFamily: '"Noto Sans Tamil", "Latha", sans-serif',
        }}
      >
        {mei.letter}
      </span>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full opacity-[0.18] pointer-events-none"
        aria-hidden
      >
        <path d={mei.stroke} fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

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

interface ShowcaseProps {
  mei: MeiEntry;
  index: number;
  total: number;
  onNext: () => void;
}

interface ShowcaseProps {
  mei: MeiEntry;
  index: number;
  total: number;
  onNext: () => void;
}

function Showcase({ mei, index, total, onNext }: ShowcaseProps) {
  return (
    <motion.div
      key={`show-${mei.letter}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="flex flex-col items-center gap-4 w-full"
    >
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}>
        <span className="text-xs font-black text-white/60 tracking-widest uppercase">மெய் எழுத்து</span>
        <span className="text-xs font-bold text-white/40">{index + 1} / {total}</span>
      </div>

      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #1a2e1a 0%, #0d1f0d 100%)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
          border: '3px solid #2d4a2d',
        }}
      >
        <BoardLines />

        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\'%3E%3Crect width=\'4\' height=\'4\' fill=\'%23ffffff10\'/%3E%3Crect width=\'2\' height=\'2\' fill=\'%23ffffff08\'/%3E%3C/svg%3E")' }}
        />

        <div className="relative z-10 flex flex-col items-center gap-3 px-4 pt-6 pb-5">
          <BoardLetter mei={mei} />

          <div className="flex items-center gap-3">
            <span
              className="text-2xl sm:text-3xl font-black"
              style={{ color: mei.color, textShadow: `0 0 16px ${mei.color}60`, fontFamily: '"Noto Sans Tamil", sans-serif' }}
            >
              {mei.name}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{ background: `${mei.color}22`, border: `1px solid ${mei.color}44` }}
          >
            <span className="text-2xl sm:text-3xl">{mei.emoji}</span>
            <span
              className="text-base sm:text-lg font-black text-white"
              style={{ fontFamily: '"Noto Sans Tamil", sans-serif' }}
            >
              {mei.word}
            </span>
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.96 }}
        onClick={onNext}
        className="w-full max-w-xs py-3 rounded-2xl font-black text-white text-sm sm:text-base tracking-wide shadow-xl transition-all active:scale-95"
        style={{
          background: `linear-gradient(135deg, ${mei.color}, ${mei.color}bb)`,
          boxShadow: `0 4px 24px ${mei.color}60, 0 2px 0 ${mei.color}40`,
          border: `2px solid ${mei.color}80`,
        }}
      >
        வினாடி வினா கேளுங்கள்! 🎯
      </motion.button>
    </motion.div>
  );
}

interface QuizOption {
  id: string;
  word: string;
  emoji: string;
  correct: boolean;
}

interface QuizProps {
  mei: MeiEntry;
  onCorrect: () => void;
}

function Quiz({ mei, onCorrect }: QuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [wrongShake, setWrongShake] = useState(false);

  const options = useMemo<QuizOption[]>(() => {
    const wrong = DISTRACTOR_POOL
      .filter(d => d.letter !== mei.letter)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map((d, i) => ({ id: `w${i}`, word: d.word, emoji: d.emoji, correct: false }));
    return shuffleArray([
      { id: 'correct', word: mei.word, emoji: mei.emoji, correct: true },
      ...wrong,
    ]);
  }, [mei]);

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
      key={`quiz-${mei.letter}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col items-center gap-4 w-full"
    >
      <div
        className="relative w-full rounded-2xl overflow-hidden px-4 py-5 flex flex-col items-center gap-3"
        style={{
          background: 'linear-gradient(160deg, #1a2e1a 0%, #0d1f0d 100%)',
          border: '3px solid #2d4a2d',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        }}
      >
        <BoardLines />
        <p className="relative z-10 text-white/60 text-xs font-bold tracking-widest uppercase">"{mei.letter}" எந்த சொல்லில் வருகிறது?</p>
        <span
          className="relative z-10 font-black leading-none"
          style={{
            fontSize: 'clamp(3.5rem, 14vw, 6rem)',
            color: '#fff',
            textShadow: `0 0 24px ${mei.color}80`,
            fontFamily: '"Noto Sans Tamil", "Latha", sans-serif',
          }}
        >
          {mei.letter}
        </span>
      </div>

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

function LetterDone({ mei, onNext, isLast }: { mei: MeiEntry; onNext: () => void; isLast: boolean }) {
  return (
    <motion.div
      key={`done-${mei.letter}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="flex flex-col items-center gap-4 w-full relative"
    >
      <StarBurst />
      <div className="flex flex-col items-center gap-3 px-6 py-6 rounded-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.12)' }}>
        <span className="text-4xl sm:text-5xl">{mei.emoji}</span>
        <p
          className="text-xl sm:text-2xl font-black text-white text-center"
          style={{ fontFamily: '"Noto Sans Tamil", sans-serif' }}
        >
          {mei.word}
        </p>
        <p className="text-xs text-white/50 font-bold tracking-wider text-center">
          "{mei.letter}" எழுத்தை கற்றீர்கள்! ⭐
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="text-5xl sm:text-6xl font-black"
            style={{ color: mei.color, textShadow: `0 0 24px ${mei.color}80`, fontFamily: '"Noto Sans Tamil", sans-serif' }}
          >
            {mei.letter}
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
            : `linear-gradient(135deg, ${mei.color}, ${mei.color}bb)`,
          boxShadow: `0 4px 24px ${mei.color}50`,
        }}
      >
        {isLast ? 'முடிந்தது! 🎉' : 'அடுத்த எழுத்து →'}
      </motion.button>
    </motion.div>
  );
}

function AllDone({ mei, onComplete }: { mei: MeiEntry[]; onComplete: () => void }) {
  const msgMap: Record<string, string> = {
    'ய்': 'ய், ர், ல், வ் — அனைத்தையும் கற்றீர்கள்!',
    'ழ்': 'ழ், ள், ற், ன் — அனைத்தையும் கற்றீர்கள்!',
    'க்': 'க், ங், ச், ஞ் — அனைத்தையும் கற்றீர்கள்!',
    'ட்': 'ட், ண், த், ந் — அனைத்தையும் கற்றீர்கள்!',
    'ப்': 'ப், ம் — அனைத்தையும் கற்றீர்கள்!',
  };
  const msg = msgMap[mei[0]?.letter] || 'அனைத்து மெய் எழுத்துக்களையும் கற்றீர்கள்!';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-5 w-full"
    >
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
          {msg}
        </p>

        <div className="flex items-center gap-2 sm:gap-3 mt-3 flex-wrap justify-center">
          {mei.map((v, i) => (
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

type Phase = 'showcase' | 'quiz' | 'letter-done' | 'all-done';

type Props = {
  config?: Record<string, unknown>;
  onComplete: (data: {
    score: number;
    max_score: number;
    completion_data: Record<string, unknown>;
    time_taken_seconds: number;
  }) => void;
};

const MEI_SETS: Record<string, MeiEntry[]> = {
  'set-1': MEI_SET_1,
  'set-2': MEI_SET_2,
  'set-3': MEI_SET_3,
  'set-4': MEI_SET_4,
  'set-5': MEI_SET_5,
};

export default function TamilMeiQuiz({ config, onComplete }: Props) {
  const MEI = MEI_SETS[(config?.set as string) || 'set-1'] || MEI_SET_1;

  const startTime = useRef(Date.now());
  const [meiIndex, setMeiIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('showcase');
  const [scores, setScores] = useState<Record<string, boolean>>({});

  const mei = MEI[meiIndex];
  const isLast = meiIndex === MEI.length - 1;

  const goToQuiz = useCallback(() => setPhase('quiz'), []);

  const onCorrect = useCallback(() => {
    setScores(prev => ({ ...prev, [mei.letter]: true }));
    setPhase('letter-done');
  }, [mei.letter]);

  const goNext = useCallback(() => {
    if (isLast) {
      setPhase('all-done');
    } else {
      setMeiIndex(i => i + 1);
      setPhase('showcase');
    }
  }, [isLast]);

  const handleComplete = useCallback(() => {
    const correct = Object.values(scores).filter(Boolean).length;
    onComplete({
      score: correct,
      max_score: MEI.length,
      completion_data: { scores, consonants_learned: Object.keys(scores), set: config?.set || 'set-1' },
      time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
    });
  }, [onComplete, scores, config?.set, MEI.length]);

  return (
    <div className="flex flex-col items-center gap-3 px-3 sm:px-5 pb-4 sm:pb-6 select-none w-full">
      <div className="flex items-center gap-1.5">
        {MEI.map((v, i) => (
          <div
            key={v.letter}
            className="transition-all duration-300"
            style={{
              width: i === meiIndex ? 20 : 8,
              height: 8,
              borderRadius: 99,
              background: scores[v.letter]
                ? '#22c55e'
                : i === meiIndex
                  ? v.color
                  : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {phase === 'showcase' && (
          <Showcase
            key={`showcase-${meiIndex}`}
            mei={mei}
            index={meiIndex}
            total={MEI.length}
            onNext={goToQuiz}
          />
        )}
        {phase === 'quiz' && (
          <Quiz
            key={`quiz-${meiIndex}`}
            mei={mei}
            onCorrect={onCorrect}
          />
        )}
        {phase === 'letter-done' && (
          <LetterDone
            key={`done-${meiIndex}`}
            mei={mei}
            onNext={goNext}
            isLast={isLast}
          />
        )}
        {phase === 'all-done' && (
          <AllDone
            key="all-done"
            mei={MEI}
            onComplete={handleComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
