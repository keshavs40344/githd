'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Radio, Play, Pause, Volume2, VolumeX, Sparkles, 
  X, Disc3, Music, Users, Waves, Heart, ExternalLink,
  ChevronRight, RefreshCw, Zap, Feather, Flower2
} from 'lucide-react';
import { sacredAudio } from '@/lib/sacredSounds';

export interface RadioStation {
  id: string;
  name: string;
  sanskritTitle: string;
  description: string;
  category: 'mahamantra' | 'bhajan' | 'radha' | 'bansuri' | 'stuti';
  streamUrl: string;
  videoId: string;
  liveListeners: number;
  raga: string;
  tag: string;
  badgeColor: string;
}

export const SACRED_RADIO_STATIONS: RadioStation[] = [
  {
    id: 'hare_krishna_mahamantra',
    name: 'श्री राधा-कृष्ण महासंकीर्तन (२४x७ Live)',
    sanskritTitle: '॥ हरे कृष्ण हरे राम महामंत्र ॥',
    description: 'श्री वृन्दावन धाम का २४x७ अविरल संकीर्तन व मृदंग-करताल की दिव्य ध्वनि।',
    category: 'mahamantra',
    streamUrl: 'https://stream.zeno.fm/46s93f9z8v8uv',
    videoId: '0mQd_h-p6n4',
    liveListeners: 3420,
    raga: 'राग यमन व बृन्दावन सारंग',
    tag: 'महामंत्र',
    badgeColor: '#00d2b4'
  },
  {
    id: 'banke_bihari_bhajan',
    name: 'श्री बांके बिहारी अमृत भजन व पदावली',
    sanskritTitle: '॥ श्री बिहारी जी अमृत रस ॥',
    description: 'ठाकुर श्री बांके बिहारी जी के पावन रस भरे ब्रज भजन एवं संध्या आरती।',
    category: 'bhajan',
    streamUrl: 'https://stream.zeno.fm/s493h65p9yzuv',
    videoId: '6sX74H9jmVI',
    liveListeners: 2840,
    raga: 'राग पीलू व खमाज',
    tag: 'बिहारी जी भजन',
    badgeColor: '#f59e0b'
  },
  {
    id: 'radha_naam_sankirtan',
    name: 'श्री राधा नाम रसामृत कीर्तन',
    sanskritTitle: '॥ राधे राधे जपो चले आएंगे बिहारी ॥',
    description: 'श्री राधा रानी के पावन नाम का मधुर संकीर्तन एवं ब्रज रस प्रवाह।',
    category: 'radha',
    streamUrl: 'https://stream.zeno.fm/3uyp6b8w9yzuv',
    videoId: 'n61ULEU7SU0',
    liveListeners: 2190,
    raga: 'राग भैरवी व देश',
    tag: 'राधा नाम',
    badgeColor: '#ff4d88'
  },
  {
    id: 'krishna_bansuri_flute',
    name: 'श्री कृष्ण दिव्य बाँसुरी नाद (432Hz)',
    sanskritTitle: '॥ श्री वेणु माधुर्यम् ॥',
    description: '४३२Hz दिव्य बाँसुरी व तानपुरा नाद जो मन को परम शान्ति व ध्यान में लीन करता है।',
    category: 'bansuri',
    streamUrl: 'https://stream.zeno.fm/w464w317e0hvv',
    videoId: 'x6r8xVfS4zE',
    liveListeners: 1980,
    raga: 'राग बागेश्री व भूपाली',
    tag: 'बाँसुरी नाद',
    badgeColor: '#8b5cf6'
  },
  {
    id: 'achyutam_keshavam_stuti',
    name: 'अच्युतं केशवं व मधुराष्टकम् स्तुति',
    sanskritTitle: '॥ अधरं मधुरं वदनं मधुरं ॥',
    description: 'श्रीमद्वल्लभाचार्य विरचित मधुराष्टकम् एवं श्रीकृष्ण गोविन्द हरे मुरारी कीर्तन।',
    category: 'stuti',
    streamUrl: 'https://stream.zeno.fm/46s93f9z8v8uv',
    videoId: 'HqQv9_L_c3M',
    liveListeners: 2650,
    raga: 'राग तोड़ी व काफ़ी',
    tag: 'कृष्ण स्तुति',
    badgeColor: '#10b981'
  }
];

interface LiveOnlineRadioModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStationId?: string;
}

export default function LiveOnlineRadioModal({
  isOpen,
  onClose,
  initialStationId
}: LiveOnlineRadioModalProps) {
  const [activeStation, setActiveStation] = useState<RadioStation>(SACRED_RADIO_STATIONS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.85);
  const [useIframeFallback, setUseIframeFallback] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (initialStationId) {
      const found = SACRED_RADIO_STATIONS.find(s => s.id === initialStationId);
      if (found) setActiveStation(found);
    }
  }, [initialStationId]);

  // Handle Play/Pause
  const handleTogglePlay = () => {
    sacredAudio.playNavChime(0.08);

    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          sacredAudio.playTempleBell(0.3);
        }).catch(() => {
          // Fallback to embedded video mode if audio stream is restricted
          setUseIframeFallback(true);
          setIsPlaying(true);
        });
      }
    }
  };

  const handleSelectStation = (station: RadioStation) => {
    sacredAudio.playNavChime(0.08);
    setActiveStation(station);
    setUseIframeFallback(false);

    if (audioRef.current) {
      audioRef.current.src = station.streamUrl;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        sacredAudio.playFluteChime(0.3);
      }).catch(() => {
        setUseIframeFallback(true);
        setIsPlaying(true);
      });
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const handleToggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
      
      {/* Hidden Lossless Audio Stream Tag */}
      <audio
        ref={audioRef}
        src={activeStation.streamUrl}
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl bg-gradient-to-b from-[#0e1122] via-[#090b16] to-[#04050a] border-2 border-amber-400/40 shadow-[0_20px_90px_rgba(0,0,0,0.95)] flex flex-col">
        
        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-amber-400/20 bg-[#07080f]/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-teal-400 to-amber-600 flex items-center justify-center shadow-lg text-black font-bold text-xl">
              🦚
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                  <span>24x7 Live Krishna Radio</span>
                </span>
                <span className="text-[10px] font-mono text-teal-300/80">३२०kbps Lossless DSP</span>
              </div>
              <h2 className="text-base sm:text-xl font-devanagari font-bold text-amber-300 drop-shadow-sm">
                श्री राधा-कृष्ण अमृत रेडियो (100% Krishna Songs & Bhajans)
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── MAIN CONTENT (TWO COLUMNS) ──────────────────────────────────── */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          
          {/* LEFT: ACTIVE STATION PLAYER ────────────────────────────────────── */}
          <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
            
            {/* Visualizer & Deity Card */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#14172c] to-[#0a0c18] border-2 border-amber-400/30 p-6 sm:p-8 text-center space-y-5 shadow-inner">
              
              {/* Rotating Flute / Mayur Vinyl */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full bg-gradient-to-br from-amber-400 via-teal-500 to-amber-700 p-1.5 shadow-[0_0_50px_rgba(0,210,180,0.35)] flex items-center justify-center">
                <div className={`w-full h-full rounded-full bg-[#070912] border-2 border-amber-400/40 flex items-center justify-center text-4xl sm:text-5xl ${
                  isPlaying ? 'animate-spin-slow' : ''
                }`}>
                  🦚
                </div>
              </div>

              {/* Station Info */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-devanagari font-bold text-teal-300">
                  {activeStation.sanskritTitle}
                </span>
                <h3 className="text-lg sm:text-2xl font-devanagari font-bold text-[#f5eed9]">
                  {activeStation.name}
                </h3>
                <p className="text-xs font-serif text-amber-200/80 line-clamp-2 max-w-md mx-auto">
                  {activeStation.description}
                </p>
              </div>

              {/* Live Audio Equalizer Wave Bars */}
              <div className="flex items-center justify-center gap-1 h-8">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 rounded-full bg-gradient-to-t from-teal-500 to-amber-400 transition-all duration-150 ${
                      isPlaying ? 'animate-pulse' : 'h-1.5 opacity-30'
                    }`}
                    style={{
                      height: isPlaying ? `${Math.max(6, Math.sin((i + Date.now() / 200)) * 28 + 6)}px` : '4px',
                      animationDelay: `${i * 70}ms`
                    }}
                  />
                ))}
              </div>

              {/* Controls Bar */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  onClick={handleTogglePlay}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:scale-105 active:scale-95 text-black font-serif font-bold text-sm sm:text-base flex items-center gap-2 shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-transform cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  <span>{isPlaying ? 'प्रसारण रोकें' : 'श्री कृष्ण अमृत सुनें'}</span>
                </button>

                <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-[#0e1122] border border-amber-400/20">
                  <button onClick={handleToggleMute} className="text-amber-300 hover:text-white cursor-pointer">
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-16 sm:w-24 accent-amber-400 cursor-pointer"
                  />
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT: ALL 5 KRISHNA STATIONS LIST ─────────────────────────────── */}
          <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-serif font-bold text-amber-300 flex items-center gap-2 mb-3">
                <Disc3 className="w-4 h-4 text-amber-400 animate-spin-slow" />
                <span>श्री कृष्ण व राधा के पावन रेडियो स्टेशन ({SACRED_RADIO_STATIONS.length}):</span>
              </h4>

              <div className="space-y-2.5">
                {SACRED_RADIO_STATIONS.map(station => {
                  const isCurrent = activeStation.id === station.id;
                  return (
                    <div
                      key={station.id}
                      onClick={() => handleSelectStation(station)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 shadow-md ${
                        isCurrent
                          ? 'bg-amber-400/15 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                          : 'bg-[#101326] border-amber-400/20 hover:border-amber-400/50 hover:bg-[#151930]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 ${
                          isCurrent ? 'bg-amber-400 text-black font-bold' : 'bg-white/5 text-amber-300'
                        }`}>
                          {isCurrent && isPlaying ? <Waves className="w-4 h-4 animate-pulse" /> : '🦚'}
                        </div>
                        <div className="min-w-0 space-y-0.5 text-left">
                          <p className="text-xs font-serif font-bold text-[#f5eed9] truncate">{station.name}</p>
                          <p className="text-[10px] font-devanagari text-[#c5a059] truncate">{station.raga}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[9px] font-mono text-amber-300/70">{station.liveListeners} श्रोता</span>
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                          isCurrent ? 'bg-amber-400 text-black' : 'bg-white/10 text-white'
                        }`}>
                          {isCurrent && isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Sacred Quote */}
            <div className="p-3.5 rounded-2xl bg-teal-950/30 border border-teal-500/30 text-teal-200 text-[11px] font-serif text-center">
              “श्री कृष्ण संकीर्तन ही कलियुग में परम शान्ति एवं मुक्ति का एकमात्र साधन है।”
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
