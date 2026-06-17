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
        pts.push({ x: m + t * (w - 2 * m), y: m + Math.sin(t * Math.PI) * h * 0.4 });
        break;
      case 'down-curve':
        pts.push({ x: m + t * (w - 2 * m), y: h - m - Math.sin(t * Math.PI) * h * 0.4 });
        break;
      case 'left-curve':
        pts.push({ x: w - m - Math.sin(t * Math.PI) * w * 0.3, y: m + t * (h - 2 * m) });
        break;
      case 'right-curve':
        pts.push({ x: m + Math.sin(t * Math.PI) * w * 0.3, y: m + t * (h - 2 * m) });
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
        pts.push({ x: m + t * (w - 2 * m), y: h * 0.45 + Math.sin(t * Math.PI * 2) * h * 0.25 });
        break;
      case 'circle': {
        const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.33;
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

/* ─── Component ─── */

const PATH_VISUALS_TA: Record<string, { label: string; emoji: string; desc: string }> = {
  standing:       { label: 'நேர்கோடு', emoji: '📏', desc: 'மேலிருந்து கீழ் நோக்கி நேராக வரையவும்!' },
  sleeping:       { label: 'படுக்கைகோடு', emoji: '🛏️', desc: 'இடமிருந்து வலமாக நேராக வரையவும்!' },
  'left-slanting':{ label: 'இடது சாய்வுகோடு', emoji: '📐', desc: 'இடதுபுறமாக சாய்வாக வரையவும்!' },
  'right-slanting':{ label: 'வலது சாய்வுகோடு', emoji: '📐', desc: 'வலதுபுறமாக சாய்வாக வரையவும்!' },
  'up-curve':     { label: 'மேல் வளைவு', emoji: '🌈', desc: 'மேல் நோக்கி வளைத்து வரையவும்!' },
  'down-curve':   { label: 'கீழ் வளைவு', emoji: '🌈', desc: 'கீழ் நோக்கி வளைத்து வரையவும்!' },
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

  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; color: string; duration: number }[]>([]);
  const particleIdRef = useRef(0);

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

  /* Animation loop with particle spawns */
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

      if (Math.random() < 0.4) {
        setParticles(prev => [
          ...prev.slice(-15),
          {
            id: ++particleIdRef.current,
            x: x + (Math.random() - 0.5) * 8,
            y: y + (Math.random() - 0.5) * 8,
            size: Math.random() * 4 + 2,
            color: Math.random() > 0.5 ? '#fffed0' : '#ffffff',
            duration: Math.random() * 0.4 + 0.3,
          }
        ]);
      }

      let d = '';
      const trailEnd = Math.floor(idx * 0.7);
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
    setParticles([]);
    startTimeRef.current = Date.now();
    setPhase('playing');
  }, [phase]);

  const handleReplay = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    doneRef.current = false;
    setProgress(0);
    setPos({ x: 0, y: 0 });
    setTrailD('');
    setParticles([]);
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
    <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 px-2 sm:px-4 pb-2 sm:pb-4 select-none w-full relative overflow-hidden">
      {/* Decorative clean header bubble */}
      <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.12)] border border-white/85 z-10">
        <span className="text-lg sm:text-2xl shrink-0 animate-bounce">{currentEmoji}</span>
        <h2 className="text-[11px] sm:text-base font-black text-sky-950 font-sans tracking-tight">
          {isTamil ? `${currentLabel} வரையப் பழகுங்கள்!` : `Learn to Draw: ${currentLabel}`}
        </h2>
      </div>

      {/* Guide Classroom easel scene */}
      <div className="w-full flex flex-col md:flex-row items-stretch gap-2.5 sm:gap-5 z-10">
        {/* Playful Guide Mascot with Speech Bubble (Borderless and fully integrated) */}
        <div className="flex flex-row md:flex-col items-center gap-2 bg-white/30 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border border-white/50 shadow-sm w-full md:w-[150px] shrink-0 justify-center">
          <motion.div 
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-2xl sm:text-5xl filter drop-shadow-sm"
          >
            {phase === 'done' ? '🦉👏' : '🦉✨'}
          </motion.div>
          
          <div className="flex-1 text-left md:text-center">
            <h4 className="text-[8px] sm:text-[10px] font-black text-sky-950/70 tracking-wider uppercase font-sans">
              {isTamil ? 'வழிகாட்டி' : 'Teacher Chippy'}
            </h4>
            <p className="text-[10px] sm:text-xs font-black text-sky-900/90 leading-tight mt-0.5 font-sans">
              {phase === 'idle' 
                ? (isTamil ? 'வணக்கம் குட்டீஸ்! பார்க்கலாமா?' : 'Hi kids! Ready to watch?')
                : phase === 'playing'
                ? currentDesc
                : (isTamil ? 'அருமை! இப்போது நீங்கள் வரைந்து பழகுங்கள்!' : 'Awesome! Now it\'s your turn!')}
            </p>
          </div>
        </div>

        {/* Chalkboard Display Area with Easel wood border styling */}
        <div ref={containerRef} className="w-full relative flex flex-col items-center justify-center">
          {/* Main Drawing Chalkboard Easel */}
          <div 
            className={`relative w-full overflow-hidden max-h-[35vh] sm:max-h-[45vh] md:max-h-none ${config?.borderless ? '' : 'rounded-[2rem] border-[14px] border-[#5a3825] shadow-[0_16px_36px_rgba(0,0,0,0.35),_inset_0_4px_24px_rgba(0,0,0,0.7)]'}`}
            style={{
              aspectRatio: isCircle ? '1/1' : '16/9',
              ...(!config?.borderless && {
                backgroundColor: '#0c2e22',
                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 12%, transparent 13%)',
                backgroundSize: '10px 10px',
              })
            }}
          >
            {/* Soft Chalk Dust Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-black/30 pointer-events-none" />

            {/* Dotted target path representing cookies/stars/candies for kid interaction */}
            {bgD && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d={bgD}
                  fill="none"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="8"
                  strokeDasharray="2 12"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            )}

            {/* Glowing Chalk trail */}
            {phase === 'playing' && trailD && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d={trailD}
                  fill="none"
                  stroke="rgba(255,255,255,0.95)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.6))' }}
                />
              </svg>
            )}

            {/* Particles (chalk dust) */}
            {particles.map(p => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, scale: 1, y: 0 }}
                animate={{ opacity: 0, scale: 0.3, y: 15 }}
                transition={{ duration: p.duration, ease: 'easeOut' }}
                className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: p.x,
                  top: p.y,
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  boxShadow: `0 0 6px ${p.color}`,
                }}
              />
            ))}

            {/* Animated drawing tool resembling a cute cartoon hand writing with chalk */}
            {phase === 'playing' && (
              <div
                className="absolute z-10 pointer-events-none -translate-x-[20%] -translate-y-[85%]"
                style={{ left: pos.x, top: pos.y }}
              >
                {/* Floating indicator */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-3xl filter drop-shadow-md select-none"
                >
                  ✍️
                </motion.div>
                {/* chalk tip glow */}
                <div className="w-5 h-5 rounded-full bg-white/30 blur-sm absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
              </div>
            )}

            {/* Play demonstration overlay */}
            <AnimatePresence>
              {phase === 'idle' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[1px] cursor-pointer"
                  onClick={handlePlay}
                >
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="w-14 h-14 sm:w-18 sm:h-18 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-400 to-amber-500 border-2 border-white shadow-lg transition-all relative group"
                  >
                    <div className="absolute inset-0 rounded-full bg-yellow-300 animate-ping opacity-20" />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1 sm:w-6 sm:h-6">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.button>
                  <p className="mt-2 text-[10px] sm:text-xs font-black uppercase tracking-wider text-white bg-[#5a3825] px-4 py-1.5 rounded-full border border-white/20 font-sans shadow-md active:scale-95">
                    {isTamil ? 'வழிகாட்டியைத் தொடங்கு ▶' : 'Start Guide Video ▶'}
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
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/75 backdrop-blur-[3px] p-4 text-center"
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    className="flex flex-col items-center max-w-[260px]"
                  >
                    <span className="text-3xl animate-bounce mb-1">🎉</span>
                    <h3 className="text-sm sm:text-base font-black text-yellow-300 font-sans tracking-tight">{currentLabel}</h3>
                    <p className="text-[10px] sm:text-xs font-bold text-white/95 mt-1 leading-relaxed font-sans">
                      {isTamil ? 'வழிகாட்டி முடிந்தது! இப்போது வரைந்து பழகலாம்!' : 'Guide complete! Now trace it yourself!'}
                    </p>

                    <div className="flex gap-2 justify-center mt-4 w-full">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleReplay}
                        className="flex-1 px-3 py-1.5 text-[10px] font-black rounded-full border border-white/20 bg-white/10 text-white transition-all font-sans"
                      >
                        {isTamil ? 'மீண்டும் 🔄' : 'Replay 🔄'}
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleComplete}
                        className="flex-1 px-3 py-1.5 text-[10px] font-black rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 border border-white text-white transition-all font-sans"
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
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/20">
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-300 to-amber-500"
                  style={{ width: `${elapsed * 100}%` }}
                />
              </div>
            )}
          </div>

          {/* Wooden Chalk Tray at the bottom */}
          {!config?.borderless && (
            <div className="w-[90%] mx-auto h-3 bg-[#4a2e1f] rounded-b-xl shadow-md flex items-center justify-start px-8 gap-3 relative z-10 border-t border-black/20">
              {/* Yellow Chalk */}
              <div className="w-7 h-2 bg-yellow-100 rounded-sm transform rotate-6 border border-yellow-200/50 shadow-sm" />
              {/* White Chalk */}
              <div className="w-8 h-2 bg-white rounded-sm transform -rotate-3 border border-white/20 shadow-sm" />
              {/* Pink Chalk */}
              <div className="w-6 h-2 bg-pink-200 rounded-sm transform rotate-12 border border-pink-300/30 shadow-sm" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
