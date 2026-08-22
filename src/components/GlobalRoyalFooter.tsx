'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, Heart, ShieldCheck, ArrowUp, Radio, 
  BookOpen, MessageSquare, Flame, Download 
} from 'lucide-react';
import { CHAPTERS } from '@/types/verse';
import { sacredAudio } from '@/lib/sacredSounds';

const DEVANAGARI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
function toDevanagariNum(num: number): string {
  return num.toString().split('').map(d => DEVANAGARI_DIGITS[parseInt(d, 10)] || d).join('');
}

export default function GlobalRoyalFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    sacredAudio.playNavChime(0.05);
  };

  return (
    <footer className="relative bg-[#06070a] border-t-2 border-[#c5a059]/25 text-[#f5eed9] font-serif pt-12 pb-24 overflow-hidden">
      
      {/* Subtle Golden Glow in Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10 relative z-10">
        
        {/* ── TOP SECTION: SHANTI MANTRA & LOGO ───────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#c5a059]/15 pb-8 text-center md:text-left">
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#d4af37] to-amber-700 flex items-center justify-center text-black font-bold font-devanagari text-lg">
                ॐ
              </div>
              <span className="font-bold text-lg text-[#f5eed9] tracking-wider">
                DHARMA<span className="text-amber-400">.OS</span>
              </span>
            </div>
            <p className="text-xs text-[#c5a059]/80 font-devanagari">
              ॥ ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते • पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              className="px-4 py-2 rounded-2xl bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/30 text-xs font-serif text-[#e6c687] hover:text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>शीर्ष पर जाएं (Back to Top)</span>
            </button>
          </div>
        </div>

        {/* ── 18 CHAPTERS QUICK JUMP GRID ─────────────────────────────────── */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-[#e6c687] uppercase tracking-widest block">
            सम्पूर्ण १८ अध्याय त्वरित दर्शन (All 18 Chapters):
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {CHAPTERS.map(ch => (
              <Link
                key={ch.number}
                href={`/chapter/${ch.number}`}
                onClick={() => sacredAudio.playTempleBell(0.15)}
                className="p-2 rounded-xl bg-[#0d0e18] hover:bg-[#181b2e] border border-[#c5a059]/15 hover:border-amber-400 transition-all text-xs block group"
              >
                <div className="flex items-center justify-between text-[10px] text-[#c5a059]/70 group-hover:text-amber-300">
                  <span>अध्याय {toDevanagariNum(ch.number)}</span>
                  <span>{ch.verses_count} श्लोक</span>
                </div>
                <span className="font-devanagari text-xs text-[#f5eed9] font-medium block truncate mt-0.5">
                  {ch.name_sanskrit}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── BOTTOM CREDITS & MISSION ────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#c5a059]/15 text-xs text-[#c5a059]/70 text-center sm:text-left">
          <div className="space-y-1">
            <p className="text-[#f5eed9]/90 font-medium">
              Dharma.OS • The World's Most Advanced Sacred Spiritual Operating System
            </p>
            <p className="text-[11px]">
              १००% विज्ञापन-मुक्त • सनातन वैदिक धर्म व विश्व कल्याण हेतु समर्पित • सर्वाधिकार सुरक्षित
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141624] border border-[#c5a059]/25 text-[11px] text-[#e6c687]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Built with Devotion for Humanity</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
