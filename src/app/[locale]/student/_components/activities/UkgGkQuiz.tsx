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

export default function UkgGkQuiz({ lessonTitle, onComplete }: Props) {
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

    // Chapter 1: Myself & My World
    if (title.includes('details') || title.includes('name')) {
      return [
        { question: 'Who blows candles on a birthday cake?', options: ['You 🎂', 'Cat 🐱', 'Toy 🧸'], target: 'You 🎂', emoji: '🎂' },
        { question: 'Where do kids wear uniforms and carry school bags?', options: ['School 🏫', 'Park 🛝', 'Mall 🛒'], target: 'School 🏫', emoji: '🏫' },
        { question: 'What goes on top of a birthday cake?', options: ['Candles 🕯️', 'Spoons 🥄', 'Cencils ✏️'], target: 'Candles 🕯️', emoji: '🕯' },
        { question: 'Where do you play slide and swing with friends?', options: ['Playground / Park 🛝', 'Classroom 🏫', 'Kitchen 🍳'], target: 'Playground / Park 🛝', emoji: '🛝' },
        { question: 'What is your main fun activity as a UKG student?', options: ['To learn & play 🎒', 'To cook 🍳', 'To drive 🚗'], target: 'To learn & play 🎒', emoji: '🎒' }
      ];
    }
    if (title.includes('likes') || title.includes('hobbies')) {
      return [
        { question: 'Which is a soft cuddly toy to hug?', options: ['Teddy Bear 🧸', 'Toy Car 🚗', 'Blocks 🧱'], target: 'Teddy Bear 🧸', emoji: '🧸' },
        { question: 'What hobby involves paper, crayons, and colors?', options: ['Drawing & Painting 🎨', 'Running 🏃', 'Sleeping 🛌'], target: 'Drawing & Painting 🎨', emoji: '🎨' },
        { question: 'Which sport is played with a black and white ball?', options: ['Soccer ⚽', 'Chess ♟️', 'Swimming 🏊'], target: 'Soccer ⚽', emoji: '⚽' },
        { question: 'What do we build with colorful plastic blocks?', options: ['A tall tower 🧱', 'A real road 🛣️', 'Food 🍎'], target: 'A tall tower 🧱', emoji: '🧱' },
        { question: 'What hobby uses interesting picture books?', options: ['Reading books 📚', 'Eating snacks 🍿', 'Watching phone 📱'], target: 'Reading books 📚', emoji: '📖' }
      ];
    }
    if (title.includes('good habits') || title.includes('habits')) {
      return [
        { question: 'What do we say when someone gives us a sweet gift?', options: ['Say Thank You 🙏', 'Say No 🙅', 'Nothing 😶'], target: 'Say Thank You 🙏', emoji: '🎁' },
        { question: 'What is a good sharing habit?', options: ['Sharing toys with friends 🧸', 'Keeping all toys secret 🤫', 'Snatching toys ❌'], target: 'Sharing toys with friends 🧸', emoji: '🧸' },
        { question: 'How can you help your parents clean the room?', options: ['Putting toys back in bin 🧹', 'Leaving toys on floor 🛝', 'Throwing cushions ❌'], target: 'Putting toys back in bin 🧹', emoji: '🧹' },
        { question: 'What do we say when we accidentally bump into someone?', options: ['Say "Excuse me" 🗣️', 'Say "Go away" ❌', 'Laugh out loud 😂'], target: 'Say "Excuse me" 🗣️', emoji: '🗣️' },
        { question: 'Where should we throw chocolate wrappers?', options: ['Dustbin / Trash bin 🗑️', 'On the floor 🛝', 'Out of the window 🪟'], target: 'Dustbin / Trash bin 🗑️', emoji: '🗑️' }
      ];
    }

    // Chapter 2: Animal Kingdom
    if (title.includes('groups')) {
      return [
        { question: 'Which pet animal barks and wags its tail?', options: ['Dog 🐶', 'Tiger 🐯', 'Cow 🐄'], target: 'Dog 🐶', emoji: '🐶' },
        { question: 'Which wild animal has orange fur and black stripes?', options: ['Tiger 🐯', 'Sheep 🐑', 'Elephant 🐘'], target: 'Tiger 🐯', emoji: '🐯' },
        { question: 'Which farm animal eats grass and gives fresh milk?', options: ['Cow 🐄', 'Lion 🦁', 'Monkey 🐒'], target: 'Cow 🐄', emoji: '🐄' },
        { question: 'Which wild animal has a very long nose called a trunk?', options: ['Elephant 🐘', 'Tiger 🐯', 'Dog 🐕'], target: 'Elephant 🐘', emoji: '🐘' },
        { question: 'Which pet animal purrs and loves to drink milk?', options: ['Cat 🐱', 'Bear 🐻', 'Lion 🦁'], target: 'Cat 🐱', emoji: '🐱' }
      ];
    }
    if (title.includes('homes')) {
      return [
        { question: 'Where does a little bird build its home to lay eggs?', options: ['Nest 🪹', 'Den 🪨', 'Kennel 🏠'], target: 'Nest 🪹', emoji: '🪹' },
        { question: 'Where does a wild lion sleep in the forest?', options: ['Den 🪨', 'Nest 🪹', 'Stable 🐴'], target: 'Den 🪨', emoji: '🪨' },
        { question: 'Where does a pet dog sleep?', options: ['Kennel 🏠', 'Nest 🪹', 'Stable 🐴'], target: 'Kennel 🏠', emoji: '🐶' },
        { question: 'Where does a farm horse live?', options: ['Stable 🐴', 'Nest 🪹', 'Den 🪨'], target: 'Stable 🐴', emoji: '🐴' },
        { question: 'Where does a honeybee build its colony?', options: ['Beehive 🐝', 'Kennel 🏠', 'Stable 🐴'], target: 'Beehive 🐝', emoji: '🐝' }
      ];
    }
    if (title.includes('babies')) {
      return [
        { question: 'A puppy is the baby of a...', options: ['Dog 🐶', 'Cat 🐱', 'Cow 🐄'], target: 'Dog 🐶', emoji: '🐶' },
        { question: 'A kitten is the baby of a...', options: ['Cat 🐱', 'Dog 🐶', 'Cow 🐄'], target: 'Cat 🐱', emoji: '🐱' },
        { question: 'A calf is the baby of a...', options: ['Cow 🐄', 'Dog 🐶', 'Cat 🐱'], target: 'Cow 🐄', emoji: '🐮' },
        { question: 'A chick is the baby of a...', options: ['Hen 🐔', 'Sheep 🐑', 'Dog 🐶'], target: 'Hen 🐔', emoji: '🐥' },
        { question: 'A lamb is the baby of a...', options: ['Sheep 🐑', 'Hen 🐔', 'Cat 🐱'], target: 'Sheep 🐑', emoji: '🐑' }
      ];
    }
    if (title.includes('sounds')) {
      return [
        { question: 'Which animal roars loudly in the forest?', options: ['Lion 🦁', 'Dog 🐶', 'Duck 🦆'], target: 'Lion 🦁', emoji: '🦁' },
        { question: 'Which animal says "woof-woof" and barks?', options: ['Dog 🐶', 'Cat 🐱', 'Cow 🐄'], target: 'Dog 🐶', emoji: '🐶' },
        { question: 'Which animal meows and purrs?', options: ['Cat 🐱', 'Dog 🐶', 'Cow 🐄'], target: 'Cat 🐱', emoji: '🐱' },
        { question: 'Which animal moos on the farm?', options: ['Cow 🐄', 'Lion 🦁', 'Duck 🦆'], target: 'Cow 🐄', emoji: '🐄' },
        { question: 'Which animal quacks in the pond?', options: ['Duck 🦆', 'Lion 🦁', 'Dog 🐶'], target: 'Duck 🦆', emoji: '🦆' }
      ];
    }

    // Chapter 3: Birds & Insects
    if (title.includes('birds around us') || title.includes('birds')) {
      return [
        { question: 'Which bird has a beautiful green-blue tail and dances in rain?', options: ['Peacock 🦚', 'Parrot 🦜', 'Crow 🐦'], target: 'Peacock 🦚', emoji: '🦚' },
        { question: 'Which bird is green with a bright red beak?', options: ['Parrot 🦜', 'Peacock 🦚', 'Crow 🐦'], target: 'Parrot 🦜', emoji: '🦜' },
        { question: 'Which bird is black and says caw-caw?', options: ['Crow 🐦', 'Sparrow 🐦', 'Owl 🦉'], target: 'Crow 🐦', emoji: '🐦' },
        { question: 'Which tiny bird chirps near houses?', options: ['Sparrow 🐦', 'Owl 🦉', 'Peacock 🦚'], target: 'Sparrow 🐦', emoji: '🐦' },
        { question: 'Which bird sleeps during the day and flies at night?', options: ['Owl 🦉', 'Parrot 🦜', 'Hen 🐔'], target: 'Owl 🦉', emoji: '🦉' }
      ];
    }
    if (title.includes('features')) {
      return [
        { question: 'What do birds use to fly in the clouds?', options: ['Wings 🪶', 'Paws 🐾', 'Tail 🐕'], target: 'Wings 🪶', emoji: '🦅' },
        { question: 'What do birds use to pick grains (no teeth)?', options: ['Beak 👄', 'Paws 🐾', 'Ears 👂'], target: 'Beak 👄', emoji: '🐦' },
        { question: 'What soft thing covers a bird\'s body to keep it warm?', options: ['Feathers 🪶', 'Scales 🐟', 'Fur 🐕'], target: 'Feathers 🪶', emoji: '🪶' },
        { question: 'What do birds lay inside their nests?', options: ['Eggs 🥚', 'Seeds 🌾', 'Toys 🧸'], target: 'Eggs 🥚', emoji: '🥚' },
        { question: 'What helps a bird balance when landing?', options: ['Tail feathers 🪶', 'Beak 👄', 'Paws 🐾'], target: 'Tail feathers 🪶', emoji: '🪶' }
      ];
    }
    if (title.includes('insects')) {
      return [
        { question: 'Which insect has beautiful colorful wings?', options: ['Butterfly 🦋', 'Ant 🐜', 'Mosquito 🦟'], target: 'Butterfly 🦋', emoji: '🦋' },
        { question: 'Which insect works in large crawling groups?', options: ['Ant 🐜', 'Butterfly 🦋', 'Honeybee 🐝'], target: 'Ant 🐜', emoji: 'Ant' },
        { question: 'Which insect collects pollen to make sweet honey?', options: ['Honeybee 🐝', 'Ant 🐜', 'Mosquito 🦟'], target: 'Honeybee 🐝', emoji: '🐝' },
        { question: 'Which insect hops on green grass?', options: ['Grasshopper 🦗', 'Butterfly 🦋', 'Ladybug 🐞'], target: 'Grasshopper 🦗', emoji: '🦗' },
        { question: 'Which small red insect has black spots?', options: ['Ladybug 🐞', 'Butterfly 🦋', 'Ant 🐜'], target: 'Ladybug 🐞', emoji: '🐞' }
      ];
    }

    // Chapter 4: Nature World
    if (title.includes('living')) {
      return [
        { question: 'Which of these is a living thing that grows?', options: ['Dog 🐕', 'Toy Car 🚗', 'Stone 🪨'], target: 'Dog 🐕', emoji: '🐕' },
        { question: 'Which of these is a non-living thing?', options: ['Toy Car 🚗', 'Plant 🌿', 'Cat 🐱'], target: 'Toy Car 🚗', emoji: '🚗' },
        { question: 'Which living thing makes its own food in sunlight?', options: ['Plant 🌿', 'Stone 🪨', 'Toy 🧸'], target: 'Plant 🌿', emoji: '🌿' },
        { question: 'Which non-living thing is used to build walls?', options: ['Brick 🧱', 'Flower 🌸', 'Puppy 🐶'], target: 'Brick 🧱', emoji: '🧱' },
        { question: 'Can non-living things walk by themselves?', options: ['No, never ❌', 'Yes, they do ✔️'], target: 'No, never ❌', emoji: '🧸' }
      ];
    }
    if (title.includes('plants')) {
      return [
        { question: 'What is a very tall plant with a thick wood trunk?', options: ['Tree 🌳', 'Grass 🌿', 'Flower 🌸'], target: 'Tree 🌳', emoji: '🌳' },
        { question: 'Which part of a plant is colorful and smells sweet?', options: ['Flower 🌸', 'Root 🪵', 'Stem 🌿'], target: 'Flower 🌸', emoji: '🌸' },
        { question: 'Which plant part contains seeds and is yummy to eat?', options: ['Fruit 🍎', 'Leaf 🍃', 'Root 🪵'], target: 'Fruit 🍎', emoji: '🍎' },
        { question: 'Which flower turns to face the sun?', options: ['Sunflower 🌻', 'Rose 🌹', 'Lotus 🪷'], target: 'Sunflower 🌻', emoji: '🌻' },
        { question: 'Which flower plant has sharp thorns on its stem?', options: ['Rose 🌹', 'Lotus 🪷', 'Sunflower 🌻'], target: 'Rose 🌹', emoji: '🌹' }
      ];
    }
    if (title.includes('resources')) {
      return [
        { question: 'What falls from clouds to fill rivers and lakes?', options: ['Rain water 💧', 'Stones 🪨', 'Leaves 🍂'], target: 'Rain water 💧', emoji: '🌧️' },
        { question: 'What warm resource gives light to the Earth?', options: ['Sunlight ☀️', 'Moonlight 🌙', 'Flashlight 🔦'], target: 'Sunlight ☀️', emoji: '☀️' },
        { question: 'What invisible resource do we breathe?', options: ['Air 💨', 'Water 💧', 'Soil 🪨'], target: 'Air 💨', emoji: '💨' },
        { question: 'Where do plants grow their roots?', options: ['Soil / Ground 🪴', 'Sky ☁️', 'Clouds 🌧️'], target: 'Soil / Ground 🪴', emoji: '🪴' },
        { question: 'What resource keeps our bodies hydrated?', options: ['Water 💧', 'Soda 🥤', 'Candy 🍬'], target: 'Water 💧', emoji: '💧' }
      ];
    }

    // Chapter 5: Earth & Environment
    if (title.includes('our earth') || title.includes('earth')) {
      return [
        { question: 'What shape is our planet Earth?', options: ['Round / Sphere 🌎', 'Flat Square 🟦', 'Triangle 🔺'], target: 'Round / Sphere 🌎', emoji: '🌎' },
        { question: 'What is the green and brown part of Earth?', options: ['Land 🏔️', 'Ocean 🌊', 'Clouds ☁️'], target: 'Land 🏔️', emoji: '🏔️' },
        { question: 'What is the blue part of Earth?', options: ['Water 🌊', 'Land 🏔️', 'Sand 🏜️'], target: 'Water 🌊', emoji: '🌊' },
        { question: 'Which resource is found in oceans?', options: ['Salt water 🌊', 'Fresh milk 🥛', 'Juice 🥤'], target: 'Salt water 🌊', emoji: '🌊' },
        { question: 'Where do birds and airplanes fly above the Earth?', options: ['Sky ☁️', 'Ocean 🌊', 'Soil 🪨'], target: 'Sky ☁️', emoji: '☁️' }
      ];
    }
    if (title.includes('save') || title.includes('pollution')) {
      return [
        { question: 'What should we do with clean water?', options: ['Save and don\'t waste it 🚰', 'Leave taps open 🚰'], target: 'Save and don\'t waste it 🚰', emoji: '🚰' },
        { question: 'Where should empty plastic bottles go?', options: ['Recycle / Trash bin 🗑️', 'On the street 🛣️'], target: 'Recycle / Trash bin 🗑️', emoji: '🗑️' },
        { question: 'Which action keeps our school park clean?', options: ['Picking up wrappers 🗑️', 'Littering floor 🛝'], target: 'Picking up wrappers 🗑️', emoji: '🗑️' },
        { question: 'Is black smoke from vehicles clean or dirty?', options: ['Dirty 💨', 'Clean 💨'], target: 'Dirty 💨', emoji: '💨' },
        { question: 'What plants help make the air fresh to breathe?', options: ['Green trees 🌳', 'Fake flowers 🌸'], target: 'Green trees 🌳', emoji: '🌳' }
      ];
    }

    // Chapter 6: Transport & Communication
    if (title.includes('types')) {
      return [
        { question: 'Which transport flies in the clouds?', options: ['Air transport ✈️', 'Water transport ⛵', 'Land transport 🚗'], target: 'Air transport ✈️', emoji: '✈️' },
        { question: 'Which transport sails across the ocean?', options: ['Water transport ⛵', 'Land transport 🚗', 'Air transport ✈️'], target: 'Water transport ⛵', emoji: '⛵' },
        { question: 'Which transport runs on roads?', options: ['Land transport 🚗', 'Air transport ✈️', 'Water transport ⛵'], target: 'Land transport 🚗', emoji: '🚗' },
        { question: 'What is an airplane?', options: ['Air transport ✈️', 'Land transport 🚗', 'Water transport ⛵'], target: 'Air transport ✈️', emoji: '✈️' },
        { question: 'What is a cargo ship?', options: ['Water transport 🚢', 'Land transport 🚗', 'Air transport ✈️'], target: 'Water transport 🚢', emoji: '🚢' }
      ];
    }
    if (title.includes('vehicles') || title.includes('uses')) {
      return [
        { question: 'Which vehicle carries sick people to the hospital?', options: ['Ambulance 🚑', 'Fire truck 🚒', 'School bus 🚌'], target: 'Ambulance 🚑', emoji: '🚑' },
        { question: 'Which vehicle is used by firefighters to stop fire?', options: ['Fire truck 🚒', 'Ambulance 🚑', 'School bus 🚌'], target: 'Fire truck 🚒', emoji: '🚒' },
        { question: 'Which big vehicle carries many kids to school?', options: ['School bus 🚌', 'Bicycle 🚲', 'Ambulance 🚑'], target: 'School bus 🚌', emoji: '🚌' },
        { question: 'Which vehicle flies up to rescue people in mountains?', options: ['Helicopter 🚁', 'Bicycle 🚲', 'Ambulance 🚑'], target: 'Helicopter 🚁', emoji: '🚁' },
        { question: 'Which 2-wheel vehicle has no engine and uses pedals?', options: ['Bicycle 🚲', 'Ambulance 🚑', 'Fire truck 🚒'], target: 'Bicycle 🚲', emoji: '🚲' }
      ];
    }
    if (title.includes('communication')) {
      return [
        { question: 'What do we use to call our relatives instantly?', options: ['Mobile Phone 📱', 'Book 📖', 'Pencil ✏️'], target: 'Mobile Phone 📱', emoji: '📱' },
        { question: 'What paper message goes into an envelope and mailbox?', options: ['Letter ✉️', 'Crayon 🖍️', 'Notebook 📓'], target: 'Letter ✉️', emoji: '✉️' },
        { question: 'What screen tool is used to send emails?', options: ['Computer 💻', 'Phone 📱', 'Television 📺'], target: 'Computer 💻', emoji: '💻' },
        { question: 'What printed paper tells us daily news?', options: ['Newspaper 📰', 'Crayon 🖍️', 'Letter ✉️'], target: 'Newspaper 📰', emoji: '📰' },
        { question: 'Where do we watch cartoons and video news?', options: ['Television 📺', 'Radio 📻', 'Book 📖'], target: 'Television 📺', emoji: '📺' }
      ];
    }

    // Chapter 7: Community Helpers
    if (title.includes('helpers around us') || title.includes('helpers')) {
      return [
        { question: 'Who checks our heartbeat when we are sick?', options: ['Doctor 👨‍⚕️', 'Teacher 👩‍🏫', 'Farmer 👨‍🌾'], target: 'Doctor 👨‍⚕️', emoji: '👨‍⚕️' },
        { question: 'Who teaches us letters and numbers?', options: ['Teacher 👩‍🏫', 'Police Officer 👮', 'Baker 👨‍🍳'], target: 'Teacher 👩‍🏫', emoji: '👩‍🏫' },
        { question: 'Who catches thieves to keep our town safe?', options: ['Police Officer 👮', 'Farmer 👨‍🌾', 'Doctor 👨‍⚕️'], target: 'Police Officer 👮', emoji: '👮' },
        { question: 'Who grows fresh rice and vegetables on a farm?', options: ['Farmer 👨‍🌾', 'Postman 📬', 'Doctor 👨‍⚕️'], target: 'Farmer 👨‍🌾', emoji: '👨‍🌾' },
        { question: 'Who bakes fresh cupcakes and bread in a shop?', options: ['Baker 👨‍🍳', 'Teacher 👩‍🏫', 'Firefighter 👨‍️'], target: 'Baker 👨‍🍳', emoji: '👨‍🍳' }
      ];
    }
    if (title.includes('tools')) {
      return [
        { question: 'Who uses a stethoscope to check health?', options: ['Doctor 👨‍⚕️', 'Teacher 👩‍🏫', 'Farmer 👨‍🌾'], target: 'Doctor 👨‍⚕️', emoji: '🩺' },
        { question: 'Who uses a board, chalk, and books?', options: ['Teacher 👩‍🏫', 'Police Officer 👮', 'Baker 👨‍🍳'], target: 'Teacher 👩‍🏫', emoji: '🏫' },
        { question: 'Who uses a tractor to plow soil?', options: ['Farmer 👨‍🌾', 'Doctor 👨‍⚕️', 'Teacher 👩‍🏫'], target: 'Farmer 👨‍🌾', emoji: '🚜' },
        { question: 'Who wears a badge and uses handcuffs?', options: ['Police Officer 👮', 'Doctor 👨‍⚕️', 'Farmer 👨‍🌾'], target: 'Police Officer 👮', emoji: '👮' },
        { question: 'Who uses a rolling pin and oven to bake?', options: ['Baker 👨‍🍳', 'Doctor 👨‍⚕️', 'Teacher 👩‍🏫'], target: 'Baker 👨‍🍳', emoji: '👨‍🍳' }
      ];
    }

    // Chapter 8: India Awareness
    if (title.includes('symbols')) {
      return [
        { question: 'What is the national animal of India?', options: ['Bengal Tiger 🐯', 'Lion 🦁', 'Elephant 🐘'], target: 'Bengal Tiger 🐯', emoji: '🐯' },
        { question: 'What is the national bird of India?', options: ['Peacock 🦚', 'Parrot 🦜', 'Crow 🐦'], target: 'Peacock 🦚', emoji: '🦚' },
        { question: 'How many colors are on the Indian flag?', options: ['3 colors (Tricolor) 🇮🇳', '2 colors 🏳️', '5 colors 🏳️‍🌈'], target: '3 colors (Tricolor) 🇮🇳', emoji: '🇮🇳' },
        { question: 'What is the national flower of India?', options: ['Lotus 🪷', 'Rose 🌹', 'Sunflower 🌻'], target: 'Lotus 🪷', emoji: '🪷' },
        { question: 'What is the national fruit of India?', options: ['Mango 🥭', 'Apple 🍎', 'Banana 🍌'], target: 'Mango 🥭', emoji: '🥭' }
      ];
    }
    if (title.includes('places')) {
      return [
        { question: 'Where do kids go to learn alphabets?', options: ['School 🏫', 'Hospital 🏥', 'Park 🛝'], target: 'School 🏫', emoji: '🏫' },
        { question: 'Where do doctors treat patients?', options: ['Hospital 🏥', 'School 🏫', 'Park 🛝'], target: 'Hospital 🏥', emoji: '🏥' },
        { question: 'Where do families go to play on swings?', options: ['Park 🛝', 'Hospital 🏥', 'School 🏫'], target: 'Park 🛝', emoji: '🛝' },
        { question: 'Where do we catch a train to go on a trip?', options: ['Railway Station 🚉', 'Hospital 🏥', 'Post Office ✉️'], target: 'Railway Station 🚉', emoji: '🚉' },
        { question: 'Where do we buy toys and clothes?', options: ['Market / Shop 🛒', 'Hospital 🏥', 'School 🏫'], target: 'Market / Shop 🛒', emoji: '🛒' }
      ];
    }
    if (title.includes('festivals')) {
      return [
        { question: 'Which festival is the Festival of Lights?', options: ['Diwali 🪔', 'Pongal 🌾', 'Christmas 🎄'], target: 'Diwali 🪔', emoji: '🪔' },
        { question: 'Which festival is the harvest festival of Tamil Nadu?', options: ['Pongal 🌾', 'Christmas 🎄', 'Eid 🌙'], target: 'Pongal 🌾', emoji: '🌾' },
        { question: 'Which festival celebrates Santa Claus and the tree?', options: ['Christmas 🎄', 'Diwali 🪔', 'Eid 🌙'], target: 'Christmas 🎄', emoji: '🎄' },
        { question: 'Which festival marks the end of holy Ramadan?', options: ['Eid 🌙', 'Christmas 🎄', 'Diwali 🪔'], target: 'Eid 🌙', emoji: '🌙' },
        { question: 'Which festival is celebrated with splashing colors?', options: ['Holi 🎨', 'Diwali 🪔', 'Pongal 🌾'], target: 'Holi 🎨', emoji: '🎨' }
      ];
    }

    // Chapter 9: Thinking GK
    if (title.includes('odd')) {
      return [
        { question: 'Find the odd one out: 🍎, 🍌, 🐶 (dog)', options: ['🐶 (dog)', '🍎', '🍌'], target: '🐶 (dog)', emoji: '🍎' },
        { question: 'Find the odd one out: 🚗, 🚌, 🌸 (flower)', options: ['🌸 (flower)', '🚗', '🚌'], target: '🌸 (flower)', emoji: '🚗' },
        { question: 'Find the odd one out: 🦁, 🐯, 🍕 (pizza)', options: ['🍕 (pizza)', '🦁', '🐯'], target: '🍕 (pizza)', emoji: '🦁' },
        { question: 'Find the odd one out: 📚, ✏️, 🍦 (ice cream)', options: ['🍦 (ice cream)', '📚', '✏️'], target: '🍦 (ice cream)', emoji: '📚' },
        { question: 'Find the odd one out: 🐟, 🐙, 🐒 (monkey)', options: ['🐒 (monkey)', '🐟', '🐙'], target: '🐒 (monkey)', emoji: '🐟' }
      ];
    }
    if (title.includes('missing')) {
      return [
        { question: 'What completes sequence: 🔴, 🟡, ___?', options: ['🟢 (green light)', '🔵', '⚫'], target: '🟢 (green light)', emoji: '🚦' },
        { question: 'What is missing on a running car?', options: ['Wheels 🛞', 'Wings 🪶', 'Sail ⛵'], target: 'Wheels 🛞', emoji: '🚗' },
        { question: 'What completes pattern: ☀️, 🌧️, ☀️, ___?', options: ['🌧️', '☀️', '❄️'], target: '🌧️', emoji: '🌧️' },
        { question: 'What is missing on a bird\'s face to eat?', options: ['Beak 👄', 'Teeth 🦷', 'Paws 🐾'], target: 'Beak 👄', emoji: '🐦' },
        { question: 'What completes: 1, 2, ___, 4?', options: ['3', '5', '0'], target: '3', emoji: '🔢' }
      ];
    }
    if (title.includes('same') || title.includes('different')) {
      return [
        { question: 'Which emoji is different: 🍎, 🍎, 🍊, 🍎?', options: ['🍊', '🍎'], target: '🍊', emoji: '🍎' },
        { question: 'Which animal is different (wild): 🐶, 🐱, 🦁?', options: ['🦁', '🐶', '🐱'], target: '🦁', emoji: '🦁' },
        { question: 'Which shapes are the same: 🔺, 🟦, 🔺?', options: ['🔺', '🟦'], target: '🔺', emoji: '🔺' },
        { question: 'Which vehicle is different (flies): 🚗, 🚌, ✈️?', options: ['✈️', '🚗', '🚌'], target: '✈️', emoji: '✈️' },
        { question: 'Which is different (solid): 🥛, 🥤, 🪨?', options: ['🪨', '🥛', '🥤'], target: '🪨', emoji: '🪨' }
      ];
    }
    if (title.includes('memory')) {
      return [
        { question: 'Match the pair: 🔑 (key) goes with...', options: ['🔒 (lock)', '🪥 (brush)', '👟 (shoe)'], target: '🔒 (lock)', emoji: '🔑' },
        { question: 'Match the pair: 🪥 (brush) goes with...', options: ['🦷 (teeth)', '🔒 (lock)', '📓 (book)'], target: '🦷 (teeth)', emoji: '🪥' },
        { question: 'Match the pair: 🌧️ (rain) goes with...', options: ['🌂 (umbrella)', '👟 (shoe)', '🔑 (key)'], target: '🌂 (umbrella)', emoji: '🌧️' },
        { question: 'Match the pair: 🦶 (foot) goes with...', options: ['👟 (shoe)', '🔒 (lock)', '🦷 (teeth)'], target: '👟 (shoe)', emoji: '🦶' },
        { question: 'Match the pair: ✏️ (pencil) goes with...', options: ['📓 (notebook)', '🌂 (umbrella)', '🔒 (lock)'], target: '📓 (notebook)', emoji: '✏️' }
      ];
    }

    // Chapter 10: Colors, Shapes & Patterns
    if (title.includes('color')) {
      return [
        { question: 'What color is a ripe banana?', options: ['Yellow 💛', 'Green 💚', 'Red ❤️'], target: 'Yellow 💛', emoji: '🍌' },
        { question: 'What color is fresh grass?', options: ['Green 💚', 'Yellow 💛', 'Blue 💙'], target: 'Green 💚', emoji: '🌿' },
        { question: 'What color is the sky on a clear day?', options: ['Blue 💙', 'Green 💚', 'White 🤍'], target: 'Blue 💙', emoji: '☁️' },
        { question: 'What color is a fresh red apple?', options: ['Red ❤️', 'Yellow 💛', 'Blue 💙'], target: 'Red ❤️', emoji: '🍎' },
        { question: 'What color is fresh milk?', options: ['White 🤍', 'Red ❤️', 'Green 💚'], target: 'White 🤍', emoji: '🥛' }
      ];
    }
    if (title.includes('shape')) {
      return [
        { question: 'What shape is a wall clock?', options: ['Circle ⭕', 'Triangle 🔺', 'Rectangle 🟦'], target: 'Circle ⭕', emoji: '⏰' },
        { question: 'What shape is a slice of pizza?', options: ['Triangle 🔺', 'Circle ⭕', 'Square 🟦'], target: 'Triangle 🔺', emoji: '🍕' },
        { question: 'What shape is a classroom door?', options: ['Rectangle 🚪', 'Circle ⭕', 'Triangle 🔺'], target: 'Rectangle 🚪', emoji: '🚪' },
        { question: 'What shape is a standard chessboard?', options: ['Square 🟦', 'Circle ⭕', 'Oval 🥚'], target: 'Square 🟦', emoji: '🏁' },
        { question: 'What shape is a chicken egg?', options: ['Oval 🥚', 'Circle ⭕', 'Triangle 🔺'], target: 'Oval 🥚', emoji: '🥚' }
      ];
    }
    if (title.includes('pattern')) {
      return [
        { question: 'What comes next: 🍎, 🍌, 🍎, 🍌, ___?', options: ['🍎', '🍌', '🍒'], target: '🍎', emoji: '🍎' },
        { question: 'What comes next: 🔺, 🟦, 🔺, 🟦, ___?', options: ['🔺', '🟦', '🟢'], target: '🔺', emoji: '🔺' },
        { question: 'What comes next: 🔴, 🔴, 🟢, 🔴, 🔴, ___?', options: ['🟢', '🔴', '🟡'], target: '🟢', emoji: '🟢' },
        { question: 'What comes next: 🐶, 🐱, 🐰, 🐶, 🐱, ___?', options: ['🐰', '🐶', '🐱'], target: '🐰', emoji: '🐰' },
        { question: 'What comes next: ☀️, 🌙, ☀️, 🌙, ___?', options: ['☀️', '🌙', '☁️'], target: '☀️', emoji: '☀️' }
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
        <span className="text-xs font-black text-indigo-600 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100/50">
          🧠 General Knowledge
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
      <div className="w-full bg-[#fcf6fd] border-4 border-[#e1a8e9] rounded-[2rem] p-6 shadow-md flex items-center justify-center min-h-[9rem]">
        <span className="text-7xl">{current.emoji}</span>
      </div>

      {/* Options list */}
      <div className="flex flex-col gap-2.5 w-full">
        {shuffledOptions.map(opt => {
          const isSelected = picked === opt;
          const isTarget = opt === current.target;
          let cls = 'bg-white text-indigo-950 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30';
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
