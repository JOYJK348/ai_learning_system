'use client';

import React, { useState, useRef, useMemo } from 'react';
import { HelpCircle, Sparkles, CheckCircle } from 'lucide-react';

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
        { question: 'How old are you if you are in UKG?', options: ['3 years old', '5 years old', '8 years old'], target: '5 years old', emoji: '🎂' },
        { question: 'Where do we go every morning to learn and play?', options: ['School 🏫', 'Market 🛒', 'Park 🛝'], target: 'School 🏫', emoji: '🏫' }
      ];
    }
    if (title.includes('body parts & functions') || title.includes('body parts')) {
      return [
        { question: 'Which body part helps us see the beautiful rainbow?', options: ['Eyes 👀', 'Ears 👂', 'Nose 👃'], target: 'Eyes 👀', emoji: '🌈' },
        { question: 'Which body part helps us hear the school bell ring?', options: ['Ears 👂', 'Eyes 👀', 'Tongue 👅'], target: 'Ears 👂', emoji: '🔔' },
        { question: 'Which body part helps us smell a fresh rose flower?', options: ['Nose 👃', 'Skin 🖐️', 'Eyes 👀'], target: 'Nose 👃', emoji: '🌹' }
      ];
    }
    if (title.includes('healthy routine')) {
      return [
        { question: 'What should we do before having our meals?', options: ['Wash hands with soap 🧼', 'Play with toys 🧸', 'Go to sleep 😴'], target: 'Wash hands with soap 🧼', emoji: '🧼' },
        { question: 'How many times should we brush our teeth every day?', options: ['2 times (morning & night) 🪥', '5 times 🪥', 'Zero times 🪥'], target: '2 times (morning & night) 🪥', emoji: '🪥' }
      ];
    }

    // Chapter 2: Sense Organs
    if (title.includes('sense') || title.includes('senses')) {
      return [
        { question: 'Match the sense: 👃 Smell matches with...', options: ['Flower 🌸', 'Stone 🪨', 'Music 🎵'], target: 'Flower 🌸', emoji: '👃' },
        { question: 'Match the sense: 👅 Taste matches with...', options: ['Delicious Ice Cream 🍦', 'Colorful Book 📖', 'Fresh Air 💨'], target: 'Delicious Ice Cream 🍦', emoji: '👅' },
        { question: 'Match the sense: 👂 Hearing matches with...', options: ['Beating Drum 🥁', 'Shiny Rainbow 🌈', 'Apple Tree 🌳'], target: 'Beating Drum 🥁', emoji: '👂' }
      ];
    }

    // Chapter 3: Food & Nutrition
    if (title.includes('food groups')) {
      return [
        { question: 'Which of these is a healthy vegetable?', options: ['Carrot 🥕', 'Candy 🍬', 'Cupcake 🧁'], target: 'Carrot 🥕', emoji: '🥕' },
        { question: 'Which of these belongs to the healthy fruit group?', options: ['Apple 🍎', 'Rice 🌾', 'Potato 🥔'], target: 'Apple 🍎', emoji: '🍎' }
      ];
    }
    if (title.includes('eating & sources') || title.includes('sources')) {
      return [
        { question: 'Where does fresh milk come from?', options: ['Cow 🐄', 'Apple Tree 🌳', 'Chicken 🐔'], target: 'Cow 🐄', emoji: '🥛' },
        { question: 'Where do we get sweet red apples from?', options: ['Trees 🌳', 'Cows 🐄', 'Hens 🐔'], target: 'Trees 🌳', emoji: '🍎' }
      ];
    }

    // Chapter 4: Plants
    if (title.includes('parts of a plant') || title.includes('parts of plant')) {
      return [
        { question: 'Which part of the plant holds it in the soil and drinks water?', options: ['Root 🪵', 'Flower 🌸', 'Leaf 🍃'], target: 'Root 🪵', emoji: '🌱' },
        { question: 'Which part of the plant is green and makes food?', options: ['Leaf 🍃', 'Fruit 🍎', 'Root 🪵'], target: 'Leaf 🍃', emoji: '🍃' }
      ];
    }
    if (title.includes('need to grow') || title.includes('plants need')) {
      return [
        { question: 'What does a little seed need to grow into a healthy plant?', options: ['Sunlight & Water ☀️💧', 'Juice & Chips 🥤🍟', 'Toys 🧸'], target: 'Sunlight & Water ☀️💧', emoji: '🌱' }
      ];
    }

    // Chapter 5: Animals
    if (title.includes('domestic & wild') || title.includes('domestic')) {
      return [
        { question: 'Which animal is domestic and lives on a farm?', options: ['Cow 🐄', 'Lion 🦁', 'Tiger 🐯'], target: 'Cow 🐄', emoji: '🐄' },
        { question: 'Which animal is a wild animal living in the deep forest?', options: ['Tiger 🐯', 'Dog 🐕', 'Cat 🐈'], target: 'Tiger 🐯', emoji: '🌳' }
      ];
    }
    if (title.includes('herbivores')) {
      return [
        { question: 'Which animal eats grass and leaves (Herbivore)?', options: ['Cow 🐄', 'Lion 🦁', 'Leopard 🐆'], target: 'Cow 🐄', emoji: '🌿' },
        { question: 'Which animal hunts other animals for meat (Carnivore)?', options: ['Lion 🦁', 'Rabbit 🐇', 'Deer 🦌'], target: 'Lion 🦁', emoji: '🥩' }
      ];
    }
    if (title.includes('babies')) {
      return [
        { question: 'What is a baby cow called?', options: ['Calf 🐮', 'Puppy 🐶', 'Kitten 🐱'], target: 'Calf 🐮', emoji: '🐮' },
        { question: 'What is a baby dog called?', options: ['Puppy 🐶', 'Calf 🐮', 'Kitten 🐱'], target: 'Puppy 🐶', emoji: '🐶' }
      ];
    }

    // Chapter 6: Birds & Insects
    if (title.includes('wings') || title.includes('feathers')) {
      return [
        { question: 'Which parts help a bird fly high in the blue sky?', options: ['Wings & Feathers 🪶', 'Paws & Tail 🐾', 'Beak & Teeth 🦷'], target: 'Wings & Feathers 🪶', emoji: '🦅' },
        { question: 'What do birds use to pick seeds and eat?', options: ['Beak 👄', 'Paws 🐾', 'Teeth 🦷'], target: 'Beak 👄', emoji: '🐦' }
      ];
    }
    if (title.includes('insects')) {
      return [
        { question: 'How many legs do insects typically have?', options: ['6 legs 🐜', '2 legs 🚶', '8 legs 🕷️'], target: '6 legs 🐜', emoji: '🐞' },
        { question: 'Which of these is a tiny crawling insect?', options: ['Ant 🐜', 'Eagle 🦅', 'Cat 🐈'], target: 'Ant 🐜', emoji: '🐜' }
      ];
    }

    // Chapter 7: Environment
    if (title.includes('living')) {
      return [
        { question: 'Which of these is a living thing that grows and breathes?', options: ['Tree 🌳', 'Toy Car 🚗', 'Stone 🪨'], target: 'Tree 🌳', emoji: '🌳' },
        { question: 'Which of these is a non-living thing that does not grow?', options: ['Stone 🪨', 'Puppy 🐶', 'Plant 🌿'], target: 'Stone 🪨', emoji: '🪨' }
      ];
    }

    // Chapter 8: Weather & Seasons
    if (title.includes('weather')) {
      return [
        { question: 'Which weather requires us to wear sunglasses and a sun hat?', options: ['Sunny ☀️', 'Rainy 🌧️', 'Snowy ❄️'], target: 'Sunny ☀️', emoji: '☀️' }
      ];
    }
    if (title.includes('seasons') || title.includes('changes')) {
      return [
        { question: 'When it is winter and very cold, what do we wear to stay warm?', options: ['Sweater & Jacket 🧥', 'Raincoat 🧥', 'Swimwear 🩱'], target: 'Sweater & Jacket 🧥', emoji: '❄️' },
        { question: 'When it rains heavily, what do we hold to stay dry?', options: ['Umbrella 🌂', 'Cap 🧢', 'Sunglasses 🕶️'], target: 'Umbrella 🌂', emoji: '🌧️' }
      ];
    }

    // Chapter 9: Community & Places
    if (title.includes('community places') || title.includes('places')) {
      return [
        { question: 'Where do we go when we are sick or hurt to see a doctor?', options: ['Hospital 🏥', 'Post Office ✉️', 'Park 🛝'], target: 'Hospital 🏥', emoji: '🏥' },
        { question: 'Where do police officers work to keep our town safe?', options: ['Police Station 👮', 'Bank 🏦', 'Hospital 🏥'], target: 'Police Station 👮', emoji: '👮' }
      ];
    }
    if (title.includes('helpers')) {
      return [
        { question: 'Who helps put out fires and keeps buildings safe?', options: ['Firefighter 👨‍🚒', 'Chef 👨‍🍳', 'Teacher 👩‍🏫'], target: 'Firefighter 👨‍🚒', emoji: '👨‍🚒' },
        { question: 'Who teaches us new things at school every day?', options: ['Teacher 👩‍🏫', 'Doctor 👨‍⚕️', 'Firefighter 👨‍🚒'], target: 'Teacher 👩‍🏫', emoji: '👩‍🏫' }
      ];
    }

    // Chapter 10: Safety Rules
    if (title.includes('traffic') || title.includes('road')) {
      return [
        { question: 'What color light on the traffic signal tells us to STOP?', options: ['Red Light 🔴', 'Green Light 🟢', 'Yellow Light 🟡'], target: 'Red Light 🔴', emoji: '🚦' },
        { question: 'Where should we safely walk when crossing the road?', options: ['Zebra Crossing 🦓', 'Middle of the Road 🛣️', 'Grass 🌿'], target: 'Zebra Crossing 🦓', emoji: '🦓' }
      ];
    }
    if (title.includes('safety rules') || title.includes('emergencies')) {
      return [
        { question: 'Is it safe to play with sharp knives or electrical sockets?', options: ['No, very dangerous! ⚠️', 'Yes, it is fun! 😄'], target: 'No, very dangerous! ⚠️', emoji: '⚠️' }
      ];
    }

    // Chapter 11: Daily Life Activities
    if (title.includes('routine') || title.includes('morning')) {
      return [
        { question: 'What is the correct sequence of morning routines?', options: ['Wake up ➔ Brush ➔ Eat ➔ School', 'School ➔ Eat ➔ Wake up ➔ Brush'], target: 'Wake up ➔ Brush ➔ Eat ➔ School', emoji: '🌅' },
        { question: 'When do we see the sun rise and hear birds sing?', options: ['Morning 🌅', 'Night 🌃', 'Evening 🌇'], target: 'Morning 🌅', emoji: '🌅' }
      ];
    }

    // Chapter 12: Our Earth
    if (title.includes('land') || title.includes('water')) {
      return [
        { question: 'Which of these is a huge body of water where sharks swim?', options: ['Ocean 🌊', 'Mountain 🏔️', 'Forest 🌳'], target: 'Ocean 🌊', emoji: '🌊' }
      ];
    }
    if (title.includes('protecting') || title.includes('nature')) {
      return [
        { question: 'How can we save water at home?', options: ['Turn off the tap while brushing 🚰', 'Leave the tap running 🚰'], target: 'Turn off the tap while brushing 🚰', emoji: '🚰' }
      ];
    }

    // Fallback EVS questions
    return [
      { question: 'Which animal puppy is the baby of?', options: ['Dog 🐶', 'Cat 🐱', 'Cow 🐄'], target: 'Dog 🐶', emoji: '🐶' }
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
        <p className="text-lg font-bold text-indigo-900/50 -mt-2">You completed EVS Level Up quiz! 🌟</p>
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

      <div className="text-center">
        <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100/50">
          🌱 UKG EVS — Level Up
        </span>
        <h3 className="text-lg sm:text-xl font-black text-indigo-950 mt-1 leading-snug">
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
