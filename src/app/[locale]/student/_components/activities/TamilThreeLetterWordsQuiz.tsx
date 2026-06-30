'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type WordData = {
  word: string;
  letters: string[];
  emoji: string;
  hint: string;
  color: string;
};

const WORDS: WordData[] = [
  { word: 'மரம்', letters: ['ம', 'ர', 'ம்'], emoji: '🌳', hint: 'Tree', color: 'bg-red-50 text-red-700 border-red-100' },
  { word: 'படம்', letters: ['ப', 'ட', 'ம்'], emoji: '🖼️', hint: 'Picture', color: 'bg-orange-50 text-orange-700 border-orange-100' },
  { word: 'பறவை', letters: ['ப', 'ற', 'வை'], emoji: '🐦', hint: 'Bird', color: 'bg-amber-50 text-amber-700 border-amber-100' },
  { word: 'முயல்', letters: ['மு', 'ய', 'ல்'], emoji: '🐰', hint: 'Rabbit', color: 'bg-green-50 text-green-700 border-green-100' },
  { word: 'வாத்து', letters: ['வா', 'த்', 'து'], emoji: '🦆', hint: 'Duck', color: 'bg-sky-50 text-sky-700 border-sky-100' },
  { word: 'கதவு', letters: ['க', 'த', 'வு'], emoji: '🚪', hint: 'Door', color: 'bg-violet-50 text-violet-700 border-violet-100' },
];

const QUESTIONS = [
  { emoji: '🐰', hint: 'Rabbit', target: 'முயல்', options: ['முயல்', 'மரம்', 'பறவை', 'கதவு'] },
  { emoji: '🌳', hint: 'Tree', target: 'மரம்', options: ['மரம்', 'படம்', 'வாத்து', 'முயல்'] },
  { emoji: '🖼️', hint: 'Picture', target: 'படம்', options: ['படம்', 'கதவு', 'பறவை', 'மரம்'] },
  { emoji: '🦆', hint: 'Duck', target: 'வாத்து', options: ['வாத்து', 'முயல்', 'பல்', 'மீன்'] },
  { emoji: '🚪', hint: 'Door', target: 'கதவு', options: ['கதவு', 'படம்', 'மரம்', 'பறவை'] },
];

export default function TamilThreeLetterWordsQuiz({ onComplete }: Props) {
  const [mode, setMode] = useState<'learn' | 'quiz'>('learn');
  const [selectedWord, setSelectedWord] = useState<WordData | null>(null);
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
    if (opt === currentQuestion.target) {
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
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase">மூவெழுத்து நாயகன்!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">Outstanding! You learned three-letter words! 🌟</p>
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
          📙 மூவெழுத்துச் சொற்கள் (3-Letter Words)
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1">
          {mode === 'learn' ? 'சொற்களை தொட்டுப் பார்! 💡' : 'சரியான சொல்லைத் தேர்ந்தெடு!'}
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
                className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-3 transition-all active:scale-95 cursor-pointer shadow-sm ${item.color} ${selectedWord?.word === item.word ? 'ring-4 ring-indigo-400 border-indigo-400' : ''}`}
              >
                <span className="text-4xl">{item.emoji}</span>
                <span className="text-xl font-black mt-1">{item.word}</span>
              </button>
            ))}
          </div>

          {/* Word detail visual display board */}
          <div className="w-full bg-[#fdfbf6] border-4 border-[#e9d1a8] rounded-[2rem] p-4 shadow-md flex items-center justify-between min-h-[6.5rem]">
            {selectedWord ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-indigo-950 bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-100 flex items-center gap-2">
                      {selectedWord.letters.map((l, i) => (
                        <span key={i} className="text-indigo-950">{l}</span>
                      ))}
                    </span>
                    <span className="text-[9px] font-black text-indigo-900/40 uppercase tracking-widest mt-1">மூவெழுத்து சொல்</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-indigo-900">{selectedWord.word}</p>
                  <p className="text-xs font-bold text-indigo-900/40 uppercase tracking-wide">{selectedWord.hint}</p>
                </div>
              </>
            ) : (
              <p className="text-sm font-bold text-indigo-900/40 text-center w-full py-4 flex items-center justify-center gap-1.5">
                <HelpCircle size={16} /> எந்த சொல்லையாவது தொட்டுப் படி!
              </p>
            )}
          </div>

          <button
            onClick={() => setMode('quiz')}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-base shadow-lg border-b-4 border-indigo-800 active:scale-95 cursor-pointer text-center"
          >
            விளையாடுவோம்! 🎮
          </button>
        </div>
      ) : (
        /* Quiz Mode */
        <div className="w-full flex flex-col gap-4 mt-1">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-1.5">
            {QUESTIONS.map((_, i) => (
              <div key={i} className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300
                ${i < qIdx ? 'bg-emerald-500 border-emerald-600' : i === qIdx ? 'bg-indigo-600 border-indigo-700 ring-2 ring-indigo-300' : 'bg-white border-slate-200'}`} />
            ))}
          </div>

          {/* Question visual prompt board */}
          <div className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col items-center justify-center min-h-[8.5rem]">
            <span className="text-6xl">{currentQuestion.emoji}</span>
            <span className="text-lg font-black text-indigo-950 mt-1 uppercase tracking-widest">{currentQuestion.hint}</span>
          </div>

          {/* Options grid */}
          <div className="grid grid-cols-2 gap-3">
            {shuffledOptions.map((opt) => {
              const isSelected = pickedOption === opt;
              const isCorrect = opt === currentQuestion.target;
              
              let style = 'bg-white text-indigo-950 border-slate-200 hover:border-indigo-300';
              if (isSelected && isCorrect) style = 'bg-emerald-100 text-emerald-700 border-emerald-300';
              else if (isSelected && !isCorrect) style = 'bg-red-100 text-red-700 border-red-300';

              return (
                <button
                  key={opt}
                  onClick={() => handleOptionTap(opt)}
                  disabled={pickedOption !== null}
                  className={`py-4 rounded-2xl border-3 flex items-center justify-center text-2xl font-black transition-all cursor-pointer shadow-sm active:scale-95 ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Feedback message */}
          <div className="min-h-[22px] flex items-center justify-center">
            {showCorrect ? (
              <p className="text-sm font-black text-emerald-600 uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={14} /> சரியான விடை! Super!
              </p>
            ) : showWrong ? (
              <p className="text-sm font-black text-red-500 uppercase tracking-wider">
                🙅 தவறு! மீண்டும் முயற்சி செய்!
              </p>
            ) : (
              <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest">
                படத்தில் உள்ள பொருளின் பெயரை தேர்ந்தெடு!
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
