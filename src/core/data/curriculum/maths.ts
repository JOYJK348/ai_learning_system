import { type TutorialStep } from './english';

export function getChapterVisuals(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('readiness') || lower.includes('counting'))
    return { emoji: '🔢', mascot: '🧮', color: 'from-orange-400 to-amber-500', sound: 'Number Readiness & Counting!', image: '/assets/subjects/maths_numbers_6_10-removebg-preview.png' };
  if (lower.includes('addition'))
    return { emoji: '➕', mascot: '🍎', color: 'from-rose-450 to-pink-500', sound: 'Addition Basics!', image: '/assets/subjects/maths_pre_math_concepts-removebg-preview.png' };
  if (lower.includes('subtraction'))
    return { emoji: '➖', mascot: '🍏', color: 'from-amber-400 to-orange-500', sound: 'Subtraction Basics!', image: '/assets/subjects/maths_pre_math_concepts-removebg-preview.png' };
  if (lower.includes('comparing'))
    return { emoji: '🔀', mascot: '📊', color: 'from-indigo-400 to-violet-500', sound: 'Comparing Numbers!', image: '/assets/subjects/maths_sorting_comparison-removebg-preview.png' };
  if (lower.includes('measurement'))
    return { emoji: '📏', mascot: '📐', color: 'from-cyan-400 to-blue-500', sound: 'Measurement!', image: '/assets/subjects/maths_pre_math_concepts-removebg-preview.png' };
  if (lower.includes('shape') || lower.includes('spatial'))
    return { emoji: '⭕', mascot: '⬛', color: 'from-blue-400 to-cyan-500', sound: 'Shapes!', image: '/assets/subjects/maths_shapes_spatial_awareness-removebg-preview.png' };
  if (lower.includes('position') || lower.includes('direction'))
    return { emoji: '📍', mascot: '📌', color: 'from-pink-400 to-rose-500', sound: 'Position & Direction!', image: '/assets/subjects/maths_position_words-removebg-preview.png' };
  if (lower.includes('pattern'))
    return { emoji: '🔁', mascot: '🎨', color: 'from-yellow-400 to-orange-500', sound: 'Patterns!', image: '/assets/subjects/maths_patterns-removebg-preview.png' };
  if (lower.includes('sort') || lower.includes('classification'))
    return { emoji: '🔀', mascot: '📊', color: 'from-indigo-400 to-violet-500', sound: 'Sorting & Classification!', image: '/assets/subjects/maths_sorting_comparison-removebg-preview.png' };
  if (lower.includes('time') || lower.includes('calendar'))
    return { emoji: '🕒', mascot: '📅', color: 'from-teal-400 to-cyan-500', sound: 'Time & Calendar!', image: '/assets/subjects/maths_position_words-removebg-preview.png' };

  if (lower.includes('pre-math') || lower.includes('concepts'))
    return { emoji: '🧠', mascot: '🤔', color: 'from-purple-400 to-pink-500', sound: 'Pre-Math Concepts!', image: '/assets/subjects/maths_pre_math_concepts-removebg-preview.png' };
  return { emoji: '🔢', mascot: '🧮', color: 'from-orange-400 to-amber-500', sound: `${name}!` };
}

export function getLessonVisuals(title: string) {
  const lower = title.toLowerCase();

  // Pre-Math Concepts
  if (lower.includes('big') && lower.includes('small'))
    return { emoji: '🐘', mascot: '🐁', color: 'from-purple-400 to-pink-500', sound: 'Big and Small!', image: '/assets/subjects/maths_pre_math_concepts-removebg-preview.png' };
  if (lower.includes('tall') && lower.includes('short'))
    return { emoji: '🌳', mascot: '🌱', color: 'from-green-400 to-emerald-500', sound: 'Tall and Short!', image: '/assets/subjects/maths_pre_math_concepts-removebg-preview.png' };
  if (lower.includes('more') && lower.includes('less'))
    return { emoji: '🍎', mascot: '🍏', color: 'from-red-400 to-rose-500', sound: 'More and Less!', image: '/assets/subjects/maths_sorting_comparison-removebg-preview.png' };
  if (lower.includes('heavy') && lower.includes('light'))
    return { emoji: '🪨', mascot: '🪶', color: 'from-amber-400 to-yellow-500', sound: 'Heavy and Light!', image: '/assets/subjects/maths_pre_math_concepts-removebg-preview.png' };
  if (lower.includes('same') && lower.includes('different') && lower.includes('object'))
    return { emoji: '🍎', mascot: '🧸', color: 'from-cyan-400 to-blue-500', sound: 'Same and Different!', image: '/assets/subjects/maths_sorting_comparison-removebg-preview.png' };

  // Shapes
  if (lower.includes('circle') && lower.includes('square'))
    return { emoji: '⭕', mascot: '⬛', color: 'from-blue-400 to-indigo-500', sound: 'Circle and Square!', image: '/assets/subjects/maths_shapes_spatial_awareness-removebg-preview.png' };
  if (lower.includes('triangle') && lower.includes('rectangle'))
    return { emoji: '🔺', mascot: '▬', color: 'from-orange-400 to-amber-500', sound: 'Triangle and Rectangle!', image: '/assets/subjects/maths_shapes_spatial_awareness-removebg-preview.png' };
  if (lower.includes('shape') && lower.includes('around'))
    return { emoji: '🔍', mascot: '🏠', color: 'from-sky-400 to-blue-500', sound: 'Shapes Around Us!', image: '/assets/subjects/maths_shapes_spatial_awareness-removebg-preview.png' };
  if (lower.includes('find') && lower.includes('shape'))
    return { emoji: '🎯', mascot: '🔍', color: 'from-pink-400 to-rose-500', sound: 'Find the Shape!', image: '/assets/subjects/maths_shapes_spatial_awareness-removebg-preview.png' };
  if (lower.includes('shape') && lower.includes('sort'))
    return { emoji: '🎨', mascot: '🧩', color: 'from-violet-400 to-purple-500', sound: 'Shape Sorting!', image: '/assets/subjects/maths_shapes_spatial_awareness-removebg-preview.png' };

  // Numbers 1-5
  if (lower.includes('how many') && (lower.includes('1') || lower.includes('2')) && !lower.includes('3') && !lower.includes('4') && !lower.includes('5') && !lower.includes('6') && !lower.includes('7') && !lower.includes('8') && !lower.includes('9') && !lower.includes('10'))
    return { emoji: '🍎', mascot: '✌️', color: 'from-red-400 to-rose-500', sound: 'Count 1 and 2!', image: '/assets/subjects/maths_numbers_1_5-removebg-preview.png' };
  if (lower.includes('how many') && (lower.includes('3') || lower.includes('4')))
    return { emoji: '🐱', mascot: '🍀', color: 'from-green-400 to-emerald-500', sound: 'Count 3 and 4!', image: '/assets/subjects/maths_numbers_1_5-removebg-preview.png' };
  if (lower.includes('how many') && lower.includes('5'))
    return { emoji: '✋', mascot: '🖐️', color: 'from-orange-400 to-amber-500', sound: 'Count to 5!', image: '/assets/subjects/maths_numbers_1_5-removebg-preview.png' };
  if (lower.includes('count') && lower.includes('review') && lower.includes('1-5'))
    return { emoji: '🔢', mascot: '🎯', color: 'from-amber-400 to-yellow-500', sound: 'Count 1 to 5!', image: '/assets/subjects/maths_numbers_1_5-removebg-preview.png' };

  // Numbers 6-10
  if (lower.includes('how many') && (lower.includes('6') || lower.includes('7')))
    return { emoji: '🐟', mascot: '🐠', color: 'from-blue-400 to-cyan-500', sound: 'Count 6 and 7!', image: '/assets/subjects/maths_numbers_6_10-removebg-preview.png' };
  if (lower.includes('how many') && (lower.includes('8') || lower.includes('9') || lower.includes('10')))
    return { emoji: '🐧', mascot: '🔟', color: 'from-purple-400 to-pink-500', sound: 'Count 8 to 10!', image: '/assets/subjects/maths_numbers_6_10-removebg-preview.png' };
  if (lower.includes('count') && lower.includes('object') && lower.includes('1-10'))
    return { emoji: '🧮', mascot: '📦', color: 'from-teal-400 to-cyan-500', sound: 'Count Objects!', image: '/assets/subjects/maths_numbers_6_10-removebg-preview.png' };
  if (lower.includes('count') && lower.includes('match') && lower.includes('1-10'))
    return { emoji: '🧩', mascot: '🔗', color: 'from-indigo-400 to-violet-500', sound: 'Count and Match!', image: '/assets/subjects/maths_numbers_6_10-removebg-preview.png' };
  if (lower.includes('before') && lower.includes('after'))
    return { emoji: '✨', mascot: '⭐', color: 'from-yellow-400 to-orange-500', sound: 'Before and After!', image: '/assets/subjects/maths_numbers_6_10-removebg-preview.png' };

  // Position Words
  if (lower.includes('inside') && lower.includes('outside'))
    return { emoji: '📦', mascot: '🏠', color: 'from-cyan-400 to-blue-500', sound: 'Inside and Outside!', image: '/assets/subjects/maths_position_words-removebg-preview.png' };
  if (lower.includes('above') && lower.includes('below'))
    return { emoji: '⬆️', mascot: '⬇️', color: 'from-sky-400 to-indigo-500', sound: 'Above and Below!', image: '/assets/subjects/maths_position_words-removebg-preview.png' };
  if (lower.includes('top') && lower.includes('bottom'))
    return { emoji: '⛰️', mascot: '🏔️', color: 'from-emerald-400 to-teal-500', sound: 'Top and Bottom!', image: '/assets/subjects/maths_position_words-removebg-preview.png' };
  if (lower.includes('left') && lower.includes('right'))
    return { emoji: '👈', mascot: '👉', color: 'from-pink-400 to-rose-500', sound: 'Left and Right!', image: '/assets/subjects/maths_position_words-removebg-preview.png' };
  if (lower.includes('near') && lower.includes('far'))
    return { emoji: '🐶', mascot: '🏡', color: 'from-amber-400 to-orange-500', sound: 'Near and Far!', image: '/assets/subjects/maths_position_words-removebg-preview.png' };
  if (lower.includes('open') && lower.includes('close'))
    return { emoji: '🚪', mascot: '📂', color: 'from-violet-400 to-purple-500', sound: 'Open and Close!', image: '/assets/subjects/maths_position_words-removebg-preview.png' };

  // Sorting & Comparison
  if (lower.includes('sort') && lower.includes('color'))
    return { emoji: '🎨', mascot: '🌈', color: 'from-pink-400 to-purple-500', sound: 'Sort by Color!', image: '/assets/subjects/maths_sorting_comparison-removebg-preview.png' };
  if (lower.includes('sort') && lower.includes('size'))
    return { emoji: '📏', mascot: '📐', color: 'from-green-400 to-emerald-500', sound: 'Sort by Size!', image: '/assets/subjects/maths_sorting_comparison-removebg-preview.png' };
  if (lower.includes('compare') && lower.includes('group'))
    return { emoji: '🔢', mascot: '📊', color: 'from-orange-400 to-amber-500', sound: 'Compare Groups!', image: '/assets/subjects/maths_sorting_comparison-removebg-preview.png' };
  if (lower.includes('same') && lower.includes('different'))
    return { emoji: '🔍', mascot: '🧩', color: 'from-indigo-400 to-violet-500', sound: 'Same and Different!', image: '/assets/subjects/maths_sorting_comparison-removebg-preview.png' };

  // Patterns
  if (lower.includes('color') && lower.includes('pattern'))
    return { emoji: '🔴', mascot: '🔵', color: 'from-red-400 to-blue-500', sound: 'Color Patterns!', image: '/assets/subjects/maths_patterns-removebg-preview.png' };
  if (lower.includes('shape') && lower.includes('pattern'))
    return { emoji: '⭕', mascot: '🔺', color: 'from-yellow-400 to-orange-500', sound: 'Shape Patterns!', image: '/assets/subjects/maths_patterns-removebg-preview.png' };
  if (lower.includes('complete') && lower.includes('pattern'))
    return { emoji: '🧩', mascot: '🎯', color: 'from-purple-400 to-pink-500', sound: 'Complete the Pattern!', image: '/assets/subjects/maths_patterns-removebg-preview.png' };

  return { emoji: '🔢', mascot: '🧮', color: 'from-orange-400 to-amber-500', sound: `${title}!`, image: '/assets/subjects/maths-removebg-preview.png' };
}

export function buildTutorial(title: string, studentName?: string): TutorialStep[] {
  const t = title.trim();
  const lower = t.toLowerCase();
  const name = studentName || 'kiddo';

  // ────── Pre-Math Concepts ──────

  if (lower.includes('big') && lower.includes('small')) {
    return [
      { title: 'Big & Small!', speak: `${name}! Let's learn Big and Small! An elephant is big! A mouse is small!`, emoji: '🐘', anim: 'pop' },
      { title: 'Look at the elephant!', speak: 'The elephant is SO big! It has big ears and a big trunk!', emoji: '🐘', anim: 'bounce' },
      { title: 'Look at the mouse!', speak: 'The mouse is so small! It can fit in your hand! Squeak squeak!', emoji: '🐁', anim: 'wiggle' },
      { title: 'Big ball, small ball!', speak: 'A big ball and a small ball! Which one is big? Point to the big one!', emoji: '⚽', anim: 'float' },
      { title: 'You know big & small!', speak: `Amazing ${name}! You know Big and Small! Give yourself a big hug!`, emoji: '🌟', anim: 'shake' },
    ];
  }
  if (lower.includes('tall') && lower.includes('short')) {
    return [
      { title: 'Tall & Short!', speak: `${name}! Let's learn Tall and Short! A tree is tall! A flower is short!`, emoji: '🌳', anim: 'pop' },
      { title: 'The tall tree!', speak: 'This tree is so tall it touches the sky! Way up high!', emoji: '🌳', anim: 'jump' },
      { title: 'The short flower!', speak: 'This little flower is short! It grows close to the ground!', emoji: '🌷', anim: 'float' },
      { title: 'Tall building!', speak: 'See the tall building? It goes up up up! Point your finger up!', emoji: '🏢', anim: 'bounce' },
      { title: 'Tall & short champ!', speak: `You did it ${name}! Tall and Short! Stand up tall for yourself!`, emoji: '🏆', anim: 'spin' },
    ];
  }
  if (lower.includes('more') && lower.includes('less')) {
    return [
      { title: 'More & Less!', speak: `${name}! Let's learn More and Less! Which pile has more apples?`, emoji: '🍎', anim: 'pop' },
      { title: 'More apples!', speak: 'Look! This basket has MORE apples! 🍎🍎🍎 Three apples!', emoji: '🍎', anim: 'bounce' },
      { title: 'Less apples!', speak: 'This basket has LESS apples! 🍏 Only one apple!', emoji: '🍏', anim: 'wiggle' },
      { title: 'More cookies!', speak: 'Which plate has more cookies? The one with 5 or the one with 2?', emoji: '🍪', anim: 'float' },
      { title: 'More & less star!', speak: `Brilliant ${name}! More and Less is easy for you! You are so smart!`, emoji: '⭐', anim: 'shake' },
    ];
  }
  if (lower.includes('heavy') && lower.includes('light')) {
    return [
      { title: 'Heavy & Light!', speak: `${name}! Let's learn Heavy and Light! A rock is heavy! A feather is light!`, emoji: '🪨', anim: 'pop' },
      { title: 'The heavy rock!', speak: 'Ugh! This rock is so heavy! I cannot lift it! Heave ho!', emoji: '🪨', anim: 'pulse' },
      { title: 'The light feather!', speak: 'This feather is so light! It floats in the air! Whoosh!', emoji: '🪶', anim: 'float' },
      { title: 'Heavy or light?', speak: 'A big book is heavy! A balloon is light! Which is which?', emoji: '🎈', anim: 'bounce' },
      { title: 'Heavy & light pro!', speak: `Awesome ${name}! You know Heavy and Light! You are lifting up your knowledge!`, emoji: '💪', anim: 'shake' },
    ];
  }
  if (lower.includes('same') && lower.includes('different') && lower.includes('object')) {
    return [
      { title: 'Same & Different!', speak: `${name}! Let's find Same and Different objects! Look closely!`, emoji: '🔍', anim: 'pop' },
      { title: 'Two same apples!', speak: 'These two apples are the SAME! 🍎🍎 Both red and round! Match match!', emoji: '🍎', anim: 'bounce' },
      { title: 'Find the different toy!', speak: 'Look at these toys! 🧸🧸🪀 Which one is different? Yes! The spinning top!', emoji: '🪀', anim: 'wiggle' },
      { title: 'Same color!', speak: 'Both balls are the SAME color! Red and round! Can you find two same things?', emoji: '🔴', anim: 'float' },
      { title: 'Observation star!', speak: `Wow ${name}! You found same and different like a detective! Amazing!`, emoji: '🔍', anim: 'shake' },
    ];
  }

  // ────── Shapes ──────

  if (lower.includes('circle') && lower.includes('square')) {
    return [
      { title: 'Circle & Square!', speak: `${name}! Let's learn Circle and Square! Round circle, boxy square!`, emoji: '⭕', anim: 'pop' },
      { title: 'Round circle!', speak: 'A circle is round! Like a ball, like the sun! Roll roll roll!', emoji: '⚽', anim: 'bounce' },
      { title: 'Boxy square!', speak: 'A square has four sides! All the same! Like a window, like a block!', emoji: '⬛', anim: 'pulse' },
      { title: 'Circle or square?', speak: 'Is this a circle or a square? Point to the round one!', emoji: '🎯', anim: 'float' },
      { title: 'Shape superstar!', speak: `Fantastic ${name}! You know Circle and Square! Let's draw them in the air!`, emoji: '⭐', anim: 'spin' },
    ];
  }
  if (lower.includes('triangle') && lower.includes('rectangle')) {
    return [
      { title: 'Triangle & Rectangle!', speak: `${name}! Let's learn Triangle and Rectangle! Pointy roof, long door!`, emoji: '🔺', anim: 'pop' },
      { title: 'Pointy triangle!', speak: 'A triangle has three sides! Like a pizza slice! Yum yum!', emoji: '🍕', anim: 'bounce' },
      { title: 'Long rectangle!', speak: 'A rectangle has four sides! Two are long, two are short! Like a door!', emoji: '🚪', anim: 'float' },
      { title: 'Find the shape!', speak: 'Which one is a triangle? Which one is a rectangle? Point and say!', emoji: '🔍', anim: 'wiggle' },
      { title: 'Shape genius!', speak: `Brilliant ${name}! You know Triangle and Rectangle! So many shapes!`, emoji: '🏆', anim: 'shake' },
    ];
  }
  if (lower.includes('shape') && lower.includes('around')) {
    return [
      { title: 'Shapes Around Us!', speak: `${name}! Shapes are everywhere! Let's find them around us!`, emoji: '🔍', anim: 'pop' },
      { title: 'Circle in the clock!', speak: 'Look at the clock on the wall! It is ROUND like a CIRCLE! Tick tock!', emoji: '🕐', anim: 'float' },
      { title: 'Square in the window!', speak: 'The window has four sides! It is a SQUARE! Peek-a-boo!', emoji: '🪟', anim: 'bounce' },
      { title: 'Triangle on the roof!', speak: 'The house roof is pointy! It is a TRIANGLE! Up on top!', emoji: '🏠', anim: 'jump' },
      { title: 'Shape explorer!', speak: `Incredible ${name}! You found shapes in the world around you! Look around more!`, emoji: '🌍', anim: 'spin' },
    ];
  }
  if (lower.includes('find') && lower.includes('shape')) {
    return [
      { title: 'Find the Shape!', speak: `${name}! Can you find the shape I am looking for? Look carefully!`, emoji: '🎯', anim: 'pop' },
      { title: 'Find the circle!', speak: 'Where is the circle? Is it the ball? Is it the block? Tap the round one!', emoji: '⚽', anim: 'bounce' },
      { title: 'Find the square!', speak: 'Where is the square? Is it the dice? Is it the ball? Tap the square one!', emoji: '🎲', anim: 'pulse' },
      { title: 'Find the triangle!', speak: 'Where is the triangle? Look for three pointy corners!', emoji: '🔺', anim: 'wiggle' },
      { title: 'Shape hunter!', speak: `Super ${name}! You found every shape! You are a shape hunter champion!`, emoji: '🏅', anim: 'shake' },
    ];
  }
  if (lower.includes('shape') && lower.includes('sort')) {
    return [
      { title: 'Shape Sorting!', speak: `${name}! Time to sort shapes! Put same shapes together!`, emoji: '🎨', anim: 'pop' },
      { title: 'Sort the circles!', speak: 'All the circles go here! Round and round! Roll them together!', emoji: '⭕', anim: 'bounce' },
      { title: 'Sort the squares!', speak: 'All the squares go here! Four sides together! Stack them up!', emoji: '⬛', anim: 'pulse' },
      { title: 'Mix and sort!', speak: 'Circles and squares mixed up! Can you sort them? Yes you can!', emoji: '🔄', anim: 'wiggle' },
      { title: 'Sorting master!', speak: `Amazing ${name}! You sorted all the shapes! Neat and tidy!`, emoji: '🧹', anim: 'spin' },
    ];
  }

  // ────── Numbers 1-5 ──────

  if (lower.includes('how many') && lower.includes('1') && lower.includes('2') && !lower.includes('3')) {
    return [
      { title: 'How Many? 1 & 2!', speak: `${name}! Let's count together! First we learn 1 and 2!`, emoji: '🍎', anim: 'pop' },
      { title: 'One apple!', speak: 'One red apple! 🍎 Hold up one finger! How many? ONE!', emoji: '🍎', anim: 'bounce' },
      { title: 'Two apples!', speak: 'Two apples! 🍎🍎 Hold up two fingers! How many? TWO!', emoji: '🍎', anim: 'float' },
      { title: 'Count with me!', speak: 'One ball... Two balls! Point and count: 1, 2!', emoji: '⚽', anim: 'jump' },
      { title: 'Number star!', speak: `Yay ${name}! You can count 1 and 2! Let's trace number 1 and 2 now!`, emoji: '✏️', anim: 'shake' },
    ];
  }
  if (lower.includes('how many') && lower.includes('3') && lower.includes('4')) {
    return [
      { title: 'How Many? 3 & 4!', speak: `${name}! Let's count 3 and 4! Three kittens, four paws!`, emoji: '🐱', anim: 'pop' },
      { title: 'Three kittens!', speak: 'Three little kittens! 🐱🐱🐱 Count with me: 1, 2, 3!', emoji: '🐱', anim: 'bounce' },
      { title: 'Four leaves!', speak: 'Four green leaves! 🍀🍀🍀🍀 Count: 1, 2, 3, 4!', emoji: '🍀', anim: 'float' },
      { title: 'Count on fingers!', speak: 'Show me 3 fingers! Now show me 4 fingers! You did it!', emoji: '🖐️', anim: 'jump' },
      { title: 'Counting genius!', speak: `Fantastic ${name}! You can count 3 and 4! Let's trace them now!`, emoji: '🌟', anim: 'shake' },
    ];
  }
  if (lower.includes('how many') && lower.includes('5')) {
    return [
      { title: 'How Many? 5!', speak: `${name}! Let's count to 5! Five fingers on one hand!`, emoji: '✋', anim: 'pop' },
      { title: 'Five fingers!', speak: 'High five! ✋ Count your fingers: 1, 2, 3, 4, 5!', emoji: '🖐️', anim: 'bounce' },
      { title: 'Five stars!', speak: 'Five stars in the sky! ⭐⭐⭐⭐⭐ Twinkle twinkle!', emoji: '⭐', anim: 'float' },
      { title: 'Count everything!', speak: 'How many blocks? 5! How many cookies? 5! Count count count!', emoji: '🍪', anim: 'wiggle' },
      { title: 'Count to 5 champ!', speak: `Woohoo ${name}! You can count to 5! That's amazing! Let's trace 5!`, emoji: '🎉', anim: 'spin' },
    ];
  }
  if (lower.includes('count') && lower.includes('review') && lower.includes('1-5')) {
    return [
      { title: 'Count 1 to 5!', speak: `${name}! Let's review counting from 1 to 5! You know them all!`, emoji: '🔢', anim: 'pop' },
      { title: '1, 2, 3!', speak: 'Count with me! 1, 2, 3! One fish, two fish, three fish!', emoji: '🐟', anim: 'bounce' },
      { title: '4, 5!', speak: '4, 5! Four ducks, five ducks! Great counting!', emoji: '🦆', anim: 'float' },
      { title: 'Review all numbers!', speak: "Let's count all together: 1, 2, 3, 4, 5! You did it!", emoji: '🎯', anim: 'jump' },
      { title: 'Numbers 1-5 pro!', speak: `Brilliant ${name}! You mastered numbers 1 to 5! Next up: 6 to 10!`, emoji: '🏆', anim: 'shake' },
    ];
  }

  // ────── Numbers 6-10 ──────

  if (lower.includes('how many') && lower.includes('6') && lower.includes('7')) {
    return [
      { title: 'How Many? 6 & 7!', speak: `${name}! Let's count 6 and 7! Six fish, seven stars!`, emoji: '🐟', anim: 'pop' },
      { title: 'Six fish!', speak: 'Six colorful fish swimming! 🐟🐟🐟🐟🐟🐟 Count: 1, 2, 3, 4, 5, 6!', emoji: '🐟', anim: 'bounce' },
      { title: 'Seven stars!', speak: 'Seven twinkling stars! ⭐⭐⭐⭐⭐⭐⭐ Count: 1 through 7!', emoji: '⭐', anim: 'float' },
      { title: 'Count on fingers!', speak: 'Show me 6 fingers! Now 7! You are counting so well!', emoji: '🖐️', anim: 'jump' },
      { title: 'Count 6 & 7 star!', speak: `Super ${name}! You can count 6 and 7! Let's trace them now!`, emoji: '🌟', anim: 'shake' },
    ];
  }
  if (lower.includes('how many') && (lower.includes('8') || lower.includes('9') || lower.includes('10'))) {
    return [
      { title: 'How Many? 8 to 10!', speak: `${name}! Let's count 8, 9, and 10! Almost to ten!`, emoji: '🐧', anim: 'pop' },
      { title: 'Eight penguins!', speak: 'Eight waddling penguins! 🐧🐧🐧🐧🐧🐧🐧🐧 Count: 1 through 8!', emoji: '🐧', anim: 'bounce' },
      { title: 'Nine balloons!', speak: 'Nine floating balloons! 🎈🎈🎈🎈🎈🎈🎈🎈🎈 Up up and away!', emoji: '🎈', anim: 'float' },
      { title: 'Ten fingers!', speak: 'Ten fingers on your hands! ✋✋ Count them all: 1 to 10!', emoji: '🖐️', anim: 'jump' },
      { title: 'Count to 10 hero!', speak: `Incredible ${name}! You can count to 10! You are a number hero!`, emoji: '🦸', anim: 'spin' },
    ];
  }
  if (lower.includes('count') && lower.includes('object') && lower.includes('1-10')) {
    return [
      { title: 'Count Objects!', speak: `${name}! Let's count objects from 1 to 10! Look and count!`, emoji: '📦', anim: 'pop' },
      { title: 'Count the blocks!', speak: 'How many blocks are here? 1, 2, 3... Count them one by one!', emoji: '🧱', anim: 'bounce' },
      { title: 'Count the toys!', speak: 'Toys on the shelf! Count each toy! Point and count!', emoji: '🧸', anim: 'float' },
      { title: 'Count the fruits!', speak: 'Fruits in the bowl! 🍎🍊🍋 Count them all! How many?', emoji: '🍎', anim: 'wiggle' },
      { title: 'Counting master!', speak: `Wow ${name}! You counted objects like a pro! Let's match numbers next!`, emoji: '🏆', anim: 'shake' },
    ];
  }
  if (lower.includes('count') && lower.includes('match') && lower.includes('1-10')) {
    return [
      { title: 'Count & Match!', speak: `${name}! Let's count and match numbers to objects!`, emoji: '🧩', anim: 'pop' },
      { title: 'Match 3 with stars!', speak: 'Three stars! ⭐⭐⭐ Which number goes with 3 stars? Yes, number 3!', emoji: '🔢', anim: 'bounce' },
      { title: 'Match 7 with dots!', speak: 'Seven dots! ⚫⚫⚫⚫⚫⚫⚫ Can you find number 7?', emoji: '⚫', anim: 'float' },
      { title: 'Match all numbers!', speak: 'Count the objects and find the matching number! You can do it!', emoji: '🎯', anim: 'jump' },
      { title: 'Match champion!', speak: `Amazing ${name}! You matched all numbers with objects! Super smart!`, emoji: '🧠', anim: 'shake' },
    ];
  }
  if (lower.includes('before') && lower.includes('after')) {
    return [
      { title: 'Before & After!', speak: `${name}! Let's learn what comes Before and After!`, emoji: '✨', anim: 'pop' },
      { title: 'What comes before?', speak: '5 comes before... 6! Yes! 1 comes before 2! What comes before 3?', emoji: '🔢', anim: 'bounce' },
      { title: 'What comes after?', speak: '2 comes after 1! 5 comes after 4! What comes after 7?', emoji: '⭐', anim: 'float' },
      { title: 'Number train!', speak: 'Numbers on a train! 🚂 1...2...3...4...5! What comes after 5?', emoji: '🚂', anim: 'jump' },
      { title: 'Before & after star!', speak: `Fantastic ${name}! You know before and after! Numbers make sense!`, emoji: '🌟', anim: 'shake' },
    ];
  }

  // ────── Position Words ──────

  if (lower.includes('inside') && lower.includes('outside')) {
    return [
      { title: 'Inside & Outside!', speak: `${name}! Let's learn Inside and Outside! In the box, out of the box!`, emoji: '📦', anim: 'pop' },
      { title: 'Inside the box!', speak: 'The toy is INSIDE the box! Peek-a-boo! Inside!', emoji: '🎁', anim: 'bounce' },
      { title: 'Outside the box!', speak: 'Now the toy is OUTSIDE! Sitting on top! Out in the open!', emoji: '🧸', anim: 'float' },
      { title: 'Inside or outside?', speak: 'Is the cat inside the house or outside? Point and tell me!', emoji: '🏠', anim: 'wiggle' },
      { title: 'Inside & outside pro!', speak: `Awesome ${name}! You know inside from outside! Where are you right now?`, emoji: '📍', anim: 'shake' },
    ];
  }
  if (lower.includes('above') && lower.includes('below')) {
    return [
      { title: 'Above & Below!', speak: `${name}! Let's learn Above and Below! Up high, down low!`, emoji: '⬆️', anim: 'pop' },
      { title: 'Above the table!', speak: 'The lamp is ABOVE the table! Hanging up high! Look up!', emoji: '💡', anim: 'jump' },
      { title: 'Below the table!', speak: 'The cat is BELOW the table! Sitting on the floor! Look down!', emoji: '🐱', anim: 'float' },
      { title: 'Above or below?', speak: 'Is the bird above the tree or below? The bird flies above!', emoji: '🐦', anim: 'bounce' },
      { title: 'Above & below champ!', speak: `Super ${name}! You know above and below! Up and down!`, emoji: '⭐', anim: 'shake' },
    ];
  }
  if (lower.includes('top') && lower.includes('bottom')) {
    return [
      { title: 'Top & Bottom!', speak: `${name}! Let's learn Top and Bottom! The peak and the base!`, emoji: '⛰️', anim: 'pop' },
      { title: 'Top of the mountain!', speak: 'At the TOP of the mountain! The highest point! Up here!', emoji: '🏔️', anim: 'jump' },
      { title: 'Bottom of the hill!', speak: 'At the BOTTOM of the hill! The lowest part! Down here!', emoji: '🌄', anim: 'float' },
      { title: 'Top or bottom?', speak: 'Is the star at the top of the tree or the bottom? The top!', emoji: '🎄', anim: 'bounce' },
      { title: 'Top & bottom pro!', speak: `Brilliant ${name}! You know top from bottom! You are on top of the world!`, emoji: '🌍', anim: 'spin' },
    ];
  }
  if (lower.includes('left') && lower.includes('right')) {
    return [
      { title: 'Left & Right!', speak: `${name}! Let's learn Left and Right! Your left hand, your right hand!`, emoji: '👈', anim: 'pop' },
      { title: 'Left hand!', speak: 'Raise your LEFT hand! Wave it! This is your left side!', emoji: '👈', anim: 'bounce' },
      { title: 'Right hand!', speak: 'Raise your RIGHT hand! Wave it! This is your right side!', emoji: '👉', anim: 'bounce' },
      { title: 'Left or right?', speak: 'The ball is on the LEFT! The bat is on the RIGHT! Can you point?', emoji: '⚽', anim: 'wiggle' },
      { title: 'Left & right star!', speak: `Amazing ${name}! You know left and right! Give a left high-five and a right high-five!`, emoji: '✋', anim: 'shake' },
    ];
  }
  if (lower.includes('near') && lower.includes('far')) {
    return [
      { title: 'Near & Far!', speak: `${name}! Let's learn Near and Far! Close to us, far away!`, emoji: '🐶', anim: 'pop' },
      { title: 'Near the house!', speak: 'The dog is NEAR the house! Right next to it! Close!', emoji: '🏠', anim: 'bounce' },
      { title: 'Far from the tree!', speak: 'The bird is FAR from the tree! Way over there in the sky!', emoji: '🐦', anim: 'float' },
      { title: 'Near or far?', speak: 'Is the car near or far? If it is close, it is near! If it is far, wave bye!', emoji: '🚗', anim: 'jump' },
      { title: 'Near & far champ!', speak: `Super ${name}! You know near and far! The world is big!`, emoji: '🌍', anim: 'shake' },
    ];
  }
  if (lower.includes('open') && lower.includes('close')) {
    return [
      { title: 'Open & Close!', speak: `${name}! Let's learn Open and Close! Open wide, close tight!`, emoji: '🚪', anim: 'pop' },
      { title: 'Open the door!', speak: 'Open the door! Creak... it swings open! Now we can go through!', emoji: '🚪', anim: 'bounce' },
      { title: 'Close the box!', speak: 'Close the box! Click! The lid is shut tight! Everything inside!', emoji: '📦', anim: 'pulse' },
      { title: 'Open or closed?', speak: "Is the book open or closed? The pages are open! Let's read!", emoji: '📖', anim: 'float' },
      { title: 'Open & close pro!', speak: `Awesome ${name}! You know open and close! Open your arms for a hug!`, emoji: '🤗', anim: 'shake' },
    ];
  }

  // ────── Sorting & Comparison ──────

  if (lower.includes('sort') && lower.includes('color')) {
    return [
      { title: 'Sort by Color!', speak: `${name}! Let's sort by color! Put red with red, blue with blue!`, emoji: '🎨', anim: 'pop' },
      { title: 'Red things!', speak: 'All RED things together! Red apple, red ball! Red red red!', emoji: '🔴', anim: 'bounce' },
      { title: 'Blue things!', speak: 'All BLUE things together! Blue sky, blue fish! Blue blue blue!', emoji: '🔵', anim: 'float' },
      { title: 'Mix and sort!', speak: 'Colors all mixed up! Can you sort them? Red here, blue there!', emoji: '🔄', anim: 'wiggle' },
      { title: 'Color sorting star!', speak: `Brilliant ${name}! You sorted by color! Your room will be so tidy!`, emoji: '🌈', anim: 'spin' },
    ];
  }
  if (lower.includes('sort') && lower.includes('size')) {
    return [
      { title: 'Sort by Size!', speak: `${name}! Let's sort by size! Big together, small together!`, emoji: '📏', anim: 'pop' },
      { title: 'Big things!', speak: 'BIG things here! Big ball, big box! So big!', emoji: '📦', anim: 'bounce' },
      { title: 'Small things!', speak: 'SMALL things here! Small ball, small toy! So tiny!', emoji: '🧸', anim: 'wiggle' },
      { title: 'Big or small?', speak: 'Is this big or small? Sort it into the right group!', emoji: '📐', anim: 'float' },
      { title: 'Size sorting master!', speak: `Amazing ${name}! You sorted by size! Big and small all in place!`, emoji: '🏆', anim: 'shake' },
    ];
  }
  if (lower.includes('compare') && lower.includes('group')) {
    return [
      { title: 'Compare Groups!', speak: `${name}! Let's compare groups! Which has more? Which has fewer?`, emoji: '🔢', anim: 'pop' },
      { title: 'More cookies!', speak: 'This group has 5 cookies! This group has 2 cookies! Which has MORE?', emoji: '🍪', anim: 'bounce' },
      { title: 'Fewer blocks!', speak: 'This group has 3 blocks! This group has 1 block! Which has FEWER?', emoji: '🧱', anim: 'float' },
      { title: 'Compare and choose!', speak: 'Point to the group with MORE! Now point to the group with FEWER!', emoji: '🎯', anim: 'jump' },
      { title: 'Comparison champ!', speak: `Wow ${name}! You compared groups like a mathematician! More and fewer!`, emoji: '📊', anim: 'shake' },
    ];
  }
  if (lower.includes('same') && lower.includes('different')) {
    return [
      { title: 'Same & Different!', speak: `${name}! Let's find what is the same and what is different!`, emoji: '🔍', anim: 'pop' },
      { title: 'Find the same!', speak: 'Look at these two! They are the SAME! Both are red circles!', emoji: '⭕', anim: 'bounce' },
      { title: 'Find the different!', speak: 'Which one is DIFFERENT? Three apples and one orange! The orange is different!', emoji: '🍊', anim: 'wiggle' },
      { title: 'Spot the odd one!', speak: 'Blue blue RED blue! Which color is different? RED!', emoji: '🎨', anim: 'float' },
      { title: 'Spot the difference pro!', speak: `Incredible ${name}! You found same and different! Your eyes are super sharp!`, emoji: '🦅', anim: 'shake' },
    ];
  }

  // ────── Patterns ──────

  if (lower.includes('color') && lower.includes('pattern')) {
    return [
      { title: 'Color Patterns!', speak: `${name}! Let's make colorful patterns! Red, blue, red, blue...!`, emoji: '🔴', anim: 'pop' },
      { title: 'Red blue red!', speak: 'Red... blue... red... blue... What comes next? Blue! Pattern power!', emoji: '🎨', anim: 'bounce' },
      { title: 'Green yellow green!', speak: 'Green... yellow... green... yellow... Can you say the next color?', emoji: '💚', anim: 'float' },
      { title: 'Complete the pattern!', speak: 'Red blue red ? Which color completes the pattern? Blue!', emoji: '🔵', anim: 'wiggle' },
      { title: 'Pattern master!', speak: `Brilliant ${name}! You made color patterns! Red blue red blue! Beautiful!`, emoji: '🌈', anim: 'spin' },
    ];
  }
  if (lower.includes('shape') && lower.includes('pattern')) {
    return [
      { title: 'Shape Patterns!', speak: `${name}! Let's make patterns with shapes! Circle, triangle, circle, triangle!`, emoji: '⭕', anim: 'pop' },
      { title: 'Circle triangle circle!', speak: 'Circle... triangle... circle... triangle... What comes next? Triangle!', emoji: '🔺', anim: 'bounce' },
      { title: 'Square circle square!', speak: 'Square... circle... square... circle... Can you say the next shape?', emoji: '⬛', anim: 'float' },
      { title: 'Finish the pattern!', speak: 'Circle triangle circle ? Which shape fits? Triangle! You got it!', emoji: '🎯', anim: 'wiggle' },
      { title: 'Shape pattern champ!', speak: `Fantastic ${name}! You made shape patterns! Your brain is growing!`, emoji: '🧠', anim: 'shake' },
    ];
  }
  if (lower.includes('complete') && lower.includes('pattern')) {
    return [
      { title: 'Complete the Pattern!', speak: `${name}! Let's finish all the patterns! What comes next?`, emoji: '🧩', anim: 'pop' },
      { title: 'Find the missing piece!', speak: 'Car... bus... car... bus... What is missing? The BUS! Vroom vroom!', emoji: '🚌', anim: 'bounce' },
      { title: 'Patterns in nature!', speak: 'Day... night... day... night... What comes after day? Night! 🌙', emoji: '🌙', anim: 'float' },
      { title: 'Patterns everywhere!', speak: 'Sun... cloud... sun... cloud... What comes next? Cloud! Patterns are everywhere!', emoji: '☁️', anim: 'wiggle' },
      { title: 'Pattern genius!', speak: `Incredible ${name}! You completed every pattern! You see patterns everywhere now!`, emoji: '🏆', anim: 'spin' },
    ];
  }

  // Default fallback
  return [
    { title: title, speak: `Let's learn ${title}! Are you ready, ${name}?`, emoji: '🔢', anim: 'pop' },
  ];
}
