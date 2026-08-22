'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles, ArrowRight, Search, Flame, Compass } from 'lucide-react';
import { CHAPTERS } from '@/types/verse';
import { getArtworkDetailsForChapter } from '@/data/krishnaArtworks';
import { sacredAudio } from '@/lib/sacredSounds';
import { useGlobalAudio } from '@/context/GlobalAudioContext';

const CRISIS_PILLS = [
  { label: '🔥 क्रोध निवारण', chapter: 2, verse: 63 },
  { label: '🌧️ अवसाद व चिंता', chapter: 2, verse: 14 },
  { label: '🎯 कर्म व करियर', chapter: 2, verse: 47 },
  { label: '🧘 मन की एकाग्रता', chapter: 6, verse: 35 },
  { label: '⚡ आत्मविश्वास', chapter: 4, verse: 40 },
  { label: '🪔 परम समर्पण', chapter: 18, verse: 66 },
];

const DEVANAGARI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
function toDevanagariNum(num: number): string {
  return num.toString().split('').map(d => DEVANAGARI_DIGITS[parseInt(d, 10)] || d).join('');
}

export default function ChapterEpisodeGrid() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'karma' | 'bhakti' | 'jnana' | 'moksha'>('all');
  const { setIsSearchModalOpen } = useGlobalAudio();

  const filteredChapters = CHAPTERS.filter(ch => {
    const matchesSearch = 
      ch.name_sanskrit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ch.summary_hi && ch.summary_hi.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ch.number.toString() === searchQuery.trim();

    if (!matchesSearch) return false;
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'karma' && (ch.number >= 1 && ch.number <= 6)) return true;
    if (selectedFilter === 'bhakti' && (ch.number >= 7 && ch.number <= 12)) return true;
    if (selectedFilter === 'jnana' && (ch.number >= 13 && ch.number <= 17)) return true;
    if (selectedFilter === 'moksha' && ch.number === 18) return true;
    return false;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-2 sm:px-4">
      
      {/* ── SIMPLE & ROYAL HERO HEADER ────────────────────────────────────── */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#141624] via-[#0d0e18] to-[#161826] border border-[#c5a059]/30 p-6 sm:p-10 shadow-2xl overflow-hidden text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-xs font-serif text-[#e6c687]">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>सम्पूर्ण १८ अध्याय • ७०० प्रामाणिक श्लोक • Distinct Sacred Backgrounds</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-devanagari font-bold text-[#f5eed9] leading-tight">
            श्रीमद्भगवद्गीता <span className="text-[#c5a059]">महाग्रंथ</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#f5eed9]/80 font-serif leading-relaxed">
            भगवान श्रीकृष्ण द्वारा अर्जुन को दिया गया दिव्य अमर उपदेश। किसी भी अध्याय पर क्लिक करें और उसके सम्पूर्ण श्लोक, प्रामाणिक वाचन, व्याख्या एवं दिव्य चित्रों का रसास्वादन करें।
          </p>

          {/* Quick AI Search Trigger Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                setIsSearchModalOpen(true);
                sacredAudio.playNavChime(0.08);
              }}
              className="px-4 py-2 rounded-2xl bg-[#c5a059] hover:bg-[#e6c687] text-black text-xs font-serif font-bold flex items-center gap-2 shadow-lg cursor-pointer transition-transform hover:scale-102"
            >
              <Search className="w-3.5 h-3.5" />
              <span>समस्या से गीता समाधान खोजें (Ctrl+K) 🪔</span>
            </button>
          </div>
        </div>

        {/* Quick Badge */}
        <div className="hidden md:flex flex-col items-center justify-center p-5 rounded-2xl bg-[#090a12] border border-[#c5a059]/30 text-center shadow-lg">
          <span className="text-2xl">🪔</span>
          <span className="text-sm font-serif font-bold text-[#e6c687] mt-1">१८ दिव्य अध्याय</span>
          <span className="text-[11px] text-[#c5a059]/70">700 Classical Verses</span>
        </div>

      </div>

      {/* ── CRISIS DILEMMA SHORTCUT PILLS ─────────────────────────────────── */}
      <div className="p-3 sm:p-4 rounded-2xl bg-[#0f111c] border border-[#c5a059]/20 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-serif font-bold text-[#e6c687] flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>दैनिक जीवन की समस्याओं का गीता समाधान:</span>
          </span>
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="text-[11px] text-[#c5a059] hover:text-[#f5eed9] font-sans cursor-pointer"
          >
            सभी खोजें →
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {CRISIS_PILLS.map((p, i) => (
            <Link
              key={i}
              href={`/chapter/${p.chapter}/${p.verse}`}
              onClick={() => sacredAudio.playTempleBell(0.2)}
              className="px-3 py-1.5 rounded-xl bg-[#141624] hover:bg-[#c5a059] text-[#e6c687] hover:text-black border border-[#c5a059]/25 text-xs font-serif shrink-0 transition-all cursor-pointer shadow-sm hover:scale-102"
            >
              {p.label} (श्लोक {toDevanagariNum(p.chapter)}.{toDevanagariNum(p.verse)})
            </Link>
          ))}
        </div>
      </div>

      {/* ── SEARCH & FILTER CONTROLS ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0d0f19] p-3 sm:p-4 rounded-2xl border border-[#c5a059]/20 shadow-md">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#c5a059]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="अध्याय का नाम या संख्या खोजें..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#141624] border border-[#c5a059]/30 text-xs font-serif text-[#f5eed9] placeholder-[#c5a059]/40 focus:outline-none focus:border-[#c5a059] transition-all"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 custom-scrollbar">
          {[
            { id: 'all', label: 'सभी अध्याय' },
            { id: 'karma', label: 'कर्म योग (१-६)' },
            { id: 'bhakti', label: 'भक्ति योग (७-१२)' },
            { id: 'jnana', label: 'ज्ञान योग (१३-१७)' },
            { id: 'moksha', label: 'मोक्ष योग (१८)' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => {
                setSelectedFilter(f.id as any);
                sacredAudio.playNavChime(0.06);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-serif shrink-0 transition-all cursor-pointer border ${
                selectedFilter === f.id
                  ? 'bg-[#c5a059] text-[#090a0f] font-bold shadow-md'
                  : 'bg-[#141624] text-[#c5a059]/70 hover:text-[#f5eed9] border-[#c5a059]/20'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

      </div>

      {/* ── 18 CHAPTER CARDS GRID (CLEAN, SIMPLE, HD KRISHNA ARTWORKS & NUMBERING) ───── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredChapters.map(ch => {
          const artwork = getArtworkDetailsForChapter(ch.number);

          return (
            <Link
              key={ch.number}
              href={`/chapter/${ch.number}`}
              onClick={() => sacredAudio.playTempleBell(0.25)}
              className="group rounded-3xl bg-[#0f111c] border border-[#c5a059]/25 hover:border-[#c5a059] shadow-xl hover:shadow-[0_10px_35px_rgba(197,160,89,0.2)] transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden hover:-translate-y-1 block"
            >
              
              {/* HD Krishna Artwork Thumbnail */}
              <div className="relative w-full h-44 overflow-hidden bg-black">
                <img
                  src={artwork.url}
                  alt={ch.name_sanskrit}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f111c] via-[#0f111c]/40 to-transparent" />

                {/* Chapter Number Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-[#c5a059]/50 text-xs font-mono font-bold text-[#e6c687] flex items-center gap-1.5 shadow-md">
                  <span>अध्याय {toDevanagariNum(ch.number)}</span>
                  <span className="text-[#c5a059]/60">•</span>
                  <span className="text-[11px] text-[#f5eed9]">Ch {ch.number}</span>
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-lg bg-black/80 backdrop-blur-md border border-[#c5a059]/30 text-[10px] font-mono text-[#f5eed9]">
                  {ch.verses_count} श्लोक
                </div>

                {/* Title */}
                <div className="absolute bottom-2 left-4 right-4">
                  <h3 className="text-lg font-devanagari font-bold text-[#f5eed9] group-hover:text-[#e6c687] transition-colors truncate">
                    ॥ {ch.name_sanskrit} ॥
                  </h3>
                  <p className="text-[11px] text-[#c5a059] font-serif italic truncate">
                    {ch.name_en}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#f5eed9]/80 font-serif leading-relaxed line-clamp-2">
                  {ch.summary_hi || artwork.subtitle}
                </p>

                {/* Footer Action */}
                <div className="pt-3 border-t border-[#c5a059]/15 flex items-center justify-between text-xs font-serif text-[#e6c687] group-hover:text-[#f5eed9]">
                  <span className="font-semibold">सम्पूर्ण अध्याय व श्लोक खोलें</span>
                  <div className="w-7 h-7 rounded-xl bg-[#c5a059]/20 group-hover:bg-[#c5a059] group-hover:text-[#090a0f] flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

            </Link>
          );
        })}
      </div>

    </div>
  );
}
