import { type TutorialStep } from '../english';

export function getChapterVisuals(name: string) {
  return { emoji: '🇮🇳', mascot: 'अ', color: 'from-rose-400 to-orange-500', sound: 'Grade 1 Hindi!' };
}

export function getLessonVisuals(title: string) {
  return { emoji: '✏️', mascot: '✍️', color: 'from-rose-400 to-red-500', sound: 'Ready!' };
}

export function buildTutorial(title: string, studentName?: string): TutorialStep[] {
  const name = studentName || 'Explorer';
  return [
    { title: 'Ready', speak: `Hi ${name}! Welcome to Grade 1 Hindi class!`, emoji: '✨', anim: 'jump' },
  ];
}
