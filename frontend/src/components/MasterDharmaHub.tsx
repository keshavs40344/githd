'use client';

import React, { useState, useEffect } from 'react';
import type { GitaVerse } from '@/types/verse';
import KrishnaAIMentor from './KrishnaAIMentor';
import EpisodeExplorer from './EpisodeExplorer';
import ScriptureWorkspace from './ScriptureWorkspace';
import KrishnaImageStudio from './KrishnaImageStudio';
import DailySadhanaWidget from './DailySadhanaWidget';
import SacredMusicHub from './SacredMusicHub';
import WebGLShaderBackground from './WebGLShaderBackground';
import DharmaKarmaBadge from './DharmaKarmaBadge';
import { sacredAudio } from '@/lib/sacredSounds';
import { 
  Sparkles, BookOpen, Layers, Image as ImageIcon, Flame, 
  Compass, Grid, Search, BookMarked, Music, Bell 
} from 'lucide-react';

export type DharmaAppView = 'scripture' | 'mentor' | 'episodes' | 'studio' | 'sadhana' | 'music';

interface MasterDharmaHubProps {
  verses: GitaVerse[];
  initialView?: DharmaAppView;
}

export default function MasterDharmaHub({ verses, initialView = 'scripture' }: MasterDharmaHubProps) {
  const [activeView, setActiveView] = useState<DharmaAppView>(initialView);

  // Sync tab from URL hash if provided
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '') as DharmaAppView;
      if (['scripture', 'mentor', 'episodes', 'studio', 'sadhana', 'music'].includes(hash)) {
        setActiveView(hash);
      }
    }
  }, []);

  const switchView = (view: DharmaAppView) => {
    setActiveView(view);
    sacredAudio.playNavChime();
    if (typeof window !== 'undefined') {
      window.location.hash = view;
    }
  };

  const handleBrandClick = () => {
    sacredAudio.playTempleBell(0.35);
    switchView('scripture');
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-gold-100 flex flex-col relative overflow-x-hidden">
      
      {/* Dynamic Sacred WebGL Particle Canvas */}
      <WebGLShaderBackground />

      {/* ── Enterprise Top Nav ─────────────────────── */}
      <header className="sticky top-0 z-40 glass-dark border-b border-gold-500/15 px-4 sm:px-8 py-3 shadow-[0_4px_32px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand */}
          <button 
            onClick={handleBrandClick}
            className="flex items-center gap-3 group cursor-pointer text-left shrink-0"
          >

            {/* Sacred OM Logo */}
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold-400 via-gold-500 to-amber-700 flex items-center justify-center text-obsidian-950 font-bold text-xl shadow-[0_0_20px_rgba(232,163,32,0.45)] group-hover:scale-105 transition-transform sacred-pulse">
              ॐ
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-cinzel text-sm font-bold gradient-text-gold tracking-[0.14em] uppercase">
                Dharma.OS
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-gold-400/50 font-sans font-medium hidden sm:inline mt-0.5">
                Spiritual Intelligence Platform
              </span>
            </div>
          </button>

          {/* ── Tab Nav ─────────────────────────────── */}
          <nav className="flex items-center gap-1 bg-obsidian-900/70 border border-gold-500/15 p-1 rounded-2xl shadow-lg overflow-x-auto shrink">
            {[
              { id: 'scripture', emoji: '📖', label: 'Scripture',    sub: '700 Shlokas' },
              { id: 'mentor',    emoji: '🪔', label: 'Krishna AI',   sub: '7-Layer Mind' },
              { id: 'music',     emoji: '🎵', label: 'Sacred Music', sub: '20+ Playlists' },
              { id: 'episodes',  emoji: '📜', label: 'Episodes',     sub: '18 Chapters' },
              { id: 'studio',    emoji: '🎨', label: 'Art Studio',   sub: 'Sacred Visuals' },
              { id: 'sadhana',   emoji: '🔥', label: 'Sadhana',      sub: 'Daily Practice' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => switchView(tab.id as DharmaAppView)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-sans font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeView === tab.id
                    ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 font-bold shadow-[0_0_16px_rgba(232,163,32,0.40)]'
                    : 'text-gold-300/60 hover:text-gold-100 hover:bg-obsidian-700/60'
                }`}
              >
                <span className="text-sm">{tab.emoji}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* XP Badge */}
          <div className="flex items-center gap-2 shrink-0">
            <DharmaKarmaBadge />
          </div>
        </div>
      </header>


      {/* Dynamic View Body */}
      <main className="flex-1 z-10 relative">
        
        {/* VIEW 1: Scripture Explorer */}
        {activeView === 'scripture' && (
          <div className="animate-in fade-in duration-300">
            <ScriptureWorkspace verses={verses} />
          </div>
        )}

        {/* VIEW 2: Krishna AI 7-Layer Cognitive Mentor */}
        {activeView === 'mentor' && (
          <div className="py-6 animate-in fade-in duration-300">
            <KrishnaAIMentor />
          </div>
        )}

        {/* VIEW 3: 20+ YouTube Sacred Music & Devotional Playlists */}
        {activeView === 'music' && (
          <div className="py-6 animate-in fade-in duration-300">
            <SacredMusicHub />
          </div>
        )}

        {/* VIEW 4: 18 Episodes Quest & Raga Melodies */}
        {activeView === 'episodes' && (
          <div className="py-6 animate-in fade-in duration-300">
            <EpisodeExplorer />
          </div>
        )}

        {/* VIEW 5: AI Sacred Krishna Art Studio */}
        {activeView === 'studio' && (
          <div className="py-6 animate-in fade-in duration-300">
            <KrishnaImageStudio />
          </div>
        )}

        {/* VIEW 6: Daily Sadhana & Streak System */}
        {activeView === 'sadhana' && (
          <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 py-10 space-y-6 animate-in fade-in duration-300">
            <DailySadhanaWidget />
          </div>
        )}

      </main>

    </div>
  );
}

