import codecs
import re

path = 'D:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/Learn/page.tsx'

with codecs.open(path, 'r', 'utf-8') as f:
    content = f.read()

# "Level {level} Legend"
content = content.replace("Level {level} Legend", "{isTamil ? `நிலை ${level} வீரன்` : `Level ${level} Legend`}")

# "READY FOR A <br/> MISSION, {studentName}?"
content = content.replace("READY FOR A <br/>\n                         MISSION, {studentName}?", "{isTamil ? <>பயணத்திற்கு <br/> தயாராகுங்கள், {studentName}?</> : <>READY FOR A <br/> MISSION, {studentName}?</>}")

# Status
content = content.replace(">Status<", ">{isTamil ? 'தற்போதைய நிலை' : 'Status'}<")
content = content.replace("Hyper Active 🔥", "{isTamil ? 'அதிக சுறுசுறுப்பு 🔥' : 'Hyper Active 🔥'}")

# "Mission Master Owl"
content = content.replace(">Mission Master Owl<", ">{isTamil ? 'வழிகாட்டி ஆந்தை' : 'Mission Master Owl'}<")

# "Back" in chapter view
content = content.replace("<ArrowLeft size={18} /> Back", "<ArrowLeft size={18} /> {isTamil ? 'பின்னே' : 'Back'}")

# Lesson descriptions
content = content.replace("Practice tracing the standing line!", "{isTamil ? 'நேர்கோட்டை வரையப் பழகுங்கள்!' : 'Practice tracing the standing line!'}")
content = content.replace("Practice tracing the sleeping line!", "{isTamil ? 'படுக்கைகோட்டை வரையப் பழகுங்கள்!' : 'Practice tracing the sleeping line!'}")
content = content.replace("Practice tracing the left slanting line!", "{isTamil ? 'இடது சாய்வுகோட்டை வரையப் பழகுங்கள்!' : 'Practice tracing the left slanting line!'}")
content = content.replace("Practice tracing the right slanting line!", "{isTamil ? 'வலது சாய்வுகோட்டை வரையப் பழகுங்கள்!' : 'Practice tracing the right slanting line!'}")
content = content.replace("Practice tracing the left curve!", "{isTamil ? 'இடது வளைவை வரையப் பழகுங்கள்!' : 'Practice tracing the left curve!'}")
content = content.replace("Practice tracing the right curve!", "{isTamil ? 'வலது வளைவை வரையப் பழகுங்கள்!' : 'Practice tracing the right curve!'}")
content = content.replace("Practice tracing the up curve!", "{isTamil ? 'மேல் வளைவை வரையப் பழகுங்கள்!' : 'Practice tracing the up curve!'}")
content = content.replace("Practice tracing the down curve!", "{isTamil ? 'கீழ் வளைவை வரையப் பழகுங்கள்!' : 'Practice tracing the down curve!'}")
content = content.replace("Trace each line type to complete the exam!", "{isTamil ? 'அனைத்து வரிகளையும் வரைந்து தேர்வை முடிக்கவும்!' : 'Trace each line type to complete the exam!'}")

# Translating DB names for Tamil display
content = content.replace(">Pre-Writing Foundation<", ">{isTamil ? 'முன்-எழுத்து பயிற்சி' : 'Pre-Writing Foundation'}<")
# Wait, chapter name comes from activeChapter.name
content = content.replace(">{activeChapter.name}<", ">{isTamil && activeChapter.name === 'Pre-Writing Foundation' ? 'முன்-எழுத்து பயிற்சி' : activeChapter.name}<")

# Translating DB lesson names
content = content.replace(">{lesson.title}<", ">{isTamil && lesson.title === 'Standing Line' ? 'நேர்கோடு' : isTamil && lesson.title === 'Sleeping Line' ? 'படுக்கைகோடு' : isTamil && lesson.title === 'Left Slanting Line' ? 'இடது சாய்வுகோடு' : isTamil && lesson.title === 'Right Slanting Line' ? 'வலது சாய்வுகோடு' : isTamil && lesson.title === 'Left Curve' ? 'இடது வளைவு' : isTamil && lesson.title === 'Right Curve' ? 'வலது வளைவு' : isTamil && lesson.title === 'Up Curve' ? 'மேல் வளைவு' : isTamil && lesson.title === 'Down Curve' ? 'கீழ் வளைவு' : isTamil && lesson.title === 'Pre-Writing Exam' ? 'முன்-எழுத்து தேர்வு' : lesson.title}<")

# "DONE ✅"
content = content.replace("DONE ✅", "{isTamil ? 'முடிந்தது ✅' : 'DONE ✅'}")

# Pick a level
content = content.replace(">Pick a level<", ">{isTamil ? 'பயிற்சியை தேர்ந்தெடுக்கவும்' : 'Pick a level'}<")

# We should also replace the bottom nav if it's there, but wait, bottom nav is in a layout file maybe?
# The user said "Learn" is at the bottom. The bottom nav is usually `frontend/src/app/[locale]/student/_components/StudentBottomNav.tsx`.

with codecs.open(path, 'w', 'utf-8') as f:
    f.write(content)

print("Translated dashboard text!")
