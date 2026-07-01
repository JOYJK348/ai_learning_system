import { type TutorialStep } from '../english';

export function getChapterVisuals(name: string) {
  return { emoji: '📖', mascot: '📚', color: 'from-sky-400 to-blue-500', sound: 'Grade 1 English!' };
}

export function getLessonVisuals(title: string) {
  return { emoji: '🎒', mascot: '📖', color: 'from-blue-400 to-sky-500', sound: 'Ready to learn!' };
}

export function buildTutorial(title: string, studentName?: string): TutorialStep[] {
  const name = studentName || 'Explorer';
  return [
    { title: 'Ready', speak: `Hi ${name}! Welcome to Grade 1 English class!`, emoji: '✨', anim: 'jump' },
  ];
}

export function cleanSoundTerms(text: string): string {
  return text || '';
}
