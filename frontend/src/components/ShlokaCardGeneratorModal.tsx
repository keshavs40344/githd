'use client';

import React, { useRef, useState } from 'react';
import { X, Download, Share2, Sparkles, Check, Image as ImageIcon } from 'lucide-react';
import { useGlobalAudio } from '@/context/GlobalAudioContext';
import { getArtworkForShloka } from '@/data/krishnaArtworks';
import { sacredAudio } from '@/lib/sacredSounds';

export default function ShlokaCardGeneratorModal() {
  const { activeCardGeneratorVerse, setActiveCardGeneratorVerse } = useGlobalAudio();
  const [format, setFormat] = useState<'story' | 'square'>('story');
  const [downloading, setDownloading] = useState(false);

  if (!activeCardGeneratorVerse) return null;

  const artworkUrl = getArtworkForShloka(activeCardGeneratorVerse.chapter, activeCardGeneratorVerse.verse);

  const handleDownload = () => {
    setDownloading(true);
    sacredAudio.playTempleBell(0.4);
    
    // Create download canvas simulation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = format === 'story' ? 1080 : 1080;
    canvas.height = format === 'story' ? 1920 : 1080;

    if (ctx) {
      // Dark Vedic Gradient Background
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#101322');
      grad.addColorStop(0.5, '#0a0c16');
      grad.addColorStop(1, '#05060a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gold Border Frame
      ctx.strokeStyle = '#c5a059';
      ctx.lineWidth = 12;
      ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

      // Header Text
      ctx.fillStyle = '#e6c687';
      ctx.font = 'bold 36px serif';
      ctx.textAlign = 'center';
      ctx.fillText(`श्रीमद्भगवद्गीता • अध्याय ${activeCardGeneratorVerse.chapter}, श्लोक ${activeCardGeneratorVerse.verse}`, canvas.width / 2, 120);

      // Sanskrit Verse
      ctx.fillStyle = '#f5eed9';
      ctx.font = 'bold 44px sans-serif';
      const lines = (activeCardGeneratorVerse.devanagari || '').split('\n');
      lines.forEach((l: string, i: number) => {
        ctx.fillText(l, canvas.width / 2, 240 + i * 65);
      });

      // Hindi Translation
      ctx.fillStyle = '#c5a059';
      ctx.font = '32px serif';
      ctx.fillText(activeCardGeneratorVerse.translation_hi || '', canvas.width / 2, 450);

      // Watermark
      ctx.fillStyle = 'rgba(230, 198, 135, 0.6)';
      ctx.font = '24px serif';
      ctx.fillText('githd.vercel.app • Dharma.OS', canvas.width / 2, canvas.height - 70);

      // Trigger Download
      const link = document.createElement('a');
      link.download = `Gita_Shloka_${activeCardGeneratorVerse.chapter}_${activeCardGeneratorVerse.verse}_Wallpaper.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }

    setTimeout(() => setDownloading(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div 
        className="relative w-full max-w-xl rounded-3xl bg-[#0e111d] border-2 border-[#c5a059]/40 shadow-2xl p-5 sm:p-7 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-3">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#c5a059]" />
            <span className="text-xs font-serif font-bold text-[#e6c687]">
              दिव्य श्लोक वॉलपेपर व सोशल कार्ड मेकर
            </span>
          </div>
          <button
            onClick={() => setActiveCardGeneratorVerse(null)}
            className="p-1 rounded-xl text-[#c5a059]/70 hover:text-[#f5eed9]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Preview Card */}
        <div className={`relative mx-auto rounded-2xl overflow-hidden border-2 border-[#c5a059]/50 shadow-2xl bg-black ${
          format === 'story' ? 'aspect-[9/16] max-h-[380px]' : 'aspect-square max-h-[320px]'
        }`}>
          <img
            src={artworkUrl}
            alt="Krishna Wallpaper"
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-5 flex flex-col justify-between text-center">
            <span className="px-3 py-1 rounded-full bg-[#c5a059] text-black text-xs font-mono font-bold mx-auto">
              अध्याय {activeCardGeneratorVerse.chapter} • श्लोक {activeCardGeneratorVerse.verse}
            </span>

            <div className="space-y-2">
              <p className="text-sm sm:text-base font-devanagari font-bold text-[#f5eed9] leading-relaxed drop-shadow-md">
                {activeCardGeneratorVerse.devanagari}
              </p>
              <p className="text-xs text-[#e6c687] font-serif line-clamp-2 drop-shadow">
                {activeCardGeneratorVerse.translation_hi}
              </p>
            </div>

            <span className="text-[10px] font-mono text-[#c5a059]/70">
              githd.vercel.app • Dharma.OS
            </span>
          </div>
        </div>

        {/* Format Selector: [ Story (9:16) ] [ Post (1:1) ] */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => { setFormat('story'); sacredAudio.playNavChime(0.05); }}
            className={`px-4 py-2 rounded-xl text-xs font-serif transition-all cursor-pointer border ${
              format === 'story'
                ? 'bg-[#c5a059] text-black font-bold border-[#f5eed9]'
                : 'bg-[#141829] text-[#c5a059]/70 border-[#c5a059]/20'
            }`}
          >
            📱 WhatsApp / Instagram Story (9:16)
          </button>
          <button
            onClick={() => { setFormat('square'); sacredAudio.playNavChime(0.05); }}
            className={`px-4 py-2 rounded-xl text-xs font-serif transition-all cursor-pointer border ${
              format === 'square'
                ? 'bg-[#c5a059] text-black font-bold border-[#f5eed9]'
                : 'bg-[#141829] text-[#c5a059]/70 border-[#c5a059]/20'
            }`}
          >
            🖼️ Square Post / Wallpaper (1:1)
          </button>
        </div>

        {/* Download Action */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-amber-600 text-black font-serif font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl hover:scale-102 transition-transform cursor-pointer"
        >
          {downloading ? (
            <>
              <Check className="w-4 h-4 text-black" />
              <span>डाउनलोड हो रहा है...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-black" />
              <span>HD वॉलपेपर इमेज डाउनलोड करें 🪔</span>
            </>
          )}
        </button>

      </div>
    </div>
  );
}
