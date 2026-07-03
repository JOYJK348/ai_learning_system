'use client';

import React, { useState, useRef, useMemo } from 'react';
import { Sparkles, CheckCircle } from 'lucide-react';
import { SimpleTraceCanvas } from './Grade1EnglishGames';

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&display=swap');.kf{font-family:'Baloo 2',sans-serif!important;}`;

type Props = {
  lessonTitle: string;
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type TeachCard = { letter: string; word: string; emoji: string };
type QuestionData = { question: string; options: string[]; target: string; emoji: string };

// ─── Teach data per lesson ───────────────────────────────────────────────────
function getTeachData(title: string): TeachCard[] | null {
  if (title.includes('पहचान') && title.includes('स्वर')) return [
    { letter: 'अ', word: 'अनार', emoji: '🍎' },
    { letter: 'आ', word: 'आम', emoji: '🥭' },
    { letter: 'इ', word: 'इमली', emoji: '🌿' },
    { letter: 'ई', word: 'ईख', emoji: '🎋' },
    { letter: 'उ', word: 'उल्लू', emoji: '🦉' },
    { letter: 'ऊ', word: 'ऊन', emoji: '🧶' },
    { letter: 'ए', word: 'एड़ी', emoji: '🦶' },
    { letter: 'ऐ', word: 'ऐनक', emoji: '👓' },
    { letter: 'ओ', word: 'ओखली', emoji: '🪨' },
    { letter: 'औ', word: 'औजार', emoji: '🔧' },
    { letter: 'अं', word: 'अंगूर', emoji: '🍇' },
    { letter: 'अः', word: 'अःहा', emoji: '😊' },
  ];
  if (title.includes('लिखना') && title.includes('स्वर')) return [
    { letter: 'अ', word: 'First vowel', emoji: '1️⃣' },
    { letter: 'आ', word: 'Second vowel', emoji: '2️⃣' },
    { letter: 'इ', word: 'Third vowel', emoji: '3️⃣' },
    { letter: 'ई', word: 'Fourth vowel', emoji: '4️⃣' },
    { letter: 'उ', word: 'Fifth vowel', emoji: '5️⃣' },
    { letter: 'ऊ', word: 'Sixth vowel', emoji: '6️⃣' },
  ];
  if (title.includes('picture')) return [
    { letter: 'अ', word: 'अनार', emoji: '🍎' },
    { letter: 'आ', word: 'आम', emoji: '🥭' },
    { letter: 'इ', word: 'इमली', emoji: '🌿' },
    { letter: 'ई', word: 'ईख', emoji: '🎋' },
    { letter: 'उ', word: 'उल्लू', emoji: '🦉' },
  ];
  // Lesson 1: First half of consonants — क to ञ
  if (title.includes('recognition') || title.includes('basic recognition')) return [
    { letter: 'क', word: 'कमल', emoji: '🌸' },
    { letter: 'ख', word: 'खरगोश', emoji: '🐰' },
    { letter: 'ग', word: 'गमला', emoji: '🪴' },
    { letter: 'घ', word: 'घर', emoji: '🏠' },
    { letter: 'ङ', word: 'ङ (rare)', emoji: '🔤' },
    { letter: 'च', word: 'चम्मच', emoji: '🥄' },
    { letter: 'छ', word: 'छाता', emoji: '☂️' },
    { letter: 'ज', word: 'जल', emoji: '💧' },
    { letter: 'झ', word: 'झंडा', emoji: '🚩' },
    { letter: 'ञ', word: 'ञ (rare)', emoji: '🔤' },
  ];
  // Lesson 2: Second half of consonants — ट to ज्ञ
  if (title.includes('लिखना') && title.includes('व्यंजन')) return [
    { letter: 'ट', word: 'टमाटर', emoji: '🍅' },
    { letter: 'ठ', word: 'ठंड', emoji: '🥶' },
    { letter: 'ड', word: 'डमरू', emoji: '🥁' },
    { letter: 'ढ', word: 'ढोल', emoji: '🪘' },
    { letter: 'त', word: 'तरबूज', emoji: '🍉' },
    { letter: 'थ', word: 'थैला', emoji: '👜' },
    { letter: 'द', word: 'दरवाज़ा', emoji: '🚪' },
    { letter: 'ध', word: 'धनुष', emoji: '🏹' },
    { letter: 'न', word: 'नल', emoji: '🚰' },
    { letter: 'प', word: 'पानी', emoji: '💧' },
    { letter: 'फ', word: 'फल', emoji: '🍎' },
    { letter: 'ब', word: 'बस', emoji: '🚌' },
    { letter: 'भ', word: 'भालू', emoji: '🐻' },
    { letter: 'म', word: 'मछली', emoji: '🐟' },
    { letter: 'य', word: 'यश', emoji: '⭐' },
    { letter: 'र', word: 'रोटी', emoji: '🫓' },
    { letter: 'ल', word: 'लड्डू', emoji: '🟡' },
    { letter: 'व', word: 'वन', emoji: '🌳' },
    { letter: 'श', word: 'शेर', emoji: '🦁' },
    { letter: 'ह', word: 'हाथी', emoji: '🐘' },
    { letter: 'क्ष', word: 'क्षमा', emoji: '🙏' },
    { letter: 'त्र', word: 'त्रिभुज', emoji: '🔺' },
    { letter: 'ज्ञ', word: 'ज्ञान', emoji: '📚' },
  ];
  if (title.includes('two letter words') || title.includes('two letter')) return [
    { letter: 'घ+र', word: 'घर', emoji: '🏠' },
    { letter: 'ज+ल', word: 'जल', emoji: '💧' },
    { letter: 'फ+ल', word: 'फल', emoji: '🍎' },
    { letter: 'ब+स', word: 'बस', emoji: '🚌' },
    { letter: 'न+ल', word: 'नल', emoji: '🚰' },
  ];
  if (title.includes('मिलाओ')) return [
    { letter: 'क+म', word: 'कम', emoji: '➕' },
    { letter: 'घ+र', word: 'घर', emoji: '🏠' },
    { letter: 'ज+ल', word: 'जल', emoji: '💧' },
    { letter: 'फ+ल', word: 'फल', emoji: '🍎' },
    { letter: 'ब+स', word: 'बस', emoji: '🚌' },
  ];
  if (title.includes('ा मात्रा')) return [
    { letter: 'क+ा', word: 'का', emoji: 'ा' },
    { letter: 'म+ा', word: 'मा', emoji: 'ा' },
    { letter: 'ग+ा+ना', word: 'गाना', emoji: '🎵' },
    { letter: 'आम', word: 'आम', emoji: '🥭' },
    { letter: 'क+ा+न', word: 'कान', emoji: '👂' },
  ];
  if (title.includes('ि / ी')) return [
    { letter: 'क+ि', word: 'कि', emoji: 'ि' },
    { letter: 'क+ी', word: 'की', emoji: 'ी' },
    { letter: 'मछली', word: 'Fish', emoji: '🐟' },
    { letter: 'किताब', word: 'Book', emoji: '📖' },
    { letter: 'चिड़िया', word: 'Bird', emoji: '🐦' },
  ];
  if (title.includes('ु / ू')) return [
    { letter: 'क+ु', word: 'कु', emoji: 'ु' },
    { letter: 'क+ू', word: 'कू', emoji: 'ू' },
    { letter: 'चूहा', word: 'Mouse', emoji: '🐭' },
    { letter: 'कुत्ता', word: 'Dog', emoji: '🐶' },
    { letter: 'फूल', word: 'Flower', emoji: '🌸' },
  ];
  if (title.includes('simple words reading') || title.includes('simple words')) return [
    { letter: 'कमल', word: 'Lotus', emoji: '🌸' },
    { letter: 'मछली', word: 'Fish', emoji: '🐟' },
    { letter: 'गमला', word: 'Flower Pot', emoji: '🪴' },
    { letter: 'घर', word: 'House', emoji: '🏠' },
    { letter: 'बस', word: 'Bus', emoji: '🚌' },
  ];
  if (title.includes('animals & fruits')) return [
    { letter: 'हाथी', word: 'Elephant', emoji: '🐘' },
    { letter: 'शेर', word: 'Lion', emoji: '🦁' },
    { letter: 'बंदर', word: 'Monkey', emoji: '🐒' },
    { letter: 'आम', word: 'Mango', emoji: '🥭' },
    { letter: 'सेब', word: 'Apple', emoji: '🍎' },
  ];
  if (title.includes('colors') || title.includes('body parts')) return [
    { letter: 'लाल', word: 'Red', emoji: '❤️' },
    { letter: 'हरा', word: 'Green', emoji: '💚' },
    { letter: 'पीला', word: 'Yellow', emoji: '💛' },
    { letter: 'आँख', word: 'Eye', emoji: '👀' },
    { letter: 'कान', word: 'Ear', emoji: '👂' },
  ];
  if (title.includes('objects')) return [
    { letter: 'किताब', word: 'Book', emoji: '📖' },
    { letter: 'गमला', word: 'Flower Pot', emoji: '🪴' },
    { letter: 'पानी', word: 'Water', emoji: '💧' },
    { letter: 'चम्मच', word: 'Spoon', emoji: '🥄' },
    { letter: 'पेड़', word: 'Tree', emoji: '🌳' },
  ];
  return null; // no teach screen for quiz-only lessons
}

// ─── Questions per lesson ─────────────────────────────────────────────────────
function getQuestions(title: string): QuestionData[] {
  if (title.includes('पहचान') && title.includes('स्वर')) return [
    { question: 'अनार (Pomegranate) किस अक्षर से शुरू होता है?', options: ['अ', 'आ', 'इ'], target: 'अ', emoji: '🍎' },
    { question: 'आम (Mango) किस अक्षर से शुरू होता है?', options: ['अ', 'आ', 'ई'], target: 'आ', emoji: '🥭' },
    { question: 'इमली (Tamarind) किस अक्षर से शुरू होता है?', options: ['इ', 'ई', 'उ'], target: 'इ', emoji: '🌿' },
    { question: 'ईख (Sugarcane) किस अक्षर से शुरू होता है?', options: ['इ', 'ई', 'ऊ'], target: 'ई', emoji: '🎋' },
    { question: 'उल्लू (Owl) किस अक्षर से शुरू होता है?', options: ['उ', 'ऊ', 'अ'], target: 'उ', emoji: '🦉' },
  ];
  if (title.includes('लिखना') && title.includes('स्वर')) return [
    { question: 'अ के बाद कौन सा स्वर आता है?', options: ['आ', 'इ', 'ई'], target: 'आ', emoji: '✍️' },
    { question: 'इ के बाद कौन सा स्वर आता है?', options: ['अ', 'आ', 'ई'], target: 'ई', emoji: '✍️' },
    { question: 'उ के बाद कौन सा स्वर आता है?', options: ['ऊ', 'ए', 'ऐ'], target: 'ऊ', emoji: '✍️' },
    { question: 'ई से पहले कौन सा स्वर आता है?', options: ['अ', 'इ', 'उ'], target: 'इ', emoji: '✍️' },
    { question: 'आ से पहले कौन सा स्वर आता है?', options: ['अ', 'इ', 'उ'], target: 'अ', emoji: '✍️' },
  ];
  if (title.includes('picture')) return [
    { question: 'अ से क्या होता है?', options: ['अनार 🍎', 'आम 🥭', 'इमली 🌿'], target: 'अनार 🍎', emoji: '🍎' },
    { question: 'आ से क्या होता है?', options: ['आम 🥭', 'अनार 🍎', 'उल्लू 🦉'], target: 'आम 🥭', emoji: '🥭' },
    { question: 'इ से क्या होता है?', options: ['इमली 🌿', 'ईख 🎋', 'आम 🥭'], target: 'इमली 🌿', emoji: '🌿' },
    { question: 'ई से क्या होता है?', options: ['ईख 🎋', 'इमली 🌿', 'उल्लू 🦉'], target: 'ईख 🎋', emoji: '🎋' },
    { question: 'उ से क्या होता है?', options: ['उल्लू 🦉', 'आम 🥭', 'अनार 🍎'], target: 'उल्लू 🦉', emoji: '🦉' },
  ];
  if (title.includes('recognition') || title.includes('basic recognition')) return [
    { question: 'कमल (Lotus) किस व्यंजन से शुरू होता है?', options: ['क', 'ख', 'ग'], target: 'क', emoji: '🌸' },
    { question: 'खरगोश (Rabbit) किस व्यंजन से शुरू होता है?', options: ['क', 'ख', 'घ'], target: 'ख', emoji: '🐰' },
    { question: 'गमला (Flower Pot) किस व्यंजन से शुरू होता है?', options: ['ग', 'घ', 'च'], target: 'ग', emoji: '🪴' },
    { question: 'घर (House) किस व्यंजन से शुरू होता है?', options: ['ग', 'घ', 'छ'], target: 'घ', emoji: '🏠' },
    { question: 'चम्मच (Spoon) किस व्यंजन से शुरू होता है?', options: ['च', 'छ', 'ज'], target: 'च', emoji: '🥄' },
  ];
  if (title.includes('लिखना') && title.includes('व्यंजन')) return [
    { question: 'तरबूज (Watermelon) किस व्यंजन से शुरू होता है?', options: ['त', 'थ', 'द'], target: 'त', emoji: '🍉' },
    { question: 'हाथी (Elephant) किस व्यंजन से शुरू होता है?', options: ['ह', 'श', 'स'], target: 'ह', emoji: '🐘' },
    { question: 'बस (Bus) किस व्यंजन से शुरू होता है?', options: ['ब', 'भ', 'म'], target: 'ब', emoji: '🚌' },
    { question: 'फल (Fruit) किस व्यंजन से शुरू होता है?', options: ['फ', 'प', 'ब'], target: 'फ', emoji: '🍎' },
    { question: 'शेर (Lion) किस व्यंजन से शुरू होता है?', options: ['श', 'ष', 'स'], target: 'श', emoji: '🦁' },
  ];
  if (title.includes('अक्षर पहचान')) return [
    { question: 'इस समूह में "क" अक्षर कौन सा है?', options: ['क', 'म', 'ल'], target: 'क', emoji: '🔍' },
    { question: 'इस समूह में "म" अक्षर कौन सा है?', options: ['ज', 'ल', 'म'], target: 'म', emoji: '🔍' },
    { question: 'इस समूह में "र" अक्षर कौन सा है?', options: ['घ', 'र', 'फ'], target: 'र', emoji: '🔍' },
    { question: 'इस समूह में "ल" अक्षर कौन सा है?', options: ['फ', 'ल', 'क'], target: 'ल', emoji: '🔍' },
    { question: 'इस समूह में "ज" अक्षर कौन सा है?', options: ['ज', 'ल', 'घ'], target: 'ज', emoji: '🔍' },
  ];
  if (title.includes('two letter words') || title.includes('two letter')) return [
    { question: 'अक्षरों को जोड़ें: घ + र', options: ['घर 🏠', 'जल 💧', 'फल 🍎'], target: 'घर 🏠', emoji: '🏠' },
    { question: 'अक्षरों को जोड़ें: ज + ल', options: ['घर 🏠', 'जल 💧', 'बस 🚌'], target: 'जल 💧', emoji: '💧' },
    { question: 'अक्षरों को जोड़ें: फ + ल', options: ['फल 🍎', 'बस 🚌', 'नल 🚰'], target: 'फल 🍎', emoji: '🍎' },
    { question: 'अक्षरों को जोड़ें: ब + स', options: ['बस 🚌', 'नल 🚰', 'घर 🏠'], target: 'बस 🚌', emoji: '🚌' },
    { question: 'अक्षरों को जोड़ें: न + ल', options: ['नल 🚰', 'बस 🚌', 'जल 💧'], target: 'नल 🚰', emoji: '🚰' },
  ];
  if (title.includes('मिलाओ')) return [
    { question: 'क + म मिलकर क्या बनेगा?', options: ['कम', 'कल', 'कर'], target: 'कम', emoji: '➕' },
    { question: 'घ + र मिलकर क्या बनेगा?', options: ['घर', 'चल', 'बस'], target: 'घर', emoji: '➕' },
    { question: 'ज + ल मिलकर क्या बनेगा?', options: ['जल', 'फल', 'नल'], target: 'जल', emoji: '➕' },
    { question: 'फ + ल मिलकर क्या बनेगा?', options: ['फल', 'जल', 'चल'], target: 'फल', emoji: '➕' },
    { question: 'ब + स मिलकर क्या बनेगा?', options: ['बस', 'कम', 'कर'], target: 'बस', emoji: '➕' },
  ];
  if (title.includes('missing letter') || title.includes('missing')) return [
    { question: 'क _ ल (कमल) में खाली जगह भरें:', options: ['म', 'ल', 'क'], target: 'म', emoji: '🌸' },
    { question: 'ग _ ला (गमला) में खाली जगह भरें:', options: ['म', 'ल', 'ग'], target: 'म', emoji: '🪴' },
    { question: 'म _ ली (मछली) में खाली जगह भरें:', options: ['छ', 'ज', 'ल'], target: 'छ', emoji: '🐟' },
    { question: 'ब _ न (बटन) में खाली जगह भरें:', options: ['ट', 'क', 'म'], target: 'ट', emoji: '🔘' },
    { question: 'म _ र (मगर) में खाली जगह भरें:', options: ['ग', 'ल', 'र'], target: 'ग', emoji: '🐊' },
  ];
  if (title.includes('arrange')) return [
    { question: 'अक्षरों को सही क्रम में रखें: ल, क', options: ['कल', 'लक'], target: 'कल', emoji: '🧩' },
    { question: 'अक्षरों को सही क्रम में रखें: र, घ', options: ['घर', 'रघ'], target: 'घर', emoji: '🧩' },
    { question: 'अक्षरों को सही क्रम में रखें: ल, ज', options: ['जल', 'लज'], target: 'जल', emoji: '🧩' },
    { question: 'अक्षरों को सही क्रम में रखें: ल, फ', options: ['फल', 'लफ'], target: 'फल', emoji: '🧩' },
    { question: 'अक्षरों को सही क्रम में रखें: स, ब', options: ['बस', 'सब'], target: 'बस', emoji: '🧩' },
  ];
  if (title.includes('complete')) return [
    { question: 'चित्र देखें और सही शब्द चुनें: 🏠', options: ['घर', 'जल', 'फल'], target: 'घर', emoji: '🏠' },
    { question: 'चित्र देखें और सही शब्द चुनें: 🚌', options: ['बस', 'नल', 'जल'], target: 'बस', emoji: '🚌' },
    { question: 'चित्र देखें और सही शब्द चुनें: 🍎', options: ['फल', 'घर', 'नल'], target: 'फल', emoji: '🍎' },
    { question: 'चित्र देखें और सही शब्द चुनें: 🚰', options: ['नल', 'बस', 'जल'], target: 'नल', emoji: '🚰' },
    { question: 'चित्र देखें और सही शब्द चुनें: 💧', options: ['जल', 'फल', 'बस'], target: 'जल', emoji: '💧' },
  ];
  if (title.includes('ा मात्रा')) return [
    { question: 'क + ा मिलकर क्या बनेगा?', options: ['का', 'की', 'कू'], target: 'का', emoji: 'ा' },
    { question: 'म + ा मिलकर क्या बनेगा?', options: ['मा', 'मी', 'मू'], target: 'मा', emoji: 'ा' },
    { question: 'ग + ा + न + ा = ?', options: ['गाना 🎵', 'गाम 🌾', 'गाल 👤'], target: 'गाना 🎵', emoji: '🎵' },
    { question: 'आ + म = ?', options: ['आम 🥭', 'अनार 🍎', 'इमली 🌿'], target: 'आम 🥭', emoji: '🥭' },
    { question: 'क + ा + न = ?', options: ['कान 👂', 'काम 💼', 'काल ⏰'], target: 'कान 👂', emoji: '👂' },
  ];
  if (title.includes('ि / ी')) return [
    { question: 'क + ि = ?', options: ['कि', 'की', 'के'], target: 'कि', emoji: 'ि' },
    { question: 'क + ी = ?', options: ['की', 'कि', 'कौ'], target: 'की', emoji: 'ी' },
    { question: 'म + छ + ल + ी = ?', options: ['मछली 🐟', 'मछल 🌊', 'मछला 🐟'], target: 'मछली 🐟', emoji: '🐟' },
    { question: 'क + ि + त + ा + ब = ?', options: ['किताब 📖', 'कितान 🌾', 'किताम 📖'], target: 'किताब 📖', emoji: '📖' },
    { question: 'च + ि + ड़ + ि + य + ा = ?', options: ['चिड़िया 🐦', 'चिड़िय 🐦', 'चिड़ी 🐦'], target: 'चिड़िया 🐦', emoji: '🐦' },
  ];
  if (title.includes('ु / ू')) return [
    { question: 'क + ु = ?', options: ['कु', 'कू', 'को'], target: 'कु', emoji: 'ु' },
    { question: 'क + ू = ?', options: ['कू', 'कु', 'कौ'], target: 'कू', emoji: 'ू' },
    { question: 'च + ू + ह + ा = ?', options: ['चूहा 🐭', 'चूह 🐭', 'चूही 🐭'], target: 'चूहा 🐭', emoji: '🐭' },
    { question: 'क + ु + त + ् + त + ा = ?', options: ['कुत्ता 🐶', 'कुत्त 🐶', 'कुत्ती 🐶'], target: 'कुत्ता 🐶', emoji: '🐶' },
    { question: 'फ + ू + ल = ?', options: ['फूल 🌸', 'फुल 🌸', 'फूला 🌸'], target: 'फूल 🌸', emoji: '🌸' },
  ];
  if (title.includes('simple words reading') || title.includes('simple words')) return [
    { question: '"कमल" पढ़ो — सही चित्र चुनो:', options: ['🌸', '🌹', '🪷'], target: '🌸', emoji: 'कमल' },
    { question: '"मछली" पढ़ो — सही चित्र चुनो:', options: ['🐟', '🐱', '🐦'], target: '🐟', emoji: 'मछली' },
    { question: '"गमला" पढ़ो — सही चित्र चुनो:', options: ['🪴', '📖', '🪑'], target: '🪴', emoji: 'गमला' },
    { question: '"घर" पढ़ो — सही चित्र चुनो:', options: ['🏠', '🚌', '🚰'], target: '🏠', emoji: 'घर' },
    { question: '"बस" पढ़ो — सही चित्र चुनो:', options: ['🚌', '🚗', '🚲'], target: '🚌', emoji: 'बस' },
  ];
  if (title.includes('word + picture')) return [
    { question: '"मछली" के लिए सही चित्र चुनें:', options: ['🐟', '🌸', '🪴'], target: '🐟', emoji: '🐟' },
    { question: '"कमल" के लिए सही चित्र चुनें:', options: ['🌸', '🪴', '📖'], target: '🌸', emoji: '🌸' },
    { question: '"गमला" के लिए सही चित्र चुनें:', options: ['🪴', '📖', '🐭'], target: '🪴', emoji: '🪴' },
    { question: '"किताब" के लिए सही चित्र चुनें:', options: ['📖', '🐭', '🐟'], target: '📖', emoji: '📖' },
    { question: '"चूहा" के लिए सही चित्र चुनें:', options: ['🐭', '🐟', '🌸'], target: '🐭', emoji: '🐭' },
  ];
  if (title.includes('यह फल है')) return [
    { question: '"यह फल है।" — सही चित्र चुनो:', options: ['🍎 फल', '🏠 घर', '🚌 बस'], target: '🍎 फल', emoji: 'यह फल है।' },
    { question: '"यह घर है।" — सही चित्र चुनो:', options: ['🏠 घर', '🍎 फल', '💧 जल'], target: '🏠 घर', emoji: 'यह घर है।' },
    { question: 'वाक्य पूरा करो (🚌): यह ___ है।', options: ['बस', 'घर', 'नल'], target: 'बस', emoji: '🚌' },
    { question: 'वाक्य पूरा करो (🍎): यह ___ है।', options: ['फल', 'बस', 'घर'], target: 'फल', emoji: '🍎' },
    { question: 'वाक्य पूरा करो (💧): यह ___ है।', options: ['जल', 'फल', 'घर'], target: 'जल', emoji: '💧' },
  ];
  if (title.includes('राम खेलता है')) return [
    { question: '"राम खेलता है।" — सही चित्र चुनो:', options: ['⚽ खेलना', '🛌 सोना', '🍽️ खाना'], target: '⚽ खेलना', emoji: 'राम खेलता है।' },
    { question: 'वाक्य पूरा करो (🍽️): राम ___ है।', options: ['खाता', 'खेलता', 'सोता'], target: 'खाता', emoji: '🍽️' },
    { question: 'वाक्य पूरा करो (🛌): राम ___ है।', options: ['सोता', 'खेलता', 'खाता'], target: 'सोता', emoji: '🛌' },
    { question: 'वाक्य पूरा करो (⚽): राम ___ है।', options: ['खेलता', 'खाता', 'सोता'], target: 'खेलता', emoji: '⚽' },
    { question: '"राम पढ़ता है।" — सही चित्र चुनो:', options: ['📖 पढ़ना', '⚽ खेलना', '🛌 सोना'], target: '📖 पढ़ना', emoji: 'राम पढ़ता है।' },
  ];
  if (title.includes('मेरा घर')) return [
    { question: '"मेरा घर।" — सही चित्र चुनो:', options: ['🏠 घर', '🏫 स्कूल', '🧸 खिलौना'], target: '🏠 घर', emoji: 'मेरा घर।' },
    { question: 'वाक्य पूरा करो: यह ___ घर है।', options: ['मेरा', 'तेरा', 'वह'], target: 'मेरा', emoji: '🏠' },
    { question: 'वाक्य पूरा करो: यह मेरा ___ है।', options: ['घर 🏠', 'स्कूल 🏫', 'खिलौना 🧸'], target: 'घर 🏠', emoji: '🏠' },
    { question: 'सही वाक्य चुनो:', options: ['यह मेरा घर है।', 'यह तेरा घर है।', 'वह मेरा घर है।'], target: 'यह मेरा घर है।', emoji: '🏠' },
    { question: 'वाक्य पूरा करो (📖): यह मेरी ___ है।', options: ['किताब', 'घर', 'स्कूल'], target: 'किताब', emoji: '📖' },
  ];
  if (title.includes('animals & fruits')) return [
    { question: 'हाथी का सही चित्र कौन सा है?', options: ['🐘 हाथी', '🦁 शेर', '🐒 बंदर'], target: '🐘 हाथी', emoji: '🐘' },
    { question: 'सेब का सही चित्र कौन सा है?', options: ['🍎 सेब', '🥭 आम', '🍌 केला'], target: '🍎 सेब', emoji: '🍎' },
    { question: 'शेर का सही चित्र कौन सा है?', options: ['🦁 शेर', '🐘 हाथी', '🐒 बंदर'], target: '🦁 शेर', emoji: '🦁' },
    { question: 'आम का सही चित्र कौन सा है?', options: ['🥭 आम', '🍎 सेब', '🍇 अंगूर'], target: '🥭 आम', emoji: '🥭' },
    { question: 'बंदर का सही चित्र कौन सा है?', options: ['🐒 बंदर', '🐘 हाथी', '🦁 शेर'], target: '🐒 बंदर', emoji: '🐒' },
  ];
  if (title.includes('colors') || title.includes('body parts')) return [
    { question: 'लाल रंग का सही चित्र कौन सा है?', options: ['❤️ लाल', '💚 हरा', '💛 पीला'], target: '❤️ लाल', emoji: '❤️' },
    { question: 'हरा रंग का सही चित्र कौन सा है?', options: ['💚 हरा', '❤️ लाल', '💙 नीला'], target: '💚 हरा', emoji: '💚' },
    { question: 'पीला रंग का सही चित्र कौन सा है?', options: ['💛 पीला', '💚 हरा', '❤️ लाल'], target: '💛 पीला', emoji: '💛' },
    { question: 'आँख का सही चित्र कौन सा है?', options: ['👀 आँख', '👂 कान', '👃 नाक'], target: '👀 आँख', emoji: '👀' },
    { question: 'कान का सही चित्र कौन सा है?', options: ['👂 कान', '👀 आँख', '👃 नाक'], target: '👂 कान', emoji: '👂' },
  ];
  if (title.includes('objects')) return [
    { question: 'किताब का सही चित्र कौन सा है?', options: ['📖 किताब', '🪴 गमला', '🥄 चम्मच'], target: '📖 किताब', emoji: '📖' },
    { question: 'गमला का सही चित्र कौन सा है?', options: ['🪴 गमला', '📖 किताब', '🌳 पेड़'], target: '🪴 गमला', emoji: '🪴' },
    { question: 'पानी का सही चित्र कौन सा है?', options: ['💧 पानी', '🪴 गमला', '🥄 चम्मच'], target: '💧 पानी', emoji: '💧' },
    { question: 'चम्मच का सही चित्र कौन सा है?', options: ['🥄 चम्मच', '📖 किताब', '🌳 पेड़'], target: '🥄 चम्मच', emoji: '🥄' },
    { question: 'पेड़ का सही चित्र कौन सा है?', options: ['🌳 पेड़', '🪴 गमला', '📖 किताब'], target: '🌳 पेड़', emoji: '🌳' },
  ];
  if (title.includes('poems')) return [
    { question: 'मछली जल की ___ है।', options: ['रानी', 'राजा', 'सहेली'], target: 'रानी', emoji: '🐟' },
    { question: '"मछली जल की रानी है" किसके बारे में है?', options: ['मछली 🐟', 'चिड़िया 🐦', 'तितली 🦋'], target: 'मछली 🐟', emoji: '🐟' },
    { question: 'तितली उड़ी, बस पर ___?', options: ['चढ़ी', 'उतरी', 'बैठी'], target: 'चढ़ी', emoji: '🦋' },
    { question: '"तितली उड़ी" में कौन उड़ा?', options: ['तितली 🦋', 'चिड़िया 🐦', 'मधुमक्खी 🐝'], target: 'तितली 🦋', emoji: '🦋' },
    { question: 'चंदा mama गोल ___?', options: ['मटोल', 'गोल', 'सफेद'], target: 'मटोल', emoji: '🌙' },
  ];
  if (title.includes('stories')) return [
    { question: '"कछुआ और खरगोश" में रेस किसने जीती?', options: ['कछुआ 🐢', 'खरगोश 🐰', 'शेर 🦁'], target: 'कछुआ 🐢', emoji: '🐢' },
    { question: 'कौन घमंड में सो गया?', options: ['खरगोश 🐰', 'कछुआ 🐢', 'बंदर 🐒'], target: 'खरगोश 🐰', emoji: '🐰' },
    { question: '"शेर और चूहा" में शेर को किसने बचाया?', options: ['चूहा 🐭', 'बंदर 🐒', 'खरगोश 🐰'], target: 'चूहा 🐭', emoji: '🐭' },
    { question: 'शिकारी के जाल में कौन फंसा?', options: ['शेर 🦁', 'चूहा 🐭', 'हाथी 🐘'], target: 'शेर 🦁', emoji: '🦁' },
    { question: 'इन कहानियों से क्या सीख मिलती है?', options: ['दूसरों की मदद करना अच्छा है 👍', 'रेस जीतना सबसे ज़रूरी है 🏆', 'घमंड करना अच्छा है ❌'], target: 'दूसरों की मदद करना अच्छा है 👍', emoji: '🤝' },
  ];
  if (title.includes('listening')) return [
    { question: 'सुनना (Listen) का सही शब्द:', options: ['सुनना 👂', 'देखना 👀', 'खाना 🍽️'], target: 'सुनना 👂', emoji: '👂' },
    { question: 'देखना (See) का सही शब्द:', options: ['देखना 👀', 'सुनना 👂', 'सोना 🛌'], target: 'देखना 👀', emoji: '👀' },
    { question: 'खाना (Eat) का सही शब्द:', options: ['खाना 🍽️', 'दौड़ना 🏃', 'सोना 🛌'], target: 'खाना 🍽️', emoji: '🍽️' },
    { question: 'दौड़ना (Run) का सही शब्द:', options: ['दौड़ना 🏃', 'खाना 🍽️', 'सोना 🛌'], target: 'दौड़ना 🏃', emoji: '🏃' },
    { question: 'सोना (Sleep) का सही शब्द:', options: ['सोना 🛌', 'देखना 👀', 'सुनना 👂'], target: 'सोना 🛌', emoji: '🛌' },
  ];
  if (title.includes('find the letter')) return [
    { question: 'अक्षर "अ" को पहचानें:', options: ['अ', 'आ', 'इ'], target: 'अ', emoji: '🔍' },
    { question: 'अक्षर "क" को पहचानें:', options: ['क', 'ख', 'ग'], target: 'क', emoji: '🔍' },
    { question: 'अक्षर "म" को पहचानें:', options: ['म', 'ल', 'र'], target: 'म', emoji: '🔍' },
    { question: 'अक्षर "ज" को पहचानें:', options: ['ज', 'ल', 'घ'], target: 'ज', emoji: '🔍' },
    { question: 'अक्षर "ल" को पहचानें:', options: ['ल', 'क', 'म'], target: 'ल', emoji: '🔍' },
  ];
  if (title.includes('match word')) return [
    { question: '"आम" के लिए सही चित्र:', options: ['🥭 आम', '🏠 घर', '🚰 नल'], target: '🥭 आम', emoji: 'आम' },
    { question: '"घर" के लिए सही चित्र:', options: ['🏠 घर', '🥭 आम', '🚌 बस'], target: '🏠 घर', emoji: 'घर' },
    { question: '"नल" के लिए सही चित्र:', options: ['🚰 नल', '🏠 घर', '💧 जल'], target: '🚰 नल', emoji: 'नल' },
    { question: '"बस" के लिए सही चित्र:', options: ['🚌 बस', '🚰 नल', '🏠 घर'], target: '🚌 बस', emoji: 'बस' },
    { question: '"सेब" के लिए सही चित्र:', options: ['🍎 सेब', '🥭 आम', '🍉 तरबूज'], target: '🍎 सेब', emoji: 'सेब' },
  ];
  if (title.includes('odd one out')) return [
    { question: 'Odd consonant: अ, आ, क', options: ['क', 'अ', 'आ'], target: 'क', emoji: '🔍' },
    { question: 'Odd vowel: क, ख, इ', options: ['इ', 'क', 'ख'], target: 'इ', emoji: '🔍' },
    { question: 'Odd word: आम, सेब, घर', options: ['घर', 'आम', 'सेब'], target: 'घर', emoji: '🏠' },
    { question: 'Odd word: हाथी, बंदर, गुलाब', options: ['गुलाब', 'हाथी', 'बंदर'], target: 'गुलाब', emoji: '🌹' },
    { question: 'Odd word: लाल, हरा, किताब', options: ['किताब', 'लाल', 'हरा'], target: 'किताब', emoji: '📖' },
  ];
  if (title.includes('memory')) return [
    { question: 'अ का सही जोड़ा:', options: ['अनार 🍎', 'आम 🥭', 'इमली 🌿'], target: 'अनार 🍎', emoji: 'अ' },
    { question: 'आ का सही जोड़ा:', options: ['आम 🥭', 'अनार 🍎', 'उल्लू 🦉'], target: 'आम 🥭', emoji: 'आ' },
    { question: 'क का सही जोड़ा:', options: ['कमल 🌸', 'गमला 🪴', 'मछली 🐟'], target: 'कमल 🌸', emoji: 'क' },
    { question: 'ग का सही जोड़ा:', options: ['गमला 🪴', 'कमल 🌸', 'मछली 🐟'], target: 'गमला 🪴', emoji: 'ग' },
    { question: 'म का सही जोड़ा:', options: ['मछली 🐟', 'कमल 🌸', 'गमला 🪴'], target: 'मछली 🐟', emoji: 'म' },
  ];
  if (title.includes('trace')) return [
    { question: 'हिंदी अक्षरों के ऊपर कौन सी रेखा होती है?', options: ['शिरोरेखा', 'समतल रेखा', 'कोई नहीं'], target: 'शिरोरेखा', emoji: '✍️' },
    { question: 'किस अक्षर के ऊपर लूप होती है?', options: ['ई', 'अ', 'आ'], target: 'ई', emoji: 'ी' },
    { question: 'झंडा जैसा दिखने वाला अक्षर:', options: ['झ', 'क', 'म'], target: 'झ', emoji: 'झ' },
    { question: 'अ लिखने का सही तरीका:', options: ['घुमावदार → आड़ी → खड़ी रेखा', 'सीधी खड़ी रेखा', 'केवल एक गोला'], target: 'घुमावदार → आड़ी → खड़ी रेखा', emoji: '✍️' },
    { question: '"कृ" के नीचे कौन सी मात्रा है?', options: ['ऋ की मात्रा', 'उ की मात्रा', 'ा की मात्रा'], target: 'ऋ की मात्रा', emoji: 'कृ' },
  ];
  return [
    { question: 'सेब (Apple) के लिए सही चित्र:', options: ['🍎', '🥭', '🍉'], target: '🍎', emoji: '🍎' },
  ];
}

const SWAR_LIKHEN_LETTERS = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ'];

export default function UkgHindiQuiz({ lessonTitle, onComplete }: Props) {
  const t0 = useRef(Date.now());
  const title = lessonTitle.toLowerCase();
  const isSwarLikhen = title.includes('लिखना') && title.includes('स्वर');

  const [traceIndex, setTraceIndex] = useState(0);
  const [tracedLetters, setTracedLetters] = useState<Set<string>>(new Set());

  // ── SWAR LIKHEN TRACE ────────────────────────────────────────────────────────
  if (isSwarLikhen) {
    const currentSwar = SWAR_LIKHEN_LETTERS[traceIndex];
    const allTraced = tracedLetters.size === SWAR_LIKHEN_LETTERS.length;

    const handleTraceComplete = () => {
      const next = new Set(tracedLetters);
      next.add(currentSwar);
      setTracedLetters(next);
      if (traceIndex + 1 < SWAR_LIKHEN_LETTERS.length) {
        setTraceIndex(traceIndex + 1);
      }
    };

    return (
      <div className="kf flex flex-col items-center gap-4 w-full max-w-2xl mx-auto px-2 select-none">
        <style dangerouslySetInnerHTML={{ __html: FONT }} />
        <div className="text-center">
          <h2 className="text-2xl font-black text-indigo-950 flex items-center justify-center gap-2">
            ✏️ हिंदी स्वर Trace Board
          </h2>
          <p className="text-xs font-black text-indigo-900/40 uppercase tracking-widest mt-1">
            Trace each vowel! ({tracedLetters.size} / {SWAR_LIKHEN_LETTERS.length} Done)
          </p>
        </div>
        <div className="w-full bg-indigo-50/40 rounded-full h-3 border border-indigo-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${(tracedLetters.size / SWAR_LIKHEN_LETTERS.length) * 100}%` }}
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-indigo-900/50 uppercase tracking-wider">Vowel {traceIndex + 1} of {SWAR_LIKHEN_LETTERS.length}</span>
          <span className="text-3xl font-black text-amber-700 bg-amber-50 border-2 border-amber-200 rounded-2xl px-5 py-1">{currentSwar}</span>
        </div>
        <div className="w-full">
          <SimpleTraceCanvas key={currentSwar} letter={currentSwar} onComplete={handleTraceComplete} />
        </div>
        {allTraced && (
          <button onClick={() => onComplete({ score: 100, max_score: 100, completion_data: { traced_count: tracedLetters.size }, time_taken_seconds: Math.round((Date.now() - t0.current) / 1000) })}
            className="w-full max-w-xs inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-lg shadow-xl bg-emerald-500 hover:bg-emerald-600 text-white border-b-4 border-emerald-700 cursor-pointer active:scale-95 animate-pulse transition-all">
            <CheckCircle size={22} /> All Done! 🎉
          </button>
        )}
      </div>
    );
  }

  const teachCards = useMemo(() => getTeachData(title), [title]);
  const questions = useMemo(() => getQuestions(title), [title]);

  const [phase, setPhase] = useState<'teach' | 'quiz'>(teachCards ? 'teach' : 'quiz');
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [done, setDone] = useState(false);

  const current = questions[qIdx];
  const shuffledOptions = useMemo(() => [...current.options].sort(() => Math.random() - 0.5), [current]);

  const handlePick = (opt: string) => {
    if (picked || done) return;
    setPicked(opt);
    if (opt === current.target) {
      setScore(s => s + 1);
      setCorrect(true);
      setTimeout(() => {
        setCorrect(false);
        setPicked(null);
        if (qIdx < questions.length - 1) setQIdx(i => i + 1);
        else setDone(true);
      }, 1100);
    } else {
      setWrong(true);
      setTimeout(() => { setWrong(false); setPicked(null); }, 800);
    }
  };

  // ── TEACH PHASE ─────────────────────────────────────────────────────────────
  if (phase === 'teach' && teachCards) {
    return (
      <div className="kf flex flex-col items-center gap-4 px-3 py-3 w-full max-w-md mx-auto select-none">
        <style dangerouslySetInnerHTML={{ __html: FONT }} />
        <div className="w-full flex items-center justify-between px-1">
          <span className="text-xs font-black text-orange-600 uppercase tracking-widest px-3 py-1 bg-orange-50 rounded-full border border-orange-100">🇮🇳 हिन्दी</span>
          <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">सीखो ✨</span>
        </div>

        <h2 className="text-xl font-black text-indigo-950 text-center leading-snug">
          {title.includes('लिखना') && title.includes('व्यंजन')
            ? 'व्यंजन भाग 2 (ट - ज्ञ)'
            : title.includes('recognition') || title.includes('basic recognition')
            ? 'व्यंजन भाग 1 (क - ञ)'
            : title.includes('पहचान') && title.includes('स्वर')
            ? 'हिंदी स्वर (अ - अः)'
            : title.includes('लिखना') && title.includes('स्वर')
            ? 'स्वर क्रम सीखो'
            : title.includes('picture')
            ? 'स्वर + चित्र'
            : lessonTitle}
        </h2>
        <p className="text-xs font-bold text-indigo-400 -mt-2">इन्हें ध्यान से देखो, फिर खेलो 👇</p>

        {/* Cards grid */}
        <div className="w-full grid grid-cols-3 gap-2">
          {teachCards.map((card, i) => (
            <div key={i} className="flex flex-col items-center gap-1 bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-3 shadow-sm">
              <span className="text-3xl">{card.emoji}</span>
              <span className="text-xl font-black text-indigo-900">{card.letter}</span>
              <span className="text-[10px] font-bold text-indigo-500 text-center leading-tight">{card.word}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setPhase('quiz')}
          className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl font-black text-lg shadow-xl border-b-4 border-orange-700 active:scale-95 cursor-pointer mt-1"
        >
          🎮 खेलने के लिए तैयार!
        </button>
      </div>
    );
  }

  // ── DONE ────────────────────────────────────────────────────────────────────
  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="kf flex flex-col items-center gap-5 px-6 py-10 text-center">
        <style dangerouslySetInnerHTML={{ __html: FONT }} />
        <span className="text-8xl">🏆</span>
        <h2 className="text-3xl font-black text-indigo-950">बहुत बढ़िया!</h2>
        <p className="text-lg font-bold text-indigo-400 -mt-2">You got {score}/{questions.length} correct! 🌟</p>
        <button onClick={() => onComplete({ score: pct, max_score: 100, completion_data: { score, total: questions.length }, time_taken_seconds: Math.round((Date.now() - t0.current) / 1000) })}
          className="w-full max-w-xs py-4 bg-emerald-500 text-white rounded-2xl font-black text-lg shadow-xl border-b-4 border-emerald-700 active:scale-95 cursor-pointer">
          Continue ➡️
        </button>
      </div>
    );
  }

  // ── QUIZ PHASE ───────────────────────────────────────────────────────────────
  return (
    <div className="kf flex flex-col items-center gap-4 px-3 py-2 w-full max-w-md mx-auto select-none">
      <style dangerouslySetInnerHTML={{ __html: FONT }} />

      <div className="w-full flex items-center justify-between px-1">
        <span className="text-sm font-black text-indigo-400">Q {qIdx + 1}/{questions.length}</span>
        <span className="text-xs font-black text-orange-600 uppercase tracking-widest px-3 py-1 bg-orange-50 rounded-full border border-orange-100">🇮🇳 हिन्दी</span>
      </div>

      <h3 className="text-lg font-black text-indigo-950 text-center leading-snug px-2">{current.question}</h3>

      {/* Progress dots */}
      <div className="flex gap-1.5">
        {questions.map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full border-2 transition-all ${i < qIdx ? 'bg-emerald-500 border-emerald-600' : i === qIdx ? 'bg-indigo-600 border-indigo-700 ring-2 ring-indigo-300' : 'bg-white border-slate-200'}`} />
        ))}
      </div>

      {/* Visual board — shows emoji or Hindi sentence/word */}
      <div className="w-full bg-amber-50 border-4 border-amber-200 rounded-3xl p-5 shadow flex items-center justify-center min-h-[8rem]">
        {/[\u0900-\u097F]/.test(current.emoji)
          ? <span className="text-3xl font-black text-indigo-950 text-center leading-snug">{current.emoji}</span>
          : <span className="text-7xl">{current.emoji}</span>
        }
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2.5 w-full">
        {shuffledOptions.map(opt => {
          const sel = picked === opt;
          const isRight = opt === current.target;
          let cls = 'bg-white text-indigo-950 border-slate-200 hover:bg-orange-50/40';
          if (sel && isRight) cls = 'bg-emerald-100 text-emerald-700 border-emerald-400';
          else if (sel && !isRight) cls = 'bg-red-100 text-red-700 border-red-300';
          return (
            <button key={opt} onClick={() => handlePick(opt)} disabled={!!picked}
              className={`w-full py-4 px-6 rounded-2xl border-2 text-base font-black text-left shadow-sm cursor-pointer active:scale-98 transition-all ${cls}`}>
              {opt}
            </button>
          );
        })}
      </div>

      <div className="min-h-[22px] flex items-center justify-center">
        {correct ? <p className="text-sm font-black text-emerald-600 flex items-center gap-1"><Sparkles size={14} /> सही! बहुत बढ़िया! 🎉</p>
          : wrong ? <p className="text-sm font-black text-red-500">🙅 फिर से प्रयास करें!</p>
          : <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">सही उत्तर चुनें</p>}
      </div>
    </div>
  );
}
