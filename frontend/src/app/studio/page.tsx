import React from 'react';
import KrishnaImageStudio from '@/components/KrishnaImageStudio';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'AI Krishna Sacred Art & Wallpaper Studio • Dharma.OS',
  description: 'Generate, customize, and export high-definition sacred wallpapers, Krishna Leela portraits, and Shloka art.',
};

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-obsidian-950 text-gold-100 flex flex-col relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-amber-700/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Nav Header */}
      <header className="w-full border-b border-gold-500/20 bg-obsidian-900/80 backdrop-blur-2xl px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-2xl">
        <div className="flex items-center gap-3">
          <Link 
            href="/" 
            className="p-2 rounded-xl bg-obsidian-800 border border-gold-500/20 text-gold-300 hover:text-gold-100 hover:border-gold-400/50 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center text-obsidian-950 font-bold shadow-[0_0_15px_rgba(223,168,55,0.4)]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-wider font-mono text-gold-100">
                DHARMA.OS
              </span>
              <span className="text-[10px] text-gold-400/70 ml-2 font-mono hidden sm:inline">
                AI Krishna Sacred Art Studio
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/mentor"
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-obsidian-950 text-xs font-mono font-bold shadow-[0_0_15px_rgba(223,168,55,0.3)] transition-all cursor-pointer"
          >
            Krishna AI Mentor
          </Link>
        </div>
      </header>

      {/* Studio Main */}
      <div className="flex-1 py-6">
        <KrishnaImageStudio />
      </div>
    </main>
  );
}
