'use client';

import React, { useState, useEffect } from 'react';
import type { GitaVerse, AnvayaToken } from '../types/verse';
import { useLanguage, SUPPORTED_LANGUAGES, type AppLanguage } from '@/context/LanguageContext';
import { getComprehensiveVerse } from '@/data/canonicalGitaTranslations';
import { getGitaVideoForVerse } from '@/data/gitaVideoEpisodes';
import { sacredAudio } from '@/lib/sacredSounds';
import { 
  Bookmark, BookmarkCheck, Copy, Check, ChevronRight, ChevronLeft, 
  Sparkles, BookOpen, Volume2, Globe, Play, Pause, Lightbulb, 
  FileText, Layers, Share2, CheckCircle2, ShieldCheck, Disc
} from 'lucide-react';

interface ScriptureReaderProps {
  verse: GitaVerse;
  onWordClick?: (token: AnvayaToken) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export default function ScriptureReader({
  verse,
  onWordClick,
  onNext,
  onPrev,
}: ScriptureReaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [dynamicData, setDynamicData] = useState<any>(null);
  const [isLoadingLang, setIsLoadingLang] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isContemplated, setIsContemplated] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<'std' | 'med' | 'max'>('med');

  // Audio stream state
  const [isPlayingShlokaMusic, setIsPlayingShlokaMusic] = useState(false);
  const [shlokaPlaybackSeconds, setShlokaPlaybackSeconds] = useState(0);

  const shlokaAudioData = getGitaVideoForVerse(verse.chapter, verse.verse);
  const canonical = getComprehensiveVerse(verse.chapter, verse.verse);

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

  // Fetch translation whenever language or verse changes
  useEffect(() => {
    // If we have canonical data for this language, use it immediately
    if (canonical) {
      setDynamicData(null);
      return;
    }

    // Otherwise fetch dynamic translation from API
    setIsLoadingLang(true);
    fetch(`/api/v1/shloka?chapter=${verse.chapter}&verse=${verse.verse}&lang=${language}`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setDynamicData(res.data);
        }
      })
      .catch(err => console.warn('Shloka language fetch error:', err))
      .finally(() => setIsLoadingLang(false));
  }, [verse.chapter, verse.verse, language, canonical]);

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

  // Resolve active translation, bhashya, insight and anvaya tokens based on language
  const getActiveTranslation = () => {
    if (canonical?.translation?.[language]) return canonical.translation[language];
    if (dynamicData?.translation) return dynamicData.translation;
    if (language === 'hi') return verse.translation_hi;
    if (language === 'en') return verse.translation_en;
    return canonical?.translation?.hinglish || verse.translation_hi || verse.translation_en;
  };

  const getActiveBhashya = () => {
    if (canonical?.deep_bhashya?.[language]) return canonical.deep_bhashya[language];
    if (dynamicData?.deep_bhashya) return dynamicData.deep_bhashya;
    if (language === 'hi') {
      return (verse as any).bhashya_hi || "इस श्लोक में भगवान श्री कृष्ण आत्मा की अमरता, निष्काम कर्तव्य पालन और चित्त की एकाग्रता का रहस्य उद्घाटित करते हैं। जो साधक फल की कामना त्यागकर समत्व भाव से कर्म करता है, वह समस्त संशयों और दुखों से मुक्त होकर परम पद को प्राप्त होता है।";
    }
    if (language === 'en') {
      return (verse as any).bhashya_en || "In this sacred verse, Lord Krishna reveals the timeless truth of selfless duty, transcendental equanimity, and the eternal nature of consciousness. By relinquishing anxiety over outcomes, the intellect achieves flawless focus and liberation.";
    }
    return canonical?.deep_bhashya?.hinglish || "Is shloka me Shri Krishna Nishkama Karma aur focus ka deep secret batate hain ki bina result ki chinta kiye 100% present me kaam karna hi asli yoga hai.";
  };

  const getActiveInsight = () => {
    if (canonical?.practical_insight?.[language]) return canonical.practical_insight[language];
    if (dynamicData?.practical_insight) return dynamicData.practical_insight;
    return verse.practical_insight;
  };

  const getActiveAnvayaTokens = () => {
    if (canonical?.word_anvaya) {
      return canonical.word_anvaya.map(w => ({
        word: w.word,
        iast: w.iast,
        dhatu: w.dhatu,
        vibhakti: w.vibhakti,
        meaning: w.meaning[language] || w.meaning.hinglish || w.meaning.hi || w.meaning.en || '-'
      }));
    }
    if (dynamicData?.anvaya_tokens?.length) return dynamicData.anvaya_tokens;
    if (verse.anvaya_tokens?.length) {
      return verse.anvaya_tokens.map(t => ({
        word: t.word,
        iast: t.iast,
        dhatu: t.dhatu,
        vibhakti: t.vibhakti,
        meaning: language === 'en' ? t.meaning_en : t.meaning_hi
      }));
    }
    return [];
  };

  const copyToClipboard = () => {
    const text = `श्रीमद्भगवद्गीता (अध्याय ${verse.chapter}, श्लोक ${verse.verse})\n\n${verse.devanagari}\n\n${verse.iast}\n\nअर्थ: ${getActiveTranslation()}\n\nभाष्य: ${getActiveBhashya()}`;
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

  const fontSizes = {
    std: 'text-lg sm:text-xl md:text-2xl leading-relaxed',
    med: 'text-xl sm:text-2xl md:text-3xl leading-loose',
    max: 'text-2xl sm:text-3xl md:text-4xl leading-loose font-bold',
  };

  const activeTokens = getActiveAnvayaTokens();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-12 px-2 sm:px-0">
      
      {/* ── TOP UTILITY TOOLBAR (Font, Language, Audio, Actions) ───────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0d0e16]/95 border border-[#c5a059]/25 rounded-3xl p-3.5 sm:p-4 shadow-xl backdrop-blur-xl">
        
        {/* Chapter & Shloka Badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#e6c687] to-[#c5a059] flex items-center justify-center text-[#090a0f] font-serif font-bold text-xs shadow-md">
            ॐ
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif font-bold text-[#f5eed9] text-sm tracking-wide">
              {t('chapter')} {verse.chapter}
            </span>
            <span className="text-[#c5a059]/60 text-xs font-mono">·</span>
            <span className="font-mono text-xs text-[#c5a059] font-bold">
              {t('verse')} {verse.verse}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          
          {/* Master Global Language Selector */}
          <div className="flex items-center gap-1.5 bg-[#141622] border border-[#c5a059]/30 rounded-2xl px-2.5 py-1.5 shadow-inner">
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

          {/* Font Scaler */}
          <div className="flex items-center bg-[#141622] border border-[#c5a059]/20 rounded-2xl p-0.5">
            {(['std', 'med', 'max'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => {
                  setFontSizeLevel(lvl);
                  sacredAudio.playNavChime(0.06);
                }}
                className={`px-2 py-1 rounded-xl text-[10px] font-sans font-semibold transition-all cursor-pointer ${
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
            className="p-2 rounded-xl bg-[#141622] hover:bg-[#1f2232] border border-[#c5a059]/20 text-[#c5a059] hover:text-[#f5eed9] transition-colors cursor-pointer"
            title={t('copy_verse')}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Bookmark Button */}
          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isBookmarked
                ? 'bg-[#c5a059]/20 text-[#e6c687] border-[#c5a059]'
                : 'bg-[#141622] hover:bg-[#1f2232] text-[#c5a059]/60 border-[#c5a059]/20 hover:text-[#e6c687]'
            }`}
            title={t('save_verse')}
          >
            {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5 text-[#e6c687]" /> : <Bookmark className="w-3.5 h-3.5" />}
          </button>

          {/* Contemplation Check Button */}
          <button
            onClick={toggleContemplation}
            className={`px-3 py-1.5 rounded-xl border text-xs font-sans font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              isContemplated
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                : 'bg-[#141622] hover:bg-emerald-500/10 border-[#c5a059]/20 text-[#c5a059]/80 hover:border-emerald-500/30'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isContemplated ? 'text-emerald-400' : 'text-[#c5a059]/50'}`} />
            <span className="hidden sm:inline">{isContemplated ? 'मनन पूर्ण' : 'मनन करें'}</span>
          </button>

        </div>

      </div>

      {/* ── TIER 1: SACRED SHLOKA ALTAR CARD ───────────────────────────── */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#141622] via-[#0d0e16] to-[#07080c] border border-[#c5a059]/30 p-6 sm:p-10 shadow-2xl overflow-hidden space-y-6">
        
        {/* Subtle Brass Corner Filigree */}
        <div className="absolute top-3 left-3 text-[#c5a059]/25 text-xs font-serif select-none pointer-events-none">𑁍</div>
        <div className="absolute top-3 right-3 text-[#c5a059]/25 text-xs font-serif select-none pointer-events-none">𑁍</div>
        <div className="absolute bottom-3 left-3 text-[#c5a059]/25 text-xs font-serif select-none pointer-events-none">𑁍</div>
        <div className="absolute bottom-3 right-3 text-[#c5a059]/25 text-xs font-serif select-none pointer-events-none">𑁍</div>

        {/* Inscription Header */}
        <div className="text-center space-y-1 relative z-10">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#c5a059]/80 font-serif font-bold">
            श्रीमद्भगवद्गीता · {t('chapter')} {verse.chapter} · {t('verse')} {verse.verse}
          </p>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent mx-auto mt-2" />
        </div>

        {/* Devanagari Sanskrit Verse */}
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
        <div className="text-center relative z-10 border-t border-[#c5a059]/15 pt-4">
          <p className="text-xs sm:text-sm md:text-base text-[#c5a059]/85 font-serif italic tracking-wide max-w-2xl mx-auto leading-relaxed">
            {verse.iast}
          </p>
        </div>

        {/* Shloka Acoustic Recitation Bar */}
        <div className="mt-4 pt-4 border-t border-[#c5a059]/15 relative z-10">
          <div className="rounded-2xl bg-[#090a0f]/90 border border-[#c5a059]/25 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            
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
                  {isPlayingShlokaMusic ? `${t('playing')} (${formatSeconds(shlokaPlaybackSeconds)})` : t('listen_audio')}
                </span>
              </div>
            </div>

            {/* Sacred Acoustic Chimes */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => sacredAudio.playTempleBell(0.4)}
                className="px-2.5 py-1.5 rounded-xl bg-[#141622] hover:bg-[#1f2232] border border-[#c5a059]/25 text-xs text-[#e6c687] flex items-center gap-1 transition-colors cursor-pointer"
                title="मंदिर घण्टी"
              >
                🔔 <span className="hidden xs:inline text-[10px]">घण्टी</span>
              </button>
              <button
                onClick={() => sacredAudio.playShankhnaad(0.35)}
                className="px-2.5 py-1.5 rounded-xl bg-[#141622] hover:bg-[#1f2232] border border-[#c5a059]/25 text-xs text-[#e6c687] flex items-center gap-1 transition-colors cursor-pointer"
                title="शंख नाद"
              >
                🐚 <span className="hidden xs:inline text-[10px]">शंख</span>
              </button>
              <button
                onClick={() => sacredAudio.playFluteChime(0.35)}
                className="px-2.5 py-1.5 rounded-xl bg-[#141622] hover:bg-[#1f2232] border border-[#c5a059]/25 text-xs text-[#e6c687] flex items-center gap-1 transition-colors cursor-pointer"
                title="कृष्ण बाँसुरी"
              >
                🪈 <span className="hidden xs:inline text-[10px]">बाँसुरी</span>
              </button>
            </div>

          </div>

          {/* Background Audio Stream */}
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

      {/* ── TIER 2: WORD-BY-WORD ANVAYA (हर शब्द का अन्वय एवं पद-अर्थ) ─── */}
      <div className="rounded-3xl bg-[#0d0e16]/95 border border-[#c5a059]/25 p-5 sm:p-7 shadow-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-[#c5a059]/15 pb-3">
          <div className="w-6 h-6 rounded-lg bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#e6c687] text-xs font-serif">
            🪷
          </div>
          <div>
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#f5eed9]">
              {t('word_meaning')}
            </h3>
            <p className="text-[11px] text-[#c5a059]/70 font-sans">
              संस्कृत के प्रत्येक पद का विच्छेद एवं सटीक अर्थ:
            </p>
          </div>
        </div>

        {/* Word Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {activeTokens.map((tok: any, idx: number) => (
            <div
              key={idx}
              onClick={() => onWordClick && onWordClick(tok)}
              className="p-3 rounded-2xl bg-[#141622]/90 border border-[#c5a059]/20 hover:border-[#c5a059] transition-all cursor-pointer group shadow-sm hover:scale-102"
            >
              <div className="flex items-baseline justify-between">
                <p className="font-devanagari text-xs sm:text-sm font-bold text-[#e6c687] group-hover:text-[#f5eed9]">
                  {tok.word}
                </p>
                {tok.iast && (
                  <span className="text-[9px] font-serif italic text-[#c5a059]/60">
                    {tok.iast}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#f5eed9]/90 font-sans mt-1 leading-snug">
                {tok.meaning}
              </p>
              {(tok.dhatu || tok.vibhakti) && (
                <div className="mt-1.5 pt-1.5 border-t border-[#c5a059]/10 flex items-center justify-between text-[9px] font-mono text-[#c5a059]/60">
                  <span>{tok.dhatu !== '-' ? `धातु: ${tok.dhatu}` : ''}</span>
                  <span className="truncate max-w-[80px]">{tok.vibhakti !== '-' ? tok.vibhakti : ''}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── TIER 3: CORE TRANSLATION (सरल श्लोक भावार्थ / अनुवाद) ─────────── */}
      <div className="rounded-3xl bg-gradient-to-r from-[#141622] via-[#0d0e16] to-[#12131d] border border-[#c5a059]/25 p-5 sm:p-7 shadow-xl space-y-3">
        <div className="flex items-center gap-2 border-b border-[#c5a059]/15 pb-3">
          <div className="w-6 h-6 rounded-lg bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#e6c687] text-xs font-serif">
            📖
          </div>
          <h3 className="font-serif font-bold text-sm sm:text-base text-[#f5eed9]">
            {t('core_translation')}
          </h3>
        </div>

        {isLoadingLang ? (
          <div className="py-4 text-center text-xs text-[#c5a059]/60 animate-pulse">
            {t('loading')}
          </div>
        ) : (
          <p className="text-sm sm:text-base md:text-lg text-[#f5eed9] font-sans leading-relaxed">
            {getActiveTranslation()}
          </p>
        )}
      </div>

      {/* ── TIER 4: DEEP SCHOLARLY COMMENTARY (गहन शास्त्रीय भाष्य) ──────── */}
      <div className="rounded-3xl bg-[#0d0e16]/95 border border-[#c5a059]/25 p-5 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-[#c5a059]/15 pb-3">
          <div className="w-6 h-6 rounded-lg bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#e6c687] text-xs font-serif">
            📜
          </div>
          <div>
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#f5eed9]">
              {t('deep_bhashya')}
            </h3>
            <p className="text-[11px] text-[#c5a059]/70 font-sans">
              आदि शंकराचार्य, रामानुजाचार्य एवं दार्शनिक तत्त्वमीमांसा:
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs sm:text-sm md:text-base text-[#f5eed9]/95 font-sans leading-relaxed bg-[#07080c]/60 p-4 sm:p-6 rounded-2xl border border-[#c5a059]/15">
          {getActiveBhashya().split('\n\n').map((paragraph: string, idx: number) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* ── TIER 5: PRACTICAL MODERN LIFE BLUEPRINT (जीवन सूत्र) ────────── */}
      <div className="rounded-3xl bg-gradient-to-r from-[#181a26] via-[#141622] to-[#0e0f17] border border-[#c5a059]/30 p-5 sm:p-7 shadow-xl space-y-3">
        <div className="flex items-center gap-2 border-b border-[#c5a059]/15 pb-3 text-[#e6c687]">
          <div className="w-6 h-6 rounded-lg bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#e6c687] text-xs font-serif">
            💡
          </div>
          <h3 className="font-serif font-bold text-sm sm:text-base text-[#f5eed9]">
            {t('life_blueprint')}
          </h3>
        </div>

        <p className="text-xs sm:text-sm md:text-base text-[#f5eed9] font-sans leading-relaxed">
          {getActiveInsight()}
        </p>
      </div>

      {/* ── BOTTOM PREV / NEXT SHLOKA NAVIGATION ─────────────────────────── */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#0d0e16] hover:bg-[#141622] border border-[#c5a059]/25 hover:border-[#c5a059] text-xs font-serif text-[#e6c687] transition-all cursor-pointer shadow-md"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t('prev_verse')}</span>
        </button>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#c5a059] to-[#b38e46] hover:brightness-110 text-[#090a0f] font-bold font-serif text-xs transition-all cursor-pointer shadow-md"
        >
          <span>{t('next_verse')}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
