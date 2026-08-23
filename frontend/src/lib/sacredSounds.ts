'use client';

/**
 * DHARMA.OS — ULTRA TEMPLE SOUND ENGINE
 * Real mandir ghanta, Om chanting, Shankhnaad, Tanpura
 * Pure Web Audio API — Zero dependency, always works
 */

class SacredSoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private tanpuraNodes: { osc1: OscillatorNode; osc2: OscillatorNode; osc3: OscillatorNode; gain: GainNode } | null = null;
  private omAmbientGain: GainNode | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  private getCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx?.state === 'suspended') this.ctx.resume();
    return this.ctx;
  }

  public setSoundEnabled(v: boolean) {
    this.soundEnabled = v;
    if (!v) { this.stopTanpura(); this.stopSpeaking(); this.stopOmAmbient(); }
  }

  public vibrate(p: number | number[]) {
    try { if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(p); } catch {}
  }

  // ── ULTRA REAL MANDIR GHANTA (Temple Bell) ─────────────────────────────────
  // Synthesizes a real bronze temple bell with:
  // - Inharmonic partials (how real bells actually sound)
  // - Sharp attack transient
  // - Long bronze resonance (5+ seconds)
  // - Natural decay curve
  public playTempleBell(volume = 0.5) {
    if (!this.soundEnabled) return;
    this.vibrate([60, 30, 80]);
    try {
      const ctx = this.getCtx();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Master gain + reverb-like delay
      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(volume, now);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 6.0);

      // Real temple bell inharmonic partials (ratios from physical bell acoustics)
      // A real struck bell has INHARMONIC overtones — not integer multiples
      const BELL_PARTIALS = [
        { freq: 220,  amp: 1.0,  decay: 6.0 },  // Fundamental (Hum)
        { freq: 440,  amp: 0.7,  decay: 5.0 },  // 2nd (Tierce)
        { freq: 660,  amp: 0.5,  decay: 4.0 },  // 3rd (Quint)
        { freq: 880,  amp: 0.4,  decay: 3.0 },  // 4th
        { freq: 1155, amp: 0.3,  decay: 2.5 },  // Inharmonic (Nominal)
        { freq: 1540, amp: 0.2,  decay: 2.0 },  // Superquint
        { freq: 2080, amp: 0.12, decay: 1.5 },  // Octave Nominal
        { freq: 2640, amp: 0.07, decay: 1.2 },  // Upper partial
        { freq: 3300, amp: 0.04, decay: 0.8 },  // High partial
      ];

      // Sharp attack transient (the "clang" of metal hitting metal)
      const transient = ctx.createOscillator();
      const tGain = ctx.createGain();
      transient.type = 'square';
      transient.frequency.setValueAtTime(1200, now);
      transient.frequency.exponentialRampToValueAtTime(400, now + 0.04);
      tGain.gain.setValueAtTime(volume * 1.5, now);
      tGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      transient.connect(tGain);
      tGain.connect(master);
      transient.start(now);
      transient.stop(now + 0.06);

      // Bronze resonance partials
      BELL_PARTIALS.forEach(p => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(p.freq, now);
        // Slight detuning makes it sound more real (real bells aren't perfect)
        osc.detune.setValueAtTime((Math.random() - 0.5) * 4, now);
        g.gain.setValueAtTime(p.amp * volume, now + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);
        osc.connect(g);
        g.connect(master);
        osc.start(now);
        osc.stop(now + p.decay + 0.1);
      });

      // Reverb simulation — delayed echo
      const delay = ctx.createDelay(0.5);
      const delayGain = ctx.createGain();
      delay.delayTime.setValueAtTime(0.08, now);
      delayGain.gain.setValueAtTime(0.15, now);
      delayGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.0);
      master.connect(delay);
      delay.connect(delayGain);
      delayGain.connect(ctx.destination);

    } catch(e) { console.warn('Bell error:', e); }
  }

  // Rapid double-strike (Ghanta dhwani)
  public playGhantaDwani(volume = 0.6) {
    this.playTempleBell(volume);
    setTimeout(() => this.playTempleBell(volume * 0.6), 300);
  }

  // Triple Ghanta (used at temple entry/aarti)
  public playTripleGhanta(volume = 0.7) {
    this.playTempleBell(volume);
    setTimeout(() => this.playTempleBell(volume * 0.8), 400);
    setTimeout(() => this.playTempleBell(volume * 0.65), 750);
    this.vibrate([80, 50, 80, 50, 100]);
  }

  // ── SHANKHNAAD ────────────────────────────────────────────────────────────
  public playShankhnaad(volume = 0.5) {
    if (!this.soundEnabled) return;
    this.vibrate([80, 40, 100]);
    try {
      const ctx = this.getCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const dur = 3.5;

      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(0.001, now);
      master.gain.exponentialRampToValueAtTime(volume, now + 0.3);
      master.gain.setValueAtTime(volume * 0.95, now + 2.5);
      master.gain.exponentialRampToValueAtTime(0.001, now + dur);

      // Conch shell resonance
      [180, 360, 540, 810].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = i === 0 ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.15, now + 0.8);
        osc.frequency.setValueAtTime(freq * 1.12, now + 2.0);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.9, now + dur);
        g.gain.setValueAtTime(1 / (i + 1), now);
        osc.connect(g);
        g.connect(master);
        osc.start(now);
        osc.stop(now + dur);
      });

      // Air noise for conch texture
      const bufSize = ctx.sampleRate * dur;
      const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.06;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const nFilter = ctx.createBiquadFilter();
      nFilter.type = 'bandpass';
      nFilter.frequency.setValueAtTime(600, now);
      nFilter.Q.setValueAtTime(2, now);
      noise.connect(nFilter);
      nFilter.connect(master);
      noise.start(now);
    } catch {}
  }

  // ── OM AMBIENT (Continuous background chanting) ──────────────────────────
  private omNodes: any[] = [];

  public startOmAmbient(volume = 0.06) {
    if (!this.soundEnabled) return;
    this.stopOmAmbient();
    try {
      const ctx = this.getCtx();
      if (!ctx) return;
      const now = ctx.currentTime;

      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(0.001, now);
      master.gain.exponentialRampToValueAtTime(volume, now + 3.0);
      this.omAmbientGain = master;

      // Om = A-U-M harmonics
      const OM_FREQS = [
        { f: 136.1, type: 'sine' as OscillatorType, amp: 1.0 },      // Sa (root)
        { f: 204.1, type: 'sine' as OscillatorType, amp: 0.5 },      // Pa
        { f: 272.2, type: 'triangle' as OscillatorType, amp: 0.35 }, // Sa (octave)
        { f: 340.3, type: 'sine' as OscillatorType, amp: 0.2 },      // Ma
        { f: 408.3, type: 'sine' as OscillatorType, amp: 0.15 },     // Pa (upper)
      ];

      OM_FREQS.forEach(({ f, type, amp }) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        // Gentle vibrato
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.3 + Math.random() * 0.2, now);
        lfoGain.gain.setValueAtTime(0.8, now);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        osc.type = type;
        osc.frequency.setValueAtTime(f, now);
        g.gain.setValueAtTime(amp, now);
        osc.connect(g);
        g.connect(master);

        osc.start(now);
        lfo.start(now);
        this.omNodes.push(osc, lfo);
      });
    } catch {}
  }

  public stopOmAmbient() {
    if (this.omAmbientGain) {
      try {
        const ctx = this.getCtx();
        if (ctx) this.omAmbientGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);
        setTimeout(() => {
          this.omNodes.forEach(n => { try { n.stop(); } catch {} });
          this.omNodes = [];
          this.omAmbientGain = null;
        }, 1600);
      } catch {}
    }
  }

  // ── TANPURA DRONE ─────────────────────────────────────────────────────────
  public startTanpura(volume = 0.08) {
    if (!this.soundEnabled) return;
    this.stopTanpura();
    try {
      const ctx = this.getCtx();
      if (!ctx) return;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 1.5);
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
        if (ctx) this.tanpuraNodes.gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        setTimeout(() => {
          this.tanpuraNodes?.osc1.stop();
          this.tanpuraNodes?.osc2.stop();
          this.tanpuraNodes?.osc3.stop();
          this.tanpuraNodes = null;
        }, 500);
      } catch { this.tanpuraNodes = null; }
    }
  }

  // ── SINGING BOWL ─────────────────────────────────────────────────────────
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

  // ── OM RESONANCE ─────────────────────────────────────────────────────────
  public playOmResonance(volume = 0.4) {
    if (!this.soundEnabled) return;
    this.vibrate([80, 50, 100]);
    try {
      const ctx = this.getCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.setValueAtTime(0.001, now);
      master.gain.exponentialRampToValueAtTime(volume, now + 0.8);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 5.0);
      [136.1, 272.2, 408.3, 544.4].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = i === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(f, now);
        g.gain.setValueAtTime(1 / (i + 1), now);
        osc.connect(g); g.connect(master);
        osc.start(now); osc.stop(now + 5.0);
      });
    } catch {}
  }

  public playOmChime(volume = 0.3) { this.playOmResonance(volume); }

  // ── NAV CHIME ─────────────────────────────────────────────────────────────
  public playNavChime(volume = 0.08) {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const gain = ctx.createGain();
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1046.5, now);
      osc.frequency.exponentialRampToValueAtTime(1318.5, now + 0.15);
      osc.connect(gain); osc.start(now); osc.stop(now + 0.3);
    } catch {}
  }

  // ── FLUTE CHIME ──────────────────────────────────────────────────────────
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
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.3);
      osc.frequency.setValueAtTime(880.0, now + 0.8);
      osc.connect(gain); osc.start(now); osc.stop(now + 1.8);
    } catch {}
  }

  // ── SPEECH ───────────────────────────────────────────────────────────────
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
      utt.onstart = () => { this.vibrate([40, 20, 40]); onStart?.(); };
      utt.onend = () => { onEnd?.(); };
      utt.onerror = () => { onEnd?.(); };
      if (onBoundary) utt.onboundary = e => { this.vibrate(15); onBoundary(e.charIndex); };
      this.currentUtterance = utt;
      window.speechSynthesis.speak(utt);
    } catch { onEnd?.(); }
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    this.stopTanpura();
  }
}

export const sacredAudio = new SacredSoundEngine();
