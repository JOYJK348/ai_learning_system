'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';

type Props = {
  config?: { path?: string; color?: string; isTamil?: boolean; borderless?: boolean };
  onComplete: (data: {
    score: number;
    max_score: number;
    completion_data: Record<string, unknown>;
    time_taken_seconds: number;
  }) => void;
};

/* ─── Path builders ─── */

function buildPath(pathType: string, w: number, h: number) {
  const pts: { x: number; y: number }[] = [];
  const steps = 60;
  const m = Math.max(24, w * 0.03);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    switch (pathType) {
      case 'standing':
        pts.push({ x: w / 2, y: h - m - t * (h - 2 * m) });
        break;
      case 'sleeping':
        pts.push({ x: m + t * (w - 2 * m), y: h / 2 });
        break;
      case 'slanting':
      case 'left-slanting':
        pts.push({ x: m + t * (w - 2 * m), y: h - m - t * (h - 2 * m) });
        break;
      case 'right-slanting':
        pts.push({ x: w - m - t * (w - 2 * m), y: h - m - t * (h - 2 * m) });
        break;
      case 'curved':
      case 'up-curve':
        pts.push({ x: m + t * (w - 2 * m), y: m + Math.sin(t * Math.PI) * h * 0.36 });
        break;
      case 'down-curve':
        pts.push({ x: m + t * (w - 2 * m), y: h - m - Math.sin(t * Math.PI) * h * 0.36 });
        break;
      case 'left-curve':
        pts.push({ x: w - m - Math.sin(t * Math.PI) * w * 0.28, y: m + t * (h - 2 * m) });
        break;
      case 'right-curve':
        pts.push({ x: m + Math.sin(t * Math.PI) * w * 0.28, y: m + t * (h - 2 * m) });
        break;
      case 'zigzag': {
        const segs = 5;
        const seg = Math.floor(t * segs);
        const lt = t * segs - seg;
        const x = m + t * (w - 2 * m);
        const y = seg % 2 === 0 ? m + lt * (h - 2 * m) : h - m - lt * (h - 2 * m);
        pts.push({ x, y });
        break;
      }
      case 's-curve':
        pts.push({ x: m + t * (w - 2 * m), y: h * 0.45 + Math.sin(t * Math.PI * 2) * h * 0.23 });
        break;
      case 'circle': {
        const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.32;
        const a = (i / steps) * Math.PI * 2;
        pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
        break;
      }
      default:
        pts.push({ x: m + t * (w - 2 * m), y: h / 2 });
    }
  }
  return pts;
}

/* ─── Per-path visual constants ─── */

interface PathVisual {
  label: string;
  emoji: string;
  color: string;
  duration: number;
}

const PATH_VISUALS: Record<string, PathVisual> = {
  standing:       { label: 'Standing Line',   emoji: '⬆️', color: '#6366F1', duration: 4000 },
  sleeping:       { label: 'Sleeping Line',   emoji: '➡️', color: '#22C55E', duration: 4000 },
  'left-slanting':{ label: 'Left Slant',      emoji: '↗️', color: '#F59E0B', duration: 4000 },
  'right-slanting':{ label: 'Right Slant',    emoji: '↖️', color: '#F97316', duration: 4000 },
  'up-curve':     { label: 'Up Curve',        emoji: '🙂', color: '#06B6D4', duration: 4000 },
  'down-curve':   { label: 'Down Curve',      emoji: '🙃', color: '#10B981', duration: 4000 },
  'left-curve':   { label: 'Left Curve',      emoji: '🌀', color: '#8B5CF6', duration: 4000 },
  'right-curve':  { label: 'Right Curve',     emoji: '🌀', color: '#EC4899', duration: 4000 },
  zigzag:         { label: 'Zig Zag',         emoji: '⚡', color: '#EF4444', duration: 4500 },
  's-curve':      { label: 'Wavy Path',       emoji: '〰️', color: '#22c55e', duration: 5000 },
  circle:         { label: 'Circle',          emoji: '⭕', color: '#818cf8', duration: 5500 },
};

function getVisual(path: string): PathVisual {
  return PATH_VISUALS[path] || { label: path, emoji: '✏️', color: '#8B5CF6', duration: 4000 };
}

/* ─── Tamil descriptions ─── */

const PATH_VISUALS_TA: Record<string, { label: string; emoji: string; desc: string }> = {
  standing:       { label: 'நேர்கோடு', emoji: '📏', desc: 'மேலிருந்து கீழ் நோக்கி நேராக வரையவும்!' },
  sleeping:       { label: 'படுக்கைகோடு', emoji: '🛏️', desc: 'இடமிருந்து வலமாக நேராக வரையவும்!' },
  'left-slanting':{ label: 'இடது சாய்வுகோடு', emoji: '📐', desc: 'இடதுபுறமாக சாய்வாக வரையவும்!' },
  'right-slanting':{ label: 'வலது சாய்வுகோடு', emoji: '📐', desc: 'வலதுபுறமாக சாய்வாக வரையவும்!' },
  'up-curve':     { label: 'மேல் வளைவு', emoji: '🌈', desc: 'மேல் நோக்கி வளைத்து வரையவும்!' },
  'down-curve':   { label: 'கீழ் வளைவு', emoji: '🌈', desc: 'கїழ் நோக்கி வளைத்து வரையவும்!' },
  'left-curve':   { label: 'இடது வளைவு', emoji: '🌀', desc: 'இடதுபுறமாக வளைத்து வரையவும்!' },
  'right-curve':  { label: 'வலது வளைவு', emoji: '🌀', desc: 'வலதுபுறமாக வளைத்து வரையவும்!' },
  zigzag:         { label: 'கோணல்மாணல் கோடு', emoji: '⚡', desc: 'ஏறி இறங்கி வளைந்து வரையவும்!' },
  's-curve':      { label: 'வளைந்து நெளிந்து', emoji: '🐍', desc: 'வளைந்து நெளிந்து வரையவும்!' },
  circle:         { label: 'வட்டம்', emoji: '⭕', desc: 'முழுமையாக வட்டமாக வரையவும்!' },
};

const PATH_DESCS_EN: Record<string, string> = {
  standing: 'Draw straight down from top to bottom!',
  sleeping: 'Draw straight from left to right!',
  'left-slanting': 'Draw a slanting line to the left!',
  'right-slanting': 'Draw a slanting line to the right!',
  'up-curve': 'Draw a curve bending upwards!',
  'down-curve': 'Draw a curve bending downwards!',
  'left-curve': 'Draw a curve bending to the left!',
  'right-curve': 'Draw a curve bending to the right!',
  zigzag: 'Draw zig-zag paths up and down!',
  's-curve': 'Draw a wavy slithering path!',
  circle: 'Draw a perfect round circle!',
};

/* ─── Dotted Guidelines inside Guide ─── */
function BoardLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      {[0.33, 0.66].map((y) => (
        <line
          key={y}
          x1="4%" y1={`${y * 100}%`} x2="96%" y2={`${y * 100}%`}
          stroke="rgba(180, 83, 9, 0.08)" strokeWidth="1.5" strokeDasharray="6 5"
        />
      ))}
    </svg>
  );
}

export default function PreWritingVideo({ config, onComplete }: Props) {
  const pathType = (config?.path as string) || 'sleeping';
  const visual = getVisual(pathType);

  const [phase, setPhase] = useState<'idle' | 'playing' | 'done'>('idle');
  const [progress, setProgress] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trailD, setTrailD] = useState('');
  const [bgD, setBgD] = useState('');
  const doneRef = useRef(false);
  const startTimeRef = useRef(Date.now());
  const animRef = useRef(0);
  const rafStartRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const ptsRef = useRef<{ x: number; y: number }[]>([]);

  const isCircle = pathType === 'circle';
  const params = useParams();
  const isTamil = config?.isTamil || params?.locale === 'ta';

  const currentLabel = isTamil ? (PATH_VISUALS_TA[pathType]?.label || visual.label) : visual.label;
  const currentEmoji = isTamil ? (PATH_VISUALS_TA[pathType]?.emoji || visual.emoji) : visual.emoji;
  const currentDesc = isTamil 
    ? (PATH_VISUALS_TA[pathType]?.desc || 'என் பின்னால் வரைந்து பழகவும்!') 
    : (PATH_DESCS_EN[pathType] || 'Watch the hand and learn!');

  /* Build static background once */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    if (width === 0 || height === 0) return;
    const pts = buildPath(pathType, width, height);
    ptsRef.current = pts;
    let bg = '';
    for (let i = 0; i < pts.length; i++) {
      bg += `${i === 0 ? 'M' : 'L'} ${pts[i].x} ${pts[i].y}`;
    }
    setBgD(bg);
  }, [pathType]);

  /* Animation loop */
  useEffect(() => {
    if (phase !== 'playing') return;
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    if (width === 0 || height === 0) return;
    const pts = ptsRef.current.length > 0 ? ptsRef.current : buildPath(pathType, width, height);
    ptsRef.current = pts;
    if (pts.length < 2) return;

    const duration = visual.duration;
    rafStartRef.current = Date.now();
    doneRef.current = false;

    const tick = () => {
      const elapsed = Date.now() - rafStartRef.current!;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(pct);

      const total = pts.length - 1;
      const raw = pct * total;
      const idx = Math.min(Math.floor(raw), total - 1);
      const frac = raw - idx;
      const p0 = pts[idx];
      const p1 = pts[Math.min(idx + 1, total)];
      const x = p0.x + (p1.x - p0.x) * frac;
      const y = p0.y + (p1.y - p0.y) * frac;
      setPos({ x, y });

      let d = '';
      const trailEnd = Math.floor(idx * 0.75);
      for (let i = 0; i <= trailEnd && i < pts.length; i++) {
        d += `${i === 0 ? 'M' : 'L'} ${pts[i].x} ${pts[i].y}`;
      }
      if (trailEnd >= 0 && frac > 0) {
        d += `L ${x} ${y}`;
      }
      setTrailD(d);

      if (pct >= 1) {
        if (doneRef.current) return;
        doneRef.current = true;
        setPhase('done');
      } else {
        animRef.current = requestAnimationFrame(tick);
      }
    };
    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [phase, pathType, visual.duration]);

  useEffect(() => {
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  const handlePlay = useCallback(() => {
    if (phase !== 'idle') return;
    setProgress(0);
    setPos({ x: 0, y: 0 });
    setTrailD('');
    startTimeRef.current = Date.now();
    setPhase('playing');
  }, [phase]);

  const handleReplay = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    doneRef.current = false;
    setProgress(0);
    setPos({ x: 0, y: 0 });
    setTrailD('');
    startTimeRef.current = Date.now();
    setPhase('playing');
  }, []);

  const handleComplete = useCallback(() => {
    onComplete({
      score: 100,
      max_score: 100,
      completion_data: { watched: true, path: pathType },
      time_taken_seconds: Math.round((Date.now() - startTimeRef.current) / 1000),
    });
  }, [onComplete, pathType]);

  const elapsed = Math.max(0, Math.min(progress, 1));

  return (
    <div className="flex flex-col items-center justify-center gap-3 px-3 sm:px-5 pb-4 select-none w-full relative">
      {/* Badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/50 border border-amber-200/50">
        <span className="text-[10px] font-black text-amber-800 tracking-wider uppercase font-sans">
          {isTamil ? 'அடித்தள பயிற்சி' : 'Pre-Writing Guide'}
        </span>
      </div>

      {/* Guide Easel Scene */}
      <div className="w-full flex flex-col items-stretch gap-4">
        {/* Mascot Prompt */}
        <div className="flex items-center gap-3 bg-amber-50/60 border border-amber-100 px-4 py-2.5 rounded-2xl shadow-sm">
          <motion.div 
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-3xl shrink-0 select-none"
          >
            🦉
          </motion.div>
          
          <div className="text-left font-sans">
            <h4 className="text-[9px] font-black text-amber-800/80 tracking-wider uppercase">
              {isTamil ? 'வழிகாட்டி' : 'Chippy says'}
            </h4>
            <p className="text-xs font-black text-amber-950 leading-snug mt-0.5">
              {phase === 'idle' 
                ? (isTamil ? 'வணக்கம் குட்டீஸ்! நேர்கோடு பார்க்கலாமா?' : 'Let\'s watch Chippy draw!')
                : phase === 'playing'
                ? currentDesc
                : (isTamil ? 'அருமை! இப்போது நீங்கள் வரைந்து பழகுங்கள்!' : 'Now trace the shape yourself!')}
            </p>
          </div>
        </div>

        {/* Cream drawing easel */}
        <div ref={containerRef} className="w-full relative flex flex-col items-center">
          <div 
            className="relative w-full overflow-hidden rounded-[2rem] border-4 border-[#b45309] shadow-sm bg-[#fffdf9]"
            style={{ aspectRatio: isCircle ? '1/1' : '16/9' }}
          >
            <BoardLines />

            {/* Dotted target path in soft gold */}
            {bgD && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d={bgD}
                  fill="none"
                  stroke="rgba(180, 83, 9, 0.12)"
                  strokeWidth="8"
                  strokeDasharray="2 12"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            )}

            {/* Glowing path trail */}
            {phase === 'playing' && trailD && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d={trailD}
                  fill="none"
                  stroke={visual.color}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}

            {/* Guiding pencil/hand */}
            {phase === 'playing' && (
              <div
                className="absolute z-10 pointer-events-none -translate-x-[20%] -translate-y-[85%]"
                style={{ left: pos.x, top: pos.y }}
              >
                <motion.div
                  animate={{ scale: [1, 1.08, 1], rotate: [0, -8, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-3xl filter drop-shadow-md select-none"
                >
                  ✍️
                </motion.div>
              </div>
            )}

            {/* Play demonstration overlay */}
            <AnimatePresence>
              {phase === 'idle' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#fffdf9]/70 backdrop-blur-[1px] cursor-pointer"
                  onClick={handlePlay}
                >
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500 border border-orange-200 shadow-md relative"
                  >
                    <div className="absolute inset-0 rounded-full bg-amber-300 animate-ping opacity-25" />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.button>
                  <p className="mt-3 text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-100 border border-amber-200 px-4 py-1.5 rounded-full font-sans shadow-sm">
                    {isTamil ? 'வழிகாட்டியைத் தொடங்கு ▶' : 'Start Guide ▶'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Lesson complete layout overlay */}
            <AnimatePresence>
              {phase === 'done' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#fffdf9]/90 backdrop-blur-[2px] p-4 text-center"
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    className="flex flex-col items-center max-w-[260px]"
                  >
                    <span className="text-4xl animate-bounce mb-1">{currentEmoji}</span>
                    <h3 className="text-base font-black text-amber-950 font-sans tracking-tight">{currentLabel}</h3>
                    <p className="text-xs font-bold text-amber-800 mt-1.5 leading-relaxed font-sans">
                      {isTamil ? 'வழிகாட்டி முடிந்தது! இப்போது வரைந்து பழகலாம்!' : 'Guide complete! Now trace it yourself!'}
                    </p>

                    <div className="flex gap-3 justify-center mt-5 w-full">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleReplay}
                        className="flex-1 py-2.5 text-xs font-black rounded-xl border border-amber-200 bg-amber-50 text-amber-800 transition-all font-sans"
                      >
                        {isTamil ? 'மீண்டும் 🔄' : 'Replay 🔄'}
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleComplete}
                        className="flex-1 py-2.5 text-xs font-black rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-md border-b-4 border-emerald-700 text-white transition-all font-sans"
                      >
                        {isTamil ? 'வரையலாம்! ➡️' : 'Let\'s Trace! ➡️'}
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom progress trail */}
            {phase === 'playing' && (
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-amber-100">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                  style={{ width: `${elapsed * 100}%` }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
