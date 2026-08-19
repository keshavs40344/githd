'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Mic, ChevronDown } from 'lucide-react';
import type { AudioSonicMetadata } from '@/types/mentor';

interface AIVoiceSpeakerProps {
  divineCounsel?: string;
  text?: string;
  sanskrit?: string;
  label?: string;
  metadata?: AudioSonicMetadata;
}

const VOICE_PRESETS = [
  { id: 'hi-IN',  label: 'हिंदी (India)',    rate: 0.78, pitch: 0.75 },
  { id: 'en-IN',  label: 'English (India)',   rate: 0.82, pitch: 0.78 },
  { id: 'en-GB',  label: 'English (UK Deep)', rate: 0.80, pitch: 0.72 },
  { id: 'en-US',  label: 'English (US)',      rate: 0.84, pitch: 0.80 },
];

export default function AIVoiceSpeaker({ divineCounsel, text, sanskrit, label = "Divine Voice of Shri Krishna", metadata }: AIVoiceSpeakerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [langPreset, setLangPreset] = useState(0);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const speechContent = divineCounsel || text || '';
  const preset = VOICE_PRESETS[langPreset];

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const startDrone = () => {
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (gainNodeRef.current) stopDrone();

      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      masterGain.gain.value = isMuted ? 0 : 0.08;
      gainNodeRef.current = masterGain;

      // 136.1 Hz OM Tanpura + harmonics
      [136.1, 204.15, 272.2, 408.3].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx === 0 ? 'sine' : 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = freq * 2.5;
        filter.Q.value = 1.2;

        const envGain = ctx.createGain();
        envGain.gain.value = idx === 0 ? 1 : 0.5 / idx;

        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.3 + idx * 0.07;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 6;
        lfo.connect(lfoGain);
        lfoGain.connect(filter.detune);
        lfo.start();

        osc.connect(filter);
        filter.connect(envGain);
        envGain.connect(masterGain);
        osc.start();
        oscillatorsRef.current.push(osc, lfo);
      });
    } catch {
      // Audio context blocked
    }
  };

  const stopDrone = () => {
    oscillatorsRef.current.forEach(osc => {
      try { osc.stop(); } catch {}
      try { osc.disconnect(); } catch {}
    });
    oscillatorsRef.current = [];
    if (gainNodeRef.current) {
      try { gainNodeRef.current.disconnect(); } catch {}
      gainNodeRef.current = null;
    }
  };

  const speakCounsel = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const fullText = sanskrit ? `${sanskrit}. ${speechContent}` : speechContent;
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.rate = preset.rate;
      utterance.pitch = preset.pitch;
      utterance.lang = preset.id;

      const voices = window.speechSynthesis.getVoices();
      // Priority: lang match with deep/male voice → lang match → fallback
      const divineVoice =
        voices.find(v => v.lang === preset.id && (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('deep') || v.name.toLowerCase().includes('neural'))) ||
        voices.find(v => v.lang.startsWith(preset.id.split('-')[0]) && !v.name.toLowerCase().includes('female')) ||
        voices.find(v => v.lang === preset.id) ||
        voices.find(v => v.lang.startsWith('en')) ||
        voices[0];

      if (divineVoice) utterance.voice = divineVoice;
      if (isMuted) utterance.volume = 0;

      utterance.onend = () => { setIsPlaying(false); stopDrone(); };
      utterance.onerror = () => { setIsPlaying(false); stopDrone(); };
      window.speechSynthesis.speak(utterance);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      stopDrone();
      setIsPlaying(false);
    } else {
      startDrone();
      speakCounsel();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (gainNodeRef.current) gainNodeRef.current.gain.value = next ? 0 : 0.08;
  };

  useEffect(() => {
    return () => {
      stopDrone();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const BARS = [0.45, 0.9, 0.65, 1, 0.55, 0.8, 0.4, 0.75, 0.5, 0.95];

  return (
    <div className="glass-dark rounded-2xl overflow-hidden shadow-xl">
      {/* Top stripe */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

      <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
        {/* Play button + label */}
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-obsidian-950 font-bold transition-all cursor-pointer shrink-0 ${
              isPlaying
                ? 'bg-gradient-to-br from-gold-400 to-amber-600 glow-gold'
                : 'bg-gradient-to-br from-gold-500 to-amber-700 hover:from-gold-400 hover:to-amber-600 glow-gold-sm'
            }`}
          >
            {isPlaying
              ? <Pause size={20} className="fill-current" />
              : <Play  size={20} className="ml-0.5 fill-current" />
            }
          </button>

          <div>
            <h4 className="font-display text-sm font-semibold text-gold-200 leading-tight flex items-center gap-2">
              {label}
              {isPlaying && (
                <span className="text-[10px] font-sans font-normal px-1.5 py-0.5 rounded-full bg-gold-500/15 text-gold-400 border border-gold-500/30 animate-pulse">
                  LIVE
                </span>
              )}
            </h4>
            <p className="text-[11px] font-sans text-gold-400/60 mt-0.5 truncate max-w-[180px] sm:max-w-xs">
              {metadata?.recommended_raga_bgm || '136.1 Hz Sacred OM Tanpura Drone'}
            </p>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Waveform visualizer */}
          {isPlaying && (
            <div className="flex items-end gap-[3px] h-8 px-1">
              {BARS.map((h, i) => (
                <div
                  key={i}
                  className="wave-bar w-[3px] bg-gradient-to-t from-gold-600 to-gold-300 rounded-full"
                  style={{
                    height: `${Math.round(h * 100)}%`,
                    animationDuration: `${0.5 + i * 0.08}s`,
                    animationDelay: `${i * 0.04}s`,
                    boxShadow: '0 0 6px rgba(244,190,69,0.5)',
                  }}
                />
              ))}
            </div>
          )}

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(v => !v)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-obsidian-800/80 border border-gold-500/20 text-[10px] font-sans font-medium text-gold-300 hover:text-gold-100 hover:border-gold-400/40 transition-all cursor-pointer"
            >
              <Mic size={10} />
              <span className="hidden sm:inline">{preset.label}</span>
              <ChevronDown size={10} />
            </button>
            {showLangMenu && (
              <div className="absolute right-0 top-full mt-1 z-50 bg-obsidian-800 border border-gold-500/25 rounded-xl shadow-2xl overflow-hidden min-w-[160px]">
                {VOICE_PRESETS.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => { setLangPreset(i); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-xs font-sans transition-colors cursor-pointer ${
                      i === langPreset ? 'bg-gold-500/20 text-gold-200' : 'text-gold-300/70 hover:bg-obsidian-700 hover:text-gold-100'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mute */}
          <button onClick={toggleMute} className="p-1.5 text-obsidian-400 hover:text-gold-300 transition-colors cursor-pointer">
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}

