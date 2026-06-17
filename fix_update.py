import codecs

path = 'D:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/Learn/page.tsx'

with codecs.open(path, 'r', 'utf-8') as f:
    content = f.read()

# Fix updateProgress call
old = "await studentApi.updateProgress(lesson.id, { score: quizDone ? Math.round((quizScore / quizQuestions.length) * 100) : 100, accuracy: 100 });"
new = "await studentApi.updateProgress(lesson.id, { status: 'completed', completion_percentage: 100 });"

content = content.replace(old, new)

with codecs.open(path, 'w', 'utf-8') as f:
    f.write(content)

print("Fixed updateProgress")
