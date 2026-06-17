import codecs

path = 'D:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/Learn/page.tsx'

with codecs.open(path, 'r', 'utf-8') as f:
    content = f.read()

# Fix 1: studentApi.completeLesson -> studentApi.updateProgress
content = content.replace("await studentApi.completeLesson(lesson.id", "await studentApi.updateProgress(lesson.id")

# Fix 2: step.color -> (step as any).color
content = content.replace("if (step.color) {", "if ((step as any).color) {")
content = content.replace("radial-gradient(circle at 30% 30%, ${step.color}, #000)", "radial-gradient(circle at 30% 30%, ${(step as any).color}, #000)")

# Fix 3: handleQuizFinish -> handleFinish
content = content.replace("onClick={handleQuizFinish}", "onClick={handleFinish}")

# Fix 4: TraceRoundView missing isTamil in destructuring
trace_round_old = """const TraceRoundView = React.memo(function TraceRoundView({
  traceRounds,
  roundIndex,
  traceDone,
  roundPassed,
  onClose,
  onNext,
  onDone,
}: {"""
trace_round_new = """const TraceRoundView = React.memo(function TraceRoundView({
  traceRounds,
  roundIndex,
  traceDone,
  roundPassed,
  onClose,
  onNext,
  onDone,
  isTamil,
}: {"""
content = content.replace(trace_round_old, trace_round_new)

# Fix 5: UltimateLearnEngine missing isTamil
ultimate_engine_old = """export default function UltimateLearnEngine() {
  const { subjects, studentProfile, updateProgress, refetchLessons } = useData();"""
ultimate_engine_new = """export default function UltimateLearnEngine() {
  const { subjects, studentProfile, updateProgress, refetchLessons } = useData();
  const searchParams = useSearchParams();
  const activeLessonFromState = undefined; // Will be defined below
"""
# Wait, let's just add isTamil to the top of the component or right after activeLesson is defined.
# Let's find where activeLesson is defined.
active_lesson_def = "const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);"
is_tamil_def = "const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);\n  const isTamil = activeLesson ? /[\\u0B80-\\u0BFF]/.test(activeLesson.title) : false;"
content = content.replace(active_lesson_def, is_tamil_def)

# What about the other references to isTamil in UltimateLearnEngine?
# Oh wait, isTamil is used in the chapter list where activeLesson is NOT set yet!
# e.g., lesson.is_unlocked ? (isTamil ? 'தொடங்கு' : 'START') ...
# For those, we need to check the subject name or chapter name.
# Let's just define an isTamil variable for the whole engine based on the activeChapter or activeSubject!
# Let's change the UltimateLearnEngine isTamil definition:
active_chapter_def = "const activeChapter = useMemo(() =>"
active_chapter_is_tamil = """const activeChapter = useMemo(() =>
    activeSubject?.chapters.find(c => c.id === activeChapterId), [activeSubject, activeChapterId]);
  const isTamil = activeChapter ? /[\\u0B80-\\u0BFF]/.test(activeChapter.name) : activeLesson ? /[\\u0B80-\\u0BFF]/.test(activeLesson.title) : false;"""
# Let's remove the previous activeLesson one just in case and replace the activeChapter one.
content = content.replace(is_tamil_def, active_lesson_def) # revert
# Instead, replace the activeChapter useMemo:
content = content.replace("""const activeChapter = useMemo(() =>
    activeSubject?.chapters.find(c => c.id === activeChapterId), [activeSubject, activeChapterId]);""", active_chapter_is_tamil)


with codecs.open(path, 'w', 'utf-8') as f:
    f.write(content)

print("Fixed TS errors")
