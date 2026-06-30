'use client';

import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, HelpCircle } from 'lucide-react';
import { getLetterData, shuffle } from '@/core/data/letterData';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type MatchQuestion = {
  capital: string;
  small: string;
  correct: boolean; // True if they actually match, False if mismatched
};

export default function LetterMatchQuiz({ onComplete }: Props) {
  const letters = 'ABCDEFGHJKLMNOPQRSTUVWXYZ'.split('');
  
  // Generate 5 questions (mix of correct pairs and mismatched pairs)
  const questions = useMemo(() => {
    const list: MatchQuestion[] = [];
    const shuffledLetters = shuffle([...letters]).slice(0, 5);
    
    shuffledLetters.forEach((char, idx) => {
      const shouldMatch = idx % 2 === 0; // Alternating correct/incorrect
      if (shouldMatch) {
        list.push({
          capital: char,
          small: char.toLowerCase(),
          correct: true
        });
      } else {
        // Pick a different letter for mismatch
        const pool = letters.filter(l => l !== char);
        const wrongChar = shuffle(pool)[0];
        list.push({
          capital: char,
          small: wrongChar.toLowerCase(),
          correct: false
        });
      }
    });
    return list;
  }, []);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentQ = questions[currentIdx];
  const capData = useMemo(() => getLetterData(currentQ.capital), [currentQ]);

  const handleAnswer = (answer: boolean) => {
    if (showCorrect || showWrong || done) return;
    
    const isCorrect = answer === currentQ.correct;
    if (isCorrect) {
      setScore(s => s + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        if (currentIdx < questions.length - 1) {
          setCurrentIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 1000);
    } else {
      setShowWrong(true);
      setTimeout(() => {
        setShowWrong(false);
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
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Quiz Finished!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          You got {score} out of {questions.length} correct matches!
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
          ✅ Matching Challenger
        </span>
        <h3 className="text-2xl font-black text-indigo-950 mt-2">
          Do these letters match?
        </h3>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-1.5 bg-indigo-50/50 px-4 py-1 rounded-full border border-indigo-100/30">
        {questions.map((_, i) => (
          <div key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300
              ${i < currentIdx ? 'bg-indigo-600' : i === currentIdx ? 'bg-indigo-400 ring-2 ring-indigo-200' : 'bg-slate-200'}`}
          />
        ))}
      </div>

      {/* Side-by-side Letter Cards */}
      <div className="flex items-center justify-center gap-6 mt-2 relative w-full max-w-xs">
        {/* Capital Letter Card */}
        <motion.div
          key={`cap-${currentIdx}`}
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-24 h-28 sm:w-28 sm:h-32 rounded-3xl border-2 border-indigo-100 border-b-4 flex flex-col items-center justify-center bg-white shadow-md"
        >
          <span className="text-5xl font-black text-indigo-950 font-sans uppercase">{currentQ.capital}</span>
          <span className="text-[9px] font-black text-indigo-900/30 uppercase tracking-wider mt-1">Capital</span>
        </motion.div>

        {/* Connection Link */}
        <span className="text-2xl text-indigo-900/20 font-black">↔</span>

        {/* Small Letter Card */}
        <motion.div
          key={`small-${currentIdx}`}
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-24 h-28 sm:w-28 sm:h-32 rounded-3xl border-2 border-indigo-100 border-b-4 flex flex-col items-center justify-center bg-white shadow-md"
        >
          <span className="text-5xl font-black text-indigo-950 font-sans lowercase">{currentQ.small}</span>
          <span className="text-[9px] font-black text-indigo-900/30 uppercase tracking-wider mt-1">Small</span>
        </motion.div>
      </div>

      {/* True/False Buttons */}
      <div className="grid grid-cols-2 gap-4 max-w-xs w-full mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAnswer(true)}
          disabled={showCorrect || showWrong}
          className="flex flex-col items-center justify-center gap-2 py-4 rounded-3xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg shadow-lg border-b-4 border-emerald-700 transition-all cursor-pointer active:scale-95"
        >
          <Check size={28} strokeWidth={3} />
          Yes! 👍
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAnswer(false)}
          disabled={showCorrect || showWrong}
          className="flex flex-col items-center justify-center gap-2 py-4 rounded-3xl bg-red-500 hover:bg-red-600 text-white font-black text-lg shadow-lg border-b-4 border-red-700 transition-all cursor-pointer active:scale-95"
        >
          <X size={28} strokeWidth={3} />
          No! 👎
        </motion.button>
      </div>

      {/* Feedback Overlay messages */}
      <div className="min-h-[24px] flex items-center justify-center text-center mt-2">
        <AnimatePresence mode="wait">
          {showCorrect ? (
            <motion.p key="correct" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              className="text-sm font-black text-emerald-600 uppercase tracking-wider"
            >
              🎉 Super! You got it right!
            </motion.p>
          ) : showWrong ? (
            <motion.p key="wrong" initial={{ x: -10, opacity: 0 }} animate={{ x: [0, -8, 8, -6, 6, 0], opacity: 1 }} exit={{ opacity: 0 }}
              className="text-sm font-black text-red-500 uppercase tracking-wider"
            >
              🙅 Oops! That is incorrect.
            </motion.p>
          ) : (
            <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1">
              <HelpCircle size={12} /> Tap Yes if they match, No if they don't!
            </p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
