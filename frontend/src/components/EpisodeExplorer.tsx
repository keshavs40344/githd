'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, Search, BookOpen, Sparkles, ArrowRight, Volume2, ChevronRight, Star } from 'lucide-react';
import { CHAPTERS } from '@/types/verse';
import { getChapterTheme } from '@/data/chapterThemes';
import { sacredAudio } from '@/lib/sacredSounds';
import { useGlobalAudio } from '@/context/GlobalAudioContext';
import SacredArtworkImage from '@/components/SacredArtworkImage';
import { getArtworkForShloka } from '@/data/krishnaArtworks';

const DN = ['०','१','२','३','४','५','६','७','८','९'];
const toDN = (n: number) => n.toString().split('').map(d => DN[+d]??d).join('');

const CHAPTER_HIGHLIGHTS: Record<number, string> = {
  1: 'अर्जुन का विषाद — युद्धभूमि पर धनुष त्याग',
  2: 'सांख्य योग — आत्मा की अमरता और कर्म का रहस्य',
  3: 'कर्मयोग — निष्काम कर्म की पावन शिक्षा',
  4: 'ज्ञानयोग — दिव्य अवतार और यज्ञ का रहस्य',
  5: 'कर्मसंन्यास — त्याग और समन्वय का मार्ग',
  6: 'ध्यानयोग — मन की विजय और आत्म-संयम',
  7: 'ज्ञान-विज्ञान — परा-अपरा प्रकृति का ज्ञान',
  8: 'अक्षरब्रह्मयोग — मृत्यु और पुनर्जन्म का रहस्य',
  9: 'राजविद्या — परम भक्ति और ईश्वर की कृपा',
  10: 'विभूतियोग — ईश्वर की दिव्य विभूतियाँ',
  11: 'विश्वरूप — अर्जुन को विराट दर्शन',
  12: 'भक्तियोग — निर्गुण और सगुण भक्ति का रहस्य',
  13: 'क्षेत्र-क्षेत्रज्ञ — शरीर और आत्मा का विभाजन',
  14: 'गुणत्रयविभाग — सत्त्व, रजस और तमस गुण',
  15: 'पुरुषोत्तम — ईश्वर का परम स्वरूप',
  16: 'देवासुरसंपद् — दैवी और आसुरी स्वभाव',
  17: 'श्रद्धात्रय — तीन प्रकार की श्रद्धा और आस्था',
  18: 'मोक्षसंन्यास — गीता का परम उपदेश और मोक्षमार्ग',
};

const YOGA_PATHS: Record<number, { label: string; color: string }> = {
  1: { label: 'विषाद', color: '#94a3b8' }, 2: { label: 'कर्म', color: '#f59e0b' },
  3: { label: 'कर्म', color: '#f59e0b' }, 4: { label: 'ज्ञान', color: '#8b5cf6' },
  5: { label: 'संन्यास', color: '#06b6d4' }, 6: { label: 'ध्यान', color: '#10b981' },
  7: { label: 'ज्ञान', color: '#8b5cf6' }, 8: { label: 'ज्ञान', color: '#8b5cf6' },
  9: { label: 'भक्ति', color: '#f43f5e' }, 10: { label: 'भक्ति', color: '#f43f5e' },
  11: { label: 'भक्ति', color: '#f43f5e' }, 12: { label: 'भक्ति', color: '#f43f5e' },
  13: { label: 'ज्ञान', color: '#8b5cf6' }, 14: { label: 'ज्ञान', color: '#8b5cf6' },
  15: { label: 'ज्ञान', color: '#8b5cf6' }, 16: { label: 'धर्म', color: '#f97316' },
  17: { label: 'श्रद्धा', color: '#a78bfa' }, 18: { label: 'मोक्ष', color: '#d4af37' },
};

export default function EpisodeExplorer() {
  const [searchQ, setSearchQ] = useState('');
  const [filterYoga, setFilterYoga] = useState('all');
  const { playTrack } = useGlobalAudio();

  const yogaFilters = [
    { id: 'all', label: 'सभी अध्याय' },
    { id: 'कर्म', label: '⚡ कर्मयोग' },
    { id: 'भक्ति', label: '❤️ भक्तियोग' },
    { id: 'ज्ञान', label: '🔮 ज्ञानयोग' },
    { id: 'ध्यान', label: '🧘 ध्यानयोग' },
    { id: 'मोक्ष', label: '🪔 मोक्षयोग' },
  ];

  const filtered = CHAPTERS.filter(ch => {
    const matchSearch = !searchQ || 
      ch.name_sanskrit.toLowerCase().includes(searchQ.toLowerCase()) ||
      ch.name_en.toLowerCase().includes(searchQ.toLowerCase()) ||
      (CHAPTER_HIGHLIGHTS[ch.number] || '').toLowerCase().includes(searchQ.toLowerCase()) ||
      ch.number.toString() === searchQ.trim();
    const matchYoga = filterYoga === 'all' || YOGA_PATHS[ch.number]?.label === filterYoga;
    return matchSearch && matchYoga;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0f0e1a] via-[#0d0f1e] to-[#130e1a] border border-amber-400/30 p-6 sm:p-10 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.1),transparent_70%)]" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>श्रीमद्भगवद्गीता • १८ दिव्य लीला एपिसोड्स</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-devanagari font-black text-[#f5eed9]">
            कुरुक्षेत्र की <span className="text-amber-400">दिव्य लीला</span>
          </h1>
          <p className="text-sm text-[#f5eed9]/60 font-serif max-w-xl mx-auto">
            अर्जुन से लेकर आपके जीवन तक — प्रत्येक अध्याय एक नया episode है।<br/>
            हर chapter को explore करें, audio सुनें, और उसका जीवन पर प्रभाव देखें।
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative mt-2">
            <Search className="w-4 h-4 text-amber-400/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="अध्याय खोजें — नाम, संख्या, या विषय…"
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#141624]/90 border border-[#c5a059]/30 text-sm font-serif text-[#f5eed9] placeholder-[#c5a059]/40 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Yoga Filter */}
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            {yogaFilters.map(f => (
              <button key={f.id}
                onClick={() => { setFilterYoga(f.id); sacredAudio.playNavChime(0.05); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-serif border transition-all cursor-pointer ${
                  filterYoga === f.id
                    ? 'bg-amber-400 text-black font-bold border-yellow-200'
                    : 'bg-[#141624]/90 text-[#c5a059]/70 border-[#c5a059]/20 hover:border-amber-400'
                }`}
              >{f.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Episode Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(ch => {
          const theme = getChapterTheme(ch.number);
          const yoga = YOGA_PATHS[ch.number];
          const highlight = CHAPTER_HIGHLIGHTS[ch.number] || ch.name_en;
          const artUrl = getArtworkForShloka(ch.number, 1);

          return (
            <div key={ch.number}
              className="group relative rounded-3xl overflow-hidden border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
              style={{ borderColor: `${theme.primaryColor}35`, background: `linear-gradient(135deg, ${theme.glowColor}12, #0a0c18)` }}
            >
              {/* Artwork Header */}
              <div className="relative h-36 overflow-hidden">
                <SacredArtworkImage
                  src={artUrl}
                  alt={ch.name_sanskrit}
                  chapter={ch.number}
                  verse={1}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

                {/* Episode Number Chip */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl text-xs font-mono font-bold"
                  style={{ background: `${theme.primaryColor}90`, color: '#fff' }}>
                  EP {toDN(ch.number)}
                </div>

                {/* Yoga Path Badge */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold border"
                  style={{ color: yoga.color, borderColor: `${yoga.color}50`, background: '#00000080' }}>
                  {yoga.label}
                </div>

                {/* Play button overlay */}
                <button
                  onClick={e => { e.preventDefault(); playTrack(ch.number, 1, ch.name_sanskrit, highlight); sacredAudio.playFluteChime(0.3); }}
                  className="absolute bottom-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center shadow-lg border border-white/20 hover:scale-110 transition-all"
                  style={{ background: `${theme.primaryColor}cc` }}
                  title="श्लोक १ सुनें"
                >
                  <Play className="w-4 h-4 text-white fill-current ml-0.5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <h3 className="font-devanagari font-bold text-base text-[#f5eed9] leading-tight">{ch.name_sanskrit}</h3>
                <p className="text-[11px] text-[#c5a059]/70 font-mono">{ch.name_en} • {ch.verses_count} श्लोक</p>
                <p className="text-xs text-[#f5eed9]/70 font-serif leading-relaxed line-clamp-2">{highlight}</p>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1">
                    {[...Array(Math.min(5, Math.ceil(ch.verses_count / 16)))].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" style={{ color: theme.primaryColor }} />
                    ))}
                  </div>
                  <Link
                    href={`/chapter/${ch.number}`}
                    onClick={() => sacredAudio.playTempleBell(0.18)}
                    className="flex items-center gap-1 text-xs font-serif font-bold px-3 py-1.5 rounded-xl transition-all hover:scale-105"
                    style={{ background: `${theme.primaryColor}25`, color: theme.accentHex }}
                  >
                    पढ़ें <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-sm font-serif text-[#c5a059]/60">
          <p>कोई अध्याय नहीं मिला। कृपया अन्य खोज शब्द आज़माएं।</p>
        </div>
      )}
    </div>
  );
}
