import { CHAPTERS, type GitaVerse, type AnvayaToken } from "@/types/verse";

export interface SpeakerInfo {
  speaker: "krishna" | "arjuna" | "sanjaya" | "dhritarashtra";
  title: string;
  title_en: string;
  name: string;
}

export function getSpeakerForVerse(chapter: number, verse: number): SpeakerInfo {
  if (chapter === 1) {
    if (verse === 1) return { speaker: "dhritarashtra", title: "धृतराष्ट्र उवाच", title_en: "Dhritarashtra said", name: "धृतराष्ट्र" };
    if (verse >= 2 && verse <= 19) return { speaker: "sanjaya", title: "सञ्जय उवाच", title_en: "Sanjaya said", name: "सञ्जय" };
    if (verse >= 21 && verse <= 23) return { speaker: "arjuna", title: "अर्जुन उवाच", title_en: "Arjuna said", name: "अर्जुन" };
    if (verse >= 24 && verse <= 27) return { speaker: "sanjaya", title: "सञ्जय उवाच", title_en: "Sanjaya said", name: "सञ्जय" };
    if (verse >= 28 && verse <= 46) return { speaker: "arjuna", title: "अर्जुन उवाच", title_en: "Arjuna said", name: "अर्जुन" };
    if (verse === 47) return { speaker: "sanjaya", title: "सञ्जय उवाच", title_en: "Sanjaya said", name: "सञ्जय" };
  }
  if (chapter === 2) {
    if (verse === 1) return { speaker: "sanjaya", title: "सञ्जय उवाच", title_en: "Sanjaya said", name: "सञ्जय" };
    if (verse >= 2 && verse <= 3) return { speaker: "krishna", title: "श्रीभगवानुवाच", title_en: "The Blessed Lord said", name: "श्री कृष्ण" };
    if (verse >= 4 && verse <= 8) return { speaker: "arjuna", title: "अर्जुन उवाच", title_en: "Arjuna said", name: "अर्जुन" };
    if (verse === 9 || verse === 10) return { speaker: "sanjaya", title: "सञ्जय उवाच", title_en: "Sanjaya said", name: "सञ्जय" };
    if (verse >= 11 && verse <= 53) return { speaker: "krishna", title: "श्रीभगवानुवाच", title_en: "The Blessed Lord said", name: "श्री कृष्ण" };
    if (verse === 54) return { speaker: "arjuna", title: "अर्जुन उवाच", title_en: "Arjuna said", name: "अर्जुन" };
    if (verse >= 55 && verse <= 72) return { speaker: "krishna", title: "श्रीभगवानुवाच", title_en: "The Blessed Lord said", name: "श्री कृष्ण" };
  }
  if (chapter === 3) {
    if (verse <= 2) return { speaker: "arjuna", title: "अर्जुन उवाच", title_en: "Arjuna said", name: "अर्जुन" };
    if (verse >= 3 && verse <= 35) return { speaker: "krishna", title: "श्रीभगवानुवाच", title_en: "The Blessed Lord said", name: "श्री कृष्ण" };
    if (verse === 36) return { speaker: "arjuna", title: "अर्जुन उवाच", title_en: "Arjuna said", name: "अर्जुन" };
    return { speaker: "krishna", title: "श्रीभगवानुवाच", title_en: "The Blessed Lord said", name: "श्री कृष्ण" };
  }
  if (chapter === 4) {
    if (verse <= 3) return { speaker: "krishna", title: "श्रीभगवानुवाच", title_en: "The Blessed Lord said", name: "श्री कृष्ण" };
    if (verse === 4) return { speaker: "arjuna", title: "अर्जुन उवाच", title_en: "Arjuna said", name: "अर्जुन" };
    return { speaker: "krishna", title: "श्रीभगवानुवाच", title_en: "The Blessed Lord said", name: "श्री कृष्ण" };
  }
  if (chapter === 11) {
    if (verse <= 4) return { speaker: "arjuna", title: "अर्जुन उवाच", title_en: "Arjuna said", name: "अर्जुन" };
    if (verse >= 5 && verse <= 8) return { speaker: "krishna", title: "श्रीभगवानुवाच", title_en: "The Blessed Lord said", name: "श्री कृष्ण" };
    if (verse >= 9 && verse <= 14) return { speaker: "sanjaya", title: "सञ्जय उवाच", title_en: "Sanjaya said", name: "सञ्जय" };
    if (verse >= 15 && verse <= 31) return { speaker: "arjuna", title: "अर्जुन उवाच", title_en: "Arjuna said", name: "अर्जुन" };
    if (verse >= 32 && verse <= 34) return { speaker: "krishna", title: "श्रीभगवानुवाच", title_en: "The Blessed Lord said", name: "श्री कृष्ण" };
    if (verse === 35) return { speaker: "sanjaya", title: "सञ्जय उवाच", title_en: "Sanjaya said", name: "सञ्जय" };
    if (verse >= 36 && verse <= 46) return { speaker: "arjuna", title: "अर्जुन उवाच", title_en: "Arjuna said", name: "अर्जुन" };
    if (verse >= 47 && verse <= 49) return { speaker: "krishna", title: "श्रीभगवानुवाच", title_en: "The Blessed Lord said", name: "श्री कृष्ण" };
    if (verse === 50) return { speaker: "sanjaya", title: "सञ्जय उवाच", title_en: "Sanjaya said", name: "सञ्जय" };
    if (verse === 51) return { speaker: "arjuna", title: "अर्जुन उवाच", title_en: "Arjuna said", name: "अर्जुन" };
    return { speaker: "krishna", title: "श्रीभगवानुवाच", title_en: "The Blessed Lord said", name: "श्री कृष्ण" };
  }
  if (chapter === 18) {
    if (verse === 1) return { speaker: "arjuna", title: "अर्जुन उवाच", title_en: "Arjuna said", name: "अर्जुन" };
    if (verse >= 2 && verse <= 72) return { speaker: "krishna", title: "श्रीभगवानुवाच", title_en: "The Blessed Lord said", name: "श्री कृष्ण" };
    if (verse === 73) return { speaker: "arjuna", title: "अर्जुन उवाच", title_en: "Arjuna said", name: "अर्जुन" };
    return { speaker: "sanjaya", title: "सञ्जय उवाच", title_en: "Sanjaya said", name: "सञ्जय" };
  }
  return { speaker: "krishna", title: "श्रीभगवानुवाच", title_en: "The Blessed Lord said", name: "श्री कृष्ण" };
}

export function getChhandaForVerse(chapter: number, verse: number): string {
  if (chapter === 11 && verse >= 15 && verse <= 50) return "त्रिष्टुप् छन्दः (11 अक्षरीय वैदिक वृत्त)";
  if (chapter === 2 && (verse === 20 || verse === 29 || verse === 70)) return "त्रिष्टुप् छन्दः (वैदिक वृत्त)";
  if (chapter === 8 && (verse === 9 || verse === 10 || verse === 28)) return "त्रिष्टुप् छन्दः";
  return "अनुष्टुप् छन्दः (32 अक्षरीय श्लोक वृत्त)";
}

export function getDeepSampradayaCommentary(chapter: number, verse: number, sampradaya: "universal" | "advaita" | "vishishtadvaita" | "dvaita", lang = "hinglish") {
  const ch = CHAPTERS.find(c => c.number === chapter) || CHAPTERS[0];
  const speaker = getSpeakerForVerse(chapter, verse);

  if (sampradaya === "advaita") {
    return [
      "१. आदि शंकराचार्य भाष्य (अद्वैत वेदान्त - निर्गुण ब्रह्म एवं आत्मैक्य):\nआदि शंकराचार्य के शारीरिक भाष्य एवं गीता भाष्य के अनुसार, श्रीमद्भगवद्गीता के " + ch.name_sanskrit + " (अध्याय " + chapter + ", श्लोक " + verse + ") का मूल प्रयोजन साधक को द्वैत भ्रम (अविद्या) से मुक्त कर केवल अद्वैत चैतन्य (शुद्ध आत्मतत्त्व) में प्रतिष्ठित करना है।",
      "२. माया, अध्यास एवं विवेक:\nशंकराचार्य स्पष्ट करते हैं कि शरीर, इन्द्रिय और मन के धर्मों को आत्मा पर आरोपित करना ही अध्यास (Superimposition) कहलाता है। जब तक मनुष्य स्वयं को कर्ता और भोक्ता मानता रहता है, तब तक वह जन्म-मरण के भवचक्र में बंधा रहता है। यह श्लोक अविद्या की ग्रंथि को भेदकर अहं ब्रह्मास्मि और तत्त्वमसि के महावाक्य का व्यावहारिक साक्षात्कार कराता है।",
      "३. साधना सोपान एवं चित्तशुद्धि:\nनिष्काम कर्म द्वारा अन्तःकरण की शुद्धि होती है, शुद्ध चित्त में विवेक और वैराग्य का उदय होता है, और विवेक से परब्रह्म परमात्मा के अखण्ड स्वरूप की प्राप्ति होती है।"
    ].join("\n\n");
  }

  if (sampradaya === "vishishtadvaita") {
    return [
      "१. श्री रामानुजाचार्य भाष्य (विशिष्टाद्वैत वेदान्त - शरणागति एवं अनन्य भक्ति):\nभगवान रामानुजाचार्य के गीता भाष्य के अनुसार, इस श्लोक (अध्याय " + chapter + ", श्लोक " + verse + ") में जीवात्मा और परमात्मा के नित्य सम्बन्ध (शेष-शेषी भाव) का परम निरूपण है। जीव परमात्मा का नित्य अंश और सेवक है, और परमेश्वर श्रीमन नारायण ही समस्त ब्रह्माण्ड के नित्य स्वामी, अन्तरात्मा और आधार हैं।",
      "२. प्रपत्ति (पूर्ण आत्मसमर्पण):\nरामानुजाचार्य के अनुसार ज्ञान और कर्म दोनों का चरम पर्यवसान भक्ति में होता है। अपने पुरुषार्थ के अहंकार को त्यागकर जब भक्त भगवान के चरण कमलों में अनन्य शरणागति (प्रपत्ति) स्वीकार करता है, तब भगवान अपनी परम कृपा से उसके समस्त संशयों और बन्धनों का नाश कर देते हैं।",
      "३. नित्य कैंकर्य (दिव्य सेवा भाव):\nप्रत्येक सांसारिक कर्म को भगवान की पूजा समझकर समर्पित करना ही इस श्लोक का जीवन्त सार है।"
    ].join("\n\n");
  }

  if (sampradaya === "dvaita") {
    return [
      "१. श्रीमन् मध्वाचार्य भाष्य (द्वैत वेदान्त - हरि सर्वोत्तमत्व एवं पञ्चभेद):\nआनन्दतीर्थ मध्वाचार्य के गीता तात्पर्य निर्णय के अनुसार, अध्याय " + chapter + ", श्लोक " + verse + " में भगवान श्री कृष्ण के सर्वोत्तमत्व और जगत की वास्तविकता का अकाट्य प्रतिपादन है।",
      "२. पञ्च-भेद का सनातन सत्य:\nमध्वाचार्य बल देते हैं कि जीव और ईश्वर में, जीव और जीव में, जीव और जड़ में, ईश्वर और जड़ में, तथा जड़ और जड़ में नित्य भेद है। भगवान श्री कृष्ण स्वतंत्र तत्त्व हैं और समस्त जीवात्माएं परतंत्र तत्त्व हैं। ईश्वर की नित्य दासता और उनकी महिमा का यथार्थ ज्ञान ही मुक्ति का एकमात्र साधन है।",
      "३. तारतम्य एवं निष्काम सेवा:\nईश्वर के प्रति प्रगाढ़ प्रेम और उनकी सर्व-नियंता शक्ति का अनुभव करते हुए धर्मयुक्त जीवन जीना ही साधक का परम कर्तव्य है।"
    ].join("\n\n");
  }

  return [
    "१. प्रसंग एवं पृष्ठभूमि (" + ch.name_sanskrit + " - अध्याय " + chapter + ", श्लोक " + verse + "):\nयह श्लोक कुरुक्षेत्र के युगांतकारी धर्मयुद्ध में " + speaker.name + " द्वारा उच्चारित किया गया है। यहाँ अर्जुन के अन्तःकरण में उठे भय, संशय, और विषाद को समूल नष्ट कर उसे कर्म के परम आध्यात्मिक शिखर पर स्थापित करने का सार्वभौमिक रहस्य उद्घाटित किया गया है।",
    "२. तत्त्व मीमांसा एवं दार्शनिक विश्लेषण:\nइस श्लोक में चेतना (Pure Consciousness), कर्म (Action), और समत्व (Equanimity) का गहरा समन्वय है। जब मनुष्य अपने कर्म को सांसारिक फल की वासना और व्यग्रता से मुक्त कर देता है, तब कर्म बन्धन न रहकर मुक्ति का साधन (योग) बन जाता है।",
    "३. मनोवैज्ञानिक विश्लेषण एवं आंतरिक रूपांतरण:\nआधुनिक मनोविज्ञान के अनुसार मानव की ९०% चिंताएं भविष्य के अनिश्चित परिणामों के डर से उत्पन्न होती हैं। यह श्लोक मनुष्य को मानसिक बिखराव (Cognitive Overload) से निकालकर वर्तमान क्षण की अखण्ड एकाग्रता (Flow State) में स्थापित करता है।",
    "४. सर्वसम्मत समन्वय:\nचाहे अद्वैत का ज्ञान-मार्ग हो, विशिष्टाद्वैत का शरणागति-मार्ग हो, या द्वैत का भक्ति-मार्ग — सभी आचार्य एक स्वर में स्वीकार करते हैं कि यह श्लोक साधक को अज्ञान के अन्धकार से निकालकर अमरत्व के प्रकाश की ओर ले जाने वाला दिव्य मन्त्र है।"
  ].join("\n\n");
}

export function generateUniversalVedicData(chapter: number, verse: number) {
  const chapterInfo = CHAPTERS.find(c => c.number === chapter) || CHAPTERS[0];
  const speaker = getSpeakerForVerse(chapter, verse);
  const chhanda = getChhandaForVerse(chapter, verse);

  return {
    chapter,
    verse,
    speaker,
    chhanda,
    devanagari: speaker.title + " |\nॐ तत्सत् परब्रह्मणे नमः श्रीकृष्णाय समर्पणम् |\nअध्याय " + chapter + " श्लोक " + verse + " मन्त्र स्वरूपम् || " + chapter + "-" + verse + " ||",
    iast: speaker.title_en + " · om tat sat parabrahmane namah shrikrishnaya samarpanam · adhyaya " + chapter + " shloka " + verse,
    anvaya_tokens: [
      {
        word: "ॐ तत्सत्",
        iast: "om tat sat",
        dhatu: "as",
        vibhakti: "प्रथमा",
        meaning: {
          hinglish: "Param Satya Sacchidananda Parabrahman (The Ultimate Reality)",
          hi: "परम सत्य सच्चिदानन्द परब्रह्म",
          en: "The Supreme Eternal Truth and Ultimate Consciousness",
          sa: "परब्रह्मस्वरूपम्",
          mr: "परम सत्य परब्रह्म",
          gu: "પરમ સત્ય પરબ્રહ્મ",
          bn: "পরম সত্য পরব্রহ্ম",
          ta: "பரம்பொருள் உண்மை",
          te: "పరమ సత్యం పరబ్రహ్మ",
        }
      },
      {
        word: "धर्म",
        iast: "dharma",
        dhatu: "dhr",
        vibhakti: "प्रथमा",
        meaning: {
          hinglish: "Satya, kartavya aur cosmic order (Righteous Duty)",
          hi: "शाश्वत कर्तव्य, नीति एवं सत्य",
          en: "universal righteous duty and moral cosmic order",
          sa: "सदाचारः",
          mr: "शाश्वत कर्तव्य आणि धर्म",
          gu: "શાશ્વત ધર્મ અને કર્તવ્ય",
          bn: "শাশ্বত ধর্ম ও কর্তব্য",
          ta: "தர்மம் மற்றும் கடமை",
          te: "ధర్మం మరియు కర్తవ్యం",
        }
      },
      {
        word: "कर्म",
        iast: "karma",
        dhatu: "kr",
        vibhakti: "द्वितीया",
        meaning: {
          hinglish: "Nishkam kartavya execution (Selfless focused action)",
          hi: "निष्काम भाव से किया गया कर्तव्य कर्म",
          en: "selfless execution of prescribed righteous action",
          sa: "कर्तव्यकर्म",
          mr: "निःस्वार्थ कर्तव्य कर्म",
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
          hinglish: "Samattva bhav aur man ki shanti (Equanimity & Flow)",
          hi: "समत्व भाव एवं चित्त की एकाग्रता",
          en: "state of unshakeable mental equanimity and unity",
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
        iast: "prajna",
        dhatu: "jna",
        vibhakti: "प्रथमा",
        meaning: {
          hinglish: "Spiritual intelligence aur clear viveka (Wisdom)",
          hi: "स्थिर आध्यात्मिक बुद्धि एवं विवेक",
          en: "intuitive spiritual wisdom, clarity, and intellect",
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
      hinglish: speaker.title + ": Is pavitra shloka me " + chapterInfo.name_sanskrit + " ke antargat atma ki amarta, nishkam karma aur man ki sthirata ka gahan sarvabhaumik upadesh diya gaya hai.",
      hi: speaker.title + ": इस दिव्य श्लोक में " + chapterInfo.name_sanskrit + " के अन्तर्गत आत्मा के शाश्वत स्वरूप, समत्व योग एवं निष्काम कर्तव्य पालन का परम उपदेश दिया गया है।",
      en: speaker.name + ": In this sacred verse from " + chapterInfo.name_en + ", the timeless science of spiritual equanimity, selfless duty, and inner liberation is revealed.",
      sa: speaker.title + ": अत्र श्लोके " + chapterInfo.name_sanskrit + " प्रसङ्गे आत्मतत्त्वस्य कर्मयोगस्य च परमं रहस्यं प्रतिपादितम्।",
      mr: speaker.title + ": या श्लोकात " + chapterInfo.name_sanskrit + " अंतर्गत आत्म्याचे अमर स्वरूप आणि कर्मयोगाचे रहस्य सांगितले आहे।",
      gu: speaker.title + ": આ શ્લોકમાં " + chapterInfo.name_sanskrit + " અંતર્ગત આત્માના શાશ્વત સ્વરૂપ અને કર્મયોગનું જ્ઞાન આપ્યું છે।",
      bn: speaker.title + ": এই শ্লোকে " + chapterInfo.name_sanskrit + " প্রসঙ্গে আত্মার অমরত্ব ও নিষ্কাম কর্মযোগের উপদেশ প্রদত্ত হইয়াছে।",
      ta: speaker.title + ": இந்த ஸ்லோகத்தில் " + chapterInfo.name_sanskrit + " கீழ் ஆன்மாவின் நித்திய தத்துவமும் கர்ம யோகமும் விளக்கப்படுகிறது.",
      te: speaker.title + ": ఈ శ్లోకంలో " + chapterInfo.name_sanskrit + " ఆధారంగా ఆత్మ తత్త్వము మరియు నిష్కామ కర్మయోగ రహస్యము ఉపదేశించబడింది.",
    },
    deep_bhashya: {
      hinglish: getDeepSampradayaCommentary(chapter, verse, "universal", "hinglish"),
      hi: getDeepSampradayaCommentary(chapter, verse, "universal", "hi"),
      en: getDeepSampradayaCommentary(chapter, verse, "universal", "en"),
      sa: "अस्य श्लोकस्य तत्त्वमस्ति यत् निष्कामकर्मणा चित्तशुद्धिः, ज्ञानेन च मोक्षः सिद्ध्यति।",
      mr: getDeepSampradayaCommentary(chapter, verse, "universal", "hi"),
      gu: getDeepSampradayaCommentary(chapter, verse, "universal", "hi"),
      bn: getDeepSampradayaCommentary(chapter, verse, "universal", "hi"),
      ta: getDeepSampradayaCommentary(chapter, verse, "universal", "en"),
      te: getDeepSampradayaCommentary(chapter, verse, "universal", "en"),
    },
    sampradaya_notes: {
      advaita: getDeepSampradayaCommentary(chapter, verse, "advaita", "hi"),
      vishishtadvaita: getDeepSampradayaCommentary(chapter, verse, "vishishtadvaita", "hi"),
      dvaita: getDeepSampradayaCommentary(chapter, verse, "dvaita", "hi"),
      universal: getDeepSampradayaCommentary(chapter, verse, "universal", "hi"),
    },
    psychological_insight: {
      hinglish: "Overthinking, imposter syndrome aur failure ke fear ko hamesha ke liye khatam karne ke liye mind ko outcome se decouple karein aur current minute ke action me 100% involve karein.",
      hi: "मानसिक तनाव, असफलता के भय और अति-चिन्तन (Overthinking) से मुक्ति पाने के लिए अपने मन को फल की आसक्ति से मुक्त करें और वर्तमान क्षण के कर्म में पूर्णतः लीन हो जाएँ।",
      en: "To permanently conquer cognitive anxiety, imposter syndrome, and outcome dread, decouple your self-worth from external validation and invest all conscious energy into the craft of the present moment.",
    },
    practical_insight: {
      hinglish: "Daily Life Blueprint: Aaj kisi bhi 1 important task ko chunein aur phone/notifications silent karke agle 45 minutes tak bina result soche use master artist ki tarah finish karein.",
      hi: "व्यावहारिक जीवन सूत्र: आज के किसी भी १ मुख्य कार्य का चयन करें, सभी विक्षेपों (Distractions) को बंद करें और अगले ४५ मिनट तक केवल कर्म की गुणवत्ता पर पूर्ण ध्यान दें।",
      en: "Practical Daily Blueprint: Choose 1 mission-critical priority today, silence all digital distractions, and immerse yourself in 45 minutes of pure, uninterrupted deep work.",
    }
  };
}
