'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Home, ChevronRight } from 'lucide-react';
import versesData from '@/data/gita-verses.json';
import { CHAPTERS } from '@/types/verse';
import type { GitaVerse } from '@/types/verse';
import ScriptureReader from '@/components/ScriptureReader';
import { sacredAudio } from '@/lib/sacredSounds';

export default function VersePageClient() {
  const router = useRouter();
  const params = useParams();

  const chapterParam = Array.isArray(params?.chapter) ? params.chapter[0] : params?.chapter;
  const verseParam = Array.isArray(params?.verse) ? params.verse[0] : params?.verse;

  const chapterNum = parseInt(chapterParam || '1', 10) || 1;
  const verseNum = parseInt(verseParam || '1', 10) || 1;

  const verses = versesData as GitaVerse[];

  const currentVerse = verses.find(
    v => v.chapter === chapterNum && v.verse === verseNum
  ) || verses[0];

  const handleNavigate = (c: number, v: number) => {
    sacredAudio.playNavChime(0.08);
    router.push(`/chapter/${c}/${v}`);
  };

  const handleNext = () => {
    const chInfo = CHAPTERS.find(c => c.number === chapterNum);
    const maxVerse = chInfo?.verses_count || 47;
    if (verseNum < maxVerse) {
      handleNavigate(chapterNum, verseNum + 1);
    } else if (chapterNum < 18) {
      handleNavigate(chapterNum + 1, 1);
    }
  };

  const handlePrev = () => {
    if (verseNum > 1) {
      handleNavigate(chapterNum, verseNum - 1);
    } else if (chapterNum > 1) {
      const prevCh = CHAPTERS.find(c => c.number === chapterNum - 1);
      handleNavigate(chapterNum - 1, prevCh?.verses_count || 1);
    }
  };

  const handleBackToChapter = () => {
    sacredAudio.playNavChime(0.08);
    router.push(`/chapter/${chapterNum}`);
  };

  return (
    <div className="min-h-screen bg-[#07080d] text-[#f5eed9] font-sans antialiased selection:bg-[#c5a059]/30">
      
      {/* ── GLOBAL ROYAL HEADER ────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#07080d]/90 backdrop-blur-xl border-b border-[#c5a059]/20 px-4 sm:px-8 py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Breadcrumbs Navigation */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <Link
              href="/"
              onClick={() => sacredAudio.playNavChime(0.05)}
              className="flex items-center gap-2 group cursor-pointer text-xs font-serif text-[#c5a059] hover:text-[#f5eed9] transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>गीता महाग्रंथ</span>
            </Link>

            <ChevronRight className="w-3.5 h-3.5 text-[#c5a059]/40" />

            <Link
              href={`/chapter/${chapterNum}`}
              onClick={() => sacredAudio.playNavChime(0.05)}
              className="text-xs font-serif text-[#c5a059] hover:text-[#f5eed9] transition-colors"
            >
              अध्याय {chapterNum}
            </Link>

            <ChevronRight className="w-3.5 h-3.5 text-[#c5a059]/40" />

            <span className="px-2.5 py-0.5 rounded-lg bg-[#c5a059]/20 text-xs font-mono font-bold text-[#e6c687] border border-[#c5a059]/30">
              श्लोक {chapterNum}.{verseNum}
            </span>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleBackToChapter}
              className="px-3 py-1.5 rounded-xl bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/30 text-xs font-serif text-[#e6c687] hover:text-[#f5eed9] flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">अध्याय {chapterNum} सूची</span>
            </button>
          </div>

        </div>
      </header>

      {/* ── MAIN SCRIPTURE READER WORKSPACE ────────────────────────────── */}
      <main className="px-2 sm:px-4 py-4 max-w-5xl mx-auto">
        <ScriptureReader
          verse={currentVerse}
          onPrev={handlePrev}
          onNext={handleNext}
          onBackToChapter={handleBackToChapter}
          onNavigate={handleNavigate}
        />
      </main>

    </div>
  );
}
