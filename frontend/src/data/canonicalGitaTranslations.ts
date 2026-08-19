import type { AppLanguage } from '@/context/LanguageContext';

export interface ComprehensiveVerseTranslation {
  chapter: number;
  verse: number;
  devanagari: string;
  iast: string;
  word_anvaya: Array<{
    word: string;
    iast: string;
    dhatu?: string;
    vibhakti?: string;
    meaning: Record<string, string>;
  }>;
  translation: Record<string, string>;
  deep_bhashya: Record<string, string>;
  practical_insight: Record<string, string>;
}

export const CANONICAL_TRANSLATIONS: Record<string, ComprehensiveVerseTranslation> = {
  '1_1': {
    chapter: 1,
    verse: 1,
    devanagari: "धृतराष्ट्र उवाच |\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय || १-१ ||",
    iast: "dhṛtarāṣṭra uvāca\ndharmakṣetre kurukṣetre samavetā yuyutsavaḥ\nmāmakāḥ pāṇḍavāścaiva kimakurvata sañjaya",
    word_anvaya: [
      {
        word: "धर्मक्षेत्रे",
        iast: "dharmakṣetre",
        dhatu: "kṣetra",
        vibhakti: "Locative Singular (सप्तमी)",
        meaning: {
          hinglish: "Dharma ki pavitra bhoomi par (in sacred field of Dharma)",
          hi: "धर्मभूमि (पवित्र क्षेत्र) में",
          en: "in the sacred field of righteous duty",
          sa: "धर्मभूमावेव",
          mr: "धर्मभूमीवर",
          gu: "ધર્મભૂમિમાં",
          bn: "ধর্মক্ষেত্রে",
          ta: "தர்ம பூமியில்",
          te: "ధర్మ క్షేత్రములో",
        }
      },
      {
        word: "कुरुक्षेत्रे",
        iast: "kurukṣetre",
        dhatu: "kuru",
        vibhakti: "Locative Singular (सप्तमी)",
        meaning: {
          hinglish: "Kurukshetra ke yuddha maidan me",
          hi: "कुरुक्षेत्र के ऐतिहासिक युद्धस्थल में",
          en: "in the historic battlefield of Kurukshetra",
          sa: "कुरुभूमौ",
          mr: "कुरुक्षेत्रावर",
          gu: "કુરુક્ષેત્રમાં",
          bn: "কুরুক্ষেত্রে",
          ta: "குருக்ஷேத்திரத்தில்",
          te: "కురుక్షేత్రములో",
        }
      },
      {
        word: "समवेताः",
        iast: "samavetāḥ",
        dhatu: "i",
        vibhakti: "Nominative Plural (प्रथमा)",
        meaning: {
          hinglish: "Aapas me ikattha hue (assembled together)",
          hi: "एकत्रित हुए",
          en: "assembled together",
          sa: "एकत्र समुपस्थिताः",
          mr: "एकत्र आलेले",
          gu: "ભેગા થયેલા",
          bn: "একত্রিত হয়ে",
          ta: "ஒன்றுகூடிய",
          te: "సమకూడిన",
        }
      },
      {
        word: "युयुत्सवः",
        iast: "yuyutsavaḥ",
        dhatu: "yudh",
        vibhakti: "Nominative Plural (प्रथमा)",
        meaning: {
          hinglish: "Yuddha ladne ki iccha rakhne wale",
          hi: "युद्ध करने की तीव्र अभिलाषा वाले",
          en: "desirous of fighting",
          sa: "योद्धुमिच्छवः",
          mr: "युद्धाची इच्छा असलेले",
          gu: "યુદ્ધની ઇચ્છાવાળા",
          bn: "যুদ্ধাভিলাষী",
          ta: "போரிட விரும்பிய",
          te: "యుద్ధేచ్ఛ కలవారు",
        }
      },
      {
        word: "मामकाः",
        iast: "māmakāḥ",
        dhatu: "mama",
        vibhakti: "Nominative Plural (प्रथमा)",
        meaning: {
          hinglish: "Mere putra (Duryodhana aadi)",
          hi: "मेरे पक्ष के पुत्र (दुर्योधन आदि कौरव)",
          en: "my sons (the Kauravas)",
          sa: "मम पुत्राः",
          mr: "माझे पुत्र",
          gu: "મારા પુત્રો",
          bn: "আমার পুত্রগণ",
          ta: "என் புதல்வர்கள்",
          te: "నా పుత్రులు",
        }
      },
      {
        word: "पाण्डवाः",
        iast: "pāṇḍavāḥ",
        dhatu: "pāṇḍu",
        vibhakti: "Nominative Plural (प्रथमा)",
        meaning: {
          hinglish: "Pandu ke putra (Yudhishthira, Arjuna aadi)",
          hi: "पाण्डु के धर्मनिष्ठ पुत्र (युधिष्ठिर, अर्जुन आदि)",
          en: "and the sons of Pandu",
          sa: "पाण्डोः पुत्राः",
          mr: "पांडवांचे पुत्र",
          gu: "પાંડુના પુત્રો",
          bn: "পাণ্ডবগণ",
          ta: "பாண்டவர்கள்",
          te: "పాండు పుత్రులు",
        }
      },
      {
        word: "च एव",
        iast: "ca eva",
        dhatu: "-",
        vibhakti: "Avyaya (अव्यय)",
        meaning: {
          hinglish: "Aur nishchit roop se (and certainly)",
          hi: "और निश्चित रूप से",
          en: "and certainly",
          sa: "तथा च",
          mr: "आणि नक्कीच",
          gu: "અને ખરેખર",
          bn: "এবং নিশ্চয়ই",
          ta: "மேலும் நிச்சயமாக",
          te: "మరియు నిశ్చయముగా",
        }
      },
      {
        word: "किम् अकुर्वत",
        iast: "kim akurvata",
        dhatu: "kṛ",
        vibhakti: "Verb 3rd Plural Past",
        meaning: {
          hinglish: "Unhone kya kiya?",
          hi: "उन्होंने क्या किया?",
          en: "what did they do?",
          sa: "किं कृतवन्तः",
          mr: "त्यांनी काय केले?",
          gu: "તેમણે શું કર્યું?",
          bn: "কি করিল?",
          ta: "என்ன செய்தார்கள்?",
          te: "ఏమి చేసిరి?",
        }
      },
      {
        word: "सञ्जय",
        iast: "sañjaya",
        dhatu: "ji",
        vibhakti: "Vocative Singular (सम्बोधन)",
        meaning: {
          hinglish: "Hey Sanjaya! (O Sanjaya)",
          hi: "हे संजय!",
          en: "O Sanjaya!",
          sa: "हे सञ्जय",
          mr: "हे संजया!",
          gu: "હે સંજય!",
          bn: "হে সঞ্জয়!",
          ta: "சஞ்சயனே!",
          te: "ఓ సంజయా!",
        }
      }
    ],
    translation: {
      hinglish: "Dhritarashtra ne Sanjaya se poocha: 'Hey Sanjaya! Pavitra dharmakshetra Kurukshetra ke maidan me yuddha ki tivra ichha se ikattha hue mere beton aur Pandu ke beton ne aakhir wahan kya kiya?'",
      hi: "धृतराष्ट्र ने संजय से पूछा: 'हे संजय! धर्मभूमि कुरुक्षेत्र में युद्ध करने की प्रबल इच्छा से एकत्रित हुए मेरे पुत्रों (कौरवों) और पाण्डु के पुत्रों (पाण्डवों) ने वहाँ क्या किया?'",
      en: "King Dhritarashtra inquired: 'O Sanjaya, assembled on the holy soil of Kurukshetra with the burning desire for battle, what did my sons and the sons of Pandu do?'",
      sa: "धृतराष्ट्रः सञ्जयं पृष्टवान् — हे सञ्जय! धर्मक्षेत्रे कुरुक्षेत्रे योद्धुमिच्छवः मदीयाः पुत्राः पाण्डोश्च सुताः एकत्र समवेताः सन्तः किं कृतवन्तः?",
      mr: "धृतराष्ट्र संजयाला विचारतात: 'हे संजया! धर्मभूमी कुरुक्षेत्रावर युद्धाच्या तीव्र इच्छेने एकत्र आलेल्या माझ्या पुत्रांनी आणि पांडवांनी तिथे काय केले?'",
      gu: "ધૃતરાષ્ટ્ર સંજયને પૂછે છે: 'હે સંજય! ધર્મક્ષેત્ર કુરુક્ષેત્રમાં યુદ્ધની ઈચ્છાથી એકઠા થયેલા મારા પુત્રો અને પાંડુના પુત્રોએ શું કર્યું?'",
      bn: "ধৃতরাষ্ট্র সঞ্জয়কে জিজ্ঞাসা করিলেন: 'হে সঞ্জয়! পবিত্র ধর্মক্ষেত্র কুরুক্ষেত্রে যুদ্ধাভিলাষী হইয়া একত্রিত আমার পুত্রগণ ও পাণ্ডু পুত্রগণ কি করিল?'",
      ta: "திருதராஷ்டிரன் சஞ்சயனிடம் கேட்டான்: 'சஞ்சயனே! தர்ம பூமியான குருக்ஷேத்திரத்தில் போரிடும் விருப்பத்துடன் ஒன்று கூடின என் புதல்வர்களும் பாண்டவர்களும் என்ன செய்தனர்?'",
      te: "ధృతరాష్ట్రుడు సంజయునితో ఇలా అనెను: 'ఓ సంజయా! ధర్మక్షేత్రమైన కురుక్షేత్రంలో యుద్ధం చేయాలనే కోరికతో సమకూడిన నా కుమారులు మరియు పాండు కుమారులు ఏమి చేసిరి?'",
    },
    deep_bhashya: {
      hinglish: "श्रीमद्भगवद्गीता ka start 'धर्म' shabd se hota hai aur end 'मम' (18.78) par hota hai, jiska matlab hai 'यतो धर्मस्ततो जयः' (Jahan Dharma hai, wahin Jeet hai).\n\n1. **Dharmakshetra vs Kurukshetra**: Kuru ka matlab hota hai 'Karo' (Action/Karma) aur Dharma ka matlab hota hai 'Satya aur Kartavya'. Ye sansaar ek Kurukshetra (Karma-kshetra) hai, aur hamara hriday ek Dharmakshetra hai jahan roz shubh aur ashubh vrittiyon ka yuddha chalta hai.\n\n2. **Dhritarashtra ki Maansikta (Psychological Bias)**: Dhritarashtra ne 'Mamakah' (Mere putra) aur 'Pandavah' (Pandu ke putra) me bhed kiya. Yahi bhedbhaav (attachment and partiality) saare dukh, moh aur aniti ki jad hai. Jab manushya parivaar, pad ya lalach me 'Mera-Tera' karta hai, tabhi vinash ka beej bo diya jata hai.",
      hi: "श्रीमद्भगवद्गीता का प्रारम्भ 'धर्म' शब्द से होता है और समापन 'मम' (18.78) पर होता है, जिसका संयुक्त अर्थ 'मम धर्मः' (मेरा सनातन धर्म) है।\n\n१. **दार्शनिक एवं आध्यात्मिक रहस्य**: 'कुरुक्षेत्र' वह कर्मभूमि है जहाँ प्रत्येक जीव अपने प्रारब्ध और कर्तव्यों का निर्वाह करता है। मानव अन्तःकरण ही 'धर्मक्षेत्र' है जहाँ नित्य सद्गुणों (दैवी संपदा) और दुर्गुणों (आसुरी संपदा) के मध्य धर्मयुद्ध चलता रहता है।\n\n२. **धृतराष्ट्र का मानसिक मोह (अहंकार एवं पक्षपात)**: धृतराष्ट्र ने 'मामकाः' (मेरे पुत्र) और 'पाण्डवाः' (पाण्डु के पुत्र) कहकर स्वयं विभाजन की रेखा खींची। पाण्डु के पुत्र भी उनके ही परिवार के थे, किन्तु स्वार्थ और मोह ने उनकी प्रज्ञा को अन्धा कर दिया था। यही संकीर्ण 'मेरा-तेरा' की भावना समस्त अधर्म और महाभारत का मूल कारण बनी।",
      en: "The Srimad Bhagavad Gita opens with the profound word 'Dharma' and concludes with 'Mama' (18.78), encapsulating 'Mama Dharma'—the eternal spiritual duty of the soul.\n\n1. **The Inner Metaphysical Allegory**: The battlefield of Kurukshetra represents the outer field of action (Karma), while the human psyche is the 'Dharmakshetra' where the perpetual struggle between noble virtues (Daivi Sampad) and egoistic impulses (Asuri Sampad) takes place.\n\n2. **The Root of Delusion (Dhritarashtra's Bias)**: By distinguishing between 'Mamakah' (my sons) and 'Pandavah' (Pandu's sons), Dhritarashtra displayed deep-seated tribalism and attachment. Blind to universal brotherhood, his ego-clinging set the stage for total cosmic catastrophe.",
      sa: "भगवद्गीतायाः प्रारम्भः 'धर्म' शब्देन भवति। कुरुक्षेत्रं कर्मभूमिः, मानवहृदयं च धर्मक्षेत्रम्। अत्र धृतराष्ट्रस्य स्वकीय-परकीय-भेदभावः अधर्मस्य मूलकारणम् आसीत्।",
      mr: "गीतेची सुरुवात 'धर्म' शब्दाने होते. मानवी मन हेच धर्मक्षेत्र आहे जिथे सद्गुण आणि दुर्गुणांचे युद्ध चालते. धृतराष्ट्राचा पक्षपातीपणाच सर्व विनाशाचे मूळ कारण ठरला.",
      gu: "ગીતાનો પ્રારંભ 'ધર્મ' શબ્દથી થાય છે. માનવ હૃદય જ ધર્મક્ષેત્ર છે. ધૃતરાષ્ટ્રનો 'મારું અને પારકું' નો ભેદભાવ જ સર્વ વિનાશનું મૂળ કારણ બન્યો.",
      bn: "গীতার সূচনা 'ধর্ম' শব্দে। মানব অন্তঃকরণই প্রকৃত ধর্মক্ষেত্র। ধৃতরাষ্ট্রের অন্ধ পক্ষপাতিত্বই মহাভারতের মূল কারণ ছিল।",
      ta: "கீதை 'தர்மம்' என்ற சொல்லுடன் தொடங்குகிறது. மனித இதயமே தர்மத்திற்கும் அதர்மத்திற்கும் இடையிலான போர்க்களமாகும்.",
      te: "గీత 'ధర్మ' శబ్దంతో ప్రారంభమవుతుంది. ధృతరాష్ట్రుని స్వార్థపూరిత పక్షపాతమే మహాభారత యుద్ధానికి మూలకారణం.",
    },
    practical_insight: {
      hinglish: "Daily Life Blueprint: Har decision lene se pehle apne man se poochhein — 'Kya main ye kaam lalach aur mere-tere ke chashme se kar raha hoon, ya sach aur sabke bhale ke liye (Dharma)?' Bias chhodte hi dimaag shant aur focus tezz ho jaata hai.",
      hi: "व्यावहारिक जीवन सूत्र: जीवन के प्रत्येक चौराहे पर निर्णय लेते समय अपने अंतर्मन से पूछें — 'क्या यह निर्णय मेरे संकीर्ण स्वार्थ और पक्षपात से प्रेरित है, अथवा यह निष्पक्ष धर्म और सत्य के अनुकूल है?' पक्षपात का त्याग करते ही बुद्धि में स्पष्टता और शांति आ जाती है।",
      en: "Daily Life Blueprint: In every personal and professional crossroad, ask yourself: 'Am I deciding out of egoistic bias and attachment, or out of objective duty and higher principles?' Transcending personal bias immediately unlocks clarity and unshakeable peace.",
      sa: "जीवने स्वार्थं त्यक्त्वा निष्पक्ष-धर्मस्य पालनेनैव मनसः शान्तिः सम्भवति।",
      mr: "कोणताही निर्णय घेताना स्वार्थ बाजूला ठेवून कर्तव्याला प्राधान्य द्या.",
      gu: "કોઈપણ નિર્ણય લેતી વખતે પક્ષપાત છોડીને ધર્મ અને કર્તવ્યને પ્રાથમિકતા આપો.",
      bn: "স্বার্থপরতা ত্যাগ করে সর্বদা ন্যায় ও কর্তব্যের পথ অনুসরণ করুন।",
      ta: "சுயநலத்தை விடுத்து தர்மத்தின் வழியில் முடிவுகளை எடுங்கள்.",
      te: "స్వార్థాన్ని విడనాడి ఎల్లప్పుడూ ధర్మబద్ధమైన మార్గాన్ని అనుసరించండి.",
    }
  },
  '2_47': {
    chapter: 2,
    verse: 47,
    devanagari: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन |\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि || २-४७ ||",
    iast: "karmaṇyevādhikāraste mā phaleṣu kadācana\nmā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi",
    word_anvaya: [
      {
        word: "कर्मणि",
        iast: "karmaṇi",
        dhatu: "kṛ",
        vibhakti: "Locative Singular (सप्तमी)",
        meaning: {
          hinglish: "Apna nirdharit kartavya karne me (in performing duty)",
          hi: "केवल अपने नियत कर्म (कर्तव्य) में",
          en: "in the performance of prescribed duty",
          sa: "कर्तव्यकर्मणि एव",
          mr: "फक्त आपले कर्तव्य करण्यात",
          gu: "માત્ર પોતાના કર્તવ્ય કર્મમાં",
          bn: "কেবলমাত্র কর্তব্য কর্মে",
          ta: "கடமையைச் செய்வதில் மட்டுமே",
          te: "నీ విధాయక కర్మల యందే",
        }
      },
      {
        word: "एव अधिकारः",
        iast: "eva adhikāraḥ",
        dhatu: "adhikṛ",
        vibhakti: "Nominative Singular",
        meaning: {
          hinglish: "Hi tumhara asli adhikar aur command hai",
          hi: "ही तुम्हारा वास्तविक सामर्थ्य और अधिकार है",
          en: "alone is your right and entitlement",
          sa: "तवैव अधिकारः",
          mr: "तुझा खरा अधिकार आहे",
          gu: "જ તારો અધિકાર છે",
          bn: "তোমার অধিকার",
          ta: "மட்டுமே உனக்கு உரிமை உண்டு",
          te: "నీకు అధికారం ఉన్నది",
        }
      },
      {
        word: "ते",
        iast: "te",
        dhatu: "yuṣmad",
        vibhakti: "Genitive Singular",
        meaning: {
          hinglish: "Tumhara (your)",
          hi: "तुम्हारा",
          en: "your",
          sa: "तव",
          mr: "तुझा",
          gu: "તારો",
          bn: "তোমার",
          ta: "உனது",
          te: "నీకు",
        }
      },
      {
        word: "मा फलेषु",
        iast: "mā phaleṣu",
        dhatu: "phala",
        vibhakti: "Locative Plural",
        meaning: {
          hinglish: "Result ya outcome ke phal me kabhi nahi",
          hi: "कर्मों के फलों में कभी नहीं",
          en: "never in the fruits or outcomes of action",
          sa: "फलेषु कदापि न",
          mr: "फळांमध्ये कधीही नाही",
          gu: "ફળોમાં ક્યારેય નહીં",
          bn: "কর্মফলে কখনো নহে",
          ta: "பலன்களில் ஒருபோதும் இல்லை",
          te: "ఫలముల యందు ఎన్నడూ లేదు",
        }
      },
      {
        word: "कदाचन",
        iast: "kadācana",
        dhatu: "-",
        vibhakti: "Avyaya (अव्यय)",
        meaning: {
          hinglish: "Kisi bhi halat ya time me",
          hi: "किसी भी काल या परिस्थिति में",
          en: "at any point in time",
          sa: "कदापि",
          mr: "केव्हाही",
          gu: "ક્યારેય પણ",
          bn: "কখনোই",
          ta: "எக்காலத்திலும்",
          te: "ఎన్నటికీ",
        }
      },
      {
        word: "मा कर्मफलहेतुः भूः",
        iast: "mā karmaphalahetur bhūḥ",
        dhatu: "bhū",
        vibhakti: "Imperative Verb",
        meaning: {
          hinglish: "Karm ke result ka karta khud ko mat maano",
          hi: "कर्मफल का कारण स्वयं को मत समझो (अहंकार मत करो)",
          en: "never consider yourself the sole cause of the results",
          sa: "फलस्य हेतुः मा भव",
          mr: "कर्माच्या फळाचा कर्ता स्वतःला मानू नकोस",
          gu: "કર્મના ફળનો હેતુ તું ન બન",
          bn: "কর্মফলের কারণ হইও না",
          ta: "செயலின் பலனுக்கு நீயே காரணம் என எண்ணாதே",
          te: "కర్మఫలానికి నీవే కారణమని భావించవద్దు",
        }
      },
      {
        word: "मा ते सङ्गः अस्तु",
        iast: "mā te saṅgo 'stu",
        dhatu: "sañj",
        vibhakti: "Verbal Phrase",
        meaning: {
          hinglish: "Aur na hi tumhari aalsi bankar baithe rehne me ruchi ho",
          hi: "और न ही तुम्हारी आसक्ति कर्म त्यागने में हो",
          en: "nor should you have any attachment to inaction",
          sa: "अकर्मणि तव आसक्तिः मा भवतु",
          mr: "आणि कर्म न करण्यात तुझी आसक्ती नसावी",
          gu: "અને અકર્મમાં તારી આસક્તિ ન થાય",
          bn: "অকর্মে তোমার আসক্তি না হউক",
          ta: "செயல் புரியாமல் இருப்பதிலும் பற்று கொள்ளாதே",
          te: "కర్మను త్యజించుట యందు కూడా నీకు ఆసక్తి ఉండరాదు",
        }
      },
      {
        word: "अकर्मणि",
        iast: "akarmaṇi",
        dhatu: "kṛ",
        vibhakti: "Locative Singular",
        meaning: {
          hinglish: "Kaam na karne ya laziness me",
          hi: "अकर्मण्यता अथवा आलस्य में",
          en: "in laziness, passivity, or renunciation of duty",
          sa: "कर्तव्यत्यागे",
          mr: "आळसात किंवा अकर्मात",
          gu: "આળસ કે કર્મના ત્યાગમાં",
          bn: "অকর্মে",
          ta: "சோம்பலில்",
          te: "కర్మలను విడనాడుటలో",
        }
      }
    ],
    translation: {
      hinglish: "Shri Krishna kahte hain: 'Tera poora adhikar sirf apne kartavya (action) ko nibhane me hai, uske result (fruits) par tera control kabhi nahi hai. Isiliye khud ko result ka sole controller mat maan, aur na hi result ke dar se kaam chhodkar aalsi bankar baitho!'",
      hi: "भगवान श्री कृष्ण कहते हैं: 'तुम्हारा अधिकार केवल निष्काम भाव से अपने कर्तव्य कर्म को करने में है, उसके फलों में कभी नहीं। अतः तुम कर्मफल के कर्ता मत बनो, और न ही कर्म से विमुख होकर अकर्मण्यता (आलस्य) में तुम्हारी आसक्ति हो।'",
      en: "Lord Krishna reveals: 'You have an absolute sovereign right only to perform your dedicated actions, but never a claim to the fruits thereof. Never consider yourself the ultimate cause of outcomes, nor let your mind gravitate toward inaction and laziness.'",
      sa: "भगवान् श्रीकृष्णः कथयति — कर्मणि एव तव अधिकारः वर्तते, फलेषु कदापि न। त्वं कर्मफलस्य कारणं मा भव, अकर्मणि च तव आसक्तिः मा भूत्।",
      mr: "श्रीकृष्ण सांगतात: 'तुझा अधिकार फक्त कर्म करण्यावर आहे, फळावर कधीही नाही. फळाचा हेतू ठेवून कर्म करू नकोस आणि कर्म न करण्यातही तुझी आसक्ती असू नये.'",
      gu: "શ્રીકૃષ્ણ કહે છે: 'તારો અધિકાર માત્ર કર્મ કરવામાં છે, ફળમાં ક્યારેય નહીં. કર્મફળનો હેતુ તું ન બન અને કર્મ ન કરવામાં તારી પ્રીતિ ન થાય.'",
      bn: "শ্রীকৃষ্ণ বলিতেছেন: 'কর্মে তোমার অধিকার আছে, কিন্তু ফলে কখনোই নহে। কর্মফলের হেতু হইও না এবং কর্মত্যাগেও যেন তোমার প্রবৃত্তি না হয়।'",
      ta: "ஸ்ரீகிருஷ்ணர் கூறுகிறார்: 'உனது கடமையைச் செய்வதில் மட்டுமே உனக்கு உரிமை உண்டு, அதன் பலனில் ஒருபோதும் இல்லை. பலனை எதிர்பார்த்து செயல்படாதே, சோம்பலிலும் விழாதே.'",
      te: "శ్రీకృష్ణుడు సెలవిచ్చెను: 'కర్మలను ఆచరించుట యందే నీకు అధికారము కలదు, వాని ఫలముల యందు ఎన్నడూ లేదు. కర్మఫలములకు నీవు కారణభూతుడవు కాకుము, అలాగని కర్మలు చేయకుండా ఉండుటకు కూడా మొగ్గు చూపవద్దు.'",
    },
    deep_bhashya: {
      hinglish: "Nishkama Karma Yoga ka ye universal golden formula hai. Is shloka me jeevan ke 4 maha-sidhant hain:\n\n1. **Karm par Poora Adhikar (Focus on Execution)**: Jab aap exam, job interview, coding ya business karte hain, toh present moment me 100% focus de sakte hain.\n\n2. **Phal par Zero Expectation (Freedom from Anxiety)**: Result 100 external factors par depend karta hai jo aapke control me nahi hain. Jab aap result ki chinta chhodte hain, toh Performance Anxiety 0 ho jaati hai aur Flow State activate hota hai.\n\n3. **Karta-Bhav ka Tyag (No Ego)**: Success aane par ghamand mat karo aur failure aane par depression me mat jao, kyunki aap sirf ek divine instrument (निमित्तमात्रम्) hain.\n\n4. **Akarma ka Nishedh (No Procrastination)**: Kuch log sochte hain ki jab result ka pata hi nahi toh kaam hi kyun karein? Bhagwan kahte hain aalsi banna sabse bada paap hai, kaam toh karna hi hoga par master artist ki tarah!",
      hi: "यह श्लोक निष्काम कर्मयोग का सर्वोत्कृष्ट सनातन महावाक्य है। आदि शंकराचार्य एवं रामानुजाचार्य के अनुसार इसमें जीवन के चार परम सत्य उद्घाटित हैं:\n\n१. **वर्तमान में कर्म की स्वतंत्रता**: जीवात्मा के वश में केवल वर्तमान क्षण का पुरुषार्थ है।\n\n२. **परिणामों से मानसिक मुक्ति**: कर्म का परिणाम देश, काल, प्रारब्ध और ईश्वरीय नियमों पर निर्भर करता है। परिणाम की आसक्ति ही चित्त में भय, संशय और व्याकुलता उत्पन्न करती है।\n\n३. **अहंकार-शून्यता**: सफलता मिलने पर अहंकार न करना और विफलता मिलने पर अवसाद में न जाना ही 'समत्वं योग उच्यते' है।\n\n४. **अकर्मण्यता का कठोर निषेध**: परिणाम की अनिश्चितता देखकर कर्म से पलायन करना तामसिक प्रमाद है। कर्म को ईश्वर की पूजा मानकर पूर्ण एकाग्रता से करना ही मोक्ष का मार्ग है।",
      en: "This is the cardinal master-stroke of the Bhagavad Gita's philosophy of Nishkama Karma Yoga. Shankara and Ramanuja elucidate four revolutionary psychological principles:\n\n1. **Process Mastery over Outcome Addiction**: Human agency exists solely in current execution. Outcome is an emergent phenomenon governed by thousands of macrocosmic variables.\n\n2. **Eradication of Performance Anxiety**: When consciousness ceases bargaining for future applause, the prefrontal cortex enters pure cognitive flow without anxiety.\n\n3. **Dissolution of Egoistic Authorship**: You are not the solitary engineer of destiny, but an instrument in the universal orchestration.\n\n4. **Absolute Refusal of Nihilism & Lethargy**: One must never mistake non-attachment for laziness. Action must be pursued with the pinnacle of artistic devotion and excellence.",
      sa: "निष्काम-कर्मयोगस्य अयम् परमः सिद्धान्तः। फलासक्तिं विहाय केवलं कर्तव्यभावेन कृतं कर्म चित्तशुद्धिं ददाति।",
      mr: "हा निष्काम कर्मयोगाचा महामंत्र आहे. फळाची चिंता न करता केलेले कर्म मनुष्याला सर्व प्रकारच्या चिंतेतून मुक्त करते.",
      gu: "આ નિષ્કામ કર્મયોગનું મહાસૂત્ર છે. પરિણામની ચિંતા છોડીને સંપૂર્ણ એકાગ્રતાથી કર્મ કરવું એ જ ખરી સાધના છે.",
      bn: "ইহা নিষ্কাম কর্মযোগের মূল তত্ত্ব। ফলাকাঙ্ক্ষা ত্যাগ করিয়া কর্তব্যে নিমগ্ন হইলেই আত্মিক মুক্তি লাভ হয়।",
      ta: "இது நிஷ்காம கர்ம யோகத்தின் மூல மந்திரம். பலனை எதிர்பாராமல் கடமையை ஆற்றுவதே மன அமைதிக்கு வழி.",
      te: "ఇది నిష్కామ కర్మయోగానికి పరమ సూత్రం. ఫలితాన్ని ఆశించకుండా కర్తవ్యాన్ని నిర్వహించడమే ఉత్తమ యోగం.",
    },
    practical_insight: {
      hinglish: "Daily Life Blueprint: Jab bhi padhai, gym, business ya coding karte waqt dimaag me 'Mera kya hoga? Failure ho gaya toh?' ka thought aaye, turant deep breath lein aur apna poora dhyan current task ki perfection par laga dein. Kaam ko pooja samajh kar karein!",
      hi: "व्यावहारिक जीवन सूत्र: जब भी परीक्षा, करियर अथवा व्यवसाय में विफलता का भय मन को विचलित करे, तब परिणाम की चिंता को ईश्वर को समर्पित करें और अपना १००% ध्यान वर्तमान कार्य की उत्कृष्टता पर केंद्रित करें। परिणाम स्वतः सर्वोत्तम होगा।",
      en: "Daily Life Blueprint: Whenever overthinking, career dread, or fear of failure grips your mind, consciously disconnect from the future result and invest 100% of your mental bandwidth into the craft of the current moment. Excellence is born when anxiety dies.",
      sa: "कर्मकाले भविष्यस्य चिन्तां त्यक्त्वा केवलं वर्तमान-कार्यस्य शुद्धौ मनो योजय।",
      mr: "कामाचा निकाल काय लागेल याची भीती सोडून सध्याच्या कामात १००% मन लावा.",
      gu: "પરિણામની ચિંતા છોડીને વર્તમાન કામમાં તમારું ૧૦૦% ધ્યાન કેન્દ્રિત કરો.",
      bn: "ভবিষ্যতের ভয় ত্যাগ করে বর্তমান কাজে সম্পূর্ণ নিমগ্ন হোন।",
      ta: "எதிர்கால பயத்தை விட்டுவிட்டு தற்போதைய செயலில் முழு கவனத்தையும் செலுத்துங்கள்.",
      te: "ఫలితాల గురించిన భయాన్ని వీడి వర్తమాన కర్తవ్యంపై పూర్తి దృష్టిని నిలపండి.",
    }
  }
};

export function getComprehensiveVerse(chapter: number, verse: number): ComprehensiveVerseTranslation | null {
  const key = `${chapter}_${verse}`;
  return CANONICAL_TRANSLATIONS[key] || null;
}
