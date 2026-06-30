'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';
import { shuffle } from '@/core/data/letterData';

type Props = {
  mode?: 'ANIMALS' | 'BIRDS' | 'FRUITS' | 'VEGETABLES' | 'BODY_PARTS' | 'FAMILY' | 'SCHOOL';
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type VocabQuestion = {
  targetWord: string;
  correctEmoji: string;
  options: { word: string; emoji: string }[];
};

const POOLS: Record<string, VocabQuestion[]> = {
  ANIMALS: [
    { targetWord: 'TIGER', correctEmoji: '🐯', options: [{ word: 'TIGER', emoji: '🐯' }, { word: 'LION', emoji: '🦁' }, { word: 'MONKEY', emoji: '🐵' }] },
    { targetWord: 'ELEPHANT', correctEmoji: '🐘', options: [{ word: 'ELEPHANT', emoji: '🐘' }, { word: 'GIRAFFE', emoji: '🦒' }, { word: 'ZEBRA', emoji: '🦓' }] },
    { targetWord: 'MONKEY', correctEmoji: '🐵', options: [{ word: 'DOG', emoji: '🐶' }, { word: 'CAT', emoji: '🐱' }, { word: 'MONKEY', emoji: '🐵' }] },
    { targetWord: 'LION', correctEmoji: '🦁', options: [{ word: 'LION', emoji: '🦁' }, { word: 'TIGER', emoji: '🐯' }, { word: 'BEAR', emoji: '🐻' }] },
    { targetWord: 'ZEBRA', correctEmoji: '🦓', options: [{ word: 'ZEBRA', emoji: '🦓' }, { word: 'HORSE', emoji: '🐎' }, { word: 'COW', emoji: '🐮' }] },
  ],
  BIRDS: [
    { targetWord: 'PARROT', correctEmoji: '🦜', options: [{ word: 'PARROT', emoji: '🦜' }, { word: 'OWL', emoji: '🦉' }, { word: 'EAGLE', emoji: '🦅' }] },
    { targetWord: 'OWL', correctEmoji: '🦉', options: [{ word: 'OWL', emoji: '🦉' }, { word: 'DUCK', emoji: '🦆' }, { word: 'PENGUIN', emoji: '🐧' }] },
    { targetWord: 'PEACOCK', correctEmoji: '🦚', options: [{ word: 'PEACOCK', emoji: '🦚' }, { word: 'CHICKEN', emoji: '🐔' }, { word: 'DOVE', emoji: '🕊️' }] },
    { targetWord: 'DUCK', correctEmoji: '🦆', options: [{ word: 'DUCK', emoji: '🦆' }, { word: 'SWAN', emoji: '🦢' }, { word: 'EAGLE', emoji: '🦅' }] },
    { targetWord: 'EAGLE', correctEmoji: '🦅', options: [{ word: 'EAGLE', emoji: '🦅' }, { word: 'OWL', emoji: '🦉' }, { word: 'PARROT', emoji: '🦜' }] },
  ],
  FRUITS: [
    { targetWord: 'APPLE', correctEmoji: '🍎', options: [{ word: 'APPLE', emoji: '🍎' }, { word: 'BANANA', emoji: '🍌' }, { word: 'GRAPES', emoji: '🍇' }] },
    { targetWord: 'BANANA', correctEmoji: '🍌', options: [{ word: 'BANANA', emoji: '🍌' }, { word: 'ORANGE', emoji: '🍊' }, { word: 'STRAWBERRY', emoji: '🍓' }] },
    { targetWord: 'GRAPES', correctEmoji: '🍇', options: [{ word: 'GRAPES', emoji: '🍇' }, { word: 'WATERMELON', emoji: '🍉' }, { word: 'PINEAPPLE', emoji: '🍍' }] },
    { targetWord: 'MANGO', correctEmoji: '🥭', options: [{ word: 'MANGO', emoji: '🥭' }, { word: 'APPLE', emoji: '🍎' }, { word: 'CHERRY', emoji: '🍒' }] },
    { targetWord: 'ORANGE', correctEmoji: '🍊', options: [{ word: 'ORANGE', emoji: '🍊' }, { word: 'LEMON', emoji: '🍋' }, { word: 'PEAR', emoji: '🍐' }] },
  ],
  VEGETABLES: [
    { targetWord: 'POTATO', correctEmoji: '🥔', options: [{ word: 'POTATO', emoji: '🥔' }, { word: 'CARROT', emoji: '🥕' }, { word: 'ONION', emoji: '🧅' }] },
    { targetWord: 'CARROT', correctEmoji: '🥕', options: [{ word: 'CARROT', emoji: '🥕' }, { word: 'BROCCOLI', emoji: '🥦' }, { word: 'CORN', emoji: '🌽' }] },
    { targetWord: 'TOMATO', correctEmoji: '🍅', options: [{ word: 'TOMATO', emoji: '🍅' }, { word: 'CUCUMBER', emoji: '🥒' }, { word: 'LETTUCE', emoji: '🥬' }] },
    { targetWord: 'CORN', correctEmoji: '🌽', options: [{ word: 'CORN', emoji: '🌽' }, { word: 'POTATO', emoji: '🥔' }, { word: 'CARROT', emoji: '🥕' }] },
    { targetWord: 'BROCCOLI', correctEmoji: '🥦', options: [{ word: 'BROCCOLI', emoji: '🥦' }, { word: 'ONION', emoji: '🧅' }, { word: 'TOMATO', emoji: '🍅' }] },
  ],
  BODY_PARTS: [
    { targetWord: 'EYE', correctEmoji: '👁️', options: [{ word: 'EYE', emoji: '👁️' }, { word: 'EAR', emoji: '👂' }, { word: 'NOSE', emoji: '👃' }] },
    { targetWord: 'EAR', correctEmoji: '👂', options: [{ word: 'EAR', emoji: '👂' }, { word: 'MOUTH', emoji: '👄' }, { word: 'HAND', emoji: '🖐️' }] },
    { targetWord: 'NOSE', correctEmoji: '👃', options: [{ word: 'NOSE', emoji: '👃' }, { word: 'EYE', emoji: '👁️' }, { word: 'TONGUE', emoji: '👅' }] },
    { targetWord: 'HAND', correctEmoji: '🖐️', options: [{ word: 'HAND', emoji: '🖐️' }, { word: 'FOOT', emoji: '🦶' }, { word: 'EAR', emoji: '👂' }] },
    { targetWord: 'FOOT', correctEmoji: '🦶', options: [{ word: 'FOOT', emoji: '🦶' }, { word: 'HAND', emoji: '🖐️' }, { word: 'NOSE', emoji: '👃' }] },
  ],
  FAMILY: [
    { targetWord: 'FATHER', correctEmoji: '👨', options: [{ word: 'FATHER', emoji: '👨' }, { word: 'MOTHER', emoji: '👩' }, { word: 'BABY', emoji: '👶' }] },
    { targetWord: 'MOTHER', correctEmoji: '👩', options: [{ word: 'MOTHER', emoji: '👩' }, { word: 'SISTER', emoji: '👧' }, { word: 'BROTHER', emoji: '👦' }] },
    { targetWord: 'BABY', correctEmoji: '👶', options: [{ word: 'BABY', emoji: '👶' }, { word: 'FATHER', emoji: '👨' }, { word: 'GRANDMA', emoji: '👵' }] },
    { targetWord: 'BROTHER', correctEmoji: '👦', options: [{ word: 'BROTHER', emoji: '👦' }, { word: 'SISTER', emoji: '👧' }, { word: 'FATHER', emoji: '👨' }] },
    { targetWord: 'SISTER', correctEmoji: '👧', options: [{ word: 'SISTER', emoji: '👧' }, { word: 'BROTHER', emoji: '👦' }, { word: 'MOTHER', emoji: '👩' }] },
  ],
  SCHOOL: [
    { targetWord: 'BOOK', correctEmoji: '📖', options: [{ word: 'BOOK', emoji: '📖' }, { word: 'PENCIL', emoji: '✏️' }, { word: 'BAG', emoji: '🎒' }] },
    { targetWord: 'PENCIL', correctEmoji: '✏️', options: [{ word: 'PENCIL', emoji: '✏️' }, { word: 'RULER', emoji: '📏' }, { word: 'SCISSORS', emoji: '✂️' }] },
    { targetWord: 'BAG', correctEmoji: '🎒', options: [{ word: 'BAG', emoji: '🎒' }, { word: 'BOOK', emoji: '📖' }, { word: 'CHAIR', emoji: '🪑' }] },
    { targetWord: 'RULER', correctEmoji: '📏', options: [{ word: 'RULER', emoji: '📏' }, { word: 'PENCIL', emoji: '✏️' }, { word: 'FOLDER', emoji: '📁' }] },
    { targetWord: 'CHAIR', correctEmoji: '🪑', options: [{ word: 'CHAIR', emoji: '🪑' }, { word: 'BAG', emoji: '🎒' }, { word: 'BOOK', emoji: '📖' }] },
  ],
};

export default function VocabularyQuiz({ mode = 'ANIMALS', onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const questionsList = useMemo(() => {
    return POOLS[mode] || POOLS.ANIMALS;
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
    const isCorrect = word.toUpperCase() === currentQ.targetWord.toUpperCase();

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
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Vocab Champion!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Awesome job! You matched all the naming words correctly! 🌟
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
          🧩 Naming Words Game
        </span>
        <h3 className="text-2xl font-black text-indigo-950 mt-2 leading-tight">
          Find the matching picture!
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

      {/* Target Word Display Card */}
      <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2rem] p-5 flex flex-col items-center justify-center gap-2 shadow-md">
        <span className="text-xs font-black text-amber-900/40 uppercase tracking-wider">
          TAP THE PICTURE FOR:
        </span>
        <span className="text-3xl sm:text-4xl font-black text-indigo-650 font-sans tracking-wide">
          {currentQ.targetWord}
        </span>
      </div>

      {/* 3 Choice Option Picture Cards */}
      <div className="grid grid-cols-3 gap-3.5 w-full mt-2">
        {shuffledOptions.map((opt) => {
          const isSelected = selectedWord === opt.word;
          const isCorrect = opt.word.toUpperCase() === currentQ.targetWord.toUpperCase();

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
              className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-2 shadow-md select-none transition-all cursor-pointer ${btnStyle}`}
            >
              <span className="text-4xl select-none">{opt.emoji}</span>
              <span className="text-[10px] font-black font-sans uppercase tracking-wide mt-1.5 leading-none">
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
            ⭐ Spot on! That is the {currentQ.targetWord}!
          </p>
        ) : showWrong ? (
          <p className="text-sm font-black text-red-500 uppercase tracking-wider">
            🙅 Oops! That is a different item!
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <HelpCircle size={12} /> Tap the card matching the name word!
          </p>
        )}
      </div>
    </div>
  );
}
