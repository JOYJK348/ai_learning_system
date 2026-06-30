'use client';

import React, { useState, useRef } from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type MeiData = {
  letter: string;
  word: string;
  emoji: string;
  color: string;
};

const MEI_LETTERS: MeiData[] = [
  { letter: 'க்', word: 'கொக்கு', emoji: '🦢', color: 'bg-red-50 text-red-700 border-red-100' },
  { letter: 'ங்', word: 'சிங்கம்', emoji: '🦁', color: 'bg-orange-50 text-orange-700 border-orange-100' },
  { letter: 'ச்', word: 'எலுமிச்சை', emoji: '🍋', color: 'bg-amber-50 text-amber-700 border-amber-100' },
  { letter: 'ஞ்', word: 'மஞ்சள்', emoji: '🟡', color: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
  { letter: 'ட்', word: 'பட்டம்', emoji: '🪁', color: 'bg-green-50 text-green-700 border-green-100' },
  { letter: 'ண்', word: 'கண்', emoji: '👁️', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { letter: 'த்', word: 'வாத்து', emoji: '🦆', color: 'bg-teal-50 text-teal-700 border-teal-100' },
  { letter: 'ந்', word: 'பந்து', emoji: '⚽', color: 'bg-sky-50 text-sky-700 border-sky-100' },
  { letter: 'ப்', word: 'கப்பல்', emoji: '🚢', color: 'bg-blue-50 text-blue-700 border-blue-100' },
  { letter: 'ம்', word: 'மரம்', emoji: '🌳', color: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
  { letter: 'ய்', word: 'நாய்', emoji: '🐶', color: 'bg-violet-50 text-violet-700 border-violet-100' },
  { letter: 'ர்', word: 'தேர்', emoji: '🛕', color: 'bg-purple-50 text-purple-700 border-purple-100' },
  { letter: 'ல்', word: 'சேவல்', emoji: '🐓', color: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100' },
  { letter: 'வ்', word: 'வண்டி', emoji: '🛒', color: 'bg-pink-50 text-pink-700 border-pink-100' },
  { letter: 'ழ்', word: 'யாழ்', emoji: '🪕', color: 'bg-rose-50 text-rose-700 border-rose-100' },
  { letter: 'ள்', word: 'வாள்', emoji: '⚔️', color: 'bg-slate-50 text-slate-700 border-slate-100' },
  { letter: 'ற்', word: 'பறவை', emoji: '🐦', color: 'bg-zinc-50 text-zinc-700 border-zinc-100' },
  { letter: 'ன்', word: 'மீன்', emoji: '🐟', color: 'bg-neutral-50 text-neutral-700 border-neutral-100' },
];

const GAME_QUESTIONS = [
  { prompt: 'Find the letter in "மீன்" (Fish)!', target: 'ன்', options: ['ன்', 'ய்', 'ம்', 'ள்'] },
  { prompt: 'Find the letter in "பட்டம்" (Kite)!', target: 'ட்', options: ['ட்', 'ண்', 'த்', 'ற்'] },
  { prompt: 'Find the letter in "சிங்கம்" (Lion)!', target: 'ங்', options: ['ங்', 'ஞ்', 'ந்', 'வ்'] },
  { prompt: 'Find the letter in "நாய்" (Dog)!', target: 'ய்', options: ['ய்', 'ர்', 'ல்', 'ழ்'] },
  { prompt: 'Find the letter in "கப்பல்" (Ship)!', target: 'ப்', options: ['ப்', 'ம்', 'க்', 'ச்'] },
];

export default function TamilMeiIntroQuiz({ onComplete }: Props) {
  const [mode, setMode] = useState<'learn' | 'game'>('learn');
  const [selectedLetter, setSelectedLetter] = useState<MeiData | null>(null);
  const [gameIdx, setGameIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());

  const handleGameTap = (letter: string) => {
    if (selectedAns || showWrong || showCorrect || done) return;
    setSelectedAns(letter);
    const target = GAME_QUESTIONS[gameIdx].target;
    if (letter === target) {
      setScore(s => s + 1);
      setShowCorrect(true);
      setTimeout(() => {
        setShowCorrect(false);
        setSelectedAns(null);
        if (gameIdx < GAME_QUESTIONS.length - 1) setGameIdx(i => i + 1);
        else setDone(true);
      }, 1300);
    } else {
      setShowWrong(true);
      setTimeout(() => {
        setShowWrong(false);
        setSelectedAns(null);
      }, 850);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-6 px-6 py-10 kids-font">
        <style dangerouslySetInnerHTML={{__html:`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap'); .kids-font{font-family:'Baloo 2','Fredoka',sans-serif!important;}`}} />
        <span className="text-8xl select-none">🏆✨</span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase">மெய் எழுத்துக்கள் நாயகன்!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">Excellent! You learned all 18 Tamil consonants! 🌟</p>
        <button onClick={() => onComplete({ score: Math.round((score/GAME_QUESTIONS.length)*100), max_score:100, completion_data:{score,total:GAME_QUESTIONS.length}, time_taken_seconds:Math.round((Date.now()-startTime.current)/1000) })}
          className="w-full max-w-xs px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-lg shadow-xl border-b-4 border-emerald-700 active:scale-95 cursor-pointer text-center">
          Continue ➡️
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 px-3 py-2 w-full max-w-md mx-auto kids-font select-none">
      <style dangerouslySetInnerHTML={{__html:`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font{font-family:'Baloo 2','Fredoka',sans-serif!important;}
      `}} />

      {/* Header */}
      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          ✍️ மெய் எழுத்துக்கள் (க் - ன்)
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1">
          {mode === 'learn' ? 'Touch & Learn Consonants! 💡' : GAME_QUESTIONS[gameIdx].prompt}
        </h3>
      </div>

      {mode === 'learn' ? (
        /* Learn Mode Board */
        <div className="w-full flex flex-col gap-4">
          <div className="grid grid-cols-6 gap-1.5 max-h-[16rem] overflow-y-auto pr-1">
            {MEI_LETTERS.map((item) => (
              <button
                key={item.letter}
                onClick={() => setSelectedLetter(item)}
                className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center transition-all p-1 active:scale-95 cursor-pointer shadow-sm ${item.color} ${selectedLetter?.letter === item.letter ? 'ring-4 ring-indigo-400 border-indigo-400' : ''}`}
              >
                <span className="text-xl sm:text-2xl font-black">{item.letter}</span>
                <span className="text-[12px]">{item.emoji}</span>
              </button>
            ))}
          </div>

          {/* Detailed preview card */}
          <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2rem] p-4 shadow-md flex items-center justify-between min-h-[6.5rem]">
            {selectedLetter ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-black text-indigo-950 bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-100">
                    {selectedLetter.letter}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xl font-black text-indigo-900">{selectedLetter.word}</span>
                    <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest">மெய் எழுத்து</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-5xl">{selectedLetter.emoji}</span>
                </div>
              </>
            ) : (
              <p className="text-sm font-bold text-indigo-900/40 text-center w-full py-4 flex items-center justify-center gap-1.5">
                <HelpCircle size={16} /> Touch any letter above to learn its word!
              </p>
            )}
          </div>

          <button
            onClick={() => setMode('game')}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-base shadow-lg border-b-4 border-indigo-800 active:scale-95 cursor-pointer text-center"
          >
            Play Game Phase! 🎮
          </button>
        </div>
      ) : (
        /* Game Mode */
        <div className="w-full flex flex-col gap-4 mt-2">
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5 bg-indigo-50/50 px-4 py-1 rounded-full border border-indigo-100/30 w-fit mx-auto">
            {GAME_QUESTIONS.map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full border text-[6px] font-black flex items-center justify-center transition-all
                ${i<gameIdx?'bg-emerald-500 text-white border-emerald-400':i===gameIdx?'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-300':'bg-white text-slate-300 border-slate-200'}`}>{i+1}</div>
            ))}
          </div>

          {/* Prompt word display with image */}
          <div className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[7rem]">
            <span className="text-5xl">
              {MEI_LETTERS.find(m => m.letter === GAME_QUESTIONS[gameIdx].target)?.emoji}
            </span>
            <span className="text-2xl font-black text-indigo-950 mt-2">
              {MEI_LETTERS.find(m => m.letter === GAME_QUESTIONS[gameIdx].target)?.word}
            </span>
          </div>

          {/* Options */}
          <div className="grid grid-cols-4 gap-3 mt-1">
            {GAME_QUESTIONS[gameIdx].options.map((opt) => {
              const isSelected = selectedAns === opt;
              const isCorrect = opt === GAME_QUESTIONS[gameIdx].target;
              
              let style = 'bg-white text-indigo-950 border-slate-200 hover:border-indigo-300';
              if (isSelected && isCorrect) style = 'bg-emerald-100 text-emerald-700 border-emerald-300 scale-102';
              else if (isSelected && !isCorrect) style = 'bg-red-100 text-red-700 border-red-300';

              return (
                <button
                  key={opt}
                  onClick={() => handleGameTap(opt)}
                  disabled={selectedAns !== null}
                  className={`aspect-square rounded-2xl border-2 flex items-center justify-center text-3xl font-black transition-all cursor-pointer shadow-sm active:scale-95 ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          <div className="min-h-[22px] flex items-center justify-center">
            {showCorrect ? <p className="text-sm font-black text-emerald-600 uppercase tracking-wider flex items-center gap-1"><Sparkles size={14}/> Correct! Super job!</p>
              : showWrong ? <p className="text-sm font-black text-red-500 uppercase tracking-wider">🙅 Try again!</p>
              : <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest flex items-center gap-1"><HelpCircle size={11}/> Spot the matching consonant on the grid!</p>}
          </div>

          <button
            onClick={() => setMode('learn')}
            className="w-full py-2 bg-slate-100 hover:bg-slate-250 text-slate-600 rounded-2xl font-bold text-sm border active:scale-95 cursor-pointer text-center"
          >
            ⬅️ Back to Study Board
          </button>
        </div>
      )}
    </div>
  );
}
