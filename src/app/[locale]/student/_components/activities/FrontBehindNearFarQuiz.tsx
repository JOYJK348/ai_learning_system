'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type ForestQuestion = {
  question: string;
  focusEmoji: string;
  focusName: string;
  correctAnswer: 'front' | 'behind' | 'near' | 'far';
  options: string[];
  graphicKey: 'lion' | 'giraffe' | 'puppy' | 'eagle' | 'kitten';
};

const QUESTIONS: ForestQuestion[] = [
  {
    question: 'Where is the lion 🦁?',
    focusEmoji: '🦁',
    focusName: 'Lion',
    correctAnswer: 'front',
    options: ['front', 'behind'],
    graphicKey: 'lion',
  },
  {
    question: 'Where is the giraffe 🦒?',
    focusEmoji: '🦒',
    focusName: 'Giraffe',
    correctAnswer: 'behind',
    options: ['front', 'behind'],
    graphicKey: 'giraffe',
  },
  {
    question: 'Is the big puppy 🐶 Near or Far?',
    focusEmoji: '🐶',
    focusName: 'Puppy',
    correctAnswer: 'near',
    options: ['near', 'far'],
    graphicKey: 'puppy',
  },
  {
    question: 'Is the small flying eagle 🦅 Near or Far?',
    focusEmoji: '🦅',
    focusName: 'Eagle',
    correctAnswer: 'far',
    options: ['near', 'far'],
    graphicKey: 'eagle',
  },
  {
    question: 'Where is the kitten 🐱?',
    focusEmoji: '🐱',
    focusName: 'Kitten',
    correctAnswer: 'front',
    options: ['front', 'behind'],
    graphicKey: 'kitten',
  },
];

export default function FrontBehindNearFarQuiz({ onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentQ = QUESTIONS[currentIdx];

  const handleOptionTap = (option: string) => {
    if (selectedAns !== null || showWrong || showCorrect || done) return;

    setSelectedAns(option);
    const isCorrect = option === currentQ.correctAnswer;

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
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Direction Master!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Spectacular! You know Front, Behind, Near, and Far! 🌟
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
          🏡 Safari Forest Game
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1 leading-tight">
          {currentQ.question}
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

      {/* Jungle Backdrop Graphic Area */}
      <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2rem] p-4 shadow-md relative overflow-hidden flex flex-col items-center justify-center min-h-[12rem]">
        {/* Sky / Birds */}
        <div className="absolute top-2 right-6 text-xl opacity-60">☁️</div>

        {/* Big Forest Tree */}
        <div className="w-20 h-28 bg-[#966b44] rounded-2xl absolute bottom-0 right-10 z-10 border border-[#7d5635] flex items-center justify-center" />
        <div className="w-32 h-32 bg-emerald-500 rounded-full absolute bottom-14 right-4 z-20 border border-emerald-600 shadow-sm" />

        {/* Big Bush */}
        <div className="w-36 h-20 bg-green-600 rounded-full absolute bottom-0 left-2 z-20 border border-green-700 shadow-sm" />

        {/* Dynamic Graphic positioning */}
        
        {/* LION 🦁: IN FRONT OF the bush (z-index 30, left-side) */}
        {currentQ.graphicKey === 'lion' && (
          <div className="absolute bottom-1 left-8 z-30 text-5xl">🦁</div>
        )}

        {/* GIRAFFE 🦒: BEHIND the tree (z-index 5, right-side) */}
        {currentQ.graphicKey === 'giraffe' && (
          <div className="absolute bottom-12 right-20 z-5 text-5xl">🦒</div>
        )}

        {/* PUPPY 🐶: NEAR (z-index 40, centered, huge scale) */}
        {currentQ.graphicKey === 'puppy' && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-40 text-7xl">🐶</div>
        )}

        {/* EAGLE 🦅: FAR (z-index 5, top left, tiny scale) */}
        {currentQ.graphicKey === 'eagle' && (
          <div className="absolute top-4 left-10 z-5 text-2xl">🦅</div>
        )}

        {/* KITTEN 🐱: IN FRONT OF the tree (z-index 30, right-side) */}
        {currentQ.graphicKey === 'kitten' && (
          <div className="absolute bottom-1 right-12 z-30 text-5xl">🐱</div>
        )}
      </div>

      {/* Options Cards */}
      <div className="w-full grid grid-cols-2 gap-3 mt-1">
        {currentQ.options.map((opt) => {
          const isSelected = selectedAns === opt;
          const isCorrect = opt === currentQ.correctAnswer;

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
              className={`h-14 rounded-2xl border-2 flex items-center justify-center text-xl font-black capitalize shadow-md select-none transition-all cursor-pointer ${btnStyle}`}
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
            ⭐ Spot on! Perfect positioning!
          </p>
        ) : showWrong ? (
          <p className="text-xs font-black text-red-500 uppercase tracking-wider">
            🙅 Wrong answer! Try again!
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <HelpCircle size={11} /> Look at the animal highlighted in the jungle!
          </p>
        )}
      </div>
    </div>
  );
}
