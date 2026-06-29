'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

import { 
  Trophy, Star, Play, Lock, CheckCircle2, ArrowLeft, RotateCcw, 
  HelpCircle, Calendar, Target, Award, Cloud, Gamepad2, ChevronRight, X
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useData } from '@/context/DataContext';
import { useQueryClient } from '@tanstack/react-query';
import { studentApi, studentKeys } from '@/core/services/studentApi';
import QuizEngine from '../_components/QuizEngine';
import TraceActivity from '../_components/activities/TraceActivity';
import { SoundMatchGame, TrueOrFalseGame, SequenceGame, MemoryMatchGame } from '../_components/GameActivities';

// ─── QUESTIONS & LEVELS DATA ───

import {
  Option,
  Question,
  Level,
  TAMIL_LEVELS,
  ENGLISH_LEVELS,
  EVS_LEVELS,
  MATH_LEVELS,
  GK_LEVELS,
  HINDI_LEVELS
} from './quizData';

// ─── HELPERS ───

function FamilyMedia({ emojiOrPath, className = "w-10 h-10 object-contain" }: { emojiOrPath: string; className?: string }) {
  const images: Record<string, string> = {
    '👩': '/assets/quiz/family-mother.png',
    '👨': '/assets/quiz/family-father.png',
    '👧': '/assets/quiz/family-sister.png',
    '👦': '/assets/quiz/family-brother.png',
    '👵': '/assets/quiz/family-grandma.png',
    '👴': '/assets/quiz/family-grandpa.png',
  };
  const src = images[emojiOrPath] || (emojiOrPath.startsWith('/') ? emojiOrPath : null);
  if (src) {
    return <img src={src} className={className} alt="media" />;
  }

  const name = emojiOrPath.toLowerCase();
  if (name === 'apple') {
    return (
      <div className={className}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M50 30 C40 10, 15 20, 20 50 C25 80, 45 85, 50 85 C55 85, 75 80, 80 50 C85 20, 60 10, 50 30 Z" fill="#ef4444" />
          <path d="M50 30 Q55 15, 65 12 Q68 18, 55 28 Z" fill="#22c55e" />
          <path d="M50 30 Q48 20, 50 10" stroke="#78350f" strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    );
  }
  if (name === 'elephant') {
    return (
      <div className={className}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="25" y="45" width="50" height="35" rx="15" fill="#94a3b8" />
          <circle cx="35" cy="40" r="22" fill="#94a3b8" />
          <circle cx="28" cy="18" r="8" fill="#e2e8f0" />
          <path d="M 28 26 C 26 34, 18 36, 12 30" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" fill="none" />
          <rect x="35" y="70" width="10" height="20" rx="3" fill="#64748b" />
          <rect x="55" y="70" width="10" height="20" rx="3" fill="#64748b" />
          <circle cx="28" cy="35" r="3" fill="#0f172a" />
        </svg>
      </div>
    );
  }
  if (name === 'cat') {
    return (
      <div className={className}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="55" r="30" fill="#f97316" />
          <polygon points="25,35 30,10 45,30" fill="#f97316" />
          <polygon points="75,35 70,10 55,30" fill="#f97316" />
          <circle cx="40" cy="50" r="4" fill="#000" />
          <circle cx="60" cy="50" r="4" fill="#000" />
          <polygon points="46,58 54,58 50,64" fill="#f43f5e" />
          <path d="M 45 68 Q 50 72, 55 68" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    );
  }
  if (name === 'dog') {
    return (
      <div className={className}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="55" r="32" fill="#d97706" />
          <path d="M20 30 C15 45, 22 65, 25 70" stroke="#92400e" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M80 30 C85 45, 78 65, 75 70" stroke="#92400e" strokeWidth="12" strokeLinecap="round" fill="none" />
          <circle cx="38" cy="50" r="4" fill="#000" />
          <circle cx="62" cy="50" r="4" fill="#000" />
          <ellipse cx="50" cy="62" rx="7" ry="5" fill="#000" />
        </svg>
      </div>
    );
  }
  if (name === 'fish') {
    return (
      <div className={className}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 15 50 C 35 25, 75 25, 85 50 C 75 75, 35 75, 15 50 Z" fill="#f97316" />
          <polygon points="15,50 2,35 5,65" fill="#ea580c" />
          <circle cx="68" cy="45" r="4" fill="#fff" />
          <circle cx="69" cy="45" r="2" fill="#000" />
          <path d="M 75 54 Q 70 58, 65 54" stroke="#ea580c" strokeWidth="3" fill="none" />
        </svg>
      </div>
    );
  }
  if (name === 'nest') {
    return (
      <div className={className}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <ellipse cx="50" cy="65" rx="35" ry="20" fill="#78350f" />
          <ellipse cx="50" cy="60" rx="30" ry="15" fill="#451a03" />
          <ellipse cx="40" cy="52" rx="10" ry="14" fill="#e2e8f0" />
          <ellipse cx="60" cy="52" rx="10" ry="14" fill="#e2e8f0" />
          <path d="M20 60 Q50 85, 80 60 M15 65 Q50 90, 85 65" stroke="#9a3412" strokeWidth="4" fill="none" />
        </svg>
      </div>
    );
  }
  if (name === 'sun') {
    return (
      <div className={className}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="28" fill="#eab308" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
            <line
              key={idx}
              x1="50"
              y1="10"
              x2="50"
              y2="20"
              stroke="#eab308"
              strokeWidth="6"
              strokeLinecap="round"
              transform={`rotate(${angle} 50 50)`}
            />
          ))}
          <circle cx="42" cy="45" r="3" fill="#000" />
          <circle cx="58" cy="45" r="3" fill="#000" />
          <path d="M 40 58 Q 50 68, 60 58" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    );
  }
  if (name === 'umbrella') {
    return (
      <div className={className}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 15 50 C 15 20, 85 20, 85 50 Z" fill="#ef4444" />
          <path d="M 15 50 Q 50 58, 85 50" stroke="#b91c1c" strokeWidth="4" fill="none" />
          <path d="M 50 50 L 50 78 A 8 8 0 0 1 38 84" stroke="#475569" strokeWidth="5" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    );
  }
  if (name === 'zebra') {
    return (
      <div className={className}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="55" r="32" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
          <polygon points="30,35 25,12 40,25" fill="#0f172a" />
          <polygon points="70,35 75,12 60,25" fill="#0f172a" />
          <path d="M 22 50 L 38 50 M 20 60 L 40 60 M 78 50 L 62 50 M 80 60 L 60 60" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
          <circle cx="40" cy="48" r="4" fill="#000" />
          <circle cx="60" cy="48" r="4" fill="#000" />
          <ellipse cx="50" cy="65" rx="14" ry="10" fill="#cbd5e1" />
        </svg>
      </div>
    );
  }
  if (name === 'ball') {
    return (
      <div className={className}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="35" fill="#3b82f6" />
          <circle cx="50" cy="50" r="35" stroke="#1d4ed8" strokeWidth="4" fill="none" />
          <path d="M 20 30 Q 50 60, 80 30" stroke="#fff" strokeWidth="4" fill="none" strokeDasharray="4 2" />
          <path d="M 20 70 Q 50 40, 80 70" stroke="#fff" strokeWidth="4" fill="none" strokeDasharray="4 2" />
        </svg>
      </div>
    );
  }

  return <span className={className.includes('w-') ? 'text-4xl select-none flex items-center justify-center' : ''}>{emojiOrPath}</span>;
}

// ─── TRACE CANVAS (CREAM BOARD STYLE) ───

function SimpleTraceCanvas({ letter, onComplete }: { letter: string; onComplete: () => void }) {
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

  const isTamil = letter ? letter.charCodeAt(0) >= 0x0B80 && letter.charCodeAt(0) <= 0x0BFF : false;
  const isHindi = letter ? letter.charCodeAt(0) >= 0x0900 && letter.charCodeAt(0) <= 0x097F : false;
  const fontName = isTamil 
    ? '"Noto Sans Tamil", "Latha", sans-serif' 
    : isHindi 
      ? '"Arial", sans-serif' 
      : '"Baloo 2", "Fredoka", sans-serif';

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
      const w = canvas.parentElement?.clientWidth || 300;
      const h = 280;
      setDimensions({ w, h });

      canvas.width = w;
      canvas.height = h;

      letterDataRef.current = null;
      templateGridRef.current = null;
      templateGridWideRef.current = null;
      clustersRef.current = [];

      try {
        if (isTamil) {
          await document.fonts.load(`900 ${Math.round(w * 0.45)}px "Noto Sans Tamil"`);
        } else if (isHindi) {
          // No special web font to load; Arial is standard
        } else {
          await document.fonts.load(`900 ${Math.round(w * 0.45)}px "Baloo 2"`);
        }
      } catch (_) {}

      drawGuide(w, h);
      buildLetterData(w, h);
    };

    setup();
    window.addEventListener('resize', setup);
    return () => window.removeEventListener('resize', setup);
  }, [letter, drawGuide, buildLetterData, isTamil, isHindi]);

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
      ctx.strokeStyle = '#b45309'; // Cream board dark brown stroke
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
      setFailMsg(isTamil ? 'எழுதிப் பழகுங்கள்! ✏️' : isHindi ? 'अक्षर को ट्रेस करें! ✏️' : 'Please draw! ✏️');
      return;
    }

    const data = letterDataRef.current;
    const grid = templateGridRef.current;
    const wideGrid = templateGridWideRef.current;
    if (!data || !grid || !wideGrid || data.pixels.length === 0) {
      onComplete(); // fallback if sampling fails
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

    // Scan user drawn pixels on canvas (step by 2 for performance)
    for (let y = 0; y < h; y += 2) {
      for (let x = 0; x < w; x += 2) {
        const idx = (y * w + x) * 4;
        const alpha = userImg.data[idx + 3];
        if (alpha > 40) { // pixel is drawn
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
      onComplete();
    } else if (containment < 75 || farDrawn > maxFarDrawn) {
      setFailMsg(isTamil ? 'எழுத்தின் மேல் மட்டும் எழுதவும்! 🎯' : isHindi ? 'अक्षर के ऊपर ही लिखें! 🎯' : 'Trace on the letter only! 🎯');
    } else {
      setFailMsg(isTamil ? 'முழு எழுத்தையும் சரியாக எழுதவும்! ✍️' : isHindi ? 'पूरे अक्षर को ट्रेस करें! ✍️' : 'Trace the whole letter correctly! ✍️');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Cream Slate Board */}
      <div className="relative w-full h-[280px] rounded-[2rem] border-4 border-[#b45309] shadow-inner bg-[#fffdf9] overflow-hidden touch-none">
        {/* Guide Letter Canvas */}
        <canvas
          ref={guideCanvasRef}
          className="absolute inset-0 pointer-events-none touch-none w-full h-full"
        />
        {/* Drawing Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 cursor-crosshair touch-none w-full h-full z-10"
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
        />

        {/* Fail overlay */}
        
          {failMsg && (
            <div
              key="fail"
              
              
              
              className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            >
              <div className="bg-[#fffdf9]/95 text-rose-600 border-2 border-rose-200 rounded-xl px-5 py-3 text-sm font-black shadow-xl text-center max-w-[280px]">
                <p className="mb-0.5">❌ {failMsg}</p>
                <p className="text-[11px] text-amber-800">
                  {isTamil ? 'மீண்டும் 🔄 button press பண்ணி try பண்ணுங்கள்' : 'Press Try Again 🔄 button to try again'}
                </p>
              </div>
            </div>
          )}
        
      </div>
      <div className="flex gap-4 w-full max-w-xs justify-center font-sans">
        <button
          onClick={handleReset}
          className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow active:scale-95 transition-all text-sm"
        >
          {isTamil ? 'மீண்டும் 🔄' : 'Try Again 🔄'}
        </button>
        <button
          onClick={handleFinish}
          disabled={!hasDrawn}
          className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow active:scale-95 transition-all text-sm disabled:opacity-40"
        >
          {isTamil ? 'முடிந்தது! ✅' : 'Done! ✅'}
        </button>
      </div>
    </div>
  );
}

function CountBubble({ emoji }: { emoji: string }) {
  const [tapped, setTapped] = useState(false);
  
  useEffect(() => {
    setTapped(false);
  }, [emoji]);

  return (
    <button
      
      onClick={() => setTapped(t => !t)}
      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3.5xl border-2 shadow-md relative transition-all
        ${tapped 
          ? 'bg-emerald-100 border-emerald-450 scale-105' 
          : 'bg-white border-amber-200'}`}
    >
      <span className="drop-shadow-sm">{emoji}</span>
      {tapped && (
        <div className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[8px] font-black rounded-full w-5 h-5 flex items-center justify-center border border-white">
          ✓
        </div>
      )}
    </button>
  );
}

// ─── MAIN PORTAL ARENA ───

export default function QuizArena() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const queryClient = useQueryClient();

  const { subjects, studentProfile, studentDashboard } = useData();
  const [mounted, setMounted] = useState(false);
  
  // Views: 'dashboard' | 'levels' | 'quiz_player' | 'score_card'
  const [view, setView] = useState<'dashboard' | 'levels' | 'quiz_player' | 'score_card'>('dashboard');
  
  // Overlays (For other subjects)
  const [activeQuiz, setActiveQuiz] = useState<any | null>(null);
  const [activeGame, setActiveGame] = useState<string | null>(null);

  // Subject Quiz Levels state
  const [activeSubject, setActiveSubject] = useState<'tamil' | 'english' | 'math' | 'evs' | 'gk' | 'hindi'>('tamil');
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [levelScores, setLevelScores] = useState<Record<number, number>>({});
  
  // Quiz Player state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [selectedOptionText, setSelectedOptionText] = useState<string | null>(null);

  // Spelling & Sorting interactive state
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  // Reset spelling/sorting on question index change
  useEffect(() => {
    setSelectedLetter(null);
  }, [currentQuestionIndex, activeLevel]);

  // Shuffle options for the current question to avoid predictable choices (e.g. Option 1 always being correct)
  const shuffledOptions = useMemo(() => {
    if (!activeLevel) return [];
    const question = activeLevel.questions[currentQuestionIndex];
    if (!question || !question.options) return [];
    // Perform a seed-stable or simple shuffle when question index changes
    return [...question.options].sort(() => Math.random() - 0.5);
  }, [activeLevel, currentQuestionIndex]);

  // Dynamically compute unlocked quiz levels based on completed chapters in Database
  const unlockedLevels = useMemo(() => {
    if (activeSubject === 'tamil') {
      const tamilSubject = subjects.find(s => 
        s.name.toLowerCase().includes('tamil') || 
        s.name.includes('தமிழ்')
      );
      if (!tamilSubject) {
        return [1]; // fallback default
      }

      const isLessonCompleted = (lessonId: string): boolean => {
        const lesson = tamilSubject.chapters
          .flatMap(c => c.lessons)
          .find(l => l.id === lessonId);
        return lesson?.progress?.status === 'completed';
      };

      const unlocked: number[] = [1];
      const mappings: Record<number, string> = {
        1: 'f750d0ef-3fc2-44b5-89a5-0abfcc618479',
        2: 'e9efc803-66fe-4574-a4e0-ef8ce18f104a',
        3: 'c6035e74-6b37-409e-a0c0-c58bb4f64fee',
        4: '27869c1b-70c6-4019-965f-619c799eb0e0',
        5: '260d91dd-1d8b-4964-8311-3ff589c38e5a',
        6: '45b61435-fe57-4e0c-a893-68bc25d96d53',
      };
      Object.entries(mappings).forEach(([lvlId, lesId]) => {
        if (isLessonCompleted(lesId)) {
          unlocked.push(Number(lvlId));
        }
      });
      return Array.from(new Set(unlocked));
    } else if (activeSubject === 'english') {
      const englishSubject = subjects.find(s => 
        s.name.toLowerCase().includes('english') || 
        s.name.includes('ஆங்கிலம்')
      );
      if (!englishSubject) {
        return [1];
      }

      const isLessonCompleted = (lessonId: string): boolean => {
        const lesson = englishSubject.chapters
          .flatMap(c => c.lessons)
          .find(l => l.id === lessonId);
        return lesson?.progress?.status === 'completed';
      };

      const unlocked: number[] = [1];
      const mappings: Record<number, string> = {
        1: '389a705c-d602-4f1e-bae6-7fdb736f3e53',
        2: 'b90f5a71-dcef-4a2b-925a-3e6d33be6364',
        3: 'fba5b58b-a115-4c45-ad62-34c3589575eb',
        4: 'c02f1643-7c13-450a-9004-d57ac6857ac3',
        5: '60569fa2-ef55-4902-80a0-e98c9d7c95ed',
        6: 'c1381ec5-b99a-49e0-84e2-21aad7a10ab7',
      };
      Object.entries(mappings).forEach(([lvlId, lesId]) => {
        if (isLessonCompleted(lesId)) {
          unlocked.push(Number(lvlId));
        }
      });
      return Array.from(new Set(unlocked));

    } else if (activeSubject === 'evs') {
      const evsSubject = subjects.find(s => 
        s.name.toLowerCase().includes('evs') || 
        s.name.toLowerCase().includes('environmental')
      );
      if (!evsSubject) {
        return [1];
      }

      const isLessonCompleted = (lessonId: string): boolean => {
        const lesson = evsSubject.chapters
          .flatMap(c => c.lessons)
          .find(l => l.id === lessonId);
        return lesson?.progress?.status === 'completed';
      };

      const unlocked: number[] = [1];
      const mappings: Record<number, string> = {
        1: '0d6b2ccc-01e0-4496-b30f-e6f7f5be3d21',
        2: 'a22e6df2-ff59-418b-89b2-2c39d7d72901',
        3: '5cc91f99-b121-4baa-813d-61260abbdffa',
        4: '2b200e99-464a-45df-839b-ac3282fb07a1',
        5: '66df4a08-281d-4aa3-917a-722de6658a79',
        6: '092a2e60-8ab5-4833-b948-056641af9df7',
      };
      Object.entries(mappings).forEach(([lvlId, lesId]) => {
        if (isLessonCompleted(lesId)) {
          unlocked.push(Number(lvlId));
        }
      });
      return Array.from(new Set(unlocked));
    } else if (activeSubject === 'gk') {
      const gkSubject = subjects.find(s => 
        s.name.toLowerCase().includes('gk') || 
        s.name.toLowerCase().includes('general knowledge')
      );
      if (!gkSubject) {
        return [1];
      }

      const isLessonCompleted = (lessonId: string): boolean => {
        const lesson = gkSubject.chapters
          .flatMap(c => c.lessons)
          .find(l => l.id === lessonId);
        return lesson?.progress?.status === 'completed';
      };

      const unlocked: number[] = [1];
      const mappings: Record<number, string> = {
        1: '03aebd95-bb93-4bc6-b798-bd6a633479e3',
        2: 'ea05392e-4a72-493b-bad7-340a97f55a33',
        3: 'a8ae08aa-2adb-454e-b591-d57edc838ee7',
        4: '88fcbba2-8e90-4e22-b5a2-1b78ace2b249',
        5: '45bcf53f-e78c-4844-a154-c4154cd2fbf5',
        6: 'c41443c3-2451-443b-90cc-cd2aa6894c22',
      };
      Object.entries(mappings).forEach(([lvlId, lesId]) => {
        if (isLessonCompleted(lesId)) {
          unlocked.push(Number(lvlId));
        }
      });
      return Array.from(new Set(unlocked));
    } else if (activeSubject === 'hindi') {
      const hindiSubject = subjects.find(s => 
        s.name.toLowerCase().includes('hindi') || 
        s.name.includes('हिन्दी')
      );
      if (!hindiSubject) {
        return [1];
      }

      const isLessonCompleted = (lessonId: string): boolean => {
        const lesson = hindiSubject.chapters
          .flatMap(c => c.lessons)
          .find(l => l.id === lessonId);
        return lesson?.progress?.status === 'completed';
      };

      const unlocked: number[] = [1];
      const mappings: Record<number, string> = {
        1: 'f6fe8926-03ac-4a54-85ca-46359d2fcb88',
        2: 'a698e1c8-50d0-43c0-9cb5-882718447740',
        3: '4fc361c1-d830-4ebe-b0e2-e4cfb7085c92',
        4: 'd5ae93a6-0786-4d66-a59a-06c5eb0ca029',
        5: '5a169e75-fb5f-40d9-a1f2-eaa4f18435d3',
      };
      Object.entries(mappings).forEach(([lvlId, lesId]) => {
        if (isLessonCompleted(lesId)) {
          unlocked.push(Number(lvlId));
        }
      });
      return Array.from(new Set(unlocked));
    } else {
      const mathSubject = subjects.find(s => 

        s.name.toLowerCase().includes('math') || 
        s.name.toLowerCase().includes('mathe') ||
        s.name.includes('கணிதம்')
      );
      if (!mathSubject) {
        return [1];
      }

      const isLessonCompleted = (lessonId: string): boolean => {
        const lesson = mathSubject.chapters
          .flatMap(c => c.lessons)
          .find(l => l.id === lessonId);
        return lesson?.progress?.status === 'completed';
      };

      const unlocked: number[] = [1];
      const mappings: Record<number, string> = {
        1: '1bebe881-2bb2-4b9e-817f-67739b354c78',
        2: '44ddcd38-4a6b-4eca-b7ee-12d4ce9fe6f4',
        3: 'e2fa68cf-10d2-4772-9814-aeb72f529bdf',
        4: '5f7d8cee-3073-4174-ab82-401fedb3fa44',
        5: '2ebb61ce-1133-4a74-b8d5-5265319ffd07',
        6: '252dd393-ece6-4561-863d-194e9b292f9b',
      };
      Object.entries(mappings).forEach(([lvlId, lesId]) => {
        if (isLessonCompleted(lesId)) {
          unlocked.push(Number(lvlId));
        }
      });
      return Array.from(new Set(unlocked));
    }
  }, [subjects, activeSubject]);

  // Set mounted state and reset levelScores when student profile changes (prevent cross-child score bleed)
  useEffect(() => {
    setMounted(true);
    setLevelScores({});
  }, [studentProfile]);

  // Load level scores from database
  useEffect(() => {
    if (!subjects || subjects.length === 0) return;
    const scoresMap: Record<number, number> = {};
    const allLessons = subjects.flatMap(s => s.chapters.flatMap(c => c.lessons));
    
    const tamilMappings: Record<number, string> = {
      1: 'f750d0ef-3fc2-44b5-89a5-0abfcc618479',
      2: 'e9efc803-66fe-4574-a4e0-ef8ce18f104a',
      3: 'c6035e74-6b37-409e-a0c0-c58bb4f64fee',
      4: '27869c1b-70c6-4019-965f-619c799eb0e0',
      5: '260d91dd-1d8b-4964-8311-3ff589c38e5a',
      6: '45b61435-fe57-4e0c-a893-68bc25d96d53',
    };

    const englishMappings: Record<number, string> = {
      1: '389a705c-d602-4f1e-bae6-7fdb736f3e53',
      2: 'b90f5a71-dcef-4a2b-925a-3e6d33be6364',
      3: 'fba5b58b-a115-4c45-ad62-34c3589575eb',
      4: 'c02f1643-7c13-450a-9004-d57ac6857ac3',
      5: '60569fa2-ef55-4902-80a0-e98c9d7c95ed',
      6: 'c1381ec5-b99a-49e0-84e2-21aad7a10ab7',
    };

    const mathMappings: Record<number, string> = {
      1: '1bebe881-2bb2-4b9e-817f-67739b354c78',
      2: '44ddcd38-4a6b-4eca-b7ee-12d4ce9fe6f4',
      3: 'e2fa68cf-10d2-4772-9814-aeb72f529bdf',
      4: '5f7d8cee-3073-4174-ab82-401fedb3fa44',
      5: '2ebb61ce-1133-4a74-b8d5-5265319ffd07',
      6: '252dd393-ece6-4561-863d-194e9b292f9b',
    };

    const evsMappings: Record<number, string> = {
      1: '0d6b2ccc-01e0-4496-b30f-e6f7f5be3d21',
      2: 'a22e6df2-ff59-418b-89b2-2c39d7d72901',
      3: '5cc91f99-b121-4baa-813d-61260abbdffa',
      4: '2b200e99-464a-45df-839b-ac3282fb07a1',
      5: '66df4a08-281d-4aa3-917a-722de6658a79',
      6: '092a2e60-8ab5-4833-b948-056641af9df7',
    };

    const gkMappings: Record<number, string> = {
      1: '03aebd95-bb93-4bc6-b798-bd6a633479e3',
      2: 'ea05392e-4a72-493b-bad7-340a97f55a33',
      3: 'a8ae08aa-2adb-454e-b591-d57edc838ee7',
      4: '88fcbba2-8e90-4e22-b5a2-1b78ace2b249',
      5: '45bcf53f-e78c-4844-a154-c4154cd2fbf5',
      6: 'c41443c3-2451-443b-90cc-cd2aa6894c22',
    };

    const hindiMappings: Record<number, string> = {
      1: 'f6fe8926-03ac-4a54-85ca-46359d2fcb88',
      2: 'a698e1c8-50d0-43c0-9cb5-882718447740',
      3: '4fc361c1-d830-4ebe-b0e2-e4cfb7085c92',
      4: 'd5ae93a6-0786-4d66-a59a-06c5eb0ca029',
      5: '5a169e75-fb5f-40d9-a1f2-eaa4f18435d3',
    };

    const mappings = activeSubject === 'tamil' ? tamilMappings 
                     : activeSubject === 'english' ? englishMappings 
                     : activeSubject === 'evs' ? evsMappings
                     : activeSubject === 'gk' ? gkMappings
                     : activeSubject === 'hindi' ? hindiMappings
                     : mathMappings;

    Object.entries(mappings).forEach(([levelId, lessonId]) => {
      const match = allLessons.find(l => l.id === lessonId);
      if (match && match.progress) {
        const prog = match.progress as any;
        if (prog.quiz_score !== undefined && prog.quiz_score !== null) {
          scoresMap[Number(levelId)] = Number(prog.quiz_score);
        } else if (prog.status === 'completed') {
          scoresMap[Number(levelId)] = 5;
        }
      }
    });
    setLevelScores(scoresMap);
  }, [subjects, studentProfile, activeSubject]);

  useEffect(() => {
    if (activeQuiz || activeGame || view !== 'dashboard') {
      document.body.classList.add('no-bottom-nav');
    } else {
      document.body.classList.remove('no-bottom-nav');
    }

    if (activeQuiz || activeGame) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.classList.remove('no-bottom-nav');
      document.body.style.overflow = 'auto';
    };
  }, [activeQuiz, activeGame, view]);

  // Auto scroll to top on view transitions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [view, activeLevel, currentQuestionIndex]);

  const allLessonsFlat = subjects.flatMap(s => s.chapters.flatMap(c => c.lessons));

  const displayedCategories = useMemo(() => {
    const DEFAULT_CATEGORIES = [
      {
        id: 'tamil_custom',
        title: 'Tamil',
        icon: null,
        color: 'bg-emerald-100 text-emerald-600',
        border: 'border-emerald-300',
        progress: 0,
        lessons: 6,
        isTamilQuiz: true,
        isEnglishQuiz: false,
        isMathQuiz: false,
        isEvsQuiz: false,
        isGkQuiz: false,
        isHindiQuiz: false
      },
      {
        id: 'english_custom',
        title: 'English',
        icon: null,
        color: 'bg-amber-105 text-amber-600',
        border: 'border-amber-300',
        progress: 0,
        lessons: 6,
        isTamilQuiz: false,
        isEnglishQuiz: true,
        isMathQuiz: false,
        isEvsQuiz: false,
        isGkQuiz: false,
        isHindiQuiz: false
      },
      {
        id: 'math_custom',
        title: 'Mathematics',
        icon: null,
        color: 'bg-indigo-100 text-indigo-650',
        border: 'border-indigo-300',
        progress: 0,
        lessons: 6,
        isTamilQuiz: false,
        isEnglishQuiz: false,
        isMathQuiz: true,
        isEvsQuiz: false,
        isGkQuiz: false,
        isHindiQuiz: false
      },
      {
        id: 'evs_custom',
        title: 'Environmental Studies',
        icon: null,
        color: 'bg-lime-100 text-lime-650',
        border: 'border-lime-300',
        progress: 0,
        lessons: 6,
        isTamilQuiz: false,
        isEnglishQuiz: false,
        isMathQuiz: false,
        isEvsQuiz: true,
        isGkQuiz: false,
        isHindiQuiz: false
      },
      {
        id: 'gk_custom',
        title: 'General Knowledge',
        icon: null,
        color: 'bg-purple-100 text-purple-650',
        border: 'border-purple-300',
        progress: 0,
        lessons: 6,
        isTamilQuiz: false,
        isEnglishQuiz: false,
        isMathQuiz: false,
        isEvsQuiz: false,
        isGkQuiz: true,
        isHindiQuiz: false
      },
      {
        id: 'hindi_custom',
        title: 'Hindi',
        icon: null,
        color: 'bg-rose-100 text-rose-600',
        border: 'border-rose-300',
        progress: 0,
        lessons: 6,
        isTamilQuiz: false,
        isEnglishQuiz: false,
        isMathQuiz: false,
        isEvsQuiz: false,
        isGkQuiz: false,
        isHindiQuiz: true
      }
    ];

    if (!mounted) return DEFAULT_CATEGORIES;

    const matchedApiIds = new Set<string>();

    const merged = DEFAULT_CATEGORIES.map(defCat => {
      const apiSubject = subjects.find(s => {
        const nameLower = s.name.toLowerCase();
        if (defCat.isTamilQuiz) return nameLower.includes('tamil') || nameLower.includes('தமிழ்');
        if (defCat.isEnglishQuiz) return nameLower.includes('english') || nameLower.includes('ஆங்கிலம்');
        if (defCat.isMathQuiz) return nameLower.includes('math') || nameLower.includes('mathe') || nameLower.includes('கணிதம்');
        if (defCat.isEvsQuiz) return nameLower.includes('environmental') || nameLower.includes('evs');
        if (defCat.isGkQuiz) return nameLower.includes('gk') || nameLower.includes('general knowledge');
        if (defCat.isHindiQuiz) return nameLower.includes('hindi') || nameLower.includes('हिन्दी');
        return false;
      });

      if (apiSubject) {
        matchedApiIds.add(apiSubject.id);
        return {
          ...defCat,
          id: apiSubject.id,
          title: apiSubject.name,
          progress: apiSubject.chapters.length > 0 ? Math.round(apiSubject.chapters.filter(c => c.completion_percentage >= 100).length / apiSubject.chapters.length * 100) : 0,
          lessons: apiSubject.chapters.flatMap(c => c.lessons).length,
        };
      }
      return defCat;
    });

    const extraSubjects = subjects.filter(s => !matchedApiIds.has(s.id)).map((s, idx) => {
      return {
        id: s.id,
        title: s.name,
        icon: null,
        color: ['bg-rose-100 text-rose-500', 'bg-blue-100 text-blue-500', 'bg-emerald-100 text-emerald-500', 'bg-amber-100 text-amber-500'][idx % 4],
        border: ['border-rose-200', 'border-blue-200', 'border-emerald-200', 'border-amber-200'][idx % 4],
        progress: s.chapters.length > 0 ? Math.round(s.chapters.filter(c => c.completion_percentage >= 100).length / s.chapters.length * 100) : 0,
        lessons: s.chapters.flatMap(c => c.lessons).length,
        isTamilQuiz: false,
        isEnglishQuiz: false,
        isMathQuiz: false,
        isEvsQuiz: false,
        isGkQuiz: false,
        isHindiQuiz: false
      };
    });

    return [...merged, ...extraSubjects];
  }, [subjects, mounted]);

  const startDailyThree = () => {
    const randomLesson = allLessonsFlat[Math.floor(Math.random() * allLessonsFlat.length)];
    if (randomLesson) {
      setActiveQuiz({
        id: randomLesson.id,
        title: randomLesson.title,
        emoji: '📚',
        color: 'bg-sky-100',
        text: 'text-sky-600',
        border: 'border-sky-300',
        status: randomLesson.progress?.status || 'not-started',
        quiz: { question: `Let's learn ${randomLesson.title}!`, options: [
          { n: 'A', e: '🌟' }, { n: 'B', e: '🚀' }, { n: 'C', e: '💫' }
        ], correct: 'A' }
      });
    }
  };

  const handleLevelSelect = (level: Level) => {
    if (!unlockedLevels.includes(level.id)) {
      return;
    }
    setActiveLevel(level);
    setCurrentQuestionIndex(0);
    setScores([]);
    setSelectedOptionText(null);
    setView('quiz_player');
  };

  const handleAnswer = (option: Option) => {
    if (selectedOptionText !== null) return; // Prevent double taps

    const isCorrect = option.correct;
    setSelectedOptionText(option.text);
    setScores(prev => [...prev, isCorrect ? 1 : 0]);
    
    // Smooth next transition without red cross or stress animations
    setTimeout(() => {
      setSelectedOptionText(null);
      if (activeLevel && currentQuestionIndex < activeLevel.questions.length - 1) {
        setCurrentQuestionIndex(idx => idx + 1);
      } else {
        setView('score_card');
        
        // Final Score calculation
        const finalScore = scores.reduce((a, b) => a + b, 0) + (isCorrect ? 1 : 0);
        
        if (activeLevel) {
          // Always update best score in local state
          const currentBest = levelScores[activeLevel.id] || 0;
          if (finalScore > currentBest) {
            setLevelScores(prev => ({
              ...prev,
              [activeLevel.id]: finalScore
            }));
          }

          // Lesson ID mappings for lesson_progress update
          const tamilLessonMappings: Record<number, string> = {
            1: 'f750d0ef-3fc2-44b5-89a5-0abfcc618479',
            2: 'e9efc803-66fe-4574-a4e0-ef8ce18f104a',
            3: 'c6035e74-6b37-409e-a0c0-c58bb4f64fee',
            4: '27869c1b-70c6-4019-965f-619c799eb0e0',
            5: '260d91dd-1d8b-4964-8311-3ff589c38e5a',
            6: '45b61435-fe57-4e0c-a893-68bc25d96d53',
          };
          const englishLessonMappings: Record<number, string> = {
            1: '389a705c-d602-4f1e-bae6-7fdb736f3e53',
            2: 'b90f5a71-dcef-4a2b-925a-3e6d33be6364',
            3: 'fba5b58b-a115-4c45-ad62-34c3589575eb',
            4: 'c02f1643-7c13-450a-9004-d57ac6857ac3',
            5: '60569fa2-ef55-4902-80a0-e98c9d7c95ed',
            6: 'c1381ec5-b99a-49e0-84e2-21aad7a10ab7',
          };
          const mathLessonMappings: Record<number, string> = {
            1: '1bebe881-2bb2-4b9e-817f-67739b354c78',
            2: '44ddcd38-4a6b-4eca-b7ee-12d4ce9fe6f4',
            3: 'e2fa68cf-10d2-4772-9814-aeb72f529bdf',
            4: '5f7d8cee-3073-4174-ab82-401fedb3fa44',
            5: '2ebb61ce-1133-4a74-b8d5-5265319ffd07',
            6: '252dd393-ece6-4561-863d-194e9b292f9b',
          };
          const evsLessonMappings: Record<number, string> = {
            1: '0d6b2ccc-01e0-4496-b30f-e6f7f5be3d21',
            2: 'a22e6df2-ff59-418b-89b2-2c39d7d72901',
            3: '5cc91f99-b121-4baa-813d-61260abbdffa',
            4: '2b200e99-464a-45df-839b-ac3282fb07a1',
            5: '66df4a08-281d-4aa3-917a-722de6658a79',
            6: '092a2e60-8ab5-4833-b948-056641af9df7',
          };
          const gkLessonMappings: Record<number, string> = {
            1: '03aebd95-bb93-4bc6-b798-bd6a633479e3',
            2: 'ea05392e-4a72-493b-bad7-340a97f55a33',
            3: 'a8ae08aa-2adb-454e-b591-d57edc838ee7',
            4: '88fcbba2-8e90-4e22-b5a2-1b78ace2b249',
            5: '45bcf53f-e78c-4844-a154-c4154cd2fbf5',
            6: 'c41443c3-2451-443b-90cc-cd2aa6894c22',
          };
          const hindiLessonMappings: Record<number, string> = {
            1: 'f6fe8926-03ac-4a54-85ca-46359d2fcb88',
            2: 'a698e1c8-50d0-43c0-9cb5-882718447740',
            3: '4fc361c1-d830-4ebe-b0e2-e4cfb7085c92',
            4: 'd5ae93a6-0786-4d66-a59a-06c5eb0ca029',
            5: '5a169e75-fb5f-40d9-a1f2-eaa4f18435d3',
          };

          // Quiz ID mappings (lesson_id -> quiz_id) for quiz_attempts tracking
          const lessonToQuizId: Record<string, string> = {
            'f750d0ef-3fc2-44b5-89a5-0abfcc618479': 'bba383c9-f361-49ee-9120-80b316d3b656', // உயிர் எழுத்துக்கள் 1 வினா
            'e9efc803-66fe-4574-a4e0-ef8ce18f104a': 'bbb47af9-98bb-41e3-a830-f2056a3b0686', // எ ஏ ஐ ஒ ஓ ஔ ஃ Quiz
            'c6035e74-6b37-409e-a0c0-c58bb4f64fee': '0158c95e-ae42-4c63-bb82-767e619bde91', // க் ங் ச் ஞ் Quiz
            '27869c1b-70c6-4019-965f-619c799eb0e0': '23c1cff2-6d47-47c1-a837-387a937cdc5d', // ட் ண் த் ந் Quiz
            '260d91dd-1d8b-4964-8311-3ff589c38e5a': '0235ea86-fb0d-4694-ac8d-e7e4e8238faa', // ப் ம் Quiz
            '45b61435-fe57-4e0c-a893-68bc25d96d53': 'e3369193-b3e6-4cdc-86b0-a6b295fe5945', // உயிரெழுத்து சார்ந்த சொற்கள் Quiz
            '389a705c-d602-4f1e-bae6-7fdb736f3e53': '0fa7eb99-d9c6-4072-87b7-80cc7113e77b', // Pre-Writing Exam Quiz
            'b90f5a71-dcef-4a2b-925a-3e6d33be6364': '0d155284-9adb-42ac-8bd5-489ac177a64f', // Letter M - Mango Quiz
            'fba5b58b-a115-4c45-ad62-34c3589575eb': '76b635cb-74bc-4c2d-916d-8a76dcbf7b6e', // Pick the Card Quiz
            'c02f1643-7c13-450a-9004-d57ac6857ac3': '2c35659c-d262-4710-9d5f-a2389d8b1acd', // Simple Words: Cat, Dog, Sun, Moon Quiz
            '60569fa2-ef55-4902-80a0-e98c9d7c95ed': 'c3afd736-cce8-4e8f-80d1-fecb5b91335f', // My Name Writing Quiz
            'c1381ec5-b99a-49e0-84e2-21aad7a10ab7': 'ad80173f-ab56-4f02-a130-25a7c93dee5f', // Little Red Riding Hood Quiz
            '1bebe881-2bb2-4b9e-817f-67739b354c78': '6b795e3c-5804-4aa7-b694-6ed96c73cc52', // Same & Different Quiz
            '44ddcd38-4a6b-4eca-b7ee-12d4ce9fe6f4': '656dad63-a603-4cd5-bc96-1a867f8d3bdb', // Shape Sorting Quiz
            'e2fa68cf-10d2-4772-9814-aeb72f529bdf': '74eaf6ce-ed6e-4954-b8a1-d0f57c6ab905', // Numbers 1-5 Review Quiz
            '5f7d8cee-3073-4174-ab82-401fedb3fa44': '79f4d6f4-e426-478b-b95e-bbf783e0e841', // Before & After Quiz
            '2ebb61ce-1133-4a74-b8d5-5265319ffd07': '3aa6c98e-a2cc-4c7e-9d5e-a8430ecaf0f3', // Open & Close Quiz
            '252dd393-ece6-4561-863d-194e9b292f9b': '7a2e23bf-bbc7-4db0-9a97-b438b74fff05', // Patterns Final Quiz
            '0d6b2ccc-01e0-4496-b30f-e6f7f5be3d21': 'd3309997-0e81-46c9-b354-0da523b645aa', // My Body Quiz
            'a22e6df2-ff59-418b-89b2-2c39d7d72901': '672b2074-ec9f-4fad-b985-f732a38c3a01', // Family Quiz
            '5cc91f99-b121-4baa-813d-61260abbdffa': '7b6a5788-dee2-41b9-90e1-f4f74a4f419d', // Pet & Wild Quiz
            '2b200e99-464a-45df-839b-ac3282fb07a1': '0835020d-c5a3-4b6d-9279-1f7ff7d06c94', // Parts of a Plant Quiz
            '66df4a08-281d-4aa3-917a-722de6658a79': 'f5a800b2-9f1c-480f-89cb-32a1b0f2e2f7', // Land Transport Quiz
            '092a2e60-8ab5-4833-b948-056641af9df7': '7c429cee-b456-4c34-a5f2-75785945349e', // Clean Habits Quiz
            '03aebd95-bb93-4bc6-b798-bd6a633479e3': 'e4be2404-244d-45c1-9cb5-bf89778db520', // My Name & Identity Quiz
            'ea05392e-4a72-493b-bad7-340a97f55a33': 'e3846c53-9e05-4aa9-8490-2f2579f86ffc', // Basic Colors Quiz
            'a8ae08aa-2adb-454e-b591-d57edc838ee7': 'd9bfe7f5-bde2-4857-8896-c770f448e385', // Animal Names Quiz
            '88fcbba2-8e90-4e22-b5a2-1b78ace2b249': 'a10dda7a-04d7-4522-8b7d-66a26fdc5ace', // Places Quiz
            '45bcf53f-e78c-4844-a154-c4154cd2fbf5': '093b85a8-03bf-487d-a657-dc2a19f0236f', // Road Safety Quiz
            'c41443c3-2451-443b-90cc-cd2aa6894c22': 'd1610c41-e2bd-4ddc-a7e6-7fc5e48f6e6d', // Sky Objects Quiz
            'd5bafdc2-6180-46cf-b84a-883c2b0dad08': '89fad8b3-9ff7-45d6-ba02-04742c65dce2', // खड़ी और लेटी रेखा (रेखा पहचान)
            'f6fe8926-03ac-4a54-85ca-46359d2fcb88': '6c7fa009-861e-4c60-82a2-aaf2b82f15b1', // अ और आ पहचान
            'a698e1c8-50d0-43c0-9cb5-882718447740': '9e11dfb6-cb50-45c0-9b84-a621aeb71670', // क वर्ग पहचान
            '4fc361c1-d830-4ebe-b0e2-e4cfb7085c92': 'b7cd60e2-f856-43bb-b452-7767f7c4b659', // सरल शब्द पहचान
            'd5ae93a6-0786-4d66-a59a-06c5eb0ca029': 'ceb3c6fb-f8fe-4500-9284-b9000a50f57b', // बोलना अभ्यास
            '5a169e75-fb5f-40d9-a1f2-eaa4f18435d3': 'da126a2f-aac8-4f26-a958-92fde6da6058', // कविता प्रश्न
          };

          const lessonMappings = activeSubject === 'tamil' ? tamilLessonMappings 
                           : activeSubject === 'english' ? englishLessonMappings 
                           : activeSubject === 'evs' ? evsLessonMappings
                           : activeSubject === 'gk' ? gkLessonMappings
                           : activeSubject === 'hindi' ? hindiLessonMappings
                           : mathLessonMappings;
          const lessonId = lessonMappings[activeLevel.id];

          if (lessonId) {
            // Always update lesson progress (best score)
            if (finalScore >= currentBest) {
              studentApi.updateProgress(lessonId, {
                status: 'completed',
                completion_percentage: 100,
                quiz_completed: true,
                quiz_score: finalScore,
                quiz_max_score: 5
              }).then(() => {
                queryClient.invalidateQueries({ queryKey: studentKeys.lessons });
                queryClient.invalidateQueries({ queryKey: studentKeys.dashboard });
                queryClient.invalidateQueries({ queryKey: studentKeys.me });
              }).catch((err) => {
                console.error("Failed to sync progress to DB:", err);
              });
            }

             // ALWAYS record quiz_attempt (so parent portal sees every attempt)
            const quizId = lessonToQuizId[lessonId];
            if (quizId) {
              studentApi.submitQuizScore(lessonId, quizId, {
                score: finalScore,
                max_score: 5,
              }).then(() => {
                queryClient.invalidateQueries({ queryKey: studentKeys.lessons });
                queryClient.invalidateQueries({ queryKey: studentKeys.dashboard });
                queryClient.invalidateQueries({ queryKey: studentKeys.me });
                // Also trigger parent keys just in case they share cache context on same browser/tab
                queryClient.invalidateQueries({ queryKey: ['parent'] });
                queryClient.invalidateQueries({ queryKey: ['parent', 'children'] });
                queryClient.invalidateQueries({ queryKey: ['parent', 'child'] });
              }).catch((err) => {
                console.error("Failed to record quiz attempt:", err);
              });
            }
          }
        }
      }
    }, 500);
  };


  return (
    <div className="relative overflow-hidden min-h-screen pb-12 kids-font selection:bg-teal-350">
      {/* Injecting Rounded Kid-friendly Fonts */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font {
          font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
        }
      `}} />

      {/* Dynamic Background atmosphere */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-300 via-sky-400 to-emerald-300" />
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/30 blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        
        

          {/* 1. MAIN DASHBOARD VIEW */}
          {view === 'dashboard' && (
            <div
              key="dashboard"
              
              
              
              className="w-full"
            >
              {/* Hero Quest Banner */}
              <div className="py-10 mb-8 w-full border-b-8 border-white/10">
                 <div className="relative w-full flex items-center">
                    <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-white/30 to-transparent skew-x-[-20deg] transform translate-x-32" />
                    
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-6">
                       <div className="text-center md:text-left flex-1 space-y-6">
                          <div className="inline-flex items-center gap-2 px-6 py-2 bg-amber-400 text-indigo-950 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-xl">
                             <Trophy size={16} fill="currentColor" /> Daily Quest
                          </div>
                          <h1 className="text-4xl sm:text-7xl font-black text-indigo-950 tracking-tighter leading-tight font-sans">
                             The <span className="text-indigo-800 italic font-medium font-sans">Daily 3</span> <br/>
                             Quest Arena
                          </h1>
                          <p className="text-indigo-900/60 font-bold text-lg">
                             {(() => {
                               const todayDone = studentDashboard?.today_activity?.lessons_completed ?? 0;
                               const target = 3;
                               if (todayDone >= target) return `You've crushed today's quest! 🏆🎉`;
                               return `Win ${target - todayDone} more question${target - todayDone !== 1 ? 's' : ''} today to earn a Magical Star! 🌟🌸`;
                             })()}
                          </p>


                       </div>

                       <div className="relative w-64 h-64 sm:w-80 sm:h-80 select-none">
                          <div className="absolute inset-0 bg-indigo-600/10 blur-[60px] rounded-full" />
                          <img 
                            src="/assets/avatars/owl-removebg-preview.png" 
                            className="w-full h-full object-contain" 
                            alt="Arena Master" 
                          />
                       </div>
                    </div>
                 </div>
              </div>


              {/* Practice Clouds (Subjects List) */}
              <div className="mb-16">
                 <div className="flex items-center gap-4 mb-10 px-2">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                       <Cloud className="text-white" size={20} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-indigo-950 leading-none">Practice Clouds</h2>
                      <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest mt-1">Jump into a subject</p>
                    </div>
                 </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                     {displayedCategories.map((zone, idx) => {
                        const isTamilCloud = zone.isTamilQuiz;

                        // Per-subject vivid gradient + accent color
                        const cardGradient = isTamilCloud
                          ? 'from-emerald-400 via-teal-500 to-cyan-500'
                          : zone.isEnglishQuiz
                          ? 'from-amber-400 via-orange-400 to-rose-400'
                          : zone.isMathQuiz
                          ? 'from-violet-500 via-indigo-500 to-blue-500'
                          : zone.isEvsQuiz
                          ? 'from-lime-400 via-green-500 to-emerald-500'
                          : zone.isGkQuiz
                          ? 'from-purple-500 via-fuchsia-500 to-pink-500'
                          : zone.isHindiQuiz
                          ? 'from-rose-400 via-pink-500 to-red-400'
                          : ['from-sky-400 to-blue-500','from-amber-400 to-orange-500','from-teal-400 to-emerald-500','from-violet-400 to-purple-500'][idx % 4];

                        const btnGradient = isTamilCloud
                          ? 'from-teal-600 to-cyan-700'
                          : zone.isEnglishQuiz
                          ? 'from-orange-500 to-rose-600'
                          : zone.isMathQuiz
                          ? 'from-indigo-600 to-blue-700'
                          : zone.isEvsQuiz
                          ? 'from-green-600 to-emerald-700'
                          : zone.isGkQuiz
                          ? 'from-fuchsia-600 to-pink-700'
                          : zone.isHindiQuiz
                          ? 'from-rose-600 to-red-700'
                          : 'from-indigo-600 to-blue-700';

                        return (
                          <button
                            key={zone.id}
                            onClick={() => {
                               if (isTamilCloud) {
                                 setActiveSubject('tamil');
                                 setView('levels');
                               } else if (zone.isEnglishQuiz) {
                                 setActiveSubject('english');
                                 setView('levels');
                               } else if (zone.isMathQuiz) {
                                 setActiveSubject('math');
                                 setView('levels');
                               } else if (zone.isEvsQuiz) {
                                 setActiveSubject('evs');
                                 setView('levels');
                               } else if (zone.isGkQuiz) {
                                 setActiveSubject('gk');
                                 setView('levels');
                               } else if (zone.isHindiQuiz) {
                                 setActiveSubject('hindi');
                                 setView('levels');
                               } else {
                                const matchingSubject = subjects.find(s => s.id === zone.id);
                                const zoneLessons = matchingSubject ? matchingSubject.chapters.flatMap(c => c.lessons) : [];
                                if (zoneLessons.length > 0) {
                                  setActiveQuiz({
                                    id: zoneLessons[0].id,
                                    title: zoneLessons[0].title,
                                    emoji: 'book',
                                    color: 'bg-sky-100',
                                    text: 'text-sky-600',
                                    border: 'border-sky-300',
                                    status: 'not-started',
                                    quiz: { question: `Let's learn ${zoneLessons[0].title}!`, options: [
                                      { n: 'A', e: 'star' }, { n: 'B', e: 'rocket' }, { n: 'C', e: 'sparkle' }
                                    ], correct: 'A' }
                                  });
                                }
                              }
                            }}
                            className="group relative"
                          >
                            {/* Glow halo */}
                            <div className={`absolute -inset-1 bg-gradient-to-br ${cardGradient} opacity-30 group-hover:opacity-60 blur-xl rounded-[4rem] transition-all duration-500`} />

                            <div className={`relative rounded-[3rem] border-4 border-white/30 transition-all duration-300 group-hover:-translate-y-3 group-hover:shadow-2xl shadow-xl overflow-hidden bg-gradient-to-br ${cardGradient}`}>
                              {/* Shine overlay */}
                              <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent pointer-events-none" />
                              {/* Bubble deco */}
                              <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/10 rounded-full" />
                              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/10 rounded-full" />

                              <div className="min-h-[280px] flex flex-col items-center justify-center px-6 py-8 relative text-center">
                                <div className="w-32 h-32 flex items-center justify-center mb-4 drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)] group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                                   <img
                                     src={
                                       isTamilCloud ? '/assets/subjects/tamil-removebg-preview.png'
                                       : zone.isMathQuiz ? '/assets/subjects/maths-removebg-preview.png'
                                       : zone.isEnglishQuiz ? '/assets/subjects/english-removebg-preview.png'
                                       : zone.isEvsQuiz ? '/assets/subjects/evs-removebg-preview.png'
                                       : zone.isGkQuiz ? '/assets/subjects/gk-removebg-preview.png'
                                       : zone.isHindiQuiz ? '/assets/subjects/hindi-removebg-preview.png'
                                       : '/assets/subjects/english-removebg-preview.png'
                                     }
                                     className="w-full h-full object-contain"
                                     alt={zone.title}
                                   />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight leading-none mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] font-sans">{zone.title}</h3>
                                <p className="text-[11px] font-black text-white/70 uppercase tracking-widest mb-5 font-sans">Fun Activities</p>
                                <div className={`px-7 py-2.5 bg-gradient-to-r ${btnGradient} rounded-2xl text-[11px] font-black text-white shadow-xl active:scale-95 transition-all uppercase tracking-widest font-sans border border-white/20`}>
                                   JUMP IN!
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                  </div>
              </div>

              {/* Fun Activities Section */}
              <div className="mt-12 mb-20">
                 <div className="flex items-center gap-4 mb-10 px-2">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                       <Gamepad2 className="text-white" size={20} />
                    </div>
                    <div>
                       <h2 className="text-2xl font-black text-indigo-950 uppercase leading-none">Fun Activities</h2>
                       <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest mt-1">Play and master together</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {[
                      { id: 'sound', title: 'Sound Match', emoji: '🔊', color: 'bg-blue-500' },
                      { id: 'truefalse', title: 'True or False', emoji: '🤪', color: 'bg-emerald-500' },
                      { id: 'sequence', title: 'Sequence', emoji: '🧩', color: 'bg-purple-500' },
                      { id: 'memory', title: 'Memory', emoji: '🧠', color: 'bg-rose-500' },
                    ].map((game) => (
                      <button key={game.id}
                        
                        
                        onClick={() => setActiveGame(game.id)}
                        className="bg-white/95 rounded-[3rem] p-8 text-left border-2 border-white/60 shadow-2xl flex items-center gap-8 transition-all group hover:bg-white w-full"
                      >
                         <div className={`w-20 h-20 rounded-[1.8rem] ${game.color} flex items-center justify-center text-4xl shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                           {game.emoji}
                         </div>
                         <div>
                           <h3 className="text-2xl font-black text-indigo-950 tracking-tight leading-none mb-2 font-sans">{game.title}</h3>
                           <span className="text-xs font-black text-indigo-900/40 uppercase tracking-[0.2em] font-sans">Start Training</span>
                         </div>
                         <ChevronRight className="ml-auto text-indigo-900/20 group-hover:text-indigo-900 group-hover:translate-x-2 transition-all" size={32} />
                      </button>
                    ))}
                 </div>
              </div>

            </div>
          )}

          {/* 2. TAMIL LEVELS SELECTION (NEAT KID-FRIENDLY ROADMAP) */}
          {/* 2. TAMIL LEVELS SELECTION (NEAT KID-FRIENDLY ROADMAP) */}
          {view === 'levels' && (
            <div key="levels" className="w-full min-h-screen flex flex-col bg-transparent pb-24 relative overflow-hidden font-sans">
              
              {/* Floating decorative elements */}
              <div className="absolute top-24 left-4 w-12 h-12 bg-rose-200/40 rounded-full blur-md animate-bounce" />
              <div className="absolute top-[40%] right-6 w-16 h-16 bg-amber-200/40 rounded-full blur-lg" />
              <div className="absolute bottom-32 left-8 w-20 h-20 bg-indigo-200/30 rounded-full blur-xl" />

              {/* ── HERO HEADER ── */}
              {(() => {
                const subjectConfig: Record<string, { label: string; sub: string; grad: string; img: string; icon: string }> = {
                  tamil:   { label: 'தமிழ் வினாடி-வினா', sub: 'Tamil Quiz Arena',          grad: 'from-emerald-400 via-teal-500 to-cyan-500',  img: '/assets/subjects/tamil-removebg-preview.png', icon: '🐯' },
                  english: { label: 'English Quiz Arena',  sub: 'Fun Spelling & Sorting',     grad: 'from-amber-400 via-orange-400 to-rose-400',  img: '/assets/subjects/english-removebg-preview.png', icon: '🍎' },
                  math:    { label: 'Math Challenge',       sub: 'Playful Math Adventures',   grad: 'from-violet-500 via-indigo-500 to-blue-500', img: '/assets/subjects/maths-removebg-preview.png', icon: '🔢' },
                  evs:     { label: 'Nature Explorer',      sub: 'Nature, Health & Living',   grad: 'from-lime-400 via-green-500 to-emerald-500', img: '/assets/subjects/evs-removebg-preview.png', icon: '🌍' },
                  gk:      { label: 'Knowledge Quest',      sub: 'Discover & Learn',          grad: 'from-purple-500 via-fuchsia-500 to-pink-500',img: '/assets/subjects/gk-removebg-preview.png', icon: '💡' },
                  hindi:   { label: 'Hindi Quiz Arena',     sub: 'Learn Hindi Vowels & Words',grad: 'from-rose-400 via-pink-500 to-red-400',      img: '/assets/subjects/hindi-removebg-preview.png', icon: '📙' },
                };
                const cfg = subjectConfig[activeSubject] ?? subjectConfig.english;
                const activeLevels = activeSubject === 'tamil' ? TAMIL_LEVELS 
                                   : activeSubject === 'english' ? ENGLISH_LEVELS 
                                   : activeSubject === 'evs' ? EVS_LEVELS 
                                   : activeSubject === 'gk' ? GK_LEVELS 
                                   : activeSubject === 'hindi' ? HINDI_LEVELS 
                                   : MATH_LEVELS;
                const maxSubjectStars = activeLevels.length * 5;
                const totalStars = Object.keys(levelScores).reduce((acc, id) => acc + Math.min(levelScores[Number(id)] || 0, 5), 0);

                return (
                  <div className={`relative w-full overflow-hidden bg-gradient-to-br ${cfg.grad} px-6 pt-6 pb-12 rounded-b-[4rem] shadow-2xl border-b-8 border-white/20`}>
                    {/* Bubble patterns */}
                    <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/10 rounded-full pointer-events-none" />
                    <div className="absolute top-20 left-10 w-24 h-24 bg-white/5 rounded-full pointer-events-none" />
                    
                    {/* Header Controls */}
                    <div className="relative z-10 flex items-center justify-between mb-8 max-w-4xl mx-auto w-full">
                      <button
                        onClick={() => setView('dashboard')}
                        className="flex items-center gap-2 bg-white/30 hover:bg-white/40 active:scale-95 border-2 border-white/50 text-indigo-950 font-black text-sm px-6 py-3 rounded-2xl shadow-lg transition-all"
                      >
                        <ArrowLeft size={16} strokeWidth={3} /> Back
                      </button>
                      <div className="flex items-center gap-2 bg-amber-400 border-2 border-white px-5 py-2.5 rounded-full shadow-lg">
                        <span className="text-xl">⭐</span>
                        <span className="text-sm font-black text-indigo-950">{totalStars} / {maxSubjectStars} STARS</span>
                      </div>
                    </div>

                    {/* Title & Banner */}
                    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto w-full">
                      <div className="text-center sm:text-left">
                        <div className="inline-flex items-center gap-1.5 bg-white/30 border border-white/40 px-4 py-1.5 rounded-full mb-3 shadow-inner">
                          <span className="text-sm">{cfg.icon}</span>
                          <span className="text-[10px] font-black text-indigo-950 uppercase tracking-[0.25em]">Levels Roadmap</span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-black text-white leading-none tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] uppercase">
                          {cfg.label}
                        </h1>
                        <p className="text-white/80 font-bold text-base mt-2">{cfg.sub}</p>
                      </div>
                      <img
                        src={cfg.img}
                        alt={cfg.label}
                        className="w-32 h-32 sm:w-44 sm:h-44 object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.2)] shrink-0 transform hover:scale-105 transition-transform duration-350"
                      />
                    </div>
                  </div>
                );
              })()}

              {/* ── LEVELS GRID LIST ── */}
              <div className="relative max-w-6xl mx-auto w-full px-6 pt-12 pb-24 z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                  {(activeSubject === 'tamil' ? TAMIL_LEVELS : activeSubject === 'english' ? ENGLISH_LEVELS : activeSubject === 'evs' ? EVS_LEVELS : activeSubject === 'gk' ? GK_LEVELS : activeSubject === 'hindi' ? HINDI_LEVELS : MATH_LEVELS).map((level, index) => {
                    const unlocked = unlockedLevels.includes(level.id);
                    const bestScore = Math.min(levelScores[level.id] || 0, 5);
                    const isCompleted = levelScores[level.id] !== undefined;

                    const levelGradients = [
                      'from-pink-400 to-rose-500 hover:shadow-[0_20px_45px_rgba(244,63,94,0.35)]',
                      'from-amber-400 to-orange-500 hover:shadow-[0_20px_45px_rgba(245,158,11,0.35)]',
                      'from-emerald-400 to-teal-500 hover:shadow-[0_20px_45px_rgba(16,185,129,0.35)]',
                      'from-sky-400 to-indigo-500 hover:shadow-[0_20px_45px_rgba(14,165,233,0.35)]',
                      'from-purple-400 to-fuchsia-500 hover:shadow-[0_20px_45px_rgba(168,85,247,0.35)]',
                      'from-red-400 to-rose-500 hover:shadow-[0_20px_45px_rgba(239,68,68,0.35)]',
                    ];
                    const activeGrad = levelGradients[(level.id - 1) % levelGradients.length];

                    return (
                      <div key={level.id} className="w-full max-w-[320px] transition-all duration-300">
                        <button
                          onClick={() => unlocked && handleLevelSelect(level)}
                          disabled={!unlocked}
                          className={`w-full text-left relative rounded-[3rem] p-6 border-[6px] transition-all duration-200 shadow-2xl overflow-hidden hover:-translate-y-3 hover:scale-[1.03] active:scale-[0.97]
                            ${unlocked
                              ? `border-white bg-gradient-to-br ${activeGrad} cursor-pointer text-white`
                              : 'border-slate-350 bg-gradient-to-br from-slate-200 to-slate-300 opacity-60 cursor-not-allowed text-slate-100'
                            }`}
                        >
                          {/* Inner Border Glow */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-black/10 pointer-events-none" />

                          <div className="flex flex-col items-center text-center w-full">
                            {/* Big circular mascot bubble */}
                            <div className={`w-22 h-22 rounded-full flex items-center justify-center border-4 shadow-lg mb-4 transform group-hover:rotate-6 transition-transform
                              ${unlocked ? 'bg-white/95 border-white/40' : 'bg-slate-200 border-slate-300'}`}>
                              {unlocked ? (
                                <span className="text-5xl select-none leading-none drop-shadow-md">{level.mascot}</span>
                              ) : (
                                <Lock size={28} className="text-slate-500" />
                              )}
                            </div>

                            {/* Level tag pill */}
                            <span className={`text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full border shadow-sm mb-3 leading-none
                              ${unlocked ? 'bg-white/20 text-white border-white/30' : 'bg-slate-350 text-slate-600 border-slate-450'}`}>
                              Lv {level.id}
                            </span>

                            {/* Level Title and English name */}
                            <div className="mb-4 w-full px-2">
                              <h3 className="text-2xl font-black leading-tight drop-shadow-md font-sans truncate">
                                {level.title.split('(')[0].trim()}
                              </h3>
                              <p className="text-xs font-extrabold opacity-90 font-sans truncate">
                                {level.titleEn}
                              </p>
                            </div>

                            {/* Scoreboard / Stars container */}
                            {unlocked && (
                              <div className="w-full bg-black/10 backdrop-blur-sm rounded-2xl p-2.5 flex flex-col items-center gap-1 border border-white/10 mb-5">
                                <div className="flex items-center gap-0.5">
                                  {[1,2,3,4,5].map(s => (
                                    <Star key={s} size={14} className={s <= bestScore ? 'text-amber-300 fill-amber-300 drop-shadow-md' : 'text-white/20'} />
                                  ))}
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-wider opacity-85">
                                  {isCompleted ? `Best: ${bestScore}/5 Stars` : 'No Stars Yet'}
                                </span>
                              </div>
                            )}

                            {/* Bubbly Play Button */}
                            {unlocked ? (
                              <div className="w-full">
                                <div className="w-full py-3 bg-white text-indigo-950 font-black rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:bg-slate-50 active:scale-95 transition-all text-sm uppercase tracking-wider">
                                  {isCompleted ? (
                                    <>PLAY AGAIN <RotateCcw size={14} className="stroke-[3]" /></>
                                  ) : (
                                    <>START QUIZ <Play size={14} fill="currentColor" /></>
                                  )}
                                </div>

                                {isCompleted && (
                                  <div className="relative h-2 bg-black/20 mt-4 rounded-full overflow-hidden border border-white/5">
                                    <div className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full" style={{ width: `${(bestScore / 5) * 100}%` }} />
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="w-full py-3 bg-slate-350 text-slate-600 font-black rounded-2xl flex items-center justify-center gap-2 border border-slate-400/50 text-xs uppercase tracking-wider">
                                Locked <Lock size={12} />
                              </div>
                            )}

                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 3. ACTIVE QUIZ PLAYER VIEW */}
          {view === 'quiz_player' && activeLevel && (
            <div
              key="player"
              
              
              
              className="w-full flex flex-col gap-6 max-w-xl mx-auto pt-4"
            >
              {/* Quiz Header Info */}
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => setView('levels')}
                  className="w-10 h-10 shrink-0 bg-white/90 border-2 border-indigo-100 text-slate-700 rounded-xl flex items-center justify-center shadow-md hover:bg-white active:scale-95 transition-all"
                  title="வெளியேறு"
                >
                  <X size={18} strokeWidth={3.5} className="text-slate-800" />
                </button>
                <span className="text-xs font-black text-indigo-950 uppercase tracking-widest truncate flex-1">
                  {activeLevel.title}
                </span>
                <span className="px-3 py-1 bg-amber-400 text-indigo-950 rounded-full font-black text-xs font-sans shrink-0">
                  {currentQuestionIndex + 1} / {activeLevel.questions.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-450 to-teal-555 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex) / activeLevel.questions.length) * 100}%` }}
                />
              </div>

              {/* Current Question Frame */}
              {(() => {
                const question = activeLevel.questions[currentQuestionIndex];
                return (
                  <div className="w-full bg-[#fffdf9] border-4 border-[#b45309] rounded-[3rem] p-6 sm:p-8 shadow-xl flex flex-col items-center gap-6 relative">
                    
                    {/* Header instruction */}
                    <div className="text-center space-y-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-black text-emerald-800 tracking-wider uppercase font-sans">
                        {activeSubject === 'tamil' ? (
                          question.type === 'trace' ? 'வரைதல் பயிற்சி'
                          : question.type === 'sequence' ? 'விடுபட்ட பகுதி'
                          : question.type === 'find' ? 'அடையாளம் காணல்'
                          : question.type === 'match' ? 'பொருத்துதல்'
                          : 'சரியான விடை'
                        ) : (
                          question.type === 'trace' ? 'Tracing Practice'
                          : question.type === 'sequence' ? 'Fill the Blank'
                          : question.type === 'find' ? 'Identify Item'
                          : question.type === 'match' ? 'Match Item'
                          : question.type === 'spelling' ? 'Spell Word'
                          : question.type === 'sorting' ? 'Sort Letters'
                          : question.type === 'order' ? 'Order Sequence'
                          : 'Choose Correct Answer'
                        )}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight pt-1 leading-snug">
                        {activeSubject === 'tamil' ? question.instructionTa : question.instruction}
                      </h2>
                    </div>

                    {/* 1. Tracing Canvas */}
                    {question.type === 'trace' && question.letter && (
                      <SimpleTraceCanvas
                        letter={question.letter}
                        onComplete={() => handleAnswer({ text: 'trace', correct: true })}
                      />
                    )}

                    {/* Math Compare: Size, weight, quantity choices side-by-side */}
                    {question.type === 'math_compare' && (
                      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg justify-center items-stretch mt-4">
                        {shuffledOptions.map((opt, i) => {
                          const isSelected = selectedOptionText === opt.text;
                          const isElephant = opt.text.toLowerCase().includes('elephant') || opt.emoji === '🐘';
                          const isRock = opt.text.toLowerCase().includes('rock') || opt.emoji === '🪨';
                          const isPineTree = opt.text.toLowerCase().includes('pine') || opt.emoji === '🌲';
                          const isMore = opt.text.toLowerCase().includes('5 cookies') || opt.text.toLowerCase().includes('4 apples') || opt.emoji === '🍎🍎🍎🍎';
                          
                          const isLarge = isElephant || isRock || isPineTree || isMore;
                          
                          return (
                            <button
                              key={i}
                              
                              
                              onClick={() => handleAnswer(opt)}
                              disabled={selectedOptionText !== null}
                              className={`flex-1 flex flex-col items-center justify-between p-8 rounded-[2.5rem] border-4 shadow-lg transition-all active:scale-95 text-center min-h-[220px] relative overflow-hidden
                                ${isSelected 
                                  ? opt.correct ? 'bg-emerald-500 border-emerald-600 text-white' : 'bg-rose-500 border-rose-600 text-white'
                                  : 'bg-white border-amber-200 text-slate-800 hover:border-amber-450 hover:bg-amber-50/50'}`}
                            >
                              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-100/30 to-transparent rounded-full pointer-events-none" />
                              
                              <div className="flex-1 flex items-center justify-center min-h-[100px]">
                                <div 
                                  
                                  
                                  className={`select-none transition-transform duration-350 drop-shadow-md
                                    ${isLarge ? 'text-7xl sm:text-8xl' : 'text-4xl sm:text-5xl'}`}
                                >
                                  {opt.emoji || '📦'}
                                </div>
                              </div>
                              
                              <div className="mt-4">
                                <span className={`text-base sm:text-lg font-black tracking-tight ${isSelected ? 'text-white' : 'text-indigo-950'}`}>
                                  {opt.text}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Math Count: Interactive bubbles pop and verify */}
                    {question.type === 'math_count' && question.sequence && (
                      <div className="flex flex-col items-center gap-8 w-full mt-2">
                        <div className="bg-white/80 border-2 border-dashed border-amber-300 rounded-[2rem] p-6 w-full max-w-md flex flex-wrap gap-4 justify-center items-center shadow-inner">
                          {question.sequence.map((emoji, idx) => (
                            <CountBubble key={idx} emoji={emoji} />
                          ))}
                        </div>

                        <p className="text-xs font-black text-indigo-900/50 uppercase tracking-widest leading-none text-center">
                          Tap each object to count, then select the number below!
                        </p>

                        <div className="grid grid-cols-3 gap-4 w-full max-w-sm justify-center">
                          {shuffledOptions.map((opt, i) => {
                            const isSelected = selectedOptionText === opt.text;
                            return (
                              <button
                                key={i}
                                
                                
                                onClick={() => handleAnswer(opt)}
                                disabled={selectedOptionText !== null}
                                className={`py-4 rounded-[1.8rem] text-2xl font-black border-4 shadow-md transition-all active:scale-95 flex items-center justify-center
                                  ${isSelected 
                                    ? opt.correct ? 'bg-emerald-500 border-emerald-600 text-white shadow-emerald-200' : 'bg-rose-500 border-rose-600 text-white shadow-rose-200'
                                    : 'bg-white border-amber-200 text-amber-800 hover:bg-amber-50 hover:border-amber-450'}`}
                              >
                                {opt.text}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Math Pattern Sequence Complete */}
                    {question.type === 'math_pattern' && question.sequence && (
                      <div className="flex flex-col items-center gap-8 w-full mt-2 font-sans">
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-4 border-[#b45309]/30 rounded-[2.5rem] p-6 w-full max-w-md flex justify-center items-center shadow-md relative overflow-hidden">
                          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 bg-amber-200/50 pointer-events-none" />
                          
                          <div className="flex items-center gap-3 relative z-10">
                            {question.sequence.map((item, idx) => {
                              const isTarget = item === '?';
                              return (
                                <div key={idx} className="flex items-center gap-2">
                                  {idx > 0 && <span className="text-slate-350 font-black">➔</span>}
                                  <div
                                    
                                    
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border-2 text-3xl select-none
                                      ${isTarget 
                                        ? 'bg-amber-100 border-dashed border-amber-450 text-amber-700 font-black animate-pulse' 
                                        : 'bg-white border-slate-150'}`}
                                  >
                                    {isTarget ? '?' : item}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 w-full max-w-md justify-center">
                          {shuffledOptions.map((opt, i) => {
                            const isSelected = selectedOptionText === opt.text;
                            return (
                              <button
                                key={i}
                                
                                
                                onClick={() => handleAnswer(opt)}
                                disabled={selectedOptionText !== null}
                                className={`flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border-2 shadow transition-all active:scale-95
                                  ${isSelected 
                                    ? opt.correct ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-rose-500 border-rose-500 text-white'
                                    : 'bg-white border-slate-150 text-slate-800 hover:bg-emerald-50'}`}
                              >
                                <span className="text-3xl sm:text-4xl drop-shadow-sm">
                                  {opt.emoji || '🧩'}
                                </span>
                                <span className={`text-[10px] sm:text-xs font-black mt-1 ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                                  {opt.text.split(' ')[0]}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 2. Missing Sequence */}
                    {question.type === 'sequence' && question.sequence && (
                      <div className="flex flex-col items-center gap-6 w-full">
                        {/* Horizontal Flow for Sequence */}
                        <div className="flex flex-wrap gap-2.5 sm:gap-4 justify-center items-center w-full">
                          {question.sequence.map((item, idx) => {
                            const isPlaceholder = item === '_';
                            return (
                              <div 
                                key={idx} 
                                className={`px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-3xl flex items-center justify-center font-black text-sm sm:text-lg shadow-sm border-2 transition-all
                                  ${isPlaceholder 
                                    ? 'bg-amber-50 text-amber-600 border-dashed border-amber-400 min-w-[70px] sm:min-w-[90px]' 
                                    : 'bg-white border-slate-150 text-slate-800'
                                  }`}
                              >
                                {isPlaceholder ? '?' : item}
                              </div>
                            );
                          })}
                        </div>

                        {/* Options Selection Grid */}
                        <div className="grid grid-cols-3 gap-3 w-full max-w-md justify-center mt-2">
                          {shuffledOptions.map((opt, i) => {
                            const isSelected = selectedOptionText === opt.text;
                            return (
                              <button
                                key={i}
                                onClick={() => handleAnswer(opt)}
                                disabled={selectedOptionText !== null}
                                className={`flex flex-col items-center gap-2 py-3.5 px-2.5 rounded-3xl border-2 shadow transition-all active:scale-95
                                  ${isSelected 
                                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                                    : 'bg-white border-slate-150 text-slate-800 hover:bg-emerald-50'}`}
                              >
                                {opt.img ? (
                                  <FamilyMedia emojiOrPath={opt.img} className="w-10 h-10 sm:w-14 sm:h-14 object-contain" />
                                ) : opt.emoji ? (
                                  <span className="text-3xl sm:text-4xl">{opt.emoji}</span>
                                ) : (
                                  <span className="text-2xl">🧩</span>
                                )}
                                <span className={`text-xs font-black mt-1 ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                                  {opt.text}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 3. Find and Mark */}
                    {question.type === 'find' && (
                      <div className="grid grid-cols-2 gap-3 w-full max-w-sm justify-center">
                        {shuffledOptions.map((opt, i) => {
                          const isSelected = selectedOptionText === opt.text;
                          return (
                            <button
                              key={i}
                              onClick={() => handleAnswer(opt)}
                              disabled={selectedOptionText !== null}
                              className={`py-4 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] text-xl sm:text-2xl font-black shadow border-2 transition-all active:scale-95
                                ${isSelected 
                                  ? 'bg-emerald-500 border-emerald-500 text-white' 
                                  : 'bg-white border-slate-150 text-slate-800 hover:bg-emerald-50'}`}
                            >
                              {opt.text}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* 4. Match Image */}
                    {question.type === 'match' && question.matchImage && (
                      <div className="flex flex-col items-center gap-6 w-full">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-3xl flex items-center justify-center shadow-md border border-slate-100">
                          <FamilyMedia emojiOrPath={question.matchImage} className="w-16 h-16 sm:w-24 sm:h-24 object-contain" />
                        </div>

                        <div className="grid grid-cols-3 gap-2.5 w-full max-w-xs justify-center">
                          {shuffledOptions.map((opt, i) => {
                            const isSelected = selectedOptionText === opt.text;
                            return (
                              <button
                                key={i}
                                onClick={() => handleAnswer(opt)}
                                disabled={selectedOptionText !== null}
                                className={`py-3 sm:py-4 rounded-2xl text-lg sm:text-xl font-black shadow border-2 transition-all active:scale-95
                                  ${isSelected 
                                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                                    : 'bg-white border-slate-150 text-slate-800 hover:bg-emerald-50'}`}
                              >
                                {opt.text}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 5. Choice Game */}
                    {question.type === 'choice' && (
                      <div className="grid grid-cols-3 gap-2 w-full max-w-md justify-center">
                        {shuffledOptions.map((opt, i) => {
                          const isSelected = selectedOptionText === opt.text;
                          return (
                            <button
                              key={i}
                              onClick={() => handleAnswer(opt)}
                              disabled={selectedOptionText !== null}
                              className={`flex flex-col items-center gap-2 py-3 sm:py-4 px-2 rounded-2xl border-2 shadow transition-all active:scale-95
                                ${isSelected 
                                  ? 'bg-emerald-500 border-emerald-500 text-white' 
                                  : 'bg-white border-slate-100 hover:bg-emerald-50 text-slate-800'}`}
                            >
                              {opt.img ? (
                                <FamilyMedia emojiOrPath={opt.img} className="w-10 h-10 sm:w-14 sm:h-14 object-contain" />
                              ) : opt.emoji ? (
                                <span className="text-3xl sm:text-5xl">{opt.emoji}</span>
                              ) : null}
                              <span className={`text-[10px] sm:text-xs font-black mt-1 ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                                {opt.text}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* 6. Spelling Game */}
                    {question.type === 'spelling' && (
                      <div className="flex flex-col items-center gap-6 w-full font-sans">
                        {/* Word spelling display */}
                        <div className="flex gap-2 justify-center items-center py-4">
                          {question.letter?.split('').map((char, charIdx) => {
                            const isBlank = char === '_';
                            return (
                              <div
                                key={charIdx}
                                
                                className={`w-12 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl border-2 shadow-sm
                                  ${isBlank 
                                    ? 'bg-amber-50 border-dashed border-amber-400 text-amber-600 font-extrabold min-w-[3rem]' 
                                    : 'bg-white border-slate-200 text-slate-800'
                                  }`}
                              >
                                {isBlank ? (selectedLetter || '?') : char}
                              </div>
                            );
                          })}
                        </div>

                        {/* Letter Tiles to select from */}
                        <div className="grid grid-cols-3 gap-3 w-full max-w-sm justify-center">
                          {shuffledOptions.map((opt, i) => {
                            const isSelected = selectedOptionText === opt.text;
                            return (
                              <button
                                key={i}
                                onClick={() => {
                                  setSelectedLetter(opt.text);
                                  handleAnswer(opt);
                                }}
                                disabled={selectedOptionText !== null}
                                className={`py-4 rounded-2xl text-xl font-bold shadow border-2 transition-all active:scale-95 flex flex-col items-center justify-center
                                  ${isSelected 
                                    ? opt.correct ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-rose-500 border-rose-500 text-white'
                                    : 'bg-white border-slate-150 text-slate-800 hover:bg-emerald-50'}`}
                              >
                                <span className="text-2xl font-black">{opt.text}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 7. Sorting Game */}
                    {question.type === 'sorting' && (
                      <div className="flex flex-col items-center gap-6 w-full font-sans">
                        {/* Target letter to sort */}
                        {question.letter && (
                          <div className="w-24 h-24 rounded-3xl bg-indigo-50 border-4 border-indigo-200 shadow-md flex items-center justify-center text-5xl font-black text-indigo-800 select-none animate-bounce">
                            {question.letter}
                          </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-4 w-full max-w-md justify-center py-2">
                          {shuffledOptions.map((opt, i) => {
                            const isSelected = selectedOptionText === opt.text;
                            const colors = ['bg-rose-50 border-rose-200 text-rose-600', 'bg-blue-50 border-blue-200 text-blue-600'];
                            return (
                              <button
                                key={i}
                                onClick={() => handleAnswer(opt)}
                                disabled={selectedOptionText !== null}
                                className={`h-24 rounded-3xl border-2 shadow transition-all active:scale-95 flex items-center justify-center text-lg font-black p-4 text-center
                                  ${isSelected 
                                    ? opt.correct ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-rose-500 border-rose-500 text-white'
                                    : `${colors[i % 2]} hover:bg-indigo-50`}`}
                              >
                                {opt.text}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 8. Order Sequence Game */}
                    {question.type === 'order' && (
                      <div className="flex flex-col gap-4 w-full font-sans">
                        {shuffledOptions.map((opt, i) => {
                          const isSelected = selectedOptionText === opt.text;
                          const steps = opt.text.split('➔').map(s => s.trim());
                          return (
                            <button
                              key={i}
                              onClick={() => handleAnswer(opt)}
                              disabled={selectedOptionText !== null}
                              className={`w-full p-4 rounded-3xl border-2 shadow transition-all active:scale-95 flex flex-col gap-2 items-center text-center
                                ${isSelected 
                                  ? opt.correct ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-rose-500 border-rose-500 text-white'
                                  : 'bg-white border-slate-150 text-slate-800 hover:bg-emerald-50'}`}
                            >
                              <div className="flex flex-wrap items-center justify-center gap-2">
                                {steps.map((step, idx) => (
                                  <React.Fragment key={idx}>
                                    {idx > 0 && <span className={`text-lg font-black ${isSelected ? 'text-white' : 'text-amber-500'}`}>➔</span>}
                                    <span className={`px-3 py-1.5 rounded-full text-xs font-black shadow-inner
                                      ${isSelected ? 'bg-white/20 text-white' : 'bg-amber-50 border border-amber-100 text-amber-800'}`}>
                                      {step}
                                    </span>
                                  </React.Fragment>
                                ))}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}

                  </div>
                );
              })()}
            </div>
          )}

          {/* 4. SCORE CARD VIEW */}
          {view === 'score_card' && activeLevel && (
            <div
              key="score"
              
              
              
              className="w-full max-w-md mx-auto bg-[#fffdf9] border-4 border-[#b45309] rounded-[3rem] p-8 text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-pink-100/50 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-emerald-100/50 rounded-full blur-[60px] pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center gap-6">
                
                <div
                  
                  
                  className="text-7xl sm:text-8xl drop-shadow"
                >
                  🏆
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                    சவால் முடிந்தது!
                  </h2>
                  <p className="text-sm font-bold text-slate-500 mt-2">
                    அருமையாக விளையாடினீர்கள்! 🎊
                  </p>
                </div>

                <div className="flex gap-2 justify-center py-2">
                  {[1, 2, 3, 4, 5].map((star, idx) => {
                    const earned = scores.filter(Boolean).length >= star;
                    return (
                      <Star
                        key={idx}
                        size={28}
                        className={earned ? 'text-amber-500 fill-amber-500' : 'text-slate-200'}
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      />
                    );
                  })}
                </div>

                <div className="px-6 py-2 bg-emerald-50 border border-emerald-100 rounded-xl font-sans">
                  <span className="text-xl font-black text-emerald-800">
                    {scores.filter(Boolean).length} / {activeLevel.questions.length} சரி
                  </span>
                </div>

                <button
                  
                  onClick={() => setView('levels')}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg border-b-4 border-teal-750 active:scale-95"
                >
                  நிலைகளுக்குத் திரும்பு ➡️
                </button>

              </div>
            </div>
          )}

        

      </div>

      {/* OVERLAY WRAPPERS FOR OTHER SUBJECTS */}
      
        {activeQuiz && (
          <div className="fixed inset-0 z-[200] bg-white overflow-y-auto magic-scroll font-sans">
            <QuizEngine lesson={activeQuiz} onClose={() => setActiveQuiz(null)} onComplete={() => {}} />
          </div>
        )}
        {activeGame && (
          <div className="fixed inset-0 z-[200] bg-sky-400 overflow-y-auto magic-scroll font-sans">
            <div className="relative min-h-screen">
              {activeGame === 'sound' && <SoundMatchGame onBack={() => setActiveGame(null)} />}
              {activeGame === 'truefalse' && <TrueOrFalseGame onBack={() => setActiveGame(null)} />}
              {activeGame === 'sequence' && <SequenceGame onBack={() => setActiveGame(null)} />}
              {activeGame === 'memory' && <MemoryMatchGame onBack={() => setActiveGame(null)} />}
            </div>
          </div>
        )}
      

    </div>
  );
}
