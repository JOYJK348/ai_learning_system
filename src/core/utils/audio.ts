/**
* Zero-Latency Audio & Speech Engine
* Optimizes Web Speech API and Audio playback for instant feedback.
*/

class AudioEngine {
  private static instance: AudioEngine;
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private isWarmedUp: boolean = false;
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private audioContext: AudioContext | null = null;

  private constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => this.loadVoices();

      // Android/OnePlus: Aggressive interaction listener
      const unlock = () => {
        this.warmUp();
        ['click', 'touchstart', 'pointerdown', 'mousedown', 'keydown'].forEach(evt => 
          window.removeEventListener(evt, unlock)
        );
      };
      
      ['click', 'touchstart', 'pointerdown', 'mousedown', 'keydown'].forEach(evt => 
        window.addEventListener(evt, unlock, { once: true })
      );

      // Recursive check for Android voices (often delayed)
      let retryCount = 0;
      const checkVoices = () => {
        if (this.voices.length === 0 && retryCount < 10) {
          this.loadVoices();
          retryCount++;
          setTimeout(checkVoices, 1000);
        }
      };
      setTimeout(checkVoices, 500);
    }
  }

  private lastSpokenText: string = '';
  private lastSpokenAt: number = 0;

  private silentLoop: HTMLAudioElement | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  public static getInstance(): AudioEngine {
    if (!AudioEngine.instance) {
      AudioEngine.instance = new AudioEngine();
    }
    return AudioEngine.instance;
  }

  private loadVoices() {
    if (typeof window === 'undefined') return;
    this.voices = window.speechSynthesis.getVoices();

    if (this.voices.length > 0) {
      // Prioritize "Cute" and clear Female voices
      const femaleKeywords = ['Samantha', 'Victoria', 'Hazel', 'Zira', 'Moira', 'Google US English', 'Natural', 'Female'];
      
      this.selectedVoice = this.voices.find(v => 
        v.lang.startsWith('en') && v.localService === true &&
        femaleKeywords.some(name => v.name.includes(name))
      ) || this.voices.find(v => v.lang.startsWith('en') && femaleKeywords.some(name => v.name.includes(name)))
        || this.voices.find(v => v.lang.startsWith('en') && v.localService === true) 
        || this.voices.find(v => v.lang.startsWith('en')) 
        || this.voices[0] || null;
    }
  }

  /**
   * Wakes up hardware and speech engine.
   */
  public warmUp() {
    if (typeof window === 'undefined') return;

    // 1. Web Audio API "Hot" Stream (The professional way for Android/OnePlus)
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = 0; // Silent
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        oscillator.start(0);
      }
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
    } catch (e) {
      console.warn("WebAudio warm-up failed", e);
    }

    // 2. Wake up Speech Synthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
      const u = new SpeechSynthesisUtterance(' ');
      u.volume = 0;
      window.speechSynthesis.speak(u);
    }

    // 3. Keep-alive heartbeat (Bypasses aggressive OS sleep)
    if (!this.isWarmedUp) {
      setInterval(() => {
        if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
          window.speechSynthesis.resume();
        }
        // Occasional empty pulse to keep speech service alive on Android
        if (Math.random() > 0.8 && 'speechSynthesis' in window && !window.speechSynthesis.speaking) {
          const p = new SpeechSynthesisUtterance(' ');
          p.volume = 0;
          window.speechSynthesis.speak(p);
        }
      }, 5000);
      this.isWarmedUp = true;
    }
  }

  public speak(text: string, options: { rate?: number; pitch?: number } = {}) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    // ─── DOUBLE-SPEAK GUARD ───
    const now = Date.now();
    if (this.lastSpokenText === text && (now - this.lastSpokenAt) < 800) {
      return;
    }
    this.lastSpokenText = text;
    this.lastSpokenAt = now;

    // Ensure hardware is hot
    if (this.silentLoop && this.silentLoop.paused) {
      this.silentLoop.play().catch(() => { });
    }

    // Reset synthesis engine state
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    // Use a very small timeout for the engine to clear, but enough for mobile
    setTimeout(() => {
      if (this.voices.length === 0) this.loadVoices();

      const u = new SpeechSynthesisUtterance(text);
      this.currentUtterance = u;

      if (this.selectedVoice) {
        u.voice = this.selectedVoice;
        u.lang = this.selectedVoice.lang;
      } else {
        u.lang = 'en-US';
      }

      u.rate = options.rate || 0.9;   // Slightly slower for easier understanding
      u.pitch = options.pitch || 1.4; // Optimized "Cute" female pitch
      u.volume = 1.0;

      u.onend = () => { this.currentUtterance = null; };
      u.onerror = () => { this.currentUtterance = null; };

      console.log(`[AudioEngine] ⚡ Instant Speak: ${text}`);
      window.speechSynthesis.speak(u);
    }, 80); // Minimized latency
  }

  /**
   * Preloads an audio file into cache.
   */
  public preload(url: string) {
    if (this.audioCache.has(url)) return;
    const audio = new Audio(url);
    audio.load();
    this.audioCache.set(url, audio);
  }

  /**
   * Plays a preloaded audio file with zero latency.
   */
  public async play(url: string): Promise<HTMLAudioElement | null> {
    let audio = this.audioCache.get(url);

    if (!audio) {
      audio = new Audio(url);
      this.audioCache.set(url, audio);
    }

    try {
      // Reset and ensure full volume
      audio.currentTime = 0;
      audio.volume = 1.0;
      console.log(`[AudioEngine] Playing: ${url}`);
      await audio.play();
      return audio;
    } catch (err) {
      console.warn(`[AudioEngine] Play failed for ${url}, retrying:`, err);
      audio.load();
      try {
        audio.volume = 1.0;
        await audio.play();
        return audio;
      } catch (e) {
        console.error(`[AudioEngine] Final play failure for ${url}:`, e);
        return null;
      }
    }
  }

  public stopAllAudio() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.audioCache.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }
}

export const audioEngine = typeof window !== 'undefined' ? AudioEngine.getInstance() : null;
