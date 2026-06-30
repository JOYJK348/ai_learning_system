import { type Level } from './quizData';

// Re-using the LKG Level type definition but displaying as Missions/Adventures in the UI.
// Exactly 6 Missions per subject, exactly 5 questions per Mission.
// Types supported: 'choice', 'spelling', 'sorting', 'sequence', 'match', 'trace', 'math_compare', 'math_count', 'math_pattern', 'order'

export const UKG_TAMIL_LEVELS: Level[] = [
  {
    id: 1,
    title: 'விண்ணப்பப் பயணம்: அ - ஔ அறிமுகம்',
    titleEn: 'Mission 1: Vowels Exploration',
    mascot: '🍎',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'choice',
        instruction: '"அ" எதில் தொடங்கும்?',
        instructionTa: '"அ" எதில் தொடங்கும்?',
        options: [
          { text: 'அம்மா 👩', correct: true },
          { text: 'ஆடு 🐐', correct: false },
          { text: 'இலை 🍃', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: '"அ" எழுத்தை வரைந்து பழகுங்கள்',
        instructionTa: '"அ" எழுத்தை வரைந்து பழகுங்கள்',
        letter: 'அ',
        options: []
      },
      {
        type: 'sequence',
        instruction: 'விடுபட்ட உயிரெழுத்தை நிரப்பவும்: அ ___ இ ஈ',
        instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்பவும்: அ ___ இ ஈ',
        sequence: ['அ', '_', 'இ', 'ஈ'],
        options: [
          { text: 'ஆ', emoji: '✍️', correct: true },
          { text: 'உ', emoji: '✍️', correct: false },
          { text: 'ஏ', emoji: '✍️', correct: false }
        ]
      },
      {
        type: 'match',
        instruction: '"இ" எழுத்திற்குப் பொருத்தமான படம் எது?',
        instructionTa: '"இ" எழுத்திற்குப் பொருத்தமான படம் எது?',
        matchImage: 'இலை',
        options: [
          { text: 'இலை 🍃', correct: true },
          { text: 'ஆப்பிள் 🍎', correct: false },
          { text: 'ஒட்டகம் 🐫', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'உயிரெழுத்துக்களின் கடைசி எழுத்து எது?',
        instructionTa: 'உயிரெழுத்துக்களின் கடைசி எழுத்து எது?',
        options: [
          { text: 'ஔ', correct: true },
          { text: 'அ', correct: false },
          { text: 'ஃ', correct: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'மெய் எழுத்துக்கள் சவால்: க் முதல் ன் வரை',
    titleEn: 'Mission 2: Consonants Hunt',
    mascot: '🐯',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'choice',
        instruction: '"க்" வரும் சொல் எது?',
        instructionTa: '"க்" வரும் சொல் எது?',
        options: [
          { text: 'தக்காளி 🍅', correct: true },
          { text: 'பந்து ⚽', correct: false },
          { text: 'மரம் 🌳', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: '"க்" எழுத்தை வரைந்து பழகுங்கள்',
        instructionTa: '"க்" எழுத்தை வரைந்து பழகுங்கள்',
        letter: 'க்',
        options: []
      },
      {
        type: 'sequence',
        instruction: 'விடுபட்ட மெய்யெழுத்து: த் ___ ந்',
        instructionTa: 'விடுபட்ட மெய்யெழுத்து: த் ___ ந்',
        sequence: ['த்', '_', 'ந்'],
        options: [
          { text: 'ந்', correct: true },
          { text: 'ப்', correct: false },
          { text: 'ம்', correct: false }
        ]
      },
      {
        type: 'match',
        instruction: '"ம்" மெய்யெழுத்திற்குப் பொருத்தமான படம்:',
        instructionTa: '"ம்" மெய்யெழுத்திற்குப் பொருத்தமான படம்:',
        matchImage: 'மரம்',
        options: [
          { text: 'மரம் 🌳', correct: true },
          { text: 'மீன் 🐟', correct: false },
          { text: 'நாய்க்குட்டி 🐶', correct: false }
        ]
      },
      {
        type: 'sorting',
        instruction: 'இதில் மெய்யெழுத்து எது?',
        instructionTa: 'இதில் மெய்யெழுத்து எது?',
        letter: 'ப்',
        options: [
          { text: 'ப் (மெய் எழுத்து)', correct: true },
          { text: 'அ (உயிர் எழுத்து)', correct: false }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'உயிர்மெய் பயணம்: கா முதல் னா வரிசை',
    titleEn: 'Mission 3: Compound Letters',
    mascot: '🐢',
    color: 'from-violet-500 to-indigo-500',
    borderColor: 'border-violet-300',
    questions: [
      {
        type: 'choice',
        instruction: 'க + ஆ = ?',
        instructionTa: 'க + ஆ = ?',
        options: [
          { text: 'கா', correct: true },
          { text: 'க', correct: false },
          { text: 'கி', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: '"கா" எழுத்தை வரைந்து பழகுங்கள்',
        instructionTa: '"கா" எழுத்தை வரைந்து பழகுங்கள்',
        letter: 'கா',
        options: []
      },
      {
        type: 'sequence',
        instruction: 'விடுபட்ட எழுத்து: கா ___ சா ஞா',
        instructionTa: 'விடுபட்ட எழுத்து: கா ___ சா ஞா',
        sequence: ['கா', '_', 'சா', 'ஞா'],
        options: [
          { text: 'ஙா', correct: true },
          { text: 'டா', correct: false },
          { text: 'தா', correct: false }
        ]
      },
      {
        type: 'match',
        instruction: '"பா"வில் தொடங்கும் படம் எது?',
        instructionTa: '"பா"வில் தொடங்கும் படம் எது?',
        matchImage: 'பந்து',
        options: [
          { text: 'பாப்பா 👶', correct: true },
          { text: 'இலை 🍃', correct: false },
          { text: 'உப்பு 🧂', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'ச + ஆ = ?',
        instructionTa: 'ச + ஆ = ?',
        options: [
          { text: 'சா', correct: true },
          { text: 'சி', correct: false },
          { text: 'சு', correct: false }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'சொல் சேர்ப்பு சவால்: க + ல் = கல்',
    titleEn: 'Mission 4: Word Builder',
    mascot: '🧩',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      {
        type: 'choice',
        instruction: 'அழுத்திச் சேர்க்கவும்: ப + ல் = ?',
        instructionTa: 'அழுத்திச் சேர்க்கவும்: ப + ல் = ?',
        options: [
          { text: 'பல் (Tooth) 🦷', correct: true },
          { text: 'கல் (Stone) 🪨', correct: false },
          { text: 'புல் (Grass) 🌱', correct: false }
        ]
      },
      {
        type: 'spelling',
        instruction: 'விடுபட்ட எழுத்தை நிரப்புக: க _ ல் (கல்)',
        instructionTa: 'விடுபட்ட எழுத்தை நிரப்புக: க _ ல் (கல்)',
        letter: 'க_ல்',
        options: [
          { text: 'ல்', correct: true },
          { text: 'ம்', correct: false },
          { text: 'ப்', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: '"பல்" வார்த்தையை எழுதிப் பழகுங்கள்',
        instructionTa: '"பல்" வார்த்தையை எழுதிப் பழகுங்கள்',
        letter: 'பல்',
        options: []
      },
      {
        type: 'match',
        instruction: '"மரம்" வார்த்தைக்குப் பொருத்தமான படம்:',
        instructionTa: '"மரம்" வார்த்தைக்குப் பொருத்தமான படம்:',
        matchImage: 'மரம்',
        options: [
          { text: 'மரம் 🌳', correct: true },
          { text: 'இலை 🍃', correct: false },
          { text: 'கல் 🪨', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'க + ல் சேர்ந்தால் என்ன வரும்?',
        instructionTa: 'க + ல் சேர்ந்தால் என்ன வரும்?',
        options: [
          { text: 'கல்', correct: true },
          { text: 'மல்', correct: false },
          { text: 'பல்', correct: false }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'எளிய சொற்கள் சவால்: சொற்களை வாசித்தல்',
    titleEn: 'Mission 5: Simple Words',
    mascot: '🚀',
    color: 'from-purple-500 to-fuchsia-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'choice',
        instruction: '"படம்" என்ற சொல்லைத் தேர்ந்தெடுக்கவும்:',
        instructionTa: '"படம்" என்ற சொல்லைத் தேர்ந்தெடுக்கவும்:',
        options: [
          { text: 'படம் 🖼️', correct: true },
          { text: 'பந்து ⚽', correct: false },
          { text: 'மரம் 🌳', correct: false }
        ]
      },
      {
        type: 'spelling',
        instruction: 'விடுபட்ட எழுத்து: ம _ ம் (மரம்)',
        instructionTa: 'விடுபட்ட எழுத்து: ம _ ம் (மரம்)',
        letter: 'ம_ம்',
        options: [
          { text: 'ர', correct: true },
          { text: 'ல', correct: false },
          { text: 'ப', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: '"மீன்" வார்த்தையை எழுதவும்',
        instructionTa: '"மீன்" வார்த்தையை எழுதவும்',
        letter: 'மீன்',
        options: []
      },
      {
        type: 'match',
        instruction: '"பந்து"க்குச் சரியான படம்:',
        instructionTa: '"பந்து"க்குச் சரியான படம்:',
        matchImage: 'பந்து',
        options: [
          { text: 'பந்து ⚽', correct: true },
          { text: 'மரம் 🌳', correct: false },
          { text: 'பல் 🦷', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'இவற்றுள் பறவை எது?',
        instructionTa: 'இவற்றுள் பறவை எது?',
        options: [
          { text: 'கிளி 🦜', correct: true },
          { text: 'மீன் 🐟', correct: false },
          { text: 'நாய் 🐶', correct: false }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'சிறு வாக்கியங்கள் சவால்: எளிய வாக்கியங்கள்',
    titleEn: 'Mission 6: Simple Sentences',
    mascot: '📜',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'choice',
        instruction: '"அது ஒரு மரம்." — சரியான படம்:',
        instructionTa: '"அது ஒரு மரம்." — சரியான படம்:',
        options: [
          { text: 'மரம் 🌳', correct: true },
          { text: 'வீடு 🏠', correct: false },
          { text: 'பந்து ⚽', correct: false }
        ]
      },
      {
        type: 'sequence',
        instruction: 'வாக்கியத்தை நிரப்புக: இது எனது ___ (வீடு 🏠)',
        instructionTa: 'வாக்கியத்தை நிரப்புக: இது எனது ___ (வீடு 🏠)',
        sequence: ['இது', 'எனது', '_'],
        options: [
          { text: 'வீடு', correct: true },
          { text: 'மரம்', correct: false },
          { text: 'பந்து', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: '"அது பூ" எழுதவும்',
        instructionTa: '"அது பூ" எழுதவும்',
        letter: 'அது பூ',
        options: []
      },
      {
        type: 'match',
        instruction: '"இது எனது புத்தகம்" — சரியான படம்:',
        instructionTa: '"இது எனது புத்தகம்" — சரியான படம்:',
        matchImage: 'किताब',
        options: [
          { text: 'புத்தகம் 📖', correct: true },
          { text: 'மரம் 🌳', correct: false },
          { text: 'வீடு 🏠', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: '"மீன் நீரில் நீந்துகிறது" — எதைப் பற்றியது?',
        instructionTa: '"மீன் நீரில் நீந்துகிறது" — எதைப் பற்றியது?',
        options: [
          { text: 'மீன் 🐟', correct: true },
          { text: 'நாய் 🐶', correct: false },
          { text: 'பூனை 🐱', correct: false }
        ]
      }
    ]
  }
];

export const UKG_ENGLISH_LEVELS: Level[] = [
  {
    id: 1,
    title: 'Word Family: -at words',
    titleEn: 'Mission 1: CVC Words (-at)',
    mascot: '🐱',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which picture shows a C-A-T?',
        options: [
          { text: 'cat', emoji: '🐱', correct: true },
          { text: 'dog', emoji: '🐶', correct: false },
          { text: 'sun', emoji: '☀️', correct: false }
        ]
      },
      {
        type: 'spelling',
        instruction: 'Complete the CVC word: c _ t',
        letter: 'c_t',
        options: [
          { text: 'a', correct: true },
          { text: 'o', correct: false },
          { text: 'i', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Find the word that does NOT belong to the -at family:',
        options: [
          { text: 'pig', emoji: '🐷', correct: true },
          { text: 'hat', emoji: '🎩', correct: false },
          { text: 'mat', emoji: '🟫', correct: false }
        ]
      },
      {
        type: 'match',
        instruction: 'Match the word H-A-T to the correct picture:',
        matchImage: 'umbrella', // placeholder check
        options: [
          { text: 'hat 🎩', correct: true },
          { text: 'rat 🐀', correct: false },
          { text: 'bat 🏏', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the CVC word "cat"',
        letter: 'cat',
        options: []
      }
    ]
  },
  {
    id: 2,
    title: 'Sight Words & Short Sentences',
    titleEn: 'Mission 2: Short Sentences',
    mascot: '👁️',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Find the sight word: "THE"',
        options: [
          { text: 'the', correct: true },
          { text: 'and', correct: false },
          { text: 'you', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Complete the sentence: "The sun is ___"',
        options: [
          { text: 'hot', emoji: '🔥', correct: true },
          { text: 'cold', emoji: '❄️', correct: false },
          { text: 'wet', emoji: '🌧️', correct: false }
        ]
      },
      {
        type: 'sequence',
        instruction: 'Order the words: "The dog runs."',
        sequence: ['The', 'dog', '_'],
        options: [
          { text: 'runs', correct: true },
          { text: 'sleeps', correct: false },
          { text: 'eats', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the word "play"',
        letter: 'play',
        options: []
      },
      {
        type: 'choice',
        instruction: 'Complete the phrase: "A red ___"',
        options: [
          { text: 'apple 🍎', correct: true },
          { text: 'sky 🌌', correct: false },
          { text: 'grass 🌱', correct: false }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'One & Many',
    titleEn: 'Mission 3: Plurals concept',
    mascot: '🍎',
    color: 'from-violet-500 to-indigo-500',
    borderColor: 'border-violet-300',
    questions: [
      {
        type: 'choice',
        instruction: 'One Apple, Many ___',
        options: [
          { text: 'Apples 🍎🍎', correct: true },
          { text: 'Apple 🍎', correct: false },
          { text: 'Cat 🐱', correct: false }
        ]
      },
      {
        type: 'spelling',
        instruction: 'Write the plural: cat + s = ___',
        letter: 'cat_',
        options: [
          { text: 's', correct: true },
          { text: 'e', correct: false },
          { text: 'x', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Choose the correct group for "Many Dogs":',
        options: [
          { text: '🐶🐶🐶', correct: true },
          { text: '🐶', correct: false },
          { text: '🐱🐱', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the plural word "dogs"',
        letter: 'dogs',
        options: []
      },
      {
        type: 'choice',
        instruction: 'One Star, Many ___',
        options: [
          { text: 'Stars ⭐⭐⭐', correct: true },
          { text: 'Star ⭐', correct: false },
          { text: 'Moon 🌙', correct: false }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Male & Female',
    titleEn: 'Mission 4: Genders',
    mascot: '👦',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Boy is Male. What is Female?',
        options: [
          { text: 'Girl 👧', correct: true },
          { text: 'Man 👨', correct: false },
          { text: 'Father 👨', correct: false }
        ]
      },
      {
        type: 'match',
        instruction: 'Match Father 👨 with:',
        matchImage: '👩',
        options: [
          { text: 'Mother 👩', correct: true },
          { text: 'Sister 👧', correct: false },
          { text: 'Brother 👦', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Brother is Male. Sister is ___',
        options: [
          { text: 'Female 👧', correct: true },
          { text: 'Male 👦', correct: false },
          { text: 'Grandpa 👴', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the word "girl"',
        letter: 'girl',
        options: []
      },
      {
        type: 'choice',
        instruction: 'Match King 👑 with:',
        options: [
          { text: 'Queen 👸', correct: true },
          { text: 'Princess 👧', correct: false },
          { text: 'Prince 👦', correct: false }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'This / That',
    titleEn: 'Mission 5: Pronouns Near & Far',
    mascot: '👉',
    color: 'from-purple-500 to-fuchsia-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'choice',
        instruction: '___ is an apple (Near: 🍎)',
        options: [
          { text: 'This', correct: true },
          { text: 'That', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: '___ is a star (Far: ⭐)',
        options: [
          { text: 'That', correct: true },
          { text: 'This', correct: false }
        ]
      },
      {
        type: 'sequence',
        instruction: 'Complete: "___ is my house" (Far: 🏠)',
        sequence: ['_', 'is', 'my', 'house'],
        options: [
          { text: 'That', correct: true },
          { text: 'This', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the word "this"',
        letter: 'this',
        options: []
      },
      {
        type: 'choice',
        instruction: '___ is my toy (Near: 🧸)',
        options: [
          { text: 'This', correct: true },
          { text: 'That', correct: false }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'Action Words & Questions',
    titleEn: 'Mission 6: Actions',
    mascot: '🏃',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'choice',
        instruction: 'What is the boy doing? 🏃',
        options: [
          { text: 'Running 🏃', correct: true },
          { text: 'Sleeping 🛌', correct: false },
          { text: 'Eating 🍽️', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Complete: "A bird can ___"',
        options: [
          { text: 'fly 🐦', correct: true },
          { text: 'swim 🐟', correct: false },
          { text: 'run 🐕', correct: false }
        ]
      },
      {
        type: 'match',
        instruction: 'Match Sleeping 🛌 to correct image:',
        matchImage: '🛌',
        options: [
          { text: 'Sleeping 🛌', correct: true },
          { text: 'Playing ⚽', correct: false },
          { text: 'Reading 📖', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the action word "jump"',
        letter: 'jump',
        options: []
      },
      {
        type: 'choice',
        instruction: 'What action is matching "Fish 🐟"?',
        options: [
          { text: 'Swim 🏊', correct: true },
          { text: 'Fly 🦅', correct: false },
          { text: 'Run 🏃', correct: false }
        ]
      }
    ]
  }
];

export const UKG_MATH_LEVELS: Level[] = [
  {
    id: 1,
    title: 'எண் வேட்டை: 1 to 50',
    titleEn: 'Mission 1: Number Hunt 1-50',
    mascot: '🔢',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'choice',
        instruction: 'இதில் எண் 45 எது?',
        instructionTa: 'इसमें संख्या 45 कौन सी है?',
        options: [
          { text: '45', correct: true },
          { text: '54', correct: false },
          { text: '35', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'எண் 5 ஐ வரைந்து பழகுங்கள்',
        instructionTa: 'संख्या 5 को ट्रेस करें',
        letter: '5',
        options: []
      },
      {
        type: 'sequence',
        instruction: 'விடுபட்ட எண்: 12 ___ 14',
        instructionTa: 'खाली जगह भरें: 12 ___ 14',
        sequence: ['12', '_', '14'],
        options: [
          { text: '13', correct: true },
          { text: '15', correct: false },
          { text: '11', correct: false }
        ]
      },
      {
        type: 'math_compare',
        instruction: 'பெரிய எண்ணைத் தேர்ந்தெடுங்கள்:',
        instructionTa: 'बड़ी संख्या चुनें:',
        options: [
          { text: '30', emoji: '🍎🍎🍎', correct: true },
          { text: '10', emoji: '🍎', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'எண் 20 இன் பெயர் என்ன?',
        instructionTa: '20 का शब्द रूप क्या है?',
        options: [
          { text: 'Twenty', correct: true },
          { text: 'Ten', correct: false },
          { text: 'Twelve', correct: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'எண்ணுதல் சவால்: Counting Objects',
    titleEn: 'Mission 2: Counting & Writing',
    mascot: '⭐️',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'math_count',
        instruction: 'நட்சத்திரங்களை எண்ணுங்கள் ⭐⭐⭐⭐⭐⭐',
        instructionTa: 'सितारे गिनें ⭐⭐⭐⭐⭐⭐',
        sequence: ['⭐', '⭐', '⭐', '⭐', '⭐', '⭐'],
        options: [
          { text: '6', correct: true },
          { text: '5', correct: false },
          { text: '7', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'எண் 8 ஐ வரைந்து பழகுங்கள்',
        instructionTa: 'संख्या 8 को ट्रेस करें',
        letter: '8',
        options: []
      },
      {
        type: 'math_compare',
        instruction: 'குறைவான பொருள்கள் கொண்ட குழு எது?',
        instructionTa: 'कम वस्तुओं वाला समूह कौन सा है?',
        options: [
          { text: '2 apples', emoji: '🍎🍎', correct: true },
          { text: '5 apples', emoji: '🍎🍎🍎🍎🍎', correct: false }
        ]
      },
      {
        type: 'sequence',
        instruction: 'விடுபட்ட எண்: 18 ___ 20',
        instructionTa: 'खाली जगह भरें: 18 ___ 20',
        sequence: ['18', '_', '20'],
        options: [
          { text: '19', correct: true },
          { text: '17', correct: false },
          { text: '21', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: '7 பூக்கள் 🌸 கள் உடைய எண் எது?',
        instructionTa: '7 फूलों की संख्या कितनी है?',
        options: [
          { text: '7', correct: true },
          { text: '9', correct: false },
          { text: '5', correct: false }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'கூட்டல் சவால்: Single Digit Addition',
    titleEn: 'Mission 3: Addition Adventure',
    mascot: '➕',
    color: 'from-violet-500 to-indigo-500',
    borderColor: 'border-violet-300',
    questions: [
      {
        type: 'choice',
        instruction: '3 + 2 = ?',
        instructionTa: '3 + 2 = ?',
        options: [
          { text: '5', correct: true },
          { text: '4', correct: false },
          { text: '6', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'விடை 4 ஐ வரைக (2 + 2 = 4)',
        instructionTa: 'उत्तर 4 को ट्रेस करें',
        letter: '4',
        options: []
      },
      {
        type: 'math_compare',
        instruction: 'அதிகமாக உள்ள கூட்டல் விடை எது?',
        instructionTa: 'बड़ा जोड़ उत्तर कौन सा है?',
        options: [
          { text: '4 + 2 (6)', emoji: '🍎🍎🍎🍎🍎🍎', correct: true },
          { text: '2 + 1 (3)', emoji: '🍎🍎🍎', correct: false }
        ]
      },
      {
        type: 'sequence',
        instruction: 'காலி கட்டம்: 5 + 1 = ___',
        instructionTa: 'खाली जगह भरें: 5 + 1 = ___',
        sequence: ['5', '+', '1', '=', '_'],
        options: [
          { text: '6', correct: true },
          { text: '7', correct: false },
          { text: '4', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: '4 + 3 = ?',
        instructionTa: '4 + 3 = ?',
        options: [
          { text: '7', correct: true },
          { text: '6', correct: false },
          { text: '8', correct: false }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'கழித்தல் சவால்: Simple Subtraction',
    titleEn: 'Mission 4: Subtraction Quest',
    mascot: '➖',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      {
        type: 'choice',
        instruction: '5 - 2 = ?',
        instructionTa: '5 - 2 = ?',
        options: [
          { text: '3', correct: true },
          { text: '2', correct: false },
          { text: '4', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'விடை 2 ஐ வரைக (4 - 2 = 2)',
        instructionTa: 'उत्तर 2 को ट्रेस करें',
        letter: '2',
        options: []
      },
      {
        type: 'math_compare',
        instruction: 'குறைந்த கழித்தல் விடை எது?',
        instructionTa: 'छोटा घटाव उत्तर कौन सा है?',
        options: [
          { text: '3 - 2 (1)', emoji: '🍎', correct: true },
          { text: '5 - 1 (4)', emoji: '🍎🍎🍎🍎', correct: false }
        ]
      },
      {
        type: 'sequence',
        instruction: 'காலி கட்டம்: 8 - 1 = ___',
        instructionTa: 'खाली जगह भरें: 8 - 1 = ___',
        sequence: ['8', '-', '1', '=', '_'],
        options: [
          { text: '7', correct: true },
          { text: '9', correct: false },
          { text: '6', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: '6 - 3 = ?',
        instructionTa: '6 - 3 = ?',
        options: [
          { text: '3', correct: true },
          { text: '2', correct: false },
          { text: '4', correct: false }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'வடிவங்கள் சவால்: Special Shapes',
    titleEn: 'Mission 5: Shape Puzzles',
    mascot: '🔺',
    color: 'from-purple-500 to-fuchsia-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'choice',
        instruction: 'நட்சத்திர வடிவம் (Star shape) எது?',
        instructionTa: 'तारा आकार कौन सा है?',
        options: [
          { text: 'Star ⭐', emoji: '⭐', correct: true },
          { text: 'Oval 🥚', emoji: '🥚', correct: false },
          { text: 'Rectangle 🟫', emoji: '🟫', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'வட்டம் (Circle) வரைந்து பழகுங்கள்',
        instructionTa: 'वृत्त (Circle) बनाएं',
        letter: 'O',
        options: []
      },
      {
        type: 'match',
        instruction: 'வைரம் (Diamond) வடிவத்திற்குப் பொருத்தமான படம்:',
        instructionTa: 'पतंग/हीरा आकार की वस्तु:',
        matchImage: 'पतंग',
        options: [
          { text: 'Kite 🪁', correct: true },
          { text: 'Ball ⚽', correct: false },
          { text: 'Book 📖', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'செவ்வகம் (Rectangle) வடிவம் எது?',
        instructionTa: 'आयत (Rectangle) वस्तु:',
        options: [
          { text: 'Book 📖', emoji: '📖', correct: true },
          { text: 'Kite 🪁', emoji: '🪁', correct: false },
          { text: 'Egg 🥚', emoji: '🥚', correct: false }
        ]
      },
      {
        type: 'sorting',
        instruction: 'முக்கோணம் (Triangle) எது?',
        instructionTa: 'त्रिभुज चुनें:',
        letter: '▲',
        options: [
          { text: 'Triangle 🔺', correct: true },
          { text: 'Circle 🔴', correct: false }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'வடிவமைப்புகள்: AB and ABC Patterns',
    titleEn: 'Mission 6: Pattern Master',
    mascot: '🧩',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'math_pattern',
        instruction: 'வடிவமைப்பை நிறைவு செய்க: 🔴 🔵 🔴 🔵 ___',
        instructionTa: 'पैटर्न पूरा करें: 🔴 🔵 🔴 🔵 ___',
        sequence: ['🔴', '🔵', '🔴', '🔵', '?'],
        options: [
          { text: '🔴 Red Circle', emoji: '🔴', correct: true },
          { text: '🔵 Blue Circle', emoji: '🔵', correct: false },
          { text: '🟡 Yellow Circle', emoji: '🟡', correct: false }
        ]
      },
      {
        type: 'math_pattern',
        instruction: 'வடிவமைப்பை நிறைவு செய்க: 🍎 🍌 🍎 🍌 ___',
        instructionTa: 'पैटर्न पूरा करें: 🍎 🍌 🍎 🍌 ___',
        sequence: ['🍎', '🍌', '🍎', '🍌', '?'],
        options: [
          { text: '🍎 Apple', emoji: '🍎', correct: true },
          { text: '🍌 Banana', emoji: '🍌', correct: false },
          { text: '🍇 Grape', emoji: '🍇', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'வடிவமைப்பை வரையவும் (1 2 1 2)',
        instructionTa: 'पैटर्न 1 2 लिखें',
        letter: '1212',
        options: []
      },
      {
        type: 'math_pattern',
        instruction: 'வடிவமைப்பை நிறைவு செய்க: ☀️ 🌙 ☀️ 🌙 ___',
        instructionTa: 'पैटर्न पूरा करें: ☀️ 🌙 ☀️ 🌙 ___',
        sequence: ['☀️', '🌙', '☀️', '🌙', '?'],
        options: [
          { text: '☀️ Sun', emoji: '☀️', correct: true },
          { text: '🌙 Moon', emoji: '🌙', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'அடுத்ததாக வருவது எது? 🟢 🟡 🟢 🟡 ___',
        instructionTa: 'अगला क्या है? 🟢 🟡 🟢 🟡 ___',
        options: [
          { text: '🟢 Green', emoji: '🟢', correct: true },
          { text: '🟡 Yellow', emoji: '🟡', correct: false }
        ]
      }
    ]
  }
];

export const UKG_EVS_LEVELS: Level[] = [
  {
    id: 1,
    title: 'சுயவிவரம் சவால்: My Personal Details',
    titleEn: 'Mission 1: Myself & Senses',
    mascot: '🧒',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'choice',
        instruction: 'How do you see the flowers? 🌸',
        instructionTa: 'பூக்களை எதைக் கொண்டு பார்க்கிறாய்? 🌸',
        options: [
          { text: 'Eyes 👀', emoji: '👀', correct: true },
          { text: 'Ears 👂', emoji: '👂', correct: false },
          { text: 'Nose 👃', emoji: '👃', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which part helps us hear the bell? 🔔',
        instructionTa: 'மணி ஓசையை அறிய உதவும் உறுப்பு எது? 🔔',
        options: [
          { text: 'Ears 👂', emoji: '👂', correct: true },
          { text: 'Tongue 👅', emoji: '👅', correct: false },
          { text: 'Skin 🖐️', correct: false }
        ]
      },
      {
        type: 'match',
        instruction: 'Match Nose 👃 to its function:',
        instructionTa: 'மூக்கின் முக்கியப் பணி எது? 👃',
        matchImage: 'फूल',
        options: [
          { text: 'Smell Flower 👃🌸', correct: true },
          { text: 'Taste Food 👅🍎', correct: false },
          { text: 'Hear Music 👂🎵', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the word "eye"',
        instructionTa: 'eye வார்த்தையை வரைந்து பழகுங்கள்',
        letter: 'eye',
        options: []
      },
      {
        type: 'choice',
        instruction: 'Which organ is for taste? 🍦',
        instructionTa: 'சுவையை அறியும் உறுப்பு எது? 🍦',
        options: [
          { text: 'Tongue 👅', emoji: '👅', correct: true },
          { text: 'Nose 👃', emoji: '👃', correct: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'தாவரங்கள் சவால்: Parts of a Plant',
    titleEn: 'Mission 2: Plants & Nature',
    mascot: '🌱',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which part of the plant is under the ground?',
        instructionTa: 'மண்ணிற்கு அடியில் இருக்கும் தாவரத்தின் பகுதி எது?',
        options: [
          { text: 'Root (வேர்) 🪵', correct: true },
          { text: 'Leaf (இலை) 🍃', correct: false },
          { text: 'Flower (பூ) 🌸', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What do plants need to grow?',
        instructionTa: 'தாவரங்கள் வளர என்ன தேவை?',
        options: [
          { text: 'Water & Sunlight 💧☀️', correct: true },
          { text: 'Chocolate 🍫', correct: false },
          { text: 'Toys 🧸', correct: false }
        ]
      },
      {
        type: 'match',
        instruction: 'Match Leaf 🍃 with its color:',
        instructionTa: 'இலையின் வண்ணம் எது? 🍃',
        matchImage: 'पेड़',
        options: [
          { text: 'Green (பச்சை) 💚', correct: true },
          { text: 'Red (சிவப்பு) ❤️', correct: false },
          { text: 'Blue (நீலம்) 💙', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the word "leaf"',
        instructionTa: 'leaf வார்த்தையை வரைக',
        letter: 'leaf',
        options: []
      },
      {
        type: 'choice',
        instruction: 'Which part of a plant is colorful and smells good?',
        instructionTa: 'தாவரத்தின் வாசனையுள்ள வண்ணப் பகுதி எது?',
        options: [
          { text: 'Flower 🌸', emoji: '🌸', correct: true },
          { text: 'Root 🪵', emoji: '🪵', correct: false }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'விலங்குகள் உலகம்: Domestic & Wild Animals',
    titleEn: 'Mission 3: Animal Kingdom',
    mascot: '🦁',
    color: 'from-violet-500 to-indigo-500',
    borderColor: 'border-violet-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which is a wild animal living in forest?',
        instructionTa: 'காட்டில் வாழும் காட்டு விலங்கு எது?',
        options: [
          { text: 'Lion 🦁', emoji: '🦁', correct: true },
          { text: 'Cow 🐮', emoji: '🐮', correct: false },
          { text: 'Cat 🐱', emoji: '🐱', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Who gives us milk? 🥛',
        instructionTa: 'நமக்கு பால் தரும் விலங்கு எது? 🥛',
        options: [
          { text: 'Cow 🐮', emoji: '🐮', correct: true },
          { text: 'Dog 🐶', emoji: '🐶', correct: false },
          { text: 'Lion 🦁', emoji: '🦁', correct: false }
        ]
      },
      {
        type: 'match',
        instruction: 'Match Dog 🐶 to its baby name:',
        instructionTa: 'நாயின் குட்டியின் பெயர் என்ன?',
        matchImage: 'dog',
        options: [
          { text: 'Puppy 🐶', correct: true },
          { text: 'Calf 🐮', correct: false },
          { text: 'Kitten 🐱', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the word "lion"',
        instructionTa: 'lion வார்த்தையை வரைக',
        letter: 'lion',
        options: []
      },
      {
        type: 'choice',
        instruction: 'Which animal eats only plants (Herbivore)?',
        instructionTa: 'புல் தாவரங்களை மட்டும் உண்ணும் விலங்கு எது?',
        options: [
          { text: 'Deer (மான்) 🦌', emoji: '🦌', correct: true },
          { text: 'Tiger (புலி) 🐯', emoji: '🐯', correct: false }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'பருவநிலைகள்: Seasons & Weather',
    titleEn: 'Mission 4: Seasons & Weather',
    mascot: '🌦',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      {
        type: 'choice',
        instruction: 'What do we use when it rains? 🌧️',
        instructionTa: 'மழை பெய்யும் போது நாம் எதைப் பயன்படுத்துகிறோம்? 🌧️',
        options: [
          { text: 'Umbrella ☂️', emoji: '☂️', correct: true },
          { text: 'Sunglasses 🕶️', correct: false },
          { text: 'Sweater 🧥', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which season is very hot and sunny? ☀️',
        instructionTa: 'வெப்பம் அதிகமாக இருக்கும் கோடைக்காலம் எது? ☀️',
        options: [
          { text: 'Summer ☀️', emoji: '☀️', correct: true },
          { text: 'Rainy 🌧️', emoji: '🌧️', correct: false },
          { text: 'Winter ❄️', emoji: '❄️', correct: false }
        ]
      },
      {
        type: 'match',
        instruction: 'Match Winter ❄️ with the correct clothing:',
        instructionTa: 'குளிர்காலத்திற்கு உகந்த ஆடை எது?',
        matchImage: 'sweater', // placeholder check
        options: [
          { text: 'Sweater 🧥', correct: true },
          { text: 'Raincoat 🧥', correct: false },
          { text: 'Cotton Shirt 👕', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the word "rain"',
        instructionTa: 'rain வார்த்தையை வரைக',
        letter: 'rain',
        options: []
      },
      {
        type: 'choice',
        instruction: 'What falls from the sky during rainy weather? 🌧️',
        instructionTa: 'மழையின் போது வானத்திலிருந்து விழுவது எது?',
        options: [
          { text: 'Water 💧', emoji: '💧', correct: true },
          { text: 'Snow ❄️', emoji: '❄️', correct: false }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'உதவியாளர்கள் சவால்: Helpful Helpers',
    titleEn: 'Mission 5: Community Helpers',
    mascot: '👨‍🚒',
    color: 'from-purple-500 to-fuchsia-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Who treats us when we are sick? 🩺',
        instructionTa: 'உடல்நிலை சரியில்லாத போது நமக்குச் சிகிச்சை தருபவர் யார்? 🩺',
        options: [
          { text: 'Doctor 🩺', emoji: '🩺', correct: true },
          { text: 'Teacher 👩‍🏫', emoji: '👩‍🏫', correct: false },
          { text: 'Farmer 👨‍🌾', emoji: '👨‍🌾', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Who teaches us in school? 🏫',
        instructionTa: 'பள்ளியில் நமக்குக் கல்வி கற்றுத் தருபவர் யார்? 🏫',
        options: [
          { text: 'Teacher 👩‍🏫', emoji: '👩‍🏫', correct: true },
          { text: 'Firefighter 👨‍🚒', emoji: '👨‍🚒', correct: false },
          { text: 'Police 👮', emoji: '👮', correct: false }
        ]
      },
      {
        type: 'match',
        instruction: 'Match Firefighter 👨‍🚒 with what they put out:',
        instructionTa: 'தீயணைப்பு வீரர் எதனை அணைப்பார்?',
        matchImage: 'fire',
        options: [
          { text: 'Fire 🔥', correct: true },
          { text: 'Water 💧', correct: false },
          { text: 'Tree 🌳', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the word "cook"',
        instructionTa: 'cook வார்த்தையை வரைக',
        letter: 'cook',
        options: []
      },
      {
        type: 'choice',
        instruction: 'Who grows food and crops for us? 🌾',
        instructionTa: 'நமக்காக உணவுப் பயிர்களை விளைவிப்பவர் யார்? 🌾',
        options: [
          { text: 'Farmer 👨‍🌾', emoji: '👨‍🌾', correct: true },
          { text: 'Doctor 🩺', emoji: '🩺', correct: false }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'சுற்றுச்சூழல் பாதுகாப்பு சவால்: Save Nature',
    titleEn: 'Mission 6: Protecting Nature',
    mascot: '🌍',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'choice',
        instruction: 'How should we keep our surroundings?',
        instructionTa: 'நம் சுற்றுப்புறத்தை எவ்வாறு வைத்திருக்க வேண்டும்?',
        options: [
          { text: 'Clean ✨', emoji: '✨', correct: true },
          { text: 'Dirty 🗑️', emoji: '🗑️', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Where should we throw trash? 🗑️',
        instructionTa: 'குப்பைகளை எங்கு வீச வேண்டும்? 🗑️',
        options: [
          { text: 'Dustbin 🗑️', emoji: '🗑️', correct: true },
          { text: 'On Road 🛣️', correct: false },
          { text: 'In Water 💧', correct: false }
        ]
      },
      {
        type: 'match',
        instruction: 'Match Tree 🌳 to its benefit:',
        instructionTa: 'மரங்கள் நமக்கு எதனைத் தருகிறது? 🌳',
        matchImage: 'पेड़',
        options: [
          { text: 'Fresh Air 💨', correct: true },
          { text: 'Plastic 🥤', correct: false },
          { text: 'Smoke 💨', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the word "save"',
        instructionTa: 'save வார்த்தையை வரைக',
        letter: 'save',
        options: []
      },
      {
        type: 'choice',
        instruction: 'Should we waste water? 💧',
        instructionTa: 'தண்ணீரை வீணாக்கலாமா?',
        options: [
          { text: 'No ❌', correct: true },
          { text: 'Yes  Yes', correct: false }
        ]
      }
    ]
  }
];

export const UKG_GK_LEVELS: Level[] = [
  {
    id: 1,
    title: 'நற்பழக்கங்கள்: Good Habits',
    titleEn: 'Mission 1: Good Habits & Cleanliness',
    mascot: '🧼',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'choice',
        instruction: 'What should you do before eating?',
        instructionTa: 'சாப்பிடுவதற்கு முன் நாம் என்ன செய்ய வேண்டும்?',
        options: [
          { text: 'Wash hands 🧼', emoji: '🧼', correct: true },
          { text: 'Play toys 🧸', correct: false },
          { text: 'Sleep 🛌', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'How many times should we brush our teeth daily?',
        instructionTa: 'ஒரு நாளைக்கு எத்தனை முறை பல் துலக்க வேண்டும்?',
        options: [
          { text: 'Two times 🦷🦷', correct: true },
          { text: 'Zero times ❌', correct: false },
          { text: 'Five times 🦷', correct: false }
        ]
      },
      {
        type: 'match',
        instruction: 'Match sharing 🤝 to its type:',
        instructionTa: 'பகிர்ந்து கொள்ளும் நற்பண்பு எது?',
        matchImage: 'खिलौना',
        options: [
          { text: 'Sharing Toys 🧸🤝', correct: true },
          { text: 'Snatching ❌', correct: false },
          { text: 'Fighting ❌', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the word "clean"',
        instructionTa: 'clean வார்த்தையை வரைக',
        letter: 'clean',
        options: []
      },
      {
        type: 'choice',
        instruction: 'Is helping others a good habit?',
        instructionTa: 'பிறருக்கு உதவி செய்வது நல்ல பழக்கமா?',
        options: [
          { text: 'Yes 👍', correct: true },
          { text: 'No ❌', correct: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'விலங்கு இல்லங்கள்: Animal Homes & Sounds',
    titleEn: 'Mission 2: Animal Homes & Sounds',
    mascot: '🏠',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Where does a bird live? 🐦',
        instructionTa: 'பறவை எங்கு வாழ்கிறது? 🐦',
        options: [
          { text: 'Nest (கூடு) 🪹', emoji: '🪹', correct: true },
          { text: 'Den (குகை) 🪨', emoji: '🪨', correct: false },
          { text: 'Stable (லாயம்) 🏠', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Where does a dog live? 🐶',
        instructionTa: 'நாய் எங்கு வாழ்கிறது? 🐶',
        options: [
          { text: 'Kennel 🏠', emoji: '🏠', correct: true },
          { text: 'Den 🪨', emoji: '🪨', correct: false },
          { text: 'Nest 🪹', emoji: '🪹', correct: false }
        ]
      },
      {
        type: 'match',
        instruction: 'Match Lion 🦁 to its sound:',
        instructionTa: 'சிங்கத்தின் ஓசையைப் பொருத்துக:',
        matchImage: 'शेर',
        options: [
          { text: 'Roar (கர்ஜனை) 🦁', correct: true },
          { text: 'Bark (குரைத்தல்) 🐶', correct: false },
          { text: 'Meow (கத்துதல்) 🐱', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the word "nest"',
        instructionTa: 'nest வார்த்தையை வரைக',
        letter: 'nest',
        options: []
      },
      {
        type: 'choice',
        instruction: 'Where does a horse live? 🐴',
        instructionTa: 'குதிரை எங்கு வாழ்கிறது? 🐴',
        options: [
          { text: 'Stable (லாயம்) 🏠', emoji: '🏠', correct: true },
          { text: 'Den (குகை) 🪨', emoji: '🪨', correct: false }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'பூமி சவால்: Our Earth & Nature',
    titleEn: 'Mission 3: Earth & Nature',
    mascot: '🌍',
    color: 'from-violet-500 to-indigo-500',
    borderColor: 'border-violet-300',
    questions: [
      {
        type: 'choice',
        instruction: 'What shape is our Earth? 🌍',
        instructionTa: 'நமது பூமியின் வடிவம் என்ன? 🌍',
        options: [
          { text: 'Round (வட்டம்) 🟢', correct: true },
          { text: 'Flat (சதுரம்) ⬜', correct: false },
          { text: 'Triangle 🔺', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What is the blue part on Earth globe?',
        instructionTa: 'பூமி உருண்டையில் உள்ள நீல நிறப் பகுதி எது?',
        options: [
          { text: 'Water (நீர்) 💧', emoji: '💧', correct: true },
          { text: 'Land (நிலம்) 🪵', correct: false },
          { text: 'Forest 🌳', correct: false }
        ]
      },
      {
        type: 'match',
        instruction: 'Match Land ⛰️ to its type:',
        instructionTa: 'நில அமைப்பைப் பொருத்துக:',
        matchImage: 'पर्वत',
        options: [
          { text: 'Mountain (மலை) ⛰️', correct: true },
          { text: 'Ocean (கடல்) 🌊', correct: false },
          { text: 'Sky (வானம்) ☁️', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the word "earth"',
        instructionTa: 'earth வார்த்தையை வரைக',
        letter: 'earth',
        options: []
      },
      {
        type: 'choice',
        instruction: 'Which is a non-living thing on Earth?',
        instructionTa: 'பூமியில் உள்ள உயிரற்ற பொருள் எது?',
        options: [
          { text: 'Car 🚗', emoji: '🚗', correct: true },
          { text: 'Dog 🐶', emoji: '🐶', correct: false }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'கருவிகள் சவால்: Tools & Helpers',
    titleEn: 'Mission 4: Helpers & Tools',
    mascot: '🔧',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Who uses a stethoscope? 🩺',
        instructionTa: 'ஸ்டெதாஸ்கோப்பைப் பயன்படுத்துபவர் யார்? 🩺',
        options: [
          { text: 'Doctor 🩺', emoji: '🩺', correct: true },
          { text: 'Teacher 👩‍🏫', correct: false },
          { text: 'Farmer 👨‍🌾', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'What tool does a teacher use? 🏫',
        instructionTa: 'ஆசிரியர் பயன்படுத்தும் பொருள் எது? 🏫',
        options: [
          { text: 'Book & Chalk 📖✍️', emoji: '📖', correct: true },
          { text: 'Spanner 🔧', emoji: '🔧', correct: false },
          { text: 'Tractor 🚜', emoji: '🚜', correct: false }
        ]
      },
      {
        type: 'match',
        instruction: 'Match Farmer 👨‍🌾 with their tool:',
        instructionTa: 'விவசாயி பயன்படுத்தும் கருவி எது?',
        matchImage: 'ट्रैक्टर',
        options: [
          { text: 'Tractor 🚜', correct: true },
          { text: 'Stethoscope 🩺', correct: false },
          { text: 'Scissors ✂️', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the word "tool"',
        instructionTa: 'tool வார்த்தையை வரைக',
        letter: 'tool',
        options: []
      },
      {
        type: 'choice',
        instruction: 'Who uses a police car? 🚔',
        instructionTa: 'காவல் வாகனத்தைப் பயன்படுத்துபவர் யார்? 🚔',
        options: [
          { text: 'Police Officer 👮', emoji: '👮', correct: true },
          { text: 'Farmer 👨‍🌾', emoji: '👨‍🌾', correct: false }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'தேசிய சின்னங்கள்: National Symbols',
    titleEn: 'Mission 5: National Symbols',
    mascot: '🦁',
    color: 'from-purple-500 to-fuchsia-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which is the national animal of India?',
        instructionTa: 'இந்தியாவின் தேசிய விலங்கு எது?',
        options: [
          { text: 'Tiger 🐯', emoji: '🐯', correct: true },
          { text: 'Lion 🦁', emoji: '🦁', correct: false },
          { text: 'Elephant 🐘', emoji: '🐘', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which is the national flower of India?',
        instructionTa: 'இந்தியாவின் தேசிய மலர் எது?',
        options: [
          { text: 'Lotus 🌸', emoji: '🌸', correct: true },
          { text: 'Rose 🌹', emoji: '🌹', correct: false },
          { text: 'Lily 🪷', emoji: '🪷', correct: false }
        ]
      },
      {
        type: 'match',
        instruction: 'Match National Bird to its name:',
        instructionTa: 'தேசியப் பறவையைப் பொருத்துக:',
        matchImage: 'मोर',
        options: [
          { text: 'Peacock 🦚', correct: true },
          { text: 'Parrot 🦜', correct: false },
          { text: 'Crow 🐦', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the word "india"',
        instructionTa: 'india வார்த்தையை வரைக',
        letter: 'india',
        options: []
      },
      {
        type: 'choice',
        instruction: 'How many colors are in Indian National Flag? 🇮🇳',
        instructionTa: 'தேசியக் கொடியில் உள்ள வண்ணங்களின் எண்ணிக்கை:',
        options: [
          { text: 'Three (மூன்று) 🇮🇳', correct: true },
          { text: 'Four (நான்கு) 🇮🇳', correct: false }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'வடிவங்கள் சவால்: Shapes Around Us',
    titleEn: 'Mission 6: Shapes Around Us',
    mascot: '⭕',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'choice',
        instruction: 'Which object is round like a Circle? 🔴',
        instructionTa: 'வட்ட வடிவில் உள்ள பொருள் எது? 🔴',
        options: [
          { text: 'Ball ⚽', emoji: '⚽', correct: true },
          { text: 'Book 📖', emoji: '📖', correct: false },
          { text: 'Kite 🪁', emoji: '🪁', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'Which object looks like a Rectangle? 🟫',
        instructionTa: 'செவ்வக வடிவில் உள்ள பொருள் எது? 🟫',
        options: [
          { text: 'Blackboard 🏫', emoji: '🏫', correct: true },
          { text: 'Coin 🪙', emoji: '🪙', correct: false },
          { text: 'Egg 🥚', emoji: '🥚', correct: false }
        ]
      },
      {
        type: 'match',
        instruction: 'Match Triangle 🔺 with what it looks like:',
        instructionTa: 'முக்கோண வடிவில் உள்ள உணவு எது?',
        matchImage: 'சமோசா', // Samosa / pizza slice
        options: [
          { text: 'Pizza Slice 🍕', correct: true },
          { text: 'Coin 🪙', correct: false },
          { text: 'Book 📖', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'Trace the shape word "star"',
        instructionTa: 'star வார்த்தையை வரைக',
        letter: 'star',
        options: []
      },
      {
        type: 'choice',
        instruction: 'Which object is Oval shaped? 🥚',
        instructionTa: 'முட்டை வடிவில் (Oval) உள்ள பொருள் எது? 🥚',
        options: [
          { text: 'Egg 🥚', emoji: '🥚', correct: true },
          { text: 'Clock ⏰', emoji: '⏰', correct: false }
        ]
      }
    ]
  }
];

export const UKG_HINDI_LEVELS: Level[] = [
  {
    id: 1,
    title: 'स्वर पहचान सवाल: अ - अः',
    titleEn: 'Mission 1: Vowels Recognition',
    mascot: '📙',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'choice',
        instruction: 'अनार किस अक्षर से शुरू होता है? 🍎',
        instructionTa: 'अ से क्या होता है?',
        options: [
          { text: 'अ', correct: true },
          { text: 'आ', correct: false },
          { text: 'इ', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'अक्षर "अ" को ट्रेस करें',
        instructionTa: 'அக்ஷரம் அ வை வரைக',
        letter: 'अ',
        options: []
      },
      {
        type: 'sequence',
        instruction: 'खाली जगह भरें: अ ___ इ ई',
        instructionTa: 'விடுபட்ட உயிரெழுத்து: अ ___ इ ई',
        sequence: ['अ', '_', 'इ', 'ई'],
        options: [
          { text: 'आ', correct: true },
          { text: 'उ', correct: false },
          { text: 'ऊ', correct: false }
        ]
      },
      {
        type: 'match',
        instruction: '"इ" के लिए सही चित्र चुनें:',
        instructionTa: 'இ எழுத்துக்குச் சரியான படம் எது?',
        matchImage: 'इमली',
        options: [
          { text: 'इमली 🌿', correct: true },
          { text: 'आम 🥭', correct: false },
          { text: 'ईख 🎋', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'आम किस अक्षर से शुरू होता है? 🥭',
        instructionTa: 'ஆம் எதில் தொடங்கும்?',
        options: [
          { text: 'आ', correct: true },
          { text: 'अ', correct: false },
          { text: 'ई', correct: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'व्यंजन पहचान: क - ज्ञ basic recognition',
    titleEn: 'Mission 2: Consonants Recognition',
    mascot: '✏️',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'choice',
        instruction: 'कमल किस अक्षर से शुरू होता है? 🌸',
        instructionTa: 'कमल எதில் தொடங்கும்?',
        options: [
          { text: 'क', correct: true },
          { text: 'ख', correct: false },
          { text: 'ग', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'अक्षर "क" को ट्रेस करें',
        instructionTa: 'க வை வரைக',
        letter: 'क',
        options: []
      },
      {
        type: 'sequence',
        instruction: 'खाली जगह भरें: क ___ ग घ',
        instructionTa: 'விடுபட்ட எழுத்து: क ___ ग घ',
        sequence: ['क', '_', 'ग', 'घ'],
        options: [
          { text: 'ख', correct: true },
          { text: 'च', correct: false },
          { text: 'छ', correct: false }
        ]
      },
      {
        type: 'match',
        instruction: '"घ" के लिए सही चित्र चुनें:',
        instructionTa: 'கீழ்க்கண்டவற்றுள் வீடு (घर) எது?',
        matchImage: 'घर',
        options: [
          { text: 'घर 🏠', correct: true },
          { text: 'गमला 🪴', correct: false },
          { text: 'चम्मच 🥄', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'खरगोश किस अक्षर से शुरू होता है? 🐰',
        instructionTa: 'முயல் எதில் தொடங்கும்?',
        options: [
          { text: 'ख', correct: true },
          { text: 'क', correct: false },
          { text: 'घ', correct: false }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'अक्षर जोड़ना: Two letter words',
    titleEn: 'Mission 3: Word Joining',
    mascot: '🧩',
    color: 'from-violet-500 to-indigo-500',
    borderColor: 'border-violet-300',
    questions: [
      {
        type: 'choice',
        instruction: 'अक्षरों को जोड़ें: घ + र = ?',
        instructionTa: 'எழுத்துக்களைச் சேர்க்கவும்: घ + र = ?',
        options: [
          { text: 'घर 🏠', correct: true },
          { text: 'जल 💧', correct: false },
          { text: 'फल 🍎', correct: false }
        ]
      },
      {
        type: 'spelling',
        instruction: 'अक्षर मिलाओ: क + म = ___',
        instructionTa: 'க + ம = ?',
        letter: 'क_',
        options: [
          { text: 'म', correct: true },
          { text: 'ल', correct: false },
          { text: 'र', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'शब्द "घर" को ट्रेस करें',
        instructionTa: 'घर சொல்லை வரைந்து பழகுங்கள்',
        letter: 'घर',
        options: []
      },
      {
        type: 'match',
        instruction: '"जल" के लिए सही चित्र चुनें:',
        instructionTa: 'நீர் (जल) படம் எது?',
        matchImage: 'जल',
        options: [
          { text: 'जल 💧', correct: true },
          { text: 'घर 🏠', correct: false },
          { text: 'बस 🚌', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'अक्षरों को जोड़ें: फ + ल = ?',
        instructionTa: 'பழங்கள் (फल) எதில் தொடங்கும்?',
        options: [
          { text: 'फल 🍎', correct: true },
          { text: 'नल 🚰', correct: false },
          { text: 'जल 💧', correct: false }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'मात्रा ज्ञान: ा मात्रा',
    titleEn: 'Mission 4: Maatra Basic',
    mascot: 'ा',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      {
        type: 'choice',
        instruction: 'क + ा = ?',
        instructionTa: 'க + கா மாத்திரை சேர்ந்தால் என்ன வரும்?',
        options: [
          { text: 'का', correct: true },
          { text: 'कि', correct: false },
          { text: 'कु', correct: false }
        ]
      },
      {
        type: 'spelling',
        instruction: 'मात्रा जोड़ें: म + ा = ___',
        instructionTa: 'ம + மாத்திரை = ?',
        letter: 'म_',
        options: [
          { text: 'ा', correct: true },
          { text: 'ि', correct: false },
          { text: 'ु', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'शब्द "का" को ट्रेस करें',
        instructionTa: 'का அக்ஷரத்தை வரைக',
        letter: 'का',
        options: []
      },
      {
        type: 'match',
        instruction: '"कान" के लिए सही चित्र चुनें:',
        instructionTa: 'காது (कान) படம் எது?',
        matchImage: 'कान',
        options: [
          { text: 'कान 👂', correct: true },
          { text: 'हाथ 🖐️', correct: false },
          { text: 'आँख 👀', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'आ + म मिलकर क्या बनेगा? 🥭',
        instructionTa: 'மாம்பழம் மாத்திரையோடு இணைந்தால்:',
        options: [
          { text: 'आम 🥭', correct: true },
          { text: 'काम 💼', correct: false },
          { text: 'नाम 👤', correct: false }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'शब्द पढ़ना: Simple words reading',
    titleEn: 'Mission 5: Words Reading',
    mascot: '📖',
    color: 'from-purple-500 to-fuchsia-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'choice',
        instruction: '"मछली" के लिए सही चित्र चुनें:',
        instructionTa: 'மீன் (मछली) படம் எது?',
        options: [
          { text: 'मछली 🐟', correct: true },
          { text: 'कमल 🌸', correct: false },
          { text: 'गमला 🪴', correct: false }
        ]
      },
      {
        type: 'spelling',
        instruction: 'खाली स्थान भरें: क _ ल (कमल)',
        instructionTa: 'விடுபட்ட எழுத்து: क _ ल (कमल)',
        letter: 'क_ल',
        options: [
          { text: 'म', correct: true },
          { text: 'र', correct: false },
          { text: 'ज', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'शब्द "कमल" को ट्रेस करें',
        instructionTa: 'कमल சொல்லை வரைக',
        letter: 'कमल',
        options: []
      },
      {
        type: 'match',
        instruction: '"गमला" के लिए सही चित्र चुनें:',
        instructionTa: 'செடித் தொட்டி (गमला) படம் எது?',
        matchImage: 'गमला',
        options: [
          { text: 'गमला 🪴', correct: true },
          { text: 'मछली 🐟', correct: false },
          { text: 'घर 🏠', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'इसमें से "पानी" का सही चित्र कौन सा है? 💧',
        instructionTa: 'நீர் படத்திற்குச் சரியான வார்த்தை எது?',
        options: [
          { text: 'जल 💧', correct: true },
          { text: 'फल 🍎', correct: false },
          { text: 'चल 🏃', correct: false }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'वाक्य अभ्यास: यह फल है।',
    titleEn: 'Mission 6: Sentences Reading',
    mascot: '📜',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'choice',
        instruction: '"यह फल है।" के लिए सही चित्र चुनें:',
        instructionTa: '"இது பழம்" - சரியான படம்:',
        options: [
          { text: 'फल 🍎', correct: true },
          { text: 'घर 🏠', correct: false },
          { text: 'बस 🚌', correct: false }
        ]
      },
      {
        type: 'sequence',
        instruction: 'वाक्य पूरा करें (चित्र 🏠): यह ___ है।',
        instructionTa: 'வாக்கியத்தை நிரப்புக: यह ___ है। (வீடு 🏠)',
        sequence: ['यह', '_', 'है।'],
        options: [
          { text: 'घर', correct: true },
          { text: 'बस', correct: false },
          { text: 'फल', correct: false }
        ]
      },
      {
        type: 'trace',
        instruction: 'वाक्य "यह घर है।" को ट्रेस करें',
        instructionTa: 'यह घर है வாக்கியத்தை வரைக',
        letter: 'यह घर है',
        options: []
      },
      {
        type: 'match',
        instruction: '"यह बस है।" के लिए सही चित्र चुनें:',
        instructionTa: '"இது பேருந்து" - சரியான படம்:',
        matchImage: 'बस',
        options: [
          { text: 'बस 🚌', correct: true },
          { text: 'घर 🏠', correct: false },
          { text: 'फल 🍎', correct: false }
        ]
      },
      {
        type: 'choice',
        instruction: 'वाक्य पूरा करें (चित्र 💧): यह ___ है।',
        instructionTa: 'வாக்கியத்தை நிரப்புக: यह ___ है। (நீர் 💧)',
        options: [
          { text: 'जल 💧', correct: true },
          { text: 'फल 🍎', correct: false }
        ]
      }
    ]
  }
];
