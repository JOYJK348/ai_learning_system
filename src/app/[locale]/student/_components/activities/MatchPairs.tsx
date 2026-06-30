'use client';

import { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { shuffle } from '@/core/data/letterData';
import { HelpCircle, CheckCircle } from 'lucide-react';

type Props = {
  config: { pairs?: Record<string, string>[]; mode?: 'color' | 'text' };
  onComplete: (data: {
    score: number; max_score: number;
    completion_data: Record<string, unknown>;
    time_taken_seconds: number;
  }) => void;
};

const COLOR_MAP: Record<string, string> = {
  red: '#EF4444', blue: '#3B82F6', yellow: '#EAB308', green: '#22C55E',
  orange: '#F97316', purple: '#A855F7', pink: '#EC4899', brown: '#92400E',
  black: '#1F2937', white: '#F8FAFC', gray: '#9CA3AF',
};

const EMOJI_COLORS: Record<string, string> = {
  '🔴': '#EF4444', '🟠': '#F97316', '🟡': '#EAB308', '🟢': '#22C55E',
  '🔵': '#3B82F6', '🟣': '#A855F7', '🩷': '#EC4899', '🟤': '#92400E',
  '⚪': '#F8FAFC', '⚫': '#1F2937',
};

function getColorHex(label: string): string {
  const emoji = [...label].find(ch => EMOJI_COLORS[ch]);
  if (emoji) return EMOJI_COLORS[emoji];
  const lower = label.toLowerCase();
  for (const [key, hex] of Object.entries(COLOR_MAP)) {
    if (lower.includes(key)) return hex;
  }
  return '#6366F1';
}

function getPairValues(p: Record<string, string>): [string, string] {
  const vals = Object.values(p).filter(v => typeof v === 'string');
  const colorKeys = ['red','blue','yellow','green','orange','purple','pink','brown','black','white','gray','grey'];
  const isColor = (s: string) => colorKeys.some(k => s.toLowerCase().includes(k));
  if (vals.length >= 2 && isColor(vals[1]) && !isColor(vals[0])) {
    return [vals[1], vals[0]];
  }
  return [vals[0] || '?', vals[1] || vals[0] || '?'];
}

const SWATCH_BG = 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.3) 0%, transparent 70%)';

export default function MatchPairs({ config, onComplete }: Props) {
  const defaultPairs = [
    { a: 'A', b: 'a' },
    { a: 'B', b: 'b' },
    { a: 'C', b: 'c' },
    { a: 'D', b: 'd' }
  ];
  
  const rawPairs = useMemo(() => (config.pairs || defaultPairs).slice(0, 5), [config.pairs]);
  const pairs = useMemo(() => rawPairs.map(p => getPairValues(p)), [rawPairs]);

  // Determine if it is capital-to-small or other text-to-text mode
  const isColorMode = useMemo(() => {
    if (config.mode === 'text') return false;
    if (config.mode === 'color') return true;
    // Auto-detect based on first element
    const firstVal = pairs[0]?.[0] || '';
    return firstVal.length > 2 && !/[A-Z]/.test(firstVal);
  }, [config.mode, pairs]);

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
    <div className={`flex flex-col items-center gap-5 px-4 py-4 kids-font ${wrong ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font {
          font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
        }
      `}} />

      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🔗 Letter Matching Connect
        </span>
        <h3 className="text-2xl font-black text-indigo-950 mt-2">
          {isColorMode ? 'Match Color to Object' : 'Connect Capitals to Small Letters!'}
        </h3>
      </div>

      <p className="text-sm font-bold text-indigo-950/60 -mt-2 text-center">
        {selected
          ? `👆 Now tap the matching ${selected.side === 'left' ? 'Small Letter' : 'Capital Letter'}!`
          : '👆 Tap a Capital letter, then tap its matching Small letter!'}
      </p>

      {/* Matching Grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-2">
        {/* Left Column */}
        <div className="flex flex-col gap-3">
          {leftItems.map((pairIdx) => {
            const done = matched.has(pairIdx);
            const sel = selected?.side === 'left' && selected?.idx === pairIdx;
            const hex = getColorHex(pairs[pairIdx][0]);
            
            let btnStyle = 'border-indigo-100 bg-white border-b-4 hover:border-indigo-200';
            if (done) btnStyle = 'border-emerald-500 bg-emerald-50 opacity-60';
            else if (sel) btnStyle = 'border-indigo-500 bg-indigo-50/50 ring-2 ring-indigo-300 scale-105';

            return (
              <motion.button
                key={`l-${pairIdx}`}
                whileHover={!done ? { scale: 1.03 } : {}}
                whileTap={!done ? { scale: 0.95 } : {}}
                onClick={() => handleTap('left', pairIdx)}
                disabled={done}
                className={`min-h-[64px] rounded-2xl shadow-md border-2 flex items-center justify-center p-3 transition-all cursor-pointer ${btnStyle}`}
              >
                {isColorMode ? (
                  <div
                    className="w-10 h-10 rounded-full shadow-inner border-2 border-white/40"
                    style={{
                      background: `${SWATCH_BG}, ${hex}`,
                      boxShadow: done ? 'none' : `0 0 12px ${hex}66`,
                    }}
                  />
                ) : (
                  <span className="text-3xl font-black text-indigo-950 uppercase select-none font-sans">
                    {pairs[pairIdx][0]}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-3">
          {rightItems.map((pairIdx) => {
            const done = matched.has(pairIdx);
            const sel = selected?.side === 'right' && selected?.idx === pairIdx;
            
            let btnStyle = 'border-indigo-100 bg-white border-b-4 hover:border-indigo-200';
            if (done) btnStyle = 'border-emerald-500 bg-emerald-50 opacity-60 line-through text-emerald-700';
            else if (sel) btnStyle = 'border-indigo-500 bg-indigo-50/50 ring-2 ring-indigo-300 scale-105';

            return (
              <motion.button
                key={`r-${pairIdx}`}
                whileHover={!done ? { scale: 1.03 } : {}}
                whileTap={!done ? { scale: 0.95 } : {}}
                onClick={() => handleTap('right', pairIdx)}
                disabled={done}
                className={`min-h-[64px] rounded-2xl shadow-md border-2 flex items-center justify-center p-3 transition-all cursor-pointer ${btnStyle}`}
              >
                <span className="text-3xl font-black text-indigo-950 lowercase select-none font-sans">
                  {pairs[pairIdx][1]}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-2 mt-2">
        {Array.from({ length: pairs.length }).map((_, i) => (
          <div key={i} className={`w-3.5 h-3.5 rounded-full border shadow-sm transition-all duration-350
            ${matched.has(i) ? 'bg-emerald-500 border-emerald-400 scale-110' : 'bg-white border-slate-200'}`} 
          />
        ))}
      </div>

      <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest mt-1">
        {matched.size}/{pairs.length} pairs matched
      </p>
    </div>
  );
}
