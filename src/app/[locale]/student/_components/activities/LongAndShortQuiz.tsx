'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type LengthQuestion = {
  question: string;
  items: { label: string; emoji: string; widthPercent: number; id: string }[];
  correctId: string;
  promptType: 'longest' | 'shortest';
};

const QUESTIONS: LengthQuestion[] = [
  {
    question: 'Which is the LONGEST?',
    promptType: 'longest',
    items: [
      { label: 'Snake', emoji: '🐍', widthPercent: 90, id: 'snake' },
      { label: 'Worm', emoji: '🪱', widthPercent: 45, id: 'worm' },
      { label: 'Ant', emoji: '🐜', widthPercent: 20, id: 'ant' },
    ],
    correctId: 'snake',
  },
  {
    question: 'Which is the SHORTEST?',
    promptType: 'shortest',
    items: [
      { label: 'Long Pencil', emoji: '✏️', widthPercent: 85, id: 'longpencil' },
      { label: 'Short Pencil', emoji: '✏️', widthPercent: 35, id: 'shortpencil' },
      { label: 'Medium Pencil', emoji: '✏️', widthPercent: 60, id: 'mediumpencil' },
    ],
    correctId: 'shortpencil',
  },
  {
    question: 'Which is the LONGEST?',
    promptType: 'longest',
    items: [
      { label: 'Road', emoji: '🛣️', widthPercent: 95, id: 'road' },
      { label: 'Street', emoji: '🛤️', widthPercent: 55, id: 'street' },
      { label: 'Path', emoji: '🌿', widthPercent: 25, id: 'path' },
    ],
    correctId: 'road',
  },
  {
    question: 'Which is the SHORTEST?',
    promptType: 'shortest',
    items: [
      { label: 'Tall Tree', emoji: '🌳', widthPercent: 80, id: 'tree' },
      { label: 'Small Plant', emoji: '🌱', widthPercent: 25, id: 'plant' },
      { label: 'Flower', emoji: '🌸', widthPercent: 50, id: 'flower' },
    ],
    correctId: 'plant',
  },
  {
    question: 'Which is the LONGEST?',
    promptType: 'longest',
    items: [
      { label: 'Big Fish', emoji: '🐟', widthPercent: 88, id: 'bigfish' },
      { label: 'Tiny Fish', emoji: '🐟', widthPercent: 30, id: 'tinyfish' },
      { label: 'Medium Fish', emoji: '🐟', widthPercent: 58, id: 'medfish' },
    ],
    correctId: 'bigfish',
  },
];

export default function LongAndShortQuiz({ onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentQ = QUESTIONS[currentIdx];

  const shuffledItems = useMemo(() => {
    const a = [...currentQ.items];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }, [currentIdx]);

  const handleOptionTap = (id: string) => {
    if (selectedAns !== null || showWrong || showCorrect || done) return;
    setSelectedAns(id);
    const isCorrect = id === currentQ.correctId;
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
      setTimeout(() => { setShowWrong(false); setSelectedAns(null); }, 850);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-6 px-6 py-10 kids-font">
        <style dangerouslySetInnerHTML={{__html:`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap'); .kids-font{font-family:'Baloo 2','Fredoka',sans-serif!important;}`}} />
        <span className="text-8xl">🏆</span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase">Length Expert!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">You compared lengths like a pro! 🌟</p>
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
        @keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}
        .shake{animation:shake 0.4s ease-in-out;}
      `}} />

      {/* Header */}
      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">📏 Long & Short</span>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1">{currentQ.question}</h3>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-1.5 bg-indigo-50/50 px-4 py-1 rounded-full border border-indigo-100/30">
        {QUESTIONS.map((_, i) => (
          <div key={i} className={`w-3.5 h-3.5 rounded-full border text-[7px] font-black flex items-center justify-center transition-all
            ${i<currentIdx?'bg-emerald-500 text-white border-emerald-400':i===currentIdx?'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-300':'bg-white text-slate-300 border-slate-200'}`}>{i+1}</div>
        ))}
      </div>

      {/* Length Visual Bars */}
      <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2rem] p-4 shadow-md flex flex-col gap-3">
        <span className="text-[10px] font-black text-amber-900/40 uppercase tracking-wider text-center">TAP the {currentQ.promptType === 'longest' ? 'LONGEST' : 'SHORTEST'} one!</span>
        {shuffledItems.map((item) => {
          const isSelected = selectedAns === item.id;
          const isCorrect = item.id === currentQ.correctId;
          let rowStyle = 'border-indigo-100 bg-white hover:border-indigo-200';
          if (isSelected && isCorrect) rowStyle = 'border-emerald-500 bg-emerald-50 scale-102';
          else if (isSelected && !isCorrect) rowStyle = 'border-red-500 bg-red-50 shake';

          return (
            <button key={item.id} onClick={() => handleOptionTap(item.id)} disabled={selectedAns !== null}
              className={`w-full border-2 rounded-2xl px-3 py-3 flex items-center gap-3 transition-all cursor-pointer active:scale-98 shadow-sm ${rowStyle}`}>
              <span className="text-xl">{item.emoji}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-400 transition-all"
                  style={{ width: `${item.widthPercent}%` }} />
              </div>
              <span className="text-xs font-black text-indigo-950/40 w-14 text-right">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="min-h-[20px] flex items-center justify-center">
        {showCorrect ? <p className="text-xs font-black text-emerald-600 uppercase tracking-wider">⭐ Correct! Great observation!</p>
          : showWrong ? <p className="text-xs font-black text-red-500 uppercase tracking-wider">🙅 Not that one! Try again!</p>
          : <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1"><HelpCircle size={11}/> Look at the bar length — longer bar = longer object!</p>}
      </div>
    </div>
  );
}
