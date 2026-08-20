'use client';

import React from 'react';
import { X, Sparkles, BookOpen, Layers } from 'lucide-react';
import { AnvayaToken } from '@/types/verse';
import { sacredAudio } from '@/lib/sacredSounds';

interface WordDetailModalProps {
  token: AnvayaToken;
  onClose: () => void;
}

export default function WordDetailModal({ token, onClose }: WordDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#181a2c] via-[#0f111e] to-[#090a12] border-2 border-[#c5a059]/40 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.95)] space-y-5">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sacredAudio.playNavChime(0.06);
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#141624] hover:bg-[#202338] border border-[#c5a059]/30 text-[#c5a059] hover:text-[#f5eed9] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Word Inscription Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/30 text-xs font-serif text-[#e6c687]">
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span>व्याकरणिक पदच्छेद व शब्द विश्लेषण</span>
          </div>

          <h2 className="text-3xl font-devanagari font-bold text-[#f5eed9] pt-1">
            {token.word}
          </h2>

          {token.iast && (
            <p className="text-sm font-serif italic text-[#c5a059]">
              {token.iast}
            </p>
          )}
        </div>

        {/* Word Meaning & Etymology Cards */}
        <div className="space-y-3">
          
          <div className="p-4 rounded-2xl bg-[#0a0b12] border border-[#c5a059]/20 space-y-1">
            <span className="text-[10px] font-mono text-[#c5a059]/70 uppercase tracking-widest">
              सरल भावार्थ (Meaning)
            </span>
            <p className="text-sm sm:text-base font-serif text-[#f5eed9] font-medium leading-relaxed">
              {token.meaning_hi || (token as any).meaning || 'अन्वय पद'}
            </p>
            {token.meaning_en && (
              <p className="text-xs font-serif text-[#c5a059]/80 italic pt-1">
                {token.meaning_en}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-[#141624] border border-[#c5a059]/20 space-y-1">
              <span className="text-[10px] font-mono text-[#c5a059]/70 uppercase tracking-widest flex items-center gap-1">
                <Layers className="w-3 h-3" />
                <span>धातु / मूल (Root)</span>
              </span>
              <p className="text-xs font-devanagari text-[#e6c687] font-semibold">
                {token.dhatu || 'संस्कृत मूल पद'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-[#141624] border border-[#c5a059]/20 space-y-1">
              <span className="text-[10px] font-mono text-[#c5a059]/70 uppercase tracking-widest flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                <span>विभक्ति / रूप (Case)</span>
              </span>
              <p className="text-xs font-devanagari text-[#e6c687] font-semibold">
                {token.vibhakti || 'प्रथमा / पद'}
              </p>
            </div>
          </div>

        </div>

        {/* Footer Confirmation */}
        <div className="pt-2">
          <button
            onClick={() => {
              sacredAudio.playNavChime(0.06);
              onClose();
            }}
            className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#b89340] text-[#090a0f] font-serif font-bold text-xs shadow-lg hover:scale-101 active:scale-98 transition-all cursor-pointer"
          >
            समझ लिया (Close)
          </button>
        </div>

      </div>
    </div>
  );
}
