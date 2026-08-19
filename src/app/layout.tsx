import { DM_Sans, Noto_Sans_Devanagari, Playfair_Display, Cinzel_Decorative } from 'next/font/google';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import FloatingAudioBGM from '@/components/FloatingAudioBGM';
import PWAInstallBanner from '@/components/PWAInstallBanner';

const dmSans = DM_Sans({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});
const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '700', '900'],
  display: 'swap',
});
const notoSansDevanagari = Noto_Sans_Devanagari({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['devanagari'],
  variable: '--font-devanagari',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dharma-os.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | Dharma.OS — Vedic Spiritual Intelligence',
    default: 'Dharma.OS — Vedic Spiritual Intelligence & Bhagavad Gita 700 Shlokas',
  },
  description: 'Enterprise-grade spiritual intelligence platform with complete Bhagavad Gita 700 Shlokas, Krishna AI 7-Layer Cognitive Mentor, Sacred Audio Sanctum, and Daily Sadhana Streaks.',
  keywords: [
    'Bhagavad Gita', 'Gita Shlokas', 'Krishna AI', 'Sadhana', 'Vedic Wisdom', 
    'Sanatana Dharma', 'Dharma OS', 'Sanskrit Commentary', 'Bhakti Music', 
    'Karma Yoga', 'Spiritual Intelligence'
  ],
  authors: [{ name: 'Dharma.OS Team' }],
  creator: 'Dharma.OS',
  publisher: 'Dharma.OS',
  applicationName: 'Dharma.OS',
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'Dharma.OS — Vedic Spiritual Intelligence Platform',
    description: 'Explore 700 Gita Shlokas with authentic commentaries, Krishna AI 7-Layer Cognitive Mentor & Sacred Sound Sanctum.',
    url: siteUrl,
    siteName: 'Dharma.OS',
    locale: 'hi_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dharma.OS — Vedic Spiritual Intelligence',
    description: '700 Gita Shlokas, Krishna AI Mentor & Pure Sacred Sound Sanctum.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#e8a320',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Dharma.OS',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    description: 'Vedic Spiritual Intelligence & Complete Bhagavad Gita 700 Shlokas Platform',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  return (
    <html lang="hi" className={`${dmSans.variable} ${playfair.variable} ${cinzel.variable} ${notoSansDevanagari.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-obsidian-950 text-gold-100 min-h-screen selection:bg-gold-500/30 selection:text-gold-100">
        <main className="min-h-screen">{children}</main>
        
        {/* Background Sacred Flute & Mantra Player */}
        <FloatingAudioBGM />
        
        {/* PWA 1-Click Install Banner */}
        <PWAInstallBanner />
      </body>
    </html>
  );
}
