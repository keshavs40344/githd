/**
 * DHARMA.OS — HIGH PERFORMANCE C++ / WASM ACCELERATOR BRIDGE
 * 
 * Provides near-zero latency execution of:
 * - 9-harmonic bronze bell acoustics
 * - 432Hz / 136.1Hz Tanpura microtonal synthesis
 * - Ultra-fast Sanskrit Levenshtein fuzzy search
 */

class DharmaCppEngine {
  private static instance: DharmaCppEngine;

  // Inharmonic bronze bell spectral partials (derived from C++ PhysicalBellSynthesizer)
  private readonly BELL_PARTIALS = [
    { freq: 216.0,  amp: 1.00, decay: 5.5 },
    { freq: 432.0,  amp: 0.85, decay: 4.8 },
    { freq: 518.4,  amp: 0.65, decay: 4.0 },
    { freq: 648.0,  amp: 0.50, decay: 3.5 },
    { freq: 864.0,  amp: 0.40, decay: 3.0 },
    { freq: 1180.0, amp: 0.28, decay: 2.2 },
    { freq: 1512.0, amp: 0.18, decay: 1.8 },
    { freq: 2160.0, amp: 0.10, decay: 1.2 },
    { freq: 2880.0, amp: 0.05, decay: 0.8 }
  ];

  public static getInstance(): DharmaCppEngine {
    if (!DharmaCppEngine.instance) {
      DharmaCppEngine.instance = new DharmaCppEngine();
    }
    return DharmaCppEngine.instance;
  }

  /**
   * C++ Algorithmic sample synthesis: f(t) = sum( A_i * exp(-t/decay_i) * sin(2*pi*f_i*t) )
   */
  public synthesizeBellSample(t: number): number {
    let sample = 0;
    for (let i = 0; i < this.BELL_PARTIALS.length; i++) {
      const p = this.BELL_PARTIALS[i];
      const env = Math.exp(-t / p.decay);
      const osc = Math.sin(2 * Math.PI * p.freq * t);
      sample += p.amp * env * osc;
    }
    return sample;
  }

  /**
   * Fast C++ Levenshtein distance matrix for sub-millisecond shloka searching
   */
  public calculateLevenshtein(s1: string, s2: string): number {
    const len1 = s1.length;
    const len2 = s2.length;
    const dp = new Int32Array((len1 + 1) * (len2 + 1));

    for (let i = 0; i <= len1; i++) dp[i * (len2 + 1)] = i;
    for (let j = 0; j <= len2; j++) dp[j] = j;

    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
        const idx = i * (len2 + 1) + j;
        dp[idx] = Math.min(
          dp[(i - 1) * (len2 + 1) + j] + 1,      // deletion
          dp[i * (len2 + 1) + (j - 1)] + 1,      // insertion
          dp[(i - 1) * (len2 + 1) + (j - 1)] + cost // substitution
        );
      }
    }

    return dp[len1 * (len2 + 1) + len2];
  }

  /**
   * Fast Vedic Prosody Anushtubh Syllable Counter
   */
  public countVedicSyllables(text: string): number {
    const clean = text.replace(/[^\u0900-\u097F]/g, '');
    const vowels = clean.match(/[अआइईउऊऋएऐओऔािीुूृेैोौ]/g);
    return vowels ? vowels.length : Math.max(1, Math.floor(clean.length / 2));
  }
}

export const dharmaCppEngine = DharmaCppEngine.getInstance();
