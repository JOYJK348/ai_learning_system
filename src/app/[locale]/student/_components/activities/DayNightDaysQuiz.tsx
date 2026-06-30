'use client';

import React, { useState, useRef } from 'react';
import { HelpCircle } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type QuestionType = {
  question: string;
  visualEmoji: string;
  visualBg: string;
  options: string[];
  correctAnswer: string;
};

const QUESTIONS: QuestionType[] = [
  {
    question: 'When do we see the Sun in the sky? ☀️',
    visualEmoji: '☀️',
    visualBg: 'from-amber-400 to-yellow-250',
    options: ['Daytime', 'Nighttime'],
    correctAnswer: 'Daytime',
  },
  {
    question: 'When do we see the Moon and Stars? 🌙✨',
    visualEmoji: '🌙',
    visualBg: 'from-indigo-950 to-slate-900',
    options: ['Daytime', 'Nighttime'],
    correctAnswer: 'Nighttime',
  },
  {
    question: 'What day comes after Monday? 📅',
    visualEmoji: '📆',
    visualBg: 'from-sky-400 to-blue-500',
    options: ['Sunday', 'Tuesday', 'Wednesday'],
    correctAnswer: 'Tuesday',
  },
  {
    question: 'What day comes before Friday? 📅',
    visualEmoji: '📆',
    visualBg: 'from-purple-400 to-indigo-500',
    options: ['Thursday', 'Saturday', 'Wednesday'],
    correctAnswer: 'Thursday',
  },
  {
    question: 'Which day is a weekend holiday? 🎉',
    visualEmoji: '🎈',
    visualBg: 'from-emerald-400 to-teal-500',
    options: ['Monday', 'Wednesday', 'Sunday'],
    correctAnswer: 'Sunday',
  },
];

export default function DayNightDaysQuiz({ onComplete }: Props) {
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
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase">Calendar Master!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">You know days, day, and night perfectly! 🌟</p>
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
          ☀️ Days & Day/Night
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
      <div className={`w-full bg-gradient-to-br ${currentQ.visualBg} border-4 border-white/60 rounded-[2.5rem] p-6 shadow-md flex flex-col items-center justify-center min-h-[9rem] transition-all`}>
        <span className="text-7xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)]">{currentQ.visualEmoji}</span>
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
          : <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1"><HelpCircle size={11}/> Think about calendar order and day cycle!</p>}
      </div>
    </div>
  );
}
