'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Heart, Flame, Bell, Volume2, ShieldCheck, 
  Sun, Moon, Check, Share2, Flower2, Music, Feather
} from 'lucide-react';
import { sacredAudio } from '@/lib/sacredSounds';
import { siteGuardian } from '@/lib/siteGuardianBot';

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

const FLOWERS = ['🪷', '🌸', '🌹', '🌼', '🌺', '🍃', '✨', '💐'];

export default function InteractiveTempleAltar() {
  const [aartiActive, setAartiActive] = useState(false);
  const [aartiRot, setAartiRot] = useState(0);
  const [petals, setPetals] = useState<Petal[]>([]);
  const [offeringCount, setOfferingCount] = useState(256);
  const [bellRung, setBellRung] = useState(false);
  
  // Diya Lighting Sankalp
  const [devoteeName, setDevoteeName] = useState('');
  const [sankalpText, setSankalpText] = useState('');
  const [litDiyas, setLitDiyas] = useState<LitDiya[]>([
    { id: 1, name: 'राधा वल्लभ दास', sankalp: 'श्री राधा-कृष्ण युगल चरण अनुराग', time: 'अभी-अभी' },
    { id: 2, name: 'अमित शर्मा', sankalp: 'परिवार में सुख-शान्ति, आरोग्य व कल्याण', time: '१ मिनट पहले' },
    { id: 3, name: 'प्रिया वर्मा', sankalp: 'विद्या, एकाग्रता एवं मन की स्थिरता', time: '४ मिनट पहले' }
  ]);
  const [showDiyaForm, setShowDiyaForm] = useState(false);
  const [diyaSuccess, setDiyaSuccess] = useState(false);

  // Initialize Site Guardian Bot on mount
  useEffect(() => {
    siteGuardian.init();
  }, []);

  // Pushpanjali (Flower Shower)
  const handlePushpanjali = () => {
    sacredAudio.playFluteChime(0.35);
    setOfferingCount(prev => prev + 1);

    const newPetals: Petal[] = Array.from({ length: 28 }, (_, i) => ({
      id: Date.now() + i,
      x: 3 + Math.random() * 94,
      y: -10 - Math.random() * 20,
      rot: Math.random() * 360,
      symbol: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
      size: 20 + Math.random() * 18,
      duration: 3.2 + Math.random() * 1.5,
    }));

    setPetals(prev => [...prev, ...newPetals]);
    setTimeout(() => {
      setPetals(prev => prev.filter(p => !newPetals.some(np => np.id === p.id)));
    }, 4800);
  };

  // Perform Virtual Aarti
  const handleStartAarti = () => {
    sacredAudio.playTripleGhanta(0.75);
    sacredAudio.playShankhnaad(0.5);
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
    sacredAudio.playTripleGhanta(0.85);
    setTimeout(() => setBellRung(false), 1400);
  };

  const handleLightDiyaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!devoteeName.trim()) return;

    sacredAudio.playTempleBell(0.65);
    sacredAudio.playFluteChime(0.35);

    const newDiya: LitDiya = {
      id: Date.now(),
      name: devoteeName.trim(),
      sankalp: sankalpText.trim() || 'श्री राधा-कृष्ण कृपा व मंगल कामना',
      time: 'अभी-अभी'
    };

    setLitDiyas(prev => [newDiya, ...prev.slice(0, 11)]);
    setDevoteeName('');
    setSankalpText('');
    setDiyaSuccess(true);
    setShowDiyaForm(false);
    setTimeout(() => setDiyaSuccess(false), 4000);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 z-20">
      
      {/* ── PETAL SHOWER CANVAS ────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {petals.map(p => (
          <div
            key={p.id}
            className="absolute animate-petal-fall"
            style={{
              left: `${p.x}%`,
              top: `${p.y}px`,
              fontSize: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              transform: `rotate(${p.rot}deg)`,
            }}
          >
            {p.symbol}
          </div>
        ))}
      </div>

      {/* ── MAIN RADHA-KRISHNA MANDIR SANCTUM ─────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#0e1020] via-[#090b16] to-[#05060b] border-2 border-amber-400/40 shadow-[0_20px_80px_rgba(0,0,0,0.9)] p-4 sm:p-8 space-y-6">
        
        {/* Vrindavan Aura & Torana Decoration */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-teal-400 to-amber-500" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-amber-500/15 via-teal-500/10 to-transparent pointer-events-none blur-2xl" />

        {/* Top Sanctum Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-400/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-[#c5a059] to-teal-500 flex items-center justify-center shadow-lg text-black font-bold text-2xl animate-glow-pulse">
              🪷
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-400/20 text-teal-300 border border-teal-400/30 font-bold">
                  श्री श्री राधा-गोविन्द गर्भगृह
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <h2 className="text-xl sm:text-3xl font-devanagari font-bold text-amber-300 drop-shadow-md">
                श्री राधा-कृष्ण दिव्य मन्दिर दर्शन
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRingBell}
              className={`p-2.5 sm:px-4 sm:py-2 rounded-2xl bg-[#141829] hover:bg-[#1f243d] border-2 border-amber-400/30 text-amber-300 hover:text-white flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                bellRung ? 'scale-105 border-amber-300 bg-amber-400/20' : ''
              }`}
              title="कांस्य मन्दिर घण्टा बजाएं"
            >
              <Bell className={`w-5 h-5 text-amber-400 ${bellRung ? 'animate-bell-swing' : ''}`} />
              <span className="text-xs font-serif font-bold hidden sm:inline">कांस्य घण्टा</span>
            </button>

            <button
              onClick={handlePushpanjali}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-black font-serif font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:scale-103 active:scale-95 transition-all cursor-pointer"
            >
              <Flower2 className="w-4 h-4 fill-current" />
              <span>पुष्पांजलि अर्पण</span>
            </button>
          </div>
        </div>

        {/* ── SACRED ALTAR DISPLAY (Vrindavan Darshan & Aarti Flame) ─────────── */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#13162b] to-[#080912] border-2 border-amber-400/30 p-6 sm:p-10 text-center space-y-6 animate-peacock-glow">
          
          {/* Swinging Temple Bells on Ceiling */}
          <div className="absolute top-2 left-6 sm:left-12 flex flex-col items-center cursor-pointer" onClick={handleRingBell}>
            <div className="w-0.5 h-6 bg-amber-400/60" />
            <Bell className={`w-6 h-6 text-amber-300 ${bellRung ? 'animate-bell-swing' : 'hover:scale-110'} transition-transform`} />
          </div>

          <div className="absolute top-2 right-6 sm:right-12 flex flex-col items-center cursor-pointer" onClick={handleRingBell}>
            <div className="w-0.5 h-6 bg-amber-400/60" />
            <Bell className={`w-6 h-6 text-amber-300 ${bellRung ? 'animate-bell-swing' : 'hover:scale-110'} transition-transform`} />
          </div>

          {/* Central Sacred Divine Shloka & Deity Frame */}
          <div className="space-y-3 max-w-2xl mx-auto pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-serif font-bold shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>॥ तप्तकाञ्चनगौराङ्गि राधे वृन्दावनेश्वरि ॥</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-devanagari font-black text-[#f5eed9] leading-relaxed drop-shadow-[0_4px_25px_rgba(245,158,11,0.5)]">
              वृषभानुसुता देवि प्रणमामि हरिप्रिये
            </h3>

            <p className="text-xs sm:text-sm font-serif text-amber-200/90 leading-relaxed max-w-xl mx-auto">
              हे श्री राधे! आप परम दयामयी एवं वृन्दावन की स्वामिनी हैं। आपके और श्री कृष्ण के युगल चरणों में हमारा कोटि-कोटि प्रणाम।
            </p>
          </div>

          {/* ── VIRTUAL 360° AARTI THALI CONTAINER ──────────────────────────── */}
          <div className="py-4 flex flex-col items-center justify-center space-y-4">
            
            {/* The Revolving Aarti Plate */}
            <div 
              className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-amber-300 via-[#d4af37] to-amber-700 p-1.5 shadow-[0_0_50px_rgba(245,158,11,0.7)] flex items-center justify-center cursor-pointer transition-transform duration-75"
              style={{ transform: `rotate(${aartiRot}deg)` }}
              onClick={handleStartAarti}
              title="दिव्य आरती प्रारंभ करें"
            >
              <div className="w-full h-full rounded-full bg-[#0d0f1c] border-2 border-amber-400/60 flex items-center justify-center relative overflow-hidden">
                {/* Aarti Diya Flame in Center */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-8 h-10 rounded-full bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-100 animate-diya-flame" />
                  <div className="w-12 h-3 rounded-full bg-amber-600/80 -mt-1 shadow-md" />
                </div>

                {/* Surrounding Sacred Offerings on Thali */}
                <span className="absolute top-2 text-xs">🪷</span>
                <span className="absolute bottom-2 text-xs">🌺</span>
                <span className="absolute left-2 text-xs">🌿</span>
                <span className="absolute right-2 text-xs">🪔</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleStartAarti}
                disabled={aartiActive}
                className="px-5 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-serif font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg disabled:opacity-75 cursor-pointer"
              >
                <Flame className="w-4 h-4 fill-current" />
                <span>{aartiActive ? 'आरती चल रही है...' : '🔥 दिव्य आरती करें'}</span>
              </button>

              <button
                onClick={() => setShowDiyaForm(!showDiyaForm)}
                className="px-4 py-2 rounded-2xl bg-[#14182b] hover:bg-[#1f243d] border-2 border-amber-400/40 text-amber-300 font-serif font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>🪔 संकल्प दीप जलाएं</span>
              </button>
            </div>

          </div>

          {/* Diya Lighting Form Modal Dropdown */}
          {showDiyaForm && (
            <form
              onSubmit={handleLightDiyaSubmit}
              className="max-w-md mx-auto p-5 rounded-3xl bg-[#0a0c18] border-2 border-amber-400/40 space-y-3 shadow-2xl animate-scale-in text-left"
            >
              <h4 className="text-sm font-devanagari font-bold text-amber-300 flex items-center gap-1.5">
                <span>🪔</span>
                <span>श्री चरणों में अखंड संकल्प दीप प्रज्ज्वलन</span>
              </h4>
              
              <div>
                <label className="text-[11px] font-serif text-[#f5eed9]/80 block mb-1">आपका नाम (Devotee Name):</label>
                <input
                  type="text"
                  required
                  value={devoteeName}
                  onChange={e => setDevoteeName(e.target.value)}
                  placeholder="उदा. केशव शर्मा"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#14172b] border border-amber-400/30 text-xs font-serif text-[#f5eed9] placeholder-amber-400/40 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-serif text-[#f5eed9]/80 block mb-1">आपकी मनोकामना / संकल्प (Prayer / Sankalp):</label>
                <input
                  type="text"
                  value={sankalpText}
                  onChange={e => setSankalpText(e.target.value)}
                  placeholder="उदा. परिवार में सुख-शान्ति, भक्ति व उत्तम स्वास्थ्य"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#14172b] border border-amber-400/30 text-xs font-serif text-[#f5eed9] placeholder-amber-400/40 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowDiyaForm(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-serif text-amber-300/70 hover:text-white cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-serif font-bold shadow-md cursor-pointer"
                >
                  दीप प्रज्ज्वलित करें ✨
                </button>
              </div>
            </form>
          )}

          {/* Diya Success Notification */}
          {diyaSuccess && (
            <div className="p-3 rounded-2xl bg-amber-400/20 border border-amber-400/50 text-amber-200 text-xs font-serif animate-scale-in max-w-md mx-auto">
              🪔 आपका संकल्प दीप श्री राधा-कृष्ण के पावन चरणों में प्रज्ज्वलित हो चुका है!
            </div>
          )}

        </div>

        {/* ── RECENT SANKALP DIYA STREAM (भक्तों की दीप सेवा) ───────────────── */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-serif text-[#c5a059]">
            <span className="font-bold flex items-center gap-1.5">
              <span>🪔</span>
              <span>गर्भगृह में प्रज्ज्वलित अखंड दीप सेवा ({litDiyas.length}):</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400">● Live Sanctum</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {litDiyas.map(d => (
              <div
                key={d.id}
                className="p-3.5 rounded-2xl bg-[#0d0f1e]/90 border border-amber-400/25 flex items-start gap-3 shadow-md hover:border-amber-400/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 text-amber-300">
                  🪔
                </div>
                <div className="min-w-0 space-y-0.5 text-left">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-serif font-bold text-[#f5eed9] truncate">{d.name}</p>
                    <span className="text-[9px] font-mono text-amber-400/70 shrink-0">{d.time}</span>
                  </div>
                  <p className="text-[11px] font-serif text-amber-200/80 line-clamp-1 italic">
                    "{d.sankalp}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
