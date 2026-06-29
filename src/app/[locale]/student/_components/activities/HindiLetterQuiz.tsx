'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Data ─── */

interface LetterEntry {
  letter: string;       // Hindi letter
  name: string;         // Pronunciation name
  word: string;         // Example word
  emoji: string;        // Visual emoji
  color: string;        // Accent color (hex/hsl)
}

/* Swar Set A: अ, आ */
const SWAR_AA: LetterEntry[] = [
  { letter: 'अ', name: 'अ', word: 'अनार', emoji: '🍎', color: '#f97316' },
  { letter: 'आ', name: 'आ', word: 'आम', emoji: '🥭', color: '#eab308' },
];

/* Swar Set B: इ, ई, उ, ऊ */
const SWAR_II_UU: LetterEntry[] = [
  { letter: 'इ', name: 'इ', word: 'इमली', emoji: '🍋', color: '#22c55e' },
  { letter: 'ई', name: 'ई', word: 'ईंट', emoji: '🧱', color: '#10b981' },
  { letter: 'उ', name: 'उ', word: 'उल्लू', emoji: '🦉', color: '#06b6d4' },
  { letter: 'ऊ', name: 'ऊ', word: 'ऊँट', emoji: '🐪', color: '#6366f1' },
];

/* Vyanjan Set A: क, ख, ग, घ */
const VYANJAN_KA: LetterEntry[] = [
  { letter: 'क', name: 'क', word: 'कबूतर', emoji: '🐦', color: '#ec4899' },
  { letter: 'ख', name: 'ख', word: 'खरगोश', emoji: '🐇', color: '#f43f5e' },
  { letter: 'ग', name: 'ग', word: 'गमला', emoji: '🪴', color: '#14b8a6' },
  { letter: 'घ', name: 'घ', word: 'घर', emoji: '🏠', color: '#8b5cf6' },
];

/* Vyanjan Set B: च, छ, ज, झ */
const VYANJAN_CHA: LetterEntry[] = [
  { letter: 'च', name: 'च', word: 'चम्मच', emoji: '🥄', color: '#3b82f6' },
  { letter: 'छ', name: 'छ', word: 'छाता', emoji: '🌂', color: '#06b6d4' },
  { letter: 'ज', name: 'ज', word: 'जहाज़', emoji: '🚢', color: '#10b981' },
  { letter: 'झ', name: 'झ', word: 'झंडा', emoji: '🚩', color: '#f59e0b' },
];

/* ─── Sub-components ─── */

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

function BoardLetter({ letter, color }: { letter: string; color: string }) {
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: '100%', aspectRatio: '1 / 1', maxWidth: 200 }}
    >
      <div
        className="absolute inset-0 rounded-full opacity-10 blur-xl animate-pulse"
        style={{ background: color }}
      />
      <span
        className="relative z-10 font-black leading-none font-sans"
        style={{
          fontSize: 'clamp(5rem, 18vw, 8.5rem)',
          color: '#78350f',
          textShadow: `0 0 30px ${color}50, 0 2px 4px rgba(120,53,15,0.1)`,
        }}
      >
        {letter}
      </span>
    </div>
  );
}

interface TraceBoardProps {
  entry: LetterEntry;
  onCorrect: () => void;
}

function TraceBoard({ entry, onCorrect }: TraceBoardProps) {
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

    const fontSize = Math.min(260, Math.max(165, Math.round(w * 0.55)));
    ctx.font = `900 ${fontSize}px "Arial", "sans-serif"`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ff0000';
    ctx.fillText(entry.letter, w / 2, h / 2);

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
      const tol = Math.max(14, Math.round(w * 0.045)); // narrow corridor (e.g. 14px)
      const wideTol = Math.max(26, Math.round(w * 0.085)); // wide corridor (e.g. 26px)

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
  }, [entry.letter]);

  const drawGuide = useCallback((w: number, h: number) => {
    const gc = guideCanvasRef.current;
    if (!gc) return;
    gc.width = w;
    gc.height = h;
    const ctx = gc.getContext('2d');
    if (!ctx) return;
    const fontSize = Math.min(260, Math.max(160, Math.round(w * 0.52)));
    ctx.clearRect(0, 0, w, h);
    ctx.font = `900 ${fontSize}px "Arial", "sans-serif"`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Light brown guide letter with elegant dashes or solid semi-opacity
    ctx.fillStyle = 'rgba(180, 83, 9, 0.12)';
    ctx.fillText(entry.letter, w / 2, h / 2);

    // Dotted stroke effect
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(180, 83, 9, 0.25)';
    ctx.setLineDash([5, 8]);
    ctx.strokeText(entry.letter, w / 2, h / 2);
  }, [entry.letter]);

  useEffect(() => {
    let cancelled = false;

    const setup = async () => {
      const container = containerRef.current;
      if (!container) return;

      const w = container.clientWidth || 360;
      const h = Math.max(380, Math.round(w * 0.9));

      if (!cancelled) setDimensions({ w, h });

      const dc = canvasRef.current;
      if (dc) { dc.width = w; dc.height = h; }

      letterDataRef.current = null;
      templateGridRef.current = null;
      templateGridWideRef.current = null;
      clustersRef.current = [];

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
  }, [entry.letter, drawGuide, buildLetterData]);

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
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) { ctx.beginPath(); ctx.moveTo(pos.x, pos.y); }
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || done) return;
    const pos = getCanvasPos(e);
    pointsRef.current.push(pos);

    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      // Chalk effect: rounded colored stroke matching letter
      ctx.strokeStyle = entry.color;
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => setIsDrawing(false);

  const handleReset = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    pointsRef.current = [];
    setHasDrawn(false);
    setDone(false);
    setFailMsg(null);
    if (successTimerRef.current) clearTimeout(successTimerRef.current);
  };

  const handleFinish = () => {
    const pts = pointsRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (pts.length < 15) {
      setFailMsg('अक्षर को ट्रेस करें! ✏️');
      return;
    }

    const data = letterDataRef.current;
    const grid = templateGridRef.current;
    const wideGrid = templateGridWideRef.current;
    if (!data || !grid || !wideGrid || data.pixels.length === 0) {
      setFailMsg('फिर कोशिश करें! ✍️');
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
      setFailMsg('फिर कोशिश करें! ✍️');
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
      setFailMsg('अक्षर को ट्रेस करें! ✏️');
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
      if (clusterCoverage < 20) {
        allClustersCovered = false;
        break;
      }
    }

    const minDim = Math.max(45, w * 0.12);
    const widthRatioPassed = templateW < minDim || widthRatio >= 0.7;
    const heightRatioPassed = templateH < minDim || heightRatio >= 0.7;
    const maxFarDrawn = Math.max(15, Math.round(w * 0.05));

    // Strict validation thresholds: containment >= 72%, coverage >= 55%, low far-away drawings
    const passed = containment >= 72 && coverage >= 55 && widthRatioPassed && heightRatioPassed && farDrawn <= maxFarDrawn * 1.5 && allClustersCovered;

    if (passed) {
      setDone(true);
      successTimerRef.current = setTimeout(onCorrect, 1000);
    } else if (containment < 72 || farDrawn > maxFarDrawn * 1.5) {
      setFailMsg('अक्षर के ऊपर ही लिखें! 🎯');
    } else {
      setFailMsg('पूरे अक्षर को ट्रेस करें! ✍️');
    }
  };

  return (
    <motion.div
      key={`trace-${entry.letter}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-4 w-full"
    >
      <div className="w-full text-center">
        <p className="text-amber-900 text-sm sm:text-base font-black font-sans">
          अक्षर &quot;{entry.letter}&quot; को ट्रेस करें! ✍️
        </p>
      </div>

      {/* Cream Slate Board */}
      <div
        ref={containerRef}
        className="relative w-full rounded-3xl overflow-hidden touch-none"
        style={{
          height: dimensions.h,
          background: '#fffdf9',
          border: '4px solid #b45309',
          boxShadow: '0 8px 30px rgba(180,83,9,0.06)',
          touchAction: 'none',
        }}
      >
        <BoardLines />
        <canvas ref={guideCanvasRef} className="absolute inset-0 z-0 pointer-events-none touch-none w-full h-full" />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 cursor-crosshair touch-none"
          style={{ width: dimensions.w, height: dimensions.h, touchAction: 'none' }}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
        />

        {done && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-amber-50/40 backdrop-blur-[2px]">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
              <div className="text-6xl animate-bounce">⭐</div>
              <p className="text-lg font-black text-emerald-600 mt-2 font-sans">बहुत बढ़िया! 🎊</p>
            </motion.div>
          </div>
        )}

        <AnimatePresence>
          {failMsg && !done && (
            <motion.div
              key="fail"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-1.5 rounded-full text-xs font-black shadow-sm font-sans whitespace-nowrap"
            >
              {failMsg}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-4 w-full justify-center">
        <button
          onClick={handleReset}
          disabled={done}
          className="flex-1 py-3.5 rounded-2xl font-black text-amber-800 text-sm bg-amber-100 hover:bg-amber-200/60 active:scale-95 transition-all border-b-4 border-amber-300 disabled:opacity-50"
        >
          साफ़ करें 🧼
        </button>

        <button
          onClick={handleFinish}
          disabled={!hasDrawn || done}
          className="flex-1 py-3.5 rounded-2xl font-black text-white text-sm bg-gradient-to-r from-emerald-500 to-teal-500 shadow-md border-b-4 border-emerald-700 active:scale-95 transition-all disabled:opacity-50"
        >
          जाँचें ✅
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Phase: Showcase ─── */

interface ShowcaseProps {
  entry: LetterEntry;
  index: number;
  total: number;
  onNext: () => void;
}

function Showcase({ entry, index, total, onNext }: ShowcaseProps) {
  return (
    <motion.div
      key={`show-${entry.letter}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center gap-4 w-full"
    >
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/50 border border-amber-200/50">
        <span className="text-[10px] font-black text-amber-800 tracking-wider uppercase">HINDI LESSON</span>
        <span className="text-[10px] font-bold text-amber-700/60">{index + 1} / {total}</span>
      </div>

      {/* Showcase Card */}
      <div
        className="relative w-full rounded-3xl overflow-hidden border-[3px] border-amber-200 bg-amber-50/40 p-6 flex flex-col items-center gap-4"
        style={{ boxShadow: '0 8px 30px rgba(180,83,9,0.02)' }}
      >
        <BoardLetter letter={entry.letter} color={entry.color} />

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-amber-100 shadow-sm mt-2">
          <span className="text-3xl">{entry.emoji}</span>
          <span className="text-lg font-black text-amber-950 font-sans">
            {entry.letter} से {entry.word}
          </span>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="w-full max-w-xs py-3.5 rounded-2xl font-black text-white text-sm tracking-wide shadow-md active:scale-95"
        style={{
          background: `linear-gradient(135deg, ${entry.color}, ${entry.color}ee)`,
          boxShadow: `0 4px 20px ${entry.color}30`,
          borderBottom: `4px solid ${entry.color}aa`
        }}
      >
        ट्रेस करना सीखें! ✏️
      </motion.button>
    </motion.div>
  );
}

/* ─── Phase: Letter Done ─── */

interface LetterDoneProps {
  entry: LetterEntry;
  onNext: () => void;
  isLast: boolean;
}

function LetterDone({ entry, onNext, isLast }: LetterDoneProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-5 py-6 text-center w-full"
    >
      <span className="text-6xl animate-bounce">🎈</span>
      <h3 className="text-xl sm:text-2xl font-black text-amber-950 font-sans">शानदार!</h3>
      <p className="text-sm font-bold text-amber-800 max-w-xs leading-relaxed font-sans">
        आपने &quot;{entry.letter}&quot; को सफलतापूर्वक ट्रेस करना सीख लिया है!
      </p>

      <div className="w-20 h-20 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-4xl font-bold text-emerald-600 shadow-sm font-sans">
        {entry.letter}
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="w-full max-w-xs py-3.5 rounded-2xl font-black text-white text-sm bg-gradient-to-r from-emerald-500 to-teal-500 shadow-md border-b-4 border-emerald-700 active:scale-95"
      >
        {isLast ? 'समाप्त करें ➡️' : 'अगला अक्षर ➡️'}
      </motion.button>
    </motion.div>
  );
}

/* ─── Phase: All Done ─── */

interface AllDoneProps {
  letters: LetterEntry[];
  onComplete: () => void;
}

function AllDone({ letters, onComplete }: AllDoneProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-6 py-6 w-full max-w-sm"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-7xl"
      >
        🏆
      </motion.div>

      <div className="flex flex-col items-center gap-2 px-6 py-5 rounded-3xl w-full text-center bg-amber-50/40 border-[3px] border-amber-200">
        <p className="text-xl font-black text-amber-950 font-sans">बहुत बढ़िया! 🎊</p>
        <p className="text-xs font-bold text-amber-800/80 leading-relaxed font-sans">
          आपने सभी अक्षरों को सफलतापूर्वक ट्रेस कर लिया है:
        </p>

        <div className="flex items-center gap-3 mt-3 flex-wrap justify-center">
          {letters.map((v, i) => (
            <motion.span
              key={v.letter}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.08, type: 'spring' }}
              className="text-2xl font-black font-sans"
              style={{ color: v.color }}
            >
              {v.letter}
            </motion.span>
          ))}
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onComplete}
        className="w-full max-w-xs py-4 rounded-2xl font-black text-white text-base tracking-wide shadow-md bg-gradient-to-r from-amber-500 to-orange-500 border-b-4 border-orange-700 active:scale-95 font-sans"
      >
        अगली गतिविधि ➡️
      </motion.button>
    </motion.div>
  );
}

/* ─── Main Component ─── */

type Phase = 'showcase' | 'quiz' | 'letter-done' | 'all-done';

type Props = {
  conceptKey: string;
  onComplete: (data: {
    score: number;
    max_score: number;
    completion_data: Record<string, unknown>;
    time_taken_seconds: number;
  }) => void;
};

export default function HindiLetterQuiz({ conceptKey, onComplete }: Props) {
  const letters = useMemo(() => {
    switch (conceptKey) {
      case 'hindi-swar-aa':
        return SWAR_AA;
      case 'hindi-swar-ii-uu':
        return SWAR_II_UU;
      case 'hindi-vyanjan-ka':
        return VYANJAN_KA;
      case 'hindi-vyanjan-cha':
        return VYANJAN_CHA;
      default:
        return SWAR_AA;
    }
  }, [conceptKey]);

  const startTime = useRef(Date.now());
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('showcase');
  const [scores, setScores] = useState<Record<string, boolean>>({});

  const entry = letters[index];
  const isLast = index === letters.length - 1;

  const goToQuiz = useCallback(() => setPhase('quiz'), []);

  const onCorrect = useCallback(() => {
    setScores(prev => ({ ...prev, [entry.letter]: true }));
    setPhase('letter-done');
  }, [entry.letter]);

  const goNext = useCallback(() => {
    if (isLast) {
      setPhase('all-done');
    } else {
      setIndex(i => i + 1);
      setPhase('showcase');
    }
  }, [isLast]);

  const handleComplete = useCallback(() => {
    const correct = Object.values(scores).filter(Boolean).length;
    onComplete({
      score: correct,
      max_score: letters.length,
      completion_data: { scores, letters_learned: Object.keys(scores), set: conceptKey },
      time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
    });
  }, [onComplete, scores, conceptKey, letters.length]);

  return (
    <div className="flex flex-col items-center gap-3 px-3 sm:px-5 pb-4 select-none w-full">
      {/* Progress dots */}
      <div className="flex items-center gap-2">
        {letters.map((v, i) => (
          <div
            key={v.letter}
            className="transition-all duration-300"
            style={{
              width: i === index ? 24 : 8,
              height: 8,
              borderRadius: 99,
              background: scores[v.letter]
                ? '#22c55e'
                : i === index
                  ? v.color
                  : 'rgba(217, 119, 6, 0.2)',
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {phase === 'showcase' && (
          <Showcase
            key={`showcase-${index}`}
            entry={entry}
            index={index}
            total={letters.length}
            onNext={goToQuiz}
          />
        )}
        {phase === 'quiz' && (
          <TraceBoard
            key={`quiz-${index}`}
            entry={entry}
            onCorrect={onCorrect}
          />
        )}
        {phase === 'letter-done' && (
          <LetterDone
            key={`done-${index}`}
            entry={entry}
            onNext={goNext}
            isLast={isLast}
          />
        )}
        {phase === 'all-done' && (
          <AllDone
            key="all-done"
            letters={letters}
            onComplete={handleComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
