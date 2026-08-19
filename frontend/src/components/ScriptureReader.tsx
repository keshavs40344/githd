'use client';

import React, { useState, useEffect } from 'react';
import type { GitaVerse, AnvayaToken } from '../types/verse';
import type { SevenLayerMentorDiagnosis, GunaType } from '../types/mentor';
import WisdomCardModal from './WisdomCardModal';
import { 
  Bookmark, BookmarkCheck, Copy, Check, ChevronRight, ChevronLeft, 
  Sparkles, BookOpen, Volume2, VolumeX, Share2, Compass, Globe2, 
  Layers, Radio, RefreshCw, Disc3, Play, Pause, ShieldCheck, Heart, Lightbulb,
  Music, Bell, Disc, Sparkle, Flame, CheckCircle2, Award, ZoomIn, ZoomOut, FileText,
  SlidersHorizontal, BookmarkPlus
} from 'lucide-react';
import { sacredAudio } from '@/lib/sacredSounds';
import { getGitaVideoForVerse } from '@/data/gitaVideoEpisodes';

interface ScriptureReaderProps {
  verse: GitaVerse;
  onWordClick?: (token: AnvayaToken) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

type LangCode = 'hi' | 'en' | 'sa' | 'mr' | 'gu' | 'bn' | 'ta' | 'te' | 'kn';
type CommentaryTab = 'translation' | 'bhashya' | 'insight' | 'anvaya';

const LANGUAGES: { code: LangCode; label: string; flag: string }[] = [
  { code: 'hi', label: 'हिन्दी',    flag: '🇮🇳' },
  { code: 'en', label: 'English',  flag: '🇬🇧' },
  { code: 'sa', label: 'संस्कृतम्', flag: '🕉️' },
  { code: 'mr', label: 'मराठी',    flag: '🇮🇳' },
  { code: 'gu', label: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'bn', label: 'বাংলা',    flag: '🇮🇳' },
  { code: 'ta', label: 'தமிழ்',    flag: '🇮🇳' },
  { code: 'te', label: 'తెలుగు',   flag: '🇮🇳' },
  { code: 'kn', label: 'ಕನ್ನಡ',   flag: '🇮🇳' },
];

export default function ScriptureReader({
  verse,
  onWordClick,
  onNext,
  onPrev,
}: ScriptureReaderProps) {
  const [selectedLang, setSelectedLang] = useState<LangCode>('hi');
  const [activeCommentaryTab, setActiveCommentaryTab] = useState<CommentaryTab>('translation');
  const [dynamicData, setDynamicData] = useState<any>(null);
  const [isLoadingLang, setIsLoadingLang] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isContemplated, setIsContemplated] = useState(false);
  const [showWisdomCard, setShowWisdomCard] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<'std' | 'med' | 'max'>('med');

  // Pure Shloka Music Player State
  const [isPlayingShlokaMusic, setIsPlayingShlokaMusic] = useState(false);
  const [shlokaPlaybackSeconds, setShlokaPlaybackSeconds] = useState(0);

  // Audio stream data
  const shlokaAudioData = getGitaVideoForVerse(verse.chapter, verse.verse);

  // Playback timer
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isPlayingShlokaMusic) {
      interval = setInterval(() => {
        setShlokaPlaybackSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlayingShlokaMusic]);

  // Reset audio on verse change
  useEffect(() => {
    setIsPlayingShlokaMusic(false);
    setShlokaPlaybackSeconds(0);
  }, [verse.chapter, verse.verse]);

  // Sync bookmarks & contemplation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved: string[] = JSON.parse(localStorage.getItem('dharma_saved_verses') || '[]');
        const contemplated: string[] = JSON.parse(localStorage.getItem('dharma_contemplated_verses') || '[]');
        const key = `${verse.chapter}:${verse.verse}`;
        setIsBookmarked(saved.includes(key));
        setIsContemplated(contemplated.includes(key));
      } catch {}
    }
  }, [verse.chapter, verse.verse]);

  const handleLanguageChange = async (lang: LangCode) => {
    setSelectedLang(lang);
    sacredAudio.playNavChime(0.08);

    if (lang === 'hi' || lang === 'en') {
      setDynamicData(null);
      return;
    }

    setIsLoadingLang(true);
    try {
      const res = await fetch(`/api/v1/shloka?chapter=${verse.chapter}&verse=${verse.verse}&target_lang=${lang}`);
      const data = await res.json();
      if (data.success && data.data) {
        setDynamicData(data.data);
      }
    } catch (e) {
      console.warn('Language translation error:', e);
    } finally {
      setIsLoadingLang(false);
    }
  };

  const toggleBookmark = () => {
    if (typeof window !== 'undefined') {
      const saved: string[] = JSON.parse(localStorage.getItem('dharma_saved_verses') || '[]');
      const key = `${verse.chapter}:${verse.verse}`;
      let nextState = false;

      if (saved.includes(key)) {
        const filtered = saved.filter(k => k !== key);
        localStorage.setItem('dharma_saved_verses', JSON.stringify(filtered));
        nextState = false;
      } else {
        saved.push(key);
        localStorage.setItem('dharma_saved_verses', JSON.stringify(saved));
        nextState = true;
        sacredAudio.playTempleBell(0.3);
      }
      setIsBookmarked(nextState);
      window.dispatchEvent(new Event('dharma_saved_verses_updated'));
    }
  };

  const toggleContemplation = () => {
    if (typeof window !== 'undefined') {
      const list: string[] = JSON.parse(localStorage.getItem('dharma_contemplated_verses') || '[]');
      const key = `${verse.chapter}:${verse.verse}`;
      let nextVal = false;

      if (list.includes(key)) {
        const filtered = list.filter(k => k !== key);
        localStorage.setItem('dharma_contemplated_verses', JSON.stringify(filtered));
        nextVal = false;
      } else {
        list.push(key);
        localStorage.setItem('dharma_contemplated_verses', JSON.stringify(list));
        nextVal = true;
        sacredAudio.playTempleBell(0.45);
      }
      setIsContemplated(nextVal);
    }
  };

  const copyToClipboard = () => {
    const text = `श्रीमद्भगवद्गीता (अध्याय ${verse.chapter}, श्लोक ${verse.verse})\n\n${verse.devanagari}\n\n${verse.iast}\n\nअर्थ: ${getActiveTranslation()}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    sacredAudio.playNavChime(0.1);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleShlokaMusic = () => {
    const nextState = !isPlayingShlokaMusic;
    setIsPlayingShlokaMusic(nextState);
    if (nextState) {
      sacredAudio.playTempleBell(0.3);
    } else {
      sacredAudio.playNavChime(0.08);
    }
  };

  const formatSeconds = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getActiveTranslation = () => {
    if (dynamicData?.translation_target) return dynamicData.translation_target;
    if (selectedLang === 'hi') return verse.translation_hi || dynamicData?.translation_hi || verse.translation_en;
    if (selectedLang === 'en') return verse.translation_en || dynamicData?.translation_en || verse.translation_hi;
    return verse.translation_hi || verse.translation_en;
  };

  const getActiveBhashya = () => {
    if (dynamicData?.bhashya_target) return dynamicData.bhashya_target;
    if (selectedLang === 'hi') {
      return (verse as any).bhashya_hi || "इस श्लोक में भगवान श्री कृष्ण आत्मा की अमरता, निष्काम कर्म और चित्त की एकाग्रता का रहस्य उद्घाटित करते हैं। जो साधक फल की आसक्ति त्यागकर समत्व भाव से कर्म करता है, वह समस्त संशयों और दुखों से मुक्त होकर परम शांति को प्राप्त होता है।";
    }
    return (verse as any).bhashya_en || "In this profound verse, Lord Krishna illuminates the timeless truth of selfless duty, transcendental equanimity, and inner freedom. By releasing anxiety over outcomes, the mind attains unwavering clarity and profound peace.";
  };

  const activeTokens = dynamicData?.anvaya_tokens?.length > 0 
    ? dynamicData.anvaya_tokens 
    : (verse.anvaya_tokens || []);

  const fontSizes = {
    std: 'text-lg sm:text-xl md:text-2xl leading-relaxed',
    med: 'text-xl sm:text-2xl md:text-3xl leading-loose',
    max: 'text-2xl sm:text-3xl md:text-4xl leading-loose font-bold',
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-12 px-2 sm:px-0">
      
      {/* ── TOP UTILITY TOOLBAR ────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-[#0e0f17]/90 border border-[#c5a059]/20 rounded-2xl p-3 shadow-md backdrop-blur-md">
        
        {/* Chapter & Shloka Pill Badge */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#c5a059]/15 border border-[#c5a059]/40 flex items-center justify-center text-[#e6c687] font-serif font-bold text-xs">
            ॐ
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif font-bold text-[#f5eed9] text-sm tracking-wide">
              अध्याय {verse.chapter}
            </span>
            <span className="text-[#c5a059]/60 text-xs font-mono">·</span>
            <span className="font-mono text-xs text-[#c5a059] font-semibold">
              श्लोक {verse.verse}
            </span>
          </div>
        </div>

        {/* Action Buttons (Font Scale, Copy, Bookmark, Sadhana) */}
        <div className="flex items-center gap-1.5">
          
          {/* Font Scaler Toggle */}
          <div className="flex items-center bg-[#151722] border border-[#c5a059]/20 rounded-xl p-0.5">
            {(['std', 'med', 'max'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => {
                  setFontSizeLevel(lvl);
                  sacredAudio.playNavChime(0.06);
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-sans font-semibold transition-all cursor-pointer ${
                  fontSizeLevel === lvl
                    ? 'bg-[#c5a059] text-[#090a0f] shadow-sm font-bold'
                    : 'text-[#c5a059]/60 hover:text-[#f5eed9]'
                }`}
              >
                {lvl === 'std' ? 'Aa' : lvl === 'med' ? 'Aa+' : 'Aa++'}
              </button>
            ))}
          </div>

          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-xl bg-[#151722] hover:bg-[#1f2232] border border-[#c5a059]/20 text-[#c5a059] hover:text-[#f5eed9] transition-colors cursor-pointer"
            title="श्लोक कॉपी करें"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Bookmark Button */}
          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isBookmarked
                ? 'bg-[#c5a059]/20 text-[#e6c687] border-[#c5a059]'
                : 'bg-[#151722] hover:bg-[#1f2232] text-[#c5a059]/60 border-[#c5a059]/20 hover:text-[#e6c687]'
            }`}
            title="श्लोक सहेजें (Save Verse)"
          >
            {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5 text-[#e6c687]" /> : <Bookmark className="w-3.5 h-3.5" />}
          </button>

          {/* Contemplation Check Button */}
          <button
            onClick={toggleContemplation}
            className={`px-3 py-1.5 rounded-xl border text-xs font-sans font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              isContemplated
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                : 'bg-[#151722] hover:bg-emerald-500/10 border-[#c5a059]/20 text-[#c5a059]/80 hover:border-emerald-500/30'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isContemplated ? 'text-emerald-400' : 'text-[#c5a059]/50'}`} />
            <span className="hidden sm:inline">{isContemplated ? 'मनन पूर्ण' : 'मनन करें'}</span>
          </button>

        </div>

      </div>

      {/* ── SACRED SHLOKA ALTAR CARD (Bespoke Editorial Presentation) ─── */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#12131d] via-[#0d0e16] to-[#090a0f] border border-[#c5a059]/25 p-6 sm:p-10 shadow-2xl overflow-hidden space-y-6">
        
        {/* Subtle Brass Inlay Corner Accents */}
        <div className="absolute top-3 left-3 text-[#c5a059]/25 text-xs font-serif select-none pointer-events-none">𑁍</div>
        <div className="absolute top-3 right-3 text-[#c5a059]/25 text-xs font-serif select-none pointer-events-none">𑁍</div>
        <div className="absolute bottom-3 left-3 text-[#c5a059]/25 text-xs font-serif select-none pointer-events-none">𑁍</div>
        <div className="absolute bottom-3 right-3 text-[#c5a059]/25 text-xs font-serif select-none pointer-events-none">𑁍</div>

        {/* Sacred Header Inscription */}
        <div className="text-center space-y-1 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#c5a059]/70 font-serif font-semibold">
            श्रीमद्भगवद्गीता · अध्याय {verse.chapter}
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent mx-auto mt-2" />
        </div>

        {/* ── DEVANAGARI SHLOKA TEXT ── */}
        <div className="text-center py-2 relative z-10">
          <p className={`font-devanagari text-[#f5eed9] text-shadow-sm transition-all ${fontSizes[fontSizeLevel]}`}>
            {verse.devanagari.split('\n').map((line, idx) => (
              <span key={idx} className="block py-1">
                {line}
              </span>
            ))}
          </p>
        </div>

        {/* IAST Transliteration */}
        <div className="text-center relative z-10 border-t border-[#c5a059]/10 pt-4">
          <p className="text-xs sm:text-sm md:text-base text-[#c5a059]/75 font-serif italic tracking-wide max-w-2xl mx-auto leading-relaxed">
            {verse.iast}
          </p>
        </div>

        {/* ── PURE SHLOKA ACOUSTIC PLAYER (Tactile, Non-Robotic) ── */}
        <div className="mt-4 pt-4 border-t border-[#c5a059]/15 relative z-10">
          <div className="rounded-2xl bg-[#090a0f]/80 border border-[#c5a059]/20 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Left: Play/Pause button & Track Info */}
            <div className="flex items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={toggleShlokaMusic}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-md ${
                  isPlayingShlokaMusic
                    ? 'bg-gradient-to-br from-[#e6c687] to-[#c5a059] text-[#090a0f] scale-105 shadow-[0_0_20px_rgba(197,160,89,0.5)]'
                    : 'bg-[#181a26] hover:bg-[#202435] text-[#e6c687] border border-[#c5a059]/30 hover:border-[#c5a059]'
                }`}
              >
                {isPlayingShlokaMusic ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
              </button>

              <div className="flex flex-col">
                <span className="text-xs font-serif font-bold text-[#f5eed9]">
                  {shlokaAudioData.title}
                </span>
                <span className="text-[11px] text-[#c5a059]/70 font-sans">
                  {isPlayingShlokaMusic ? `वादन जारी (${formatSeconds(shlokaPlaybackSeconds)})` : 'पवित्र श्लोक स्वर एवं बांसुरी वादन'}
                </span>
              </div>
            </div>

            {/* Right: Sacred Bell, Conch & Flute Chime Triggers */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => sacredAudio.playTempleBell(0.4)}
                className="px-2.5 py-1.5 rounded-xl bg-[#151722] hover:bg-[#1f2232] border border-[#c5a059]/20 text-xs text-[#e6c687] flex items-center gap-1 transition-colors cursor-pointer"
                title="मंदिर घण्टी ध्वनि"
              >
                🔔 <span className="hidden xs:inline text-[10px]">घण्टी</span>
              </button>
              <button
                onClick={() => sacredAudio.playShankhnaad(0.35)}
                className="px-2.5 py-1.5 rounded-xl bg-[#151722] hover:bg-[#1f2232] border border-[#c5a059]/20 text-xs text-[#e6c687] flex items-center gap-1 transition-colors cursor-pointer"
                title="शंख नाद"
              >
                🐚 <span className="hidden xs:inline text-[10px]">शंख</span>
              </button>
              <button
                onClick={() => sacredAudio.playFluteChime(0.35)}
                className="px-2.5 py-1.5 rounded-xl bg-[#151722] hover:bg-[#1f2232] border border-[#c5a059]/20 text-xs text-[#e6c687] flex items-center gap-1 transition-colors cursor-pointer"
                title="कृष्ण बाँसुरी"
              >
                🪈 <span className="hidden xs:inline text-[10px]">बाँसुरी</span>
              </button>
            </div>

          </div>

          {/* Hidden YouTube audio stream */}
          {isPlayingShlokaMusic && (
            <div className="fixed -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${shlokaAudioData.videoId}?autoplay=1&controls=0&playsinline=1&rel=0&modestbranding=1`}
                title="Shloka Audio Stream"
                allow="autoplay"
              />
            </div>
          )}
        </div>

      </div>

      {/* ── SCHOLARLY 4-LAYER COMMENTARY DESK ──────────────────────────── */}
      <div className="rounded-3xl bg-[#0e0f17]/95 border border-[#c5a059]/20 p-5 sm:p-8 shadow-xl space-y-5">
        
        {/* Navigation Tabs (Translation, Bhashya, Insight, Grammar) */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#c5a059]/15 pb-4">
          
          <div className="flex items-center gap-1 bg-[#090a0f] p-1 rounded-2xl border border-[#c5a059]/20">
            {[
              { id: 'translation', label: '📖 सरलार्थ' },
              { id: 'bhashya',     label: '📜 शास्त्रीय भाष्य' },
              { id: 'insight',     label: '💡 जीवन सूत्र' },
              { id: 'anvaya',      label: '🪷 पदच्छेद' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCommentaryTab(tab.id as CommentaryTab);
                  sacredAudio.playNavChime(0.08);
                }}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-sans font-medium transition-all cursor-pointer ${
                  activeCommentaryTab === tab.id
                    ? 'bg-[#c5a059] text-[#090a0f] font-bold shadow-md'
                    : 'text-[#c5a059]/70 hover:text-[#f5eed9]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Language Selector Dropdown */}
          <div className="flex items-center gap-2">
            <Globe2 className="w-3.5 h-3.5 text-[#c5a059]/60" />
            <select
              value={selectedLang}
              onChange={(e) => handleLanguageChange(e.target.value as LangCode)}
              className="bg-[#090a0f] border border-[#c5a059]/25 rounded-xl px-2.5 py-1 text-xs text-[#e6c687] font-sans focus:outline-none focus:border-[#c5a059] cursor-pointer"
            >
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code} className="bg-[#090a0f] text-[#f5eed9]">
                  {lang.flag} {lang.label}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Tab 1: सरलार्थ (Translation) */}
        {activeCommentaryTab === 'translation' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            {isLoadingLang ? (
              <div className="py-8 text-center text-xs text-[#c5a059]/60 animate-pulse">
                अनुवाद लोड हो रहा है...
              </div>
            ) : (
              <p className="text-sm sm:text-base md:text-lg text-[#f5eed9] font-sans leading-relaxed">
                {getActiveTranslation()}
              </p>
            )}
          </div>
        )}

        {/* Tab 2: शास्त्रीय भाष्य (Scholarly Commentary) */}
        {activeCommentaryTab === 'bhashya' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <p className="text-sm sm:text-base text-[#e6c687] font-serif leading-relaxed italic bg-[#090a0f]/60 p-4 rounded-2xl border border-[#c5a059]/15">
              {getActiveBhashya()}
            </p>
          </div>
        )}

        {/* Tab 3: जीवन सूत्र (Life Insight) */}
        {activeCommentaryTab === 'insight' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#181a26] to-[#12131d] border border-[#c5a059]/20 space-y-2">
              <div className="flex items-center gap-2 text-[#e6c687] font-serif text-sm font-bold">
                <Lightbulb className="w-4 h-4 text-[#c5a059]" />
                <span>व्यावहारिक जीवन अनुप्रयोग (Practical Blueprint)</span>
              </div>
              <p className="text-xs sm:text-sm text-[#f5eed9]/90 font-sans leading-relaxed">
                {verse.practical_insight}
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: पदच्छेद (Word Deconstruction) */}
        {activeCommentaryTab === 'anvaya' && (
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {activeTokens.map((tok: any, idx: number) => (
                <div
                  key={idx}
                  onClick={() => onWordClick && onWordClick(tok)}
                  className="p-2.5 rounded-xl bg-[#090a0f] border border-[#c5a059]/20 hover:border-[#c5a059] transition-all cursor-pointer group"
                >
                  <p className="font-devanagari text-xs font-bold text-[#e6c687] group-hover:text-[#f5eed9]">
                    {tok.word || tok.sanskrit_word}
                  </p>
                  <p className="text-[11px] text-[#f5eed9]/80 font-sans truncate mt-0.5">
                    {tok.meaning || tok.meaning_hi || tok.meaning_en}
                  </p>
                  {tok.dhatu && (
                    <span className="text-[9px] font-mono text-[#c5a059]/60">
                      धातु: {tok.dhatu}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── BOTTOM PREV / NEXT SHLOKA NAVIGATION ─────────────────────── */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#0e0f17] hover:bg-[#151722] border border-[#c5a059]/25 hover:border-[#c5a059] text-xs font-serif text-[#e6c687] transition-all cursor-pointer shadow-md"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>पूर्व श्लोक (Previous)</span>
        </button>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#c5a059] to-[#b38e46] hover:brightness-110 text-[#090a0f] font-bold font-serif text-xs transition-all cursor-pointer shadow-md"
        >
          <span>अगला श्लोक (Next)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
