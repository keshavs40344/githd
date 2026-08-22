'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Flame, RotateCcw, Volume2, Award, 
  Wind, Play, Pause, CheckCircle2, ChevronRight
} from 'lucide-react';
import { sacredAudio } from '@/lib/sacredSounds';

const MANTRAS = [
  { id: 'krishna_maha', name: 'हरे कृष्ण महामंत्र', text: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे । हरे राम हरे राम राम राम हरे हरे ॥' },
  { id: 'om_namo', name: 'द्वादशाक्षर मंत्र', text: 'ॐ नमो भगवते वासुदेवाय' },
  { id: 'gayatri', name: 'गायत्री महामंत्र', text: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥' },
  { id: 'om', name: 'प्रणव ओंकार नाद', text: 'ॐ' }
];

export default function SacredJapaMala() {
  const [selectedMantra, setSelectedMantra] = useState(MANTRAS[0]);
  const [beadCount, setBeadCount] = useState(0);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [dailyStreak, setDailyStreak] = useState(1);
  const [isBreathMode, setIsBreathMode] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathSeconds, setBreathSeconds] = useState(4);

  useEffect(() => {
    try {
      const savedMala = localStorage.getItem('gita_japa_stats');
      if (savedMala) {
        const data = JSON.parse(savedMala);
        setRoundsCompleted(data.rounds || 0);
        setDailyStreak(data.streak || 1);
      }
    } catch {}
  }, []);

  const handleBeadClick = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(25); } catch {}
    }
    
    sacredAudio.playNavChime(0.06);

    setBeadCount(prev => {
      const next = prev + 1;
      if (next >= 108) {
        // Complete 1 round
        sacredAudio.playTempleBell(0.4);
        setRoundsCompleted(r => {
          const newR = r + 1;
          try {
            localStorage.setItem('gita_japa_stats', JSON.stringify({ rounds: newR, streak: dailyStreak }));
          } catch {}
          return newR;
        });
        return 0;
      }
      return next;
    });
  };

  const resetCount = () => {
    setBeadCount(0);
    sacredAudio.playNavChime(0.05);
  };

  // Pranayama Breath Timer
  useEffect(() => {
    if (!isBreathMode) return;
    const interval = setInterval(() => {
      setBreathSeconds(prev => {
        if (prev <= 1) {
          if (breathPhase === 'inhale') {
            setBreathPhase('hold');
            return 7;
          } else if (breathPhase === 'hold') {
            setBreathPhase('exhale');
            return 8;
          } else {
            setBreathPhase('inhale');
            handleBeadClick();
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isBreathMode, breathPhase]);

  const progressPercent = Math.min(100, (beadCount / 108) * 100);

  return (
    <div className="rounded-3xl bg-gradient-to-b from-[#141624]/95 via-[#0d0f19]/95 to-[#090a12]/95 border-2 border-[#c5a059]/35 p-5 sm:p-8 shadow-2xl space-y-6">
      
      {/* Top Header & Streak */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c5a059]/20 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-xs font-serif text-[#e6c687]">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>दैनिक १०८ जप माला एवं प्राणायाम साधना • Sadhana Sanctum</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-devanagari font-bold text-[#f5eed9]">
            १०८ पवित्र <span className="text-[#c5a059]">तुलसी जप माला</span>
          </h3>
        </div>

        {/* Daily Streak Counter */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="px-3.5 py-1.5 rounded-2xl bg-[#090b14] border border-amber-500/30 flex items-center gap-2 text-xs font-serif text-[#e6c687]">
            <Flame className="w-4 h-4 text-orange-400 fill-current animate-pulse" />
            <span>साधना स्ट्रीक: <strong className="text-white font-mono">{dailyStreak} दिन</strong></span>
          </div>

          <div className="px-3.5 py-1.5 rounded-2xl bg-[#090b14] border border-[#c5a059]/30 flex items-center gap-2 text-xs font-serif text-[#e6c687]">
            <Award className="w-4 h-4 text-amber-300" />
            <span>पूर्ण माला: <strong className="text-white font-mono">{roundsCompleted}</strong></span>
          </div>
        </div>
      </div>

      {/* Mantra Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {MANTRAS.map(m => (
          <button
            key={m.id}
            onClick={() => {
              setSelectedMantra(m);
              sacredAudio.playNavChime(0.06);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-serif shrink-0 transition-all cursor-pointer border ${
              selectedMantra.id === m.id
                ? 'bg-[#c5a059] text-black font-bold shadow-md'
                : 'bg-[#141624] text-[#c5a059]/70 hover:text-[#f5eed9] border-[#c5a059]/20'
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>

      {/* Mantra Display Card */}
      <div className="p-4 rounded-2xl bg-[#0a0c16]/90 border border-[#c5a059]/25 text-center space-y-1">
        <span className="text-[10px] font-mono text-amber-300 uppercase tracking-widest block">
          ॥ पावन जप मंत्र ॥
        </span>
        <p className="font-devanagari text-base sm:text-lg text-[#f5eed9] font-semibold leading-relaxed">
          {selectedMantra.text}
        </p>
      </div>

      {/* Interactive 108 Bead Clicker Wheel */}
      <div className="flex flex-col items-center justify-center py-4 space-y-5">
        
        {/* The Sacred Bead Disc */}
        <button
          onClick={handleBeadClick}
          className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br from-amber-500 via-[#c5a059] to-amber-700 p-1.5 shadow-[0_0_50px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-transform duration-150 cursor-pointer group"
          title="क्लिक करके १ मनका आगे बढ़ाएं"
        >
          <div className="w-full h-full rounded-full bg-[#0a0c16] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
            
            {/* Progress Radial Background */}
            <div 
              className="absolute inset-0 bg-amber-500/20 transition-all duration-300"
              style={{ clipPath: `polygon(50% 50%, 0 0, ${progressPercent}% 0, 100% 100%)` }}
            />

            <span className="text-3xl sm:text-4xl font-mono font-bold text-[#f5eed9] drop-shadow-md relative z-10">
              {beadCount}
            </span>
            <span className="text-xs font-mono text-amber-300 relative z-10">
              / १०८ मनके
            </span>
            <span className="text-[11px] font-serif text-[#c5a059]/80 mt-1 relative z-10 group-hover:text-white transition-colors">
              (स्पर्श करें 📿)
            </span>
          </div>
        </button>

        {/* Progress Bar & Actions */}
        <div className="w-full max-w-md space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#c5a059]">
            <span>प्रगति: {Math.round(progressPercent)}%</span>
            <span>माला प्रगति: {beadCount} / 108</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#141829] overflow-hidden border border-[#c5a059]/20">
            <div
              className="h-full bg-gradient-to-r from-[#c5a059] to-amber-400 transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Controls: Reset & Pranayama Breath Guide */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              setIsBreathMode(!isBreathMode);
              sacredAudio.playNavChime(0.08);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-serif font-bold flex items-center gap-2 border transition-all cursor-pointer ${
              isBreathMode
                ? 'bg-cyan-500 text-black border-cyan-300 shadow-md'
                : 'bg-[#141624] text-cyan-300 border-cyan-500/30 hover:bg-[#1f2238]'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>{isBreathMode ? `प्राणायाम चालू: ${breathPhase} (${breathSeconds}s)` : '४-७-८ प्राणायाम श्वास मोड'}</span>
          </button>

          <button
            onClick={resetCount}
            className="px-4 py-2 rounded-xl bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/30 text-xs font-serif text-[#e6c687] flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>पुनः आरंभ (Reset)</span>
          </button>
        </div>

      </div>

    </div>
  );
}
