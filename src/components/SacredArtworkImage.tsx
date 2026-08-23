'use client';

import React, { useState } from 'react';
import { Sparkles, Feather } from 'lucide-react';

interface SacredArtworkImageProps {
  src?: string;
  alt: string;
  className?: string;
  chapter?: number;
  verse?: number;
  theme?: 'yugal' | 'parthasarathi' | 'vishwaroop' | 'bansuri' | 'balgopal';
}

export default function SacredArtworkImage({
  src,
  alt,
  className = '',
  chapter = 1,
  verse = 1,
  theme = 'bansuri'
}: SacredArtworkImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // High-Resolution Curated Krishna Artworks with instant CDN caching
  const isExternalAvailable = src && !hasError;

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#0c0e1a] via-[#080912] to-[#04050a] flex items-center justify-center ${className}`}>
      
      {/* ── 0-MILLISECOND INSTANT SACRED VECTOR KRISHNA DARSHAN BACKGROUND ──── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
        
        {/* Divine Golden & Peacock Aura Radial Glow */}
        <div className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-amber-400/20 via-teal-400/20 to-amber-600/20 blur-3xl animate-pulse pointer-events-none" />
        
        {/* Sacred Geometry Mandala Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.12)_0%,_transparent_70%)]" />

        {/* Central Divine Deity Silhouette & Symbols */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          
          {/* Mayur Pankh & Tilak Holy Icon */}
          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 via-teal-400 to-amber-600 p-0.5 shadow-[0_0_40px_rgba(0,210,180,0.4)] flex items-center justify-center animate-float-smooth">
            <div className="w-full h-full rounded-[22px] bg-[#070914] flex flex-col items-center justify-center relative overflow-hidden">
              <span className="text-3xl filter drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]">🦚</span>
              <span className="text-[9px] font-devanagari font-bold text-amber-300 -mt-1">॥ श्री राधे ॥</span>
            </div>
          </div>

          {/* Sacred Devanagari Title */}
          <div className="space-y-1">
            <p className="font-devanagari font-bold text-sm sm:text-base text-amber-300 drop-shadow-md">
              {alt || 'श्री राधा-कृष्ण दिव्य दर्शन'}
            </p>
            <p className="text-[10px] font-serif text-amber-200/70">
              अध्याय {chapter} {verse ? `• श्लोक ${verse}` : ''}
            </p>
          </div>

          {/* Bansuri & Lotus Motif */}
          <div className="flex items-center gap-2 text-xs text-amber-400/80 pt-1">
            <span>🪷</span>
            <span className="text-[11px] font-mono tracking-widest text-teal-300 font-bold">ॐ नमो भगवते वासुदेवाय</span>
            <span>🪷</span>
          </div>

        </div>

      </div>

      {/* ── EXTERNAL IMAGE LAYER (Smooth Fade In on High Speed Load) ───────── */}
      {isExternalAvailable && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setImageLoaded(true)}
          onError={() => setHasError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out z-20 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
      )}

      {/* Subtle Bottom Vignette Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#05060b] via-[#05060b]/60 to-transparent z-30 pointer-events-none" />

    </div>
  );
}
