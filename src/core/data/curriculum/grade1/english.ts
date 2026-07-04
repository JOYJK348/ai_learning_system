import { type TutorialStep } from '../english';

export function getChapterVisuals(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('alphabet') || lower.includes('phonics') || lower.includes('letter sound'))
    return { emoji: '🔤', mascot: '🔤', color: 'from-sky-400 to-blue-500', sound: 'Alphabet & Phonics!', image: '/assets/subjects/grade1_alphabet_phonics.webp' };
  if (lower.includes('vowel'))
    return { emoji: '🅰️', mascot: '🅰️', color: 'from-teal-400 to-emerald-500', sound: 'Vowels Adventure!', image: '/assets/subjects/grade1_vowels_adventure.webp' };
  if (lower.includes('word builder') || lower.includes('word building') || lower.includes('cvc') || lower.includes('word family'))
    return { emoji: '🌲', mascot: '🌲', color: 'from-emerald-400 to-green-500', sound: 'Word Builder Forest!', image: '/assets/subjects/grade1_word_builder.webp' };
  if (lower.includes('sight word'))
    return { emoji: '🏙️', mascot: '🏙️', color: 'from-purple-400 to-violet-500', sound: 'Sight Word Street!', image: '/assets/subjects/grade1_sight_words.webp' };
  if (lower.includes('naming word'))
    return { emoji: '👤', mascot: '👤', color: 'from-pink-400 to-rose-500', sound: 'Naming Words World!', image: '/assets/subjects/grade1_naming_words.webp' };
  if (lower.includes('grammar'))
    return { emoji: '🌱', mascot: '🌱', color: 'from-lime-400 to-green-500', sound: 'Grammar Garden!', image: '/assets/subjects/grade1_grammar_garden.webp' };
  if (lower.includes('sentence'))
    return { emoji: '🚂', mascot: '🚂', color: 'from-amber-400 to-yellow-500', sound: 'Sentence Train!', image: '/assets/subjects/grade1_sentence_train.webp' };
  if (lower.includes('reading'))
    return { emoji: '📖', mascot: '📖', color: 'from-indigo-400 to-purple-500', sound: 'Reading Cave!', image: '/assets/subjects/grade1_reading_cave.webp' };
  if (lower.includes('writing'))
    return { emoji: '✏️', mascot: '✏️', color: 'from-orange-400 to-red-500', sound: 'Writing Zone!', image: '/assets/subjects/grade1_writing_zone.webp' };
  return { emoji: '📖', mascot: '📚', color: 'from-sky-400 to-blue-500', sound: 'Grade 1 English!' };
}

export function getLessonVisuals(title: string) {
  const lower = title.toLowerCase();

  const ch1 = '/assets/subjects/grade1_alphabet_phonics.webp';
  const ch2 = '/assets/subjects/grade1_vowels_adventure.webp';
  const ch3 = '/assets/subjects/grade1_word_builder.webp';
  const ch4 = '/assets/subjects/grade1_sight_words.webp';
  const ch5 = '/assets/subjects/grade1_naming_words.webp';
  const ch6 = '/assets/subjects/grade1_grammar_garden.webp';
  const ch7 = '/assets/subjects/grade1_sentence_train.webp';
  const ch8 = '/assets/subjects/grade1_reading_cave.webp';
  const ch9 = '/assets/subjects/grade1_writing_zone.webp';

  // ── Chapter 1: Alphabet & Phonics ──
  if (lower.includes('alphabet'))
    return { emoji: '🌈', mascot: '🔤', color: 'from-sky-400 to-blue-500', sound: 'Alphabet time!', image: ch1 };
  if (lower.includes('capital') || lower.includes('small') && lower.includes('letter'))
    return { emoji: '🔄', mascot: '🔠', color: 'from-indigo-400 to-purple-500', sound: 'Match letters!', image: ch1 };
  if (lower.includes('a-m') || (lower.includes('letter') && lower.includes('a') && !lower.includes('vowel')))
    return { emoji: '🍎', mascot: '🅰️', color: 'from-red-400 to-rose-500', sound: 'Sounds A-M!', image: ch1 };
  if (lower.includes('n-z') || (lower.includes('letter') && (lower.includes('n') || lower.includes('z'))))
    return { emoji: '🦓', mascot: '🆉', color: 'from-indigo-400 to-violet-500', sound: 'Sounds N-Z!', image: ch1 };
  if (lower.includes('letter'))
    return { emoji: '🔤', mascot: '🔤', color: 'from-sky-400 to-blue-500', sound: 'Letters!', image: ch1 };

  // ── Chapter 2: Vowels Adventure ──
  if (lower.includes('vowel') || lower.includes('short')) {
    if (lower.includes('a')) return { emoji: '🍎', mascot: '🅰️', color: 'from-teal-400 to-emerald-500', sound: 'Short vowel a!', image: ch2 };
    if (lower.includes('e')) return { emoji: '🟢', mascot: '🅴', color: 'from-teal-400 to-emerald-500', sound: 'Short vowel e!', image: ch2 };
    if (lower.includes('i')) return { emoji: '🔵', mascot: '🅸', color: 'from-teal-400 to-emerald-500', sound: 'Short vowel i!', image: ch2 };
    if (lower.includes('o')) return { emoji: '🟠', mascot: '🅾', color: 'from-teal-400 to-emerald-500', sound: 'Short vowel o!', image: ch2 };
    if (lower.includes('u')) return { emoji: '🟣', mascot: '🆄', color: 'from-teal-400 to-emerald-500', sound: 'Short vowel u!', image: ch2 };
    return { emoji: '🔤', mascot: '🅰️', color: 'from-teal-400 to-emerald-500', sound: 'Vowels!', image: ch2 };
  }

  // ── Chapter 3: Word Builder Forest ──
  if (lower.includes('cvc') || lower.includes('word family') || lower.includes('build') || lower.includes('new word')) {
    if (lower.includes('at')) return { emoji: '🐱', mascot: '🐱', color: 'from-emerald-400 to-teal-500', sound: '-at family!', image: ch3 };
    if (lower.includes('an')) return { emoji: '💨', mascot: '💨', color: 'from-emerald-400 to-teal-500', sound: '-an family!', image: ch3 };
    if (lower.includes('in')) return { emoji: '📌', mascot: '📌', color: 'from-emerald-400 to-teal-500', sound: '-in family!', image: ch3 };
    if (lower.includes('ot')) return { emoji: '🏺', mascot: '🏺', color: 'from-emerald-400 to-teal-500', sound: '-ot family!', image: ch3 };
    if (lower.includes('ug')) return { emoji: '🐞', mascot: '🐞', color: 'from-emerald-400 to-teal-500', sound: '-ug family!', image: ch3 };
    return { emoji: '🧱', mascot: '🧱', color: 'from-emerald-400 to-teal-500', sound: 'Build words!', image: ch3 };
  }

  // ── Chapter 4: Sight Words ──
  if (lower.includes('i,') || (lower.includes('am') && !lower.includes('vowel')) || lower.includes('is') || lower.includes('are'))
    return { emoji: '🙋', mascot: '🙋', color: 'from-amber-400 to-orange-500', sound: 'I, am, is, are!', image: ch4 };
  if (lower.includes('the,') || lower.includes('articles') || (lower.includes('the') && lower.includes('a')))
    return { emoji: '🎯', mascot: '🎯', color: 'from-amber-400 to-orange-500', sound: 'a, an, the!', image: ch4 };
  if (lower.includes('this'))
    return { emoji: '👉', mascot: '👉', color: 'from-amber-400 to-orange-500', sound: 'This & That!', image: ch4 };
  if (lower.includes('here,') || (lower.includes('here') && lower.includes('there')))
    return { emoji: '📍', mascot: '📍', color: 'from-amber-400 to-orange-500', sound: 'Here & There!', image: ch4 };
  if (lower.includes('my,') || (lower.includes('my') && lower.includes('your')))
    return { emoji: '🤝', mascot: '🤝', color: 'from-amber-400 to-orange-500', sound: 'My & Your!', image: ch4 };
  if (lower.includes('sight'))
    return { emoji: '🏙️', mascot: '🏙️', color: 'from-purple-400 to-violet-500', sound: 'Sight words!', image: ch4 };

  // ── Chapter 5: Naming Words World ──
  if (lower.includes('people') || lower.includes('person'))
    return { emoji: '👤', mascot: '👤', color: 'from-violet-400 to-purple-500', sound: 'People names!', image: ch5 };
  if (lower.includes('animal'))
    return { emoji: '🦁', mascot: '🦁', color: 'from-violet-400 to-purple-500', sound: 'Animal names!', image: ch5 };
  if (lower.includes('thing') || lower.includes('around'))
    return { emoji: '🎒', mascot: '🎒', color: 'from-violet-400 to-purple-500', sound: 'Things!', image: ch5 };
  if (lower.includes('place'))
    return { emoji: '🏫', mascot: '🏫', color: 'from-violet-400 to-purple-500', sound: 'Places!', image: ch5 };
  if (lower.includes('one') || lower.includes('many') || lower.includes('singular') || lower.includes('plural'))
    return { emoji: '🔢', mascot: '🔢', color: 'from-violet-400 to-purple-500', sound: 'One & Many!', image: ch5 };
  if (lower.includes('naming'))
    return { emoji: '👤', mascot: '👤', color: 'from-pink-400 to-rose-500', sound: 'Naming words!', image: ch5 };

  // ── Chapter 6: Grammar Garden ──
  if (lower.includes('noun'))
    return { emoji: '👥', mascot: '👥', color: 'from-indigo-400 to-blue-500', sound: 'Nouns!', image: ch6 };
  if (lower.includes('pronoun'))
    return { emoji: '🗣️', mascot: '🗣️', color: 'from-indigo-400 to-blue-500', sound: 'Pronouns!', image: ch6 };
  if (lower.includes('action') || lower.includes('verb'))
    return { emoji: '🏃', mascot: '🏃', color: 'from-indigo-400 to-blue-500', sound: 'Action words!', image: ch6 };
  if (lower.includes('describing') || lower.includes('adjective'))
    return { emoji: '🎨', mascot: '🎨', color: 'from-indigo-400 to-blue-500', sound: 'Describing words!', image: ch6 };
  if (lower.includes('opposite'))
    return { emoji: '⚖️', mascot: '⚖️', color: 'from-indigo-400 to-blue-500', sound: 'Opposites!', image: ch6 };
  if (lower.includes('position'))
    return { emoji: '📦', mascot: '📦', color: 'from-indigo-400 to-blue-500', sound: 'Position words!', image: ch6 };
  if (lower.includes('grammar'))
    return { emoji: '🌱', mascot: '🌱', color: 'from-lime-400 to-green-500', sound: 'Grammar!', image: ch6 };

  // ── Chapter 7: Sentence Train ──
  if (lower.includes('sentence') || lower.includes('train')) {
    if (lower.includes('two') || lower.includes('2')) return { emoji: '🚂', mascot: '🚃', color: 'from-pink-400 to-rose-500', sound: 'Two word sentences!', image: ch7 };
    if (lower.includes('three') || lower.includes('3')) return { emoji: '🚃', mascot: '🚃', color: 'from-pink-400 to-rose-500', sound: 'Three word sentences!', image: ch7 };
    if (lower.includes('simple') || lower.includes('make')) return { emoji: '🏁', mascot: '🏁', color: 'from-pink-400 to-rose-500', sound: 'Simple sentences!', image: ch7 };
    if (lower.includes('question')) return { emoji: '❓', mascot: '❓', color: 'from-pink-400 to-rose-500', sound: 'Question sentences!', image: ch7 };
    if (lower.includes('arrange')) return { emoji: '🚂', mascot: '🚂', color: 'from-pink-400 to-rose-500', sound: 'Arrange sentences!', image: ch7 };
    return { emoji: '🚂', mascot: '🚂', color: 'from-amber-400 to-yellow-500', sound: 'Sentences!', image: ch7 };
  }

  // ── Chapter 8: Reading Cave ──
  if (lower.includes('picture'))
    return { emoji: '📖', mascot: '📖', color: 'from-purple-500 to-fuchsia-500', sound: 'Picture reading!', image: ch8 };
  if (lower.includes('passage'))
    return { emoji: '🏞️', mascot: '🏞️', color: 'from-purple-500 to-fuchsia-500', sound: 'Read passages!', image: ch8 };
  if (lower.includes('answer'))
    return { emoji: '🔍', mascot: '🔍', color: 'from-purple-500 to-fuchsia-500', sound: 'Find answers!', image: ch8 };
  if (lower.includes('sequence'))
    return { emoji: '⛓️', mascot: '⛓️', color: 'from-purple-500 to-fuchsia-500', sound: 'Story sequence!', image: ch8 };
  if (lower.includes('story') || lower.includes('understand') || lower.includes('comprehension'))
    return { emoji: '🧠', mascot: '🧠', color: 'from-purple-500 to-fuchsia-500', sound: 'Story time!', image: ch8 };

  // ── Chapter 9: Writing Zone ──
  if (lower.includes('letter') && (lower.includes('writ') || lower.includes('trac')))
    return { emoji: '✍️', mascot: '✍️', color: 'from-purple-400 to-fuchsia-500', sound: 'Letter writing!', image: ch9 };
  if (lower.includes('word') && (lower.includes('writ') || lower.includes('trac')))
    return { emoji: '📝', mascot: '📝', color: 'from-purple-400 to-fuchsia-500', sound: 'Word writing!', image: ch9 };
  if (lower.includes('copy'))
    return { emoji: '📰', mascot: '📰', color: 'from-purple-400 to-fuchsia-500', sound: 'Copy sentences!', image: ch9 };
  if (lower.includes('complete'))
    return { emoji: '📝', mascot: '📝', color: 'from-purple-400 to-fuchsia-500', sound: 'Complete sentences!', image: ch9 };
  if (lower.includes('create'))
    return { emoji: '🧱', mascot: '🧱', color: 'from-purple-400 to-fuchsia-500', sound: 'Create sentences!', image: ch9 };
  if (lower.includes('writing') || lower.includes('write'))
    return { emoji: '✏️', mascot: '✏️', color: 'from-orange-400 to-red-500', sound: 'Writing!', image: ch9 };

  // ── Default ──
  return { emoji: '📖', mascot: '📖', color: 'from-blue-400 to-sky-500', sound: 'Ready to learn!', image: ch1 };
}

export function buildTutorial(title: string, studentName?: string): TutorialStep[] {
  const name = studentName || 'Explorer';
  return [
    { title: 'Ready', speak: `Hi ${name}! Welcome to Grade 1 English class!`, emoji: '✨', anim: 'jump' },
  ];
}

export function cleanSoundTerms(text: string): string {
  return text || '';
}
