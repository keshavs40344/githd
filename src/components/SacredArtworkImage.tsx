'use client';

import React, { useState } from 'react';

interface SacredArtworkImageProps {
  src?: string;
  alt: string;
  className?: string;
  chapter?: number;
  verse?: number;
}

export default function SacredArtworkImage({
  src,
  alt,
  className = '',
  chapter = 1,
  verse = 1
}: SacredArtworkImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // If image fails to load, render a gorgeous golden Vedic canvas
  if (imageError || !src) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-[#1c1409] via-[#0d0f19] to-[#120e06] flex flex-col items-center justify-center p-4 border border-[#c5a059]/40 text-center ${className}`}>
        {/* Sacred Golden Radial */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/30 via-amber-900/15 to-transparent pointer-events-none" />
        
        {/* Golden Sanskrit OM Calligraphy */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#c5a059] to-amber-700 p-0.5 shadow-[0_0_25px_rgba(212,175,55,0.5)] flex items-center justify-center relative z-10 shrink-0">
          <div className="w-full h-full bg-[#0a0c16] rounded-2xl flex items-center justify-center">
            <span className="font-devanagari text-3xl font-bold text-amber-300 drop-shadow">ॐ</span>
          </div>
        </div>

        <div className="relative z-10 mt-2 space-y-0.5 max-w-[90%]">
          <span className="text-[11px] font-mono font-bold text-amber-300 tracking-widest uppercase block truncate">
            ॥ श्रीमद्भगवद्गीता ॥
          </span>
          <span className="text-xs font-devanagari font-bold text-[#f5eed9] line-clamp-1 block">
            {alt || `अध्याय ${chapter}`}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#090b14] ${className}`}>
      {/* Loading Skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#141624] via-[#1c1f33] to-[#141624] animate-pulse" />
      )}

      {/* Full 100% Brightness & Vivid Quality HD Artwork */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        className={`w-full h-full object-cover transition-all duration-500 ${
          imageLoaded ? 'opacity-100 scale-100 filter brightness-100 contrast-105' : 'opacity-0 scale-95'
        }`}
        loading="lazy"
      />
    </div>
  );
}
