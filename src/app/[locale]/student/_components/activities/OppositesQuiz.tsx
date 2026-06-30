'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';
import { shuffle } from '@/core/data/letterData';

type Props = {
  mode?: 'BIG_SMALL' | 'TALL_SHORT' | 'HOT_COLD' | 'UP_DOWN' | 'OPEN_CLOSE' | 'FAST_SLOW';
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type OppositeQuestion = {
  prompt: string;
  targetWord: string;
  targetEmoji: string;
  correctAnswer: string;
  correctEmoji: string;
  options: { word: string; emoji: string }[];
};

const POOLS: Record<string, OppositeQuestion[]> = {
  BIG_SMALL: [
    {
      prompt: 'What is the opposite of...',
      targetWord: 'BIG', targetEmoji: '🐘',
      correctAnswer: 'SMALL', correctEmoji: '🐭',
      options: [
        { word: 'SMALL', emoji: '🐭' },
        { word: 'TALL', emoji: '🦒' },
      ],
    },
    {
      prompt: 'What is the opposite of...',
      targetWord: 'SMALL', targetEmoji: '🐭',
      correctAnswer: 'BIG', correctEmoji: '🐘',
      options: [
        { word: 'BIG', emoji: '🐘' },
        { word: 'SHORT', emoji: '🧍' },
      ],
    },
    {
      prompt: 'Which one is BIG?',
      targetWord: 'BIG CHALLENGE', targetEmoji: '🔍',
      correctAnswer: 'ELEPHANT', correctEmoji: '🐘',
      options: [
        { word: 'ELEPHANT', emoji: '🐘' },
        { word: 'MOUSE', emoji: '🐭' },
      ],
    },
  ],
  TALL_SHORT: [
    {
      prompt: 'What is the opposite of...',
      targetWord: 'TALL', targetEmoji: '🦒',
      correctAnswer: 'SHORT', correctEmoji: '🧍',
      options: [
        { word: 'SHORT', emoji: '🧍' },
        { word: 'SLOW', emoji: '🐢' },
      ],
    },
    {
      prompt: 'What is the opposite of...',
      targetWord: 'SHORT', targetEmoji: '🧍',
      correctAnswer: 'TALL', correctEmoji: '🦒',
      options: [
        { word: 'TALL', emoji: '🦒' },
        { word: 'SMALL', emoji: '🐭' },
      ],
    },
    {
      prompt: 'Review: What is the opposite of...',
      targetWord: 'BIG', targetEmoji: '🐘',
      correctAnswer: 'SMALL', correctEmoji: '🐭',
      options: [
        { word: 'SMALL', emoji: '🐭' },
        { word: 'HOT', emoji: '🔥' },
      ],
    },
  ],
  HOT_COLD: [
    {
      prompt: 'What is the opposite of...',
      targetWord: 'HOT', targetEmoji: '🔥',
      correctAnswer: 'COLD', correctEmoji: '❄️',
      options: [
        { word: 'COLD', emoji: '❄️' },
        { word: 'OPEN', emoji: '🚪' },
      ],
    },
    {
      prompt: 'What is the opposite of...',
      targetWord: 'COLD', targetEmoji: '❄️',
      correctAnswer: 'HOT', correctEmoji: '🔥',
      options: [
        { word: 'HOT', emoji: '🔥' },
        { word: 'DOWN', emoji: '⚓' },
      ],
    },
    {
      prompt: 'Review: What is the opposite of...',
      targetWord: 'TALL', targetEmoji: '🦒',
      correctAnswer: 'SHORT', correctEmoji: '🧍',
      options: [
        { word: 'SHORT', emoji: '🧍' },
        { word: 'SLOW', emoji: '🐢' },
      ],
    },
  ],
  UP_DOWN: [
    {
      prompt: 'What is the opposite of...',
      targetWord: 'UP', targetEmoji: '🎈',
      correctAnswer: 'DOWN', correctEmoji: '⚓',
      options: [
        { word: 'DOWN', emoji: '⚓' },
        { word: 'SMALL', emoji: '🐭' },
      ],
    },
    {
      prompt: 'What is the opposite of...',
      targetWord: 'DOWN', targetEmoji: '⚓',
      correctAnswer: 'UP', correctEmoji: '🎈',
      options: [
        { word: 'UP', emoji: '🎈' },
        { word: 'CLOSE', emoji: '🔒' },
      ],
    },
    {
      prompt: 'Review: What is the opposite of...',
      targetWord: 'HOT', targetEmoji: '🔥',
      correctAnswer: 'COLD', correctEmoji: '❄️',
      options: [
        { word: 'COLD', emoji: '❄️' },
        { word: 'SHORT', emoji: '🧍' },
      ],
    },
  ],
  OPEN_CLOSE: [
    {
      prompt: 'What is the opposite of...',
      targetWord: 'OPEN', targetEmoji: '🚪',
      correctAnswer: 'CLOSE', correctEmoji: '🔒',
      options: [
        { word: 'CLOSE', emoji: '🔒' },
        { word: 'SLOW', emoji: '🐢' },
      ],
    },
    {
      prompt: 'What is the opposite of...',
      targetWord: 'CLOSE', targetEmoji: '🔒',
      correctAnswer: 'OPEN', correctEmoji: '🚪',
      options: [
        { word: 'OPEN', emoji: '🚪' },
        { word: 'DOWN', emoji: '⚓' },
      ],
    },
    {
      prompt: 'Review: What is the opposite of...',
      targetWord: 'UP', targetEmoji: '🎈',
      correctAnswer: 'DOWN', correctEmoji: '⚓',
      options: [
        { word: 'DOWN', emoji: '⚓' },
        { word: 'SMALL', emoji: '🐭' },
      ],
    },
  ],
  FAST_SLOW: [
    {
      prompt: 'What is the opposite of...',
      targetWord: 'FAST', targetEmoji: '🚀',
      correctAnswer: 'SLOW', correctEmoji: '🐢',
      options: [
        { word: 'SLOW', emoji: '🐢' },
        { word: 'CLOSE', emoji: '🔒' },
      ],
    },
    {
      prompt: 'What is the opposite of...',
      targetWord: 'SLOW', targetEmoji: '🐢',
      correctAnswer: 'FAST', correctEmoji: '🚀',
      options: [
        { word: 'FAST', emoji: '🚀' },
        { word: 'COLD', emoji: '❄️' },
      ],
    },
    {
      prompt: 'Review: What is the opposite of...',
      targetWord: 'OPEN', targetEmoji: '🚪',
      correctAnswer: 'CLOSE', correctEmoji: '🔒',
      options: [
        { word: 'CLOSE', emoji: '🔒' },
        { word: 'SHORT', emoji: '🧍' },
      ],
    },
  ],
};

export default function OppositesQuiz({ mode = 'BIG_SMALL', onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const questionsList = useMemo(() => {
    return POOLS[mode] || POOLS.BIG_SMALL;
  }, [mode]);

  const currentQ = questionsList[currentIdx];

  // Shuffle options row dynamically
  const shuffledOptions = useMemo(() => {
    if (!currentQ) return [];
    return shuffle([...currentQ.options]);
  }, [currentQ]);

  const handleOptionTap = (word: string) => {
    if (selectedWord !== null || showWrong || showCorrect || done) return;

    setSelectedWord(word);
    const isCorrect = word.toUpperCase() === currentQ.correctAnswer.toUpperCase();

    if (isCorrect) {
      setScore(s => s + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        setSelectedWord(null);
        if (currentIdx < questionsList.length - 1) {
          setCurrentIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 1200);
    } else {
      setShowWrong(true);
      setTimeout(() => {
        setShowWrong(false);
        setSelectedWord(null);
      }, 800);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-6 px-6 py-10 kids-font">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
          .kids-font {
            font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
          }
        `}} />
        <span className="text-8xl select-none">🏆</span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Opposite Master!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Spectacular! You correctly matched all the opposite words! 🌟
        </p>
        <button
          onClick={() => onComplete({
            score: Math.round((score / questionsList.length) * 100), max_score: 100,
            completion_data: { score, total: questionsList.length },
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
    <div className="flex flex-col items-center gap-5 px-4 py-4 w-full max-w-sm mx-auto kids-font select-none">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font {
          font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
        }
      `}} />

      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🧩 Opposites Board Game
        </span>
        <h3 className="text-2xl font-black text-indigo-950 mt-2 leading-tight">
          Find the Opposite!
        </h3>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-2 bg-indigo-50/50 px-4 py-1.5 rounded-full border border-indigo-100/30">
        {questionsList.map((_, i) => (
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

      {/* Split Cards Display Board */}
      <div className="w-full grid grid-cols-2 gap-4 mt-2">
        {/* Left Side: Target card */}
        <div className="bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2rem] p-4 flex flex-col items-center justify-center gap-3 shadow-md">
          <span className="text-xs font-black text-amber-900/40 uppercase tracking-wider">
            {currentQ.prompt.includes('Which one') ? 'FIND' : 'WORD'}
          </span>
          <div className="text-5xl select-none">{currentQ.targetEmoji}</div>
          <span className="text-xl font-black text-amber-950 font-sans tracking-wide">
            {currentQ.targetWord}
          </span>
        </div>

        {/* Right Side: Opposite/Result Slot card */}
        <div className={`border-4 rounded-[2rem] p-4 flex flex-col items-center justify-center gap-3 shadow-md transition-all duration-150
          ${showCorrect 
            ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
            : showWrong 
              ? 'bg-red-50 border-red-500 text-red-700 animate-[shake_0.4s_ease-in-out]' 
              : selectedWord 
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700' 
                : 'bg-white border-dashed border-indigo-200 text-indigo-950/20'}`}
        >
          <span className="text-xs font-black uppercase tracking-wider">
            OPPOSITE
          </span>
          <div className="text-5xl select-none">
            {showCorrect ? currentQ.correctEmoji : showWrong ? '🙅' : '?'}
          </div>
          <span className="text-xl font-black font-sans tracking-wide">
            {showCorrect ? currentQ.correctAnswer : '?'}
          </span>
        </div>
      </div>

      {/* Interactive Options Cards */}
      <div className="grid grid-cols-2 gap-4 w-full mt-3">
        {shuffledOptions.map((opt) => {
          const isSelected = selectedWord === opt.word;
          const isCorrect = opt.word.toUpperCase() === currentQ.correctAnswer.toUpperCase();

          let btnStyle = 'border-indigo-150 bg-white border-b-4 hover:border-indigo-200';
          if (isSelected && isCorrect) {
            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-inner scale-103 border-b-2';
          } else if (isSelected && !isCorrect) {
            btnStyle = 'border-red-500 bg-red-50 text-red-700 animate-[shake_0.4s_ease-in-out] border-b-2';
          }

          return (
            <button
              key={opt.word}
              onClick={() => handleOptionTap(opt.word)}
              disabled={selectedWord !== null}
              className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 shadow-md select-none transition-all cursor-pointer ${btnStyle}`}
            >
              <span className="text-4xl select-none">{opt.emoji}</span>
              <span className="text-lg font-black font-sans tracking-wide uppercase">
                {opt.word}
              </span>
            </button>
          );
        })}
      </div>

      {/* Helper feedback text */}
      <div className="min-h-[24px] flex items-center justify-center text-center mt-1">
        {showCorrect ? (
          <p className="text-sm font-black text-emerald-600 uppercase tracking-wider">
            ⭐ Brilliant! Perfect Match!
          </p>
        ) : showWrong ? (
          <p className="text-sm font-black text-red-500 uppercase tracking-wider">
            🙅 Oops! That is not the opposite!
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <HelpCircle size={12} /> Select the correct opposite card!
          </p>
        )}
      </div>
    </div>
  );
}
