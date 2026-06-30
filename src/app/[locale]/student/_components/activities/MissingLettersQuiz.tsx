'use client';

import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, HelpCircle } from 'lucide-react';
import { shuffle } from '@/core/data/letterData';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type SequenceQuestion = {
  sequence: string[]; // e.g. ['A', 'B', '_', 'D']
  missingIndex: number;
  correctAnswer: string;
  options: string[];
};

export default function MissingLettersQuiz({ onComplete }: Props) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Generate 5 missing letters sequence questions
  const questions = useMemo(() => {
    const list: SequenceQuestion[] = [];
    const startOffsets = [0, 4, 11, 15, 20]; // offsets like A, E, L, P, U
    
    startOffsets.forEach((start) => {
      const seq = alphabet.slice(start, start + 4); // get 4 letters
      if (seq.length < 4) return;
      
      const missingIndex = 2; // always hide the third letter for consistency in train
      const correctAnswer = seq[missingIndex];
      
      // Generate distractors
      const pool = alphabet.filter(l => !seq.includes(l));
      const wrong = shuffle(pool).slice(0, 2);
      const options = shuffle([correctAnswer, ...wrong]);

      // Hide the missing item in displayed sequence
      const displaySeq = [...seq];
      displaySeq[missingIndex] = '?';

      list.push({
        sequence: displaySeq,
        missingIndex,
        correctAnswer,
        options
      });
    });
    return list;
  }, []);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showWrong, setShowWrong] = useState(false);
  const [wrongLetter, setWrongLetter] = useState<string | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentQ = questions[currentIdx];

  const handleAnswer = (letter: string) => {
    if (showCorrect || showWrong || done) return;

    const isCorrect = letter === currentQ.correctAnswer;
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
      setWrongLetter(letter);
      setShowWrong(true);
      setTimeout(() => {
        setShowWrong(false);
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
        >🏆</motion.span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Train Completed!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          You completed all the alphabet sequences! 🚂🌟
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
          🚂 Alphabet Train Quest
        </span>
        <h3 className="text-2xl font-black text-indigo-950 mt-2">
          What letter goes in the "?" box?
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

      {/* Sequence Train Cards */}
      <div className="flex items-center justify-center gap-2.5 mt-2 w-full max-w-sm">
        {currentQ.sequence.map((letter, idx) => {
          const isMissing = letter === '?';
          const cardBg = isMissing
            ? showCorrect 
              ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
              : 'bg-yellow-50 border-yellow-300 text-yellow-700 animate-pulse'
            : 'bg-white border-indigo-100 text-indigo-950';

          return (
            <motion.div
              key={`${idx}-${letter}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.08 }}
              className={`w-16 h-20 rounded-2xl border-2 border-b-4 flex flex-col items-center justify-center shadow-md relative ${cardBg}`}
            >
              <span className="text-3xl font-black font-sans uppercase">
                {isMissing && showCorrect ? currentQ.correctAnswer : letter}
              </span>
              <span className="text-[7px] font-black text-indigo-900/30 uppercase tracking-wider mt-1">
                {isMissing ? 'Missing' : `Item ${idx + 1}`}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Choice Options */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="grid grid-cols-3 gap-4 max-w-sm w-full mt-4"
        >
          {currentQ.options.map((letter) => {
            const isWrongSelected = wrongLetter === letter;
            const isCorrectSelected = currentQ.correctAnswer === letter && showCorrect;

            let borderStyle = 'border-indigo-100 border-b-4 hover:border-indigo-200';
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
                onClick={() => handleAnswer(letter)}
                disabled={showCorrect}
                className={`flex flex-col items-center justify-center gap-2 p-4 sm:p-5 rounded-3xl border-2 transition-all shadow-md select-none cursor-pointer ${bgStyle} ${borderStyle}`}
              >
                <span className="text-4xl sm:text-5xl font-black drop-shadow-sm leading-none font-sans uppercase">
                  {letter}
                </span>
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-100 ${textStyle}`}>
                  Fill {letter}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Feedback Overlay messages */}
      <div className="min-h-[24px] flex items-center justify-center text-center mt-2">
        <AnimatePresence mode="wait">
          {showCorrect ? (
            <motion.p key="correct" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              className="text-sm font-black text-emerald-600 uppercase tracking-wider"
            >
              🎉 Perfect! Sequence completed!
            </motion.p>
          ) : showWrong ? (
            <motion.p key="wrong" initial={{ x: -10, opacity: 0 }} animate={{ x: [0, -8, 8, -6, 6, 0], opacity: 1 }} exit={{ opacity: 0 }}
              className="text-sm font-black text-red-500 uppercase tracking-wider"
            >
              🙅 Try again! That's not the missing letter.
            </motion.p>
          ) : (
            <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1">
              <HelpCircle size={12} /> Find the letter that completes the train!
            </p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
