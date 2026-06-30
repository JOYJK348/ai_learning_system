'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type CompareQuestion = {
  num1: number;
  num2: number;
  options: string[]; // ['>', '<', '=']
};

const QUESTIONS: CompareQuestion[] = [
  { num1: 9, num2: 12, options: ['>', '<', '='] },
  { num1: 15, num2: 6, options: ['>', '<', '='] },
  { num1: 18, num2: 18, options: ['>', '<', '='] },
  { num1: 4, num2: 11, options: ['>', '<', '='] },
  { num1: 13, num2: 9, options: ['>', '<', '='] },
];

export default function GreaterSmallerQuiz({ onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentQ = QUESTIONS[currentIdx];

  const correctAnswer = useMemo(() => {
    if (currentQ.num1 > currentQ.num2) return '>';
    if (currentQ.num1 < currentQ.num2) return '<';
    return '=';
  }, [currentQ]);

  const handleOptionTap = (option: string) => {
    if (selectedAns !== null || showWrong || showCorrect || done) return;

    setSelectedAns(option);
    const isCorrect = option === correctAnswer;

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
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Comparison Whiz!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Spectacular! You compared the numbers using comparison symbols! 🌟
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
          🐊 Hungry Crocodile Comparison
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1 leading-tight">
          Choose the correct symbol!
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

      {/* Comparison Board */}
      <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2rem] p-5 shadow-md flex flex-col items-center gap-3">
        <div className="flex items-center justify-center gap-4 w-full py-1">
          {/* Num 1 */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex flex-wrap gap-1 max-w-[80px] justify-center">
              {Array.from({ length: Math.min(currentQ.num1, 10) }).map((_, i) => (
                <div key={i} className="w-3.5 h-3.5 bg-indigo-500 rounded border border-indigo-600 shadow-sm" />
              ))}
            </div>
            <span className="text-3xl font-black text-indigo-950 font-sans">{currentQ.num1}</span>
          </div>

          {/* Crocodile Mouth Slot */}
          <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-3xl font-black shadow-inner leading-none
            ${showCorrect 
              ? 'bg-emerald-500 border-emerald-600 text-white scale-105' 
              : showWrong 
                ? 'bg-red-500 border-red-650 text-white shake scale-105' 
                : 'bg-indigo-50 border-dashed border-indigo-400 text-indigo-600 animate-pulse'}`}
          >
            {showCorrect ? correctAnswer : showWrong ? selectedAns : '?'}
          </div>

          {/* Num 2 */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex flex-wrap gap-1 max-w-[80px] justify-center">
              {Array.from({ length: Math.min(currentQ.num2, 10) }).map((_, i) => (
                <div key={i} className="w-3.5 h-3.5 bg-orange-500 rounded border border-orange-600 shadow-sm" />
              ))}
            </div>
            <span className="text-3xl font-black text-indigo-950 font-sans">{currentQ.num2}</span>
          </div>
        </div>
      </div>

      {/* Options Cards */}
      <div className="w-full grid grid-cols-3 gap-3 mt-1">
        {currentQ.options.map((opt) => {
          const isSelected = selectedAns === opt;
          const isCorrect = opt === correctAnswer;

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
              className={`h-14 rounded-2xl border-2 flex items-center justify-center text-3xl font-black font-sans shadow-md select-none transition-all cursor-pointer ${btnStyle}`}
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
            ⭐ Spot on! Perfect comparison!
          </p>
        ) : showWrong ? (
          <p className="text-xs font-black text-red-500 uppercase tracking-wider">
            🙅 Wrong symbol! Try again!
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <HelpCircle size={11} /> Crocodile mouth &gt; opens to the bigger number!
          </p>
        )}
      </div>
    </div>
  );
}
