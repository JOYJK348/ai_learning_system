import codecs

path = 'D:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/Learn/page.tsx'

with codecs.open(path, 'r', 'utf-8') as f:
    content = f.read()

# Add isTamil detection after isTraceStep
old = "  const isTraceStep = step.shapePath && step.title.startsWith('Trace');\r\n"
new = "  const isTraceStep = step.shapePath && step.title.startsWith('Trace');\r\n  // Detect Tamil lesson by checking for Tamil Unicode range\r\n  const isTamil = useMemo(() => /[\\u0B80-\\u0BFF]/.test(lesson.title), [lesson.title]);\r\n"

if old in content:
    content = content.replace(old, new, 1)
    print("Replaced successfully")
else:
    # Try without \r
    old2 = "  const isTraceStep = step.shapePath && step.title.startsWith('Trace');\n"
    new2 = "  const isTraceStep = step.shapePath && step.title.startsWith('Trace');\n  // Detect Tamil lesson by checking for Tamil Unicode range\n  const isTamil = useMemo(() => /[\\u0B80-\\u0BFF]/.test(lesson.title), [lesson.title]);\n"
    if old2 in content:
        content = content.replace(old2, new2, 1)
        print("Replaced (LF) successfully")
    else:
        print("Pattern NOT found")
        # Print lines around isTraceStep
        idx = content.find("isTraceStep = step.shapePath")
        print(repr(content[idx-20:idx+120]))

with codecs.open(path, 'w', 'utf-8') as f:
    f.write(content)
