'use client';

import React, { useState, useRef } from 'react';
import { HelpCircle } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type QuestionType = {
  question: string;
  topic: string;
  visualEmoji: string;
  options: string[];
  correctAnswer: string;
};

const QUESTIONS: QuestionType[] = [
  {
    question: 'If today is Tuesday, what day is tomorrow? 📅',
    topic: 'Today & Tomorrow',
    visualEmoji: '👉',
    options: ['Monday', 'Wednesday', 'Friday'],
    correctAnswer: 'Wednesday',
  },
  {
    question: 'What is the first month of the year? 🗓️',
    topic: 'Months of the Year',
    visualEmoji: '❄️',
    options: ['January', 'December', 'March'],
    correctAnswer: 'January',
  },
  {
    question: 'If yesterday was Thursday, what day is today? 📅',
    topic: 'Yesterday & Today',
    visualEmoji: '⏰',
    options: ['Friday', 'Wednesday', 'Saturday'],
    correctAnswer: 'Friday',
  },
  {
    question: 'Which month comes after October? 🗓️',
    topic: 'Months of the Year',
    visualEmoji: '🍁',
    options: ['November', 'September', 'December'],
    correctAnswer: 'November',
  },
  {
    question: 'If today is Friday, what day was yesterday? 📅',
    topic: 'Yesterday & Today',
    visualEmoji: '👈',
    options: ['Thursday', 'Saturday', 'Wednesday'],
    correctAnswer: 'Thursday',
  },
];

export default function MonthsTodayTomorrowQuiz({ onComplete }: Props) {
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
        if (currentIdx < QUESTIONS.length - 1) setCurrentIdx(i => i + 1);
        else setDone(true);
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
        <style dangerouslySetInnerHTML={{__html:`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap'); .kids-font{font-family:'Baloo 2','Fredoka',sans-serif!important;}`}} />
        <span className="text-8xl select-none">🏆</span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase">Timeline Expert!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">You mastered months and timelines! 🌟</p>
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
          🗓️ {currentQ.topic}
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

      {/* Center sky card */}
      <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2rem] p-6 shadow-md flex flex-col items-center justify-center min-h-[9rem]">
        <span className="text-7xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]">{currentQ.visualEmoji}</span>
      </div>

      {/* Options */}
      <div className="w-full flex flex-col gap-2 mt-1">
        {currentQ.options.map((opt) => {
          const isSelected = selectedAns === opt;
          const isCorrect = opt === currentQ.correctAnswer;
          let style = 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md border-b-4 border-b-slate-300 text-indigo-950';
          if (isSelected && isCorrect) style = 'border-emerald-500 bg-emerald-50 border-b-4 border-b-emerald-600 text-emerald-700 scale-102';
          else if (isSelected && !isCorrect) style = 'border-red-400 bg-red-50 border-b-2 text-red-700';

          return (
            <button key={opt} onClick={() => handleOptionTap(opt)} disabled={selectedAns !== null}
              className={`rounded-2xl border-2 p-3 text-lg font-black shadow-sm cursor-pointer active:scale-95 transition-all text-center ${style}`}>
              {opt}
            </button>
          );
        })}
      </div>

      <div className="min-h-[20px] flex items-center justify-center">
        {showCorrect ? <p className="text-xs font-black text-emerald-600 uppercase tracking-wider">⭐ Correct! Brilliant!</p>
          : showWrong ? <p className="text-xs font-black text-red-500 uppercase tracking-wider">🙅 That is not correct! Try again!</p>
          : <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1"><HelpCircle size={11}/> Think about calendar order and timelines!</p>}
      </div>
    </div>
  );
}
