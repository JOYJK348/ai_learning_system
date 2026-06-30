'use client';

import React, { useState, useRef } from 'react';
import { HelpCircle } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type ClockQuestion = {
  question: string;
  hour: number;
  correctAnswer: string;
  options: string[];
};

const QUESTIONS: ClockQuestion[] = [
  {
    question: "What time does the clock show? ⏰",
    hour: 3,
    correctAnswer: "3 o'clock",
    options: ["3 o'clock", "5 o'clock", "12 o'clock"],
  },
  {
    question: "What time does the clock show? ⏰",
    hour: 8,
    correctAnswer: "8 o'clock",
    options: ["6 o'clock", "8 o'clock", "9 o'clock"],
  },
  {
    question: "What time does the clock show? ⏰",
    hour: 12,
    correctAnswer: "12 o'clock",
    options: ["12 o'clock", "1 o'clock", "11 o'clock"],
  },
  {
    question: "What time does the clock show? ⏰",
    hour: 5,
    correctAnswer: "5 o'clock",
    options: ["4 o'clock", "5 o'clock", "7 o'clock"],
  },
  {
    question: "What time does the clock show? ⏰",
    hour: 10,
    correctAnswer: "10 o'clock",
    options: ["10 o'clock", "11 o'clock", "12 o'clock"],
  },
];

// Helper to render cute analog clock SVG
function ClockSVG({ hour }: { hour: number }) {
  const size = 150;
  const radius = size / 2 - 10;
  const cx = size / 2;
  const cy = size / 2;

  // Calculate hour hand angle (12 o'clock is 0 degrees or -90 deg from standard trigonometry)
  const hourAngle = (hour * 30) - 90; 
  const hourRad = (hourAngle * Math.PI) / 180;
  const hx = cx + (radius * 0.45) * Math.cos(hourRad);
  const hy = cy + (radius * 0.45) * Math.sin(hourRad);

  // Minute hand is always at 12 for o'clock questions (0 degrees or -90 deg)
  const mx = cx;
  const my = cy - (radius * 0.7);

  // Generate numbers 1 to 12 coordinates around clock face
  const numbers = Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    const angle = (num * 30) - 90;
    const rad = (angle * Math.PI) / 180;
    const nx = cx + (radius * 0.8) * Math.cos(rad);
    const ny = cy + (radius * 0.8) * Math.sin(rad) + 4; // Shift down slightly for alignment
    return { num, x: nx, y: ny };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="select-none">
      {/* Outer clock ring */}
      <circle cx={cx} cy={cy} r={radius} fill="#ffffff" stroke="#e9d1a8" strokeWidth="6" shadow-sm="true" />
      {/* Small inner ring */}
      <circle cx={cx} cy={cy} r={radius - 8} fill="none" stroke="#f4ebd0" strokeWidth="2" />
      
      {/* Numbers */}
      {numbers.map(({ num, x, y }) => (
        <text key={num} x={x} y={y} textAnchor="middle" fill="#1e1b4b" fontSize="13" fontWeight="950" className="font-sans">
          {num}
        </text>
      ))}

      {/* Hour Hand (Thick) */}
      <line x1={cx} y1={cy} x2={hx} y2={hy} stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
      
      {/* Minute Hand (Thinner, longer) */}
      <line x1={cx} y1={cy} x2={mx} y2={my} stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />

      {/* Center cap */}
      <circle cx={cx} cy={cy} r="6" fill="#1e1b4b" />
      <circle cx={cx} cy={cy} r="2" fill="#ffffff" />
    </svg>
  );
}

export default function ClockRecognitionQuiz({ onComplete }: Props) {
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
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase">Clock Master!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">You tell time on a clock perfectly! 🌟</p>
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
          ⏰ Clock Recognition
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

      {/* Center Clock Display */}
      <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2rem] p-6 shadow-md flex flex-col items-center justify-center min-h-[11rem]">
        <ClockSVG hour={currentQ.hour} />
      </div>

      {/* Options */}
      <div className="w-full grid grid-cols-3 gap-2 mt-1">
        {currentQ.options.map((opt) => {
          const isSelected = selectedAns === opt;
          const isCorrect = opt === currentQ.correctAnswer;
          let style = 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md border-b-4 border-b-slate-300 text-indigo-950';
          if (isSelected && isCorrect) style = 'border-emerald-500 bg-emerald-50 border-b-4 border-b-emerald-600 text-emerald-700 scale-102';
          else if (isSelected && !isCorrect) style = 'border-red-400 bg-red-50 border-b-2 text-red-700';

          return (
            <button key={opt} onClick={() => handleOptionTap(opt)} disabled={selectedAns !== null}
              className={`rounded-2xl border-2 p-2.5 text-xs font-black shadow-sm cursor-pointer active:scale-95 transition-all text-center ${style}`}>
              {opt}
            </button>
          );
        })}
      </div>

      <div className="min-h-[20px] flex items-center justify-center">
        {showCorrect ? <p className="text-xs font-black text-emerald-600 uppercase tracking-wider">⭐ Correct! Brilliant!</p>
          : showWrong ? <p className="text-xs font-black text-red-500 uppercase tracking-wider">🙅 That is not the correct time! Try again!</p>
          : <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1"><HelpCircle size={11}/> Short hand is hour, long hand is minute!</p>}
      </div>
    </div>
  );
}
