'use client';

import React, { useState, useEffect } from 'react';
import type { GitaVerse } from '@/types/verse';
import KrishnaAIMentor from './KrishnaAIMentor';
import EpisodeExplorer from './EpisodeExplorer';
import ScriptureWorkspace from './ScriptureWorkspace';
import KrishnaImageStudio from './KrishnaImageStudio';
import DailySadhanaWidget from './DailySadhanaWidget';
import WebGLShaderBackground from './WebGLShaderBackground';
import DharmaKarmaBadge from './DharmaKarmaBadge';
import { 
  Sparkles, BookOpen, Layers, Image as ImageIcon, Flame, 
  Compass, Grid, Search, BookMarked, Music 
} from 'lucide-react';

export type DharmaAppView = 'scripture' | 'mentor' | 'episodes' | 'studio' | 'sadhana';

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
      if (['scripture', 'mentor', 'episodes', 'studio', 'sadhana'].includes(hash)) {
        setActiveView(hash);
      }
    }
  }, []);

  const switchView = (view: DharmaAppView) => {
    setActiveView(view);
    if (typeof window !== 'undefined') {
      window.location.hash = view;
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-gold-100 flex flex-col relative overflow-x-hidden selection:bg-gold-500 selection:text-obsidian-950">
      
      {/* Dynamic Sacred WebGL Particle Canvas */}
      <WebGLShaderBackground />

      {/* Master Top Navigation / Command Bar */}
      <header className="sticky top-0 z-40 bg-obsidian-950/85 backdrop-blur-2xl border-b border-gold-500/20 px-3 sm:px-6 py-3 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => switchView('scripture')}
              className="flex items-center gap-2.5 group cursor-pointer text-left"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-gold-400 via-amber-500 to-amber-700 flex items-center justify-center text-obsidian-950 font-bold text-lg shadow-[0_0_20px_rgba(223,168,55,0.4)] group-hover:scale-105 transition-transform">
                ॐ
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold bg-gradient-to-r from-gold-200 via-gold-400 to-amber-500 bg-clip-text text-transparent tracking-wide font-mono">
                  DHARMA.OS
                </span>
                <span className="text-[9px] uppercase tracking-widest text-gold-400/60 font-mono hidden sm:inline">
                  All-in-One Spiritual Intelligence
                </span>
              </div>
            </button>
          </div>

          {/* Master View Switcher Tabs */}
          <nav className="flex items-center bg-obsidian-900/90 border border-gold-500/25 p-1 rounded-2xl shadow-xl overflow-x-auto custom-scrollbar">
            {[
              { id: 'scripture', label: '📖 700 Shlokas', desc: 'Scripture Explorer' },
              { id: 'mentor', label: '🪔 Krishna AI', desc: '7-Layer Cognitive Guidance' },
              { id: 'episodes', label: '📜 18 Episodes', desc: 'Leela Quest & Tunes' },
              { id: 'studio', label: '🎨 AI Art Studio', desc: 'Wallpapers & Cards' },
              { id: 'sadhana', label: '🔥 Daily Sadhana', desc: 'Streak & Reflection' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => switchView(tab.id as DharmaAppView)}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                  activeView === tab.id
                    ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 font-bold shadow-[0_0_15px_rgba(223,168,55,0.35)]'
                    : 'text-gold-300/70 hover:text-gold-100 hover:bg-obsidian-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Dharma Karma XP Badge */}
          <div className="flex items-center gap-2">
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

        {/* VIEW 3: 18 Episodes Quest & Raga Melodies */}
        {activeView === 'episodes' && (
          <div className="py-6 animate-in fade-in duration-300">
            <EpisodeExplorer />
          </div>
        )}

        {/* VIEW 4: AI Sacred Krishna Art Studio */}
        {activeView === 'studio' && (
          <div className="py-6 animate-in fade-in duration-300">
            <KrishnaImageStudio />
          </div>
        )}

        {/* VIEW 5: Daily Sadhana & Streak System */}
        {activeView === 'sadhana' && (
          <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 py-10 space-y-6 animate-in fade-in duration-300">
            <DailySadhanaWidget />
          </div>
        )}

      </main>

    </div>
  );
}
