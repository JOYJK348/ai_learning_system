import os

def main():
    filepath = r"d:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/Quiz/page.tsx"
    if not os.path.exists(filepath):
        print("File not found!")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Define GK_LEVELS array and place it after EVS_LEVELS
    gk_levels_code = """
const GK_LEVELS: Level[] = [
  {
    id: 1,
    title: 'Myself & My World',
    titleEn: 'My Name & Identity',
    mascot: '🧒',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'choice',
        instruction: 'What do we use to SEE?',
        instructionTa: 'நாம் எதை வைத்துப் பார்க்கிறோம்? 👁️',
        options: [
          { text: 'Eyes', emoji: '👁️', correct: true },
          { text: 'Ears', emoji: '👂', correct: false },
          { text: 'Nose', emoji: '👃', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'How many hands do you have?',
        instructionTa: 'உனக்கு எத்தனை கைகள் உள்ளன? ✋',
        options: [
          { text: 'Two', emoji: '✋✋', correct: true },
          { text: 'One', emoji: '✋', correct: false },
          { text: 'Three', emoji: '✋✋✋', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'When do we wake up?',
        instructionTa: 'நாம் எப்போது தூங்கி எழுகிறோம்? ☀️',
        options: [
          { text: 'Morning', emoji: '☀️', correct: true },
          { text: 'Night', emoji: '🌙', correct: false },
          { text: 'Afternoon', emoji: '☁️', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What do you do at school?',
        instructionTa: 'பள்ளியில் நீங்கள் என்ன செய்வீர்கள்? 📚',
        options: [
          { text: 'Study', emoji: '📚', correct: true },
          { text: 'Sleep', emoji: '🛌', correct: false },
          { text: 'Bathe', emoji: '🛁', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What do we wear on our feet?',
        instructionTa: 'காலில் நாம் என்ன அணிவோம்? 👟',
        options: [
          { text: 'Shoes', emoji: '👟', correct: true },
          { text: 'Hat', emoji: '🎩', correct: false },
          { text: 'Gloves', emoji: '🧤', correct: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Colors Around Us',
    titleEn: 'Basic Colors & Matching',
    mascot: '🎨',
    color: 'from-purple-400 to-fuchsia-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'choice',
        instruction: 'What color is an apple?',
        instructionTa: 'ஆப்பிளின் நிறம் என்ன? 🍎',
        options: [
          { text: 'Red', emoji: '🔴', correct: true },
          { text: 'Blue', emoji: '🔵', correct: false },
          { text: 'Yellow', emoji: '🟡', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What color is the sun?',
        instructionTa: 'சூரியனின் நிறம் என்ன? ☀️',
        options: [
          { text: 'Yellow', emoji: '🟡', correct: true },
          { text: 'Green', emoji: '🟢', correct: false },
          { text: 'Purple', emoji: '🟣', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What color is grass?',
        instructionTa: 'புல்லின் நிறம் என்ன? 🌿',
        options: [
          { text: 'Green', emoji: '🟢', correct: true },
          { text: 'Red', emoji: '🔴', correct: false },
          { text: 'Black', emoji: '⚫', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What color is the sky?',
        instructionTa: 'வானத்தின் நிறம் என்ன? ☁️',
        options: [
          { text: 'Blue', emoji: '🔵', correct: true },
          { text: 'Orange', emoji: '🟠', correct: false },
          { text: 'White', emoji: '⚪', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What color is milk?',
        instructionTa: 'பாலின் நிறம் என்ன? 🥛',
        options: [
          { text: 'White', emoji: '⚪', correct: true },
          { text: 'Yellow', emoji: '🟡', correct: false },
          { text: 'Pink', emoji: '💗', correct: false }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Animal World',
    titleEn: 'Animals & Birds',
    mascot: '🦁',
    color: 'from-green-400 to-emerald-500',
    borderColor: 'border-green-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which animal is the king of the jungle?',
        instructionTa: 'காட்டின் ராஜா யார்? 🦁',
        options: [
          { text: 'Lion', emoji: '🦁', correct: true },
          { text: 'Cat', emoji: '🐱', correct: false },
          { text: 'Rabbit', emoji: '🐰', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which animal gives us milk?',
        instructionTa: 'நமக்குப் பால் தரும் விலங்கு எது? 🥛',
        options: [
          { text: 'Cow', emoji: '🐄', correct: true },
          { text: 'Lion', emoji: '🦁', correct: false },
          { text: 'Tiger', emoji: '🐯', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which is the tallest animal?',
        instructionTa: 'மிக உயரமான விலங்கு எது? 🦒',
        options: [
          { text: 'Giraffe', emoji: '🦒', correct: true },
          { text: 'Dog', emoji: '🐶', correct: false },
          { text: 'Pig', emoji: '🐷', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which animal has a trunk?',
        instructionTa: 'தும்பிக்கை கொண்ட விலங்கு எது? 🐘',
        options: [
          { text: 'Elephant', emoji: '🐘', correct: true },
          { text: 'Monkey', emoji: '🐒', correct: false },
          { text: 'Horse', emoji: '🐴', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which animal barks?',
        instructionTa: 'குரைக்கும் விலங்கு எது? 🐶',
        options: [
          { text: 'Dog', emoji: '🐶', correct: true },
          { text: 'Cat', emoji: '🐱', correct: false },
          { text: 'Cow', emoji: '🐄', correct: false }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Around The World',
    titleEn: 'Places & Helpers',
    mascot: '🌍',
    color: 'from-blue-400 to-sky-500',
    borderColor: 'border-blue-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Where do we go when we are sick?',
        instructionTa: 'உடல்நிலை சரியில்லாத போது நாம் எங்கு செல்வோம்? 🏥',
        options: [
          { text: 'Hospital', emoji: '🏥', correct: true },
          { text: 'Toy Shop', emoji: '🧸', correct: false },
          { text: 'Park', emoji: '🛝', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Who teaches you at school?',
        instructionTa: 'பள்ளியில் உங்களுக்கு பாடம் நடத்துபவர் யார்? 👩‍🏫',
        options: [
          { text: 'Teacher', emoji: '👩‍🏫', correct: true },
          { text: 'Police', emoji: '👮', correct: false },
          { text: 'Chef', emoji: 'Chef', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Who catches thieves?',
        instructionTa: 'திருடர்களைப் பிடிப்பவர் யார்? 👮',
        options: [
          { text: 'Police', emoji: '👮', correct: true },
          { text: 'Doctor', emoji: '🧑‍⚕️', correct: false },
          { text: 'Postman', emoji: '📬', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Where do we go to buy toys?',
        instructionTa: 'பொம்மைகள் வாங்க நாம் எங்கு செல்வோம்? 🛍️',
        options: [
          { text: 'Shop', emoji: '🛍️', correct: true },
          { text: 'Hospital', emoji: '🏥', correct: false },
          { text: 'School', emoji: '🏫', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Who flies an aeroplane?',
        instructionTa: 'விமானத்தை ஓட்டுபவர் யார்? ✈️',
        options: [
          { text: 'Pilot', emoji: '🧑‍✈️', correct: true },
          { text: 'Driver', emoji: '🚗', correct: false },
          { text: 'Sailor', emoji: '⛵', correct: false }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Safety & Rules',
    titleEn: 'Road Safety & Manners',
    mascot: '🚦',
    color: 'from-rose-400 to-red-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'choice',
        instruction: 'What does RED light say?',
        instructionTa: 'சிகப்பு விளக்கு என்ன சொல்கிறது? 🔴',
        options: [
          { text: 'Stop', emoji: '🛑', correct: true },
          { text: 'Go', emoji: '🟢', correct: false },
          { text: 'Wait', emoji: '🟡', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What does GREEN light say?',
        instructionTa: 'பச்சை விளக்கு என்ன சொல்கிறது? 🟢',
        options: [
          { text: 'Go', emoji: '🟢', correct: true },
          { text: 'Stop', emoji: '🛑', correct: false },
          { text: 'Wait', emoji: '🟡', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Where should we cross the road?',
        instructionTa: 'நாம் சாலையை எங்கே கடக்க வேண்டும்? 🦓',
        options: [
          { text: 'Zebra Crossing', emoji: '🦓', correct: true },
          { text: 'Middle of road', emoji: '🛣️', correct: false },
          { text: 'Anywhere', emoji: '🤷', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What do you say when you get a gift?',
        instructionTa: 'அன்பளிப்பு கிடைக்கும்போது என்ன சொல்ல வேண்டும்? 🙏',
        options: [
          { text: 'Thank You', emoji: '🙏', correct: true },
          { text: 'Sorry', emoji: '😢', correct: false },
          { text: 'Please', emoji: '🥺', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What do you say when you make a mistake?',
        instructionTa: 'தவறு செய்யும்போது என்ன சொல்ல வேண்டும்? 😢',
        options: [
          { text: 'Sorry', emoji: '😢', correct: true },
          { text: 'Thank You', emoji: '🙏', correct: false },
          { text: 'Bye', emoji: '👋', correct: false }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'Fun Knowledge',
    titleEn: 'Sky & Celebrations',
    mascot: '✨',
    color: 'from-yellow-400 to-amber-500',
    borderColor: 'border-yellow-300',
    questions: [
      {
        type: 'choice',
        instruction: 'What do we see in the sky during the day?',
        instructionTa: 'பகலில் வானத்தில் நாம் எதைப் பார்க்கிறோம்? ☀️',
        options: [
          { text: 'Sun', emoji: '☀️', correct: true },
          { text: 'Stars', emoji: '⭐', correct: false },
          { text: 'Moon', emoji: '🌙', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which shape has three sides?',
        instructionTa: 'மூன்று பக்கங்களைக் கொண்ட வடிவம் எது? 🔺',
        options: [
          { text: 'Triangle', emoji: '🔺', correct: true },
          { text: 'Circle', emoji: '🔴', correct: false },
          { text: 'Square', emoji: '🟩', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What is the shape of a coin?',
        instructionTa: 'நாணயத்தின் வடிவம் என்ன? 🪙',
        options: [
          { text: 'Circle', emoji: '🪙', correct: true },
          { text: 'Triangle', emoji: '🔺', correct: false },
          { text: 'Star', emoji: '⭐', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'When do we see stars in the sky?',
        instructionTa: 'வானத்தில் நட்சத்திரங்களை எப்போது பார்க்கிறோம்? 🌙',
        options: [
          { text: 'Night', emoji: '🌙', correct: true },
          { text: 'Morning', emoji: '☀️', correct: false },
          { text: 'Afternoon', emoji: '☁️', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which festival is the festival of lights?',
        instructionTa: 'விளக்குகளின் திருவிழா எது? 🪔',
        options: [
          { text: 'Diwali', emoji: '🪔', correct: true },
          { text: 'Christmas', emoji: '🎄', correct: false },
          { text: 'Birthday', emoji: '🎂', correct: false }
        ]
      }
    ]
  }
];
"""
    # Insert it right before MATH_LEVELS declaration
    math_levels_start = "const MATH_LEVELS: Level[] = ["
    if math_levels_start in content and "const GK_LEVELS" not in content:
        content = content.replace(math_levels_start, gk_levels_code + "\n" + math_levels_start)
        print("GK_LEVELS added to page.tsx")

    # 2. Update state definition of activeSubject
    old_state = "const [activeSubject, setActiveSubject] = useState<'tamil' | 'english' | 'math' | 'evs'>('tamil');"
    new_state = "const [activeSubject, setActiveSubject] = useState<'tamil' | 'english' | 'math' | 'evs' | 'gk'>('tamil');"
    content = content.replace(old_state, new_state)

    # 3. Add unlockedLevels condition for gk
    evs_unlocked_block = """    } else if (activeSubject === 'evs') {
      const evsSubject = subjects.find(s => 
        s.name.toLowerCase().includes('evs') || 
        s.name.toLowerCase().includes('environmental')
      );
      if (!evsSubject) {
        return [1];
      }

      const isLessonCompleted = (lessonId: string): boolean => {
        const lesson = evsSubject.chapters
          .flatMap(c => c.lessons)
          .find(l => l.id === lessonId);
        return lesson?.progress?.status === 'completed';
      };

      const unlocked: number[] = [];
      const mappings: Record<number, string> = {
        1: '0d6b2ccc-01e0-4496-b30f-e6f7f5be3d21',
        2: 'a22e6df2-ff59-418b-89b2-2c39d7d72901',
        3: '5cc91f99-b121-4baa-813d-61260abbdffa',
        4: '2b200e99-464a-45df-839b-ac3282fb07a1',
        5: '66df4a08-281d-4aa3-917a-722de6658a79',
        6: '092a2e60-8ab5-4833-b948-056641af9df7',
      };
      Object.entries(mappings).forEach(([lvlId, lesId]) => {
        if (isLessonCompleted(lesId)) {
          unlocked.push(Number(lvlId));
        }
      });
      if (unlocked.length === 0) {
        unlocked.push(1);
      }
      return unlocked;"""

    gk_unlocked_block = """    } else if (activeSubject === 'gk') {
      const gkSubject = subjects.find(s => 
        s.name.toLowerCase().includes('gk') || 
        s.name.toLowerCase().includes('general knowledge')
      );
      if (!gkSubject) {
        return [1];
      }

      const isLessonCompleted = (lessonId: string): boolean => {
        const lesson = gkSubject.chapters
          .flatMap(c => c.lessons)
          .find(l => l.id === lessonId);
        return lesson?.progress?.status === 'completed';
      };

      const unlocked: number[] = [];
      const mappings: Record<number, string> = {
        1: '03aebd95-bb93-4bc6-b798-bd6a633479e3',
        2: 'ea05392e-4a72-493b-bad7-340a97f55a33',
        3: 'a8ae08aa-2adb-454e-b591-d57edc838ee7',
        4: '88fcbba2-8e90-4e22-b5a2-1b78ace2b249',
        5: '45bcf53f-e78c-4844-a154-c4154cd2fbf5',
        6: 'c41443c3-2451-443b-90cc-cd2aa6894c22',
      };
      Object.entries(mappings).forEach(([lvlId, lesId]) => {
        if (isLessonCompleted(lesId)) {
          unlocked.push(Number(lvlId));
        }
      });
      if (unlocked.length === 0) {
        unlocked.push(1);
      }
      return unlocked;"""

    # We insert gk_unlocked_block right after evs_unlocked_block
    if evs_unlocked_block in content and gk_unlocked_block not in content:
        content = content.replace(evs_unlocked_block, evs_unlocked_block + "\n" + gk_unlocked_block)
        print("GK unlocked block added")

    # 4. Add gkMappings in useEffect for loading scores
    evs_mappings_def = """    const evsMappings: Record<number, string> = {
      1: '0d6b2ccc-01e0-4496-b30f-e6f7f5be3d21',
      2: 'a22e6df2-ff59-418b-89b2-2c39d7d72901',
      3: '5cc91f99-b121-4baa-813d-61260abbdffa',
      4: '2b200e99-464a-45df-839b-ac3282fb07a1',
      5: '66df4a08-281d-4aa3-917a-722de6658a79',
      6: '092a2e60-8ab5-4833-b948-056641af9df7',
    };"""

    gk_mappings_def = """    const gkMappings: Record<number, string> = {
      1: '03aebd95-bb93-4bc6-b798-bd6a633479e3',
      2: 'ea05392e-4a72-493b-bad7-340a97f55a33',
      3: 'a8ae08aa-2adb-454e-b591-d57edc838ee7',
      4: '88fcbba2-8e90-4e22-b5a2-1b78ace2b249',
      5: '45bcf53f-e78c-4844-a154-c4154cd2fbf5',
      6: 'c41443c3-2451-443b-90cc-cd2aa6894c22',
    };"""

    if evs_mappings_def in content and gk_mappings_def not in content:
        content = content.replace(evs_mappings_def, evs_mappings_def + "\n\n" + gk_mappings_def)
        print("gkMappings added to useEffect")

    mappings_ternary = """    const mappings = activeSubject === 'tamil' ? tamilMappings 
                     : activeSubject === 'english' ? englishMappings 
                     : activeSubject === 'evs' ? evsMappings
                     : mathMappings;"""

    new_mappings_ternary = """    const mappings = activeSubject === 'tamil' ? tamilMappings 
                     : activeSubject === 'english' ? englishMappings 
                     : activeSubject === 'evs' ? evsMappings
                     : activeSubject === 'gk' ? gkMappings
                     : mathMappings;"""

    content = content.replace(mappings_ternary, new_mappings_ternary)

    # 5. Add gkMappings in handleQuizComplete
    evs_mappings_def2 = """            const evsMappings: Record<number, string> = {
              1: '0d6b2ccc-01e0-4496-b30f-e6f7f5be3d21',
              2: 'a22e6df2-ff59-418b-89b2-2c39d7d72901',
              3: '5cc91f99-b121-4baa-813d-61260abbdffa',
              4: '2b200e99-464a-45df-839b-ac3282fb07a1',
              5: '66df4a08-281d-4aa3-917a-722de6658a79',
              6: '092a2e60-8ab5-4833-b948-056641af9df7',
            };"""

    gk_mappings_def2 = """            const gkMappings: Record<number, string> = {
              1: '03aebd95-bb93-4bc6-b798-bd6a633479e3',
              2: 'ea05392e-4a72-493b-bad7-340a97f55a33',
              3: 'a8ae08aa-2adb-454e-b591-d57edc838ee7',
              4: '88fcbba2-8e90-4e22-b5a2-1b78ace2b249',
              5: '45bcf53f-e78c-4844-a154-c4154cd2fbf5',
              6: 'c41443c3-2451-443b-90cc-cd2aa6894c22',
            };"""

    if evs_mappings_def2 in content and gk_mappings_def2 not in content:
        content = content.replace(evs_mappings_def2, evs_mappings_def2 + "\n\n" + gk_mappings_def2)
        print("gkMappings added to handleQuizComplete")

    mappings_ternary2 = """            const mappings = activeSubject === 'tamil' ? tamilMappings 
                             : activeSubject === 'english' ? englishMappings 
                             : activeSubject === 'evs' ? evsMappings
                             : mathMappings;"""

    new_mappings_ternary2 = """            const mappings = activeSubject === 'tamil' ? tamilMappings 
                             : activeSubject === 'english' ? englishMappings 
                             : activeSubject === 'evs' ? evsMappings
                             : activeSubject === 'gk' ? gkMappings
                             : mathMappings;"""

    content = content.replace(mappings_ternary2, new_mappings_ternary2)

    # 6. Add isGkQuiz variable in categoriesFromAPI
    evs_quiz_def = "    const isEvsQuiz = s.name.toLowerCase().includes('environmental') || s.name.toLowerCase().includes('evs');"
    gk_quiz_def = "    const isGkQuiz = s.name.toLowerCase().includes('gk') || s.name.toLowerCase().includes('general knowledge');"
    content = content.replace(evs_quiz_def, evs_quiz_def + "\n" + gk_quiz_def)

    # Update color / border mapping
    old_color_border = """      color: isTamilQuiz ? 'bg-emerald-100 text-emerald-600' : isEnglishQuiz ? 'bg-amber-105 text-amber-600' : isMathQuiz ? 'bg-indigo-100 text-indigo-650' : isEvsQuiz ? 'bg-lime-100 text-lime-650' : ['bg-rose-100 text-rose-500', 'bg-blue-100 text-blue-500', 'bg-emerald-100 text-emerald-500', 'bg-amber-100 text-amber-500'][idx % 4],
      border: isTamilQuiz ? 'border-emerald-300' : isEnglishQuiz ? 'border-amber-300' : isMathQuiz ? 'border-indigo-300' : isEvsQuiz ? 'border-lime-300' : ['border-rose-200', 'border-blue-200', 'border-emerald-200', 'border-amber-200'][idx % 4],"""

    new_color_border = """      color: isTamilQuiz ? 'bg-emerald-100 text-emerald-600' : isEnglishQuiz ? 'bg-amber-105 text-amber-600' : isMathQuiz ? 'bg-indigo-100 text-indigo-650' : isEvsQuiz ? 'bg-lime-100 text-lime-650' : isGkQuiz ? 'bg-purple-100 text-purple-650' : ['bg-rose-100 text-rose-500', 'bg-blue-100 text-blue-500', 'bg-emerald-100 text-emerald-500', 'bg-amber-100 text-amber-500'][idx % 4],
      border: isTamilQuiz ? 'border-emerald-300' : isEnglishQuiz ? 'border-amber-300' : isMathQuiz ? 'border-indigo-300' : isEvsQuiz ? 'border-lime-300' : isGkQuiz ? 'border-purple-300' : ['border-rose-200', 'border-blue-200', 'border-emerald-200', 'border-amber-200'][idx % 4],"""

    content = content.replace(old_color_border, new_color_border)

    old_return_flags = """      isMathQuiz: isMathQuiz,
      isEvsQuiz: isEvsQuiz"""
    new_return_flags = """      isMathQuiz: isMathQuiz,
      isEvsQuiz: isEvsQuiz,
      isGkQuiz: isGkQuiz"""
    content = content.replace(old_return_flags, new_return_flags)

    # 7. Update displayedCategories.map click and render flags
    old_click_evs = """                              } else if (zone.isEvsQuiz) {
                                setActiveSubject('evs');
                                setView('levels');
                              } else {"""
    new_click_evs = """                              } else if (zone.isEvsQuiz) {
                                setActiveSubject('evs');
                                setView('levels');
                              } else if (zone.isGkQuiz) {
                                setActiveSubject('gk');
                                setView('levels');
                              } else {"""
    content = content.replace(old_click_evs, new_click_evs)

    old_render_evs = """                                    ) : zone.isEvsQuiz ? (
                                      <span className="text-6xl select-none">🌍</span>
                                    ) : ("""
    new_render_evs = """                                    ) : zone.isEvsQuiz ? (
                                      <span className="text-6xl select-none">🌍</span>
                                    ) : zone.isGkQuiz ? (
                                      <span className="text-6xl select-none">🧠</span>
                                    ) : ("""
    content = content.replace(old_render_evs, new_render_evs)

    old_spacer_checks = """                                {(isTamilCloud || zone.isEnglishQuiz || zone.isMathQuiz || zone.isEvsQuiz) && ("""
    new_spacer_checks = """                                {(isTamilCloud || zone.isEnglishQuiz || zone.isMathQuiz || zone.isEvsQuiz || zone.isGkQuiz) && ("""
    content = content.replace(old_spacer_checks, new_spacer_checks)

    old_spacer_checks2 = """                                {!(isTamilCloud || zone.isEnglishQuiz || zone.isMathQuiz || zone.isEvsQuiz) && <div className="h-6" />}"""
    new_spacer_checks2 = """                                {!(isTamilCloud || zone.isEnglishQuiz || zone.isMathQuiz || zone.isEvsQuiz || zone.isGkQuiz) && <div className="h-6" />}"""
    content = content.replace(old_spacer_checks2, new_spacer_checks2)

    # 8. Update header/subheader titles
    old_header = """                    {activeSubject === 'tamil' ? 'தமிழ் வினாடி-வினா' 
                     : activeSubject === 'english' ? 'English Quiz Arena' 
                     : activeSubject === 'evs' ? 'Environmental Studies'
                     : 'கணித சவால் (Math Quiz)'}"""
    
    new_header = """                    {activeSubject === 'tamil' ? 'தமிழ் வினாடி-வினா' 
                     : activeSubject === 'english' ? 'English Quiz Arena' 
                     : activeSubject === 'evs' ? 'Environmental Studies'
                     : activeSubject === 'gk' ? 'General Knowledge'
                     : 'கணித சவால் (Math Quiz)'}"""
    content = content.replace(old_header, new_header)

    old_subheader = """                    {activeSubject === 'tamil' ? 'Tamil Quiz Arena' 
                     : activeSubject === 'english' ? 'Fun Spelling & Sorting' 
                     : activeSubject === 'evs' ? 'Nature, Health & Living'
                     : 'Playful Math Adventures'}"""

    new_subheader = """                    {activeSubject === 'tamil' ? 'Tamil Quiz Arena' 
                     : activeSubject === 'english' ? 'Fun Spelling & Sorting' 
                     : activeSubject === 'evs' ? 'Nature, Health & Living'
                     : activeSubject === 'gk' ? 'Discover & Learn'
                     : 'Playful Math Adventures'}"""
    content = content.replace(old_subheader, new_subheader)

    # 9. Update Levels select mapping in rendering block
    old_levels_map = "{(activeSubject === 'tamil' ? TAMIL_LEVELS : activeSubject === 'english' ? ENGLISH_LEVELS : activeSubject === 'evs' ? EVS_LEVELS : MATH_LEVELS).map((level, index) => {"
    new_levels_map = "{(activeSubject === 'tamil' ? TAMIL_LEVELS : activeSubject === 'english' ? ENGLISH_LEVELS : activeSubject === 'evs' ? EVS_LEVELS : activeSubject === 'gk' ? GK_LEVELS : MATH_LEVELS).map((level, index) => {"
    content = content.replace(old_levels_map, new_levels_map)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        print("GK changes successfully written to page.tsx!")

if __name__ == "__main__":
    main()
