import { type TutorialStep } from '../english';

export const WORD_VISUALS: Record<string, { emoji: string; mascot: string; color: string; sound: string }> = {
  cat: { emoji: '🐱', mascot: '🐱', color: 'from-yellow-400 to-amber-500', sound: 'Cat! Meow!' },
  dog: { emoji: '🐶', mascot: '🐶', color: 'from-amber-400 to-yellow-500', sound: 'Dog! Woof!' },
  sun: { emoji: '☀️', mascot: '☀️', color: 'from-yellow-400 to-amber-500', sound: 'Sun!' },
  star: { emoji: '⭐', mascot: '⭐', color: 'from-amber-400 to-yellow-400', sound: 'Star!' },
  tree: { emoji: '🌳', mascot: '🌳', color: 'from-emerald-400 to-green-500', sound: 'Tree!' },
  book: { emoji: '📖', mascot: '📖', color: 'from-indigo-400 to-blue-500', sound: 'Book!' },
};

export function getChapterVisuals(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('alphabet revision') || lower.includes('alphabet')) {
    return { emoji: '🔤', mascot: '🔡', color: 'from-indigo-400 to-cyan-400', sound: 'Alphabet revision!', image: '/assets/subjects/english_alphabet_a_m-removebg-preview.png' };
  }
  if (lower.includes('phonics')) {
    return { emoji: '🐝', mascot: '🔤', color: 'from-teal-400 to-cyan-500', sound: 'Phonics time!', image: '/assets/subjects/english_small_phonics-removebg-preview.png' };
  }
  if (lower.includes('word family') || lower.includes('family') || lower.includes('word building')) {
    return { emoji: '🏠', mascot: '👪', color: 'from-amber-400 to-orange-500', sound: 'Word building!', image: '/assets/subjects/english_checkpoint-removebg-preview.png' };
  }
  if (lower.includes('sentence')) {
    return { emoji: '🗣️', mascot: '💬', color: 'from-teal-400 to-cyan-500', sound: 'Let us read sentences!', image: '/assets/subjects/english_story_time-removebg-preview.png' };
  }
  if (lower.includes('rhymes') || lower.includes('song')) {
    return { emoji: '🎤', mascot: '🎶', color: 'from-pink-400 to-rose-500', sound: 'Sing along!', image: '/assets/subjects/english_rhymes_songs-removebg-preview.png' };
  }
  return { emoji: '📖', mascot: '📚', color: 'from-sky-400 to-blue-500', sound: 'UKG English!' };
}

export function getLessonVisuals(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes('capital letters')) {
    return { emoji: '🔠', mascot: '🅰️', color: 'from-indigo-400 to-violet-500', sound: 'Capital letters A to Z!' };
  }
  if (lower.includes('small letters')) {
    return { emoji: '🔡', mascot: '🆎', color: 'from-sky-400 to-blue-500', sound: 'Small letters a to z!' };
  }
  if (lower.includes('matching')) {
    return { emoji: '🧩', mascot: '🤝', color: 'from-emerald-400 to-teal-500', sound: 'Match the letters!' };
  }
  if (lower.includes('missing letters')) {
    return { emoji: '❓', mascot: '🔍', color: 'from-amber-400 to-orange-500', sound: 'Find the missing letter!' };
  }
  if (lower.includes('at family') || lower.includes('cat') || lower.includes('hat')) {
    return { emoji: '🎩', mascot: '🐱', color: 'from-rose-400 to-pink-500', sound: 'The "at" family!' };
  }
  if (lower.includes('sight words')) {
    return { emoji: '👁️', mascot: '👀', color: 'from-purple-400 to-violet-500', sound: 'Sight words!' };
  }
  return { emoji: '🎒', mascot: '📖', color: 'from-blue-400 to-sky-500', sound: 'Ready to learn!' };
}

export function buildTutorial(title: string, studentName?: string): TutorialStep[] {
  const name = studentName || 'Explorer';
  const lower = title.toLowerCase();

  if (lower.includes('capital letters')) {
    return [
      { title: 'Capital Letters', speak: `Hello ${name}! Let us revise all Capital Letters A to Z today!`, emoji: '🔠', anim: 'bounce' },
      { title: 'A B C D', speak: 'A, B, C, D! Say them with me!', emoji: '🅰️', anim: 'pop' },
      { title: 'E F G H', speak: 'E, F, G, H! Keep going!', emoji: '🅱️', anim: 'swing' },
      { title: 'I J K L', speak: 'I, J, K, L! You are doing great!', emoji: '🆎', anim: 'wiggle' },
      { title: 'M N O P', speak: 'M, N, O, P! Sing along!', emoji: '🅿️', anim: 'pulse' },
      { title: 'Q R S T', speak: 'Q, R, S, T! Almost there!', emoji: '🆂', anim: 'swing' },
      { title: 'U V W X Y Z', speak: 'U, V, W, X, Y, Z! Super job!', emoji: '✨', anim: 'jump' },
    ];
  }

  if (lower.includes('small letters')) {
    return [
      { title: 'Small Letters', speak: `Hello ${name}! Let us revise Small Letters a to z today!`, emoji: '🔡', anim: 'bounce' },
      { title: 'a b c d', speak: 'a, b, c, d! Say them softly!', emoji: '🅰️', anim: 'pop' },
      { title: 'e f g h', speak: 'e, f, g, h! Wonderful!', emoji: '🅱️', anim: 'swing' },
      { title: 'i j k l', speak: 'i, j, k, l! Keep going!', emoji: '🆎', anim: 'wiggle' },
      { title: 'm n o p', speak: 'm, n, o, p! Awesome!', emoji: '🅿️', anim: 'pulse' },
      { title: 'q r s t', speak: 'q, r, s, t! Great job!', emoji: '🆂', anim: 'swing' },
      { title: 'u v w x y z', speak: 'u, v, w, x, y, z! Perfect!', emoji: '✨', anim: 'jump' },
    ];
  }

  if (lower.includes('matching')) {
    return [
      { title: 'Letter Match', speak: `Hi ${name}! Let us match Capital Letters to Small Letters!`, emoji: '🧩', anim: 'bounce' },
      { title: 'A matches a', speak: 'Big A matches with small a!', emoji: '🍎', anim: 'pop' },
      { title: 'B matches b', speak: 'Big B matches with small b!', emoji: '⚽', anim: 'swing' },
      { title: 'C matches c', speak: 'Big C matches with small c!', emoji: '🐱', anim: 'wiggle' },
    ];
  }

  if (lower.includes('missing letters')) {
    return [
      { title: 'Find the Missing Letter', speak: `Hello ${name}! Let us fill in the missing letters in the sequence!`, emoji: '❓', anim: 'bounce' },
      { title: 'What comes next?', speak: 'What comes after A, B? Yes! It is C!', emoji: '🔤', anim: 'pop' },
      { title: 'Fill the blank', speak: 'Fill in the blanks to complete the alphabet train!', emoji: '🚂', anim: 'jump' },
    ];
  }

  if (lower.includes('at family')) {
    return [
      { title: 'Word Families', speak: `Hello ${name}! Let us learn the "at" family words today!`, emoji: '👋', anim: 'bounce' },
      { title: 'Cat', speak: 'C - A - T spells Cat!', emoji: '🐱', word: 'cat', family: 'at', anim: 'pop' },
      { title: 'Hat', speak: 'H - A - T spells Hat!', emoji: '🎩', word: 'hat', family: 'at', anim: 'swing' },
      { title: 'Mat', speak: 'M - A - T spells Mat!', emoji: '🧹', word: 'mat', family: 'at', anim: 'wiggle' },
    ];
  }

  return [
    { title: 'Ready', speak: `Hi ${name}! Welcome to UKG English class!`, emoji: '✨', anim: 'jump' },
  ];
}

export function cleanSoundTerms(text: string): string {
  if (!text) return '';
  let cleaned = text;
  
  // Specific mappings for UKG Ch 2
  cleaned = cleaned.replace(/Phonics & Letter Sounds/gi, 'Word Reading & Alphabets');
  cleaned = cleaned.replace(/Alphabets & Phonics/gi, 'Word Reading & Alphabets');
  cleaned = cleaned.replace(/Term 3: Small Letters & Phonics/gi, 'Term 3: Small Letters & Words');
  cleaned = cleaned.replace(/Letter Sounds A-Z/gi, 'Word Building A-Z');
  cleaned = cleaned.replace(/Learn the sound each letter makes from A to Z/gi, 'Learn word starting letters from A to Z');
  cleaned = cleaned.replace(/Beginning Sound/gi, 'Starting Letters');
  cleaned = cleaned.replace(/Identify the first sound of words/gi, 'Identify the starting letter of words');
  cleaned = cleaned.replace(/Ending Sound/gi, 'Ending Letters');
  cleaned = cleaned.replace(/Identify the last sound of words/gi, 'Identify the ending letter of words');
  cleaned = cleaned.replace(/Picture & Sound Recognition/gi, 'Picture & Letter Match');
  cleaned = cleaned.replace(/Match pictures to their beginning sounds/gi, 'Match pictures to their starting letters');
  
  // General word cleanups
  cleaned = cleaned.replace(/soundboard/gi, 'alphabet board');
  cleaned = cleaned.replace(/Sound Board/gi, 'Alphabet Board');
  cleaned = cleaned.replace(/sound/gi, 'letter');
  cleaned = cleaned.replace(/sounds/gi, 'letters');
  cleaned = cleaned.replace(/Phonics/gi, 'Word Reading');

  return cleaned;
}
