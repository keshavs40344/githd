'use client';

import React, { useState, useEffect } from 'react';
import type { GitaVerse, AnvayaToken } from '../types/verse';
import type { MentorDiagnosis } from '../types/mentor';
import AIVoiceSpeaker from './AIVoiceSpeaker';
import WisdomCardModal from './WisdomCardModal';
import { Bookmark, BookmarkCheck, Copy, Check, ChevronRight, ChevronLeft, Sparkles, BookOpen, Volume2, Share2, Compass } from 'lucide-react';
import { Button } from './ui/Button';

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
  const [showHindi, setShowHindi] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showWisdomCard, setShowWisdomCard] = useState(false);

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
    } catch {
      // ignore
    }
  };

  const copyVerse = async () => {
    const textToCopy = `Bhagavad Gita ${verse.chapter}.${verse.verse}\n\n${verse.devanagari}\n\n${verse.iast}\n\nTranslation: ${verse.translation_en}\n\nPractical Insight: ${verse.practical_insight}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
    word_by_word_anvaya: (verse.anvaya_tokens || []).map(t => ({
      sanskrit_word: t.word,
      root_dhatu: t.dhatu,
      grammar_case: t.vibhakti,
      meaning: t.meaning_en
    })),
    simple_translation: verse.translation_en,
    cognitive_reframing_case: {
      modern_dilemma: 'Contemplation of universal truth and overcoming life dilemmas.',
      psychological_reframe: verse.practical_insight
    },
    mindfulness_breathwork_sync: {
      technique_name: '4-4-4-4 Box Breathing (समवृत्ति प्राणायाम)',
      guided_instruction: '४ सेकंड श्वास लें; ४ सेकंड रोकें; ४ सेकंड छोड़ें; ४ सेकंड शांत रहें।'
    },
    shri_krishna_uvacha: {
      divine_address: 'पार्थ! हे मेरे सखे, मेरी ओर देखो!',
      deep_counsel: verse.practical_insight,
      immediate_24hr_dharma_action: 'आज इस श्लोक की सीख को अपने किसी एक महत्त्वपूर्ण कार्य में निष्काम भाव से लागू करें।'
    }
  };


  return (
    <article className="w-full bg-obsidian-900/90 border border-gold-500/20 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-2xl transition-all duration-300 relative overflow-hidden">
      {/* Top Controls & Badges */}
      <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-gold-500/15">
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-widest bg-gold-500/15 border border-gold-500/30 text-gold-300">
            CH {verse.chapter} · V {verse.verse}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isBookmarked 
                ? 'bg-gold-500/20 border-gold-400 text-gold-300' 
                : 'bg-obsidian-800 border-gold-500/20 text-obsidian-400 hover:text-gold-200'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Bookmark verse'}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-gold-400" /> : <Bookmark className="w-4 h-4" />}
          </button>

          <button
            onClick={copyVerse}
            className="p-2 rounded-xl bg-obsidian-800 border border-gold-500/20 text-obsidian-400 hover:text-gold-200 transition-all cursor-pointer"
            title="Copy Shloka"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setShowWisdomCard(true)}
            className="px-3 py-1.5 rounded-xl bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 text-gold-300 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span className="hidden sm:inline">Wisdom Card</span>
          </button>
        </div>
      </div>

      {/* Sanskrit Devanagari Typography with Interactive Anvaya Tokens */}
      <div className="text-center my-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-devanagari text-gold-100 font-bold leading-loose tracking-wide select-none drop-shadow-[0_0_20px_rgba(223,168,55,0.2)]">
          {verse.anvaya_tokens && verse.anvaya_tokens.length > 0 ? (
            <span className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {verse.anvaya_tokens.map((token, i) => (
                <button
                  key={i}
                  onClick={() => onWordClick && onWordClick(token)}
                  className="px-2 py-1 rounded-xl hover:bg-gold-500/20 border border-transparent hover:border-gold-400/40 text-gold-100 hover:text-gold-300 transition-all duration-200 cursor-pointer text-center"
                  title={`Analyze: ${token.meaning_en}`}
                >
                  {token.word}
                </button>
              ))}
            </span>
          ) : (
            verse.devanagari
          )}
        </h2>

        {/* IAST Transliteration */}
        <p className="mt-4 text-xs sm:text-sm font-serif italic text-gold-300/80 tracking-wider">
          {verse.iast}
        </p>
      </div>

      {/* English Translation */}
      <div className="my-6 p-5 rounded-2xl bg-obsidian-800/60 border border-gold-500/15">
        <h4 className="text-[11px] font-mono uppercase tracking-widest text-gold-400 font-bold mb-2">
          English Translation
        </h4>
        <p className="text-base text-gold-50/95 leading-relaxed font-serif">
          "{verse.translation_en}"
        </p>
      </div>

      {/* Hindi Translation Collapsible */}
      <div className="my-4">
        <button
          onClick={() => setShowHindi(!showHindi)}
          className="text-xs font-mono text-gold-400/80 hover:text-gold-300 flex items-center gap-1.5 cursor-pointer"
        >
          <span>{showHindi ? '▼ Hide Hindi Translation' : '▶ Show Hindi Translation (हिन्दी अनुवाद)'}</span>
        </button>
        {showHindi && (
          <div className="mt-2.5 p-4 rounded-2xl bg-obsidian-800/40 border border-gold-500/10 text-sm font-devanagari text-gold-200/90 leading-relaxed">
            {verse.translation_hi}
          </div>
        )}
      </div>

      {/* Practical Life Application Insight */}
      <div className="my-6 p-5 rounded-2xl bg-gradient-to-r from-obsidian-800/80 to-amber-950/20 border border-gold-500/25">
        <h4 className="text-[11px] font-mono uppercase tracking-widest text-gold-400 font-bold mb-1.5 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-gold-400" />
          <span>Practical Life Application</span>
        </h4>
        <p className="text-sm text-gold-100/90 leading-relaxed font-sans">
          {verse.practical_insight}
        </p>
      </div>

      {/* AI Voice Reciter */}
      <div className="mt-6 pt-4 border-t border-gold-500/15">
        <AIVoiceSpeaker 
          text={`${verse.devanagari}. ${verse.translation_en}. Practical Insight: ${verse.practical_insight}`}
          sanskrit={verse.devanagari}
          label="Chant & Recite Verse"
        />
      </div>

      {/* Next / Previous Quick Pagination */}
      <div className="flex items-center justify-between pt-6 mt-6 border-t border-gold-500/15">
        <Button 
          onClick={onPrev} 
          disabled={!onPrev} 
          variant="secondary" 
          size="sm" 
          className="gap-2 rounded-xl text-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Verse</span>
        </Button>

        <Button 
          onClick={onNext} 
          disabled={!onNext} 
          variant="primary" 
          size="sm" 
          className="gap-2 rounded-xl text-xs shadow-[0_0_15px_rgba(223,168,55,0.3)]"
        >
          <span>Next Verse</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Wisdom Card Export Modal */}
      {showWisdomCard && (
        <WisdomCardModal 
          diagnosis={currentDiagnosis} 
          onClose={() => setShowWisdomCard(false)} 
        />
      )}
    </article>
  );
}

