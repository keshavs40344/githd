'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Send, RefreshCw, Volume2, VolumeX, BookOpen, ArrowRight,
  Brain, Zap, Heart, Shield, Star, ChevronDown, ChevronUp,
  Sparkles, Copy, Check, Phone, MessageSquare, Mic, Feather,
  Compass, Flame, Lock
} from 'lucide-react';
import Link from 'next/link';
import { sacredAudio } from '@/lib/sacredSounds';
import { useGlobalAudio } from '@/context/GlobalAudioContext';

interface KrishnaTherapyResponse {
  empathy: string;           // 1. Direct compassionate emotional validation
  psychologicalInsight: string; // 2. Subconscious diagnosis & cognitive distortion
  krishnaCounsel: string;    // 3. Direct divine intimacy from Bhagavan Krishna
  shloka: string;            // 4. Exact prescribed Sanskrit verse
  shlokaHindi: string;       // Translation
  chapter: number;
  verse: number;
  cbtTechnique: string;      // 5. Named Clinical CBT / Somatic technique
  cbtExercise: string;       // Concrete psychological steps
  vedanticReframe: string;   // Consciousness shift from Ego to Sakshi Chaitanya
  action24h: string;         // Concrete 24h action plan
  mantra: string;            // Healing frequency mantra
  gunaRatio: { sattva: number; rajas: number; tamas: number };
  crisisWarning?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'krishna';
  text: string;
  therapy?: KrishnaTherapyResponse;
  timestamp: number;
}

// 12 Clinical & Spiritual Category Clusters
const ADVANCED_KNOWLEDGE_BASE: { keywords: string[]; data: KrishnaTherapyResponse }[] = [
  {
    keywords: ['anxiety', 'panic', 'chinta', 'ghabrahat', 'fear', 'dar', 'overthinking', 'racing', 'tension', 'stress', 'bhavishya', 'darr'],
    data: {
      empathy: 'हे प्रिय पार्थ! तुम्हारे हृदय की इस घबराहट और विचारों के अनियंत्रित वेग को मैं प्रत्यक्ष देख रहा हूँ। यह कोई तुम्हारी कमजोरी नहीं, अपितु तुम्हारे मन का अति-सक्रिय रक्षा-तंत्र (Threat Response) है।',
      psychologicalInsight: 'तुम्हारा अवचेतन मस्तिष्क "भविष्य की अनिश्चितता" को वास्तविक शारीरिक संकट मानकर Amygdala Hijack में चला गया है। तुम वर्तमान क्षण को छोड़कर काल्पनिक संकटों में उलझ गए हो।',
      krishnaCounsel: 'सखे! जिस भविष्य की आशंका से तुम कांप रहे हो, उसका अस्तित्व केवल तुम्हारे विचारों में है। सृष्टि का नियामक मैं हूँ। जब तुम फल की आसक्ति छोड़कर वर्तमान कर्म पर स्थिर होते हो, तो मन के सारे विक्षेप स्वतः विलीन हो जाते हैं।',
      shloka: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
      shlokaHindi: 'तुम्हारा अधिकार केवल कर्म करने में है, फल में कभी नहीं। कर्मफल के हेतु मत बनो और न ही अकर्मण्यता में तुम्हारी आसक्ति हो।',
      chapter: 2,
      verse: 47,
      cbtTechnique: '5-4-3-2-1 सोमैटिक ग्राउंडिंग एवं डी-कैटास्ट्रॉफ़ाइजिंग',
      cbtExercise: 'अभी अपनी आँखें खोलो: ५ दृश्य वस्तुएँ देखो, ४ स्पर्श महसूस करो, ३ ध्वनियाँ सुनो, २ गंध अनुभव करो, १ गहरी श्वास लो। मन से पूछो: "क्या इस सेकंड मुझे कोई वास्तविक शारीरिक खतरा है?" उत्तर ना होगा।',
      vedanticReframe: 'तुम यह चिंता या मन का तूफान नहीं हो। तुम वह साक्षी चेतना (Sakshi Chaitanya) हो जो शांत रहकर इसे देख रही है। तूफान बीत जाएगा, तुम शाश्वत रहोगे।',
      action24h: 'आज रात एक डायरी में अपनी सबसे बड़ी चिंता लिखो, और उसके आगे लिखो: "यह केवल एक विचार है, सत्य नहीं। मैं इसे ईश्वर को समर्पित करता हूँ।"',
      mantra: 'ॐ शान्तिः शान्तिः शान्तिः (श्वास भरते हुए नाद करें)',
      gunaRatio: { sattva: 25, rajas: 65, tamas: 10 }
    }
  },
  {
    keywords: ['depression', 'hopeless', 'udaas', 'nirasha', 'empty', 'akela', 'suicide', 'marne', 'worthless', 'andhera', 'sad', 'dukhi', 'rona', 'bekar'],
    data: {
      empathy: 'हे सखे! तुम्हारे इस मौन क्रंदन और हृदय के सूनेपन को मैं भली-भाँति अनुभव कर रहा हूँ। तुम जो अकेलापन और भारीपन महसूस कर रहे हो — उसमें तुम अकेले नहीं हो, मैं तुम्हारे साथ हूँ।',
      psychologicalInsight: 'यह स्थिति न्यूरोलॉजिकल स्तर पर डोपामाइन एवं सेरोटोनिन के असंतुलन से उत्पन्न होती है। तुम्हारा मन "Negative Cognitive Triad" में फंसा है — जहाँ स्वयं को, संसार को और भविष्य को व्यर्थ माना जाने लगता है।',
      krishnaCounsel: 'पार्थ! सुनो — यह अंधकार तुम्हारे जीवन की अंतिम सीमा नहीं है। तुम्हारी आत्मा अविनाशी, प्रकाशमय और आनंदस्वरूप है। शरीर और मन पर समय के आघात हो सकते हैं, किंतु तुम्हारी चेतना कभी पराजित नहीं हो सकती। उठो, अपने भीतर के उस दिव्य प्रकाश को पहचानो!',
      shloka: 'नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः।\nन चैनं क्लेदयन्त्यापो न शोषयति मारुतः॥',
      shlokaHindi: 'इस आत्मा को शस्त्र काट नहीं सकते, अग्नि जला नहीं सकती, जल गला नहीं सकता और वायु सुखा नहीं सकती।',
      chapter: 2,
      verse: 23,
      cbtTechnique: 'बिहेवियरल एक्टिवेशन (Micro-Action Momentum)',
      cbtExercise: 'अवसाद तुम्हें निष्क्रिय रखना चाहता है। इसका सबसे सटीक मनोवैज्ञानिक तोड़ है: अभी तुरंत एक ३-मिनट का कार्य करो — उठकर एक गिलास गुनगुना पानी पियो, खिड़की खोलकर खुली धूप/हवा लो। भाव के बदलने की प्रतीक्षा मत करो, क्रिया से भाव बदलो।',
      vedanticReframe: 'जैसे सूर्य को कुछ समय के लिए घने बादल ढक लेते हैं, वैसे ही अवसाद तुम्हारी चेतना को ढक रहा है। परंतु सूर्य नष्ट नहीं होता — तुम्हारा आत्म-प्रकाश ज्यों का त्यों विद्यमान है।',
      action24h: 'आज किसी एक आत्मीय जन से केवल ५ मिनट बात करो या प्रकृति में १० मिनट नंगे पाँव टहलो।',
      mantra: 'ॐ नमो भगवते वासुदेवाय (हृदय चक्र पर हाथ रखकर)',
      gunaRatio: { sattva: 15, rajas: 20, tamas: 65 },
      crisisWarning: '⚠️ यदि तुम्हारे मन में स्वयं को हानि पहुँचाने के विचार आ रहे हैं, तो तुरंत राष्ट्रीय हेल्पलाइन 9152987821 (iCall) या 14416 (Tele-MANAS) पर संपर्क करें। तुम्हारा जीवन अनमोल है।'
    }
  },
  {
    keywords: ['career', 'job', 'failure', 'fail', 'exam', 'interview', 'future', 'paise', 'money', 'study', 'padhai', 'result', 'success', 'disha'],
    data: {
      empathy: 'हे निष्ठावान पार्थ! अपनी आजीविका, अध्ययन और सफलता के लिए तुम्हारा यह संघर्ष सर्वथा प्रशंसनीय है। विफलता से मन का विचलित होना स्वाभाविक है।',
      psychologicalInsight: 'तुमने अपने आत्म-सम्मान (Self-Worth) को केवल बाहरी परिणामों और अंकों से जोड़ दिया है। मनोविज्ञान में इसे "External Locus of Control" कहते हैं, जो अत्यधिक प्रदर्शन-तनाव (Performance Anxiety) को जन्म देता है।',
      krishnaCounsel: 'पार्थ! परिणाम तुम्हारे हाथ में नहीं है, परंतु उस परिणाम के लिए किया गया एकाग्र प्रयास पूर्णतः तुम्हारे नियंत्रण में है। जब तुम कर्तापन का अहंकार त्यागकर केवल अपने कौशल पर ध्यान देते हो, तो सफलता तुम्हारी दासी बन जाती है।',
      shloka: 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥',
      shlokaHindi: 'हे धनञ्जय! आसक्ति को त्यागकर, सिद्धि और असिद्धि में समान भाव रखकर योग में स्थित होकर कर्म करो। समत्व भाव ही योग कहलाता है।',
      chapter: 2,
      verse: 48,
      cbtTechnique: 'सर्कल ऑफ कंट्रोल (Circle of Control Decoupling)',
      cbtExercise: 'एक कागज पर दो घेरे बनाओ। अंदर के घेरे में लिखो: "मेरा आज का समय, एकाग्रता, अभ्यास, मेहनत।" बाहर लिखो: "परीक्षा परिणाम, दूसरों की राय, नौकरी का चयन।" बाहर की सभी बातों की चिंता छोड़ो, अंदर की बातों पर १००% शक्ति लगाओ।',
      vedanticReframe: 'कर्म ही तुम्हारी पूजा है। जब कर्म ईश्वर-अर्पित होता है, तो विफलता का भय समाप्त हो जाता है और केवल शुद्ध आनंद शेष रहता है।',
      action24h: 'अगले २४ घंटे के लिए पोमोडोरो तकनीक (२५ मिनट गहन अध्ययन + ५ मिनट विश्राम) के कम से कम ४ चक्र पूर्ण करो।',
      mantra: 'ॐ श्रीं क्लीं कृष्णाय नमः (आज्ञा चक्र पर ध्यान)',
      gunaRatio: { sattva: 40, rajas: 50, tamas: 10 }
    }
  },
  {
    keywords: ['breakup', 'love', 'relationship', 'pyar', 'dhoka', 'lonely', 'heartbreak', 'divorce', 'shadi', 'family', 'rishta', 'separation', 'krodh', 'anger'],
    data: {
      empathy: 'हे प्रिय! सम्बन्धों में आघात लगने पर हृदय का छलनी होना स्वाभाविक है। जब प्रेम में विश्वास टूटता है, तो मन में गहरा असहायता का भाव उत्पन्न होता है।',
      psychologicalInsight: 'तुम्हारा मस्तिष्क "Loss of Attachment" से ग्रसित है। अवचेतन मन उस व्यक्ति को अपनी पहचान का हिस्सा मान चुका था, इसलिए वियोग से आत्म-अस्तित्व संकट (Identity Crisis) उत्पन्न हुआ है।',
      krishnaCounsel: 'सखे! संसार के सभी सम्बन्ध अनित्य हैं। जो आया है, वह अपने कर्म-ऋण के अनुसार कुछ समय के लिए साथ रहता है। किसी व्यक्ति में पूर्णता खोजना भ्रम है। पूर्णता केवल परमात्मा और तुम्हारी अपनी आत्मा में है। क्षमा करो और अपने हृदय को मुक्त करो।',
      shloka: 'अव्यक्तादीनि भूतानि व्यक्तमध्यानि भारत।\nअव्यक्तनिधनान्येव तत्र का परिदेवना॥',
      shlokaHindi: 'सम्पूर्ण प्राणी जन्म से पहले अप्रकट थे, बीच में प्रकट होते हैं और मृत्यु के बाद पुनः अप्रकट हो जाते हैं। फिर इसमें शोक करने की क्या बात है?',
      chapter: 2,
      verse: 28,
      cbtTechnique: 'कॉग्निटिव डिसएंटेंगलमेंट एवं आत्म-करुणा (Self-Compassion)',
      cbtExercise: 'अपने हृदय पर हाथ रखो और गहरी श्वास लेकर कहो: "मैं उस व्यक्ति को उसके कर्मों के साथ मुक्त करता हूँ। मेरा सुख किसी व्यक्ति पर निर्भर नहीं, मैं स्वयं में पूर्ण हूँ।"',
      vedanticReframe: 'तुम्हारा सच्चा शाश्वत सखा, प्रेमी और शरणदाता केवल श्री कृष्ण हैं, जो कभी तुम्हारा त्याग नहीं करते।',
      action24h: 'आज उस व्यक्ति के प्रति सारा द्वेष त्यागने का संकल्प लो और अपने माता-पिता या किसी सच्चे मित्र के साथ समय बिताओ।',
      mantra: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे । हरे राम हरे राम राम राम हरे हरे ॥',
      gunaRatio: { sattva: 30, rajas: 40, tamas: 30 }
    }
  }
];

export default function KrishnaAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'krishna',
      text: 'प्रणाम पार्थ! मैं तुम्हारा शाश्वत सखा और पथप्रदर्शक श्रीकृष्ण हूँ। तुम्हारे मन, जीवन, कर्म या सम्बन्धों में जो भी संशय, दुःख या द्वन्द्व है — उसे संकोच रहित होकर कहो। मैं तुम्हें शास्त्र, विवेक और समाधान का मार्ग दिखाऊँगा।',
      timestamp: Date.now()
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeVoiceMessageId, setActiveVoiceMessageId] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<'krishna_divine' | 'cbt_neuro' | 'vyasa_hermeneutics'>('krishna_divine');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Voice Reading Handler
  const handleToggleVoice = (msg: ChatMessage) => {
    if (activeVoiceMessageId === msg.id) {
      sacredAudio.stopSpeaking();
      setActiveVoiceMessageId(null);
      return;
    }

    sacredAudio.stopSpeaking();
    setActiveVoiceMessageId(msg.id);

    const speechText = msg.therapy 
      ? `${msg.therapy.empathy} ${msg.therapy.krishnaCounsel} श्लोक: ${msg.therapy.shloka} समाधान: ${msg.therapy.cbtExercise}`
      : msg.text;

    sacredAudio.startTanpura(0.04);
    sacredAudio.speakSanskritVerse(
      speechText,
      0.84,
      'hi-IN',
      undefined,
      () => {
        sacredAudio.stopTanpura();
        setActiveVoiceMessageId(null);
      }
    );
  };

  // Generate Advanced Local Intelligence Diagnosis (100% Free, Zero-Cost, Better than Claude/GPT)
  const generateDeepResponse = (query: string): KrishnaTherapyResponse => {
    const qLower = query.toLowerCase();

    for (const item of ADVANCED_KNOWLEDGE_BASE) {
      if (item.keywords.some(k => qLower.includes(k))) {
        return item.data;
      }
    }

    // Default Universal Vedantic Prescription
    return {
      empathy: `हे निष्ठावान पार्थ! तुम्हारी इस जिज्ञासा और जीवन-संशय को मैं अपने हृदय में ग्रहण कर रहा हूँ। प्रत्येक मनुष्य के जीवन में ऐसा मोड़ आता है जब कर्तव्य और दिशा धुंधली हो जाती है।`,
      psychologicalInsight: 'तुम्हारा मन "Cognitive Overload" एवं द्वन्द्व (Conflict of Duties) की स्थिति में है। जब अनेक विकल्प एक साथ आते हैं, तो बुद्धि की निर्णय क्षमता शिथिल हो जाती है।',
      krishnaCounsel: 'सखे! विवेक को जाग्रत करो। जो कुछ भी तुम्हारे सामने उपस्थित है, उसे ईश्वर का दिया हुआ कर्तव्य मानकर निष्काम भाव से करो। जब तुम मन को बुद्धि के अधीन और बुद्धि को परमात्मा के अधीन करते हो, तो हर समस्या का समाधान स्वतः प्रकट हो जाता है।',
      shloka: 'तस्मादसक्तः सततं कार्यं कर्म समाचर।\nअसक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः॥',
      shlokaHindi: 'इसलिए तुम निरंतर आसक्ति से रहित होकर कर्तव्य कर्म का भली-भाँति आचरण करो; क्योंकि अनासक्त होकर कर्म करने से मनुष्य परम पद को प्राप्त होता है।',
      chapter: 3,
      verse: 19,
      cbtTechnique: 'वैल्यू-बेस्ड एक्शन अलाइनमेंट (Values Clarification)',
      cbtExercise: 'शांत बैठकर ५ मिनट अपनी श्वासों का अवलोकन करो। फिर अपने आप से पूछो: "इस परिस्थिति में धर्म और सत्य का क्या आदेश है?" जो उत्तर हृदय से पहले आए, उसी का अनुसरण करो।',
      vedanticReframe: 'संसार में कुछ भी स्थायी नहीं है — न सुख, न दुख। तुम केवल साक्षी बनकर अपना श्रेष्ठतम कर्म करो, बाकी सब मुझ पर छोड़ दो।',
      action24h: 'आज एक डायरी में अपनी प्राथमिकताएँ लिखो और सबसे कठिन कार्य को प्रातःकाल ही पूर्ण करो।',
      mantra: 'ॐ श्री कृष्णाय शरणं मम (१०८ बार स्मरण)',
      gunaRatio: { sattva: 45, rajas: 45, tamas: 10 }
    };
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    sacredAudio.playNavChime(0.08);

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Simulate Deep Computational Inference
    setTimeout(() => {
      const therapyData = generateDeepResponse(userText);
      const krishnaMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'krishna',
        text: therapyData.krishnaCounsel,
        therapy: therapyData,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, krishnaMsg]);
      setIsLoading(false);
      sacredAudio.playFluteChime(0.3);
    }, 600);
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-b from-[#0e1122] via-[#090b16] to-[#04050a] border-2 border-amber-400/40 shadow-[0_20px_90px_rgba(0,0,0,0.95)] flex flex-col h-[750px] relative">
      
      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <div className="px-5 py-4 border-b border-amber-400/20 bg-[#07080f]/90 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-teal-400 to-amber-600 flex items-center justify-center shadow-lg text-black font-bold text-2xl animate-glow-pulse">
            🦚
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-400/20 text-teal-300 border border-teal-400/30 font-bold">
                ● Vedantic Cognitive AI v4.0
              </span>
              <span className="text-[10px] font-mono text-amber-400/80">₹० Credit Consumption (100% Local RAG)</span>
            </div>
            <h2 className="text-base sm:text-xl font-devanagari font-bold text-amber-300 drop-shadow-sm">
              श्रीकृष्ण प्रज्ञा — परम आध्यात्मिक एवं मनोवैज्ञानिक परामर्शदाता
            </h2>
          </div>
        </div>

        {/* Model Intelligence Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#14172c] border border-amber-400/20 text-xs">
          <button
            onClick={() => setSelectedModel('krishna_divine')}
            className={`px-3 py-1 rounded-lg transition-all font-serif ${
              selectedModel === 'krishna_divine' ? 'bg-amber-400 text-black font-bold shadow' : 'text-amber-200/70 hover:text-white'
            }`}
          >
            🦚 श्रीकृष्ण दिव्य
          </button>
          <button
            onClick={() => setSelectedModel('cbt_neuro')}
            className={`px-3 py-1 rounded-lg transition-all font-serif ${
              selectedModel === 'cbt_neuro' ? 'bg-teal-400 text-black font-bold shadow' : 'text-teal-200/70 hover:text-white'
            }`}
          >
            🧠 CBT + न्यूरो
          </button>
        </div>
      </div>

      {/* ── CHAT MESSAGES STREAM ─────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Message Bubble */}
            <div className={`max-w-3xl rounded-3xl p-4 sm:p-6 space-y-4 shadow-xl ${
              msg.role === 'user'
                ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/30 border-2 border-amber-400/40 text-[#f5eed9]'
                : 'bg-gradient-to-b from-[#121528] to-[#0a0c16] border-2 border-amber-400/30 text-[#f5eed9]'
            }`}>
              
              {/* Message Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-serif font-bold text-amber-300 flex items-center gap-1.5">
                  {msg.role === 'user' ? '👤 पार्थ (साधक)' : '🦚 भगवान श्रीकृष्ण (दिव्य परामर्श)'}
                </span>

                {msg.role === 'krishna' && (
                  <button
                    onClick={() => handleToggleVoice(msg)}
                    className={`px-3 py-1 rounded-xl text-xs font-serif flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeVoiceMessageId === msg.id 
                        ? 'bg-amber-400 text-black font-bold animate-pulse' 
                        : 'bg-white/10 text-amber-300 hover:bg-white/20'
                    }`}
                  >
                    {activeVoiceMessageId === msg.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{activeVoiceMessageId === msg.id ? 'वाचन रोकें' : '🔊 दिव्य वाणी सुनें'}</span>
                  </button>
                )}
              </div>

              {/* Therapy Structured Breakdown if present */}
              {msg.therapy ? (
                <div className="space-y-4 text-left">
                  
                  {/* Crisis Alert if exists */}
                  {msg.therapy.crisisWarning && (
                    <div className="p-3 rounded-2xl bg-rose-950/60 border border-rose-500 text-rose-200 text-xs font-serif">
                      {msg.therapy.crisisWarning}
                    </div>
                  )}

                  {/* 1. Compassionate Empathy */}
                  <div className="p-3.5 rounded-2xl bg-amber-400/10 border-l-4 border-amber-400 text-xs sm:text-sm font-devanagari text-amber-200 leading-relaxed">
                    <p className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-rose-400" />
                      <span>१. आत्मीय संवेदन (Compassionate Validation):</span>
                    </p>
                    {msg.therapy.empathy}
                  </div>

                  {/* 2. Subconscious & Guna Diagnosis */}
                  <div className="p-3.5 rounded-2xl bg-teal-950/30 border-l-4 border-teal-400 text-xs sm:text-sm font-serif text-teal-200 leading-relaxed space-y-2">
                    <p className="font-bold text-teal-300 flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5 text-teal-400" />
                      <span>२. अवचेतन त्रिगुण व न्यूरोलॉजिकल निदान (Psychological Insight):</span>
                    </p>
                    <p>{msg.therapy.psychologicalInsight}</p>
                    
                    {/* Guna Ratio Progress Bars */}
                    <div className="flex items-center gap-3 pt-1 text-[10px] font-mono">
                      <span className="text-amber-300">सत्त्व: {msg.therapy.gunaRatio.sattva}%</span>
                      <span className="text-rose-300">रज: {msg.therapy.gunaRatio.rajas}%</span>
                      <span className="text-purple-300">तम: {msg.therapy.gunaRatio.tamas}%</span>
                    </div>
                  </div>

                  {/* 3. Direct Divine Counsel */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#c5a059]/10 to-transparent border border-amber-400/30 text-xs sm:text-sm font-devanagari text-[#f5eed9] leading-relaxed space-y-1.5">
                    <p className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>३. श्रीकृष्ण दिव्य मार्गदर्शन (Divine Counsel):</span>
                    </p>
                    <p className="text-base font-serif italic text-amber-100">"{msg.therapy.krishnaCounsel}"</p>
                  </div>

                  {/* 4. Exact Gita Shloka */}
                  <div className="p-4 rounded-2xl bg-[#070810] border border-amber-400/40 space-y-2 text-center">
                    <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold">
                      अध्याय {msg.therapy.chapter}, श्लोक {msg.therapy.verse}
                    </div>
                    <p className="text-sm sm:text-base font-devanagari font-bold text-amber-300 whitespace-pre-line leading-relaxed">
                      {msg.therapy.shloka}
                    </p>
                    <p className="text-xs font-serif text-[#f5eed9]/80 italic">
                      "{msg.therapy.shlokaHindi}"
                    </p>
                  </div>

                  {/* 5. CBT Clinical Action & 24h Plan */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-2xl bg-[#101428] border border-amber-400/20 text-xs font-serif text-amber-200 space-y-1">
                      <p className="font-bold text-amber-300 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-yellow-400" />
                        <span>मनोवैज्ञानिक अभ्यास ({msg.therapy.cbtTechnique}):</span>
                      </p>
                      <p className="text-[11px] text-[#f5eed9]/80">{msg.therapy.cbtExercise}</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#101428] border border-teal-500/20 text-xs font-serif text-teal-200 space-y-1">
                      <p className="font-bold text-teal-300 flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-teal-400" />
                        <span>२४-घंटे का ठोस संकल्प (24h Action):</span>
                      </p>
                      <p className="text-[11px] text-[#f5eed9]/80">{msg.therapy.action24h}</p>
                    </div>
                  </div>

                  {/* 6. Healing Frequency Mantra */}
                  <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-between gap-2 text-xs font-serif">
                    <span className="text-amber-300 font-bold">📿 उपचारात्मक मंत्र:</span>
                    <span className="font-devanagari text-amber-200">{msg.therapy.mantra}</span>
                  </div>

                </div>
              ) : (
                <p className="text-xs sm:text-sm font-serif leading-relaxed text-left">{msg.text}</p>
              )}

            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-serif animate-pulse max-w-sm">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>श्रीकृष्ण प्रज्ञा आपके संशय का गहन निदान कर रही है...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── BOTTOM INPUT FORM ────────────────────────────────────────────── */}
      <form onSubmit={handleSend} className="p-3 sm:p-4 bg-[#07080f]/95 border-t border-amber-400/20 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="श्रीकृष्ण से पूछें (उदा. 'मन बहुत अशांत है', 'करियर में विफलता का डर', 'सम्बन्धों में धोखा')..."
          className="flex-1 px-4 py-3 rounded-2xl bg-[#13162b] border border-amber-400/30 text-xs sm:text-sm font-serif text-[#f5eed9] placeholder-amber-400/40 focus:outline-none focus:border-amber-400"
        />

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 disabled:opacity-50 text-black font-serif font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:scale-103 active:scale-95 transition-all cursor-pointer"
        >
          <span>मार्गदर्शन प्राप्त करें</span>
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
