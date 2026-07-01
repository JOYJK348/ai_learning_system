import { type TutorialStep } from '../english';

export function getChapterVisuals(name: string) {
  return { emoji: '📚', mascot: 'த', color: 'from-cyan-400 to-blue-500', sound: 'Grade 1 Tamil!' };
}

export function getLessonVisuals(title: string) {
  return { emoji: '✏️', mascot: '✍️', color: 'from-cyan-400 to-sky-500', sound: 'Ready!' };
}

export function buildTutorial(title: string, studentName?: string): TutorialStep[] {
  return [
    { title: 'தயார்', speak: 'வணக்கம்! வகுப்பு 1 தமிழ் பாடத்திற்கு உங்களை வரவேற்கிறோம்!', emoji: '✨', anim: 'jump' },
  ];
}
