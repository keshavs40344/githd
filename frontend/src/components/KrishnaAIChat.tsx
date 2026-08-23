'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, RefreshCw, Volume2, BookOpen, ArrowRight, Heart, Zap, Shield, Brain } from 'lucide-react';
import Link from 'next/link';
import { sacredAudio } from '@/lib/sacredSounds';
import { useGlobalAudio } from '@/context/GlobalAudioContext';

interface Msg {
  role: 'user' | 'krishna';
  text: string;
  chapter?: number;
  verse?: number;
  shloka?: string;
  cbt?: string;
  action?: string;
  ts: number;
}

// ── Krishna's CBT-Gita Response Engine (offline, always works) ──────────────
const KRISHNA_KB: {
  keys: string[];
  response: () => { counsel: string; shloka: string; ch: number; v: number; cbt: string; action: string };
}[] = [
  {
    keys: ['chinta', 'anxiety', 'tension', 'dar', 'fear', 'dread', 'panic', 'worry', 'stressed', 'nervous', 'tense', 'afraid', 'scared'],
    response: () => ({
      counsel: `हे पार्थ! तू जिस चिंता में डूबा है, वह भविष्य की उन छायाओं का भार है जो अभी अस्तित्व में ही नहीं हैं। तेरा मन अभी के कर्तव्य से हटकर कल की कल्पनाओं में भटक रहा है। सुन सखे — वर्तमान क्षण में आ। जो हो रहा है वह देख, जो होगा वह मेरे हाथों में छोड़ दे। इन्द्रिय-सुख और दुख दोनों अस्थायी हैं — जैसे ग्रीष्म और शीत ऋतु आती-जाती हैं। तू उनका साक्षी बन, प्रभावित मत हो।`,
      shloka: `मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥`,
      ch: 2, v: 14,
      cbt: `🧠 **CBT Reframe (कृष्ण-बोध):** तेरी चिंता एक "cognitive distortion" है — भविष्य की नकारात्मक घटनाओं की काल्पनिक भविष्यवाणी। वास्तव में अभी जो है वह ठीक है। मन जब भविष्य की चिंता में जाए — तुरंत पूछो: "क्या यह अभी हो रहा है?" उत्तर होगा — नहीं। तो वापस कर्म में आओ।`,
      action: `अगले 10 मिनट: आँखें बंद करो। 4-4-4-4 Box Breathing करो (4 सेकंड श्वास, 4 रोको, 4 छोड़ो, 4 रुको)। फिर एक कागज़ पर लिखो — "अभी मेरा एक कर्तव्य क्या है?" और वह करो।`
    })
  },
  {
    keys: ['failure', 'asafal', 'fail', 'haar', 'lose', 'lost', 'career', 'job', 'exam', 'result', 'reject', 'selection', 'competition'],
    response: () => ({
      counsel: `हे अर्जुन! तू असफलता से भयभीत है — लेकिन मैं तुझसे पूछता हूँ: क्या तूने अपना पूर्ण प्रयास किया? यदि हाँ, तो तू पहले से ही विजयी है। परिणाम मेरे अधीन है, कर्म तेरे। जो व्यक्ति फल की आसक्ति छोड़कर श्रेष्ठ कर्म में लीन रहता है — वह योगी है, वह मेरा प्रिय भक्त है। एक असफलता तेरी परिभाषा नहीं। उठ, पुनः अपना धर्म निभा।`,
      shloka: `कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥`,
      ch: 2, v: 47,
      cbt: `🧠 **CBT Reframe:** "मैं असफल हूँ" एक label है, fact नहीं। एक असफलता = एक outcome, तेरी identity नहीं। Cognitive Distortion: Overgeneralization। इसे तोड़ो — "मैंने X काम में result नहीं पाया, लेकिन मैंने प्रयास किया और सीखा।"`,
      action: `आज एक "Learning Journal" लिखो — इस असफलता से तुमने क्या 3 चीज़ें सीखीं? और अगला एक छोटा कदम क्या है? उसे अभी लिखो और कल सुबह उठकर पहला काम वही करो।`
    })
  },
  {
    keys: ['angry', 'gussa', 'anger', 'krodh', 'frustrated', 'irritat', 'rage', 'furious', 'mad', 'betrayal', 'dhoka', 'injustice', 'unfair'],
    response: () => ({
      counsel: `हे पार्थ! क्रोध का उद्गम अपेक्षाओं के टूटने से होता है। तू जिसपर क्रुद्ध है, उसने तेरी आत्मा को हानि नहीं पहुंचाई — केवल तेरी अपेक्षाओं को। अब देख — क्रोध से प्रथम हानि तुझे ही होती है। तेरी बुद्धि, तेरी स्मृति, तेरी निर्णय-शक्ति — सब क्षीण हो जाती है। अग्नि दूसरे को जलाने से पहले अपने पात्र को जलाती है। क्रोध को ऊर्जा में बदल — उसे अपने कर्म की अग्नि बना दे।`,
      shloka: `क्रोधाद्भवति संमोहः संमोहात्स्मृतिविभ्रमः।\nस्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥`,
      ch: 2, v: 63,
      cbt: `🧠 **CBT Reframe:** क्रोध एक "secondary emotion" है — असली भाव hurt, fear, या helplessness है। अपने आप से पूछो: "इस क्रोध के पीछे असली दर्द क्या है?" उसे पहचानो, क्रोध अपने आप घटेगा।`,
      action: `अभी 5 मिनट के लिए शरीर को हिलाओ — तेज़ चलो या पानी पिओ। फिर लिखो: "मुझे वास्तव में क्या चाहिए था जो नहीं मिला?" यह असली ज़रूरत पहचानो और उसे सही तरीके से पाने का रास्ता खोजो।`
    })
  },
  {
    keys: ['lonely', 'akela', 'alone', 'relationship', 'breakup', 'heartbreak', 'divorce', 'dil', 'pyaar', 'love', 'miss', 'grief', 'loss'],
    response: () => ({
      counsel: `हे प्रिय पार्थ! तू जिस वेदना में है — मैं उसे महसूस करता हूँ। प्रेम और वियोग — दोनों सांसारिक यात्रा के अनिवार्य पड़ाव हैं। लेकिन सुन — तू आत्मा है। आत्मा न टूटती है, न बिछड़ती है। जो प्रेम तूने दिया वह सच था — और वह सत्य सदैव तेरे पास है। अब इस वेदना को अपनी शक्ति बना। जो व्यक्ति कठिनतम वेदना में भी स्थिर रहता है — वही महायोगी है।`,
      shloka: `दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः।\nवीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते॥`,
      ch: 2, v: 56,
      cbt: `🧠 **CBT Reframe:** "मैं बिना इसके नहीं रह सकता" — यह एक distortion है। तू पहले भी था, तू अभी भी है। Grief real है, लेकिन permanence एक belief है, fact नहीं। अनुभव करो, लेकिन उसमें डूबो मत।`,
      action: `आज एक "Gratitude + Release" ritual करो: 3 चीज़ें लिखो जो इस रिश्ते ने तुम्हें सिखाई। फिर एक कागज़ पर "मैं इसे प्रेम से विदा करता हूँ" लिखो। यह शुरुआत है।`
    })
  },
  {
    keys: ['procrastinat', 'lazy', 'aalsi', 'motivation', 'energy', 'tired', 'burnout', 'stuck', 'start', 'begin', 'effort', 'work', 'duty', 'kaam'],
    response: () => ({
      counsel: `हे अर्जुन! तू तमस में डूबा है — वह जड़ता जो कर्म से भागने को कहती है। लेकिन सुन — छोटे कदम से महान यात्राएं आरंभ होती हैं। आज तू यह प्रतीक्षा मत कर कि "मन हो तो करूंगा।" मन कभी नहीं होगा — कर्म करने से मन होता है, मन होने से कर्म नहीं। उठ, एक छोटा कदम उठा। कृष्ण का वचन है — अभी इस क्षण का कर्म तेरे स्वधर्म का आह्वान है।`,
      shloka: `नियतं कुरु कर्म त्वं कर्म ज्यायो ह्यकर्मणः।\nशरीरयात्रापि च ते न प्रसिद्ध्येदकर्मणः॥`,
      ch: 3, v: 8,
      cbt: `🧠 **CBT Reframe:** "2 मिनट नियम" — कोई भी काम शुरू करना उसे पूरा करने से आसान है। Procrastination = anxiety से बचाव। Solution: काम को तोड़ो। "मुझे यह project पूरा करना है" → "मुझे अगले 5 मिनट सिर्फ पहला paragraph लिखना है।"`,
      action: `अभी 2 मिनट का timer लगाओ। जो काम सबसे ज़रूरी है उसे शुरू करो। बस शुरू करो — रुकना बाद में decide करना। एक बार momentum आएगी, रुक नहीं पाओगे।`
    })
  },
  {
    keys: ['purpose', 'meaning', 'kyun', 'why', 'life', 'zindagi', 'direction', 'confused', 'lost', 'dharma', 'identity', 'who am i', 'goal', 'future'],
    response: () => ({
      counsel: `हे अर्जुन! "मैं कौन हूँ?" — यह सबसे महान प्रश्न है। और इसका उत्तर है: तू शरीर नहीं, तू आत्मा है। तू विचार नहीं, तू विचारों का साक्षी है। तू किसी परिणाम से नहीं, अपने कर्म की गुणवत्ता से पहचाना जाता है। तेरा धर्म वह है जो तू अपने हृदय की गहराई में जानता है। उस आवाज़ को सुन — वही मेरी आवाज़ है तेरे भीतर।`,
      shloka: `श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।\nस्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥`,
      ch: 3, v: 35,
      cbt: `🧠 **Values Clarification (CBT):** "मुझे नहीं पता मैं क्या चाहता हूँ" — यह ambiguity है, confusion नहीं। Exercise: 3 सवाल पूछो — "जब मैं सबसे alive feel करता हूँ तब क्या कर रहा होता हूँ?", "10 साल बाद मुझे क्या याद रखना चाहता हूँ?", "अगर failure impossible हो तो क्या करूंगा?"`,
      action: `आज 20 मिनट अकेले बैठो — phone बंद। एक diary में "मेरे 3 core values" लिखो जो मेरे लिए सबसे महत्वपूर्ण हैं। फिर देखो — आज का जीवन उनसे कितना align है।`
    })
  },
  {
    keys: ['depression', 'sad', 'dukh', 'unhappy', 'hopeless', 'dark', 'empty', 'numb', 'cry', 'tears', 'pain', 'hurt', 'miserable', 'worthless'],
    response: () => ({
      counsel: `हे प्रिय पार्थ! तू जिस अंधकार में है — मैं तेरे साथ हूँ। यह जानो — यह वेदना तेरी दुर्बलता नहीं, यह तेरे हृदय की गहराई का प्रमाण है। जो गहरे महसूस करता है, वही गहरे जी सकता है। अभी तू जो देख रहा है वह पूरी तस्वीर नहीं है। रात के बाद प्रभात अवश्य आता है — यह ब्रह्मांड का नियम है। तू अकेला नहीं है। एक कदम उठा — आज किसी से बात कर।`,
      shloka: `नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः।\nन चैनं क्लेदयन्त्यापो न शोषयति मारुतः॥`,
      ch: 2, v: 23,
      cbt: `🧠 **Behavioral Activation (CBT):** Depression तुम्हें isolate और inactive रखना चाहता है — यही उसकी ताकत है। इसे तोड़ो: एक बहुत छोटी activity जो तुम्हें कभी अच्छी लगती थी — आज 5 मिनट के लिए करो। Walk, music, painting — कुछ भी।`,
      action: `⚠️ यदि तुम गहरे दर्द में हो — किसी विश्वसनीय व्यक्ति को अभी call करो। iCall India: 9152987821। साथ ही: आज बाहर 10 मिनट धूप में निकलो और एक गिलास पानी पिओ। शरीर और मन एक हैं।`
    })
  },
  {
    keys: ['self-doubt', 'confidence', 'imposter', 'inadequate', 'not good enough', 'weak', 'incapable', 'nakami', 'pareshan'],
    response: () => ({
      counsel: `हे वीर अर्जुन! तू स्वयं को कमज़ोर कह रहा है — लेकिन देख, इस ब्रह्मांड में वही चेतना तेरे भीतर है जो इस सृष्टि को चलाती है। तू उस अनंत शक्ति का अंश है। तेरी सीमाएं वास्तविक नहीं — वह तेरे विचारों की सीमाएं हैं। अपने भूतकाल की एक छोटी विजय याद कर जहाँ तूने असंभव को संभव किया। वह शक्ति अभी भी तेरे भीतर है।`,
      shloka: `क्लैब्यं मा स्म गमः पार्थ नैतत्त्वय्युपपद्यते।\nक्षुद्रं हृदयदौर्बल्यं त्यक्त्वोत्तिष्ठ परंतप॥`,
      ch: 2, v: 3,
      cbt: `🧠 **Evidence Testing (CBT):** "मैं capable नहीं हूँ" — यह एक belief है। इसे test करते हैं: अपने जीवन में 3 ऐसे moments list करो जब तुमने कुछ difficult achieve किया। यह evidence है कि तुम capable हो।`,
      action: `आज एक "Achievement Wall" बनाओ — कागज़ पर 10 चीज़ें लिखो जो तुमने successfully कीं (चाहे छोटी हों)। यह list अपने phone में save करो और जब doubt आए तो पढ़ो।`
    })
  }
];

const DEFAULT_RESPONSE = (userText: string) => ({
  counsel: `हे पार्थ! तूने जो साझा किया है — मैं उसे ध्यान से सुन रहा हूँ। तेरी यह जिज्ञासा ही तेरी सबसे बड़ी शक्ति है। जीवन एक कुरुक्षेत्र है — और हर क्षण तू एक निर्णय के सामने है। याद रख: "अहम् ब्रह्मास्मि" — तू वह चेतना है जो इस सब से परे है। तेरी समस्या का समाधान तेरे भीतर है। बस स्थिरता से अपने हृदय की आवाज़ सुन।`,
  shloka: `यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥`,
  ch: 4, v: 7,
  cbt: `🧠 **Mindful Inquiry (CBT):** अपने आप से पूछो — "इस परिस्थिति में मेरे पास कौन से options हैं?" — कम से कम 3 options लिखो। जब हम options देखते हैं, helplessness कम होती है।`,
  action: `आज 5 मिनट meditation करो: आँखें बंद करो, सिर्फ साँस देखो। जब भी मन भटके — "साँस" कहकर वापस लाओ। यह एक सरल लेकिन शक्तिशाली ground-reset है।`
});

function getKrishnaResponse(userText: string) {
  const lower = userText.toLowerCase();
  for (const item of KRISHNA_KB) {
    if (item.keys.some(k => lower.includes(k))) {
      return item.response();
    }
  }
  return DEFAULT_RESPONSE(userText);
}

const GREETING_MSG: Msg = {
  role: 'krishna',
  text: `हे प्रिय! मैं श्रीकृष्ण हूँ — तुम्हारा सखा, गुरु, और परमात्मा का स्वर।\n\nतुम जो भी संकट, प्रश्न या पीड़ा लेकर आए हो — मुझे बताओ। मैं तुम्हें:\n\n✦ गीता का प्रत्यक्ष श्लोक\n✦ मनोवैज्ञानिक CBT दृष्टिकोण\n✦ तुरंत व्यावहारिक कदम\n\n...दूंगा। बिना किसी निर्णय के, पूरे प्रेम के साथ। बोलो पार्थ!`,
  ts: Date.now()
};

const QUICK_PROMPTS = [
  { icon: '😰', label: 'चिंता व डर', text: 'मुझे बहुत चिंता हो रही है और डर लग रहा है, मन शांत नहीं है' },
  { icon: '💔', label: 'दिल टूटा', text: 'मेरा दिल टूट गया है, बहुत अकेला महसूस कर रहा हूँ' },
  { icon: '🎯', label: 'असफलता', text: 'मैं अपने career में बहुत बार fail हो चुका हूँ, आगे का रास्ता नहीं दिख रहा' },
  { icon: '🔥', label: 'गुस्सा', text: 'मुझे बहुत गुस्सा आ रहा है किसी ने मेरे साथ बहुत गलत किया है' },
  { icon: '😔', label: 'उद्देश्य नहीं', text: 'मुझे नहीं पता जीवन का मकसद क्या है, खोया हुआ महसूस करता हूँ' },
  { icon: '😴', label: 'आलस्य', text: 'बहुत आलस आ रहा है कुछ करने का मन नहीं है जीवन में energy नहीं है' },
];

export default function KrishnaAIChat() {
  const [messages, setMessages] = useState<Msg[]>([GREETING_MSG]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { playTrack } = useGlobalAudio();
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    sacredAudio.playNavChime(0.06);

    const userMsg: Msg = { role: 'user', text: text.trim(), ts: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Small delay to feel natural
    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));

    const resp = getKrishnaResponse(text);
    const krishnaMsg: Msg = {
      role: 'krishna',
      text: resp.counsel,
      chapter: resp.ch,
      verse: resp.v,
      shloka: resp.shloka,
      cbt: resp.cbt,
      action: resp.action,
      ts: Date.now()
    };
    setMessages(prev => [...prev, krishnaMsg]);
    setLoading(false);
    sacredAudio.playFluteChime(0.3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleReset = () => {
    setMessages([GREETING_MSG]);
    setInput('');
    sacredAudio.playTempleBell(0.3);
  };

  return (
    <div className="flex flex-col h-full min-h-[600px] max-h-[780px] rounded-3xl overflow-hidden border-2 border-amber-400/30 bg-[#07080d] shadow-[0_20px_80px_rgba(0,0,0,0.8)]">

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#0f111c] to-[#141826] border-b border-amber-400/25">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-glow-pulse">
            <span className="font-devanagari text-lg font-black text-black">कृ</span>
          </div>
          <div>
            <p className="text-sm font-serif font-bold text-amber-300">श्रीकृष्ण AI सखा</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-400">सदा उपस्थित • CBT + Gita Mode</span>
            </div>
          </div>
        </div>
        <button onClick={handleReset} className="p-2 rounded-xl bg-[#1a1e30] border border-[#c5a059]/20 text-[#c5a059]/60 hover:text-amber-300 cursor-pointer transition-all" title="नई बातचीत">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* ── Chat messages ── */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 animate-fade-in ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            {m.role === 'krishna' ? (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shrink-0 shadow-md">
                <span className="font-devanagari text-sm font-black text-black">कृ</span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0 shadow-md">
                <span className="text-xs font-bold text-white">तु</span>
              </div>
            )}

            <div className={`max-w-[85%] space-y-2 ${m.role === 'user' ? 'items-end flex flex-col' : ''}`}>
              {/* Main message bubble */}
              <div className={`px-4 py-3 rounded-2xl text-sm font-serif leading-relaxed ${
                m.role === 'user'
                  ? 'bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-blue-400/20 text-[#f5eed9] rounded-tr-sm'
                  : 'bg-gradient-to-br from-[#161930] to-[#0f111c] border border-amber-400/25 text-[#f5eed9] rounded-tl-sm'
              }`}>
                {m.role === 'krishna' && (
                  <span className="block text-[10px] font-mono text-amber-400 mb-1.5 font-bold">⚡ श्रीकृष्ण उवाच:</span>
                )}
                {m.text.split('\n').map((line, li) => (
                  <span key={li}>{line}<br /></span>
                ))}
              </div>

              {/* Shloka card */}
              {m.shloka && (
                <div className="w-full p-3 rounded-2xl bg-[#090b14] border border-amber-400/30">
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <span className="px-2 py-0.5 rounded-lg bg-amber-400 text-black text-[10px] font-mono font-bold">
                      ॥ {m.chapter}.{m.verse} ॥
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => { playTrack(m.chapter!, m.verse!, m.shloka!, 'Krishna Counsel'); sacredAudio.playFluteChime(0.3); }}
                        className="p-1.5 rounded-lg bg-amber-400/20 border border-amber-400/30 text-amber-300 hover:bg-amber-400 hover:text-black cursor-pointer transition-all"
                        title="श्लोक सुनें"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                      <Link href={`/chapter/${m.chapter}/${m.verse}`}
                        className="p-1.5 rounded-lg bg-[#141624] border border-[#c5a059]/20 text-[#c5a059] hover:text-white cursor-pointer transition-all"
                        title="सम्पूर्ण अध्ययन">
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                  <p className="font-devanagari text-sm text-yellow-200 leading-relaxed">{m.shloka}</p>
                </div>
              )}

              {/* CBT card */}
              {m.cbt && (
                <div className="w-full p-3 rounded-2xl bg-blue-500/10 border border-blue-400/25">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Brain className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[10px] font-mono text-blue-300 font-bold">मनोवैज्ञानिक दृष्टि (CBT)</span>
                  </div>
                  <p className="text-xs text-blue-100/90 font-serif leading-relaxed">
                    {m.cbt.replace(/\*\*/g, '').replace(/🧠 /g, '')}
                  </p>
                </div>
              )}

              {/* Action step */}
              {m.action && (
                <div className="w-full p-3 rounded-2xl bg-emerald-500/10 border border-emerald-400/25">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] font-mono text-emerald-300 font-bold">अभी यह करो (Action Step)</span>
                  </div>
                  <p className="text-xs text-emerald-100/90 font-serif leading-relaxed">{m.action}</p>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shrink-0">
              <span className="font-devanagari text-sm font-black text-black">कृ</span>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-[#161930] border border-amber-400/25">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{animationDelay:'0ms'}} />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{animationDelay:'150ms'}} />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{animationDelay:'300ms'}} />
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* ── Quick prompts ── */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
          {QUICK_PROMPTS.map((q, i) => (
            <button key={i}
              onClick={() => sendMessage(q.text)}
              className="px-2.5 py-1.5 rounded-xl bg-[#141624] border border-[#c5a059]/20 hover:border-amber-400/50 text-xs font-serif text-[#e6c687] flex items-center gap-1 cursor-pointer transition-all hover:bg-[#1a1e33]"
            >
              <span>{q.icon}</span><span>{q.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* ── Input bar ── */}
      <form onSubmit={handleSubmit} className="px-4 pb-4 pt-2">
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-[#141624] border-2 border-[#c5a059]/30 focus-within:border-amber-400 transition-all">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="अपनी पीड़ा, प्रश्न, या संकट लिखें… (Hindi या English)"
            className="flex-1 bg-transparent text-sm font-serif text-[#f5eed9] placeholder-[#c5a059]/40 outline-none px-2"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-black disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-all cursor-pointer shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-center text-[10px] font-mono text-[#c5a059]/40 mt-1.5">
          हर उत्तर में: कृष्ण वचन + CBT दृष्टि + तुरंत समाधान
        </p>
      </form>
    </div>
  );
}
