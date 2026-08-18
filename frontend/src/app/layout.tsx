import { Inter, Noto_Sans_Devanagari } from 'next/font/google';
import './globals.css';
import type { Metadata, Viewport } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const notoSansDevanagari = Noto_Sans_Devanagari({
  weight: ['400', '700'],
  subsets: ['devanagari'],
  variable: '--font-devanagari',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Dharma.OS',
    default: 'Dharma.OS',
  },
  description: 'GPU-accelerated spiritual intelligence & Bhagavad Gita platform',
  openGraph: {
    title: 'Dharma.OS',
    description: 'GPU-accelerated spiritual intelligence & Bhagavad Gita platform',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#050508',
};

import FloatingAudioBGM from '@/components/FloatingAudioBGM';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansDevanagari.variable}`}>
      <body className="bg-obsidian-950 text-gold-100 min-h-screen">
        <main className="min-h-screen">{children}</main>
        <FloatingAudioBGM />
      </body>
    </html>
  );
}

