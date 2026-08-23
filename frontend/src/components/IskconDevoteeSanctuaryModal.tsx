'use client';

import React, { useState } from 'react';
import {
  Sparkles, Radio, Heart, BookOpen, Calendar, MapPin,
  CheckCircle2, Volume2, Users, Play, X, ExternalLink,
  Award, Flame, Flower2, Shield
} from 'lucide-react';
import { 
  ISKCON_LIVE_TEMPLE_FEEDS, UPCOMING_VAISHNAVA_FESTIVALS, 
  SRILA_PRABHUPADA_TEACHINGS, IskconTempleStream 
} from '@/data/iskconGlobalData';
import { sacredAudio } from '@/lib/sacredSounds';

export default function IskconDevoteeSanctuaryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'live_temples' | 'japa_16_rounds' | 'prabhupada_gita' | 'festivals'>('live_temples');
  const [selectedStream, setSelectedStream] = useState<IskconTempleStream>(ISKCON_LIVE_TEMPLE_FEEDS[0]);
  const [completedRounds, setCompletedRounds] = useState(4);

  const handleIncrementRound = () => {
    sacredAudio.playNavChime(0.08);
    setCompletedRounds(prev => Math.min(16, prev + 1));
    if (completedRounds + 1 === 16) {
      sacredAudio.playTempleBell(0.4);
    }
  };

  return (
    <>
      {/* ── HEADER / SANCTUARY TRIGGER BUTTON ────────────────────────────── */}
      <button
        onClick={() => {
          sacredAudio.playTripleGhanta(0.5);
          setIsOpen(true);
        }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-400/20 to-amber-600/20 hover:from-amber-500/30 hover:to-orange-400/30 border-2 border-orange-400/40 text-orange-300 hover:text-white text-xs font-serif font-bold shadow-[0_0_20px_rgba(249,115,22,0.25)] hover:scale-103 active:scale-95 transition-all cursor-pointer"
        title="इस्कॉन वैश्विक भक्त संगम एवं प्रभुपाद गीता पीठ खोलें"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping" />
        <span className="text-sm">🛕</span>
        <span>इस्कॉन भक्त संगम (ISKCON Global)</span>
      </button>

      {/* ── FULLSCREEN ISKCON SANCTUARY MODAL ────────────────────────────── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/94 backdrop-blur-3xl animate-fade-in">
          <div className="relative w-full max-w-7xl max-h-[94vh] overflow-hidden rounded-3xl bg-gradient-to-b from-[#120e06] via-[#0a0704] to-[#040302] border-2 border-orange-400/50 shadow-[0_30px_120px_rgba(0,0,0,0.99)] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-orange-400/20 bg-[#080502]/95 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-600 flex items-center justify-center text-xl text-black font-bold shadow-lg">
                  🛕
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-400/20 text-orange-300 border border-orange-400/30 font-bold">
                      ● ISKCON Global Devotee Sanctuary
                    </span>
                    <span className="text-[10px] font-mono text-amber-300 font-bold">Srila Prabhupada Teachings</span>
                  </div>
                  <h3 className="text-sm sm:text-lg font-devanagari font-black text-orange-300">
                    इस्कॉन वैश्विक भक्त संगम — श्रील प्रभुपाद भगवद्गीता यथारूप एवं धाम दर्शन
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-orange-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-5 py-3 border-b border-orange-400/15 bg-[#0e0a05] flex items-center gap-2 overflow-x-auto custom-scrollbar">
              <button
                onClick={() => {
                  sacredAudio.playNavChime(0.04);
                  setActiveTab('live_temples');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-serif font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'live_temples'
                    ? 'bg-gradient-to-r from-orange-400 to-amber-500 text-black shadow-md scale-103'
                    : 'bg-[#181108] border border-orange-400/20 text-[#f5eed9]/80 hover:text-white'
                }`}
              >
                <span>🛕 १. इस्कॉन धाम लाइव दर्शन (मायापुर व वृन्दावन)</span>
              </button>

              <button
                onClick={() => {
                  sacredAudio.playNavChime(0.04);
                  setActiveTab('japa_16_rounds');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-serif font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'japa_16_rounds'
                    ? 'bg-gradient-to-r from-orange-400 to-amber-500 text-black shadow-md scale-103'
                    : 'bg-[#181108] border border-orange-400/20 text-[#f5eed9]/80 hover:text-white'
                }`}
              >
                <span>📿 २. दैनिक १६ माला महामंत्र जप साधना (16 Rounds)</span>
              </button>

              <button
                onClick={() => {
                  sacredAudio.playNavChime(0.04);
                  setActiveTab('prabhupada_gita');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-serif font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'prabhupada_gita'
                    ? 'bg-gradient-to-r from-orange-400 to-amber-500 text-black shadow-md scale-103'
                    : 'bg-[#181108] border border-orange-400/20 text-[#f5eed9]/80 hover:text-white'
                }`}
              >
                <span>📜 ३. श्रील प्रभुपाद प्रणाम एवं सिद्धांत</span>
              </button>

              <button
                onClick={() => {
                  sacredAudio.playNavChime(0.04);
                  setActiveTab('festivals');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-serif font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'festivals'
                    ? 'bg-gradient-to-r from-orange-400 to-amber-500 text-black shadow-md scale-103'
                    : 'bg-[#181108] border border-orange-400/20 text-[#f5eed9]/80 hover:text-white'
                }`}
              >
                <span>📅 ४. वैष्णव कैलेंडर व एकादशी तिथियां</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar text-left font-serif">
              
              {/* ── TAB 1: ISKCON LIVE TEMPLE FEEDS ───────────────────────────── */}
              {activeTab === 'live_temples' && (
                <div className="space-y-6">
                  
                  {/* Active Temple Video Display */}
                  <div className="relative rounded-3xl overflow-hidden bg-black border-2 border-orange-400/40 shadow-2xl aspect-video max-h-[460px] w-full">
                    <iframe
                      src={selectedStream.streamUrl}
                      title={selectedStream.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                    
                    {/* Live Badge Overlay */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-orange-400/40 text-xs font-mono font-bold text-orange-300">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      <span>LIVE • {selectedStream.activeViewers.toLocaleString()} साधक दर्शनरत</span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-orange-400/30 text-xs text-[#f5eed9] flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="font-devanagari font-bold text-orange-300 text-sm sm:text-base">
                          {selectedStream.nameHindi}
                        </h4>
                        <p className="text-[11px] text-amber-200/80">{selectedStream.description}</p>
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-orange-400/20 text-orange-200 font-bold border border-orange-400/30">
                        {selectedStream.deities}
                      </span>
                    </div>
                  </div>

                  {/* Other Temple Selection Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {ISKCON_LIVE_TEMPLE_FEEDS.map(temple => (
                      <button
                        key={temple.id}
                        onClick={() => {
                          sacredAudio.playNavChime(0.06);
                          setSelectedStream(temple);
                        }}
                        className={`p-4 rounded-2xl border-2 text-left space-y-2 transition-all cursor-pointer ${
                          selectedStream.id === temple.id
                            ? 'bg-gradient-to-b from-[#241708] to-[#120c04] border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.3)] scale-102'
                            : 'bg-[#140e06] border-orange-400/20 hover:border-orange-400/50 hover:bg-[#1c140a]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg">🛕</span>
                          <span className="text-[9px] font-mono text-emerald-400 font-bold">24x7 LIVE</span>
                        </div>
                        <h5 className="text-xs font-devanagari font-bold text-orange-300 line-clamp-1">
                          {temple.nameHindi}
                        </h5>
                        <p className="text-[10px] text-amber-200/70 line-clamp-1">
                          📍 {temple.location}
                        </p>
                      </button>
                    ))}
                  </div>

                </div>
              )}

              {/* ── TAB 2: 16 ROUNDS DAILY HARE KRISHNA JAPA ──────────────────── */}
              {activeTab === 'japa_16_rounds' && (
                <div className="max-w-3xl mx-auto p-6 rounded-3xl bg-gradient-to-b from-[#181108] to-[#0c0804] border-2 border-orange-400/40 space-y-6 text-center">
                  
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-400/20 border border-orange-400/40 text-orange-300 text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                      <span>श्रील प्रभुपाद आज्ञा — दैनिक १६ माला जप संकल्प</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-devanagari font-black text-amber-300">
                      हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे ।<br />हरे राम हरे राम राम राम हरे हरे ॥
                    </h3>
                  </div>

                  {/* 16 Beads Progress Meter */}
                  <div className="p-5 rounded-2xl bg-black/50 border border-orange-400/30 space-y-4">
                    <div className="flex items-center justify-between text-xs text-orange-300 font-mono">
                      <span>दैनिक प्रगति: {completedRounds} / 16 माला पूर्ण</span>
                      <span className="text-emerald-400 font-bold">
                        {Math.round((completedRounds / 16) * 100)}% संकल्प सिद्ध
                      </span>
                    </div>

                    {/* Progress Beads Grid */}
                    <div className="grid grid-cols-8 sm:grid-cols-16 gap-2">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-9 rounded-xl flex items-center justify-center text-xs font-mono font-bold transition-all shadow ${
                            i < completedRounds
                              ? 'bg-gradient-to-br from-orange-400 to-amber-500 text-black scale-105 shadow-[0_0_10px_rgba(249,115,22,0.6)]'
                              : 'bg-[#18120a] border border-orange-400/20 text-orange-400/50'
                          }`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleIncrementRound}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-500 hover:from-orange-300 text-black font-serif font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all cursor-pointer"
                    >
                      <span>📿 १ माला जप पूर्ण दर्ज करें (+१०८ नाम)</span>
                    </button>
                  </div>

                  <p className="text-xs text-amber-200/80 leading-relaxed max-w-xl mx-auto italic">
                    "{SRILA_PRABHUPADA_TEACHINGS.coreInstruction}"
                  </p>

                </div>
              )}

              {/* ── TAB 3: SRILA PRABHUPADA PRANAM & TEACHINGS ────────────────── */}
              {activeTab === 'prabhupada_gita' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Pranam Mantra Card */}
                  <div className="p-6 rounded-3xl bg-[#140e06] border-2 border-orange-400/30 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-orange-400/20 flex items-center justify-center text-xl text-orange-300 font-bold">
                        🙏
                      </div>
                      <div>
                        <h4 className="text-base font-devanagari font-bold text-orange-300">
                          श्रील प्रभुपाद प्रणाम मंत्र
                        </h4>
                        <span className="text-xs font-mono text-amber-300/80">Srila Prabhupada Pranama</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-orange-400/20 text-xs sm:text-sm font-devanagari font-bold text-amber-200 whitespace-pre-line leading-relaxed text-center">
                      {SRILA_PRABHUPADA_TEACHINGS.pranamMantra}
                    </div>

                    <div className="p-3 rounded-xl bg-black/30 text-[11px] font-serif text-[#f5eed9]/70 whitespace-pre-line text-center italic">
                      {SRILA_PRABHUPADA_TEACHINGS.pranamMantraEnglish}
                    </div>
                  </div>

                  {/* 4 Regulative Principles & Philosophy */}
                  <div className="p-6 rounded-3xl bg-[#140e06] border-2 border-orange-400/30 space-y-4">
                    <h4 className="text-base font-devanagari font-bold text-orange-300 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-orange-400" />
                      <span>वैष्णव साधना के ४ मूल स्तम्भ (4 Regulative Principles):</span>
                    </h4>

                    <div className="space-y-2 text-xs">
                      <div className="p-3 rounded-xl bg-black/40 border border-orange-400/20 text-amber-200">
                        <strong>१. दया (Compassion):</strong> अहिंसा एवं १००% शुद्ध शाकाहारी कृष्ण प्रसाद।
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-orange-400/20 text-amber-200">
                        <strong>२. तपस्या (Austerity):</strong> समस्त प्रकार के नशा एवं व्यसन का त्याग।
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-orange-400/20 text-amber-200">
                        <strong>३. शौचम् (Cleanliness):</strong> पवित्र आचरण, मन की शुद्धि एवं ब्रह्मचर्य।
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-orange-400/20 text-amber-200">
                        <strong>४. सत्यम् (Truthfulness):</strong> द्यूतक्रीड़ा, सट्टा व छल-कपट से पूर्ण विरति।
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* ── TAB 4: VAISHNAVA CALENDAR & EKADASHI ──────────────────────── */}
              {activeTab === 'festivals' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {UPCOMING_VAISHNAVA_FESTIVALS.map(fest => (
                    <div
                      key={fest.id}
                      className="p-5 rounded-2xl bg-[#140e06] border-2 border-orange-400/30 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-orange-400/20 text-orange-300 border border-orange-400/30 font-bold">
                          {fest.dateStr}
                        </span>
                        <Flower2 className="w-4 h-4 text-orange-400" />
                      </div>

                      <h4 className="text-base font-devanagari font-bold text-amber-300">
                        {fest.nameHindi}
                      </h4>

                      <p className="text-xs font-serif text-[#f5eed9]/85 leading-relaxed">
                        {fest.significance}
                      </p>

                      <div className="p-2.5 rounded-xl bg-black/40 border border-orange-400/20 text-[11px] text-orange-200 font-mono">
                        🌿 <span className="font-bold">नियम:</span> {fest.fastingRule}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-orange-400/20 bg-[#080502] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-orange-300/80">
              <span>● ISKCON Global Devotee Network Connected • Hare Krishna Movement</span>
              <span>All Glories to Srila Prabhupada</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
