'use client';

import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle } from 'lucide-react';

type Props = {
  mode: 'starting' | 'ending';
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type SortItem = {
  id: string;
  name: string;
  emoji: string;
  correctBucket: 'left' | 'right';
};

export default function WordSorterQuiz({ mode, onComplete }: Props) {
  // Set up buckets and items based on mode
  const { bucketLeftLabel, bucketRightLabel, items } = useMemo(() => {
    if (mode === 'starting') {
      return {
        bucketLeftLabel: 'Starts with C',
        bucketRightLabel: 'Starts with D',
        items: [
          { id: '1', name: 'CAT', emoji: '🐱', correctBucket: 'left' },
          { id: '2', name: 'DOG', emoji: '🐶', correctBucket: 'right' },
          { id: '3', name: 'CAR', emoji: '🚗', correctBucket: 'left' },
          { id: '4', name: 'DUCK', emoji: '🦆', correctBucket: 'right' },
          { id: '5', name: 'CUP', emoji: '🥤', correctBucket: 'left' },
          { id: '6', name: 'DOOR', emoji: '🚪', correctBucket: 'right' },
        ] as SortItem[],
      };
    } else {
      return {
        bucketLeftLabel: 'Ends with T',
        bucketRightLabel: 'Ends with G',
        items: [
          { id: '1', name: 'CAT', emoji: '🐱', correctBucket: 'left' },
          { id: '2', name: 'DOG', emoji: '🐶', correctBucket: 'right' },
          { id: '3', name: 'HAT', emoji: '🎩', correctBucket: 'left' },
          { id: '4', name: 'FROG', emoji: '🐸', correctBucket: 'right' },
          { id: '5', name: 'MAT', emoji: '🧹', correctBucket: 'left' },
          { id: '6', name: 'BAG', emoji: '🎒', correctBucket: 'right' },
        ] as SortItem[],
      };
    }
  }, [mode]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentItem = items[currentIdx];

  const handleSort = (bucket: 'left' | 'right') => {
    if (slideDirection || wrongFlash || done) return;

    const isCorrect = bucket === currentItem.correctBucket;
    if (isCorrect) {
      setScore(s => s + 1);
      setSlideDirection(bucket);
      setTimeout(() => {
        setSlideDirection(null);
        if (currentIdx < items.length - 1) {
          setCurrentIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 800);
    } else {
      setWrongFlash(true);
      setTimeout(() => {
        setWrongFlash(false);
      }, 800);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-6 px-6 py-10 kids-font">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
          .kids-font {
            font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
          }
        `}} />
        <motion.span
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-8xl"
        >🏆</motion.span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Super Sorter!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Awesome! You sorted all items into their correct buckets! 📦🌟
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onComplete({
            score: Math.round((score / items.length) * 100), max_score: 100,
            completion_data: { score, total: items.length },
            time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
          })}
          className="w-full max-w-xs inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl transition-all border-b-4 border-emerald-700 active:scale-95 cursor-pointer"
        >
          Continue ➡️
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 px-4 py-4 w-full max-w-md mx-auto kids-font">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font {
          font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
        }
      `}} />

      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          📦 UKG Word Sorter Quest
        </span>
        <h3 className="text-2xl font-black text-indigo-950 mt-2">
          {mode === 'starting' ? 'Sort items by their starting letter!' : 'Sort items by their ending letter!'}
        </h3>
      </div>

      {/* Progress Indicators */}
      <div className="flex items-center gap-1.5 bg-indigo-50/50 px-4 py-1 rounded-full border border-indigo-100/30">
        {items.map((_, i) => (
          <div key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300
              ${i < currentIdx ? 'bg-indigo-600' : i === currentIdx ? 'bg-indigo-400 ring-2 ring-indigo-200' : 'bg-slate-200'}`}
          />
        ))}
      </div>

      {/* Floating Target Card */}
      <div className="h-44 w-full flex items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!slideDirection && (
            <motion.div
              key={currentItem.id}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={
                slideDirection === 'left'
                  ? { x: -200, opacity: 0, scale: 0.8, rotate: -20 }
                  : slideDirection === 'right'
                    ? { x: 200, opacity: 0, scale: 0.8, rotate: 20 }
                    : { opacity: 0, scale: 0.8 }
              }
              className={`w-36 h-36 rounded-[2.5rem] bg-white border-2 border-indigo-100 border-b-4 shadow-xl flex flex-col items-center justify-center gap-1 cursor-grab active:cursor-grabbing
                ${wrongFlash ? 'animate-[shake_0.4s_ease-in-out] border-red-400 bg-red-50' : ''}`}
            >
              <span className="text-6xl drop-shadow-md select-none">{currentItem.emoji}</span>
              <span className="text-lg font-black text-indigo-950 uppercase tracking-wide mt-1 select-none">
                {currentItem.name}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Buckets Grid (Click to Sort) */}
      <div className="grid grid-cols-2 gap-6 w-full mt-2">
        {/* Left Bucket */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSort('left')}
          className="flex flex-col items-center p-4 rounded-[2.5rem] bg-gradient-to-b from-indigo-500 to-indigo-600 text-white shadow-lg border-b-4 border-indigo-850 cursor-pointer"
        >
          <span className="text-5xl mb-2 drop-shadow-md">📥</span>
          <span className="text-lg font-black tracking-tight uppercase">
            {bucketLeftLabel}
          </span>
        </motion.button>

        {/* Right Bucket */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSort('right')}
          className="flex flex-col items-center p-4 rounded-[2.5rem] bg-gradient-to-b from-purple-500 to-purple-600 text-white shadow-lg border-b-4 border-purple-850 cursor-pointer"
        >
          <span className="text-5xl mb-2 drop-shadow-md">📥</span>
          <span className="text-lg font-black tracking-tight uppercase">
            {bucketRightLabel}
          </span>
        </motion.button>
      </div>

      {/* Tip / Feedback */}
      <div className="min-h-[24px] flex items-center justify-center text-center mt-2">
        {wrongFlash ? (
          <p className="text-sm font-black text-red-500 uppercase tracking-wider animate-[shake_0.4s_ease-in-out]">
            🙅 Oops! That is the wrong bucket. Try again!
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <HelpCircle size={12} /> Tap the correct bucket to sort the item!
          </p>
        )}
      </div>
    </div>
  );
}
