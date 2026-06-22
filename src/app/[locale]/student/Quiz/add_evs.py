import sys

def modify_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add EVS_LEVELS right before MATH_LEVELS
    evs_levels = """
const EVS_LEVELS: Level[] = [
  {
    id: 1,
    title: 'Nature Explorers',
    titleEn: 'Animals & Plants',
    mascot: '🌿',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which animal gives us milk?',
        instructionTa: 'நமக்கு பால் தரும் விலங்கு எது? 🥛',
        options: [
          { text: 'Cow', emoji: '🐄', correct: true },
          { text: 'Lion', emoji: '🦁', correct: false },
          { text: 'Dog', emoji: '🐶', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which is a WILD animal?',
        instructionTa: 'இவற்றில் காட்டு விலங்கு எது? 🌳',
        options: [
          { text: 'Tiger', emoji: '🐅', correct: true },
          { text: 'Cat', emoji: '🐱', correct: false },
          { text: 'Goat', emoji: '🐐', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Where does a fish live?',
        instructionTa: 'மீன் எங்கே வாழும்? 🐠',
        options: [
          { text: 'Water', emoji: '🌊', correct: true },
          { text: 'Tree', emoji: '🌳', correct: false },
          { text: 'House', emoji: '🏠', correct: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'My Body & Senses',
    titleEn: 'Eyes, Ears & Nose',
    mascot: '👀',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      {
        type: 'choice',
        instruction: 'What do we use to SEE?',
        instructionTa: 'பார்ப்பதற்கு நாம் எதைப் பயன்படுத்துகிறோம்? 👀',
        options: [
          { text: 'Eyes', emoji: '👁️', correct: true },
          { text: 'Nose', emoji: '👃', correct: false },
          { text: 'Hands', emoji: '🖐️', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What do we use to HEAR?',
        instructionTa: 'கேட்பதற்கு நாம் எதைப் பயன்படுத்துகிறோம்? 👂',
        options: [
          { text: 'Ears', emoji: '👂', correct: true },
          { text: 'Mouth', emoji: '👄', correct: false },
          { text: 'Eyes', emoji: '👁️', correct: false }
        ]
      }
    ]
  }
];

const MATH_LEVELS: Level[] = [
"""
    content = content.replace("const MATH_LEVELS: Level[] = [", evs_levels)

    # 2. Update activeSubject state
    content = content.replace("useState<'tamil' | 'english' | 'math'>('tamil')", "useState<'tamil' | 'english' | 'math' | 'evs'>('tamil')")

    # 3. Add unlocked levels logic
    evs_unlocked = """
    } else if (activeSubject === 'evs') {
      return [1, 2];
    } else {
      const mathSubject = subjects.find(s => 
"""
    content = content.replace("""    } else {
      const mathSubject = subjects.find(s => """, evs_unlocked)

    # 4. update scores mappings
    evs_map = """
    const mappings = activeSubject === 'tamil' ? tamilMappings 
                     : activeSubject === 'english' ? englishMappings 
                     : activeSubject === 'evs' ? {}
                     : mathMappings;
"""
    content = content.replace("""
    const mappings = activeSubject === 'tamil' ? tamilMappings 
                     : activeSubject === 'english' ? englishMappings 
                     : mathMappings;
""", evs_map)

    # 5. Update level completion mappings
    evs_map2 = """
            const mappings = activeSubject === 'tamil' ? tamilMappings 
                             : activeSubject === 'english' ? englishMappings 
                             : activeSubject === 'evs' ? {}
                             : mathMappings;
"""
    content = content.replace("""
            const mappings = activeSubject === 'tamil' ? tamilMappings 
                             : activeSubject === 'english' ? englishMappings 
                             : mathMappings;
""", evs_map2)

    # 6. Update titles
    evs_title1 = """
                    {activeSubject === 'tamil' ? 'தமிழ் வினாடி-வினா' 
                     : activeSubject === 'english' ? 'English Quiz Arena' 
                     : activeSubject === 'evs' ? 'EVS Quiz Arena'
                     : 'Math Quiz Arena'}
"""
    content = content.replace("""
                    {activeSubject === 'tamil' ? 'தமிழ் வினாடி-வினா' 
                     : activeSubject === 'english' ? 'English Quiz Arena' 
                     : 'Math Quiz Arena'}
""", evs_title1)

    evs_title2 = """
                    {activeSubject === 'tamil' ? 'Tamil Quiz Arena' 
                     : activeSubject === 'english' ? 'Fun Spelling & Sorting' 
                     : activeSubject === 'evs' ? 'Nature & Science'
                     : 'Numbers & Shapes'}
"""
    content = content.replace("""
                    {activeSubject === 'tamil' ? 'Tamil Quiz Arena' 
                     : activeSubject === 'english' ? 'Fun Spelling & Sorting' 
                     : 'Numbers & Shapes'}
""", evs_title2)

    # 7. Update mapping array
    content = content.replace("""(activeSubject === 'tamil' ? TAMIL_LEVELS : activeSubject === 'english' ? ENGLISH_LEVELS : MATH_LEVELS).map((level, index) => {""", """(activeSubject === 'tamil' ? TAMIL_LEVELS : activeSubject === 'english' ? ENGLISH_LEVELS : activeSubject === 'evs' ? EVS_LEVELS : MATH_LEVELS).map((level, index) => {""")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Modifications done!")

if __name__ == '__main__':
    modify_file(r'd:\FreeLance\AI-LearningPortal\frontend\src\app\[locale]\student\Quiz\page.tsx')
