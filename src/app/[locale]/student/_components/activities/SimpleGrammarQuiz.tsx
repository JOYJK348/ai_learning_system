'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';
import { shuffle } from '@/core/data/letterData';

type Props = {
  mode?: 'ONE_MANY' | 'MALE_FEMALE' | 'THIS_THAT' | 'HE_SHE';
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type GrammarQuestion = {
  sentenceStart: string;
  sentenceEnd: string;
  correctAnswer: string;
  options: string[];
  emoji: string;
};

const POOLS: Record<string, GrammarQuestion[]> = {
  ONE_MANY: [
    { sentenceStart: 'One Apple 🍎 ➔ Many ', sentenceEnd: '', correctAnswer: 'Apples', options: ['Apples', 'Apple'], emoji: '🍎' },
    { sentenceStart: 'One Cat 🐱 ➔ Many ', sentenceEnd: '', correctAnswer: 'Cats', options: ['Cats', 'Cat'], emoji: '🐱' },
    { sentenceStart: 'One Ball ⚽ ➔ Many ', sentenceEnd: '', correctAnswer: 'Balls', options: ['Balls', 'Ball'], emoji: '⚽' },
    { sentenceStart: 'One Dog 🐶 ➔ Many ', sentenceEnd: '', correctAnswer: 'Dogs', options: ['Dogs', 'Dog'], emoji: '🐶' },
    { sentenceStart: 'One Star ⭐ ➔ Many ', sentenceEnd: '', correctAnswer: 'Stars', options: ['Stars', 'Star'], emoji: '⭐' },
  ],
  MALE_FEMALE: [
    { sentenceStart: 'He is a ', sentenceEnd: '.', correctAnswer: 'boy', options: ['boy', 'girl'], emoji: '👦' },
    { sentenceStart: 'She is a ', sentenceEnd: '.', correctAnswer: 'girl', options: ['girl', 'boy'], emoji: '👧' },
    { sentenceStart: 'This is ', sentenceEnd: ' book.', correctAnswer: 'his', options: ['his', 'her'], emoji: '👦📖' },
    { sentenceStart: 'This is ', sentenceEnd: ' bag.', correctAnswer: 'her', options: ['her', 'his'], emoji: '👧🎒' },
    { sentenceStart: '', sentenceEnd: ' is a mother.', correctAnswer: 'She', options: ['She', 'He'], emoji: '👩' },
  ],
  THIS_THAT: [
    { sentenceStart: '', sentenceEnd: ' is an apple in my hand.', correctAnswer: 'This', options: ['This', 'That'], emoji: '🍎' },
    { sentenceStart: '', sentenceEnd: ' is a cloud far in the sky.', correctAnswer: 'That', options: ['That', 'This'], emoji: '☁️' },
    { sentenceStart: '', sentenceEnd: ' is my book right here.', correctAnswer: 'This', options: ['This', 'That'], emoji: '📖' },
    { sentenceStart: 'Look at ', sentenceEnd: ' star far away.', correctAnswer: 'that', options: ['that', 'this'], emoji: '⭐' },
    { sentenceStart: '', sentenceEnd: ' is my puppy on my lap.', correctAnswer: 'This', options: ['This', 'That'], emoji: '🐶' },
  ],
  HE_SHE: [
    { sentenceStart: '', sentenceEnd: ' is playing with a ball.', correctAnswer: 'He', options: ['He', 'She'], emoji: '👦' },
    { sentenceStart: '', sentenceEnd: ' is singing a song.', correctAnswer: 'She', options: ['She', 'He'], emoji: '👧' },
    { sentenceStart: '', sentenceEnd: ' is a doctor.', correctAnswer: 'He', options: ['He', 'She'], emoji: '👨‍⚕️' },
    { sentenceStart: '', sentenceEnd: ' is a teacher.', correctAnswer: 'She', options: ['She', 'He'], emoji: '👩‍🏫' },
    { sentenceStart: '', sentenceEnd: ' is riding a bicycle.', correctAnswer: 'She', options: ['She', 'He'], emoji: '🚲' },
  ],
};

export default function SimpleGrammarQuiz({ mode = 'ONE_MANY', onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const questionsList = useMemo(() => {
    return POOLS[mode] || POOLS.ONE_MANY;
  }, [mode]);

  const currentQ = questionsList[currentIdx];

  // Shuffle option cards dynamically
  const shuffledOptions = useMemo(() => {
    if (!currentQ) return [];
    return shuffle([...currentQ.options]);
  }, [currentQ]);

  const handleOptionTap = (word: string) => {
    if (selectedWord !== null || showWrong || showCorrect || done) return;

    setSelectedWord(word);
    const isCorrect = word.toLowerCase() === currentQ.correctAnswer.toLowerCase();

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
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Grammar Star!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Splendid! You answered all grammar questions correctly! 🌟
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
          🧩 Grammar Builder Board
        </span>
        <h3 className="text-2xl font-black text-indigo-950 mt-2 leading-tight">
          Select the correct word!
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

      {/* Sentence Panel */}
      <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2.5rem] p-6 shadow-xl flex flex-col items-center justify-center gap-5 relative">
        <div className="w-20 h-20 rounded-3xl bg-white border-2 border-indigo-50 shadow-md flex items-center justify-center text-5xl select-none">
          {currentQ.emoji}
        </div>

        {/* Sentence Skeleton */}
        <div className="text-lg sm:text-xl font-bold text-indigo-950 text-center leading-relaxed font-sans px-2 flex flex-wrap items-center justify-center gap-1.5">
          {currentQ.sentenceStart}
          
          {/* Slot */}
          <span className={`inline-flex min-w-[4rem] px-3 py-1 rounded-xl border-2 flex-shrink-0 items-center justify-center text-base font-black shadow-inner leading-none
            ${showCorrect 
              ? 'bg-emerald-500 border-emerald-650 text-white' 
              : showWrong 
                ? 'bg-red-500 border-red-650 text-white animate-[shake_0.4s_ease-in-out]' 
                : selectedWord 
                  ? 'bg-indigo-100 border-indigo-300 text-indigo-700' 
                  : 'bg-white border-dashed border-indigo-200 text-transparent'}`}
          >
            {selectedWord || '?'}
          </span>

          {currentQ.sentenceEnd}
        </div>
      </div>

      {/* 2 Choice options cards */}
      <div className="grid grid-cols-2 gap-4 w-full mt-2">
        {shuffledOptions.map((word) => {
          const isSelected = selectedWord === word;
          const isCorrect = word.toLowerCase() === currentQ.correctAnswer.toLowerCase();

          let btnStyle = 'border-indigo-150 bg-white border-b-4 hover:border-indigo-200';
          if (isSelected && isCorrect) {
            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-inner scale-103 border-b-2';
          } else if (isSelected && !isCorrect) {
            btnStyle = 'border-red-500 bg-red-50 text-red-700 animate-[shake_0.4s_ease-in-out] border-b-2';
          }

          return (
            <button
              key={word}
              onClick={() => handleOptionTap(word)}
              disabled={selectedWord !== null}
              className={`h-14 sm:h-16 rounded-2xl border-2 flex flex-col items-center justify-center text-xl sm:text-2xl font-black font-sans shadow-md select-none transition-all cursor-pointer ${btnStyle}`}
            >
              {word}
            </button>
          );
        })}
      </div>

      {/* Help Tips */}
      <div className="min-h-[24px] flex items-center justify-center text-center mt-1">
        {showCorrect ? (
          <p className="text-sm font-black text-emerald-600 uppercase tracking-wider">
            ⭐ Superb! The sentence is grammatically correct!
          </p>
        ) : showWrong ? (
          <p className="text-sm font-black text-red-500 uppercase tracking-wider">
            🙅 Oops! That is incorrect grammar. Try again!
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <HelpCircle size={12} /> Select the correct word to match the grammar rule!
          </p>
        )}
      </div>
    </div>
  );
}
