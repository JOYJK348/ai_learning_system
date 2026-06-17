import { type TutorialStep } from './english';

export function getChapterVisuals(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('முன் எழுத்து') || lower.includes('எழுத்து பயிற்சிகள்'))
    return { emoji: '✍️', mascot: '🖍️', color: 'from-amber-400 to-orange-500', sound: 'முன் எழுத்து பயிற்சிகள்!' };
  if (lower.includes('உயிர் எழுத்துக்கள்'))
    return { emoji: '🍎', mascot: 'அ', color: 'from-red-400 to-rose-500', sound: 'உயிர் எழுத்துக்கள்!' };
  if (lower.includes('மெய் எழுத்துக்கள்'))
    return { emoji: '⭐️', mascot: 'க்', color: 'from-blue-400 to-indigo-500', sound: 'மெய் எழுத்துக்கள்!' };
  if (lower.includes('எளிய சொற்கள்'))
    return { emoji: '🗣️', mascot: 'சொல்', color: 'from-emerald-400 to-teal-500', sound: 'எளிய சொற்கள்!' };
  if (lower.includes('பாடல்கள்') || lower.includes('கதைகள்'))
    return { emoji: '🎵', mascot: '🎶', color: 'from-pink-400 to-rose-500', sound: 'பாடல்கள் மற்றும் கதைகள்!' };
  return { emoji: '📚', mascot: '📖', color: 'from-indigo-400 to-purple-500', sound: `${name}!` };
}

export function getLessonVisuals(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes('நேர் கோடு') || lower.includes('standing')) {
    return { emoji: '📏', mascot: '↕️', color: 'from-blue-400 to-indigo-500', sound: 'நேர் கோடு!' };
  }
  if (lower.includes('படுத்த கோடு') || lower.includes('sleeping')) {
    return { emoji: '🛏️', mascot: '↔️', color: 'from-emerald-400 to-teal-500', sound: 'படுத்த கோடு!' };
  }
  if (lower.includes('சாய்வு கோடு') || lower.includes('slanting')) {
    return { emoji: '📐', mascot: '↗️', color: 'from-orange-400 to-amber-500', sound: 'சாய்வு கோடு!' };
  }
  if (lower.includes('வளைவு கோடு') || lower.includes('curve')) {
    return { emoji: '🌈', mascot: '〰️', color: 'from-purple-400 to-pink-500', sound: 'வளைவு கோடு!' };
  }
  if (lower.includes('அ') || lower.includes('ஆ') || lower.includes('இ') || lower.includes('ஈ')) {
    return { emoji: '🍎', mascot: 'அ', color: 'from-red-400 to-rose-500', sound: 'உயிர் எழுத்துக்கள்!' };
  }
  return { emoji: '📚', mascot: '📖', color: 'from-indigo-400 to-purple-500', sound: `${title}!` };
}

export function buildTutorial(title: string, studentName?: string): TutorialStep[] {
  const t = title.trim();
  const lower = t.toLowerCase();

  // Tamil pre-writing strokes
  if (lower.includes('நேர் கோடு') || lower.includes('standing line')) {
    return [
      { title: "நேர் கோடு எழுதலாம்!", speak: "வாருங்கள் குட்டி நண்பர்களே! நாம் நேர்கோடு எழுதப் பழகலாம்! மேலே இருந்து கீழே ஒரு நேர்க்கோடு!", emoji: '📏', anim: 'pop' },
      { title: "மேலே இருந்து கீழே!", speak: "மேலே இருந்து நேராக கீழே வர வேண்டும்! ஒரு குச்சி போல நேராக!", emoji: '⬇️', anim: 'bounce' },
      { title: "மரம் போல நேராக!", speak: "மரம் நேராக நிற்கிறது அல்லவா? அது தான் நேர்க்கோடு!", emoji: '🌲', anim: 'float' },
      { title: "விரலால் எழுதுங்கள்!", speak: "உங்கள் விரலால் காற்றில் மேலே இருந்து கீழே வரைந்து பழகுங்கள்! நேர்கோடு!", emoji: '✏️', anim: 'wiggle' },
      { title: "அற்புதமான முயற்சி!", speak: "அழகாக செய்தீர்கள்! நீங்கள் ஒரு சூப்பர் ஸ்டார்!", emoji: '🏆', anim: 'shake' },
    ];
  }
  if (lower.includes('படுத்த கோடு') || lower.includes('sleeping line')) {
    return [
      { title: "படுத்த கோடு எழுதலாம்!", speak: "வாருங்கள்! படுத்த கோடு எழுதப் பழகலாம்! இடது பக்கத்திலிருந்து வலது பக்கம் நேராக!", emoji: '🛏️', anim: 'pop' },
      { title: "இடமிருந்து வலம்!", speak: "இடது பக்கத்திலிருந்து வலது பக்கமாக நகருங்கள்! படுத்த கோடு!", emoji: '➡️', anim: 'jump' },
      { title: "படுக்கை போல!", speak: "நாம் படுக்கும் படுக்கை போல தட்டையாக இருக்கும் கோடு! படுத்த கோடு!", emoji: '🛌', anim: 'float' },
      { title: "அழகாக வரைந்தீர்கள்!", speak: "மிகவும் அருமை! படுத்த கோடு வரைந்து பழகிவிட்டீர்கள்!", emoji: '⭐', anim: 'spin' },
    ];
  }

  // Tamil alphabets
  if (lower.includes('உயிர் எழுத்து அ') || t === 'அ') {
    return [
      { title: "அ - அம்மா!", speak: "அ... அம்மா! அன்பான அம்மா! சொல்லுங்கள் அ... அம்மா!", emoji: '👩', anim: 'pop', word: 'அ', family: 'உயிர்' },
      { title: "அ - அணில்!", speak: "அ... அணில்! மரத்தில் ஏறும் அணில்! சொல்லுங்கள் அ... அணில்!", emoji: '🐿️', anim: 'bounce', word: 'அ', family: 'உயிர்' },
      { title: "அ - அலைபேசி!", speak: "அ... அலைபேசி! பேசுவதற்கு உதவும் அலைபேசி!", emoji: '📱', anim: 'float', word: 'அ', family: 'உயிர்' },
      { title: "சிறந்த முயற்சி!", speak: "அற்புதம்! 'அ' எழுத்தை நன்றாக கற்றுக் கொண்டீர்கள்!", emoji: '🎉', anim: 'shake' },
    ];
  }

  // Default fallback
  return [
    { title: title, speak: `${title} பற்றி படிக்கலாம்!`, emoji: '📚', anim: 'pop' }
  ];
}
