export const APP_NAME = 'Dharma.OS';
export const APP_DESCRIPTION = 'GPU-accelerated spiritual intelligence & Bhagavad Gita platform';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const PLAYBACK_SPEEDS = [0.75, 1.0, 1.25] as const;
export type PlaybackSpeed = typeof PLAYBACK_SPEEDS[number];

export const GUNA_COLORS = {
  Sattva: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/25' },
  Rajas: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30', glow: 'shadow-orange-500/25' },
  Tamas: { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30', glow: 'shadow-slate-500/25' },
} as const;

export const TOTAL_CHAPTERS = 18;
export const VERSES_PER_CHAPTER = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78] as const;
