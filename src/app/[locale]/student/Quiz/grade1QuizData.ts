import { type Level } from './quizData';

// Generate 48 scalable levels for Grade 1 English corresponding to the 9 Chapters.
export const GRADE1_ENGLISH_LEVELS: Level[] = [
  // --- CHAPTER 1: ALPHABET & PHONICS (Levels 1 - 6) ---
  {
    id: 1,
    title: 'Alphabet Revision A-Z 🌈',
    titleEn: 'Alphabet Revision A-Z',
    mascot: '🌈',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      { type: 'trace' as any, instruction: 'Trace the letter: A ✍️', instructionTa: 'எழுத்தை எழுதுக: A ✍️', letter: 'A', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: B ✍️', instructionTa: 'எழுத்தை எழுதுக: B ✍️', letter: 'B', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: C ✍️', instructionTa: 'எழுத்தை எழுதுக: C ✍️', letter: 'C', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: D ✍️', instructionTa: 'எழுத்தை எழுதுக: D ✍️', letter: 'D', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: E ✍️', instructionTa: 'எழுத்தை எழுதுக: E ✍️', letter: 'E', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: F ✍️', instructionTa: 'எழுத்தை எழுதுக: F ✍️', letter: 'F', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: G ✍️', instructionTa: 'எழுத்தை எழுதுக: G ✍️', letter: 'G', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: H ✍️', instructionTa: 'எழுத்தை எழுதுக: H ✍️', letter: 'H', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: I ✍️', instructionTa: 'எழுத்தை எழுதுக: I ✍️', letter: 'I', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: J ✍️', instructionTa: 'எழுத்தை எழுதுக: J ✍️', letter: 'J', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: K ✍️', instructionTa: 'எழுத்தை எழுதுக: K ✍️', letter: 'K', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: L ✍️', instructionTa: 'எழுத்தை எழுதுக: L ✍️', letter: 'L', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: M ✍️', instructionTa: 'எழுத்தை எழுதுக: M ✍️', letter: 'M', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: N ✍️', instructionTa: 'எழுத்தை எழுதுக: N ✍️', letter: 'N', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: O ✍️', instructionTa: 'எழுத்தை எழுதுக: O ✍️', letter: 'O', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: P ✍️', instructionTa: 'எழுத்தை எழுதுக: P ✍️', letter: 'P', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: Q ✍️', instructionTa: 'எழுத்தை எழுதுக: Q ✍️', letter: 'Q', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: R ✍️', instructionTa: 'எழுத்தை எழுதுக: R ✍️', letter: 'R', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: S ✍️', instructionTa: 'எழுத்தை எழுதுக: S ✍️', letter: 'S', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: T ✍️', instructionTa: 'எழுத்தை எழுதுக: T ✍️', letter: 'T', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: U ✍️', instructionTa: 'எழுத்தை எழுதுக: U ✍️', letter: 'U', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: V ✍️', instructionTa: 'எழுத்தை எழுதுக: V ✍️', letter: 'V', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: W ✍️', instructionTa: 'எழுத்தை எழுதுக: W ✍️', letter: 'W', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: X ✍️', instructionTa: 'எழுத்தை எழுதுக: X ✍️', letter: 'X', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: Y ✍️', instructionTa: 'எழுத்தை எழுதுக: Y ✍️', letter: 'Y', options: [] },
      { type: 'trace' as any, instruction: 'Trace the letter: Z ✍️', instructionTa: 'எழுத்தை எழுதுக: Z ✍️', letter: 'Z', options: [] }
    ]
  },
  {
    id: 2,
    title: 'Capital & Small Letters 🔤',
    titleEn: 'Capital & Small Letters',
    mascot: '🔤',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      { type: 'connect_pairs' as any, instruction: 'Connect Capital and Small letters 🤝', instructionTa: 'பெரிய & சிறிய எழுத்துக்களை இணைக்கவும் 🤝', pairs: [{ left: 'A', right: 'a' }, { left: 'B', right: 'b' }, { left: 'G', right: 'g' }], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Connect Capital and Small letters 🤝', instructionTa: 'பெரிய & சிறிய எழுத்துக்களை இணைக்கவும் 🤝', pairs: [{ left: 'R', right: 'r' }, { left: 'T', right: 't' }, { left: 'E', right: 'e' }], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Connect Capital and Small letters 🤝', instructionTa: 'பெரிய & சிறிய எழுத்துக்களை இணைக்கவும் 🤝', pairs: [{ left: 'M', right: 'm' }, { left: 'N', right: 'n' }, { left: 'P', right: 'p' }], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Connect Capital and Small letters 🤝', instructionTa: 'பெரிய & சிறிய எழுத்துக்களை இணைக்கவும் 🤝', pairs: [{ left: 'D', right: 'd' }, { left: 'Q', right: 'q' }, { left: 'Y', right: 'y' }], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Connect Capital and Small letters 🤝', instructionTa: 'பெரிய & சிறிய எழுத்துக்களை இணைக்கவும் 🤝', pairs: [{ left: 'H', right: 'h' }, { left: 'F', right: 'f' }, { left: 'L', right: 'l' }], options: [] }
    ]
  },
  {
    id: 3,
    title: 'Letter Sounds A-M 🗣️',
    titleEn: 'Letter Sounds A-M',
    mascot: '🗣️',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      { type: 'grid_search' as any, instruction: 'Select all pictures making the /æ/ sound 🍎', instructionTa: '/æ/ ஒலி தரும் படங்களைத் தேர்ந்தெடு 🍎', gridItems: [{ text: 'Apple', correct: true, emoji: '🍎' }, { text: 'Ant', correct: true, emoji: '🐜' }, { text: 'Axe', correct: true, emoji: '🪓' }, { text: 'Dog', correct: false, emoji: '🐶' }, { text: 'Cat', correct: false, emoji: '🐱' }, { text: 'Sun', correct: false, emoji: '☀️' }], options: [] },
      { type: 'grid_search' as any, instruction: 'Select all pictures making the /b/ sound ⚽', instructionTa: '/b/ ஒலி தரும் படங்களைத் தேர்ந்தெடு ⚽', gridItems: [{ text: 'Ball', correct: true, emoji: '⚽' }, { text: 'Bat', correct: true, emoji: '🏏' }, { text: 'Boy', correct: true, emoji: '👦' }, { text: 'Apple', correct: false, emoji: '🍎' }, { text: 'Pin', correct: false, emoji: '📌' }, { text: 'Red', correct: false, emoji: '🔴' }], options: [] },
      { type: 'grid_search' as any, instruction: 'Select all pictures making the /f/ sound 🐟', instructionTa: '/f/ ஒலி தரும் படங்களைத் தேர்ந்தெடு 🐟', gridItems: [{ text: 'Fish', correct: true, emoji: '🐟' }, { text: 'Fan', correct: true, emoji: '💨' }, { text: 'Fox', correct: true, emoji: '🦊' }, { text: 'Dog', correct: false, emoji: '🐶' }, { text: 'Hen', correct: false, emoji: '🐔' }, { text: 'Mug', correct: false, emoji: '☕' }], options: [] },
      { type: 'grid_search' as any, instruction: 'Select all pictures making the /h/ sound 🎩', instructionTa: '/h/ ஒலி தரும் படங்களைத் தேர்ந்தெடு 🎩', gridItems: [{ text: 'Hat', correct: true, emoji: '🎩' }, { text: 'Hen', correct: true, emoji: '🐔' }, { text: 'House', correct: true, emoji: '🏠' }, { text: 'Apple', correct: false, emoji: '🍎' }, { text: 'Sit', correct: false, emoji: '🧎' }, { text: 'Bin', correct: false, emoji: '🗑️' }], options: [] },
      { type: 'grid_search' as any, instruction: 'Select all pictures making the /m/ sound 🐒', instructionTa: '/m/ ஒலி தரும் படங்களைத் தேர்ந்தெடு 🐒', gridItems: [{ text: 'Monkey', correct: true, emoji: '🐒' }, { text: 'Map', correct: true, emoji: '🗺️' }, { text: 'Mug', correct: true, emoji: '☕' }, { text: 'Red', correct: false, emoji: '🔴' }, { text: 'Pen', correct: false, emoji: '🖊️' }, { text: 'Sun', correct: false, emoji: '☀️' }], options: [] }
    ]
  },
  {
    id: 4,
    title: 'Letter Sounds N-Z 🔊',
    titleEn: 'Letter Sounds N-Z',
    mascot: '🔊',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-300',
    questions: [
      { type: 'grid_search' as any, instruction: 'Select all pictures making the /p/ sound 🖊️', instructionTa: '/p/ ஒலி தரும் படங்களைத் தேர்ந்தெடு 🖊️', gridItems: [{ text: 'Pen', correct: true, emoji: '🖊️' }, { text: 'Pin', correct: true, emoji: '📌' }, { text: 'Pot', correct: true, emoji: '🏺' }, { text: 'Dog', correct: false, emoji: '🐶' }, { text: 'Hen', correct: false, emoji: '🐔' }, { text: 'Bed', correct: false, emoji: '🛏️' }], options: [] },
      { type: 'grid_search' as any, instruction: 'Select all pictures making the /s/ sound ☀️', instructionTa: '/s/ ஒலி தரும் படங்களைத் தேர்ந்தெடு ☀️', gridItems: [{ text: 'Sun', correct: true, emoji: '☀️' }, { text: 'Star', correct: true, emoji: '⭐️' }, { text: 'Socks', correct: true, emoji: '🧦' }, { text: 'Apple', correct: false, emoji: '🍎' }, { text: 'Pen', correct: false, emoji: '🖊️' }, { text: 'Ball', correct: false, emoji: '⚽' }], options: [] },
      { type: 'grid_search' as any, instruction: 'Select all pictures making the /t/ sound 🐯', instructionTa: '/t/ ஒலி தரும் படங்களைத் தேர்ந்தெடு 🐯', gridItems: [{ text: 'Tiger', correct: true, emoji: '🐯' }, { text: 'Tub', correct: true, emoji: '🛁' }, { text: 'Toy', correct: true, emoji: '🧸' }, { text: 'Hen', correct: false, emoji: '🐔' }, { text: 'Dog', correct: false, emoji: '🐶' }, { text: 'Pin', correct: false, emoji: '📌' }], options: [] },
      { type: 'grid_search' as any, instruction: 'Select all pictures making the /v/ sound 🚐', instructionTa: '/v/ ஒலி தரும் படங்களைத் தேர்ந்தெடு 🚐', gridItems: [{ text: 'Van', correct: true, emoji: '🚐' }, { text: 'Vase', correct: true, emoji: '🏺' }, { text: 'Violin', correct: true, emoji: '🎻' }, { text: 'Sun', correct: false, emoji: '☀️' }, { text: 'Red', correct: false, emoji: '🔴' }, { text: 'Mop', correct: false, emoji: '🧹' }], options: [] },
      { type: 'grid_search' as any, instruction: 'Select all pictures making the /z/ sound 🦓', instructionTa: '/z/ ஒலி தரும் படங்களைத் தேர்ந்தெடு 🦓', gridItems: [{ text: 'Zebra', correct: true, emoji: '🦓' }, { text: 'Zip', correct: true, emoji: '🤐' }, { text: 'Zero', correct: true, emoji: '0️⃣' }, { text: 'Fox', correct: false, emoji: '🦊' }, { text: 'Apple', correct: false, emoji: '🍎' }, { text: 'Red', correct: false, emoji: '🔴' }], options: [] }
    ]
  },


  // --- CHAPTER 2: VOWELS ADVENTURE (Levels 7 - 11) ---
  {
    id: 5,
    title: 'Short Vowel a 🔤',
    titleEn: 'Short Vowel a',
    mascot: '🔤',
    color: 'from-teal-400 to-emerald-500',
    borderColor: 'border-teal-300',
    questions: [
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Cat 🐱', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 🐱', sentence: 'c_t', options: [{ text: 'a', correct: true }, { text: 'o', correct: false }, { text: 'u', correct: false }] },
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Bag 🎒', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 🎒', sentence: 'b_g', options: [{ text: 'a', correct: true }, { text: 'e', correct: false }, { text: 'i', correct: false }] },
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Hat 👒', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 👒', sentence: 'h_t', options: [{ text: 'a', correct: true }, { text: 'o', correct: false }, { text: 'e', correct: false }] },
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Fan 💨', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 💨', sentence: 'f_n', options: [{ text: 'a', correct: true }, { text: 'u', correct: false }, { text: 'i', correct: false }] },
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Map 🗺️', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 🗺️', sentence: 'm_p', options: [{ text: 'a', correct: true }, { text: 'e', correct: false }, { text: 'o', correct: false }] }
    ]
  },
  {
    id: 6,
    title: 'Short Vowel e 🟢',
    titleEn: 'Short Vowel e',
    mascot: '🟢',
    color: 'from-teal-400 to-emerald-500',
    borderColor: 'border-teal-300',
    questions: [
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Pen 🖊️', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 🖊️', sentence: 'p_n', options: [{ text: 'e', correct: true }, { text: 'a', correct: false }, { text: 'i', correct: false }] },
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Red 🔴', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 🔴', sentence: 'r_d', options: [{ text: 'e', correct: true }, { text: 'o', correct: false }, { text: 'u', correct: false }] },
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Bed 🛏️', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 🛏️', sentence: 'b_d', options: [{ text: 'e', correct: true }, { text: 'a', correct: false }, { text: 'i', correct: false }] },
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Hen 🐔', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 🐔', sentence: 'h_n', options: [{ text: 'e', correct: true }, { text: 'u', correct: false }, { text: 'o', correct: false }] },
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Net 🕸️', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 🕸️', sentence: 'n_t', options: [{ text: 'e', correct: true }, { text: 'a', correct: false }, { text: 'i', correct: false }] }
    ]
  },
  {
    id: 7,
    title: 'Short Vowel i 🔵',
    titleEn: 'Short Vowel i',
    mascot: '🔵',
    color: 'from-teal-400 to-emerald-500',
    borderColor: 'border-teal-300',
    questions: [
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Pin 📌', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 📌', sentence: 'p_n', options: [{ text: 'i', correct: true }, { text: 'e', correct: false }, { text: 'a', correct: false }] },
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Lip 👄', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 👄', sentence: 'l_p', options: [{ text: 'i', correct: true }, { text: 'o', correct: false }, { text: 'u', correct: false }] },
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Bin 🗑️', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 🗑️', sentence: 'b_n', options: [{ text: 'i', correct: true }, { text: 'e', correct: false }, { text: 'a', correct: false }] },
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Sit 🧎', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 🧎', sentence: 's_t', options: [{ text: 'i', correct: true }, { text: 'u', correct: false }, { text: 'o', correct: false }] },
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Pig 🐷', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 🐷', sentence: 'p_g', options: [{ text: 'i', correct: true }, { text: 'e', correct: false }, { text: 'a', correct: false }] }
    ]
  },
  {
    id: 8,
    title: 'Short Vowel o 🟠',
    titleEn: 'Short Vowel o',
    mascot: '🟠',
    color: 'from-teal-400 to-emerald-500',
    borderColor: 'border-teal-300',
    questions: [
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Hot 🥵', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 🥵', sentence: 'h_t', options: [{ text: 'o', correct: true }, { text: 'a', correct: false }, { text: 'e', correct: false }] },
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Dog 🐶', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 🐶', sentence: 'd_g', options: [{ text: 'o', correct: true }, { text: 'u', correct: false }, { text: 'i', correct: false }] },
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Pot 🏺', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 🏺', sentence: 'p_t', options: [{ text: 'o', correct: true }, { text: 'e', correct: false }, { text: 'a', correct: false }] },
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Fox 🦊', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 🦊', sentence: 'f_x', options: [{ text: 'o', correct: true }, { text: 'u', correct: false }, { text: 'i', correct: false }] },
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Cot 🛏️', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 🛏️', sentence: 'c_t', options: [{ text: 'o', correct: true }, { text: 'e', correct: false }, { text: 'a', correct: false }] }
    ]
  },
  {
    id: 9,
    title: 'Short Vowel u 🟣',
    titleEn: 'Short Vowel u',
    mascot: '🟣',
    color: 'from-teal-400 to-emerald-500',
    borderColor: 'border-teal-300',
    questions: [
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Sun ☀️', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக ☀️', sentence: 's_n', options: [{ text: 'u', correct: true }, { text: 'a', correct: false }, { text: 'o', correct: false }] },
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Bug 🐞', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 🐞', sentence: 'b_g', options: [{ text: 'u', correct: true }, { text: 'e', correct: false }, { text: 'i', correct: false }] },
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Tub 🛁', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 🛁', sentence: 't_b', options: [{ text: 'u', correct: true }, { text: 'o', correct: false }, { text: 'e', correct: false }] },
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Cup 🥛', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக 🥛', sentence: 'c_p', options: [{ text: 'u', correct: true }, { text: 'a', correct: false }, { text: 'i', correct: false }] },
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill the missing vowel for Mug ☕', instructionTa: 'விடுபட்ட உயிரெழுத்தை நிரப்புக ☕', sentence: 'm_g', options: [{ text: 'u', correct: true }, { text: 'o', correct: false }, { text: 'e', correct: false }] }
    ]
  },

  // --- CHAPTER 3: WORD BUILDER FOREST (Levels 10 - 15) ---
  {
    id: 10,
    title: 'CVC words - at family 🌲',
    titleEn: 'CVC words - at family',
    mascot: '🌲',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      // Q1: Connect beginning letter → full word (word builder feel)
      { type: 'connect_pairs' as any, instruction: 'Connect the letter to build -at words! 🔗', instructionTa: '-at வார்த்தைகளை இணைக்கவும்! 🔗', pairs: [{ left: 'c', right: 'cat 🐱' }, { left: 'b', right: 'bat 🏏' }, { left: 'r', right: 'rat 🐭' }], options: [] },
      // Q2: Find all -at family words in a grid
      { type: 'grid_search' as any, instruction: 'Find ALL -at family words! 🔍', instructionTa: '-at குடும்ப வார்த்தைகளை கண்டுபிடி! 🔍', gridItems: [{ text: 'cat', correct: true, emoji: '🐱' }, { text: 'hat', correct: true, emoji: '🎩' }, { text: 'mat', correct: true, emoji: '🧘' }, { text: 'dog', correct: false, emoji: '🐶' }, { text: 'pen', correct: false, emoji: '🖊️' }, { text: 'sun', correct: false, emoji: '☀️' }], options: [] },
      // Q3: Another connect_pairs round
      { type: 'connect_pairs' as any, instruction: 'Build more -at words! 🌲', instructionTa: 'மேலும் -at வார்த்தைகள் உருவாக்குங்க! 🌲', pairs: [{ left: 'h', right: 'hat 🎩' }, { left: 'm', right: 'mat 🧘' }, { left: 's', right: 'sat 🪑' }], options: [] },
      // Q4: Build word letter by letter (sentence_train style)
      { type: 'sentence_train' as any, instruction: 'Tap letters in order to build: CAT 🐱', instructionTa: 'C-A-T வரிசையில் தட்டுங்க! 🐱', words: ['c', 'a', 't'], correctSentence: 'c a t', options: [] },
      // Q5: Sentence context
      { type: 'garden_repair' as any, instruction: 'Fix the sentence! 🌱', instructionTa: 'வாக்கியத்தை சரிசெய்யுங்க! 🌱', sentence: 'The ___ sits on the mat.', options: [{ text: 'cat 🐱', correct: true }, { text: 'dog 🐶', correct: false }, { text: 'bus 🚌', correct: false }] }
    ]
  },
  {
    id: 11,
    title: 'CVC words - an family 🧺',
    titleEn: 'CVC words - an family',
    mascot: '🧺',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      { type: 'connect_pairs' as any, instruction: 'Connect the letter to build -an words! 🔗', instructionTa: '-an வார்த்தைகளை இணைக்கவும்! 🔗', pairs: [{ left: 'c', right: 'can 🥫' }, { left: 'f', right: 'fan 💨' }, { left: 'v', right: 'van 🚐' }], options: [] },
      { type: 'grid_search' as any, instruction: 'Find ALL -an family words! 🔍', instructionTa: '-an குடும்ப வார்த்தைகளை கண்டுபிடி! 🔍', gridItems: [{ text: 'can', correct: true, emoji: '🥫' }, { text: 'fan', correct: true, emoji: '💨' }, { text: 'man', correct: true, emoji: '👨' }, { text: 'cat', correct: false, emoji: '🐱' }, { text: 'hot', correct: false, emoji: '🥵' }, { text: 'bug', correct: false, emoji: '🐞' }], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Build more -an words! 🧺', instructionTa: 'மேலும் -an வார்த்தைகள்! 🧺', pairs: [{ left: 'm', right: 'man 👨' }, { left: 'p', right: 'pan 🍳' }, { left: 'r', right: 'ran 🏃' }], options: [] },
      { type: 'sentence_train' as any, instruction: 'Tap letters in order to build: FAN 💨', instructionTa: 'F-A-N வரிசையில் தட்டுங்க! 💨', words: ['f', 'a', 'n'], correctSentence: 'f a n', options: [] },
      { type: 'garden_repair' as any, instruction: 'Fix the sentence! 🌱', instructionTa: 'வாக்கியத்தை சரிசெய்யுங்க! 🌱', sentence: 'She has a ___ in her hand.', options: [{ text: 'fan 💨', correct: true }, { text: 'hat 🎩', correct: false }, { text: 'mug ☕', correct: false }] }
    ]
  },
  {
    id: 12,
    title: 'CVC words - in family 🐟',
    titleEn: 'CVC words - in family',
    mascot: '🐟',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      { type: 'connect_pairs' as any, instruction: 'Connect the letter to build -in words! 🔗', instructionTa: '-in வார்த்தைகளை இணைக்கவும்! 🔗', pairs: [{ left: 'p', right: 'pin 📌' }, { left: 'b', right: 'bin 🗑️' }, { left: 'f', right: 'fin 🐟' }], options: [] },
      { type: 'grid_search' as any, instruction: 'Find ALL -in family words! 🔍', instructionTa: '-in குடும்ப வார்த்தைகளை கண்டுபிடி! 🔍', gridItems: [{ text: 'pin', correct: true, emoji: '📌' }, { text: 'tin', correct: true, emoji: '🥫' }, { text: 'win', correct: true, emoji: '🏆' }, { text: 'mat', correct: false, emoji: '🧘' }, { text: 'dog', correct: false, emoji: '🐶' }, { text: 'mug', correct: false, emoji: '☕' }], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Build more -in words! 🐟', instructionTa: 'மேலும் -in வார்த்தைகள்! 🐟', pairs: [{ left: 't', right: 'tin 🥫' }, { left: 'w', right: 'win 🏆' }, { left: 'k', right: 'kin 👨‍👩‍👧' }], options: [] },
      { type: 'sentence_train' as any, instruction: 'Tap letters in order to build: PIN 📌', instructionTa: 'P-I-N வரிசையில் தட்டுங்க! 📌', words: ['p', 'i', 'n'], correctSentence: 'p i n', options: [] },
      { type: 'garden_repair' as any, instruction: 'Fix the sentence! 🌱', instructionTa: 'வாக்கியத்தை சரிசெய்யுங்க! 🌱', sentence: 'He used a ___ to fix it.', options: [{ text: 'pin 📌', correct: true }, { text: 'can 🥫', correct: false }, { text: 'hat 🎩', correct: false }] }
    ]
  },
  {
    id: 13,
    title: 'CVC words - ot family 🏺',
    titleEn: 'CVC words - ot family',
    mascot: '🏺',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      { type: 'connect_pairs' as any, instruction: 'Connect the letter to build -ot words! 🔗', instructionTa: '-ot வார்த்தைகளை இணைக்கவும்! 🔗', pairs: [{ left: 'p', right: 'pot 🏺' }, { left: 'h', right: 'hot 🥵' }, { left: 'd', right: 'dot 🔴' }], options: [] },
      { type: 'grid_search' as any, instruction: 'Find ALL -ot family words! 🔍', instructionTa: '-ot குடும்ப வார்த்தைகளை கண்டுபிடி! 🔍', gridItems: [{ text: 'hot', correct: true, emoji: '🥵' }, { text: 'pot', correct: true, emoji: '🏺' }, { text: 'cot', correct: true, emoji: '🛏️' }, { text: 'fan', correct: false, emoji: '💨' }, { text: 'pin', correct: false, emoji: '📌' }, { text: 'cat', correct: false, emoji: '🐱' }], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Build more -ot words! 🏺', instructionTa: 'மேலும் -ot வார்த்தைகள்! 🏺', pairs: [{ left: 'c', right: 'cot 🛏️' }, { left: 'n', right: 'not 🙅' }, { left: 'g', right: 'got 👍' }], options: [] },
      { type: 'sentence_train' as any, instruction: 'Tap letters in order to build: POT 🏺', instructionTa: 'P-O-T வரிசையில் தட்டுங்க! 🏺', words: ['p', 'o', 't'], correctSentence: 'p o t', options: [] },
      { type: 'garden_repair' as any, instruction: 'Fix the sentence! 🌱', instructionTa: 'வாக்கியத்தை சரிசெய்யுங்க! 🌱', sentence: 'The soup is very ___.', options: [{ text: 'hot 🥵', correct: true }, { text: 'wet 💧', correct: false }, { text: 'big 📦', correct: false }] }
    ]
  },
  {
    id: 14,
    title: 'CVC words - ug family 🐞',
    titleEn: 'CVC words - ug family',
    mascot: '🐞',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      { type: 'connect_pairs' as any, instruction: 'Connect the letter to build -ug words! 🔗', instructionTa: '-ug வார்த்தைகளை இணைக்கவும்! 🔗', pairs: [{ left: 'b', right: 'bug 🐞' }, { left: 'm', right: 'mug ☕' }, { left: 'r', right: 'rug 🧹' }], options: [] },
      { type: 'grid_search' as any, instruction: 'Find ALL -ug family words! 🔍', instructionTa: '-ug குடும்ப வார்த்தைகளை கண்டுபிடி! 🔍', gridItems: [{ text: 'bug', correct: true, emoji: '🐞' }, { text: 'mug', correct: true, emoji: '☕' }, { text: 'jug', correct: true, emoji: '🥛' }, { text: 'cat', correct: false, emoji: '🐱' }, { text: 'hot', correct: false, emoji: '🥵' }, { text: 'pin', correct: false, emoji: '📌' }], options: [] },
      { type: 'connect_pairs' as any, instruction: 'Build more -ug words! 🐞', instructionTa: 'மேலும் -ug வார்த்தைகள்! 🐞', pairs: [{ left: 'j', right: 'jug 🥛' }, { left: 'h', right: 'hug 🤗' }, { left: 't', right: 'tug 💪' }], options: [] },
      { type: 'sentence_train' as any, instruction: 'Tap letters in order to build: MUG ☕', instructionTa: 'M-U-G வரிசையில் தட்டுங்க! ☕', words: ['m', 'u', 'g'], correctSentence: 'm u g', options: [] },
      { type: 'garden_repair' as any, instruction: 'Fix the sentence! 🌱', instructionTa: 'வாக்கியத்தை சரிசெய்யுங்க! 🌱', sentence: 'Mia drank from her ___.', options: [{ text: 'mug ☕', correct: true }, { text: 'mat 🧘', correct: false }, { text: 'hat 🎩', correct: false }] }
    ]
  },
  {
    id: 15,
    title: 'Build new words 🧱',
    titleEn: 'Build new words',
    mascot: '🧱',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      // Mix all families — connect beginning to ANY CVC word
      { type: 'connect_pairs' as any, instruction: 'Match each letter to its word! 🧱', instructionTa: 'ஒவ்வொரு எழுத்தையும் அதன் வார்த்தையுடன் இணைக்கவும்! 🧱', pairs: [{ left: 'c', right: 'cup 🥛' }, { left: 'z', right: 'zip 🤐' }, { left: 'j', right: 'jet ✈️' }], options: [] },
      { type: 'sentence_train' as any, instruction: 'Build the word: RUN 🏃', instructionTa: 'R-U-N வரிசையில் தட்டுங்க! 🏃', words: ['r', 'u', 'n'], correctSentence: 'r u n', options: [] },
      { type: 'connect_pairs' as any, instruction: 'Build more new words! 🏗️', instructionTa: 'மேலும் புதிய வார்த்தைகள்! 🏗️', pairs: [{ left: 'm', right: 'mop 🧹' }, { left: 'p', right: 'peg 📎' }, { left: 'n', right: 'net 🕸️' }], options: [] },
      { type: 'sentence_train' as any, instruction: 'Build the word: HOP 🐸', instructionTa: 'H-O-P வரிசையில் தட்டுங்க! 🐸', words: ['h', 'o', 'p'], correctSentence: 'h o p', options: [] },
      { type: 'grid_search' as any, instruction: 'Find the real CVC words! 🔍', instructionTa: 'உண்மையான CVC வார்த்தைகளை கண்டுபிடி! 🔍', gridItems: [{ text: 'run', correct: true, emoji: '🏃' }, { text: 'zip', correct: true, emoji: '🤐' }, { text: 'hop', correct: true, emoji: '🐸' }, { text: 'str', correct: false, emoji: '❌' }, { text: 'xpt', correct: false, emoji: '❌' }, { text: 'blf', correct: false, emoji: '❌' }], options: [] }
    ]
  },

  // --- CHAPTER 4: SIGHT WORDS (Levels 16 - 20) ---
  {
    id: 16,
    title: 'I, am, is, are 🏙️',
    titleEn: 'I, am, is, are',
    mascot: '🏙️',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      // Q1: Connect Subject to Verb
      { type: 'connect_pairs' as any, instruction: 'Connect the matching parts! 🔗', instructionTa: 'பொருந்தும் பகுதிகளை இணைக்கவும்! 🔗', pairs: [{ left: 'I', right: 'am 🙋' }, { left: 'He', right: 'is 👦' }, { left: 'They', right: 'are 👥' }], options: [] },
      // Q2: Grid search for all instances of "is" or "are"
      { type: 'grid_search' as any, instruction: 'Find the helper word: IS 🔍', instructionTa: 'IS வார்த்தையைத் தேர்ந்தெடு! 🔍', gridItems: [{ text: 'is', correct: true, emoji: '✨' }, { text: 'is', correct: true, emoji: '🌟' }, { text: 'is', correct: true, emoji: '💫' }, { text: 'am', correct: false, emoji: '❌' }, { text: 'are', correct: false, emoji: '❌' }, { text: 'the', correct: false, emoji: '❌' }], options: [] },
      // Q3: Sentence Train
      { type: 'sentence_train' as any, instruction: 'Assemble: He is happy 🚂', instructionTa: 'வாக்கியத்தை வரிசைப்படுத்துக: He is happy 🚂', words: ['happy', 'is', 'He'], correctSentence: 'He is happy', options: [] },
      // Q4: Garden Repair
      { type: 'garden_repair' as any, instruction: 'Fix the sentence! 🌱', instructionTa: 'வாக்கியத்தை சரிசெய்யுங்க! 🌱', sentence: 'We ___ playing in the park.', options: [{ text: 'are', correct: true }, { text: 'am', correct: false }, { text: 'is', correct: false }] },
      // Q5: Sentence Train
      { type: 'sentence_train' as any, instruction: 'Assemble: I am a boy 🚂', instructionTa: 'வாக்கியத்தை வரிசைப்படுத்துக: I am a boy 🚂', words: ['a', 'am', 'boy', 'I'], correctSentence: 'I am a boy', options: [] }
    ]
  },
  {
    id: 17,
    title: 'the, a, an 🎯',
    titleEn: 'the, a, an',
    mascot: '🎯',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      // Q1: Connect noun with correct article
      { type: 'connect_pairs' as any, instruction: 'Match the word with its article! 🔗', instructionTa: 'சரியான article உடன் இணைக்கவும்! 🔗', pairs: [{ left: 'apple 🍎', right: 'an' }, { left: 'car 🚗', right: 'a' }, { left: 'Sun ☀️', right: 'the' }], options: [] },
      // Q2: Grid Search
      { type: 'grid_search' as any, instruction: 'Find all correct articles (a, an, the)! 🔍', instructionTa: 'சரியான articles கண்டுபிடி! 🔍', gridItems: [{ text: 'a', correct: true, emoji: '🅰️' }, { text: 'an', correct: true, emoji: '🔤' }, { text: 'the', correct: true, emoji: '🌐' }, { text: 'and', correct: false, emoji: '❌' }, { text: 'boy', correct: false, emoji: '❌' }, { text: 'cat', correct: false, emoji: '❌' }], options: [] },
      // Q3: Garden Repair
      { type: 'garden_repair' as any, instruction: 'Complete the sentence! ✏️', instructionTa: 'வாக்கியத்தை நிறைவு செய்! ✏️', sentence: 'I saw ___ big elephant.', options: [{ text: 'a', correct: true }, { text: 'an', correct: false }, { text: 'the', correct: false }] },
      // Q4: Garden Repair
      { type: 'garden_repair' as any, instruction: 'Complete the sentence! ✏️', instructionTa: 'வாக்கியத்தை நிறைவு செய்! ✏️', sentence: 'She wants to eat ___ orange.', options: [{ text: 'an', correct: true }, { text: 'a', correct: false }, { text: 'the', correct: false }] },
      // Q5: Sentence Train
      { type: 'sentence_train' as any, instruction: 'Assemble the sentence! 🚂', instructionTa: 'வாக்கியத்தை அடுக்குங்க! 🚂', words: ['Sun', 'shines', 'The'], correctSentence: 'The Sun shines', options: [] }
    ]
  },
  {
    id: 18,
    title: 'this, that 👉',
    titleEn: 'this, that',
    mascot: '👉',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      // Q1: Connect Near / Far
      { type: 'connect_pairs' as any, instruction: 'Match near and far! 🔗', instructionTa: 'பொருத்துக! 🔗', pairs: [{ left: 'this 📍', right: 'near here' }, { left: 'that 🔭', right: 'far away' }, { left: 'these 📦', right: 'near plural' }], options: [] },
      // Q2: Garden Repair (near)
      { type: 'garden_repair' as any, instruction: 'Complete the sentence! 👉', instructionTa: 'வாக்கியத்தை நிறைவு செய்! 👉', sentence: '___ book in my hand is blue.', options: [{ text: 'This', correct: true }, { text: 'That', correct: false }] },
      // Q3: Garden Repair (far)
      { type: 'garden_repair' as any, instruction: 'Complete the sentence! 👉', instructionTa: 'வாக்கியத்தை நிறைவு செய்! 👉', sentence: '___ star in the sky is bright.', options: [{ text: 'That', correct: true }, { text: 'This', correct: false }] },
      // Q4: Sentence Train
      { type: 'sentence_train' as any, instruction: 'Assemble the sentence! 🚂', instructionTa: 'வாக்கியத்தை அடுக்குங்க! 🚂', words: ['is', 'my', 'toy', 'This'], correctSentence: 'This is my toy', options: [] },
      // Q5: Sentence Train
      { type: 'sentence_train' as any, instruction: 'Assemble the sentence! 🚂', instructionTa: 'வாக்கியத்தை அடுக்குங்க! 🚂', words: ['bird', 'fly', 'That', 'can'], correctSentence: 'That bird can fly', options: [] }
    ]
  },
  {
    id: 19,
    title: 'here, there 📍',
    titleEn: 'here, there',
    mascot: '📍',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      // Q1: Connect matching sight words
      { type: 'connect_pairs' as any, instruction: 'Match the opposites! 🔗', instructionTa: 'எதிர்ச்சொற்களைப் பொருத்துக! 🔗', pairs: [{ left: 'here 📍', right: 'close to me' }, { left: 'there 🔭', right: 'away from me' }, { left: 'come 🚶', right: 'go 🏃' }], options: [] },
      // Q2: Garden Repair
      { type: 'garden_repair' as any, instruction: 'Choose: here or there!', instructionTa: 'சரியானதைத் தேர்ந்தெடு!', sentence: 'Come ___ and sit next to me.', options: [{ text: 'here', correct: true }, { text: 'there', correct: false }] },
      // Q3: Garden Repair
      { type: 'garden_repair' as any, instruction: 'Choose: here or there!', instructionTa: 'சரியானதைத் தேர்ந்தெடு!', sentence: 'The birds are flying over ___ in the sky.', options: [{ text: 'there', correct: true }, { text: 'here', correct: false }] },
      // Q4: Grid Search
      { type: 'grid_search' as any, instruction: 'Find the word: THERE! 🔍', instructionTa: 'THERE வார்த்தையைத் தேர்ந்தெடு! 🔍', gridItems: [{ text: 'there', correct: true, emoji: '👉' }, { text: 'there', correct: true, emoji: '📍' }, { text: 'here', correct: false, emoji: '❌' }, { text: 'this', correct: false, emoji: '❌' }, { text: 'that', correct: false, emoji: '❌' }], options: [] },
      // Q5: Sentence Train
      { type: 'sentence_train' as any, instruction: 'Assemble the sentence! 🚂', instructionTa: 'வாக்கியத்தை அடுக்குங்க! 🚂', words: ['is', 'cat', 'My', 'here'], correctSentence: 'My cat is here', options: [] }
    ]
  },
  {
    id: 20,
    title: 'my, your 🤝',
    titleEn: 'my, your',
    mascot: '🤝',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      // Q1: Connect
      { type: 'connect_pairs' as any, instruction: 'Match the pronouns! 🔗', instructionTa: 'பிரதிப்பெயர்ச்சொற்களைப் பொருத்துக! 🔗', pairs: [{ left: 'my 🙋', right: 'belongs to me' }, { left: 'your 🫵', right: 'belongs to you' }, { left: 'our 👥', right: 'belongs to us' }], options: [] },
      // Q2: Garden Repair
      { type: 'garden_repair' as any, instruction: 'Fill the blank! 🤝', instructionTa: 'நிரப்புக! 🤝', sentence: 'I am playing with ___ dog. (belongs to me)', options: [{ text: 'my', correct: true }, { text: 'your', correct: false }] },
      // Q3: Garden Repair
      { type: 'garden_repair' as any, instruction: 'Fill the blank! 🤝', instructionTa: 'நிரப்புக! 🤝', sentence: 'Is this ___ school bag? (belongs to you)', options: [{ text: 'your', correct: true }, { text: 'my', correct: false }] },
      // Q4: Sentence Train
      { type: 'sentence_train' as any, instruction: 'Assemble the sentence! 🚂', instructionTa: 'வாக்கியத்தை அடுக்குங்க! 🚂', words: ['is', 'your', 'This', 'pen'], correctSentence: 'This is your pen', options: [] },
      // Q5: Sentence Train
      { type: 'sentence_train' as any, instruction: 'Assemble the sentence! 🚂', instructionTa: 'வாக்கியத்தை அடுக்குங்க! 🚂', words: ['love', 'I', 'school', 'my'], correctSentence: 'I love my school', options: [] }
    ]
  },


  // --- CHAPTER 5: NAMING WORDS WORLD (Levels 21 - 25) ---
  {
    id: 21,
    title: 'People names 👤',
    titleEn: 'People names',
    mascot: '👤',
    color: 'from-violet-400 to-purple-500',
    borderColor: 'border-violet-300',
    questions: [
      // Q1: Categorize names
      { type: 'connect_pairs' as any, instruction: 'Match the name with their job/role! 🔗', instructionTa: 'பெயர்களைப் பொருந்தும் பாத்திரத்துடன் இணைக்கவும்! 🔗', pairs: [{ left: 'Rahul 👦', right: 'boy' }, { left: 'Sita 👧', right: 'girl' }, { left: 'Teacher 👩‍🏫', right: 'job' }], options: [] },
      // Q2: Grid Search for people names
      { type: 'grid_search' as any, instruction: 'Find all people names! 🔍', instructionTa: 'நபர்களின் பெயர்களைக் கண்டுபிடி! 🔍', gridItems: [{ text: 'Mia', correct: true, emoji: '👧' }, { text: 'Rahul', correct: true, emoji: '👦' }, { text: 'Riya', correct: true, emoji: '👩' }, { text: 'lion', correct: false, emoji: '🦁' }, { text: 'school', correct: false, emoji: '🏫' }, { text: 'book', correct: false, emoji: '📚' }], options: [] },
      // Q3: Highlight name in a sentence
      { type: 'detective_highlight' as any, category: 'Person Name', instruction: 'Find the person name in the sentence!', instructionTa: 'நபர் பெயர்ச்சொல்லைக் கண்டுபிடி!', sentence: 'Mia runs very fast.', targetWord: 'Mia', options: [] },
      // Q4: Garden Repair context
      { type: 'garden_repair' as any, instruction: 'Complete the sentence! 👤', instructionTa: 'வாக்கியத்தை சரிசெய்யுங்க! 👤', sentence: '___ is writing on the board.', options: [{ text: 'The teacher 👩‍🏫', correct: true }, { text: 'The dog 🐶', correct: false }, { text: 'The book 📖', correct: false }] }
    ]
  },
  {
    id: 22,
    title: 'Animal names 🦁',
    titleEn: 'Animal names',
    mascot: '🦁',
    color: 'from-violet-400 to-purple-500',
    borderColor: 'border-violet-300',
    questions: [
      // Q1: Match animal to sound/action
      { type: 'connect_pairs' as any, instruction: 'Connect animal to their home/food! 🔗', instructionTa: 'விலங்குகளை இணைக்கவும்! 🔗', pairs: [{ left: 'cow 🐄', right: 'grass 🌿' }, { left: 'dog 🐕', right: 'kennel 🏠' }, { left: 'bird 🐦', right: 'nest 🪹' }], options: [] },
      // Q2: Grid Search
      { type: 'grid_search' as any, instruction: 'Find all animal names! 🔍', instructionTa: 'விலங்குகளின் பெயர்களைக் கண்டுபிடி! 🔍', gridItems: [{ text: 'lion', correct: true, emoji: '🦁' }, { text: 'cat', correct: true, emoji: '🐱' }, { text: 'cow', correct: true, emoji: '🐄' }, { text: 'Mia', correct: false, emoji: '👧' }, { text: 'pen', correct: false, emoji: '🖊️' }, { text: 'park', correct: false, emoji: '🏞️' }], options: [] },
      // Q3: Highlight animal name
      { type: 'detective_highlight' as any, category: 'Animal Name', instruction: 'Find the animal name in the sentence!', instructionTa: 'விலங்குப் பெயர்ச்சொல்லைக் கண்டுபிடி!', sentence: 'A green frog hops.', targetWord: 'frog', options: [] },
      // Q4: Garden Repair
      { type: 'garden_repair' as any, instruction: 'Fix the sentence! 🌱', instructionTa: 'வாக்கியத்தை சரிசெய்யுங்க! 🌱', sentence: 'The ___ barked at the mailman.', options: [{ text: 'dog 🐶', correct: true }, { text: 'cat 🐱', correct: false }, { text: 'bird 🐦', correct: false }] }
    ]
  },
  {
    id: 23,
    title: 'Things around us 🎒',
    titleEn: 'Things around us',
    mascot: '🎒',
    color: 'from-violet-400 to-purple-500',
    borderColor: 'border-violet-300',
    questions: [
      // Q1: Match tool to action
      { type: 'connect_pairs' as any, instruction: 'Match the thing with its use! 🔗', instructionTa: 'பொருட்களைப் பயன்பாட்டுடன் இணைக்கவும்! 🔗', pairs: [{ left: 'pencil ✏️', right: 'writing 📝' }, { left: 'ball ⚽', right: 'playing 🏃' }, { left: 'cup 🥛', right: 'drinking 🥛' }], options: [] },
      // Q2: Grid search
      { type: 'grid_search' as any, instruction: 'Find all names of things! 🔍', instructionTa: 'பொருட்களின் பெயர்களைக் கண்டுபிடி! 🔍', gridItems: [{ text: 'bag', correct: true, emoji: '🎒' }, { text: 'pen', correct: true, emoji: '🖊️' }, { text: 'book', correct: true, emoji: '📖' }, { text: 'Rahul', correct: false, emoji: '👦' }, { text: 'tiger', correct: false, emoji: '🐅' }, { text: 'Chennai', correct: false, emoji: '🌆' }], options: [] },
      // Q3: Garden Repair
      { type: 'garden_repair' as any, instruction: 'Complete the sentence! 🎒', instructionTa: 'வாக்கியத்தை சரிசெய்யுங்க! 🎒', sentence: 'Put your books inside your ___.', options: [{ text: 'bag 🎒', correct: true }, { text: 'dog 🐶', correct: false }, { text: 'star 🌟', correct: false }] },
      // Q4: Highlight
      { type: 'detective_highlight' as any, category: 'Thing Name', instruction: 'Find the thing name!', instructionTa: 'பொருளின் பெயர்ச்சொல்லைக் கண்டுபிடி!', sentence: 'Keep the clean cup on table.', targetWord: 'cup', options: [] }
    ]
  },
  {
    id: 24,
    title: 'Places 🏫',
    titleEn: 'Places',
    mascot: '🏫',
    color: 'from-violet-400 to-purple-500',
    borderColor: 'border-violet-300',
    questions: [
      // Q1: Match place to activity
      { type: 'connect_pairs' as any, instruction: 'Match place with activity! 🔗', instructionTa: 'இடங்களைச் செயல்களுடன் இணைக்கவும்! 🔗', pairs: [{ left: 'school 🏫', right: 'learning 📖' }, { left: 'park 🏞️', right: 'playing 🎡' }, { left: 'hospital 🏥', right: 'healing 🩺' }], options: [] },
      // Q2: Grid search
      { type: 'grid_search' as any, instruction: 'Find all place names! 🔍', instructionTa: 'இடங்களின் பெயர்களைக் கண்டுபிடி! 🔍', gridItems: [{ text: 'school', correct: true, emoji: '🏫' }, { text: 'park', correct: true, emoji: '🏞️' }, { text: 'zoo', correct: true, emoji: '🦁' }, { text: 'pencil', correct: false, emoji: '✏️' }, { text: 'rabbit', correct: false, emoji: '🐰' }, { text: 'Riya', correct: false, emoji: '👧' }], options: [] },
      // Q3: Garden Repair
      { type: 'garden_repair' as any, instruction: 'Complete the sentence! 🏫', instructionTa: 'வாக்கியத்தை சரிசெய்யுங்க! 🏫', sentence: 'We saw monkeys and tigers at the ___.', options: [{ text: 'zoo 🦁', correct: true }, { text: 'school 🏫', correct: false }, { text: 'house 🏠', correct: false }] },
      // Q4: Highlight
      { type: 'detective_highlight' as any, category: 'Place Name', instruction: 'Find the place name!', instructionTa: 'இடத்தின் பெயர்ச்சொல்லைக் கண்டுபிடி!', sentence: 'He swam in the beach.', targetWord: 'beach', options: [] }
    ]
  },
  {
    id: 25,
    title: 'One & Many 🔢',
    titleEn: 'One & Many',
    mascot: '🔢',
    color: 'from-violet-400 to-purple-500',
    borderColor: 'border-violet-300',
    questions: [
      // Q1: Connect singular to plural
      { type: 'connect_pairs' as any, instruction: 'Match Singular (One) to Plural (Many)! 🔗', instructionTa: 'ஒருமை - பன்மையை இணைக்கவும்! 🔗', pairs: [{ left: 'cat 🐱', right: 'cats 🐱🐱' }, { left: 'ball ⚽', right: 'balls ⚽⚽' }, { left: 'tree 🌲', right: 'trees 🌲🌲' }], options: [] },
      // Q2: Garden Repair (Singular context)
      { type: 'garden_repair' as any, instruction: 'Complete the sentence! 🔢', instructionTa: 'வாக்கியத்தை சரிசெய்யுங்க! 🔢', sentence: 'There is only one ___ on the plate.', options: [{ text: 'apple 🍎', correct: true }, { text: 'apples 🍎🍎', correct: false }] },
      // Q3: Garden Repair (Plural context)
      { type: 'garden_repair' as any, instruction: 'Complete the sentence! 🔢', instructionTa: 'வாக்கியத்தை சரிசெய்யுங்க! 🔢', sentence: 'I can see many ___ flying in the sky.', options: [{ text: 'birds 🦅', correct: true }, { text: 'bird 🦅', correct: false }] },
      // Q4: Grid Search for plurals
      { type: 'grid_search' as any, instruction: 'Find all plural words (ending in -s)! 🔍', instructionTa: 'பன்மைச் சொற்களைக் கண்டுபிடி! 🔍', gridItems: [{ text: 'dogs', correct: true, emoji: '🐶' }, { text: 'pens', correct: true, emoji: '🖊️' }, { text: 'toys', correct: true, emoji: '🧸' }, { text: 'cat', correct: false, emoji: '❌' }, { text: 'house', correct: false, emoji: '❌' }, { text: 'star', correct: false, emoji: '❌' }], options: [] }
    ]
  },


  // --- CHAPTER 6: GRAMMAR GARDEN (Levels 26 - 31) ---
  {
     id: 26,
     title: 'Nouns 👥',
     titleEn: 'Nouns',
     mascot: '👥',
     color: 'from-indigo-400 to-blue-500',
     borderColor: 'border-indigo-300',
     questions: [
       // Q1: Concept Learn Card
       { type: 'learn_card' as any, conceptTitle: 'What is a Noun? 👥', mascot: '👥', explanation: 'A Noun is a naming word! It is the name of a person (boy 👦), place (school 🏫), animal (cat 🐱), or thing (book 📖).', explanationTa: 'பெயர்ச்சொல் என்பது ஒரு நபர், இடம், விலங்கு அல்லது பொருளின் பெயர்! 👥', examples: ['Rahul 👦', 'Chennai 🏫', 'Dog 🐶', 'Pen 🖊️'], options: [] },
       // Q2: Match Category
       { type: 'connect_pairs' as any, instruction: 'Match noun with its category! 🔗', instructionTa: 'பெயர்ச்சொல்லை வகையுடன் இணைக்கவும்! 🔗', pairs: [{ left: 'Sita 👧', right: 'Person' }, { left: 'Lion 🦁', right: 'Animal' }, { left: 'Park 🏞️', right: 'Place' }], options: [] },
       // Q3: Grid Search
       { type: 'grid_search' as any, instruction: 'Find all naming words (Nouns)! 🔍', instructionTa: 'பெயர்ச்சொற்களைக் கண்டுபிடி! 🔍', gridItems: [{ text: 'Mia', correct: true, emoji: '👧' }, { text: 'book', correct: true, emoji: '📖' }, { text: 'cat', correct: true, emoji: '🐱' }, { text: 'run', correct: false, emoji: '❌' }, { text: 'happy', correct: false, emoji: '❌' }, { text: 'he', correct: false, emoji: '❌' }], options: [] },
       // Q4: Detective Zone
       { type: 'detective_highlight' as any, category: 'Noun', instruction: 'Find the Noun (Naming Word) in the sentence!', instructionTa: 'பெயர்ச்சொல்லைக் கண்டுபிடி!', sentence: 'The dog runs fast.', targetWord: 'dog', options: [] },
       // Q5: Garden Repair
       { type: 'garden_repair' as any, instruction: 'Complete the sentence with a Noun! ✏️', instructionTa: 'பெயர்ச்சொல்லால் வாக்கியத்தை நிரப்புக! ✏️', sentence: 'We go to ___ to learn.', options: [{ text: 'school 🏫', correct: true }, { text: 'run 🏃', correct: false }, { text: 'big 📦', correct: false }] }
     ]
  },
  {
    id: 27,
    title: 'Pronouns 🗣️',
    titleEn: 'Pronouns',
    mascot: '🗣️',
    color: 'from-indigo-400 to-blue-500',
    borderColor: 'border-indigo-300',
    questions: [
      // Q1: Concept Learn Card
      { type: 'learn_card' as any, conceptTitle: 'What is a Pronoun? 🗣️', mascot: '🗣️', explanation: 'Pronouns are words we use instead of Nouns! We use HE for boys 👦, SHE for girls 👧, and IT for animals or objects 🐶.', explanationTa: 'பெயர்ச்சொல்லுக்குப் பதிலாகப் பயன்படுத்தப்படும் சொற்கள் பிரதிப்பெயர்ச்சொற்கள் (Pronouns) ஆகும்! 🗣️', examples: ['He (Rahul) 👦', 'She (Mia) 👧', 'It (Cat) 🐱', 'It (Pen) 🖊️'], options: [] },
      // Q2: Match pronoun
      { type: 'connect_pairs' as any, instruction: 'Match the naming word to its pronoun! 🔗', instructionTa: 'பெயர்ச்சொல்லை பிரதிபெயர்ச்சொல்லுடன் இணைக்கவும்! 🔗', pairs: [{ left: 'Rohan 👦', right: 'He' }, { left: 'Sara 👧', right: 'She' }, { left: 'Cup 🥛', right: 'It' }], options: [] },
      // Q3: Garden Repair (He)
      { type: 'garden_repair' as any, instruction: 'Choose the correct pronoun! 🗣️', instructionTa: 'சரியானதை நிரப்பவும்! 🗣️', sentence: 'This is Tom. ___ is a happy boy.', options: [{ text: 'He', correct: true }, { text: 'She', correct: false }, { text: 'It', correct: false }] },
      // Q4: Garden Repair (She)
      { type: 'garden_repair' as any, instruction: 'Choose the correct pronoun! 🗣️', instructionTa: 'சரியானதை நிரப்பவும்! 🗣️', sentence: 'This is Riya. ___ loves to dance.', options: [{ text: 'She', correct: true }, { text: 'He', correct: false }, { text: 'It', correct: false }] },
      // Q5: Garden Repair (It)
      { type: 'garden_repair' as any, instruction: 'Choose the correct pronoun! 🗣️', instructionTa: 'சரியானதை நிரப்பவும்! 🗣️', sentence: 'I have a cat. ___ is very cute.', options: [{ text: 'It', correct: true }, { text: 'He', correct: false }, { text: 'She', correct: false }] }
    ]
  },
  {
    id: 28,
    title: 'Action words 🏃',
    titleEn: 'Action words',
    mascot: '🏃',
    color: 'from-indigo-400 to-blue-500',
    borderColor: 'border-indigo-300',
    questions: [
      // Q1: Concept Learn Card
      { type: 'learn_card' as any, conceptTitle: 'What are Action Words? 🏃', mascot: '🏃', explanation: 'Action words (Verbs) show what someone or something is doing! They are words like run 🏃, fly 🦅, eat 🍎, and swim 🏊.', explanationTa: 'செயல் வார்த்தைகள் (Verbs) ஒரு நபர் அல்லது விலங்கு செய்யும் செயலைக் குறிக்கும்! 🏃', examples: ['run 🏃', 'fly 🦅', 'eat 🍎', 'swim 🏊'], options: [] },
      // Q2: Match action word
      { type: 'connect_pairs' as any, instruction: 'Connect animal to their action! 🔗', instructionTa: 'பொருந்தும் செயலை இணைக்கவும்! 🔗', pairs: [{ left: 'birds 🦅', right: 'fly ☁️' }, { left: 'fish 🐟', right: 'swim 🌊' }, { left: 'frogs 🐸', right: 'hop 🪷' }], options: [] },
      // Q3: Grid Search
      { type: 'grid_search' as any, instruction: 'Find all Action Words! 🔍', instructionTa: 'செயல் வார்த்தைகளைக் கண்டுபிடி! 🔍', gridItems: [{ text: 'run', correct: true, emoji: '🏃' }, { text: 'eat', correct: true, emoji: '🍎' }, { text: 'sleep', correct: true, emoji: '😴' }, { text: 'book', correct: false, emoji: '📖' }, { text: 'pen', correct: false, emoji: '🖊️' }, { text: 'school', correct: false, emoji: '🏫' }], options: [] },
      // Q4: Highlight
      { type: 'detective_highlight' as any, category: 'Action Word (Verb)', instruction: 'Find the action word in the sentence!', instructionTa: 'வினைச்சொல்லைக் கண்டுபிடி!', sentence: 'The children play in the garden.', targetWord: 'play', options: [] },
      // Q5: Garden Repair
      { type: 'garden_repair' as any, instruction: 'Complete the sentence with an Action Word! 🏃', instructionTa: 'செயல் சொல்லால் நிரப்புக! 🏃', sentence: 'Sita eats food and ___ water.', options: [{ text: 'drinks 🥛', correct: true }, { text: 'runs 🏃', correct: false }, { text: 'red 🔴', correct: false }] }
    ]
  },
  {
    id: 29,
    title: 'Describing words 🎨',
    titleEn: 'Describing words',
    mascot: '🎨',
    color: 'from-indigo-400 to-blue-500',
    borderColor: 'border-indigo-300',
    questions: [
      // Q1: Concept Learn Card
      { type: 'learn_card' as any, conceptTitle: 'What are Describing Words? 🎨', mascot: '🎨', explanation: 'Describing words (Adjectives) tell us more about a naming word! Like a RED bag 🎒, a BIG elephant 🐘, or a HAPPY boy 👦.', explanationTa: 'விவரிக்கும் சொற்கள் (Adjectives) ஒரு பெயர்ச்சொல்லைப் பற்றி மேலும் விளக்குகின்றன! 🎨', examples: ['red bag 🎒', 'big dog 🐕', 'hot sun ☀️', 'sweet apple 🍎'], options: [] },
      // Q2: Connect noun to descriptor
      { type: 'connect_pairs' as any, instruction: 'Match the naming word to its descriptor! 🔗', instructionTa: 'பெயர்ச்சொல்லை விவரிக்கும் சொல்லுடன் பொருத்துக! 🔗', pairs: [{ left: 'Lemon 🍋', right: 'sour 😖' }, { left: 'Ice ❄️', right: 'cold ❄️' }, { left: 'Giraffe 🦒', right: 'tall 🦒' }], options: [] },
      // Q3: Highlight
      { type: 'detective_highlight' as any, category: 'Describing Word (Adjective)', instruction: 'Find the describing word in the sentence!', sentence: 'Mia has a sweet red apple.', targetWord: 'red', options: [] },
      // Q4: Garden Repair
      { type: 'garden_repair' as any, instruction: 'Complete the sentence with a describing word! 🎨', instructionTa: 'வாக்கியத்தை சரிசெய்யுங்க! 🎨', sentence: 'Look at the ___ stars in the sky.', options: [{ text: 'bright 🌟', correct: true }, { text: 'run 🏃', correct: false }, { text: 'he 👦', correct: false }] }
    ]
  },
  {
    id: 30,
    title: 'Opposites ⚖️',
    titleEn: 'Opposites',
    mascot: '⚖️',
    color: 'from-indigo-400 to-blue-500',
    borderColor: 'border-indigo-300',
    questions: [
      // Q1: Concept Learn Card
      { type: 'learn_card' as any, conceptTitle: 'What are Opposites? ⚖️', mascot: '⚖️', explanation: 'Opposites are word pairs that are completely different! Like hot ☀️ and cold ❄️, big 🐘 and small 🐭, or up ⬆️ and down ⬇️.', explanationTa: 'எதிர்ச்சொற்கள் என்பவை முற்றிலும் மாறுபட்ட அர்த்தம் கொண்ட சொற்கள்! ⚖️', examples: ['hot / cold ☀️❄️', 'big / small 🐘🐭', 'up / down ⬆️⬇️', 'happy / sad 😃😢'], options: [] },
      // Q2: Connect Opposites
      { type: 'connect_pairs' as any, instruction: 'Match the opposite words! 🔗', instructionTa: 'எதிர்ச்சொற்களைப் பொருத்துக! 🔗', pairs: [{ left: 'happy 😃', right: 'sad 😢' }, { left: 'hot ☀️', right: 'cold ❄️' }, { left: 'big 🐘', right: 'small 🐭' }], options: [] },
      // Q3: Garden Repair
      { type: 'garden_repair' as any, instruction: 'Complete the sentence with an opposite! ⚖️', instructionTa: 'வாக்கியத்தை சரிசெய்யுங்க! ⚖️', sentence: 'The sun is hot, but ice is ___.', options: [{ text: 'cold ❄️', correct: true }, { text: 'big 🐘', correct: false }, { text: 'happy 😃', correct: false }] },
      // Q4: Grid Search for opposites
      { type: 'grid_search' as any, instruction: 'Find opposites of "UP"! 🔍', instructionTa: '"UP" இன் எதிர்ச்சொல்லைத் தேர்ந்தெடு! 🔍', gridItems: [{ text: 'down', correct: true, emoji: '⬇️' }, { text: 'down', correct: true, emoji: '👇' }, { text: 'down', correct: true, emoji: '⏬' }, { text: 'hot', correct: false, emoji: '❌' }, { text: 'big', correct: false, emoji: '❌' }, { text: 'happy', correct: false, emoji: '❌' }], options: [] }
    ]
  },
  {
    id: 31,
    title: 'Position words 📦',
    titleEn: 'Position words',
    mascot: '📦',
    color: 'from-indigo-400 to-blue-500',
    borderColor: 'border-indigo-300',
    questions: [
      // Q1: Concept Learn Card
      { type: 'learn_card' as any, conceptTitle: 'What are Position Words? 📦', mascot: '📦', explanation: 'Position words (Prepositions) tell us where something is! Like ON the table 📚, IN the basket 🧺, or UNDER the bed 🛌.', explanationTa: 'இடத்தைக் குறிக்கும் சொற்கள் (Prepositions) ஒரு பொருள் எங்குள்ளது என்பதைத் தெரிவிக்கின்றன! 📦', examples: ['on table 📚', 'in basket 🧺', 'under bed 🛌', 'in box 📦'], options: [] },
      // Q2: Connect
      { type: 'connect_pairs' as any, instruction: 'Match position word to picture! 🔗', instructionTa: 'இட சொற்களைப் பொருத்துக! 🔗', pairs: [{ left: 'on 📚', right: 'top of table' }, { left: 'in 🧺', right: 'inside basket' }, { left: 'under 🛌', right: 'below bed' }], options: [] },
      // Q3: Garden Repair
      { type: 'garden_repair' as any, instruction: 'Choose the correct position word! 📦', instructionTa: 'சரியான இடச்சொல்லைத் தேர்ந்தெடு! 📦', sentence: 'The fish swims ___ the water.', options: [{ text: 'in', correct: true }, { text: 'on', correct: false }, { text: 'under', correct: false }] },
      // Q4: Garden Repair
      { type: 'garden_repair' as any, instruction: 'Choose the correct position word! 📦', instructionTa: 'சரியான இடச்சொல்லைத் தேர்ந்தெடு! 📦', sentence: 'A cute cat is sleeping ___ the chair.', options: [{ text: 'under', correct: true }, { text: 'on', correct: false }, { text: 'in', correct: false }] }
    ]
  },

  // --- CHAPTER 7: SENTENCE TRAIN (Levels 34 - 38) ---
  {
    id: 32,
    title: 'Two word sentences 🚂',
    titleEn: 'Two word sentences',
    mascot: '🚂',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      { type: 'sentence_train' as any, instruction: 'Assemble the sentence coaches!', words: ['runs', 'He'], correctSentence: 'He runs', options: [] },
      { type: 'sentence_train' as any, instruction: 'Assemble the sentence coaches!', words: ['sleeps', 'She'], correctSentence: 'She sleeps', options: [] },
      { type: 'sentence_train' as any, instruction: 'Assemble the sentence coaches!', words: ['fly', 'Birds'], correctSentence: 'Birds fly', options: [] },
      { type: 'sentence_train' as any, instruction: 'Assemble the sentence coaches!', words: ['shines', 'Sun'], correctSentence: 'Sun shines', options: [] },
      { type: 'sentence_train' as any, instruction: 'Assemble the sentence coaches!', words: ['play', 'They'], correctSentence: 'They play', options: [] }
    ]
  },
  {
    id: 33,
    title: 'Three word sentences 🚃',
    titleEn: 'Three word sentences',
    mascot: '🚃',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      { type: 'sentence_train' as any, instruction: 'Assemble the sentence train!', words: ['happy', 'is', 'Mia'], correctSentence: 'Mia is happy', options: [] },
      { type: 'sentence_train' as any, instruction: 'Assemble the sentence train!', words: ['like', 'I', 'apples'], correctSentence: 'I like apples', options: [] },
      { type: 'sentence_train' as any, instruction: 'Assemble the sentence train!', words: ['cat', 'The', 'sleeps'], correctSentence: 'The cat sleeps', options: [] },
      { type: 'sentence_train' as any, instruction: 'Assemble the sentence train!', words: ['has', 'Rahul', 'ball'], correctSentence: 'Rahul has ball', options: [] },
      { type: 'sentence_train' as any, instruction: 'Assemble the sentence train!', words: ['tall', 'is', 'He'], correctSentence: 'He is tall', options: [] }
    ]
  },
  {
    id: 34,
    title: 'Make simple sentences 🏁',
    titleEn: 'Make simple sentences',
    mascot: '🏁',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      { type: 'sentence_train' as any, instruction: 'Make a simple sentence!', words: ['red', 'bag', 'Riya', 'has'], correctSentence: 'Riya has red bag', options: [] },
      { type: 'sentence_train' as any, instruction: 'Make a simple sentence!', words: ['park', 'We', 'play', 'in'], correctSentence: 'We play in park', options: [] },
      { type: 'sentence_train' as any, instruction: 'Make a simple sentence!', words: ['big', 'The', 'is', 'elephant'], correctSentence: 'The elephant is big', options: [] },
      { type: 'sentence_train' as any, instruction: 'Make a simple sentence!', words: ['like', 'I', 'read', 'to'], correctSentence: 'I like to read', options: [] },
      { type: 'sentence_train' as any, instruction: 'Make a simple sentence!', words: ['plays', 'with', 'Rahul', 'toy'], correctSentence: 'Rahul plays with toy', options: [] }
    ]
  },
  {
    id: 35,
    title: 'Question sentences ❓',
    titleEn: 'Question sentences',
    mascot: '❓',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      { type: 'sentence_train' as any, instruction: 'Hook up the question train!', words: ['you', 'Who', 'are'], correctSentence: 'Who are you', options: [] },
      { type: 'sentence_train' as any, instruction: 'Hook up the question train!', words: ['is', 'What', 'this'], correctSentence: 'What is this', options: [] },
      { type: 'sentence_train' as any, instruction: 'Hook up the question train!', words: ['my', 'Where', 'is', 'ball'], correctSentence: 'Where is my ball', options: [] },
      { type: 'sentence_train' as any, instruction: 'Hook up the question train!', words: ['he', 'Is', 'happy'], correctSentence: 'Is he happy', options: [] },
      { type: 'sentence_train' as any, instruction: 'Hook up the question train!', words: ['can', 'you', 'run'], correctSentence: 'can you run', options: [] }
    ]
  },
  {
    id: 36,
    title: 'Arrange sentence 🚂',
    titleEn: 'Arrange sentence',
    mascot: '🚂',
    color: 'from-pink-400 to-rose-500',
    borderColor: 'border-pink-300',
    questions: [
      { type: 'sentence_train' as any, instruction: 'Complete the train!', words: ['school', 'go', 'We', 'to'], correctSentence: 'We go to school', options: [] },
      { type: 'sentence_train' as any, instruction: 'Complete the train!', words: ['shines', 'sun', 'The', 'bright'], correctSentence: 'The sun shines bright', options: [] },
      { type: 'sentence_train' as any, instruction: 'Complete the train!', words: ['ball', 'plays', 'He', 'with'], correctSentence: 'He plays with ball', options: [] },
      { type: 'sentence_train' as any, instruction: 'Complete the train!', words: ['loves', 'dog', 'She', 'her'], correctSentence: 'She loves her dog', options: [] },
      { type: 'sentence_train' as any, instruction: 'Complete the train!', words: ['beautiful', 'is', 'flower', 'This'], correctSentence: 'This flower is beautiful', options: [] }
    ]
  },

  // --- CHAPTER 8: READING CAVE (Levels 39 - 43) ---
  {
    id: 37,
    title: 'Picture reading 📖',
    titleEn: 'Picture reading',
    mascot: '📖',
    color: 'from-purple-500 to-fuchsia-500',
    borderColor: 'border-purple-300',
    questions: [
      { type: 'story_cave' as any, instruction: 'Read the story and answer!', storyText: 'Mia has a red ball. She plays in the park.', questionText: 'What color is Mia\'s ball?', options: [{ text: 'red 🔴', correct: true }, { text: 'blue 🔵', correct: false }] },
      { type: 'story_cave' as any, instruction: 'Read the story and answer!', storyText: 'Mia has a red ball. She plays in the park.', questionText: 'Where does she play?', options: [{ text: 'park 🏞️', correct: true }, { text: 'school 🏫', correct: false }] },
      { type: 'story_cave' as any, instruction: 'Read the story and answer!', storyText: 'Leo is a little lion. He likes to eat meat.', questionText: 'Who is Leo?', options: [{ text: 'lion 🦁', correct: true }, { text: 'bear 🐻', correct: false }] },
      { type: 'story_cave' as any, instruction: 'Read the story and answer!', storyText: 'Leo is a little lion. He likes to eat meat.', questionText: 'What does Leo like to eat?', options: [{ text: 'meat 🥩', correct: true }, { text: 'grass 🌿', correct: false }] },
      { type: 'story_cave' as any, instruction: 'Read the story and answer!', storyText: 'Riya has a green parrot. It can talk.', questionText: 'What pet does Riya have?', options: [{ text: 'parrot 🦜', correct: true }, { text: 'cat 🐱', correct: false }] }
    ]
  },
  {
    id: 38,
    title: 'Small passages 🏞️',
    titleEn: 'Small passages',
    mascot: '🏞️',
    color: 'from-purple-500 to-fuchsia-500',
    borderColor: 'border-purple-300',
    questions: [
      { type: 'story_cave' as any, instruction: 'Read the passage and answer!', storyText: 'Sam has a toy train. The train goes choo-choo on the track.', questionText: 'What toy does Sam have?', options: [{ text: 'train 🚂', correct: true }, { text: 'car 🚗', correct: false }] },
      { type: 'story_cave' as any, instruction: 'Read the passage and answer!', storyText: 'Sam has a toy train. The train goes choo-choo on the track.', questionText: 'What sound does the train make?', options: [{ text: 'choo-choo 🚂', correct: true }, { text: 'beep-beep 🚗', correct: false }] },
      { type: 'story_cave' as any, instruction: 'Read the passage and answer!', storyText: 'A blue bird is on the tree. It sings a happy song.', questionText: 'What color is the bird?', options: [{ text: 'blue 🔵', correct: true }, { text: 'red 🔴', correct: false }] },
      { type: 'story_cave' as any, instruction: 'Read the passage and answer!', storyText: 'A blue bird is on the tree. It sings a happy song.', questionText: 'Where is the bird?', options: [{ text: 'on the tree 🌳', correct: true }, { text: 'on the roof 🏠', correct: false }] },
      { type: 'story_cave' as any, instruction: 'Read the passage and answer!', storyText: 'We went to the beach. We made a big sandcastle.', questionText: 'Where did we go?', options: [{ text: 'beach 🏖️', correct: true }, { text: 'park 🏞️', correct: false }] }
    ]
  },
  {
    id: 39,
    title: 'Answer finding 🔍',
    titleEn: 'Answer finding',
    mascot: '🔍',
    color: 'from-purple-500 to-fuchsia-500',
    borderColor: 'border-purple-300',
    questions: [
      { type: 'story_cave' as any, instruction: 'Find the answer!', storyText: 'Tim has a fat cat. The cat likes to sleep on the rug.', questionText: 'What is Tim\'s cat like?', options: [{ text: 'fat 🐱', correct: true }, { text: 'thin 🐱', correct: false }] },
      { type: 'story_cave' as any, instruction: 'Find the answer!', storyText: 'Tim has a fat cat. The cat likes to sleep on the rug.', questionText: 'Where does the cat sleep?', options: [{ text: 'rug 🧹', correct: true }, { text: 'box 📦', correct: false }] },
      { type: 'story_cave' as any, instruction: 'Find the answer!', storyText: 'Ben has a red bicycle. He rides it to school.', questionText: 'What color is Ben\'s bicycle?', options: [{ text: 'red 🔴', correct: true }, { text: 'green 🟢', correct: false }] },
      { type: 'story_cave' as any, instruction: 'Find the answer!', storyText: 'Ben has a red bicycle. He rides it to school.', questionText: 'Where does Ben ride?', options: [{ text: 'school 🏫', correct: true }, { text: 'park 🏞️', correct: false }] },
      { type: 'story_cave' as any, instruction: 'Find the answer!', storyText: 'It is raining. Mia wears a yellow raincoat.', questionText: 'What does Mia wear?', options: [{ text: 'raincoat 🧥', correct: true }, { text: 'hat 👒', correct: false }] }
    ]
  },
  {
    id: 40,
    title: 'Story sequence ⛓️',
    titleEn: 'Story sequence',
    mascot: '⛓️',
    color: 'from-purple-500 to-fuchsia-500',
    borderColor: 'border-purple-300',
    questions: [
      { type: 'story_cave' as any, isSequence: true, instruction: 'Sequence the events!', storyText: 'First, Mia wakes up. Next, she eats breakfast.', sequenceSteps: ['First, Mia wakes up', 'Next, she eats breakfast'], options: [] },
      { type: 'story_cave' as any, isSequence: true, instruction: 'Sequence the events!', storyText: 'First, the egg hatches. Then, a chick comes out.', sequenceSteps: ['First, the egg hatches', 'Then, a chick comes out'], options: [] },
      { type: 'story_cave' as any, isSequence: true, instruction: 'Sequence the events!', storyText: 'First, it rains. Then, a rainbow appears.', sequenceSteps: ['First, it rains', 'Then, a rainbow appears'], options: [] },
      { type: 'story_cave' as any, isSequence: true, instruction: 'Sequence the events!', storyText: 'First, plant a seed. Next, water it daily.', sequenceSteps: ['First, plant a seed', 'Next, water it daily'], options: [] },
      { type: 'story_cave' as any, isSequence: true, instruction: 'Sequence the events!', storyText: 'First, blow the balloon. Then, tie a knot.', sequenceSteps: ['First, blow the balloon', 'Then, tie a knot'], options: [] }
    ]
  },
  {
    id: 41,
    title: 'Story understanding 🧠',
    titleEn: 'Story understanding',
    mascot: '🧠',
    color: 'from-purple-500 to-fuchsia-500',
    borderColor: 'border-purple-300',
    questions: [
      { type: 'story_cave' as any, instruction: 'Understand the card!', storyText: 'Sita has two apples. She gives one to her brother.', questionText: 'How many apples does Sita have first?', options: [{ text: 'two 🍎🍎', correct: true }, { text: 'one 🍎', correct: false }] },
      { type: 'story_cave' as any, instruction: 'Understand the card!', storyText: 'Sita has two apples. She gives one to her brother.', questionText: 'Who does she give the apple to?', options: [{ text: 'brother 👦', correct: true }, { text: 'sister 👧', correct: false }] },
      { type: 'story_cave' as any, instruction: 'Understand the card!', storyText: 'The frog jumps into the pond. It swims with the fish.', questionText: 'Where does the frog jump?', options: [{ text: 'pond 🏞️', correct: true }, { text: 'well 🕳️', correct: false }] },
      { type: 'story_cave' as any, instruction: 'Understand the card!', storyText: 'The frog jumps into the pond. It swims with the fish.', questionText: 'Who does it swim with?', options: [{ text: 'fish 🐟', correct: true }, { text: 'ducks 🦆', correct: false }] },
      { type: 'story_cave' as any, instruction: 'Understand the card!', storyText: 'We fly a red kite. The wind carries it up.', questionText: 'What color is the kite?', options: [{ text: 'red 🔴', correct: true }, { text: 'blue 🔵', correct: false }] }
    ]
  },

  // --- CHAPTER 9: WRITING ZONE (Levels 44 - 48) ---
  {
    id: 42,
    title: 'Letter writing ✍️',
    titleEn: 'Letter writing',
    mascot: '✍️',
    color: 'from-purple-400 to-fuchsia-500',
    borderColor: 'border-purple-300',
    questions: [
      { type: 'writing_lab' as any, subType: 'trace', instruction: 'Trace the letter A neat and clean!', letter: 'A', options: [] },
      { type: 'writing_lab' as any, subType: 'trace', instruction: 'Trace the letter B neat and clean!', letter: 'B', options: [] },
      { type: 'writing_lab' as any, subType: 'trace', instruction: 'Trace the letter C neat and clean!', letter: 'C', options: [] },
      { type: 'writing_lab' as any, subType: 'trace', instruction: 'Trace the letter D neat and clean!', letter: 'D', options: [] },
      { type: 'writing_lab' as any, subType: 'trace', instruction: 'Trace the letter E neat and clean!', letter: 'E', options: [] }
    ]
  },
  {
    id: 43,
    title: 'Word writing 📝',
    titleEn: 'Word writing',
    mascot: '📝',
    color: 'from-purple-400 to-fuchsia-500',
    borderColor: 'border-purple-300',
    questions: [
      { type: 'writing_lab' as any, subType: 'trace', instruction: 'Trace the word: Cat 🐱', letter: 'Cat', options: [] },
      { type: 'writing_lab' as any, subType: 'trace', instruction: 'Trace the word: Dog 🐶', letter: 'Dog', options: [] },
      { type: 'writing_lab' as any, subType: 'trace', instruction: 'Trace the word: Boy 👦', letter: 'Boy', options: [] },
      { type: 'writing_lab' as any, subType: 'trace', instruction: 'Trace the word: Girl 👧', letter: 'Girl', options: [] },
      { type: 'writing_lab' as any, subType: 'trace', instruction: 'Trace the word: Sun ☀️', letter: 'Sun', options: [] }
    ]
  },
  {
    id: 44,
    title: 'Copy sentence 📰',
    titleEn: 'Copy sentence',
    mascot: '📰',
    color: 'from-purple-400 to-fuchsia-500',
    borderColor: 'border-purple-300',
    questions: [
      { type: 'writing_lab' as any, subType: 'trace', instruction: 'Trace the word: This ✍️', letter: 'This', options: [] },
      { type: 'writing_lab' as any, subType: 'trace', instruction: 'Trace the word: That ✍️', letter: 'That', options: [] },
      { type: 'writing_lab' as any, subType: 'trace', instruction: 'Trace the word: Here ✍️', letter: 'Here', options: [] },
      { type: 'writing_lab' as any, subType: 'trace', instruction: 'Trace the word: They ✍️', letter: 'They', options: [] },
      { type: 'writing_lab' as any, subType: 'trace', instruction: 'Trace the word: With ✍️', letter: 'With', options: [] }
    ]
  },
  {
    id: 45,
    title: 'Complete sentence 📝',
    titleEn: 'Complete sentence',
    mascot: '📝',
    color: 'from-purple-400 to-fuchsia-500',
    borderColor: 'border-purple-300',
    questions: [
      { type: 'writing_lab' as any, subType: 'complete', instruction: 'Complete the writing board!', sentence: 'I like ___', options: [{ text: 'apples 🍎', correct: true }, { text: 'running 🏃', correct: false }] },
      { type: 'writing_lab' as any, subType: 'complete', instruction: 'Complete the writing board!', sentence: 'This is my ___', options: [{ text: 'school 🏫', correct: true }, { text: 'flying 🦅', correct: false }] },
      { type: 'writing_lab' as any, subType: 'complete', instruction: 'Complete the writing board!', sentence: 'The dog is ___', options: [{ text: 'barking 🐶', correct: true }, { text: 'jumping 🦘', correct: false }] },
      { type: 'writing_lab' as any, subType: 'complete', instruction: 'Complete the writing board!', sentence: 'We see the ___', options: [{ text: 'stars ✨', correct: true }, { text: 'eating 🍽️', correct: false }] },
      { type: 'writing_lab' as any, subType: 'complete', instruction: 'Complete the writing board!', sentence: 'She has a ___', options: [{ text: 'toy 🧸', correct: true }, { text: 'playing 🎮', correct: false }] }
    ]
  },
  {
    id: 46,
    title: 'Create sentence 🧱',
    titleEn: 'Create sentence',
    mascot: '🧱',
    color: 'from-purple-400 to-fuchsia-500',
    borderColor: 'border-purple-300',
    questions: [
      { type: 'writing_lab' as any, subType: 'complete', instruction: 'Complete: Rahul plays ___', sentence: 'Rahul plays ___', options: [{ text: 'football ⚽', correct: true }, { text: 'happy 😄', correct: false }] },
      { type: 'writing_lab' as any, subType: 'complete', instruction: 'Complete: Birds can ___', sentence: 'Birds can ___', options: [{ text: 'fly 🦅', correct: true }, { text: 'sing 🎤', correct: false }] },
      { type: 'writing_lab' as any, subType: 'complete', instruction: 'Complete: Mother eats ___', sentence: 'Mother eats ___', options: [{ text: 'cake 🍰', correct: true }, { text: 'sleeping 😴', correct: false }] },
      { type: 'writing_lab' as any, subType: 'complete', instruction: 'Complete: The train is ___', sentence: 'The train is ___', options: [{ text: 'moving 🚂', correct: true }, { text: 'happy 😊', correct: false }] },
      { type: 'writing_lab' as any, subType: 'complete', instruction: 'Complete: We have many ___', sentence: 'We have many ___', options: [{ text: 'books 📚', correct: true }, { text: 'eating 🍽️', correct: false }] }
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

export const GRADE1_HINDI_LEVELS: Level[] = [];

export const GRADE1_TAMIL_LEVELS: Level[] = [
  // --- CHAPTER 1: எழுத்து உலகம் 🌈 (Levels 1 - 5) ---
  {
    id: 1,
    title: 'உயிர் எழுத்து மீள்பார்வை 🌈',
    titleEn: 'Vowels Revision',
    mascot: '🌈',
    color: 'from-cyan-400 to-blue-500',
    borderColor: 'border-cyan-300',
    questions: [
      { type: 'letter_board' as any, instruction: 'உயிர் எழுத்துக்கள் - Tamil Vowels 🌈', instructionTa: 'எல்லா உயிர் எழுத்துக்களையும் பார்க்கவும்!', boardTitle: 'உயிர் எழுத்துக்கள்', boardSubtitle: 'Tamil Vowels (12+1)', letters: ['அ','ஆ','இ','ஈ','உ','ஊ','எ','ஏ','ஐ','ஒ','ஓ','ஔ','ஃ'], color: 'from-cyan-400 to-blue-500', options: [] },
      { type: 'trace' as any, instruction: 'Trace: அ ✍️', instructionTa: 'எழுத்தை எழுதுக: அ', letter: 'அ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ஆ ✍️', instructionTa: 'எழுத்தை எழுதுக: ஆ', letter: 'ஆ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: இ ✍️', instructionTa: 'எழுத்தை எழுதுக: இ', letter: 'இ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ஈ ✍️', instructionTa: 'எழுத்தை எழுதுக: ஈ', letter: 'ஈ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: உ ✍️', instructionTa: 'எழுத்தை எழுதுக: உ', letter: 'உ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ஊ ✍️', instructionTa: 'எழுத்தை எழுதுக: ஊ', letter: 'ஊ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: எ ✍️', instructionTa: 'எழுத்தை எழுதுக: எ', letter: 'எ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ஏ ✍️', instructionTa: 'எழுத்தை எழுதுக: ஏ', letter: 'ஏ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ஐ ✍️', instructionTa: 'எழுத்தை எழுதுக: ஐ', letter: 'ஐ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ஒ ✍️', instructionTa: 'எழுத்தை எழுதுக: ஒ', letter: 'ஒ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ஓ ✍️', instructionTa: 'எழுத்தை எழுதுக: ஓ', letter: 'ஓ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ஔ ✍️', instructionTa: 'எழுத்தை எழுதுக: ஔ', letter: 'ஔ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ஃ ✍️', instructionTa: 'எழுத்தை எழுதுக: ஃ', letter: 'ஃ', options: [] }
    ]
  },
  {
    id: 2,
    title: 'மெய் எழுத்து மீள்பார்வை 🦁',
    titleEn: 'Consonants Revision',
    mascot: '🦁',
    color: 'from-cyan-400 to-blue-500',
    borderColor: 'border-cyan-300',
    questions: [
      { type: 'letter_board' as any, instruction: 'மெய் எழுத்துக்கள் - Tamil Consonants 🦁', instructionTa: 'எல்லா மெய் எழுத்துக்களையும் பார்க்கவும்!', boardTitle: 'மெய் எழுத்துக்கள்', boardSubtitle: 'Tamil Consonants (18)', letters: ['க்','ங்','ச்','ஞ்','ட்','ண்','த்','ந்','ப்','ம்','ய்','ர்','ல்','வ்','ழ்','ள்','ற்','ன்'], color: 'from-purple-400 to-pink-500', options: [] },
      { type: 'trace' as any, instruction: 'Trace: க் ✍️', instructionTa: 'எழுத்தை எழுதுக: க்', letter: 'க்', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ங் ✍️', instructionTa: 'எழுத்தை எழுதுக: ங்', letter: 'ங்', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ச் ✍️', instructionTa: 'எழுத்தை எழுதுக: ச்', letter: 'ச்', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ஞ் ✍️', instructionTa: 'எழுத்தை எழுதுக: ஞ்', letter: 'ஞ்', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ட் ✍️', instructionTa: 'எழுத்தை எழுதுக: ட்', letter: 'ட்', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ண் ✍️', instructionTa: 'எழுத்தை எழுதுக: ண்', letter: 'ண்', options: [] },
      { type: 'trace' as any, instruction: 'Trace: த் ✍️', instructionTa: 'எழுத்தை எழுதுக: த்', letter: 'த்', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ந் ✍️', instructionTa: 'எழுத்தை எழுதுக: ந்', letter: 'ந்', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ப் ✍️', instructionTa: 'எழுத்தை எழுதுக: ப்', letter: 'ப்', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ம் ✍️', instructionTa: 'எழுத்தை எழுதுக: ம்', letter: 'ம்', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ய் ✍️', instructionTa: 'எழுத்தை எழுதுக: ய்', letter: 'ய்', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ர் ✍️', instructionTa: 'எழுத்தை எழுதுக: ர்', letter: 'ர்', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ல் ✍️', instructionTa: 'எழுத்தை எழுதுக: ல்', letter: 'ல்', options: [] },
      { type: 'trace' as any, instruction: 'Trace: வ் ✍️', instructionTa: 'எழுத்தை எழுதுக: வ்', letter: 'வ்', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ழ் ✍️', instructionTa: 'எழுத்தை எழுதுக: ழ்', letter: 'ழ்', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ள் ✍️', instructionTa: 'எழுத்தை எழுதுக: ள்', letter: 'ள்', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ற் ✍️', instructionTa: 'எழுத்தை எழுதுக: ற்', letter: 'ற்', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ன் ✍️', instructionTa: 'எழுத்தை எழுதுக: ன்', letter: 'ன்', options: [] }
    ]
  },
  {
    id: 3,
    title: 'உயிர்மெய் அறிமுகம் 🔤',
    titleEn: 'Introduction to Uyirmei',
    mascot: '🔤',
    color: 'from-cyan-400 to-blue-500',
    borderColor: 'border-cyan-300',
    questions: [
      {
        type: 'combo_chart' as any,
        instruction: 'மெய் + உயிர் = உயிர்மெய் ✎️',
        instructionTa: 'எல்லா உயிர்மெய் சேர்க்கைகளையும் பார்க்கவும்!',
        boardTitle: 'உயிர்மெய் சேர்க்கை அறிமுகம்',
        boardSubtitle: 'Consonant + Vowel = Uyirmei',
        combos: [
          { consonant: 'க்', vowel: 'அ', result: 'க' },
          { consonant: 'ச்', vowel: 'அ', result: 'ச' },
          { consonant: 'த்', vowel: 'அ', result: 'த' },
          { consonant: 'ப்', vowel: 'அ', result: 'ப' },
          { consonant: 'ம்', vowel: 'அ', result: 'ம' },
          { consonant: 'ல்', vowel: 'அ', result: 'ல' },
          { consonant: 'க்', vowel: 'ஆ', result: 'கா' },
          { consonant: 'ச்', vowel: 'ஆ', result: 'சா' },
          { consonant: 'த்', vowel: 'ஆ', result: 'தா' },
          { consonant: 'ப்', vowel: 'ஆ', result: 'பா' },
          { consonant: 'ம்', vowel: 'ஆ', result: 'மா' },
          { consonant: 'ல்', vowel: 'ஆ', result: 'லா' },
        ],
        options: []
      },
      { type: 'connect_pairs' as any, instruction: 'Join letters together! 🔗', instructionTa: 'எழுத்துக்களை இணைக்கவும்! 🔗', pairs: [{ left: 'க் + அ', right: 'க' }, { left: 'ச் + அ', right: 'ச' }, { left: 'த் + அ', right: 'த' }], options: [] }
    ]
  },
  {
    id: 4,
    title: 'உயிர்மெய் சேர்க்கை பயிற்சி 🤝',
    titleEn: 'Combination Practice',
    mascot: '🤝',
    color: 'from-cyan-400 to-blue-500',
    borderColor: 'border-cyan-300',
    questions: [
      {
        type: 'combo_chart' as any,
        instruction: 'மெய் + உயிர் = உயிர்மெய் ✎️',
        instructionTa: 'இந்த சேர்க்கைகளை மனன் செய்து பயிற்சி செய்திடுக!',
        boardTitle: 'உயிர்மெய் சேர்க்கை பயிற்சி',
        boardSubtitle: 'Combination Practice Chart',
        combos: [
          { consonant: 'ப்', vowel: 'அ', result: 'ப' },
          { consonant: 'ம்', vowel: 'அ', result: 'ம' },
          { consonant: 'ல்', vowel: 'அ', result: 'ல' },
          { consonant: 'ப்', vowel: 'ஆ', result: 'பா' },
          { consonant: 'ம்', vowel: 'ஆ', result: 'மா' },
          { consonant: 'ல்', vowel: 'ஆ', result: 'லா' },
          { consonant: 'ப்', vowel: 'இ', result: 'பி' },
          { consonant: 'ம்', vowel: 'இ', result: 'மி' },
          { consonant: 'ல்', vowel: 'இ', result: 'லி' },
        ],
        options: []
      },
      { type: 'connect_pairs' as any, instruction: 'Join letters together! 🔗', instructionTa: 'எழுத்துக்களை இணைக்கவும்! 🔗', pairs: [{ left: 'ப் + அ', right: 'ப' }, { left: 'ம் + அ', right: 'ம' }, { left: 'ல் + அ', right: 'ல' }], options: [] }
    ]
  },
  {
    id: 5,
    title: 'எழுத்து வரிசை அமைத்தல் 🚂',
    titleEn: 'Ordering Letters',
    mascot: '🚂',
    color: 'from-cyan-400 to-blue-500',
    borderColor: 'border-cyan-300',
    questions: [
      { type: 'sentence_train' as any, instruction: 'Arrange vowels in correct order! 🚂', instructionTa: 'உயிர் எழுத்துக்களை வரிசைப்படுத்துக! 🚂', words: ['அ', 'ஆ', 'இ', 'ஈ'], correctSentence: 'அ ஆ இ ஈ', options: [] }
    ]
  },

  // --- CHAPTER 2: உயிர்மெய் பயணம் 🔤 (Levels 6 - 11) ---
  {
    id: 6,
    title: 'க வரிசை பயணம் 🚂',
    titleEn: 'Ka Series',
    mascot: '🚂',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'combo_chart' as any,
        boardTitle: 'க வரிசை அறிமுகம்',
        boardSubtitle: 'Ka Series (All 12 Combinations)',
        combos: [
          { consonant: 'க்', vowel: 'அ', result: 'க' },
          { consonant: 'க்', vowel: 'ஆ', result: 'கா' },
          { consonant: 'க்', vowel: 'இ', result: 'கி' },
          { consonant: 'க்', vowel: 'ஈ', result: 'கீ' },
          { consonant: 'க்', vowel: 'உ', result: 'கு' },
          { consonant: 'க்', vowel: 'ஊ', result: 'கூ' },
          { consonant: 'க்', vowel: 'எ', result: 'கெ' },
          { consonant: 'க்', vowel: 'ஏ', result: 'கே' },
          { consonant: 'க்', vowel: 'ஐ', result: 'கை' },
          { consonant: 'க்', vowel: 'ஒ', result: 'கொ' },
          { consonant: 'க்', vowel: 'ஓ', result: 'கோ' },
          { consonant: 'க்', vowel: 'ஔ', result: 'கௌ' }
        ],
        options: []
      },
      { type: 'connect_pairs' as any, instruction: 'Match Ka series! 🔗', instructionTa: 'க வரிசையை இணைக்கவும்! 🔗', pairs: [{ left: 'க் + அ', right: 'க' }, { left: 'க் + ஆ', right: 'கா' }, { left: 'க் + இ', right: 'கி' }], options: [] }
    ]
  },
  {
    id: 7,
    title: 'ச வரிசை பயணம் 🚂',
    titleEn: 'Cha Series',
    mascot: '🚂',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'combo_chart' as any,
        boardTitle: 'ச வரிசை அறிமுகம்',
        boardSubtitle: 'Cha Series (All 12 Combinations)',
        combos: [
          { consonant: 'ச்', vowel: 'அ', result: 'ச' },
          { consonant: 'ச்', vowel: 'ஆ', result: 'சா' },
          { consonant: 'ச்', vowel: 'இ', result: 'சி' },
          { consonant: 'ச்', vowel: 'ஈ', result: 'சீ' },
          { consonant: 'ச்', vowel: 'உ', result: 'சு' },
          { consonant: 'ச்', vowel: 'ஊ', result: 'சூ' },
          { consonant: 'ச்', vowel: 'எ', result: 'செ' },
          { consonant: 'ச்', vowel: 'ஏ', result: 'சே' },
          { consonant: 'ச்', vowel: 'ஐ', result: 'சை' },
          { consonant: 'ச்', vowel: 'ஒ', result: 'சொ' },
          { consonant: 'ச்', vowel: 'ஓ', result: 'சோ' },
          { consonant: 'ச்', vowel: 'ஔ', result: 'சௌ' }
        ],
        options: []
      },
      { type: 'connect_pairs' as any, instruction: 'Match Cha series! 🔗', instructionTa: 'ச வரிசையை இணைக்கவும்! 🔗', pairs: [{ left: 'ச் + அ', right: 'ச' }, { left: 'ச் + ஆ', right: 'சா' }, { left: 'ச் + இ', right: 'சி' }], options: [] }
    ]
  },
  {
    id: 8,
    title: 'த வரிசை பயணம் 🚂',
    titleEn: 'Tha Series',
    mascot: '🚂',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'combo_chart' as any,
        boardTitle: 'த வரிசை அறிமுகம்',
        boardSubtitle: 'Tha Series (All 12 Combinations)',
        combos: [
          { consonant: 'த்', vowel: 'அ', result: 'த' },
          { consonant: 'த்', vowel: 'ஆ', result: 'தா' },
          { consonant: 'த்', vowel: 'இ', result: 'தி' },
          { consonant: 'த்', vowel: 'ஈ', result: 'தீ' },
          { consonant: 'த்', vowel: 'உ', result: 'து' },
          { consonant: 'த்', vowel: 'ஊ', result: 'தூ' },
          { consonant: 'த்', vowel: 'எ', result: 'தெ' },
          { consonant: 'த்', vowel: 'ஏ', result: 'தே' },
          { consonant: 'த்', vowel: 'ஐ', result: 'தை' },
          { consonant: 'த்', vowel: 'ஒ', result: 'தொ' },
          { consonant: 'த்', vowel: 'ஓ', result: 'தோ' },
          { consonant: 'த்', vowel: 'ஔ', result: 'தௌ' }
        ],
        options: []
      },
      { type: 'connect_pairs' as any, instruction: 'Match Tha series! 🔗', instructionTa: 'த வரிசையை இணைக்கவும்! 🔗', pairs: [{ left: 'த் + அ', right: 'த' }, { left: 'த் + ஆ', right: 'தா' }, { left: 'த் + இ', right: 'தி' }], options: [] }
    ]
  },
  {
    id: 9,
    title: 'ப வரிசை பயணம் 🚂',
    titleEn: 'Pa Series',
    mascot: '🚂',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'combo_chart' as any,
        boardTitle: 'ப வரிசை அறிமுகம்',
        boardSubtitle: 'Pa Series (All 12 Combinations)',
        combos: [
          { consonant: 'ப்', vowel: 'அ', result: 'ப' },
          { consonant: 'ப்', vowel: 'ஆ', result: 'பா' },
          { consonant: 'ப்', vowel: 'இ', result: 'பி' },
          { consonant: 'ப்', vowel: 'ஈ', result: 'பீ' },
          { consonant: 'ப்', vowel: 'உ', result: 'பு' },
          { consonant: 'ப்', vowel: 'ஊ', result: 'பூ' },
          { consonant: 'ப்', vowel: 'எ', result: 'பெ' },
          { consonant: 'ப்', vowel: 'ஏ', result: 'பே' },
          { consonant: 'ப்', vowel: 'ஐ', result: 'பை' },
          { consonant: 'ப்', vowel: 'ஒ', result: 'பொ' },
          { consonant: 'ப்', vowel: 'ஓ', result: 'போ' },
          { consonant: 'ப்', vowel: 'ஔ', result: 'பௌ' }
        ],
        options: []
      },
      { type: 'connect_pairs' as any, instruction: 'Match Pa series! 🔗', instructionTa: 'ப வரிசையை இணைக்கவும்! 🔗', pairs: [{ left: 'ப் + அ', right: 'ப' }, { left: 'ப் + ஆ', right: 'பா' }, { left: 'ப் + இ', right: 'பி' }], options: [] }
    ]
  },
  {
    id: 10,
    title: 'ம வரிசை பயணம் 🚂',
    titleEn: 'Ma Series',
    mascot: '🚂',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    questions: [
      {
        type: 'combo_chart' as any,
        boardTitle: 'ம வரிசை அறிமுகம்',
        boardSubtitle: 'Ma Series (All 12 Combinations)',
        combos: [
          { consonant: 'ம்', vowel: 'அ', result: 'ம' },
          { consonant: 'ம்', vowel: 'ஆ', result: 'மா' },
          { consonant: 'ம்', vowel: 'இ', result: 'மி' },
          { consonant: 'ம்', vowel: 'ஈ', result: 'மீ' },
          { consonant: 'ம்', vowel: 'உ', result: 'மு' },
          { consonant: 'ம்', vowel: 'ஊ', result: 'மூ' },
          { consonant: 'ம்', vowel: 'எ', result: 'மெ' },
          { consonant: 'ம்', vowel: 'ஏ', result: 'மே' },
          { consonant: 'ம்', vowel: 'ஐ', result: 'மை' },
          { consonant: 'ம்', vowel: 'ஒ', result: 'மொ' },
          { consonant: 'ம்', vowel: 'ஓ', result: 'மோ' },
          { consonant: 'ம்', vowel: 'ஔ', result: 'மௌ' }
        ],
        options: []
      },
      { type: 'connect_pairs' as any, instruction: 'Match Ma series! 🔗', instructionTa: 'ம வரிசையை இணைக்கவும்! 🔗', pairs: [{ left: 'ம் + அ', right: 'ம' }, { left: 'ம் + ஆ', right: 'மா' }, { left: 'ம் + இ', right: 'மி' }], options: [] }
    ]
  },
  {
    id: 11,
    title: 'முழு உயிர்மெய் பயிற்சி 🏆',
    titleEn: 'Full practice',
    mascot: '🏆',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    questions: [
      { type: 'connect_pairs' as any, instruction: 'Join dynamic combinations! 🔗', instructionTa: 'உயிர்மெய் சேர்க்கையை இணைக்கவும்! 🔗', pairs: [{ left: 'வ் + அ', right: 'வ' }, { left: 'ய் + ஆ', right: 'யா' }, { left: 'ந் + எ', right: 'நெ' }], options: [] }
    ]
  },

  // --- CHAPTER 3: சொல் கட்டிடம் 🧱 (Levels 12 - 17) ---
  {
    id: 12,
    title: 'ஈரெழுத்து சொற்கள் 🧱',
    titleEn: '2-Letter Words',
    mascot: '🧱',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      { type: 'sentence_train' as any, instruction: 'Make the word "பல்"! 🚂', instructionTa: '"பல்" என்ற சொல்லை உருவாக்குக! 🚂', words: ['ப', 'ல்'], correctSentence: 'ப ல்', options: [] },
      { type: 'sentence_train' as any, instruction: 'Make the word "கல்"! 🚂', instructionTa: '"கல்" என்ற சொல்லை உருவாக்குக! 🚂', words: ['க', 'ல்'], correctSentence: 'க ல்', options: [] }
    ]
  },
  {
    id: 13,
    title: 'மூவெழுத்து சொற்கள் 🧱',
    titleEn: '3-Letter Words',
    mascot: '🧱',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      { type: 'sentence_train' as any, instruction: 'Make the word "பலம்"! 🚂', instructionTa: '"பலம்" என்ற சொல்லை உருவாக்குக! 🚂', words: ['ப', 'ல', 'ம்'], correctSentence: 'ப ல ம்', options: [] },
      { type: 'sentence_train' as any, instruction: 'Make the word "மரம்"! 🚂', instructionTa: '"மரம்" என்ற சொல்லை உருவாக்குக! 🚂', words: ['ம', 'ர', 'ம்'], correctSentence: 'ம ர ம்', options: [] }
    ]
  },
  {
    id: 14,
    title: 'எளிய சொற்கள் வாசித்தல் 📖',
    titleEn: 'Reading Simple Words',
    mascot: '📖',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      { type: 'connect_pairs' as any, instruction: 'Match word to English meaning! 🔗', instructionTa: 'பொருத்தமான சொற்களை இணைக்கவும்! 🔗', pairs: [{ left: 'பல்', right: 'Tooth 🦷' }, { left: 'கல்', right: 'Stone 🪨' }, { left: 'மரம்', right: 'Tree 🌳' }], options: [] }
    ]
  },
  {
    id: 15,
    title: 'படம் பார்த்து சொல் கண்டுபிடித்தல் 🔍',
    titleEn: 'Find Word from Picture',
    mascot: '🔍',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      { type: 'drag_hunt' as any, instruction: 'Find word for Kite 🪁', instructionTa: 'பானையில் உள்ள பட்டத்தைக் கண்டுபிடி! 🪁', matchImage: '🪁', options: [{ text: 'பட்டம்', correct: true }, { text: 'பந்து', correct: false }, { text: 'பலம்', correct: false }] }
    ]
  },
  {
    id: 16,
    title: 'சொல் பிரித்தல் ✂️',
    titleEn: 'Word Splitting',
    mascot: '✂️',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'learn_card' as any,
        conceptTitle: 'சொல் பிரித்தல் ✂️ (Word Splitting)',
        explanation: 'ஒரு சொல்லை அதன் தனித்தனி எழுத்துக்களாகப் பிரித்து எழுதுவதே சொல் பிரித்தல் ஆகும். இதைக் கற்றுக்கொள்வதன் மூலம் சொற்களின் கட்டமைப்பை எளிதாகப் புரிந்துகொள்ள முடியும்.',
        explanationTa: 'Spitting a word means breaking it down into its individual letters. This helps you understand how words are built!',
        mascot: '✂️',
        examples: [
          'படம் = ப + ட + ம்',
          'பல் = ப + ல்',
          'மரம் = ம + ர + ம்',
          'வயல் = வ + ய + ல்'
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Split words into letters! 🔗',
        instructionTa: 'சொற்களை எழுத்துக்களாகப் பிரிக்கவும்! 🔗',
        pairs: [
          { left: 'படம்', right: 'ப + ட + ம்' },
          { left: 'கண்', right: 'க + ண்' },
          { left: 'மரம்', right: 'ம + ர + ம்' },
          { left: 'பல்', right: 'ப + ல்' },
          { left: 'வயல்', right: 'w + ய + ல்' }
        ],
        options: []
      }
    ]
  },
  {
    id: 17,
    title: 'சொல் சேர்த்தல் 🤝',
    titleEn: 'Word Joining',
    mascot: '🤝',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    questions: [
      {
        type: 'learn_card' as any,
        conceptTitle: 'சொல் சேர்த்தல் 🤝 (Word Joining)',
        explanation: 'தனித்தனியாக உள்ள எழுத்துக்களை ஒன்றாகச் சேர்த்து ஒரு புதிய சொல்லை உருவாக்குவதே சொல் சேர்த்தல் ஆகும். இது எழுத்துக்களைக் கூட்டிப் படிப்பதற்கு உதவும்!',
        explanationTa: 'Joining separate letters together to form a meaningful word. This helps you spell and read easily!',
        mascot: '🤝',
        examples: [
          'வ + ய + ல் = வயல்',
          'கு + டை = குடை',
          'அ + ம் + மா = அம்மா',
          'ப + ள் + ளி = பள்ளி'
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Join letters to make words! 🔗',
        instructionTa: 'எழுத்துக்களைச் சேர்த்து சொல் உருவாக்குக! 🔗',
        pairs: [
          { left: 'வ + ய + ல்', right: 'வயல்' },
          { left: 'கு + டை', right: 'குடை' },
          { left: 'அ + ம் + மா', right: 'அம்மா' },
          { left: 'ப + ள் + ளி', right: 'பள்ளி' },
          { left: 'ப + ன் + து', right: 'பந்து' }
        ],
        options: []
      }
    ]
  },

  // --- CHAPTER 4: வாசிப்பு உலகம் 📖 (Levels 18 - 22) ---
  {
    id: 18,
    title: 'சிறு வாக்கியம் வாசித்தல் 📖',
    titleEn: 'Read Short Sentences',
    mascot: '📖',
    color: 'from-indigo-400 to-blue-500',
    borderColor: 'border-indigo-300',
    questions: [
      { type: 'sentence_train' as any, instruction: 'Form sentence: "இது என் வீடு" 🚂', instructionTa: '"இது என் வீடு" வாக்கியத்தை அமைக்கவும்! 🚂', words: ['இது', 'என்', 'வீடு'], correctSentence: 'இது என் வீடு', options: [] },
      { type: 'sentence_train' as any, instruction: 'Form sentence: "அம்மா எனக்கு பிடிக்கும்" 🚂', instructionTa: '"அம்மா எனக்கு பிடிக்கும்" வாக்கியத்தை அமைக்கவும்! 🚂', words: ['அம்மா', 'எனக்கு', 'பிடிக்கும்'], correctSentence: 'அம்மா எனக்கு பிடிக்கும்', options: [] },
      { type: 'sentence_train' as any, instruction: 'Form sentence: "மரம் நிழல் தரும்" 🚂', instructionTa: '"மரம் நிழல் தரும்" வாக்கியத்தை அமைக்கவும்! 🚂', words: ['மரம்', 'நிழல்', 'தரும்'], correctSentence: 'மரம் நிழல் தரும்', options: [] },
      { type: 'sentence_train' as any, instruction: 'Form sentence: "பறவை வானில் பறக்கும்" 🚂', instructionTa: '"பறவை வானில் பறக்கும்" வாக்கியத்தை அமைக்கவும்! 🚂', words: ['பறவை', 'வானில்', 'பறக்கும்'], correctSentence: 'பறவை வானில் பறக்கும்', options: [] }
    ]
  },
  {
    id: 19,
    title: 'சொல் - படம் இணைத்தல் 🎨',
    titleEn: 'Word-Picture Matching',
    mascot: '🎨',
    color: 'from-indigo-400 to-blue-500',
    borderColor: 'border-indigo-300',
    questions: [
      {
        type: 'connect_pairs' as any,
        instruction: 'Match descriptions to items! 🔗',
        instructionTa: 'சொற்றொடர்களைப் படங்களுடன் இணைக்கவும்! 🔗',
        pairs: [
          { left: 'அழகிய மலர்', right: 'Flower 🌸' },
          { left: 'பறக்கும் பட்டம்', right: 'Kite 🪁' },
          { left: 'ஓடும் முயல்', right: 'Rabbit 🐇' },
          { left: 'பச்சை கிளி', right: 'Parrot 🦜' },
          { left: 'சுவையான மாம்பழம்', right: 'Mango 🥭' }
        ],
        options: []
      }
    ]
  },
  {
    id: 20,
    title: 'கேள்வி பதில் ❓',
    titleEn: 'Simple Q&A',
    mascot: '❓',
    color: 'from-indigo-400 to-blue-500',
    borderColor: 'border-indigo-300',
    questions: [
      { type: 'garden_repair' as any, instruction: 'Where do fruits grow? 🌳', instructionTa: 'மரத்தில் இருப்பது எது? 🌳', sentence: 'மரத்தில் இருப்பது ___ ஆகும்.', options: [{ text: 'பழம்', correct: true }, { text: 'கல்', correct: false }] },
      { type: 'garden_repair' as any, instruction: 'Who gives us milk? 🐄', instructionTa: 'பால் தரும் விலங்கு எது? 🐄', sentence: 'நமக்கு பால் தருவது ___ ஆகும்.', options: [{ text: 'பசு', correct: true }, { text: 'சிங்கம்', correct: false }] },
      { type: 'garden_repair' as any, instruction: 'Which bird crows? 🐦', instructionTa: 'காக்கா என்று கத்துவது எது? 🐦', sentence: 'காக்கா என்று கத்துவது ___ ஆகும்.', options: [{ text: 'காகம்', correct: true }, { text: 'கிளி', correct: false }] },
      { type: 'garden_repair' as any, instruction: 'What shines at night? 🌙', instructionTa: 'இரவில் வானில் ஒளிர்வது எது? 🌙', sentence: 'இரவில் வானில் ஒளிர்வது ___ ஆகும்.', options: [{ text: 'நிலா', correct: true }, { text: 'சூரியன்', correct: false }] }
    ]
  },
  {
    id: 21,
    title: 'சிறு கதை புரிதல் 🦊',
    titleEn: 'Story Comprehension',
    mascot: '🦊',
    color: 'from-indigo-400 to-blue-500',
    borderColor: 'border-indigo-300',
    questions: [
      {
        type: 'story_cave' as any,
        storyText: 'ஆமையும் முயலும் பந்தயம் வைத்தன. முயல் வேகமாக ஓடி ஓய்வெடுத்தது. ஆமை மெதுவாகத் தொடர்ந்து ஓடி வென்றது.',
        questionText: 'யார் பந்தயத்தில் வென்றது?',
        options: [{ text: 'ஆமை 🐢', correct: true }, { text: 'முயல் 🐇', correct: false }]
      },
      {
        type: 'story_cave' as any,
        storyText: 'ஒரு காட்டில் சிங்கம் ஒன்று தூங்கிக் கொண்டிருந்தது. ஒரு சிறிய எலி அதன் மேல் விளையாடியது. சிங்கம் விழித்துக் கொண்டு எலியைப் பிடிக்க முயன்றது, ஆனால் எலி மன்னிப்புக் கேட்டதால் அதை விட்டுவிட்டது. பின்னர் ஒரு வேடன் வலையில் சிங்கம் சிக்கியபோது, எலி வலையைக் கடித்து சிங்கத்தைக் காப்பாற்றியது.',
        questionText: 'சிங்கத்தைக் காப்பாற்றியது யார்?',
        options: [{ text: 'எலி 🐭', correct: true }, { text: 'நரி 🦊', correct: false }]
      },
      {
        type: 'story_cave' as any,
        storyText: 'ஒரு குளத்தில் இரண்டு மீன்கள் இருந்தன. ஒரு நாள் கொக்கு ஒன்று வந்து மீன்களைப் பிடிக்க நினைத்தது. அறிவார்ந்த நண்டு ஒன்று கொக்கின் கழுத்தைக் கடித்து மீன்களைக் காப்பாற்றியது.',
        questionText: 'கொக்கைக் கொன்றது எது?',
        options: [{ text: 'நண்டு 🦀', correct: true }, { text: 'தவளை 🐸', correct: false }]
      }
    ]
  },
  {
    id: 22,
    title: 'நிகழ்வு வரிசை அமைத்தல் 📅',
    titleEn: 'Arrange Story Sequence',
    mascot: '📅',
    color: 'from-indigo-400 to-blue-500',
    borderColor: 'border-indigo-300',
    questions: [
      {
        type: 'story_cave' as any,
        isSequence: true,
        storyText: 'தாகமுள்ள காகம் பானையில் கற்களைப் போட்டு தண்ணீர் குடித்த கதை.',
        sequenceSteps: ['காகத்திற்கு தாகம் எடுத்தது', 'பானையில் நீர் குறைவாக இருந்தது', 'கற்களைப் போட்டு நீர் குடித்தது'],
        options: []
      },
      {
        type: 'story_cave' as any,
        isSequence: true,
        storyText: 'விதை முளைத்து செடியாக வளரும் படிநிலைகள்.',
        sequenceSteps: ['விதை மண்ணில் விதைக்கப்பட்டது', 'வேர்கள் மண்ணில் பரவின', 'செடியில் இலைகள் முளைத்தன'],
        options: []
      },
      {
        type: 'story_cave' as any,
        isSequence: true,
        storyText: 'காலையில் பள்ளிக்குச் செல்லும் முன் செய்யும் காரியங்கள்.',
        sequenceSteps: ['காலையில் படுக்கையிலிருந்து எழுந்தேன்', 'பற்களைத் துலக்கி குளித்தேன்', 'காலை உணவு சாப்பிட்டு பள்ளிக்குச் சென்றேன்'],
        options: []
      }
    ]
  },

  // --- CHAPTER 5: இலக்கண தோட்டம் 🌱 (Levels 23 - 27) ---
  {
    id: 23,
    title: 'பெயர்ச்சொல் அறிமுகம் 🏷️',
    titleEn: 'Naming Words',
    mascot: '🏷️',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'learn_card' as any,
        conceptTitle: 'பெயர்ச்சொல் 🏷️ (பெயர் குறிக்கும் சொல்)',
        explanation: 'ஒரு நபர், இடம், விலங்கு அல்லது பொருளின் பெயரைக் குறிக்கும் சொல் பெயர்ச்சொல் எனப்படும். (எ.கா: கண்ணன், மாடு, பள்ளி, புத்தகம்).',
        explanationTa: 'பெயரைக் குறிக்கும் சொற்கள் பெயர்ச்சொற்கள் ஆகும். இது நபர், இடம், விலங்கு அல்லது பொருளைக் குறிக்கும்!',
        mascot: '🏷️',
        examples: [
          'நபர் = கண்ணன் 👦',
          'விலங்கு = பசு 🐄',
          'இடம் = பள்ளி 🏫',
          'பொருள் = புத்தகம் 📕'
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Match name categories! 🔗',
        instructionTa: 'பெயர்ச்சொற்களை அதன் வகையோடு இணைக்கவும்! 🔗',
        pairs: [
          { left: 'கண்ணன்', right: 'நபர் 👦' },
          { left: 'வகுப்பறை', right: 'இடம் 🏫' },
          { left: 'பசு', right: 'விலங்கு 🐄' },
          { left: 'பேனா', right: 'பொருள் 🖊' },
          { left: 'சிங்கம்', right: 'விலங்கு 🦁' }
        ],
        options: []
      }
    ]
  },
  {
    id: 24,
    title: 'செயல் சொல் 🏃',
    titleEn: 'Action Words',
    mascot: '🏃',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'learn_card' as any,
        conceptTitle: 'செயல் சொல் 🏃 (செயலை குறிக்கும் சொல்)',
        explanation: 'நாம் செய்யும் ஒரு செயலைக் குறிக்கும் சொல் வினைச்சொல் அல்லது செயல்சொல் எனப்படும். (எ.கா: ஓடுதல், பாடுதல், எழுதுதல்).',
        explanationTa: 'நாம் செய்யும் செயல்களை (விளையாடுதல், ஓடுதல், படித்தல்) குறிக்கும் சொற்கள் செயல் சொற்கள் ஆகும்.',
        mascot: '🏃',
        examples: [
          'ஓடுதல் = ஓடினான் 🏃',
          'பாடுதல் = பாடினாள் 🎤',
          'எழுதுதல் = எழுதினான் ✍️',
          'படித்தல் = படித்தான் 📖'
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Match action words! 🔗',
        instructionTa: 'செயல்களையும் சொற்களையும் இணைக்கவும்! 🔗',
        pairs: [
          { left: 'ஓடினான்', right: 'ஓடுதல் 🏃' },
          { left: 'பாடினாள்', right: 'பாடுதல் 🎤' },
          { left: 'எழுதினான்', right: 'எழுதுதல் ✍️' },
          { left: 'விளையாடினான்', right: 'விளையாடுதல் ⚽' },
          { left: 'படித்தான்', right: 'படித்தல் 📖' }
        ],
        options: []
      }
    ]
  },
  {
    id: 25,
    title: 'ஒருமை / பன்மை 👥',
    titleEn: 'Singular & Plural',
    mascot: '👥',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'learn_card' as any,
        conceptTitle: 'ஒருமை / பன்மை 👥 (Singular & Plural)',
        explanation: 'ஒரே ஒரு பொருளை மட்டும் குறிப்பது ஒருமை எனப்படும். ஒன்றுக்கும் மேற்பட்ட பல பொருட்களைக் குறிப்பது பன்மை எனப்படும். (பொதுவாக பன்மை சொல்லின் இறுதியில் "கள்" சேரும்).',
        explanationTa: 'Singular means one item, and Plural means more than one item (mostly adds -கள்).',
        mascot: '👥',
        examples: [
          'பந்து ⚽ = பந்துகள் ⚽⚽',
          'மரம் 🌳 = மரங்கள் 🌳🌳',
          'பூ 🌸 = பூக்கள் 🌸🌸',
          'மீன் 🐟 = மீன்கள் 🐟🐟'
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Match Singular to Plural! 🔗',
        instructionTa: 'ஒருமை - பன்மை சொற்களை இணைக்கவும்! 🔗',
        pairs: [
          { left: 'பந்து', right: 'பந்துகள் ⚽' },
          { left: 'மரம்', right: 'மரங்கள் 🌳' },
          { left: 'பூ', right: 'பூக்கள் 🌸' },
          { left: 'மீன்', right: 'மீன்கள் 🐟' },
          { left: 'பறவை', right: 'பறவைகள் 🐦' }
        ],
        options: []
      }
    ]
  },
  {
    id: 26,
    title: 'எதிர்ச்சொற்கள் 🔄',
    titleEn: 'Opposite Words',
    mascot: '🔄',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'learn_card' as any,
        conceptTitle: 'எதிர்ச்சொற்கள் 🔄 (எதிர் பொருள்)',
        explanation: 'ஒரு சொல்லின் நேர்மாறான பொருளைத் தரும் சொல் எதிர்ச்சொல் எனப்படும். (எ.கா: பெரியது - சிறியது).',
        explanationTa: 'ஒரு சொல்லிற்கு நேர்மாறான எதிர் கருத்து அல்லது பொருளைத் தரும் சொற்கள் எதிர்ச்சொற்கள் ஆகும்.',
        mascot: '🔄',
        examples: [
          'பெரியது 🐘 x சிறியது 🐭',
          'மேலே 🎈 x கீழே ⚓',
          'உள்ளே 🚪 x வெளியே 🌳',
          'பகல் ☀️ x இரவு 🌙'
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Match Opposites! 🔗',
        instructionTa: 'எதிர்ச்சொற்களை இணைக்கவும்! 🔗',
        pairs: [
          { left: 'பெரியது', right: 'சிறியது 🐭' },
          { left: 'மேலே', right: 'கீழே ⚓' },
          { left: 'உள்ளே', right: 'வெளியே 🌳' },
          { left: 'பகல்', right: 'இரவு 🌙' },
          { left: 'சூடு', right: 'குளிர் ❄️' }
        ],
        options: []
      }
    ]
  },
  {
    id: 27,
    title: 'சொல் வகைப்படுத்தல் 📂',
    titleEn: 'Word Categorization',
    mascot: '📂',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-300',
    questions: [
      {
        type: 'learn_card' as any,
        conceptTitle: 'சொல் வகைப்படுத்தல் 📂 (சொற்களைப் பிரித்தல்)',
        explanation: 'ஒரு சொல் எந்த வகையைச் சார்ந்தது (விலங்கு, இடம், பொருள், செயல்) என்று கண்டறிந்து சரியான பிரிவுடன் இணைக்கவும்.',
        explanationTa: 'ஒவ்வொரு சொல்லையும் அதன் தகுந்த விவரங்களுடன் சரியாகப் பொருத்தி வகைப்படுத்த வேண்டும்.',
        mascot: '📂',
        examples: [
          'நாய் = வீட்டு விலங்கு 🐶',
          'வகுப்பறை = கல்வி கற்கும் இடம் 🏫',
          'ஓடுதல் = உடற்பயிற்சி செயல் 🏃',
          'படம் = காகிதப் பொருள் 🖼️'
        ],
        options: []
      },
      {
        type: 'connect_pairs' as any,
        instruction: 'Categorize words correctly! 🔗',
        instructionTa: 'சொற்களை வகைப்படுத்தவும்! 🔗',
        pairs: [
          { left: 'நாய்', right: 'வீட்டு விலங்கு 🐶' },
          { left: 'ஓடு', right: 'வேகமாகச் செல்வது 🏃' },
          { left: 'வகுப்பறை', right: 'பள்ளிப் பகுதி 🏫' },
          { left: 'பாடு', right: 'இசைப் பாட்டு 🎤' },
          { left: 'படம்', right: 'காட்சி ஓவியம் 🖼️' }
        ],
        options: []
      }
    ]
  },

  // --- CHAPTER 6: எழுதும் பயிற்சி ✏️ (Levels 28 - 32) ---
  {
    id: 28,
    title: 'எழுத்து எழுதுதல் ✏️',
    titleEn: 'Write Letters',
    mascot: '✏️',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    questions: [
      { type: 'trace' as any, instruction: 'Trace: ஆ ✍️', instructionTa: 'பலகையில் எழுதுக: ஆ ✍️', letter: 'ஆ', options: [] },
      { type: 'trace' as any, instruction: 'Trace: ஈ ✍️', instructionTa: 'பலகையில் எழுதுக: ஈ ✍️', letter: 'ஈ', options: [] }
    ]
  },
  {
    id: 29,
    title: 'சொல் எழுதுதல் ✏️',
    titleEn: 'Write Words',
    mascot: '✏️',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    questions: [
      { type: 'trace' as any, instruction: 'Trace: அம்மா ✍️', instructionTa: 'பலகையில் எழுதுக: அம்மா ✍️', letter: 'அம்மா', options: [] }
    ]
  },
  {
    id: 30,
    title: 'விடுபட்ட எழுத்து நிரப்புதல் 🧩',
    titleEn: 'Fill Missing Letters',
    mascot: '🧩',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    questions: [
      { type: 'writing_lab' as any, subType: 'missing', instruction: 'Fill missing character for Mother 👩', instructionTa: 'விடுபட்ட எழுத்தை நிரப்புக: அ_மா 👩', sentence: 'அ_மா', options: [{ text: 'ம்', correct: true }, { text: 'ப்', correct: false }] }
    ]
  },
  {
    id: 31,
    title: 'வாக்கியம் எழுதுதல் ✏️',
    titleEn: 'Write Sentences',
    mascot: '✏️',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    questions: [
      { type: 'trace' as any, instruction: 'Trace: தமிழ் இனிது ✍️', instructionTa: 'பலகையில் எழுதுக: தமிழ் இனிது ✍️', letter: 'தமிழ் இனிது', options: [] }
    ]
  },
  {
    id: 32,
    title: 'படம் பார்த்து எழுதுதல் 🎨',
    titleEn: 'Write Picture Label',
    mascot: '🎨',
    color: 'from-purple-400 to-pink-500',
    borderColor: 'border-purple-300',
    questions: [
      { type: 'trace' as any, instruction: 'Trace word for apple 🍎', instructionTa: 'பலகையில் எழுதுக: ஆப்பிள் 🍎', letter: 'ஆப்பிள்', options: [] }
    ]
  },

  // --- CHAPTER 7: சொற்களஞ்சியம் 🌍 (Levels 33 - 37) ---
  {
    id: 33,
    title: 'உடல் உறுப்புகள் 🦵',
    titleEn: 'Body Parts',
    mascot: '🦵',
    color: 'from-blue-400 to-cyan-500',
    borderColor: 'border-blue-300',
    questions: [
      { type: 'connect_pairs' as any, instruction: 'Match body parts! 🔗', instructionTa: 'உடல் உறுப்புகளை இணைக்கவும்! 🔗', pairs: [{ left: 'கண்', right: 'Eye 👁️' }, { left: 'காது', right: 'Ear 👂' }, { left: 'மூக்கு', right: 'Nose 👃' }], options: [] }
    ]
  },
  {
    id: 34,
    title: 'விலங்குகள் 🦁',
    titleEn: 'Animals World',
    mascot: '🦁',
    color: 'from-blue-400 to-cyan-500',
    borderColor: 'border-blue-300',
    questions: [
      { type: 'connect_pairs' as any, instruction: 'Match animal names! 🔗', instructionTa: 'விலங்குகளின் பெயர்களை இணைக்கவும்! 🔗', pairs: [{ left: 'யானை', right: 'Elephant 🐘' }, { left: 'சிங்கம்', right: 'Lion 🦁' }, { left: 'நாய்', right: 'Dog 🐶' }], options: [] }
    ]
  },
  {
    id: 35,
    title: 'பறவைகள் 🦜',
    titleEn: 'Birds Sanctuary',
    mascot: '🦜',
    color: 'from-blue-400 to-cyan-500',
    borderColor: 'border-blue-300',
    questions: [
      { type: 'connect_pairs' as any, instruction: 'Match bird names! 🔗', instructionTa: 'பறவைகளின் பெயர்களை இணைக்கவும்! 🔗', pairs: [{ left: 'மயில்', right: 'Peacock 🦚' }, { left: 'கிளி', right: 'Parrot 🦜' }, { left: 'காகம்', right: 'Crow 🐦' }], options: [] }
    ]
  },
  {
    id: 36,
    title: 'உணவுகள் 🍲',
    titleEn: 'Food Items',
    mascot: '🍲',
    color: 'from-blue-400 to-cyan-500',
    borderColor: 'border-blue-300',
    questions: [
      { type: 'connect_pairs' as any, instruction: 'Match food items! 🔗', instructionTa: 'உணவு வகைகளை இணைக்கவும்! 🔗', pairs: [{ left: 'பால்', right: 'Milk 🥛' }, { left: 'பழங்கள்', right: 'Fruits 🍎' }, { left: 'நீர்', right: 'Water 💧' }], options: [] }
    ]
  },
  {
    id: 37,
    title: 'சுற்றுப்புற பொருட்கள் 🏫',
    titleEn: 'Surrounding Objects',
    mascot: '🏫',
    color: 'from-blue-400 to-cyan-500',
    borderColor: 'border-blue-300',
    questions: [
      { type: 'connect_pairs' as any, instruction: 'Match objects! 🔗', instructionTa: 'சுற்றுப்புற பொருட்களை இணைக்கவும்! 🔗', pairs: [{ left: 'புத்தகம்', right: 'Book 📖' }, { left: 'நாற்காலி', right: 'Chair 🪑' }, { left: 'மேஜை', right: 'Table 🪵' }], options: [] }
    ]
  },

  // --- CHAPTER 8: பாடல் & கதை 🎵 (Levels 38 - 41) ---
  {
    id: 38,
    title: 'தமிழ் பாடல்கள் 🎵',
    titleEn: 'Tamil Songs',
    mascot: '🎵',
    color: 'from-rose-400 to-red-500',
    borderColor: 'border-rose-350',
    questions: [
      { type: 'sentence_train' as any, instruction: 'Arrange song line! 🚂', instructionTa: 'பாடல் வரியை அமைக்கவும்! 🚂', words: ['கைவீசம்மா', 'கைவீசு'], correctSentence: 'கைவீசம்மா கைவீசு', options: [] }
    ]
  },
  {
    id: 39,
    title: 'எளிய கவிதைகள் 📜',
    titleEn: 'Simple Poetry',
    mascot: '📜',
    color: 'from-rose-400 to-red-500',
    borderColor: 'border-rose-350',
    questions: [
      { type: 'connect_pairs' as any, instruction: 'Match rhyme lines! 🔗', instructionTa: 'பாடல் வரிகளை இணைக்கவும்! 🔗', pairs: [{ left: 'நிலா நிலா', right: 'ஓடி வா' }, { left: 'வண்ண வண்ண', right: 'பூக்கள்' }], options: [] }
    ]
  },
  {
    id: 40,
    title: 'சிறு கதைகள் 📖',
    titleEn: 'Fables Storybook',
    mascot: '📖',
    color: 'from-rose-400 to-red-500',
    borderColor: 'border-rose-350',
    questions: [
      { type: 'story_cave' as any, storyText: 'ஆமையும் முயலும் பந்தயம் வைத்த கதையை நினைவுகூரவும்.', questionText: 'யார் வேகமாக ஓடி தூங்கியது?', options: [{ text: 'முயல் 🐇', correct: true }, { text: 'ஆமை 🐢', correct: false }] }
    ]
  },
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
