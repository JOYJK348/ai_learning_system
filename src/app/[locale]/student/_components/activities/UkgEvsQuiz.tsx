'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';

type Props = {
  lessonTitle: string;
  onComplete: (data: { score: number; max_score: number; completion_data: Record<string, unknown>; time_taken_seconds: number }) => void;
};

type QuestionData = {
  question: string;
  options: string[];
  target: string;
  emoji: string;
};

export default function UkgEvsQuiz({ lessonTitle, onComplete }: Props) {
  const t0 = useRef(Date.now());
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [done, setDone] = useState(false);

  // Define curriculum questions matching active lesson
  const questions = useMemo((): QuestionData[] => {
    const title = lessonTitle.toLowerCase();

    // Chapter 1: Myself - Advanced
    if (title.includes('personal details')) {
      return [
        { question: 'What is your current grade?', options: ['LKG', 'UKG', 'Grade 1'], target: 'UKG', emoji: '🎒' },
        { question: 'Where do kids go to learn and read books?', options: ['School 🏫', 'Market 🛒', 'Park 🛝'], target: 'School 🏫', emoji: '🏫' },
        { question: 'Who teaches you new things in the classroom?', options: ['Teacher 👩‍🏫', 'Driver 👨‍✈️', 'Chef 👨‍🍳'], target: 'Teacher 👩‍🏫', emoji: '👩‍🏫' },
        { question: 'Where does your family live?', options: ['Home 🏠', 'Zoo 🦁', 'Shop 🏬'], target: 'Home 🏠', emoji: '🏠' },
        { question: 'What tool do you use to write your name on paper?', options: ['Pencil ✏️', 'Spoon 🥄', 'Toy 🧸'], target: 'Pencil ✏️', emoji: '✏️' }
      ];
    }
    if (title.includes('body parts & functions') || title.includes('body parts')) {
      return [
        { question: 'Which body part helps us see the beautiful rainbow?', options: ['Eyes 👀', 'Ears 👂', 'Nose 👃'], target: 'Eyes 👀', emoji: '🌈' },
        { question: 'Which body part helps us hear the school bell ring?', options: ['Ears 👂', 'Eyes 👀', 'Tongue 👅'], target: 'Ears 👂', emoji: '🔔' },
        { question: 'Which body part helps us smell a fresh flower?', options: ['Nose 👃', 'Skin 🖐️', 'Eyes 👀'], target: 'Nose 👃', emoji: '🌹' },
        { question: 'Which body part helps us taste sweet honey?', options: ['Tongue 👅', 'Teeth 🦷', 'Lips 👄'], target: 'Tongue 👅', emoji: '🍯' },
        { question: 'Which body part helps us hold and write with a pencil?', options: ['Hand & Fingers 🖐️', 'Feet & Toes 👣', 'Shoulders 👤'], target: 'Hand & Fingers 🖐️', emoji: '✍️' }
      ];
    }
    if (title.includes('healthy routine')) {
      return [
        { question: 'What should we do before having our meals?', options: ['Wash hands with soap 🧼', 'Play with toys 🧸', 'Go to sleep 😴'], target: 'Wash hands with soap 🧼', emoji: '🧼' },
        { question: 'How many times should we brush our teeth every day?', options: ['2 times (morning & night) 🪥', '5 times 🪥', 'Zero times 🪥'], target: '2 times (morning & night) 🪥', emoji: '🪥' },
        { question: 'How do we keep our finger nails clean?', options: ['Clip them with a nail cutter 💅', 'Bite them 👄', 'Paint them 🎨'], target: 'Clip them with a nail cutter 💅', emoji: '💅' },
        { question: 'What should we use to keep our hair neat and tidy?', options: ['Comb or Hairbrush 🪮', 'Toothbrush 🪥', 'Soap 🧼'], target: 'Comb or Hairbrush 🪮', emoji: '🪮' },
        { question: 'What should we do daily to wash away dirt and stay clean?', options: ['Take a bath 🛁', 'Wash only hands 🧼', 'Change clothes only 👕'], target: 'Take a bath 🛁', emoji: '🛁' }
      ];
    }

    // Chapter 2: Sense Organs
    if (title.includes('sense') || title.includes('senses')) {
      return [
        { question: 'Match the sense: 👃 Smell matches with...', options: ['Fragrant Flower 🌸', 'Hard Stone 🪨', 'Loud Bell 🔔'], target: 'Fragrant Flower 🌸', emoji: '👃' },
        { question: 'Match the sense: 👅 Taste matches with...', options: ['Sweet Ice Cream 🍦', 'Colorful Book 📖', 'Bouncing Ball ⚽'], target: 'Sweet Ice Cream 🍦', emoji: '👅' },
        { question: 'Match the sense: 🖐️ Touch matches with...', options: ['Soft Teddy Bear 🧸', 'Sunlight ☀️', 'Music 🎵'], target: 'Soft Teddy Bear 🧸', emoji: '🖐️' },
        { question: 'Match the sense: 👀 Sight matches with...', options: ['Colorful Rainbow 🌈', 'Soft Breeze 💨', 'Loud Noise 🔊'], target: 'Colorful Rainbow 🌈', emoji: '👀' },
        { question: 'Match the sense: 👂 Hearing matches with...', options: ['Ringing Bell 🔔', 'Sweet Candy 🍬', 'Yellow Sun ☀️'], target: 'Ringing Bell 🔔', emoji: '👂' }
      ];
    }

    // Chapter 3: Food & Nutrition
    if (title.includes('food groups')) {
      return [
        { question: 'Which of these is a healthy fruit?', options: ['Apple 🍎', 'Potato 🥔', 'Rice 🌾'], target: 'Apple 🍎', emoji: '🍎' },
        { question: 'Which of these is a fresh vegetable?', options: ['Carrot 🥕', 'Candy 🍬', 'Cupcake 🧁'], target: 'Carrot 🥕', emoji: '🥕' },
        { question: 'Which of these is a healthy grain?', options: ['Wheat 🌾', 'Tomato 🍅', 'Milk 🥛'], target: 'Wheat 🌾', emoji: '🌾' },
        { question: 'Which of these is NOT healthy (Junk food)?', options: ['Donut 🍩', 'Banana 🍌', 'Milk 🥛'], target: 'Donut 🍩', emoji: '🍩' },
        { question: 'What is the healthiest drink for our body?', options: ['Water 💧', 'Soda 🥤', 'Sweet Syrup 🍹'], target: 'Water 💧', emoji: '💧' }
      ];
    }
    if (title.includes('eating & sources') || title.includes('sources')) {
      return [
        { question: 'Where does fresh milk come from?', options: ['Cow 🐄', 'Apple Tree 🌳', 'Chicken 🐔'], target: 'Cow 🐄', emoji: '🥛' },
        { question: 'Where do we get sweet red apples from?', options: ['Trees 🌳', 'Cows 🐄', 'Hens 🐔'], target: 'Trees 🌳', emoji: '🍎' },
        { question: 'Where do eggs come from?', options: ['Hen 🐔', 'Goat 🐐', 'Plant 🌿'], target: 'Hen 🐔', emoji: '🥚' },
        { question: 'Where does honey come from?', options: ['Honeybee 🐝', 'Fish 🐟', 'Flower 🌸'], target: 'Honeybee 🐝', emoji: '🍯' },
        { question: 'Where do carrots grow?', options: ['Under the ground 🥕', 'On a tree branches 🌳', 'In the air ☁️'], target: 'Under the ground 🥕', emoji: '🥕' }
      ];
    }

    // Chapter 4: Plants
    if (title.includes('parts of a plant') || title.includes('parts of plant')) {
      return [
        { question: 'Which part of the plant holds it in the soil?', options: ['Root 🪵', 'Flower 🌸', 'Leaf 🍃'], target: 'Root 🪵', emoji: '🌱' },
        { question: 'Which part of the plant is green and makes food?', options: ['Leaf 🍃', 'Fruit 🍎', 'Root 🪵'], target: 'Leaf 🍃', emoji: '🍃' },
        { question: 'Which colorful plant part grows into a fruit?', options: ['Flower 🌸', 'Root 🪵', 'Stem 🌿'], target: 'Flower 🌸', emoji: '🌸' },
        { question: 'Which part holds the plant upright and carries water?', options: ['Stem 🌿', 'Flower 🌸', 'Leaf 🍃'], target: 'Stem 🌿', emoji: '🌿' },
        { question: 'Which plant part has seeds inside?', options: ['Fruit 🍎', 'Leaf 🍃', 'Root 🪵'], target: 'Fruit 🍎', emoji: '🍎' }
      ];
    }
    if (title.includes('need to grow') || title.includes('plants need')) {
      return [
        { question: 'What does a little seed need to grow into a plant?', options: ['Sunlight & Water ☀️💧', 'Juice & Chips 🥤🍟', 'Toys 🧸'], target: 'Sunlight & Water ☀️💧', emoji: '🌱' },
        { question: 'Which of these is NOT needed by plants to grow?', options: ['Chocolate 🍫', 'Water 💧', 'Air 💨'], target: 'Chocolate 🍫', emoji: '🍫' },
        { question: 'Where do plants find water and nutrients?', options: ['Soil 🪴', 'Sky ☁️', 'Rocks 🪨'], target: 'Soil 🪴', emoji: '🪴' },
        { question: 'Plants get warm energy from the...', options: ['Sun ☀️', 'Moon 🌙', 'Lightbulb 💡'], target: 'Sun ☀️', emoji: '☀️' },
        { question: 'What do leaves breathe from the air around them?', options: ['Air 💨', 'Water 💧', 'Soil 🪨'], target: 'Air 💨', emoji: '💨' }
      ];
    }

    // Chapter 5: Animals
    if (title.includes('domestic & wild') || title.includes('domestic')) {
      return [
        { question: 'Which animal is domestic and lives on a farm?', options: ['Cow 🐄', 'Lion 🦁', 'Tiger 🐯'], target: 'Cow 🐄', emoji: '🐄' },
        { question: 'Which animal is a wild animal living in the forest?', options: ['Tiger 🐯', 'Dog 🐕', 'Cat 🐈'], target: 'Tiger 🐯', emoji: '🌳' },
        { question: 'Which domestic animal gives us wool to make sweaters?', options: ['Sheep 🐑', 'Cow 🐄', 'Horse 🐎'], target: 'Sheep 🐑', emoji: '🐑' },
        { question: 'Which wild animal is the tallest with a very long neck?', options: ['Giraffe 🦒', 'Elephant 🐘', 'Monkey 🐒'], target: 'Giraffe 🦒', emoji: '🦒' },
        { question: 'Which small animal lives in our home as a cute pet?', options: ['Cat 🐱', 'Bear 🐻', 'Lion 🦁'], target: 'Cat 🐱', emoji: '🐱' }
      ];
    }
    if (title.includes('herbivores')) {
      return [
        { question: 'Which animal eats grass and leaves (Herbivore)?', options: ['Cow 🐄', 'Lion 🦁', 'Leopard 🐆'], target: 'Cow 🐄', emoji: '🌿' },
        { question: 'Which animal hunts other animals for meat (Carnivore)?', options: ['Lion 🦁', 'Rabbit 🐇', 'Deer 🦌'], target: 'Lion 🦁', emoji: '🥩' },
        { question: 'Which animal loves to eat crunchy carrots (Herbivore)?', options: ['Rabbit 🐇', 'Wolf 🐺', 'Crocodile 🐊'], target: 'Rabbit 🐇', emoji: '🥕' },
        { question: 'Which carnivore hunts in packs in the wild?', options: ['Wolf 🐺', 'Goat 🐐', 'Sheep 🐑'], target: 'Wolf 🐺', emoji: '🐺' },
        { question: 'Which domestic plant-eater gives us milk (Herbivore)?', options: ['Goat 🐐', 'Dog 🐕', 'Cat 🐈'], target: 'Goat 🐐', emoji: '🐐' }
      ];
    }
    if (title.includes('babies')) {
      return [
        { question: 'What is a baby cow called?', options: ['Calf 🐮', 'Puppy 🐶', 'Kitten 🐱'], target: 'Calf 🐮', emoji: '🐮' },
        { question: 'What is a baby dog called?', options: ['Puppy 🐶', 'Calf 🐮', 'Kitten 🐱'], target: 'Puppy 🐶', emoji: '🐶' },
        { question: 'What is a baby cat called?', options: ['Kitten 🐱', 'Puppy 🐶', 'Calf 🐮'], target: 'Kitten 🐱', emoji: '🐱' },
        { question: 'What is a baby hen called?', options: ['Chick 🐥', 'Lamb 🐑', 'Puppy 🐶'], target: 'Chick 🐥', emoji: '🐥' },
        { question: 'What is a baby sheep called?', options: ['Lamb 🐑', 'Chick 🐥', 'Kitten 🐱'], target: 'Lamb 🐑', emoji: '🐑' }
      ];
    }

    // Chapter 6: Birds & Insects
    if (title.includes('wings') || title.includes('feathers')) {
      return [
        { question: 'Which parts help a bird fly high in the sky?', options: ['Wings & Feathers 🪶', 'Paws & Tail 🐾', 'Beak & Teeth 🦷'], target: 'Wings & Feathers 🪶', emoji: '🦅' },
        { question: 'What do birds use to pick seeds and eat?', options: ['Beak 👄', 'Paws 🐾', 'Teeth 🦷'], target: 'Beak 👄', emoji: '🐦' },
        { question: 'What covers a bird\'s body to keep it warm?', options: ['Feathers 🪶', 'Scales 🐟', 'Fur 🐕'], target: 'Feathers 🪶', emoji: '🪶' },
        { question: 'Which bird cannot fly high in the sky?', options: ['Hen 🐔', 'Eagle 🦅', 'Sparrow 🐦'], target: 'Hen 🐔', emoji: '🐔' },
        { question: 'Where do birds build their cozy homes to lay eggs?', options: ['Nest 🪹', 'Cave 🪨', 'Hive 🐝'], target: 'Nest 🪹', emoji: '🪹' }
      ];
    }
    if (title.includes('insects')) {
      return [
        { question: 'How many legs do insects typically have?', options: ['6 legs 🐜', '2 legs 🚶', '8 legs 🕷️'], target: '6 legs 🐜', emoji: '🐞' },
        { question: 'Which insect makes sweet honey for us?', options: ['Honeybee 🐝', 'Ant 🐜', 'Mosquito 🦟'], target: 'Honeybee 🐝', emoji: '🐝' },
        { question: 'Which is a colorful flying insect?', options: ['Butterfly 🦋', 'Spider 🕷️', 'Worm 🪱'], target: 'Butterfly 🦋', emoji: '🦋' },
        { question: 'Which insect lives in large colonies underground?', options: ['Ant 🐜', 'Housefly 🪰', 'Bee 🐝'], target: 'Ant 🐜', emoji: '🐜' },
        { question: 'Which insect glow-in-the-dark at night?', options: ['Firefly 🪰', 'Butterfly 🦋', 'Ladybug 🐞'], target: 'Firefly 🪰', emoji: '🪱' }
      ];
    }

    // Chapter 7: Environment
    if (title.includes('living')) {
      return [
        { question: 'Which of these is a living thing that grows?', options: ['Dog 🐕', 'Toy Car 🚗', 'Stone 🪨'], target: 'Dog 🐕', emoji: '🐕' },
        { question: 'Which of these is a non-living thing that does not breathe?', options: ['Toy Car 🚗', 'Plant 🌿', 'Cat 🐱'], target: 'Toy Car 🚗', emoji: '🚗' },
        { question: 'Do living things need food and water to survive?', options: ['Yes, always! 👍', 'No, never 👎'], target: 'Yes, always! 👍', emoji: '🍽️' },
        { question: 'Do non-living things grow and have babies?', options: ['No, they do not ❌', 'Yes, they do ✔️'], target: 'No, they do not ❌', emoji: '🧸' },
        { question: 'Which living thing cannot walk but grows and makes seeds?', options: ['Tree 🌳', 'Dog 🐕', 'Rabbit 🐇'], target: 'Tree 🌳', emoji: '🌳' }
      ];
    }

    // Chapter 8: Weather & Seasons
    if (title.includes('weather')) {
      return [
        { question: 'What do we use to protect our eyes when it is sunny?', options: ['Sunglasses 🕶️', 'Umbrella 🌂', 'Gloves 🧤'], target: 'Sunglasses 🕶️', emoji: '☀️' },
        { question: 'What do we see in the sky during rainy weather?', options: ['Dark Rain Clouds 🌧️', 'Bright Stars 🌟', 'Full Moon 🌙'], target: 'Dark Rain Clouds 🌧️', emoji: '🌧️' },
        { question: 'Which weather condition makes kites fly high?', options: ['Windy 💨', 'Sunny ☀️', 'Foggy 🌫️'], target: 'Windy 💨', emoji: '💨' },
        { question: 'What falls from the sky in very cold snowy weather?', options: ['Snowflakes ❄️', 'Hot Rain 💧', 'Leaves 🍂'], target: 'Snowflakes ❄️', emoji: '❄️' },
        { question: 'Which beautiful colors appear in sky after a rain shower?', options: ['Rainbow 🌈', 'Fog 🌫️', 'Lightning ⚡'], target: 'Rainbow 🌈', emoji: '🌈' }
      ];
    }
    if (title.includes('seasons') || title.includes('changes')) {
      return [
        { question: 'When it is winter and very cold, what do we wear to stay warm?', options: ['Sweater & Jacket 🧥', 'Raincoat 🧥', 'Swimwear 🩱'], target: 'Sweater & Jacket 🧥', emoji: '❄️' },
        { question: 'When it rains heavily, what do we hold to stay dry?', options: ['Umbrella 🌂', 'Cap 🧢', 'Sunglasses 🕶️'], target: 'Umbrella 🌂', emoji: '🌧️' },
        { question: 'What cold treat do we love to eat in hot summer?', options: ['Ice cream 🍦', 'Hot Soup 🍲', 'Tea ☕'], target: 'Ice cream 🍦', emoji: '☀️' },
        { question: 'In which season do leaves fall off the trees?', options: ['Autumn 🍂', 'Spring 🌸', 'Summer ☀️'], target: 'Autumn 🍂', emoji: '🍂' },
        { question: 'In which season do fresh flowers bloom everywhere?', options: ['Spring 🌸', 'Winter ❄️', 'Autumn 🍂'], target: 'Spring 🌸', emoji: '🌸' }
      ];
    }

    // Chapter 9: Community & Places
    if (title.includes('community places') || title.includes('places')) {
      return [
        { question: 'Where do we go when we are sick to see a doctor?', options: ['Hospital 🏥', 'Post Office ✉️', 'Park 🛝'], target: 'Hospital 🏥', emoji: '🏥' },
        { question: 'Where do we go to keep our savings safe?', options: ['Bank 🏦', 'Market 🛒', 'School 🏫'], target: 'Bank 🏦', emoji: '🏦' },
        { question: 'Where do we drop envelopes and letters?', options: ['Post Office ✉️', 'Bank 🏦', 'Hospital 🏥'], target: 'Post Office ✉️', emoji: '✉️' },
        { question: 'Where do firefighters stay with their trucks?', options: ['Fire Station 🚒', 'Police Station 👮', 'School 🏫'], target: 'Fire Station 🚒', emoji: '🚒' },
        { question: 'Where do we buy books and notebooks?', options: ['Bookstore 📚', 'Hospital 🏥', 'Police Station 👮'], target: 'Bookstore 📚', emoji: '📚' }
      ];
    }
    if (title.includes('helpers')) {
      return [
        { question: 'Who helps put out fires and keeps buildings safe?', options: ['Firefighter 👨‍🚒', 'Chef 👨‍🍳', 'Teacher 👩‍🏫'], target: 'Firefighter 👨‍🚒', emoji: '👨‍🚒' },
        { question: 'Who keeps our streets safe and helps traffic flow?', options: ['Police Officer 👮', 'Doctor 👨‍⚕️', 'Farmer 👨‍🌾'], target: 'Police Officer 👮', emoji: '👮' },
        { question: 'Who cures us when we have a fever or cold?', options: ['Doctor 👨‍⚕️', 'Firefighter 👨‍🚒', 'Teacher 👩‍🏫'], target: 'Doctor 👨‍⚕️', emoji: '👨‍⚕️' },
        { question: 'Who grows wheat and vegetables on a farm?', options: ['Farmer 👨‍🌾', 'Postman 📬', 'Doctor 👨‍⚕️'], target: 'Farmer 👨‍🌾', emoji: '👨‍🌾' },
        { question: 'Who delivers mail and packages to our house?', options: ['Postman 📬', 'Teacher 👩‍🏫', 'Chef 👨‍🍳'], target: 'Postman 📬', emoji: '📬' }
      ];
    }

    // Chapter 10: Safety Rules
    if (title.includes('traffic') || title.includes('road')) {
      return [
        { question: 'What color light on the traffic signal tells us to STOP?', options: ['Red Light 🔴', 'Green Light 🟢', 'Yellow Light 🟡'], target: 'Red Light 🔴', emoji: '🚦' },
        { question: 'What color light tells us to GO?', options: ['Green Light 🟢', 'Red Light 🔴', 'Yellow Light 🟡'], target: 'Green Light 🟢', emoji: '🟢' },
        { question: 'What color light tells us to wait or slow down?', options: ['Yellow Light 🟡', 'Red Light 🔴', 'Green Light 🟢'], target: 'Yellow Light 🟡', emoji: '🟡' },
        { question: 'Where should we safely walk when crossing the road?', options: ['Zebra Crossing 🦓', 'Middle of the Road 🛣️', 'Grass 🌿'], target: 'Zebra Crossing 🦓', emoji: '🦓' },
        { question: 'Where should we walk on the side of the road?', options: ['Footpath / Sidewalk 🚶', 'Middle of street 🛣️', 'On cars 🚗'], target: 'Footpath / Sidewalk 🚶', emoji: '🚶' }
      ];
    }
    if (title.includes('safety rules') || title.includes('emergencies')) {
      return [
        { question: 'Should we play with fire or matchsticks?', options: ['No, dangerous! ⚠️', 'Yes, it is fun! 😄'], target: 'No, dangerous! ⚠️', emoji: '🔥' },
        { question: 'Is it safe to play with electrical sockets?', options: ['No, dangerous! ⚡', 'Yes, fun! 😄'], target: 'No, dangerous! ⚡', emoji: '⚡' },
        { question: 'Should we play tag or soccer on the busy road?', options: ['No, never! 🛣️', 'Yes, it is safe! 😄'], target: 'No, never! 🛣️', emoji: '🛣️' },
        { question: 'Who should we call if a fire breaks out?', options: ['Fire Station 🚒', 'Bank 🏦', 'School 🏫'], target: 'Fire Station 🚒', emoji: '🚒' },
        { question: 'Is it safe to talk to strangers or accept candy?', options: ['No, never! 🙅', 'Yes, it is fine! 😄'], target: 'No, never! 🙅', emoji: '🙅' }
      ];
    }

    // Chapter 11: Daily Life Activities
    if (title.includes('routine') || title.includes('morning')) {
      return [
        { question: 'What is the correct sequence of morning routines?', options: ['Wake up ➔ Brush ➔ Eat ➔ School', 'School ➔ Eat ➔ Wake up ➔ Brush'], target: 'Wake up ➔ Brush ➔ Eat ➔ School', emoji: '🌅' },
        { question: 'When do we see the sun rise and hear birds sing?', options: ['Morning 🌅', 'Night 🌃', 'Evening 🌇'], target: 'Morning 🌅', emoji: '🌅' },
        { question: 'When do we eat our healthy breakfast?', options: ['In the morning 🌅', 'At night 🌃', 'In the afternoon ☀️'], target: 'In the morning 🌅', emoji: '🥞' },
        { question: 'What clothes do we wear to go to school?', options: ['School Uniform 👔', 'Pajamas 🛌', 'Swimwear 🩱'], target: 'School Uniform 👔', emoji: '👔' },
        { question: 'When do we usually do our homework and play in park?', options: ['Evening 🌅', 'Morning 🌅', 'Midnight 🌃'], target: 'Evening 🌅', emoji: '📝' }
      ];
    }

    // Chapter 12: Our Earth
    if (title.includes('land') || title.includes('water')) {
      return [
        { question: 'Where do fish and dolphins live?', options: ['Water 🌊', 'Land 🛣️', 'Air ☁️'], target: 'Water 🌊', emoji: '🐟' },
        { question: 'Where do airplanes and birds fly?', options: ['Air ☁️', 'Water 🌊', 'Land 🛣️'], target: 'Air ☁️', emoji: '✈️' },
        { question: 'Where do cars and bicycles drive?', options: ['Land 🛣️', 'Air ☁️', 'Water 🌊'], target: 'Land 🛣️', emoji: '🚗' },
        { question: 'What covers most of our planet Earth?', options: ['Water 🌊', 'Land 🪨', 'Sand 🏜️'], target: 'Water 🌊', emoji: '🌎' },
        { question: 'What do humans and animals breathe to live?', options: ['Air 💨', 'Water 💧', 'Soil 🪨'], target: 'Air 💨', emoji: '💨' }
      ];
    }
    if (title.includes('protecting') || title.includes('nature')) {
      return [
        { question: 'What should we do with dry garbage or wrappers?', options: ['Throw in the trash bin 🗑️', 'Throw on the road 🛣️'], target: 'Throw in the trash bin 🗑️', emoji: '🗑️' },
        { question: 'Should we leave the tap running while brushing our teeth?', options: ['No, turn it off to save water 🚰', 'Yes, leave it running 🚰'], target: 'No, turn it off to save water 🚰', emoji: '🚰' },
        { question: 'What action helps clean the air on our Earth?', options: ['Planting green trees 🌳', 'Cutting down forests 🪓'], target: 'Planting green trees 🌳', emoji: '🌳' },
        { question: 'Should we turn off lights when leaving an empty room?', options: ['Yes, to save energy 💡', 'No, keep them on 💡'], target: 'Yes, to save energy 💡', emoji: '💡' },
        { question: 'Is it good to pluck green leaves or flowers just for fun?', options: ['No, it hurts the plants 🍃', 'Yes, it is fine! 👍'], target: 'No, it hurts the plants 🍃', emoji: '🍃' }
      ];
    }

    // Fallback EVS questions
    return [
      { question: 'Which animal baby is called a puppy?', options: ['Dog 🐶', 'Cat 🐱', 'Cow 🐄'], target: 'Dog 🐶', emoji: '🐶' }
    ];
  }, [lessonTitle]);

  const current = questions[qIdx];

  const shuffledOptions = useMemo(() => {
    return [...current.options].sort(() => Math.random() - 0.5);
  }, [current]);

  const handlePick = (opt: string) => {
    if (picked || done) return;
    setPicked(opt);
    if (opt === current.target) {
      setScore(s => s + 1);
      setCorrect(true);
      setTimeout(() => {
        setCorrect(false);
        setPicked(null);
        if (qIdx < questions.length - 1) {
          setQIdx(i => i + 1);
        } else {
          setDone(true);
        }
      }, 1200);
    } else {
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
        setPicked(null);
      }, 850);
    }
  };

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="flex flex-col items-center gap-6 px-6 py-10 kids-font text-center">
        <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&display=swap');.kids-font{font-family:'Baloo 2',sans-serif!important;}` }} />
        <span className="text-8xl select-none">🏆</span>
        <h2 className="text-3xl font-black text-indigo-950 uppercase tracking-tighter">Excellent job!</h2>
        <p className="text-lg font-bold text-indigo-900/50 -mt-2">You got {score}/{questions.length} correct! 🌟</p>
        <button onClick={() => onComplete({ score: pct, max_score: 100, completion_data: { score, total: questions.length }, time_taken_seconds: Math.round((Date.now() - t0.current) / 1000) })}
          className="w-full max-w-xs py-4 bg-emerald-500 text-white rounded-2xl font-black text-lg shadow-xl border-b-4 border-emerald-700 active:scale-95 cursor-pointer">
          Continue ➡️
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 px-3 py-2 w-full max-w-md mx-auto kids-font select-none">
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@550;750;850&display=swap');.kids-font{font-family:'Baloo 2',sans-serif!important;}` }} />

      {/* Top bar: Progress indicator info */}
      <div className="w-full flex items-center justify-between px-2">
        <span className="text-sm font-black text-indigo-900/40 uppercase tracking-widest">
          Question {qIdx + 1} of {questions.length}
        </span>
        <span className="text-xs font-black text-emerald-600 uppercase tracking-widest px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100/50">
          🌱 UKG EVS Level Up
        </span>
      </div>

      <div className="text-center mt-1">
        <h3 className="text-lg sm:text-xl font-black text-indigo-950 leading-snug">
          {current.question}
        </h3>
      </div>

      {/* Progress indicators */}
      <div className="flex items-center gap-1.5 justify-center">
        {questions.map((_, idx) => (
          <div key={idx} className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300
            ${idx < qIdx ? 'bg-emerald-500 border-emerald-600' : idx === qIdx ? 'bg-indigo-600 border-indigo-700 ring-2 ring-indigo-300' : 'bg-white border-slate-200'}`} />
        ))}
      </div>

      {/* Large visual mascot board */}
      <div className="w-full bg-[#f6fdf9] border-4 border-[#a8e9c8] rounded-[2rem] p-6 shadow-md flex items-center justify-center min-h-[9rem]">
        <span className="text-7xl">{current.emoji}</span>
      </div>

      {/* Options list */}
      <div className="flex flex-col gap-2.5 w-full">
        {shuffledOptions.map(opt => {
          const isSelected = picked === opt;
          const isTarget = opt === current.target;
          let cls = 'bg-white text-indigo-950 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30';
          if (isSelected && isTarget) cls = 'bg-emerald-100 text-emerald-700 border-emerald-400';
          else if (isSelected && !isTarget) cls = 'bg-red-100 text-red-700 border-red-300';
          return (
            <button key={opt} onClick={() => handlePick(opt)} disabled={!!picked}
              className={`w-full py-4 px-6 rounded-2xl border-3 text-base font-black text-left shadow-sm cursor-pointer active:scale-98 transition-all ${cls}`}>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback status */}
      <div className="min-h-[22px] flex items-center justify-center">
        {correct ? <p className="text-sm font-black text-emerald-600 flex items-center gap-1"><Sparkles size={14} /> Correct! Well Done! 🎉</p>
          : wrong ? <p className="text-sm font-black text-red-500">🙅 Try again!</p>
          : <p className="text-[10px] font-bold text-indigo-950/30 uppercase tracking-widest">Select the correct answer above</p>}
      </div>
    </div>
  );
}
