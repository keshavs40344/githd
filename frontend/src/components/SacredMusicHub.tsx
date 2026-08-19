'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  SACRED_YOUTUBE_PLAYLISTS, YouTubePlaylistItem 
} from '@/data/youtubePlaylists';
import { 
  Play, Pause, Volume2, VolumeX, Search, Filter, Sparkles, 
  Music, ExternalLink, PlusCircle, RotateCcw, Check, Radio, 
  Disc3, Flame, Heart, Share2, Layers 
} from 'lucide-react';
import { Button } from './ui/Button';
import { sacredAudio } from '@/lib/sacredSounds';

type CategoryFilter = 'all' | 'flute' | 'gita_chanting' | 'bhajan' | 'meditation_drone' | 'shankhnaad' | 'aarti';

const CATEGORIES: { id: CategoryFilter; label: string; icon: string }[] = [
  { id: 'all',              label: 'सभी दिव्य संगीत (All)',       icon: '🌟' },
  { id: 'flute',            label: 'कृष्ण बाँसुरी (Flute 432Hz)',  icon: '🪈' },
  { id: 'gita_chanting',    label: 'सम्पूर्ण गीता पाठ (Gita)',    icon: '📖' },
  { id: 'bhajan',           label: 'भजन एवं संकीर्तन (Bhajan)',  icon: '🪕' },
  { id: 'meditation_drone', label: 'ध्यान व समाधि (OM Drones)',  icon: '🧘' },
  { id: 'shankhnaad',       label: 'शंखनाद व शौर्य (Conch)',      icon: '⚔️' },
  { id: 'aarti',            label: 'आरती व उत्सव (Aarti)',       icon: '🪔' },
];

export default function SacredMusicHub() {
  const [playlists, setPlaylists] = useState<YouTubePlaylistItem[]>(SACRED_YOUTUBE_PLAYLISTS);
  const [selectedTrack, setSelectedTrack] = useState<YouTubePlaylistItem>(SACRED_YOUTUBE_PLAYLISTS[0]);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [customUrl, setCustomUrl] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load custom playlists and favorites from localStorage
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

  const handleSelectTrack = (track: YouTubePlaylistItem) => {
    setSelectedTrack(track);
    setIsPlaying(true);
    sacredAudio.playFluteChime(0.2);
    // Scroll player into view smoothly if on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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

  // Parse YouTube video/playlist ID from full URL or shorthand
  const extractYouTubeId = (url: string): string | null => {
    if (!url.trim()) return null;
    const match1 = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match1 && match1[1]) return match1[1];
    const matchPlaylist = url.match(/[?&]list=([^#&?]+)/);
    if (matchPlaylist && matchPlaylist[1]) return matchPlaylist[1];
    if (url.trim().length === 11) return url.trim();
    return null;
  };

  const handleAddCustomTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const ytId = extractYouTubeId(customUrl);
    if (!ytId) {
      alert('कृपया एक वैध YouTube वीडियो या प्लेलिस्ट लिंक दर्ज करें।');
      return;
    }

    const newTrack: YouTubePlaylistItem = {
      id: `custom-${Date.now()}`,
      title: customTitle.trim() || 'कस्टम दिव्य संगीत (Custom YouTube Track)',
      subtitle: 'Seeker Added Devotional Music',
      category: 'bhajan',
      youtubeId: ytId,
      thumbnailUrl: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
      duration: 'Live / Custom',
      description: 'User added custom sacred track stream.',
      tags: ['Custom', 'User Added', 'Devotional']
    };

    sacredAudio.playTempleBell(0.35);
    setPlaylists(prev => [newTrack, ...prev]);
    setSelectedTrack(newTrack);
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
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-7 z-10 relative">
      
      {/* ── Top Header ────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold-500/20 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪈</span>
            <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold-100 gradient-text-gold tracking-wide">
              दिव्य संगीत व साधना केंद्र (Sacred Sound Sanctuary)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gold-300/75 font-sans">
            २०+ प्रामाणिक कृष्ण बाँसुरी, सम्पूर्ण १८ अध्याय गीता पाठ, ॐ नाद ब्रह्म एवं पावन भजन प्लेलिस्ट
          </p>
        </div>

        {/* Action Button: Add YouTube Link */}
        <button
          onClick={() => {
            sacredAudio.playNavChime(0.15);
            setShowAddModal(true);
          }}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-obsidian-950 font-bold text-xs sm:text-sm font-sans flex items-center gap-2 shadow-[0_0_20px_rgba(232,163,32,0.4)] cursor-pointer active:scale-95 transition-all self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ कस्टम YouTube प्लेलिस्ट जोड़ें</span>
        </button>
      </div>

      {/* ── Main Stage: Active Embedded Player + Details ─────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-gradient-to-br from-obsidian-900/95 via-obsidian-850/95 to-amber-950/25 border border-gold-500/30 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
        
        {/* Left: YouTube Video / Audio Container */}
        <div className="lg:col-span-8 space-y-4">
          <div className="w-full aspect-video rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl bg-black relative">
            <iframe
              key={selectedTrack.youtubeId}
              src={`https://www.youtube.com/embed/${selectedTrack.youtubeId}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1`}
              title={selectedTrack.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          {/* Quick Player Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-obsidian-800/80 border border-gold-500/20">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center text-obsidian-950 font-bold text-lg shrink-0 shadow-md">
                🪈
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-gold-100 truncate font-display">
                  {selectedTrack.title}
                </h3>
                <p className="text-xs text-gold-400/80 truncate font-sans">
                  {selectedTrack.raga || selectedTrack.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={(e) => toggleFavorite(selectedTrack.id, e)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  favorites.includes(selectedTrack.id)
                    ? 'bg-red-500/20 text-red-400 border-red-500/40'
                    : 'bg-obsidian-900 text-gold-300/70 border-gold-500/20 hover:border-gold-400'
                }`}
                title="Favorite"
              >
                <Heart className={`w-4 h-4 ${favorites.includes(selectedTrack.id) ? 'fill-current text-red-400' : ''}`} />
              </button>

              <a
                href={`https://www.youtube.com/watch?v=${selectedTrack.youtubeId}`}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-obsidian-900 text-gold-300 border border-gold-500/20 hover:border-gold-400 hover:text-gold-100 transition-colors flex items-center gap-1.5 text-xs font-mono"
                title="Open in YouTube"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">YouTube</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Track Overview & Vedic Context */}
        <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-cinzel font-bold uppercase tracking-widest text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/30">
                {selectedTrack.category.toUpperCase().replace('_', ' ')}
              </span>
              {selectedTrack.duration && (
                <span className="text-[11px] font-mono text-gold-400/70">
                  ⏳ {selectedTrack.duration}
                </span>
              )}
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-gold-100 font-display leading-snug">
              {selectedTrack.title}
            </h2>

            <p className="text-xs sm:text-sm text-gold-200/80 leading-relaxed font-sans">
              {selectedTrack.description}
            </p>

            {/* Sacred Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {selectedTrack.tags.map((tag, i) => (
                <span 
                  key={i}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-obsidian-800 text-gold-300/80 border border-gold-500/15"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Sound FX Triggers */}
          <div className="p-3.5 rounded-2xl bg-obsidian-800/60 border border-gold-500/20 space-y-2">
            <span className="block text-[10px] font-mono uppercase tracking-wider text-gold-400 font-bold">
              दिव्य ध्वनि प्रभाव (Instant Sacred Sound FX)
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { label: '🔔 घण्टा', action: () => sacredAudio.playTempleBell(0.35) },
                { label: '🐚 शंख', action: () => sacredAudio.playShankhnaad(0.3) },
                { label: '🕉️ ॐ नाद', action: () => sacredAudio.playOmChime(0.28) },
                { label: '🪈 मुरली', action: () => sacredAudio.playFluteChime(0.25) },
              ].map((fx, i) => (
                <button
                  key={i}
                  onClick={fx.action}
                  className="p-2 rounded-xl bg-obsidian-900 hover:bg-gold-500/20 border border-gold-500/20 text-xs text-gold-200 transition-all active:scale-95 cursor-pointer font-sans text-center"
                >
                  {fx.label}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

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

        {/* Search Field */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-gold-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="खोजें (राधा कृष्ण, गीता, ॐ, बाँसुरी)..."
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

      {/* ── 20+ Playlists Grid ───────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {filteredTracks.map((track) => {
          const isSelected = selectedTrack.id === track.id;
          const isFav = favorites.includes(track.id);

          return (
            <div
              key={track.id}
              onClick={() => handleSelectTrack(track)}
              className={`group rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col justify-between relative ${
                isSelected
                  ? 'bg-gradient-to-b from-obsidian-800 to-obsidian-900 border-gold-400 shadow-[0_0_25px_rgba(232,163,32,0.35)] scale-[1.02]'
                  : 'bg-obsidian-900/80 hover:bg-obsidian-850 border-gold-500/20 hover:border-gold-400/50 shadow-lg hover:shadow-2xl'
              }`}
            >
              {/* Thumbnail with overlay */}
              <div className="relative aspect-video w-full overflow-hidden bg-obsidian-950">
                <img
                  src={track.thumbnailUrl}
                  alt={track.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/30 to-transparent" />
                
                {/* Play Button Indicator */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all ${
                  isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-xs'
                }`}>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gold-400 to-amber-500 text-obsidian-950 flex items-center justify-center font-bold shadow-[0_0_20px_rgba(232,163,32,0.6)]">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                {track.duration && (
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-mono text-gold-200 border border-gold-500/20">
                    {track.duration}
                  </span>
                )}

                {/* Favorite Heart */}
                <button
                  onClick={(e) => toggleFavorite(track.id, e)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-gold-300 hover:text-red-400 transition-colors"
                >
                  <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current text-red-400' : ''}`} />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-gold-400/80">
                    <span className="uppercase tracking-wider font-bold">
                      {track.category.replace('_', ' ')}
                    </span>
                    {track.raga && <span>{track.raga}</span>}
                  </div>

                  <h4 className="text-sm font-bold text-gold-100 line-clamp-2 font-display leading-snug group-hover:text-gold-300 transition-colors">
                    {track.title}
                  </h4>

                  <p className="text-xs text-gold-300/70 line-clamp-2 font-sans">
                    {track.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-gold-500/10 flex items-center justify-between">
                  <span className="text-[11px] text-gold-400 flex items-center gap-1 font-mono">
                    <Radio className={`w-3 h-3 ${isSelected ? 'animate-pulse text-amber-400' : ''}`} />
                    <span>{isSelected ? 'सक्रिय (Playing)' : 'श्रवण करें'}</span>
                  </span>
                  <span className="text-xs text-gold-300/50 group-hover:translate-x-1 transition-transform">
                    ➔
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* ── Modal: Add Custom YouTube Link ──────────────────────── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-obsidian-900 border border-gold-500/35 rounded-3xl p-6 sm:p-7 w-full max-w-lg shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between">
              <h3 className="font-cinzel text-base font-bold text-gold-100 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-gold-400" />
                <span>कस्टम YouTube प्लेलिस्ट या वीडियो जोड़ें</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-obsidian-400 hover:text-gold-200 text-sm cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

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
