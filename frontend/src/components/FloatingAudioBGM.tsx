'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, VolumeX, Play, Pause, Music, ChevronUp, ChevronDown, 
  Sparkles, Wand2, RefreshCw, Radio, Disc3, ShieldCheck, Heart 
} from 'lucide-react';
import { REALISTIC_BHAGWAT_TRACKS } from '@/data/sacredMusic';
import { sacredAudio } from '@/lib/sacredSounds';

interface BGMTrack {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  raga: string;
  audioUrl?: string;
  duration?: string;
  mood?: string;
  baseFreq?: number;
  isAiGenerated?: boolean;
}

const DEFAULT_TRACKS: BGMTrack[] = REALISTIC_BHAGWAT_TRACKS.map(t => ({
  ...t,
  baseFreq: 136.1
}));

const SACRED_SCENARIOS = [
  { id: 'flute_peace', label: '🪈 वृन्दावन संध्या मुरली', desc: 'परम शांति, मानसिक विश्राम एवं यमुना तट की बाँसुरी', raga: 'राग यमन' },
  { id: 'kurukshetra_courage', label: '⚔️ कुरुक्षेत्र शौर्य व विजय नाद', desc: 'भय मुक्ति, आंतरिक साहस एवं शंखनाद', raga: 'राग भैरव' },
  { id: 'grief_healing', label: '💔 शोक निवारण व शरणागति', desc: 'हृदय की वेदना का उपशमन एवं परमात्मा को समर्पण', raga: 'राग दरबारी' },
  { id: 'samadhi_108', label: '🧘 १०८ महामंत्र समाधि नाद', desc: 'गहन ध्यान, चक्र जाग्रति एवं अल्फा तरंगें', raga: '१०८Hz नाद ब्रह्म' },
  { id: 'brahma_muhurta', label: '🌅 ब्रह्म मुहूर्त प्रभात राग', desc: 'प्रातःकाल का ओज, सितार एवं मन्दिर की घण्टियाँ', raga: 'राग भैरवी' },
  { id: 'vishwarupa_cosmic', label: '🌌 विश्वरूप दर्शन अनंत नाद', desc: 'ब्रह्मांडीय चेतना एवं ॐ कार दिव्य ध्वनि', raga: 'अनंत नाद' },
];

export default function FloatingAudioBGM() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState<BGMTrack[]>(DEFAULT_TRACKS);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.45);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Divine Scenario Generator State
  const [showScenarioModal, setShowScenarioModal] = useState(false);
  const [activeScenarioId, setActiveScenarioId] = useState('flute_peace');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationMsg, setGenerationMsg] = useState('');

  // Audio references
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const synthNodesRef = useRef<(AudioNode | { stop: () => void; disconnect: () => void })[]>([]);

  const currentTrack = tracks[selectedTrackIndex] || tracks[0];

  // Initialize HTML5 Audio Element for realistic MP3/AAC streams
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio();
      audio.loop = true;
      audio.crossOrigin = 'anonymous';
      audioElementRef.current = audio;

      // Fetch dynamic tracks from API
      fetch('/api/v1/suno')
        .then(res => res.json())
        .then(data => {
          if (data.success && data.tracks && data.tracks.length > 0) {
            setTracks(data.tracks);
          }
        })
        .catch(() => {
          // fallback
        });
    }

    return () => {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current.src = '';
      }
      stopSynth();
    };
  }, []);

  // Web Audio synth fallback for procedural 136.1Hz tanpura
  const initAudioCtx = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const stopSynth = () => {
    synthNodesRef.current.forEach((node) => {
      try {
        if ('stop' in node && typeof node.stop === 'function') {
          node.stop();
        }
        node.disconnect();
      } catch {}
    });
    synthNodesRef.current = [];
    if (masterGainRef.current) {
      try { masterGainRef.current.disconnect(); } catch {}
      masterGainRef.current = null;
    }
  };

  const startSynthFallback = (baseFreq: number = 136.1) => {
    try {
      initAudioCtx();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      stopSynth();

      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      masterGain.gain.value = isMuted ? 0 : volume * 0.25;
      masterGainRef.current = masterGain;

      // OM Tanpura Layer (136.1 Hz + 204.15 Hz + 272.2 Hz)
      [baseFreq, baseFreq * 1.5, baseFreq * 2.0].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx === 0 ? 'sine' : 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = freq * 3.2;
        filter.Q.value = 1.8;

        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.22 + idx * 0.06;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 6;
        lfo.connect(lfoGain);
        lfoGain.connect(filter.detune);
        lfo.start();

        osc.connect(filter);
        filter.connect(masterGain);
        osc.start();

        synthNodesRef.current.push(osc, lfo, filter);
      });
    } catch {
      // Audio context policy
    }
  };

  const playTrack = (track: BGMTrack) => {
    if (track.audioUrl && audioElementRef.current) {
      stopSynth();
      const audio = audioElementRef.current;
      audio.src = track.audioUrl;
      audio.volume = isMuted ? 0 : volume;
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          startSynthFallback(track.baseFreq || 136.1);
          setIsPlaying(true);
        });
    } else {
      startSynthFallback(track.baseFreq || 136.1);
      setIsPlaying(true);
    }
  };

  const stopAllAudio = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
    }
    stopSynth();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAllAudio();
    } else {
      playTrack(currentTrack);
    }
  };

  const switchTrack = (index: number) => {
    setSelectedTrackIndex(index);
    const targetTrack = tracks[index];
    if (isPlaying) {
      playTrack(targetTrack);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (audioElementRef.current) {
      audioElementRef.current.volume = isMuted ? 0 : newVol;
    }
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = isMuted ? 0 : newVol * 0.25;
    }
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (audioElementRef.current) {
      audioElementRef.current.volume = next ? 0 : volume;
    }
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = next ? 0 : volume * 0.25;
    }
  };

  // Instant 1-Click Scenario-Based Divine Melody Generation
  const handleComposeScenario = async (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    setIsGenerating(true);
    setGenerationMsg('परिस्थिति अनुसार दिव्य राग संयोजित हो रहा है...');

    try {
      const res = await fetch('/api/v1/suno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario: scenarioId })
      });

      const data = await res.json();
      if (data.success) {
        setGenerationMsg('✦ दिव्य राग सक्रिय हो गया!');
        if (data.track) {
          setTracks(prev => [data.track, ...prev.filter(t => t.id !== data.track.id)]);
          setSelectedTrackIndex(0);
          playTrack(data.track);
        } else if (data.all_tracks) {
          setTracks(data.all_tracks);
          setSelectedTrackIndex(0);
          playTrack(data.all_tracks[0]);
        }
        setTimeout(() => {
          setShowScenarioModal(false);
          setIsGenerating(false);
          setGenerationMsg('');
        }, 800);
      } else {
        setIsGenerating(false);
      }
    } catch {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* Hidden YouTube Background Audio Stream for User Provided Tunes */}
      {isPlaying && (currentTrack as any).youtubeId && (
        <div className="fixed -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none" aria-hidden="true">
          <iframe
            key={`bgm-${(currentTrack as any).youtubeId}-${isPlaying}`}
            src={`https://www.youtube.com/embed/${(currentTrack as any).youtubeId}?autoplay=1&enablejsapi=1&rel=0&controls=0`}
            title="Background Divine Tune"
            allow="autoplay"
          />
        </div>
      )}

      <aside 
        aria-label="Bhagavad Gita Divine Raga Player"
        className="fixed bottom-4 right-4 z-40 transition-all duration-300 font-sans"
      >

        {/* Minimized Floating Pill */}
        {!isExpanded ? (
          <div className="flex items-center gap-2 bg-obsidian-900/95 border border-gold-500/30 p-2 sm:p-2.5 rounded-full shadow-2xl backdrop-blur-2xl hover:border-gold-400/60 transition-all">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause Sacred Music" : "Play Sacred Music"}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-obsidian-950 font-bold transition-all cursor-pointer ${
                isPlaying 
                  ? 'bg-gradient-to-r from-gold-400 to-amber-500 shadow-[0_0_16px_rgba(223,168,55,0.6)] animate-pulse'
                  : 'bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 shadow-[0_0_12px_rgba(223,168,55,0.35)]'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
            </button>

            <button
              onClick={() => setIsExpanded(true)}
              aria-label="Expand Sacred Music Player"
              className="flex items-center gap-2 px-2 text-left cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gold-200 flex items-center gap-1.5 font-display">
                  <Disc3 className={`w-3.5 h-3.5 text-gold-400 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                  <span className="truncate max-w-[130px] sm:max-w-[160px]">{currentTrack.title}</span>
                </span>
                <span className="text-[9px] text-gold-400/70 font-mono">
                  {isPlaying ? currentTrack.raga : 'भगवद्गीता दिव्य नाद'}
                </span>
              </div>

              {isPlaying && (
                <div className="flex items-center gap-0.5 h-3.5 px-1">
                  {[1, 2, 3, 4, 5].map((bar) => (
                    <div
                      key={bar}
                      className="w-0.5 bg-gold-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(223,168,55,0.8)]"
                      style={{ height: `${25 + (bar * 18) % 75}%`, animationDuration: `${0.35 + bar * 0.12}s` }}
                    />
                  ))}
                </div>
              )}

              <ChevronUp className="w-4 h-4 text-gold-400/70 ml-1" />
            </button>
          </div>
        ) : (
          /* Expanded Full Sacred Audio Console */
          <div className="bg-obsidian-900/98 border border-gold-500/35 rounded-3xl p-5 shadow-2xl backdrop-blur-2xl w-84 sm:w-96 space-y-4 animate-in fade-in slide-in-from-bottom-4">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold-400 via-amber-500 to-amber-700 flex items-center justify-center text-obsidian-950 font-bold shadow-[0_0_15px_rgba(223,168,55,0.4)]">
                  ॐ
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gold-100 font-cinzel tracking-wider">
                    श्रीमद्भगवद्गीता दिव्य नाद
                  </h4>
                  <p className="text-[10px] text-gold-400/70 font-sans">
                    परिस्थिति अनुसार शास्त्रीय राग एवं ध्यान धुन
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowScenarioModal(true)}
                  className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-gold-500/20 to-amber-500/20 border border-gold-400/35 text-gold-200 hover:text-gold-100 hover:border-gold-400/60 transition-all text-[11px] font-sans flex items-center gap-1.5 cursor-pointer font-medium"
                  title="परिस्थिति अनुसार राग चुनें"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span>राग बदलें</span>
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  aria-label="Minimize Music Player"
                  className="p-1.5 rounded-lg text-obsidian-400 hover:text-gold-200 transition-colors cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Currently Playing Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-obsidian-800/90 to-amber-950/20 border border-gold-500/25 space-y-1.5 relative overflow-hidden">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded-full bg-gold-400/15 text-gold-300 border border-gold-400/30 font-semibold">
                  {currentTrack.category}
                </span>
                <span className="text-gold-400/80 flex items-center gap-1 font-sans">
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span>{currentTrack.raga}</span>
                </span>
              </div>
              <h5 className="font-devanagari text-sm font-bold text-gold-100 line-clamp-1">
                {currentTrack.title}
              </h5>
              <p className="text-[11px] text-gold-300/70 line-clamp-2 leading-relaxed font-sans">
                {currentTrack.subtitle}
              </p>
            </div>

            {/* Track Selector List */}
            <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1 custom-scrollbar">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-gold-400 font-semibold mb-1">
                पवित्र राग संग्रह (Sacred Ragas)
              </label>
              {tracks.map((t, idx) => (
                <button
                  key={t.id || idx}
                  onClick={() => switchTrack(idx)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    selectedTrackIndex === idx
                      ? 'bg-gold-500/20 border-gold-400/60 text-gold-100 font-bold shadow-inner'
                      : 'bg-obsidian-800/60 border-gold-500/15 text-gold-300/70 hover:text-gold-100 hover:bg-obsidian-800'
                  }`}
                >
                  <div className="flex flex-col min-w-0">
                    <span className="font-devanagari text-xs truncate text-gold-100">{t.title}</span>
                    <span className="text-[10px] text-gold-400/60 font-sans truncate">{t.raga} • {t.duration || 'Studio HD'}</span>
                  </div>
                  {selectedTrackIndex === idx && isPlaying && (
                    <div className="flex items-center gap-0.5 h-3 shrink-0">
                      {[1, 2, 3].map((b) => (
                        <div key={b} className="w-0.5 bg-gold-400 rounded-full animate-pulse" />
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Sacred Instant Sound Effects Panel */}
            <div className="space-y-1.5 pt-1 border-t border-gold-500/15">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-gold-400/80 font-semibold">
                दिव्य ध्वनि प्रभाव (Sacred Sound FX)
              </label>
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
                    className="p-1.5 rounded-xl bg-obsidian-800/90 hover:bg-gold-500/20 border border-gold-500/20 hover:border-gold-400/40 text-[11px] text-gold-200 transition-all active:scale-95 cursor-pointer font-sans text-center truncate"
                  >
                    {fx.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls & Volume */}
            <div className="pt-2 border-t border-gold-500/20 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={togglePlay}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-obsidian-950 font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(223,168,55,0.35)] transition-all cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isPlaying ? 'संगीत विराम दें' : 'दिव्य संगीत प्रारंभ करें'}</span>
                </button>

                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
                  className="p-2.5 rounded-xl bg-obsidian-800 border border-gold-500/20 text-gold-300 hover:text-gold-100 transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-mono text-gold-400/70 font-bold">VOL</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-full accent-gold-400 cursor-pointer h-1.5 bg-obsidian-800 rounded-lg"
                />
                <span className="text-[10px] font-mono text-gold-400/80 w-8 text-right">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </aside>


      {/* Instant 1-Click Sacred Scenario Modal */}
      {showScenarioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-obsidian-900 border border-gold-500/35 rounded-3xl p-6 sm:p-7 w-full max-w-lg shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center text-obsidian-950 font-bold shadow-md">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-cinzel text-sm font-bold text-gold-100">
                    परिस्थिति अनुसार दिव्य राग चयन
                  </h3>
                  <p className="text-[10px] text-gold-400/70 font-sans">
                    जिस मानसिक भाव या परिस्थिति में आप हैं, उसे स्पर्श करें
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowScenarioModal(false)}
                className="text-obsidian-400 hover:text-gold-200 text-sm cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            {/* 1-Click Scenarios List */}
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
              {SACRED_SCENARIOS.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => handleComposeScenario(sc.id)}
                  disabled={isGenerating}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    activeScenarioId === sc.id
                      ? 'bg-gradient-to-r from-gold-500/25 to-amber-500/20 border-gold-400/70 shadow-lg'
                      : 'bg-obsidian-800/70 hover:bg-obsidian-800 border-gold-500/15 hover:border-gold-400/40'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-devanagari text-xs font-bold text-gold-100 flex items-center gap-1.5">
                      <span>{sc.label}</span>
                    </div>
                    <p className="text-[11px] text-gold-300/70 font-sans leading-snug">
                      {sc.desc}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gold-400/10 text-gold-300 border border-gold-400/20 shrink-0">
                    {sc.raga}
                  </span>
                </button>
              ))}
            </div>

            {generationMsg && (
              <div className="p-3 rounded-xl bg-gold-500/15 border border-gold-500/30 text-xs font-mono text-gold-200 text-center animate-pulse">
                {generationMsg}
              </div>
            )}

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setShowScenarioModal(false)}
                className="px-5 py-2 rounded-xl bg-obsidian-800 text-xs font-sans text-gold-300 hover:text-gold-100 transition-colors cursor-pointer"
              >
                बंद करें
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
