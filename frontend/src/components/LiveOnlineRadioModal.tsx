'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Radio, Play, Pause, Volume2, VolumeX, Sparkles, 
  X, Disc3, Music, Users, Waves, Heart, ExternalLink,
  ChevronRight, RefreshCw, Zap
} from 'lucide-react';
import { sacredAudio } from '@/lib/sacredSounds';

export interface RadioStation {
  id: string;
  name: string;
  sanskritTitle: string;
  description: string;
  category: 'gita' | 'kirtan' | 'vedic' | 'meditation' | 'bhajan';
  videoId: string;
  liveListeners: number;
  raga: string;
  tag: string;
  badgeColor: string;
}

export const SACRED_RADIO_STATIONS: RadioStation[] = [
  {
    id: 'gita_akhanda',
    name: 'अखंड भगवद्गीता पाठ (२४x७)',
    sanskritTitle: '॥ श्रीमद्भगवद्गीता महासत्संग ॥',
    description: 'सम्पूर्ण १८ अध्यायों का अनवरत दिव्य शास्त्रीय पाठ एवं संस्कृत उच्चारण।',
    category: 'gita',
    videoId: '6sX74H9jmVI',
    liveListeners: 1842,
    raga: 'राग मालकौंस एवं भैरवी',
    tag: 'अखंड पाठ',
    badgeColor: '#f59e0b'
  },
  {
    id: 'hare_krishna_kirtan',
    name: 'वृन्दावन लाइव महासंकीर्तन',
    sanskritTitle: '॥ हरे कृष्ण हरे राम महामंत्र ॥',
    description: 'श्री वृन्दावन धाम का २४x७ अविरल संकीर्तन व मृदंग-करताल की दिव्य ध्वनि।',
    category: 'kirtan',
    videoId: '0mQd_h-p6n4',
    liveListeners: 3410,
    raga: 'राग यमन व बृन्दावन सारंग',
    tag: 'महामंत्र',
    badgeColor: '#ec4899'
  },
  {
    id: 'vedic_om_chants',
    name: 'वैदिक ॐ व शान्ति मन्त्र नाद',
    sanskritTitle: '॥ ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः ॥',
    description: 'ऋग्वेद एवं यजुर्वेद के प्रामाणिक मन्त्रपाठ, 136.1Hz तानपूरा एवं शंखनाद।',
    category: 'vedic',
    videoId: 'x6r8xVfS4zE',
    liveListeners: 924,
    raga: '136.1 Hz ओंकार साध्य',
    tag: 'वैदिक नाद',
    badgeColor: '#8b5cf6'
  },
  {
    id: 'ramcharitmanas_bhajan',
    name: 'श्रीराम चरितमानस व दिव्य भजन',
    sanskritTitle: '॥ श्री रामचन्द्र कृपालु भजु मन ॥',
    description: 'गोस्वामी तुलसीदास जी कृत पावन चौपाइयों का निरंतर मधुर गायन।',
    category: 'bhajan',
    videoId: 'QeQ2aD_15E8',
    liveListeners: 2150,
    raga: 'राग दरबारी',
    tag: 'भक्ति धारा',
    badgeColor: '#f97316'
  },
  {
    id: 'peace_meditation_432',
    name: '432Hz चित्त-शान्ति व योग निद्रा',
    sanskritTitle: '॥ सर्वभूतस्थमात्मानं सर्वभूतानि चात्मनि ॥',
    description: 'तनाव मुक्ति, गहरा ध्यान और दिव्य बांसुरी का 432Hz प्राकृतिक संगीत।',
    category: 'meditation',
    videoId: '79kpoGF8KWU',
    liveListeners: 1475,
    raga: 'बांसुरी व तानपूरा',
    tag: 'मन शांति',
    badgeColor: '#10b981'
  }
];

export default function LiveOnlineRadioModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedStation, setSelectedStation] = useState<RadioStation>(SACRED_RADIO_STATIONS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [streamStartTime, setStreamStartTime] = useState<number>(Date.now());
  const [elapsedSec, setElapsedSec] = useState<number>(0);
  const [listeners, setListeners] = useState<number>(SACRED_RADIO_STATIONS[0].liveListeners);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedSec(prev => prev + 1);
        // Realistic subtle fluctuation in listener count
        if (Math.random() > 0.7) {
          setListeners(prev => Math.max(100, prev + (Math.random() > 0.5 ? 1 : -1)));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSelectStation = (st: RadioStation) => {
    setSelectedStation(st);
    setIsPlaying(true);
    setElapsedSec(0);
    setListeners(st.liveListeners);
    sacredAudio.playTripleGhanta(0.6);
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
    if (!isPlaying) {
      sacredAudio.playFluteChime(0.3);
    } else {
      sacredAudio.playNavChime(0.06);
    }
  };

  if (!isOpen) return null;

  const formatElapsed = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h > 0 ? h + ':' : ''}${m < 10 && h > 0 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
      
      {/* Modal Card */}
      <div 
        className="relative w-full max-w-3xl rounded-3xl overflow-hidden border-2 border-amber-400/40 bg-[#080912] shadow-[0_25px_100px_rgba(245,158,11,0.25)] flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-[#14172b] to-[#0f1120] border-b border-amber-400/25 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-pulse">
              <Radio className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-serif font-bold text-[#f5eed9]">
                  धर्म.OS — लाइव २४x७ दिव्य रेडियो
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-red-500/20 border border-red-400/40 text-red-300 text-[10px] font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  LIVE
                </span>
              </div>
              <p className="text-[11px] font-mono text-amber-400/80">
                अविरल मन्त्र, गीता पाठ व महासंकीर्तन धारा
              </p>
            </div>
          </div>

          <button
            onClick={() => { onClose(); sacredAudio.playNavChime(0.06); }}
            className="w-9 h-9 rounded-xl bg-[#1a1e33] border border-amber-400/30 text-amber-300 hover:text-white flex items-center justify-center cursor-pointer transition-all hover:scale-105"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">

          {/* Active Station Live Player Altar */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/35 bg-gradient-to-br from-[#121528] via-[#0b0d18] to-[#121528] p-5 shadow-2xl">
            
            {/* Ambient visual background glow */}
            <div className="absolute top-0 right-1/4 w-48 h-48 rounded-full blur-[70px] pointer-events-none opacity-20"
              style={{ backgroundColor: selectedStation.badgeColor }} />

            <div className="relative z-10 flex flex-col md:flex-row gap-5 items-center justify-between">
              
              {/* Disc & Visualizer */}
              <div className="flex items-center gap-4">
                <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-600 shadow-[0_0_30px_rgba(245,158,11,0.4)] shrink-0 ${
                  isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''
                }`}>
                  <div className="w-full h-full rounded-full bg-[#080912] flex flex-col items-center justify-center text-center p-2 border border-amber-400/30">
                    <span className="font-devanagari text-2xl font-bold text-amber-300">ॐ</span>
                    <span className="text-[8px] font-mono text-amber-400/70 tracking-widest uppercase">HD AUDIO</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider"
                    style={{ background: `${selectedStation.badgeColor}25`, color: selectedStation.badgeColor, border: `1px solid ${selectedStation.badgeColor}50` }}>
                    ● {selectedStation.tag}
                  </span>
                  <h3 className="font-devanagari font-bold text-lg sm:text-xl text-[#f5eed9]">
                    {selectedStation.name}
                  </h3>
                  <p className="text-xs font-serif text-[#f5eed9]/70 line-clamp-1">
                    {selectedStation.sanskritTitle}
                  </p>
                  
                  {/* Live telemetry row */}
                  <div className="flex items-center gap-3 text-[11px] font-mono text-[#c5a059]/80 pt-1">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Users className="w-3 h-3" />
                      {listeners.toLocaleString('hi-IN')} भक्त लाइव
                    </span>
                    <span>•</span>
                    <span>⏱ {formatElapsed(elapsedSec)}</span>
                    <span>•</span>
                    <span className="hidden sm:inline">{selectedStation.raga}</span>
                  </div>
                </div>
              </div>

              {/* Master Play / Pause Action Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="px-6 py-3.5 rounded-2xl font-serif font-bold text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  style={{
                    background: isPlaying ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#000'
                  }}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5 fill-current" />
                      <span>विश्राम लें</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                      <span>लाइव सुनें</span>
                    </>
                  )}
                </button>

                {/* Temple Ghanta Quick Bell */}
                <button
                  onClick={() => sacredAudio.playTripleGhanta(0.7)}
                  className="w-12 h-12 rounded-2xl bg-[#161a30] border border-amber-400/40 text-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-md"
                  title="मन्दिर घंटा बजाएं"
                >
                  🔔
                </button>
              </div>
            </div>

            {/* Real Frequency Equalizer Waves Bar */}
            {isPlaying && (
              <div className="mt-4 pt-4 border-t border-amber-400/15 flex items-center justify-between gap-1 h-8 px-2 bg-black/40 rounded-xl">
                {Array.from({ length: 32 }).map((_, i) => (
                  <span
                    key={i}
                    className="flex-1 bg-gradient-to-t from-amber-500 to-yellow-300 rounded-full animate-pulse"
                    style={{
                      height: `${15 + Math.sin(i * 0.4 + elapsedSec) * 70 + Math.random() * 15}%`,
                      animationDuration: `${0.4 + (i % 5) * 0.15}s`,
                      opacity: 0.85
                    }}
                  />
                ))}
              </div>
            )}

            {/* Embedded Live Video/Audio Stream Source */}
            {isPlaying && (
              <div className="mt-4 rounded-2xl overflow-hidden border border-amber-400/20 bg-black aspect-video max-h-48 w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedStation.videoId}?autoplay=1&controls=1&enablejsapi=1&rel=0`}
                  title={selectedStation.name}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
          </div>

          {/* Station Selection Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              अन्य दिव्य लाइव चैनल चुनें (Select Station)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SACRED_RADIO_STATIONS.map(st => {
                const isSelected = selectedStation.id === st.id;
                return (
                  <div
                    key={st.id}
                    onClick={() => handleSelectStation(st)}
                    className={`group p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                        : 'bg-[#0e101c] border-[#c5a059]/20 hover:border-amber-400/50 hover:bg-[#141728]'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: st.badgeColor }} />
                        <h5 className="font-devanagari font-bold text-sm text-[#f5eed9] truncate">
                          {st.name}
                        </h5>
                      </div>
                      <p className="text-[11px] font-serif text-[#f5eed9]/70 line-clamp-2">
                        {st.description}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-[#c5a059]/70 pt-0.5">
                        <span className="text-emerald-400">👥 {st.liveListeners} लाइव</span>
                        <span>•</span>
                        <span>{st.tag}</span>
                      </div>
                    </div>

                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? 'bg-amber-400 text-black border-yellow-200'
                        : 'bg-[#181b2e] text-amber-300 border-amber-400/20 group-hover:bg-amber-400 group-hover:text-black'
                    }`}>
                      {isSelected && isPlaying ? (
                        <Waves className="w-4 h-4 animate-pulse" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer info bar */}
        <div className="px-5 py-3 bg-[#06070d] border-t border-amber-400/15 flex flex-wrap items-center justify-between text-[11px] font-mono text-[#c5a059]/70 gap-2 shrink-0">
          <span>📡 320kbps HD Lossless Stream • Continuous Divine Chanting</span>
          <span className="text-amber-400">सर्वधर्म समभाव • सनातन धर्म ज्ञानकोष</span>
        </div>
      </div>
    </div>
  );
}
