import { type Level } from './quizData';

export const UKG_ENGLISH_LEVELS: Level[] = [
  {
    id: 1,
    title: 'Word Family: -at words',
    titleEn: 'CVC words ending in -at',
    mascot: '🐱',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which picture shows a C-A-T?',
        instructionTa: 'C-A-T (பூனை) படம் எது?',
        options: [
          { text: 'cat', emoji: '🐱', correct: true },
          { text: 'dog', emoji: '🐶', correct: false },
          { text: 'sun', emoji: '☀️', correct: false },
        ]
      },
      {
        type: 'spelling',
        instruction: 'Complete the CVC word: c _ t',
        instructionTa: 'விடுபட்ட எழுத்தை நிரப்பவும்: c _ t',
        options: [
          { text: 'a', correct: true },
          { text: 'o', correct: false },
          { text: 'i', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'Find the word that does NOT belong to the -at family:',
        instructionTa: '-at குடும்பத்தைச் சேராத வார்த்தை எது?',
        options: [
          { text: 'pig', emoji: '🐷', correct: true },
          { text: 'hat', emoji: '🎩', correct: false },
          { text: 'mat', emoji: '🟫', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'Which of these is a H-A-T?',
        instructionTa: 'H-A-T (தொப்பி) எது?',
        options: [
          { text: 'hat', emoji: '🎩', correct: true },
          { text: 'rat', emoji: '🐀', correct: false },
          { text: 'bat', emoji: '🏏', correct: false },
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Sight Words & Short Sentences',
    titleEn: 'Easy Sight Words',
    mascot: '👁️',
    color: 'from-sky-400 to-indigo-500',
    borderColor: 'border-sky-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Find the sight word: "THE"',
        instructionTa: '"THE" வார்த்தையைத் தொடுங்கள்!',
        options: [
          { text: 'the', correct: true },
          { text: 'and', correct: false },
          { text: 'you', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'Complete the sentence: "The sun is ___"',
        instructionTa: 'வாக்கியத்தை நிரப்பவும்: "The sun is ___"',
        options: [
          { text: 'hot', emoji: '🔥', correct: true },
          { text: 'cold', emoji: '❄️', correct: false },
          { text: 'wet', emoji: '🌧️', correct: false },
        ]
      }
    ]
  }
];

export const UKG_TAMIL_LEVELS: Level[] = [];
export const UKG_MATH_LEVELS: Level[] = [];
export const UKG_EVS_LEVELS: Level[] = [];
export const UKG_GK_LEVELS: Level[] = [];
export const UKG_HINDI_LEVELS: Level[] = [];
