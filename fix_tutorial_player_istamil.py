import codecs

path = 'D:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/Learn/page.tsx'

with codecs.open(path, 'r', 'utf-8') as f:
    content = f.read()

# 1. Update TutorialPlayer prop signature
content = content.replace(
    "const TutorialPlayer = React.memo(function TutorialPlayer({\n  lesson,\n  onClose,\n  onComplete,\n  studentName,\n}: {\n  lesson: Lesson;\n  onClose: () => void;\n  onComplete: () => void;\n  studentName?: string;\n}) {",
    "const TutorialPlayer = React.memo(function TutorialPlayer({\n  lesson,\n  onClose,\n  onComplete,\n  studentName,\n  isTamil,\n}: {\n  lesson: Lesson;\n  onClose: () => void;\n  onComplete: () => void;\n  studentName?: string;\n  isTamil?: boolean;\n}) {"
)
# Windows line endings variant
content = content.replace(
    "const TutorialPlayer = React.memo(function TutorialPlayer({\r\n  lesson,\r\n  onClose,\r\n  onComplete,\r\n  studentName,\r\n}: {\r\n  lesson: Lesson;\r\n  onClose: () => void;\r\n  onComplete: () => void;\r\n  studentName?: string;\r\n}) {",
    "const TutorialPlayer = React.memo(function TutorialPlayer({\r\n  lesson,\r\n  onClose,\r\n  onComplete,\r\n  studentName,\r\n  isTamil,\r\n}: {\r\n  lesson: Lesson;\r\n  onClose: () => void;\r\n  onComplete: () => void;\r\n  studentName?: string;\r\n  isTamil?: boolean;\r\n}) {"
)

# 2. Remove internal isTamil calculation in TutorialPlayer
content = content.replace(
    "// Detect Tamil lesson by checking for Tamil Unicode range\n  const isTamil = useMemo(() => /[\\u0B80-\\u0BFF]/.test(lesson.title), [lesson.title]);",
    ""
)
content = content.replace(
    "// Detect Tamil lesson by checking for Tamil Unicode range\r\n  const isTamil = useMemo(() => /[\\u0B80-\\u0BFF]/.test(lesson.title), [lesson.title]);",
    ""
)

# 3. Pass isTamil to TutorialPlayer where it is rendered
content = content.replace(
    "<TutorialPlayer\n              lesson={activeLesson!}\n              onClose={handleRoundClose}\n              onComplete={handleRoundDone}\n              studentName={studentProfile?.name}\n            />",
    "<TutorialPlayer\n              lesson={activeLesson!}\n              onClose={handleRoundClose}\n              onComplete={handleRoundDone}\n              studentName={studentProfile?.name}\n              isTamil={isTamil}\n            />"
)
content = content.replace(
    "<TutorialPlayer\r\n              lesson={activeLesson!}\r\n              onClose={handleRoundClose}\r\n              onComplete={handleRoundDone}\r\n              studentName={studentProfile?.name}\r\n            />",
    "<TutorialPlayer\r\n              lesson={activeLesson!}\r\n              onClose={handleRoundClose}\r\n              onComplete={handleRoundDone}\r\n              studentName={studentProfile?.name}\r\n              isTamil={isTamil}\r\n            />"
)

with codecs.open(path, 'w', 'utf-8') as f:
    f.write(content)

print("Updated TutorialPlayer to accept isTamil prop")
