'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/cn';
import { CHAPTERS } from '@/types/verse';
import { Search, BookOpen, ChevronDown, ChevronRight, Sparkles } from 'lucide-react';
import { sacredAudio } from '@/lib/sacredSounds';

interface ChapterSelectorProps {
  currentChapter: number;
  currentVerse?: number;
  onSelectChapter: (chapter: number) => void;
  onSelectVerse?: (verse: number) => void;
}

export default function ChapterSelector({ 
  currentChapter, 
  currentVerse = 1, 
  onSelectChapter,
  onSelectVerse 
}: ChapterSelectorProps) {
  const [search, setSearch] = useState('');
  const [expandedChapter, setExpandedChapter] = useState<number>(currentChapter);

  const filteredChapters = CHAPTERS.filter(ch => 
    ch.name_en.toLowerCase().includes(search.toLowerCase()) ||
    ch.name_sanskrit.includes(search) ||
    ch.number.toString() === search.trim()
  );

  const handleChapterClick = (chNum: number) => {
    sacredAudio.playNavChime(0.08);
    onSelectChapter(chNum);
    setExpandedChapter(prev => (prev === chNum ? prev : chNum));
  };

  const handleVerseClick = (e: React.MouseEvent, vNum: number, chNum: number) => {
    e.stopPropagation();
    sacredAudio.playNavChime(0.12);
    if (currentChapter !== chNum) {
      onSelectChapter(chNum);
    }
    if (onSelectVerse) {
      onSelectVerse(vNum);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#090a0f]/90 text-[#f5eed9]">
      
      {/* Search & Header */}
      <div className="p-3 sm:p-4 border-b border-[#c5a059]/20 sticky top-0 bg-[#0d0e16]/95 backdrop-blur-xl z-20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#e6c687] font-bold">
            <BookOpen className="w-4 h-4 text-[#c5a059]" />
            <span>श्रीमद्भगवद्गीता (18 अध्याय)</span>
          </div>
          <span className="text-[11px] text-[#c5a059]/70 font-mono">700 श्लोक</span>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#c5a059]/50" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="अध्याय खोजें (Search Chapter)..."
            className="w-full bg-[#151722] border border-[#c5a059]/20 rounded-xl pl-9 pr-3 py-2 text-xs text-[#f5eed9] placeholder:text-[#c5a059]/40 focus:outline-none focus:border-[#c5a059] transition-all"
          />
        </div>
      </div>

      {/* Chapter Accordion List with Embedded Shloka Box */}
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-1.5 custom-scrollbar">
        {filteredChapters.map((chapter) => {
          const isCurrent = currentChapter === chapter.number;
          const isExpanded = expandedChapter === chapter.number;

          return (
            <div 
              key={chapter.number}
              className={cn(
                "rounded-2xl border transition-all duration-200 overflow-hidden",
                isCurrent 
                  ? "bg-[#141622] border-[#c5a059]/50 shadow-[0_4px_20px_rgba(0,0,0,0.4)]" 
                  : "bg-[#0d0e16]/60 border-[#c5a059]/10 hover:border-[#c5a059]/30 hover:bg-[#12131d]"
              )}
            >
              {/* Chapter Summary Button */}
              <button
                onClick={() => handleChapterClick(chapter.number)}
                className="w-full p-3 flex items-center justify-between gap-3 text-left cursor-pointer transition-all touch-manipulation group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Chapter Number Badge */}
                  <div className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-all border",
                    isCurrent
                      ? "bg-gradient-to-br from-[#e6c687] to-[#c5a059] text-[#090a0f] border-[#f5eed9] shadow-md scale-105"
                      : "bg-[#181a26] text-[#c5a059] border-[#c5a059]/25 group-hover:border-[#c5a059]"
                  )}>
                    {chapter.number}
                  </div>

                  {/* Titles */}
                  <div className="min-w-0 flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className={cn(
                        "font-devanagari text-xs sm:text-sm font-semibold truncate",
                        isCurrent ? "text-[#f5eed9]" : "text-[#e6c687]/90 group-hover:text-[#f5eed9]"
                      )}>
                        {chapter.name_sanskrit}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#c5a059]/60 truncate font-sans">
                      {chapter.name_en} · <span className="font-mono text-[#e6c687]/70">{chapter.verse_count} श्लोक</span>
                    </span>
                  </div>
                </div>

                {/* Chevron */}
                <div className="text-[#c5a059]/50 group-hover:text-[#c5a059] p-1">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-[#c5a059]" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </button>

              {/* EMBEDDED SHLOKA MATRIX BOX */}
              {isExpanded && (
                <div className="p-3 bg-[#08090d] border-t border-[#c5a059]/15 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#c5a059]/80 font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#c5a059]" />
                      <span>श्लोक चुनें (Select Shloka):</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#c5a059]/60">
                      1 - {chapter.verse_count}
                    </span>
                  </div>

                  {/* Grid of Shlokas */}
                  <div className="grid grid-cols-6 sm:grid-cols-7 gap-1.5 max-h-48 overflow-y-auto p-1 custom-scrollbar">
                    {Array.from({ length: chapter.verse_count }, (_, idx) => idx + 1).map(vNum => {
                      const isSelected = isCurrent && currentVerse === vNum;
                      return (
                        <button
                          key={vNum}
                          onClick={(e) => handleVerseClick(e, vNum, chapter.number)}
                          className={cn(
                            "h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-all cursor-pointer border touch-manipulation",
                            isSelected
                              ? "bg-[#c5a059] text-[#090a0f] border-[#f5eed9] shadow-[0_0_10px_rgba(197,160,89,0.6)] scale-105"
                              : "bg-[#141622] hover:bg-[#1f2232] text-[#e6c687]/80 hover:text-[#f5eed9] border-[#c5a059]/20 hover:border-[#c5a059]/60"
                          )}
                        >
                          {vNum}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
