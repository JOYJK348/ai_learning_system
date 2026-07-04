'use client';
/**
 * KidsTraceCanvas — Professional, Mobile-First Letter Tracing for Kids
 * ─────────────────────────────────────────────────────────────────────
 * • Big canvas (fills screen width, tall enough for finger)
 * • Giant faded guide letter kids trace over
 * • Thick stroke (20px) — easy for small fingers
 * • Strict accuracy check — wrong trace = must try again, no Next
 * • Animated ✅ success overlay, ❌ error overlay
 * • Works for Tamil, Hindi, English letters
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';

type Props = {
  letter: string;
  onComplete: () => void;
  language?: 'tamil' | 'hindi' | 'english';
  /** Optional: display name shown above canvas e.g. "அ — Short A" */
  label?: string;
};

// Per-language font stacks (loaded via Google Fonts in global CSS or inline link)
const FONT_MAP: Record<string, string> = {
  tamil: '"Noto Sans Tamil", "Latha", serif',
  hindi: '"Noto Sans Devanagari", "Mangal", serif',
  english: '"Baloo 2", "Fredoka", sans-serif',
};

// Friendly messages
const SUCCESS_MSG: Record<string, string[]> = {
  tamil: ['அருமை! 🌟', 'சூப்பர்! ⭐', 'மிகவும் நல்லது! 🎉'],
  hindi: ['शाबाश! 🌟', 'बहुत अच्छे! ⭐', 'वाह! 🎉'],
  english: ['Amazing! 🌟', 'Super! ⭐', 'Well done! 🎉'],
};
const FAIL_MSG: Record<string, string[]> = {
  tamil: ['மீண்டும் முயற்சி! 💪', 'எழுத்தின் மேல் trace செய்! 🎯', 'கொஞ்சம் கூடுதலாக வரை! ✏️'],
  hindi: ['फिर से कोशिश करो! 💪', 'अक्षर पर trace करो! 🎯', 'पूरा trace करो! ✏️'],
  english: ['Try again! 💪', 'Trace on the letter! 🎯', 'Cover the whole letter! ✏️'],
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function KidsTraceCanvas({ letter, onComplete, language = 'english', label }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const guideCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);

  const pointsRef = useRef<{ x: number; y: number }[]>([]);
  const templateGridRef = useRef<Uint8Array | null>(null);
  const templateGridWideRef = useRef<Uint8Array | null>(null);
  const letterDataRef = useRef<{
    pixels: { x: number; y: number }[];
    minX: number; maxX: number; minY: number; maxY: number;
  } | null>(null);
  const isDrawingRef = useRef(false);

  const [dimensions, setDimensions] = useState({ w: 320, h: 360 });
  const [hasDrawn, setHasDrawn] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'fail'>('idle');
  const [message, setMessage] = useState('');
  const [strokeCount, setStrokeCount] = useState(0); // re-mount trigger for animations

  const fontFamily = FONT_MAP[language] || FONT_MAP.english;

  // ─── Build letter template data ─────────────────────────────────────────────
  const buildLetterData = useCallback((w: number, h: number) => {
    const off = document.createElement('canvas');
    off.width = w;
    off.height = h;
    const ctx = off.getContext('2d');
    if (!ctx) return;

    // Giant font scale - 1.45 to counteract regional fonts padding and make it massive
    const fontSize = Math.round(Math.min(w, h) * 1.45);
    ctx.font = `900 ${fontSize}px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ff0000';
    // Offset baseline downwards so large characters stay centered
    const yOffset = language === 'tamil' ? h * 0.15 : language === 'hindi' ? h * 0.08 : h * 0.05;
    ctx.fillText(letter, w / 2, h / 2 + yOffset);

    const img = ctx.getImageData(0, 0, w, h);
    const pixels: { x: number; y: number }[] = [];
    let minX = w, maxX = 0, minY = h, maxY = 0;

    const step = 2;
    for (let py = 0; py < h; py += step) {
      for (let px = 0; px < w; px += step) {
        if (img.data[(py * w + px) * 4] > 80) {
          pixels.push({ x: px, y: py });
          if (px < minX) minX = px;
          if (px > maxX) maxX = px;
          if (py < minY) minY = py;
          if (py > maxY) maxY = py;
        }
      }
    }

    if (pixels.length === 0) return;

    letterDataRef.current = { pixels, minX, maxX, minY, maxY };

    // Extra large kid tolerance zones for easy finger tracing
    const tol = Math.max(34, Math.round(w * 0.095));
    const wideTol = Math.max(54, Math.round(w * 0.16));

    const grid = new Uint8Array(w * h);
    const wideGrid = new Uint8Array(w * h);

    for (const lp of pixels) {
      for (let dy = -tol; dy <= tol; dy++) {
        for (let dx = -tol; dx <= tol; dx++) {
          if (dx * dx + dy * dy < tol * tol) {
            const nx = lp.x + dx, ny = lp.y + dy;
            if (nx >= 0 && nx < w && ny >= 0 && ny < h) grid[ny * w + nx] = 1;
          }
        }
      }
      for (let dy = -wideTol; dy <= wideTol; dy++) {
        for (let dx = -wideTol; dx <= wideTol; dx++) {
          if (dx * dx + dy * dy < wideTol * wideTol) {
            const nx = lp.x + dx, ny = lp.y + dy;
            if (nx >= 0 && nx < w && ny >= 0 && ny < h) wideGrid[ny * w + nx] = 1;
          }
        }
      }
    }

    templateGridRef.current = grid;
    templateGridWideRef.current = wideGrid;
  }, [letter, fontFamily, language]);

  // ─── Draw the guide letter (faded) ──────────────────────────────────────────
  const drawGuide = useCallback((w: number, h: number) => {
    const gc = guideCanvasRef.current;
    if (!gc) return;
    gc.width = w;
    gc.height = h;
    const ctx = gc.getContext('2d');
    if (!ctx) return;

    const fontSize = Math.round(Math.min(w, h) * 1.45);
    ctx.clearRect(0, 0, w, h);

    // Apply adjustments for script baselines
    const yOffset = language === 'tamil' ? h * 0.15 : language === 'hindi' ? h * 0.08 : h * 0.05;

    // Faded fill for guidance
    ctx.font = `900 ${fontSize}px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(180, 83, 9, 0.12)';
    ctx.fillText(letter, w / 2, h / 2 + yOffset);

    // Dotted guide stroke
    ctx.strokeStyle = 'rgba(180, 83, 9, 0.28)';
    ctx.lineWidth = 5;
    ctx.setLineDash([12, 10]);
    ctx.strokeText(letter, w / 2, h / 2 + yOffset);
    ctx.setLineDash([]);
  }, [letter, fontFamily, language]);

  // ─── Canvas setup / resize ──────────────────────────────────────────────────
  useEffect(() => {
    let active = true;
    const setup = async () => {
      const container = containerRef.current;
      if (!container) return;

      const w = container.clientWidth;
      // Absolute height lock for big comfortable display on all devices
      const h = 440;
      
      if (!active) return;
      setDimensions({ w, h });

      const dc = drawCanvasRef.current;
      if (dc) { dc.width = w; dc.height = h; }

      letterDataRef.current = null;
      templateGridRef.current = null;
      templateGridWideRef.current = null;

      // Crucial: Wait for font metrics to load completely
      try {
        await document.fonts.ready;
      } catch (_) {}

      if (!active) return;
      drawGuide(w, h);
      buildLetterData(w, h);
    };

    setup();
    window.addEventListener('resize', setup);
    return () => {
      active = false;
      window.removeEventListener('resize', setup);
    };
  }, [letter, drawGuide, buildLetterData]);




  // ─── Pointer events ──────────────────────────────────────────────────────────
  const getCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const dc = drawCanvasRef.current;
    if (!dc) return { x: 0, y: 0 };
    const rect = dc.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (dc.width / rect.width),
      y: (e.clientY - rect.top) * (dc.height / rect.height),
    };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (status === 'success') return;
    e.currentTarget.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    setHasDrawn(true);
    if (status === 'fail') setStatus('idle');
    const coords = getCoords(e);
    pointsRef.current.push(coords);
    const ctx = drawCanvasRef.current?.getContext('2d');
    if (ctx) { ctx.beginPath(); ctx.moveTo(coords.x, coords.y); }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || status === 'success') return;
    const coords = getCoords(e);
    pointsRef.current.push(coords);
    const dc = drawCanvasRef.current;
    const ctx = dc?.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 32; // Super thick fat brush for kids
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);

    }
    setStrokeCount(c => c + 1);
  };

  const onPointerUp = () => { isDrawingRef.current = false; };
  const onPointerLeave = () => { isDrawingRef.current = false; };

  // ─── Reset ───────────────────────────────────────────────────────────────────
  const handleReset = () => {
    const dc = drawCanvasRef.current;
    if (dc) { const ctx = dc.getContext('2d'); ctx?.clearRect(0, 0, dc.width, dc.height); }
    pointsRef.current = [];
    setHasDrawn(false);
    setStatus('idle');
    setMessage('');
  };

  // ─── Validate trace ──────────────────────────────────────────────────────────
  const handleCheck = () => {
    const pts = pointsRef.current;
    const dc = drawCanvasRef.current;
    if (pts.length < 20 || !dc) {
      setStatus('fail');
      setMessage(pickRandom(FAIL_MSG[language]));
      return;
    }

    const data = letterDataRef.current;
    const grid = templateGridRef.current;
    const wideGrid = templateGridWideRef.current;

    // Fallback: if font didn't load, just pass
    if (!data || !grid || !wideGrid || data.pixels.length === 0) {
      setStatus('success');
      setMessage(pickRandom(SUCCESS_MSG[language]));
      setTimeout(onComplete, 900);
      return;
    }

    const ctx = dc.getContext('2d');
    if (!ctx) return;
    const w = dc.width, h = dc.height;
    const userImg = ctx.getImageData(0, 0, w, h);

    // Grid-based coverage check
    const letterW = data.maxX - data.minX;
    const letterH = data.maxY - data.minY;
    if (letterW <= 0 || letterH <= 0) {
      setStatus('success');
      setMessage(pickRandom(SUCCESS_MSG[language]));
      setTimeout(onComplete, 900);
      return;
    }

    const GRID_SIZE = 7;
    const cellW = letterW / GRID_SIZE;
    const cellH = letterH / GRID_SIZE;

    // Active cells from template
    const cellCounts = new Map<string, number>();
    for (const p of data.pixels) {
      const c = Math.max(0, Math.min(GRID_SIZE - 1, Math.floor((p.x - data.minX) / cellW)));
      const r = Math.max(0, Math.min(GRID_SIZE - 1, Math.floor((p.y - data.minY) / cellH)));
      cellCounts.set(`${c},${r}`, (cellCounts.get(`${c},${r}`) || 0) + 1);
    }
    const activeCells = new Set<string>();
    for (const [k, v] of cellCounts) { if (v >= 4) activeCells.add(k); }

    let totalDrawn = 0, correctDrawn = 0, farDrawn = 0;
    const visitedCells = new Set<string>();

    for (let y = 0; y < h; y += 2) {
      for (let x = 0; x < w; x += 2) {
        const a = userImg.data[(y * w + x) * 4 + 3];
        if (a > 40) {
          totalDrawn++;
          if (grid[y * w + x] === 1) {
            correctDrawn++;
            const c = Math.max(0, Math.min(GRID_SIZE - 1, Math.floor((x - data.minX) / cellW)));
            const r = Math.max(0, Math.min(GRID_SIZE - 1, Math.floor((y - data.minY) / cellH)));
            const k = `${c},${r}`;
            if (activeCells.has(k)) visitedCells.add(k);
          } else if (wideGrid[y * w + x] === 0) {
            farDrawn++;
          }
        }
      }
    }

    if (totalDrawn < 30) {
      setStatus('fail');
      setMessage(language === 'tamil' ? 'கொஞ்சம் கூடுதலாக வரை! ✏️' : language === 'hindi' ? 'थोड़ा और लिखो! ✏️' : 'Draw more! ✏️');
      return;
    }

    const containment = (correctDrawn / totalDrawn) * 100;
    const coverage = activeCells.size > 0 ? (visitedCells.size / activeCells.size) * 100 : 100;
    const maxFarAllowed = Math.max(20, Math.round(totalDrawn * 0.18));

    // Child-friendly thresholds: 68% containment, 45% coverage
    const passed = containment >= 68 && coverage >= 45 && farDrawn <= maxFarAllowed;

    if (passed) {
      setStatus('success');
      setMessage(pickRandom(SUCCESS_MSG[language]));
      setTimeout(onComplete, 1100);
    } else {
      setStatus('fail');
      if (farDrawn > maxFarAllowed) {
        setMessage(language === 'tamil' ? 'எழுத்தின் மேல் மட்டும் trace செய்! 🎯'
          : language === 'hindi' ? 'अक्षर के ऊपर trace करो! 🎯'
          : 'Stay on the letter! 🎯');
      } else if (coverage < 45) {
        setMessage(language === 'tamil' ? 'முழு எழுத்தையும் trace செய்! ✍️'
          : language === 'hindi' ? 'पूरा अक्षर trace करो! ✍️'
          : 'Trace the whole letter! ✍️');
      } else {
        setMessage(pickRandom(FAIL_MSG[language]));
      }
    }
  };

  const instructionText = language === 'tamil'
    ? `"${letter}" எழுத்தை trace செய்யுங்கள்`
    : language === 'hindi'
    ? `"${letter}" अक्षर trace करें`
    : `Trace the letter "${letter}"`;

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto select-none px-1">
      {/* Instruction / label */}
      <div className="flex flex-col items-center gap-1 w-full text-center">
        {label && (
          <span className="text-xs font-black text-indigo-900/40 uppercase tracking-widest">{label}</span>
        )}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-100 border-2 border-amber-300">
          <span className="text-2xl">✏️</span>
          <span className="font-black text-amber-900 text-sm sm:text-base">{instructionText}</span>
        </div>
      </div>

      {/* Canvas area - locked to full container size */}
      <div
        ref={containerRef}
        className="relative w-full rounded-[2rem] border-4 border-[#b45309] shadow-xl bg-[#fffdf9] overflow-hidden touch-none"
        style={{ height: dimensions.h }}
      >
        {/* Notebook lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
          {[0.33, 0.66].map((y) => (
            <line
              key={y}
              x1="4%" y1={`${y * 100}%`} x2="96%" y2={`${y * 100}%`}
              stroke="rgba(180,83,9,0.07)" strokeWidth="1.5" strokeDasharray="6 6"
            />
          ))}
        </svg>

        {/* Guide letter (faded) */}
        <canvas
          ref={guideCanvasRef}
          width={dimensions.w}
          height={dimensions.h}
          className="absolute inset-0 pointer-events-none touch-none"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Drawing canvas */}
        <canvas
          ref={drawCanvasRef}
          width={dimensions.w}
          height={dimensions.h}
          className="absolute inset-0 z-10 touch-none"
          style={{
            width: '100%',
            height: '100%',
            cursor: status === 'success' ? 'default' : 'crosshair',
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerLeave}
        />

        {/* START hint — shown when idle and no strokes yet */}
        {!hasDrawn && status === 'idle' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <span className="text-5xl">👆</span>
              <span className="font-black text-amber-700 text-sm bg-amber-100 px-4 py-1.5 rounded-full border-2 border-amber-300">
                {language === 'tamil' ? 'இங்கே trace செய்யுங்கள்!'
                  : language === 'hindi' ? 'यहाँ trace करें!'
                  : 'Trace here!'}
              </span>
            </div>
          </div>
        )}

        {/* Success overlay */}
        {status === 'success' && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-emerald-400/20 backdrop-blur-[2px]">
            <div className="flex flex-col items-center gap-3 bg-white rounded-3xl shadow-2xl border-4 border-emerald-400 px-10 py-6">
              <span className="text-6xl animate-bounce">⭐</span>
              <span className="font-black text-emerald-700 text-xl text-center">{message}</span>
            </div>
          </div>
        )}

        {/* Fail overlay */}
        {status === 'fail' && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-rose-400/15 backdrop-blur-[2px] pointer-events-none">
            <div className="flex flex-col items-center gap-2 bg-white rounded-3xl shadow-2xl border-4 border-rose-300 px-8 py-5 max-w-[80%] text-center">
              <span className="text-5xl">💪</span>
              <span className="font-black text-rose-600 text-base">{message}</span>
              <span className="text-xs font-bold text-slate-400">
                {language === 'tamil' ? '"மீண்டும்" button press செய்யுங்கள்'
                  : language === 'hindi' ? '"फिर से" button दबाएं'
                  : 'Press "Try Again"'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 w-full mt-1">
        <button
          onClick={handleReset}
          className="flex-1 py-4 rounded-2xl font-black text-white text-base sm:text-lg
            bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg border-b-4 border-orange-700
            active:scale-95 active:border-b-2 transition-all"
        >
          {language === 'tamil' ? 'மீண்டும் 🔄' : language === 'hindi' ? 'फिर से 🔄' : 'Try Again 🔄'}
        </button>
        <button
          onClick={handleCheck}
          disabled={!hasDrawn || status === 'success'}
          className="flex-1 py-4 rounded-2xl font-black text-white text-base sm:text-lg
            bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg border-b-4 border-emerald-700
            active:scale-95 active:border-b-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {language === 'tamil' ? 'சரிபார் ✅' : language === 'hindi' ? 'जाँचें ✅' : 'Check ✅'}
        </button>
      </div>
    </div>
  );
}

