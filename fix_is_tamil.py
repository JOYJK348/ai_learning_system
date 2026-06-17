import codecs

path = 'D:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/Learn/page.tsx'

with codecs.open(path, 'r', 'utf-8') as f:
    content = f.read()

content = content.replace(
    "<PreWritingVideo key={`${roundIndex}-${path}`}\n          config={{ path, color: GUIDE_COLORS[path] || '#8B5CF6' }}\n          onComplete={handleGuideComplete}\n        />",
    "<PreWritingVideo key={`${roundIndex}-${path}`}\n          config={{ path, color: GUIDE_COLORS[path] || '#8B5CF6' }}\n          onComplete={handleGuideComplete}\n          isTamil={isTamil}\n        />"
)
content = content.replace(
    "<PreWritingVideo key={`${roundIndex}-${path}`}\r\n          config={{ path, color: GUIDE_COLORS[path] || '#8B5CF6' }}\r\n          onComplete={handleGuideComplete}\r\n        />",
    "<PreWritingVideo key={`${roundIndex}-${path}`}\r\n          config={{ path, color: GUIDE_COLORS[path] || '#8B5CF6' }}\r\n          onComplete={handleGuideComplete}\r\n          isTamil={isTamil}\r\n        />"
)

with codecs.open(path, 'w', 'utf-8') as f:
    f.write(content)

print("Added isTamil to PreWritingVideo")
