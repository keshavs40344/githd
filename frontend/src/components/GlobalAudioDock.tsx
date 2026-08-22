'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, X, 
  ChevronUp, ChevronDown, Sparkles, SlidersHorizontal, 
  ExternalLink, Disc3, Music 
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
    prevTrack 
  } = useGlobalAudio();

  const [showEmbeddedPlayer, setShowEmbeddedPlayer] = useState(false);

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
      
      {/* Expandable Embedded Video/Sound Player */}
      {showEmbeddedPlayer && (
        <div className="mb-3 rounded-2xl bg-[#090b14]/95 backdrop-blur-2xl border border-[#c5a059]/40 p-3 shadow-2xl space-y-2 animate-fade-in">
          <div className="flex items-center justify-between text-xs font-serif text-[#f5eed9]">
            <span>प्रामाणिक शास्त्रीय वाचन (स्वर: शैलेन्द्र भारती)</span>
            <button
              onClick={() => setShowEmbeddedPlayer(false)}
              className="text-[#c5a059] hover:text-[#f5eed9] p-1 cursor-pointer"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-[#c5a059]/20">
            <iframe
              src={`https://www.youtube.com/embed/${MASTER_VIDEO_ID}?start=${currentTrack.timestamp.startSeconds}&autoplay=1&controls=1&enablejsapi=1`}
              title="Gita Shloka Audio"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>
      )}

      {/* Floating Audio Pill Dock */}
      <div className="relative rounded-full bg-[#0a0c16]/95 backdrop-blur-2xl border-2 border-[#c5a059]/40 p-2 sm:p-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.9)] flex items-center justify-between gap-3 ring-1 ring-[#f5eed9]/20">
        
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
              <span className="text-[11px] font-mono font-bold text-[#f5eed9] truncate group-hover:text-[#e6c687] transition-colors">
                ॥ अध्याय {toDevanagariNum(currentTrack.chapter)} · श्लोक {toDevanagariNum(currentTrack.verse)} ॥
              </span>
            </div>
            
            {/* Equalizer & Time */}
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

        {/* Controls: [ Prev ] [ Play/Pause ] [ Next ] [ Expand Player ] [ Close ] */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          
          <button
            onClick={prevTrack}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/25 text-[#e6c687] flex items-center justify-center transition-all cursor-pointer"
            title="पिछला श्लोक"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={togglePlayPause}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-amber-400 via-[#c5a059] to-amber-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.6)] hover:scale-110 active:scale-95 transition-transform cursor-pointer border border-[#f5eed9]"
            title={isPlaying ? 'रोकें' : 'चलाएं'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          <button
            onClick={nextTrack}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/25 text-[#e6c687] flex items-center justify-center transition-all cursor-pointer"
            title="अगला श्लोक"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setShowEmbeddedPlayer(!showEmbeddedPlayer)}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/25 text-[#c5a059] flex items-center justify-center transition-all cursor-pointer"
            title="विस्तृत प्लेयर खोलें"
          >
            {showEmbeddedPlayer ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>

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
