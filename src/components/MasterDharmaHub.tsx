'use client';

import React, { useState } from 'react';
import ChapterEpisodeGrid from '@/components/ChapterEpisodeGrid';
import EmotionalSanctuary from '@/components/EmotionalSanctuary';
import SacredJapaMala from '@/components/SacredJapaMala';
import KrishnaAIMentor from '@/components/KrishnaAIMentor';
import { BookOpen, Heart, Sparkles, MessageSquare } from 'lucide-react';
import { sacredAudio } from '@/lib/sacredSounds';
import type { GitaVerse } from '@/types/verse';

interface MasterDharmaHubProps {
  verses?: GitaVerse[];
}

export default function MasterDharmaHub({ verses }: MasterDharmaHubProps) {
  const [activeHubTab, setActiveHubTab] = useState<'scripture' | 'healer' | 'sadhana' | 'mentor'>('scripture');

  return (
    <div className="min-h-screen bg-[#090a0f] text-[#f5eed9]">
      
      {/* ── TOP LUXURY NAVIGATION HEADER ───────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#090b14]/90 backdrop-blur-xl border-b border-[#c5a059]/25 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* Logo Emblem */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-[#c5a059] to-amber-600 p-0.5 shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#0a0c16] rounded-2xl flex items-center justify-center">
                <span className="font-devanagari text-xl font-bold text-amber-300">ॐ</span>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-devanagari font-bold text-[#f5eed9] leading-none">
                DHARMA.OS
              </h1>
              <span className="text-[10px] font-mono text-[#c5a059] tracking-wider uppercase">
                श्रीमद्भगवद्गीता महामंदिर
              </span>
            </div>
          </div>

          {/* 4 Core Human Sanctum Hub Tabs */}
          <div className="flex items-center bg-[#141624] border border-[#c5a059]/30 p-1 rounded-2xl overflow-x-auto max-w-full custom-scrollbar">
            <button
              onClick={() => { setActiveHubTab('scripture'); sacredAudio.playNavChime(0.05); }}
              className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-serif transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeHubTab === 'scripture'
                  ? 'bg-[#c5a059] text-black font-bold shadow-md'
                  : 'text-[#c5a059]/70 hover:text-[#f5eed9]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>१८ अध्याय व श्लोक</span>
            </button>

            <button
              onClick={() => { setActiveHubTab('healer'); sacredAudio.playNavChime(0.05); }}
              className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-serif transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeHubTab === 'healer'
                  ? 'bg-[#c5a059] text-black font-bold shadow-md'
                  : 'text-[#c5a059]/70 hover:text-[#f5eed9]'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span>मानसिक शांति व हीलर</span>
            </button>

            <button
              onClick={() => { setActiveHubTab('sadhana'); sacredAudio.playNavChime(0.05); }}
              className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-serif transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeHubTab === 'sadhana'
                  ? 'bg-[#c5a059] text-black font-bold shadow-md'
                  : 'text-[#c5a059]/70 hover:text-[#f5eed9]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>१०८ जप माला</span>
            </button>

            <button
              onClick={() => { setActiveHubTab('mentor'); sacredAudio.playNavChime(0.05); }}
              className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-serif transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                activeHubTab === 'mentor'
                  ? 'bg-[#c5a059] text-black font-bold shadow-md'
                  : 'text-[#c5a059]/70 hover:text-[#f5eed9]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-cyan-300" />
              <span>कृष्ण AI मेंटर</span>
            </button>
          </div>

        </div>
      </header>

      {/* ── MAIN CONTENT VIEWPORT ──────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 pb-32">
        {activeHubTab === 'scripture' && (
          <div className="space-y-10">
            <ChapterEpisodeGrid />
            <EmotionalSanctuary />
            <SacredJapaMala />
          </div>
        )}

        {activeHubTab === 'healer' && (
          <div className="space-y-8 animate-fade-in">
            <EmotionalSanctuary />
            <ChapterEpisodeGrid />
          </div>
        )}

        {activeHubTab === 'sadhana' && (
          <div className="space-y-8 animate-fade-in">
            <SacredJapaMala />
            <EmotionalSanctuary />
          </div>
        )}

        {activeHubTab === 'mentor' && (
          <div className="space-y-8 animate-fade-in">
            <KrishnaAIMentor />
          </div>
        )}
      </main>

    </div>
  );
}
