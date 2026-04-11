'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, Globe, Bell, User, Play, CheckCircle, 
  Circle, ArrowLeft, Star, Trophy, Award, 
  Type, Hash, Palette, Dog, Sparkles, Video, Volume2, Check
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Mock Data Models
const CATEGORIES = [
  { id: 'alpha', title: 'Alphabets', icon: Type, color: 'bg-rose-100 text-rose-500', border: 'border-rose-200', progress: 75, lessons: 26 },
  { id: 'math', title: 'Numbers', icon: Hash, color: 'bg-blue-100 text-blue-500', border: 'border-blue-200', progress: 40, lessons: 50 },
  { id: 'color', title: 'Colors', icon: Palette, color: 'bg-emerald-100 text-emerald-500', border: 'border-emerald-200', progress: 0, lessons: 12 },
  { id: 'animal', title: 'Animals', icon: Dog, color: 'bg-amber-100 text-amber-500', border: 'border-amber-200', progress: 10, lessons: 15 },
];

const LESSONS: Record<string, any[]> = {
  alpha: [
    { id: 'l1', title: 'A for Aeroplane', emoji: '✈️', color: 'bg-sky-100', text: 'text-sky-600', border: 'border-sky-300', status: 'completed', quiz: { question: 'Find the Aeroplane!', options: [{n: 'Cat', e: '🐱'}, {n: 'Aeroplane', e: '✈️'}, {n: 'Ball', e: '⚽'}], correct: 'Aeroplane' } },
    { id: 'l2', title: 'B for Ball', emoji: '⚽', color: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-300', status: 'not-started', quiz: { question: 'Find the Ball!', options: [{n: 'Apple', e: '🍎'}, {n: 'Ball', e: '⚽'}, {n: 'Dog', e: '🐶'}], correct: 'Ball' } },
    { id: 'l3', title: 'C for Cat', emoji: '🐱', color: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-300', status: 'not-started', quiz: { question: 'Find the Cat!', options: [{n: 'Cat', e: '🐱'}, {n: 'Ball', e: '⚽'}, {n: 'Apple', e: '🍎'}], correct: 'Cat' } },
    { id: 'l4', title: 'D for Dog', emoji: '🐶', color: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-300', status: 'not-started', quiz: { question: 'Find the Dog!', options: [{n: 'Cat', e: '🐱'}, {n: 'Dog', e: '🐶'}, {n: 'Bird', e: '🐦'}], correct: 'Dog' } },
    { id: 'l5', title: 'E for Elephant', emoji: '🐘', color: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-300', status: 'not-started', quiz: { question: 'Find the Elephant!', options: [{n: 'Elephant', e: '🐘'}, {n: 'Lion', e: '🦁'}, {n: 'Tiger', e: '🐯'}], correct: 'Elephant' } },
    { id: 'l6', title: 'F for Fish', emoji: '🐟', color: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300', status: 'not-started', quiz: { question: 'Find the Fish!', options: [{n: 'Bird', e: '🐦'}, {n: 'Fish', e: '🐟'}, {n: 'Frog', e: '🐸'}], correct: 'Fish' } },
    { id: 'l7', title: 'G for Grapes', emoji: '🍇', color: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300', status: 'not-started', quiz: { question: 'Find the Grapes!', options: [{n: 'Apple', e: '🍎'}, {n: 'Grapes', e: '🍇'}, {n: 'Banana', e: '🍌'}], correct: 'Grapes' } },
    { id: 'l8', title: 'H for Hat', emoji: '👒', color: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-300', status: 'not-started', quiz: { question: 'Find the Hat!', options: [{n: 'Shirt', e: '👕'}, {n: 'Shoes', e: '👟'}, {n: 'Hat', e: '👒'}], correct: 'Hat' } },
    { id: 'l9', title: 'I for Ice Cream', emoji: '🍦', color: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-300', status: 'not-started', quiz: { question: 'Find the Ice Cream!', options: [{n: 'Ice Cream', e: '🍦'}, {n: 'Cake', e: '🍰'}, {n: 'Candy', e: '🍭'}], correct: 'Ice Cream' } },
    { id: 'l10', title: 'J for Juice', emoji: '🧃', color: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-300', status: 'not-started', quiz: { question: 'Find the Juice!', options: [{n: 'Water', e: '💧'}, {n: 'Milk', e: '🥛'}, {n: 'Juice', e: '🧃'}], correct: 'Juice' } },
    { id: 'l11', title: 'K for Kite', emoji: '🪁', color: 'bg-sky-100', text: 'text-sky-600', border: 'border-sky-300', status: 'not-started', quiz: { question: 'Find the Kite!', options: [{n: 'Bird', e: '🐦'}, {n: 'Kite', e: '🪁'}, {n: 'Plane', e: '✈️'}], correct: 'Kite' } },
    { id: 'l12', title: 'L for Lion', emoji: '🦁', color: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-300', status: 'not-started', quiz: { question: 'Find the Lion!', options: [{n: 'Tiger', e: '🐯'}, {n: 'Lion', e: '🦁'}, {n: 'Cat', e: '🐱'}], correct: 'Lion' } },
    { id: 'l13', title: 'M for Monkey', emoji: '🐒', color: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-300', status: 'not-started', quiz: { question: 'Find the Monkey!', options: [{n: 'Monkey', e: '🐒'}, {n: 'Gorilla', e: '🦍'}, {n: 'Panda', e: '🐼'}], correct: 'Monkey' } },
    { id: 'l14', title: 'N for Nest', emoji: '🪺', color: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-300', status: 'not-started', quiz: { question: 'Find the Nest!', options: [{n: 'Egg', e: '🥚'}, {n: 'Nest', e: '🪺'}, {n: 'Tree', e: '🌳'}], correct: 'Nest' } },
    { id: 'l15', title: 'O for Orange', emoji: '🍊', color: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-300', status: 'not-started', quiz: { question: 'Find the Orange!', options: [{n: 'Apple', e: '🍎'}, {n: 'Orange', e: '🍊'}, {n: 'Pear', e: '🍐'}], correct: 'Orange' } },
    { id: 'l16', title: 'P for Parrot', emoji: '🦜', color: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-300', status: 'not-started', quiz: { question: 'Find the Parrot!', options: [{n: 'Owl', e: '🦉'}, {n: 'Parrot', e: '🦜'}, {n: 'Eagle', e: '🦅'}], correct: 'Parrot' } },
    { id: 'l17', title: 'Q for Queen', emoji: '👸', color: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300', status: 'not-started', quiz: { question: 'Find the Queen!', options: [{n: 'Queen', e: '👸'}, {n: 'King', e: '🤴'}, {n: 'Prince', e: '🤵'}], correct: 'Queen' } },
    { id: 'l18', title: 'R for Rabbit', emoji: '🐰', color: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-300', status: 'not-started', quiz: { question: 'Find the Rabbit!', options: [{n: 'Mouse', e: '🐭'}, {n: 'Rabbit', e: '🐰'}, {n: 'Hamster', e: '🐹'}], correct: 'Rabbit' } },
    { id: 'l19', title: 'S for Sun', emoji: '☀️', color: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-300', status: 'not-started', quiz: { question: 'Find the Sun!', options: [{n: 'Moon', e: '🌙'}, {n: 'Sun', e: '☀️'}, {n: 'Star', e: '⭐'}], correct: 'Sun' } },
    { id: 'l20', title: 'T for Tiger', emoji: '🐯', color: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-300', status: 'not-started', quiz: { question: 'Find the Tiger!', options: [{n: 'Tiger', e: '🐯'}, {n: 'Lion', e: '🦁'}, {n: 'Cat', e: '🐱'}], correct: 'Tiger' } },
    { id: 'l21', title: 'U for Umbrella', emoji: '☂️', color: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300', status: 'not-started', quiz: { question: 'Find the Umbrella!', options: [{n: 'Rain', e: '🌧️'}, {n: 'Cloud', e: '☁️'}, {n: 'Umbrella', e: '☂️'}], correct: 'Umbrella' } },
    { id: 'l22', title: 'V for Van', emoji: '🚐', color: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300', status: 'not-started', quiz: { question: 'Find the Van!', options: [{n: 'Car', e: '🚗'}, {n: 'Van', e: '🚐'}, {n: 'Bus', e: '🚌'}], correct: 'Van' } },
    { id: 'l23', title: 'W for Watch', emoji: '⌚', color: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-300', status: 'not-started', quiz: { question: 'Find the Watch!', options: [{n: 'Phone', e: '📱'}, {n: 'Watch', e: '⌚'}, {n: 'Clock', e: '⏰'}], correct: 'Watch' } },
    { id: 'l24', title: 'X for Xylophone', emoji: '🎹', color: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-300', status: 'not-started', quiz: { question: 'Find Xylophone!', options: [{n: 'Guitar', e: '🎸'}, {n: 'Drum', e: '🥁'}, {n: 'Xylophone', e: '🎹'}], correct: 'Xylophone' } },
    { id: 'l25', title: 'Y for Yo-Yo', emoji: '🪀', color: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-300', status: 'not-started', quiz: { question: 'Find the Yo-Yo!', options: [{n: 'Ball', e: '⚽'}, {n: 'Yo-Yo', e: '🪀'}, {n: 'Top', e: '🪁'}], correct: 'Yo-Yo' } },
    { id: 'l26', title: 'Z for Zebra', emoji: '🦓', color: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-300', status: 'not-started', quiz: { question: 'Find the Zebra!', options: [{n: 'Horse', e: '🐎'}, {n: 'Zebra', e: '🦓'}, {n: 'Donkey', e: '🫏'}], correct: 'Zebra' } },
  ],
  math: [
    { id: 'm1', title: 'Number 1', emoji: '1️⃣', color: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300', status: 'not-started', quiz: { question: 'Where is Number 1?', options: [{n: '1', e: '1️⃣'}, {n: '2', e: '2️⃣'}, {n: '3', e: '3️⃣'}], correct: '1' } },
    { id: 'm2', title: 'Number 2', emoji: '2️⃣', color: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-300', status: 'not-started', quiz: { question: 'Where is Number 2?', options: [{n: '2', e: '2️⃣'}, {n: '1', e: '1️⃣'}, {n: '0', e: '0️⃣'}], correct: '2' } },
    { id: 'm3', title: 'Number 3', emoji: '3️⃣', color: 'bg-sky-100', text: 'text-sky-600', border: 'border-sky-300', status: 'not-started', quiz: { question: 'Where is Number 3?', options: [{n: '3', e: '3️⃣'}, {n: '1', e: '1️⃣'}, {n: '2', e: '2️⃣'}], correct: '3' } },
    { id: 'm4', title: 'Number 4', emoji: '4️⃣', color: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-300', status: 'not-started', quiz: { question: 'Where is Number 4?', options: [{n: '4', e: '4️⃣'}, {n: '3', e: '3️⃣'}, {n: '5', e: '5️⃣'}], correct: '4' } },
    { id: 'm5', title: 'Number 5', emoji: '5️⃣', color: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-300', status: 'not-started', quiz: { question: 'Where is Number 5?', options: [{n: '5', e: '5️⃣'}, {n: '4', e: '4️⃣'}, {n: '6', e: '6️⃣'}], correct: '5' } },
    { id: 'm6', title: 'Number 6', emoji: '6️⃣', color: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-300', status: 'not-started', quiz: { question: 'Where is Number 6?', options: [{n: '6', e: '6️⃣'}, {n: '5', e: '5️⃣'}, {n: '7', e: '7️⃣'}], correct: '6' } },
    { id: 'm7', title: 'Number 7', emoji: '7️⃣', color: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-300', status: 'not-started', quiz: { question: 'Where is Number 7?', options: [{n: '7', e: '7️⃣'}, {n: '6', e: '6️⃣'}, {n: '8', e: '8️⃣'}], correct: '7' } },
    { id: 'm8', title: 'Number 8', emoji: '8️⃣', color: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300', status: 'not-started', quiz: { question: 'Where is Number 8?', options: [{n: '8', e: '8️⃣'}, {n: '7', e: '7️⃣'}, {n: '9', e: '9️⃣'}], correct: '8' } },
    { id: 'm9', title: 'Number 9', emoji: '9️⃣', color: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-300', status: 'not-started', quiz: { question: 'Where is Number 9?', options: [{n: '9', e: '9️⃣'}, {n: '8', e: '8️⃣'}, {n: '10', e: '🔟'}], correct: '9' } },
    { id: 'm10', title: 'Number 10', emoji: '🔟', color: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-300', status: 'not-started', quiz: { question: 'Where is Number 10?', options: [{n: '10', e: '🔟'}, {n: '9', e: '9️⃣'}, {n: '11', e: '11'}], correct: '10' } },
    { id: 'm11', title: 'Number 11', emoji: '11', color: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-300', status: 'not-started', quiz: { question: 'Where is Number 11?', options: [{n: '11', e: '11'}, {n: '10', e: '🔟'}, {n: '12', e: '12'}], correct: '11' } },
    { id: 'm12', title: 'Number 12', emoji: '12', color: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-300', status: 'not-started', quiz: { question: 'Where is Number 12?', options: [{n: '12', e: '12'}, {n: '11', e: '11'}, {n: '13', e: '13'}], correct: '12' } },
    { id: 'm13', title: 'Number 13', emoji: '13', color: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300', status: 'not-started', quiz: { question: 'Where is Number 13?', options: [{n: '13', e: '13'}, {n: '12', e: '12'}, {n: '14', e: '14'}], correct: '13' } },
    { id: 'm14', title: 'Number 14', emoji: '14', color: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-300', status: 'not-started', quiz: { question: 'Where is Number 14?', options: [{n: '14', e: '14'}, {n: '13', e: '13'}, {n: '15', e: '15'}], correct: '14' } },
    { id: 'm15', title: 'Number 15', emoji: '15', color: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-300', status: 'not-started', quiz: { question: 'Where is Number 15?', options: [{n: '15', e: '15'}, {n: '14', e: '14'}, {n: '16', e: '16'}], correct: '15' } },
    { id: 'm16', title: 'Number 16', emoji: '16', color: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-300', status: 'not-started', quiz: { question: 'Where is Number 16?', options: [{n: '16', e: '16'}, {n: '15', e: '15'}, {n: '17', e: '17'}], correct: '16' } },
    { id: 'm17', title: 'Number 17', emoji: '17', color: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-300', status: 'not-started', quiz: { question: 'Where is Number 17?', options: [{n: '17', e: '17'}, {n: '16', e: '16'}, {n: '18', e: '18'}], correct: '17' } },
    { id: 'm18', title: 'Number 18', emoji: '18', color: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300', status: 'not-started', quiz: { question: 'Where is Number 18?', options: [{n: '18', e: '18'}, {n: '17', e: '17'}, {n: '19', e: '19'}], correct: '18' } },
    { id: 'm19', title: 'Number 19', emoji: '19', color: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-300', status: 'not-started', quiz: { question: 'Where is Number 19?', options: [{n: '19', e: '19'}, {n: '18', e: '18'}, {n: '20', e: '20'}], correct: '19' } },
    { id: 'm20', title: 'Number 20', emoji: '20', color: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-300', status: 'not-started', quiz: { question: 'Where is Number 20?', options: [{n: '20', e: '20'}, {n: '19', e: '19'}, {n: '21', e: '21'}], correct: '20' } },
    { id: 'm21', title: 'Number 21', emoji: '21', color: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-300', status: 'not-started', quiz: { question: 'Where is Number 21?', options: [{n: '21', e: '21'}, {n: '20', e: '20'}, {n: '22', e: '22'}], correct: '21' } },
    { id: 'm22', title: 'Number 22', emoji: '22', color: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-300', status: 'not-started', quiz: { question: 'Where is Number 22?', options: [{n: '22', e: '22'}, {n: '21', e: '21'}, {n: '23', e: '23'}], correct: '22' } },
    { id: 'm23', title: 'Number 23', emoji: '23', color: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300', status: 'not-started', quiz: { question: 'Where is Number 23?', options: [{n: '23', e: '23'}, {n: '22', e: '22'}, {n: '24', e: '24'}], correct: '23' } },
    { id: 'm24', title: 'Number 24', emoji: '24', color: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-300', status: 'not-started', quiz: { question: 'Where is Number 24?', options: [{n: '24', e: '24'}, {n: '23', e: '23'}, {n: '25', e: '25'}], correct: '24' } },
    { id: 'm25', title: 'Number 25', emoji: '25', color: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-300', status: 'not-started', quiz: { question: 'Where is Number 25?', options: [{n: '25', e: '25'}, {n: '24', e: '24'}, {n: '26', e: '26'}], correct: '25' } },
    { id: 'm26', title: 'Number 26', emoji: '26', color: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-300', status: 'not-started', quiz: { question: 'Where is Number 26?', options: [{n: '26', e: '26'}, {n: '25', e: '25'}, {n: '27', e: '27'}], correct: '26' } },
    { id: 'm27', title: 'Number 27', emoji: '27', color: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-300', status: 'not-started', quiz: { question: 'Where is Number 27?', options: [{n: '27', e: '27'}, {n: '26', e: '26'}, {n: '28', e: '28'}], correct: '27' } },
    { id: 'm28', title: 'Number 28', emoji: '28', color: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300', status: 'not-started', quiz: { question: 'Where is Number 28?', options: [{n: '28', e: '28'}, {n: '27', e: '27'}, {n: '29', e: '29'}], correct: '28' } },
    { id: 'm29', title: 'Number 29', emoji: '29', color: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-300', status: 'not-started', quiz: { question: 'Where is Number 29?', options: [{n: '29', e: '29'}, {n: '28', e: '28'}, {n: '30', e: '30'}], correct: '29' } },
    { id: 'm30', title: 'Number 30', emoji: '30', color: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-300', status: 'not-started', quiz: { question: 'Where is Number 30?', options: [{n: '30', e: '30'}, {n: '29', e: '29'}, {n: '31', e: '31'}], correct: '30' } },
    { id: 'm31', title: 'Number 31', emoji: '31', color: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-300', status: 'not-started', quiz: { question: 'Where is Number 31?', options: [{n: '31', e: '31'}, {n: '30', e: '30'}, {n: '32', e: '32'}], correct: '31' } },
    { id: 'm32', title: 'Number 32', emoji: '32', color: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-300', status: 'not-started', quiz: { question: 'Where is Number 32?', options: [{n: '32', e: '32'}, {n: '31', e: '31'}, {n: '33', e: '33'}], correct: '32' } },
    { id: 'm33', title: 'Number 33', emoji: '33', color: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300', status: 'not-started', quiz: { question: 'Where is Number 33?', options: [{n: '33', e: '33'}, {n: '32', e: '32'}, {n: '34', e: '34'}], correct: '33' } },
    { id: 'm34', title: 'Number 34', emoji: '34', color: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-300', status: 'not-started', quiz: { question: 'Where is Number 34?', options: [{n: '34', e: '34'}, {n: '33', e: '33'}, {n: '35', e: '35'}], correct: '34' } },
    { id: 'm35', title: 'Number 35', emoji: '35', color: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-300', status: 'not-started', quiz: { question: 'Where is Number 35?', options: [{n: '35', e: '35'}, {n: '34', e: '34'}, {n: '36', e: '36'}], correct: '35' } },
    { id: 'm36', title: 'Number 36', emoji: '36', color: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-300', status: 'not-started', quiz: { question: 'Where is Number 36?', options: [{n: '36', e: '36'}, {n: '35', e: '35'}, {n: '37', e: '37'}], correct: '36' } },
    { id: 'm37', title: 'Number 37', emoji: '37', color: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-300', status: 'not-started', quiz: { question: 'Where is Number 37?', options: [{n: '37', e: '37'}, {n: '36', e: '36'}, {n: '38', e: '38'}], correct: '37' } },
    { id: 'm38', title: 'Number 38', emoji: '38', color: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300', status: 'not-started', quiz: { question: 'Where is Number 38?', options: [{n: '38', e: '38'}, {n: '37', e: '37'}, {n: '39', e: '39'}], correct: '38' } },
    { id: 'm39', title: 'Number 39', emoji: '39', color: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-300', status: 'not-started', quiz: { question: 'Where is Number 39?', options: [{n: '39', e: '39'}, {n: '38', e: '38'}, {n: '40', e: '40'}], correct: '39' } },
    { id: 'm40', title: 'Number 40', emoji: '40', color: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-300', status: 'not-started', quiz: { question: 'Where is Number 40?', options: [{n: '40', e: '40'}, {n: '39', e: '39'}, {n: '41', e: '41'}], correct: '40' } },
    { id: 'm41', title: 'Number 41', emoji: '41', color: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-300', status: 'not-started', quiz: { question: 'Where is Number 41?', options: [{n: '41', e: '41'}, {n: '40', e: '40'}, {n: '42', e: '42'}], correct: '41' } },
    { id: 'm42', title: 'Number 42', emoji: '42', color: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-300', status: 'not-started', quiz: { question: 'Where is Number 42?', options: [{n: '42', e: '42'}, {n: '41', e: '41'}, {n: '43', e: '43'}], correct: '42' } },
    { id: 'm43', title: 'Number 43', emoji: '43', color: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300', status: 'not-started', quiz: { question: 'Where is Number 43?', options: [{n: '43', e: '43'}, {n: '42', e: '42'}, {n: '44', e: '44'}], correct: '43' } },
    { id: 'm44', title: 'Number 44', emoji: '44', color: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-300', status: 'not-started', quiz: { question: 'Where is Number 44?', options: [{n: '44', e: '44'}, {n: '43', e: '43'}, {n: '45', e: '45'}], correct: '44' } },
    { id: 'm45', title: 'Number 45', emoji: '45', color: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-300', status: 'not-started', quiz: { question: 'Where is Number 45?', options: [{n: '45', e: '45'}, {n: '44', e: '44'}, {n: '46', e: '46'}], correct: '45' } },
    { id: 'm46', title: 'Number 46', emoji: '46', color: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-300', status: 'not-started', quiz: { question: 'Where is Number 46?', options: [{n: '46', e: '46'}, {n: '45', e: '45'}, {n: '47', e: '47'}], correct: '46' } },
    { id: 'm47', title: 'Number 47', emoji: '47', color: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-300', status: 'not-started', quiz: { question: 'Where is Number 47?', options: [{n: '47', e: '47'}, {n: '46', e: '46'}, {n: '48', e: '48'}], correct: '47' } },
    { id: 'm48', title: 'Number 48', emoji: '48', color: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300', status: 'not-started', quiz: { question: 'Where is Number 48?', options: [{n: '48', e: '48'}, {n: '47', e: '47'}, {n: '49', e: '49'}], correct: '48' } },
    { id: 'm49', title: 'Number 49', emoji: '49', color: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-300', status: 'not-started', quiz: { question: 'Where is Number 49?', options: [{n: '49', e: '49'}, {n: '48', e: '48'}, {n: '50', e: '50'}], correct: '49' } },
    { id: 'm50', title: 'Number 50', emoji: '50', color: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-300', status: 'not-started', quiz: { question: 'Where is Number 50?', options: [{n: '50', e: '50'}, {n: '49', e: '49'}, {n: '51', e: '51'}], correct: '50' } },
  ],
  color: [
    { id: 'c1', title: 'Red Color', emoji: '🔴', color: 'bg-red-100', text: 'text-red-600', border: 'border-red-300', status: 'not-started', quiz: { question: 'Which one is Red?', options: [{n: 'Red', e: '🔴'}, {n: 'Blue', e: '🔵'}, {n: 'Green', e: '🟢'}], correct: 'Red' } },
    { id: 'c2', title: 'Blue Color', emoji: '🔵', color: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-300', status: 'not-started', quiz: { question: 'Which one is Blue?', options: [{n: 'Blue', e: '🔵'}, {n: 'Red', e: '🔴'}, {n: 'Yellow', e: '🟡'}], correct: 'Blue' } },
    { id: 'c3', title: 'Green Color', emoji: '🟢', color: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-300', status: 'not-started', quiz: { question: 'Which one is Green?', options: [{n: 'Green', e: '🟢'}, {n: 'Red', e: '🔴'}, {n: 'Blue', e: '🔵'}], correct: 'Green' } },
    { id: 'c4', title: 'Yellow Color', emoji: '🟡', color: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-300', status: 'not-started', quiz: { question: 'Which one is Yellow?', options: [{n: 'Yellow', e: '🟡'}, {n: 'Pink', e: '💗'}, {n: 'Black', e: '⚫'}], correct: 'Yellow' } },
    { id: 'c5', title: 'Orange Color', emoji: '🟠', color: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-300', status: 'not-started', quiz: { question: 'Which one is Orange?', options: [{n: 'Orange', e: '🟠'}, {n: 'Red', e: '🔴'}, {n: 'White', e: '⚪'}], correct: 'Orange' } },
    { id: 'c6', title: 'Purple Color', emoji: '🟣', color: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-300', status: 'not-started', quiz: { question: 'Which one is Purple?', options: [{n: 'Purple', e: '🟣'}, {n: 'Gray', e: '🩶'}, {n: 'Brown', e: '🟤'}], correct: 'Purple' } },
    { id: 'c7', title: 'Pink Color', emoji: '💗', color: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-300', status: 'not-started', quiz: { question: 'Which one is Pink?', options: [{n: 'Pink', e: '💗'}, {n: 'Red', e: '🔴'}, {n: 'White', e: '⚪'}], correct: 'Pink' } },
    { id: 'c8', title: 'Brown Color', emoji: '🟤', color: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-900', status: 'not-started', quiz: { question: 'Which one is Brown?', options: [{n: 'Brown', e: '🟤'}, {n: 'Black', e: '⚫'}, {n: 'White', e: '⚪'}], correct: 'Brown' } },
    { id: 'c9', title: 'Black Color', emoji: '⚫', color: 'bg-slate-200', text: 'text-slate-900', border: 'border-slate-800', status: 'not-started', quiz: { question: 'Which one is Black?', options: [{n: 'Black', e: '⚫'}, {n: 'White', e: '⚪'}, {n: 'Red', e: '🔴'}], correct: 'Black' } },
    { id: 'c10', title: 'White Color', emoji: '⚪', color: 'bg-white', text: 'text-slate-400', border: 'border-slate-200', status: 'not-started', quiz: { question: 'Which one is White?', options: [{n: 'White', e: '⚪'}, {n: 'Black', e: '⚫'}, {n: 'Gray', e: '🩶'}], correct: 'White' } },
    { id: 'c11', title: 'Gray Color', emoji: '🩶', color: 'bg-slate-100', text: 'text-slate-500', border: 'border-slate-400', status: 'not-started', quiz: { question: 'Which one is Gray?', options: [{n: 'Gray', e: '🩶'}, {n: 'Blue', e: '🔵'}, {n: 'Black', e: '⚫'}], correct: 'Gray' } },
    { id: 'c12', title: 'Indigo Color', emoji: '🌊', color: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-300', status: 'not-started', quiz: { question: 'Which one is Indigo?', options: [{n: 'Indigo', e: '🌊'}, {n: 'Pink', e: '💗'}, {n: 'Grapes', e: '🍇'}], correct: 'Indigo' } },
  ],
  animal: [
    { id: 'a1', title: 'Lion King', emoji: '🦁', color: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-300', status: 'not-started', quiz: { question: 'Find the Lion!', options: [{n: 'Lion', e: '🦁'}, {n: 'Tiger', e: '🐯'}, {n: 'Elephant', e: '🐘'}], correct: 'Lion' } },
    { id: 'a2', title: 'Little Monkey', emoji: '🐒', color: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-300', status: 'not-started', quiz: { question: 'Find the Monkey!', options: [{n: 'Monkey', e: '🐒'}, {n: 'Gorilla', e: '🦍'}, {n: 'Panda', e: '🐼'}], correct: 'Monkey' } },
  ]
};

// ── BALLOON ANIMATION COMPONENT ──
function BalloonCelebration() {
  const balloons = Array.from({ length: 15 });
  const colors = ['bg-rose-400', 'bg-sky-400', 'bg-amber-400', 'bg-emerald-400', 'bg-indigo-400', 'bg-pink-400'];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {balloons.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '100vh', x: `${Math.random() * 100}vw`, opacity: 1, scale: 0.5 + Math.random() }}
          animate={{ y: '-20vh', x: `${(Math.random() * 100) - 10}vw`, opacity: 0 }}
          transition={{ duration: 3 + Math.random() * 2, ease: "easeOut", delay: Math.random() * 0.5 }}
          className={`absolute w-12 h-16 rounded-t-full rounded-b-[40%] shadow-lg ${colors[i % colors.length]}`}
        >
          {/* Balloon String */}
          <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-300/50" />
        </motion.div>
      ))}
    </div>
  );
}

// ── MAIN COMPONENT ──
export default function StudentDashboard() {
  const router = useRouter();

  // State Machine
  const [view, setView] = useState<'dashboard' | 'category' | 'lesson' | 'quiz' | 'success'>('dashboard');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);

  // Handlers
  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    setView('category');
    const category = CATEGORIES.find(c => c.id === id);
    if (category) {
      speakText("Let's learn " + category.title + "!");
    }
  };

  const handleLessonClick = (id: string) => {
    setActiveLesson(id);
    setView('lesson');
    
    const lesson = Object.values(LESSONS).flat().find(l => l.id === id);
    if (lesson) {
      speakText(lesson.title);
      // Auto-move to quiz after 4 seconds
      setTimeout(() => {
        // Only move to quiz if we are still in lesson view (user didn't go back)
        setView(current => current === 'lesson' ? 'quiz' : current);
      }, 4500);
    }
  };

  const playAlphabetSong = () => {
    speakText("A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y and Z! Now I know my A B Cs, next time won't you sing with me!");
    setShowBalloons(true);
    setTimeout(() => setShowBalloons(false), 8000);
  };

  const getActiveLesson = () => {
    if (!activeLesson) return LESSONS.alpha[0];
    for (const cat of Object.values(LESSONS)) {
      const lesson = cat.find(l => l.id === activeLesson);
      if (lesson) return lesson;
    }
    return LESSONS.alpha[0];
  };

  const getActiveLessonTitle = () => getActiveLesson()?.title || 'A for Aeroplane';
  const getActiveLessonEmoji = () => getActiveLesson()?.emoji || '✈️';

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.3;
      // High-end kids voice synth handling
      window.speechSynthesis.speak(utterance);
    }
  };

  const playLessonAudio = () => {
    speakText(getActiveLessonTitle());
  };

  const handleLessonComplete = () => {
    setView('quiz');
  };

  const handleQuizComplete = () => {
    setShowBalloons(true);
    speakText("Correct! Yay! You are so smart! Look at the balloons!");
    setTimeout(() => {
      setShowBalloons(false);
      setView('success');
    }, 4000);
  };

  const returnToDashboard = () => {
    setActiveCategory(null);
    setActiveLesson(null);
    setView('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col overflow-x-hidden">
      
      {/* ── CELEBRATION OVERLAY ── */}
      <AnimatePresence>
        {showBalloons && <BalloonCelebration />}
      </AnimatePresence>
      
      {/* ── 1. TOP NAVIGATION BAR ── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          
          {/* Logo & Demo Badge */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={returnToDashboard}>
              <div className="w-10 h-10 rounded-2xl bg-[#013237] text-white flex items-center justify-center font-bold text-lg shadow-md">
                Z<span className="text-[#D4AF37]">A</span>
              </div>
              <span className="hidden sm:block font-extrabold text-xl tracking-tight text-[#013237]">
                ZHI <span className="text-[#D4AF37]">LearnAI</span>
              </span>
            </div>
            <div className="hidden md:flex px-3 py-1 rounded-full bg-amber-50 border border-amber-200">
               <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1">
                 <Star size={10} /> Demo Version - For Learning Flow
               </span>
            </div>
          </div>

          {/* Right Side Tools */}
          <div className="flex items-center gap-3 sm:gap-6">
            
            {/* Language Switch Placeholder */}
            <button className="hidden sm:flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors font-semibold text-sm">
              <Globe size={18} />
              <span>EN / TA</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-500 hover:text-slate-800 transition-colors rounded-full hover:bg-slate-100"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 origin-top-right"
                  >
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Notifications</h4>
                    <div className="space-y-3">
                      <div className="flex gap-3 text-sm">
                        <div className="text-blue-500 mt-0.5"><Award size={16} /></div>
                        <div>
                          <p className="font-bold text-slate-700">New lesson added!</p>
                          <p className="text-xs text-slate-500">Numbers 1 to 10 is ready.</p>
                        </div>
                      </div>
                      <div className="flex gap-3 text-sm">
                        <div className="text-amber-500 mt-0.5"><Star size={16} /></div>
                        <div>
                          <p className="font-bold text-slate-700">Continue learning</p>
                          <p className="text-xs text-slate-500">Pick up right where you left off.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile & Logout */}
            <div className="flex items-center gap-3 pl-3 sm:pl-6 border-l border-slate-200">
               <div className="flex items-center gap-2">
                 <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 border-2 border-white shadow-sm overflow-hidden">
                    <Image src="/assets/img/achievement.png" alt="Avatar" width={40} height={40} className="object-cover" />
                 </div>
                 <div className="hidden sm:block text-left">
                   <p className="text-sm font-bold text-slate-800 leading-tight">Arjun M.</p>
                   <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">LKG Explorer</p>
                 </div>
               </div>
               <button onClick={() => router.push('/')} className="p-2 text-slate-400 hover:text-rose-500 transition-colors bg-slate-50 hover:bg-rose-50 rounded-full">
                 <LogOut size={18} />
               </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── CONTENT AREA ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">

          {/* ============================================================== */}
          {/* VIEW: DASHBOARD                                                  */}
          {/* ============================================================== */}
          {view === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              {/* Top Banners / Motivation */}
              <div className="bg-gradient-to-r from-emerald-400 to-teal-500 rounded-[2rem] p-6 sm:p-8 text-white shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="absolute top-0 right-0 p-4 opacity-20"><Trophy size={120} /></div>
                <div className="relative z-10 text-center sm:text-left">
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-3 backdrop-blur-sm">Daily Reward</span>
                  <h1 className="text-2xl sm:text-4xl font-extrabold mb-1">Awesome job, Arjun! 🎉</h1>
                  <p className="font-medium text-emerald-50">You completed 3 lessons today! Keep going!</p>
                </div>
                <div className="relative z-10 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl flex-shrink-0">
                  <Star size={40} className="text-amber-400" fill="currentColor" />
                </div>
              </div>

              {/* 2. Dashboard Overview (Stats) */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { title: 'Total Lessons', value: '12', icon: Video, color: 'bg-blue-500' },
                  { title: 'Categories Started', value: '2', icon: Award, color: 'bg-purple-500' },
                  { title: 'Quizzes Won', value: '8', icon: Trophy, color: 'bg-amber-500' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-slate-100 flex items-center gap-4">
                     <div className={`w-14 h-14 rounded-2xl ${stat.color} text-white flex items-center justify-center shadow-md flex-shrink-0`}>
                       <stat.icon size={26} />
                     </div>
                     <div>
                       <p className="text-2xl font-extrabold text-slate-800 leading-none mb-1">{stat.value}</p>
                       <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">{stat.title}</p>
                     </div>
                  </div>
                ))}
              </div>

              {/* 3. Learning Categories */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
                    <Sparkles className="text-amber-500" /> Choose What to Learn
                  </h2>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {CATEGORIES.map((cat) => (
                    <motion.div
                      whileHover={{ scale: 1.03, y: -5 }}
                      whileTap={{ scale: 0.97 }}
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`bg-white rounded-[2rem] p-6 cursor-pointer border-2 ${cat.border} shadow-sm hover:shadow-xl transition-all relative overflow-hidden group`}
                    >
                       {/* Background decoration */}
                       <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-20 transition-transform group-hover:scale-150 ${cat.color.split(' ')[0]}`} />
                       
                       <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 text-2xl ${cat.color} shadow-inner relative z-10`}>
                          <cat.icon size={32} strokeWidth={2.5} />
                       </div>
                       
                       <h3 className="text-xl font-extrabold text-slate-800 mb-1">{cat.title}</h3>
                       <p className="text-sm font-bold text-slate-500 mb-5">{cat.lessons} fun lessons</p>
                       
                       {/* Progress Bar */}
                       <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                         <div 
                           className={`h-full rounded-full transition-all duration-1000 ${cat.color.split(' ')[0].replace('-100', '-500')}`}
                           style={{ width: `${cat.progress}%` }}
                         />
                       </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 7. Quick Progress Tracking */}
              <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm col-span-full">
                <h3 className="text-lg font-extrabold text-slate-800 mb-6">Your Learning Journey</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm font-bold text-slate-600 mb-2">
                      <span>Weekly Goal</span>
                      <span className="text-[#013237]">75%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-4 shadow-inner p-0.5">
                      <div className="bg-gradient-to-r from-[#013237] to-[#00D2FF] h-full rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================================================== */}
          {/* VIEW: CATEGORY LESSON LIST                                       */}
          {/* ============================================================== */}
          {view === 'category' && (
            <motion.div 
              key="category"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button 
                onClick={() => setView('dashboard')}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold mb-8 transition-colors bg-white px-5 py-2.5 rounded-full shadow-sm w-fit"
              >
                <ArrowLeft size={20} /> Back to Dashboard
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-sm ${CATEGORIES.find(c => c.id === activeCategory)?.color}`}>
                  {React.createElement(CATEGORIES.find(c => c.id === activeCategory)?.icon || Type, { size: 32 })}
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">{CATEGORIES.find(c => c.id === activeCategory)?.title}</h1>
                  <p className="text-slate-500 font-bold mt-1">Let's learn and have fun!</p>
                </div>
                
                {activeCategory === 'alpha' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={playAlphabetSong}
                    className="ml-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg"
                  >
                    <Sparkles size={18} /> Play ABC Song
                  </motion.button>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {LESSONS[activeCategory!]?.map((lesson, idx) => {
                  const isCompleted = lesson.status === 'completed';
                  return (
                    <motion.div 
                      key={lesson.id}
                      whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        speakText(lesson.title + '!');
                        setTimeout(() => handleLessonClick(lesson.id), 1800);
                      }}
                      className={`rounded-[3rem] p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer transition-all border-b-8 shadow-sm hover:shadow-xl ${lesson.color} ${lesson.border}`}
                    >
                      <div className="text-6xl sm:text-8xl drop-shadow-2xl mb-6 scale-110">
                        {lesson.emoji}
                      </div>
                      <h3 className={`text-xl sm:text-2xl font-black text-center leading-tight ${lesson.text}`}>
                        {lesson.title}
                      </h3>
                      {isCompleted && (
                        <div className="mt-4 bg-white/40 px-3 py-1 rounded-full flex items-center gap-1 text-emerald-600 text-[10px] font-black uppercase tracking-widest shadow-sm">
                          <CheckCircle size={12} /> Done
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* ============================================================== */}
          {/* VIEW: LESSON PLAYER                                              */}
          {/* ============================================================== */}
          {view === 'lesson' && (
            <motion.div 
              key="lesson"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={() => setView('category')}
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition-colors bg-white px-4 py-2 rounded-full shadow-sm"
                >
                  <ArrowLeft size={18} /> Back
                </button>
                <div className="flex items-center gap-2 bg-rose-100 text-rose-500 font-bold px-4 py-2 rounded-full text-sm">
                  <Volume2 size={18} /> Audio ON
                </div>
              </div>

              {/* 5. Video Player Mock */}
              <div className="w-full aspect-video bg-slate-900 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex items-center justify-center group mb-8">
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/50 via-slate-900 to-slate-900"></div>
                 
                 {/* Giant Play Sign Placeholder */}
                 <div className="text-center relative z-10 flex flex-col items-center">
                    <motion.div 
                      animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-8xl sm:text-9xl mb-8 drop-shadow-[0_10px_10px_rgba(255,255,255,0.3)]"
                    >
                      {getActiveLessonEmoji()}
                    </motion.div>
                    <p className="text-rose-400 font-extrabold text-2xl mb-4 tracking-widest uppercase">Playing Lesson</p>
                    <h2 className="text-5xl sm:text-7xl font-black text-white italic drop-shadow-2xl">{getActiveLessonTitle()}</h2>
                 </div>

                 {/* Play Control Overlay - REMOVED per user request */}
                 {/* <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <button 
                      onClick={playLessonAudio}
                      className="w-24 h-24 bg-white/20 hover:bg-white/30 border-2 border-white/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
                    >
                      <Play size={40} className="ml-2" fill="currentColor" />
                    </button>
                 </div> */}
                 
                 {/* Animated Progress Bar */}
                 <div className="absolute bottom-6 inset-x-8 h-3 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 4.5, ease: "linear" }}
                      className="h-full bg-rose-500 rounded-full relative"
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md"></div>
                    </motion.div>
                 </div>
              </div>

               {/* Action - REMOVED Take Quiz button as it is now automatic */}
               <div className="flex justify-between items-center bg-slate-100/50 p-6 rounded-[2rem] border-2 border-dashed border-slate-200">
                  <p className="text-slate-500 font-bold flex items-center gap-2">
                    <Sparkles className="text-amber-400" size={20} /> Starting Quiz soon...
                  </p>
                  <div className="flex items-center gap-2 text-rose-500 font-black animate-pulse">
                    READY? <ArrowLeft className="rotate-180" size={20} />
                  </div>
               </div>
            </motion.div>
          )}

          {/* ============================================================== */}
          {/* VIEW: ACTIVITY / QUIZ                                            */}
          {/* ============================================================== */}
          {view === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onViewportEnter={() => speakText("Quiz Time! " + getActiveLesson().quiz.question)}
              className="max-w-3xl mx-auto py-10"
            >
              <div className="bg-white rounded-[3rem] shadow-xl p-8 sm:p-14 text-center relative overflow-hidden border-4 border-slate-50">
                <h3 className="text-slate-400 font-black uppercase tracking-widest text-sm mb-4">Quiz Time!</h3>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 mb-12 drop-shadow-sm">
                  {getActiveLesson().quiz.question.split(' ').map((word, i) => (
                    <span key={i} className={word === getActiveLesson().quiz.correct ? 'text-sky-500' : ''}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                   {getActiveLesson().quiz.options.map((opt: any, i: number) => (
                     <motion.div 
                       key={i}
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                       onClick={() => {
                         if(opt.n === getActiveLesson().quiz.correct) {
                           handleQuizComplete();
                         } else {
                           speakText("That is a " + opt.n + ". Try again!");
                         }
                       }}
                       className={`aspect-square rounded-[2rem] border-4 ${opt.n === getActiveLesson().quiz.correct ? 'hover:border-sky-400' : 'hover:border-rose-400'} border-slate-100 bg-slate-50 flex flex-col items-center justify-center cursor-pointer shadow-sm transition-colors`}
                     >
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl mb-4 shadow-inner">
                           {opt.e}
                        </div>
                        <p className="font-extrabold text-xl text-slate-600">{opt.n}</p>
                     </motion.div>
                   ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================================================== */}
          {/* VIEW: SUCCESS / MOTIVATION                                       */}
          {/* ============================================================== */}
          {view === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onViewportEnter={() => speakText("Super Smart! You completed the quiz! Great job!")}
              className="max-w-2xl mx-auto py-20 text-center flex flex-col items-center block"
            >
               {/* Happy Animation Placeholder */}
               <motion.div 
                 animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="w-40 h-40 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 shadow-2xl border-8 border-white mb-8"
               >
                 <Check strokeWidth={4} size={80} />
               </motion.div>

               <h1 className="text-5xl font-extrabold text-slate-800 mb-4">Super Smart!</h1>
               <p className="text-xl font-bold text-slate-500 mb-12">
                 You found the <span className="text-indigo-600 underline decoration-wavy decoration-indigo-200">{getActiveLesson().quiz.correct}</span> very fast! 🚀
               </p>

               <div className="flex gap-4">
                 <button 
                   onClick={returnToDashboard}
                   className="px-8 py-4 rounded-full font-extrabold text-slate-600 bg-white border-2 border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
                 >
                   Back to Home
                 </button>
                 <button 
                   onClick={() => setView('category')}
                   className="bg-emerald-500 text-white px-8 py-4 rounded-full font-extrabold shadow-[0_15px_30px_-5px_rgba(16,185,129,0.4)] hover:-translate-y-1 transition-all"
                 >
                   Next Lesson
                 </button>
               </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

    </div>
  );
}
