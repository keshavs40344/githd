'use client';

import React, { useState } from 'react';
import { BookOpen, Sparkles, Flame, Headphones, Compass, ArrowRight, Search, CheckCircle2 } from 'lucide-react';
import { CHAPTERS, ChapterInfo } from '@/types/verse';
import { sacredAudio } from '@/lib/sacredSounds';
import { useLanguage } from '@/context/LanguageContext';

interface ChapterEpisodeGridProps {
  onSelectChapter: (chapterNum: number) => void;
  onDirectShloka: (chapterNum: number, verseNum: number) => void;
}

// Royal Vedic Chapter Metadata with High-Definition Aesthetic Themes
const CHAPTER_METADATA: Record<number, {
  yogaType: string;
  themeColor: string;
  badge: string;
  keyLesson: string;
  thumbnailUrl: string;
}> = {
  1: {
    yogaType: 'कर्म सन्यास पूर्वपीठिका',
    themeColor: 'from-amber-700/40 via-yellow-900/30 to-black',
    badge: 'कुरुक्षेत्र युद्धभूमि',
    keyLesson: 'विषाद से आत्म-जागरण की यात्रा — जब मोह टूटता है, तभी ज्ञान का द्वार खुलता है।',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
  },
  2: {
    yogaType: 'ज्ञान एवं सांख्य योग',
    themeColor: 'from-amber-600/40 via-amber-900/30 to-black',
    badge: 'गीता का महा-सार',
    keyLesson: 'आत्मा अमर है, शरीर नश्वर। स्थितप्रज्ञ बनकर अनासक्त कर्म करो।',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
  },
  3: {
    yogaType: 'कर्म योग',
    themeColor: 'from-orange-700/40 via-red-950/30 to-black',
    badge: 'निष्काम कर्म',
    keyLesson: 'कर्म से कोई बच नहीं सकता। फल की चिंता त्यागो और श्रेष्ठ आचरण करो।',
    thumbnailUrl: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80'
  },
  4: {
    yogaType: 'ज्ञान कर्म सन्यास योग',
    themeColor: 'from-amber-500/40 via-amber-950/30 to-black',
    badge: 'अवतार रहस्य',
    keyLesson: 'यदा यदा ही धर्मस्य — ज्ञान की अग्नि में समस्त कर्म भस्म हो जाते हैं।',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80'
  },
  5: {
    yogaType: 'कर्म सन्यास योग',
    themeColor: 'from-yellow-700/40 via-amber-950/30 to-black',
    badge: 'शाश्वत शांति',
    keyLesson: 'जो मन से सब कुछ ईश्वर को समर्पित करता है, वह कमल के पत्ते की तरह अलिप्त रहता है।',
    thumbnailUrl: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=800&q=80'
  },
  6: {
    yogaType: 'आत्मसंयम / ध्यान योग',
    themeColor: 'from-emerald-800/40 via-teal-950/30 to-black',
    badge: 'ध्यान साधना',
    keyLesson: 'मन ही मित्र है, मन ही शत्रु। नियमित अभ्यास और वैराग्य से मन को वश में करो।',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
  },
  7: {
    yogaType: 'ज्ञान विज्ञान योग',
    themeColor: 'from-blue-800/40 via-slate-950/30 to-black',
    badge: 'सृष्टि का मूल',
    keyLesson: 'जल में रस, सूर्य-चंद्र में प्रकाश और वेदों में प्रणव (ॐ) मैं ही हूँ।',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
  },
  8: {
    yogaType: 'अक्षर ब्रह्म योग',
    themeColor: 'from-indigo-800/40 via-purple-950/30 to-black',
    badge: 'परम गति',
    keyLesson: 'अंतिम समय में जो ॐ का स्मरण करते हुए प्राण त्यागता है, वह परम पद पाता है।',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
  },
  9: {
    yogaType: 'राजविद्या राजगुह्य योग',
    themeColor: 'from-purple-800/40 via-amber-950/30 to-black',
    badge: 'परम गुप्त विद्या',
    keyLesson: 'अनन्याश्चिन्तयन्तो मां... जो अनन्य भाव से मुझे भजते हैं, उनका योगक्षेम मैं वहन करता हूँ।',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
  },
  10: {
    yogaType: 'विभूति योग',
    themeColor: 'from-amber-600/40 via-yellow-950/30 to-black',
    badge: 'ईश्वरीय वैभव',
    keyLesson: 'संसार में जो कुछ भी तेजस्वी, कांतिमान और शक्तिसंपन्न है, वह मेरे तेज का अंश है।',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80'
  },
  11: {
    yogaType: 'विश्वरूप दर्शन योग',
    themeColor: 'from-yellow-500/40 via-orange-950/30 to-black',
    badge: 'दिव्य चक्षु',
    keyLesson: 'अनंत भुजाओं, नेत्रों और तेजों से युक्त साक्षात् कालरूप विराट दर्शन।',
    thumbnailUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80'
  },
  12: {
    yogaType: 'भक्ति योग',
    themeColor: 'from-rose-800/40 via-amber-950/30 to-black',
    badge: 'परम प्रेम',
    keyLesson: 'जो किसी से द्वेष नहीं करता, सबका मित्र और दयालु है, वह भक्त मुझे प्रिय है।',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80'
  },
  13: {
    yogaType: 'क्षेत्र क्षेत्रज्ञ विभाग योग',
    themeColor: 'from-emerald-700/40 via-slate-950/30 to-black',
    badge: 'देह और आत्मा',
    keyLesson: 'यह शरीर क्षेत्र है और इसे जानने वाला आत्मा क्षेत्रज्ञ है।',
    thumbnailUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80'
  },
  14: {
    yogaType: 'गुणत्रय विभाग योग',
    themeColor: 'from-amber-700/40 via-emerald-950/30 to-black',
    badge: 'सत्व-रज-तम',
    keyLesson: 'तीनों गुणों से परे होकर गुणातीत बनना ही मुक्ति का मार्ग है।',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  15: {
    yogaType: 'पुरुषोत्तम योग',
    themeColor: 'from-amber-600/40 via-purple-950/30 to-black',
    badge: 'ऊर्ध्वमूलम् अश्वत्थम्',
    keyLesson: 'संसार रूपी उल्टे अश्वत्थ वृक्ष को वैराग्य रूपी शस्त्र से काटकर परमेश्वर को जानो।',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80'
  },
  16: {
    yogaType: 'दैवासुर संपद्विभाग योग',
    themeColor: 'from-red-800/40 via-amber-950/30 to-black',
    badge: 'दैवी व आसुरी संपदा',
    keyLesson: 'अभय, सत्य, अहिंसा दैवी संपदा हैं; काम, क्रोध, लोभ नरक के तीन द्वार हैं।',
    thumbnailUrl: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=800&q=80'
  },
  17: {
    yogaType: 'श्रद्धात्रय विभाग योग',
    themeColor: 'from-amber-500/40 via-slate-950/30 to-black',
    badge: 'ॐ तत् सत्',
    keyLesson: 'मनुष्य की जैसी श्रद्धा होती है, वैसा ही वह स्वयं बन जाता है।',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
  },
  18: {
    yogaType: 'मोक्ष सन्यास योग',
    themeColor: 'from-yellow-500/40 via-amber-900/30 to-black',
    badge: 'सर्वधर्मान्परित्यज्य',
    keyLesson: 'मामेकं शरणं व्रज — सम्पूर्ण धर्मों को त्यागकर केवल मेरी शरण में आ जाओ, मैं तुम्हें मुक्त कर दूँगा।',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
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
      ch.summary_hi.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
            कुरुक्षेत्र के धर्मक्षेत्र में भगवान श्रीकृष्ण के श्रीमुख से प्रकट हुई दिव्य अमर वाणी। प्रत्येक अध्याय पर क्लिक करके उसके सभी श्लोक, प्रामाणिक स्वर एवं १०-स्तरीय भाष्यों का रसास्वादन करें।
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
              <span>🎧 शुद्ध शास्त्रीय वाचन</span>
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

      {/* ── 18 ROYAL CHAPTER CARDS GRID (3-DEVICE RESPONSIVE) ─────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredChapters.map(ch => {
          const meta = CHAPTER_METADATA[ch.number] || CHAPTER_METADATA[1];
          return (
            <div
              key={ch.number}
              onClick={() => {
                sacredAudio.playTempleBell(0.25);
                onSelectChapter(ch.number);
              }}
              className="group relative rounded-3xl bg-gradient-to-b from-[#161828] via-[#0e101c] to-[#080910] border-2 border-[#c5a059]/25 hover:border-[#c5a059] p-5 sm:p-6 shadow-xl hover:shadow-[0_12px_40px_rgba(212,175,55,0.25)] transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden hover:-translate-y-1"
            >
              
              {/* Dynamic Aura Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div>
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 text-[11px] font-mono font-bold text-[#e6c687]">
                    अध्याय {ch.number}
                  </span>
                  <span className="text-[10px] font-serif text-[#c5a059]/70 px-2 py-0.5 rounded-md bg-[#090a12] border border-[#c5a059]/15">
                    {ch.verses_count} श्लोक
                  </span>
                </div>

                {/* Sanskrit Title */}
                <h3 className="text-xl sm:text-2xl font-devanagari font-bold text-[#f5eed9] group-hover:text-[#e6c687] transition-colors mb-1">
                  {ch.name_sanskrit}
                </h3>

                {/* English Subtitle */}
                <p className="text-xs text-[#c5a059]/80 font-serif italic mb-3">
                  {ch.name_en}
                </p>

                {/* Yoga Classification Tag */}
                <div className="inline-block px-2.5 py-0.5 rounded-lg bg-[#141624] border border-[#c5a059]/20 text-[10px] font-sans text-amber-300 font-semibold mb-3">
                  ✨ {meta.yogaType}
                </div>

                {/* Core Lesson Summary */}
                <p className="text-xs text-[#f5eed9]/80 font-serif leading-relaxed line-clamp-3 mb-4">
                  {meta.keyLesson}
                </p>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-3 border-t border-[#c5a059]/15 flex items-center justify-between text-xs font-serif text-[#e6c687] group-hover:text-[#f5eed9]">
                <span className="flex items-center gap-1.5 font-bold">
                  <span>अध्याय के श्लोक देखें ({ch.verses_count})</span>
                </span>
                <div className="w-7 h-7 rounded-xl bg-[#c5a059]/20 group-hover:bg-[#c5a059] group-hover:text-[#090a0f] flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
