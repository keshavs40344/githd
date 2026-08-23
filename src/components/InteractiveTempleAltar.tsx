'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Flame, Bell, Volume2, ShieldCheck, Sun, Moon, Check, Share2 } from 'lucide-react';
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

interface LitDiya {
  id: number;
  name: string;
  sankalp: string;
  time: string;
}

const FLOWERS = ['🌸', '🌺', '🌼', '🪷', '🌻', '🌹', '✨', '💐'];

export default function InteractiveTempleAltar() {
  const [aartiActive, setAartiActive] = useState(false);
  const [aartiRot, setAartiRot] = useState(0);
  const [petals, setPetals] = useState<Petal[]>([]);
  const [offeringCount, setOfferingCount] = useState(148);
  const [bellRung, setBellRung] = useState(false);
  
  // Diya Lighting Sankalp
  const [devoteeName, setDevoteeName] = useState('');
  const [sankalpText, setSankalpText] = useState('');
  const [litDiyas, setLitDiyas] = useState<LitDiya[]>([
    { id: 1, name: 'अमित शर्मा', sankalp: 'परिवार में सुख-शान्ति व आरोग्य', time: 'अभी-अभी' },
    { id: 2, name: 'प्रिया वर्मा', sankalp: 'विद्या व एकाग्रता प्राप्ति', time: '२ मिनट पहले' },
    { id: 3, name: 'राजेश पटेल', sankalp: 'सत्यनिष्ठा व धर्म पालन', time: '५ मिनट पहले' }
  ]);
  const [showDiyaForm, setShowDiyaForm] = useState(false);
  const [diyaSuccess, setDiyaSuccess] = useState(false);

  // Pushpanjali (Flower Shower)
  const handlePushpanjali = () => {
    sacredAudio.playFluteChime(0.3);
    setOfferingCount(prev => prev + 1);

    const newPetals: Petal[] = Array.from({ length: 24 }, (_, i) => ({
      id: Date.now() + i,
      x: 5 + Math.random() * 90,
      y: -10 - Math.random() * 20,
      rot: Math.random() * 360,
      symbol: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
      size: 18 + Math.random() * 18,
      duration: 2.8 + Math.random() * 1.5,
    }));

    setPetals(prev => [...prev, ...newPetals]);
    setTimeout(() => {
      setPetals(prev => prev.filter(p => !newPetals.some(np => np.id === p.id)));
    }, 4500);
  };

  // Perform Virtual Aarti
  const handleStartAarti = () => {
    sacredAudio.playTripleGhanta(0.75);
    sacredAudio.playShankhnaad(0.45);
    setAartiActive(true);

    let angle = 0;
    const interval = setInterval(() => {
      angle += 5;
      setAartiRot(angle);
      if (angle >= 1080) {
        clearInterval(interval);
        setAartiActive(false);
        setAartiRot(0);
      }
    }, 25);
  };

  const handleRingBell = () => {
    setBellRung(true);
    sacredAudio.playTripleGhanta(0.8);
    setTimeout(() => setBellRung(false), 1400);
  };

  const handleLightDiyaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!devoteeName.trim()) return;

    sacredAudio.playTempleBell(0.6);
    sacredAudio.playFluteChime(0.3);

    const newDiya: LitDiya = {
      id: Date.now(),
      name: devoteeName.trim(),
      sankalp: sankalpText.trim() || 'सर्व मंगल व चित्त शुद्धि',
      time: 'अभी-अभी'
    };

    setLitDiyas(prev => [newDiya, ...prev.slice(0, 5)]);
    setDevoteeName('');
    setSankalpText('');
    setDiyaSuccess(true);
    setTimeout(() => {
      setDiyaSuccess(false);
      setShowDiyaForm(false);
    }, 2000);
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
        <div className="flex justify-center items-center gap-6 sm:gap-14 pb-2">
          {[-1, 0, 1].map((offset, i) => (
            <button
              key={i}
              onClick={handleRingBell}
              className={`group flex flex-col items-center cursor-pointer transition-transform ${
                bellRung ? 'animate-bell-swing' : 'hover:scale-115'
              }`}
              title="मन्दिर घंटा बजाएं"
            >
              <div className="w-0.5 h-6 bg-gradient-to-b from-amber-200 to-amber-600 group-hover:h-7 transition-all" />
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-700 flex items-center justify-center text-xl shadow-[0_0_20px_rgba(245,158,11,0.6)] border-2 border-amber-200/50 group-hover:scale-105">
                🔔
              </div>
            </button>
          ))}
        </div>

        {/* Temple Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>नित्य दिव्य मन्दिर गर्भगृह • 24x7 Live Mandir Altar</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-devanagari font-black text-[#f5eed9]">
          भगवान श्रीकृष्ण <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">दिव्य गर्भगृह</span>
        </h2>
        
        <p className="text-xs sm:text-sm text-[#f5eed9]/70 font-serif max-w-lg mx-auto">
          यहाँ आप ऑनलाइन पुष्पांजलि अर्पित कर सकते हैं, अखंड दीप प्रज्ज्वलित कर सकते हैं, और दिव्य आरती व घण्टा नाद कर सकते हैं।
        </p>
      </div>

      {/* Main Altar 3-Column Stage */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* Left: Pushpanjali & Flowers */}
        <div className="p-5 rounded-2xl bg-[#0f1120]/80 border border-[#c5a059]/30 flex flex-col items-center justify-between text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-600/20 border border-pink-400/40 flex items-center justify-center text-3xl shadow-inner">
            🪷
          </div>
          <div>
            <h3 className="font-devanagari font-bold text-base text-[#f5eed9]">पुष्पांजलि अर्पण</h3>
            <p className="text-xs font-serif text-[#f5eed9]/70 mt-0.5">कमल, गुलाब व तुलसी दल का पावन अर्पण</p>
          </div>
          <div className="text-[11px] font-mono text-amber-400 font-bold bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            💐 {offeringCount} बार पुष्प अर्पित
          </div>
          <button
            onClick={handlePushpanjali}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-serif font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>🌸 पुष्प अर्पित करें (Offer Flowers)</span>
          </button>
        </div>

        {/* Center: Divine Aarti Thali & Holy Om */}
        <div className="relative flex flex-col items-center justify-between p-6 rounded-3xl bg-gradient-to-b from-[#181c33] to-[#090b14] border-2 border-amber-400/50 shadow-2xl text-center">
          
          {/* Circular Holy Aura */}
          <div className="absolute w-48 h-48 rounded-full bg-[radial-gradient(circle,_rgba(245,158,11,0.25),transparent_70%)] animate-temple-pulse pointer-events-none" />

          {/* Deity Holy Seal */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-700 p-1 shadow-[0_0_40px_rgba(245,158,11,0.6)] flex items-center justify-center mb-2">
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

          <div className="space-y-1 my-2">
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
            className="w-full py-3 rounded-2xl font-serif font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-75"
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#000'
            }}
          >
            <Flame className="w-4 h-4 fill-current" />
            <span>{aartiActive ? 'आरती चल रही है...' : '🪔 दिव्य आरती करें (Perform Aarti)'}</span>
          </button>
        </div>

        {/* Right: Akhand Diya & Sankalp */}
        <div className="p-5 rounded-2xl bg-[#0f1120]/80 border border-[#c5a059]/30 flex flex-col items-center justify-between text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-400/40 flex items-center justify-center text-3xl shadow-inner">
            🪔
          </div>
          <div>
            <h3 className="font-devanagari font-bold text-base text-[#f5eed9]">अखंड दीप प्रज्वलन</h3>
            <p className="text-xs font-serif text-[#f5eed9]/70 mt-0.5">अपने नाम व संकल्प से दीप प्रज्ज्वलित करें</p>
          </div>
          
          <div className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-400/20">
            🔥 {litDiyas.length + 108} दीप प्रज्ज्वलित
          </div>

          <button
            onClick={() => setShowDiyaForm(true)}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-serif font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>🪔 दीप प्रज्ज्वलित करें (Light Diya)</span>
          </button>
        </div>

      </div>

      {/* Diya Lighting Modal / Sheet */}
      {showDiyaForm && (
        <div className="mt-6 p-5 rounded-2xl bg-[#0a0c16] border-2 border-amber-400/40 animate-scale-in">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-devanagari font-bold text-sm text-amber-300 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-400" />
              संकल्प दीप सेवा
            </h4>
            <button 
              onClick={() => setShowDiyaForm(false)}
              className="text-[#c5a059] hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>

          {diyaSuccess ? (
            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-400/40 text-center space-y-1">
              <Check className="w-6 h-6 text-emerald-400 mx-auto" />
              <p className="font-devanagari font-bold text-sm text-emerald-300">
                आपका दीप भगवान के श्रीचरणों में प्रज्ज्वलित हो गया है! 🙏
              </p>
              <p className="text-xs font-serif text-[#f5eed9]/70">भगवान आपकी समस्त मनोकामनाएं पूर्ण करें।</p>
            </div>
          ) : (
            <form onSubmit={handleLightDiyaSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="आपका शुभ नाम (Your Name)"
                  value={devoteeName}
                  onChange={e => setDevoteeName(e.target.value)}
                  required
                  className="px-3.5 py-2 rounded-xl bg-[#141626] border border-[#c5a059]/30 text-xs font-serif text-[#f5eed9] placeholder-[#c5a059]/40 focus:outline-none focus:border-amber-400"
                />
                <input
                  type="text"
                  placeholder="आपका संकल्प / प्रार्थना (Optional Prayer)"
                  value={sankalpText}
                  onChange={e => setSankalpText(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-[#141626] border border-[#c5a059]/30 text-xs font-serif text-[#f5eed9] placeholder-[#c5a059]/40 focus:outline-none focus:border-amber-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-serif font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-all cursor-pointer"
              >
                <span>🔥 भगवान के श्रीचरणों में दीप अर्पित करें</span>
              </button>
            </form>
          )}

          {/* Recent devotees who lit diyas */}
          <div className="mt-4 pt-3 border-t border-amber-400/15">
            <p className="text-[10px] font-mono text-[#c5a059]/60 mb-2">हाल ही में प्रज्ज्वलित दीप:</p>
            <div className="flex flex-wrap gap-2">
              {litDiyas.map(d => (
                <div key={d.id} className="px-2.5 py-1 rounded-lg bg-[#141624] border border-amber-400/20 text-[10px] font-serif text-amber-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                  <span className="font-bold">{d.name}</span>
                  <span className="text-[#c5a059]/60">({d.sankalp})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sanctum Footer */}
      <div className="mt-6 pt-4 border-t border-amber-400/15 flex flex-wrap items-center justify-between text-xs font-mono text-[#c5a059]/70 gap-2">
        <span>🪔 नित्य आरती समय: ब्राह्म मुहूर्त व संध्या काल</span>
        <span className="text-amber-300 font-serif">यतो धर्मस्ततो जयः (जहाँ धर्म है, वहीं विजय है)</span>
      </div>

    </div>
  );
}
