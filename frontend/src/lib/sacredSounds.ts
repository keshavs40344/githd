'use client';

/**
 * DHARMA.OS — SACRED TEMPLE SOUND ENGINE
 * Real mandir ghanta, Om chanting, Shankhnaad, Tanpura, Singing bowl
 * Pure Zero-Dependency Web Audio API Engine
 */

class SacredSoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private tanpuraNodes: { osc1: OscillatorNode; osc2: OscillatorNode; osc3: OscillatorNode; gain: GainNode } | null = null;
  private omAmbientGain: GainNode | null = null;
  private omNodes: any[] = [];

  private getCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  public setSoundEnabled(v: boolean) {
    this.soundEnabled = v;
    if (!v) { 
      this.stopTanpura(); 
      this.stopSpeaking(); 
      this.stopOmAmbient(); 
    }
  }

  public vibrate(p: number | number[]) {
    try { 
      if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
        navigator.vibrate(p); 
      }
    } catch {}
  }

  /**
   * 🔔 AUTHENTIC BRONZE TEMPLE GHANTA (मंदिर घंटा)
   */
  public playTempleBell(volume = 0.55) {
    if (!this.soundEnabled) return;
    this.vibrate([40, 20, 50]);
    try {
      const ctx = this.getCtx();
      if (!ctx) return;
      
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(volume, now);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

      const BELL_PARTIALS = [
        { freq: 216,  amp: 1.0,  decay: 5.5 },
        { freq: 432,  amp: 0.85, decay: 4.8 },
        { freq: 518,  amp: 0.65, decay: 4.0 },
        { freq: 648,  amp: 0.50, decay: 3.5 },
        { freq: 864,  amp: 0.40, decay: 3.0 },
        { freq: 1180, amp: 0.28, decay: 2.2 },
        { freq: 1512, amp: 0.18, decay: 1.8 },
        { freq: 2160, amp: 0.10, decay: 1.2 },
        { freq: 2880, amp: 0.05, decay: 0.8 },
      ];

      const clapper = ctx.createOscillator();
      const clapperGain = ctx.createGain();
      clapper.type = 'triangle';
      clapper.frequency.setValueAtTime(1400, now);
      clapper.frequency.exponentialRampToValueAtTime(300, now + 0.035);
      clapperGain.gain.setValueAtTime(volume * 1.2, now);
      clapperGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      clapper.connect(clapperGain);
      clapperGain.connect(master);
      clapper.start(now);
      clapper.stop(now + 0.05);

      BELL_PARTIALS.forEach(p => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(p.freq, now);
        osc.detune.setValueAtTime((Math.random() - 0.5) * 6, now);
        g.gain.setValueAtTime(p.amp * volume, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);
        osc.connect(g);
        g.connect(master);
        osc.start(now);
        osc.stop(now + p.decay + 0.1);
      });

      const delay = ctx.createDelay(0.4);
      const delayGain = ctx.createGain();
      delay.delayTime.setValueAtTime(0.065, now);
      delayGain.gain.setValueAtTime(0.18, now);
      delayGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.0);
      master.connect(delay);
      delay.connect(delayGain);
      delayGain.connect(ctx.destination);

    } catch (e) {
      console.warn('Temple bell audio:', e);
    }
  }

  public playTripleGhanta(volume = 0.65) {
    this.playTempleBell(volume);
    setTimeout(() => this.playTempleBell(volume * 0.8), 350);
    setTimeout(() => this.playTempleBell(volume * 0.6), 700);
    this.vibrate([60, 30, 60, 30, 80]);
  }

  public playGhantaDwani(volume = 0.6) {
    this.playTempleBell(volume);
    setTimeout(() => this.playTempleBell(volume * 0.65), 300);
  }

  /**
   * 🥣 TIBETAN SINGING BOWL
   */
  public playSingingBowl(volume = 0.35) {
    if (!this.soundEnabled) return;
    this.vibrate([25, 60, 25]);
    try {
      const ctx = this.getCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(0.001, now);
      master.gain.exponentialRampToValueAtTime(volume, now + 0.12);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 5.0);
      [432, 864, 1296, 1728].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        g.gain.setValueAtTime(1 / (idx + 1), now);
        osc.connect(g); g.connect(master);
        osc.start(now); osc.stop(now + 5.0);
      });
    } catch {}
  }

  /**
   * 🐚 SACRED SHANKHNAAD (शंखनाद)
   */
  public playShankhnaad(volume = 0.45) {
    if (!this.soundEnabled) return;
    this.vibrate([60, 40, 90]);
    try {
      const ctx = this.getCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const dur = 3.2;

      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(0.001, now);
      master.gain.exponentialRampToValueAtTime(volume, now + 0.4);
      master.gain.setValueAtTime(volume * 0.9, now + 2.2);
      master.gain.exponentialRampToValueAtTime(0.001, now + dur);

      [220, 440, 660, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = i === 0 ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.12, now + 0.6);
        osc.frequency.setValueAtTime(freq * 1.10, now + 1.8);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.92, now + dur);
        g.gain.setValueAtTime(1 / (i + 1), now);
        osc.connect(g);
        g.connect(master);
        osc.start(now);
        osc.stop(now + dur);
      });
    } catch {}
  }

  /**
   * 🕉️ OM RESONANCE
   */
  public playOmResonance(volume = 0.4) {
    if (!this.soundEnabled) return;
    this.vibrate([80, 50, 100]);
    try {
      const ctx = this.getCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const dur = 5.0;
      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(0.001, now);
      master.gain.exponentialRampToValueAtTime(volume, now + 0.8);
      master.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      [136.1, 272.2, 408.3, 544.4].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = i === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(f, now);
        g.gain.setValueAtTime(1 / (i + 1), now);
        osc.connect(g); g.connect(master);
        osc.start(now); osc.stop(now + dur);
      });
    } catch {}
  }

  public playOmChime(volume = 0.3) {
    this.playOmResonance(volume);
  }

  /**
   * 🕉️ 136.1 Hz OM AMBIENT MEDITATION DRONE
   */
  public startOmAmbient(volume = 0.05) {
    if (!this.soundEnabled) return;
    this.stopOmAmbient();
    try {
      const ctx = this.getCtx();
      if (!ctx) return;
      const now = ctx.currentTime;

      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(0.001, now);
      master.gain.exponentialRampToValueAtTime(volume, now + 2.0);
      this.omAmbientGain = master;

      const OM_FREQS = [
        { f: 136.1, type: 'sine' as OscillatorType, amp: 1.0 },
        { f: 204.1, type: 'sine' as OscillatorType, amp: 0.45 },
        { f: 272.2, type: 'triangle' as OscillatorType, amp: 0.3 },
      ];

      OM_FREQS.forEach(({ f, type, amp }) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(f, now);
        g.gain.setValueAtTime(amp, now);
        osc.connect(g);
        g.connect(master);
        osc.start(now);
        this.omNodes.push(osc);
      });
    } catch {}
  }

  public stopOmAmbient() {
    if (this.omAmbientGain) {
      try {
        const ctx = this.getCtx();
        if (ctx) {
          this.omAmbientGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.0);
        }
        setTimeout(() => {
          this.omNodes.forEach(n => { try { n.stop(); } catch {} });
          this.omNodes = [];
          this.omAmbientGain = null;
        }, 1100);
      } catch {}
    }
  }

  /**
   * 🪕 TANPURA DRONE
   */
  public startTanpura(volume = 0.06) {
    if (!this.soundEnabled) return;
    this.stopTanpura();
    try {
      const ctx = this.getCtx();
      if (!ctx) return;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 1.2);
      gain.connect(ctx.destination);

      const osc1 = ctx.createOscillator(); osc1.type = 'sawtooth'; osc1.frequency.setValueAtTime(136.1, ctx.currentTime);
      const osc2 = ctx.createOscillator(); osc2.type = 'sine';     osc2.frequency.setValueAtTime(204.1, ctx.currentTime);
      const osc3 = ctx.createOscillator(); osc3.type = 'triangle'; osc3.frequency.setValueAtTime(272.2, ctx.currentTime);

      const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.setValueAtTime(450, ctx.currentTime);
      osc1.connect(filter); osc2.connect(filter); osc3.connect(filter); filter.connect(gain);
      osc1.start(); osc2.start(); osc3.start();
      this.tanpuraNodes = { osc1, osc2, osc3, gain };
    } catch {}
  }

  public stopTanpura() {
    if (this.tanpuraNodes) {
      try {
        const ctx = this.getCtx();
        if (ctx) this.tanpuraNodes.gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
        setTimeout(() => {
          this.tanpuraNodes?.osc1.stop();
          this.tanpuraNodes?.osc2.stop();
          this.tanpuraNodes?.osc3.stop();
          this.tanpuraNodes = null;
        }, 450);
      } catch { this.tanpuraNodes = null; }
    }
  }

  public playNavChime(volume = 0.08) {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const gain = ctx.createGain();
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1046.5, now);
      osc.frequency.exponentialRampToValueAtTime(1318.5, now + 0.12);
      osc.connect(gain); osc.start(now); osc.stop(now + 0.22);
    } catch {}
  }

  public playFluteChime(volume = 0.25) {
    if (!this.soundEnabled) return;
    this.vibrate(20);
    try {
      const ctx = this.getCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const gain = ctx.createGain();
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.25);
      osc.frequency.setValueAtTime(880.0, now + 0.7);
      osc.connect(gain); osc.start(now); osc.stop(now + 1.5);
    } catch {}
  }

  public speakSanskritVerse(text: string, rate = 0.85, lang = 'hi-IN', onStart?: () => void, onEnd?: () => void, onBoundary?: (i: number) => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) { onEnd?.(); return; }
    try {
      window.speechSynthesis.cancel();
      const clean = text.replace(/[।|॥]/g, ', ').replace(/[\n\r]+/g, ' ').trim();
      const utt = new SpeechSynthesisUtterance(clean);
      utt.rate = rate; utt.pitch = 0.95; utt.lang = lang;
      const voices = window.speechSynthesis.getVoices();
      const v = voices.find(v => (v.lang.includes('hi') || v.lang.includes('IN')) && (v.name.includes('Google') || v.name.includes('Natural'))) || voices.find(v => v.lang.includes('hi') || v.lang.includes('IN'));
      if (v) utt.voice = v;
      utt.onstart = () => { this.vibrate([30, 20, 30]); onStart?.(); };
      utt.onend = () => { onEnd?.(); };
      utt.onerror = () => { onEnd?.(); };
      if (onBoundary) utt.onboundary = e => { this.vibrate(12); onBoundary(e.charIndex); };
      window.speechSynthesis.speak(utt);
    } catch { onEnd?.(); }
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    this.stopTanpura();
  }
}

export const sacredAudio = new SacredSoundEngine();
