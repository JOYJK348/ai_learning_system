'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type QuestionData = {
  wordDisplay: string; // e.g. "ம _ ம்"
  targetLetter: string; // "ர"
  emoji: string;
  hint: string;
  options: string[];
};

const QUESTIONS: QuestionData[] = [
  { wordDisplay: 'ம _ ம்', targetLetter: 'ர', emoji: '🌳', hint: 'Tree', options: ['ர', 'ட', 'க', 'ப்'] },
  { wordDisplay: 'க _', targetLetter: 'ல்', emoji: '🪨', hint: 'Stone', options: ['ல்', 'ண்', 'ம்', 'ய்'] },
  { wordDisplay: 'ஆ _', targetLetter: 'டு', emoji: '🐐', hint: 'Goat', options: ['டு', 'து', 'ன்', 'வை'] },
  { wordDisplay: 'ப _ ம்', targetLetter: 'ட', emoji: '🖼️', hint: 'Picture', options: ['ட', 'ம', 'ர', 'ங்'] },
  { wordDisplay: 'மீ _', targetLetter: 'ன்', emoji: '🐟', hint: 'Fish', options: ['ன்', 'ம்', 'ல்', 'த்'] },
  { wordDisplay: 'வீ _', targetLetter: 'டு', emoji: '🏠', hint: 'House', options: ['டு', 'து', 'ண்', 'ர்'] },
];

export default function TamilFillBlanksQuiz({ onComplete }: Props) {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [pickedOption, setPickedOption] = useState<string | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentQuestion = QUESTIONS[qIdx];

  const shuffledOptions = useMemo(() => {
    return [...currentQuestion.options].sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  const handleOptionTap = (opt: string) => {
    if (pickedOption || done) return;
    setPickedOption(opt);
    if (opt === currentQuestion.targetLetter) {
      setScore(s => s + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        setPickedOption(null);
        if (qIdx < QUESTIONS.length - 1) {
          setQIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 1200);
    } else {
      setShowWrong(true);
      setTimeout(() => {
        setShowWrong(false);
        setPickedOption(null);
      }, 850);
    }
  };

  if (done) {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    return (
      <div className="flex flex-col items-center gap-6 px-6 py-10 kids-font">
        <style dangerouslySetInnerHTML={{__html:`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&display=swap'); .kids-font{font-family:'Baloo 2',sans-serif!important;}`}} />
        <span className="text-8xl select-none">🏆</span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase">விடுபட்ட எழுத்து நாயகன்!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">Excellent! You filled all missing letters! 🌟</p>
        <button onClick={() => onComplete({ score: pct, max_score: 100, completion_data: { score, total: QUESTIONS.length }, time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000) })}
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
          ✏️ கோடிட்ட இடங்களை நிரப்பு
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1">
          விடுபட்ட எழுத்தை கண்டுபிடி!
        </h3>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-1.5 w-full">
        {QUESTIONS.map((_, i) => (
          <div key={i} className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300
            ${i < qIdx ? 'bg-emerald-500 border-emerald-600' : i === qIdx ? 'bg-indigo-600 border-indigo-700 ring-2 ring-indigo-300' : 'bg-white border-slate-200'}`} />
        ))}
      </div>

      {/* Word display board */}
      <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2rem] p-6 shadow-md flex flex-col items-center justify-center gap-2 min-h-[9rem]">
        <span className="text-6xl">{currentQuestion.emoji}</span>
        <span className="text-sm font-black text-amber-900/60 uppercase tracking-widest -mt-1">{currentQuestion.hint}</span>

        {/* Word Display with Slot */}
        <div className="text-4xl font-black text-indigo-950 tracking-widest mt-2">
          {currentQuestion.wordDisplay.split(' ').map((char, index) => {
            if (char === '_') {
              return (
                <span
                  key={index}
                  className={`inline-block w-12 h-10 border-b-4 border-indigo-950 text-center text-indigo-600 mx-1 transition-all`}
                >
                  {pickedOption && showCorrect ? currentQuestion.targetLetter : ' '}
                </span>
              );
            }
            return <span key={index}>{char}</span>;
          })}
        </div>
      </div>

      {/* Question prompt */}
      <p className="text-sm font-black text-indigo-900/60 text-center flex items-center gap-1.5 mt-2">
        <HelpCircle size={14} /> கோடிட்ட இடத்தில் என்ன எழுத்து வரும்?
      </p>

      {/* Options grid */}
      <div className="grid grid-cols-4 gap-3 w-full">
        {shuffledOptions.map((opt) => {
          const isSelected = pickedOption === opt;
          const isCorrect = opt === currentQuestion.targetLetter;
          
          let style = 'bg-white text-indigo-950 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50';
          if (isSelected && isCorrect) style = 'bg-emerald-100 text-emerald-700 border-emerald-300';
          else if (isSelected && !isCorrect) style = 'bg-red-100 text-red-700 border-red-300';

          return (
            <button
              key={opt}
              onClick={() => handleOptionTap(opt)}
              disabled={pickedOption !== null}
              className={`aspect-square rounded-2xl border-3 flex items-center justify-center text-3xl font-black transition-all cursor-pointer shadow-sm active:scale-95 ${style}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback panel */}
      <div className="min-h-[22px] flex items-center justify-center">
        {showCorrect ? (
          <p className="text-sm font-black text-emerald-600 uppercase tracking-wider flex items-center gap-1">
            <Sparkles size={14} /> சரியான விடை! 🎉
          </p>
        ) : showWrong ? (
          <p className="text-sm font-black text-red-500 uppercase tracking-wider">
            🙅 தவறு! மீண்டும் முயற்சி செய்!
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest">
            சரியான எழுத்தைத் தொட்டு சொல்லை உருவாக்கு!
          </p>
        )}
      </div>
    </div>
  );
}
