'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';
import { shuffle } from '@/core/data/letterData';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type CountingQuestion = {
  itemEmoji: string;
  count: number;
  itemName: string;
  options: string[];
};

const QUESTIONS: CountingQuestion[] = [
  { itemEmoji: '🍪', count: 8, itemName: 'Cookies', options: ['8', '7', '9'] },
  { itemEmoji: '🍓', count: 12, itemName: 'Strawberries', options: ['12', '10', '14'] },
  { itemEmoji: '🎈', count: 15, itemName: 'Balloons', options: ['15', '13', '17'] },
  { itemEmoji: '🧁', count: 18, itemName: 'Cupcakes', options: ['18', '16', '20'] },
  { itemEmoji: '🦁', count: 7, itemName: 'Lions', options: ['7', '6', '8'] },
];

export default function CountingObjectsQuiz({ onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  // Track which item indices have been tapped/counted by the kid
  const [tappedIndices, setTappedIndices] = useState<number[]>([]);

  const currentQ = QUESTIONS[currentIdx];

  const shuffledOptions = useMemo(() => {
    if (!currentQ) return [];
    const a = [...currentQ.options];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }, [currentIdx, currentQ]);

  // Generate an array of size currentQ.count to map items
  const itemsArray = useMemo(() => {
    return Array.from({ length: currentQ.count });
  }, [currentQ]);

  const handleItemTap = (idx: number) => {
    if (showCorrect || showWrong) return;
    setTappedIndices(prev => {
      if (prev.includes(idx)) {
        return prev.filter(i => i !== idx);
      } else {
        return [...prev, idx];
      }
    });
  };

  const handleOptionTap = (option: string) => {
    if (selectedWord !== null || showWrong || showCorrect || done) return;

    setSelectedWord(option);
    const isCorrect = parseInt(option) === currentQ.count;

    if (isCorrect) {
      setScore(s => s + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        setSelectedWord(null);
        setTappedIndices([]);
        if (currentIdx < QUESTIONS.length - 1) {
          setCurrentIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 1300);
    } else {
      setShowWrong(true);
      setTimeout(() => {
        setShowWrong(false);
        setSelectedWord(null);
      }, 800);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-6 px-6 py-10 kids-font">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
          .kids-font { font-family: 'Baloo 2', 'Fredoka', sans-serif !important; }
        `}} />
        <span className="text-8xl select-none">🏆</span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Counting Champ!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Spectacular! You counted all items in the jars correctly! 🌟
        </p>
        <button
          onClick={() => onComplete({
            score: Math.round((score / QUESTIONS.length) * 100), max_score: 100,
            completion_data: { score, total: QUESTIONS.length },
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
    <div key={currentIdx} className="flex flex-col items-center gap-5 px-4 py-4 w-full max-w-sm mx-auto kids-font select-none">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font { font-family: 'Baloo 2', 'Fredoka', sans-serif !important; }
      `}} />

      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🫙 Montessori Counting Jar
        </span>
        <h3 className="text-2xl font-black text-indigo-950 mt-2 leading-tight">
          Tap items to count them!
        </h3>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-2 bg-indigo-50/50 px-4 py-1.5 rounded-full border border-indigo-100/30">
        {QUESTIONS.map((_, i) => (
          <div key={i}
            className={`w-3.5 h-3.5 rounded-full border shadow-sm transition-all duration-300 flex items-center justify-center text-[7px] font-black
              ${i < currentIdx 
                ? 'bg-emerald-500 text-white border-emerald-400' 
                : i === currentIdx 
                  ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-300' 
                  : 'bg-white text-slate-300 border-slate-200'}`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* Montessori Counting Jar/Box Display */}
      <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2.5rem] p-6 shadow-md flex flex-col items-center gap-4 relative">
        <span className="text-xs font-black text-amber-900/40 uppercase tracking-wider">
          COUNT THE {currentQ.itemName.toUpperCase()}
        </span>

        {/* Jar Grid container */}
        <div className="grid grid-cols-5 gap-3.5 p-4 bg-white/80 rounded-3xl border-2 border-indigo-50/50 shadow-inner w-full min-h-[9rem] items-center justify-center">
          {itemsArray.map((_, idx) => {
            const isTapped = tappedIndices.includes(idx);
            // Get order of tap for counting badge
            const tapOrder = tappedIndices.indexOf(idx) + 1;

            return (
              <button
                key={idx}
                onClick={() => handleItemTap(idx)}
                className={`aspect-square rounded-xl border flex items-center justify-center text-3xl relative select-none transition-all cursor-pointer active:scale-90
                  ${isTapped 
                    ? 'bg-indigo-50 border-indigo-400 shadow-inner' 
                    : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'}`}
              >
                <span className={isTapped ? 'opacity-40' : ''}>
                  {currentQ.itemEmoji}
                </span>
                
                {/* Number indicator */}
                {isTapped && (
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-indigo-700 bg-indigo-50/75 rounded-xl border-2 border-indigo-400">
                    {tapOrder}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Current Count Helper */}
        <div className="text-xs font-bold text-indigo-950/50">
          Current Count: <span className="font-black text-indigo-650">{tappedIndices.length}</span>
        </div>
      </div>

      {/* Options Row */}
      <div className="grid grid-cols-3 gap-4 w-full mt-1">
        {shuffledOptions.map((opt) => {
          const isSelected = selectedWord === opt;
          const isCorrect = parseInt(opt) === currentQ.count;

          let btnStyle = 'border-indigo-100 bg-white border-b-4 hover:border-indigo-200';
          if (isSelected && isCorrect) {
            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-inner scale-103 border-b-2';
          } else if (isSelected && !isCorrect) {
            btnStyle = 'border-red-500 bg-red-50 text-red-700 animate-[shake_0.4s_ease-in-out] border-b-2';
          }

          return (
            <button
              key={opt}
              onClick={() => handleOptionTap(opt)}
              disabled={selectedWord !== null}
              className={`h-14 rounded-2xl border-2 flex items-center justify-center text-2xl font-black font-sans shadow-md select-none transition-all cursor-pointer ${btnStyle}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Helper text */}
      <div className="min-h-[24px] flex items-center justify-center text-center">
        {showCorrect ? (
          <p className="text-sm font-black text-emerald-600 uppercase tracking-wider">
            ⭐ Spot on! The total count is {currentQ.count}!
          </p>
        ) : showWrong ? (
          <p className="text-sm font-black text-red-500 uppercase tracking-wider">
            🙅 Oops! That is not the correct total!
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <HelpCircle size={12} /> Tap each item to count, then choose the total!
          </p>
        )}
      </div>
    </div>
  );
}
