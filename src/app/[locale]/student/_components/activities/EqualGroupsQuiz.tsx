'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type EqualGroupChoice = {
  emoji: string;
  count: number;
  id: string;
};

type EqualGroupQuestion = {
  targetEmoji: string;
  targetCount: number;
  choices: EqualGroupChoice[];
  correctId: string;
};

const QUESTIONS: EqualGroupQuestion[] = [
  {
    targetEmoji: '🍊',
    targetCount: 4,
    choices: [
      { emoji: '🍎', count: 4, id: 'choice-a' },
      { emoji: '🍌', count: 6, id: 'choice-b' },
      { emoji: '🍓', count: 2, id: 'choice-c' },
    ],
    correctId: 'choice-a',
  },
  {
    targetEmoji: '🍪',
    targetCount: 3,
    choices: [
      { emoji: '🍩', count: 5, id: 'choice-a' },
      { emoji: '🧁', count: 3, id: 'choice-b' },
      { emoji: '🍬', count: 2, id: 'choice-c' },
    ],
    correctId: 'choice-b',
  },
  {
    targetEmoji: '🐸',
    targetCount: 5,
    choices: [
      { emoji: '🐢', count: 5, id: 'choice-a' },
      { emoji: '🐠', count: 4, id: 'choice-b' },
      { emoji: '🦀', count: 6, id: 'choice-c' },
    ],
    correctId: 'choice-a',
  },
  {
    targetEmoji: '🎈',
    targetCount: 6,
    choices: [
      { emoji: '🧸', count: 5, id: 'choice-a' },
      { emoji: '🎨', count: 7, id: 'choice-b' },
      { emoji: '🪁', count: 6, id: 'choice-c' },
    ],
    correctId: 'choice-c',
  },
  {
    targetEmoji: '🦋',
    targetCount: 2,
    choices: [
      { emoji: '🐝', count: 2, id: 'choice-a' },
      { emoji: '🐞', count: 3, id: 'choice-b' },
      { emoji: '🕷️', count: 1, id: 'choice-c' },
    ],
    correctId: 'choice-a',
  },
];

export default function EqualGroupsQuiz({ onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentQ = QUESTIONS[currentIdx];

  const shuffledChoices = useMemo(() => {
    if (!currentQ) return [];
    const a = [...currentQ.choices];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }, [currentIdx, currentQ]);

  const handleOptionTap = (choiceId: string) => {
    if (selectedAns !== null || showWrong || showCorrect || done) return;

    setSelectedAns(choiceId);
    const isCorrect = choiceId === currentQ.correctId;

    if (isCorrect) {
      setScore(s => s + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        setSelectedAns(null);
        if (currentIdx < QUESTIONS.length - 1) {
          setCurrentIdx(i => i + 1);
        } else {
          setDone(true);
        }
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
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
          .kids-font { font-family: 'Baloo 2', 'Fredoka', sans-serif !important; }
        `}} />
        <span className="text-8xl select-none">🏆</span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Equal Groups Hero!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Spectacular! You found all groups with the equal number of items! 🌟
        </p>
        <button
          onClick={() => onComplete({
            score: Math.round((score / QUESTIONS.length) * 100), max_score: 100,
            completion_data: { score, total: QUESTIONS.length },
            time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
          })}
          className="w-full max-w-xs inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl border-b-4 border-emerald-700 active:scale-95 cursor-pointer"
        >
          Continue ➡️
        </button>
      </div>
    );
  }

  return (
    <div key={currentIdx} className="flex flex-col items-center gap-4 px-3 py-2 w-full max-w-sm mx-auto kids-font select-none">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font { font-family: 'Baloo 2', 'Fredoka', sans-serif !important; }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
        .shake { animation: shake 0.4s ease-in-out; }
      `}} />

      {/* Header */}
      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🧺 Equal Groups Matcher
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1 leading-tight">
          Find the group that matches the target!
        </h3>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-1.5 bg-indigo-50/50 px-4 py-1 rounded-full border border-indigo-100/30">
        {QUESTIONS.map((_, i) => (
          <div key={i}
            className={`w-3.5 h-3.5 rounded-full border shadow-sm transition-all duration-300 flex items-center justify-center text-[7px] font-black
              ${i < currentIdx 
                ? 'bg-emerald-500 text-white border-emerald-400' 
                : i === currentIdx 
                  ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-300' 
                  : 'bg-white text-slate-300 border-slate-200'}`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* Target Basket */}
      <div className="w-full bg-[#fcf8f0] border-4 border-amber-250 rounded-[2rem] p-4 shadow-md flex flex-col items-center gap-1.5">
        <span className="text-[9px] font-black text-amber-900/40 uppercase tracking-wider">
          TARGET BASKET ({currentQ.targetCount})
        </span>
        
        {/* Target Items Container */}
        <div className="flex gap-1.5 p-3 bg-white rounded-2xl border border-amber-100/50 w-full min-h-[4rem] items-center justify-center">
          {Array.from({ length: currentQ.targetCount }).map((_, i) => (
            <span key={i} className="text-2xl select-none">{currentQ.targetEmoji}</span>
          ))}
        </div>
      </div>

      {/* Choice Baskets Options */}
      <div className="w-full flex flex-col gap-2.5">
        {shuffledChoices.map((choice) => {
          const isSelected = selectedAns === choice.id;
          const isCorrect = choice.id === currentQ.correctId;

          let btnStyle = 'border-indigo-100 bg-white hover:border-indigo-200';
          if (isSelected && isCorrect) {
            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-inner scale-102';
          } else if (isSelected && !isCorrect) {
            btnStyle = 'border-red-500 bg-red-50 text-red-700 shake';
          }

          return (
            <button
              key={choice.id}
              onClick={() => handleOptionTap(choice.id)}
              disabled={selectedAns !== null}
              className={`w-full border-2 rounded-2xl p-2.5 flex items-center justify-between transition-all active:scale-98 cursor-pointer shadow-sm ${btnStyle}`}
            >
              <div className="flex gap-1">
                {Array.from({ length: choice.count }).map((_, i) => (
                  <span key={i} className="text-xl select-none">{choice.emoji}</span>
                ))}
              </div>
              <span className="text-xs font-black bg-indigo-50/50 text-indigo-750 px-2 py-0.5 rounded-full border border-indigo-100/30">
                Count: {choice.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Helper text */}
      <div className="min-h-[20px] flex items-center justify-center text-center">
        {showCorrect ? (
          <p className="text-xs font-black text-emerald-600 uppercase tracking-wider">
            ⭐ Spot on! Perfect matching!
          </p>
        ) : showWrong ? (
          <p className="text-xs font-black text-red-500 uppercase tracking-wider">
            🙅 Wrong basket! Try again!
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <HelpCircle size={11} /> Find the choice basket with same count as the target!
          </p>
        )}
      </div>
    </div>
  );
}
