'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Play, Pause, Volume2, Search, LayoutGrid, 
  List, ChevronRight, Image as ImageIcon, Download
} from 'lucide-react';
import { CHAPTERS, GitaVerse } from '@/types/verse';
import { getMasterTimestampForVerse } from '@/data/gitaMasterAudioTimestamps';
import { getArtworkForShloka } from '@/data/krishnaArtworks';
import { getChapterTheme } from '@/data/chapterThemes';
import { sacredAudio } from '@/lib/sacredSounds';
import { useGlobalAudio } from '@/context/GlobalAudioContext';
import SacredArtworkImage from '@/components/SacredArtworkImage';

interface ChapterDetailViewProps {
  chapterNum: number;
  verses: GitaVerse[];
  onBack?: () => void;
  onSelectShloka?: (verseNum: number) => void;
}

const DEVANAGARI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
function toDevanagariNum(num: number): string {
  return num.toString().split('').map(d => DEVANAGARI_DIGITS[parseInt(d, 10)] || d).join('');
}

export default function ChapterDetailView({
  chapterNum,
  verses,
  onBack
}: ChapterDetailViewProps) {
  const router = useRouter();
  const { currentTrack, isPlaying, playTrack, togglePlayPause, setIsSearchModalOpen, setActiveCardGeneratorVerse } = useGlobalAudio();
  const [filterSearch, setFilterSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'gallery'>('grid');
  const [activeVerseRange, setActiveVerseRange] = useState<string>('all');

  const chapterInfo = CHAPTERS.find(c => c.number === chapterNum) || CHAPTERS[0];
  const chapterTheme = getChapterTheme(chapterNum);
  
  const chapterVerses = verses.filter(v => v.chapter === chapterNum);

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
    <div className="relative min-h-screen">
      
      {/* Background Ambience in Chapter Theme Tint */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#090b14]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#090b14]/90 via-[#090b14]/95 to-[#090b14]" />
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{ background: `radial-gradient(ellipse at top, ${chapterTheme.primaryColor} 0%, transparent 70%)` }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-6 animate-fade-in px-2 sm:px-4 pb-32 pt-2">
        
        {/* ── TOP NAV BAR ───────────────────────────────────────────────────── */}
        <div className={`flex flex-wrap items-center justify-between gap-3 bg-[#0d0f19]/95 backdrop-blur-xl p-3 rounded-2xl border-2 ${chapterTheme.borderClass} shadow-2xl`}>
          <button
            onClick={handleBack}
            className="px-4 py-2 rounded-2xl bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/30 text-xs font-serif text-[#e6c687] hover:text-[#f5eed9] flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← सम्पूर्ण १८ अध्याय (All Chapters)</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => { setIsSearchModalOpen(true); sacredAudio.playNavChime(0.05); }}
              className="p-2 rounded-xl bg-[#141624] border border-[#c5a059]/25 text-[#c5a059] hover:text-[#f5eed9] text-xs font-serif flex items-center gap-1 cursor-pointer"
              title="खोजें (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">खोजें</span>
            </button>

            {/* View Mode Selector */}
            <div className="flex items-center bg-[#141624] border border-[#c5a059]/30 p-1 rounded-xl">
              <button
                onClick={() => { setViewMode('grid'); sacredAudio.playNavChime(0.05); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-serif transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'grid'
                    ? `${chapterTheme.buttonBg} font-bold shadow-sm`
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
                    ? `${chapterTheme.buttonBg} font-bold shadow-sm`
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
                    ? `${chapterTheme.buttonBg} font-bold shadow-sm`
                    : 'text-[#c5a059]/70 hover:text-[#f5eed9]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>चित्र दर्शन</span>
              </button>
            </div>

            <span className={`text-xs font-mono px-3 py-1.5 rounded-xl bg-[#141624] border ${chapterTheme.borderClass} ${chapterTheme.badgeText}`}>
              {chapterInfo.verses_count} श्लोक
            </span>
          </div>
        </div>

        {/* ── CHAPTER HERO BANNER (100% BRIGHT HD ARTWORK) ──────────────────── */}
        <div className={`relative rounded-3xl bg-[#0f111c]/90 backdrop-blur-2xl border-2 ${chapterTheme.borderClass} shadow-2xl overflow-hidden`}>
          <div className="relative w-full h-52 sm:h-72 overflow-hidden bg-black">
            <SacredArtworkImage
              src={chapterTheme.imageUrl}
              alt={chapterInfo.name_sanskrit}
              chapter={chapterNum}
              className="w-full h-full object-cover filter brightness-100 contrast-105 hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f111c] via-[#0f111c]/50 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 sm:right-8 space-y-2">
              <div className="flex items-center gap-2">
                <span className={`px-3.5 py-1 rounded-full ${chapterTheme.buttonBg} text-xs font-mono font-bold shadow-lg flex items-center gap-1.5`}>
                  <span>{chapterTheme.icon}</span>
                  <span>॥ अध्याय {toDevanagariNum(chapterNum)} • CHAPTER {chapterNum} ॥</span>
                </span>
                <span className="text-xs font-serif text-[#e6c687] italic">
                  {chapterInfo.name_en}
                </span>
              </div>

              <h1 className="text-2xl sm:text-5xl font-devanagari font-bold text-[#f5eed9] drop-shadow-lg">
                {chapterInfo.name_sanskrit}
              </h1>

              <p className="text-xs sm:text-sm text-[#f5eed9]/90 font-serif max-w-3xl line-clamp-2 drop-shadow">
                {chapterInfo.summary_hi || chapterTheme.sutra}
              </p>
            </div>
          </div>
        </div>

        {/* ── QUICK SEARCH & VERSE JUMP TABS ─────────────────────────────────── */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0d0f19]/90 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border ${chapterTheme.borderClass}`}>
          
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#c5a059]/50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              placeholder="श्लोक संख्या या शब्द खोजें..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#141624] border border-[#c5a059]/25 text-xs font-serif text-[#f5eed9] placeholder-[#c5a059]/40 focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          {/* 10-Verse Quick Jump Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 custom-scrollbar">
            {rangeOptions.map(r => (
              <button
                key={r}
                onClick={() => {
                  setActiveVerseRange(r);
                  sacredAudio.playNavChime(0.05);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer border shrink-0 ${
                  activeVerseRange === r
                    ? `${chapterTheme.buttonBg} font-bold shadow-md`
                    : `bg-[#141624] ${chapterTheme.badgeText} border-[#c5a059]/20 hover:text-white`
                }`}
              >
                {r === 'all' ? 'सम्पूर्ण' : `श्लोक ${r}`}
              </button>
            ))}
          </div>
        </div>

        {/* ── ALL SHLOKAS IN THIS CHAPTER INHERIT THE EXACT CHAPTER COLOR ───── */}
        {viewMode === 'gallery' ? (
          /* ── MODE 1: SACRED KRISHNA ARTWORKS GALLERY ── */
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedVerses.map(v => {
                const artworkUrl = getArtworkForShloka(v.chapter, v.verse);
                return (
                  <Link
                    key={v.verse}
                    href={`/chapter/${v.chapter}/${v.verse}`}
                    onClick={() => sacredAudio.playTempleBell(0.2)}
                    className={`group relative rounded-3xl overflow-hidden bg-black border-2 ${chapterTheme.borderClass} ${chapterTheme.borderHoverClass} shadow-xl transition-all duration-300 block`}
                  >
                    <div className="h-60 w-full overflow-hidden">
                      <SacredArtworkImage
                        src={artworkUrl}
                        alt={`श्लोक ${v.chapter}.${v.verse}`}
                        chapter={v.chapter}
                        verse={v.verse}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-4">
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-lg ${chapterTheme.buttonBg} font-mono font-bold text-xs`}>
                          ॥ श्लोक {toDevanagariNum(v.chapter)}.{toDevanagariNum(v.verse)} ॥
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
          /* ── MODE 2: ROYAL BOX CARDS (SAME COLOR BORDER FOR ALL SHLOKAS) ── */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedVerses.map(v => {
              const ts = getMasterTimestampForVerse(v.chapter, v.verse);
              const artworkUrl = getArtworkForShloka(v.chapter, v.verse);
              const isPlayingThis = currentTrack?.chapter === v.chapter && currentTrack?.verse === v.verse && isPlaying;

              return (
                <div
                  key={v.verse}
                  className={`group rounded-3xl bg-[#0f111c]/95 backdrop-blur-xl border-2 ${chapterTheme.borderClass} ${chapterTheme.borderHoverClass} shadow-xl hover:shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1`}
                  style={{ boxShadow: `0 4px 20px ${chapterTheme.glowColor}` }}
                >
                  {/* Thumbnail */}
                  <div className="relative w-full h-36 overflow-hidden bg-black">
                    <SacredArtworkImage
                      src={artworkUrl}
                      alt={`श्लोक ${v.chapter}.${v.verse}`}
                      chapter={v.chapter}
                      verse={v.verse}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f111c] via-[#0f111c]/40 to-transparent" />

                    {/* Emblem with Royal Numbering in Chapter Color */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <div className={`w-9 h-9 rounded-xl ${chapterTheme.buttonBg} flex items-center justify-center font-mono font-bold text-sm shadow-md`}>
                        {v.verse}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-devanagari font-bold text-[#f5eed9]">
                          ॥ श्लोक {toDevanagariNum(v.chapter)}.{toDevanagariNum(v.verse)} ॥
                        </span>
                        <span className={`text-[10px] font-mono ${chapterTheme.badgeText}`}>
                          Verse {v.chapter}.{v.verse} • {ts.formattedStart}
                        </span>
                      </div>
                    </div>

                    {/* Quick Play & Card Creator Buttons */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCardGeneratorVerse(v);
                        }}
                        className={`p-1.5 rounded-lg bg-black/80 backdrop-blur-md border ${chapterTheme.borderClass} text-[#e6c687] hover:text-[#f5eed9] transition-colors cursor-pointer`}
                        title="कार्ड बनाएं"
                      >
                        <Download className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isPlayingThis) {
                            togglePlayPause();
                          } else {
                            playTrack(v.chapter, v.verse, v.devanagari, v.translation_hi);
                          }
                        }}
                        className={`p-1.5 rounded-lg backdrop-blur-md border transition-colors cursor-pointer ${
                          isPlayingThis
                            ? `${chapterTheme.buttonBg} font-bold shadow-md`
                            : `bg-black/80 border ${chapterTheme.borderClass} ${chapterTheme.badgeText} hover:text-white`
                        }`}
                        title={isPlayingThis ? 'रोकें' : 'स्वर सुनें'}
                      >
                        {isPlayingThis ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                      </button>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <p className="font-devanagari text-sm text-[#f5eed9] font-medium line-clamp-2 leading-relaxed">
                        {v.devanagari}
                      </p>
                      <p className="text-xs font-serif line-clamp-2 leading-relaxed" style={{ color: chapterTheme.accentHex }}>
                        {v.translation_hi}
                      </p>
                    </div>

                    {/* Footer Action */}
                    <Link
                      href={`/chapter/${v.chapter}/${v.verse}`}
                      onClick={() => sacredAudio.playTempleBell(0.2)}
                      className={`pt-3 border-t border-[#c5a059]/15 flex items-center justify-between text-xs font-serif ${chapterTheme.badgeText} group-hover:text-white`}
                    >
                      <span>सम्पूर्ण भाष्य, उच्चारण व अर्थ खोलें</span>
                      <div className={`w-6 h-6 rounded-lg ${chapterTheme.badgeBg} group-hover:${chapterTheme.buttonBg} flex items-center justify-center transition-colors`}>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ── MODE 3: SIMPLE FAST-TRACK STREAMLINED LIST ── */
          <div className="space-y-3">
            {displayedVerses.map(v => {
              const isPlayingThis = currentTrack?.chapter === v.chapter && currentTrack?.verse === v.verse && isPlaying;

              return (
                <div
                  key={v.verse}
                  className={`p-4 rounded-2xl bg-[#0f111c]/90 backdrop-blur-xl border-2 ${chapterTheme.borderClass} ${chapterTheme.borderHoverClass} flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 shadow-md`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl ${chapterTheme.buttonBg} flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5`}>
                      {v.verse}
                    </div>

                    <div className="space-y-1 min-w-0">
                      <p className="font-devanagari text-sm text-[#f5eed9] font-medium truncate">
                        ॥ श्लोक {toDevanagariNum(v.chapter)}.{toDevanagariNum(v.verse)} ॥ {v.devanagari}
                      </p>
                      <p className="text-xs font-serif line-clamp-1" style={{ color: chapterTheme.accentHex }}>
                        {v.translation_hi}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        if (isPlayingThis) {
                          togglePlayPause();
                        } else {
                          playTrack(v.chapter, v.verse, v.devanagari, v.translation_hi);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-serif flex items-center gap-1.5 transition-all cursor-pointer ${
                        isPlayingThis
                          ? `${chapterTheme.buttonBg} font-bold shadow-md`
                          : `bg-[#141624] ${chapterTheme.badgeText} border ${chapterTheme.borderClass} hover:text-white`
                      }`}
                    >
                      {isPlayingThis ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isPlayingThis ? 'रोकें' : 'स्वर'}</span>
                    </button>

                    <Link
                      href={`/chapter/${v.chapter}/${v.verse}`}
                      onClick={() => sacredAudio.playTempleBell(0.2)}
                      className={`px-3.5 py-1.5 rounded-xl ${chapterTheme.buttonBg} font-serif font-bold text-xs flex items-center gap-1 transition-colors shadow-md`}
                    >
                      <span>अध्ययन</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
