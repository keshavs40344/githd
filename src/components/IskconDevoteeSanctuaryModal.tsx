'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles, Radio, Heart, BookOpen, Calendar, MapPin,
  CheckCircle2, Volume2, VolumeX, Users, Play, Pause, X, ExternalLink,
  Award, Flame, Flower2, Shield, Tv, Bell, RefreshCw, ChevronLeft, ChevronRight,
  Info, Share2, Compass, AlertCircle, RotateCw, History, Film
} from 'lucide-react';
import { 
  ISKCON_TV_CHANNELS, ISKCON_DAILY_AARTI_SCHEDULE, 
  ISKCON_DEVOTEE_NOTICES, UPCOMING_VAISHNAVA_FESTIVALS, 
  SRILA_PRABHUPADA_TEACHINGS, IskconTvChannel, FallbackEpisode,
  getSmartFreshFallbackEpisode
} from '@/data/iskconGlobalData';
import { sacredAudio } from '@/lib/sacredSounds';

const WATCHED_STORAGE_KEY = 'dharma_iskcon_watched_videos_v1';
const FAVORITES_STORAGE_KEY = 'dharma_iskcon_favorite_channels_v1';

export default function IskconDevoteeSanctuaryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'tv_network' | 'japa_16_rounds' | 'aarti_timings' | 'notices' | 'festivals' | 'prabhupada_gita'>('tv_network');
  
  // TV & Live Stream State
  const [selectedChannel, setSelectedChannel] = useState<IskconTvChannel>(ISKCON_TV_CHANNELS[0]);
  const [channelRegionFilter, setChannelRegionFilter] = useState<'all' | 'delhi_ncr' | 'india_top'>('all');
  const [mediaMode, setMediaMode] = useState<'video' | 'radio'>('video');
  const [useFallbackVideo, setUseFallbackVideo] = useState<boolean>(false);
  const [currentEpisode, setCurrentEpisode] = useState<FallbackEpisode>(
    ISKCON_TV_CHANNELS[0].fallbackPlaylist[0]
  );
  const [isFreshVideo, setIsFreshVideo] = useState<boolean>(true);
  const [episodeIndex, setEpisodeIndex] = useState<number>(0);
  const [watchedMap, setWatchedMap] = useState<Record<string, number>>({});
  const [favoriteChannelIds, setFavoriteChannelIds] = useState<string[]>([]);
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
    sacredAudio.playNavChime(0.05);
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

  // Switch Channel
  const switchChannel = (channel: IskconTvChannel) => {
    setSelectedChannel(channel);
    setUseFallbackVideo(false);
    applySmartVideoSelection(channel);
    sacredAudio.playNavChime(0.06);
  };

  // Rotate to Next Fresh Episode (DevOps continuous cycle)
  const handleRotateNextEpisode = () => {
    sacredAudio.playTempleBell(0.2);
    const playlist = selectedChannel.fallbackPlaylist;
    if (!playlist || playlist.length === 0) return;

    // Pick next index in playlist
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
    sacredAudio.playNavChime(0.05);
    sacredAudio.vibrate(20);
    setIsBeadAnimating(true);
    setTimeout(() => setIsBeadAnimating(false), 200);

    if (currentBead + 1 >= 108) {
      setCurrentBead(1);
      setCompletedRounds(prev => {
        const next = Math.min(16, prev + 1);
        if (next === 16) {
          sacredAudio.playTripleGhanta(0.6);
        } else {
          sacredAudio.playTempleBell(0.4);
        }
        return next;
      });
    } else {
      setCurrentBead(prev => prev + 1);
    }
  };

  const filteredChannels = ISKCON_TV_CHANNELS.filter(c => {
    if (channelRegionFilter === 'all') return true;
    return c.region === channelRegionFilter;
  });

  return (
    <>
      {/* ── HEADER / SANCTUARY TRIGGER BUTTON ────────────────────────────── */}
      <button
        onClick={() => {
          sacredAudio.playTripleGhanta(0.5);
          setIsOpen(true);
          applySmartVideoSelection(selectedChannel);
        }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-400/20 to-amber-600/20 hover:from-amber-500/30 hover:to-orange-400/30 border-2 border-orange-400/40 text-orange-300 hover:text-white text-xs font-serif font-bold shadow-[0_0_20px_rgba(249,115,22,0.25)] hover:scale-103 active:scale-95 transition-all cursor-pointer"
        title="इस्कॉन २४x७ टीवी नेटवर्क, दिल्ली व अखिल भारतीय धाम लाइव दर्शन"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
        </span>
        <Tv className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
        <span>इस्कॉन टीवी व भक्त संगम (18 Live Channels)</span>
      </button>

      {/* ── FULLSCREEN ISKCON SANCTUARY MODAL ────────────────────────────── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-3xl animate-fade-in font-serif">
          <div className="relative w-full max-w-7xl max-h-[96vh] overflow-hidden rounded-3xl bg-gradient-to-b from-[#120e06] via-[#0a0704] to-[#040302] border-2 border-orange-400/50 shadow-[0_30px_120px_rgba(0,0,0,0.99)] flex flex-col">
            
            {/* Modal Top Bar */}
            <div className="px-5 py-3.5 border-b border-orange-400/20 bg-[#080502]/95 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-600 flex items-center justify-center text-xl text-black font-bold shadow-lg">
                  🛕
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-400/20 text-orange-300 border border-orange-400/30 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                      ISKCON 24x7 Television Network
                    </span>
                    <span className="text-[10px] font-mono text-teal-300 font-bold hidden sm:inline flex items-center gap-1">
                      <RotateCw className="w-3 h-3 text-teal-400 animate-spin" style={{ animationDuration: '6s' }} />
                      DevOps Smart Deduplication Active
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-devanagari font-black text-orange-300">
                    इस्कॉन वैश्विक भक्त संगम एवं २४x७ लाइव टीवी नेटवर्क
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-orange-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="px-4 py-2.5 border-b border-orange-400/15 bg-[#0e0a05] flex items-center gap-2 overflow-x-auto custom-scrollbar text-xs font-bold">
              {[
                { id: 'tv_network', label: '📺 १. इस्कॉन टीवी (१८ लाइव चैनल)', icon: Tv },
                { id: 'japa_16_rounds', label: '📿 २. १६ माला तुलसी जप', icon: Flower2 },
                { id: 'aarti_timings', label: '📜 ३. नित्य आरती समय-सारणी', icon: Flame },
                { id: 'notices', label: '📢 ४. भक्त सूचना पट्ट (Notices)', icon: Bell },
                { id: 'festivals', label: '🗓️ ५. वैष्णव पंचांग व एकादशी', icon: Calendar },
                { id: 'prabhupada_gita', label: '📖 ६. श्रील प्रभुपाद गीता व नियम', icon: BookOpen }
              ].map(tab => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      sacredAudio.playNavChime(0.04);
                      setActiveTab(tab.id as any);
                    }}
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

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-[#060402]">
              
              {/* ── TAB 1: 24x7 ISKCON TV NETWORK & LIVE DARSHAN ──────────── */}
              {activeTab === 'tv_network' && (
                <div className="space-y-6">
                  
                  {/* Television Screen Container */}
                  <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-[#140e06] via-[#0d0904] to-[#060402] border-2 border-orange-400/40 shadow-2xl space-y-4">
                    
                    {/* TV Top Header & Channel Switcher */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-orange-400/20 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-xl bg-orange-500 text-black font-black text-xs font-mono tracking-wider shadow-sm">
                          CH-{selectedChannel.channelNo < 10 ? `0${selectedChannel.channelNo}` : selectedChannel.channelNo}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base sm:text-lg font-devanagari font-black text-orange-200">
                              {selectedChannel.nameHindi}
                            </h4>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 font-mono text-[10px] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                              LIVE ON AIR
                            </span>
                            
                            {/* DevOps Fresh Episode Status Badge */}
                            {useFallbackVideo && (
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[10px] font-bold border ${
                                isFreshVideo 
                                  ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300' 
                                  : 'bg-amber-500/20 border-amber-400/40 text-amber-300'
                              }`}>
                                <Sparkles className="w-2.5 h-2.5" />
                                {isFreshVideo ? '✨ ताज़ा नया वीडियो (Unseen)' : '🔄 पूर्व दृष्ट (Rewatch)'}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-orange-300/70 font-sans flex items-center gap-1.5 mt-0.5">
                            <MapPin className="w-3 h-3 text-orange-400" />
                            <span>{selectedChannel.location} • विग्रह: {selectedChannel.deities}</span>
                          </p>
                        </div>
                      </div>

                      {/* Mode & Channel Controls */}
                      <div className="flex items-center gap-2">
                        {/* Video vs Radio Mode Toggle */}
                        <div className="p-1 rounded-2xl bg-[#1e1509] border border-orange-400/30 flex items-center gap-1 text-xs">
                          <button
                            onClick={() => { setMediaMode('video'); sacredAudio.playNavChime(0.04); }}
                            className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                              mediaMode === 'video' ? 'bg-orange-400 text-black font-bold' : 'text-orange-200 hover:text-white'
                            }`}
                          >
                            📺 TV वीडियो
                          </button>
                          <button
                            onClick={() => { setMediaMode('radio'); sacredAudio.playNavChime(0.04); }}
                            className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                              mediaMode === 'radio' ? 'bg-orange-400 text-black font-bold' : 'text-orange-200 hover:text-white'
                            }`}
                          >
                            📻 432Hz रेडियो
                          </button>
                        </div>

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => toggleFavorite(selectedChannel.id, e)}
                          className={`p-2 rounded-xl border transition-all cursor-pointer ${
                            favoriteChannelIds.includes(selectedChannel.id)
                              ? 'bg-rose-500/20 border-rose-400/40 text-rose-400'
                              : 'bg-[#1e1509] border-orange-400/30 text-orange-300/60 hover:text-orange-300'
                          }`}
                          title="पसंदीदा चैनल में जोड़ें"
                        >
                          <Heart className={`w-4 h-4 ${favoriteChannelIds.includes(selectedChannel.id) ? 'fill-current' : ''}`} />
                        </button>

                        {/* Prev & Next Channel TV Remote */}
                        <button
                          onClick={handlePrevChannel}
                          className="p-2 rounded-xl bg-[#1e1509] hover:bg-orange-400 hover:text-black border border-orange-400/30 text-orange-300 transition-all cursor-pointer"
                          title="पिछला चैनल"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleNextChannel}
                          className="p-2 rounded-xl bg-[#1e1509] hover:bg-orange-400 hover:text-black border border-orange-400/30 text-orange-300 transition-all cursor-pointer"
                          title="अगला चैनल"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* TV Screen Viewport */}
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border-2 border-orange-500/30 shadow-[0_0_50px_rgba(249,115,22,0.15)]">
                      {mediaMode === 'video' ? (
                        <iframe
                          src={
                            useFallbackVideo
                              ? `https://www.youtube-nocookie.com/embed/${currentEpisode.id}?autoplay=1&rel=0&modestbranding=1`
                              : `${selectedChannel.liveStreamEmbedUrl}&autoplay=1`
                          }
                          title={selectedChannel.name}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        /* Radio Audio Mode with Sacred Resonance Visualizer */
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4 bg-gradient-to-b from-[#181108] via-[#0e0a05] to-black">
                          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center text-black shadow-[0_0_40px_rgba(249,115,22,0.4)] animate-pulse">
                            <Radio className="w-10 h-10" />
                          </div>
                          <div>
                            <span className="text-xs font-mono uppercase tracking-widest text-orange-400 font-bold">
                              ४३२Hz दिव्य संकीर्तन रेडियो प्रसारण
                            </span>
                            <h3 className="text-xl font-devanagari font-black text-[#f5eed9] mt-1">
                              {selectedChannel.nameHindi}
                            </h3>
                            <p className="text-xs text-orange-200/70 max-w-md mx-auto mt-1">
                              {selectedChannel.description}
                            </p>
                          </div>
                          
                          {/* Audio Controls */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => sacredAudio.playTempleBell(0.35)}
                              className="px-4 py-2 rounded-xl bg-orange-500/20 border border-orange-400/40 text-orange-300 hover:bg-orange-500 hover:text-black font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                            >
                              <Flame className="w-3.5 h-3.5" />
                              <span>मन्दिर घंटी नाद</span>
                            </button>
                            <button
                              onClick={() => sacredAudio.playShankhnaad(0.35)}
                              className="px-4 py-2 rounded-xl bg-orange-500/20 border border-orange-400/40 text-orange-300 hover:bg-orange-500 hover:text-black font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>शंखनाद</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* TV Bottom Smart Fallback Bar & Episode Rotation */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-orange-200/80 pt-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-amber-400 font-bold">💡 लाइव प्रसारण व स्मार्ट रोटेशन:</span>
                        <span>
                          {useFallbackVideo
                            ? `प्रदर्शित: ${currentEpisode.title} (${episodeIndex + 1}/${selectedChannel.fallbackPlaylist.length})`
                            : 'यूट्यूब लाइव स्ट्रीम सक्रिय है। यदि लाइव सत्र विराम पर हो तो क्लिक करें:'}
                        </span>

                        <button
                          onClick={() => {
                            setUseFallbackVideo(!useFallbackVideo);
                            sacredAudio.playNavChime(0.05);
                            if (!useFallbackVideo) {
                              applySmartVideoSelection(selectedChannel);
                            }
                          }}
                          className="px-2.5 py-1 rounded-lg bg-orange-500/20 hover:bg-orange-500 hover:text-black border border-orange-400/40 text-orange-300 font-bold transition-all cursor-pointer"
                        >
                          {useFallbackVideo ? '🔄 मूल लाइव चैनल पर लौटें' : '📺 २४x७ दर्शन / कथा वीडियो देखें'}
                        </button>

                        {/* Rotate Next Fresh Episode Button */}
                        {useFallbackVideo && selectedChannel.fallbackPlaylist.length > 1 && (
                          <button
                            onClick={handleRotateNextEpisode}
                            className="px-2.5 py-1 rounded-lg bg-teal-500/20 hover:bg-teal-500 hover:text-black border border-teal-400/40 text-teal-300 font-bold transition-all cursor-pointer flex items-center gap-1"
                            title="अगला ताज़ा वीडियो लोड करें (DevOps Smart Rotation)"
                          >
                            <RotateCw className="w-3 h-3" />
                            <span>✨ अगला नया वीडियो ({episodeIndex + 1}/{selectedChannel.fallbackPlaylist.length})</span>
                          </button>
                        )}
                      </div>

                      <a
                        href={selectedChannel.youtubeChannelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 transition-all font-bold"
                      >
                        <span>यूट्यूब चैनल खोलें</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Multi-Episode Selection Vault */}
                    {useFallbackVideo && selectedChannel.fallbackPlaylist.length > 1 && (
                      <div className="pt-2 border-t border-orange-400/15 space-y-2">
                        <span className="text-[11px] text-orange-300/80 font-bold flex items-center gap-1">
                          <Film className="w-3.5 h-3.5 text-orange-400" />
                          <span>इस मन्दिर के अन्य उपलब्ध वीडियो एवं आरती (चुनने के लिए क्लिक करें):</span>
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
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
                                  sacredAudio.playNavChime(0.04);
                                }}
                                className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col justify-between cursor-pointer ${
                                  isCurrent
                                    ? 'bg-orange-500/30 border-orange-400 text-orange-200 font-bold'
                                    : 'bg-[#0a0703] border-white/10 text-[#f5eed9]/70 hover:border-orange-400/40 hover:text-white'
                                }`}
                              >
                                <div className="line-clamp-2 leading-snug">{ep.title}</div>
                                <div className="flex items-center justify-between text-[10px] text-orange-400/80 mt-1">
                                  <span>{ep.duration || 'Full HD'}</span>
                                  <span>{isWatched ? '✓ दृष्ट (Watched)' : '✨ ताज़ा (Unseen)'}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Channel Guide & Directory */}
                  <div className="space-y-3">
                    
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-orange-400/20 pb-2">
                      <div className="flex items-center gap-2">
                        <Tv className="w-4 h-4 text-orange-400" />
                        <h4 className="text-sm font-devanagari font-black text-[#f5eed9] uppercase tracking-wider">
                          इस्कॉन टीवी चैनल डायरेक्टरी (चैनल चुनें):
                        </h4>
                      </div>

                      {/* Region Filters */}
                      <div className="flex items-center gap-1.5 text-xs">
                        {[
                          { id: 'all', label: 'सभी १८ चैनल' },
                          { id: 'delhi_ncr', label: '🏛️ दिल्ली NCR (८ केंद्र)' },
                          { id: 'india_top', label: '🛕 अखिल भारतीय प्रमुख धाम (१० केंद्र)' }
                        ].map(f => (
                          <button
                            key={f.id}
                            onClick={() => {
                              setChannelRegionFilter(f.id as any);
                              sacredAudio.playNavChime(0.04);
                            }}
                            className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                              channelRegionFilter === f.id
                                ? 'bg-orange-400 text-black font-bold shadow-sm'
                                : 'bg-[#140e06] border border-orange-400/20 text-orange-200/70 hover:text-white'
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Channel Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {filteredChannels.map(channel => {
                        const isSelected = selectedChannel.id === channel.id;
                        const isFav = favoriteChannelIds.includes(channel.id);
                        return (
                          <div
                            key={channel.id}
                            onClick={() => switchChannel(channel)}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left flex flex-col justify-between space-y-2 group ${
                              isSelected
                                ? 'bg-gradient-to-br from-[#241608] to-[#140c04] border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.3)] scale-102'
                                : 'bg-[#0d0904] border-orange-400/20 hover:border-orange-400/60 hover:bg-[#181006]'
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className="px-2 py-0.5 rounded-md bg-orange-500/20 border border-orange-400/30 text-orange-300 font-mono text-[10px] font-black">
                                  CH-{channel.channelNo < 10 ? `0${channel.channelNo}` : channel.channelNo}
                                </span>
                                <div className="flex items-center gap-1.5">
                                  {isFav && <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />}
                                  {channel.isLiveNow && (
                                    <span className="flex items-center gap-1 text-[10px] font-mono text-red-400 font-bold">
                                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                                      LIVE
                                    </span>
                                  )}
                                </div>
                              </div>
                              <h5 className="text-sm font-devanagari font-bold text-[#f5eed9] group-hover:text-orange-300 transition-colors line-clamp-1">
                                {channel.nameHindi}
                              </h5>
                              <p className="text-[11px] text-orange-200/60 font-sans line-clamp-1">
                                {channel.location}
                              </p>
                            </div>

                            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-orange-300/80">
                              <span>{channel.deities}</span>
                              <span className="font-mono text-amber-400 font-bold flex items-center gap-1">
                                <Users className="w-3 h-3" />
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

              {/* ── TAB 2: 16 ROUNDS DAILY JAPA COUNTER ──────────────────── */}
              {activeTab === 'japa_16_rounds' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  
                  {/* Japa Banner */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#201408] via-[#140c04] to-[#201408] border-2 border-orange-400/40 text-center space-y-4 shadow-xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-400/20 border border-orange-400/30 text-orange-300 text-xs font-bold font-mono">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>श्रील प्रभुपाद मूल साधना निर्देश: नित्य १६ माला महामंत्र जप</span>
                    </div>

                    <h3 className="text-xl sm:text-3xl font-devanagari font-black text-amber-300 max-w-2xl mx-auto leading-relaxed">
                      हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे ।<br />
                      हरे राम हरे राम राम राम हरे हरे ॥
                    </h3>

                    {/* Live Bead Counter Circle */}
                    <div className="py-4 flex flex-col sm:flex-row items-center justify-center gap-6">
                      
                      {/* Bead Progress */}
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

                      {/* Rounds Progress */}
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

                    {/* Click To Chant Button */}
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={handleIncrementBead}
                        className="px-8 py-4 rounded-3xl bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-black font-black text-base font-devanagari shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <span>📿 १ मणका जपें (Touch Bead)</span>
                      </button>
                    </div>

                    <p className="text-xs text-orange-200/70 font-sans max-w-md mx-auto">
                      प्रत्येक क्लिक पर पवित्र तुलसी माला की स्पर्श ध्वनि व कंपन उत्पन्न होता है। १०८ मणके पूर्ण होने पर मन्दिर घण्टा नाद स्वतः बजता है।
                    </p>

                  </div>

                </div>
              )}

              {/* ── TAB 3: DAILY AARTI SCHEDULE ───────────────────────────── */}
              {activeTab === 'aarti_timings' && (
                <div className="space-y-4">
                  <div className="text-center space-y-1">
                    <h4 className="text-lg font-devanagari font-black text-orange-300">
                      इस्कॉन नित्य मन्दिर आरती एवं दर्शन समय-सारणी (Daily Darshan Schedule)
                    </h4>
                    <p className="text-xs text-orange-200/70">
                      विश्व के सभी इस्कॉन मन्दिरों में श्रील प्रभुपाद द्वारा निर्धारित सार्वभौमिक दैनिक सेवा क्रम
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {ISKCON_DAILY_AARTI_SCHEDULE.map((aarti, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#0d0904] border border-orange-400/25 hover:border-orange-400/60 transition-all space-y-2"
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

              {/* ── TAB 4: DEVOTEE COMMUNITY NOTICE BOARD ──────────────────── */}
              {activeTab === 'notices' && (
                <div className="space-y-4">
                  <div className="text-center space-y-1">
                    <h4 className="text-lg font-devanagari font-black text-orange-300">
                      इस्कॉन भक्त सूचना पट्ट एवं सेवा अभियान (Devotee Notice Board)
                    </h4>
                    <p className="text-xs text-orange-200/70">
                      अखिल भारतीय इस्कॉन मन्दिरों से आगामी उत्सव, यूथ फोरम वर्कशॉप व अन्नदान सूचनाएं
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ISKCON_DEVOTEE_NOTICES.map(notice => (
                      <div
                        key={notice.id}
                        className="p-5 rounded-3xl bg-[#0d0904] border border-orange-400/30 hover:border-orange-400/70 transition-all space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span 
                              className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold"
                              style={{ backgroundColor: `${notice.badgeColor}20`, color: notice.badgeColor, borderColor: `${notice.badgeColor}40`, borderWidth: 1 }}
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

                        {notice.actionText && (
                          <div className="pt-3 border-t border-white/5 flex justify-end">
                            <button
                              onClick={() => sacredAudio.playNavChime(0.05)}
                              className="px-3.5 py-1.5 rounded-xl bg-orange-500/20 hover:bg-orange-500 hover:text-black border border-orange-400/30 text-orange-300 font-bold text-xs transition-all cursor-pointer"
                            >
                              {notice.actionText} →
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── TAB 5: VAISHNAVA CALENDAR & EKADASHI ───────────────────── */}
              {activeTab === 'festivals' && (
                <div className="space-y-4">
                  <div className="text-center space-y-1">
                    <h4 className="text-lg font-devanagari font-black text-orange-300">
                      वैष्णव पंचांग एवं एकादशी महाव्रत २०२६-२०२७ (Vaishnava Calendar)
                    </h4>
                    <p className="text-xs text-orange-200/70">
                      एकादशी उपवास, पारण समय एवं प्रमुख वैष्णव आविर्भाव तिथियां
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {UPCOMING_VAISHNAVA_FESTIVALS.map(f => (
                      <div
                        key={f.id}
                        className="p-5 rounded-3xl bg-[#0d0904] border border-orange-400/30 hover:border-orange-400/70 transition-all space-y-3"
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
                </div>
              )}

              {/* ── TAB 6: SRILA PRABHUPADA TEACHINGS & 4 PRINCIPLES ──────── */}
              {activeTab === 'prabhupada_gita' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  
                  {/* Pranam Mantra Box */}
                  <div className="p-6 rounded-3xl bg-[#0d0904] border-2 border-orange-400/40 space-y-4">
                    <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-wider">
                      <Flower2 className="w-4 h-4" />
                      <span>श्रील प्रभुपाद प्रणाम मन्त्र (Srila Prabhupada Pranam Mantra)</span>
                    </div>
                    <pre className="font-devanagari text-base sm:text-lg text-amber-300 font-bold whitespace-pre-wrap leading-relaxed">
                      {SRILA_PRABHUPADA_TEACHINGS.pranamMantra}
                    </pre>
                    <p className="text-xs text-orange-200/60 font-mono italic">
                      {SRILA_PRABHUPADA_TEACHINGS.pranamMantraEnglish}
                    </p>
                  </div>

                  {/* 4 Regulative Principles */}
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

                  {/* Core Gita Instruction */}
                  <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-400/30 text-xs text-orange-200 leading-relaxed font-sans">
                    <strong className="text-orange-300 block mb-1">📜 श्रील प्रभुपाद का मुख्य संदेश:</strong>
                    {SRILA_PRABHUPADA_TEACHINGS.coreInstruction}
                  </div>

                </div>
              )}

            </div>

            {/* Modal Bottom Bar */}
            <div className="px-6 py-3 border-t border-orange-400/20 bg-[#060402] flex flex-wrap items-center justify-between gap-3 text-xs text-orange-200/80">
              <span className="flex items-center gap-1.5">
                <span>🛕 श्रील प्रभुपाद आंतरराष्ट्रीय कृष्णभावनामृत संघ (ISKCON Global Network)</span>
              </span>
              <span className="font-mono text-teal-300">
                DevOps Smart Rotation • 100% Free Lifetime Devotional Broadcast
              </span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
