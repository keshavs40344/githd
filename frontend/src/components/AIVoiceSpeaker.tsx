'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';
import type { AudioSonicMetadata } from '@/types/mentor';

interface AIVoiceSpeakerProps {
  divineCounsel?: string;
  text?: string;
  sanskrit?: string;
  label?: string;
  metadata?: AudioSonicMetadata;
}

export default function AIVoiceSpeaker({ divineCounsel, text, sanskrit, label = "Listen to Krishna's Voice", metadata }: AIVoiceSpeakerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const speechContent = divineCounsel || text || '';

  // Initialize Web Audio API for Drone/Tanpura synthesis
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
      
      if (gainNodeRef.current) {
        stopDrone();
      }
      
      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      masterGain.gain.value = isMuted ? 0 : 0.12; // Soft background drone
      gainNodeRef.current = masterGain;

      // 136.1 Hz OM Tanpura base drone + 204.15 Hz Pa + Flute harmonics
      const freqs = [136.1, 204.15, 272.2];
      
      freqs.forEach(freq => {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = freq * 2.8;
        filter.Q.value = 1.5;
        
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.4;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 8;
        lfo.connect(lfoGain);
        lfoGain.connect(filter.detune);
        lfo.start();
        
        osc.connect(filter);
        filter.connect(masterGain);
        
        osc.start();
        oscillatorsRef.current.push(osc, lfo);
      });
    } catch {
      // Audio context blocked or unavailable
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
      utterance.rate = 0.82; // Meditative pace
      utterance.pitch = 0.78; // Deep resonant voice
      
      const voices = window.speechSynthesis.getVoices();
      const divineVoice = voices.find(v => v.lang.includes('IN') && (v.name.includes('Male') || v.name.includes('Natural'))) ||
                         voices.find(v => v.lang.includes('hi')) ||
                         voices.find(v => v.lang.includes('en-IN')) ||
                         voices.find(v => v.lang.includes('en'));
      if (divineVoice) utterance.voice = divineVoice;
      
      utterance.onend = () => {
        setIsPlaying(false);
        stopDrone();
      };
      
      utterance.onerror = () => {
        setIsPlaying(false);
        stopDrone();
      };

      if (isMuted) {
        utterance.volume = 0;
      }

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
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = nextMuted ? 0 : 0.12;
    }
  };

  useEffect(() => {
    return () => {
      stopDrone();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="bg-obsidian-900/95 border border-gold-500/30 p-4 rounded-2xl flex items-center justify-between shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-3.5">
        <button 
          onClick={togglePlay}
          className="w-11 h-11 bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 rounded-2xl flex items-center justify-center text-obsidian-950 font-bold transition-all shadow-[0_0_20px_rgba(223,168,55,0.4)] cursor-pointer"
        >
          {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="ml-0.5 fill-current" />}
        </button>
        
        <div>
          <h4 className="text-gold-200 font-bold text-xs flex items-center gap-1.5 font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>{label}</span>
          </h4>
          <p className="text-gold-400/70 text-xs truncate max-w-[200px] sm:max-w-md font-sans">
            {metadata?.recommended_raga_bgm || '136.1 Hz Sacred Tanpura & Flute Drone'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {isPlaying && (
          <div className="flex items-center gap-1 h-5 px-2">
            {[1, 2, 3, 4, 5].map((bar) => (
              <div 
                key={bar} 
                className="w-1 bg-gold-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(223,168,55,0.6)]"
                style={{ height: `${20 + (bar * 15) % 80}%`, animationDuration: `${0.4 + bar * 0.15}s` }}
              />
            ))}
          </div>
        )}
        
        <button onClick={toggleMute} className="text-obsidian-400 hover:text-gold-300 transition-colors p-1 cursor-pointer">
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
}

