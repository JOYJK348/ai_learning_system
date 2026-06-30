'use client';

import React, { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { shuffle } from '@/core/data/letterData';

type Props = {
  mode?: 'starting' | 'ending';
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type MatchPair = {
  id: string;
  name: string;
  emoji: string;
  letter: string;
};

// Rounds for starting letters
const STARTING_ROUNDS: MatchPair[][] = [
  [
    { id: '1', name: 'APPLE', emoji: '🍎', letter: 'A' },
    { id: '2', name: 'BALL', emoji: '⚽', letter: 'B' },
    { id: '3', name: 'CAT', emoji: '🐱', letter: 'C' },
  ],
  [
    { id: '4', name: 'DOG', emoji: '🐶', letter: 'D' },
    { id: '5', name: 'FISH', emoji: '🐟', letter: 'F' },
    { id: '6', name: 'SUN', emoji: '☀️', letter: 'S' },
  ]
];

// Rounds for ending letters
const ENDING_ROUNDS: MatchPair[][] = [
  [
    { id: '1', name: 'CAT', emoji: '🐱', letter: 'T' },
    { id: '2', name: 'DOG', emoji: '🐶', letter: 'G' },
    { id: '3', name: 'SUN', emoji: '☀️', letter: 'N' },
  ],
  [
    { id: '4', name: 'RED', emoji: '🔴', letter: 'D' },
    { id: '5', name: 'BOX', emoji: '📦', letter: 'X' },
    { id: '6', name: 'CUP', emoji: '🥤', letter: 'P' },
  ]
];

export default function FeedMascotQuiz({ mode = 'starting', onComplete }: Props) {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const roundsData = useMemo(() => {
    return mode === 'ending' ? ENDING_ROUNDS : STARTING_ROUNDS;
  }, [mode]);

  const currentPairs = roundsData[round];

  // Keep state for left and right columns
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null); // holds pair.id
  const [selectedRight, setSelectedRight] = useState<string | null>(null); // holds pair.letter
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());

  // Shuffled items for columns (memorized per round)
  const leftColumn = useMemo(() => {
    return shuffle([...currentPairs]);
  }, [round, currentPairs]);

  const rightColumn = useMemo(() => {
    return shuffle(currentPairs.map(p => p.letter));
  }, [round, currentPairs]);

  const handleLeftTap = (id: string) => {
    if (matchedIds.has(id) || wrongFlash || done) return;
    
    if (selectedLeft === id) {
      setSelectedLeft(null);
    } else {
      setSelectedLeft(id);
      if (selectedRight) {
        resolveMatch(id, selectedRight);
      }
    }
  };

  const handleRightTap = (letter: string) => {
    const pair = currentPairs.find(p => p.letter === letter);
    if (!pair || matchedIds.has(pair.id) || wrongFlash || done) return;

    if (selectedRight === letter) {
      setSelectedRight(null);
    } else {
      setSelectedRight(letter);
      if (selectedLeft) {
        resolveMatch(selectedLeft, letter);
      }
    }
  };

  const resolveMatch = (leftId: string, rightLetter: string) => {
    const pair = currentPairs.find(p => p.id === leftId);
    if (pair && pair.letter === rightLetter) {
      // Correct!
      const nextMatched = new Set(matchedIds);
      nextMatched.add(leftId);
      setMatchedIds(nextMatched);
      setScore(s => s + 1);
      setSelectedLeft(null);
      setSelectedRight(null);

      // Check if round is finished
      if (nextMatched.size === currentPairs.length) {
        setTimeout(() => {
          if (round < roundsData.length - 1) {
            setRound(r => r + 1);
            setMatchedIds(new Set());
          } else {
            setDone(true);
          }
        }, 1000);
      }
    } else {
      // Wrong!
      setWrongFlash(true);
      setSelectedLeft(null);
      setSelectedRight(null);
      setTimeout(() => {
        setWrongFlash(false);
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
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Match Master!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Outstanding! You matched all pictures correctly! 🌟
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onComplete({
            score: 100, max_score: 100,
            completion_data: { score, total: 6 },
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
    <div className={`flex flex-col items-center gap-5 px-4 py-4 w-full max-w-sm mx-auto kids-font select-none ${wrongFlash ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font {
          font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
        }
      `}} />

      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🧩 {mode === 'starting' ? 'Starting Letter Connect' : 'Ending Letter Connect'}
        </span>
        <h3 className="text-2xl font-black text-indigo-950 mt-2">
          {mode === 'starting' ? 'Connect pictures to starting letters!' : 'Connect pictures to ending letters!'}
        </h3>
      </div>

      {/* Progress indicators (Rounds) */}
      <div className="flex items-center gap-2 bg-indigo-50/50 px-4 py-1.5 rounded-full border border-indigo-100/30">
        <span className="text-[10px] font-black text-indigo-650 uppercase tracking-wider">
          Round {round + 1} of {roundsData.length}
        </span>
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-2 gap-6 w-full mt-2">
        
        {/* Left Column: Pictures */}
        <div className="flex flex-col gap-3">
          <span className="text-[9px] font-black text-indigo-950/40 uppercase tracking-widest text-center">Pictures</span>
          {leftColumn.map((pair) => {
            const isMatched = matchedIds.has(pair.id);
            const isSelected = selectedLeft === pair.id;
            
            let cardStyle = 'border-indigo-100 bg-white border-b-4 hover:border-indigo-200';
            if (isMatched) cardStyle = 'border-emerald-500 bg-emerald-50 opacity-55 shadow-none';
            else if (isSelected) cardStyle = 'border-indigo-500 bg-indigo-55 ring-2 ring-indigo-300 scale-103';

            return (
              <motion.button
                key={`left-${pair.id}`}
                whileHover={!isMatched ? { scale: 1.03 } : {}}
                whileTap={!isMatched ? { scale: 0.96 } : {}}
                onClick={() => handleLeftTap(pair.id)}
                disabled={isMatched}
                className={`min-h-[72px] rounded-3xl border-2 flex flex-col items-center justify-center p-2.5 transition-all shadow-md cursor-pointer ${cardStyle}`}
              >
                <span className="text-4xl drop-shadow-sm select-none">{pair.emoji}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Right Column: Letters */}
        <div className="flex flex-col gap-3">
          <span className="text-[9px] font-black text-indigo-950/40 uppercase tracking-widest text-center">
            {mode === 'starting' ? 'Starting Letters' : 'Ending Letters'}
          </span>
          {rightColumn.map((letter) => {
            const pair = currentPairs.find(p => p.letter === letter);
            const isMatched = pair ? matchedIds.has(pair.id) : false;
            const isSelected = selectedRight === letter;

            let cardStyle = 'border-indigo-100 bg-white border-b-4 hover:border-indigo-200';
            if (isMatched) cardStyle = 'border-emerald-500 bg-emerald-50 opacity-55 shadow-none';
            else if (isSelected) cardStyle = 'border-indigo-500 bg-indigo-55 ring-2 ring-indigo-300 scale-103';

            return (
              <motion.button
                key={`right-${letter}`}
                whileHover={!isMatched ? { scale: 1.03 } : {}}
                whileTap={!isMatched ? { scale: 0.96 } : {}}
                onClick={() => handleRightTap(letter)}
                disabled={isMatched}
                className={`min-h-[72px] rounded-3xl border-2 flex items-center justify-center p-3.5 transition-all shadow-md cursor-pointer ${cardStyle}`}
              >
                <span className="text-3xl font-black font-sans uppercase text-indigo-950 select-none">
                  {letter}
                </span>
              </motion.button>
            );
          })}
        </div>

      </div>

      {/* Tip / Feedback */}
      <div className="min-h-[24px] flex items-center justify-center text-center mt-2">
        {wrongFlash ? (
          <p className="text-sm font-black text-red-500 uppercase tracking-wider animate-[shake_0.4s_ease-in-out]">
            🙅 Mismatch! Try matching again.
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <HelpCircle size={12} /> 
            {mode === 'starting' 
              ? 'Tap a picture, then tap its starting letter!' 
              : 'Tap a picture, then tap its ending letter!'}
          </p>
        )}
      </div>
    </div>
  );
}
