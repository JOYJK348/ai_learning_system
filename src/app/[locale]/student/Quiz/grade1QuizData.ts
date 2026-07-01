import { type Level } from './quizData';

// Generate 48 scalable levels for Grade 1 English corresponding to the 9 Chapters.
export const GRADE1_ENGLISH_LEVELS: Level[] = [
  {
    id: 1,
    title: 'Phonics + Word Formation 🌈',
    titleEn: 'Phonics + Word Formation',
    mascot: '🌈',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      {
        type: 'sentence_train' as any,
        instruction: 'Word Builder: Arrange the letters to build: plant 🌾',
        words: ['p', 'l', 'a', 'n', 't'],
        correctSentence: 'plant',
        options: []
      },
      {
        type: 'choice' as any,
        instruction: 'Missing Letter Challenge: Choose the missing letters for br__d 🍞',
        options: [
          { text: 'ea', correct: true },
          { text: 'oa', correct: false },
          { text: 'ee', correct: false }
        ]
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Word Family Match: Connect rhyming word partners! 🤝',
        pairs: [
          { left: 'cake', right: 'make' },
          { left: 'ball', right: 'tall' },
          { left: 'day', right: 'play' }
        ],
        options: []
      },
      {
        type: 'choice' as any,
        instruction: 'Syllable Break: Choose the correct syllable split for rabbit 🐰',
        options: [
          { text: 'rab + bit', correct: true },
          { text: 'rabb + it', correct: false },
          { text: 'ra + bbit', correct: false }
        ]
      },
      {
        type: 'order' as any,
        instruction: 'Alphabetical Order: Sort the words from A to Z! 🔤',
        options: [
          { text: 'apple ➔ cat ➔ dog', correct: true },
          { text: 'dog ➔ cat ➔ apple', correct: false },
          { text: 'cat ➔ apple ➔ dog', correct: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Vocabulary World 📚',
    titleEn: 'Vocabulary World',
    mascot: '📚',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Category Sort: Connect the word to its category! 🦁',
        pairs: [
          { left: 'lion', right: 'Animal' },
          { left: 'rose', right: 'Flower' },
          { left: 'mango', right: 'Fruit' }
        ],
        options: []
      },
      {
        type: 'choice' as any,
        instruction: 'Compound Word Builder: What word do you get by joining rain + bow? 🌧️🌈',
        options: [
          { text: 'rainbow', correct: true },
          { text: 'rainy', correct: false },
          { text: 'bowrain', correct: false }
        ]
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Opposite Explorer: Match opposite words! ↔️',
        pairs: [
          { left: 'early', right: 'late' },
          { left: 'open', right: 'close' },
          { left: 'hot', right: 'cold' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Singular Plural Match: Connect singular to its irregular plural! 🐭',
        pairs: [
          { left: 'child', right: 'children' },
          { left: 'mouse', right: 'mice' },
          { left: 'tooth', right: 'teeth' }
        ],
        options: []
      },
      {
        type: 'choice' as any,
        instruction: 'Adjective Finder: Choose the best describing word for a tiger! 🐯',
        options: [
          { text: 'wild', correct: true },
          { text: 'soft', correct: false },
          { text: 'slow', correct: false }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Grammar Garden 🌱',
    titleEn: 'Grammar Garden',
    mascot: '🌱',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'choice' as any,
        instruction: 'Sentence Repair: Choose the correct sentence! 🔧',
        options: [
          { text: 'She is playing.', correct: true },
          { text: 'She are playing.', correct: false },
          { text: 'She am playing.', correct: false }
        ]
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Pronoun Match: Connect noun to the correct pronoun! 👤',
        pairs: [
          { left: 'Riya', right: 'she' },
          { left: 'Rohan', right: 'he' },
          { left: 'The dog', right: 'it' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Grammar Sort: Connect each word to its part of speech! 🏷️',
        pairs: [
          { left: 'school', right: 'Noun' },
          { left: 'run', right: 'Verb' },
          { left: 'blue', right: 'Adjective' }
        ],
        options: []
      },
      {
        type: 'choice' as any,
        instruction: 'Punctuation Repair: What is the correct punctuation for: Where are you going ___ ❓',
        options: [
          { text: 'Question Mark (?)', correct: true },
          { text: 'Full Stop (.)', correct: false },
          { text: 'Exclamation Mark (!)', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Fill the blank: ___ is my bag (pointing to a bag far away). 🎒',
        options: [
          { text: 'That', correct: true },
          { text: 'These', correct: false },
          { text: 'This', correct: false }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Sentence & Reading 🚂',
    titleEn: 'Sentence & Reading',
    mascot: '🚂',
    color: 'from-violet-400 to-indigo-500',
    borderColor: 'border-violet-300',
    questions: [
      {
        type: 'sentence_train' as any,
        instruction: 'Sentence Train: Arrange the words to form a correct sentence! 🚂',
        words: ['Rahul', 'likes', 'mangoes'],
        correctSentence: 'Rahul likes mangoes',
        options: []
      },
      {
        type: 'order' as any,
        instruction: 'Paragraph Order: Order the daily routine stages correctly! ⏰',
        options: [
          { text: 'Wake up ➔ Brush teeth ➔ Go to school', correct: true },
          { text: 'Go to school ➔ Wake up ➔ Brush teeth', correct: false },
          { text: 'Brush teeth ➔ Go to school ➔ Wake up', correct: false }
        ]
      },
      {
        type: 'story_cave' as any,
        instruction: 'Read the story and answer: Who is happy? 📖',
        storyText: 'Sam has a small dog. The dog is brown. Sam plays with his dog in the garden. Sam is happy.',
        options: [
          { text: 'Sam', correct: true },
          { text: 'The cat', correct: false },
          { text: 'Father', correct: false }
        ]
      },
      {
        type: 'story_cave' as any,
        instruction: 'Story Completion: Choose the best sentence to fill the gap. 📖\n"It was a sunny day. ___ They built a big sandcastle."',
        storyText: 'It was a sunny day. ___ They built a big sandcastle.',
        options: [
          { text: 'Rahul and Reema went to the beach.', correct: true },
          { text: 'They slept in their beds.', correct: false },
          { text: 'It started to rain heavily.', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'True or False: Cows can fly in the sky. 🐄',
        options: [
          { text: 'False / Not True', correct: true },
          { text: 'True', correct: false }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Writing Skills ✏️',
    titleEn: 'Writing Skills',
    mascot: '✏️',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      {
        type: 'garden_repair' as any,
        instruction: 'Sentence Completion: Complete the sentence! ☀️',
        sentence: 'The sun is ____ and bright.',
        options: [
          { text: 'hot', correct: true },
          { text: 'cold', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Picture Match: Choose the sentence that describes a bird in the nest! 🪹🐦',
        options: [
          { text: 'The bird is in its nest.', correct: true },
          { text: 'The fish is in the pond.', correct: false },
          { text: 'The bird is flying high.', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Spelling Fix: Correct the misspelled word: skool 🏫',
        options: [
          { text: 'school', correct: true },
          { text: 'shool', correct: false },
          { text: 'scool', correct: false }
        ]
      },
      {
        type: 'trace' as any,
        instruction: 'Handwriting Mission: Trace the letter: S ✍️',
        letter: 'S',
        options: []
      },
      {
        type: 'sentence_train' as any,
        instruction: 'Sentence Builder: Arrange the words to make a sentence! 📖',
        words: ['The', 'girl', 'reads', 'a', 'book'],
        correctSentence: 'The girl reads a book',
        options: []
      }
    ]
  },
  {
    id: 6,
    title: 'Language Challenge 🧠',
    titleEn: 'Language Challenge',
    mascot: '🧠',
    color: 'from-purple-400 to-indigo-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'choice' as any,
        instruction: 'Word Maze: Select the list containing only correctly spelled words! 🏆',
        options: [
          { text: 'apple, banana, orange', correct: true },
          { text: 'aple, banan, orng', correct: false },
          { text: 'apple, benana, orenge', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Odd One Out: Find the word that is NOT an animal! 🚫',
        options: [
          { text: 'run (verb)', correct: true },
          { text: 'cat', correct: false },
          { text: 'dog', correct: false },
          { text: 'cow', correct: false }
        ]
      },
      {
        type: 'order' as any,
        instruction: 'Dictionary Order: Sort these words alphabetically! 📖',
        options: [
          { text: 'ball ➔ boy ➔ bus', correct: true },
          { text: 'bus ➔ boy ➔ ball', correct: false },
          { text: 'boy ➔ ball ➔ bus', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Grammar Puzzle: Identify the verb in this sentence: "The baby sleeps peacefully." 👶💤',
        options: [
          { text: 'sleeps', correct: true },
          { text: 'baby', correct: false },
          { text: 'peacefully', correct: false }
        ]
      },
      {
        type: 'order' as any,
        instruction: 'Story Sequencer: Sort the steps of plant growth in correct order! 🌱',
        options: [
          { text: 'Sow seed ➔ Water plant ➔ Flower blooms', correct: true },
          { text: 'Flower blooms ➔ Water plant ➔ Sow seed', correct: false },
          { text: 'Water plant ➔ Flower blooms ➔ Sow seed', correct: false }
        ]
      }
    ]
  }
];

export const GRADE1_MATH_LEVELS: Level[] = [
  // --- CHAPTER 1: NUMBERS BEYOND 100 🔢 ---
  {
    id: 1,
    title: 'Numbers 101–200 🔢',
    titleEn: 'Numbers 101–200',
    mascot: '🔢',
    color: 'from-blue-400 to-indigo-500',
    borderColor: 'border-blue-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Numbers 101 to 200 🔢', mascot: '🔢', explanation: 'Numbers beyond 100 are made of Hundreds, Tens, and Ones! 100 is One Hundred. 101 is One Hundred One!', explanationTa: '100க்கு மேல் உள்ள எண்கள்! 100 என்பது நூறு. 101 என்பது நூற்று ஒன்று!', examples: ['100 = Hundred', '101 = 100 + 1', '150 = 100 + 50', '200 = Two Hundred'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match number names! 🔗', pairs: [{ left: '105', right: 'One hundred five' }, { left: '120', right: 'One hundred twenty' }, { left: '199', right: 'One hundred ninety-nine' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Complete the sequence! 🔢', sentence: '101, 102, 103, ___', options: [{ text: '104', correct: true }, { text: '105', correct: false }, { text: '110', correct: false }] },
      { type: 'grid_search' as any, instruction: 'Find all numbers between 120 and 130! 🔍', gridItems: [{ text: '125', correct: true, emoji: '✨' }, { text: '128', correct: true, emoji: '🌟' }, { text: '121', correct: true, emoji: '💫' }, { text: '105', correct: false, emoji: '❌' }, { text: '190', correct: false, emoji: '❌' }], options: [] }
    ]
  },
  {
    id: 2,
    title: 'Numbers 201–500 🔢',
    titleEn: 'Numbers 201–500',
    mascot: '🔢',
    color: 'from-blue-400 to-indigo-500',
    borderColor: 'border-blue-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Numbers 201 to 500 🔢', mascot: '🔢', explanation: 'Let us count from 201 to 500! 200 is Two Hundred, 300 is Three Hundred, 400 is Four Hundred, and 500 is Five Hundred!', explanationTa: '201 முதல் 500 வரையிலான எண்கள்! 200, 300, 400, 500.', examples: ['201 = 200 + 1', '350 = 300 + 50', '499 = 400 + 99', '500 = Five Hundred'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match number names! 🔗', pairs: [{ left: '250', right: 'Two hundred fifty' }, { left: '305', right: 'Three hundred five' }, { left: '410', right: 'Four hundred ten' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Complete the sequence! 🔢', sentence: '298, 299, 300, ___', options: [{ text: '301', correct: true }, { text: '302', correct: false }, { text: '310', correct: false }] },
      { type: 'grid_search' as any, instruction: 'Find all numbers in the 300s! 🔍', gridItems: [{ text: '345', correct: true, emoji: '✨' }, { text: '399', correct: true, emoji: '🌟' }, { text: '301', correct: true, emoji: '💫' }, { text: '299', correct: false, emoji: '❌' }, { text: '405', correct: false, emoji: '❌' }], options: [] }
    ]
  },
  {
    id: 3,
    title: 'Numbers 501–999 🔢',
    titleEn: 'Numbers 501–999 (intro)',
    mascot: '🔢',
    color: 'from-blue-400 to-indigo-500',
    borderColor: 'border-blue-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Big Numbers: 501 to 999 🔢', mascot: '🔢', explanation: 'We are reaching the biggest 3-digit numbers! 600 is Six Hundred, 700 is Seven Hundred, 800 is Eight Hundred, 900 is Nine Hundred!', explanationTa: '999 வரையிலான பெரிய எண்கள்! 600, 700, 800, 900.', examples: ['555 = 500 + 55', '720 = 700 + 20', '888 = 800 + 88', '999 = Nine Hundred Ninety-Nine'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match values! 🔗', pairs: [{ left: '600', right: 'Six hundred' }, { left: '850', right: 'Eight hundred fifty' }, { left: '999', right: 'Nine hundred ninety-nine' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Complete the sequence! 🔢', sentence: '599, 600, 601, ___', options: [{ text: '602', correct: true }, { text: '605', correct: false }, { text: '598', correct: false }] },
      { type: 'grid_search' as any, instruction: 'Find all numbers greater than 800! 🔍', gridItems: [{ text: '850', correct: true, emoji: '✨' }, { text: '920', correct: true, emoji: '🌟' }, { text: '805', correct: true, emoji: '💫' }, { text: '799', correct: false, emoji: '❌' }, { text: '500', correct: false, emoji: '❌' }], options: [] }
    ]
  },
  {
    id: 4,
    title: 'Place Value 🏠',
    titleEn: 'Place Value (Ones, Tens, Hundreds)',
    mascot: '🏠',
    color: 'from-blue-400 to-indigo-500',
    borderColor: 'border-blue-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Place Value Houses 🏠', mascot: '🏠', explanation: 'Every digit in a number has a home! In 345, 3 is in Hundreds house 🏠, 4 is in Tens house 🏠, and 5 is in Ones house 🏠!', explanationTa: 'இட மதிப்பு: 100கள், 10கள், 1கள்!', examples: ['345 = 3 Hundreds, 4 Tens, 5 Ones', '123 = 1 Hundred, 2 Tens, 3 Ones', '708 = 7 Hundreds, 0 Tens, 8 Ones'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Connect place value to digit! 🔗', pairs: [{ left: '4 in 452', right: '4 Hundreds' }, { left: '5 in 452', right: '5 Tens' }, { left: '2 in 452', right: '2 Ones' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'How many Hundreds are in 789? 🏠', sentence: 'There are ___ Hundreds in 789.', options: [{ text: '7', correct: true }, { text: '8', correct: false }, { text: '9', correct: false }] },
      { type: 'grid_search' as any, instruction: 'Find all numbers with 5 in the Tens place! 🔍', gridItems: [{ text: '152', correct: true, emoji: '✨' }, { text: '258', correct: true, emoji: '🌟' }, { text: '50', correct: true, emoji: '💫' }, { text: '512', correct: false, emoji: '❌' }, { text: '305', correct: false, emoji: '❌' }], options: [] }
    ]
  },
  {
    id: 5,
    title: 'Expanded Form 📂',
    titleEn: 'Expanded Form',
    mascot: '📂',
    color: 'from-blue-400 to-indigo-500',
    borderColor: 'border-blue-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Expanded Form 📂', mascot: '📂', explanation: 'Expanded form shows the value of each digit added together! For example, 256 = 200 + 50 + 6!', explanationTa: 'விரிவாக்கப்பட்ட வடிவம்: எண்களின் மதிப்பை பிரித்து எழுதுவது!', examples: ['123 = 100 + 20 + 3', '405 = 400 + 0 + 5', '990 = 900 + 90 + 0', '350 = 300 + 50 + 0'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match standard form to expanded form! 🔗', pairs: [{ left: '158', right: '100 + 50 + 8' }, { left: '206', right: '200 + 0 + 6' }, { left: '340', right: '300 + 40 + 0' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Complete the expanded form! 📂', sentence: '456 = 400 + ___ + 6', options: [{ text: '50', correct: true }, { text: '5', correct: false }, { text: '500', correct: false }] },
      { type: 'sentence_train' as any, instruction: 'Assemble the expanded form of 325! 🚂', words: ['20', '300', '5', '+', '+'], correctSentence: '300 + 20 + 5', options: [] }
    ]
  },

  // --- CHAPTER 2: NUMBER COMPARISON & ORDERING 🏆 ---
  {
    id: 6,
    title: 'Ascending Order 📈',
    titleEn: 'Ascending Order',
    mascot: '📈',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Ascending Order 📈', mascot: '📈', explanation: 'Ascending order means arranging numbers from SMALLEST to BIGGEST! Like going up the stairs: 12 ➔ 25 ➔ 58.', explanationTa: 'ஏறுவரிசை: எண்களை சிறியதில் இருந்து பெரியதாக அடுக்குவது! 📈', examples: ['5, 9, 12', '101, 150, 200', '300, 310, 320'], options: [] },
      { type: 'sentence_train' as any, instruction: 'Arrange smallest to biggest: 58, 12, 35 🚂', words: ['58', '35', '12', '➔', '➔'], correctSentence: '12 ➔ 35 ➔ 58', options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match the sequences! 🔗', pairs: [{ left: '10, 20, 30', right: 'Ascending' }, { left: '50, 40, 30', right: 'Not Ascending' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Which number fits in this ascending line? 📈', sentence: '15 ➔ ___ ➔ 45', options: [{ text: '30', correct: true }, { text: '10', correct: false }, { text: '50', correct: false }] }
    ]
  },
  {
    id: 7,
    title: 'Descending Order 📉',
    titleEn: 'Descending Order',
    mascot: '📉',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Descending Order 📉', mascot: '📉', explanation: 'Descending order means arranging numbers from BIGGEST to SMALLEST! Like coming down the stairs: 58 ➔ 35 ➔ 12.', explanationTa: 'இறங்குவரிசை: எண்களை பெரியதில் இருந்து சிறியதாக அடுக்குவது! 📉', examples: ['12, 9, 5', '200, 150, 101', '320, 310, 300'], options: [] },
      { type: 'sentence_train' as any, instruction: 'Arrange biggest to smallest: 15, 95, 45 🚂', words: ['95', '15', '45', '➔', '➔'], correctSentence: '95 ➔ 45 ➔ 15', options: [] },
      { type: 'garden_repair' as any, instruction: 'Which number fits in this descending line? 📉', sentence: '90 ➔ ___ ➔ 50', options: [{ text: '70', correct: true }, { text: '95', correct: false }, { text: '40', correct: false }] }
    ]
  },
  {
    id: 8,
    title: 'Compare 2 Digits ⚖️',
    titleEn: 'Compare 2 digit numbers',
    mascot: '⚖️',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Comparing 2-Digit Numbers ⚖️', mascot: '⚖️', explanation: 'We use signs to compare numbers! Greater Than (>), Less Than (<), or Equal To (=). Look at the tens digit first!', explanationTa: 'இரண்டு இலக்க எண்களை ஒப்பிடுதல்: >, <, = குறியீடுகள்.', examples: ['45 > 23 (4 tens > 2 tens)', '12 < 18', '55 = 55'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Connect equations to signs! 🔗', pairs: [{ left: '45 ___ 23', right: '>' }, { left: '15 ___ 30', right: '<' }, { left: '99 ___ 99', right: '=' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Which sign makes this true? ⚖️', sentence: '78 ___ 87', options: [{ text: '<', correct: true }, { text: '>', correct: false }, { text: '=', correct: false }] }
    ]
  },
  {
    id: 9,
    title: 'Compare 3 Digits ⚖️',
    titleEn: 'Compare 3 digit numbers',
    mascot: '⚖️',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Comparing 3-Digit Numbers ⚖️', mascot: '⚖️', explanation: 'Compare Hundreds first! If they are the same, check Tens, then Ones!', explanationTa: 'மூன்று இலக்க எண்களை ஒப்பிடுதல்! முதலில் 100கள் இடத்தை பார்க்கவும்.', examples: ['350 > 299 (3 Hundreds > 2 Hundreds)', '450 < 480 (5 Tens < 8 Tens)', '601 = 601'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Connect equations to signs! 🔗', pairs: [{ left: '500 ___ 499', right: '>' }, { left: '720 ___ 750', right: '<' }, { left: '888 ___ 888', right: '=' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Which sign is correct? ⚖️', sentence: '905 ___ 899', options: [{ text: '>', correct: true }, { text: '<', correct: false }, { text: '=', correct: false }] }
    ]
  },
  {
    id: 10,
    title: 'Number Sequence 🧩',
    titleEn: 'Number Sequence',
    mascot: '🧩',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Number Sequences 🧩', mascot: '🧩', explanation: 'A number sequence follows a skip pattern! It can skip by 2s, 5s, or 10s.', explanationTa: 'எண் தொடர்கள்: குறிப்பிட்ட இடைவெளியில் எண்கள் வரும்.', examples: ['2, 4, 6, 8 (Skip by 2)', '5, 10, 15, 20 (Skip by 5)', '10, 20, 30, 40 (Skip by 10)'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match the skips! 🔗', pairs: [{ left: '10, 20, 30', right: 'Skip by 10' }, { left: '5, 10, 15', right: 'Skip by 5' }, { left: '2, 4, 6', right: 'Skip by 2' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Complete the skip sequence! 🧩', sentence: '110, 120, 130, ___', options: [{ text: '140', correct: true }, { text: '135', correct: false }, { text: '150', correct: false }] }
    ]
  },

  // --- CHAPTER 3: ADDITION MASTER ➕ ---
  {
    id: 11,
    title: 'No Carry Addition ➕',
    titleEn: 'Addition without carry',
    mascot: '➕',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Addition without Carry ➕', mascot: '➕', explanation: 'Add ones with ones, and tens with tens! E.g., 23 + 12 = 35. No regrouping needed!', explanationTa: 'மீதி இல்லாத கூட்டல்! 1களை 1களுடனும், 10களை 10களுடனும் கூட்டுங்கள்.', examples: ['23 + 12 = 35', '41 + 15 = 56', '50 + 23 = 73'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match equations to sums! 🔗', pairs: [{ left: '21 + 13', right: '34' }, { left: '42 + 25', right: '67' }, { left: '50 + 13', right: '63' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Add: 34 + 12 = ___', sentence: '34 + 12 = ___', options: [{ text: '46', correct: true }, { text: '56', correct: false }, { text: '48', correct: false }] }
    ]
  },
  {
    id: 12,
    title: 'Addition with Carry ➕',
    titleEn: 'Addition with carry',
    mascot: '➕',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Addition with Carry ➕', mascot: '➕', explanation: 'When Ones add up to 10 or more, carry the Tens over to the Tens house! E.g. 15 + 17 = 32.', explanationTa: 'மீதி உள்ள கூட்டல்! 1கள் கூட்டும்போது 10க்கு மேல் வந்தால், மீதியை 10கள் வீட்டிற்கு கொண்டு செல்லுங்கள்.', examples: ['18 + 14 = 32 (8+4=12 Ones -> carry 1 to Tens)', '25 + 17 = 42', '36 + 28 = 64'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match the carry sums! 🔗', pairs: [{ left: '19 + 15', right: '34' }, { left: '28 + 14', right: '42' }, { left: '47 + 18', right: '65' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Solve: 25 + 17 = ___', sentence: '25 + 17 = ___', options: [{ text: '42', correct: true }, { text: '32', correct: false }, { text: '45', correct: false }] }
    ]
  },
  {
    id: 13,
    title: '2-Digit Addition ➕',
    titleEn: 'Add 2 digit numbers',
    mascot: '➕',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Adding 2-Digit Numbers ➕', mascot: '➕', explanation: 'Add Ones first, then Tens. Make sure you align them correctly in column form!', explanationTa: 'இரண்டு இலக்க எண்களைக் கூட்டுதல். 1கள், பிறகு 10கள்.', examples: ['34 + 21 = 55', '56 + 18 = 74', '70 + 29 = 99'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match double-digit additions! 🔗', pairs: [{ left: '30 + 45', right: '75' }, { left: '55 + 22', right: '77' }, { left: '68 + 15', right: '83' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Find the total sum! ➕', sentence: '58 + 24 = ___', options: [{ text: '82', correct: true }, { text: '72', correct: false }, { text: '80', correct: false }] }
    ]
  },
  {
    id: 14,
    title: 'Add 3 Numbers ➕',
    titleEn: 'Add 3 digit numbers (basic)',
    mascot: '➕',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Adding Three Numbers ➕', mascot: '➕', explanation: 'Add the first two numbers, then add the third number to their sum! E.g., 2 + 5 + 3 = 7 + 3 = 10!', explanationTa: 'மூன்று எண்களைக் கூட்டுதல்! முதல் இரண்டு எண்களைக் கூட்டி, அதனுடன் மூன்றாவது எண்ணைக் கூட்டவும்.', examples: ['3 + 4 + 2 = 9', '5 + 5 + 5 = 15', '10 + 20 + 30 = 60'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match triple sums! 🔗', pairs: [{ left: '4 + 6 + 2', right: '12' }, { left: '5 + 5 + 8', right: '18' }, { left: '10 + 10 + 10', right: '30' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Solve: 5 + 8 + 2 = ___', sentence: '5 + 8 + 2 = ___', options: [{ text: '15', correct: true }, { text: '13', correct: false }, { text: '18', correct: false }] }
    ]
  },
  {
    id: 15,
    title: 'Addition Formats 📐',
    titleEn: 'Horizontal & Vertical addition',
    mascot: '📐',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Addition Formats 📐', mascot: '📐', explanation: 'Addition can be written in two ways! Horizontal (flat: 5 + 3 = 8) or Vertical (stacked vertically)! Both give the same result.', explanationTa: 'கூட்டல் வடிவங்கள்: படுக்கைவசமாக அல்லது செங்குத்தாக கூட்டுவது.', examples: ['Horizontal: 12 + 5 = 17', 'Vertical: 12 over 5 = 17'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Connect format matches! 🔗', pairs: [{ left: '12 + 8 = 20', right: 'Horizontal' }, { left: 'Vertical 15 + 5', right: '20' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Solve vertical addition: 24 + 13 = ___', sentence: 'Vertical: 24 + 13 = ___', options: [{ text: '37', correct: true }, { text: '27', correct: false }, { text: '47', correct: false }] }
    ]
  },
  {
    id: 16,
    title: 'Addition Stories 📖',
    titleEn: 'Addition word problems',
    mascot: '📖',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Addition Word Problems 📖', mascot: '📖', explanation: 'Look for keyword clues like "in total", "all together", "sum", "plus", or "more"! E.g. 5 apples and 3 apples in total means 5 + 3 = 8.', explanationTa: 'கூட்டல் கணக்கு கதைகள்! "மொத்தம்", "ஒன்றாக" போன்ற வார்த்தைகளைக் கவனியுங்கள்.', examples: ['Rahul has 4 toy cars. He buys 2 more. Total = 4 + 2 = 6.', '3 birds on branch. 5 more fly in. Total = 3 + 5 = 8.'], options: [] },
      { type: 'garden_repair' as any, instruction: 'Sita has 12 balloons. Ram has 15 balloons. How many in total?', sentence: '12 + 15 = ___ balloons.', options: [{ text: '27', correct: true }, { text: '25', correct: false }, { text: '30', correct: false }] },
      { type: 'garden_repair' as any, instruction: 'There are 20 boys and 15 girls in a class. What is the total strength?', sentence: 'Total students = ___', options: [{ text: '35', correct: true }, { text: '25', correct: false }, { text: '40', correct: false }] }
    ]
  },

  // --- CHAPTER 4: SUBTRACTION HERO ➖ ---
  {
    id: 17,
    title: 'No Borrow Subtraction ➖',
    titleEn: 'Subtraction without borrowing',
    mascot: '➖',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Subtraction without Borrowing ➖', mascot: '➖', explanation: 'Subtract ones from ones, and tens from tens! Simple subtraction without borrowing. E.g. 35 - 12 = 23.', explanationTa: 'கடன் வாங்காத கழித்தல்! 1களை 1களிலிருந்தும், 10களை 10களிலிருந்தும் கழியுங்கள்.', examples: ['35 - 12 = 23', '48 - 25 = 23', '90 - 40 = 50'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match equations to differences! 🔗', pairs: [{ left: '25 - 12', right: '13' }, { left: '48 - 20', right: '28' }, { left: '55 - 55', right: '0' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Solve: 45 - 23 = ___', sentence: '45 - 23 = ___', options: [{ text: '22', correct: true }, { text: '12', correct: false }, { text: '32', correct: false }] }
    ]
  },
  {
    id: 18,
    title: 'Borrow Subtraction ➖',
    titleEn: 'Subtraction with borrowing intro',
    mascot: '➖',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Borrowing Introduction ➖', mascot: '➖', explanation: 'If the top Ones digit is smaller than the bottom, borrow 1 Ten from the Tens house! E.g. 32 - 17 = 15.', explanationTa: 'கடன் கழித்தல் அறிமுகம்! மேல் எண் சிறியதாக இருந்தால், 10கள் வீட்டிலிருந்து 1ஐ கடன் வாங்குங்கள்.', examples: ['32 - 17 = 15 (2 Ones borrowed 10 -> becomes 12 Ones)', '45 - 28 = 17', '50 - 15 = 35'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match borrowing differences! 🔗', pairs: [{ left: '30 - 15', right: '15' }, { left: '42 - 28', right: '14' }, { left: '60 - 25', right: '35' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Solve: 42 - 18 = ___', sentence: '42 - 18 = ___', options: [{ text: '24', correct: true }, { text: '34', correct: false }, { text: '26', correct: false }] }
    ]
  },
  {
    id: 19,
    title: '2-Digit Subtraction ➖',
    titleEn: '2 digit subtraction',
    mascot: '➖',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: '2-Digit Subtraction ➖', mascot: '➖', explanation: 'Write numbers in columns, subtract Ones place, then Tens place. Don\'t forget to borrow if needed!', explanationTa: 'இரண்டு இலக்க கழித்தல் கணக்குகள்.', examples: ['54 - 23 = 31', '62 - 45 = 17', '99 - 50 = 49'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match double-digit subtractions! 🔗', pairs: [{ left: '95 - 40', right: '55' }, { left: '72 - 38', right: '34' }, { left: '80 - 12', right: '68' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Solve: 85 - 39 = ___', sentence: '85 - 39 = ___', options: [{ text: '46', correct: true }, { text: '56', correct: false }, { text: '48', correct: false }] }
    ]
  },
  {
    id: 20,
    title: 'Missing Numbers 🔍',
    titleEn: 'Missing number subtraction',
    mascot: '🔍',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Finding Missing Numbers 🔍', mascot: '🔍', explanation: 'To find a missing number, subtract the difference from the starting number! E.g. 20 - ___ = 15. Think: 20 - 15 = 5!', explanationTa: 'விடுபட்ட கழித்தல் எண்களைக் கண்டறிதல்.', examples: ['10 - ___ = 7 (Missing is 3)', '25 - ___ = 20 (Missing is 5)', '50 - ___ = 30 (Missing is 20)'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match missing numbers! 🔗', pairs: [{ left: '15 - ___ = 10', right: '5' }, { left: '30 - ___ = 12', right: '18' }, { left: '100 - ___ = 60', right: '40' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Fill the blank: 45 - ___ = 35', sentence: '45 - ___ = 35', options: [{ text: '10', correct: true }, { text: '5', correct: false }, { text: '15', correct: false }] }
    ]
  },
  {
    id: 21,
    title: 'Check Subtraction ✅',
    titleEn: 'Checking subtraction',
    mascot: '✅',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Check Subtraction with Addition ✅', mascot: '✅', explanation: 'You can check subtraction by adding the answer back! If 20 - 5 = 15, then 15 + 5 must equal 20!', explanationTa: 'கூட்டல் மூலம் கழித்தலைச் சரிபார்த்தல்! விடையையும் கழித்த எண்ணையும் கூட்டினால் முதல் எண் வர வேண்டும்.', examples: ['Check 15 - 5 = 10: 10 + 5 = 15 (Correct!)', 'Check 32 - 12 = 20: 20 + 12 = 32 (Correct!)'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Find the correct check equation! 🔗', pairs: [{ left: '30 - 10 = 20', right: '20 + 10 = 30' }, { left: '15 - 8 = 7', right: '7 + 8 = 15' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Which adds back to check 45 - 15 = 30?', sentence: 'Checking equation: ___ = 45', options: [{ text: '30 + 15', correct: true }, { text: '30 - 15', correct: false }, { text: '30 + 30', correct: false }] }
    ]
  },
  {
    id: 22,
    title: 'Subtraction Stories 📖',
    titleEn: 'Story problems',
    mascot: '📖',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Subtraction Word Problems 📖', mascot: '📖', explanation: 'Look for keyword clues like "left", "remaining", "how many more", "take away", or "lost"! E.g. 10 birds, 3 fly away. Left = 10 - 3 = 7.', explanationTa: 'கழித்தல் கணக்கு கதைகள்! "மீதி", "போய்விட்டது" போன்ற வார்த்தைகளைக் கவனியுங்கள்.', examples: ['Ram had 15 sweets. He ate 5. Left = 15 - 5 = 10.', 'A tree has 12 apples. 4 fall down. Remaining = 12 - 4 = 8.'], options: [] },
      { type: 'garden_repair' as any, instruction: 'A baker made 30 cupcakes. He sold 12. How many are left?', sentence: '30 - 12 = ___ cupcakes.', options: [{ text: '18', correct: true }, { text: '28', correct: false }, { text: '15', correct: false }] },
      { type: 'garden_repair' as any, instruction: 'There were 25 frogs in a pond. 10 jumped out. How many remaining?', sentence: 'Remaining frogs = ___', options: [{ text: '15', correct: true }, { text: '5', correct: false }, { text: '20', correct: false }] }
    ]
  },

  // --- CHAPTER 5: MULTIPLICATION INTRODUCTION ✖️ ---
  {
    id: 23,
    title: 'Equal Groups 📦',
    titleEn: 'Equal groups concept',
    mascot: '📦',
    color: 'from-violet-400 to-purple-500',
    borderColor: 'border-violet-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Equal Groups Concept 📦', mascot: '📦', explanation: 'Multiplication is about equal groups! 3 groups of 2 cookies 🍪 means 3 groups with exactly 2 in each group. In total, that is 6 cookies!', explanationTa: 'சம குழுக்கள்! பெருக்கல் என்பது சம அளவுள்ள குழுக்களைக் கூட்டுவதாகும்.', examples: ['3 groups of 2 = 6', '2 groups of 5 = 10', '4 groups of 3 = 12'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match groups to total! 🔗', pairs: [{ left: '2 groups of 3', right: '6' }, { left: '3 groups of 4', right: '12' }, { left: '5 groups of 2', right: '10' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'If you have 4 boxes with 2 toys in each, how many toys?', sentence: '4 groups of 2 = ___ toys.', options: [{ text: '8', correct: true }, { text: '6', correct: false }, { text: '10', correct: false }] }
    ]
  },
  {
    id: 24,
    title: 'Repeated Addition ➕',
    titleEn: 'Repeated addition',
    mascot: '➕',
    color: 'from-violet-400 to-purple-500',
    borderColor: 'border-violet-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Repeated Addition ➕', mascot: '➕', explanation: 'Multiplication is adding the same number repeatedly! Adding 2 four times: 2 + 2 + 2 + 2 = 8. This is written as 4 × 2 = 8!', explanationTa: 'தொடர் கூட்டல்! ஒரே எண்ணை மீண்டும் மீண்டும் கூட்டுவது பெருக்கலாகும்.', examples: ['3 + 3 = 2 × 3 = 6', '5 + 5 + 5 = 3 × 5 = 15', '10 + 10 = 2 × 10 = 20'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match addition to multiplication! 🔗', pairs: [{ left: '2 + 2 + 2', right: '3 × 2' }, { left: '5 + 5 + 5 + 5', right: '4 × 5' }, { left: '10 + 10', right: '2 × 10' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Complete equation: 3 + 3 + 3 + 3 = ___ × 3', sentence: 'Repeated: ___ × 3', options: [{ text: '4', correct: true }, { text: '3', correct: false }, { text: '5', correct: false }] }
    ]
  },
  {
    id: 25,
    title: 'Skip Counting 🏃',
    titleEn: 'Skip counting as multiplication',
    mascot: '🏃',
    color: 'from-violet-400 to-purple-500',
    borderColor: 'border-violet-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Skip Counting 🏃', mascot: '🏃', explanation: 'Skip counting is jumps on the number line! Jumping by 5s three times gets you to 15. This is 3 × 5 = 15!', explanationTa: 'தாவி எண்ணுதல் பெருக்கல் ஆகும்! 5களாக தாவி எண்ணிப் பாருங்கள்.', examples: ['Jump by 2: 2, 4, 6, 8 (4 × 2 = 8)', 'Jump by 5: 5, 10, 15 (3 × 5 = 15)', 'Jump by 10: 10, 20 (2 × 10 = 20)'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Connect jumps to product! 🔗', pairs: [{ left: '3 jumps of 2', right: '6' }, { left: '2 jumps of 5', right: '10' }, { left: '4 jumps of 10', right: '40' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Count: 5, 10, 15, ___', sentence: 'Next in 5s skip = ___', options: [{ text: '20', correct: true }, { text: '25', correct: false }, { text: '30', correct: false }] }
    ]
  },
  {
    id: 26,
    title: 'Tables 2, 5, 10 🔢',
    titleEn: 'Tables 2,5,10',
    mascot: '🔢',
    color: 'from-violet-400 to-purple-500',
    borderColor: 'border-violet-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Tables 2, 5, and 10 🔢', mascot: '🔢', explanation: 'Mastering multiplication tables helps us count super fast! Let us practice 2 times, 5 times, and 10 times tables!', explanationTa: '2, 5, 10 பெருக்கல் வாய்ப்பாடுகள்.', examples: ['2 × 4 = 8', '5 × 3 = 15', '10 × 5 = 50', '2 × 8 = 16'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match table answers! 🔗', pairs: [{ left: '2 × 5', right: '10' }, { left: '5 × 4', right: '20' }, { left: '10 × 3', right: '30' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Solve: 5 × 5 = ___', sentence: '5 × 5 = ___', options: [{ text: '25', correct: true }, { text: '20', correct: false }, { text: '30', correct: false }] }
    ]
  },

  // --- CHAPTER 6: SHAPES & GEOMETRY 🟦 ---
  {
    id: 27,
    title: '3D Shapes Intro 📦',
    titleEn: '3D Shapes intro',
    mascot: '📦',
    color: 'from-fuchsia-400 to-pink-500',
    borderColor: 'border-fuchsia-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: '3D Shapes Around Us 📦', mascot: '📦', explanation: 'Flat shapes are 2D, but solid shapes you can hold are 3D! Meet Sphere (ball ⚽), Cube (dice 🎲), and Cylinder (can 🥫)!', explanationTa: 'முப்பரிமாண வடிவங்கள் (3D)! பந்து, பகடை, உருளை.', examples: ['Sphere = Ball ⚽', 'Cube = Dice 🎲', 'Cylinder = Soda Can 🥫', 'Cone = Party Hat 🥳'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match shape to object! 🔗', pairs: [{ left: 'Sphere ⚽', right: 'ball' }, { left: 'Cube 🎲', right: 'dice' }, { left: 'Cone 🥳', right: 'party hat' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'What shape is a wooden block? 📦', sentence: 'A block is shaped like a ___.', options: [{ text: 'Cube 🎲', correct: true }, { text: 'Sphere ⚽', correct: false }, { text: 'Cylinder 🥫', correct: false }] }
    ]
  },
  {
    id: 28,
    title: 'Faces & Edges 📐',
    titleEn: 'Faces & edges',
    mascot: '📐',
    color: 'from-fuchsia-400 to-pink-500',
    borderColor: 'border-fuchsia-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Faces, Edges, and Corners 📐', mascot: '📐', explanation: 'Faces are the flat parts 📄. Edges are the straight lines where faces meet 📏. Corners (Vertices) are the sharp points 📍!', explanationTa: 'வடிவியல் பாகங்கள்: முகங்கள், விளிம்புகள், முனைகள்.', examples: ['Cube has 6 flat faces, 12 edges, 8 corners', 'Sphere has 1 curved face, 0 edges, 0 corners'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match shape details! 🔗', pairs: [{ left: 'Cube', right: '6 flat faces' }, { left: 'Sphere', right: '0 flat faces' }, { left: 'Cone', right: '1 point corner' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'How many flat faces does a dice have? 🎲', sentence: 'A dice has ___ faces.', options: [{ text: '6', correct: true }, { text: '8', correct: false }, { text: '4', correct: false }] }
    ]
  },
  {
    id: 29,
    title: 'Lines & Curves 〰️',
    titleEn: 'Lines and curves',
    mascot: '〰️',
    color: 'from-fuchsia-400 to-pink-500',
    borderColor: 'border-fuchsia-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Lines and Curves 〰️', mascot: '〰️', explanation: 'Lines can be Straight (vertical │, horizontal ─, slanting ╱) or Curved (wiggly 〰️ or circular ◯)!', explanationTa: 'கோடுகள் மற்றும் வளைவுகள்: நேர்க்கோடுகள் மற்றும் வளைகோடுகள்.', examples: ['Straight: Ruler, Pencil, Table edge', 'Curved: Ball, Cloud, Rainbow'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Categorize line types! 🔗', pairs: [{ left: 'Pencil ✏️', right: 'Straight line' }, { left: 'Coin 🪙', right: 'Curved line' }, { left: 'Sun ☀️', right: 'Curved outline' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'A triangle is made of only ___ lines.', sentence: 'Triangle outline = ___ lines.', options: [{ text: 'straight', correct: true }, { text: 'curved', correct: false }] }
    ]
  },
  {
    id: 30,
    title: 'Symmetry 🪞',
    titleEn: 'Symmetry',
    mascot: '🪞',
    color: 'from-fuchsia-400 to-pink-500',
    borderColor: 'border-fuchsia-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Symmetry (Mirror Half) 🪞', mascot: '🪞', explanation: 'Symmetry means a line cuts a shape into two identical mirror halves! Like a butterfly 🦋, a heart ❤️, or a star ⭐️.', explanationTa: 'சமச்சீர்மை: ஒரு வடிவத்தை இரு சம பாகங்களாகப் பிரிப்பது.', examples: ['Butterfly 🦋 is symmetrical', 'Letter A is symmetrical', 'Alphabet F is NOT symmetrical'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match symmetry type! 🔗', pairs: [{ left: 'Butterfly 🦋', right: 'Symmetrical' }, { left: 'Flag 🚩', right: 'Not Symmetrical' }, { left: 'Circle ◯', right: 'Symmetrical' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Is the letter "M" symmetrical? 🪞', sentence: 'Letter M is ___ Symmetrical.', options: [{ text: 'Yes', correct: true }, { text: 'No', correct: false }] }
    ]
  },
  {
    id: 31,
    title: 'Patterns 🧩',
    titleEn: 'Patterns',
    mascot: '🧩',
    color: 'from-fuchsia-400 to-pink-500',
    borderColor: 'border-fuchsia-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Repeated Patterns 🧩', mascot: '🧩', explanation: 'A pattern repeats in order! E.g. Circle, Square, Circle, Square. What comes next? A Circle!', explanationTa: 'வடிவங்களின் தொடர் அமைப்புகள் (Patterns).', examples: ['◯, ⬜, ◯, ⬜ (Repeating pattern)', '🔺, 🔹, 🔺, 🔹, 🔺', '★, ◯, ★, ◯'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match pattern extensions! 🔗', pairs: [{ left: '🔴, 🔵, 🔴, 🔵, ___', right: '🔴' }, { left: '⬜, ⬜, ◯, ⬜, ⬜, ___', right: '◯' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Complete pattern: 🔺, ⬜, 🔺, ⬜, ___', sentence: '🔺, ⬜, 🔺, ⬜, ___', options: [{ text: '🔺', correct: true }, { text: '⬜', correct: false }, { text: '◯', correct: false }] }
    ]
  },

  // --- CHAPTER 7: MEASUREMENT PRO 📏 ---
  {
    id: 32,
    title: 'Measuring Length 📏',
    titleEn: 'Length measurement using units',
    mascot: '📏',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Measuring Length 📏', mascot: '📏', explanation: 'We can measure length using non-standard units like Handspans 🖐️, Footsteps 👣, or paperclips 📎!', explanationTa: 'நீளத்தை அளவிடுதல்! கையின் ஜண், காலடிகள்.', examples: ['Desk = 5 Handspans 🖐️', 'Room width = 12 Footsteps 👣', 'Pencil = 4 Paperclips 📎'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match measuring tools! 🔗', pairs: [{ left: '🖐️', right: 'Handspan' }, { left: '👣', right: 'Footstep' }, { left: '📎', right: 'Paperclip' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'If a pen is 5 paperclips long, and a pencil is 8, which is longer?', sentence: 'The ___ is longer.', options: [{ text: 'pencil', correct: true }, { text: 'pen', correct: false }] }
    ]
  },
  {
    id: 33,
    title: 'Compare Lengths 📏',
    titleEn: 'Compare lengths',
    mascot: '📏',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Comparing Lengths 📏', mascot: '📏', explanation: 'We use words like Tallest/Shortest or Longest/Shortest to compare! A giraffe 🦒 is tall, a rabbit 🐰 is short.', explanationTa: 'நீளங்களை ஒப்பிடுதல்! உயரமான - குட்டையான, நீளமான - குட்டையான.', examples: ['Giraffe = Tall 🦒', 'Rabbit = Short 🐰', 'Train = Long 🚂', 'Pencil = Short ✏️'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match heights! 🔗', pairs: [{ left: 'Giraffe 🦒', right: 'Tallest' }, { left: 'Cat 🐈', right: 'Shortest' }, { left: 'Ladder 🪜', right: 'Tall' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'A snake is ___ than an earthworm.', sentence: 'Snake is ___ than worm.', options: [{ text: 'longer', correct: true }, { text: 'shorter', correct: false }] }
    ]
  },
  {
    id: 34,
    title: 'Weight: Heavy & Light ⚖️',
    titleEn: 'Weight measurement',
    mascot: '⚖️',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Weight: Heavy and Light ⚖️', mascot: '⚖️', explanation: 'Weight tells us how heavy or light an object is! E.g. An elephant 🐘 is heavy, but a feather 🪶 is light!', explanationTa: 'எடை அளவிடுதல்: கனமான - லேசான.', examples: ['Heavy = Elephant 🐘', 'Light = Feather 🪶', 'Heavy = Pumpkin 🎃', 'Light = Apple 🍎'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Categorize weights! 🔗', pairs: [{ left: 'Elephant 🐘', right: 'Heaviest' }, { left: 'Watermelon 🍉', right: 'Heavy' }, { left: 'Feather 🪶', right: 'Light' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'A feather is ___ than a book.', sentence: 'Feather is ___ than book.', options: [{ text: 'lighter', correct: true }, { text: 'heavier', correct: false }] }
    ]
  },
  {
    id: 35,
    title: 'Capacity: Volume 🥛',
    titleEn: 'Capacity',
    mascot: '🥛',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Capacity (Liquid Volume) 🥛', mascot: '🥛', explanation: 'Capacity is how much liquid a container can hold! A big bucket 🪣 holds more water than a small cup 🥛.', explanationTa: 'கொள்ளளவு (திரவ அளவு)! வாளி அதிக தண்ணீர் பிடிக்கும்.', examples: ['Holds More = Bucket 🪣', 'Holds Less = Cup 🥛', 'Holds More = Jug 🏺', 'Holds Less = Spoon 🥄'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Compare capacities! 🔗', pairs: [{ left: 'Bathtub 🛁', right: 'Holds Most' }, { left: 'Jug 🏺', right: 'Holds More' }, { left: 'Spoon 🥄', right: 'Holds Least' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'A milk bottle holds ___ than a glass.', sentence: 'Bottle holds ___ than glass.', options: [{ text: 'more', correct: true }, { text: 'less', correct: false }] }
    ]
  },
  {
    id: 36,
    title: 'Temperature Intro 🌡️',
    titleEn: 'Temperature intro',
    mascot: '🌡️',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Hot and Cold 🌡️', mascot: '🌡️', explanation: 'Temperature tells us how hot or cold something is! The sun ☀️ and fire 🔥 are hot. Ice 🧊 and snow ❄️ are cold.', explanationTa: 'வெப்பநிலை அறிமுகம்: சூடான - குளிர்ந்த.', examples: ['Hot = Hot Tea ☕', 'Cold = Ice Cream 🍦', 'Hot = Sun ☀️', 'Cold = Snowman ⛄'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match temperature! 🔗', pairs: [{ left: 'Fire 🔥', right: 'Hottest' }, { left: 'Soup 🍲', right: 'Hot' }, { left: 'Ice Cream 🍦', right: 'Cold' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Hot soup is ___ in temperature.', sentence: 'Soup is ___.', options: [{ text: 'hot 🍲', correct: true }, { text: 'cold ❄️', correct: false }] }
    ]
  },

  // --- CHAPTER 8: TIME & MONEY EXPERT ⏰💰 ---
  {
    id: 37,
    title: 'Clock Hours ⏰',
    titleEn: 'Reading clock hours',
    mascot: '⏰',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'How to Read a Clock ⏰', mascot: '⏰', explanation: 'A clock tells time! The short hand shows HOURS, the long hand shows MINUTES. When long hand points to 12, it is o\'clock!', explanationTa: 'கடிகாரத்தில் மணி பார்த்தல்! சிறிய முள் மணியையும், பெரிய முள் நிமிடத்தையும் குறிக்கும்.', examples: ['Short hand at 3, Long at 12 = 3 o\'clock', 'Short hand at 9, Long at 12 = 9 o\'clock'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match hands to time! 🔗', pairs: [{ left: 'Short: 5, Long: 12', right: '5:00' }, { left: 'Short: 10, Long: 12', right: '10:00' }, { left: 'Short: 12, Long: 12', right: '12:00' }], options: [] },
      { type: 'garden_repair' as any, clockTime: '4:00', instruction: 'What time is shown on the clock? ⏰', sentence: 'The time is ___ o\'clock.', options: [{ text: '4', correct: true }, { text: '12', correct: false }, { text: '6', correct: false }] }
    ]
  },
  {
    id: 38,
    title: 'Half Past Time ⏰',
    titleEn: 'Half past time',
    mascot: '⏰',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Half Past (Half Hour) ⏰', mascot: '⏰', explanation: 'When the minute hand travels halfway around the clock and points to 6, it is HALF PAST! That means 30 minutes past the hour.', explanationTa: 'அரை மணி நேரம்! நிமிட முள் 6ஐக் காட்டும்போது அரை மணி நேரமாகும்.', examples: ['Short hand between 1 and 2, Long at 6 = Half past 1 (1:30)', 'Short hand between 4 and 5, Long at 6 = Half past 4 (4:30)'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match digital time! 🔗', pairs: [{ left: 'Half past 2', right: '2:30' }, { left: 'Half past 7', right: '7:30' }, { left: 'Half past 12', right: '12:30' }], options: [] },
      { type: 'garden_repair' as any, clockTime: '8:30', instruction: 'What time is shown on the clock? ⏰', sentence: 'The time is ___', options: [{ text: '8:30', correct: true }, { text: '9:30', correct: false }, { text: '8:00', correct: false }] }
    ]
  },
  {
    id: 39,
    title: 'Calendar: Days & Months 📅',
    titleEn: 'Calendar',
    mascot: '📅',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Days and Months 📅', mascot: '📅', explanation: 'A calendar helps us track time! There are 7 days in a week (starting with Monday) and 12 months in a year (starting with January)!', explanationTa: 'நாள்காட்டி: வாரத்தின் 7 நாட்கள் மற்றும் ஆண்டின் 12 மாதங்கள்.', examples: ['7 Days = Week', '12 Months = Year', 'First Day = Monday', 'First Month = January'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match days and months! 🔗', pairs: [{ left: 'Day after Monday', right: 'Tuesday' }, { left: 'Month after January', right: 'February' }, { left: 'Last day of week', right: 'Sunday' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'How many months are in a year? 📅', sentence: 'There are ___ months in a year.', options: [{ text: '12', correct: true }, { text: '7', correct: false }, { text: '10', correct: false }] }
    ]
  },
  {
    id: 40,
    title: 'Money Addition 💰',
    titleEn: 'Money addition',
    mascot: '💰',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Adding Coins & Bills 💰', mascot: '💰', explanation: 'We use money (rupees ₹) to buy things! Adding money is just like normal addition. E.g. ₹5 coin + ₹10 bill = ₹15 total!', explanationTa: 'பணத்தைக் கூட்டுதல்! நாணயங்கள் மற்றும் ரூபாய் நோட்டுகள்.', examples: ['₹1 + ₹2 = ₹3', '₹5 + ₹5 = ₹10', '₹10 + ₹10 = ₹20', '₹50 + ₹10 = ₹60'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Add these coins! 🔗', pairs: [{ left: '₹2 + ₹5', right: '₹7' }, { left: '₹10 + ₹10', right: '₹20' }, { left: '₹5 + ₹5 + ₹2', right: '₹12' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'You buy a toy for ₹10 and an eraser for ₹5. How much do you spend?', sentence: 'Total spent = ₹___', options: [{ text: '15', correct: true }, { text: '20', correct: false }, { text: '12', correct: false }] }
    ]
  },
  {
    id: 41,
    title: 'Money Subtraction 💰',
    titleEn: 'Money subtraction',
    mascot: '💰',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Spending and Change 💰', mascot: '💰', explanation: 'When you buy things, you subtract from the money you had! E.g. If you give ₹20 for a ₹15 chocolate, you get ₹5 back as change!', explanationTa: 'மீதிப் பணம்! செலவு செய்த பின் மீதமுள்ள பணத்தைக் கணக்கிடுதல்.', examples: ['₹10 - ₹2 spent = ₹8 left', '₹20 - ₹15 chocolate = ₹5 change', '₹50 - ₹10 toy = ₹40 change'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Calculate change! 🔗', pairs: [{ left: 'Have ₹10, spend ₹3', right: '₹7 left' }, { left: 'Have ₹20, spend ₹10', right: '₹10 left' }, { left: 'Have ₹50, spend ₹25', right: '₹25 left' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'You had ₹50. You spent ₹20 on a book. How much change do you get back?', sentence: 'Change = ₹___', options: [{ text: '30', correct: true }, { text: '20', correct: false }, { text: '40', correct: false }] }
    ]
  },

  // --- CHAPTER 9: DATA & LOGIC 🧠 ---
  {
    id: 42,
    title: 'Sorting Data 📊',
    titleEn: 'Sorting information',
    mascot: '📊',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Sorting and Grouping 📊', mascot: '📊', explanation: 'Sorting means putting things into groups based on how they are alike! E.g., putting all red toys 🔴 in one box, and blue toys 🔵 in another!', explanationTa: 'விவரங்களை வகைப்படுத்துதல்! நிறம், வடிவம் போன்றவற்றின் அடிப்படையில் பிரிப்பது.', examples: ['Group 1 = Apples 🍎🍎', 'Group 2 = Bananas 🍌🍌', 'Group 3 = Circles ◯◯'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Group the objects! 🔗', pairs: [{ left: 'Apple 🍎', right: 'Fruit' }, { left: 'Pencil ✏️', right: 'Stationery' }, { left: 'Lion 🦁', right: 'Animal' }], options: [] },
      { type: 'grid_search' as any, instruction: 'Find all fruits! 🔍', gridItems: [{ text: 'apple', correct: true, emoji: '🍎' }, { text: 'banana', correct: true, emoji: '🍌' }, { text: 'carrot', correct: false, emoji: '❌' }, { text: 'pencil', correct: false, emoji: '❌' }], options: [] }
    ]
  },
  {
    id: 43,
    title: 'Picture Graphs 📊',
    titleEn: 'Picture graphs',
    mascot: '📊',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Reading Picture Graphs 📊', mascot: '📊', explanation: 'Picture graphs use symbols or pictures to represent numbers! Count the emojis to find out how many there are in each category.', explanationTa: 'பட விளக்க வரைபடம் (Pictograph). படங்களை எண்ணி விவரங்களை அறிதல்.', examples: ['🍎🍎🍎 = 3 Apples', '🍌🍌 = 2 Bananas', '✏️✏️✏️✏️ = 4 Pencils'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match count to graph! 🔗', pairs: [{ left: '🍎🍎🍎', right: '3 apples' }, { left: '⭐', right: '1 star' }, { left: '🚗🚗🚗🚗', right: '4 cars' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Look at graph: 🍪🍪🍪🍪. How many cookies?', sentence: 'There are ___ cookies.', options: [{ text: '4', correct: true }, { text: '3', correct: false }, { text: '5', correct: false }] }
    ]
  },
  {
    id: 44,
    title: 'Simple Tables 📊',
    titleEn: 'Simple tables',
    mascot: '📊',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Reading Simple Tables 📊', mascot: '📊', explanation: 'Tables organize information in rows and columns so they are easy to read! Let us read and compare totals!', explanationTa: 'அட்டவணைப் படுத்துதல்! வரிசைகள் மற்றும் நெடுவரிசைகளில் விவரங்களை வைப்பது.', examples: ['Cats | 5', 'Dogs | 3', 'Birds | 8', 'Most popular = Birds'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Match table totals! 🔗', pairs: [{ left: 'Apples: 5, Oranges: 3', right: 'More Apples' }, { left: 'Toys: 10, Games: 15', right: 'More Games' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'If a table says Red Balls: 8, Blue Balls: 12, which color has more?', sentence: 'There are more ___ balls.', options: [{ text: 'blue', correct: true }, { text: 'red', correct: false }] }
    ]
  },
  {
    id: 45,
    title: 'Logical Patterns 🧠',
    titleEn: 'Logical patterns',
    mascot: '🧠',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'Logical Thinking Patterns 🧠', mascot: '🧠', explanation: 'Logic patterns use rules to solve puzzles! For example, if a number doubles every time: 2, 4, 8, what comes next? 16!', explanationTa: 'தர்க்கவியல் தொடர்கள்! விதிகளை கண்டறிந்து புதிர்களைத் தீர்ப்பது.', examples: ['1, 2, 3, 4 (Add 1)', '2, 4, 6, 8 (Add 2)', '10, 9, 8, 7 (Subtract 1)'], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Complete the logical jump! 🔗', pairs: [{ left: '2, 4, 6, 8, ___', right: '10' }, { left: '9, 8, 7, 6, ___', right: '5' }, { left: '10, 20, 30, ___', right: '40' }], options: [] },
      { type: 'garden_repair' as any, instruction: 'Solve logic sequence: 10, 8, 6, 4, ___', sentence: '10, 8, 6, 4, ___', options: [{ text: '2', correct: true }, { text: '3', correct: false }, { text: '0', correct: false }] }
    ]
  }
];


export const GRADE1_EVS_LEVELS: Level[] = [
  // --- CHAPTER 1: Myself & My Body 🧒 (Levels 1 - 5) ---
  {
    id: 1,
    title: 'My Body Parts Revision 🧒',
    titleEn: 'My Body Parts Revision',
    mascot: '🧒',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match body parts to their actions! 🔗',
        pairs: [
          { left: 'Hands 👐', right: 'To Write ✍️' },
          { left: 'Legs 👣', right: 'To Walk 🚶' },
          { left: 'Mouth 👄', right: 'To Speak 🗣️' }
        ],
        options: []
      }
    ]
  },
  {
    id: 2,
    title: 'Sense Organs & Their Uses 👀',
    titleEn: 'Sense Organs & Their Uses',
    mascot: '👀',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match sense organs to actions! 👃',
        pairs: [
          { left: 'Eyes 👀', right: 'To See 🌈' },
          { left: 'Ears 👂', right: 'To Hear 🎵' },
          { left: 'Nose 👃', right: 'To Smell 🌹' },
          { left: 'Tongue 👅', right: 'To Taste 🍦' }
        ],
        options: []
      }
    ]
  },
  {
    id: 3,
    title: 'Healthy Food Habits 🍎',
    titleEn: 'Healthy Food Habits',
    mascot: '🍎',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select all Healthy Foods! 🥦',
        gridItems: [
          { text: 'Apple 🍎', correct: true },
          { text: 'Spinach 🥬', correct: true },
          { text: 'Milk 🥛', correct: true },
          { text: 'Burger 🍔', correct: false },
          { text: 'Fries 🍟', correct: false }
        ],
        options: []
      }
    ]
  },
  {
    id: 4,
    title: 'Cleanliness & Personal Hygiene 🧼',
    titleEn: 'Cleanliness & Hygiene',
    mascot: '🧼',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match hygiene tools to uses! 🪥',
        pairs: [
          { left: 'Toothbrush 🪥', right: 'Clean Teeth 🦷' },
          { left: 'Soap 🧼', right: 'Wash Hands 👐' },
          { left: 'Nail Cutter ✂️', right: 'Trim Nails 💅' }
        ],
        options: []
      }
    ]
  },
  {
    id: 5,
    title: 'Exercise & Good Habits 🏃',
    titleEn: 'Exercise & Habits',
    mascot: '🏃',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select all Good Habits! 🧼',
        gridItems: [
          { text: 'Sleep Early 🛌', correct: true },
          { text: 'Exercise 🏃', correct: true },
          { text: 'Drink Water 🥤', correct: true },
          { text: 'Watch TV late 📺', correct: false },
          { text: 'Skip breakfast 🥣', correct: false }
        ],
        options: []
      }
    ]
  },

  // --- CHAPTER 2: My Family & Relationships 👨‍👩‍👧 (Levels 6 - 10) ---
  {
    id: 6,
    title: 'Types of Families 👨‍👩‍👧‍👦',
    titleEn: 'Types of Families',
    mascot: '👨‍👩‍👧‍👦',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match family types! 🔗',
        pairs: [
          { left: 'Parents + Kids 🏠', right: 'Nuclear Family 👨‍👩‍👧' },
          { left: 'With Grandparents 🏰', right: 'Joint Family 👵👴' },
          { left: 'Parents + Grandparents + Uncles 🏰', right: 'Big Joint Family 👨‍👩‍👧‍👦' }
        ],
        options: []
      }
    ]
  },
  {
    id: 7,
    title: 'Family Members & Roles 👨‍👩‍👧',
    titleEn: 'Family Members',
    mascot: '👨‍👩‍👧',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match relationship titles! 🔗',
        pairs: [
          { left: 'Fathers Father 👴', right: 'Grandfather 👴' },
          { left: 'Mothers Mother 👵', right: 'Grandmother 👵' },
          { left: 'Fathers Brother 👨', right: 'Uncle 👨' }
        ],
        options: []
      }
    ]
  },
  {
    id: 8,
    title: 'Helping at Home 🧹',
    titleEn: 'Helping at Home',
    mascot: '🧹',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select all helpful tasks! 🧹',
        gridItems: [
          { text: 'Watering plants 🌱', correct: true },
          { text: 'Keeping toys back 🧸', correct: true },
          { text: 'Cleaning desk 🧼', correct: true },
          { text: 'Leaving toys on floor 🧩', correct: false },
          { text: 'Wasting water 🚰', correct: false }
        ],
        options: []
      }
    ]
  },
  {
    id: 9,
    title: 'Respect & Sharing 🤝',
    titleEn: 'Respect & Sharing',
    mascot: '🤝',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'garden_repair' as any,
        instruction: 'Complete the magic rule! 🌟',
        sentence: 'When getting help from someone, we say ___.',
        options: [
          { text: 'Thank You 🙏', correct: true },
          { text: 'Go Away ❌', correct: false },
          { text: 'No ❌', correct: false }
        ]
      }
    ]
  },
  {
    id: 10,
    title: 'My Daily Routine 📅',
    titleEn: 'My Daily Routine',
    mascot: '📅',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'garden_repair' as any,
        instruction: 'What is the first thing we do in the morning? 🌅',
        sentence: 'When the alarm rings, we ___ first.',
        options: [
          { text: 'Wake Up ⏰', correct: true },
          { text: 'Go to School 🎒', correct: false },
          { text: 'Eat Lunch 🍱', correct: false }
        ]
      }
    ]
  },

  // --- CHAPTER 3: Food & Nutrition 🍎 (Levels 11 - 15) ---
  {
    id: 11,
    title: 'Types of Food 🍞',
    titleEn: 'Types of Food',
    mascot: '🍞',
    color: 'from-orange-400 to-amber-500',
    borderColor: 'border-orange-300',
    questions: [
      {
        type: 'garden_repair' as any,
        instruction: 'What type of food is Milk and Eggs? 🥚',
        sentence: 'Milk and Eggs are ___ food that help us grow.',
        options: [
          { text: 'Body Building 💪', correct: true },
          { text: 'Junk Food 🍕', correct: false },
          { text: 'Spicy Food 🌶️', correct: false }
        ]
      }
    ]
  },
  {
    id: 12,
    title: 'Healthy & Unhealthy Food 🥦',
    titleEn: 'Healthy vs Unhealthy',
    mascot: '🥦',
    color: 'from-orange-400 to-amber-500',
    borderColor: 'border-orange-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Classify Healthy vs Junk food! 🔗',
        pairs: [
          { left: 'Fresh Carrot 🥕', right: 'Crunchy Veggie 🥕' },
          { left: 'Cold Soda 🥤', right: 'Sugary Junk 🥤' },
          { left: 'Whole Milk 🥛', right: 'Calcium Drink 🥛' }
        ],
        options: []
      }
    ]
  },
  {
    id: 13,
    title: 'Fruits & Vegetables 🥕',
    titleEn: 'Fruits & Vegetables',
    mascot: '🥕',
    color: 'from-orange-400 to-amber-500',
    borderColor: 'border-orange-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match item to type! 🔗',
        pairs: [
          { left: 'Sweet Mango 🥭', right: 'Sweet Fruit 🥭' },
          { left: 'Green Spinach 🥬', right: 'Leafy Veggie 🥬' },
          { left: 'Red Tomato 🍅', right: 'Juicy Fruit 🍅' }
        ],
        options: []
      }
    ]
  },
  {
    id: 14,
    title: 'Food Sources 🌾',
    titleEn: 'Food Sources',
    mascot: '🌾',
    color: 'from-orange-400 to-amber-500',
    borderColor: 'border-orange-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Where does it come from? Match sources! 🔗',
        pairs: [
          { left: 'Wheat Flour 🌾', right: 'From Plants 🌾' },
          { left: 'Fresh Eggs 🥚', right: 'From Hens 🐔' },
          { left: 'Whole Milk 🥛', right: 'From Cows 🐮' }
        ],
        options: []
      }
    ]
  },
  {
    id: 15,
    title: 'Balanced Meal Basics 🍱',
    titleEn: 'Balanced Meal Basics',
    mascot: '🍱',
    color: 'from-orange-400 to-amber-500',
    borderColor: 'border-orange-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select items for a balanced plate! 🍱',
        gridItems: [
          { text: 'Rice / Roti 🌾', correct: true },
          { text: 'Dal / Pulse 🍛', correct: true },
          { text: 'Green Salad 🥗', correct: true },
          { text: 'Ice Cream 🍦', correct: false },
          { text: 'Potato Chips 🍟', correct: false }
        ],
        options: []
      }
    ]
  },

  // --- CHAPTER 4: Plants Around Us 🌱 (Levels 16 - 20) ---
  {
    id: 16,
    title: 'Parts of Plant 🌱',
    titleEn: 'Parts of Plant',
    mascot: '🌱',
    color: 'from-emerald-400 to-green-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match plant parts to their jobs! 🔗',
        pairs: [
          { left: 'Roots 🪵', right: 'Absorb Water 💧' },
          { left: 'Stem 🎋', right: 'Support Leaves 🍃' },
          { left: 'Flowers 🌸', right: 'Produce Seeds 🌾' }
        ],
        options: []
      }
    ]
  },
  {
    id: 17,
    title: 'What Plants Need ☀️',
    titleEn: 'What Plants Need',
    mascot: '☀️',
    color: 'from-emerald-400 to-green-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select all things a seed needs to grow! 🪴',
        gridItems: [
          { text: 'Water 💧', correct: true },
          { text: 'Sunlight ☀️', correct: true },
          { text: 'Soil 🌱', correct: true },
          { text: 'Soda 🥤', correct: false },
          { text: 'Dark Room 🚪', correct: false }
        ],
        options: []
      }
    ]
  },
  {
    id: 18,
    title: 'Types of Plants 🌲',
    titleEn: 'Types of Plants',
    mascot: '🌲',
    color: 'from-emerald-400 to-green-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match types of plants! 🌴',
        pairs: [
          { left: 'Mango Tree 🌳', right: 'Big Tree 🪵' },
          { left: 'Rose Bush 🌹', right: 'Bushy Shrub 🪴' },
          { left: 'Grapevine 🍇', right: 'Weak Climber 🍇' }
        ],
        options: []
      }
    ]
  },
  {
    id: 19,
    title: 'Uses of Plants 🪵',
    titleEn: 'Uses of Plants',
    mascot: '🪵',
    color: 'from-emerald-400 to-green-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'What do plants give us? Match them! 🔗',
        pairs: [
          { left: 'Cotton Plant ☁️', right: 'Shirt Cotton 👕' },
          { left: 'Tulsi Herb 🌿', right: 'Medicines 💊' },
          { left: 'Teak Tree 🌳', right: 'Chair Wood 🪑' }
        ],
        options: []
      }
    ]
  },
  {
    id: 20,
    title: 'Saving Plants 🌍',
    titleEn: 'Saving Plants',
    mascot: '🌍',
    color: 'from-emerald-400 to-green-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select all ways to save trees! 🌲',
        gridItems: [
          { text: 'Water daily 🚿', correct: true },
          { text: 'Plant saplings 🌱', correct: true },
          { text: 'Recycle paper 📄', correct: true },
          { text: 'Pluck leaves 🍂', correct: false },
          { text: 'Carve bark 🪵', correct: false }
        ],
        options: []
      }
    ]
  },

  // --- CHAPTER 5: Animal World 🐾 (Levels 21 - 25) ---
  {
    id: 21,
    title: 'Domestic Animals 🐴',
    titleEn: 'Domestic Animals',
    mascot: '🐴',
    color: 'from-teal-400 to-cyan-500',
    borderColor: 'border-teal-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match domestic animals to uses! 🥛',
        pairs: [
          { left: 'Cow 🐮', right: 'Gives Milk 🥛' },
          { left: 'Sheep 🐑', right: 'Gives Wool 🧶' },
          { left: 'Horse 🐴', right: 'Pulls Cart 🛞' }
        ],
        options: []
      }
    ]
  },
  {
    id: 22,
    title: 'Wild Animals 🐅',
    titleEn: 'Wild Animals',
    mascot: '🐅',
    color: 'from-teal-400 to-cyan-500',
    borderColor: 'border-teal-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select wild forest animals! 🦁',
        gridItems: [
          { text: 'Tiger 🐯', correct: true },
          { text: 'Elephant 🐘', correct: true },
          { text: 'Monkey 🐵', correct: true },
          { text: 'Cat 🐱', correct: false },
          { text: 'Hen 🐔', correct: false }
        ],
        options: []
      }
    ]
  },
  {
    id: 23,
    title: 'Animal Homes 🛖',
    titleEn: 'Animal Homes',
    mascot: '🛖',
    color: 'from-teal-400 to-cyan-500',
    borderColor: 'border-teal-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match animal shelter homes! 🏡',
        pairs: [
          { left: 'Dog 🐶', right: 'Kennel 🏠' },
          { left: 'Lion 🦁', right: 'Forest Den 🪨' },
          { left: 'Cow 🐮', right: 'Farm Shed 🛖' },
          { left: 'Spider 🕷️', right: 'Web 🕸️' }
        ],
        options: []
      }
    ]
  },
  {
    id: 24,
    title: 'Animal Food Habits 🥩',
    titleEn: 'Animal Food Habits',
    mascot: '🥩',
    color: 'from-teal-400 to-cyan-500',
    borderColor: 'border-teal-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'What do they eat? Match them! 🌽',
        pairs: [
          { left: 'Cow 🐮', right: 'Eats Grass 🌿' },
          { left: 'Lion 🦁', right: 'Eats Meat 🥩' },
          { left: 'Bear 🐻', right: 'Eats Both 🍎' }
        ],
        options: []
      }
    ]
  },
  {
    id: 25,
    title: 'Caring for Animals 🐾',
    titleEn: 'Caring for Animals',
    mascot: '🐾',
    color: 'from-teal-400 to-cyan-500',
    borderColor: 'border-teal-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select all kind acts! 🐾',
        gridItems: [
          { text: 'Give water 🥛', correct: true },
          { text: 'Keep shelter clean 🧹', correct: true },
          { text: 'Feed grains 🌾', correct: true },
          { text: 'Throw stones 🪨', correct: false },
          { text: 'Tease tail 🐈', correct: false }
        ],
        options: []
      }
    ]
  },

  // --- CHAPTER 6: Our Environment 🌍 (Levels 26 - 30) ---
  {
    id: 26,
    title: 'Living & Non Living Things 🪨',
    titleEn: 'Living & Non Living',
    mascot: '🪨',
    color: 'from-indigo-400 to-violet-500',
    borderColor: 'border-indigo-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match classifications! 🔗',
        pairs: [
          { left: 'Dog 🐕', right: 'Living Thing 🌱' },
          { left: 'Chair 🪑', right: 'Non Living 🪨' },
          { left: 'Plant 🌿', right: 'Living Thing 🌱' }
        ],
        options: []
      }
    ]
  },
  {
    id: 27,
    title: 'Air Around Us 💨',
    titleEn: 'Air Around Us',
    mascot: '💨',
    color: 'from-indigo-400 to-violet-500',
    borderColor: 'border-indigo-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match air properties and actions! 🎈',
        pairs: [
          { left: 'Moving Air 💨', right: 'Wind 🌬️' },
          { left: 'Fill Balloon 🎈', right: 'Air Has Volume 🎈' },
          { left: 'Fire burning 🕯️', right: 'Air Helps Burn 🔥' }
        ],
        options: []
      }
    ]
  },
  {
    id: 28,
    title: 'Water Around Us 💧',
    titleEn: 'Water Around Us',
    mascot: '💧',
    color: 'from-indigo-400 to-violet-500',
    borderColor: 'border-indigo-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match sources to destinations! 🌊',
        pairs: [
          { left: 'Main Source 🌧️', right: 'Rain ☁️' },
          { left: 'Flowing water 🏞️', right: 'River 🌊' },
          { left: 'Salty ocean 🌊', right: 'Sea 🌊' }
        ],
        options: []
      }
    ]
  },
  {
    id: 29,
    title: 'Weather Changes 🌦️',
    titleEn: 'Weather Changes',
    mascot: '🌦️',
    color: 'from-indigo-400 to-violet-500',
    borderColor: 'border-indigo-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match seasons to items! 🧥',
        pairs: [
          { left: 'Hot Summer ☀️', right: 'Cotton shirt 👕' },
          { left: 'Cold Winter ❄️', right: 'Woolen sweater 🧥' },
          { left: 'Wet Rain 🌧️', right: 'Umbrella ☔' }
        ],
        options: []
      }
    ]
  },
  {
    id: 30,
    title: 'Save Environment 🚮',
    titleEn: 'Save Environment',
    mascot: '🚮',
    color: 'from-indigo-400 to-violet-500',
    borderColor: 'border-indigo-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Sort: Recycle ♻️ vs Waste 🗑️!',
        pairs: [
          { left: 'Glass bottle 🍾', right: 'Recycled Glass 🍾' },
          { left: 'Plastic bottle 🧴', right: 'Recycled Plastic 🧴' },
          { left: 'Food scraps 🍌', right: 'Compost Waste 🗑️' }
        ],
        options: []
      }
    ]
  },

  // --- CHAPTER 7: My Neighbourhood 🏡 (Levels 31 - 35) ---
  {
    id: 31,
    title: 'Places Around Us 🏥',
    titleEn: 'Places Around Us',
    mascot: '🏥',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match helper places! 🏥',
        pairs: [
          { left: 'Doctor 🩺', right: 'Hospital 🏥' },
          { left: 'Teacher 📚', right: 'School 🏫' },
          { left: 'Firefighter 🧑‍🚒', right: 'Fire Station 🚒' }
        ],
        options: []
      }
    ]
  },
  {
    id: 32,
    title: 'Community Helpers 🧑‍✈️',
    titleEn: 'Community Helpers',
    mascot: '🧑‍✈️',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Who helps us? Match helper tool! 🧯',
        pairs: [
          { left: 'Chef 🧑‍🍳', right: 'Frying Pan 🍳' },
          { left: 'Postman 📬', right: 'Letter Bag ✉' },
          { left: 'Gardener 🧑‍🌾', right: 'Watering Can 🚿' }
        ],
        options: []
      }
    ]
  },
  {
    id: 33,
    title: 'School & Rules 🏫',
    titleEn: 'School & Rules',
    mascot: '🏫',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select all School Rules! 🏫',
        gridItems: [
          { text: 'Listen to teacher 👩‍🏫', correct: true },
          { text: 'Raise hand 🙋', correct: true },
          { text: 'Keep desk clean 🧼', correct: true },
          { text: 'Run in corridor 🏃', correct: false },
          { text: 'Shout loud 🗣️', correct: false }
        ],
        options: []
      }
    ]
  },
  {
    id: 34,
    title: 'Public Places 🏦',
    titleEn: 'Public Places',
    mascot: '🏦',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match places to actions! 🏦',
        pairs: [
          { left: 'To catch a train 🚂', right: 'Railway Station 🚉' },
          { left: 'To save money 💰', right: 'Bank 🏦' },
          { left: 'To buy stamps ✉️', right: 'Post Office 🏤' }
        ],
        options: []
      }
    ]
  },
  {
    id: 35,
    title: 'Safety Around Us ⚠️',
    titleEn: 'Safety Around Us',
    mascot: '⚠️',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'What should we do to stay safe? Match! 🛝',
        pairs: [
          { left: 'Sharp blade 🪒', right: 'Do NOT touch ❌' },
          { left: 'Wet bathroom floor 🛝', right: 'Walk slowly 🚶' },
          { left: 'Unknown stranger 👤', right: 'Do NOT talk ❌' }
        ],
        options: []
      }
    ]
  },

  // --- CHAPTER 8: Transport & Communication 🚗 (Levels 36 - 40) ---
  {
    id: 36,
    title: 'Land Transport 🚆',
    titleEn: 'Land Transport',
    mascot: '🚆',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select land transport vehicles! 🚗',
        gridItems: [
          { text: 'Car 🚗', correct: true },
          { text: 'Bus 🚌', correct: true },
          { text: 'Bicycle 🚲', correct: true },
          { text: 'Yacht ⛵', correct: false },
          { text: 'Glider 🪂', correct: false }
        ],
        options: []
      }
    ]
  },
  {
    id: 37,
    title: 'Water Transport ⛵',
    titleEn: 'Water Transport',
    mascot: '⛵',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select water transport! ⚓',
        gridItems: [
          { text: 'Cargo Ship 🚢', correct: true },
          { text: 'Rowing Boat ⛵', correct: true },
          { text: 'Speedboat 🚤', correct: true },
          { text: 'Truck 🚚', correct: false },
          { text: 'Rocket 🚀', correct: false }
        ],
        options: []
      }
    ]
  },
  {
    id: 38,
    title: 'Air Transport 🚁',
    titleEn: 'Air Transport',
    mascot: '🚁',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select air transport! ✈️',
        gridItems: [
          { text: 'Aeroplane ✈️', correct: true },
          { text: 'Helicopter 🚁', correct: true },
          { text: 'Fighter Jet 🛩️', correct: true },
          { text: 'Submarine 🚢', correct: false },
          { text: 'Auto Rickshaw 🛺', correct: false }
        ],
        options: []
      }
    ]
  },
  {
    id: 39,
    title: 'Road Safety Rules 🚦',
    titleEn: 'Road Safety Rules',
    mascot: '🚦',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'What should we do? Stop ➔ Look ➔ Cross! 🚦',
        pairs: [
          { left: 'Red light 🔴', right: 'Stop vehicle 🛑' },
          { left: 'Zebra lines 🦓', right: 'Cross safely 🚶' },
          { left: 'Before crossing 🚶', right: 'Look left and right 👀' }
        ],
        options: []
      }
    ]
  },
  {
    id: 40,
    title: 'Communication Methods 📱',
    titleEn: 'Communication Methods',
    mascot: '📱',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match tools to actions! ✉️',
        pairs: [
          { left: 'Mobile Phone 📱', right: 'Quick call 📞' },
          { left: 'Postcard ✉️', right: 'Written note 📮' },
          { left: 'Television 📺', right: 'Broadcasting news 🗞️' }
        ],
        options: []
      }
    ]
  },

  // --- CHAPTER 9: Festivals & World Around Us 🎉 (Levels 41 - 45) ---
  {
    id: 41,
    title: 'National Festivals 🎇',
    titleEn: 'National Festivals',
    mascot: '🎇',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match national festivals! 🇮🇳',
        pairs: [
          { left: '15th August 🗺️', right: 'Independence Day 🇮🇳' },
          { left: '26th January 🏛️', right: 'Republic Day 🏛️' },
          { left: '2nd October 👓', right: 'Gandhi Jayanti 👓' }
        ],
        options: []
      }
    ]
  },
  {
    id: 42,
    title: 'Different Cultures 🗺️',
    titleEn: 'Different Cultures',
    mascot: '🗺️',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match cultural foods to states! 🍜',
        pairs: [
          { left: 'Sarson Ka Saag 🥬', right: 'Punjab 🌾' },
          { left: 'Dhokla 🍛', right: 'Gujarat 🏙️' },
          { left: 'Sambar Rice 🍛', right: 'Tamil Nadu 🌊' }
        ],
        options: []
      }
    ]
  },
  {
    id: 43,
    title: 'Seasons 🌦️',
    titleEn: 'Seasons',
    mascot: '🌦️',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match season to description! ❄️',
        pairs: [
          { left: 'Summer Season ☀️', right: 'Hot sunny days 🍦' },
          { left: 'Winter Season ❄️', right: 'Cold snowy wind 🧣' },
          { left: 'Monsoon Season ⛈️', right: 'Heavy rainfall 🌧️' }
        ],
        options: []
      }
    ]
  },
  {
    id: 44,
    title: 'Earth & Sky Basics 🚀',
    titleEn: 'Earth & Sky Basics',
    mascot: '🚀',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match elements in space! 🌌',
        pairs: [
          { left: 'Blue Planet 🌍', right: 'Our Earth 🗺️' },
          { left: 'Hot gas ball ☀️', right: 'Sun ☀️' },
          { left: 'Appears at night 🌙', right: 'Moon 🌙' }
        ],
        options: []
      }
    ]
  },
  {
    id: 45,
    title: 'Caring for Nature 🌳',
    titleEn: 'Caring for Nature',
    mascot: '🌳',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select kind acts for Earth! 🌍',
        gridItems: [
          { text: 'Throw trash in dustbin 🗑️', correct: true },
          { text: 'Plant trees 🌳', correct: true },
          { text: 'Save running water 🚰', correct: true },
          { text: 'Litter in public 🚮', correct: false },
          { text: 'Keep tap open 🚰', correct: false }
        ],
        options: []
      }
    ]
  }
];

export const GRADE1_TAMIL_LEVELS: Level[] = [
  {
    id: 1,
    title: 'எழுத்து உலகம் 🌈',
    titleEn: 'Phonics + Letters',
    mascot: '🌈',
    color: 'from-cyan-400 to-blue-500',
    borderColor: 'border-cyan-300',
    questions: [
      {
        type: 'choice' as any,
        instruction: 'உயிர்மெய் உருவாக்கம்: க + அ இணைத்தால் கிடைக்கும் எழுத்து எது? 🤝',
        instructionTa: 'உயிர்மெய் உருவாக்கம்: க + அ இணைத்தால் கிடைக்கும் எழுத்து எது? 🤝',
        options: [
          { text: 'க', correct: true },
          { text: 'கா', correct: false },
          { text: 'கி', correct: false }
        ]
      },
      {
        type: 'order' as any,
        instruction: 'Alphabetical Order: Sort these letters correctly! 🔤',
        instructionTa: 'எழுத்து வரிசை: எழுத்துக்களை அகரவரிசையில் வரிசைப்படுத்துக! 🔤',
        options: [
          { text: 'அ ➔ ஆ ➔ இ ➔ ஈ', correct: true },
          { text: 'ஈ ➔ இ ➔ ஆ ➔ அ', correct: false },
          { text: 'ஆ ➔ அ ➔ ஈ ➔ இ', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Missing Letter: Find the correct letter for க _ க 🦆',
        instructionTa: 'விடுபட்ட எழுத்து: க _ க என்பதற்கான சரியான எழுத்தைக் கண்டறி 🦆',
        options: [
          { text: 'ங்', correct: true },
          { text: 'க்', correct: false },
          { text: 'ச்', correct: false }
        ]
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Sort Vowels & Consonants! 🏷️',
        instructionTa: 'உயிர் / மெய் வகைப்படுத்துக! 🏷️',
        pairs: [
          { left: 'அ', right: 'அ ➔ உயிர் எழுத்து' },
          { left: 'க்', right: 'க் ➔ மெய் எழுத்து' },
          { left: 'இ', right: 'இ ➔ உயிர் எழுத்து' }
        ],
        options: []
      },
      {
        type: 'choice' as any,
        instruction: 'Similar Letter: Find the letter that is different from others! 🔎',
        instructionTa: 'ஒரே மாதிரியான எழுத்து: மற்றவற்றிலிருந்து வேறுபட்ட எழுத்தைக் கண்டறி! 🔎',
        options: [
          { text: 'ங (different)', correct: true },
          { text: 'க (same)', correct: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'சொல் கட்டிடம் 🧱',
    titleEn: 'Word Builder',
    mascot: '🧱',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'sentence_train' as any,
        instruction: 'Word Builder: Arrange the letters to build: மரம் 🌳',
        instructionTa: 'சொல் உருவாக்கம்: எழுத்துக்களை இணைத்து சொல் உருவாக்கு: மரம் 🌳',
        words: ['ம', 'ர', 'ம்'],
        correctSentence: 'மரம்',
        options: []
      },
      {
        type: 'choice' as any,
        instruction: 'Missing Vowel: Choose the correct letter for ப _ ம் 🍊',
        instructionTa: 'விடுபட்ட எழுத்து: ப _ ம் என்பதற்கான சரியான எழுத்தைத் தேர்வு செய் 🍊',
        options: [
          { text: 'ழ (பழம்)', correct: true },
          { text: 'ட (படம்)', correct: false },
          { text: 'ம (பமம்)', correct: false }
        ]
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Picture Word Match: Connect the word to its picture! 🖼️',
        instructionTa: 'படம் சொல் பொருத்துக: சொல்லையும் படத்தையும் இணைக்கவும்! 🖼️',
        pairs: [
          { left: 'மரம்', right: '🌳 மரம்' },
          { left: 'சிங்கம்', right: '🦁 சிங்கம்' },
          { left: 'மீன்', right: '🐟 மீன்' }
        ],
        options: []
      },
      {
        type: 'choice' as any,
        instruction: 'Word Split: Choose the correct split for மரம் 🪓',
        instructionTa: 'சொல் பிரித்தல்: மரம் என்பதன் சரியான பிரிப்பைத் தேர்ந்தெடு 🪓',
        options: [
          { text: 'ம + ர + ம்', correct: true },
          { text: 'மர + ம்', correct: false },
          { text: 'ம + ரம்', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Correct Spelling: Choose the word with correct spelling! 🌸',
        instructionTa: 'சரியான எழுத்துக்கூட்டல்: சரியான எழுத்துக்கூட்டல் கொண்ட சொல்லைத் தேர்ந்தெடு! 🌸',
        options: [
          { text: 'மலர்', correct: true },
          { text: 'மளர்', correct: false }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'சொல் வளம் + இலக்கணம் 🌱',
    titleEn: 'Vocabulary + Grammar',
    mascot: '🌱',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'choice' as any,
        instruction: 'Noun Finder: Choose the Noun (பெயர்ச்சொல்) in: "ரவி ஓடினான்" 🏃‍♂️',
        instructionTa: 'பெயர்ச்சொல் அறிவோம்: "ரவி ஓடினான்" என்பதில் பெயர்ச்சொல் எது? 🏃‍♂️',
        options: [
          { text: 'ரவி', correct: true },
          { text: 'ஓடினான்', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Action Word: Choose the Verb (வினைச்சொல்) in: "ஆடு புல் மேய்ந்தது" 🐐',
        instructionTa: 'வினைச்சொல் அறிவோம்: "ஆடு புல் மேய்ந்தது" என்பதில் வினைச்சொல் எது? 🐐',
        options: [
          { text: 'மேய்ந்தது', correct: true },
          { text: 'ஆடு', correct: false },
          { text: 'புல்', correct: false }
        ]
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Singular Plural Match: Connect singular to its plural! 👥',
        instructionTa: 'ஒருமை பன்மை பொருத்துக: ஒருமையை அதன் பன்மையோடு இணைக்கவும்! 👥',
        pairs: [
          { left: 'மரம்', right: 'மரங்கள்' },
          { left: 'பந்து', right: 'பந்துகள்' },
          { left: 'பூ', right: 'பூக்கள்' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Opposite Match: Match the opposites! ↔️',
        instructionTa: 'எதிர்ச்சொல் பொருத்துக: எதிர்ச்சொற்களை இணைக்கவும்! ↔️',
        pairs: [
          { left: 'பெரியது', right: 'சிறியது' },
          { left: 'மேலே', right: 'கீழே' },
          { left: 'வெப்பம்', right: 'குளிர்ச்சி' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Categorize Words! 🏷️',
        instructionTa: 'வகைப்படுத்துக: சொற்களை அதன் வகையோடு இணைக்கவும்! 🏷️',
        pairs: [
          { left: 'சிங்கம்', right: 'விலங்கு' },
          { left: 'சோறு', right: 'உணவு' },
          { left: 'நாற்காலி', right: 'பொருள்' }
        ],
        options: []
      }
    ]
  },
  {
    id: 4,
    title: 'வாசிப்பு திறன் 📖',
    titleEn: 'Reading Comprehension',
    mascot: '📖',
    color: 'from-violet-400 to-indigo-500',
    borderColor: 'border-violet-300',
    questions: [
      {
        type: 'sentence_train' as any,
        instruction: 'Sentence Builder: Arrange the words to form a correct Tamil sentence! 🚂',
        instructionTa: 'வாக்கியம் அமைப்போம்: சொற்களை ஒழுங்குபடுத்தி சரியான வாக்கியத்தை அமைக்கவும்! 🚂',
        words: ['ரவி', 'விளையாடுகிறான்'],
        correctSentence: 'ரவி விளையாடுகிறான்',
        options: []
      },
      {
        type: 'order' as any,
        instruction: 'Routine Order: Order the routine stages correctly! ⏰',
        instructionTa: 'நாள் ஒழுங்கு: தினசரி செயல்பாடுகளைச் சரியான வரிசையில் ஒழுங்குபடுத்துக! ⏰',
        options: [
          { text: 'காலையில் எழுதல் ➔ பல் துலக்குதல் ➔ பள்ளிக்குச் செல்லுதல்', correct: true },
          { text: 'பள்ளிக்குச் செல்லுதல் ➔ காலையில் எழுதல் ➔ பல் துலக்குதல்', correct: false },
          { text: 'பல் துலக்குதல் ➔ பள்ளிக்குச் செல்லுதல் ➔ காலையில் எழுதல்', correct: false }
        ]
      },
      {
        type: 'story_cave' as any,
        instruction: 'Read the story and answer: What is the color of the dog? 🐶',
        instructionTa: 'கதையை வாசித்து விடையளி: நாயின் நிறம் என்ன? 🐶',
        storyText: 'முகிலன் ஒரு நாய் வளர்க்கிறான். அதன் பெயர் மணி. அது வெள்ளை நிறம். முகிலன் அதனுடன் விளையாடுகிறான்.',
        options: [
          { text: 'வெள்ளை', correct: true },
          { text: 'கருப்பு', correct: false },
          { text: 'செம்மை', correct: false }
        ]
      },
      {
        type: 'story_cave' as any,
        instruction: 'Story Completion: Choose the best sentence to fill the gap. 📖',
        instructionTa: 'கதை நிறைவு: கதையில் விடுபட்ட பகுதியைச் சேர்க்கவும் 📖\n"ஒரு காட்டில் நரி ஒன்று இருந்தது. ___ அது திராட்சை தோட்டத்திற்குச் சென்றது."',
        storyText: 'ஒரு காட்டில் நரி ஒன்று இருந்தது. ___ அது திராட்சை தோட்டத்திற்குச் சென்றது.',
        options: [
          { text: 'அதற்குப் பசி எடுத்தது.', correct: true },
          { text: 'அது தூங்கிக் கொண்டிருந்தது.', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Picture Match: Choose the sentence that describes the picture of a swimming fish! 🐟',
        instructionTa: 'படம் பொருத்துக: நீந்தும் மீனின் படத்தை விளக்கும் வாக்கியத்தைத் தேர்ந்தெடு! 🐟',
        options: [
          { text: 'மீன் நீரில் நீந்துகிறது.', correct: true },
          { text: 'பறவை வானில் பறக்கிறது.', correct: false }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'எழுத்து பயிற்சி ✏️',
    titleEn: 'Writing Mission',
    mascot: '✏️',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      {
        type: 'trace' as any,
        instruction: 'Handwriting Mission: Trace the letter: க ✍️',
        instructionTa: 'எழுத்துப் பயிற்சி: க என்ற எழுத்தை எழுதவும்! ✍️',
        letter: 'க',
        options: []
      },
      {
        type: 'choice' as any,
        instruction: 'Word Writing: Choose the correct word for the Sun! ☀️',
        instructionTa: 'சொல் அறிதல்: சூரியனின் படத்திற்கான சரியான சொல்லைத் தேர்வு செய்க! ☀️',
        options: [
          { text: 'சூரியன்', correct: true },
          { text: 'சந்திரன்', correct: false }
        ]
      },
      {
        type: 'garden_repair' as any,
        instruction: 'Complete the Word: Complete the name of the crow! 🐦',
        instructionTa: 'சொல் நிறைவு: காகத்தின் பெயரை முழுமையாக்குங்கள்! 🐦',
        sentence: 'கா ____ ம்',
        options: [
          { text: 'க', correct: true },
          { text: 'ச', correct: false }
        ]
      },
      {
        type: 'sentence_train' as any,
        instruction: 'Sentence Builder: Arrange the words to write a sentence! 🍽️',
        instructionTa: 'வாக்கிய வடிவமைப்பு: சொற்களை ஒழுங்குபடுத்தி வாக்கியத்தை அமைக்கவும்! 🍽️',
        words: ['அம்மா', 'உணவு', 'சமைத்தார்'],
        correctSentence: 'அம்மா உணவு சமைத்தார்',
        options: []
      },
      {
        type: 'choice' as any,
        instruction: 'Picture Writing: Choose the correct sentence describing rain falling! 🌧️',
        instructionTa: 'பட விவரிப்பு: மழை பொழிவதை விளக்கும் சரியான வாக்கியத்தைத் தேர்வு செய்! 🌧️',
        options: [
          { text: 'மழை பெய்கிறது.', correct: true },
          { text: 'வெயில் அடிக்கிறது.', correct: false }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'மொழி சவால் 🧠',
    titleEn: 'Tamil Language Challenge',
    mascot: '🧠',
    color: 'from-purple-400 to-indigo-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'choice' as any,
        instruction: 'Word Puzzle: Arrange letters "ப ள் ளி" to make a word! 🏫',
        instructionTa: 'சொல் புதிர்: "ப ள் ளி" என்ற எழுத்துக்களை ஒழுங்குபடுத்திச் சொல் உருவாக்கு! 🏫',
        options: [
          { text: 'பள்ளி', correct: true },
          { text: 'ளிபள்', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Odd One Out: Find the word that is NOT an animal! 🚫',
        instructionTa: 'வேறுபட்டதைக் கண்டுபிடி: விலங்கு அல்லாத சொல்லைக் கண்டறி! 🚫',
        options: [
          { text: 'மரம் (not an animal)', correct: true },
          { text: 'மாடு', correct: false },
          { text: 'பூனை', correct: false },
          { text: 'நாய்', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Spelling Maze: Choose the list with correct spelling order! 🏆',
        instructionTa: 'எழுத்துப்பாதை: சரியான எழுத்துக்கூட்டல் வரிசையைக் கொண்ட பட்டியலைத் தேர்ந்தெடு! 🏆',
        options: [
          { text: 'ப, ழ, ம்', correct: true },
          { text: 'ப, ட, ம்', correct: false }
        ]
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Grammar Match: Connect word to grammar category! 🏷️',
        instructionTa: 'இலக்கணப் பொருத்தம்: சொற்களை அதன் இலக்கண வகையோடு இணைக்கவும்! 🏷️',
        pairs: [
          { left: 'பசு', right: 'பெயர்ச்சொல்' },
          { left: 'வந்தது', right: 'வினைச்சொல்' }
        ],
        options: []
      },
      {
        type: 'order' as any,
        instruction: 'Story Sequencer: Sort plant growth in correct order! 🌱',
        instructionTa: 'கதை வரிசை: தாவர வளர்ச்சியின் படிகளைச் சரியான வரிசையில் ஒழுங்குபடுத்து! 🌱',
        options: [
          { text: 'விதை விதைத்தல் ➔ செடி வளர்தல் ➔ பூ பூத்தல்', correct: true },
          { text: 'பூ பூத்தல் ➔ செடி வளர்தல் ➔ விதை விதைத்தல்', correct: false }
        ]
      }
    ]
  }
];
export const GRADE1_GK_LEVELS: Level[] = [
  // --- CHAPTER 1: My Amazing World 🌍 (Levels 1 - 5) ---
  {
    id: 1,
    title: 'Myself & My Surroundings 🧍',
    titleEn: 'Myself & My Surroundings',
    mascot: '🧍',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      {
        type: 'learn_card' as any,
        conceptTitle: 'My Surroundings 🏡',
        explanation: 'Everything around us forms our surroundings. This includes our house, family, school, parks, and neighbors. Keeping our surroundings clean is our duty!',
        mascot: '🏡',
        examples: [
          'My Home 🏠 - Where I live with family',
          'My School 🏫 - Where I learn and play',
          'The Park 🌳 - Where I run and slide'
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Match places to their descriptions! 🔗',
        pairs: [
          { left: 'Where I sleep 🛌', right: 'Bedroom 🛏️' },
          { left: 'Where I study 🏫', right: 'School 🎒' },
          { left: 'Where I play 🎠', right: 'Park 🌳' }
        ],
        options: []
      }
    ]
  },
  {
    id: 2,
    title: 'My Country India 🇮🇳',
    titleEn: 'My Country India',
    mascot: '🇮🇳',
    color: 'from-orange-400 to-amber-500',
    borderColor: 'border-orange-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match our great country facts! 🔗',
        pairs: [
          { left: 'Our Country 🗺️', right: 'India 🇮🇳' },
          { left: 'National Anthem 🎵', right: 'Jana Gana Mana 🇮🇳' },
          { left: 'Capital City 🏢', right: 'New Delhi 🏛️' }
        ],
        options: []
      }
    ]
  },
  {
    id: 3,
    title: 'States & Capitals (basic intro) 🗺️',
    titleEn: 'States & Capitals',
    mascot: '🗺️',
    color: 'from-orange-400 to-amber-500',
    borderColor: 'border-orange-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match States to their capital cities! 🏢',
        pairs: [
          { left: 'Tamil Nadu 🗺️', right: 'Chennai 🌊' },
          { left: 'Maharashtra 🗺️', right: 'Mumbai 🏙️' },
          { left: 'Karnataka 🗺️', right: 'Bengaluru 💻' }
        ],
        options: []
      }
    ]
  },
  {
    id: 4,
    title: 'National Symbols 🦁',
    titleEn: 'National Symbols',
    mascot: '🦁',
    color: 'from-orange-400 to-amber-500',
    borderColor: 'border-orange-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match National Symbols! 🔗',
        pairs: [
          { left: 'National Animal 🐯', right: 'Bengal Tiger 🐅' },
          { left: 'National Bird 🦚', right: 'Peacock 🦚' },
          { left: 'National Flower 🪷', right: 'Lotus 🪷' },
          { left: 'National Fruit 🥭', right: 'Mango 🥭' }
        ],
        options: []
      }
    ]
  },
  {
    id: 5,
    title: 'Important Places in India 🏛️',
    titleEn: 'Important Places in India',
    mascot: '🏛️',
    color: 'from-orange-400 to-amber-500',
    borderColor: 'border-orange-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match Monuments to their locations! 🔗',
        pairs: [
          { left: 'Taj Mahal 🕌', right: 'Agra 🏛️' },
          { left: 'Gateway of India 🗼', right: 'Mumbai 🏙️' },
          { left: 'Red Fort 🏰', right: 'Delhi 🏛️' }
        ],
        options: []
      }
    ]
  },

  // --- CHAPTER 2: Animal Kingdom 🐾 (Levels 6 - 10) ---
  {
    id: 6,
    title: 'Wild Animals 🦁',
    titleEn: 'Wild Animals',
    mascot: '🦁',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select all Wild Animals! 🦁',
        gridItems: [
          { text: 'Lion 🦁', correct: true },
          { text: 'Tiger 🐯', correct: true },
          { text: 'Elephant 🐘', correct: true },
          { text: 'Cow 🐮', correct: false },
          { text: 'Dog 🐶', correct: false }
        ],
        options: []
      }
    ]
  },
  {
    id: 7,
    title: 'Domestic Animals 🐮',
    titleEn: 'Domestic Animals',
    mascot: '🐮',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select all Domestic/Farm Animals! 🐮',
        gridItems: [
          { text: 'Cow 🐮', correct: true },
          { text: 'Goat 🐐', correct: true },
          { text: 'Sheep 🐑', correct: true },
          { text: 'Lion 🦁', correct: false },
          { text: 'Shark 🦈', correct: false }
        ],
        options: []
      }
    ]
  },
  {
    id: 8,
    title: 'Sea Animals 🦈',
    titleEn: 'Sea Animals',
    mascot: '🦈',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match sea creatures to their names! 🐙',
        pairs: [
          { left: 'Eight arms 🐙', right: 'Octopus 🐙' },
          { left: 'Friendly swimmer 🐬', right: 'Dolphin 🐬' },
          { left: 'Big teeth 🦈', right: 'Shark 🦈' }
        ],
        options: []
      }
    ]
  },
  {
    id: 9,
    title: 'Baby Animals 🍼',
    titleEn: 'Baby Animals',
    mascot: '🍼',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match parents to babies! 🤝',
        pairs: [
          { left: 'Dog 🐶', right: 'Puppy 🐕' },
          { left: 'Cat 🐱', right: 'Kitten 🐈' },
          { left: 'Cow 🐮', right: 'Calf 🐂' },
          { left: 'Lion 🦁', right: 'Cub 🦁' }
        ],
        options: []
      }
    ]
  },
  {
    id: 10,
    title: 'Animal Homes 🏡',
    titleEn: 'Animal Homes',
    mascot: '🏡',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Who lives where? Match them! ⛺',
        pairs: [
          { left: 'Lion 🦁', right: 'Den 🪨' },
          { left: 'Bird 🐦', right: 'Nest 🪹' },
          { left: 'Dog 🐶', right: 'Kennel 🏠' },
          { left: 'Cow 🐮', right: 'Shed 🛖' }
        ],
        options: []
      }
    ]
  },

  // --- CHAPTER 3: Bird & Insect World 🐦 (Levels 11 - 15) ---
  {
    id: 11,
    title: 'Common Birds 🦜',
    titleEn: 'Common Birds',
    mascot: '🦜',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select all Birds! 🦜',
        gridItems: [
          { text: 'Crow 🐦', correct: true },
          { text: 'Parrot 🦜', correct: true },
          { text: 'Eagle 🦅', correct: true },
          { text: 'Ant 🐜', correct: false },
          { text: 'Spider 🕷️', correct: false }
        ],
        options: []
      }
    ]
  },
  {
    id: 12,
    title: 'Bird Features 🪶',
    titleEn: 'Bird Features',
    mascot: '🪶',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match features to their uses! 🪶',
        pairs: [
          { left: 'Wings 🪶', right: 'To Fly ☁️' },
          { left: 'Beak 👄', right: 'To Eat 🍒' },
          { left: 'Claws 👣', right: 'To Perch 🪵' }
        ],
        options: []
      }
    ]
  },
  {
    id: 13,
    title: 'Flying & Non Flying Birds 🐧',
    titleEn: 'Flying & Non Flying Birds',
    mascot: '🐧',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Classify flying and non-flying birds! 🔗',
        pairs: [
          { left: 'Peacock 🦚', right: 'Flies high ☁️' },
          { left: 'Penguin 🐧', right: 'Swims in ice ❄️' },
          { left: 'Ostrich 🦤', right: 'Runs very fast 🏃' }
        ],
        options: []
      }
    ]
  },
  {
    id: 14,
    title: 'Insects Around Us 🐜',
    titleEn: 'Insects Around Us',
    mascot: '🐜',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select all Insects! 🐜',
        gridItems: [
          { text: 'Ant 🐜', correct: true },
          { text: 'Mosquito 🦟', correct: true },
          { text: 'Housefly 🪰', correct: true },
          { text: 'Parrot 🦜', correct: false },
          { text: 'Shark 🦈', correct: false }
        ],
        options: []
      }
    ]
  },
  {
    id: 15,
    title: 'Useful Insects 🐝',
    titleEn: 'Useful Insects',
    mascot: '🐝',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match useful insects to their products! 🔗',
        pairs: [
          { left: 'Honeybee 🐝', right: 'Honey 🍯' },
          { left: 'Silkworm 🐛', right: 'Silk 🥻' },
          { left: 'Earthworm 🪱', right: 'Soil Health 🌱' }
        ],
        options: []
      }
    ]
  },

  // --- CHAPTER 4: Plant World 🌱 (Levels 16 - 20) ---
  {
    id: 16,
    title: 'Parts of Plant 🍃',
    titleEn: 'Parts of Plant',
    mascot: '🍃',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      {
        type: 'learn_card' as any,
        conceptTitle: 'Parts of a Plant 🌳',
        explanation: 'Just like us, plants have different parts that do different jobs. Roots take in water. Stem holds the plant up. Leaves make food. Flowers make seeds!',
        mascot: '🌳',
        examples: [
          'Roots 🪵 - Stay under the soil',
          'Leaves 🍃 - Green parts making food',
          'Flower 🌸 - Beautiful part that smells nice'
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Match parts to their locations! 🔗',
        pairs: [
          { left: 'Under the soil 🪱', right: 'Roots 🪵' },
          { left: 'Green color part 🍃', right: 'Leaf 🍂' },
          { left: 'Holds plant straight 🎋', right: 'Stem 🪵' }
        ],
        options: []
      }
    ]
  },
  {
    id: 17,
    title: 'Types of Plants 🌵',
    titleEn: 'Types of Plants',
    mascot: '🌵',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match plant types to examples! 🌳',
        pairs: [
          { left: 'Big strong plant 🪵', right: 'Tree 🌳' },
          { left: 'Small bushy plant 🌿', right: 'Shrub 🪴' },
          { left: 'Needs support to climb 🧗', right: 'Climber 🍇' }
        ],
        options: []
      }
    ]
  },
  {
    id: 18,
    title: 'Trees & Flowers 🌸',
    titleEn: 'Trees & Flowers',
    mascot: '🌸',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match flowers and trees to their names! 🌳',
        pairs: [
          { left: 'National Tree 🌳', right: 'Banyan Tree 🦚' },
          { left: 'Smells beautiful 🌹', right: 'Rose 🌹' },
          { left: 'Yellow flower facing sun 🌻', right: 'Sunflower 🌻' }
        ],
        options: []
      }
    ]
  },
  {
    id: 19,
    title: 'Fruits & Vegetables 🍎',
    titleEn: 'Fruits & Vegetables',
    mascot: '🍎',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Classify Fruits and Vegetables! 🍇',
        pairs: [
          { left: 'Apple 🍎', right: 'Sweet Fruit 🍎' },
          { left: 'Spinach 🥬', right: 'Leafy Green 🥬' },
          { left: 'Potato 🥔', right: 'Root Vegetable 🥔' }
        ],
        options: []
      }
    ]
  },
  {
    id: 20,
    title: 'Uses of Plants 🪵',
    titleEn: 'Uses of Plants',
    mascot: '🪵',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match plant uses to items! 🔗',
        pairs: [
          { left: 'To write on 📄', right: 'Paper 📄' },
          { left: 'To wear 👕', right: 'Cotton ☁️' },
          { left: 'To build chairs 🪑', right: 'Wood 🪵' }
        ],
        options: []
      }
    ]
  },

  // --- CHAPTER 5: Science Around Us 🔬 (Levels 21 - 25) ---
  {
    id: 21,
    title: 'Five Senses 👀',
    titleEn: 'Five Senses',
    mascot: '👀',
    color: 'from-cyan-400 to-teal-500',
    borderColor: 'border-cyan-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match sense organs to their actions! 👃',
        pairs: [
          { left: 'Eyes 👀', right: 'To See 🌈' },
          { left: 'Nose 👃', right: 'To Smell 🌹' },
          { left: 'Ears 👂', right: 'To Hear 🎵' },
          { left: 'Tongue 👅', right: 'To Taste 🍦' }
        ],
        options: []
      }
    ]
  },
  {
    id: 22,
    title: 'Living & Non Living Things 🪨',
    titleEn: 'Living & Non Living Things',
    mascot: '🪨',
    color: 'from-cyan-400 to-teal-500',
    borderColor: 'border-cyan-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select all Living Things (which grow and breathe)! 🌱',
        gridItems: [
          { text: 'Plant 🌱', correct: true },
          { text: 'Puppy 🐶', correct: true },
          { text: 'Bird 🐦', correct: true },
          { text: 'Stone 🪨', correct: false },
          { text: 'Toy Car 🚗', correct: false }
        ],
        options: []
      }
    ]
  },
  {
    id: 23,
    title: 'Day & Night 🌞',
    titleEn: 'Day & Night',
    mascot: '🌞',
    color: 'from-cyan-400 to-teal-500',
    borderColor: 'border-cyan-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match time to elements! 🌙',
        pairs: [
          { left: 'Bright Sun ☀️', right: 'Day Time 🌞' },
          { left: 'Stars & Moon 🌙', right: 'Night Time 🌃' },
          { left: 'Eating breakfast 🍳', right: 'Morning Time 🌅' }
        ],
        options: []
      }
    ]
  },
  {
    id: 24,
    title: 'Weather Basics ☁️',
    titleEn: 'Weather Basics',
    mascot: '☁️',
    color: 'from-cyan-400 to-teal-500',
    borderColor: 'border-cyan-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match weather to items we use! ☔',
        pairs: [
          { left: 'Hot Sun ☀️', right: 'Sunglasses 🕶️' },
          { left: 'Rainy Day 🌧️', right: 'Umbrella ☔' },
          { left: 'Cold Day ❄️', right: 'Sweater 🧥' }
        ],
        options: []
      }
    ]
  },
  {
    id: 25,
    title: 'Water & Air 💨',
    titleEn: 'Water & Air',
    mascot: '💨',
    color: 'from-cyan-400 to-teal-500',
    borderColor: 'border-cyan-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match uses of water and air! 🔗',
        pairs: [
          { left: 'Thirsty 🥤', right: 'Drink Water 💧' },
          { left: 'Flying Kite 🪁', right: 'Moving Air 💨' },
          { left: 'Washing hands 🧼', right: 'Clean Water 💧' }
        ],
        options: []
      }
    ]
  },

  // --- CHAPTER 6: People & Community 👥 (Levels 26 - 30) ---
  {
    id: 26,
    title: 'Community Helpers 🧑‍🚒',
    titleEn: 'Community Helpers',
    mascot: '🧑‍🚒',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'learn_card' as any,
        conceptTitle: 'Community Helpers 👥',
        explanation: 'Many people help us every day in our community. Doctors keep us healthy. Firefighters put out fires. Teachers teach us reading and writing.',
        mascot: '👥',
        examples: [
          'Doctor 🩺 - Helps when we are sick',
          'Teacher 👩‍🏫 - Helps us learn new things',
          'Firefighter 🧑‍🚒 - Keeps us safe from fire'
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Who helps us? Match helper to task! 🔗',
        pairs: [
          { left: 'When sick 🩺', right: 'Doctor 👨‍⚕️' },
          { left: 'To learn lessons 📚', right: 'Teacher 👩‍🏫' },
          { left: 'Keeps us safe 👮', right: 'Police Officer 👮' }
        ],
        options: []
      }
    ]
  },
  {
    id: 27,
    title: 'Doctor, Teacher, Police 🩺',
    titleEn: 'Doctor, Teacher, Police',
    mascot: '🩺',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match helper tools! 🛠️',
        pairs: [
          { left: 'Stethoscope 🩺', right: 'Doctor 👨‍⚕️' },
          { left: 'Blackboard 🪵', right: 'Teacher 👩‍🏫' },
          { left: 'Handcuffs ⛓️', right: 'Police Officer 👮' }
        ],
        options: []
      }
    ]
  },
  {
    id: 28,
    title: 'Places Around Us 🏥',
    titleEn: 'Places Around Us',
    mascot: '🏥',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match descriptions to neighborhood places! 🏥',
        pairs: [
          { left: 'To buy stamps ✉️', right: 'Post Office 🏤' },
          { left: 'To treat patients 🏥', right: 'Hospital 🏥' },
          { left: 'To keep money safe 💰', right: 'Bank 🏦' }
        ],
        options: []
      }
    ]
  },
  {
    id: 29,
    title: 'Good Habits 🧼',
    titleEn: 'Good Habits',
    mascot: '🧼',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select all Good Habits! 🧼',
        gridItems: [
          { text: 'Wash Hands 🧼', correct: true },
          { text: 'Brush Teeth 🪥', correct: true },
          { text: 'Throw trash in bin 🗑️', correct: true },
          { text: 'Bite Nails 💅', correct: false },
          { text: 'Shout loud 🗣️', correct: false }
        ],
        options: []
      }
    ]
  },
  {
    id: 30,
    title: 'Safety Rules ⚠️',
    titleEn: 'Safety Rules',
    mascot: '⚠️',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match Safety Rules! ⚠️',
        pairs: [
          { left: 'With matchsticks 🔥', right: 'Do NOT play ❌' },
          { left: 'On the road 🛣️', right: 'Do NOT run ❌' },
          { left: 'While crossing 🚶', right: 'Use Zebra crossing 🦓' }
        ],
        options: []
      }
    ]
  },

  // --- CHAPTER 7: Transport & Communication 🚗 (Levels 31 - 35) ---
  {
    id: 31,
    title: 'Land Transport 🚗',
    titleEn: 'Land Transport',
    mascot: '🚗',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select all Land Vehicles! 🚗',
        gridItems: [
          { text: 'Car 🚗', correct: true },
          { text: 'Bus 🚌', correct: true },
          { text: 'Train 🚂', correct: true },
          { text: 'Ship 🚢', correct: false },
          { text: 'Aeroplane ✈️', correct: false }
        ],
        options: []
      }
    ]
  },
  {
    id: 32,
    title: 'Water Transport 🚢',
    titleEn: 'Water Transport',
    mascot: '🚢',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select all Water Vehicles! 🚢',
        gridItems: [
          { text: 'Ship 🚢', correct: true },
          { text: 'Boat ⛵', correct: true },
          { text: 'Submarine 🚢', correct: true },
          { text: 'Bicycle 🚲', correct: false },
          { text: 'Helicopter 🚁', correct: false }
        ],
        options: []
      }
    ]
  },
  {
    id: 33,
    title: 'Air Transport ✈️',
    titleEn: 'Air Transport',
    mascot: '✈️',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'grid_search' as any,
        instruction: 'Select all Air Vehicles! ✈️',
        gridItems: [
          { text: 'Aeroplane ✈️', correct: true },
          { text: 'Helicopter 🚁', correct: true },
          { text: 'Hot Air Balloon 🎈', correct: true },
          { text: 'Motorcycle 🏍️', correct: false },
          { text: 'Metro Train 🚇', correct: false }
        ],
        options: []
      }
    ]
  },
  {
    id: 34,
    title: 'Communication Tools 📞',
    titleEn: 'Communication Tools',
    mascot: '📞',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match tools to their uses! 📞',
        pairs: [
          { left: 'Mobile Phone 📱', right: 'Calling 📞' },
          { left: 'Letter ✉️', right: 'Post Box 📮' },
          { left: 'Newspaper 📰', right: 'Reading news 🗞️' }
        ],
        options: []
      }
    ]
  },
  {
    id: 35,
    title: 'Road Safety 🚦',
    titleEn: 'Road Safety',
    mascot: '🚦',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'What do traffic lights mean? Match them! 🚦',
        pairs: [
          { left: 'Red light 🔴', right: 'Stop 🛑' },
          { left: 'Yellow light 🟡', right: 'Get Ready ⏳' },
          { left: 'Green light 🟢', right: 'Go ➡️' }
        ],
        options: []
      }
    ]
  },

  // --- CHAPTER 8: Fun Knowledge Zone 🧠 (Levels 36 - 40) ---
  {
    id: 36,
    title: 'Colours & Shapes Around Us 🎨',
    titleEn: 'Colours & Shapes',
    mascot: '🎨',
    color: 'from-indigo-400 to-purple-500',
    borderColor: 'border-indigo-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match objects to their shapes! 📐',
        pairs: [
          { left: 'Carrom Board 🔲', right: 'Square ⬜' },
          { left: 'Football ⚽', right: 'Circle ⚪' },
          { left: 'Ice Cream Cone 🍦', right: 'Triangle 🔺' }
        ],
        options: []
      }
    ]
  },
  {
    id: 37,
    title: 'Festivals 🎉',
    titleEn: 'Festivals',
    mascot: '🎉',
    color: 'from-indigo-400 to-purple-500',
    borderColor: 'border-indigo-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match festivals to descriptions! 🏮',
        pairs: [
          { left: 'Festival of lights 🪔', right: 'Diwali 🎆' },
          { left: 'Festival of colors 🎨', right: 'Holi 🌈' },
          { left: 'Santa Claus 🎅', right: 'Christmas 🎄' }
        ],
        options: []
      }
    ]
  },
  {
    id: 38,
    title: 'Food Around World 🍕',
    titleEn: 'Food Around World',
    mascot: '🍕',
    color: 'from-indigo-400 to-purple-500',
    borderColor: 'border-indigo-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match popular foods! 🍔',
        pairs: [
          { left: 'Pizza 🍕', right: 'Italy 🇮🇹' },
          { left: 'Burger 🍔', right: 'America 🇺🇸' },
          { left: 'Idli 🍛', right: 'India 🇮🇳' }
        ],
        options: []
      }
    ]
  },
  {
    id: 39,
    title: 'Sports Basics ⚽',
    titleEn: 'Sports Basics',
    mascot: '⚽',
    color: 'from-indigo-400 to-purple-500',
    borderColor: 'border-indigo-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match sports to equipment! 🏸',
        pairs: [
          { left: 'Cricket 🏏', right: 'Bat & Ball ⚾' },
          { left: 'Football ⚽', right: 'Goal Post 🥅' },
          { left: 'Badminton 🏸', right: 'Racket & Shuttle 🏸' }
        ],
        options: []
      }
    ]
  },
  {
    id: 40,
    title: 'Space Intro (Sun, Moon, Stars) 🚀',
    titleEn: 'Space Intro',
    mascot: '🚀',
    color: 'from-indigo-400 to-purple-500',
    borderColor: 'border-indigo-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match space elements! 🌠',
        pairs: [
          { left: 'Gives us heat ☀️', right: 'Sun ☀️' },
          { left: 'Changes shape at night 🌙', right: 'Moon 🌙' },
          { left: 'Twinkle in the sky 🌟', right: 'Stars ✨' }
        ],
        options: []
      }
    ]
  }
];

export const GRADE1_HINDI_LEVELS: Level[] = [
  // --- CHAPTER 1: वर्णमाला Revision ---
  {
    id: 1,
    title: 'स्वर Revision 🇮🇳',
    titleEn: 'Swar Revision',
    mascot: '🇮🇳',
    color: 'from-orange-400 to-red-500',
    borderColor: 'border-orange-300',
    questions: [
      { type: 'letter_board' as any, instruction: 'स्वर (Vowels) 🗣️', instructionTa: 'सारे स्वर को देखें और याद रखें! (Look and remember all vowels!)', boardTitle: 'स्वर - Hindi Vowels', boardSubtitle: 'Hindi Vowels (11+2)', letters: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'], color: 'from-orange-400 to-red-500', options: [] },
      { type: 'trace' as any, instruction: 'Trace: अ ✍️', letter: 'अ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: आ ✍️', letter: 'आ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: इ ✍️', letter: 'इ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ई ✍️', letter: 'ई', options: [] },
      { type: 'trace' as any, instruction: 'Trace: उ ✍️', letter: 'उ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ऊ ✍️', letter: 'ऊ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ऋ ✍️', letter: 'ऋ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ए ✍️', letter: 'ए', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ऐ ✍️', letter: 'ऐ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ओ ✍️', letter: 'ओ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: औ ✍️', letter: 'औ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: अं ✍️', letter: 'अं', options: [] },
      { type: 'trace' as any, instruction: 'Trace: अः ✍️', letter: 'अः', options: [] },
      { type: 'garden_repair' as any, instruction: 'Choose the Swar for: अनार 🍎', sentence: '___ - अनार', options: [{ text: 'अ', correct: true }, { text: 'क', correct: false }] }
    ]
  },
  {
    id: 2,
    title: 'व्यंजन Revision 🇮🇳',
    titleEn: 'Vyanjan Revision',
    mascot: '🇮🇳',
    color: 'from-orange-400 to-red-500',
    borderColor: 'border-orange-300',
    questions: [
      { type: 'letter_board' as any, instruction: 'व्यंजन (Consonants) 🗣️', instructionTa: 'सारे व्यंजन को देखें और याद रखें! (Look and remember all consonants!)', boardTitle: 'व्यंजन - Hindi Consonants', boardSubtitle: 'Hindi Consonants (33+4)', letters: ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह', 'क्ष', 'त्र', 'ज्ञ', 'श्र'], color: 'from-orange-400 to-red-500', options: [] },
      { type: 'trace' as any, instruction: 'Trace: क ✍️', letter: 'क', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ख ✍️', letter: 'ख', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ग ✍️', letter: 'ग', options: [] },
      { type: 'trace' as any, instruction: 'Trace: घ ✍️', letter: 'घ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ङ ✍️', letter: 'ङ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: च ✍️', letter: 'च', options: [] },
      { type: 'trace' as any, instruction: 'Trace: छ ✍️', letter: 'छ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ज ✍️', letter: 'ज', options: [] },
      { type: 'trace' as any, instruction: 'Trace: झ ✍️', letter: 'झ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ञ ✍️', letter: 'ञ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ट ✍️', letter: 'ट', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ठ ✍️', letter: 'ठ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ड ✍️', letter: 'ड', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ढ ✍️', letter: 'ढ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ण ✍️', letter: 'ण', options: [] },
      { type: 'trace' as any, instruction: 'Trace: त ✍️', letter: 'त', options: [] },
      { type: 'trace' as any, instruction: 'Trace: थ ✍️', letter: 'थ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: द ✍️', letter: 'द', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ध ✍️', letter: 'ध', options: [] },
      { type: 'trace' as any, instruction: 'Trace: न ✍️', letter: 'न', options: [] },
      { type: 'trace' as any, instruction: 'Trace: प ✍️', letter: 'प', options: [] },
      { type: 'trace' as any, instruction: 'Trace: फ ✍️', letter: 'फ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ब ✍️', letter: 'ब', options: [] },
      { type: 'trace' as any, instruction: 'Trace: भ ✍️', letter: 'भ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: म ✍️', letter: 'म', options: [] },
      { type: 'trace' as any, instruction: 'Trace: य ✍️', letter: 'य', options: [] },
      { type: 'trace' as any, instruction: 'Trace: र ✍️', letter: 'र', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ल ✍️', letter: 'ल', options: [] },
      { type: 'trace' as any, instruction: 'Trace: व ✍️', letter: 'व', options: [] },
      { type: 'trace' as any, instruction: 'Trace: श ✍️', letter: 'श', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ष ✍️', letter: 'ष', options: [] },
      { type: 'trace' as any, instruction: 'Trace: स ✍️', letter: 'स', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ह ✍️', letter: 'ह', options: [] },
      { type: 'trace' as any, instruction: 'Trace: क्ष ✍️', letter: 'क्ष', options: [] },
      { type: 'trace' as any, instruction: 'Trace: त्र ✍️', letter: 'त्र', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ज्ञ ✍️', letter: 'ज्ञ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: श्र ✍️', letter: 'श्र', options: [] },
      { type: 'garden_repair' as any, instruction: 'Choose the Vyanjan for: कबूतर 🐦', sentence: '___ - कबूतर', options: [{ text: 'क', correct: true }, { text: 'म', correct: false }] }
    ]
  },
  {
    id: 3,
    title: 'वर्ण पहचान 🇮🇳',
    titleEn: 'Letter Identification',
    mascot: '🇮🇳',
    color: 'from-orange-400 to-red-500',
    borderColor: 'border-orange-300',
    questions: [
      { type: 'grid_search' as any, instruction: 'Select all Swar (Vowels)! 🔍', gridItems: [{ text: 'अ', correct: true }, { text: 'इ', correct: true }, { text: 'उ', correct: true }, { text: 'क', correct: false }, { text: 'च', correct: false }, { text: 'म', correct: false }], options: [] },
      { type: 'grid_search' as any, instruction: 'Select all Vyanjan (Consonants)! 🔍', gridItems: [{ text: 'म', correct: true }, { text: 'प', correct: true }, { text: 'ल', correct: true }, { text: 'आ', correct: false }, { text: 'ई', correct: false }, { text: 'ऊ', correct: false }], options: [] }
    ]
  },
  {
    id: 4,
    title: 'वर्ण क्रम 🇮🇳',
    titleEn: 'Letter Order',
    mascot: '🇮🇳',
    color: 'from-orange-400 to-red-500',
    borderColor: 'border-orange-300',
    questions: [
      { type: 'sentence_train' as any, instruction: 'Arrange Swar in correct order! 🚂', words: ['आ', 'अ', 'इ', 'ई'], correctSentence: 'अ आ इ ई', options: [] },
      { type: 'sentence_train' as any, instruction: 'Arrange Vyanjan in correct order! 🚂', words: ['ख', 'क', 'ग', 'घ'], correctSentence: 'क ख ग घ', options: [] }
    ]
  },

  // --- CHAPTER 2: मात्राएँ ---
  {
    id: 5,
    title: 'आ की मात्रा ✏️',
    titleEn: 'Aa Ki Matra',
    mascot: '✏️',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'आ की मात्रा (ा) ✏️', explanation: 'Adding "ा" to a letter creates the "Aa" sound. E.g., क + ा = का, म + ा = मा.', mascot: 'ा', examples: ['का + न = कान 👂', 'हा + थ = हाथ ✋', 'ता + ला = ताला 🔒', 'मा + ला = माला 📿'], options: [] },
      { type: 'garden_repair' as any, instruction: 'What does "कान" mean? 👂', sentence: 'कान means ___', options: [{ text: 'Ear 👂', correct: true }, { text: 'Hand ✋', correct: false }] },
      { type: 'garden_repair' as any, instruction: 'Fill the blank to make AM (Mango)! 🥭', sentence: 'आ___', options: [{ text: 'म', correct: true }, { text: 'न', correct: false }, { text: 'ल', correct: false }] }
    ]
  },
  {
    id: 6,
    title: 'इ की मात्रा ✏️',
    titleEn: 'Short I Ki Matra',
    mascot: '✏️',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'इ की मात्रा (ि) ✏️', explanation: 'The short "i" sound is placed before the letter. E.g. ि + क = कि.', mascot: 'ि', examples: ['कि + ता + ब = किताब 📖', 'दि + न = दिन ☀️', 'पि + न = पिन 📌', 'सि + ता + र = सितार 🎸'], options: [] },
      { type: 'garden_repair' as any, instruction: 'What does "किताब" mean? 📖', sentence: 'किताब is a ___', options: [{ text: 'Book 📖', correct: true }, { text: 'Pin 📌', correct: false }] },
      { type: 'garden_repair' as any, instruction: 'Complete the word: K-I-T-A-B 📖', sentence: 'कि___ब', options: [{ text: 'ता', correct: true }, { text: 'मा', correct: false }, { text: 'का', correct: false }] }
    ]
  },
  {
    id: 7,
    title: 'ई की मात्रा ✏️',
    titleEn: 'Long Ee Ki Matra',
    mascot: '✏️',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'ई की मात्रा (ी) ✏️', explanation: 'The long "ee" sound is placed after the letter. E.g., क + ी = की, ह + ा + थ + ी = हाथी.', mascot: 'ी', examples: ['मछ + ल + ी = मछली 🐟', 'हा + थ + ी = हाथी 🐘', 'चा + ब + ी = चाबी 🔑', 'घ + ड़ + ी = घड़ी ⏰'], options: [] },
      { type: 'garden_repair' as any, instruction: 'Identify the word for Elephant 🐘', sentence: 'हाथी is ___', options: [{ text: 'Elephant 🐘', correct: true }, { text: 'Fish 🐟', correct: false }] }
    ]
  },
  {
    id: 8,
    title: 'उ की मात्रा ✏️',
    titleEn: 'Short U Ki Matra',
    mascot: '✏️',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'उ की मात्रा (ु) ✏️', explanation: 'The short "u" sound is placed under the letter. E.g., क + ु = कु, ग + ु + ल + ा + ब = गुलाब.', mascot: 'ु', examples: ['गु + ला + ब = गुलाब 🌹', 'पु + ल = पुल 🌉', 'ध + नु + ष = धनुष 🏹', 'गु + डि + या = गुड़िया 🪆'], options: [] },
      { type: 'garden_repair' as any, instruction: 'What does "गुलाब" mean? 🌹', sentence: 'गुलाब is a ___', options: [{ text: 'Rose 🌹', correct: true }, { text: 'Bridge 🌉', correct: false }] }
    ]
  },
  {
    id: 9,
    title: 'ऊ की मात्रा ✏️',
    titleEn: 'Long Uu Ki Matra',
    mascot: '✏️',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'ऊ की मात्रा (ू) ✏️', explanation: 'The long "uu" sound is placed under the letter. E.g., फ + ू = फू, फ + ू + ल = फूल.', mascot: 'ू', examples: ['फू + ल = फूल 🌸', 'चू + हा = चूहा 🐭', 'दू + ध = दूध 🥛', 'सूरज = सूरज 🌞'], options: [] },
      { type: 'garden_repair' as any, instruction: 'Choose the word for Flower 🌸', sentence: 'फूल is ___', options: [{ text: 'Flower 🌸', correct: true }, { text: 'Milk 🥛', correct: false }] }
    ]
  },
  {
    id: 10,
    title: 'ए, ऐ, ओ, औ की मात्राएँ ✏️',
    titleEn: 'Combined Matras',
    mascot: '✏️',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'ए, ऐ, ओ, औ की मात्राएँ ✏️', explanation: 'Let us learn upper and double matras: ए (े), ऐ (ै), ओ (ो), औ (ौ). E.g., सेब 🍎, बैल 🐂, मोर 🦚, पौधा 🌱.', mascot: 'े', examples: ['स + े + ब = सेब 🍎', 'म + ो + र = मोर 🦚', 'प + ौ + धा = पौधा 🌱', 'थ + ै + ला = थैला 🛍️'], options: [] },
      { type: 'garden_repair' as any, instruction: 'Identify: मोर 🦚', sentence: 'मोर is ___', options: [{ text: 'Peacock 🦚', correct: true }, { text: 'Apple 🍎', correct: false }] }
    ]
  },

  // --- CHAPTER 3: शब्द निर्माण ---
  {
    id: 11,
    title: 'दो अक्षर वाले शब्द 🧱',
    titleEn: 'Two Letter Words',
    mascot: '🧱',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'Combine घ + र to make: 🏠', sentence: 'घ + र = ___', options: [{ text: 'घर 🏠', correct: true }, { text: 'फल 🍎', correct: false }] },
      { type: 'sentence_train' as any, instruction: 'Build the word: GHAR (Home)! 🏠', words: ['र', 'घ'], correctSentence: 'घ र', options: [] }
    ]
  },
  {
    id: 12,
    title: 'तीन अक्षर वाले शब्द 🧱',
    titleEn: 'Three Letter Words',
    mascot: '🧱',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'Choose the word for Lotus 🪷', sentence: 'कमल is ___', options: [{ text: 'Lotus 🪷', correct: true }, { text: 'Crocodile 🐊', correct: false }] },
      { type: 'sentence_train' as any, instruction: 'Build the word: KAMAL (Lotus)! 🪷', words: ['ल', 'क', 'म'], correctSentence: 'क म ल', options: [] }
    ]
  },
  {
    id: 13,
    title: 'चार अक्षर वाले शब्द 🧱',
    titleEn: 'Four Letter Words',
    mascot: '🧱',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'Choose the word for Flask 🍶', sentence: 'थरमस is ___', options: [{ text: 'Flask 🍶', correct: true }, { text: 'Banyan 🌳', correct: false }] },
      { type: 'sentence_train' as any, instruction: 'Build the word: SHARBAT (Juice)! 🥤', words: ['त', 'ब', 'र', 'श'], correctSentence: 'श र ब त', options: [] }
    ]
  },
  {
    id: 14,
    title: 'समान शब्द 🧱',
    titleEn: 'Rhyming Words',
    mascot: '🧱',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'Which word rhymes with: घर?', sentence: 'घर rhymes with ___', options: [{ text: 'पर', correct: true }, { text: 'मन', correct: false }] }
    ]
  },
  {
    id: 15,
    title: 'शब्द पहचान 🧱',
    titleEn: 'Word Identification',
    mascot: '🧱',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      { type: 'grid_search' as any, instruction: 'Select all two-letter words! 🔍', gridItems: [{ text: 'घर', correct: true }, { text: 'फल', correct: true }, { text: 'जल', correct: true }, { text: 'कमल', correct: false }, { text: 'अचकन', correct: false }], options: [] }
    ]
  },
  {
    id: 16,
    title: 'शब्द निर्माण 🧱',
    titleEn: 'Word Construction',
    mascot: '🧱',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      { type: 'sentence_train' as any, instruction: 'Assemble the letters to build: MATAR 🫛', words: ['र', 'म', 'ट'], correctSentence: 'म ट र', options: [] }
    ]
  },

  // --- CHAPTER 4: शब्द भंडार ---
  {
    id: 17,
    title: 'परिवार के शब्द 🍎',
    titleEn: 'Family Words',
    mascot: '🍎',
    color: 'from-rose-400 to-red-500',
    borderColor: 'border-rose-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'Identify: माता 👩', sentence: 'माता is ___', options: [{ text: 'Mother 👩', correct: true }, { text: 'Father 👨', correct: false }] }
    ]
  },
  {
    id: 18,
    title: 'शरीर के अंग 🍎',
    titleEn: 'Body Parts',
    mascot: '🍎',
    color: 'from-rose-400 to-red-500',
    borderColor: 'border-rose-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'Identify: आँख 👀', sentence: 'आँख is ___', options: [{ text: 'Eye 👀', correct: true }, { text: 'Nose 👃', correct: false }] }
    ]
  },
  {
    id: 19,
    title: 'पशु-पक्षी 🍎',
    titleEn: 'Animals & Birds',
    mascot: '🍎',
    color: 'from-rose-400 to-red-500',
    borderColor: 'border-rose-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'Identify: शेर 🦁', sentence: 'शेर is ___', options: [{ text: 'Lion 🦁', correct: true }, { text: 'Peacock 🦚', correct: false }] }
    ]
  },
  {
    id: 20,
    title: 'फल-सब्जियाँ 🍎',
    titleEn: 'Fruits & Veggies',
    mascot: '🍎',
    color: 'from-rose-400 to-red-500',
    borderColor: 'border-rose-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'Identify: आम 🥭', sentence: 'आम is ___', options: [{ text: 'Mango 🥭', correct: true }, { text: 'Potato 🥔', correct: false }] }
    ]
  },
  {
    id: 21,
    title: 'रंग और वस्तुएँ 🍎',
    titleEn: 'Colors & Objects',
    mascot: '🍎',
    color: 'from-rose-400 to-red-500',
    borderColor: 'border-rose-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'What color is: लाल? 🔴', sentence: 'लाल means ___', options: [{ text: 'Red 🔴', correct: true }, { text: 'Blue 🔵', correct: false }] }
    ]
  },

  // --- CHAPTER 5: व्याकरण ---
  {
    id: 22,
    title: 'संज्ञा 🏫',
    titleEn: 'Nouns',
    mascot: '🏫',
    color: 'from-violet-400 to-purple-500',
    borderColor: 'border-violet-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'संज्ञा (Noun) 🏫', explanation: 'Noun is the name of a person, place, animal, or thing. E.g., राम (person), दिल्ली (place), शेर (animal), कलम (thing).', mascot: '🏫', examples: ['राम - Person', 'किताब - Thing', 'घर - Place', 'कुत्ता - Animal'], options: [] },
      { type: 'grid_search' as any, instruction: 'Select all Nouns (संज्ञा)! 🔍', gridItems: [{ text: 'राम', correct: true }, { text: 'किताब', correct: true }, { text: 'घर', correct: true }, { text: 'दौड़ना', correct: false }, { text: 'खेलना', correct: false }], options: [] }
    ]
  },
  {
    id: 23,
    title: 'क्रिया 🏫',
    titleEn: 'Verbs',
    mascot: '🏫',
    color: 'from-violet-400 to-purple-500',
    borderColor: 'border-violet-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'क्रिया (Verb) 🏃', explanation: 'Verb is an action word. E.g., लिखना (writing), पढ़ना (reading), खेलना (playing), दौड़ना (running).', mascot: '🏃', examples: ['लिखना - Writing', 'पढ़ना - Reading', 'खेलना - Playing'], options: [] },
      { type: 'grid_search' as any, instruction: 'Select all Actions (क्रिया)! 🔍', gridItems: [{ text: 'पढ़ना', correct: true }, { text: 'खेलना', correct: true }, { text: 'दौड़ना', correct: true }, { text: 'पेड़', correct: false }, { text: 'सेब', correct: false }], options: [] }
    ]
  },
  {
    id: 24,
    title: 'एकवचन और बहुवचन 🏫',
    titleEn: 'Singular & Plural',
    mascot: '🏫',
    color: 'from-violet-400 to-purple-500',
    borderColor: 'border-violet-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'What is the plural of: लड़का?', sentence: 'लड़का plural is ___', options: [{ text: 'लड़के', correct: true }, { text: 'ताले', correct: false }] }
    ]
  },
  {
    id: 25,
    title: 'लिंग 🏫',
    titleEn: 'Gender',
    mascot: '🏫',
    color: 'from-violet-400 to-purple-500',
    borderColor: 'border-violet-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'Match masculine & feminine pairs!', sentence: 'लड़का matches with ___', options: [{ text: 'लड़की', correct: true }, { text: 'बहन', correct: false }] }
    ]
  },
  {
    id: 26,
    title: 'शब्द भेद परिचय 🏫',
    titleEn: 'Parts of Speech Intro',
    mascot: '🏫',
    color: 'from-violet-400 to-purple-500',
    borderColor: 'border-violet-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'What is: दौड़ना (running)? 🏃', sentence: 'दौड़ना is a ___', options: [{ text: 'क्रिया (Verb) 🏃', correct: true }, { text: 'संज्ञा (Noun) 🏫', correct: false }] }
    ]
  },

  // --- CHAPTER 6: वाक्य रचना ---
  {
    id: 27,
    title: 'सरल वाक्य 🚂',
    titleEn: 'Simple Sentences',
    mascot: '🚂',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      { type: 'sentence_train' as any, instruction: 'Assemble the sentence! 🚂', words: ['घर', 'चल', 'अब'], correctSentence: 'अब घर चल', options: [] }
    ]
  },
  {
    id: 28,
    title: 'शब्दों से वाक्य बनाना 🚂',
    titleEn: 'Making Sentences',
    mascot: '🚂',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      { type: 'sentence_train' as any, instruction: 'Build sentence: Fruit eat! 🚂', words: ['खा', 'फल', 'अब'], correctSentence: 'अब फल खा', options: [] }
    ]
  },
  {
    id: 29,
    title: 'वाक्य क्रम 🚂',
    titleEn: 'Sentence Ordering',
    mascot: '🚂',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      { type: 'sentence_train' as any, instruction: 'Put in correct order! 🚂', words: ['जा', 'स्कूल', 'रोज'], correctSentence: 'रोज स्कूल जा', options: [] }
    ]
  },
  {
    id: 30,
    title: 'प्रश्न और उत्तर 🚂',
    titleEn: 'Questions & Answers',
    mascot: '🚂',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'Choose the correct answer for: तुम्हारा नाम क्या है?', sentence: 'मेरा नाम ___ है।', options: [{ text: 'राहुल 👦', correct: true }, { text: 'सेब 🍎', correct: false }] }
    ]
  },
  {
    id: 31,
    title: 'छोटा अनुच्छेद 🚂',
    titleEn: 'Short Paragraph',
    mascot: '🚂',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'Fill the blank in paragraph!', sentence: 'यह एक बाग है। यहाँ सुंदर ___ खिले हैं।', options: [{ text: 'फूल 🌸', correct: true }, { text: 'किताब 📖', correct: false }] }
    ]
  },

  // --- CHAPTER 7: पठन कौशल ---
  {
    id: 32,
    title: 'शब्द पढ़ना 📖',
    titleEn: 'Word Reading',
    mascot: '📖',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'Read: कलम 🖊️ What does it mean?', sentence: 'कलम means ___', options: [{ text: 'Pen 🖊️', correct: true }, { text: 'Pot 🪴', correct: false }] }
    ]
  },
  {
    id: 33,
    title: 'वाक्य पढ़ना 📖',
    titleEn: 'Sentence Reading',
    mascot: '📖',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'Read: यह आम है। 🥭 What does it mean?', sentence: 'यह आम है means ___', options: [{ text: 'This is a mango 🥭', correct: true }, { text: 'Ram is reading 📖', correct: false }] }
    ]
  },
  {
    id: 35,
    title: 'छोटी कहानियाँ 📖',
    titleEn: 'Short Stories',
    mascot: '📖',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'प्यासा कौआ 🐦', explanation: 'एक कौआ बहुत प्यासा था। उसे एक घड़ा मिला। घड़े में पानी बहुत नीचे था। उसने घड़े में कंकड़ डाले। पानी ऊपर आ गया। कौए ने पानी पिया और उड़ गया!', mascot: '🐦', examples: ['कौआ - Crow', 'पानी - Water', 'घड़ा - Pot'], options: [] },
      { type: 'garden_repair' as any, instruction: 'Based on story, what did the crow drop in the pot?', sentence: 'कौए ने घड़े में ___ डाले।', options: [{ text: 'कंकड़ (Pebbles)', correct: true }, { text: 'पत्ते (Leaves)', correct: false }] }
    ]
  },
  {
    id: 36,
    title: 'कविता पठन 📖',
    titleEn: 'Poem Reading',
    mascot: '📖',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      { type: 'learn_card' as any, conceptTitle: 'चंदा मामा 🌙', explanation: 'चंदा मामा दूर के, पुए पकाएँ बूर के। आप खाएँ थाली में, मुन्ने को दें प्याली में!', mascot: '🌙', examples: ['चंदा मामा - Moon', 'प्याली - Cup', 'थाली - Plate'], options: [] },
      { type: 'garden_repair' as any, instruction: 'Where does munna get the sweet?', sentence: 'मुन्ने को दें ___ में।', options: [{ text: 'प्याली (Cup)', correct: true }, { text: 'हाथ (Hand)', correct: false }] }
    ]
  },
  {
    id: 37,
    title: 'समझ आधारित प्रश्न 📖',
    titleEn: 'Comprehension',
    mascot: '📖',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'Read: राम आम खाता है। Who eats mango?', sentence: '___ आम खाता है।', options: [{ text: 'राम', correct: true }, { text: 'मोहन', correct: false }] }
    ]
  },

  // --- CHAPTER 8: लेखन कौशल ---
  {
    id: 38,
    title: 'अक्षर लेखन ✍️',
    titleEn: 'Letter Writing',
    mascot: '✍️',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      { type: 'trace' as any, instruction: 'Trace the letter: ग ✍️', letter: 'ग', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: घ ✍️', letter: 'घ', options: [] }
    ]
  },
  {
    id: 39,
    title: 'शब्द लेखन ✍️',
    titleEn: 'Word Writing',
    mascot: '✍️',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Complete the word for Home: GH_R 🏠', sentence: 'घ_र', options: [{ text: 'र', correct: true }, { text: 'ल', correct: false }] }
    ]
  },
  {
    id: 40,
    title: 'खाली स्थान भरना ✍️',
    titleEn: 'Fill in the Blanks',
    mascot: '✍️',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'Fill with correct letter: फ___', sentence: 'यह ___ है। (Fruit)', options: [{ text: 'फल 🍎', correct: true }, { text: 'घर 🏠', correct: false }] }
    ]
  },
  {
    id: 41,
    title: 'वाक्य लेखन ✍️',
    titleEn: 'Sentence Writing',
    mascot: '✍️',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      { type: 'writing_lab' as any, subType: 'complete', instruction: 'Complete the sentence: Ram is writing.', sentence: 'राम ___ रहा है।', options: [{ text: 'लिख', correct: true }, { text: 'खा', correct: false }] }
    ]
  },
  {
    id: 42,
    title: 'चित्र आधारित लेखन ✍️',
    titleEn: 'Picture Writing',
    mascot: '✍️',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'Look at the picture: 🥭 What is it?', sentence: 'यह एक ___ है।', options: [{ text: 'आम 🥭', correct: true }, { text: 'सेब 🍎', correct: false }] }
    ]
  },

  // --- CHAPTER 9: पुनरावृत्ति और भाषा खेल ---
  {
    id: 43,
    title: 'अक्षर अभ्यास 🎯',
    titleEn: 'Letter Game',
    mascot: '🎯',
    color: 'from-purple-400 to-indigo-500',
    borderColor: 'border-purple-300',
    questions: [
      { type: 'grid_search' as any, instruction: 'Select all letters that make the /ka/ sound! 🔍', gridItems: [{ text: 'क', correct: true }, { text: 'का', correct: true }, { text: 'को', correct: true }, { text: 'म', correct: false }, { text: 'प', correct: false }], options: [] }
    ]
  },
  {
    id: 44,
    title: 'शब्द अभ्यास 🎯',
    titleEn: 'Word Game',
    mascot: '🎯',
    color: 'from-purple-400 to-indigo-500',
    borderColor: 'border-purple-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'Select the matching word for: आम 🥭', sentence: 'आम = ___', options: [{ text: 'आम 🥭', correct: true }, { text: 'घर 🏠', correct: false }] }
    ]
  },
  {
    id: 45,
    title: 'वाक्य अभ्यास 🎯',
    titleEn: 'Sentence Game',
    mascot: '🎯',
    color: 'from-purple-400 to-indigo-500',
    borderColor: 'border-purple-300',
    questions: [
      { type: 'sentence_train' as any, instruction: 'Assemble: Water drink! 🚂', words: ['पी', 'पानी', 'अब'], correctSentence: 'अब पानी पी', options: [] }
    ]
  },
  {
    id: 46,
    title: 'कहानी अभ्यास 🎯',
    titleEn: 'Story Game',
    mascot: '🎯',
    color: 'from-purple-400 to-indigo-500',
    borderColor: 'border-purple-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'Who flew away at the end of the story?', sentence: '___ उड़ गया।', options: [{ text: 'कौआ 🐦', correct: true }, { text: 'हाथी 🐘', correct: false }] }
    ]
  }

];
