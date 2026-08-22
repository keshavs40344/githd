'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Sparkles, CheckCircle2, Award, RefreshCw, 
  Volume2, Play, Pause, BookOpen, HelpCircle, Layers, ChevronRight, Check
} from 'lucide-react';
import { sacredAudio } from '@/lib/sacredSounds';

interface ShlokaPronunciationTrainerProps {
  devanagari: string;
  iast: string;
  chapter: number;
  verse: number;
}

// Function to generate phonetic syllables in Hindi and English
function generatePhoneticBreakdown(devanagariText: string, iastText: string) {
  const cleanDev = devanagariText.replace(/[।॥\n,.]/g, ' ').trim();
  const words = cleanDev.split(/\s+/).filter(w => w.length > 0);
  const iastWords = iastText.replace(/[,.]/g, ' ').trim().split(/\s+/).filter(w => w.length > 0);

  return words.map((w, idx) => {
    const iastWord = iastWords[idx] || w;
    // Create hyphenated syllables for ease of learning
    const syllables = w.length > 3 ? w.match(/.{1,2}/g)?.join('-') || w : w;
    const englishPhonetics = iastWord
      .toUpperCase()
      .replace(/Ā/g, 'AA')
      .replace(/Ī/g, 'EE')
      .replace(/Ū/g, 'OO')
      .replace(/Ṛ/g, 'RI')
      .replace(/Ś/g, 'SH')
      .replace(/Ṣ/g, 'SH');

    return {
      word: w,
      syllables: syllables,
      iast: iastWord,
      englishPhonetic: englishPhonetics
    };
  });
}

// Common difficult Sanskrit conjunct rules for beginners
const SANSKRIT_PRONUNCIATION_TIPS = [
  { char: 'ज्ञ (Jña)', rule: 'इसका उच्चारण "ग्य" (Gya) अथवा "ज्ञ" (Jnya) के समान तालव्य से करें।' },
  { char: 'क्ष (Kṣa)', rule: 'क् + ष का संयुक्त रूप, इसे "क्-ष" (Ksha) बोलें, केवल "छ" न कहें।' },
  { char: 'ऋ (Ṛ / Ri)', rule: 'इसका उच्चारण "रि" (Ri) की तरह कोमल स्वर में किया जाता है।' },
  { char: 'ः (विसर्ग)', rule: 'अंत में हल्की "ह" की ध्वनि छोड़ें (जैसे नमः = नम-ह)।' },
  { char: 'ं (अनुस्वार)', rule: 'अगले वर्ण के अनुसार "म" या "न" की नासिका ध्वनि दें।' }
];

export default function ShlokaPronunciationTrainer({
  devanagari,
  iast,
  chapter,
  verse
}: ShlokaPronunciationTrainerProps) {
  const [activeTab, setActiveTab] = useState<'trainer' | 'phonics' | 'tips'>('trainer');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [wordMatches, setWordMatches] = useState<{ word: string; matched: boolean }[]>([]);
  const [supported, setSupported] = useState(true);
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.75);
  
  const recognitionRef = useRef<any>(null);
  const phoneticBreakdown = generatePhoneticBreakdown(devanagari, iast);

  // Clean words for comparison
  const targetWords = devanagari
    .replace(/[।॥,.]/g, ' ')
    .split(/\s+/)
    .filter(w => w.trim().length > 0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setSupported(false);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'hi-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
        setScore(null);
        setFeedback(null);
      };

      recognition.onresult = (event: any) => {
        const spokenText = event.results[0][0].transcript;
        setTranscript(spokenText);
        evaluatePronunciation(spokenText);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error !== 'no-speech') {
          setFeedback('ध्वनि स्पष्ट नहीं सुनी जा सकी। कृपया पुनः प्रयास करें।');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [devanagari]);

  // Pronounce any specific word via browser speech synthesis at desired speed
  const speakSanskritWord = (text: string, speed = playbackSpeed) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = speed;
      utterance.pitch = 1.0;
      
      utterance.onstart = () => setSpeakingWord(text);
      utterance.onend = () => setSpeakingWord(null);
      utterance.onerror = () => setSpeakingWord(null);

      window.speechSynthesis.speak(utterance);
      sacredAudio.playNavChime(0.04);
    }
  };

  const evaluatePronunciation = (spoken: string) => {
    const spokenLower = spoken.toLowerCase().replace(/[^\u0900-\u097F]/g, ' ');
    const spokenWords = spokenLower.split(/\s+/).filter(w => w.length > 0);

    let matchCount = 0;
    const matches = targetWords.map(target => {
      const targetClean = target.toLowerCase().replace(/[^\u0900-\u097F]/g, '');
      const isMatched = spokenWords.some(sw => {
        if (sw === targetClean) return true;
        if (targetClean.includes(sw) && sw.length >= 3) return true;
        if (sw.includes(targetClean) && targetClean.length >= 3) return true;
        return false;
      });

      if (isMatched) matchCount++;
      return { word: target, matched: isMatched };
    });

    const calculatedScore = Math.min(100, Math.round((matchCount / Math.max(1, targetWords.length)) * 100));
    setWordMatches(matches);
    setScore(calculatedScore);

    if (calculatedScore >= 85) {
      setFeedback('उत्तमम्! (अति शुद्ध एवं स्पष्ट संस्कृत उच्चारण)');
      sacredAudio.playTempleBell(0.3);
    } else if (calculatedScore >= 60) {
      setFeedback('शोभनम्! (अच्छा प्रयास, थोड़े और अभ्यास से पूर्ण सिद्धि होगी)');
      sacredAudio.playNavChime(0.2);
    } else {
      setFeedback('पुनः प्रयासं कुरु (नीचे दिए गए अक्षर-विच्छेद को धीमी गति में सुनकर अभ्यास करें)');
    }
  };

  const startListening = () => {
    sacredAudio.playNavChime(0.1);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        recognitionRef.current.stop();
        setTimeout(() => recognitionRef.current.start(), 200);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <div className="rounded-3xl bg-[#0f111c]/95 backdrop-blur-2xl border-2 border-emerald-500/40 p-5 sm:p-7 shadow-2xl space-y-5 relative overflow-hidden">
      
      {/* Header with Badges and Modes */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-500/20 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-serif font-bold text-[#f5eed9] flex items-center gap-2">
              <span>संस्कृत शुद्ध उच्चारण गुरु (AI Pronunciation Trainer)</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                BEGINNER FRIENDLY
              </span>
            </h3>
            <p className="text-[11px] text-[#c5a059]/80 font-sans">
              संस्कृत शब्दों को तोड़कर सरल उच्चारण सीखें, धीमी गति में सुनें और अपना उच्चारण परखें
            </p>
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="flex items-center bg-[#141624] border border-[#c5a059]/30 p-1 rounded-xl">
          <button
            onClick={() => { setActiveTab('trainer'); sacredAudio.playNavChime(0.04); }}
            className={`px-3 py-1 rounded-lg text-xs font-serif transition-all cursor-pointer ${
              activeTab === 'trainer'
                ? 'bg-emerald-500 text-black font-bold shadow-md'
                : 'text-[#c5a059]/70 hover:text-white'
            }`}
          >
            उच्चारण परीक्षा
          </button>
          <button
            onClick={() => { setActiveTab('phonics'); sacredAudio.playNavChime(0.04); }}
            className={`px-3 py-1 rounded-lg text-xs font-serif transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'phonics'
                ? 'bg-emerald-500 text-black font-bold shadow-md'
                : 'text-[#c5a059]/70 hover:text-white'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            <span>अक्षर-विच्छेद गाइड</span>
          </button>
          <button
            onClick={() => { setActiveTab('tips'); sacredAudio.playNavChime(0.04); }}
            className={`px-3 py-1 rounded-lg text-xs font-serif transition-all cursor-pointer ${
              activeTab === 'tips'
                ? 'bg-emerald-500 text-black font-bold shadow-md'
                : 'text-[#c5a059]/70 hover:text-white'
            }`}
          >
            कठिन वर्ण नियम
          </button>
        </div>
      </div>

      {activeTab === 'trainer' && (
        /* ── TAB 1: INTERACTIVE SPEECH RECOGNITION TRAINER ───────────────────── */
        <div className="space-y-4">
          
          {/* Target Shloka Display with Interactive Word Tap */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#141624]/90 border border-emerald-500/25 space-y-2.5 text-center">
            <span className="text-[10px] font-mono text-emerald-400/80 uppercase tracking-widest block">
              (किसी भी शब्द को दबाकर धीमी गति में सही उच्चारण सुनें 🔊)
            </span>

            <div className="flex flex-wrap items-center justify-center gap-2 py-2">
              {targetWords.map((word, idx) => {
                const matchInfo = wordMatches.find(m => m.word === word);
                const isSpeakingThis = speakingWord === word;

                return (
                  <button
                    key={idx}
                    onClick={() => speakSanskritWord(word)}
                    className={`px-3 py-1.5 rounded-xl border text-sm sm:text-base font-devanagari font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSpeakingThis
                        ? 'bg-emerald-400 text-black font-bold scale-105 shadow-[0_0_15px_rgba(52,211,153,0.8)] border-white'
                        : matchInfo?.matched
                        ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200'
                        : 'bg-[#181b2e] border-[#c5a059]/25 text-[#f5eed9] hover:border-emerald-400 hover:bg-[#20253f]'
                    }`}
                    title="क्लिक करके सही उच्चारण सुनें"
                  >
                    <span>{word}</span>
                    <Volume2 className="w-3 h-3 opacity-60" />
                  </button>
                );
              })}
            </div>

            {/* Chanting Speed Selector */}
            <div className="flex items-center justify-center gap-2 pt-2 border-t border-[#c5a059]/15">
              <span className="text-[11px] font-serif text-[#c5a059]">गुरु उच्चारण गति:</span>
              {[
                { speed: 0.5, label: '🐢 0.5x (अति सरल)' },
                { speed: 0.75, label: '🚶 0.75x (मध्यम)' },
                { speed: 1.0, label: '⚡ 1.0x (शास्त्रीय)' }
              ].map(s => (
                <button
                  key={s.speed}
                  onClick={() => {
                    setPlaybackSpeed(s.speed);
                    sacredAudio.playNavChime(0.04);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-sans transition-all cursor-pointer ${
                    playbackSpeed === s.speed
                      ? 'bg-emerald-500 text-black font-bold shadow-sm'
                      : 'bg-[#141624] text-[#c5a059]/70 hover:text-white border border-[#c5a059]/20'
                  }`}
                >
                  {s.label}
                </button>
              ))}
              
              <button
                onClick={() => speakSanskritWord(devanagari.replace(/[।॥\n]/g, ' '))}
                className="ml-2 px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black border border-emerald-500/40 text-xs font-serif font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>सम्पूर्ण श्लोक सुनें</span>
              </button>
            </div>
          </div>

          {/* Microphone Action Deck */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#141624] via-[#101322] to-[#141624] border border-emerald-500/20">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-serif font-bold text-[#f5eed9] block">
                {isListening ? '🎙️ अब शुद्ध स्वर में श्लोक का पाठ करें...' : 'माइक दबाकर श्लोक बोलें और AI से जांचें'}
              </span>
              <span className="text-[11px] text-[#c5a059]/70 font-sans block">
                AI आपके संस्कृत उच्चारण की शुद्धता का विश्लेषण करेगा
              </span>
            </div>

            <div className="flex items-center gap-3">
              {isListening ? (
                <button
                  onClick={stopListening}
                  className="px-5 py-2.5 rounded-2xl bg-red-500 hover:bg-red-400 text-white text-xs font-serif font-bold flex items-center gap-2 shadow-lg animate-pulse cursor-pointer"
                >
                  <MicOff className="w-4 h-4" />
                  <span>रिकॉर्डिंग पूर्ण करें</span>
                </button>
              ) : (
                <button
                  onClick={startListening}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black text-xs font-serif font-bold flex items-center gap-2 shadow-xl hover:scale-102 transition-all cursor-pointer"
                >
                  <Mic className="w-4 h-4" />
                  <span>माइक चालू करें (Start Chanting)</span>
                </button>
              )}
            </div>
          </div>

          {/* Feedback & Score Results */}
          {score !== null && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#090b14] border-2 border-emerald-500/40 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-devanagari font-bold text-[#f5eed9]">
                    उच्चारण शुद्धता स्कोर:
                  </span>
                </div>
                <span className="text-xl font-mono font-bold text-emerald-300 px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-400/40">
                  {score}%
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-[#141829] overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                  style={{ width: `${score}%` }}
                />
              </div>

              <p className="text-xs font-devanagari font-semibold text-emerald-200">
                {feedback}
              </p>

              {transcript && (
                <div className="p-3 rounded-xl bg-[#141624] border border-[#c5a059]/15 text-[11px] text-[#f5eed9]/80 font-serif">
                  <span className="text-[#c5a059] font-bold">आपकी ध्वनि: </span>
                  "{transcript}"
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {activeTab === 'phonics' && (
        /* ── TAB 2: SYLLABLE-BY-SYLLABLE PHONETICS BREAKDOWN ────────────────── */
        <div className="space-y-4 animate-fade-in">
          <div className="p-3.5 rounded-2xl bg-[#141624] border border-emerald-500/20 text-xs font-serif text-[#e6c687] leading-relaxed">
            💡 <strong>सरल अभ्यास विधि:</strong> यदि आपको बड़ा संस्कृत शब्द बोलने में कठिनाई हो रही है, तो नीचे दिए गए खंडों (Syllables) को एक-एक करके पढ़ें और क्लिक करके सुनें।
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {phoneticBreakdown.map((item, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-2xl bg-[#141624]/95 border border-[#c5a059]/20 hover:border-emerald-400 space-y-1.5 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-devanagari font-bold text-emerald-300">
                    {item.word}
                  </span>
                  <button
                    onClick={() => speakSanskritWord(item.word)}
                    className="p-1.5 rounded-lg bg-[#1e2238] group-hover:bg-emerald-500 group-hover:text-black text-[#c5a059] transition-colors cursor-pointer"
                    title="उच्चारण सुनें"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-0.5">
                  <div className="text-xs font-serif text-[#f5eed9]">
                    <span className="text-[#c5a059]/70 text-[10px] font-sans mr-1">ध्वनि रूप:</span>
                    <span className="bg-emerald-500/15 px-2 py-0.5 rounded text-emerald-200 font-mono">
                      [ {item.syllables} ]
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-[#c5a059]/90">
                    <span className="text-[#c5a059]/50 text-[10px] mr-1">English:</span>
                    <span>{item.englishPhonetic}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'tips' && (
        /* ── TAB 3: COMMON HARD SANSKRIT CONJUNCT RULES ─────────────────────── */
        <div className="space-y-3 animate-fade-in">
          <div className="p-3.5 rounded-2xl bg-[#141624] border border-emerald-500/20 text-xs font-serif text-[#e6c687]">
            📖 <strong>संस्कृत के कठिन संयुक्त अक्षरों का सही नियम:</strong>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SANSKRIT_PRONUNCIATION_TIPS.map((tip, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-2xl bg-[#141624]/90 border border-emerald-500/20 space-y-1"
              >
                <span className="text-xs font-devanagari font-bold text-emerald-300 block">
                  {tip.char}
                </span>
                <p className="text-xs text-[#f5eed9]/90 font-serif leading-relaxed">
                  {tip.rule}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
