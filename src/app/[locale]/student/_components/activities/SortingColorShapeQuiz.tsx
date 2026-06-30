'use client';

import React, { useState, useRef } from 'react';
import { HelpCircle } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type SortQuestion = {
  question: string;
  itemEmoji: string;
  itemName: string;
  basketA: string;
  basketB: string;
  correctBasket: 'A' | 'B';
};

const QUESTIONS: SortQuestion[] = [
  {
    question: 'Sort the Red Apple 🍎 into the correct color basket!',
    itemEmoji: '🍎',
    itemName: 'Red Apple',
    basketA: 'Red Basket 🔴',
    basketB: 'Blue Basket 🔵',
    correctBasket: 'A',
  },
  {
    question: 'Sort the Square Clock 🟫 into the correct shape basket!',
    itemEmoji: '🟫',
    itemName: 'Square Clock',
    basketA: 'Circle Basket 🟢',
    basketB: 'Square Basket ⬛',
    correctBasket: 'B',
  },
  {
    question: 'Sort the Blue Balloon 🎈 into the correct color basket!',
    itemEmoji: '🎈',
    itemName: 'Blue Balloon',
    basketA: 'Red Basket 🔴',
    basketB: 'Blue Basket 🔵',
    correctBasket: 'B',
  },
  {
    question: 'Sort the Round Coin 🪙 into the correct shape basket!',
    itemEmoji: '🪙',
    itemName: 'Round Coin',
    basketA: 'Circle Basket 🟢',
    basketB: 'Square Basket ⬛',
    correctBasket: 'A',
  },
  {
    question: 'Sort the Orange Carrot 🥕 into the correct color basket!',
    itemEmoji: '🥕',
    itemName: 'Orange Carrot',
    basketA: 'Green Basket 🟢',
    basketB: 'Orange Basket 🟠',
    correctBasket: 'B',
  },
];

export default function SortingColorShapeQuiz({ onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedBasket, setSelectedBasket] = useState<'A' | 'B' | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentQ = QUESTIONS[currentIdx];

  const handleBasketTap = (basket: 'A' | 'B') => {
    if (selectedBasket !== null || showWrong || showCorrect || done) return;
    setSelectedBasket(basket);
    const isCorrect = basket === currentQ.correctBasket;
    if (isCorrect) {
      setScore(s => s + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        setSelectedBasket(null);
        if (currentIdx < QUESTIONS.length - 1) setCurrentIdx(i => i + 1);
        else setDone(true);
      }, 1300);
    } else {
      setShowWrong(true);
      setTimeout(() => {
        setShowWrong(false);
        setSelectedBasket(null);
      }, 850);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-6 px-6 py-10 kids-font">
        <style dangerouslySetInnerHTML={{__html:`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap'); .kids-font{font-family:'Baloo 2','Fredoka',sans-serif!important;}`}} />
        <span className="text-8xl select-none">🏆</span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase">Sorting Expert!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">You sorted all colors and shapes correctly! 🌟</p>
        <button onClick={() => onComplete({ score: Math.round((score/QUESTIONS.length)*100), max_score:100, completion_data:{score,total:QUESTIONS.length}, time_taken_seconds:Math.round((Date.now()-startTime.current)/1000) })}
          className="w-full max-w-xs px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-lg shadow-xl border-b-4 border-emerald-700 active:scale-95 cursor-pointer">
          Continue ➡️
        </button>
      </div>
    );
  }

  return (
    <div key={currentIdx} className="flex flex-col items-center gap-4 px-3 py-2 w-full max-w-sm mx-auto kids-font select-none">
      <style dangerouslySetInnerHTML={{__html:`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font{font-family:'Baloo 2','Fredoka',sans-serif!important;}
      `}} />

      {/* Header */}
      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🧺 Color & Shape Sorter
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1">{currentQ.question}</h3>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-1.5 bg-indigo-50/50 px-4 py-1 rounded-full border border-indigo-100/30">
        {QUESTIONS.map((_, i) => (
          <div key={i} className={`w-3.5 h-3.5 rounded-full border text-[7px] font-black flex items-center justify-center transition-all
            ${i<currentIdx?'bg-emerald-500 text-white border-emerald-400':i===currentIdx?'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-300':'bg-white text-slate-300 border-slate-200'}`}>{i+1}</div>
        ))}
      </div>

      {/* Central Item Display */}
      <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2rem] p-6 shadow-md flex flex-col items-center justify-center min-h-[9rem]">
        <div className="text-6xl p-4 bg-white/80 rounded-3xl border-2 border-amber-100/60 shadow-sm">
          {currentQ.itemEmoji}
        </div>
        <span className="text-xs font-black text-indigo-950/50 uppercase tracking-wider mt-2">{currentQ.itemName}</span>
      </div>

      {/* Basket selection buttons */}
      <div className="w-full grid grid-cols-2 gap-3">
        {([
          { key: 'A', name: currentQ.basketA },
          { key: 'B', name: currentQ.basketB }
        ] as const).map((basket) => {
          const isSelected = selectedBasket === basket.key;
          const isCorrect = basket.key === currentQ.correctBasket;
          let style = 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md border-b-4 border-b-slate-300 text-indigo-950';
          if (isSelected && isCorrect) style = 'border-emerald-500 bg-emerald-50 border-b-4 border-b-emerald-600 text-emerald-700 scale-102';
          else if (isSelected && !isCorrect) style = 'border-red-400 bg-red-50 border-b-2 text-red-700';

          return (
            <button key={basket.key} onClick={() => handleBasketTap(basket.key)} disabled={selectedBasket !== null}
              className={`rounded-3xl border-2 p-4 flex flex-col items-center justify-center shadow-sm cursor-pointer active:scale-95 transition-all text-sm font-black ${style} min-h-[70px]`}>
              <span>{basket.name}</span>
            </button>
          );
        })}
      </div>

      <div className="min-h-[20px] flex items-center justify-center">
        {showCorrect ? <p className="text-xs font-black text-emerald-600 uppercase tracking-wider">⭐ Correct! Sorted perfectly!</p>
          : showWrong ? <p className="text-xs font-black text-red-500 uppercase tracking-wider">🙅 That basket is not correct! Try again!</p>
          : <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1"><HelpCircle size={11}/> Group the item by tapping the matching basket!</p>}
      </div>
    </div>
  );
}
