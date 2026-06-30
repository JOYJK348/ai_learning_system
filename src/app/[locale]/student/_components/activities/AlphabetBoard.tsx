'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { getLetterData } from '@/core/data/letterData';

type Props = {
  capital: boolean;
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

export default function AlphabetBoard({ capital, onComplete }: Props) {
  const letters = capital 
    ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    : 'abcdefghijklmnopqrstuvwxyz'.split('');
  
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [tappedLetters, setTappedLetters] = useState<Set<string>>(new Set());
  const startTime = useRef(Date.now());
  const allTapped = tappedLetters.size === 26;

  const handleLetterTap = (letter: string) => {
    setSelectedLetter(letter);
    setTappedLetters(prev => {
      const next = new Set(prev);
      next.add(letter);
      return next;
    });
  };

  const handleFinish = () => {
    onComplete({
      score: 100,
      max_score: 100,
      completion_data: { tapped_count: tappedLetters.size },
      time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full select-none max-w-2xl mx-auto px-2">
      <div className="text-center">
        <h2 className="text-2xl font-black text-indigo-950 flex items-center justify-center gap-2">
          📖 {capital ? 'Capital Letters A-Z' : 'Small Letters a-z'} Alphabet Board
        </h2>
        <p className="text-xs font-black text-indigo-900/40 uppercase tracking-widest mt-1">
          Tap each letter to see what it stands for! ({tappedLetters.size} / 26 Tapped)
        </p>
      </div>

      {/* Grid of letters */}
      <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 w-full max-h-[300px] overflow-y-auto p-2 bg-indigo-50/40 rounded-[2rem] border border-indigo-100">
        {letters.map((letter) => {
          const isTapped = tappedLetters.has(letter);
          const uppercase = letter.toUpperCase();
          const data = getLetterData(uppercase);
          const bgGradient = isTapped 
            ? 'from-emerald-400 to-teal-500 text-white border-emerald-300' 
            : 'from-white to-slate-50 text-indigo-950 border-indigo-100';

          return (
            <motion.button
              key={letter}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleLetterTap(letter)}
              className={`aspect-square flex items-center justify-center text-3xl font-black rounded-2xl border-2 shadow-sm bg-gradient-to-br ${bgGradient} transition-all`}
            >
              {letter}
            </motion.button>
          );
        })}
      </div>

      {/* Detail overlay card if letter tapped */}
      <AnimatePresence>
        {selectedLetter && (() => {
          const uppercase = selectedLetter.toUpperCase();
          const data = getLetterData(uppercase);
          return (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full bg-white border-2 border-indigo-150 rounded-[2.5rem] p-5 flex items-center justify-between gap-4 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${data.color} border-2 border-white flex items-center justify-center text-4xl shadow-md transform -rotate-3`}>
                  {selectedLetter}
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-black text-indigo-950 tracking-tight">
                    {selectedLetter} is for <span className="capitalize text-indigo-600">{data.word}</span>
                  </h3>
                  <p className="text-[11px] font-bold text-indigo-950/40 uppercase tracking-widest mt-0.5">
                    {LETTER_FACTS[selectedLetter] || `${selectedLetter} sounds like ${data.word}!`}
                  </p>
                </div>
              </div>
              <div className="text-5xl drop-shadow-md shrink-0 pr-2">
                {data.emoji}
              </div>
              <button 
                onClick={() => setSelectedLetter(null)}
                className="absolute top-2 right-3 text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                &times;
              </button>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Finish button */}
      <motion.button
        whileHover={allTapped ? { scale: 1.05 } : {}}
        whileTap={allTapped ? { scale: 0.95 } : {}}
        onClick={allTapped ? handleFinish : undefined}
        disabled={!allTapped}
        className={`w-full max-w-xs inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-lg shadow-xl transition-all border-b-4 
          ${allTapped 
            ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-700 cursor-pointer active:scale-95 animate-pulse' 
            : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'}`}
      >
        <CheckCircle size={22} /> {allTapped ? 'Done' : 'Tap all letters to unlock'}
      </motion.button>
      {!allTapped && (
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest -mt-2">
          Keep going! {26 - tappedLetters.size} letters remaining 🌟
        </span>
      )}
    </div>
  );
}

const LETTER_FACTS: Record<string, string> = {
  A: "A is for Apple 🍎", B: "B is for Ball ⚽", C: "C is for Cat 🐱", D: "D is for Dog 🐶",
  E: "E is for Elephant 🐘", F: "F is for Fish 🐟", G: "G is for Grapes 🍇", H: "H is for Hat 🎩",
  I: "I is for Ice Cream 🍦", J: "J is for Jug 🏺", K: "K is for Kite 🪁", L: "L is for Lion 🦁",
  M: "M is for Mango 🥭", N: "N is for Nest 🪺", O: "O is for Orange 🍊", P: "P is for Parrot 🦜",
  Q: "Q is for Queen 👑", R: "R is for Rabbit 🐰", S: "S is for Sun ☀️", T: "T is for Tiger 🐯",
  U: "U is for Umbrella ☂️", V: "V is for Van 🚐", W: "W is for Watch ⌚", X: "X is for Xylophone 🎹",
  Y: "Y is for Yak 🦬", Z: "Z is for Zebra 🦓",
  a: "a is for Apple 🍎", b: "b is for Ball ⚽", c: "c is for Cat 🐱", d: "d is for Dog 🐶",
  e: "e is for Elephant 🐘", f: "f is for Fish 🐟", g: "g is for Grapes 🍇", h: "h is for Hat 🎩",
  i: "i is for Ice Cream 🍦", j: "j is for Jug 🏺", k: "k is for Kite 🪁", l: "l is for Lion 🦁",
  m: "m is for Mango 🥭", n: "n is for Nest 🪺", o: "o is for Orange 🍊", p: "p is for Parrot 🦜",
  q: "q is for Queen 👑", r: "r is for Rabbit 🐰", s: "s is for Sun ☀️", t: "t is for Tiger 🐯",
  u: "u is for Umbrella ☂️", v: "v is for Van 🚐", w: "w is for Watch ⌚", x: "x is for Xylophone 🎹",
  y: "y is for Yak 🦬", z: "z is for Zebra 🦓",
};
