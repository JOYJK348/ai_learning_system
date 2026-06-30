'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle, Star } from 'lucide-react';
import { shuffle } from '@/core/data/letterData';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type LetterBubble = {
  id: string;
  char: string;
  isVowel: boolean;
  exampleEmoji: string;
  exampleWord: string;
};

const BUBBLE_POOL: LetterBubble[] = [
  { id: 'v1', char: 'A', isVowel: true, exampleEmoji: '🍎', exampleWord: 'Apple' },
  { id: 'c1', char: 'B', isVowel: false, exampleEmoji: '⚽', exampleWord: 'Ball' },
  { id: 'v2', char: 'E', isVowel: true, exampleEmoji: '🥚', exampleWord: 'Egg' },
  { id: 'c2', char: 'C', isVowel: false, exampleEmoji: '🐱', exampleWord: 'Cat' },
  { id: 'v3', char: 'I', isVowel: true, exampleEmoji: '🍦', exampleWord: 'Ice Cream' },
  { id: 'c3', char: 'D', isVowel: false, exampleEmoji: '🐶', exampleWord: 'Dog' },
  { id: 'v4', char: 'O', isVowel: true, exampleEmoji: '🐙', exampleWord: 'Octopus' },
  { id: 'c4', char: 'F', isVowel: false, exampleEmoji: '🐟', exampleWord: 'Fish' },
  { id: 'v5', char: 'U', isVowel: true, exampleEmoji: '☂️', exampleWord: 'Umbrella' },
];

export default function VowelCollectorQuiz({ onComplete }: Props) {
  const [score, setScore] = useState(0);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  // Shuffle grid items once on start
  const gridBubbles = useMemo(() => {
    return shuffle([...BUBBLE_POOL]);
  }, []);

  const totalVowels = useMemo(() => {
    return BUBBLE_POOL.filter(b => b.isVowel).length;
  }, []);

  const handleBubbleTap = (bubble: LetterBubble) => {
    if (selectedIds.has(bubble.id) || wrongId || done) return;

    if (bubble.isVowel) {
      const nextSelected = new Set(selectedIds);
      nextSelected.add(bubble.id);
      setSelectedIds(nextSelected);
      setScore(s => s + 1);

      // Check if all vowels are found
      if (nextSelected.size === totalVowels) {
        setTimeout(() => {
          setDone(true);
        }, 1200);
      }
    } else {
      setWrongId(bubble.id);
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
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Vowel Expert!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Awesome! You found all 5 vowels: A, E, I, O, U! 🌟
        </p>
        <button
          onClick={() => onComplete({
            score: 100, max_score: 100,
            completion_data: { score, total: totalVowels },
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
          🧩 Vowel Collector Quest
        </span>
        <h3 className="text-2xl font-black text-indigo-950 mt-2">
          Find and tap all the <span className="text-indigo-650">Vowels</span>!
        </h3>
      </div>

      {/* Target counts / Stars */}
      <div className="flex items-center gap-2 bg-indigo-50/50 px-4 py-1.5 rounded-full border border-indigo-100/30">
        <span className="text-[10px] font-black text-indigo-950 uppercase tracking-widest flex items-center gap-1.5">
          Stars: {selectedIds.size} / {totalVowels} <Star size={12} className="text-amber-500 fill-amber-500" />
        </span>
      </div>

      {/* 3x3 Letter Grid Board */}
      <div className="grid grid-cols-3 gap-4 w-full mt-2">
        {gridBubbles.map((bubble) => {
          const isMatched = selectedIds.has(bubble.id);
          const isWrong = wrongId === bubble.id;

          let cardStyle = 'border-indigo-100 bg-white border-b-4 hover:border-indigo-200';
          if (isMatched) cardStyle = 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-inner';
          else if (isWrong) cardStyle = 'border-red-500 bg-red-50 text-red-700 animate-[shake_0.4s_ease-in-out]';

          return (
            <button
              key={bubble.id}
              onClick={() => handleBubbleTap(bubble)}
              disabled={isMatched}
              className={`aspect-square rounded-3xl border-2 flex flex-col items-center justify-center p-2.5 transition-all shadow-md cursor-pointer ${cardStyle}`}
            >
              <span className="text-3xl font-black font-sans uppercase select-none">{bubble.char}</span>
              {isMatched ? (
                <div className="flex flex-col items-center mt-1">
                  <span className="text-xl select-none leading-none">{bubble.exampleEmoji}</span>
                  <span className="text-[8px] font-black text-emerald-600 uppercase tracking-wide leading-none mt-1">
                    {bubble.exampleWord}
                  </span>
                </div>
              ) : (
                <span className="text-[8px] font-black text-indigo-950/30 uppercase tracking-widest mt-1">
                  Letter
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Action Hints */}
      <div className="min-h-[24px] flex items-center justify-center text-center mt-2">
        {wrongId ? (
          <p className="text-sm font-black text-red-500 uppercase tracking-wider">
            🙅 Oops! That is a consonant, not a vowel!
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <HelpCircle size={12} /> Tap only the Vowels: A, E, I, O, U!
          </p>
        )}
      </div>
    </div>
  );
}
