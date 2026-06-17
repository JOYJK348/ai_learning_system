'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, Volume2, Play, RotateCcw } from 'lucide-react';
import { audioEngine } from '@/core/utils/audio';
import { type Lesson } from '@/core/services/studentApi';
import { getLessonVisuals, buildTutorial, type TutorialStep } from '@/core/data/curriculum';

/* ─────────── TYPES ─────────── */
type QuizQuestion = {
  question: string;
  correctWord: string;
  correctEmoji: string;
  options: { word: string; emoji: string }[];
};

/* ─────────── ANIMATION VARIANTS ─────────── */
const animVariants: Record<string, object> = {
  bounce: { y: [0, -30, 0], transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' } },
  pop: { scale: [0.8, 1.1, 1], transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' } },
  spin: { rotate: [0, 15, -15, 0], transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } },
  wiggle: { rotate: [-5, 5, -5], transition: { duration: 0.5, repeat: Infinity } },
  float: { y: [0, -15, 0], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } },
  pulse: { scale: [1, 1.15, 1], transition: { duration: 1, repeat: Infinity, ease: 'easeInOut' } },
  swing: { rotate: [-8, 8, -8], transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } },
  shake: { x: [-6, 6, -6, 6, 0], transition: { duration: 0.5, repeat: Infinity } },
  jump: { y: [0, -40, 0], transition: { duration: 0.7, repeat: Infinity, ease: 'easeOut' } },
};

function StepEmoji({ emoji, anim }: { emoji: string; anim?: string }) {
  const variant = anim && animVariants[anim] ? animVariants[anim] : {};
  return (
    <motion.div
      animate={variant as any}
      className="text-[5rem] sm:text-[6rem] drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)]"
    >
      {emoji}
    </motion.div>
  );
}

function PhonicsWordCard({ word, family, emoji }: { word: string; family?: string; emoji: string }) {
  if (!family) {
    return (
      <div className="flex flex-col items-center gap-2">
        <span className="text-4xl sm:text-5xl">{emoji}</span>
        <div className="bg-white/40 backdrop-blur-md rounded-xl px-4 sm:px-6 py-2 border-2 border-white/50 shadow-lg">
          <span className="text-3xl sm:text-4xl font-black text-indigo-950 tracking-wider">{word}</span>
        </div>
      </div>
    );
  }

  const fi = word.toLowerCase().indexOf(family);
  const prefix = fi > 0 ? word.slice(0, fi) : '';
  const famPart = fi >= 0 ? word.slice(fi, fi + family.length) : '';

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-4xl sm:text-5xl"
      >
        {emoji}
      </motion.div>
      <div className="bg-white/40 backdrop-blur-md rounded-xl px-4 sm:px-6 py-2 border-2 border-white/50 shadow-lg flex items-center gap-0">
        <span className="text-3xl sm:text-4xl font-black tracking-wider">
          {prefix && <span className="text-indigo-500">{prefix}</span>}
          {famPart && (
            <span className="text-amber-400 bg-amber-500/20 px-1 rounded-lg drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
              {famPart}
            </span>
          )}
        </span>
      </div>
      <div className="bg-amber-400/30 backdrop-blur-sm rounded-full px-4 py-1 border border-white/40">
        <span className="text-sm sm:text-base font-black text-amber-700 tracking-wider">'{family}'</span>
      </div>
    </div>
  );
}

/* ─────────── QUIZ GENERATION HELPERS ─────────── */
function shuffleQuiz<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateQuiz(steps: TutorialStep[]): QuizQuestion[] {
  const wordSteps = steps.filter((s): s is TutorialStep & { word: string; emoji: string } => !!s.word && !!s.emoji);
  if (wordSteps.length < 2) return [];

  const families = new Map<string, { word: string; emoji: string }[]>();
  for (const s of wordSteps) {
    const f = s.family || s.word;
    if (!families.has(f)) families.set(f, []);
    families.get(f)!.push({ word: s.word, emoji: s.emoji });
  }

  const questions: QuizQuestion[] = [];

  let maxFam = '';
  let maxWords: { word: string; emoji: string }[] = [];
  for (const [f, words] of families) {
    if (words.length > maxWords.length) {
      maxFam = f;
      maxWords = words;
    }
  }

  if (maxWords.length >= 2) {
    const selected = shuffleQuiz(maxWords).slice(0, Math.min(4, maxWords.length));
    const otherFamilyWords: { word: string; emoji: string }[] = [];
    for (const [f, words] of families) {
      if (f !== maxFam) otherFamilyWords.push(...words);
    }

    const singleFamily = otherFamilyWords.length === 0;

    for (const correct of selected) {
      let wrong: { word: string; emoji: string }[];
      if (singleFamily) {
        wrong = shuffleQuiz(maxWords.filter(w => w.word !== correct.word)).slice(0, 2);
      } else {
        wrong = shuffleQuiz(otherFamilyWords).slice(0, 2);
      }
      const options = shuffleQuiz([
        { word: correct.word, emoji: correct.emoji },
        ...wrong,
      ]);
      questions.push({
        question: singleFamily
          ? `Where is ${correct.word}?`
          : maxFam.length <= 3
            ? `Find the word with '${maxFam}'!`
            : `Find the word '${correct.word}'!`,
        correctWord: correct.word,
        correctEmoji: correct.emoji,
        options,
      });
    }
  }

  const allOpts = shuffleQuiz(wordSteps.map(w => ({ word: w.word, emoji: w.emoji })));
  if (allOpts.length >= 3) {
    const pick = allOpts[0];
    if (pick) {
      const wrong = shuffleQuiz(allOpts.filter(o => o.word !== pick.word)).slice(0, 2);
      questions.push({
        question: `Where is ${pick.word}?`,
        correctWord: pick.word,
        correctEmoji: pick.emoji,
        options: shuffleQuiz([pick, ...wrong]),
      });
    }
  }

  return shuffleQuiz(questions).slice(0, 5);
}

/* ─────────── MAIN COMPONENT ─────────── */
export default function TutorialPlayer({
  subjectName,
  lesson,
  onClose,
  onComplete,
  studentName,
}: {
  subjectName: string;
  lesson: Lesson;
  onClose: () => void;
  onComplete: () => void;
  studentName?: string;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [quizPhase, setQuizPhase] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [wrongTap, setWrongTap] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const [dragStart, setDragStart] = useState(0);

  const visuals = getLessonVisuals(subjectName, lesson.title);
  const steps = useMemo(() => buildTutorial(subjectName, lesson.title, studentName), [subjectName, lesson.title, studentName]);
  const step = steps[stepIndex];
  const quizQuestions = useMemo(() => generateQuiz(steps), [steps]);

  useEffect(() => {
    if (!quizPhase && !completed && step?.speak) {
      const timer = setTimeout(() => {
        audioEngine?.speak(step.speak);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [stepIndex, step?.speak, quizPhase, completed]);

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      if (quizQuestions.length > 0) {
        setQuizPhase(true);
        setQuizIndex(0);
        setQuizScore(0);
        audioEngine?.speak("Now let's play a quick game! Tap the right picture!");
      } else {
        setCompleted(true);
        audioEngine?.speak('Great job! You finished the lesson!');
      }
    }
  };

  const handleQuizAnswer = (correct: boolean) => {
    if (correct) {
      const newScore = quizScore + 1;
      setQuizScore(newScore);
      if (quizIndex < quizQuestions.length - 1) {
        setQuizIndex(quizIndex + 1);
        setWrongTap(false);
      } else {
        setQuizDone(true);
        const msg = newScore >= quizQuestions.length * 0.6
          ? `You got ${newScore} out of ${quizQuestions.length}! Amazing! ⭐`
          : `Good try! You got ${newScore} out of ${quizQuestions.length}! Keep learning! 🌟`;
        audioEngine?.speak(msg);
      }
    } else {
      setWrongTap(true);
      setTimeout(() => setWrongTap(false), 500);
    }
  };

  const handleQuizFinish = () => {
    onComplete();
    onClose();
  };

  const handlePrev = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  const handleDragStart = (x: number) => setDragStart(x);

  const handleDragEnd = (x: number) => {
    const dx = x - dragStart;
    if (Math.abs(dx) > 50) {
      if (dx > 0) handlePrev();
      else handleNext();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const handleMouseUp = (e: React.MouseEvent) => handleDragEnd(e.clientX);
  const handleTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => handleDragEnd(e.changedTouches[0].clientX);

  const handleReplay = () => setStepIndex(0);

  const handleFinish = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[200] bg-gradient-to-br from-sky-300 via-sky-400 to-blue-500 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 bg-white/20 backdrop-blur-md border-b border-white/20">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 text-indigo-950 font-black px-4 py-2 bg-white/60 border border-white/80 rounded-2xl shadow-lg hover:bg-white/80 transition-all"
        >
          <ArrowLeft size={18} /> Back
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => step?.speak && audioEngine?.speak(step.speak)}
            className="p-3 bg-white/60 border border-white/80 rounded-full shadow-lg hover:bg-white/80 transition-all"
          >
            <Volume2 size={22} className="text-indigo-950" />
          </button>
        </div>
      </div>

      {/* Progress dots */}
      {!quizPhase && !completed && (
        <div className="flex items-center justify-center gap-2 py-4">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-3 rounded-full transition-all duration-300 ${
                idx === stepIndex ? `w-8 bg-white shadow-lg` : idx < stepIndex ? 'w-3 bg-emerald-300' : 'w-3 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}

      {/* Quiz header */}
      {quizPhase && !quizDone && (
        <div className="flex items-center justify-center gap-2 py-4">
          <span className="text-sm font-black text-white/70 bg-white/20 rounded-full px-4 py-1">
            Quiz {quizIndex + 1} / {quizQuestions.length} {quizScore > 0 && `⭐${quizScore}`}
          </span>
        </div>
      )}

      {/* Main content */}
      <div
        className="flex-1 min-h-0 flex flex-col items-center justify-center px-4 sm:px-8 pb-4 select-none overflow-hidden"
        onTouchStart={!quizPhase && !completed ? handleTouchStart : undefined}
        onTouchEnd={!quizPhase && !completed ? handleTouchEnd : undefined}
        onMouseDown={!quizPhase && !completed ? handleMouseDown : undefined}
        onMouseUp={!quizPhase && !completed ? handleMouseUp : undefined}
      >
        <AnimatePresence mode="wait">
          {!completed && !quizPhase && step && (
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-3xl"
            >
              <div className={`relative bg-white/30 backdrop-blur-2xl border-4 border-white/50 rounded-[3rem] p-4 sm:p-6 shadow-2xl overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${visuals.color} opacity-20`} />
                <div className="relative z-10 flex flex-col items-center text-center gap-2 sm:gap-3">
                  <h2 className="text-xl sm:text-2xl font-black text-indigo-950 leading-tight">
                    {step.title}
                  </h2>

                  <div className="w-full min-h-0 max-h-[200px] sm:max-h-[280px] flex items-center justify-center">
                    {step.word ? (
                      <PhonicsWordCard word={step.word} family={step.family} emoji={step.emoji} />
                    ) : (
                      <StepEmoji emoji={step.emoji} anim={step.anim} />
                    )}
                  </div>

                  <p className="text-sm sm:text-lg font-bold text-indigo-900/80 line-clamp-2">
                    {step.speak}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── QUIZ PHASE ─── */}
          {quizPhase && !quizDone && quizQuestions[quizIndex] && (
            <motion.div
              key={`quiz-${quizIndex}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="w-full max-w-lg"
            >
              <div className="bg-white/30 backdrop-blur-2xl border-4 border-white/50 rounded-[3rem] p-6 sm:p-8 shadow-2xl text-center">
                <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 mb-2">
                  🤔 {quizQuestions[quizIndex].question}
                </h2>
                <motion.div
                  animate={wrongTap ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-xs mx-auto mt-6">
                    {quizQuestions[quizIndex].options.map((opt: { word: string; emoji: string }) => (
                      <motion.button
                        key={opt.word}
                        whileHover={{ scale: 1.08, y: -4 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => handleQuizAnswer(opt.word === quizQuestions[quizIndex].correctWord)}
                        className="flex flex-col items-center gap-1 sm:gap-2 p-3 sm:p-4 rounded-2xl bg-white/25 backdrop-blur-md border-2 border-white/40 hover:bg-white/35 transition-all shadow-lg"
                      >
                        <span className="text-5xl sm:text-6xl">{opt.emoji}</span>
                        <span className="text-[10px] sm:text-xs font-black text-white/80 uppercase tracking-wider">{opt.word}</span>
                      </motion.button>
                    ))}
                  </div>
                  {wrongTap && (
                    <p className="text-sm font-black text-yellow-200 mt-4">🙅 Tap the right one!</p>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ─── QUIZ DONE ─── */}
          {quizPhase && quizDone && (
            <motion.div
              key="quizdone"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-lg"
            >
              <div className="bg-white/40 backdrop-blur-2xl border-4 border-white/60 rounded-[3rem] p-8 sm:p-12 shadow-2xl text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-8xl sm:text-9xl mb-4"
                >
                  {quizScore >= Math.ceil(quizQuestions.length * 0.6) ? '🏆' : '🌟'}
                </motion.div>
                <h2 className="text-3xl sm:text-4xl font-black text-indigo-950 mb-2">Quiz done!</h2>
                <p className="text-xl font-bold text-indigo-900/70 mb-6">
                  {quizScore} / {quizQuestions.length} correct
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => { setQuizIndex(0); setQuizScore(0); setQuizDone(false); setWrongTap(false); }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/70 border-2 border-white/80 rounded-2xl text-indigo-950 font-black shadow-xl hover:bg-white/90 transition-all"
                  >
                    <RotateCcw size={20} /> Again
                  </button>
                  <button
                    onClick={handleQuizFinish}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-2xl font-black shadow-xl hover:bg-emerald-600 transition-all"
                  >
                    <CheckCircle size={20} /> Done
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── COMPLETED ─── */}
          {completed && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-lg"
            >
              <div className="bg-white/40 backdrop-blur-2xl border-4 border-white/60 rounded-[3rem] p-8 sm:p-12 shadow-2xl text-center">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-8xl sm:text-9xl mb-6"
                >
                  🏆
                </motion.div>
                <h2 className="text-4xl sm:text-5xl font-black text-indigo-950 mb-4">You did it!</h2>
                <p className="text-xl sm:text-2xl font-bold text-indigo-900/70 mb-8">
                  You finished learning {lesson.title}!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={handleReplay}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/70 border-2 border-white/80 rounded-2xl text-indigo-950 font-black shadow-xl hover:bg-white/90 transition-all"
                  >
                    <RotateCcw size={22} /> Play Again
                  </button>
                  <button
                    onClick={handleFinish}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black shadow-xl hover:bg-emerald-600 transition-all"
                  >
                    <CheckCircle size={22} /> Done
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      {!quizPhase && !completed && (
        <div className="px-4 sm:px-8 pb-8 pt-2">
          <div className="max-w-3xl mx-auto flex items-center gap-4">
            <button
              onClick={handlePrev}
              disabled={stepIndex === 0}
              className={`px-6 py-4 rounded-2xl font-black shadow-lg transition-all ${
                stepIndex === 0
                  ? 'bg-white/30 text-indigo-900/30 cursor-not-allowed'
                  : 'bg-white/60 text-indigo-950 hover:bg-white/80'
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black shadow-xl text-white transition-all bg-gradient-to-r ${visuals.color} hover:brightness-110 active:scale-95`}
            >
              {stepIndex === steps.length - 1 ? (
                <><CheckCircle size={24} /> Quiz Time!</>
              ) : (
                <><Play size={24} /> Next</>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
