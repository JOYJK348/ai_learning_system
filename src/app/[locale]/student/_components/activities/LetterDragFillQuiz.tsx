'use client';

import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { getLetterData, shuffle } from '@/core/data/letterData';

type Props = {
  mode: 'starting' | 'ending';
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type DragQuestion = {
  word: string;
  emoji: string;
  displayParts: { prefix: string; suffix: string }; // prefix + '?' + suffix
  correctAnswer: string;
  options: string[];
};

const ENDING_WORDS: Record<string, { word: string; emoji: string }> = {
  T: { word: 'CAT', emoji: '🐱' },
  G: { word: 'DOG', emoji: '🐶' },
  N: { word: 'SUN', emoji: '☀️' },
  D: { word: 'RED', emoji: '🔴' },
  X: { word: 'BOX', emoji: '📦' },
  P: { word: 'CUP', emoji: '🥤' },
};

const STARTING_WORDS: Record<string, { word: string; emoji: string }> = {
  A: { word: 'APPLE', emoji: '🍎' },
  B: { word: 'BALL', emoji: '⚽' },
  C: { word: 'CAT', emoji: '🐱' },
  D: { word: 'DOG', emoji: '🐶' },
  F: { word: 'FISH', emoji: '🐟' },
  S: { word: 'SUN', emoji: '☀️' },
};

export default function LetterDragFillQuiz({ mode, onComplete }: Props) {
  // Generate 5 questions based on mode
  const questions = useMemo(() => {
    const list: DragQuestion[] = [];
    const sourceMap = mode === 'ending' ? ENDING_WORDS : STARTING_WORDS;
    const targetLetters = Object.keys(sourceMap);
    const shuffledKeys = shuffle([...targetLetters]).slice(0, 5);

    shuffledKeys.forEach((key) => {
      const info = sourceMap[key];
      const word = info.word;
      
      let prefix = '';
      let suffix = '';
      if (mode === 'starting') {
        prefix = '';
        suffix = word.slice(1);
      } else {
        prefix = word.slice(0, -1);
        suffix = '';
      }

      // Options
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      const pool = alphabet.filter(l => l !== key);
      const wrong = shuffle(pool).slice(0, 2);
      const options = shuffle([key, ...wrong]);

      list.push({
        word,
        emoji: info.emoji,
        displayParts: { prefix, suffix },
        correctAnswer: key,
        options
      });
    });
    return list;
  }, [mode]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showWrong, setShowWrong] = useState(false);
  const [wrongLetter, setWrongLetter] = useState<string | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [placedLetter, setPlacedLetter] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentQ = questions[currentIdx];

  const handleOptionTap = (letter: string) => {
    if (showCorrect || showWrong || done) return;

    const isCorrect = letter === currentQ.correctAnswer;
    
    // Animate letter flying into slot
    setPlacedLetter(letter);

    if (isCorrect) {
      setScore(s => s + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        setPlacedLetter(null);
        if (currentIdx < questions.length - 1) {
          setCurrentIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 1200);
    } else {
      setShowWrong(true);
      setWrongLetter(letter);
      setTimeout(() => {
        setShowWrong(false);
        setPlacedLetter(null);
        setWrongLetter(null);
      }, 1000);
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
        <motion.span
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-8xl"
        >🌟</motion.span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Super Solver!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          You completed all the missing letter puzzles! 🧩⭐
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onComplete({
            score: Math.round((score / questions.length) * 100), max_score: 100,
            completion_data: { score, total: questions.length },
            time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
          })}
          className="w-full max-w-xs inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl transition-all border-b-4 border-emerald-700 active:scale-95 cursor-pointer"
        >
          Continue ➡️
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-4 kids-font">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font {
          font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
        }
      `}} />

      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🧩 {mode === 'starting' ? 'Starting Letter Puzzle' : 'Ending Letter Puzzle'}
        </span>
        <h3 className="text-2xl font-black text-indigo-950 mt-2">
          {mode === 'starting' ? 'Drag/Tap the starting letter!' : 'Drag/Tap the ending letter!'}
        </h3>
      </div>

      {/* Progress Indicators */}
      <div className="flex items-center gap-2 bg-indigo-50/50 px-4 py-1.5 rounded-full border border-indigo-100/30">
        {questions.map((_, i) => (
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

      {/* Board Card */}
      <motion.div
        key={currentIdx}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-xs p-6 rounded-[2.5rem] border-2 border-indigo-100 border-b-4 flex flex-col items-center justify-center bg-white shadow-lg"
      >
        <span className="text-7xl drop-shadow-sm mb-4 select-none">{currentQ.emoji}</span>
        
        {/* Missing Letter Slot Layout */}
        <div className="flex items-center justify-center text-3xl font-black text-indigo-950 font-sans tracking-wide">
          {/* Prefix (e.g. C A for CAT) */}
          {currentQ.displayParts.prefix && (
            <span className="uppercase tracking-widest mr-2">{currentQ.displayParts.prefix}</span>
          )}

          {/* Missing slot box */}
          <div 
            className={`w-12 h-14 rounded-2xl border-2 flex items-center justify-center text-2xl font-black shadow-inner transition-all duration-200
              ${placedLetter 
                ? showCorrect
                  ? 'bg-emerald-500 border-emerald-600 text-white shadow-none'
                  : 'bg-red-500 border-red-600 text-white shadow-none animate-[shake_0.4s_ease-in-out]'
                : 'bg-indigo-50/50 border-indigo-200 border-dashed text-indigo-300 animate-pulse'}`}
          >
            {placedLetter || '?'}
          </div>

          {/* Suffix (e.g. P P L E for APPLE) */}
          {currentQ.displayParts.suffix && (
            <span className="uppercase tracking-widest ml-2">{currentQ.displayParts.suffix}</span>
          )}
        </div>
      </motion.div>

      {/* Choice Option Bubbles */}
      <div className="flex items-center justify-center gap-4 mt-2 w-full max-w-xs">
        {currentQ.options.map((letter) => {
          const isPlaced = placedLetter === letter;
          const isWrong = wrongLetter === letter;

          let btnStyle = 'border-indigo-100 bg-white border-b-4 hover:border-indigo-200';
          if (isPlaced && showCorrect) {
            btnStyle = 'border-emerald-500 bg-emerald-50 opacity-20 cursor-not-allowed border-b-2 shadow-none';
          } else if (isPlaced && isWrong) {
            btnStyle = 'border-red-500 bg-red-100 text-red-700 shadow-inner border-b-2';
          }

          return (
            <motion.button
              key={letter}
              whileHover={!placedLetter ? { scale: 1.08, y: -2 } : {}}
              whileTap={!placedLetter ? { scale: 0.92 } : {}}
              onClick={() => !placedLetter && handleOptionTap(letter)}
              disabled={!!placedLetter}
              className={`w-14 h-16 rounded-2xl border-2 flex items-center justify-center text-3xl font-black font-sans shadow-md select-none transition-all cursor-pointer ${btnStyle}`}
            >
              {letter}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback Overlay messages */}
      <div className="min-h-[24px] flex items-center justify-center text-center mt-2">
        <AnimatePresence mode="wait">
          {showCorrect ? (
            <motion.p key="correct" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              className="text-sm font-black text-emerald-600 uppercase tracking-wider"
            >
              🎉 Super! That completes the word!
            </motion.p>
          ) : showWrong ? (
            <motion.p key="wrong" initial={{ x: -10, opacity: 0 }} animate={{ x: [0, -8, 8, -6, 6, 0], opacity: 1 }} exit={{ opacity: 0 }}
              className="text-sm font-black text-red-500 uppercase tracking-wider"
            >
              🙅 Try again! That's not the correct letter.
            </motion.p>
          ) : (
            <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1">
              <HelpCircle size={12} /> Tap the correct letter to fill the slot!
            </p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
