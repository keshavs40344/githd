'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sparkles, Search, Radio, Heart, MessageSquare, 
  BookOpen, Download, Compass, ShieldCheck 
} from 'lucide-react';
import { sacredAudio } from '@/lib/sacredSounds';
import { useGlobalAudio } from '@/context/GlobalAudioContext';

export default function GlobalRoyalHeader() {
  const pathname = usePathname();
  const { setIsSearchModalOpen, playTrack } = useGlobalAudio();

  const handleOpenRadio = () => {
    sacredAudio.playFluteChime(0.4);
    playTrack(2, 47, 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन', '२४x७ अखंड गीता रसामृत व दिव्य मुरली नाद');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#07080d]/95 backdrop-blur-2xl border-b border-[#c5a059]/25 px-3 sm:px-6 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)] transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* ── LOGO & BRANDING ──────────────────────────────────────────────── */}
        <Link
          href="/"
          onClick={() => sacredAudio.playNavChime(0.05)}
          className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#c5a059] to-amber-700 p-0.5 shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-all flex items-center justify-center">
            <span className="font-devanagari font-bold text-lg sm:text-xl text-[#07080d]">ॐ</span>
          </div>
          <div>
            <span className="font-serif font-bold text-sm sm:text-base tracking-wider text-[#f5eed9] group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
              <span>DHARMA</span>
              <span className="text-amber-400">.OS</span>
            </span>
            <span className="block text-[10px] font-devanagari text-[#c5a059]/80 -mt-0.5">
              श्रीमद्भगवद्गीता महामन्दिर
            </span>
          </div>
        </Link>

        {/* ── CENTER NAVIGATION SHORTCUTS ─────────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#0f111c]/90 border border-[#c5a059]/25 p-1 rounded-2xl">
          <Link
            href="/#scripture"
            onClick={() => sacredAudio.playNavChime(0.04)}
            className={`px-3 py-1.5 rounded-xl text-xs font-serif transition-colors ${
              pathname === '/' ? 'bg-amber-400/20 text-yellow-300 font-bold' : 'text-[#c5a059]/70 hover:text-white'
            }`}
          >
            १८ अध्याय
          </Link>
          <Link
            href="/episodes"
            onClick={() => sacredAudio.playNavChime(0.04)}
            className={`px-3 py-1.5 rounded-xl text-xs font-serif transition-colors ${
              pathname === '/episodes' ? 'bg-amber-400/20 text-yellow-300 font-bold' : 'text-[#c5a059]/70 hover:text-white'
            }`}
          >
            लीला एपिसोड्स
          </Link>
          <Link
            href="/mentor"
            onClick={() => sacredAudio.playNavChime(0.04)}
            className={`px-3 py-1.5 rounded-xl text-xs font-serif transition-colors ${
              pathname === '/mentor' ? 'bg-amber-400/20 text-yellow-300 font-bold' : 'text-[#c5a059]/70 hover:text-white'
            }`}
          >
            कृष्ण AI संवाद
          </Link>
          <Link
            href="/studio"
            onClick={() => sacredAudio.playNavChime(0.04)}
            className={`px-3 py-1.5 rounded-xl text-xs font-serif transition-colors ${
              pathname === '/studio' ? 'bg-amber-400/20 text-yellow-300 font-bold' : 'text-[#c5a059]/70 hover:text-white'
            }`}
          >
            वॉलपेपर स्टूडियो
          </Link>
        </nav>

        {/* ── RIGHT QUICK ACTIONS ─────────────────────────────────────────── */}
        <div className="flex items-center gap-2">
          
          {/* 24/7 Akhanda Radio Quick Trigger */}
          <button
            onClick={handleOpenRadio}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400/20 via-yellow-400/20 to-amber-500/20 hover:from-amber-400 hover:to-yellow-400 text-yellow-300 hover:text-black border border-amber-400/40 text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            title="२४x७ अखंड गीता व मुरली रेडियो चालू करें"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">२४x७ अखंड रेडियो</span>
          </button>

          {/* AI Search (Ctrl+K) */}
          <button
            onClick={() => {
              setIsSearchModalOpen(true);
              sacredAudio.playNavChime(0.06);
            }}
            className="px-3 py-1.5 rounded-xl bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/30 text-xs font-serif text-[#e6c687] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
            title="गीता में समाधान खोजें (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">खोजें</span>
            <kbd className="hidden lg:inline text-[9px] bg-black/50 px-1.5 py-0.5 rounded border border-[#c5a059]/30 text-[#c5a059]">
              ⌘K
            </kbd>
          </button>

        </div>

      </div>
    </header>
  );
}
