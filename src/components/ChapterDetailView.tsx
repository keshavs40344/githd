'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, Play, BookOpen, Sparkles, Volume2, 
  Search, LayoutGrid, List, ChevronRight, Layers,
  Compass, Flame, Disc3, Award
} from 'lucide-react';
import { CHAPTERS, GitaVerse } from '@/types/verse';
import { getMasterTimestampForVerse } from '@/data/gitaMasterAudioTimestamps';
import { getArtworkForShloka } from '@/data/krishnaArtworks';
import { getSpeakerForVerse } from '@/lib/universalVedicEngine';
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeVerseRange, setActiveVerseRange] = useState<string>('all');

  const chapterInfo = CHAPTERS.find(c => c.number === chapterNum) || CHAPTERS[0];
  
  // Filter shlokas belonging to this chapter
  const chapterVerses = verses.filter(v => v.chapter === chapterNum);

  // Group verses into 10-verse quick jumps
  const rangeOptions = ['all'];
  for (let i = 1; i <= chapterInfo.verses_count; i += 10) {
    const end = Math.min(i + 9, chapterInfo.verses_count);
    rangeOptions.push(`${i}-${end}`);
  }

  const displayedVerses = chapterVerses.filter(v => {
    // Range filter
    if (activeVerseRange !== 'all') {
      const [start, end] = activeVerseRange.split('-').map(Number);
      if (v.verse < start || v.verse > end) return false;
    }

    // Search query
    if (!filterSearch) return true;
    const q = filterSearch.toLowerCase().trim();
    return (
      v.verse.toString() === q ||
      v.devanagari.toLowerCase().includes(q) ||
      v.iast.toLowerCase().includes(q) ||
      (v.translation_hi && v.translation_hi.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-20">
      
      {/* ── TOP BREADCRUMB & BACK NAVIGATION ──────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => {
            sacredAudio.playNavChime(0.08);
            onBack();
          }}
          className="px-4 py-2 rounded-2xl bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/30 hover:border-[#c5a059] text-xs font-serif text-[#e6c687] hover:text-[#f5eed9] flex items-center gap-2 transition-all cursor-pointer shadow-md hover:scale-102 active:scale-98"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← सम्पूर्ण १८ अध्याय (All 18 Chapters)</span>
        </button>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle (Grid vs List) */}
          <div className="flex items-center bg-[#10121d] border border-[#c5a059]/20 p-1 rounded-xl shadow-inner">
            <button
              onClick={() => {
                setViewMode('grid');
                sacredAudio.playNavChime(0.05);
              }}
              className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#c5a059] text-[#090a0f] font-bold shadow-sm'
                  : 'text-[#c5a059]/60 hover:text-[#f5eed9]'
              }`}
              title="भव्य बॉक्स ग्रिड दृश्य (Royal Box Cards)"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setViewMode('list');
                sacredAudio.playNavChime(0.05);
              }}
              className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-[#c5a059] text-[#090a0f] font-bold shadow-sm'
                  : 'text-[#c5a059]/60 hover:text-[#f5eed9]'
              }`}
              title="सरल सूची दृश्य (List Deck)"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <span className="text-[11px] font-mono text-[#c5a059]/80 px-2.5 py-1 rounded-xl bg-[#0a0b12] border border-[#c5a059]/20">
            {chapterInfo.verses_count} श्लोक
          </span>
        </div>
      </div>

      {/* ── CHAPTER HERO BANNER (ROYAL AUDIOBOOK ALBUM HEADER) ─────────────── */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#181a2c] via-[#0e101d] to-[#151726] border-2 border-[#c5a059]/40 p-6 sm:p-9 shadow-[0_15px_45px_rgba(0,0,0,0.9)] overflow-hidden space-y-4">
        
        {/* Background Divine Mandala Radiance */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c5a059]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#c5a059] to-amber-500 text-[#090a0f] text-xs font-mono font-bold shadow-md">
              अध्याय {chapterNum}
            </span>
            <span className="text-xs font-serif text-[#e6c687] italic">
              {chapterInfo.name_en}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-devanagari font-bold text-[#f5eed9] leading-tight">
            {chapterInfo.name_sanskrit}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-[#c5a059]/90 font-serif leading-relaxed max-w-3xl">
            {chapterInfo.summary_hi}
          </p>

          {/* Quick Action: Start From Shloka 1 */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                sacredAudio.playTempleBell(0.3);
                onSelectShloka(1);
              }}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-amber-600 hover:from-[#e6c687] hover:to-[#d4af37] text-[#090a0f] font-serif font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xl hover:scale-102 active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>श्लोक १ से वाचन व अध्ययन प्रारंभ करें ▶️</span>
            </button>
          </div>
        </div>

      </div>

      {/* ── SEARCH, QUICK RANGE PILLS & FILTER BAR ───────────────────────── */}
      <div className="space-y-3 bg-[#0a0b12]/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#c5a059]/25 shadow-lg">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#c5a059]" />
            <h2 className="text-sm font-serif font-bold text-[#f5eed9]">
              अध्याय {chapterNum} के सम्पूर्ण श्लोक बॉक्स (Shloka Index)
            </h2>
          </div>

          {/* Search Shloka */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#c5a059]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              placeholder="श्लोक संख्या (उदा. 1, 33) या शब्द खोजें..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#141624] border border-[#c5a059]/30 text-xs font-serif text-[#f5eed9] placeholder-[#c5a059]/40 focus:outline-none focus:border-[#c5a059] transition-all"
            />
          </div>
        </div>

        {/* Quick 10-Shloka Range Jump Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar border-t border-[#c5a059]/15 pt-3">
          <span className="text-[11px] font-serif text-[#c5a059]/70 shrink-0 mr-1">
            त्वरित खंड (Quick Jump):
          </span>
          {rangeOptions.map(r => (
            <button
              key={r}
              onClick={() => {
                setActiveVerseRange(r);
                sacredAudio.playNavChime(0.05);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer border shrink-0 ${
                activeVerseRange === r
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-[#090a0f] border-[#f5eed9] font-bold shadow-md'
                  : 'bg-[#141624] text-[#c5a059]/70 hover:text-[#f5eed9] border-[#c5a059]/20'
              }`}
            >
              {r === 'all' ? 'सम्पूर्ण' : `श्लोक ${r}`}
            </button>
          ))}
        </div>

      </div>

      {/* ── CONDITIONAL VIEW: ROYAL BOX CARDS GRID (PRIMARY VIEW) ─────────── */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {displayedVerses.map(v => {
            const ts = getMasterTimestampForVerse(v.chapter, v.verse);
            const speaker = getSpeakerForVerse(v.chapter, v.verse);
            const artworkUrl = getArtworkForShloka(v.chapter, v.verse);

            return (
              <div
                key={v.verse}
                onClick={() => {
                  sacredAudio.playTempleBell(0.2);
                  onSelectShloka(v.verse);
                }}
                className="group relative rounded-3xl bg-gradient-to-b from-[#161828] via-[#0d0f1b] to-[#080910] border-2 border-[#c5a059]/25 hover:border-[#c5a059] shadow-xl hover:shadow-[0_12px_40px_rgba(212,175,55,0.25)] transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden hover:-translate-y-1"
              >
                
                {/* ── SHLOKA ULTRA-HD KRISHNA ARTWORK BANNER ── */}
                <div className="relative w-full h-36 sm:h-40 overflow-hidden bg-black">
                  <img
                    src={artworkUrl}
                    alt={`श्लोक ${v.chapter}.${v.verse}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Shadow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f1b] via-[#0d0f1b]/50 to-transparent" />

                  {/* Shloka Sankhya Emblem Badge on Artwork */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#c5a059] to-amber-600 group-hover:from-amber-400 group-hover:to-amber-500 text-[#090a0f] flex items-center justify-center font-mono font-bold text-base shadow-[0_0_15px_rgba(212,175,55,0.5)] group-hover:scale-105 transition-all">
                      {v.verse}
                    </div>
                    <div className="flex flex-col drop-shadow-md">
                      <span className="text-xs font-devanagari font-bold text-[#f5eed9]">
                        श्लोक {v.chapter}.{v.verse}
                      </span>
                      <span className="text-[10px] font-mono text-[#e6c687]">
                        {ts.formattedStart}
                      </span>
                    </div>
                  </div>

                  {/* Speaker Tag on Artwork */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-black/75 backdrop-blur-md border border-[#c5a059]/30 text-[11px] font-serif text-[#e6c687] font-semibold truncate max-w-[130px] shadow-lg">
                    ✨ {speaker.name}
                  </div>

                  {/* Center Play Overlay Icon */}
                  <div className="absolute bottom-2.5 right-3 w-8 h-8 rounded-full bg-[#c5a059]/90 group-hover:bg-[#f5eed9] text-[#090a0f] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                </div>

                <div className="p-4 sm:p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                  
                  <div className="space-y-3">
                    {/* Devanagari Sanskrit Verse Box */}
                    <div className="p-3.5 rounded-2xl bg-[#090a12]/90 border border-[#c5a059]/15 group-hover:border-[#c5a059]/40 transition-colors">
                      <p className="font-devanagari text-sm sm:text-base text-[#f5eed9] group-hover:text-amber-100 transition-colors font-medium leading-relaxed line-clamp-3">
                        {v.devanagari}
                      </p>
                    </div>

                    {/* Hindi Translation Preview */}
                    <p className="text-xs text-[#c5a059]/90 font-serif leading-relaxed line-clamp-2 italic">
                      {v.translation_hi}
                    </p>
                  </div>

                  {/* BOTTOM ACTION BAR: [ QUICK LISTEN & FULL STUDY BUTTON ] */}
                  <div className="pt-3 border-t border-[#c5a059]/15 flex items-center justify-between text-xs font-serif">
                    <span className="text-[11px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>यूट्यूब प्रामाणिक वाचन</span>
                    </span>

                    <div className="flex items-center gap-1.5 text-[#e6c687] group-hover:text-[#f5eed9] font-bold group-hover:translate-x-0.5 transition-transform">
                      <span>वाचन व भाष्य</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* ── ALTERNATE VIEW: STREAMLINED AUDIO TRACK LIST ─────────────────── */
        <div className="space-y-3">
          {displayedVerses.map(v => {
            const ts = getMasterTimestampForVerse(v.chapter, v.verse);
            const firstLine = v.devanagari.split('\n')[0] || '';
            const speaker = getSpeakerForVerse(v.chapter, v.verse);

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
                  {/* Large Shloka Sankhya Badge */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#c5a059] to-amber-600 group-hover:from-amber-400 group-hover:to-amber-500 text-[#090a0f] flex items-center justify-center font-mono font-bold text-base shrink-0 shadow-md group-hover:scale-105 transition-all">
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
                      <span className="text-[11px] text-amber-300 font-serif">
                        • {speaker.name}
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
                  <span className="px-3.5 py-2 rounded-xl bg-[#1c1f30] group-hover:bg-gradient-to-r group-hover:from-[#d4af37] group-hover:to-[#c5a059] group-hover:text-[#090a0f] text-xs font-serif text-[#e6c687] font-bold flex items-center gap-2 transition-all shadow-sm">
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>वाचन व भाष्य</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {displayedVerses.length === 0 && (
        <div className="text-center py-12 bg-[#0d0f19] rounded-3xl border border-[#c5a059]/20 p-8 space-y-3">
          <p className="text-sm font-serif text-[#c5a059]">
            कोई श्लोक नहीं मिला। कृपया खोज शब्द बदलें।
          </p>
          <button
            onClick={() => {
              setFilterSearch('');
              setActiveVerseRange('all');
            }}
            className="px-4 py-2 rounded-xl bg-[#141624] text-xs font-serif text-[#e6c687] border border-[#c5a059]/30 cursor-pointer"
          >
            सभी श्लोक पुनः देखें
          </button>
        </div>
      )}

    </div>
  );
}
