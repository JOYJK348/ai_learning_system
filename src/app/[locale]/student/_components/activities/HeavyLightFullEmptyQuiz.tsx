'use client';

import React, { useState, useRef } from 'react';
import { HelpCircle } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type ConceptQuestion = {
  question: string;
  concept: 'heavy' | 'light' | 'full' | 'empty';
  items: { label: string; emoji: string; description: string; id: string }[];
  correctId: string;
};

const QUESTIONS: ConceptQuestion[] = [
  {
    question: 'Which is HEAVIER?',
    concept: 'heavy',
    items: [
      { label: 'Elephant', emoji: '🐘', description: 'Very heavy!', id: 'elephant' },
      { label: 'Feather', emoji: '🪶', description: 'Very light!', id: 'feather' },
    ],
    correctId: 'elephant',
  },
  {
    question: 'Which is LIGHTER?',
    concept: 'light',
    items: [
      { label: 'Rock', emoji: '🪨', description: 'Heavy rock', id: 'rock' },
      { label: 'Balloon', emoji: '🎈', description: 'Light & floats!', id: 'balloon' },
    ],
    correctId: 'balloon',
  },
  {
    question: 'Which cup is FULL?',
    concept: 'full',
    items: [
      { label: 'Full Cup', emoji: '🥛', description: 'Filled to the top!', id: 'fullcup' },
      { label: 'Empty Cup', emoji: '🫙', description: 'Nothing inside!', id: 'emptycup' },
    ],
    correctId: 'fullcup',
  },
  {
    question: 'Which is EMPTY?',
    concept: 'empty',
    items: [
      { label: 'Full Jar', emoji: '🫙', description: 'Has water inside', id: 'fulljar' },
      { label: 'Empty Box', emoji: '📦', description: 'Nothing inside!', id: 'emptybox' },
    ],
    correctId: 'emptybox',
  },
  {
    question: 'Which is HEAVIER?',
    concept: 'heavy',
    items: [
      { label: 'Books', emoji: '📚', description: 'Lot of pages!', id: 'books' },
      { label: 'Leaf', emoji: '🍃', description: 'Floats in wind!', id: 'leaf' },
    ],
    correctId: 'books',
  },
];

const CONCEPT_COLORS: Record<string, string> = {
  heavy: 'from-amber-500 to-orange-400',
  light: 'from-sky-400 to-cyan-300',
  full: 'from-blue-500 to-indigo-400',
  empty: 'from-slate-400 to-gray-300',
};

const CONCEPT_ICONS: Record<string, string> = {
  heavy: '⚖️',
  light: '🪶',
  full: '🪣',
  empty: '📦',
};

export default function HeavyLightFullEmptyQuiz({ onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentQ = QUESTIONS[currentIdx];

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
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase">Measurement Star!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">You understood weight & volume concepts! 🌟</p>
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
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          {CONCEPT_ICONS[currentQ.concept]} Heavy · Light · Full · Empty
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

      {/* Two Big Choice Cards */}
      <div className="w-full grid grid-cols-2 gap-3">
        {currentQ.items.map((item) => {
          const isSelected = selectedAns === item.id;
          const isCorrect = item.id === currentQ.correctId;
          let cardStyle = 'border-indigo-100 bg-white hover:border-indigo-300';
          if (isSelected && isCorrect) cardStyle = 'border-emerald-500 bg-emerald-50 scale-102';
          else if (isSelected && !isCorrect) cardStyle = 'border-red-400 bg-red-50 shake';

          return (
            <button key={item.id} onClick={() => handleOptionTap(item.id)} disabled={selectedAns !== null}
              className={`border-2 rounded-3xl p-4 flex flex-col items-center gap-3 shadow-md cursor-pointer active:scale-95 transition-all border-b-4 ${cardStyle}`}>
              {/* Emoji with gradient bg */}
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${CONCEPT_COLORS[currentQ.concept]} flex items-center justify-center text-5xl shadow-sm`}>
                {item.emoji}
              </div>
              <span className="text-sm font-black text-indigo-950">{item.label}</span>
              <span className="text-[10px] font-bold text-indigo-950/40 text-center leading-tight">{item.description}</span>
            </button>
          );
        })}
      </div>

      <div className="min-h-[20px] flex items-center justify-center">
        {showCorrect ? <p className="text-xs font-black text-emerald-600 uppercase tracking-wider">⭐ Correct! Well done!</p>
          : showWrong ? <p className="text-xs font-black text-red-500 uppercase tracking-wider">🙅 Try the other one!</p>
          : <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1"><HelpCircle size={11}/> Think carefully and tap the right one!</p>}
      </div>
    </div>
  );
}
