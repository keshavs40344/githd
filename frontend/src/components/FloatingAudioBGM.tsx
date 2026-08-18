'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

interface BGMTrack {
  id: string;
  name: string;
  subtitle: string;
  baseFreq: number;
  ragaScale: number[];
  type: 'flute_tanpura' | 'cosmic_432' | 'deep_drone';
}

const TRACKS: BGMTrack[] = [
  {
    id: 'vrindavan_flute',
    name: 'Vrindavan Flute & 136.1 Hz OM',
    subtitle: 'Sacred Meditative Tanpura & Bansuri',
    baseFreq: 136.1,
    ragaScale: [136.1, 153.1, 181.5, 204.15, 229.7, 272.2],
    type: 'flute_tanpura'
  },
  {
    id: 'cosmic_432',
    name: '432 Hz Cosmic Yamuna Serenity',
    subtitle: 'Healing Vibrations & Flowing Water',
    baseFreq: 108.0, // 432 / 4
    ragaScale: [108.0, 144.0, 162.0, 216.0, 288.0, 432.0],
    type: 'cosmic_432'
  },
  {
    id: 'kurukshetra_chariot',
    name: 'Kurukshetra Chariot & Deep Bell',
    subtitle: 'Grounded Courage & Royal Resonance',
    baseFreq: 96.0,
    ragaScale: [96.0, 144.0, 192.0, 240.0, 288.0],
    type: 'deep_drone'
  }
];

export default function FloatingAudioBGM() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.35);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const activeNodesRef = useRef<(AudioNode | { stop: () => void; disconnect: () => void })[]>([]);

  const currentTrack = TRACKS[selectedTrackIndex];

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const stopBGM = () => {
    activeNodesRef.current.forEach((node) => {
      try {
        if ('stop' in node && typeof node.stop === 'function') {
          node.stop();
        }
        node.disconnect();
      } catch {}
    });
    activeNodesRef.current = [];
    if (masterGainRef.current) {
      try { masterGainRef.current.disconnect(); } catch {}
      masterGainRef.current = null;
    }
  };

  const startBGM = (track: BGMTrack) => {
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      stopBGM();

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      masterGain.gain.value = isMuted ? 0 : volume * 0.25;
      masterGainRef.current = masterGain;

      // 1. Tanpura / Base Drone synthesis
      const baseFreq = track.baseFreq;
      const droneFreqs = [baseFreq, baseFreq * 1.5, baseFreq * 2.0];

      droneFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = freq * 3.5;
        filter.Q.value = 2.0;

        // LFO for slow breath modulation
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.25 + idx * 0.08;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 8;
        lfo.connect(lfoGain);
        lfoGain.connect(filter.detune);
        lfo.start();

        // Slow stereo panner if available
        let finalNode: AudioNode = filter;
        if (ctx.createStereoPanner) {
          const panner = ctx.createStereoPanner();
          panner.pan.value = idx === 0 ? 0 : idx === 1 ? -0.4 : 0.4;
          filter.connect(panner);
          finalNode = panner;
        }

        osc.connect(filter);
        finalNode.connect(masterGain);

        osc.start();
        activeNodesRef.current.push(osc, lfo, filter);
      });

      // 2. Bansuri Flute Harmonic Resonance (Warm sinusoidal overtones)
      const fluteOsc = ctx.createOscillator();
      fluteOsc.type = 'sine';
      fluteOsc.frequency.setValueAtTime(baseFreq * 2.0, ctx.currentTime);

      const fluteLfo = ctx.createOscillator();
      fluteLfo.type = 'triangle';
      fluteLfo.frequency.value = 0.15; // Slow meditative vibrato
      const fluteLfoGain = ctx.createGain();
      fluteLfoGain.gain.value = 12;
      fluteLfo.connect(fluteLfoGain);
      fluteLfoGain.connect(fluteOsc.detune);
      fluteLfo.start();

      const fluteGain = ctx.createGain();
      fluteGain.gain.value = 0.15;
      fluteOsc.connect(fluteGain);
      fluteGain.connect(masterGain);

      fluteOsc.start();
      activeNodesRef.current.push(fluteOsc, fluteLfo, fluteGain);

    } catch {
      // Audio autoplay restrictions
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopBGM();
      setIsPlaying(false);
    } else {
      startBGM(currentTrack);
      setIsPlaying(true);
    }
  };

  const switchTrack = (index: number) => {
    setSelectedTrackIndex(index);
    if (isPlaying) {
      startBGM(TRACKS[index]);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = isMuted ? 0 : newVol * 0.25;
    }
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = next ? 0 : volume * 0.25;
    }
  };

  useEffect(() => {
    return () => {
      stopBGM();
    };
  }, []);

  return (
    <aside 
      aria-label="Divine Flute & Tanpura Player"
      className="fixed bottom-4 right-4 z-40 transition-all duration-300 font-sans"
    >
      {/* Minimized Pill */}
      {!isExpanded ? (
        <div className="flex items-center gap-2 bg-obsidian-900/95 border border-gold-500/30 p-2 sm:p-2.5 rounded-full shadow-2xl backdrop-blur-2xl hover:border-gold-400/60 transition-all">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause Ambient Music" : "Play Ambient Music"}
            className="w-8 h-8 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 flex items-center justify-center text-obsidian-950 font-bold shadow-[0_0_12px_rgba(223,168,55,0.4)] transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />}
          </button>

          <button
            onClick={() => setIsExpanded(true)}
            aria-label="Expand Music Player"
            className="flex items-center gap-2 px-2 text-left cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-gold-200 flex items-center gap-1 font-mono">
                <Music className="w-3 h-3 text-gold-400" />
                <span className="truncate max-w-[120px]">{currentTrack.name.split('&')[0]}</span>
              </span>
              <span className="text-[9px] text-gold-400/60 font-mono">
                {isPlaying ? 'Playing Ambient BGM' : 'Click to Play'}
              </span>
            </div>

            {isPlaying && (
              <div className="flex items-center gap-0.5 h-3 px-1">
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className="w-0.5 bg-gold-400 rounded-full animate-pulse"
                    style={{ height: `${30 + (bar * 20) % 70}%`, animationDuration: `${0.4 + bar * 0.15}s` }}
                  />
                ))}
              </div>
            )}

            <ChevronUp className="w-4 h-4 text-gold-400/70 ml-1" />
          </button>
        </div>
      ) : (
        /* Expanded Control Panel */
        <div className="bg-obsidian-900/95 border border-gold-500/30 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-2xl w-80 space-y-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-gold-500/20 border border-gold-400/40 flex items-center justify-center text-gold-400">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gold-100 font-mono">Divine Flute & Tanpura</h4>
                <p className="text-[10px] text-gold-400/70 font-mono">Sacred Ambient Resonance</p>
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(false)}
              aria-label="Minimize Music Player"
              className="p-1 rounded-lg text-obsidian-400 hover:text-gold-200 transition-colors cursor-pointer"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Track Selector Dropdown */}
          <div className="space-y-1">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-gold-400 font-semibold">
              Select Sacred Tone
            </label>
            <div className="space-y-1.5">
              {TRACKS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => switchTrack(idx)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                    selectedTrackIndex === idx
                      ? 'bg-gold-500/15 border-gold-400/50 text-gold-100 font-bold shadow-inner'
                      : 'bg-obsidian-800/60 border-gold-500/15 text-gold-300/70 hover:text-gold-100 hover:bg-obsidian-800'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-mono text-xs">{t.name}</span>
                    <span className="text-[9px] text-gold-400/60 font-sans">{t.subtitle}</span>
                  </div>
                  {selectedTrackIndex === idx && isPlaying && (
                    <div className="flex items-center gap-0.5 h-3">
                      {[1, 2, 3].map((b) => (
                        <div key={b} className="w-0.5 bg-gold-400 rounded-full animate-pulse" />
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Controls & Volume */}
          <div className="pt-2 border-t border-gold-500/15 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={togglePlay}
                className="flex-1 py-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-obsidian-950 font-bold font-mono text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(223,168,55,0.3)] transition-all cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'Pause Harmony' : 'Play Harmony'}</span>
              </button>

              <button
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
                className="p-2 rounded-xl bg-obsidian-800 border border-gold-500/20 text-gold-300 hover:text-gold-100 transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Volume Slider */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-gold-400/60">Vol</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full accent-gold-400 cursor-pointer h-1.5 bg-obsidian-800 rounded-lg"
              />
              <span className="text-[10px] font-mono text-gold-400/80 w-6 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
