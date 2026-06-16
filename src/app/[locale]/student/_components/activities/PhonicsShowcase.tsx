'use client';

import { useState, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { shuffle } from '@/core/data/letterData';

type Props = {
  config: { family?: string; words?: string[] };
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

const ALL_WORDS: Record<string, { family: string; words: { word: string; emoji: string }[] }> = {
  at: { family: 'at', words: [
    { word: 'cat', emoji: '🐱' }, { word: 'bat', emoji: '🏏' }, { word: 'hat', emoji: '🎩' },
    { word: 'rat', emoji: '🐀' }, { word: 'mat', emoji: '🟫' },
  ]},
  am: { family: 'am', words: [
    { word: 'jam', emoji: '🍓' }, { word: 'ham', emoji: '🍖' }, { word: 'ram', emoji: '🐏' }, { word: 'yam', emoji: '🍠' },
  ]},
  an: { family: 'an', words: [
    { word: 'fan', emoji: '🌀' }, { word: 'man', emoji: '👨' }, { word: 'pan', emoji: '🍳' },
    { word: 'van', emoji: '🚐' }, { word: 'can', emoji: '🥫' },
  ]},
  ig: { family: 'ig', words: [
    { word: 'pig', emoji: '🐷' }, { word: 'wig', emoji: '👱' }, { word: 'dig', emoji: '⛏️' }, { word: 'big', emoji: '🐘' },
  ]},
  in: { family: 'in', words: [
    { word: 'pin', emoji: '📌' }, { word: 'tin', emoji: '🥫' }, { word: 'win', emoji: '🏆' }, { word: 'fin', emoji: '🐟' },
  ]},
  it: { family: 'it', words: [
    { word: 'kit', emoji: '🪁' }, { word: 'sit', emoji: '🪑' }, { word: 'hit', emoji: '👊' }, { word: 'bit', emoji: '🍪' },
  ]},
  op: { family: 'op', words: [
    { word: 'top', emoji: '🔝' }, { word: 'mop', emoji: '🧹' }, { word: 'hop', emoji: '🐰' }, { word: 'pop', emoji: '🍿' },
  ]},
  ot: { family: 'ot', words: [
    { word: 'pot', emoji: '🍲' }, { word: 'hot', emoji: '🌶️' }, { word: 'dot', emoji: '🔴' }, { word: 'cot', emoji: '🛏️' },
  ]},
  og: { family: 'og', words: [
    { word: 'dog', emoji: '🐶' }, { word: 'log', emoji: '🪵' }, { word: 'fog', emoji: '🌫️' }, { word: 'jog', emoji: '🏃' },
  ]},
  un: { family: 'un', words: [
    { word: 'sun', emoji: '☀️' }, { word: 'fun', emoji: '🎉' }, { word: 'run', emoji: '🏃' }, { word: 'bun', emoji: '🍔' },
  ]},
};

export default function PhonicsShowcase({ config, onComplete }: Props) {
  const family = (config.family as string) || 'at';
  const data = ALL_WORDS[family] || ALL_WORDS.at;
  const words = data.words;

  const [queue] = useState(() => shuffle([...words]));
  const [idx, setIdx] = useState(0);
  const [flash, setFlash] = useState<'correct' | 'wrong' | null>(null);
  const [finished, setFinished] = useState(false);
  const startTime = useRef(Date.now());

  const current = queue[idx];

  /* ── 3 quiz options: current + 2 random ── */
  const options = useMemo(() => {
    if (!current) return [];
    const pool = words.filter(w => w.word !== current.word);
    const wrongs = shuffle(pool).slice(0, 2);
    return shuffle([
      { id: 'c', word: current.word, emoji: current.emoji, correct: true },
      ...wrongs.map((w, i) => ({ id: `w${i}`, word: w.word, emoji: w.emoji, correct: false })),
    ]);
  }, [current, words]);

  const handleTap = useCallback((opt: { id: string; correct: boolean }) => {
    if (flash) return;
    if (opt.correct) {
      setFlash('correct');
      setTimeout(() => {
        setFlash(null);
        idx < queue.length - 1 ? setIdx(i => i + 1) : setFinished(true);
      }, 600);
    } else {
      setFlash('wrong');
      setTimeout(() => setFlash(null), 500);
    }
  }, [flash, idx, queue.length]);

  const handleDone = useCallback(() => {
    onComplete({
      score: 100, max_score: 100,
      completion_data: { family, words: words.length },
      time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
    });
  }, [onComplete, family, words.length]);

  /* ── Done screen ── */
  if (finished) {
    return (
      <div className="flex flex-col items-center gap-4 px-4 py-8 text-center">
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: 'tween', duration: 0.4 }} className="text-6xl">🎉</motion.span>
        <p className="text-base sm:text-lg font-black text-white/90">You read <span className="text-green-400">{family}</span> words!</p>
        <div className="flex flex-wrap justify-center gap-2">
          {words.map(w => (
            <div key={w.word} className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-lg">{w.emoji}</span>
              <span className="text-[9px] font-bold text-white/50">{w.word}</span>
            </div>
          ))}
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={handleDone}
          className="px-8 py-2.5 text-sm font-bold rounded-lg text-white"
          style={{ background: 'linear-gradient(135deg, #22C55E, #16A34A)' }}>
          Continue ➡️
        </motion.button>
      </div>
    );
  }

  /* ── Split: top half = letter + at, bottom half = 3 cards ── */
  const firstLetter = current.word[0];        // c
  const ending = current.word.slice(1);        // at

  return (
    <div className="flex flex-col items-center gap-3 px-3 pt-2 pb-3 select-none">
      {/* progress dots */}
      <div className="flex justify-center gap-1 w-full">
        {queue.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full ${i < idx ? 'bg-green-400' : i === idx ? 'bg-white' : 'bg-white/20'}`} />
        ))}
      </div>

      {/* big emoji */}
      <motion.span key={current.word + 'e'} initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="text-6xl sm:text-7xl">{current.emoji}</motion.span>

      {/* letter + family — pillai ku "c + at = cat" highlight */}
      <div className="flex items-center justify-center gap-0.5 my-0.5">
        <motion.span key={'fl-' + firstLetter} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="text-3xl sm:text-4xl font-black text-white">{firstLetter}</motion.span>
        <motion.span key={'fm-' + ending} initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.15 }}
          className="text-3xl sm:text-4xl font-black text-indigo-400">{ending}</motion.span>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-lg text-white/30 mx-1">=</motion.span>
        <motion.span key={'fw-' + current.word} initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl sm:text-4xl font-black text-green-400">{current.word}</motion.span>
      </div>

      {/* 3 quiz cards */}
      <motion.div
        animate={flash === 'wrong' ? { x: [0, -6, 6, -4, 4, 0] } : {}}
        transition={{ duration: 0.3, type: 'tween' }}
        className="grid grid-cols-3 gap-2.5 max-w-xs mx-auto mt-1"
      >
        {options.map(opt => {
          const isGreen = opt.correct && flash === 'correct';
          const isRed = !opt.correct && flash === 'wrong';
          return (
            <motion.button key={opt.id} whileTap={{ scale: 0.92 }}
              onClick={() => handleTap(opt)}
              className="flex flex-col items-center justify-center gap-1 p-3 sm:p-4 rounded-2xl shadow-lg transition-all"
              style={{
                background: isGreen ? 'linear-gradient(135deg, #22C55E, #16A34A)' : isRed ? 'linear-gradient(135deg, #EF4444, #DC2626)' : 'rgba(255,255,255,0.06)',
                border: isGreen ? '3px solid rgba(34,197,94,0.5)' : isRed ? '3px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.06)',
                boxShadow: isGreen ? '0 0 30px rgba(34,197,94,0.4)' : isRed ? '0 0 30px rgba(239,68,68,0.4)' : '0 4px 12px rgba(0,0,0,0.2)',
              }}
            >
              <span className="text-3xl sm:text-4xl">{opt.emoji}</span>
              <span className={`text-xs sm:text-sm font-black ${isGreen ? 'text-white' : isRed ? 'text-white' : 'text-white/50'}`}>
                {opt.word}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
