'use client';

import React, { useState, useRef, useMemo, useCallback } from 'react';
import { HelpCircle } from 'lucide-react';
import { shuffle } from '@/core/data/letterData';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type NameQuestion = {
  number: number;
  word: string;
};

const QUESTIONS: NameQuestion[] = [
  { number: 4, word: 'FOUR' },
  { number: 8, word: 'EIGHT' },
  { number: 12, word: 'TWELVE' },
  { number: 15, word: 'FIFTEEN' },
  { number: 20, word: 'TWENTY' },
];

export default function NumberNamesQuiz({ onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentQ = QUESTIONS[currentIdx];

  // Shuffle letters for spelling
  const scrambledLetters = useMemo(() => {
    if (!currentQ) return [];
    const letters = currentQ.word.split('').map((char, index) => ({ id: index, char }));
    return shuffle(letters);
  }, [currentQ]);

  const [tappedIds, setTappedIds] = useState<number[]>([]);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);

  const placedWord = tappedIds.map(id => scrambledLetters.find(l => l.id === id)?.char ?? '').join('');
  const remainingLetters = scrambledLetters.filter(l => !tappedIds.includes(l.id));
  const allPlaced = tappedIds.length === currentQ?.word.length;

  const handleLetterTap = useCallback((id: number) => {
    if (showWrong || showCorrect) return;
    setTappedIds(prev => {
      const next = [...prev, id];

      // Check correctness when all slots are filled
      if (next.length === currentQ.word.length) {
        const checkWord = next.map(lid => scrambledLetters.find(l => l.id === lid)?.char ?? '').join('');
        const isCorrect = checkWord === currentQ.word;

        if (isCorrect) {
          setScore(s => s + 1);
          setShowCorrect(true);
          setTimeout(() => {
            setShowCorrect(false);
            setTappedIds([]);
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
            setTappedIds([]);
          }, 900);
        }
        return next;
      }
      return next;
    });
  }, [showWrong, showCorrect, currentQ, scrambledLetters, currentIdx]);

  const handleRemoveLast = useCallback(() => {
    if (showWrong || showCorrect || allPlaced) return;
    setTappedIds(prev => prev.slice(0, -1));
  }, [showWrong, showCorrect, allPlaced]);

  if (done) {
    return (
      <div className="flex flex-col items-center gap-6 px-6 py-10 kids-font">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
          .kids-font { font-family: 'Baloo 2', 'Fredoka', sans-serif !important; }
        `}} />
        <span className="text-8xl select-none">🏆</span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Spelling Hero!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Spectacular! You spelled all the number names correctly! 🌟
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
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
        .shake { animation: shake 0.4s ease-in-out; }
      `}} />

      {/* Header */}
      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🔢 Number Names Spelling Board
        </span>
        <h3 className="text-2xl font-black text-indigo-950 mt-2 leading-tight">
          Spell the number name!
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

      {/* Target Number Display Box */}
      <div className={`w-full bg-[#fdfbf6] border-4 rounded-[2rem] p-5 shadow-md flex flex-col items-center gap-4 transition-colors duration-200
        ${showCorrect ? 'border-emerald-400' : showWrong ? 'border-red-400 shake' : 'border-[#e9d1a8]'}`}>
        
        {/* Giant Number */}
        <div className="text-6xl font-black text-indigo-650 font-sans">{currentQ.number}</div>

        {/* Spelling Slots Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 w-full min-h-[3rem]">
          {currentQ.word.split('').map((_, slotIdx) => {
            const filledChar = placedWord[slotIdx];
            const isFilled = filledChar !== undefined;
            return (
              <div
                key={slotIdx}
                className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center text-lg font-black font-sans shadow-inner transition-all leading-none
                  ${isFilled 
                    ? showCorrect 
                      ? 'bg-emerald-500 border-emerald-600 text-white' 
                      : showWrong 
                        ? 'bg-red-500 border-red-600 text-white' 
                        : 'bg-indigo-100 border-indigo-300 text-indigo-800' 
                    : 'bg-white border-dashed border-indigo-200 text-transparent'}`}
              >
                {isFilled ? filledChar : '_'}
              </div>
            );
          })}
        </div>

        {/* Undo button */}
        {tappedIds.length > 0 && !allPlaced && !showWrong && !showCorrect && (
          <button
            onClick={handleRemoveLast}
            className="text-[10px] font-black text-indigo-400 uppercase tracking-wider underline cursor-pointer"
          >
            ↩ Undo last letter
          </button>
        )}
      </div>

      {/* Scrambled Letter Cards */}
      <div className="flex flex-wrap justify-center gap-3 w-full mt-1">
        {remainingLetters.map(letter => (
          <button
            key={letter.id}
            onClick={() => handleLetterTap(letter.id)}
            disabled={showWrong || showCorrect}
            className="w-12 h-12 bg-white border-2 border-indigo-100 border-b-4 border-b-indigo-350 rounded-2xl text-xl font-black font-sans text-indigo-950 shadow-md hover:border-indigo-300 active:scale-95 transition-all cursor-pointer select-none"
          >
            {letter.char}
          </button>
        ))}
      </div>

      {/* Footer Text */}
      <div className="min-h-[24px] flex items-center justify-center text-center">
        {showCorrect ? (
          <p className="text-sm font-black text-emerald-600 uppercase tracking-wider">
            ⭐ Excellent spelling!
          </p>
        ) : showWrong ? (
          <p className="text-sm font-black text-red-500 uppercase tracking-wider">
            🙅 Wrong spelling! Try again!
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <HelpCircle size={12} /> Tap letters in the correct order to spell!
          </p>
        )}
      </div>
    </div>
  );
}
