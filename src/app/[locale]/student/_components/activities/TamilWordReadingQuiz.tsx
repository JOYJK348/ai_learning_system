'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type WordData = {
  word: string;
  emoji: string;
  hint: string;
  color: string;
};

const WORDS: WordData[] = [
  { word: 'பம்பரம்', emoji: '🪀', hint: 'Spinning Top', color: 'bg-red-50 text-red-700 border-red-100' },
  { word: 'விளக்கு', emoji: '🪔', hint: 'Lamp', color: 'bg-orange-50 text-orange-700 border-orange-100' },
  { word: 'ஆப்பிள்', emoji: '🍎', hint: 'Apple', color: 'bg-amber-50 text-amber-700 border-amber-100' },
  { word: 'மேகம்', emoji: '☁️', hint: 'Cloud', color: 'bg-green-50 text-green-700 border-green-100' },
  { word: 'பறவை', emoji: '🐦', hint: 'Bird', color: 'bg-sky-50 text-sky-700 border-sky-100' },
  { word: 'மீன்', emoji: '🐟', hint: 'Fish', color: 'bg-violet-50 text-violet-700 border-violet-100' },
];

const QUESTIONS = [
  { word: 'பம்பரம்', hint: 'Spinning Top', targetEmoji: '🪀', options: ['🪀', '🪔', '🍎', '☁️'] },
  { word: 'விளக்கு', hint: 'Lamp', targetEmoji: '🪔', options: ['🪔', '🪀', '🐦', '🐟'] },
  { word: 'ஆப்பிள்', hint: 'Apple', targetEmoji: '🍎', options: ['🍎', '☁️', '🪀', '🐦'] },
  { word: 'மேகம்', hint: 'Cloud', targetEmoji: '☁️', options: ['☁️', '🍎', '🐟', '🪔'] },
  { word: 'பறவை', hint: 'Bird', targetEmoji: '🐦', options: ['🐦', '🐟', '🪔', '🍎'] },
  { word: 'மீன்', hint: 'Fish', targetEmoji: '🐟', options: ['🐟', '🪀', '☁️', '🐦'] },
];

export default function TamilWordReadingQuiz({ onComplete }: Props) {
  const [mode, setMode] = useState<'learn' | 'quiz'>('learn');
  const [selectedWord, setSelectedWord] = useState<WordData | null>(null);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [pickedEmoji, setPickedEmoji] = useState<string | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const currentQuestion = QUESTIONS[qIdx];

  const shuffledOptions = useMemo(() => {
    return [...currentQuestion.options].sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  const handleOptionTap = (emoji: string) => {
    if (pickedEmoji || done) return;
    setPickedEmoji(emoji);
    if (emoji === currentQuestion.targetEmoji) {
      setScore(s => s + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        setPickedEmoji(null);
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
        setPickedEmoji(null);
      }, 850);
    }
  };

  if (done) {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    return (
      <div className="flex flex-col items-center gap-6 px-6 py-10 kids-font">
        <style dangerouslySetInnerHTML={{__html:`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&display=swap'); .kids-font{font-family:'Baloo 2',sans-serif!important;}`}} />
        <span className="text-8xl select-none">🏆</span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase">வாசிப்பு நாயகன்!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">Super! You read all sight words correctly! 🌟</p>
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
          📖 வார்த்தை வாசிப்பு (Word Reading)
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1">
          {mode === 'learn' ? 'சொற்களை வாசிப்போம்! 💡' : 'சரியான படத்தை தேர்ந்தெடு!'}
        </h3>
      </div>

      {mode === 'learn' ? (
        /* Study Mode */
        <div className="w-full flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-2">
            {WORDS.map((item) => (
              <button
                key={item.word}
                onClick={() => setSelectedWord(item)}
                className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-2 transition-all active:scale-95 cursor-pointer shadow-sm ${item.color} ${selectedWord?.word === item.word ? 'ring-4 ring-indigo-400 border-indigo-400' : ''}`}
              >
                <span className="text-xl font-black leading-tight">{item.word}</span>
                <span className="text-3xl mt-1">{item.emoji}</span>
              </button>
            ))}
          </div>

          {/* Word detail display board */}
          <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2rem] p-5 shadow-md flex items-center justify-between min-h-[6.5rem]">
            {selectedWord ? (
              <>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-indigo-950 bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-100">
                    {selectedWord.word}
                  </span>
                  <span className="text-[9px] font-black text-indigo-900/40 uppercase tracking-widest mt-1">வார்த்தை வாசிப்பு</span>
                </div>
                <div className="text-right">
                  <span className="text-5xl">{selectedWord.emoji}</span>
                  <p className="text-xs font-bold text-indigo-900/40 uppercase tracking-wide mt-1">{selectedWord.hint}</p>
                </div>
              </>
            ) : (
              <p className="text-sm font-bold text-indigo-900/40 text-center w-full py-4 flex items-center justify-center gap-1.5 font-sans">
                <HelpCircle size={16} /> எந்த சொல்லையாவது தொட்டுப் படி!
              </p>
            )}
          </div>

          <button
            onClick={() => setMode('quiz')}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-base shadow-lg border-b-4 border-indigo-800 active:scale-95 cursor-pointer text-center"
          >
            வாசிப்பு விளையாட்டு! 🎮
          </button>
        </div>
      ) : (
        /* Quiz Mode */
        <div className="w-full flex flex-col gap-4 mt-1">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-1.5 w-full">
            {QUESTIONS.map((_, i) => (
              <div key={i} className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300
                ${i < qIdx ? 'bg-emerald-500 border-emerald-600' : i === qIdx ? 'bg-indigo-600 border-indigo-700 ring-2 ring-indigo-300' : 'bg-white border-slate-200'}`} />
            ))}
          </div>

          {/* Word prompt display board */}
          <div className="w-full bg-[#fdfbf6] border-4 border-indigo-200 rounded-[2rem] p-6 shadow-md flex flex-col items-center justify-center gap-1 min-h-[8.5rem]">
            <span className="text-4xl font-black text-indigo-950">{currentQuestion.word}</span>
            <span className="text-xs font-bold text-indigo-900/40 mt-1 uppercase tracking-widest">{currentQuestion.hint}</span>
          </div>

          {/* Options grid */}
          <div className="grid grid-cols-4 gap-3 w-full">
            {shuffledOptions.map((emoji) => {
              const isSelected = pickedEmoji === emoji;
              const isCorrect = emoji === currentQuestion.targetEmoji;
              
              let style = 'bg-white text-indigo-950 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50';
              if (isSelected && isCorrect) style = 'bg-emerald-100 border-emerald-300';
              else if (isSelected && !isCorrect) style = 'bg-red-100 border-red-300';

              return (
                <button
                  key={emoji}
                  onClick={() => handleOptionTap(emoji)}
                  disabled={pickedEmoji !== null}
                  className={`aspect-square rounded-2xl border-3 flex items-center justify-center text-4xl transition-all cursor-pointer shadow-sm active:scale-95 ${style}`}
                >
                  {emoji}
                </button>
              );
            })}
          </div>

          {/* Feedback message */}
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
                வார்த்தைக்குரிய படத்தைத் தேர்ந்தெடு!
              </p>
            )}
          </div>

          <button
            onClick={() => setMode('learn')}
            className="w-full py-2 bg-slate-100 hover:bg-slate-250 text-slate-600 rounded-2xl font-bold text-sm border active:scale-95 cursor-pointer text-center"
          >
            ⬅️ படிப்பு பலகை
          </button>
        </div>
      )}
    </div>
  );
}
