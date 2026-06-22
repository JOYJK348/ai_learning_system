import os

def main():
    filepath = r"d:/FreeLance/AI-LearningPortal/frontend/src/app/[locale]/student/Quiz/page.tsx"
    if not os.path.exists(filepath):
        print("File not found!")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the start index of HINDI_LEVELS and MATH_LEVELS
    start_idx = content.find("const HINDI_LEVELS: Level[] = [")
    end_idx = content.find("const MATH_LEVELS: Level[] = [")

    if start_idx == -1 or end_idx == -1:
        print("Could not find HINDI_LEVELS or MATH_LEVELS in page.tsx")
        return

    new_hindi_levels = """const HINDI_LEVELS: Level[] = [
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
        instructionTa: 'खड़ी रेखा (Standing Line) कैसी दिखती है? 📏',
        options: [
          { text: '| (Standing)', emoji: '📏', correct: true },
          { text: '— (Sleeping)', emoji: '📏', correct: false },
          { text: '/ (Slanting)', emoji: '📏', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the Standing Line stroke',
        instructionTa: 'खड़ी रेखा (Standing Line) को बोर्ड पर लिखें! ✏️',
        letter: '।',
        options: []
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
        type: 'trace',
        instruction: 'Trace the Sleeping Line stroke',
        instructionTa: 'लेटी रेखा (Sleeping Line) को बोर्ड पर लिखें! ✏️',
        letter: '—',
        options: []
      },
      {
        type: 'sequence',
        instruction: 'Complete the pattern:',
        instructionTa: 'पैटर्न को पूरा करें! 🧩',
        sequence: ['।', '—', '।', '_'],
        options: [
          { text: '—', correct: true },
          { text: '।', correct: false },
          { text: '/', correct: false }
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
        instruction: "Which word starts with 'अ' (A)?",
        instructionTa: "'अ' से शुरू होने वाला शब्द कौन सा है? 🍎",
        options: [
          { text: 'Anar (Pomegranate)', emoji: '🍎', correct: true },
          { text: 'Aam (Mango)', emoji: '🥭', correct: false },
          { text: 'Imli (Tamarind)', emoji: '🍇', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: "Trace the vowel 'अ'",
        instructionTa: "स्वर 'अ' को बोर्ड पर लिखें! ✏️",
        letter: 'अ',
        options: []
      },
      {
        type: 'match',
        instruction: "Match Aam (Mango) to its correct starting letter",
        instructionTa: "'आम' - सही पहले अक्षर को छुएं! 🥭",
        matchImage: '/assets/quiz/fruit-mango.png', // Fallback or using custom image if available, otherwise handled gracefully
        options: [
          { text: 'आ', correct: true },
          { text: 'अ', correct: false },
          { text: 'इ', correct: false }
        ]
      },
      {
        type: 'sequence',
        instruction: 'Complete the vowel sequence:',
        instructionTa: 'खाली जगह भरें! 🧩',
        sequence: ['अ', 'आ', '_', 'ई'],
        options: [
          { text: 'इ', correct: true },
          { text: 'उ', correct: false },
          { text: 'ए', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: "Which word starts with 'उ' (U)?",
        instructionTa: "'उ' से शुरू होने वाला शब्द कौन सा है? 🦉",
        options: [
          { text: 'Ullu (Owl)', emoji: '🦉', correct: true },
          { text: 'Aam (Mango)', emoji: '🥭', correct: false },
          { text: 'Imli (Tamarind)', emoji: '🍇', correct: false }
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
        instruction: "Which word starts with 'क' (Ka)?",
        instructionTa: "'क' से शुरू होने वाला शब्द कौन सा है? 🐦",
        options: [
          { text: 'Kabootar (Pigeon)', emoji: '🐦', correct: true },
          { text: 'Khargosh (Rabbit)', emoji: '🐇', correct: false },
          { text: 'Gamla (Flowerpot)', emoji: '🪴', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: "Trace the consonant 'क'",
        instructionTa: "व्यंजन 'क' को बोर्ड पर लिखें! ✏️",
        letter: 'क',
        options: []
      },
      {
        type: 'match',
        instruction: "Match Khargosh (Rabbit) to its correct starting letter",
        instructionTa: "'खरगोश' - सही पहले अक्षर को छुएं! 🐇",
        matchImage: '/assets/quiz/animal-rabbit.png',
        options: [
          { text: 'ख', correct: true },
          { text: 'क', correct: false },
          { text: 'ग', correct: false }
        ]
      },
      {
        type: 'sequence',
        instruction: 'Complete the consonant sequence:',
        instructionTa: 'खाली जगह भरें! 🧩',
        sequence: ['क', 'ख', '_', 'घ'],
        options: [
          { text: 'ग', correct: true },
          { text: 'च', correct: false },
          { text: 'ज', correct: false }
        ]
      },
      {
        type: 'find',
        instruction: "Which letter is 'घ' (Gha)?",
        instructionTa: "व्यंजन 'घ' कौन सा है? 🏠",
        options: [
          { text: 'घ', correct: true },
          { text: 'ध', correct: false },
          { text: 'प', correct: false }
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
        type: 'trace',
        instruction: "Trace the letter 'म' (Ma)",
        instructionTa: "अक्षर 'म' को बोर्ड पर लिखें! ✏️",
        letter: 'म',
        options: []
      },
      {
        type: 'match',
        instruction: "Match Mother (Maa) to its starting letter",
        instructionTa: "'माँ' - सही पहले अक्षर को छुएं! 👩",
        matchImage: '/assets/quiz/family-mother.png',
        options: [
          { text: 'म', correct: true },
          { text: 'प', correct: false },
          { text: 'द', correct: false }
        ]
      },
      {
        type: 'sequence',
        instruction: "Complete the Hindi word 'फ_'",
        instructionTa: "हिंदी शब्द 'फ_' को पूरा करें! 🍎",
        sequence: ['फ', '_'],
        options: [
          { text: 'ल', correct: true },
          { text: 'र', correct: false },
          { text: 'क', correct: false }
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
        type: 'trace',
        instruction: "Trace the letter 'न' (Na)",
        instructionTa: "अक्षर 'न' को बोर्ड पर लिखें! ✏️",
        letter: 'न',
        options: []
      },
      {
        type: 'match',
        instruction: "Match Father (Pitaji) to its starting letter",
        instructionTa: "'पिताजी' - सही पहले अक्षर को छुएं! 👨",
        matchImage: '/assets/quiz/family-father.png',
        options: [
          { text: 'प', correct: true },
          { text: 'म', correct: false },
          { text: 'त', correct: false }
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
        type: 'sequence',
        instruction: 'Complete the night greeting:',
        instructionTa: 'रात के समय का अभिवादन पूरा करें! 🌙',
        sequence: ['शुभ', '_'],
        options: [
          { text: 'रात्रि', correct: true },
          { text: 'प्रभात', correct: false },
          { text: 'दुपहर', correct: false }
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
        type: 'trace',
        instruction: "Trace the letter 'ल' (La)",
        instructionTa: "अक्षर 'ल' को बोर्ड पर लिखें! ✏️",
        letter: 'ल',
        options: []
      },
      {
        type: 'match',
        instruction: "Match Grandma (Dadi) to its starting letter",
        instructionTa: "'दादी' - सही पहले अक्षर को छुएं! 👵",
        matchImage: '/assets/quiz/family-grandma.png',
        options: [
          { text: 'द', correct: true },
          { text: 'म', correct: false },
          { text: 'प', correct: false }
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
        type: 'sequence',
        instruction: 'Complete the poem phrase:',
        instructionTa: 'कविता की पंक्ति पूरी करें! 🧩',
        sequence: ['मछली', 'जल', 'की', '_', 'है'],
        options: [
          { text: 'रानी', correct: true },
          { text: 'राजा', correct: false },
          { text: 'सहेली', correct: false }
        ]
      }
    ]
  }
];

"""

    content = content[:start_idx] + new_hindi_levels + "\n" + content[end_idx:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        print("Interactive HINDI_LEVELS successfully added!")

if __name__ == "__main__":
    main()
