'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, Search, BookOpen, Sparkles, ArrowRight, Volume2, ChevronRight, Star, Radio } from 'lucide-react';
import { CHAPTERS } from '@/types/verse';
import { getChapterTheme } from '@/data/chapterThemes';
import { sacredAudio } from '@/lib/sacredSounds';
import { useGlobalAudio } from '@/context/GlobalAudioContext';
import SacredArtworkImage from '@/components/SacredArtworkImage';
import { getArtworkForShloka } from '@/data/krishnaArtworks';
import { GITA_FULL_CHAPTER_VIDEOS } from '@/data/gitaVideoEpisodes';

const DN = ['०','१','२','३','४','५','६','७','८','९'];
const toDN = (n: number) => n.toString().split('').map(d => DN[+d]??d).join('');

const CHAPTER_HIGHLIGHTS: Record<number, string> = {
  1: 'अर्जुनविषादयोग — कुरुक्षेत्र युद्धभूमि पर अर्जुन का मोह व विषाद',
  2: 'सांख्ययोग — आत्मा की अमरता और निष्काम कर्म का शाश्वत रहस्य',
  3: 'कर्मयोग — अनासक्त भाव से कर्तव्य पालन और यज्ञ चक्र',
  4: 'ज्ञानकर्मसंन्यासयोग — दिव्य अवतार का रहस्य और ज्ञान यज्ञ',
  5: 'कर्मसंन्यासयोग — संन्यास और कर्मयोग का दिव्य समन्वय',
  6: 'ध्यानयोग — मन पर पूर्ण विजय, अष्टांग योग और आत्म-साक्षात्कार',
  7: 'ज्ञानविज्ञानयोग — भगवान की परा और अपरा प्रकृति का विज्ञान',
  8: 'अक्षरब्रह्मयोग — परम धाम की प्राप्ति और प्रयाणकाल का स्मरण',
  9: 'राजविद्याराजगुह्ययोग — परम गोपनीय ज्ञान और अनन्य भक्ति',
  10: 'विभूतियोग — भगवान की अनन्त दिव्य विभूतियों का दर्शन',
  11: 'विश्वरूपदर्शनयोग — अर्जुन को भगवान के विराट विश्वरूप का दर्शन',
  12: 'भक्तियोग — सगुण व निर्गुण भक्ति और प्रिय भक्त के लक्षण',
  13: 'क्षेत्रक्षेत्रज्ञविभागयोग — प्रकृति, पुरुष और चेतना का भेद',
  14: 'गुणत्रयविभागयोग — सत्त्व, रज और तम तीनों गुणों का रहस्य',
  15: 'पुरुषोत्तमयोग — संसार रूपी अश्वत्थ वृक्ष और परम पुरुषोत्तम',
  16: 'दैवासुरसंपद्विभागयोग — दैवी और आसुरी प्रवृत्तियों का विभाजन',
  17: 'श्रद्धात्रयविभागयोग — आहार, यज्ञ, तप और दान के तीन भेद',
  18: 'मोक्षसंन्यासयोग — गीता का परम उपदेश: सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज',
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
  const [selectedVideo, setSelectedVideo] = useState<{ id: string; title: string; chapter: number } | null>(null);

  const yogaFilters = [
    { id: 'all', label: 'सभी १८ अध्याय' },
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
      
      {/* ── BANNER HEADER (100% ISKCON Bhagavad Gita As It Is) ──────────── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#14172e] via-[#0d1020] to-[#14172e] border-2 border-amber-400/40 shadow-2xl space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-serif font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>इस्कॉन श्रील प्रभुपाद श्रीमद्भगवद्गीता यथारूप (Bhagavad-gita As It Is)</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-devanagari font-black text-amber-300">
          सम्पूर्ण १८ अध्याय वीडियो एवं अमृत प्रवचन मण्डल
        </h1>

        <p className="text-xs sm:text-base text-[#f5eed9]/85 font-serif max-w-3xl mx-auto leading-relaxed">
          इस्कॉन के संस्थापक आचार्य <strong>हिज डिवाइन ग्रेस ए.सी. भक्तिवेदांत स्वामी श्रील प्रभुपाद</strong> के 
          प्रामाणिक वैदिक दर्शन अनुसार सम्पूर्ण १८ अध्यायों का वीडियो सार, श्लोक पाठ एवं दिव्य श्रवण।
        </p>

        {/* Search & Filters */}
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2 pt-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/60" />
            <input
              type="text"
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              placeholder="अध्याय का नाम, योग या विषय खोजें (उदा. 'कर्मयोग', 'भक्ति')..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#080a14] border border-amber-400/30 text-xs font-serif text-[#f5eed9] placeholder-amber-400/40 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Yoga Path Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {yogaFilters.map(f => (
            <button
              key={f.id}
              onClick={() => {
                sacredAudio.playNavChime(0.04);
                setFilterYoga(f.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer ${
                filterYoga === f.id
                  ? 'bg-amber-400 text-black shadow-md scale-103'
                  : 'bg-[#101326] border border-amber-400/20 text-[#f5eed9]/80 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── ACTIVE VIDEO MODAL IF SELECTED ───────────────────────────────── */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-2xl animate-fade-in">
          <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden bg-[#0a0c18] border-2 border-amber-400/50 shadow-2xl flex flex-col">
            
            <div className="px-5 py-4 border-b border-amber-400/20 bg-[#060810] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-400/80">इस्कॉन श्रीमद्भगवद्गीता यथारूप</span>
                <h3 className="text-sm sm:text-base font-devanagari font-bold text-amber-300">
                  {selectedVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-amber-300 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.id}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="p-4 bg-[#080914] flex flex-wrap items-center justify-between gap-2 text-xs font-serif">
              <span className="text-amber-200">
                🛕 श्रील प्रभुपाद के प्रामाणिक तात्पर्य एवं इस्कॉन वैष्णव परम्परा के अनुसार।
              </span>
              <Link
                href={`/chapter/${selectedVideo.chapter}`}
                onClick={() => { setSelectedVideo(null); sacredAudio.playTempleBell(0.2); }}
                className="px-4 py-1.5 rounded-xl bg-amber-400 text-black font-bold flex items-center gap-1 hover:bg-amber-300 transition-colors"
              >
                सम्पूर्ण अध्याय पाठ खोलें <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      )}

      {/* ── 18 EPISODES GRID ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(ch => {
          const videoData = GITA_FULL_CHAPTER_VIDEOS[ch.number] || {
            id: '6sX74H9jmVI',
            title: `इस्कॉन श्रीमद्भगवद्गीता यथारूप — अध्याय ${toDN(ch.number)}`
          };

          return (
            <div
              key={ch.number}
              className="rounded-3xl bg-gradient-to-b from-[#121528] to-[#090b16] border-2 border-amber-400/25 hover:border-amber-400/70 shadow-xl overflow-hidden transition-all flex flex-col justify-between group"
            >
              {/* Artwork + Play Overlay */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <SacredArtworkImage
                  src={getArtworkForShloka(ch.number, 1)}
                  alt={`Chapter ${ch.number}`}
                  chapter={ch.number}
                  verse={1}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Chapter Number Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-amber-400/40 text-xs font-mono font-bold text-amber-300">
                  अध्याय {toDN(ch.number)}
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-amber-500/20 border border-amber-400/40 text-[10px] font-mono font-bold text-amber-200">
                  {YOGA_PATHS[ch.number]?.label || 'योग'}
                </div>

                {/* Video Play Button Trigger */}
                <button
                  onClick={() => {
                    sacredAudio.playNavChime(0.08);
                    setSelectedVideo({
                      id: videoData.id,
                      title: `इस्कॉन श्रीमद्भगवद्गीता यथारूप — अध्याय ${toDN(ch.number)}: ${ch.name_sanskrit}`,
                      chapter: ch.number
                    });
                  }}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-black shadow-[0_0_25px_rgba(245,158,11,0.8)] group-hover:scale-115 active:scale-95 transition-all">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </button>

                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-amber-300/80">
                  <span>🎥 इस्कॉन वीडियो कथा</span>
                  <span>{ch.verses_count} श्लोक</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-devanagari font-bold text-[#f5eed9] group-hover:text-amber-300 transition-colors">
                    {ch.name_sanskrit} ({ch.name_en})
                  </h3>

                  <p className="text-xs font-serif text-amber-200/90 font-bold">
                    ✦ {CHAPTER_HIGHLIGHTS[ch.number] || ch.summary_hi}
                  </p>

                  <p className="text-xs font-serif text-[#f5eed9]/70 line-clamp-2 leading-relaxed">
                    {ch.summary_hi}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-serif">
                  <button
                    onClick={() => {
                      sacredAudio.playNavChime(0.08);
                      setSelectedVideo({
                        id: videoData.id,
                        title: `इस्कॉन श्रीमद्भगवद्गीता यथारूप — अध्याय ${toDN(ch.number)}: ${ch.name_sanskrit}`,
                        chapter: ch.number
                      });
                    }}
                    className="text-amber-300 font-bold hover:text-yellow-200 flex items-center gap-1 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" /> वीडियो देखें
                  </button>

                  <Link
                    href={`/chapter/${ch.number}`}
                    onClick={() => sacredAudio.playTempleBell(0.2)}
                    className="text-teal-300 font-bold hover:text-white flex items-center gap-1"
                  >
                    श्लोक पाठ <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
