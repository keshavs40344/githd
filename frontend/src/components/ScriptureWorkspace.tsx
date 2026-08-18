'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, Grid, BookOpen, Headphones, Search, BookMarked } from 'lucide-react';
import ChapterSelector from './ChapterSelector';
import ScriptureReader from './ScriptureReader';
import AudioController from './AudioController';
import MobileBottomSheet from './MobileBottomSheet';
import WordDeconstructorModal from './WordDeconstructorModal';
import GlobalVerseSearchModal from './GlobalVerseSearchModal';
import SavedVersesDrawer from './SavedVersesDrawer';
import GoldenParticles from './GoldenParticles';
import DailySadhanaWidget from './DailySadhanaWidget';
import { Button } from './ui/Button';

import { GitaVerse, AnvayaToken, CHAPTERS } from '@/types/verse';
import { useVerseNavigation } from '@/hooks/useVerseNavigation';
import Link from 'next/link';

export default function ScriptureWorkspace({ verses }: { verses: GitaVerse[] }) {
  const { 
    currentChapter, 
    currentVerse, 
    setChapter, 
    setVerse, 
    jumpTo,
    nextVerse, 
    prevVerse,
    currentVerseData,
    versesInCurrentChapter 
  } = useVerseNavigation(verses);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVersePickerOpen, setIsVersePickerOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<AnvayaToken | null>(null);
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  const activeVerse = currentVerseData || verses.find(v => v.chapter === currentChapter && v.verse === currentVerse) || verses[0];
  const currentChapterInfo = CHAPTERS.find(c => c.number === currentChapter) || CHAPTERS[0];
  const dailyVerse = verses.length > 0 ? verses[Math.floor(new Date().getDate() % verses.length)] : null;

  const updateSavedCount = () => {
    const saved = JSON.parse(localStorage.getItem('dharma_saved_verses') || '[]');
    setSavedCount(saved.length);
  };

  useEffect(() => {
    updateSavedCount();
    window.addEventListener('dharma_saved_verses_updated', updateSavedCount);
    return () => window.removeEventListener('dharma_saved_verses_updated', updateSavedCount);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-gold-100 selection:bg-gold-500/30 selection:text-gold-100 relative bg-obsidian-950">
      <GoldenParticles />
      
      {/* Top Glass Navigation */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-gold-500/15 bg-obsidian-950/75 backdrop-blur-xl sticky top-0 z-30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden p-2 rounded-xl text-gold-200 hover:text-gold-100 hover:bg-gold-400/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Chapter Selector"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center text-obsidian-950 font-bold text-lg shadow-[0_0_15px_rgba(223,168,55,0.4)] group-hover:scale-105 transition-transform">
              ॐ
            </span>
            <div className="flex flex-col">
              <span className="text-base font-bold bg-gradient-to-r from-gold-200 via-gold-400 to-amber-500 bg-clip-text text-transparent tracking-wide">
                Dharma.OS
              </span>
              <span className="text-[9px] uppercase tracking-widest text-gold-400/60 font-mono hidden sm:inline">
                Spiritual Intelligence Suite
              </span>
            </div>
          </Link>
        </div>
        
        {/* Center Chapter & Verse Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsVersePickerOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-obsidian-800/80 hover:bg-obsidian-700/80 border border-gold-500/20 hover:border-gold-400/50 text-xs sm:text-sm text-gold-200 font-medium transition-all shadow-inner"
          >
            <Grid className="w-3.5 h-3.5 text-gold-400" />
            <span>Ch {currentChapter} · V {currentVerse}</span>
            <span className="text-gold-500/40 text-xs">▾</span>
          </button>
        </div>

        {/* Right Action: Workspace tools + Krishna AI */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gold-300 hover:text-gold-100 hover:bg-gold-500/10 rounded-full transition-colors flex items-center gap-2"
              title="Search Verses (Cmd+K)"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden lg:inline text-xs border border-gold-500/30 px-1.5 rounded font-mono bg-obsidian-900">⌘K</span>
            </button>
            <button 
              onClick={() => setIsSavedOpen(true)}
              className="relative p-2 text-gold-300 hover:text-gold-100 hover:bg-gold-500/10 rounded-full transition-colors"
              title="Saved Verses"
            >
              <BookMarked className="w-4 h-4 sm:w-5 sm:h-5" />
              {savedCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-gold-500 text-obsidian-950 text-[9px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>
          </div>
          <Link href="/episodes">
            <Button variant="secondary" size="sm" className="gap-1.5 rounded-full px-3 text-xs font-mono border-gold-500/30 hover:border-gold-400 hover:text-gold-100">
              <span className="hidden md:inline">18 Episodes</span>
              <span className="md:hidden">Episodes</span>
            </Button>
          </Link>
          <Link href="/mentor">
            <Button variant="primary" size="sm" className="gap-2 rounded-full px-4 text-xs font-semibold shadow-[0_0_20px_rgba(223,168,55,0.35)] hover:scale-105 transition-all">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Krishna AI</span>
              <span className="sm:hidden">AI</span>
            </Button>
          </Link>
        </div>

      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative z-10">
        {/* Left Sidebar - Desktop Chapter Selector */}
        <aside className="hidden md:block w-72 lg:w-80 border-r border-gold-500/15 bg-obsidian-950/60 backdrop-blur-xl overflow-y-auto z-10 flex-shrink-0">
          <ChapterSelector currentChapter={currentChapter} onSelectChapter={setChapter} />
        </aside>

        {/* Mobile Bottom Sheet for Chapters */}
        <MobileBottomSheet isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} title="Bhagavad Gita Chapters">
          <ChapterSelector 
            currentChapter={currentChapter} 
            onSelectChapter={(c) => {
              setChapter(c);
              setIsMobileMenuOpen(false);
            }} 
          />
        </MobileBottomSheet>

        {/* Mobile Bottom Sheet for All Verses Picker */}
        <MobileBottomSheet isOpen={isVersePickerOpen} onClose={() => setIsVersePickerOpen(false)} title={`Chapter ${currentChapter} — All Verses`}>
          <div className="p-4 space-y-4">
            <div className="text-xs text-gold-400 font-mono">
              {currentChapterInfo.name_sanskrit} ({currentChapterInfo.name_en})
            </div>
            
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 max-h-80 overflow-y-auto p-1 custom-scrollbar">
              {Array.from({ length: currentChapterInfo.verse_count }, (_, i) => i + 1).map(vNum => {
                const isLoaded = verses.some(v => v.chapter === currentChapter && v.verse === vNum);
                const isCurrent = currentVerse === vNum;
                return (
                  <button
                    key={vNum}
                    onClick={() => {
                      setVerse(vNum);
                      setIsVersePickerOpen(false);
                    }}
                    className={`h-10 rounded-xl text-xs font-mono font-medium flex items-center justify-center transition-all cursor-pointer border ${
                      isCurrent
                        ? 'bg-gold-400 text-obsidian-950 border-gold-300 font-bold shadow-[0_0_12px_rgba(223,168,55,0.5)]'
                        : isLoaded
                        ? 'bg-gold-500/15 border-gold-500/30 text-gold-100 hover:bg-gold-500/25'
                        : 'bg-obsidian-800/40 border-obsidian-700/50 text-obsidian-400 hover:text-gold-200 hover:border-gold-500/20'
                    }`}
                  >
                    {vNum}
                  </button>
                );
              })}
            </div>
          </div>
        </MobileBottomSheet>

        {/* Center Scripture Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 flex flex-col items-center pb-36 lg:pb-12 z-10 custom-scrollbar">
          
          {/* Daily Contemplation Banner */}
          {dailyVerse && (
            <div className="w-full max-w-3xl mb-6 bg-gradient-to-r from-obsidian-900 to-obsidian-800 border border-gold-500/20 rounded-2xl p-4 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/30 text-gold-400">
                  <BookOpen size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-mono text-gold-400 tracking-widest uppercase mb-1">Daily Contemplation</h3>
                  <p className="text-sm text-gold-100 line-clamp-1">Chapter {dailyVerse.chapter}, Verse {dailyVerse.verse}</p>
                </div>
              </div>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => jumpTo(dailyVerse.chapter, dailyVerse.verse)}
                className="text-xs"
              >
                Contemplate
              </Button>
            </div>
          )}

          <div className="w-full max-w-3xl space-y-6">
            <DailySadhanaWidget />
            
            <ScriptureReader 
              verse={activeVerse} 
              onWordClick={(token) => setSelectedToken(token)}
              onNext={nextVerse}
              onPrev={prevVerse}
            />
          </div>
        </main>


        {/* Right Panel - Desktop Audio & Quick Info */}
        <aside className="hidden lg:flex flex-col w-80 border-l border-gold-500/15 bg-obsidian-950/60 backdrop-blur-xl p-6 z-10 space-y-6 flex-shrink-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold">
              <Headphones className="w-4 h-4" />
              <span>Vedic Audio Chanting</span>
            </div>
            <p className="text-xs text-obsidian-400">
              Listen to authentic metric Sanskrit recitation with speed modulation.
            </p>
          </div>

          <AudioController 
            chapter={currentChapter} 
            verse={currentVerse} 
            sanskritVerse={activeVerse?.devanagari || ''} 
          />

          {/* Quick Context Card */}
          <div className="p-5 rounded-2xl bg-obsidian-900/60 border border-gold-500/15 space-y-3">
            <div className="text-xs text-gold-400 font-mono uppercase tracking-wider">
              Chapter Context
            </div>
            <h4 className="text-sm font-semibold text-gold-100 font-devanagari">
              {currentChapterInfo.name_sanskrit}
            </h4>
            <p className="text-xs text-gold-300/70 leading-relaxed font-sans">
              {currentChapterInfo.name_en} — Containing {currentChapterInfo.verse_count} sacred verses on self-mastery, yoga, and consciousness.
            </p>
          </div>
        </aside>
        
        {/* Mobile Floating Bottom Audio Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 sm:p-4 bg-obsidian-950/90 backdrop-blur-2xl border-t border-gold-500/20 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
          <div className="max-w-md mx-auto">
            <AudioController 
              chapter={currentChapter} 
              verse={currentVerse} 
              sanskritVerse={activeVerse?.devanagari || ''} 
            />
          </div>
        </div>
      </div>

      {/* Word Anvaya Deconstructor Modal */}
      <WordDeconstructorModal 
        token={selectedToken} 
        isOpen={!!selectedToken} 
        onClose={() => setSelectedToken(null)} 
      />

      {/* Global Modals & Drawers */}
      <GlobalVerseSearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectVerse={jumpTo}
        verses={verses}
      />

      <SavedVersesDrawer
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        onSelectVerse={jumpTo}
        verses={verses}
      />
    </div>
  );
}
