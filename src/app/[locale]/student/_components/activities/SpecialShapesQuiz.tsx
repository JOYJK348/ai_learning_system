'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type SpecialShape = 'star' | 'diamond' | 'heart' | 'arrow' | 'moon';
type ShapeChoice = { shape: SpecialShape; label: string; id: string };
type ShapeQuestion = { question: string; hint: string; correctShape: 'star' | 'diamond'; choices: ShapeChoice[] };

const QUESTIONS: ShapeQuestion[] = [
  { question: 'Tap the STAR! ⭐', hint: 'Has 5 pointy tips!', correctShape: 'star', choices: [
    { shape: 'star', label: 'Star', id: 's1' },
    { shape: 'diamond', label: 'Diamond', id: 'd1' },
    { shape: 'heart', label: 'Heart', id: 'h1' },
  ]},
  { question: 'Tap the DIAMOND! 💎', hint: 'Like a square tilted sideways!', correctShape: 'diamond', choices: [
    { shape: 'moon', label: 'Moon', id: 'm1' },
    { shape: 'diamond', label: 'Diamond', id: 'd2' },
    { shape: 'star', label: 'Star', id: 's2' },
  ]},
  { question: 'Tap the STAR! ⭐', hint: 'Shines in the sky at night!', correctShape: 'star', choices: [
    { shape: 'diamond', label: 'Diamond', id: 'd3' },
    { shape: 'arrow', label: 'Arrow', id: 'a1' },
    { shape: 'star', label: 'Star', id: 's3' },
  ]},
  { question: 'Tap the DIAMOND! 💎', hint: 'A special 4-sided shape with pointed ends!', correctShape: 'diamond', choices: [
    { shape: 'diamond', label: 'Diamond', id: 'd4' },
    { shape: 'heart', label: 'Heart', id: 'h2' },
    { shape: 'moon', label: 'Moon', id: 'm2' },
  ]},
  { question: 'Tap the STAR! ⭐', hint: '5 points that stick out!', correctShape: 'star', choices: [
    { shape: 'arrow', label: 'Arrow', id: 'a2' },
    { shape: 'star', label: 'Star', id: 's4' },
    { shape: 'diamond', label: 'Diamond', id: 'd5' },
  ]},
];

const SHAPE_COLORS: Record<SpecialShape, [string, string]> = {
  star:    ['#f59e0b', '#fcd34d'],
  diamond: ['#8b5cf6', '#c4b5fd'],
  heart:   ['#ec4899', '#fbcfe8'],
  arrow:   ['#14b8a6', '#5eead4'],
  moon:    ['#6366f1', '#a5b4fc'],
};

function SpecialShapeSVG({ shape, size = 100 }: { shape: SpecialShape; size?: number }) {
  const [c1, c2] = SHAPE_COLORS[shape];
  const gid = `sg-${shape}-${Math.random().toString(36).slice(2,5)}`;
  const w = size, h = size;
  const cx = w/2, cy = h/2;
  const r1 = Math.min(w,h)/2 - 4;
  const r2 = r1 * 0.42;
  const starPts = Array.from({length:10}, (_,i) => {
    const angle = (Math.PI/5)*i - Math.PI/2;
    const r = i%2===0 ? r1 : r2;
    return `${cx + r*Math.cos(angle)},${cy + r*Math.sin(angle)}`;
  }).join(' ');

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c1}/><stop offset="100%" stopColor={c2}/>
        </linearGradient>
      </defs>
      {shape === 'star'    && <polygon points={starPts} fill={`url(#${gid})`}/>}
      {shape === 'diamond' && <polygon points={`${cx},8 ${w-8},${cy} ${cx},${h-8} 8,${cy}`} fill={`url(#${gid})`}/>}
      {shape === 'heart'   && <path d={`M${cx},${h*0.78} C${cx*0.1},${h*0.52} ${cx*0.1},${h*0.22} ${cx},${h*0.38} C${cx*1.9},${h*0.22} ${cx*1.9},${h*0.52} ${cx},${h*0.78}Z`} fill={`url(#${gid})`}/>}
      {shape === 'arrow'   && <polygon points={`${cx},8 ${w-8},${cy} ${cx+16},${cy} ${cx+16},${h-8} ${cx-16},${h-8} ${cx-16},${cy} 8,${cy}`} fill={`url(#${gid})`}/>}
      {shape === 'moon'    && <><circle cx={cx} cy={cy} r={r1} fill={`url(#${gid})`}/><circle cx={cx+r1*0.5} cy={cy-r1*0.1} r={r1*0.75} fill="#fdfbf6"/></>}
    </svg>
  );
}

export default function SpecialShapesQuiz({ onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedId, setSelectedId] = useState<string|null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());
  const currentQ = QUESTIONS[currentIdx];

  const shuffled = useMemo(() => {
    const a = [...currentQ.choices];
    for (let i = a.length-1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
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
      <h2 className="text-3xl font-black text-indigo-950 uppercase">Shape Star!</h2>
      <p className="text-lg font-bold text-indigo-900/60 -mt-2">Stars and Diamonds — you got them all! 🌟</p>
      <button onClick={()=>onComplete({score:Math.round((score/QUESTIONS.length)*100),max_score:100,completion_data:{score,total:QUESTIONS.length},time_taken_seconds:Math.round((Date.now()-startTime.current)/1000)})}
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
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">✨ Special Shapes: Star & Diamond</span>
        <h3 className="text-2xl font-black text-indigo-950 mt-1">{currentQ.question}</h3>
        <p className="text-xs font-bold text-indigo-950/40 mt-0.5">{currentQ.hint}</p>
      </div>

      <div className="flex items-center gap-1.5 bg-indigo-50/50 px-4 py-1 rounded-full border border-indigo-100/30">
        {QUESTIONS.map((_,i)=>(
          <div key={i} className={`w-3.5 h-3.5 rounded-full border text-[7px] font-black flex items-center justify-center transition-all
            ${i<currentIdx?'bg-emerald-500 text-white border-emerald-400':i===currentIdx?'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-300':'bg-white text-slate-300 border-slate-200'}`}>{i+1}</div>
        ))}
      </div>

      <div className="w-full grid grid-cols-3 gap-3">
        {shuffled.map(choice => {
          const isSelected = selectedId === choice.id;
          const isCorrect = choice.shape === currentQ.correctShape;
          let style = 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md border-b-4 border-b-slate-300';
          if (isSelected && isCorrect) style = 'border-emerald-500 bg-emerald-50 border-b-4 border-b-emerald-600 scale-105';
          else if (isSelected && !isCorrect) style = 'border-red-400 bg-red-50 border-b-2';
          return (
            <button key={choice.id} onClick={()=>handleTap(choice)} disabled={!!selectedId}
              className={`rounded-3xl border-2 p-3 flex flex-col items-center gap-2 shadow-sm cursor-pointer active:scale-95 transition-all ${style}`}>
              <SpecialShapeSVG shape={choice.shape} size={90}/>
              <span className="text-xs font-black text-indigo-950/60">{choice.label}</span>
            </button>
          );
        })}
      </div>

      <div className="min-h-[22px] flex items-center justify-center">
        {showCorrect ? <p className="text-sm font-black text-emerald-600 uppercase tracking-wider">⭐ Brilliant! Correct Shape!</p>
          : showWrong ? <p className="text-sm font-black text-red-500 uppercase tracking-wider">🙅 That's not it! Try again!</p>
          : <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1"><HelpCircle size={11}/> Look at all 3 shapes and tap the correct one!</p>}
      </div>
    </div>
  );
}
