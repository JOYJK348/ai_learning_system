import { type TutorialStep } from '../english';

export function getChapterVisuals(name: string) {
  return { emoji: '🌳', mascot: '🌍', color: 'from-emerald-400 to-green-500', sound: 'Grade 1 EVS!' };
}

export function getLessonVisuals(title: string) {
  return { emoji: '🔍', mascot: '🌳', color: 'from-emerald-400 to-teal-500', sound: 'Ready!' };
}

export function buildTutorial(title: string, studentName?: string): TutorialStep[] {
  const name = studentName || 'Explorer';
  return [
    { title: 'Ready', speak: `Hi ${name}! Welcome to Grade 1 EVS class!`, emoji: '✨', anim: 'jump' },
  ];
}
