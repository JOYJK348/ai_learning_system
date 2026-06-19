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

interface Round {
  type: 'story' | 'learn' | 'question' | 'reward';
  story?: string;
  showEmoji?: string;
  labels?: string[];
  question?: string;
  options?: { id: string; emoji: string; label: string }[];
  correctId?: string;
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
};

type Props = {
  conceptKey: string;
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

export default function EvsExploreGame({ conceptKey, onComplete }: Props) {
  const lesson = LESSONS[conceptKey];
  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [wrongIds, setWrongIds] = useState<Set<string>>(new Set());

  const currentRound = lesson?.rounds[roundIndex];

  const isQuestion = currentRound?.type === 'question';
  const isStory = currentRound?.type === 'story';
  const isLearn = currentRound?.type === 'learn';
  const isReward = currentRound?.type === 'reward';

  const totalQuestions = useMemo(
    () => lesson?.rounds.filter((r) => r.type === 'question').length ?? 0,
    [lesson],
  );
  const questionsDone = useMemo(
    () => lesson?.rounds.slice(0, roundIndex).filter((r) => r.type === 'question').length ?? 0,
    [lesson, roundIndex],
  );

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

  const handleNext = useCallback(() => {
    setSelectedId(null);
    setShowResult(false);
    setWrongIds(new Set());

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
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              i === roundIndex
                ? 'bg-emerald-400 scale-125 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                : i < roundIndex
                  ? 'bg-emerald-600/60'
                  : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Score */}
      {totalQuestions > 0 && (
        <div className="text-[10px] sm:text-xs font-bold text-emerald-300/60 mb-3 sm:mb-4 font-sans">
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
          {isStory && currentRound?.story && (
            <p className="text-sm sm:text-base font-bold text-white/80 text-center mb-6 sm:mb-8 max-w-xs sm:max-w-sm font-sans leading-relaxed">
              {currentRound.story}
            </p>
          )}

          {/* Learn / Guide */}
          {isLearn && (
            <div className="flex flex-col items-center gap-4 w-full max-w-xs sm:max-w-sm">
              <div className="w-full bg-white/5 rounded-2xl sm:rounded-3xl border border-emerald-400/20 p-4 sm:p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 justify-items-center">
                  {currentRound.showEmoji?.split(' ').filter(Boolean).map((emoji, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5">
                      <span className="text-3xl sm:text-4xl">{emoji}</span>
                      {currentRound.labels?.[i] && (
                        <span className="text-[10px] sm:text-xs font-bold text-emerald-200/80 font-sans tracking-wide uppercase">
                          {currentRound.labels[i]}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[11px] sm:text-xs font-bold text-emerald-300/60 text-center font-sans tracking-wider uppercase">
                {currentRound.story}
              </p>
            </div>
          )}

          {/* Reward */}
          {isReward && (
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <span className="text-6xl sm:text-7xl animate-bounce">⭐</span>
              <p className="text-lg sm:text-2xl font-black text-yellow-300 text-center font-sans drop-shadow-lg">
                Super Star!
              </p>
              {currentRound.story && (
                <p className="text-sm sm:text-base font-bold text-emerald-100/80 text-center max-w-xs font-sans">
                  {currentRound.story}
                </p>
              )}
              <p className="text-xs sm:text-sm font-bold text-emerald-300/60 font-sans">
                Score: {score}/{totalQuestions}
              </p>
            </div>
          )}

          {/* Question */}
          {isQuestion && (
            <>
              {currentRound.showEmoji && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, y: [0, -8, 0] }}
                  transition={{ scale: { type: 'spring', stiffness: 300 }, y: { duration: 2, repeat: Infinity } }}
                  className={`${FAMILY_BG[currentRound.showEmoji] ? 'w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center' : 'text-6xl sm:text-7xl'} mb-3 sm:mb-4`}
                >
                  <span className="text-4xl sm:text-5xl">{currentRound.showEmoji}</span>
                </motion.div>
              )}

              {currentRound.question && (
                <p className="text-sm sm:text-base font-bold text-white mb-4 sm:mb-6 text-center max-w-xs sm:max-w-sm font-sans leading-relaxed">
                  {currentRound.question}
                </p>
              )}

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
                      whileTap={!selectedId ? { scale: 0.92 } : undefined}
                      onClick={() => handleOptionTap(opt.id)}
                      disabled={!!selectedId}
                      className={`
                        relative flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl
                        border-2 transition-all duration-200 font-sans
                        ${isWrong
                          ? 'border-red-400/60 bg-red-500/20 animate-shake'
                          : showCorrect
                            ? 'border-emerald-400 bg-emerald-500/20 scale-105'
                            : isSelected && !showCorrect
                              ? 'border-red-400/60 bg-red-500/20'
                              : selectedId
                                ? 'border-white/10 bg-white/5 opacity-50'
                                : 'border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/40 cursor-pointer active:scale-95'
                        }
                      `}
                    >
                      <span className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full ${FAMILY_BG[opt.emoji] ?? 'bg-transparent'}`}>
                        <span className="text-2xl sm:text-3xl">{opt.emoji}</span>
                      </span>
                      <span className={`text-[10px] sm:text-xs font-bold ${showCorrect ? 'text-emerald-300' : 'text-white/70'}`}>
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
              className="mt-6 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 bg-emerald-500/30 hover:bg-emerald-500/50 text-white font-black text-xs sm:text-sm rounded-full border-2 border-emerald-400/50 shadow-lg transition-all font-sans active:scale-95"
            >
              {isReward ? '🎉 Done!' : isLearn ? 'Got it ✅' : isStory ? 'Let us start!' : 'Next ➡️'}
            </motion.button>
          )}


        </motion.div>
      </AnimatePresence>
    </div>
  );
}
