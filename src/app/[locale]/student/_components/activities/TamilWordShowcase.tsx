'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MeiWordEntry {
  letter: string;      // Mei letter (க், ச், etc.)
  base: string;        // Without pulli (க, ச, etc.)
  vowel: string;       // Vowel used (ஆ, ஊ, etc.)
  uvForm: string;      // Uyir+Mei form (கா, சா, etc.)
  word: string;        // Full word
  emoji: string;
  color: string;
  isInline: boolean;   // true if letter appears inside word (for rare letters)
}

const MEI_WORDS_18: MeiWordEntry[] = [
  { letter: 'க்', base: 'க', vowel: 'ஆ', uvForm: 'கா', word: 'காக்கா', emoji: '🐦', color: '#f97316', isInline: false },
  { letter: 'ங்', base: 'ங', vowel: '', uvForm: '', word: 'அங்கம்', emoji: '💪', color: '#8B5CF6', isInline: true },
  { letter: 'ச்', base: 'ச', vowel: 'ஆ', uvForm: 'சா', word: 'சாப்பாடு', emoji: '🍽️', color: '#FACC15', isInline: false },
  { letter: 'ஞ்', base: 'ஞ', vowel: '', uvForm: '', word: 'அஞ்சல்', emoji: '📮', color: '#EC4899', isInline: true },
  { letter: 'ட்', base: 'ட', vowel: 'ஆ', uvForm: 'டா', word: 'டப்பா', emoji: '📦', color: '#0EA5E9', isInline: false },
  { letter: 'ண்', base: 'ண', vowel: '', uvForm: '', word: 'மண்', emoji: '🪨', color: '#92400E', isInline: true },
  { letter: 'த்', base: 'த', vowel: 'ஆ', uvForm: 'தா', word: 'தாத்தா', emoji: '👴', color: '#F43F5E', isInline: false },
  { letter: 'ந்', base: 'ந', vowel: 'ஆ', uvForm: 'நா', word: 'நாக்கு', emoji: '👅', color: '#F59E0B', isInline: false },
  { letter: 'ப்', base: 'ப', vowel: 'ஆ', uvForm: 'பா', word: 'பாம்பு', emoji: '🐍', color: '#60A5FA', isInline: false },
  { letter: 'ம்', base: 'ம', vowel: 'ஆ', uvForm: 'மா', word: 'மாமா', emoji: '👨', color: '#22C55E', isInline: false },
  { letter: 'ய்', base: 'ய', vowel: 'ஆ', uvForm: 'யா', word: 'யானை', emoji: '🐘', color: '#8B5CF6', isInline: false },
  { letter: 'ர்', base: 'ர', vowel: 'ஆ', uvForm: 'ரா', word: 'ராட்டினம்', emoji: '🎠', color: '#F43F5E', isInline: false },
  { letter: 'ல்', base: 'ல', vowel: 'அ', uvForm: 'ல', word: 'லட்டு', emoji: '🍡', color: '#F59E0B', isInline: false },
  { letter: 'வ்', base: 'வ', vowel: 'ஆ', uvForm: 'வா', word: 'வாகனம்', emoji: '🚗', color: '#EC4899', isInline: false },
  { letter: 'ழ்', base: 'ழ', vowel: '', uvForm: '', word: 'மழை', emoji: '🌧️', color: '#60A5FA', isInline: true },
  { letter: 'ள்', base: 'ள', vowel: '', uvForm: '', word: 'விளக்கு', emoji: '💡', color: '#22C55E', isInline: true },
  { letter: 'ற்', base: 'ற', vowel: '', uvForm: '', word: 'பறவை', emoji: '🕊️', color: '#0EA5E9', isInline: true },
  { letter: 'ன்', base: 'ன', vowel: '', uvForm: '', word: 'கண்', emoji: '👁️', color: '#F97316', isInline: true },
];

const ALL_WORDS = MEI_WORDS_18.map(e => ({ word: e.word, emoji: e.emoji }));
const DISTRACTOR_POOL = ALL_WORDS;

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function BoardLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      {[0.25, 0.5, 0.75].map((y) => (
        <line key={y} x1="4%" y1={`${y * 100}%`} x2="96%" y2={`${y * 100}%`}
          stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="6 5" />
      ))}
    </svg>
  );
}

function StarBurst() {
  const stars = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i, angle: (i / 12) * 360, delay: (i * 0.05).toFixed(2),
      color: ['#fbbf24', '#f97316', '#22c55e', '#06b6d4', '#a78bfa', '#f472b6'][i % 6],
    })), []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {stars.map(s => (
        <div key={s.id} className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
          style={{
            background: s.color,
            animation: `starShoot 0.6s ${s.delay}s ease-out forwards`,
            transformOrigin: '0 0',
          }} />
      ))}
      <style>{`@keyframes starShoot{0%{opacity:1;transform:rotate(0)translateX(0)scale(1)}100%{opacity:0;transform:rotate(var(--a))translateX(80px)scale(0)}}`}</style>
    </div>
  );
}

interface ShowcaseProps { entry: MeiWordEntry; index: number; total: number; onNext: () => void; }

function Showcase({ entry, index, total, onNext }: ShowcaseProps) {
  const [step, setStep] = useState(0);
  const maxStep = entry.isInline ? 4 : 5;

  useEffect(() => {
    setStep(0);
    const timers: NodeJS.Timeout[] = [];
    for (let i = 1; i <= maxStep; i++) {
      timers.push(setTimeout(() => setStep(i), i * 600));
    }
    return () => timers.forEach(clearTimeout);
  }, [entry.word, entry.isInline, maxStep]);

  return (
    <motion.div key={`show-${entry.word}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.28, ease: 'easeOut' }}
      className="flex flex-col items-center gap-4 w-full">
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}>
        <span className="text-xs font-black text-white/60 tracking-widest uppercase">மெய் → சொல்</span>
        <span className="text-xs font-bold text-white/40">{index + 1} / {total}</span>
      </div>

      <div className="relative w-full rounded-2xl overflow-hidden min-h-[280px]" style={{
        background: 'linear-gradient(160deg, #1a2e1a 0%, #0d1f0d 100%)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
        border: '3px solid #2d4a2d',
      }}>
        <BoardLines />
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\'%3E%3Crect width=\'4\' height=\'4\' fill=\'%23ffffff10\'/%3E%3Crect width=\'2\' height=\'2\' fill=\'%23ffffff08\'/%3E%3C/svg%3E")' }} />

        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-6 min-h-[260px]">
          {/* Chalk hand */}
          {step < maxStep && (
            <motion.div className="absolute top-3 left-3 text-lg opacity-50" animate={{ y: [0, -3, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
              ✏️
            </motion.div>
          )}

          {entry.isInline ? (
            <>
              {/* Step 1: Show Mei letter */}
              {step >= 1 && (
                <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }} className="flex flex-col items-center gap-2">
                  <span className="text-white/40 text-[10px] font-bold tracking-widest">மெய் எழுத்து</span>
                  <span className="font-black text-white" style={{
                    fontSize: 'clamp(3rem, 14vw, 5.5rem)',
                    textShadow: `0 0 30px ${entry.color}60`,
                    fontFamily: '"Noto Sans Tamil", "Latha", sans-serif',
                  }}>
                    {entry.letter}
                  </span>
                </motion.div>
              )}

              {/* Step 2: Arrow */}
              {step >= 2 && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="my-2 text-white/30 text-sm">
                  ↓
                </motion.div>
              )}

              {/* Step 3: Word */}
              {step >= 3 && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-1">
                  <span className="text-white/40 text-[10px] font-bold tracking-widest">{entry.letter} உள்ள சொல்</span>
                  <div className="flex items-center gap-2">
                    {entry.word.split('').map((ch, i) => (
                      <span key={i} className="font-black inline-block"
                        style={{
                          fontSize: 'clamp(1.8rem, 9vw, 3.5rem)',
                          color: entry.word[i] === entry.letter[0] ? entry.color : '#fff',
                          textShadow: entry.word[i] === entry.letter[0] ? `0 0 20px ${entry.color}80` : 'none',
                          fontFamily: '"Noto Sans Tamil", "Latha", sans-serif',
                        }}>
                        {ch}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Emoji */}
              {step >= 4 && (
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                  className="mt-4 flex items-center gap-3 px-5 py-2.5 rounded-xl"
                  style={{ background: `${entry.color}22`, border: `1px solid ${entry.color}44` }}>
                  <span className="text-3xl sm:text-4xl">{entry.emoji}</span>
                  <span className="text-base sm:text-lg font-bold text-white/80" style={{ fontFamily: '"Noto Sans Tamil", sans-serif' }}>
                    {entry.word}
                  </span>
                </motion.div>
              )}
            </>
          ) : (
            <>
              {/* Step 1: Mei letter */}
              {step >= 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                  <span className="text-white/30 text-[9px] font-bold tracking-widest mb-0.5">மெய்</span>
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="font-black text-white/80 line-through decoration-red-400/60 decoration-4"
                    style={{
                      fontSize: 'clamp(2rem, 10vw, 4rem)',
                      fontFamily: '"Noto Sans Tamil", "Latha", sans-serif',
                    }}>
                    {entry.letter}
                  </motion.span>
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                    className="text-white/40 text-xs mt-0.5">(pulli நீக்கு)</motion.span>
                </motion.div>
              )}

              {/* Step 2: Base + vowel → UV form */}
              {step >= 2 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="my-1 flex items-center gap-3 flex-wrap justify-center">
                  <span className="font-black text-white" style={{
                    fontSize: 'clamp(2rem, 10vw, 4rem)',
                    fontFamily: '"Noto Sans Tamil", "Latha", sans-serif',
                  }}>
                    {entry.base}
                  </span>
                  <span className="text-white/30 text-lg">+</span>
                  <span className="font-black text-white/70" style={{
                    fontSize: 'clamp(1.5rem, 7vw, 3rem)',
                    fontFamily: '"Noto Sans Tamil", "Latha", sans-serif',
                  }}>
                    {entry.vowel}
                  </span>
                  <span className="text-white/30 text-lg">=</span>
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="font-black inline-block"
                    style={{
                      fontSize: 'clamp(2.2rem, 11vw, 4.5rem)',
                      color: entry.color,
                      textShadow: `0 0 30px ${entry.color}60`,
                      fontFamily: '"Noto Sans Tamil", "Latha", sans-serif',
                    }}>
                    {entry.uvForm}
                  </motion.span>
                </motion.div>
              )}

              {/* Step 3: Word formation */}
              {step >= 3 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="my-1">
                  <span className="text-white/30 text-[9px] font-bold tracking-widest block text-center">சொல்</span>
                  <div className="flex items-center gap-1 justify-center flex-wrap mt-1">
                    {(() => {
                      const parts = entry.word.split(entry.uvForm);
                      return (
                        <>
                          <span className="font-black" style={{
                            fontSize: 'clamp(1.8rem, 9vw, 3.5rem)',
                            color: entry.color,
                            textShadow: `0 0 20px ${entry.color}60`,
                            fontFamily: '"Noto Sans Tamil", "Latha", sans-serif',
                          }}>
                            {entry.uvForm}
                          </span>
                          {parts.length > 1 && (
                            <span className="font-black text-white" style={{
                              fontSize: 'clamp(1.8rem, 9vw, 3.5rem)',
                              fontFamily: '"Noto Sans Tamil", "Latha", sans-serif',
                            }}>
                              {parts[1]}
                            </span>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Full word */}
              {step >= 4 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="my-1 text-white/30 text-xs font-bold">=</motion.div>
              )}

              {/* Step 4/5: Word with emoji */}
              {step >= (entry.isInline ? 4 : 5) && (
                <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                  className="mt-3 flex items-center gap-3 px-5 py-2.5 rounded-xl"
                  style={{ background: `${entry.color}22`, border: `1px solid ${entry.color}44` }}>
                  <span className="text-3xl sm:text-4xl">{entry.emoji}</span>
                  <span className="text-lg sm:text-xl font-black" style={{
                    color: '#fff',
                    textShadow: `0 0 20px ${entry.color}60`,
                    fontFamily: '"Noto Sans Tamil", "Latha", sans-serif',
                  }}>
                    {entry.word}
                  </span>
                </motion.div>
              )}

              {/* Blinking cursor at the end */}
              {step < maxStep && (
                <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-0.5 h-8 bg-white/60 ml-1 align-middle" />
              )}
            </>
          )}
        </div>
      </div>

      {step >= maxStep && (
        <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.96 }} onClick={onNext}
          className="w-full max-w-xs py-3 rounded-2xl font-black text-white text-sm sm:text-base tracking-wide shadow-xl transition-all active:scale-95"
          style={{
            background: `linear-gradient(135deg, ${entry.color}, ${entry.color}bb)`,
            boxShadow: `0 4px 24px ${entry.color}60, 0 2px 0 ${entry.color}40`,
            border: `2px solid ${entry.color}80`,
          }}>
          வினாடி வினா கேளுங்கள்! 🎯
        </motion.button>
      )}
    </motion.div>
  );
}

interface QuizOption { id: string; word: string; emoji: string; correct: boolean; }

interface QuizProps { entry: MeiWordEntry; onCorrect: () => void; }

function Quiz({ entry, onCorrect }: QuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [wrongShake, setWrongShake] = useState(false);

  const options = useMemo<QuizOption[]>(() => {
    const wrong = DISTRACTOR_POOL
      .filter(d => d.word !== entry.word)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map((d, i) => ({ id: `w${i}`, word: d.word, emoji: d.emoji, correct: false }));
    return shuffleArray([
      { id: 'correct', word: entry.word, emoji: entry.emoji, correct: true },
      ...wrong,
    ]);
  }, [entry]);

  const handleTap = useCallback((opt: QuizOption) => {
    if (selected) return;
    setSelected(opt.id);
    if (opt.correct) setTimeout(onCorrect, 700);
    else {
      setWrongShake(true);
      setTimeout(() => { setWrongShake(false); setSelected(null); }, 600);
    }
  }, [selected, onCorrect]);

  return (
    <motion.div key={`quiz-${entry.word}`} initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
      className="flex flex-col items-center gap-4 w-full">
      <div className="relative w-full rounded-2xl overflow-hidden px-4 py-5 flex flex-col items-center gap-2"
        style={{ background: 'linear-gradient(160deg, #1a2e1a 0%, #0d1f0d 100%)', border: '3px solid #2d4a2d', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
        <BoardLines />
        <p className="relative z-10 text-white/60 text-xs font-bold tracking-widest uppercase">எந்த சொல்?</p>
        <span className="relative z-10 font-black" style={{
          fontSize: 'clamp(2.5rem, 12vw, 4.5rem)',
          color: entry.color,
          textShadow: `0 0 24px ${entry.color}80`,
          fontFamily: '"Noto Sans Tamil", "Latha", sans-serif',
        }}>
          {entry.letter}
        </span>
        <p className="relative z-10 text-white/40 text-[10px] font-bold tracking-wider">
          {entry.isInline ? `'${entry.letter}' உள்ள சொல் எது?` : `'${entry.uvForm || entry.base}' உள்ள சொல் எது?`}
        </p>
      </div>
      <motion.div animate={wrongShake ? { x: [0, -8, 8, -5, 5, 0] } : {}} transition={{ duration: 0.3 }}
        className="grid grid-cols-3 gap-2.5 w-full">
        {options.map(opt => {
          const isSelected = selected === opt.id;
          const isWin = isSelected && opt.correct;
          const isLose = isSelected && !opt.correct;
          return (
            <button key={opt.id} onClick={() => handleTap(opt)}
              className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl transition-all active:scale-95 relative overflow-hidden"
              style={{
                background: isWin ? 'rgba(34,197,94,0.25)' : isLose ? 'rgba(239,68,68,0.25)' : 'rgba(255,255,255,0.08)',
                border: isWin ? '2px solid rgba(34,197,94,0.6)' : isLose ? '2px solid rgba(239,68,68,0.5)' : '1.5px solid rgba(255,255,255,0.12)',
              }}>
              {isWin && <div className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-[9px] font-black shadow">✓</div>}
              <span className="text-3xl sm:text-4xl leading-none">{opt.emoji}</span>
              <span className="text-[11px] sm:text-xs font-black" style={{ color: isWin ? '#4ade80' : isLose ? '#f87171' : 'rgba(255,255,255,0.7)', fontFamily: '"Noto Sans Tamil", sans-serif' }}>
                {opt.word}
              </span>
            </button>
          );
        })}
      </motion.div>
      {!selected && <p className="text-white/30 text-[10px] font-bold tracking-wider text-center">சரியான படத்தை தொடுங்கள் 👆</p>}
    </motion.div>
  );
}

function WordDone({ entry, onNext, isLast }: { entry: MeiWordEntry; onNext: () => void; isLast: boolean }) {
  return (
    <motion.div key={`done-${entry.word}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="flex flex-col items-center gap-4 w-full relative">
      <StarBurst />
      <div className="flex flex-col items-center gap-3 px-6 py-6 rounded-2xl w-full" style={{ background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.12)' }}>
        <span className="text-5xl sm:text-6xl">{entry.emoji}</span>
        <p className="text-xl sm:text-2xl font-black text-white text-center" style={{ fontFamily: '"Noto Sans Tamil", sans-serif' }}>
          {entry.word}
        </p>
        <p className="text-xs text-white/50 font-bold tracking-wider text-center">
          "{entry.letter}" → "{entry.word}" ⭐
        </p>
      </div>
      <motion.button whileTap={{ scale: 0.96 }} onClick={onNext}
        className="w-full max-w-xs py-3 rounded-2xl font-black text-white text-sm sm:text-base tracking-wide shadow-xl active:scale-95"
        style={{
          background: isLast ? 'linear-gradient(135deg, #f97316, #ec4899)' : `linear-gradient(135deg, ${entry.color}, ${entry.color}bb)`,
          boxShadow: `0 4px 24px ${entry.color}50`,
        }}>
        {isLast ? 'முடிந்தது! 🎉' : 'அடுத்த மெய் →'}
      </motion.button>
    </motion.div>
  );
}

function AllDone({ entries, onComplete }: { entries: MeiWordEntry[]; onComplete: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-5 w-full">
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="text-6xl sm:text-7xl">
        🏆
      </motion.div>
      <div className="flex flex-col items-center gap-3 px-6 py-5 rounded-2xl w-full text-center" style={{ background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.15)' }}>
        <p className="text-lg sm:text-xl font-black text-white" style={{ fontFamily: '"Noto Sans Tamil", sans-serif' }}>
          அட்டகாசம்! 🎊
        </p>
        <p className="text-xs text-white/50 font-bold tracking-wide" style={{ fontFamily: '"Noto Sans Tamil", sans-serif' }}>
          18 மெய் எழுத்துக்கள் → 18 சொற்கள்!
        </p>
        <div className="flex items-center gap-2 mt-2 flex-wrap justify-center max-w-sm">
          {entries.map((e, i) => (
            <motion.span key={e.word} initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 18 }}
              className="text-lg" title={e.word}>
              {e.emoji}
            </motion.span>
          ))}
        </div>
      </div>
      <motion.button whileTap={{ scale: 0.96 }} onClick={onComplete}
        className="w-full max-w-xs py-3.5 rounded-2xl font-black text-white text-base tracking-wide shadow-xl active:scale-95"
        style={{ background: 'linear-gradient(135deg, #f97316, #ec4899, #6366f1)', boxShadow: '0 4px 28px rgba(249,115,22,0.5)' }}>
        அடுத்த பாடம் ➡️
      </motion.button>
    </motion.div>
  );
}

type Phase = 'showcase' | 'quiz' | 'word-done' | 'all-done';

type Props = {
  config?: Record<string, unknown>;
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

export default function TamilWordShowcase({ config, onComplete }: Props) {
  const startTime = useRef(Date.now());
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('showcase');
  const [scores, setScores] = useState<Record<string, boolean>>({});

  const entry = MEI_WORDS_18[wordIndex];
  const isLast = wordIndex === MEI_WORDS_18.length - 1;

  const goToQuiz = useCallback(() => setPhase('quiz'), []);
  const onCorrect = useCallback(() => {
    setScores(prev => ({ ...prev, [entry.word]: true }));
    setPhase('word-done');
  }, [entry.word]);

  const goNext = useCallback(() => {
    if (isLast) setPhase('all-done');
    else { setWordIndex(i => i + 1); setPhase('showcase'); }
  }, [isLast]);

  const handleComplete = useCallback(() => {
    const correct = Object.values(scores).filter(Boolean).length;
    onComplete({
      score: correct, max_score: MEI_WORDS_18.length,
      completion_data: { scores, words_learned: Object.keys(scores) },
      time_taken_seconds: Math.round((Date.now() - startTime.current) / 1000),
    });
  }, [onComplete, scores]);

  return (
    <div className="flex flex-col items-center gap-3 px-3 sm:px-5 pb-4 sm:pb-6 select-none w-full">
      <div className="flex items-center gap-1.5 flex-wrap justify-center px-2">
        {MEI_WORDS_18.map((e, i) => (
          <div key={e.word} className="transition-all duration-300" style={{
            width: i === wordIndex ? 16 : 6, height: 6, borderRadius: 99,
            background: scores[e.word] ? '#22c55e' : i === wordIndex ? e.color : 'rgba(255,255,255,0.2)',
          }} />
        ))}
      </div>
      <AnimatePresence mode="wait">
        {phase === 'showcase' && <Showcase key={`show-${wordIndex}`} entry={entry} index={wordIndex} total={MEI_WORDS_18.length} onNext={goToQuiz} />}
        {phase === 'quiz' && <Quiz key={`quiz-${wordIndex}`} entry={entry} onCorrect={onCorrect} />}
        {phase === 'word-done' && <WordDone key={`done-${wordIndex}`} entry={entry} onNext={goNext} isLast={isLast} />}
        {phase === 'all-done' && <AllDone key="all-done" entries={MEI_WORDS_18} onComplete={handleComplete} />}
      </AnimatePresence>
    </div>
  );
}
