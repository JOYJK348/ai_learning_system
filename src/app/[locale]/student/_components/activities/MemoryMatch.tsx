'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLetterData, shuffle } from '@/core/data/letterData';
import { CheckCircle, HelpCircle } from 'lucide-react';

type Props = {
  config: { pairs?: { a: string; b: string }[] };
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

const BG_GRADIENTS = [
  'from-pink-400 to-rose-500',
  'from-orange-400 to-amber-500',
  'from-sky-400 to-blue-500',
  'from-green-400 to-emerald-500',
  'from-purple-400 to-violet-500',
  'from-teal-400 to-cyan-500',
];

type Card = { 
  id: string; 
  text: string; 
  emoji: string; 
  color: string; 
  gradient: string; 
  flipped: boolean; 
  matched: boolean;
  pairId: number;
};

export default function MemoryMatch({ config, onComplete }: Props) {
  const defaultPairs = [
    { a: 'A', b: 'a' },
    { a: 'B', b: 'b' },
    { a: 'C', b: 'c' },
    { a: 'D', b: 'd' }
  ];
  const pairs = (config.pairs || defaultPairs).slice(0, 4);
  const [cards, setCards] = useState<Card[]>(() => {
    const all: Card[] = [];
    pairs.forEach((p, idx) => {
      const data = getLetterData(p.a.toUpperCase());
      const g = BG_GRADIENTS[idx % BG_GRADIENTS.length];
      
      // Card 1: Capital Letter
      all.push({ 
        id: `cap-${idx}`, 
        text: p.a, 
        emoji: data.emoji, 
        color: data.color, 
        gradient: g, 
        flipped: false, 
        matched: false,
        pairId: idx
      });
      
      // Card 2: Small Letter
      all.push({ 
        id: `small-${idx}`, 
        text: p.b, 
        emoji: data.emoji, 
        color: data.color, 
        gradient: g, 
        flipped: false, 
        matched: false,
        pairId: idx
      });
    });
    return shuffle(all);
  });
  
  const [firstPick, setFirstPick] = useState<string | null>(null);
  const [matchedCount, setMatchedCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [done, setDone] = useState(false);
  const startTime = useRef(Date.now());
  const totalPairs = pairs.length;

  useEffect(() => {
    const t = setTimeout(() => setShowAll(false), 2200);
    return () => clearTimeout(t);
  }, []);

  const handleFlip = (id: string) => {
    if (lock || showAll || done) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.matched || card.flipped) return;

    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    setCards(newCards);

    if (!firstPick) { 
      setFirstPick(id); 
      return; 
    }

    const first = cards.find(c => c.id === firstPick)!;
    setLock(true);

    const second = newCards.find(c => c.id === id)!;

    if (first.pairId === second.pairId) {
      // Match!
      setTimeout(() => {
        setCards(prev => prev.map(c => c.pairId === first.pairId ? { ...c, matched: true } : c));
        setMatchedCount(m => { 
          const n = m + 1; 
          if (n >= totalPairs) {
            setTimeout(() => setDone(true), 600);
          }
          return n; 
        });
        setFirstPick(null); 
        setLock(false);
      }, 400);
    } else {
      // Wrong!
      setWrongFlash(true);
      setTimeout(() => setWrongFlash(false), 400);
      setTimeout(() => {
        setCards(prev => prev.map(c => c.id === first.id || c.id === id ? { ...c, flipped: false } : c));
        setFirstPick(null); 
        setLock(false);
      }, 1200);
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
        <motion.span
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-8xl"
        >🏆</motion.span>
        <h2 className="text-3xl font-black text-indigo-950 text-center uppercase tracking-tight">Memory Match Done!</h2>
        <p className="text-lg font-bold text-indigo-900/60 text-center -mt-2">
          Awesome! You matched all letter pairs! 🧠⭐
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onComplete({
            score: 100,
            max_score: 100,
            completion_data: { matched: matchedCount, total: totalPairs },
            time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
          })}
          className="w-full max-w-xs inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl border-b-4 border-emerald-700 active:scale-95 cursor-pointer"
        >
          Continue ➡️
        </motion.button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-4 px-4 py-4 kids-font ${wrongFlash ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font {
          font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
        }
      `}} />

      <div className="text-center">
        <span className="text-[10px] font-black text-indigo-900/40 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🧠 Memory Match Game
        </span>
        <h3 className="text-2xl font-black text-indigo-950 mt-2">
          Match Capital and Small Letters!
        </h3>
      </div>

      {showAll && (
        <p className="text-sm font-black text-amber-500 animate-pulse">
          👀 Remember where each letter is!
        </p>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-4 gap-3 max-w-sm w-full mt-2">
        {cards.map((card) => {
          const isFlipped = card.flipped || card.matched || showAll;
          return (
            <motion.button
              key={card.id}
              whileHover={!isFlipped ? { scale: 1.05 } : {}}
              whileTap={!isFlipped ? { scale: 0.95 } : {}}
              onClick={() => handleFlip(card.id)}
              disabled={card.matched}
              className={`aspect-[3/4] rounded-2xl shadow-md border-2 transition-all cursor-pointer relative overflow-hidden
                ${isFlipped 
                  ? card.matched 
                    ? 'border-emerald-500 opacity-60 bg-emerald-50' 
                    : 'border-indigo-200 bg-white' 
                  : 'border-indigo-100 bg-indigo-50/50 hover:bg-indigo-50/80'}`}
            >
              <div className="w-full h-full flex items-center justify-center">
                {isFlipped ? (
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-3xl drop-shadow-sm leading-none">{card.emoji}</span>
                    <span className="text-2xl font-black text-indigo-950 leading-none font-sans select-none">
                      {card.text}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-black text-indigo-950/20 select-none">?</span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Progress Dots */}
      <div className="flex items-center gap-2 mt-2">
        {Array.from({ length: totalPairs }).map((_, i) => (
          <div key={i} className={`w-3.5 h-3.5 rounded-full border shadow-sm transition-all duration-350
            ${i < matchedCount ? 'bg-emerald-500 border-emerald-400 scale-110' : 'bg-white border-slate-200'}`} 
          />
        ))}
      </div>

      <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest mt-1">
        {showAll ? '⏳ Study the board...' : '👆 Flip two cards that match!'}
      </p>
    </div>
  );
}
