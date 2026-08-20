'use client';

import React, { useState, useEffect } from 'react';
import { CHAPTERS, ChapterInfo, GitaVerse, AnvayaToken } from '@/types/verse';
import { sacredAudio } from '@/lib/sacredSounds';
import { useLanguage } from '@/context/LanguageContext';
import ChapterEpisodeGrid from '@/components/ChapterEpisodeGrid';
import ChapterDetailView from '@/components/ChapterDetailView';
import ScriptureReader from '@/components/ScriptureReader';
import WordDetailModal from '@/components/WordDetailModal';
import { BookOpen, Layers, ArrowLeft } from 'lucide-react';

interface ScriptureWorkspaceProps {
  verses: GitaVerse[];
  initialChapter?: number;
  initialVerse?: number;
}

export default function ScriptureWorkspace({
  verses,
  initialChapter = 1,
  initialVerse = 1
}: ScriptureWorkspaceProps) {
  const { t } = useLanguage();

  // Navigation View State: 'chapters_grid' | 'chapter_detail' | 'shloka_sanctuary'
  const [currentView, setCurrentView] = useState<'chapters_grid' | 'chapter_detail' | 'shloka_sanctuary'>('chapters_grid');
  const [activeChapter, setActiveChapter] = useState(initialChapter);
  const [activeVerseNum, setActiveVerseNum] = useState(initialVerse);
  const [selectedToken, setSelectedToken] = useState<AnvayaToken | null>(null);

  // Synchronize with URL hash or state changes
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#shloka_')) {
        const parts = hash.replace('#shloka_', '').split('_');
        if (parts.length === 2) {
          setActiveChapter(parseInt(parts[0]));
          setActiveVerseNum(parseInt(parts[1]));
          setCurrentView('shloka_sanctuary');
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Resolve active verse object
  const activeVerseObj = verses.find(
    v => v.chapter === activeChapter && v.verse === activeVerseNum
  ) || verses[0] || {
    chapter: 1,
    verse: 1,
    devanagari: 'धृतराष्ट्र उवाच\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥',
    iast: 'dhṛtarāṣṭra uvāca\ndharmakṣetre kurukṣetre samavetā yuyutsavaḥ |\nmāmakāḥ pāṇḍavāścaiva kimakurvata sañjaya ||',
    translation_hi: 'धृतराष्ट्र ने कहा—हे संजय! धर्मभूमि कुरुक्षेत्र में युद्ध की इच्छा से एकत्र हुए मेरे और पाण्डु के पुत्रों ने क्या किया?',
    translation_en: 'Dhritarashtra said: O Sanjaya, assembled in the holy land of Kurukshetra, desirous of fighting, what did my sons and the sons of Pandu do?',
    speaker: 'धृतराष्ट्र'
  };

  const handleSelectChapter = (chNum: number) => {
    setActiveChapter(chNum);
    setCurrentView('chapter_detail');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectShloka = (verseNum: number) => {
    setActiveVerseNum(verseNum);
    setCurrentView('shloka_sanctuary');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextVerse = () => {
    const currentChapterInfo = CHAPTERS.find(c => c.number === activeChapter);
    const maxVerse = currentChapterInfo?.verses_count || 47;
    if (activeVerseNum < maxVerse) {
      setActiveVerseNum(activeVerseNum + 1);
    } else if (activeChapter < 18) {
      setActiveChapter(activeChapter + 1);
      setActiveVerseNum(1);
    }
  };

  const handlePrevVerse = () => {
    if (activeVerseNum > 1) {
      setActiveVerseNum(activeVerseNum - 1);
    } else if (activeChapter > 1) {
      const prevChInfo = CHAPTERS.find(c => c.number === activeChapter - 1);
      setActiveChapter(activeChapter - 1);
      setActiveVerseNum(prevChInfo?.verses_count || 1);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6">
      
      {/* ── BREADCRUMB SANCTUARY NAVIGATION BAR ───────────────────────────── */}
      {currentView !== 'chapters_grid' && (
        <div className="flex items-center gap-2 text-xs font-serif text-[#c5a059] bg-[#090a10]/80 p-2.5 sm:p-3 rounded-2xl border border-[#c5a059]/20 shadow-md flex-wrap">
          <button
            onClick={() => {
              sacredAudio.playNavChime(0.06);
              setCurrentView('chapters_grid');
            }}
            className="hover:text-[#f5eed9] transition-colors cursor-pointer flex items-center gap-1 font-bold"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>सम्पूर्ण १८ अध्याय</span>
          </button>

          <span>/</span>

          <button
            onClick={() => {
              sacredAudio.playNavChime(0.06);
              setCurrentView('chapter_detail');
            }}
            className={`hover:text-[#f5eed9] transition-colors cursor-pointer ${
              currentView === 'chapter_detail' ? 'text-[#f5eed9] font-bold' : ''
            }`}
          >
            अध्याय {activeChapter}
          </button>

          {currentView === 'shloka_sanctuary' && (
            <>
              <span>/</span>
              <span className="text-[#f5eed9] font-bold">
                श्लोक {activeVerseNum}
              </span>
            </>
          )}
        </div>
      )}

      {/* ── 3-TIER CONDITIONAL VIEW RENDERING ─────────────────────────────── */}
      {currentView === 'chapters_grid' && (
        <ChapterEpisodeGrid
          onSelectChapter={handleSelectChapter}
          onDirectShloka={(ch, v) => {
            setActiveChapter(ch);
            setActiveVerseNum(v);
            setCurrentView('shloka_sanctuary');
          }}
        />
      )}

      {currentView === 'chapter_detail' && (
        <ChapterDetailView
          chapterNum={activeChapter}
          verses={verses}
          onBack={() => setCurrentView('chapters_grid')}
          onSelectShloka={handleSelectShloka}
        />
      )}

      {currentView === 'shloka_sanctuary' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                sacredAudio.playNavChime(0.08);
                setCurrentView('chapter_detail');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/30 text-xs font-serif text-[#e6c687] flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>अध्याय {activeChapter} के श्लोक सूची पर वापस</span>
            </button>
          </div>

          <ScriptureReader
            verse={activeVerseObj}
            onNext={handleNextVerse}
            onPrev={handlePrevVerse}
            onWordClick={(token) => setSelectedToken(token)}
          />
        </div>
      )}

      {/* Word Anatomy Lexicon Modal */}
      {selectedToken && (
        <WordDetailModal
          token={selectedToken}
          onClose={() => setSelectedToken(null)}
        />
      )}

    </div>
  );
}
