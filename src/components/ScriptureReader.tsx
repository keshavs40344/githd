'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Play, Pause, SkipBack, SkipForward, ArrowLeft, Volume2, 
  Sparkles, BookOpen, Bookmark, BookmarkCheck, Copy, Check, 
  MessageSquare, Flame, Image as ImageIcon, Music, RefreshCw
} from 'lucide-react';
import { GitaVerse } from '@/types/verse';
import { CHAPTERS } from '@/types/verse';
import { getMasterTimestampForVerse, MASTER_VIDEO_ID } from '@/data/gitaMasterAudioTimestamps';
import { getArtworkForShloka, getArtworkDetailsForShloka, KRISHNA_ARTWORKS } from '@/data/krishnaArtworks';
import { getSpeakerForVerse, getChhandaForVerse, generateUniversalVedicData } from '@/lib/universalVedicEngine';
import { getCanonicalVerseData } from '@/data/canonicalGitaTranslations';
import { sacredAudio } from '@/lib/sacredSounds';
import { useLanguage } from '@/context/LanguageContext';

interface ScriptureReaderProps {
  verse: GitaVerse;
  onPrev?: () => void;
  onNext?: () => void;
  onBackToChapter?: () => void;
  onNavigate?: (chapter: number, verse: number) => void;
  onWordClick?: (token: any) => void;
}

export default function ScriptureReader({
  verse,
  onPrev,
  onNext,
  onBackToChapter,
  onNavigate,
  onWordClick
}: ScriptureReaderProps) {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  
  // Audio state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSpeakingAI, setIsSpeakingAI] = useState(false);
  const [isBgMusicPlaying, setIsBgMusicPlaying] = useState(false);
  
  // Visual tab state
  const [activeTab, setActiveTab] = useState<'study' | 'gallery'>('study');
  const [activeSampradaya, setActiveSampradaya] = useState<string>('universal');
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState<'base' | 'lg' | 'xl'>('lg');

  const chapterInfo = CHAPTERS.find(c => c.number === verse.chapter) || CHAPTERS[0];
  const masterTimestamp = getMasterTimestampForVerse(verse.chapter, verse.verse);
  const speaker = getSpeakerForVerse(verse.chapter, verse.verse);
  const chhanda = getChhandaForVerse(verse.chapter, verse.verse);
  const canonical = getCanonicalVerseData(verse.chapter, verse.verse);
  const universal = generateUniversalVedicData(verse.chapter, verse.verse);
  const artwork = getArtworkDetailsForShloka(verse.chapter, verse.verse);

  // Bookmark check
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

  // Instant Sanskrit Audio Voice Chanter (Web Speech API)
  const speakSanskritVerse = () => {
    if (typeof window === 'undefined') return;
    
    if (isSpeakingAI) {
      window.speechSynthesis.cancel();
      setIsSpeakingAI(false);
      return;
    }

    sacredAudio.playTempleBell(0.4);
    window.speechSynthesis.cancel();
    
    const textToSpeak = `${verse.devanagari}. अर्थ: ${verse.translation_hi || ''}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.85;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeakingAI(true);
    utterance.onend = () => setIsSpeakingAI(false);
    utterance.onerror = () => setIsSpeakingAI(false);

    window.speechSynthesis.speak(utterance);
  };

  const copyVerse = () => {
    const text = `श्रीमद्भगवद्गीता अध्याय ${verse.chapter}, श्लोक ${verse.verse}

${verse.devanagari}

${verse.iast}

अर्थ: ${verse.translation_hi}

https://githd.vercel.app/chapter/${verse.chapter}/${verse.verse}`;
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

  const getActiveBhashya = () => {
    if (activeSampradaya === 'advaita') return universal.sampradaya_notes.advaita;
    if (activeSampradaya === 'vishishtadvaita') return universal.sampradaya_notes.vishishtadvaita;
    if (activeSampradaya === 'dvaita') return universal.sampradaya_notes.dvaita;
    if (activeSampradaya === 'jnaneshwari') return universal.sampradaya_notes.jnaneshwari;
    if (activeSampradaya === 'vivekananda') return universal.sampradaya_notes.vivekananda;
    if (activeSampradaya === 'story') return universal.sampradaya_notes.story;
    if (activeSampradaya === 'science') return universal.sampradaya_notes.science;
    
    return canonical?.deep_bhashya?.hi || canonical?.deep_bhashya?.hinglish || universal.sampradaya_notes.universal;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in px-2 sm:px-4 pb-24">
      
      {/* ── TOP BREADCRUMB & UTILITY BAR ──────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#0f111c] border border-[#c5a059]/25 shadow-md">
        
        <Link
          href={`/chapter/${verse.chapter}`}
          onClick={() => sacredAudio.playNavChime(0.06)}
          className="inline-flex items-center gap-2 text-xs font-serif text-[#e6c687] hover:text-[#f5eed9] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>अध्याय {verse.chapter} ({chapterInfo.name_sanskrit})</span>
        </Link>

        {/* View Mode Toggle: [ पाठ व भाष्य ] [ दिव्य चित्र दर्शन ] */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#141624] border border-[#c5a059]/25 p-0.5 rounded-xl">
            <button
              onClick={() => { setActiveTab('study'); sacredAudio.playNavChime(0.05); }}
              className={`px-3 py-1 rounded-lg text-xs font-serif transition-all cursor-pointer ${
                activeTab === 'study'
                  ? 'bg-[#c5a059] text-[#090a0f] font-bold shadow-sm'
                  : 'text-[#c5a059]/70 hover:text-[#f5eed9]'
              }`}
            >
              पाठ व भाष्य
            </button>
            <button
              onClick={() => { setActiveTab('gallery'); sacredAudio.playNavChime(0.05); }}
              className={`px-3 py-1 rounded-lg text-xs font-serif transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'gallery'
                  ? 'bg-[#c5a059] text-[#090a0f] font-bold shadow-sm'
                  : 'text-[#c5a059]/70 hover:text-[#f5eed9]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>चित्र दर्शन</span>
            </button>
          </div>

          <button
            onClick={copyVerse}
            className="p-2 rounded-xl bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/20 text-[#c5a059] hover:text-[#f5eed9] transition-colors cursor-pointer"
            title="श्लोक कॉपी करें"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isBookmarked
                ? 'bg-[#c5a059] text-[#090a0f] border-[#c5a059]'
                : 'bg-[#141624] hover:bg-[#1f2238] text-[#c5a059]/70 border-[#c5a059]/20 hover:text-[#f5eed9]'
            }`}
            title="बुकमार्क करें"
          >
            {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>

      {activeTab === 'gallery' ? (
        /* ── SACRED VISUAL DARSHAN & WALLPAPER MODE ───────────────────────── */
        <div className="space-y-5 animate-fade-in">
          <div className="relative rounded-3xl overflow-hidden bg-black border-2 border-[#c5a059]/40 shadow-2xl">
            <img
              src={artwork.url}
              alt={artwork.title}
              className="w-full h-80 sm:h-[480px] object-cover filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-10 space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#c5a059] text-[#090a0f] text-xs font-mono font-bold w-max">
                अध्याय {verse.chapter} • श्लोक {verse.verse}
              </span>
              <h2 className="text-2xl sm:text-4xl font-devanagari font-bold text-[#f5eed9]">
                {artwork.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#e6c687] font-serif max-w-2xl">
                {artwork.subtitle}
              </p>
            </div>
          </div>

          {/* More Artworks Carousel / Grid */}
          <div className="p-5 rounded-3xl bg-[#0f111c] border border-[#c5a059]/25 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-bold text-[#f5eed9]">
                अन्य दिव्य चित्र संग्रह (Sacred Krishna Artworks)
              </h3>
              <span className="text-[11px] text-[#c5a059]/70 font-sans">
                {KRISHNA_ARTWORKS.length} चित्र उपलब्ध
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {KRISHNA_ARTWORKS.slice(0, 6).map((art, idx) => (
                <div
                  key={art.id}
                  className="rounded-xl overflow-hidden border border-[#c5a059]/20 relative group cursor-pointer"
                >
                  <img
                    src={art.url}
                    alt={art.title}
                    className="w-full h-28 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                    <p className="text-[11px] font-devanagari font-bold text-[#f5eed9]">
                      {art.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ── MAIN STUDY & SACRED READING MODE ──────────────────────────────── */
        <div className="space-y-6">
          
          {/* ── CARD 1: DEVANAGARI SANSKRIT ALTAR ─────────────────────────── */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#141624] via-[#0e101a] to-[#090a12] border-2 border-[#c5a059]/35 shadow-2xl p-6 sm:p-8 space-y-5 text-center">
            
            {/* Speaker & Chhanda Header */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-xs font-serif text-[#e6c687]">
              <span>✨ {speaker.title}</span>
              <span>•</span>
              <span className="text-[11px] text-[#c5a059]/80">{chhanda}</span>
            </div>

            {/* Sacred Sanskrit Verse Lines */}
            <div className="py-2">
              <p className="font-devanagari text-xl sm:text-2xl md:text-3xl text-[#f5eed9] font-medium leading-relaxed tracking-wide">
                {verse.devanagari.split('\n').map((line, idx) => (
                  <span key={idx} className="block py-1">
                    {line}
                  </span>
                ))}
              </p>
            </div>

            {/* IAST English Transliteration */}
            <div className="pt-2 border-t border-[#c5a059]/15 max-w-2xl mx-auto">
              <p className="text-xs sm:text-sm text-[#c5a059]/90 font-serif italic tracking-wide leading-relaxed">
                {verse.iast}
              </p>
            </div>

            {/* Quick Audio Controls Inside Verse Card */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              {/* Listen to Voice */}
              <button
                onClick={speakSanskritVerse}
                className={`px-4 py-2 rounded-2xl border text-xs font-serif font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                  isSpeakingAI
                    ? 'bg-amber-500 text-[#090a0f] border-amber-300 font-bold animate-pulse'
                    : 'bg-[#1a1d2e] hover:bg-[#252a42] text-[#e6c687] border-[#c5a059]/30 hover:border-[#c5a059]'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>{isSpeakingAI ? 'स्वर वाचन चल रहा है...' : 'संस्कृत स्वर वाचन सुनें 🪔'}</span>
              </button>

              {/* YouTube Master Track Toggle */}
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`px-4 py-2 rounded-2xl border text-xs font-serif font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                  isPlayingAudio
                    ? 'bg-[#c5a059] text-[#090a0f] border-[#f5eed9] font-bold'
                    : 'bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-[#090a0f] border-[#f5eed9]'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isPlayingAudio ? 'यूट्यूब प्लेयर छिपाएं' : 'यूट्यूब प्रामाणिक वाचन देखें ▶️'}</span>
              </button>
            </div>

          </div>

          {/* ── CARD 2: GUARANTEED VISIBLE YOUTUBE PLAYER ───────────────────── */}
          {isPlayingAudio && (
            <div className="rounded-3xl bg-[#0a0b12] border-2 border-[#c5a059]/40 p-4 sm:p-5 shadow-2xl space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-[#c5a059]" />
                  <span className="text-xs font-serif font-bold text-[#f5eed9]">
                    प्रामाणिक शास्त्रीय वाचन (स्वर: शैलेन्द्र भारती)
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#c5a059]">
                  श्लोक समय: {masterTimestamp.formattedStart}
                </span>
              </div>

              {/* Full Responsive YouTube Player */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-[#c5a059]/20 shadow-inner bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${MASTER_VIDEO_ID}?start=${masterTimestamp.startSeconds}&autoplay=1&controls=1&enablejsapi=1&rel=0&modestbranding=1`}
                  title={`Gita Chapter ${verse.chapter} Verse ${verse.verse}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* ── CARD 3: HINDI & ENGLISH TRANSLATION ──────────────────────────── */}
          <div className="rounded-3xl bg-[#0f111c] border border-[#c5a059]/25 p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#c5a059]" />
              <h3 className="text-sm font-serif font-bold text-[#f5eed9]">
                सरल भावार्थ (Translation)
              </h3>
            </div>

            {/* Hindi Translation */}
            <div className="p-4 rounded-2xl bg-[#141624] border border-[#c5a059]/15">
              <span className="text-[10px] font-sans font-bold text-[#c5a059] uppercase tracking-wider block mb-1">
                हिन्दी अनुवाद:
              </span>
              <p className="text-sm sm:text-base text-[#f5eed9] font-serif leading-relaxed">
                {verse.translation_hi}
              </p>
            </div>

            {/* English Translation */}
            {verse.translation_en && (
              <div className="p-4 rounded-2xl bg-[#141624] border border-[#c5a059]/15">
                <span className="text-[10px] font-sans font-bold text-[#c5a059] uppercase tracking-wider block mb-1">
                  English Translation:
                </span>
                <p className="text-xs sm:text-sm text-[#f5eed9]/90 font-serif leading-relaxed italic">
                  {verse.translation_en}
                </p>
              </div>
            )}
          </div>

          {/* ── CARD 4: WORD-BY-WORD ANVAYA (पदच्छेद व अर्थ) ───────────────── */}
          {canonical?.word_anvaya && (
            <div className="rounded-3xl bg-[#0f111c] border border-[#c5a059]/25 p-5 sm:p-6 shadow-xl space-y-3.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c5a059]" />
                <h3 className="text-sm font-serif font-bold text-[#f5eed9]">
                  पदच्छेद एवं व्याकरणिक अन्वय (Word-by-Word Meaning)
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {canonical.word_anvaya.map((token, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#141624] border border-[#c5a059]/15 space-y-1"
                  >
                    <span className="text-xs font-devanagari font-bold text-[#e6c687] block">
                      {token.word}
                    </span>
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

          {/* ── CARD 5: 10 CLASSICAL COMMENTARIES (भाष्य) ──────────────────── */}
          <div className="rounded-3xl bg-[#0f111c] border border-[#c5a059]/25 p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#c5a059]" />
                <h3 className="text-sm font-serif font-bold text-[#f5eed9]">
                  प्रामाणिक शास्त्रीय भाष्य (Classical Commentaries)
                </h3>
              </div>
            </div>

            {/* Sampradaya Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
              {[
                { id: 'universal', label: 'समग्र सार' },
                { id: 'advaita', label: 'आदि शंकराचार्य' },
                { id: 'vishishtadvaita', label: 'रामानुजाचार्य' },
                { id: 'dvaita', label: 'मध्वाचार्य' },
                { id: 'jnaneshwari', label: 'संत ज्ञानेश्वर' },
                { id: 'vivekananda', label: 'स्वामी विवेकानंद' },
                { id: 'science', label: 'आधुनिक विज्ञान' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSampradaya(tab.id);
                    sacredAudio.playNavChime(0.06);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-serif shrink-0 transition-all cursor-pointer whitespace-nowrap border ${
                    activeSampradaya === tab.id
                      ? 'bg-[#c5a059] text-[#090a0f] font-bold border-[#f5eed9] shadow-md'
                      : 'bg-[#141624] text-[#c5a059]/70 hover:text-[#f5eed9] border-[#c5a059]/20'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Commentary Content */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#141624] border border-[#c5a059]/15">
              <p className="text-xs sm:text-sm text-[#f5eed9]/90 font-serif leading-relaxed whitespace-pre-line">
                {getActiveBhashya()}
              </p>
            </div>
          </div>

          {/* ── CARD 6: ACTIONABLE LIFE BLUEPRINT ───────────────────────────── */}
          <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#c5a059]/15 to-amber-500/10 border border-[#c5a059]/30 p-5 shadow-xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#e6c687] font-bold">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>२१वीं सदी का व्यावहारिक जीवन सूत्र (Actionable Blueprint)</span>
            </div>
            <p className="text-xs sm:text-sm text-[#f5eed9] font-serif leading-relaxed">
              {verse.practical_insight || canonical?.practical_insight?.hi || 'इस श्लोक का अपने दैनिक जीवन में आचरण करें एवं अनासक्त भाव से श्रेष्ठ कर्म करें।'}
            </p>
          </div>

          {/* ── ASK KRISHNA DIALOGUE BUTTON ─────────────────────────────────── */}
          <div className="text-center pt-2">
            <button
              onClick={handleAskKrishna}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-amber-600 text-[#090a0f] font-serif font-bold text-xs sm:text-sm shadow-xl hover:scale-102 transition-transform cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>इस श्लोक पर कृष्ण AI से दिव्य संवाद करें 🪔</span>
            </button>
          </div>

        </div>
      )}

      {/* ── BOTTOM STICKY NAVIGATION BAR (PREV / NEXT SHLOKA) ──────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#08090f]/90 backdrop-blur-xl border-t border-[#c5a059]/30 shadow-2xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          
          <button
            onClick={() => {
              if (onPrev) {
                onPrev();
              } else if (verse.verse > 1) {
                router.push(`/chapter/${verse.chapter}/${verse.verse - 1}`);
              }
              sacredAudio.playNavChime(0.06);
            }}
            disabled={verse.chapter === 1 && verse.verse === 1}
            className="px-4 py-2 rounded-xl bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/30 text-xs font-serif text-[#e6c687] disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <SkipBack className="w-3.5 h-3.5" />
            <span>पिछला श्लोक</span>
          </button>

          <span className="text-xs font-mono font-bold text-[#c5a059]">
            श्लोक {verse.chapter}.{verse.verse}
          </span>

          <button
            onClick={() => {
              if (onNext) {
                onNext();
              } else if (verse.verse < chapterInfo.verses_count) {
                router.push(`/chapter/${verse.chapter}/${verse.verse + 1}`);
              }
              sacredAudio.playNavChime(0.06);
            }}
            disabled={verse.chapter === 18 && verse.verse === chapterInfo.verses_count}
            className="px-4 py-2 rounded-xl bg-[#141624] hover:bg-[#1f2238] border border-[#c5a059]/30 text-xs font-serif text-[#e6c687] disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>अगला श्लोक</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>

        </div>
      </div>

    </div>
  );
}
