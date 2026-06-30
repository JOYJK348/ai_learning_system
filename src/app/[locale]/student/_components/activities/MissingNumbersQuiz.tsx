'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type SequenceQuestion = {
  sequence: (number | string)[]; // e.g. [14, 15, '?', 17, 18]
  answer: number;
  options: number[];
};

const QUESTIONS: SequenceQuestion[] = [
  { sequence: [4, 5, '?', 7, 8], answer: 6, options: [6, 3, 9] },
  { sequence: [32, '?', 34, 35, 36], answer: 33, options: [33, 30, 31] },
  { sequence: [68, 69, 70, '?', 72], answer: 71, options: [71, 74, 73] },
  { sequence: [95, 96, 97, 98, '?'], answer: 99, options: [99, 94, 100] },
  { sequence: [44, '?', 46, 47, 48], answer: 45, options: [45, 43, 49] },
];

export default function MissingNumbersQuiz({ onComplete }: Props) {
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
    const isCorrect = option === currentQ.answer;

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
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Number Legend!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Spectacular! You found all the missing numbers perfectly! 🌟
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
          🚂 Missing Number Train
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1 leading-tight">
          What number goes in the '?' box?
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

      {/* Train Sequence Layout (Mobile-first wrapped) */}
      <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2rem] p-4 shadow-md flex flex-col items-center gap-3">
        <span className="text-[10px] font-black text-amber-900/40 uppercase tracking-wider">
          NUMBER SEQUENCE
        </span>

        {/* Train cells */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 w-full py-1">
          {currentQ.sequence.map((num, idx) => {
            const isQuestion = num === '?';
            
            let cellStyle = 'bg-white border-indigo-100 text-indigo-950';
            if (isQuestion) {
              if (showCorrect) {
                cellStyle = 'bg-emerald-500 border-emerald-600 text-white font-sans scale-105';
              } else if (showWrong) {
                cellStyle = 'bg-red-500 border-red-650 text-white font-sans shake scale-105';
              } else {
                cellStyle = 'bg-indigo-50 border-dashed border-indigo-400 text-indigo-600 animate-pulse';
              }
            }

            return (
              <div
                key={idx}
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border-2 flex items-center justify-center text-lg sm:text-xl font-black font-sans shadow-sm transition-all leading-none ${cellStyle}`}
              >
                {isQuestion ? (showCorrect ? currentQ.answer : showWrong ? selectedAns : '?') : num}
              </div>
            );
          })}
        </div>
      </div>

      {/* Options Cards */}
      <div className="w-full grid grid-cols-3 gap-3 mt-1">
        {shuffledOptions.map((opt) => {
          const isSelected = selectedAns === opt;
          const isCorrect = opt === currentQ.answer;

          let btnStyle = 'border-indigo-100 bg-white border-b-4 hover:border-indigo-200';
          if (isSelected && isCorrect) {
            btnStyle = 'border-emerald-550 bg-emerald-50 text-emerald-700 shadow-inner scale-103 border-b-2';
          } else if (isSelected && !isCorrect) {
            btnStyle = 'border-red-550 bg-red-50 text-red-700 border-b-2 shake';
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
            ⭐ Spot on! Perfect matching!
          </p>
        ) : showWrong ? (
          <p className="text-xs font-black text-red-500 uppercase tracking-wider">
            🙅 Incorrect number! Try again!
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <HelpCircle size={11} /> Find the missing number to complete the train!
          </p>
        )}
      </div>
    </div>
  );
}
