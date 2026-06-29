'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Star, CheckCircle, XCircle, ArrowRight, ArrowLeft, Trophy, Sparkles, RotateCcw } from 'lucide-react';
import { audioEngine } from '@/core/utils/audio';

/* ── UTILS ── */
function speak(text: string) {
  try { audioEngine?.speak(text); } catch {}
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ── SHARED: GAME SHELL ── */
function GameShell({
  title, subtitle, round, total, score, onBack, hideProgress, children, bgFrom = 'from-sky-300', bgTo = 'to-blue-500',
}: {
  title: string; subtitle: string; round: number; total: number; score: number;
  onBack: () => void; hideProgress?: boolean; children: React.ReactNode;
  bgFrom?: string; bgTo?: string;
}) {
  return (
    <div className="relative min-h-screen w-full font-sans overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${bgFrom} via-sky-400 ${bgTo}`} />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '38px 38px' }} />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-blue-300/30 blur-[100px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-10 max-w-2xl mx-auto pt-8 pb-40 px-4"
      >
        {/* Nav head */}
        <div className="flex items-center justify-between mb-8">
          <button
            onPointerDown={onBack}
            className="flex items-center gap-2 px-5 py-3 bg-white/40 backdrop-blur-xl text-indigo-950 font-black text-xs uppercase tracking-widest rounded-2xl border border-white/60 hover:bg-white/60 transition-all shadow-xl active:scale-95 [touch-action:none]"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <div className="flex items-center gap-2 bg-amber-400 px-5 py-3 rounded-2xl border-2 border-white shadow-xl">
            <Star size={16} className="text-indigo-950 fill-indigo-950" />
            <span className="font-black text-indigo-950 text-sm">{score} ⭐</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-1 drop-shadow-lg leading-none">{title}</h1>
          <p className="text-white/70 font-bold text-sm">{subtitle}</p>

          {!hideProgress && total > 0 && (
            <div className="mt-5 flex items-center justify-center gap-2">
              {[...Array(total)].map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full transition-all duration-500 ${i < round ? 'bg-white scale-125 shadow-[0_0_12px_rgba(255,255,255,0.7)]' : 'bg-white/25 border border-white/40'}`} />
              ))}
            </div>
          )}
        </div>

        {children}
      </motion.div>
    </div>
  );
}

/* ── SHARED: RESULT FLASH ── */
function ResultFlash({ result }: { result: 'correct' | 'wrong' | null }) {
  return (
    <AnimatePresence mode="wait">
      {result && (
        <motion.div
          key={result}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <div className={`text-8xl select-none drop-shadow-2xl`}>
            {result === 'correct' ? '🎉' : '😅'}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── SHARED: GAME COMPLETE ── */
function GameComplete({ title, score, total, onBack, extra }: { title: string; score: number; total: number; onBack: () => void; extra?: string }) {
  const pct = total > 0 ? score / total : 0;
  const stars = pct === 1 ? 3 : pct >= 0.6 ? 2 : 1;
  useEffect(() => { speak(`Amazing! You scored ${score} out of ${total}!`); }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center font-sans overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '38px 38px' }} />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 max-w-md w-full px-6 text-center"
      >
        <div className="bg-white/30 backdrop-blur-3xl p-10 rounded-[3.5rem] border-4 border-white/60 shadow-2xl relative">
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 bg-amber-400 rounded-3xl flex items-center justify-center text-5xl shadow-2xl border-4 border-white transform -rotate-12"
          >
            🏆
          </motion.div>

          <div className="mt-10 mb-4">
            <h1 className="text-3xl font-black text-white tracking-tight mb-1 drop-shadow-lg">{title}</h1>
            <p className="text-white/60 font-black uppercase tracking-[0.3em] text-[10px]">Mission Complete!</p>
          </div>

          <div className="flex items-center justify-center gap-3 mb-8">
            {[1, 2, 3].map(i => (
              <motion.div key={i} initial={{ scale: 0, rotate: -30 }} animate={{ scale: i <= stars ? 1 : 0.5, rotate: 0 }} transition={{ delay: i * 0.25 }}>
                <Star size={44} className={i <= stars ? 'text-amber-400 fill-amber-400 drop-shadow-lg' : 'text-white/20'} />
              </motion.div>
            ))}
          </div>

          <div className="bg-white/20 rounded-3xl py-5 mb-8 border border-white/30">
            <span className="text-[10px] font-black text-white/50 uppercase tracking-widest block mb-1">Score</span>
            <p className="text-5xl font-black text-white tracking-tighter leading-none">
              {score}<span className="text-white/40">/{total}</span>
            </p>
            {extra && <p className="text-white/60 font-bold text-xs mt-2 uppercase tracking-widest">{extra}</p>}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="w-full py-5 bg-white text-indigo-950 font-black text-sm uppercase tracking-[0.3em] rounded-2xl shadow-2xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-3"
          >
            Done! <ArrowRight size={18} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   GAME 1: BUBBLE POP QUIZ 🫧
   Colorful bubbles float around — tap the right one!
══════════════════════════════════════════════ */

const BUBBLE_QUESTIONS = [
  { q: 'Which one is RED? 🔴',        answer: '🍎', options: ['🍎', '🍌', '🫐', '🍋'], hint: 'Apple' },
  { q: 'Which one is YELLOW? 🟡',     answer: '🌻', options: ['🌻', '🍓', '🍇', '🌿'], hint: 'Sunflower' },
  { q: 'Which animal lives in water?', answer: '🐠', options: ['🐠', '🐘', '🦁', '🐔'], hint: 'Fish' },
  { q: 'Which one can FLY? 🕊️',       answer: '🦋', options: ['🦋', '🐢', '🐸', '🐄'], hint: 'Butterfly' },
  { q: 'Which one is a FRUIT? 🍓',     answer: '🍓', options: ['🍓', '🪑', '📚', '🎒'], hint: 'Strawberry' },
  { q: 'Which animal says MOO? 🐄',    answer: '🐄', options: ['🐄', '🐶', '🐱', '🦆'], hint: 'Cow' },
  { q: 'Which one is ROUND? ⭕',       answer: '🍊', options: ['🍊', '📐', '📚', '🔑'], hint: 'Orange' },
  { q: 'Which is a VEGETABLE? 🥕',     answer: '🥕', options: ['🥕', '🎈', '🌟', '🧸'], hint: 'Carrot' },
  { q: 'Which animal has a long neck?', answer: '🦒', options: ['🦒', '🐶', '🐸', '🐟'], hint: 'Giraffe' },
  { q: 'Which one is BLUE? 💙',        answer: '💎', options: ['💎', '🍋', '🍓', '🌿'], hint: 'Diamond' },
];

const BUBBLE_COLORS = [
  'bg-rose-400 border-rose-300 shadow-rose-300',
  'bg-amber-400 border-amber-300 shadow-amber-300',
  'bg-emerald-400 border-emerald-300 shadow-emerald-300',
  'bg-sky-400 border-sky-300 shadow-sky-300',
  'bg-purple-400 border-purple-300 shadow-purple-300',
  'bg-pink-400 border-pink-300 shadow-pink-300',
];

type BubbleState = {
  id: string;
  emoji: string;
  x: number;       // % from left
  y: number;       // % from top
  dx: number;      // velocity x
  dy: number;      // velocity y
  color: string;
  scale: number;
  popped: boolean;
  shake: boolean;
};

export function SoundMatchGame({ onBack }: { onBack: () => void }) {
  const totalRounds = 8;
  const questions = useRef(shuffleArray(BUBBLE_QUESTIONS).slice(0, totalRounds)).current;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [bubbles, setBubbles] = useState<BubbleState[]>([]);
  const [popFeedback, setPopFeedback] = useState<{ x: number; y: number; correct: boolean } | null>(null);
  const [locked, setLocked] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const cur = questions[round];

  // Initialize bubbles for each round — shuffle options so correct ans is at random position
  useEffect(() => {
    if (gameOver || !cur) return;

    // Shuffle so correct answer bubble appears at a random position each round
    const shuffledOptions = shuffleArray([...cur.options]);

    // 4 non-overlapping zones across the play area
    const zones = [
      { xBase: 5,  yBase: 8  },
      { xBase: 55, yBase: 8  },
      { xBase: 5,  yBase: 50 },
      { xBase: 55, yBase: 50 },
    ];
    // Shuffle zones too so bubbles don't always map to same corners
    const shuffledZones = shuffleArray([...zones]);

    const spawnedBubbles: BubbleState[] = shuffledOptions.map((emoji, i) => {
      const zone = shuffledZones[i % shuffledZones.length];
      return {
        id: `${round}-${i}`,
        emoji,
        x: zone.xBase + Math.random() * 25,
        y: zone.yBase + Math.random() * 25,
        dx: ((Math.random() - 0.5) * 0.08) + (Math.random() > 0.5 ? 0.03 : -0.03),
        dy: ((Math.random() - 0.5) * 0.08) + (Math.random() > 0.5 ? 0.03 : -0.03),
        color: BUBBLE_COLORS[i % BUBBLE_COLORS.length],
        scale: 0.9 + Math.random() * 0.2,
        popped: false,
        shake: false,
      };
    });
    setBubbles(spawnedBubbles);
    setLocked(false);
    speak(cur.q);
  }, [round, gameOver, cur]);


  // Animate bubbles floating around
  useEffect(() => {
    if (gameOver) return;
    const animate = (time: number) => {
      if (time - lastTimeRef.current > 16) {
        lastTimeRef.current = time;
        setBubbles(prev => prev.map(b => {
          if (b.popped) return b;
          let nx = b.x + b.dx;
          let ny = b.y + b.dy;
          let ndx = b.dx;
          let ndy = b.dy;
          // Bounce off walls
          if (nx < 5 || nx > 78) ndx = -ndx;
          if (ny < 5 || ny > 72) ndy = -ndy;
          nx = Math.max(5, Math.min(78, nx));
          ny = Math.max(5, Math.min(72, ny));
          return { ...b, x: nx, y: ny, dx: ndx, dy: ndy };
        }));
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [round, gameOver]);

  const handleBubblePop = (bubble: BubbleState) => {
    if (locked || bubble.popped) return;
    if (bubble.emoji === cur.answer) {
      // Correct!
      setLocked(true);
      setBubbles(prev => prev.map(b => b.id === bubble.id ? { ...b, popped: true } : b));
      setPopFeedback({ x: bubble.x, y: bubble.y, correct: true });
      setScore(s => s + 1);
      speak('Pop! Amazing!');
      setTimeout(() => {
        setPopFeedback(null);
        if (round + 1 >= totalRounds) setGameOver(true);
        else setRound(r => r + 1);
      }, 1200);
    } else {
      // Wrong — shake that bubble
      setBubbles(prev => prev.map(b => b.id === bubble.id ? { ...b, shake: true } : b));
      speak('Oops! Try again!');
      setTimeout(() => setBubbles(prev => prev.map(b => b.id === bubble.id ? { ...b, shake: false } : b)), 600);
    }
  };

  if (gameOver) return <GameComplete title="Bubble Pop! 🫧" score={score} total={totalRounds} onBack={onBack} />;
  if (!cur) return null;

  return (
    <div className="relative min-h-screen w-full font-sans overflow-hidden select-none">
      {/* Vivid gradient sky bg */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '36px 36px' }} />
        {/* Decorative blobs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-300/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-300/30 rounded-full blur-3xl" />
      </div>

      {/* HUD */}
      <div className="relative z-20 flex items-center justify-between px-4 pt-6 pb-2 max-w-2xl mx-auto">
        <button
          onPointerDown={onBack}
          className="flex items-center gap-2 px-4 py-2.5 bg-white/30 backdrop-blur-xl text-white font-black text-xs uppercase tracking-widest rounded-2xl border border-white/40 active:scale-95 [touch-action:none] shadow-lg"
        >
          <ArrowLeft size={15} /> Back
        </button>

        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/30 shadow-lg">
            <span className="text-white font-black text-xs uppercase tracking-widest">Round <span className="text-amber-300">{round + 1}/{totalRounds}</span></span>
          </div>
          <div className="bg-amber-400 px-4 py-2 rounded-xl border-2 border-white shadow-xl">
            <span className="text-indigo-950 font-black text-sm">⭐ {score}</span>
          </div>
        </div>
      </div>

      {/* Question Banner */}
      <motion.div
        key={round}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-20 mx-4 max-w-2xl xl:mx-auto mt-3 mb-2"
      >
        <div className="bg-white/25 backdrop-blur-xl rounded-[2rem] px-6 py-4 border-2 border-white/40 shadow-2xl text-center">
          <p className="text-white font-black text-xl sm:text-2xl drop-shadow-md leading-tight">{cur.q}</p>
          <p className="text-white/60 text-xs font-bold mt-1 uppercase tracking-widest">Tap the right bubble! 🫧</p>
        </div>
      </motion.div>

      {/* Round progress dots */}
      <div className="relative z-20 flex justify-center gap-2 mt-3">
        {[...Array(totalRounds)].map((_, i) => (
          <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all duration-400 ${i < round ? 'bg-white scale-125' : i === round ? 'bg-amber-400 scale-150' : 'bg-white/30'}`} />
        ))}
      </div>

      {/* Bubble Play Area */}
      <div className="absolute inset-0 z-10" style={{ top: '200px' }}>
        <AnimatePresence>
          {bubbles.map(bubble => (
            !bubble.popped && (
              <motion.button
                key={bubble.id}
                style={{ position: 'absolute', left: `${bubble.x}%`, top: `${bubble.y}%` }}
                animate={bubble.shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
                transition={bubble.shake ? { duration: 0.5 } : {}}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.88 }}
                onPointerDown={() => handleBubblePop(bubble)}
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 flex flex-col items-center justify-center shadow-2xl ${bubble.color} active:scale-90 [touch-action:none] transition-shadow`}
              >
                <span className="text-4xl sm:text-5xl leading-none drop-shadow-md select-none">{bubble.emoji}</span>
              </motion.button>
            )
          ))}
        </AnimatePresence>

        {/* Pop Feedback burst */}
        <AnimatePresence>
          {popFeedback && (
            <motion.div
              key="pop"
              style={{ position: 'absolute', left: `${popFeedback.x}%`, top: `${popFeedback.y}%` }}
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="pointer-events-none z-30 flex items-center justify-center"
            >
              <div className={`w-24 h-24 rounded-full ${popFeedback.correct ? 'bg-emerald-400' : 'bg-rose-400'} opacity-80`} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Big emoji flash on correct */}
      <AnimatePresence>
        {popFeedback?.correct && (
          <motion.div
            key="emoji-flash"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <span className="text-[120px] drop-shadow-2xl">🎉</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



/* ══════════════════════════════════════════════
   GAME 2: TRUE OR FALSE ✅❌
   LKG-themed silly fun questions
══════════════════════════════════════════════ */
const LKG_TRUE_FALSE = [
  { q: 'An elephant is small?',        a: false, emoji: '🐘' },
  { q: 'Dogs say Meow?',               a: false, emoji: '🐶' },
  { q: 'Apple is a fruit?',            a: true,  emoji: '🍎' },
  { q: 'We drink milk?',               a: true,  emoji: '🥛' },
  { q: 'A circle has corners?',        a: false, emoji: '⭕' },
  { q: 'Fish live in water?',          a: true,  emoji: '🐟' },
  { q: 'The sun is bright?',           a: true,  emoji: '☀️' },
  { q: 'Bananas are blue?',            a: false, emoji: '🍌' },
  { q: 'We sleep at night?',           a: true,  emoji: '🌙' },
  { q: 'Birds have wings?',            a: true,  emoji: '🐦' },
  { q: 'A triangle has 4 sides?',      a: false, emoji: '📐' },
  { q: 'Cats say Woof?',              a: false, emoji: '🐱' },
  { q: 'Ice cream is cold?',           a: true,  emoji: '🍦' },
  { q: 'We use pen to write?',         a: true,  emoji: '✏️' },
  { q: 'Lions eat grass?',             a: false, emoji: '🦁' },
];

export function TrueOrFalseGame({ onBack }: { onBack: () => void }) {
  const questions = useRef(shuffleArray(LKG_TRUE_FALSE).slice(0, 7)).current;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const cur = questions[round];

  useEffect(() => {
    if (!gameOver && cur) {
      const t = setTimeout(() => speak(cur.q), 600);
      return () => clearTimeout(t);
    }
  }, [round, gameOver, cur]);

  const handleAnswer = (ans: boolean) => {
    if (result) return;
    if (ans === cur.a) {
      setResult('correct');
      setScore(s => s + 1);
      speak('Yes! That is correct!');
    } else {
      setResult('wrong');
      speak("Oops! Not quite!");
    }
    setTimeout(() => {
      if (round + 1 >= questions.length) setGameOver(true);
      else { setRound(r => r + 1); setResult(null); }
    }, 1500);
  };

  if (gameOver) return <GameComplete title="True or False! ✅" score={score} total={questions.length} onBack={onBack} />;

  return (
    <GameShell title="✅ True or False" subtitle="Is this statement true or false?" round={round + 1} total={questions.length} score={score} onBack={onBack} bgFrom="from-violet-400" bgTo="to-purple-600">
      <ResultFlash result={result} />

      <motion.div
        key={round}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white/30 backdrop-blur-3xl p-8 rounded-[3rem] border-4 border-white/50 shadow-2xl mb-8 text-center"
      >
        <motion.span
          className="text-9xl block mb-6 select-none"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {cur.emoji}
        </motion.span>
        <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight drop-shadow-md">
          {cur.q}
        </h2>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-5 flex justify-center"
            >
              <div className={`px-8 py-3 rounded-full font-black uppercase tracking-[0.2em] text-sm border-2 shadow-lg
                ${result === 'correct' ? 'bg-emerald-400/60 border-emerald-400 text-white' : 'bg-rose-400/60 border-rose-400 text-white'}`}>
                {result === 'correct' ? '🎉 Correct!' : '😅 Not Quite!'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onPointerDown={() => handleAnswer(true)}
          className="h-20 rounded-[1.5rem] bg-emerald-500 text-white font-black text-xl flex items-center justify-center gap-2 shadow-2xl border-b-[6px] border-emerald-700 active:border-b-0 active:translate-y-1.5 transition-all [touch-action:none]"
        >
          <CheckCircle size={22} /> TRUE
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onPointerDown={() => handleAnswer(false)}
          className="h-20 rounded-[1.5rem] bg-rose-500 text-white font-black text-xl flex items-center justify-center gap-2 shadow-2xl border-b-[6px] border-rose-700 active:border-b-0 active:translate-y-1.5 transition-all [touch-action:none]"
        >
          <XCircle size={22} /> FALSE
        </motion.button>
      </div>
    </GameShell>
  );
}

/* ══════════════════════════════════════════════
   GAME 3: ODD ONE OUT 🔍
   3 belong to same group — tap the intruder!
   No animations — simple, clean, fast.
══════════════════════════════════════════════ */

const ODD_ONE_OUT = [
  { q: 'Which one is NOT an animal?',  items: ['🐶', '🐱', '🍎', '🦁'],  odd: '🍎'  },
  { q: 'Which one is NOT a fruit?',    items: ['🍌', '🍊', '🚗', '🍓'],  odd: '🚗'  },
  { q: 'Which one cannot FLY?',        items: ['🦋', '🐦', '✈️', '🐘'],  odd: '🐘'  },
  { q: 'Which one is NOT a color?',    items: ['🔴', '🟡', '🐸', '🔵'],  odd: '🐸'  },
  { q: 'Which one is NOT a number?',   items: ['1', '2', '🍕', '3'],     odd: '🍕'  },
  { q: 'Which one lives in water?',    items: ['🐶', '🐘', '🐠', '🦁'],  odd: '🐠'  },
  { q: 'Which one is NOT a vehicle?',  items: ['🚗', '🚌', '🎈', '🚲'],  odd: '🎈'  },
  { q: 'Which one is NOT a body part?',items: ['👁️', '👂', '🍌', '👃'],  odd: '🍌'  },
  { q: 'Which one is NOT clothing?',   items: ['👕', '🎒', '👖', '👟'],  odd: '🎒'  },
  { q: 'Which one is NOT round?',      items: ['⚽', '🍊', '📐', '🌕'],  odd: '📐'  },
  { q: 'Which one is a VEGETABLE?',    items: ['🍎', '🥕', '🍇', '🍌'],  odd: '🥕'  },
  { q: 'Which one is NOT hot?',        items: ['☀️', '🔥', '❄️', '🌋'],  odd: '❄️'  },
];

const ODD_TILE_COLORS = [
  'bg-rose-100 border-rose-300 text-rose-700',
  'bg-amber-100 border-amber-300 text-amber-700',
  'bg-emerald-100 border-emerald-300 text-emerald-700',
  'bg-sky-100 border-sky-300 text-sky-700',
];

export function SequenceGame({ onBack }: { onBack: () => void }) {
  const rounds = useRef(shuffleArray(ODD_ONE_OUT).slice(0, 8)).current;
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [gameOver, setGameOver] = useState(false);

  // useState (not useRef!) so tile changes trigger re-render — initialized with round 0 items
  const [tileOrder, setTileOrder] = useState<string[]>(() =>
    shuffleArray([...rounds[0].items])
  );

  useEffect(() => {
    if (!rounds[round]) return;
    setTileOrder(shuffleArray([...rounds[round].items]));
    setSelected(null);
    setResult(null);
  }, [round, rounds]);

  const cur = rounds[round];

  const handlePick = (item: string) => {
    if (result) return;
    setSelected(item);
    if (item === cur.odd) {
      setResult('correct');
      setScore(s => s + 1);
      setTimeout(() => {
        if (round + 1 >= rounds.length) setGameOver(true);
        else setRound(r => r + 1);
      }, 1100);
    } else {
      setResult('wrong');
      setTimeout(() => { setSelected(null); setResult(null); }, 900);
    }
  };

  if (gameOver) return <GameComplete title="Odd One Out! 🔍" score={score} total={rounds.length} onBack={onBack} />;
  if (!cur) return null;

  return (
    <div className="relative min-h-screen w-full font-sans overflow-hidden" style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 40%, #fcd34d 100%)' }}>

      {/* HUD */}
      <div className="flex items-center justify-between px-5 pt-6 pb-3 max-w-xl mx-auto">
        <button
          onPointerDown={onBack}
          className="flex items-center gap-2 px-4 py-2.5 bg-white/70 text-amber-900 font-black text-xs uppercase tracking-widest rounded-2xl border-2 border-amber-200 shadow-lg active:scale-95 [touch-action:none]"
        >
          <ArrowLeft size={15} /> Back
        </button>
        <div className="flex items-center gap-3">
          <div className="bg-white/70 px-4 py-2 rounded-xl border-2 border-amber-200 shadow">
            <span className="text-amber-900 font-black text-xs">{round + 1} / {rounds.length}</span>
          </div>
          <div className="bg-amber-500 px-4 py-2 rounded-xl border-2 border-amber-300 shadow-lg">
            <span className="text-white font-black text-sm">⭐ {score}</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-5 max-w-xl mx-auto mb-4">
        <div className="h-3 bg-amber-200 rounded-full overflow-hidden border border-amber-300">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${((round) / rounds.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="px-5 max-w-xl mx-auto mb-6">
        <div className="bg-white/80 border-2 border-amber-200 rounded-[2rem] px-6 py-5 shadow-xl text-center">
          <p className="text-2xl sm:text-3xl font-black text-amber-950 leading-tight">{cur.q}</p>
          <p className="text-amber-600 font-bold text-xs mt-2 uppercase tracking-widest">Tap the odd one out!</p>
        </div>
      </div>

      {/* 4 Tiles — 2×2 grid */}
      <div className="px-5 max-w-sm mx-auto grid grid-cols-2 gap-4">
        {tileOrder.map((item, i) => {
          const isSelected = selected === item;
          const isCorrect = isSelected && result === 'correct';
          const isWrong = isSelected && result === 'wrong';
          return (
            <button
              key={`${round}-${item}`}
              onPointerDown={() => handlePick(item)}
              className={`aspect-square rounded-[2rem] flex flex-col items-center justify-center border-4 shadow-lg transition-all [touch-action:none] active:scale-95
                ${isCorrect
                  ? 'bg-emerald-400 border-emerald-500 scale-105 shadow-emerald-300'
                  : isWrong
                  ? 'bg-rose-400 border-rose-500 scale-95'
                  : `${ODD_TILE_COLORS[i % ODD_TILE_COLORS.length]} hover:scale-105 hover:shadow-xl`
                }`}
            >
              <span className="text-6xl sm:text-7xl leading-none select-none">{item}</span>
              {isCorrect && <span className="mt-2 text-white font-black text-sm">✓ Odd one!</span>}
              {isWrong && <span className="mt-2 text-white font-black text-xs">✗ Try again</span>}
            </button>
          );
        })}
      </div>

      {/* Result overlay feedback — simple text, no animation */}
      {result === 'correct' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-emerald-500/90 text-white font-black text-4xl px-12 py-6 rounded-[2rem] shadow-2xl border-4 border-white">
            🎉 Correct!
          </div>
        </div>
      )}
    </div>
  );
}


/* ══════════════════════════════════════════════
   GAME 4: MEMORY MATCH 🧠
   Flip and match LKG vocabulary pairs
══════════════════════════════════════════════ */
const MEMORY_EMOJIS = [
  '🐶', '🐱', '🐸', '🍎', '🌟', '🎈',
  '🦋', '🌺', '🐠', '🎪', '🌈', '⚽',
];

export function MemoryMatchGame({ onBack }: { onBack: () => void }) {
  const emojis = MEMORY_EMOJIS.slice(0, 6);
  const totalPairs = emojis.length;

  const [cards, setCards] = useState<{ id: number; emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setCards(shuffleArray([...emojis, ...emojis].map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }))));
    speak('Find all the matching pairs!');
  }, []);

  const handleFlip = (id: number) => {
    if (locked || flippedIds.length >= 2) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    setCards(newCards);
    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [a, b] = newFlipped.map(fid => newCards.find(c => c.id === fid)!);
      setLocked(true);

      if (a.emoji === b.emoji) {
        speak('Match! Great job!');
        setTimeout(() => {
          const matched = newCards.map(c => c.emoji === a.emoji ? { ...c, matched: true } : c);
          setCards(matched);
          setFlippedIds([]);
          setLocked(false);
          const newMatchedCount = matchedCount + 1;
          setMatchedCount(newMatchedCount);
          if (newMatchedCount >= totalPairs) {
            setGameOver(true);
            speak('Amazing! You found all the pairs!');
          }
        }, 700);
      } else {
        setTimeout(() => {
          setCards(newCards.map(c => newFlipped.includes(c.id) ? { ...c, flipped: false } : c));
          setFlippedIds([]);
          setLocked(false);
        }, 1000);
      }
    }
  };

  if (gameOver) return <GameComplete title="Memory Arena! 🧠" score={totalPairs} total={totalPairs} onBack={onBack} extra={`Finished in ${moves} moves`} />;

  return (
    <GameShell title="🧠 Memory Match" subtitle="Find all the matching pairs!" round={matchedCount} total={totalPairs} score={matchedCount} onBack={onBack} bgFrom="from-rose-300" bgTo="to-pink-600">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="bg-white/30 backdrop-blur-md rounded-2xl px-5 py-2 border border-white/30 shadow-lg">
          <span className="text-white font-black text-sm uppercase tracking-widest">Moves: <span className="text-amber-300">{moves}</span></span>
        </div>
        <div className="bg-white/30 backdrop-blur-md rounded-2xl px-5 py-2 border border-white/30 shadow-lg">
          <span className="text-white font-black text-sm uppercase tracking-widest">Pairs: <span className="text-amber-300">{matchedCount}/{totalPairs}</span></span>
        </div>
      </div>

      {/* 4×3 Grid */}
      <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto">
        {cards.map(card => (
          <motion.button
            key={card.id}
            whileHover={!card.matched && !card.flipped ? { scale: 1.06 } : {}}
            whileTap={!card.matched && !card.flipped ? { scale: 0.93 } : {}}
            onPointerDown={() => handleFlip(card.id)}
            className={`aspect-square rounded-2xl flex items-center justify-center text-3xl sm:text-4xl transition-all border-4 shadow-2xl [touch-action:none]
              ${card.matched
                ? 'bg-emerald-400/40 border-emerald-300/50 opacity-50 cursor-default'
                : card.flipped
                ? 'bg-white/90 border-rose-300 shadow-xl'
                : 'bg-indigo-600 border-indigo-400 hover:bg-indigo-700 cursor-pointer'
              }`}
          >
            <AnimatePresence mode="wait">
              {card.flipped || card.matched ? (
                <motion.span key="face" initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} className="select-none">
                  {card.emoji}
                </motion.span>
              ) : (
                <motion.div key="back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center">
                  <Sparkles className="text-white/40" size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Reset */}
      <div className="flex justify-center mt-8">
        <button
          onPointerDown={() => {
            setCards(shuffleArray([...emojis, ...emojis].map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }))));
            setFlippedIds([]);
            setMoves(0);
            setMatchedCount(0);
            setLocked(false);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-white/30 backdrop-blur-md border-2 border-white/40 rounded-2xl text-white font-black text-xs uppercase tracking-widest hover:bg-white/40 active:scale-95 transition-all shadow-lg [touch-action:none]"
        >
          <RotateCcw size={14} /> Restart
        </button>
      </div>
    </GameShell>
  );
}
