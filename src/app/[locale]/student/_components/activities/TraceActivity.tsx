'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { KidsTraceCanvas } from './KidsTraceCanvas';


type Props = {
  config: { path?: string; color?: string; thickness?: number; tolerance?: number; mode?: string; isTamil?: boolean; borderless?: boolean };
  hasAttempt?: boolean;
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

const PASS_THRESHOLD = 70; // child-friendly containment threshold
const COVERAGE_THRESHOLD = 45; // child-friendly coverage threshold

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
  standing: 'Trace the Standing Line! ⬆️',
  sleeping: 'Trace the Sleeping Line! ➡️',
  slanting: 'Trace the Slanting Line! 📐',
  curved: 'Trace the Curved Line! 🌀',
  zigzag: 'Trace the Zig Zag! ⚡',
  's-curve': 'Trace the Wavy Path! 〰️',
  circle: 'Trace the Circle! ⭕',
  'left-slanting': 'Trace the Left Slanting Line! 📐',
  'right-slanting': 'Trace the Right Slanting Line! 📐',
  'left-curve': 'Trace the Left Curve! 🌀',
  'right-curve': 'Trace the Right Curve! 🌀',
  'up-curve': 'Trace the Up Curve! 🌈',
  'down-curve': 'Trace the Down Curve! 🌈',
};

const GUIDE_HEADINGS_TA: Record<string, string> = {
  standing: 'நேர்கோட்டை வரையுங்கள்! 📏',
  sleeping: 'படுக்கைகோட்டை வரையுங்கள்! 🛏️',
  slanting: 'சாய்வுகோட்டை வரையுங்கள்! 📐',
  curved: 'வளைவுகோட்டை வரையுங்கள்! 🌈',
  zigzag: 'கோணல்மாணல் கோட்டை வரையுங்கள்! ⚡',
  's-curve': 'வளைந்து நெளிந்து வரையுங்கள்! 🐍',
  circle: 'வட்டத்தை வரையுங்கள்! ⭕',
  'left-slanting': 'இடது சாய்வுகோட்டை வரையுங்கள்! 📐',
  'right-slanting': 'வலது சாய்வுகோட்டை வரையுங்கள்! 📐',
  'left-curve': 'இடது வளைவை வரையுங்கள்! 🌀',
  'right-curve': 'வலது வளைவை வரையுங்கள்! 🌀',
  'up-curve': 'மேல் வளைவை வரையுங்கள்! 🌈',
  'down-curve': 'கீழ் வளைவை வரையுங்கள்! 🌈',
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

export default function TraceActivity({ config, onComplete }: Props) {
  const pathType = (config.path as string) || 'sleeping';
  const isTamil = config.isTamil;

  // If tracing a letter (e.g. letter-a, letter-b), delegate directly to our new giant KidsTraceCanvas!
  if (pathType.startsWith('letter-')) {
    const rawLetter = pathType.replace('letter-', '');
    // Map code back to actual character representation if Tamil
    const TAMIL_MAP: Record<string, string> = {
      a: 'அ', b: 'ஆ', c: 'இ', d: 'ஈ', e: 'உ', f: 'ஊ', g: 'எ', h: 'ஏ', i: 'ஐ', j: 'ஒ', k: 'ஓ', l: 'ஔ', m: 'அஃ'
    };
    const targetLetter = isTamil ? (TAMIL_MAP[rawLetter] || rawLetter) : rawLetter.toUpperCase();

    return (
      <div className="w-full py-2">
        <KidsTraceCanvas
          letter={targetLetter}
          onComplete={() => onComplete({ score: 100, max_score: 100, completion_data: {}, time_taken_seconds: 0 })}
          language={isTamil ? 'tamil' : 'english'}
        />
      </div>
    );
  }

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [done, setDone] = useState(false);
  const [passed, setPassed] = useState(false);
  const startTime = useRef(Date.now());
  const [dottedPath, setDottedPath] = useState<{ x: number; y: number }[]>([]);
  const [dimensions, setDimensions] = useState({ w: 600, h: 200 });

  const drawColor = config.color || '#f97316';
  const isGuide = (config.mode as string) === 'guide';
  const guideEmoji = GUIDE_EMOJIS[pathType] || '⭐';
  const guideDots = isGuide ? dottedPath.filter((_, i) => i % 4 === 0) : [];

  const params = useParams();


  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
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

    ctx.strokeStyle = drawColor;
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }, [isDrawing, done, getCanvasPos, drawColor]);

  const stopDrawing = useCallback(() => setIsDrawing(false), []);

  const handleFinish = () => {
    if (done || points.length < 2) return;

    const letterW = dimensions.w;
    const letterH = dimensions.h;

    // Use lenient grid containment calculation like Hindi/English
    const GRID_SIZE = 7;
    const cellW = letterW / GRID_SIZE;
    const cellH = letterH / GRID_SIZE;

    // Active path cell set
    const activeCells = new Set<string>();
    for (const p of dottedPath) {
      const c = Math.max(0, Math.min(GRID_SIZE - 1, Math.floor(p.x / cellW)));
      const r = Math.max(0, Math.min(GRID_SIZE - 1, Math.floor(p.y / cellH)));
      activeCells.add(`${c},${r}`);
    }

    const tol = Math.max(20, Math.round(dimensions.w * 0.05));
    const tolSq = tol * tol;

    // Interpolate points
    const densePoints: { x: number; y: number }[] = [];
    densePoints.push(points[0]);
    for (let i = 1; i < points.length; i++) {
      const p1 = points[i - 1];
      const p2 = points[i];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 8) {
        const steps = Math.ceil(dist / 8);
        for (let s = 1; s <= steps; s++) {
          densePoints.push({
            x: p1.x + (dx * s) / steps,
            y: p1.y + (dy * s) / steps,
          });
        }
      } else {
        densePoints.push(p2);
      }
    }

    let pointsOnLetter = 0;
    const visitedActiveCells = new Set<string>();

    for (const p of densePoints) {
      let isClose = false;
      for (const lp of dottedPath) {
        const dx = lp.x - p.x;
        const dy = lp.y - p.y;
        if (dx * dx + dy * dy < tolSq) {
          isClose = true;
          break;
        }
      }

      if (isClose) {
        pointsOnLetter++;
        const c = Math.max(0, Math.min(GRID_SIZE - 1, Math.floor(p.x / cellW)));
        const r = Math.max(0, Math.min(GRID_SIZE - 1, Math.floor(p.y / cellH)));
        const cellKey = `${c},${r}`;
        if (activeCells.has(cellKey)) {
          visitedActiveCells.add(cellKey);
        }
      }
    }

    const containment = densePoints.length > 0 ? (pointsOnLetter / densePoints.length) * 100 : 0;
    const coverage = activeCells.size > 0 ? (visitedActiveCells.size / activeCells.size) * 100 : 0;

    const isPass = containment >= PASS_THRESHOLD && coverage >= COVERAGE_THRESHOLD;

    setPassed(isPass);
    setDone(true);
    if (isPass) {
      onComplete({
        score: 100, max_score: 100,
        completion_data: { accuracy: Math.round(containment), points_traced: points.length, path_type: pathType },
        time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
      });
    }
  };

  const handleReset = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setPoints([]); setDone(false); setPassed(false); setIsDrawing(false);
    startTime.current = Date.now();
  };

  const getHeading = () => {
    if (isTamil) {
      if (pathType.startsWith('letter-')) {
        return LETTER_HEADINGS_TA[pathType] || '✏️ எழுத்தை எழுதுங்கள்!';
      }
      return GUIDE_HEADINGS_TA[pathType] || '🖐️ கோட்டை வரையுங்கள்!';
    }
    return isGuide ? GUIDE_HEADINGS_EN[pathType] || `${guideEmoji} Trace the ${pathType} line!`
      : (GUIDE_HEADINGS_EN[pathType] || '🖐️ Trace the Pattern!');
  };

  return (
    <div className="flex flex-col items-center gap-3 px-3 sm:px-5 pb-4 select-none w-full">
      {/* Heading badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/50 border border-amber-200/50 mb-1">
        <span className="text-[10px] font-black text-amber-800 tracking-wider uppercase font-sans">
          {isTamil ? 'அடித்தளப் பயிற்சி' : 'Pre-Writing Trace'}
        </span>
      </div>

      <h3 className="text-sm sm:text-base font-black text-amber-950 text-center font-sans">
        {getHeading()}
      </h3>

      <div ref={containerRef} className="w-full relative">
        {/* Wood-bordered cream trace board */}
        <div 
          className="relative overflow-hidden rounded-[2rem] border-4 border-[#b45309] shadow-sm bg-[#fffdf9] touch-none"
          style={{ height: dimensions.h }}
        >
          <BoardLines />

          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-10 cursor-crosshair w-full h-full touch-none"
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
                    fill={i === 0 ? '#b45309' : 'rgba(180,83,9,0.12)'}
                    stroke={i === 0 ? '#b45309' : 'none'} strokeWidth={2}
                  />
                ))}
                <text x={guideDots[0]?.x || 0} y={(guideDots[0]?.y || 0) - 16}
                  fontSize="10" fill="#b45309" fontWeight="900" textAnchor="middle" className="font-sans">
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
                  r={4} 
                  fill="rgba(180, 83, 9, 0.22)" 
                />
              ))
            )}
          </svg>

          {done && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-amber-50/40 backdrop-blur-[2px]">
              <div className="rounded-2xl px-6 py-4 shadow-md text-center border-2 border-emerald-200 bg-[#fffdf9]/95 max-w-[280px]">
                {passed ? (
                  <>
                    <p className="text-4xl animate-bounce mb-1">⭐</p>
                    <p className="font-black text-emerald-600 text-sm font-sans">
                      {isTamil ? 'அருமை! நன்கு வரைந்தாய்! 🎉' : 'Awesome Job! 🎉'}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-4xl mb-1">💪</p>
                    <p className="font-black text-rose-600 text-sm font-sans">
                      {isTamil ? 'மீண்டும் முயற்சி செய்! 💪' : 'Almost! Try again!'}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 w-full justify-center mt-2">
        {!done ? (
          <button 
            onClick={handleFinish} 
            disabled={points.length < 2}
            className="flex-1 py-3.5 rounded-2xl font-black text-white text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-teal-500 shadow-md border-b-4 border-emerald-700 active:scale-95 transition-all disabled:opacity-50 font-sans"
          >
            {isTamil ? 'முடிந்தது! ✅' : 'Check ✅'}
          </button>
        ) : passed ? (
          <button 
            onClick={() => onComplete({ score: 100, max_score: 100, completion_data: {}, time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000) })}
            className="flex-1 py-3.5 rounded-2xl font-black text-white text-xs sm:text-sm bg-gradient-to-r from-indigo-500 to-blue-500 shadow-md border-b-4 border-indigo-700 active:scale-95 transition-all font-sans"
          >
            {isTamil ? 'அடுத்து ➡️' : 'Next ➡️'}
          </button>
        ) : (
          <button 
            onClick={handleReset}
            className="flex-1 py-3.5 rounded-2xl font-black text-white text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-orange-500 shadow-md border-b-4 border-orange-700 active:scale-95 transition-all font-sans"
          >
            {isTamil ? 'மீண்டும் 🔄' : 'Try Again 🔄'}
          </button>
        )}
      </div>
    </div>
  );
}
