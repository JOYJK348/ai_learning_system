'use client';

/**
 * TamilVowelQuiz – உயிர் எழுத்துக்கள் (அ-ஊ  and  எ-ஔ)
 * Blackboard-themed, show→quiz flow.
 * Optimised for low-end devices:
 *  - No canvas / requestAnimationFrame loops
 *  - CSS animations only (GPU composited transform/opacity)
 *  - Tiny bundle: no heavy deps beyond framer-motion (already in project)
 *  - Single re-render per phase, not per frame
 *  - config.set = 'a-u' (default) | 'e-au' picks which vowel set to teach
 */

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Data ─── */

interface VowelEntry {
  letter: string;       // Tamil vowel
  name: string;         // Tamil pronunciation name
  word: string;         // Tamil example word
  emoji: string;        // visual for word
  color: string;        // accent color (hsl)
  stroke: string;       // simple stroke hint shown on blackboard
}

/* Set A: அ – ஊ */
const VOWELS_A_U: VowelEntry[] = [
  { letter: 'அ', name: 'அ', word: 'அம்மா', emoji: '👩', color: '#f97316', stroke: 'M38,80 C38,40 62,40 62,80 M50,80 L50,90' },
  { letter: 'ஆ', name: 'ஆ', word: 'ஆடு', emoji: '🐐', color: '#eab308', stroke: 'M35,80 C35,40 65,40 65,80 M35,55 L65,55' },
  { letter: 'இ', name: 'இ', word: 'இலை', emoji: '🍃', color: '#22c55e', stroke: 'M50,25 L50,85 M38,55 L62,55' },
  { letter: 'ஈ', name: 'ஈ', word: 'ஈ', emoji: '🪰', color: '#10b981', stroke: 'M50,25 L50,85 M38,45 L62,45 M38,65 L62,65' },
  { letter: 'உ', name: 'உ', word: 'உலகம்', emoji: '🌍', color: '#06b6d4', stroke: 'M35,35 C35,70 50,80 50,80 C50,80 65,70 65,35' },
  { letter: 'ஊ', name: 'ஊ', word: 'ஊர்', emoji: '🏘️', color: '#6366f1', stroke: 'M35,30 C35,65 50,78 50,78 C50,78 65,65 65,30 M35,78 L65,78' },
];

/* Set B: எ – ஔ */
const VOWELS_E_AU: VowelEntry[] = [
  { letter: 'எ', name: 'எ', word: 'எலி', emoji: '🐭', color: '#e879f9', stroke: 'M65,20 L35,20 L35,80 L65,80 M35,50 L60,50' },
  { letter: 'ஏ', name: 'ஏ', word: 'ஏணி', emoji: '🪜', color: '#c084fc', stroke: 'M65,20 L35,20 L35,80 L65,80 M35,50 L60,50 M50,80 L50,95' },
  { letter: 'ஐ', name: 'ஐ', word: 'ஐந்து', emoji: '5️⃣', color: '#f472b6', stroke: 'M50,20 L50,80 M35,50 L65,50 M35,20 L65,20' },
  { letter: 'ஒ', name: 'ஒ', word: 'ஒட்டகம்', emoji: '🐪', color: '#fb923c', stroke: 'M35,50 C35,25 65,25 65,50 C65,75 35,75 35,50' },
  { letter: 'ஓ', name: 'ஓ', word: 'ஓணான்', emoji: '🦎', color: '#34d399', stroke: 'M35,50 C35,25 65,25 65,50 C65,75 35,75 35,50 M65,50 L80,50' },
  { letter: 'ஔ', name: 'ஔ', word: 'ஔடதம்', emoji: '💊', color: '#60a5fa', stroke: 'M35,50 C35,25 65,25 65,50 C65,75 35,75 35,50 M65,35 L80,35 M65,65 L80,65' },
  { letter: 'ஃ', name: 'ஃ', word: 'எஃகு', emoji: '🛡️', color: '#ec4899', stroke: 'M50,35 L50,36 M35,65 L35,66 M65,65 L65,66' },
];

// Full distractor pool across both sets
const ALL_VOWELS = [...VOWELS_A_U, ...VOWELS_E_AU];
const DISTRACTOR_POOL = ALL_VOWELS.map(v => ({ word: v.word, emoji: v.emoji, letter: v.letter }));

/** Dotted line guide on cream board */
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

/** Big Tamil letter drawn on cream board */
function BoardLetter({ vowel }: { vowel: VowelEntry }) {
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: '100%', aspectRatio: '1 / 1', maxWidth: 200 }}
    >
      <div
        className="absolute inset-0 rounded-full opacity-10 blur-xl"
        style={{ background: vowel.color }}
      />
      {/* Letter */}
      <span
        className="relative z-10 font-black leading-none"
        style={{
          fontSize: 'clamp(5rem, 18vw, 8.5rem)',
          color: vowel.color,
          textShadow: '0 2px 8px rgba(180, 83, 9, 0.15)',
          fontFamily: '"Noto Sans Tamil", "Latha", sans-serif',
        }}
      >
        {vowel.letter}
      </span>
      {/* Stroke trace hint */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full opacity-[0.18] pointer-events-none"
        aria-hidden
      >
        <path d={vowel.stroke} fill="none" stroke="#b45309" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/** Star burst confetti (CSS-only, no JS animation loop) */
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
            transform: `rotate(${s.angle}deg) translateX(0px)`,
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

function FamilyMedia({ emoji, className = "w-10 h-10 object-contain" }: { emoji: string; className?: string }) {
  const images: Record<string, string> = {
    '👩': '/assets/quiz/family-mother.png',
    '👨': '/assets/quiz/family-father.png',
    '👧': '/assets/quiz/family-sister.png',
    '👦': '/assets/quiz/family-brother.png',
    '👵': '/assets/quiz/family-grandma.png',
    '👴': '/assets/quiz/family-grandpa.png',
  };
  const src = images[emoji];
  if (src) {
    return <img src={src} className={className} alt={emoji} />;
  }
  return <span className={className.includes('w-') ? 'text-3xl select-none' : ''}>{emoji}</span>;
}

/* ─── Phase: Showcase ─── */

interface ShowcaseProps {
  vowel: VowelEntry;
  index: number;
  total: number;
  onNext: () => void;
}

function Showcase({ vowel, index, total, onNext }: ShowcaseProps) {
  return (
    <motion.div
      key={`show-${vowel.letter}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="flex flex-col items-center gap-4 w-full"
    >
      {/* Header badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/50 border border-amber-200/50">
        <span className="text-xs font-black text-amber-800 tracking-widest uppercase">உயிர் எழுத்து</span>
        <span className="text-xs font-bold text-amber-700/60">{index + 1} / {total}</span>
      </div>

      {/* Board panel */}
      <div
        className="relative w-full rounded-[2rem] border-4 border-[#b45309] shadow-sm bg-[#fffdf9] overflow-hidden"
      >
        <BoardLines />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-3 px-4 pt-6 pb-5">
          <BoardLetter vowel={vowel} />

          {/* Pronunciation name */}
          <div className="flex items-center gap-3">
            <span
              className="text-2xl sm:text-3xl font-black text-amber-950"
              style={{ fontFamily: '"Noto Sans Tamil", sans-serif' }}
            >
              {vowel.name}
            </span>
          </div>

          {/* Example word + emoji */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{ background: `${vowel.color}15`, border: `1px solid ${vowel.color}33` }}
          >
            <FamilyMedia emoji={vowel.emoji} className="w-8 h-8 object-contain" />
            <span
              className="text-base sm:text-lg font-black text-amber-950"
              style={{ fontFamily: '"Noto Sans Tamil", sans-serif' }}
            >
              {vowel.word}
            </span>
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.96 }}
        onClick={onNext}
        className="w-full max-w-xs py-3.5 rounded-2xl font-black text-white text-sm sm:text-base tracking-wide shadow-md transition-all active:scale-95 bg-gradient-to-r from-emerald-500 to-teal-500 border-b-4 border-emerald-700"
      >
        எழுதிப் பழகுங்கள்! ✏️
      </motion.button>
    </motion.div>
  );
}

/* ─── Phase: Quiz (Now TraceBoard) ─── */

interface TraceBoardProps {
  vowel: VowelEntry;
  onCorrect: () => void;
}

function TraceBoard({ vowel, onCorrect }: TraceBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const guideCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const pointsRef = useRef<{ x: number; y: number }[]>([]);
  const templateGridRef = useRef<Uint8Array | null>(null);
  const templateGridWideRef = useRef<Uint8Array | null>(null);
  const clustersRef = useRef<{ x: number; y: number }[][]>([]);

  const letterDataRef = useRef<{
    pixels: { x: number; y: number }[];
    minX: number; maxX: number;
    minY: number; maxY: number;
  } | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [pointCount, setPointCount] = useState(0);
  const [done, setDone] = useState(false);
  const [failMsg, setFailMsg] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ w: 400, h: 400 });
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const buildLetterData = useCallback((w: number, h: number) => {
    const off = document.createElement('canvas');
    off.width = w;
    off.height = h;
    const ctx = off.getContext('2d');
    if (!ctx) return;

    const fontSize = Math.min(260, Math.max(160, Math.round(w * 0.5)));
    ctx.font = `900 ${fontSize}px "Noto Sans Tamil", "Latha", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ff0000';
    ctx.fillText(vowel.letter, w / 2, h / 2);

    const img = ctx.getImageData(0, 0, w, h);
    const pixels: { x: number; y: number }[] = [];
    let minX = w, maxX = 0, minY = h, maxY = 0;

    const step = 2;
    for (let py = 0; py < h; py += step) {
      for (let px = 0; px < w; px += step) {
        if (img.data[(py * w + px) * 4] > 100) {
          pixels.push({ x: px, y: py });
          if (px < minX) minX = px;
          if (px > maxX) maxX = px;
          if (py < minY) minY = py;
          if (py > maxY) maxY = py;
        }
      }
    }

    if (pixels.length > 0) {
      letterDataRef.current = { pixels, minX, maxX, minY, maxY };

      // Pre-compute template distance grid
      const grid = new Uint8Array(w * h);
      const wideGrid = new Uint8Array(w * h);
      const tol = Math.max(15, Math.round(w * 0.05)); // narrow corridor (e.g. 15px)
      const wideTol = Math.max(28, Math.round(w * 0.095)); // wide corridor (e.g. 28px)

      for (const lp of pixels) {
        // Narrow grid
        const startX = Math.max(0, lp.x - tol);
        const endX = Math.min(w - 1, lp.x + tol);
        const startY = Math.max(0, lp.y - tol);
        const endY = Math.min(h - 1, lp.y + tol);

        for (let y = startY; y <= endY; y++) {
          for (let x = startX; x <= endX; x++) {
            const dx = x - lp.x;
            const dy = y - lp.y;
            if (dx * dx + dy * dy < tol * tol) {
              grid[y * w + x] = 1;
            }
          }
        }

        // Wide grid
        const wStartX = Math.max(0, lp.x - wideTol);
        const wEndX = Math.min(w - 1, lp.x + wideTol);
        const wStartY = Math.max(0, lp.y - wideTol);
        const wEndY = Math.min(h - 1, lp.y + wideTol);

        for (let y = wStartY; y <= wEndY; y++) {
          for (let x = wStartX; x <= wEndX; x++) {
            const dx = x - lp.x;
            const dy = y - lp.y;
            if (dx * dx + dy * dy < wideTol * wideTol) {
              wideGrid[y * w + x] = 1;
            }
          }
        }
      }
      templateGridRef.current = grid;
      templateGridWideRef.current = wideGrid;

      // Connected components clustering for dots/strokes
      const clusters: { x: number; y: number }[][] = [];
      const visited = new Uint8Array(pixels.length);
      const distThreshold = Math.max(8, Math.round(w * 0.025));
      const distThresSq = distThreshold * distThreshold;

      for (let i = 0; i < pixels.length; i++) {
        if (visited[i]) continue;
        const cluster: { x: number; y: number }[] = [];
        const queue: number[] = [i];
        visited[i] = 1;
        let qHead = 0;
        while (qHead < queue.length) {
          const idx = queue[qHead++];
          const p1 = pixels[idx];
          cluster.push(p1);
          for (let j = 0; j < pixels.length; j++) {
            if (!visited[j]) {
              const p2 = pixels[j];
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              if (dx * dx + dy * dy < distThresSq) {
                visited[j] = 1;
                queue.push(j);
              }
            }
          }
        }
        if (cluster.length > 5) {
          clusters.push(cluster);
        }
      }
      clustersRef.current = clusters;
    }
  }, [vowel.letter]);

  const drawGuide = useCallback((w: number, h: number) => {
    const gc = guideCanvasRef.current;
    if (!gc) return;
    gc.width = w;
    gc.height = h;
    const ctx = gc.getContext('2d');
    if (!ctx) return;
    const fontSize = Math.min(260, Math.max(160, Math.round(w * 0.5)));
    ctx.clearRect(0, 0, w, h);
    ctx.font = `900 ${fontSize}px "Noto Sans Tamil", "Latha", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(180, 83, 9, 0.15)';
    ctx.fillText(vowel.letter, w / 2, h / 2);
  }, [vowel.letter]);

  useEffect(() => {
    let cancelled = false;

    const setup = async () => {
      const container = containerRef.current;
      if (!container) return;

      const w = container.clientWidth || 360;
      const h = Math.max(400, Math.round(w * 0.85));

      if (!cancelled) setDimensions({ w, h });

      const dc = canvasRef.current;
      if (dc) { dc.width = w; dc.height = h; }

      letterDataRef.current = null;
      templateGridRef.current = null;
      templateGridWideRef.current = null;
      clustersRef.current = [];

      try {
        await document.fonts.load(`900 ${Math.round(w * 0.5)}px "Noto Sans Tamil"`);
      } catch (_) {}

      if (cancelled) return;

      drawGuide(w, h);
      buildLetterData(w, h);
    };

    const timer = setTimeout(setup, 80);
    const onResize = () => { clearTimeout(timer); setTimeout(setup, 80); };
    window.addEventListener('resize', onResize);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, [vowel.letter, drawGuide, buildLetterData]);

  const getCanvasPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (done) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    setHasDrawn(true);
    setFailMsg(null);
    const pos = getCanvasPos(e);
    pointsRef.current.push(pos);
    setPointCount(pointsRef.current.length);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) { ctx.beginPath(); ctx.moveTo(pos.x, pos.y); }
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || done) return;
    const pos = getCanvasPos(e);
    pointsRef.current.push(pos);
    setPointCount(c => c + 1);

    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = vowel.color;
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }
  };

  const stopDrawing = () => setIsDrawing(false);

  const handleReset = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    pointsRef.current = [];
    setPointCount(0);
    setHasDrawn(false);
    setDone(false);
    setFailMsg(null);
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
  };

  const handleFinish = () => {
    const pts = pointsRef.current;
    const canvas = canvasRef.current;
    if (pts.length < 20 || !canvas) return;

    const data = letterDataRef.current;
    const grid = templateGridRef.current;
    const wideGrid = templateGridWideRef.current;
    if (!data || !grid || !wideGrid || data.pixels.length === 0) {
      setFailMsg('மீண்டும் முயற்சி செய்க.');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const userImg = ctx.getImageData(0, 0, w, h);

    const letterW = data.maxX - data.minX;
    const letterH = data.maxY - data.minY;
    if (letterW <= 0 || letterH <= 0) {
      setFailMsg('மீண்டும் முயற்சி செய்க.');
      return;
    }

    const GRID_SIZE = 7;
    const cellW = letterW / GRID_SIZE;
    const cellH = letterH / GRID_SIZE;

    const cellPixelCounts = new Map<string, number>();
    for (const p of data.pixels) {
      const col = Math.floor((p.x - data.minX) / cellW);
      const row = Math.floor((p.y - data.minY) / cellH);
      const c = Math.max(0, Math.min(GRID_SIZE - 1, col));
      const r = Math.max(0, Math.min(GRID_SIZE - 1, row));
      const cellKey = `${c},${r}`;
      cellPixelCounts.set(cellKey, (cellPixelCounts.get(cellKey) || 0) + 1);
    }

    const activeCells = new Set<string>();
    for (const [cellKey, count] of cellPixelCounts.entries()) {
      if (count >= 6) {
        activeCells.add(cellKey);
      }
    }

    let totalDrawn = 0;
    let correctDrawn = 0;
    let farDrawn = 0;
    const visitedActiveCells = new Set<string>();
    let userMinX = w, userMaxX = 0, userMinY = h, userMaxY = 0;

    for (let y = 0; y < h; y += 2) {
      for (let x = 0; x < w; x += 2) {
        const idx = (y * w + x) * 4;
        const alpha = userImg.data[idx + 3];
        if (alpha > 40) {
          totalDrawn++;
          if (x < userMinX) userMinX = x;
          if (x > userMaxX) userMaxX = x;
          if (y < userMinY) userMinY = y;
          if (y > userMaxY) userMaxY = y;

          if (grid[y * w + x] === 1) {
            correctDrawn++;
            const col = Math.floor((x - data.minX) / cellW);
            const row = Math.floor((y - data.minY) / cellH);
            const c = Math.max(0, Math.min(GRID_SIZE - 1, col));
            const r = Math.max(0, Math.min(GRID_SIZE - 1, row));
            const cellKey = `${c},${r}`;
            if (activeCells.has(cellKey)) {
              visitedActiveCells.add(cellKey);
            }
          } else if (wideGrid[y * w + x] === 0) {
            farDrawn++;
          }
        }
      }
    }

    if (totalDrawn < 25) {
      setFailMsg('எழுதிப் பழகுங்கள்! ✏️');
      return;
    }

    const containment = (correctDrawn / totalDrawn) * 100;
    const coverage = activeCells.size > 0 ? (visitedActiveCells.size / activeCells.size) * 100 : 0;

    const userW = userMaxX - userMinX;
    const userH = userMaxY - userMinY;
    const templateW = data.maxX - data.minX;
    const templateH = data.maxY - data.minY;

    const widthRatio = templateW > 0 ? userW / templateW : 0;
    const heightRatio = templateH > 0 ? userH / templateH : 0;

    // Verify all template clusters (dots/strokes) are covered at least 20%
    let allClustersCovered = true;
    for (const cluster of (clustersRef.current || [])) {
      let coveredCount = 0;
      for (const lp of cluster) {
        const idx = (lp.y * w + lp.x) * 4;
        if (userImg.data[idx + 3] > 40) {
          coveredCount++;
        }
      }
      const clusterCoverage = (coveredCount / cluster.length) * 100;
      if (clusterCoverage < 25) {
        allClustersCovered = false;
        break;
      }
    }

    const minDim = Math.max(45, w * 0.12);
    const widthRatioPassed = templateW < minDim || widthRatio >= 0.75;
    const heightRatioPassed = templateH < minDim || heightRatio >= 0.75;
    const maxFarDrawn = Math.max(15, Math.round(w * 0.05));

    // Strict validation thresholds: containment >= 75%, coverage >= 50%, bounding box size (if large enough), no far-away drawings, and all clusters (dots) covered
    const passed = containment >= 75 && coverage >= 50 && widthRatioPassed && heightRatioPassed && farDrawn <= maxFarDrawn && allClustersCovered;

    if (passed) {
      setDone(true);
      successTimerRef.current = setTimeout(onCorrect, 500);
    } else if (containment < 75 || farDrawn > maxFarDrawn) {
      setFailMsg('எழுத்தின் மேல் மட்டும் எழுதவும்! 🎯');
    } else {
      setFailMsg('முழு எழுத்தையும் சரியாக எழுதவும்! ✍️');
    }
  };

  return (
    <motion.div
      key={`trace-${vowel.letter}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col items-center gap-4 w-full"
    >
      {/* Instruction */}
      <div className="w-full text-center">
        <p className="text-amber-950 text-sm font-bold font-sans">
          &quot;{vowel.letter}&quot; எழுத்தை பலகையில் எழுதி பழகுங்கள்!
        </p>
      </div>

      {/* Board */}
      <div
        ref={containerRef}
        className="relative w-full rounded-[2rem] border-4 border-[#b45309] shadow-sm bg-[#fffdf9] overflow-hidden touch-none"
        style={{
          height: dimensions.h,
          touchAction: 'none',
        }}
      >
        <BoardLines />

        {/* Guide letter canvas */}
        <canvas ref={guideCanvasRef} className="absolute inset-0 z-0 pointer-events-none touch-none w-full h-full" />

        {/* Drawing canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 cursor-crosshair touch-none w-full h-full"
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
        />

        {/* Success overlay */}
        {done && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-amber-50/40 backdrop-blur-[2px]">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center border-2 border-emerald-200 bg-[#fffdf9]/95 rounded-2xl px-6 py-4 shadow-md">
              <div className="text-6xl animate-bounce">⭐</div>
              <p className="text-base font-black text-emerald-600 mt-1 font-sans">அருமை!</p>
            </motion.div>
          </div>
        )}

        {/* Fail overlay */}
        <AnimatePresence>
          {failMsg && !done && (
            <motion.div
              key="fail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            >
              <div className="bg-[#fffdf9]/95 text-rose-600 border-2 border-rose-200 rounded-xl px-5 py-3 text-sm font-black shadow-xl text-center max-w-[280px]">
                <p className="mb-0.5">❌ {failMsg}</p>
                <p className="text-[11px] text-amber-800">மீண்டும் 🔄 button press பண்ணி try பண்ணுங்கள்</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 w-full max-w-xs justify-center mt-1">
        <button
          onClick={handleReset}
          disabled={!hasDrawn || done}
          className="flex-1 py-3.5 rounded-2xl font-black text-white text-xs sm:text-sm tracking-wide bg-gradient-to-r from-amber-500 to-orange-500 shadow-md border-b-4 border-orange-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 font-sans"
        >
          மீண்டும் 🔄
        </button>
        <button
          onClick={handleFinish}
          disabled={pointCount < 20 || done}
          className="flex-1 py-3.5 rounded-2xl font-black text-white text-xs sm:text-sm tracking-wide bg-gradient-to-r from-emerald-500 to-teal-500 shadow-md border-b-4 border-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 font-sans"
        >
          முடிந்தது! ✅
        </button>
      </div>
    </motion.div>
  );
}


/* ─── Phase: Letter Done ─── */

function LetterDone({ vowel, onNext, isLast }: { vowel: VowelEntry; onNext: () => void; isLast: boolean }) {
  return (
    <motion.div
      key={`done-${vowel.letter}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="flex flex-col items-center gap-4 w-full relative"
    >
      <StarBurst />
      <div className="flex flex-col items-center gap-3 px-6 py-6 rounded-[2rem] border-4 border-amber-200/80 bg-[#fffdf9] w-full shadow-sm">
        <FamilyMedia emoji={vowel.emoji} className="w-16 h-16 object-contain" />
        <p
          className="text-xl sm:text-2xl font-black text-amber-950 text-center"
          style={{ fontFamily: '"Noto Sans Tamil", sans-serif' }}
        >
          {vowel.word}
        </p>
        <p className="text-xs text-amber-800 font-bold tracking-wider text-center">
          "{vowel.letter}" எழுத்தை கற்றீர்கள்! ⭐
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="text-5xl sm:text-6xl font-black"
            style={{ color: vowel.color, textShadow: `0 0 24px ${vowel.color}30`, fontFamily: '"Noto Sans Tamil", sans-serif' }}
          >
            {vowel.letter}
          </span>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={onNext}
        className="w-full max-w-xs py-3.5 rounded-2xl font-black text-white text-sm sm:text-base tracking-wide shadow-md active:scale-95 bg-gradient-to-r from-emerald-500 to-teal-500 border-b-4 border-emerald-700"
      >
        {isLast ? 'முடிந்தது! 🎉' : 'அடுத்த எழுத்து →'}
      </motion.button>
    </motion.div>
  );
}

/* ─── Phase: All Done ─── */

function AllDone({ vowels, onComplete }: { vowels: VowelEntry[]; onComplete: () => void }) {
  const isSetB = vowels[0]?.letter === 'எ';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-5 w-full"
    >
      {/* Trophy */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-6xl sm:text-7xl"
      >
        🏆
      </motion.div>

      <div className="flex flex-col items-center gap-2 px-6 py-5 rounded-[2rem] border-4 border-amber-200/80 bg-[#fffdf9] w-full text-center shadow-sm">
        <p className="text-lg sm:text-xl font-black text-amber-950" style={{ fontFamily: '"Noto Sans Tamil", sans-serif' }}>
          அட்டகாசம்! 🎊
        </p>
        <p className="text-xs text-amber-800 font-bold tracking-wide" style={{ fontFamily: '"Noto Sans Tamil", sans-serif' }}>
          {isSetB ? 'எ, ஏ, ஐ, ஒ, ஓ, ஔ, ஃ — அனைத்தையும் கற்றீர்கள்!' : 'அ, ஆ, இ, ஈ, உ, ஊ — அனைத்தையும் கற்றீர்கள்!'}
        </p>

        {/* All vowels row */}
        <div className="flex items-center gap-2 sm:gap-3 mt-3 flex-wrap justify-center">
          {vowels.map((v, i) => (
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
        className="w-full max-w-xs py-3.5 rounded-2xl font-black text-white text-base tracking-wide shadow-md active:scale-95 bg-gradient-to-r from-emerald-500 to-teal-500 border-b-4 border-emerald-700"
      >
        அடுத்த பாடம் ➡️
      </motion.button>
    </motion.div>
  );
}

/* ─── Main Component ─── */

type Phase = 'showcase' | 'quiz' | 'letter-done' | 'all-done';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config?: Record<string, any>;
  onComplete: (data: {
    score: number;
    max_score: number;
    completion_data: Record<string, unknown>;
    time_taken_seconds: number;
  }) => void;
};

export default function TamilVowelQuiz({ config, onComplete }: Props) {
  // Pick which set to teach based on config.set
  const VOWELS = config?.set === 'e-au' ? VOWELS_E_AU : VOWELS_A_U;

  const startTime = useRef(Date.now());
  const [vowelIndex, setVowelIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('showcase');
  const [scores, setScores] = useState<Record<string, boolean>>({});

  const vowel = VOWELS[vowelIndex];
  const isLast = vowelIndex === VOWELS.length - 1;

  const goToQuiz = useCallback(() => setPhase('quiz'), []);

  const onCorrect = useCallback(() => {
    setScores(prev => ({ ...prev, [vowel.letter]: true }));
    setPhase('letter-done');
  }, [vowel.letter]);

  const goNext = useCallback(() => {
    if (isLast) {
      setPhase('all-done');
    } else {
      setVowelIndex(i => i + 1);
      setPhase('showcase');
    }
  }, [isLast]);

  const handleComplete = useCallback(() => {
    const correct = Object.values(scores).filter(Boolean).length;
    onComplete({
      score: correct,
      max_score: VOWELS.length,
      completion_data: { scores, vowels_learned: Object.keys(scores), set: config?.set || 'a-u' },
      time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
    });
  }, [onComplete, scores, config?.set, VOWELS.length]);

  return (
    <div className="flex flex-col items-center gap-3 px-3 sm:px-5 pb-4 sm:pb-6 select-none w-full">
      {/* Progress dots */}
      <div className="flex items-center gap-1.5">
        {VOWELS.map((v, i) => (
          <div
            key={v.letter}
            className="transition-all duration-300"
            style={{
              width: i === vowelIndex ? 20 : 8,
              height: 8,
              borderRadius: 99,
              background: scores[v.letter]
                ? '#10b981'
                : i === vowelIndex
                  ? v.color
                  : 'rgba(180, 83, 9, 0.18)',
            }}
          />
        ))}
      </div>

      {/* Phase renderer */}
      <AnimatePresence mode="wait">
        {phase === 'showcase' && (
          <Showcase
            key={`showcase-${vowelIndex}`}
            vowel={vowel}
            index={vowelIndex}
            total={VOWELS.length}
            onNext={goToQuiz}
          />
        )}
        {phase === 'quiz' && (
          <TraceBoard
            key={`quiz-${vowelIndex}`}
            vowel={vowel}
            onCorrect={onCorrect}
          />
        )}
        {phase === 'letter-done' && (
          <LetterDone
            key={`done-${vowelIndex}`}
            vowel={vowel}
            onNext={goNext}
            isLast={isLast}
          />
        )}
        {phase === 'all-done' && (
          <AllDone
            key="all-done"
            vowels={VOWELS}
            onComplete={handleComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
