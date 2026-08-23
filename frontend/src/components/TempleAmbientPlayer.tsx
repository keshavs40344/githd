'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Music, X, Sparkles, Bell } from 'lucide-react';
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
      sacredAudio.startOmAmbient(0.06);
      sacredAudio.startTanpura(0.04);
      setOmOn(true);
    }
  };

  const ringBell = () => {
    sacredAudio.playTripleGhanta(0.7);
    setBellCount(p => p + 1);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">

      {/* YouTube Temple Voice Stream Player Panel */}
      {ytOpen && (
        <div className="rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-[0_10px_50px_rgba(0,0,0,0.95)] animate-scale-in"
          style={{ background: '#08090f', width: '300px' }}>
          <div className="px-3 py-2 flex items-center justify-between border-b border-amber-400/20 bg-gradient-to-r from-[#161828] to-[#0f111e]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-devanagari text-amber-300 font-bold">श्रीमद्भगवद्गीता मन्दिर पाठ</span>
            </div>
            <button 
              onClick={() => setYtOpen(false)} 
              className="text-amber-400/60 hover:text-amber-300 cursor-pointer p-1 rounded-lg hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="relative aspect-video w-full bg-black">
            <iframe
              src="https://www.youtube.com/embed/6sX74H9jmVI?autoplay=1&controls=1&enablejsapi=1&rel=0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              title="Temple Gita Audio Voice"
            />
          </div>
          <div className="p-2 bg-[#090b14] flex items-center justify-between text-[10px] font-mono text-amber-300/80">
            <span>दिव्य मन्दिर ध्वनि</span>
            <span className="text-emerald-400">Autoplay Live ✓</span>
          </div>
        </div>
      )}

      {/* Floating Temple Controls Pill (Compact & Elegant) */}
      <div className="flex items-center gap-1.5 bg-[#090b16]/95 backdrop-blur-2xl p-1.5 rounded-2xl border-2 border-amber-400/40 shadow-[0_4px_25px_rgba(0,0,0,0.85)]">

        {/* Bell Strike Counter */}
        {bellCount > 0 && (
          <div className="px-2 py-0.5 rounded-xl bg-amber-400/20 border border-amber-400/30 text-[10px] font-mono text-amber-300 font-bold">
            🔔 ×{bellCount}
          </div>
        )}

        {/* 🔔 Real Mandir Ghanta Button */}
        <button
          onClick={ringBell}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-sm cursor-pointer transition-all hover:scale-110 active:scale-95 bg-gradient-to-br from-amber-500 to-amber-700 text-black border border-amber-300 shadow-md"
          title="मन्दिर घंटा बजाएं"
        >
          🔔
        </button>

        {/* 🕉️ 136.1 Hz Om Ambient Toggle */}
        <button
          onClick={toggleOm}
          className={`w-9 h-9 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 border text-xs font-bold ${
            omOn 
              ? 'bg-gradient-to-br from-purple-600 to-indigo-800 border-purple-300 shadow-[0_0_15px_rgba(147,51,234,0.6)] text-white' 
              : 'bg-[#141624] border-[#c5a059]/30 text-[#c5a059]'
          }`}
          title={omOn ? 'ॐ नाद बंद करें' : 'ॐ ध्यान नाद चालू करें'}
        >
          <span className="font-devanagari text-sm font-black leading-none">ॐ</span>
        </button>

        {/* 🎵 Temple Chanting Stream */}
        <button
          onClick={() => { setYtOpen(p => !p); sacredAudio.playNavChime(0.08); }}
          className={`w-9 h-9 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 border ${
            ytOpen 
              ? 'bg-gradient-to-br from-red-600 to-amber-700 border-red-300 text-white shadow-md' 
              : 'bg-[#141624] border-[#c5a059]/30 text-[#c5a059]'
          }`}
          title="पवित्र गीता पाठ (YouTube Live)"
        >
          <Music className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
