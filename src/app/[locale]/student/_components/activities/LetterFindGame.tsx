'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLetterData, shuffle } from '@/core/data/letterData';
import { CheckCircle, HelpCircle } from 'lucide-react';

type Props = {
  config: { mode?: 'beginning_sound' | 'capital_to_small' | 'ending_letter'; letters?: string[] };
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

const ALL_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

const ENDING_WORDS: Record<string, { word: string; emoji: string; letter: string }> = {
  T: { word: 'CAT', emoji: '🐱', letter: 'T' },
  G: { word: 'DOG', emoji: '🐶', letter: 'G' },
  N: { word: 'SUN', emoji: '☀️', letter: 'N' },
  D: { word: 'RED', emoji: '🔴', letter: 'D' },
  X: { word: 'BOX', emoji: '📦', letter: 'X' },
  P: { word: 'CUP', emoji: '🥤', letter: 'P' },
};

export default function LetterFindGame({ config, onComplete }: Props) {
  const mode = config.mode || 'beginning_sound';
  const lessonLetters = (config.letters || ['A', 'B', 'C']).slice(0, 6);
  const [queue] = useState(() => shuffle(lessonLetters));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showWrong, setShowWrong] = useState(false);
  const [wrongLetter, setWrongLetter] = useState<string | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentLetter = queue[currentIdx];

  // Resolve details based on mode
  const currentData = useMemo(() => {
    if (mode === 'ending_letter') {
      const details = ENDING_WORDS[currentLetter.toUpperCase()];
      return details || { word: 'CAT', emoji: '🐱', letter: 'T' };
    }
    return getLetterData(currentLetter);
  }, [currentLetter, mode]);

  // Build 3 options: correct + 2 random wrong letters
  const options = useMemo(() => {
    const pool = ALL_LETTERS.filter(l => l !== currentLetter.toUpperCase());
    const wrong = shuffle(pool).slice(0, 2);
    return shuffle([currentLetter.toUpperCase(), ...wrong]);
  }, [currentLetter]);

  const handleTap = (letter: string) => {
    if (showCorrect || done) return;
    if (letter === currentLetter.toUpperCase()) {
      setShowCorrect(true);
      setScore(s => s + 1);
      setTimeout(() => {
        setShowCorrect(false);
        if (currentIdx < queue.length - 1) {
          setCurrentIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 1200);
    } else {
      setWrongLetter(letter);
      setShowWrong(true);
      setTimeout(() => {
        setShowWrong(false);
        setWrongLetter(null);
      }, 600);
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
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-8xl drop-shadow-md"
        >🎉</motion.span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Super job!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          You identified {score} out of {queue.length} letters! 🌟
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onComplete({
            score: Math.round((score / queue.length) * 100), max_score: 100,
            completion_data: { found: score, total: queue.length },
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
          🎯 {mode === 'capital_to_small' ? 'Letter Matching Quest' : mode === 'ending_letter' ? 'Ending Letter Finder' : 'Starting Letter Finder'}
        </span>
        <h3 className="text-2xl font-black text-indigo-950 mt-2 flex items-center justify-center gap-1.5">
          {mode === 'capital_to_small' ? (
            <>Find the matching small letter for <span className="text-indigo-600">"{currentLetter.toUpperCase()}"</span>!</>
          ) : mode === 'ending_letter' ? (
            <>What letter does <span className="text-indigo-600 capitalize">"{currentData.word}"</span> end with?</>
          ) : (
            <>What letter does <span className="text-indigo-600 capitalize">"{(currentData as any).word}"</span> start with?</>
          )}
        </h3>
      </div>

      {/* Progress indicators */}
      <div className="flex items-center gap-2 bg-indigo-50/50 px-4 py-1.5 rounded-full border border-indigo-100/30">
        {queue.map((l, i) => (
          <div key={l + i}
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

      {/* Large central clue illustration card */}
      <motion.div
        key={currentLetter}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-32 h-32 sm:w-36 sm:h-36 rounded-[2.5rem] flex flex-col items-center justify-center gap-1 shadow-xl border-4 border-white bg-gradient-to-br from-indigo-50 to-indigo-100/40"
      >
        {mode === 'capital_to_small' ? (
          <span className="text-6xl font-black text-indigo-950 uppercase select-none font-sans drop-shadow-sm leading-none">
            {currentLetter.toUpperCase()}
          </span>
        ) : (
          <>
            <span className="text-5xl drop-shadow-md">{currentData.emoji}</span>
            <span className="text-sm font-black text-indigo-900/50 uppercase tracking-widest mt-1">
              {currentData.word}
            </span>
          </>
        )}
      </motion.div>

      {/* 3 option cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLetter}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="grid grid-cols-3 gap-4 max-w-sm w-full"
        >
          {options.map((letter) => {
            const isWrongSelected = wrongLetter === letter;
            const isCorrectSelected = currentLetter.toUpperCase() === letter && showCorrect;

            let borderStyle = 'border-indigo-100 border-b-4 hover:border-indigo-200 hover:shadow-2xl';
            let bgStyle = 'bg-white hover:bg-slate-50';
            let textStyle = 'text-indigo-950';

            if (isCorrectSelected) {
              borderStyle = 'border-emerald-500 border-b-4 shadow-[0_0_20px_rgba(16,185,129,0.35)]';
              bgStyle = 'bg-emerald-50';
              textStyle = 'text-emerald-700';
            } else if (isWrongSelected) {
              borderStyle = 'border-red-500 border-b-4 shadow-[0_0_20px_rgba(239,68,68,0.35)]';
              bgStyle = 'bg-red-50';
              textStyle = 'text-red-700';
            }

            return (
              <motion.button
                key={letter}
                whileHover={!showCorrect ? { scale: 1.05 } : {}}
                whileTap={!showCorrect ? { scale: 0.95 } : {}}
                onClick={() => handleTap(letter)}
                disabled={showCorrect}
                className={`flex flex-col items-center justify-center gap-3 p-4 sm:p-5 rounded-3xl border-2 transition-all shadow-md select-none cursor-pointer ${bgStyle} ${borderStyle}`}
              >
                <span className="text-4xl sm:text-5xl font-black drop-shadow-sm leading-none block select-none uppercase font-sans">
                  {letter}
                </span>
                <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-slate-100 ${textStyle}`}>
                  Letter {letter}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Action / Help hints */}
      <div className="min-h-[24px] flex items-center justify-center text-center mt-2">
        <AnimatePresence mode="wait">
          {showCorrect ? (
            <motion.p key="correct" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              className="text-sm font-black text-emerald-600 uppercase tracking-wider"
            >
              {mode === 'ending_letter' ? (
                <>⭐ Correct! "{currentData.word}" ends with "{currentLetter.toUpperCase()}"!</>
              ) : (
                <>⭐ Correct! "{(currentData as any).word}" starts with "{currentLetter.toUpperCase()}"!</>
              )}
            </motion.p>
          ) : showWrong ? (
            <motion.p key="wrong" initial={{ x: -10, opacity: 0 }} animate={{ x: [0, -8, 8, -6, 6, 0], opacity: 1 }} exit={{ opacity: 0 }}
              className="text-sm font-black text-red-500 uppercase tracking-wider"
            >
              🙅 Try again! That's not the correct letter.
            </motion.p>
          ) : (
            <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1">
              <HelpCircle size={12} /> Tap the correct letter card!
            </p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
