'use client';

import { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { shuffle } from '@/core/data/letterData';

type Props = {
  config: { pairs?: Record<string, string>[] };
  onComplete: (data: {
    score: number; max_score: number;
    completion_data: Record<string, unknown>;
    time_taken_seconds: number;
  }) => void;
};

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

function getPairValues(p: Record<string, string>): [string, string] {
  const vals = Object.values(p).filter(v => typeof v === 'string');
  // Check which value is a color name - put color first
  const colorKeys = ['red','blue','yellow','green','orange','purple','pink','brown','black','white','gray','grey'];
  const isColor = (s: string) => colorKeys.some(k => s.toLowerCase().includes(k));
  if (vals.length >= 2 && isColor(vals[1]) && !isColor(vals[0])) {
    return [vals[1], vals[0]]; // swap so color is first
  }
  return [vals[0] || '?', vals[1] || vals[0] || '?'];
}

const SWATCH_BG = 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.3) 0%, transparent 70%)';

export default function MatchPairs({ config, onComplete }: Props) {
  const rawPairs = useMemo(() => (config.pairs || []).slice(0, 8), [config.pairs]);
  const pairs = useMemo(() => rawPairs.map(p => getPairValues(p)), [rawPairs]);

  const [leftItems] = useState(() => shuffle(pairs.map((_, i) => i)));
  const [rightItems] = useState(() => shuffle(pairs.map((_, i) => i)));

  const [selected, setSelected] = useState<{ side: 'left' | 'right'; idx: number } | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState(false);
  const startTime = useRef(Date.now());

  const handleTap = (side: 'left' | 'right', idx: number) => {
    if (matched.has(idx) || wrong) return;

    if (!selected) {
      setSelected({ side, idx });
      return;
    }

    if (selected.side === side) {
      setSelected(null);
      return;
    }

    if (selected.idx === idx) {
      const next = new Set(matched);
      next.add(idx);
      setMatched(next);
      setSelected(null);
      if (next.size >= pairs.length) {
        setTimeout(() => {
          onComplete({
            score: 100, max_score: 100,
            completion_data: { matched: next.size, total: pairs.length },
            time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
          });
        }, 500);
      }
    } else {
      setWrong(true);
      setSelected(null);
      setTimeout(() => setWrong(false), 600);
    }
  };

  return (
    <div className={`flex flex-col items-center gap-4 sm:gap-5 px-3 sm:px-6 pb-6 sm:pb-10 pt-4 ${wrong ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
      <h3 className="text-lg sm:text-xl font-black text-white drop-shadow-lg text-center">🔗 Match the color to the object!</h3>

      <p className="text-sm font-bold text-white/60 -mt-3">
        {selected
          ? `👆 Now tap the matching ${selected.side === 'left' ? 'object' : 'color'}!`
          : '👆 Tap a color, then tap what matches it!'}
      </p>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-sm">
        {/* Left: colored circles */}
        <div className="flex flex-col gap-3">
          {leftItems.map((pairIdx) => {
            const done = matched.has(pairIdx);
            const sel = selected?.side === 'left' && selected?.idx === pairIdx;
            const hex = getColorHex(pairs[pairIdx][0]);
            return (
              <motion.button
                key={`l-${pairIdx}`}
                whileTap={{ scale: done ? 1 : 0.92 }}
                onClick={() => handleTap('left', pairIdx)}
                disabled={done}
                className={`min-h-[56px] rounded-xl shadow-lg border-2 flex items-center justify-center transition-all
                  ${done ? 'border-emerald-400 opacity-60' : sel ? 'border-yellow-300 ring-2 ring-yellow-300/50 scale-105' : 'border-white/30 bg-white/10 hover:bg-white/20'}`}
              >
                <div
                  className="w-9 h-9 rounded-full shadow-inner border-2 border-white/40"
                  style={{
                    background: `${SWATCH_BG}, ${hex}`,
                    boxShadow: done ? 'none' : `0 0 12px ${hex}66`,
                  }}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Right: item names */}
        <div className="flex flex-col gap-3">
          {rightItems.map((pairIdx) => {
            const done = matched.has(pairIdx);
            const sel = selected?.side === 'right' && selected?.idx === pairIdx;
            return (
              <motion.button
                key={`r-${pairIdx}`}
                whileTap={{ scale: done ? 1 : 0.92 }}
                onClick={() => handleTap('right', pairIdx)}
                disabled={done}
                className={`min-h-[56px] rounded-xl shadow-lg border-2 flex items-center justify-center px-4 transition-all
                  ${done ? 'border-emerald-400 bg-emerald-400/20 text-white/60 line-through opacity-60' : sel ? 'border-yellow-300 bg-white/20 ring-2 ring-yellow-300/50 scale-105' : 'border-white/30 bg-white/10 hover:bg-white/20'}`}
              >
                <span className="text-sm font-bold text-white drop-shadow-md">{pairs[pairIdx][1]}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: pairs.length }).map((_, i) => (
          <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${matched.has(i) ? 'bg-green-400 scale-110' : 'bg-white/30'}`} />
        ))}
      </div>

      {matched.size > 0 && (
        <p className="text-xs font-bold text-white/50">{matched.size}/{pairs.length} matched</p>
      )}
    </div>
  );
}
