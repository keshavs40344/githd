'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, BookOpen, Star, AlertCircle } from 'lucide-react';
import type { GitaVerse } from '@/types/verse';

interface GlobalVerseSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVerse: (chapter: number, verse: number) => void;
  verses: GitaVerse[];
}

export default function GlobalVerseSearchModal({ isOpen, onClose, onSelectVerse, verses }: GlobalVerseSearchModalProps) {
  const [query, setQuery] = useState('');
  const [filterTag, setFilterTag] = useState<string | null>(null);

  const tags = ["Karma Yoga", "Self-Mastery", "Anger", "Devotion", "Wisdom"];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) {
          // You'd typically expose a method or rely on external state for Cmd+K to open
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredVerses = useMemo(() => {
    if (!query && !filterTag) return [];
    
    return verses.filter(v => {
      const searchStr = `${v.chapter} ${v.verse} ${v.devanagari} ${v.translation_en} ${v.practical_insight}`.toLowerCase();
      const matchesQuery = query ? searchStr.includes(query.toLowerCase()) : true;
      const matchesTag = filterTag ? searchStr.includes(filterTag.toLowerCase()) : true;
      return matchesQuery && matchesTag;
    }).slice(0, 50); // limit to 50 results
  }, [query, filterTag, verses]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-2xl bg-[#141414] rounded-2xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-[#D4AF37]/20 flex items-center gap-3">
          <Search className="text-[#D4AF37]" size={20} />
          <input 
            autoFocus
            type="text" 
            placeholder="Search verses, insights, translations... (Cmd+K)"
            className="flex-1 bg-transparent border-none text-white placeholder-gray-500 focus:outline-none focus:ring-0 text-lg"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-3 border-b border-[#D4AF37]/10 flex flex-wrap gap-2">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilterTag(filterTag === tag ? null : tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filterTag === tag 
                  ? 'bg-[#D4AF37] text-black' 
                  : 'bg-[#1A1A1A] text-[#D4AF37]/80 border border-[#D4AF37]/30 hover:bg-[#D4AF37]/10'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredVerses.length === 0 && (query || filterTag) ? (
            <div className="p-8 text-center text-gray-400 flex flex-col items-center gap-3">
              <AlertCircle className="text-[#D4AF37]/50" size={32} />
              <p>No verses found for your search.</p>
            </div>
          ) : !query && !filterTag ? (
            <div className="p-8 text-center text-gray-500 flex flex-col items-center gap-3">
              <BookOpen className="text-[#D4AF37]/30" size={32} />
              <p>Type to search the timeless wisdom of the Gita.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredVerses.map(v => (
                <button
                  key={`${v.chapter}-${v.verse}`}
                  onClick={() => { onSelectVerse(v.chapter, v.verse); onClose(); }}
                  className="w-full text-left p-4 rounded-xl hover:bg-[#D4AF37]/10 transition-colors border border-transparent hover:border-[#D4AF37]/30 group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[#D4AF37] font-semibold text-sm">Ch {v.chapter} : Verse {v.verse}</span>
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-2 mb-1">{v.translation_en}</p>
                  <p className="text-gray-500 text-xs line-clamp-1">{v.devanagari}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
