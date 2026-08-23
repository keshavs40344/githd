'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Flame, Bell, Volume2, ShieldCheck, Sun, Moon } from 'lucide-react';
import { sacredAudio } from '@/lib/sacredSounds';

interface Petal {
  id: number;
  x: number;
  y: number;
  rot: number;
  symbol: string;
  size: number;
  duration: number;
}

const FLOWERS = ['🌸', '🌺', '🌼', '🪷', '🌻', '🌹', '✨'];

export default function InteractiveTempleAltar() {
  const [aartiActive, setAartiActive] = useState(false);
  const [aartiRot, setAartiRot] = useState(0);
  const [petals, setPetals] = useState<Petal[]>([]);
  const [offeringCount, setOfferingCount] = useState(108);
  const [bellRung, setBellRung] = useState(false);
  const [selectedDeity, setSelectedDeity] = useState<'krishna' | 'radha' | 'arjuna'>('krishna');

  // Pushpanjali (Flower Shower)
  const handlePushpanjali = () => {
    sacredAudio.playFluteChime(0.3);
    setOfferingCount(prev => prev + 1);

    const newPetals: Petal[] = Array.from({ length: 18 }, (_, i) => ({
      id: Date.now() + i,
      x: 10 + Math.random() * 80,
      y: -10 - Math.random() * 20,
      rot: Math.random() * 360,
      symbol: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
      size: 16 + Math.random() * 16,
      duration: 2.5 + Math.random() * 1.5,
    }));

    setPetals(prev => [...prev, ...newPetals]);
    setTimeout(() => {
      setPetals(prev => prev.filter(p => !newPetals.some(np => np.id === p.id)));
    }, 4000);
  };

  // Perform Virtual Aarti
  const handleStartAarti = () => {
    sacredAudio.playTripleGhanta(0.7);
    sacredAudio.playShankhnaad(0.4);
    setAartiActive(true);

    let angle = 0;
    const interval = setInterval(() => {
      angle += 6;
      setAartiRot(angle);
      if (angle >= 720) {
        clearInterval(interval);
        setAartiActive(false);
        setAartiRot(0);
      }
    }, 30);
  };

  const handleRingBell = () => {
    setBellRung(true);
    sacredAudio.playTripleGhanta(0.75);
    setTimeout(() => setBellRung(false), 1200);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/40 bg-gradient-to-b from-[#13162b] via-[#090b14] to-[#120e06] p-6 sm:p-8 shadow-[0_15px_70px_rgba(245,158,11,0.2)]">
      
      {/* Flower Petals Layer */}
      {petals.map(p => (
        <div
          key={p.id}
          className="absolute pointer-events-none z-30 animate-petal-fall"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            transform: `rotate(${p.rot}deg)`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.symbol}
        </div>
      ))}

      {/* Temple Arch Header */}
      <div className="relative z-10 text-center space-y-3 mb-6">
        
        {/* Hanging Bells Row */}
        <div className="flex justify-center items-center gap-6 sm:gap-12 pb-2">
          {[-1, 0, 1].map((offset, i) => (
            <button
              key={i}
              onClick={handleRingBell}
              className={`group flex flex-col items-center cursor-pointer transition-transform ${
                bellRung ? 'animate-bell-swing' : 'hover:scale-110'
              }`}
              title="मन्दिर घंटा बजाएं"
            >
              <div className="w-0.5 h-6 bg-gradient-to-b from-amber-200 to-amber-600 group-hover:h-7 transition-all" />
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-lg shadow-[0_0_15px_rgba(245,158,11,0.5)] border border-amber-300/40 group-hover:scale-105">
                🔔
              </div>
            </button>
          ))}
        </div>

        {/* Temple Name */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>नित्य दिव्य मन्दिर सेवा • Virtual Mandir Sanctum</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-devanagari font-black text-[#f5eed9]">
          भगवान श्रीकृष्ण <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">दिव्य गर्भगृह</span>
        </h2>
        
        <p className="text-xs sm:text-sm text-[#f5eed9]/70 font-serif max-w-lg mx-auto">
          यहाँ आप ऑनलाइन पुष्पांजलि अर्पित कर सकते हैं, पावन मन्दिर घंटा बजा सकते हैं, और दिव्य आरती संपन्न कर सकते हैं।
        </p>
      </div>

      {/* Main Altar Stage */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* Left: Pushpanjali & Flowers */}
        <div className="p-5 rounded-2xl bg-[#0f1120]/80 border border-[#c5a059]/30 flex flex-col items-center text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-600/20 border border-pink-400/40 flex items-center justify-center text-3xl">
            🪷
          </div>
          <div>
            <h3 className="font-devanagari font-bold text-base text-[#f5eed9]">पुष्पांजलि अर्पण</h3>
            <p className="text-xs font-serif text-[#f5eed9]/70 mt-0.5">कमल व गुलाब के पावन पुष्प</p>
          </div>
          <div className="text-[11px] font-mono text-amber-400">
            💐 {offeringCount} बार पुष्प अर्पित
          </div>
          <button
            onClick={handlePushpanjali}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-serif font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>🌸 पुष्प अर्पित करें</span>
          </button>
        </div>

        {/* Center: Divine Aarti Thali & Deity Icon */}
        <div className="relative flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-b from-[#181c33] to-[#090b14] border-2 border-amber-400/50 shadow-2xl text-center">
          
          {/* Circular Holy Aura */}
          <div className="absolute w-44 h-44 rounded-full bg-[radial-gradient(circle,_rgba(245,158,11,0.25),transparent_70%)] animate-temple-pulse pointer-events-none" />

          {/* Deity Circle */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-700 p-1 shadow-[0_0_40px_rgba(245,158,11,0.6)] flex items-center justify-center mb-3">
            <div className="w-full h-full rounded-full bg-[#07080d] flex flex-col items-center justify-center border-2 border-amber-300/40">
              <span className="font-devanagari text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-amber-500">
                ॐ
              </span>
              <span className="text-[9px] font-mono text-amber-300/80 tracking-widest uppercase">श्रीकृष्ण</span>
            </div>

            {/* Rotating Aarti Thali Flame when active */}
            {aartiActive && (
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{ transform: `rotate(${aartiRot}deg)` }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-3 h-6 rounded-full bg-gradient-to-t from-orange-500 via-yellow-300 to-white shadow-[0_0_15px_rgba(245,158,11,1)] animate-pulse" />
                  <div className="w-6 h-2 rounded-full bg-amber-800" />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h3 className="font-devanagari font-bold text-lg text-amber-300">
              ॥ श्री कृष्णाय नमः ॥
            </h3>
            <p className="text-xs font-serif text-[#f5eed9]/70">
              सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज
            </p>
          </div>

          {/* Action: Aarti Button */}
          <button
            onClick={handleStartAarti}
            disabled={aartiActive}
            className="mt-4 px-6 py-2.5 rounded-2xl font-serif font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-75"
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#000'
            }}
          >
            <Flame className="w-4 h-4 fill-current" />
            <span>{aartiActive ? 'आरती चल रही है...' : '🪔 दिव्य आरती करें'}</span>
          </button>
        </div>

        {/* Right: Ghanta & Shankh Aarti Sounds */}
        <div className="p-5 rounded-2xl bg-[#0f1120]/80 border border-[#c5a059]/30 flex flex-col items-center text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-600/20 border border-amber-400/40 flex items-center justify-center text-3xl">
            🔔
          </div>
          <div>
            <h3 className="font-devanagari font-bold text-base text-[#f5eed9]">मन्दिर घण्टा नाद</h3>
            <p className="text-xs font-serif text-[#f5eed9]/70 mt-0.5">त्रिवार मन्दिर घण्टा व शंख</p>
          </div>
          <div className="text-[11px] font-mono text-emerald-400">
            ✓ 9 Inharmonic Bronze Resonance
          </div>
          <button
            onClick={handleRingBell}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-serif font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>🔔 घण्टा बजाएं</span>
          </button>
        </div>

      </div>

      {/* Bottom Sanctum Footer */}
      <div className="mt-6 pt-4 border-t border-amber-400/15 flex flex-wrap items-center justify-between text-xs font-mono text-[#c5a059]/70 gap-2">
        <span>🪔 नित्य आरती समय: ब्राह्म मुहूर्त व संध्या काल</span>
        <span className="text-amber-300 font-serif">यतो धर्मस्ततो जयः (जहाँ धर्म है, वहीं विजय है)</span>
      </div>

    </div>
  );
}
