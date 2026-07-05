'use client';

import React, { useState, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import { KidsTraceCanvas } from './KidsTraceCanvas';


const UYIR_LETTERS = ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ'];

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

export default function TamilUyirTraceBoard({ onComplete }: Props) {
  const [traceIndex, setTraceIndex] = useState(0);
  const [tracedLetters, setTracedLetters] = useState<Set<string>>(new Set());
  const startTime = useRef(Date.now());
  const currentLetter = UYIR_LETTERS[traceIndex];
  const allTraced = tracedLetters.size === UYIR_LETTERS.length;

  const handleTraceComplete = () => {
    const next = new Set(tracedLetters);
    next.add(currentLetter);
    setTracedLetters(next);
    if (traceIndex + 1 < UYIR_LETTERS.length) {
      setTraceIndex(traceIndex + 1);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto px-2 select-none">
      <div className="text-center">
        <h2 className="text-2xl font-black text-indigo-950 flex items-center justify-center gap-2">
          ✏️ உயிர் எழுத்து Trace Board
        </h2>
        <p className="text-xs font-black text-indigo-900/40 uppercase tracking-widest mt-1">
          Trace each vowel! ({tracedLetters.size} / {UYIR_LETTERS.length} Done)
        </p>
      </div>
      <div className="w-full bg-indigo-50/40 rounded-full h-3 border border-indigo-100 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
          style={{ width: `${(tracedLetters.size / UYIR_LETTERS.length) * 100}%` }}
        />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-black text-indigo-900/50 uppercase tracking-wider">
          Vowel {traceIndex + 1} of {UYIR_LETTERS.length}
        </span>
        <span className="text-3xl font-black text-amber-700 bg-amber-50 border-2 border-amber-200 rounded-2xl px-5 py-1">
          {currentLetter}
        </span>
      </div>
      <div className="w-full">
        <KidsTraceCanvas
          key={currentLetter}
          letter={currentLetter}
          onComplete={handleTraceComplete}
          language="tamil"
        />
      </div>

      {allTraced && (
        <button
          onClick={() => onComplete({
            score: 100,
            max_score: 100,
            completion_data: { traced_count: tracedLetters.size },
            time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
          })}
          className="w-full max-w-xs inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-lg shadow-xl bg-emerald-500 hover:bg-emerald-600 text-white border-b-4 border-emerald-700 cursor-pointer active:scale-95 animate-pulse transition-all"
        >
          <CheckCircle size={22} /> All Done! 🎉
        </button>
      )}
    </div>
  );
}
