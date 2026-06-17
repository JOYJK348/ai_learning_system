'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';

type Props = {
  config: { path?: string; color?: string; thickness?: number; tolerance?: number; mode?: string; isTamil?: boolean; borderless?: boolean };
  hasAttempt?: boolean;
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

const PASS_THRESHOLD = 70;

const GUIDE_EMOJIS: Record<string, string> = {
  standing: '🐛', sleeping: '🚗', slanting: '🛷', curved: '🦋', zigzag: '🐇',
  's-curve': '🐍', circle: '⭕',
  'left-slanting': '🛷', 'right-slanting': '🛷',
  'left-curve': '🌀', 'right-curve': '🌀', 'up-curve': '🌈', 'down-curve': '🌈',
  'letter-a': '🍎', 'letter-b': '🏀', 'letter-c': '🐱', 'letter-d': '🐕',
  'letter-e': '🐘', 'letter-f': '🐟', 'letter-g': '🍇', 'letter-h': '🎩',
  'letter-i': '🍦', 'letter-j': '🏺', 'letter-k': '🪁', 'letter-l': '🦁',
  'letter-m': '🥭',
};

const GUIDE_HEADINGS_EN: Record<string, string> = {
  standing: '🐛 Trace the Standing Line!',
  sleeping: '🚗 Trace the Sleeping Line!',
  slanting: '🛷 Trace the Slanting Line!',
  curved: '🦋 Trace the Curved Line!',
  zigzag: '🐇 Trace the Zig Zag!',
  's-curve': '🐍 Trace the Wavy Path!',
  circle: '⭕ Trace the Circle!',
  'left-slanting': '🛷 Trace the Left Slanting Line!',
  'right-slanting': '🛷 Trace the Right Slanting Line!',
  'left-curve': '🌀 Trace the Left Curve!',
  'right-curve': '🌀 Trace the Right Curve!',
  'up-curve': '🌈 Trace the Up Curve!',
  'down-curve': '🌈 Trace the Down Curve!',
};

const GUIDE_HEADINGS_TA: Record<string, string> = {
  standing: '📏 நேர்கோட்டை வரையுங்கள்!',
  sleeping: '🛏️ படுக்கைகோட்டை வரையுங்கள்!',
  slanting: '📐 சாய்வுகோட்டை வரையுங்கள்!',
  curved: '🌈 வளைவுகோட்டை வரையுங்கள்!',
  zigzag: '⚡ கோணல்மாணல் கோட்டை வரையுங்கள்!',
  's-curve': '🐍 வளைந்து நெளிந்து வரையுங்கள்!',
  circle: '⭕ வட்டத்தை வரையுங்கள்!',
  'left-slanting': '📐 இடது சாய்வுகோட்டை வரையுங்கள்!',
  'right-slanting': '📐 வலது சாய்வுகோட்டை வரையுங்கள்!',
  'left-curve': '🌀 இடது வளைவை வரையுங்கள்!',
  'right-curve': '🌀 வலது வளைவை வரையுங்கள்!',
  'up-curve': '🌈 மேல் வளைவை வரையுங்கள்!',
  'down-curve': '🌈 கீழ் வளைவை வரையுங்கள்!',
};

const LETTER_HEADINGS_TA: Record<string, string> = {
  'letter-a': '✏️ அ எழுத்தை எழுதுங்கள்!',
  'letter-b': '✏️ ஆ எழுத்தை எழுதுங்கள்!',
  'letter-c': '✏️ இ எழுத்தை எழுதுங்கள்!',
  'letter-d': '✏️ ஈ எழுத்தை எழுதுங்கள்!',
  'letter-e': '✏️ உ எழுத்தை எழுதுங்கள்!',
  'letter-f': '✏️ ஊ எழுத்தை எழுதுங்கள்!',
  'letter-g': '✏️ எ எழுத்தை எழுதுங்கள்!',
  'letter-h': '✏️ ஏ எழுத்தை எழுதுங்கள்!',
  'letter-i': '✏️ ஐ எழுத்தை எழுதுங்கள்!',
  'letter-j': '✏️ ஒ எழுத்தை எழுதுங்கள்!',
  'letter-k': '✏️ ஓ எழுத்தை எழுதுங்கள்!',
  'letter-l': '✏️ ஔ எழுத்தை எழுதுங்கள்!',
  'letter-m': '✏️ அஃது எழுத்தை எழுதுங்கள்!',
};

function addSeg(pts: { x: number; y: number }[], x1: number, y1: number, x2: number, y2: number, n: number) {
  for (let i = 0; i <= n; i++) { const t = i / n; pts.push({ x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) }); }
}

const LETTER_SEGMENTS: Record<string, [number, number, number, number][]> = {
  'letter-a': [[0.2,0.9,0.5,0.1],[0.8,0.9,0.5,0.1],[0.35,0.6,0.65,0.6]],
  'letter-b': [[0.25,0.1,0.25,0.9],[0.25,0.1,0.65,0.1],[0.65,0.1,0.7,0.3],[0.7,0.3,0.65,0.48],[0.65,0.48,0.25,0.5],[0.25,0.5,0.65,0.52],[0.65,0.52,0.7,0.7],[0.7,0.7,0.65,0.9],[0.65,0.9,0.25,0.9]],
  'letter-c': [[0.7,0.15,0.4,0.1],[0.4,0.1,0.25,0.3],[0.25,0.3,0.25,0.7],[0.25,0.7,0.4,0.9],[0.4,0.9,0.7,0.85]],
  'letter-d': [[0.25,0.1,0.25,0.9],[0.25,0.1,0.6,0.1],[0.6,0.1,0.75,0.3],[0.75,0.3,0.75,0.7],[0.75,0.7,0.6,0.9],[0.6,0.9,0.25,0.9]],
  'letter-e': [[0.7,0.1,0.2,0.1],[0.2,0.1,0.2,0.9],[0.2,0.9,0.7,0.9],[0.2,0.5,0.6,0.5]],
  'letter-f': [[0.7,0.1,0.2,0.1],[0.2,0.1,0.2,0.9],[0.2,0.5,0.6,0.5]],
  'letter-g': [[0.7,0.15,0.4,0.1],[0.4,0.1,0.25,0.3],[0.25,0.3,0.25,0.7],[0.25,0.7,0.4,0.9],[0.4,0.9,0.7,0.85],[0.7,0.85,0.7,0.5],[0.7,0.5,0.55,0.5]],
  'letter-h': [[0.2,0.1,0.2,0.9],[0.8,0.1,0.8,0.9],[0.2,0.5,0.8,0.5]],
  'letter-i': [[0.5,0.1,0.5,0.9]],
  'letter-j': [[0.65,0.1,0.65,0.75],[0.65,0.75,0.55,0.88],[0.55,0.88,0.35,0.85]],
  'letter-k': [[0.25,0.1,0.25,0.9],[0.25,0.5,0.75,0.15],[0.25,0.5,0.75,0.85]],
  'letter-l': [[0.2,0.1,0.2,0.9],[0.2,0.9,0.8,0.9]],
  'letter-m': [[0.15,0.9,0.15,0.1],[0.15,0.1,0.5,0.5],[0.5,0.5,0.85,0.1],[0.85,0.1,0.85,0.9]],
  'letter-n': [[0.2,0.1,0.2,0.9],[0.2,0.1,0.8,0.9],[0.8,0.9,0.8,0.1]],
  'letter-o': [[0.25,0.1,0.8,0.1],[0.8,0.1,0.88,0.3],[0.88,0.3,0.88,0.7],[0.88,0.7,0.8,0.9],[0.8,0.9,0.25,0.9],[0.25,0.9,0.17,0.7],[0.17,0.7,0.17,0.3],[0.17,0.3,0.25,0.1]],
  'letter-p': [[0.3,0.1,0.3,0.9],[0.3,0.1,0.7,0.1],[0.7,0.1,0.8,0.25],[0.8,0.25,0.7,0.45],[0.7,0.45,0.3,0.5]],
  'letter-q': [[0.25,0.1,0.8,0.1],[0.8,0.1,0.88,0.3],[0.88,0.3,0.88,0.7],[0.88,0.7,0.8,0.9],[0.8,0.9,0.25,0.9],[0.25,0.9,0.17,0.7],[0.17,0.7,0.17,0.3],[0.17,0.3,0.25,0.1],[0.55,0.6,0.85,0.95]],
  'letter-r': [[0.25,0.1,0.25,0.9],[0.25,0.1,0.7,0.1],[0.7,0.1,0.8,0.25],[0.8,0.25,0.7,0.45],[0.7,0.45,0.25,0.5],[0.45,0.5,0.8,0.9]],
  'letter-s': [[0.78,0.15,0.52,0.1],[0.52,0.1,0.28,0.2],[0.28,0.2,0.32,0.4],[0.32,0.4,0.72,0.5],[0.72,0.5,0.78,0.7],[0.78,0.7,0.62,0.9],[0.62,0.9,0.32,0.85]],
  'letter-t': [[0.15,0.1,0.85,0.1],[0.5,0.1,0.5,0.9]],
  'letter-u': [[0.2,0.1,0.2,0.65],[0.2,0.65,0.35,0.85],[0.35,0.85,0.65,0.85],[0.65,0.85,0.8,0.65],[0.8,0.65,0.8,0.1]],
  'letter-v': [[0.15,0.1,0.5,0.85],[0.5,0.85,0.85,0.1]],
  'letter-w': [[0.1,0.1,0.25,0.85],[0.25,0.85,0.5,0.3],[0.5,0.3,0.75,0.85],[0.75,0.85,0.9,0.1]],
  'letter-x': [[0.15,0.1,0.85,0.9],[0.85,0.1,0.15,0.9]],
  'letter-y': [[0.15,0.1,0.5,0.5],[0.85,0.1,0.5,0.5],[0.5,0.5,0.5,0.9]],
  'letter-z': [[0.1,0.1,0.9,0.1],[0.9,0.1,0.1,0.9],[0.1,0.9,0.9,0.9]],
};

function generateDottedPath(pathType: string, w: number, h: number) {
  const pts: { x: number; y: number }[] = [];
  const count = 60;
  if (pathType === 's-curve') {
    for (let i = 0; i <= count; i++) { const t = i / count; pts.push({ x: 40 + t * (w - 80), y: h / 2 + Math.sin(t * Math.PI * 2) * (h / 4) }); }
  } else if (pathType === 'circle') {
    const cx = w / 2, cy = h / 2, r = Math.min(w, h) / 3;
    for (let i = 0; i <= count; i++) { const a = (i / count) * Math.PI * 2; pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }); }
  } else if (pathType === 'standing') {
    for (let i = 0; i <= count; i++) { const t = i / count; pts.push({ x: w / 2, y: 20 + t * (h - 40) }); }
  } else if (pathType === 'sleeping') {
    for (let i = 0; i <= count; i++) { const t = i / count; pts.push({ x: 20 + t * (w - 40), y: h / 2 }); }
  } else if (pathType === 'slanting' || pathType === 'left-slanting') {
    for (let i = 0; i <= count; i++) { const t = i / count; pts.push({ x: 20 + t * (w - 40), y: 20 + t * (h - 40) }); }
  } else if (pathType === 'right-slanting') {
    for (let i = 0; i <= count; i++) { const t = i / count; pts.push({ x: w - 20 - t * (w - 40), y: 20 + t * (h - 40) }); }
  } else if (pathType === 'curved') {
    for (let i = 0; i <= count; i++) { const t = i / count; pts.push({ x: 20 + t * (w - 40), y: h - 20 - Math.sin(t * Math.PI) * (h * 0.35) }); }
  } else if (pathType === 'up-curve') {
    for (let i = 0; i <= count; i++) { const t = i / count; pts.push({ x: 20 + t * (w - 40), y: 20 + Math.sin(t * Math.PI) * (h * 0.38) }); }
  } else if (pathType === 'down-curve') {
    for (let i = 0; i <= count; i++) { const t = i / count; pts.push({ x: 20 + t * (w - 40), y: h - 20 - Math.sin(t * Math.PI) * (h * 0.38) }); }
  } else if (pathType === 'left-curve') {
    for (let i = 0; i <= count; i++) { const t = i / count; pts.push({ x: w - 20 - Math.sin(t * Math.PI) * (w * 0.35), y: 20 + t * (h - 40) }); }
  } else if (pathType === 'right-curve') {
    for (let i = 0; i <= count; i++) { const t = i / count; pts.push({ x: 20 + Math.sin(t * Math.PI) * (w * 0.35), y: 20 + t * (h - 40) }); }
  } else if (pathType === 'zigzag') {
    const segs = 6;
    for (let i = 0; i <= count; i++) { const t = i / count; const seg = Math.floor(t * segs); const lt = (t * segs) - seg; pts.push({ x: 20 + t * (w - 40), y: seg % 2 === 0 ? 20 + lt * (h - 40) : h - 20 - lt * (h - 40) }); }
  } else if (LETTER_SEGMENTS[pathType]) {
    const segs = LETTER_SEGMENTS[pathType];
    const ptsPerSeg = Math.max(10, Math.floor(50 / segs.length));
    const padX = w * 0.08, padY = h * 0.05;
    for (const [x1, y1, x2, y2] of segs) {
      addSeg(pts, padX + x1 * (w - padX * 2), padY + y1 * (h - padY * 2), padX + x2 * (w - padX * 2), padY + y2 * (h - padY * 2), ptsPerSeg);
    }
  } else {
    for (let i = 0; i <= count; i++) { const t = i / count; pts.push({ x: 40 + t * (w - 80), y: h / 2 }); }
  }
  return pts;
}

export default function TraceActivity({ config, onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [done, setDone] = useState(false);
  const [passed, setPassed] = useState(false);
  const startTime = useRef(Date.now());
  const [dottedPath, setDottedPath] = useState<{ x: number; y: number }[]>([]);
  const [dimensions, setDimensions] = useState({ w: 600, h: 200 });

  const pathType = (config.path as string) || 'sleeping';
  const tolerance = (config.tolerance as number) || 20;
  const isGuide = (config.mode as string) === 'guide';
  const guideEmoji = GUIDE_EMOJIS[pathType] || '⭐';
  const actualPassThreshold = PASS_THRESHOLD;
  const guideDots = isGuide ? dottedPath.filter((_, i) => i % 4 === 0) : [];

  // Determine if context is Tamil
  const params = useParams();
  const isTamil = config.isTamil || params?.locale === 'ta';

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        // Dynamic height based on viewport height to prevent overflow on mobile/landscape
        const isSmallScreen = window.innerHeight < 550;
        const minH = isSmallScreen ? 120 : 180;
        const calculatedH = Math.round(w * 0.38);
        const h = isSmallScreen ? Math.min(calculatedH, window.innerHeight * 0.32) : Math.max(calculatedH, minH);
        setDimensions({ w, h });
        setDottedPath(generateDottedPath(pathType, w, h));
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [pathType]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = dimensions.w;
    canvas.height = dimensions.h;
  }, [dimensions]);

  const getCanvasPos = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  }, []);

  const startDrawing = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (done) return;
    e.preventDefault();
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pos = getCanvasPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setPoints([pos]);
  }, [done, getCanvasPos]);

  const draw = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || done) return;
    e.preventDefault();
    const pos = getCanvasPos(e);
    setPoints(prev => [...prev, pos]);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Chalk brush texture effect
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Shadow to create chalk dust glow effect
    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
    ctx.shadowBlur = 4;

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }, [isDrawing, done, getCanvasPos]);

  const stopDrawing = useCallback(() => setIsDrawing(false), []);

  const handleFinish = () => {
    if (done || points.length < 2) return;
    let correct = 0;
    for (const pt of points) {
      const near = dottedPath.some(d => {
        const dx = d.x - pt.x, dy = d.y - pt.y;
        return Math.sqrt(dx * dx + dy * dy) < tolerance;
      });
      if (near) correct++;
    }
    const accuracy = points.length > 0 ? Math.round((correct / points.length) * 100) : 0;
    const isPass = accuracy >= actualPassThreshold;
    setPassed(isPass);
    setDone(true);
    if (isPass) {
      onComplete({
        score: 100, max_score: 100,
        completion_data: { accuracy, points_traced: points.length, path_type: pathType },
        time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
      });
    }
  };

  const handleReset = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.shadowBlur = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    setPoints([]); setDone(false); setPassed(false); setIsDrawing(false);
    startTime.current = Date.now();
  };

  // Heading lookup
  const getHeading = () => {
    if (isTamil) {
      if (pathType.startsWith('letter-')) {
        return LETTER_HEADINGS_TA[pathType] || '✏️ எழுத்தை எழுதுங்கள்!';
      }
      return GUIDE_HEADINGS_TA[pathType] || '🖐️ கோட்டை வரையுங்கள்!';
    }
    return isGuide ? GUIDE_HEADINGS_EN[pathType] || `${guideEmoji} Trace the ${pathType} line!`
      : ({
        's-curve': '🖐️ Trace the Snake!',
        'circle': '🖐️ Trace the Circle!',
        'standing': '📏 Trace the Standing Line!',
        'sleeping': '🛏️ Trace the Sleeping Line!',
        'slanting': '📐 Trace the Slanting Line!',
        'curved': '🌈 Trace the Curved Line!',
        'zigzag': '⚡ Trace the Zig Zag!',
        'left-slanting': '📐 Trace the Left Slanting!',
        'right-slanting': '📐 Trace the Right Slanting!',
        'left-curve': '🌀 Trace the Left Curve!',
        'right-curve': '🌀 Trace the Right Curve!',
        'up-curve': '🌈 Trace the Up Curve!',
        'down-curve': '🌈 Trace the Down Curve!',
        'letter-a': '✏️ Trace Letter A!',
        'letter-b': '✏️ Trace Letter B!',
        'letter-c': '✏️ Trace Letter C!',
        'letter-d': '✏️ Trace Letter D!',
        'letter-e': '✏️ Trace Letter E!',
        'letter-f': '✏️ Trace Letter F!',
        'letter-g': '✏️ Trace Letter G!',
        'letter-h': '✏️ Trace Letter H!',
        'letter-i': '✏️ Trace Letter I!',
        'letter-j': '✏️ Trace Letter J!',
        'letter-k': '✏️ Trace Letter K!',
        'letter-l': '✏️ Trace Letter L!',
        'letter-m': '✏️ Trace Letter M!',
      }[pathType] || '🖐️ Trace the Pattern!');
  };

  return (
    <div className="flex flex-col items-center gap-4 px-3 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-5 w-full">
      {/* Chalkboard Heading */}
      <h3 className="text-xl sm:text-2xl font-black text-white text-center tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] font-sans">
        {getHeading()}
      </h3>

      <div ref={containerRef} className="w-full relative px-2.5">
        {/* Wooden Chalkboard Frame */}
        <div 
          className={`relative overflow-hidden touch-none ${config.borderless ? '' : 'rounded-3xl border-[12px] border-[#5a3825] shadow-[0_12px_28px_rgba(0,0,0,0.4),_inset_0_4px_20px_rgba(0,0,0,0.6)]'}`}
          style={{ 
            height: dimensions.h, 
            ...(!config.borderless && {
              backgroundColor: '#0f3226',
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 12%, transparent 13%)',
              backgroundSize: '8px 8px',
            })
          }}
        >
          {/* Faint Chalk Dust Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-black/25 pointer-events-none" />

          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-10 cursor-crosshair w-full h-full"
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerLeave={stopDrawing}
          />

          <svg width={dimensions.w} height={dimensions.h} className="absolute inset-0 z-0 pointer-events-none" preserveAspectRatio="none">
            {isGuide ? (
              <>
                {guideDots.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r={7}
                    fill={i === 0 ? '#fbbf24' : 'rgba(255,255,255,0.25)'}
                    stroke={i === 0 ? '#fbbf24' : 'none'} strokeWidth={2}
                  />
                ))}
                <text x={guideDots[0]?.x || 0} y={(guideDots[0]?.y || 0) - 16}
                  fontSize="10" fill="#fbbf24" fontWeight="900" textAnchor="middle" className="font-sans">
                  {isTamil ? 'துவக்கம் ✓' : 'START ✓'}
                </text>
                <text x={guideDots[guideDots.length - 1]?.x || 0} y={(guideDots[guideDots.length - 1]?.y || 0) - 16}
                  fontSize="10" fill="#10B981" fontWeight="900" textAnchor="middle" className="font-sans">
                  {isTamil ? 'முடிவு ✨' : 'END ✨'}
                </text>
                <text x={guideDots[0]?.x || 0} y={(guideDots[0]?.y || 0)}
                  fontSize="14" textAnchor="middle" dominantBaseline="central">{guideEmoji}</text>
              </>
            ) : (
              dottedPath.map((p, i) => (
                <circle 
                  key={i} 
                  cx={p.x} 
                  cy={p.y} 
                  r={3.5} 
                  fill="rgba(255, 255, 255, 0.45)" 
                />
              ))
            )}
          </svg>

          {done && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="rounded-2xl px-6 py-4 shadow-2xl text-center border-2 border-white/20 bg-[#163e32]/95 max-w-[280px]">
                {passed ? (
                  <>
                    <p className="text-3xl mb-1">⭐⭐⭐⭐⭐</p>
                    <p className="font-black text-white text-base sm:text-lg">
                      {isTamil ? 'அருமை! நன்கு வரைந்தாய்! 🎉' : (isGuide ? `${guideEmoji} Great job!` : 'Great tracing! 🎉')}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-3xl mb-1">💪</p>
                    <p className="font-black text-amber-200 text-base">
                      {isTamil ? 'மீண்டும் முயற்சி செய்! 💪' : 'Almost! Try again!'}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Creative Chalk Tray at the bottom */}
        {!config.borderless && (
          <div className="w-[90%] mx-auto h-3 bg-[#4a2e1f] rounded-b-xl shadow-md flex items-center justify-start px-8 gap-3 relative z-10">
            {/* Yellow Chalk */}
            <div className="w-7 h-2 bg-yellow-100/90 rounded-sm transform rotate-6 border border-yellow-200/50 shadow-sm" />
            {/* White Chalk */}
            <div className="w-8 h-2 bg-white/90 rounded-sm transform -rotate-3 border border-white/20 shadow-sm" />
            {/* Pink Chalk */}
            <div className="w-6 h-2 bg-pink-200/90 rounded-sm transform rotate-12 border border-pink-300/30 shadow-sm" />
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-1">
        {!done ? (
          <button 
            onClick={handleFinish} 
            disabled={points.length < 2}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-500 text-white font-black rounded-full shadow-lg transition-all text-sm sm:text-base border-b-4 border-emerald-700 active:scale-95"
          >
            {isTamil ? 'முடிந்தது! ✅' : 'Done! ✅'}
          </button>
        ) : passed ? (
          <button 
            onClick={() => onComplete({ score: 100, max_score: 100, completion_data: {}, time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000) })}
            className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-full shadow-lg transition-all text-sm sm:text-base border-b-4 border-indigo-700 active:scale-95"
          >
            {isTamil ? 'அடுத்து ➡️' : 'Next ➡️'}
          </button>
        ) : (
          <button 
            onClick={handleReset}
            className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-full shadow-lg transition-all text-sm sm:text-base border-b-4 border-amber-700 active:scale-95"
          >
            {isTamil ? 'மீண்டும் 🔄' : 'Try Again 🔄'}
          </button>
        )}
      </div>
    </div>
  );
}
