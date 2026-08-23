'use client';

/**
 * DHARMA.OS — SACRED AUDIO CONTROLLER
 * Pure silent UI navigation without annoying synthesized electronic beeps
 */

class SacredSoundEngine {
  private soundEnabled: boolean = true;
  private isTanpuraActive: boolean = false;
  private isOmActive: boolean = false;

  public setSoundEnabled(v: boolean) {
    this.soundEnabled = v;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public playNavChime(_vol: number = 0.05) {}
  public playTempleBell(_vol: number = 0.3) {}
  public playTripleGhanta(_vol: number = 0.5) {}
  public playShankhnaad(_vol: number = 0.5) {}
  public playSingingBowl(_vol: number = 0.3) {}
  public playFluteChime(_vol: number = 0.3) {}
  public playOmChime(_vol: number = 0.3) {}
  public playVedicTanpura(_vol: number = 0.2) {}
  public startTanpura(_vol: number = 0.2) { this.isTanpuraActive = true; }
  public stopTanpura() { this.isTanpuraActive = false; }
  public toggleTanpura() { this.isTanpuraActive = !this.isTanpuraActive; }
  public isTanpuraPlaying(): boolean { return this.isTanpuraActive; }
  public startOmAmbient(_vol: number = 0.15) { this.isOmActive = true; }
  public stopOmAmbient() { this.isOmActive = false; }
  public isOmAmbientActive(): boolean { return this.isOmActive; }

  public vibrate(ms: number = 20) {
    try {
      if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
        navigator.vibrate(ms);
      }
    } catch {}
  }

  public speakSanskritVerse(
    _verse: string, 
    _rate: any = 0.85, 
    _lang: any = 'hi-IN', 
    _pitch: any = 1.0, 
    _onEnd: any = null
  ) {
    if (typeof _onEnd === 'function') {
      try { _onEnd(); } catch {}
    }
  }

  public stopSpeaking() {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch {}
  }
}

export const sacredAudio = new SacredSoundEngine();
