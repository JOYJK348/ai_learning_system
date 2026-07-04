import { type TutorialStep } from '../english';

export function getChapterVisuals(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('beyond 100') || lower.includes('comparison') || lower.includes('ordering'))
    return { emoji: '🔢', mascot: '🧮', color: 'from-orange-400 to-amber-500', sound: 'Numbers Adventure!', image: '/assets/subjects/maths_numbers_6_10-removebg-preview.png' };
  if (lower.includes('addition'))
    return { emoji: '➕', mascot: '🍎', color: 'from-rose-450 to-pink-500', sound: 'Addition Master!', image: '/assets/subjects/maths_pre_math_concepts-removebg-preview.png' };
  if (lower.includes('subtraction'))
    return { emoji: '➖', mascot: '🍏', color: 'from-amber-400 to-orange-500', sound: 'Subtraction Hero!', image: '/assets/subjects/maths_pre_math_concepts-removebg-preview.png' };
  if (lower.includes('multiplication'))
    return { emoji: '✖️', mascot: '🧮', color: 'from-amber-400 to-orange-500', sound: 'Multiplication Intro!', image: '/assets/subjects/maths_pre_math_concepts-removebg-preview.png' };
  if (lower.includes('shape') || lower.includes('geometry'))
    return { emoji: '⭕', mascot: '⬛', color: 'from-blue-400 to-cyan-500', sound: 'Shapes & Geometry!', image: '/assets/subjects/maths_shapes_spatial_awareness-removebg-preview.png' };
  if (lower.includes('measurement'))
    return { emoji: '📏', mascot: '📐', color: 'from-cyan-400 to-blue-500', sound: 'Measurement Pro!', image: '/assets/subjects/maths_pre_math_concepts-removebg-preview.png' };
  if (lower.includes('time') || lower.includes('money'))
    return { emoji: '🕒', mascot: '🪙', color: 'from-teal-400 to-cyan-500', sound: 'Time & Money!', image: '/assets/subjects/maths_position_words-removebg-preview.png' };
  if (lower.includes('data') || lower.includes('logic'))
    return { emoji: '🔀', mascot: '📊', color: 'from-indigo-400 to-violet-500', sound: 'Data & Logic!', image: '/assets/subjects/maths_sorting_comparison-removebg-preview.png' };

  return { emoji: '🔢', mascot: '🧮', color: 'from-orange-400 to-yellow-500', sound: 'Grade 1 Mathematics!', image: '/assets/subjects/maths-removebg-preview.png' };
}

export function getLessonVisuals(title: string) {
  const lower = title.toLowerCase();

  const numImg = '/assets/subjects/maths_numbers_6_10-removebg-preview.png';
  const preMathImg = '/assets/subjects/maths_pre_math_concepts-removebg-preview.png';
  const shapeImg = '/assets/subjects/maths_shapes_spatial_awareness-removebg-preview.png';
  const posImg = '/assets/subjects/maths_position_words-removebg-preview.png';
  const sortImg = '/assets/subjects/maths_sorting_comparison-removebg-preview.png';

  if (lower.includes('beyond') || lower.includes('place value') || lower.includes('counting') || lower.includes('compare') || lower.includes('order'))
    return { emoji: '🔢', mascot: '🧮', color: 'from-orange-400 to-amber-500', sound: `${title}!`, image: numImg };
  if (lower.includes('addition') || lower.includes('add'))
    return { emoji: '➕', mascot: '🍎', color: 'from-rose-450 to-pink-500', sound: `${title}!`, image: preMathImg };
  if (lower.includes('subtraction') || lower.includes('subtract') || lower.includes('take away'))
    return { emoji: '➖', mascot: '🍏', color: 'from-amber-400 to-orange-500', sound: `${title}!`, image: preMathImg };
  if (lower.includes('multiplication') || lower.includes('multiply') || lower.includes('times'))
    return { emoji: '✖️', mascot: '🧮', color: 'from-amber-400 to-orange-500', sound: `${title}!`, image: preMathImg };
  if (lower.includes('shape') || lower.includes('geometry') || lower.includes('solid') || lower.includes('line') || lower.includes('pattern'))
    return { emoji: '⭕', mascot: '⬛', color: 'from-blue-400 to-cyan-500', sound: `${title}!`, image: shapeImg };
  if (lower.includes('measurement') || lower.includes('length') || lower.includes('weight') || lower.includes('capacity'))
    return { emoji: '📏', mascot: '📐', color: 'from-cyan-400 to-blue-500', sound: `${title}!`, image: preMathImg };
  if (lower.includes('time') || lower.includes('money') || lower.includes('clock') || lower.includes('calendar') || lower.includes('coin') || lower.includes('rupee'))
    return { emoji: '🕒', mascot: '🪙', color: 'from-teal-400 to-cyan-500', sound: `${title}!`, image: posImg };
  if (lower.includes('data') || lower.includes('logic') || lower.includes('sort') || lower.includes('graph'))
    return { emoji: '🔀', mascot: '📊', color: 'from-indigo-400 to-violet-500', sound: `${title}!`, image: sortImg };

  return { emoji: '✏️', mascot: '🔢', color: 'from-orange-400 to-amber-500', sound: 'Ready!', image: '/assets/subjects/maths-removebg-preview.png' };
}

export function buildTutorial(title: string, studentName?: string): TutorialStep[] {
  const name = studentName || 'Explorer';
  return [
    { title: 'Ready', speak: `Hi ${name}! Welcome to Grade 1 Mathematics class!`, emoji: '✨', anim: 'jump' },
  ];
}
