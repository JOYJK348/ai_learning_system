import { type TutorialStep } from '../english';

export function getChapterVisuals(name: string) {
  return { emoji: '🔢', mascot: '🧮', color: 'from-orange-400 to-yellow-500', sound: 'Grade 1 Mathematics!' };
}

export function getLessonVisuals(title: string) {
  return { emoji: '✏️', mascot: '🔢', color: 'from-orange-400 to-amber-500', sound: 'Ready!' };
}

export function buildTutorial(title: string, studentName?: string): TutorialStep[] {
  const name = studentName || 'Explorer';
  return [
    { title: 'Ready', speak: `Hi ${name}! Welcome to Grade 1 Mathematics class!`, emoji: '✨', anim: 'jump' },
  ];
}
