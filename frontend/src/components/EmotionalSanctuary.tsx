'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Heart, Flame, Compass, ShieldAlert, Sparkles, 
  ArrowRight, MessageSquare, Sun, Moon, Volume2
} from 'lucide-react';
import { sacredAudio } from '@/lib/sacredSounds';

interface EmotionGuide {
  id: string;
  icon: string;
  name: string;
  englishLabel: string;
  subtitle: string;
  krishnaWisdom: string;
  shlokaRef: {
    chapter: number;
    verse: number;
    sanskrit: string;
    translation: string;
  };
  remedySteps: string[];
}

const EMOTION_GUIDES: EmotionGuide[] = [
  {
    id: 'anxiety',
    icon: '🌧️',
    name: 'चिंता व बेचैनी (Anxiety & Overthinking)',
    englishLabel: 'Anxiety & Overthinking',
    subtitle: 'जब भविष्य का डर और मन की अशांति आपको सोने न दे',
    krishnaWisdom: 'हे पार्थ! जो कल बीत गया वह तुम्हारा नहीं था, जो कल आएगा वह तुम्हारे वश में नहीं। केवल यह वर्तमान क्षण तुम्हारा सत्य है। जब तुम फल की चिंता छोड़ वर्तमान कर्म में समर्पित होते हो, तब मन की सारी व्यग्रता शून्य हो जाती है।',
    shlokaRef: {
      chapter: 2,
      verse: 14,
      sanskrit: 'मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः। आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥',
      translation: 'सुख और दुःख, सर्दी और गर्मी की तरह आने-जाने वाले अनित्य हैं। इन्हें धैर्यपूर्वक सहन करना सीखो।'
    },
    remedySteps: [
      '४-७-८ प्राणायाम द्वारा श्वास को गहरा और शांत करें।',
      'जो बातें आपके नियंत्रण में नहीं हैं, उन्हें ईश्वर को समर्पित करें।',
      'केवल आज के अपने एक छोटे कर्तव्य पर पूर्ण ध्यान दें।'
    ]
  },
  {
    id: 'career_failure',
    icon: '🎯',
    name: 'कर्म व असफलता (Career Failure & Burnout)',
    englishLabel: 'Career & Setback',
    subtitle: 'कड़ी मेहनत के बाद भी असफलता या दिशाहीन महसूस होना',
    krishnaWisdom: 'वत्स! सफलता या असफलता केवल एक पड़ाव है, तुम्हारी अंतिम सीमा नहीं। कर्म में तुम्हारा अधिकार है, परिणाम में नहीं। जब तुम परिणाम के भय से मुक्त होकर कर्म करोगे, तो तुम्हारी ऊर्जा १० गुना बढ़ जाएगी।',
    shlokaRef: {
      chapter: 2,
      verse: 47,
      sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
      translation: 'तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। कर्मफल के प्रति आसक्त न हो।'
    },
    remedySteps: [
      'असफलता को अपमान नहीं, बल्कि आत्म-सुधार का संकेत समझें।',
      'तुलना करना बंद करें — हर बीज के खिलने का अपना समय होता है।',
      'कल से एक नई योजना के साथ पुनः निष्काम भाव से जुट जाएं।'
    ]
  },
  {
    id: 'heartbreak',
    icon: '💔',
    name: 'शोक व विछोह (Heartbreak & Grief)',
    englishLabel: 'Loss & Heartbreak',
    subtitle: 'किसी प्रियजन का बिछड़ना या रिश्ते का टूटना',
    krishnaWisdom: 'हे कौन्तेय! इस संसार में जो कुछ भी आया है, उसका स्वरूप निरंतर परिवर्तनशील है। जिसे तुम खोया हुआ समझते हो, वह वास्तव में परमात्मा का ही अंश था। कोई भी आत्मा नष्ट नहीं होती। अपने हृदय को ईश्वर के अविनाशी प्रेम से भरो।',
    shlokaRef: {
      chapter: 2,
      verse: 20,
      sanskrit: 'न जायते म्रियते वा कदाचिन् नायं भूत्वा भविता वा न भूयः। अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥',
      translation: 'आत्मा कभी जन्म नहीं लेती और न कभी मरती है। यह अजर, अमर और शाश्वत है।'
    },
    remedySteps: [
      'अपने दुःख को दबाएं नहीं, उसे स्वीकार करें और परमात्मा को सौंप दें।',
      'अकेलेपन को एकांत (Meditation) में बदलें।',
      'दूसरों की सेवा और निःस्वार्थ प्रेम में अपने हृदय को लगाएं।'
    ]
  },
  {
    id: 'anger',
    icon: '🔥',
    name: 'क्रोध व क्षोभ (Anger & Frustration)',
    englishLabel: 'Anger Management',
    subtitle: 'जब क्रोध में बुद्धि नष्ट हो जाए और नियंत्रण खोने लगे',
    krishnaWisdom: 'हे भरतश्रेष्ठ! कामना से क्रोध उत्पन्न होता है, क्रोध से सम्मोह (भ्रम), और भ्रम से स्मृति और बुद्धि का नाश हो जाता है। क्रोध वह जलता हुआ कोयला है जिसे तुम दूसरों पर फेंकने के लिए पहले अपने हाथ में पकड़ते हो।',
    shlokaRef: {
      chapter: 2,
      verse: 63,
      sanskrit: 'क्रोधाद्भवति संमोहः संमोहात्स्मृतिविभ्रमः। स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥',
      translation: 'क्रोध से बुद्धि भ्रमित होती है, स्मृति नष्ट होती है, और अंततः मनुष्य का पतन हो जाता है।'
    },
    remedySteps: [
      'क्रोध आने पर तुरंत उत्तर न दें — १० सेकंड मौन रहें।',
      'ठंडा जल पिएं और उस स्थान से कुछ क्षण के लिए हट जाएं।',
      'विचार करें: क्या यह बात ५ वर्ष बाद भी मायने रखेगी?'
    ]
  },
  {
    id: 'confusion',
    icon: '🧭',
    name: 'कर्तव्य असमंजस (Indecision & Doubt)',
    englishLabel: 'Moral Dilemma & Confusion',
    subtitle: 'क्या सही है और क्या गलत — जब निर्णय लेना असंभव लगे',
    krishnaWisdom: 'हे धनंजय! संशयग्रस्त आत्मा का न यह लोक है और न परलोक। जब धर्म और मोह के बीच चुनाव करना हो, तो उस मार्ग को चुनो जो सत्य, न्याय और दीर्घकालिक कल्याण की ओर ले जाए, भले ही वह शुरुआत में कठिन लगे।',
    shlokaRef: {
      chapter: 4,
      verse: 40,
      sanskrit: 'अज्ञश्चाश्रद्दधानश्च संशयात्मा विनश्यति। नायं लोकोऽस्ति न परो न सुखं संशयात्मनः॥',
      translation: 'संशयग्रस्त मनुष्य कभी सुखी नहीं रह सकता। ज्ञान की तलवार से संशय को काट डालो।'
    },
    remedySteps: [
      'अपने निजी स्वार्थ को हटाकर निष्पक्ष भाव से देखें।',
      'दोनों विकल्पों के दूरगामी परिणामों की सूची बनाएं।',
      'अंतरात्मा की उस आवाज को सुनें जो शांति देती है।'
    ]
  },
  {
    id: 'solitude',
    icon: '🪔',
    name: 'एकाकीपन व आत्म-खोज (Loneliness & Inner Peace)',
    englishLabel: 'Finding Peace in Solitude',
    subtitle: 'दुनिया की भीड़ में भी खुद को अकेला और खाली महसूस करना',
    krishnaWisdom: 'हे अर्जुन! तुम कभी अकेले नहीं हो। मैं तुम्हारे हृदय में सर्वदा स्थित हूँ। जो मुझे सबमें देखता है और सबको मुझमें देखता है, उसके लिए मैं कभी अदृश्य नहीं होता और न वह मेरे लिए कभी दूर होता है।',
    shlokaRef: {
      chapter: 6,
      verse: 30,
      sanskrit: 'यो मां पश्यति सर्वत्र सर्वं च मयि पश्यति। तस्याहं न प्रणश्यामि स च मे न प्रणश्यति॥',
      translation: 'जो मुझे सर्वत्र देखता है और सब कुछ मुझमें देखता है, वह कभी मुझसे पृथक नहीं होता।'
    },
    remedySteps: [
      'प्रतिदिन १० मिनट मौन ध्यान में बैठें।',
      'प्रकृति, वृक्षों और खुले आकाश के साथ समय बिताएं।',
      '१०८ बार ॐ अथवा महामंत्र का जप करें।'
    ]
  }
];

export default function EmotionalSanctuary() {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionGuide>(EMOTION_GUIDES[0]);

  return (
    <div className="rounded-3xl bg-gradient-to-b from-[#121422]/95 via-[#0b0c14]/95 to-[#090a10]/95 border-2 border-[#c5a059]/35 p-5 sm:p-8 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/40 text-xs font-serif text-[#e6c687]">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
          <span>मानसिक शांति व संकट समाधान • Vedic Emotional Healer</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-devanagari font-bold text-[#f5eed9]">
          आज आप कैसा <span className="text-[#c5a059]">महसूस</span> कर रहे हैं?
        </h2>

        <p className="text-xs sm:text-sm text-[#f5eed9]/80 font-serif">
          अपनी वर्तमान मानसिक स्थिति का चयन करें — भगवान श्रीकृष्ण का पावन संदेश सीधे आपके हृदय को शांति देगा।
        </p>
      </div>

      {/* 6 Emotion Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {EMOTION_GUIDES.map(item => {
          const isSelected = selectedEmotion.id === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedEmotion(item);
                sacredAudio.playNavChime(0.08);
              }}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-1.5 ${
                isSelected
                  ? 'bg-gradient-to-b from-[#c5a059] to-amber-600 text-black border-[#f5eed9] shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-102 font-bold'
                  : 'bg-[#141624]/90 text-[#e6c687] border-[#c5a059]/25 hover:border-[#c5a059] hover:bg-[#1a1e33]'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-devanagari leading-tight line-clamp-2">
                {item.name.split('(')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Emotion Counsel Card (Direct Krishna Voice) */}
      <div className="rounded-3xl bg-gradient-to-b from-[#161a2e]/90 to-[#0d0f1c]/90 border border-[#c5a059]/30 p-5 sm:p-7 shadow-xl space-y-5 animate-fade-in">
        
        {/* Krishna Dialogue Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#c5a059]/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-[#c5a059] to-amber-600 p-0.5 shadow-lg flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#0a0c16] rounded-2xl flex items-center justify-center text-xl">
                🪈
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-devanagari font-bold text-[#f5eed9]">
                श्रीकृष्ण का दिव्य उद्बोधन: {selectedEmotion.name}
              </h3>
              <p className="text-xs text-[#c5a059] font-serif italic">
                {selectedEmotion.subtitle}
              </p>
            </div>
          </div>

          <Link
            href={`/chapter/${selectedEmotion.shlokaRef.chapter}/${selectedEmotion.shlokaRef.verse}`}
            onClick={() => sacredAudio.playTempleBell(0.25)}
            className="px-4 py-2 rounded-xl bg-[#c5a059] hover:bg-[#e6c687] text-black text-xs font-serif font-bold flex items-center gap-1.5 shadow-md w-max cursor-pointer self-start sm:self-auto"
          >
            <span>श्लोक {selectedEmotion.shlokaRef.chapter}.{selectedEmotion.shlokaRef.verse} खोलें</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* The Divine Speech */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0a0c16]/80 border border-[#c5a059]/25 relative overflow-hidden">
          <div className="absolute top-2 right-3 text-3xl opacity-10 select-none">ॐ</div>
          <p className="font-serif text-sm sm:text-base text-[#f5eed9] leading-relaxed italic">
            "{selectedEmotion.krishnaWisdom}"
          </p>
        </div>

        {/* Shloka Prescription */}
        <div className="p-4 rounded-2xl bg-[#141624]/90 border border-[#c5a059]/20 space-y-2">
          <span className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider block">
            ॥ वैदिक अमृत श्लोक (अध्याय {selectedEmotion.shlokaRef.chapter}, श्लोक {selectedEmotion.shlokaRef.verse}) ॥
          </span>
          <p className="font-devanagari text-sm sm:text-base text-[#e6c687] font-semibold">
            {selectedEmotion.shlokaRef.sanskrit}
          </p>
          <p className="text-xs text-[#f5eed9]/90 font-serif">
            भावार्थ: {selectedEmotion.shlokaRef.translation}
          </p>
        </div>

        {/* 3 Actionable Remedy Steps */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-serif font-bold text-[#e6c687] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>आज के लिए ३ व्यावहारिक उपचार (Daily Actionable Steps):</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {selectedEmotion.remedySteps.map((step, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#101322] border border-[#c5a059]/20 text-xs font-serif text-[#f5eed9]/90 flex items-start gap-2"
              >
                <span className="w-5 h-5 rounded-full bg-[#c5a059]/20 text-[#c5a059] font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-snug">{step}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
