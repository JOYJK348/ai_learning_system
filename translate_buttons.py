import sys
import codecs

path = 'D:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/Learn/page.tsx'

with codecs.open(path, 'r', 'utf-8') as f:
    content = f.read()

# Replace lessons text
target_1 = "{activeChapter.completed_lessons}/{activeChapter.total_lessons} lessons"
replacement_1 = "{isTamil ? `${activeChapter.completed_lessons}/${activeChapter.total_lessons} பாடங்கள்` : `${activeChapter.completed_lessons}/${activeChapter.total_lessons} lessons`}"
content = content.replace(target_1, replacement_1)

# Replace START
target_2 = "lesson.is_unlocked ? 'START' : '🔒 LOCKED'}"
replacement_2 = "lesson.is_unlocked ? (isTamil ? 'தொடங்கு' : 'START') : (isTamil ? '🔒 பூட்டப்பட்டது' : '🔒 LOCKED')}"
content = content.replace(target_2, replacement_2)

# Replace PLAY ▶
target_3 = "lesson.progress?.status === 'in_progress' ? 'PLAY ▶' :"
replacement_3 = "lesson.progress?.status === 'in_progress' ? (isTamil ? 'விளையாடு ▶' : 'PLAY ▶') :"
content = content.replace(target_3, replacement_3)

# Replace DONE ✅
target_4 = "lesson.progress?.status === 'completed' ? 'DONE ✅' :"
replacement_4 = "lesson.progress?.status === 'completed' ? (isTamil ? 'முடிந்தது ✅' : 'DONE ✅') :"
content = content.replace(target_4, replacement_4)

with codecs.open(path, 'w', 'utf-8') as f:
    f.write(content)

print("Translations added!")
