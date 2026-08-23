'use client';

import React, { useState, useEffect } from 'react';
import { sacredAudio } from '@/lib/sacredSounds';

export default function TempleEntryGate() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Only show once per session
    if (typeof window === 'undefined') return;
    const seen = sessionStorage.getItem('temple_entry_done');
    if (!seen) setVisible(true);
  }, []);

  const enter = () => {
    sacredAudio.playTripleGhanta(0.75);
    sacredAudio.playShankhnaad(0.4);
    setLeaving(true);
    sessionStorage.setItem('temple_entry_done', '1');
    setTimeout(() => setVisible(false), 1800);
  };

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-1000 ${leaving ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
      style={{ background: 'linear-gradient(180deg, #07060e 0%, #120b05 40%, #0e0b05 100%)' }}>

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} className="absolute rounded-full bg-amber-200/60 animate-pulse"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }} />
        ))}
      </div>

      {/* Temple Gate Arch */}
      <div className="relative flex flex-col items-center z-10">

        {/* Top lotus decoration */}
        <div className="flex gap-3 mb-3 opacity-70">
          {['🪷','🌼','🪷','🌼','🪷'].map((f,i) => (
            <span key={i} className="animate-float text-lg" style={{ animationDelay: `${i * 0.3}s` }}>{f}</span>
          ))}
        </div>

        {/* Gate arch frame */}
        <div className="relative px-8 py-6 rounded-t-[80px] border-t-4 border-l-4 border-r-4"
          style={{ borderColor: 'rgba(212,175,55,0.7)', background: 'linear-gradient(180deg, rgba(120,60,10,0.4), rgba(60,30,5,0.3))' }}>

          {/* Bell hung from arch */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-float">
            <div className="w-0.5 h-5 bg-amber-400/60" />
            <div className="text-2xl" title="मंदिर घंटा">🔔</div>
          </div>

          {/* Big Om */}
          <div className="text-center mb-3">
            <span className="font-devanagari text-7xl font-black animate-glow-pulse"
              style={{ background: 'linear-gradient(135deg, #fde68a, #d97706, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ॐ
            </span>
          </div>

          {/* Temple Name */}
          <div className="text-center space-y-1">
            <h1 className="font-devanagari text-2xl font-bold text-amber-300">
              धर्म मंदिर
            </h1>
            <p className="font-devanagari text-sm text-amber-400/80">
              श्रीमद्भगवद्गीता का पवित्र द्वार
            </p>
            <p className="text-[11px] font-mono text-amber-500/60 mt-1">Dharma.OS — Sacred Digital Temple</p>
          </div>
        </div>

        {/* Gate pillars */}
        <div className="flex gap-1 w-full">
          <div className="flex-1 h-16 rounded-b-sm border-x-4 border-b-4"
            style={{ borderColor: 'rgba(212,175,55,0.5)', background: 'linear-gradient(180deg, rgba(80,40,5,0.5), rgba(40,20,3,0.5))' }}>
            {/* Pillar ornament */}
            <div className="h-full flex items-center justify-center">
              <div className="w-1 h-10 rounded-full bg-amber-400/30" />
            </div>
          </div>
          <div className="flex-1 h-16 rounded-b-sm border-x-4 border-b-4"
            style={{ borderColor: 'rgba(212,175,55,0.5)', background: 'linear-gradient(180deg, rgba(80,40,5,0.5), rgba(40,20,3,0.5))' }}>
            <div className="h-full flex items-center justify-center">
              <div className="w-1 h-10 rounded-full bg-amber-400/30" />
            </div>
          </div>
        </div>

        {/* Diya row at gate base */}
        <div className="flex gap-4 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
              <div className="w-1.5 h-2 rounded-full"
                style={{ background: 'radial-gradient(ellipse at bottom, #fff 0%, #fef08a 50%, #f59e0b 100%)', boxShadow: '0 0 6px rgba(245,158,11,0.7)' }} />
              <div className="w-3 h-1 rounded-b-full bg-red-800/80" />
            </div>
          ))}
        </div>

        {/* Enter button */}
        <button
          onClick={enter}
          className="mt-8 px-8 py-4 rounded-2xl font-devanagari text-lg font-bold text-black cursor-pointer transition-all hover:scale-105 animate-glow-pulse active:scale-95"
          style={{ background: 'linear-gradient(135deg, #fde68a, #d97706, #f59e0b)', boxShadow: '0 0 30px rgba(245,158,11,0.5)' }}
        >
          🔔 घंटा बजाएं और प्रवेश करें
        </button>

        <p className="mt-3 text-xs font-devanagari text-amber-400/50 text-center animate-pulse">
          घंटे की आवाज़ से मन की अशुद्धियाँ दूर होती हैं
        </p>
      </div>
    </div>
  );
}
