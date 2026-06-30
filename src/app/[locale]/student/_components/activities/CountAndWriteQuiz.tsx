'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle, Check, Delete } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type QuizQuestion = {
  emoji: string;
  count: number;
  name: string;
};

const QUESTIONS: QuizQuestion[] = [
  { emoji: '🐸', count: 6, name: 'Frogs' },
  { emoji: '🦋', count: 12, name: 'Butterflies' },
  { emoji: '🍎', count: 9, name: 'Apples' },
  { emoji: '⭐️', count: 15, name: 'Stars' },
  { emoji: '🪙', count: 20, name: 'Coins' },
];

export default function CountAndWriteQuiz({ onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [writtenValue, setWrittenValue] = useState<string>('');
  
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [tappedItems, setTappedItems] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentQ = QUESTIONS[currentIdx];

  const itemsArray = useMemo(() => {
    return Array.from({ length: currentQ.count });
  }, [currentQ]);

  const handleItemTap = (idx: number) => {
    if (showCorrect || showWrong) return;
    setTappedItems(prev => {
      if (prev.includes(idx)) {
        return prev.filter(i => i !== idx);
      } else {
        return [...prev, idx];
      }
    });
  };

  const handleDigitTap = (digit: string) => {
    if (showCorrect || showWrong) return;
    setWrittenValue(prev => {
      if (prev.length >= 2) return prev; // max 2 digits
      return prev + digit;
    });
  };

  const handleBackspace = () => {
    if (showCorrect || showWrong) return;
    setWrittenValue(prev => prev.slice(0, -1));
  };

  const handleCheck = () => {
    if (showCorrect || showWrong || writtenValue === '') return;

    const isCorrect = parseInt(writtenValue) === currentQ.count;

    if (isCorrect) {
      setScore(s => s + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        setWrittenValue('');
        setTappedItems([]);
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
        setWrittenValue('');
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
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Math Superstar!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Spectacular! You counted the items and wrote all the numbers! 🌟
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
          📝 Count & Write Board
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1 leading-tight">
          Count and write the total!
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

      {/* Montessori Counting Jar */}
      <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2rem] p-3.5 shadow-md flex flex-col items-center gap-2">
        <span className="text-[10px] font-black text-amber-900/40 uppercase tracking-wider">
          COUNT THE {currentQ.name.toUpperCase()}
        </span>

        {/* Emojis count layout */}
        <div className="grid grid-cols-5 gap-2 p-2 bg-white rounded-2xl border border-indigo-50/50 w-full min-h-[7rem] items-center justify-center">
          {itemsArray.map((_, idx) => {
            const isTapped = tappedItems.includes(idx);
            const tapOrder = tappedItems.indexOf(idx) + 1;

            return (
              <button
                key={idx}
                onClick={() => handleItemTap(idx)}
                className={`aspect-square rounded-xl border flex items-center justify-center text-2xl relative select-none transition-all cursor-pointer active:scale-90
                  ${isTapped 
                    ? 'bg-indigo-50 border-indigo-400 shadow-inner' 
                    : 'bg-slate-50/40 border-slate-100'}`}
              >
                <span className={isTapped ? 'opacity-40' : ''}>
                  {currentQ.emoji}
                </span>

                {isTapped && (
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-indigo-700 bg-indigo-50/80 rounded-xl border border-indigo-400">
                    {tapOrder}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chalkboard Display Box (Centered Stacked Layout) */}
      <div className={`w-full flex flex-col items-center justify-center rounded-2xl border-4 py-2 shadow-inner transition-all duration-200
        ${showCorrect 
          ? 'bg-emerald-550 border-emerald-600 text-white' 
          : showWrong 
            ? 'bg-red-550 border-red-650 text-white shake' 
            : 'bg-indigo-950 border-indigo-850 text-white font-mono'}`}>
        <span className="text-[9px] font-black opacity-60 tracking-wider uppercase">
          {showCorrect ? 'CORRECT!' : showWrong ? 'WRONG!' : 'WRITE TOTAL HERE'}
        </span>
        <div className="text-3xl font-black tracking-wider mt-0.5">
          {writtenValue || '?'}
        </div>
      </div>

      {/* Dialer-Style Keypad (Full-Width, Stacked Layout) */}
      <div className="w-full grid grid-cols-3 gap-2">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
          <button
            key={digit}
            onClick={() => handleDigitTap(digit)}
            className="h-11 bg-white border-2 border-indigo-100 border-b-4 border-b-indigo-250 rounded-2xl text-xl font-black text-indigo-950 hover:border-indigo-200 active:scale-95 cursor-pointer flex items-center justify-center select-none"
          >
            {digit}
          </button>
        ))}
        
        {/* Backspace Button */}
        <button
          onClick={handleBackspace}
          className="h-11 bg-rose-50 border-2 border-rose-100 border-b-4 border-b-rose-200 rounded-2xl font-black text-rose-650 active:scale-95 cursor-pointer flex items-center justify-center select-none"
        >
          <Delete size={18} />
        </button>

        {/* Digit 0 */}
        <button
          onClick={() => handleDigitTap('0')}
          className="h-11 bg-white border-2 border-indigo-100 border-b-4 border-b-indigo-250 rounded-2xl text-xl font-black text-indigo-950 hover:border-indigo-200 active:scale-95 cursor-pointer flex items-center justify-center select-none"
        >
          0
        </button>

        {/* OK/Check Button */}
        <button
          onClick={handleCheck}
          disabled={writtenValue === ''}
          className={`h-11 border-2 rounded-2xl font-black active:scale-95 cursor-pointer flex items-center justify-center transition-all select-none
            ${writtenValue !== '' 
              ? 'bg-emerald-500 border-emerald-450 border-b-4 border-b-emerald-700 text-white' 
              : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed border-b-2'}`}
        >
          <Check size={18} />
        </button>
      </div>

      {/* Helper text */}
      <div className="min-h-[20px] flex items-center justify-center text-center">
        {showCorrect ? (
          <p className="text-xs font-black text-emerald-600 uppercase tracking-wider">
            ⭐ Spot on! Perfect writing!
          </p>
        ) : showWrong ? (
          <p className="text-xs font-black text-red-500 uppercase tracking-wider">
            🙅 Wrong total! Try again!
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <HelpCircle size={11} /> Tap to count, type number, then tap Check!
          </p>
        )}
      </div>
    </div>
  );
}
