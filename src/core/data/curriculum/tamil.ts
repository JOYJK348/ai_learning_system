import { type TutorialStep } from './english';

export function getChapterVisuals(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('முன் எழுத்து') || lower.includes('எழுத்து பயிற்சிகள்'))
    return { emoji: '✍️', mascot: '🖍️', color: 'from-amber-400 to-orange-500', sound: 'முன் எழுத்து பயிற்சிகள்!', image: '/assets/subjects/tamil_writing_strokes-removebg-preview.png' };
  if (lower.includes('உயிர் எழுத்துக்கள் அ-ஊ') || lower.includes('அ-ஊ'))
    return { emoji: '🍎', mascot: 'அ', color: 'from-red-400 to-rose-500', sound: 'உயிர் எழுத்துக்கள் அ முதல் ஊ வரை!', image: '/assets/subjects/tamil_vowels_1-removebg-preview.png' };
  if (lower.includes('உயிர் எழுத்துக்கள் எ-ஃ') || lower.includes('எ-ஃ') || lower.includes('உயிர் எழுத்துக்கள்'))
    return { emoji: '🍇', mascot: 'எ', color: 'from-red-400 to-rose-500', sound: 'உயிர் எழுத்துக்கள் எ முதல் ஃ வரை!', image: '/assets/subjects/tamil_vowels_2-removebg-preview.png' };
  if (lower.includes('மெய் எழுத்துக்கள் - வரிசை 1') || lower.includes('வரிசை 1'))
    return { emoji: '⭐️', mascot: 'க்', color: 'from-blue-400 to-indigo-500', sound: 'மெய் எழுத்துக்கள் வரிசை ஒன்று!', image: '/assets/subjects/tamil_consonants_1-removebg-preview.png' };
  if (lower.includes('மெய் எழுத்துக்கள் - வரிசை 2') || lower.includes('வரிசை 2') || lower.includes('மெய் எழுத்துக்கள்'))
    return { emoji: '🌟', mascot: 'ங்', color: 'from-blue-400 to-indigo-500', sound: 'மெய் எழுத்துக்கள் வரிசை இரண்டு!', image: '/assets/subjects/tamil_consonants_2-removebg-preview.png' };
  if (lower.includes('எளிய சொற்கள்'))
    return { emoji: '🗣️', mascot: 'சொல்', color: 'from-emerald-400 to-teal-500', sound: 'எளிய சொற்கள்!', image: '/assets/subjects/tamil_simple_words-removebg-preview.png' };
  if (lower.includes('பாடல்கள்') || lower.includes('கதைகள்'))
    return { emoji: '🎵', mascot: '🎶', color: 'from-pink-400 to-rose-500', sound: 'பாடல்கள் மற்றும் கதைகள்!', image: '/assets/subjects/tamil_songs_stories-removebg-preview.png' };
  return { emoji: '📚', mascot: '📖', color: 'from-indigo-400 to-purple-500', sound: `${name}!`, image: '/assets/subjects/tamil_writing_strokes-removebg-preview.png' };
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
  if (lower.includes('ய்') || lower.includes('ர்') || lower.includes('ல்') || lower.includes('வ்') ||
      lower.includes('க்') || lower.includes('ங்') || lower.includes('ச்') || lower.includes('ஞ்') ||
      lower.includes('ட்') || lower.includes('ண்') || lower.includes('த்') || lower.includes('ந்') ||
      lower.includes('ப்') || lower.includes('ம்') ||
      lower.includes('ழ்') || lower.includes('ள்') || lower.includes('ற்') || lower.includes('ன்'))
    return { emoji: '⭐', mascot: 'க்', color: 'from-blue-400 to-indigo-500', sound: 'மெய் எழுத்துக்கள்!' };
  if (lower.includes('அம்மா') || lower.includes('ஆடு') || lower.includes('எலி') || lower.includes('கடிகாரம்') || lower.includes('சொற்கள்'))
    return { emoji: '🗣️', mascot: 'சொல்', color: 'from-emerald-400 to-teal-500', sound: 'எளிய சொற்கள்!' };
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

  // Mei eluthukal (consonants) tutorials
  if (lower.includes('க்') || lower.includes('ங்') || lower.includes('ச்') || lower.includes('ஞ்')) {
    return [
      { title: "க், ங், ச், ஞ் — கற்கலாம்!", speak: "வாருங்கள்! மெய் எழுத்துக்களை கற்கலாம்!", emoji: '⭐', anim: 'pop' },
      { title: "மெய் எழுத்துக்கள்", speak: "இவை மெய் எழுத்துக்கள். இவை மற்ற எழுத்துக்களுடன் சேர்ந்து ஒலிக்கும்!", emoji: '🔤', anim: 'bounce' },
      { title: "க் - குடை!", speak: "க்... குடை! மழையிலிருந்து காக்கும் குடை!", emoji: '☂️', anim: 'pop' },
      { title: "ங் - அங்கம்!", speak: "ங்... அங்கம்! நம் உடல் அங்கம்!", emoji: '💪', anim: 'bounce' },
      { title: "ச் - சந்திரன்!", speak: "ச்... சந்திரன்! வானில் ஒளிரும் நிலா!", emoji: '🌙', anim: 'float' },
      { title: "ஞ் - பஞ்சு!", speak: "ஞ்... பஞ்சு! மென்மையான பஞ்சு!", emoji: '☁️', anim: 'wiggle' },
      { title: "அற்புதம்!", speak: "அற்புதம்! மெய் எழுத்துக்களை நன்றாக கற்றுக் கொண்டீர்கள்!", emoji: '🎉', anim: 'shake' },
    ];
  }
  if (lower.includes('ட்') || lower.includes('ண்') || lower.includes('த்') || lower.includes('ந்')) {
    return [
      { title: "ட், ண், த், ந் — கற்கலாம்!", speak: "வாருங்கள்! மேலும் மெய் எழுத்துக்களை கற்கலாம்!", emoji: '⭐', anim: 'pop' },
      { title: "ட் - குடம்!", speak: "ட்... குடம்! தண்ணீர் நிறைந்த குடம்!", emoji: '🏺', anim: 'pop' },
      { title: "ண் - மண்!", speak: "ண்... மண்! விளையாடும் மண்!", emoji: '🪨', anim: 'bounce' },
      { title: "த் - தமிழ்!", speak: "த்... தமிழ்! அழகான தமிழ் மொழி!", emoji: '📖', anim: 'float' },
      { title: "ந் - நட்சத்திரம்!", speak: "ந்... நட்சத்திரம்! வானில் மின்னும் நட்சத்திரம்!", emoji: '⭐', anim: 'wiggle' },
      { title: "அருமை!", speak: "அருமை! தொடர்ந்து கற்கலாம்!", emoji: '🏆', anim: 'shake' },
    ];
  }
  if (lower.includes('ப்') || lower.includes('ம்')) {
    return [
      { title: "ப், ம் — கற்கலாம்!", speak: "வாருங்கள்! மெய் எழுத்துக்களை கற்கலாம்!", emoji: '⭐', anim: 'pop' },
      { title: "ப் - பட்டம்!", speak: "ப்... பட்டம்! வானில் பறக்கும் பட்டம்!", emoji: '🪁', anim: 'float' },
      { title: "ம் - மரம்!", speak: "ம்... மரம்! உயரமான மரம்!", emoji: '🌳', anim: 'pop' },
      { title: "அருமை!", speak: "அருமை! மெய் எழுத்துக்களை கற்றுக் கொண்டீர்கள்!", emoji: '🏆', anim: 'shake' },
    ];
  }
  if (lower.includes('ய்') || lower.includes('ர்') || lower.includes('ல்') || lower.includes('வ்')) {
    return [
      { title: "ய், ர், ல், வ் — கற்கலாம்!", speak: "வாருங்கள்! மெய் எழுத்துக்களை கற்கலாம்!", emoji: '⭐', anim: 'pop' },
      { title: "மெய் எழுத்துக்கள்", speak: "இவை மெய் எழுத்துக்கள். இவை மற்ற எழுத்துக்களுடன் சேர்ந்து ஒலிக்கும்!", emoji: '🔤', anim: 'bounce' },
      { title: "ய் - யானை!", speak: "ய்... யானை! பெரிய யானை! சொல்லுங்கள் ய்... யானை!", emoji: '🐘', anim: 'pop' },
      { title: "ர் - ராக்கெட்!", speak: "ர்... ராக்கெட்! விண்ணில் பறக்கும் ராக்கெட்!", emoji: '🚀', anim: 'float' },
      { title: "ல் - லட்டு!", speak: "ல்... லட்டு! இனிப்பான லட்டு!", emoji: '🍡', anim: 'wiggle' },
      { title: "வ் - வானவில்!", speak: "வ்... வானவில்! வண்ணங்கள் நிறைந்த வானவில்!", emoji: '🌈', anim: 'bounce' },
      { title: "சிறந்த முயற்சி!", speak: "அற்புதம்! மெய் எழுத்துக்களை நன்றாக கற்றுக் கொண்டீர்கள்!", emoji: '🎉', anim: 'shake' },
    ];
  }
  if (lower.includes('ழ்') || lower.includes('ள்') || lower.includes('ற்') || lower.includes('ன்')) {
    return [
      { title: "ழ், ள், ற், ன் — கற்கலாம்!", speak: "வாருங்கள்! மேலும் மெய் எழுத்துக்களை கற்கலாம்!", emoji: '⭐', anim: 'pop' },
      { title: "ழ் - மழை!", speak: "ழ்... மழை! தூவானம் பொழியும் மழை!", emoji: '🌧️', anim: 'bounce' },
      { title: "ள் - விளக்கு!", speak: "ள்... விளக்கு! ஒளி தரும் விளக்கு!", emoji: '💡', anim: 'pop' },
      { title: "ற் - பறவை!", speak: "ற்... பறவை! வானில் பறக்கும் பறவை!", emoji: '🕊️', anim: 'float' },
      { title: "ன் - கண்!", speak: "ன்... கண்! பார்க்க உதவும் கண்!", emoji: '👁️', anim: 'wiggle' },
      { title: "அருமை!", speak: "அருமை! எல்லா மெய் எழுத்துக்களையும் கற்றுக் கொண்டீர்கள்!", emoji: '🏆', anim: 'shake' },
    ];
  }

  // Simple words tutorials
  if (lower.includes('அம்மா') || lower.includes('ஆடு') || lower.includes('ஊர்')) {
    return [
      { title: "எளிய சொற்கள் — கற்கலாம்!", speak: "வாருங்கள்! எளிய சொற்களை படிக்கலாம்!", emoji: '🗣️', anim: 'pop' },
      { title: "அம்மா — அன்பான அம்மா!", speak: "அ... அம்மா! அன்பான அம்மா!", emoji: '👩', anim: 'pop' },
      { title: "ஆடு — வெள்ளை ஆடு!", speak: "ஆ... ஆடு! பாலும் தரும் ஆடு!", emoji: '🐐', anim: 'bounce' },
      { title: "ஊர் — எங்கள் ஊர்!", speak: "ஊ... ஊர்! நாம் வசிக்கும் ஊர்!", emoji: '🏘️', anim: 'float' },
      { title: "அருமை!", speak: "அருமை! எளிய சொற்களை கற்றுக் கொண்டீர்கள்!", emoji: '🎉', anim: 'shake' },
    ];
  }
  if (lower.includes('எலி') || lower.includes('கடிகாரம்')) {
    return [
      { title: "எளிய சொற்கள் — கற்கலாம்!", speak: "வாருங்கள்! மேலும் எளிய சொற்களை படிக்கலாம்!", emoji: '🗣️', anim: 'pop' },
      { title: "எலி — சின்ன எலி!", speak: "எ... எலி! சின்ன எலி!", emoji: '🐭', anim: 'wiggle' },
      { title: "ஏணி — உயரமான ஏணி!", speak: "ஏ... ஏணி! ஏற உதவும் ஏணி!", emoji: '🪜', anim: 'float' },
      { title: "ஒட்டகம் — பெரிய ஒட்டகம்!", speak: "ஒ... ஒட்டகம்! பாலைவன ஒட்டகம்!", emoji: '🐪', anim: 'bounce' },
      { title: "சூப்பர்!", speak: "சூப்பர்! எல்லா சொற்களையும் கற்றுக் கொண்டீர்கள்!", emoji: '🏆', anim: 'shake' },
    ];
  }

  // Default fallback
  return [
    { title: title, speak: `${title} பற்றி படிக்கலாம்!`, emoji: '📚', anim: 'pop' }
  ];
}
