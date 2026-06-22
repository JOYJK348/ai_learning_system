'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Star, Play, Lock, CheckCircle2, ArrowLeft, RotateCcw, 
  HelpCircle, Calendar, Target, Award, Cloud, Gamepad2, ChevronRight, X
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useData } from '@/context/DataContext';
import { useQueryClient } from '@tanstack/react-query';
import { studentApi, studentKeys } from '@/core/services/studentApi';
import QuizEngine from '../_components/QuizEngine';
import TraceActivity from '../_components/activities/TraceActivity';
import { SoundMatchGame, TrueOrFalseGame, SequenceGame, MemoryMatchGame } from '../_components/GameActivities';

// ─── QUESTIONS & LEVELS DATA ───

type Option = {
  text: string;
  emoji?: string;
  img?: string;
  correct: boolean;
};

type Question = {
  type: 'trace' | 'sequence' | 'find' | 'match' | 'choice' | 'spelling' | 'sorting' | 'order' | 'math_compare' | 'math_count' | 'math_pattern';
  instruction: string;
  instructionTa: string;
  letter?: string;
  sequence?: string[];
  options: Option[];
  matchImage?: string;
};

type Level = {
  id: number;
  title: string;
  titleEn: string;
  mascot: string;
  color: string;
  borderColor: string;
  questions: Question[];
};

const TAMIL_LEVELS: Level[] = [
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

const ENGLISH_LEVELS: Level[] = [
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




const EVS_LEVELS: Level[] = [
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

const MATH_LEVELS: Level[] = [

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

// ─── HELPERS ───

function FamilyMedia({ emojiOrPath, className = "w-10 h-10 object-contain" }: { emojiOrPath: string; className?: string }) {
  const images: Record<string, string> = {
    '👩': '/assets/quiz/family-mother.png',
    '👨': '/assets/quiz/family-father.png',
    '👧': '/assets/quiz/family-sister.png',
    '👦': '/assets/quiz/family-brother.png',
    '👵': '/assets/quiz/family-grandma.png',
    '👴': '/assets/quiz/family-grandpa.png',
  };
  const src = images[emojiOrPath] || (emojiOrPath.startsWith('/') ? emojiOrPath : null);
  if (src) {
    return <img src={src} className={className} alt="media" />;
  }

  const name = emojiOrPath.toLowerCase();
  if (name === 'apple') {
    return (
      <div className={className}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M50 30 C40 10, 15 20, 20 50 C25 80, 45 85, 50 85 C55 85, 75 80, 80 50 C85 20, 60 10, 50 30 Z" fill="#ef4444" />
          <path d="M50 30 Q55 15, 65 12 Q68 18, 55 28 Z" fill="#22c55e" />
          <path d="M50 30 Q48 20, 50 10" stroke="#78350f" strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    );
  }
  if (name === 'elephant') {
    return (
      <div className={className}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="25" y="45" width="50" height="35" rx="15" fill="#94a3b8" />
          <circle cx="35" cy="40" r="22" fill="#94a3b8" />
          <circle cx="28" cy="18" r="8" fill="#e2e8f0" />
          <path d="M 28 26 C 26 34, 18 36, 12 30" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" fill="none" />
          <rect x="35" y="70" width="10" height="20" rx="3" fill="#64748b" />
          <rect x="55" y="70" width="10" height="20" rx="3" fill="#64748b" />
          <circle cx="28" cy="35" r="3" fill="#0f172a" />
        </svg>
      </div>
    );
  }
  if (name === 'cat') {
    return (
      <div className={className}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="55" r="30" fill="#f97316" />
          <polygon points="25,35 30,10 45,30" fill="#f97316" />
          <polygon points="75,35 70,10 55,30" fill="#f97316" />
          <circle cx="40" cy="50" r="4" fill="#000" />
          <circle cx="60" cy="50" r="4" fill="#000" />
          <polygon points="46,58 54,58 50,64" fill="#f43f5e" />
          <path d="M 45 68 Q 50 72, 55 68" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    );
  }
  if (name === 'dog') {
    return (
      <div className={className}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="55" r="32" fill="#d97706" />
          <path d="M20 30 C15 45, 22 65, 25 70" stroke="#92400e" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M80 30 C85 45, 78 65, 75 70" stroke="#92400e" strokeWidth="12" strokeLinecap="round" fill="none" />
          <circle cx="38" cy="50" r="4" fill="#000" />
          <circle cx="62" cy="50" r="4" fill="#000" />
          <ellipse cx="50" cy="62" rx="7" ry="5" fill="#000" />
        </svg>
      </div>
    );
  }
  if (name === 'fish') {
    return (
      <div className={className}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 15 50 C 35 25, 75 25, 85 50 C 75 75, 35 75, 15 50 Z" fill="#f97316" />
          <polygon points="15,50 2,35 5,65" fill="#ea580c" />
          <circle cx="68" cy="45" r="4" fill="#fff" />
          <circle cx="69" cy="45" r="2" fill="#000" />
          <path d="M 75 54 Q 70 58, 65 54" stroke="#ea580c" strokeWidth="3" fill="none" />
        </svg>
      </div>
    );
  }
  if (name === 'nest') {
    return (
      <div className={className}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <ellipse cx="50" cy="65" rx="35" ry="20" fill="#78350f" />
          <ellipse cx="50" cy="60" rx="30" ry="15" fill="#451a03" />
          <ellipse cx="40" cy="52" rx="10" ry="14" fill="#e2e8f0" />
          <ellipse cx="60" cy="52" rx="10" ry="14" fill="#e2e8f0" />
          <path d="M20 60 Q50 85, 80 60 M15 65 Q50 90, 85 65" stroke="#9a3412" strokeWidth="4" fill="none" />
        </svg>
      </div>
    );
  }
  if (name === 'sun') {
    return (
      <div className={className}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="28" fill="#eab308" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
            <line
              key={idx}
              x1="50"
              y1="10"
              x2="50"
              y2="20"
              stroke="#eab308"
              strokeWidth="6"
              strokeLinecap="round"
              transform={`rotate(${angle} 50 50)`}
            />
          ))}
          <circle cx="42" cy="45" r="3" fill="#000" />
          <circle cx="58" cy="45" r="3" fill="#000" />
          <path d="M 40 58 Q 50 68, 60 58" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    );
  }
  if (name === 'umbrella') {
    return (
      <div className={className}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 15 50 C 15 20, 85 20, 85 50 Z" fill="#ef4444" />
          <path d="M 15 50 Q 50 58, 85 50" stroke="#b91c1c" strokeWidth="4" fill="none" />
          <path d="M 50 50 L 50 78 A 8 8 0 0 1 38 84" stroke="#475569" strokeWidth="5" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    );
  }
  if (name === 'zebra') {
    return (
      <div className={className}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="55" r="32" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
          <polygon points="30,35 25,12 40,25" fill="#0f172a" />
          <polygon points="70,35 75,12 60,25" fill="#0f172a" />
          <path d="M 22 50 L 38 50 M 20 60 L 40 60 M 78 50 L 62 50 M 80 60 L 60 60" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
          <circle cx="40" cy="48" r="4" fill="#000" />
          <circle cx="60" cy="48" r="4" fill="#000" />
          <ellipse cx="50" cy="65" rx="14" ry="10" fill="#cbd5e1" />
        </svg>
      </div>
    );
  }
  if (name === 'ball') {
    return (
      <div className={className}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="35" fill="#3b82f6" />
          <circle cx="50" cy="50" r="35" stroke="#1d4ed8" strokeWidth="4" fill="none" />
          <path d="M 20 30 Q 50 60, 80 30" stroke="#fff" strokeWidth="4" fill="none" strokeDasharray="4 2" />
          <path d="M 20 70 Q 50 40, 80 70" stroke="#fff" strokeWidth="4" fill="none" strokeDasharray="4 2" />
        </svg>
      </div>
    );
  }

  return <span className={className.includes('w-') ? 'text-4xl select-none flex items-center justify-center' : ''}>{emojiOrPath}</span>;
}

// ─── TRACE CANVAS (CREAM BOARD STYLE) ───

function SimpleTraceCanvas({ letter, onComplete }: { letter: string; onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const guideCanvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<{ x: number; y: number }[]>([]);
  const templateGridRef = useRef<Uint8Array | null>(null);
  const templateGridWideRef = useRef<Uint8Array | null>(null);
  const clustersRef = useRef<{ x: number; y: number }[][]>([]);
  const letterDataRef = useRef<{
    pixels: { x: number; y: number }[];
    minX: number; maxX: number;
    minY: number; maxY: number;
  } | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [failMsg, setFailMsg] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ w: 300, h: 280 });

  const isTamil = letter ? letter.charCodeAt(0) >= 0x0B80 && letter.charCodeAt(0) <= 0x0BFF : false;
  const fontName = isTamil ? '"Noto Sans Tamil", "Latha", sans-serif' : '"Baloo 2", "Fredoka", sans-serif';

  const buildLetterData = useCallback((w: number, h: number) => {
    const off = document.createElement('canvas');
    off.width = w;
    off.height = h;
    const ctx = off.getContext('2d');
    if (!ctx) return;

    const fontSize = Math.min(220, Math.max(120, Math.round(w * 0.45)));
    ctx.font = `900 ${fontSize}px ${fontName}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ff0000';
    ctx.fillText(letter, w / 2, h / 2);

    const img = ctx.getImageData(0, 0, w, h);
    const pixels: { x: number; y: number }[] = [];
    let minX = w, maxX = 0, minY = h, maxY = 0;

    const step = 2;
    for (let py = 0; py < h; py += step) {
      for (let px = 0; px < w; px += step) {
        if (img.data[(py * w + px) * 4] > 100) {
          pixels.push({ x: px, y: py });
          if (px < minX) minX = px;
          if (px > maxX) maxX = px;
          if (py < minY) minY = py;
          if (py > maxY) maxY = py;
        }
      }
    }

    if (pixels.length > 0) {
      letterDataRef.current = { pixels, minX, maxX, minY, maxY };

      // Pre-compute template distance grid
      const grid = new Uint8Array(w * h);
      const wideGrid = new Uint8Array(w * h);
      const tol = Math.max(15, Math.round(w * 0.05)); // narrow corridor (e.g. 15px)
      const wideTol = Math.max(28, Math.round(w * 0.095)); // wide corridor (e.g. 28px)

      for (const lp of pixels) {
        // Narrow grid
        const startX = Math.max(0, lp.x - tol);
        const endX = Math.min(w - 1, lp.x + tol);
        const startY = Math.max(0, lp.y - tol);
        const endY = Math.min(h - 1, lp.y + tol);

        for (let y = startY; y <= endY; y++) {
          for (let x = startX; x <= endX; x++) {
            const dx = x - lp.x;
            const dy = y - lp.y;
            if (dx * dx + dy * dy < tol * tol) {
              grid[y * w + x] = 1;
            }
          }
        }

        // Wide grid
        const wStartX = Math.max(0, lp.x - wideTol);
        const wEndX = Math.min(w - 1, lp.x + wideTol);
        const wStartY = Math.max(0, lp.y - wideTol);
        const wEndY = Math.min(h - 1, lp.y + wideTol);

        for (let y = wStartY; y <= wEndY; y++) {
          for (let x = wStartX; x <= wEndX; x++) {
            const dx = x - lp.x;
            const dy = y - lp.y;
            if (dx * dx + dy * dy < wideTol * wideTol) {
              wideGrid[y * w + x] = 1;
            }
          }
        }
      }
      templateGridRef.current = grid;
      templateGridWideRef.current = wideGrid;

      // Connected components clustering for dots/strokes
      const clusters: { x: number; y: number }[][] = [];
      const visited = new Uint8Array(pixels.length);
      const distThreshold = Math.max(8, Math.round(w * 0.025));
      const distThresSq = distThreshold * distThreshold;

      for (let i = 0; i < pixels.length; i++) {
        if (visited[i]) continue;
        const cluster: { x: number; y: number }[] = [];
        const queue: number[] = [i];
        visited[i] = 1;
        let qHead = 0;
        while (qHead < queue.length) {
          const idx = queue[qHead++];
          const p1 = pixels[idx];
          cluster.push(p1);
          for (let j = 0; j < pixels.length; j++) {
            if (!visited[j]) {
              const p2 = pixels[j];
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              if (dx * dx + dy * dy < distThresSq) {
                visited[j] = 1;
                queue.push(j);
              }
            }
          }
        }
        if (cluster.length > 5) {
          clusters.push(cluster);
        }
      }
      clustersRef.current = clusters;
    }
  }, [letter]);

  const drawGuide = useCallback((w: number, h: number) => {
    const gc = guideCanvasRef.current;
    if (!gc) return;
    gc.width = w;
    gc.height = h;
    const ctx = gc.getContext('2d');
    if (!ctx) return;
    const fontSize = Math.min(220, Math.max(120, Math.round(w * 0.45)));
    ctx.clearRect(0, 0, w, h);
    ctx.font = `900 ${fontSize}px ${fontName}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(180, 83, 9, 0.15)';
    ctx.fillText(letter, w / 2, h / 2);
  }, [letter, fontName]);

  useEffect(() => {
    const setup = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const w = canvas.parentElement?.clientWidth || 300;
      const h = 280;
      setDimensions({ w, h });

      canvas.width = w;
      canvas.height = h;

      letterDataRef.current = null;
      templateGridRef.current = null;
      templateGridWideRef.current = null;
      clustersRef.current = [];

      try {
        if (isTamil) {
          await document.fonts.load(`900 ${Math.round(w * 0.45)}px "Noto Sans Tamil"`);
        } else {
          await document.fonts.load(`900 ${Math.round(w * 0.45)}px "Baloo 2"`);
        }
      } catch (_) {}

      drawGuide(w, h);
      buildLetterData(w, h);
    };

    setup();
    window.addEventListener('resize', setup);
    return () => window.removeEventListener('resize', setup);
  }, [letter, drawGuide, buildLetterData, isTamil]);

  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDrawing(true);
    setHasDrawn(true);
    setFailMsg(null);
    const coords = getCoordinates(e);
    pointsRef.current.push(coords);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
    }
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const coords = getCoordinates(e);
    pointsRef.current.push(coords);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = '#b45309'; // Cream board dark brown stroke
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
    }
  };

  const stopDrawing = () => setIsDrawing(false);

  const handleReset = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    pointsRef.current = [];
    setHasDrawn(false);
    setFailMsg(null);
  };

  const handleFinish = () => {
    const pts = pointsRef.current;
    const canvas = canvasRef.current;
    if (pts.length < 15 || !canvas) {
      setFailMsg(isTamil ? 'எழுதிப் பழகுங்கள்! ✏️' : 'Please draw! ✏️');
      return;
    }

    const data = letterDataRef.current;
    const grid = templateGridRef.current;
    const wideGrid = templateGridWideRef.current;
    if (!data || !grid || !wideGrid || data.pixels.length === 0) {
      onComplete(); // fallback if sampling fails
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const userImg = ctx.getImageData(0, 0, w, h);

    const letterW = data.maxX - data.minX;
    const letterH = data.maxY - data.minY;
    if (letterW <= 0 || letterH <= 0) {
      onComplete();
      return;
    }

    const GRID_SIZE = 7;
    const cellW = letterW / GRID_SIZE;
    const cellH = letterH / GRID_SIZE;

    const cellPixelCounts = new Map<string, number>();
    for (const p of data.pixels) {
      const col = Math.floor((p.x - data.minX) / cellW);
      const row = Math.floor((p.y - data.minY) / cellH);
      const c = Math.max(0, Math.min(GRID_SIZE - 1, col));
      const r = Math.max(0, Math.min(GRID_SIZE - 1, row));
      const cellKey = `${c},${r}`;
      cellPixelCounts.set(cellKey, (cellPixelCounts.get(cellKey) || 0) + 1);
    }

    const activeCells = new Set<string>();
    for (const [cellKey, count] of cellPixelCounts.entries()) {
      if (count >= 6) {
        activeCells.add(cellKey);
      }
    }

    let totalDrawn = 0;
    let correctDrawn = 0;
    let farDrawn = 0;
    const visitedActiveCells = new Set<string>();
    let userMinX = w, userMaxX = 0, userMinY = h, userMaxY = 0;

    // Scan user drawn pixels on canvas (step by 2 for performance)
    for (let y = 0; y < h; y += 2) {
      for (let x = 0; x < w; x += 2) {
        const idx = (y * w + x) * 4;
        const alpha = userImg.data[idx + 3];
        if (alpha > 40) { // pixel is drawn
          totalDrawn++;
          if (x < userMinX) userMinX = x;
          if (x > userMaxX) userMaxX = x;
          if (y < userMinY) userMinY = y;
          if (y > userMaxY) userMaxY = y;

          if (grid[y * w + x] === 1) {
            correctDrawn++;
            const col = Math.floor((x - data.minX) / cellW);
            const row = Math.floor((y - data.minY) / cellH);
            const c = Math.max(0, Math.min(GRID_SIZE - 1, col));
            const r = Math.max(0, Math.min(GRID_SIZE - 1, row));
            const cellKey = `${c},${r}`;
            if (activeCells.has(cellKey)) {
              visitedActiveCells.add(cellKey);
            }
          } else if (wideGrid[y * w + x] === 0) {
            farDrawn++;
          }
        }
      }
    }

    if (totalDrawn < 25) {
      setFailMsg('எழுதிப் பழகுங்கள்! ✏️');
      return;
    }

    const containment = (correctDrawn / totalDrawn) * 100;
    const coverage = activeCells.size > 0 ? (visitedActiveCells.size / activeCells.size) * 100 : 0;

    const userW = userMaxX - userMinX;
    const userH = userMaxY - userMinY;
    const templateW = data.maxX - data.minX;
    const templateH = data.maxY - data.minY;

    const widthRatio = templateW > 0 ? userW / templateW : 0;
    const heightRatio = templateH > 0 ? userH / templateH : 0;

    // Verify all template clusters (dots/strokes) are covered at least 20%
    let allClustersCovered = true;
    for (const cluster of (clustersRef.current || [])) {
      let coveredCount = 0;
      for (const lp of cluster) {
        const idx = (lp.y * w + lp.x) * 4;
        if (userImg.data[idx + 3] > 40) {
          coveredCount++;
        }
      }
      const clusterCoverage = (coveredCount / cluster.length) * 100;
      if (clusterCoverage < 25) {
        allClustersCovered = false;
        break;
      }
    }

    const minDim = Math.max(45, w * 0.12);
    const widthRatioPassed = templateW < minDim || widthRatio >= 0.75;
    const heightRatioPassed = templateH < minDim || heightRatio >= 0.75;
    const maxFarDrawn = Math.max(15, Math.round(w * 0.05));

    // Strict validation thresholds: containment >= 75%, coverage >= 50%, bounding box size (if large enough), no far-away drawings, and all clusters (dots) covered
    const passed = containment >= 75 && coverage >= 50 && widthRatioPassed && heightRatioPassed && farDrawn <= maxFarDrawn && allClustersCovered;

    if (passed) {
      onComplete();
    } else if (containment < 75 || farDrawn > maxFarDrawn) {
      setFailMsg(isTamil ? 'எழுத்தின் மேல் மட்டும் எழுதவும்! 🎯' : 'Trace on the letter only! 🎯');
    } else {
      setFailMsg(isTamil ? 'முழு எழுத்தையும் சரியாக எழுதவும்! ✍️' : 'Trace the whole letter correctly! ✍️');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Cream Slate Board */}
      <div className="relative w-full h-[280px] rounded-[2rem] border-4 border-[#b45309] shadow-inner bg-[#fffdf9] overflow-hidden touch-none">
        {/* Guide Letter Canvas */}
        <canvas
          ref={guideCanvasRef}
          className="absolute inset-0 pointer-events-none touch-none w-full h-full"
        />
        {/* Drawing Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 cursor-crosshair touch-none w-full h-full z-10"
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
        />

        {/* Fail overlay */}
        <AnimatePresence>
          {failMsg && (
            <motion.div
              key="fail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            >
              <div className="bg-[#fffdf9]/95 text-rose-600 border-2 border-rose-200 rounded-xl px-5 py-3 text-sm font-black shadow-xl text-center max-w-[280px]">
                <p className="mb-0.5">❌ {failMsg}</p>
                <p className="text-[11px] text-amber-800">
                  {isTamil ? 'மீண்டும் 🔄 button press பண்ணி try பண்ணுங்கள்' : 'Press Try Again 🔄 button to try again'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex gap-4 w-full max-w-xs justify-center font-sans">
        <button
          onClick={handleReset}
          className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow active:scale-95 transition-all text-sm"
        >
          {isTamil ? 'மீண்டும் 🔄' : 'Try Again 🔄'}
        </button>
        <button
          onClick={handleFinish}
          disabled={!hasDrawn}
          className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow active:scale-95 transition-all text-sm disabled:opacity-40"
        >
          {isTamil ? 'முடிந்தது! ✅' : 'Done! ✅'}
        </button>
      </div>
    </div>
  );
}

function CountBubble({ emoji }: { emoji: string }) {
  const [tapped, setTapped] = useState(false);
  
  useEffect(() => {
    setTapped(false);
  }, [emoji]);

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setTapped(t => !t)}
      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3.5xl border-2 shadow-md relative transition-all
        ${tapped 
          ? 'bg-emerald-100 border-emerald-450 scale-105' 
          : 'bg-white border-amber-200'}`}
    >
      <span className="drop-shadow-sm">{emoji}</span>
      {tapped && (
        <div className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[8px] font-black rounded-full w-5 h-5 flex items-center justify-center border border-white">
          ✓
        </div>
      )}
    </motion.button>
  );
}

// ─── MAIN PORTAL ARENA ───

export default function QuizArena() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const queryClient = useQueryClient();

  const { subjects, studentProfile } = useData();
  const [mounted, setMounted] = useState(false);
  
  // Views: 'dashboard' | 'levels' | 'quiz_player' | 'score_card'
  const [view, setView] = useState<'dashboard' | 'levels' | 'quiz_player' | 'score_card'>('dashboard');
  
  // Overlays (For other subjects)
  const [activeQuiz, setActiveQuiz] = useState<any | null>(null);
  const [activeGame, setActiveGame] = useState<string | null>(null);

  // Subject Quiz Levels state
  const [activeSubject, setActiveSubject] = useState<'tamil' | 'english' | 'math' | 'evs'>('tamil');
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [levelScores, setLevelScores] = useState<Record<number, number>>({});
  
  // Quiz Player state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [selectedOptionText, setSelectedOptionText] = useState<string | null>(null);

  // Spelling & Sorting interactive state
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  // Reset spelling/sorting on question index change
  useEffect(() => {
    setSelectedLetter(null);
  }, [currentQuestionIndex, activeLevel]);

  // Dynamically compute unlocked quiz levels based on completed chapters in Database
  const unlockedLevels = useMemo(() => {
    if (activeSubject === 'tamil') {
      const tamilSubject = subjects.find(s => 
        s.name.toLowerCase().includes('tamil') || 
        s.name.includes('தமிழ்')
      );
      if (!tamilSubject) {
        return [1]; // fallback default
      }

      const isLessonCompleted = (lessonId: string): boolean => {
        const lesson = tamilSubject.chapters
          .flatMap(c => c.lessons)
          .find(l => l.id === lessonId);
        return lesson?.progress?.status === 'completed';
      };

      const unlocked: number[] = [];
      const mappings: Record<number, string> = {
        1: 'f750d0ef-3fc2-44b5-89a5-0abfcc618479',
        2: 'e9efc803-66fe-4574-a4e0-ef8ce18f104a',
        3: 'c6035e74-6b37-409e-a0c0-c58bb4f64fee',
        4: '27869c1b-70c6-4019-965f-619c799eb0e0',
        5: '260d91dd-1d8b-4964-8311-3ff589c38e5a',
        6: '45b61435-fe57-4e0c-a893-68bc25d96d53',
      };
      Object.entries(mappings).forEach(([lvlId, lesId]) => {
        if (isLessonCompleted(lesId)) {
          unlocked.push(Number(lvlId));
        }
      });
      if (unlocked.length === 0) {
        unlocked.push(1);
      }
      return unlocked;
    } else if (activeSubject === 'english') {
      const englishSubject = subjects.find(s => 
        s.name.toLowerCase().includes('english') || 
        s.name.includes('ஆங்கிலம்')
      );
      if (!englishSubject) {
        return [1];
      }

      const isLessonCompleted = (lessonId: string): boolean => {
        const lesson = englishSubject.chapters
          .flatMap(c => c.lessons)
          .find(l => l.id === lessonId);
        return lesson?.progress?.status === 'completed';
      };

      const unlocked: number[] = [];
      const mappings: Record<number, string> = {
        1: '389a705c-d602-4f1e-bae6-7fdb736f3e53',
        2: 'b90f5a71-dcef-4a2b-925a-3e6d33be6364',
        3: 'fba5b58b-a115-4c45-ad62-34c3589575eb',
        4: 'c02f1643-7c13-450a-9004-d57ac6857ac3',
        5: '60569fa2-ef55-4902-80a0-e98c9d7c95ed',
        6: 'c1381ec5-b99a-49e0-84e2-21aad7a10ab7',
      };
      Object.entries(mappings).forEach(([lvlId, lesId]) => {
        if (isLessonCompleted(lesId)) {
          unlocked.push(Number(lvlId));
        }
      });
      if (unlocked.length === 0) {
        unlocked.push(1);
      }
      return unlocked;

    } else if (activeSubject === 'evs') {
      const evsSubject = subjects.find(s => 
        s.name.toLowerCase().includes('evs') || 
        s.name.toLowerCase().includes('environmental')
      );
      if (!evsSubject) {
        return [1];
      }

      const isLessonCompleted = (lessonId: string): boolean => {
        const lesson = evsSubject.chapters
          .flatMap(c => c.lessons)
          .find(l => l.id === lessonId);
        return lesson?.progress?.status === 'completed';
      };

      const unlocked: number[] = [];
      const mappings: Record<number, string> = {
        1: '0d6b2ccc-01e0-4496-b30f-e6f7f5be3d21',
        2: 'a22e6df2-ff59-418b-89b2-2c39d7d72901',
        3: '5cc91f99-b121-4baa-813d-61260abbdffa',
        4: '2b200e99-464a-45df-839b-ac3282fb07a1',
        5: '66df4a08-281d-4aa3-917a-722de6658a79',
        6: '092a2e60-8ab5-4833-b948-056641af9df7',
      };
      Object.entries(mappings).forEach(([lvlId, lesId]) => {
        if (isLessonCompleted(lesId)) {
          unlocked.push(Number(lvlId));
        }
      });
      if (unlocked.length === 0) {
        unlocked.push(1);
      }
      return unlocked;
    } else {
      const mathSubject = subjects.find(s => 

        s.name.toLowerCase().includes('math') || 
        s.name.toLowerCase().includes('mathe') ||
        s.name.includes('கணிதம்')
      );
      if (!mathSubject) {
        return [1];
      }

      const isLessonCompleted = (lessonId: string): boolean => {
        const lesson = mathSubject.chapters
          .flatMap(c => c.lessons)
          .find(l => l.id === lessonId);
        return lesson?.progress?.status === 'completed';
      };

      const unlocked: number[] = [];
      const mappings: Record<number, string> = {
        1: '1bebe881-2bb2-4b9e-817f-67739b354c78',
        2: '44ddcd38-4a6b-4eca-b7ee-12d4ce9fe6f4',
        3: 'e2fa68cf-10d2-4772-9814-aeb72f529bdf',
        4: '5f7d8cee-3073-4174-ab82-401fedb3fa44',
        5: '2ebb61ce-1133-4a74-b8d5-5265319ffd07',
        6: '252dd393-ece6-4561-863d-194e9b292f9b',
      };
      Object.entries(mappings).forEach(([lvlId, lesId]) => {
        if (isLessonCompleted(lesId)) {
          unlocked.push(Number(lvlId));
        }
      });
      if (unlocked.length === 0) {
        unlocked.push(1);
      }
      return unlocked;
    }
  }, [subjects, activeSubject]);

  // Set mounted state and reset levelScores when student profile changes (prevent cross-child score bleed)
  useEffect(() => {
    setMounted(true);
    setLevelScores({});
  }, [studentProfile]);

  // Load level scores from database
  useEffect(() => {
    if (!subjects || subjects.length === 0) return;
    const scoresMap: Record<number, number> = {};
    const allLessons = subjects.flatMap(s => s.chapters.flatMap(c => c.lessons));
    
    const tamilMappings: Record<number, string> = {
      1: 'f750d0ef-3fc2-44b5-89a5-0abfcc618479',
      2: 'e9efc803-66fe-4574-a4e0-ef8ce18f104a',
      3: 'c6035e74-6b37-409e-a0c0-c58bb4f64fee',
      4: '27869c1b-70c6-4019-965f-619c799eb0e0',
      5: '260d91dd-1d8b-4964-8311-3ff589c38e5a',
      6: '45b61435-fe57-4e0c-a893-68bc25d96d53',
    };

    const englishMappings: Record<number, string> = {
      1: '389a705c-d602-4f1e-bae6-7fdb736f3e53',
      2: 'b90f5a71-dcef-4a2b-925a-3e6d33be6364',
      3: 'fba5b58b-a115-4c45-ad62-34c3589575eb',
      4: 'c02f1643-7c13-450a-9004-d57ac6857ac3',
      5: '60569fa2-ef55-4902-80a0-e98c9d7c95ed',
      6: 'c1381ec5-b99a-49e0-84e2-21aad7a10ab7',
    };

    const mathMappings: Record<number, string> = {
      1: '1bebe881-2bb2-4b9e-817f-67739b354c78',
      2: '44ddcd38-4a6b-4eca-b7ee-12d4ce9fe6f4',
      3: 'e2fa68cf-10d2-4772-9814-aeb72f529bdf',
      4: '5f7d8cee-3073-4174-ab82-401fedb3fa44',
      5: '2ebb61ce-1133-4a74-b8d5-5265319ffd07',
      6: '252dd393-ece6-4561-863d-194e9b292f9b',
    };

    const evsMappings: Record<number, string> = {
      1: '0d6b2ccc-01e0-4496-b30f-e6f7f5be3d21',
      2: 'a22e6df2-ff59-418b-89b2-2c39d7d72901',
      3: '5cc91f99-b121-4baa-813d-61260abbdffa',
      4: '2b200e99-464a-45df-839b-ac3282fb07a1',
      5: '66df4a08-281d-4aa3-917a-722de6658a79',
      6: '092a2e60-8ab5-4833-b948-056641af9df7',
    };

    const mappings = activeSubject === 'tamil' ? tamilMappings 
                     : activeSubject === 'english' ? englishMappings 
                     : activeSubject === 'evs' ? evsMappings
                     : mathMappings;

    Object.entries(mappings).forEach(([levelId, lessonId]) => {
      const match = allLessons.find(l => l.id === lessonId);
      if (match && match.progress) {
        const prog = match.progress as any;
        if (prog.quiz_score !== undefined && prog.quiz_score !== null) {
          scoresMap[Number(levelId)] = Number(prog.quiz_score);
        } else if (prog.status === 'completed') {
          scoresMap[Number(levelId)] = 5;
        }
      }
    });
    setLevelScores(scoresMap);
  }, [subjects, studentProfile, activeSubject]);

  useEffect(() => {
    if (activeQuiz || activeGame || view !== 'dashboard') {
      document.body.classList.add('no-bottom-nav');
    } else {
      document.body.classList.remove('no-bottom-nav');
    }

    if (activeQuiz || activeGame) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.classList.remove('no-bottom-nav');
      document.body.style.overflow = 'auto';
    };
  }, [activeQuiz, activeGame, view]);

  // Auto scroll to top on view transitions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [view, activeLevel, currentQuestionIndex]);

  const allLessonsFlat = subjects.flatMap(s => s.chapters.flatMap(c => c.lessons));

  // Process categories from API, ensuring custom attributes for Tamil
  const categoriesFromAPI = subjects.map((s, idx) => {
    const isTamilQuiz = s.name.toLowerCase().includes('tamil') || s.name === 'Tamil' || s.name.includes('தமிழ்');
    const isEnglishQuiz = s.name.toLowerCase().includes('english') || s.name === 'English' || s.name.includes('ஆங்கிலம்');
    const isMathQuiz = s.name.toLowerCase().includes('math') || s.name.toLowerCase().includes('mathe') || s.name.includes('கணிதம்');
    const isEvsQuiz = s.name.toLowerCase().includes('environmental') || s.name.toLowerCase().includes('evs');
    return {
      id: s.id,
      title: s.name,
      icon: null,
      color: isTamilQuiz ? 'bg-emerald-100 text-emerald-600' : isEnglishQuiz ? 'bg-amber-105 text-amber-600' : isMathQuiz ? 'bg-indigo-100 text-indigo-650' : isEvsQuiz ? 'bg-lime-100 text-lime-650' : ['bg-rose-100 text-rose-500', 'bg-blue-100 text-blue-500', 'bg-emerald-100 text-emerald-500', 'bg-amber-100 text-amber-500'][idx % 4],
      border: isTamilQuiz ? 'border-emerald-300' : isEnglishQuiz ? 'border-amber-300' : isMathQuiz ? 'border-indigo-300' : isEvsQuiz ? 'border-lime-300' : ['border-rose-200', 'border-blue-200', 'border-emerald-200', 'border-amber-200'][idx % 4],
      progress: s.chapters.length > 0 ? Math.round(s.chapters.filter(c => c.completion_percentage >= 100).length / s.chapters.length * 100) : 0,
      lessons: s.chapters.flatMap(c => c.lessons).length,
      isTamilQuiz: isTamilQuiz,
      isEnglishQuiz: isEnglishQuiz,
      isMathQuiz: isMathQuiz,
      isEvsQuiz: isEvsQuiz
    };
  });

  // Fallback: If Tamil is not in the subjects list, append it manually so it is always present
  const hasTamil = categoriesFromAPI.some(c => c.isTamilQuiz);
  const displayedCategories = [...categoriesFromAPI];
  if (!hasTamil && mounted) {
    displayedCategories.push({
      id: 'tamil_custom',
      title: 'Tamil',
      icon: null,
      color: 'bg-emerald-100 text-emerald-600',
      border: 'border-emerald-300',
      progress: 0,
      lessons: 4,
      isTamilQuiz: true,
      isEnglishQuiz: false,
      isMathQuiz: false
    });
  }

  const startDailyThree = () => {
    const randomLesson = allLessonsFlat[Math.floor(Math.random() * allLessonsFlat.length)];
    if (randomLesson) {
      setActiveQuiz({
        id: randomLesson.id,
        title: randomLesson.title,
        emoji: '📚',
        color: 'bg-sky-100',
        text: 'text-sky-600',
        border: 'border-sky-300',
        status: randomLesson.progress?.status || 'not-started',
        quiz: { question: `Let's learn ${randomLesson.title}!`, options: [
          { n: 'A', e: '🌟' }, { n: 'B', e: '🚀' }, { n: 'C', e: '💫' }
        ], correct: 'A' }
      });
    }
  };

  const handleLevelSelect = (level: Level) => {
    if (!unlockedLevels.includes(level.id)) {
      return;
    }
    setActiveLevel(level);
    setCurrentQuestionIndex(0);
    setScores([]);
    setSelectedOptionText(null);
    setView('quiz_player');
  };

  const handleAnswer = (option: Option) => {
    if (selectedOptionText !== null) return; // Prevent double taps

    const isCorrect = option.correct;
    setSelectedOptionText(option.text);
    setScores(prev => [...prev, isCorrect ? 1 : 0]);
    
    // Smooth next transition without red cross or stress animations
    setTimeout(() => {
      setSelectedOptionText(null);
      if (activeLevel && currentQuestionIndex < activeLevel.questions.length - 1) {
        setCurrentQuestionIndex(idx => idx + 1);
      } else {
        setView('score_card');
        
        // Final Score calculation
        const finalScore = scores.reduce((a, b) => a + b, 0) + (isCorrect ? 1 : 0);
        
        if (activeLevel) {
          // Save score if it's the highest in component state
          const currentBest = levelScores[activeLevel.id] || 0;
          if (finalScore > currentBest) {
            setLevelScores(prev => ({
              ...prev,
              [activeLevel.id]: finalScore
            }));

            // Sync with backend database
            const tamilMappings: Record<number, string> = {
              1: 'f750d0ef-3fc2-44b5-89a5-0abfcc618479',
              2: 'e9efc803-66fe-4574-a4e0-ef8ce18f104a',
              3: 'c6035e74-6b37-409e-a0c0-c58bb4f64fee',
              4: '27869c1b-70c6-4019-965f-619c799eb0e0',
              5: '260d91dd-1d8b-4964-8311-3ff589c38e5a',
              6: '45b61435-fe57-4e0c-a893-68bc25d96d53',
            };
            const englishMappings: Record<number, string> = {
              1: '389a705c-d602-4f1e-bae6-7fdb736f3e53',
              2: 'b90f5a71-dcef-4a2b-925a-3e6d33be6364',
              3: 'fba5b58b-a115-4c45-ad62-34c3589575eb',
              4: 'c02f1643-7c13-450a-9004-d57ac6857ac3',
              5: '60569fa2-ef55-4902-80a0-e98c9d7c95ed',
              6: 'c1381ec5-b99a-49e0-84e2-21aad7a10ab7',
            };
            const mathMappings: Record<number, string> = {
              1: '1bebe881-2bb2-4b9e-817f-67739b354c78',
              2: '44ddcd38-4a6b-4eca-b7ee-12d4ce9fe6f4',
              3: 'e2fa68cf-10d2-4772-9814-aeb72f529bdf',
              4: '5f7d8cee-3073-4174-ab82-401fedb3fa44',
              5: '2ebb61ce-1133-4a74-b8d5-5265319ffd07',
              6: '252dd393-ece6-4561-863d-194e9b292f9b',
            };
            const evsMappings: Record<number, string> = {
              1: '0d6b2ccc-01e0-4496-b30f-e6f7f5be3d21',
              2: 'a22e6df2-ff59-418b-89b2-2c39d7d72901',
              3: '5cc91f99-b121-4baa-813d-61260abbdffa',
              4: '2b200e99-464a-45df-839b-ac3282fb07a1',
              5: '66df4a08-281d-4aa3-917a-722de6658a79',
              6: '092a2e60-8ab5-4833-b948-056641af9df7',
            };
            const mappings = activeSubject === 'tamil' ? tamilMappings 
                             : activeSubject === 'english' ? englishMappings 
                             : activeSubject === 'evs' ? evsMappings
                             : mathMappings;
            const lessonId = mappings[activeLevel.id];
            if (lessonId) {
              studentApi.updateProgress(lessonId, {
                status: 'completed',
                completion_percentage: 100,
                quiz_completed: true,
                quiz_score: finalScore,
                quiz_max_score: 5
              }).then(() => {
                queryClient.invalidateQueries({ queryKey: studentKeys.lessons });
                queryClient.invalidateQueries({ queryKey: studentKeys.dashboard });
                queryClient.invalidateQueries({ queryKey: studentKeys.me });
              }).catch((err) => {
                console.error("Failed to sync score to DB:", err);
              });
            }
          }
        }
      }
    }, 500);
  };

  return (
    <div className="relative overflow-hidden min-h-screen pb-12 kids-font selection:bg-teal-350">
      {/* Injecting Rounded Kid-friendly Fonts */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&family=Fredoka:wght@500;700&display=swap');
        .kids-font {
          font-family: 'Baloo 2', 'Fredoka', sans-serif !important;
        }
      `}} />

      {/* Dynamic Background atmosphere */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-300 via-sky-400 to-emerald-300" />
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/30 blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        
        <AnimatePresence mode="wait">

          {/* 1. MAIN DASHBOARD VIEW */}
          {view === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full"
            >
              {/* Hero Quest Banner */}
              <div className="py-10 mb-8 w-full border-b-8 border-white/10">
                 <div className="relative w-full flex items-center">
                    <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-white/30 to-transparent skew-x-[-20deg] transform translate-x-32" />
                    
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-6">
                       <div className="text-center md:text-left flex-1 space-y-6">
                          <div className="inline-flex items-center gap-2 px-6 py-2 bg-amber-400 text-indigo-950 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-xl">
                             <Trophy size={16} fill="currentColor" /> Daily Quest
                          </div>
                          <h1 className="text-4xl sm:text-7xl font-black text-indigo-950 tracking-tighter leading-tight font-sans">
                             The <span className="text-indigo-800 italic font-medium font-sans">Daily 3</span> <br/>
                             Quest Arena
                          </h1>
                          <p className="text-indigo-900/60 font-bold text-lg">Win 3 questions today to earn a Magical Star! 🌟🌸</p>
                          
                          <div className="flex justify-center md:justify-start w-full font-sans">
                            <button 
                              onClick={startDailyThree}
                              className="bg-indigo-600 text-white px-10 py-5 rounded-[2rem] font-black text-lg shadow-2xl hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-3 group/btn"
                            >
                               ENTER ARENA <Play className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                          </div>
                       </div>

                       <div className="relative w-64 h-64 sm:w-80 sm:h-80 select-none">
                          <div className="absolute inset-0 bg-indigo-600/10 blur-[60px] rounded-full" />
                          <img 
                            src="/assets/avatars/owl-removebg-preview.png" 
                            className="w-full h-full object-contain" 
                            alt="Arena Master" 
                          />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 font-sans">
                 {[
                   { label: 'Weekly Streak', val: '5 Days', icon: Calendar, color: 'text-rose-600', glow: 'bg-rose-400' },
                   { label: 'Quiz Won', val: '43', icon: Trophy, color: 'text-amber-600', glow: 'bg-amber-400' },
                   { label: 'Arena Level', val: 'Level 4', icon: Target, color: 'text-blue-600', glow: 'bg-blue-400' },
                   { label: 'Global Rank', val: '#12', icon: Award, color: 'text-purple-600', glow: 'bg-purple-400' },
                 ].map((stat, i) => (
                    <div key={i} className="bg-white/95 rounded-[2.5rem] p-6 sm:p-8 text-center border-2 border-white/60 shadow-2xl relative overflow-hidden group active:scale-95 transition-all">
                      <div className={`absolute -top-10 -right-10 w-24 h-24 ${stat.glow} opacity-10 blur-3xl rounded-full`} />
                      <stat.icon className={`${stat.color} mb-3 mx-auto`} size={28} />
                      <span className="text-xl sm:text-2xl font-black text-indigo-950 block mb-0.5 leading-tight">{stat.val}</span>
                      <span className="text-[10px] sm:text-[11px] font-black text-indigo-950/40 uppercase tracking-widest">{stat.label}</span>
                   </div>
                 ))}
              </div>

              {/* Practice Clouds (Subjects List) */}
              <div className="mb-16">
                 <div className="flex items-center gap-4 mb-10 px-2">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                       <Cloud className="text-white" size={20} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-indigo-950 leading-none">Practice Clouds</h2>
                      <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest mt-1">Jump into a subject</p>
                    </div>
                 </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                     {displayedCategories.map((zone, idx) => {
                       const isTamilCloud = zone.isTamilQuiz;
                       return (
                         <button
                           key={zone.id}
                           onClick={() => {
                              if (isTamilCloud) {
                                setActiveSubject('tamil');
                                setView('levels');
                              } else if (zone.isEnglishQuiz) {
                                setActiveSubject('english');
                                setView('levels');
                              } else if (zone.isMathQuiz) {
                                setActiveSubject('math');
                                setView('levels');
                              } else if (zone.isEvsQuiz) {
                                setActiveSubject('evs');
                                setView('levels');
                              } else {
                               const zoneLessons = allLessonsFlat.filter(l => zone.id === subjects[idx]?.id);
                               if (zoneLessons.length > 0) {
                                 setActiveQuiz({
                                   id: zoneLessons[0].id,
                                   title: zoneLessons[0].title,
                                   emoji: '📚',
                                   color: 'bg-sky-100',
                                   text: 'text-sky-600',
                                   border: 'border-sky-300',
                                   status: 'not-started',
                                   quiz: { question: `Let's learn ${zoneLessons[0].title}!`, options: [
                                     { n: 'A', e: '🌟' }, { n: 'B', e: '🚀' }, { n: 'C', e: '💫' }
                                   ], correct: 'A' }
                                 });
                               }
                             }
                           }}
                           className="group relative"
                         >
                           <div className={`absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-indigo-400`} />
                           
                           <div className={`relative rounded-[3.5rem] p-2 border-2 transition-all duration-350 group-hover:-translate-y-2 bg-white/90 border-white/40 shadow-xl`}>
                             <div className="min-h-[280px] flex flex-col items-center justify-center p-8 relative overflow-hidden text-center">
                                <div className="w-24 h-24 flex items-center justify-center mb-6 drop-shadow-[0_20px_20px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-transform duration-700">
                                   {isTamilCloud ? (
                                     <span className="text-6xl select-none">🐯</span>
                                   ) : zone.isMathQuiz ? (
                                     <span className="text-6xl select-none">🔢</span>
                                   ) : zone.isEnglishQuiz ? (
                                     <span className="text-6xl select-none">🍎</span>
                                   ) : zone.isEvsQuiz ? (
                                     <span className="text-6xl select-none">🌍</span>
                                   ) : (
                                     <img 
                                        src={`/assets/portals/${['alphabet', 'numbers', 'colors', 'animals'][idx % 4]}-removebg-preview.png`}
                                        className="w-full h-full object-contain"
                                        alt={zone.title}
                                     />
                                   )}
                                </div>
                                <h3 className="text-xl font-black text-indigo-950 uppercase tracking-tight leading-none mb-1 font-sans">{zone.title}</h3>
                                {(isTamilCloud || zone.isEnglishQuiz || zone.isMathQuiz || zone.isEvsQuiz) && (
                                  <p className="text-[11px] font-black text-emerald-800/80 uppercase tracking-widest mb-6 font-sans">
                                    Fun Activities
                                  </p>
                                )}
                                {!(isTamilCloud || zone.isEnglishQuiz || zone.isMathQuiz || zone.isEvsQuiz) && <div className="h-6" />}
                                <div className="px-8 py-3 bg-indigo-600 rounded-2xl text-[10px] font-black text-white shadow-xl hover:bg-indigo-700 transition-colors uppercase tracking-widest font-sans">
                                   JUMP IN!
                                </div>
                             </div>
                           </div>
                         </button>
                        );
                      })}
                  </div>
              </div>

              {/* Fun Activities Section */}
              <div className="mt-12 mb-20">
                 <div className="flex items-center gap-4 mb-10 px-2">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                       <Gamepad2 className="text-white" size={20} />
                    </div>
                    <div>
                       <h2 className="text-2xl font-black text-indigo-950 uppercase leading-none">Fun Activities</h2>
                       <p className="text-[10px] font-bold text-indigo-950/40 uppercase tracking-widest mt-1">Play and master together</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {[
                      { id: 'sound', title: 'Sound Match', emoji: '🔊', color: 'bg-blue-500' },
                      { id: 'truefalse', title: 'True or False', emoji: '🤪', color: 'bg-emerald-500' },
                      { id: 'sequence', title: 'Sequence', emoji: '🧩', color: 'bg-purple-500' },
                      { id: 'memory', title: 'Memory', emoji: '🧠', color: 'bg-rose-500' },
                    ].map((game) => (
                      <motion.button key={game.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveGame(game.id)}
                        className="bg-white/95 rounded-[3rem] p-8 text-left border-2 border-white/60 shadow-2xl flex items-center gap-8 transition-all group hover:bg-white w-full"
                      >
                         <div className={`w-20 h-20 rounded-[1.8rem] ${game.color} flex items-center justify-center text-4xl shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                           {game.emoji}
                         </div>
                         <div>
                           <h3 className="text-2xl font-black text-indigo-950 tracking-tight leading-none mb-2 font-sans">{game.title}</h3>
                           <span className="text-xs font-black text-indigo-900/40 uppercase tracking-[0.2em] font-sans">Start Training</span>
                         </div>
                         <ChevronRight className="ml-auto text-indigo-900/20 group-hover:text-indigo-900 group-hover:translate-x-2 transition-all" size={32} />
                      </motion.button>
                    ))}
                 </div>
              </div>

            </motion.div>
          )}

          {/* 2. TAMIL LEVELS SELECTION (NEAT KID-FRIENDLY ROADMAP) */}
          {view === 'levels' && (
            <motion.div
              key="levels"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="w-full flex flex-col gap-6 max-w-2xl mx-auto pt-6 px-4 pb-20 min-h-screen relative"
            >
              {/* Back navigation & Game Status Bar */}
              <div className="sticky top-4 z-50 flex items-center justify-between gap-4 bg-white px-5 py-3 rounded-full border-2 border-indigo-150 shadow-[0_10px_30px_rgba(79,70,229,0.12)] w-full">
                {/* Back button */}
                <button
                  onClick={() => setView('dashboard')}
                  className="w-12 h-12 shrink-0 bg-gradient-to-r from-amber-400 to-orange-500 border-2 border-white text-indigo-950 rounded-full flex items-center justify-center shadow-lg hover:brightness-105 active:scale-90 transition-all"
                  title="முகப்பு"
                >
                  <ArrowLeft size={22} strokeWidth={3.5} className="text-indigo-950" />
                </button>

                {/* Center Title */}
                <div className="flex-1 text-center">
                  <h2 className="text-base sm:text-lg font-black text-indigo-950 leading-tight">                    {activeSubject === 'tamil' ? 'தமிழ் வினாடி-வினா' 
                     : activeSubject === 'english' ? 'English Quiz Arena' 
                     : activeSubject === 'evs' ? 'Environmental Studies'
                     : 'கணித சவால் (Math Quiz)'}                  </h2>
                  <span className="text-[9px] font-bold text-indigo-900/40 uppercase tracking-widest block leading-none mt-0.5 font-sans">                    {activeSubject === 'tamil' ? 'Tamil Quiz Arena' 
                     : activeSubject === 'english' ? 'Fun Spelling & Sorting' 
                     : activeSubject === 'evs' ? 'Nature, Health & Living'
                     : 'Playful Math Adventures'}                  </span>
                </div>

                {/* Right Stars counter */}
                <div className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-50 border border-amber-200 rounded-full shadow-inner select-none shrink-0">
                  <span className="text-base">⭐</span>
                  <span className="text-xs font-black text-amber-800 font-sans leading-none pt-0.5">
                    {Object.keys(levelScores).reduce((acc, lvlId) => acc + Math.min(levelScores[Number(lvlId)] || 0, 5), 0)} / 30
                  </span>
                </div>
              </div>

              {/* Grid / Staggered road of cards */}
              <div className="flex flex-col gap-5 relative z-10">
                {(activeSubject === 'tamil' ? TAMIL_LEVELS : activeSubject === 'english' ? ENGLISH_LEVELS : activeSubject === 'evs' ? EVS_LEVELS : MATH_LEVELS).map((level, index) => {
                  const unlocked = unlockedLevels.includes(level.id);
                  const bestScore = Math.min(levelScores[level.id] || 0, 5);
                  const isCompleted = levelScores[level.id] !== undefined;

                  return (
                    <motion.div
                      key={level.id}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-full"
                    >
                      <button
                        onClick={() => unlocked && handleLevelSelect(level)}
                        disabled={!unlocked}
                        className={`w-full text-left relative overflow-hidden rounded-[2.5rem] border-4 p-5 sm:p-6 shadow-xl transition-all duration-350 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6
                          ${unlocked
                            ? 'bg-white border-indigo-100 hover:border-indigo-300 hover:shadow-2xl active:scale-[0.99] cursor-pointer'
                            : 'bg-white/60 border-slate-200 opacity-80 cursor-not-allowed'
                          }`}
                      >
                        {/* Left Side: Level Badge and Mascot */}
                        <div className="flex items-center gap-4">
                          {/* Colorful Mascot Container */}
                          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center border-4 border-white shadow-lg text-4xl select-none shrink-0 bg-gradient-to-br ${unlocked ? level.color : 'from-slate-200 to-slate-350'}`}>
                            {unlocked ? level.mascot : '🔒'}
                          </div>

                          {/* Titles */}
                          <div className="space-y-1">
                            <span className="inline-block px-3 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-black text-indigo-800 uppercase tracking-wider font-sans">
                              {activeSubject === 'tamil' ? `நிலை ${level.id}` : `Level ${level.id}`}
                            </span>
                            <h3 className={`text-lg sm:text-xl font-black leading-tight tracking-tight ${unlocked ? 'text-indigo-950' : 'text-slate-500'}`}>
                              {level.title.split('(')[0].trim()}
                            </h3>
                            <p className="text-xs font-bold text-slate-400 font-sans">
                              {level.titleEn}
                            </p>
                          </div>
                        </div>

                        {/* Right Side: Score Status or Locked Info */}
                        <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-dashed border-slate-100 w-full sm:w-auto">
                          {unlocked ? (
                            <div className="flex flex-col items-end gap-1.5 sm:w-auto">
                              {/* 5-Star Visual Score */}
                              {isCompleted ? (
                                <div className="flex flex-col items-end gap-1">
                                  <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((starIdx) => (
                                      <Star
                                        key={starIdx}
                                        size={14}
                                        className={starIdx <= bestScore ? 'text-amber-500 fill-amber-500' : 'text-slate-200'}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full font-sans">
                                    Best: {bestScore}/5
                                  </span>
                                </div>
                              ) : (
                                <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full font-sans">
                                  விளையாடு 🎮
                                </span>
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-slate-400 font-sans text-xs font-black bg-slate-100 px-3 py-1 rounded-full">
                              பூட்டப்பட்டது
                            </div>
                          )}

                          {/* Play / Lock Arrow Button */}
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow transition-colors shrink-0
                            ${unlocked 
                              ? 'bg-indigo-600 text-white group-hover:bg-indigo-700' 
                              : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            {unlocked ? <Play size={16} fill="currentColor" /> : <Lock size={16} />}
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* 3. ACTIVE QUIZ PLAYER VIEW */}
          {view === 'quiz_player' && activeLevel && (
            <motion.div
              key="player"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col gap-6 max-w-xl mx-auto pt-4"
            >
              {/* Quiz Header Info */}
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => setView('levels')}
                  className="w-10 h-10 shrink-0 bg-white/90 border-2 border-indigo-100 text-slate-700 rounded-xl flex items-center justify-center shadow-md hover:bg-white active:scale-95 transition-all"
                  title="வெளியேறு"
                >
                  <X size={18} strokeWidth={3.5} className="text-slate-800" />
                </button>
                <span className="text-xs font-black text-indigo-950 uppercase tracking-widest truncate flex-1">
                  {activeLevel.title}
                </span>
                <span className="px-3 py-1 bg-amber-400 text-indigo-950 rounded-full font-black text-xs font-sans shrink-0">
                  {currentQuestionIndex + 1} / {activeLevel.questions.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-450 to-teal-555 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex) / activeLevel.questions.length) * 100}%` }}
                />
              </div>

              {/* Current Question Frame */}
              {(() => {
                const question = activeLevel.questions[currentQuestionIndex];
                return (
                  <div className="w-full bg-[#fffdf9] border-4 border-[#b45309] rounded-[3rem] p-6 sm:p-8 shadow-xl flex flex-col items-center gap-6 relative">
                    
                    {/* Header instruction */}
                    <div className="text-center space-y-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-black text-emerald-800 tracking-wider uppercase font-sans">
                        {activeSubject === 'tamil' ? (
                          question.type === 'trace' ? 'வரைதல் பயிற்சி'
                          : question.type === 'sequence' ? 'விடுபட்ட பகுதி'
                          : question.type === 'find' ? 'அடையாளம் காணல்'
                          : question.type === 'match' ? 'பொருத்துதல்'
                          : 'சரியான விடை'
                        ) : (
                          question.type === 'trace' ? 'Tracing Practice'
                          : question.type === 'sequence' ? 'Fill the Blank'
                          : question.type === 'find' ? 'Identify Item'
                          : question.type === 'match' ? 'Match Item'
                          : question.type === 'spelling' ? 'Spell Word'
                          : question.type === 'sorting' ? 'Sort Letters'
                          : question.type === 'order' ? 'Order Sequence'
                          : 'Choose Correct Answer'
                        )}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight pt-1 leading-snug">
                        {activeSubject === 'tamil' ? question.instructionTa : question.instruction}
                      </h2>
                    </div>

                    {/* 1. Tracing Canvas */}
                    {question.type === 'trace' && question.letter && (
                      <SimpleTraceCanvas
                        letter={question.letter}
                        onComplete={() => handleAnswer({ text: 'trace', correct: true })}
                      />
                    )}

                    {/* Math Compare: Size, weight, quantity choices side-by-side */}
                    {question.type === 'math_compare' && (
                      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg justify-center items-stretch mt-4">
                        {question.options.map((opt, i) => {
                          const isSelected = selectedOptionText === opt.text;
                          const isElephant = opt.text.toLowerCase().includes('elephant') || opt.emoji === '🐘';
                          const isRock = opt.text.toLowerCase().includes('rock') || opt.emoji === '🪨';
                          const isPineTree = opt.text.toLowerCase().includes('pine') || opt.emoji === '🌲';
                          const isMore = opt.text.toLowerCase().includes('5 cookies') || opt.text.toLowerCase().includes('4 apples') || opt.emoji === '🍎🍎🍎🍎';
                          
                          const isLarge = isElephant || isRock || isPineTree || isMore;
                          
                          return (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.05, y: -4 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAnswer(opt)}
                              disabled={selectedOptionText !== null}
                              className={`flex-1 flex flex-col items-center justify-between p-8 rounded-[2.5rem] border-4 shadow-lg transition-all active:scale-95 text-center min-h-[220px] relative overflow-hidden
                                ${isSelected 
                                  ? opt.correct ? 'bg-emerald-500 border-emerald-600 text-white' : 'bg-rose-500 border-rose-600 text-white'
                                  : 'bg-white border-amber-200 text-slate-800 hover:border-amber-450 hover:bg-amber-50/50'}`}
                            >
                              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-100/30 to-transparent rounded-full pointer-events-none" />
                              
                              <div className="flex-1 flex items-center justify-center min-h-[100px]">
                                <motion.div 
                                  animate={isLarge ? { scale: [1, 1.05, 1] } : {}}
                                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                  className={`select-none transition-transform duration-350 drop-shadow-md
                                    ${isLarge ? 'text-7xl sm:text-8xl' : 'text-4xl sm:text-5xl'}`}
                                >
                                  {opt.emoji || '📦'}
                                </motion.div>
                              </div>
                              
                              <div className="mt-4">
                                <span className={`text-base sm:text-lg font-black tracking-tight ${isSelected ? 'text-white' : 'text-indigo-950'}`}>
                                  {opt.text}
                                </span>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    )}

                    {/* Math Count: Interactive bubbles pop and verify */}
                    {question.type === 'math_count' && question.sequence && (
                      <div className="flex flex-col items-center gap-8 w-full mt-2">
                        <div className="bg-white/80 border-2 border-dashed border-amber-300 rounded-[2rem] p-6 w-full max-w-md flex flex-wrap gap-4 justify-center items-center shadow-inner">
                          {question.sequence.map((emoji, idx) => (
                            <CountBubble key={idx} emoji={emoji} />
                          ))}
                        </div>

                        <p className="text-xs font-black text-indigo-900/50 uppercase tracking-widest leading-none text-center">
                          Tap each object to count, then select the number below!
                        </p>

                        <div className="grid grid-cols-3 gap-4 w-full max-w-sm justify-center">
                          {question.options.map((opt, i) => {
                            const isSelected = selectedOptionText === opt.text;
                            return (
                              <motion.button
                                key={i}
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.92 }}
                                onClick={() => handleAnswer(opt)}
                                disabled={selectedOptionText !== null}
                                className={`py-4 rounded-[1.8rem] text-2xl font-black border-4 shadow-md transition-all active:scale-95 flex items-center justify-center
                                  ${isSelected 
                                    ? opt.correct ? 'bg-emerald-500 border-emerald-600 text-white shadow-emerald-200' : 'bg-rose-500 border-rose-600 text-white shadow-rose-200'
                                    : 'bg-white border-amber-200 text-amber-800 hover:bg-amber-50 hover:border-amber-450'}`}
                              >
                                {opt.text}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Math Pattern Sequence Complete */}
                    {question.type === 'math_pattern' && question.sequence && (
                      <div className="flex flex-col items-center gap-8 w-full mt-2 font-sans">
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-4 border-[#b45309]/30 rounded-[2.5rem] p-6 w-full max-w-md flex justify-center items-center shadow-md relative overflow-hidden">
                          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 bg-amber-200/50 pointer-events-none" />
                          
                          <div className="flex items-center gap-3 relative z-10">
                            {question.sequence.map((item, idx) => {
                              const isTarget = item === '?';
                              return (
                                <div key={idx} className="flex items-center gap-2">
                                  {idx > 0 && <span className="text-slate-350 font-black">➔</span>}
                                  <motion.div
                                    animate={isTarget ? { scale: [1, 1.1, 1] } : {}}
                                    transition={isTarget ? { repeat: Infinity, duration: 1.5 } : {}}
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border-2 text-3xl select-none
                                      ${isTarget 
                                        ? 'bg-amber-100 border-dashed border-amber-450 text-amber-700 font-black animate-pulse' 
                                        : 'bg-white border-slate-150'}`}
                                  >
                                    {isTarget ? '?' : item}
                                  </motion.div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 w-full max-w-md justify-center">
                          {question.options.map((opt, i) => {
                            const isSelected = selectedOptionText === opt.text;
                            return (
                              <motion.button
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAnswer(opt)}
                                disabled={selectedOptionText !== null}
                                className={`flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border-2 shadow transition-all active:scale-95
                                  ${isSelected 
                                    ? opt.correct ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-rose-500 border-rose-500 text-white'
                                    : 'bg-white border-slate-150 text-slate-800 hover:bg-emerald-50'}`}
                              >
                                <span className="text-3xl sm:text-4xl drop-shadow-sm">
                                  {opt.emoji || '🧩'}
                                </span>
                                <span className={`text-[10px] sm:text-xs font-black mt-1 ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                                  {opt.text.split(' ')[0]}
                                </span>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 2. Missing Sequence */}
                    {question.type === 'sequence' && question.sequence && (
                      <div className="flex flex-col items-center gap-6 w-full">
                        {/* Horizontal Flow for Sequence */}
                        <div className="flex flex-wrap gap-2.5 sm:gap-4 justify-center items-center w-full">
                          {question.sequence.map((item, idx) => {
                            const isPlaceholder = item === '_';
                            return (
                              <div 
                                key={idx} 
                                className={`px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-3xl flex items-center justify-center font-black text-sm sm:text-lg shadow-sm border-2 transition-all
                                  ${isPlaceholder 
                                    ? 'bg-amber-50 text-amber-600 border-dashed border-amber-400 min-w-[70px] sm:min-w-[90px]' 
                                    : 'bg-white border-slate-150 text-slate-800'
                                  }`}
                              >
                                {isPlaceholder ? '?' : item}
                              </div>
                            );
                          })}
                        </div>

                        {/* Options Selection Grid */}
                        <div className="grid grid-cols-3 gap-3 w-full max-w-md justify-center mt-2">
                          {question.options.map((opt, i) => {
                            const isSelected = selectedOptionText === opt.text;
                            return (
                              <button
                                key={i}
                                onClick={() => handleAnswer(opt)}
                                disabled={selectedOptionText !== null}
                                className={`flex flex-col items-center gap-2 py-3.5 px-2.5 rounded-3xl border-2 shadow transition-all active:scale-95
                                  ${isSelected 
                                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                                    : 'bg-white border-slate-150 text-slate-800 hover:bg-emerald-50'}`}
                              >
                                {opt.img ? (
                                  <FamilyMedia emojiOrPath={opt.img} className="w-10 h-10 sm:w-14 sm:h-14 object-contain" />
                                ) : opt.emoji ? (
                                  <span className="text-3xl sm:text-4xl">{opt.emoji}</span>
                                ) : (
                                  <span className="text-2xl">🧩</span>
                                )}
                                <span className={`text-xs font-black mt-1 ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                                  {opt.text}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 3. Find and Mark */}
                    {question.type === 'find' && (
                      <div className="grid grid-cols-2 gap-3 w-full max-w-sm justify-center">
                        {question.options.map((opt, i) => {
                          const isSelected = selectedOptionText === opt.text;
                          return (
                            <button
                              key={i}
                              onClick={() => handleAnswer(opt)}
                              disabled={selectedOptionText !== null}
                              className={`py-4 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] text-xl sm:text-2xl font-black shadow border-2 transition-all active:scale-95
                                ${isSelected 
                                  ? 'bg-emerald-500 border-emerald-500 text-white' 
                                  : 'bg-white border-slate-150 text-slate-800 hover:bg-emerald-50'}`}
                            >
                              {opt.text}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* 4. Match Image */}
                    {question.type === 'match' && question.matchImage && (
                      <div className="flex flex-col items-center gap-6 w-full">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-3xl flex items-center justify-center shadow-md border border-slate-100">
                          <FamilyMedia emojiOrPath={question.matchImage} className="w-16 h-16 sm:w-24 sm:h-24 object-contain" />
                        </div>

                        <div className="grid grid-cols-3 gap-2.5 w-full max-w-xs justify-center">
                          {question.options.map((opt, i) => {
                            const isSelected = selectedOptionText === opt.text;
                            return (
                              <button
                                key={i}
                                onClick={() => handleAnswer(opt)}
                                disabled={selectedOptionText !== null}
                                className={`py-3 sm:py-4 rounded-2xl text-lg sm:text-xl font-black shadow border-2 transition-all active:scale-95
                                  ${isSelected 
                                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                                    : 'bg-white border-slate-150 text-slate-800 hover:bg-emerald-50'}`}
                              >
                                {opt.text}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 5. Choice Game */}
                    {question.type === 'choice' && (
                      <div className="grid grid-cols-3 gap-2 w-full max-w-md justify-center">
                        {question.options.map((opt, i) => {
                          const isSelected = selectedOptionText === opt.text;
                          return (
                            <button
                              key={i}
                              onClick={() => handleAnswer(opt)}
                              disabled={selectedOptionText !== null}
                              className={`flex flex-col items-center gap-2 py-3 sm:py-4 px-2 rounded-2xl border-2 shadow transition-all active:scale-95
                                ${isSelected 
                                  ? 'bg-emerald-500 border-emerald-500 text-white' 
                                  : 'bg-white border-slate-100 hover:bg-emerald-50 text-slate-800'}`}
                            >
                              {opt.img ? (
                                <FamilyMedia emojiOrPath={opt.img} className="w-10 h-10 sm:w-14 sm:h-14 object-contain" />
                              ) : opt.emoji ? (
                                <span className="text-3xl sm:text-5xl">{opt.emoji}</span>
                              ) : null}
                              <span className={`text-[10px] sm:text-xs font-black mt-1 ${isSelected ? 'text-white' : 'text-slate-700'}`}>
                                {opt.text}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* 6. Spelling Game */}
                    {question.type === 'spelling' && (
                      <div className="flex flex-col items-center gap-6 w-full font-sans">
                        {/* Word spelling display */}
                        <div className="flex gap-2 justify-center items-center py-4">
                          {question.letter?.split('').map((char, charIdx) => {
                            const isBlank = char === '_';
                            return (
                              <motion.div
                                key={charIdx}
                                animate={isBlank && selectedLetter ? { scale: [1, 1.1, 1], y: [0, -5, 0] } : {}}
                                className={`w-12 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl border-2 shadow-sm
                                  ${isBlank 
                                    ? 'bg-amber-50 border-dashed border-amber-400 text-amber-600 font-extrabold min-w-[3rem]' 
                                    : 'bg-white border-slate-200 text-slate-800'
                                  }`}
                              >
                                {isBlank ? (selectedLetter || '?') : char}
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* Letter Tiles to select from */}
                        <div className="grid grid-cols-3 gap-3 w-full max-w-sm justify-center">
                          {question.options.map((opt, i) => {
                            const isSelected = selectedOptionText === opt.text;
                            return (
                              <button
                                key={i}
                                onClick={() => {
                                  setSelectedLetter(opt.text);
                                  handleAnswer(opt);
                                }}
                                disabled={selectedOptionText !== null}
                                className={`py-4 rounded-2xl text-xl font-bold shadow border-2 transition-all active:scale-95 flex flex-col items-center justify-center
                                  ${isSelected 
                                    ? opt.correct ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-rose-500 border-rose-500 text-white'
                                    : 'bg-white border-slate-150 text-slate-800 hover:bg-emerald-50'}`}
                              >
                                <span className="text-2xl font-black">{opt.text}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 7. Sorting Game */}
                    {question.type === 'sorting' && (
                      <div className="flex flex-col items-center gap-6 w-full font-sans">
                        {/* Target letter to sort */}
                        {question.letter && (
                          <div className="w-24 h-24 rounded-3xl bg-indigo-50 border-4 border-indigo-200 shadow-md flex items-center justify-center text-5xl font-black text-indigo-800 select-none animate-bounce">
                            {question.letter}
                          </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-4 w-full max-w-md justify-center py-2">
                          {question.options.map((opt, i) => {
                            const isSelected = selectedOptionText === opt.text;
                            const colors = ['bg-rose-50 border-rose-200 text-rose-600', 'bg-blue-50 border-blue-200 text-blue-600'];
                            return (
                              <button
                                key={i}
                                onClick={() => handleAnswer(opt)}
                                disabled={selectedOptionText !== null}
                                className={`h-24 rounded-3xl border-2 shadow transition-all active:scale-95 flex items-center justify-center text-lg font-black p-4 text-center
                                  ${isSelected 
                                    ? opt.correct ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-rose-500 border-rose-500 text-white'
                                    : `${colors[i % 2]} hover:bg-indigo-50`}`}
                              >
                                {opt.text}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 8. Order Sequence Game */}
                    {question.type === 'order' && (
                      <div className="flex flex-col gap-4 w-full font-sans">
                        {question.options.map((opt, i) => {
                          const isSelected = selectedOptionText === opt.text;
                          const steps = opt.text.split('➔').map(s => s.trim());
                          return (
                            <button
                              key={i}
                              onClick={() => handleAnswer(opt)}
                              disabled={selectedOptionText !== null}
                              className={`w-full p-4 rounded-3xl border-2 shadow transition-all active:scale-95 flex flex-col gap-2 items-center text-center
                                ${isSelected 
                                  ? opt.correct ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-rose-500 border-rose-500 text-white'
                                  : 'bg-white border-slate-150 text-slate-800 hover:bg-emerald-50'}`}
                            >
                              <div className="flex flex-wrap items-center justify-center gap-2">
                                {steps.map((step, idx) => (
                                  <React.Fragment key={idx}>
                                    {idx > 0 && <span className={`text-lg font-black ${isSelected ? 'text-white' : 'text-amber-500'}`}>➔</span>}
                                    <span className={`px-3 py-1.5 rounded-full text-xs font-black shadow-inner
                                      ${isSelected ? 'bg-white/20 text-white' : 'bg-amber-50 border border-amber-100 text-amber-800'}`}>
                                      {step}
                                    </span>
                                  </React.Fragment>
                                ))}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}

                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* 4. SCORE CARD VIEW */}
          {view === 'score_card' && activeLevel && (
            <motion.div
              key="score"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md mx-auto bg-[#fffdf9] border-4 border-[#b45309] rounded-[3rem] p-8 text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-pink-100/50 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-emerald-100/50 rounded-full blur-[60px] pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center gap-6">
                
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-7xl sm:text-8xl drop-shadow"
                >
                  🏆
                </motion.div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                    சவால் முடிந்தது!
                  </h2>
                  <p className="text-sm font-bold text-slate-500 mt-2">
                    அருமையாக விளையாடினீர்கள்! 🎊
                  </p>
                </div>

                <div className="flex gap-2 justify-center py-2">
                  {[1, 2, 3, 4, 5].map((star, idx) => {
                    const earned = scores.filter(Boolean).length >= star;
                    return (
                      <Star
                        key={idx}
                        size={28}
                        className={earned ? 'text-amber-500 fill-amber-500' : 'text-slate-200'}
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      />
                    );
                  })}
                </div>

                <div className="px-6 py-2 bg-emerald-50 border border-emerald-100 rounded-xl font-sans">
                  <span className="text-xl font-black text-emerald-800">
                    {scores.filter(Boolean).length} / {activeLevel.questions.length} சரி
                  </span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView('levels')}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg border-b-4 border-teal-750 active:scale-95"
                >
                  நிலைகளுக்குத் திரும்பு ➡️
                </motion.button>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>

      {/* OVERLAY WRAPPERS FOR OTHER SUBJECTS */}
      <AnimatePresence>
        {activeQuiz && (
          <div className="fixed inset-0 z-[200] bg-white overflow-y-auto magic-scroll font-sans">
            <QuizEngine lesson={activeQuiz} onClose={() => setActiveQuiz(null)} onComplete={() => {}} />
          </div>
        )}
        {activeGame && (
          <div className="fixed inset-0 z-[200] bg-sky-400 overflow-y-auto magic-scroll font-sans">
            <div className="relative min-h-screen">
              {activeGame === 'sound' && <SoundMatchGame onBack={() => setActiveGame(null)} />}
              {activeGame === 'truefalse' && <TrueOrFalseGame onBack={() => setActiveGame(null)} />}
              {activeGame === 'sequence' && <SequenceGame onBack={() => setActiveGame(null)} />}
              {activeGame === 'memory' && <MemoryMatchGame onBack={() => setActiveGame(null)} />}
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
