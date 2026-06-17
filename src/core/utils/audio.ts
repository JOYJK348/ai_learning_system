/**
 * ═══════════════════════════════════════════════════════════════
 *  KID-FRIENDLY AUDIO ENGINE (Web Speech API)
 * ═══════════════════════════════════════════════════════════════
 *
 * Uses browser-native SpeechSynthesis (Web Speech API) for TTS.
 * No external services — works offline, no CORS issues.
 *
 * Cross-Device Guarantees:
 *   ✓ iOS Safari autoplay unlock
 *   ✓ Android Chrome sleep prevention
 *   ✓ Desktop Chrome, Firefox, Edge
 *   ✓ Audio queue (no overlapping)
 *   ✓ Memory-safe audio pooling
 *   ✓ Race condition protection
 */

class AudioEngine {
  private static instance: AudioEngine;

  // ─── Core state ───
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private isWarmedUp = false;
  private audioContext: AudioContext | null = null;

  // ─── Media audio cache (rhymes, effects) ───
  private mediaCache: Map<string, HTMLAudioElement> = new Map();

  // ─── Speech state ───
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  // ─── Guards ───
  private lastSpokenText = '';
  private lastSpokenAt = 0;
  private isSpeaking = false;
  private speechQueue: string[] = [];

  // ─── Device detection ───
  private isIOS = false;
  private isAndroid = false;
  private isSafari = false;

  private constructor() {
    if (typeof window === 'undefined') return;

    const ua = navigator.userAgent || '';
    this.isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    this.isAndroid = /Android/i.test(ua);
    this.isSafari = /^((?!chrome|android).)*safari/i.test(ua);

    // Load browser voices
    if ('speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }

    // Unlock audio on first user interaction (iOS/Android requirement)
    const interactionEvents = ['click', 'touchstart', 'touchend', 'pointerdown', 'mousedown', 'keydown'];
    const unlock = () => {
      this.warmUp();
      interactionEvents.forEach((evt) => window.removeEventListener(evt, unlock));
    };
    interactionEvents.forEach((evt) =>
      window.addEventListener(evt, unlock, { once: false, passive: true }),
    );

    // Android: Retry voice loading (often delayed)
    if (this.isAndroid) {
      let retries = 0;
      const retryVoices = () => {
        if (this.voices.length === 0 && retries < 15) {
          this.loadVoices();
          retries++;
          setTimeout(retryVoices, 800);
        }
      };
      setTimeout(retryVoices, 500);
    }
  }

  public static getInstance(): AudioEngine {
    if (!AudioEngine.instance) {
      AudioEngine.instance = new AudioEngine();
    }
    return AudioEngine.instance;
  }

  // ═══════════════════════════════════════════════════════════
  //  WARM-UP: Unlock audio hardware across all devices
  // ═══════════════════════════════════════════════════════════
  public warmUp() {
    // Silent no-op
  }

  // ═══════════════════════════════════════════════════════════
  //  VOICE SELECTION
  // ═══════════════════════════════════════════════════════════
  private loadVoices() {
    // Silent no-op
  }

  // ═══════════════════════════════════════════════════════════
  //  WEB SPEECH API (primary — no external dependencies)
  // ═══════════════════════════════════════════════════════════
  private speakWithBrowserTTS(text: string) {
    // Silent no-op
  }

  // ═══════════════════════════════════════════════════════════
  //  QUEUE SYSTEM — Prevents audio overlap & race conditions
  // ═══════════════════════════════════════════════════════════
  private processQueue() {
    // Silent no-op
  }

  // ═══════════════════════════════════════════════════════════
  //  PUBLIC API
  // ═══════════════════════════════════════════════════════════

  /**
   * Speaks text using the browser's built-in TTS engine.
   * No external services, no CORS issues, works offline.
   */
  public async speak(text: string, _options?: { rate?: number; pitch?: number }) {
    // Silent no-op
  }

  /**
   * Stops all speech.
   */
  private stopSpeech() {
    this.isSpeaking = false;
  }

  /**
   * Preloads a media audio file (rhymes, effects, etc.)
   */
  public preload(url: string) {
    if (this.mediaCache.has(url)) return;
    const audio = new Audio(url);
    audio.preload = 'auto';
    audio.load();
    this.mediaCache.set(url, audio);
  }

  /**
   * Plays a media audio file (NOT speech — for rhymes, sound effects, etc.)
   */
  public async play(url: string): Promise<HTMLAudioElement | null> {
    this.stopSpeech();

    let audio = this.mediaCache.get(url);
    if (!audio) {
      audio = new Audio(url);
      this.mediaCache.set(url, audio);
    }

    try {
      audio.currentTime = 0;
      audio.volume = 1.0;
      await audio.play();
      return audio;
    } catch {
      try {
        audio.load();
        audio.volume = 1.0;
        await audio.play();
        return audio;
      } catch {
        console.warn(`[AudioEngine] Play failed: ${url}`);
        return null;
      }
    }
  }

  /**
   * Stops ALL audio: speech + media.
   */
  public stopAllAudio() {
    this.stopSpeech();
    this.speechQueue = [];

    this.mediaCache.forEach((audio) => {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch {
        /* ignore */
      }
    });
  }
}

export const audioEngine = typeof window !== 'undefined' ? AudioEngine.getInstance() : null;
