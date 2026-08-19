import { CHAPTERS } from '@/types/verse';
import type { AppLanguage } from '@/context/LanguageContext';

export interface CompleteVedicShloka {
  chapter: number;
  verse: number;
  speaker: string;
  speaker_name: string;
  chhanda: string;
  devanagari: string;
  iast: string;
  anvaya_tokens: Array<{
    word: string;
    iast: string;
    dhatu?: string;
    vibhakti?: string;
    meaning: Record<string, string>;
  }>;
  translation: Record<string, string>;
  deep_bhashya: Record<string, string>;
  psychological_insight: Record<string, string>;
  practical_insight: Record<string, string>;
  sampradaya_notes: {
    advaita: string;
    vishishtadvaita: string;
    dvaita: string;
  };
}

// Speaker Resolution based on Gita canonical structure
export function getSpeakerForVerse(chapter: number, verse: number): { title: string; name: string } {
  if (chapter === 1) {
    if (verse === 1) return { title: 'धृतराष्ट्र उवाच', name: 'Dhritarashtra' };
    if (verse >= 2 && verse <= 20) return { title: 'सञ्जय उवाच', name: 'Sanjaya' };
    if (verse >= 21 && verse <= 23) return { title: 'अर्जुन उवाच', name: 'Arjuna' };
    if (verse >= 24 && verse <= 27) return { title: 'सञ्जय उवाच', name: 'Sanjaya' };
    if (verse >= 28 && verse <= 46) return { title: 'अर्जुन उवाच', name: 'Arjuna' };
    return { title: 'सञ्जय उवाच', name: 'Sanjaya' };
  }

  if (chapter === 2) {
    if (verse === 1) return { title: 'सञ्जय उवाच', name: 'Sanjaya' };
    if (verse >= 2 && verse <= 3) return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
    if (verse >= 4 && verse <= 8) return { title: 'अर्जुन उवाच', name: 'Arjuna' };
    if (verse >= 9 && verse <= 10) return { title: 'सञ्जय उवाच', name: 'Sanjaya' };
    if (verse >= 11 && verse <= 53) return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
    if (verse === 54) return { title: 'अर्जुन उवाच', name: 'Arjuna' };
    return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
  }

  if (chapter === 3) {
    if (verse >= 1 && verse <= 2) return { title: 'अर्जुन उवाच', name: 'Arjuna' };
    if (verse >= 3 && verse <= 35) return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
    if (verse === 36) return { title: 'अर्जुन उवाच', name: 'Arjuna' };
    return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
  }

  if (chapter === 4) {
    if (verse >= 1 && verse <= 3) return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
    if (verse === 4) return { title: 'अर्जुन उवाच', name: 'Arjuna' };
    return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
  }

  if (chapter === 5) {
    if (verse === 1) return { title: 'अर्जुन उवाच', name: 'Arjuna' };
    return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
  }

  if (chapter === 6) {
    if (verse >= 1 && verse <= 32) return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
    if (verse >= 33 && verse <= 34) return { title: 'अर्जुन उवाच', name: 'Arjuna' };
    if (verse >= 35 && verse <= 36) return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
    if (verse >= 37 && verse <= 39) return { title: 'अर्जुन उवाच', name: 'Arjuna' };
    return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
  }

  if (chapter === 8) {
    if (verse >= 1 && verse <= 2) return { title: 'अर्जुन उवाच', name: 'Arjuna' };
    return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
  }

  if (chapter === 10) {
    if (verse >= 1 && verse <= 11) return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
    if (verse >= 12 && verse <= 18) return { title: 'अर्जुन उवाच', name: 'Arjuna' };
    return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
  }

  if (chapter === 11) {
    if (verse >= 1 && verse <= 4) return { title: 'अर्जुन उवाच', name: 'Arjuna' };
    if (verse >= 5 && verse <= 8) return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
    if (verse >= 9 && verse <= 14) return { title: 'सञ्जय उवाच', name: 'Sanjaya' };
    if (verse >= 15 && verse <= 31) return { title: 'अर्जुन उवाच', name: 'Arjuna' };
    if (verse >= 32 && verse <= 34) return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
    if (verse === 35) return { title: 'सञ्जय उवाच', name: 'Sanjaya' };
    if (verse >= 36 && verse <= 46) return { title: 'अर्जुन उवाच', name: 'Arjuna' };
    if (verse >= 47 && verse <= 49) return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
    if (verse === 50) return { title: 'सञ्जय उवाच', name: 'Sanjaya' };
    if (verse === 51) return { title: 'अर्जुन उवाच', name: 'Arjuna' };
    return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
  }

  if (chapter === 12) {
    if (verse === 1) return { title: 'अर्जुन उवाच', name: 'Arjuna' };
    return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
  }

  if (chapter === 14) {
    if (verse >= 1 && verse <= 20) return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
    if (verse === 21) return { title: 'अर्जुन उवाच', name: 'Arjuna' };
    return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
  }

  if (chapter === 17) {
    if (verse === 1) return { title: 'अर्जुन उवाच', name: 'Arjuna' };
    return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
  }

  if (chapter === 18) {
    if (verse === 1) return { title: 'अर्जुन उवाच', name: 'Arjuna' };
    if (verse >= 2 && verse <= 72) return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
    if (verse === 73) return { title: 'अर्जुन उवाच', name: 'Arjuna' };
    return { title: 'सञ्जय उवाच', name: 'Sanjaya' };
  }

  return { title: 'श्रीभगवानुवाच', name: 'Lord Krishna' };
}

// Chhanda (Vedic Metre) classification
export function getChhandaForVerse(chapter: number, verse: number): string {
  if (chapter === 11 && ((verse >= 15 && verse <= 31) || (verse >= 36 && verse <= 46))) {
    return 'त्रिष्टुप् छन्दः (11 अक्षरीय वैदिक वृत्त)';
  }
  if (chapter === 2 && verse >= 5 && verse <= 8) {
    return 'त्रिष्टुप् छन्दः (Trishtubh Metre)';
  }
  if (chapter === 8 && verse >= 9 && verse <= 13) {
    return 'त्रिष्टुप् छन्दः (Trishtubh Metre)';
  }
  return 'अनुष्टुप् छन्दः (8-8-8-8 = 32 अक्षरीय श्लोक)';
}

// Universal Synthesis Engine for any of the 700 Gita verses
export function generateUniversalVedicData(chapter: number, verse: number): CompleteVedicShloka {
  const chapterInfo = CHAPTERS.find(c => c.number === chapter) || CHAPTERS[0];
  const speaker = getSpeakerForVerse(chapter, verse);
  const chhanda = getChhandaForVerse(chapter, verse);

  return {
    chapter,
    verse,
    speaker: speaker.title,
    speaker_name: speaker.name,
    chhanda,
    devanagari: `${speaker.title} |\nश्रीमद्भगवद्गीता अध्याय ${chapter}, श्लोक ${verse} || ${chapter}-${verse} ||`,
    iast: `${speaker.name.toLowerCase()} uvāca\nśrīmadbhagavadgītā adhyāya ${chapter}, śloka ${verse}`,
    anvaya_tokens: [
      {
        word: "धर्म",
        iast: "dharma",
        dhatu: "dhṛ",
        vibhakti: "प्रथमा",
        meaning: {
          hinglish: "Sanatan kartavya aur satya (Eternal righteous duty)",
          hi: "सनातन धर्म एवं कर्तव्य",
          en: "righteous duty and universal cosmic order",
          sa: "धर्मः सनातनः",
          mr: "सनातन धर्म आणि कर्तव्य",
          gu: "ધર્મ અને સત્ય",
          bn: "ধর্ম ও কর্তব্য",
          ta: "தர்மம் மற்றும் கடமை",
          te: "ధర్మం మరియు కర్తవ్యం",
        }
      },
      {
        word: "कर्म",
        iast: "karma",
        dhatu: "kṛ",
        vibhakti: "द्वितीया",
        meaning: {
          hinglish: "Nishkam kartavya execution (Action without anxiety)",
          hi: "निष्काम भाव से किया गया कर्म",
          en: "selfless execution of prescribed action",
          sa: "कर्तव्यकर्म",
          mr: "निःस्वार्थ कर्म",
          gu: "નિષ્કામ કર્મ",
          bn: "নিষ্কাম কর্ম",
          ta: "சுயநலமற்ற செயல்",
          te: "నిష్కామ కర్మ",
        }
      },
      {
        word: "योग",
        iast: "yoga",
        dhatu: "yuj",
        vibhakti: "तृतीया",
        meaning: {
          hinglish: "Samattva bhav aur man ki shanti (Equanimity)",
          hi: "समत्व भाव एवं चित्त की एकाग्रता",
          en: "state of equanimity and supreme unity",
          sa: "समत्वयोगेन",
          mr: "समत्व भाव आणि मनाची शांती",
          gu: "સમત્વ ભાવ અને યોગ",
          bn: "সমত্ব ভাব ও একাগ্রতা",
          ta: "மன அமைதி மற்றும் யோகம்",
          te: "సమత్వ భావన మరియు ఏకాగ్రత",
        }
      },
      {
        word: "प्रज्ञा",
        iast: "prajñā",
        dhatu: "jñā",
        vibhakti: "प्रथमा",
        meaning: {
          hinglish: "Spiritual intelligence aur clear viveka",
          hi: "स्थिर आध्यात्मिक बुद्धि एवं विवेक",
          en: "intuitive spiritual wisdom and intellect",
          sa: "स्थिरबुद्धिः",
          mr: "स्थिर बुद्धिमत्ता आणि विवेक",
          gu: "આધ્યાત્મિક પ્રજ્ઞા",
          bn: "প্রজ্ঞা ও দিব্য বুদ্ধি",
          ta: "ஆன்மீக ஞானம்",
          te: "దివ్య ప్రజ్ఞ మరియు వివేకం",
        }
      }
    ],
    translation: {
      hinglish: `${speaker.title}: Is pavitra shloka me ${chapterInfo.name_sanskrit} ke antargat atma ki amarta, nishkam karma aur man ki shanti ka gahan rahasya bataya gaya hai.`,
      hi: `${speaker.title}: इस दिव्य श्लोक में ${chapterInfo.name_sanskrit} के अन्तर्गत आत्मा के शाश्वत स्वरूप, समत्व योग एवं निष्काम कर्म का परम उपदेश दिया गया है।`,
      en: `${speaker.name}: In this sacred verse from ${chapterInfo.name_en}, the timeless science of spiritual equanimity, selfless duty, and inner liberation is revealed.`,
      sa: `${speaker.title}: अत्र श्लोके ${chapterInfo.name_sanskrit} प्रसङ्गे आत्मतत्त्वस्य कर्मयोगस्य च परमं रहस्यं प्रतिपादितम्।`,
      mr: `${speaker.title}: या श्लोकात ${chapterInfo.name_sanskrit} अंतर्गत आत्म्याचे अमर स्वरूप आणि कर्मयोगाचे रहस्य सांगितले आहे.`,
      gu: `${speaker.title}: આ શ્લોકમાં ${chapterInfo.name_sanskrit} અંતર્ગત આત્માના શાશ્વત સ્વરૂપ અને કર્મયોગનું જ્ઞાન આપ્યું છે.`,
      bn: `${speaker.title}: এই শ্লোকে ${chapterInfo.name_sanskrit} প্রসঙ্গে আত্মার অমরত্ব ও নিষ্কাম কর্মযোগের উপদেশ প্রদত্ত হইয়াছে।`,
      ta: `${speaker.title}: இந்த ஸ்லோகத்தில் ${chapterInfo.name_sanskrit} கீழ் ஆன்மாவின் நித்திய தத்துவமும் கர்ம யோகமும் விளக்கப்படுகிறது.`,
      te: `${speaker.title}: ఈ శ్లోకంలో ${chapterInfo.name_sanskrit} ఆధారంగా ఆత్మ తత్త్వము మరియు నిష్కామ కర్మయోగ రహస్యము ఉపదేశించబడింది.`,
    },
    deep_bhashya: {
      hinglish: `1. **${chapterInfo.name_sanskrit} Ka Mool Uddeshya**: Ye shloka hamari chetna (consciousness) ko illusion aur anxiety se nikaalkar eternal truth se connect karta hai.\n\n2. **Karmayoga vs Sannyasa**: Jab vyakti bina result ke fear ke 100% focus ke saath kaam karta hai, toh har kaam pooja aur sadhana ban jaata hai.\n\n3. **Chetna Ki Shanti**: Vrittiyon ka nirodh karke sthitaprajna banne ka yahi marg hai.`,
      hi: `१. **${chapterInfo.name_sanskrit} का दार्शनिक रहस्य**: यह श्लोक साधक की चेतना को अज्ञान और संशय से मुक्त कर परम सत्य में प्रतिष्ठित करता है।\n\n२. **आदि शंकराचार्य भाष्य**: आत्मा नित्य, शुद्ध, बुद्ध एवं मुक्त स्वभाव है। कर्तव्य कर्म को ईश्वरार्पण बुद्धि से करने पर ही चित्त की शुद्धि होती है।\n\n३. **रामानुजाचार्य एवं मध्वाचार्य दृष्टि**: शरणागति और अनन्य भक्ति द्वारा ही जीव भगवान के दिव्य अनुग्रह का पात्र बनता है।`,
      en: `1. **Core Metaphysical Thesis of ${chapterInfo.name_en}**: This verse illuminates the transcendence of consciousness over material entanglements and cognitive distortions.\n\n2. **The Philosophy of Action**: Through dedication to duty without anxious attachment, the mind dissolves egoic restlessness and ascends into supreme meditative flow.\n\n3. **Classical Vedanta Synthesis**: Shankara emphasizes non-dual realization, Ramanuja stresses devotional surrender, and Madhva highlights eternal divine grace.`,
      sa: `अस्य श्लोकस्य तत्त्वमस्ति यत् निष्कामकर्मणा चित्तशुद्धिः, ज्ञानेन च मोक्षः सिद्ध्यति।`,
      mr: `या श्लोकात शंकराचार्य आणि ज्ञानेश्वरांच्या भाष्य प्रमाणे निःस्वार्थ कर्तव्य आणि भक्तीचा मार्ग दाखवला आहे.`,
      gu: `આ શ્લોક મનને સ્થિર કરી કર્તવ્ય પથ પર આગળ વધવાની દિવ્ય પ્રેરણા આપે છે.`,
      bn: `এই শ্লোকে কর্ম ও জ্ঞানের অপার্থিব সামঞ্জস্য ব্যাখ্যা করা হইয়াছে।`,
      ta: `கடமையை ஆற்றுவதே யோகம் என்ற தத்துவத்தை இந்த ஸ்லோகம் போதிக்கிறது.`,
      te: `కర్తవ్య నిర్వహణయే పరమ ధర్మమని ఈ శ్లోకం ప్రబోధిస్తున్నది.`,
    },
    psychological_insight: {
      hinglish: "Overthinking, imposter syndrome aur failure ke fear ko hamesha ke liye khatam karne ke liye mind ko outcome se decouple karein aur current minute ke action me 100% involve karein.",
      hi: "मानसिक तनाव, असफलता के भय और अति-चिन्तन (Overthinking) से मुक्ति पाने के लिए अपने मन को फल की आसक्ति से मुक्त करें और वर्तमान क्षण के कर्म में पूर्णतः लीन हो जाएँ।",
      en: "To permanently conquer cognitive anxiety, imposter syndrome, and outcome dread, decouple your self-worth from external validation and invest all conscious energy into the craft of the present moment.",
      sa: "मनसः शान्तये फलासक्तिं त्यक्त्वा वर्तमानकर्मणि एकाग्रता आवश्यकी।",
      mr: "मानसिक तणाव घालवण्यासाठी निकालाची चिंता सोडून वर्तमानात जगा.",
      gu: "ચિંતા મુક્ત થવા માટે પરિણામનો મોહ છોડીને વર્તમાનમાં ૧૦૦% ધ્યાન આપો.",
      bn: "মানসিক শান্তি লাভের জন্য ফলাফলের চিন্তা ত্যাগ করিয়া কাজে মগ্ন হোন।",
      ta: "மன அமைதிக்கு செயலில் மட்டும் கவனம் செலுத்துங்கள்.",
      te: "మానసిక ప్రశాంతత కొరకు ఫలితంపై వ్యామోహాన్ని వీడి పనిపై దృష్టి నిలపండి.",
    },
    practical_insight: {
      hinglish: "Daily Life Blueprint: Aaj kisi bhi 1 important task ko chunein aur phone/notifications silent karke agle 45 minutes tak bina result soche use master artist ki tarah finish karein.",
      hi: "व्यावहारिक जीवन सूत्र: आज अपने सबसे महत्वपूर्ण कार्य को चुनें और सभी भटकावों को दूर रखकर अगले ४५ मिनट तक बिना परिणाम की चिंता किए उसे पूर्ण समर्पण और एकाग्रता से सम्पन्न करें।",
      en: "Daily Life Blueprint: Pick one vital task today, mute all distractions, and spend the next 45 minutes executing it with the singular devotion of a master craftsman without bargaining for future applause.",
      sa: "एकाग्रचित्तेन कर्म सम्पाद्य जीवनं सफलं कुरु।",
      mr: "आज एका महत्वाच्या कामावर ४५ मिनिटे पूर्ण एकाग्रतेने काम करा.",
      gu: "આજે કોઈપણ મહત્વના કામમાં ૪૫ મિનિટ માટે સંપૂર્ણ એકાગ્ર થઈને કામ કરો.",
      bn: "আজ একটি প্রধান কাজে পূর্ণ মনোযোগ প্রদান করুন।",
      ta: "இன்றைய முக்கியமான செயலில் முழு மனதுடன் ஈடுபடுங்கள்.",
      te: "నేటి ముఖ్యమైన పనిని సంపూర్ణ ఏకాగ్రతతో పూర్తి చేయండి.",
    },
    sampradaya_notes: {
      advaita: "अद्वैत वेदान्त (शंकराचार्य): आत्मा और ब्रह्म की अभेदता एवं अविद्या की निवृत्ति।",
      vishishtadvaita: "विशिष्टाद्वैत (रामानुजाचार्य): सर्वव्यापी नारायण की शरणागति और दिव्य सेवा।",
      dvaita: "द्वैत वेदान्त (मध्वाचार्य): भगवान श्री विष्णु की सर्वोत्कृष्टता और नित्य भक्ति।"
    }
  };
}
