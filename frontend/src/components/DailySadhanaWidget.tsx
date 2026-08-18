'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Flame, CheckCircle, Circle, Volume2, Calendar, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/Button';

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
            // Streak broke
            setStreak(0);
          }
        }
      } catch {}
    }
  }, [dateStr]);

  const completeSadhana = () => {
    if (isCompletedToday) return;

    const newStreak = streak + 1;
    setStreak(newStreak);
    setIsCompletedToday(true);

    if (typeof window !== 'undefined') {
      localStorage.setItem('dharma_sadhana_streak', newStreak.toString());
      localStorage.setItem('dharma_last_sadhana_date', dateStr);
    }
  };

  const playChant = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }

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
    <div className="bg-gradient-to-br from-obsidian-900 via-obsidian-900/95 to-amber-950/30 border border-gold-500/25 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-4">
      {/* Header with Streak */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-obsidian-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]">
            <Flame className="w-5 h-5 fill-current text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-gold-100 font-mono">Daily Gita Sadhana</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 font-bold">
                <Flame className="w-3 h-3 fill-current text-amber-400" />
                <span>{streak} Day{streak !== 1 ? 's' : ''} Streak</span>
              </span>
            </div>
            <p className="text-xs text-gold-400/70 font-mono flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gold-400" />
              <span>{formattedDate} • Today's Divine Contemplation</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-xl bg-obsidian-800 border border-gold-500/20 text-gold-400 hover:text-gold-100 transition-colors cursor-pointer"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Shloka Content */}
      {isExpanded && (
        <div className="space-y-4 pt-1 animate-in fade-in">
          {/* Shloka Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-obsidian-800/80 border border-gold-500/20 space-y-3 relative overflow-hidden">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-gold-400 bg-gold-400/10 px-2.5 py-0.5 rounded-full border border-gold-400/30">
                BHAGAVAD GITA {dailyShloka.chapter}.{dailyShloka.verse}
              </span>

              <button
                onClick={playChant}
                className={`p-1.5 rounded-xl border flex items-center gap-1 text-[11px] font-mono transition-all cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-gold-500 text-obsidian-950 border-gold-400 font-bold'
                    : 'bg-obsidian-900 text-gold-300 border-gold-500/20 hover:border-gold-400'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isPlayingAudio ? 'Chanting...' : 'Listen'}</span>
              </button>
            </div>

            <p className="text-base sm:text-lg font-devanagari font-bold text-gold-100 leading-relaxed whitespace-pre-line text-center py-1">
              {dailyShloka.sanskrit}
            </p>

            <p className="text-xs font-serif italic text-gold-300/80 text-center">
              {dailyShloka.iast}
            </p>

            <div className="pt-2 border-t border-gold-500/10 text-xs text-gold-200/90 leading-relaxed">
              <span className="text-gold-400 font-bold font-mono">Meaning: </span>
              {dailyShloka.translation}
            </div>

            <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/20 text-xs text-gold-100 font-sans">
              <span className="text-gold-400 font-bold font-mono">Today's Practice: </span>
              {dailyShloka.reflection}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <span className="text-[11px] font-mono text-gold-400/60">
              {isCompletedToday ? '✨ Today’s contemplation accomplished!' : 'Contemplate the verse and check in to keep your streak'}
            </span>

            <Button
              onClick={completeSadhana}
              disabled={isCompletedToday}
              variant={isCompletedToday ? 'secondary' : 'primary'}
              size="sm"
              className={`rounded-xl text-xs font-mono font-bold gap-1.5 cursor-pointer ${
                isCompletedToday
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                  : 'shadow-[0_0_15px_rgba(223,168,55,0.35)]'
              }`}
            >
              {isCompletedToday ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sadhana Completed</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Complete Today's Sadhana</span>
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
