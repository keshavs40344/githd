'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Download, Eye, Sparkles, Heart, Share2, Check, 
  Maximize2, X, Feather, Flower2, Image as ImageIcon
} from 'lucide-react';
import { KRISHNA_ARTWORKS, KrishnaArt } from '@/data/krishnaArtworks';
import { sacredAudio } from '@/lib/sacredSounds';

const CATEGORIES = [
  { id: 'all', label: 'सभी कृष्ण वॉलपेपर (All)' },
  { id: 'yugal', label: '🪷 राधा-कृष्ण युगल' },
  { id: 'parthasarathi', label: '🏹 पार्थसारथी गीता उपदेश' },
  { id: 'bansuri', label: '🦚 बाँसुरी व बांके बिहारी' },
  { id: 'vishwaroop', label: '🌌 विश्वरूप विराट दर्शन' },
  { id: 'makhan_chor', label: '🧈 बाल गोपाल माखनचोर' },
  { id: 'govardhan', label: '⛰️ गोवर्धन लीला' },
];

export default function KrishnaWallpaperGallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [previewArt, setPreviewArt] = useState<KrishnaArt | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const filteredArtworks = activeCategory === 'all'
    ? KRISHNA_ARTWORKS
    : KRISHNA_ARTWORKS.filter(art => art.category === activeCategory);

  const handleDownload = (art: KrishnaArt) => {
    sacredAudio.playFluteChime(0.3);
    setDownloadSuccessId(art.id);
    
    // Create direct download trigger
    const link = document.createElement('a');
    link.href = art.url;
    link.download = `Krishna_Wallpaper_${art.id}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloadSuccessId(null), 3000);
  };

  const handleOpenPreview = (art: KrishnaArt) => {
    sacredAudio.playNavChime(0.08);
    setPreviewArt(art);
  };

  return (
    <section id="wallpapers" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-serif font-bold shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>१००% शुद्ध श्री कृष्ण एवं श्री राधा HD वॉलपेपर गैलरी</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-devanagari font-black text-[#f5eed9] drop-shadow-md">
          श्री राधा-कृष्ण दिव्य वॉलपेपर एवं कला दर्शन
        </h2>

        <p className="text-xs sm:text-sm font-serif text-amber-200/80 max-w-2xl mx-auto leading-relaxed">
          अपने मोबाइल और कंप्यूटर के लिए अत्यंत उच्च-गुणवत्ता (Ultra-HD 4K) के पावन श्री कृष्ण वॉलपेपर निःशुल्क डाउनलोड करें और नित्य दर्शन का आनंद लें।
        </p>
      </div>

      {/* ── CATEGORY FILTER TABS ─────────────────────────────────────────── */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              sacredAudio.playNavChime(0.05);
              setActiveCategory(cat.id);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-serif font-bold whitespace-nowrap transition-all cursor-pointer shadow-sm ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-103'
                : 'bg-[#101326] border border-amber-400/20 text-[#f5eed9]/80 hover:border-amber-400/50 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── WALLPAPERS GRID ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredArtworks.map(art => (
          <div
            key={art.id}
            className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#13162b] to-[#0a0c16] border-2 border-amber-400/25 shadow-xl hover:border-amber-400/60 hover:shadow-[0_10px_40px_rgba(245,158,11,0.25)] transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Container */}
            <div className="relative h-64 w-full overflow-hidden bg-[#07080f] cursor-pointer" onClick={() => handleOpenPreview(art)}>
              <img
                src={art.url}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c16] via-transparent to-transparent opacity-80" />

              {/* Top Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/30 font-bold">
                  {art.tags[0]}
                </span>
              </div>

              {/* Fullscreen Preview Hover Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenPreview(art);
                }}
                className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-md text-amber-300 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="पूर्ण स्क्रीन दर्शन"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Card Content */}
            <div className="p-4 space-y-3 text-left">
              <div className="space-y-1">
                <h3 className="text-sm font-devanagari font-bold text-[#f5eed9] group-hover:text-amber-300 transition-colors line-clamp-1">
                  {art.title}
                </h3>
                <p className="text-[11px] font-serif text-amber-200/70 line-clamp-2 leading-relaxed">
                  {art.subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-amber-400/15">
                <button
                  onClick={() => handleOpenPreview(art)}
                  className="text-xs font-serif text-amber-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>दर्शन करें</span>
                </button>

                <button
                  onClick={() => handleDownload(art)}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-black text-xs font-serif font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  {downloadSuccessId === art.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
                  <span>{downloadSuccessId === art.id ? 'डाउनलोड शुरू!' : 'HD 4K डाउनलोड'}</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* ── FULLSCREEN PREVIEW MODAL ─────────────────────────────────────── */}
      {previewArt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-[#090b16] border-2 border-amber-400/50 shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-amber-400/20 bg-[#07080f]">
              <h4 className="text-sm sm:text-base font-devanagari font-bold text-amber-300 truncate">
                {previewArt.title}
              </h4>

              <button
                onClick={() => setPreviewArt(null)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-amber-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="relative flex-1 overflow-hidden bg-black flex items-center justify-center min-h-[320px] sm:min-h-[480px]">
              <img
                src={previewArt.url}
                alt={previewArt.title}
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>

            {/* Modal Footer Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-t border-amber-400/20 bg-[#07080f]">
              <p className="text-xs font-serif text-amber-200/80 max-w-lg truncate">
                {previewArt.subtitle}
              </p>

              <button
                onClick={() => handleDownload(previewArt)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 text-black font-serif font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>अल्ट्रा HD वॉलपेपर डाउनलोड करें</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
