'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type TutorialStep = {
  title: string;
  speak: string;
  emoji: string;
  text?: string;
  anim?: 'bounce' | 'pop' | 'spin' | 'wiggle' | 'float' | 'pulse' | 'swing' | 'shake' | 'jump';
  word?: string;
  family?: string;
  shapePath?: string;
};

export type QuizQuestion = {
  question: string;
  correctWord: string;
  correctEmoji: string;
  options: { word: string; emoji: string }[];
};

export const WORD_VISUALS: Record<string, { emoji: string; mascot: string; color: string; sound: string }> = {
  apple: { emoji: '🍎', mascot: '🍎', color: 'from-red-400 to-rose-500', sound: 'Apple!' },
  ball: { emoji: '🏀', mascot: '⚽', color: 'from-orange-400 to-amber-500', sound: 'Ball!' },
  cat: { emoji: '🐱', mascot: '🐱', color: 'from-yellow-400 to-amber-500', sound: 'Cat! Meow!' },
  dog: { emoji: '🐶', mascot: '🐶', color: 'from-amber-400 to-yellow-500', sound: 'Dog! Woof!' },
  elephant: { emoji: '🐘', mascot: '🐘', color: 'from-gray-400 to-slate-500', sound: 'Elephant!' },
  fish: { emoji: '🐟', mascot: '🐟', color: 'from-blue-400 to-cyan-500', sound: 'Fish! Swim swim!' },
  grapes: { emoji: '🍇', mascot: '🍇', color: 'from-purple-400 to-violet-500', sound: 'Grapes!' },
  hat: { emoji: '🎩', mascot: '🎩', color: 'from-pink-400 to-rose-500', sound: 'Hat!' },
  'ice cream': { emoji: '🍦', mascot: '🍦', color: 'from-pink-400 to-purple-500', sound: 'Ice cream!' },
  jug: { emoji: '🏺', mascot: '🏺', color: 'from-indigo-400 to-blue-500', sound: 'Jug!' },
  kite: { emoji: '🪁', mascot: '🪁', color: 'from-violet-400 to-fuchsia-500', sound: 'Kite!' },
  lion: { emoji: '🦁', mascot: '🦁', color: 'from-orange-400 to-red-500', sound: 'Lion! Roar!' },
  mango: { emoji: '🥭', mascot: '🥭', color: 'from-yellow-400 to-orange-500', sound: 'Mango!' },
  monkey: { emoji: '🐵', mascot: '🐵', color: 'from-amber-400 to-yellow-500', sound: 'Monkey!' },
  nest: { emoji: '🪹', mascot: '🪺', color: 'from-amber-400 to-emerald-500', sound: 'Nest!' },
  orange: { emoji: '🍊', mascot: '🍊', color: 'from-orange-400 to-red-500', sound: 'Orange!' },
  parrot: { emoji: '🦜', mascot: '🦜', color: 'from-green-400 to-emerald-500', sound: 'Parrot!' },
  queen: { emoji: '👸', mascot: '👑', color: 'from-purple-400 to-pink-500', sound: 'Queen!' },
  rabbit: { emoji: '🐰', mascot: '🐰', color: 'from-pink-400 to-purple-500', sound: 'Rabbit!' },
  sun: { emoji: '☀️', mascot: '☀️', color: 'from-yellow-400 to-amber-500', sound: 'Sun!' },
  tiger: { emoji: '🐯', mascot: '🐯', color: 'from-orange-400 to-amber-500', sound: 'Tiger!' },
  umbrella: { emoji: '☂️', mascot: '☂️', color: 'from-blue-400 to-cyan-500', sound: 'Umbrella!' },
  van: { emoji: '🚐', mascot: '🚐', color: 'from-sky-400 to-blue-500', sound: 'Van!' },
  watch: { emoji: '⌚', mascot: '⌚', color: 'from-gray-400 to-slate-500', sound: 'Watch!' },
  xylophone: { emoji: '🎹', mascot: '🎶', color: 'from-rainbow-400 to-purple-500', sound: 'Xylophone!' },
  yak: { emoji: '🦬', mascot: '🐃', color: 'from-brown-400 to-amber-500', sound: 'Yak!' },
  zebra: { emoji: '🦓', mascot: '🦓', color: 'from-gray-400 to-slate-500', sound: 'Zebra!' },
  hen: { emoji: '🐔', mascot: '🐔', color: 'from-amber-400 to-orange-500', sound: 'Hen!' },
};

export const STROKE_LABELS: Record<string, string> = {
  standing: 'Standing Line', sleeping: 'Sleeping Line',
  'left-slanting': 'Left Slanting Line', 'right-slanting': 'Right Slanting Line',
  'left-curve': 'Left Curve', 'right-curve': 'Right Curve',
  'up-curve': 'Up Curve', 'down-curve': 'Down Curve',
};

export const QUIZ_STROKES = ['standing', 'sleeping', 'left-slanting', 'right-slanting', 'left-curve', 'right-curve', 'up-curve', 'down-curve'];
export const PRACTICE_COUNT = 1;
export const EXAM_COUNT = 5;

export const COLOR_SET = [
  'from-red-400 to-rose-500', 'from-blue-400 to-indigo-500', 'from-emerald-400 to-teal-500',
  'from-orange-400 to-amber-500', 'from-purple-400 to-violet-500', 'from-pink-400 to-fuchsia-500',
];

export const animVariants: Record<string, object> = {
  bounce: { y: [0, -30, 0], transition: { duration: 0.8, ease: 'easeInOut' } },
  pop: { scale: [0.8, 1.1, 1], transition: { duration: 0.6, ease: 'easeInOut' } },
  spin: { rotate: [0, 15, -15, 0], transition: { duration: 0.6, ease: 'easeInOut' } },
  wiggle: { rotate: [-5, 5, -5], transition: { duration: 0.4, ease: 'easeInOut' } },
  float: { y: [0, -15, 0], transition: { duration: 1.2, ease: 'easeInOut' } },
  pulse: { scale: [1, 1.15, 1], transition: { duration: 0.6, ease: 'easeInOut' } },
  swing: { rotate: [-8, 8, -8], transition: { duration: 0.6, ease: 'easeInOut' } },
  shake: { x: [-6, 6, -6, 6, 0], transition: { duration: 0.4, ease: 'easeInOut' } },
  jump: { y: [0, -40, 0], transition: { duration: 0.5, ease: 'easeOut' } },
};

export const emojiToImage: Record<string, string> = {
  '🏆': '/assets/img/achievement.webp',
  '⭐': '/assets/img/achievement.webp',
  '🎊': '/assets/img/achievement.webp',
  '🎉': '/assets/img/achievement.webp',
  '🌟': '/assets/img/achievement.webp',
  '🔤': '/assets/portals/alphabet.webp',
  '📚': '/assets/portals/alphabet.webp',
  '🔢': '/assets/portals/numbers.webp',
  '🎨': '/assets/portals/colors.webp',
  '🌈': '/assets/img/hero.webp',
  '🌅': '/assets/img/hero.webp',
  '🌲': '/assets/img/hero.webp',
  '☀️': '/assets/img/hero.webp',
  '🌞': '/assets/img/hero.webp',
  '🐰': '/assets/portals/animals.webp',
  '🐢': '/assets/portals/animals.webp',
  '🐱': '/assets/portals/animals.webp',
  '🐶': '/assets/portals/animals.webp',
  '🦁': '/assets/portals/animals.webp',
  '🐘': '/assets/portals/animals.webp',
  '🐵': '/assets/portals/animals.webp',
  '🐯': '/assets/portals/animals.webp',
  '🦓': '/assets/portals/animals.webp',
  '🐔': '/assets/portals/animals.webp',
  '🐦': '/assets/portals/animals.webp',
  '🐟': '/assets/portals/animals.webp',
  '🐄': '/assets/portals/animals.webp',
  '🐒': '/assets/portals/animals.webp',
  '🦜': '/assets/portals/animals.webp',
  '🦋': '/assets/portals/animals.webp',
  '🐝': '/assets/portals/animals.webp',
  '🐌': '/assets/portals/animals.webp',
  '🐇': '/assets/portals/animals.webp',
  '🦆': '/assets/portals/animals.webp',
  '🦉': '/assets/portals/animals.webp',
  '💪': '/assets/img/achievement.webp',
  '💨': '/assets/portals/animals.webp',
  '😲': '/assets/img/group.webp',
  '👥': '/assets/img/group.webp',
  '🧑‍🤝‍🧑': '/assets/img/group.webp',
  '🍎': '/assets/img/logo.webp',
  '🍇': '/assets/img/logo.webp',
  '🍊': '/assets/img/logo.webp',
  '🍌': '/assets/img/logo.webp',
  '📏': '/assets/portals/alphabet.webp',
  '📐': '/assets/portals/alphabet.webp',
  '✏️': '/assets/portals/alphabet.webp',
  '✍️': '/assets/portals/alphabet.webp',
  '🎵': '/assets/portals/alphabet.webp',
  '👑': '/assets/portals/alphabet.webp',
  '🗣️': '/assets/portals/alphabet.webp',
  '🧮': '/assets/portals/numbers.webp',
  '🌳': '/assets/img/hero.webp',
  '🌍': '/assets/img/hero.webp',
  '🧠': '/assets/img/achievement.webp',
  '📖': '/assets/portals/alphabet.webp',
  '🎒': '/assets/portals/alphabet.webp',
  '🎓': '/assets/img/achievement.webp',
  '🧸': '/assets/portals/animals.webp',
  '🖍️': '/assets/portals/alphabet.webp',
  'ENG_IMG': '/assets/img/lkg_eng_cover.png',
  'MATH_IMG': '/assets/img/math_cover.png',
  'EVS_IMG': '/assets/img/evs_cover.png',
  'GK_IMG': '/assets/img/gk_cover.png',
  'HINDI_IMG': '/assets/img/hindi_cover.png',
  'TAMIL_IMG': '/assets/img/tamil_cover.png',
  'PRE_WRITING_IMG': '/assets/img/pre_writing_icon.png',
  'CHECKPOINT_IMG': '/assets/img/checkpoint_icon.png',
  'STORY_IMG': '/assets/img/story_icon.png',
  'A_TO_M_IMG': '/assets/img/a_to_m.svg',
  'N_TO_Z_IMG': '/assets/img/n_to_z.svg',
  'PHONICS_IMG': '/assets/img/phonics.svg',
  'RHYMES_IMG': '/assets/img/rhymes.svg',
  'COLORS_IMG': '/assets/img/colors.svg',
  'SHAPES_IMG': '/assets/img/shapes.svg',
  'FRUITS_VEG_IMG': '/assets/img/fruits_veg.svg',
  'ANIMALS_IMG': '/assets/img/animals.svg',
  'BODY_IMG': '/assets/img/body.svg',
  'FAMILY_IMG': '/assets/img/family.svg',
  'SMALL_AM_IMG': '/assets/img/small_letters_am.svg',
  'SMALL_NZ_IMG': '/assets/img/small_letters_nz.svg',
  'PHONICS_AT_IMG': '/assets/img/phonics_at.svg',
  'PHONICS_IT_IMG': '/assets/img/phonics_it.svg',
  'PHONICS_OP_IMG': '/assets/img/phonics_op.svg',
  'PHONICS_UN_IMG': '/assets/img/phonics_un.svg',
  'NAME_WRITING_IMG': '/assets/img/name_writing.svg',
  'LINE_STANDING_IMG': '/assets/img/line_standing.svg',
  'LINE_SLEEPING_IMG': '/assets/img/line_sleeping.svg',
  'LINE_SLANTING_IMG': '/assets/img/line_slanting.svg',
  'LINE_CURVE_IMG': '/assets/img/line_curve.svg',
  'LINE_ZIGZAG_IMG': '/assets/img/line_zigzag.svg',
};

const SHAPE_SVG: Record<string, string> = {
  standing: 'M50,10 L50,90',
  sleeping: 'M10,50 L90,50',
  'left-slanting': 'M90,10 L10,90',
  'right-slanting': 'M10,10 L90,90',
  'up-curve': 'M10,50 Q50,10 90,50',
  'down-curve': 'M10,50 Q50,90 90,50',
  'left-curve': 'M50,10 Q10,50 50,90',
  'right-curve': 'M50,10 Q90,50 50,90',
  zigzag: 'M10,90 L30,10 L50,90 L70,10 L90,90',
  circle: 'M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10',
  square: 'M20,10 L80,10 L80,90 L20,90 Z',
  triangle: 'M50,8 L92,92 L8,92 Z',
  star: 'M50,2 L64,35 L99,35 L71,57 L81,92 L50,72 L19,92 L29,57 L1,35 L36,35 Z',
  diamond: 'M50,8 L92,50 L50,92 L8,50 Z',
  oval: 'M50,8 A42,35 0 1,1 50,92 A42,35 0 1,1 50,8',
  rectangle: 'M15,10 L85,10 L85,90 L15,90 Z',
};

const SHAPE_COLORS: Record<string, string> = {
  standing: '#6366F1', sleeping: '#22C55E', 'left-slanting': '#F59E0B', 'right-slanting': '#F97316',
  'up-curve': '#06B6D4', 'down-curve': '#10B981', 'left-curve': '#8B5CF6', 'right-curve': '#EC4899',
  zigzag: '#EF4444', circle: '#3B82F6', square: '#A855F7', triangle: '#F97316',
  star: '#EAB308', diamond: '#06B6D4', oval: '#EC4899', rectangle: '#22C55E',
};

export const ShapeVisualizer = React.memo(function ShapeVisualizer({ path }: { path: string }) {
  const svgPath = SHAPE_SVG[path];
  const color = SHAPE_COLORS[path] || '#f0ead0';
  if (!svgPath) return null;
  return (
    <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full p-2">
        {/* Chalk shadow */}
        <path d={svgPath} fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
          transform="translate(2,2)" />
        {/* Chalk line */}
        <path d={svgPath} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="300" strokeDashoffset="300"
          filter="url(#chalkTexture)"
          style={{ filter: 'drop-shadow(0 0 6px rgba(240,234,208,0.15))' }}>
          <animate attributeName="stroke-dashoffset" from="300" to="0" dur="1.5s" fill="freeze"
            calcMode="spline" keySplines="0.4 0 0.2 1" keyTimes="0;1" />
        </path>
        {/* Chalk dust dots along path */}
        <animate attributeName="opacity" from="0" to="0.3" dur="1.5s" fill="freeze" />
      </svg>
    </div>
  );
});

export const StepEmoji = React.memo(function StepEmoji({ emoji, anim }: { emoji: string; anim?: string }) {
  const variant = anim && animVariants[anim] ? animVariants[anim] : {};
  const imgSrc = emojiToImage[emoji];
  if (imgSrc) {
    return (
      <motion.div
        animate={variant}
        className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto"
      >
        <img
          src={imgSrc}
          alt=""
          className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)]"
          loading="lazy"
        />
      </motion.div>
    );
  }
  return (
    <motion.div
      animate={variant}
      className="text-[5rem] sm:text-[6rem] drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)]"
    >
      {emoji}
    </motion.div>
  );
});

function EmojiDisplay({ emoji, className }: { emoji: string; className?: string }) {
  const imgSrc = emojiToImage[emoji];
  if (imgSrc) {
    return (
      <img src={imgSrc} alt="" className={`object-contain ${className || ''}`} loading="lazy" />
    );
  }
  return <span className={className}>{emoji}</span>;
}

export const PhonicsWordCard = React.memo(function PhonicsWordCard({ word, family, emoji }: { word: string; family?: string; emoji: string }) {
  if (!family) {
    return (
      <div className="flex flex-col items-center gap-2">
        <EmojiDisplay emoji={emoji} className="text-4xl sm:text-5xl" />
        <div className="bg-white/40 backdrop-blur-md rounded-xl px-4 sm:px-6 py-2 border-2 border-white/50 shadow-lg">
          <span className="text-3xl sm:text-4xl font-black text-indigo-950 tracking-wider">{word}</span>
        </div>
      </div>
    );
  }

  const fi = word.toLowerCase().indexOf(family);
  const prefix = fi > 0 ? word.slice(0, fi) : '';
  const famPart = fi >= 0 ? word.slice(fi, fi + family.length) : '';

  return (
    <div className="flex flex-col items-center gap-2">
      {!prefix && (
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="text-4xl sm:text-5xl"
        >
          <EmojiDisplay emoji={emoji} className="text-4xl sm:text-5xl" />
        </motion.div>
      )}
      <div className="bg-white/40 backdrop-blur-md rounded-xl px-4 sm:px-6 py-2 border-2 border-white/50 shadow-lg flex items-center gap-0">
        <span className="text-3xl sm:text-4xl font-black tracking-wider">
          {prefix && <span className="text-indigo-500">{prefix}</span>}
          {famPart && (
            <span className="text-amber-400 bg-amber-500/20 px-1 rounded-lg drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
              {famPart}
            </span>
          )}
        </span>
      </div>
      <div className="bg-amber-400/30 backdrop-blur-sm rounded-full px-4 py-1 border border-white/40">
        <span className="text-sm sm:text-base font-black text-amber-700 tracking-wider">'{family}'</span>
      </div>
    </div>
  );
});

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function animalSound(a: string) {
  const map: Record<string, string> = {
    cat: 'meow', dog: 'woof', lion: 'roar', elephant: 'trumpet',
    bird: 'tweet', fish: 'blub', cow: 'moo', monkey: 'oo oo ah ah'
  };
  return map[a] || a;
}

function getWordEmoji(word: string) {
  const map: Record<string, string> = {
    Apple: '🍎', Ball: '⚽', Cat: '🐱', Dog: '🐶', Elephant: '🐘', Fish: '🐟',
    Grapes: '🍇', Hat: '🎩', 'Ice cream': '🍦', Jug: '🍶', Kite: '🪁', Lion: '🦁',
    Monkey: '🐵', Nest: '🪹', Orange: '🍊', Parrot: '🦜', Queen: '👸', Rabbit: '🐰',
    Sun: '☀️', Tiger: '🐯', Umbrella: '☂️', Van: '🚐', Watch: '⌚', Xylophone: '🎹',
    Yak: '🦬', Zebra: '🦓'
  };
  return map[word] || '⭐';
}

export const COLOR_EMOJIS: Record<string, string> = {
  red: '🔴', blue: '🔵', yellow: '🟡', green: '🟢',
  orange: '🟠', purple: '🟣', pink: '🩷', brown: '🟤',
  white: '⚪', black: '⚫',
};
export const COLOR_EMOJI_TO_NAME: Record<string, string> = {};
for (const [name, emoji] of Object.entries(COLOR_EMOJIS)) {
  COLOR_EMOJI_TO_NAME[emoji] = name;
}
const COLOR_NAMES = Object.keys(COLOR_EMOJIS);

export function shuffleQuiz<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateQuiz(steps: TutorialStep[]): QuizQuestion[] {
  const wordSteps = steps.filter((s): s is TutorialStep & { word: string; emoji: string } => !!s.word && !!s.emoji);
  // Add unique shapes as quiz items
  const seenShapes = new Set<string>();
  for (const s of steps) {
    if (s.shapePath && s.emoji && !seenShapes.has(s.shapePath)) {
      seenShapes.add(s.shapePath);
      if (!wordSteps.find(w => w.word === s.shapePath)) {
        wordSteps.push({ word: s.shapePath, emoji: s.emoji, title: '', speak: '' });
      }
    }
  }
  // Add color steps as quiz items
  const seenColors = new Set<string>();
  for (const s of steps) {
    if (s.emoji && COLOR_EMOJI_TO_NAME[s.emoji] && !seenColors.has(s.emoji)) {
      seenColors.add(s.emoji);
      const colorName = COLOR_EMOJI_TO_NAME[s.emoji];
      if (!wordSteps.find(w => w.word === colorName)) {
        wordSteps.push({ word: colorName, emoji: s.emoji, title: '', speak: '' });
      }
    }
  }
  if (wordSteps.length < 2) {
    // Removed fallbackShapes completely so that it doesn't generate a fake quiz for shapes
  }
  if (wordSteps.length < 2) return [];

  const families = new Map<string, { word: string; emoji: string }[]>();
  for (const s of wordSteps) {
    const f = s.family || s.word;
    if (!families.has(f)) families.set(f, []);
    families.get(f)!.push({ word: s.word, emoji: s.emoji });
  }

  const questions: QuizQuestion[] = [];

  let maxFam = '';
  let maxWords: { word: string; emoji: string }[] = [];
  for (const [f, words] of families) {
    if (words.length > maxWords.length) { maxFam = f; maxWords = words; }
  }

  if (maxWords.length >= 2) {
    const selected = shuffleQuiz(maxWords).slice(0, Math.min(4, maxWords.length));
    const otherFamilyWords: { word: string; emoji: string }[] = [];
    for (const [f, words] of families) {
      if (f !== maxFam) otherFamilyWords.push(...words);
    }

    const singleFamily = otherFamilyWords.length === 0;

    for (const correct of selected) {
      let wrong: { word: string; emoji: string }[];
      if (singleFamily) {
        wrong = shuffleQuiz(maxWords.filter(w => w.word !== correct.word)).slice(0, 2);
      } else {
        wrong = shuffleQuiz(otherFamilyWords).slice(0, 2);
      }
      const options = shuffleQuiz([
        { word: correct.word, emoji: correct.emoji },
        ...wrong,
      ]);
      questions.push({
        question: singleFamily
          ? `Where is ${correct.word}?`
          : maxFam.length <= 3
            ? `Find the word with '${maxFam}'!`
            : `Find the word '${correct.word}'!`,
        correctWord: correct.word,
        correctEmoji: correct.emoji,
        options,
      });
    }
  }

  const allOpts = shuffleQuiz(wordSteps.map(w => ({ word: w.word, emoji: w.emoji })));
  if (allOpts.length >= 3) {
    const pick = allOpts[0];
    if (pick) {
      const wrong = shuffleQuiz(allOpts.filter(o => o.word !== pick.word)).slice(0, 2);
      questions.push({
        question: `Where is ${pick.word}?`,
        correctWord: pick.word,
        correctEmoji: pick.emoji,
        options: shuffleQuiz([pick, ...wrong]),
      });
    }
  }

  return shuffleQuiz(questions).slice(0, 5);
}

export function buildTutorial(title: string, studentName?: string): TutorialStep[] {
  const t = title.trim();
  const lower = t.toLowerCase();

  if (lower.includes('standing')) {
    return [
      { title: 'Trace the Standing Line!', speak: "Take your finger, draw from top to bottom! Standing Line!", emoji: '👆', anim: 'pulse', shapePath: 'standing' },
    ];
  }
  if (lower.includes('sleeping')) {
    return [
      { title: 'Trace the Sleeping Line!', speak: "Take your finger, start left, slide to the right! Sleeping Line!", emoji: '👆', anim: 'pulse', shapePath: 'sleeping' },
    ];
  }
  if (lower.includes('slanting')) {
    return [
      { title: 'Trace the Slanting Line!', speak: "From the top, slide down slanting! Slanting Line!", emoji: '👆', anim: 'pulse', shapePath: 'left-slanting' },
    ];
  }
  if (lower.includes('curved') || lower.includes('curve')) {
    return [
      { title: 'Trace the Curved Line!', speak: "Ooooh! Curved Line time! Round and round and round!", emoji: '👆', anim: 'pulse', shapePath: 'up-curve' },
    ];
  }
  if (lower.includes('zig') || lower.includes('zag')) {
    return [
      { title: 'Trace the Zig-Zag Line!', speak: "Ziggy zaggy zoo! Zig-Zag Line! Up and down, zip zap zoo!", emoji: '👆', anim: 'pulse', shapePath: 'zigzag' },
    ];
  }

  if (lower.includes('twinkle') || lower.includes('twinkl')) {
    return [
      { title: 'Twinkle Twinkle!', speak: "Twinkle twinkle little star! How I wonder what you are!", emoji: '⭐', anim: 'pop' },
      { title: 'Up in the sky!', speak: "Up above the world so high! Like a diamond in the sky!", emoji: '✨', anim: 'float' },
      { title: 'Twinkle twinkle!', speak: "Twinkle twinkle little star! Can you twinkle your fingers with me?", emoji: '🌟', anim: 'pulse' },
      { title: 'Diamond bright!', speak: "Like a diamond shining bright! All through the night!", emoji: '💎', anim: 'spin' },
      { title: 'Sing with me!', speak: "Twinkle twinkle little star! You sing so nicely! Let's clap!", emoji: '🎵', anim: 'wiggle' },
      { title: 'Dream of stars!', speak: "Sleep little one, dream of stars twinkling above! So beautiful!", emoji: '🌙', anim: 'float' },
      { title: 'Star champion!', speak: "You learned Twinkle Twinkle! Sing it for everyone! Yay!", emoji: '🎉', anim: 'shake' },
    ];
  }
  if (lower.includes('johnny') || lower.includes('yes papa')) {
    return [
      { title: 'Johnny Johnny!', speak: "Johnny Johnny! Yes Papa! Eating sugar? No Papa!", emoji: '👦', anim: 'pop' },
      { title: 'Telling lies?', speak: "Open your mouth! Ha ha ha! Johnny ate the sugar!", emoji: '👄', anim: 'wiggle' },
      { title: 'Shake your head!', speak: "No no no! Johnny shakes his head! No Papa, no sugar!", emoji: '🙅', anim: 'shake' },
      { title: 'Naughty Johnny!', speak: "You are naughty Johnny! But we love you anyway! Ha ha!", emoji: '😄', anim: 'bounce' },
      { title: 'Sing together!', speak: "Everybody now! Johnny Johnny! Yes Papa! Sing with me!", emoji: '🎤', anim: 'jump' },
      { title: 'Sugar is naughty!', speak: "Too much sugar is bad for teeth! Brush brush brush!", emoji: '🪥', anim: 'wiggle' },
      { title: 'Rhyme champ!', speak: "You learned Johnny Johnny! So fun! Give a big clap!", emoji: '👏', anim: 'shake' },
    ];
  }
  if (lower.includes('rain') && (lower.includes('go') || lower.includes('away'))) {
    return [
      { title: 'Rain Rain!', speak: "Rain rain go away! Come again another day!", emoji: '🌧️', anim: 'pop' },
      { title: 'Little baby wants to play!', speak: "Little baby wants to play! Rain please go away today!", emoji: '👶', anim: 'pulse' },
      { title: 'Sun come out!', speak: "Where is the sun? Come out sun! Little baby wants to play outside!", emoji: '☀️', anim: 'float' },
      { title: 'Splash in puddles!', speak: "Splash! Splash! Jumping in water puddles! Rain boots on!", emoji: '☂️', anim: 'bounce' },
      { title: 'Rainbow after rain!', speak: "After the rain comes a beautiful rainbow! All colors!", emoji: '🌈', anim: 'swing' },
      { title: 'Sing again!', speak: "Rain rain go away! Can you say it with me? Louder!", emoji: '🗣️', anim: 'jump' },
      { title: 'Sunny dance!', speak: "You learned Rain Rain Go Away! Now do a sunny dance!", emoji: '💃', anim: 'spin' },
    ];
  }
  if (lower.includes('baa') || lower.includes('black sheep')) {
    return [
      { title: 'Baa Baa Sheep!', speak: "Baa baa black sheep, have you any wool?", emoji: '🐑', anim: 'pop' },
      { title: 'Yes sir!', speak: "Yes sir, yes sir, three bags full!", emoji: '👍', anim: 'pulse' },
      { title: 'For the master!', speak: "One for the master! And one for the dame!", emoji: '👨‍👩‍👧', anim: 'float' },
      { title: 'For the little boy!', speak: "And one for the little boy who lives down the lane!", emoji: '👦', anim: 'bounce' },
      { title: 'Warm and cozy!', speak: "Wool is so warm and soft! Like a cozy sweater!", emoji: '🧶', anim: 'wiggle' },
      { title: 'Baa baa sing!', speak: "Can you sing Baa Baa with me? Baa baa black sheep!", emoji: '🎵', anim: 'jump' },
      { title: 'Sheep dance!', speak: "You learned Baa Baa Black Sheep! Let's hop like little sheep!", emoji: '🐏', anim: 'shake' },
    ];
  }
  if (lower.includes('humpty') || lower.includes('dumpty')) {
    return [
      { title: 'Humpty Dumpty!', speak: "Humpty Dumpty sat on a wall! Humpty Dumpty had a great fall!", emoji: '🥚', anim: 'pop' },
      { title: 'Sitting on the wall!', speak: "Look at Humpty sitting so high on the wall! So brave!", emoji: '🧱', anim: 'float' },
      { title: 'Oh no! A fall!', speak: "Whoops! Humpty fell down! All the king's horses and all the king's men!", emoji: '😮', anim: 'shake' },
      { title: 'Can they fix him?', speak: "Can they put Humpty together again? No! He's broken!", emoji: '😢', anim: 'pulse' },
      { title: 'Be careful!', speak: "We must be careful on walls! Hold someone's hand!", emoji: '🤝', anim: 'wiggle' },
      { title: 'Sing the rhyme!', speak: "Humpty Dumpty sat on a wall! Say it with me!", emoji: '📖', anim: 'jump' },
      { title: 'Happy Humpty!', speak: "You learned Humpty Dumpty! Let's give Humpty a happy hug!", emoji: '🤗', anim: 'spin' },
    ];
  }
  if (lower.includes('jack') && lower.includes('jill')) {
    return [
      { title: 'Jack and Jill!', speak: "Jack and Jill went up the hill! To fetch a pail of water!", emoji: '⛰️', anim: 'pop' },
      { title: 'Up the hill!', speak: "Up up up the hill they go! Climbing carrying the pail!", emoji: '🧗', anim: 'jump' },
      { title: 'Jack falls down!', speak: "Jack falls down! Oh no! And breaks his crown!", emoji: '🤕', anim: 'shake' },
      { title: 'Jill comes tumbling!', speak: "And Jill comes tumbling after! All the way down!", emoji: '🔄', anim: 'bounce' },
      { title: 'Get back up!', speak: "It's okay! Get back up! Try again! You can do it!", emoji: '💪', anim: 'pulse' },
      { title: 'Up the hill again!', speak: "Jack and Jill go up again! Never give up!", emoji: '⛰️', anim: 'float' },
      { title: 'Never give up!', speak: "You learned Jack and Jill! If you fall, get back up! Yay!", emoji: '🏆', anim: 'spin' },
    ];
  }

  if (lower.includes('lion') && lower.includes('mouse')) {
    return [
      { title: 'Lion and Mouse!', speak: "The Lion and the Mouse! A big lion and a tiny mouse!", emoji: '🦁', anim: 'pop' },
      { title: 'Roaring lion!', speak: "The lion roars! ROAR! But the tiny mouse is not scared!", emoji: '🐭', anim: 'shake' },
      { title: 'Mouse helps lion!', speak: "The mouse chews the net! Chip chip chip! Lion is free!", emoji: '🦴', anim: 'wiggle' },
      { title: 'Big and small!', speak: "Even tiny friends can help! The mouse saved the lion!", emoji: '💝', anim: 'pulse' },
      { title: 'Be kind!', speak: "Always be kind to everyone! Big or small! Kindness matters!", emoji: '🤗', anim: 'float' },
      { title: 'Can you say Lion?', speak: "Say Lion! Lllion! Say Mouse! Mmmouse! You can do it!", emoji: '🗣️', anim: 'jump' },
      { title: 'Kindness star!', speak: "You learned Lion and Mouse! Be kind like the mouse! Give a hug!", emoji: '⭐', anim: 'spin' },
    ];
  }
  if (lower.includes('thirsty') || (lower.includes('crow') && !lower.includes('snow'))) {
    return [
      { title: 'Thirsty Crow!', speak: "The Thirsty Crow! A crow is very very thirsty!", emoji: '🐦', anim: 'pop' },
      { title: 'Where is water?', speak: "The crow looks for water! But the pot has only a little!", emoji: '🏺', anim: 'pulse' },
      { title: 'Clever crow!', speak: "The crow drops pebbles! One by one! Plop plop plop!", emoji: '🪨', anim: 'bounce' },
      { title: 'Water rises!', speak: "The water comes up! Up up up! Now the crow can drink!", emoji: '💧', anim: 'float' },
      { title: 'So clever!', speak: "The clever crow solved the problem! Think think think!", emoji: '🧠', anim: 'pulse' },
      { title: 'Never give up!', speak: "The crow did not give up! Try try try again!", emoji: '💪', anim: 'jump' },
      { title: 'Smart crow champ!', speak: "You learned Thirsty Crow! Be clever, never give up! Clap!", emoji: '🎉', anim: 'shake' },
    ];
  }
  if ((lower.includes('hare') && lower.includes('tortoise')) || lower.includes('slow') || (lower.includes('tortoise') && lower.includes('hare'))) {
    return [
      { title: 'Hare and Tortoise!', speak: "The Hare and the Tortoise! Fast rabbit... slow turtle... who wins?", emoji: '🐰', anim: 'pop' },
      { title: 'Hare is too fast!', speak: "The hare zooms fast! Too fast! He stops to take a nap!", emoji: '💨', anim: 'jump' },
      { title: 'Tortoise keeps going!', speak: "Slow and steady! The tortoise keeps walking! Step by step!", emoji: '🐢', anim: 'pulse' },
      { title: 'Hare wakes up!', speak: "The hare wakes up! Oh no! The tortoise is almost at the finish!", emoji: '😲', anim: 'shake' },
      { title: 'Tortoise wins!', speak: "Slow and steady wins the race! The tortoise did it!", emoji: '🏆', anim: 'spin' },
      { title: "Don't give up!", speak: "Keep going! Even if you are slow, don't stop! You can win!", emoji: '💪', anim: 'bounce' },
      { title: 'Steady winner!', speak: "You learned Hare and Tortoise! Slow and steady wins! Yay!", emoji: '🎊', anim: 'shake' },
    ];
  }
  if (lower.includes('ugly') || lower.includes('duckling') || lower.includes('swan')) {
    return [
      { title: 'Ugly Duckling!', speak: "The Ugly Duckling! A baby duck looks different from others!", emoji: '🐤', anim: 'pop' },
      { title: 'They tease him!', speak: "The other ducks say: You are ugly! Go away!", emoji: '😢', anim: 'pulse' },
      { title: 'He is sad!', speak: "The little duckling is so sad and lonely! He hides away!", emoji: '😔', anim: 'float' },
      { title: 'He grows up!', speak: "Days pass, the duckling grows... and grows... and changes!", emoji: '🦢', anim: 'float' },
      { title: 'A beautiful swan!', speak: "He is not a duck! He is a beautiful white swan! So pretty!", emoji: '🕊️', anim: 'spin' },
      { title: 'You are special!', speak: "Everyone is special! Don't let anyone make you sad! You are beautiful!", emoji: '💖', anim: 'pulse' },
      { title: 'Beautiful you!', speak: "You learned Ugly Duckling! You are special and beautiful! Hug!", emoji: '🤗', anim: 'shake' },
    ];
  }
  if (lower.includes('gingerbread') || lower.includes('ginger')) {
    return [
      { title: 'Gingerbread Man!', speak: "Run run run! The Gingerbread Man! He runs away!", emoji: '🫚', anim: 'pop' },
      { title: 'Baked by grandma!', speak: "Grandma bakes a gingerbread man! But he jumps up and runs!", emoji: '👩‍🍳', anim: 'pulse' },
      { title: 'Run run run!', speak: "Run run as fast as you can! You can't catch me, I'm the Gingerbread Man!", emoji: '🏃', anim: 'jump' },
      { title: 'Animals chase him!', speak: "The cow chases! The horse chases! But Gingerbread Man is too fast!", emoji: '🐄', anim: 'bounce' },
      { title: 'Fox helps?', speak: "A sly fox says: I can help you cross the river! Hop on my nose!", emoji: '🦊', anim: 'wiggle' },
      { title: 'Snap!', speak: "The fox snaps! Yum yum! The gingerbread man is gone!", emoji: '😋', anim: 'shake' },
      { title: 'Run and play!', speak: "You learned Gingerbread Man! Run run run! Time for a run race!", emoji: '🎯', anim: 'spin' },
    ];
  }
  if (lower.includes('red') && lower.includes('riding') || lower.includes('wolf') && lower.includes('hood')) {
    return [
      { title: 'Red Riding Hood!', speak: "Little Red Riding Hood! Grandmother's basket is full of goodies!", emoji: '🧺', anim: 'pop' },
      { title: 'Walking through woods!', speak: "Through the woods she walks! Picking flowers along the way!", emoji: '🌺', anim: 'float' },
      { title: 'Big bad wolf!', speak: "The wolf asks: Where are you going, little girl? To Grandma's house!", emoji: '🐺', anim: 'shake' },
      { title: 'Wolf tricks her!', speak: "The wolf runs to Grandma's! He swallows Grandma! Oh no!", emoji: '😱', anim: 'bounce' },
      { title: 'Big eyes and teeth!', speak: "Grandma, what big eyes you have! And big teeth! All the better to eat you!", emoji: '👀', anim: 'pulse' },
      { title: 'Woodcutter saves!', speak: "The woodcutter hears! He saves Grandma and Red! The wolf runs away!", emoji: '🪓', anim: 'jump' },
      { title: 'Safe and sound!', speak: "You learned Red Riding Hood! Don't talk to strangers! Stay safe!", emoji: '🛡️', anim: 'spin' },
    ];
  }

  if (lower.includes('at') && (lower.includes('am') || lower.includes('an')) && (lower.includes('phonics') || lower.includes('family') || lower.includes('word'))) {
    return [
      { title: "🏠 Welcome to the 'at' Family!", speak: "Welcome little reader! Today we meet a word family where every word ends with 'at'. Let's spell them together!", emoji: '🏠', anim: 'pop', word: 'at', family: 'at' },
      { title: "🐱 c-a-t spells Cat!", speak: "c-a-t... cat! A soft furry cat that says meow! Can you spell cat with me? c-a-t!", emoji: '🐱', anim: 'bounce', word: 'cat', family: 'at' },
      { title: "🦇 b-a-t spells Bat!", speak: "b-a-t... bat! A bat that flies in the night sky! Flap your arms like a bat! b-a-t!", emoji: '🦇', anim: 'float', word: 'bat', family: 'at' },
      { title: "🎩 h-a-t spells Hat!", speak: "h-a-t... hat! A fancy hat for your head! Tap tap, put it on! h-a-t!", emoji: '🎩', anim: 'pop', word: 'hat', family: 'at' },
      { title: "👨 m-a-n spells Man!", speak: "m-a-n... man! A friendly man waves hello! Wave back and say m-a-n!", emoji: '👨', anim: 'pulse', word: 'man', family: 'an' },
      { title: "🌀 f-a-n spells Fan!", speak: "f-a-n... fan! A spinning fan that goes round and round! Spin your finger! f-a-n!", emoji: '🌀', anim: 'spin', word: 'fan', family: 'an' },
      { title: "⭐ You read 'at' words!", speak: "You read cat, bat, hat — all with 'at'! And man, fan — with 'an'! Give yourself a big clap!", emoji: '⭐', anim: 'shake' },
    ];
  }
  if (lower.includes('it') && (lower.includes('in') || lower.includes('ig')) && (lower.includes('phonics') || lower.includes('family') || lower.includes('word'))) {
    return [
      { title: "🏠 Welcome to the 'it' Family!", speak: "Here is a tiny word family — 'it'! With just two letters we can make many words. Let's explore!", emoji: '🏠', anim: 'pop', word: 'it', family: 'it' },
      { title: "🕳️ p-i-t spells Pit!", speak: "p-i-t... pit! A deep hole in the ground! Be careful, step around! p-i-t!", emoji: '🕳️', anim: 'bounce', word: 'pit', family: 'it' },
      { title: "🪑 s-i-t spells Sit!", speak: "s-i-t... sit! Time to sit down nicely! Plop on your bottom and say s-i-t!", emoji: '🪑', anim: 'pulse', word: 'sit', family: 'it' },
      { title: "🐷 p-i-g spells Pig!", speak: "p-i-g... pig! A happy pink pig that says oink oink! Snort like a pig! p-i-g!", emoji: '🐷', anim: 'bounce', word: 'pig', family: 'ig' },
      { title: "📌 p-i-n spells Pin!", speak: "p-i-n... pin! A tiny pin that sticks on your shirt! Tap tap! p-i-n!", emoji: '📌', anim: 'pulse', word: 'pin', family: 'in' },
      { title: "🏆 You read 'it' words!", speak: "Pit, sit with 'it'! Pig with 'ig'! Pin with 'in'! You read every word! Clever you!", emoji: '🏆', anim: 'spin' },
    ];
  }
  if (lower.includes('op') && (lower.includes('ot') || lower.includes('og')) && (lower.includes('phonics') || lower.includes('family') || lower.includes('word'))) {
    return [
      { title: "🏠 Welcome to the 'op' Family!", speak: "Now we meet three families — 'op', 'ot' and 'og'! Each one makes fun words. Let's begin!", emoji: '🏠', anim: 'pop', word: 'op', family: 'op' },
      { title: "🧹 m-o-p spells Mop!", speak: "m-o-p... mop! Swish swash, clean the floor! Grab your mop and say m-o-p!", emoji: '🧹', anim: 'wiggle', word: 'mop', family: 'op' },
      { title: "🍲 p-o-t spells Pot!", speak: "p-o-t... pot! Hot yummy soup cooking in a pot! Slurp slurp! p-o-t!", emoji: '🍲', anim: 'bounce', word: 'pot', family: 'ot' },
      { title: "🐶 d-o-g spells Dog!", speak: "d-o-g... dog! A happy dog wags its tail! Woof woof! Can you wag like a dog? d-o-g!", emoji: '🐶', anim: 'jump', word: 'dog', family: 'og' },
      { title: "🪵 l-o-g spells Log!", speak: "l-o-g... log! A big log to sit on in the forest! Rest your legs and say l-o-g!", emoji: '🪵', anim: 'pulse', word: 'log', family: 'og' },
      { title: "✨ You read 'op' words!", speak: "Mop with 'op', pot with 'ot', dog and log with 'og'! Three families, you read them all! Fantastic!", emoji: '✨', anim: 'shake' },
    ];
  }

  if (lower.includes('cvc') || (lower.includes('cat') && lower.includes('bat') && lower.includes('hat'))) {
    return [
      { title: "📖 What are CVC Words?", speak: "CVC words have just three letters — a consonant, a vowel, and a consonant. Let's blend sounds and read them!", emoji: '📖', anim: 'pop', word: 'cat' },
      { title: "🐱 c-a-t says Cat!", speak: "c-a-t... cat! A soft furry cat purring on your lap! Pet the cat and say c-a-t!", emoji: '🐱', anim: 'pulse', word: 'cat' },
      { title: "🦇 b-a-t says Bat!", speak: "b-a-t... bat! A bat soaring through the night! Flap your wings and say b-a-t!", emoji: '🦇', anim: 'float', word: 'bat' },
      { title: "🎩 h-a-t says Hat!", speak: "h-a-t... hat! A colourful hat sitting on your head! Touch your head and say h-a-t!", emoji: '🎩', anim: 'bounce', word: 'hat' },
      { title: "🧶 m-a-t says Mat!", speak: "m-a-t... mat! A soft mat to sit and play on! Cross your legs and say m-a-t!", emoji: '🧶', anim: 'pulse', word: 'mat' },
      { title: "🐀 r-a-t says Rat!", speak: "r-a-t... rat! A tiny rat scurrying across the floor! Run your fingers and say r-a-t!", emoji: '🐀', anim: 'jump', word: 'rat' },
      { title: "🌟 You read CVC words!", speak: "Cat, bat, hat, mat, rat — five CVC words all by yourself! You are a blending superstar! Clap clap clap!", emoji: '🌟', anim: 'shake' },
    ];
  }
  if (lower.includes('dog') && lower.includes('log') && lower.includes('fog')) {
    return [
      { title: "🏠 Discover the 'og' Family!", speak: "Can you hear it? Dog, log, fog — they all share the 'og' sound at the end! Let's read them one by one!", emoji: '🏠', anim: 'pop', word: 'dog', family: 'og' },
      { title: "🐶 d-o-g says Dog!", speak: "d-o-g... dog! A fluffy dog that wags its tail and says woof! Wag your body and say d-o-g!", emoji: '🐶', anim: 'bounce', word: 'dog', family: 'og' },
      { title: "🪵 l-o-g says Log!", speak: "l-o-g... log! A big wooden log resting on the ground! Sit carefully and say l-o-g!", emoji: '🪵', anim: 'pulse', word: 'log', family: 'og' },
      { title: "🌫️ f-o-g says Fog!", speak: "f-o-g... fog! Misty clouds all around, can't see far! Cover your eyes and say f-o-g!", emoji: '🌫️', anim: 'float', word: 'fog', family: 'og' },
      { title: "🐷 h-o-g says Hog!", speak: "h-o-g... hog! A big round pig that goes oink oink! Puff your cheeks and say h-o-g!", emoji: '🐷', anim: 'wiggle', word: 'hog', family: 'og' },
      { title: "🏃 j-o-g says Jog!", speak: "j-o-g... jog! Time to jog on the spot! Run run and say j-o-g!", emoji: '🏃', anim: 'jump', word: 'jog', family: 'og' },
      { title: "🦸 You read 'og' words!", speak: "Dog, log, fog, hog, jog — five words all with 'og'! You spotted the pattern! Reading superhero!", emoji: '🦸', anim: 'shake' },
    ];
  }
  if (lower.includes('un') && (lower.includes('ut') || lower.includes('ub'))) {
    return [
      { title: "🏠 Discover the 'un' Family!", speak: "Welcome to the 'un' word family! Sun, fun, run — they all end with 'un'! Let's read them together!", emoji: '🏠', anim: 'pop', word: 'sun', family: 'un' },
      { title: "☀️ s-u-n says Sun!", speak: "s-u-n... sun! The sun shines warm and bright! Stretch your arms up and say s-u-n!", emoji: '☀️', anim: 'float', word: 'sun', family: 'un' },
      { title: "🎮 f-u-n says Fun!", speak: "f-u-n... fun! Learning to read is fun! Smile and say f-u-n!", emoji: '🎮', anim: 'bounce', word: 'fun', family: 'un' },
      { title: "🏃 r-u-n says Run!", speak: "r-u-n... run! Let's run fast like the wind! Move your legs and say r-u-n!", emoji: '🏃', anim: 'jump', word: 'run', family: 'un' },
      { title: "🥯 b-u-n says Bun!", speak: "b-u-n... bun! A soft warm bun to eat! Nom nom! Say b-u-n!", emoji: '🥯', anim: 'pulse', word: 'bun', family: 'un' },
      { title: "🎉 You read 'un' words!", speak: "Sun, fun, run, bun — all have 'un'! You found the pattern! Dance and celebrate!", emoji: '🎉', anim: 'spin' },
    ];
  }
  if (lower.includes('sun') && lower.includes('run') && lower.includes('fun')) {
    return [
      { title: "🏠 Discover the 'un' Family!", speak: "Listen closely — sun, run, fun, bun! They all end with 'un'! Let's sound them out together!", emoji: '🏠', anim: 'pop', word: 'sun', family: 'un' },
      { title: "☀️ s-u-n says Sun!", speak: "s-u-n... sun! The bright warm sun shining in the sky! Stretch your arms up and say s-u-n!", emoji: '☀️', anim: 'float', word: 'sun', family: 'un' },
      { title: "🏃 r-u-n says Run!", speak: "r-u-n... run! Let's run as fast as we can! Zoom zoom! Move your legs and say r-u-n!", emoji: '🏃', anim: 'jump', word: 'run', family: 'un' },
      { title: "🎮 f-u-n says Fun!", speak: "f-u-n... fun! Learning to read is so much fun! Smile wide and say f-u-n!", emoji: '🎮', anim: 'bounce', word: 'fun', family: 'un' },
      { title: "🥯 b-u-n says Bun!", speak: "b-u-n... bun! A warm soft bun fresh from the oven! Pretend to eat and say b-u-n!", emoji: '🥯', anim: 'pulse', word: 'bun', family: 'un' },
      { title: "🎉 You read 'un' words!", speak: "Sun, run, fun, bun — all have 'un'! You cracked the code! Now dance and celebrate!", emoji: '🎉', anim: 'spin' },
    ];
  }

  if (lower.includes('simple') || (lower.includes('cat') && lower.includes('dog') && lower.includes('moon'))) {
    return [
      { title: "📖 Let's Read Simple Words!", speak: "You have learned so many sounds! Now let's put them together and read simple words all by yourself!", emoji: '📖', anim: 'pop' },
      { title: "🐱 Cat! c-a-t", speak: "c-a-t... cat! A sweet cat curling up for a nap! Can you read this word? c-a-t, cat!", emoji: '🐱', anim: 'bounce', word: 'cat' },
      { title: "🐶 Dog! d-o-g", speak: "d-o-g... dog! A playful dog wagging its tail! Can you read this word? d-o-g, dog!", emoji: '🐶', anim: 'jump', word: 'dog' },
      { title: "☀️ Sun! s-u-n", speak: "s-u-n... sun! The glowing sun brightening the day! Can you read this word? s-u-n, sun!", emoji: '☀️', anim: 'float', word: 'sun' },
      { title: "🌙 Moon! m-o-o-n", speak: "m-o-o-n... moon! The gentle moon watching at night! Can you read this word? m-o-o-n, moon!", emoji: '🌙', anim: 'pulse', word: 'moon' },
      { title: "📚 You read!", speak: "You read cat, dog, sun, moon — all by yourself! Every single word! I am so proud of you!", emoji: '📚', anim: 'spin' },
      { title: "⭐ Reading Star!", speak: "Today you became a reading star! Keep reading every day and you will shine brighter and brighter!", emoji: '⭐', anim: 'shake' },
    ];
  }

  if (lower.includes('small') && (lower.includes('a-m') || lower.includes('a to m'))) {
    return [
      { title: 'Small letters a-m!', speak: "Let's learn small letters from a to m! Ready?", emoji: '🔤', anim: 'pop' },
      { title: 'a b c d!', speak: "a is for apple! b is for ball! c is for cat! d is for dog!", emoji: '📚', anim: 'pulse' },
      { title: 'e f g h!', speak: "e is for elephant! f is for fish! g is for grapes! h is for hat!", emoji: '🐘', anim: 'bounce' },
      { title: 'i j k l m!', speak: "i is for igloo! j is for jug! k is for kite! l is for lion! m is for monkey!", emoji: '🐵', anim: 'wiggle' },
      { title: 'Trace with finger!', speak: "Trace a with your finger! Round and down! Now b! Down and around!", emoji: '✍️', anim: 'jump' },
      { title: 'Sing the alphabet!', speak: "A B C D E F G... H I J K L M! Sing with me!", emoji: '🎵', anim: 'swing' },
      { title: 'Letter star!', speak: "You learned a to m! Small letters! So clever! Give a clap!", emoji: '⭐', anim: 'shake' },
    ];
  }
  if (lower.includes('small') && (lower.includes('n-z') || lower.includes('n to z'))) {
    return [
      { title: 'Small letters n-z!', speak: "Let's learn small letters from n to z! You can do it!", emoji: '🔤', anim: 'pop' },
      { title: 'n o p q!', speak: "n is for nest! o is for orange! p is for parrot! q is for queen!", emoji: '👑', anim: 'pulse' },
      { title: 'r s t u!', speak: "r is for rabbit! s is for sun! t is for tiger! u is for umbrella!", emoji: '🐯', anim: 'bounce' },
      { title: 'v w x y z!', speak: "v is for van! w is for watch! x is for xylophone! y is for yak! z is for zebra!", emoji: '🦓', anim: 'wiggle' },
      { title: 'Trace them all!', speak: "Trace n with your finger! Up down up! Now z! Zig zag zig!", emoji: '✍️', anim: 'jump' },
      { title: 'Full alphabet!', speak: "Now you know a to z! All the letters! Sing the ABC song!", emoji: '🎵', anim: 'swing' },
      { title: 'Alphabet champ!', speak: "You learned all small letters! a to z! Alphabet champion!", emoji: '🏆', anim: 'spin' },
    ];
  }

  const letterMatch = t.match(/[A-Za-z]/);
  if (lower.includes('letter') || (letterMatch && t.length <= 2)) {
    const letter = letterMatch ? letterMatch[0].toUpperCase() : t;
    const words: Record<string, string> = {
      A: 'Apple', B: 'Ball', C: 'Cat', D: 'Dog', E: 'Elephant', F: 'Fish',
      G: 'Grapes', H: 'Hat', I: 'Ice cream', J: 'Jug', K: 'Kite', L: 'Lion',
      M: 'Monkey', N: 'Nest', O: 'Orange', P: 'Parrot', Q: 'Queen', R: 'Rabbit',
      S: 'Sun', T: 'Tiger', U: 'Umbrella', V: 'Van', W: 'Watch', X: 'Xylophone',
      Y: 'Yak', Z: 'Zebra'
    };
    const word = words[letter] || letter;
    const wordEmoji = getWordEmoji(word);
    return [
      { title: `Letter ${letter}!`, speak: `Let's learn letter ${letter}!`, emoji: '🔤', anim: 'pop' },
      { title: `This is ${letter}.`, speak: `This is letter ${letter}.`, emoji: letter, anim: 'pulse' },
      { title: `${letter} for ${word}`, speak: `${letter} is for ${word}. ${word}!`, emoji: wordEmoji, anim: 'bounce' },
      { title: 'Say it!', speak: `Can you say ${letter}?`, emoji: '🗣️', anim: 'wiggle' },
      { title: 'Great job!', speak: `You learned letter ${letter}!`, emoji: '⭐', anim: 'spin' },
    ];
  }

  const numMatch = t.match(/\d/);
  if (lower.includes('number') || numMatch) {
    const num = numMatch ? numMatch[0] : '1';
    const countEmojis = ['🍎', '🍌', '🍇', '🍊', '⭐', '🐶', '🐱', '🦋', '🌸', '🚗'];
    const e = countEmojis[parseInt(num) - 1] || '⭐';
    return [
      { title: `Number ${num}!`, speak: `Let's learn number ${num}!`, emoji: '🔢', anim: 'pop' },
      { title: `This is ${num}.`, speak: `This is number ${num}.`, emoji: num, anim: 'pulse' },
      { title: `Count ${num}!`, speak: `Count with me. ${Array(parseInt(num)).fill(e).join(' ')}. ${num}!`, emoji: e, anim: 'bounce' },
      { title: 'Say it!', speak: `Can you say ${num}?`, emoji: '🗣️', anim: 'wiggle' },
      { title: 'Great job!', speak: `You learned number ${num}!`, emoji: '⭐', anim: 'spin' },
    ];
  }

  if (lower.includes('name') || lower.includes('name writing') || lower.includes('my name')) {
    const name = studentName || 'Little Star';
    const letters = name.split('');
    const steps: TutorialStep[] = [
      { title: `✏️ Let's Write Your Name!`, speak: `Do you know what the most special word in the world is? It's your name! ${name}! Let's learn to write it together!`, emoji: '👤', anim: 'pop' },
      { title: `🎶 ${name} Song!`, speak: `Let's sing! ${name}, ${name}, that's your name! ${name}, ${name}, what a beautiful name! Can you clap along?`, emoji: '🎵', anim: 'swing' },
      { title: `👆 Trace your name!`, speak: `Use your finger and trace ${name} on the screen! Each letter is special, just like you! Start from the first letter!`, emoji: '👆', anim: 'bounce' },
    ];

    for (let i = 0; i < Math.min(letters.length, 8); i++) {
      const letter = letters[i].toUpperCase();
      steps.push({
        title: `✍️ Letter ${letter}!`,
        speak: `Now let's write the letter ${letter}! ${letter} is the ${i + 1}${i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'} letter in ${name}! Trace it carefully, you can do it!`,
        emoji: letter,
        anim: i % 2 === 0 ? 'pulse' : 'bounce',
        word: letter,
      });
    }

    steps.push({
      title: `⭐ You Wrote ${name}!`,
      speak: `You wrote ${name}! Every single letter! That is your special name and you can write it all by yourself! Give a big hug and say: That's my name!`,
      emoji: '🏆',
      anim: 'shake',
    });

    return steps;
  }

  const colorEmojis: Record<string, string> = {
    red: '🔴', blue: '🔵', green: '🟢', yellow: '🟡',
    orange: '🟠', purple: '🟣', pink: '🩷', black: '⚫', white: '⚪'
  };
  const colorKey = Object.keys(colorEmojis).find(c => lower.includes(c));
  if (colorKey) {
    return [
      { title: `${capitalize(colorKey)}!`, speak: `Let's learn the color ${colorKey}!`, emoji: '🎨', anim: 'pop' },
      { title: `This is ${colorKey}.`, speak: `This is ${colorKey}.`, emoji: colorEmojis[colorKey], anim: 'pulse' },
      { title: 'Look around!', speak: `Can you find something ${colorKey} near you?`, emoji: '👀', anim: 'wiggle' },
      { title: 'Say it!', speak: `Say ${colorKey}!`, emoji: '🗣️', anim: 'jump' },
      { title: 'Great job!', speak: `You learned the color ${colorKey}!`, emoji: '⭐', anim: 'spin' },
    ];
  }

  // Multi-shape lessons: "Circle, Square, Triangle" or "Rectangle, Star, Diamond, Heart, Oval"
  const SHAPE_STEPS: Record<string, { steps: TutorialStep[]; label: string }> = {
    circle: {
      label: 'Circle',
      steps: [
        { title: 'Trace the Circle!', speak: 'Trace the circle.', emoji: '👆', anim: 'pulse', shapePath: 'circle' },
      ],
    },
    square: {
      label: 'Square',
      steps: [
        { title: 'Trace the Square!', speak: 'Trace the square.', emoji: '👆', anim: 'pulse', shapePath: 'square' },
      ],
    },
    triangle: {
      label: 'Triangle',
      steps: [
        { title: 'Trace the Triangle!', speak: 'Trace the triangle.', emoji: '👆', anim: 'pulse', shapePath: 'triangle' },
      ],
    },
    rectangle: {
      label: 'Rectangle',
      steps: [
        { title: 'Trace the Rectangle!', speak: 'Trace the rectangle.', emoji: '👆', anim: 'pulse', shapePath: 'rectangle' },
      ],
    },
    star: {
      label: 'Star',
      steps: [
        { title: 'Trace the Star!', speak: 'Trace the star.', emoji: '👆', anim: 'pulse', shapePath: 'star' },
      ],
    },
    diamond: {
      label: 'Diamond',
      steps: [
        { title: 'Trace the Diamond!', speak: 'Trace the diamond.', emoji: '👆', anim: 'pulse', shapePath: 'diamond' },
      ],
    },
    oval: {
      label: 'Oval',
      steps: [
        { title: 'Trace the Oval!', speak: 'Trace the oval.', emoji: '👆', anim: 'pulse', shapePath: 'oval' },
      ],
    },
  };

  // Check for multi-shape lessons first (comma-separated shape names or "and" separated)
  const SHAPE_NAMES = Object.keys(SHAPE_STEPS);
  if (lower.includes(',')) {
    const parts = lower.split(',').map(p => p.trim());
    const matched = parts.filter(p => SHAPE_NAMES.some(s => p.includes(s)));
    if (matched.length >= 2) {
      const steps: TutorialStep[] = [];
      for (const shapeName of matched) {
        const shapeKey = SHAPE_NAMES.find(s => shapeName.includes(s));
        if (shapeKey) {
          steps.push(...SHAPE_STEPS[shapeKey].steps);
        }
      }
      steps.push({ title: 'All shapes done!', speak: 'You learned all the shapes! Now let me test you!', emoji: '🎉', anim: 'shake' });
      return steps;
    }
  }

  // Single shape matching
  const foundSingleShape = SHAPE_NAMES.find(s => lower.includes(s));
  if (foundSingleShape) {
    const data = SHAPE_STEPS[foundSingleShape];
    return [...data.steps];
  }

  // ── COLORS ──
  const COLOR_STEPS: Record<string, { steps: TutorialStep[]; label: string }> = {};

  for (const c of COLOR_NAMES) {
    COLOR_STEPS[c] = {
      label: capitalize(c),
      steps: [
        { title: `${capitalize(c)}!`, speak: `${capitalize(c)}.`, emoji: COLOR_EMOJIS[c], anim: 'pop' },
      ],
    };
  }

  // Multi-color (comma-separated)
  if (lower.includes(',')) {
    const parts = lower.split(',').map(p => p.trim());
    const matched = parts.filter(p => COLOR_NAMES.some(s => p.includes(s)));
    if (matched.length >= 2) {
      const steps: TutorialStep[] = [];
      for (const colorName of matched) {
        const ck = COLOR_NAMES.find(s => colorName.includes(s));
        if (ck) steps.push(...COLOR_STEPS[ck].steps);
      }
      steps.push({ title: 'All colors done!', speak: 'You learned all the colors! Now let me test you!', emoji: '🎉', anim: 'shake' });
      return steps;
    }
  }
  // Single color
  const foundColor = COLOR_NAMES.find(s => lower.includes(s));
  if (foundColor) {
    const data = COLOR_STEPS[foundColor];
    return [...data.steps, { title: 'Great job!', speak: `You learned ${data.label}!`, emoji: '⭐', anim: 'spin' }];
  }
  // Generic "colors" lesson — show all colors
  if (lower.includes('color') || lower.includes('colour')) {
    const steps: TutorialStep[] = [];
    for (const c of COLOR_NAMES) {
      steps.push(...COLOR_STEPS[c].steps);
    }
    steps.push({ title: 'All colors done!', speak: 'You learned all the colors! Now let me test you!', emoji: '🎉', anim: 'shake' });
    return steps;
  }

  const animals: Record<string, string> = { cat: '🐱', dog: '🐶', lion: '🦁', elephant: '🐘', bird: '🐦', fish: '🐟', cow: '🐮', monkey: '🐵' };
  const animalKey = Object.keys(animals).find(a => lower.includes(a));
  if (animalKey) {
    return [
      { title: capitalize(animalKey), speak: `This is a ${animalKey}.`, emoji: animals[animalKey], anim: 'pop' },
      { title: 'Look!', speak: `${capitalize(animalKey)} says ${animalSound(animalKey)}.`, emoji: animals[animalKey], anim: 'bounce' },
      { title: 'Say it!', speak: `Can you say ${animalKey}?`, emoji: '🗣️', anim: 'wiggle' },
      { title: 'Great job!', speak: `You learned ${capitalize(animalKey)}!`, emoji: '⭐', anim: 'spin' },
    ];
  }

  const fruits: Record<string, string> = { apple: '🍎', banana: '🍌', mango: '🥭', grapes: '🍇', orange: '🍊', watermelon: '🍉' };
  const fruitKey = Object.keys(fruits).find(f => lower.includes(f));
  if (fruitKey) {
    return [
      { title: capitalize(fruitKey), speak: `This is a ${fruitKey}.`, emoji: fruits[fruitKey], anim: 'pop' },
      { title: 'Yummy!', speak: `${capitalize(fruitKey)} is tasty and healthy!`, emoji: fruits[fruitKey], anim: 'bounce' },
      { title: 'Say it!', speak: `Can you say ${fruitKey}?`, emoji: '🗣️', anim: 'wiggle' },
      { title: 'Great job!', speak: `You learned ${capitalize(fruitKey)}!`, emoji: '⭐', anim: 'spin' },
    ];
  }

  return [
    { title: `Let's learn ${t}!`, speak: `Let's learn about ${t}!`, emoji: '📚', anim: 'pop' },
    { title: 'Look!', speak: `This is ${t}.`, emoji: '🌟', anim: 'pulse' },
    { title: 'Say it!', speak: `Can you say ${t}?`, emoji: '🗣️', anim: 'wiggle' },
    { title: 'Great job!', speak: `You learned ${t}!`, emoji: '⭐', anim: 'spin' },
  ];
}

