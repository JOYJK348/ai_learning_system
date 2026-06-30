'use client';

import React, { useState, useRef, useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import { getLetterData } from '@/core/data/letterData';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

// All 21 consonant letters in English
const CONSONANTS = [
  'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 
  'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'
];

export default function ConsonantShowcase({ onComplete }: Props) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [visited, setVisited] = useState<Set<string>>(new Set(['B'])); // starts with B visited
  const startTime = useRef(Date.now());

  // Resolve details dynamically from letterData
  const items = useMemo(() => {
    return CONSONANTS.map((char) => {
      const data = getLetterData(char);
      return {
        char,
        emoji: data.emoji,
        word: data.word.toUpperCase(),
        colorClass: char === 'B' || char === 'F' || char === 'N' || char === 'V' ? 'text-rose-600' :
                    char === 'C' || char === 'G' || char === 'P' || char === 'W' ? 'text-amber-600' :
                    char === 'D' || char === 'H' || char === 'Q' || char === 'X' ? 'text-emerald-600' :
                    char === 'J' || char === 'L' || char === 'R' || char === 'Y' ? 'text-sky-600' : 'text-purple-600',
        borderColor: char === 'B' || char === 'F' || char === 'N' || char === 'V' ? 'border-rose-200' :
                     char === 'C' || char === 'G' || char === 'P' || char === 'W' ? 'border-amber-200' :
                     char === 'D' || char === 'H' || char === 'Q' || char === 'X' ? 'border-emerald-200' :
                     char === 'J' || char === 'L' || char === 'R' || char === 'Y' ? 'border-sky-200' : 'border-purple-200',
        bgClass: char === 'B' || char === 'F' || char === 'N' || char === 'V' ? 'bg-rose-50/50' :
                 char === 'C' || char === 'G' || char === 'P' || char === 'W' ? 'bg-amber-50/50' :
                 char === 'D' || char === 'H' || char === 'Q' || char === 'X' ? 'bg-emerald-50/50' :
                 char === 'J' || char === 'L' || char === 'R' || char === 'Y' ? 'bg-sky-50/50' : 'bg-purple-50/50',
        description: `"${char}" is a consonant letter. Tapping "${char}" starts the word "${data.word.toUpperCase()}"!`
      };
    });
  }, []);

  const handleCardTap = (idx: number, char: string) => {
    setActiveIdx(idx);
    const next = new Set(visited);
    next.add(char);
    setVisited(next);
  };

  const currentItem = items[activeIdx];
  const requiredCount = 7; // Require kids to tap at least 7 consonants to complete
  const progressReached = visited.size >= requiredCount;

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 px-1 sm:px-4 py-2 w-full max-w-sm sm:max-w-md mx-auto kids-font select-none">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font {
          font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
        }
      `}} />

      {/* Header Info */}
      <div className="text-center">
        <span className="text-[9px] sm:text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🎓 Consonant Alphabet Board
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1.5 leading-none">
          Meet all 21 Consonants!
        </h3>
      </div>

      {/* 21 Consonants Grid (7 columns x 3 rows) */}
      <div className="grid grid-cols-7 gap-1 w-full mt-1 px-1">
        {items.map((item, idx) => {
          const isActive = activeIdx === idx;
          const isVisited = visited.has(item.char);
          
          let cardStyle = 'border-slate-100 bg-white border-b-2 hover:border-slate-200';
          if (isActive) {
            cardStyle = 'border-indigo-500 bg-indigo-55/20 border-b-[3px] shadow-sm ring-2 ring-indigo-200';
          } else if (isVisited) {
            cardStyle = 'border-emerald-250 bg-emerald-50/20 border-b-2';
          }

          return (
            <button
              key={item.char}
              onClick={() => handleCardTap(idx, item.char)}
              className={`aspect-square rounded-xl border flex flex-col items-center justify-center p-1 transition-all cursor-pointer ${cardStyle}`}
            >
              <span className={`text-base sm:text-xl font-black font-sans leading-none select-none ${isActive ? 'text-indigo-650' : 'text-slate-800'}`}>
                {item.char}
              </span>
              
              {/* Mini Visited indicator dot */}
              <div className="w-1.5 h-1.5 rounded-full mt-1" 
                style={{ backgroundColor: isVisited ? '#10b981' : '#e2e8f0' }}
              />
            </button>
          );
        })}
      </div>

      {/* Rich Focus Content Board */}
      <div className={`w-full p-4 sm:p-5 rounded-[2rem] border-2 border-b-6 bg-white shadow-md flex flex-col items-center text-center gap-2.5 sm:gap-3 transition-all duration-150 ${currentItem.borderColor}`}>
        <div className={`w-18 h-18 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-4xl sm:text-5xl shadow-inner border-2 ${currentItem.borderColor} ${currentItem.bgClass}`}>
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

        <p className="text-xs sm:text-sm font-bold text-indigo-950/70 leading-relaxed font-sans px-2 leading-tight">
          {currentItem.description}
        </p>
      </div>

      {/* Bottom completion button */}
      <div className="w-full mt-1 h-12 flex items-center justify-center">
        {progressReached ? (
          <button
            onClick={() => onComplete({
              score: 100, max_score: 100,
              completion_data: { read: true },
              time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
            })}
            className="w-full max-w-xs inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-base shadow-xl border-b-4 border-emerald-700 active:scale-95 cursor-pointer"
          >
            I Learned the Consonants! ➡️
          </button>
        ) : (
          <p className="text-[9px] sm:text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <BookOpen size={10} /> Tap {requiredCount - visited.size} more consonants to finish! ({visited.size}/{CONSONANTS.length})
          </p>
        )}
      </div>
    </div>
  );
}
