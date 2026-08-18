import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dharma.OS — Spiritual Intelligence Platform',
    short_name: 'Dharma.OS',
    description: 'GPU-accelerated, offline-first Bhagavad Gita platform with AI-powered spiritual mentorship',
    start_url: '/',
    display: 'standalone',
    background_color: '#050508',
    theme_color: '#dfa837',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
