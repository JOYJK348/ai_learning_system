'use client';

import React, { useState, useRef, useMemo, useCallback } from 'react';
import { HelpCircle } from 'lucide-react';
import { shuffle } from '@/core/data/letterData';

type Props = {
  mode?: 'TWO_WORD' | 'THREE_WORD' | 'FOUR_WORD' | 'READING';
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type SentenceQuestion = {
  words: string[];  // correct order
  emoji: string;
};

const POOLS: Record<string, SentenceQuestion[]> = {
  TWO_WORD: [
    { words: ['I', 'play'], emoji: '🎮' },
    { words: ['He', 'runs'], emoji: '🏃' },
    { words: ['She', 'sings'], emoji: '🎤' },
    { words: ['We', 'eat'], emoji: '🍽️' },
    { words: ['They', 'jump'], emoji: '🙌' },
  ],
  THREE_WORD: [
    { words: ['I', 'can', 'run'], emoji: '🏃' },
    { words: ['She', 'can', 'sing'], emoji: '🎤' },
    { words: ['He', 'can', 'fly'], emoji: '✈️' },
    { words: ['We', 'can', 'play'], emoji: '🎮' },
    { words: ['I', 'am', 'happy'], emoji: '😊' },
  ],
  FOUR_WORD: [
    { words: ['This', 'is', 'my', 'book'], emoji: '📖' },
    { words: ['He', 'is', 'a', 'boy'], emoji: '👦' },
    { words: ['I', 'see', 'a', 'dog'], emoji: '🐶' },
    { words: ['She', 'has', 'a', 'bag'], emoji: '🎒' },
    { words: ['We', 'like', 'to', 'play'], emoji: '🎮' },
  ],
  READING: [
    { words: ['The', 'cat', 'is', 'fat'], emoji: '🐱' },
    { words: ['I', 'can', 'see', 'stars'], emoji: '⭐' },
    { words: ['She', 'eats', 'a', 'mango'], emoji: '🥭' },
    { words: ['We', 'go', 'to', 'school'], emoji: '🏫' },
    { words: ['He', 'has', 'big', 'ball'], emoji: '⚽' },
  ],
};

export default function SentenceBuilderQuiz({ mode = 'TWO_WORD', onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const questionsList = useMemo(() => POOLS[mode] || POOLS.TWO_WORD, [mode]);
  const currentQ = questionsList[currentIdx];

  // Shuffle tiles at start of each question
  const initialTiles = useMemo(() => {
    if (!currentQ) return [];
    return shuffle(currentQ.words.map((w, i) => ({ id: i, word: w })));
  }, [currentQ]);

  const [placedIds, setPlacedIds] = useState<number[]>([]);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);

  // Reset state when question changes
  const prevIdx = useRef(-1);
  if (prevIdx.current !== currentIdx) {
    prevIdx.current = currentIdx;
    // reset will happen via key change
  }

  const placedWords = placedIds.map(id => initialTiles.find(t => t.id === id)?.word ?? '');
  const remainingTiles = initialTiles.filter(t => !placedIds.includes(t.id));
  const allPlaced = placedIds.length === currentQ?.words.length;

  const handleTileTap = useCallback((id: number) => {
    if (showWrong || showCorrect) return;
    setPlacedIds(prev => {
      const next = [...prev, id];

      // Check correctness only when all slots filled
      if (next.length === currentQ.words.length) {
        const placedWordList = next.map(pid => initialTiles.find(t => t.id === pid)?.word ?? '');
        const isCorrect = placedWordList.every((w, i) => w === currentQ.words[i]);

        if (isCorrect) {
          setScore(s => s + 1);
          setShowCorrect(true);
          setTimeout(() => {
            setShowCorrect(false);
            setPlacedIds([]);
            if (currentIdx < questionsList.length - 1) {
              setCurrentIdx(i => i + 1);
            } else {
              setDone(true);
            }
          }, 1300);
        } else {
          setShowWrong(true);
          setTimeout(() => {
            setShowWrong(false);
            setPlacedIds([]);
          }, 900);
        }
        return next;
      }
      return next;
    });
  }, [showWrong, showCorrect, currentQ, initialTiles, currentIdx, questionsList.length]);

  const handleRemoveLast = useCallback(() => {
    if (showWrong || showCorrect || allPlaced) return;
    setPlacedIds(prev => prev.slice(0, -1));
  }, [showWrong, showCorrect, allPlaced]);

  if (done) {
    return (
      <div className="flex flex-col items-center gap-6 px-6 py-10 kids-font">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
          .kids-font { font-family: 'Baloo 2', 'Fredoka', sans-serif !important; }
        `}} />
        <span className="text-8xl select-none">🏆</span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Sentence Star!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Amazing! You built all the sentences correctly! 🌟
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
    <div key={currentIdx} className="flex flex-col items-center gap-5 px-4 py-4 w-full max-w-sm mx-auto kids-font select-none">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font { font-family: 'Baloo 2', 'Fredoka', sans-serif !important; }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
        .shake { animation: shake 0.4s ease-in-out; }
      `}} />

      {/* Header */}
      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🧩 Sentence Builder Board
        </span>
        <h3 className="text-2xl font-black text-indigo-950 mt-2 leading-tight">
          Tap words to build the sentence!
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

      {/* Sentence Card with Emoji + Slot Row */}
      <div className={`w-full bg-[#fdfbf6] border-4 rounded-[2rem] p-5 shadow-md flex flex-col items-center gap-4 transition-colors duration-200
        ${showCorrect ? 'border-emerald-400' : showWrong ? 'border-red-400 shake' : 'border-[#e9d1a8]'}`}>
        
        {/* Emoji */}
        <div className="text-5xl select-none">{currentQ.emoji}</div>

        {/* Slot Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 w-full min-h-[3rem]">
          {currentQ.words.map((_, slotIdx) => {
            const filledWord = placedWords[slotIdx];
            const isFilled = filledWord !== undefined;
            return (
              <div
                key={slotIdx}
                className={`min-w-[2.5rem] px-3 py-1.5 rounded-xl border-2 flex items-center justify-center text-sm font-black font-sans shadow-inner transition-all leading-none
                  ${isFilled 
                    ? showCorrect 
                      ? 'bg-emerald-500 border-emerald-600 text-white' 
                      : showWrong 
                        ? 'bg-red-500 border-red-600 text-white' 
                        : 'bg-indigo-100 border-indigo-300 text-indigo-800' 
                    : 'bg-white border-dashed border-indigo-200 text-transparent'}`}
              >
                {isFilled ? filledWord : '_'}
              </div>
            );
          })}
        </div>

        {/* Undo last button */}
        {placedIds.length > 0 && !allPlaced && !showWrong && !showCorrect && (
          <button
            onClick={handleRemoveLast}
            className="text-[10px] font-black text-indigo-400 uppercase tracking-wider underline cursor-pointer"
          >
            ↩ Undo last word
          </button>
        )}
      </div>

      {/* Word Tiles Row */}
      <div className="flex flex-wrap justify-center gap-3 w-full mt-1">
        {remainingTiles.map(tile => (
          <button
            key={tile.id}
            onClick={() => handleTileTap(tile.id)}
            disabled={showWrong || showCorrect}
            className="px-4 py-2.5 bg-white border-2 border-indigo-150 border-b-4 border-b-indigo-300 rounded-2xl text-base font-black font-sans text-indigo-950 shadow-md hover:border-indigo-300 active:scale-95 transition-all cursor-pointer select-none"
          >
            {tile.word}
          </button>
        ))}
        {remainingTiles.length === 0 && !showCorrect && !showWrong && (
          <p className="text-xs font-bold text-indigo-900/40 uppercase tracking-widest">Checking...</p>
        )}
      </div>

      {/* Feedback */}
      <div className="min-h-[24px] flex items-center justify-center text-center mt-1">
        {showCorrect ? (
          <p className="text-sm font-black text-emerald-600 uppercase tracking-wider">
            ⭐ Perfect! Great sentence!
          </p>
        ) : showWrong ? (
          <p className="text-sm font-black text-red-500 uppercase tracking-wider">
            🙅 Wrong order! Try again!
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <HelpCircle size={12} /> Tap the words in the correct order!
          </p>
        )}
      </div>
    </div>
  );
}
