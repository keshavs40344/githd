'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Home, Sparkles, Compass, Headphones } from 'lucide-react';
import versesData from '@/data/gita-verses.json';
import type { GitaVerse } from '@/types/verse';
import ChapterDetailView from '@/components/ChapterDetailView';
import { sacredAudio } from '@/lib/sacredSounds';

export default function ChapterDynamicPage() {
  const router = useRouter();
  const params = useParams();
  const chapterParam = Array.isArray(params?.chapter) ? params.chapter[0] : params?.chapter;
  const chapterNum = parseInt(chapterParam || '1', 10) || 1;

  const verses = versesData as GitaVerse[];

  const handleSelectShloka = (verseNum: number) => {
    sacredAudio.playTempleBell(0.2);
    router.push(`/chapter/${chapterNum}/${verseNum}`);
  };

  const handleBackToAllChapters = () => {
    sacredAudio.playNavChime(0.08);
    router.push('/#scripture');
  };

  return (
    <div className="min-h-screen bg-[#07080d] text-[#f5eed9] font-sans antialiased selection:bg-[#c5a059]/30">
      
      {/* ── GLOBAL ROYAL HEADER ────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#07080d]/90 backdrop-blur-xl border-b border-[#c5a059]/20 px-4 sm:px-8 py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <Link
              href="/"
              onClick={() => sacredAudio.playNavChime(0.05)}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d4af37] via-[#c5a059] to-amber-700 p-0.5 shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-all flex items-center justify-center">
                <span className="font-devanagari font-bold text-lg text-[#07080d]">ॐ</span>
              </div>
              <div>
                <span className="font-serif font-bold text-sm sm:text-base tracking-wider text-[#f5eed9] group-hover:text-[#e6c687] transition-colors">
                  DHARMA<span className="text-[#c5a059]">.OS</span>
                </span>
                <span className="block text-[9px] font-devanagari text-[#c5a059]/70 -mt-1">
                  श्रीमद्भगवद्गीता महामन्दिर
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Nav Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              onClick={() => sacredAudio.playNavChime(0.05)}
              className="px-3 py-1.5 rounded-xl bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/30 text-xs font-serif text-[#e6c687] hover:text-[#f5eed9] flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">मुख्य पृष्ठ (Home)</span>
            </Link>

            <Link
              href="/mentor"
              onClick={() => sacredAudio.playNavChime(0.05)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#d4af37]/20 to-[#c5a059]/20 hover:from-[#d4af37] hover:to-[#c5a059] hover:text-[#090a0f] border border-[#c5a059]/40 text-xs font-serif text-[#e6c687] flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">कृष्ण AI मेंटर</span>
            </Link>
          </div>

        </div>
      </header>

      {/* ── CHAPTER CONTENT HUB CONTAINER ──────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
        <ChapterDetailView
          chapterNum={chapterNum}
          verses={verses}
          onBack={handleBackToAllChapters}
          onSelectShloka={handleSelectShloka}
        />
      </main>

    </div>
  );
}
