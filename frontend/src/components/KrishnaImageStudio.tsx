'use client';

import React, { useState } from 'react';
import { Download, Sparkles, Search, RefreshCw, Share2, Check, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CHAPTERS } from '@/types/verse';
import { getChapterTheme } from '@/data/chapterThemes';
import { getArtworkForShloka } from '@/data/krishnaArtworks';
import { sacredAudio } from '@/lib/sacredSounds';
import SacredArtworkImage from '@/components/SacredArtworkImage';

const DN = ['०','१','२','३','४','५','६','७','८','९'];
const toDN = (n: number) => n.toString().split('').map(d => DN[+d]??d).join('');

const FEATURED_WALLPAPERS = [
  { ch: 2, v: 47, quote: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन', tag: 'कर्मयोग', size: '4K' },
  { ch: 18, v: 66, quote: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज', tag: 'मोक्ष', size: '4K' },
  { ch: 2, v: 20, quote: 'न जायते म्रियते वा कदाचित्', tag: 'आत्मा', size: 'HD' },
  { ch: 9, v: 22, quote: 'तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्', tag: 'भक्ति', size: '4K' },
  { ch: 6, v: 35, quote: 'अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते', tag: 'ध्यान', size: 'HD' },
  { ch: 11, v: 32, quote: 'कालोऽस्मि लोकक्षयकृत् प्रवृद्धो', tag: 'विश्वरूप', size: '4K' },
  { ch: 4, v: 7, quote: 'यदा यदा हि धर्मस्य ग्लानिर्भवति', tag: 'अवतार', size: 'HD' },
  { ch: 2, v: 23, quote: 'नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः', tag: 'आत्मा', size: '4K' },
  { ch: 3, v: 21, quote: 'यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः', tag: 'नेतृत्व', size: 'HD' },
];

export default function KrishnaImageStudio() {
  const [searchQ, setSearchQ] = useState('');
  const [downloaded, setDownloaded] = useState<string>('');
  const [filterTag, setFilterTag] = useState('all');

  const tags = ['all', 'कर्मयोग', 'भक्ति', 'ध्यान', 'मोक्ष', 'आत्मा', 'विश्वरूप', 'अवतार', 'नेतृत्व'];

  const filtered = FEATURED_WALLPAPERS.filter(w => {
    const matchTag = filterTag === 'all' || w.tag === filterTag;
    const matchQ = !searchQ || w.quote.includes(searchQ) || w.tag.includes(searchQ);
    return matchTag && matchQ;
  });

  const handleDownload = async (ch: number, v: number, label: string) => {
    sacredAudio.playTempleBell(0.3);
    const key = `${ch}_${v}`;
    setDownloaded(key);

    // Open the artwork URL in new tab (real download)
    const url = getArtworkForShloka(ch, v);
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.download = `DharmaOS_Shloka_${ch}_${v}.jpg`;
    a.click();

    setTimeout(() => setDownloaded(''), 3000);
  };

  const handleShare = (ch: number, v: number, quote: string) => {
    sacredAudio.playNavChime(0.06);
    const text = `"${quote}" — भगवद्गीता ${ch}.${v}\n\n🌐 https://githd.vercel.app/chapter/${ch}/${v}`;
    if (navigator.share) {
      navigator.share({ title: 'Dharma.OS — पवित्र श्लोक', text });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">

      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#130b1e] via-[#0d0f1e] to-[#0a0c1a] border border-purple-400/30 p-6 sm:p-10 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.12),transparent_70%)]" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Sacred Art Studio • HD Wallpapers • Free Download</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-devanagari font-black text-[#f5eed9]">
            श्रीकृष्ण <span className="text-purple-400">वॉलपेपर स्टूडियो</span>
          </h1>
          <p className="text-sm text-[#f5eed9]/60 font-serif max-w-xl mx-auto">
            पवित्र श्लोकों के HD wallpapers — Mobile, Desktop, और Social Media के लिए।<br/>
            डाउनलोड करें, शेयर करें — पूर्णतः मुफ़्त, बिना किसी watermark के।
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative mt-2">
            <Search className="w-4 h-4 text-purple-400/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="श्लोक या विषय खोजें…"
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#141624]/90 border border-purple-400/30 text-sm font-serif text-[#f5eed9] placeholder-purple-400/30 focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            {tags.map(t => (
              <button key={t}
                onClick={() => { setFilterTag(t); sacredAudio.playNavChime(0.04); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-serif border transition-all cursor-pointer ${
                  filterTag === t
                    ? 'bg-purple-500 text-white font-bold border-purple-300'
                    : 'bg-[#141624]/90 text-purple-300/70 border-purple-400/20 hover:border-purple-400'
                }`}
              >{t === 'all' ? '✨ सभी' : t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Wallpaper Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(w => {
          const theme = getChapterTheme(w.ch);
          const artUrl = getArtworkForShloka(w.ch, w.v);
          const key = `${w.ch}_${w.v}`;
          const isDownloaded = downloaded === key;

          return (
            <div key={key}
              className="group relative rounded-3xl overflow-hidden border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              style={{ borderColor: `${theme.primaryColor}35`, background: `linear-gradient(160deg, ${theme.glowColor}15, #080a14)` }}
            >
              {/* Artwork */}
              <div className="relative h-56 overflow-hidden">
                <SacredArtworkImage
                  src={artUrl}
                  alt={w.quote}
                  chapter={w.ch}
                  verse={w.v}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/85" />

                {/* Sanskrit quote over image */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="font-devanagari text-sm text-yellow-200 font-semibold leading-relaxed line-clamp-2 drop-shadow-lg">
                    {w.quote}…
                  </p>
                </div>

                {/* Badge chips top */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-black/60 text-amber-300 border border-amber-400/30">
                    ॥ {w.ch}.{w.v} ॥
                  </span>
                  <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-black/60 text-purple-300 border border-purple-400/30">
                    {w.size}
                  </span>
                </div>

                {/* Tag */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg text-[10px] font-serif font-bold bg-black/60 border border-white/10"
                  style={{ color: theme.accentHex }}>
                  {w.tag}
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 flex items-center gap-2">
                <button
                  onClick={() => handleDownload(w.ch, w.v, w.quote)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-serif font-bold transition-all cursor-pointer ${
                    isDownloaded
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:scale-[1.02]'
                  }`}
                >
                  {isDownloaded
                    ? <><Check className="w-3.5 h-3.5" /> डाउनलोड हो गया!</>
                    : <><Download className="w-3.5 h-3.5" /> HD Download</>
                  }
                </button>
                <button
                  onClick={() => handleShare(w.ch, w.v, w.quote)}
                  className="p-2.5 rounded-2xl bg-[#141624] border border-[#c5a059]/25 text-[#c5a059] hover:text-white hover:border-amber-400 cursor-pointer transition-all"
                  title="शेयर करें"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <Link href={`/chapter/${w.ch}/${w.v}`}
                  onClick={() => sacredAudio.playTempleBell(0.18)}
                  className="p-2.5 rounded-2xl bg-[#141624] border border-[#c5a059]/25 text-[#c5a059] hover:text-white hover:border-amber-400 cursor-pointer transition-all"
                  title="श्लोक पढ़ें"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-sm font-serif text-[#c5a059]/60">
          कोई wallpaper नहीं मिला। कृपया अन्य शब्द आज़माएं।
        </div>
      )}

      {/* All chapters CTA */}
      <div className="text-center py-4 border-t border-[#c5a059]/15">
        <p className="text-xs font-serif text-[#c5a059]/60 mb-3">सभी १८ अध्यायों के श्लोक-cards बनाना चाहते हैं?</p>
        <Link href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-sm font-serif font-bold hover:scale-105 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" /> मुख्य पृष्ठ पर जाएं <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
