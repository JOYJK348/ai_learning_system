'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type ShapeType = 'circle' | 'square' | 'triangle' | 'oval' | 'star' | 'heart' | 'diamond' | 'rectangle';

type PatternQuestion = {
  question: string;
  sequence: ShapeType[];
  choices: { shape: ShapeType; id: string }[];
  correctShape: ShapeType;
};

const QUESTIONS: PatternQuestion[] = [
  {
    question: 'Complete the pattern! 🔺',
    sequence: ['triangle', 'square', 'triangle', 'square'],
    choices: [
      { shape: 'triangle', id: 's1' },
      { shape: 'square', id: 's2' },
      { shape: 'circle', id: 's3' },
    ],
    correctShape: 'triangle',
  },
  {
    question: 'Complete the pattern! 🟢',
    sequence: ['circle', 'oval', 'circle', 'oval'],
    choices: [
      { shape: 'square', id: 's4' },
      { shape: 'circle', id: 's5' },
      { shape: 'oval', id: 's6' },
    ],
    correctShape: 'circle',
  },
  {
    question: 'Complete the pattern! ⭐',
    sequence: ['star', 'heart', 'star', 'heart'],
    choices: [
      { shape: 'star', id: 's7' },
      { shape: 'heart', id: 's8' },
      { shape: 'diamond', id: 's9' },
    ],
    correctShape: 'star',
  },
  {
    question: 'Complete the pattern! 🟦',
    sequence: ['rectangle', 'diamond', 'rectangle', 'diamond'],
    choices: [
      { shape: 'rectangle', id: 's10' },
      { shape: 'diamond', id: 's11' },
      { shape: 'triangle', id: 's12' },
    ],
    correctShape: 'rectangle',
  },
];

const SHAPE_COLORS: Record<ShapeType, [string, string]> = {
  circle:    ['#22c55e', '#86efac'],
  square:    ['#f59e0b', '#fcd34d'],
  triangle:  ['#ef4444', '#fca5a5'],
  oval:      ['#ec4899', '#fbcfe8'],
  star:      ['#a855f7', '#d8b4fe'],
  heart:     ['#f43f5e', '#fecdd3'],
  diamond:   ['#06b6d4', '#67e8f9'],
  rectangle: ['#3b82f6', '#93c5fd'],
};

function PatternShapeSVG({ shape, size = 60 }: { shape: ShapeType; size?: number }) {
  const [c1, c2] = SHAPE_COLORS[shape] ?? ['#94a3b8', '#cbd5e1'];
  const gid = `patsg-${shape}-${Math.random().toString(36).slice(2,5)}`;
  const w = size, h = size, cx = w/2, cy = h/2;
  const r1 = Math.min(w,h)/2 - 3, r2 = r1*0.42;
  const starPts = Array.from({length:10},(_,i)=>{const a=(Math.PI/5)*i-Math.PI/2, r=i%2===0?r1:r2; return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`;}).join(' ');

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={c1}/><stop offset="100%" stopColor={c2}/></linearGradient></defs>
      {shape==='rectangle' && <rect x="3" y="10" width={w-6} height={h-20} rx="4" fill={`url(#${gid})`}/>}
      {shape==='oval'      && <ellipse cx={cx} cy={cy} rx={cx-3} ry={cy/1.4} fill={`url(#${gid})`}/>}
      {shape==='circle'    && <circle cx={cx} cy={cy} r={r1} fill={`url(#${gid})`}/>}
      {shape==='square'    && <rect x="6" y="6" width={w-12} height={h-12} rx="4" fill={`url(#${gid})`}/>}
      {shape==='triangle'  && <polygon points={`${cx},5 ${w-5},${h-5} 5,${h-5}`} fill={`url(#${gid})`}/>}
      {shape==='star'      && <polygon points={starPts} fill={`url(#${gid})`}/>}
      {shape==='diamond'   && <polygon points={`${cx},5 ${w-5},${cy} ${cx},${h-5} 5,${cy}`} fill={`url(#${gid})`}/>}
      {shape==='heart'     && <path d={`M${cx},${h*0.78} C${cx*0.1},${h*0.52} ${cx*0.1},${h*0.22} ${cx},${h*0.38} C${cx*1.9},${h*0.22} ${cx*1.9},${h*0.52} ${cx},${h*0.78}Z`} fill={`url(#${gid})`}/>}
    </svg>
  );
}

export default function ShapeObjectPatternsQuiz({ onComplete }: Props) {
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

  const handleTap = (id: string, shape: ShapeType) => {
    if (selectedId || showWrong || showCorrect || done) return;
    setSelectedId(id);
    const isCorrect = shape === currentQ.correctShape;
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
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase">Shape Sequencer!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">You completed all shape sequences perfectly! 🌟</p>
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
          📐 Shape & Object Patterns
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

      {/* Shape sequence screen */}
      <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2rem] p-4 shadow-md flex flex-col gap-2">
        <span className="text-[9px] font-black text-amber-900/40 uppercase tracking-wider text-center">What is the next shape?</span>
        <div className="flex items-center justify-center gap-2 py-4 bg-[#f4ebd0]/30 rounded-2xl border border-[#e9d1a8]/40 overflow-x-auto">
          {currentQ.sequence.map((shapeName, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-2 bg-white border-2 border-slate-100 rounded-xl shadow-sm min-w-[50px] min-h-[50px]">
              <PatternShapeSVG shape={shapeName} size={42} />
            </div>
          ))}
          <div className="flex flex-col items-center justify-center p-2 bg-indigo-50 border-2 border-dashed border-indigo-400 rounded-xl min-w-[50px] min-h-[50px]">
            <span className="text-xl font-black text-indigo-400">?</span>
          </div>
        </div>
      </div>

      {/* Choice options */}
      <div className="w-full grid grid-cols-3 gap-3">
        {shuffledChoices.map((choice) => {
          const isSelected = selectedId === choice.id;
          const isCorrect = choice.shape === currentQ.correctShape;
          let style = 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md border-b-4 border-b-slate-300';
          if (isSelected && isCorrect) style = 'border-emerald-500 bg-emerald-50 border-b-4 border-b-emerald-600 scale-102';
          else if (isSelected && !isCorrect) style = 'border-red-400 bg-red-50 border-b-2';

          return (
            <button key={choice.id} onClick={() => handleTap(choice.id, choice.shape)} disabled={selectedId !== null}
              className={`rounded-3xl border-2 p-3 flex flex-col items-center justify-center shadow-sm cursor-pointer active:scale-95 transition-all ${style} min-h-[80px]`}>
              <PatternShapeSVG shape={choice.shape} size={48} />
            </button>
          );
        })}
      </div>

      <div className="min-h-[20px] flex items-center justify-center">
        {showCorrect ? <p className="text-xs font-black text-emerald-600 uppercase tracking-wider">⭐ Correct! Shape fits perfectly!</p>
          : showWrong ? <p className="text-xs font-black text-red-500 uppercase tracking-wider">🙅 That's not the next shape! Try again!</p>
          : <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1"><HelpCircle size={11}/> Complete the shape sequence above!</p>}
      </div>
    </div>
  );
}
