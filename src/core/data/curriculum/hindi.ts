import { type TutorialStep } from './english';

export function getChapterVisuals(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('स्वर') || lower.includes('vowel'))
    return { emoji: '🅰️', mascot: 'अ', color: 'from-rose-400 to-red-500', sound: 'Hindi Vowels!', image: '/assets/subjects/hindi_vowels-removebg-preview.png' };
  if (lower.includes('व्यंजन') || lower.includes('consonant'))
    return { emoji: '🦁', mascot: 'क', color: 'from-amber-400 to-orange-500', sound: 'Hindi Consonants!', image: '/assets/subjects/hindi_consonants-removebg-preview.png' };
  if (lower.includes('शब्द') || lower.includes('word') || lower.includes('सरल'))
    return { emoji: '🏠', mascot: 'घर', color: 'from-lime-400 to-green-500', sound: 'Simple Hindi Words!', image: '/assets/subjects/hindi_simple_words-removebg-preview.png' };
  if (lower.includes('बोलना') || lower.includes('greetings') || lower.includes('manner'))
    return { emoji: '🙏', mascot: 'नम', color: 'from-cyan-400 to-blue-500', sound: 'Greetings and Manners!', image: '/assets/subjects/hindi_greetings-removebg-preview.png' };
  if (lower.includes('कविता') || lower.includes('कहानी') || lower.includes('poem') || lower.includes('story'))
    return { emoji: '🎶', mascot: '🐟', color: 'from-pink-400 to-rose-500', sound: 'Poems and Stories!', image: '/assets/subjects/tamil_songs_stories-removebg-preview.png' };
  if (lower.includes('पहचान') || lower.includes('identify') || lower.includes('quiz') || lower.includes('चित्र'))
    return { emoji: '🎯', mascot: '🔍', color: 'from-violet-400 to-purple-500', sound: 'Picture Identification!', image: '/assets/subjects/english_checkpoint-removebg-preview.png' };
  return { emoji: '🇮🇳', mascot: 'ह', color: 'from-rose-400 to-red-500', sound: `${name}!` };
}

export function getLessonVisuals(title: string) {
  const lower = title.toLowerCase();
  
  if (lower.includes('अ') && lower.includes('आ')) {
    return { emoji: '🍎', mascot: '🍎', color: 'from-rose-400 to-orange-500', sound: 'Anar and Aam!', image: '/assets/subjects/hindi_vowels-removebg-preview.png' };
  }
  
  if ((lower.includes('इ') && lower.includes('ऊ')) || lower.includes('इ से ऊ') || lower.includes('इ से')) {
    return { emoji: '🦉', mascot: '🦉', color: 'from-purple-400 to-fuchsia-500', sound: 'Imli, Eekh, Ullu!', image: '/assets/subjects/hindi_vowels-removebg-preview.png' };
  }

  if (lower.includes('क') && lower.includes('ख')) {
    return { emoji: '🐦', mascot: '🐦', color: 'from-amber-400 to-orange-500', sound: 'Kabootar, Khargosh!', image: '/assets/subjects/hindi_consonants-removebg-preview.png' };
  }

  if (lower.includes('च') && lower.includes('छ')) {
    return { emoji: '☂️', mascot: '☂️', color: 'from-teal-400 to-emerald-500', sound: 'Chammach, Chhatri!', image: '/assets/subjects/hindi_consonants-removebg-preview.png' };
  }

  if (lower.includes('घर') && lower.includes('फल')) {
    return { emoji: '🏠', mascot: '🏠', color: 'from-lime-400 to-green-500', sound: 'Ghar and Phal!', image: '/assets/subjects/hindi_simple_words-removebg-preview.png' };
  }

  if (lower.includes('जल') && lower.includes('वन')) {
    return { emoji: '💧', mascot: '🌳', color: 'from-cyan-400 to-blue-500', sound: 'Jal and Van!', image: '/assets/subjects/hindi_simple_words-removebg-preview.png' };
  }

  if (lower.includes('नमस्ते') || lower.includes('परिचय') || lower.includes('introduction')) {
    return { emoji: '🙏', mascot: '🙏', color: 'from-cyan-400 to-blue-500', sound: 'Namaste!', image: '/assets/subjects/hindi_greetings-removebg-preview.png' };
  }

  if (lower.includes('परिवार') || lower.includes('family') || lower.includes('मेरा')) {
    return { emoji: '👨‍👩‍👧‍👦', mascot: '👨‍👩‍👧‍👦', color: 'from-pink-400 to-rose-500', sound: 'Mera Parivar!', image: '/assets/subjects/hindi_greetings-removebg-preview.png' };
  }

  if (lower.includes('कविता') || lower.includes('rhymes') || lower.includes('poem')) {
    return { emoji: '🎵', mascot: '🎵', color: 'from-pink-400 to-rose-500', sound: 'Kavita!', image: '/assets/subjects/hindi_simple_words-removebg-preview.png' };
  }

  if (lower.includes('कहानी') || lower.includes('story') || lower.includes('कहानियाँ')) {
    return { emoji: '📖', mascot: '🧚', color: 'from-purple-400 to-indigo-500', sound: 'Kahani!', image: '/assets/subjects/hindi_simple_words-removebg-preview.png' };
  }

  if (lower.includes('जानवर') || lower.includes('animal') || lower.includes('identify animal')) {
    return { emoji: '🐾', mascot: '🐱', color: 'from-orange-400 to-amber-500', sound: 'Janvar Pehchan!', image: '/assets/subjects/hindi_consonants-removebg-preview.png' };
  }

  if (lower.includes('चीज़ें') || lower.includes('things') || lower.includes('आस-पास')) {
    return { emoji: '🔍', mascot: '🔍', color: 'from-sky-400 to-blue-500', sound: 'Aas-Pas Ki Chizen!', image: '/assets/subjects/hindi_simple_words-removebg-preview.png' };
  }

  // Vowels fallback
  if (lower.includes('स्वर') || lower.includes('vowel')) {
    return { emoji: '🅰️', mascot: 'अ', color: 'from-rose-400 to-red-500', sound: 'Hindi Vowels!', image: '/assets/subjects/hindi_vowels-removebg-preview.png' };
  }

  // Consonants fallback
  if (lower.includes('व्यंजन') || lower.includes('consonant')) {
    return { emoji: '🦁', mascot: 'क', color: 'from-amber-400 to-orange-500', sound: 'Hindi Consonants!', image: '/assets/subjects/hindi_consonants-removebg-preview.png' };
  }

  return { emoji: '📚', mascot: '📖', color: 'from-indigo-400 to-purple-500', sound: `${title}!`, image: '/assets/subjects/hindi-removebg-preview.png' };
}

