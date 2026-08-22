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
      { word: "धर्मक्षेत्रे", iast: "dharmakṣetre", dhatu: "kṣetra", vibhakti: "Locative Singular", meaning: { hinglish: "Dharma ki pavitra bhoomi par", hi: "धर्मभूमि (पवित्र क्षेत्र) में", en: "in the sacred field of righteous duty" } },
      { word: "कुरुक्षेत्रे", iast: "kurukṣetre", dhatu: "kuru", vibhakti: "Locative Singular", meaning: { hinglish: "Kurukshetra ke yuddha maidan me", hi: "कुरुक्षेत्र के ऐतिहासिक युद्धस्थल में", en: "in the battlefield of Kurukshetra" } },
      { word: "समवेताः", iast: "samavetāḥ", dhatu: "i", vibhakti: "Nominative Plural", meaning: { hinglish: "Ikattha hue (assembled)", hi: "एकत्रित हुए", en: "assembled together" } },
      { word: "युयुत्सवः", iast: "yuyutsavaḥ", dhatu: "yudh", vibhakti: "Nominative Plural", meaning: { hinglish: "Yuddha ladne ki ichha wale", hi: "युद्ध करने की तीव्र इच्छा वाले", en: "desirous of fighting" } },
      { word: "मामकाः", iast: "māmakāḥ", dhatu: "mama", vibhakti: "Nominative Plural", meaning: { hinglish: "Mere putra (Kauravas)", hi: "मेरे पुत्र (दुर्योधन आदि)", en: "my sons" } },
      { word: "पाण्डवाः", iast: "pāṇḍavāḥ", dhatu: "pāṇḍu", vibhakti: "Nominative Plural", meaning: { hinglish: "Pandu ke putra (Pandavas)", hi: "पाण्डु के पुत्र", en: "and the sons of Pandu" } },
      { word: "किम् अकुर्वत", iast: "kim akurvata", dhatu: "kṛ", vibhakti: "Verb 3rd Plural Past", meaning: { hinglish: "Unhone kya kiya?", hi: "उन्होंने क्या किया?", en: "what did they do?" } },
      { word: "सञ्जय", iast: "sañjaya", dhatu: "ji", vibhakti: "Vocative Singular", meaning: { hinglish: "Hey Sanjaya!", hi: "हे संजय!", en: "O Sanjaya!" } }
    ],
    translation: {
      hinglish: "Dhritarashtra ne poocha: 'Hey Sanjaya! Pavitra dharmakshetra Kurukshetra me yuddha ki ichha se ikattha hue mere beton aur Pandu ke beton ne aakhir kya kiya?'",
      hi: "धृतराष्ट्र ने पूछा: 'हे संजय! धर्मभूमि कुरुक्षेत्र में युद्ध की इच्छा से एकत्रित हुए मेरे पुत्रों और पाण्डु के पुत्रों ने वहाँ क्या किया?'",
      en: "Dhritarashtra inquired: 'O Sanjaya, assembled on the holy field of Kurukshetra with desire for battle, what did my sons and the sons of Pandu do?'",
    },
    deep_bhashya: {
      hinglish: "१. **प्रसंग एवं ऐतिहासिक पृष्ठभूमि**:\nश्रीमद्भगवद्गीता का यह प्रथम श्लोक सम्पूर्ण महाभारत के दार्शनिक द्वन्द्व का बीज मन्त्र है। हस्तिनापुर के राजमहल में नेत्रहीन धृतराष्ट्र अपने दिव्य-दृष्टि प्राप्त मन्त्री संजय से कुरुक्षेत्र के समरांगण का हाल पूछते हैं। धृतराष्ट्र का अन्धत्व केवल शारीरिक नहीं, अपितु मोह और संकीर्ण ममता का प्रतीक है।\n\n२. **दार्शनिक तत्त्व मीमांसा (Dharmakshetra vs Kurukshetra)**:\nमानव शरीर ही कुरुक्षेत्र (कर्म की भूमि) है और मानव अन्तःकरण ही धर्मक्षेत्र (न्याय एवं विवेक की भूमि) है। 'मामकाः' (मेरे पुत्र) और 'पाण्डवाः' (पाण्डु के पुत्र) में भेद करके धृतराष्ट्र ने उसी अविद्या और द्वैत को जन्म दिया जो संसार के समस्त अधर्म और विनाश का मूल कारण है।\n\n३. **आदि शंकराचार्य एवं रामानुजाचार्य दृष्टि**:\nशंकराचार्य स्पष्ट करते हैं कि जहाँ धर्म का क्षेत्र होता है, वहाँ अधर्म कभी स्थायी नहीं हो सकता। रामानुजाचार्य के अनुसार जो ईश्वर के शरणागत हैं (पाण्डव), विजय उन्हीं की सुनिश्चित है।\n\n४. **मनोवैज्ञानिक विश्लेषण एवं रूपांतरण**:\nजब मनुष्य अपने जीवन में 'मेरा' और 'तेरा' के संकीर्ण स्वार्थ में फँस जाता है, तब उसका विवेक नष्ट हो जाता है। यह श्लोक हमें आत्म-निरीक्षण करने की प्रेरणा देता है कि हमारे भीतर के सद्गुण (पाण्डव) और दुर्गुण (कौरव) में कौन विजयी हो रहा है।",
      hi: "१. **प्रसंग एवं ऐतिहासिक पृष्ठभूमि**:\nश्रीमद्भगवद्गीता का यह प्रथम श्लोक सम्पूर्ण महाभारत के दार्शनिक द्वन्द्व का बीज मन्त्र है। हस्तिनापुर के राजमहल में नेत्रहीन धृतराष्ट्र अपने दिव्य-दृष्टि प्राप्त मन्त्री संजय से कुरुक्षेत्र के समरांगण का हाल पूछते हैं। धृतराष्ट्र का अन्धत्व केवल शारीरिक नहीं, अपितु मोह और संकीर्ण ममता का प्रतीक है।\n\n२. **दार्शनिक तत्त्व मीमांसा (धर्मक्षेत्र बनाम कुरुक्षेत्र)**:\nमानव शरीर ही कुरुक्षेत्र (कर्म की भूमि) है और मानव अन्तःकरण ही धर्मक्षेत्र (न्याय एवं विवेक की भूमि) है। 'मामकाः' और 'पाण्डवाः' में भेद करके धृतराष्ट्र ने उसी अविद्या और द्वैत को जन्म दिया जो संसार के समस्त अधर्म और विनाश का मूल कारण है।\n\n३. **आदि शंकराचार्य एवं रामानुजाचार्य दृष्टि**:\nशंकराचार्य स्पष्ट करते हैं कि जहाँ धर्म का क्षेत्र होता है, वहाँ अधर्म कभी स्थायी नहीं हो सकता। रामानुजाचार्य के अनुसार जो ईश्वर के शरणागत हैं (पाण्डव), विजय उन्हीं की सुनिश्चित है।\n\n४. **मनोवैज्ञानिक विश्लेषण एवं रूपांतरण**:\nजब मनुष्य अपने जीवन में 'मेरा' और 'तेरा' के संकीर्ण स्वार्थ में फँस जाता है, तब उसका विवेक नष्ट हो जाता है। यह श्लोक हमें आत्म-निरीक्षण करने की प्रेरणा देता है कि हमारे भीतर के सद्गुण और दुर्गुण में कौन विजयी हो रहा है।",
      en: "1. **Historical & Contextual Setting**:\nThis opening verse establishes the grand metaphysical stage of the Bhagavad Gita. King Dhritarashtra, physically and spiritually blind, inquires from Sanjaya about the impending clash. His blindness symbolizes the clouded intellect attached to personal lineage over universal righteousness.\n\n2. **Metaphysical Symbolism (The Dual Fields)**:\nThe human body is Kurukshetra (the realm of action), and the conscious psyche is Dharmakshetra (the realm of truth). By bifurcating between 'mine' (Mamakah) and 'theirs' (Pandavah), Dhritarashtra manifests the primal egoic delusion that spawns all suffering.\n\n3. **Classical Vedantic Exegesis**:\nAdi Shankaracharya illuminates that righteousness inherently purifies and triumphs over temporal ego. Ramanujacharya highlights that those anchored in divine surrender are eternally protected on the battlefield of life.\n\n4. **Psychological Mastery**:\nEradicate narrow parochial biases before making major life choices. Objective alignment with universal Dharma ensures unshakeable moral clarity.",
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
      { word: "न जायते", iast: "na jāyate", meaning: { hinglish: "Na kabhi paida hoti hai", hi: "न तो कभी जन्म लेती है", en: "is never born" } },
      { word: "न म्रियते", iast: "na mriyate", meaning: { hinglish: "Na kabhi marti hai", hi: "न कभी मरती है", en: "nor does it ever die" } },
      { word: "अजः", iast: "ajaḥ", meaning: { hinglish: "Janma-rahit (unborn)", hi: "अजन्मा", en: "unborn" } },
      { word: "नित्यः", iast: "nityaḥ", meaning: { hinglish: "Sada rehne wali", hi: "सदा रहने वाली", en: "eternal" } },
      { word: "शाश्वतः", iast: "śāśvataḥ", meaning: { hinglish: "Sanatan timeless", hi: "सनातन और क्षय-रहित", en: "everlasting" } },
      { word: "न हन्यते", iast: "na hanyate", meaning: { hinglish: "Maree nahi jaati", hi: "नष्ट नहीं होती", en: "is not slain" } },
      { word: "शरीरे", iast: "śarīre", meaning: { hinglish: "Shareer ke nasht hone par bhi", hi: "शरीर के नष्ट होने पर भी", en: "when body is slain" } }
    ],
    translation: {
      hinglish: "Atma ka na kabhi janma hota hai aur na kabhi mrityu. Ye ajnama, nitya, shashwat aur puratan hai. Shareer ke nasht hone par bhi atma kabhi nasht nahi hoti.",
      hi: "यह आत्मा न तो किसी काल में जन्म लेती है और न मरती है। यह अजन्मा, नित्य, सनातन और पुरातन है। शरीर के नष्ट होने पर भी आत्मा का नाश नहीं होता।",
      en: "The soul is never born, nor does it ever die. It is unborn, eternal, everlasting, and primeval. It is not destroyed when the physical body is destroyed.",
    },
    deep_bhashya: {
      hinglish: "१. **प्रसंग एवं पृष्ठभूमि (अध्याय २ - सांख्ययोग)**:\nअर्जुन के मन में यह घोर संशय था कि युद्ध में भीष्म और द्रोण जैसे पूजनीय सम्बन्धियों को मारकर वह पाप का भागी बनेगा। इस भ्रम का समूल उच्छेदन करने के लिए भगवान श्री कृष्ण यहाँ सांख्य दर्शन का सर्वोच्च सत्य — 'आत्म-अविनाशिता' — उद्घाटित करते हैं।\n\n२. **षड्भावविकार से मुक्ति (Metaphysical Proof of Soul)**:\nप्रकृति में प्रत्येक पदार्थ ६ अवस्थाओं (षड्भावविकार: जन्म, अस्तित्व, वृद्धि, परिवर्तन, क्षय और विनाश) से गुजरता है। किन्तु आत्मा चैतन्य स्वरूप है, जो काल (Time) और देश (Space) से परे है। आत्मा का कभी जन्म नहीं हुआ, अतः उसकी कभी मृत्यु सम्भव नहीं।\n\n३. **आदि शंकराचार्य भाष्य (अद्वैत वेदान्त)**:\nशंकराचार्य स्पष्ट करते हैं कि जैसे घट (घड़े) के फूटने पर महाकाश नष्ट नहीं होता, वैसे ही देह के नष्ट होने पर देही (शुद्ध चैतन्य) अखण्ड रहता है। मृत्यु केवल वस्त्र बदलने जैसी बाह्य घटना है।\n\n४. **मनोवैज्ञानिक विश्लेषण एवं निर्भयता**:\nमानव मन का सबसे गहरा भय 'मृत्यु का भय' (Existential Dread) है। जब साधक यह समझ लेता है कि उसका मूल स्वभाव शरीर नहीं अपितु अमर आत्मा है, तब समस्त संकोच, अवसाद, और कायरता सदा के लिए विलीन हो जाती है।",
      hi: "१. **प्रसंग एवं पृष्ठभूमि (अध्याय २ - सांख्ययोग)**:\nअर्जुन के मन में यह घोर संशय था कि युद्ध में भीष्म और द्रोण जैसे पूजनीय सम्बन्धियों को मारकर वह पाप का भागी बनेगा। इस भ्रम का समूल उच्छेदन करने के लिए भगवान श्री कृष्ण यहाँ सांख्य दर्शन का सर्वोच्च सत्य — 'आत्म-अविनाशिता' — उद्घाटित करते हैं।\n\n२. **षड्भावविकार से मुक्ति (षड्-अवस्था रहित आत्मा)**:\nप्रकृति में प्रत्येक पदार्थ ६ अवस्थाओं (जन्म, अस्तित्व, वृद्धि, परिवर्तन, क्षय और विनाश) से गुजरता है। किन्तु आत्मा विशुद्ध चैतन्य स्वरूप है, जो काल और देश से परे है। आत्मा का कभी जन्म नहीं हुआ, अतः उसकी कभी मृत्यु सम्भव नहीं।\n\n३. **आदि शंकराचार्य भाष्य (अद्वैत वेदान्त)**:\nशंकराचार्य स्पष्ट करते हैं कि जैसे घट के फूटने पर महाकाश नष्ट नहीं होता, वैसे ही देह के नष्ट होने पर देही अखण्ड रहता है। मृत्यु केवल वस्त्र बदलने जैसी बाह्य घटना है।\n\n४. **मनोवैज्ञानिक विश्लेषण एवं निर्भयता**:\nमानव मन का सबसे गहरा भय 'मृत्यु का भय' है। जब साधक यह समझ लेता है कि उसका मूल स्वभाव शरीर नहीं अपितु अमर आत्मा है, तब समस्त संकोच, अवसाद, और कायरता सदा के लिए विलीन हो जाती है।",
      en: "1. **Context in Sankhya Yoga**:\nConfronting Arjuna's paralysis over the impending death of kin, Lord Krishna reveals the absolute, unshakeable bedrock of Vedic metaphysics: the immortality of pure consciousness.\n\n2. **Transcendence over Six Material Modifications**:\nAll physical entities undergo birth, existence, growth, alteration, decay, and death. Pure Consciousness (Atman) is entirely devoid of these modifications, existing eternally beyond spacetime.\n\n3. **Shankaracharya's Non-Dual Commentary**:\nJust as the universal space inside a clay pot is never damaged when the pot shatters, pure consciousness remains unblemished when biological vessels dissolve.\n\n4. **Psychological Liberation from Mortal Dread**:\nRealizing that your fundamental nature is unconquerable awareness annihilates all anxiety, existential dread, and performance fear.",
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
      hinglish: "१. **प्रसंग एवं कर्मयोग का महासूत्र**:\nयह श्लोक श्रीमद्भगवद्गीता का सबसे प्रसिद्ध और क्रान्तिकारी सूत्र है। यहाँ निष्काम कर्मयोग के चार स्तम्भ स्थापित किए गए हैं: (१) कर्म में अधिकार, (२) फल में अनधिकार, (३) फल का हेतु न बनना, और (४) अकर्मण्यता में आसक्ति न होना।\n\n२. **दार्शनिक तत्त्व मीमांसा (The Paradox of Action)**:\nमनुष्य जब भविष्य के परिणाम (फल) के प्रति आसक्त होकर कार्य करता है, तो उसकी मानसिक ऊर्जा का आधा भाग चिंता और व्यग्रता में नष्ट हो जाता है। परिणाम प्रकृति के अनेक नियमों (अधिष्ठान, कर्ता, करण, चेष्टा और दैव) पर निर्भर करता है, जिस पर व्यक्ति का एकाधिकार नहीं हो सकता।\n\n३. **आदि शंकराचार्य एवं रामानुजाचार्य भाष्य**:\nशंकराचार्य के अनुसार कर्मफल की तृष्णा का त्याग ही चित्त की विशुद्धि और ज्ञान का द्वार है। रामानुजाचार्य समझाते हैं कि भगवान को कर्म समर्पित करके कार्य करने से कर्म बन्धनकारी नहीं होता।\n\n४. **मनोवैज्ञानिक विश्लेषण एवं Flow State**:\nआधुनिक उत्पादकता विज्ञान (Flow State Psychology) भी सिद्ध करता है कि जब मन परिणाम के भय से मुक्त होकर केवल वर्तमान प्रक्रिया (Process) पर १००% एकाग्र होता है, तब मनुष्य अपनी सर्वोच्च रचनात्मक क्षमता प्राप्त करता है।",
      hi: "१. **प्रसंग एवं कर्मयोग का महासूत्र**:\nयह श्लोक श्रीमद्भगवद्गीता का सबसे प्रसिद्ध और क्रान्तिकारी सूत्र है। यहाँ निष्काम कर्मयोग के चार स्तम्भ स्थापित किए गए हैं: (१) कर्म में अधिकार, (२) फल में अनधिकार, (३) फल का हेतु न बनना, और (४) अकर्मण्यता में आसक्ति न होना।\n\n२. **दार्शनिक तत्त्व मीमांसा (कर्म और फल का सम्बन्ध)**:\nमनुष्य जब भविष्य के परिणाम के प्रति आसक्त होकर कार्य करता है, तो उसकी मानसिक ऊर्जा का आधा भाग चिंता और व्यग्रता में नष्ट हो जाता है। परिणाम प्रकृति के अनेक नियमों पर निर्भर करता है, जिस पर व्यक्ति का एकाधिकार नहीं हो सकता।\n\n३. **आदि शंकराचार्य एवं रामानुजाचार्य भाष्य**:\nशंकराचार्य के अनुसार कर्मफल की तृष्णा का त्याग ही चित्त की विशुद्धि और ज्ञान का द्वार है। रामानुजाचार्य समझाते हैं कि भगवान को कर्म समर्पित करके कार्य करने से कर्म बन्धनकारी नहीं होता।\n\n४. **मनोवैज्ञानिक विश्लेषण एवं Flow State**:\nआधुनिक उत्पादकता विज्ञान भी सिद्ध करता है कि जब मन परिणाम के भय से मुक्त होकर केवल वर्तमान प्रक्रिया पर १००% एकाग्र होता है, तब मनुष्य अपनी सर्वोच्च रचनात्मक क्षमता प्राप्त करता है।",
      en: "1. **The Grand Formula of Karma Yoga**:\nThis foundational verse outlines the four pillars of selfless action: (1) Entitlement to action, (2) Detachment from results, (3) Eradicating fruit-seeking agency, and (4) Rejecting inertia or fatalistic inaction.\n\n2. **Metaphysics of Action and Causality**:\nOutcomes are governed by an intricate matrix of universal factors (the field, instruments, effort, and cosmic destiny). Clinging to outcomes divides cognitive bandwidth and breeds perpetual anxiety.\n\n3. **Classical Commentarial Insights**:\nShankaracharya clarifies that renouncing the anxiety for fruits purifies the inner mirror of the intellect. Ramanujacharya highlights that consecrated action becomes living worship.\n\n4. **Psychological Flow State**:\nDecoupling self-esteem from future outcomes instantly dissolves performance paralysis and propels the mind into supreme, effortless creative flow.",
    },
    practical_insight: {
      hinglish: "Jab bhi exam, business ya coding karte waqt fear aaye, focus turant current task ki quality par shift kar dein.",
      hi: "परिणाम की चिंता छोड़कर वर्तमान कार्य की गुणवत्ता पर १००% ध्यान दें; सफलता स्वतः प्राप्त होगी।",
      en: "Focus entirely on the quality of execution in the present moment; outcomes will naturally take care of themselves.",
    }
  },

  // ── CHAPTER 9: RAJA VIDYA RAJA GUHYA YOGA ───────────────────────
  '9_22': {
    chapter: 9,
    verse: 22,
    devanagari: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते |\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् || ९-२२ ||",
    iast: "ananyāścintayanto māṁ ye janāḥ paryupāsate\nteṣāṁ nityābhiyuktānāṁ yogakṣemaṁ vahāmyaham",
    word_anvaya: [
      { word: "अनन्याः", iast: "ananyāḥ", meaning: { hinglish: "Bina kisi doosre sahare ke", hi: "अनन्य भाव से", en: "with undivided devotion" } },
      { word: "चिन्तयन्तः माम्", iast: "cintayantaḥ mām", meaning: { hinglish: "Mera dhyan karte hue", hi: "मेरा चिन्तन करते हुए", en: "meditating upon Me" } },
      { word: "तेषाम्", iast: "teṣām", meaning: { hinglish: "Un nitya jude hue bhakton ka", hi: "उन नित्य युक्त भक्तों का", en: "for those always absorbed in Me" } },
      { word: "योगक्षेमम्", iast: "yogakṣemam", meaning: { hinglish: "Yoga (praapti) aur Kshema (raksha)", hi: "अप्राप्त की प्राप्ति और प्राप्त की रक्षा", en: "supply what they lack and preserve what they have" } },
      { word: "वहामि अहम्", iast: "vahāmi aham", meaning: { hinglish: "Main khud uthata hoon", hi: "मैं स्वयं वहन करता हूँ", en: "I personally carry / maintain" } }
    ],
    translation: {
      hinglish: "Jo ananya bhav se sirf mera dhyan karte hain aur nishkam bhav se pooja karte hain, unke jeevan ki saari zarooraton (Yoga-Kshema) ki poori responsibility main khud uthata hoon!",
      hi: "जो अनन्य भक्त केवल मेरा ही चिन्तन करते हुए निष्काम भाव से मेरी उपासना करते हैं, उन नित्य युक्त भक्तों के योग-क्षेम (जो वस्तु उनके पास नहीं है उसे सुलभ कराना और जो है उसकी रक्षा करना) का दायित्व मैं स्वयं वहन करता हूँ।",
      en: "To those who always worship Me with exclusive devotion, meditating on My transcendental form, to them I carry what they lack, and I preserve what they have.",
    },
    deep_bhashya: {
      hinglish: "१. **प्रसंग एवं ईश्वरीय अभयदान**:\nश्रीमद्भगवद्गीता के अध्याय ९ (राजविद्याराजगुह्ययोग) में भगवान श्री कृष्ण अपने अनन्य साधकों को ब्रह्माण्ड की सबसे बड़ी सुरक्षा गारंटी (Divine Security Covenant) प्रदान करते हैं।\n\n२. **'योग' और 'क्षेम' का गूढ़ अर्थ**:\n'योग' का अर्थ है जिस दिव्य गुण, ज्ञान, शांति या भौतिक साधन का अभी साधक के पास अभाव है, उसे परमात्मा स्वयं सुलभ कराते हैं। 'क्षेम' का अर्थ है जो सत्-सम्पत्ति साधक के पास पहले से है, उसकी विपत्ति और काल से रक्षा करते हैं।\n\n३. **आदि शंकराचार्य एवं रामानुजाचार्य भाष्य**:\nशंकराचार्य कहते हैं कि ज्ञानी भक्त को अपने भरण-पोषण की चिंता करने की आवश्यकता नहीं रहती क्योंकि सम्पूर्ण प्रकृति उसकी सेवा में तत्पर हो जाती है। रामानुजाचार्य के अनुसार भगवान भक्त के प्रेम से इतने वशीभूत हो जाते हैं कि उसका सारा भार अपने कन्धों पर उठा लेते हैं।\n\n४. **मनोवैज्ञानिक विश्लेषण एवं अभाव-भाव से मुक्ति**:\nमनुष्य की अधिकांश बेचैनी 'भविष्य की असुरक्षा' (Scarcity Mindset) के कारण होती है। यह श्लोक अगाध श्रद्धा और आत्म-समर्पण द्वारा मन को गहरी शांति में प्रतिष्ठित करता है।",
      hi: "१. **प्रसंग एवं ईश्वरीय अभयदान**:\nश्रीमद्भगवद्गीता के अध्याय ९ (राजविद्याराजगुह्ययोग) में भगवान श्री कृष्ण अपने अनन्य साधकों को ब्रह्माण्ड की सबसे बड़ी सुरक्षा गारंटी प्रदान करते हैं।\n\n२. **'योग' और 'क्षेम' का गूढ़ अर्थ**:\n'योग' का अर्थ है जिस दिव्य गुण, ज्ञान, शांति या भौतिक साधन का अभी साधक के पास अभाव है, उसे परमात्मा स्वयं सुलभ कराते हैं। 'क्षेम' का अर्थ है जो सत्-सम्पत्ति साधक के पास पहले से है, उसकी विपत्ति और काल से रक्षा करते हैं।\n\n३. **आदि शंकराचार्य एवं रामानुजाचार्य भाष्य**:\nशंकराचार्य कहते हैं कि ज्ञानी भक्त को अपने भरण-पोषण की चिंता करने की आवश्यकता नहीं रहती क्योंकि सम्पूर्ण प्रकृति उसकी सेवा में तत्पर हो जाती है। रामानुजाचार्य के अनुसार भगवान भक्त के प्रेम से इतने वशीभूत हो जाते हैं कि उसका सारा भार अपने कन्धों पर उठा लेते हैं।\n\n४. **मनोवैज्ञानिक विश्लेषण एवं अभाव-भाव से मुक्ति**:\nमनुष्य की अधिकांश बेचैनी भविष्य की असुरक्षा के कारण होती है। यह श्लोक अगाध श्रद्धा और आत्म-समर्पण द्वारा मन को गहरी शांति में प्रतिष्ठित करता है।",
      en: "1. **The Divine Covenant of Grace**:\nIn this celebrated verse of Chapter 9, the Supreme Lord extends an unconditional covenant of universal protection to all who remain steadfastly aligned with pure consciousness.\n\n2. **The Anatomy of Yoga & Kshema**:\n'Yoga' represents the bestowing of virtues, wisdom, and necessary resources previously lacking; 'Kshema' signifies the eternal preservation of attained spiritual and existential wealth.\n\n3. **Classical Vedantic Commentary**:\nShankara explains that nature itself orchestrates the sustenance of the self-realized sage. Ramanuja movingly articulates that divine love assumes personal responsibility for the devotee's welfare.\n\n4. **Psychological Security & Abundance**:\nSurrendering chronic scarcity anxiety to the cosmic intelligence unlocks profound emotional tranquility and fearlessness.",
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
      hinglish: "१. **प्रसंग एवं गीता का चरम महावाक्य (The Climax)**:\nसम्पूर्ण १८ अध्यायों और ७०० श्लोकों के उपदेश का यह चरम शिखर (Charama Shloka) है। यहाँ भगवान श्री कृष्ण अर्जुन के समस्त संशयों और बन्धनों का अन्त करते हुए परम शरणागति का मार्ग उद्घाटित करते हैं।\n\n२. **'सर्वधर्मान् परित्यज्य' का वास्तविक रहस्य**:\nयहाँ धर्म त्यागने का अर्थ अधर्म करना नहीं, अपितु 'अहंकारयुक्त कर्तापन' और नाना प्रकार के कर्मकाण्डों के मानसिक बोझ को त्यागना है। जब मनुष्य अपने अहम् को परब्रह्म में विसर्जित कर देता है, तब वह सम्पूर्ण पापों से मुक्त हो जाता है।\n\n३. **आदि शंकराचार्य एवं रामानुजाचार्य चरम भाष्य**:\nशंकराचार्य के अनुसार सर्वधर्म परित्याग ही 'सर्वकर्मसंन्यास' और अद्वैत ज्ञान की पराकाष्ठा है। रामानुजाचार्य के अनुसार यह 'शरणागति' (प्रपत्ति) का महामन्त्र है, जहाँ भक्त ईश्वर की कृपा पर सम्पूर्ण निर्भर हो जाता है।\n\n४. **मनोवैज्ञानिक विश्लेषण एवं 'मा शुचः' (शोक निवारण)**:\n'मा शुचः' (चिंता मत करो) — यह भगवान का परम अभय वचन है। जब साधक अपना सारा मानसिक भार और गिल्ट (Guilt/Fear) ईश्वर को समर्पित कर देता है, तब अन्तःकरण में असीम आनन्द और मुक्ति का उदय होता है।",
      hi: "१. **प्रसंग एवं गीता का चरम महावाक्य**:\nसम्पूर्ण १८ अध्यायों और ७०० श्लोकों के उपदेश का यह चरम शिखर है। यहाँ भगवान श्री कृष्ण अर्जुन के समस्त संशयों और बन्धनों का अन्त करते हुए परम शरणागति का मार्ग उद्घाटित करते हैं।\n\n२. **'सर्वधर्मान् परित्यज्य' का वास्तविक रहस्य**:\nयहाँ धर्म त्यागने का अर्थ अधर्म करना नहीं, अपितु 'अहंकारयुक्त कर्तापन' और नाना प्रकार के कर्मकाण्डों के मानसिक बोझ को त्यागना है। जब मनुष्य अपने अहम् को परब्रह्म में विसर्जित कर देता है, तब वह सम्पूर्ण पापों से मुक्त हो जाता है।\n\n३. **आदि शंकराचार्य एवं रामानुजाचार्य चरम भाष्य**:\nशंकराचार्य के अनुसार सर्वधर्म परित्याग ही 'सर्वकर्मसंन्यास' और अद्वैत ज्ञान की पराकाष्ठा है। रामानुजाचार्य के अनुसार यह 'शरणागति' का महामन्त्र है, जहाँ भक्त ईश्वर की कृपा पर सम्पूर्ण निर्भर हो जाता है।\n\n४. **मनोवैज्ञानिक विश्लेषण एवं 'मा शुचः'**:\n'मा शुचः' — यह भगवान का परम अभय वचन है। जब साधक अपना सारा मानसिक भार और गिल्ट ईश्वर को समर्पित कर देता है, तब अन्तःकरण में असीम आनन्द और मुक्ति का उदय होता है।",
      en: "1. **The Zenith of Bhagavad Gita's Teaching**:\nThis is the crowning verse (Charama Shloka) of the entire scripture, wherein Lord Krishna delivers the ultimate synthesis of all spiritual disciplines into pure divine surrender.\n\n2. **The Essence of Renouncing All Dharmas**:\nRenunciation here does not imply moral anarchy, but the complete dissolution of egoic agency and ritualistic anxieties. Releasing the burden of 'I am the doer' unlocks absolute liberation.\n\n3. **Shankara and Ramanuja on Absolute Surrender**:\nShankara recognizes this as the pinnacle of non-dual self-realization (Jnana). Ramanuja identifies it as the sublime doctrine of Sharanagati (Prapatti), where divine grace dissolves all karmic debt.\n\n4. **The Ultimate Blessing: 'Do Not Grieve' (Ma Shuchah)**:\n'Do not grieve' is the timeless cosmic reassurance. Surrendering all guilt, dread, and identity into the divine will unlocks unbreakable inner serenity.",
    },
    practical_insight: {
      hinglish: "Jab jeevan me bojh aur problems control se bahar lagein, toh apna 100% prayas karke outcome ko Ishwar ke haath me chhod dein. Chinta karna band karein!",
      hi: "जब जीवन की परिस्थितियाँ अत्यंत कठिन लगें, तब अपना सर्वश्रेष्ठ प्रयास करके परिणाम को परमात्मा को सौंप दें और निश्चिन्त रहें।",
      en: "When burdens feel overwhelming, execute with pure heart and entrust the rest to God. Live with unshakeable peace.",
    }
  }
};

export function getComprehensiveVerse(chapter: number, verse: number): ComprehensiveVerseTranslation | null {
  const key = `${chapter}_${verse}`;
  return CANONICAL_TRANSLATIONS[key] || null;
}


export function getCanonicalVerseData(chapter: number, verse: number): ComprehensiveVerseTranslation | null {
  return CANONICAL_TRANSLATIONS[`${chapter}_${verse}`] || null;
}
