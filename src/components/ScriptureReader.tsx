'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Play, Pause, ArrowLeft, Volume2, 
  Sparkles, BookOpen, Bookmark, BookmarkCheck, Copy, Check, 
  MessageSquare, Flame, Image as ImageIcon,
  Search, Download, Award, ChevronDown, ChevronUp
} from 'lucide-react';
import { GitaVerse, CHAPTERS } from '@/types/verse';
import { getMasterTimestampForVerse, MASTER_VIDEO_ID } from '@/data/gitaMasterAudioTimestamps';
import { getArtworkDetailsForShloka } from '@/data/krishnaArtworks';
import { getChapterTheme } from '@/data/chapterThemes';
import { getSpeakerForVerse, getChhandaForVerse, generateUniversalVedicData } from '@/lib/universalVedicEngine';
import { getCanonicalVerseData } from '@/data/canonicalGitaTranslations';
import { sacredAudio } from '@/lib/sacredSounds';
import { useLanguage } from '@/context/LanguageContext';
import { useGlobalAudio } from '@/context/GlobalAudioContext';
import SacredArtworkImage from '@/components/SacredArtworkImage';
import ShlokaPronunciationTrainer from '@/components/ShlokaPronunciationTrainer';

interface ScriptureReaderProps {
  verse: GitaVerse;
  onPrev?: () => void;
  onNext?: () => void;
  onBackToChapter?: () => void;
  onNavigate?: (chapter: number, verse: number) => void;
  onWordClick?: (token: any) => void;
}

const DEVANAGARI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
function toDevanagariNum(num: number): string {
  return num.toString().split('').map(d => DEVANAGARI_DIGITS[parseInt(d, 10)] || d).join('');
}

interface AcharyaBhashyaItem {
  id: string;
  name: string;
  tradition: string;
  icon: string;
  tagline: string;
}

const ACHARYA_LIST: AcharyaBhashyaItem[] = [
  {
    id: 'universal',
    name: 'समग्र वैदिक सार',
    tradition: 'सारगर्भित समन्वय',
    icon: '🪔',
    tagline: 'सम्पूर्ण दर्शनों का एकीकृत निचोड़'
  },
  {
    id: 'advaita',
    name: 'आदि शंकराचार्य',
    tradition: 'अद्वैत वेदान्त (Non-Dualism)',
    icon: '🕉️',
    tagline: 'ब्रह्म सत्यं जगन्मिथ्या — आत्मा ही परब्रह्म है'
  },
  {
    id: 'vishishtadvaita',
    name: 'रामानुजाचार्य',
    tradition: 'विशिष्टाद्वैत वेदान्त',
    icon: '🌸',
    tagline: 'परम शरणागति एवं भगवान की अहैतुकी कृपा'
  },
  {
    id: 'dvaita',
    name: 'मध्वाचार्य',
    tradition: 'द्वैत वेदान्त (Dualism)',
    icon: '🔱',
    tagline: 'जीवात्मा और परमात्मा का नित्य भेद एवं भक्ति'
  },
  {
    id: 'jnaneshwari',
    name: 'संत ज्ञानेश्वर',
    tradition: 'ज्ञानेश्वरी भावार्थ',
    icon: '✨',
    tagline: 'मधुर काव्यमयी अमृतमयी भगवद् व्याख्या'
  },
  {
    id: 'vivekananda',
    name: 'स्वामी विवेकानंद',
    tradition: 'व्यावहारिक वेदान्त',
    icon: '⚡',
    tagline: 'उठो, जागो और लक्ष्य प्राप्ति तक रुको मत'
  },
  {
    id: 'science',
    name: 'आधुनिक चेतना विज्ञान',
    tradition: 'Quantum Consciousness',
    icon: '🔬',
    tagline: 'चेतना, ऊर्जा एवं आधुनिक वैज्ञानिक दृष्टिकोण'
  }
];

export default function ScriptureReader({
  verse,
  onPrev,
  onNext,
  onBackToChapter,
  onNavigate,
  onWordClick
}: ScriptureReaderProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const { 
    currentTrack, 
    isPlaying, 
    currentTimeSec,
    playTrack, 
    togglePlayPause, 
    setIsSearchModalOpen, 
    setSelectedLexiconWord,
    setActiveCardGeneratorVerse 
  } = useGlobalAudio();
  
  const [activeTab, setActiveTab] = useState<'study' | 'gallery'>('study');
  const [activeSampradaya, setActiveSampradaya] = useState<string>('universal');
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showDedicatedPlayer, setShowDedicatedPlayer] = useState(false);

  const chapterInfo = CHAPTERS.find(c => c.number === verse.chapter) || CHAPTERS[0];
  const chapterTheme = getChapterTheme(verse.chapter);
  const masterTimestamp = getMasterTimestampForVerse(verse.chapter, verse.verse);
  const speaker = getSpeakerForVerse(verse.chapter, verse.verse);
  const chhanda = getChhandaForVerse(verse.chapter, verse.verse);
  const canonical = getCanonicalVerseData(verse.chapter, verse.verse);
  const universal = generateUniversalVedicData(verse.chapter, verse.verse);
  const artwork = getArtworkDetailsForShloka(verse.chapter, verse.verse);

  const isCurrentVersePlaying = currentTrack?.chapter === verse.chapter && currentTrack?.verse === verse.verse && isPlaying;
  const durationSec = masterTimestamp.duration || 60;
  const progressPercent = Math.min(100, Math.max(0, (currentTimeSec / durationSec) * 100));

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gita_bookmarks');
      if (saved) {
        const arr = JSON.parse(saved);
        setIsBookmarked(arr.some((b: any) => b.chapter === verse.chapter && b.verse === verse.verse));
      }
    } catch {}
  }, [verse.chapter, verse.verse]);

  const toggleBookmark = () => {
    try {
      const saved = localStorage.getItem('gita_bookmarks');
      let arr = saved ? JSON.parse(saved) : [];
      if (isBookmarked) {
        arr = arr.filter((b: any) => !(b.chapter === verse.chapter && b.verse === verse.verse));
        setIsBookmarked(false);
      } else {
        arr.push({ chapter: verse.chapter, verse: verse.verse, title: `अध्याय ${verse.chapter}, श्लोक ${verse.verse}` });
        setIsBookmarked(true);
        sacredAudio.playNavChime(0.1);
      }
      localStorage.setItem('gita_bookmarks', JSON.stringify(arr));
    } catch {}
  };

  const copyVerse = () => {
    const text = `श्रीमद्भगवद्गीता अध्याय ${verse.chapter}, श्लोक ${verse.verse}\n\n${verse.devanagari}\n\n${verse.iast}\n\nअर्थ: ${verse.translation_hi}\n\nhttps://githd.vercel.app/chapter/${verse.chapter}/${verse.verse}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    sacredAudio.playNavChime(0.1);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAskKrishna = () => {
    sacredAudio.playFluteChime(0.4);
    if (typeof window !== 'undefined') {
      window.location.href = '/#mentor';
      sessionStorage.setItem('dharma_mentor_prefill', `हे कृष्ण! श्रीमद्भगवद्गीता के अध्याय ${verse.chapter}, श्लोक ${verse.verse} का मेरे जीवन में क्या वास्तविक संदेश है?`);
    }
  };

  const handlePlayPureMusic = () => {
    if (isCurrentVersePlaying) {
      togglePlayPause();
    } else {
      playTrack(verse.chapter, verse.verse, verse.devanagari, verse.translation_hi);
    }
  };

  const getActiveBhashyaContent = () => {
    if (activeSampradaya === 'advaita') return universal.sampradaya_notes.advaita;
    if (activeSampradaya === 'vishishtadvaita') return universal.sampradaya_notes.vishishtadvaita;
    if (activeSampradaya === 'dvaita') return universal.sampradaya_notes.dvaita;
    if (activeSampradaya === 'jnaneshwari') return universal.sampradaya_notes.jnaneshwari;
    if (activeSampradaya === 'vivekananda') return universal.sampradaya_notes.vivekananda;
    if (activeSampradaya === 'science') return universal.sampradaya_notes.science;
    
    return canonical?.deep_bhashya?.hi || canonical?.deep_bhashya?.hinglish || universal.sampradaya_notes.universal;
  };

  const currentAcharya = ACHARYA_LIST.find(a => a.id === activeSampradaya) || ACHARYA_LIST[0];

  return (
    <div className="relative min-h-screen bg-[#090b14]">
      
      <div className="relative z-10 max-w-4xl mx-auto space-y-6 animate-fade-in px-2 sm:px-4 pb-32 pt-2">
        
        {/* ── TOP UTILITY BAR (THEMED BORDER) ────────────────────────────────── */}
        <div className={`flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#0f111c]/95 backdrop-blur-xl border-2 ${chapterTheme.borderClass} shadow-2xl`}>
          
          <Link
            href={`/chapter/${verse.chapter}`}
            onClick={() => sacredAudio.playNavChime(0.06)}
            className="inline-flex items-center gap-2 text-xs font-serif text-[#e6c687] hover:text-[#f5eed9] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>अध्याय {verse.chapter} ({chapterInfo.name_sanskrit})</span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2">
            
            <button
              onClick={() => { setIsSearchModalOpen(true); sacredAudio.playNavChime(0.05); }}
              className="p-2 rounded-xl bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/25 text-[#c5a059] hover:text-[#f5eed9] transition-colors cursor-pointer flex items-center gap-1 text-xs font-serif"
              title="खोजें (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">खोजें</span>
            </button>

            <button
              onClick={() => {
                setActiveCardGeneratorVerse(verse);
                sacredAudio.playNavChime(0.08);
              }}
              className="p-2 rounded-xl bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/25 text-[#e6c687] hover:text-[#f5eed9] transition-colors cursor-pointer flex items-center gap-1 text-xs font-serif"
              title="वॉलपेपर कार्ड बनाएं"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">कार्ड</span>
            </button>

            <div className="flex items-center bg-[#141624] border border-[#c5a059]/30 p-0.5 rounded-xl">
              <button
                onClick={() => { setActiveTab('study'); sacredAudio.playNavChime(0.05); }}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-serif transition-all cursor-pointer ${
                  activeTab === 'study'
                    ? `${chapterTheme.buttonBg} font-bold shadow-sm`
                    : 'text-[#c5a059]/70 hover:text-[#f5eed9]'
                }`}
              >
                पाठ
              </button>
              <button
                onClick={() => { setActiveTab('gallery'); sacredAudio.playNavChime(0.05); }}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-serif transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'gallery'
                    ? `${chapterTheme.buttonBg} font-bold shadow-sm`
                    : 'text-[#c5a059]/70 hover:text-[#f5eed9]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>दर्शन</span>
              </button>
            </div>

            <button
              onClick={copyVerse}
              className="p-2 rounded-xl bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/25 text-[#c5a059] hover:text-[#f5eed9] transition-colors cursor-pointer"
              title="श्लोक कॉपी करें"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#c5a059]" />}
            </button>

            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isBookmarked
                  ? `${chapterTheme.buttonBg}`
                  : 'bg-[#141624] hover:bg-[#1f2238] text-[#c5a059]/70 border-[#c5a059]/25 hover:text-[#f5eed9]'
              }`}
              title="बुकमार्क करें"
            >
              {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            </button>
          </div>

        </div>

        {activeTab === 'gallery' ? (
          /* ── SACRED VISUAL DARSHAN MODE ────────────────────────────────────── */
          <div className="space-y-6 animate-fade-in">
            <div className={`relative rounded-3xl overflow-hidden bg-black border-2 ${chapterTheme.borderClass} shadow-2xl h-80 sm:h-[420px]`}>
              <SacredArtworkImage
                src={artwork.url}
                alt={artwork.title}
                chapter={verse.chapter}
                verse={verse.verse}
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-10 space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full ${chapterTheme.buttonBg} text-xs font-mono font-bold w-max shadow-md`}>
                    ॥ अध्याय {toDevanagariNum(verse.chapter)} · श्लोक {toDevanagariNum(verse.verse)} ॥
                  </span>
                  <button
                    onClick={() => setActiveCardGeneratorVerse(verse)}
                    className="px-3 py-1 rounded-full bg-black/70 hover:bg-black border border-[#c5a059]/40 text-[#f5eed9] text-xs font-serif flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3 text-[#c5a059]" />
                    <span>वॉलपेपर डाउनलोड</span>
                  </button>
                </div>
                <h2 className="text-2xl sm:text-4xl font-devanagari font-bold text-[#f5eed9] drop-shadow-lg">
                  {artwork.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#e6c687] font-serif max-w-2xl drop-shadow">
                  {artwork.subtitle}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* ── MAIN STUDY & SACRED READING MODE ──────────────────────────────── */
          <div className="space-y-6">
            
            {/* ── CARD 1: SACRED SANSKRIT ALTAR IN CHAPTER SIGNATURE COLOR ─────── */}
            <div 
              className={`relative rounded-3xl bg-gradient-to-b from-[#141624]/95 via-[#0e101a]/95 to-[#090a12]/95 backdrop-blur-2xl border-2 ${chapterTheme.borderClass} shadow-2xl p-6 sm:p-8 space-y-5 text-center overflow-hidden`}
              style={{ boxShadow: `0 8px 35px ${chapterTheme.glowColor}` }}
            >
              
              {/* Royal Chapter & Shloka Numbering Banner */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${chapterTheme.badgeBg} border ${chapterTheme.borderClass} text-xs font-serif ${chapterTheme.badgeText} shadow-md`}>
                  <span className="font-bold font-mono">॥ अध्याय {toDevanagariNum(verse.chapter)} · श्लोक {toDevanagariNum(verse.verse)} ॥</span>
                  <span className="opacity-60">•</span>
                  <span className="text-[11px] font-mono text-[#f5eed9]">Chapter {verse.chapter}, Verse {verse.verse}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141624] border border-[#c5a059]/30 text-[11px] font-serif text-[#e6c687]">
                  <span>✨ {speaker.title}</span>
                  <span>•</span>
                  <span className="text-[#c5a059]/80">{chhanda}</span>
                </div>
              </div>

              {/* Sacred Sanskrit Verse */}
              <div className="py-2">
                <p className="font-devanagari text-xl sm:text-2xl md:text-3xl text-[#f5eed9] font-medium leading-relaxed tracking-wide drop-shadow-md">
                  {verse.devanagari.split('\n').map((line, idx) => (
                    <span key={idx} className="block py-1">
                      {line}
                    </span>
                  ))}
                </p>
              </div>

              {/* IAST English Transliteration */}
              <div className="pt-2 border-t border-[#c5a059]/20 max-w-2xl mx-auto">
                <p className="text-xs sm:text-sm font-serif italic tracking-wide leading-relaxed" style={{ color: chapterTheme.accentHex }}>
                  {verse.iast}
                </p>
              </div>

              {/* ── GUARANTEED CLASSICAL AUDIO CHANTING DECK ─────────────────── */}
              <div className="pt-4 max-w-xl mx-auto">
                <div className={`p-3.5 sm:p-4 rounded-2xl bg-[#0b0d18]/95 border-2 ${chapterTheme.borderClass} shadow-inner space-y-3`}>
                  
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={handlePlayPureMusic}
                        className={`w-11 h-11 rounded-full ${chapterTheme.buttonBg} flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer border border-[#f5eed9] shrink-0`}
                        title={isCurrentVersePlaying ? 'रोकें' : 'प्रामाणिक संगीत वाचन सुनें'}
                      >
                        {isCurrentVersePlaying ? (
                          <Pause className="w-5 h-5 fill-current" />
                        ) : (
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        )}
                      </button>

                      <div className="text-left">
                        <span className="text-xs font-serif font-bold text-[#f5eed9] block">
                          शास्त्रीय संगीत वाचन (स्वर: शैलेन्द्र भारती)
                        </span>
                        <span className="text-[10px] font-sans block" style={{ color: chapterTheme.accentHex }}>
                          {isCurrentVersePlaying ? '▶️ लाइव वाचन चल रहा है...' : 'क्लिक करके प्रामाणिक धुन सुनें'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowDedicatedPlayer(!showDedicatedPlayer)}
                      className="px-3 py-1.5 rounded-xl bg-[#141624] border border-[#c5a059]/30 text-xs font-serif text-[#e6c687] hover:text-[#f5eed9] flex items-center gap-1 cursor-pointer"
                    >
                      <span>{showDedicatedPlayer ? 'प्लेयर छिपाएं' : 'प्लेयर खोलें'}</span>
                      {showDedicatedPlayer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Progress Line in Chapter Theme Color */}
                  <div className="space-y-1">
                    <div className="w-full h-1.5 rounded-full bg-[#141829] overflow-hidden">
                      <div
                        className="h-full transition-all duration-300"
                        style={{ 
                          width: `${isCurrentVersePlaying ? progressPercent : 0}%`,
                          backgroundColor: chapterTheme.primaryColor
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#c5a059]/70">
                      <span>{isCurrentVersePlaying ? formatTime(currentTimeSec) : '0:00'}</span>
                      <span>समय: {masterTimestamp.formattedStart}</span>
                    </div>
                  </div>

                  {/* Visible Embedded Player if expanded */}
                  {showDedicatedPlayer && (
                    <div className="pt-2 aspect-video w-full rounded-xl overflow-hidden bg-black border border-[#c5a059]/20">
                      <iframe
                        src={`https://www.youtube.com/embed/${MASTER_VIDEO_ID}?start=${masterTimestamp.startSeconds}&autoplay=1&controls=1&enablejsapi=1`}
                        title="Gita Shloka Audio"
                        className="w-full h-full"
                        allow="autoplay; encrypted-media"
                      />
                    </div>
                  )}

                </div>
              </div>

            </div>

            {/* ── CARD: AI SANSKRIT PRONUNCIATION TRAINER ────────────────────── */}
            <ShlokaPronunciationTrainer
              devanagari={verse.devanagari}
              iast={verse.iast}
              chapter={verse.chapter}
              verse={verse.verse}
            />

            {/* ── CARD 2: HINDI & ENGLISH TRANSLATIONS ─────────────────────────── */}
            <div className={`rounded-3xl bg-[#0f111c]/90 backdrop-blur-xl border-2 ${chapterTheme.borderClass} p-5 sm:p-6 shadow-xl space-y-4`}>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#c5a059]" />
                <h3 className="text-sm font-serif font-bold text-[#f5eed9]">
                  सरल भावार्थ (Translation)
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-[#141624]/90 border border-[#c5a059]/20">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider block mb-1" style={{ color: chapterTheme.accentHex }}>
                  हिन्दी अनुवाद:
                </span>
                <p className="text-sm sm:text-base text-[#f5eed9] font-serif leading-relaxed">
                  {verse.translation_hi}
                </p>
              </div>

              {verse.translation_en && (
                <div className="p-4 rounded-2xl bg-[#141624]/90 border border-[#c5a059]/20">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider block mb-1" style={{ color: chapterTheme.accentHex }}>
                    English Translation:
                  </span>
                  <p className="text-xs sm:text-sm text-[#f5eed9]/90 font-serif leading-relaxed italic">
                    {verse.translation_en}
                  </p>
                </div>
              )}
            </div>

            {/* ── CARD 3: WORD-BY-WORD ANVAYA WITH INTERACTIVE LEXICON ────────── */}
            {canonical?.word_anvaya && (
              <div className={`rounded-3xl bg-[#0f111c]/90 backdrop-blur-xl border-2 ${chapterTheme.borderClass} p-5 sm:p-6 shadow-xl space-y-3.5`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#c5a059]" />
                    <h3 className="text-sm font-serif font-bold text-[#f5eed9]">
                      पदच्छेद एवं व्याकरणिक अन्वय (Word-by-Word Meaning)
                    </h3>
                  </div>
                  <span className="text-[10px] text-[#c5a059]/80 font-sans hidden sm:inline">
                    (किसी भी शब्द पर क्लिक करके धातु व व्याकरण देखें)
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {canonical.word_anvaya.map((token, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedLexiconWord(token);
                        sacredAudio.playNavChime(0.08);
                      }}
                      className="p-2.5 rounded-xl bg-[#141624]/90 border border-[#c5a059]/20 space-y-1 hover:border-[#c5a059] hover:bg-[#1a1e33] transition-all cursor-pointer group"
                      title="क्लिक करके धातु व व्याकरण देखें"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-devanagari font-bold text-[#e6c687] group-hover:text-[#f5eed9] block">
                          {token.word}
                        </span>
                        <Sparkles className="w-2.5 h-2.5 text-[#c5a059]/40 group-hover:text-[#c5a059]" />
                      </div>
                      <span className="text-[10px] text-[#c5a059]/70 font-sans block italic">
                        {token.iast}
                      </span>
                      <span className="text-[11px] text-[#f5eed9] font-serif block">
                        {(token.meaning as any)?.hi || (token.meaning as any)?.hinglish || (token.meaning as any)?.en}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── CARD 4: ENTERPRISE CLASSICAL COMMENTARIES ────────────────────── */}
            <div className={`rounded-3xl bg-[#0f111c]/90 backdrop-blur-xl border-2 ${chapterTheme.borderClass} p-5 sm:p-7 shadow-2xl space-y-5`}>
              
              <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#c5a059]" />
                  <div>
                    <h3 className="text-sm sm:text-base font-serif font-bold text-[#f5eed9]">
                      प्रामाणिक शास्त्रीय भाष्य (Classical Commentaries)
                    </h3>
                    <span className="text-[11px] text-[#c5a059]/80 font-sans">
                      प्रमुख आचार्य सम्प्रदायों की आधिकारिक दार्शनिक व्याख्या
                    </span>
                  </div>
                </div>
              </div>

              {/* Acharya Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {ACHARYA_LIST.map(acharya => {
                  const isSelected = activeSampradaya === acharya.id;
                  return (
                    <button
                      key={acharya.id}
                      onClick={() => {
                        setActiveSampradaya(acharya.id);
                        sacredAudio.playNavChime(0.06);
                      }}
                      className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1 ${
                        isSelected
                          ? `${chapterTheme.buttonBg} shadow-lg scale-102 font-semibold`
                          : 'bg-[#141624]/90 text-[#e6c687] border-[#c5a059]/25 hover:border-[#c5a059] hover:bg-[#1a1e33]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base">{acharya.icon}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                      </div>
                      <span className="text-xs font-devanagari font-bold block truncate">
                        {acharya.name}
                      </span>
                      <span className={`text-[10px] block truncate ${isSelected ? 'text-black/80' : 'text-[#c5a059]/70'}`}>
                        {acharya.tradition}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Commentary Viewport Card */}
              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#141829]/95 to-[#0e111d]/95 border-2 border-[#c5a059]/30 shadow-xl space-y-4">
                
                <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{currentAcharya.icon}</span>
                    <div>
                      <h4 className="text-sm font-devanagari font-bold text-[#f5eed9]">
                        {currentAcharya.name} ({currentAcharya.tradition})
                      </h4>
                      <p className="text-[11px] text-[#c5a059] font-serif italic">
                        {currentAcharya.tagline}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-xs sm:text-sm text-[#f5eed9]/95 font-serif leading-relaxed whitespace-pre-line">
                    {getActiveBhashyaContent()}
                  </p>
                </div>

              </div>
            </div>

            {/* ── CARD 5: ACTIONABLE LIFE BLUEPRINT ───────────────────────────── */}
            <div className={`rounded-3xl bg-gradient-to-r from-amber-500/15 via-[#c5a059]/20 to-amber-500/15 backdrop-blur-xl border-2 ${chapterTheme.borderClass} p-5 shadow-xl space-y-2`}>
              <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest font-bold" style={{ color: chapterTheme.accentHex }}>
                <Flame className="w-4 h-4 text-amber-400" />
                <span>२१वीं सदी का व्यावहारिक जीवन सूत्र (Actionable Blueprint)</span>
              </div>
              <p className="text-xs sm:text-sm text-[#f5eed9] font-serif leading-relaxed">
                {verse.practical_insight || canonical?.practical_insight?.hi || 'इस श्लोक का अपने दैनिक जीवन में आचरण करें एवं अनासक्त भाव से श्रेष्ठ कर्म करें।'}
              </p>
            </div>

            {/* ── ASK KRISHNA DIALOGUE BUTTON ─────────────────────────────────── */}
            <div className="text-center pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleAskKrishna}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl ${chapterTheme.buttonBg} font-serif font-bold text-xs sm:text-sm shadow-xl hover:scale-102 transition-transform cursor-pointer`}
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>इस श्लोक पर कृष्ण AI से दिव्य संवाद करें 🪔</span>
              </button>
              <button
                onClick={() => setActiveCardGeneratorVerse(verse)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/30 text-[#e6c687] font-serif font-bold text-xs sm:text-sm shadow-md hover:scale-102 transition-transform cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#c5a059]" />
                <span>वॉलपेपर कार्ड बनाएं</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
