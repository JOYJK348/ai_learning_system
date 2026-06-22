import sys

def modify_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update the EVS_LEVELS array to include 6 levels
    evs_levels = """
const EVS_LEVELS: Level[] = [
  {
    id: 1,
    title: 'Myself',
    titleEn: 'About Me',
    mascot: '🧍',
    color: 'from-blue-400 to-indigo-500',
    borderColor: 'border-blue-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which item belongs to YOU?',
        instructionTa: 'உங்களுக்குரிய பொருள் எது? 🎒',
        options: [
          { text: 'School Bag', emoji: '🎒', correct: true },
          { text: 'Car', emoji: '🚗', correct: false },
          { text: 'Office Laptop', emoji: '💻', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What do you use to brush your teeth?',
        instructionTa: 'பற்களைத் துலக்க எதைப் பயன்படுத்துவீர்கள்? 🪥',
        options: [
          { text: 'Toothbrush', emoji: '🪥', correct: true },
          { text: 'Comb', emoji: '🪮', correct: false },
          { text: 'Spoon', emoji: '🥄', correct: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'My Family & Home',
    titleEn: 'Family Members & House',
    mascot: '🏠',
    color: 'from-rose-400 to-red-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Who cooks food at home?',
        instructionTa: 'வீட்டில் சமைப்பவர் யார்? 🍳',
        options: [
          { text: 'Mother', emoji: '👩', correct: true },
          { text: 'Dog', emoji: '🐶', correct: false },
          { text: 'Baby', emoji: '👶', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Where do we sleep?',
        instructionTa: 'நாம் எங்கே தூங்குவோம்? 🛏️',
        options: [
          { text: 'Bedroom', emoji: '🛏️', correct: true },
          { text: 'Kitchen', emoji: '🍳', correct: false },
          { text: 'Garden', emoji: '🌳', correct: false }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Animals Around Us',
    titleEn: 'Pets & Wild Animals',
    mascot: '🐾',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
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
      }
    ]
  },
  {
    id: 4,
    title: 'Plants & Nature',
    titleEn: 'Trees, Flowers & Leaves',
    mascot: '🌳',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      {
        type: 'choice',
        instruction: 'What color are the leaves?',
        instructionTa: 'இலைகளின் நிறம் என்ன? 🍃',
        options: [
          { text: 'Green', emoji: '🟩', correct: true },
          { text: 'Blue', emoji: '🟦', correct: false },
          { text: 'Red', emoji: '🟥', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which is a beautiful FLOWER?',
        instructionTa: 'அழகான பூ எது? 🌸',
        options: [
          { text: 'Rose', emoji: '🌹', correct: true },
          { text: 'Stone', emoji: '🪨', correct: false },
          { text: 'Book', emoji: '📖', correct: false }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Transport',
    titleEn: 'Vehicles',
    mascot: '🚌',
    color: 'from-cyan-400 to-blue-500',
    borderColor: 'border-cyan-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which vehicle flies in the sky?',
        instructionTa: 'வானத்தில் பறக்கும் வாகனம் எது? ✈️',
        options: [
          { text: 'Aeroplane', emoji: '✈️', correct: true },
          { text: 'Car', emoji: '🚗', correct: false },
          { text: 'Train', emoji: '🚂', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which vehicle has two wheels?',
        instructionTa: 'இரண்டு சக்கர வாகனம் எது? 🚲',
        options: [
          { text: 'Bicycle', emoji: '🚲', correct: true },
          { text: 'Bus', emoji: '🚌', correct: false },
          { text: 'Truck', emoji: '🚚', correct: false }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'Good Habits',
    titleEn: 'Healthy & Safe',
    mascot: '🍎',
    color: 'from-teal-400 to-emerald-500',
    borderColor: 'border-teal-300',
    questions: [
      {
        type: 'choice',
        instruction: 'What should we do before eating?',
        instructionTa: 'சாப்பிடும் முன் நாம் என்ன செய்ய வேண்டும்? 🧼',
        options: [
          { text: 'Wash Hands', emoji: '🧼', correct: true },
          { text: 'Play with Mud', emoji: '⚽', correct: false },
          { text: 'Sleep', emoji: '🛏️', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which is healthy food?',
        instructionTa: 'ஆரோக்கியமான உணவு எது? 🍎',
        options: [
          { text: 'Apple', emoji: '🍎', correct: true },
          { text: 'Chocolate', emoji: '🍫', correct: false },
          { text: 'Ice Cream', emoji: '🍦', correct: false }
        ]
      }
    ]
  }
];
"""

    # We can replace the current EVS_LEVELS array.
    # To do this safely, we find 'const EVS_LEVELS' and 'const MATH_LEVELS' and replace everything between them
    start_idx = content.find("const EVS_LEVELS: Level[] = [")
    end_idx = content.find("const MATH_LEVELS: Level[] = [")
    if start_idx != -1 and end_idx != -1:
        content = content[:start_idx] + evs_levels + "\n" + content[end_idx:]

    # Now let's fix the titles. The user mentioned they still see 'கணித சவால் (Math Quiz)' and 'Playful Math Adventures'
    title1 = """
                    {activeSubject === 'tamil' ? 'தமிழ் வினாடி-வினா' 
                     : activeSubject === 'english' ? 'English Quiz Arena' 
                     : activeSubject === 'evs' ? 'Environmental Studies'
                     : 'கணித சவால் (Math Quiz)'}
"""
    
    title1_target = """
                    {activeSubject === 'tamil' ? 'தமிழ் வினாடி-வினா' 
                     : activeSubject === 'english' ? 'English Quiz Arena' 
                     : activeSubject === 'evs' ? 'EVS Quiz Arena'
                     : 'கணித சவால் (Math Quiz)'}
"""

    if title1_target in content:
        content = content.replace(title1_target, title1.strip('\n'))
    else:
        # Fallback if my previous script didn't match
        fallback_target = """
                    {activeSubject === 'tamil' ? 'தமிழ் வினாடி-வினா' 
                     : activeSubject === 'english' ? 'English Quiz Arena' 
                     : 'கணித சவால் (Math Quiz)'}
"""
        if fallback_target in content:
            content = content.replace(fallback_target, title1.strip('\n'))

    title2 = """
                    {activeSubject === 'tamil' ? 'Tamil Quiz Arena' 
                     : activeSubject === 'english' ? 'Fun Spelling & Sorting' 
                     : activeSubject === 'evs' ? 'Nature, Health & Living'
                     : 'Playful Math Adventures'}
"""
    
    title2_target = """
                    {activeSubject === 'tamil' ? 'Tamil Quiz Arena' 
                     : activeSubject === 'english' ? 'Fun Spelling & Sorting' 
                     : activeSubject === 'evs' ? 'Nature & Science'
                     : 'Playful Math Adventures'}
"""

    if title2_target in content:
        content = content.replace(title2_target, title2.strip('\n'))
    else:
        # Fallback if my previous script didn't match
        fallback_target2 = """
                    {activeSubject === 'tamil' ? 'Tamil Quiz Arena' 
                     : activeSubject === 'english' ? 'Fun Spelling & Sorting' 
                     : 'Playful Math Adventures'}
"""
        if fallback_target2 in content:
            content = content.replace(fallback_target2, title2.strip('\n'))
            
    # Unlock 6 levels instead of 2
    unlocked_target = """    } else if (activeSubject === 'evs') {
      return [1, 2];"""
    unlocked_repl = """    } else if (activeSubject === 'evs') {
      return [1, 2, 3, 4, 5, 6];"""
    content = content.replace(unlocked_target, unlocked_repl)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Modifications done!")

if __name__ == '__main__':
    modify_file(r'd:\FreeLance\AI-LearningPortal\frontend\src\app\[locale]\student\Quiz\page.tsx')
