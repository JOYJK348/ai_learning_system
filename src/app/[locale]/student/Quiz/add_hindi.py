import os

def main():
    filepath = r"d:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/Quiz/page.tsx"
    if not os.path.exists(filepath):
        print("File not found!")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Define HINDI_LEVELS array and place it after GK_LEVELS (which ends before MATH_LEVELS starts)
    hindi_levels_code = """
const HINDI_LEVELS: Level[] = [
  {
    id: 1,
    title: 'पूर्व लेखन अभ्यास',
    titleEn: 'Pre-writing Strokes',
    mascot: '✏️',
    color: 'from-blue-400 to-indigo-500',
    borderColor: 'border-blue-300',
    questions: [
      {
        type: 'choice',
        instruction: 'What does a Standing Line look like?',
        instructionTa: 'খड़ी रेखा (Standing Line) कैसी दिखती है? 📏',
        options: [
          { text: '| (Standing)', emoji: '📏', correct: true },
          { text: '— (Sleeping)', emoji: '📏', correct: false },
          { text: '/ (Slanting)', emoji: '📏', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What does a Sleeping Line look like?',
        instructionTa: 'लेटी रेखा (Sleeping Line) कैसी दिखती है? 📏',
        options: [
          { text: '— (Sleeping)', emoji: '📏', correct: true },
          { text: '| (Standing)', emoji: '📏', correct: false },
          { text: '/ (Slanting)', emoji: '📏', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What does a Slanting Line look like?',
        instructionTa: 'तिरछी रेखा (Slanting Line) कैसी दिखती है? 📏',
        options: [
          { text: '/ (Slanting)', emoji: '📏', correct: true },
          { text: '| (Standing)', emoji: '📏', correct: false },
          { text: '— (Sleeping)', emoji: '📏', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What does a Curve Line look like?',
        instructionTa: 'वक्र रेखा (Curve Line) कैसी दिखती है? ︶',
        options: [
          { text: '︶ (Curve)', emoji: '︶', correct: true },
          { text: '| (Standing)', emoji: '📏', correct: false },
          { text: '— (Sleeping)', emoji: '📏', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What do we use to write on slate?',
        instructionTa: 'लिखने के लिए क्या इस्तेमाल करते हैं? ✏️',
        options: [
          { text: 'Pencil', emoji: '✏️', correct: true },
          { text: 'Toy', emoji: '🧸', correct: false },
          { text: 'Spoon', emoji: '🥄', correct: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'स्वर',
    titleEn: 'Hindi Vowels',
    mascot: '🅰️',
    color: 'from-rose-400 to-red-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'choice',
        instruction: "What starts with 'अ' (A)?",
        instructionTa: "'अ' से क्या शुरू होता है? 🍎",
        options: [
          { text: 'Anar (Pomegranate)', emoji: '🍎', correct: true },
          { text: 'Aam (Mango)', emoji: '🥭', correct: false },
          { text: 'Imli (Tamarind)', emoji: '🍇', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: "What starts with 'आ' (Aa)?",
        instructionTa: "'आ' से क्या शुरू होता है? 🥭",
        options: [
          { text: 'Aam (Mango)', emoji: '🥭', correct: true },
          { text: 'Anar (Pomegranate)', emoji: '🍎', correct: false },
          { text: 'Imli (Tamarind)', emoji: '🍇', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: "What starts with 'इ' (I)?",
        instructionTa: "'इ' से क्या शुरू होता है? 🍇",
        options: [
          { text: 'Imli (Tamarind)', emoji: '🍇', correct: true },
          { text: 'Aam (Mango)', emoji: '🥭', correct: false },
          { text: 'Anar (Pomegranate)', emoji: '🍎', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: "What starts with 'ई' (Ee)?",
        instructionTa: "'ई' से क्या शुरू होता है? 🌾",
        options: [
          { text: 'Eekh (Sugarcane)', emoji: '🌾', correct: true },
          { text: 'Aam (Mango)', emoji: '🥭', correct: false },
          { text: 'Imli (Tamarind)', emoji: '🍇', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: "What starts with 'उ' (U)?",
        instructionTa: "'उ' से क्या शुरू होता है? 🦉",
        options: [
          { text: 'Ullu (Owl)', emoji: '🦉', correct: true },
          { text: 'Aam (Mango)', emoji: '🥭', correct: false },
          { text: 'Anar (Pomegranate)', emoji: '🍎', correct: false }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'व्यंजन',
    titleEn: 'Hindi Consonants',
    mascot: '🦁',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'choice',
        instruction: "What starts with 'क' (Ka)?",
        instructionTa: "'क' से क्या शुरू होता है? 🐦",
        options: [
          { text: 'Kabootar (Pigeon)', emoji: '🐦', correct: true },
          { text: 'Khargosh (Rabbit)', emoji: '🐇', correct: false },
          { text: 'Gamla (Flowerpot)', emoji: '🪴', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: "What starts with 'ख' (Kha)?",
        instructionTa: "'ख' से क्या शुरू होता है? 🐇",
        options: [
          { text: 'Khargosh (Rabbit)', emoji: '🐇', correct: true },
          { text: 'Kabootar (Pigeon)', emoji: '🐦', correct: false },
          { text: 'Gamla (Flowerpot)', emoji: '🪴', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: "What starts with 'ग' (Ga)?",
        instructionTa: "'ग' से क्या शुरू होता है? 🪴",
        options: [
          { text: 'Gamla (Flowerpot)', emoji: '🪴', correct: true },
          { text: 'Kabootar (Pigeon)', emoji: '🐦', correct: false },
          { text: 'Khargosh (Rabbit)', emoji: '🐇', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: "What starts with 'घ' (Gha)?",
        instructionTa: "'घ' से क्या शुरू होता है? 🏠",
        options: [
          { text: 'Ghar (House)', emoji: '🏠', correct: true },
          { text: 'Kabootar (Pigeon)', emoji: '🐦', correct: false },
          { text: 'Gamla (Flowerpot)', emoji: '🪴', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: "What starts with 'च' (Cha)?",
        instructionTa: "'च' से क्या शुरू होता है? 🥄",
        options: [
          { text: 'Chammach (Spoon)', emoji: '🥄', correct: true },
          { text: 'Ghar (House)', emoji: '🏠', correct: false },
          { text: 'Gamla (Flowerpot)', emoji: '🪴', correct: false }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'सरल शब्द',
    titleEn: 'Simple Hindi Words',
    mascot: '🏠',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      {
        type: 'choice',
        instruction: "What is the meaning of 'घर' (Ghar)?",
        instructionTa: "'घर' (Ghar) का मतलब क्या है? 🏠",
        options: [
          { text: 'House', emoji: '🏠', correct: true },
          { text: 'Water', emoji: '💧', correct: false },
          { text: 'Fruit', emoji: '🍎', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: "What is the meaning of 'फल' (Phal)?",
        instructionTa: "'फल' (Phal) का मतलब क्या है? 🍎",
        options: [
          { text: 'Fruit', emoji: '🍎', correct: true },
          { text: 'House', emoji: '🏠', correct: false },
          { text: 'Water', emoji: '💧', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: "What is the meaning of 'जल' (Jal)?",
        instructionTa: "'जल' (Jal) का मतलब क्या है? 💧",
        options: [
          { text: 'Water', emoji: '💧', correct: true },
          { text: 'House', emoji: '🏠', correct: false },
          { text: 'Fruit', emoji: '🍎', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: "What is the meaning of 'वन' (Van)?",
        instructionTa: "'वन' (Van) का मतलब क्या है? 🌳",
        options: [
          { text: 'Forest', emoji: '🌳', correct: true },
          { text: 'Water', emoji: '💧', correct: false },
          { text: 'House', emoji: '🏠', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: "What is the meaning of 'बस' (Bus)?",
        instructionTa: "'बस' (Bus) का मतलब क्या है? 🚌",
        options: [
          { text: 'Bus', emoji: '🚌', correct: true },
          { text: 'House', emoji: '🏠', correct: false },
          { text: 'Water', emoji: '💧', correct: false }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'बोलना',
    titleEn: 'Greetings & Manners',
    mascot: '🙏',
    color: 'from-cyan-400 to-blue-500',
    borderColor: 'border-cyan-300',
    questions: [
      {
        type: 'choice',
        instruction: "What do we do when saying 'Namaste'?",
        instructionTa: "नमस्ते (Namaste) करते समय क्या करते हैं? 🙏",
        options: [
          { text: 'Fold Hands', emoji: '🙏', correct: true },
          { text: 'Run', emoji: '🏃', correct: false },
          { text: 'Sleep', emoji: '🛌', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What do we say in the morning?',
        instructionTa: 'सुबह उठकर क्या बोलते हैं? ☀️',
        options: [
          { text: 'Suprabhat (Good Morning)', emoji: '☀️', correct: true },
          { text: 'Shubhratri (Good Night)', emoji: '🌙', correct: false },
          { text: 'Dhanyavad (Thank You)', emoji: '🙏', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What do we say before sleeping at night?',
        instructionTa: 'रात को सोने से पहले क्या बोलते हैं? 🌙',
        options: [
          { text: 'Shubhratri (Good Night)', emoji: '🌙', correct: true },
          { text: 'Suprabhat (Good Morning)', emoji: '☀️', correct: false },
          { text: 'Namaste', emoji: '🙏', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What do we say when someone helps us?',
        instructionTa: 'जब कोई हमारी मदद करता है तो क्या बोलते हैं? 🙏',
        options: [
          { text: 'Dhanyavad (Thank You)', emoji: '🙏', correct: true },
          { text: 'Namaste', emoji: '🙏', correct: false },
          { text: 'Suprabhat', emoji: '☀️', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: "What do we call 'Mother' in Hindi?",
        instructionTa: "परिवार में माँ को क्या बोलते हैं? 👩",
        options: [
          { text: 'Mataji / Maa', emoji: '👩', correct: true },
          { text: 'Pitaji', emoji: '👨', correct: false },
          { text: 'Bhaiya', emoji: '👦', correct: false }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'कविताएँ और कहानियाँ',
    titleEn: 'Poems & Stories',
    mascot: '🎶',
    color: 'from-teal-400 to-emerald-500',
    borderColor: 'border-teal-300',
    questions: [
      {
        type: 'choice',
        instruction: "What is the life of 'Machhli' (Fish)?",
        instructionTa: "'मछली जल की रानी है', उसका जीवन क्या है? 💧",
        options: [
          { text: 'Pani (Water)', emoji: '💧', correct: true },
          { text: 'Hawa (Air)', emoji: '💨', correct: false },
          { text: 'Mitti (Soil)', emoji: '🪵', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What happens if you touch the fish?',
        instructionTa: 'मछली को हाथ लगाओगे तो क्या होगा? 🐟',
        options: [
          { text: 'Dar jaegi (Will get scared)', emoji: '🐟', correct: true },
          { text: 'So jaegi (Will sleep)', emoji: '🛌', correct: false },
          { text: 'Hasegi (Will laugh)', emoji: '😀', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: "Where does 'Chanda Mama' live?",
        instructionTa: "चंदा मामा कहाँ रहते हैं? 🌌",
        options: [
          { text: 'Aasman (Sky)', emoji: '🌌', correct: true },
          { text: 'Pani (Water)', emoji: '💧', correct: false },
          { text: 'Ghar (House)', emoji: '🏠', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What sound does a Lion make?',
        instructionTa: 'शेर की आवाज़ कैसी होती है? 🦁',
        options: [
          { text: 'Dahadna (Roaring)', emoji: '🦁', correct: true },
          { text: 'Meow', emoji: '🐱', correct: false },
          { text: 'Bow-bow', emoji: '🐶', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: "What does the 'Thirsty Crow' throw in the pot?",
        instructionTa: 'प्यासा कौआ घड़े में क्या डालता है? 🪨',
        options: [
          { text: 'Kankar (Pebbles)', emoji: '🪨', correct: true },
          { text: 'Pani (Water)', emoji: '💧', correct: false },
          { text: 'Phal (Fruit)', emoji: '🍎', correct: false }
        ]
      }
    ]
  }
];
"""
    # Insert it right before MATH_LEVELS declaration
    math_levels_start = "const MATH_LEVELS: Level[] = ["
    if math_levels_start in content and "const HINDI_LEVELS" not in content:
        content = content.replace(math_levels_start, hindi_levels_code + "\n" + math_levels_start)
        print("HINDI_LEVELS added to page.tsx")

    # 2. Update state definition of activeSubject
    old_state = "const [activeSubject, setActiveSubject] = useState<'tamil' | 'english' | 'math' | 'evs' | 'gk'>('tamil');"
    new_state = "const [activeSubject, setActiveSubject] = useState<'tamil' | 'english' | 'math' | 'evs' | 'gk' | 'hindi'>('tamil');"
    content = content.replace(old_state, new_state)

    # 3. Add unlockedLevels condition for hindi
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

    hindi_unlocked_block = """    } else if (activeSubject === 'hindi') {
      const hindiSubject = subjects.find(s => 
        s.name.toLowerCase().includes('hindi') || 
        s.name.includes('हिन्दी')
      );
      if (!hindiSubject) {
        return [1];
      }

      const isLessonCompleted = (lessonId: string): boolean => {
        const lesson = hindiSubject.chapters
          .flatMap(c => c.lessons)
          .find(l => l.id === lessonId);
        return lesson?.progress?.status === 'completed';
      };

      const unlocked: number[] = [];
      const mappings: Record<number, string> = {
        1: 'd5bafdc2-6180-46cf-b84a-883c2b0dad08',
        2: 'f6fe8926-03ac-4a54-85ca-46359d2fcb88',
        3: 'a698e1c8-50d0-43c0-9cb5-882718447740',
        4: '4fc361c1-d830-4ebe-b0e2-e4cfb7085c92',
        5: 'd5ae93a6-0786-4d66-a59a-06c5eb0ca029',
        6: '5a169e75-fb5f-40d9-a1f2-eaa4f18435d3',
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

    if gk_unlocked_block in content and hindi_unlocked_block not in content:
        content = content.replace(gk_unlocked_block, gk_unlocked_block + "\n" + hindi_unlocked_block)
        print("Hindi unlocked block added")

    # 4. Add hindiMappings in useEffect for loading scores
    gk_mappings_def = """    const gkMappings: Record<number, string> = {
      1: '03aebd95-bb93-4bc6-b798-bd6a633479e3',
      2: 'ea05392e-4a72-493b-bad7-340a97f55a33',
      3: 'a8ae08aa-2adb-454e-b591-d57edc838ee7',
      4: '88fcbba2-8e90-4e22-b5a2-1b78ace2b249',
      5: '45bcf53f-e78c-4844-a154-c4154cd2fbf5',
      6: 'c41443c3-2451-443b-90cc-cd2aa6894c22',
    };"""

    hindi_mappings_def = """    const hindiMappings: Record<number, string> = {
      1: 'd5bafdc2-6180-46cf-b84a-883c2b0dad08',
      2: 'f6fe8926-03ac-4a54-85ca-46359d2fcb88',
      3: 'a698e1c8-50d0-43c0-9cb5-882718447740',
      4: '4fc361c1-d830-4ebe-b0e2-e4cfb7085c92',
      5: 'd5ae93a6-0786-4d66-a59a-06c5eb0ca029',
      6: '5a169e75-fb5f-40d9-a1f2-eaa4f18435d3',
    };"""

    if gk_mappings_def in content and hindi_mappings_def not in content:
        content = content.replace(gk_mappings_def, gk_mappings_def + "\n\n" + hindi_mappings_def)
        print("hindiMappings added to useEffect")

    mappings_ternary = """    const mappings = activeSubject === 'tamil' ? tamilMappings 
                     : activeSubject === 'english' ? englishMappings 
                     : activeSubject === 'evs' ? evsMappings
                     : activeSubject === 'gk' ? gkMappings
                     : mathMappings;"""

    new_mappings_ternary = """    const mappings = activeSubject === 'tamil' ? tamilMappings 
                     : activeSubject === 'english' ? englishMappings 
                     : activeSubject === 'evs' ? evsMappings
                     : activeSubject === 'gk' ? gkMappings
                     : activeSubject === 'hindi' ? hindiMappings
                     : mathMappings;"""

    content = content.replace(mappings_ternary, new_mappings_ternary)

    # 5. Add hindiMappings in handleQuizComplete
    gk_mappings_def2 = """            const gkMappings: Record<number, string> = {
              1: '03aebd95-bb93-4bc6-b798-bd6a633479e3',
              2: 'ea05392e-4a72-493b-bad7-340a97f55a33',
              3: 'a8ae08aa-2adb-454e-b591-d57edc838ee7',
              4: '88fcbba2-8e90-4e22-b5a2-1b78ace2b249',
              5: '45bcf53f-e78c-4844-a154-c4154cd2fbf5',
              6: 'c41443c3-2451-443b-90cc-cd2aa6894c22',
            };"""

    hindi_mappings_def2 = """            const hindiMappings: Record<number, string> = {
              1: 'd5bafdc2-6180-46cf-b84a-883c2b0dad08',
              2: 'f6fe8926-03ac-4a54-85ca-46359d2fcb88',
              3: 'a698e1c8-50d0-43c0-9cb5-882718447740',
              4: '4fc361c1-d830-4ebe-b0e2-e4cfb7085c92',
              5: 'd5ae93a6-0786-4d66-a59a-06c5eb0ca029',
              6: '5a169e75-fb5f-40d9-a1f2-eaa4f18435d3',
            };"""

    if gk_mappings_def2 in content and hindi_mappings_def2 not in content:
        content = content.replace(gk_mappings_def2, gk_mappings_def2 + "\n\n" + hindi_mappings_def2)
        print("hindiMappings added to handleQuizComplete")

    mappings_ternary2 = """            const mappings = activeSubject === 'tamil' ? tamilMappings 
                             : activeSubject === 'english' ? englishMappings 
                             : activeSubject === 'evs' ? evsMappings
                             : activeSubject === 'gk' ? gkMappings
                             : mathMappings;"""

    new_mappings_ternary2 = """            const mappings = activeSubject === 'tamil' ? tamilMappings 
                             : activeSubject === 'english' ? englishMappings 
                             : activeSubject === 'evs' ? evsMappings
                             : activeSubject === 'gk' ? gkMappings
                             : activeSubject === 'hindi' ? hindiMappings
                             : mathMappings;"""

    content = content.replace(mappings_ternary2, new_mappings_ternary2)

    # 6. Add isHindiQuiz variable in categoriesFromAPI
    gk_quiz_def = "    const isGkQuiz = s.name.toLowerCase().includes('gk') || s.name.toLowerCase().includes('general knowledge');"
    hindi_quiz_def = "    const isHindiQuiz = s.name.toLowerCase().includes('hindi') || s.name === 'Hindi' || s.name.includes('हिन्दी');"
    content = content.replace(gk_quiz_def, gk_quiz_def + "\n" + hindi_quiz_def)

    # Update color / border mapping
    old_color_border = """      color: isTamilQuiz ? 'bg-emerald-100 text-emerald-600' : isEnglishQuiz ? 'bg-amber-105 text-amber-600' : isMathQuiz ? 'bg-indigo-100 text-indigo-650' : isEvsQuiz ? 'bg-lime-100 text-lime-650' : isGkQuiz ? 'bg-purple-100 text-purple-650' : ['bg-rose-100 text-rose-500', 'bg-blue-100 text-blue-500', 'bg-emerald-100 text-emerald-500', 'bg-amber-100 text-amber-500'][idx % 4],
      border: isTamilQuiz ? 'border-emerald-300' : isEnglishQuiz ? 'border-amber-300' : isMathQuiz ? 'border-indigo-300' : isEvsQuiz ? 'border-lime-300' : isGkQuiz ? 'border-purple-300' : ['border-rose-200', 'border-blue-200', 'border-emerald-200', 'border-amber-200'][idx % 4],"""

    new_color_border = """      color: isTamilQuiz ? 'bg-emerald-100 text-emerald-600' : isEnglishQuiz ? 'bg-amber-105 text-amber-600' : isMathQuiz ? 'bg-indigo-100 text-indigo-650' : isEvsQuiz ? 'bg-lime-100 text-lime-650' : isGkQuiz ? 'bg-purple-100 text-purple-650' : isHindiQuiz ? 'bg-rose-100 text-rose-600' : ['bg-rose-100 text-rose-500', 'bg-blue-100 text-blue-500', 'bg-emerald-100 text-emerald-500', 'bg-amber-100 text-amber-500'][idx % 4],
      border: isTamilQuiz ? 'border-emerald-300' : isEnglishQuiz ? 'border-amber-300' : isMathQuiz ? 'border-indigo-300' : isEvsQuiz ? 'border-lime-300' : isGkQuiz ? 'border-purple-300' : isHindiQuiz ? 'border-rose-300' : ['border-rose-200', 'border-blue-200', 'border-emerald-200', 'border-amber-200'][idx % 4],"""

    content = content.replace(old_color_border, new_color_border)

    old_return_flags = """      isMathQuiz: isMathQuiz,
      isEvsQuiz: isEvsQuiz,
      isGkQuiz: isGkQuiz"""
    new_return_flags = """      isMathQuiz: isMathQuiz,
      isEvsQuiz: isEvsQuiz,
      isGkQuiz: isGkQuiz,
      isHindiQuiz: isHindiQuiz"""
    content = content.replace(old_return_flags, new_return_flags)

    # 7. Update displayedCategories.map click and render flags
    old_click_gk = """                              } else if (zone.isGkQuiz) {
                                setActiveSubject('gk');
                                setView('levels');
                              } else {"""
    new_click_gk = """                              } else if (zone.isGkQuiz) {
                                setActiveSubject('gk');
                                setView('levels');
                              } else if (zone.isHindiQuiz) {
                                setActiveSubject('hindi');
                                setView('levels');
                              } else {"""
    content = content.replace(old_click_gk, new_click_gk)

    old_render_gk = """                                    ) : zone.isGkQuiz ? (
                                      <span className="text-6xl select-none">🧠</span>
                                    ) : ("""
    new_render_gk = """                                    ) : zone.isGkQuiz ? (
                                      <span className="text-6xl select-none">🧠</span>
                                    ) : zone.isHindiQuiz ? (
                                      <span className="text-6xl select-none">🕉️</span>
                                    ) : ("""
    content = content.replace(old_render_gk, new_render_gk)

    old_spacer_checks = """                                {(isTamilCloud || zone.isEnglishQuiz || zone.isMathQuiz || zone.isEvsQuiz || zone.isGkQuiz) && ("""
    new_spacer_checks = """                                {(isTamilCloud || zone.isEnglishQuiz || zone.isMathQuiz || zone.isEvsQuiz || zone.isGkQuiz || zone.isHindiQuiz) && ("""
    content = content.replace(old_spacer_checks, new_spacer_checks)

    old_spacer_checks2 = """                                {!(isTamilCloud || zone.isEnglishQuiz || zone.isMathQuiz || zone.isEvsQuiz || zone.isGkQuiz) && <div className="h-6" />}"""
    new_spacer_checks2 = """                                {!(isTamilCloud || zone.isEnglishQuiz || zone.isMathQuiz || zone.isEvsQuiz || zone.isGkQuiz || zone.isHindiQuiz) && <div className="h-6" />}"""
    content = content.replace(old_spacer_checks2, new_spacer_checks2)

    # 8. Update header/subheader titles
    old_header = """                    {activeSubject === 'tamil' ? 'தமிழ் வினாடி-வினா' 
                     : activeSubject === 'english' ? 'English Quiz Arena' 
                     : activeSubject === 'evs' ? 'Environmental Studies'
                     : activeSubject === 'gk' ? 'General Knowledge'
                     : 'கணித சவால் (Math Quiz)'}"""
    
    new_header = """                    {activeSubject === 'tamil' ? 'தமிழ் வினாடி-வினா' 
                     : activeSubject === 'english' ? 'English Quiz Arena' 
                     : activeSubject === 'evs' ? 'Environmental Studies'
                     : activeSubject === 'gk' ? 'General Knowledge'
                     : activeSubject === 'hindi' ? 'Hindi Quiz Arena'
                     : 'கணித சவால் (Math Quiz)'}"""
    content = content.replace(old_header, new_header)

    old_subheader = """                    {activeSubject === 'tamil' ? 'Tamil Quiz Arena' 
                     : activeSubject === 'english' ? 'Fun Spelling & Sorting' 
                     : activeSubject === 'evs' ? 'Nature, Health & Living'
                     : activeSubject === 'gk' ? 'Discover & Learn'
                     : 'Playful Math Adventures'}"""

    new_subheader = """                    {activeSubject === 'tamil' ? 'Tamil Quiz Arena' 
                     : activeSubject === 'english' ? 'Fun Spelling & Sorting' 
                     : activeSubject === 'evs' ? 'Nature, Health & Living'
                     : activeSubject === 'gk' ? 'Discover & Learn'
                     : activeSubject === 'hindi' ? 'Learn Hindi Vowels & Words'
                     : 'Playful Math Adventures'}"""
    content = content.replace(old_subheader, new_subheader)

    # 9. Update Levels select mapping in rendering block
    old_levels_map = "{(activeSubject === 'tamil' ? TAMIL_LEVELS : activeSubject === 'english' ? ENGLISH_LEVELS : activeSubject === 'evs' ? EVS_LEVELS : activeSubject === 'gk' ? GK_LEVELS : MATH_LEVELS).map((level, index) => {"
    new_levels_map = "{(activeSubject === 'tamil' ? TAMIL_LEVELS : activeSubject === 'english' ? ENGLISH_LEVELS : activeSubject === 'evs' ? EVS_LEVELS : activeSubject === 'gk' ? GK_LEVELS : activeSubject === 'hindi' ? HINDI_LEVELS : MATH_LEVELS).map((level, index) => {"
    content = content.replace(old_levels_map, new_levels_map)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        print("Hindi changes successfully written to page.tsx!")

if __name__ == "__main__":
    main()
