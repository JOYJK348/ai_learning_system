'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type PatternQuestion = {
  question: string;
  patternType: 'AB' | 'ABC';
  sequence: { emoji: string; label: string }[];
  choices: { emoji: string; label: string; id: string }[];
  correctLabel: string;
};

const QUESTIONS: PatternQuestion[] = [
  {
    question: 'Complete the Toy Train pattern! 🚂',
    patternType: 'AB',
    sequence: [
      { emoji: '🔴', label: 'Red' },
      { emoji: '🔵', label: 'Blue' },
      { emoji: '🔴', label: 'Red' },
      { emoji: '🔵', label: 'Blue' },
    ],
    choices: [
      { emoji: '🔴', label: 'Red', id: 'c1' },
      { emoji: '🔵', label: 'Blue', id: 'c2' },
      { emoji: '🟡', label: 'Yellow', id: 'c3' },
    ],
    correctLabel: 'Red',
  },
  {
    question: 'What comes next in the sky? ☁️',
    patternType: 'ABC',
    sequence: [
      { emoji: '⭐', label: 'Star' },
      { emoji: '🌙', label: 'Moon' },
      { emoji: '☁️', label: 'Cloud' },
      { emoji: '⭐', label: 'Star' },
      { emoji: '🌙', label: 'Moon' },
    ],
    choices: [
      { emoji: '⭐', label: 'Star', id: 'c4' },
      { emoji: '🌙', label: 'Moon', id: 'c5' },
      { emoji: '☁️', label: 'Cloud', id: 'c6' },
    ],
    correctLabel: 'Cloud',
  },
  {
    question: 'Complete the yummy fruit pattern! 🍏',
    patternType: 'AB',
    sequence: [
      { emoji: '🍎', label: 'Apple' },
      { emoji: '🍌', label: 'Banana' },
      { emoji: '🍎', label: 'Apple' },
      { emoji: '🍌', label: 'Banana' },
    ],
    choices: [
      { emoji: '🍎', label: 'Apple', id: 'c7' },
      { emoji: '🍌', label: 'Banana', id: 'c8' },
      { emoji: '🍇', label: 'Grapes', id: 'c9' },
    ],
    correctLabel: 'Apple',
  },
  {
    question: 'What animal comes next in the line? 🦁',
    patternType: 'ABC',
    sequence: [
      { emoji: '🦁', label: 'Lion' },
      { emoji: '🐯', label: 'Tiger' },
      { emoji: '🐻', label: 'Bear' },
      { emoji: '🦁', label: 'Lion' },
      { emoji: '🐯', label: 'Tiger' },
    ],
    choices: [
      { emoji: '🦁', label: 'Lion', id: 'c10' },
      { emoji: '🐯', label: 'Tiger', id: 'c11' },
      { emoji: '🐻', label: 'Bear', id: 'c12' },
    ],
    correctLabel: 'Bear',
  },
];

export default function AbAbcPatternsQuiz({ onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentQ = QUESTIONS[currentIdx];

  const shuffledChoices = useMemo(() => {
    const a = [...currentQ.choices];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }, [currentIdx]);

  const handleTap = (id: string, label: string) => {
    if (selectedId || showWrong || showCorrect || done) return;
    setSelectedId(id);
    const isCorrect = label === currentQ.correctLabel;
    if (isCorrect) {
      setScore(s => s + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        setSelectedId(null);
        if (currentIdx < QUESTIONS.length - 1) setCurrentIdx(i => i + 1);
        else setDone(true);
      }, 1300);
    } else {
      setShowWrong(true);
      setTimeout(() => {
        setShowWrong(false);
        setSelectedId(null);
      }, 850);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-6 px-6 py-10 kids-font">
        <style dangerouslySetInnerHTML={{__html:`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap'); .kids-font{font-family:'Baloo 2','Fredoka',sans-serif!important;}`}} />
        <span className="text-8xl select-none">🏆</span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase">Pattern Expert!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">You solved all AB & ABC patterns perfectly! 🌟</p>
        <button onClick={() => onComplete({ score: Math.round((score/QUESTIONS.length)*100), max_score:100, completion_data:{score,total:QUESTIONS.length}, time_taken_seconds:Math.round((Date.now()-startTime.current)/1000) })}
          className="w-full max-w-xs px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-lg shadow-xl border-b-4 border-emerald-700 active:scale-95 cursor-pointer">
          Continue ➡️
        </button>
      </div>
    );
  }

  return (
    <div key={currentIdx} className="flex flex-col items-center gap-4 px-3 py-2 w-full max-w-sm mx-auto kids-font select-none">
      <style dangerouslySetInnerHTML={{__html:`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font{font-family:'Baloo 2','Fredoka',sans-serif!important;}
      `}} />

      {/* Header */}
      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🚂 AB & ABC Patterns ({currentQ.patternType})
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1">{currentQ.question}</h3>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-1.5 bg-indigo-50/50 px-4 py-1 rounded-full border border-indigo-100/30">
        {QUESTIONS.map((_, i) => (
          <div key={i} className={`w-3.5 h-3.5 rounded-full border text-[7px] font-black flex items-center justify-center transition-all
            ${i<currentIdx?'bg-emerald-500 text-white border-emerald-400':i===currentIdx?'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-300':'bg-white text-slate-300 border-slate-200'}`}>{i+1}</div>
        ))}
      </div>

      {/* Carriage visual pattern screen */}
      <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2rem] p-4 shadow-md flex flex-col gap-2">
        <span className="text-[9px] font-black text-amber-900/40 uppercase tracking-wider text-center">What is the next carriage?</span>
        <div className="flex items-center justify-center gap-2 py-4 bg-[#f4ebd0]/30 rounded-2xl border border-[#e9d1a8]/40 overflow-x-auto">
          {currentQ.sequence.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-2.5 bg-white border-2 border-slate-100 rounded-xl shadow-sm min-w-[50px]">
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-[8px] font-bold text-slate-450 uppercase">{item.label}</span>
            </div>
          ))}
          <div className="flex flex-col items-center justify-center p-2.5 bg-indigo-50 border-2 border-dashed border-indigo-400 rounded-xl min-w-[50px]">
            <span className="text-2xl font-black text-indigo-400">?</span>
            <span className="text-[8px] font-bold text-indigo-400 uppercase">NEXT</span>
          </div>
        </div>
      </div>

      {/* Choice options */}
      <div className="w-full grid grid-cols-3 gap-3">
        {shuffledChoices.map((choice) => {
          const isSelected = selectedId === choice.id;
          const isCorrect = choice.label === currentQ.correctLabel;
          let style = 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md border-b-4 border-b-slate-300';
          if (isSelected && isCorrect) style = 'border-emerald-500 bg-emerald-50 border-b-4 border-b-emerald-600 scale-102';
          else if (isSelected && !isCorrect) style = 'border-red-400 bg-red-50 border-b-2';

          return (
            <button key={choice.id} onClick={() => handleTap(choice.id, choice.label)} disabled={selectedId !== null}
              className={`rounded-3xl border-2 p-3 flex flex-col items-center gap-1.5 shadow-sm cursor-pointer active:scale-95 transition-all ${style}`}>
              <span className="text-3xl">{choice.emoji}</span>
              <span className="text-[10px] font-black text-indigo-950/60 uppercase">{choice.label}</span>
            </button>
          );
        })}
      </div>

      <div className="min-h-[20px] flex items-center justify-center">
        {showCorrect ? <p className="text-xs font-black text-emerald-600 uppercase tracking-wider">⭐ Correct! You extended the train!</p>
          : showWrong ? <p className="text-xs font-black text-red-500 uppercase tracking-wider">🙅 That's not the next color! Try again!</p>
          : <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1"><HelpCircle size={11}/> Complete the pattern sequence above!</p>}
      </div>
    </div>
  );
}
