'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  config: { pairs?: Record<string, string>[] };
  onComplete: (data: {
    score: number; max_score: number;
    completion_data: Record<string, unknown>;
    time_taken_seconds: number;
  }) => void;
};

const SHAPE_COLORS: Record<string, string> = {
  circle: '#3B82F6', square: '#A855F7', triangle: '#F97316',
  rectangle: '#22C55E', oval: '#EC4899', diamond: '#06B6D4',
  star: '#EAB308', heart: '#EF4444',
};

const COLOR_MAP: Record<string, string> = {
  red: '#EF4444', blue: '#3B82F6', yellow: '#EAB308',
  green: '#22C55E', orange: '#F97316', purple: '#A855F7',
  pink: '#EC4899', brown: '#92400E', black: '#1F2937',
  white: '#F8FAFC', gray: '#9CA3AF',
};

const EMOJI_COLORS: Record<string, string> = {
  '🔴': '#EF4444', '🟠': '#F97316', '🟡': '#EAB308', '🟢': '#22C55E',
  '🔵': '#3B82F6', '🟣': '#A855F7', '🩷': '#EC4899', '🟤': '#92400E',
  '⚪': '#F8FAFC', '⚫': '#1F2937',
};

const EMOJI_PATTERNS: Record<string, string> = {
  '⭕': 'radial-gradient(circle, #3B82F640 0%, transparent 70%)',
  '⬜': 'linear-gradient(135deg, #A855F720, #A855F740)',
  '🔺': 'linear-gradient(135deg, #F9731620, #F9731640)',
  '⭐': 'radial-gradient(circle, #EAB30820, #EAB30840)',
  '❤️': 'radial-gradient(circle, #EF444420, #EF444440)',
  '💎': 'radial-gradient(circle, #06B6D420, #06B6D440)',
  '🥚': 'radial-gradient(circle, #EC489920, #EC489940)',
  '📘': 'linear-gradient(135deg, #22C55E20, #22C55E40)',
};

function getColorHex(label: string): string {
  const lower = label.toLowerCase().trim();
  for (const [shape, hex] of Object.entries(SHAPE_COLORS)) {
    if (lower === shape || lower.includes(shape)) return hex;
  }
  const emoji = [...label].find(ch => EMOJI_COLORS[ch]);
  if (emoji) return EMOJI_COLORS[emoji];
  for (const [key, hex] of Object.entries(COLOR_MAP)) {
    if (lower.includes(key)) return hex;
  }
  return '#6366F1';
}

function getPairValues(p: Record<string, string>): [string, string] {
  // JSONB reorders keys alphabetically, so Object.values order is unreliable.
  // Use explicit key access instead.
  if (typeof p.shape === 'string' && typeof p.emoji === 'string') return [p.shape, p.emoji];
  if (typeof p.color === 'string' && typeof p.item === 'string') return [p.color, p.item];
  if (typeof p.name === 'string' && typeof p.emoji === 'string') return [p.name, p.emoji];
  const vals = Object.values(p).filter(v => typeof v === 'string');
  if (vals.length >= 2) {
    const hasEmoji = (s: string) => [...s].some(ch => ch === '\uFE0F' || /\p{Emoji}/u.test(ch));
    const v0e = hasEmoji(vals[0]), v1e = hasEmoji(vals[1]);
    if (v1e && !v0e) return [vals[0], vals[1]];
    if (v0e && !v1e) return [vals[1], vals[0]];
  }
  return [vals[0] || '?', vals[1] || vals[0] || '?'];
}

function getEmojiBg(val: string): string {
  const normalized = val.replace(/\uFE0F/g, '');
  const first = [...normalized][0];
  for (const [pattern, bg] of Object.entries(EMOJI_PATTERNS)) {
    const normKey = pattern.replace(/\uFE0F/g, '');
    if (normKey === first) return bg;
  }
  return 'linear-gradient(135deg, #6366F120, #6366F140)';
}

export default function MatchPairs({ config, onComplete }: Props) {
  const rawPairs = useMemo(() => (config.pairs || []).slice(0, 8), [config.pairs]);
  const pairs = useMemo(() => rawPairs.map(p => getPairValues(p)), [rawPairs]);
  const isShapeActivity = useMemo(() =>
    pairs.some(([a]) => {
      const lower = a.toLowerCase().trim();
      return Object.keys(SHAPE_COLORS).some(k => lower === k || lower.includes(k));
    }),
  [pairs]);

  const [leftItems] = useState(() => {
    const idx = pairs.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx;
  });
  const [rightItems] = useState(() => {
    const idx = pairs.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx;
  });

  const [selected, setSelected] = useState<{ side: 'left' | 'right'; idx: number } | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [showWrong, setShowWrong] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [score, setScore] = useState(0);
  const startTime = useRef(Date.now());

  const handleTap = (side: 'left' | 'right', idx: number) => {
    if (matched.has(idx) || showWrong) return;

    if (!selected) {
      setSelected({ side, idx });
      return;
    }

    if (selected.side === side) {
      setSelected(null);
      return;
    }

    if (selected.idx === idx) {
      setScore(s => s + 1);
      const next = new Set(matched);
      next.add(idx);
      setMatched(next);
      setSelected(null);
      if (next.size >= pairs.length) {
        setTimeout(() => {
          setShowDone(true);
        }, 400);
      }
    } else {
      setShowWrong(true);
      setSelected(null);
      setTimeout(() => setShowWrong(false), 500);
    }
  };

  const handleFinish = () => {
    onComplete({
      score: Math.round((score / pairs.length) * 100),
      max_score: 100,
      completion_data: {
        matched: matched.size,
        total: pairs.length,
        correct_count: score,
      },
      time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
    });
  };

  const chalkWhite = '#f0ead0';
  const chalkDim = '#b8b098';

  if (showDone) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-5 px-6">
        <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }} className="text-7xl">
          {score === pairs.length ? '🏆' : score >= pairs.length / 2 ? '🌟' : '💪'}
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-black text-center" style={{ color: chalkWhite }}>
          {score === pairs.length ? 'Perfect Match!' : score >= pairs.length / 2 ? 'Great Job!' : 'Keep Trying!'}
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="font-bold text-center" style={{ color: chalkDim }}>
          You matched {score} out of {pairs.length}
        </motion.p>
        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={handleFinish}
          className="px-10 py-4 font-black text-lg rounded-2xl shadow-xl"
          style={{ background: '#3a6a3a', border: '2px solid #5a8a5a', color: chalkWhite }}>
          Done 🎉
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-5 px-3 sm:px-6 pb-6 sm:pb-10 pt-4">
      {/* Header */}
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg sm:text-xl font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" style={{ color: chalkWhite }}>
            {isShapeActivity ? 'Match the Shape!' : 'Match the Color!'}
          </h3>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: 'rgba(90,122,90,0.3)', border: '1px solid rgba(90,122,90,0.4)', color: chalkDim }}>
            {matched.size}/{pairs.length}
          </span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(90,122,90,0.2)' }}>
          <motion.div className="h-full rounded-full" style={{ background: '#5a8a5a' }}
            initial={{ width: '0%' }}
            animate={{ width: `${(matched.size / pairs.length) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }} />
        </div>
        <p className="text-xs sm:text-sm font-bold mt-2 text-center" style={{ color: chalkDim }}>
          {selected ? 'Tap the matching item' : matched.size === 0 ? '👆 Tap a color, then tap the matching shape!' : '👆 Keep matching!'}
        </p>
      </div>

      {/* Game grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-sm"
        style={showWrong ? { animation: 'shakemp 0.4s ease-in-out' } : undefined}>
        {/* Left: colors */}
        <div className="flex flex-col gap-2 sm:gap-3">
          {leftItems.map((pairIdx) => {
            const done = matched.has(pairIdx);
            const sel = selected?.side === 'left' && selected?.idx === pairIdx;
            const hex = getColorHex(pairs[pairIdx][0]);
            return (
              <motion.button key={`l-${pairIdx}`} layout
                whileTap={done ? {} : { scale: 0.92 }}
                onClick={() => handleTap('left', pairIdx)} disabled={done}
                className="relative rounded-xl transition-all duration-300 overflow-hidden"
                style={{
                  border: `2px solid ${done ? 'rgba(90,138,90,0.3)' : sel ? 'rgba(200,180,100,0.6)' : 'rgba(90,122,90,0.3)'}`,
                  background: done ? 'rgba(90,138,90,0.1)' : sel ? 'rgba(200,180,100,0.1)' : 'rgba(90,122,90,0.1)',
                  opacity: done ? 0.5 : 1,
                }}>
                <div className="flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg shrink-0 border-2"
                    style={{
                      borderColor: 'rgba(90,122,90,0.4)',
                      background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.3) 0%, transparent 70%), ${hex}`,
                      boxShadow: sel ? `0 0 16px ${hex}66` : 'none',
                    }} />
                  <span className="text-xs sm:text-sm font-bold" style={{ color: done ? 'rgba(240,234,208,0.4)' : chalkWhite }}>
                    {pairs[pairIdx][0]}
                  </span>
                  {done && <span className="ml-auto" style={{ color: '#5a8a5a' }}>✓</span>}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right: items */}
        <div className="flex flex-col gap-2 sm:gap-3">
          {rightItems.map((pairIdx) => {
            const done = matched.has(pairIdx);
            const sel = selected?.side === 'right' && selected?.idx === pairIdx;
            const val = pairs[pairIdx][1];
            const emojiChars = [...val].filter(ch => /\p{Emoji}/u.test(ch)).join('');
            const textPart = val.replace(/\p{Emoji}/gu, '').trim();
            return (
              <motion.button key={`r-${pairIdx}`} layout
                whileTap={done ? {} : { scale: 0.92 }}
                onClick={() => handleTap('right', pairIdx)} disabled={done}
                className="relative rounded-xl transition-all duration-300 overflow-hidden"
                style={{
                  border: `2px solid ${done ? 'rgba(90,138,90,0.3)' : sel ? 'rgba(200,180,100,0.6)' : 'rgba(90,122,90,0.3)'}`,
                  background: done ? 'rgba(90,138,90,0.1)' : sel ? 'rgba(200,180,100,0.1)' : 'rgba(90,122,90,0.1)',
                  opacity: done ? 0.5 : 1,
                }}>
                <div className="flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:px-4 sm:py-3">
                  {emojiChars ? (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-xl sm:text-2xl shrink-0 border-2"
                      style={{ borderColor: 'rgba(90,122,90,0.4)', background: getEmojiBg(val) }}>
                      {emojiChars}
                    </div>
                  ) : null}
                  {textPart && (
                    <span className="text-xs sm:text-sm font-bold" style={{ color: done ? 'rgba(240,234,208,0.4)' : chalkWhite }}>
                      {textPart}
                    </span>
                  )}
                  {!textPart && emojiChars && (
                    <span className="text-xs sm:text-sm font-bold" style={{ color: chalkWhite }}>{val}</span>
                  )}
                  {done && <span className="ml-auto" style={{ color: '#5a8a5a' }}>✓</span>}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Hint */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="text-xs font-bold text-center" style={{ color: 'rgba(200,180,100,0.6)' }}>
            Selected: {selected.side === 'left' ? pairs[selected.idx][0] : pairs[selected.idx][1]}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes shakemp {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          50% { transform: translateX(8px); }
          75% { transform: translateX(-4px); }
        }
      `}</style>
    </div>
  );
}
