'use client';

import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';
import { studentKeys } from '@/core/services/studentApi';
import { getLetterData, shuffle, LETTER_DATA } from '@/core/data/letterData';

type Props = {
  config: { letter?: string; word?: string; emoji?: string; color?: string };
  onComplete: (data: {
    score: number;
    max_score: number;
    completion_data: Record<string, unknown>;
    time_taken_seconds: number;
  }) => void;
  lessonId?: string;
  nextLessonId?: string;
};

/* ─── Fun facts per letter ─── */
const LETTER_FACTS: Record<string, string> = {
  A: "A is the first letter of the alphabet!",
  B: "B makes a bouncing 'buh' sound!",
  C: "C curls like a happy cat!",
  D: "D is for dancing dog!",
  E: "E is the most used letter!",
  F: "F sounds like a funny fish!",
  G: "G is for great grapes!",
  H: "H takes a big breath — hhh!",
  I: "I stands tall and proud!",
  J: "J curves down with a dot!",
  K: "K kicks up and down!",
  L: "L makes an L-shape with your fingers!",
  M: "M has two mountain peaks!",
  N: "N goes down, up, and down again!",
  O: "O is a round circle like a ring!",
  P: "P has a line and a big bump!",
  Q: "Q is like an O with a tiny tail!",
  R: "R is like P with a kicking leg!",
  S: "S curves like a slithering snake!",
  T: "T has a hat on top!",
  U: "U curves down like a cup!",
  V: "V points down like a valley!",
  W: "W has two V shapes together!",
  X: "X is two lines crossing!",
  Y: "Y has arms stretching wide!",
  Z: "Z zigzags across like lightning!",
  a: "a is the first letter of the alphabet!",
  b: "b makes a bouncing 'buh' sound!",
  c: "c curls like a happy cat!",
  d: "d is for dancing dog!",
  e: "e is the most used letter!",
  f: "f sounds like a funny fish!",
  g: "g is for great grapes!",
  h: "h takes a big breath — hhh!",
  i: "i stands tall and proud!",
  j: "j curves down with a dot!",
  k: "k kicks up and down!",
  l: "l makes an L-shape with your fingers!",
  m: "m has two mountain peaks!",
  n: "n goes down, up, and down again!",
  o: "o is a round circle like a ring!",
  p: "p has a line and a big bump!",
  q: "q is like an o with a tiny tail!",
  r: "r is like p with a kicking leg!",
  s: "s curves like a slithering snake!",
  t: "t has a hat on top!",
  u: "u curves down like a cup!",
  v: "v points down like a valley!",
  w: "w has two v shapes together!",
  x: "x is two lines crossing!",
  y: "y has arms stretching wide!",
  z: "z zigzags across like lightning!",
};

/* ─── Dotted Board Guidelines ─── */
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

/* ─── Letter showcase badge ─── */
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
          fontSize: 'clamp(5rem, 20vw, 8.5rem)',
          color: '#78350f',
          textShadow: `0 0 30px ${color}50, 0 2px 4px rgba(120,53,15,0.1)`,
        }}
      >
        {letter}
      </span>
    </div>
  );
}

/* ─── Tracing board sub-component ─── */
interface TraceBoardProps {
  letter: string;
  color: string;
  onCorrect: () => void;
}

function TraceBoard({ letter, color, onCorrect }: TraceBoardProps) {
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
    ctx.font = `900 ${fontSize}px "Arial", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ff0000';
    ctx.fillText(letter, w / 2, h / 2);

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
  }, [letter]);

  const drawGuide = useCallback((w: number, h: number) => {
    const gc = guideCanvasRef.current;
    if (!gc) return;
    gc.width = w;
    gc.height = h;
    const ctx = gc.getContext('2d');
    if (!ctx) return;
    const fontSize = Math.min(260, Math.max(165, Math.round(w * 0.55)));
    ctx.clearRect(0, 0, w, h);
    ctx.font = `900 ${fontSize}px "Arial", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Light brown guide letter with elegant dashes
    ctx.fillStyle = 'rgba(180, 83, 9, 0.12)';
    ctx.fillText(letter, w / 2, h / 2);

    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(180, 83, 9, 0.25)';
    ctx.setLineDash([5, 8]);
    ctx.strokeText(letter, w / 2, h / 2);
  }, [letter]);

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
  }, [letter, drawGuide, buildLetterData]);

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
      ctx.strokeStyle = color;
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
      setFailMsg('Trace the letter! ✏️');
      return;
    }

    const data = letterDataRef.current;
    const grid = templateGridRef.current;
    const wideGrid = templateGridWideRef.current;
    if (!data || !grid || !wideGrid || data.pixels.length === 0) {
      setFailMsg('Try again! ✍️');
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
      setFailMsg('Try again! ✍️');
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
      setFailMsg('Trace the letter! ✏️');
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

    // Relaxed kid-friendly thresholds (especially for vertical lines like 'I')
    const isLetterI = letter.toLowerCase() === 'i';
    const reqContainment = isLetterI ? 40 : 50;
    const reqCoverage = isLetterI ? 30 : 40;
    const reqFarDrawn = isLetterI ? maxFarDrawn * 3.5 : maxFarDrawn * 1.8;

    const passed = containment >= reqContainment && coverage >= reqCoverage && widthRatioPassed && heightRatioPassed && farDrawn <= reqFarDrawn && (isLetterI || allClustersCovered);

    if (passed) {
      setDone(true);
      successTimerRef.current = setTimeout(onCorrect, 1000);
    } else if (containment < reqContainment || farDrawn > reqFarDrawn) {
      setFailMsg('Stay on the letter lines! 🎯');
    } else {
      setFailMsg('Trace the whole letter! ✍️');
    }
  };

  return (
    <motion.div
      key={`trace-${letter}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-4 w-full"
    >
      <div className="w-full text-center">
        <p className="text-amber-900 text-sm sm:text-base font-black font-sans">
          Trace the letter &quot;{letter}&quot;! ✍️
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
              <p className="text-lg font-black text-emerald-600 mt-2 font-sans">Awesome Job! 🎊</p>
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
          className="flex-1 py-3.5 rounded-2xl font-black text-amber-800 text-sm bg-amber-100 hover:bg-amber-200/60 active:scale-95 transition-all border-b-4 border-amber-300 disabled:opacity-50 font-sans"
        >
          Clear 🧼
        </button>

        <button
          onClick={handleFinish}
          disabled={!hasDrawn || done}
          className="flex-1 py-3.5 rounded-2xl font-black text-white text-sm bg-gradient-to-r from-emerald-500 to-teal-500 shadow-md border-b-4 border-emerald-700 active:scale-95 transition-all disabled:opacity-50 font-sans"
        >
          Check ✅
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function LetterShowcase({ config, onComplete, nextLessonId }: Props) {
  const rawLetter = (config.letter as string) || 'A';
  const isCaps = rawLetter === rawLetter.toUpperCase() && rawLetter.length === 1;
  const letter = isCaps ? rawLetter : rawLetter.toLowerCase();
  const letterData = getLetterData(letter.toUpperCase());
  const word = (config.word as string) || letterData.word;
  const emoji = (config.emoji as string) || letterData.emoji;
  const color = (config.color as string) || letterData.color;
  const fact = LETTER_FACTS[letter] || 'fun letter!';
  const queryClient = useQueryClient();

  const [phase, setPhase] = useState<'showcase' | 'trace' | 'quiz' | 'done'>('showcase');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [wrongTap, setWrongTap] = useState(false);
  const startTime = useRef(Date.now());

  /* ── Prefetch next lesson when showcase is visible ── */
  useEffect(() => {
    if (phase === 'showcase' && nextLessonId) {
      queryClient.prefetchQuery({
        queryKey: studentKeys.activities(nextLessonId),
        staleTime: 5 * 60 * 1000,
      });
    }
  }, [phase, nextLessonId, queryClient]);

  /* ── Quiz options ── */
  const quizOptions = useMemo(() => {
    const allEntries = Object.entries(LETTER_DATA) as [string, { word: string; emoji: string }][];
    const distractors = allEntries
      .filter(([k]) => k !== letter.toUpperCase())
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map(([, v]) => ({ word: v.word, emoji: v.emoji }));
    return shuffle([
      { id: 'correct', word, emoji, correct: true },
      ...distractors.map((d, i) => ({ id: `w${i}`, ...d, correct: false })),
    ]);
  }, [letter, word, emoji]);

  /* ── Handlers ── */
  const handleTraceCorrect = useCallback(() => {
    setPhase('quiz');
  }, []);

  const handleComplete = useCallback(() => {
    onComplete({
      score: 100,
      max_score: 100,
      completion_data: { letter, word, emoji, quiz_passed: true },
      time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
    });
  }, [onComplete, letter, word, emoji]);

  const handleQuizTap = useCallback((opt: { id: string; correct: boolean }) => {
    if (selectedId) return;
    setSelectedId(opt.id);
    if (opt.correct) {
      setTimeout(handleComplete, 800);
    } else {
      setWrongTap(true);
      setTimeout(() => { setWrongTap(false); setSelectedId(null); }, 600);
    }
  }, [selectedId, handleComplete]);

  return (
    <div className="flex flex-col items-center justify-center gap-3 px-3 sm:px-5 pb-4 select-none w-full">
      <AnimatePresence mode="wait">
        {/* ═══════════ PHASE 1: SHOWCASE ═══════════ */}
        {phase === 'showcase' && (
          <motion.div
            key="showcase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-4 w-full"
          >
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/50 border border-amber-200/50">
              <span className="text-[10px] font-black text-amber-800 tracking-wider uppercase font-sans">English Lesson</span>
            </div>

            {/* Showcase Card */}
            <div
              className="relative w-full rounded-3xl overflow-hidden border-[3px] border-amber-200 bg-amber-50/40 p-6 flex flex-col items-center gap-4"
              style={{ boxShadow: '0 8px 30px rgba(180,83,9,0.02)' }}
            >
              <BoardLetter letter={letter} color={color} />

              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-amber-100 shadow-sm mt-2 font-sans">
                <span className="text-3xl">{emoji}</span>
                <span className="text-lg font-black text-amber-950">
                  {letter} is for {word}
                </span>
              </div>
            </div>

            <p className="text-[10px] sm:text-xs text-amber-800/80 font-bold text-center max-w-xs leading-relaxed font-sans px-2">
              {fact}
            </p>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setPhase('trace')}
              className="w-full max-w-xs py-3.5 rounded-2xl font-black text-white text-sm tracking-wide shadow-md active:scale-95 font-sans"
              style={{
                background: `linear-gradient(135deg, ${color}, ${color}ee)`,
                boxShadow: `0 4px 20px ${color}30`,
                borderBottom: `4px solid ${color}aa`
              }}
            >
              Learn to Trace! ✏️
            </motion.button>
          </motion.div>
        )}

        {/* ═══════════ PHASE 2: TRACING ═══════════ */}
        {phase === 'trace' && (
          <motion.div
            key="trace"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full"
          >
            <TraceBoard
              letter={letter}
              color={color}
              onCorrect={handleTraceCorrect}
            />
          </motion.div>
        )}

        {/* ═══════════ PHASE 3: QUIZ ═══════════ */}
        {phase === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-4 w-full"
          >
            <div className="text-center mb-2">
              <h3 className="text-lg sm:text-xl font-black text-amber-950 font-sans">
                What is <span style={{ color }}>{letter}</span> for? 🤔
              </h3>
              <p className="text-xs text-amber-800/60 font-bold font-sans">Tap the matching picture</p>
            </div>

            <motion.div
              animate={wrongTap ? { x: [0, -6, 6, -4, 4, 0] } : {}}
              transition={{ duration: 0.3 }}
              className="w-full max-w-xs sm:max-w-sm"
            >
              <div className="grid grid-cols-3 gap-3">
                {quizOptions.map((opt) => {
                  const isSelected = selectedId === opt.id;
                  const isWin = isSelected && opt.correct;
                  const isLose = isSelected && !opt.correct;

                  return (
                    <motion.button
                      key={opt.id}
                      disabled={!!selectedId}
                      whileTap={!selectedId ? { scale: 0.95 } : undefined}
                      onClick={() => handleQuizTap(opt)}
                      className={`
                        relative flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all duration-200 shadow-sm font-sans
                        ${isWin
                          ? 'border-emerald-400 bg-emerald-500/10 scale-105'
                          : isLose
                            ? 'border-rose-400 bg-rose-500/10'
                            : selectedId
                              ? 'border-amber-100 bg-[#fffdf9] opacity-50'
                              : 'border-amber-200 bg-[#fffdf9] hover:bg-amber-50/50 cursor-pointer active:scale-95'
                        }
                      `}
                    >
                      {isWin && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1.5 -right-1.5 text-xs sm:text-sm bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold"
                        >
                          ✓
                        </motion.span>
                      )}
                      <span className="text-3xl sm:text-4xl">{opt.emoji}</span>
                      <span className={`text-[10px] sm:text-xs font-black uppercase ${isWin ? 'text-emerald-700' : 'text-amber-950'}`}>
                        {opt.word}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {wrongTap && (
                <p className="text-center text-xs font-bold text-rose-600 mt-4 font-sans">
                  Not that one — try again! 💪
                </p>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ═══════════ PHASE 4: DONE ═══════════ */}
        {phase === 'done' && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-5 py-6 text-center w-full"
          >
            <span className="text-6xl animate-bounce">🎈</span>
            <h3 className="text-xl sm:text-2xl font-black text-amber-950 font-sans">Great Job!</h3>
            <p className="text-sm font-bold text-amber-800 max-w-xs leading-relaxed font-sans">
              You learned the letter &quot;{letter}&quot; and matched {word} {emoji}!
            </p>

            <div className="w-20 h-20 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-4xl font-bold text-emerald-600 shadow-sm font-sans">
              {letter}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleComplete}
              className="w-full max-w-xs py-3.5 rounded-2xl font-black text-white text-sm bg-gradient-to-r from-emerald-500 to-teal-500 shadow-md border-b-4 border-emerald-700 active:scale-95 font-sans"
            >
              Continue ➡️
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
