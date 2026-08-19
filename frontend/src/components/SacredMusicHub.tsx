'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  SACRED_YOUTUBE_PLAYLISTS, YouTubePlaylistItem 
} from '@/data/youtubePlaylists';
import { 
  Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, 
  Volume2, VolumeX, Search, Filter, Sparkles, Music, 
  PlusCircle, Heart, Radio, Disc3, Layers, Share2, 
  ExternalLink, Waves, List, Grid, BookOpen 
} from 'lucide-react';


import { Button } from './ui/Button';
import { sacredAudio } from '@/lib/sacredSounds';

type CategoryFilter = 'all' | 'gita_english' | 'bhagwat_katha' | 'bhajan' | 'relaxing_meditation' | 'kirtan';

const CATEGORIES: { id: CategoryFilter; label: string; icon: string }[] = [
  { id: 'all',                 label: 'सभी दिव्य संगीत (All)',       icon: '🌟' },
  { id: 'gita_english',       label: 'गीता अंग्रेजी पाठ (Gita)',    icon: '📖' },
  { id: 'bhagwat_katha',      label: 'भागवत महापुराण (Katha)',      icon: '📜' },
  { id: 'bhajan',             label: 'कृष्ण व OFI भजन (Bhajans)',   icon: '🪕' },
  { id: 'relaxing_meditation',label: 'मन शांति संगीत (432Hz)',      icon: '🧘' },
  { id: 'kirtan',             label: 'महासंकीर्तन (Kirtan)',        icon: '🪘' },
];


export default function SacredMusicHub() {
  const [playlists, setPlaylists] = useState<YouTubePlaylistItem[]>(SACRED_YOUTUBE_PLAYLISTS);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [episodeSearchQuery, setEpisodeSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Custom YouTube adder
  const [customUrl, setCustomUrl] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Simulated playback time progression
  const [playbackSeconds, setPlaybackSeconds] = useState(0);

  const currentTrack = playlists[currentTrackIndex] || playlists[0];
  const activeEpisode = currentTrack.episodes?.[currentEpisodeIndex] || currentTrack.episodes?.[0];

  // Load custom playlists & favorites
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCustom = localStorage.getItem('dharma_custom_playlists');
        if (savedCustom) {
          const parsed = JSON.parse(savedCustom);
          setPlaylists(prev => [...parsed, ...prev]);
        }
        const savedFavs = localStorage.getItem('dharma_fav_playlists');
        if (savedFavs) {
          setFavorites(JSON.parse(savedFavs));
        }
      } catch {}
    }
  }, []);

  // Timer for time counter
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSelectTrack = (track: YouTubePlaylistItem) => {
    const idx = playlists.findIndex(t => t.id === track.id);
    if (idx !== -1) {
      setCurrentTrackIndex(idx);
      setCurrentEpisodeIndex(0);
      setEpisodeSearchQuery('');
    }
    setIsPlaying(true);
    setPlaybackSeconds(0);
    sacredAudio.playFluteChime(0.2);
  };

  const handleSelectEpisode = (epIdx: number) => {
    setCurrentEpisodeIndex(epIdx);
    setIsPlaying(true);
    setPlaybackSeconds(0);
    sacredAudio.playFluteChime(0.25);
  };

  const handleNextTrack = () => {
    sacredAudio.playNavChime(0.12);
    setPlaybackSeconds(0);
    if (currentTrack.episodes && currentEpisodeIndex < currentTrack.episodes.length - 1) {
      setCurrentEpisodeIndex(prev => prev + 1);
    } else {
      if (isShuffle) {
        const randomIdx = Math.floor(Math.random() * playlists.length);
        setCurrentTrackIndex(randomIdx);
      } else {
        setCurrentTrackIndex((prev) => (prev + 1) % playlists.length);
      }
      setCurrentEpisodeIndex(0);
    }
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    sacredAudio.playNavChime(0.12);
    setPlaybackSeconds(0);
    if (currentTrack.episodes && currentEpisodeIndex > 0) {
      setCurrentEpisodeIndex(prev => prev - 1);
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + playlists.length) % playlists.length);
      setCurrentEpisodeIndex(0);
    }
    setIsPlaying(true);
  };


  const togglePlay = () => {
    sacredAudio.playNavChime(0.15);
    setIsPlaying(!isPlaying);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sacredAudio.playNavChime(0.15);
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      if (typeof window !== 'undefined') {
        localStorage.setItem('dharma_fav_playlists', JSON.stringify(next));
      }
      return next;
    });
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Extract YouTube ID
  const extractYouTubeId = (url: string): { id: string; isPlaylist: boolean } | null => {
    if (!url.trim()) return null;
    const matchPlaylist = url.match(/[?&]list=([^#&?]+)/);
    if (matchPlaylist && matchPlaylist[1]) return { id: matchPlaylist[1], isPlaylist: true };
    const matchVideo = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (matchVideo && matchVideo[1]) return { id: matchVideo[1], isPlaylist: false };
    if (url.trim().length === 11) return { id: url.trim(), isPlaylist: false };
    return null;
  };

  const handleAddCustomTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const extracted = extractYouTubeId(customUrl);
    if (!extracted) {
      alert('कृपया एक वैध YouTube वीडियो या प्लेलिस्ट लिंक दर्ज करें।');
      return;
    }

    const newTrack: YouTubePlaylistItem = {
      id: `custom-${Date.now()}`,
      title: customTitle.trim() || 'कस्टम दिव्य संगीत (Seeker Custom Track)',
      subtitle: 'Seeker Added Devotional Music',
      category: 'bhajan',
      categoryLabel: 'Custom Playlist',
      youtubeId: extracted.id,
      isPlaylist: extracted.isPlaylist,
      thumbnailUrl: extracted.isPlaylist 
        ? 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=700&auto=format&fit=crop&q=80'
        : `https://img.youtube.com/vi/${extracted.id}/hqdefault.jpg`,
      duration: 'Continuous Audio',
      description: 'Seeker customized sacred stream for meditation and chanting.',
      tags: ['Custom', 'User Added', 'Sacred Audio'],
      episodes: []
    };


    sacredAudio.playTempleBell(0.35);
    setPlaylists(prev => [newTrack, ...prev]);
    setCurrentTrackIndex(0);
    setIsPlaying(true);
    setShowAddModal(false);
    setCustomUrl('');
    setCustomTitle('');


    if (typeof window !== 'undefined') {
      try {
        const savedCustom = JSON.parse(localStorage.getItem('dharma_custom_playlists') || '[]');
        localStorage.setItem('dharma_custom_playlists', JSON.stringify([newTrack, ...savedCustom]));
      } catch {}
    }
  };

  // Filtered tracks
  const filteredTracks = playlists.filter(track => {
    const matchCategory = activeCategory === 'all' || track.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchSearch = !query || 
      track.title.toLowerCase().includes(query) ||
      track.subtitle.toLowerCase().includes(query) ||
      (track.raga && track.raga.toLowerCase().includes(query)) ||
      track.tags.some(t => t.toLowerCase().includes(query));
    return matchCategory && matchSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 z-10 relative">
      
      {/* ── HIDDEN AUDIO-ONLY YOUTUBE STREAMING ENGINE ────────────── */}
      {/* The video element is completely hidden; only audio is channeled into the user experience */}
      <div className="fixed -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {isPlaying && (
          <iframe
            key={`${currentTrack.youtubeId}-${currentEpisodeIndex}-${isPlaying}-${currentTrackIndex}`}
            src={currentTrack.isPlaylist
              ? `https://www.youtube.com/embed/videoseries?list=${currentTrack.youtubeId}&index=${currentEpisodeIndex}&autoplay=1&enablejsapi=1&rel=0&controls=0&modestbranding=1&loop=${isRepeat ? 1 : 0}`
              : `https://www.youtube.com/embed/${currentTrack.youtubeId}?autoplay=1&enablejsapi=1&rel=0&controls=0&modestbranding=1&loop=${isRepeat ? 1 : 0}`}
            title="Audio Background Stream Engine"
            allow="autoplay"
          />
        )}
      </div>



      {/* ── Top Header ────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold-500/20 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold-400 via-gold-500 to-amber-700 flex items-center justify-center text-obsidian-950 font-bold text-xl shadow-[0_0_20px_rgba(232,163,32,0.45)] sacred-pulse">
              🪈
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold-100 gradient-text-gold tracking-wide">
                दिव्य संगीत साधना (Sacred Audio Sanctuary)
              </h1>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                Pure Lossless Audio-Only Mode (No Video Screen)
              </span>
            </div>
          </div>
        </div>

        {/* Action Button: Add Custom Link */}
        <button
          onClick={() => {
            sacredAudio.playNavChime(0.15);
            setShowAddModal(true);
          }}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-obsidian-950 font-bold text-xs sm:text-sm font-sans flex items-center gap-2 shadow-[0_0_20px_rgba(232,163,32,0.4)] cursor-pointer active:scale-95 transition-all self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ कस्टम YouTube लिंक जोड़ें</span>
        </button>
      </div>

      {/* ── PURE AUDIO SANCTUARY CONSOLE (Master Player Interface) ───────── */}
      <div className="bg-gradient-to-br from-obsidian-900 via-obsidian-900/98 to-amber-950/30 border border-gold-500/35 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
        
        {/* Ambient Golden Background Aura */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left: Spinning Sacred Chakra / Vinyl Audio Disc */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
            <div className="relative group">
              {/* Outer Golden Aura Ring */}
              <div className={`w-56 h-56 sm:w-64 sm:h-64 rounded-full p-2 bg-gradient-to-tr from-gold-400/40 via-amber-500/30 to-amber-800/40 shadow-[0_0_50px_rgba(232,163,32,0.35)] flex items-center justify-center transition-all ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}>
                {/* Vinyl Grooves Body */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-obsidian-950 via-obsidian-900 to-obsidian-950 border-4 border-gold-500/30 flex items-center justify-center relative overflow-hidden shadow-inner">
                  
                  {/* Concentric Vinyl Circles */}
                  <div className="absolute inset-4 rounded-full border border-gold-500/10" />
                  <div className="absolute inset-8 rounded-full border border-gold-500/15" />
                  <div className="absolute inset-12 rounded-full border border-gold-500/10" />
                  
                  {/* Center Artwork Label */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-gold-400 shadow-xl relative z-10">
                    <img 
                      src={currentTrack.thumbnailUrl} 
                      alt={currentTrack.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-gold-200 text-xl font-bold">
                      ॐ
                    </div>
                  </div>

                  {/* Center Spindle Hole */}
                  <div className="w-4 h-4 rounded-full bg-obsidian-950 border border-gold-400 absolute z-20" />
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute bottom-1 right-2 px-3 py-1 rounded-full bg-black/80 border border-gold-500/30 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-gold-500/40'}`} />
                <span className="text-[10px] font-mono text-gold-200">
                  {isPlaying ? 'PLAYING AUDIO' : 'PAUSED'}
                </span>
              </div>
            </div>

            {/* Audio Wave Visualizer Bars */}
            <div className="flex items-end justify-center gap-1.5 h-8 pt-2">
              {[40, 75, 55, 90, 65, 80, 45, 95, 70, 85, 60, 100, 50, 75, 90, 65, 80].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full bg-gradient-to-t from-gold-500 to-amber-300 transition-all duration-300 ${
                    isPlaying ? 'animate-pulse' : 'opacity-30'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(15, (h * ((i % 3) + 1)) % 100)}%` : '15%',
                    animationDelay: `${i * 70}ms`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: Master Controls & Track Metadata */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header / Badges */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-cinzel font-bold uppercase tracking-widest text-gold-300 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/30">
                    {currentTrack.categoryLabel || currentTrack.category.toUpperCase().replace('_', ' ')}
                  </span>
                  {currentTrack.isPlaylist && (
                    <span className="text-[10px] font-mono text-amber-300 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 font-bold flex items-center gap-1">
                      📜 {currentTrack.episodeCount || 'प्लेलिस्ट धारावाहिक'}
                    </span>
                  )}
                  {activeEpisode?.raga ? (
                    <span className="text-xs font-mono text-gold-400/80 px-2.5 py-0.5 rounded-full bg-obsidian-800 border border-gold-500/20">
                      {activeEpisode.raga}
                    </span>
                  ) : currentTrack.raga ? (
                    <span className="text-xs font-mono text-gold-400/80 px-2.5 py-0.5 rounded-full bg-obsidian-800 border border-gold-500/20">
                      {currentTrack.raga}
                    </span>
                  ) : null}
                </div>

                <button
                  onClick={(e) => toggleFavorite(currentTrack.id, e)}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    favorites.includes(currentTrack.id)
                      ? 'bg-red-500/20 text-red-400 border-red-500/40'
                      : 'bg-obsidian-800 text-gold-300/70 border-gold-500/20 hover:border-gold-400'
                  }`}
                  title="Favorite"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(currentTrack.id) ? 'fill-current text-red-400' : ''}`} />
                </button>
              </div>

              {/* Playlist Parent Name if in episode */}
              {currentTrack.episodes && currentTrack.episodes.length > 1 && (
                <div className="text-xs font-mono text-gold-400/70 flex items-center gap-1.5 pt-0.5">
                  <BookOpen className="w-3.5 h-3.5 text-gold-400" />
                  <span className="truncate">{currentTrack.title}</span>
                  <span className="text-amber-400 font-bold">• भाग {currentEpisodeIndex + 1} / {currentTrack.episodes.length}</span>
                </div>
              )}

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-gold-100 leading-tight">
                {activeEpisode ? activeEpisode.title : currentTrack.title}
              </h2>

              <p className="text-xs sm:text-sm text-gold-300/80 font-sans leading-relaxed">
                {activeEpisode?.subtitle || currentTrack.subtitle}
              </p>
            </div>

            {/* Progress & Time */}
            <div className="space-y-1.5 pt-1">
              <div className="w-full bg-obsidian-950 h-2 rounded-full overflow-hidden border border-gold-500/20 relative">
                <div 
                  className="h-full bg-gradient-to-r from-gold-500 via-amber-400 to-amber-600 transition-all duration-300 rounded-full"
                  style={{ width: `${Math.min(100, (playbackSeconds % 300) / 3)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-gold-400/70">
                <span>{formatTime(playbackSeconds)}</span>
                <span>{activeEpisode?.duration || currentTrack.duration || 'Continuous Audio Stream'}</span>
              </div>
            </div>

            {/* Playback Button Bar */}
            <div className="flex items-center justify-between gap-4 pt-1">
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsShuffle(!isShuffle)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isShuffle 
                      ? 'bg-gold-500/20 text-gold-300 border-gold-400 font-bold' 
                      : 'bg-obsidian-800 text-gold-400/60 border-gold-500/15 hover:text-gold-200'
                  }`}
                  title="Shuffle"
                >
                  <Shuffle className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsRepeat(!isRepeat)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isRepeat 
                      ? 'bg-gold-500/20 text-gold-300 border-gold-400 font-bold' 
                      : 'bg-obsidian-800 text-gold-400/60 border-gold-500/15 hover:text-gold-200'
                  }`}
                  title="Repeat"
                >
                  <Repeat className="w-4 h-4" />
                </button>
              </div>

              {/* Main Controls (Prev, Play, Next) */}
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={handlePrevTrack}
                  className="p-3 rounded-2xl bg-obsidian-800 hover:bg-obsidian-750 border border-gold-500/20 text-gold-200 hover:text-gold-100 transition-all active:scale-95 cursor-pointer shadow-md"
                  title="Previous Episode / Track"
                >
                  <SkipBack className="w-5 h-5 fill-current" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 hover:from-gold-300 hover:to-amber-500 text-obsidian-950 font-bold flex items-center justify-center shadow-[0_0_25px_rgba(232,163,32,0.5)] active:scale-95 transition-all cursor-pointer"
                  title={isPlaying ? 'Pause Audio' : 'Play Audio'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current ml-1" />
                  )}
                </button>

                <button
                  onClick={handleNextTrack}
                  className="p-3 rounded-2xl bg-obsidian-800 hover:bg-obsidian-750 border border-gold-500/20 text-gold-200 hover:text-gold-100 transition-all active:scale-95 cursor-pointer shadow-md"
                  title="Next Episode / Track"
                >
                  <SkipForward className="w-5 h-5 fill-current" />
                </button>
              </div>

              {/* External Link */}
              <div className="flex items-center gap-2">
                <a
                  href={currentTrack.isPlaylist 
                    ? `https://www.youtube.com/playlist?list=${currentTrack.youtubeId}`
                    : `https://www.youtube.com/watch?v=${currentTrack.youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-obsidian-800 text-gold-300 border border-gold-500/20 hover:border-gold-400 hover:text-gold-100 transition-colors flex items-center gap-1 text-xs font-mono"
                  title="Original Source"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Instant Sacred Sound FX Quick Trigger */}
            <div className="pt-3 border-t border-gold-500/15 space-y-2">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-gold-400 font-bold">
                दिव्य ध्वनि प्रभाव (Acoustic Bell & Conch FX)
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: '🔔 मन्दिर घण्टा', action: () => sacredAudio.playTempleBell(0.35) },
                  { label: '🐚 शंखनाद', action: () => sacredAudio.playShankhnaad(0.3) },
                  { label: '🕉️ ॐ नाद', action: () => sacredAudio.playOmChime(0.28) },
                  { label: '🪈 दिव्य मुरली', action: () => sacredAudio.playFluteChime(0.25) },
                ].map((fx, i) => (
                  <button
                    key={i}
                    onClick={fx.action}
                    className="p-2 rounded-xl bg-obsidian-800 hover:bg-gold-500/20 border border-gold-500/20 hover:border-gold-400/40 text-xs text-gold-200 transition-all active:scale-95 cursor-pointer font-sans text-center truncate"
                  >
                    {fx.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ── ACTIVE PLAYLIST EPISODE EXPLORER & TRACKLIST SECTION ─────────── */}
      {currentTrack.episodes && currentTrack.episodes.length > 0 && (
        <div className="bg-gradient-to-br from-obsidian-900/90 via-obsidian-900/95 to-amber-950/20 border border-gold-500/30 rounded-3xl p-5 sm:p-7 shadow-xl space-y-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gold-500/20 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">📜</span>
                <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold-100 gradient-text-gold">
                  {currentTrack.title} — सम्पूर्ण अध्याय एवं प्रसंग सूची
                </h3>
              </div>
              <p className="text-xs text-gold-300/70 font-sans">
                इस प्लेलिस्ट के कुल <span className="text-amber-400 font-bold">{currentTrack.episodes.length}</span> अध्याय/प्रसंग उपलब्ध हैं। किसी भी प्रसंग पर क्लिक करके सीधा सुनें:
              </p>
            </div>

            {/* Episode Search Bar */}
            <div className="relative min-w-[200px] sm:min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-gold-400/60 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={episodeSearchQuery}
                onChange={(e) => setEpisodeSearchQuery(e.target.value)}
                placeholder="इस श्रृंखला में खोजें..."
                className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl pl-9 pr-3 py-1.5 text-xs text-gold-100 focus:border-gold-400 outline-none font-sans"
              />
              {episodeSearchQuery && (
                <button
                  onClick={() => setEpisodeSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gold-400/60 hover:text-gold-200"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Episode List Grid / Rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[480px] overflow-y-auto pr-1 custom-scrollbar">
            {currentTrack.episodes
              .filter(ep => {
                if (!episodeSearchQuery.trim()) return true;
                const q = episodeSearchQuery.toLowerCase();
                return ep.title.toLowerCase().includes(q) || 
                  (ep.subtitle && ep.subtitle.toLowerCase().includes(q)) ||
                  (ep.raga && ep.raga.toLowerCase().includes(q));
              })
              .map((ep, epIdx) => {
                const isEpActive = currentEpisodeIndex === epIdx;

                return (
                  <div
                    key={ep.id || epIdx}
                    onClick={() => handleSelectEpisode(epIdx)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isEpActive
                        ? 'bg-gradient-to-r from-gold-500/20 via-amber-500/15 to-obsidian-850 border-gold-400 shadow-[0_0_15px_rgba(232,163,32,0.3)]'
                        : 'bg-obsidian-850/80 hover:bg-obsidian-800 border-gold-500/15 hover:border-gold-400/40'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Episode Badge Number */}
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                        isEpActive 
                          ? 'bg-gradient-to-br from-gold-400 to-amber-600 text-obsidian-950 shadow-md' 
                          : 'bg-obsidian-900 border border-gold-500/25 text-gold-300'
                      }`}>
                        {ep.episodeNumber < 10 ? `0${ep.episodeNumber}` : ep.episodeNumber}
                      </div>

                      <div className="min-w-0">
                        <h4 className={`text-xs sm:text-sm font-bold truncate font-sans ${
                          isEpActive ? 'text-gold-200 font-display' : 'text-gold-100'
                        }`}>
                          {ep.title}
                        </h4>
                        {ep.subtitle && (
                          <p className="text-[11px] text-gold-400/70 truncate font-sans">
                            {ep.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {ep.raga && (
                        <span className="text-[10px] font-mono text-gold-400/70 px-2 py-0.5 rounded-md bg-obsidian-900 border border-gold-500/10 hidden lg:inline">
                          {ep.raga}
                        </span>
                      )}

                      {ep.duration && (
                        <span className="text-[10px] font-mono text-gold-400/60 hidden sm:inline">
                          {ep.duration}
                        </span>
                      )}

                      <button
                        className={`p-2 rounded-xl transition-all ${
                          isEpActive
                            ? 'bg-gold-500 text-obsidian-950 shadow-[0_0_10px_rgba(232,163,32,0.4)]'
                            : 'bg-obsidian-900 text-gold-300 border border-gold-500/20 hover:border-gold-400'
                        }`}
                        title={isEpActive && isPlaying ? 'Playing' : 'Play Episode'}
                      >
                        {isEpActive && isPlaying ? (
                          <Radio className="w-3.5 h-3.5 animate-pulse" />
                        ) : (
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        )}
                      </button>
                    </div>

                  </div>
                );
              })}
          </div>

        </div>
      )}


      {/* ── Category Filters & Search Row ────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2">
        
        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                sacredAudio.playNavChime(0.12);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-sans font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 font-bold shadow-[0_0_15px_rgba(232,163,32,0.35)]'
                  : 'bg-obsidian-900/80 hover:bg-obsidian-800 text-gold-300/70 border border-gold-500/15'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* View Toggle & Search Field */}
        <div className="flex items-center gap-2 shrink-0">
          
          <div className="flex items-center bg-obsidian-900 border border-gold-500/20 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-gold-500 text-obsidian-950 font-bold' : 'text-gold-400/60 hover:text-gold-200'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-gold-500 text-obsidian-950 font-bold' : 'text-gold-400/60 hover:text-gold-200'
              }`}
              title="List & Episode View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-gold-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="खोजें (गीता, भागवत, भजन, कीर्तन)..."
              className="w-full bg-obsidian-900/90 border border-gold-500/25 rounded-2xl pl-10 pr-4 py-2 text-xs text-gold-100 focus:border-gold-400 outline-none font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gold-400/60 hover:text-gold-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── PLAYLISTS & EPISODES RENDER (Grid or List View) ─────────────── */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredTracks.map((track) => {
            const isCurrent = currentTrack.id === track.id;
            const isFav = favorites.includes(track.id);

            return (
              <div
                key={track.id}
                onClick={() => handleSelectTrack(track)}
                className={`group rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col justify-between relative p-4 space-y-3 ${
                  isCurrent
                    ? 'bg-gradient-to-b from-obsidian-800 to-obsidian-900 border-gold-400 shadow-[0_0_25px_rgba(232,163,32,0.35)] scale-[1.02]'
                    : 'bg-obsidian-900/80 hover:bg-obsidian-850 border-gold-500/20 hover:border-gold-400/50 shadow-lg hover:shadow-2xl'
                }`}
              >
                {/* Artwork / Vinyl Icon */}
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gold-500/30 shrink-0 relative bg-obsidian-950">
                    <img
                      src={track.thumbnailUrl}
                      alt={track.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center ${
                      isCurrent && isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    } transition-opacity`}>
                      {isCurrent && isPlaying ? (
                        <Radio className="w-6 h-6 text-gold-300 animate-pulse" />
                      ) : (
                        <Play className="w-6 h-6 text-gold-300 fill-current ml-0.5" />
                      )}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-gold-400/80 mb-0.5">
                      <span className="uppercase tracking-wider font-bold">
                        {track.categoryLabel || track.category.replace('_', ' ')}
                      </span>
                      {track.episodeCount && <span>{track.episodeCount}</span>}
                    </div>

                    <h4 className="text-sm font-bold text-gold-100 line-clamp-2 font-display group-hover:text-gold-300 transition-colors leading-snug">
                      {track.title}
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-gold-300/70 line-clamp-2 font-sans">
                  {track.subtitle}
                </p>

                {/* Bottom Action / Tag */}
                <div className="pt-2 border-t border-gold-500/10 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-gold-400/80 flex items-center gap-1.5 font-sans">
                    {isCurrent ? (
                      <span className="text-amber-400 font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
                        सक्रिय (Now Playing)
                      </span>
                    ) : (
                      <span>▶ स्पर्श करके सुनें</span>
                    )}
                  </span>

                  <button
                    onClick={(e) => toggleFavorite(track.id, e)}
                    className="p-1 text-gold-400/60 hover:text-red-400 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current text-red-400' : ''}`} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* LIST & EPISODES DETAILED VIEW */
        <div className="space-y-3">
          {filteredTracks.map((track, idx) => {
            const isCurrent = currentTrack.id === track.id;
            const isFav = favorites.includes(track.id);

            return (
              <div
                key={track.id}
                onClick={() => handleSelectTrack(track)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-obsidian-800 via-obsidian-850 to-obsidian-900 border-gold-400 shadow-[0_0_20px_rgba(232,163,32,0.3)]'
                    : 'bg-obsidian-900/80 hover:bg-obsidian-850 border-gold-500/15 hover:border-gold-400/40'
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="text-sm font-mono text-gold-400/60 w-6 text-center shrink-0">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>

                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-gold-500/25 shrink-0 relative bg-black">
                    <img src={track.thumbnailUrl} alt={track.title} className="w-full h-full object-cover" />
                    {isCurrent && isPlaying && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Radio className="w-5 h-5 text-gold-300 animate-pulse" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-gold-400/80">
                      <span className="uppercase tracking-wider font-bold">
                        {track.categoryLabel}
                      </span>
                      {track.episodeCount && <span>• {track.episodeCount}</span>}
                    </div>
                    <h4 className="text-sm font-bold text-gold-100 truncate font-display">
                      {track.title}
                    </h4>
                    <p className="text-xs text-gold-300/70 truncate font-sans">
                      {track.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                  {track.raga && (
                    <span className="text-[11px] font-mono text-gold-400/80 px-2.5 py-1 rounded-lg bg-obsidian-800 border border-gold-500/15 hidden md:inline">
                      {track.raga}
                    </span>
                  )}

                  <button
                    onClick={(e) => toggleFavorite(track.id, e)}
                    className="p-2 text-gold-400/60 hover:text-red-400 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current text-red-400' : ''}`} />
                  </button>

                  <button
                    className={`px-4 py-1.5 rounded-xl font-bold text-xs font-sans flex items-center gap-1.5 transition-all ${
                      isCurrent
                        ? 'bg-gold-500 text-obsidian-950 shadow-[0_0_12px_rgba(232,163,32,0.4)]'
                        : 'bg-obsidian-800 text-gold-300 border border-gold-500/20 hover:border-gold-400'
                    }`}
                  >
                    {isCurrent && isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>{isCurrent && isPlaying ? 'चल रहा है' : 'सुनें'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}


      {/* ── Modal: Add Custom YouTube Link ──────────────────────── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-obsidian-900 border border-gold-500/35 rounded-3xl p-6 sm:p-7 w-full max-w-lg shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between">
              <h3 className="font-cinzel text-base font-bold text-gold-100 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-gold-400" />
                <span>कस्टम YouTube ऑडियो लिंक जोड़ें</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-obsidian-400 hover:text-gold-200 text-sm cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gold-300/70 font-sans">
              आप किसी भी YouTube वीडियो या प्लेलिस्ट का लिंक पेस्ट कर सकते हैं। यह स्वतः ही केवल ऑडियो रूप में प्ले होगा।
            </p>

            <form onSubmit={handleAddCustomTrack} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gold-400 mb-1">
                  YouTube Video / Playlist URL या Video ID
                </label>
                <input
                  type="text"
                  required
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... या https://youtu.be/..."
                  className="w-full bg-obsidian-800 border border-gold-500/25 rounded-xl p-3 text-xs text-gold-100 focus:border-gold-400 outline-none font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gold-400 mb-1">
                  ट्रैक का नाम / विवरण (वैकल्पिक)
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="उदा. मेरा पसंदीदा कृष्ण भजन..."
                  className="w-full bg-obsidian-800 border border-gold-500/25 rounded-xl p-3 text-xs text-gold-100 focus:border-gold-400 outline-none font-sans"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-obsidian-800 text-xs text-gold-300 hover:text-gold-100 cursor-pointer"
                >
                  रद्द करें
                </button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="px-6 rounded-xl cursor-pointer font-bold shadow-[0_0_15px_rgba(232,163,32,0.4)]"
                >
                  प्लेलिस्ट में जोड़ें
                </Button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
