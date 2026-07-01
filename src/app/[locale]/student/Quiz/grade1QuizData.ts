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
  {
    id: 1,
    title: 'Number World 🔢',
    titleEn: 'Number World',
    mascot: '🔢',
    color: 'from-blue-400 to-indigo-500',
    borderColor: 'border-blue-300',
    questions: [
      {
        type: 'choice' as any,
        instruction: 'Number Builder: What number is: 3 Hundreds + 4 Tens + 5 Ones? 🧱',
        options: [
          { text: '345', correct: true },
          { text: '543', correct: false },
          { text: '354', correct: false }
        ]
      },
      {
        type: 'order' as any,
        instruction: 'Number Order: Sort the numbers from Smallest to Largest! 📈',
        options: [
          { text: '124 ➔ 245 ➔ 356', correct: true },
          { text: '356 ➔ 245 ➔ 124', correct: false },
          { text: '245 ➔ 124 ➔ 356', correct: false }
        ]
      },
      {
        type: 'garden_repair' as any,
        instruction: 'Missing Number: Complete the number path! 🛣️',
        sentence: '120 ➔ _____ ➔ 122',
        options: [
          { text: '121', correct: true },
          { text: '123', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Expanded Form: Choose the correct expansion for 325! 🧮',
        options: [
          { text: '300 + 20 + 5', correct: true },
          { text: '30 + 20 + 5', correct: false },
          { text: '300 + 2 + 5', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Number Comparison: Choose the correct relationship: 245 ___ 254 ⚖️',
        options: [
          { text: '245 is Less Than (<) 254', correct: true },
          { text: '245 is Greater Than (>) 254', correct: false },
          { text: '245 is Equal to (=) 254', correct: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Addition Mission ➕',
    titleEn: 'Addition Mission',
    mascot: '➕',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'choice' as any,
        instruction: 'Vertical Addition: Solve 24 + 15! 🧮',
        options: [
          { text: '39', correct: true },
          { text: '29', correct: false },
          { text: '49', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Carry Addition: Solve 38 + 27! 💥',
        options: [
          { text: '65', correct: true },
          { text: '55', correct: false },
          { text: '61', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Number Line: Start at 15 and jump 6 steps forward. Where do you land? 🏃‍♂️',
        options: [
          { text: '21', correct: true },
          { text: '20', correct: false },
          { text: '22', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Picture Addition: Combine 🍎🍎 + 🍎🍎🍎! What is the total? 🍎',
        options: [
          { text: '5', correct: true },
          { text: '4', correct: false },
          { text: '6', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Word Problem: Ravi has 12 balls. He gets 5 more. How many balls does he have in total? ⚽',
        options: [
          { text: '17 balls', correct: true },
          { text: '15 balls', correct: false },
          { text: '12 balls', correct: false }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Subtraction Mission ➖',
    titleEn: 'Subtraction Mission',
    mascot: '➖',
    color: 'from-orange-400 to-amber-500',
    borderColor: 'border-orange-300',
    questions: [
      {
        type: 'choice' as any,
        instruction: 'Take Away: You have 10 toys. Remove 4 toys. How many are left? 🧸',
        options: [
          { text: '6 toys', correct: true },
          { text: '4 toys', correct: false },
          { text: '5 toys', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Subtraction Builder: Solve 45 - 12! ➖',
        options: [
          { text: '33', correct: true },
          { text: '35', correct: false },
          { text: '23', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Borrowing Subtraction: Solve 52 - 28! 💥',
        options: [
          { text: '24', correct: true },
          { text: '34', correct: false },
          { text: '26', correct: false }
        ]
      },
      {
        type: 'garden_repair' as any,
        instruction: 'Missing Number: Find the missing subtractor! 🧩',
        sentence: '18 - _____ = 10',
        options: [
          { text: '8', correct: true },
          { text: '10', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Story Problem: There are 15 birds on a tree. 5 birds fly away. How many birds are left on the tree? 🐦',
        options: [
          { text: '10 birds', correct: true },
          { text: '8 birds', correct: false },
          { text: '12 birds', correct: false }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Multiplication + Patterns ✖️',
    titleEn: 'Multiplication + Patterns',
    mascot: '✖️',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      {
        type: 'choice' as any,
        instruction: 'Group Builder: What is the total of 3 groups with 2 objects in each group? 📦',
        options: [
          { text: '6 objects', correct: true },
          { text: '5 objects', correct: false },
          { text: '8 objects', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Repeated Addition: Convert 2 + 2 + 2 into a multiplication group sentence! 🔄',
        options: [
          { text: '3 × 2', correct: true },
          { text: '2 × 2', correct: false },
          { text: '3 × 3', correct: false }
        ]
      },
      {
        type: 'garden_repair' as any,
        instruction: 'Skip Counting: Complete the skip counting pattern! 🦘',
        sentence: '5, 10, 15, _____',
        options: [
          { text: '20', correct: true },
          { text: '25', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Table Builder: Solve 2 × 3! ✖️',
        options: [
          { text: '6', correct: true },
          { text: '5', correct: false },
          { text: '8', correct: false }
        ]
      },
      {
        type: 'garden_repair' as any,
        instruction: 'Number Pattern: Complete the pattern! 🧠',
        sentence: '2, 4, 6, _____',
        options: [
          { text: '8', correct: true },
          { text: '10', correct: false }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Shapes + Measurement 📏',
    titleEn: 'Shapes + Measurement',
    mascot: '📏',
    color: 'from-amber-400 to-yellow-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'choice' as any,
        instruction: 'Shape Builder: What object can you build using a circle, a square, and a triangle? 🏠',
        options: [
          { text: 'A Toy House 🏠', correct: true },
          { text: 'A Ball ⚽', correct: false }
        ]
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Shape Sort: Connect the shape to its dimension! 📦',
        pairs: [
          { left: 'Circle', right: 'Circle ➔ 2D Shape' },
          { left: 'Sphere', right: 'Sphere ➔ 3D Shape' },
          { left: 'Triangle', right: 'Triangle ➔ 2D Shape' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Measurement Match: Connect objects to their measurement types! ⚖️',
        pairs: [
          { left: 'Elephant', right: 'Heavy object' },
          { left: 'Feather', right: 'Light object' },
          { left: 'Ruler', right: 'Long object' }
        ],
        options: []
      },
      {
        type: 'order' as any,
        instruction: 'Time Routine: Sort the daily intervals in correct order! 🌅',
        options: [
          { text: 'Morning ➔ Afternoon ➔ Night', correct: true },
          { text: 'Night ➔ Afternoon ➔ Morning', correct: false },
          { text: 'Afternoon ➔ Morning ➔ Night', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Clock Reading: What time does the clock show when the small hand points to 3 and the big hand points to 12? 🕒',
        options: [
          { text: "3 o'clock 🕒", correct: true },
          { text: "12 o'clock 🕛", correct: false },
          { text: "6 o'clock 🕕", correct: false }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'Money + Data Logic 💰',
    titleEn: 'Money + Data Logic',
    mascot: '💰',
    color: 'from-purple-400 to-violet-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'choice' as any,
        instruction: 'Money Builder: How can you build ₹10 using two coins? 🪙',
        options: [
          { text: '₹5 coin + ₹5 coin', correct: true },
          { text: '₹2 coin + ₹2 coin', correct: false },
          { text: '₹5 coin + ₹2 coin', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Shopping Challenge: You buy an item for ₹15. Which cash bills can you pay with? 💸',
        options: [
          { text: '₹10 note + ₹5 coin', correct: true },
          { text: '₹10 note + ₹10 note', correct: false },
          { text: '₹5 coin + ₹2 coin', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Data Reading: A picture graph shows: Apples (5 pictures), Oranges (3 pictures). Which fruit has more? 📊',
        options: [
          { text: 'Apples', correct: true },
          { text: 'Oranges', correct: false }
        ]
      },
      {
        type: 'order' as any,
        instruction: 'Logic Sort: Sort these numbers from smallest to largest! 📊',
        options: [
          { text: '5 ➔ 15 ➔ 25', correct: true },
          { text: '25 ➔ 15 ➔ 5', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Maths Capstone: Solve the mixed puzzle: (10 + 5) - 3 = ___? 🧠',
        options: [
          { text: '12', correct: true },
          { text: '15', correct: false },
          { text: '10', correct: false }
        ]
      }
    ]
  }
];
export const GRADE1_EVS_LEVELS: Level[] = [
  {
    id: 1,
    title: 'Myself & My Body 🧒',
    titleEn: 'Myself & My Body',
    mascot: '🧒',
    color: 'from-emerald-400 to-green-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Body Parts: Connect body parts to their correct functions! 👁️',
        pairs: [
          { left: 'Eye', right: 'Eye sees 👁️' },
          { left: 'Ear', right: 'Ear hears 👂' },
          { left: 'Nose', right: 'Nose smells 👃' }
        ],
        options: []
      },
      {
        type: 'choice' as any,
        instruction: 'Sense Organs: Which organ do we use to taste sweet ice cream? 👅',
        options: [
          { text: 'Tongue 👅', correct: true },
          { text: 'Nose 👃', correct: false },
          { text: 'Skin 🖐️', correct: false }
        ]
      },
      {
        type: 'order' as any,
        instruction: 'Healthy Habits: Sort the morning tasks in correct order! ⏰',
        options: [
          { text: 'Brush teeth ➔ Take bath ➔ Eat breakfast ➔ Go to school', correct: true },
          { text: 'Go to school ➔ Eat breakfast ➔ Take bath ➔ Brush teeth', correct: false }
        ]
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Habits Sort: Classify these habits correctly! 🧼',
        pairs: [
          { left: 'Washing hands', right: 'Clean hand habit 🧼' },
          { left: 'Biting nails', right: 'Unclean nail habit 💅' },
          { left: 'Brushing twice', right: 'Clean teeth habit 🪥' }
        ],
        options: []
      },
      {
        type: 'order' as any,
        instruction: 'Daily Routine: Sort the daily intervals in correct order! 🌅',
        options: [
          { text: 'Morning ➔ Afternoon ➔ Night', correct: true },
          { text: 'Night ➔ Afternoon ➔ Morning', correct: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Family & Food 👨‍👩‍👧',
    titleEn: 'Family & Food',
    mascot: '👨‍👩‍👧',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'choice' as any,
        instruction: "Family Relations: Who is your father's mother? 👵",
        options: [
          { text: 'Grandmother 👵', correct: true },
          { text: 'Aunt 👩', correct: false },
          { text: 'Sister 👧', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Helping Hands: Choose the best action to help your parents at home! 🚿',
        options: [
          { text: 'Watering the plants 🚿', correct: true },
          { text: 'Leaving toys on the floor 🧸', correct: false },
          { text: 'Watching TV all day 📺', correct: false }
        ]
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Food Sort: Connect items to their correct food groups! 🍎',
        pairs: [
          { left: 'Apple', right: 'Apple is a Fruit 🍎' },
          { left: 'Carrot', right: 'Carrot is a Vegetable 🥕' },
          { left: 'Milk', right: 'Milk is a Healthy Drink 🥛' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Food Sources: Connect food items to their correct sources! 🥛',
        pairs: [
          { left: 'Milk', right: 'Milk from Cow 🐄' },
          { left: 'Rice', right: 'Rice from Plant 🌾' },
          { left: 'Egg', right: 'Egg from Hen 🐔' }
        ],
        options: []
      },
      {
        type: 'choice' as any,
        instruction: 'Healthy Plate: Which combination makes a healthy balanced plate? 🥗',
        options: [
          { text: 'Grains, vegetables & fruits 🥗', correct: true },
          { text: 'Chocolates, chips & soda 🍫', correct: false }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Plant & Animal World 🌱',
    titleEn: 'Plant & Animal World',
    mascot: '🌱',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Plant Parts: Connect plant parts to their descriptions! 🍃',
        pairs: [
          { left: 'Leaf', right: 'Green food factory leaf 🍃' },
          { left: 'Root', right: 'Under soil water root 🪵' },
          { left: 'Flower', right: 'Colorful seed creator flower 🌸' }
        ],
        options: []
      },
      {
        type: 'choice' as any,
        instruction: 'Plant Needs: What are the three essential things plants need to grow? ☀️💧💨',
        options: [
          { text: 'Water + Sunlight + Air ☀️💧💨', correct: true },
          { text: 'Soda + Toys + Shadow 🥤🧸🕶️', correct: false }
        ]
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Animal Homes: Connect the animal to its home! 🦁',
        pairs: [
          { left: 'Lion', right: 'Lion lives in Den 🦁' },
          { left: 'Bird', right: 'Bird lives in Nest 🪹' },
          { left: 'Horse', right: 'Horse lives in Stable 🐎' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Animal Types: Classify these animals! 🐅',
        pairs: [
          { left: 'Tiger', right: 'Tiger is Wild 🐅' },
          { left: 'Cow', right: 'Cow is Domestic 🐄' },
          { left: 'Elephant', right: 'Elephant is Wild 🐘' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Animal Food: Connect the animal to the food it loves! 🥕',
        pairs: [
          { left: 'Rabbit', right: 'Rabbit eats Carrot 🥕' },
          { left: 'Frog', right: 'Frog eats Insect 🪰' },
          { left: 'Lion', right: 'Lion eats Meat 🥩' }
        ],
        options: []
      }
    ]
  },
  {
    id: 4,
    title: 'Environment 🌍',
    titleEn: 'Environment',
    mascot: '🌍',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Living & Non-Living: Classify these objects! 🐶',
        pairs: [
          { left: 'Puppy', right: 'Puppy is Living 🐶' },
          { left: 'Stone', right: 'Stone is Non-Living 🪨' },
          { left: 'Tree', right: 'Tree is Living 🌳' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Weather Match: Connect clues to the correct weather! ☀️',
        pairs: [
          { left: 'Sun ☀️', right: 'Sunny hot day ☀️' },
          { left: 'Rain 🌧️', right: 'Rainy wet day 🌧️' },
          { left: 'Snow ❄️', right: 'Snowy cold day ❄️' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Water Conservation: Classify the water actions! 🚰',
        pairs: [
          { left: 'Drinking', right: 'Good drinking use 🚰' },
          { left: 'Leaving tap open', right: 'Wasting water tap 🚱' },
          { left: 'Watering plants', right: 'Good garden use 🪴' }
        ],
        options: []
      },
      {
        type: 'choice' as any,
        instruction: 'Save Earth: Which action is best for saving our planet Earth? 🌳',
        options: [
          { text: 'Planting trees 🌳', correct: true },
          { text: 'Throwing plastic in rivers 🌊', correct: false }
        ]
      },
      {
        type: 'order' as any,
        instruction: 'Life Cycles: Sort the growth stages of a tree correctly! 🌱',
        options: [
          { text: 'Seed ➔ Plant ➔ Tree', correct: true },
          { text: 'Tree ➔ Plant ➔ Seed', correct: false }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Transport & Community 🚗',
    titleEn: 'Transport & Community',
    mascot: '🚗',
    color: 'from-violet-400 to-indigo-500',
    borderColor: 'border-violet-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Transport Sort: Connect vehicles to their routes! ✈️',
        pairs: [
          { left: 'Car', right: 'Car runs on Land 🚗' },
          { left: 'Ship', right: 'Ship sails in Water 🚢' },
          { left: 'Airplane', right: 'Airplane flies in Air ✈️' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Vehicles: Connect vehicles to their paths! 🚂',
        pairs: [
          { left: 'Train', right: 'Train runs on Track 🚂' },
          { left: 'Boat', right: 'Boat sails on Water ⛵' },
          { left: 'Bus', right: 'Bus runs on Road 🚌' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Community Helpers: Connect helper to their place of work! 🩺',
        pairs: [
          { left: 'Doctor', right: 'Doctor at Hospital 🏥' },
          { left: 'Teacher', right: 'Teacher at School 🏫' },
          { left: 'Firefighter', right: 'Firefighter at Station 🚒' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Places: Match activities to correct places! 🏫',
        pairs: [
          { left: 'Play', right: 'Play at Park 🛝' },
          { left: 'Study', right: 'Study at School 🏫' },
          { left: 'Get medicine', right: 'Medicine at Hospital 🏥' }
        ],
        options: []
      },
      {
        type: 'order' as any,
        instruction: 'Road Safety: Sort road crossing steps correctly! 🚦',
        options: [
          { text: 'Stop ➔ Look left & right ➔ Cross when safe', correct: true },
          { text: 'Cross directly ➔ Look left & right ➔ Stop', correct: false }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'World Around Us 🧠',
    titleEn: 'World Around Us',
    mascot: '🧠',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Seasons Clothing: Connect clothes to seasons! 🧣',
        pairs: [
          { left: 'Cotton shirts', right: 'Summer Season ☀️' },
          { left: 'Raincoats', right: 'Rainy Season 🌧️' },
          { left: 'Sweaters', right: 'Winter Season ❄️' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Day & Night: Connect activities to correct times! 🌓',
        pairs: [
          { left: 'See sun', right: 'Day time activity ☀️' },
          { left: 'See stars', right: 'Night time activity 🌙' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Festivals: Match festivals to items! 🪔',
        pairs: [
          { left: 'Diwali', right: 'Festival of Lights 🪔' },
          { left: 'Christmas', right: 'Festival of Trees 🎄' },
          { left: 'Eid', right: 'Festival of Moon 🌙' }
        ],
        options: []
      },
      {
        type: 'choice' as any,
        instruction: 'Clean Environment: Choose the best action to keep our surroundings clean! 🗑️',
        options: [
          { text: 'Throw trash in dustbin 🗑️', correct: true },
          { text: 'Throw trash on road 🚮', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Safety First: What should you wear to keep yourself safe when riding a bicycle? 🪖',
        options: [
          { text: 'A Helmet 🪖', correct: true },
          { text: 'Sunglasses 🕶️', correct: false }
        ]
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
  {
    id: 1,
    title: 'Myself & My World 🧒',
    titleEn: 'Myself & My World',
    mascot: '🧒',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Identity Match: Connect each ID detail to what it means! 🪪',
        pairs: [
          { left: 'Name', right: 'Name tells who you are 📛' },
          { left: 'Age', right: 'Age tells how old you are 🎂' },
          { left: 'School', right: 'School is where you study 🏫' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Body Awareness: Connect body part to its correct use! 💪',
        pairs: [
          { left: 'Eyes', right: 'Eyes see 👁️' },
          { left: 'Legs', right: 'Legs walk 🦵' },
          { left: 'Hands', right: 'Hands touch 🤚' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Healthy Life Sort: Classify these habits correctly! 🪥',
        pairs: [
          { left: 'Brushing teeth', right: 'Brushing is Good habit 🪥' },
          { left: 'Skipping breakfast', right: 'Skipping food is Bad habit 🚫' },
          { left: 'Playing outside', right: 'Playing is Good habit 🏃' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'My Places: Match the activity to the correct place! 🏡',
        pairs: [
          { left: 'Sleep', right: 'Sleep happens at Home 🏡' },
          { left: 'Study', right: 'Study happens at School 🏫' },
          { left: 'Play swings', right: 'Play happens at Park 🛝' }
        ],
        options: []
      },
      {
        type: 'order' as any,
        instruction: 'Daily Routine: Sort your daily activities in correct order! ⏰',
        options: [
          { text: 'Wake up ➔ School ➔ Play ➔ Sleep', correct: true },
          { text: 'Sleep ➔ Play ➔ School ➔ Wake up', correct: false },
          { text: 'School ➔ Wake up ➔ Sleep ➔ Play', correct: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'India Explorer 🇮🇳',
    titleEn: 'India Explorer',
    mascot: '🇮🇳',
    color: 'from-orange-400 to-amber-500',
    borderColor: 'border-orange-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'National Symbols: Match India\'s symbols to their names! 🏅',
        pairs: [
          { left: 'National Animal 🐅', right: 'Tiger is National Animal 🐅' },
          { left: 'National Bird 🦚', right: 'Peacock is National Bird 🦚' },
          { left: 'National Flower 🌸', right: 'Lotus is National Flower 🌸' }
        ],
        options: []
      },
      {
        type: 'choice' as any,
        instruction: 'India Map: What is the capital city of India? 🏛️',
        options: [
          { text: 'New Delhi 🏛️', correct: true },
          { text: 'Mumbai 🌆', correct: false },
          { text: 'Chennai 🏖️', correct: false }
        ]
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'National Days: Match the date to the correct national day! 🗓️',
        pairs: [
          { left: '15th August', right: 'Independence Day 🇮🇳' },
          { left: '26th January', right: 'Republic Day 🏛️' },
          { left: '2nd October', right: 'Gandhi Jayanti 👓' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Festivals: Match the Indian festival to its symbol! 🎆',
        pairs: [
          { left: 'Diwali', right: 'Diwali has Diyas 🪔' },
          { left: 'Holi', right: 'Holi has Colors 🎨' },
          { left: 'Eid', right: 'Eid has Crescent Moon 🌙' }
        ],
        options: []
      },
      {
        type: 'choice' as any,
        instruction: 'Famous Places: Where is the Taj Mahal located? 🕌',
        options: [
          { text: 'Agra, Uttar Pradesh 🕌', correct: true },
          { text: 'Jaipur, Rajasthan 🏯', correct: false },
          { text: 'Mumbai, Maharashtra 🌆', correct: false }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Animal & Nature World 🐾',
    titleEn: 'Animal & Nature World',
    mascot: '🐾',
    color: 'from-lime-400 to-green-500',
    borderColor: 'border-lime-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Animal Types: Classify these animals correctly! 🦁',
        pairs: [
          { left: 'Lion', right: 'Lion is Wild 🦁' },
          { left: 'Cow', right: 'Cow is Domestic 🐄' },
          { left: 'Parrot', right: 'Parrot is Domestic/Pet 🦜' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Animal Homes: Connect each animal to its home! 🪹',
        pairs: [
          { left: 'Bird', right: 'Bird lives in Nest 🪹' },
          { left: 'Bee', right: 'Bee lives in Hive 🍯' },
          { left: 'Fish', right: 'Fish lives in Water 🌊' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Animal Food: Connect animals to what they eat! 🥩',
        pairs: [
          { left: 'Cow', right: 'Cow eats Grass 🌿' },
          { left: 'Cat', right: 'Cat eats Fish 🐟' },
          { left: 'Lion', right: 'Lion eats Meat 🥩' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Living & Non-Living: Classify these things correctly! 🌳',
        pairs: [
          { left: 'Mango tree', right: 'Mango tree is Living 🌳' },
          { left: 'Iron chair', right: 'Iron chair is Non-Living 🪑' },
          { left: 'Butterfly', right: 'Butterfly is Living 🦋' }
        ],
        options: []
      },
      {
        type: 'order' as any,
        instruction: 'Plant Growth: Sort the growth stages in correct order! 🌱',
        options: [
          { text: 'Seed ➔ Plant ➔ Flower', correct: true },
          { text: 'Flower ➔ Plant ➔ Seed', correct: false },
          { text: 'Plant ➔ Flower ➔ Seed', correct: false }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Science Around Us 🔬',
    titleEn: 'Science Around Us',
    mascot: '🔬',
    color: 'from-teal-400 to-cyan-500',
    borderColor: 'border-teal-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Five Senses: Connect the sense to the organ that helps! 👁️',
        pairs: [
          { left: 'See', right: 'See with Eyes 👁️' },
          { left: 'Hear', right: 'Hear with Ears 👂' },
          { left: 'Smell', right: 'Smell with Nose 👃' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Weather Match: Connect weather clues to correct weather type! ☀️',
        pairs: [
          { left: 'Hot & bright ☀️', right: 'Sunny day ☀️' },
          { left: 'Drops falling 🌧️', right: 'Rainy day 🌧️' },
          { left: 'Dark clouds 🌩️', right: 'Cloudy day ⛅' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Day & Night: Connect activities to the correct time! 🌓',
        pairs: [
          { left: 'Going to school', right: 'School happens in Day ☀️' },
          { left: 'Looking at stars', right: 'Stars seen at Night 🌙' },
          { left: 'Eating dinner', right: 'Dinner is at Night 🌙' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Materials: Connect objects to the material they are made of! 🪵',
        pairs: [
          { left: 'Chair', right: 'Chair made of Wood 🪵' },
          { left: 'Spoon', right: 'Spoon made of Metal 🥄' },
          { left: 'Bottle cap', right: 'Cap made of Plastic 🍶' }
        ],
        options: []
      },
      {
        type: 'choice' as any,
        instruction: 'Light & Shadow: Which condition creates a shadow behind you? 🌞',
        options: [
          { text: 'When sunlight is in front of you ☀️', correct: true },
          { text: 'When it is dark at night 🌙', correct: false }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Community & Safety 🚦',
    titleEn: 'Community & Safety',
    mascot: '🚦',
    color: 'from-rose-400 to-pink-500',
    borderColor: 'border-rose-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Community Helpers: Connect the helper to their work! 🩺',
        pairs: [
          { left: 'Doctor', right: 'Doctor treats patients 🩺' },
          { left: 'Police', right: 'Police keeps order 👮' },
          { left: 'Farmer', right: 'Farmer grows food 🌾' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Transport Routes: Connect each vehicle to its route! ✈️',
        pairs: [
          { left: 'Car', right: 'Car goes on Land 🚗' },
          { left: 'Boat', right: 'Boat goes on Water ⛵' },
          { left: 'Airplane', right: 'Airplane flies in Air ✈️' }
        ],
        options: []
      },
      {
        type: 'order' as any,
        instruction: 'Road Safety: Sort road crossing steps in correct order! 🚦',
        options: [
          { text: 'Stop ➔ Look both sides ➔ Cross safely', correct: true },
          { text: 'Cross directly ➔ Look both sides ➔ Stop', correct: false }
        ]
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Emergency Awareness: Match emergency to the correct station! 🚒',
        pairs: [
          { left: 'Fire 🔥', right: 'Fire goes to Fire Station 🚒' },
          { left: 'Sick person 🤒', right: 'Sick goes to Hospital 🏥' },
          { left: 'Crime 🚨', right: 'Crime goes to Police Station 👮' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Public Places: Connect each place to its purpose! 🏫',
        pairs: [
          { left: 'Library', right: 'Library is for Reading 📚' },
          { left: 'Market', right: 'Market is for Shopping 🛒' },
          { left: 'Hospital', right: 'Hospital is for Treatment 🏥' }
        ],
        options: []
      }
    ]
  },
  {
    id: 6,
    title: 'Brain Challenge 🧠',
    titleEn: 'Brain Challenge',
    mascot: '🧠',
    color: 'from-purple-400 to-indigo-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'choice' as any,
        instruction: 'Odd One Out: Which one does NOT belong with the others? 🚫',
        options: [
          { text: 'Sun (not a planet) 🌞', correct: true },
          { text: 'Mars 🔴', correct: false },
          { text: 'Earth 🌍', correct: false }
        ]
      },
      {
        type: 'order' as any,
        instruction: 'Pattern Complete: What comes next: Square, Circle, Square, Circle, ___? 🔷',
        options: [
          { text: 'Square ➔ Circle ➔ Square ➔ Circle ➔ Square', correct: true },
          { text: 'Square ➔ Circle ➔ Square ➔ Circle ➔ Triangle', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Memory Mission: Apple, Mango, Banana were on the list. Which fruit is missing? 🍌',
        options: [
          { text: 'Banana 🍌', correct: true },
          { text: 'Orange 🍊', correct: false }
        ]
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Classification Puzzle: Sort these mixed objects to their correct groups! 🗂️',
        pairs: [
          { left: 'Rose', right: 'Rose is a Flower 🌹' },
          { left: 'Eagle', right: 'Eagle is a Bird 🦅' },
          { left: 'River', right: 'River is Water body 🌊' }
        ],
        options: []
      },
      {
        type: 'choice' as any,
        instruction: 'Final GK Mission: Which of these actions is MOST helpful for our country? 🌟',
        options: [
          { text: 'Planting trees & keeping India clean 🌳', correct: true },
          { text: 'Littering in public places 🚮', correct: false }
        ]
      }
    ]
  }
];
export const GRADE1_HINDI_LEVELS: Level[] = [
  {
    id: 1,
    title: 'वर्ण & मात्राएँ Mission 🔤',
    titleEn: 'Letters & Matras',
    mascot: '🔤',
    color: 'from-orange-400 to-amber-500',
    borderColor: 'border-orange-300',
    questions: [
      {
        type: 'order' as any,
        instruction: 'Alphabetical Order: Sort these letters correctly! 🔤',
        instructionTa: 'वर्ण क्रम: अक्षरों को सही क्रम में व्यवस्थित करें! 🔤',
        options: [
          { text: 'अ ➔ आ ➔ इ ➔ ई', correct: true },
          { text: 'ई ➔ इ ➔ आ ➔ अ', correct: false },
          { text: 'आ ➔ अ ➔ ई ➔ इ', correct: false }
        ]
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Sort Vowels & Consonants! 🏷️',
        instructionTa: 'स्वर / व्यंजन वर्गीकरण! 🏷️',
        pairs: [
          { left: 'अ', right: 'अ एक स्वर है 🎙️' },
          { left: 'क', right: 'क एक व्यंजन है 🎙️' },
          { left: 'इ', right: 'इ एक स्वर है 🎙️' }
        ],
        options: []
      },
      {
        type: 'choice' as any,
        instruction: 'Matra Builder: Complete spelling for KA! ✏️',
        instructionTa: 'मात्रा चयन: सही मात्रा चुनकर शब्द पूरा करें! ✏️',
        options: [
          { text: 'का', correct: true },
          { text: 'कि', correct: false },
          { text: 'कु', correct: false }
        ]
      },
      {
        type: 'garden_repair' as any,
        instruction: 'Missing Letter: Fill the missing letter for Garm! ☀️',
        instructionTa: 'विடுபட்ட எழுத்து: गरम शब्द को पूरा करने के लिए सही अक्षर चुनें! ☀️',
        sentence: 'ग _____ म',
        options: [
          { text: 'र', correct: true },
          { text: 'क', correct: false }
        ]
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Letters & Pictures: Connect letter to correct picture! 🖼️',
        instructionTa: 'वर्ण चित्र मिलान: अक्षर को सही चित्र से मिलाएँ! 🖼️',
        pairs: [
          { left: 'आ', right: 'आ से आम 🥭' },
          { left: 'इ', right: 'इ से इमली 🍇' },
          { left: 'उ', right: 'उ से उल्लू 🦉' }
        ],
        options: []
      }
    ]
  },
  {
    id: 2,
    title: 'शब्द निर्माण 🌱',
    titleEn: 'Word Builder',
    mascot: '🌱',
    color: 'from-emerald-400 to-green-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'sentence_train' as any,
        instruction: 'Word Builder: Arrange the letters to build: कमल 🌸',
        instructionTa: 'शब्द निर्माण: अक्षरों को मिलाकर शब्द बनाएँ: कमल 🌸',
        words: ['क', 'म', 'ल'],
        correctSentence: 'कमल',
        options: []
      },
      {
        type: 'garden_repair' as any,
        instruction: 'Missing Letter: Find the missing letter for fruit (फल) 🍏',
        instructionTa: 'विடுபட்ட சொல்: फल शब्द का छूटा हुआ अक्षर चुनें 🍏',
        sentence: 'फ _____ ल',
        options: [
          { text: 'ल', correct: true },
          { text: 'क', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Picture Word Match: Choose the correct word for the House picture! 🏠',
        instructionTa: 'चित्र शब्द मिलान: घर के चित्र के लिए सही शब्द चुनें! 🏠',
        options: [
          { text: 'घर 🏠', correct: true },
          { text: 'पेड़ 🌳', correct: false },
          { text: 'बस 🚌', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Word Repair: Choose the correct spelling for Kamal! 🌸',
        instructionTa: 'वर्तनी सुधार: कमल शब्द का सही रूप चुनें! 🌸',
        options: [
          { text: 'कमल', correct: true },
          { text: 'कमळ', correct: false },
          { text: 'कम्ल', correct: false }
        ]
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Word Sorting: Sort the words into correct groups! 🗂️',
        instructionTa: 'शब्द वर्गीकरण: शब्दों को सही समूहों में मिलाएँ! 🗂️',
        pairs: [
          { left: 'आम', right: 'आम एक फल है 🍏' },
          { left: 'शेर', right: 'शेर एक जानवर है 🦁' },
          { left: 'किताब', right: 'किताब एक वस्तु है 📚' }
        ],
        options: []
      }
    ]
  },
  {
    id: 3,
    title: 'शब्द भंडार 📖',
    titleEn: 'Vocabulary World',
    mascot: '📖',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Opposite Match: Match the opposite words! ↔️',
        instructionTa: 'विलोम शब्द: विपरीतार्थक शब्दों का मिलान करें! ↔️',
        pairs: [
          { left: 'बड़ा', right: 'छोटा' },
          { left: 'ऊपर', right: 'नीचे' },
          { left: 'दिन', right: 'रात' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Singular Plural Match: Connect singular to its plural! 👥',
        instructionTa: 'एकवचन बहुवचन: एकवचन को बहुवचन से जोड़ें! 👥',
        pairs: [
          { left: 'लड़का', right: 'लड़के' },
          { left: 'किताब', right: 'किताबें' },
          { left: 'तारा', right: 'तारे' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Gender Match: Match masculine to feminine! 👫',
        instructionTa: 'लिंग मिलान: पुरुषलिंग को स्त्रीलिंग से मिलाएँ! 👫',
        pairs: [
          { left: 'लड़का', right: 'लड़की' },
          { left: 'माता', right: 'पिता' },
          { left: 'शेर', right: 'शेरनी' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Category Sort: Connect words to categories! 🗂️',
        pairs: [
          { left: 'हाथी', right: 'हाथी जानवर है 🐘' },
          { left: 'सेब', right: 'सेब भोजन है 🍎' },
          { left: 'दिल्ली', right: 'दिल्ली स्थान है 🏙️' }
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Synonym Match: Connect words with the same meaning! 🤝',
        instructionTa: 'पर्यायवाची: समान अर्थ वाले शब्दों का मिलान करें! 🤝',
        pairs: [
          { left: 'पानी', right: 'पानी को जल कहते हैं 💧' },
          { left: 'हवा', right: 'हवा को पवन कहते हैं 💨' },
          { left: 'आकाश', right: 'आकाश को गगन कहते हैं 🌌' }
        ],
        options: []
      }
    ]
  },
  {
    id: 4,
    title: 'Grammar Garden 🌿',
    titleEn: 'Grammar Garden',
    mascot: '🌿',
    color: 'from-violet-400 to-indigo-500',
    borderColor: 'border-violet-300',
    questions: [
      {
        type: 'choice' as any,
        instruction: 'Noun Finder: Find the Noun (संज्ञा) in: "राम खेलता है" 🏃‍♂️',
        instructionTa: 'संज्ञा पहचान: "राम खेलता है" में संज्ञा शब्द कौन सा है? 🏃‍♂️',
        options: [
          { text: 'राम', correct: true },
          { text: 'खेलता', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Action Word: Find the Verb (क्रिया) in: "चिड़िया उड़ती है" 🐦',
        instructionTa: 'क्रिया पहचान: "चिड़िया उड़ती है" में क्रिया शब्द कौन सा है? 🐦',
        options: [
          { text: 'उड़ती', correct: true },
          { text: 'चिड़िया', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Correct Auxiliary: Complete the sentence! ✏️',
        instructionTa: 'सहायक क्रिया: वाक्य पूरा करने के लिए सही शब्द चुनें! "मैं स्कूल जाता ____"',
        options: [
          { text: 'हूँ', correct: true },
          { text: 'है', correct: false },
          { text: 'हो', correct: false }
        ]
      },
      {
        type: 'sentence_train' as any,
        instruction: 'Sentence Repair: Arrange the words to form correct Hindi sentence! 🚂',
        instructionTa: 'वाक्य सुधार: सही वाक्य बनाने के लिए शब्दों को व्यवस्थित करें! 🚂',
        words: ['यह', 'घर', 'है'],
        correctSentence: 'यह घर है',
        options: []
      },
      {
        type: 'order' as any,
        instruction: 'Word Order: Choose the correct sentence order! 🗂️',
        instructionTa: 'शब्द अनुक्रम: वाक्य का सही रूप चुनें! 🗂️',
        options: [
          { text: 'यह मेरा घर है', correct: true },
          { text: 'मेरा घर यह है', correct: false }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Reading Mission 📚',
    titleEn: 'Reading Mission',
    mascot: '📚',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      {
        type: 'order' as any,
        instruction: 'Routine Timeline: Sort the story timeline correctly! 📅',
        instructionTa: 'कहानी अनुक्रम: समय-क्रम में व्यवस्थित करें! 📅',
        options: [
          { text: 'सुबह उठना ➔ स्कूल जाना ➔ शाम को खेलना', correct: true },
          { text: 'शाम को खेलना ➔ सुबह उठना ➔ स्कूल जाना', correct: false }
        ]
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Character Match: Match story character names with animal picture guides! 🐇',
        pairs: [
          { left: 'खरगोश', right: 'तेज दौड़ने वाला खरगोश 🐇' },
          { left: 'कछुआ', right: 'धीमे चलने वाला कछुआ 🐢' }
        ],
        options: []
      },
      {
        type: 'story_cave' as any,
        instruction: 'Read the story and answer: What is the color of the cat? 🐱',
        instructionTa: 'कहानी पढ़कर उत्तर दें: बिल्ली का रंग क्या है? 🐱',
        storyText: 'राम के पास एक बिल्ली है। बिल्ली का नाम पुसी है। पुसी सफेद रंग की है। राम पुसी से बहुत प्यार करता है।',
        options: [
          { text: 'सफेद', correct: true },
          { text: 'काली', correct: false },
          { text: 'भूरी', correct: false }
        ]
      },
      {
        type: 'story_cave' as any,
        instruction: 'Story Completion: Choose the best sentence to fill the gap. 📖',
        instructionTa: 'कहानी पूरा करें: खाली स्थान के लिए सही वाक्य चुनें! 📖\n"एक कौआ प्यासा था। वह पानी की खोज में ___। उसे एक घड़ा दिखा। "',
        storyText: 'एक कौआ प्यासा था। वह पानी की खोज में ___। उसे एक घड़ा दिखा।',
        options: [
          { text: 'इधर-उधर उड़ रहा था', correct: true },
          { text: 'पेड़ पर सो रहा था', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Picture Match: Choose the sentence that describes the picture of a swimming fish! 🐟',
        instructionTa: 'चित्र चयन: पानी में तैरती मछली को दर्शाने वाला सही वाक्य चुनें! 🐟',
        options: [
          { text: 'मछली पानी में तैरती है।', correct: true },
          { text: 'चिड़िया आसमान में उड़ती है।', correct: false }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'Writing + Language ✏️',
    titleEn: 'Writing & Language',
    mascot: '✏️',
    color: 'from-purple-400 to-indigo-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'trace' as any,
        instruction: 'Handwriting Mission: Trace the letter: अ ✍️',
        instructionTa: 'लेखन अभ्यास: वर्ण "अ" को लिखें! ✍️',
        letter: 'अ',
        options: []
      },
      {
        type: 'choice' as any,
        instruction: 'Word Writing: Choose the correct spelling for Pen (कलम)! 🖊️',
        instructionTa: 'लेखन अभ्यास: पेन/कलम का सही हिज्जे चुनें! 🖊️',
        options: [
          { text: 'कलम', correct: true },
          { text: 'कलळ', correct: false }
        ]
      },
      {
        type: 'sentence_train' as any,
        instruction: 'Sentence Builder: Arrange the words to write a sentence! 🚂',
        instructionTa: 'वाक्य निर्माण: शब्दों को व्यवस्थित कर वाक्य बनाएँ! 🚂',
        words: ['मैं', 'स्कूल', 'जाता', 'हूँ'],
        correctSentence: 'मैं स्कूल जाता हूँ',
        options: []
      },
      {
        type: 'garden_repair' as any,
        instruction: 'Fill Blank: Complete the sentence with your name! ✏️',
        instructionTa: 'रिक्त स्थान भरें: वाक्य पूरा करें! "मेरा नाम ___ है।"',
        sentence: 'मेरा नाम _____ है।',
        options: [
          { text: 'राम', correct: true },
          { text: 'है', correct: false }
        ]
      },
      {
        type: 'choice' as any,
        instruction: 'Hindi Capstone: Which of these words is a sweet fruit? 🥭',
        instructionTa: 'अंतिम चुनौती: इनमें से मीठा फल कौन सा है? 🥭',
        options: [
          { text: 'आम 🥭', correct: true },
          { text: 'करेला 🥒', correct: false }
        ]
      }
    ]
  }
];

