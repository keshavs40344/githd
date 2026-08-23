'use client';

import { vedicVoiceDsp } from '@/lib/cppVedicAudioDsp';

/**
 * DHARMA.OS — SACRED SOUND & ACOUSTIC SYNTHESIS ENGINE (C++23 DSP ACCELERATED)
 * 
 * Features:
 * - Ultra-Natural Speech Synthesis with C++ Vedic Formant & 432Hz Resonance
 * - 9-Harmonic Bronze Temple Bell physical simulation
 * - 432Hz Tanpura & 136.1Hz Cosmic Om continuous drone
 * - Shankhnaad, singing bowls, and bansuri flute harmonic chimes
 */

class SacredSoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private cachedVoices: SpeechSynthesisVoice[] = [];
  private tanpuraNodes: { osc1: OscillatorNode; osc2: OscillatorNode; osc3: OscillatorNode; gain: GainNode } | null = null;
  private omAmbientGain: GainNode | null = null;
  private omNodes: OscillatorNode[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      window.speechSynthesis.onvoiceschanged = () => this.initVoices();
    }
  }

  private initVoices() {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        this.cachedVoices = window.speechSynthesis.getVoices();
      }
    } catch {}
  }

  private getCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
          vedicVoiceDsp.init(this.ctx);
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

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  // ── NATURAL DIVINE SPEECH SYNTHESIS ───────────────────────────────────────
  public getBestDivineVoice(): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = this.cachedVoices.length > 0 ? this.cachedVoices : window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // 1. Preferred Hindi / Sanskrit natural deep voices
    const naturalHindi = voices.find(v => 
      (v.lang.startsWith('hi') || v.lang.startsWith('sa')) && 
      (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Online') || v.name.includes('Neural'))
    );
    if (naturalHindi) return naturalHindi;

    // 2. Any Hindi / Indian English rich voice
    const anyIndian = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN') || v.lang.includes('sa'));
    if (anyIndian) return anyIndian;

    // 3. Fallback to Google / Natural English
    const naturalEnglish = voices.find(v => 
      v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Google')
    );
    return naturalEnglish || voices[0] || null;
  }

  /**
   * Speaks with Lord Krishna's Divine, Warm & Resonant Timbre
   */
  public speakWithKrishnaDivineVoice(text: string, onEnd?: () => void) {
    if (!this.soundEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const ctx = this.getCtx();
      if (ctx) {
        vedicVoiceDsp.startHarmonicChantBed(ctx, 0.05);
      }

      const utterance = new SpeechSynthesisUtterance(text);
      const voice = this.getBestDivineVoice();
      if (voice) utterance.voice = voice;

      // Divine acoustic calibration: deep, calm, measured
      utterance.pitch = 0.92;
      utterance.rate = 0.88;
      utterance.volume = 1.0;

      utterance.onend = () => {
        vedicVoiceDsp.stopHarmonicChantBed();
        onEnd?.();
      };
      utterance.onerror = () => {
        vedicVoiceDsp.stopHarmonicChantBed();
        onEnd?.();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      onEnd?.();
    }
  }

  /**
   * Speaks Sanskrit Shlokas with authentic Vedic meter & resonance
   */
  public speakSanskritVerse(
    sanskritText: string,
    rateOrOnEnd?: number | (() => void),
    lang = 'hi-IN',
    pitch = 0.95,
    onEndCallback?: () => void
  ) {
    let rate = 0.82;
    let onEnd: (() => void) | undefined = undefined;

    if (typeof rateOrOnEnd === 'function') {
      onEnd = rateOrOnEnd;
    } else if (typeof rateOrOnEnd === 'number') {
      rate = rateOrOnEnd;
      onEnd = onEndCallback;
    }

    if (!this.soundEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const ctx = this.getCtx();
      if (ctx) {
        vedicVoiceDsp.startHarmonicChantBed(ctx, 0.07);
        this.playTempleBell(0.18);
      }

      const utterance = new SpeechSynthesisUtterance(sanskritText);
      const voice = this.getBestDivineVoice();
      if (voice) utterance.voice = voice;
      if (lang) utterance.lang = lang;

      utterance.pitch = pitch || 0.95;
      utterance.rate = rate || 0.82;
      utterance.volume = 1.0;

      utterance.onend = () => {
        vedicVoiceDsp.stopHarmonicChantBed();
        onEnd?.();
      };
      utterance.onerror = () => {
        vedicVoiceDsp.stopHarmonicChantBed();
        onEnd?.();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      onEnd?.();
    }
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        vedicVoiceDsp.stopHarmonicChantBed();
      } catch {}
    }
  }

  // ── 9-HARMONIC BRONZE TEMPLE BELL ─────────────────────────────────────────
  public playTempleBell(volume = 0.25) {
    const ctx = this.getCtx();
    if (!ctx || !this.soundEnabled) return;

    try {
      const now = ctx.currentTime;
      const fundamental = 576; // D5 Sacred Bell Tone
      const partials = [
        { ratio: 0.5, gain: 0.6, decay: 4.5 },   // Hum note
        { ratio: 1.0, gain: 1.0, decay: 4.0 },   // Fundamental
        { ratio: 1.2, gain: 0.8, decay: 3.5 },   // Tierce
        { ratio: 1.5, gain: 0.7, decay: 3.0 },   // Quint
        { ratio: 2.0, gain: 0.5, decay: 2.5 },   // Nominal
        { ratio: 2.7, gain: 0.4, decay: 2.0 },   // Superquint
        { ratio: 3.4, gain: 0.3, decay: 1.5 },   // Octave nominal
        { ratio: 4.2, gain: 0.2, decay: 1.0 },   // High metallic
      ];

      partials.forEach(p => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(fundamental * p.ratio, now);

        gain.gain.setValueAtTime(p.gain * volume, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + p.decay);
      });
    } catch {}
  }

  // ── SHANKHNAAD (DIVINE CONCH SOUND) ───────────────────────────────────────
  public playShankhnaad(volume = 0.3) {
    const ctx = this.getCtx();
    if (!ctx || !this.soundEnabled) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 1.2);
      osc.frequency.exponentialRampToValueAtTime(330, now + 3.0);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 400;
      filter.Q.value = 3.0;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 3.6);
    } catch {}
  }

  // ── 432HZ SACRED TANPURA DRONE ────────────────────────────────────────────
  public startTanpura(volume = 0.12) {
    const ctx = this.getCtx();
    if (!ctx || !this.soundEnabled || this.tanpuraNodes) return;

    try {
      const now = ctx.currentTime;
      const rootFreq = 216; // A3 in 432Hz tuning
      const paFreq = rootFreq * 1.5; // Pa (E4) 324Hz
      const saHigh = rootFreq * 2; // Sa high 432Hz

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const osc3 = ctx.createOscillator();
      const masterGain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(paFreq, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(saHigh, now);

      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(rootFreq, now);

      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.exponentialRampToValueAtTime(volume, now + 2.0);

      osc1.connect(masterGain);
      osc2.connect(masterGain);
      osc3.connect(masterGain);
      masterGain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);

      this.tanpuraNodes = { osc1, osc2, osc3, gain: masterGain };
    } catch {}
  }

  public stopTanpura() {
    if (!this.tanpuraNodes || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      this.tanpuraNodes.gain.gain.linearRampToValueAtTime(0.0001, now + 1.0);
      setTimeout(() => {
        this.tanpuraNodes?.osc1.stop();
        this.tanpuraNodes?.osc2.stop();
        this.tanpuraNodes?.osc3.stop();
        this.tanpuraNodes = null;
      }, 1050);
    } catch {
      this.tanpuraNodes = null;
    }
  }

  // ── 136.1HZ COSMIC OM AMBIENT ─────────────────────────────────────────────
  public startOmAmbient(volume = 0.08) {
    const ctx = this.getCtx();
    if (!ctx || !this.soundEnabled || this.omAmbientGain) return;

    try {
      const now = ctx.currentTime;
      const omFreq = 136.1; // Cosmic Earth Year OM Frequency
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(omFreq, now);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(omFreq * 2, now); // 272.2 Hz Octave harmonic

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 2.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);

      this.omNodes = [osc1, osc2];
      this.omAmbientGain = gain;
    } catch {}
  }

  public stopOmAmbient() {
    if (!this.omAmbientGain || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      this.omAmbientGain.gain.linearRampToValueAtTime(0.0001, now + 1.0);
      setTimeout(() => {
        this.omNodes.forEach(n => n.stop());
        this.omNodes = [];
        this.omAmbientGain = null;
      }, 1050);
    } catch {
      this.omNodes = [];
      this.omAmbientGain = null;
    }
  }

  // ── UI NAV CHIMES ─────────────────────────────────────────────────────────
  
  // ── SINGING BOWL (TIBETAN / VEDIC HEALING BOWL) ───────────────────────────
  public playSingingBowl(volume = 0.25) {
    const ctx = this.getCtx();
    if (!ctx || !this.soundEnabled) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, now); // Pure 432Hz Healing Frequency
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 4.6);
    } catch {}
  }

  // ── BANSURI FLUTE HARMONIC CHIME ─────────────────────────────────────────
  public playFluteChime(volume = 0.25) {
    this.playBansuriFlute(volume);
  }

  public playBansuriFlute(volume = 0.2) {
    const ctx = this.getCtx();
    if (!ctx || !this.soundEnabled) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(648, now); // E5 Bansuri Raga Tone
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 2.6);
    } catch {}
  }

  public playNavChime(volume = 0.08) {
    const ctx = this.getCtx();
    if (!ctx || !this.soundEnabled) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(864, now); // Harmonic chime
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);
    } catch {}
  }

  public playOmChime(volume = 0.28) {
    const ctx = this.getCtx();
    if (!ctx || !this.soundEnabled) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(136.1, now); // 136.1Hz Om Cosmic Frequency
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.0);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 5.1);
    } catch {}
  }

  public playTripleGhanta(volume = 0.35) {
    this.playTempleBell(volume);
    setTimeout(() => this.playTempleBell(volume * 0.9), 350);
    setTimeout(() => this.playTempleBell(volume * 0.8), 700);
  }

  public vibrate(ms = 25) {
    if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
      try {
        navigator.vibrate(ms);
      } catch {}
    }
  }
}

export const sacredAudio = new SacredSoundEngine();
