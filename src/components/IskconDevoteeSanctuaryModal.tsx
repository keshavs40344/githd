'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles, Radio, Heart, BookOpen, Calendar, MapPin,
  Users, X, ExternalLink, Flame, Flower2, Tv, Bell, ChevronLeft, ChevronRight,
  RotateCw, Film, Maximize2, Minimize2, RadioTower, Play
} from 'lucide-react';
import { 
  ISKCON_TV_CHANNELS, KRISHNA_RADIO_STATIONS, ISKCON_DAILY_AARTI_SCHEDULE, 
  ISKCON_DEVOTEE_NOTICES, UPCOMING_VAISHNAVA_FESTIVALS, 
  SRILA_PRABHUPADA_TEACHINGS, IskconTvChannel, KrishnaRadioStation,
  FallbackEpisode, getSmartFreshFallbackEpisode
} from '@/data/iskconGlobalData';

const WATCHED_STORAGE_KEY = 'dharma_iskcon_watched_videos_v1';
const FAVORITES_STORAGE_KEY = 'dharma_iskcon_favorite_channels_v1';

export default function IskconDevoteeSanctuaryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'tv_network' | 'radio_network' | 'japa_16_rounds' | 'aarti_timings' | 'notices' | 'festivals' | 'prabhupada_gita'>('tv_network');
  
  // TV & Live Stream State
  const [selectedChannel, setSelectedChannel] = useState<IskconTvChannel>(ISKCON_TV_CHANNELS[0]);
  const [channelRegionFilter, setChannelRegionFilter] = useState<'all' | 'delhi_ncr' | 'india_top'>('all');
  const [currentEpisode, setCurrentEpisode] = useState<FallbackEpisode>(
    ISKCON_TV_CHANNELS[0].fallbackPlaylist[0]
  );
  const [isFreshVideo, setIsFreshVideo] = useState<boolean>(true);
  const [episodeIndex, setEpisodeIndex] = useState<number>(0);
  const [watchedMap, setWatchedMap] = useState<Record<string, number>>({});
  const [favoriteChannelIds, setFavoriteChannelIds] = useState<string[]>([]);
  const [isTheatreMode, setIsTheatreMode] = useState(false);

  // Radio State
  const [selectedRadioStation, setSelectedRadioStation] = useState<KrishnaRadioStation>(KRISHNA_RADIO_STATIONS[0]);
  
  // 16 Rounds Japa State
  const [completedRounds, setCompletedRounds] = useState(4);
  const [currentBead, setCurrentBead] = useState(27);
  const [isBeadAnimating, setIsBeadAnimating] = useState(false);

  // Load Watch History & Favorites on Client Mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const storedWatched = localStorage.getItem(WATCHED_STORAGE_KEY);
        if (storedWatched) {
          setWatchedMap(JSON.parse(storedWatched));
        }
        const storedFavs = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (storedFavs) {
          setFavoriteChannelIds(JSON.parse(storedFavs));
        }
      }
    } catch {}
  }, []);

  // Save Watched Video to History & LocalStorage
  const recordVideoView = (videoId: string) => {
    const updated = { ...watchedMap, [videoId]: Date.now() };
    setWatchedMap(updated);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(WATCHED_STORAGE_KEY, JSON.stringify(updated));
      }
    } catch {}
  };

  // Toggle Channel in Favorites
  const toggleFavorite = (channelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = favoriteChannelIds.includes(channelId)
      ? favoriteChannelIds.filter(id => id !== channelId)
      : [...favoriteChannelIds, channelId];
    setFavoriteChannelIds(updated);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      }
    } catch {}
  };

  // Apply DevOps Deduplication Algorithm to pick fresh unviewed video
  const applySmartVideoSelection = (channel: IskconTvChannel, customWatched = watchedMap) => {
    const smart = getSmartFreshFallbackEpisode(channel, customWatched);
    setCurrentEpisode(smart.episode);
    setIsFreshVideo(smart.isFresh);
    setEpisodeIndex(smart.index);
    recordVideoView(smart.episode.id);
  };

  // Switch TV Channel
  const switchChannel = (channel: IskconTvChannel) => {
    setSelectedChannel(channel);
    applySmartVideoSelection(channel);
  };

  // Rotate to Next Fresh Episode
  const handleRotateNextEpisode = () => {
    const playlist = selectedChannel.fallbackPlaylist;
    if (!playlist || playlist.length === 0) return;

    const nextIdx = (episodeIndex + 1) % playlist.length;
    const nextEpisode = playlist[nextIdx];
    setCurrentEpisode(nextEpisode);
    setEpisodeIndex(nextIdx);
    setIsFreshVideo(!watchedMap[nextEpisode.id]);
    recordVideoView(nextEpisode.id);
  };

  const handleNextChannel = () => {
    const currentIndex = filteredChannels.findIndex(c => c.id === selectedChannel.id);
    const nextIndex = (currentIndex + 1) % filteredChannels.length;
    switchChannel(filteredChannels[nextIndex]);
  };

  const handlePrevChannel = () => {
    const currentIndex = filteredChannels.findIndex(c => c.id === selectedChannel.id);
    const prevIndex = (currentIndex - 1 + filteredChannels.length) % filteredChannels.length;
    switchChannel(filteredChannels[prevIndex]);
  };

  const handleIncrementBead = () => {
    setIsBeadAnimating(true);
    setTimeout(() => setIsBeadAnimating(false), 200);

    if (currentBead + 1 >= 108) {
      setCurrentBead(1);
      setCompletedRounds(prev => Math.min(16, prev + 1));
    } else {
      setCurrentBead(prev => prev + 1);
    }
  };

  const filteredChannels = ISKCON_TV_CHANNELS.filter(c => {
    if (channelRegionFilter === 'all') return true;
    return c.region === channelRegionFilter;
  });

  const activeVideoId = currentEpisode.id || selectedChannel.fallbackVideoId || 's5RzL_3V27Y';

  return (
    <>
      {/* ── HEADER / SANCTUARY TRIGGER BUTTON ────────────────────────────── */}
      <button
        onClick={() => {
          setIsOpen(true);
          applySmartVideoSelection(selectedChannel);
        }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-400/20 to-amber-600/20 hover:from-amber-500/30 hover:to-orange-400/30 border-2 border-orange-400/40 text-orange-300 hover:text-white text-xs font-serif font-bold shadow-[0_0_20px_rgba(249,115,22,0.25)] hover:scale-103 active:scale-95 transition-all cursor-pointer"
        title="इस्कॉन २४x७ टीवी थियेटर, दिल्ली व अखिल भारतीय धाम लाइव दर्शन"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
        </span>
        <Tv className="w-3.5 h-3.5 text-orange-400" />
        <span>इस्कॉन टीवी थियेटर (18 Channels)</span>
      </button>

      {/* ── FULLSCREEN ISKCON THEATRE SANCTUARY MODAL ────────────────────── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-3xl animate-fade-in font-serif">
          <div className={`relative w-full ${isTheatreMode ? 'max-w-full h-full' : 'max-w-7xl h-[92vh]'} overflow-hidden rounded-3xl bg-gradient-to-b from-[#140e06] via-[#090603] to-[#020101] border-2 border-orange-400/50 shadow-[0_30px_120px_rgba(0,0,0,0.99)] flex flex-col transition-all duration-300`}>
            
            {/* Modal Top Bar */}
            <div className="px-4 sm:px-6 py-2.5 border-b border-orange-400/20 bg-[#080502]/95 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-600 flex items-center justify-center text-xl text-black font-bold shadow-lg shrink-0">
                  🛕
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-400/20 text-orange-300 border border-orange-400/30 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                      ISKCON Devotee Television Theatre
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold hidden sm:inline">
                      100% Real HD YouTube Broadcast
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-base font-devanagari font-black text-orange-300 line-clamp-1">
                    इस्कॉन १८-चैनल २४x७ लाइव टीवी थियेटर एवं दिव्य भजन रेडियो
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setIsTheatreMode(!isTheatreMode)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-orange-300 hover:text-white transition-colors cursor-pointer"
                  title={isTheatreMode ? 'सामान्य दृश्य' : 'थियेटर मोड'}
                >
                  {isTheatreMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-orange-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="px-4 py-2 border-b border-orange-400/15 bg-[#0e0a05] flex items-center gap-2 overflow-x-auto custom-scrollbar text-xs font-bold shrink-0">
              {[
                { id: 'tv_network', label: '📺 १. इस्कॉन टीवी (१८ लाइव चैनल)', icon: Tv },
                { id: 'radio_network', label: '📻 २. २४x७ कृष्ण यूट्यूब रेडियो (६ स्टेशन)', icon: Radio },
                { id: 'japa_16_rounds', label: '📿 ३. १६ माला तुलसी जप', icon: Flower2 },
                { id: 'aarti_timings', label: '📜 ४. नित्य आरती समय-सारणी', icon: Flame },
                { id: 'notices', label: '📢 ५. भक्त सूचना पट्ट (Notices)', icon: Bell },
                { id: 'festivals', label: '🗓️ ६. वैष्णव पंचांग व एकादशी', icon: Calendar },
                { id: 'prabhupada_gita', label: '📖 ७. श्रील प्रभुपाद गीता व नियम', icon: BookOpen }
              ].map(tab => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-400 to-amber-500 text-black shadow-md scale-103 font-black'
                        : 'bg-[#181108] border border-orange-400/20 text-[#f5eed9]/80 hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Body with Side-by-Side Flex Layout */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-5 bg-[#060402]">
              
              {/* ── TAB 1: 24x7 ISKCON REAL TV THEATRE SCREEN ───────────────── */}
              {activeTab === 'tv_network' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-full">
                  
                  {/* LEFT: REAL TV THEATRE SCREEN (7/12 COLS) */}
                  <div className="lg:col-span-7 flex flex-col space-y-3">
                    
                    <div className="p-3.5 sm:p-4 rounded-3xl bg-gradient-to-b from-[#1c1206] via-[#0d0803] to-[#040201] border-2 border-orange-400/50 shadow-[0_0_50px_rgba(249,115,22,0.2)] space-y-3">
                      
                      {/* OSD Header Bar */}
                      <div className="flex items-center justify-between gap-2 border-b border-orange-400/20 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-lg bg-orange-500 text-black font-black text-xs font-mono">
                            CH-{selectedChannel.channelNo < 10 ? `0${selectedChannel.channelNo}` : selectedChannel.channelNo}
                          </span>
                          <div>
                            <h4 className="text-sm sm:text-base font-devanagari font-black text-orange-200 line-clamp-1">
                              {selectedChannel.nameHindi}
                            </h4>
                            <p className="text-[10px] text-orange-300/70 font-sans line-clamp-1">
                              {selectedChannel.location} • विग्रह: {selectedChannel.deities}
                            </p>
                          </div>
                        </div>

                        {/* Remote Controls */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={(e) => toggleFavorite(selectedChannel.id, e)}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              favoriteChannelIds.includes(selectedChannel.id)
                                ? 'bg-rose-500/20 border-rose-400/40 text-rose-400'
                                : 'bg-[#1e1509] border-orange-400/30 text-orange-300/60'
                            }`}
                            title="पसंदीदा"
                          >
                            <Heart className={`w-3.5 h-3.5 ${favoriteChannelIds.includes(selectedChannel.id) ? 'fill-current' : ''}`} />
                          </button>

                          <button
                            onClick={handlePrevChannel}
                            className="px-2.5 py-1 rounded-lg bg-[#1e1509] hover:bg-orange-400 hover:text-black border border-orange-400/30 text-orange-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                          >
                            <ChevronLeft className="w-3 h-3" />
                            <span>CH-</span>
                          </button>
                          <button
                            onClick={handleNextChannel}
                            className="px-2.5 py-1 rounded-lg bg-[#1e1509] hover:bg-orange-400 hover:text-black border border-orange-400/30 text-orange-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                          >
                            <span>CH+</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Video Player Viewport */}
                      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border-2 border-[#2b1d0c] shadow-[inset_0_0_80px_rgba(0,0,0,0.9),0_0_40px_rgba(249,115,22,0.25)]">
                        <iframe
                          key={`${selectedChannel.id}_${activeVideoId}`}
                          src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                          title={selectedChannel.name}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      </div>

                      {/* On-Screen Program & Direct YouTube Link */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-amber-400 font-bold shrink-0">प्रोग्राम:</span>
                          <span className="font-sans font-bold text-[#f5eed9] truncate">
                            {currentEpisode.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {selectedChannel.fallbackPlaylist.length > 1 && (
                            <button
                              onClick={handleRotateNextEpisode}
                              className="px-2.5 py-1 rounded-lg bg-teal-500/20 hover:bg-teal-500 hover:text-black border border-teal-400/40 text-teal-300 font-bold text-[11px] transition-all cursor-pointer flex items-center gap-1"
                            >
                              <RotateCw className="w-3 h-3" />
                              <span>✨ अगला वीडियो</span>
                            </button>
                          )}
                          <a
                            href={`https://www.youtube.com/watch?v=${activeVideoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-[11px] font-bold flex items-center gap-1"
                          >
                            <span>यूट्यूब पर खोलें ↗</span>
                          </a>
                        </div>
                      </div>

                    </div>

                    {/* Multi-Episode Selection */}
                    {selectedChannel.fallbackPlaylist.length > 1 && (
                      <div className="p-3 rounded-2xl bg-[#0d0904] border border-orange-400/20 space-y-2">
                        <span className="text-[11px] text-orange-300/80 font-bold flex items-center gap-1">
                          <Film className="w-3.5 h-3.5 text-orange-400" />
                          <span>{selectedChannel.nameHindi} के उपलब्ध वीडियोज:</span>
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {selectedChannel.fallbackPlaylist.map((ep, idx) => {
                            const isCurrent = currentEpisode.id === ep.id;
                            const isWatched = !!watchedMap[ep.id];
                            return (
                              <button
                                key={ep.id}
                                onClick={() => {
                                  setCurrentEpisode(ep);
                                  setEpisodeIndex(idx);
                                  setIsFreshVideo(!watchedMap[ep.id]);
                                  recordVideoView(ep.id);
                                }}
                                className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col justify-between cursor-pointer ${
                                  isCurrent
                                    ? 'bg-orange-500/30 border-orange-400 text-orange-200 font-bold'
                                    : 'bg-[#060402] border-white/10 text-[#f5eed9]/70 hover:border-orange-400/40 hover:text-white'
                                }`}
                              >
                                <div className="line-clamp-2 leading-snug">{ep.title}</div>
                                <div className="flex items-center justify-between text-[10px] text-orange-400/80 mt-1">
                                  <span>{ep.duration || 'HD'}</span>
                                  <span>{isWatched ? '✓ दृष्ट' : '✨ ताज़ा'}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* RIGHT: CHANNEL GUIDE & 18 TEMPLES SELECTOR (5/12 COLS) */}
                  <div className="lg:col-span-5 flex flex-col space-y-3">
                    
                    {/* Region Filter Header */}
                    <div className="flex items-center justify-between gap-2 border-b border-orange-400/20 pb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-orange-300">
                        <Tv className="w-4 h-4 text-orange-400" />
                        <span>चैनल डायरेक्टरी (१८ चैनल्स)</span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px]">
                        {[
                          { id: 'all', label: 'सभी' },
                          { id: 'delhi_ncr', label: 'दिल्ली NCR' },
                          { id: 'india_top', label: 'प्रमुख धाम' }
                        ].map(f => (
                          <button
                            key={f.id}
                            onClick={() => setChannelRegionFilter(f.id as any)}
                            className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                              channelRegionFilter === f.id
                                ? 'bg-orange-400 text-black font-bold'
                                : 'bg-[#140e06] text-orange-200/70'
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Scrollable Channel List */}
                    <div className="space-y-2 overflow-y-auto max-h-[480px] custom-scrollbar pr-1">
                      {filteredChannels.map(channel => {
                        const isSelected = selectedChannel.id === channel.id;
                        const isFav = favoriteChannelIds.includes(channel.id);
                        return (
                          <div
                            key={channel.id}
                            onClick={() => switchChannel(channel)}
                            className={`p-2.5 rounded-2xl border transition-all cursor-pointer text-left flex items-center justify-between gap-3 ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#2a1a0a] to-[#140c04] border-orange-400 shadow-md scale-101'
                                : 'bg-[#0d0904] border-orange-400/20 hover:border-orange-400/60 hover:bg-[#181006]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="px-2 py-1 rounded-lg bg-orange-500/20 text-orange-300 font-mono text-xs font-black shrink-0">
                                CH-{channel.channelNo < 10 ? `0${channel.channelNo}` : channel.channelNo}
                              </span>
                              <div className="min-w-0">
                                <h5 className="text-xs sm:text-sm font-devanagari font-bold text-[#f5eed9] truncate">
                                  {channel.nameHindi}
                                </h5>
                                <p className="text-[10px] text-orange-200/60 font-sans truncate">
                                  {channel.location}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {isFav && <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />}
                              <span className="text-[10px] font-mono text-amber-400 font-bold flex items-center gap-1">
                                <Users className="w-2.5 h-2.5" />
                                {channel.activeViewers.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>

                </div>
              )}

              {/* ── TAB 2: 24x7 KRISHNA YOUTUBE RADIO NETWORK ───────────────── */}
              {activeTab === 'radio_network' && (
                <div className="space-y-5">
                  <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-[#181108] via-[#0d0904] to-black border-2 border-orange-400/40 shadow-2xl space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-orange-400/20 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center text-2xl text-black font-bold shadow-lg animate-pulse">
                          {selectedRadioStation.icon}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-400/20 text-orange-300 border border-orange-400/30 font-bold">
                            STATION {selectedRadioStation.stationNo} • २४x७ अखंड लाइव ब्रॉडकास्ट
                          </span>
                          <h4 className="text-base sm:text-lg font-devanagari font-black text-[#f5eed9] mt-0.5">
                            {selectedRadioStation.nameHindi}
                          </h4>
                          <p className="text-xs text-orange-300/70 font-sans">
                            गायक/मंडली: {selectedRadioStation.singer} • {selectedRadioStation.tagline}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="relative w-full aspect-video sm:h-72 rounded-2xl overflow-hidden bg-black border-2 border-orange-500/30 shadow-[0_0_40px_rgba(249,115,22,0.2)]">
                      <iframe
                        key={selectedRadioStation.id}
                        src={`https://www.youtube.com/embed/${selectedRadioStation.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                        title={selectedRadioStation.name}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  </div>

                  {/* Radio Stations Directory */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 border-b border-orange-400/20 pb-2">
                      <RadioTower className="w-4 h-4 text-orange-400" />
                      <h4 className="text-sm font-devanagari font-black text-[#f5eed9] uppercase tracking-wider">
                        अन्य कृष्ण रेडियो स्टेशन्स (चुनने के लिए क्लिक करें):
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {KRISHNA_RADIO_STATIONS.map(st => {
                        const isSelected = selectedRadioStation.id === st.id;
                        return (
                          <div
                            key={st.id}
                            onClick={() => setSelectedRadioStation(st)}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-2 flex flex-col justify-between ${
                              isSelected
                                ? 'bg-gradient-to-br from-[#241608] to-[#140c04] border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.3)] scale-102'
                                : 'bg-[#0d0904] border-orange-400/20 hover:border-orange-400/60 hover:bg-[#181006]'
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-300 font-mono text-[10px] font-bold">
                                  STATION {st.stationNo}
                                </span>
                                <span className="text-xl">{st.icon}</span>
                              </div>
                              <h5 className="text-sm font-devanagari font-bold text-[#f5eed9] line-clamp-1">
                                {st.nameHindi}
                              </h5>
                              <p className="text-xs text-orange-200/70 font-sans line-clamp-2">
                                {st.tagline}
                              </p>
                            </div>

                            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-orange-300/80 font-mono">
                              <span>{st.singer}</span>
                              <span className="text-amber-400 font-bold flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {st.activeListeners.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB 3: 16 ROUNDS DAILY JAPA COUNTER ──────────────────── */}
              {activeTab === 'japa_16_rounds' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#201408] via-[#140c04] to-[#201408] border-2 border-orange-400/40 text-center space-y-4 shadow-xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-400/20 border border-orange-400/30 text-orange-300 text-xs font-bold font-mono">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>श्रील प्रभुपाद मूल साधना निर्देश: नित्य १६ माला महामंत्र जप</span>
                    </div>

                    <h3 className="text-xl sm:text-3xl font-devanagari font-black text-amber-300 max-w-2xl mx-auto leading-relaxed">
                      हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे ।<br />
                      हरे राम हरे राम राम राम हरे हरे ॥
                    </h3>

                    <div className="py-4 flex flex-col sm:flex-row items-center justify-center gap-6">
                      <div className="relative w-40 h-40 rounded-full bg-[#0a0703] border-4 border-orange-400/60 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(249,115,22,0.3)]">
                        <span className="text-[11px] text-orange-300/70 font-mono uppercase tracking-widest">
                          मणका (Bead)
                        </span>
                        <span className={`text-4xl font-black font-mono text-[#f5eed9] transition-transform ${isBeadAnimating ? 'scale-125 text-orange-400' : ''}`}>
                          {currentBead}
                        </span>
                        <span className="text-[10px] text-orange-400 font-bold">
                          / १०८ मणके
                        </span>
                      </div>

                      <div className="relative w-40 h-40 rounded-full bg-[#0a0703] border-4 border-amber-400/60 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(217,119,6,0.3)]">
                        <span className="text-[11px] text-amber-300/70 font-mono uppercase tracking-widest">
                          पूर्ण माला (Rounds)
                        </span>
                        <span className="text-4xl font-black font-mono text-amber-300">
                          {completedRounds}
                        </span>
                        <span className="text-[10px] text-amber-400 font-bold">
                          / १६ दैनिक संकल्प
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={handleIncrementBead}
                        className="px-8 py-4 rounded-3xl bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-black font-black text-base font-devanagari shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <span>📿 १ मणका जपें (Touch Bead)</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB 4: DAILY AARTI SCHEDULE ───────────────────────────── */}
              {activeTab === 'aarti_timings' && (
                <div className="space-y-4">
                  <div className="text-center space-y-1">
                    <h4 className="text-lg font-devanagari font-black text-orange-300">
                      इस्कॉन नित्य मन्दिर आरती एवं दर्शन समय-सारणी
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {ISKCON_DAILY_AARTI_SCHEDULE.map((aarti, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#0d0904] border border-orange-400/25 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-lg bg-orange-400/20 text-orange-300 font-mono text-xs font-black">
                            {aarti.time}
                          </span>
                          <Flame className="w-4 h-4 text-orange-400" />
                        </div>
                        <h5 className="text-sm font-devanagari font-bold text-[#f5eed9]">
                          {aarti.name}
                        </h5>
                        <p className="text-xs text-orange-200/70 font-sans">
                          {aarti.significance}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── TAB 5: DEVOTEE NOTICES ─────────────────────────────────── */}
              {activeTab === 'notices' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ISKCON_DEVOTEE_NOTICES.map(notice => (
                      <div
                        key={notice.id}
                        className="p-5 rounded-3xl bg-[#0d0904] border border-orange-400/30 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span 
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold"
                            style={{ backgroundColor: `${notice.badgeColor}20`, color: notice.badgeColor }}
                          >
                            {notice.categoryLabel}
                          </span>
                          <span className="text-[11px] font-mono text-orange-300/70">
                            {notice.dateStr}
                          </span>
                        </div>
                        <h5 className="text-base font-devanagari font-bold text-[#f5eed9]">
                          {notice.title}
                        </h5>
                        <p className="text-xs text-orange-200/60 font-sans flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-orange-400" />
                          <span>{notice.temple}</span>
                        </p>
                        <p className="text-xs text-orange-200/80 font-sans leading-relaxed">
                          {notice.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── TAB 6: VAISHNAVA CALENDAR ──────────────────────────────── */}
              {activeTab === 'festivals' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {UPCOMING_VAISHNAVA_FESTIVALS.map(f => (
                    <div
                      key={f.id}
                      className="p-5 rounded-3xl bg-[#0d0904] border border-orange-400/30 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 font-mono text-[10px] font-bold">
                          {f.monthStr}
                        </span>
                        <Calendar className="w-4 h-4 text-orange-400" />
                      </div>
                      <div>
                        <h5 className="text-base font-devanagari font-bold text-amber-300">
                          {f.nameHindi}
                        </h5>
                        <span className="text-[11px] font-mono text-orange-200/60 block">
                          {f.dateStr}
                        </span>
                      </div>
                      <p className="text-xs text-[#f5eed9]/80 font-sans leading-relaxed">
                        {f.significance}
                      </p>
                      <div className="pt-2 border-t border-white/5 space-y-1 text-[11px]">
                        <p className="text-orange-300 font-bold">उपवास नियम: {f.fastingRule}</p>
                        {f.paranTime && (
                          <p className="text-teal-300 font-mono">पारण समय: {f.paranTime}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── TAB 7: SRILA PRABHUPADA TEACHINGS ──────────────────────── */}
              {activeTab === 'prabhupada_gita' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="p-6 rounded-3xl bg-[#0d0904] border-2 border-orange-400/40 space-y-4">
                    <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-wider">
                      <Flower2 className="w-4 h-4" />
                      <span>श्रील प्रभुपाद प्रणाम मन्त्र</span>
                    </div>
                    <pre className="font-devanagari text-base sm:text-lg text-amber-300 font-bold whitespace-pre-wrap leading-relaxed">
                      {SRILA_PRABHUPADA_TEACHINGS.pranamMantra}
                    </pre>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-base font-devanagari font-black text-orange-300">
                      ४ वैष्णव सदाचार नियम (4 Regulative Principles):
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SRILA_PRABHUPADA_TEACHINGS.regulativePrinciples.map((p, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-[#0a0703] border border-orange-400/20 space-y-1"
                        >
                          <h6 className="text-sm font-devanagari font-bold text-amber-300">
                            {p.name}
                          </h6>
                          <p className="text-xs text-orange-200/70 font-sans">
                            {p.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Bottom Bar */}
            <div className="px-6 py-2 border-t border-orange-400/20 bg-[#060402] flex items-center justify-between text-xs text-orange-200/80 shrink-0">
              <span>🛕 श्रील प्रभुपाद आंतरराष्ट्रीय कृष्णभावनामृत संघ (ISKCON Global TV Theatre)</span>
              <span className="font-mono text-teal-300 hidden sm:inline">
                100% Real HD YouTube Broadcast Active
              </span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
