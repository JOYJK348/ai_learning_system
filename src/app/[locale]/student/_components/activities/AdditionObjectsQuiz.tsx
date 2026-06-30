'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type AdditionObjQuestion = {
  emoji: string;
  leftCount: number;
  rightCount: number;
  name: string;
  options: number[];
};

const QUESTIONS: AdditionObjQuestion[] = [
  { emoji: '🍎', leftCount: 2, rightCount: 3, name: 'Apples', options: [5, 4, 6] },
  { emoji: '🍪', leftCount: 4, rightCount: 2, name: 'Cookies', options: [6, 5, 7] },
  { emoji: '🐸', leftCount: 3, rightCount: 3, name: 'Frogs', options: [6, 5, 8] },
  { emoji: '🦋', leftCount: 5, rightCount: 2, name: 'Butterflies', options: [7, 6, 8] },
  { emoji: '🎈', leftCount: 6, rightCount: 4, name: 'Balloons', options: [10, 9, 8] },
];

export default function AdditionObjectsQuiz({ onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [tappedLeft, setTappedLeft] = useState<number[]>([]);
  const [tappedRight, setTappedRight] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentQ = QUESTIONS[currentIdx];

  const totalCount = currentQ.leftCount + currentQ.rightCount;

  const shuffledOptions = useMemo(() => {
    if (!currentQ) return [];
    const a = [...currentQ.options];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }, [currentIdx, currentQ]);

  const handleLeftTap = (idx: number) => {
    if (showCorrect || showWrong) return;
    setTappedLeft(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const handleRightTap = (idx: number) => {
    if (showCorrect || showWrong) return;
    setTappedRight(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const handleOptionTap = (option: number) => {
    if (selectedAns !== null || showWrong || showCorrect || done) return;

    setSelectedAns(option);
    const isCorrect = option === totalCount;

    if (isCorrect) {
      setScore(s => s + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        setSelectedAns(null);
        setTappedLeft([]);
        setTappedRight([]);
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
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Addition Master!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Spectacular! You combined the objects and found the sums! 🌟
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
          🍯 Double Jar Addition
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1 leading-tight">
          Combine the jars and find the total!
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

      {/* Double Jar Layout */}
      <div className="w-full grid grid-cols-2 gap-3">
        {/* Left Jar */}
        <div className="bg-[#fcf8f0] border-4 border-amber-250 rounded-[2.5rem] p-3 shadow-sm flex flex-col items-center gap-2 relative">
          <span className="text-[9px] font-black text-amber-800/40 uppercase tracking-wider">
            JAR A ({currentQ.leftCount})
          </span>
          <div className="grid grid-cols-2 gap-2 bg-white rounded-2xl border border-indigo-50/50 w-full min-h-[5rem] p-2 items-center justify-center">
            {Array.from({ length: currentQ.leftCount }).map((_, idx) => {
              const isTapped = tappedLeft.includes(idx);
              return (
                <button
                  key={idx}
                  onClick={() => handleLeftTap(idx)}
                  className={`aspect-square rounded-xl border flex items-center justify-center text-xl relative transition-all cursor-pointer active:scale-90
                    ${isTapped ? 'bg-indigo-50 border-indigo-400 shadow-inner' : 'bg-slate-50/30 border-slate-100'}`}
                >
                  <span className={isTapped ? 'opacity-40' : ''}>{currentQ.emoji}</span>
                  {isTapped && <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-indigo-700 bg-indigo-50/80 rounded-xl">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Jar */}
        <div className="bg-[#fcf8f0] border-4 border-amber-250 rounded-[2.5rem] p-3 shadow-sm flex flex-col items-center gap-2 relative">
          <span className="text-[9px] font-black text-amber-800/40 uppercase tracking-wider">
            JAR B ({currentQ.rightCount})
          </span>
          <div className="grid grid-cols-2 gap-2 bg-white rounded-2xl border border-indigo-50/50 w-full min-h-[5rem] p-2 items-center justify-center">
            {Array.from({ length: currentQ.rightCount }).map((_, idx) => {
              const isTapped = tappedRight.includes(idx);
              return (
                <button
                  key={idx}
                  onClick={() => handleRightTap(idx)}
                  className={`aspect-square rounded-xl border flex items-center justify-center text-xl relative transition-all cursor-pointer active:scale-90
                    ${isTapped ? 'bg-indigo-50 border-indigo-400 shadow-inner' : 'bg-slate-50/30 border-slate-100'}`}
                >
                  <span className={isTapped ? 'opacity-40' : ''}>{currentQ.emoji}</span>
                  {isTapped && <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-indigo-700 bg-indigo-50/80 rounded-xl">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sum Label */}
      <div className="text-xl font-black text-indigo-950">
        {currentQ.leftCount} + {currentQ.rightCount} = {selectedAns !== null ? selectedAns : '?'}
      </div>

      {/* Options Cards */}
      <div className="w-full grid grid-cols-3 gap-3 mt-1">
        {shuffledOptions.map((opt) => {
          const isSelected = selectedAns === opt;
          const isCorrect = opt === totalCount;

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
            ⭐ Spot on! Perfect addition!
          </p>
        ) : showWrong ? (
          <p className="text-xs font-black text-red-500 uppercase tracking-wider">
            🙅 Wrong total! Try again!
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <HelpCircle size={11} /> Count items in Jar A and Jar B, then find total!
          </p>
        )}
      </div>
    </div>
  );
}
