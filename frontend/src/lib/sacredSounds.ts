/**
 * Sacred Audio FX & Soundscape Engine (Web Audio API)
 * Procedural lossless audio synthesis for temple bells, shankh, flutes, and OM drones.
 */

class SacredSoundEngine {
  private ctx: AudioContext | null = null;
  public soundEnabled: boolean = true;

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
   * 🔔 Authentic Bronze Temple Bell (मन्दिर घण्टा नाद)
   * High overtone metallic resonance with warm natural decay
   */
  public playTempleBell(volume = 0.3) {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(volume, now);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      // Bell partial frequencies: Fundamental + Inharmonic partials
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
    } catch {
      // Audio autoplay policy
    }
  }

  /**
   * 🐚 Sacred Shankhnaad (पवित्र शंखनाद)
   * Natural conch shell acoustic swell with pitch bend and breath vibration
   */
  public playShankhnaad(volume = 0.35) {
    if (!this.soundEnabled) return;
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

      // Lowpass warmth filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.linearRampToValueAtTime(1400, now + 0.8);
      filter.frequency.exponentialRampToValueAtTime(400, now + duration);
      filter.Q.value = 3.5;

      // Primary horn oscillator with pitch rise
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(220, now);
      osc1.frequency.exponentialRampToValueAtTime(330, now + 0.7);
      osc1.frequency.linearRampToValueAtTime(328, now + duration);

      // Vibrato LFO
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 5.2; // Natural lip vibrato
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 14;
      lfo.connect(lfoGain);
      lfoGain.connect(osc1.frequency);
      lfo.start(now);
      lfo.stop(now + duration);

      osc1.connect(filter);
      filter.connect(master);

      osc1.start(now);
      osc1.stop(now + duration);
    } catch {
      // Audio autoplay policy
    }
  }

  /**
   * 🕉️ Cosmic OM Tanpura Chime (१३६.१ हर्ट्ज़ नाद ब्रह्म)
   * 136.1Hz fundamental with pure Pa overtone
   */
  public playOmChime(volume = 0.3) {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(0.01, now);
      master.gain.linearRampToValueAtTime(volume, now + 0.4);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 4.0);

      [136.1, 204.15, 272.2, 408.3].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        const g = ctx.createGain();
        g.gain.setValueAtTime(1 / (i + 1), now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

        osc.connect(g);
        g.connect(master);
        osc.start(now);
        osc.stop(now + 4.0);
      });
    } catch {
      // Audio autoplay policy
    }
  }

  /**
   * 🪈 Bansuri Flute Harmonic Sweep (दिव्य मुरली आलाप)
   */
  public playFluteChime(volume = 0.25) {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(0.01, now);
      master.gain.linearRampToValueAtTime(volume, now + 0.15);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, now);
      osc.frequency.exponentialRampToValueAtTime(576, now + 0.25);
      osc.frequency.linearRampToValueAtTime(648, now + 0.6);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1200;

      osc.connect(filter);
      filter.connect(master);
      osc.start(now);
      osc.stop(now + 1.6);
    } catch {
      // Audio autoplay policy
    }
  }

  /**
   * ✨ Sacred UI Navigation Chime (हल्की स्वर्णिम झंकार)
   */
  public playNavChime(volume = 0.18) {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(volume, now);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      const freqs = [880, 1320, 1760];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        const g = ctx.createGain();
        g.gain.setValueAtTime(0.6, now + idx * 0.04);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        osc.connect(g);
        g.connect(master);
        osc.start(now + idx * 0.04);
        osc.stop(now + 0.5);
      });
    } catch {
      // Audio autoplay policy
    }
  }

  /**
   * 🧘 Tibetan Singing Bowl Meditation Strike (५२८ हर्ट्ज़ हीलिंग ध्वनि)
   */
  public playSingingBowl(volume = 0.3) {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(volume, now);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      // 528 Hz DNA / Heart chakra repair frequency
      [528, 528 * 1.5, 528 * 2.02].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const g = ctx.createGain();
        g.gain.setValueAtTime(idx === 0 ? 0.9 : 0.4, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 4.2);

        osc.connect(g);
        g.connect(master);
        osc.start(now);
        osc.stop(now + 4.5);
      });
    } catch {
      // Audio autoplay policy
    }
  }
}

export const sacredAudio = new SacredSoundEngine();
