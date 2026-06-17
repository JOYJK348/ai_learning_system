import codecs

path = 'D:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/Learn/page.tsx'

with codecs.open(path, 'r', 'utf-8') as f:
    content = f.read()

old_is_tamil = """const activeChapter = useMemo(() =>
    activeSubject?.chapters.find(c => c.id === activeChapterId), [activeSubject, activeChapterId]);
  const isTamil = activeChapter ? /[\\u0B80-\\u0BFF]/.test(activeChapter.name) : activeLesson ? /[\\u0B80-\\u0BFF]/.test(activeLesson.title) : false;"""

new_is_tamil = """const activeChapter = useMemo(() =>
    activeSubject?.chapters.find(c => c.id === activeChapterId), [activeSubject, activeChapterId]);
  const isTamil = (activeSubject?.name?.toLowerCase() === 'tamil') ||
                  (activeChapter && /[\\u0B80-\\u0BFF]/.test(activeChapter.name)) ||
                  (activeLesson && /[\\u0B80-\\u0BFF]/.test(activeLesson.title)) ||
                  false;"""

content = content.replace(old_is_tamil, new_is_tamil)

# Let's also check if the isTamil passed to TraceRoundView was hardcoded? No, earlier I saw it was:
# isTamil={activeLesson ? /[\u0B80-\u0BFF]/.test(activeLesson.title) : false}
# I should replace that with just isTamil={isTamil} so it uses the component-level isTamil
old_trace_call = "isTamil={activeLesson ? /[\\u0B80-\\u0BFF]/.test(activeLesson.title) : false}"
new_trace_call = "isTamil={isTamil}"
content = content.replace(old_trace_call, new_trace_call)

with codecs.open(path, 'w', 'utf-8') as f:
    f.write(content)

print("Updated isTamil logic in UltimateLearnEngine")
