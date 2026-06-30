'use client';

import React, { useState, useRef } from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

// Vowels in order
const TAMIL_VOWELS = ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ'];

// Game levels: missing letters sequence
const SEQUENCE_LEVELS = [
  {
    displaySeq: ['அ', '?', 'இ', 'ஈ'],
    correct: 'ஆ',
    options: ['ஆ', 'உ', 'எ', 'ஒ'],
    tip: 'Find the letter that comes after அ (A)!'
  },
  {
    displaySeq: ['உ', 'ஊ', '?', 'ஏ'],
    correct: 'எ',
    options: ['ஈ', 'எ', 'ஐ', 'ஓ'],
    tip: 'Find the letter that comes after ஊ (Uoo)!'
  },
  {
    displaySeq: ['எ', '?', 'ஐ', 'ஒ'],
    correct: 'ஏ',
    options: ['ஏ', 'ஔ', 'அ', 'இ'],
    tip: 'Find the letter that comes after எ (E)!'
  },
  {
    displaySeq: ['ஒ', 'ஓ', '?', 'க்'], // க் is a consonant just to mark end
    correct: 'ஔ',
    options: ['ஔ', 'ஆ', 'உ', 'ஐ'],
    tip: 'Find the letter that completes the vowels sequence!'
  },
  {
    displaySeq: ['?', 'ஆ', 'இ', 'ஈ'],
    correct: 'அ',
    options: ['அ', 'ஊ', 'எ', 'ஒ'],
    tip: 'What is the very first vowel in Tamil?'
  }
];

export default function TamilLetterOrderQuiz({ onComplete }: Props) {
  const [phase, setPhase] = useState<'train' | 'bubbles'>('train');
  
  // Phase 1: Train sequence states
  const [levelIdx, setLevelIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [trainScore, setTrainScore] = useState(0);

  // Phase 2: Bubble tapping sequence states
  const [nextExpectedIdx, setNextExpectedIdx] = useState(0);
  const [wrongBubble, setWrongBubble] = useState<string | null>(null);
  const [bubbleList, setBubbleList] = useState<string[]>(() => {
    // Shuffle the vowels
    return [...TAMIL_VOWELS].sort(() => Math.random() - 0.5);
  });

  const startTime = useRef(Date.now());

  const handleTrainTap = (option: string) => {
    if (selectedAns || showWrong || showCorrect) return;
    setSelectedAns(option);
    const correctLetter = SEQUENCE_LEVELS[levelIdx].correct;

    if (option === correctLetter) {
      setTrainScore(s => s + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        setSelectedAns(null);
        if (levelIdx < SEQUENCE_LEVELS.length - 1) {
          setLevelIdx(i => i + 1);
        } else {
          setPhase('bubbles');
        }
      }, 1200);
    } else {
      setShowWrong(true);
      setTimeout(() => {
        setShowWrong(false);
        setSelectedAns(null);
      }, 800);
    }
  };

  const handleBubbleTap = (letter: string) => {
    const expected = TAMIL_VOWELS[nextExpectedIdx];
    if (letter === expected) {
      setNextExpectedIdx(prev => prev + 1);
      // Remove popped bubble from grid
      setBubbleList(prev => prev.filter(b => b !== letter));
    } else {
      setWrongBubble(letter);
      setTimeout(() => {
        setWrongBubble(null);
      }, 600);
    }
  };

  // Check game completion
  const isDone = phase === 'bubbles' && nextExpectedIdx === TAMIL_VOWELS.length;

  if (isDone) {
    const totalPossible = SEQUENCE_LEVELS.length + TAMIL_VOWELS.length;
    const finalScore = Math.round((trainScore / SEQUENCE_LEVELS.length) * 100);
    
    return (
      <div className="flex flex-col items-center gap-6 px-6 py-10 kids-font">
        <style dangerouslySetInnerHTML={{__html:`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap'); .kids-font{font-family:'Baloo 2','Fredoka',sans-serif!important;}`}} />
        <span className="text-8xl select-none">🚂✨</span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase">அருமை!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          You ordered all letters perfectly! 🌟
        </p>
        <button
          onClick={() => onComplete({
            score: finalScore,
            max_score: 100,
            completion_data: { trainScore, phase2Completed: true },
            time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000)
          })}
          className="w-full max-w-xs px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-lg shadow-xl border-b-4 border-emerald-700 active:scale-95 cursor-pointer text-center"
        >
          Continue ➡️
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 px-3 py-2 w-full max-w-md mx-auto kids-font select-none">
      <style dangerouslySetInnerHTML={{__html:`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font{font-family:'Baloo 2','Fredoka',sans-serif!important;}
      `}} />

      {/* Header */}
      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🚂 தமிழ் எழுத்து வரிசைமுறை
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1">
          {phase === 'train' ? 'Find the Missing Wagon! 🚃' : 'Tap Vowels in Order! (அ ➔ ஔ) 🎈'}
        </h3>
      </div>

      {phase === 'train' ? (
        /* Phase 1: Train Level Selector */
        <div className="w-full flex flex-col gap-4 mt-2">
          {/* Progress bar */}
          <div className="flex items-center justify-center gap-1.5 bg-indigo-50/50 px-4 py-1 rounded-full border border-indigo-100/30 w-fit mx-auto">
            {SEQUENCE_LEVELS.map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full border text-[6px] font-black flex items-center justify-center transition-all
                ${i < levelIdx ? 'bg-emerald-500 text-white border-emerald-400' : i === levelIdx ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-300' : 'bg-white text-slate-300 border-slate-200'}`}>{i + 1}</div>
            ))}
          </div>

          {/* Cute Train graphic representation */}
          <div className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] p-4 flex flex-col items-center justify-center min-h-[9rem]">
            {/* The Train Track and Wagons */}
            <div className="flex items-end gap-1.5">
              {/* Locomotive */}
              <div className="flex flex-col items-center">
                <span className="text-3xl">🚂</span>
                <span className="text-[8px] font-black text-slate-400">START</span>
              </div>
              
              {/* Wagons */}
              {SEQUENCE_LEVELS[levelIdx].displaySeq.map((wagon, idx) => {
                const isBlank = wagon === '?';
                return (
                  <div
                    key={idx}
                    className={`w-14 h-14 rounded-xl border-2 flex flex-col items-center justify-center transition-all shadow-sm
                      ${isBlank 
                        ? 'border-indigo-400 border-dashed bg-indigo-50/40 text-indigo-500 animate-pulse' 
                        : 'border-slate-200 bg-white text-slate-800'}`}
                  >
                    <span className="text-2xl font-black">{isBlank && selectedAns ? selectedAns : wagon}</span>
                    <span className="text-[7px] font-bold text-slate-400 mt-0.5">வண்டி {idx + 1}</span>
                  </div>
                );
              })}
            </div>
            
            {/* Tracks */}
            <div className="w-full h-1.5 bg-slate-300 rounded-full mt-2 relative">
              <div className="absolute inset-0 flex justify-between px-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="w-1 h-3 bg-slate-400 -mt-0.5" />
                ))}
              </div>
            </div>
          </div>

          {/* Choice options grid */}
          <div className="grid grid-cols-4 gap-2.5 mt-2">
            {SEQUENCE_LEVELS[levelIdx].options.map((opt) => {
              const isSelected = selectedAns === opt;
              const isCorrect = opt === SEQUENCE_LEVELS[levelIdx].correct;

              let style = 'bg-white text-indigo-950 border-slate-200 hover:border-indigo-300';
              if (isSelected && isCorrect) style = 'bg-emerald-100 text-emerald-700 border-emerald-300 scale-102';
              else if (isSelected && !isCorrect) style = 'bg-red-100 text-red-700 border-red-300';

              return (
                <button
                  key={opt}
                  onClick={() => handleTrainTap(opt)}
                  disabled={selectedAns !== null}
                  className={`aspect-square rounded-2xl border-2 flex items-center justify-center text-3xl font-black transition-all cursor-pointer shadow-sm active:scale-95 ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="min-h-[22px] flex items-center justify-center">
            {showCorrect ? <p className="text-sm font-black text-emerald-600 uppercase tracking-wider flex items-center gap-1"><Sparkles size={14}/> Correct wagon loaded! 🌟</p>
              : showWrong ? <p className="text-sm font-black text-red-500 uppercase tracking-wider">🙅 That letter doesn't fit! Try again!</p>
              : <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1"><HelpCircle size={11}/> {SEQUENCE_LEVELS[levelIdx].tip}</p>}
          </div>
        </div>
      ) : (
        /* Phase 2: Bubble Pop Grid - ordering the entire sequence */
        <div className="w-full flex flex-col gap-4 mt-2">
          {/* Timeline bar of progress */}
          <div className="w-full flex items-center justify-center flex-wrap gap-1 bg-indigo-50/50 p-2.5 rounded-2xl border border-indigo-100/30">
            {TAMIL_VOWELS.map((v, i) => (
              <span
                key={v}
                className={`text-sm font-black w-7 h-7 rounded-lg flex items-center justify-center border transition-all
                  ${i < nextExpectedIdx ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-white text-slate-300 border-slate-200'}`}
              >
                {v}
              </span>
            ))}
          </div>

          {/* Bubbles Grid */}
          <div className="grid grid-cols-4 gap-3 py-4 min-h-[14rem] items-center justify-center">
            {bubbleList.map((letter) => {
              const isWrong = wrongBubble === letter;
              return (
                <button
                  key={letter}
                  onClick={() => handleBubbleTap(letter)}
                  className={`w-14 h-14 rounded-full border-2 text-2xl font-black shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-90
                    ${isWrong 
                      ? 'bg-red-100 text-red-700 border-red-300 animate-bounce' 
                      : 'bg-gradient-to-br from-indigo-50 to-white text-indigo-900 border-indigo-200 hover:border-indigo-400 hover:shadow-lg'}`}
                >
                  {letter}
                </button>
              );
            })}
          </div>

          <div className="min-h-[22px] flex items-center justify-center">
            {nextExpectedIdx < TAMIL_VOWELS.length ? (
              <p className="text-xs font-black text-indigo-900/50 uppercase tracking-widest flex items-center gap-1">
                Find and tap the next vowel: <span className="text-lg text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">{TAMIL_VOWELS[nextExpectedIdx]}</span>
              </p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
