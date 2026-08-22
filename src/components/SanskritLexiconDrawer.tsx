'use client';

import React from 'react';
import { X, Sparkles, BookOpen, Layers, Compass } from 'lucide-react';
import { useGlobalAudio } from '@/context/GlobalAudioContext';
import { sacredAudio } from '@/lib/sacredSounds';

export default function SanskritLexiconDrawer() {
  const { selectedLexiconWord, setSelectedLexiconWord } = useGlobalAudio();

  if (!selectedLexiconWord) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-[#0e111d] border-2 border-[#c5a059]/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-5 sm:p-7 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
            <span className="text-xs font-serif uppercase tracking-wider text-[#e6c687] font-bold">
              संस्कृत पदच्छेद व धातु विश्लेषण (Grammar Lexicon)
            </span>
          </div>
          <button
            onClick={() => {
              setSelectedLexiconWord(null);
              sacredAudio.playNavChime(0.05);
            }}
            className="p-1 rounded-xl text-[#c5a059]/70 hover:text-[#f5eed9]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Word Display */}
        <div className="text-center p-4 rounded-2xl bg-[#141829] border border-[#c5a059]/25 space-y-1">
          <h3 className="text-2xl sm:text-3xl font-devanagari font-bold text-[#f5eed9]">
            {selectedLexiconWord.word}
          </h3>
          <p className="text-xs text-[#c5a059] font-serif italic">
            IAST: {selectedLexiconWord.iast}
          </p>
        </div>

        {/* Grammatical Properties */}
        <div className="grid grid-cols-2 gap-3 text-xs font-serif">
          <div className="p-3 rounded-xl bg-[#141829] border border-[#c5a059]/15">
            <span className="text-[10px] text-[#c5a059]/70 block font-sans">मूल धातु (Root Dhatu):</span>
            <span className="font-devanagari font-bold text-[#f5eed9] text-sm">
              {selectedLexiconWord.dhatu || 'कृ (kṛ) / सत्'}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[#141829] border border-[#c5a059]/15">
            <span className="text-[10px] text-[#c5a059]/70 block font-sans">विभक्ति व कारक (Case/Case-Ending):</span>
            <span className="font-devanagari font-bold text-[#f5eed9] text-sm">
              {selectedLexiconWord.vibhakti || 'प्रथमा एकवचन'}
            </span>
          </div>
        </div>

        {/* Deep Spiritual Meaning */}
        <div className="p-4 rounded-2xl bg-[#141829] border border-[#c5a059]/20 space-y-1.5">
          <span className="text-[10px] font-sans font-bold text-[#c5a059] uppercase tracking-wider block">
            तात्त्विक अर्थ (Contextual Meaning):
          </span>
          <p className="text-sm font-serif text-[#f5eed9] leading-relaxed">
            {typeof selectedLexiconWord.meaning === 'string'
              ? selectedLexiconWord.meaning
              : selectedLexiconWord.meaning?.hi || selectedLexiconWord.meaning?.hinglish || selectedLexiconWord.meaning?.en || 'दिव्य वैदिक शब्दार्थ'}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setSelectedLexiconWord(null)}
          className="w-full py-2.5 rounded-2xl bg-[#c5a059] text-black font-serif font-bold text-xs shadow-md cursor-pointer hover:bg-[#e6c687] transition-colors"
        >
          समझ गए (Close)
        </button>

      </div>
    </div>
  );
}
