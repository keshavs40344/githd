'use client';

import React, { useEffect } from 'react';
import { RefreshCw, AlertTriangle, Home, Sparkles } from 'lucide-react';
import { sacredAudio } from '@/lib/sacredSounds';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dharma.OS runtime error caught:', error);
  }, [error]);

  const handleReset = () => {
    sacredAudio.playTempleBell(0.35);
    reset();
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-gold-100 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Cosmic background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-obsidian-900/90 border border-gold-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 relative z-10 backdrop-blur-xl">
        
        {/* Sacred Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-gold-600/20 border border-gold-400/40 mx-auto flex items-center justify-center text-gold-300 shadow-[0_0_20px_rgba(232,163,32,0.3)]">
          <span className="font-devanagari text-2xl font-bold">ॐ</span>
        </div>

        <div className="space-y-2">
          <h2 className="font-devanagari text-xl font-bold text-gold-100">
            विघ्नं निवारितम् (Temporary Hindrance)
          </h2>
          <p className="text-xs text-gold-300/70 leading-relaxed font-sans">
            साधना पथ में क्षणिक अवरोध आया है। कृपया पुनः प्रयास करें।
          </p>
          <p className="text-[11px] font-mono text-gold-500/50 truncate max-w-xs mx-auto">
            {error?.message || 'Unexpected application boundary catch'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleReset}
            className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 text-obsidian-950 font-bold text-xs font-sans shadow-lg hover:scale-102 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>पुनः आरम्भ (Retry)</span>
          </button>

          <button
            onClick={() => window.location.href = '/'}
            className="py-3 px-4 rounded-2xl bg-obsidian-800 hover:bg-obsidian-700 text-gold-300 border border-gold-500/25 text-xs font-sans flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>गृह (Home)</span>
          </button>
        </div>

      </div>

    </div>
  );
}
