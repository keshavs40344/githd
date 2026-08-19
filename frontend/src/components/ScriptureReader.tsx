'use client';

import React, { useState, useEffect } from 'react';
import type { GitaVerse, AnvayaToken } from '../types/verse';
import type { SevenLayerMentorDiagnosis, GunaType } from '../types/mentor';
import WisdomCardModal from './WisdomCardModal';
import { 
  Bookmark, BookmarkCheck, Copy, Check, ChevronRight, ChevronLeft, 
  Sparkles, BookOpen, Volume2, VolumeX, Share2, Compass, Globe2, 
  Layers, Radio, RefreshCw, Disc3, Play, Pause, ShieldCheck, Heart, Lightbulb,
  Music, Bell, Disc, Sparkle, Flame, CheckCircle2, Award, ZoomIn, ZoomOut, FileText
} from 'lucide-react';
import { Button } from './ui/Button';
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
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1); // 1 = normal, 1.25 = large, 1.5 = extra large

  // Pure Shloka Music Player State (Above Translation)
  const [isPlayingShlokaMusic, setIsPlayingShlokaMusic] = useState(false);
  const [shlokaPlaybackSeconds, setShlokaPlaybackSeconds] = useState(0);

  // Chapter Audio Stream state
  const [isPlayingChapterAudio, setIsPlayingChapterAudio] = useState(false);
  const [audioStreamSource, setAudioStreamSource] = useState<'gita_series' | 'bhagwat_katha'>('gita_series');

  // Resolve accurate audio source for this chapter and verse
  const shlokaAudioData = getGitaVideoForVerse(verse.chapter, verse.verse);

  // Timer for Shloka Music
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

  // Reset audio when verse changes
  useEffect(() => {
    setIsPlayingShlokaMusic(false);
    setShlokaPlaybackSeconds(0);
  }, [verse.chapter, verse.verse]);

  // Check Bookmark and Contemplation status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved: string[] = JSON.parse(localStorage.getItem('dharma_saved_verses') || '[]');
        const contemplated: string[] = JSON.parse(localStorage.getItem('dharma_contemplated_verses') || '[]');
        const key = `${verse.chapter}_${verse.verse}`;
        setIsBookmarked(saved.includes(key));
        setIsContemplated(contemplated.includes(key));
      } catch {
        setIsBookmarked(false);
        setIsContemplated(false);
      }
    }
  }, [verse.chapter, verse.verse]);

  // Fetch dynamic multi-language translation and bhashya if not hi/en cached
  useEffect(() => {
    let isMounted = true;
    if (selectedLang !== 'hi' && selectedLang !== 'en') {
      setIsLoadingLang(true);
      fetch(`/api/v1/shloka?chapter=${verse.chapter}&verse=${verse.verse}&lang=${selectedLang}`)
        .then(res => res.json())
        .then(res => {
          if (isMounted && res.success && res.data) {
            setDynamicData(res.data);
          }
        })
        .catch(err => console.warn('Language fetch error:', err))
        .finally(() => {
          if (isMounted) setIsLoadingLang(false);
        });
    } else {
      setDynamicData(null);
      setIsLoadingLang(false);
    }
    return () => { isMounted = false; };
  }, [verse.chapter, verse.verse, selectedLang]);

  const toggleBookmark = () => {
    if (typeof window === 'undefined') return;
    try {
      const saved: string[] = JSON.parse(localStorage.getItem('dharma_saved_verses') || '[]');
      const key = `${verse.chapter}_${verse.verse}`;
      let updated: string[];
      if (saved.includes(key)) {
        updated = saved.filter((k: string) => k !== key);
        setIsBookmarked(false);
      } else {
        updated = [...saved, key];
        setIsBookmarked(true);
      }
      localStorage.setItem('dharma_saved_verses', JSON.stringify(updated));
      sacredAudio.playNavChime(0.12);
    } catch {}
  };

  const toggleContemplated = () => {
    if (typeof window === 'undefined') return;
    try {
      const list: string[] = JSON.parse(localStorage.getItem('dharma_contemplated_verses') || '[]');
      const key = `${verse.chapter}_${verse.verse}`;
      let updated: string[];
      if (list.includes(key)) {
        updated = list.filter((k: string) => k !== key);
        setIsContemplated(false);
      } else {
        updated = [...list, key];
        setIsContemplated(true);
        sacredAudio.playTempleBell(0.35);
      }
      localStorage.setItem('dharma_contemplated_verses', JSON.stringify(updated));
    } catch {}
  };

  const copyVerse = async () => {
    const translation = getActiveTranslation();
    const textToCopy = `श्रीमद्भगवद्गीता — अध्याय ${verse.chapter}, श्लोक ${verse.verse}\n\n${verse.devanagari}\n\n${verse.iast}\n\nअर्थ:\n${translation}\n\nव्यावहारिक सूत्र:\n${verse.practical_insight}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      sacredAudio.playNavChime(0.15);
      setTimeout(() => setCopied(false), 2000);
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
      return (verse as any).bhashya_hi || "इस श्लोक में भगवान श्री कृष्ण आत्मा की अमरता, निष्काम कर्तव्य पालन और चित्त की एकाग्रता का रहस्य उद्घाटित करते हैं। जो साधक फल की कामना त्यागकर समत्व भाव से कर्म करता है, वह इस संसार के समस्त बंधनों से मुक्त होकर परम पद को प्राप्त होता है।";
    }
    return (verse as any).bhashya_en || "In this sacred verse, Lord Krishna reveals the timeless truth of selfless duty, transcendental equanimity, and the eternal nature of consciousness. By relinquishing anxiety over outcomes, the intellect achieves flawless focus and liberation.";
  };

  const activeTokens = dynamicData?.anvaya_tokens?.length > 0 
    ? dynamicData.anvaya_tokens 
    : (verse.anvaya_tokens || []);

  const dominantGuna: GunaType = 'Sattva';

  const currentDiagnosis: SevenLayerMentorDiagnosis = {
    psychological_telemetry: {
      dominant_guna: dominantGuna,
      cognitive_distortion: 'Cognitive Realignment (आत्म-सजगता)',
      mind_state_diagnosis: verse.practical_insight,
      guna_percentages: { sattva: 70, rajas: 20, tamas: 10 }
    },
    shloka_meta: {
      chapter: verse.chapter,
      verse: verse.verse,
      chhanda_meter: 'Anushtup (8-8-8-8)',
      sanskrit_devanagari: verse.devanagari,
      transliteration_iast: verse.iast
    },
    audio_sonic_metadata: {
      recommended_raga_bgm: 'Chapter Sacred Recitation',
      vocal_modulation_guidance: 'Serene, meditative Vedic cadence',
      pronunciation_key: 'Distinct Sanskrit phonetics'
    },
    word_by_word_anvaya: activeTokens.map((t: any) => ({
      sanskrit_word: t.word || t.sanskrit_word,
      root_dhatu: t.dhatu || t.root_dhatu || '-',
      grammar_case: t.vibhakti || t.grammar_case || '-',
      meaning: t.meaning || t.meaning_hi || t.meaning_en || ''
    })),
    simple_translation: getActiveTranslation(),
    cognitive_reframing_case: {
      modern_dilemma: 'Contemplation of universal truth and overcoming life dilemmas.',
      psychological_reframe: verse.practical_insight
    },
    mindfulness_breathwork_sync: {
      technique_name: '4-4-4-4 Box Breathing (समवृत्ति प्राणायाम)',
      guided_instruction: '४ सेकंड श्वास लें, ४ सेकंड रोकें, ४ सेकंड छोड़ें, ४ सेकंड शांत रहें।'
    },
    shri_krishna_uvacha: {
      divine_address: `हे पार्थ! (अध्याय ${verse.chapter}, श्लोक ${verse.verse})`,
      deep_counsel: verse.practical_insight,
      immediate_24hr_dharma_action: 'आज के दिन किसी भी कार्य को बिना परिणाम की चिंता किए पूर्ण एकाग्रता से करें।'
    }
  };

  // Chapter Playlist URLs
  const gitaPlaylistId = 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP';
  const kathaPlaylistId = 'PL5A5QJkW7MkvYslAbg7_rFij8yVEeiEwF';
  const playlistIndex = Math.max(0, verse.chapter - 1);
  const activePlaylistId = audioStreamSource === 'gita_series' ? gitaPlaylistId : kathaPlaylistId;

  // Font size classes
  const fontClass = fontSizeMultiplier === 1.5 
    ? 'text-2xl sm:text-3xl lg:text-4xl' 
    : fontSizeMultiplier === 1.25 
    ? 'text-xl sm:text-2xl lg:text-3xl' 
    : 'text-lg sm:text-2xl lg:text-3xl';

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      
      {/* ── Top Header Controls & Multi-Language Selector ───────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-obsidian-900/90 border border-gold-500/20 rounded-2xl p-3.5 backdrop-blur-xl shadow-lg">
        
        {/* Chapter & Verse Badge */}
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center text-obsidian-950 font-bold text-sm shadow-md animate-pulse">
            ॐ
          </span>
          <div>
            <div className="text-xs font-cinzel font-bold text-gold-200 tracking-wider">
              अध्याय {verse.chapter} • श्लोक {verse.verse}
            </div>
            <div className="text-[10px] font-mono text-gold-400/60 uppercase">
              BHAGAVAD GITA {verse.chapter}.{verse.verse}
            </div>
          </div>
        </div>

        {/* Multi-Language Selector Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 custom-scrollbar">
          <div className="flex items-center gap-1 text-[11px] font-mono text-gold-400/80 mr-1 shrink-0">
            <Globe2 className="w-3.5 h-3.5" />
            <span>भाषा:</span>
          </div>
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => {
                setSelectedLang(lang.code);
                sacredAudio.playNavChime(0.1);
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-sans font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                selectedLang === lang.code
                  ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 font-bold shadow-[0_0_12px_rgba(232,163,32,0.4)] scale-105'
                  : 'bg-obsidian-800/80 hover:bg-obsidian-750 text-gold-300/70 border border-gold-500/15 hover:scale-102'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>

        {/* Action Buttons: Contemplate Check, Bookmark, Copy, Wisdom Card */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
          
          {/* Mark as Contemplated */}
          <button
            onClick={toggleContemplated}
            className={`px-3 py-1.5 rounded-xl border text-xs font-sans font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isContemplated
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-obsidian-800 text-gold-300/70 border-gold-500/15 hover:border-emerald-400/50 hover:text-emerald-300'
            }`}
            title="मनन पूर्ण (Mark as Contemplated)"
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isContemplated ? 'text-emerald-400 fill-emerald-500/20' : ''}`} />
            <span className="hidden sm:inline">{isContemplated ? 'मनन पूर्ण' : 'मनन करें'}</span>
          </button>

          <button
            onClick={copyVerse}
            className="p-2 rounded-xl bg-obsidian-800 text-gold-300 border border-gold-500/15 hover:border-gold-400 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="Copy Shloka & Meaning"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-xl border transition-all hover:scale-105 active:scale-95 cursor-pointer ${
              isBookmarked
                ? 'bg-gold-500/20 text-gold-300 border-gold-400'
                : 'bg-obsidian-800 text-gold-300/70 border-gold-500/15 hover:border-gold-400'
            }`}
            title="Bookmark Shloka"
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-gold-300" /> : <Bookmark className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setShowWisdomCard(true)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-gold-500/20 to-amber-500/20 hover:from-gold-500/30 hover:to-amber-500/30 text-gold-200 border border-gold-400/30 text-xs font-sans flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span className="hidden sm:inline">विज्डम कार्ड</span>
          </button>
        </div>

      </div>

      {/* ── SACRED SHLOKA DISPLAY CARD (Devanagari Sanskrit & IAST) ───── */}
      <div className="bg-gradient-to-br from-obsidian-900/98 via-obsidian-900 to-amber-950/25 border border-gold-500/35 rounded-3xl p-6 sm:p-9 shadow-2xl relative overflow-hidden space-y-6">
        
        {/* Glow ambient background */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Shloka Meter & Font Scaling Bar */}
        <div className="flex items-center justify-between border-b border-gold-500/15 pb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-[10px] font-mono text-gold-300 uppercase tracking-widest">
            <span className="animate-spin-slow">✨</span>
            <span>अनुष्टुप् छन्द (Anushtup Vedic Meter)</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setFontSizeMultiplier(prev => (prev === 1 ? 1.25 : prev === 1.25 ? 1.5 : 1))}
              className="px-2.5 py-1 rounded-xl bg-obsidian-800 border border-gold-500/20 text-xs font-mono text-gold-300 hover:border-gold-400 cursor-pointer flex items-center gap-1"
              title="Font Scale"
            >
              <span>Aa</span>
              <span className="text-[10px] text-gold-500">{fontSizeMultiplier === 1.5 ? 'Max' : fontSizeMultiplier === 1.25 ? 'Med' : 'Std'}</span>
            </button>
          </div>
        </div>

        {/* Sanskrit Shloka Devanagari */}
        <div className="text-center space-y-4 relative z-10 py-1">
          <p className={`${fontClass} font-devanagari font-bold text-gold-100 leading-relaxed tracking-wide text-glow-gold whitespace-pre-line py-2 transition-all duration-300`}>
            {verse.devanagari}
          </p>

          {/* IAST Romanized */}
          <p className="text-xs sm:text-sm font-serif italic text-gold-300/80 leading-relaxed max-w-2xl mx-auto border-t border-gold-500/15 pt-3">
            {verse.iast}
          </p>
        </div>

        {/* Authentic Playlist Chapter Audio Stream Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gold-500/20 bg-obsidian-950/70 -mx-6 -mb-6 sm:-mx-9 sm:-mb-9 p-4 sm:p-5 rounded-b-3xl">
          
          {/* Main Play Chapter Button */}
          <button
            onClick={() => {
              setIsPlayingChapterAudio(!isPlayingChapterAudio);
              sacredAudio.playNavChime(0.15);
            }}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-sans font-bold flex items-center gap-2.5 border transition-all cursor-pointer shadow-lg active:scale-95 ${
              isPlayingChapterAudio
                ? 'bg-gradient-to-r from-gold-400 to-amber-500 text-obsidian-950 border-gold-300 shadow-[0_0_20px_rgba(232,163,32,0.45)]'
                : 'bg-obsidian-850 hover:bg-obsidian-800 text-gold-200 border-gold-500/30 hover:border-gold-400 hover:scale-102'
            }`}
          >
            {isPlayingChapterAudio ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>अध्याय {verse.chapter} ऑडियो चल रहा है (Pause)</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current ml-0.5" />
                <span>▶ अध्याय {verse.chapter} सम्पूर्ण श्लोक ऑडियो सुनें</span>
              </>
            )}
          </button>

          {/* Source Toggle & Katha Mode */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setAudioStreamSource(audioStreamSource === 'gita_series' ? 'bhagwat_katha' : 'gita_series');
                sacredAudio.playNavChime(0.1);
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-sans bg-obsidian-850 hover:bg-obsidian-800 text-gold-300/90 border border-gold-500/20 hover:border-gold-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-gold-400" />
              <span>{audioStreamSource === 'gita_series' ? 'कथा व्याख्या मोड' : 'गीता श्लोक पाठ मोड'}</span>
            </button>

            {isPlayingChapterAudio && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>STREAMING</span>
              </div>
            )}
          </div>

        </div>

        {/* Hidden Chapter Audio Stream Iframe */}
        {isPlayingChapterAudio && (
          <div className="fixed -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none" aria-hidden="true">
            <iframe
              key={`reader-stream-${activePlaylistId}-${playlistIndex}-${audioStreamSource}`}
              src={`https://www.youtube.com/embed/videoseries?list=${activePlaylistId}&index=${playlistIndex}&autoplay=1&enablejsapi=1&rel=0&controls=0`}
              title="Chapter Audio Stream"
              allow="autoplay"
            />
          </div>
        )}

      </div>

      {/* ── 🪈 DEDICATED PURE MUSIC & SHLOKA AUDIO SANCTUM (UPPER THE TRANSLATION SECTION - 100% AUDIO ONLY) ──────── */}
      <div className="bg-gradient-to-br from-obsidian-900/98 via-obsidian-900 to-amber-950/30 border border-gold-500/35 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 relative overflow-hidden">
        
        {/* Ambient Glow Aura */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Hidden Audio Iframe Engine (No Video Screen) */}
        {isPlayingShlokaMusic && (
          <div className="fixed -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none" aria-hidden="true">
            <iframe
              key={`pure-shloka-music-${shlokaAudioData.videoId}-${isPlayingShlokaMusic}`}
              src={`https://www.youtube.com/embed/${shlokaAudioData.videoId}?autoplay=1&enablejsapi=1&rel=0&controls=0`}
              title={shlokaAudioData.title}
              allow="autoplay"
            />
          </div>
        )}

        {/* Header Title & Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gold-500/15 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center text-obsidian-950 font-bold shadow-[0_0_15px_rgba(232,163,32,0.4)]">
              <Music className="w-5 h-5 fill-current" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel text-sm sm:text-base font-bold text-gold-100">
                  श्लोक पावन संगीत एवं स्वर पाठ (Pure Audio)
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-gold-500/20 text-gold-300 border border-gold-400/40 animate-pulse">
                  {shlokaAudioData.type === 'exact_verse' ? '✨ श्लोक विशुद्ध संगीत' : '📜 अध्याय पावन संगीत'}
                </span>
              </div>
              <p className="text-xs text-gold-300/80 font-sans line-clamp-1 mt-0.5">
                {shlokaAudioData.title}
              </p>
            </div>
          </div>

          {/* Quick Sound FX Triggers */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <button
              onClick={() => sacredAudio.playTempleBell(0.35)}
              className="px-2 py-1 rounded-xl bg-obsidian-800 hover:bg-gold-500/20 border border-gold-500/20 text-[11px] text-gold-300 flex items-center gap-1 transition-all hover:scale-105 cursor-pointer"
              title="Temple Bell Chime"
            >
              <Bell className="w-3 h-3 text-gold-400" />
              <span>घण्टी</span>
            </button>
            <button
              onClick={() => sacredAudio.playShankhnaad(0.3)}
              className="px-2 py-1 rounded-xl bg-obsidian-800 hover:bg-gold-500/20 border border-gold-500/20 text-[11px] text-gold-300 flex items-center gap-1 transition-all hover:scale-105 cursor-pointer"
              title="Sacred Shankh"
            >
              <span>🐚</span>
              <span>शंख</span>
            </button>
            <button
              onClick={() => sacredAudio.playFluteChime(0.25)}
              className="px-2 py-1 rounded-xl bg-obsidian-800 hover:bg-gold-500/20 border border-gold-500/20 text-[11px] text-gold-300 flex items-center gap-1 transition-all hover:scale-105 cursor-pointer"
              title="Bansuri Tune"
            >
              <span>🪈</span>
              <span>बाँसुरी</span>
            </button>
          </div>
        </div>

        {/* Chakra Vinyl & Dynamic Equalizer Center Console */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center p-3 rounded-2xl bg-obsidian-950/70 border border-gold-500/20 relative z-10">
          
          {/* Left: Spinning Golden Chakra Vinyl Disc */}
          <div className="sm:col-span-4 flex flex-col items-center justify-center">
            <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-gold-400 via-amber-500 to-amber-700 shadow-[0_0_25px_rgba(232,163,32,0.35)] flex items-center justify-center ${
              isPlayingShlokaMusic ? 'animate-spin-slow' : ''
            }`}>
              <div className="w-full h-full rounded-full bg-obsidian-950 border-2 border-gold-400/40 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-1.5 rounded-full border border-gold-500/15" />
                <div className="absolute inset-3 rounded-full border border-gold-500/20" />
                <div className="absolute inset-5 rounded-full border border-gold-500/10" />
                <span className="text-xl sm:text-2xl font-bold font-devanagari text-gold-200 text-glow-gold">
                  ॐ
                </span>
                <div className="w-3 h-3 rounded-full bg-obsidian-950 border border-gold-400 absolute" />
              </div>
            </div>
          </div>

          {/* Right: Dynamic Equalizer Waveform & Play Action */}
          <div className="sm:col-span-8 space-y-4">
            
            {/* Animated Equalizer Frequency Wave */}
            <div className="flex items-end justify-between gap-1 h-8 px-2 py-1 rounded-xl bg-obsidian-900 border border-gold-500/15">
              {[35, 75, 55, 90, 65, 80, 45, 100, 70, 85, 60, 95, 50, 80, 65, 90].map((h, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 rounded-full bg-gradient-to-t from-gold-500 via-amber-400 to-amber-200 transition-all ${
                    isPlayingShlokaMusic ? 'animate-pulse' : 'opacity-30'
                  }`}
                  style={{
                    height: isPlayingShlokaMusic ? `${Math.max(25, (h * ((idx % 4) + 1)) % 100)}%` : '20%',
                    animationDelay: `${idx * 60}ms`
                  }}
                />
              ))}
            </div>

            {/* Progress line & Timer */}
            <div className="space-y-1">
              <div className="w-full bg-obsidian-900 h-1.5 rounded-full overflow-hidden border border-gold-500/20">
                <div
                  className="h-full bg-gradient-to-r from-gold-400 via-amber-500 to-amber-600 transition-all rounded-full"
                  style={{ width: `${Math.min(100, (shlokaPlaybackSeconds % 120) / 1.2)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-gold-400/80">
                <span>{formatSeconds(shlokaPlaybackSeconds)}</span>
                <span>अध्याय {verse.chapter} · श्लोक {verse.verse} विशुद्ध संगीत</span>
              </div>
            </div>

            {/* Main Play / Pause Button */}
            <button
              onClick={() => {
                setIsPlayingShlokaMusic(!isPlayingShlokaMusic);
                sacredAudio.playFluteChime(0.2);
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 hover:from-gold-300 hover:to-amber-500 text-obsidian-950 font-bold text-xs sm:text-sm font-sans flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(232,163,32,0.4)] active:scale-95 transition-all cursor-pointer"
            >
              {isPlayingShlokaMusic ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>संगीत रोकें (Pause Sacred Music)</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                  <span>▶ श्लोक {verse.verse} का पावन संगीत सुनें (Play Music Only)</span>
                </>
              )}
            </button>

          </div>

        </div>

      </div>

      {/* ── ADVANCED COMMENTARY & MULTI-LAYER EXEGESIS CONSOLE ───────────── */}
      <div className="bg-obsidian-900/90 border border-gold-500/25 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
        
        {/* Commentary Tabs Switcher */}
        <div className="flex items-center justify-between border-b border-gold-500/15 pb-3.5 gap-2 overflow-x-auto custom-scrollbar">
          <div className="flex items-center gap-1.5">
            {[
              { id: 'translation', label: 'सरलार्थ (Meaning)', icon: '📖' },
              { id: 'bhashya',     label: 'शास्त्रीय भाष्य (Bhashya)', icon: '📜' },
              { id: 'insight',     label: 'व्यावहारिक सूत्र (Life Insight)', icon: '💡' },
              { id: 'anvaya',      label: 'पदच्छेद (Word Breakdown)', icon: '🪷' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCommentaryTab(tab.id as CommentaryTab);
                  sacredAudio.playNavChime(0.1);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  activeCommentaryTab === tab.id
                    ? 'bg-gold-500/20 text-gold-200 border border-gold-400/60 shadow-sm'
                    : 'text-gold-300/60 hover:text-gold-100 hover:bg-obsidian-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {isLoadingLang && (
            <span className="text-xs font-mono text-amber-400 flex items-center gap-1.5 animate-pulse shrink-0">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              अनुवाद लोड हो रहा है...
            </span>
          )}
        </div>

        {/* Tab 1: Translation */}
        {activeCommentaryTab === 'translation' && (
          <div className="space-y-3 animate-in fade-in">
            <h4 className="text-xs font-mono text-gold-400 uppercase tracking-widest">
              सरलार्थ एवं भावार्थ ({LANGUAGES.find(l => l.code === selectedLang)?.label})
            </h4>
            <p className="text-sm sm:text-base text-gold-100 font-sans leading-relaxed">
              {getActiveTranslation()}
            </p>
          </div>
        )}

        {/* Tab 2: Classical Bhashya */}
        {activeCommentaryTab === 'bhashya' && (
          <div className="space-y-3 animate-in fade-in">
            <h4 className="text-xs font-mono text-gold-400 uppercase tracking-widest">
              शास्त्रीय भाष्य एवं वेदान्त रहस्य
            </h4>
            <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-gold-500/15 text-xs sm:text-sm text-gold-200/90 font-sans leading-relaxed space-y-2">
              <p>{getActiveBhashya()}</p>
            </div>
          </div>
        )}

        {/* Tab 3: Actionable Life Insight */}
        {activeCommentaryTab === 'insight' && (
          <div className="space-y-3 animate-in fade-in">
            <h4 className="text-xs font-mono text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              दैनिक जीवन में व्यावहारिक अनुप्रयोग
            </h4>
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-gold-500/10 to-obsidian-900 border border-gold-500/30 text-xs sm:text-sm text-gold-100 font-sans leading-relaxed">
              {verse.practical_insight}
            </div>
          </div>
        )}

        {/* Tab 4: Word-by-Word Anvaya */}
        {activeCommentaryTab === 'anvaya' && activeTokens.length > 0 && (
          <div className="space-y-3 animate-in fade-in">
            <h4 className="text-xs font-mono text-gold-400 uppercase tracking-widest flex items-center justify-between">
              <span>पदच्छेद एवं धातु-विभक्ति विवरण</span>
              <span className="text-[10px] text-gold-400/60 lowercase">Click word to deconstruct</span>
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {activeTokens.map((token: any, i: number) => (
                <button
                  key={i}
                  onClick={() => onWordClick && onWordClick(token)}
                  className="group p-2.5 rounded-2xl bg-obsidian-800/90 hover:bg-gold-500/20 border border-gold-500/20 hover:border-gold-400 transition-all text-left cursor-pointer active:scale-95 shadow-sm hover:scale-102"
                >
                  <div className="text-xs sm:text-sm font-devanagari font-bold text-gold-100 group-hover:text-gold-300">
                    {token.word || token.sanskrit_word}
                  </div>
                  <div className="text-[11px] text-gold-300/80 font-sans mt-0.5">
                    {token.meaning || token.meaning_hi || token.meaning_en}
                  </div>
                  {(token.dhatu || token.root_dhatu) && (token.dhatu || token.root_dhatu) !== '-' && (
                    <div className="text-[9px] font-mono text-gold-400/60 mt-0.5">
                      धातु: {token.dhatu || token.root_dhatu}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── PREV / NEXT VERSE NAVIGATION BAR ───────────────────────── */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <button
          onClick={() => {
            if (onPrev) {
              sacredAudio.playNavChime(0.12);
              onPrev();
            }
          }}
          className="px-5 py-3 rounded-2xl bg-obsidian-900 hover:bg-obsidian-850 border border-gold-500/20 text-gold-200 hover:text-gold-100 font-sans text-xs sm:text-sm font-bold flex items-center gap-2 transition-all active:scale-95 shadow-md cursor-pointer hover:scale-102"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>पिछला श्लोक (Previous)</span>
        </button>

        <button
          onClick={() => {
            if (onNext) {
              sacredAudio.playNavChime(0.12);
              onNext();
            }
          }}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-obsidian-950 font-sans text-xs sm:text-sm font-bold flex items-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(232,163,32,0.35)] cursor-pointer hover:scale-102"
        >
          <span>अगला श्लोक (Next Verse)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Wisdom Card Share Modal */}
      {showWisdomCard && (
        <WisdomCardModal
          diagnosis={currentDiagnosis}
          onClose={() => setShowWisdomCard(false)}
        />
      )}

    </div>
  );
}
