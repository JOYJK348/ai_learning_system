import codecs
import re

path = 'D:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/Learn/page.tsx'

with codecs.open(path, 'r', 'utf-8') as f:
    content = f.read()

target = r"""      \{activeLesson && !showNameTrace && \(
        <ActivityPlayer
          key=\{activeLesson\.id\}
          lessonId=\{activeLesson\.id\}
          lessonTitle=\{activeLesson\.title\}
          onClose=\{\(\) => setActiveLesson\(null\)\}
          onComplete=\{handleActivityComplete\}
        />
      \)\}"""

replacement = """      {activeLesson && !showNameTrace && (
        (() => {
          const lowerTitle = activeLesson.title.toLowerCase();
          const lowerChapter = activeChapter?.name?.toLowerCase() || '';
          
          const forceTutorial = lowerChapter.includes('shape') || lowerChapter.includes('வடிவங்கள்') ||
            lowerTitle.includes('shape') || lowerTitle.includes('வடிவங்கள்') ||
            lowerTitle.includes('circle') || lowerTitle.includes('வட்டம்') ||
            lowerTitle.includes('square') || lowerTitle.includes('சதுரம்') ||
            lowerTitle.includes('triangle') || lowerTitle.includes('முக்கோணம்') ||
            lowerTitle.includes('story') || lowerTitle.includes('கதை') ||
            lowerTitle.includes('rhyme') || lowerTitle.includes('பாடல்') ||
            lowerTitle.includes('phonic') || 
            lowerTitle.includes('colour') || lowerTitle.includes('color') || lowerTitle.includes('நிறங்கள்');

          if (forceTutorial) {
            return (
              <TutorialPlayer
                key={activeLesson.id}
                lesson={activeLesson}
                onClose={() => setActiveLesson(null)}
                onComplete={handleActivityComplete}
                studentName={studentProfile?.name}
              />
            );
          }

          return (
            <ActivityPlayer
              key={activeLesson.id}
              lessonId={activeLesson.id}
              lessonTitle={activeLesson.title}
              onClose={() => setActiveLesson(null)}
              onComplete={handleActivityComplete}
            />
          );
        })()
      )}"""

# We use regex to ignore exact whitespace/CRLF issues
new_content = re.sub(target, replacement, content, count=1, flags=re.MULTILINE | re.DOTALL)

if new_content != content:
    with codecs.open(path, 'w', 'utf-8') as f:
        f.write(new_content)
    print("SUCCESS: ActivityPlayer replaced.")
else:
    print("FAILED: Could not find Target.")
