'use client';

import React, { useState, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import { SimpleTraceCanvas } from './Grade1EnglishGames';

type Props = {
  capital: boolean;
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

export default function AlphabetTraceBoard({ capital, onComplete }: Props) {
  const letters = capital
    ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    : 'abcdefghijklmnopqrstuvwxyz'.split('');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedLetters, setCompletedLetters] = useState<Set<string>>(new Set());
  const startTime = useRef(Date.now());
  const currentLetter = letters[currentIndex];
  const allDone = completedLetters.size === 26;

  const handleTraceComplete = () => {
    const nextCompleted = new Set(completedLetters);
    nextCompleted.add(currentLetter);
    setCompletedLetters(nextCompleted);

    if (currentIndex + 1 < letters.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleFinish = () => {
    onComplete({
      score: 100,
      max_score: 100,
      completion_data: { traced_count: completedLetters.size },
      time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto px-2 select-none">
      <div className="text-center">
        <h2 className="text-2xl font-black text-indigo-950 flex items-center justify-center gap-2">
          ✏️ {capital ? 'Capital Letters A-Z' : 'Small Letters a-z'} Trace Board
        </h2>
        <p className="text-xs font-black text-indigo-900/40 uppercase tracking-widest mt-1">
          Trace each letter! ({completedLetters.size} / 26 Done)
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-indigo-50/40 rounded-full h-3 border border-indigo-100 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
          style={{ width: `${(completedLetters.size / 26) * 100}%` }}
        />
      </div>

      {/* Current letter label */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-black text-indigo-900/50 uppercase tracking-wider">
          Letter {currentIndex + 1} of 26
        </span>
        <span className="text-3xl font-black text-amber-700 bg-amber-50 border-2 border-amber-200 rounded-2xl px-5 py-1">
          {currentLetter}
        </span>
      </div>

      {/* Trace canvas for current letter */}
      <div className="w-full">
        <SimpleTraceCanvas
          key={currentLetter}
          letter={currentLetter}
          onComplete={handleTraceComplete}
        />
      </div>

      {/* Finish button when all done */}
      {allDone && (
        <button
          onClick={handleFinish}
          className="w-full max-w-xs inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-lg shadow-xl bg-emerald-500 hover:bg-emerald-600 text-white border-b-4 border-emerald-700 cursor-pointer active:scale-95 animate-pulse transition-all"
        >
          <CheckCircle size={22} /> All Done! 🎉
        </button>
      )}
    </div>
  );
}
