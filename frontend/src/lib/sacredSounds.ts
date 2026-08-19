/**
 * Sacred Audio FX & Soundscape Engine (Web Audio API)
 * Lossless procedural audio synthesis for temple bells, shankh, flutes, and Sanskrit Speech Vocal Engine.
 */

class SacredSoundEngine {
  private ctx: AudioContext | null = null;
  public soundEnabled: boolean = true;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * 📳 Tactile Haptic Vibration for Real Physical Feel
   */
  public vibrate(pattern: number | number[] = 25) {
    if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch {}
    }
  }

  /**
   * 🗣️ Authentic Sanskrit Vocal Speech Synthesizer (श्लोक वाचन)
   * Recites Sanskrit shlokas and translations with resonant Vedic cadence
   */
  public speakSanskritVerse(
    text: string, 
    lang: string = 'hi-IN', 
    onStart?: () => void, 
    onEnd?: () => void
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();

      // Clean Sanskrit text for natural phonetics
      const cleanText = text
        .replace(/[|॥]/g, '')
        .replace(/\d+-\d+/g, '')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 0.82; // Meditative, stately cadence
      utterance.pitch = 0.95; // Warm, resonant pitch
      utterance.lang = lang === 'en' ? 'en-IN' : 'hi-IN';

      // Pick an Indian regional voice if available
      const voices = window.speechSynthesis.getVoices();
      const regionalVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN') || v.name.includes('India'));
      if (regionalVoice) {
        utterance.voice = regionalVoice;
      }

      utterance.onstart = () => {
        if (onStart) onStart();
      };

      utterance.onend = () => {
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        if (onEnd) onEnd();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
      if (onEnd) onEnd();
    }
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * 🔔 Authentic Bronze Temple Bell (मन्दिर घण्टा नाद)
   */
  public playTempleBell(volume = 0.3) {
    if (!this.soundEnabled) return;
    this.vibrate([30, 40, 30]);
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(volume, now);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      const partials = [
        { freq: 780, gain: 0.8 },
        { freq: 1160, gain: 0.6 },
        { freq: 1560, gain: 0.4 },
        { freq: 2320, gain: 0.25 },
        { freq: 3100, gain: 0.15 }
      ];

      partials.forEach(p => {
        const osc = ctx.createOscillator();
        const pGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(p.freq, now);
        pGain.gain.setValueAtTime(p.gain, now);
        pGain.gain.exponentialRampToValueAtTime(0.001, now + (p.freq < 1200 ? 3.0 : 1.8));

        osc.connect(pGain);
        pGain.connect(master);
        osc.start(now);
        osc.stop(now + 3.2);
      });
    } catch {}
  }

  /**
   * 🐚 Sacred Shankhnaad (पवित्र शंखनाद)
   */
  public playShankhnaad(volume = 0.35) {
    if (!this.soundEnabled) return;
    this.vibrate([50, 30, 60]);
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const duration = 2.8;

      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(0.001, now);
      master.gain.linearRampToValueAtTime(volume, now + 0.6);
      master.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.linearRampToValueAtTime(1400, now + 0.8);
      filter.frequency.exponentialRampToValueAtTime(400, now + duration);
      filter.Q.value = 3.5;

      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(220, now);
      osc1.frequency.exponentialRampToValueAtTime(330, now + 0.7);
      osc1.frequency.linearRampToValueAtTime(328, now + duration);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 5.2;
      lfoGain.gain.value = 12;
      lfo.connect(lfoGain);
      lfoGain.connect(osc1.frequency);

      osc1.connect(filter);
      filter.connect(master);

      lfo.start(now);
      osc1.start(now);
      osc1.stop(now + duration);
      lfo.stop(now + duration);
    } catch {}
  }

  /**
   * 🪈 Bamboo Flute (बाँसुरी स्वर)
   */
  public playFluteChime(volume = 0.3) {
    if (!this.soundEnabled) return;
    this.vibrate(20);
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(0.001, now);
      master.gain.linearRampToValueAtTime(volume, now + 0.15);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5 note
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.4); // E5
      osc.frequency.linearRampToValueAtTime(587.33, now + 1.2);

      osc.connect(master);
      osc.start(now);
      osc.stop(now + 2.0);
    } catch {}
  }

  /**
   * 🕉️ OM Chime (ॐ ध्वनि)
   */
  public playOmChime(volume = 0.25) {
    if (!this.soundEnabled) return;
    this.vibrate(35);
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(0.001, now);
      master.gain.linearRampToValueAtTime(volume, now + 0.5);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 4.0);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(136.1, now); // 136.1 Hz Cosmic OM

      osc.connect(master);
      osc.start(now);
      osc.stop(now + 4.0);
    } catch {}
  }

  /**
   * 🥣 Tibetan Singing Bowl (सिङ्गिङ बोल नाद)
   */
  public playSingingBowl(volume = 0.3) {
    if (!this.soundEnabled) return;
    this.vibrate(30);
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(volume, now);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, now); // 432 Hz Healing frequency

      osc.connect(master);
      osc.start(now);
      osc.stop(now + 3.5);
    } catch {}
  }

  /**
   * 🔘 Tactile UI Click Chime
   */
  public playNavChime(volume = 0.1) {
    if (!this.soundEnabled) return;
    this.vibrate(15);
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(volume, now);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);

      osc.connect(master);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch {}
  }
}

export const sacredAudio = new SacredSoundEngine();
