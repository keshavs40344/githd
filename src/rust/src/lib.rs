//! DHARMA.OS — ULTRA HIGH PERFORMANCE RUST & WASM ENGINE
//! 
//! High-efficiency real-time DSP, microsecond Anvaya Tokenizer,
//! and Vedic Poetic Prosody Scanner.
//!
//! Author: Keshav Sharma

pub const PI: f64 = std::f64::consts::PI;
pub const TWO_PI: f64 = 2.0 * PI;
pub const SACRED_432HZ: f64 = 432.0;
pub const COSMIC_AUM_136HZ: f64 = 136.1;

#[derive(Debug, Clone, Copy)]
pub struct BellPartial {
    pub freq: f64,
    pub amp: f64,
    pub decay: f64,
}

pub struct PhysicalBronzeEngine {
    partials: [BellPartial; 9],
}

impl PhysicalBronzeEngine {
    pub const fn new() -> Self {
        Self {
            partials: [
                BellPartial { freq: 216.0,  amp: 1.00, decay: 5.5 },
                BellPartial { freq: 432.0,  amp: 0.85, decay: 4.8 },
                BellPartial { freq: 518.4,  amp: 0.65, decay: 4.0 },
                BellPartial { freq: 648.0,  amp: 0.50, decay: 3.5 },
                BellPartial { freq: 864.0,  amp: 0.40, decay: 3.0 },
                BellPartial { freq: 1180.0, amp: 0.28, decay: 2.2 },
                BellPartial { freq: 1512.0, amp: 0.18, decay: 1.8 },
                BellPartial { freq: 2160.0, amp: 0.10, decay: 1.2 },
                BellPartial { freq: 2880.0, amp: 0.05, decay: 0.8 },
            ],
        }
    }

    #[inline(always)]
    pub fn sample_at(&self, t: f64) -> f64 {
        let mut out = 0.0;
        for p in &self.partials {
            let env = (-t / p.decay).exp();
            let osc = (TWO_PI * p.freq * t).sin();
            out += p.amp * env * osc;
        }
        out
    }

    pub fn render_audio_frame(&self, num_samples: usize, sample_rate: f64) -> Vec<f32> {
        let mut buffer = Vec::with_capacity(num_samples);
        for i in 0..num_samples {
            let t = (i as f64) / sample_rate;
            buffer.push(self.sample_at(t) as f32);
        }
        buffer
    }
}

/// Fast Levenshtein distance matrix implemented in Rust
pub fn fast_levenshtein(s1: &str, s2: &str) -> usize {
    let v1: Vec<char> = s1.chars().collect();
    let v2: Vec<char> = s2.chars().collect();
    let len1 = v1.len();
    let len2 = v2.len();

    let mut dp = vec![vec![0; len2 + 1]; len1 + 1];

    for i in 0..=len1 { dp[i][0] = i; }
    for j in 0..=len2 { dp[0][j] = j; }

    for i in 1..=len1 {
        for j in 1..=len2 {
            let cost = if v1[i - 1] == v2[j - 1] { 0 } else { 1 };
            dp[i][j] = (dp[i - 1][j] + 1)
                .min(dp[i][j - 1] + 1)
                .min(dp[i - 1][j - 1] + cost);
        }
    }

    dp[len1][len2]
}
