import * as english from './english';
import * as tamil from './tamil';
import { type TutorialStep } from './english';

export { type TutorialStep };

/**
 * Checks if the subject is Tamil based on its name or ID.
 */
function isTamilSubject(subjectName?: string): boolean {
  if (!subjectName) return false;
  const lower = subjectName.toLowerCase();
  return lower.includes('tamil') || lower.includes('தமிழ்');
}

/**
 * ─────────── SUBJECT VISUALS FOR TODDLERS ───────────
 */
export function getSubjectVisuals(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('english')) {
    return {
      emoji: '🔤',
      mascot: '📚',
      color: 'from-blue-400 via-indigo-400 to-purple-400',
      border: 'border-blue-300',
      bg: 'bg-blue-400/20',
      shadow: 'shadow-blue-500/20',
      sound: 'English! A B C!',
      label: 'ABC',
    };
  }
  if (lower.includes('math') || lower.includes('ganith')) {
    return {
      emoji: '🔢',
      mascot: '🧮',
      color: 'from-orange-400 via-amber-400 to-yellow-400',
      border: 'border-orange-300',
      bg: 'bg-orange-400/20',
      shadow: 'shadow-orange-500/20',
      sound: 'Numbers! One Two Three!',
      label: '123',
    };
  }
  if (lower.includes('environment') || lower.includes('evs') || lower.includes('science')) {
    return {
      emoji: '🌍',
      mascot: '🌳',
      color: 'from-emerald-400 via-green-400 to-teal-400',
      border: 'border-emerald-300',
      bg: 'bg-emerald-400/20',
      shadow: 'shadow-emerald-500/20',
      sound: 'Nature! Trees and Animals!',
      label: 'Nature',
    };
  }
  if (lower.includes('general') || lower.includes('gk') || lower.includes('knowledge')) {
    return {
      emoji: '🧠',
      mascot: '🌟',
      color: 'from-purple-400 via-violet-400 to-fuchsia-400',
      border: 'border-purple-300',
      bg: 'bg-purple-400/20',
      shadow: 'shadow-purple-500/20',
      sound: 'Knowledge! Stars and Planets!',
      label: 'GK',
    };
  }
  if (lower.includes('hindi')) {
    return {
      emoji: '🇮🇳',
      mascot: 'ह',
      color: 'from-rose-400 via-red-400 to-orange-400',
      border: 'border-rose-300',
      bg: 'bg-rose-400/20',
      shadow: 'shadow-rose-500/20',
      sound: 'Hindi! Ka Kha Ga!',
      label: 'हिंदी',
    };
  }
  if (lower.includes('tamil') || lower.includes('தமிழ்')) {
    return {
      emoji: '🇮🇳',
      mascot: 'த',
      color: 'from-cyan-400 via-sky-400 to-blue-400',
      border: 'border-cyan-300',
      bg: 'bg-cyan-400/20',
      shadow: 'shadow-cyan-500/20',
      sound: 'Tamil! அ ஆ இ!',
      label: 'தமிழ்',
    };
  }
  return {
    emoji: '🎒',
    mascot: '📖',
    color: 'from-pink-400 via-rose-400 to-orange-400',
    border: 'border-pink-300',
    bg: 'bg-pink-400/20',
    shadow: 'shadow-pink-500/20',
    sound: `${name} Time!`,
    label: name,
  };
}

/**
 * Returns chapter visual details dynamically.
 */
export function getChapterVisuals(subjectName: string, name: string) {
  if (isTamilSubject(subjectName)) {
    return tamil.getChapterVisuals(name);
  }
  return english.getChapterVisuals(name);
}

/**
 * Returns lesson visual details dynamically.
 */
export function getLessonVisuals(subjectName: string, title: string) {
  if (isTamilSubject(subjectName)) {
    return tamil.getLessonVisuals(title);
  }
  return english.getLessonVisuals(title);
}

/**
 * Builds the tutorial steps dynamically.
 */
export function buildTutorial(subjectName: string, title: string, studentName?: string): TutorialStep[] {
  if (isTamilSubject(subjectName)) {
    return tamil.buildTutorial(title, studentName);
  }
  return english.buildTutorial(title, studentName);
}
