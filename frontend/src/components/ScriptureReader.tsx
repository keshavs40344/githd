'use client';

import React, { useState, useEffect } from 'react';
import type { GitaVerse, AnvayaToken } from '../types/verse';
import type { MentorDiagnosis } from '../types/mentor';
import AIVoiceSpeaker from './AIVoiceSpeaker';
import WisdomCardModal from './WisdomCardModal';
import { 
  Bookmark, BookmarkCheck, Copy, Check, ChevronRight, ChevronLeft, 
  Sparkles, BookOpen, Volume2, Share2, Compass, Globe2, 
  Layers, Radio, RefreshCw, Disc3, ShieldCheck, Heart, Lightbulb 
} from 'lucide-react';
import { Button } from './ui/Button';
import { sacredAudio } from '@/lib/sacredSounds';

interface ScriptureReaderProps {
  verse: GitaVerse;
  onWordClick?: (token: AnvayaToken) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

type LangCode = 'hi' | 'en' | 'sa' | 'mr' | 'gu' | 'bn' | 'ta' | 'te' | 'kn';

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
  const [dynamicData, setDynamicData] = useState<any>(null);
  const [isLoadingLang, setIsLoadingLang] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showWisdomCard, setShowWisdomCard] = useState(false);
  const [showBhashya, setShowBhashya] = useState(true);
  const [isPlayingAudioKatha, setIsPlayingAudioKatha] = useState(false);

  // Check Bookmark status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = JSON.parse(localStorage.getItem('dharma_saved_verses') || '[]');
        const key = `${verse.chapter}_${verse.verse}`;
        setIsBookmarked(saved.includes(key));
      } catch {
        setIsBookmarked(false);
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
        updated = saved.filter(k => k !== key);
        setIsBookmarked(false);
      } else {
        updated = [...saved, key];
        setIsBookmarked(true);
      }
      localStorage.setItem('dharma_saved_verses', JSON.stringify(updated));
      sacredAudio.playNavChime(0.12);
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

  const currentDiagnosis: MentorDiagnosis = {
    psychological_telemetry: {
      dominant_guna: 'Sattva',
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
      recommended_raga_bgm: '136.1 Hz Sacred Tanpura & Flute Drone',
      vocal_modulation_guidance: 'Serene, meditative Vedic cadence',
      pronunciation_key: 'Distinct Sanskrit phonetics'
    },
    word_by_word_anvaya: activeTokens.map((t: any) => ({
      sanskrit_word: t.word,
      root_dhatu: t.dhatu || '-',
      grammar_case: t.vibhakti || '-',
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


  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      
      {/* ── Top Header Controls & Multi-Language Selector ───────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-obsidian-900/90 border border-gold-500/20 rounded-2xl p-3.5 backdrop-blur-xl shadow-lg">
        
        {/* Chapter & Verse Badge */}
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center text-obsidian-950 font-bold text-sm shadow-md">
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
                  ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 font-bold shadow-[0_0_12px_rgba(232,163,32,0.4)]'
                  : 'bg-obsidian-800/80 hover:bg-obsidian-750 text-gold-300/70 border border-gold-500/15'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
          <button
            onClick={copyVerse}
            className="p-2 rounded-xl bg-obsidian-800 text-gold-300 border border-gold-500/15 hover:border-gold-400 transition-colors"
            title="Copy Shloka & Meaning"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-xl border transition-colors ${
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
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-gold-500/20 to-amber-500/20 hover:from-gold-500/30 hover:to-amber-500/30 text-gold-200 border border-gold-400/30 text-xs font-sans flex items-center gap-1.5"
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

        {/* Sanskrit Shloka Devanagari */}
        <div className="text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-[11px] font-mono text-gold-300 uppercase tracking-widest">
            <span>✨</span>
            <span>मूल संस्कृत श्लोक (Original Sacred Verse)</span>
            <span>✨</span>
          </div>

          <p className="text-xl sm:text-2xl lg:text-3xl font-devanagari font-bold text-gold-100 leading-relaxed tracking-wide text-glow-gold whitespace-pre-line py-2">
            {verse.devanagari}
          </p>

          {/* IAST Romanized */}
          <p className="text-xs sm:text-sm font-serif italic text-gold-300/80 leading-relaxed max-w-2xl mx-auto border-t border-gold-500/15 pt-3">
            {verse.iast}
          </p>
        </div>

        {/* Audio Recitation & Chanting Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gold-500/20 bg-obsidian-950/60 -mx-6 -mb-6 sm:-mx-9 sm:-mb-9 p-4 sm:p-5 rounded-b-3xl">
          
          <div className="flex items-center gap-3">
            <AIVoiceSpeaker 
              sanskrit={verse.devanagari} 
              text={verse.devanagari} 
              label="वैदिक संस्कृत पाठ"
            />
            <span className="text-xs font-mono text-gold-400/80 hidden sm:inline">
              वैदिक स्वर पाठ (Authentic Sanskrit Voice)
            </span>
          </div>


          {/* Katha Audio Stream Link */}
          <button
            onClick={() => {
              setIsPlayingAudioKatha(!isPlayingAudioKatha);
              sacredAudio.playFluteChime(0.2);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
              isPlayingAudioKatha
                ? 'bg-amber-500 text-obsidian-950 border-amber-400 shadow-[0_0_15px_rgba(232,163,32,0.4)]'
                : 'bg-obsidian-800 text-gold-300 border-gold-500/20 hover:border-gold-400'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isPlayingAudioKatha ? 'animate-pulse' : ''}`} />
            <span>{isPlayingAudioKatha ? 'कथा ऑडियो चल रहा है' : '📻 सम्पूर्ण कथा ऑडियो सुनें'}</span>
          </button>

        </div>

        {/* Hidden Audio Katha Stream Iframe */}
        {isPlayingAudioKatha && (
          <div className="fixed -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none" aria-hidden="true">
            <iframe
              src="https://www.youtube.com/embed/videoseries?list=PL5A5QJkW7MkvYslAbg7_rFij8yVEeiEwF&autoplay=1&enablejsapi=1&rel=0&controls=0"
              title="Sacred Katha Audio Background Stream"
              allow="autoplay"
            />
          </div>
        )}

      </div>

      {/* ── WORD-BY-WORD ANVAYA & PADACHHEDA (शब्दार्थ एवं पदच्छेद) ──────── */}
      {activeTokens.length > 0 && (
        <div className="bg-obsidian-900/85 border border-gold-500/25 rounded-3xl p-5 sm:p-6 shadow-xl space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-gold-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-gold-400" />
              <span>पदच्छेद एवं अन्वय (Word-by-Word Breakdown)</span>
            </h3>
            <span className="text-[10px] font-mono text-gold-400/60 uppercase">
              Click word to deconstruct
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {activeTokens.map((token: any, i: number) => (
              <button
                key={i}
                onClick={() => onWordClick && onWordClick(token)}
                className="group p-2 sm:px-3 sm:py-2 rounded-2xl bg-obsidian-800/90 hover:bg-gold-500/20 border border-gold-500/20 hover:border-gold-400 transition-all text-left cursor-pointer active:scale-95 shadow-sm"
              >
                <div className="text-xs sm:text-sm font-devanagari font-bold text-gold-100 group-hover:text-gold-300">
                  {token.word}
                </div>
                <div className="text-[11px] text-gold-300/80 font-sans mt-0.5">
                  {token.meaning || token.meaning_hi || token.meaning_en}
                </div>
                {token.dhatu && token.dhatu !== '-' && (
                  <div className="text-[9px] font-mono text-gold-400/60 mt-0.5">
                    धातु: {token.dhatu}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── TRANSLATION & MEANING CARD (सरलार्थ एवं भावार्थ) ───────────── */}
      <div className="bg-obsidian-900/90 border border-gold-500/25 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
        
        <div className="flex items-center justify-between border-b border-gold-500/15 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gold-400" />
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-gold-100">
              सरलार्थ एवं भावार्थ ({LANGUAGES.find(l => l.code === selectedLang)?.label})
            </h3>
          </div>
          {isLoadingLang && (
            <span className="text-xs font-mono text-amber-400 flex items-center gap-1.5 animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              अनुवाद लोड हो रहा है...
            </span>
          )}
        </div>

        <p className="text-sm sm:text-base text-gold-100 font-sans leading-relaxed">
          {getActiveTranslation()}
        </p>

        {/* ── DEEP PHILOSOPHICAL BHASHYA (गूढ़ भाष्य एवं टीका) ─────────── */}
        <div className="pt-3 border-t border-gold-500/15 space-y-2">
          <button
            onClick={() => setShowBhashya(!showBhashya)}
            className="text-xs font-cinzel font-bold text-gold-300 hover:text-gold-200 flex items-center gap-1.5 cursor-pointer py-1"
          >
            <span>📜</span>
            <span>{showBhashya ? 'गूढ़ भाष्य एवं आध्यात्मिक रहस्य छिपाएं' : 'गूढ़ भाष्य एवं आध्यात्मिक रहस्य देखें'}</span>
          </button>

          {showBhashya && (
            <div className="p-4 rounded-2xl bg-obsidian-950/70 border border-gold-500/15 text-xs sm:text-sm text-gold-300/90 font-sans leading-relaxed space-y-2 animate-in fade-in">
              <p>{getActiveBhashya()}</p>
            </div>
          )}
        </div>

      </div>

      {/* ── PRACTICAL REAL-WORLD INSIGHT CARD (व्यावहारिक सूत्र) ───────── */}
      <div className="bg-gradient-to-r from-amber-500/15 via-gold-500/10 to-obsidian-900 border border-gold-500/35 rounded-3xl p-5 sm:p-6 shadow-xl space-y-2.5">
        <div className="flex items-center gap-2 text-amber-300 font-cinzel text-xs sm:text-sm font-bold uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>दैनिक जीवन में व्यावहारिक अनुप्रयोग (Actionable Modern Insight)</span>
        </div>
        <p className="text-xs sm:text-sm text-gold-200 font-sans leading-relaxed">
          {verse.practical_insight}
        </p>
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
          className="px-5 py-3 rounded-2xl bg-obsidian-900 hover:bg-obsidian-850 border border-gold-500/20 text-gold-200 hover:text-gold-100 font-sans text-xs sm:text-sm font-bold flex items-center gap-2 transition-all active:scale-95 shadow-md"
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
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-obsidian-950 font-sans text-xs sm:text-sm font-bold flex items-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(232,163,32,0.35)]"
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
