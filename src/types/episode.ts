export type EpisodeTheme = 
  | 'Inner Conflict'
  | 'Self-Mastery'
  | 'Supreme Knowledge'
  | 'Cosmic Vision'
  | 'Devotion & Love'
  | 'Liberation';

export interface KeyShloka {
  ref: string;
  sanskrit: string;
  iast: string;
  meaning: string;
}

export interface Episode {
  id: number;
  chapter: number;
  slug: string;
  title_devanagari: string;
  title_en: string;
  subtitle: string;
  image_url: string;
  theme: EpisodeTheme;
  raga_tune: string;
  tune_freq: number;
  duration_mins: number;
  shloka_count: number;
  summary: string;
  krishna_counsel: string;
  key_shloka: KeyShloka;
  life_application: string;
  contemplation_prompt: string;
  breathwork_guidance: string;
}
