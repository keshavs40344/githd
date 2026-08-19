'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Flame, CheckCircle, Circle, Volume2, Calendar, Award, ChevronDown, ChevronUp, Radio, RotateCcw } from 'lucide-react';
import { Button } from './ui/Button';
import { sacredAudio } from '@/lib/sacredSounds';

interface DailyShloka {
  chapter: number;
  verse: number;
  sanskrit: string;
  iast: string;
  translation: string;
  reflection: string;
}

const DAILY_SHLOKAS: DailyShloka[] = [
  {
    chapter: 2,
    verse: 47,
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    iast: 'karmaṇy-evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo \'stv akarmaṇi ||',
    translation: 'तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। फल की इच्छा छोड़कर निष्काम कर्म करो।',
    reflection: 'आज किसी भी कार्य को परिणाम के दबाव के बिना, केवल अपनी सर्वोच्च एकाग्रता और उत्कृष्टता के साथ करें।'
  },
  {
    chapter: 2,
    verse: 48,
    sanskrit: 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥',
    iast: 'yoga-sthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanañjaya |\nsiddhy-asiddhyoḥ samo bhūtvā samatvaṁ yoga ucyate ||',
    translation: 'हे धनंजय! आसक्ति त्यागकर, सफलता और असफलता में समान भाव रखकर कर्म करो। मन की यह समता ही योग है।',
    reflection: 'आज जब भी मन में असफलता का डर आए, मन को समत्व भाव में स्थिर करें।'
  },
  {
    chapter: 6,
    verse: 5,
    sanskrit: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥',
    iast: 'uddhared ātmanātmānaṁ nātmānam avasādayet |\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ ||',
    translation: 'मनुष्य को अपने मन द्वारा अपना उद्धार करना चाहिए। क्योंकि आत्मा ही स्वयं का मित्र है और आत्मा ही स्वयं का शत्रु है।',
    reflection: 'आज नकारात्मक आत्म-वार्ता (negative self-talk) को रोकें और अपने मन को अपना सबसे सच्चा मित्र बनाएं।'
  },
  {
    chapter: 9,
    verse: 22,
    sanskrit: 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥',
    iast: 'ananyāś cintayanto māṁ ye janāḥ paryupāsate |\nteṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham ||',
    translation: 'जो अनन्य भाव से मेरा चिंतन करते हैं, उनके योग और क्षेम की रक्षा का भार मैं स्वयं वहन करता हूँ।',
    reflection: 'जीवन की सारी चिंताओं का बोझ अकेले न उठाएं; परमात्मा की कृपा पर गहरा विश्वास रखें।'
  },
  {
    chapter: 18,
    verse: 66,
    sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥',
    iast: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja |\nahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ ||',
    translation: 'संपूर्ण चिंताओं और बंधनों को त्यागकर मेरी शरण में आओ। मैं तुम्हें समस्त दुखों से मुक्त कर दूँगा, शोक मत करो।',
    reflection: 'आज के दिन जो कुछ भी आपके नियंत्रण से बाहर है, उसे पूर्ण समर्पण के साथ परमात्मा को सौंप दें।'
  }
];

export default function DailySadhanaWidget() {
  const [streak, setStreak] = useState(0);
  const [isCompletedToday, setIsCompletedToday] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  // 108 Mala Japa state
  const [japaCount, setJapaCount] = useState(0);
  const [malaRounds, setMalaRounds] = useState(0);

  // Deterministic Shloka for today
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const dailyShloka = DAILY_SHLOKAS[dayOfYear % DAILY_SHLOKAS.length];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedStreak = parseInt(localStorage.getItem('dharma_sadhana_streak') || '0', 10);
        const lastDate = localStorage.getItem('dharma_last_sadhana_date');
        const savedJapa = parseInt(localStorage.getItem('dharma_japa_count') || '0', 10);
        setJapaCount(savedJapa);

        if (lastDate === dateStr) {
          setIsCompletedToday(true);
          setStreak(savedStreak || 1);
        } else if (lastDate) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];

          if (lastDate === yesterdayStr) {
            setStreak(savedStreak);
          } else {
            setStreak(0);
          }
        }
      } catch {}
    }
  }, [dateStr]);

  const completeSadhana = () => {
    if (isCompletedToday) return;

    sacredAudio.playTempleBell(0.35);
    sacredAudio.playSingingBowl(0.3);

    const newStreak = streak + 1;
    setStreak(newStreak);
    setIsCompletedToday(true);

    if (typeof window !== 'undefined') {
      localStorage.setItem('dharma_sadhana_streak', newStreak.toString());
      localStorage.setItem('dharma_last_sadhana_date', dateStr);
    }
  };

  const handleBeadClick = () => {
    sacredAudio.playNavChime(0.15);
    const nextCount = japaCount + 1;
    if (nextCount >= 108) {
      sacredAudio.playTempleBell(0.4);
      setMalaRounds(prev => prev + 1);
      setJapaCount(0);
      if (!isCompletedToday) completeSadhana();
    } else {
      setJapaCount(nextCount);
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('dharma_japa_count', (nextCount % 108).toString());
    }
  };

  const resetJapa = () => {
    setJapaCount(0);
    sacredAudio.playNavChime(0.12);
  };

  const playChant = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }

      sacredAudio.playFluteChime(0.25);
      setIsPlayingAudio(true);
      const text = `Bhagavad Gita Chapter ${dailyShloka.chapter}, Verse ${dailyShloka.verse}. ${dailyShloka.sanskrit}. Translation: ${dailyShloka.translation}. Daily reflection: ${dailyShloka.reflection}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.82;
      utterance.pitch = 0.8;

      const voices = window.speechSynthesis.getVoices();
      const divineVoice = voices.find(v => v.lang.includes('IN')) || voices.find(v => v.lang.includes('hi')) || voices[0];
      if (divineVoice) utterance.voice = divineVoice;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-gradient-to-br from-obsidian-900 via-obsidian-900/98 to-amber-950/25 border border-gold-500/25 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl space-y-5">
      {/* Header with Streak */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 via-gold-500 to-amber-700 flex items-center justify-center text-obsidian-950 font-bold shadow-[0_0_20px_rgba(245,158,11,0.4)] sacred-pulse">
            <Flame className="w-6 h-6 fill-current text-obsidian-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-gold-100 font-display">नित्य गीता साधना (Daily Sadhana)</h3>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 font-bold">
                <Flame className="w-3 h-3 fill-current text-amber-400" />
                <span>{streak} Day{streak !== 1 ? 's' : ''} Streak</span>
              </span>
            </div>
            <p className="text-xs text-gold-400/70 font-sans flex items-center gap-1.5 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-gold-400" />
              <span>{formattedDate} • आज का दिव्य श्लोक एवं चिंतन</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl bg-obsidian-800 border border-gold-500/20 text-gold-400 hover:text-gold-100 transition-colors cursor-pointer"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Shloka Content */}
      {isExpanded && (
        <div className="space-y-5 pt-1 animate-in fade-in">
          
          {/* Shloka Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-obsidian-800/90 to-obsidian-850/90 border border-gold-500/25 space-y-4 relative overflow-hidden shadow-lg">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-cinzel font-bold uppercase tracking-widest text-gold-300 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/30">
                BHAGAVAD GĪTĀ {dailyShloka.chapter}.{dailyShloka.verse}
              </span>

              <button
                onClick={playChant}
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-sans transition-all cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 border-gold-400 font-bold shadow-[0_0_12px_rgba(232,163,32,0.4)]'
                    : 'bg-obsidian-900 text-gold-300 border-gold-500/20 hover:border-gold-400'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isPlayingAudio ? 'मंत्र पाठ चल रहा है...' : 'श्रवण करें'}</span>
              </button>
            </div>

            <p className="text-lg sm:text-xl font-devanagari font-bold text-gold-100 leading-relaxed whitespace-pre-line text-center py-2 text-glow-gold">
              {dailyShloka.sanskrit}
            </p>

            <p className="text-xs font-serif italic text-gold-300/80 text-center">
              {dailyShloka.iast}
            </p>

            <div className="pt-3 border-t border-gold-500/15 text-xs sm:text-sm text-gold-200/90 leading-relaxed font-sans">
              <span className="text-gold-400 font-bold font-display">सरल भावार्थ: </span>
              {dailyShloka.translation}
            </div>

            <div className="p-3.5 rounded-xl bg-gold-500/10 border border-gold-500/25 text-xs sm:text-sm text-gold-100 font-sans">
              <span className="text-gold-400 font-bold font-display">आज का साधना संकल्प: </span>
              {dailyShloka.reflection}
            </div>
          </div>

          {/* 108 Mala Japa Interactive Counter */}
          <div className="p-4 sm:p-5 rounded-2xl bg-obsidian-850/80 border border-gold-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold font-display text-gold-100">📿 १०८ महामंत्र जप माला</span>
                {malaRounds > 0 && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {malaRounds} Mala Completed
                  </span>
                )}
              </div>
              <button 
                onClick={resetJapa}
                className="text-[11px] text-gold-400/60 hover:text-gold-300 flex items-center gap-1 font-mono cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-obsidian-950 h-2.5 rounded-full overflow-hidden border border-gold-500/20">
              <div 
                className="h-full bg-gradient-to-r from-gold-500 via-amber-400 to-amber-600 transition-all duration-200 rounded-full"
                style={{ width: `${(japaCount / 108) * 100}%` }}
              />
            </div>

            {/* Bead Touch Area */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="text-xs font-mono text-gold-300">
                <strong className="text-gold-100 text-sm">{japaCount}</strong> / 108 मनके
              </span>

              <button
                onClick={handleBeadClick}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-obsidian-950 font-bold text-xs font-sans flex items-center gap-2 shadow-[0_0_15px_rgba(232,163,32,0.35)] cursor-pointer active:scale-95 transition-all"
              >
                <span>📿 मनका स्पर्श करें (Count Bead)</span>
              </button>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <span className="text-xs font-sans text-gold-400/70">
              {isCompletedToday ? '✨ आज की नित्य साधना पूर्ण हो चुकी है!' : 'श्लोक का मनन करें और अपनी दैनिक साधना दर्ज करें'}
            </span>

            <Button
              onClick={completeSadhana}
              disabled={isCompletedToday}
              variant={isCompletedToday ? 'secondary' : 'primary'}
              size="sm"
              className={`rounded-xl text-xs font-sans font-bold gap-1.5 cursor-pointer py-2.5 px-5 ${
                isCompletedToday
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                  : 'shadow-[0_0_18px_rgba(223,168,55,0.4)]'
              }`}
            >
              {isCompletedToday ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>साधना पूर्ण</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>आज की साधना पूर्ण करें</span>
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

