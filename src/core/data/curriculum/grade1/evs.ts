import { type TutorialStep } from '../english';

export function getChapterVisuals(name: string) {
  const lower = name.toLowerCase();
  
  if (lower.includes('myself') || lower.includes('body') || lower.includes('my amazing world'))
    return { emoji: '👧', mascot: '🧍', color: 'from-sky-400 to-blue-500', sound: 'All About Me!', image: '/assets/subjects/evs-removebg-preview.png' };
  
  if (lower.includes('family') || lower.includes('relationship') || lower.includes('people') || lower.includes('community') || lower.includes('neighbourhood'))
    return { emoji: '👨‍👩‍👧', mascot: '🏠', color: 'from-pink-400 to-rose-500', sound: 'Our Community & Family!', image: '/assets/subjects/evs-removebg-preview.png' };
  
  if (lower.includes('food') || lower.includes('nutrition'))
    return { emoji: '🍎', mascot: '🥕', color: 'from-teal-400 to-cyan-500', sound: 'Food & Nutrition!', image: '/assets/subjects/evs-removebg-preview.png' };
  
  if (lower.includes('plant'))
    return { emoji: '🌱', mascot: '🌳', color: 'from-green-400 to-emerald-500', sound: 'Plants & Nature!', image: '/assets/subjects/evs-removebg-preview.png' };
  
  if (lower.includes('animal') || lower.includes('kingdom') || lower.includes('bird') || lower.includes('insect'))
    return { emoji: '🐶', mascot: '🦁', color: 'from-amber-400 to-orange-500', sound: 'Animal Kingdom!', image: '/assets/subjects/gk-removebg-preview.png' };
  
  if (lower.includes('environment') || lower.includes('science') || lower.includes('earth'))
    return { emoji: '🌍', mascot: '🏞️', color: 'from-emerald-400 to-teal-500', sound: 'Our Environment & Science!', image: '/assets/subjects/evs-removebg-preview.png' };
  
  if (lower.includes('transport') || lower.includes('communication'))
    return { emoji: '🚗', mascot: '✈️', color: 'from-violet-400 to-purple-500', sound: 'Transport & Communication!', image: '/assets/subjects/evs-removebg-preview.png' };
  
  if (lower.includes('festival') || lower.includes('fun knowledge') || lower.includes('world around us'))
    return { emoji: '🎉', mascot: '🌟', color: 'from-yellow-400 to-amber-500', sound: 'Festivals and Fun Knowledge!', image: '/assets/subjects/gk-removebg-preview.png' };

  return { emoji: '🌳', mascot: '🌍', color: 'from-emerald-400 to-green-500', sound: 'Grade 1 EVS!', image: '/assets/subjects/evs-removebg-preview.png' };
}

export function getLessonVisuals(title: string) {
  const lower = title.toLowerCase();

  const evsImg = '/assets/subjects/evs-removebg-preview.png';
  const gkImg = '/assets/subjects/gk-removebg-preview.png';

  if (lower.includes('body') || lower.includes('myself') || lower.includes('sense') || lower.includes('care'))
    return { emoji: '🧍', mascot: '👁️', color: 'from-sky-400 to-blue-500', sound: `${title}!`, image: evsImg };
  
  if (lower.includes('family') || lower.includes('home') || lower.includes('relative') || lower.includes('neighbor') || lower.includes('neighborhood') || lower.includes('people') || lower.includes('community') || lower.includes('helper'))
    return { emoji: '👨‍👩‍👧', mascot: '🏠', color: 'from-pink-400 to-rose-500', sound: `${title}!`, image: evsImg };
  
  if (lower.includes('food') || lower.includes('nutrition') || lower.includes('eat') || lower.includes('healthy') || lower.includes('fruit') || lower.includes('vegetable'))
    return { emoji: '🍎', mascot: '🥛', color: 'from-teal-400 to-cyan-500', sound: `${title}!`, image: evsImg };
  
  if (lower.includes('plant') || lower.includes('tree') || lower.includes('nature') || lower.includes('seed') || lower.includes('flower') || lower.includes('leaf'))
    return { emoji: '🌱', mascot: '🌳', color: 'from-green-400 to-emerald-500', sound: `${title}!`, image: evsImg };
  
  if (lower.includes('animal') || lower.includes('bird') || lower.includes('insect') || lower.includes('pet') || lower.includes('wild') || lower.includes('kingdom') || lower.includes('home') || lower.includes('sound'))
    return { emoji: '🐶', mascot: '🦁', color: 'from-amber-400 to-orange-500', sound: `${title}!`, image: gkImg };
  
  if (lower.includes('environment') || lower.includes('science') || lower.includes('weather') || lower.includes('season') || lower.includes('earth') || lower.includes('sky') || lower.includes('star') || lower.includes('planet'))
    return { emoji: '🌍', mascot: '🌤️', color: 'from-emerald-400 to-teal-500', sound: `${title}!`, image: evsImg };
  
  if (lower.includes('transport') || lower.includes('communication') || lower.includes('vehicle') || lower.includes('road') || lower.includes('air') || lower.includes('water') || lower.includes('traffic'))
    return { emoji: '🚗', mascot: '✈️', color: 'from-violet-400 to-purple-500', sound: `${title}!`, image: evsImg };
  
  if (lower.includes('festival') || lower.includes('celebrate') || lower.includes('fun') || lower.includes('knowledge') || lower.includes('gk') || lower.includes('general') || lower.includes('world'))
    return { emoji: '🎉', mascot: '🌟', color: 'from-yellow-400 to-amber-500', sound: `${title}!`, image: gkImg };

  return { emoji: '🔍', mascot: '🌳', color: 'from-emerald-400 to-teal-500', sound: 'Ready!', image: evsImg };
}

export function buildTutorial(title: string, studentName?: string): TutorialStep[] {
  const name = studentName || 'Explorer';
  return [
    { title: 'Ready', speak: `Hi ${name}! Welcome to Grade 1 EVS and GK class!`, emoji: '✨', anim: 'jump' },
  ];
}
