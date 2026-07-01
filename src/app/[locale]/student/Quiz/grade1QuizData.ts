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
