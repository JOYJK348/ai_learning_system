'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, RotateCcw } from 'lucide-react';
import { audioEngine } from '@/core/utils/audio';

interface TraceActivityProps {
  activity: any;
  onComplete: () => void;
  onClose: () => void;
}

const PATH_CONFIGS: { [key: string]: { points: [number, number][]; name: string } } = {
  standing: {
    name: 'Standing Line',
    points: [[50, 20], [50, 180]],
  },
  sleeping: {
    name: 'Sleeping Line',
    points: [[20, 100], [180, 100]],
  },
  slanting: {
    name: 'Slanting Line',
    points: [[30, 170], [170, 30]],
  },
  curved: {
    name: 'Curved Line',
    points: [[50, 180], [80, 100], [100, 60], [130, 50], [150, 80], [160, 150]],
  },
  'zigzag': {
    name: 'Zig Zag Line',
    points: [[50, 180], [100, 50], [150, 180], [200, 50]],
  },
};

export default function TraceActivity({ activity, onComplete, onClose }: TraceActivityProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [pathStrokes, setPathStrokes] = useState<[number, number][][]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showDone, setShowDone] = useState(false);

  const config = activity?.config || {};
  const pathKey = config.path || 'standing';
  const pathInfo = PATH_CONFIGS[pathKey];
  const thickness = config.thickness || 6;
  const tolerance = config.tolerance || 15;
  const isGuideMode = config.mode === 'guide';
  const color = config.color || '#6366F1';

  // Draw guide path and user strokes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw guide path (dotted line)
    if (pathInfo && (isGuideMode || pathStrokes.length === 0)) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = thickness + 2;
      ctx.setLineDash([5, 5]);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      const startPoint = pathInfo.points[0];
      ctx.moveTo(startPoint[0], startPoint[1]);

      for (let i = 1; i < pathInfo.points.length; i++) {
        const p = pathInfo.points[i];
        ctx.lineTo(p[0], p[1]);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw user strokes
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (const stroke of pathStrokes) {
      ctx.beginPath();
      ctx.moveTo(stroke[0][0], stroke[0][1]);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i][0], stroke[i][1]);
      }
      ctx.stroke();
    }
  }, [pathStrokes, isGuideMode, pathInfo, thickness, color]);

  // Check if path is traced correctly
  const checkCompletion = () => {
    if (pathStrokes.length === 0) return false;

    // Combine all strokes
    const allPoints: [number, number][] = [];
    for (const stroke of pathStrokes) {
      allPoints.push(...stroke);
    }

    if (allPoints.length < 5) return false;

    // Check if points roughly follow the path
    const guidePath = pathInfo.points;
    let matchedCount = 0;

    for (const guidePoint of guidePath) {
      for (const userPoint of allPoints) {
        const distance = Math.sqrt(
          Math.pow(guidePoint[0] - userPoint[0], 2) + Math.pow(guidePoint[1] - userPoint[1], 2)
        );
        if (distance < tolerance * 2) {
          matchedCount++;
          break;
        }
      }
    }

    // Consider complete if at least 70% of guide path is traced
    return matchedCount >= guidePath.length * 0.7;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isCompleted) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    setIsDrawing(true);
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPathStrokes([...pathStrokes, [[x, y]]]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || pathStrokes.length === 0) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newStrokes = [...pathStrokes];
    const lastStroke = newStrokes[newStrokes.length - 1];
    lastStroke.push([x, y]);
    setPathStrokes(newStrokes);

    // Check completion
    if (!isCompleted && checkCompletion()) {
      setIsCompleted(true);
      setShowDone(true);
      audioEngine?.speak('Excellent! You traced it perfectly!');
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isCompleted) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !e.touches[0]) return;

    setIsDrawing(true);
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    setPathStrokes([...pathStrokes, [[x, y]]]);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || pathStrokes.length === 0 || !e.touches[0]) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    e.preventDefault();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;

    const newStrokes = [...pathStrokes];
    const lastStroke = newStrokes[newStrokes.length - 1];
    lastStroke.push([x, y]);
    setPathStrokes(newStrokes);

    if (!isCompleted && checkCompletion()) {
      setIsCompleted(true);
      setShowDone(true);
      audioEngine?.speak('Excellent! You traced it perfectly!');
    }
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  const handleReset = () => {
    setPathStrokes([]);
    setIsCompleted(false);
    setShowDone(false);
  };

  const handleDone = () => {
    if (isCompleted) {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4 font-sans">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 text-white"
      >
        <h1 className="text-4xl font-black mb-2">🛏️ {pathInfo?.name}!</h1>
        <p className="text-lg text-slate-300">
          {isGuideMode ? 'Follow the dotted line with your finger' : 'Drag your finger along the dotted line, then tap Done!'}
        </p>
      </motion.div>

      {/* Canvas */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative mb-8 rounded-3xl shadow-2xl overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="cursor-crosshair bg-slate-800 touch-none"
        />

        {/* Completion overlay */}
        {showDone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-3xl backdrop-blur-sm"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-8xl"
            >
              ⭐
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-4 items-center"
      >
        <button
          onClick={handleReset}
          className="px-6 py-3 rounded-full bg-slate-700 hover:bg-slate-600 text-white font-black uppercase text-sm flex items-center gap-2 transition-all"
        >
          <RotateCcw size={18} /> Reset
        </button>

        <motion.button
          onClick={handleDone}
          disabled={!isCompleted}
          whileHover={isCompleted ? { scale: 1.05 } : {}}
          whileTap={isCompleted ? { scale: 0.95 } : {}}
          className={`px-8 py-3 rounded-full font-black uppercase text-sm flex items-center gap-2 transition-all ${
            isCompleted
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer'
              : 'bg-slate-500 text-slate-300 cursor-not-allowed opacity-50'
          }`}
        >
          <CheckCircle size={18} /> {isCompleted ? 'Done!' : 'Keep Tracing...'}
        </motion.button>
      </motion.div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center font-black text-lg transition-all"
      >
        ✕
      </button>
    </div>
  );
}
