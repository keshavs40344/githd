'use client';

import React, { useState } from 'react';

interface SacredArtworkImageProps {
  src?: string;
  alt: string;
  className?: string;
  chapter?: number;
  verse?: number;
}

// 18 Majestic Vedic Chapter Themes (Colors, Gradients, Icons & Motifs)
const CHAPTER_THEMES: Record<number, {
  name: string;
  gradient: string;
  radialGlow: string;
  icon: string;
  sanskritSutra: string;
  borderColor: string;
}> = {
  1: {
    name: 'अर्जुनविषादयोग',
    gradient: 'from-[#2b1008] via-[#150a06] to-[#0a0c16]',
    radialGlow: 'from-orange-600/30 via-amber-900/20 to-transparent',
    icon: '🏹',
    sanskritSutra: 'धर्मक्षेत्रे कुरुक्षेत्रे',
    borderColor: 'border-orange-500/40'
  },
  2: {
    name: 'सांख्ययोग',
    gradient: 'from-[#2a1d04] via-[#140e02] to-[#0a0c16]',
    radialGlow: 'from-amber-400/35 via-yellow-900/20 to-transparent',
    icon: '🪔',
    sanskritSutra: 'न जायते म्रियते वा कदाचिन्',
    borderColor: 'border-amber-400/50'
  },
  3: {
    name: 'कर्मयोग',
    gradient: 'from-[#331105] via-[#1a0701] to-[#0a0c16]',
    radialGlow: 'from-red-600/30 via-orange-900/20 to-transparent',
    icon: '🔥',
    sanskritSutra: 'कर्मण्येवाधिकारस्ते मा फलेषु',
    borderColor: 'border-red-500/40'
  },
  4: {
    name: 'ज्ञानकर्मसंन्यासयोग',
    gradient: 'from-[#2e1503] via-[#160a01] to-[#0a0c16]',
    radialGlow: 'from-amber-500/30 via-amber-950/20 to-transparent',
    icon: '⚡',
    sanskritSutra: 'यदा यदा हि धर्मस्य ग्लानिर्भवति',
    borderColor: 'border-amber-500/40'
  },
  5: {
    name: 'कर्मसंन्यासयोग',
    gradient: 'from-[#03241b] via-[#01140e] to-[#0a0c16]',
    radialGlow: 'from-emerald-500/30 via-teal-950/20 to-transparent',
    icon: '🌸',
    sanskritSutra: 'पद्मपत्रमिवाम्भसा',
    borderColor: 'border-emerald-500/40'
  },
  6: {
    name: 'आत्मसंयमयोग',
    gradient: 'from-[#041a2f] via-[#020d18] to-[#0a0c16]',
    radialGlow: 'from-blue-500/30 via-cyan-950/20 to-transparent',
    icon: '🧘',
    sanskritSutra: 'यथा दीपो निवातस्थो नेङ्गते',
    borderColor: 'border-blue-500/40'
  },
  7: {
    name: 'ज्ञानविज्ञानयोग',
    gradient: 'from-[#1a082b] via-[#0d0417] to-[#0a0c16]',
    radialGlow: 'from-purple-500/30 via-indigo-950/20 to-transparent',
    icon: '🌌',
    sanskritSutra: 'मयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव',
    borderColor: 'border-purple-500/40'
  },
  8: {
    name: 'अक्षरब्रह्मयोग',
    gradient: 'from-[#2b1f04] via-[#140e02] to-[#0a0c16]',
    radialGlow: 'from-amber-300/35 via-yellow-950/20 to-transparent',
    icon: '🕉️',
    sanskritSutra: 'ओमित्येकाक्षरं ब्रह्म',
    borderColor: 'border-amber-400/50'
  },
  9: {
    name: 'राजविद्याराजगुह्ययोग',
    gradient: 'from-[#2e0821] via-[#170310] to-[#0a0c16]',
    radialGlow: 'from-pink-500/30 via-rose-950/20 to-transparent',
    icon: '👑',
    sanskritSutra: 'तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्',
    borderColor: 'border-pink-500/40'
  },
  10: {
    name: 'विभूतियोग',
    gradient: 'from-[#301c04] via-[#170c01] to-[#0a0c16]',
    radialGlow: 'from-amber-400/35 via-orange-950/20 to-transparent',
    icon: '☀️',
    sanskritSutra: 'अहमात्मा गुडाकेश सर्वभूताशयस्थितः',
    borderColor: 'border-amber-500/40'
  },
  11: {
    name: 'विश्वरूपदर्शनयोग',
    gradient: 'from-[#052933] via-[#021318] to-[#0a0c16]',
    radialGlow: 'from-cyan-400/40 via-blue-950/25 to-transparent',
    icon: '👁️',
    sanskritSutra: 'दिवि सूर्यसहस्रस्य भवेद्युगपदुत्थिता',
    borderColor: 'border-cyan-400/50'
  },
  12: {
    name: 'भक्तियोग',
    gradient: 'from-[#26052b] via-[#120215] to-[#0a0c16]',
    radialGlow: 'from-fuchsia-500/35 via-purple-950/20 to-transparent',
    icon: '🪈',
    sanskritSutra: 'मय्यावेश्य मनो ये मां नित्ययुक्ता उपासते',
    borderColor: 'border-fuchsia-500/40'
  },
  13: {
    name: 'क्षेत्रक्षेत्रज्ञविभागयोग',
    gradient: 'from-[#0d2605] via-[#061202] to-[#0a0c16]',
    radialGlow: 'from-lime-500/30 via-emerald-950/20 to-transparent',
    icon: '🌿',
    sanskritSutra: 'इदं शरीरं कौन्तेय क्षेत्रमित्यभिधीयते',
    borderColor: 'border-lime-500/40'
  },
  14: {
    name: 'गुणत्रयविभागयोग',
    gradient: 'from-[#241a05] via-[#120c02] to-[#0a0c16]',
    radialGlow: 'from-amber-500/30 via-yellow-950/20 to-transparent',
    icon: '⚖️',
    sanskritSutra: 'सत्त्वं रजस्तम इति गुणाः प्रकृतिसंभवाः',
    borderColor: 'border-amber-500/40'
  },
  15: {
    name: 'पुरुषोत्तमयोग',
    gradient: 'from-[#17082e] via-[#0b0316] to-[#0a0c16]',
    radialGlow: 'from-violet-500/35 via-purple-950/20 to-transparent',
    icon: '🌳',
    sanskritSutra: 'ऊर्ध्वमूलमधःशाखमश्वत्थं प्राहुरव्ययम्',
    borderColor: 'border-violet-500/40'
  },
  16: {
    name: 'दैवासुरसंपद्विभागयोग',
    gradient: 'from-[#290d05] via-[#140602] to-[#0a0c16]',
    radialGlow: 'from-rose-500/30 via-red-950/20 to-transparent',
    icon: '🛡️',
    sanskritSutra: 'अभयं सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः',
    borderColor: 'border-rose-500/40'
  },
  17: {
    name: 'श्रद्धात्रयविभागयोग',
    gradient: 'from-[#261c03] via-[#120d01] to-[#0a0c16]',
    radialGlow: 'from-amber-400/35 via-yellow-950/20 to-transparent',
    icon: '✨',
    sanskritSutra: 'ॐ तत्सदिति निर्देशो ब्रह्मणस्त्रिविधः',
    borderColor: 'border-amber-400/40'
  },
  18: {
    name: 'मोक्षसंन्यासयोग',
    gradient: 'from-[#331c03] via-[#1a0d01] to-[#0a0c16]',
    radialGlow: 'from-amber-400/40 via-yellow-900/30 to-transparent',
    icon: '👑',
    sanskritSutra: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज',
    borderColor: 'border-amber-400/60'
  }
};

export default function SacredArtworkImage({
  src,
  alt,
  className = '',
  chapter = 1,
  verse = 1
}: SacredArtworkImageProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const chNum = Math.max(1, Math.min(18, chapter));
  const theme = CHAPTERS_THEMES_SAFE(chNum);

  function CHAPTERS_THEMES_SAFE(c: number) {
    return CHAPTER_THEMES[c] || CHAPTER_THEMES[1];
  }

  // Always render a breathtaking, fail-proof Royal Vedic Artwork Canvas
  // If an external image URL is provided and has not failed, show it on top with smooth opacity
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${theme.gradient} flex flex-col items-center justify-center border ${theme.borderColor} ${className}`}>
      
      {/* Radiant Celestial Radial Glow */}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${theme.radialGlow} pointer-events-none`} />
      
      {/* Background Sacred Geometries & Sanskrit Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
        <span className="font-devanagari text-8xl sm:text-9xl font-bold text-amber-300">ॐ</span>
      </div>

      {/* Decorative Gold Border Corners */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#c5a059]/60 pointer-events-none" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#c5a059]/60 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#c5a059]/60 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#c5a059]/60 pointer-events-none" />

      {/* Center Sacred Emblem & Icon */}
      <div className="relative z-10 flex flex-col items-center justify-center p-3 text-center space-y-1.5 max-w-[90%]">
        
        {/* Glowing Icon Avatar */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#c5a059] to-amber-700 p-0.5 shadow-[0_0_30px_rgba(212,175,55,0.5)] flex items-center justify-center shrink-0 animate-pulse">
          <div className="w-full h-full bg-[#0a0c16] rounded-2xl flex items-center justify-center">
            <span className="text-2xl sm:text-3xl">{theme.icon}</span>
          </div>
        </div>

        {/* Devanagari Chapter & Sutra Banner */}
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-widest block drop-shadow">
            ॥ अध्याय {chNum} · {theme.name} ॥
          </span>
          <span className="text-[11px] font-devanagari font-medium text-[#f5eed9]/90 italic block line-clamp-1">
            {theme.sanskritSutra}
          </span>
        </div>

      </div>

      {/* Optional external image with graceful fade-in and instant fallback on error */}
      {src && !imageFailed && (
        <img
          src={src}
          alt={alt}
          onError={() => setImageFailed(true)}
          className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-40 hover:opacity-75 transition-opacity duration-700"
          loading="lazy"
        />
      )}

    </div>
  );
}
