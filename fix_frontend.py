import codecs

path = 'D:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/Learn/page.tsx'

with codecs.open(path, 'r', 'utf-8') as f:
    content = f.read()

corrupted_block = """        {quizPhase && !quizDone && (
          <span className="text-xs sm:text-sm font-bold text-[#e8e0c8] px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(90,122,90,0.3)', border: '1px solid rgba(90,122,90,0.4)' }}>
            Quiz {quizIndex + 1}/{quizQuestions.length}{quizScore > 0 && ` ⭐${quizScore}`}
          </span>
            {renderGuideOwl()}
              Back
            </button>
            <button onClick={handleNext}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all active:scale-95"
              style={{ background: 'rgba(90,122,90,0.3)', border: '2px solid rgba(90,122,90,0.5)', color: chalkWhite }}>
              {stepIndex === steps.length - 1 ? <><CheckCircle size={18} /> Quiz Time!</> : <><Play size={18} /> Next</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
});"""

fixed_block = """        {quizPhase && !quizDone && (
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
                  {isTamil ? `${quizScore} / ${quizQuestions.length} சரியானவை` : `${quizScore} of ${quizQuestions.length} correct`}
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
});"""

content = content.replace(corrupted_block, fixed_block)

with codecs.open(path, 'w', 'utf-8') as f:
    f.write(content)

print("Replaced!")
