import codecs

path = 'D:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/Learn/page.tsx'

with codecs.open(path, 'r', 'utf-8') as f:
    lines = f.readlines()

new_lines = []
skip = False

for i in range(len(lines)):
    if skip:
        if "      )}" in lines[i] and not "showNameTrace" in lines[i] and "/>" in lines[i-1]:
            skip = False
        continue

    if "      {activeLesson && !showNameTrace && (" in lines[i]:
        # Check if next line is ActivityPlayer
        if i + 1 < len(lines) and "<ActivityPlayer" in lines[i+1]:
            skip = True
            new_lines.append("""      {activeLesson && !showNameTrace && (
        (() => {
          const lowerTitle = activeLesson.title.toLowerCase();
          const lowerChapter = activeChapter?.name?.toLowerCase() || '';
          
          const forceTutorial = lowerChapter.includes('shape') || lowerChapter.includes('\u0bb5\u0b9f\u0bbf\u0bb5\u0b99\u0bcd\u0b95\u0bb3\u0bcd') ||
            lowerTitle.includes('shape') || lowerTitle.includes('\u0bb5\u0b9f\u0bbf\u0bb5\u0b99\u0bcd\u0b95\u0bb3\u0bcd') ||
            lowerTitle.includes('circle') || lowerTitle.includes('\u0bb5\u0b9f\u0bcd\u0b9f\u0bae\u0bcd') ||
            lowerTitle.includes('square') || lowerTitle.includes('\u0b9a\u0ba4\u0bc1\u0bb0\u0bae\u0bcd') ||
            lowerTitle.includes('triangle') || lowerTitle.includes('\u0bae\u0bc1\u0b95\u0bcd\u0b95\u0bcb\u0ba3\u0bae\u0bcd') ||
            lowerTitle.includes('story') || lowerTitle.includes('\u0b95\u0ba4\u0bc8') ||
            lowerTitle.includes('rhyme') || lowerTitle.includes('\u0baa\u0bbe\u0b9f\u0bb2\u0bcd') ||
            lowerTitle.includes('phonic') || 
            lowerTitle.includes('colour') || lowerTitle.includes('color') || lowerTitle.includes('\u0ba8\u0bbf\u0bb1\u0b99\u0bcd\u0b95\u0bb3\u0bcd');

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
      )}\n""")
            continue
            
    new_lines.append(lines[i])

with codecs.open(path, 'w', 'utf-8') as f:
    f.writelines(new_lines)

print("SUCCESS")
