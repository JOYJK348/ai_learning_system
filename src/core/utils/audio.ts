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
      this.selectedVoice = this.voices.find(v => 
        v.lang.startsWith('en') && 
        (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Daniel') || v.name.includes('Samantha'))
      ) || this.voices.find(v => v.lang.startsWith('en')) || this.voices[0] || null;
      
      if (this.selectedVoice) {
        console.log("🟢 AUDIO READY: Voice Loaded -", this.selectedVoice.name);
      }
    }
  }

  /**
   * Wakes up the speech engine. Call this on the first user interaction.
   */
  public warmUp() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.resume();
    const u = new SpeechSynthesisUtterance(' '); // Small kick
    u.volume = 0;
    window.speechSynthesis.speak(u);
    this.isWarmedUp = true;
  }

  public speak(text: string, options: { rate?: number; pitch?: number } = {}) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    // ─── DOUBLE-SPEAK GUARD ───
    // If the same text is requested within 1 second, ignore it (fixes React double-trigger)
    const now = Date.now();
    if (this.lastSpokenText === text && (now - this.lastSpokenAt) < 1000) {
      return;
    }
    this.lastSpokenText = text;
    this.lastSpokenAt = now;

    // Reset synthesis engine state
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();
    
    setTimeout(() => {
      // Re-scan for voices if list is empty
      if (this.voices.length === 0) {
        this.loadVoices();
      }

      const u = new SpeechSynthesisUtterance(text);
      
      // Ensure we have a voice or use system default
      if (this.selectedVoice) {
        u.voice = this.selectedVoice;
      }
      
      u.rate = options.rate || 0.9;
      u.pitch = options.pitch || 1.3;
      u.volume = 1.0;
      u.lang = 'en-US';
      
      console.log(`[AudioEngine] Speaking: ${text}`);
      window.speechSynthesis.speak(u);
    }, 150);
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
