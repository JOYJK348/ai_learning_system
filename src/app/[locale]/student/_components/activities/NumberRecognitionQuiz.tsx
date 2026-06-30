'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { shuffle } from '@/core/data/letterData';

type Props = {
  mode?: '1_50' | '51_100';
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

// Helper function to convert number to English word
const numberToWord = (num: number): string => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
                 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  if (num === 100) return 'One Hundred';
  if (num < 20) return ones[num];
  const t = Math.floor(num / 10);
  const o = num % 10;
  return tens[t] + (o > 0 ? '-' + ones[o] : '');
};

export default function NumberRecognitionQuiz({ mode = '1_50', onComplete }: Props) {
  const [phase, setPhase] = useState<'LEARN' | 'QUIZ'>('LEARN');
  const [selectedLearnNum, setSelectedLearnNum] = useState<number>(mode === '1_50' ? 1 : 51);
  const [tappedNumbers, setTappedNumbers] = useState<number[]>([mode === '1_50' ? 1 : 51]);
  const [exploredCount, setExploredCount] = useState<number>(1);
  
  // Quiz state
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  // Generate range of numbers for learn grid
  const startNum = mode === '1_50' ? 1 : 51;
  const endNum = mode === '1_50' ? 50 : 100;
  
  const [activeGroup, setActiveGroup] = useState<number>(startNum);

  // Split endNum to groups of 10
  const groups = useMemo(() => {
    const arr = [];
    for (let i = startNum; i <= endNum; i += 10) {
      arr.push(i);
    }
    return arr;
  }, [startNum, endNum]);

  const activeNumbers = useMemo(() => {
    const arr = [];
    const limit = Math.min(activeGroup + 9, endNum);
    for (let i = activeGroup; i <= limit; i++) {
      arr.push(i);
    }
    return arr;
  }, [activeGroup, endNum]);

  // Dynamic quiz questions generated based on the mode
  const quizQuestions = useMemo(() => {
    if (mode === '1_50') {
      return [
        {
          questionText: 'Find the number: Twenty-Four',
          correctAnswer: '24',
          options: ['24', '42', '14'],
        },
        {
          questionText: 'Which number comes next? 32, 33, [ ? ]',
          correctAnswer: '34',
          options: ['34', '43', '35'],
        },
        {
          questionText: 'Find the number: Forty-Nine',
          correctAnswer: '49',
          options: ['49', '39', '50'],
        }
      ];
    } else {
      return [
        {
          questionText: 'Find the number: Sixty-Eight',
          correctAnswer: '68',
          options: ['68', '86', '58'],
        },
        {
          questionText: 'Which number comes next? 87, 88, [ ? ]',
          correctAnswer: '89',
          options: ['89', '98', '90'],
        },
        {
          questionText: 'Find the number: Ninety-Five',
          correctAnswer: '95',
          options: ['95', '59', '90'],
        }
      ];
    }
  }, [mode]);

  const currentQ = quizQuestions[quizIdx];

  const shuffledOptions = useMemo(() => {
    if (!currentQ) return [];
    return shuffle([...currentQ.options]);
  }, [currentQ]);

  const handleLearnNumClick = (num: number) => {
    setSelectedLearnNum(num);
    setTappedNumbers(prev => prev.includes(num) ? prev : [...prev, num]);
    setExploredCount(prev => Math.min(prev + 1, 5));
  };

  const handleOptionTap = (option: string) => {
    if (selectedAns !== null || showWrong || showCorrect || done) return;

    setSelectedAns(option);
    const isCorrect = option === currentQ.correctAnswer;

    if (isCorrect) {
      setScore(s => s + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        setSelectedAns(null);
        if (quizIdx < quizQuestions.length - 1) {
          setQuizIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 1300);
    } else {
      setShowWrong(true);
      setTimeout(() => {
        setShowWrong(false);
        setSelectedAns(null);
      }, 800);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-6 px-6 py-10 kids-font">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
          .kids-font { font-family: 'Baloo 2', 'Fredoka', sans-serif !important; }
        `}} />
        <span className="text-8xl select-none">🏆</span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Math Hero!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Spectacular! You learned the numbers and passed the quiz! 🌟
        </p>
        <button
          onClick={() => onComplete({
            score: Math.round((score / quizQuestions.length) * 100), max_score: 100,
            completion_data: { score, total: quizQuestions.length },
            time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
          })}
          className="w-full max-w-xs inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl border-b-4 border-emerald-700 active:scale-95 cursor-pointer"
        >
          Continue ➡️
        </button>
      </div>
    );
  }

  // ────── Phase 1: Learn/Teaching Mode ──────
  if (phase === 'LEARN') {
    return (
      <div className="flex flex-col items-center gap-4 px-3 py-3 w-full max-w-md mx-auto kids-font select-none">
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
          .kids-font { font-family: 'Baloo 2', 'Fredoka', sans-serif !important; }
        `}} />

        <div className="text-center">
          <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
            📖 Montessori Learning Board
          </span>
          <h3 className="text-2xl font-black text-indigo-950 mt-2 leading-tight">
            Tap Numbers to Explore!
          </h3>
        </div>

        {/* Large Main Teaching Card */}
        <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2.5rem] p-5 shadow-lg flex flex-col items-center gap-3 relative">
          {/* Big Number */}
          <span className="text-6xl sm:text-7xl font-black text-indigo-600 tracking-tighter">
            {selectedLearnNum}
          </span>
          
          {/* Number Word */}
          <span className="text-xl font-bold text-amber-900 uppercase tracking-wider -mt-1 font-mono">
            {numberToWord(selectedLearnNum)}
          </span>

          {/* Visual Grid representing the number (Dots/Stars) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 max-h-[4rem] overflow-y-auto px-4 py-2 bg-white rounded-2xl border border-indigo-100/30 w-full">
            {Array.from({ length: selectedLearnNum }).map((_, i) => (
              <span key={i} className="text-sm select-none">⭐️</span>
            ))}
          </div>
        </div>

        {/* Group selector tabs */}
        <div className="flex gap-2 w-full overflow-x-auto py-1 justify-start sm:justify-center">
          {groups.map((groupVal) => (
            <button
              key={groupVal}
              onClick={() => {
                setActiveGroup(groupVal);
                handleLearnNumClick(groupVal);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer whitespace-nowrap
                ${activeGroup === groupVal 
                  ? 'bg-indigo-600 text-white border-indigo-500' 
                  : 'bg-white text-indigo-950 border-indigo-100 hover:bg-indigo-50/50'}`}
            >
              {groupVal}-{groupVal + 9}
            </button>
          ))}
        </div>

        {/* Number Keypad selection grid */}
        <div className="grid grid-cols-5 gap-2 w-full">
          {activeNumbers.map((num) => {
            const isSelected = selectedLearnNum === num;
            const isTapped = tappedNumbers.includes(num);
            return (
              <button
                key={num}
                onClick={() => handleLearnNumClick(num)}
                className={`h-11 sm:h-12 rounded-xl border flex items-center justify-center text-lg font-black transition-all cursor-pointer select-none relative
                  ${isSelected 
                    ? 'bg-amber-400 text-amber-950 border-amber-500 border-b-4 border-b-amber-600 scale-103' 
                    : isTapped
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-250 border-b-4 border-b-emerald-400'
                      : 'bg-white text-indigo-950 border-indigo-100 border-b-4 border-b-indigo-200 hover:border-indigo-200 active:scale-95'}`}
              >
                {num}
                {isTapped && !isSelected && (
                  <span className="absolute top-0 right-1 text-[8px]">✅</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Start Quiz CTA */}
        {(() => {
          const activeTappedCount = activeNumbers.filter(n => tappedNumbers.includes(n)).length;
          const allTapped = activeTappedCount === activeNumbers.length;
          return (
            <button
              onClick={() => allTapped && setPhase('QUIZ')}
              disabled={!allTapped}
              className={`w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white rounded-2xl font-black text-base sm:text-lg shadow-xl border-b-4 transition-all select-none
                ${allTapped 
                  ? 'bg-emerald-500 hover:bg-emerald-600 border-emerald-700 active:scale-95 cursor-pointer' 
                  : 'bg-slate-300 border-slate-400 cursor-not-allowed opacity-80'}`}
            >
              {allTapped 
                ? <>I am Ready for Quiz! <ArrowRight size={20} /></> 
                : `Tap all numbers to unlock! (${activeTappedCount}/${activeNumbers.length})`}
            </button>
          );
        })()}
      </div>
    );
  }

  // ────── Phase 2: Simple Practice Quiz Mode ──────
  return (
    <div key={quizIdx} className="flex flex-col items-center gap-5 px-4 py-4 w-full max-w-sm mx-auto kids-font select-none">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font { font-family: 'Baloo 2', 'Fredoka', sans-serif !important; }
      `}} />

      {/* Header */}
      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🧩 Number Recognition Quiz
        </span>
        <h3 className="text-2xl font-black text-indigo-950 mt-2 leading-tight">
          {currentQ.questionText}
        </h3>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-2 bg-indigo-50/50 px-4 py-1.5 rounded-full border border-indigo-100/30">
        {quizQuestions.map((_, i) => (
          <div key={i}
            className={`w-3.5 h-3.5 rounded-full border shadow-sm transition-all duration-300 flex items-center justify-center text-[7px] font-black
              ${i < quizIdx 
                ? 'bg-emerald-500 text-white border-emerald-400' 
                : i === quizIdx 
                  ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-300' 
                  : 'bg-white text-slate-300 border-slate-200'}`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* Display Board */}
      <div className={`w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2.5rem] p-6 shadow-md flex flex-col items-center justify-center min-h-[9rem]`}>
        {currentQ.questionText.includes('[ ? ]') ? (
          <div className="flex items-center justify-center gap-2 font-sans">
            {currentQ.questionText.includes('32') ? (
              <>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black border bg-white border-indigo-100 text-indigo-950">32</div>
                <span className="text-indigo-200">➔</span>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black border bg-white border-indigo-100 text-indigo-950">33</div>
                <span className="text-indigo-200">➔</span>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black border border-dashed border-amber-400 bg-amber-50 text-amber-700 animate-pulse">?</div>
                <span className="text-indigo-200">➔</span>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black border bg-white border-indigo-100 text-indigo-950">35</div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black border bg-white border-indigo-100 text-indigo-950">87</div>
                <span className="text-indigo-200">➔</span>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black border bg-white border-indigo-100 text-indigo-950">88</div>
                <span className="text-indigo-200">➔</span>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black border border-dashed border-amber-400 bg-amber-50 text-amber-700 animate-pulse">?</div>
                <span className="text-indigo-200">➔</span>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black border bg-white border-indigo-100 text-indigo-950">90</div>
              </>
            )}
          </div>
        ) : (
          (() => {
            const numVal = parseInt(currentQ.correctAnswer);
            const tens = Math.floor(numVal / 10);
            const ones = numVal % 10;
            return (
              <div className="flex gap-6 items-center">
                {/* Tens Blocks column */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[9px] font-black text-indigo-900/45 uppercase tracking-wider">Tens</span>
                  <div className="flex gap-1.5 bg-amber-50 p-2 rounded-xl border border-amber-100/60">
                    {Array.from({ length: tens }).map((_, i) => (
                      <div key={i} className="flex flex-col gap-0.5 w-3.5 bg-amber-500 border border-amber-700 rounded-sm">
                        {Array.from({ length: 10 }).map((_, j) => (
                          <div key={j} className="h-0.5 border-b border-amber-600/30 last:border-b-0" />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plus indicator */}
                <span className="text-lg font-black text-indigo-900/30">+</span>

                {/* Ones Blocks Column */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[9px] font-black text-indigo-900/45 uppercase tracking-wider">Ones</span>
                  <div className="grid grid-cols-2 gap-1 bg-amber-50 p-2 rounded-xl border border-amber-100/60 min-w-[2.5rem]">
                    {Array.from({ length: ones }).map((_, i) => (
                      <div key={i} className="w-3.5 h-3.5 bg-orange-400 border border-orange-600 rounded-sm" />
                    ))}
                  </div>
                </div>
              </div>
            );
          })()
        )}
      </div>

      {/* Options Row */}
      <div className="grid grid-cols-3 gap-4 w-full mt-2">
        {shuffledOptions.map((opt) => {
          const isSelected = selectedAns === opt;
          const isCorrect = opt === currentQ.correctAnswer;

          let btnStyle = 'border-indigo-100 bg-white border-b-4 hover:border-indigo-200';
          if (isSelected && isCorrect) {
            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-inner scale-103 border-b-2';
          } else if (isSelected && !isCorrect) {
            btnStyle = 'border-red-500 bg-red-50 text-red-700 animate-[shake_0.4s_ease-in-out] border-b-2';
          }

          return (
            <button
              key={opt}
              onClick={() => handleOptionTap(opt)}
              disabled={selectedAns !== null}
              className={`h-14 rounded-2xl border-2 flex items-center justify-center text-2xl font-black font-sans shadow-md select-none transition-all cursor-pointer ${btnStyle}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Footer Text */}
      <div className="min-h-[24px] flex items-center justify-center text-center">
        {showCorrect ? (
          <p className="text-sm font-black text-emerald-600 uppercase tracking-wider">
            ⭐ Excellent! Correct Answer!
          </p>
        ) : showWrong ? (
          <p className="text-sm font-black text-red-500 uppercase tracking-wider">
            🙅 Try again!
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <HelpCircle size={12} /> Tap the correct matching number card!
          </p>
        )}
      </div>
    </div>
  );
}
