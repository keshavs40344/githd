'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, Search, Play, Pause, Volume2, ArrowRight, 
  Flame, HeartHandshake, ShieldCheck, Check, BookOpen, 
  ChevronRight, Compass, MessageSquare
} from 'lucide-react';
import { HUNDRED_LIFE_DILEMMAS, LifeDilemmaItem } from '@/data/hundredLifeDilemmas';
import { getMasterTimestampForVerse } from '@/data/gitaMasterAudioTimestamps';
import { getChapterTheme } from '@/data/chapterThemes';
import { sacredAudio } from '@/lib/sacredSounds';
import { useGlobalAudio } from '@/context/GlobalAudioContext';

const CATEGORY_FILTERS = [
  { id: 'all', label: 'सभी १०८ समस्याएं' },
  { id: 'mental', label: '🌧️ मानसिक शांति व चिंता' },
  { id: 'career', label: '🎯 करियर व असफलता' },
  { id: 'relationship', label: '💔 रिश्ते व विछोह' },
  { id: 'anger', label: '🔥 क्रोध व ईर्ष्या' },
  { id: 'duty', label: '🧭 कर्तव्य असमंजस' },
  { id: 'spiritual', label: '🪔 आत्म-साक्षात्कार' },
];

export default function HundredDilemmaSanctuary() {
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = useGlobalAudio();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDilemma, setActiveDilemma] = useState<LifeDilemmaItem | null>(HUNDRED_LIFE_DILEMMAS[0]);

  const filteredDilemmas = HUNDRED_LIFE_DILEMMAS.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.problem.toLowerCase().includes(q) ||
      item.problemSummary.toLowerCase().includes(q) ||
      item.krishnaCounsel.toLowerCase().includes(q) ||
      item.shlokaSnippet.toLowerCase().includes(q)
    );
  });

  return (
    <div className="rounded-3xl bg-gradient-to-b from-[#141624]/95 via-[#0d0f19]/95 to-[#090a12]/95 backdrop-blur-2xl border-2 border-amber-400/40 p-5 sm:p-8 shadow-2xl space-y-6">
      
      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-xs font-serif text-yellow-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>१०८ सांसारिक समस्याएं • श्रीकृष्ण का प्रत्यक्ष समाधान</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-devanagari font-bold text-[#f5eed9] leading-tight">
          जीवन की हर समस्या का <span className="text-amber-400">गीता अमृत समाधान</span>
        </h2>

        <p className="text-xs sm:text-sm text-[#f5eed9]/80 font-serif leading-relaxed">
          आप जिस भी मानसिक, पारिवारिक, करियर या आत्मिक उलझन में हैं — नीचे अपनी समस्या चुनें और भगवान श्रीकृष्ण का सीधा मार्गदर्शन प्राप्त करें।
        </p>
      </div>

      {/* ── SEARCH & CATEGORY FILTER ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#090b14]/90 p-3 sm:p-4 rounded-2xl border border-[#c5a059]/25">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#c5a059]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="अपनी समस्या का नाम लिखें (उदा. चिंता, असफलता)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#141624] border border-[#c5a059]/30 text-xs font-serif text-[#f5eed9] placeholder-[#c5a059]/40 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 custom-scrollbar">
          {CATEGORY_FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => {
                setSelectedCategory(f.id);
                sacredAudio.playNavChime(0.04);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-serif shrink-0 transition-all cursor-pointer border ${
                selectedCategory === f.id
                  ? 'bg-amber-400 text-black font-bold shadow-md'
                  : 'bg-[#141624] text-[#c5a059]/70 hover:text-white border-[#c5a059]/20'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

      </div>

      {/* ── TWO-COLUMN INTERACTIVE MATRIX ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Problem List (Scrollable) */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
          {filteredDilemmas.map(item => {
            const isSelected = activeDilemma?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setActiveDilemma(item);
                  sacredAudio.playNavChime(0.06);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500/25 to-[#141624] border-amber-400 shadow-lg scale-101'
                    : 'bg-[#141624]/90 border-[#c5a059]/15 hover:border-amber-400/50 hover:bg-[#1a1e33]'
                }`}
              >
                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] font-mono text-amber-300 block">
                    {item.categoryLabel}
                  </span>
                  <p className="text-xs font-devanagari font-bold text-[#f5eed9] truncate">
                    {item.problem}
                  </p>
                  <p className="text-[11px] text-[#c5a059]/70 font-serif truncate">
                    {item.problemSummary}
                  </p>
                </div>

                <div className="shrink-0">
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-amber-400 translate-x-1' : 'text-[#c5a059]/40'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Divine Solution Altar */}
        <div className="lg:col-span-7">
          {activeDilemma ? (
            <div className="rounded-3xl bg-[#090b14]/95 border-2 border-amber-400/40 p-5 sm:p-7 shadow-xl space-y-5 animate-fade-in">
              
              {/* Problem Title & Category */}
              <div className="space-y-1 border-b border-[#c5a059]/20 pb-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold inline-block">
                  {activeDilemma.categoryLabel}
                </span>
                <h3 className="text-lg sm:text-xl font-devanagari font-bold text-[#f5eed9] mt-2">
                  {activeDilemma.problem}
                </h3>
              </div>

              {/* Krishna's Direct Counsel */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#141624] to-amber-500/15 border border-amber-400/30 space-y-2">
                <span className="text-xs font-serif font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>श्रीकृष्ण का प्रत्यक्ष दिव्य संदेश:</span>
                </span>
                <p className="text-xs sm:text-sm text-[#f5eed9] font-serif leading-relaxed italic">
                  "{activeDilemma.krishnaCounsel}"
                </p>
              </div>

              {/* Prescribed Shloka Card with Live Audio Chanting */}
              <div className="p-4 rounded-2xl bg-[#141624] border border-[#c5a059]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-400 text-black text-xs font-mono font-bold">
                      अध्याय {activeDilemma.prescribedChapter}.{activeDilemma.prescribedVerse}
                    </span>
                    <span className="text-xs font-devanagari font-bold text-yellow-300 truncate">
                      {activeDilemma.shlokaSnippet}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#c5a059]/70 font-sans block">
                    इस परिस्थिति के लिए निर्धारित शास्त्रसम्मत श्लोक
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      playTrack(
                        activeDilemma.prescribedChapter, 
                        activeDilemma.prescribedVerse, 
                        activeDilemma.shlokaSnippet, 
                        activeDilemma.problem
                      );
                      sacredAudio.playNavChime(0.08);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>स्वर सुनें</span>
                  </button>

                  <Link
                    href={`/chapter/${activeDilemma.prescribedChapter}/${activeDilemma.prescribedVerse}`}
                    onClick={() => sacredAudio.playTempleBell(0.2)}
                    className="px-3 py-1.5 rounded-xl bg-[#090b14] hover:bg-[#181b2e] border border-[#c5a059]/30 text-xs font-serif text-[#e6c687] hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <span>सम्पूर्ण पाठ</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* 3 Practical Actionable Remedies */}
              <div className="space-y-2">
                <span className="text-xs font-serif font-bold text-[#e6c687] block">
                  दैनिक जीवन में ३ तत्काल समाधान (Actionable Remedies):
                </span>

                <div className="space-y-1.5">
                  {activeDilemma.remedySteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#141624]/60 border border-[#c5a059]/15 text-xs text-[#f5eed9]/90 font-serif">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-8 rounded-3xl bg-[#090b14]/50 border border-[#c5a059]/20 text-center text-xs font-serif text-[#c5a059]">
              बाईं ओर से कोई भी समस्या चुनें।
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
