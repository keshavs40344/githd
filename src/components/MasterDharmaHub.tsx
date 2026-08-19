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
import AuthModal from './AuthModal';
import { getCurrentUser } from '@/lib/supabase';
import { sacredAudio } from '@/lib/sacredSounds';
import type { User } from '@supabase/supabase-js';
import { 
  Sparkles, BookOpen, Layers, Image as ImageIcon, Flame, 
  Compass, Grid, Search, BookMarked, Music, Bell, User as UserIcon, LogIn, ShieldCheck 
} from 'lucide-react';

export type DharmaAppView = 'scripture' | 'mentor' | 'episodes' | 'studio' | 'sadhana' | 'music';

interface MasterDharmaHubProps {
  verses: GitaVerse[];
  initialView?: DharmaAppView;
}

const NAV_TABS = [
  { id: 'scripture', emoji: '📖', label: 'Scripture',    sub: '700 Shlokas' },
  { id: 'mentor',    emoji: '🪔', label: 'Krishna AI',   sub: '7-Layer Mind' },
  { id: 'music',     emoji: '🎵', label: 'Sacred Music', sub: '20+ Playlists' },
  { id: 'episodes',  emoji: '📜', label: 'Episodes',     sub: '18 Chapters' },
  { id: 'studio',    emoji: '🎨', label: 'Art Studio',   sub: 'Sacred Visuals' },
  { id: 'sadhana',   emoji: '🔥', label: 'Sadhana',      sub: 'Daily Practice' },
];

export default function MasterDharmaHub({ verses, initialView = 'scripture' }: MasterDharmaHubProps) {
  const [activeView, setActiveView] = useState<DharmaAppView>(initialView);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Sync tab from URL hash if provided
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '') as DharmaAppView;
      if (['scripture', 'mentor', 'episodes', 'studio', 'sadhana', 'music'].includes(hash)) {
        setActiveView(hash);
      }
    }
  }, []);

  // Fetch current authenticated user
  useEffect(() => {
    getCurrentUser().then(u => setUser(u));
  }, []);

  const switchView = (view: DharmaAppView) => {
    setActiveView(view);
    sacredAudio.playNavChime(0.1);
    if (typeof window !== 'undefined') {
      window.location.hash = view;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBrandClick = () => {
    sacredAudio.playTempleBell(0.35);
    switchView('scripture');
  };

  const handleAuthClick = () => {
    sacredAudio.playNavChime(0.12);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-gold-100 flex flex-col relative overflow-x-hidden pb-20 md:pb-6">
      
      {/* Dynamic Adaptive Sacred Particle & Glow Background */}
      <WebGLShaderBackground />

      {/* ── Top Header ─────────────────────── */}
      <header className="sticky top-0 z-40 bg-obsidian-950/80 backdrop-blur-md border-b border-gold-500/15 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand */}
          <button 
            onClick={handleBrandClick}
            className="flex items-center gap-2.5 group cursor-pointer text-left shrink-0 touch-manipulation"
          >
            {/* Sacred OM Logo */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold-400 via-gold-500 to-amber-700 flex items-center justify-center text-obsidian-950 font-bold text-base sm:text-xl shadow-[0_0_15px_rgba(232,163,32,0.4)] group-hover:scale-105 transition-transform">
              ॐ
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-cinzel text-xs sm:text-sm font-bold gradient-text-gold tracking-[0.14em] uppercase">
                Dharma.OS
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-gold-400/50 font-sans font-medium hidden xs:inline mt-0.5">
                Spiritual Intelligence
              </span>
            </div>
          </button>

          {/* ── Desktop Tab Nav (Hidden on Mobile) ─────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1 bg-obsidian-900/80 border border-gold-500/15 p-1 rounded-2xl shadow-lg">
            {NAV_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => switchView(tab.id as DharmaAppView)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-sans font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 touch-manipulation ${
                  activeView === tab.id
                    ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 font-bold shadow-[0_0_14px_rgba(232,163,32,0.40)]'
                    : 'text-gold-300/60 hover:text-gold-100 hover:bg-obsidian-800'
                }`}
              >
                <span className="text-xs">{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* User Auth & XP Badge */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <DharmaKarmaBadge />

            {/* Auth / Profile Trigger Button */}
            <button
              onClick={handleAuthClick}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl border text-[11px] sm:text-xs font-sans font-semibold flex items-center gap-1.5 transition-all cursor-pointer touch-manipulation ${
                user
                  ? 'bg-gradient-to-r from-gold-500/20 to-amber-500/20 text-gold-200 border-gold-400/50 shadow-md'
                  : 'bg-obsidian-800 hover:bg-gold-500/20 text-gold-300 border-gold-500/25 hover:border-gold-400'
              }`}
              title={user ? `Logged in as ${user.email}` : 'साधक प्रवेश (Login)'}
            >
              {user ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-gold-400 to-amber-500 flex items-center justify-center text-obsidian-950 font-bold text-[9px] sm:text-[10px]">
                    {(user.user_metadata?.full_name || user.email || 'U')[0].toUpperCase()}
                  </div>
                  <span className="hidden sm:inline max-w-[70px] truncate">
                    {user.user_metadata?.full_name || 'साधक'}
                  </span>
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5 text-gold-400" />
                  <span>लॉगिन</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Dynamic View Body */}
      <main className="flex-1 z-10 relative">
        
        {/* VIEW 1: Scripture Explorer */}
        {activeView === 'scripture' && (
          <div className="animate-in fade-in duration-200">
            <ScriptureWorkspace verses={verses} />
          </div>
        )}

        {/* VIEW 2: Krishna AI 7-Layer Cognitive Mentor */}
        {activeView === 'mentor' && (
          <div className="py-4 sm:py-6 animate-in fade-in duration-200">
            <KrishnaAIMentor />
          </div>
        )}

        {/* VIEW 3: 20+ YouTube Sacred Music & Devotional Playlists */}
        {activeView === 'music' && (
          <div className="py-4 sm:py-6 animate-in fade-in duration-200">
            <SacredMusicHub />
          </div>
        )}

        {/* VIEW 4: 18 Episodes Quest & Raga Melodies */}
        {activeView === 'episodes' && (
          <div className="py-4 sm:py-6 animate-in fade-in duration-200">
            <EpisodeExplorer />
          </div>
        )}

        {/* VIEW 5: AI Sacred Krishna Art Studio */}
        {activeView === 'studio' && (
          <div className="py-4 sm:py-6 animate-in fade-in duration-200">
            <KrishnaImageStudio />
          </div>
        )}

        {/* VIEW 6: Daily Sadhana & Streak System */}
        {activeView === 'sadhana' && (
          <div className="max-w-3xl mx-auto p-3 sm:p-6 lg:p-8 py-6 sm:py-10 space-y-6 animate-in fade-in duration-200">
            <DailySadhanaWidget />
          </div>
        )}

      </main>

      {/* ── Mobile Native App Bottom Navigation Dock (Visible on Mobile/Tablets < 768px) ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-obsidian-950/95 backdrop-blur-xl border-t border-gold-500/20 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.7)] flex items-center justify-around safe-area-pb">
        {NAV_TABS.map((tab) => {
          const isActive = activeView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => switchView(tab.id as DharmaAppView)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all touch-manipulation min-w-[50px] ${
                isActive
                  ? 'text-gold-300 scale-105'
                  : 'text-gold-400/50 hover:text-gold-300'
              }`}
            >
              <span className={`text-base transition-transform ${isActive ? 'scale-115 animate-bounce' : 'opacity-70'}`}>
                {tab.emoji}
              </span>
              <span className={`text-[9px] font-sans font-medium tracking-tight mt-0.5 ${
                isActive ? 'text-gold-300 font-bold' : 'text-gold-400/60'
              }`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-gold-400 mt-0.5 shadow-[0_0_6px_rgba(232,163,32,0.9)]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Supabase Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(u) => setUser(u)}
      />

    </div>
  );
}
