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
  category: 'mahamantra' | 'bhajan' | 'radha' | 'bansuri' | 'stuti' | 'prabhupada' | 'mayapur';
  streamUrl: string;
  videoId: string;
  liveListeners: number;
  raga: string;
  tag: string;
  badgeColor: string;
}

export const SACRED_RADIO_STATIONS: RadioStation[] = [
  {
    id: 'prabhupada_original_kirtan',
    name: 'श्रील प्रभुपाद मूल हरे कृष्ण कीर्तन (Srila Prabhupada)',
    sanskritTitle: '॥ हिज डिवाइन ग्रेस श्रील प्रभुपाद संकीर्तन ॥',
    description: 'इस्कॉन संस्थापक आचार्य श्रील प्रभुपाद की दिव्य वाणी में महामंत्र एवं मृदंग कीर्तन।',
    category: 'prabhupada',
    streamUrl: 'https://stream.zeno.fm/46s93f9z8v8uv',
    videoId: '0mQd_h-p6n4',
    liveListeners: 5480,
    raga: 'गौड़ीय वैष्णव संकीर्तन',
    tag: 'श्रील प्रभुपाद',
    badgeColor: '#00d2b4'
  },
  {
    id: 'mayapur_24hr_kirtan',
    name: 'श्री मायापुर धाम अखंड २४x७ कीर्तन (Mayapur Live)',
    sanskritTitle: '॥ श्रीधाम मायापुर २४ घण्टे अखण्ड कीर्तन ॥',
    description: 'श्री चैतन्य महाप्रभु के जन्मस्थान श्रीधाम मायापुर का २४ घण्टे लाइव संकीर्तन।',
    category: 'mayapur',
    streamUrl: 'https://stream.zeno.fm/s493h65p9yzuv',
    videoId: '6sX74H9jmVI',
    liveListeners: 4620,
    raga: 'राग यमन व बृन्दावन सारंग',
    tag: 'मायापुर अखंड',
    badgeColor: '#f59e0b'
  },
  {
    id: 'govindam_adi_purusham',
    name: 'इस्कॉन गोविन्दम् आदि पुरुषम् आरती (Brahma Samhita)',
    sanskritTitle: '॥ गोविन्दमादिपुरुषं तमहं भजामि ॥',
    description: 'विश्व के सभी इस्कॉन मन्दिरों में प्रातः होने वाली दिव्य ब्रह्म-संहिता आरती।',
    category: 'stuti',
    streamUrl: 'https://stream.zeno.fm/3uyp6b8w9yzuv',
    videoId: 'n61ULEU7SU0',
    liveListeners: 3950,
    raga: 'राग मालकौंस व दरबारी',
    tag: 'गोविन्दम् स्तुति',
    badgeColor: '#d4af37'
  },
  {
    id: 'vrindavan_balaram_aarti',
    name: 'श्री वृन्दावन कृष्ण-बलराम मन्दिर संध्या आरती',
    sanskritTitle: '॥ श्री वृन्दावन कृष्ण बलराम आरती ॥',
    description: 'श्री वृन्दावन धाम स्थित इस्कॉन कृष्ण-बलराम मंदिर की पावन संध्या आरती।',
    category: 'bhajan',
    streamUrl: 'https://stream.zeno.fm/w464w317e0hvv',
    videoId: 'x6r8xVfS4zE',
    liveListeners: 3810,
    raga: 'राग भैरवी व देश',
    tag: 'वृन्दावन आरती',
    badgeColor: '#ff4d88'
  },
  {
    id: 'damodarashtakam_bhajan',
    name: 'श्री दामोदराष्टकम् एवं मधुर भजन (Damodarashtakam)',
    sanskritTitle: '॥ नमामीश्वरं सच्चिदानन्दरूपं ॥',
    description: 'सत्यव्रत मुनि रचित श्री कृष्ण दामोदर स्तुति एवं कार्तिक दीपदान भजन।',
    category: 'stuti',
    streamUrl: 'https://stream.zeno.fm/46s93f9z8v8uv',
    videoId: '0mQd_h-p6n4',
    liveListeners: 2940,
    raga: 'राग असावरी',
    tag: 'दामोदराष्टकम्',
    badgeColor: '#8b5cf6'
  },
  {
    id: 'krishna_bansuri_432hz',
    name: 'श्री कृष्ण दिव्य बाँसुरी नाद व तानपुरा (432Hz Raga)',
    sanskritTitle: '॥ श्री वेणु माधुर्यम् एवं 432Hz तानपुरा ॥',
    description: '४३२Hz दिव्य बाँसुरी व तानपुरा नाद जो मन को असीम शान्ति व ध्यान में लीन करता है।',
    category: 'bansuri',
    streamUrl: 'https://stream.zeno.fm/s493h65p9yzuv',
    videoId: 'x6r8xVfS4zE',
    liveListeners: 2470,
    raga: 'राग बागेश्री व भूपाली',
    tag: '४३२Hz बाँसुरी',
    badgeColor: '#10b981'
  },
  {
    id: 'jaya_radha_madhava',
    name: 'जय राधा माधव कुंजबिहारी (Jaya Radha Madhava)',
    sanskritTitle: '॥ जय राधामाधव जय कुञ्जविहारी ॥',
    description: 'श्रील भक्तिविनोद ठाकुर विरचित एवं श्रील प्रभुपाद द्वारा नित्य गाया जाने वाला पावन भजन।',
    category: 'radha',
    streamUrl: 'https://stream.zeno.fm/3uyp6b8w9yzuv',
    videoId: 'n61ULEU7SU0',
    liveListeners: 3120,
    raga: 'राग खमाज',
    tag: 'राधा माधव',
    badgeColor: '#ec4899'
  }
];

export interface LiveOnlineRadioModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  showTriggerButton?: boolean;
}

export default function LiveOnlineRadioModal({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  showTriggerButton = true
}: LiveOnlineRadioModalProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleClose = () => {
    sacredAudio.playNavChime(0.04);
    if (externalOnClose) {
      externalOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleOpen = () => {
    sacredAudio.playTempleBell(0.18);
    setInternalIsOpen(true);
  };
  const [activeStation, setActiveStation] = useState<RadioStation>(SACRED_RADIO_STATIONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [audioError, setAudioError] = useState(false);
  const [isTanpuraRunning, setIsTanpuraRunning] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playStation = (station: RadioStation) => {
    setActiveStation(station);
    setIsPlaying(true);
    setAudioError(false);
    sacredAudio.playNavChime(0.06);

    if (audioRef.current) {
      audioRef.current.src = station.streamUrl;
      audioRef.current.load();
      audioRef.current.play().catch(() => {
        setAudioError(true);
      });
    }
  };

  const togglePlay = () => {
    sacredAudio.playNavChime(0.05);
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      setAudioError(false);
      audioRef.current?.play().catch(() => {
        setAudioError(true);
      });
    }
  };

  const toggleTanpura = () => {
    sacredAudio.playNavChime(0.05);
    if (isTanpuraRunning) {
      sacredAudio.stopTanpura();
      setIsTanpuraRunning(false);
    } else {
      sacredAudio.startTanpura(0.15);
      setIsTanpuraRunning(true);
    }
  };

  const filteredStations = SACRED_RADIO_STATIONS.filter(s => {
    if (activeTab === 'all') return true;
    return s.category === activeTab;
  });

  return (
    <>
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setAudioError(true)}
      />

      {/* ── HEADER RADIO TRIGGER BUTTON ──────────────────────────────────── */}
      {showTriggerButton && externalIsOpen === undefined && (
        <button
          onClick={handleOpen}
          className="px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-400/20 via-orange-500/20 to-yellow-500/20 hover:from-amber-400/30 hover:to-yellow-400/30 border border-amber-400/40 text-amber-300 hover:text-white flex items-center gap-2 text-xs font-serif font-bold transition-all shadow-md cursor-pointer group"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
          <Radio className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
          <span>इस्कॉन रेडियो (24x7 Live)</span>
        </button>
      )}

      {/* ── RADIO MODAL OVERLAY ──────────────────────────────────────────── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-2xl animate-fade-in font-serif">
          <div className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden bg-[#0a0c18] border-2 border-amber-400/50 shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-amber-400/20 bg-[#060810] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-600 flex items-center justify-center text-black font-bold text-lg shadow-lg">
                  🛕
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-devanagari font-black text-amber-300 flex items-center gap-2">
                    इस्कॉन २४x७ अखण्ड हरिनाम संकीर्तन रेडियो
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 font-mono">
                      C++ 432Hz DSP
                    </span>
                  </h2>
                  <p className="text-xs text-amber-200/70 font-serif">
                    श्रील प्रभुपाद, श्रीधाम मायापुर एवं वृन्दावन का अखण्ड संकीर्तन व वेणु माधुर्य
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-amber-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* Active Playing Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-[#14182e] via-[#0e1224] to-[#14182e] border-2 border-amber-400/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                
                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>सम्प्रति प्रवाहित: {activeStation.tag}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-devanagari font-black text-[#f5eed9]">
                    {activeStation.name}
                  </h3>
                  <p className="text-xs text-amber-300/80 font-devanagari">
                    {activeStation.sanskritTitle}
                  </p>
                  <p className="text-xs text-[#f5eed9]/70 max-w-lg leading-relaxed">
                    {activeStation.description}
                  </p>
                </div>

                {/* Player Controls */}
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 hover:from-amber-300 text-black flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.6)] group-hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                    </button>

                    <button
                      onClick={toggleTanpura}
                      className={`px-3 py-2 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isTanpuraRunning
                          ? 'bg-teal-500/20 border-teal-400 text-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.4)]'
                          : 'bg-white/5 border-white/15 text-[#f5eed9]/70 hover:text-white'
                      }`}
                    >
                      <Waves className="w-3.5 h-3.5" />
                      <span>{isTanpuraRunning ? '४३२Hz तानपुरा (सक्रिय)' : '४३२Hz तानपुरा'}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-amber-300/80">
                    <Users className="w-3.5 h-3.5" />
                    <span>{activeStation.liveListeners.toLocaleString()} भक्त श्रवण कर रहे हैं</span>
                  </div>
                </div>

              </div>

              {/* YouTube Embedded Stream Frame */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-amber-400/30 shadow-lg">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeStation.videoId}?autoplay=${isPlaying ? 1 : 0}&rel=0`}
                  title={activeStation.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Category Filter Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                {[
                  { id: 'all', label: 'सभी इस्कॉन चैनल्स' },
                  { id: 'prabhupada', label: '🛕 श्रील प्रभुपाद कीर्तन' },
                  { id: 'mayapur', label: '🌸 मायापुर अखंड' },
                  { id: 'stuti', label: '📜 गोविन्दम् व स्तुति' },
                  { id: 'bhajan', label: '📿 वृन्दावन आरती' },
                  { id: 'bansuri', label: '🎵 ४३२Hz बाँसुरी नाद' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      sacredAudio.playNavChime(0.04);
                      setActiveTab(tab.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-amber-400 text-black shadow-md'
                        : 'bg-[#101326] border border-amber-400/20 text-[#f5eed9]/80 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Stations Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredStations.map(station => {
                  const isCurrent = activeStation.id === station.id;
                  return (
                    <div
                      key={station.id}
                      onClick={() => playStation(station)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isCurrent
                          ? 'bg-[#181d38] border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                          : 'bg-[#0e1122] border-white/10 hover:border-amber-400/50 hover:bg-[#14172c]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold">
                            {station.tag}
                          </span>
                          <span className="text-[10px] text-[#c5a059]/80 font-mono">
                            {station.raga}
                          </span>
                        </div>
                        <h4 className="text-sm font-devanagari font-bold text-[#f5eed9]">
                          {station.name}
                        </h4>
                        <p className="text-xs text-[#f5eed9]/60 line-clamp-1">
                          {station.description}
                        </p>
                      </div>

                      <button
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          isCurrent && isPlaying
                            ? 'bg-amber-400 text-black shadow-md scale-105'
                            : 'bg-white/10 text-amber-300 hover:bg-amber-400 hover:text-black'
                        }`}
                      >
                        {isCurrent && isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-amber-400/20 bg-[#060810] flex flex-wrap items-center justify-between gap-3 text-xs text-amber-200/80">
              <span>🛕 इस्कॉन श्रील प्रभुपाद दिव्य ध्वनि तरंग • C++23 432Hz Harmonic Resonance</span>
              <span className="font-mono text-teal-300">100% Free Lifetime Devotional Broadcast</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
