'use client';

import React, { useState, useRef } from 'react';
import { BookOpen, Check } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type VowelDetail = {
  char: string;
  emoji: string;
  word: string;
  colorClass: string;
  borderColor: string;
  bgClass: string;
  description: string;
};

const VOWEL_ITEMS: VowelDetail[] = [
  { 
    char: 'A', 
    emoji: '🍎', 
    word: 'APPLE', 
    colorClass: 'text-rose-600',
    borderColor: 'border-rose-200', 
    bgClass: 'bg-rose-50/50',
    description: 'An apple is a sweet, crunchy fruit! Tapping "A" starts the word "APPLE".'
  },
  { 
    char: 'E', 
    emoji: '🥚', 
    word: 'EGG', 
    colorClass: 'text-amber-600',
    borderColor: 'border-amber-200', 
    bgClass: 'bg-amber-50/50',
    description: 'Eggs are healthy and round! Tapping "E" starts the word "EGG".'
  },
  { 
    char: 'I', 
    emoji: '🍦', 
    word: 'ICE CREAM', 
    colorClass: 'text-emerald-600',
    borderColor: 'border-emerald-200', 
    bgClass: 'bg-emerald-50/50',
    description: 'Ice cream is a sweet, cold treat! Tapping "I" starts the word "ICE CREAM".'
  },
  { 
    char: 'O', 
    emoji: '🐙', 
    word: 'OCTOPUS', 
    colorClass: 'text-sky-600',
    borderColor: 'border-sky-200', 
    bgClass: 'bg-sky-50/50',
    description: 'An octopus lives under the sea! Tapping "O" starts the word "OCTOPUS".'
  },
  { 
    char: 'U', 
    emoji: '☂️', 
    word: 'UMBRELLA', 
    colorClass: 'text-purple-600',
    borderColor: 'border-purple-200', 
    bgClass: 'bg-purple-50/50',
    description: 'An umbrella keeps us dry in the rain! Tapping "U" starts the word "UMBRELLA".'
  },
];

export default function VowelShowcase({ onComplete }: Props) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [visited, setVisited] = useState<Set<string>>(new Set(['A'])); // starts with A visited
  const startTime = useRef(Date.now());

  const handleCardTap = (idx: number, char: string) => {
    setActiveIdx(idx);
    const next = new Set(visited);
    next.add(char);
    setVisited(next);
  };

  const allVisited = visited.size === VOWEL_ITEMS.length;
  const currentItem = VOWEL_ITEMS[activeIdx];

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-5 px-2 sm:px-4 py-2 sm:py-4 w-full max-w-sm sm:max-w-md mx-auto kids-font select-none">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font {
          font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
        }
      `}} />

      {/* Header Info */}
      <div className="text-center">
        <span className="text-[9px] sm:text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🎓 Montessori Vowel Board
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1.5 sm:mt-2">
          Learn the 5 Special Vowels!
        </h3>
      </div>

      {/* Vowels Flashcard Selection Row */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2 w-full mt-1 px-1">
        {VOWEL_ITEMS.map((item, idx) => {
          const isActive = activeIdx === idx;
          const isVisited = visited.has(item.char);
          
          let cardStyle = 'border-slate-100 bg-white border-b-4 hover:border-slate-200';
          if (isActive) {
            cardStyle = 'border-indigo-500 bg-indigo-50/30 scale-105 border-b-[6px] shadow-md ring-2 ring-indigo-200';
          } else if (isVisited) {
            cardStyle = 'border-emerald-200 bg-emerald-50/20 border-b-4';
          }

          return (
            <button
              key={item.char}
              onClick={() => handleCardTap(idx, item.char)}
              className={`aspect-[3/4] rounded-xl sm:rounded-2xl border-2 flex flex-col items-center justify-between p-1.5 sm:p-2.5 transition-all cursor-pointer ${cardStyle}`}
            >
              {/* Vowel Letter */}
              <span className={`text-lg sm:text-2xl font-black font-sans leading-none mt-0.5 select-none ${isActive ? 'text-indigo-655' : 'text-slate-800'}`}>
                {item.char}
              </span>
              
              {/* Visited Check or Dot */}
              <div className="h-4 flex items-center justify-center">
                {isVisited ? (
                  <div className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[8px] font-bold">
                    <Check size={8} strokeWidth={4} />
                  </div>
                ) : (
                  <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-slate-200" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Rich Focus Content Board */}
      <div className={`w-full p-4 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] border-2 border-b-6 sm:border-b-8 bg-white shadow-xl flex flex-col items-center text-center gap-3 sm:gap-4 transition-all duration-150 ${currentItem.borderColor}`}>
        <div className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-5xl sm:text-6xl shadow-inner border-2 ${currentItem.borderColor} ${currentItem.bgClass}`}>
          {currentItem.emoji}
        </div>
        
        <div>
          <h4 className={`text-2xl sm:text-3xl font-black font-sans tracking-wide leading-none ${currentItem.colorClass}`}>
            {currentItem.char}
          </h4>
          <p className="text-[10px] sm:text-xs font-black text-indigo-950/40 uppercase tracking-widest mt-1">
            is for <span className={currentItem.colorClass}>{currentItem.word}</span>
          </p>
        </div>

        <p className="text-xs sm:text-sm font-bold text-indigo-950/70 leading-relaxed font-sans px-2 leading-tight sm:leading-relaxed">
          {currentItem.description}
        </p>
      </div>

      {/* Bottom completion button */}
      <div className="w-full mt-1 sm:mt-2 h-14 sm:h-16 flex items-center justify-center">
        {allVisited ? (
          <button
            onClick={() => onComplete({
              score: 100, max_score: 100,
              completion_data: { read: true },
              time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
            })}
            className="w-full max-w-xs inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-base sm:text-lg shadow-xl border-b-4 border-emerald-700 active:scale-95 cursor-pointer"
          >
            I Learned the Vowels! ➡️
          </button>
        ) : (
          <p className="text-[9px] sm:text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <BookOpen size={10} /> Tap all 5 vowel cards above to read them! ({visited.size}/5)
          </p>
        )}
      </div>
    </div>
  );
}
