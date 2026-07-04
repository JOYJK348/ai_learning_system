import { type TutorialStep } from '../english';

export function getChapterVisuals(name: string) {
  const lower = name.toLowerCase();

  if (lower.includes('எழுத்து') || lower.includes('strokes') || lower.includes('alphabet') || lower.includes('letters'))
    return { emoji: '✍️', mascot: '🖍️', color: 'from-amber-400 to-orange-500', sound: 'Tamil Letters!', image: '/assets/subjects/tamil_writing_strokes-removebg-preview.png' };
  
  if (lower.includes('உயிர்மெய்') || lower.includes('உயிர்') || lower.includes('மெய்') || lower.includes('பயணம்') || lower.includes('vowels') || lower.includes('consonants'))
    return { emoji: '🍎', mascot: 'அ', color: 'from-red-400 to-rose-500', sound: 'Tamil Uyir & Mei letters!', image: '/assets/subjects/tamil_vowels_1-removebg-preview.png' };
  
  if (lower.includes('சொல்') || lower.includes('கட்டிடம்') || lower.includes('words'))
    return { emoji: '🗣️', mascot: 'சொல்', color: 'from-emerald-400 to-teal-500', sound: 'Tamil Simple Words!', image: '/assets/subjects/tamil_simple_words-removebg-preview.png' };
  
  if (lower.includes('வாசிப்பு') || lower.includes('இலக்கண') || lower.includes('தோட்டம்') || lower.includes('grammar') || lower.includes('reading'))
    return { emoji: '📚', mascot: 'த', color: 'from-cyan-400 to-blue-500', sound: 'Tamil Grammar & Reading!', image: '/assets/subjects/tamil-removebg-preview.png' };
  
  if (lower.includes('பாடல்') || lower.includes('கதை') || lower.includes('song') || lower.includes('story') || lower.includes('rhymes'))
    return { emoji: '🎵', mascot: '🎶', color: 'from-pink-400 to-rose-500', sound: 'Tamil Songs & Stories!', image: '/assets/subjects/tamil_songs_stories-removebg-preview.png' };

  return { emoji: '📚', mascot: 'த', color: 'from-cyan-400 to-blue-500', sound: 'Grade 1 Tamil!', image: '/assets/subjects/tamil-removebg-preview.png' };
}

export function getLessonVisuals(title: string) {
  const lower = title.toLowerCase();

  const strokesImg = '/assets/subjects/tamil_writing_strokes-removebg-preview.png';
  const vowelsImg1 = '/assets/subjects/tamil_vowels_1-removebg-preview.png';
  const vowelsImg2 = '/assets/subjects/tamil_vowels_2-removebg-preview.png';
  const consonantsImg1 = '/assets/subjects/tamil_consonants_1-removebg-preview.png';
  const consonantsImg2 = '/assets/subjects/tamil_consonants_2-removebg-preview.png';
  const wordsImg = '/assets/subjects/tamil_simple_words-removebg-preview.png';
  const generalImg = '/assets/subjects/tamil-removebg-preview.png';
  const songsImg = '/assets/subjects/tamil_songs_stories-removebg-preview.png';

  if (lower.includes('எழுத்து') || lower.includes('வரைய') || lower.includes('stroke') || lower.includes('writing'))
    return { emoji: '✍️', mascot: '🖍️', color: 'from-amber-400 to-orange-500', sound: `${title}!`, image: strokesImg };
  
  if (lower.includes('உயிர்') || lower.includes('vowel')) {
    if (lower.includes('அ') || lower.includes('ஆ') || lower.includes('இ') || lower.includes('ஈ') || lower.includes('உ') || lower.includes('ஊ'))
      return { emoji: '🍎', mascot: 'அ', color: 'from-red-400 to-rose-500', sound: `${title}!`, image: vowelsImg1 };
    return { emoji: '🍇', mascot: 'எ', color: 'from-red-400 to-rose-500', sound: `${title}!`, image: vowelsImg2 };
  }

  if (lower.includes('மெய்') || lower.includes('consonant')) {
    if (lower.includes('க்') || lower.includes('ங்') || lower.includes('ச்') || lower.includes('ஞ்') || lower.includes('ட்') || lower.includes('ண்'))
      return { emoji: '⭐️', mascot: 'க்', color: 'from-blue-400 to-indigo-500', sound: `${title}!`, image: consonantsImg1 };
    return { emoji: '🌟', mascot: 'த்', color: 'from-blue-400 to-indigo-500', sound: `${title}!`, image: consonantsImg2 };
  }

  if (lower.includes('சொல்') || lower.includes('வார்த்தை') || lower.includes('எழுது') || lower.includes('word'))
    return { emoji: '🗣️', mascot: 'சொல்', color: 'from-emerald-400 to-teal-500', sound: `${title}!`, image: wordsImg };

  if (lower.includes('வாசிப்பு') || lower.includes('வாசி') || lower.includes('இலக்கண') || lower.includes('தோட்டம்') || lower.includes('grammar') || lower.includes('reading'))
    return { emoji: '📚', mascot: 'த', color: 'from-cyan-400 to-blue-500', sound: `${title}!`, image: generalImg };

  if (lower.includes('பாடல்') || lower.includes('கதை') || lower.includes('song') || lower.includes('story') || lower.includes('rhyme') || lower.includes('கதைகள்'))
    return { emoji: '🎵', mascot: '🎶', color: 'from-pink-400 to-rose-500', sound: `${title}!`, image: songsImg };

  return { emoji: '✏️', mascot: '✍️', color: 'from-cyan-400 to-sky-500', sound: 'Ready!', image: generalImg };
}

export function buildTutorial(title: string, studentName?: string): TutorialStep[] {
  return [
    { title: 'தயார்', speak: 'வணக்கம்! வகுப்பு 1 தமிழ் பாடத்திற்கு உங்களை வரவேற்கிறோம்!', emoji: '✨', anim: 'jump' },
  ];
}
