'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/cn';
import { CHAPTERS } from '@/types/verse';
import { Search, BookOpen } from 'lucide-react';

interface ChapterSelectorProps {
  currentChapter: number;
  onSelectChapter: (chapter: number) => void;
}

export default function ChapterSelector({ currentChapter, onSelectChapter }: ChapterSelectorProps) {
  const [search, setSearch] = useState('');

  const filteredChapters = CHAPTERS.filter(ch => 
    ch.name_en.toLowerCase().includes(search.toLowerCase()) ||
    ch.name_sanskrit.includes(search) ||
    ch.number.toString() === search.trim()
  );

  return (
    <div className="flex flex-col h-full w-full">
      {/* Search & Header */}
      <div className="p-4 border-b border-gold-500/10 sticky top-0 bg-obsidian-900/90 backdrop-blur-md z-10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>All 18 Chapters</span>
          </div>
          <span className="text-[11px] text-obsidian-400 font-mono">700 Shlokas</span>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gold-500/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search chapter..."
            className="w-full bg-obsidian-800/80 border border-gold-500/15 rounded-xl pl-9 pr-3 py-1.5 text-xs text-gold-100 placeholder:text-obsidian-500 focus:outline-none focus:border-gold-400/50"
          />
        </div>
      </div>

      {/* Chapter List */}
      <div className="flex-1 overflow-y-auto py-2 space-y-0.5 custom-scrollbar">
        {filteredChapters.map((chapter) => {
          const isActive = currentChapter === chapter.number;
          return (
            <button
              key={chapter.number}
              onClick={() => onSelectChapter(chapter.number)}
              className={cn(
                "flex items-center gap-3.5 px-4 py-3 w-full text-left transition-all border-l-2 cursor-pointer group",
                isActive
                  ? "border-gold-400 bg-gold-400/10 text-gold-100 shadow-[inset_0_0_20px_rgba(223,168,55,0.08)]"
                  : "border-transparent hover:bg-obsidian-800/50 text-gold-200/70 hover:text-gold-100"
              )}
            >
              {/* Chapter Number Pill */}
              <div className={cn(
                "flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-semibold transition-colors border",
                isActive
                  ? "border-gold-400/60 text-gold-300 bg-gold-400/20 shadow-[0_0_10px_rgba(223,168,55,0.2)]"
                  : "border-obsidian-700 text-obsidian-400 group-hover:border-gold-500/30 group-hover:text-gold-300/80"
              )}>
                {chapter.number}
              </div>

              {/* Names */}
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-xs font-devanagari font-medium truncate",
                    isActive ? "text-gold-200" : "text-gold-200/80"
                  )}>
                    {chapter.name_sanskrit}
                  </span>
                  <span className="text-[10px] text-obsidian-400 font-mono ml-2">
                    {chapter.verse_count}v
                  </span>
                </div>
                <span className="text-[11px] text-obsidian-300 truncate font-sans group-hover:text-gold-300/60">
                  {chapter.name_en}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
