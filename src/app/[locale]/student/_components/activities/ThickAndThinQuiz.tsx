'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type ThicknessQuestion = {
  question: string;
  promptType: 'thickest' | 'thinnest';
  items: { label: string; emoji: string; heightPx: number; id: string }[];
  correctId: string;
};

const QUESTIONS: ThicknessQuestion[] = [
  {
    question: 'Which is the THICKEST?',
    promptType: 'thickest',
    items: [
      { label: 'Big Book', emoji: '📚', heightPx: 60, id: 'bigbook' },
      { label: 'Thin Book', emoji: '📓', heightPx: 18, id: 'thinbook' },
      { label: 'Medium Book', emoji: '📒', heightPx: 36, id: 'medbook' },
    ],
    correctId: 'bigbook',
  },
  {
    question: 'Which is the THINNEST?',
    promptType: 'thinnest',
    items: [
      { label: 'Log', emoji: '🪵', heightPx: 56, id: 'log' },
      { label: 'Branch', emoji: '🌿', heightPx: 16, id: 'branch' },
      { label: 'Stick', emoji: '🎋', heightPx: 32, id: 'stick' },
    ],
    correctId: 'branch',
  },
  {
    question: 'Which is the THICKEST?',
    promptType: 'thickest',
    items: [
      { label: 'Rope', emoji: '🧵', heightPx: 52, id: 'rope' },
      { label: 'Thread', emoji: '🪡', heightPx: 12, id: 'thread' },
      { label: 'String', emoji: '〰️', heightPx: 28, id: 'string' },
    ],
    correctId: 'rope',
  },
  {
    question: 'Which is the THINNEST?',
    promptType: 'thinnest',
    items: [
      { label: 'Fat Trunk', emoji: '🌴', heightPx: 58, id: 'trunk' },
      { label: 'Needle', emoji: '🪡', heightPx: 10, id: 'needle' },
      { label: 'Candle', emoji: '🕯️', heightPx: 34, id: 'candle' },
    ],
    correctId: 'needle',
  },
  {
    question: 'Which is the THICKEST?',
    promptType: 'thickest',
    items: [
      { label: 'Pillar', emoji: '🏛️', heightPx: 64, id: 'pillar' },
      { label: 'Pen', emoji: '🖊️', heightPx: 22, id: 'pen' },
      { label: 'Marker', emoji: '🖊️', heightPx: 42, id: 'marker' },
    ],
    correctId: 'pillar',
  },
];

export default function ThickAndThinQuiz({ onComplete }: Props) {
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
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase">Thickness Pro!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">You spotted thick and thin things perfectly! 🌟</p>
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
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">📦 Thick & Thin</span>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1">{currentQ.question}</h3>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-1.5 bg-indigo-50/50 px-4 py-1 rounded-full border border-indigo-100/30">
        {QUESTIONS.map((_, i) => (
          <div key={i} className={`w-3.5 h-3.5 rounded-full border text-[7px] font-black flex items-center justify-center transition-all
            ${i<currentIdx?'bg-emerald-500 text-white border-emerald-400':i===currentIdx?'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-300':'bg-white text-slate-300 border-slate-200'}`}>{i+1}</div>
        ))}
      </div>

      {/* Visual thickness display - 3 columns side by side */}
      <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2rem] p-4 shadow-md">
        <span className="block text-[10px] font-black text-amber-900/40 uppercase tracking-wider text-center mb-3">
          TAP the {currentQ.promptType === 'thickest' ? 'THICKEST' : 'THINNEST'} one!
        </span>
        <div className="flex items-end justify-around gap-3 min-h-[100px]">
          {shuffledItems.map((item) => {
            const isSelected = selectedAns === item.id;
            const isCorrect = item.id === currentQ.correctId;
            let colStyle = 'border-indigo-100 bg-indigo-100';
            if (isSelected && isCorrect) colStyle = 'border-emerald-500 bg-emerald-400';
            else if (isSelected && !isCorrect) colStyle = 'border-red-500 bg-red-400 shake';

            return (
              <button key={item.id} onClick={() => handleOptionTap(item.id)} disabled={selectedAns !== null}
                className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-all">
                <span className="text-2xl">{item.emoji}</span>
                <div className={`rounded-xl border-2 w-10 transition-all ${colStyle}`}
                  style={{ height: `${item.heightPx}px` }} />
                <span className="text-[10px] font-black text-indigo-950/50 text-center leading-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-h-[20px] flex items-center justify-center">
        {showCorrect ? <p className="text-xs font-black text-emerald-600 uppercase tracking-wider">⭐ Correct! Excellent eye!</p>
          : showWrong ? <p className="text-xs font-black text-red-500 uppercase tracking-wider">🙅 Look again! Try once more!</p>
          : <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1"><HelpCircle size={11}/> Taller bar = thicker object!</p>}
      </div>
    </div>
  );
}
