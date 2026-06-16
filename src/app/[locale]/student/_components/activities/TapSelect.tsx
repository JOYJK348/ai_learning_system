'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { shuffle } from '@/core/data/letterData';

type Option = { id: string; label: string };
type Props = {
  config: { prompt?: string; options?: Option[]; correct_id?: string };
  onComplete: (data: {
    score: number; max_score: number;
    completion_data: Record<string, unknown>;
    time_taken_seconds: number;
  }) => void;
};

type Round = { label: string; correctId: string };

const COLOR_MAP: Record<string, string> = {
  red: '#EF4444',
  blue: '#3B82F6',
  yellow: '#EAB308',
  green: '#22C55E',
  orange: '#F97316',
  purple: '#A855F7',
  pink: '#EC4899',
  brown: '#92400E',
  black: '#1F2937',
  white: '#F8FAFC',
  gray: '#9CA3AF',
};

const EMOJI_COLORS: Record<string, string> = {
  '🔴': '#EF4444', '🟠': '#F97316', '🟡': '#EAB308', '🟢': '#22C55E',
  '🔵': '#3B82F6', '🟣': '#A855F7', '🩷': '#EC4899', '🟤': '#92400E',
  '⚪': '#F8FAFC', '⚫': '#1F2937',
};

function getColorHex(label: string): string {
  // Try emoji first
  const emoji = [...label].find(ch => EMOJI_COLORS[ch]);
  if (emoji) return EMOJI_COLORS[emoji];
  // Try color name
  const lower = label.toLowerCase();
  for (const [key, hex] of Object.entries(COLOR_MAP)) {
    if (lower.includes(key)) return hex;
  }
  return '#6366F1';
}

const SWATCH_BG = 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.3) 0%, transparent 70%)';

export default function TapSelect({ config, onComplete }: Props) {
  const rounds: Round[] = (() => {
    const opts = config.options || [];
    const correctOpt = opts.find(o => o.id === config.correct_id);
    const others = opts.filter(o => o.id !== config.correct_id);
    const shuffledOthers = shuffle(others);
    const targets = correctOpt ? [correctOpt, ...shuffledOthers.slice(0, 2)] : opts.slice(0, 3);
    return targets.map(t => ({ label: t.label, correctId: t.id }));
  })();

  const totalRounds = rounds.length;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [shuffledOpts, setShuffledOpts] = useState(() => shuffle(config.options || []));
  const [selWrong, setSelWrong] = useState(false);
  const [selRight, setSelRight] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentRound = rounds[round];
  const currentHex = getColorHex(currentRound?.label || '');
  const currentPrompt = `Find the color ${currentRound?.label.split(' ').slice(-1)[0]}!`;

  const handleTap = useCallback((id: string) => {
    if (selWrong || selRight || !currentRound) return;

    if (id === currentRound.correctId) {
      setSelRight(true);
      setScore(s => s + 1);
      setTimeout(() => {
        setSelRight(false);
        if (round + 1 >= totalRounds) {
          setDone(true);
        } else {
          setRound(r => r + 1);
          setShuffledOpts(shuffle(config.options || []));
        }
      }, 700);
    } else {
      setSelWrong(true);
      setTimeout(() => setSelWrong(false), 500);
    }
  }, [currentRound, selWrong, selRight, round, totalRounds, config.options]);

  if (done) {
    return (
      <div className="flex flex-col items-center gap-6 px-6 py-10">
        <motion.span animate={{ scale: [1, 1.2, 1] }} className="text-6xl">🏆</motion.span>
        <h2 className="text-3xl font-black text-white drop-shadow-lg text-center">Color Star!</h2>
        <p className="text-lg font-bold text-white/70">Score: {score}/{totalRounds}</p>
        <motion.button whileTap={{ scale: 0.92 }}
          onClick={() => onComplete({ score, max_score: totalRounds, completion_data: { correct: score, total: totalRounds }, time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000) })}
          className="px-10 py-4 bg-white/25 backdrop-blur-md text-white font-black text-lg rounded-full border-2 border-white/40 shadow-lg">
          Next ➡️
        </motion.button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-5 px-4 py-6 ${selWrong ? 'animate-[shake_0.3s_ease-in-out]' : ''}`}>
      {/* Prompt with color swatch */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl shadow-lg border-2 border-white/40"
          style={{
            background: `${SWATCH_BG}, ${currentHex}`,
            boxShadow: `0 0 16px ${currentHex}66`,
          }}
        />
        <h3 className="text-lg sm:text-xl font-black text-white drop-shadow-lg">
          {currentPrompt}
        </h3>
      </div>

      {selRight && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 px-4 py-2 bg-green-400/30 backdrop-blur-md rounded-full border border-green-400/50">
          <span className="text-xl">✅</span>
          <span className="font-bold text-green-200">Correct!</span>
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {shuffledOpts.map((opt, i) => {
          const isCorrect = opt.id === currentRound.correctId;
          const showCorrect = selRight && isCorrect;

          return (
            <motion.button
              key={opt.id + round}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleTap(opt.id)}
              className={`relative min-h-[100px] rounded-2xl shadow-xl border-2 flex flex-col items-center justify-center gap-2 p-4 transition-all overflow-hidden
                ${showCorrect
                  ? 'border-green-400 bg-green-400/20 scale-105'
                  : selWrong
                    ? 'border-white/30 bg-white/10'
                    : 'bg-white/20 hover:bg-white/30 border-white/30'}`}
            >
              {/* Color swatch */}
              <div
                className="w-14 h-14 rounded-full shadow-inner border-2 border-white/30"
                style={{
                  background: `${SWATCH_BG}, ${getColorHex(opt.label)}`,
                  boxShadow: `0 0 12px ${getColorHex(opt.label)}66`,
                  borderColor: getColorHex(opt.label) === '#F8FAFC' ? '#CBD5E1' : 'rgba(255,255,255,0.3)',
                }}
              />

              {/* Label */}
              <span className="text-sm font-bold text-white drop-shadow-md">
                {opt.label.split(' ').slice(-1)[0]}
              </span>

              {/* Correct check overlay */}
              {showCorrect && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center"
                >
                  <span className="text-xs">✓</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalRounds }).map((_, i) => (
          <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${i < round ? 'bg-green-400 scale-110 shadow-sm' : i === round ? 'bg-white scale-110 shadow-sm' : 'bg-white/30'}`} />
        ))}
      </div>
    </div>
  );
}
