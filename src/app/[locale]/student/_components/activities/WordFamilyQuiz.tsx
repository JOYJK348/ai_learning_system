'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';
import { shuffle } from '@/core/data/letterData';

type Props = {
  mode?: 'AT' | 'AN' | 'IN' | 'OT_OG' | 'MIXED';
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type WordFamilyQuestion = {
  ending: string;
  correctStart: string;
  emoji: string;
  wordName: string;
  options: string[];
};

const POOLS: Record<string, WordFamilyQuestion[]> = {
  AT: [
    { ending: 'AT', correctStart: 'C', emoji: '🐱', wordName: 'CAT', options: ['C', 'S', 'P'] },
    { ending: 'AT', correctStart: 'B', emoji: 'bat', wordName: 'BAT', options: ['B', 'L', 'F'] }, // bat handled by custom emoji below
    { ending: 'AT', correctStart: 'M', emoji: '🧹', wordName: 'MAT', options: ['M', 'D', 'G'] },
    { ending: 'AT', correctStart: 'H', emoji: '🎩', wordName: 'HAT', options: ['H', 'K', 'V'] },
    { ending: 'AT', correctStart: 'R', emoji: '🐀', wordName: 'RAT', options: ['R', 'N', 'Z'] },
  ],
  AN: [
    { ending: 'AN', correctStart: 'M', emoji: '👨', wordName: 'MAN', options: ['M', 'R', 'F'] },
    { ending: 'AN', correctStart: 'F', emoji: '🌀', wordName: 'FAN', options: ['F', 'B', 'T'] },
    { ending: 'AN', correctStart: 'C', emoji: '🥫', wordName: 'CAN', options: ['C', 'P', 'S'] },
    { ending: 'AN', correctStart: 'V', emoji: '🚐', wordName: 'VAN', options: ['V', 'D', 'G'] },
    { ending: 'AN', correctStart: 'P', emoji: '🍳', wordName: 'PAN', options: ['P', 'H', 'Z'] },
  ],
  IN: [
    { ending: 'IN', correctStart: 'P', emoji: '📌', wordName: 'PIN', options: ['P', 'T', 'K'] },
    { ending: 'IN', correctStart: 'T', emoji: '🥫', wordName: 'TIN', options: ['T', 'B', 'S'] },
    { ending: 'IN', correctStart: 'F', emoji: '🦈', wordName: 'FIN', options: ['F', 'M', 'L'] },
    { ending: 'IN', correctStart: 'B', emoji: '🗑️', wordName: 'BIN', options: ['B', 'W', 'D'] },
    { ending: 'IN', correctStart: 'W', emoji: '🏆', wordName: 'WIN', options: ['W', 'R', 'N'] },
  ],
  OT_OG: [
    { ending: 'OT', correctStart: 'H', emoji: '🔥', wordName: 'HOT', options: ['H', 'C', 'N'] },
    { ending: 'OG', correctStart: 'D', emoji: '🐶', wordName: 'DOG', options: ['D', 'C', 'B'] },
    { ending: 'OT', correctStart: 'P', emoji: '🏺', wordName: 'POT', options: ['P', 'L', 'F'] },
    { ending: 'OG', correctStart: 'L', emoji: '🪵', wordName: 'LOG', options: ['L', 'M', 'G'] },
    { ending: 'OT', correctStart: 'C', emoji: '🛏️', wordName: 'COT', options: ['C', 'S', 'T'] },
  ],
  MIXED: [
    { ending: 'AT', correctStart: 'C', emoji: '🐱', wordName: 'CAT', options: ['C', 'S', 'P'] },
    { ending: 'AN', correctStart: 'F', emoji: '🌀', wordName: 'FAN', options: ['F', 'B', 'T'] },
    { ending: 'IN', correctStart: 'P', emoji: '📌', wordName: 'PIN', options: ['P', 'T', 'K'] },
    { ending: 'OG', correctStart: 'D', emoji: '🐶', wordName: 'DOG', options: ['D', 'C', 'B'] },
    { ending: 'OT', correctStart: 'H', emoji: '🔥', wordName: 'HOT', options: ['H', 'R', 'L'] },
  ]
};

export default function WordFamilyQuiz({ mode = 'AT', onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const questionsList = useMemo(() => {
    return POOLS[mode] || POOLS.AT;
  }, [mode]);

  const currentQ = questionsList[currentIdx];

  const shuffledOptions = useMemo(() => {
    if (!currentQ) return [];
    return shuffle([...currentQ.options]);
  }, [currentQ]);

  const handleOptionTap = (letter: string) => {
    if (selectedLetter !== null || showWrong || showCorrect || done) return;

    setSelectedLetter(letter);
    const isCorrect = letter === currentQ.correctStart;

    if (isCorrect) {
      setScore(s => s + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        setSelectedLetter(null);
        if (currentIdx < questionsList.length - 1) {
          setCurrentIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 1200);
    } else {
      setShowWrong(true);
      setTimeout(() => {
        setShowWrong(false);
        setSelectedLetter(null);
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
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Word Builder Master!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Awesome! You successfully completed all CVC word blocks! 🌟
        </p>
        <button
          onClick={() => onComplete({
            score: Math.round((score / questionsList.length) * 100), max_score: 100,
            completion_data: { score, total: questionsList.length },
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
          🧩 CVC Word Builder
        </span>
        <h3 className="text-2xl font-black text-indigo-950 mt-2 leading-tight">
          Complete the <span className="text-indigo-650">-{currentQ.ending}</span> Word!
        </h3>
      </div>

      {/* Progress Tracker */}
      <div className="flex items-center gap-2 bg-indigo-50/50 px-4 py-1.5 rounded-full border border-indigo-100/30">
        {questionsList.map((_, i) => (
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

      {/* Word Constructor Display Board */}
      <div className="w-full bg-[#fcfaf2] border-4 border-[#e9d2a6] rounded-[2.5rem] p-6 shadow-xl flex flex-col items-center justify-center gap-5 relative">
        <div className="w-24 h-24 rounded-3xl bg-white border-2 border-indigo-50 shadow-md flex items-center justify-center text-5xl select-none">
          {currentQ.emoji === 'bat' ? (
            // bat emoji can be cricket bat or animal bat. Let's use 🦇 for bat
            '🦇'
          ) : currentQ.emoji}
        </div>

        {/* Word Blanks */}
        <div className="flex items-center gap-2 font-sans">
          {/* Starting Letter Slot */}
          <div className={`w-14 h-16 rounded-2xl border-3 flex items-center justify-center text-4xl font-black shadow-inner transition-all duration-150
            ${showCorrect 
              ? 'bg-emerald-500 border-emerald-650 text-white' 
              : showWrong 
                ? 'bg-red-500 border-red-650 text-white animate-[shake_0.4s_ease-in-out]' 
                : selectedLetter 
                  ? 'bg-indigo-100 border-indigo-300 text-indigo-700' 
                  : 'bg-white border-dashed border-indigo-200 text-transparent'}`}
          >
            {selectedLetter || '?'}
          </div>

          {/* Ending Word Family letters */}
          <div className="text-5xl font-black text-indigo-950 tracking-wider">
            {currentQ.ending.toLowerCase()}
          </div>
        </div>
      </div>

      {/* Choice Options */}
      <div className="grid grid-cols-3 gap-4 w-full mt-2">
        {shuffledOptions.map((letter) => {
          const isSelected = selectedLetter === letter;
          const isCorrect = letter === currentQ.correctStart;

          let btnStyle = 'border-indigo-100 bg-white border-b-4 hover:border-indigo-200';
          if (isSelected && isCorrect) {
            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-inner scale-103 border-b-2';
          } else if (isSelected && !isCorrect) {
            btnStyle = 'border-red-500 bg-red-50 text-red-700 animate-[shake_0.4s_ease-in-out] border-b-2';
          }

          return (
            <button
              key={letter}
              onClick={() => handleOptionTap(letter)}
              disabled={selectedLetter !== null}
              className={`h-16 rounded-2xl border-2 flex flex-col items-center justify-center text-3xl font-black font-sans shadow-md select-none transition-all cursor-pointer ${btnStyle}`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* Tips */}
      <div className="min-h-[24px] flex items-center justify-center text-center mt-2">
        {showCorrect ? (
          <p className="text-sm font-black text-emerald-600 uppercase tracking-wider">
            ⭐ Superb! You built the word {currentQ.wordName}!
          </p>
        ) : showWrong ? (
          <p className="text-sm font-black text-red-500 uppercase tracking-wider">
            🙅 Oops! That letter doesn't fit the picture!
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <HelpCircle size={12} /> Tap the correct letter to build the word!
          </p>
        )}
      </div>
    </div>
  );
}
