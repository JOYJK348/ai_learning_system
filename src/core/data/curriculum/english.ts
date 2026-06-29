export type TutorialStep = {
  title: string;
  speak: string;
  emoji: string;
  text?: string;
  anim?: 'bounce' | 'pop' | 'spin' | 'wiggle' | 'float' | 'pulse' | 'swing' | 'shake' | 'jump';
  word?: string;   // word to show in big letters for phonics
  family?: string; // word family to highlight (e.g. "at", "an", "it", "og")
};

export const WORD_VISUALS: Record<string, { emoji: string; mascot: string; color: string; sound: string }> = {
  apple: { emoji: '🍎', mascot: '🍎', color: 'from-red-400 to-rose-500', sound: 'Apple!' },
  ball: { emoji: '🏀', mascot: '⚽', color: 'from-orange-400 to-amber-500', sound: 'Ball!' },
  cat: { emoji: '🐱', mascot: '🐱', color: 'from-yellow-400 to-amber-500', sound: 'Cat! Meow!' },
  dog: { emoji: '🐶', mascot: '🐶', color: 'from-amber-400 to-yellow-500', sound: 'Dog! Woof!' },
  elephant: { emoji: '🐘', mascot: '🐘', color: 'from-gray-400 to-slate-500', sound: 'Elephant!' },
  fish: { emoji: '🐟', mascot: '🐟', color: 'from-blue-400 to-cyan-500', sound: 'Fish! Swim swim!' },
  grapes: { emoji: '🍇', mascot: '🍇', color: 'from-purple-400 to-violet-500', sound: 'Grapes!' },
  hat: { emoji: '🎩', mascot: '🎩', color: 'from-pink-400 to-rose-500', sound: 'Hat!' },
  'ice cream': { emoji: '🍦', mascot: '🍦', color: 'from-pink-400 to-purple-500', sound: 'Ice cream!' },
  jug: { emoji: '🏺', mascot: '🏺', color: 'from-indigo-400 to-blue-500', sound: 'Jug!' },
  kite: { emoji: '🪁', mascot: '🪁', color: 'from-violet-400 to-fuchsia-500', sound: 'Kite!' },
  lion: { emoji: '🦁', mascot: '🦁', color: 'from-orange-400 to-red-500', sound: 'Lion! Roar!' },
  mango: { emoji: '🥭', mascot: '🥭', color: 'from-yellow-400 to-orange-500', sound: 'Mango!' },
  monkey: { emoji: '🐵', mascot: '🐵', color: 'from-amber-400 to-yellow-500', sound: 'Monkey!' },
  nest: { emoji: '🪹', mascot: '🪺', color: 'from-amber-400 to-emerald-500', sound: 'Nest!' },
  orange: { emoji: '🍊', mascot: '🍊', color: 'from-orange-400 to-red-500', sound: 'Orange!' },
  parrot: { emoji: '🦜', mascot: '🦜', color: 'from-green-400 to-emerald-500', sound: 'Parrot!' },
  queen: { emoji: '👸', mascot: '👑', color: 'from-purple-400 to-pink-500', sound: 'Queen!' },
  rabbit: { emoji: '🐰', mascot: '🐰', color: 'from-pink-400 to-purple-500', sound: 'Rabbit!' },
  sun: { emoji: '☀️', mascot: '☀️', color: 'from-yellow-400 to-amber-500', sound: 'Sun!' },
  tiger: { emoji: '🐯', mascot: '🐯', color: 'from-orange-400 to-amber-500', sound: 'Tiger!' },
  umbrella: { emoji: '☂️', mascot: '☂️', color: 'from-blue-400 to-cyan-500', sound: 'Umbrella!' },
  van: { emoji: '🚐', mascot: '🚐', color: 'from-sky-400 to-blue-500', sound: 'Van!' },
  watch: { emoji: '⌚', mascot: '⌚', color: 'from-gray-400 to-slate-500', sound: 'Watch!' },
  xylophone: { emoji: '🎹', mascot: '🎶', color: 'from-rainbow-400 to-purple-500', sound: 'Xylophone!' },
  yak: { emoji: '🦬', mascot: '🐃', color: 'from-brown-400 to-amber-500', sound: 'Yak!' },
  zebra: { emoji: '🦓', mascot: '🦓', color: 'from-gray-400 to-slate-500', sound: 'Zebra!' },
  hen: { emoji: '🐔', mascot: '🐔', color: 'from-amber-400 to-orange-500', sound: 'Hen!' },
};

export function getChapterVisuals(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('checkpoint'))
    return { emoji: '🏁', mascot: '🎯', color: 'from-violet-400 to-purple-500', sound: 'Checkpoint time!', image: '/assets/subjects/english_checkpoint-removebg-preview.png' };
  if (lower.includes('final') || lower.includes('assessment') || lower.includes('story time') || lower.includes('story'))
    return { emoji: '📖', mascot: '🧚', color: 'from-violet-400 to-purple-500', sound: 'Story time!', image: '/assets/subjects/english_story_time-removebg-preview.png' };
  if (lower.includes('rhymes & songs') || lower.includes('rhyme') || lower.includes('song'))
    return { emoji: '🎤', mascot: '🎶', color: 'from-pink-400 to-rose-500', sound: 'Sing along!', image: '/assets/subjects/english_rhymes_songs-removebg-preview.png' };
  if (lower.includes('small') && lower.includes('letter') && (lower.includes('phonics') || (lower.includes('small') && lower.includes('a-m'))))
    return { emoji: '🐝', mascot: '🔤', color: 'from-teal-400 to-cyan-500', sound: 'Phonics time!', image: '/assets/subjects/english_small_phonics-removebg-preview.png' };
  if (lower.includes('phonics'))
    return { emoji: '🐝', mascot: '🔤', color: 'from-teal-400 to-cyan-500', sound: 'Phonics time!', image: '/assets/subjects/english_small_phonics-removebg-preview.png' };
  if (lower.includes('recognition'))
    return { emoji: '🔍', mascot: '👀', color: 'from-sky-400 to-blue-500', sound: 'Find the letter!' };
  if (lower.includes('letters a-m') || lower.includes('letters a') || lower.includes('a-m'))
    return { emoji: '🍎', mascot: '🅰️', color: 'from-red-400 to-rose-500', sound: 'A to M!', image: '/assets/subjects/english_alphabet_a_m-removebg-preview.png' };
  if (lower.includes('letters n-z') || lower.includes('letters n') || lower.includes('n-z'))
    return { emoji: '🦓', mascot: '🆉', color: 'from-indigo-400 to-violet-500', sound: 'N to Z!', image: '/assets/subjects/english_alphabet_n_z-removebg-preview.png' };
  if (lower.includes('alphabet'))
    return { emoji: '🔤', mascot: '🔡', color: 'from-blue-400 to-purple-500', sound: 'Alphabets!' };
  if (lower.includes('letter'))
    return { emoji: '🔤', mascot: '🔠', color: 'from-blue-400 to-indigo-500', sound: 'Letters time!' };
  if (lower.includes('reading'))
    return { emoji: '📚', mascot: '📖', color: 'from-amber-400 to-yellow-500', sound: 'Read with me!' };
  if (lower.includes('grammar'))
    return { emoji: '📝', mascot: '✏️', color: 'from-lime-400 to-green-500', sound: 'Grammar time!' };
  if (lower.includes('pre-writing') || lower.includes('writing') || lower.includes('line'))
    return { emoji: '🖍️', mascot: '✍️', color: 'from-amber-400 to-orange-500', sound: 'Writing time!', image: '/assets/subjects/tamil_writing_strokes-removebg-preview.png' };
  if (lower.includes('flower') || lower.includes('plant'))
    return { emoji: '🌸', mascot: '🌻', color: 'from-pink-400 to-yellow-400', sound: 'Flowers!' };
  if (lower.includes('cvc'))
    return { emoji: '🐱', mascot: '🐱', color: 'from-orange-400 to-red-500', sound: 'CVC words!' };
  if (lower.includes('name'))
    return { emoji: '✏️', mascot: '👤', color: 'from-pink-400 to-purple-500', sound: 'Write your name!' };
  return { emoji: '📖', mascot: '📚', color: 'from-indigo-400 to-purple-500', sound: `${name}!` };
}

export function getLessonVisuals(title: string) {
  const lower = title.toLowerCase();

  const letterWordMatch = lower.match(/^letter\s+[a-z]\s*-\s*(.+)/);
  if (letterWordMatch) {
    const word = letterWordMatch[1].trim();
    const visuals = WORD_VISUALS[word];
    if (visuals) return visuals;
  }

  if (lower.includes('small letters') && lower.includes('a-m'))
    return { emoji: '🍎', mascot: '🅰️', color: 'from-red-400 to-rose-500', sound: 'Small letters a to m!' };
  if (lower.includes('small letters') && lower.includes('n-z'))
    return { emoji: '🦓', mascot: '🆉', color: 'from-indigo-400 to-violet-500', sound: 'Small letters n to z!' };

  if (lower.includes('phonics') && (lower.includes('at') || lower.includes('am') || lower.includes('an')) && !lower.includes('it') && !lower.includes('in') && !lower.includes('ig') && !lower.includes('op') && !lower.includes('ot') && !lower.includes('og'))
    return { emoji: '🐱', mascot: '🐱', color: 'from-orange-400 to-red-500', sound: 'at words like cat!' };
  if (lower.includes('phonics') && (lower.includes('it') || lower.includes('in') || lower.includes('ig')))
    return { emoji: '🐷', mascot: '🐷', color: 'from-pink-400 to-purple-500', sound: 'it words like pig!' };
  if (lower.includes('phonics') && (lower.includes('op') || lower.includes('ot') || lower.includes('og')))
    return { emoji: '🐶', mascot: '🐶', color: 'from-amber-400 to-yellow-500', sound: 'og words like dog!' };
  if (lower.includes('phonics') && (lower.includes('un') || lower.includes('ut') || lower.includes('ub')))
    return { emoji: '☀️', mascot: '☀️', color: 'from-yellow-400 to-orange-500', sound: 'un words like sun!' };

  if (lower.includes('cvc') && lower.includes('cat'))
    return { emoji: '🐱', mascot: '🐱', color: 'from-orange-400 to-red-500', sound: 'CVC words like cat!' };
  if (lower.includes('cvc') && lower.includes('dog'))
    return { emoji: '🐶', mascot: '🐶', color: 'from-amber-400 to-yellow-500', sound: 'CVC words like dog!' };

  if (lower.includes('name') || lower.includes('name writing'))
    return { emoji: '✏️', mascot: '👤', color: 'from-pink-400 to-purple-500', sound: 'Write your name!' };

  if (lower.includes('standing')) {
    return { emoji: '📏', mascot: '↕️', color: 'from-blue-400 to-indigo-500', sound: 'Standing line! Up and down!' };
  }
  if (lower.includes('sleeping')) {
    return { emoji: '🛏️', mascot: '↔️', color: 'from-emerald-400 to-teal-500', sound: 'Sleeping line! Left to right!' };
  }
  if (lower.includes('slanting')) {
    return { emoji: '📐', mascot: '↗️', color: 'from-orange-400 to-amber-500', sound: 'Slanting line!' };
  }
  if (lower.includes('curved') || lower.includes('curve')) {
    return { emoji: '🌈', mascot: '〰️', color: 'from-purple-400 to-pink-500', sound: 'Curved line! Like a rainbow!' };
  }
  if (lower.includes('zig') || lower.includes('zag')) {
    return { emoji: '⚡', mascot: '〽️', color: 'from-yellow-400 to-orange-500', sound: 'Zig zag line! Like lightning!' };
  }
  if (lower.includes('exam'))
    return { emoji: '🎓', mascot: '📝', color: 'from-red-400 to-rose-500', sound: 'Exam time!' };
  if (lower.includes('letter') || /^[a-z]$/.test(lower)) {
    return { emoji: '🔤', mascot: '🔠', color: 'from-blue-400 to-indigo-500', sound: `Letter ${title}!` };
  }
  if (lower.includes('number') || /\d/.test(lower)) {
    return { emoji: '🔢', mascot: '🧮', color: 'from-orange-400 to-amber-500', sound: `Number ${title}!` };
  }
  return { emoji: '📚', mascot: '📖', color: 'from-indigo-400 to-purple-500', sound: `${title}!` };
}

export function buildTutorial(title: string, studentName?: string): TutorialStep[] {
  const t = title.trim();
  const lower = t.toLowerCase();

  // Pre-writing strokes
  if (lower.includes('standing')) {
    return [
      { title: "Let's learn Standing Line!", speak: "Yay! Let's learn Standing Line! Standing line... standing up tall!", emoji: '📏', anim: 'pop' },
      { title: 'Up goes the line!', speak: "Standing line goes up up up! Like an arrow to the sky!", emoji: '⬆️', anim: 'jump' },
      { title: 'Down comes the line!', speak: "Now it zooms down! From the top all the way to the ground!", emoji: '⬇️', anim: 'bounce' },
      { title: 'Like a tall tree!', speak: "See the tall tree standing straight and tall? That's a Standing Line!", emoji: '🌲', anim: 'float' },
      { title: 'Like a pencil!', speak: "A pencil standing up tall on your desk! Straight and strong! Standing Line!", emoji: '✏️', anim: 'wiggle' },
      { title: 'Draw it with me!', speak: "Take your finger, draw from top to bottom! Standing Line! One more time!", emoji: '📐', anim: 'pulse' },
      { title: 'You nailed it!', speak: "You mastered Standing Line! Up and down! You are a star!", emoji: '🏆', anim: 'shake' },
    ];
  }
  if (lower.includes('sleeping')) {
    return [
      { title: "Let's learn Sleeping Line!", speak: "Shh... it's Sleeping Line time! Sleeping line goes sleepy, sleepy... left to right!", emoji: '🛏️', anim: 'pop' },
      { title: 'Flat as a pillow!', speak: "Sleeping line lies flat... left to right... like a soft pillow!", emoji: '🛌', anim: 'float' },
      { title: 'Like a bridge!', speak: "See the bridge? It goes across from one side to the other! Left to right!", emoji: '🌉', anim: 'pulse' },
      { title: 'Like a rainbow!', speak: "A rainbow stretches across the sky! Left... to... right! Sleeping Line!", emoji: '🌈', anim: 'swing' },
      { title: 'Like the horizon!', speak: "The sun sets on the horizon... flat and straight! Left to right!", emoji: '🌅', anim: 'wiggle' },
      { title: 'Draw across!', speak: "Take your finger, start left, slide to the right! Sleeping Line!", emoji: '➡️', anim: 'jump' },
      { title: 'You got it!', speak: "You learned Sleeping Line! Left to right! You're amazing!", emoji: '⭐', anim: 'spin' },
    ];
  }
  if (lower.includes('slanting')) {
    return [
      { title: "Let's learn Slanting Line!", speak: "Wheee! Slanting Line time! Like a slide at the park!", emoji: '📐', anim: 'pop' },
      { title: 'Down the slide!', speak: "Whoosh down the slide! From the top... slanting down!", emoji: '🛝', anim: 'bounce' },
      { title: 'Like a kite string!', speak: "See the kite string going slanting up to the sky!", emoji: '🪁', anim: 'float' },
      { title: 'Like a roof!', speak: "Look at the house roof! It slants down on both sides!", emoji: '🏠', anim: 'pulse' },
      { title: 'Like an arrow!', speak: "An arrow shooting up at a slant! Zoom! Slanting Line!", emoji: '🏹', anim: 'jump' },
      { title: 'Slant and slide!', speak: "From the top, slide down slanting! Say it with me: Slanting Line!", emoji: '🧗', anim: 'bounce' },
      { title: 'Super slant!', speak: "You learned Slanting Line! Like a slide, like a roof! Brilliant!", emoji: '🎉', anim: 'shake' },
    ];
  }
  if (lower.includes('curved') || lower.includes('curve')) {
    return [
      { title: "Let's learn Curved Line!", speak: "Ooooh! Curved Line time! Round and round and round!", emoji: '🌈', anim: 'pop' },
      { title: 'Round like a ball!', speak: "A ball is round and smooth! That's a curved line going all around!", emoji: '⚽', anim: 'bounce' },
      { title: 'Like a big hug!', speak: "Open your arms wide... give yourself a hug! That round shape is a curve!", emoji: '🤗', anim: 'pulse' },
      { title: 'Like a smile!', speak: "Make a big happy smile! Curved up like a happy mouth!", emoji: '😊', anim: 'swing' },
      { title: 'Like a wave!', speak: "The ocean waves go up and down in curves! Whoosh!", emoji: '🌊', anim: 'float' },
      { title: 'Like a snake!', speak: "A snake slithers in curves! Ssss... curved line!", emoji: '🐍', anim: 'wiggle' },
      { title: 'Fantastic curves!', speak: "You learned Curved Line! Like a rainbow, a smile, a wave! Yay!", emoji: '🎊', anim: 'shake' },
    ];
  }
  if (lower.includes('zig') || lower.includes('zag')) {
    return [
      { title: "Let's learn Zig-Zag Line!", speak: "Ziggy zaggy zoo! Zig-Zag Line! Up and down, zip zap zoo!", emoji: '⚡', anim: 'pop' },
      { title: 'Crack goes lightning!', speak: "Lightning zig-zags across the sky! ZIG... ZAG!", emoji: '🌩️', anim: 'shake' },
      { title: 'Bounce like a ball!', speak: "The ball bounces up down up down! Zig-zag bounce!", emoji: '🏀', anim: 'bounce' },
      { title: 'Like mountains!', speak: "Mountains go up and down in a zig-zag! Peak after peak!", emoji: '⛰️', anim: 'jump' },
      { title: 'Like a saw!', speak: "A saw cuts zig-zag zig-zag! Back and forth!", emoji: '🪚', anim: 'wiggle' },
      { title: 'Sharp turns!', speak: "Zig right... zag left... zig right! Up and down we go!", emoji: '〽️', anim: 'swing' },
      { title: 'Zig-zag champ!', speak: "You learned Zig-Zag Line! Lightning, bounce, mountains! Incredible!", emoji: '🏆', anim: 'spin' },
    ];
  }

  // Rhymes
  if (lower.includes('twinkle') || lower.includes('twinkl') || lower.includes('star')) {
    return [
      { title: 'Twinkle Twinkle!', speak: "Twinkle twinkle little star! How I wonder what you are!", emoji: '⭐', anim: 'pop' },
      { title: 'Up in the sky!', speak: "Up above the world so high! Like a diamond in the sky!", emoji: '✨', anim: 'float' },
      { title: 'Twinkle twinkle!', speak: "Twinkle twinkle little star! Can you twinkle your fingers with me?", emoji: '🌟', anim: 'pulse' },
      { title: 'Diamond bright!', speak: "Like a diamond shining bright! All through the night!", emoji: '💎', anim: 'spin' },
      { title: 'Sing with me!', speak: "Twinkle twinkle little star! You sing so nicely! Let's clap!", emoji: '🎵', anim: 'wiggle' },
      { title: 'Dream of stars!', speak: "Sleep little one, dream of stars twinkling above! So beautiful!", emoji: '🌙', anim: 'float' },
      { title: 'Star champion!', speak: "You learned Twinkle Twinkle! Sing it for everyone! Yay!", emoji: '🎉', anim: 'shake' },
    ];
  }
  if (lower.includes('johnny') || lower.includes('yes papa')) {
    return [
      { title: 'Johnny Johnny!', speak: "Johnny Johnny! Yes Papa! Eating sugar? No Papa!", emoji: '👦', anim: 'pop' },
      { title: 'Telling lies?', speak: "Open your mouth! Ha ha ha! Johnny ate the sugar!", emoji: '👄', anim: 'wiggle' },
      { title: 'Shake your head!', speak: "No no no! Johnny shakes his head! No Papa, no sugar!", emoji: '🙅', anim: 'shake' },
      { title: 'Naughty Johnny!', speak: "You are naughty Johnny! But we love you anyway! Ha ha!", emoji: '😄', anim: 'bounce' },
      { title: 'Sing together!', speak: "Everybody now! Johnny Johnny! Yes Papa! Sing with me!", emoji: '🎤', anim: 'jump' },
      { title: 'Sugar is naughty!', speak: "Too much sugar is bad for teeth! Brush brush brush!", emoji: '🪥', anim: 'wiggle' },
      { title: 'Rhyme champ!', speak: "You learned Johnny Johnny! So fun! Give a big clap!", emoji: '👏', anim: 'shake' },
    ];
  }
  if (lower.includes('rain') && (lower.includes('go') || lower.includes('away'))) {
    return [
      { title: 'Rain Rain!', speak: "Rain rain go away! Come again another day!", emoji: '🌧️', anim: 'pop' },
      { title: 'Little baby wants to play!', speak: "Little baby wants to play! Rain please go away today!", emoji: '👶', anim: 'pulse' },
      { title: 'Sun come out!', speak: "Where is the sun? Come out sun! Little baby wants to play outside!", emoji: '☀️', anim: 'float' },
      { title: 'Splash in puddles!', speak: "Splash! Splash! Jumping in water puddles! Rain boots on!", emoji: '☂️', anim: 'bounce' },
      { title: 'Rainbow after rain!', speak: "After the rain comes a beautiful rainbow! All colors!", emoji: '🌈', anim: 'swing' },
      { title: 'Sing again!', speak: "Rain rain go away! Can you say it with me? Louder!", emoji: '🗣️', anim: 'jump' },
      { title: 'Sunny dance!', speak: "You learned Rain Rain Go Away! Now do a sunny dance!", emoji: '💃', anim: 'spin' },
    ];
  }
  if (lower.includes('baa') || lower.includes('black sheep')) {
    return [
      { title: 'Baa Baa Sheep!', speak: "Baa baa black sheep, have you any wool?", emoji: '🐑', anim: 'pop' },
      { title: 'Yes sir!', speak: "Yes sir, yes sir, three bags full!", emoji: '👍', anim: 'pulse' },
      { title: 'For the master!', speak: "One for the master! And one for the dame!", emoji: '🐑', anim: 'float' },
      { title: 'For the little boy!', speak: "And one for the little boy who lives down the lane!", emoji: '👦', anim: 'bounce' },
      { title: 'Warm and cozy!', speak: "Wool is so warm and soft! Like a cozy sweater!", emoji: '🧶', anim: 'wiggle' },
      { title: 'Baa baa sing!', speak: "Can you sing Baa Baa with me? Baa baa black sheep!", emoji: '🎵', anim: 'jump' },
      { title: 'Sheep dance!', speak: "You learned Baa Baa Black Sheep! Let's hop like little sheep!", emoji: '🐏', anim: 'shake' },
    ];
  }
  if (lower.includes('humpty') || lower.includes('dumpty')) {
    return [
      { title: 'Humpty Dumpty!', speak: "Humpty Dumpty sat on a wall! Humpty Dumpty had a great fall!", emoji: '🥚', anim: 'pop' },
      { title: 'Sitting on the wall!', speak: "Look at Humpty sitting so high on the wall! So brave!", emoji: '🧱', anim: 'float' },
      { title: 'Oh no! A fall!', speak: "Whoops! Humpty fell down! All the king's horses and all the king's men!", emoji: '😮', anim: 'shake' },
      { title: 'Can they fix him?', speak: "Can they put Humpty together again? No! He's broken!", emoji: '😢', anim: 'pulse' },
      { title: 'Be careful!', speak: "We must be careful on walls! Hold someone's hand!", emoji: '🤝', anim: 'wiggle' },
      { title: 'Sing the rhyme!', speak: "Humpty Dumpty sat on a wall! Say it with me!", emoji: '📖', anim: 'jump' },
      { title: 'Happy Humpty!', speak: "You learned Humpty Dumpty! Let's give Humpty a happy hug!", emoji: '🤗', anim: 'spin' },
    ];
  }
  if (lower.includes('jack') && lower.includes('jill')) {
    return [
      { title: 'Jack and Jill!', speak: "Jack and Jill went up the hill! To fetch a pail of water!", emoji: '⛰️', anim: 'pop' },
      { title: 'Up the hill!', speak: "Up up up the hill they go! Climbing carrying the pail!", emoji: '🧗', anim: 'jump' },
      { title: 'Jack falls down!', speak: "Jack falls down! Oh no! And breaks his crown!", emoji: '🤕', anim: 'shake' },
      { title: 'Jill comes tumbling!', speak: "And Jill comes tumbling after! All the way down!", emoji: '🔄', anim: 'bounce' },
      { title: 'Get back up!', speak: "It's okay! Get back up! Try again! You can do it!", emoji: '💪', anim: 'pulse' },
      { title: 'Up the hill again!', speak: "Jack and Jill go up again! Never give up!", emoji: '⛰️', anim: 'float' },
      { title: 'Never give up!', speak: "You learned Jack and Jill! If you fall, get back up! Yay!", emoji: '🏆', anim: 'spin' },
    ];
  }

  // Stories
  if (lower.includes('lion') && lower.includes('mouse')) {
    return [
      { title: 'Lion and Mouse!', speak: "The Lion and the Mouse! A big lion and a tiny mouse!", emoji: '🦁', anim: 'pop' },
      { title: 'Roaring lion!', speak: "The lion roars! ROAR! But the tiny mouse is not scared!", emoji: '🐭', anim: 'shake' },
      { title: 'Mouse helps lion!', speak: "The mouse chews the net! Chip chip chip! Lion is free!", emoji: '🦴', anim: 'wiggle' },
      { title: 'Big and small!', speak: "Even tiny friends can help! The mouse saved the lion!", emoji: '💝', anim: 'pulse' },
      { title: 'Be kind!', speak: "Always be kind to everyone! Big or small! Kindness matters!", emoji: '🤗', anim: 'float' },
      { title: 'Can you say Lion?', speak: "Say Lion! Lllion! Say Mouse! Mmmouse! You can do it!", emoji: '🗣️', anim: 'jump' },
      { title: 'Kindness star!', speak: "You learned Lion and Mouse! Be kind like the mouse! Give a hug!", emoji: '⭐', anim: 'spin' },
    ];
  }
  if (lower.includes('thirsty') || (lower.includes('crow') && !lower.includes('snow'))) {
    return [
      { title: 'Thirsty Crow!', speak: "The Thirsty Crow! A crow is very very thirsty!", emoji: '🐦', anim: 'pop' },
      { title: 'Where is water?', speak: "The crow looks for water! But the pot has only a little!", emoji: '🏺', anim: 'pulse' },
      { title: 'Clever crow!', speak: "The crow drops pebbles! One by one! Plop plop plop!", emoji: '🪨', anim: 'bounce' },
      { title: 'Water rises!', speak: "The water comes up! Up up up! Now the crow can drink!", emoji: '💧', anim: 'float' },
      { title: 'So clever!', speak: "The clever crow solved the problem! Think think think!", emoji: '🧠', anim: 'pulse' },
      { title: 'Never give up!', speak: "The crow did not give up! Try try try again!", emoji: '💪', anim: 'jump' },
      { title: 'Smart crow champ!', speak: "You learned Thirsty Crow! Be clever, never give up! Clap!", emoji: '🎉', anim: 'shake' },
    ];
  }
  if ((lower.includes('hare') && lower.includes('tortoise')) || lower.includes('slow') || (lower.includes('tortoise') && lower.includes('hare'))) {
    return [
      { title: 'Hare and Tortoise!', speak: "The Hare and the Tortoise! Fast rabbit... slow turtle... who wins?", emoji: '🐰', anim: 'pop' },
      { title: 'Hare is too fast!', speak: "The hare zooms fast! Too fast! He stops to take a nap!", emoji: '💨', anim: 'jump' },
      { title: 'Tortoise keeps going!', speak: "Slow and steady! The tortoise keeps walking! Step by step!", emoji: '🐢', anim: 'pulse' },
      { title: 'Hare wakes up!', speak: "The hare wakes up! Oh no! The tortoise is almost at the finish!", emoji: '😲', anim: 'shake' },
      { title: 'Tortoise wins!', speak: "Slow and steady wins the race! The tortoise did it!", emoji: '🏆', anim: 'spin' },
      { title: 'Don\'t give up!', speak: "Keep going! Even if you are slow, don't stop! You can win!", emoji: '💪', anim: 'bounce' },
      { title: 'Steady winner!', speak: "You learned Hare and Tortoise! Slow and steady wins! Yay!", emoji: '🎊', anim: 'shake' },
    ];
  }
  if (lower.includes('ugly') || lower.includes('duckling') || lower.includes('swan')) {
    return [
      { title: 'Ugly Duckling!', speak: "The Ugly Duckling! A baby duck looks different from others!", emoji: '🐤', anim: 'pop' },
      { title: 'They tease him!', speak: "The other ducks say: You are ugly! Go away!", emoji: '😢', anim: 'pulse' },
      { title: 'He is sad!', speak: "The little duckling is so sad and lonely! He hides away!", emoji: '😔', anim: 'float' },
      { title: 'He grows up!', speak: "Days pass, the duckling grows... and grows... and changes!", emoji: '🦢', anim: 'float' },
      { title: 'A beautiful swan!', speak: "He is not a duck! He is a beautiful white swan! So pretty!", emoji: '🕊️', anim: 'spin' },
      { title: 'You are special!', speak: "Everyone is special! Don't let anyone make you sad! You are beautiful!", emoji: '💖', anim: 'pulse' },
      { title: 'Beautiful you!', speak: "You learned Ugly Duckling! You are special and beautiful! Hug!", emoji: '🤗', anim: 'shake' },
    ];
  }
  if (lower.includes('gingerbread') || lower.includes('ginger')) {
    return [
      { title: 'Gingerbread Man!', speak: "Run run run! The Gingerbread Man! He runs away!", emoji: '🫚', anim: 'pop' },
      { title: 'Baked by grandma!', speak: "Grandma bakes a gingerbread man! But he jumps up and runs!", emoji: '👩‍🍳', anim: 'pulse' },
      { title: 'Run run run!', speak: "Run run as fast as you can! You can't catch me, I'm the Gingerbread Man!", emoji: '🏃', anim: 'jump' },
      { title: 'Animals chase him!', speak: "The cow chases! The horse chases! But Gingerbread Man is too fast!", emoji: '🐄', anim: 'bounce' },
      { title: 'Fox helps?', speak: "A sly fox says: I can help you cross the river! Hop on my nose!", emoji: '🦊', anim: 'wiggle' },
      { title: 'Snap!', speak: "The fox snaps! Yum yum! The gingerbread man is gone!", emoji: '😋', anim: 'shake' },
      { title: 'Run and play!', speak: "You learned Gingerbread Man! Run run run! Time for a run race!", emoji: '🎯', anim: 'spin' },
    ];
  }
  if (lower.includes('red') && lower.includes('riding') || lower.includes('wolf') && lower.includes('hood')) {
    return [
      { title: 'Red Riding Hood!', speak: "Little Red Riding Hood! Grandmother's basket is full of goodies!", emoji: '🧺', anim: 'pop' },
      { title: 'Walking through woods!', speak: "Through the woods she walks! Picking flowers along the way!", emoji: '🌺', anim: 'float' },
      { title: 'Big bad wolf!', speak: "The wolf asks: Where are you going, little girl? To Grandma's house!", emoji: '🐺', anim: 'shake' },
      { title: 'Wolf tricks her!', speak: "The wolf runs to Grandma's! He swallows Grandma! Oh no!", emoji: '😱', anim: 'bounce' },
      { title: 'Big eyes and teeth!', speak: "Grandma, what big eyes you have! And big teeth! All the better to eat you!", emoji: '👀', anim: 'pulse' },
      { title: 'Woodcutter saves!', speak: "The woodcutter hears! He saves Grandma and Red! The wolf runs away!", emoji: '🪓', anim: 'jump' },
      { title: 'Safe and sound!', speak: "You learned Red Riding Hood! Don't talk to strangers! Stay safe!", emoji: '🛡️', anim: 'spin' },
    ];
  }

  // Phonics
  if (lower.includes('at') && (lower.includes('am') || lower.includes('an')) && (lower.includes('phonics') || lower.includes('family') || lower.includes('word'))) {
    return [
      { title: "🏠 Welcome to the 'at' Family!", speak: "Welcome little reader! Today we meet a word family where every word ends with 'at'. Let's spell them together!", emoji: '🏠', anim: 'pop', word: 'at', family: 'at' },
      { title: "🐱 c-a-t spells Cat!", speak: "c-a-t... cat! A soft furry cat that says meow! Can you spell cat with me? c-a-t!", emoji: '🐱', anim: 'bounce', word: 'cat', family: 'at' },
      { title: "🦇 b-a-t spells Bat!", speak: "b-a-t... bat! A bat that flies in the night sky! Flap your arms like a bat! b-a-t!", emoji: '🦇', anim: 'float', word: 'bat', family: 'at' },
      { title: "🎩 h-a-t spells Hat!", speak: "h-a-t... hat! A fancy hat for your head! Tap tap, put it on! h-a-t!", emoji: '🎩', anim: 'pop', word: 'hat', family: 'at' },
      { title: "👨 m-a-n spells Man!", speak: "m-a-n... man! A friendly man waves hello! Wave back and say m-a-n!", emoji: '👨', anim: 'pulse', word: 'man', family: 'an' },
      { title: "🌀 f-a-n spells Fan!", speak: "f-a-n... fan! A spinning fan that goes round and round! Spin your finger! f-a-n!", emoji: '🌀', anim: 'spin', word: 'fan', family: 'an' },
      { title: "⭐ You read 'at' words!", speak: "You read cat, bat, hat — all with 'at'! And man, fan — with 'an'! Give yourself a big clap!", emoji: '⭐', anim: 'shake' },
    ];
  }
  if (lower.includes('it') && (lower.includes('in') || lower.includes('ig')) && (lower.includes('phonics') || lower.includes('family') || lower.includes('word'))) {
    return [
      { title: "🏠 Welcome to the 'it' Family!", speak: "Here is a tiny word family — 'it'! With just two letters we can make many words. Let's explore!", emoji: '🏠', anim: 'pop', word: 'it', family: 'it' },
      { title: "🕳️ p-i-t spells Pit!", speak: "p-i-t... pit! A deep hole in the ground! Be careful, step around! p-i-t!", emoji: '🕳️', anim: 'bounce', word: 'pit', family: 'it' },
      { title: "🪑 s-i-t spells Sit!", speak: "s-i-t... sit! Time to sit down nicely! Plop on your bottom and say s-i-t!", emoji: '🪑', anim: 'pulse', word: 'sit', family: 'it' },
      { title: "🐷 p-i-g spells Pig!", speak: "p-i-g... pig! A happy pink pig that says oink oink! Snort like a pig! p-i-g!", emoji: '🐷', anim: 'bounce', word: 'pig', family: 'ig' },
      { title: "📌 p-i-n spells Pin!", speak: "p-i-n... pin! A tiny pin that sticks on your shirt! Tap tap! p-i-n!", emoji: '📌', anim: 'pulse', word: 'pin', family: 'in' },
      { title: "🏆 You read 'it' words!", speak: "Pit, sit with 'it'! Pig with 'ig'! Pin with 'in'! You read every word! Clever you!", emoji: '🏆', anim: 'spin' },
    ];
  }
  if (lower.includes('op') && (lower.includes('ot') || lower.includes('og')) && (lower.includes('phonics') || lower.includes('family') || lower.includes('word'))) {
    return [
      { title: "🏠 Welcome to the 'op' Family!", speak: "Now we meet three families — 'op', 'ot' and 'og'! Each one makes fun words. Let's begin!", emoji: '🏠', anim: 'pop', word: 'op', family: 'op' },
      { title: "🧹 m-o-p spells Mop!", speak: "m-o-p... mop! Swish swash, clean the floor! Grab your mop and say m-o-p!", emoji: '🧹', anim: 'wiggle', word: 'mop', family: 'op' },
      { title: "🍲 p-o-t spells Pot!", speak: "p-o-t... pot! Hot yummy soup cooking in a pot! Slurp slurp! p-o-t!", emoji: '🍲', anim: 'bounce', word: 'pot', family: 'ot' },
      { title: "🐶 d-o-g spells Dog!", speak: "d-o-g... dog! A happy dog wags its tail! Woof woof! Can you wag like a dog? d-o-g!", emoji: '🐶', anim: 'jump', word: 'dog', family: 'og' },
      { title: "🪵 l-o-g spells Log!", speak: "l-o-g... log! A big log to sit on in the forest! Rest your legs and say l-o-g!", emoji: '🪵', anim: 'pulse', word: 'log', family: 'og' },
      { title: "✨ You read 'op' words!", speak: "Mop with 'op', pot with 'ot', dog and log with 'og'! Three families, you read them all! Fantastic!", emoji: '✨', anim: 'shake' },
    ];
  }

  // CVC words
  if (lower.includes('cvc') || (lower.includes('cat') && lower.includes('bat') && lower.includes('hat'))) {
    return [
      { title: "📖 What are CVC Words?", speak: "CVC words have just three letters — a consonant, a vowel, and a consonant. Let's blend sounds and read them!", emoji: '📖', anim: 'pop', word: 'cat' },
      { title: "🐱 c-a-t says Cat!", speak: "c-a-t... cat! A soft furry cat purring on your lap! Pet the cat and say c-a-t!", emoji: '🐱', anim: 'pulse', word: 'cat' },
      { title: "🦇 b-a-t says Bat!", speak: "b-a-t... bat! A bat soaring through the night! Flap your wings and say b-a-t!", emoji: '🦇', anim: 'float', word: 'bat' },
      { title: "🎩 h-a-t says Hat!", speak: "h-a-t... hat! A colourful hat sitting on your head! Touch your head and say h-a-t!", emoji: '🎩', anim: 'bounce', word: 'hat' },
      { title: "🧶 m-a-t says Mat!", speak: "m-a-t... mat! A soft mat to sit and play on! Cross your legs and say m-a-t!", emoji: '🧶', anim: 'pulse', word: 'mat' },
      { title: "🐀 r-a-t says Rat!", speak: "r-a-t... rat! A tiny rat scurrying across the floor! Run your fingers and say r-a-t!", emoji: '🐀', anim: 'jump', word: 'rat' },
      { title: "🌟 You read CVC words!", speak: "Cat, bat, hat, mat, rat — five CVC words all by yourself! You are a blending superstar! Clap clap clap!", emoji: '🌟', anim: 'shake' },
    ];
  }

  // Default fallback
  return [
    { title: title, speak: `Let's study ${title}!`, emoji: '📚', anim: 'pop' }
  ];
}
