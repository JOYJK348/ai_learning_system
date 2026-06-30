'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type QuestionData = {
  letter: string;
  targetWord: string;
  targetEmoji: string;
  options: { word: string; emoji: string }[];
};

const QUESTIONS: QuestionData[] = [
  {
    letter: 'அ',
    targetWord: 'அம்மா',
    targetEmoji: '👩',
    options: [
      { word: 'அம்மா', emoji: '👩' },
      { word: 'ஆடு', emoji: '🐐' },
      { word: 'இலை', emoji: '🍃' },
      { word: 'உரல்', emoji: '🥣' },
    ],
  },
  {
    letter: 'ஆ',
    targetWord: 'ஆடு',
    targetEmoji: '🐐',
    options: [
      { word: 'ஆடு', emoji: '🐐' },
      { word: 'எலி', emoji: '🐀' },
      { word: 'ஒட்டகம்', emoji: '🐪' },
      { word: 'இலை', emoji: '🍃' },
    ],
  },
  {
    letter: 'இ',
    targetWord: 'இலை',
    targetEmoji: '🍃',
    options: [
      { word: 'இலை', emoji: '🍃' },
      { word: 'ஈ', emoji: '🪰' },
      { word: 'அம்மா', emoji: '👩' },
      { word: 'ஊஞ்சல்', emoji: '🎡' },
    ],
  },
  {
    letter: 'ஈ',
    targetWord: 'ஈ',
    targetEmoji: '🪰',
    options: [
      { word: 'ஈ', emoji: '🪰' },
      { word: 'ஆடு', emoji: '🐐' },
      { word: 'உரல்', emoji: '🥣' },
      { word: 'எலி', emoji: '🐀' },
    ],
  },
  {
    letter: 'உ',
    targetWord: 'உரல்',
    targetEmoji: '🥣',
    options: [
      { word: 'உரல்', emoji: '🥣' },
      { word: 'ஒட்டகம்', emoji: '🐪' },
      { word: 'இலை', emoji: '🍃' },
      { word: 'ஊஞ்சல்', emoji: '🎡' },
    ],
  },
  {
    letter: 'ஊ',
    targetWord: 'ஊஞ்சல்',
    targetEmoji: '🎡',
    options: [
      { word: 'ஊஞ்சல்', emoji: '🎡' },
      { word: 'எலி', emoji: '🐀' },
      { word: 'ஆடு', emoji: '🐐' },
      { word: 'அம்மா', emoji: '👩' },
    ],
  },
];

export default function TamilSoundShapeQuiz({ onComplete }: Props) {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [pickedWord, setPickedWord] = useState<string | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentQuestion = QUESTIONS[qIdx];

  const shuffledOptions = useMemo(() => {
    return [...currentQuestion.options].sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  const handleOptionTap = (word: string) => {
    if (pickedWord || done) return;
    setPickedWord(word);
    if (word === currentQuestion.targetWord) {
      setScore(s => s + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        setPickedWord(null);
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
        setPickedWord(null);
      }, 850);
    }
  };

  if (done) {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    return (
      <div className="flex flex-col items-center gap-6 px-6 py-10 kids-font">
        <style dangerouslySetInnerHTML={{__html:`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&display=swap'); .kids-font{font-family:'Baloo 2',sans-serif!important;}`}} />
        <span className="text-8xl select-none">🏆</span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase">ஒலி வடிவங்கள் நாயகன்!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">Super! You mastered all sound shapes! 🌟</p>
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
          🔊 ஒலி வடிவங்களை அறிதல் (Sound Shapes)
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1">
          எழுத்திற்குரிய படத்தை கண்டுபிடி!
        </h3>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-1.5 w-full">
        {QUESTIONS.map((_, i) => (
          <div key={i} className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300
            ${i < qIdx ? 'bg-emerald-500 border-emerald-600' : i === qIdx ? 'bg-indigo-600 border-indigo-700 ring-2 ring-indigo-300' : 'bg-white border-slate-200'}`} />
        ))}
      </div>

      {/* Big Letter Card */}
      <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2rem] p-6 shadow-md flex flex-col items-center justify-center min-h-[9rem]">
        <span className="text-7xl font-black text-indigo-950 bg-indigo-50 px-6 py-3 rounded-3xl border border-indigo-100/80 shadow-inner">
          {currentQuestion.letter}
        </span>
      </div>

      {/* Question prompt */}
      <p className="text-sm font-black text-indigo-900/60 text-center flex items-center gap-1.5 mt-2">
        <HelpCircle size={14} /> "{currentQuestion.letter}" இல் தொடங்கும் படம் எது?
      </p>

      {/* Options grid */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {shuffledOptions.map((opt) => {
          const isSelected = pickedWord === opt.word;
          const isCorrect = opt.word === currentQuestion.targetWord;
          
          let style = 'bg-white text-indigo-950 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50';
          if (isSelected && isCorrect) style = 'bg-emerald-100 text-emerald-700 border-emerald-300';
          else if (isSelected && !isCorrect) style = 'bg-red-100 text-red-700 border-red-300';

          return (
            <button
              key={opt.word}
              onClick={() => handleOptionTap(opt.word)}
              disabled={pickedWord !== null}
              className={`py-3.5 rounded-2xl border-3 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer shadow-sm active:scale-95 ${style}`}
            >
              <span className="text-4xl">{opt.emoji}</span>
              <span className="text-lg font-black">{opt.word}</span>
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
            சரியான படத்தைத் தேர்ந்தெடு!
          </p>
        )}
      </div>
    </div>
  );
}
