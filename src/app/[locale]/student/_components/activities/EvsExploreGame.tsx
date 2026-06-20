'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAMILY_BG: Record<string, string> = {
  '👩': 'bg-pink-500',
  '👨': 'bg-blue-500',
  '👧': 'bg-orange-400',
  '👦': 'bg-emerald-500',
  '👵': 'bg-purple-500',
  '👴': 'bg-amber-600',
};

interface MatchingItem {
  id: string;
  label: string;
  emoji?: string;
}

interface Round {
  type: 'story' | 'learn' | 'question' | 'reward' | 'match';
  story?: string;
  showEmoji?: string;
  labels?: string[];
  question?: string;
  options?: { id: string; emoji: string; label: string }[];
  correctId?: string;
  matchingPairs?: { left: MatchingItem; right: MatchingItem }[];
}

interface EvsLesson {
  id: string;
  rounds: Round[];
}

const LESSONS: Record<string, EvsLesson> = {
  'my-body-parts': {
    id: 'my-body-parts',
    rounds: [
      {
        type: 'story',
        story: 'Let us learn about our body parts! Can you find them all?',
      },
      {
        type: 'learn',
        showEmoji: '👀 👃 👂 👄',
        labels: ['Eyes', 'Nose', 'Ears', 'Mouth'],
        story: 'Face Parts',
      },
      {
        type: 'learn',
        showEmoji: '✋ 🦵 🦶',
        labels: ['Hands', 'Legs', 'Feet'],
        story: 'Body Parts',
      },
      {
        type: 'question',
        showEmoji: '👀',

        options: [
          { id: 'eyes', emoji: '👀', label: 'Eyes' },
          { id: 'ears', emoji: '👂', label: 'Ears' },
          { id: 'nose', emoji: '👃', label: 'Nose' },
        ],
        correctId: 'eyes',
      },
      {
        type: 'question',
        showEmoji: '👃',

        options: [
          { id: 'eyes', emoji: '👀', label: 'Eyes' },
          { id: 'nose', emoji: '👃', label: 'Nose' },
          { id: 'mouth', emoji: '👄', label: 'Mouth' },
        ],
        correctId: 'nose',
      },
      {
        type: 'question',
        showEmoji: '👂',

        options: [
          { id: 'hands', emoji: '✋', label: 'Hands' },
          { id: 'ears', emoji: '👂', label: 'Ears' },
          { id: 'legs', emoji: '🦵', label: 'Legs' },
        ],
        correctId: 'ears',
      },
      {
        type: 'question',
        showEmoji: '✋',

        options: [
          { id: 'hands', emoji: '✋', label: 'Hands' },
          { id: 'feet', emoji: '🦶', label: 'Feet' },
          { id: 'ears', emoji: '👂', label: 'Ears' },
        ],
        correctId: 'hands',
      },
      {
        type: 'question',
        showEmoji: '🦵',

        options: [
          { id: 'hands', emoji: '✋', label: 'Hands' },
          { id: 'nose', emoji: '👃', label: 'Nose' },
          { id: 'legs', emoji: '🦵', label: 'Legs' },
        ],
        correctId: 'legs',
      },
      {
        type: 'match',
        question: 'Match the body parts to their names! ➔',
        matchingPairs: [
          { left: { id: 'eyes', label: 'Eyes', emoji: '👀' }, right: { id: 'eyes', label: 'Eyes' } },
          { left: { id: 'nose', label: 'Nose', emoji: '👃' }, right: { id: 'nose', label: 'Nose' } },
          { left: { id: 'ears', label: 'Ears', emoji: '👂' }, right: { id: 'ears', label: 'Ears' } },
          { left: { id: 'mouth', label: 'Mouth', emoji: '👄' }, right: { id: 'mouth', label: 'Mouth' } },
        ]
      },
      {
        type: 'reward',
        story: 'You know all your body parts! Eyes, nose, ears, hands, legs!',
      },
    ],
  },
  'my-five-senses': {
    id: 'my-five-senses',
    rounds: [
      {
        type: 'story',
        story: 'We have five senses! See, hear, smell, taste, and touch!',
      },
      {
        type: 'learn',
        showEmoji: '👀 👂 👃 👅 ✋',
        labels: ['Sight', 'Hearing', 'Smell', 'Taste', 'Touch'],
        story: 'Your Five Senses',
      },
      {
        type: 'question',
        showEmoji: '🌈',
        options: [
          { id: 'sight', emoji: '👀', label: 'Sight' },
          { id: 'hearing', emoji: '👂', label: 'Hearing' },
          { id: 'smell', emoji: '👃', label: 'Smell' },
        ],
        correctId: 'sight',
      },
      {
        type: 'question',
        showEmoji: '🎵',
        options: [
          { id: 'sight', emoji: '👀', label: 'Sight' },
          { id: 'hearing', emoji: '👂', label: 'Hearing' },
          { id: 'taste', emoji: '👅', label: 'Taste' },
        ],
        correctId: 'hearing',
      },
      {
        type: 'question',
        showEmoji: '🌹',
        options: [
          { id: 'smell', emoji: '👃', label: 'Smell' },
          { id: 'taste', emoji: '👅', label: 'Taste' },
          { id: 'touch', emoji: '✋', label: 'Touch' },
        ],
        correctId: 'smell',
      },
      {
        type: 'question',
        showEmoji: '🍦',
        options: [
          { id: 'smell', emoji: '👃', label: 'Smell' },
          { id: 'hearing', emoji: '👂', label: 'Hearing' },
          { id: 'taste', emoji: '👅', label: 'Taste' },
        ],
        correctId: 'taste',
      },
      {
        type: 'question',
        showEmoji: '🧸',
        options: [
          { id: 'sight', emoji: '👀', label: 'Sight' },
          { id: 'touch', emoji: '✋', label: 'Touch' },
          { id: 'hearing', emoji: '👂', label: 'Hearing' },
        ],
        correctId: 'touch',
      },
      {
        type: 'match',
        question: 'Match Senses to Objects! ➔',
        matchingPairs: [
          { left: { id: 'sight', label: 'Sight', emoji: '👀' }, right: { id: 'sight', label: 'Rainbow 🌈' } },
          { left: { id: 'hearing', label: 'Hearing', emoji: '👂' }, right: { id: 'hearing', label: 'Music 🎵' } },
          { left: { id: 'smell', label: 'Smell', emoji: '👃' }, right: { id: 'smell', label: 'Flower 🌹' } },
          { left: { id: 'taste', label: 'Taste', emoji: '👅' }, right: { id: 'taste', label: 'Ice Cream 🍦' } },
        ]
      },
      {
        type: 'reward',
        story: 'You know all five senses! See, hear, smell, taste, touch!',
      },
    ],
  },
  'taking-care': {
    id: 'taking-care',
    rounds: [
      {
        type: 'story',
        story: 'Taking care of our body keeps us clean and healthy! Let us learn how!',
      },
      {
        type: 'learn',
        showEmoji: '🪥 🧼 🚿',
        labels: ['Brush', 'Wash', 'Bathe'],
        story: 'Stay Clean',
      },
      {
        type: 'learn',
        showEmoji: '😴 🥤 🥦',
        labels: ['Sleep', 'Water', 'Eat Well'],
        story: 'Stay Strong',
      },
      {
        type: 'question',
        showEmoji: '🪥',

        options: [
          { id: 'toothbrush', emoji: '🪥', label: 'Toothbrush' },
          { id: 'comb', emoji: '🪮', label: 'Comb' },
          { id: 'spoon', emoji: '🥄', label: 'Spoon' },
        ],
        correctId: 'toothbrush',
      },
      {
        type: 'question',
        showEmoji: '🧼',

        options: [
          { id: 'book', emoji: '📖', label: 'Book' },
          { id: 'soap', emoji: '🧼', label: 'Soap' },
          { id: 'toy', emoji: '🧸', label: 'Toy' },
        ],
        correctId: 'soap',
      },
      {
        type: 'question',
        showEmoji: '🛁',

        options: [
          { id: 'bed', emoji: '🛏️', label: 'Bed' },
          { id: 'bathtub', emoji: '🛁', label: 'Bathtub' },
          { id: 'chair', emoji: '🪑', label: 'Chair' },
        ],
        correctId: 'bathtub',
      },
      {
        type: 'question',
        showEmoji: '🪥',

        options: [
          { id: 'once', emoji: '1️⃣', label: 'Once' },
          { id: 'twice', emoji: '2️⃣', label: 'Twice' },
          { id: 'never', emoji: '🚫', label: 'Never' },
        ],
        correctId: 'twice',
      },
      {
        type: 'question',
        showEmoji: '😴',

        options: [
          { id: 'play', emoji: '🎮', label: 'Play' },
          { id: 'sleep', emoji: '😴', label: 'Sleep' },
          { id: 'eat', emoji: '🍕', label: 'Eat' },
        ],
        correctId: 'sleep',
      },
      {
        type: 'reward',
        story: 'You know how to take care of your body! Brush, wash, bathe, sleep! Stay healthy!',
      },
    ],
  },
  'family-members': {
    id: 'family-members',
    rounds: [
      {
        type: 'story',
        story: 'Meet your family! Everyone in your family loves you very much!',
      },
      {
        type: 'learn',
        showEmoji: '👩 👨 👧 👦 👵 👴',
        labels: ['Mother', 'Father', 'Sister', 'Brother', 'Grandma', 'Grandpa'],
        story: 'My Family',
      },
      {
        type: 'question',
        showEmoji: '👩',

        options: [
          { id: 'mother', emoji: '👩', label: 'Mother' },
          { id: 'grandpa', emoji: '👴', label: 'Grandfather' },
          { id: 'brother', emoji: '👦', label: 'Brother' },
        ],
        correctId: 'mother',
      },
      {
        type: 'question',
        showEmoji: '👨',

        options: [
          { id: 'grandma', emoji: '👵', label: 'Grandmother' },
          { id: 'father', emoji: '👨', label: 'Father' },
          { id: 'sister', emoji: '👧', label: 'Sister' },
        ],
        correctId: 'father',
      },
      {
        type: 'question',
        showEmoji: '👧',

        options: [
          { id: 'sister', emoji: '👧', label: 'Sister' },
          { id: 'grandpa', emoji: '👴', label: 'Grandfather' },
          { id: 'father', emoji: '👨', label: 'Father' },
        ],
        correctId: 'sister',
      },
      {
        type: 'question',
        showEmoji: '👦',

        options: [
          { id: 'grandma', emoji: '👵', label: 'Grandmother' },
          { id: 'mother', emoji: '👩', label: 'Mother' },
          { id: 'brother', emoji: '👦', label: 'Brother' },
        ],
        correctId: 'brother',
      },
      {
        type: 'question',
        showEmoji: '👵',

        options: [
          { id: 'grandma', emoji: '👵', label: 'Grandmother' },
          { id: 'brother', emoji: '👦', label: 'Brother' },
          { id: 'father', emoji: '👨', label: 'Father' },
        ],
        correctId: 'grandma',
      },
      {
        type: 'question',
        showEmoji: '👴',

        options: [
          { id: 'sister', emoji: '👧', label: 'Sister' },
          { id: 'grandpa', emoji: '👴', label: 'Grandfather' },
          { id: 'mother', emoji: '👩', label: 'Mother' },
        ],
        correctId: 'grandpa',
      },
      {
        type: 'match',
        question: 'Match family stickers! ➔',
        matchingPairs: [
          { left: { id: 'mother', label: 'Mother', emoji: '👩' }, right: { id: 'mother', label: 'Mom' } },
          { left: { id: 'father', label: 'Father', emoji: '👨' }, right: { id: 'father', label: 'Dad' } },
          { left: { id: 'sister', label: 'Sister', emoji: '👧' }, right: { id: 'sister', label: 'Sister' } },
          { left: { id: 'brother', label: 'Brother', emoji: '👦' }, right: { id: 'brother', label: 'Brother' } },
        ]
      },
      {
        type: 'reward',
        story: 'Super! You know every family member! Mother, father, sister, brother, grandma, grandpa!',
      },
    ],
  },
  'my-home': {
    id: 'my-home',
    rounds: [
      {
        type: 'story',
        story: 'A home has many rooms! Let us explore them all!',
      },
      {
        type: 'learn',
        showEmoji: '🛏️ 🍳 🛋️ 🚿 🍽️',
        labels: ['Bedroom', 'Kitchen', 'Living Room', 'Bathroom', 'Dining'],
        story: 'Rooms in My Home',
      },
      {
        type: 'question',
        showEmoji: '🛏️',

        options: [
          { id: 'bedroom', emoji: '🛏️', label: 'Bedroom' },
          { id: 'kitchen', emoji: '🍳', label: 'Kitchen' },
          { id: 'bathroom', emoji: '🚿', label: 'Bathroom' },
        ],
        correctId: 'bedroom',
      },
      {
        type: 'question',
        showEmoji: '🍳',

        options: [
          { id: 'livingroom', emoji: '🛋️', label: 'Living Room' },
          { id: 'kitchen', emoji: '🍳', label: 'Kitchen' },
          { id: 'bedroom', emoji: '🛏️', label: 'Bedroom' },
        ],
        correctId: 'kitchen',
      },
      {
        type: 'question',
        showEmoji: '🛋️',

        options: [
          { id: 'kitchen', emoji: '🍳', label: 'Kitchen' },
          { id: 'bathroom', emoji: '🚿', label: 'Bathroom' },
          { id: 'livingroom', emoji: '🛋️', label: 'Living Room' },
        ],
        correctId: 'livingroom',
      },
      {
        type: 'question',
        showEmoji: '🚿',

        options: [
          { id: 'diningroom', emoji: '🍽️', label: 'Dining Room' },
          { id: 'bathroom', emoji: '🚿', label: 'Bathroom' },
          { id: 'livingroom', emoji: '🛋️', label: 'Living Room' },
        ],
        correctId: 'bathroom',
      },
      {
        type: 'question',
        showEmoji: '🍽️',

        options: [
          { id: 'bathroom', emoji: '🚿', label: 'Bathroom' },
          { id: 'bedroom', emoji: '🛏️', label: 'Bedroom' },
          { id: 'diningroom', emoji: '🍽️', label: 'Dining Room' },
        ],
        correctId: 'diningroom',
      },
      {
        type: 'reward',
        story: 'Amazing! You know all the rooms in a home! Bedroom, kitchen, living room, bathroom, dining room!',
      },
    ],
  },
  'pet-wild-animals': {
    id: 'pet-wild-animals',
    rounds: [
      {
        type: 'story',
        story: 'Some animals live with us at home — they are pets! Some live in the jungle — they are wild!',
      },
      {
        type: 'learn',
        showEmoji: '🏠 🐱 🐶 🐰',
        labels: ['Home', 'Cat', 'Dog', 'Rabbit'],
        story: 'Pets — Live at Home',
      },
      {
        type: 'learn',
        showEmoji: '🌴 🦁 🐯 🐘',
        labels: ['Jungle', 'Lion', 'Tiger', 'Elephant'],
        story: 'Wild — Live in Jungle',
      },
      {
        type: 'question',
        showEmoji: '🐱',
        options: [
          { id: 'pet', emoji: '🏠', label: 'Pet' },
          { id: 'wild', emoji: '🌴', label: 'Wild' },
          { id: 'toy', emoji: '🧸', label: 'Toy' },
        ],
        correctId: 'pet',
      },
      {
        type: 'question',
        showEmoji: '🦁',
        options: [
          { id: 'wild', emoji: '🌴', label: 'Wild' },
          { id: 'pet', emoji: '🏠', label: 'Pet' },
          { id: 'book', emoji: '📖', label: 'Book' },
        ],
        correctId: 'wild',
      },
      {
        type: 'question',
        showEmoji: '🐶',
        options: [
          { id: 'pet', emoji: '🏠', label: 'Pet' },
          { id: 'wild', emoji: '🌴', label: 'Wild' },
          { id: 'star', emoji: '⭐', label: 'Star' },
        ],
        correctId: 'pet',
      },
      {
        type: 'question',
        showEmoji: '🐘',
        options: [
          { id: 'wild', emoji: '🌴', label: 'Wild' },
          { id: 'pet', emoji: '🏠', label: 'Pet' },
          { id: 'car', emoji: '🚗', label: 'Car' },
        ],
        correctId: 'wild',
      },
      {
        type: 'question',
        showEmoji: '🐰',
        options: [
          { id: 'pet', emoji: '🏠', label: 'Pet' },
          { id: 'wild', emoji: '🌴', label: 'Wild' },
          { id: 'balloon', emoji: '🎈', label: 'Balloon' },
        ],
        correctId: 'pet',
      },
      {
        type: 'question',
        showEmoji: '🐯',
        options: [
          { id: 'wild', emoji: '🌴', label: 'Wild' },
          { id: 'pet', emoji: '🏠', label: 'Pet' },
          { id: 'apple', emoji: '🍎', label: 'Apple' },
        ],
        correctId: 'wild',
      },
      {
        type: 'reward',
        story: 'Super! You know which animals are pets and which are wild! Cats, dogs, rabbits are pets! Lions, tigers, elephants are wild!',
      },
    ],
  },
  'animal-homes': {
    id: 'animal-homes',
    rounds: [
      {
        type: 'story',
        story: 'Every animal has a home! Let us find where they live!',
      },
      {
        type: 'learn',
        showEmoji: '🐦🪺 🐟🌊 🐶🏠',
        labels: ['Nest', 'Water', 'Dog House'],
        story: 'Animal Homes',
      },
      {
        type: 'learn',
        showEmoji: '🐰🕳️ 🦁⛰️ 🐝🐝',
        labels: ['Hole', 'Cave', 'Hive'],
        story: 'More Animal Homes',
      },
      {
        type: 'question',
        showEmoji: '🐦',
        options: [
          { id: 'nest', emoji: '🪺', label: 'Nest' },
          { id: 'water', emoji: '🌊', label: 'Water' },
          { id: 'cave', emoji: '⛰️', label: 'Cave' },
        ],
        correctId: 'nest',
      },
      {
        type: 'question',
        showEmoji: '🐟',
        options: [
          { id: 'water', emoji: '🌊', label: 'Water' },
          { id: 'nest', emoji: '🪺', label: 'Nest' },
          { id: 'dhouse', emoji: '🏠', label: 'Dog House' },
        ],
        correctId: 'water',
      },
      {
        type: 'question',
        showEmoji: '🐶',
        options: [
          { id: 'hole', emoji: '🕳️', label: 'Hole' },
          { id: 'dhouse', emoji: '🏠', label: 'Dog House' },
          { id: 'hive', emoji: '🐝', label: 'Hive' },
        ],
        correctId: 'dhouse',
      },
      {
        type: 'question',
        showEmoji: '🐰',
        options: [
          { id: 'cave', emoji: '⛰️', label: 'Cave' },
          { id: 'dhouse', emoji: '🏠', label: 'Dog House' },
          { id: 'hole', emoji: '🕳️', label: 'Hole' },
        ],
        correctId: 'hole',
      },
      {
        type: 'question',
        showEmoji: '🦁',
        options: [
          { id: 'cave', emoji: '⛰️', label: 'Cave' },
          { id: 'water', emoji: '🌊', label: 'Water' },
          { id: 'nest', emoji: '🪺', label: 'Nest' },
        ],
        correctId: 'cave',
      },
      {
        type: 'question',
        showEmoji: '🐝',
        options: [
          { id: 'hole', emoji: '🕳️', label: 'Hole' },
          { id: 'hive', emoji: '🐝', label: 'Hive' },
          { id: 'dhouse', emoji: '🏠', label: 'Dog House' },
        ],
        correctId: 'hive',
      },
      {
        type: 'reward',
        story: 'Super! Birds live in nests, fish in water, dogs in dog houses, rabbits in holes, lions in caves, bees in hives!',
      },
    ],
  },
  'plant-parts': {
    id: 'plant-parts',
    rounds: [
      {
        type: 'story',
        story: 'Plants have different parts! Let us explore them!',
      },
      {
        type: 'learn',
        showEmoji: '🌱 🌿 🌸 🍎',
        labels: ['Roots', 'Leaves', 'Flower', 'Fruit'],
        story: 'Parts of a Plant',
      },
      {
        type: 'question',
        showEmoji: '🌱',
        options: [
          { id: 'roots', emoji: '🌱', label: 'Roots' },
          { id: 'leaves', emoji: '🌿', label: 'Leaves' },
          { id: 'flower', emoji: '🌸', label: 'Flower' },
        ],
        correctId: 'roots',
      },
      {
        type: 'question',
        showEmoji: '🌿',
        options: [
          { id: 'flower', emoji: '🌸', label: 'Flower' },
          { id: 'fruit', emoji: '🍎', label: 'Fruit' },
          { id: 'leaves', emoji: '🌿', label: 'Leaves' },
        ],
        correctId: 'leaves',
      },
      {
        type: 'question',
        showEmoji: '🌸',
        options: [
          { id: 'flower', emoji: '🌸', label: 'Flower' },
          { id: 'roots', emoji: '🌱', label: 'Roots' },
          { id: 'fruit', emoji: '🍎', label: 'Fruit' },
        ],
        correctId: 'flower',
      },
      {
        type: 'question',
        showEmoji: '🍎',
        options: [
          { id: 'leaves', emoji: '🌿', label: 'Leaves' },
          { id: 'fruit', emoji: '🍎', label: 'Fruit' },
          { id: 'flower', emoji: '🌸', label: 'Flower' },
        ],
        correctId: 'fruit',
      },
      {
        type: 'reward',
        story: 'Super! You know all plant parts! Roots drink, leaves make food, flowers bloom, fruits are yummy!',
      },
    ],
  },
  'nature-things': {
    id: 'nature-things',
    rounds: [
      {
        type: 'story',
        story: 'Look outside! Nature has amazing things in the sky!',
      },
      {
        type: 'learn',
        showEmoji: '☀️ ☁️ 🌧️ 🌈',
        labels: ['Sun', 'Clouds', 'Rain', 'Rainbow'],
        story: 'Things in Nature',
      },
      {
        type: 'question',
        showEmoji: '☀️',
        options: [
          { id: 'sun', emoji: '☀️', label: 'Sun' },
          { id: 'clouds', emoji: '☁️', label: 'Clouds' },
          { id: 'rain', emoji: '🌧️', label: 'Rain' },
        ],
        correctId: 'sun',
      },
      {
        type: 'question',
        showEmoji: '☁️',
        options: [
          { id: 'rainbow', emoji: '🌈', label: 'Rainbow' },
          { id: 'sun', emoji: '☀️', label: 'Sun' },
          { id: 'clouds', emoji: '☁️', label: 'Clouds' },
        ],
        correctId: 'clouds',
      },
      {
        type: 'question',
        showEmoji: '🌧️',
        options: [
          { id: 'sun', emoji: '☀️', label: 'Sun' },
          { id: 'rain', emoji: '🌧️', label: 'Rain' },
          { id: 'clouds', emoji: '☁️', label: 'Clouds' },
        ],
        correctId: 'rain',
      },
      {
        type: 'question',
        showEmoji: '🌈',
        options: [
          { id: 'rain', emoji: '🌧️', label: 'Rain' },
          { id: 'rainbow', emoji: '🌈', label: 'Rainbow' },
          { id: 'sun', emoji: '☀️', label: 'Sun' },
        ],
        correctId: 'rainbow',
      },
      {
        type: 'reward',
        story: 'Amazing! Sun shines, clouds float, rain falls, rainbow glows! Nature is beautiful!',
      },
    ],
  },
  'seasons': {
    id: 'seasons',
    rounds: [
      {
        type: 'story',
        story: 'The year has three different times — some hot, some rainy, some cold! Let us learn about the seasons!',
      },
      {
        type: 'learn',
        showEmoji: '☀️ 🌧️ ❄️',
        labels: ['Summer', 'Rainy', 'Winter'],
        story: 'Seasons',
      },
      {
        type: 'question',
        showEmoji: '☀️',
        options: [
          { id: 'summer', emoji: '☀️', label: 'Summer' },
          { id: 'rainy', emoji: '🌧️', label: 'Rainy' },
          { id: 'winter', emoji: '❄️', label: 'Winter' },
        ],
        correctId: 'summer',
      },
      {
        type: 'question',
        showEmoji: '🌧️',
        options: [
          { id: 'winter', emoji: '❄️', label: 'Winter' },
          { id: 'rainy', emoji: '🌧️', label: 'Rainy' },
          { id: 'summer', emoji: '☀️', label: 'Summer' },
        ],
        correctId: 'rainy',
      },
      {
        type: 'question',
        showEmoji: '❄️',
        options: [
          { id: 'rainy', emoji: '🌧️', label: 'Rainy' },
          { id: 'summer', emoji: '☀️', label: 'Summer' },
          { id: 'winter', emoji: '❄️', label: 'Winter' },
        ],
        correctId: 'winter',
      },
      {
        type: 'reward',
        story: 'Fantastic! Now you know summer, rainy, and winter seasons!',
      },
    ],
  },
  'land-transport': {
    id: 'land-transport',
    rounds: [
      {
        type: 'story',
        story: 'Cars, buses, bicycles, and trains — they all move on land! Let us learn about land transport!',
      },
      {
        type: 'learn',
        showEmoji: '🚗 🚌 🚲 🚂',
        labels: ['Car', 'Bus', 'Bicycle', 'Train'],
        story: 'Land Transport',
      },
      {
        type: 'question',
        showEmoji: '🚗',
        options: [
          { id: 'bus', emoji: '🚌', label: 'Bus' },
          { id: 'car', emoji: '🚗', label: 'Car' },
          { id: 'train', emoji: '🚂', label: 'Train' },
        ],
        correctId: 'car',
      },
      {
        type: 'question',
        showEmoji: '🚌',
        options: [
          { id: 'bus', emoji: '🚌', label: 'Bus' },
          { id: 'bicycle', emoji: '🚲', label: 'Bicycle' },
          { id: 'car', emoji: '🚗', label: 'Car' },
        ],
        correctId: 'bus',
      },
      {
        type: 'question',
        showEmoji: '🚲',
        options: [
          { id: 'car', emoji: '🚗', label: 'Car' },
          { id: 'bus', emoji: '🚌', label: 'Bus' },
          { id: 'bicycle', emoji: '🚲', label: 'Bicycle' },
        ],
        correctId: 'bicycle',
      },
      {
        type: 'question',
        showEmoji: '🚂',
        options: [
          { id: 'bicycle', emoji: '🚲', label: 'Bicycle' },
          { id: 'train', emoji: '🚂', label: 'Train' },
          { id: 'bus', emoji: '🚌', label: 'Bus' },
        ],
        correctId: 'train',
      },
      {
        type: 'reward',
        story: 'Super! Cars, buses, bicycles, and trains travel on land!',
      },
    ],
  },
  'air-water-transport': {
    id: 'air-water-transport',
    rounds: [
      {
        type: 'story',
        story: 'Aeroplanes fly in the sky, ships sail in the water! Let us explore air and water transport!',
      },
      {
        type: 'learn',
        showEmoji: '✈️ 🚁 ⛵ 🚢',
        labels: ['Aeroplane', 'Helicopter', 'Sailboat', 'Ship'],
        story: 'Air & Water Transport',
      },
      {
        type: 'question',
        showEmoji: '✈️',
        options: [
          { id: 'helicopter', emoji: '🚁', label: 'Helicopter' },
          { id: 'ship', emoji: '🚢', label: 'Ship' },
          { id: 'aeroplane', emoji: '✈️', label: 'Aeroplane' },
        ],
        correctId: 'aeroplane',
      },
      {
        type: 'question',
        showEmoji: '🚁',
        options: [
          { id: 'aeroplane', emoji: '✈️', label: 'Aeroplane' },
          { id: 'helicopter', emoji: '🚁', label: 'Helicopter' },
          { id: 'sailboat', emoji: '⛵', label: 'Sailboat' },
        ],
        correctId: 'helicopter',
      },
      {
        type: 'question',
        showEmoji: '⛵',
        options: [
          { id: 'ship', emoji: '🚢', label: 'Ship' },
          { id: 'aeroplane', emoji: '✈️', label: 'Aeroplane' },
          { id: 'sailboat', emoji: '⛵', label: 'Sailboat' },
        ],
        correctId: 'sailboat',
      },
      {
        type: 'question',
        showEmoji: '🚢',
        options: [
          { id: 'sailboat', emoji: '⛵', label: 'Sailboat' },
          { id: 'helicopter', emoji: '🚁', label: 'Helicopter' },
          { id: 'ship', emoji: '🚢', label: 'Ship' },
        ],
        correctId: 'ship',
      },
      {
        type: 'reward',
        story: 'Awesome! Aeroplanes and helicopters fly! Ships and sailboats float!',
      },
    ],
  },
  'traffic-rules': {
    id: 'traffic-rules',
    rounds: [
      {
        type: 'story',
        story: 'Red means stop, green means go! Let us learn some traffic rules!',
      },
      {
        type: 'learn',
        showEmoji: '🚦 🚸 ⛔',
        labels: ['Traffic Light', 'Crosswalk', 'Stop'],
        story: 'Traffic Rules',
      },
      {
        type: 'question',
        showEmoji: '🚦',
        options: [
          { id: 'stop', emoji: '⛔', label: 'Stop' },
          { id: 'traffic-light', emoji: '🚦', label: 'Traffic Light' },
          { id: 'crosswalk', emoji: '🚸', label: 'Crosswalk' },
        ],
        correctId: 'traffic-light',
      },
      {
        type: 'question',
        showEmoji: '🚸',
        options: [
          { id: 'crosswalk', emoji: '🚸', label: 'Crosswalk' },
          { id: 'traffic-light', emoji: '🚦', label: 'Traffic Light' },
          { id: 'stop', emoji: '⛔', label: 'Stop' },
        ],
        correctId: 'crosswalk',
      },
      {
        type: 'question',
        showEmoji: '⛔',
        options: [
          { id: 'traffic-light', emoji: '🚦', label: 'Traffic Light' },
          { id: 'stop', emoji: '⛔', label: 'Stop' },
          { id: 'crosswalk', emoji: '🚸', label: 'Crosswalk' },
        ],
        correctId: 'stop',
      },
      {
        type: 'reward',
        story: 'Great! Traffic lights, crosswalks, and stop signs keep us safe!',
      },
    ],
  },
  'clean-habits': {
    id: 'clean-habits',
    rounds: [
      {
        type: 'story',
        story: 'Washing hands, brushing teeth, taking a bath — staying clean keeps us healthy!',
      },
      {
        type: 'learn',
        showEmoji: '🧼 🪥 🧴 ✋',
        labels: ['Soap', 'Toothbrush', 'Shampoo', 'Wash Hands'],
        story: 'Clean Habits',
      },
      {
        type: 'question',
        showEmoji: '🧼',
        options: [
          { id: 'soap', emoji: '🧼', label: 'Soap' },
          { id: 'shampoo', emoji: '🧴', label: 'Shampoo' },
          { id: 'toothbrush', emoji: '🪥', label: 'Toothbrush' },
        ],
        correctId: 'soap',
      },
      {
        type: 'question',
        showEmoji: '🪥',
        options: [
          { id: 'soap', emoji: '🧼', label: 'Soap' },
          { id: 'toothbrush', emoji: '🪥', label: 'Toothbrush' },
          { id: 'wash', emoji: '✋', label: 'Wash Hands' },
        ],
        correctId: 'toothbrush',
      },
      {
        type: 'question',
        showEmoji: '🧴',
        options: [
          { id: 'soap', emoji: '🧼', label: 'Soap' },
          { id: 'wash', emoji: '✋', label: 'Wash Hands' },
          { id: 'shampoo', emoji: '🧴', label: 'Shampoo' },
        ],
        correctId: 'shampoo',
      },
      {
        type: 'question',
        showEmoji: '✋',
        options: [
          { id: 'wash', emoji: '✋', label: 'Wash Hands' },
          { id: 'toothbrush', emoji: '🪥', label: 'Toothbrush' },
          { id: 'shampoo', emoji: '🧴', label: 'Shampoo' },
        ],
        correctId: 'wash',
      },
      {
        type: 'reward',
        story: 'Super clean! Soap, toothbrush, shampoo — keep yourself fresh!',
      },
    ],
  },
  'healthy-food': {
    id: 'healthy-food',
    rounds: [
      {
        type: 'story',
        story: 'Apples, carrots, milk, and bread — healthy food makes us strong!',
      },
      {
        type: 'learn',
        showEmoji: '🍎 🥕 🥛 🍞',
        labels: ['Apple', 'Carrot', 'Milk', 'Bread'],
        story: 'Healthy Food',
      },
      {
        type: 'question',
        showEmoji: '🍎',
        options: [
          { id: 'milk', emoji: '🥛', label: 'Milk' },
          { id: 'apple', emoji: '🍎', label: 'Apple' },
          { id: 'carrot', emoji: '🥕', label: 'Carrot' },
        ],
        correctId: 'apple',
      },
      {
        type: 'question',
        showEmoji: '🥕',
        options: [
          { id: 'apple', emoji: '🍎', label: 'Apple' },
          { id: 'bread', emoji: '🍞', label: 'Bread' },
          { id: 'carrot', emoji: '🥕', label: 'Carrot' },
        ],
        correctId: 'carrot',
      },
      {
        type: 'question',
        showEmoji: '🥛',
        options: [
          { id: 'milk', emoji: '🥛', label: 'Milk' },
          { id: 'carrot', emoji: '🥕', label: 'Carrot' },
          { id: 'apple', emoji: '🍎', label: 'Apple' },
        ],
        correctId: 'milk',
      },
      {
        type: 'question',
        showEmoji: '🍞',
        options: [
          { id: 'carrot', emoji: '🥕', label: 'Carrot' },
          { id: 'bread', emoji: '🍞', label: 'Bread' },
          { id: 'milk', emoji: '🥛', label: 'Milk' },
        ],
        correctId: 'bread',
      },
      {
        type: 'reward',
        story: 'Yummy and healthy! Apples, carrots, milk, bread — eat well grow well!',
      },
    ],
  },
  'daily-routine': {
    id: 'daily-routine',
    rounds: [
      {
        type: 'story',
        story: 'Wake up, eat, play, and sleep — a happy daily routine!',
      },
      {
        type: 'learn',
        showEmoji: '🌅 🍚 ☀️ 🌙',
        labels: ['Wake Up', 'Eat', 'Play', 'Sleep'],
        story: 'Daily Routine',
      },
      {
        type: 'question',
        showEmoji: '🌅',
        options: [
          { id: 'play', emoji: '☀️', label: 'Play' },
          { id: 'sleep', emoji: '🌙', label: 'Sleep' },
          { id: 'wake', emoji: '🌅', label: 'Wake Up' },
        ],
        correctId: 'wake',
      },
      {
        type: 'question',
        showEmoji: '🍚',
        options: [
          { id: 'wake', emoji: '🌅', label: 'Wake Up' },
          { id: 'eat', emoji: '🍚', label: 'Eat' },
          { id: 'play', emoji: '☀️', label: 'Play' },
        ],
        correctId: 'eat',
      },
      {
        type: 'question',
        showEmoji: '☀️',
        options: [
          { id: 'sleep', emoji: '🌙', label: 'Sleep' },
          { id: 'play', emoji: '☀️', label: 'Play' },
          { id: 'eat', emoji: '🍚', label: 'Eat' },
        ],
        correctId: 'play',
      },
      {
        type: 'question',
        showEmoji: '🌙',
        options: [
          { id: 'play', emoji: '☀️', label: 'Play' },
          { id: 'wake', emoji: '🌅', label: 'Wake Up' },
          { id: 'sleep', emoji: '🌙', label: 'Sleep' },
        ],
        correctId: 'sleep',
      },
      {
        type: 'reward',
        story: 'Amazing! Wake, eat, play, sleep — a perfect daily routine!',
      },
    ],
  },
  // ══════════════════════════════════════════════════════════════════
  // CHAPTER 1: Animal World 🐾
  // ══════════════════════════════════════════════════════════════════
  'gk-animal-names': {
    id: 'gk-animal-names',
    rounds: [
      {
        type: 'story',
        story: 'Dogs, cats, elephants, lions — animals are amazing!',
      },
      {
        type: 'learn',
        showEmoji: '🐶 🐱 🐘 🦁',
        labels: ['Dog', 'Cat', 'Elephant', 'Lion'],
        story: 'Animal Names',
      },
      {
        type: 'learn',
        showEmoji: '🐒 🐰 🐄 🐯',
        labels: ['Monkey', 'Rabbit', 'Cow', 'Tiger'],
        story: 'More Animals',
      },
      {
        type: 'question',
        showEmoji: '🗣️',
        question: 'Which animal says BOW WOW?',
        options: [
          { id: 'dog', emoji: '🐕', label: 'Dog' },
          { id: 'cat', emoji: '🐱', label: 'Cat' },
          { id: 'lion', emoji: '🦁', label: 'Lion' },
        ],
        correctId: 'dog',
      },
      {
        type: 'question',
        showEmoji: '🌊',
        question: 'Which animal has a long TRUNK?',
        options: [
          { id: 'elephant', emoji: '🐘', label: 'Elephant' },
          { id: 'tiger', emoji: '🐯', label: 'Tiger' },
          { id: 'monkey', emoji: '🐒', label: 'Monkey' },
        ],
        correctId: 'elephant',
      },
      {
        type: 'question',
        showEmoji: '👑',
        question: 'Which is the KING of the jungle?',
        options: [
          { id: 'lion', emoji: '🦁', label: 'Lion' },
          { id: 'tiger', emoji: '🐯', label: 'Tiger' },
          { id: 'rabbit', emoji: '🐰', label: 'Rabbit' },
        ],
        correctId: 'lion',
      },
      {
        type: 'question',
        showEmoji: '🥕',
        question: 'Which animal loves CARROTS?',
        options: [
          { id: 'rabbit', emoji: '🐰', label: 'Rabbit' },
          { id: 'cow', emoji: '🐄', label: 'Cow' },
          { id: 'monkey', emoji: '🐒', label: 'Monkey' },
        ],
        correctId: 'rabbit',
      },
      {
        type: 'reward',
        story: 'Roar! You know so many animals!',
      },
    ],
  },
  'gk-birds-insects': {
    id: 'gk-birds-insects',
    rounds: [
      {
        type: 'story',
        story: 'Birds fly high, butterflies flutter, bees buzz!',
      },
      {
        type: 'learn',
        showEmoji: '🐦 🦋 🐝',
        labels: ['Bird', 'Butterfly', 'Bee'],
        story: 'Birds & Insects',
      },
      {
        type: 'learn',
        showEmoji: '🐓 🦜 🐜',
        labels: ['Hen', 'Parrot', 'Ant'],
        story: 'More',
      },
      {
        type: 'question',
        showEmoji: '🪶',
        question: 'Which one can FLY?',
        options: [
          { id: 'bird', emoji: '🐦', label: 'Bird' },
          { id: 'hen', emoji: '🐓', label: 'Hen' },
          { id: 'ant', emoji: '🐜', label: 'Ant' },
        ],
        correctId: 'bird',
      },
      {
        type: 'question',
        showEmoji: '🌸',
        question: 'Which insect has colourful WINGS?',
        options: [
          { id: 'butterfly', emoji: '🦋', label: 'Butterfly' },
          { id: 'bee', emoji: '🐝', label: 'Bee' },
          { id: 'parrot', emoji: '🦜', label: 'Parrot' },
        ],
        correctId: 'butterfly',
      },
      {
        type: 'question',
        showEmoji: '🍯',
        question: 'Which insect makes HONEY?',
        options: [
          { id: 'bee', emoji: '🐝', label: 'Bee' },
          { id: 'butterfly', emoji: '🦋', label: 'Butterfly' },
          { id: 'ant', emoji: '🐜', label: 'Ant' },
        ],
        correctId: 'bee',
      },
      {
        type: 'reward',
        story: 'Wonderful! Birds, butterflies, bees, and more — nature is full of life!',
      },
    ],
  },
  'gk-basic-colors': {
    id: 'gk-basic-colors',
    rounds: [
      {
        type: 'story',
        story: 'Red, blue, yellow, green — colors make the world beautiful!',
      },
      {
        type: 'learn',
        showEmoji: '🔴 🔵 🟡 🟢',
        labels: ['Red', 'Blue', 'Yellow', 'Green'],
        story: 'Basic Colors',
      },
      {
        type: 'question',
        showEmoji: '🔴',
        options: [
          { id: 'blue', emoji: '🔵', label: 'Blue' },
          { id: 'red', emoji: '🔴', label: 'Red' },
          { id: 'yellow', emoji: '🟡', label: 'Yellow' },
        ],
        correctId: 'red',
      },
      {
        type: 'question',
        showEmoji: '🔵',
        options: [
          { id: 'blue', emoji: '🔵', label: 'Blue' },
          { id: 'green', emoji: '🟢', label: 'Green' },
          { id: 'red', emoji: '🔴', label: 'Red' },
        ],
        correctId: 'blue',
      },
      {
        type: 'question',
        showEmoji: '🟡',
        options: [
          { id: 'red', emoji: '🔴', label: 'Red' },
          { id: 'green', emoji: '🟢', label: 'Green' },
          { id: 'yellow', emoji: '🟡', label: 'Yellow' },
        ],
        correctId: 'yellow',
      },
      {
        type: 'question',
        showEmoji: '🟢',
        options: [
          { id: 'yellow', emoji: '🟡', label: 'Yellow' },
          { id: 'blue', emoji: '🔵', label: 'Blue' },
          { id: 'green', emoji: '🟢', label: 'Green' },
        ],
        correctId: 'green',
      },
      {
        type: 'reward',
        story: 'Colorful! Red, blue, yellow, green — you know them all!',
      },
    ],
  },
  'gk-color-match': {
    id: 'gk-color-match',
    rounds: [
      {
        type: 'story',
        story: 'Bananas are yellow, apples are red! Let us match objects to their colors!',
      },
      {
        type: 'learn',
        showEmoji: '🍌 🍎 🌿 💧',
        labels: ['Yellow', 'Red', 'Green', 'Blue'],
        story: 'Color Match',
      },
      {
        type: 'question',
        showEmoji: '🍌',
        options: [
          { id: 'green', emoji: '🟢', label: 'Green' },
          { id: 'yellow', emoji: '🟡', label: 'Yellow' },
          { id: 'red', emoji: '🔴', label: 'Red' },
        ],
        correctId: 'yellow',
      },
      {
        type: 'question',
        showEmoji: '🍎',
        options: [
          { id: 'red', emoji: '🔴', label: 'Red' },
          { id: 'blue', emoji: '🔵', label: 'Blue' },
          { id: 'yellow', emoji: '🟡', label: 'Yellow' },
        ],
        correctId: 'red',
      },
      {
        type: 'question',
        showEmoji: '🌿',
        options: [
          { id: 'yellow', emoji: '🟡', label: 'Yellow' },
          { id: 'blue', emoji: '🔵', label: 'Blue' },
          { id: 'green', emoji: '🟢', label: 'Green' },
        ],
        correctId: 'green',
      },
      {
        type: 'question',
        showEmoji: '💧',
        options: [
          { id: 'green', emoji: '🟢', label: 'Green' },
          { id: 'blue', emoji: '🔵', label: 'Blue' },
          { id: 'red', emoji: '🔴', label: 'Red' },
        ],
        correctId: 'blue',
      },
      {
        type: 'reward',
        story: 'Super matching! Bananas yellow, apples red, leaves green, water blue!',
      },
    ],
  },
  'gk-places': {
    id: 'gk-places',
    rounds: [
      {
        type: 'story',
        story: 'Home, school, hospital, shop — we go to so many places!',
      },
      {
        type: 'learn',
        showEmoji: '🏠 🏫 🏥 🛒',
        labels: ['Home', 'School', 'Hospital', 'Shop'],
        story: 'Places Around Us',
      },
      {
        type: 'question',
        showEmoji: '🏠',
        options: [
          { id: 'school', emoji: '🏫', label: 'School' },
          { id: 'home', emoji: '🏠', label: 'Home' },
          { id: 'shop', emoji: '🛒', label: 'Shop' },
        ],
        correctId: 'home',
      },
      {
        type: 'question',
        showEmoji: '🏫',
        options: [
          { id: 'home', emoji: '🏠', label: 'Home' },
          { id: 'hospital', emoji: '🏥', label: 'Hospital' },
          { id: 'school', emoji: '🏫', label: 'School' },
        ],
        correctId: 'school',
      },
      {
        type: 'question',
        showEmoji: '🏥',
        options: [
          { id: 'hospital', emoji: '🏥', label: 'Hospital' },
          { id: 'shop', emoji: '🛒', label: 'Shop' },
          { id: 'school', emoji: '🏫', label: 'School' },
        ],
        correctId: 'hospital',
      },
      {
        type: 'reward',
        story: 'Amazing! Home, school, hospital, shop — you know all the places!',
      },
    ],
  },
  'gk-community-helpers': {
    id: 'gk-community-helpers',
    rounds: [
      {
        type: 'story',
        story: 'Teachers, doctors, police, firefighters — they help us every day!',
      },
      {
        type: 'learn',
        showEmoji: '👩‍🏫 👨‍⚕️ 👮 👨‍🚒',
        labels: ['Teacher', 'Doctor', 'Police', 'Firefighter'],
        story: 'Community Helpers',
      },
      {
        type: 'question',
        showEmoji: '👨‍⚕️',
        options: [
          { id: 'teacher', emoji: '👩‍🏫', label: 'Teacher' },
          { id: 'police', emoji: '👮', label: 'Police' },
          { id: 'doctor', emoji: '👨‍⚕️', label: 'Doctor' },
        ],
        correctId: 'doctor',
      },
      {
        type: 'question',
        showEmoji: '👩‍🏫',
        options: [
          { id: 'police', emoji: '👮', label: 'Police' },
          { id: 'firefighter', emoji: '👨‍🚒', label: 'Firefighter' },
          { id: 'teacher', emoji: '👩‍🏫', label: 'Teacher' },
        ],
        correctId: 'teacher',
      },
      {
        type: 'question',
        showEmoji: '👨‍🚒',
        options: [
          { id: 'doctor', emoji: '👨‍⚕️', label: 'Doctor' },
          { id: 'police', emoji: '👮', label: 'Police' },
          { id: 'firefighter', emoji: '👨‍🚒', label: 'Firefighter' },
        ],
        correctId: 'firefighter',
      },
      {
        type: 'reward',
        story: 'Heroes! Teachers, doctors, police, firefighters help us every day!',
      },
    ],
  },
  'gk-transport': {
    id: 'gk-transport',
    rounds: [
      {
        type: 'story',
        story: 'Cars, buses, cycles, aeroplanes, ships — so many ways to travel!',
      },
      {
        type: 'learn',
        showEmoji: '🚗 🚌 🚲 ✈️ 🚢',
        labels: ['Car', 'Bus', 'Cycle', 'Aeroplane', 'Ship'],
        story: 'Transport',
      },
      {
        type: 'question',
        showEmoji: '🚗',
        options: [
          { id: 'bus', emoji: '🚌', label: 'Bus' },
          { id: 'car', emoji: '🚗', label: 'Car' },
          { id: 'cycle', emoji: '🚲', label: 'Cycle' },
        ],
        correctId: 'car',
      },
      {
        type: 'question',
        showEmoji: '🚌',
        options: [
          { id: 'car', emoji: '🚗', label: 'Car' },
          { id: 'ship', emoji: '🚢', label: 'Ship' },
          { id: 'bus', emoji: '🚌', label: 'Bus' },
        ],
        correctId: 'bus',
      },
      {
        type: 'question',
        showEmoji: '✈️',
        options: [
          { id: 'cycle', emoji: '🚲', label: 'Cycle' },
          { id: 'aeroplane', emoji: '✈️', label: 'Aeroplane' },
          { id: 'car', emoji: '🚗', label: 'Car' },
        ],
        correctId: 'aeroplane',
      },
      {
        type: 'reward',
        story: 'Vroom vroom! Cars, buses, cycles, planes, ships — you know them all!',
      },
    ],
  },
  'gk-vehicles-around-us': {
    id: 'gk-vehicles-around-us',
    rounds: [
      {
        type: 'story',
        story: 'Some go on land, some fly in the sky, some sail on water!',
      },
      {
        type: 'learn',
        showEmoji: '🚗 ✈️ 🚢',
        labels: ['Land: Car', 'Air: Aeroplane', 'Water: Ship'],
        story: 'Land / Air / Water',
      },
      {
        type: 'question',
        showEmoji: '🚗',
        options: [
          { id: 'air', emoji: '✈️', label: 'Air' },
          { id: 'water', emoji: '🚢', label: 'Water' },
          { id: 'land', emoji: '🚗', label: 'Land' },
        ],
        correctId: 'land',
      },
      {
        type: 'question',
        showEmoji: '✈️',
        options: [
          { id: 'land', emoji: '🚗', label: 'Land' },
          { id: 'air', emoji: '✈️', label: 'Air' },
          { id: 'water', emoji: '🚢', label: 'Water' },
        ],
        correctId: 'air',
      },
      {
        type: 'question',
        showEmoji: '🚢',
        options: [
          { id: 'water', emoji: '🚢', label: 'Water' },
          { id: 'air', emoji: '✈️', label: 'Air' },
          { id: 'land', emoji: '🚗', label: 'Land' },
        ],
        correctId: 'water',
      },
      {
        type: 'reward',
        story: 'Amazing! Cars on land, planes in the sky, ships on water!',
      },
    ],
  },
  'gk-sky-objects': {
    id: 'gk-sky-objects',
    rounds: [
      {
        type: 'story',
        story: 'Sun shines in the day, moon and stars shine at night!',
      },
      {
        type: 'learn',
        showEmoji: '☀️ 🌙 ⭐ ☁️',
        labels: ['Sun', 'Moon', 'Stars', 'Cloud'],
        story: 'Sky World',
      },
      {
        type: 'question',
        showEmoji: '☀️',
        options: [
          { id: 'moon', emoji: '🌙', label: 'Moon' },
          { id: 'cloud', emoji: '☁️', label: 'Cloud' },
          { id: 'sun', emoji: '☀️', label: 'Sun' },
        ],
        correctId: 'sun',
      },
      {
        type: 'question',
        showEmoji: '🌙',
        options: [
          { id: 'stars', emoji: '⭐', label: 'Stars' },
          { id: 'sun', emoji: '☀️', label: 'Sun' },
          { id: 'moon', emoji: '🌙', label: 'Moon' },
        ],
        correctId: 'moon',
      },
      {
        type: 'question',
        showEmoji: '⭐',
        options: [
          { id: 'moon', emoji: '🌙', label: 'Moon' },
          { id: 'cloud', emoji: '☁️', label: 'Cloud' },
          { id: 'stars', emoji: '⭐', label: 'Stars' },
        ],
        correctId: 'stars',
      },
      {
        type: 'reward',
        story: 'Twinkle twinkle! Sun, moon, stars, and clouds in the sky!',
      },
    ],
  },
  'gk-weather': {
    id: 'gk-weather',
    rounds: [
      {
        type: 'story',
        story: 'Sunny, rainy, cloudy — what is the weather today?',
      },
      {
        type: 'learn',
        showEmoji: '☀️ 🌧️ ☁️',
        labels: ['Sunny', 'Rainy', 'Cloudy'],
        story: 'Weather',
      },
      {
        type: 'question',
        showEmoji: '☀️',
        options: [
          { id: 'rainy', emoji: '🌧️', label: 'Rainy' },
          { id: 'cloudy', emoji: '☁️', label: 'Cloudy' },
          { id: 'sunny', emoji: '☀️', label: 'Sunny' },
        ],
        correctId: 'sunny',
      },
      {
        type: 'question',
        showEmoji: '🌧️',
        options: [
          { id: 'cloudy', emoji: '☁️', label: 'Cloudy' },
          { id: 'sunny', emoji: '☀️', label: 'Sunny' },
          { id: 'rainy', emoji: '🌧️', label: 'Rainy' },
        ],
        correctId: 'rainy',
      },
      {
        type: 'question',
        showEmoji: '☁️',
        options: [
          { id: 'sunny', emoji: '☀️', label: 'Sunny' },
          { id: 'rainy', emoji: '🌧️', label: 'Rainy' },
          { id: 'cloudy', emoji: '☁️', label: 'Cloudy' },
        ],
        correctId: 'cloudy',
      },
      {
        type: 'reward',
        story: 'Weather wise! Sunny, rainy, cloudy — you know the weather!',
      },
    ],
  },
  'gk-clean-habits': {
    id: 'gk-clean-habits',
    rounds: [
      {
        type: 'story',
        story: 'Brush your teeth, wash your hands, keep clean — good habits!',
      },
      {
        type: 'learn',
        showEmoji: '🪥 🧼 🧹',
        labels: ['Brush Teeth', 'Wash Hands', 'Keep Clean'],
        story: 'Clean Habits',
      },
      {
        type: 'question',
        showEmoji: '🪥',
        options: [
          { id: 'wash', emoji: '🧼', label: 'Wash Hands' },
          { id: 'clean', emoji: '🧹', label: 'Keep Clean' },
          { id: 'brush', emoji: '🪥', label: 'Brush Teeth' },
        ],
        correctId: 'brush',
      },
      {
        type: 'question',
        showEmoji: '🧼',
        options: [
          { id: 'clean', emoji: '🧹', label: 'Keep Clean' },
          { id: 'brush', emoji: '🪥', label: 'Brush Teeth' },
          { id: 'wash', emoji: '🧼', label: 'Wash Hands' },
        ],
        correctId: 'wash',
      },
      {
        type: 'question',
        showEmoji: '🧹',
        options: [
          { id: 'brush', emoji: '🪥', label: 'Brush Teeth' },
          { id: 'wash', emoji: '🧼', label: 'Wash Hands' },
          { id: 'clean', emoji: '🧹', label: 'Keep Clean' },
        ],
        correctId: 'clean',
      },
      {
        type: 'reward',
        story: 'Squeaky clean! Brush, wash, keep clean — good habits!',
      },
    ],
  },
  'gk-good-manners': {
    id: 'gk-good-manners',
    rounds: [
      {
        type: 'story',
        story: 'Please, thank you, sorry — good manners make everyone happy!',
      },
      {
        type: 'learn',
        showEmoji: '🙏 😊 😔',
        labels: ['Please', 'Thank You', 'Sorry'],
        story: 'Good Manners',
      },
      {
        type: 'question',
        showEmoji: '🙏',
        options: [
          { id: 'sorry', emoji: '😔', label: 'Sorry' },
          { id: 'please', emoji: '🙏', label: 'Please' },
          { id: 'thanks', emoji: '😊', label: 'Thank You' },
        ],
        correctId: 'please',
      },
      {
        type: 'question',
        showEmoji: '😊',
        options: [
          { id: 'please', emoji: '🙏', label: 'Please' },
          { id: 'thanks', emoji: '😊', label: 'Thank You' },
          { id: 'sorry', emoji: '😔', label: 'Sorry' },
        ],
        correctId: 'thanks',
      },
      {
        type: 'question',
        showEmoji: '😔',
        options: [
          { id: 'sorry', emoji: '😔', label: 'Sorry' },
          { id: 'please', emoji: '🙏', label: 'Please' },
          { id: 'thanks', emoji: '😊', label: 'Thank You' },
        ],
        correctId: 'sorry',
      },
      {
        type: 'reward',
        story: 'Polite and kind! Please, thank you, sorry — good manners!',
      },
    ],
  },
  // ══════════════════════════════════════════════════════════════════
  // LEGACY GK LESSONS (old DB seed only)
  // ══════════════════════════════════════════════════════════════════
  'gk-my-name-identity': {
    id: 'gk-my-name-identity',
    rounds: [
      {
        type: 'story',
        story: "Every child is special! Let's learn about you — your name, age, and more!",
      },
      {
        type: 'learn',
        showEmoji: '🙋 🎂 👦👧 🏫',
        labels: ['My Name', 'My Age', 'Boy/Girl', 'My School'],
        story: 'All About Me',
      },
      {
        type: 'learn',
        showEmoji: '🙂 🎨 🍎 👀',
        labels: ['About Me', 'Colours', 'Fruits', 'My Body'],
        story: 'More About Me',
      },
      {
        type: 'question',
        showEmoji: '🙋',
        question: 'What is your name?',
        options: [
          { id: 'yourname', emoji: '🧒', label: 'Your Name' },
          { id: 'pet', emoji: '🐕', label: 'Pet' },
          { id: 'flower', emoji: '🌸', label: 'Flower' },
        ],
        correctId: 'yourname',
      },
      {
        type: 'question',
        showEmoji: '🎂',
        question: 'How old are you?',
        options: [
          { id: 'three', emoji: '3️⃣', label: '3-4 Years' },
          { id: 'one', emoji: '👶', label: '1 Year' },
          { id: 'ten', emoji: '🧑', label: '10 Years' },
        ],
        correctId: 'three',
      },
      {
        type: 'question',
        showEmoji: '👦',
        question: 'Who is a boy?',
        options: [
          { id: 'boy', emoji: '👦', label: 'Boy' },
          { id: 'girl', emoji: '👧', label: 'Girl' },
          { id: 'baby', emoji: '👶', label: 'Baby' },
        ],
        correctId: 'boy',
      },
      {
        type: 'question',
        showEmoji: '🏫',
        question: 'Where do you learn?',
        options: [
          { id: 'school', emoji: '🏫', label: 'School' },
          { id: 'home', emoji: '🏠', label: 'Home' },
          { id: 'shop', emoji: '🛒', label: 'Shop' },
        ],
        correctId: 'school',
      },
      {
        type: 'question',
        showEmoji: '🙂',
        question: 'I have two...',
        options: [
          { id: 'eyes', emoji: '👀', label: 'Eyes' },
          { id: 'ears', emoji: '👂', label: 'Ears' },
          { id: 'nose', emoji: '👃', label: 'Nose' },
        ],
        correctId: 'eyes',
      },
      {
        type: 'question',
        showEmoji: '🎨',
        question: 'Sky is which colour?',
        options: [
          { id: 'red', emoji: '🔴', label: 'Red' },
          { id: 'blue', emoji: '🔵', label: 'Blue' },
          { id: 'green', emoji: '🟢', label: 'Green' },
        ],
        correctId: 'blue',
      },
      {
        type: 'question',
        showEmoji: '🍎',
        question: 'Which fruit is red?',
        options: [
          { id: 'apple', emoji: '🍎', label: 'Apple' },
          { id: 'banana', emoji: '🍌', label: 'Banana' },
          { id: 'grapes', emoji: '🍇', label: 'Grapes' },
        ],
        correctId: 'apple',
      },
      {
        type: 'reward',
        story: 'Amazing! You know your name, age, school, and so much more!',
      },
    ],
  },
  'gk-my-daily-routine': {
    id: 'gk-my-daily-routine',
    rounds: [
      {
        type: 'story',
        story: 'Morning, afternoon, night — every day has a routine!',
      },
      {
        type: 'learn',
        showEmoji: '🌅 ☀️ 🌙',
        labels: ['Morning', 'Afternoon', 'Night'],
        story: 'My Daily Routine',
      },
      {
        type: 'question',
        showEmoji: '🌅',
        options: [
          { id: 'morning', emoji: '🌅', label: 'Morning' },
          { id: 'afternoon', emoji: '☀️', label: 'Afternoon' },
          { id: 'night', emoji: '🌙', label: 'Night' },
        ],
        correctId: 'morning',
      },
      {
        type: 'question',
        showEmoji: '🌙',
        options: [
          { id: 'morning', emoji: '🌅', label: 'Morning' },
          { id: 'afternoon', emoji: '☀️', label: 'Afternoon' },
          { id: 'night', emoji: '🌙', label: 'Night' },
        ],
        correctId: 'night',
      },
      {
        type: 'reward',
        story: 'Wake up, play, sleep — a perfect daily routine!',
      },
    ],
  },
  'gk-road-safety': {
    id: 'gk-road-safety',
    rounds: [
      {
        type: 'story',
        story: 'Red means stop, green means go — stay safe on the road!',
      },
      {
        type: 'learn',
        showEmoji: '🛑 🟢 🟡',
        labels: ['Stop', 'Go', 'Wait'],
        story: 'Road Safety',
      },
      {
        type: 'question',
        showEmoji: '🛑',
        options: [
          { id: 'stop', emoji: '🛑', label: 'Stop' },
          { id: 'go', emoji: '🟢', label: 'Go' },
          { id: 'run', emoji: '🏃', label: 'Run' },
        ],
        correctId: 'stop',
      },
      {
        type: 'question',
        showEmoji: '🟢',
        options: [
          { id: 'stop', emoji: '🛑', label: 'Stop' },
          { id: 'go', emoji: '🟢', label: 'Go' },
          { id: 'wait', emoji: '🟡', label: 'Wait' },
        ],
        correctId: 'go',
      },
      {
        type: 'reward',
        story: 'Red stop, green go — you know road safety!',
      },
    ],
  },
  'gk-festivals': {
    id: 'gk-festivals',
    rounds: [
      {
        type: 'story',
        story: 'Birthdays, Diwali, Christmas — festivals are fun to celebrate!',
      },
      {
        type: 'learn',
        showEmoji: '🎂 🪔 🎄',
        labels: ['Birthday', 'Diwali', 'Christmas'],
        story: 'Festivals',
      },
      {
        type: 'question',
        showEmoji: '🎄',
        options: [
          { id: 'birthday', emoji: '🎂', label: 'Birthday' },
          { id: 'diwali', emoji: '🪔', label: 'Diwali' },
          { id: 'christmas', emoji: '🎄', label: 'Christmas' },
        ],
        correctId: 'christmas',
      },
      {
        type: 'question',
        showEmoji: '🪔',
        options: [
          { id: 'christmas', emoji: '🎄', label: 'Christmas' },
          { id: 'diwali', emoji: '🪔', label: 'Diwali' },
          { id: 'birthday', emoji: '🎂', label: 'Birthday' },
        ],
        correctId: 'diwali',
      },
      {
        type: 'reward',
        story: 'Cake, lights, gifts — festivals bring joy!',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════
  // HINDI 🇮🇳
  // ══════════════════════════════════════════════════════════════════
  'hindi-swar-aa': {
    id: 'hindi-swar-aa',
    rounds: [
      { type: 'story', story: 'अ से अनार, आ से आम — Hindi vowels!' },
      {
        type: 'learn',
        showEmoji: 'अ आ',
        labels: ['अनार 🍎', 'आम 🥭'],
        story: 'स्वर अ और आ',
      },
      {
        type: 'question',
        showEmoji: 'अ',
        question: 'Which word starts with अ?',
        options: [
          { id: 'anar', emoji: '🍎', label: 'अनार' },
          { id: 'aam', emoji: '🥭', label: 'आम' },
          { id: 'imli', emoji: '🍈', label: 'इमली' },
        ],
        correctId: 'anar',
      },
      {
        type: 'question',
        showEmoji: 'आ',
        question: 'Which word starts with आ?',
        options: [
          { id: 'aam', emoji: '🥭', label: 'आम' },
          { id: 'anar', emoji: '🍎', label: 'अनार' },
          { id: 'ullu', emoji: '🦉', label: 'उल्लू' },
        ],
        correctId: 'aam',
      },
      { type: 'reward', story: 'Excellent! अ और आ सीख लिए!' },
    ],
  },
  'hindi-swar-ii-uu': {
    id: 'hindi-swar-ii-uu',
    rounds: [
      { type: 'story', story: 'इ से इमली, ऊ से ऊँट — more vowels!' },
      {
        type: 'learn',
        showEmoji: 'इ ई उ ऊ',
        labels: ['इमली 🍈', 'ईंट 🧱', 'उल्लू 🦉', 'ऊँट 🐪'],
        story: 'स्वर इ से ऊ',
      },
      {
        type: 'question',
        showEmoji: 'इ',
        question: 'Which word starts with इ?',
        options: [
          { id: 'imli', emoji: '🍈', label: 'इमली' },
          { id: 'eent', emoji: '🧱', label: 'ईंट' },
          { id: 'ullu', emoji: '🦉', label: 'उल्लू' },
        ],
        correctId: 'imli',
      },
      {
        type: 'question',
        showEmoji: 'उ',
        question: 'Which word starts with उ?',
        options: [
          { id: 'ullu', emoji: '🦉', label: 'उल्लू' },
          { id: 'imli', emoji: '🍈', label: 'इमली' },
          { id: 'oont', emoji: '🐪', label: 'ऊँट' },
        ],
        correctId: 'ullu',
      },
      {
        type: 'question',
        showEmoji: 'ऊ',
        question: 'Which word starts with ऊ?',
        options: [
          { id: 'oont', emoji: '🐪', label: 'ऊँट' },
          { id: 'ullu', emoji: '🦉', label: 'उल्लू' },
          { id: 'eent', emoji: '🧱', label: 'ईंट' },
        ],
        correctId: 'oont',
      },
      { type: 'reward', story: 'Shabash! इ से ऊ तक सीख गए!' },
    ],
  },
  'hindi-vyanjan-ka': {
    id: 'hindi-vyanjan-ka',
    rounds: [
      { type: 'story', story: 'क से कबूतर, ख से खरगोश, ग से गाय, घ से घर!' },
      {
        type: 'learn',
        showEmoji: 'क ख ग घ',
        labels: ['कबूतर 🕊️', 'खरगोश 🐇', 'गाय 🐄', 'घर 🏠'],
        story: 'क वर्ग',
      },
      {
        type: 'question',
        showEmoji: '🕊️',
        question: 'Which letter is for KABOOTAR (pigeon)?',
        options: [
          { id: 'ka', emoji: 'क', label: 'क कबूतर' },
          { id: 'kha', emoji: 'ख', label: 'ख खरगोश' },
          { id: 'ga', emoji: 'ग', label: 'ग गाय' },
        ],
        correctId: 'ka',
      },
      {
        type: 'question',
        showEmoji: '🐇',
        question: 'Which letter is for KHARGOSH (rabbit)?',
        options: [
          { id: 'kha', emoji: 'ख', label: 'ख खरगोश' },
          { id: 'ka', emoji: 'क', label: 'क कबूतर' },
          { id: 'gha', emoji: 'घ', label: 'घ घर' },
        ],
        correctId: 'kha',
      },
      {
        type: 'question',
        showEmoji: '🐄',
        question: 'Which letter is for GAAY (cow)?',
        options: [
          { id: 'ga', emoji: 'ग', label: 'ग गाय' },
          { id: 'ka', emoji: 'क', label: 'क कबूतर' },
          { id: 'gha', emoji: 'घ', label: 'घ घर' },
        ],
        correctId: 'ga',
      },
      { type: 'reward', story: 'बहुत अच्छे! क ख ग घ सीख गए!' },
    ],
  },
  'hindi-vyanjan-cha': {
    id: 'hindi-vyanjan-cha',
    rounds: [
      { type: 'story', story: 'च से चिड़िया, छ से छाता, ज से जहाज़!' },
      {
        type: 'learn',
        showEmoji: 'च छ ज',
        labels: ['चिड़िया 🐦', 'छाता 🌂', 'जहाज़ 🚢'],
        story: 'च वर्ग',
      },
      {
        type: 'question',
        showEmoji: '🐦',
        question: 'Which letter is for CHIDIYA (bird)?',
        options: [
          { id: 'cha', emoji: 'च', label: 'च चिड़िया' },
          { id: 'chha', emoji: 'छ', label: 'छ छाता' },
          { id: 'ja', emoji: 'ज', label: 'ज जहाज़' },
        ],
        correctId: 'cha',
      },
      {
        type: 'question',
        showEmoji: '🌂',
        question: 'Which letter is for CHHATA (umbrella)?',
        options: [
          { id: 'chha', emoji: 'छ', label: 'छ छाता' },
          { id: 'cha', emoji: 'च', label: 'च चिड़िया' },
          { id: 'ja', emoji: 'ज', label: 'ज जहाज़' },
        ],
        correctId: 'chha',
      },
      {
        type: 'question',
        showEmoji: '🚢',
        question: 'Which letter is for JAHAZ (ship)?',
        options: [
          { id: 'ja', emoji: 'ज', label: 'ज जहाज़' },
          { id: 'cha', emoji: 'च', label: 'च चिड़िया' },
          { id: 'chha', emoji: 'छ', label: 'छ छाता' },
        ],
        correctId: 'ja',
      },
      { type: 'reward', story: 'Wah! च छ ज सीख गए!' },
    ],
  },
  'hindi-simple-words-ghar': {
    id: 'hindi-simple-words-ghar',
    rounds: [
      { type: 'story', story: 'घर और फल — simple Hindi words!' },
      {
        type: 'learn',
        showEmoji: '🏠 🍎',
        labels: ['घर', 'फल'],
        story: 'घर और फल',
      },
      {
        type: 'question',
        showEmoji: '🏠',
        question: 'Which word means HOME?',
        options: [
          { id: 'ghar', emoji: '🏠', label: 'घर' },
          { id: 'phal', emoji: '🍎', label: 'फल' },
          { id: 'van', emoji: '🌲', label: 'वन' },
        ],
        correctId: 'ghar',
      },
      {
        type: 'question',
        showEmoji: '🍎',
        question: 'Which word means FRUIT?',
        options: [
          { id: 'phal', emoji: '🍎', label: 'फल' },
          { id: 'jal', emoji: '💧', label: 'जल' },
          { id: 'ghar', emoji: '🏠', label: 'घर' },
        ],
        correctId: 'phal',
      },
      { type: 'reward', story: 'Wah! घर और फल सीख लिए!' },
    ],
  },
  'hindi-simple-words-jal': {
    id: 'hindi-simple-words-jal',
    rounds: [
      { type: 'story', story: 'जल और वन — more simple Hindi words!' },
      {
        type: 'learn',
        showEmoji: '💧 🌲',
        labels: ['जल', 'वन'],
        story: 'जल और वन',
      },
      {
        type: 'question',
        showEmoji: '💧',
        question: 'Which word means WATER?',
        options: [
          { id: 'jal', emoji: '💧', label: 'जल' },
          { id: 'van', emoji: '🌲', label: 'वन' },
          { id: 'phal', emoji: '🍎', label: 'फल' },
        ],
        correctId: 'jal',
      },
      {
        type: 'question',
        showEmoji: '🌲',
        question: 'Which word means FOREST?',
        options: [
          { id: 'van', emoji: '🌲', label: 'वन' },
          { id: 'ghar', emoji: '🏠', label: 'घर' },
          { id: 'jal', emoji: '💧', label: 'जल' },
        ],
        correctId: 'van',
      },
      { type: 'reward', story: 'Shabash! जल और वन सीख लिए!' },
    ],
  },
  'hindi-bolna-namaste': {
    id: 'hindi-bolna-namaste',
    rounds: [
      { type: 'story', story: 'नमस्ते — let us learn to greet in Hindi!' },
      {
        type: 'learn',
        showEmoji: '🙏 🗣️',
        labels: ['नमस्ते', 'मेरा नाम...'],
        story: 'बोलना',
      },
      {
        type: 'question',
        showEmoji: '🙏',
        question: 'How do you say HELLO in Hindi?',
        options: [
          { id: 'namaste', emoji: '🙏', label: 'नमस्ते' },
          { id: 'mammi', emoji: '👩', label: 'मम्मी' },
          { id: 'papa', emoji: '👨', label: 'पापा' },
        ],
        correctId: 'namaste',
      },
      { type: 'reward', story: 'बहुत अच्छे! You can say नमस्ते!' },
    ],
  },
  'hindi-bolna-parivar': {
    id: 'hindi-bolna-parivar',
    rounds: [
      { type: 'story', story: 'मम्मी और पापा — family words in Hindi!' },
      {
        type: 'learn',
        showEmoji: '👩 👨',
        labels: ['मम्मी', 'पापा'],
        story: 'मेरा परिवार',
      },
      {
        type: 'question',
        showEmoji: '👩',
        question: 'Who is MAMMI?',
        options: [
          { id: 'mammi', emoji: '👩', label: 'मम्मी' },
          { id: 'papa', emoji: '👨', label: 'पापा' },
          { id: 'namaste', emoji: '🙏', label: 'नमस्ते' },
        ],
        correctId: 'mammi',
      },
      {
        type: 'question',
        showEmoji: '👨',
        question: 'Who is PAPA?',
        options: [
          { id: 'papa', emoji: '👨', label: 'पापा' },
          { id: 'mammi', emoji: '👩', label: 'मम्मी' },
          { id: 'dada', emoji: '👴', label: 'दादा' },
        ],
        correctId: 'papa',
      },
      { type: 'reward', story: 'Wah! मम्मी और पापा — you know your family!' },
    ],
  },
  'hindi-kavita-rhymes': {
    id: 'hindi-kavita-rhymes',
    rounds: [
      { type: 'story', story: 'कविताएँ — rhymes make learning fun!' },
      {
        type: 'learn',
        showEmoji: '🎵 📖',
        labels: ['कविताएँ (Rhymes)', 'कहानियाँ (Stories)'],
        story: 'कविताएँ',
      },
      {
        type: 'question',
        showEmoji: '🎵',
        question: 'What do we call a RHYME in Hindi?',
        options: [
          { id: 'kavita', emoji: '🎵', label: 'कविता' },
          { id: 'kahani', emoji: '📖', label: 'कहानी' },
          { id: 'shabd', emoji: '📝', label: 'शब्द' },
        ],
        correctId: 'kavita',
      },
      { type: 'reward', story: 'मज़ा आया! Rhymes are fun!' },
    ],
  },
  'hindi-kavita-stories': {
    id: 'hindi-kavita-stories',
    rounds: [
      { type: 'story', story: 'कहानियाँ — small moral stories!' },
      {
        type: 'learn',
        showEmoji: '📖',
        labels: ['कहानियाँ (Stories)'],
        story: 'छोटी कहानियाँ',
      },
      {
        type: 'question',
        showEmoji: '📖',
        question: 'What do we call a STORY in Hindi?',
        options: [
          { id: 'kahani', emoji: '📖', label: 'कहानी' },
          { id: 'kavita', emoji: '🎵', label: 'कविता' },
          { id: 'shabd', emoji: '📝', label: 'शब्द' },
        ],
        correctId: 'kahani',
      },
      { type: 'reward', story: 'बहुत खूब! Stories are fun to read!' },
    ],
  },
  'hindi-pictures-animals': {
    id: 'hindi-pictures-animals',
    rounds: [
      { type: 'story', story: 'Picture देखो और जानवर पहचानो!' },
      {
        type: 'learn',
        showEmoji: '🐘 🐱 🌸',
        labels: ['हाथी', 'बिल्ली', 'फूल'],
        story: 'जानवर पहचान',
      },
      {
        type: 'question',
        showEmoji: '🐘',
        question: 'यह कौन है? (Who is this?)',
        options: [
          { id: 'hathi', emoji: '🐘', label: 'हाथी' },
          { id: 'billi', emoji: '🐱', label: 'बिल्ली' },
          { id: 'phool', emoji: '🌸', label: 'फूल' },
        ],
        correctId: 'hathi',
      },
      {
        type: 'question',
        showEmoji: '🐱',
        question: 'यह कौन है? (Who is this?)',
        options: [
          { id: 'billi', emoji: '🐱', label: 'बिल्ली' },
          { id: 'hathi', emoji: '🐘', label: 'हाथी' },
          { id: 'kutta', emoji: '🐕', label: 'कुत्ता' },
        ],
        correctId: 'billi',
      },
      { type: 'reward', story: 'बहुत खूब! You know animals in Hindi!' },
    ],
  },
  'hindi-pictures-things': {
    id: 'hindi-pictures-things',
    rounds: [
      { type: 'story', story: 'आस-पास की चीज़ें पहचानो!' },
      {
        type: 'learn',
        showEmoji: '🚗 🌳',
        labels: ['गाड़ी', 'पेड़'],
        story: 'चीज़ें पहचान',
      },
      {
        type: 'question',
        showEmoji: '🚗',
        question: 'यह क्या है? (What is this?)',
        options: [
          { id: 'gadi', emoji: '🚗', label: 'गाड़ी' },
          { id: 'ghar', emoji: '🏠', label: 'घर' },
          { id: 'ped', emoji: '🌳', label: 'पेड़' },
        ],
        correctId: 'gadi',
      },
      {
        type: 'question',
        showEmoji: '🌳',
        question: 'यह क्या है? (What is this?)',
        options: [
          { id: 'ped', emoji: '🌳', label: 'पेड़' },
          { id: 'phool', emoji: '🌸', label: 'फूल' },
          { id: 'gadi', emoji: '🚗', label: 'गाड़ी' },
        ],
        correctId: 'ped',
      },
      { type: 'reward', story: 'Wah! Everything in Hindi!' },
    ],
  },
};

type Props = {
  conceptKey: string;
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
  childName?: string;
};

const shuffleArray = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const getEvsConceptImage = (key: string) => {
  const k = key ? key.toLowerCase() : '';
  if (k.includes('body') || k.includes('sense') || k.includes('habit') || k.includes('routine') || k.includes('manner') || k.includes('identity')) {
    return '/assets/quiz/evs-body-senses.png';
  }
  if (k.includes('animal') || k.includes('plant') || k.includes('nature') || k.includes('season') || k.includes('sky') || k.includes('weather') || k.includes('color') || k.includes('bird')) {
    return '/assets/quiz/evs-animals-nature.png';
  }
  return '/assets/quiz/evs-family-home-transport.png';
};

const getFamilyAvatar = (emoji: string) => {
  switch (emoji.trim()) {
    case '👩': return '/assets/quiz/family-mother.png';
    case '👨': return '/assets/quiz/family-father.png';
    case '👧': return '/assets/quiz/family-sister.png';
    case '👦': return '/assets/quiz/family-brother.png';
    case '👵': return '/assets/quiz/family-grandma.png';
    case '👴': return '/assets/quiz/family-grandpa.png';
    default: return null;
  }
};

const getDynamicQuestion = (round: any) => {
  if (round.question) return round.question;
  
  const target = round.correctId ? round.correctId.toLowerCase() : '';
  const emoji = round.showEmoji || '';

  // Body parts
  if (target === 'eyes') return `Which face part do we use to see? ${emoji}`;
  if (target === 'nose') return `Which face part do we use to smell? ${emoji}`;
  if (target === 'ears') return `Which face part do we use to hear sounds? ${emoji}`;
  if (target === 'mouth') return `Which face part do we use to speak and eat? ${emoji}`;
  if (target === 'hands') return `Which body part do we use to clap and write? ${emoji}`;
  if (target === 'legs') return `Which body part do we use to walk and run? ${emoji}`;
  if (target === 'feet') return `Which body part is inside our shoes? ${emoji}`;

  // Five Senses
  if (target === 'sight') return `Which sense is used to look at things? ${emoji}`;
  if (target === 'hearing') return `Which sense is used to listen to sounds? ${emoji}`;
  if (target === 'smell') return `Which sense is used to sniff? ${emoji}`;
  if (target === 'taste') return `Which sense is used to enjoy ice cream? ${emoji}`;
  if (target === 'touch') return `Which sense is used to feel things? ${emoji}`;

  // Keeping Clean / Healthy habits
  if (target === 'toothbrush') return `What do we use to brush our teeth? ${emoji}`;
  if (target === 'soap') return `What do we use to wash our hands clean? ${emoji}`;
  if (target === 'bathtub') return `Where do we take a nice splash bath? ${emoji}`;
  if (target === 'twice') return `How many times should we brush our teeth? ${emoji}`;
  if (target === 'sleep') return `What should we do when we are tired? ${emoji}`;

  // Family members
  if (target === 'mother') return `Can you find Mother? 👩`;
  if (target === 'father') return `Can you find Father? 👨`;
  if (target === 'sister') return `Can you find Sister? 👧`;
  if (target === 'brother') return `Can you find Brother? 👦`;
  if (target === 'grandma') return `Can you find Grandmother? 👵`;
  if (target === 'grandpa') return `Can you find Grandfather? 👴`;

  // Rooms in home
  if (target === 'bedroom') return `Which room is used for sleeping? ${emoji}`;
  if (target === 'kitchen') return `Which room is used for cooking? ${emoji}`;
  if (target === 'livingroom') return `Which room has the sofa to relax? ${emoji}`;
  if (target === 'bathroom') return `Which room has the shower? ${emoji}`;
  if (target === 'diningroom') return `Which room has the table for meals? ${emoji}`;

  // Animal categories / homes
  if (target === 'pet') return `Is this animal a PET or WILD? ${emoji}`;
  if (target === 'wild') return `Is this animal a PET or WILD? ${emoji}`;
  if (target === 'nest') return `Where does the little bird live? ${emoji}`;
  if (target === 'water') return `Where does the fish swim and live? ${emoji}`;
  if (target === 'dhouse') return `Where does the dog live? ${emoji}`;
  if (target === 'hole') return `Where does the rabbit live? ${emoji}`;
  if (target === 'cave') return `Where does the lion live? ${emoji}`;
  if (target === 'hive') return `Where does the bee live? ${emoji}`;

  // Plant parts
  if (target === 'roots') return `Which part is under the soil? ${emoji}`;
  if (target === 'leaves') return `Which green part makes food for the plant? ${emoji}`;
  if (target === 'flower') return `Which colorful part blooms? ${emoji}`;
  if (target === 'fruit') return `Which yummy part can we eat? ${emoji}`;

  // Nature / Seasons
  if (target === 'sun') return `What is this hot shining star? ${emoji}`;
  if (target === 'clouds') return `What are these fluffy white objects? ${emoji}`;
  if (target === 'rain') return `What is this water falling from the sky? ${emoji}`;
  if (target === 'rainbow') return `What is this colorful sky arch? ${emoji}`;
  if (target === 'summer') return `Which season is very hot? ${emoji}`;
  if (target === 'rainy') return `Which season needs raincoats? ${emoji}`;
  if (target === 'winter') return `Which season is cold and snowy? ${emoji}`;

  // Transport
  if (target === 'car') return `What is this four-wheeled vehicle? ${emoji}`;
  if (target === 'bus') return `What is this big vehicle? ${emoji}`;
  if (target === 'train') return `What is this vehicle running on tracks? ${emoji}`;
  if (target === 'bicycle') return `What is this two-wheeled vehicle? ${emoji}`;
  if (target === 'aeroplane') return `What is this vehicle that flies? ${emoji}`;
  if (target === 'helicopter') return `What is this vehicle with rotors? ${emoji}`;
  if (target === 'sailboat') return `What is this boat that sails? ${emoji}`;
  if (target === 'ship') return `What is this big ship? ${emoji}`;

  // Default fallback questions based on round label matching:
  if (round.options && round.options.length > 0) {
    const correctOption = round.options.find((o: any) => o.id === round.correctId);
    if (correctOption) {
      return `Which one is the correct match for "${correctOption.label}"? ${emoji}`;
    }
  }

  return `Can you find the correct answer? 🤔 ${emoji}`;
};

export default function EvsExploreGame({ conceptKey, onComplete, childName }: Props) {
  const lesson = useMemo(() => {
    const base = LESSONS[conceptKey];
    if (!base || !childName) return base;
    return {
      ...base,
      rounds: base.rounds.map((r) => {
        if (r.type !== 'question') return r;
        return {
          ...r,
          options: r.options?.map((opt) => {
            if (opt.id === 'yourname') {
              return { ...opt, label: childName };
            }
            return opt;
          }),
        };
      }),
    };
  }, [conceptKey, childName]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [wrongIds, setWrongIds] = useState<Set<string>>(new Set());

  // Matching States
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({}); // leftId -> rightId
  const [wrongShake, setWrongShake] = useState(false);

  const currentRound = lesson?.rounds[roundIndex];

  const isQuestion = currentRound?.type === 'question';
  const isStory = currentRound?.type === 'story';
  const isLearn = currentRound?.type === 'learn';
  const isReward = currentRound?.type === 'reward';
  const isMatch = currentRound?.type === 'match';

  const totalQuestions = useMemo(
    () => lesson?.rounds.filter((r) => r.type === 'question' || r.type === 'match').length ?? 0,
    [lesson],
  );
  const questionsDone = useMemo(
    () => lesson?.rounds.slice(0, roundIndex).filter((r) => r.type === 'question' || r.type === 'match').length ?? 0,
    [lesson, roundIndex],
  );

  const shuffledRight = useMemo(() => {
    if (currentRound?.type !== 'match' || !currentRound.matchingPairs) return [];
    return shuffleArray(currentRound.matchingPairs.map(p => p.right));
  }, [roundIndex, currentRound]);

  const handleOptionTap = useCallback(
    (optionId: string) => {
      if (!isQuestion || selectedId || !currentRound?.correctId) return;

      setSelectedId(optionId);

      if (optionId === currentRound.correctId) {
        setScore((s) => s + 1);
        setShowResult(true);
      } else {
        setWrongIds((prev) => new Set(prev).add(optionId));
        setTimeout(() => setWrongIds((prev) => { const n = new Set(prev); n.delete(optionId); return n; }), 500);
        setSelectedId(null);
      }
    },
    [isQuestion, selectedId, currentRound],
  );

  const handleLeftMatchClick = (id: string) => {
    if (matchedPairs[id]) return;
    setSelectedLeftId(id);
  };

  const handleRightMatchClick = (id: string, pairs: { left: { id: string }; right: { id: string } }[]) => {
    if (!selectedLeftId) return;

    if (selectedLeftId === id) {
      const nextMatched = { ...matchedPairs, [selectedLeftId]: id };
      setMatchedPairs(nextMatched);
      setSelectedLeftId(null);
      setScore((s) => s + 1);

      if (Object.keys(nextMatched).length >= pairs.length) {
        setShowResult(true);
      }
    } else {
      setWrongShake(true);
      setTimeout(() => {
        setWrongShake(false);
        setSelectedLeftId(null);
      }, 500);
    }
  };

  const handleNext = useCallback(() => {
    setSelectedId(null);
    setShowResult(false);
    setWrongIds(new Set());
    setSelectedLeftId(null);
    setMatchedPairs({});
    setWrongShake(false);

    if (roundIndex < (lesson?.rounds.length ?? 1) - 1) {
      setRoundIndex((i) => i + 1);
    } else {
      const total = totalQuestions;
      onComplete({
        score,
        max_score: total,
        completion_data: { rounds_completed: roundIndex + 1, score },
        time_taken_seconds: 0,
      });
    }
  }, [roundIndex, lesson, onComplete, score, totalQuestions]);

  if (!lesson) return null;

  return (
    <div className="px-4 sm:px-8 pb-6 sm:pb-12 pt-2 min-h-[60vh] flex flex-col items-center">
      {/* Progress dots */}
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        {lesson.rounds.map((r, i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i < roundIndex ? '#22c55e' : i === roundIndex ? '#38bdf8' : 'rgba(217, 119, 6, 0.2)'
            }}
          />
        ))}
      </div>

      {/* Score */}
      {totalQuestions > 0 && (
        <div className="text-[10px] sm:text-xs font-bold text-amber-800/60 mb-3 sm:mb-4 font-sans">
          {questionsDone}/{totalQuestions}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={roundIndex}
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full max-w-md flex flex-col items-center"
        >
          {/* Story text */}
          {isStory && (
            <div className="flex flex-col items-center gap-5 text-center mb-6 w-full">
              <div className="relative w-full rounded-3xl overflow-hidden min-h-[220px] flex flex-col justify-center items-center px-6 py-6 border-[3px] border-amber-200 bg-amber-50/40"
                style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.03)' }}>
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="w-32 h-32 flex items-center justify-center mb-2">
                  <img src={getEvsConceptImage(conceptKey)} className="w-full h-full object-contain" alt="EVS Adventure" />
                </motion.div>
                {currentRound?.story && (
                  <p className="text-sm sm:text-base font-black text-amber-950 text-center max-w-xs leading-relaxed font-sans">
                    {currentRound.story}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Learn / Guide */}
          {isLearn && (
            <div className="flex flex-col items-center gap-4 w-full max-w-xs sm:max-w-sm">
              <div className="w-full bg-[#fffdf9] rounded-2xl sm:rounded-3xl border-3 border-amber-200 p-4 sm:p-6 shadow-sm">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 justify-items-center">
                  {currentRound.showEmoji?.split(' ').filter(Boolean).map((emoji, i) => {
                    const avatar = getFamilyAvatar(emoji);
                    return (
                      <div key={i} className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-amber-50/30 border border-amber-100 w-full overflow-hidden">
                        {avatar ? (
                          <img src={avatar} className="w-12 h-12 object-contain" alt={currentRound.labels?.[i] || 'Family'} />
                        ) : (
                          <span className="text-3xl sm:text-4xl">{emoji}</span>
                        )}
                        {currentRound.labels?.[i] && (
                          <span className="text-[10px] sm:text-[11px] font-black text-amber-950 tracking-wide uppercase font-sans text-center">
                            {currentRound.labels[i]}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className="text-[11px] sm:text-xs font-black text-amber-800 text-center tracking-wider uppercase font-sans">
                {currentRound.story}
              </p>
            </div>
          )}

          {/* Reward */}
          {isReward && (
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <span className="text-6xl sm:text-7xl animate-bounce">⭐</span>
              <p className="text-lg sm:text-2xl font-black text-amber-900 text-center font-sans drop-shadow-sm">
                Super Star!
              </p>
              {currentRound.story && (
                <p className="text-sm sm:text-base font-bold text-amber-950 text-center max-w-xs font-sans">
                  {currentRound.story}
                </p>
              )}
              <p className="text-xs sm:text-sm font-bold text-amber-800/60 font-sans">
                Score: {score}/{totalQuestions}
              </p>
            </div>
          )}

          {/* Match Round */}
          {isMatch && currentRound.matchingPairs && (() => {
            const pairs = currentRound.matchingPairs;
            return (
              <div className="flex flex-col items-center gap-4 w-full">
                <div className="text-center mb-2">
                  <h3 className="text-lg sm:text-xl font-black text-amber-950 font-sans">
                    {currentRound.question || "Match the Pairs! ➔"}
                  </h3>
                  <p className="text-xs text-amber-800/60 font-bold font-sans">
                    Tap an item on the left, then tap its partner on the right!
                  </p>
                </div>

                <div className="relative w-full rounded-3xl overflow-hidden min-h-[285px] flex gap-6 items-stretch px-3 py-5 border-[3px] border-amber-200 bg-amber-50/40 shadow-sm">
                  {/* Left Column */}
                  <div className="flex-1 flex flex-col justify-around gap-2.5 relative z-10">
                    {pairs.map(pair => {
                      const isSelected = selectedLeftId === pair.left.id;
                      const isMatched = !!matchedPairs[pair.left.id];
                      return (
                        <button
                          key={pair.left.id}
                          onClick={() => handleLeftMatchClick(pair.left.id)}
                          className={`p-2.5 rounded-xl border-2 font-black font-sans text-sm flex flex-col items-center justify-center transition-all active:scale-95 min-h-[60px]
                            ${isMatched 
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-700 pointer-events-none' 
                              : isSelected 
                                ? 'bg-sky-50 border-sky-400 text-sky-700 scale-105 shadow-[0_0_10px_rgba(56,189,248,0.2)]' 
                                : 'bg-[#fffdf9] border-amber-200 text-amber-950 hover:bg-amber-50/50'
                            }`}
                        >
                          {pair.left.emoji && <span className="text-2xl mb-1">{pair.left.emoji}</span>}
                          <span className="text-[11px] leading-tight text-center">{pair.left.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Column */}
                  <motion.div animate={wrongShake ? { x: [0, -8, 8, -5, 5, 0] } : {}} transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col justify-around gap-2.5 relative z-10">
                    {shuffledRight.map(rightItem => {
                      const isMatched = Object.values(matchedPairs).includes(rightItem.id);
                      const isSelectable = !!selectedLeftId;
                      return (
                        <button
                          key={rightItem.id}
                          onClick={() => handleRightMatchClick(rightItem.id, pairs)}
                          className={`p-2.5 rounded-xl border-2 font-black font-sans text-sm flex flex-col items-center justify-center transition-all active:scale-95 min-h-[60px]
                            ${isMatched 
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-700 pointer-events-none' 
                              : isSelectable 
                                ? 'bg-amber-50 border-amber-400/50 text-amber-950 animate-pulse' 
                                : 'bg-[#fffdf9] border-amber-200 text-amber-950 hover:bg-amber-50/50'
                            }`}
                        >
                          {rightItem.emoji && <span className="text-2xl mb-1">{rightItem.emoji}</span>}
                          <span className="text-[11px] leading-tight text-center">{rightItem.label}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            );
          })()}

          {/* Question */}
          {isQuestion && (
            <>
              {currentRound.showEmoji && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, y: [0, -4, 0] }}
                  transition={{ scale: { type: 'spring', stiffness: 300 }, y: { duration: 2, repeat: Infinity } }}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center border-2 border-amber-200 bg-[#fffdf9] shadow-sm mb-3 sm:mb-4 overflow-hidden p-2"
                >
                  {getFamilyAvatar(currentRound.showEmoji) ? (
                    <img src={getFamilyAvatar(currentRound.showEmoji)!} className="w-full h-full object-contain" alt="Question" />
                  ) : (
                    <span className="text-4xl sm:text-5xl">{currentRound.showEmoji}</span>
                  )}
                </motion.div>
              )}

              <p className="text-sm sm:text-base font-bold text-amber-950 mb-4 sm:mb-6 text-center max-w-xs sm:max-w-sm leading-relaxed font-sans">
                {getDynamicQuestion(currentRound)}
              </p>

              {/* Options grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-xs sm:max-w-sm">
                {currentRound.options?.map((opt) => {
                  const isCorrect = opt.id === currentRound.correctId;
                  const isSelected = selectedId === opt.id;
                  const isWrong = wrongIds.has(opt.id);
                  const showCorrect = showResult && isCorrect;

                  return (
                    <motion.button
                      key={opt.id}
                      whileTap={!selectedId ? { scale: 0.95 } : undefined}
                      onClick={() => handleOptionTap(opt.id)}
                      disabled={!!selectedId}
                      className={`
                        relative flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-2xl
                        border-2 transition-all duration-200 font-sans shadow-sm
                        ${isWrong
                          ? 'border-red-400 bg-red-500/10 animate-shake'
                          : showCorrect
                            ? 'border-emerald-400 bg-emerald-500/10 scale-105'
                            : isSelected && !showCorrect
                              ? 'border-red-400 bg-red-500/10'
                              : selectedId
                                ? 'border-amber-200/50 bg-[#fffdf9] opacity-50'
                                : 'border-amber-200 bg-[#fffdf9] hover:bg-amber-50/50 cursor-pointer active:scale-95'
                        }
                      `}
                    >
                      <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-50/60 border border-amber-100 overflow-hidden p-1.5">
                        {getFamilyAvatar(opt.emoji) ? (
                          <img src={getFamilyAvatar(opt.emoji)!} className="w-full h-full object-contain" alt={opt.label} />
                        ) : (
                          <span className="text-2xl sm:text-3xl">{opt.emoji}</span>
                        )}
                      </span>
                      <span className={`text-[11px] sm:text-xs font-black ${showCorrect ? 'text-emerald-700' : 'text-amber-950'}`}>
                        {opt.label}
                      </span>
                      {showCorrect && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1.5 -right-1.5 text-sm sm:text-base"
                        >
                          ✅
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </>
          )}

          {/* Next / Complete button */}
          {(showResult || isStory || isLearn || isReward) && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="mt-6 sm:mt-8 w-full max-w-xs py-3 rounded-2xl font-black text-white text-xs sm:text-sm tracking-wide bg-gradient-to-r from-emerald-500 to-teal-500 shadow-xl border-b-4 border-emerald-700 active:scale-95 font-sans"
            >
              {isReward ? '🎉 Done!' : isLearn ? 'Got it ✅' : isStory ? 'Let us start!' : 'Next ➡️'}
            </motion.button>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
