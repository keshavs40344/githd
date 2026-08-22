'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, X, 
  ChevronUp, ChevronDown, Clock, Sparkles, SlidersHorizontal, 
  ExternalLink, Disc3, Music 
} from 'lucide-react';
import { useGlobalAudio } from '@/context/GlobalAudioContext';
import { sacredAudio } from '@/lib/sacredSounds';

const DEVANAGARI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
function toDevanagariNum(num: number): string {
  return num.toString().split('').map(d => DEVANAGARI_DIGITS[parseInt(d, 10)] || d).join('');
}

export default function GlobalAudioDock() {
  const { 
    currentTrack, 
    isPlaying, 
    currentTimeSec,
    togglePlayPause, 
    stopAudio, 
    nextTrack, 
    prevTrack 
  } = useGlobalAudio();

  if (!currentTrack) return null;

  const durationSec = currentTrack.timestamp.duration || 60;
  const progressPercent = Math.min(100, Math.max(0, (currentTimeSec / durationSec) * 100));

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-fade-in">
      <div className="relative rounded-full bg-[#0a0c16]/95 backdrop-blur-2xl border-2 border-[#c5a059]/40 p-2 sm:p-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.9)] flex items-center justify-between gap-3 ring-1 ring-[#f5eed9]/20">
        
        {/* Spinning Album Artwork + Track Meta */}
        <Link
          href={`/chapter/${currentTrack.chapter}/${currentTrack.verse}`}
          className="flex items-center gap-2.5 min-w-0 group cursor-pointer"
          onClick={() => sacredAudio.playNavChime(0.06)}
        >
          {/* Spinning Krishna Disc */}
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#c5a059]/60 shrink-0 shadow-md ${
            isPlaying ? 'animate-[spin_6s_linear_infinite]' : ''
          }`}>
            <img
              src={currentTrack.artwork.url}
              alt="Krishna Artwork"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono font-bold text-[#f5eed9] truncate group-hover:text-[#e6c687] transition-colors">
                ॥ अध्याय {toDevanagariNum(currentTrack.chapter)} · श्लोक {toDevanagariNum(currentTrack.verse)} ॥
              </span>
            </div>
            
            {/* Dynamic Equalizer & Artist Badge */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-end gap-0.5 h-2">
                {[40, 90, 60, 100, 75, 45, 80].map((h, i) => (
                  <span
                    key={i}
                    className="w-0.5 rounded-full bg-[#c5a059] transition-all"
                    style={{
                      height: isPlaying ? `${Math.max(25, (h * ((i % 3) + 1)) % 100)}%` : '20%',
                      animationDuration: `${0.4 + i * 0.1}s`
                    }}
                  />
                ))}
              </div>
              <span className="text-[9px] text-[#c5a059]/80 font-sans truncate">
                स्वर: शैलेन्द्र भारती ({formatTime(currentTimeSec)} / {formatTime(durationSec)})
              </span>
            </div>
          </div>
        </Link>

        {/* Controls: [ Prev ] [ Play/Pause ] [ Next ] [ Close ] */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          
          {/* Prev Shloka */}
          <button
            onClick={prevTrack}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/25 text-[#e6c687] flex items-center justify-center transition-all cursor-pointer"
            title="पिछला श्लोक"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          {/* Main Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-amber-400 via-[#c5a059] to-amber-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.6)] hover:scale-110 active:scale-95 transition-transform cursor-pointer border border-[#f5eed9]"
            title={isPlaying ? 'रोकें' : 'चलाएं'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          {/* Next Shloka */}
          <button
            onClick={nextTrack}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/25 text-[#e6c687] flex items-center justify-center transition-all cursor-pointer"
            title="अगला श्लोक"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Close / Stop */}
          <button
            onClick={stopAudio}
            className="w-6 h-6 rounded-full text-[#c5a059]/50 hover:text-[#f5eed9] hover:bg-red-500/20 flex items-center justify-center transition-colors ml-0.5 cursor-pointer"
            title="बंद करें"
          >
            <X className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </div>
  );
}
