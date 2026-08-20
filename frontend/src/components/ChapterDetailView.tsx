'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, Play, BookOpen, Sparkles, Volume2, 
  Search, CheckCircle, Disc3, ChevronRight, Layers 
} from 'lucide-react';
import { CHAPTERS, ChapterInfo, GitaVerse } from '@/types/verse';
import { getMasterTimestampForVerse } from '@/data/gitaMasterAudioTimestamps';
import { getGitaVideoForVerse } from '@/data/gitaVideoEpisodes';
import { sacredAudio } from '@/lib/sacredSounds';
import { useLanguage } from '@/context/LanguageContext';

interface ChapterDetailViewProps {
  chapterNum: number;
  verses: GitaVerse[];
  onBack: () => void;
  onSelectShloka: (verseNum: number) => void;
}

export default function ChapterDetailView({
  chapterNum,
  verses,
  onBack,
  onSelectShloka
}: ChapterDetailViewProps) {
  const { t } = useLanguage();
  const [filterSearch, setFilterSearch] = useState('');

  const chapterInfo = CHAPTERS.find(c => c.number === chapterNum) || CHAPTERS[0];
  
  // Filter shlokas belonging to this chapter
  const chapterVerses = verses.filter(v => v.chapter === chapterNum);

  const displayedVerses = chapterVerses.filter(v => {
    if (!filterSearch) return true;
    const q = filterSearch.toLowerCase();
    return (
      v.verse.toString() === q ||
      v.devanagari.toLowerCase().includes(q) ||
      v.iast.toLowerCase().includes(q) ||
      (v.translation_hi && v.translation_hi.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-16">
      
      {/* ── TOP BREADCRUMB & BACK NAVIGATION ──────────────────────────────── */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => {
            sacredAudio.playNavChime(0.08);
            onBack();
          }}
          className="px-4 py-2 rounded-2xl bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/30 hover:border-[#c5a059] text-xs font-serif text-[#e6c687] hover:text-[#f5eed9] flex items-center gap-2 transition-all cursor-pointer shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← सभी १८ अध्याय (All Chapters)</span>
        </button>

        <div className="text-right">
          <span className="text-[11px] font-mono text-[#c5a059]/70">
            अध्याय {chapterNum} · {chapterInfo.verses_count} श्लोक
          </span>
        </div>
      </div>

      {/* ── CHAPTER HERO BANNER (ROYAL AUDIOBOOK ALBUM HEADER) ─────────────── */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#181a2c] via-[#0e101d] to-[#151726] border-2 border-[#c5a059]/40 p-6 sm:p-8 shadow-[0_15px_45px_rgba(0,0,0,0.9)] overflow-hidden space-y-4">
        
        {/* Background Divine Mandala Radiance */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#c5a059] to-amber-500 text-[#090a0f] text-xs font-mono font-bold shadow-md">
              अध्याय {chapterNum}
            </span>
            <span className="text-xs font-serif text-[#e6c687] italic">
              {chapterInfo.name_en}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-devanagari font-bold text-[#f5eed9]">
            {chapterInfo.name_sanskrit}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-[#c5a059]/90 font-serif leading-relaxed max-w-3xl">
            {chapterInfo.summary_hi}
          </p>

          {/* Quick Action: Start From Shloka 1 */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                sacredAudio.playTempleBell(0.3);
                onSelectShloka(1);
              }}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-amber-600 text-[#090a0f] font-serif font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xl hover:scale-102 active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>श्लोक १ से वाचन व अध्ययन प्रारंभ करें</span>
            </button>
          </div>
        </div>

      </div>

      {/* ── SEARCH & SHLOKA EPISODE LIST CONTROLS ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0a0b12]/80 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-[#c5a059]/20 shadow-md">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#c5a059]" />
          <h2 className="text-sm font-serif font-bold text-[#f5eed9]">
            अध्याय {chapterNum} के सम्पूर्ण श्लोक (Episode Index)
          </h2>
        </div>

        {/* Search Shloka */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#c5a059]/50 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
            placeholder="श्लोक संख्या या शब्द खोजें..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#141624] border border-[#c5a059]/25 text-xs font-serif text-[#f5eed9] placeholder-[#c5a059]/40 focus:outline-none focus:border-[#c5a059]"
          />
        </div>
      </div>

      {/* ── SHLOKA EPISODES LIST (TOP AUDIOBOOK TRACK STYLE) ───────────────── */}
      <div className="space-y-3">
        {displayedVerses.map(v => {
          const ts = getMasterTimestampForVerse(v.chapter, v.verse);
          const firstLine = v.devanagari.split('\n')[0] || '';
          
          return (
            <div
              key={v.verse}
              onClick={() => {
                sacredAudio.playTempleBell(0.2);
                onSelectShloka(v.verse);
              }}
              className="group rounded-2xl bg-gradient-to-r from-[#121422] via-[#0d0f19] to-[#151726] hover:from-[#1b1e32] hover:to-[#1a1d2e] border border-[#c5a059]/20 hover:border-[#c5a059]/60 p-4 sm:p-5 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md hover:shadow-xl hover:-translate-y-0.5"
            >
              
              {/* Left: Track Number + Shloka Verse Text */}
              <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                {/* Vinyl / Shloka Number Badge */}
                <div className="w-10 h-10 rounded-xl bg-[#1a1d2e] group-hover:bg-[#c5a059] group-hover:text-[#090a0f] text-[#e6c687] border border-[#c5a059]/30 flex items-center justify-center font-mono font-bold text-sm shrink-0 transition-colors shadow-inner">
                  {v.verse}
                </div>

                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-[#c5a059]">
                      श्लोक {v.chapter}.{v.verse}
                    </span>
                    <span className="text-[11px] text-[#c5a059]/60 font-sans">
                      • {ts.formattedStart}
                    </span>
                  </div>

                  {/* Opening Sanskrit Line */}
                  <h4 className="font-devanagari text-sm sm:text-base font-semibold text-[#f5eed9] group-hover:text-[#e6c687] transition-colors truncate">
                    {firstLine}
                  </h4>

                  {/* Hindi Translation Preview */}
                  <p className="text-xs text-[#c5a059]/80 font-serif line-clamp-1">
                    {v.translation_hi}
                  </p>
                </div>
              </div>

              {/* Right: Quick Play / Read Pill */}
              <div className="flex items-center justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#c5a059]/10">
                <span className="px-3 py-1.5 rounded-xl bg-[#1c1f30] group-hover:bg-gradient-to-r group-hover:from-[#d4af37] group-hover:to-[#c5a059] group-hover:text-[#090a0f] text-xs font-serif text-[#e6c687] font-semibold flex items-center gap-1.5 transition-all shadow-sm">
                  <Play className="w-3 h-3 fill-current" />
                  <span>वाचन व भाष्य</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
