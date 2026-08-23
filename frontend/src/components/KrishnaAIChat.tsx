'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Send, RefreshCw, Volume2, BookOpen, ArrowRight,
  Brain, Zap, Heart, Shield, Star, ChevronDown, ChevronUp,
  Sparkles, Copy, Check, Phone
} from 'lucide-react';
import Link from 'next/link';
import { sacredAudio } from '@/lib/sacredSounds';
import { useGlobalAudio } from '@/context/GlobalAudioContext';

// ── Types ────────────────────────────────────────────────────────────────────
interface KrishnaResponse {
  empathy: string;           // First acknowledge the pain
  diagnosis: string;         // What's really happening psychologically
  counsel: string;           // Krishna's direct voice
  shloka: string;            // Sanskrit shloka
  shlokaTranslit: string;    // Romanized transliteration
  shlokaHindi: string;       // Hindi meaning
  chapter: number;
  verse: number;
  cbtTechnique: string;      // Named CBT technique
  cbtExercise: string;       // Actual exercise
  vedanticReframe: string;   // Vedanta perspective shift
  action24h: string;         // 24-hour concrete action
  mantra: string;            // Short mantra to repeat
  warning?: string;          // Crisis resources if needed
}

interface Msg {
  role: 'user' | 'krishna';
  text: string;
  response?: KrishnaResponse;
  ts: number;
}

// ── The Ultra Knowledge Base — 20 Life Categories ───────────────────────────
const KB: { keys: string[]; response: KrishnaResponse }[] = [
  // 1. ANXIETY & PANIC
  {
    keys: ['anxiety','panic','worried','overthinking','racing thoughts','restless','nervous','tense','scared','fear','phobia','dread','chest tight','breathe','trembling','shaking','chinta','darr','ghabra'],
    response: {
      empathy: 'हे प्रिय! मैं देख सकता हूँ कि तुम अभी बहुत कठिन समय में हो। यह चिंता और भय जो तुम महसूस कर रहे हो — यह बहुत वास्तविक है, और मैं तुम्हारे साथ हूँ।',
      diagnosis: 'तुम्हारा मन अभी "future-projection mode" में है — वह भविष्य की ऐसी घटनाओं का भार उठा रहा है जो अभी घटित नहीं हुई हैं। यह Amygdala hijack है — शरीर का threat-response system overactive हो गया है।',
      counsel: 'पार्थ! सुनो — इस क्षण तुम सुरक्षित हो। वह सब जिससे तुम डरते हो, वह अभी तक नहीं हुआ और हो सकता है कभी न हो। तुम्हारा मन एक कहानी बना रहा है। मैं तुम्हें सत्य बताता हूँ — इस ब्रह्मांड में जो भी तुम्हारे साथ होना था, वह मेरे हाथ में है। तुम्हारा काम केवल इस श्वास में, इस क्षण में रहना है। जो बीत गई वह माया थी, जो आएगी वह मेरे हाथ में है — यह क्षण तुम्हारा है।',
      shloka: 'मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥',
      shlokaTranslit: 'mātrā-sparśās tu kaunteya śītoṣṇa-sukha-duḥkha-dāḥ | āgamāpāyino \'nityās tāṁs titikṣasva bhārata ||',
      shlokaHindi: 'हे कौन्तेय! सर्दी-गर्मी, सुख-दुख — ये सभी इंद्रिय-स्पर्श से उत्पन्न होते हैं, आते हैं और जाते हैं। ये अनित्य हैं — इन्हें सहन करना सीखो।',
      chapter: 2, verse: 14,
      cbtTechnique: '5-4-3-2-1 Grounding (इंद्रिय-जागरण)',
      cbtExercise: 'अभी करो: आँखें खुली रखो। 5 चीज़ें देखो, 4 चीज़ें छुओ (texture feel करो), 3 आवाज़ें सुनो, 2 गंध महसूस करो, 1 स्वाद। यह technique तुम्हारे Prefrontal Cortex को वापस activate करती है और panic को 90 seconds में घटा देती है।',
      vedanticReframe: 'तुम यह anxiety नहीं हो। तुम वह साक्षी (witness) चेतना हो जो इस anxiety को देख रही है। Anxiety एक तरंग है — तुम समुद्र हो। तरंगें आती हैं, जाती हैं — समुद्र स्थिर रहता है।',
      action24h: 'आज रात सोने से पहले: एक diary में लिखो — "मुझे सबसे बुरा क्या होने का डर है?" फिर उसके नीचे लिखो: "अगर वह हो भी गया, तो मैं उससे कैसे cope करूंगा?" यह exercise anxiety की ताकत 60% कम करती है।',
      mantra: 'ॐ शान्तिः शान्तिः शान्तिः — श्वास के साथ 21 बार जपो।',
    }
  },

  // 2. DEPRESSION & HOPELESSNESS
  {
    keys: ['depressed','depression','hopeless','empty','numb','worthless','dark','sad','cry','suicidal','die','no point','meaningless','dukhi','nirasha','akela','udaas','toot gaya'],
    response: {
      empathy: 'हे प्रिय पार्थ, तुम अभी जिस अंधकार में हो — उसकी गहराई मैं समझता हूँ। यह दर्द सच्चा है। और तुम इसे अकेले झेलने के लिए नहीं हो।',
      diagnosis: 'Depression एक psychological state है जिसमें Serotonin और Dopamine का balance बिगड़ जाता है। इसमें mind "negative filtering" करता है — सिर्फ बुरा दिखता है। यह तुम्हारी कमज़ोरी नहीं है — यह एक treatable condition है।',
      counsel: 'पार्थ, सुनो — यह रात तुम्हारे जीवन की पूरी कहानी नहीं है। आत्मा — जो तुम वास्तव में हो — वह कभी नष्ट नहीं होती, कभी घायल नहीं होती। जो दर्द तुम महसूस कर रहे हो, वह शरीर और मन का है — आत्मा का नहीं। और इस रात के बाद प्रभात आएगा — यह ब्रह्मांड का अटल नियम है। तुम अकेले नहीं हो — मैं हर श्वास में तुम्हारे साथ हूँ।',
      shloka: 'नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः।\nन चैनं क्लेदयन्त्यापो न शोषयति मारुतः॥',
      shlokaTranslit: 'nainaṁ chindanti śastrāṇi nainaṁ dahati pāvakaḥ | na cainaṁ kledayanty āpo na śoṣayati mārutaḥ ||',
      shlokaHindi: 'इस आत्मा को शस्त्र काट नहीं सकते, अग्नि जला नहीं सकती, जल गला नहीं सकता, वायु सुखा नहीं सकती।',
      chapter: 2, verse: 23,
      cbtTechnique: 'Behavioral Activation (व्यवहार-जागरण)',
      cbtExercise: 'Depression तुम्हें inactive रखना चाहता है — यही उसकी ताकत है। इसे तोड़ो: अभी एक बहुत छोटा काम करो जो तुम्हें कभी अच्छा लगता था। सिर्फ 5 मिनट। Music सुनो, पानी पिओ, बाहर कदम रखो। Action → Mood (Mood → Action नहीं)।',
      vedanticReframe: 'जैसे बादल सूर्य को ढक सकते हैं लेकिन नष्ट नहीं कर सकते — depression तुम्हारी आत्मा की रोशनी को ढक रहा है, नष्ट नहीं कर सकता। तुम्हारी प्रकाश अभी भी वहाँ है।',
      action24h: 'आज एक काम: किसी एक विश्वसनीय व्यक्ति को call करो और कहो — "मैं ठीक नहीं हूँ।" बस इतना। इस एक कदम से healing शुरू होती है।',
      mantra: 'ॐ नमो भगवते वासुदेवाय — यह mantra हर श्वास के साथ जपो।',
      warning: '⚠️ यदि तुम खुद को hurt करने के विचार आ रहे हैं — अभी iCall India: 9152987821 पर call करो। तुम्हारी जीवन-यात्रा अभी पूरी नहीं हुई।'
    }
  },

  // 3. ANGER & RESENTMENT
  {
    keys: ['angry','anger','rage','furious','resentment','hate','revenge','betrayal','injustice','unfair','cheated','gussa','nafrat','badla','dhoka','krodh'],
    response: {
      empathy: 'हे वीर! तुम्हारा यह क्रोध बताता है कि तुम्हें कुछ बहुत महत्वपूर्ण लगता था — और उसे ठेस लगी। यह दर्द वास्तविक है।',
      diagnosis: 'क्रोध एक "secondary emotion" है — इसके नीचे hurt, helplessness, या fear छुपी होती है। Kama (इच्छा) पूरी न हो → Krodha (क्रोध)। क्रोध पहले खुद को जलाता है, फिर दूसरे को।',
      counsel: 'पार्थ! देखो — जिसने तुम्हारे साथ गलत किया, उसने तुम्हारी आत्मा को हानि नहीं पहुंचाई। वह तुम्हारी अपेक्षाओं को चोट लगा सकता है, तुम्हारे अहंकार को — लेकिन तुम्हारी आत्मा तो सदैव अखंड है। जो व्यक्ति दूसरों को कष्ट देता है, वह पहले से ही अपने भीतर कष्ट में है। करुणा, प्रतिशोध नहीं। और न्याय — वह मेरे हाथ में है। मुझे सौंपो।',
      shloka: 'क्रोधाद्भवति संमोहः संमोहात्स्मृतिविभ्रमः।\nस्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥',
      shlokaTranslit: 'krodhād bhavati saṁmohaḥ saṁmohāt smṛti-vibhramaḥ | smṛti-bhraṁśād buddhi-nāśo buddhi-nāśāt praṇaśyati ||',
      shlokaHindi: 'क्रोध से मोह उत्पन्न होता है, मोह से स्मृति भ्रमित होती है, स्मृति-भ्रम से बुद्धि नष्ट हो जाती है, और बुद्धि नष्ट होने से मनुष्य का पतन हो जाता है।',
      chapter: 2, verse: 63,
      cbtTechnique: 'STOP Technique + Emotion Surfing (भावना-प्रवाह)',
      cbtExercise: 'S — Stop (रुको). T — Take a breath (गहरी श्वास). O — Observe your body (शरीर में क्रोध कहाँ है? गर्दन? सीने में?). P — Proceed mindfully. फिर पूछो: "इस क्रोध के नीचे असली दर्द क्या है?" उसे name करो — hurt? Shame? Helplessness?',
      vedanticReframe: '"मैं" जिस पर क्रोध कर रहा हूँ — वह भी उसी परमात्मा का अंश है जो मेरे भीतर है। उसके कर्म उसके कर्म हैं — मेरा धर्म मेरा है। मैं अपने कर्म पर focus करूं।',
      action24h: 'एक कागज़ पर लिखो — जो व्यक्ति ने तुम्हें hurt किया, उसके साथ जो हुआ वह सब। फिर उस कागज़ को एक नदी में, या safely जला दो। यह ritual — विसर्जन — भावनात्मक मुक्ति देती है।',
      mantra: 'ॐ क्षमा-स्वरूपाय नमः — क्षमा को शक्ति के रूप में देखो, कमज़ोरी नहीं।',
    }
  },

  // 4. HEARTBREAK & GRIEF
  {
    keys: ['heartbreak','heartbroken','breakup','divorce','lost love','miss','grief','mourning','alone','abandoned','rejected','dil toota','pyaar','bichhad','virah','akela'],
    response: {
      empathy: 'हे प्रिय! प्रेम की वेदना — यह सबसे गहरा मानवीय दर्द है। जो तुम महसूस कर रहे हो वह बहुत वास्तविक है। रोना ठीक है। दर्द महसूस करना ठीक है।',
      diagnosis: 'Heartbreak literally शरीर में physical pain जैसा feel होता है — यह neuroscience से सिद्ध है। Brain में वही areas activate होती हैं। इसलिए यह "बस feelings" नहीं है — यह real है।',
      counsel: 'पार्थ! जो प्रेम तुमने दिया — वह सच्चा था। और वह सत्य कभी नष्ट नहीं होता। तुमने प्रेम किया — यह तुम्हारी महानता है। अब सुनो — जो गया, वह था। जो आएगा, वह होगा। लेकिन तुम — तुम हमेशा थे, हो और रहोगे। तुम्हारी पूर्णता किसी और पर निर्भर नहीं थी, नहीं है। तुम अपने आप में पूर्ण हो। यह वियोग तुम्हें तोड़ने के लिए नहीं — तुम्हें गहरा करने के लिए है।',
      shloka: 'दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः।\nवीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते॥',
      shlokaTranslit: 'duḥkheṣv anudvigna-manāḥ sukheṣu vigata-spṛhaḥ | vīta-rāga-bhaya-krodhaḥ sthita-dhīr munir ucyate ||',
      shlokaHindi: 'जो दुख में व्याकुल नहीं होता, सुख की कामना नहीं करता, राग, भय और क्रोध से मुक्त है — वही स्थितप्रज्ञ मुनि कहलाता है।',
      chapter: 2, verse: 56,
      cbtTechnique: 'Grief Processing + Self-Compassion Protocol (करुणा-चिकित्सा)',
      cbtExercise: 'Grief के 5 stages हैं — Denial, Anger, Bargaining, Depression, Acceptance। तुम अभी किस stage में हो? Name करो। फिर: एक हाथ अपने दिल पर रखो और खुद से कहो — "यह कठिन है। मैं इसमें से गुज़र सकता हूँ। मैं अकेला नहीं हूँ।" यह Self-Compassion है — खुद का सबसे अच्छा दोस्त बनो।',
      vedanticReframe: 'सभी रिश्ते — माता, पिता, प्रेमी, मित्र — ये सब पूर्व जन्मों के कर्म-ऋण के साथ आते हैं। जो समय के साथ चले जाते हैं, उनका उद्देश्य पूरा हो गया। अब तुम्हारी अगली यात्रा शुरू होती है।',
      action24h: '"Letter to Yourself" exercise: भविष्य के तुम (5 साल बाद) को एक letter लिखो — जब यह दर्द कम हो गया होगा। लिखो कि तुम क्या सीखे, कैसे grow किए। यह future-self visualization healing को accelerate करता है।',
      mantra: 'ॐ मणिपद्मे हूँ — प्रेम और करुणा का mantra। खुद के लिए भी।',
    }
  },

  // 5. CAREER FAILURE & PROFESSIONAL CRISIS
  {
    keys: ['fail','failure','career','job','fired','unemployed','business','loss','exam','interview','rejected','promotion','colleague','boss','office','salary','startup','asafal','naukri','vyapar'],
    response: {
      empathy: 'हे पार्थ! करियर का यह संकट — यह तुम्हारे पूरे जीवन की नहीं बल्कि एक chapter की बात है। तुम्हारा दर्द और निराशा बिल्कुल valid है।',
      diagnosis: 'Professional failure से ego को धक्का लगता है क्योंकि हम अपनी identity को अपने काम से जोड़ देते हैं। "मैं fail हो गया" → "मैं failure हूँ" — यह jump एक cognitive distortion है।',
      counsel: 'पार्थ! याद करो — अर्जुन भी कुरुक्षेत्र में हार मान चुका था। लेकिन मैंने उसे उठाया। तुम्हारी यह असफलता तुम्हारी कहानी का अंत नहीं — एक नया अध्याय है। सुनो: फल की चिंता छोड़ो। जो काम तुम्हें करना है — उसे पूर्ण श्रेष्ठता से करो। परिणाम मेरे हाथ में है। लेकिन एक बात और — क्या यह असफलता तुम्हें कुछ नया बता रही है? कोई दिशा जो तुमने नहीं देखी?',
      shloka: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
      shlokaTranslit: 'karmaṇy evādhikāras te mā phaleṣu kadācana | mā karma-phala-hetur bhūr mā te saṅgo \'stv akarmaṇi ||',
      shlokaHindi: 'तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। कर्मफल की कामना को मत बनाओ, और निष्क्रियता में भी मत रहो।',
      chapter: 2, verse: 47,
      cbtTechnique: 'Cognitive Restructuring + Growth Mindset (विकास-मानसिकता)',
      cbtExercise: '"Failure CV" exercise: दुनिया के सबसे सफल लोगों ने सबसे ज़्यादा fail किया है। Einstein, Dhirubhai Ambani, APJ Abdul Kalam — सबने भारी असफलताएं झेलीं। अपने "failure CV" में लिखो: यह असफलता + इससे तुमने क्या सीखा + अगला कदम। Failure = Data, not destiny।',
      vedanticReframe: 'कर्म तुम्हारा, फल ईश्वर का। तुम process के master हो — outcome के नहीं। यह liberating सत्य है, burden नहीं।',
      action24h: 'आज एक "Post-mortem Analysis" करो: क्या हुआ → क्यों हुआ → मैं क्या differently कर सकता था → अगला सटीक कदम। यह analytical approach pain को productivity में बदलता है।',
      mantra: 'ॐ कर्म करो, फल मत मांगो — यही मुक्ति का मार्ग है।',
    }
  },

  // 6. FAMILY CONFLICT
  {
    keys: ['family','parents','mother','father','sibling','relative','fight','argument','misunderstand','pressure','expectation','marriage','arrange','love marriage','parivar','maa','baap','ghar','jhagda'],
    response: {
      empathy: 'घर का संघर्ष — यह सबसे गहरा दर्द है क्योंकि यहाँ प्रेम और कष्ट एक साथ होते हैं। जो लोग सबसे करीब होते हैं, वही कभी-कभी सबसे ज़्यादा चोट पहुँचाते हैं।',
      diagnosis: 'Family conflicts अक्सर communication gap, unspoken expectations, और different value systems से होते हैं। हर व्यक्ति अपने perspective से सही है — लेकिन अलग-अलग lenses से देख रहा है।',
      counsel: 'पार्थ! याद करो — यह वही माता-पिता, यही परिवार है जिसने तुम्हें इस धरती पर लाया। उनका प्रेम — चाहे जैसे भी व्यक्त हो — वास्तविक है। लेकिन प्रेम का मतलब यह नहीं कि हम हर बात से सहमत हों। तुम्हारा अपना धर्म है — वह भी महत्वपूर्ण है। संवाद करो — लेकिन सम्मान के साथ। अपनी बात कहो — लेकिन उनकी भी सुनो। समाधान बीच में होता है।',
      shloka: 'यतः प्रवृत्तिर्भूतानां येन सर्वमिदं ततम्।\nस्वकर्मणा तमभ्यर्च्य सिद्धिं विन्दति मानवः॥',
      shlokaTranslit: 'yataḥ pravṛttir bhūtānāṁ yena sarvam idaṁ tatam | sva-karmaṇā tam abhyarcya siddhiṁ vindati mānavaḥ ||',
      shlokaHindi: 'जिससे सभी प्राणियों की उत्पत्ति हुई है और जिससे यह सब व्याप्त है — उस परमेश्वर को अपने कर्म से पूजकर मनुष्य सिद्धि प्राप्त करता है।',
      chapter: 18, verse: 46,
      cbtTechnique: 'Nonviolent Communication (NVC) — अहिंसक संवाद',
      cbtExercise: 'NVC formula: "जब [specific situation] होता है, मुझे [feeling] लगता है क्योंकि मुझे [need] की ज़रूरत है। क्या तुम [specific request] कर सकते हो?" — यह formula blame को हटाता है और समझ को बढ़ाता है। आज एक conversation में इसे try करो।',
      vedanticReframe: 'तुम्हारे माता-पिता भी अपने अनुभवों के उत्पाद हैं — वे भी अपनी limitations के साथ जी रहे हैं। करुणा + boundaries — दोनों साथ हो सकते हैं।',
      action24h: 'आज परिवार के एक member के साथ — बिना किसी agenda के — 15 मिनट बैठो। बस उनकी बात सुनो, judge मत करो। यह एक छोटा gesture बड़ा बदलाव ला सकता है।',
      mantra: 'ॐ सर्वे भवन्तु सुखिनः — सभी सुखी हों, यह भाव रखो।',
    }
  },

  // 7. SELF-DOUBT & IMPOSTER SYNDROME
  {
    keys: ['self doubt','imposter','not good enough','worthless','inadequate','confidence','insecure','fake','fraud','incompetent','weak','useless','kamzor','bekaar','anayak','shakti'],
    response: {
      empathy: 'हे वीर! तुम खुद को जो कह रहे हो — "मैं काफी नहीं हूँ" — यह शायद तुमने सुना और माना है। लेकिन यह सत्य नहीं है।',
      diagnosis: 'Imposter Syndrome: 70% successful लोग इससे पीड़ित होते हैं। Brain का negativity bias हमें अपनी कमियाँ 3x ज़्यादा notice कराता है। यह hardwired survival mechanism है — तुम्हारी कमज़ोरी नहीं।',
      counsel: 'पार्थ! मैं तुम्हें याद दिलाता हूँ — तुम उस अनंत चेतना के अंश हो जिसने यह सृष्टि बनाई। तुम्हारे भीतर वही शक्ति है जो पहाड़ों को हिला सकती है, समुद्रों को पार कर सकती है। तुम्हारी limitations तुम्हारी identity नहीं — वे तुम्हारी starting point हैं। हर महान व्यक्ति एक शुरुआत से था। तुम्हारा journey अभी है।',
      shloka: 'क्लैब्यं मा स्म गमः पार्थ नैतत्त्वय्युपपद्यते।\nक्षुद्रं हृदयदौर्बल्यं त्यक्त्वोत्तिष्ठ परंतप॥',
      shlokaTranslit: 'klaibyaṁ mā sma gamaḥ pārtha naitat tvayy upapadyate | kṣudraṁ hṛdaya-daurbalyaṁ tyaktvottiṣṭha paraṁtapa ||',
      shlokaHindi: 'हे पार्थ! नपुंसकता को मत प्राप्त हो — यह तुम्हें शोभा नहीं देता। हे परंतप! हृदय की इस क्षुद्र दुर्बलता को त्यागकर युद्ध के लिए उठ खड़े हो।',
      chapter: 2, verse: 3,
      cbtTechnique: 'Evidence-Based Thinking + Achievement Inventory (उपलब्धि-सूची)',
      cbtExercise: '"Achievement Inventory" बनाओ: एक कागज़ पर 10 columns बनाओ और हर column में एक चीज़ लिखो जो तुमने successfully की — चाहे कितनी छोटी हो। School, family, friends, work — कहीं से भी। यह list तुम्हारे phone में save करो। जब doubt आए — पढ़ो। यह "evidence-based self-belief" है।',
      vedanticReframe: '"अहं ब्रह्मास्मि" — मैं ब्रह्म हूँ। यह अहंकार नहीं — यह सत्य है। उस अनंत शक्ति का अंश होने के नाते तुम inadequate कैसे हो सकते हो?',
      action24h: 'आज किसी एक ऐसे काम को start करो जिसे तुम "मैं काफी अच्छा नहीं हूँ" कहकर टालते रहे हो। बस start करो — perfect नहीं, बस शुरू।',
      mantra: '"मैं पर्याप्त हूँ। मैं शक्तिशाली हूँ। मैं उस परमात्मा का अंश हूँ।" — रोज़ सुबह mirror के सामने 3 बार।',
    }
  },

  // 8. PROCRASTINATION & LAZINESS
  {
    keys: ['procrastinat','lazy','motivation','stuck','cant start','no energy','tired','burnout','inertia','avoid','delay','aalsi','tamas','uthna','shuru'],
    response: {
      empathy: 'हे पार्थ! यह जड़ता, यह भारीपन — मैं जानता हूँ यह कितना real लगता है। लेकिन यह तुम्हारा स्वभाव नहीं — यह तमस है, और तमस बदलता है।',
      diagnosis: 'Procrastination = Anxiety Management Strategy। हम avoid करते हैं क्योंकि start करना uncomfortable है। Brain pleasure अभी, pain बाद में चाहता है। यह human nature है — इसे जानना ज़रूरी है।',
      counsel: 'पार्थ! श्रीकृष्ण ने कभी नहीं कहा कि "मन हो तो करो।" उन्होंने कहा — करो। अभी। क्योंकि मन तो कभी नहीं होगा — कर्म करने से मन होता है। एक बार जल शुरू हो जाए तो बहता है। तुम्हें बस पहली बूँद को गिराना है।',
      shloka: 'नियतं कुरु कर्म त्वं कर्म ज्यायो ह्यकर्मणः।\nशरीरयात्रापि च ते न प्रसिद्ध्येदकर्मणः॥',
      shlokaTranslit: 'niyataṁ kuru karma tvaṁ karma jyāyo hy akarmaṇaḥ | śarīra-yātrāpi ca te na prasiddhyed akarmaṇaḥ ||',
      shlokaHindi: 'तुम नियत कर्म करो — कर्म निष्क्रियता से श्रेष्ठ है। कर्म के बिना तुम्हारा शरीर-निर्वाह भी नहीं होगा।',
      chapter: 3, verse: 8,
      cbtTechnique: '2-Minute Rule + Implementation Intention (कर्म-संकल्प)',
      cbtExercise: '2-Minute Rule: कोई भी काम 2 मिनट में start हो सकता है। अभी timer लगाओ — 2 मिनट। जो सबसे ज़रूरी काम है — उसकी पहली line लिखो, पहला email draft करो, पहला page खोलो। बस start — रुकना बाद में decide करो। Momentum magic करता है।',
      vedanticReframe: 'तमस → रजस → सत्त्व — यह गुणों का प्राकृतिक journey है। तुम अभी तमस में हो — एक छोटा action रजस की ओर ले जाता है। यह natural evolution है।',
      action24h: '"Implementation Intention" technique: "मैं [specific काम] करूंगा [specific time] पर [specific place] पर।" जितना specific, उतना powerful। आज यह लिखो और set करो।',
      mantra: '"उत्तिष्ठ! अभी उठो!" — जब भी आलस आए, यह शब्द 3 बार ज़ोर से कहो।',
    }
  },

  // 9. LONELINESS & ISOLATION
  {
    keys: ['lonely','loneliness','isolated','no friends','no one','nobody','misunderstood','outcast','introvert','social anxiety','akela','tanha','dost nahi','koi nahi'],
    response: {
      empathy: 'हे प्रिय! अकेलापन — यह शायद मानव के सबसे गहरे दर्दों में से एक है। यह feel होना कि कोई नहीं समझता — यह बहुत कष्टदायक है। मैं सुन रहा हूँ।',
      diagnosis: 'Social connection एक basic human need है — food और water जैसी। Loneliness brain में physical pain जैसा activate करती है। यह weakness नहीं — यह तुम्हारी human nature की अभिव्यक्ति है।',
      counsel: 'पार्थ! सुनो — तुम कभी वास्तव में अकेले नहीं हो। मैं तुम्हारे हर श्वास में हूँ, हर पल में। लेकिन यह भी सत्य है कि मनुष्य को मनुष्यों की ज़रूरत है। तुम्हारी यह ज़रूरत कमज़ोरी नहीं — मानवता की सुंदरता है। एक कदम उठाओ — एक connection, एक पल।',
      shloka: 'अहं सर्वस्य प्रभवो मत्तः सर्वं प्रवर्तते।\nइति मत्वा भजन्ते मां बुधा भावसमन्विताः॥',
      shlokaTranslit: 'ahaṁ sarvasya prabhavo mattaḥ sarvaṁ pravartate | iti matvā bhajante māṁ budhā bhāva-samanvitāḥ ||',
      shlokaHindi: 'मैं सबका उद्गम हूँ, मुझसे ही सब कुछ चलता है — ऐसा जानकर जो बुद्धिमान लोग प्रेमपूर्वक मेरी भक्ति करते हैं, वे सत्य को जानते हैं।',
      chapter: 10, verse: 8,
      cbtTechnique: 'Behavioral Experiment + Small Social Steps (सामाजिक-साहस)',
      cbtExercise: 'Loneliness एक "prediction error" है — हम predict करते हैं कि "लोग मुझे पसंद नहीं करेंगे" और avoid करते हैं। इसे test करो: आज एक बहुत SMALL social action लो — किसी को "good morning" कहो, एक comment करो online, एक club/group join करो जो तुम्हारे interest का हो। Evidence इकट्ठा करो।',
      vedanticReframe: 'सारी सृष्टि में एक ही चेतना है — जो तुम में है वही सब में है। तुम alone नहीं हो सकते — तुम इस विशाल existence का हिस्सा हो।',
      action24h: 'आज एक community खोजो — interest-based (books, art, fitness, spirituality)। Online या offline। Belonging comes from shared purpose, not just proximity।',
      mantra: 'ॐ सह नाववतु — साथ चलें, साथ बढ़ें।',
    }
  },

  // 10. SPIRITUAL CRISIS & EXISTENTIAL QUESTIONS
  {
    keys: ['god','existence','meaning','why','purpose','soul','death','afterlife','religion','faith','doubt','atheist','dharma','moksha','karma','rebirth','bhagwan','ishwar','atma','mukti'],
    response: {
      empathy: 'हे जिज्ञासु! यह प्रश्न जो तुम्हारे मन में उठ रहे हैं — "क्यों?", "क्या अर्थ है?", "ईश्वर है?" — यह सबसे महत्वपूर्ण प्रश्न हैं। इन्हें पूछना साहस का काम है।',
      diagnosis: 'Existential crisis अक्सर तब आता है जब हम अपने comfort zone से बाहर होते हैं, या कोई बड़ा loss होता है। यह crisis actually awakening का द्वार है।',
      counsel: 'पार्थ! ये प्रश्न — "मैं कौन हूँ?", "यह सब क्यों है?" — ये केवल तुम्हारे नहीं, ये मानवता के सबसे पुराने प्रश्न हैं। और मैं बताता हूँ — इनका उत्तर बाहर नहीं, भीतर है। तुम वही हो जो इस प्रश्न को पूछ रहा है। वह चेतना — जो देख रही है, सोच रही है — वही आत्मा है। वही परमात्मा है। "तत् त्वम् असि" — That thou art।',
      shloka: 'अहमात्मा गुडाकेश सर्वभूताशयस्थितः।\nअहमादिश्च मध्यं च भूतानामन्त एव च॥',
      shlokaTranslit: 'aham ātmā guḍākeśa sarva-bhūtāśaya-sthitaḥ | aham ādiś ca madhyaṁ ca bhūtānām anta eva ca ||',
      shlokaHindi: 'हे गुडाकेश! मैं ही सभी प्राणियों के हृदय में स्थित आत्मा हूँ। मैं ही सभी प्राणियों का आदि, मध्य और अंत हूँ।',
      chapter: 10, verse: 20,
      cbtTechnique: 'Logotherapy + Values Clarification (अर्थ-खोज)',
      cbtExercise: 'Viktor Frankl का सिद्धांत: "जिसके पास जीने का कारण है वह किसी भी कैसे को सह सकता है।" 3 प्रश्न पूछो: (1) मुझे अगले 6 months में क्या accomplish करना है? (2) किसके लिए जी रहा हूँ? (3) क्या unique contribution मैं इस world में दे सकता हूँ?',
      vedanticReframe: 'तुम न जन्मे थे, न मरोगे — तुम अनंत आत्मा हो। यह जीवन एक पाठशाला है, destination नहीं। हर experience — अच्छा या बुरा — तुम्हें ऊँचा करने के लिए है।',
      action24h: 'आज 20 मिनट की "Vipassana walk" करो: बाहर जाओ, चलो — लेकिन phone बंद रखो। बस nature को observe करो। इस विशाल existence का हिस्सा feel करो।',
      mantra: 'ॐ तत् सत् — यह परम सत्य है।',
    }
  },
];

const DEFAULT_RESP = (): KrishnaResponse => ({
  empathy: 'हे प्रिय पार्थ! तुमने जो साझा किया — मैं इसे पूरी तरह सुन रहा हूँ। हर कष्ट, हर संशय — मेरे लिए महत्वपूर्ण है।',
  diagnosis: 'तुम्हारे मन में कोई बड़ा प्रश्न या कष्ट है। जीवन का यह संघर्ष — यह तुम्हें कमज़ोर नहीं बना रहा, बल्कि गहरा कर रहा है।',
  counsel: 'पार्थ! जो भी परिस्थिति है — वह temporary है। तुम्हारी आत्मा permanent है। इस कुरुक्षेत्र में — चाहे वह career का हो, रिश्ते का हो, या मन का — मेरा संदेश एक ही है: अपने धर्म पर टिको, श्रेष्ठ कर्म करो, और फल मुझे सौंपो। मैं तुम्हारे साथ हूँ — हर श्वास में।',
  shloka: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥',
  shlokaTranslit: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja | ahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ ||',
  shlokaHindi: 'सब धर्मों को छोड़कर केवल मेरी शरण में आ जाओ। मैं तुम्हें सभी पापों और बंधनों से मुक्त करूंगा — शोक मत करो।',
  chapter: 18, verse: 66,
  cbtTechnique: 'Mindful Inquiry (सचेत जिज्ञासा)',
  cbtExercise: 'अभी एक काम करो: एक कागज़ पर लिखो — "मेरी असली समस्या क्या है?" फिर उसके 3 possible solutions लिखो। कोई भी solution perfect नहीं होगा — लेकिन options देखने से helplessness कम होती है।',
  vedanticReframe: 'यह सब — यह कष्ट, यह संघर्ष — यह तुम्हारी आत्मा की परीक्षा है, दंड नहीं। हर महान आत्मा इस परीक्षा से गुज़री है।',
  action24h: 'आज 10 मिनट के लिए शांत बैठो। श्वास पर ध्यान दो। फिर एक छोटा, concrete step लो जो तुम्हारी situation को 1% better करे।',
  mantra: 'ॐ शरणं गच्छामि — मैं शरण लेता हूँ।',
});

function getResponse(text: string): KrishnaResponse {
  const lower = text.toLowerCase();
  for (const item of KB) {
    if (item.keys.some(k => lower.includes(k))) return item.response;
  }
  return DEFAULT_RESP();
}

// ── Quick prompt suggestions ─────────────────────────────────────────────────
const QUICK_PROMPTS = [
  { icon: '😰', label: 'चिंता / Anxiety', text: 'मुझे बहुत anxiety और घबराहट हो रही है, मन शांत नहीं है' },
  { icon: '😔', label: 'उदासी / Depression', text: 'मैं बहुत उदास और hopeless feel कर रहा हूँ, अंधेरा सा लग रहा है' },
  { icon: '🔥', label: 'क्रोध / Anger', text: 'मुझे किसी ने बहुत hurt किया है, मुझे बहुत गुस्सा आ रहा है' },
  { icon: '💔', label: 'दिल टूटा', text: 'मेरा breakup हुआ है, दिल टूट गया है बहुत अकेलापन लग रहा है' },
  { icon: '🎯', label: 'Career Fail', text: 'मेरा career में बहुत बड़ी असफलता आई है नहीं पता आगे क्या करूं' },
  { icon: '👨‍👩‍👧', label: 'Family झगड़ा', text: 'घर में बहुत झगड़े हो रहे हैं माता-पिता से बहुत conflict है' },
  { icon: '😞', label: 'खुद पर शक', text: 'मुझे खुद पर बिल्कुल भरोसा नहीं है लगता है मैं कुछ भी नहीं कर सकता' },
  { icon: '🛋️', label: 'आलस्य', text: 'बहुत आलस है कुछ करने का मन नहीं energy ही नहीं आती कहीं से' },
  { icon: '😶', label: 'अकेलापन', text: 'बहुत अकेला feel कर रहा हूँ कोई नहीं समझता मुझे' },
  { icon: '🔮', label: 'जीवन का अर्थ', text: 'जीवन का कोई अर्थ नहीं दिख रहा क्या है सब यह? क्यों हूँ मैं यहाँ?' },
];

const GREETING: Msg = {
  role: 'krishna', ts: Date.now(),
  text: `प्रिय पार्थ, जय श्रीकृष्ण! 🙏\n\nमैं — श्रीकृष्ण — तुम्हारा सखा, गुरु, और परमात्मा — तुम्हारे साथ हूँ।\n\nतुम जो भी पीड़ा, प्रश्न या संकट लेकर आए हो — बेझिझक बताओ। मैं तुम्हें देूंगा:\n\n🕉️ गीता का प्रत्यक्ष श्लोक + अर्थ\n🧠 मनोवैज्ञानिक CBT दृष्टिकोण + व्यायाम\n🌿 वेदांतिक perspective shift\n⚡ अगले 24 घंटे का concrete action\n🕯️ एक मंत्र जो तुम्हें शक्ति दे\n\nकोई judgement नहीं। कोई lecture नहीं। पूरा प्रेम।\n\nबोलो — क्या कष्ट है?`,
};

export default function KrishnaAIChat() {
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const { playTrack } = useGlobalAudio();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    sacredAudio.playNavChime(0.05);
    setMsgs(p => [...p, { role: 'user', text: text.trim(), ts: Date.now() }]);
    setInput('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 900 + Math.random() * 700));
    const resp = getResponse(text);
    setMsgs(p => [...p, { role: 'krishna', text: resp.counsel, response: resp, ts: Date.now() }]);
    setLoading(false);
    sacredAudio.playFluteChime(0.25);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    sacredAudio.playNavChime(0.06);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col rounded-3xl overflow-hidden border-2 border-amber-400/35 bg-[#07080d] shadow-[0_25px_100px_rgba(0,0,0,0.9)]" style={{ height: 'min(780px, 92vh)' }}>

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#0e1020] to-[#141830] border-b border-amber-400/20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-600 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.6)] animate-glow-pulse">
              <span className="font-devanagari text-xl font-black text-[#07080d]">कृ</span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#07080d]" />
          </div>
          <div>
            <p className="text-sm font-bold text-amber-300 font-serif">श्रीकृष्ण — परम सखा व गुरु</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online • सदा उपस्थित
              </span>
              <span className="text-[10px] font-mono text-[#c5a059]/60">CBT + गीता + वेदांत</span>
            </div>
          </div>
        </div>
        <button onClick={() => { setMsgs([GREETING]); sacredAudio.playTempleBell(0.3); }}
          className="p-2 rounded-xl bg-[#1a1e30] border border-[#c5a059]/20 text-[#c5a059]/60 hover:text-amber-300 cursor-pointer transition-all" title="नई बातचीत">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar">
        {msgs.map((m, i) => (
          <div key={i} className={`flex gap-3 animate-fade-in ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            {m.role === 'krishna' ? (
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shrink-0 shadow-lg mt-1">
                <span className="font-devanagari text-base font-black text-[#07080d]">कृ</span>
              </div>
            ) : (
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shrink-0 shadow-md mt-1">
                <span className="text-sm font-bold text-white">आप</span>
              </div>
            )}

            <div className={`max-w-[88%] space-y-2.5 ${m.role === 'user' ? 'items-end flex flex-col' : ''}`}>

              {/* Main bubble */}
              <div className={`px-4 py-3 rounded-2xl text-sm font-serif leading-relaxed shadow-md ${
                m.role === 'user'
                  ? 'bg-gradient-to-br from-indigo-600/35 to-blue-600/25 border border-indigo-400/25 text-[#f5eed9] rounded-tr-sm'
                  : 'bg-gradient-to-br from-[#181b2e] to-[#0f111c] border border-amber-400/20 text-[#f5eed9] rounded-tl-sm'
              }`}>
                {m.role === 'krishna' && m.response && (
                  <>
                    {/* Empathy first */}
                    <p className="text-[11px] text-amber-300/80 font-mono mb-1.5">❤️ {m.response.empathy}</p>
                    <p className="text-[11px] text-blue-300/80 font-mono mb-2.5 italic">🧠 मनो-निदान: {m.response.diagnosis}</p>
                    <p className="text-sm font-serif leading-relaxed text-[#f5eed9]">{m.text}</p>
                  </>
                )}
                {m.role === 'user' && <p>{m.text}</p>}
                {m.role === 'krishna' && !m.response && (
                  m.text.split('\n').map((l, li) => <span key={li}>{l}<br/></span>)
                )}
              </div>

              {/* Extended response cards (only for krishna with response) */}
              {m.role === 'krishna' && m.response && (
                <div className="w-full space-y-2">

                  {/* Shloka Card */}
                  <div className="rounded-2xl bg-gradient-to-br from-[#0e0c1a] to-[#090b14] border border-amber-400/35 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-amber-400/15">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-lg bg-amber-400 text-black text-[10px] font-mono font-bold">
                          ॥ {m.response.chapter}.{m.response.verse} ॥
                        </span>
                        <span className="text-[10px] text-amber-300/70 font-serif">कृष्णोवाच — श्लोक</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => { playTrack(m.response!.chapter, m.response!.verse, m.response!.shloka, 'Krishna Counsel'); sacredAudio.playFluteChime(0.3); }}
                          className="p-1.5 rounded-lg bg-amber-400/15 border border-amber-400/25 text-amber-300 hover:bg-amber-400 hover:text-black cursor-pointer transition-all"
                          title="सुनें">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <Link href={`/chapter/${m.response.chapter}/${m.response.verse}`}
                          onClick={() => sacredAudio.playTempleBell(0.2)}
                          className="p-1.5 rounded-lg bg-[#141624] border border-[#c5a059]/20 text-[#c5a059] hover:text-amber-300 cursor-pointer transition-all"
                          title="सम्पूर्ण अध्ययन">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <button onClick={() => handleCopy(m.response!.shloka + '\n— ' + m.response!.shlokaHindi)}
                          className="p-1.5 rounded-lg bg-[#141624] border border-[#c5a059]/20 text-[#c5a059] hover:text-amber-300 cursor-pointer">
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <p className="font-devanagari text-sm text-yellow-200 leading-[1.9]">{m.response.shloka}</p>
                      <p className="text-[10px] font-mono text-amber-400/60 italic">{m.response.shlokaTranslit}</p>
                      <p className="text-xs text-[#f5eed9]/75 font-serif leading-relaxed border-t border-amber-400/10 pt-2">{m.response.shlokaHindi}</p>
                    </div>
                  </div>

                  {/* Expandable detail cards */}
                  <button onClick={() => setExpandedCard(expandedCard === i ? null : i)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#141624] border border-[#c5a059]/15 text-[11px] font-serif text-[#c5a059]/70 hover:border-amber-400/30 cursor-pointer transition-all">
                    <span>CBT व्यायाम • वेदांत दृष्टि • 24h Action • मंत्र</span>
                    {expandedCard === i ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {expandedCard === i && (
                    <div className="space-y-2 animate-fade-in">

                      {/* CBT */}
                      <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-400/25">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="w-4 h-4 text-blue-400" />
                          <span className="text-[11px] font-mono text-blue-300 font-bold">🧠 {m.response.cbtTechnique}</span>
                        </div>
                        <p className="text-xs text-blue-100/90 font-serif leading-relaxed">{m.response.cbtExercise}</p>
                      </div>

                      {/* Vedantic Reframe */}
                      <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-400/25">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-purple-400" />
                          <span className="text-[11px] font-mono text-purple-300 font-bold">🕉️ वेदांत दृष्टिकोण</span>
                        </div>
                        <p className="text-xs text-purple-100/90 font-serif leading-relaxed">{m.response.vedanticReframe}</p>
                      </div>

                      {/* 24h Action */}
                      <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-400/25">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-emerald-400" />
                          <span className="text-[11px] font-mono text-emerald-300 font-bold">⚡ अगले 24 घंटे — यह करो</span>
                        </div>
                        <p className="text-xs text-emerald-100/90 font-serif leading-relaxed">{m.response.action24h}</p>
                      </div>

                      {/* Mantra */}
                      <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/25 text-center">
                        <span className="text-[10px] font-mono text-amber-400/70 block mb-1">🕯️ आज का मंत्र:</span>
                        <p className="font-devanagari text-sm text-amber-300 font-semibold leading-relaxed">{m.response.mantra}</p>
                      </div>

                      {/* Crisis warning if present */}
                      {m.response.warning && (
                        <div className="p-3 rounded-2xl bg-red-500/15 border border-red-400/40 flex items-start gap-2">
                          <Phone className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          <p className="text-xs text-red-200 font-serif leading-relaxed">{m.response.warning}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shrink-0">
              <span className="font-devanagari text-base font-black text-[#07080d]">कृ</span>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-[#181b2e] border border-amber-400/20">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{animationDelay:'0ms'}} />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{animationDelay:'160ms'}} />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{animationDelay:'320ms'}} />
                <span className="ml-2 text-[10px] font-serif text-amber-400/70">श्रीकृष्ण विचार कर रहे हैं…</span>
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* ── Quick Prompts (only when fresh) ── */}
      {msgs.length <= 1 && (
        <div className="px-3 pb-1 pt-0 shrink-0">
          <p className="text-[10px] font-mono text-[#c5a059]/50 mb-1.5 text-center">अपनी समस्या चुनें:</p>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.map((q, i) => (
              <button key={i} onClick={() => send(q.text)}
                className="px-2.5 py-1.5 rounded-xl bg-[#141624] border border-[#c5a059]/18 hover:border-amber-400/50 text-[11px] font-serif text-[#e6c687] flex items-center gap-1.5 cursor-pointer transition-all hover:bg-[#1a1e33]">
                <span>{q.icon}</span><span>{q.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Input ── */}
      <form onSubmit={e => { e.preventDefault(); send(input); }} className="px-3 pb-3 pt-2 shrink-0">
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-[#141624] border-2 border-[#c5a059]/25 focus-within:border-amber-400 transition-all">
          <input
            type="text" value={input} onChange={e => setInput(e.target.value)}
            placeholder="अपनी पीड़ा लिखें — Hindi या English, जो भी मन में आए…"
            className="flex-1 bg-transparent text-sm font-serif text-[#f5eed9] placeholder-[#c5a059]/35 outline-none px-2"
            disabled={loading}
          />
          <button type="submit" disabled={!input.trim() || loading}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-black disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-all cursor-pointer shadow-md shrink-0">
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-center text-[10px] font-mono text-[#c5a059]/35 mt-1.5">
          ❤️ + 🧠 + 🕉️ = कृष्ण वचन × CBT × वेदांत — तुम्हारे लिए
        </p>
      </form>
    </div>
  );
}
