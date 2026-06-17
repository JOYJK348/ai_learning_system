import codecs

path = 'D:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/Learn/page.tsx'

with codecs.open(path, 'r', 'utf-8') as f:
    content = f.read()

start_idx = content.find("const TutorialPlayer = React.memo(function TutorialPlayer({")
end_idx = content.find("const GUIDE_COLORS: Record<string, string> = {")

if start_idx == -1 or end_idx == -1:
    print("Could not find boundaries!")
else:
    # Need to keep the }); before GUIDE_COLORS
    end_idx = content.rfind("});", 0, end_idx) + 4
    
    new_tutorial_player = """const TutorialPlayer = React.memo(function TutorialPlayer({
  lesson,
  onClose,
  onComplete,
  studentName,
}: {
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
  const [showContent, setShowContent] = useState(true);
  const [showPraise, setShowPraise] = useState(false);
  const [praiseText, setPraiseText] = useState('');
  const [owlCelebrate, setOwlCelebrate] = useState(false);
  const [showGuideHint, setShowGuideHint] = useState(false);
  const visuals = getLessonVisuals(lesson.title);
  const steps = useMemo(() => buildTutorial(lesson.title, studentName), [lesson.title, studentName]);
  const step = steps[stepIndex];
  const quizQuestions = useMemo(() => generateQuiz(steps), [steps]);
  const guideMsg = useMemo(() => getGuideMessage(step.title), [step.title]);
  const isTraceStep = step.shapePath && step.title.startsWith('Trace');
  // Detect Tamil lesson by checking for Tamil Unicode range
  const isTamil = useMemo(() => /[\\u0B80-\\u0BFF]/.test(lesson.title), [lesson.title]);

  useEffect(() => {
    if (!quizPhase && !completed) {
      const timer = setTimeout(() => {
        audioEngine?.speak(step.speak);
        setShowGuideHint(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [stepIndex, step.speak, quizPhase, completed]);

  const triggerPraise = useCallback(() => {
    const line = PRAISE_LINES[Math.floor(Math.random() * PRAISE_LINES.length)];
    setPraiseText(line);
    setShowPraise(true);
    setOwlCelebrate(true);
    setTimeout(() => { setShowPraise(false); setOwlCelebrate(false); }, 1200);
    audioEngine?.speak(line);
  }, []);

  const handleNext = useCallback(() => {
    if (stepIndex < steps.length - 1) {
      triggerPraise();
      setTimeout(() => {
        setShowContent(false);
        setTimeout(() => { setStepIndex(i => i + 1); setShowContent(true); setShowGuideHint(false); }, 100);
      }, 500);
    } else {
      if (quizQuestions.length > 0) {
        setQuizPhase(true);
        setQuizIndex(0);
        setQuizScore(0);
        audioEngine?.speak(isTamil ? "இப்போது ஒரு சிறிய விளையாட்டை விளையாடுவோம்! சரியான படத்தைத் தட்டவும்!" : "Now let's play a quick game! Tap the right picture!");
      } else {
        setCompleted(true);
        audioEngine?.speak(isTamil ? 'சிறப்பு! நீங்கள் பாடத்தை முடித்துவிட்டீர்கள்!' : 'Great job! You finished the lesson!');
      }
    }
  }, [stepIndex, steps.length, quizQuestions.length, triggerPraise, isTamil]);

  const handleQuizAnswer = useCallback((correct: boolean) => {
    if (correct) {
      const newScore = quizScore + 1;
      setQuizScore(newScore);
      if (quizIndex < quizQuestions.length - 1) {
        setQuizIndex(i => i + 1);
        setWrongTap(false);
      } else {
        setQuizDone(true);
        const msg = newScore >= quizQuestions.length * 0.6
          ? (isTamil ? `${quizQuestions.length}-ல் ${newScore} பெற்றீர்கள்! அற்புதம்! ⭐` : `You got ${newScore} out of ${quizQuestions.length}! Amazing! ⭐`)
          : (isTamil ? `நல்ல முயற்சி! ${quizQuestions.length}-ல் ${newScore} பெற்றீர்கள்! தொடர்ந்து படியுங்கள்! 🌟` : `Good try! You got ${newScore} out of ${quizQuestions.length}! Keep learning! 🌟`);
        audioEngine?.speak(msg);
      }
    } else {
      setWrongTap(true);
      setTimeout(() => setWrongTap(false), 500);
    }
  }, [quizScore, quizIndex, quizQuestions.length, isTamil]);

  const handlePrev = () => {
    if (stepIndex > 0) {
      setShowContent(false);
      setTimeout(() => { setStepIndex(i => i - 1); setShowContent(true); setShowGuideHint(false); }, 100);
    }
  };

  const handleReplay = () => {
    setCompleted(false);
    setQuizPhase(false);
    setQuizDone(false);
    setStepIndex(0);
    setShowContent(true);
    setQuizScore(0);
    setQuizIndex(0);
  };

  const handleFinish = async () => {
    try { await studentApi.completeLesson(lesson.id, { score: quizDone ? Math.round((quizScore / quizQuestions.length) * 100) : 100, accuracy: 100 }); } catch (e) { }
    onComplete();
  };

  const handleTraceComplete = useCallback((data: { completion_data?: { accuracy?: number } }) => {
    handleNext();
  }, [handleNext]);

  const handleTouchStartCb = (e: React.TouchEvent) => { setDragStart(e.touches[0].clientX); };
  const handleTouchEndCb = (e: React.TouchEvent) => {
    const end = e.changedTouches[0].clientX;
    if (dragStart - end > 40) handleNext();
    else if (end - dragStart > 40) handlePrev();
  };
  const handleMouseDown = (e: React.MouseEvent) => { setDragStart(e.clientX); };
  const handleMouseUp = (e: React.MouseEvent) => {
    const end = e.clientX;
    if (dragStart - end > 40) handleNext();
    else if (end - dragStart > 40) handlePrev();
  };

  const renderStepContent = () => {
    if (step.shapePath) {
      return (
        <div className="w-full h-full p-2 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full max-w-[140px] drop-shadow-[0_4px_12px_rgba(255,255,255,0.4)]" preserveAspectRatio="xMidYMid meet">
            <path d={step.shapePath} fill="none" stroke="url(#chalk-gradient)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="chalk-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f0ead0" />
                <stop offset="50%" stopColor="#d8d0a8" />
                <stop offset="100%" stopColor="#f0ead0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    }
    if (step.color) {
      return (
        <motion.div animate={{ rotate: [0, 2, -2, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] border-4 border-white/20"
          style={{ background: `radial-gradient(circle at 30% 30%, ${step.color}, #000)` }} />
      );
    }
    return (
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        className="text-7xl sm:text-9xl drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]">
        {step.emoji}
      </motion.div>
    );
  };

  const renderGuideOwl = () => (
    <div className="relative inline-block group">
      <motion.div animate={owlCelebrate ? { y: [0, -15, 0], rotate: [0, 10, -10, 0] } : { y: [0, -3, 0] }} transition={owlCelebrate ? { duration: 0.5 } : { repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="text-4xl sm:text-5xl drop-shadow-xl cursor-help z-20 relative">
        🦉
      </motion.div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-yellow-400/20 rounded-full blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );

  const renderSpeechBubble = () => {
    if (showPraise) {
      return (
        <motion.div initial={{ opacity: 0, scale: 0.8, x: -10 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.8 }}
          className="relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl rounded-tl-none font-black text-xs sm:text-sm text-indigo-900 shadow-xl border-2 border-indigo-200"
          style={{ background: 'linear-gradient(135deg, #fef08a, #fde047)' }}>
          {praiseText}
        </motion.div>
      );
    }
    return (
      <AnimatePresence mode="wait">
        {guideMsg && (
          <motion.div key={guideMsg} initial={{ opacity: 0, scale: 0.9, y: 5 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
            className="relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl rounded-tl-none font-bold text-xs sm:text-sm text-white shadow-xl"
            style={{ background: 'rgba(30,50,30,0.8)', border: '1px solid rgba(90,122,90,0.5)' }}>
            {guideMsg}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const boardBg = '#1a2e1a';
  const boardBorder = '#5a3a1a';
  const boardInnerBorder = '#8b6b3b';
  const chalkWhite = '#f0ead0';
  const chalkDim = '#b8b098';

  return (
    <div className="fixed inset-0 z-[200] flex flex-col overflow-hidden" style={{ background: boardBg }}>
      {/* Chalk dust texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 3px 3px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
      {/* Top board light reflection */}
      <div className="absolute top-0 left-0 right-0 h-[60%] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

      {/* Wood board frame */}
      <div className="absolute inset-0 pointer-events-none" style={{
        boxShadow: `inset 0 0 0 8px ${boardBorder}, inset 0 0 0 12px ${boardInnerBorder}, inset 0 0 0 14px #3a2510`,
      }} />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-3 sm:px-8 py-2.5 sm:py-3" style={{ borderBottom: '2px solid rgba(90,122,90,0.3)' }}>
        <button onClick={onClose}
          className="inline-flex items-center gap-2 text-[#e8e0c8] font-black px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm"
          style={{ background: 'rgba(90,122,90,0.25)', border: '1px solid rgba(90,122,90,0.4)' }}>
          <ArrowLeft size={14} /> {isTamil ? 'பின்னே' : 'Back'}
        </button>
        {!quizPhase && !completed && (
          <div className="flex items-center gap-2">
            {steps.map((_, idx) => (
              <motion.div key={idx} initial={false}
                animate={{ width: idx === stepIndex ? 28 : idx < stepIndex ? 10 : 6, opacity: idx < stepIndex ? 0.5 : idx === stepIndex ? 1 : 0.25 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="h-2 rounded-full"
                style={{ background: idx < stepIndex ? '#5a8a5a' : idx === stepIndex ? chalkWhite : 'rgba(240,234,208,0.2)' }}
              />
            ))}
          </div>
        )}
        {quizPhase && !quizDone && (
          <span className="text-xs sm:text-sm font-bold text-[#e8e0c8] px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(90,122,90,0.3)', border: '1px solid rgba(90,122,90,0.4)' }}>
            {isTamil ? `வினாடி வினா ${quizIndex + 1}/${quizQuestions.length}` : `Quiz ${quizIndex + 1}/${quizQuestions.length}`}{quizScore > 0 && ` ⭐${quizScore}`}
          </span>
        )}
        <button onClick={() => audioEngine?.speak(step.speak)}
          className="p-2 rounded-xl text-xs"
          style={{ background: 'rgba(90,122,90,0.25)', border: '1px solid rgba(90,122,90,0.4)', color: chalkWhite }}>
          <Volume2 size={14} />
        </button>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-3 sm:px-8 pb-4 select-none overflow-hidden"
        onTouchStart={!quizPhase && !completed && !isTraceStep ? handleTouchStartCb : undefined}
        onTouchEnd={!quizPhase && !completed && !isTraceStep ? handleTouchEndCb : undefined}
        onMouseDown={!quizPhase && !completed && !isTraceStep ? handleMouseDown : undefined}
        onMouseUp={!quizPhase && !completed && !isTraceStep ? handleMouseUp : undefined}>

        {/* Guide row */}
        {!completed && !quizPhase && !isTraceStep && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 w-full max-w-lg px-2">
            {renderGuideOwl()}
            {renderSpeechBubble()}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* ─── TUTORIAL STEP ─── */}
          {!completed && !quizPhase && !isTraceStep && (
            <motion.div key={`step-${stepIndex}`}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 15, scale: showContent ? 1 : 0.97 }}
              exit={{ opacity: 0, y: -15, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-lg">
              <div className="relative p-4 sm:p-6" style={{
                background: 'rgba(30,50,30,0.6)',
                borderRadius: '1.5rem',
                border: '2px solid rgba(90,122,90,0.3)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}>
                <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
                  {/* Chalk step badge */}
                  <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                    style={{ background: 'rgba(90,122,90,0.2)', color: chalkDim, border: '1px solid rgba(90,122,90,0.3)' }}>
                    {isTamil ? `படி ${stepIndex + 1}` : `Step ${stepIndex + 1}`}
                  </div>

                  {/* Title */}
                  <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
                    className="text-xl sm:text-2xl font-black leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" style={{ color: chalkWhite }}>
                    {step.title}
                  </motion.h2>

                  {/* Visual */}
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.12, type: 'spring', stiffness: 200, damping: 15 }}
                    className="relative w-full max-h-[160px] sm:max-h-[220px] flex items-center justify-center">
                    <div className="absolute inset-4 rounded-full" style={{ background: 'radial-gradient(circle, rgba(90,122,90,0.15) 0%, transparent 70%)' }} />
                    {renderStepContent()}
                  </motion.div>

                  {/* Speak text */}
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                    className="text-sm sm:text-base font-bold max-w-md px-2" style={{ color: chalkDim }}>
                    {step.speak}
                  </motion.p>

                  {/* Tap hint */}
                  {showGuideHint && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="flex items-center gap-1.5 text-xs font-bold" style={{ color: 'rgba(240,234,208,0.3)' }}>
                      <span>👆</span>
                      <span>{isTamil ? 'அடுத்ததற்குத் தட்டவும்' : 'Swipe or tap Next'}</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── QUIZ PHASE ─── */}
          {quizPhase && !quizDone && (
            <motion.div key={`quiz-${quizIndex}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-md">
              <div className="relative p-5 sm:p-7 text-center" style={{
                background: 'rgba(30,50,30,0.6)',
                borderRadius: '1.5rem',
                border: '2px solid rgba(90,122,90,0.3)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full text-lg mb-3"
                  style={{ background: 'rgba(200,180,100,0.2)', border: '2px solid rgba(200,180,100,0.3)', color: chalkWhite }}>
                  {quizIndex + 1}
                </div>
                <h2 className="text-lg sm:text-xl font-black mb-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" style={{ color: chalkWhite }}>
                  🤔 {quizQuestions[quizIndex]?.question}
                </h2>
                <motion.div animate={wrongTap ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : {}} transition={{ duration: 0.35 }}>
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-xs mx-auto">
                    {quizQuestions[quizIndex]?.options.map((opt, oi) => (
                      <motion.button key={opt.word}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 + oi * 0.06 }}
                        whileHover={{ scale: 1.08, y: -4 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleQuizAnswer(opt.word === quizQuestions[quizIndex].correctWord)}
                        className="flex flex-col items-center gap-1.5 p-2.5 sm:p-4 rounded-xl transition-all"
                        style={{ background: 'rgba(90,122,90,0.2)', border: '2px solid rgba(90,122,90,0.3)' }}>
                        <span className="text-4xl sm:text-6xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">{opt.emoji}</span>
                        <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider" style={{ color: chalkDim }}>{opt.word}</span>
                      </motion.button>
                    ))}
                  </div>
                  {wrongTap && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="text-sm font-black mt-3" style={{ color: '#d4a030' }}>
                      🙅 {isTamil ? 'அடடா! மீண்டும் முயல்க!' : 'Oops! Try again!'}
                    </motion.p>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ─── QUIZ DONE ─── */}
          {quizPhase && quizDone && (
            <motion.div key="quizdone"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-full max-w-md">
              <div className="relative p-8 sm:p-10 text-center" style={{
                background: 'rgba(30,50,30,0.6)',
                borderRadius: '1.5rem',
                border: '2px solid rgba(90,122,90,0.3)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}>
                <div className="text-7xl sm:text-8xl mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                  {quizScore >= Math.ceil(quizQuestions.length * 0.6) ? '🏆' : '🌟'}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" style={{ color: chalkWhite }}>
                  {quizScore >= Math.ceil(quizQuestions.length * 0.6) ? (isTamil ? 'மிகச் சிறப்பு!' : 'Excellent!') : (isTamil ? 'நல்ல முயற்சி!' : 'Good Effort!')}
                </h2>
                <p className="text-base sm:text-lg font-bold mb-4" style={{ color: chalkDim }}>
                  {isTamil ? `${quizQuestions.length}-ல் ${quizScore} சரியானவை` : `${quizScore} of ${quizQuestions.length} correct`}
                </p>
                <div className="flex items-center justify-center gap-2 mb-5">
                  {Array.from({ length: quizQuestions.length }).map((_, i) => (
                    <div key={i} className="w-3 h-3 rounded-full" style={{
                      background: i < quizScore ? '#5a8a5a' : 'rgba(240,234,208,0.15)',
                      border: '1px solid rgba(90,122,90,0.3)',
                    }} />
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button onClick={() => { setQuizIndex(0); setQuizScore(0); setQuizDone(false); setWrongTap(false); }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95"
                    style={{ background: 'rgba(90,122,90,0.25)', border: '1px solid rgba(90,122,90,0.4)', color: chalkWhite }}>
                    <RotateCcw size={16} /> {isTamil ? 'மீண்டும்' : 'Again'}
                  </button>
                  <button onClick={handleQuizFinish}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95"
                    style={{ background: '#3a6a3a', border: '1px solid #5a8a5a', color: chalkWhite }}>
                    <CheckCircle size={16} /> {isTamil ? 'முடிந்தது' : 'Done'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── TRACE STEP ─── */}
          {!completed && !quizPhase && isTraceStep && (
            <motion.div key={`trace-${stepIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-lg flex-1 flex flex-col min-h-0">
              <TraceActivity config={{ path: step.shapePath }} onComplete={handleTraceComplete} />
            </motion.div>
          )}

          {/* ─── COMPLETED ─── */}
          {completed && (
            <motion.div key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 150, damping: 12 }}
              className="w-full max-w-md">
              <div className="relative p-8 sm:p-10 text-center" style={{
                background: 'rgba(30,50,30,0.6)',
                borderRadius: '1.5rem',
                border: '2px solid rgba(90,122,90,0.3)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}>
                <div className="text-8xl sm:text-9xl mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">🏆</div>
                <h2 className="text-3xl sm:text-4xl font-black mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" style={{ color: chalkWhite }}>
                  {isTamil ? 'நீங்கள் முடித்துவிட்டீர்கள்!' : 'You did it!'}
                </h2>
                <p className="text-base sm:text-lg font-bold mb-6" style={{ color: chalkDim }}>
                  {lesson.title}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button onClick={handleReplay}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95"
                    style={{ background: 'rgba(90,122,90,0.25)', border: '1px solid rgba(90,122,90,0.4)', color: chalkWhite }}>
                    <RotateCcw size={18} /> {isTamil ? 'மீண்டும் விளையாடு' : 'Play Again'}
                  </button>
                  <button onClick={handleFinish}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95"
                    style={{ background: '#3a6a3a', border: '1px solid #5a8a5a', color: chalkWhite }}>
                    <CheckCircle size={18} /> {isTamil ? 'முடிந்தது' : 'Done'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      {!quizPhase && !completed && !isTraceStep && (
        <div className="relative z-10 px-3 sm:px-8 pb-4 sm:pb-6 pt-1">
          <div className="max-w-lg mx-auto flex items-center gap-2 sm:gap-3">
            <button onClick={handlePrev} disabled={stepIndex === 0}
              className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-95"
              style={{
                background: stepIndex === 0 ? 'rgba(90,122,90,0.1)' : 'rgba(90,122,90,0.25)',
                border: stepIndex === 0 ? '1px solid rgba(90,122,90,0.2)' : '1px solid rgba(90,122,90,0.4)',
                color: stepIndex === 0 ? 'rgba(240,234,208,0.3)' : chalkWhite,
                cursor: stepIndex === 0 ? 'not-allowed' : 'pointer',
              }}>
              {isTamil ? 'பின்னே' : 'Back'}
            </button>
            <button onClick={handleNext}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-95"
              style={{ background: 'rgba(90,122,90,0.3)', border: '2px solid rgba(90,122,90,0.5)', color: chalkWhite }}>
              {stepIndex === steps.length - 1 ? <><CheckCircle size={18} /> {isTamil ? 'வினாடி வினா நேரம்!' : 'Quiz Time!'}</> : <><Play size={18} /> {isTamil ? 'அடுத்து' : 'Next'}</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
});
"""
    
    content = content[:start_idx] + new_tutorial_player + content[end_idx:]
    with codecs.open(path, 'w', 'utf-8') as f:
        f.write(content)
    print("FIXED SUCCESSFULLY!")
