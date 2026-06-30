'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';
import { shuffle } from '@/core/data/letterData';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type GridItem = {
  id: string;
  name: string;
  emoji: string;
  startsWith: string;
};

type RoundData = {
  targetLetter: string;
  items: GridItem[];
};

const ROUNDS: RoundData[] = [
  {
    targetLetter: 'C',
    items: [
      { id: 'c1', name: 'CAT', emoji: '🐱', startsWith: 'C' },
      { id: 'a1', name: 'APPLE', emoji: '🍎', startsWith: 'A' },
      { id: 'c2', name: 'CAR', emoji: '🚗', startsWith: 'C' },
      { id: 'b1', name: 'BALL', emoji: '⚽', startsWith: 'B' },
      { id: 'c3', name: 'CUP', emoji: '🥤', startsWith: 'C' },
      { id: 'd1', name: 'DOG', emoji: '🐶', startsWith: 'D' },
    ]
  },
  {
    targetLetter: 'S',
    items: [
      { id: 's1', name: 'SUN', emoji: '☀️', startsWith: 'S' },
      { id: 'f1', name: 'FISH', emoji: '🐟', startsWith: 'F' },
      { id: 's2', name: 'STAR', emoji: '⭐', startsWith: 'S' },
      { id: 'h1', name: 'HAT', emoji: '🎩', startsWith: 'H' },
      { id: 's3', name: 'SOCKS', emoji: '🧦', startsWith: 'S' },
      { id: 't1', name: 'TREE', emoji: '🌳', startsWith: 'T' },
    ]
  },
  {
    targetLetter: 'B',
    items: [
      { id: 'b1_3', name: 'BALL', emoji: '⚽', startsWith: 'B' },
      { id: 'c1_3', name: 'CAT', emoji: '🐱', startsWith: 'C' },
      { id: 'b2_3', name: 'BEE', emoji: '🐝', startsWith: 'B' },
      { id: 'a1_3', name: 'APPLE', emoji: '🍎', startsWith: 'A' },
      { id: 'b3_3', name: 'BOOK', emoji: '📖', startsWith: 'B' },
      { id: 'd1_3', name: 'DOG', emoji: '🐶', startsWith: 'D' },
    ]
  }
];

export default function GridFinderMatch({ onComplete }: Props) {
  const [roundIdx, setRoundIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentRound = ROUNDS[roundIdx];

  const gridItems = useMemo(() => {
    return shuffle([...currentRound.items]);
  }, [roundIdx, currentRound]);
  
  // Calculate correct target items in the current round
  const targetCount = useMemo(() => {
    return currentRound.items.filter(item => item.startsWith === currentRound.targetLetter).length;
  }, [currentRound]);

  const handleCardTap = (item: GridItem) => {
    if (selectedIds.has(item.id) || wrongId || done) return;

    const isCorrect = item.startsWith === currentRound.targetLetter;

    if (isCorrect) {
      const nextSelected = new Set(selectedIds);
      nextSelected.add(item.id);
      setSelectedIds(nextSelected);
      setScore(s => s + 1);

      // Check if round complete
      if (nextSelected.size === targetCount) {
        setTimeout(() => {
          setSelectedIds(new Set());
          if (roundIdx < ROUNDS.length - 1) {
            setRoundIdx(r => r + 1);
          } else {
            setDone(true);
          }
        }, 1000);
      }
    } else {
      setWrongId(item.id);
      setTimeout(() => {
        setWrongId(null);
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
        <span className="text-8xl select-none">🏆</span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Grid Match Finished!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Splendid! You found all matching grid pictures! 🌟
        </p>
        <button
          onClick={() => onComplete({
            score: 100, max_score: 100,
            completion_data: { score, total: 9 },
            time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
          })}
          className="w-full max-w-xs inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl border-b-4 border-emerald-700 active:scale-95 cursor-pointer"
        >
          Continue ➡️
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 px-4 py-4 w-full max-w-sm mx-auto kids-font select-none">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font {
          font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
        }
      `}} />

      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🧩 Grid Picture Matcher
        </span>
        <h3 className="text-2xl font-black text-indigo-950 mt-2">
          Find all pictures starting with <span className="text-indigo-600">"{currentRound.targetLetter}"</span>!
        </h3>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 bg-indigo-50/50 px-4 py-1.5 rounded-full border border-indigo-100/30">
        <span className="text-[10px] font-black text-indigo-650 uppercase tracking-wider">
          Round {roundIdx + 1} of {ROUNDS.length}
        </span>
      </div>

      {/* 3x2 Grid Board */}
      <div className="grid grid-cols-3 gap-4 w-full mt-2">
        {gridItems.map((item) => {
          const isMatched = selectedIds.has(item.id);
          const isWrong = wrongId === item.id;

          let cardStyle = 'border-indigo-100 bg-white border-b-4';
          if (isMatched) cardStyle = 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-inner';
          else if (isWrong) cardStyle = 'border-red-500 bg-red-50 text-red-700 animate-[shake_0.4s_ease-in-out]';

          return (
            <button
              key={item.id}
              onClick={() => handleCardTap(item)}
              disabled={isMatched}
              className={`aspect-square rounded-3xl border-2 flex flex-col items-center justify-center p-2.5 transition-all shadow-md cursor-pointer ${cardStyle}`}
            >
              <span className="text-4xl drop-shadow-sm select-none">{item.emoji}</span>
              <span className="text-[9px] font-black text-indigo-950/40 uppercase tracking-wider mt-1.5 select-none leading-none">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tip / Feedback */}
      <div className="min-h-[24px] flex items-center justify-center text-center mt-2">
        {wrongId ? (
          <p className="text-sm font-black text-red-500 uppercase tracking-wider">
            🙅 That does not start with {currentRound.targetLetter}!
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <HelpCircle size={12} /> Tap all 3 pictures that start with {currentRound.targetLetter}!
          </p>
        )}
      </div>
    </div>
  );
}
