'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, X, 
  ChevronUp, ChevronDown, Clock, Sparkles, SlidersHorizontal, 
  ExternalLink, Disc3 
} from 'lucide-react';
import { useGlobalAudio } from '@/context/GlobalAudioContext';
import { MASTER_VIDEO_ID } from '@/data/gitaMasterAudioTimestamps';
import { sacredAudio } from '@/lib/sacredSounds';

export default function GlobalAudioDock() {
  const { 
    currentTrack, 
    isPlaying, 
    audioMode, 
    playbackSpeed, 
    sleepTimerRemaining,
    togglePlayPause, 
    stopAudio, 
    nextTrack, 
    prevTrack, 
    setPlaybackSpeed,
    setSleepTimer,
    setAudioMode 
  } = useGlobalAudio();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showTimerMenu, setShowTimerMenu] = useState(false);

  if (!currentTrack) return null;

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <>
      {/* ── EXPANDED VIDEO / FULL CONTROLS DRAWER ───────────────────────── */}
      {isExpanded && audioMode === 'youtube_master' && (
        <div className="fixed bottom-24 right-3 sm:right-6 z-50 w-full max-w-sm sm:max-w-md rounded-3xl bg-[#090b14]/95 backdrop-blur-2xl border-2 border-[#c5a059]/40 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] animate-fade-in space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-serif font-bold text-[#f5eed9]">
                यूट्यूब प्रामाणिक वाचन • {currentTrack.timestamp.formattedStart}
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-lg text-[#c5a059] hover:text-[#f5eed9]"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-[#c5a059]/20 shadow-inner">
            <iframe
              src={`https://www.youtube.com/embed/${MASTER_VIDEO_ID}?start=${currentTrack.timestamp.startSeconds}&autoplay=1&controls=1&enablejsapi=1&rel=0&modestbranding=1`}
              title="YouTube Gita Master Chanting"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* ── FLOATING DELUXE SACRED AUDIO DOCK ────────────────────────────── */}
      <div className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-50">
        <div className="relative rounded-full bg-[#0a0c16]/95 backdrop-blur-2xl border border-[#c5a059]/40 p-2 sm:p-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex items-center justify-between gap-3 ring-1 ring-[#f5eed9]/20">
          
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
                  अध्याय {currentTrack.chapter} · श्लोक {currentTrack.verse}
                </span>
                <ExternalLink className="w-2.5 h-2.5 text-[#c5a059]/60 group-hover:text-[#f5eed9] transition-colors" />
              </div>
              
              {/* Dynamic Equalizer Bars */}
              <div className="flex items-end gap-0.5 h-2.5">
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
                <span className="text-[9px] text-[#c5a059]/80 font-sans ml-1 truncate hidden xs:inline">
                  {currentTrack.speaker.name}
                </span>
              </div>
            </div>
          </Link>

          {/* Controls: [ Prev ] [ Play/Pause ] [ Next ] [ Options ] [ Close ] */}
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

            {/* YouTube Mode Toggle (Expand/Collapse) */}
            <button
              onClick={() => {
                if (audioMode === 'youtube_master') {
                  setIsExpanded(!isExpanded);
                } else {
                  setAudioMode('youtube_master');
                  setIsExpanded(true);
                }
                sacredAudio.playNavChime(0.05);
              }}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                audioMode === 'youtube_master'
                  ? 'bg-[#c5a059] text-black border-[#f5eed9]'
                  : 'bg-[#141624] text-[#c5a059]/70 border-[#c5a059]/25 hover:text-[#f5eed9]'
              }`}
              title="यूट्यूब शास्त्रीय वीडियो"
            >
              <Disc3 className="w-3.5 h-3.5" />
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
    </>
  );
}
