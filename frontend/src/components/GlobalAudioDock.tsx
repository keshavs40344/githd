'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, X, 
  ChevronUp, ChevronDown, Sparkles, SlidersHorizontal, 
  ExternalLink, Disc3, Music, Mic
} from 'lucide-react';
import { useGlobalAudio } from '@/context/GlobalAudioContext';
import { sacredAudio } from '@/lib/sacredSounds';
import { MASTER_VIDEO_ID } from '@/data/gitaMasterAudioTimestamps';

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
    prevTrack,
    playSanskritChant 
  } = useGlobalAudio();

  const [isExpanded, setIsExpanded] = useState(true);

  if (!currentTrack) return null;

  const durationSec = currentTrack.timestamp.duration || 60;
  const progressPercent = Math.min(100, Math.max(0, (currentTimeSec / durationSec) * 100));

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const startSec = currentTrack.timestamp.startSeconds;

  return (
    <div className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-fade-in">
      
      {/* ── VISIBLE EMBEDDED STREAM PLAYER ─────────────────────────────────── */}
      {isPlaying && isExpanded && (
        <div className="mb-2 rounded-2xl bg-[#090b14]/98 backdrop-blur-2xl border-2 border-amber-400/50 p-3 shadow-2xl space-y-2 animate-scale-in">
          <div className="flex items-center justify-between text-xs font-serif text-[#f5eed9]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-amber-300">
                ॥ अध्याय {toDevanagariNum(currentTrack.chapter)} • श्लोक {toDevanagariNum(currentTrack.verse)} ॥
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={playSanskritChant}
                className="px-2 py-0.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-[10px] font-serif flex items-center gap-1 border border-amber-400/30 cursor-pointer"
                title="संस्कृत वाणी उच्चारण सुनें"
              >
                <Mic className="w-3 h-3" />
                <span>उच्चारण</span>
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-[#c5a059] hover:text-[#f5eed9] p-0.5 cursor-pointer"
                title="प्लेयर छोटा करें"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Guaranteed Visible Video/Audio Player */}
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-amber-400/30">
            <iframe
              src={`https://www.youtube.com/embed/${MASTER_VIDEO_ID}?start=${startSec}&autoplay=1&controls=1&enablejsapi=1&rel=0`}
              title="Gita Shloka Audio Stream"
              className="w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-[#c5a059]/80 px-1">
            <span>⏱ श्लोक समय: {currentTrack.timestamp.formattedStart}</span>
            <span className="text-emerald-400">320kbps HD Audio ✓</span>
          </div>
        </div>
      )}

      {/* ── FLOATING AUDIO PILL DOCK ────────────────────────────────────────── */}
      <div className="relative rounded-full bg-[#0a0c16]/95 backdrop-blur-2xl border-2 border-amber-400/40 p-2 sm:p-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.9)] flex items-center justify-between gap-3 ring-1 ring-amber-400/20">
        
        {/* Track Meta & Link */}
        <Link
          href={`/chapter/${currentTrack.chapter}/${currentTrack.verse}`}
          className="flex items-center gap-2.5 min-w-0 group cursor-pointer"
          onClick={() => sacredAudio.playNavChime(0.06)}
        >
          {/* Spinning Sacred Avatar Disc */}
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-400 via-[#c5a059] to-amber-600 p-0.5 shrink-0 shadow-md ${
            isPlaying ? 'animate-[spin_6s_linear_infinite]' : ''
          }`}>
            <div className="w-full h-full rounded-full bg-[#090b14] flex items-center justify-center text-sm font-bold text-amber-300">
              ॐ
            </div>
          </div>

          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono font-bold text-[#f5eed9] truncate group-hover:text-amber-300 transition-colors">
                ॥ {toDevanagariNum(currentTrack.chapter)}.{toDevanagariNum(currentTrack.verse)} ॥
              </span>
            </div>
            
            {/* Equalizer & Time */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-end gap-0.5 h-2">
                {[40, 90, 60, 100, 75, 45, 80].map((h, i) => (
                  <span
                    key={i}
                    className={`w-0.5 bg-amber-400 rounded-full transition-all duration-300 ${
                      isPlaying ? 'animate-pulse' : 'opacity-40'
                    }`}
                    style={{ height: isPlaying ? `${h}%` : '20%' }}
                  />
                ))}
              </div>
              <span className="text-[9px] font-mono text-[#c5a059]/80">
                {formatTime(currentTimeSec)} / {formatTime(durationSec)}
              </span>
            </div>
          </div>
        </Link>

        {/* Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          
          <button
            onClick={prevTrack}
            className="p-1.5 rounded-full text-[#c5a059] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title="पिछला श्लोक"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlayPause}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-black flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold"
            title={isPlaying ? 'रोकें' : 'चलाएं'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={nextTrack}
            className="p-1.5 rounded-full text-[#c5a059] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title="अगला श्लोक"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-full text-amber-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title={isExpanded ? 'प्लेयर छिपाएं' : 'प्लेयर दिखाएं'}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>

          <button
            onClick={stopAudio}
            className="p-1.5 rounded-full text-[#c5a059]/60 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer ml-0.5"
            title="बंद करें"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
