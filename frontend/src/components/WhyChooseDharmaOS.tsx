'use client';

import React from 'react';
import { 
  Sparkles, Check, X, ShieldCheck, Volume2, Mic, 
  Flame, Award, HeartHandshake, Zap, Compass, BookOpen
} from 'lucide-react';
import { sacredAudio } from '@/lib/sacredSounds';

const COMPARISON_ROWS = [
  {
    feature: 'प्रामाणिक शास्त्रीय भाष्य (Authentic 7 Bhashyas)',
    dharmaOS: 'आदि शंकराचार्य, रामानुजाचार्य, मध्वाचार्य, ज्ञानेश्वरी सहित ७ आधिकारिक परम्पराएं',
    genericAI: 'सिंथेटिक AI द्वारा मनगढ़ंत सामान्य अनुवाद',
    google: 'अस्त-व्यस्त ब्लॉग्स, गलत व्याख्याएं और विज्ञापनों की भरमार'
  },
  {
    feature: 'सस्वर संगीत वाचन व काराओके (Synchronized Chanting)',
    dharmaOS: 'पं. शैलेन्द्र भारती जी का प्रामाणिक गायन + चमकते हुए शब्द (Karaoke)',
    genericAI: 'कोई वाचन नहीं या रोबोटिक AI आवाज',
    google: 'अलग-अलग यूट्यूब लिंक्स ढूंढने पड़ते हैं'
  },
  {
    feature: 'संस्कृत उच्चारण गुरु (Beginner Phonics Coach)',
    dharmaOS: 'अक्षर-विच्छेद [ कर-म-ण्ये-वा-धि... ] + 0.5x धीमी गति + माइक स्कोरिंग',
    genericAI: 'संस्कृत उच्चारण सिखाने का कोई टूल नहीं',
    google: 'केवल कठिन देवनागरी/रोमन पाठ'
  },
  {
    feature: 'दैनिक जीवन समस्या निवारक (Human Crisis Sanctuary)',
    dharmaOS: 'चिंता, क्रोध, असफलता पर १-क्लिक में भगवान श्रीकृष्ण का प्रत्यक्ष समाधान',
    genericAI: 'लंबे-लंबे प्रॉम्प्ट्स लिखने पड़ते हैं',
    google: 'सामान्य विकिपीडिया व लेख'
  },
  {
    feature: '१०८ जप माला व नित्य साधना (Daily Sadhana Habit)',
    dharmaOS: 'हैप्टिक वाइब्रेशन, मन्दिर घंटी, स्ट्रीक ट्रैकर और ४-७-८ प्राणायाम गाइड',
    genericAI: 'कोई साधना या हैबिट ट्रैकर नहीं',
    google: 'उपलब्ध नहीं'
  },
  {
    feature: 'अति-सरल एवं पवित्र वातावरण (100% Pure Focus & Clean)',
    dharmaOS: 'रॉयल ऑब्सिडियन व सोलर गोल्ड पवित्र मन्दिर डिजाइन, शून्य विज्ञापन',
    genericAI: 'बोरिंग चैट टेक्स्ट बॉक्स',
    google: 'पॉपअप्स, बैनर एड्स और भटकाव'
  }
];

export default function WhyChooseDharmaOS() {
  return (
    <div className="rounded-3xl bg-gradient-to-b from-[#141624]/95 via-[#0d0f19]/95 to-[#090a12]/95 backdrop-blur-2xl border-2 border-[#c5a059]/40 p-6 sm:p-10 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30 text-xs font-serif text-[#e6c687]">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>सटीक, प्रामाणिक एवं अद्वितीय अनुभव</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-devanagari font-bold text-[#f5eed9] leading-tight">
          गूगल या साधारण AI की जगह <span className="text-[#c5a059]">Dharma.OS</span> ही क्यों?
        </h2>

        <p className="text-xs sm:text-sm text-[#f5eed9]/80 font-serif leading-relaxed">
          इंटरनेट पर ज्ञान बहुत है, परन्तु साधना, सस्वर वाचन, शुद्ध उच्चारण और प्रामाणिक समाधान केवल एक पवित्र, सरल और समर्पित प्लेटफॉर्म पर ही संभव है।
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto custom-scrollbar pt-2">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b border-[#c5a059]/25 text-xs font-serif">
              <th className="py-3.5 px-4 text-[#e6c687] font-bold w-1/3">विशेषता (Key Feature)</th>
              <th className="py-3.5 px-4 bg-amber-500/15 text-yellow-300 font-bold border-x border-[#c5a059]/30 w-1/3 rounded-t-xl">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Dharma.OS (Sacred Platform)</span>
                </span>
              </th>
              <th className="py-3.5 px-4 text-[#f5eed9]/50 font-medium w-1/6">साधारण AI (ChatGPT)</th>
              <th className="py-3.5 px-4 text-[#f5eed9]/50 font-medium w-1/6">Google सर्च</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c5a059]/15 text-xs font-serif">
            {COMPARISON_ROWS.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#141624]/60 transition-colors">
                <td className="py-4 px-4 font-bold text-[#f5eed9]">
                  {row.feature}
                </td>
                <td className="py-4 px-4 bg-amber-500/10 border-x border-[#c5a059]/25 text-yellow-100 font-medium leading-relaxed">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{row.dharmaOS}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-[#f5eed9]/60">
                  <div className="flex items-start gap-1.5">
                    <X className="w-3.5 h-3.5 text-red-400/70 shrink-0 mt-0.5" />
                    <span>{row.genericAI}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-[#f5eed9]/60">
                  <div className="flex items-start gap-1.5">
                    <X className="w-3.5 h-3.5 text-red-400/70 shrink-0 mt-0.5" />
                    <span>{row.google}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Value Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#c5a059]/20">
        <div className="p-4 rounded-2xl bg-[#141624]/90 border border-[#c5a059]/20 space-y-1 text-center">
          <span className="text-2xl">🪔</span>
          <h4 className="text-xs font-serif font-bold text-[#f5eed9]">१००% प्रामाणिक एवं शास्त्रसम्मत</h4>
          <p className="text-[11px] text-[#c5a059]/80 font-sans">
            बिना किसी AI भ्रम के मूल संस्कृत व्याकरण व ७ परम्पराओं का सार।
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#141624]/90 border border-[#c5a059]/20 space-y-1 text-center">
          <span className="text-2xl">🎙️</span>
          <h4 className="text-xs font-serif font-bold text-[#f5eed9]">उच्चारण से लेकर ध्यान तक</h4>
          <p className="text-[11px] text-[#c5a059]/80 font-sans">
            केवल पढ़ना नहीं, बल्कि सही बोलना, सुनना और जीवन में उतारना।
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#141624]/90 border border-[#c5a059]/20 space-y-1 text-center">
          <span className="text-2xl">✨</span>
          <h4 className="text-xs font-serif font-bold text-[#f5eed9]">सरल, दिव्य व पवित्र वातावरण</h4>
          <p className="text-[11px] text-[#c5a059]/80 font-sans">
            बिना किसी रुकावट या भटकाव के मानसिक शांति का केंद्र।
          </p>
        </div>
      </div>

    </div>
  );
}
