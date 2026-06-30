'use client';
import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';

type Props = {
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

const LETTERS = [
  { letter: 'கா', word: 'காடு',      emoji: '🌲', hint: 'Forest',   color: 'bg-red-50 text-red-700 border-red-100' },
  { letter: 'சா', word: 'சாலை',     emoji: '🛣️', hint: 'Road',     color: 'bg-orange-50 text-orange-700 border-orange-100' },
  { letter: 'டா', word: 'டாக்டர்',  emoji: '👨‍⚕️', hint: 'Doctor',   color: 'bg-amber-50 text-amber-700 border-amber-100' },
  { letter: 'தா', word: 'தாமரை',    emoji: '🪷', hint: 'Lotus',    color: 'bg-yellow-50 text-yellow-700 border-yellow-100' },
  { letter: 'நா', word: 'நாய்',      emoji: '🐕', hint: 'Dog',      color: 'bg-lime-50 text-lime-700 border-lime-100' },
  { letter: 'பா', word: 'பாட்டி',   emoji: '👵', hint: 'Grandma',  color: 'bg-green-50 text-green-700 border-green-100' },
  { letter: 'மா', word: 'மாம்பழம்', emoji: '🥭', hint: 'Mango',    color: 'bg-teal-50 text-teal-700 border-teal-100' },
  { letter: 'யா', word: 'யாழ்',     emoji: '🪕', hint: 'Harp',     color: 'bg-sky-50 text-sky-700 border-sky-100' },
  { letter: 'ரா', word: 'ராஜா',     emoji: '👑', hint: 'King',     color: 'bg-blue-50 text-blue-700 border-blue-100' },
  { letter: 'லா', word: 'லாரி',     emoji: '🚛', hint: 'Lorry',    color: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
  { letter: 'வா', word: 'வாழை',     emoji: '🍌', hint: 'Banana',   color: 'bg-violet-50 text-violet-700 border-violet-100' },
  { letter: 'னா', word: 'இனா',      emoji: '⭐', hint: 'Name',     color: 'bg-pink-50 text-pink-700 border-pink-100' },
];

const QUESTIONS = [
  { emoji: '🥭', word: 'மாம்பழம்', hint: 'Mango',  target: 'மா', options: ['மா', 'கா', 'வா', 'பா'] },
  { emoji: '🌲', word: 'காடு',     hint: 'Forest', target: 'கா', options: ['கா', 'சா', 'டா', 'தா'] },
  { emoji: '🐕', word: 'நாய்',     hint: 'Dog',    target: 'நா', options: ['நா', 'லா', 'ரா', 'மா'] },
  { emoji: '🍌', word: 'வாழை',    hint: 'Banana', target: 'வா', options: ['வா', 'யா', 'பா', 'லா'] },
  { emoji: '👑', word: 'ராஜா',    hint: 'King',   target: 'ரா', options: ['ரா', 'கா', 'மா', 'சா'] },
];

export default function TamilUyirmeiQuiz2({ onComplete }: Props) {
  const [mode, setMode] = useState<'learn' | 'quiz'>('learn');
  const [selected, setSelected] = useState<typeof LETTERS[0] | null>(null);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [done, setDone] = useState(false);
  const t0 = useRef(Date.now());

  const shuffledOptions = useMemo(
    () => [...QUESTIONS[qIdx].options].sort(() => Math.random() - 0.5),
    [qIdx]
  );

  const handlePick = (opt: string) => {
    if (picked || done) return;
    setPicked(opt);
    if (opt === QUESTIONS[qIdx].target) {
      setScore(s => s + 1);
      setCorrect(true);
      setTimeout(() => {
        setCorrect(false); setPicked(null);
        if (qIdx < QUESTIONS.length - 1) setQIdx(i => i + 1);
        else setDone(true);
      }, 1100);
    } else {
      setWrong(true);
      setTimeout(() => { setWrong(false); setPicked(null); }, 850);
    }
  };

  if (done) return (
    <div className="flex flex-col items-center gap-5 px-6 py-10 kids-font">
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&display=swap');.kids-font{font-family:'Baloo 2',sans-serif!important;}` }} />
      <span className="text-7xl">🏆</span>
      <h2 className="text-2xl font-black text-indigo-950 text-center">கா முதல் னா — கற்றுவிட்டீர்கள்!</h2>
      <p className="text-base font-bold text-indigo-900/50 -mt-2">{score}/{QUESTIONS.length} சரியான விடைகள் 🌟</p>
      <button onClick={() => onComplete({ score: Math.round(score / QUESTIONS.length * 100), max_score: 100, completion_data: { score, total: QUESTIONS.length }, time_taken_seconds: Math.round((Date.now() - t0.current) / 1000) })}
        className="w-full max-w-xs py-4 bg-emerald-500 text-white rounded-2xl font-black text-lg shadow-xl border-b-4 border-emerald-700 active:scale-95 cursor-pointer">
        Continue ➡️
      </button>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-4 px-3 py-2 w-full max-w-md mx-auto kids-font select-none">
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&display=swap');.kids-font{font-family:'Baloo 2',sans-serif!important;}` }} />

      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100/50">
          🔤 உயிர்மெய் — கா முதல் னா
        </span>
        <h3 className="text-xl font-black text-indigo-950 mt-1">
          {mode === 'learn' ? 'கா வரிசை கற்கலாம்! 💡' : `"${QUESTIONS[qIdx].word}" எந்த எழுத்தில் தொடங்கும்?`}
        </h3>
      </div>

      {mode === 'learn' ? (
        <div className="w-full flex flex-col gap-4">
          <div className="grid grid-cols-6 gap-1.5">
            {LETTERS.map(item => (
              <button key={item.letter} onClick={() => setSelected(item)}
                className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center p-1 cursor-pointer shadow-sm ${item.color} ${selected?.letter === item.letter ? 'ring-4 ring-emerald-400 border-emerald-400' : ''}`}>
                <span className="text-xl font-black leading-tight">{item.letter}</span>
                <span className="text-xs">{item.emoji}</span>
              </button>
            ))}
          </div>

          <div className="w-full bg-[#f6fdf9] border-4 border-[#a8e9c8] rounded-[2rem] p-4 shadow-md flex items-center justify-between min-h-[6.5rem]">
            {selected ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-black text-emerald-950 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100">{selected.letter}</span>
                  <div>
                    <p className="text-xl font-black text-indigo-900">{selected.word}</p>
                    <p className="text-xs font-bold text-indigo-900/40 uppercase">{selected.hint}</p>
                  </div>
                </div>
                <span className="text-5xl">{selected.emoji}</span>
              </>
            ) : (
              <p className="text-sm font-bold text-indigo-900/40 text-center w-full flex items-center justify-center gap-1.5">
                <HelpCircle size={16} /> எந்த எழுத்தையாவது தொடு!
              </p>
            )}
          </div>

          <button onClick={() => setMode('quiz')}
            className="w-full py-3.5 bg-emerald-600 text-white rounded-2xl font-black text-base shadow-lg border-b-4 border-emerald-800 active:scale-95 cursor-pointer">
            விளையாட்டு தொடங்கு! 🎮
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center justify-center gap-1.5">
            {QUESTIONS.map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full border ${i < qIdx ? 'bg-emerald-500 border-emerald-400' : i === qIdx ? 'bg-emerald-600 border-emerald-500 ring-2 ring-emerald-300' : 'bg-white border-slate-200'}`} />
            ))}
          </div>
          <div className="w-full bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-100 rounded-3xl p-6 flex flex-col items-center gap-2 min-h-[9rem]">
            <span className="text-6xl">{QUESTIONS[qIdx].emoji}</span>
            <p className="text-2xl font-black text-indigo-950">{QUESTIONS[qIdx].word}</p>
            <p className="text-xs font-bold text-indigo-900/40">{QUESTIONS[qIdx].hint}</p>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {shuffledOptions.map(opt => {
              const isSel = picked === opt;
              const isTarget = opt === QUESTIONS[qIdx].target;
              let cls = 'bg-white text-indigo-950 border-slate-200 hover:bg-emerald-50';
              if (isSel && isTarget) cls = 'bg-emerald-100 text-emerald-700 border-emerald-400';
              else if (isSel && !isTarget) cls = 'bg-red-100 text-red-700 border-red-300';
              return (
                <button key={opt} onClick={() => handlePick(opt)} disabled={!!picked}
                  className={`aspect-square rounded-2xl border-2 flex items-center justify-center text-2xl font-black shadow-sm cursor-pointer active:scale-95 ${cls}`}>
                  {opt}
                </button>
              );
            })}
          </div>
          <div className="min-h-[20px] flex items-center justify-center">
            {correct ? <p className="text-sm font-black text-emerald-600 flex items-center gap-1"><Sparkles size={14} /> சரியான விடை! 🎉</p>
              : wrong ? <p className="text-sm font-black text-red-500">🙅 மீண்டும் முயற்சி!</p>
              : <p className="text-[10px] font-bold text-indigo-950/30 uppercase tracking-widest">படத்தில் தொடங்கும் எழுத்தை தேர்ந்தெடு</p>}
          </div>
          <button onClick={() => setMode('learn')}
            className="w-full py-2 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm border active:scale-95 cursor-pointer">
            ⬅️ படிப்பு பலகை
          </button>
        </div>
      )}
    </div>
  );
}
