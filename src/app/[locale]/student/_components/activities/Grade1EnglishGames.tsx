'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { GRADE1_ENGLISH_LEVELS, GRADE1_MATH_LEVELS, GRADE1_TAMIL_LEVELS } from '../../Quiz/grade1QuizData';

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ==========================================================================
   MATH VISUALIZATION HELPERS
   ========================================================================== */
function parseClockHands(text: string): { hours: number; minutes: number } | null {
  const match = text.match(/Short:\s*(\d+),\s*Long:\s*(\d+)/i);
  if (match) {
    const hours = parseInt(match[1]);
    const minutesVal = parseInt(match[2]);
    const minutes = minutesVal === 12 ? 0 : minutesVal === 6 ? 30 : (minutesVal * 5) % 60;
    return { hours, minutes };
  }
  return null;
}

function parseDigitalTime(text: string): { hours: number; minutes: number } | null {
  const match = text.match(/^(\d+):(\d+)$/);
  if (match) {
    return { hours: parseInt(match[1]), minutes: parseInt(match[2]) };
  }
  return null;
}

function parseHalfPast(text: string): { hours: number; minutes: number } | null {
  const match = text.match(/Half\s+past\s+(\d+)/i);
  if (match) {
    const hours = parseInt(match[1]);
    return { hours, minutes: 30 };
  }
  return null;
}

function MiniClock({ hours, minutes }: { hours: number; minutes: number }) {
  const hrAngle = (hours % 12) * 30 + minutes * 0.5;
  const minAngle = minutes * 6;

  return (
    <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white rounded-full border-2 sm:border-4 border-amber-300 shadow-sm relative flex items-center justify-center select-none scale-105 hover:scale-110 transition-transform">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2.5" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = i * 30;
          const x1 = 50 + 38 * Math.sin((angle * Math.PI) / 180);
          const y1 = 50 - 38 * Math.cos((angle * Math.PI) / 180);
          const x2 = 50 + 43 * Math.sin((angle * Math.PI) / 180);
          const y2 = 50 - 43 * Math.cos((angle * Math.PI) / 180);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i % 3 === 0 ? '#1e293b' : '#64748b'}
              strokeWidth={i % 3 === 0 ? '3.5' : '1.5'}
            />
          );
        })}
        <line
          x1="50"
          y1="50"
          x2={50 + 20 * Math.sin((hrAngle * Math.PI) / 180)}
          y2={50 - 20 * Math.cos((hrAngle * Math.PI) / 180)}
          stroke="#4f46e5"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="50"
          y1="50"
          x2={50 + 30 * Math.sin((minAngle * Math.PI) / 180)}
          y2={50 - 30 * Math.cos((minAngle * Math.PI) / 180)}
          stroke="#ef4444"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="50" cy="50" r="4.5" fill="#1e293b" />
      </svg>
    </div>
  );
}

const DAYS_OF_WEEK = new Set(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']);
const MONTHS_OF_YEAR = new Set(['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']);

function MiniCalendarPage({ title, label }: { title: string; label?: string }) {
  const isWeekend = title.toLowerCase().includes('sun') || label?.toLowerCase().includes('weekend') || title.toLowerCase().includes('end');
  const headerBg = isWeekend ? 'bg-rose-500 text-white' : 'bg-indigo-500 text-white';
  const borderBg = isWeekend ? 'border-rose-200' : 'border-indigo-200';

  return (
    <div className={`w-18 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl border-2 ${borderBg} shadow-sm overflow-hidden flex flex-col items-center select-none hover:scale-105 transition-transform`}>
      <div className={`w-full ${headerBg} py-0.5 sm:py-1 text-[8px] sm:text-[9.5px] font-black tracking-widest text-center uppercase`}>
        {isWeekend ? 'HOLIDAY 📅' : 'CALENDAR 📅'}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-1 text-center w-full">
        <span className="text-xs sm:text-sm font-black text-slate-800 leading-tight">
          {title}
        </span>
        {label && (
          <span className="text-[7px] sm:text-[8.5px] font-black text-slate-400 mt-0.5 uppercase leading-none">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

function renderCalendarVisual(val: string) {
  const lower = val.trim().toLowerCase();

  if (lower.includes('day after')) {
    const day = val.match(/day after\s+(\w+)/i)?.[1] || '';
    const shortDay = day.substring(0, 3);
    return <MiniCalendarPage title={`${shortDay} ➡️ ❓`} label="NEXT DAY" />;
  }

  if (lower.includes('month after')) {
    const month = val.match(/month after\s+(\w+)/i)?.[1] || '';
    const shortMonth = month.substring(0, 3);
    return <MiniCalendarPage title={`${shortMonth} ➡️ ❓`} label="NEXT MONTH" />;
  }

  if (lower.includes('last day') || lower.includes('end of week')) {
    return <MiniCalendarPage title="End 🏁" label="WEEKEND" />;
  }

  if (DAYS_OF_WEEK.has(lower)) {
    // title case
    const capitalized = val.charAt(0).toUpperCase() + val.slice(1);
    return <MiniCalendarPage title={capitalized} label="DAY" />;
  }

  if (MONTHS_OF_YEAR.has(lower)) {
    const capitalized = val.charAt(0).toUpperCase() + val.slice(1);
    return <MiniCalendarPage title={capitalized} label="MONTH" />;
  }

  return null;
}

export function MathVerticalProblem({ equation }: { equation: string }) {
  // Matches expressions like "25 + 13" or "45 - 23"
  const match = equation.match(/(\d+)\s*([\+\-])\s*(\d+)/);
  if (!match) return <span className="font-mono text-2xl font-black text-slate-800">{equation}</span>;
  const num1 = match[1];
  const op = match[2];
  const num2 = match[3];

  return (
    <div className="inline-flex flex-col items-center bg-purple-50/70 border-4 border-purple-200/80 rounded-3xl px-6 py-4 shadow-sm font-mono text-2xl sm:text-3xl font-black text-purple-950 relative z-10 mx-auto select-none">
      <div className="grid grid-cols-3 gap-x-3 text-right">
        <span className="text-slate-400 text-xs font-sans text-center"></span>
        <span className="text-purple-400 text-xs font-sans text-center">T</span>
        <span className="text-rose-400 text-xs font-sans text-center">O</span>

        <span></span>
        <span>{num1[0]}</span>
        <span>{num1[1]}</span>

        <span className="text-amber-500 font-extrabold">{op}</span>
        <span>{num2[0]}</span>
        <span>{num2[1]}</span>
      </div>
      <div className="w-full h-1 bg-purple-300 my-2 rounded-full" />
    </div>
  );
}

function renderVisualValue(val: string, isMath?: boolean) {
  if (!isMath) return <span>{val}</span>;

  const calendarPage = renderCalendarVisual(val);
  if (calendarPage) return calendarPage;

  const hands = parseClockHands(val);
  if (hands) {
    return (
      <div className="flex flex-col items-center gap-1.5 p-1">
        <MiniClock hours={hands.hours} minutes={hands.minutes} />
        <span className="text-[10px] font-black text-purple-500 mt-1 select-none">READ CLOCK</span>
      </div>
    );
  }

  const halfPast = parseHalfPast(val);
  if (halfPast) {
    return (
      <div className="flex flex-col items-center gap-1.5 p-1 select-none">
        <MiniClock hours={halfPast.hours} minutes={halfPast.minutes} />
        <span className="text-[10px] font-black text-purple-500 mt-1 select-none">READ CLOCK</span>
      </div>
    );
  }

  const time = parseDigitalTime(val);
  if (time) {
    return (
      <div className="flex flex-col items-center gap-1.5 p-1.5">
        <span className="px-4 py-1.5 bg-purple-100 text-purple-900 border-2 border-purple-300 rounded-2xl font-mono text-base font-extrabold tracking-wide">
          {val}
        </span>
        <span className="text-[9px] font-black text-purple-400 select-none">DIGITAL</span>
      </div>
    );
  }

  const placeValueMatch = val.match(/^(\d+)\s*(Hundreds|Tens|Ones)$/i);
  if (placeValueMatch) {
    const digit = placeValueMatch[1];
    const unit = placeValueMatch[2];
    const colors: Record<string, string> = {
      Hundreds: 'bg-red-50 text-red-700 border-red-200',
      Tens: 'bg-blue-50 text-blue-700 border-blue-200',
      Ones: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    };
    const emojis: Record<string, string> = {
      Hundreds: '🟥',
      Tens: '🟦',
      Ones: '🟨'
    };
    return (
      <div className={`flex flex-col items-center justify-center p-2 rounded-2xl border-2 shadow-sm font-sans ${colors[unit] || 'bg-slate-50'}`}>
        <span className="text-xl font-black">{digit} {emojis[unit]}</span>
        <span className="text-[10px] font-black tracking-wider uppercase opacity-75">{unit}</span>
      </div>
    );
  }

  const digitInNumMatch = val.match(/^(\d+)\s+in\s+(\d+)$/i);
  if (digitInNumMatch) {
    const digit = digitInNumMatch[1];
    const num = digitInNumMatch[2];
    const highlightedNum = num.split('').map((char, i) => (
      <span key={i} className={char === digit ? 'text-purple-600 underline font-black decoration-wavy' : 'text-slate-400'}>
        {char}
      </span>
    ));
    return (
      <div className="flex flex-col items-center gap-1">
        <span className="text-xl font-bold tracking-tight">{highlightedNum}</span>
        <span className="text-[10px] font-black text-slate-400">VALUE OF {digit}</span>
      </div>
    );
  }

  if (val.includes('+')) {
    const parts = val.split('+').map(p => p.trim());
    if (parts.every(p => !isNaN(parseInt(p)))) {
      return (
        <div className="flex items-center gap-1.5 p-1 select-none flex-wrap justify-center">
          {parts.map((p, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="text-purple-500 font-extrabold text-xs">➕</span>}
              <span className="px-2.5 py-1 bg-white border border-purple-200 text-purple-800 font-mono text-sm font-black rounded-lg shadow-sm">
                {p}
              </span>
            </React.Fragment>
          ))}
        </div>
      );
    }
  }

  const isAllNumeric = /^\d+$/.test(val);
  if (isAllNumeric) {
    return (
      <span className="px-3 py-1 bg-purple-50/50 border border-purple-200/60 rounded-xl text-purple-900 font-mono font-extrabold tracking-wide select-none">
        {val}
      </span>
    );
  }

  return <span>{val}</span>;
}

function renderTrainCoachItem(word: string, isMath?: boolean) {
  if (word === '➔' || word === '->') {
    return (
      <div className="w-10 h-10 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-amber-650 shadow-inner select-none shrink-0">
        <span className="text-lg font-black">➡️</span>
      </div>
    );
  }

  if (word === '+') {
    return (
      <div className="w-10 h-10 rounded-full bg-purple-100 border-2 border-purple-300 flex items-center justify-center text-purple-600 shadow-inner select-none shrink-0">
        <span className="text-lg font-black">➕</span>
      </div>
    );
  }

  const num = parseInt(word);
  if (!isNaN(num)) {
    const scaleHeight = 45 + Math.min(45, (num / 100) * 45);
    return (
      <div 
        style={{ height: `${scaleHeight}px` }} 
        className="flex flex-col items-center justify-end w-14 sm:w-16 bg-gradient-to-t from-purple-500 to-indigo-400 border-2 border-white rounded-2xl shadow-md text-white font-black px-1 pb-2.5 transition-all relative select-none"
      >
        <span className="text-base sm:text-lg font-mono tracking-tight">{word}</span>
        <div className="absolute top-1 left-1.5 right-1.5 h-1 bg-white/30 rounded-full" />
      </div>
    );
  }

  // Colorful train coaches for kids spelling Tamil/English words
  return (
    <div className="flex flex-col items-center justify-center min-w-[55px] h-[55px] px-3.5 bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 border-3 border-white rounded-2xl shadow-lg text-white font-black transition-all relative select-none active:scale-95">
      <span className="text-base sm:text-lg drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.3)]">{word}</span>
      {/* Train details */}
      <div className="absolute top-1 left-2 w-2 h-2 rounded-full bg-white/35" />
      <div className="absolute top-1 right-2 w-2 h-2 rounded-full bg-white/35" />
      {/* Wheels */}
      <div className="absolute -bottom-1.5 left-3 w-3 h-3 rounded-full bg-slate-800 border border-white" />
      <div className="absolute -bottom-1.5 right-3 w-3 h-3 rounded-full bg-slate-800 border border-white" />
    </div>
  );
}


/* ==========================================================================
   SIMPLE TRACING CANVAS
   ========================================================================== */
export function SimpleTraceCanvas({ letter, onComplete }: { letter: string; onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const guideCanvasRef = useRef<HTMLCanvasElement>(null);
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
  const [failMsg, setFailMsg] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ w: 300, h: 280 });

  const fontName = '"Baloo 2", "Fredoka", sans-serif';

  const buildLetterData = useCallback((w: number, h: number) => {
    const off = document.createElement('canvas');
    off.width = w;
    off.height = h;
    const ctx = off.getContext('2d');
    if (!ctx) return;

    const fontSize = Math.min(220, Math.max(120, Math.round(w * 0.45)));
    ctx.font = `900 ${fontSize}px ${fontName}`;
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

      const grid = new Uint8Array(w * h);
      const wideGrid = new Uint8Array(w * h);
      const tol = Math.max(15, Math.round(w * 0.05));
      const wideTol = Math.max(28, Math.round(w * 0.095));

      for (const lp of pixels) {
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
    const fontSize = Math.min(220, Math.max(120, Math.round(w * 0.45)));
    ctx.clearRect(0, 0, w, h);
    ctx.font = `900 ${fontSize}px ${fontName}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(180, 83, 9, 0.15)';
    ctx.fillText(letter, w / 2, h / 2);
  }, [letter, fontName]);

  useEffect(() => {
    const setup = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const w = canvas.parentElement?.clientWidth || 320;
      const h = Math.max(340, Math.min(420, Math.round(w * 0.9)));
      setDimensions({ w, h });

      canvas.width = w;
      canvas.height = h;

      letterDataRef.current = null;
      templateGridRef.current = null;
      templateGridWideRef.current = null;
      clustersRef.current = [];

      try {
        await document.fonts.load(`900 ${Math.round(w * 0.45)}px "Baloo 2"`);
      } catch (_) {}

      drawGuide(w, h);
      buildLetterData(w, h);
    };

    setup();
    window.addEventListener('resize', setup);
    return () => window.removeEventListener('resize', setup);
  }, [letter, drawGuide, buildLetterData]);

  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    setHasDrawn(true);
    setFailMsg(null);
    const coords = getCoordinates(e);
    pointsRef.current.push(coords);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
    }
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const coords = getCoordinates(e);
    pointsRef.current.push(coords);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
    }
  };

  const stopDrawing = () => setIsDrawing(false);

  const handleReset = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    pointsRef.current = [];
    setHasDrawn(false);
    setFailMsg(null);
  };

  const handleFinish = () => {
    const pts = pointsRef.current;
    const canvas = canvasRef.current;
    if (pts.length < 15 || !canvas) {
      setFailMsg('Please draw! ✏️');
      return;
    }

    const data = letterDataRef.current;
    const grid = templateGridRef.current;
    const wideGrid = templateGridWideRef.current;
    if (!data || !grid || !wideGrid || data.pixels.length === 0) {
      onComplete();
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
      onComplete();
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
      setFailMsg('Please write! ✏️');
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

    const passed = containment >= 75 && coverage >= 50 && widthRatioPassed && heightRatioPassed && farDrawn <= maxFarDrawn && allClustersCovered;

    if (passed) {
      onComplete();
    } else if (containment < 75 || farDrawn > maxFarDrawn) {
      setFailMsg('Trace on the letter only! 🎯');
    } else {
      setFailMsg('Trace the whole letter correctly! ✍️');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="relative w-full h-[340px] sm:h-[400px] rounded-[2rem] border-4 border-[#b45309] shadow-inner bg-[#fffdf9] overflow-hidden touch-none">
        <canvas
          ref={guideCanvasRef}
          className="absolute inset-0 pointer-events-none touch-none w-full h-full"
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 cursor-crosshair touch-none w-full h-full z-10"
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
        />
        {failMsg && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="bg-[#fffdf9]/95 text-rose-600 border-2 border-rose-200 rounded-xl px-5 py-3 text-sm font-black shadow-xl text-center max-w-[280px]">
              <p className="mb-0.5">❌ {failMsg}</p>
              <p className="text-[11px] text-amber-800">Press Try Again 🔄 to trace again</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-3 w-full font-sans">
        <button
          onClick={handleReset}
          className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow active:scale-95 transition-all text-sm"
        >
          Try Again 🔄
        </button>
        <button
          onClick={handleFinish}
          disabled={!hasDrawn}
          className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow active:scale-95 transition-all text-sm disabled:opacity-40"
        >
          Done! ✅
        </button>
      </div>
    </div>
  );
}

/* ==========================================================================
   GAMEPLAY VIEW TEMPLATES
   ========================================================================== */

// 1A. Connect Pairs (connect_pairs)
export function Grade1ConnectPairs({ question, onAnswer, isMath }: { question: any; onAnswer: (opt: any) => void; isMath?: boolean }) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matchedIndices, setMatchedIndices] = useState<number[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);

  // Shuffle right items once on mount, saving original indices
  const shuffledRight = useMemo<any[]>(() => {
    const items = question.pairs.map((p: any, idx: number) => ({ value: p.right, originalIndex: idx }));
    return shuffleArray(items);
  }, [question]);

  // Shuffle left items once on mount, saving original indices
  const shuffledLeft = useMemo<any[]>(() => {
    const items = question.pairs.map((p: any, idx: number) => ({ value: p.left, originalIndex: idx }));
    let shuffled = shuffleArray([...items]);
    if (items.length > 1) {
      let attempts = 0;
      while (attempts < 15) {
        let hasOverlap = false;
        for (let i = 0; i < shuffled.length; i++) {
          if (shuffled[i].originalIndex === shuffledRight[i]?.originalIndex) {
            hasOverlap = true;
            break;
          }
        }
        if (!hasOverlap) break;
        shuffled = shuffleArray([...items]);
        attempts++;
      }
    }
    return shuffled;
  }, [question, shuffledRight]);

  const handleLeftClick = (originalIndex: number) => {
    if (isAnswered) return;
    setSelectedLeft(originalIndex);
  };

  const handleRightClick = (originalIndex: number) => {
    if (selectedLeft === null || isAnswered) return;
    
    // Check if the clicked right item originalIndex matches the selected left item originalIndex
    if (selectedLeft === originalIndex) {
      const newMatches = [...matchedIndices, originalIndex];
      setMatchedIndices(newMatches);
      setSelectedLeft(null);

      // Check if all matched
      if (newMatches.length === question.pairs.length) {
        setIsAnswered(true);
        onAnswer({ text: 'connected_all', correct: true });
      }
    } else {
      // Wrong match
      setSelectedLeft(null);
    }
  };

  const isLetterMatch = useMemo(() => {
    const firstLeft = question.pairs?.[0]?.left;
    return typeof firstLeft === 'string' && firstLeft.length === 1 && firstLeft >= 'A' && firstLeft <= 'Z';
  }, [question.pairs]);

  const leftHeader = isLetterMatch ? 'Capital' : 'Question';
  const rightHeader = isLetterMatch ? 'Small' : 'Match';

  return (
    <div className={`flex flex-col items-center gap-6 w-full mt-2 font-sans p-2 sm:p-4 rounded-[2rem] relative overflow-hidden transition-all duration-350
      ${isMath ? 'bg-gradient-to-br from-purple-50 to-indigo-50/50 border-4 border-purple-200 shadow-md' : ''}`}>
      <div className="grid grid-cols-2 gap-3.5 sm:gap-8 w-full max-w-sm justify-center items-stretch relative z-10">
        {/* Left Column */}
        <div className="flex flex-col gap-3">
          <p className={`text-xs font-black uppercase tracking-widest text-center ${isMath ? 'text-purple-600' : 'text-slate-400'}`}>{leftHeader}</p>
          {shuffledLeft.map((leftItem: any, idx: number) => {
            const isMatched = matchedIndices.includes(leftItem.originalIndex);
            const isSelected = selectedLeft === leftItem.originalIndex;
            return (
              <button
                key={idx}
                disabled={isMatched}
                onClick={() => handleLeftClick(leftItem.originalIndex)}
                className={`py-2 px-3 sm:py-3.5 sm:px-6 rounded-xl sm:rounded-2xl font-black text-xs sm:text-lg border-2 shadow transition-all duration-150 flex items-center justify-center text-center w-full min-h-[55px] sm:min-h-[75px]
                  ${isMatched 
                    ? isMath ? 'bg-emerald-50 border-emerald-355 text-emerald-650 opacity-60' : 'bg-emerald-55 border-emerald-300 text-emerald-600 opacity-60' 
                    : isSelected 
                      ? 'bg-amber-400 border-amber-500 text-indigo-955 scale-105 shadow-md font-extrabold' 
                      : isMath 
                        ? 'bg-white border-purple-200 text-purple-900 hover:border-purple-300' 
                        : 'bg-white border-slate-150 text-slate-700 hover:border-amber-300'}`}
              >
                {renderVisualValue(leftItem.value, isMath)}
              </button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-3">
          <p className={`text-xs font-black uppercase tracking-widest text-center ${isMath ? 'text-purple-600' : 'text-slate-400'}`}>{rightHeader}</p>
          {shuffledRight.map((rightItem: any, idx: number) => {
            const isMatched = matchedIndices.includes(rightItem.originalIndex);
            return (
              <button
                key={idx}
                disabled={isMatched}
                onClick={() => handleRightClick(rightItem.originalIndex)}
                className={`py-2 px-3 sm:py-3.5 sm:px-6 rounded-xl sm:rounded-2xl font-black text-xs sm:text-lg border-2 shadow transition-all duration-150 flex items-center justify-center text-center w-full min-h-[55px] sm:min-h-[75px]
                  ${isMatched 
                    ? isMath ? 'bg-emerald-50 border-emerald-355 text-emerald-650 opacity-60' : 'bg-emerald-55 border-emerald-300 text-emerald-600 opacity-60' 
                    : selectedLeft !== null
                      ? isMath 
                        ? 'bg-purple-50 border-dashed border-purple-355 text-purple-800 hover:bg-purple-100/50'
                        : 'bg-amber-50 border-dashed border-amber-300 text-amber-800 hover:bg-amber-100/50' 
                      : isMath 
                        ? 'bg-white border-purple-200 text-purple-900 hover:border-purple-300' 
                        : 'bg-white border-slate-150 text-slate-700 hover:border-amber-300'}`}
              >
                {renderVisualValue(rightItem.value, isMath)}
              </button>
            );
          })}
        </div>
      </div>
      {isAnswered && (
        <span className={`font-extrabold text-sm relative z-10 ${isMath ? 'text-emerald-450' : 'text-emerald-600'}`}>Great Match! 🤝</span>
      )}
    </div>
  );
}

// 1B. Grid Search / Detective (grid_search)
export function Grade1GridSearch({ question, onAnswer }: { question: any; onAnswer: (opt: any) => void }) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [wrongAttempt, setWrongAttempt] = useState(false);

  const handleItemToggle = (text: string) => {
    if (isAnswered) return;
    setWrongAttempt(false);
    if (selectedItems.includes(text)) {
      setSelectedItems(selectedItems.filter(item => item !== text));
    } else {
      setSelectedItems([...selectedItems, text]);
    }
  };

  const handleCheck = () => {
    if (isAnswered) return;
    
    // Find all expected correct items
    const correctItems = question.gridItems.filter((i: any) => i.correct).map((i: any) => i.text);
    
    // Check if user selected exactly the correct items
    const hasAllCorrect = correctItems.every((item: string) => selectedItems.includes(item));
    const hasNoExtra = selectedItems.every((item: string) => correctItems.includes(item));

    if (hasAllCorrect && hasNoExtra) {
      setIsAnswered(true);
      onAnswer({ text: 'detective_correct', correct: true });
    } else {
      setWrongAttempt(true);
      setTimeout(() => setWrongAttempt(false), 1500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full mt-2 font-sans">
      <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
        {question.gridItems.map((item: any, idx: number) => {
          const isSelected = selectedItems.includes(item.text);
          return (
            <button
              key={idx}
              onClick={() => handleItemToggle(item.text)}
              className={`p-4 rounded-2xl border-2 shadow flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95 min-h-[90px]
                ${isAnswered && item.correct
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                  : isSelected
                    ? 'bg-amber-400 border-amber-500 text-indigo-950 scale-105'
                    : 'bg-white border-slate-150 text-slate-700 hover:border-amber-300'}`}
            >
              {item.emoji && <span className="text-3xl select-none">{item.emoji}</span>}
              <span className="text-xs font-black">{item.text}</span>
            </button>
          );
        })}
      </div>

      {wrongAttempt && (
        <span className="text-rose-500 font-extrabold text-sm">Keep searching! Some matches are incorrect or missing. 🔎</span>
      )}

      {!isAnswered && selectedItems.length > 0 && (
        <button
          onClick={handleCheck}
          className="mt-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 border-2 border-white text-white font-black rounded-2xl shadow-md active:scale-95 transition-all text-sm uppercase tracking-wider"
        >
          Check 🔎
        </button>
      )}
    </div>
  );
}

// 1C. Word Hunt (drag_hunt)
export function Grade1WordHunt({ question, onAnswer }: { question: any; onAnswer: (opt: any) => void }) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [wrongWord, setWrongWord] = useState<string | null>(null);

  const handleWordClick = (opt: any) => {
    if (isAnswered) return;
    setWrongWord(null);
    if (opt.correct) {
      setSelectedWord(opt.text);
      setIsAnswered(true);
      onAnswer(opt);
    } else {
      setWrongWord(opt.text);
      // Shake animation trigger
      setTimeout(() => {
        setWrongWord(null);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full mt-4 font-sans">
      {/* Target Picture Box */}
      <div className="flex flex-col items-center gap-3">
        <div 
          className={`w-36 h-36 rounded-[2rem] border-4 border-dashed bg-white shadow-md flex flex-col items-center justify-center transition-all duration-350
            ${isAnswered ? 'border-emerald-500 bg-emerald-50 scale-105' : 'border-slate-350'}`}
        >
          {isAnswered ? (
            <span className="text-6xl select-none leading-none">{question.matchImage}</span>
          ) : (
            <>
              <span className="text-5xl select-none leading-none mb-2">{question.matchImage}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">TAP CORRECT WORD</span>
            </>
          )}
        </div>
        {isAnswered && (
          <span className="px-4 py-1.5 bg-emerald-100 border border-emerald-200 text-emerald-800 font-black rounded-full text-sm uppercase tracking-wide">
            {question.options.find((opt: any) => opt.correct)?.text}
          </span>
        )}
      </div>

      {/* Floating words selection */}
      {!isAnswered && (
        <div className="flex flex-wrap gap-3 justify-center max-w-sm mt-4">
          {question.options.map((opt: any, i: number) => {
            const isWrong = wrongWord === opt.text;
            return (
              <button
                key={i}
                onClick={() => handleWordClick(opt)}
                className={`px-6 py-3.5 rounded-2xl font-black text-base shadow border-2 transition-all duration-200 active:scale-95
                  ${isWrong 
                    ? 'bg-rose-500 border-rose-600 text-white' 
                    : 'bg-white border-slate-150 text-slate-700 hover:border-amber-300 hover:bg-amber-50/20'}`}
              >
                {opt.text}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// 2. Garden Repair (garden_repair)
export function Grade1GardenRepair({ question, onAnswer, isMath }: { question: any; onAnswer: (opt: any) => void; isMath?: boolean }) {
  const [selectedOpt, setSelectedOpt] = useState<any | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const shuffledOptions = useMemo(() => {
    return shuffleArray([...question.options]);
  }, [question]);

  const handleOptionSelect = (opt: any) => {
    if (isAnswered) return;
    setSelectedOpt(opt);
    setIsWrong(false);
  };

  const handleRepair = () => {
    if (!selectedOpt || isAnswered) return;
    if (selectedOpt.correct) {
      setIsAnswered(true);
      onAnswer(selectedOpt);
    } else {
      setIsWrong(true);
      setSelectedOpt(null);
    }
  };

  const parts = question.sentence.split('___');

  // Check if we can extract an equation from the sentence or instructions
  const verticalEquation = useMemo(() => {
    if (!isMath) return null;
    const matchSentence = question.sentence.match(/(\d+\s*[\+\-]\s*\d+)/);
    if (matchSentence) return matchSentence[1];
    const matchInstruction = question.instruction?.match(/(\d+\s*[\+\-]\s*\d+)/);
    if (matchInstruction) return matchInstruction[1];
    return null;
  }, [question, isMath]);

  const clockTimeObj = useMemo(() => {
    if (!isMath || !question.clockTime) return null;
    return parseDigitalTime(question.clockTime);
  }, [question, isMath]);

  return (
    <div className={`flex flex-col items-center gap-6 w-full max-w-md mx-auto mt-2 font-sans px-4 py-6 rounded-[2.5rem] relative overflow-hidden transition-all duration-350
      ${isMath ? 'bg-gradient-to-br from-purple-50 to-indigo-50/50 border-4 border-purple-200 shadow-md' : ''}`}>
      
      {clockTimeObj ? (
        <div className="flex flex-col items-center gap-4 relative z-10 w-full select-none">
          <MiniClock hours={clockTimeObj.hours} minutes={clockTimeObj.minutes} />
          <div className="flex items-center justify-center gap-3.5 mt-2">
            <span className="text-xs font-black text-purple-400">YOUR ANSWER:</span>
            <span className={`px-6 py-2.5 rounded-2xl font-black text-xl border-4 shadow-sm transition-all duration-300
              ${isAnswered 
                ? 'bg-emerald-500 border-emerald-600 text-white shadow-emerald-100 border-solid' 
                : selectedOpt 
                  ? 'bg-purple-100 border-purple-400 text-purple-900 border-solid' 
                  : 'bg-slate-50 border-purple-200 text-purple-300 min-w-[70px] inline-block text-center border-dashed'}`}>
              {isAnswered ? question.options.find((o: any) => o.correct)?.text : (selectedOpt ? selectedOpt.text : ' ? ')}
            </span>
          </div>
        </div>
      ) : verticalEquation ? (
        <div className="flex flex-col items-center gap-4 relative z-10 w-full">
          <MathVerticalProblem equation={verticalEquation} />
          <div className="flex items-center justify-center gap-3.5 mt-2 select-none">
            <span className="text-xs font-black text-purple-400">YOUR ANSWER:</span>
            <span className={`px-6 py-2.5 rounded-2xl font-black text-xl border-4 shadow-sm transition-all duration-300
              ${isAnswered 
                ? 'bg-emerald-500 border-emerald-600 text-white shadow-emerald-100 border-solid' 
                : selectedOpt 
                  ? 'bg-purple-100 border-purple-400 text-purple-900 border-solid' 
                  : 'bg-slate-50 border-purple-200 text-purple-300 min-w-[70px] inline-block text-center border-dashed'}`}>
              {isAnswered ? question.options.find((o: any) => o.correct)?.text : (selectedOpt ? selectedOpt.text : ' ? ')}
            </span>
          </div>
        </div>
      ) : (
        /* Garden Sentence Card */
        <div className={`w-full p-6 rounded-[2.5rem] border-4 shadow-md text-center transition-all duration-300 relative z-10 bg-white
          ${isAnswered 
            ? 'border-emerald-400 bg-emerald-50/30' 
            : isMath ? 'border-purple-200' : 'border-amber-200'}`}>
          <p className="text-base sm:text-lg font-black leading-relaxed text-slate-800">
            {parts[0]}
            <span className={`mx-2 px-4 py-1.5 rounded-2xl border-2 border-dashed font-black text-base transition-all duration-300
              ${isAnswered 
                ? 'bg-emerald-500 border-emerald-600 text-white border-solid' 
                : selectedOpt 
                  ? isMath ? 'bg-purple-105 border-purple-400 text-purple-900 border-solid' : 'bg-amber-100 border-amber-400 text-amber-900 border-solid' 
                  : isMath ? 'bg-slate-55 border-purple-200 text-purple-300 min-w-[60px] inline-block text-center' : 'bg-slate-50 border-slate-300 text-slate-400 min-w-[60px] inline-block text-center'}`}>
              {isAnswered ? question.options.find((o: any) => o.correct)?.text : (selectedOpt ? selectedOpt.text : ' ? ')}
            </span>
            {parts[1]}
          </p>
        </div>
      )}

      {/* Decorative Pot Graphic */}
      <div className="flex flex-col items-center select-none my-1 relative z-10">
        <span className="text-5xl">{isMath ? '🧮' : '🪴'}</span>
        <div className="w-16 h-1.5 bg-slate-900/10 rounded-full blur-[2px] mt-1" />
      </div>

      {isWrong && (
        <span className="text-rose-500 font-extrabold text-sm relative z-10">Try another option! 💥</span>
      )}

      {/* Leaf options at bottom */}
      {!isAnswered && (
        <div className="flex flex-wrap gap-3 justify-center w-full mt-2 relative z-10">
          {shuffledOptions.map((opt: any, i: number) => {
            const isSelected = selectedOpt?.text === opt.text;
            return (
              <button
                key={i}
                onClick={() => handleOptionSelect(opt)}
                className={`px-6 py-3.5 rounded-[1.8rem] font-black text-sm border-4 shadow-md transition-all duration-200 active:scale-95 flex items-center justify-center gap-1.5
                  ${isSelected 
                    ? isMath ? 'bg-purple-500 border-white text-white rotate-[-3deg] scale-105' : 'bg-emerald-500 border-white text-white rotate-[-3deg] scale-105 shadow-emerald-200' 
                    : isMath ? 'bg-white border-purple-100 text-purple-800 hover:border-purple-300 hover:bg-purple-55/20' : 'bg-white border-emerald-100 text-emerald-800 hover:border-emerald-300 hover:bg-emerald-55/20'}`}
              >
                <span>{isMath ? '🔢' : '🌱'}</span>
                {opt.text}
              </button>
            );
          })}
        </div>
      )}

      {selectedOpt && !isAnswered && (
        <button
          onClick={handleRepair}
          className={`w-full sm:w-auto px-8 py-4 text-white font-black rounded-2xl shadow-lg active:scale-95 active:border-b-0 transition-all text-sm uppercase tracking-wider mt-2 relative z-10
            ${isMath ? 'bg-gradient-to-r from-purple-500 to-indigo-500 border-b-4 border-indigo-700' : 'bg-gradient-to-r from-emerald-500 to-teal-500 border-b-4 border-emerald-700'}`}
        >
          {isMath ? 'Verify Answer! ⚡' : 'Fix Plant! 🌱'}
        </button>
      )}
    </div>
  );
}

// 3. Sentence Train (sentence_train)
export function Grade1SentenceTrain({ question, onAnswer, isMath }: { question: any; onAnswer: (opt: any) => void; isMath?: boolean }) {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  useEffect(() => {
    setShuffledWords(shuffleArray([...question.words]));
    setSelectedIndices([]);
    setIsCorrect(false);
    setIsWrong(false);
  }, [question]);

  const handleWordSelect = (index: number) => {
    if (isCorrect) return;
    setIsWrong(false);
    if (selectedIndices.includes(index)) {
      const idx = selectedIndices.indexOf(index);
      setSelectedIndices(selectedIndices.slice(0, idx));
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  const handleClear = () => {
    setSelectedIndices([]);
    setIsWrong(false);
  };

  const handleCheck = () => {
    const currentSentence = selectedIndices.map(idx => shuffledWords[idx]).join(' ');
    if (currentSentence === question.correctSentence) {
      setIsCorrect(true);
      onAnswer({ text: currentSentence, correct: true });
    } else {
      setIsWrong(true);
      setTimeout(() => {
        setIsWrong(false);
      }, 1000);
    }
  };

  return (
    <div className={`flex flex-col items-center gap-6 w-full mt-4 font-sans p-6 rounded-[2.5rem] relative overflow-hidden transition-all duration-350 bg-gradient-to-b from-sky-100 to-indigo-100/40 border-4 border-white shadow-2xl
      ${isMath ? 'bg-gradient-to-br from-purple-50 to-indigo-50/50' : ''}`}>
      
      {/* Decorative background sky elements */}
      <div className="absolute top-2 left-6 text-2xl opacity-20 pointer-events-none select-none">☁️</div>
      <div className="absolute bottom-16 right-6 text-xl opacity-20 pointer-events-none select-none">✨</div>

      {/* Cloud Felt Board (Spelling Area) */}
      <div className="relative flex flex-col items-center justify-center p-6 rounded-[2.5rem] border-4 border-sky-200/80 w-full min-h-[140px] shadow-lg overflow-hidden z-10 bg-white/70 backdrop-blur-sm">
        
        {/* Soft floating clouds container */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 z-10">
          {selectedIndices.map((wordIdx, idx) => (
            <button
              key={idx}
              onClick={() => handleWordSelect(wordIdx)}
              className="flex items-center justify-center min-w-[54px] h-[54px] px-3 bg-gradient-to-br from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-black text-xl sm:text-2xl rounded-2xl shadow-lg border-2 border-white transform hover:scale-105 active:scale-95 transition-all select-none"
              style={{ fontFamily: '"Noto Sans Tamil", sans-serif' }}
            >
              {shuffledWords[wordIdx]}
            </button>
          ))}

          {Array.from({ length: Math.max(0, question.words.length - selectedIndices.length) }).map((_, i) => (
            <div 
              key={i} 
              className="w-12 h-12 border-2 border-dashed border-sky-300 bg-sky-50/50 rounded-2xl shrink-0 flex items-center justify-center text-sky-300 font-bold select-none"
            >
              ☁️
            </div>
          ))}
        </div>
      </div>

      {isWrong && (
        <span className="text-rose-500 font-black text-sm relative z-10 animate-bounce">Oops! Try sorting differently! 🌟</span>
      )}

      {/* Star / Bubble Letter options */}
      {!isCorrect && (
        <div className="flex flex-wrap gap-3 justify-center max-w-md mt-2 relative z-10">
          {shuffledWords.map((word, i) => {
            const isUsed = selectedIndices.includes(i);
            return (
              <button
                key={i}
                disabled={isUsed}
                onClick={() => handleWordSelect(i)}
                className={`flex items-center justify-center min-w-[58px] h-[58px] px-4 font-black text-xl sm:text-2xl rounded-full border-3 shadow-md transition-all duration-200 select-none transform hover:-translate-y-1
                  ${isUsed 
                    ? 'bg-slate-100/50 border-slate-200 text-slate-300 cursor-not-allowed scale-95 opacity-40' 
                    : 'bg-white border-sky-100 text-indigo-950 hover:border-sky-300 active:scale-95 shadow-sky-100/60'}`}
                style={{ fontFamily: '"Noto Sans Tamil", sans-serif' }}
              >
                {word}
              </button>
            );
          })}
        </div>
      )}

      {/* Controls */}
      {!isCorrect && selectedIndices.length > 0 && (
        <div className="flex gap-3 justify-center w-full max-w-sm mt-1 relative z-10">
          <button
            onClick={handleClear}
            className="flex-1 py-3 bg-white/80 border border-sky-200 text-indigo-950/70 font-black rounded-2xl shadow-sm active:scale-95 text-xs transition-all"
          >
            Clear 🔄
          </button>
          {selectedIndices.length === question.words.length && (
            <button
              onClick={handleCheck}
              className="flex-[2] py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-black rounded-2xl shadow-lg hover:brightness-110 active:scale-95 text-xs tracking-wider transition-all"
            >
              சரிபார்க்கவும்! ✨
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// 4. Story Cave (story_cave)
export function Grade1StoryCave({ question, onAnswer }: { question: any; onAnswer: (opt: any) => void }) {
  const [selectedOpt, setSelectedOpt] = useState<any | null>(null);
  const [selectedSteps, setSelectedSteps] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const [shuffledSteps, setShuffledSteps] = useState<string[]>([]);
  const shuffledOptions = useMemo(() => {
    return shuffleArray([...(question.options || [])]);
  }, [question]);

  useEffect(() => {
    if (question.isSequence) {
      setShuffledSteps(shuffleArray([...question.sequenceSteps]));
    }
    setSelectedOpt(null);
    setSelectedSteps([]);
    setIsAnswered(false);
    setIsWrong(false);
  }, [question]);

  const handleOptionSelect = (opt: any) => {
    if (isAnswered) return;
    setSelectedOpt(opt);
    setIsWrong(false);
    
    if (opt.correct) {
      setIsAnswered(true);
      onAnswer(opt);
    } else {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 1500);
    }
  };

  const handleStepSelect = (step: string) => {
    if (isAnswered) return;
    setIsWrong(false);
    if (selectedSteps.includes(step)) {
      setSelectedSteps(selectedSteps.filter(s => s !== step));
    } else {
      const newSteps = [...selectedSteps, step];
      setSelectedSteps(newSteps);

      if (newSteps.length === question.sequenceSteps.length) {
        const isSeqCorrect = newSteps.every((s, idx) => s === question.sequenceSteps[idx]);
        if (isSeqCorrect) {
          setIsAnswered(true);
          onAnswer({ text: 'correct_sequence', correct: true });
        } else {
          setIsWrong(true);
          setTimeout(() => {
            setSelectedSteps([]);
            setIsWrong(false);
          }, 1500);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full mt-2 font-sans">
      <div className="w-full bg-[#fcfaf2] border-4 border-dashed border-violet-300 rounded-[2.5rem] p-6 shadow-md text-left relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-violet-100/50 rounded-full pointer-events-none" />
        <span className="text-[10px] font-black bg-violet-100 text-violet-700 px-3 py-1 rounded-full uppercase tracking-wider leading-none select-none">
          Story Card 📖
        </span>
        <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed mt-4 italic font-serif">
          "{question.storyText}"
        </p>
      </div>

      {isWrong && (
        <span className="text-rose-500 font-extrabold text-sm">Oops! Try again! 🤗</span>
      )}

      {question.isSequence ? (
        <div className="flex flex-col items-center gap-4 w-full">
          <p className="text-xs font-black text-indigo-950/50 uppercase tracking-widest text-center">
            Arrange story events (Beginning ➔ End):
          </p>

          <div className="w-full bg-slate-50 border-2 border-slate-150 rounded-2xl p-4 min-h-[60px] flex flex-col gap-2">
            {selectedSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-black text-slate-700 uppercase">
                <span className="w-5 h-5 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="truncate">{step}</span>
              </div>
            ))}
          </div>

          {!isAnswered && (
            <div className="flex flex-col gap-2 w-full max-w-md">
              {shuffledSteps.map((step, i) => {
                const isUsed = selectedSteps.includes(step);
                return (
                  <button
                    key={i}
                    disabled={isUsed}
                    onClick={() => handleStepSelect(step)}
                    className={`p-4 rounded-2xl border-2 text-left text-sm font-bold shadow-sm transition-all duration-200 active:scale-[0.98]
                      ${isUsed 
                        ? 'bg-slate-100 border-slate-150 text-slate-350 opacity-55' 
                        : 'bg-white border-violet-100 text-slate-800 hover:border-violet-300'}`}
                  >
                    {step}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="bg-white/80 px-4 py-2 border border-slate-150 rounded-2xl text-center">
            <span className="text-sm font-black text-slate-800">{question.questionText}</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 w-full max-w-md justify-center">
            {shuffledOptions.map((opt: any, i: number) => {
              const isSelected = selectedOpt?.text === opt.text;
              return (
                <button
                  key={i}
                  onClick={() => handleOptionSelect(opt)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 shadow transition-all active:scale-95 min-h-[90px]
                    ${isSelected 
                      ? opt.correct ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-rose-500 border-rose-500 text-white'
                      : 'bg-white border-slate-150 text-slate-800 hover:border-violet-200'}`}
                >
                  <span className="text-xs font-black text-center">{opt.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// 5. Detective Zone (detective_highlight)
export function Grade1DetectiveZone({ question, onAnswer }: { question: any; onAnswer: (opt: any) => void }) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const words = question.sentence.split(/\s+/).map((w: string) => {
    return {
      raw: w,
      clean: w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    };
  });

  const handleWordClick = (wordObj: any) => {
    if (isCorrect) return;
    setSelectedWord(wordObj.clean);
    setIsWrong(false);

    if (wordObj.clean.toLowerCase() === question.targetWord.toLowerCase()) {
      setIsCorrect(true);
      onAnswer({ text: wordObj.clean, correct: true });
    } else {
      setIsWrong(true);
      setTimeout(() => {
        setSelectedWord(null);
        setIsWrong(false);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full mt-4 font-sans">
      <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-black shadow-inner select-none">
        <span>🔎 CLUE: Find the {question.category}!</span>
      </div>

      <div className="w-full bg-[#f3fbfd] border-4 border-dashed border-pink-300 rounded-[2.5rem] p-8 text-center shadow-md relative overflow-hidden">
        <div className="absolute top-2 left-2 w-8 h-8 bg-pink-100/50 rounded-full blur-sm pointer-events-none" />
        
        <div className="flex flex-wrap gap-x-3 gap-y-4 justify-center items-center">
          {words.map((wordObj: any, idx: number) => {
            const isSelected = selectedWord === wordObj.clean;
            return (
              <button
                key={idx}
                onClick={() => handleWordClick(wordObj)}
                className={`px-4 py-2.5 rounded-2xl text-2xl font-black transition-all duration-200 active:scale-90
                  ${isSelected 
                    ? isCorrect ? 'bg-emerald-500 text-white shadow-lg' : 'bg-rose-500 text-white'
                    : 'bg-white border-2 border-slate-150 text-slate-800 hover:border-pink-300'}`}
              >
                {wordObj.raw}
              </button>
            );
          })}
        </div>
      </div>

      {isWrong && (
        <span className="text-rose-500 font-extrabold text-sm">That clue isn't the {question.category}. Keep searching! 🔎</span>
      )}
    </div>
  );
}

// 6. Writing Lab (writing_lab)
export function Grade1WritingLab({ question, onAnswer }: { question: any; onAnswer: (opt: any) => void }) {
  const [selectedOpt, setSelectedOpt] = useState<any | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const shuffledOptions = useMemo(() => {
    return shuffleArray([...question.options]);
  }, [question]);

  const handleOptionSelect = (opt: any) => {
    if (isAnswered) return;
    setSelectedOpt(opt);
    setIsWrong(false);

    if (opt.correct) {
      setIsAnswered(true);
      onAnswer(opt);
    } else {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 1500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full mt-4 font-sans">
      {question.subType === 'trace' && question.letter && (
        <div className="flex flex-col items-center gap-4 w-full">
          <SimpleTraceCanvas
            letter={question.letter}
            onComplete={() => onAnswer({ text: 'writing_trace', correct: true })}
          />
        </div>
      )}

      {question.subType !== 'trace' && (
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="w-full bg-[#f9fbf9] border-4 border-dashed border-purple-300 rounded-[2.5rem] p-6 shadow-md text-center">
            <span className="text-3xl font-black text-slate-800 tracking-wider">
              {question.sentence}
            </span>
          </div>

          {isWrong && (
            <span className="text-rose-500 font-extrabold text-sm">Try another block! ✍️</span>
          )}

          <div className="flex gap-4 justify-center">
            {shuffledOptions.map((opt: any, i: number) => {
              const isSelected = selectedOpt?.text === opt.text;
              return (
                <button
                  key={i}
                  onClick={() => handleOptionSelect(opt)}
                  className={`px-6 py-3 rounded-2xl font-black text-base border-2 shadow transition-all active:scale-95
                    ${isSelected 
                      ? opt.correct ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-rose-500 border-rose-500 text-white'
                      : 'bg-white border-slate-150 text-slate-800 hover:border-purple-300'}`}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   SHARED ACTIVITY PLAYER WRAPPER FOR LEARN MAP VIEW
   ========================================================================== */
const GRADE1_LESSON_LEVEL_NUM: Record<string, number> = {
  // --- English Lesson UUIDs ---
  '94fd7887-13fc-4e1e-96b4-66e6287ad14b': 1,
  '58b41e3f-5415-484d-9d21-c40f35088660': 2,
  'a3de0f82-cac1-4259-93eb-a156c2c7deef': 3,
  '73971c5a-7a1e-444a-afcb-9f55361cbd58': 4,
  'aa945023-9696-4a94-a467-837f5a45fddf': 5,
  'c55b50cf-4d2b-4792-90ec-bef36e058371': 6,
  'bd6bf7ea-b213-40c8-82f9-d1803d730a64': 7,
  'ad8e7ed4-72fb-4d88-96c7-4e10186befd8': 8,
  '5cf04ee1-ba0e-4493-84ac-b79dd0d8220b': 9,
  'bfa6c26c-df9d-49a1-b669-905e3ff27109': 10,
  '6aa2f1d2-905d-49bd-9d1f-4612d89d9e24': 11,
  '4ff04bcc-38bd-4acf-bcdf-d00f83e0af9d': 12,
  'b1188df7-3dc1-4c8a-bb50-5fdde2081c2b': 13,
  '808fd070-c69f-4492-b307-f4773fb5dfac': 14,
  '704607c1-2787-447b-ac22-3255d3516c0c': 15,
  '2fbe246a-272f-4055-a07b-ab2ec4f8d513': 16,
  '20419d67-c6c2-43a6-b934-776e6e56054b': 17,
  'c6479d45-4d8f-49b2-8c03-a8fd8f6c47bd': 18,
  'c40ab716-34d8-4c51-b85e-a87c0b6cddf3': 19,
  '6349d284-1ecb-41e3-8ff0-3529723c0148': 20,
  '71dcc563-5cc9-444e-9a31-fc1042d28234': 21,
  'e36c6ee5-f75b-4fdc-b89d-c4fd4bc1100c': 22,
  '10984e17-f2f9-4d0c-a82c-49f7c99b4352': 23,
  '32908c46-7c6d-4208-a9ed-d4888f429257': 24,
  '1a716e98-bc13-4632-ae8c-e058992a0654': 25,
  '98f9412f-2c5b-4758-be31-22bfde93e736': 26,
  'dba4f205-af58-4ef4-a38d-50ddbd17e336': 27,
  '2edc06a0-a549-4a11-a7c6-6d09ed2cb67d': 28,
  'e9fda26d-4463-4685-b9c5-b52217da7536': 29,
  '2ca9ef21-3732-43af-9697-720b9254c2f4': 30,
  '94153b04-928c-48d8-bf99-0904799662b6': 31,
  '281d320a-8440-4df9-a67c-728b25483c19': 32,
  '89496866-4ba0-4288-8ae8-3331aa2c01f9': 33,
  '14561271-40c9-419b-bfcb-be8b11840744': 34,
  '9fac67e0-db09-4f7d-adc1-4803ee8c8789': 35,
  'dc8ed2e4-356a-4d4f-9cb5-1bb2cd95c347': 36,
  '835d09c4-fdba-4c23-97eb-5b34a8eefacd': 37,
  '1e70266f-0533-4954-8337-ece849d97d80': 38,
  'eeec79a4-a953-46b8-9b25-beb4efe38470': 39,
  '963f4d1e-0428-4cad-82ed-5dec09b93411': 40,
  '3e054e5b-f506-42b5-9730-b019104456c6': 41,
  '2cf74a85-b0a5-4ed4-a3fa-f7885503c550': 42,
  '297c58db-9ce2-40cb-af88-24e1ba42b319': 43,
  'bceae711-6235-46f9-95b0-a62a3eaa2f9c': 44,
  'dfd3e039-fa6b-489d-84e4-d6e0e09b37e0': 45,
  '2b580788-af55-4765-b2c8-53722d4b2dbe': 46,

  // --- Mathematics Lesson UUIDs ---
  'c464394d-630b-4e9a-af81-a1dabf2b55f9': 1,
  '608889e3-6ac2-4192-ad6a-77a43053d876': 2,
  '35983bcf-e2f5-4fb1-a9a5-61dfe5c49db9': 3,
  '1a6e8fe0-3081-4aa8-b2bf-781e874f51c9': 4,
  '40c172ab-b06b-4d2c-b1bc-fc4388ffec89': 5,
  'e303557d-9b47-4f5d-a91d-eb88b5ee2178': 6,
  'ce4e07e3-6927-4aa8-8374-0697f9947031': 7,
  '9aab6ea6-3501-4514-9a51-18427c7b2ee6': 8,
  '1ff082c5-8553-4d4c-9f08-e0d2e1e815ea': 9,
  '143b0e9e-73e9-4344-8139-12a4524618ef': 10,
  '7df0d7ba-3b30-4d04-9495-1b11adbe7ffb': 11,
  'c7db0cec-1ecf-4a89-8a92-11fece9eef75': 12,
  '982d64d9-dccc-4368-83bf-09f90606fdc8': 13,
  'fde6a688-93a7-43ea-a378-5d49dcac9598': 14,
  '5bbbd794-2a59-4740-b812-ea87d7987270': 15,
  'd59fdb62-9bfa-4f5e-bf6c-76aff565473c': 16,
  'a3ecb4be-5798-4715-8b40-bc6f27fa6ba9': 17,
  '9f8ac63c-0fdb-4668-99d1-8ad87f51c441': 18,
  '3b12afde-e371-4440-8f9a-060f5e8fc8dc': 19,
  '1be96344-8fb0-400c-b3c6-c397a561f5be': 20,
  '3bab6d76-b1a1-4009-9cc9-7cc523d72dfc': 21,
  '4ffae4bb-070d-414f-9773-6133c2b9c8e2': 22,
  '827eec70-13cf-42a3-9b55-e9536188e16d': 23,
  'a0f85bfb-1671-451f-9d4f-09730a00b77c': 24,
  'aae5bdb2-dbdb-4470-a59c-92687bae9b4f': 25,
  '5265e508-47df-4303-b532-1b11d1007a6f': 26,
  '4599e2ee-5e3c-4c0a-9039-75479cf33356': 27,
  '5b67c2c5-900e-489e-8b04-5c5328e4eda0': 28,
  'bc978aa9-4799-4ab2-84f7-3bbcf4de7df9': 29,
  'acdad6e4-507f-49ca-b3ba-7c7d51e7e8ec': 30,
  '9307b8a1-0051-40f1-8aa2-63d98a7803fd': 31,
  'cac24905-7651-4a0e-9f9d-ef6183fd7a01': 32,
  '11de2859-04d1-4195-8e4b-2a5f7cc0eaf4': 33,
  'df2d64be-5dd9-4007-a332-7ede6526f1ac': 34,
  '2108f038-d6b6-4a1c-8835-bc7340a4fa55': 35,
  '76089121-128d-4012-8efd-cf6adef95b66': 36,
  'd4b94eec-54ad-4efe-8704-351cde2244a4': 37,
  '619fec64-ac69-4c93-90c1-f70efabe1a6e': 38,
  'dd343b6e-2a5c-4230-9493-0c26700dd508': 39,
  'b0858a57-4a2b-41ac-9e36-0fbc7e274ea9': 40,
  '216e7dbc-c3d1-4278-ac15-2901d30a0538': 41,
  'a745cdf9-4425-40f5-8b5f-fd3242b740dc': 42,
  '233c3356-c533-47f5-bf92-2f0aafd07264': 43,
  '010821cd-efa3-4097-bb7f-048d753cf27b': 44,
  '685b5290-5d9a-498f-90e8-2a242fd9d4d7': 45,

  // --- Tamil Lesson UUIDs ---
  'd05d60ce-2053-4068-b9aa-45e81912e80d': 1, // Vowels Revision
  '402e5fee-2ac6-4ecd-addb-0382f1d3dc5b': 2, // Consonants Revision
  '075e431f-1d90-4b98-9b52-975eaa076543': 3, // Intro to Uyirmei
  'db0aa369-f847-4c49-b1e1-bef3ff49a2dd': 4, // Combination Practice
  '9206802c-20bf-4b4d-960f-5b67aaebc2de': 5, // Ordering Letters
  '8f03fcdc-fb8f-4af7-82bc-7a85e50f4e90': 6, // Ka Series
  'b2c32a7a-3f6d-4c38-98d4-a0c7e03e5d66': 7, // Cha Series
  'bfeaba3a-5032-4a1a-9530-7bdd53b18120': 8, // Tha Series
  '44e9173f-8623-47be-a658-b273594555cd': 9, // Pa Series
  '3e89ad77-6954-475a-91d9-cf87592d5828': 10, // Ma Series
  'c491ba6a-2af4-4a62-ba3f-c187e4f45f59': 11, // Full practice
  'f1c77e2e-d364-4ca0-9231-330ee28075fd': 12, // 2-Letter Words
  '2f0c8077-63e3-4a0f-b0a1-f3098afe3a2f': 13, // 3-Letter Words
  'e73e6f69-3791-43ad-8d5b-78d7b17905f0': 14, // Reading Simple Words
  'f44994e6-a1b2-40b6-bb6e-ba20f9fe5239': 15, // Find Word from Picture
  '4ae65faf-7dae-4f99-8b1c-be3f06cc8084': 16, // Word Splitting
  '5d6e373a-2aa3-4e94-adf2-c7e1f3da2103': 17, // Word Joining
  '2e60cd3f-edd2-4d80-9d77-6d57db3b888a': 18, // Reading Simple Sentences
  'b9fc2c1b-e94d-4810-80ff-3f37f41f10dd': 19, // Word - Image Matching
  'cbbcd706-bbcf-4112-9923-a93f191ee3be': 20, // Q&A
  '084d299e-3571-423b-961e-3dc2b3022bf4': 21, // Short Story Comprehension
  'f0e835fa-7a9b-4b88-a61e-941828c7ea29': 22, // Sequencing Events
  'c1b43010-97c9-4305-90db-97b1e43a0861': 23, // Noun Introduction
  'a9af574f-00c8-49a8-a7dd-6a6485a92a40': 24, // Action Words
  '81b386f2-68ac-4c50-adb9-e036c90124d2': 25, // Singular/Plural
  '4c1b892d-8db9-4b4b-b441-993345c857f6': 26, // Opposites
  '70e19cdd-d1e0-4722-9fac-b7d31b9e9c64': 27, // Word Classification
  'dd7cacd6-f5b3-4cc8-8b02-165e417faa64': 28, // Tamil Songs
  'f3c8d488-7c9e-49b9-abfe-59d9c6c1e701': 29, // Simple Poems
  'f2742e51-0256-4dd0-8d34-dde1d30c62e6': 30, // Short Stories
  'eb3f8e7c-b04b-418c-8ce7-5fda2190c535': 31  // Story comprehension
};

export const GRADE1_MATH_LESSON_IDS = new Set([
  'c464394d-630b-4e9a-af81-a1dabf2b55f9',
  '608889e3-6ac2-4192-ad6a-77a43053d876',
  '35983bcf-e2f5-4fb1-a9a5-61dfe5c49db9',
  '1a6e8fe0-3081-4aa8-b2bf-781e874f51c9',
  '40c172ab-b06b-4d2c-b1bc-fc4388ffec89',
  'e303557d-9b47-4f5d-a91d-eb88b5ee2178',
  'ce4e07e3-6927-4aa8-8374-0697f9947031',
  '9aab6ea6-3501-4514-9a51-18427c7b2ee6',
  '1ff082c5-8553-4d4c-9f08-e0d2e1e815ea',
  '143b0e9e-73e9-4344-8139-12a4524618ef',
  '7df0d7ba-3b30-4d04-9495-1b11adbe7ffb',
  'c7db0cec-1ecf-4a89-8a92-11fece9eef75',
  '982d64d9-dccc-4368-83bf-09f90606fdc8',
  'fde6a688-93a7-43ea-a378-5d49dcac9598',
  '5bbbd794-2a59-4740-b812-ea87d7987270',
  'd59fdb62-9bfa-4f5e-bf6c-76aff565473c',
  'a3ecb4be-5798-4715-8b40-bc6f27fa6ba9',
  '9f8ac63c-0fdb-4668-99d1-8ad87f51c441',
  '3b12afde-e371-4440-8f9a-060f5e8fc8dc',
  '1be96344-8fb0-400c-b3c6-c397a561f5be',
  '3bab6d76-b1a1-4009-9cc9-7cc523d72dfc',
  '4ffae4bb-070d-414f-9773-6133c2b9c8e2',
  '827eec70-13cf-42a3-9b55-e9536188e16d',
  'a0f85bfb-1671-451f-9d4f-09730a00b77c',
  'aae5bdb2-dbdb-4470-a59c-92687bae9b4f',
  '5265e508-47df-4303-b532-1b11d1007a6f',
  '4599e2ee-5e3c-4c0a-9039-75479cf33356',
  '5b67c2c5-900e-489e-8b04-5c5328e4eda0',
  'bc978aa9-4799-4ab2-84f7-3bbcf4de7df9',
  'acdad6e4-507f-49ca-b3ba-7c7d51e7e8ec',
  '9307b8a1-0051-40f1-8aa2-63d98a7803fd',
  'cac24905-7651-4a0e-9f9d-ef6183fd7a01',
  '11de2859-04d1-4195-8e4b-2a5f7cc0eaf4',
  'df2d64be-5dd9-4007-a332-7ede6526f1ac',
  '2108f038-d6b6-4a1c-8835-bc7340a4fa55',
  '76089121-128d-4012-8efd-cf6adef95b66',
  'd4b94eec-54ad-4efe-8704-351cde2244a4',
  '619fec64-ac69-4c93-90c1-f70efabe1a6e',
  'dd343b6e-2a5c-4230-9493-0c26700dd508',
  'b0858a57-4a2b-41ac-9e36-0fbc7e274ea9',
  '216e7dbc-c3d1-4278-ac15-2901d30a0538',
  'a745cdf9-4425-40f5-8b5f-fd3242b740dc',
  '233c3356-c533-47f5-bf92-2f0aafd07264',
  '010821cd-efa3-4097-bb7f-048d753cf27b',
  '685b5290-5d9a-498f-90e8-2a242fd9d4d7'
]);

export const GRADE1_TAMIL_LESSON_IDS = new Set([
  'd05d60ce-2053-4068-b9aa-45e81912e80d',
  '402e5fee-2ac6-4ecd-addb-0382f1d3dc5b',
  '075e431f-1d90-4b98-9b52-975eaa076543',
  'db0aa369-f847-4c49-b1e1-bef3ff49a2dd',
  '9206802c-20bf-4b4d-960f-5b67aaebc2de',
  '8f03fcdc-fb8f-4af7-82bc-7a85e50f4e90',
  'b2c32a7a-3f6d-4c38-98d4-a0c7e03e5d66',
  'bfeaba3a-5032-4a1a-9530-7bdd53b18120',
  '44e9173f-8623-47be-a658-b273594555cd',
  '3e89ad77-6954-475a-91d9-cf87592d5828',
  'c491ba6a-2af4-4a62-ba3f-c187e4f45f59',
  'f1c77e2e-d364-4ca0-9231-330ee28075fd',
  '2f0c8077-63e3-4a0f-b0a1-f3098afe3a2f',
  'e73e6f69-3791-43ad-8d5b-78d7b17905f0',
  'f44994e6-a1b2-40b6-bb6e-ba20f9fe5239',
  '4ae65faf-7dae-4f99-8b1c-be3f06cc8084',
  '5d6e373a-2aa3-4e94-adf2-c7e1f3da2103',
  '2e60cd3f-edd2-4d80-9d77-6d57db3b888a',
  'b9fc2c1b-e94d-4810-80ff-3f37f41f10dd',
  'cbbcd706-bbcf-4112-9923-a93f191ee3be',
  '084d299e-3571-423b-961e-3dc2b3022bf4',
  'f0e835fa-7a9b-4b88-a61e-941828c7ea29',
  'c1b43010-97c9-4305-90db-97b1e43a0861',
  'a9af574f-00c8-49a8-a7dd-6a6485a92a40',
  '81b386f2-68ac-4c50-adb9-e036c90124d2',
  '4c1b892d-8db9-4b4b-b441-993345c857f6',
  '70e19cdd-d1e0-4722-9fac-b7d31b9e9c64',
  'dd7cacd6-f5b3-4cc8-8b02-165e417faa64',
  'f3c8d488-7c9e-49b9-abfe-59d9c6c1e701',
  'f2742e51-0256-4dd0-8d34-dde1d30c62e6',
  'eb3f8e7c-b04b-418c-8ce7-5fda2190c535'
]);

/* ==========================================================================
   TAMIL COMBO CHART — uyirmei combination chart card (learn before practice)
   Shows: மெய் + உயிர் = உயிர்மெய் in a beautiful grouped table
   ========================================================================== */
function TamilComboChart({ question, onAnswer }: { question: any; onAnswer: (opt: any) => void }) {
  const combos: { consonant: string; vowel: string; result: string }[] = question.combos || [];

  // Theme styling (purple/indigo theme)
  const style = {
    bg: 'from-purple-500 via-indigo-500 to-blue-500',
    cardBg: 'from-purple-50 via-indigo-50/30 to-blue-50/20',
    border: 'border-indigo-200',
    btn: 'from-indigo-500 via-purple-500 to-pink-500',
    btnBorder: 'border-indigo-700',
    itemBg: 'bg-indigo-50',
    accentText: 'text-indigo-600'
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 px-1 max-h-[82vh]">
      {/* Scrollable Container Poster */}
      <div className={`relative w-full rounded-[2.5rem] bg-gradient-to-b ${style.cardBg} border-4 border-white shadow-2xl overflow-hidden flex flex-col`}>
        
        {/* Banner strip */}
        <div className={`w-full py-3 px-5 bg-gradient-to-r ${style.bg} text-white flex-shrink-0`}>
          <h2 className="text-sm sm:text-base font-black tracking-wide" style={{ fontFamily: '"Noto Sans Tamil", serif' }}>
            {question.boardTitle || 'உயிர்மெய் அட்டவணை'}
          </h2>
          <p className="text-[10px] font-bold opacity-90">{question.boardSubtitle || 'Uyirmei Combination Poster'}</p>
        </div>

        {/* Scrollable Poster board grid */}
        <div className="p-4 overflow-y-auto max-h-[50vh] scrollbar-thin">
          <div className="grid grid-cols-3 gap-2.5">
            {combos.map((combo, idx) => (
              <div
                key={idx}
                className="relative flex flex-col items-center bg-white border border-slate-100 rounded-xl p-2 shadow-sm hover:scale-105 transition-transform"
              >
                {/* Consonant in small badge */}
                <span className="text-[9px] font-black text-slate-400 select-none">
                  {combo.consonant} + {combo.vowel}
                </span>

                {/* Arrow indicator */}
                <div className="text-[9px] text-slate-300 font-extrabold my-0.5 select-none">⬇</div>

                {/* Big Result Letter */}
                <div className={`flex items-center justify-center w-11 h-11 rounded-lg ${style.itemBg} shadow-inner`}>
                  <span
                    className={`text-2xl font-black ${style.accentText}`}
                    style={{ fontFamily: '"Noto Sans Tamil", "Latha", serif' }}
                  >
                    {combo.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hint footer */}
        <div className="mx-4 mb-4 mt-2 rounded-xl bg-white/80 px-4 py-2 border border-white/95 text-center flex-shrink-0">
          <p className="text-[10px] font-bold text-slate-500">
            👀 அட்டவணையை முழுமையாகப் படித்துப் பழகுக! (Review the whole board!)
          </p>
        </div>
      </div>

      {/* Start Practice button directly underneath */}
      <button
        onClick={() => onAnswer({ text: 'ready', correct: true })}
        className={`w-full py-3 sm:py-4 rounded-2xl bg-gradient-to-r ${style.btn} text-white font-black text-sm sm:text-base shadow-md border-b-4 ${style.btnBorder} active:scale-95 active:border-b-2 transition-all duration-150`}
      >
        🎯 பயிற்சி தொடங்குவோம்! (Start Practice!)
      </button>
    </div>
  );
}

/* ==========================================================================
   TAMIL LETTER BOARD — shows all letters on ONE card, then starts tracing
   ========================================================================== */
function TamilLetterBoard({ question, onAnswer }: { question: any; onAnswer: (opt: any) => void }) {
  const letters: string[] = question.letters || [];
  const isVowels = question.boardTitle?.includes('உயிர்');

  // Two palette themes: cyan-blue for vowels, purple-pink for consonants
  const theme = isVowels
    ? { outer: 'from-cyan-400 to-blue-500', card: 'from-cyan-50 via-sky-50 to-blue-50', badge: 'bg-cyan-100 text-cyan-800', chip: 'bg-white border-cyan-200 text-cyan-900 shadow-cyan-100', chipHover: 'hover:bg-cyan-50', btn: 'from-cyan-500 to-blue-600', btnBorder: 'border-cyan-700', counter: 'text-cyan-600' }
    : { outer: 'from-purple-400 to-pink-500', card: 'from-purple-50 via-fuchsia-50 to-pink-50', badge: 'bg-purple-100 text-purple-800', chip: 'bg-white border-purple-200 text-purple-900 shadow-purple-100', chipHover: 'hover:bg-purple-50', btn: 'from-purple-500 to-pink-600', btnBorder: 'border-purple-700', counter: 'text-purple-600' };

  return (
    <div className="w-full flex flex-col items-center gap-4 px-1">
      {/* Board Card */}
      <div className={`relative w-full rounded-[2rem] bg-gradient-to-br ${theme.card} border-4 border-white shadow-2xl overflow-hidden`}>
        {/* Gradient top bar */}
        <div className={`w-full h-2 bg-gradient-to-r ${theme.outer}`} />

        {/* Header */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-800 leading-tight" style={{ fontFamily: '"Noto Sans Tamil", serif' }}>
              {question.boardTitle}
            </h2>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">{question.boardSubtitle}</p>
          </div>
          <span className={`text-xs font-black px-3 py-1.5 rounded-full ${theme.badge} uppercase tracking-wider`}>
            {letters.length} எழுத்து
          </span>
        </div>

        {/* Letter grid */}
        <div className="px-4 pb-5">
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
            {letters.map((letter, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-center rounded-2xl border-2 ${theme.chip} ${theme.chipHover} shadow-sm aspect-square transition-transform hover:scale-105 select-none`}
              >
                <span
                  className="text-2xl sm:text-3xl font-black leading-none"
                  style={{ fontFamily: '"Noto Sans Tamil", "Latha", serif' }}
                >
                  {letter}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hint strip */}
        <div className="mx-4 mb-4 rounded-xl bg-white/60 px-4 py-2.5 text-center border border-white/80">
          <p className="text-xs sm:text-sm font-bold text-slate-500">
            👀 எல்லா எழுத்துக்களையும் பார்த்து நினைவு வை! &nbsp;&middot;&nbsp; Look and remember all letters!
          </p>
        </div>
      </div>

      {/* Start Tracing CTA */}
      <button
        onClick={() => onAnswer({ text: 'ready', correct: true })}
        className={`w-full py-3 sm:py-4 rounded-2xl bg-gradient-to-r ${theme.btn} text-white font-black text-sm sm:text-base shadow-md border-b-4 ${theme.btnBorder} active:scale-95 active:border-b-2 transition-all duration-150 flex items-center justify-center gap-2`}
      >
        <span>✍️</span>
        <span>எழுதலாம்! — Start Tracing!</span>
      </button>

    </div>
  );
}

/* ==========================================================================
   TAMIL LETTER SHOWCASE → TRACE COMPONENT
   Phase 1: Big beautiful letter card
   Phase 2: Drawing canvas (SimpleTraceCanvas)
   ========================================================================== */
function TamilLetterShowcaseAndTrace({ letter, instructionTa, onComplete }: { letter: string; instructionTa?: string; onComplete: () => void }) {
  const [phase, setPhase] = useState<'showcase' | 'trace'>('showcase');

  // Gradient palette cycles through vibrant colours
  const palettes = [
    { bg: 'from-purple-400 via-pink-400 to-rose-400', card: 'from-purple-50 to-pink-50', ring: 'ring-purple-300', btn: 'from-purple-500 to-pink-500', border: 'border-purple-600', dot: 'bg-purple-200' },
    { bg: 'from-cyan-400 via-teal-400 to-emerald-400', card: 'from-cyan-50 to-teal-50', ring: 'ring-cyan-300', btn: 'from-cyan-500 to-teal-500', border: 'border-teal-600', dot: 'bg-cyan-200' },
    { bg: 'from-amber-400 via-orange-400 to-red-400', card: 'from-amber-50 to-orange-50', ring: 'ring-amber-300', btn: 'from-amber-500 to-orange-500', border: 'border-orange-600', dot: 'bg-amber-200' },
    { bg: 'from-indigo-400 via-blue-400 to-sky-400', card: 'from-indigo-50 to-blue-50', ring: 'ring-indigo-300', btn: 'from-indigo-500 to-blue-500', border: 'border-indigo-600', dot: 'bg-indigo-200' },
    { bg: 'from-rose-400 via-fuchsia-400 to-violet-400', card: 'from-rose-50 to-fuchsia-50', ring: 'ring-rose-300', btn: 'from-rose-500 to-fuchsia-500', border: 'border-rose-600', dot: 'bg-rose-200' },
  ];
  // Pick palette based on letter char code for consistency
  const palette = palettes[letter.charCodeAt(0) % palettes.length];

  if (phase === 'trace') {
    return (
      <div className="w-full flex flex-col items-center gap-4">
        <div className={`w-full px-3 py-2 rounded-2xl bg-gradient-to-r ${palette.bg} text-white text-center`}>
          <span className="text-lg font-black tracking-wide">எழுதுக: {letter} ✍️</span>
        </div>
        <SimpleTraceCanvas letter={letter} onComplete={onComplete} />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-5 px-1">
      {/* Showcase Card */}
      <div className={`relative w-full bg-gradient-to-br ${palette.card} border-4 border-white ring-4 ${palette.ring} rounded-[2.5rem] shadow-2xl overflow-hidden`}>
        {/* Decorative blobs */}
        <div className={`absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-30 bg-gradient-to-br ${palette.bg} blur-2xl pointer-events-none`} />
        <div className={`absolute -bottom-8 -left-8 w-28 h-28 rounded-full opacity-20 bg-gradient-to-br ${palette.bg} blur-xl pointer-events-none`} />

        {/* Top badge */}
        <div className="flex justify-center pt-5">
          <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm text-xs font-black uppercase tracking-widest text-slate-700 shadow-sm`}>
            ✨ தமிழ் எழுத்து
          </span>
        </div>

        {/* Giant Letter */}
        <div className="flex items-center justify-center py-6 sm:py-8">
          <div
            className={`relative flex items-center justify-center w-44 h-44 sm:w-56 sm:h-56 rounded-[2rem] bg-white shadow-xl ring-4 ${palette.ring} select-none`}
            style={{ fontFamily: '"Noto Sans Tamil", "Latha", serif' }}
          >
            {/* Dot decorations */}
            <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${palette.dot} opacity-80`} />
            <div className={`absolute bottom-3 left-3 w-2 h-2 rounded-full ${palette.dot} opacity-60`} />
            <span
              className="text-[7rem] sm:text-[9rem] font-black leading-none"
              style={{
                background: `linear-gradient(135deg, #1e293b 0%, #334155 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))'
              }}
            >
              {letter}
            </span>
          </div>
        </div>

        {/* Tamil label */}
        {instructionTa && (
          <div className="px-6 pb-2 text-center">
            <p className="text-sm sm:text-base font-bold text-slate-600" style={{ fontFamily: '"Noto Sans Tamil", serif' }}>
              {instructionTa}
            </p>
          </div>
        )}

        {/* Fun fact strip */}
        <div className={`mx-4 mb-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 py-3 px-4 text-center`}>
          <p className="text-xs sm:text-sm font-bold text-slate-500">
            👆 Look carefully at the shape! Then trace it with your finger.
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => setPhase('trace')}
        className={`w-full py-5 rounded-[1.5rem] bg-gradient-to-r ${palette.btn} text-white font-black text-xl sm:text-2xl shadow-lg border-b-4 ${palette.border} active:scale-95 active:border-b-2 transition-all duration-150 flex items-center justify-center gap-3`}
      >
        <span>✍️</span>
        <span>எழுதலாம்!</span>
        <span className="text-base opacity-80">(Let's Trace!)</span>
      </button>
    </div>
  );
}

export function Grade1EnglishActivityPlayer({ lessonId, onComplete }: { lessonId: string; onComplete: (data: any) => void }) {
  const levelNum = GRADE1_LESSON_LEVEL_NUM[lessonId] || 1;
  const isMath = GRADE1_MATH_LESSON_IDS.has(lessonId);
  const isTamil = GRADE1_TAMIL_LESSON_IDS.has(lessonId);
  const levelsSource = isTamil ? GRADE1_TAMIL_LEVELS : (isMath ? GRADE1_MATH_LEVELS : GRADE1_ENGLISH_LEVELS);
  const levelData = levelsSource.find((l) => l.id === levelNum) || levelsSource[0];
  
  const [qIndex, setQIndex] = useState(0);
  const [scores, setScores] = useState<boolean[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<any | null>(null);

  const currentQuestion = levelData.questions[qIndex];

  const handleNext = () => {
    setSelectedAnswer(null);
    if (qIndex + 1 < levelData.questions.length) {
      setQIndex(qIndex + 1);
    } else {
      const correctCount = scores.filter(Boolean).length;
      onComplete({
        score: correctCount,
        max_score: levelData.questions.length,
        completion_data: { completed_all: true },
        time_taken_seconds: 60
      });
    }
  };

  const handleAnswer = (opt: any) => {
    if (selectedAnswer !== null) return;
    
    if (opt.text === 'ready') {
      setScores((prev) => [...prev, true]);
      setSelectedAnswer(null);
      if (qIndex + 1 < levelData.questions.length) {
        setQIndex(qIndex + 1);
      }
      return;
    }

    setSelectedAnswer(opt);
    setScores((prev) => [...prev, opt.correct]);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg mx-auto font-sans px-3 py-3">
      {/* Quiz Progress header */}
      <div className="w-full flex items-center justify-between px-1">
        <span className="text-sm font-black text-slate-700">
          {qIndex + 1} / {levelData.questions.length}
        </span>
        <div className="flex gap-1 flex-wrap justify-end max-w-[70%]">
          {levelData.questions.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all
                ${i === qIndex ? 'bg-amber-400 scale-125 ring-2 ring-amber-300' : i < scores.length ? scores[i] ? 'bg-emerald-500' : 'bg-rose-500' : 'bg-slate-200'}`}
            />
          ))}
        </div>
      </div>

      {/* Instruction — hidden for trace, letter_board, and combo_chart (they have their own headers) */}
      {currentQuestion.type !== 'trace' && currentQuestion.type !== 'letter_board' && currentQuestion.type !== 'combo_chart' && (
        <div className="w-full text-center px-4 py-2.5 bg-amber-50 border-2 border-amber-200 rounded-[1.5rem] shadow-sm">
          <p className="text-sm sm:text-base font-extrabold text-[#78350f] m-0 leading-snug">
            {currentQuestion.instruction}
          </p>
        </div>
      )}

      {/* Embedded interactive game renderers */}
      <div className="w-full flex items-center justify-center">
        {currentQuestion.type === 'combo_chart' && (
          <TamilComboChart key={qIndex} question={currentQuestion} onAnswer={handleAnswer} />
        )}
        {currentQuestion.type === 'letter_board' && (
          <TamilLetterBoard key={qIndex} question={currentQuestion} onAnswer={handleAnswer} />
        )}
        {currentQuestion.type === 'learn_card' && (
          <Grade1LearnCard key={qIndex} question={currentQuestion} onAnswer={handleAnswer} isMath={isMath} />
        )}
        {currentQuestion.type === 'connect_pairs' && (
          <Grade1ConnectPairs key={qIndex} question={currentQuestion} onAnswer={handleAnswer} isMath={isMath} />
        )}
        {currentQuestion.type === 'grid_search' && (
          <Grade1GridSearch key={qIndex} question={currentQuestion} onAnswer={handleAnswer} />
        )}
        {currentQuestion.type === 'drag_hunt' && (
          <Grade1WordHunt key={qIndex} question={currentQuestion} onAnswer={handleAnswer} />
        )}
        {currentQuestion.type === 'garden_repair' && (
          <Grade1GardenRepair key={qIndex} question={currentQuestion} onAnswer={handleAnswer} isMath={isMath} />
        )}
        {currentQuestion.type === 'sentence_train' && (
          <Grade1SentenceTrain key={qIndex} question={currentQuestion} onAnswer={handleAnswer} isMath={isMath} />
        )}
        {currentQuestion.type === 'story_cave' && (
          <Grade1StoryCave key={qIndex} question={currentQuestion} onAnswer={handleAnswer} />
        )}
        {currentQuestion.type === 'detective_highlight' && (
          <Grade1DetectiveZone key={qIndex} question={currentQuestion} onAnswer={handleAnswer} />
        )}
        {currentQuestion.type === 'trace' && currentQuestion.letter && (
          <SimpleTraceCanvas
            key={qIndex}
            letter={currentQuestion.letter}
            onComplete={() => handleAnswer({ text: 'trace', correct: true })}
          />
        )}
        {currentQuestion.type === 'writing_lab' && (
          <Grade1WritingLab key={qIndex} question={currentQuestion} onAnswer={handleAnswer} />
        )}
      </div>

      {/* Next question trigger */}
      {selectedAnswer !== null && (
        <button
          onClick={handleNext}
          className="w-full py-4 mt-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg border-b-4 border-teal-700 active:scale-95 transition-all"
        >
          {qIndex + 1 < levelData.questions.length ? 'Next Letter! ➡️' : 'Finish! 🎉'}
        </button>
      )}
    </div>
  );
}

// Learn Card Component
export function Grade1LearnCard({ question, onAnswer, isMath }: { question: any; onAnswer: (opt: any) => void; isMath?: boolean }) {
  if (isMath) {
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto mt-2 font-sans px-2">
        <div className="w-full bg-gradient-to-br from-purple-50 to-indigo-50/55 border-4 border-purple-200 rounded-[2.5rem] p-6 shadow-md text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100/40 rounded-full blur-[20px] pointer-events-none" />
          
          <span className="text-sm font-black bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full uppercase tracking-wider select-none">
            Math Arena! 🧮 {question.mascot || '🔢'}
          </span>
          
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-5 mb-2 leading-none">
            {question.conceptTitle}
          </h3>
          
          <p className="text-sm sm:text-base font-bold text-slate-600 leading-relaxed mt-2">
            {question.explanation}
          </p>

          {question.explanationTa && (
            <p className="text-xs sm:text-sm font-medium text-slate-500 italic mt-1.5 leading-relaxed">
              {question.explanationTa}
            </p>
          )}

          {/* Examples Section */}
          {question.examples && question.examples.length > 0 && (
            <div className="mt-6 flex flex-col gap-2 w-full">
              <span className="text-xs font-black text-purple-900/55 uppercase tracking-widest text-left pl-2">
                Examples:
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {question.examples.map((ex: string, idx: number) => (
                  <div key={idx} className="bg-white border-2 border-purple-100 rounded-2xl p-3.5 flex items-center justify-center gap-1.5 shadow-sm min-h-[65px]">
                    {renderVisualValue(ex, isMath)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => onAnswer({ text: 'ready', correct: true })}
          className="w-full py-4 mt-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg border-b-4 border-indigo-700 active:scale-95 active:border-b-0 transition-all uppercase tracking-wider"
        >
          Start Challenge! 🚀
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto mt-2 font-sans px-2">
      <div className="w-full bg-gradient-to-br from-indigo-50/70 to-blue-50/40 border-4 border-indigo-200 rounded-[2.5rem] p-6 shadow-md text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100/55 rounded-full blur-[20px] pointer-events-none" />
        
        <span className="text-sm font-black bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full uppercase tracking-wider select-none">
          Let's Learn! 📖 {question.mascot || '✨'}
        </span>
        
        <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-5 mb-2 leading-none">
          {question.conceptTitle}
        </h3>
        
        <p className="text-sm sm:text-base font-bold text-slate-600 leading-relaxed mt-2">
          {question.explanation}
        </p>

        {question.explanationTa && (
          <p className="text-xs sm:text-sm font-medium text-slate-500 italic mt-1.5 leading-relaxed">
            {question.explanationTa}
          </p>
        )}

        {/* Examples Section */}
        {question.examples && question.examples.length > 0 && (
          <div className="mt-6 flex flex-col gap-2 w-full">
            <span className="text-xs font-black text-indigo-900/55 uppercase tracking-widest text-left pl-2">
              Examples:
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {question.examples.map((ex: string, idx: number) => (
                <div key={idx} className="bg-white border-2 border-indigo-50 rounded-2xl p-3 flex items-center justify-center gap-1.5 shadow-sm">
                  <span className="text-sm sm:text-base font-extrabold text-indigo-950">{ex}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => onAnswer({ text: 'ready', correct: true })}
        className="w-full py-4 mt-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg border-b-4 border-indigo-700 active:scale-95 active:border-b-0 transition-all uppercase tracking-wider"
      >
        I'm Ready! 🚀
      </button>
    </div>
  );
}
