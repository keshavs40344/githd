'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { SevenLayerMentorDiagnosis, AIModelOption, ChatMessage } from '@/types/mentor';
import MindfulBreathwork from './MindfulBreathwork';
import AIVoiceSpeaker from './AIVoiceSpeaker';
import WisdomCardModal from './WisdomCardModal';
import GunaIndicator from './GunaIndicator';
import { 
  Sparkles, ArrowLeft, Settings, Send, RefreshCw, Zap, ShieldCheck, 
  Compass, BookOpen, Heart, Brain, Mic, MicOff, MessageSquare, PlusCircle 
} from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/Button';
import { sacredAudio } from '@/lib/sacredSounds';

const MODEL_OPTIONS: { id: AIModelOption; label: string; desc: string }[] = [
  { id: 'param-prajna-deep', label: 'परम प्रज्ञा (Supreme Wisdom)', desc: 'गहन दार्शनिक एवं मानसिक मार्गदर्शन' },
  { id: 'divya-drishti-cosmic', label: 'दिव्य दृष्टि (Cosmic Insight)', desc: 'सर्वज्ञ चेतना एवं समग्र बोध' },
  { id: 'shighra-bodha-fast', label: 'शीघ्र बोध (Instant Guidance)', desc: 'तीव्र एवं स्पष्ट परामर्श' },
  { id: 'dharma-vedic-engine-v1', label: 'वैदिक स्मृति (Offline Sacred Mode)', desc: 'स्थानीय वैदिक ज्ञानकोष' },
];


const STARTER_PROMPTS = [
  { label: '⚡ Instant Anxiety & Panic Relief', prompt: 'I am experiencing severe overthinking, mental racing, panic, and restlessness. How do I instantly ground my consciousness in peace?' },
  { label: '🔥 Fear of Failure & Decision Paralysis', prompt: 'I am terrified of failing and making the wrong life choice. I feel paralyzed and cannot take action.' },
  { label: '💔 Heartbreak, Betrayal & Grief', prompt: 'I am experiencing deep emotional heartbreak, loss of a relationship, and intense grief. How do I heal my heart?' },
  { label: '🦁 Imposter Syndrome & Self-Doubt', prompt: 'I feel deeply inadequate, insecure, and like a failure despite my efforts. How do I awaken my true spiritual strength?' },
  { label: '⚔️ Anger, Workplace Injustice & Resentment', prompt: 'I am burning with anger and resentment toward someone who treated me unfairly. How do I reclaim my peace without losing my dignity?' },
  { label: '🎯 Procrastination, Inertia & Burnout', prompt: 'I am stuck in heavy lethargy, exhaustion, and procrastination. I cannot find the drive to fulfill my duties.' }
];


const DEFAULT_DIAGNOSIS: SevenLayerMentorDiagnosis = {
  psychological_telemetry: {
    dominant_guna: "Rajas",
    cognitive_distortion: "Outcome-Attachment & Catastrophizing (परिणाम-आसक्ति एवं काल्पनिक विभीषिका)",
    mind_state_diagnosis: "अहंकार द्वारा भविष्य के परिणामों पर पूर्ण नियंत्रण की चेष्टा, जिससे उत्पन्न भय ने बुद्धि को संशय और कर्म-पलायन के भंवर में धकेल दिया है।",
    guna_percentages: { sattva: 20, rajas: 65, tamas: 15 }
  },
  shloka_meta: {
    chapter: 2,
    verse: 47,
    chhanda_meter: "Anushtup (8-8-8-8 syllables)",
    sanskrit_devanagari: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    transliteration_iast: "karmaṇy-evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi ||"
  },
  audio_sonic_metadata: {
    recommended_raga_bgm: "Raga Ahir Bhairav on Low-Pitch Bansuri with 136.1 Hz Sacred Tanpura Drone (BPM: 50, Calming Meditation)",
    vocal_modulation_guidance: "Deep, resonant, slow cadence with compassionate gravity, spoken at 0.80x meditative pace",
    pronunciation_key: "Stress on 'कर्मणि' (kar-ma-ni) and distinct retroflex 'ष्' (ṣa in फलेषु)"
  },
  word_by_word_anvaya: [
    { sanskrit_word: "कर्मणि (karmaṇi)", root_dhatu: "√कृ (to act)", grammar_case: "सप्तमी विभक्ति, एकवचन", meaning: "केवल नियत कर्तव्य के संपादन में" },
    { sanskrit_word: "एव (eva)", root_dhatu: "अव्यय", grammar_case: "अव्यय", meaning: "निश्चित रूप से / ही" },
    { sanskrit_word: "अधिकारः (adhikāraḥ)", root_dhatu: "अधि + √कृ", grammar_case: "प्रथमा विभक्ति, एकवचन", meaning: "तुम्हारा वास्तविक सामर्थ्य और अधिकार" },
    { sanskrit_word: "ते (te)", root_dhatu: "युष्मद्", grammar_case: "षष्ठी विभक्ति, एकवचन", meaning: "तुम्हारा" },
    { sanskrit_word: "मा (mā)", root_dhatu: "अव्यय", grammar_case: "निषेधार्थक अव्यय", meaning: "कभी नहीं" },
    { sanskrit_word: "फलेषु (phaleṣu)", root_dhatu: "फल", grammar_case: "सप्तमी विभक्ति, बहुवचन", meaning: "कर्मों से मिलने वाले फलों में" },
    { sanskrit_word: "कदाचन (kadācana)", root_dhatu: "अव्यय", grammar_case: "अव्यय", meaning: "किसी भी काल या परिस्थिति में" },
    { sanskrit_word: "मा कर्मफलहेतुः (mā karma-phala-hetuḥ)", root_dhatu: "कर्म + फल + हेतु", grammar_case: "सामासिक पद", meaning: "कर्म के फल का कर्ता मत बनो" },
    { sanskrit_word: "सङ्गः अकर्मणि (saṅgaḥ akarmaṇi)", root_dhatu: "√सञ्ज् + √कृ", grammar_case: "सप्तमी", meaning: "अकर्मण्यता या कर्म त्यागने में आसक्ति मत हो" }
  ],
  simple_translation: "तुम्हारा अधिकार केवल निष्काम भाव से कर्म करने में है, उसके फलों में कभी नहीं। तुम स्वयं को कर्मों के फलों का कारण मत समझो, और न ही कर्म से विमुख होकर अकर्मण्यता में तुम्हारी प्रीति हो।",
  cognitive_reframing_case: {
    modern_dilemma: "करियर, स्टार्टअप अथवा परीक्षा के कुरुक्षेत्र में खड़ा एक व्यक्ति, जो इस भय से निर्णय नहीं ले पा रहा कि यदि वह असफल हुआ तो क्या होगा।",
    psychological_reframe: "मस्तिष्क का केंद्र 'परिणाम' से हटाकर 'प्रक्रिया' (Process Mastery) पर स्थापित करें। परिणाम भविष्य में है और अनेक कारकों पर निर्भर है, जबकि कर्म वर्तमान क्षण में आपकी पूर्ण सामर्थ्य में है।"
  },
  mindfulness_breathwork_sync: {
    technique_name: "4-4-4-4 Box Breathing (समवृत्ति प्राणायाम)",
    guided_instruction: "४ सेकंड श्वास अंदर लें (सचेत कर्तव्य); ४ सेकंड श्वास रोकें (स्थिर साक्षी भाव); ४ सेकंड श्वास बाहर छोड़ें (परिणाम का भय समर्पित); ४ सेकंड शून्य में ठहरें (परम शांति)।"
  },
  shri_krishna_uvacha: {
    divine_address: "पार्थ! हे मेरे प्रिय सखे, मेरी ओर देखो!",
    deep_counsel: "तुम इस क्षण जिस मानसिक संताप और भय से घिरे हो, वह तुम्हारे सामर्थ्य की कमी नहीं, अपितु तुम्हारी दृष्टि का भ्रम है। तुम भविष्य की उन छायाओं से युद्ध कर रहे हो जो अभी अस्तित्व में ही नहीं हैं। सुनो सखे! जब तुम किसी कार्य को इस शर्त पर करते हो कि परिणाम तुम्हारी इच्छानुसार ही होना चाहिए, तब तुम अपने चित्त को अशांति के हवाले कर देते हो। फल की वासना को मुझे अर्पित कर दो। निष्काम होकर, पूर्ण उत्कृष्टता के साथ केवल अपने स्वधर्म का निर्वाह करो। उठो पार्थ! इस हृदय की दुर्बलता को त्यागो और कर्मक्षेत्र में सन्नद्ध हो जाओ!",
    immediate_24hr_dharma_action: "अगले 24 घंटों के लिए यह संकल्प लें: जिस एक आवश्यक कार्य को आप परिणाम के संकोच या विफलता के भय से टाल रहे हैं, उसे अगले 30 मिनट में प्रारंभ करें। कार्य करते समय जब भी मन में 'सफलता या विफलता' का विचार आए, तुरंत समवृत्ति प्राणायाम करें और अपना ध्यान केवल कार्य की गुणवत्ता पर रखें।"
  }
};

interface KrishnaAIMentorProps {
  diagnosis?: SevenLayerMentorDiagnosis;
}

export default function KrishnaAIMentor({ diagnosis: initialDiagnosis }: KrishnaAIMentorProps) {
  const [problem, setProblem] = useState('');
  const [followUpText, setFollowUpText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AIModelOption>('param-prajna-deep');
  const [diagnosis, setDiagnosis] = useState<SevenLayerMentorDiagnosis>(initialDiagnosis || DEFAULT_DIAGNOSIS);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [activeMicTarget, setActiveMicTarget] = useState<'main' | 'followup' | null>(null);
  
  const [showWisdomCard, setShowWisdomCard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [groqKey, setGroqKey] = useState('');
  const [elevenLabsKey, setElevenLabsKey] = useState('');
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setGroqKey(localStorage.getItem('dharma_groq_key') || '');
      setElevenLabsKey(localStorage.getItem('dharma_elevenlabs_key') || '');

      const params = new URLSearchParams(window.location.search);
      const initialQuery = params.get('query');
      if (initialQuery) {
        setProblem(initialQuery);
        submitProblem(initialQuery);
      }
    }
  }, []);

  // Voice recognition helper (Speech to Text)
  const toggleVoiceInput = (target: 'main' | 'followup') => {
    if (typeof window === 'undefined') return;

    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      alert('Speech recognition is not supported in this browser. Please use Chrome/Edge or type your message.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setActiveMicTarget(null);
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'hi-IN'; // Multi-lingual default

      recognition.onstart = () => {
        setIsListening(true);
        setActiveMicTarget(target);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');

        if (target === 'main') {
          setProblem(transcript);
        } else {
          setFollowUpText(transcript);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        setActiveMicTarget(null);
      };

      recognition.onerror = () => {
        setIsListening(false);
        setActiveMicTarget(null);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
      setActiveMicTarget(null);
    }
  };

  const saveSettings = () => {

    if (typeof window !== 'undefined') {
      localStorage.setItem('dharma_groq_key', groqKey);
      localStorage.setItem('dharma_elevenlabs_key', elevenLabsKey);
    }
    sacredAudio.playNavChime();
    setShowSettings(false);
  };

  const submitProblem = async (queryText?: string, isFollowUp: boolean = false) => {
    const textToSubmit = queryText || (isFollowUp ? followUpText : problem);
    if (!textToSubmit.trim() || loading) return;

    // Sacred Sound Effect on submission (Conch / Bell invocation)
    sacredAudio.playShankhnaad(0.25);

    setLoading(true);
    if (isFollowUp) {
      setFollowUpText('');
    } else {
      setProblem('');
    }

    // Build conversation history for context
    const historyPayload = chatHistory.map(msg => ({
      role: msg.sender === 'seeker' ? ('user' as const) : ('assistant' as const),
      content: msg.text
    }));

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'seeker',
      text: textToSubmit,
      timestamp: Date.now()
    };

    setChatHistory(prev => [...prev, userMessage]);

    try {
      const res = await fetch('/api/v1/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          problem_description: textToSubmit,
          custom_api_key: groqKey,
          elevenlabs_api_key: elevenLabsKey,
          model: selectedModel,
          conversation_history: historyPayload
        })
      });

      const data = await res.json();
      if (data.success && data.diagnosis) {
        setDiagnosis(data.diagnosis);
        setExecutionTime(data.execution_time_ms);

        // OM chime when divine counsel is received
        sacredAudio.playOmChime(0.25);

        const krishnaResponse: ChatMessage = {
          id: `krishna-${Date.now()}`,
          sender: 'krishna',
          text: data.diagnosis.shri_krishna_uvacha.deep_counsel,
          timestamp: Date.now(),
          diagnosis: data.diagnosis
        };
        setChatHistory(prev => [...prev, krishnaResponse]);
      }
    } catch (err) {
      console.error('Error contacting mentor:', err);
    } finally {
      setLoading(false);
    }
  };

  const startNewConsultation = () => {
    sacredAudio.playTempleBell(0.3);
    setChatHistory([]);
    setProblem('');
    setFollowUpText('');
    setDiagnosis(DEFAULT_DIAGNOSIS);
  };


  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 text-gold-100 min-h-screen z-10 relative space-y-5">
      
      {/* ── Enterprise Header ───────────────────────── */}
      <header className="flex items-center justify-between p-4 sm:p-5 rounded-3xl glass-dark shadow-2xl">
        <div className="flex items-center gap-3.5">
          <Link href="/" className="p-2 rounded-xl bg-obsidian-800/80 border border-gold-500/20 text-gold-300 hover:text-gold-100 hover:border-gold-400/50 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-gold-400 via-gold-500 to-amber-700 flex items-center justify-center shadow-[0_0_24px_rgba(232,163,32,0.45)] sacred-pulse shrink-0">
            <Sparkles className="w-5 h-5 text-obsidian-950" />
          </div>
          <div>
            <h1 className="font-display text-base sm:text-lg font-bold text-gold-100 leading-tight flex items-center gap-2 flex-wrap">
              Bhagavān Śrī Kṛṣṇa
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-400/12 border border-gold-400/25 text-gold-300 font-sans font-normal tracking-wide">
                7-Layer Dharma Engine
              </span>
            </h1>
            <p className="text-xs text-gold-400/60 font-sans mt-0.5 leading-snug">
              Supreme Cognitive Guide · Your Sakha in Life's Kurukshetra
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {chatHistory.length > 0 && (
            <button
              onClick={startNewConsultation}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-obsidian-800/80 border border-gold-500/20 text-xs font-sans font-medium text-gold-300 hover:text-gold-100 transition-all cursor-pointer"
              title="Start New Topic"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New Topic</span>
            </button>
          )}

          <Link 
            href="/episodes"
            className="hidden sm:inline-flex px-3 py-1.5 rounded-xl bg-obsidian-800/80 border border-gold-500/20 text-xs font-sans font-medium text-gold-300 hover:text-gold-100 hover:border-gold-400/50 transition-all"
          >
            18 Episodes
          </Link>

          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value as AIModelOption)}
            className="bg-obsidian-800 text-gold-200 border border-gold-500/25 rounded-xl px-3 py-1.5 text-xs font-sans font-medium outline-none cursor-pointer hover:border-gold-400/50 transition-all"
          >
            {MODEL_OPTIONS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>

          <button 
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-xl bg-obsidian-800/80 border border-gold-500/20 text-gold-300 hover:text-gold-100 hover:border-gold-400/50 transition-all cursor-pointer"
            title="Configure API Keys"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>


      {/* Main Consultation Input */}
      <div className="bg-obsidian-900/90 border border-gold-500/20 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold">
            Present Your Mental Conflict, Dilemma, or Pain to Shri Krishna
          </label>
          
          {/* Voice Input Mic Button */}
          <button
            onClick={() => toggleVoiceInput('main')}
            className={`px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              isListening && activeMicTarget === 'main'
                ? 'bg-red-500/20 text-red-300 border border-red-500/50 animate-pulse'
                : 'bg-obsidian-800 text-gold-300/80 hover:text-gold-100 border border-gold-500/20'
            }`}
          >
            {isListening && activeMicTarget === 'main' ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
            <span>{isListening && activeMicTarget === 'main' ? 'Listening...' : 'Speak (बोलें)'}</span>
          </button>
        </div>

        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              submitProblem();
            }
          }}
          placeholder="Describe what troubles your heart and mind (career burnout, fear of failure, grief, decision paralysis, conflict)..."
          className="w-full bg-obsidian-800/90 border border-gold-500/20 rounded-2xl p-4 text-sm text-gold-100 placeholder:text-obsidian-400 focus:ring-1 focus:ring-gold-400/40 focus:border-gold-400/60 outline-none resize-none h-28"
        />

        {/* Starter Prompts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {STARTER_PROMPTS.map((starter, i) => (
            <button
              key={i}
              onClick={() => submitProblem(starter.prompt)}
              disabled={loading}
              className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-obsidian-800/80 hover:bg-gold-500/20 border border-gold-500/20 hover:border-gold-400/50 text-gold-300/80 hover:text-gold-100 transition-all cursor-pointer whitespace-nowrap"
            >
              ✦ {starter.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <span className="text-[11px] text-obsidian-400 font-mono hidden sm:inline">
            Press Cmd+Enter or click to submit
          </span>
          <Button 
            onClick={() => submitProblem()}
            disabled={loading || !problem.trim()}
            variant="primary"
            size="md"
            className="w-full sm:w-auto px-8 rounded-xl font-bold shadow-[0_0_20px_rgba(223,168,55,0.35)] cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Shri Krishna is Contemplating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Seek Divine Guidance
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Multi-Turn Discourse History Preview */}
      {chatHistory.length > 1 && (
        <div className="bg-obsidian-900/60 border border-gold-500/15 rounded-3xl p-5 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5 text-gold-400" />
            <span>Dialogue on the Chariot (कुरुक्षेत्र संवाद क्रम)</span>
          </h4>
          <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
            {chatHistory.map((msg) => (
              <div 
                key={msg.id}
                className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'seeker'
                    ? 'bg-obsidian-800/80 border border-gold-500/20 text-gold-100 ml-4'
                    : 'bg-amber-950/30 border border-gold-500/30 text-gold-200/90 mr-4 font-serif italic'
                }`}
              >
                <span className="font-mono font-bold block mb-1 text-[10px] text-gold-400/70">
                  {msg.sender === 'seeker' ? 'Parth (You):' : 'Bhagavan Shri Krishna:'}
                </span>
                {msg.text}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7-LAYER PSYCHO-SPIRITUAL DIAGNOSTIC SUITE */}
      <div className="space-y-6">
        
        {/* Layer 1: Divine Voice & Ambient Raga Synthesizer */}
        <AIVoiceSpeaker 
          divineCounsel={diagnosis.shri_krishna_uvacha.deep_counsel}
          sanskrit={diagnosis.shloka_meta.sanskrit_devanagari}
          label="Listen to Shri Krishna's Voice"
          metadata={diagnosis.audio_sonic_metadata}
        />

        {/* Layer 2: Psychological Telemetry & Guna Equilibrium */}
        <section className="bg-obsidian-900/90 border border-gold-500/20 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <GunaIndicator guna={diagnosis.psychological_telemetry.dominant_guna} />
              <span className="text-xs text-gold-400/70 font-mono">Dominant Energy</span>
            </div>
            {executionTime && (
              <span className="text-[11px] font-mono text-obsidian-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-gold-400" />
                <span>{executionTime}ms • {selectedModel}</span>
              </span>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold text-red-400/90 uppercase tracking-wider flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-red-400" />
              <span>Cognitive Distortion: {diagnosis.psychological_telemetry.cognitive_distortion}</span>
            </h4>
            <p className="text-sm text-gold-100/90 leading-relaxed font-sans">
              {diagnosis.psychological_telemetry.mind_state_diagnosis}
            </p>
          </div>

          {/* Guna Percentages Bar */}
          <div className="space-y-1.5 pt-2 border-t border-gold-500/10">
            <div className="flex justify-between text-xs font-mono text-gold-300/80">
              <span className="text-emerald-400">Sattva {diagnosis.psychological_telemetry.guna_percentages.sattva}%</span>
              <span className="text-amber-400">Rajas {diagnosis.psychological_telemetry.guna_percentages.rajas}%</span>
              <span className="text-slate-400">Tamas {diagnosis.psychological_telemetry.guna_percentages.tamas}%</span>
            </div>
            <div className="flex h-3 rounded-full overflow-hidden bg-obsidian-800 p-0.5 border border-gold-500/20">
              <div style={{ width: `${diagnosis.psychological_telemetry.guna_percentages.sattva}%` }} className="bg-emerald-500 rounded-l-full transition-all duration-500" />
              <div style={{ width: `${diagnosis.psychological_telemetry.guna_percentages.rajas}%` }} className="bg-amber-500 transition-all duration-500" />
              <div style={{ width: `${diagnosis.psychological_telemetry.guna_percentages.tamas}%` }} className="bg-slate-600 rounded-r-full transition-all duration-500" />
            </div>
          </div>
        </section>

        {/* Layer 3: Prescribed Shloka Card with Chhanda Meter */}
        <section className="bg-gradient-to-br from-obsidian-900 via-obsidian-800 to-amber-950/20 border border-gold-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 relative overflow-hidden">
          {/* Decorative corner glyph */}
          <div className="absolute top-4 right-5 text-6xl text-gold-500/5 font-cinzel font-bold select-none pointer-events-none">ॐ</div>

          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="font-cinzel text-xs font-bold uppercase tracking-[0.18em] text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/30">
              Bhagavad Gītā {diagnosis.shloka_meta.chapter}.{diagnosis.shloka_meta.verse}
            </span>
            <span className="text-[11px] font-sans text-gold-400/60 italic">
              {diagnosis.shloka_meta.chhanda_meter}
            </span>
          </div>

          <div className="space-y-3 text-center my-2">
            <p className="font-devanagari text-2xl sm:text-3xl text-gold-100 font-semibold leading-loose whitespace-pre-line text-glow-gold">
              {diagnosis.shloka_meta.sanskrit_devanagari}
            </p>
            <p className="text-xs sm:text-sm font-sans italic text-gold-300/70 whitespace-pre-line leading-relaxed">
              {diagnosis.shloka_meta.transliteration_iast}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-obsidian-800/60 border border-gold-500/12">
            <h5 className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-gold-400 font-bold mb-2">
              Direct Translation
            </h5>
            <p className="font-display text-sm sm:text-base text-gold-50/95 leading-relaxed italic">
              &ldquo;{diagnosis.simple_translation}&rdquo;
            </p>
          </div>
        </section>

        {/* Layer 4: Word-by-Word Sanskrit Anvaya Deconstruction */}
        {diagnosis.word_by_word_anvaya && diagnosis.word_by_word_anvaya.length > 0 && (
          <section className="bg-obsidian-900/90 border border-gold-500/20 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gold-400" />
              <span>Word-by-Word Anvaya Grammar Deconstruction</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
              {diagnosis.word_by_word_anvaya.map((token, i) => (
                <div key={i} className="bg-obsidian-800/80 p-3 rounded-xl border border-gold-500/15 space-y-1">
                  <div className="text-xs font-devanagari font-bold text-gold-300">
                    {token.sanskrit_word}
                  </div>
                  <div className="text-[10px] font-mono text-gold-400/70">
                    {token.root_dhatu} • {token.grammar_case}
                  </div>
                  <div className="text-xs text-gold-100/90">
                    {token.meaning}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Layer 5: Cognitive Reframing Case (CBT + Gita) */}
        <section className="bg-obsidian-900/90 border border-gold-500/20 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold flex items-center gap-2">
            <Compass className="w-4 h-4 text-gold-400" />
            <span>Cognitive Reframing (CBT + Gita Psychology)</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-obsidian-800/70 p-4 rounded-2xl border border-red-500/20 space-y-1.5">
              <h5 className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                Modern Human Dilemma
              </h5>
              <p className="text-xs sm:text-sm text-gold-100/90 leading-relaxed font-sans">
                {diagnosis.cognitive_reframing_case.modern_dilemma}
              </p>
            </div>
            <div className="bg-obsidian-800/70 p-4 rounded-2xl border border-emerald-500/20 space-y-1.5">
              <h5 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Gita Process Reframe
              </h5>
              <p className="text-xs sm:text-sm text-gold-100/90 leading-relaxed font-sans">
                {diagnosis.cognitive_reframing_case.psychological_reframe}
              </p>
            </div>
          </div>
        </section>

        {/* Layer 6: Mindful Breathwork Widget */}
        <MindfulBreathwork 
          techniqueName={diagnosis.mindfulness_breathwork_sync.technique_name}
          instructionText={diagnosis.mindfulness_breathwork_sync.guided_instruction}
        />

        {/* Layer 7: Shri Krishna Uvacha & Immediate 24-hr Action */}
        <section className="bg-gradient-to-br from-amber-950/30 via-obsidian-900 to-obsidian-900 border border-gold-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 relative overflow-hidden">
          {/* Top gold bar */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gold-500/15 border border-gold-400/35 flex items-center justify-center shrink-0 glow-gold-sm">
              <Heart className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <h3 className="font-cinzel text-xs uppercase tracking-[0.2em] text-gold-400 font-bold">
                Śrī Kṛṣṇa Uvāca — श्रीभगवानुवाच
              </h3>
              <p className="font-display text-sm text-gold-200/80 italic mt-0.5">
                {diagnosis.shri_krishna_uvacha.divine_address}
              </p>
            </div>
          </div>

          <blockquote className="font-display text-base sm:text-lg text-gold-50/95 leading-relaxed italic border-l-2 border-gold-400/70 pl-5 py-1">
            &ldquo;{diagnosis.shri_krishna_uvacha.deep_counsel}&rdquo;
          </blockquote>

          <div className="p-4 rounded-2xl bg-obsidian-800/80 border border-gold-500/20 space-y-1">
            <h5 className="font-cinzel text-[10px] uppercase tracking-[0.18em] text-gold-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>24-Hour Dharma Commitment — संकल्प</span>
            </h5>
            <p className="text-xs sm:text-sm text-gold-100/95 leading-relaxed font-sans mt-1">
              {diagnosis.shri_krishna_uvacha.immediate_24hr_dharma_action}
            </p>
          </div>
        </section>

        {/* Follow-Up Dialogue Input Section */}
        <section className="bg-obsidian-900/90 border border-gold-500/25 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400 font-bold flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-gold-400" />
              <span>Ask a Follow-Up Doubt to Shri Krishna (श्रीकृष्ण से आगे पूछें)</span>
            </h4>

            <button
              onClick={() => toggleVoiceInput('followup')}
              className={`px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                isListening && activeMicTarget === 'followup'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/50 animate-pulse'
                  : 'bg-obsidian-800 text-gold-300/80 hover:text-gold-100 border border-gold-500/20'
              }`}
            >
              {isListening && activeMicTarget === 'followup' ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              <span>{isListening && activeMicTarget === 'followup' ? 'Listening...' : 'Voice Mic'}</span>
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={followUpText}
              onChange={(e) => setFollowUpText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  submitProblem(undefined, true);
                }
              }}
              placeholder="हे माधव, लेकिन अगर वे नहीं माने तो...? / But Krishna, what if I fail again...?"
              className="flex-1 bg-obsidian-800 border border-gold-500/20 rounded-2xl px-4 py-3 text-xs sm:text-sm text-gold-100 placeholder:text-obsidian-400 focus:border-gold-400 outline-none"
            />

            <Button
              onClick={() => submitProblem(undefined, true)}
              disabled={loading || !followUpText.trim()}
              variant="primary"
              size="md"
              className="rounded-2xl px-5 cursor-pointer"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </section>

        {/* Generate HD Wisdom Card Button */}
        <div className="flex justify-center pt-2">
          <button 
            onClick={() => setShowWisdomCard(true)}
            className="px-8 py-3.5 bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-obsidian-950 rounded-full font-bold transition-all shadow-[0_0_30px_rgba(223,168,55,0.4)] flex items-center gap-2 cursor-pointer text-sm"
          >
            <span>✦ Generate HD Wisdom Card Image</span>
          </button>
        </div>
      </div>

      {/* Wisdom Card Modal */}
      {showWisdomCard && (
        <WisdomCardModal diagnosis={diagnosis} onClose={() => setShowWisdomCard(false)} />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-obsidian-900 p-6 sm:p-7 rounded-3xl w-full max-w-md border border-gold-500/30 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gold-100 flex items-center gap-2">
                <Settings className="w-4 h-4 text-gold-400" />
                <span>दिव्य प्रज्ञा विन्यास (Wisdom Settings)</span>
              </h2>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-obsidian-400 hover:text-gold-200 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gold-400 mb-1">
                  कस्टम प्रज्ञा कुंजी (Custom Access Key - Optional)
                </label>
                <input 
                  type="password" 
                  value={groqKey} 
                  onChange={e => setGroqKey(e.target.value)} 
                  placeholder="प्रवेश कुंजी..."
                  className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl p-3 text-xs text-gold-100 focus:border-gold-400 outline-none font-mono" 
                />
                <p className="text-[10px] text-obsidian-400 mt-1">सर्वर पर सुरक्षित रूप से कॉन्फ़िगर की गई चाबियाँ सक्रिय हैं।</p>
              </div>

              <div>
                <label className="block text-xs font-mono text-gold-400 mb-1">
                  दिव्य ध्वनि संवर्धन कुंजी (Voice Enhancement - Optional)
                </label>
                <input 
                  type="password" 
                  value={elevenLabsKey} 
                  onChange={e => setElevenLabsKey(e.target.value)} 
                  placeholder="ध्वनि कुंजी..."
                  className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl p-3 text-xs text-gold-100 focus:border-gold-400 outline-none font-mono" 
                />
                <p className="text-[10px] text-obsidian-400 mt-1">अतिरिक्त उच्च-गुणवत्ता स्टूडियो स्वर संवर्धन।</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button onClick={saveSettings} variant="primary" size="sm" className="px-6 rounded-xl cursor-pointer">
                सेटिंग्स सुरक्षित करें
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
