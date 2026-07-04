import { type TutorialStep } from '../english';

export function getChapterVisuals(name: string) {
  const lower = name.toLowerCase();
  
  if (lower.includes('वर्णमाला') || lower.includes('alphabet') || lower.includes('vowel') || lower.includes('consonant') || lower.includes('revision'))
    return { emoji: '🇮🇳', mascot: 'अ', color: 'from-rose-400 to-orange-500', sound: 'Hindi Varnamala!', image: '/assets/subjects/hindi_vowels-removebg-preview.png' };
  
  if (lower.includes('मात्रा') || lower.includes('शब्द निर्माण') || lower.includes('word build') || lower.includes('word form'))
    return { emoji: '🧱', mascot: 'क', color: 'from-amber-400 to-orange-500', sound: 'Hindi Words!', image: '/assets/subjects/hindi_simple_words-removebg-preview.png' };
  
  if (lower.includes('शब्द भंडार') || lower.includes('व्याकरण') || lower.includes('वाक्य') || lower.includes('पठन') || lower.includes('लेखन') || lower.includes('पुनरावृत्ति') || lower.includes('खेल') || lower.includes('grammar') || lower.includes('reading') || lower.includes('writing'))
    return { emoji: '🙏', mascot: 'घर', color: 'from-lime-400 to-green-500', sound: 'Hindi Grammar & Sentences!', image: '/assets/subjects/hindi_greetings-removebg-preview.png' };

  return { emoji: '🇮🇳', mascot: 'अ', color: 'from-rose-400 to-orange-500', sound: 'Grade 1 Hindi!', image: '/assets/subjects/hindi-removebg-preview.png' };
}

export function getLessonVisuals(title: string) {
  const lower = title.toLowerCase();

  const vowelsImg = '/assets/subjects/hindi_vowels-removebg-preview.png';
  const consonantsImg = '/assets/subjects/hindi_consonants-removebg-preview.png';
  const wordsImg = '/assets/subjects/hindi_simple_words-removebg-preview.png';
  const greetingsImg = '/assets/subjects/hindi_greetings-removebg-preview.png';

  if (lower.includes('स्वर') || lower.includes('vowel') || lower.includes('वर्णमाला') || lower.includes('alphabet') || lower.includes('revision'))
    return { emoji: '🅰️', mascot: 'अ', color: 'from-rose-450 to-pink-500', sound: `${title}!`, image: vowelsImg };
  
  if (lower.includes('व्यंजन') || lower.includes('consonant'))
    return { emoji: '🦁', mascot: 'क', color: 'from-amber-400 to-orange-500', sound: `${title}!`, image: consonantsImg };
  
  if (lower.includes('शब्द') || lower.includes('निर्माण') || lower.includes('अक्षर') || lower.includes('word') || lower.includes('मात्रा'))
    return { emoji: '🧱', mascot: 'घर', color: 'from-lime-400 to-green-500', sound: `${title}!`, image: wordsImg };
  
  if (lower.includes('वाक्य') || lower.includes('व्याकरण') || lower.includes('पठन') || lower.includes('लेखन') || lower.includes('पुनरावृत्ति') || lower.includes('खेल') || lower.includes('greetings') || lower.includes('manners') || lower.includes('story') || lower.includes('poem'))
    return { emoji: '🙏', mascot: 'नमस्ते', color: 'from-cyan-400 to-blue-500', sound: `${title}!`, image: greetingsImg };

  return { emoji: '✏️', mascot: '✍️', color: 'from-rose-400 to-red-500', sound: 'Ready!', image: '/assets/subjects/hindi-removebg-preview.png' };
}

export function buildTutorial(title: string, studentName?: string): TutorialStep[] {
  const name = studentName || 'Explorer';
  return [
    { title: 'Ready', speak: `Hi ${name}! Welcome to Grade 1 Hindi class!`, emoji: '✨', anim: 'jump' },
  ];
}
