'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Radio, Disc3, Sparkles, BookOpen, Layers } from 'lucide-react';
import { sacredAudio } from '@/lib/sacredSounds';

interface AudioControllerProps {
  sanskritVerse?: string;
  chapter: number;
  verse: number;
}

export default function AudioController({ chapter, verse }: AudioControllerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [streamSource, setStreamSource] = useState<'gita_series' | 'bhagwat_katha'>('gita_series');
  const [playbackSeconds, setPlaybackSeconds] = useState(0);

  // Time tracker
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // When chapter changes, reset playback timer
  useEffect(() => {
    setPlaybackSeconds(0);
  }, [chapter]);

  const togglePlay = () => {
    sacredAudio.playNavChime(0.12);
    setIsPlaying(!isPlaying);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Chapter playlist index: Chapter 1 is index 0, Chapter 2 is index 1, etc.
  const playlistIndex = Math.max(0, chapter - 1);

  // Stream URLs for pure audio (hidden iframe)
  const gitaPlaylistId = 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP';
  const kathaPlaylistId = 'PL5A5QJkW7MkvYslAbg7_rFij8yVEeiEwF';

  const activePlaylistId = streamSource === 'gita_series' ? gitaPlaylistId : kathaPlaylistId;
  const activePlaylistTitle = streamSource === 'gita_series' 
    ? `अध्याय ${chapter} — गीता सम्पूर्ण श्लोक व व्याख्या`
    : `प्रसंग ${Math.min(14, chapter)} — श्रीमद्भागवत कथा व्याख्या`;

  const iframeSrc = `https://www.youtube.com/embed/videoseries?list=${activePlaylistId}&index=${playlistIndex}&autoplay=1&enablejsapi=1&rel=0&controls=0&modestbranding=1`;

  return (
    <div className="w-full space-y-4">
      
      {/* Hidden Audio-Only Stream Engine */}
      <div className="fixed -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none" aria-hidden="true">
        {isPlaying && (
          <iframe
            key={`${activePlaylistId}-${playlistIndex}-${isPlaying}-${streamSource}`}
            src={iframeSrc}
            title="Chapter Audio Stream"
            allow="autoplay"
          />
        )}
      </div>

      {/* Main Console Box */}
      <div className="bg-gradient-to-br from-obsidian-900 via-obsidian-900 to-amber-950/30 border border-gold-500/25 rounded-3xl p-5 shadow-xl space-y-4">
        
        {/* Stream Source Toggle Tabs */}
        <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-obsidian-950/80 border border-gold-500/15">
          <button
            onClick={() => {
              setStreamSource('gita_series');
              setPlaybackSeconds(0);
              sacredAudio.playNavChime(0.1);
            }}
            className={`py-2 px-2.5 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer truncate ${
              streamSource === 'gita_series'
                ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 font-bold shadow-md'
                : 'text-gold-300/70 hover:text-gold-100'
            }`}
          >
            📖 गीता श्लोक पाठ
          </button>

          <button
            onClick={() => {
              setStreamSource('bhagwat_katha');
              setPlaybackSeconds(0);
              sacredAudio.playNavChime(0.1);
            }}
            className={`py-2 px-2.5 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer truncate ${
              streamSource === 'bhagwat_katha'
                ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 font-bold shadow-md'
                : 'text-gold-300/70 hover:text-gold-100'
            }`}
          >
            📜 भागवत कथा पाठ
          </button>
        </div>

        {/* Golden Vinyl / Chakra Center Widget */}
        <div className="flex flex-col items-center justify-center space-y-3 pt-2">
          
          <div className="relative">
            {/* Spinning Aura */}
            <div className={`w-28 h-28 rounded-full p-1.5 bg-gradient-to-tr from-gold-400/40 via-amber-500/30 to-amber-800/40 shadow-[0_0_30px_rgba(232,163,32,0.3)] flex items-center justify-center transition-all ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}>
              <div className="w-full h-full rounded-full bg-obsidian-950 border-2 border-gold-500/30 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-2 rounded-full border border-gold-500/10" />
                <div className="absolute inset-4 rounded-full border border-gold-500/15" />
                <span className="text-2xl font-bold font-devanagari text-gold-200 text-glow-gold">
                  ॐ
                </span>
                <div className="w-2.5 h-2.5 rounded-full bg-obsidian-950 border border-gold-400 absolute" />
              </div>
            </div>

            {/* Live Indicator */}
            <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-black/85 border border-gold-500/30 flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-gold-500/30'}`} />
              <span className="text-[9px] font-mono text-gold-300 font-bold">
                {isPlaying ? 'LIVE' : 'AUDIO'}
              </span>
            </div>
          </div>

          {/* Equalizer Wave Bars */}
          <div className="flex items-end justify-center gap-1 h-5">
            {[40, 80, 60, 95, 70, 85, 50, 100, 75, 90, 65].map((h, i) => (
              <div
                key={i}
                className={`w-1 rounded-full bg-gradient-to-t from-gold-500 to-amber-300 transition-all ${
                  isPlaying ? 'animate-pulse' : 'opacity-25'
                }`}
                style={{
                  height: isPlaying ? `${Math.max(20, (h * ((i % 3) + 1)) % 100)}%` : '20%',
                  animationDelay: `${i * 70}ms`
                }}
              />
            ))}
          </div>

          {/* Title & Chapter Details */}
          <div className="text-center space-y-1">
            <h4 className="text-xs font-bold text-gold-100 font-display line-clamp-1">
              {activePlaylistTitle}
            </h4>
            <div className="text-[10px] font-mono text-gold-400/80">
              अध्याय {chapter} • श्लोक {verse}
            </div>
          </div>

        </div>

        {/* Progress & Timing */}
        <div className="space-y-1 pt-1">
          <div className="w-full bg-obsidian-950 h-1.5 rounded-full overflow-hidden border border-gold-500/15">
            <div
              className="h-full bg-gradient-to-r from-gold-500 to-amber-500 transition-all rounded-full"
              style={{ width: `${Math.min(100, (playbackSeconds % 180) / 1.8)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-gold-400/70">
            <span>{formatTime(playbackSeconds)}</span>
            <span>अध्याय ऑडियो स्ट्रीम</span>
          </div>
        </div>

        {/* Play / Pause Big Button */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <button
            onClick={togglePlay}
            className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 hover:from-gold-300 hover:to-amber-500 text-obsidian-950 font-bold text-xs sm:text-sm font-sans flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(232,163,32,0.4)] active:scale-95 transition-all cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>ऑडियो रोकें (Pause)</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current ml-0.5" />
                <span>अध्याय {chapter} ऑडियो सुनें (Play)</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
