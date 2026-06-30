'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type ShapeChoice = { shape: 'rectangle' | 'oval' | 'circle' | 'square' | 'triangle'; label: string; id: string };
type ShapeQuestion = { question: string; correctShape: 'rectangle' | 'oval'; choices: ShapeChoice[] };

const QUESTIONS: ShapeQuestion[] = [
  { question: 'Tap the RECTANGLE! 🟥', correctShape: 'rectangle', choices: [
    { shape: 'rectangle', label: 'Rectangle', id: 'r1' },
    { shape: 'oval', label: 'Oval', id: 'o1' },
    { shape: 'circle', label: 'Circle', id: 'c1' },
  ]},
  { question: 'Tap the OVAL! 🥚', correctShape: 'oval', choices: [
    { shape: 'square', label: 'Square', id: 's1' },
    { shape: 'oval', label: 'Oval', id: 'o2' },
    { shape: 'rectangle', label: 'Rectangle', id: 'r2' },
  ]},
  { question: 'Tap the RECTANGLE! 🟥', correctShape: 'rectangle', choices: [
    { shape: 'oval', label: 'Oval', id: 'o3' },
    { shape: 'triangle', label: 'Triangle', id: 't1' },
    { shape: 'rectangle', label: 'Rectangle', id: 'r3' },
  ]},
  { question: 'Tap the OVAL! 🥚', correctShape: 'oval', choices: [
    { shape: 'oval', label: 'Oval', id: 'o4' },
    { shape: 'circle', label: 'Circle', id: 'c2' },
    { shape: 'square', label: 'Square', id: 's2' },
  ]},
  { question: 'Tap the RECTANGLE! 🟥', correctShape: 'rectangle', choices: [
    { shape: 'rectangle', label: 'Rectangle', id: 'r4' },
    { shape: 'oval', label: 'Oval', id: 'o5' },
    { shape: 'triangle', label: 'Triangle', id: 't2' },
  ]},
];

const SHAPE_COLORS: Record<string, string[]> = {
  rectangle: ['#6366f1', '#818cf8'],
  oval:      ['#ec4899', '#f9a8d4'],
  circle:    ['#22c55e', '#86efac'],
  square:    ['#f59e0b', '#fcd34d'],
  triangle:  ['#14b8a6', '#5eead4'],
};

function ShapeSVG({ shape, size = 100 }: { shape: string; size?: number }) {
  const [c1, c2] = SHAPE_COLORS[shape] ?? ['#94a3b8', '#cbd5e1'];
  const id = `grad-${shape}-${Math.random().toString(36).slice(2,6)}`;
  const w = size, h = size;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c1}/>
          <stop offset="100%" stopColor={c2}/>
        </linearGradient>
      </defs>
      {shape === 'rectangle' && <rect x="5" y="20" width={w-10} height={h-40} rx="8" fill={`url(#${id})`}/>}
      {shape === 'oval'      && <ellipse cx={w/2} cy={h/2} rx={w/2-5} ry={h/3} fill={`url(#${id})`}/>}
      {shape === 'circle'    && <circle cx={w/2} cy={h/2} r={h/2-5} fill={`url(#${id})`}/>}
      {shape === 'square'    && <rect x="10" y="10" width={w-20} height={h-20} rx="8" fill={`url(#${id})`}/>}
      {shape === 'triangle'  && <polygon points={`${w/2},8 ${w-8},${h-8} 8,${h-8}`} fill={`url(#${id})`}/>}
    </svg>
  );
}

export default function FlatShapesQuiz({ onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());
  const currentQ = QUESTIONS[currentIdx];

  const shuffled = useMemo(() => {
    const a = [...currentQ.choices];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
    return a;
  }, [currentIdx]);

  const handleTap = (choice: ShapeChoice) => {
    if (selectedId || showWrong || showCorrect) return;
    setSelectedId(choice.id);
    if (choice.shape === currentQ.correctShape) {
      setScore(s=>s+1); setShowCorrect(true);
      setTimeout(() => { setShowCorrect(false); setSelectedId(null); currentIdx < QUESTIONS.length-1 ? setCurrentIdx(i=>i+1) : setDone(true); }, 1300);
    } else {
      setShowWrong(true);
      setTimeout(() => { setShowWrong(false); setSelectedId(null); }, 850);
    }
  };

  if (done) return (
    <div className="flex flex-col items-center gap-6 px-6 py-10 kids-font">
      <style dangerouslySetInnerHTML={{__html:`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&display=swap');.kids-font{font-family:'Baloo 2',sans-serif!important;}`}}/>
      <span className="text-8xl">🏆</span>
      <h2 className="text-3xl font-black text-indigo-950 uppercase">Shape Spotter!</h2>
      <p className="text-lg font-bold text-indigo-900/60 -mt-2">You identified Rectangles and Ovals perfectly! 🌟</p>
      <button onClick={() => onComplete({ score: Math.round((score/QUESTIONS.length)*100), max_score:100, completion_data:{score,total:QUESTIONS.length}, time_taken_seconds:Math.round((Date.now()-startTime.current)/1000) })}
        className="w-full max-w-xs px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-lg shadow-xl border-b-4 border-emerald-700 active:scale-95 cursor-pointer">Continue ➡️</button>
    </div>
  );

  return (
    <div key={currentIdx} className="flex flex-col items-center gap-4 px-3 py-2 w-full max-w-sm mx-auto kids-font select-none">
      <style dangerouslySetInnerHTML={{__html:`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&display=swap');
        .kids-font{font-family:'Baloo 2',sans-serif!important;}
      `}}/>

      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">🟥 Flat Shapes: Rectangle & Oval</span>
        <h3 className="text-2xl font-black text-indigo-950 mt-1">{currentQ.question}</h3>
      </div>

      <div className="flex items-center gap-1.5 bg-indigo-50/50 px-4 py-1 rounded-full border border-indigo-100/30">
        {QUESTIONS.map((_,i)=>(
          <div key={i} className={`w-3.5 h-3.5 rounded-full border text-[7px] font-black flex items-center justify-center transition-all
            ${i<currentIdx?'bg-emerald-500 text-white border-emerald-400':i===currentIdx?'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-300':'bg-white text-slate-300 border-slate-200'}`}>{i+1}</div>
        ))}
      </div>

      <div className="w-full grid grid-cols-3 gap-3 mt-1">
        {shuffled.map(choice => {
          const isSelected = selectedId === choice.id;
          const isCorrect = choice.shape === currentQ.correctShape;
          let style = 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md border-b-4 border-b-slate-300';
          if (isSelected && isCorrect) style = 'border-emerald-500 bg-emerald-50 border-b-4 border-b-emerald-600 scale-105';
          else if (isSelected && !isCorrect) style = 'border-red-400 bg-red-50 border-b-2';
          return (
            <button key={choice.id} onClick={() => handleTap(choice)} disabled={!!selectedId}
              className={`rounded-3xl border-2 p-3 flex flex-col items-center gap-2 shadow-sm cursor-pointer active:scale-95 transition-all ${style}`}>
              <ShapeSVG shape={choice.shape} size={88}/>
              <span className="text-xs font-black text-indigo-950/60">{choice.label}</span>
            </button>
          );
        })}
      </div>

      <div className="min-h-[22px] flex items-center justify-center">
        {showCorrect ? <p className="text-sm font-black text-emerald-600 uppercase tracking-wider">⭐ Correct! Brilliant!</p>
          : showWrong ? <p className="text-sm font-black text-red-500 uppercase tracking-wider">🙅 Not that shape! Try again!</p>
          : <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1"><HelpCircle size={11}/> Find the shape matching the name above!</p>}
      </div>
    </div>
  );
}
