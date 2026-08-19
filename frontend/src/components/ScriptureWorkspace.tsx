'use client';

import React, { useState, useEffect } from 'react';
import { 
  Menu, Grid, BookOpen, Search, BookMarked, 
  ChevronRight, ChevronLeft, Sparkles, Flame, CheckCircle2, Globe 
} from 'lucide-react';
import ChapterSelector from './ChapterSelector';
import ScriptureReader from './ScriptureReader';
import MobileBottomSheet from './MobileBottomSheet';
import WordDeconstructorModal from './WordDeconstructorModal';
import GlobalVerseSearchModal from './GlobalVerseSearchModal';
import SavedVersesDrawer from './SavedVersesDrawer';
import { sacredAudio } from '@/lib/sacredSounds';
import { GitaVerse, AnvayaToken, CHAPTERS } from '@/types/verse';
import { useVerseNavigation } from '@/hooks/useVerseNavigation';
import { useLanguage, SUPPORTED_LANGUAGES, type AppLanguage } from '@/context/LanguageContext';

export default function ScriptureWorkspace({ verses: initialVerses }: { verses: GitaVerse[] }) {
  const { language, setLanguage, t } = useLanguage();
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
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  // If active verse is not loaded, fetch dynamically
  useEffect(() => {
    const exists = allVerses.some(v => v.chapter === currentChapter && v.verse === currentVerse);
    if (!exists) {
      setIsLoadingVerse(true);
      fetch(`/api/v1/shloka?chapter=${currentChapter}&verse=${currentVerse}&lang=${language}`)
        .then(res => res.json())
        .then(res => {
          if (res.success && res.data) {
            const newVerse: GitaVerse = {
              chapter: currentChapter,
              verse: currentVerse,
              devanagari: res.data.devanagari,
              iast: res.data.iast,
              translation_hi: res.data.translation,
              translation_en: res.data.translation,
              practical_insight: res.data.practical_insight,
              anvaya_tokens: res.data.anvaya_tokens || []
            };
            setAllVerses(prev => [...prev, newVerse]);
          }
        })
        .catch(err => console.warn('Dynamic verse fetch error:', err))
        .finally(() => setIsLoadingVerse(false));
    }
  }, [currentChapter, currentVerse, allVerses, language]);

  const activeVerse = currentVerseData || allVerses.find(v => v.chapter === currentChapter && v.verse === currentVerse) || allVerses[0];
  const currentChapterInfo = CHAPTERS.find(c => c.number === currentChapter) || CHAPTERS[0];

  const updateSavedCount = () => {
    if (typeof window !== 'undefined') {
      const saved = JSON.parse(localStorage.getItem('dharma_saved_verses') || '[]');
      setSavedCount(saved.length);
    }
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
    <div className="w-full min-h-screen flex flex-col text-[#f5eed9] relative bg-transparent scroll-smooth">
      
      {/* ── CLEAN TOP WORKSPACE BREADCRUMB BAR (With Working Global Language Translator) ─── */}
      <div className="w-full flex items-center justify-between px-3 sm:px-6 lg:px-8 py-2.5 border-b border-[#c5a059]/20 bg-[#0d0e16]/95 backdrop-blur-xl sticky top-0 z-30 shadow-md">
        
        {/* Left: Mobile Chapter Trigger & Current Chapter/Verse Selector */}
        <div className="flex items-center gap-2.5">
          <button 
            className="md:hidden p-2 rounded-xl text-[#e6c687] hover:bg-[#151722] border border-[#c5a059]/25 transition-colors cursor-pointer touch-manipulation flex items-center gap-1.5"
            onClick={() => {
              setIsMobileMenuOpen(true);
              sacredAudio.playNavChime(0.08);
            }}
            aria-label="अध्याय सूची"
          >
            <Menu className="w-4 h-4 text-[#c5a059]" />
            <span className="text-xs font-serif font-semibold">{t('chapter')}</span>
          </button>
          
          {/* Quick Chapter & Verse Matrix Picker Button */}
          <button
            onClick={() => {
              setIsVersePickerOpen(true);
              sacredAudio.playNavChime(0.08);
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#141622] hover:bg-[#1f2232] border border-[#c5a059]/30 text-xs sm:text-sm text-[#f5eed9] font-medium transition-all shadow-sm cursor-pointer touch-manipulation group"
          >
            <Grid className="w-3.5 h-3.5 text-[#c5a059] group-hover:rotate-90 transition-transform" />
            <span className="font-serif font-bold text-[#e6c687]">{t('chapter')} {currentChapter}</span>
            <span className="text-[#c5a059]/50 font-mono">·</span>
            <span className="font-mono text-[#f5eed9]">{t('verse')} {currentVerse}</span>
            <span className="text-[#c5a059]/60 text-[10px]">▾</span>
          </button>
        </div>

        {/* Right: Master Language Selector, Search & Saved Bookmarks */}
        <div className="flex items-center gap-2">
          
          {/* Working Expert Language Translator Dropdown */}
          <div className="flex items-center gap-1.5 bg-[#141622] border border-[#c5a059]/30 rounded-xl px-2.5 py-1.5 shadow-inner">
            <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as AppLanguage)}
              className="bg-transparent text-xs text-[#f5eed9] font-sans font-semibold focus:outline-none cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-[#090a0f] text-[#f5eed9]">
                  {lang.flag} {lang.nativeName}
                </option>
              ))}
            </select>
          </div>

          <button 
            onClick={() => {
              setIsSearchOpen(true);
              sacredAudio.playNavChime(0.08);
            }}
            className="px-2.5 py-1.5 rounded-xl bg-[#141622] hover:bg-[#1f2232] border border-[#c5a059]/25 text-[#e6c687] hover:text-[#f5eed9] transition-all flex items-center gap-1.5 cursor-pointer touch-manipulation"
            title="श्लोक खोजें (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="text-xs font-sans hidden sm:inline">{t('search')}</span>
            <span className="hidden lg:inline text-[9px] border border-[#c5a059]/30 px-1 py-0.5 rounded font-mono bg-[#090a0f] text-[#c5a059]">⌘K</span>
          </button>

          <button 
            onClick={() => {
              setIsSavedOpen(true);
              sacredAudio.playNavChime(0.08);
            }}
            className="relative p-2 rounded-xl bg-[#141622] hover:bg-[#1f2232] border border-[#c5a059]/25 text-[#e6c687] hover:text-[#f5eed9] transition-all cursor-pointer touch-manipulation"
            title={t('saved')}
          >
            <BookMarked className="w-4 h-4 text-[#c5a059]" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#c5a059] text-[#090a0f] text-[10px] font-bold rounded-full flex items-center justify-center shadow-md animate-pulse">
                {savedCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* ── MAIN WORKSPACE LAYOUT (Smooth natural scrolling) ─────────── */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-6 p-3 sm:p-6 lg:p-8 flex-1">
        
        {/* Left Sticky Sidebar - Chapter & Shloka Selector */}
        <aside className="hidden md:block w-72 lg:w-84 shrink-0">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-3xl border border-[#c5a059]/25 bg-[#0d0e16]/95 backdrop-blur-xl shadow-2xl custom-scrollbar">
            <ChapterSelector 
              currentChapter={currentChapter} 
              currentVerse={currentVerse}
              onSelectChapter={setChapter}
              onSelectVerse={setVerse}
            />
          </div>
        </aside>

        {/* Center Scripture Reading Sanctuary */}
        <main className="flex-1 min-w-0 flex flex-col space-y-6">
          
          {/* Royal Chapter Overview Banner (Clickable to open Shloka Matrix) */}
          <div 
            onClick={() => {
              setIsVersePickerOpen(true);
              sacredAudio.playNavChime(0.08);
            }}
            className="w-full rounded-3xl bg-gradient-to-r from-[#141622] via-[#0e0f17] to-[#12131d] border border-[#c5a059]/30 p-5 sm:p-6 shadow-xl relative overflow-hidden cursor-pointer hover:border-[#c5a059]/60 transition-all group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 text-[11px] font-mono text-[#e6c687] font-bold uppercase">
                    {t('chapter')} {currentChapter}
                  </span>
                  <span className="text-xs font-mono text-[#c5a059]/70">
                    {currentChapterInfo.verse_count} {t('total_shlokas')}
                  </span>
                  <span className="text-[10px] text-[#c5a059]/60 border border-[#c5a059]/20 px-1.5 py-0.5 rounded-md font-sans hidden sm:inline">
                    बदलने के लिए क्लिक करें ▾
                  </span>
                </div>
                <h1 className="font-devanagari text-xl sm:text-2xl font-bold text-[#f5eed9] group-hover:text-[#e6c687] transition-colors">
                  {currentChapterInfo.name_sanskrit}
                </h1>
                <p className="text-xs sm:text-sm text-[#c5a059]/80 font-serif italic">
                  {currentChapterInfo.name_en}
                </p>
              </div>

              {/* Reading Progress Indicator */}
              <div className="sm:text-right space-y-1.5 shrink-0 bg-[#090a0f]/60 p-3 rounded-2xl border border-[#c5a059]/15">
                <div className="flex items-center sm:justify-end gap-2 text-xs font-serif text-[#e6c687]">
                  <span>{t('progress')}:</span>
                  <span className="font-mono font-bold text-[#f5eed9]">{progressPercentage}%</span>
                </div>
                <div className="w-36 h-2 bg-[#151722] rounded-full overflow-hidden border border-[#c5a059]/20">
                  <div 
                    className="h-full bg-gradient-to-r from-[#c5a059] to-[#e6c687] transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Shloka Reader with Active 5-Tier Data */}
          {isLoadingVerse ? (
            <div className="w-full rounded-3xl bg-[#0e0f17] border border-[#c5a059]/30 p-12 text-center space-y-4 animate-pulse">
              <div className="w-12 h-12 rounded-2xl bg-[#c5a059]/20 border border-[#c5a059]/40 mx-auto flex items-center justify-center text-[#e6c687] text-xl font-bold">
                ॐ
              </div>
              <p className="text-sm font-devanagari text-[#e6c687]">
                {t('chapter')} {currentChapter}, {t('verse')} {currentVerse} {t('loading')}
              </p>
            </div>
          ) : (
            <ScriptureReader
              verse={activeVerse}
              onWordClick={(token) => setSelectedToken(token)}
              onNext={nextVerse}
              onPrev={prevVerse}
            />
          )}

        </main>

      </div>

      {/* ── MASTER CHAPTER & SHLOKA MATRIX MODAL ───────────────────────── */}
      <MobileBottomSheet 
        isOpen={isVersePickerOpen} 
        onClose={() => setIsVersePickerOpen(false)} 
        title="सम्पूर्ण अध्याय एवं श्लोक चयनिका (Chapter & Shloka Matrix)"
      >
        <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
          
          {/* Chapter Quick Switch Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 custom-scrollbar">
            {CHAPTERS.map(ch => (
              <button
                key={ch.number}
                onClick={() => {
                  setChapter(ch.number);
                  sacredAudio.playNavChime(0.08);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-serif shrink-0 transition-all border cursor-pointer ${
                  currentChapter === ch.number
                    ? 'bg-[#c5a059] text-[#090a0f] border-[#f5eed9] font-bold shadow-md'
                    : 'bg-[#141622] hover:bg-[#1f2232] text-[#e6c687] border-[#c5a059]/20'
                }`}
              >
                {t('chapter')} {ch.number}
              </button>
            ))}
          </div>

          <div className="p-3 bg-[#141622] rounded-2xl border border-[#c5a059]/20">
            <h4 className="font-devanagari text-sm font-bold text-[#f5eed9]">
              {t('chapter')} {currentChapter} · {currentChapterInfo.name_sanskrit} ({currentChapterInfo.name_en})
            </h4>
            <p className="text-xs text-[#c5a059]/70 font-sans mt-0.5">
              कुल {currentChapterInfo.verse_count} {t('total_shlokas')} — किसी भी श्लोक पर क्लिक करके सीधा पाठ करें:
            </p>
          </div>

          {/* Shloka Matrix Grid */}
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 p-1">
            {Array.from({ length: currentChapterInfo.verse_count }, (_, i) => i + 1).map(vNum => {
              const isSelected = currentVerse === vNum;
              return (
                <button
                  key={vNum}
                  onClick={() => {
                    setVerse(vNum);
                    setIsVersePickerOpen(false);
                    sacredAudio.playNavChime(0.12);
                  }}
                  className={`h-10 rounded-xl text-xs font-mono font-bold flex items-center justify-center transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#c5a059] text-[#090a0f] border-[#f5eed9] shadow-[0_0_12px_rgba(197,160,89,0.6)] scale-105'
                      : 'bg-[#141622] hover:bg-[#1f2232] text-[#e6c687] border-[#c5a059]/20 hover:border-[#c5a059]/60'
                  }`}
                >
                  {vNum}
                </button>
              );
            })}
          </div>

        </div>
      </MobileBottomSheet>

      {/* Mobile Chapter Selector Bottom Sheet */}
      <MobileBottomSheet 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        title="श्रीमद्भगवद्गीता (18 अध्याय)"
      >
        <div className="max-h-[75vh] overflow-y-auto custom-scrollbar">
          <ChapterSelector 
            currentChapter={currentChapter} 
            currentVerse={currentVerse}
            onSelectChapter={(c) => {
              setChapter(c);
            }} 
            onSelectVerse={(v) => {
              setVerse(v);
              setIsMobileMenuOpen(false);
            }}
          />
        </div>
      </MobileBottomSheet>

      {/* Global Modals & Drawers */}
      <WordDeconstructorModal isOpen={!!selectedToken} token={selectedToken} onClose={() => setSelectedToken(null)} />
      <GlobalVerseSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onSelectVerse={jumpTo} verses={allVerses} />
      <SavedVersesDrawer isOpen={isSavedOpen} onClose={() => setIsSavedOpen(false)} onSelectVerse={jumpTo} verses={allVerses} />

    </div>
  );
}
