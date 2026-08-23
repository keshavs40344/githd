import type { NextConfig } from 'next';

const isGithubPages = process.env.GITHUB_PAGES === 'true';

// ── Strict Content Security Policy ─────────────────────────────────
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://www.youtube.com https://s.ytimg.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com data:;
  img-src 'self' blob: data: https://*.supabase.co https://img.youtube.com https://i.ytimg.com https://lh3.googleusercontent.com https://avatars.githubusercontent.com;
  media-src 'self' blob: data: https://*.youtube.com https://*.supabase.co;
  frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://*.supabase.co;
  connect-src 'self' https://*.supabase.co https://api.groq.com https://api.elevenlabs.io https://generativelanguage.googleapis.com https://www.googleapis.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();

const securityHeaders = [
  { key: 'Content-Security-Policy', value: cspHeader },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), geolocation=(), microphone=(self), payment=(), usb=()' },
];

const nextConfig: NextConfig = {
  ...(isGithubPages ? {
    output: 'export',
    basePath: '/githd',
    images: { unoptimized: true }
  } : {}),
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: isGithubPages,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },
  ...(!isGithubPages ? {
    async headers() {
      return [
        {
          source: '/((?!_next/static|_next/image|favicon.ico).*)',
          headers: securityHeaders,
        },
      ];
    },
  } : {})
};

export default nextConfig;
