'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type BondQuestion = {
  target: number;
  part1: number;
  part2Answer: number;
  options: number[];
};

const QUESTIONS: BondQuestion[] = [
  { target: 10, part1: 7, part2Answer: 3, options: [3, 2, 4] },
  { target: 10, part1: 5, part2Answer: 5, options: [5, 4, 6] },
  { target: 5, part1: 2, part2Answer: 3, options: [3, 1, 4] },
  { target: 10, part1: 8, part2Answer: 2, options: [2, 1, 3] },
  { target: 10, part1: 6, part2Answer: 4, options: [4, 3, 5] },
];

export default function NumberBondsQuiz({ onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

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

  const handleOptionTap = (option: number) => {
    if (selectedAns !== null || showWrong || showCorrect || done) return;

    setSelectedAns(option);
    const isCorrect = option === currentQ.part2Answer;

    if (isCorrect) {
      setScore(s => s + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        setSelectedAns(null);
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
        setSelectedAns(null);
      }, 850);
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
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Number Bond Master!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Spectacular! You found the missing pairs to complete all bonds! 🌟
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
    <div key={currentIdx} className="flex flex-col items-center gap-4 px-3 py-2 w-full max-w-sm mx-auto kids-font select-none">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font { font-family: 'Baloo 2', 'Fredoka', sans-serif !important; }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
        .shake { animation: shake 0.4s ease-in-out; }
      `}} />

      {/* Header */}
      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🌈 Number Bonds
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1 leading-tight">
          Find the missing partner for {currentQ.target}!
        </h3>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-1.5 bg-indigo-50/50 px-4 py-1 rounded-full border border-indigo-100/30">
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

      {/* Number Bond Tree Diagram */}
      <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2rem] p-5 shadow-md flex flex-col items-center relative">
        <span className="text-[10px] font-black text-amber-900/40 uppercase tracking-wider mb-2">
          BOND PARTNERS
        </span>

        {/* Bond Graph */}
        <div className="flex flex-col items-center w-full gap-4 relative">
          
          {/* Target Bubble */}
          <div className="w-14 h-14 rounded-full bg-indigo-600 border-2 border-indigo-500 flex items-center justify-center text-white text-2xl font-black shadow-md z-10 font-sans">
            {currentQ.target}
          </div>

          {/* Diagonal Connecting Lines using standard borders */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-28 h-6 border-t-2 border-dashed border-amber-905/30 z-0 flex justify-between">
            <div className="w-[1.5px] h-6 bg-amber-900/20 rotate-[25deg] origin-top-left" />
            <div className="w-[1.5px] h-6 bg-amber-900/20 -rotate-[25deg] origin-top-right" />
          </div>

          {/* Child Partners Row */}
          <div className="flex justify-between w-40 z-10">
            {/* Part 1 (Given) */}
            <div className="w-12 h-12 rounded-full bg-white border-2 border-indigo-100 flex items-center justify-center text-indigo-950 text-xl font-black shadow-sm font-sans">
              {currentQ.part1}
            </div>

            {/* Part 2 (Missing) */}
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl font-black shadow-sm font-sans transition-all leading-none
              ${showCorrect 
                ? 'bg-emerald-500 border-emerald-600 text-white scale-105' 
                : showWrong 
                  ? 'bg-red-500 border-red-650 text-white shake scale-105' 
                  : 'bg-indigo-50 border-dashed border-indigo-400 text-indigo-600 animate-pulse'}`}
            >
              {showCorrect ? currentQ.part2Answer : showWrong ? selectedAns : '?'}
            </div>
          </div>
        </div>
      </div>

      {/* Options Cards */}
      <div className="w-full grid grid-cols-3 gap-3 mt-1">
        {shuffledOptions.map((opt) => {
          const isSelected = selectedAns === opt;
          const isCorrect = opt === currentQ.part2Answer;

          let btnStyle = 'border-indigo-100 bg-white border-b-4 hover:border-indigo-200';
          if (isSelected && isCorrect) {
            btnStyle = 'border-emerald-555 bg-emerald-50 text-emerald-700 shadow-inner scale-103 border-b-2';
          } else if (isSelected && !isCorrect) {
            btnStyle = 'border-red-555 bg-red-50 text-red-700 border-b-2 shake';
          }

          return (
            <button
              key={opt}
              onClick={() => handleOptionTap(opt)}
              disabled={selectedAns !== null}
              className={`h-14 rounded-2xl border-2 flex items-center justify-center text-2xl font-black font-sans shadow-md select-none transition-all cursor-pointer ${btnStyle}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Helper text */}
      <div className="min-h-[20px] flex items-center justify-center text-center">
        {showCorrect ? (
          <p className="text-xs font-black text-emerald-600 uppercase tracking-wider">
            ⭐ Spot on! Bond complete!
          </p>
        ) : showWrong ? (
          <p className="text-xs font-black text-red-500 uppercase tracking-wider">
            🙅 Wrong partner! Try again!
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <HelpCircle size={11} /> Find the number that adds with {currentQ.part1} to make {currentQ.target}!
          </p>
        )}
      </div>
    </div>
  );
}
