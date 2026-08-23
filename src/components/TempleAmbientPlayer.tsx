'use client';

import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Radio, Music } from 'lucide-react';
import { sacredAudio } from '@/lib/sacredSounds';

export default function TempleAmbientPlayer() {
  const [omOn, setOmOn] = useState(false);
  const [ytOpen, setYtOpen] = useState(false);
  const [bellCount, setBellCount] = useState(0);

  const toggleOm = () => {
    if (omOn) {
      sacredAudio.stopOmAmbient();
      sacredAudio.stopTanpura();
      setOmOn(false);
    } else {
      sacredAudio.startOmAmbient(0.05);
      sacredAudio.startTanpura(0.04);
      setOmOn(true);
    }
  };

  const ringBell = () => {
    sacredAudio.playTripleGhanta(0.7);
    setBellCount(p => p + 1);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">

      {/* YouTube Ambient Panel */}
      {ytOpen && (
        <div className="rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl animate-scale-in"
          style={{ background: '#08090f', width: '280px' }}>
          <div className="px-3 py-2 flex items-center justify-between border-b border-amber-400/20">
            <span className="text-xs font-devanagari text-amber-300 font-bold">🕉️ मंदिर संगीत</span>
            <button onClick={() => setYtOpen(false)} className="text-amber-400/60 hover:text-amber-300 cursor-pointer text-xs">✕</button>
          </div>
          {/* YouTube embed — using the user's video */}
          <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
            <iframe
              src="https://www.youtube.com/embed/6sX74H9jmVI?autoplay=1&loop=1&playlist=6sX74H9jmVI&controls=1&rel=0&modestbranding=1"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              title="Temple Music"
            />
          </div>
          <p className="text-[9px] font-mono text-amber-400/40 text-center px-2 py-1">
            मंदिर की पवित्र ध्वनि सुनें
          </p>
        </div>
      )}

      {/* Control buttons row */}
      <div className="flex items-center gap-2">

        {/* Bell count */}
        {bellCount > 0 && (
          <div className="px-2 py-1 rounded-xl bg-amber-400/15 border border-amber-400/30 text-[10px] font-mono text-amber-300">
            🔔 ×{bellCount}
          </div>
        )}

        {/* Ring Bell */}
        <button
          onClick={ringBell}
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl cursor-pointer transition-all hover:scale-110 active:scale-95 border-2 shadow-lg animate-border-glow"
          style={{
            background: 'linear-gradient(135deg, #d97706, #92400e)',
            borderColor: 'rgba(212,175,55,0.6)',
            boxShadow: '0 4px 20px rgba(217,119,6,0.4)',
          }}
          title="घंटा बजाएं"
        >
          🔔
        </button>

        {/* Om ambient toggle */}
        <button
          onClick={toggleOm}
          className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 border-2 shadow-lg ${omOn ? 'animate-glow-pulse' : ''}`}
          style={{
            background: omOn ? 'linear-gradient(135deg, #7c3aed, #4c1d95)' : 'rgba(20,22,36,0.9)',
            borderColor: omOn ? 'rgba(167,139,250,0.7)' : 'rgba(197,160,89,0.3)',
          }}
          title={omOn ? 'ॐ बंद करें' : 'ॐ ध्यान संगीत चालू करें'}
        >
          <span className="font-devanagari text-base font-black" style={{ color: omOn ? '#ddd6fe' : '#c5a059' }}>ॐ</span>
          {omOn && <span className="text-[8px] text-purple-300 font-mono">ON</span>}
        </button>

        {/* YouTube music */}
        <button
          onClick={() => { setYtOpen(p => !p); sacredAudio.playNavChime(0.1); }}
          className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 border-2 shadow-lg`}
          style={{
            background: ytOpen ? 'linear-gradient(135deg, #dc2626, #7f1d1d)' : 'rgba(20,22,36,0.9)',
            borderColor: ytOpen ? 'rgba(252,165,165,0.6)' : 'rgba(197,160,89,0.3)',
          }}
          title="मंदिर संगीत"
        >
          <Music className="w-5 h-5" style={{ color: ytOpen ? '#fecaca' : '#c5a059' }} />
          {ytOpen && <span className="text-[8px] text-red-300 font-mono">LIVE</span>}
        </button>
      </div>

      <p className="text-[8px] font-mono text-amber-400/30 text-right pr-1">
        {omOn ? '🕉️ ॐ ध्यान चल रहा है...' : 'मंदिर नाद चालू करें'}
      </p>
    </div>
  );
}
