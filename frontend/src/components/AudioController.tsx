'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Volume2, FastForward, Rewind, Radio, Mic2, Disc } from 'lucide-react';

interface AudioControllerProps {
  sanskritVerse: string;
  chapter: number;
  verse: number;
}

type AudioMode = 'tanpura' | 'recitation' | 'studio';

export default function AudioController({ sanskritVerse, chapter, verse }: AudioControllerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<AudioMode>('tanpura');
  const [volume, setVolume] = useState(0.5);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodesRef = useRef<GainNode[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Stop all audio
  const stopAll = useCallback(() => {
    // Stop Tanpura
    oscillatorsRef.current.forEach(osc => {
      try { osc.stop(); } catch (e) {}
      osc.disconnect();
    });
    oscillatorsRef.current = [];
    
    // Stop Studio
    if (audioElRef.current) {
      audioElRef.current.pause();
      audioElRef.current.currentTime = 0;
    }
    
    // Stop Speech
    window.speechSynthesis.cancel();
  }, []);

  // Initialize Tanpura
  const startTanpura = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    analyserRef.current = ctx.createAnalyser();
    analyserRef.current.fftSize = 2048;
    analyserRef.current.connect(ctx.destination);

    const masterGain = ctx.createGain();
    masterGain.gain.value = volume;
    masterGain.connect(analyserRef.current);
    
    gainNodesRef.current = [masterGain];

    // Frequencies for C# (Sa) Tanpura drone
    const freqs = [136.10, 204.15, 272.20, 68.05];
    
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = i === 3 ? 'sine' : 'triangle';
      osc.frequency.value = freq;
      
      // Tremolo/LFO effect
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.2 + (i * 0.1); // Slow subtle modulation
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.2;
      
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      lfo.start();
      
      osc.connect(gain);
      gain.connect(masterGain);
      
      osc.start();
      oscillatorsRef.current.push(osc, lfo);
      gainNodesRef.current.push(gain, lfoGain);
    });
  }, [volume]);

  // Handle Play/Pause
  useEffect(() => {
    if (isPlaying) {
      if (mode === 'tanpura') {
        startTanpura();
      } else if (mode === 'studio') {
        if (!audioElRef.current) {
          audioElRef.current = new Audio(`/audio/ch${chapter}_v${verse}.mp3`);
          audioElRef.current.loop = true;
        }
        audioElRef.current.volume = volume;
        audioElRef.current.playbackRate = playbackRate;
        audioElRef.current.play().catch(() => {
          console.error("Audio file not found, falling back to Tanpura");
          setMode('tanpura');
        });
      } else if (mode === 'recitation') {
        const utterance = new SpeechSynthesisUtterance(sanskritVerse);
        utterance.lang = 'hi-IN';
        utterance.rate = playbackRate;
        utterance.volume = volume;
        utterance.onend = () => setIsPlaying(false);
        speechUtteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }
    } else {
      stopAll();
    }
    
    return () => {
      if (isPlaying) stopAll();
    };
  }, [isPlaying, mode, startTanpura, stopAll, chapter, verse, sanskritVerse, volume, playbackRate]);

  // Visualizer Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;

    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw);
      
      ctx.fillStyle = 'rgba(20, 20, 20, 0.2)'; // obsidian trail effect
      ctx.fillRect(0, 0, width, height);

      if (!isPlaying) return;

      if (mode === 'tanpura' && analyserRef.current) {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteTimeDomainData(dataArray);

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#D4AF37'; // Golden
        ctx.beginPath();

        const sliceWidth = width * 1.0 / analyserRef.current.frequencyBinCount;
        let x = 0;

        for (let i = 0; i < analyserRef.current.frequencyBinCount; i++) {
          const v = dataArray[i] / 128.0;
          const y = v * height / 2;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          x += sliceWidth;
        }
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
      } else {
        // Simulated visualizer for studio/recitation
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#D4AF37';
        ctx.beginPath();
        const time = Date.now() / 200;
        for (let i = 0; i <= width; i += 5) {
          const y = (height / 2) + Math.sin(i * 0.05 + time) * 15 * (Math.random() * 0.5 + 0.5);
          if (i === 0) ctx.moveTo(i, y);
          else ctx.lineTo(i, y);
        }
        ctx.stroke();
      }
    };
    
    draw();
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, mode]);

  return (
    <div className="w-full bg-[#1A1A1A]/80 backdrop-blur-md rounded-2xl border border-[#D4AF37]/30 p-4 shadow-lg shadow-[#D4AF37]/5">
      <div className="flex flex-col gap-4">
        {/* Canvas Visualizer */}
        <div className="w-full h-16 rounded-lg bg-[#0F0F0F] overflow-hidden border border-[#D4AF37]/20 relative">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full" 
            width={400} 
            height={64} 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-transparent to-[#0F0F0F] pointer-events-none" />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8972E] flex items-center justify-center text-[#1A1A1A] hover:scale-105 transition-transform shadow-md shadow-[#D4AF37]/20"
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>
            
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#D4AF37]">
                {mode === 'tanpura' ? 'Meditative Drone' : mode === 'recitation' ? 'Sanskrit Recitation' : 'Original Track'}
              </span>
              <span className="text-xs text-gray-400">Chapter {chapter}, Verse {verse}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Mode Selectors */}
            <div className="flex bg-[#0F0F0F] rounded-lg p-1 border border-[#D4AF37]/20">
              <button 
                onClick={() => { setMode('tanpura'); setIsPlaying(false); }}
                className={`p-2 rounded-md transition-colors ${mode === 'tanpura' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-gray-500 hover:text-[#D4AF37]/70'}`}
                title="Tanpura Drone"
              ><Radio size={16} /></button>
              <button 
                onClick={() => { setMode('recitation'); setIsPlaying(false); }}
                className={`p-2 rounded-md transition-colors ${mode === 'recitation' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-gray-500 hover:text-[#D4AF37]/70'}`}
                title="Speech Recitation"
              ><Mic2 size={16} /></button>
              <button 
                onClick={() => { setMode('studio'); setIsPlaying(false); }}
                className={`p-2 rounded-md transition-colors ${mode === 'studio' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-gray-500 hover:text-[#D4AF37]/70'}`}
                title="Studio Track"
              ><Disc size={16} /></button>
            </div>

            {/* Speed & Volume */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setPlaybackRate(r => r === 0.75 ? 1.0 : r === 1.0 ? 1.25 : 0.75)}
                className="px-2 py-1 text-xs text-[#D4AF37] border border-[#D4AF37]/30 rounded-md hover:bg-[#D4AF37]/10"
              >
                {playbackRate}x
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
