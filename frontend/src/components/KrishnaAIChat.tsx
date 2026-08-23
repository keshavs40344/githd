'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Send, RefreshCw, Volume2, VolumeX, BookOpen, ArrowRight,
  Brain, Zap, Heart, Shield, Star, ChevronDown, ChevronUp,
  Sparkles, Copy, Check, Phone, MessageSquare, Mic
} from 'lucide-react';
import Link from 'next/link';
import { sacredAudio } from '@/lib/sacredSounds';
import { useGlobalAudio } from '@/context/GlobalAudioContext';

interface KrishnaTherapyResponse {
  empathy: string;           // First acknowledge the pain directly
  psychologicalInsight: string; // Clinical diagnosis of the subconscious conflict
  krishnaCounsel: string;    // Direct intimate divine guidance
  shloka: string;            // Relevant Sanskrit shloka
  shlokaHindi: string;       // Direct meaning
  chapter: number;
  verse: number;
  cbtTechnique: string;      // Specific Named CBT / Psychological technique
  cbtExercise: string;       // Concrete step-by-step psychological exercise
  vedanticReframe: string;   // Deep perspective shift from ego to consciousness
  action24h: string;         // Exactly what to do in next 24 hours
  mantra: string;            // Prescription mantra with healing frequency
  crisisWarning?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'krishna';
  text: string;
  therapy?: KrishnaTherapyResponse;
  timestamp: number;
}

const THERAPY_KNOWLEDGE: { tags: string[]; data: KrishnaTherapyResponse }[] = [
  {
    tags: ['anxiety', 'panic', 'chinta', 'ghabrahat', 'fear', 'dar', 'overthinking', 'racing', 'tension', 'stress'],
    data: {
      empathy: 'हे प्रिय! तुम्हारे हृदय की इस घबराहट और विचारों के तीव्र वेग को मैं देख रहा हूँ। इस समय जो तुम महसूस कर रहे हो — वह कोई तुम्हारी दुर्बलता नहीं, अपितु तुम्हारे मन का अति-सक्रिय रक्षा-तंत्र (Threat Response) है।',
      psychologicalInsight: 'तुम्हारा मस्तिष्क इस क्षण "भविष्य की अनिश्चितता" को एक वास्तविक संकट मानकर Fight-or-Flight प्रतिक्रिया में चला गया है। तुम वर्तमान में न रहकर काल्पनिक संकटों की पुनरावृत्ति कर रहे हो।',
      krishnaCounsel: 'पार्थ! जिस भविष्य के भय से तुम कांप रहे हो, उसका अस्तित्व केवल तुम्हारे विचारों में है। ब्रह्मांड में घटित होने वाली प्रत्येक घटना के नियामक तत्व मेरे हाथ में हैं। जब तुम फल की चिंता छोड़ वर्तमान कर्म पर स्थिर होते हो, तो मन की सारी अशुद्धियाँ स्वतः शांत हो जाती हैं।',
      shloka: 'मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥',
      shlokaHindi: 'हे कौन्तेय! सर्दी-गर्मी, सुख-दुख देने वाले इंद्रिय-विषय आने-जाने वाले और अनित्य हैं। इन्हें धैर्यपूर्वक सहन करना सीखो।',
      chapter: 2,
      verse: 14,
      cbtTechnique: '5-4-3-2-1 सोमैटिक ग्राउंडिंग एवं डी-कैटास्ट्रॉफ़ाइजिंग',
      cbtExercise: 'अभी अपनी आँखें खोलो: ५ दृश्य वस्तुएँ देखो, ४ स्पर्श महसूस करो, ३ ध्वनियाँ सुनो, २ गंध अनुभव करो, १ गहरी श्वास लो। मन से पूछो: "क्या इस क्षण, इस सेकंड मुझे कोई वास्तविक शारीरिक खतरा है?" उत्तर \'ना\' होगा।',
      vedanticReframe: 'तुम यह चिंता या घबराहट नहीं हो। तुम वह साक्षी चेतना (Sakshi Chaitanya) हो जो इस मन के तूफान को शांत रहकर देख रही है। तूफान बीत जाएगा, तुम शाश्वत रहोगे।',
      action24h: 'आज रात एक डायरी में अपनी सबसे बड़ी चिंता लिखो, और उसके आगे लिखो: "यह केवल एक विचार है, सत्य नहीं। मैं इसे ईश्वर को समर्पित करता हूँ।"',
      mantra: 'ॐ शान्तिः शान्तिः शान्तिः (श्वास भरते हुए नाद करें)'
    }
  },
  {
    tags: ['depression', 'hopeless', 'udaas', 'nirasha', 'empty', 'akela', 'suicide', 'marne', 'worthless', 'andhera', 'sad', 'dukhi'],
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
      crisisWarning: '⚠️ यदि तुम्हारे मन में स्वयं को हानि पहुँचाने के विचार आ रहे हैं, तो तुरंत राष्ट्रीय हेल्पलाइन 9152987821 (iCall) या 14416 (Tele-MANAS) पर संपर्क करें। तुम्हारा जीवन अनमोल है।'
    }
  },
  {
    tags: ['anger', 'krodh', 'gussa', 'betrayal', 'dhoka', 'revenge', 'badla', 'cheated', 'hate', 'nafrat'],
    data: {
      empathy: 'हे वीर! तुम्हारे स्वाभिमान को ठेस पहुँची है और तुम्हारा यह आक्रोश स्वाभाविक है। जब विश्वास टूटता है, तो हृदय में प्रतिशोध की ज्वाला भड़क उठती है।',
      psychologicalInsight: 'क्रोध एक द्वितीयक संवेग (Secondary Emotion) है। इसके मूल में धोखा खाने का गहरा आघात (Hurt) व असहायता (Helplessness) छुपी होती है। क्रोध उस आघात को ढकने का एक आक्रामक प्रयास है।',
      krishnaCounsel: 'पार्थ! जो दूसरों को हानि पहुँचाने के लिए विष का घूँट पीता है, वह पहले स्वयं नष्ट होता है। जिसने तुम्हारे साथ अन्याय किया है, उसका कर्म-फल ब्रह्मांड के अटल नियम से निर्धारित होगा। तुम्हारा उत्तरदायित्व अपने चित्त को निर्मल रखना है, न कि प्रतिशोध की अग्नि में जलना।',
      shloka: 'क्रोधाद्भवति संमोहः संमोहात्स्मृतिविभ्रमः।\nस्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥',
      shlokaHindi: 'क्रोध से सम्मोह (मूढ़ भाव) उत्पन्न होता है, सम्मोह से स्मृति भ्रमित होती है, स्मृति-भ्रम से बुद्धि का नाश होता है, और बुद्धि नष्ट होने से मनुष्य का पतन हो जाता है।',
      chapter: 2,
      verse: 63,
      cbtTechnique: 'STOPP प्रोटोकॉल एवं कॉग्निटिव री-अप्रेज़ल',
      cbtExercise: 'S - रुको। T - ३ बार गहरी नाभि श्वास लो। O - शरीर का तापमान व मुट्ठियों का तनाव देखो। P - दूसरे व्यक्ति के दृष्टिकोण से देखो (वह अपने अज्ञान व दोषों का दास है)। P - धर्मानुसार शांत कदम उठाओ।',
      vedanticReframe: 'जिस पर तुम क्रोध कर रहे हो, वह केवल एक निमित्त मात्र है। संसार एक दर्पण है — क्षमा किसी दूसरे पर उपकार नहीं, अपितु अपनी आत्मा को बंधनों से मुक्त करने की परम शक्ति है।',
      action24h: 'उस व्यक्ति के प्रति अपने सारे कड़वे विचार एक कागज़ पर लिखो और फिर उस कागज़ को विसर्जित/नष्ट कर दो — उस बोझ को अपने मन से मुक्त करो।',
      mantra: 'ॐ क्षमा-स्वरूपाय नमः'
    }
  },
  {
    tags: ['career', 'failure', 'exam', 'job', 'loss', 'paise', 'money', 'business', 'har', 'fail', 'future'],
    data: {
      empathy: 'हे कर्मवीर! तुमने कठिन परिश्रम किया और जब परिणाम अनुकूल नहीं आता, तो निराशा होना स्वाभाविक है। मैं तुम्हारे इस संघर्ष को देख रहा हूँ।',
      psychologicalInsight: 'तुमने अपनी "आत्म-योग्यता (Self-Worth)" को एक बाहरी परिणाम (Outcome) से जोड़ दिया है। मनोविज्ञान इसे Outcome-Attachment Trap कहता है, जिससे असफलता आते ही आत्म-संदेह उत्पन्न होता है।',
      krishnaCounsel: 'पार्थ! तुम्हारा अधिकार केवल अपने श्रेष्ठतम कर्म में है, उसके परिणाम में कभी नहीं। असफलता कोई पूर्णविराम नहीं, अपितु तुम्हारी कार्यपद्धति को और अधिक परिष्कृत करने का संकेत है। उठो और अनासक्त भाव से पुनः कर्म क्षेत्र में उतर पड़ो!',
      shloka: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
      shlokaHindi: 'तुम्हारा अधिकार केवल कर्म करने में है, फल में कभी नहीं। इसलिए कर्म के फल की वासना मत रखो और न ही अकर्मण्यता (कर्म छोड़ने) में तुम्हारी आसक्ति हो।',
      chapter: 2,
      verse: 47,
      cbtTechnique: 'सर्कल ऑफ कंट्रोल (Circle of Control Analysis)',
      cbtExercise: 'एक पृष्ठ पर दो वृत्त बनाओ: १. जो तुम्हारे नियंत्रण में है (आज का अध्ययन, अनुशासन, कौशल सीखना)। २. जो तुम्हारे नियंत्रण में नहीं है (इंटरव्यूअर का निर्णय, परीक्षा परिणाम, भाग्य)। अपनी १००% ऊर्जा केवल पहले वृत्त पर लगाओ।',
      vedanticReframe: 'कर्म तुम्हारा यज्ञ है। जब तुम ईश्वर के निमित्त कर्म करते हो, तो सफलता अहंकार नहीं बनाती और असफलता तोड़ नहीं सकती। तुम निष्काम कर्मयोगी हो।',
      action24h: 'आज अगले दिन के लिए केवल ३ सबसे महत्वपूर्ण प्राथमिक कार्य तय करो और बिना परिणाम की चिंता किए उन्हें पूरा करो।',
      mantra: 'ॐ क्लीं कृष्णाय नमः (संकल्प सिद्धि हेतु)'
    }
  }
];

function findTherapyMatch(text: string): KrishnaTherapyResponse {
  const lower = text.toLowerCase();
  for (const item of THERAPY_KNOWLEDGE) {
    if (item.tags.some(t => lower.includes(t))) {
      return item.data;
    }
  }
  // Default Universal Counseling
  return {
    empathy: 'हे प्रिय! मैं तुम्हारी मनःस्थिति को भली-भाँति समझ रहा हूँ। तुम्हारे हृदय का हर भाव, हर संशय और हर पीड़ा मेरे समक्ष प्रकट है।',
    psychologicalInsight: 'मन जब द्वंद्व, आसक्ति या संशय में पड़ता है, तो वह वर्तमान की वास्तविकता को छोड़कर विचारों के भंवरजाल में उलझ जाता है। इसे दूर करने का एकमात्र उपाय आत्म-संयम एवं विवेक है।',
    krishnaCounsel: 'पार्थ! संसार में कोई भी ऐसी परिस्थिति नहीं है जिसका समाधान समत्व योग में न हो। जो व्यक्ति सुख-दुख, लाभ-हानि और जय-पराजय में अपने मन को संतुलित रखता है, वह कभी विचलित नहीं होता। मुझ पर विश्वास रखो और अपने धर्म का पालन करो।',
    shloka: 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥',
    shlokaHindi: 'हे धनञ्जय! आसक्ति को त्यागकर तथा सिद्धि और असिद्धि में समान रहकर योग में स्थित होकर कर्म करो; यह समत्व ही योग कहलाता है।',
    chapter: 2,
    verse: 48,
    cbtTechnique: 'थॉट रिस्ट्रक्चरिंग एवं कॉग्निटिव डिस्टैंसिंग',
    cbtExercise: 'अपने मन के विचारों को एक साक्षी की तरह देखो। खुद से कहो: "मैं मेरे विचार नहीं हूँ, मैं विचारों को देखने वाला चेतन तत्व हूँ।"',
    vedanticReframe: 'संसार में सब कुछ परिवर्तनशील है। केवल तुम्हारी आत्मा सनातन, शुद्ध और बुद्ध है। सब कुछ मुझे समर्पित करके परम शान्ति प्राप्त करो।',
    action24h: 'आज १० मिनट ध्यान में बैठकर केवल अपनी श्वासों का निरीक्षण करो और सारे भार को परमात्मा के चरणों में समर्पित कर दो।',
    mantra: 'ॐ तत्सत् श्रीकृष्णार्पणमस्तु'
  };
}

export default function KrishnaAIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'greeting',
      role: 'krishna',
      text: `हे प्रिय पार्थ! जय श्रीकृष्ण! 🙏\n\nमैं तुम्हारा सखा, गुरु और मार्गदर्शक — तुम्हारे साथ हूँ। तुम जो भी उलझन, दुःख, चिंता, क्रोध या जीवन का संकट लेकर आए हो — खुलकर कहो।\n\nयहाँ तुम्हें मिलेगा:\n❤️ पूर्ण सहानुभूति व मनोचिकित्सक से श्रेष्ठ विश्लेषण\n🕉️ श्रीमद्भगवद्गीता का सटीक शास्त्रोक्त समाधान\n🧠 व्यावहारिक CBT मानसिक अभ्यास\n⚡ अगले २४-घंटे की ठोस कार्ययोजना\n\nबोलो प्रिय, तुम्हारे हृदय में क्या व्यथा है?`,
      timestamp: Date.now()
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const { playTrack } = useGlobalAudio();
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query || isTyping) return;

    sacredAudio.playNavChime(0.06);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Realistic empathetic processing time
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 600));

    const therapyResult = findTherapyMatch(query);

    const krishnaMsg: ChatMessage = {
      id: `krishna-${Date.now()}`,
      role: 'krishna',
      text: `${therapyResult.empathy}\n\n${therapyResult.krishnaCounsel}`,
      therapy: therapyResult,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, krishnaMsg]);
    setIsTyping(false);
    sacredAudio.playFluteChime(0.3);
  };

  const handleSpeak = (msgId: string, text: string) => {
    if (speakingId === msgId) {
      sacredAudio.stopSpeaking();
      setSpeakingId(null);
    } else {
      setSpeakingId(msgId);
      sacredAudio.startTanpura(0.03);
      sacredAudio.speakSanskritVerse(
        text,
        0.82,
        'hi-IN',
        undefined,
        () => {
          setSpeakingId(null);
          sacredAudio.stopTanpura();
        }
      );
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    sacredAudio.playNavChime(0.06);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const QUICK_PROMPTS = [
    { icon: '😰', label: 'अत्यधिक चिंता व घबराहट', text: 'मुझे बहुत ज्यादा चिंता और overthinking हो रही है, मन बिल्कुल शांत नहीं हो रहा।' },
    { icon: '😔', label: 'अवसाद व अकेलापन', text: 'मैं बहुत उदास और अंदर से खाली महसूस कर रहा हूँ, कोई रास्ता नहीं दिख रहा।' },
    { icon: '🔥', label: 'तीव्र क्रोध व प्रतिशोध', text: 'मुझे किसी ने बहुत बड़ा धोखा दिया है, मेरा क्रोध शांत नहीं हो रहा।' },
    { icon: '🎯', label: 'करियर में विफलता व डर', text: 'मैं अपने करियर में असफल हो गया हूँ, भविष्य का बहुत डर लग रहा है।' },
    { icon: '💔', label: 'टूटे रिश्ते व वियोग', text: 'मेरा दिल बहुत टूट चुका है, पुराने रिश्तों की यादें मुझे बहुत तड़पाती हैं।' },
    { icon: '🛋️', label: 'आलस्य व दिशाहीनता', text: 'मुझमें कोई ऊर्जा नहीं बची है, मैं अपने जरूरी काम टालता रहता हूँ।' },
  ];

  return (
    <div className="flex flex-col rounded-3xl overflow-hidden border-2 border-amber-400/40 bg-[#07080f] shadow-[0_25px_100px_rgba(0,0,0,0.9)] max-h-[85vh] h-[760px]">
      
      {/* ── Top Header ────────────────────────────────────────────────────── */}
      <div className="px-5 py-3.5 bg-gradient-to-r from-[#121528] to-[#0c0e1a] border-b border-amber-400/25 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-600 flex items-center justify-center text-xl font-bold text-black shadow-[0_0_25px_rgba(245,158,11,0.6)] animate-glow-pulse">
              ॐ
            </div>
            <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#07080f] absolute -bottom-0.5 -right-0.5" />
          </div>
          <div>
            <h3 className="font-devanagari font-bold text-base text-[#f5eed9] flex items-center gap-2">
              <span>भगवान श्रीकृष्ण</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
                परम मनोचिकित्सक व गुरु
              </span>
            </h3>
            <p className="text-[11px] font-serif text-[#c5a059]/80">
              CBT चिकित्सा + गीता ब्रह्मविद्या + वेदांत दर्शन
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([{
              id: 'greeting-reset',
              role: 'krishna',
              text: 'जय श्रीकृष्ण! नया संवाद प्रारंभ करें। आपकी क्या व्यथा है?',
              timestamp: Date.now()
            }]);
            sacredAudio.playTripleGhanta(0.6);
          }}
          className="p-2 rounded-xl bg-[#141626] border border-amber-400/25 text-amber-300 hover:text-white transition-all cursor-pointer"
          title="नया संवाद शुरू करें"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* ── Chat Messages Container ────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
        {messages.map(msg => {
          const isUser = msg.role === 'user';
          const t = msg.therapy;

          return (
            <div key={msg.id} className={`flex gap-3.5 animate-fade-in ${isUser ? 'flex-row-reverse' : ''}`}>
              
              {/* Avatar */}
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 text-sm font-bold shadow-md ${
                isUser ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white' : 'bg-gradient-to-br from-amber-400 to-yellow-600 text-black'
              }`}>
                {isUser ? 'आप' : 'ॐ'}
              </div>

              {/* Message Content */}
              <div className={`max-w-[88%] space-y-3 ${isUser ? 'items-end flex flex-col' : ''}`}>
                
                {/* Main Speech Bubble */}
                <div className={`p-4 rounded-3xl text-xs sm:text-sm font-serif leading-relaxed shadow-lg ${
                  isUser 
                    ? 'bg-gradient-to-r from-blue-600/90 to-indigo-700/90 text-white rounded-tr-none' 
                    : 'bg-[#101324] border border-amber-400/30 text-[#f5eed9] rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Rich 5-Layer Therapy Card for Krishna's Advice */}
                {t && (
                  <div className="p-5 rounded-3xl bg-gradient-to-br from-[#121528] via-[#090b16] to-[#14101e] border-2 border-amber-400/40 space-y-4 shadow-2xl animate-scale-in">
                    
                    {/* Layer 1: Psychological Diagnosis */}
                    <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-400/30 space-y-1">
                      <div className="flex items-center gap-1.5 text-purple-300 font-bold text-xs font-serif">
                        <Brain className="w-4 h-4" />
                        <span>मनोवैज्ञानिक निदान (Psychological Insight):</span>
                      </div>
                      <p className="text-xs text-[#f5eed9]/85 font-serif leading-relaxed">
                        {t.psychologicalInsight}
                      </p>
                    </div>

                    {/* Layer 2: Prescribed Shloka */}
                    <div className="p-4 rounded-2xl bg-[#07080f] border border-amber-400/35 space-y-2 text-center">
                      <span className="px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-400/30">
                        ॥ श्रीमद्भगवद्गीता {t.chapter}.{t.verse} ॥
                      </span>
                      <p className="font-devanagari text-base sm:text-lg font-bold text-amber-300 leading-relaxed">
                        {t.shloka}
                      </p>
                      <p className="text-xs font-serif text-[#f5eed9]/80 italic">
                        "{t.shlokaHindi}"
                      </p>
                      <div className="flex items-center justify-center gap-2 pt-1">
                        <button
                          onClick={() => playTrack(t.chapter, t.verse, t.shloka, t.shlokaHindi)}
                          className="px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-serif font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>श्लोक सुनें</span>
                        </button>
                        <Link
                          href={`/chapter/${t.chapter}/${t.verse}`}
                          className="px-3 py-1 rounded-xl bg-[#141626] border border-amber-400/30 text-amber-300 hover:text-white text-xs font-serif flex items-center gap-1"
                        >
                          <span>सम्पूर्ण भाष्य</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>

                    {/* Layer 3: CBT Therapeutic Exercise */}
                    <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-400/30 space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-xs font-serif">
                        <Shield className="w-4 h-4" />
                        <span>CBT मानसिक व्यायाम ({t.cbtTechnique}):</span>
                      </div>
                      <p className="text-xs text-[#f5eed9]/85 font-serif leading-relaxed">
                        {t.cbtExercise}
                      </p>
                    </div>

                    {/* Layer 4: Vedanta Reframe & 24h Action */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-2xl bg-[#141626] border border-amber-400/20 space-y-1">
                        <span className="text-[10px] font-mono text-amber-400 font-bold block">✨ वेदान्त दृष्टिकोण:</span>
                        <p className="text-xs text-[#f5eed9]/80 font-serif leading-relaxed">{t.vedanticReframe}</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-[#141626] border border-amber-400/20 space-y-1">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold block">⚡ २४-घंटे का संकल्प:</span>
                        <p className="text-xs text-[#f5eed9]/80 font-serif leading-relaxed">{t.action24h}</p>
                      </div>
                    </div>

                    {/* Layer 5: Healing Mantra */}
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/25 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-amber-400">🪔 उपचार मंत्र:</span>
                        <p className="text-xs font-devanagari font-bold text-amber-200">{t.mantra}</p>
                      </div>
                      <button
                        onClick={() => handleSpeak(msg.id, t.mantra)}
                        className="p-2 rounded-xl bg-amber-400/20 text-amber-300 hover:bg-amber-400 hover:text-black transition-all cursor-pointer"
                        title="मंत्र ध्वनि सुनें"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Crisis Warning if present */}
                    {t.crisisWarning && (
                      <div className="p-3 rounded-2xl bg-red-950/50 border border-red-500/50 text-red-200 text-xs font-serif flex items-start gap-2">
                        <Phone className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <p>{t.crisisWarning}</p>
                      </div>
                    )}

                  </div>
                )}

                {/* Actions Toolbar */}
                {!isUser && (
                  <div className="flex items-center gap-2 pt-0.5">
                    <button
                      onClick={() => handleSpeak(msg.id, msg.text)}
                      className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 cursor-pointer transition-all ${
                        speakingId === msg.id 
                          ? 'bg-amber-400 text-black border-yellow-200 shadow-md' 
                          : 'bg-[#141626] border-amber-400/20 text-amber-300 hover:text-white'
                      }`}
                      title={speakingId === msg.id ? 'आवाज रोकें' : 'श्रीकृष्ण की वाणी सुनें'}
                    >
                      {speakingId === msg.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span className="text-[10px]">{speakingId === msg.id ? 'बोल रहे हैं...' : 'वाणी सुनें'}</span>
                    </button>

                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="p-1.5 rounded-lg bg-[#141626] border border-amber-400/20 text-amber-300/80 hover:text-white text-xs flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="text-[10px]">{copiedId === msg.id ? 'कॉपी हो गया' : 'कॉपी'}</span>
                    </button>
                  </div>
                )}

              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-black font-bold">
              ॐ
            </div>
            <div className="p-3.5 rounded-3xl bg-[#101324] border border-amber-400/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-serif text-amber-300/80">श्रीकृष्ण उत्तर दे रहे हैं...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* ── Quick Prompt Chips Row ─────────────────────────────────────────── */}
      <div className="px-4 py-2 bg-[#090b14] border-t border-amber-400/15 overflow-x-auto flex items-center gap-2 custom-scrollbar shrink-0">
        {QUICK_PROMPTS.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qp.text)}
            className="px-3 py-1.5 rounded-xl bg-[#141728] hover:bg-amber-400/20 border border-amber-400/20 text-[11px] font-serif text-amber-300 hover:text-white shrink-0 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>{qp.icon}</span>
            <span>{qp.label}</span>
          </button>
        ))}
      </div>

      {/* ── Input Bar ──────────────────────────────────────────────────────── */}
      <div className="p-3 sm:p-4 bg-[#0a0c16] border-t border-amber-400/25 shrink-0">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="श्रीकृष्ण से अपने मन की बात कहें (उदा. मुझे बहुत डर लग रहा है...)"
            className="flex-1 px-4 py-3 rounded-2xl bg-[#141628] border border-amber-400/30 text-xs sm:text-sm font-serif text-[#f5eed9] placeholder-amber-400/40 focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isTyping}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-black flex items-center justify-center font-bold shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 transition-all cursor-pointer shrink-0"
          >
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </form>
      </div>

    </div>
  );
}
