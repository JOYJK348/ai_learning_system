import { type TutorialStep } from './english';

export function getChapterVisuals(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('myself'))
    return { emoji: '👧', mascot: '🧍', color: 'from-sky-400 to-blue-500', sound: 'All About Me!' };
  if (lower.includes('family') || lower.includes('home'))
    return { emoji: '👨‍👩‍👧', mascot: '🏠', color: 'from-pink-400 to-rose-500', sound: 'Family & Home!' };
  if (lower.includes('animal'))
    return { emoji: '🐶', mascot: '🐾', color: 'from-amber-400 to-orange-500', sound: 'Animals Around Us!' };
  if (lower.includes('plant') || lower.includes('nature'))
    return { emoji: '🌱', mascot: '🌳', color: 'from-green-400 to-emerald-500', sound: 'Plants & Nature!' };
  if (lower.includes('transport'))
    return { emoji: '🚗', mascot: '🚌', color: 'from-violet-400 to-purple-500', sound: 'Transport!' };
  if (lower.includes('habit') || lower.includes('food'))
    return { emoji: '🧼', mascot: '🍎', color: 'from-teal-400 to-cyan-500', sound: 'Good Habits!' };
  return { emoji: '🌍', mascot: '🌳', color: 'from-emerald-400 to-teal-500', sound: `Let's Explore!` };
}

export function getLessonVisuals(title: string) {
  const lower = title.toLowerCase();

  if (lower.includes('body') && lower.includes('part'))
    return { emoji: '🧍', mascot: '👀', color: 'from-sky-400 to-blue-500', sound: 'My Body Parts!' };
  if (lower.includes('five') && lower.includes('sense'))
    return { emoji: '👁️', mascot: '👂', color: 'from-indigo-400 to-violet-500', sound: 'My Five Senses!' };
  if (lower.includes('taking') && lower.includes('care'))
    return { emoji: '🪥', mascot: '🛁', color: 'from-cyan-400 to-teal-500', sound: 'Taking Care of My Body!' };

  if (lower.includes('family') && lower.includes('member'))
    return { emoji: '👨‍👩‍👧', mascot: '👵', color: 'from-pink-400 to-rose-500', sound: 'Family Members!' };
  if (lower.includes('home'))
    return { emoji: '🏠', mascot: '🛏️', color: 'from-orange-400 to-amber-500', sound: 'My Home!' };

  if (lower.includes('pet') && lower.includes('wild'))
    return { emoji: '🐕', mascot: '🦁', color: 'from-amber-400 to-yellow-500', sound: 'Pet & Wild Animals!' };
  if (lower.includes('animal') && lower.includes('sound'))
    return { emoji: '🐮', mascot: '🐱', color: 'from-orange-400 to-red-500', sound: 'Animal Sounds!' };
  if (lower.includes('animal') && lower.includes('home'))
    return { emoji: '🪺', mascot: '🏡', color: 'from-amber-400 to-brown-500', sound: 'Animal Homes!' };

  if (lower.includes('part') && lower.includes('plant'))
    return { emoji: '🌱', mascot: '🌻', color: 'from-green-400 to-emerald-500', sound: 'Parts of a Plant!' };
  if (lower.includes('thing') && lower.includes('nature'))
    return { emoji: '☀️', mascot: '🌈', color: 'from-sky-400 to-blue-500', sound: 'Things Around Nature!' };
  if (lower.includes('season'))
    return { emoji: '🌤️', mascot: '❄️', color: 'from-cyan-400 to-indigo-500', sound: 'Seasons!' };

  if (lower.includes('land') && lower.includes('transport'))
    return { emoji: '🚗', mascot: '🚲', color: 'from-violet-400 to-purple-500', sound: 'Land Transport!' };
  if (lower.includes('air') && lower.includes('water') && lower.includes('transport'))
    return { emoji: '✈️', mascot: '🚢', color: 'from-sky-400 to-blue-600', sound: 'Air & Water Transport!' };
  if (lower.includes('traffic') && lower.includes('rule'))
    return { emoji: '🚦', mascot: '🚸', color: 'from-red-400 to-rose-500', sound: 'Traffic Rules!' };

  if (lower.includes('clean') && lower.includes('habit'))
    return { emoji: '🧼', mascot: '🪥', color: 'from-cyan-400 to-teal-500', sound: 'Clean Habits!' };
  if (lower.includes('healthy') && lower.includes('food'))
    return { emoji: '🍎', mascot: '🥕', color: 'from-green-400 to-emerald-600', sound: 'Healthy Food!' };
  if (lower.includes('daily') && lower.includes('routine'))
    return { emoji: '⏰', mascot: '🌅', color: 'from-amber-400 to-yellow-500', sound: 'My Daily Routine!' };

  return { emoji: '🌍', mascot: '🌳', color: 'from-emerald-400 to-teal-500', sound: `${title}!` };
}

export function buildTutorial(title: string, studentName?: string): TutorialStep[] {
  const lower = title.toLowerCase();
  const name = studentName || 'kiddo';

  // ────── Chapter 1: Myself ──────

  if (lower.includes('body') && lower.includes('part')) {
    return [
      { title: 'My Body Parts!', speak: `${name}! Let's learn about our amazing body! You have so many parts!`, emoji: '🧍', anim: 'pop' },
      { title: 'My Eyes!', speak: 'These are your EYES! 👀 You use them to SEE! Blink blink!', emoji: '👀', anim: 'bounce' },
      { title: 'My Nose & Ears!', speak: 'Your NOSE 👃 smells flowers! Your EARS 👂 hear sounds!', emoji: '👂', anim: 'wiggle' },
      { title: 'My Hands & Legs!', speak: 'Your HANDS ✋ wave hello! Your LEGS 🦵 help you run and jump!', emoji: '✋', anim: 'jump' },
      { title: 'Body Parts Star!', speak: `Amazing ${name}! You know your body parts! Point to your nose!`, emoji: '⭐', anim: 'shake' },
    ];
  }
  if (lower.includes('five') && lower.includes('sense')) {
    return [
      { title: 'My Five Senses!', speak: `${name}! We have five senses! Let's discover them all!`, emoji: '👁️', anim: 'pop' },
      { title: 'I See!', speak: 'My EYES 👀 help me SEE! The sun, the trees, your smile!', emoji: '☀️', anim: 'bounce' },
      { title: 'I Hear & Smell!', speak: 'My EARS 👂 hear music! My NOSE 👃 smells yummy food!', emoji: '🎵', anim: 'float' },
      { title: 'I Taste & Touch!', speak: 'My TONGUE 👅 tastes sweet ice cream! My HANDS ✋ feel soft toys!', emoji: '🍦', anim: 'wiggle' },
      { title: 'Five Senses Champ!', speak: `Brilliant ${name}! You have five wonderful senses! High five!`, emoji: '✋', anim: 'spin' },
    ];
  }
  if (lower.includes('taking') && lower.includes('care')) {
    return [
      { title: 'Taking Care of My Body!', speak: `${name}! Let's learn how to take care of our body! Keep it clean and strong!`, emoji: '🪥', anim: 'pop' },
      { title: 'Brush Your Teeth!', speak: 'Brush your teeth every day! Up and down, round and round! Shiny smile!', emoji: '🪥', anim: 'bounce' },
      { title: 'Take a Bath!', speak: 'Splash splash! Take a bath to be clean! Soap and water!', emoji: '🛁', anim: 'float' },
      { title: 'Sleep Well!', speak: 'Sleep is important! Close your eyes and rest! Good night!', emoji: '😴', anim: 'pulse' },
      { title: 'Healthy Body Star!', speak: `Wonderful ${name}! Taking care of your body makes you strong!`, emoji: '💪', anim: 'shake' },
    ];
  }

  // ────── Chapter 2: Family & Home ──────

  if (lower.includes('family') && lower.includes('member')) {
    return [
      { title: 'My Family!', speak: `${name}! Let's meet your family! They love you so much!`, emoji: '👨‍👩‍👧', anim: 'pop' },
      { title: 'Mama & Papa!', speak: 'This is MOTHER 👩 and FATHER 👨! They take care of you! Hug them!', emoji: '🤗', anim: 'bounce' },
      { title: 'Siblings!', speak: 'Brother 👦 and Sister 👧! You play together and share toys!', emoji: '🧸', anim: 'float' },
      { title: 'Grandparents!', speak: 'Grandpa 👴 and Grandma 👵! They give you love and treats!', emoji: '🍪', anim: 'wiggle' },
      { title: 'Family Love!', speak: `Family is love ${name}! Give everyone a big hug! You are blessed!`, emoji: '💖', anim: 'shake' },
    ];
  }
  if (lower.includes('home')) {
    return [
      { title: 'My Home!', speak: `${name}! This is your HOME! Different rooms for different things!`, emoji: '🏠', anim: 'pop' },
      { title: 'Bedroom!', speak: 'This is the BEDROOM! 🛏️ Where you sleep and rest! Good night!', emoji: '🛏️', anim: 'pulse' },
      { title: 'Kitchen!', speak: 'This is the KITCHEN! 🍳 Where Mama cooks yummy food!', emoji: '🍳', anim: 'bounce' },
      { title: 'Bathroom!', speak: 'This is the BATHROOM! 🚿 Where you get clean! Splash splash!', emoji: '🚿', anim: 'float' },
      { title: 'Home Sweet Home!', speak: `Awesome ${name}! You know your home! Where is the kitchen? Point!`, emoji: '🏡', anim: 'shake' },
    ];
  }

  // ────── Chapter 3: Animals ──────

  if (lower.includes('pet') && lower.includes('wild')) {
    return [
      { title: 'Pet & Wild Animals!', speak: `${name}! Some animals live with us, some live in the wild!`, emoji: '🐕', anim: 'pop' },
      { title: 'Pet Animals!', speak: 'PET animals live with us! 🐕 Doggy! 🐈 Cat! 🐠 Fish! They are our friends!', emoji: '🐕', anim: 'bounce' },
      { title: 'Wild Animals!', speak: 'WILD animals live in the jungle! 🦁 Lion! 🐘 Elephant! 🐯 Tiger! They are free!', emoji: '🦁', anim: 'jump' },
      { title: 'Pet or Wild?', speak: 'Which lives with humans? A dog or a lion? The dog is a pet! Woof!', emoji: '🐕', anim: 'wiggle' },
      { title: 'Animal Friend!', speak: `You love animals ${name}! Be kind to all animals, big and small!`, emoji: '❤️', anim: 'shake' },
    ];
  }
  if (lower.includes('animal') && lower.includes('sound')) {
    return [
      { title: 'Animal Sounds!', speak: `${name}! What sounds do animals make? Let's learn them!`, emoji: '🐮', anim: 'pop' },
      { title: 'Cow says Moo!', speak: 'The COW says MOO! 🐮 Moo moo! Give us milk!', emoji: '🐮', anim: 'bounce' },
      { title: 'Dog says Bow Wow!', speak: 'The DOG says BOW WOW! 🐕 Woof woof! Our friendly guard!', emoji: '🐕', anim: 'jump' },
      { title: 'Cat says Meow!', speak: 'The CAT says MEOW! 🐱 Purr purr! Soft and cuddly!', emoji: '🐱', anim: 'float' },
      { title: 'Animal Sounds Star!', speak: `Super ${name}! Moo, bow wow, meow! You know animal sounds!`, emoji: '🌟', anim: 'shake' },
    ];
  }
  if (lower.includes('animal') && lower.includes('home')) {
    return [
      { title: 'Animal Homes!', speak: `${name}! Animals have homes too! Let's see where they live!`, emoji: '🪺', anim: 'pop' },
      { title: 'Bird in a Nest!', speak: 'A BIRD lives in a NEST! 🪺 Up in the tree! Cozy and warm!', emoji: '🐦', anim: 'bounce' },
      { title: 'Fish in Water!', speak: 'A FISH lives in WATER! 🐟 Splish splash! In the pond or sea!', emoji: '🐟', anim: 'float' },
      { title: 'Rabbit in a Burrow!', speak: 'A RABBIT lives in a BURROW! 🐇 Underground! Hop hop!', emoji: '🐇', anim: 'jump' },
      { title: 'Animal Homes Pro!', speak: `Amazing ${name}! Animals have cozy homes just like you!`, emoji: '🏡', anim: 'shake' },
    ];
  }

  // ────── Chapter 4: Plants & Nature ──────

  if (lower.includes('part') && lower.includes('plant')) {
    return [
      { title: 'Parts of a Plant!', speak: `${name}! Let's learn about plants! They have different parts!`, emoji: '🌱', anim: 'pop' },
      { title: 'Roots!', speak: 'ROOTS grow underground! 🌱 They drink water for the plant!', emoji: '🌱', anim: 'float' },
      { title: 'Stem & Leaves!', speak: 'The STEM holds the plant up! 🌿 LEAVES make food from sunshine!', emoji: '🌿', anim: 'bounce' },
      { title: 'Flowers & Fruits!', speak: 'FLOWERS are pretty! 🌸 FRUITS are yummy to eat! 🍎', emoji: '🌸', anim: 'wiggle' },
      { title: 'Plant Expert!', speak: `Brilliant ${name}! You know all plant parts! Plant a seed and watch it grow!`, emoji: '🌻', anim: 'spin' },
    ];
  }
  if (lower.includes('thing') && lower.includes('nature')) {
    return [
      { title: 'Things Around Nature!', speak: `${name}! Look outside! Nature is full of amazing things!`, emoji: '☀️', anim: 'pop' },
      { title: 'The Sun!', speak: 'The SUN is bright and warm! ☀️ It gives us light and heat!', emoji: '☀️', anim: 'bounce' },
      { title: 'Rain & Clouds!', speak: 'CLOUDS float in the sky! ☁️ RAIN falls down! Pitter patter!', emoji: '🌧️', anim: 'float' },
      { title: 'Rainbow!', speak: 'After rain, a RAINBOW appears! 🌈 Red, orange, yellow, green, blue, purple!', emoji: '🌈', anim: 'spin' },
      { title: 'Nature Lover!', speak: `Wow ${name}! Nature is beautiful! Go outside and explore!`, emoji: '🌍', anim: 'shake' },
    ];
  }
  if (lower.includes('season')) {
    return [
      { title: 'Seasons!', speak: `${name}! The weather changes throughout the year! These are seasons!`, emoji: '🌤️', anim: 'pop' },
      { title: 'Summer!', speak: 'SUMMER is hot! ☀️ We wear cool clothes and eat ice cream!', emoji: '🍦', anim: 'bounce' },
      { title: 'Rainy Season!', speak: 'RAINY season brings showers! 🌧️ We use umbrellas and play in puddles!', emoji: '☂️', anim: 'float' },
      { title: 'Winter!', speak: 'WINTER is cold! ❄️ We wear warm clothes and drink hot milk!', emoji: '☕', anim: 'pulse' },
      { title: 'Seasons Star!', speak: `Fantastic ${name}! You know summer, rainy, and winter! Seasons keep changing!`, emoji: '🌟', anim: 'shake' },
    ];
  }

  // ────── Chapter 5: Transport ──────

  if (lower.includes('land') && lower.includes('transport')) {
    return [
      { title: 'Land Transport!', speak: `${name}! Vehicles that move on land! Let's see them!`, emoji: '🚗', anim: 'pop' },
      { title: 'Car & Bus!', speak: 'CAR goes vroom vroom! 🚗 BUS carries many people! 🚌 Beep beep!', emoji: '🚌', anim: 'bounce' },
      { title: 'Bicycle!', speak: 'BICYCLE has two wheels! 🚲 Pedal pedal! Ring the bell!', emoji: '🚲', anim: 'jump' },
      { title: 'Train!', speak: 'TRAIN goes on tracks! 🚂 Choo choo! Long and fast!', emoji: '🚂', anim: 'float' },
      { title: 'Land Transport Champ!', speak: `Super ${name}! Car, bus, cycle, train! You know them all!`, emoji: '🏆', anim: 'shake' },
    ];
  }
  if (lower.includes('air') && lower.includes('water') && lower.includes('transport')) {
    return [
      { title: 'Air & Water Transport!', speak: `${name}! Vehicles that fly in the sky and float on water!`, emoji: '✈️', anim: 'pop' },
      { title: 'Airplane!', speak: 'AIRPLANE flies high in the sky! ✈️ Whoosh! It takes us far away!', emoji: '✈️', anim: 'bounce' },
      { title: 'Helicopter!', speak: 'HELICOPTER has spinning blades! 🚁 Whirly whirly! Up and down!', emoji: '🚁', anim: 'float' },
      { title: 'Ship & Boat!', speak: 'SHIP sails on the sea! 🚢 BOAT rows on the lake! Float float!', emoji: '🚢', anim: 'wiggle' },
      { title: 'Travel Star!', speak: `Amazing ${name}! Sky and sea travel! So many ways to go places!`, emoji: '🌍', anim: 'shake' },
    ];
  }
  if (lower.includes('traffic') && lower.includes('rule')) {
    return [
      { title: 'Traffic Rules!', speak: `${name}! Let's learn how to stay safe on the road!`, emoji: '🚦', anim: 'pop' },
      { title: 'Red Light!', speak: 'RED LIGHT means STOP! 🚦 Hold hands and wait!', emoji: '🔴', anim: 'pulse' },
      { title: 'Green Light!', speak: 'GREEN LIGHT means GO! 🟢 Walk safely with grown-ups!', emoji: '🟢', anim: 'bounce' },
      { title: 'Zebra Crossing!', speak: 'Cross the road at ZEBRA CROSSING! 🚸 Look left and right!', emoji: '🚸', anim: 'wiggle' },
      { title: 'Safety Star!', speak: `Brilliant ${name}! Red stop, green go! You stay safe on the road!`, emoji: '🛡️', anim: 'shake' },
    ];
  }

  // ────── Chapter 6: Good Habits ──────

  if (lower.includes('clean') && lower.includes('habit')) {
    return [
      { title: 'Clean Habits!', speak: `${name}! Being clean keeps us healthy and happy! Let's learn!`, emoji: '🧼', anim: 'pop' },
      { title: 'Brush Teeth!', speak: 'Brush your teeth every morning and night! 🪥 Sparkly clean!', emoji: '🪥', anim: 'bounce' },
      { title: 'Wash Hands!', speak: 'Wash hands before eating! 🧼 Soap and water! Germs go away!', emoji: '🧼', anim: 'float' },
      { title: 'Keep Clean!', speak: 'Keep your room tidy! 🧸 Put toys away! Clean is good!', emoji: '🧹', anim: 'jump' },
      { title: 'Clean Habit Star!', speak: `Wonderful ${name}! Clean habits keep you healthy! You are a shining star!`, emoji: '⭐', anim: 'shake' },
    ];
  }
  if (lower.includes('healthy') && lower.includes('food')) {
    return [
      { title: 'Healthy Food!', speak: `${name}! Yummy food that makes you strong! Let's eat healthy!`, emoji: '🍎', anim: 'pop' },
      { title: 'Fruits!', speak: 'FRUITS are sweet and healthy! 🍎 Apple! 🍌 Banana! 🍇 Grapes! So yummy!', emoji: '🍎', anim: 'bounce' },
      { title: 'Vegetables!', speak: 'VEGETABLES make you strong! 🥕 Carrot! 🥦 Broccoli! Green and good!', emoji: '🥕', anim: 'float' },
      { title: 'Milk & Eggs!', speak: 'MILK 🥛 gives strong bones! EGGS 🥚 give you energy! Drink and eat!', emoji: '🥛', anim: 'pulse' },
      { title: 'Healthy Eater!', speak: `Amazing ${name}! Fruits, veggies, milk! You eat healthy and grow big!`, emoji: '💪', anim: 'shake' },
    ];
  }
  if (lower.includes('daily') && lower.includes('routine')) {
    return [
      { title: 'My Daily Routine!', speak: `${name}! Let's learn about your day! Wake up, play, sleep!`, emoji: '⏰', anim: 'pop' },
      { title: 'Morning Time!', speak: 'Wake up in the morning! 🌅 Brush teeth, eat breakfast, go to school!', emoji: '🌅', anim: 'bounce' },
      { title: 'Day Time!', speak: 'Play with friends! 🎮 Eat lunch! Learn new things! So much fun!', emoji: '🎮', anim: 'float' },
      { title: 'Night Time!', speak: 'Dinner time! 🍝 Bath time! 🛁 Story time! 📚 Time to sleep!', emoji: '🌙', anim: 'pulse' },
      { title: 'Routine Star!', speak: `Super ${name}! You have a wonderful daily routine! Every day is an adventure!`, emoji: '🌟', anim: 'shake' },
    ];
  }

  return [
    { title: title, speak: `Let's explore ${title}! Are you ready, ${name}?`, emoji: '🌍', anim: 'pop' },
  ];
}
