'use client';

import React, { useState } from 'react';

// Reliable fallback HD Vedic/Spiritual images from Unsplash & Pixabay (CDN, always available)
const FALLBACK_ARTWORKS = [
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80',
];

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
  const [currentSrcIndex, setCurrentSrcIndex] = useState(-1); // -1 means use `src` prop
  const [imageLoaded, setImageLoaded] = useState(false);
  const [allFailed, setAllFailed] = useState(false);

  // Which src are we currently using?
  const activeSrc = currentSrcIndex === -1
    ? src
    : FALLBACK_ARTWORKS[currentSrcIndex % FALLBACK_ARTWORKS.length];

  const handleError = () => {
    const nextIdx = currentSrcIndex + 1;
    if (nextIdx < FALLBACK_ARTWORKS.length) {
      setCurrentSrcIndex(nextIdx);
      setImageLoaded(false);
    } else {
      setAllFailed(true);
    }
  };

  // Sacred OM fallback canvas when ALL images fail
  if (allFailed || !activeSrc) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-[#1c1409] via-[#0d0f19] to-[#120e06] flex flex-col items-center justify-center p-4 ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.25),transparent_70%)]" />
        <div className="relative z-10 flex flex-col items-center gap-2 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4af37] to-amber-700 flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.5)]">
            <span className="font-devanagari text-3xl font-black text-[#07080d]">ॐ</span>
          </div>
          <span className="text-[10px] font-mono text-amber-400 font-bold tracking-widest">॥ श्रीमद्भगवद्गीता ॥</span>
          <span className="text-xs font-devanagari font-bold text-[#f5eed9]/90 line-clamp-2">{alt || `अध्याय ${chapter}`}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#090b14] ${className}`}>
      {/* Loading Skeleton Shimmer */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#141624] via-[#1c2033] to-[#141624] animate-pulse" />
      )}

      <img
        key={activeSrc}
        src={activeSrc}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover transition-all duration-700 ${
          imageLoaded ? 'opacity-100 scale-100 brightness-100 contrast-[1.05]' : 'opacity-0 scale-105'
        }`}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
