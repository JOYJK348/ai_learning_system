'use client';

import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, HelpCircle } from 'lucide-react';
import { getLetterData, shuffle } from '@/core/data/letterData';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type SpellerQuestion = {
  word: string;
  emoji: string;
  shuffledLetters: { id: string; char: string }[];
};

export default function WordBuilderQuiz({ onComplete }: Props) {
  const wordsToBuild = ['CAT', 'DOG', 'SUN', 'RED', 'NET', 'BOX'];

  const questions = useMemo(() => {
    const list: SpellerQuestion[] = [];
    
    wordsToBuild.forEach((word) => {
      // Get emoji from the first letter visual data
      const data = getLetterData(word[0]);
      
      // Shuffle the letters of the word
      const chars = word.split('').map((char, index) => ({
        id: `${char}-${index}`,
        char
      }));
      const shuffled = shuffle([...chars]);

      list.push({
        word,
        emoji: data.emoji,
        shuffledLetters: shuffled
      });
    });
    return list;
  }, []);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [typedLetters, setTypedLetters] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showWrong, setShowWrong] = useState(false);
  const [wrongChar, setWrongChar] = useState<string | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentQ = questions[currentIdx];

  const handleLetterTap = (letterObj: { id: string; char: string }) => {
    if (showCorrect || showWrong || done) return;

    // Check if the tapped letter is the next correct letter in the word
    const nextCorrectIndex = typedLetters.length;
    const nextCorrectChar = currentQ.word[nextCorrectIndex];

    if (letterObj.char === nextCorrectChar) {
      const nextTyped = [...typedLetters, letterObj.char];
      setTypedLetters(nextTyped);

      // Check if word is fully built
      if (nextTyped.length === currentQ.word.length) {
        setScore(s => s + 1);
        setShowCorrect(true);
        setTimeout(() => {
          setShowCorrect(false);
          setTypedLetters([]);
          if (currentIdx < questions.length - 1) {
            setCurrentIdx(i => i + 1);
          } else {
            setDone(true);
          }
        }, 1200);
      }
    } else {
      setWrongChar(letterObj.id);
      setShowWrong(true);
      setTimeout(() => {
        setShowWrong(false);
        setWrongChar(null);
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
        <motion.span
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-8xl"
        >🏆</motion.span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Master Word Builder!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Awesome! You spelled all the words correctly! 🧩🌟
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
    <div className={`flex flex-col items-center gap-6 px-4 py-4 kids-font ${showWrong ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font {
          font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
        }
      `}} />

      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🧩 Word Speller Quest
        </span>
        <h3 className="text-2xl font-black text-indigo-950 mt-2">
          Tap the letters to build the word!
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

      {/* Speller Board (Emoji + spelling slots) */}
      <motion.div
        key={currentIdx}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-xs p-6 rounded-[2.5rem] border-2 border-indigo-100 border-b-4 flex flex-col items-center justify-center bg-white shadow-lg"
      >
        <span className="text-7xl drop-shadow-sm mb-4 select-none">{currentQ.emoji}</span>
        
        {/* Letter slots display */}
        <div className="flex items-center gap-3">
          {currentQ.word.split('').map((char, idx) => {
            const hasLetter = typedLetters.length > idx;
            const letter = hasLetter ? typedLetters[idx] : '';
            return (
              <div 
                key={idx} 
                className={`w-12 h-14 rounded-2xl border-2 flex items-center justify-center text-2xl font-black font-sans shadow-inner transition-all duration-200
                  ${hasLetter 
                    ? showCorrect
                      ? 'bg-emerald-500 border-emerald-600 text-white shadow-none'
                      : 'bg-indigo-50 border-indigo-200 text-indigo-950'
                    : 'bg-slate-50 border-slate-200 text-transparent border-dashed'}`}
              >
                {letter}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Shuffled Letter Cards to Tap */}
      <div className="flex items-center justify-center gap-4 mt-2 w-full max-w-xs">
        {currentQ.shuffledLetters.map((letterObj) => {
          // Check if this letter is already tapped and placed
          // To handle duplicates, we track by index in typedLetters
          const charOccurrencesInWord = currentQ.word.split('').filter(c => c === letterObj.char).length;
          const charOccurrencesInTyped = typedLetters.filter(c => c === letterObj.char).length;
          
          // If we have typed this character enough times, hide/disable the card
          // Since our test words are simple CVC (CAT, DOG, SUN, RED, NET, BOX), letters are unique!
          const isUsed = typedLetters.includes(letterObj.char);
          const isWrong = wrongChar === letterObj.id;

          let btnStyle = 'border-indigo-100 bg-white border-b-4 hover:border-indigo-200';
          if (isUsed) {
            btnStyle = 'border-slate-100 bg-slate-50 opacity-30 cursor-not-allowed text-slate-350 shadow-none border-b-2';
          } else if (isWrong) {
            btnStyle = 'border-red-500 bg-red-50 text-red-700 shadow-md';
          }

          return (
            <motion.button
              key={letterObj.id}
              whileHover={!isUsed && !showCorrect ? { scale: 1.08, y: -2 } : {}}
              whileTap={!isUsed && !showCorrect ? { scale: 0.92 } : {}}
              onClick={() => !isUsed && handleLetterTap(letterObj)}
              disabled={isUsed || showCorrect}
              className={`w-14 h-16 rounded-2xl border-2 flex items-center justify-center text-3xl font-black font-sans shadow-md select-none transition-all cursor-pointer ${btnStyle}`}
            >
              {letterObj.char}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback messages */}
      <div className="min-h-[24px] flex items-center justify-center text-center mt-2">
        <AnimatePresence mode="wait">
          {showCorrect ? (
            <motion.p key="correct" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              className="text-sm font-black text-emerald-600 uppercase tracking-wider"
            >
              🎉 Perfect! Word built successfully!
            </motion.p>
          ) : showWrong ? (
            <motion.p key="wrong" initial={{ x: -10, opacity: 0 }} animate={{ x: [0, -8, 8, -6, 6, 0], opacity: 1 }} exit={{ opacity: 0 }}
              className="text-sm font-black text-red-500 uppercase tracking-wider"
            >
              🙅 Try again! That's not the next letter.
            </motion.p>
          ) : (
            <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1">
              <HelpCircle size={12} /> Tap letters in order to spell the word!
            </p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
