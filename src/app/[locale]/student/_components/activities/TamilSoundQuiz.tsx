'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle, Sparkles, CheckCircle } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

const QUESTIONS = [
  { emoji: '🦢', word: 'கொக்கு',   hint: 'Crane',  target: 'க்', options: ['க்', 'ச்', 'ந்', 'ம்'] },
  { emoji: '🦁', word: 'சிங்கம்',   hint: 'Lion',   target: 'ச்', options: ['த்', 'ச்', 'ப்', 'ன்'] },
  { emoji: '🐟', word: 'மீன்',      hint: 'Fish',   target: 'ம்', options: ['ம்', 'ண்', 'ர்', 'ல்'] },
  { emoji: '🐦', word: 'பறவை',     hint: 'Bird',   target: 'ப்', options: ['வ்', 'ற்', 'ப்', 'ய்'] },
  { emoji: '🌳', word: 'மரம்',      hint: 'Tree',   target: 'ம்', options: ['க்', 'ங்', 'ம்', 'ட்'] },
  { emoji: '🦆', word: 'வாத்து',    hint: 'Duck',   target: 'வ்', options: ['வ்', 'ட்', 'ண்', 'ற்'] },
  { emoji: '⚽', word: 'பந்து',    hint: 'Ball',   target: 'ப்', options: ['ந்', 'ம்', 'ப்', 'ல்'] },
  { emoji: '🐶', word: 'நாய்',      hint: 'Dog',    target: 'ந்', options: ['ய்', 'ந்', 'ல்', 'ட்'] },
];

export default function TamilSoundQuiz({ onComplete }: Props) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const q = QUESTIONS[idx];

  const shuffledOptions = useMemo(
    () => [...q.options].sort(() => Math.random() - 0.5),
    [idx]
  );

  const handleTap = (opt: string) => {
    if (selected || done) return;
    setSelected(opt);
    if (opt === q.target) {
      setScore(s => s + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        setSelected(null);
        if (idx < QUESTIONS.length - 1) setIdx(i => i + 1);
        else setDone(true);
      }, 1200);
    } else {
      setShowWrong(true);
      setTimeout(() => {
        setShowWrong(false);
        setSelected(null);
      }, 900);
    }
  };

  if (done) {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    return (
      <div className="flex flex-col items-center gap-5 px-6 py-10 kids-font">
        <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap'); .kids-font{font-family:'Baloo 2','Fredoka',sans-serif!important;}` }} />
        <span className="text-7xl select-none">🏆</span>
        <h2 className="text-2xl font-black text-indigo-950 text-center">ஒலி தேர்வு முடிந்தது!</h2>
        <p className="text-base font-bold text-indigo-900/60 text-center -mt-2">
          {score}/{QUESTIONS.length} சரியான விடைகள் 🌟
        </p>
        <div className="w-full max-w-xs bg-indigo-50 rounded-2xl border border-indigo-100 px-6 py-3 flex items-center justify-between">
          <span className="text-sm font-black text-indigo-900/50 uppercase tracking-widest">உங்கள் மதிப்பெண்</span>
          <span className="text-2xl font-black text-indigo-700">{pct}%</span>
        </div>
        <button
          onClick={() => onComplete({ score: pct, max_score: 100, completion_data: { score, total: QUESTIONS.length }, time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000) })}
          className="w-full max-w-xs px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-lg shadow-xl border-b-4 border-emerald-700 active:scale-95 cursor-pointer"
        >
          Continue ➡️
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 px-3 py-2 w-full max-w-md mx-auto kids-font select-none">
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap'); .kids-font{font-family:'Baloo 2','Fredoka',sans-serif!important;}` }} />

      {/* Header */}
      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🔤 ஒலி கேட்டுத் தேர்வு
        </span>
        <h3 className="text-lg sm:text-xl font-black text-indigo-950 mt-1">
          முதல் எழுத்தை கண்டுபிடி! 🔍
        </h3>
        <p className="text-[10px] font-bold text-indigo-900/30 uppercase tracking-widest mt-0.5">Find the first consonant of the word</p>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 border border-slate-200">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${((idx) / QUESTIONS.length) * 100}%` }}
        />
      </div>
      <p className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest -mt-3">
        {idx + 1} / {QUESTIONS.length}
      </p>

      {/* Word + emoji display */}
      <div className="w-full bg-gradient-to-br from-indigo-50 to-violet-50 border-2 border-indigo-100 rounded-3xl p-6 flex flex-col items-center justify-center gap-2 min-h-[9rem]">
        <span className="text-6xl">{q.emoji}</span>
        <div className="text-center">
          <p className="text-2xl font-black text-indigo-950">{q.word}</p>
          <p className="text-xs font-bold text-indigo-900/40 mt-0.5">{q.hint}</p>
        </div>
      </div>

      {/* Question label */}
      <p className="text-sm font-black text-indigo-900/60 text-center flex items-center gap-1.5">
        <HelpCircle size={14} /> "{q.word}" இல் முதல் மெய் எழுத்து எது?
      </p>

      {/* Options grid */}
      <div className="grid grid-cols-4 gap-3 w-full">
        {shuffledOptions.map((opt) => {
          const isSelected = selected === opt;
          const isTarget = opt === q.target;

          let cls = 'bg-white text-indigo-950 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50';
          if (isSelected && isTarget)  cls = 'bg-emerald-100 text-emerald-700 border-emerald-400';
          else if (isSelected && !isTarget) cls = 'bg-red-100 text-red-700 border-red-300';

          return (
            <button
              key={opt}
              onClick={() => handleTap(opt)}
              disabled={!!selected}
              className={`aspect-square rounded-2xl border-2 flex items-center justify-center text-3xl font-black transition-all shadow-sm active:scale-95 cursor-pointer ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      <div className="min-h-[22px] flex items-center justify-center">
        {showCorrect
          ? <p className="text-sm font-black text-emerald-600 uppercase tracking-wider flex items-center gap-1"><Sparkles size={14} /> சரியான விடை! 🎉</p>
          : showWrong
            ? <p className="text-sm font-black text-red-500 uppercase tracking-wider">🙅 மீண்டும் முயற்சிக்கவும்!</p>
            : <p className="text-[10px] font-bold text-indigo-950/30 uppercase tracking-widest flex items-center gap-1">
                <CheckCircle size={11} /> Score: {score}/{idx}
              </p>
        }
      </div>
    </div>
  );
}
