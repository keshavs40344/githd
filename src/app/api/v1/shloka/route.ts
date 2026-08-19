import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Canonical fallback database of landmark verses
const CANONICAL_VERSES: Record<string, {
  devanagari: string;
  iast: string;
  translation_hi: string;
  translation_en: string;
  practical_insight: string;
  bhashya_hi?: string;
  bhashya_en?: string;
  anvaya_tokens: Array<{ word: string; iast: string; dhatu: string; vibhakti: string; meaning_hi: string; meaning_en: string; }>;
}> = {
  '1_1': {
    devanagari: "धृतराष्ट्र उवाच |\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय || १-१ ||",
    iast: "dhṛtarāṣṭra uvāca\ndharmakṣetre kurukṣetre samavetā yuyutsavaḥ\nmāmakāḥ pāṇḍavāścaiva kimakurvata sañjaya",
    translation_hi: "धृतराष्ट्र ने कहा: हे संजय! धर्मभूमि कुरुक्षेत्र में युद्ध की इच्छा से एकत्र हुए मेरे और पाण्डु के पुत्रों ने क्या किया?",
    translation_en: "Dhritarashtra said: O Sanjaya, assembled on the holy field of Kurukshetra, eager to fight, what did my sons and the sons of Pandu do?",
    bhashya_hi: "श्रीमद्भगवद्गीता का प्रथम श्लोक 'धर्म' शब्द से प्रारम्भ होता है। यह संसार ही 'कुरुक्षेत्र' (कर्मभूमि) है और मानव हृदय 'धर्मक्षेत्र' है जहाँ सदा सद्गुणों और दुर्गुणों का संघर्ष चलता रहता है।",
    bhashya_en: "The Gita opens with the word 'Dharma'. The battlefield of Kurukshetra symbolizes the moral and psychological battlefield of human life, where duty and illusion constantly collide.",
    practical_insight: "Identify your daily mental battlefield. Before making crucial decisions, discern between ego-driven desires (Mamakah) and righteous duty (Dharma).",
    anvaya_tokens: [
      { word: "धर्मक्षेत्रे", iast: "dharmakṣetre", dhatu: "kṣetra", vibhakti: "Locative Singular", meaning_hi: "धर्मभूमि में", meaning_en: "in the sacred field of Dharma" },
      { word: "कुरुक्षेत्रे", iast: "kurukṣetre", dhatu: "kuru", vibhakti: "Locative Singular", meaning_hi: "कुरुक्षेत्र में", meaning_en: "in the field of the Kurus" },
      { word: "समवेताः", iast: "samavetāḥ", dhatu: "i", vibhakti: "Nominative Plural", meaning_hi: "एकत्र हुए", meaning_en: "assembled together" },
      { word: "युयुत्सवः", iast: "yuyutsavaḥ", dhatu: "yudh", vibhakti: "Nominative Plural", meaning_hi: "युद्ध की इच्छा वाले", meaning_en: "desirous of fighting" },
      { word: "मामकाः", iast: "māmakāḥ", dhatu: "mama", vibhakti: "Nominative Plural", meaning_hi: "मेरे पक्ष के (पुत्र)", meaning_en: "my sons / party" },
      { word: "पाण्डवाः", iast: "pāṇḍavāḥ", dhatu: "pāṇḍu", vibhakti: "Nominative Plural", meaning_hi: "पाण्डु के पुत्र", meaning_en: "the sons of Pandu" },
      { word: "च", iast: "ca", dhatu: "-", vibhakti: "Indeclinable", meaning_hi: "और", meaning_en: "and" },
      { word: "एव", iast: "eva", dhatu: "-", vibhakti: "Indeclinable", meaning_hi: "ही", meaning_en: "certainly" },
      { word: "किम्", iast: "kim", dhatu: "-", vibhakti: "Accusative Singular", meaning_hi: "क्या", meaning_en: "what" },
      { word: "अकुर्वत", iast: "akurvata", dhatu: "kṛ", vibhakti: "Past Imperfect 3rd Plural", meaning_hi: "किया", meaning_en: "did they do" },
      { word: "सञ्जय", iast: "sañjaya", dhatu: "ji", vibhakti: "Vocative Singular", meaning_hi: "हे संजय", meaning_en: "O Sanjaya" }
    ]
  },
  '2_47': {
    devanagari: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन |\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि || २-४७ ||",
    iast: "karmaṇyevādhikāraste mā phaleṣu kadācana\nmā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi",
    translation_hi: "तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए कर्मफल के हेतु मत बनो और कर्म न करने में भी तुम्हारी आसक्ति न हो।",
    translation_en: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to inaction.",
    bhashya_hi: "निष्काम कर्मयोग का यह परम सूत्र है। फल की चिंता मानसिक अशांति और व्याकुलता उत्पन्न करती है, जबकि पूर्ण समर्पण के साथ किया गया कर्म चेतना को मुक्त करता है।",
    bhashya_en: "This is the supreme aphorism of Nishkama Karma Yoga. Focusing on results creates performance anxiety, while selfless execution frees the intellect into state of flow.",
    practical_insight: "Shift focus from 'What will I get?' to 'What value can I give right now?'. Detachment from outcomes yields absolute mastery over current execution.",
    anvaya_tokens: [
      { word: "कर्मणि", iast: "karmaṇi", dhatu: "kṛ", vibhakti: "Locative Singular", meaning_hi: "कर्म में", meaning_en: "in prescribed action" },
      { word: "एव", iast: "eva", dhatu: "-", vibhakti: "Indeclinable", meaning_hi: "ही", meaning_en: "only / certainly" },
      { word: "अधिकारः", iast: "adhikāraḥ", dhatu: "adhikṛ", vibhakti: "Nominative Singular", meaning_hi: "अधिकार", meaning_en: "right / entitlement" },
      { word: "ते", iast: "te", dhatu: "yuṣmad", vibhakti: "Genitive Singular", meaning_hi: "तुम्हारा", meaning_en: "your" },
      { word: "मा", iast: "mā", dhatu: "-", vibhakti: "Indeclinable", meaning_hi: "कभी नहीं", meaning_en: "never / not" },
      { word: "फलेषु", iast: "phaleṣu", dhatu: "phala", vibhakti: "Locative Plural", meaning_hi: "फलों में", meaning_en: "in the results / fruits" },
      { word: "कदाचन", iast: "kadācana", dhatu: "-", vibhakti: "Indeclinable", meaning_hi: "किसी भी काल में", meaning_en: "at any time" },
      { word: "अकर्मणि", iast: "akarmaṇi", dhatu: "-", vibhakti: "Locative Singular", meaning_hi: "कर्म त्याग में", meaning_en: "in inaction / passivity" }
    ]
  }
};

const LANGUAGE_NAMES: Record<string, string> = {
  hi: 'Hindi (हिन्दी)',
  en: 'English',
  mr: 'Marathi (मराठी)',
  gu: 'Gujarati (ગુજરાતી)',
  bn: 'Bengali (বাংলা)',
  ta: 'Tamil (தமிழ்)',
  te: 'Telugu (తెలుగు)',
  kn: 'Kannada (ಕನ್ನಡ)',
  sa: 'Sanskrit (संस्कृतम्)'
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const chapter = parseInt(searchParams.get('chapter') || '2', 10);
    const verse = parseInt(searchParams.get('verse') || '47', 10);
    const lang = searchParams.get('lang') || 'hi';

    const key = `${chapter}_${verse}`;
    const cached = CANONICAL_VERSES[key];

    // If cached and language is hi or en, return immediately
    if (cached && (lang === 'hi' || lang === 'en')) {
      return NextResponse.json({
        success: true,
        chapter,
        verse,
        language: lang,
        languageName: LANGUAGE_NAMES[lang] || lang,
        data: cached
      });
    }

    // Call Gemini/Groq Dual Engine for dynamic Shloka retrieval & multi-language translation
    const geminiKey = process.env.GEMINI_API_KEY || '';
    const groqKey = process.env.GROQ_API_KEY || '';

    const langName = LANGUAGE_NAMES[lang] || lang;
    const prompt = `You are the authentic Vedic Sanskrit scholar and exegete of Srimad Bhagavad Gita.
Provide the complete authentic data for Bhagavad Gita Chapter ${chapter}, Verse ${verse} in ${langName}.

Return ONLY valid JSON with this exact schema:
{
  "devanagari": "Authentic Sanskrit shloka in Devanagari script with meter formatting and verse numbering || ${chapter}-${verse} ||",
  "iast": "Roman IAST transliteration of the shloka",
  "translation": "Complete, accurate, soul-uplifting translation in ${langName}",
  "bhashya": "Deep philosophical commentary, contextual background and spiritual explanation in ${langName}",
  "practical_insight": "Actionable real-world insight for modern life, mental peace, decision-making, and emotional resilience in ${langName}",
  "anvaya_tokens": [
    {
      "word": "Sanskrit word",
      "iast": "Roman transliteration",
      "dhatu": "Root verb or stem",
      "vibhakti": "Grammatical case/inflection",
      "meaning": "Meaning in ${langName}"
    }
  ]
}`;

    // Try Groq First (High-speed)
    if (groqKey) {
      try {
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: 'You are an authentic Vedic scripture scholar. Output pure JSON only.' },
              { role: 'user', content: prompt }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.2
          })
        });

        if (groqRes.ok) {
          const gData = await groqRes.json();
          const parsed = JSON.parse(gData.choices[0].message.content);
          return NextResponse.json({
            success: true,
            chapter,
            verse,
            language: lang,
            languageName: langName,
            data: {
              devanagari: parsed.devanagari,
              iast: parsed.iast,
              translation_hi: lang === 'hi' ? parsed.translation : (cached?.translation_hi || parsed.translation),
              translation_en: lang === 'en' ? parsed.translation : (cached?.translation_en || parsed.translation),
              translation_target: parsed.translation,
              bhashya_target: parsed.bhashya,
              practical_insight: parsed.practical_insight,
              anvaya_tokens: parsed.anvaya_tokens || []
            }
          });
        }
      } catch (err) {
        console.warn('Groq Shloka lookup failed, trying Gemini:', err);
      }
    }

    // Fallback: Gemini Engine
    if (geminiKey) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: prompt }] }],
              generationConfig: {
                responseMimeType: 'application/json',
                temperature: 0.2
              }
            })
          }
        );

        if (geminiRes.ok) {
          const gemData = await geminiRes.json();
          const rawText = gemData.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
          const parsed = JSON.parse(rawText);
          return NextResponse.json({
            success: true,
            chapter,
            verse,
            language: lang,
            languageName: langName,
            data: {
              devanagari: parsed.devanagari,
              iast: parsed.iast,
              translation_hi: lang === 'hi' ? parsed.translation : (cached?.translation_hi || parsed.translation),
              translation_en: lang === 'en' ? parsed.translation : (cached?.translation_en || parsed.translation),
              translation_target: parsed.translation,
              bhashya_target: parsed.bhashya,
              practical_insight: parsed.practical_insight,
              anvaya_tokens: parsed.anvaya_tokens || []
            }
          });
        }
      } catch (err) {
        console.warn('Gemini Shloka lookup failed:', err);
      }
    }

    // Fallback to cached default
    return NextResponse.json({
      success: true,
      chapter,
      verse,
      language: lang,
      languageName: langName,
      data: cached || CANONICAL_VERSES['2_47']
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Shloka lookup error'
    }, { status: 500 });
  }
}
