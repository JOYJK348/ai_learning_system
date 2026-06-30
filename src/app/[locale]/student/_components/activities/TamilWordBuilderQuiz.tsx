'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';

type Props = {
  lessonTitle: string;
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type WordData = {
  targetWord: string;
  splitLetters: string[]; // e.g. ['ம', 'ர', 'ம்']
  emoji: string;
  hint: string;
};

export default function TamilWordBuilderQuiz({ lessonTitle, onComplete }: Props) {
  // Determine starting round word based on lesson title
  const initialWord = useMemo((): WordData => {
    if (lessonTitle.includes('கல்') || lessonTitle.includes('க + ல்')) {
      return { targetWord: 'கல்', splitLetters: ['க', 'ல்'], emoji: '🪨', hint: 'Stone' };
    }
    return { targetWord: 'மரம்', splitLetters: ['ம', 'ர', 'ம்'], emoji: '🌳', hint: 'Tree' };
  }, [lessonTitle]);

  const rounds = useMemo((): WordData[] => {
    const list: WordData[] = [initialWord];
    if (initialWord.targetWord === 'மரம்') {
      list.push({ targetWord: 'படம்', splitLetters: ['ப', 'ட', 'ம்'], emoji: '🖼️', hint: 'Picture' });
      list.push({ targetWord: 'அம்மா', splitLetters: ['அ', 'ம்', 'மா'], emoji: '👩', hint: 'Mother' });
    } else {
      list.push({ targetWord: 'பல்', splitLetters: ['ப', 'ல்'], emoji: '🦷', hint: 'Tooth' });
      list.push({ targetWord: 'நாய்', splitLetters: ['நா', 'ய்'], emoji: '🐶', hint: 'Dog' });
    }
    return list;
  }, [initialWord]);

  const [roundIdx, setRoundIdx] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentRound = rounds[roundIdx];

  // Generate scrambled options
  const scrambledOptions = useMemo(() => {
    // Generate unique index/key for each letter block to allow duplicate letters (e.g. if a word had repeating letters)
    return currentRound.splitLetters
      .map((letter, idx) => ({ id: `${letter}-${idx}`, letter }))
      .sort(() => Math.random() - 0.5);
  }, [currentRound]);

  // Track which block IDs have been placed
  const [usedBlockIds, setUsedBlockIds] = useState<string[]>([]);

  const handleLetterTap = (id: string, letter: string) => {
    if (showSuccess || showError) return;

    const nextIndex = selectedLetters.length;
    const expectedLetter = currentRound.splitLetters[nextIndex];

    if (letter === expectedLetter) {
      const newSelected = [...selectedLetters, letter];
      setSelectedLetters(newSelected);
      setUsedBlockIds([...usedBlockIds, id]);

      // Check if word completed
      if (newSelected.length === currentRound.splitLetters.length) {
        setCorrectCount(c => c + 1);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setSelectedLetters([]);
          setUsedBlockIds([]);
          if (roundIdx < rounds.length - 1) {
            setRoundIdx(r => r + 1);
          } else {
            setDone(true);
          }
        }, 1300);
      }
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 850);
    }
  };

  const handleReset = () => {
    setSelectedLetters([]);
    setUsedBlockIds([]);
  };

  if (done) {
    const pct = Math.round((correctCount / rounds.length) * 100);
    return (
      <div className="flex flex-col items-center gap-6 px-6 py-10 kids-font">
        <style dangerouslySetInnerHTML={{__html:`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&display=swap'); .kids-font{font-family:'Baloo 2',sans-serif!important;}`}} />
        <span className="text-8xl select-none">🏆</span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase">எழுத்து சேர்க்கை நாயகன்!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">Superb! You joined the letters to form words! 🌟</p>
        <button onClick={() => onComplete({ score: pct, max_score: 100, completion_data: { score: correctCount, total: rounds.length }, time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000) })}
          className="w-full max-w-xs px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-lg shadow-xl border-b-4 border-emerald-700 active:scale-95 cursor-pointer text-center">
          Continue ➡️
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 px-3 py-2 w-full max-w-md mx-auto kids-font select-none">
      <style dangerouslySetInnerHTML={{__html:`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&display=swap');
        .kids-font{font-family:'Baloo 2',sans-serif!important;}
      `}} />

      {/* Header */}
      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          📖 எழுத்து சேர்த்தல்
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1">
          எழுத்துக்களை இணைத்து சொல் உருவாக்கு!
        </h3>
        <p className="text-[10px] font-bold text-indigo-900/40 uppercase tracking-wider -mt-0.5">
          Tap the letters in the correct order to spell the word!
        </p>
      </div>

      {/* Progress indicators */}
      <div className="flex items-center gap-1.5 justify-center">
        {rounds.map((_, idx) => (
          <div key={idx} className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300
            ${idx < roundIdx ? 'bg-emerald-500 border-emerald-600' : idx === roundIdx ? 'bg-indigo-600 border-indigo-700 ring-2 ring-indigo-300' : 'bg-white border-slate-200'}`} />
        ))}
      </div>

      {/* Word display board */}
      <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2rem] p-6 shadow-md flex flex-col items-center justify-center gap-3 min-h-[9rem]">
        <span className="text-6xl">{currentRound.emoji}</span>
        <span className="text-sm font-black text-amber-900/60 uppercase tracking-widest -mt-1">{currentRound.hint}</span>

        {/* Selected target word slots */}
        <div className="flex items-center gap-3 mt-1">
          {currentRound.splitLetters.map((letter, idx) => {
            const isFilled = idx < selectedLetters.length;
            return (
              <div
                key={idx}
                className={`w-14 h-14 rounded-2xl border-3 flex items-center justify-center text-2xl font-black transition-all
                  ${isFilled ? 'bg-indigo-50 border-indigo-500 text-indigo-950 shadow-sm' : 'bg-amber-50/20 border-dashed border-amber-200 text-transparent'}`}
              >
                {isFilled ? selectedLetters[idx] : ''}
              </div>
            );
          })}
        </div>
      </div>

      {/* Scrambled Blocks Choice */}
      <div className="w-full mt-2">
        <p className="text-xs font-black text-indigo-900/50 text-center uppercase tracking-widest mb-3">
          Available Blocks:
        </p>
        <div className="flex items-center justify-center gap-4">
          {scrambledOptions.map((opt) => {
            const isUsed = usedBlockIds.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => handleLetterTap(opt.id, opt.letter)}
                disabled={isUsed}
                className={`w-16 h-16 rounded-2xl border-3 flex items-center justify-center text-3xl font-black transition-all shadow-md active:scale-95 cursor-pointer
                  ${isUsed ? 'bg-slate-100 border-slate-200 text-slate-300 scale-90 shadow-none cursor-default' : 'bg-white border-indigo-200 text-indigo-950 hover:border-indigo-400'}`}
              >
                {opt.letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback panel */}
      <div className="min-h-[22px] flex items-center justify-center mt-2">
        {showSuccess ? (
          <p className="text-sm font-black text-emerald-600 uppercase tracking-wider flex items-center gap-1">
            <Sparkles size={14} /> அற்புதம்! {currentRound.targetWord}!
          </p>
        ) : showError ? (
          <p className="text-sm font-black text-red-500 uppercase tracking-wider">
            🙅 தவறு! சரியான எழுத்தைத் தொடு!
          </p>
        ) : (
          <button
            onClick={handleReset}
            disabled={selectedLetters.length === 0}
            className={`text-xs font-black uppercase tracking-wider transition-all
              ${selectedLetters.length > 0 ? 'text-indigo-600 hover:text-indigo-800 cursor-pointer' : 'text-slate-300 cursor-default'}`}
          >
            🔄 Reset Round
          </button>
        )}
      </div>
    </div>
  );
}
