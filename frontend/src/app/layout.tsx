import { DM_Sans, Noto_Sans_Devanagari, Playfair_Display, Cinzel_Decorative } from 'next/font/google';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import PWAInstallBanner from '@/components/PWAInstallBanner';
import { LanguageProvider } from '@/context/LanguageContext';
import { GlobalAudioProvider } from '@/context/GlobalAudioContext';
import GlobalAudioDock from '@/components/GlobalAudioDock';
import EnterpriseSearchModal from '@/components/EnterpriseSearchModal';
import SanskritLexiconDrawer from '@/components/SanskritLexiconDrawer';
import ShlokaCardGeneratorModal from '@/components/ShlokaCardGeneratorModal';
import GlobalRoyalHeader from '@/components/GlobalRoyalHeader';
import TempleEntryGate from '@/components/TempleEntryGate';
import TempleAmbientPlayer from '@/components/TempleAmbientPlayer';
import TempleAtmosphere from '@/components/TempleAtmosphere';
import GlobalRoyalFooter from '@/components/GlobalRoyalFooter';

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://githd.vercel.app';

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
};

export const viewport: Viewport = {
  themeColor: '#090a0f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className={`${dmSans.variable} ${playfair.variable} ${cinzel.variable} ${notoSansDevanagari.variable} dark`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="bg-[#090a0f] text-[#f5eed9] min-h-screen selection:bg-amber-500/30 selection:text-white flex flex-col justify-between">
        <LanguageProvider>
          <GlobalAudioProvider>
            
            {/* Global Royal Header Sticky Nav */}
            <GlobalRoyalHeader />

            <main className="flex-1">{children}</main>
            
            {/* Global Royal Footer */}
            <GlobalRoyalFooter />

            {/* Global Persistent Floating Audio Dock */}
            <GlobalAudioDock />

            {/* Enterprise Crisis & Semantic Search Modal (Ctrl+K) */}
            <EnterpriseSearchModal />

            {/* Sanskrit Lexicon & Grammar Breakdown Sheet */}
            <SanskritLexiconDrawer />

            {/* HD Wallpaper & Social Quote Card Generator */}
            <ShlokaCardGeneratorModal />
            
            {/* PWA 1-Click Install Banner */}
            <PWAInstallBanner />
          </GlobalAudioProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
