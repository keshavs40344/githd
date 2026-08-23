import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dharma.OS — Vedic Spiritual Intelligence',
    short_name: 'Dharma.OS',
    description: 'Bhagavad Gita 700 Shlokas, Krishna AI Cognitive Mentor & Sacred Sound Sanctum',
    start_url: '/',
    display: 'standalone',
    background_color: '#030305',
    theme_color: '#e8a320',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
    ],
    categories: ['education', 'lifestyle', 'spirituality', 'music'],
    lang: 'hi',
    orientation: 'portrait',
  };
}
