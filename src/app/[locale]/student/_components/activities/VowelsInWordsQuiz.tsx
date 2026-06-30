'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';
import { shuffle } from '@/core/data/letterData';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type VowelCountQuestion = {
  word: string;
  emoji: string;
  vowelsCount: number;
  options: number[];
};

const QUESTIONS: VowelCountQuestion[] = [
  { word: 'CAT', emoji: '🐱', vowelsCount: 1, options: [1, 2, 3] },
  { word: 'APPLE', emoji: '🍎', vowelsCount: 2, options: [1, 2, 3] },
  { word: 'BANANA', emoji: '🍌', vowelsCount: 3, options: [2, 3, 4] },
  { word: 'OCTOPUS', emoji: '🐙', vowelsCount: 3, options: [1, 3, 4] },
  { word: 'UMBRELLA', emoji: '☂️', vowelsCount: 3, options: [2, 3, 4] },
];

export default function VowelsInWordsQuiz({ onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentQ = QUESTIONS[currentIdx];

  const handleOptionTap = (option: number) => {
    if (selectedOpt !== null || showWrong || showCorrect || done) return;

    setSelectedOpt(option);
    const isCorrect = option === currentQ.vowelsCount;

    if (isCorrect) {
      setScore(s => s + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        setSelectedOpt(null);
        if (currentIdx < QUESTIONS.length - 1) {
          setCurrentIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 1200);
    } else {
      setShowWrong(true);
      setTimeout(() => {
        setShowWrong(false);
        setSelectedOpt(null);
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
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Vowel Finder Master!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Splendid! You correctly counted the vowels in all words! 🌟
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
    <div className="flex flex-col items-center gap-5 px-4 py-4 w-full max-w-sm mx-auto kids-font select-none">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font {
          font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
        }
      `}} />

      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🧩 Vowels in Words Board
        </span>
        <h3 className="text-2xl font-black text-indigo-950 mt-2">
          How many vowels are in this word?
        </h3>
      </div>

      {/* Progress indicators */}
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

      {/* Main Flashcard Display Board */}
      <div className="w-full bg-[#fdfaf4] border-4 border-[#e6d0aa] rounded-[2.5rem] p-6 shadow-xl flex flex-col items-center justify-center gap-4 relative">
        <div className="w-24 h-24 rounded-3xl bg-white border-2 border-indigo-50 shadow-md flex items-center justify-center text-5xl select-none">
          {currentQ.emoji}
        </div>

        {/* Word Display with highlighted vowels */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {currentQ.word.split('').map((char, idx) => {
            const isVowel = ['A', 'E', 'I', 'O', 'U'].includes(char);
            return (
              <span
                key={idx}
                className={`text-3xl font-black font-sans tracking-wide uppercase px-2 py-0.5 rounded-lg
                  ${isVowel 
                    ? 'text-indigo-600 bg-indigo-50 ring-2 ring-indigo-200' 
                    : 'text-indigo-950'}`}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>

      {/* Options Row */}
      <div className="grid grid-cols-3 gap-4 w-full mt-2">
        {currentQ.options.map((option) => {
          const isSelected = selectedOpt === option;
          const isCorrect = option === currentQ.vowelsCount;

          let btnStyle = 'border-indigo-100 bg-white border-b-4 hover:border-indigo-200';
          if (isSelected && isCorrect) {
            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-inner scale-103 border-b-2';
          } else if (isSelected && !isCorrect) {
            btnStyle = 'border-red-500 bg-red-50 text-red-700 animate-[shake_0.4s_ease-in-out] border-b-2';
          }

          return (
            <button
              key={option}
              onClick={() => handleOptionTap(option)}
              disabled={selectedOpt !== null}
              className={`h-16 rounded-2xl border-2 flex flex-col items-center justify-center text-3xl font-black font-sans shadow-md select-none transition-all cursor-pointer ${btnStyle}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Tips / Feedback */}
      <div className="min-h-[24px] flex items-center justify-center text-center mt-2">
        {showCorrect ? (
          <p className="text-sm font-black text-emerald-600 uppercase tracking-wider">
            ⭐ Spot on! Correct vowel count!
          </p>
        ) : showWrong ? (
          <p className="text-sm font-black text-red-500 uppercase tracking-wider">
            🙅 Try again! That count is not correct.
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <HelpCircle size={12} /> Count the letters highlighted in blue!
          </p>
        )}
      </div>
    </div>
  );
}
