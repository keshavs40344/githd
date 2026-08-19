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
  // ── CHAPTER 1: ARJUNA VISHADA YOGA ──────────────────────────────
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
        vibhakti: "Locative Singular",
        meaning: {
          hinglish: "Dharma ki pavitra bhoomi par",
          hi: "धर्मभूमि (पवित्र क्षेत्र) में",
          en: "in the sacred field of righteous duty",
          sa: "धर्मभूमावेव",
        }
      },
      {
        word: "कुरुक्षेत्रे",
        iast: "kurukṣetre",
        dhatu: "kuru",
        vibhakti: "Locative Singular",
        meaning: {
          hinglish: "Kurukshetra ke yuddha maidan me",
          hi: "कुरुक्षेत्र के ऐतिहासिक युद्धस्थल में",
          en: "in the battlefield of Kurukshetra",
          sa: "कुरुभूमौ",
        }
      },
      {
        word: "समवेताः",
        iast: "samavetāḥ",
        dhatu: "i",
        vibhakti: "Nominative Plural",
        meaning: {
          hinglish: "Ikattha hue (assembled)",
          hi: "एकत्रित हुए",
          en: "assembled together",
          sa: "समुपस्थिताः",
        }
      },
      {
        word: "युयुत्सवः",
        iast: "yuyutsavaḥ",
        dhatu: "yudh",
        vibhakti: "Nominative Plural",
        meaning: {
          hinglish: "Yuddha ladne ki ichha wale",
          hi: "युद्ध करने की तीव्र इच्छा वाले",
          en: "desirous of fighting",
          sa: "योद्धुमिच्छवः",
        }
      },
      {
        word: "मामकाः",
        iast: "māmakāḥ",
        dhatu: "mama",
        vibhakti: "Nominative Plural",
        meaning: {
          hinglish: "Mere putra (Kauravas)",
          hi: "मेरे पुत्र (दुर्योधन आदि)",
          en: "my sons",
          sa: "मम पुत्राः",
        }
      },
      {
        word: "पाण्डवाः",
        iast: "pāṇḍavāḥ",
        dhatu: "pāṇḍu",
        vibhakti: "Nominative Plural",
        meaning: {
          hinglish: "Pandu ke putra (Pandavas)",
          hi: "पाण्डु के पुत्र",
          en: "and the sons of Pandu",
          sa: "पाण्डोः सुताः",
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
        }
      },
      {
        word: "सञ्जय",
        iast: "sañjaya",
        dhatu: "ji",
        vibhakti: "Vocative Singular",
        meaning: {
          hinglish: "Hey Sanjaya!",
          hi: "हे संजय!",
          en: "O Sanjaya!",
          sa: "हे सञ्जय",
        }
      }
    ],
    translation: {
      hinglish: "Dhritarashtra ne poocha: 'Hey Sanjaya! Pavitra dharmakshetra Kurukshetra me yuddha ki ichha se ikattha hue mere beton aur Pandu ke beton ne aakhir kya kiya?'",
      hi: "धृतराष्ट्र ने पूछा: 'हे संजय! धर्मभूमि कुरुक्षेत्र में युद्ध की इच्छा से एकत्रित हुए मेरे पुत्रों और पाण्डु के पुत्रों ने वहाँ क्या किया?'",
      en: "Dhritarashtra inquired: 'O Sanjaya, assembled on the holy field of Kurukshetra with desire for battle, what did my sons and the sons of Pandu do?'",
      sa: "धृतराष्ट्रः सञ्जयं पृष्टवान् — हे सञ्जय! धर्मक्षेत्रे कुरुक्षेत्रे योद्धुमिच्छवः मदीयाः पुत्राः पाण्डोश्च सुताः किं कृतवन्तः?",
    },
    deep_bhashya: {
      hinglish: "1. **Dharmakshetra vs Kurukshetra**: Ye sansaar hamara Karma-kshetra hai aur hamara antakaran Dharmakshetra hai jahan roz sadguna aur durguna aapas me ladte hain.\n\n2. **Dhritarashtra ka Moh**: 'Mamakah' (Mere) aur 'Pandavah' (Unke) kehkar Dhritarashtra ne pakshpaat kiya jo saare aniti ki jad hai.",
      hi: "१. **आध्यात्मिक रहस्य**: मानव अन्तःकरण ही धर्मक्षेत्र है जहाँ सद्गुणों और दुर्गुणों का नित्य संघर्ष चलता रहता है।\n\n२. **धृतराष्ट्र का मानसिक पक्षपात**: 'मामकाः' और 'पाण्डवाः' में भेद करने की संकीर्ण वृत्ति ही समस्त महाभारत और अधर्म का मूल कारण बनी।",
      en: "1. **The Inner Battle**: The human psyche is the sacred Dharmakshetra where virtues and egoistic impulses perpetually clash.\n\n2. **The Root of Illusion**: Dhritarashtra's divisive attachment between 'mine' and 'theirs' sparked cosmic destruction.",
    },
    practical_insight: {
      hinglish: "Har decision lene se pehle apne man se poochhein ki kya ye decision mere bias aur lalach se chal raha hai ya nishpaksh sachhai (Dharma) se.",
      hi: "निर्णय लेते समय संकीर्ण स्वार्थ और पक्षपात का त्याग करें; निष्पक्ष सत्य ही स्थायी विजय दिलाता है।",
      en: "Before making crucial choices, eliminate personal bias. Objective duty (Dharma) always yields unshakeable triumph.",
    }
  },

  // ── CHAPTER 2: SANKHYA YOGA ─────────────────────────────────────
  '2_20': {
    chapter: 2,
    verse: 20,
    devanagari: "न जायते म्रियते वा कदाचि-\nन्नायं भूत्वा भविता वा न भूयः |\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे || २-२० ||",
    iast: "na jāyate mriyate vā kadācin\nnāyaṁ bhūtvā bhavitā vā na bhūyaḥ\najo nityaḥ śāśvato'yaṁ purāṇo\nna hanyate hanyamāne śarīre",
    word_anvaya: [
      { word: "न जायते", iast: "na jāyate", meaning: { hinglish: "Na kabhi paida hoti hai (never born)", hi: "न तो कभी जन्म लेती है", en: "is never born" } },
      { word: "न म्रियते", iast: "na mriyate", meaning: { hinglish: "Na kabhi marti hai (never dies)", hi: "न कभी मरती है", en: "nor does it ever die" } },
      { word: "अजः", iast: "ajaḥ", meaning: { hinglish: "Janma-rahit (unborn)", hi: "अजन्मा", en: "unborn" } },
      { word: "नित्यः", iast: "nityaḥ", meaning: { hinglish: "Sada rehne wali (eternal)", hi: "सदा रहने वाली", en: "eternal" } },
      { word: "शाश्वतः", iast: "śāśvataḥ", meaning: { hinglish: "Sanatan timeless", hi: "सनातन और क्षय-रहित", en: "everlasting" } },
      { word: "न हन्यते", iast: "na hanyate", meaning: { hinglish: "Maree nahi jaati (not destroyed)", hi: "नष्ट नहीं होती", en: "is not slain" } },
      { word: "शरीरे", iast: "śarīre", meaning: { hinglish: "Shareer ke nasht hone par bhi", hi: "शरीर के नष्ट होने पर भी", en: "when body is slain" } }
    ],
    translation: {
      hinglish: "Atma ka na kabhi janma hota hai aur na kabhi mrityu. Ye ajnama, nitya, shashwat aur puratan hai. Shareer ke nasht hone par bhi atma kabhi nasht nahi hoti.",
      hi: "यह आत्मा न तो किसी काल में जन्म लेती है और न मरती है। यह अजन्मा, नित्य, सनातन और पुरातन है। शरीर के नष्ट होने पर भी आत्मा का नाश नहीं होता।",
      en: "The soul is never born, nor does it ever die. It is unborn, eternal, everlasting, and primeval. It is not destroyed when the physical body is destroyed.",
    },
    deep_bhashya: {
      hinglish: "1. **Shankaracharya Advaita**: Atma poori tarah se avikari (immutable) hai. Shareer badalta hai, par chetna (pure consciousness) amar hai.\n\n2. **Fear of Death**: Jab manushya ko pata chalta hai ki uski asli pehchan shareer nahi balki amar chetna hai, toh saara existential fear aur anxiety khatam ho jata hai.",
      hi: "आदि शंकराचार्य के अनुसार आत्मा में षड्भावविकार (जन्म, स्थिति, वृद्धि, विपरिणाम, अपक्षय और विनाश) नहीं होते। देह परिवर्तनशील वस्त्र मात्र है।",
      en: "Consciousness is primordial and indestructible. Realizing your immortal essence dissolves all mortal anxiety and psychological dread.",
    },
    practical_insight: {
      hinglish: "Jab bhi jeevan me nuksan, bimari ya loss ka darr sataye, toh yaad rakhein: Aapki core potential aur spirit ko koi external situation khatam nahi kar sakti!",
      hi: "जीवन के परिवर्तनों और हानियों से भयभीत न हों; आपकी आंतरिक शक्ति और चैतन्य शाश्वत और अपराजित है।",
      en: "Do not let temporary setbacks shake your spirit. Your inner consciousness is invulnerable and eternally undefeated.",
    }
  },

  '2_47': {
    chapter: 2,
    verse: 47,
    devanagari: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन |\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि || २-४७ ||",
    iast: "karmaṇyevādhikāraste mā phaleṣu kadācana\nmā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi",
    word_anvaya: [
      { word: "कर्मणि", iast: "karmaṇi", meaning: { hinglish: "Apne kartavya karma me", hi: "कर्तव्य कर्म में", en: "in prescribed action" } },
      { word: "एव अधिकारः", iast: "eva adhikāraḥ", meaning: { hinglish: "Hi tera poora command hai", hi: "ही तुम्हारा अधिकार है", en: "alone is your entitlement" } },
      { word: "मा फलेषु", iast: "mā phaleṣu", meaning: { hinglish: "Result ke phal me kabhi nahi", hi: "फलों में कभी नहीं", en: "never in fruits of action" } },
      { word: "मा ते सङ्गोऽस्तु", iast: "mā te saṅgo 'stu", meaning: { hinglish: "Aur na aalsi bankar baithe rehne me", hi: "न अकर्मण्यता में आसक्ति हो", en: "nor attached to inaction" } }
    ],
    translation: {
      hinglish: "Tera adhikar sirf apne karma ko nibhane me hai, uske phal par tera control nahi hai. Isiliye khud ko result ka karta mat maan aur na hi aalsi ban!",
      hi: "तुम्हारा अधिकार केवल निष्काम भाव से कर्म करने में है, उसके फलों में कभी नहीं। अतः कर्मफल के कर्ता मत बनो और न ही अकर्मण्यता में तुम्हारी आसक्ति हो।",
      en: "You have a right only to perform your prescribed duty, but never to its fruits. Never consider yourself the cause of results, nor be attached to inaction.",
    },
    deep_bhashya: {
      hinglish: "Nishkama Karma Yoga ka supreme formula: Present execution me 100% involve hona aur future outcomes se mental detachment rakhna hi peak performance aur mental peace ka rahasya hai.",
      hi: "वर्तमान क्षण में पूर्ण एकाग्रता और भविष्य के परिणामों से अनासक्ति ही चित्तशुद्धि और मोक्ष का द्वार है।",
      en: "Mastering the process while surrendering attachment to outcomes completely eradicates performance anxiety and activates flow state.",
    },
    practical_insight: {
      hinglish: "Jab bhi exam, business ya coding karte waqt fear aaye, focus turant current task ki quality par shift kar dein.",
      hi: "परिणाम की चिंता छोड़कर वर्तमान कार्य की गुणवत्ता पर १००% ध्यान दें; सफलता स्वतः प्राप्त होगी।",
      en: "Focus entirely on the quality of execution in the present moment; outcomes will naturally take care of themselves.",
    }
  },

  // ── CHAPTER 3: KARMA YOGA ───────────────────────────────────────
  '3_21': {
    chapter: 3,
    verse: 21,
    devanagari: "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः |\nस यत्प्रमाणं कुरुते लोकस्तदनुवर्तते || ३-२१ ||",
    iast: "yadyadācarati śreṣṭhastattadevetaro janaḥ\nsa yatpramāṇaṁ kurute lokastadanuvartate",
    word_anvaya: [
      { word: "यत् यत्", iast: "yat yat", meaning: { hinglish: "Jo jo aacharan (whatever conduct)", hi: "जो जो आचरण", en: "whatever action" } },
      { word: "आचरति", iast: "ācarati", meaning: { hinglish: "Karta hai (performs)", hi: "करता है", en: "performs" } },
      { word: "श्रेष्ठः", iast: "śreṣṭhaḥ", meaning: { hinglish: "Mahaan aur shreshtha vyakti (a noble leader)", hi: "श्रेष्ठ पुरुष / आदर्श नेता", en: "a noble leader / great person" } },
      { word: "तत् तत् एव", iast: "tat tat eva", meaning: { hinglish: "Wahi wahi kaam (that very thing)", hi: "वैसा ही", en: "that very action" } },
      { word: "इतरः जनः", iast: "itaraḥ janaḥ", meaning: { hinglish: "Baaki aam log (common people)", hi: "अन्य साधारण जन", en: "common people" } },
      { word: "सः यत् प्रमाणं कुरुते", iast: "sa yat pramāṇaṁ kurute", meaning: { hinglish: "Wo jo benchmark set karta hai", hi: "वह जो आदर्श स्थापित करता है", en: "whatever standard he sets" } },
      { word: "लोकः तत् अनुवर्तते", iast: "lokaḥ tat anuvartate", meaning: { hinglish: "Poora sansaar use follow karta hai", hi: "संसार उसका अनुसरण करता है", en: "the world follows that" } }
    ],
    translation: {
      hinglish: "Ek shreshtha aur mahaan vyakti jaisa aacharan karta hai, baaki samaaj bhi waisa hi karta hai. Wo jo standard set karta hai, poori duniya use follow karti hai.",
      hi: "श्रेष्ठ पुरुष जैसा आचरण करता है, अन्य लोग भी वैसा ही आचरण करते हैं। वह जो प्रमाण या आदर्श प्रस्तुत करता है, समस्त संसार उसी का अनुसरण करता है।",
      en: "Whatever actions a great person performs, common men follow. Whatever standard of character they set by exemplary acts, all the world pursues.",
    },
    deep_bhashya: {
      hinglish: "Leadership by Example: Bhashan dene se log nahi badalte, aapke khud ke conduct aur integrity se log inspire hote hain. Shri Krishna kahte hain ki har leader ko samaaj ke samne ek pure standard set karna chahiye.",
      hi: "आदर्श नेतृत्व का सनातन सूत्र: उपदेश से नहीं, अपितु चरित्र और निष्कलंक कर्म से समाज का मार्गदर्शन होता है।",
      en: "The supreme rule of leadership: Influence is not wielded through words, but forged through personal integrity, ethics, and exemplary conduct.",
    },
    practical_insight: {
      hinglish: "Apni family, team ya company me leader banna hai toh pehle khud un rules aur discipline ko follow karein jo aap doosron se chahte hain.",
      hi: "यदि आप दूसरों को प्रेरित करना चाहते हैं, तो पहले स्वयं अनुशासित और सत्यनिष्ठ बनें; आपका आचरण ही आपका सबसे बड़ा संदेश है।",
      en: "Lead by example. Embody the highest standards of discipline and integrity you wish to see in your team and society.",
    }
  },

  // ── CHAPTER 4: JNANA KARMA SANNYASA YOGA ─────────────────────────
  '4_7': {
    chapter: 4,
    verse: 7,
    devanagari: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत |\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् || ४-७ ||",
    iast: "yadā yadā hi dharmasya glānirbhavati bhārata\nabhyutthānamadharmasya tadātmānaṁ sṛjāmyaham",
    word_anvaya: [
      { word: "यदा यदा", iast: "yadā yadā", meaning: { hinglish: "Jab jab bhi", hi: "जब जब भी", en: "whenever and wherever" } },
      { word: "धर्मस्य ग्लानिः", iast: "dharmasya glāniḥ", meaning: { hinglish: "Dharma ki haani hoti hai", hi: "धर्म की हानि / पतन होता है", en: "decline of righteousness" } },
      { word: "अभ्युत्थानम् अधर्मस्य", iast: "abhyutthānam adharmasya", meaning: { hinglish: "Aur adharma badhta hai", hi: "और अधर्म की वृद्धि होती है", en: "predominance of unrighteousness" } },
      { word: "तदा आत्मानं सृजामि अहम्", iast: "tadā ātmānaṁ sṛjāmi aham", meaning: { hinglish: "Tab tab main prakat hota hoon", hi: "तब तब मैं स्वयं को प्रकट करता हूँ", en: "at that time I manifest Myself" } }
    ],
    translation: {
      hinglish: "Shri Krishna kahte hain: 'Hey Bharat! Jab jab bhi dharma ki haani hoti hai aur adharma ka bolbala badhta hai, tab tab main dharma ki sthapna ke liye prakat hota hoon.'",
      hi: "भगवान श्री कृष्ण कहते हैं: 'हे भारत (अर्जुन)! जब-जब धर्म की हानि होती है और अधर्म का उत्थान होता है, तब-तब मैं धर्म की रक्षा के लिए स्वयं को साकार रूप में प्रकट करता हूँ।'",
      en: "Lord Krishna declares: 'Whenever and wherever there is a decline in righteousness and a predominant rise of unrighteousness, at that time I descend and manifest Myself.'",
    },
    deep_bhashya: {
      hinglish: "Avatara Rahasya: Ishwar ka prakatya sirf yuddha ke liye nahi, balki cosmic balance, satya ki sthapna aur bhakton ke hriday me divya chetna jagane ke liye hota hai.",
      hi: "ईश्वरीय अवतार का परम उद्देश्य ब्रह्माण्डीय सन्तुलन और धर्म की पुनर्प्रतिष्ठा करना है ताकि सत्य की सदैव विजय हो।",
      en: "The divine principle of incarnation: The cosmic intelligence rebalances the universe whenever moral order collapses, ensuring truth prevails.",
    },
    practical_insight: {
      hinglish: "Jab bhi aapke aas paas negativity ya adharma badhe, toh nirash mat hoiye. Apne andar ke Krishna (Viveka & Dharma) ko jagaiye aur satya ke saath khade rahiye.",
      hi: "अधर्म और असत्य के आगे कभी न झुकें; अपने भीतर के विवेक को जागृत कर सत्य और धर्म के पक्ष में दृढ़ रहें।",
      en: "Never succumb to widespread negativity or corruption. Awaken your inner spiritual conscience and firmly uphold truth.",
    }
  },

  // ── CHAPTER 9: RAJA VIDYA RAJA GUHYA YOGA ───────────────────────
  '9_22': {
    chapter: 9,
    verse: 22,
    devanagari: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते |\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् || ९-२२ ||",
    iast: "ananyāścintayanto māṁ ye janāḥ paryupāsate\nteṣāṁ nityābhiyuktānāṁ yogakṣemaṁ vahāmyaham",
    word_anvaya: [
      { word: "अनन्याः", iast: "ananyāḥ", meaning: { hinglish: "Bina kisi doosre sahare ke (unwavering)", hi: "अनन्य भाव से", en: "with undivided devotion" } },
      { word: "चिन्तयन्तः माम्", iast: "cintayantaḥ mām", meaning: { hinglish: "Mera dhyan karte hue", hi: "मेरा चिन्तन करते हुए", en: "meditating upon Me" } },
      { word: "तेषाम्", iast: "teṣām", meaning: { hinglish: "Un nitya jude hue bhakton ka", hi: "उन नित्य युक्त भक्तों का", en: "for those always absorbed in Me" } },
      { word: "योगक्षेमम्", iast: "yogakṣemam", meaning: { hinglish: "Jo nahi hai wo dena (Yoga) aur jo hai uski raksha karna (Kshema)", hi: "अप्राप्त की प्राप्ति और प्राप्त की रक्षा", en: "supply what they lack and preserve what they have" } },
      { word: "वहामि अहम्", iast: "vahāmi aham", meaning: { hinglish: "Main khud uthata hoon", hi: "मैं स्वयं वहन करता हूँ", en: "I personally carry / maintain" } }
    ],
    translation: {
      hinglish: "Jo ananya bhav se sirf mera dhyan karte hain aur nishkam bhav se pooja karte hain, unke jeevan ki saari zarooraton (Yoga-Kshema) ki poori responsibility main khud uthata hoon!",
      hi: "जो अनन्य भक्त केवल मेरा ही चिन्तन करते हुए निष्काम भाव से मेरी उपासना करते हैं, उन नित्य युक्त भक्तों के योग-क्षेम (जो वस्तु उनके पास नहीं है उसे सुलभ कराना और जो है उसकी रक्षा करना) का दायित्व मैं स्वयं वहन करता हूँ।",
      en: "To those who always worship Me with exclusive devotion, meditating on My transcendental form, to them I carry what they lack, and I preserve what they have.",
    },
    deep_bhashya: {
      hinglish: "Ye Gita ka sabse bada divine security guarantee hai: 'Yoga' ka matlab jo shubh cheez aapke paas nahi hai wo Bhagwan pradaan karte hain, aur 'Kshema' ka matlab jo satya aapke paas hai uski raksha karte hain.",
      hi: "यह भगवान का परम अभयदान है। जब साधक का समर्पण पूर्ण होता है, तब प्रकृति और ईश्वर उसकी समस्त आध्यात्मिक व भौतिक आवश्यकताओं की रक्षा करते हैं।",
      en: "The supreme covenant of divine grace: Complete surrender evokes total universal support, providing both spiritual elevation and material security.",
    },
    practical_insight: {
      hinglish: "Anxiety chhodkar apne kartavya aur bhakti me lag jao. Ishwar par bharosa rakho, aapki har zaroorat sahi samay par poori hogi.",
      hi: "भविष्य की असुरक्षा और चिंताओं को प्रभु को समर्पित करें; निष्काम भाव से कर्म करने वाले की रक्षा स्वयं परमात्मा करते हैं।",
      en: "Surrender your deep-seated scarcity mindset to the divine. Devoted, honest effort is always protected by cosmic intelligence.",
    }
  },

  // ── CHAPTER 18: MOKSHA SANNYASA YOGA ────────────────────────────
  '18_66': {
    chapter: 18,
    verse: 66,
    devanagari: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज |\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः || १८-६६ ||",
    iast: "sarvadharmānparityajya māmekaṁ śaraṇaṁ vraja\nahaṁ tvāṁ sarvapāpebhyo mokṣayiṣyāmi mā śucaḥ",
    word_anvaya: [
      { word: "सर्वधर्मान् परित्यज्य", iast: "sarvadharmān parityajya", meaning: { hinglish: "Saare baahri dharmo aur obligations ko chhodkar", hi: "समस्त सांसारिक धर्मों व चिंताओं को त्यागकर", en: "abandoning all varieties of dharmas and anxieties" } },
      { word: "माम् एकं शरणं व्रज", iast: "mām ekaṁ śaraṇaṁ vraja", meaning: { hinglish: "Sirf meri sharan me aa jao", hi: "केवल मेरी ही अनन्य शरण में आ जाओ", en: "surrender unto Me alone" } },
      { word: "अहं त्वां सर्वपापेभ्यः", iast: "ahaṁ tvāṁ sarvapāpebhyaḥ", meaning: { hinglish: "Main tujhe sabhi paapon se", hi: "मैं तुम्हें समस्त पापों व बन्धनों से", en: "I shall deliver you from all sins" } },
      { word: "मोक्षयिष्यामि", iast: "mokṣayiṣyāmi", meaning: { hinglish: "Mukti pradaan karoonga", hi: "मुक्त कर दूँगा", en: "will liberate you" } },
      { word: "मा शुचः", iast: "mā śucaḥ", meaning: { hinglish: "Chinta mat kar (Do not grieve)", hi: "शोक मत करो", en: "do not grieve" } }
    ],
    translation: {
      hinglish: "Shri Krishna ka ultimate charama shloka: 'Saare bhedbhaav aur chintaon ko chhodkar sirf meri sharan me aa ja. Main tujhe saare paapon aur dukhon se mukt kar doonga, bilkul chinta mat kar!'",
      hi: "सम्पूर्ण गीता का चरम महावाक्य: 'समस्त सांसारिक धर्मों और संशयों को त्यागकर केवल मेरी ही शरण में आ जाओ। मैं तुम्हें समस्त पापों और बन्धनों से मुक्त कर दूँगा, तुम शोक मत करो।'",
      en: "The ultimate climax of the Bhagavad Gita: 'Abandon all varieties of worldly dogmas and surrender unto Me alone. I shall deliver you from all sins and bondages. Do not grieve.'",
    },
    deep_bhashya: {
      hinglish: "Sharanagati (Absolute Surrender): Jab vyakti apna saara ahankaar aur burden Ishwar ko saump deta hai, tab wo param shanti aur moksha ko prapt hota hai.",
      hi: "श्रीमद्भगवद्गीता का यह चरम श्लोक शरणागति का सर्वोच्च रहस्य है। अहंकार का विसर्जन ही मोक्ष का साक्षात् मार्ग है।",
      en: "The zenith of the Gita's philosophy: Complete surrender of ego into the divine will unlocks ultimate liberation and bliss.",
    },
    practical_insight: {
      hinglish: "Jab jeevan me bojh aur problems control se bahar lagein, toh apna 100% prayas karke outcome ko Ishwar ke haath me chhod dein. Chinta karna band karein!",
      hi: "जब जीवन की परिस्थितियाँ अत्यंत कठिन लगें, तब अपना सर्वश्रेष्ठ प्रयास करके परिणाम को परमात्मा को सौंप दें और निश्चिन्त रहें।",
      en: "When burdens feel overwhelming, execute with pure heart and entrust the rest to God. Live with unshakeable peace.",
    }
  },

  '18_78': {
    chapter: 18,
    verse: 78,
    devanagari: "यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः |\nतत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम || १८-७८ ||",
    iast: "yatra yogeśvaraḥ kṛṣṇo yatra pārtho dhanurdharaḥ\ntatra śrīrvijayo bhūtirdhruvā nītirmatirmama",
    word_anvaya: [
      { word: "यत्र योगेश्वरः कृष्णः", iast: "yatra yogeśvaraḥ kṛṣṇaḥ", meaning: { hinglish: "Jahan Yogeshwar Shri Krishna hain", hi: "जहाँ योगेश्वर श्री कृष्ण हैं", en: "wherever there is Krishna, the Lord of Yoga" } },
      { word: "यत्र पार्थः धनुर्धरः", iast: "yatra pārtho dhanurdharaḥ", meaning: { hinglish: "Jahan dhanurdhari Arjuna hai", hi: "और जहाँ गाण्डीवधारी धनुर्धर अर्जुन है", en: "and wherever there is Arjuna, the supreme archer" } },
      { word: "तत्र श्रीः विजयः", iast: "tatra śrīḥ vijayaḥ", meaning: { hinglish: "Wahin shree, vijay aur aishwarya hai", hi: "वहीं परम ऐश्वर्य, निश्चित विजय और नीति है", en: "there will certainly be opulence, victory, and morality" } }
    ],
    translation: {
      hinglish: "Sanjaya kehta hai: 'Jahan Yogeshwar Shri Krishna hain aur jahan dhanurdhari Arjuna hai, wahin par nishchit roop se anant Lakshmi, Vijay, Vibhuti aur Niti hai!'",
      hi: "संजय कहते हैं: 'जहाँ योगेश्वर श्री कृष्ण हैं और जहाँ धनुर्धारी अर्जुन हैं, वहीं पर परम ऐश्वर्य, निश्चित विजय, विभूति और अचल नीति है — यह मेरा दृढ़ मत है।'",
      en: "Sanjaya concludes: 'Wherever there is Krishna, the Master of Yoga, and wherever there is Arjuna, the supreme archer, there will certainly be supreme opulence, victory, extraordinary power, and righteousness.'",
    },
    deep_bhashya: {
      hinglish: "Gita ka Maha-Sanket: Jab Ishwariya Kripa (Yogeshwar Krishna) aur Manushya ka Purushartha (Dhanurdhar Arjuna) ek saath milte hain, tab Vijay nishchit aur atal hoti hai!",
      hi: "दैवी कृपा और मानवीय पुरुषार्थ का समन्वय ही जीवन में अनन्त विजय और समृद्धि का सूत्र है।",
      en: "The grand synthesis of the Gita: When divine grace (Krishna) combines with relentless human effort (Arjuna), victory is cosmic and absolute.",
    },
    practical_insight: {
      hinglish: "Apni mehnat aur skill par 100% dhyan dein (Arjuna banein) aur antaratma ke viveka ko guide banayein (Krishna se judein) — har yuddha me jeet aapki hogi!",
      hi: "अपने पुरुषार्थ को १००% समर्पित करें और विवेक को मार्गदर्शक बनाएं; सफलता निश्चित होगी।",
      en: "Align dedicated relentless hard work with spiritual wisdom; eternal victory will be yours in every battlefield of life.",
    }
  }
};

export function getComprehensiveVerse(chapter: number, verse: number): ComprehensiveVerseTranslation | null {
  const key = `${chapter}_${verse}`;
  return CANONICAL_TRANSLATIONS[key] || null;
}
