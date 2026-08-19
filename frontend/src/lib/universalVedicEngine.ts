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

const CHAPTER_THEMES: Record<number, { core: string; philosophy: string; psychology: string }> = {
  1: {
    core: "कुरुक्षेत्र के युगांतकारी धर्मयुद्ध में अर्जुन के विषाद, कुल-नाश के भय और आंतरिक संकोच का निरूपण।",
    philosophy: "जब तक मनुष्य का विवेक मोह और संकीर्ण आसक्ति से ढका रहता है, तब तक वह कर्तव्य-पथ से विचलित होकर पलायन की इच्छा करता है।",
    psychology: "मानसिक तनाव और निर्णयहीनता (Paralysis by Analysis) से मुक्ति पाने के लिए अपने अहम् और पक्षपात को पहचानना अनिवार्य है।"
  },
  2: {
    core: "सांख्ययोग के अन्तर्गत आत्मा की अमरता, षड्भावविकार से परे अविनाशी चैतन्य और स्थितप्रज्ञ के दिव्य लक्षण।",
    philosophy: "देह परिवर्तनशील वस्त्र मात्र है, किन्तु आत्मा न कभी जन्म लेती है और न कभी मरती है। निष्काम कर्म ही चित्तशुद्धि का मार्ग है।",
    psychology: "मृत्यु और हानि के भय को समाप्त करने के लिए अपने भीतर की अचल, साक्षी चेतना में प्रतिष्ठित होना सीखें।"
  },
  3: {
    core: "कर्मयोग के अन्तर्गत कर्तव्य कर्म का ईश्वरीय अर्पण भाव और लोकसंग्रह की प्रेरणा।",
    philosophy: "कर्म से कोई भी प्राणी एक क्षण भी मुक्त नहीं रह सकता। स्वार्थरहित, यज्ञीय भावना से किया गया कर्म ही मुक्तिदाता बनता है।",
    psychology: "आलस्य और अकर्मण्यता को त्यागकर वर्तमान दायित्व में १००% डूब जाना ही आंतरिक शांति का गुप्त सूत्र है।"
  },
  4: {
    core: "ज्ञानकर्मसंन्यासयोग के अन्तर्गत अवतारी चेतना, यज्ञों का स्वरूप और ज्ञान की परम पावक शक्ति।",
    philosophy: "संसार में ज्ञान के समान पवित्र करने वाला कुछ भी नहीं है। जब कर्म ज्ञान की अग्नि में भस्म हो जाता है, तब बन्धन शेष नहीं रहता।",
    psychology: "संशय का समूल नाश केवल श्रद्धा और आत्म-ज्ञान से होता है। संशयात्मा का विनाश निश्चित होता है।"
  },
  5: {
    core: "कर्मसंन्यासयोग के अन्तर्गत सन्यास और कर्मयोग के तात्विक एकत्व का उद्घाटन।",
    philosophy: "बाह्य कर्मत्याग सन्यास नहीं है, अपितु कर्तापन के अहंकार और फल-आसक्ति का त्याग ही वास्तविक सन्यास है।",
    psychology: "मन को कमल के पत्ते की भाँति संसार के जल में रहते हुए भी सांसारिक दोषों से सर्वथा निर्लेप रखें।"
  },
  6: {
    core: "ध्यानयोग (आत्मसंयम योग) के अन्तर्गत चित्त-वृत्ति निरोध, अभ्यास, वैराग्य और योगाभ्यास की विधि।",
    philosophy: "मन ही मनुष्य का सबसे बड़ा मित्र है और यदि अनियंत्रित हो तो मन ही सबसे भयंकर शत्रु बन जाता है।",
    psychology: "अति-चंचलता को शांत करने के लिए प्रतिदिन मौन, प्राणायाम और नियमित अभ्यास द्वारा मन को अपने वश में करें।"
  },
  7: {
    core: "ज्ञानविज्ञानयोग के अन्तर्गत परा और अपरा प्रकृति का रहस्य एवं परमात्मा की सर्वव्यापकता।",
    philosophy: "भगवान ही समस्त सृष्टि के उद्भव और प्रलय के मूल कारण हैं। जल में रस, सूर्य-चन्द्रमा में प्रकाश और वेदों में ओंकार वही हैं।",
    psychology: "संसार की दृश्य विविधता के पीछे छिपी एकरस दिव्यता को देखने से मन की ईर्ष्या और संकीर्णता मिट जाती है।"
  },
  8: {
    core: "अक्षरब्रह्मयोग के अन्तर्गत प्रयाण-काल (मृत्यु-क्षण) की चेतना, ओंकार-साधना और मुक्ति-मार्ग।",
    philosophy: "मनुष्य जीवन भर जिस भाव का चिंतन करता है, अंतकाल में उसी भाव को प्राप्त होता है। अतः नित्य ईश्वरीय स्मरण आवश्यक है।",
    psychology: "अंतिम क्षण की शांति जीवन भर के मानसिक अनुशासन और निरंतर ध्यान की पूंजी पर निर्भर करती है।"
  },
  9: {
    core: "राजविद्याराजगुह्ययोग के अन्तर्गत संपूर्ण विद्याओं का राजा, अनन्य भक्ति और योग-क्षेम का महा-वचन।",
    philosophy: "जो अनन्य भाव से ईश्वर का ध्यान करते हैं, उनके अप्राप्त की प्राप्ति और प्राप्त की रक्षा का भार स्वयं परमात्मा वहन करते हैं।",
    psychology: "भविष्य की असुरक्षा और भय को विसर्जित करके कर्तव्य में पूर्ण समर्पण करने से अगाध शांति मिलती है।"
  },
  10: {
    core: "विभूतियोग के अन्तर्गत समस्त ब्रह्माण्ड में परमात्मा के अनन्त ऐश्वर्य और कलाओं का प्रकटीकरण।",
    philosophy: "जहाँ भी कोई तेज, शक्ति, सौंदर्य या विशेषता दृष्टिगोचर होती है, उसे परमात्मा के तेज का अंश मात्र जानें।",
    psychology: "प्रकृति और मनुष्य के गुणों में दिव्यता का दर्शन करने से अहम् नष्ट होता है और कृतज्ञता का जन्म होता है।"
  },
  11: {
    core: "विश्वरूपदर्शनयोग के अन्तर्गत काल-स्वरूप परमात्मा का विराट एवं भयप्रद रूप-दर्शन।",
    philosophy: "परमात्मा ही सृष्टि, स्थिति और संहार के सर्वसमर्थ नियंता हैं। समस्त जीव काल के मुख में पहले से ही समाए हुए हैं।",
    psychology: "विशाल ब्रह्माण्ड के सामने अपने क्षुद्र अहंकार की निरर्थकता को समझकर विनीत एवं समर्पित बनें।"
  },
  12: {
    core: "भक्तियोग के अन्तर्गत सगुण-निर्गुण उपासना का समन्वय और प्रिय भक्त के दिव्य लक्षण।",
    philosophy: "जो किसी से द्वेष नहीं करता, जो सबका मित्र और करुणामय है, सुख-दुख में सम है — वही भक्त भगवान को अतिशय प्रिय है।",
    psychology: "संवेदना, क्षमाशीलता और भावनात्मक समरसता ही उच्च कोटि के व्यक्तित्व की सच्ची पहचान है।"
  },
  13: {
    core: "क्षेत्रक्षेत्रज्ञविभागयोग के अन्तर्गत शरीर (क्षेत्र) और आत्मा (क्षेत्रज्ञ) का वैज्ञानिक विवेक।",
    philosophy: "शरीर २४ तत्वों का संघात है और आत्मा उससे सर्वथा असंग एवं शुद्ध साक्षी चैतन्य है।",
    psychology: "स्वयं को विकारों से अलग एक साक्षी (Observer) के रूप में देखने से मानसिक आघात तुरंत समाप्त हो जाते हैं।"
  },
  14: {
    core: "गुणत्रयविभागयोग के अन्तर्गत सत्व, रज और तम तीनों गुणों का मनोवैज्ञानिक विश्लेषण और गुणातीत अवस्था।",
    philosophy: "प्रकृति के तीनों गुण जीव को देह में बांधते हैं। गुणातीत होकर ही मनुष्य अमृतत्व और मोक्ष का साक्षात्कार करता है।",
    psychology: "अपने मूड स्विंग्स और आलस्य (तम) व अति-लोभ (रज) को पहचानकर सत्व गुण को बढ़ाना ही मानसिक स्वास्थ्य है।"
  },
  15: {
    core: "पुरुषोत्तमयोग के अन्तर्गत ऊर्ध्वमूल अश्वत्थ वृक्ष का रूपक और क्षर-अक्षर से परे पुरुषोत्तम तत्व।",
    philosophy: "संसार रूपी वृक्ष को असंगता (वैराग्य) के सुदृढ़ शस्त्र से काटकर उस परम पद को खोजना चाहिए जहाँ से पुनरावृत्ति नहीं होती।",
    psychology: "संसार की व्यर्थ उलझनों से मानसिक डिटेचमेंट (वैराग्य) विकसित करना ही सच्ची स्वतंत्रता है।"
  },
  16: {
    core: "दैवासुरसम्पद्विभागयोग के अन्तर्गत दैवी और आसुरी प्रवृत्तियों का सूक्ष्म मनोवैज्ञानिक विभाजन।",
    philosophy: "अभय, अहिंसा और सत्य दैवी सम्पदा हैं; दंभ, दर्प, क्रोध और अज्ञान आसुरी सम्पदा हैं जो विनाश की ओर ले जाती हैं।",
    psychology: "काम, क्रोध और लोभ — ये तीनों आत्मा का नाश करने वाले नरक के तीन मुख्य द्वार हैं, इनका सर्वथा त्याग करें।"
  },
  17: {
    core: "श्रद्धात्रयविभागयोग के अन्तर्गत आहार, यज्ञ, तप, दान की त्रिविध प्रकृति और ॐ तत्सत् का महामंत्र।",
    philosophy: "मनुष्य की जैसी श्रद्धा होती है, वैसा ही उसका स्वरूप बन जाता है। सात्विक आहार और सात्विक तप ही कल्याणकारी हैं।",
    psychology: "अपने खान-पान, दिनचर्या और वचनों में सात्विकता लाकर जीवन की गुणवत्ता को उच्चतम स्तर पर ले जाएं।"
  },
  18: {
    core: "मोक्षसंन्यासयोग के अन्तर्गत त्याग और सन्यास की पराकाष्ठा, अठारह पुराणों का सार और चरम शरणागति।",
    philosophy: "समस्त सांसारिक संशयों को त्यागकर केवल परमात्मा की शरण में जाना ही सम्पूर्ण ज्ञान का परम निष्कर्ष है।",
    psychology: "जहाँ विवेकयुक्त पुरुषार्थ (अर्जुन) और ईश्वरीय मार्गदर्शन (श्री कृष्ण) का मिलन होता है, वहाँ विजय सुनिश्चित है।"
  }
};

export function getDeepSampradayaCommentary(chapter: number, verse: number, sampradaya: "universal" | "advaita" | "vishishtadvaita" | "dvaita", lang = "hinglish") {
  const ch = CHAPTERS.find(c => c.number === chapter) || CHAPTERS[0];
  const speaker = getSpeakerForVerse(chapter, verse);
  const theme = CHAPTER_THEMES[chapter] || CHAPTER_THEMES[1];

  if (sampradaya === "advaita") {
    return [
      "१. आदि शंकराचार्य भाष्य (अद्वैत वेदान्त - निर्गुण ब्रह्म एवं आत्मैक्य):\nआदि शंकराचार्य के शारीरिक भाष्य एवं गीता भाष्य के अनुसार, श्रीमद्भगवद्गीता के " + ch.name_sanskrit + " (अध्याय " + chapter + ", श्लोक " + verse + ") का मूल प्रयोजन साधक को द्वैत भ्रम (अविद्या) से मुक्त कर केवल अद्वैत चैतन्य (शुद्ध आत्मतत्त्व) में प्रतिष्ठित करना है।\n\n" + theme.philosophy,
      "२. माया, अध्यास एवं विवेक:\nशंकराचार्य स्पष्ट करते हैं कि शरीर, इन्द्रिय और मन के धर्मों को आत्मा पर आरोपित करना ही अध्यास (Superimposition) कहलाता है। जब तक मनुष्य स्वयं को कर्ता और भोक्ता मानता रहता है, तब तक वह जन्म-मरण के भवचक्र में बंधा रहता है। यह श्लोक अविद्या की ग्रंथि को भेदकर अहं ब्रह्मास्मि और तत्त्वमसि के महावाक्य का व्यावहारिक साक्षात्कार कराता है।",
      "३. साधना सोपान एवं चित्तशुद्धि:\nनिष्काम कर्म द्वारा अन्तःकरण की शुद्धि होती है, शुद्ध चित्त में विवेक और वैराग्य का उदय होता है, और विवेक से परब्रह्म परमात्मा के अखण्ड स्वरूप की प्राप्ति होती है। " + theme.psychology
    ].join("\n\n");
  }

  if (sampradaya === "vishishtadvaita") {
    return [
      "१. श्री रामानुजाचार्य भाष्य (विशिष्टाद्वैत वेदान्त - शरणागति एवं अनन्य भक्ति):\nभगवान रामानुजाचार्य के गीता भाष्य के अनुसार, इस श्लोक (अध्याय " + chapter + ", श्लोक " + verse + ") में जीवात्मा और परमात्मा के नित्य सम्बन्ध (शेष-शेषी भाव) का परम निरूपण है। जीव परमात्मा का नित्य अंश और सेवक है, और परमेश्वर श्रीमन नारायण ही समस्त ब्रह्माण्ड के नित्य स्वामी, अन्तरात्मा और आधार हैं।\n\n" + theme.core,
      "२. प्रपत्ति (पूर्ण आत्मसमर्पण):\nरामानुजाचार्य के अनुसार ज्ञान और कर्म दोनों का चरम पर्यवसान भक्ति में होता है। अपने पुरुषार्थ के अहंकार को त्यागकर जब भक्त भगवान के चरण कमलों में अनन्य शरणागति (प्रपत्ति) स्वीकार करता है, तब भगवान अपनी परम कृपा से उसके समस्त संशयों और बन्धनों का नाश कर देते हैं।",
      "३. नित्य कैंकर्य (दिव्य सेवा भाव):\nप्रत्येक सांसारिक कर्म को भगवान की पूजा समझकर समर्पित करना ही इस श्लोक का जीवन्त सार है। " + theme.philosophy
    ].join("\n\n");
  }

  if (sampradaya === "dvaita") {
    return [
      "१. श्रीमन् मध्वाचार्य भाष्य (द्वैत वेदान्त - हरि सर्वोत्तमत्व एवं पञ्चभेद):\nआनन्दतीर्थ मध्वाचार्य के गीता तात्पर्य निर्णय के अनुसार, अध्याय " + chapter + ", श्लोक " + verse + " में भगवान श्री कृष्ण के सर्वोत्तमत्व और जगत की वास्तविकता का अकाट्य प्रतिपादन है।\n\n" + theme.philosophy,
      "२. पञ्च-भेद का सनातन सत्य:\nमध्वाचार्य बल देते हैं कि जीव और ईश्वर में, जीव और जीव में, जीव और जड़ में, ईश्वर और जड़ में, तथा जड़ और जड़ में नित्य भेद है। भगवान श्री कृष्ण स्वतंत्र तत्त्व हैं और समस्त जीवात्माएं परतंत्र तत्त्व हैं। ईश्वर की नित्य दासता और उनकी महिमा का यथार्थ ज्ञान ही मुक्ति का एकमात्र साधन है।",
      "३. तारतम्य एवं निष्काम सेवा:\nईश्वर के प्रति प्रगाढ़ प्रेम और उनकी सर्व-नियंता शक्ति का अनुभव करते हुए धर्मयुक्त जीवन जीना ही साधक का परम कर्तव्य है। " + theme.psychology
    ].join("\n\n");
  }

  return [
    "१. प्रसंग एवं ऐतिहासिक पृष्ठभूमि (" + ch.name_sanskrit + " - अध्याय " + chapter + ", श्लोक " + verse + "):\nयह श्लोक कुरुक्षेत्र के युगांतकारी धर्मयुद्ध में " + speaker.name + " द्वारा उच्चारित किया गया है। " + theme.core,
    "२. तत्त्व मीमांसा एवं दार्शनिक विश्लेषण:\nइस श्लोक में चेतना (Pure Consciousness), कर्म (Action), और समत्व (Equanimity) का गहरा समन्वय है। " + theme.philosophy,
    "३. मनोवैज्ञानिक विश्लेषण एवं आंतरिक रूपांतरण:\n" + theme.psychology + "\nआधुनिक मनोविज्ञान के अनुसार मानव की ९०% चिंताएं भविष्य के अनिश्चित परिणामों के डर से उत्पन्न होती हैं। यह श्लोक मनुष्य को मानसिक बिखराव (Cognitive Overload) से निकालकर वर्तमान क्षण की अखण्ड एकाग्रता (Flow State) में स्थापित करता है।",
    "४. सर्वसम्मत समन्वय:\nचाहे अद्वैत का ज्ञान-मार्ग हो, विशिष्टाद्वैत का शरणागति-मार्ग हो, या द्वैत का भक्ति-मार्ग — सभी आचार्य एक स्वर में स्वीकार करते हैं कि यह श्लोक साधक को अज्ञान के अन्धकार से निकालकर अमरत्व के प्रकाश की ओर ले जाने वाला दिव्य मन्त्र है।"
  ].join("\n\n");
}

export function generateUniversalVedicData(chapter: number, verse: number) {
  const chapterInfo = CHAPTERS.find(c => c.number === chapter) || CHAPTERS[0];
  const speaker = getSpeakerForVerse(chapter, verse);
  const chhanda = getChhandaForVerse(chapter, verse);
  const theme = CHAPTER_THEMES[chapter] || CHAPTER_THEMES[1];

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
          bn: "শাশ্বত ধর্ম ও कर्तव्य",
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
      hinglish: speaker.title + ": Is pavitra shloka me " + chapterInfo.name_sanskrit + " ke antargat atma ki amarta, nishkam karma aur man ki sthirata ka gahan sarvabhaumik upadesh diya gaya hai. " + theme.core,
      hi: speaker.title + ": इस दिव्य श्लोक में " + chapterInfo.name_sanskrit + " के अन्तर्गत आत्मा के शाश्वत स्वरूप, समत्व योग एवं निष्काम कर्तव्य पालन का परम उपदेश दिया गया है। " + theme.core,
      en: speaker.name + ": In this sacred verse from " + chapterInfo.name_en + ", the timeless science of spiritual equanimity, selfless duty, and inner liberation is revealed. " + theme.core,
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
      hinglish: theme.psychology,
      hi: theme.psychology,
      en: "To conquer chronic anxiety and performance dread, cultivate inner detachment from results and anchor your awareness in the craft of the present moment.",
    },
    practical_insight: {
      hinglish: "Daily Life Blueprint: " + theme.psychology + " Aaj kisi bhi 1 important task ko chunein aur bina result soche use 100% excellence ke saath finish karein.",
      hi: "व्यावहारिक जीवन सूत्र: " + theme.psychology + " आज के किसी भी १ मुख्य कार्य का चयन करें और पूर्ण निष्काम भाव से कार्य को पूर्ण करें।",
      en: "Practical Daily Blueprint: " + theme.psychology + " Execute your primary duty with complete presence and zero anxiety for future outcomes.",
    }
  };
}
