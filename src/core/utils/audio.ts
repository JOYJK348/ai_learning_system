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

  private constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
      
      // Auto-warmup on first true interaction to bypass browser blocks
      const unlock = () => {
        this.warmUp();
        window.removeEventListener('click', unlock);
        window.removeEventListener('touchstart', unlock);
      };
      window.addEventListener('click', unlock);
      window.addEventListener('touchstart', unlock);
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
      // Prioritize the fastest available English voice
      this.selectedVoice = this.voices.find(v => 
        v.lang.startsWith('en') && v.localService === true &&
        (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Daniel') || v.name.includes('Samantha'))
      ) || this.voices.find(v => v.lang.startsWith('en') && v.localService === true) 
        || this.voices.find(v => v.lang.startsWith('en')) 
        || this.voices[0] || null;
      
      if (this.selectedVoice) {
        console.log("🟢 ZERO-LATENCY READY: Voice -", this.selectedVoice.name);
      }
    }
  }

  /**
   * Wakes up hardware and speech engine.
   */
  public warmUp() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    // 1. Wake up the Speech Synthesis
    window.speechSynthesis.resume();
    const u = new SpeechSynthesisUtterance(' ');
    u.volume = 0;
    window.speechSynthesis.speak(u);

    // 2. Start Silent Hardware Loop (Keeps sound card "Hot" on mobile)
    if (!this.silentLoop) {
      this.silentLoop = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFRm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==');
      this.silentLoop.loop = true;
      this.silentLoop.volume = 0.01;
      this.silentLoop.play().catch(() => {
        // Will retry on next interaction
        console.log("Silent loop waiting for interaction...");
      });
    }

    this.isWarmedUp = true;

    // Keep-alive heartbeat
    setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.resume();
      }
      if (this.silentLoop && this.silentLoop.paused) {
        this.silentLoop.play().catch(() => {});
      }
    }, 3000);
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
      this.silentLoop.play().catch(() => {});
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
      
      u.rate = options.rate || 0.95; // Slightly faster for responsiveness
      u.pitch = options.pitch || 1.3;
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
