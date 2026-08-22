'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Play, Volume2, Search, LayoutGrid, 
  List, ChevronRight, Layers, Image as ImageIcon, Sparkles
} from 'lucide-react';
import { CHAPTERS, GitaVerse } from '@/types/verse';
import { getMasterTimestampForVerse } from '@/data/gitaMasterAudioTimestamps';
import { getArtworkForChapter, getArtworkForShloka, KRISHNA_ARTWORKS } from '@/data/krishnaArtworks';
import { getSpeakerForVerse } from '@/lib/universalVedicEngine';
import { sacredAudio } from '@/lib/sacredSounds';

interface ChapterDetailViewProps {
  chapterNum: number;
  verses: GitaVerse[];
  onBack?: () => void;
  onSelectShloka?: (verseNum: number) => void;
}

export default function ChapterDetailView({
  chapterNum,
  verses,
  onBack,
  onSelectShloka
}: ChapterDetailViewProps) {
  const router = useRouter();
  const [filterSearch, setFilterSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'gallery'>('grid');
  const [activeVerseRange, setActiveVerseRange] = useState<string>('all');

  const chapterInfo = CHAPTERS.find(c => c.number === chapterNum) || CHAPTERS[0];
  const chapterArtwork = getArtworkForChapter(chapterNum);
  
  // Filter shlokas belonging to this chapter
  const chapterVerses = verses.filter(v => v.chapter === chapterNum);

  // Group verses into 10-verse quick jumps
  const rangeOptions = ['all'];
  for (let i = 1; i <= chapterInfo.verses_count; i += 10) {
    const end = Math.min(i + 9, chapterInfo.verses_count);
    rangeOptions.push(`${i}-${end}`);
  }

  const displayedVerses = chapterVerses.filter(v => {
    if (activeVerseRange !== 'all') {
      const [start, end] = activeVerseRange.split('-').map(Number);
      if (v.verse < start || v.verse > end) return false;
    }

    if (!filterSearch) return true;
    const q = filterSearch.toLowerCase().trim();
    return (
      v.verse.toString() === q ||
      v.devanagari.toLowerCase().includes(q) ||
      v.iast.toLowerCase().includes(q) ||
      (v.translation_hi && v.translation_hi.toLowerCase().includes(q))
    );
  });

  const handleBack = () => {
    sacredAudio.playNavChime(0.08);
    if (onBack) {
      onBack();
    } else {
      router.push('/#scripture');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in px-2 sm:px-4 pb-20">
      
      {/* ── TOP NAV BAR ───────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={handleBack}
          className="px-4 py-2 rounded-2xl bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/30 text-xs font-serif text-[#e6c687] hover:text-[#f5eed9] flex items-center gap-2 transition-all cursor-pointer shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← सम्पूर्ण १८ अध्याय (All Chapters)</span>
        </button>

        <div className="flex items-center gap-2">
          {/* View Mode Selector */}
          <div className="flex items-center bg-[#0d0f19] border border-[#c5a059]/25 p-1 rounded-xl">
            <button
              onClick={() => { setViewMode('grid'); sacredAudio.playNavChime(0.05); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-serif transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-[#c5a059] text-[#090a0f] font-bold shadow-sm'
                  : 'text-[#c5a059]/70 hover:text-[#f5eed9]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">बॉक्स</span>
            </button>
            <button
              onClick={() => { setViewMode('list'); sacredAudio.playNavChime(0.05); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-serif transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'list'
                  ? 'bg-[#c5a059] text-[#090a0f] font-bold shadow-sm'
                  : 'text-[#c5a059]/70 hover:text-[#f5eed9]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">सूची</span>
            </button>
            <button
              onClick={() => { setViewMode('gallery'); sacredAudio.playNavChime(0.05); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-serif transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'gallery'
                  ? 'bg-[#c5a059] text-[#090a0f] font-bold shadow-sm'
                  : 'text-[#c5a059]/70 hover:text-[#f5eed9]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>चित्र दर्शन</span>
            </button>
          </div>

          <span className="text-xs font-mono text-[#c5a059] px-3 py-1.5 rounded-xl bg-[#0d0f19] border border-[#c5a059]/20">
            {chapterInfo.verses_count} श्लोक
          </span>
        </div>
      </div>

      {/* ── CHAPTER HERO BANNER (CLEAN & ROYAL HD KRISHNA THUMBNAIL) ───────── */}
      <div className="relative rounded-3xl bg-[#0f111c] border border-[#c5a059]/30 shadow-2xl overflow-hidden">
        <div className="relative w-full h-48 sm:h-64 overflow-hidden bg-black">
          <img
            src={chapterArtwork}
            alt={chapterInfo.name_sanskrit}
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f111c] via-[#0f111c]/60 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 sm:right-8 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#c5a059] text-[#090a0f] text-xs font-mono font-bold">
                अध्याय {chapterNum}
              </span>
              <span className="text-xs font-serif text-[#e6c687] italic">
                {chapterInfo.name_en}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-devanagari font-bold text-[#f5eed9]">
              {chapterInfo.name_sanskrit}
            </h1>

            <p className="text-xs sm:text-sm text-[#f5eed9]/90 font-serif leading-relaxed max-w-3xl line-clamp-2">
              {chapterInfo.summary_hi}
            </p>

            <div className="pt-1">
              <Link
                href={`/chapter/${chapterNum}/1`}
                onClick={() => sacredAudio.playTempleBell(0.3)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-[#090a0f] font-serif font-bold text-xs shadow-lg hover:scale-102 transition-transform"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>श्लोक १ से वाचन व अध्ययन प्रारंभ करें ▶️</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── SEARCH & FILTER CONTROLS ─────────────────────────────────────── */}
      <div className="space-y-3 bg-[#0d0f19] p-4 rounded-2xl border border-[#c5a059]/20 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#c5a059]" />
            <h2 className="text-sm font-serif font-bold text-[#f5eed9]">
              अध्याय {chapterNum} के सम्पूर्ण श्लोक
            </h2>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#c5a059]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              placeholder="श्लोक संख्या या शब्द खोजें..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#141624] border border-[#c5a059]/30 text-xs font-serif text-[#f5eed9] placeholder-[#c5a059]/40 focus:outline-none focus:border-[#c5a059]"
            />
          </div>
        </div>

        {/* 10-Shloka Range Jump Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar border-t border-[#c5a059]/15 pt-3">
          <span className="text-[11px] font-serif text-[#c5a059]/70 shrink-0 mr-1">
            त्वरित खंड:
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
                  ? 'bg-[#c5a059] text-[#090a0f] font-bold shadow-md'
                  : 'bg-[#141624] text-[#c5a059]/70 hover:text-[#f5eed9] border-[#c5a059]/20'
              }`}
            >
              {r === 'all' ? 'सम्पूर्ण' : `श्लोक ${r}`}
            </button>
          ))}
        </div>
      </div>

      {/* ── 3 DISTINCT DISPLAY MODES ─────────────────────────────────────── */}
      {viewMode === 'gallery' ? (
        /* ── MODE 1: SACRED KRISHNA ARTWORKS GALLERY ── */
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#141624] border border-[#c5a059]/30 text-xs font-serif text-[#e6c687] flex items-center justify-between">
            <span>✨ दिव्य श्रीकृष्ण छवि दीर्घा • ध्यान एवं दर्शन</span>
            <span className="text-[11px] text-[#c5a059]/70">क्लिक करके श्लोक अध्ययन खोलें</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedVerses.map(v => {
              const artworkUrl = getArtworkForShloka(v.chapter, v.verse);
              return (
                <Link
                  key={v.verse}
                  href={`/chapter/${v.chapter}/${v.verse}`}
                  onClick={() => sacredAudio.playTempleBell(0.2)}
                  className="group relative rounded-2xl overflow-hidden bg-black border border-[#c5a059]/30 hover:border-[#c5a059] shadow-xl transition-all duration-300 block"
                >
                  <div className="h-60 w-full overflow-hidden">
                    <img
                      src={artworkUrl}
                      alt={`श्लोक ${v.chapter}.${v.verse}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-lg bg-[#c5a059] text-[#090a0f] font-mono font-bold text-xs">
                        श्लोक {v.chapter}.{v.verse}
                      </span>
                      <span className="text-xs font-serif text-[#e6c687] flex items-center gap-1">
                        <span>अध्ययन करें</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <p className="text-xs font-devanagari text-[#f5eed9] mt-2 line-clamp-1">
                      {v.devanagari}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        /* ── MODE 2: ROYAL BOX CARDS (CLEAN & CRISP) ── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedVerses.map(v => {
            const ts = getMasterTimestampForVerse(v.chapter, v.verse);
            const speaker = getSpeakerForVerse(v.chapter, v.verse);
            const artworkUrl = getArtworkForShloka(v.chapter, v.verse);

            return (
              <Link
                key={v.verse}
                href={`/chapter/${v.chapter}/${v.verse}`}
                onClick={() => sacredAudio.playTempleBell(0.2)}
                className="group rounded-3xl bg-[#0f111c] border border-[#c5a059]/25 hover:border-[#c5a059] shadow-xl hover:shadow-[0_10px_35px_rgba(197,160,89,0.2)] transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden hover:-translate-y-1 block"
              >
                {/* Thumbnail */}
                <div className="relative w-full h-36 overflow-hidden bg-black">
                  <img
                    src={artworkUrl}
                    alt={`श्लोक ${v.chapter}.${v.verse}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f111c] via-[#0f111c]/50 to-transparent" />

                  {/* Emblem */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-[#c5a059] text-[#090a0f] flex items-center justify-center font-mono font-bold text-sm shadow-md">
                      {v.verse}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-devanagari font-bold text-[#f5eed9]">
                        श्लोक {v.chapter}.{v.verse}
                      </span>
                      <span className="text-[10px] font-mono text-[#e6c687]">
                        {ts.formattedStart}
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-black/75 backdrop-blur-md border border-[#c5a059]/30 text-[10px] font-serif text-[#e6c687]">
                    {speaker.name}
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="font-devanagari text-sm text-[#f5eed9] line-clamp-2 leading-relaxed">
                      {v.devanagari}
                    </p>
                    <p className="text-xs text-[#c5a059]/90 font-serif leading-relaxed line-clamp-2 italic">
                      {v.translation_hi}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="pt-2 border-t border-[#c5a059]/15 flex items-center justify-between text-xs font-serif text-[#e6c687]">
                    <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>यूट्यूब प्रामाणिक वाचन</span>
                    </span>
                    <span className="flex items-center gap-1 font-bold group-hover:text-[#f5eed9]">
                      <span>वाचन व भाष्य</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        /* ── MODE 3: SIMPLE LIST VIEW ── */
        <div className="space-y-2.5">
          {displayedVerses.map(v => {
            const ts = getMasterTimestampForVerse(v.chapter, v.verse);
            const speaker = getSpeakerForVerse(v.chapter, v.verse);

            return (
              <Link
                key={v.verse}
                href={`/chapter/${v.chapter}/${v.verse}`}
                onClick={() => sacredAudio.playTempleBell(0.2)}
                className="group rounded-2xl bg-[#0f111c] hover:bg-[#161828] border border-[#c5a059]/20 hover:border-[#c5a059] p-4 transition-all flex items-center justify-between gap-4 block"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#c5a059] text-[#090a0f] flex items-center justify-center font-mono font-bold text-sm shrink-0">
                    {v.verse}
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#c5a059]">
                      <span>श्लोक {v.chapter}.{v.verse}</span>
                      <span>• {ts.formattedStart}</span>
                      <span className="text-amber-300 font-serif">• {speaker.name}</span>
                    </div>
                    <p className="font-devanagari text-sm text-[#f5eed9] truncate">
                      {v.devanagari.split('\n')[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141624] text-xs font-serif text-[#e6c687] font-semibold shrink-0 group-hover:bg-[#c5a059] group-hover:text-[#090a0f] transition-colors">
                  <Play className="w-3 h-3 fill-current" />
                  <span>खोलें</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

    </div>
  );
}
