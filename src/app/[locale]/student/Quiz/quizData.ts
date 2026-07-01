export type Option = {
  text: string;
  emoji?: string;
  img?: string;
  correct: boolean;
};

export type Question = {
  type: 'trace' | 'sequence' | 'find' | 'match' | 'choice' | 'spelling' | 'sorting' | 'order' | 'math_compare' | 'math_count' | 'math_pattern' | 'drag_hunt' | 'garden_repair' | 'sentence_train' | 'story_cave' | 'detective_highlight' | 'writing_lab' | 'connect_pairs' | 'grid_search' | 'learn_card';
  instruction?: string;
  instructionTa?: string;
  letter?: string;
  sequence?: string[];
  options: Option[];
  matchImage?: string;
  sentence?: string;
  words?: string[];
  correctSentence?: string;
  storyText?: string;
  questionText?: string;
  isSequence?: boolean;
  sequenceSteps?: string[];
  targetWord?: string;
  category?: string;
  subType?: 'trace' | 'missing' | 'complete';
  pairs?: { left: string; right: string }[];
  gridItems?: { text: string; correct: boolean; emoji?: string }[];
  conceptTitle?: string;
  mascot?: string;
  explanation?: string;
  explanationTa?: string;
  examples?: string[];
  clockTime?: string;
};

export type Level = {
  id: number;
  title: string;
  titleEn: string;
  mascot: string;
  color: string;
  borderColor: string;
  questions: Question[];
};

export const TAMIL_LEVELS: Level[] = [
  {
    id: 1,
    title: 'உயிர் எழுத்துக்கள் அ-உ (Vowels Part 1)',
    titleEn: 'Tamil Vowels (அ-உ)',
    mascot: '🦉',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which word starts with the letter "அ"?',
        instructionTa: '"அ" எழுத்தில் தொடங்கும் படம் எது? 🐿️',
        options: [
          { text: 'அணில்', emoji: '🐿️', correct: true },
          { text: 'ஆடு', emoji: '🐐', correct: false },
          { text: 'இலை', emoji: '🍃', correct: false },
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the letter "அ"',
        instructionTa: '"அ" எழுத்தை பலகையில் எழுதவும்! ✏️',
        letter: 'அ',
        options: []
      },
      {
        type: 'choice',
        instruction: 'Find the odd letter out:',
        instructionTa: 'வேறுபட்ட எழுத்தைக் கண்டுபிடி! 🔍',
        options: [
          { text: 'இ', correct: true },
          { text: 'அ', correct: false },
          { text: 'அ', correct: false },
        ]
      },
      {
        type: 'match',
        instruction: 'Match Mother to correct starting letter',
        instructionTa: '"அம்மா" - முதல் எழுத்தைத் தொடுங்கள்! 👩',
        matchImage: '/assets/quiz/family-mother.png',
        options: [
          { text: 'அ', correct: true },
          { text: 'ஆ', correct: false },
          { text: 'இ', correct: false },
        ]
      },
      {
        type: 'sequence',
        instruction: 'What comes next?',
        instructionTa: 'விடுபட்ட எழுத்தை நிரப்பவும்! 🧩',
        sequence: ['அ', 'ஆ', '_', 'ஈ'],
        options: [
          { text: 'இ', correct: true },
          { text: 'உ', correct: false },
          { text: 'ஒ', correct: false },
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'உயிர் எழுத்துக்கள் ஊ-ஐ (Vowels Part 2)',
    titleEn: 'Tamil Vowels (ஊ-ஐ)',
    mascot: '🦄',
    color: 'from-sky-400 to-indigo-500',
    borderColor: 'border-sky-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which word starts with the letter "உ"?',
        instructionTa: '"உ" எழுத்தில் தொடங்கும் படம் எது? 🪵',
        options: [
          { text: 'உரல்', emoji: '🪵', correct: true },
          { text: 'ஊசி', emoji: '🪡', correct: false },
          { text: 'எலி', emoji: '🐭', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'Find the odd letter out:',
        instructionTa: 'வேறுபட்ட எழுத்தைக் கண்டுபிடி! 🔍',
        options: [
          { text: 'ஊ', correct: true },
          { text: 'உ', correct: false },
          { text: 'உ', correct: false },
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the letter "உ"',
        instructionTa: '"உ" எழுத்தை பலகையில் எழுதவும்! ✏️',
        letter: 'உ',
        options: []
      },
      {
        type: 'sequence',
        instruction: 'What comes next?',
        instructionTa: 'விடுபட்ட எழுத்தை நிரப்பவும்! 🧩',
        sequence: ['உ', 'ஊ', '_', 'ஏ'],
        options: [
          { text: 'எ', correct: true },
          { text: 'ஏ', correct: false },
          { text: 'ஐ', correct: false },
        ]
      },
      {
        type: 'match',
        instruction: 'Match Father to correct starting letter',
        instructionTa: '"அப்பா" - முதல் எழுத்தைத் தொடுங்கள்! 👨',
        matchImage: '/assets/quiz/family-father.png',
        options: [
          { text: 'அ', correct: true },
          { text: 'ஆ', correct: false },
          { text: 'இ', correct: false },
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'உயிர் & ஆயுத எழுத்து (Vowels Part 3 & Special)',
    titleEn: 'Tamil Vowels & Special (ஒ-ஔ, ஃ)',
    mascot: '🎨',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which word starts with the letter "ஒ"?',
        instructionTa: '"ஒ" எழுத்தில் தொடங்கும் படம் எது? 🐫',
        options: [
          { text: 'ஒட்டகம்', emoji: '🐫', correct: true },
          { text: 'ஓடம்', emoji: '⛵', correct: false },
          { text: 'ஔவை', emoji: '👵', correct: false },
        ]
      },
      {
        type: 'sequence',
        instruction: 'What comes next?',
        instructionTa: 'விடுபட்ட எழுத்தை நிரப்பவும்! 🧩',
        sequence: ['ஒ', 'ஓ', '_', 'ஃ'],
        options: [
          { text: 'ஔ', correct: true },
          { text: 'எ', correct: false },
          { text: 'ஐ', correct: false },
        ]
      },
      {
        type: 'find',
        instruction: 'Which is the special weapon letter "ஃ"?',
        instructionTa: 'ஆயுத எழுத்து "ஃ" எது? 🛡️',
        options: [
          { text: 'ஃ', correct: true },
          { text: 'அ', correct: false },
          { text: 'இ', correct: false },
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the letter "எ"',
        instructionTa: '"எ" எழுத்தை பலகையில் எழுதவும்! ✏️',
        letter: 'எ',
        options: []
      },
      {
        type: 'match',
        instruction: 'Match grandma to correct starting letter',
        instructionTa: '"பாட்டி" - முதல் எழுத்தைத் தொடுங்கள்! 👵',
        matchImage: '/assets/quiz/family-grandma.png',
        options: [
          { text: 'பா', correct: true },
          { text: 'அ', correct: false },
          { text: 'தா', correct: false },
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'வல்லின மெய் எழுத்துக்கள் (Hard Consonants)',
    titleEn: 'Hard Consonants (க், ச், ப்...)',
    mascot: '🦁',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which is a dotted consonant?',
        instructionTa: 'புள்ளி வைத்த மெய் எழுத்து எது? ✏️',
        options: [
          { text: 'க்', correct: true },
          { text: 'அ', correct: false },
          { text: 'க', correct: false },
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the letter "க்"',
        instructionTa: '"க்" எழுத்தை பலகையில் எழுதவும்! ✏️',
        letter: 'க்',
        options: []
      },
      {
        type: 'choice',
        instruction: 'Find the odd letter out:',
        instructionTa: 'வேறுபட்ட எழுத்தைக் கண்டுபிடி! 🔍',
        options: [
          { text: 'ச்', correct: true },
          { text: 'க்', correct: false },
          { text: 'க்', correct: false },
        ]
      },
      {
        type: 'match',
        instruction: 'Find the dotted consonant inside "Akka":',
        instructionTa: '"அக்கா" - மெய் எழுத்தைத் தொடுங்கள்! 👧',
        matchImage: '/assets/quiz/family-sister.png',
        options: [
          { text: 'க்', correct: true },
          { text: 'அ', correct: false },
          { text: 'கா', correct: false },
        ]
      },
      {
        type: 'sequence',
        instruction: 'What comes next?',
        instructionTa: 'விடுபட்ட மெய் எழுத்தை நிரப்பவும்! 🧩',
        sequence: ['க்', 'ங்', '_', 'ஞ்'],
        options: [
          { text: 'ச்', correct: true },
          { text: 'ட்', correct: false },
          { text: 'த்', correct: false },
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'மெல்லின & இடையின மெய் (Soft & Medium)',
    titleEn: 'Soft & Medium Consonants',
    mascot: '🐬',
    color: 'from-blue-400 to-cyan-500',
    borderColor: 'border-blue-300',
    questions: [
      {
        type: 'trace',
        instruction: 'Trace the letter "ம்"',
        instructionTa: '"ம்" எழுத்தை பலகையில் எழுதவும்! ✏️',
        letter: 'ம்',
        options: []
      },
      {
        type: 'find',
        instruction: 'Find the dotted consonant inside "Kan":',
        instructionTa: '"கண்" - மெய் எழுத்தைத் தொடுங்கள்! 👁️',
        options: [
          { text: 'ண்', correct: true },
          { text: 'க', correct: false },
          { text: 'ண', correct: false },
        ]
      },
      {
        type: 'find',
        instruction: 'Find the dotted consonant inside "Pandhu":',
        instructionTa: '"பந்து" - மெய் எழுத்தைத் தொடுங்கள்! ⚽',
        options: [
          { text: 'ந்', correct: true },
          { text: 'ப', correct: false },
          { text: 'து', correct: false },
        ]
      },
      {
        type: 'find',
        instruction: 'What is the last consonant of the word "Tamil"?',
        instructionTa: '"தமிழ்" சொல்லின் கடைசி எழுத்து எது? 📕',
        options: [
          { text: 'ழ்', correct: true },
          { text: 'ல்', correct: false },
          { text: 'ள்', correct: false },
        ]
      },
      {
        type: 'sequence',
        instruction: 'What comes next?',
        instructionTa: 'விடுபட்ட எழுத்தை நிரப்பவும்! 🧩',
        sequence: ['ய்', 'ர்', '_', 'வ்'],
        options: [
          { text: 'ல்', correct: true },
          { text: 'ழ்', correct: false },
          { text: 'ள்', correct: false },
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'எளிய சொற்கள் & உறவுகள் (Words & Relations)',
    titleEn: 'Tamil Words & Relationships',
    mascot: '🦊',
    color: 'from-rose-400 to-red-500',
    borderColor: 'border-rose-350',
    questions: [
      {
        type: 'trace',
        instruction: 'Trace the letter "ப"',
        instructionTa: '"ப" எழுத்தை பலகையில் எழுதவும்! ✏️',
        letter: 'ப',
        options: []
      },
      {
        type: 'choice',
        instruction: 'Who is Grandpas wife?',
        instructionTa: 'தாத்தாவின் மனைவி யார்? 👵',
        options: [
          { text: 'பாட்டி', img: '/assets/quiz/family-grandma.png', correct: true },
          { text: 'அம்மா', img: '/assets/quiz/family-mother.png', correct: false },
          { text: 'அக்கா', img: '/assets/quiz/family-sister.png', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'Who is your fathers father?',
        instructionTa: 'அப்பாவின் தந்தை யார்? 👴',
        options: [
          { text: 'தாத்தா', img: '/assets/quiz/family-grandpa.png', correct: true },
          { text: 'தம்பி', img: '/assets/quiz/family-brother.png', correct: false },
          { text: 'அப்பா', img: '/assets/quiz/family-father.png', correct: false },
        ]
      },
      {
        type: 'sequence',
        instruction: 'Who is next in family relations?',
        instructionTa: 'விடுபட்ட உறவை நிரப்பவும்! 🧩',
        sequence: ['தாத்தா', 'பாட்டி', 'அப்பா', '_'],
        options: [
          { text: 'அம்மா', img: '/assets/quiz/family-mother.png', correct: true },
          { text: 'நாய்', emoji: '🐶', correct: false },
          { text: 'பூனை', emoji: '🐱', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'Which is the correct order from oldest to youngest?',
        instructionTa: 'பெரியவரில் இருந்து சிறியவர் யார்? 👴👨👦',
        options: [
          { text: 'தாத்தா ➔ அப்பா ➔ தம்பி', correct: true },
          { text: 'தம்பி ➔ அப்பா ➔ தாத்தா', correct: false },
          { text: 'அப்பா ➔ தாத்தா ➔ தம்பி', correct: false },
        ]
      }
    ]
  }
];

export const ENGLISH_LEVELS: Level[] = [
  {
    id: 1,
    title: 'Pre-Writing Lines & Curves',
    titleEn: 'Lines & Curves',
    mascot: '✍️',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'trace',
        instruction: 'Trace the letter "I"',
        instructionTa: '"I" எழுத்தை எழுதவும்! ✏️',
        letter: 'I',
        options: []
      },
      {
        type: 'trace',
        instruction: 'Trace the letter "T"',
        instructionTa: '"T" எழுத்தை எழுதவும்! ✏️',
        letter: 'T',
        options: []
      },
      {
        type: 'trace',
        instruction: 'Trace the letter "C"',
        instructionTa: '"C" எழுத்தை எழுதவும்! ✏️',
        letter: 'C',
        options: []
      },
      {
        type: 'choice',
        instruction: 'Which is a slanting line?',
        instructionTa: 'சாய்வுகோடு எது? 📐',
        options: [
          { text: 'Slanting Line ( ╱ )', correct: true },
          { text: 'Standing Line ( │ )', correct: false },
          { text: 'Sleeping Line ( ─ )', correct: false },
        ]
      },
      {
        type: 'sequence',
        instruction: 'Complete the pattern:',
        instructionTa: 'வடிவத்தை நிரப்பவும்! 🧩',
        sequence: ['|', '-', '|', '_'],
        options: [
          { text: '-', correct: true },
          { text: '|', correct: false },
          { text: '/', correct: false },
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Alphabet World (A-M)',
    titleEn: 'Letters A-M',
    mascot: '🍎',
    color: 'from-sky-400 to-indigo-500',
    borderColor: 'border-sky-300',
    questions: [
      {
        type: 'spelling',
        instruction: 'Complete the spelling of Apple:',
        instructionTa: 'Apple எழுத்தை நிரப்பவும்! 🍎',
        letter: 'A_PLE',
        options: [
          { text: 'P', correct: true },
          { text: 'B', correct: false },
          { text: 'D', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'Which word starts with letter "D"?',
        instructionTa: '"D" எழுத்தில் தொடங்கும் சொல் எது? 🐕',
        options: [
          { text: 'Dog', emoji: '🐕', correct: true },
          { text: 'Cat', emoji: '🐱', correct: false },
          { text: 'Ball', emoji: '🏀', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'What letter does the word "Elephant" start with?',
        instructionTa: '"Elephant" என்ற சொல் எந்த எழுத்தில் தொடங்குகிறது? 🐘',
        options: [
          { text: 'E', correct: true },
          { text: 'F', correct: false },
          { text: 'A', correct: false },
        ]
      },
      {
        type: 'spelling',
        instruction: 'Complete the spelling of Ball:',
        instructionTa: 'Ball எழுத்தை நிரப்பவும்! 🏀',
        letter: 'B_LL',
        options: [
          { text: 'A', correct: true },
          { text: 'O', correct: false },
          { text: 'E', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'What letter comes after F?',
        instructionTa: 'F எழுத்திற்கு அடுத்து வரும் எழுத்து எது? 🧩',
        options: [
          { text: 'G', correct: true },
          { text: 'E', correct: false },
          { text: 'H', correct: false },
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Checkpoint Explorer',
    titleEn: 'Letters Checkpoint',
    mascot: '🎈',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Find the odd letter out:',
        instructionTa: 'வேறுபட்ட எழுத்தைக் கண்டுபிடி! 🔍',
        options: [
          { text: 'H', correct: true },
          { text: 'A', correct: false },
          { text: 'A', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'Which is a letter?',
        instructionTa: 'எழுத்து எது? ✏️',
        options: [
          { text: 'M', correct: true },
          { text: '5', correct: false },
          { text: '★', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'What letter does the word "Cat" start with?',
        instructionTa: '"Cat" என்ற சொல் எந்த எழுத்தில் தொடங்குகிறது? 🐱',
        options: [
          { text: 'C', correct: true },
          { text: 'D', correct: false },
          { text: 'B', correct: false },
        ]
      },
      {
        type: 'sequence',
        instruction: 'What comes next?',
        instructionTa: 'விடுபட்ட எழுத்தை நிரப்பவும்! 🧩',
        sequence: ['A', 'B', 'C', '_'],
        options: [
          { text: 'D', correct: true },
          { text: 'E', correct: false },
          { text: 'F', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'Find the capital letter of "e":',
        instructionTa: '"e" இன் பெரிய எழுத்தைக் கண்டுபிடி! ✏️',
        options: [
          { text: 'E', correct: true },
          { text: 'F', correct: false },
          { text: 'G', correct: false },
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Alphabet Explorer (N-Z)',
    titleEn: 'Letters N-Z',
    mascot: '🦊',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'order',
        instruction: 'Arrange these letters in order:',
        instructionTa: 'எழுத்துக்களை வரிசைப்படுத்தவும்! 🧩',
        options: [
          { text: 'N ➔ O ➔ P', correct: true },
          { text: 'P ➔ O ➔ N', correct: false },
          { text: 'O ➔ N ➔ P', correct: false },
        ]
      },
      {
        type: 'spelling',
        instruction: 'Complete the spelling of Nest:',
        instructionTa: 'Nest எழுத்தை நிரப்பவும்! 🪹',
        letter: 'N_ST',
        options: [
          { text: 'E', correct: true },
          { text: 'A', correct: false },
          { text: 'O', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'Which animal is a Zebra?',
        instructionTa: 'வரிக்குதிரை எது? 🦓',
        options: [
          { text: 'Zebra', emoji: '🦓', correct: true },
          { text: 'Lion', emoji: '🦁', correct: false },
          { text: 'Parrot', emoji: '🦜', correct: false },
        ]
      },
      {
        type: 'spelling',
        instruction: 'Complete the spelling of Sun:',
        instructionTa: 'Sun எழுத்தை நிரப்பவும்! ☀️',
        letter: 'S_N',
        options: [
          { text: 'U', correct: true },
          { text: 'O', correct: false },
          { text: 'A', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'What letter comes before Z?',
        instructionTa: 'Z எழுத்திற்கு முன்னால் வரும் எழுத்து எது? 🧩',
        options: [
          { text: 'Y', correct: true },
          { text: 'X', correct: false },
          { text: 'W', correct: false },
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Lowercase & Uppercase sorting',
    titleEn: 'Capital vs Small',
    mascot: '🧠',
    color: 'from-blue-400 to-cyan-500',
    borderColor: 'border-blue-300',
    questions: [
      {
        type: 'sorting',
        instruction: 'Identify the Small letter:',
        instructionTa: 'சிறிய எழுத்தைக் கண்டுபிடி! ✏️',
        options: [
          { text: 'a', correct: true },
          { text: 'A', correct: false },
          { text: 'B', correct: false },
        ]
      },
      {
        type: 'sorting',
        instruction: 'Identify the Capital letter:',
        instructionTa: 'பெரிய எழுத்தைக் கண்டுபிடி! ✏️',
        options: [
          { text: 'M', correct: true },
          { text: 'm', correct: false },
          { text: 'n', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'Match Capital T to its Small letter:',
        instructionTa: 'T - இன் சிறிய எழுத்தை பொருத்துக! ✏️',
        options: [
          { text: 't', correct: true },
          { text: 'f', correct: false },
          { text: 'l', correct: false },
        ]
      },
      {
        type: 'spelling',
        instruction: 'Complete the phonic word _at:',
        instructionTa: 'Phonics சொல் _at ஐ நிரப்பவும்! 🐱',
        letter: '_AT',
        options: [
          { text: 'C', correct: true },
          { text: 'Z', correct: false },
          { text: 'X', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'Select small letters for H, G, R:',
        instructionTa: 'H, G, R இன் சிறிய எழுத்துக்களைத் தேர்ந்தெடு! ✏️',
        options: [
          { text: 'h, g, r', correct: true },
          { text: 'h, d, p', correct: false },
          { text: 'a, b, c', correct: false },
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'Rhymes & Fables Storybook',
    titleEn: 'Rhymes & Stories',
    mascot: '📚',
    color: 'from-rose-400 to-red-500',
    borderColor: 'border-rose-350',
    questions: [
      {
        type: 'choice',
        instruction: 'Johnny Johnny Yes _____',
        instructionTa: 'Johnny Johnny Yes _____ 👴👶',
        options: [
          { text: 'Papa', correct: true },
          { text: 'Mama', correct: false },
          { text: 'Baby', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'Who won the race in the story?',
        instructionTa: 'ஆமை முயல் கதையில் வென்றது யார்? 🐢🐇',
        options: [
          { text: 'Tortoise (🐢)', correct: true },
          { text: 'Hare (🐇)', correct: false },
          { text: 'Lion (🦁)', correct: false },
        ]
      },
      {
        type: 'order',
        instruction: 'Sort story order (Lion & Mouse):',
        instructionTa: 'சிங்கமும் எலியும் கதை நிகழ்வுகளை வரிசைப்படுத்துக! 🦁🐭',
        options: [
          { text: 'Mouse caught ➔ Lion saves ➔ Mouse saves Lion', correct: true },
          { text: 'Mouse saves Lion ➔ Lion caught ➔ Lion saves Mouse', correct: false },
          { text: 'Lion saves Mouse ➔ Mouse caught ➔ Mouse saves Lion', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'What did the thirsty crow throw in the pot?',
        instructionTa: 'தாகமுள்ள காகம் பானையில் என்ன போட்டது? 🐦🪨',
        options: [
          { text: 'Pebbles (🪨)', correct: true },
          { text: 'Leaves (🍃)', correct: false },
          { text: 'Paper (📄)', correct: false },
        ]
      },
      {
        type: 'choice',
        instruction: 'Jack and Jill went up the _____',
        instructionTa: 'Jack and Jill went up the _____ 🏔️',
        options: [
          { text: 'Hill', correct: true },
          { text: 'Wall', correct: false },
          { text: 'Tree', correct: false },
        ]
      }
    ]
  }
];




export const EVS_LEVELS: Level[] = [
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
      },
      {
        type: 'choice',
        instruction: 'Which body part do we use to WALK?',
        instructionTa: 'நடக்க உதவும் உடல் உறுப்பு எது? 🚶',
        options: [
          { text: 'Legs', emoji: '🦵', correct: true },
          { text: 'Nose', emoji: '👃', correct: false },
          { text: 'Ears', emoji: '👂', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What do we do when we are HUNGRY?',
        instructionTa: 'பசிக்கும்போது நாம் என்ன செய்வோம்? 😋',
        options: [
          { text: 'Eat Food', emoji: '🍱', correct: true },
          { text: 'Sleep', emoji: '🛏️', correct: false },
          { text: 'Cry', emoji: '😭', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which is a healthy morning habit?',
        instructionTa: 'காலை எழுந்தவுடன் செய்யும் நல்ல பழக்கம் எது? 🌅',
        options: [
          { text: 'Wake up early', emoji: '⏰', correct: true },
          { text: 'Watch TV', emoji: '📺', correct: false },
          { text: 'Eat junk food', emoji: '🍟', correct: false }
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
      },
      {
        type: 'choice',
        instruction: 'Who is your father\'s father?',
        instructionTa: 'அப்பாவின் அப்பா உங்களுக்கு யார்? 👴',
        options: [
          { text: 'Grandpa', emoji: '👴', correct: true },
          { text: 'Brother', emoji: '👦', correct: false },
          { text: 'Uncle', emoji: '👨', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Where do we take a bath?',
        instructionTa: 'நாம் எங்கே குளிப்போம்? 🚿',
        options: [
          { text: 'Bathroom', emoji: '🛁', correct: true },
          { text: 'Living Room', emoji: '🛋️', correct: false },
          { text: 'Roof', emoji: '🏠', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Who helps you with homework?',
        instructionTa: 'பாடங்கள் படிக்க உதவுபவர் யார்? 📚',
        options: [
          { text: 'Parents', emoji: '👨‍👩‍👧', correct: true },
          { text: 'Monkey', emoji: '🐒', correct: false },
          { text: 'Table', emoji: '🪑', correct: false }
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
      },
      {
        type: 'choice',
        instruction: 'Which animal has a long TRUNK?',
        instructionTa: 'நீண்ட தும்பிக்கை உள்ள விலங்கு எது? 🐘',
        options: [
          { text: 'Elephant', emoji: '🐘', correct: true },
          { text: 'Rabbit', emoji: '🐰', correct: false },
          { text: 'Mouse', emoji: '🐭', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which bird can SWIM in water?',
        instructionTa: 'நீரில் நீந்தும் பறவை எது? 🦆',
        options: [
          { text: 'Duck', emoji: '🦆', correct: true },
          { text: 'Crow', emoji: '🐦‍⬛', correct: false },
          { text: 'Eagle', emoji: '🦅', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What does a dog say?',
        instructionTa: 'நாய் எப்படிக் கத்தும்? 🐶',
        options: [
          { text: 'Bow Bow', emoji: '🐶', correct: true },
          { text: 'Meow', emoji: '🐱', correct: false },
          { text: 'Moo', emoji: '🐄', correct: false }
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
      },
      {
        type: 'choice',
        instruction: 'What gives us LIGHT during the day?',
        instructionTa: 'பகலில் வெளிச்சம் தருவது எது? ☀️',
        options: [
          { text: 'Sun', emoji: '☀️', correct: true },
          { text: 'Moon', emoji: '🌙', correct: false },
          { text: 'Star', emoji: '⭐', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which fruit is YELLOW and long?',
        instructionTa: 'மஞ்சள் நிறத்தில் நீளமாக இருக்கும் பழம் எது? 🍌',
        options: [
          { text: 'Banana', emoji: '🍌', correct: true },
          { text: 'Apple', emoji: '🍎', correct: false },
          { text: 'Grapes', emoji: '🍇', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Where do fishes live?',
        instructionTa: 'மீன்கள் எங்கே வாழும்? 🐟',
        options: [
          { text: 'Water', emoji: '🌊', correct: true },
          { text: 'Tree', emoji: '🌳', correct: false },
          { text: 'Sand', emoji: '🏖️', correct: false }
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
        instruction: 'Which vehicle FLIES in the sky?',
        instructionTa: 'வானத்தில் பறக்கும் வாகனம் எது? ✈️',
        options: [
          { text: 'Aeroplane', emoji: '✈️', correct: true },
          { text: 'Car', emoji: '🚗', correct: false },
          { text: 'Train', emoji: '🚂', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which vehicle has TWO wheels?',
        instructionTa: 'இரண்டு சக்கர வாகனம் எது? 🚲',
        options: [
          { text: 'Bicycle', emoji: '🚲', correct: true },
          { text: 'Bus', emoji: '🚌', correct: false },
          { text: 'Truck', emoji: '🚚', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which vehicle moves on WATER?',
        instructionTa: 'தண்ணீரில் செல்லும் வாகனம் எது? 🚢',
        options: [
          { text: 'Boat', emoji: '⛵', correct: true },
          { text: 'Train', emoji: '🚂', correct: false },
          { text: 'Helicopter', emoji: '🚁', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What vehicle stops at a RED light?',
        instructionTa: 'சிவப்பு விளக்கு எரிந்தால் எந்த வாகனம் நிற்கும்? 🚥',
        options: [
          { text: 'Car', emoji: '🚗', correct: true },
          { text: 'Aeroplane', emoji: '✈️', correct: false },
          { text: 'Boat', emoji: '⛵', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which is the LONGEST vehicle?',
        instructionTa: 'மிகவும் நீளமான வாகனம் எது? 🚂',
        options: [
          { text: 'Train', emoji: '🚂', correct: true },
          { text: 'Auto', emoji: '🛺', correct: false },
          { text: 'Cycle', emoji: '🚲', correct: false }
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
        instruction: 'What should we do BEFORE eating?',
        instructionTa: 'சாப்பிடும் முன் நாம் என்ன செய்ய வேண்டும்? 🧼',
        options: [
          { text: 'Wash Hands', emoji: '🧼', correct: true },
          { text: 'Play with Mud', emoji: '⚽', correct: false },
          { text: 'Sleep', emoji: '🛏️', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which is HEALTHY food?',
        instructionTa: 'ஆரோக்கியமான உணவு எது? 🍎',
        options: [
          { text: 'Apple', emoji: '🍎', correct: true },
          { text: 'Chocolate', emoji: '🍫', correct: false },
          { text: 'Ice Cream', emoji: '🍦', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What should we do EVERY DAY?',
        instructionTa: 'நாம் தினமும் செய்ய வேண்டியது என்ன? 🪥',
        options: [
          { text: 'Brush Teeth', emoji: '🪥', correct: true },
          { text: 'Eat Mud', emoji: '🏖️', correct: false },
          { text: 'Fight', emoji: '🤼', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Where should we throw waste?',
        instructionTa: 'குப்பையை எங்கே போட வேண்டும்? 🗑️',
        options: [
          { text: 'Dustbin', emoji: '🗑️', correct: true },
          { text: 'Floor', emoji: '🧹', correct: false },
          { text: 'Bed', emoji: '🛏️', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'When should we SLEEP?',
        instructionTa: 'நாம் எப்போது தூங்க வேண்டும்? 🌙',
        options: [
          { text: 'At Night', emoji: '🌙', correct: true },
          { text: 'During Class', emoji: '🏫', correct: false },
          { text: 'While Eating', emoji: '🍱', correct: false }
        ]
      }
    ]
  }
];


export const GK_LEVELS: Level[] = [
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


export const HINDI_LEVELS: Level[] = [
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
        instructionTa: 'खड़ी रेखा (Standing Line) कैसी दिखती है? ✏️',
        options: [
          { text: 'Standing Line', emoji: '┃', correct: true },
          { text: 'Sleeping Line', emoji: '━', correct: false },
          { text: 'Slanting Line', emoji: '╱', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the Standing Line stroke',
        instructionTa: 'खड़ी रेखा (Standing Line) को बोर्ड पर लिखें! ✏️',
        letter: '┃',
        options: []
      },
      {
        type: 'choice',
        instruction: 'What does a Sleeping Line look like?',
        instructionTa: 'लेटी रेखा (Sleeping Line) कैसी दिखती है? ✏️',
        options: [
          { text: 'Sleeping Line', emoji: '━', correct: true },
          { text: 'Standing Line', emoji: '┃', correct: false },
          { text: 'Slanting Line', emoji: '╱', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the Sleeping Line stroke',
        instructionTa: 'लेटी रेखा (Sleeping Line) को बोर्ड पर लिखें! ✏️',
        letter: '━',
        options: []
      },
      {
        type: 'sequence',
        instruction: 'Complete the pattern:',
        instructionTa: 'पैटर्न को पूरा करें! 🧩',
        sequence: ['┃', '━', '┃', '_'],
        options: [
          { text: '━ (Sleeping)', correct: true },
          { text: '┃ (Standing)', correct: false },
          { text: '╱ (Slanting)', correct: false }
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


export const MATH_LEVELS: Level[] = [

  {
    id: 1,
    title: 'Pre-Math Adventures',
    titleEn: 'Big, Tall, Heavy & More',
    mascot: '⚖️',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'math_compare',
        instruction: 'Which animal is BIGGER?',
        instructionTa: 'இவற்றில் பெரிய விலங்கு எது? 🐘🐜',
        options: [
          { text: 'Elephant', emoji: '🐘', correct: true },
          { text: 'Ant', emoji: '🐜', correct: false }
        ]
      },
      {
        type: 'math_compare',
        instruction: 'Which item is HEAVIER?',
        instructionTa: 'இவற்றில் அதிக எடையுள்ளது எது? 🪨🪶',
        options: [
          { text: 'Rock', emoji: '🪨', correct: true },
          { text: 'Feather', emoji: '🪶', correct: false }
        ]
      },
      {
        type: 'math_compare',
        instruction: 'Which tree is TALLER?',
        instructionTa: 'இவற்றில் உயரமான மரம் எது? 🌲🌱',
        options: [
          { text: 'Pine Tree', emoji: '🌲', correct: true },
          { text: 'Little Plant', emoji: '🌱', correct: false }
        ]
      },
      {
        type: 'math_compare',
        instruction: 'Which plate has MORE cookies?',
        instructionTa: 'இவற்றில் எதில் அதிகமான குக்கீகள் உள்ளன? 🍪',
        options: [
          { text: '5 Cookies', emoji: '🍪', correct: true },
          { text: '2 Cookies', emoji: '🍪', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Select the object that is DIFFERENT:',
        instructionTa: 'வேறுபட்ட பொருளைத் தேர்ந்தெடு! 🔍',
        options: [
          { text: 'Banana', emoji: '🍌', correct: true },
          { text: 'Apple', emoji: '🍎', correct: false },
          { text: 'Apple', emoji: '🍎', correct: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Shapes & Spatial Kingdom',
    titleEn: 'Circle, Square & Positions',
    mascot: '📐',
    color: 'from-sky-400 to-indigo-500',
    borderColor: 'border-sky-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which object is a CIRCLE? ⭕',
        instructionTa: 'வட்ட வடிவில் இருக்கும் பொருள் எது? ⭕',
        options: [
          { text: 'Clock', emoji: '⏰', correct: true },
          { text: 'Book', emoji: '📖', correct: false },
          { text: 'Pizza Slice', emoji: '🍕', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which object is a TRIANGLE? 🔺',
        instructionTa: 'முக்கோண வடிவில் இருக்கும் பொருள் எது? 🔺',
        options: [
          { text: 'Pizza Slice', emoji: '🍕', correct: true },
          { text: 'Tv Screen', emoji: '📺', correct: false },
          { text: 'Ball', emoji: '⚽', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Where is the bird? (Inside the Cage)',
        instructionTa: 'பறவை எங்கே இருக்கிறது? 🐦',
        options: [
          { text: 'Inside', emoji: '🚪🐦', correct: true },
          { text: 'Outside', emoji: '🌳🐦', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which is ABOVE the table? 🧸',
        instructionTa: 'மேஜைக்கு மேலே இருப்பது எது? 🧸',
        options: [
          { text: 'Teddy Bear', emoji: '🧸', correct: true },
          { text: 'Shoes', emoji: '👞', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which hand is the LEFT hand? 🖐️',
        instructionTa: 'இடது கை எது? 🖐️',
        options: [
          { text: 'Left Hand', emoji: '👈', correct: true },
          { text: 'Right Hand', emoji: '👉', correct: false }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Counting Stars 1-5',
    titleEn: 'Numbers 1-5',
    mascot: '🔢',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'math_count',
        instruction: 'Count the butterflies! 🦋',
        instructionTa: 'வண்ணத்துப்பூச்சிகளை எண்ணுங்கள்! 🦋',
        options: [
          { text: '3', correct: true },
          { text: '2', correct: false },
          { text: '4', correct: false }
        ],
        sequence: ['🦋', '🦋', '🦋']
      },
      {
        type: 'math_count',
        instruction: 'Count the stars! ⭐',
        instructionTa: 'நட்சத்திரங்களை எண்ணுங்கள்! ⭐',
        options: [
          { text: '5', correct: true },
          { text: '4', correct: false },
          { text: '3', correct: false }
        ],
        sequence: ['⭐', '⭐', '⭐', '⭐', '⭐']
      },
      {
        type: 'math_count',
        instruction: 'Count the balloons! 🎈',
        instructionTa: 'பலூன்களை எண்ணுங்கள்! 🎈',
        options: [
          { text: '2', correct: true },
          { text: '1', correct: false },
          { text: '3', correct: false }
        ],
        sequence: ['🎈', '🎈']
      },
      {
        type: 'choice',
        instruction: 'Which number is FIVE? 🖐️',
        instructionTa: 'எண் ஐந்து எது? 🖐️',
        options: [
          { text: '5', correct: true },
          { text: '3', correct: false },
          { text: '4', correct: false }
        ]
      },
      {
        type: 'sequence',
        instruction: 'Fill the missing number:',
        instructionTa: 'விடுபட்ட எண்ணை நிரப்பவும்! 🧩',
        sequence: ['1', '2', '_', '4', '5'],
        options: [
          { text: '3', correct: true },
          { text: '4', correct: false },
          { text: '5', correct: false }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Counting Safari 6-10',
    titleEn: 'Numbers 6-10 & More',
    mascot: '🦁',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'math_count',
        instruction: 'Count the lions! 🦁',
        instructionTa: 'சிங்கங்களை எண்ணுங்கள்! 🦁',
        options: [
          { text: '7', correct: true },
          { text: '6', correct: false },
          { text: '8', correct: false }
        ],
        sequence: ['🦁', '🦁', '🦁', '🦁', '🦁', '🦁', '🦁']
      },
      {
        type: 'math_count',
        instruction: 'Count the apples! 🍎',
        instructionTa: 'ஆப்பிள்களை எண்ணுங்கள்! 🍎',
        options: [
          { text: '9', correct: true },
          { text: '10', correct: false },
          { text: '8', correct: false }
        ],
        sequence: ['🍎', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎', '🍎']
      },
      {
        type: 'sequence',
        instruction: 'What comes after 8?',
        instructionTa: '8-க்கு பிறகு வரும் எண் எது? 🧩',
        sequence: ['6', '7', '8', '_'],
        options: [
          { text: '9', correct: true },
          { text: '10', correct: false },
          { text: '5', correct: false }
        ]
      },
      {
        type: 'sequence',
        instruction: 'What comes before 7?',
        instructionTa: '7-க்கு முன்பு வரும் எண் எது? 🧩',
        sequence: ['4', '5', '_', '7'],
        options: [
          { text: '6', correct: true },
          { text: '8', correct: false },
          { text: '3', correct: false }
        ]
      },
      {
        type: 'math_count',
        instruction: 'Count the fish! 🐟',
        instructionTa: 'மீன்களை எண்ணுங்கள்! 🐟',
        options: [
          { text: '6', correct: true },
          { text: '7', correct: false },
          { text: '5', correct: false }
        ],
        sequence: ['🐟', '🐟', '🐟', '🐟', '🐟', '🐟']
      }
    ]
  },
  {
    id: 5,
    title: 'Color & Size Sorting Hub',
    titleEn: 'Color & Size Sorting',
    mascot: '🧼',
    color: 'from-blue-400 to-cyan-500',
    borderColor: 'border-blue-300',
    questions: [
      {
        type: 'sorting',
        instruction: 'Identify the RED object: 🔴',
        instructionTa: 'சிவப்பு நிற பொருளைக் கண்டுபிடி! 🔴',
        options: [
          { text: 'Strawberry 🍓', correct: true },
          { text: 'Banana 🍌', correct: false },
          { text: 'Leaf 🍃', correct: false }
        ]
      },
      {
        type: 'sorting',
        instruction: 'Identify the SMALL object:',
        instructionTa: 'சிறிய பொருளைக் கண்டுபிடி! 🔍',
        options: [
          { text: 'Cherry 🍒', correct: true },
          { text: 'Watermelon 🍉', correct: false },
          { text: 'Pumpkin 🎃', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which plate has LESS items?',
        instructionTa: 'குறைவான பொருட்கள் இருக்கும் தட்டு எது? 🍽️',
        options: [
          { text: '2 Apples', emoji: '🍎🍎', correct: true },
          { text: '4 Apples', emoji: '🍎🍎🍎🍎', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which box is OPEN? 📦',
        instructionTa: 'திறந்திருக்கும் பெட்டி எது? 📦',
        options: [
          { text: 'Open Box', emoji: '👐📦', correct: true },
          { text: 'Closed Box', emoji: '🔒📦', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which gate is CLOSED? 🚪',
        instructionTa: 'மூடியிருக்கும் கதவு எது? 🚪',
        options: [
          { text: 'Closed Gate', emoji: '🔒🚪', correct: true },
          { text: 'Open Gate', emoji: '🚪🏃', correct: false }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'Pattern Puzzle Quest',
    titleEn: 'Shape & Color Patterns',
    mascot: '🧩',
    color: 'from-rose-400 to-red-500',
    borderColor: 'border-rose-350',
    questions: [
      {
        type: 'math_pattern',
        instruction: 'Complete the pattern: 🔴 🔵 🔴 🔵 ?',
        instructionTa: 'வடிவத்தை நிரப்பவும்! 🧩',
        sequence: ['🔴', '🔵', '🔴', '🔵', '?'],
        options: [
          { text: 'Red Ball 🔴', emoji: '🔴', correct: true },
          { text: 'Blue Ball 🔵', emoji: '🔵', correct: false },
          { text: 'Yellow Ball 🟡', emoji: '🟡', correct: false }
        ]
      },
      {
        type: 'math_pattern',
        instruction: 'Complete the pattern: 🍎 🍌 🍎 🍌 ?',
        instructionTa: 'வடிவத்தை நிரப்பவும்! 🧩',
        sequence: ['🍎', '🍌', '🍎', '🍌', '?'],
        options: [
          { text: 'Apple 🍎', emoji: '🍎', correct: true },
          { text: 'Banana 🍌', emoji: '🍌', correct: false },
          { text: 'Orange 🍊', emoji: '🍊', correct: false }
        ]
      },
      {
        type: 'math_pattern',
        instruction: 'Complete the pattern: 🔺 🟢 🔺 🟢 ?',
        instructionTa: 'வடிவத்தை நிரப்பவும்! 🧩',
        sequence: ['🔺', '🟢', '🔺', '🟢', '?'],
        options: [
          { text: 'Triangle 🔺', emoji: '🔺', correct: true },
          { text: 'Circle 🟢', emoji: '🟢', correct: false },
          { text: 'Square 🟨', emoji: '🟨', correct: false }
        ]
      },
      {
        type: 'math_pattern',
        instruction: 'Complete the pattern: ☀️ ☁️ ☀️ ☁️ ?',
        instructionTa: 'வடிவத்தை நிரப்பவும்! 🧩',
        sequence: ['☀️', '☁️', '☀️', '☁️', '?'],
        options: [
          { text: 'Sun ☀️', emoji: '☀️', correct: true },
          { text: 'Cloud ☁️', emoji: '☁️', correct: false },
          { text: 'Moon 🌙', emoji: '🌙', correct: false }
        ]
      },
      {
        type: 'math_pattern',
        instruction: 'Complete the pattern: 🐶 🐱 🐶 🐱 ?',
        instructionTa: 'வடிவத்தை நிரப்பவும்! 🧩',
        sequence: ['🐶', '🐱', '🐶', '🐱', '?'],
        options: [
          { text: 'Dog 🐶', emoji: '🐶', correct: true },
          { text: 'Cat 🐱', emoji: '🐱', correct: false },
          { text: 'Bird 🐦', emoji: '🐦', correct: false }
        ]
      }
    ]
  }
];

