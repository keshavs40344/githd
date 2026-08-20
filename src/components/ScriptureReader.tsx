'use client';

import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, BookOpen, Share2, 
  Bookmark, BookmarkCheck, ChevronLeft, ChevronRight, Check, Copy, CheckCircle2,
  Sliders, MessageSquare, Compass, Shield, Flame, SkipBack, SkipForward
} from 'lucide-react';
import { GitaVerse, AnvayaToken, CHAPTERS } from '@/types/verse';
import { getComprehensiveVerse } from '@/data/canonicalGitaTranslations';
import { generateUniversalVedicData } from '@/lib/universalVedicEngine';
import { getSpeakerForVerse, getChhandaForVerse } from '@/lib/universalVedicEngine';
import { sacredAudio } from '@/lib/sacredSounds';
import { useLanguage, type AppLanguage } from '@/context/LanguageContext';

interface ScriptureReaderProps {
  verse: GitaVerse;
  onNavigate?: (chapter: number, verse: number) => void;
  onNext?: () => void;
  onPrev?: () => void;
  onWordClick?: (token: AnvayaToken) => void;
}

export default function ScriptureReader({
  verse,
  onNavigate,
  onNext,
  onPrev,
  onWordClick
}: ScriptureReaderProps) {
  const { language, setLanguage, t } = useLanguage();
  
  // Display & Interaction States
  const [fontSizeLevel, setFontSizeLevel] = useState<'std' | 'med' | 'large'>('med');
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isContemplated, setIsContemplated] = useState(false);
  const [japaCount, setJapaCount] = useState(0);
  const [japaTarget, setJapaTarget] = useState(11);
  const [showKarmaReward, setShowKarmaReward] = useState(false);

  // Dynamic Content Data
  const [dynamicData, setDynamicData] = useState<any>(null);
  const [isLoadingLang, setIsLoadingLang] = useState(false);

  // Commentary Sampradaya Tab Selection (10 Distinct Authentic Lenses)
  const [activeSampradaya, setActiveSampradaya] = useState<
    'story' | 'mahatmya' | 'universal' | 'advaita' | 'vishishtadvaita' | 'dvaita' | 'jnaneshwari' | 'vivekananda' | 'science' | 'meditation'
  >('story');

  // Studio Audio Engine States
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isLoopingAudio, setIsLoopingAudio] = useState(true);
  const [isTanpuraActive, setIsTanpuraActive] = useState(true);
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.85);
  const [currentVibeIntensity, setCurrentVibeIntensity] = useState(0);

  const canonical = getComprehensiveVerse(verse.chapter, verse.verse);
  const universal = generateUniversalVedicData(verse.chapter, verse.verse);
  const speaker = getSpeakerForVerse(verse.chapter, verse.verse);
  const chhanda = getChhandaForVerse(verse.chapter, verse.verse);

  // Reset audio & Japa on verse change
  useEffect(() => {
    sacredAudio.stopSpeaking();
    setIsPlayingAudio(false);
    setCurrentVibeIntensity(0);
    setJapaCount(0);
    setShowKarmaReward(false);
  }, [verse.chapter, verse.verse]);

  // Audio animation visualizer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setCurrentVibeIntensity(Math.floor(Math.random() * 85) + 15);
      }, 150);
    } else {
      setCurrentVibeIntensity(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlayingAudio]);

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
    if (canonical) {
      setDynamicData(null);
      return;
    }

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
        sacredAudio.playNavChime(0.06);
      } else {
        saved.push(key);
        localStorage.setItem('dharma_saved_verses', JSON.stringify(saved));
        nextState = true;
        sacredAudio.playTempleBell(0.3);
        awardKarmaXP(15);
      }
      setIsBookmarked(nextState);
      window.dispatchEvent(new Event('dharma_saved_updated'));
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
        sacredAudio.playNavChime(0.06);
      } else {
        list.push(key);
        localStorage.setItem('dharma_contemplated_verses', JSON.stringify(list));
        nextVal = true;
        sacredAudio.playTempleBell(0.45);
        awardKarmaXP(50);
      }
      setIsContemplated(nextVal);
    }
  };

  const awardKarmaXP = (xp = 50) => {
    if (typeof window !== 'undefined') {
      const currentXP = parseInt(localStorage.getItem('dharma_karma_xp') || '250', 10);
      localStorage.setItem('dharma_karma_xp', String(currentXP + xp));
      setShowKarmaReward(true);
      setTimeout(() => setShowKarmaReward(false), 3000);
      window.dispatchEvent(new Event('dharma_karma_updated'));
    }
  };

  const handleJapaChant = () => {
    const next = japaCount + 1;
    setJapaCount(next);
    sacredAudio.vibrate(20);

    if (next >= japaTarget) {
      sacredAudio.playTempleBell(0.6);
      awardKarmaXP(108);
    } else {
      sacredAudio.playNavChime(0.08);
    }
  };

  const resetJapa = () => {
    setJapaCount(0);
    sacredAudio.playNavChime(0.06);
  };

  // Ultra-Clean Pure Audio Recitation (Zero Ads, Zero Irrelevant Promos)
  const toggleAudioPlayback = () => {
    if (isPlayingAudio) {
      sacredAudio.stopSpeaking();
      setIsPlayingAudio(false);
      setCurrentVibeIntensity(0);
      return;
    }

    sacredAudio.playTempleBell(0.25);
    if (isTanpuraActive) {
      sacredAudio.startTanpura(0.07);
    }
    
    setIsPlayingAudio(true);

    const cleanDevanagari = verse.devanagari.replace(/[0-9|।॥]/g, '').trim();
    const textToRecite = `${speaker.title}। ${cleanDevanagari}`;

    sacredAudio.speakSanskritVerse(
      textToRecite,
      speechSpeed,
      'hi-IN',
      () => {
        setIsPlayingAudio(true);
      },
      () => {
        if (isLoopingAudio) {
          setTimeout(() => {
            if (isLoopingAudio) {
              toggleAudioPlayback();
            }
          }, 600);
        } else {
          setIsPlayingAudio(false);
          sacredAudio.stopTanpura();
          setCurrentVibeIntensity(0);
        }
      },
      () => {
        setCurrentVibeIntensity(Math.floor(Math.random() * 80) + 20);
      }
    );
  };

  const handlePrevVerse = () => {
    sacredAudio.stopSpeaking();
    setIsPlayingAudio(false);
    sacredAudio.playNavChime(0.08);
    if (onPrev) {
      onPrev();
    } else if (onNavigate) {
      if (verse.verse > 1) {
        onNavigate(verse.chapter, verse.verse - 1);
      } else if (verse.chapter > 1) {
        onNavigate(verse.chapter - 1, 1);
      }
    }
  };

  const handleNextVerse = () => {
    sacredAudio.stopSpeaking();
    setIsPlayingAudio(false);
    sacredAudio.playNavChime(0.08);
    if (onNext) {
      onNext();
    } else if (onNavigate) {
      onNavigate(verse.chapter, verse.verse + 1);
    }
  };

  const handleAskKrishna = () => {
    sacredAudio.playFluteChime(0.4);
    if (typeof window !== 'undefined') {
      window.location.hash = 'mentor';
      sessionStorage.setItem('dharma_mentor_prefill', `हे कृष्ण! श्रीमद्भगवद्गीता के अध्याय ${verse.chapter}, श्लोक ${verse.verse} का मेरे जीवन में क्या वास्तविक संदेश है?`);
      window.dispatchEvent(new CustomEvent('dharma_ask_krishna', {
        detail: { chapter: verse.chapter, verse: verse.verse }
      }));
    }
  };

  const handleWordItemClick = (tok: AnvayaToken) => {
    sacredAudio.speakSanskritVerse(tok.word, 0.85, 'hi-IN');
    if (onWordClick) {
      onWordClick(tok);
    }
  };

  // Resolve active translation, bhashya, insight and anvaya tokens based on language
  const getActiveTranslation = () => {
    if (canonical?.translation?.[language]) return canonical.translation[language];
    if (dynamicData?.translation) return dynamicData.translation;
    const universalTrans = universal?.translation as Record<string, string> | undefined;
    if (universalTrans?.[language]) return universalTrans[language];
    if (language === 'hi') return verse.translation_hi;
    if (language === 'en') return verse.translation_en;
    return canonical?.translation?.hinglish || universalTrans?.hinglish || verse.translation_hi || verse.translation_en;
  };

  const getActiveBhashya = () => {
    if (activeSampradaya === 'story') return universal.sampradaya_notes.story;
    if (activeSampradaya === 'mahatmya') return universal.sampradaya_notes.mahatmya;
    if (activeSampradaya === 'advaita') return universal.sampradaya_notes.advaita;
    if (activeSampradaya === 'vishishtadvaita') return universal.sampradaya_notes.vishishtadvaita;
    if (activeSampradaya === 'dvaita') return universal.sampradaya_notes.dvaita;
    if (activeSampradaya === 'jnaneshwari') return universal.sampradaya_notes.jnaneshwari;
    if (activeSampradaya === 'vivekananda') return universal.sampradaya_notes.vivekananda;
    if (activeSampradaya === 'science') return universal.sampradaya_notes.science;
    if (activeSampradaya === 'meditation') return universal.sampradaya_notes.meditation;

    if (canonical?.deep_bhashya?.[language]) return canonical.deep_bhashya[language];
    if (dynamicData?.deep_bhashya) return dynamicData.deep_bhashya;
    const universalBhashya = universal?.deep_bhashya as Record<string, string> | undefined;
    if (universalBhashya?.[language]) return universalBhashya[language];
    return canonical?.deep_bhashya?.hinglish || universalBhashya?.hinglish || universal.sampradaya_notes.universal;
  };

  const getActiveInsight = () => {
    if (canonical?.practical_insight?.[language]) return canonical.practical_insight[language];
    if (dynamicData?.practical_insight) return dynamicData.practical_insight;
    const universalInsight = universal?.practical_insight as Record<string, string> | undefined;
    if (universalInsight?.[language]) return universalInsight[language];
    return verse.practical_insight || universalInsight?.hinglish || universalInsight?.hi;
  };

  const getActiveAnvayaTokens = () => {
    if (canonical?.word_anvaya) {
      return canonical.word_anvaya.map(w => {
        const m = w.meaning as Record<string, string>;
        return {
          word: w.word,
          iast: w.iast,
          dhatu: w.dhatu,
          vibhakti: w.vibhakti,
          meaning: m[language] || m.hinglish || m.hi || m.en || '-'
        };
      });
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
    return universal.anvaya_tokens.map(w => {
      const m = w.meaning as Record<string, string>;
      return {
        word: w.word,
        iast: w.iast,
        dhatu: w.dhatu,
        vibhakti: w.vibhakti,
        meaning: m[language] || m.hinglish || m.hi || m.en || '-'
      };
    });
  };

  const copyToClipboard = () => {
    const text = `श्रीमद्भगवद्गीता (अध्याय ${verse.chapter}, श्लोक ${verse.verse})\n${speaker.title}\n\n${verse.devanagari}\n\n${verse.iast}\n\nअर्थ: ${getActiveTranslation()}\n\nभाष्य: ${getActiveBhashya()}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    sacredAudio.playNavChime(0.1);
    setTimeout(() => setCopied(false), 2000);
  };

  const fontSizes = {
    std: 'text-lg sm:text-xl md:text-2xl leading-relaxed tracking-wide',
    med: 'text-xl sm:text-2xl md:text-3xl leading-relaxed tracking-wide font-medium',
    large: 'text-2xl sm:text-3xl md:text-4xl leading-loose tracking-wider font-semibold'
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-20">
      
      {/* ── TOP UTILITY TOOLBAR ────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 sm:px-4 py-2.5 rounded-2xl bg-[#090a0f]/80 backdrop-blur-xl border border-[#c5a059]/20 shadow-md">
        
        {/* Chapter & Verse Badge */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-[#c5a059]/20 to-amber-500/10 border border-[#c5a059]/30 text-xs font-serif font-bold text-[#e6c687] flex items-center gap-1.5 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{t('chapter')} {verse.chapter} · {t('verse')} {verse.verse}</span>
          </span>
          <span className="text-[11px] text-[#c5a059]/70 font-mono hidden xs:inline">
            {speaker.name}
          </span>
        </div>

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Font Size Selector */}
          <div className="flex items-center rounded-xl bg-[#141622] border border-[#c5a059]/20 p-0.5">
            {(['std', 'med', 'large'] as const).map(lvl => (
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

      {/* ── TIER 1: SACRED SHLOKA ALTAR CARD (Devanagari, Speaker & Chhanda) ───── */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#141622] via-[#0d0e16] to-[#07080c] border border-[#c5a059]/30 p-6 sm:p-10 shadow-2xl overflow-hidden space-y-6">
        
        {/* Subtle Brass Corner Filigree */}
        <div className="absolute top-3 left-3 text-[#c5a059]/25 text-xs font-serif select-none pointer-events-none">𑁍</div>
        <div className="absolute top-3 right-3 text-[#c5a059]/25 text-xs font-serif select-none pointer-events-none">𑁍</div>
        <div className="absolute bottom-3 left-3 text-[#c5a059]/25 text-xs font-serif select-none pointer-events-none">𑁍</div>
        <div className="absolute bottom-3 right-3 text-[#c5a059]/25 text-xs font-serif select-none pointer-events-none">𑁍</div>

        {/* Inscription Header with Speaker & Chhanda */}
        <div className="text-center space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-xs font-serif text-[#e6c687]">
            <span>✨ {speaker.title}</span>
            <span>·</span>
            <span className="text-[11px] text-[#c5a059]/80">{chhanda}</span>
          </div>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent mx-auto mt-2" />
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

        {/* Ask Krishna AI Direct Dialogue Button */}
        <div className="pt-2 border-t border-[#c5a059]/15 flex items-center justify-end">
          <button
            onClick={handleAskKrishna}
            className="w-full sm:w-auto px-4 py-2 rounded-2xl bg-gradient-to-r from-[#e6c687]/15 via-[#c5a059]/20 to-amber-600/15 border border-[#c5a059]/40 hover:border-[#c5a059] text-xs font-serif text-[#e6c687] flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-102 shadow-md"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#e6c687]" />
            <span>इस श्लोक पर कृष्ण AI से दिव्य संवाद करें 🪔</span>
          </button>
        </div>

      </div>

      {/* ── ULTRA-PREMIUM SACRED STUDIO MUSIC PLAYER DECK (वैदिक वाचन एवं ध्वनि स्पन्दन) ── */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#161826] via-[#0d0e17] to-[#161826] border-2 border-[#c5a059]/40 p-5 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden space-y-5 ring-1 ring-[#f5eed9]/10">
        
        {/* Glowing Background Radial Pulse when Playing */}
        {isPlayingAudio && (
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-[#c5a059]/15 to-amber-600/10 animate-pulse pointer-events-none" />
        )}

        {/* Top Bar: Title + Realtime Vibration Visualizer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c5a059]/20 pb-4 relative z-10">
          
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all shadow-lg border ${
              isPlayingAudio 
                ? 'bg-gradient-to-br from-amber-400 to-[#c5a059] text-[#090a0f] border-[#f5eed9] shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-105' 
                : 'bg-[#181a28] text-[#c5a059] border-[#c5a059]/30'
            }`}>
              {isPlayingAudio ? '🪷' : '🎵'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm sm:text-base font-serif font-bold text-[#f5eed9] tracking-wide">
                  प्रामाणिक वैदिक श्लोक वाचन (Sacred Recitation Deck)
                </h4>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 font-bold uppercase">
                  100% विज्ञापन-मुक्त (Zero Ads)
                </span>
              </div>
              <p className="text-xs text-[#c5a059]/80 font-sans mt-0.5">
                अध्याय {verse.chapter}, श्लोक {verse.verse} ({speaker.title} • {chhanda})
              </p>
            </div>
          </div>

          {/* Dynamic 16-Bar Audio Waveform / Vibration Sensor Animation */}
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#090a0f]/80 border border-[#c5a059]/30 shadow-inner">
            <span className="text-[11px] font-mono text-[#c5a059]/80 mr-2 flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${isPlayingAudio ? 'bg-amber-400 animate-ping' : 'bg-[#c5a059]/40'}`} />
              {isPlayingAudio ? 'ध्वनि स्पन्दन (Active)' : 'ध्वनि विश्राम'}
            </span>
            <div className="flex items-end gap-1 h-6 w-32 sm:w-40 justify-center">
              {[40, 75, 90, 60, 100, 85, 50, 95, 70, 80, 45, 90, 65, 85, 55, 95].map((baseH, idx) => {
                const liveHeight = isPlayingAudio 
                  ? Math.max(15, Math.min(100, (baseH * (currentVibeIntensity / 50)) % 100))
                  : 15;
                return (
                  <div
                    key={idx}
                    className="w-1.5 rounded-full transition-all duration-150"
                    style={{
                      height: `${liveHeight}%`,
                      background: isPlayingAudio 
                        ? 'linear-gradient(to top, #d4af37, #f59e0b, #fef08a)' 
                        : '#3a3424'
                    }}
                  />
                );
              })}
            </div>
          </div>

        </div>

        {/* Center Main Music Deck Controls: [ PREV ] [ MAIN PLAY/PAUSE ] [ NEXT ] */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 relative z-10 pt-1">
          
          {/* Main Control Trio */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-center">
            
            {/* PREVIOUS SHLOKA BUTTON */}
            <button
              onClick={handlePrevVerse}
              className="p-3 sm:p-3.5 rounded-2xl bg-[#181a28] hover:bg-[#222538] text-[#c5a059] hover:text-[#f5eed9] border border-[#c5a059]/30 hover:border-[#c5a059] transition-all cursor-pointer shadow-lg active:scale-95 group"
              title="पिछला श्लोक (Previous Shloka)"
            >
              <SkipBack className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* MAIN PLAY / PAUSE BUTTON WITH GOLDEN GLOW */}
            <button
              onClick={toggleAudioPlayback}
              className={`px-6 sm:px-8 py-3.5 rounded-2xl font-serif font-bold text-sm sm:text-base flex items-center gap-3 transition-all cursor-pointer shadow-2xl active:scale-95 ${
                isPlayingAudio
                  ? 'bg-gradient-to-r from-amber-400 via-[#c5a059] to-amber-500 text-[#090a0f] ring-4 ring-[#f5eed9]/30 scale-105 shadow-[0_0_25px_rgba(245,158,11,0.6)] animate-pulse'
                  : 'bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#b89340] hover:from-[#e6c687] hover:to-[#d4af37] text-[#090a0f] ring-2 ring-[#c5a059]/40 hover:scale-102 shadow-[0_4px_20px_rgba(197,160,89,0.3)]'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="w-5 h-5 fill-current" />
                  <span>वाचन रोकें (Pause)</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                  <span>श्लोक वाचन प्रारम्भ करें ▶️</span>
                </>
              )}
            </button>

            {/* NEXT SHLOKA BUTTON */}
            <button
              onClick={handleNextVerse}
              className="p-3 sm:p-3.5 rounded-2xl bg-[#181a28] hover:bg-[#222538] text-[#c5a059] hover:text-[#f5eed9] border border-[#c5a059]/30 hover:border-[#c5a059] transition-all cursor-pointer shadow-lg active:scale-95 group"
              title="अगला श्लोक (Next Shloka)"
            >
              <SkipForward className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>

          </div>

          {/* Quick Settings: Loop, Speed, Tanpura Harmony */}
          <div className="flex items-center gap-2 flex-wrap justify-center w-full sm:w-auto">
            
            {/* Auto Loop Toggle */}
            <button
              onClick={() => {
                setIsLoopingAudio(!isLoopingAudio);
                sacredAudio.playNavChime(0.05);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-sans flex items-center gap-1.5 transition-all cursor-pointer border ${
                isLoopingAudio
                  ? 'bg-[#c5a059]/25 text-[#f5eed9] border-[#c5a059] font-bold shadow-md'
                  : 'bg-[#090a0f]/60 text-[#c5a059]/60 border-[#c5a059]/20 hover:text-[#f5eed9]'
              }`}
              title="श्लोक समाप्त होने पर पुनः दोहराएं"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>दोहराएं {isLoopingAudio ? '✓' : ''}</span>
            </button>

            {/* Tanpura Harmony Drone Toggle */}
            <button
              onClick={() => {
                const nextVal = !isTanpuraActive;
                setIsTanpuraActive(nextVal);
                if (nextVal && isPlayingAudio) {
                  sacredAudio.startTanpura(0.07);
                } else {
                  sacredAudio.stopTanpura();
                }
                sacredAudio.playNavChime(0.05);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-sans flex items-center gap-1.5 transition-all cursor-pointer border ${
                isTanpuraActive
                  ? 'bg-amber-600/25 text-[#f5eed9] border-amber-400 font-bold'
                  : 'bg-[#090a0f]/60 text-[#c5a059]/60 border-[#c5a059]/20 hover:text-[#f5eed9]'
              }`}
              title="432Hz तानपुरा नाद"
            >
              <span>🪕 तानपुरा {isTanpuraActive ? 'चालू' : 'बंद'}</span>
            </button>

            {/* Recitation Speed Selector */}
            <div className="flex items-center rounded-xl bg-[#090a0f]/80 border border-[#c5a059]/30 p-0.5 text-xs font-mono">
              {[
                { val: 0.75, lbl: '0.75x' },
                { val: 0.85, lbl: '0.85x' },
                { val: 1.0,  lbl: '1.0x' }
              ].map(s => (
                <button
                  key={s.val}
                  onClick={() => {
                    setSpeechSpeed(s.val);
                    sacredAudio.playNavChime(0.05);
                  }}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    speechSpeed === s.val
                      ? 'bg-[#c5a059] text-[#090a0f] font-bold shadow-sm'
                      : 'text-[#c5a059]/70 hover:text-[#f5eed9]'
                  }`}
                >
                  {s.lbl}
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* ── REALISTIC ANIMATED JAPA MALA BEAD COUNTER ─────────────────────── */}
      <div className="rounded-3xl bg-[#0d0e16]/95 border border-[#c5a059]/25 p-4 sm:p-6 shadow-xl space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#e6c687] text-lg">
              📿
            </div>
            <div>
              <h4 className="text-sm font-serif font-bold text-[#f5eed9]">
                श्लोक जप एवं ध्यान साधना (Tactile Japa Mala)
              </h4>
              <p className="text-[11px] text-[#c5a059]/70 font-sans">
                इस श्लोक का मनन एवं उच्चारण दोहराएं (+XP Reward):
              </p>
            </div>
          </div>

          {/* Target Buttons + Chant Counter Tap */}
          <div className="flex items-center gap-2">
            {[11, 21, 108].map(tgt => (
              <button
                key={tgt}
                onClick={() => {
                  setJapaTarget(tgt);
                  sacredAudio.playNavChime(0.06);
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  japaTarget === tgt
                    ? 'bg-[#c5a059] text-[#090a0f]'
                    : 'bg-[#141622] text-[#c5a059]/70 border border-[#c5a059]/20'
                }`}
              >
                {tgt}x
              </button>
            ))}

            {/* Main Chant Tap Button */}
            <button
              onClick={handleJapaChant}
              className="px-5 py-2 rounded-2xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-[#090a0f] font-serif font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>जप स्पर्श ({japaCount}/{japaTarget})</span>
            </button>

            {japaCount > 0 && (
              <button
                onClick={resetJapa}
                className="p-2 rounded-xl bg-[#141622] text-[#c5a059]/60 hover:text-[#f5eed9] border border-[#c5a059]/20 cursor-pointer"
                title="Reset Japa"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Visual Japa Bead Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#c5a059]/70">
            <span>साधना प्रगति (Mala Progress)</span>
            <span>{Math.min(100, Math.round((japaCount / japaTarget) * 100))}%</span>
          </div>
          <div className="w-full h-2.5 bg-[#141622] rounded-full overflow-hidden border border-[#c5a059]/20 p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-[#c5a059] via-[#e6c687] to-amber-400 transition-all duration-200 rounded-full shadow-[0_0_10px_rgba(230,198,135,0.5)]"
              style={{ width: `${Math.min(100, (japaCount / japaTarget) * 100)}%` }}
            />
          </div>
        </div>

      </div>

      {/* ── TIER 3: WORD-BY-WORD ANVAYA (पदच्छेद एवं शब्दार्थ) ───────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-serif uppercase tracking-widest text-[#e6c687] font-bold flex items-center gap-2">
            <span>🔍 पदच्छेद एवं व्याकरणिक शब्दार्थ (Word Anatomy)</span>
          </h3>
          <span className="text-[10px] text-[#c5a059]/60 font-sans">शब्द पर क्लिक कर उच्चार सुनें</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {getActiveAnvayaTokens().map((tok: any, idx: number) => (
            <div
              key={idx}
              onClick={() => handleWordItemClick(tok as any)}
              className="p-3 rounded-2xl bg-[#0e1019]/90 hover:bg-[#171a29] border border-[#c5a059]/20 hover:border-[#c5a059]/60 transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-devanagari text-sm sm:text-base font-semibold text-[#f5eed9] group-hover:text-[#e6c687] transition-colors">
                  {tok.word}
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-[#1c1e2d] text-[#c5a059]/70 border border-[#c5a059]/10">
                  {tok.dhatu || tok.vibhakti || 'पद'}
                </span>
              </div>
              <p className="text-[11px] font-serif text-[#c5a059]/85 italic group-hover:text-[#f5eed9] transition-colors line-clamp-1">
                {tok.meaning}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── TIER 2: TRANSLATION (प्रामाणिक भावार्थ) ─────────────────────────── */}
      <div className="rounded-3xl bg-[#0f111a]/95 border border-[#c5a059]/25 p-5 sm:p-7 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-[#c5a059]/15 pb-2.5">
          <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#e6c687] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>प्रामाणिक सरल अनुवाद ({language.toUpperCase()})</span>
          </div>
          {isLoadingLang && (
            <span className="text-[10px] font-mono text-amber-400 animate-pulse">
              अनुवाद लोड हो रहा है...
            </span>
          )}
        </div>
        <p className="text-sm sm:text-base md:text-lg text-[#f5eed9]/95 font-serif leading-relaxed">
          {getActiveTranslation()}
        </p>
      </div>

      {/* ── TIER 4: 10-DIMENSIONAL DEEP COMMENTARY TABS ───────────────────────── */}
      <div className="rounded-3xl bg-[#0d0e16]/95 border border-[#c5a059]/25 p-5 sm:p-7 shadow-xl space-y-4">
        
        {/* Horizontal Scrolling Commentary Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 custom-scrollbar border-b border-[#c5a059]/15">
          {[
            { id: 'story', label: '📖 महाभारत सजीव कथा' },
            { id: 'mahatmya', label: '🪔 भागवत माहात्म्य' },
            { id: 'universal', label: '🕉️ सर्वसम्मत' },
            { id: 'advaita', label: '🧘 शंकराचार्य' },
            { id: 'vishishtadvaita', label: '🪷 रामानुज' },
            { id: 'dvaita', label: '🔱 मध्वाचार्य' },
            { id: 'jnaneshwari', label: '🌸 ज्ञानेश्वरी' },
            { id: 'vivekananda', label: '⚡ विवेकानन्द' },
            { id: 'science', label: '🌌 क्वांटम विज्ञान' },
            { id: 'meditation', label: '🧘‍♂️ ध्यान विधि' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSampradaya(tab.id as any);
                sacredAudio.playNavChime(0.06);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-serif shrink-0 transition-all cursor-pointer whitespace-nowrap ${
                activeSampradaya === tab.id
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-[#090a0f] font-bold shadow-md scale-102 ring-1 ring-[#f5eed9]/30'
                  : 'bg-[#090a0f]/60 text-[#c5a059]/80 hover:text-[#f5eed9] hover:bg-[#141622]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Multi-Paragraph Structured Commentary Body */}
        <div className="text-xs sm:text-sm md:text-base text-[#e6c687]/90 font-serif leading-relaxed whitespace-pre-line bg-[#090a0f]/60 p-4 sm:p-5 rounded-2xl border border-[#c5a059]/15">
          {getActiveBhashya()}
        </div>

      </div>

      {/* ── TIER 5: PRACTICAL BLUEPRINT (जीवन सूत्र) ────────────────────────── */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#c5a059]/15 to-amber-500/10 border border-[#c5a059]/30 p-5 sm:p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#e6c687] font-bold">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>२१वीं सदी का व्यावहारिक जीवन सूत्र (Actionable Blueprint)</span>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-[#f5eed9] font-serif leading-relaxed">
          {getActiveInsight()}
        </p>
      </div>

    </div>
  );
}
