'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Menu, Grid, BookOpen, Headphones, Search, BookMarked, 
  ChevronRight, ChevronLeft, Maximize2, Minimize2, Flame, Award, CheckCircle2 
} from 'lucide-react';
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
import { sacredAudio } from '@/lib/sacredSounds';

import { GitaVerse, AnvayaToken, CHAPTERS } from '@/types/verse';
import { useVerseNavigation } from '@/hooks/useVerseNavigation';
import Link from 'next/link';

export default function ScriptureWorkspace({ verses: initialVerses }: { verses: GitaVerse[] }) {
  const [allVerses, setAllVerses] = useState<GitaVerse[]>(initialVerses);
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
  } = useVerseNavigation(allVerses);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVersePickerOpen, setIsVersePickerOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<AnvayaToken | null>(null);
  const [isLoadingVerse, setIsLoadingVerse] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  const pillStripRef = useRef<HTMLDivElement | null>(null);

  // If active verse is not loaded, fetch dynamically
  useEffect(() => {
    const exists = allVerses.some(v => v.chapter === currentChapter && v.verse === currentVerse);
    if (!exists) {
      setIsLoadingVerse(true);
      fetch(`/api/v1/shloka?chapter=${currentChapter}&verse=${currentVerse}`)
        .then(res => res.json())
        .then(res => {
          if (res.success && res.data) {
            const newVerse: GitaVerse = {
              chapter: currentChapter,
              verse: currentVerse,
              devanagari: res.data.devanagari,
              iast: res.data.iast,
              translation_hi: res.data.translation_hi,
              translation_en: res.data.translation_en,
              practical_insight: res.data.practical_insight,
              anvaya_tokens: res.data.anvaya_tokens || []
            };
            setAllVerses(prev => [...prev, newVerse]);
          }
        })
        .catch(err => console.warn('Dynamic verse fetch error:', err))
        .finally(() => setIsLoadingVerse(false));
    }
  }, [currentChapter, currentVerse, allVerses]);

  // Scroll active verse pill into view smoothly
  useEffect(() => {
    if (pillStripRef.current) {
      const activeBtn = pillStripRef.current.querySelector(`[data-verse-num="${currentVerse}"]`);
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [currentVerse, currentChapter]);

  const activeVerse = currentVerseData || allVerses.find(v => v.chapter === currentChapter && v.verse === currentVerse) || allVerses[0];
  const currentChapterInfo = CHAPTERS.find(c => c.number === currentChapter) || CHAPTERS[0];
  const dailyVerse = allVerses.length > 0 ? allVerses[Math.floor(new Date().getDate() % allVerses.length)] : null;

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

  const progressPercentage = Math.round((currentVerse / currentChapterInfo.verse_count) * 100);

  return (
    <div className="min-h-screen flex flex-col text-gold-100 selection:bg-gold-500/30 selection:text-gold-100 relative bg-transparent">
      
      {/* ── WORKSPACE SUB-BAR (Chapter Selector, Search, Bookmarks) ─────────────────────── */}
      <div className="flex items-center justify-between px-3 sm:px-6 lg:px-8 py-2 border-b border-gold-500/15 bg-obsidian-900/90 backdrop-blur-md sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2">
          <button 
            className="md:hidden p-2 rounded-xl text-gold-200 hover:text-gold-100 hover:bg-gold-400/10 transition-colors cursor-pointer touch-manipulation"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Chapter Selector"
          >
            <Menu className="w-5 h-5 text-gold-400" />
          </button>
          
          {/* Chapter & Verse Quick Dropdown Switcher */}
          <button
            onClick={() => setIsVersePickerOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 border border-gold-500/30 text-xs sm:text-sm text-gold-200 font-medium transition-all shadow-inner touch-manipulation"
          >
            <Grid className="w-3.5 h-3.5 text-gold-400" />
            <span className="font-mono">अध्याय {currentChapter} · श्लोक {currentVerse}</span>
            <span className="text-gold-500/50 text-[10px]">▾</span>
          </button>
        </div>

        {/* Right Action: Workspace tools + Focus Mode */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              setIsFocusMode(!isFocusMode);
              sacredAudio.playNavChime(0.1);
            }}
            className={`p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer hidden md:flex items-center gap-1.5 text-xs font-sans touch-manipulation ${
              isFocusMode
                ? 'bg-gold-500/20 text-gold-300 border-gold-400'
                : 'bg-obsidian-800/80 text-gold-300/70 border-gold-500/20 hover:border-gold-400'
            }`}
            title="Toggle Zen Focus Mode"
          >
            {isFocusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden lg:inline">{isFocusMode ? 'सामान्य दृश्य' : 'ध्यान दृश्य'}</span>
          </button>

          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-gold-300 hover:text-gold-100 hover:bg-gold-500/10 rounded-xl transition-colors flex items-center gap-1 cursor-pointer touch-manipulation"
            title="Search Verses (Cmd+K)"
          >
            <Search className="w-4 h-4 text-gold-400" />
            <span className="hidden lg:inline text-[10px] border border-gold-500/30 px-1.5 rounded font-mono bg-obsidian-950">⌘K</span>
          </button>

          <button 
            onClick={() => setIsSavedOpen(true)}
            className="relative p-2 text-gold-300 hover:text-gold-100 hover:bg-gold-500/10 rounded-xl transition-colors cursor-pointer touch-manipulation"
            title="Saved Verses"
          >
            <BookMarked className="w-4 h-4 text-gold-400" />
            {savedCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-gold-500 text-obsidian-950 text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {savedCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* ── STICKY FAST HORIZONTAL SHLOKA CAROUSEL STRIP ───────────── */}
      <div className="bg-obsidian-950/95 border-b border-gold-500/15 px-3 sm:px-6 lg:px-8 py-2 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-2">

          
          <span className="text-[11px] font-mono text-gold-400 font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
            <span>श्लोक:</span>
          </span>

          <div 
            ref={pillStripRef}
            className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 pt-0.5 flex-1 scroll-smooth"
          >
            {Array.from({ length: currentChapterInfo.verse_count }, (_, idx) => idx + 1).map(vNum => {
              const isCurrent = currentVerse === vNum;
              const isLoaded = allVerses.some(v => v.chapter === currentChapter && v.verse === vNum);
              return (
                <button
                  key={vNum}
                  data-verse-num={vNum}
                  onClick={() => {
                    setVerse(vNum);
                    sacredAudio.playNavChime(0.08);
                  }}
                  className={`h-7 min-w-[32px] px-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shrink-0 flex items-center justify-center border ${
                    isCurrent
                      ? 'bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 text-obsidian-950 border-gold-300 shadow-[0_0_12px_rgba(232,163,32,0.6)] scale-110'
                      : isLoaded
                      ? 'bg-gold-500/15 border-gold-500/30 text-gold-200 hover:bg-gold-500/25 hover:border-gold-400/60'
                      : 'bg-obsidian-850/80 border-gold-500/10 text-gold-400/50 hover:text-gold-200 hover:border-gold-500/25'
                  }`}
                >
                  {vNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setIsVersePickerOpen(true)}
            className="p-1 rounded-lg text-gold-400 hover:text-gold-200 bg-obsidian-900 border border-gold-500/20 text-xs shrink-0"
            title="All Verses Grid"
          >
            <Grid className="w-3.5 h-3.5" />
          </button>

        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative z-10">
        
        {/* Left Sidebar - Desktop Chapter Selector (Hidden in Focus Mode) */}
        {!isFocusMode && (
          <aside className="hidden md:block w-72 lg:w-80 border-r border-gold-500/15 bg-obsidian-950/60 backdrop-blur-xl overflow-y-auto z-10 flex-shrink-0">
            <ChapterSelector currentChapter={currentChapter} onSelectChapter={setChapter} />
          </aside>
        )}

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

        {/* Mobile Bottom Sheet for All Verses Picker Grid */}
        <MobileBottomSheet isOpen={isVersePickerOpen} onClose={() => setIsVersePickerOpen(false)} title={`अध्याय ${currentChapter} — सम्पूर्ण श्लोक सूची`}>
          <div className="p-4 space-y-4">
            <div className="text-xs text-gold-400 font-mono">
              {currentChapterInfo.name_sanskrit} ({currentChapterInfo.name_en})
            </div>
            
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 max-h-80 overflow-y-auto p-1 custom-scrollbar">
              {Array.from({ length: currentChapterInfo.verse_count }, (_, i) => i + 1).map(vNum => {
                const isLoaded = allVerses.some(v => v.chapter === currentChapter && v.verse === vNum);
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
          
          {/* Chapter Overview Header Banner */}
          <div className="w-full max-w-4xl mb-6 bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-amber-950/30 border border-gold-500/25 rounded-3xl p-5 sm:p-6 shadow-xl space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 border border-gold-400/30 text-[10px] font-mono text-gold-300 font-bold uppercase">
                    अध्याय {currentChapter}
                  </span>
                  <span className="text-xs font-mono text-gold-400/80">
                    {currentChapterInfo.verse_count} Shlokas Total
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold font-devanagari text-gold-100">
                  {currentChapterInfo.name_sanskrit}
                </h2>
                <p className="text-xs text-gold-300/80 font-sans">
                  {currentChapterInfo.name_en}
                </p>
              </div>

              {/* Chapter Progress Gauge */}
              <div className="bg-obsidian-950/80 border border-gold-500/20 p-3 rounded-2xl shrink-0 sm:w-48 space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-gold-300">
                  <span>पठन प्रगति (Progress)</span>
                  <span className="font-bold">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-obsidian-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-gold-500 to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-4xl space-y-6">
            <ScriptureReader 
              verse={activeVerse} 
              onWordClick={(token) => setSelectedToken(token)}
              onNext={nextVerse}
              onPrev={prevVerse}
            />
          </div>
        </main>

        {/* Right Panel - Desktop Audio & Quick Info (Hidden in Focus Mode) */}
        {!isFocusMode && (
          <aside className="hidden lg:flex flex-col w-80 border-l border-gold-500/15 bg-obsidian-950/60 backdrop-blur-xl p-6 z-10 space-y-6 flex-shrink-0">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold">
                <Headphones className="w-4 h-4" />
                <span>Vedic Audio Stream</span>
              </div>
              <p className="text-xs text-obsidian-400">
                Authentic chapter recitation and discourse from sacred playlists.
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
        )}
        
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
        verses={allVerses}
      />

      <SavedVersesDrawer
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        onSelectVerse={jumpTo}
        verses={allVerses}
      />
    </div>
  );
}
