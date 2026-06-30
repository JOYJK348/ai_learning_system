'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle } from 'lucide-react';
import { shuffle } from '@/core/data/letterData';

type Props = {
  mode?: 'I_AM_IS' | 'A_THE' | 'MY_YOU' | 'THIS_THAT' | 'HERE_THERE';
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type SightWordQuestion = {
  sentenceStart: string;
  sentenceEnd: string;
  correctWord: string;
  options: string[];
  emoji: string;
};

const POOLS: Record<string, SightWordQuestion[]> = {
  I_AM_IS: [
    { sentenceStart: '', sentenceEnd: ' am a student.', correctWord: 'I', options: ['I', 'is', 'am'], emoji: '🧑‍🎓' },
    { sentenceStart: 'He ', sentenceEnd: ' a doctor.', correctWord: 'is', options: ['is', 'am', 'I'], emoji: '👨‍⚕️' },
    { sentenceStart: 'I ', sentenceEnd: ' 5 years old.', correctWord: 'am', options: ['am', 'is', 'I'], emoji: '🎂' },
    { sentenceStart: 'It ', sentenceEnd: ' a sunny day.', correctWord: 'is', options: ['is', 'I', 'am'], emoji: '☀️' },
    { sentenceStart: '', sentenceEnd: ' am happy!', correctWord: 'I', options: ['I', 'is', 'am'], emoji: '😊' },
  ],
  A_THE: [
    { sentenceStart: 'I see ', sentenceEnd: ' big elephant.', correctWord: 'a', options: ['a', 'the', 'am'], emoji: '🐘' },
    { sentenceStart: '', sentenceEnd: ' sun is shining.', correctWord: 'The', options: ['The', 'A', 'Is'], emoji: '☀️' },
    { sentenceStart: 'He has ', sentenceEnd: ' red ball.', correctWord: 'a', options: ['a', 'the', 'is'], emoji: '⚽' },
    { sentenceStart: 'Look at ', sentenceEnd: ' stars in the sky!', correctWord: 'the', options: ['the', 'a', 'my'], emoji: '✨' },
    { sentenceStart: 'She eats ', sentenceEnd: ' sweet banana.', correctWord: 'a', options: ['a', 'the', 'am'], emoji: '🍌' },
  ],
  MY_YOU: [
    { sentenceStart: 'This is ', sentenceEnd: ' cute puppy.', correctWord: 'my', options: ['my', 'you', 'is'], emoji: '🐶' },
    { sentenceStart: 'Do ', sentenceEnd: ' like toys?', correctWord: 'you', options: ['you', 'my', 'the'], emoji: '🧸' },
    { sentenceStart: 'I like ', sentenceEnd: ' new shoes.', correctWord: 'my', options: ['my', 'you', 'a'], emoji: '👟' },
    { sentenceStart: 'Are ', sentenceEnd: ' my best friend?', correctWord: 'you', options: ['you', 'my', 'am'], emoji: '🤝' },
    { sentenceStart: 'Where is ', sentenceEnd: ' school bag?', correctWord: 'my', options: ['my', 'you', 'the'], emoji: '🎒' },
  ],
  THIS_THAT: [
    { sentenceStart: '', sentenceEnd: ' apple in my hand is red.', correctWord: 'This', options: ['This', 'That', 'My'], emoji: '🍎' },
    { sentenceStart: 'Look at ', sentenceEnd: ' bird high in the tree!', correctWord: 'that', options: ['that', 'this', 'the'], emoji: '🐦' },
    { sentenceStart: 'I like ', sentenceEnd: ' toy right here.', correctWord: 'this', options: ['this', 'that', 'a'], emoji: '🧸' },
    { sentenceStart: 'Can you see ', sentenceEnd: ' star far away?', correctWord: 'that', options: ['that', 'this', 'is'], emoji: '🌟' },
    { sentenceStart: '', sentenceEnd: ' is my desk here.', correctWord: 'This', options: ['This', 'That', 'My'], emoji: '🪑' },
  ],
  HERE_THERE: [
    { sentenceStart: 'Come ', sentenceEnd: ' and sit down.', correctWord: 'here', options: ['here', 'there', 'the'], emoji: '🪑' },
    { sentenceStart: 'The birds are flying way up ', sentenceEnd: ' there.', correctWord: 'there', options: ['there', 'here', 'a'], emoji: '🦅' },
    { sentenceStart: 'Put your toys ', sentenceEnd: ' in the box.', correctWord: 'here', options: ['here', 'there', 'my'], emoji: '📦' },
    { sentenceStart: 'Look ', sentenceEnd: ' on the mountain top!', correctWord: 'there', options: ['there', 'here', 'is'], emoji: '🏔' },
    { sentenceStart: 'I am standing right ', sentenceEnd: '.', correctWord: 'here', options: ['here', 'there', 'you'], emoji: '🧍' },
  ],
};

export default function SightWordsQuiz({ mode = 'I_AM_IS', onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const questionsList = useMemo(() => {
    return POOLS[mode] || POOLS.I_AM_IS;
  }, [mode]);

  const currentQ = questionsList[currentIdx];

  // Shuffle option buttons so the correct answer is not always first
  const shuffledOptions = useMemo(() => {
    if (!currentQ) return [];
    return shuffle([...currentQ.options]);
  }, [currentQ]);

  const handleOptionTap = (word: string) => {
    if (selectedWord !== null || showWrong || showCorrect || done) return;

    setSelectedWord(word);
    const isCorrect = word.toLowerCase() === currentQ.correctWord.toLowerCase();

    if (isCorrect) {
      setScore(s => s + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        setSelectedWord(null);
        if (currentIdx < questionsList.length - 1) {
          setCurrentIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 1200);
    } else {
      setShowWrong(true);
      setTimeout(() => {
        setShowWrong(false);
        setSelectedWord(null);
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
        <span className="text-8xl select-none">🏆</span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Sight Words Master!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Spectacular! You constructed all sentences with the correct sight words! 🌟
        </p>
        <button
          onClick={() => onComplete({
            score: Math.round((score / questionsList.length) * 100), max_score: 100,
            completion_data: { score, total: questionsList.length },
            time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
          })}
          className="w-full max-w-xs inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl border-b-4 border-emerald-700 active:scale-95 cursor-pointer"
        >
          Continue ➡️
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 px-4 py-4 w-full max-w-sm mx-auto kids-font select-none">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font {
          font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
        }
      `}} />

      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🧩 Sight Word Puzzle
        </span>
        <h3 className="text-2xl font-black text-indigo-950 mt-2 leading-tight">
          Complete the Sentence!
        </h3>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-2 bg-indigo-50/50 px-4 py-1.5 rounded-full border border-indigo-100/30">
        {questionsList.map((_, i) => (
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

      {/* Sentence Constructor Panel */}
      <div className="w-full bg-[#fdfbf7] border-4 border-[#ebd8b7] rounded-[2.5rem] p-6 shadow-xl flex flex-col items-center justify-center gap-5 relative">
        <div className="w-20 h-20 rounded-3xl bg-white border-2 border-indigo-50 shadow-md flex items-center justify-center text-5xl select-none">
          {currentQ.emoji}
        </div>

        {/* Sentence Builder Display */}
        <div className="text-xl font-bold text-indigo-950 text-center leading-relaxed font-sans px-2 flex flex-wrap items-center justify-center gap-1.5">
          {currentQ.sentenceStart}
          
          {/* Missing Slot */}
          <span className={`inline-flex min-w-[3.5rem] px-3 py-1.5 rounded-xl border-2 flex-shrink-0 items-center justify-center text-base font-black shadow-inner leading-none
            ${showCorrect 
              ? 'bg-emerald-500 border-emerald-650 text-white' 
              : showWrong 
                ? 'bg-red-500 border-red-650 text-white animate-[shake_0.4s_ease-in-out]' 
                : selectedWord 
                  ? 'bg-indigo-100 border-indigo-300 text-indigo-700' 
                  : 'bg-white border-dashed border-indigo-200 text-transparent'}`}
          >
            {selectedWord || '?'}
          </span>

          {currentQ.sentenceEnd}
        </div>
      </div>

      {/* Choice Options */}
      <div className="grid grid-cols-3 gap-4 w-full mt-2">
        {shuffledOptions.map((word) => {
          const isSelected = selectedWord === word;
          const isCorrect = word.toLowerCase() === currentQ.correctWord.toLowerCase();

          let btnStyle = 'border-indigo-100 bg-white border-b-4 hover:border-indigo-200';
          if (isSelected && isCorrect) {
            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-inner scale-103 border-b-2';
          } else if (isSelected && !isCorrect) {
            btnStyle = 'border-red-500 bg-red-50 text-red-700 animate-[shake_0.4s_ease-in-out] border-b-2';
          }

          return (
            <button
              key={word}
              onClick={() => handleOptionTap(word)}
              disabled={selectedWord !== null}
              className={`h-14 sm:h-16 rounded-2xl border-2 flex flex-col items-center justify-center text-xl sm:text-2xl font-black font-sans shadow-md select-none transition-all cursor-pointer ${btnStyle}`}
            >
              {word}
            </button>
          );
        })}
      </div>

      {/* Tips */}
      <div className="min-h-[24px] flex items-center justify-center text-center mt-2">
        {showCorrect ? (
          <p className="text-sm font-black text-emerald-600 uppercase tracking-wider">
            ⭐ Superb! The sentence is complete!
          </p>
        ) : showWrong ? (
          <p className="text-sm font-black text-red-500 uppercase tracking-wider">
            🙅 Oops! That word doesn't fit here!
          </p>
        ) : (
          <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1 select-none">
            <HelpCircle size={12} /> Tap the correct sight word for the sentence!
          </p>
        )}
      </div>
    </div>
  );
}
