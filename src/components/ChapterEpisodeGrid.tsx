'use client';

import React, { useState } from 'react';
import { BookOpen, Sparkles, Flame, Headphones, Compass, ArrowRight, Search, CheckCircle2 } from 'lucide-react';
import { CHAPTERS, ChapterInfo } from '@/types/verse';
import { getArtworkForChapter } from '@/data/krishnaArtworks';
import { sacredAudio } from '@/lib/sacredSounds';
import { useLanguage } from '@/context/LanguageContext';

interface ChapterEpisodeGridProps {
  onSelectChapter: (chapterNum: number) => void;
  onDirectShloka: (chapterNum: number, verseNum: number) => void;
}

const CHAPTER_METADATA: Record<number, {
  yogaType: string;
  badge: string;
  keyLesson: string;
}> = {
  1: {
    yogaType: 'कर्म सन्यास पूर्वपीठिका',
    badge: 'कुरुक्षेत्र युद्धभूमि',
    keyLesson: 'विषाद से आत्म-जागरण की यात्रा — जब मोह टूटता है, तभी ज्ञान का द्वार खुलता है।'
  },
  2: {
    yogaType: 'ज्ञान एवं सांख्य योग',
    badge: 'गीता का महा-सार',
    keyLesson: 'आत्मा अमर है, शरीर नश्वर। स्थितप्रज्ञ बनकर अनासक्त कर्म करो।'
  },
  3: {
    yogaType: 'कर्म योग',
    badge: 'निष्काम कर्म',
    keyLesson: 'कर्म से कोई बच नहीं सकता। फल की चिंता त्यागो और श्रेष्ठ आचरण करो।'
  },
  4: {
    yogaType: 'ज्ञान कर्म सन्यास योग',
    badge: 'अवतार रहस्य',
    keyLesson: 'यदा यदा ही धर्मस्य — ज्ञान की अग्नि में समस्त कर्म भस्म हो जाते हैं।'
  },
  5: {
    yogaType: 'कर्म सन्यास योग',
    badge: 'शाश्वत शांति',
    keyLesson: 'जो मन से सब कुछ ईश्वर को समर्पित करता है, वह कमल के पत्ते की तरह अलिप्त रहता है।'
  },
  6: {
    yogaType: 'आत्मसंयम / ध्यान योग',
    badge: 'ध्यान साधना',
    keyLesson: 'मन ही मित्र है, मन ही शत्रु। नियमित अभ्यास और वैराग्य से मन को वश में करो।'
  },
  7: {
    yogaType: 'ज्ञान विज्ञान योग',
    badge: 'सृष्टि का मूल',
    keyLesson: 'जल में रस, सूर्य-चंद्र में प्रकाश और वेदों में प्रणव (ॐ) मैं ही हूँ।'
  },
  8: {
    yogaType: 'अक्षर ब्रह्म योग',
    badge: 'परम गति',
    keyLesson: 'अंतिम समय में जो ॐ का स्मरण करते हुए प्राण त्यागता है, वह परम पद पाता है।'
  },
  9: {
    yogaType: 'राजविद्या राजगुह्य योग',
    badge: 'परम गुप्त विद्या',
    keyLesson: 'अनन्याश्चिन्तयन्तो मां... जो अनन्य भाव से मुझे भजते हैं, उनका योगक्षेम मैं वहन करता हूँ।'
  },
  10: {
    yogaType: 'विभूति योग',
    badge: 'ईश्वरीय वैभव',
    keyLesson: 'संसार में जो कुछ भी तेजस्वी, कांतिमान और शक्तिसंपन्न है, वह मेरे तेज का अंश है।'
  },
  11: {
    yogaType: 'विश्वरूप दर्शन योग',
    badge: 'दिव्य चक्षु',
    keyLesson: 'अनंत भुजाओं, नेत्रों और तेजों से युक्त साक्षात् कालरूप विराट दर्शन।'
  },
  12: {
    yogaType: 'भक्ति योग',
    badge: 'परम प्रेम',
    keyLesson: 'जो किसी से द्वेष नहीं करता, सबका मित्र और दयालु है, वह भक्त मुझे प्रिय है।'
  },
  13: {
    yogaType: 'क्षेत्र क्षेत्रज्ञ विभाग योग',
    badge: 'देह और आत्मा',
    keyLesson: 'यह शरीर क्षेत्र है और इसे जानने वाला आत्मा क्षेत्रज्ञ है।'
  },
  14: {
    yogaType: 'गुणत्रय विभाग योग',
    badge: 'सत्व-रज-तम',
    keyLesson: 'तीनों गुणों से परे होकर गुणातीत बनना ही मुक्ति का मार्ग है।'
  },
  15: {
    yogaType: 'पुरुषोत्तम योग',
    badge: 'ऊर्ध्वमूलम् अश्वत्थम्',
    keyLesson: 'संसार रूपी उल्टे अश्वत्थ वृक्ष को वैराग्य रूपी शस्त्र से काटकर परमेश्वर को जानो।'
  },
  16: {
    yogaType: 'दैवासुर संपद्विभाग योग',
    badge: 'दैवी व आसुरी संपदा',
    keyLesson: 'अभय, सत्य, अहिंसा दैवी संपदा हैं; काम, क्रोध, लोभ नरक के तीन द्वार हैं।'
  },
  17: {
    yogaType: 'श्रद्धात्रय विभाग योग',
    badge: 'ॐ तत् सत्',
    keyLesson: 'मनुष्य की जैसी श्रद्धा होती है, वैसा ही वह स्वयं बन जाता है।'
  },
  18: {
    yogaType: 'मोक्ष सन्यास योग',
    badge: 'सर्वधर्मान्परित्यज्य',
    keyLesson: 'मामेकं शरणं व्रज — सम्पूर्ण धर्मों को त्यागकर केवल मेरी शरण में आ जाओ, मैं तुम्हें मुक्त कर दूँगा।'
  }
};

export default function ChapterEpisodeGrid({
  onSelectChapter,
  onDirectShloka
}: ChapterEpisodeGridProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'karma' | 'jnana' | 'bhakti' | 'moksha'>('all');

  const filteredChapters = CHAPTERS.filter(ch => {
    const meta = CHAPTER_METADATA[ch.number] || CHAPTER_METADATA[1];
    const matchesSearch = 
      ch.name_sanskrit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ch.summary_hi && ch.summary_hi.toLowerCase().includes(searchQuery.toLowerCase())) ||
      meta.keyLesson.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      
      {/* ── HERO BANNER: ROYAL AUDIOBOOK SERIES HEADER ────────────────────── */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#181a29] via-[#0d0f1a] to-[#1a1c2e] border-2 border-[#c5a059]/40 p-6 sm:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.9)] overflow-hidden">
        
        {/* Background Divine Rays */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c5a059]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 text-xs font-serif text-[#e6c687]">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>सम्पूर्ण १८ अध्याय एवं ७०० प्रामाणिक श्लोक संग्रह</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-devanagari font-bold text-[#f5eed9] leading-tight tracking-wide">
            श्रीमद्भगवद्गीता <span className="gradient-text-gold">महाग्रंथ</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-[#c5a059]/90 font-serif leading-relaxed">
            कुरुक्षेत्र के धर्मक्षेत्र में भगवान श्रीकृष्ण के श्रीमुख से प्रकट हुई दिव्य अमर वाणी। प्रत्येक अध्याय पर क्लिक करके उसके सभी श्लोक, प्रामाणिक यूट्यूब वाचन एवं १०-स्तरीय भाष्यों का रसास्वादन करें।
          </p>

          {/* Quick Stats Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-serif text-[#e6c687]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>१८ दिव्य अध्याय (18 Chapters)</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🪔 ७०० मन्त्र स्वरूप श्लोक (700 Verses)</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🎧 प्रामाणिक यूट्यूब शास्त्रीय वाचन</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── SEARCH & FILTER CONTROLS ─────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-[#0a0b12]/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-[#c5a059]/25 shadow-lg">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#c5a059]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="अध्याय, विषय या श्लोक संख्या खोजें..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#141624] border border-[#c5a059]/30 text-xs font-serif text-[#f5eed9] placeholder-[#c5a059]/40 focus:outline-none focus:border-[#e6c687] transition-all"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 custom-scrollbar">
          {[
            { id: 'all', label: 'सभी १८ अध्याय' },
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
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-[#090a0f] font-bold shadow-md'
                  : 'bg-[#141624] text-[#c5a059]/70 hover:text-[#f5eed9] border-[#c5a059]/20'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

      </div>

      {/* ── 18 ROYAL CHAPTER CARDS GRID (WITH HD KRISHNA ARTWORKS) ────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredChapters.map(ch => {
          const meta = CHAPTER_METADATA[ch.number] || CHAPTER_METADATA[1];
          const artworkUrl = getArtworkForChapter(ch.number);

          return (
            <div
              key={ch.number}
              onClick={() => {
                sacredAudio.playTempleBell(0.25);
                onSelectChapter(ch.number);
              }}
              className="group relative rounded-3xl bg-gradient-to-b from-[#161828] via-[#0e101c] to-[#080910] border-2 border-[#c5a059]/25 hover:border-[#c5a059] shadow-xl hover:shadow-[0_12px_40px_rgba(212,175,55,0.25)] transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden hover:-translate-y-1"
            >
              
              {/* ── TOP THUMBNAIL BANNER (HD KRISHNA ARTWORK) ── */}
              <div className="relative w-full h-40 sm:h-44 overflow-hidden bg-black">
                <img
                  src={artworkUrl}
                  alt={ch.name_sanskrit}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                
                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e101c] via-[#0e101c]/40 to-transparent" />

                {/* Floating Chapter Medallion on Thumbnail */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-[#c5a059]/40 text-xs font-mono font-bold text-[#e6c687] shadow-lg">
                  <span>अध्याय {ch.number}</span>
                </div>

                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md border border-[#c5a059]/30 text-[10px] font-mono text-[#f5eed9]">
                  {ch.verses_count} श्लोक
                </div>

                {/* Bottom Title on Image */}
                <div className="absolute bottom-2 left-4 right-4">
                  <h3 className="text-lg sm:text-xl font-devanagari font-bold text-[#f5eed9] drop-shadow-md group-hover:text-[#e6c687] transition-colors truncate">
                    {ch.name_sanskrit}
                  </h3>
                  <p className="text-[11px] text-[#c5a059] font-serif italic truncate">
                    {ch.name_en}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  {/* Yoga Classification Tag */}
                  <div className="inline-block px-2.5 py-0.5 rounded-lg bg-[#141624] border border-[#c5a059]/20 text-[10px] font-sans text-amber-300 font-semibold mb-2">
                    ✨ {meta.yogaType}
                  </div>

                  {/* Core Lesson Summary */}
                  <p className="text-xs text-[#f5eed9]/80 font-serif leading-relaxed line-clamp-3">
                    {meta.keyLesson}
                  </p>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-3 border-t border-[#c5a059]/15 flex items-center justify-between text-xs font-serif text-[#e6c687] group-hover:text-[#f5eed9]">
                  <span className="flex items-center gap-1.5 font-bold">
                    <span>अध्याय के श्लोक खोलें</span>
                  </span>
                  <div className="w-7 h-7 rounded-xl bg-[#c5a059]/20 group-hover:bg-[#c5a059] group-hover:text-[#090a0f] flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
