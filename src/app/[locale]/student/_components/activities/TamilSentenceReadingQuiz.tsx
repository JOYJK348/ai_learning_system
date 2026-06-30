'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type SentenceData = {
  sentence: string;
  emoji: string;
  hint: string;
  color: string;
};

const SENTENCES: SentenceData[] = [
  { sentence: 'இது ஒரு மரம்', emoji: '🌳', hint: 'This is a tree', color: 'bg-red-50 text-red-700 border-red-100' },
  { sentence: 'அது ஒரு வீடு', emoji: '🏠', hint: 'That is a house', color: 'bg-orange-50 text-orange-700 border-orange-100' },
  { sentence: 'மீன் நீரில் நீந்துகிறது', emoji: '🐟', hint: 'Fish swims in water', color: 'bg-amber-50 text-amber-700 border-amber-100' },
  { sentence: 'யானை பெரிய விலங்கு', emoji: '🐘', hint: 'Elephant is a big animal', color: 'bg-green-50 text-green-700 border-green-100' },
  { sentence: 'பூனை பால் குடிக்கும்', emoji: '🐱', hint: 'Cat drinks milk', color: 'bg-sky-50 text-sky-700 border-sky-100' },
];

const QUESTIONS = [
  { sentence: 'இது ஒரு மரம்', hint: 'This is a tree', targetEmoji: '🌳', options: ['🌳', '🏠', '🐟', '🐘'] },
  { sentence: 'அது ஒரு வீடு', hint: 'That is a house', targetEmoji: '🏠', options: ['🏠', '🌳', '🐱', '🐟'] },
  { sentence: 'மீன் நீரில் நீந்துகிறது', hint: 'Fish swims in water', targetEmoji: '🐟', options: ['🐟', '🐘', '🏠', '🐱'] },
  { sentence: 'யானை பெரிய விலங்கு', hint: 'Elephant is a big animal', targetEmoji: '🐘', options: ['🐘', '🌳', '🐟', '🏠'] },
  { sentence: 'பூனை பால் குடிக்கும்', hint: 'Cat drinks milk', targetEmoji: '🐱', options: ['🐱', '🏠', '🌳', '🐟'] },
];

export default function TamilSentenceReadingQuiz({ onComplete }: Props) {
  const [mode, setMode] = useState<'learn' | 'quiz'>('learn');
  const [selectedItem, setSelectedItem] = useState<SentenceData | null>(null);
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
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase">வாக்கிய நாயகன்!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">Super! You read all simple sentences correctly! 🌟</p>
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
          🗣️ எளிய வாக்கியங்கள் (Simple Sentences)
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1">
          {mode === 'learn' ? 'வாக்கியங்களை படிப்போம்! 💡' : 'சரியான வாக்கியப் படத்தை தேர்ந்தெடு!'}
        </h3>
      </div>

      {mode === 'learn' ? (
        /* Study Mode */
        <div className="w-full flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-2.5">
            {SENTENCES.map((item) => (
              <button
                key={item.sentence}
                onClick={() => setSelectedItem(item)}
                className={`py-3.5 px-6 rounded-2xl border-2 flex items-center justify-between transition-all active:scale-98 cursor-pointer shadow-sm ${item.color} ${selectedItem?.sentence === item.sentence ? 'ring-4 ring-indigo-400 border-indigo-400' : ''}`}
              >
                <span className="text-xl font-black leading-tight text-left">{item.sentence}</span>
                <span className="text-3xl">{item.emoji}</span>
              </button>
            ))}
          </div>

          {/* Sentence detail visual display board */}
          <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2rem] p-4 shadow-md flex items-center justify-between min-h-[6.5rem]">
            {selectedItem ? (
              <>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-indigo-950 bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-100 leading-tight">
                    {selectedItem.sentence}
                  </span>
                  <span className="text-[9px] font-black text-indigo-900/40 uppercase tracking-widest mt-1">வாக்கிய வாசிப்பு</span>
                </div>
                <div className="text-right ml-4">
                  <span className="text-5xl">{selectedItem.emoji}</span>
                  <p className="text-xs font-bold text-indigo-900/40 uppercase tracking-wide mt-1 leading-tight">{selectedItem.hint}</p>
                </div>
              </>
            ) : (
              <p className="text-sm font-bold text-indigo-900/40 text-center w-full py-4 flex items-center justify-center gap-1.5 font-sans">
                <HelpCircle size={16} /> எந்த வாக்கியத்தையாவது தொட்டுப் படி!
              </p>
            )}
          </div>

          <button
            onClick={() => setMode('quiz')}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-base shadow-lg border-b-4 border-indigo-800 active:scale-95 cursor-pointer text-center"
          >
            வாக்கிய விளையாட்டு! 🎮
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

          {/* Sentence prompt display board */}
          <div className="w-full bg-[#fdfbf6] border-4 border-indigo-200 rounded-[2rem] p-6 shadow-md flex flex-col items-center justify-center gap-1 min-h-[8.5rem]">
            <span className="text-2xl font-black text-indigo-950 text-center leading-normal">{currentQuestion.sentence}</span>
            <span className="text-xs font-bold text-indigo-900/40 mt-1 uppercase tracking-widest text-center">{currentQuestion.hint}</span>
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
              <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest text-center">
                வாக்கியத்திற்குரிய படத்தைத் தேர்ந்தெடு!
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
