'use client';

/**
 * 🕉️ SACRED SOUND ENGINE (Dharma.OS Web Audio & Vocal Chanting Synthesizer)
 * Pure Zero-Dependency Web Audio API Engine
 */

class SacredSoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private tanpuraNodes: { osc1: OscillatorNode; osc2: OscillatorNode; osc3: OscillatorNode; gain: GainNode } | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    if (!enabled) {
      this.stopTanpura();
      this.stopSpeaking();
    }
  }

  public vibrate(pattern: number | number[]) {
    if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch {}
    }
  }

  /**
   * 🗣️ Pure Sanskrit Speech Chanting (Zero Ads, Zero Promos)
   */
  public speakSanskritVerse(
    text: string, 
    rate: number = 0.85,
    lang: string = 'hi-IN', 
    onStart?: () => void, 
    onEnd?: () => void,
    onBoundary?: (charIndex: number) => void
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const cleanText = text.replace(new RegExp('[।|॥]', 'g'), ', ').replace(new RegExp('[\\n\\r]+', 'g'), ' ').trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = rate;
      utterance.pitch = 0.95;
      utterance.lang = lang;

      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find(v => 
        (v.lang.includes('hi') || v.lang.includes('sa') || v.lang.includes('IN')) && 
        (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('India'))
      ) || voices.find(v => v.lang.includes('hi') || v.lang.includes('IN'));

      if (indianVoice) {
        utterance.voice = indianVoice;
      }

      utterance.onstart = () => {
        this.vibrate([40, 20, 40]);
        if (onStart) onStart();
      };

      utterance.onend = () => {
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        if (onEnd) onEnd();
      };

      if (onBoundary) {
        utterance.onboundary = (e) => {
          this.vibrate(15);
          onBoundary(e.charIndex);
        };
      }

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech error:', err);
      if (onEnd) onEnd();
    }
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.stopTanpura();
  }

  /**
   * 🪕 432Hz Continuous Sacred Tanpura Drone Harmony
   */
  public startTanpura(volume = 0.08) {
    if (!this.soundEnabled) return;
    this.stopTanpura();

    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 1.5);
      gain.connect(ctx.destination);

      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(136.1, ctx.currentTime);

      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(204.1, ctx.currentTime);

      const osc3 = ctx.createOscillator();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(272.2, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);
      filter.connect(gain);

      osc1.start();
      osc2.start();
      osc3.start();

      this.tanpuraNodes = { osc1, osc2, osc3, gain };
    } catch {}
  }

  public stopTanpura() {
    if (this.tanpuraNodes) {
      try {
        const ctx = this.getAudioContext();
        if (ctx) {
          this.tanpuraNodes.gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        }
        setTimeout(() => {
          this.tanpuraNodes?.osc1.stop();
          this.tanpuraNodes?.osc2.stop();
          this.tanpuraNodes?.osc3.stop();
          this.tanpuraNodes = null;
        }, 500);
      } catch {
        this.tanpuraNodes = null;
      }
    }
  }

  /**
   * 🔔 Authentic Bronze Temple Bell
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
   * 🥣 Tibetan Singing Bowl
   */
  public playSingingBowl(volume = 0.3) {
    if (!this.soundEnabled) return;
    this.vibrate([20, 50, 20]);
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(0.001, now);
      master.gain.exponentialRampToValueAtTime(volume, now + 0.1);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      const fundamentals = [432, 864, 1296];
      fundamentals.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq + (idx === 0 ? Math.sin(now * 2) * 1.5 : 0), now);
        g.gain.setValueAtTime(1 / (idx + 1), now);
        osc.connect(g);
        g.connect(master);
        osc.start(now);
        osc.stop(now + 4.5);
      });
    } catch {}
  }

  /**
   * 🐚 Sacred Shankhnaad
   */
  public playShankhnaad(volume = 0.35) {
    if (!this.soundEnabled) return;
    this.vibrate([50, 30, 60]);
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const dur = 2.8;
      const gain = ctx.createGain();
      gain.connect(ctx.destination);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.6);
      gain.gain.setValueAtTime(volume * 0.9, now + 1.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.7);
      osc.frequency.setValueAtTime(328, now + 2.0);
      osc.frequency.exponentialRampToValueAtTime(260, now + dur);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(750, now);

      osc.connect(filter);
      filter.connect(gain);
      osc.start(now);
      osc.stop(now + dur);
    } catch {}
  }

  /**
   * 🕉️ Deep Om Resonance
   */
  public playOmChime(volume = 0.3) {
    this.playOmResonance(volume);
  }

  public playOmResonance(volume = 0.4) {
    if (!this.soundEnabled) return;
    this.vibrate([60, 40, 80]);
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const dur = 4.0;
      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(0.001, now);
      master.gain.exponentialRampToValueAtTime(volume, now + 0.8);
      master.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      [136.1, 272.2, 408.3].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = i === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(f, now);
        g.gain.setValueAtTime(1 / (i + 1), now);
        osc.connect(g);
        g.connect(master);
        osc.start(now);
        osc.stop(now + dur);
      });
    } catch {}
  }

  /**
   * ✨ Nav Chime
   */
  public playNavChime(volume = 0.08) {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const gain = ctx.createGain();
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1046.5, now);
      osc.frequency.exponentialRampToValueAtTime(1318.5, now + 0.12);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }

  /**
   * 🪈 Bamboo Flute Chime
   */
  public playFluteChime(volume = 0.25) {
    if (!this.soundEnabled) return;
    this.vibrate(30);
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const gain = ctx.createGain();
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.3);
      osc.frequency.setValueAtTime(880.0, now + 0.7);

      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 1.6);
    } catch {}
  }
}

export const sacredAudio = new SacredSoundEngine();
