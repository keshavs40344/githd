'use client';

import React, { useState } from 'react';

interface SacredArtworkImageProps {
  src: string;
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
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-[#1c1409] via-[#0d0f19] to-[#120e06] flex flex-col items-center justify-center p-4 border border-[#c5a059]/30 text-center ${className}`}>
        {/* Sacred Golden Radial */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/25 via-amber-900/10 to-transparent pointer-events-none" />
        
        {/* Golden Sanskrit OM Calligraphy */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#c5a059] to-amber-700 p-0.5 shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center relative z-10 shrink-0">
          <div className="w-full h-full bg-[#0a0c16] rounded-2xl flex items-center justify-center">
            <span className="font-devanagari text-2xl sm:text-3xl font-bold text-[#f5eed9] drop-shadow">ॐ</span>
          </div>
        </div>

        <div className="relative z-10 mt-2 space-y-0.5 max-w-[90%]">
          <span className="text-[10px] font-mono font-bold text-amber-300 tracking-wider uppercase block truncate">
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
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
}
