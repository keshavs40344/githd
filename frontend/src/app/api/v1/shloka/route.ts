import { NextRequest, NextResponse } from 'next/server';
import { getComprehensiveVerse } from '@/data/canonicalGitaTranslations';
import { generateUniversalVedicData, getDeepSampradayaCommentary } from '@/lib/universalVedicEngine';
import { CHAPTERS } from '@/types/verse';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const chapter = parseInt(searchParams.get('chapter') || '1', 10);
    const verse = parseInt(searchParams.get('verse') || '1', 10);
    const lang = searchParams.get('lang') || 'hinglish';

    const chInfo = CHAPTERS.find(c => c.number === chapter) || CHAPTERS[0];

    // 1. Check Canonical Landmark Verses
    const canonical = getComprehensiveVerse(chapter, verse);
    if (canonical) {
      const selectedTranslation = canonical.translation[lang] || canonical.translation.hinglish || canonical.translation.hi || canonical.translation.en;
      const selectedBhashya = canonical.deep_bhashya[lang] || canonical.deep_bhashya.hinglish || canonical.deep_bhashya.hi || canonical.deep_bhashya.en;
      const selectedInsight = canonical.practical_insight[lang] || canonical.practical_insight.hinglish || canonical.practical_insight.hi || canonical.practical_insight.en;

      const localizedAnvaya = canonical.word_anvaya.map(w => ({
        word: w.word,
        iast: w.iast,
        dhatu: w.dhatu || '-',
        vibhakti: w.vibhakti || '-',
        meaning: w.meaning[lang] || w.meaning.hinglish || w.meaning.hi || w.meaning.en || '-'
      }));

      return NextResponse.json({
        success: true,
        chapter,
        verse,
        language: lang,
        data: {
          devanagari: canonical.devanagari,
          iast: canonical.iast,
          translation: selectedTranslation,
          deep_bhashya: selectedBhashya,
          practical_insight: selectedInsight,
          anvaya_tokens: localizedAnvaya
        }
      });
    }

    // 2. Dynamic AI Generation with strict Scholarly depth
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;

    const langNameMap: Record<string, string> = {
      hinglish: 'Hinglish (Natural conversational Hindi written in Roman script)',
      hi: 'Pure Hindi (शुद्ध हिन्दी)',
      en: 'English',
      sa: 'Sanskrit (संस्कृतम्)',
      mr: 'Marathi (मराठी)',
      gu: 'Gujarati (ગુજરાતી)',
      bn: 'Bengali (বাংলা)',
      ta: 'Tamil (தமிழ்)',
      te: 'Telugu (తెలుగు)',
      kn: 'Kannada (ಕನ್ನಡ)',
      ml: 'Malayalam (മലയാളം)',
      pa: 'Punjabi (ਪੰਜਾਬੀ)',
      od: 'Odia (ଓଡ଼ିଆ)',
      es: 'Spanish',
      fr: 'French',
      de: 'German',
      ru: 'Russian',
      ja: 'Japanese'
    };

    const langDescription = langNameMap[lang] || lang;

    const prompt = `You are an authoritative Vedic Sanskrit scholar and Vedanta philosopher.
Provide a complete, authentic, highly detailed 5-tier exegesis of Shrimad Bhagavad Gita Chapter ${chapter} (${chInfo.name_sanskrit} - ${chInfo.name_en}), Verse ${verse}.

CRITICAL INSTRUCTIONS:
1. Provide the exact, authentic Devanagari Sanskrit text of Chapter ${chapter}, Verse ${verse} along with IAST transliteration.
2. Provide word-by-word Anvaya breakdown of EVERY Sanskrit word with its root Dhatu, Vibhakti, and meaning in ${langDescription}.
3. Provide a clear, flowing translation in ${langDescription}.
4. Provide a LONG, EXHAUSTIVE, MULTI-PARAGRAPH scholarly commentary (minimum 4 detailed paragraphs / 300+ words) in ${langDescription} covering:
   - Section 1 (प्रसंग): Historical and battlefield context in ${chInfo.name_sanskrit}.
   - Section 2 (तत्त्व मीमांसा): Metaphysical meaning (Consciousness, Atman, Prakriti, Karma, Purusha).
   - Section 3 (आचार्य भाष्य): Classical insights combining Adi Shankaracharya (Advaita) and Ramanujacharya (Vishishtadvaita).
   - Section 4 (मनोवैज्ञानिक दृष्टिकोण): Psychological deconstruction of mental conflict, fear, and focus.
5. Provide a practical modern life blueprint in ${langDescription}.

Respond ONLY in valid JSON with this exact structure:
{
  "devanagari": "संस्कृत श्लोक...",
  "iast": "IAST transliteration...",
  "translation": "Clear flowing translation in ${langDescription}...",
  "deep_bhashya": "Exhaustive multi-paragraph detailed scholarly commentary with section headings...",
  "practical_insight": "Actionable 21st-century modern career/life takeaway...",
  "anvaya_tokens": [
    { "word": "संस्कृत पद", "iast": "iast", "dhatu": "root", "vibhakti": "case", "meaning": "meaning in ${langDescription}" }
  ]
}`;

    if (apiKey) {
      try {
        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.2
            }
          })
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const parsed = JSON.parse(text);
            return NextResponse.json({
              success: true,
              chapter,
              verse,
              language: lang,
              data: parsed
            });
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini dynamic shloka fetch error:', geminiErr);
      }
    }

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
              { role: 'system', content: 'You are a master Vedic Sanskrit scholar. Output ONLY valid JSON.' },
              { role: 'user', content: prompt }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.2
          })
        });

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          const content = groqData.choices?.[0]?.message?.content;
          if (content) {
            const parsed = JSON.parse(content);
            return NextResponse.json({
              success: true,
              chapter,
              verse,
              language: lang,
              data: parsed
            });
          }
        }
      } catch (groqErr) {
        console.warn('Groq dynamic shloka fetch error:', groqErr);
      }
    }

    // 3. Rich Universal Engine Fallback (Guaranteed Multi-Paragraph Depth)
    const fallbackVedic = generateUniversalVedicData(chapter, verse);
    const transObj = fallbackVedic.translation as Record<string, string>;
    const bhashyaObj = fallbackVedic.deep_bhashya as Record<string, string>;
    const insightObj = fallbackVedic.practical_insight as Record<string, string>;

    return NextResponse.json({
      success: true,
      chapter,
      verse,
      language: lang,
      data: {
        devanagari: fallbackVedic.devanagari,
        iast: fallbackVedic.iast,
        translation: transObj[lang] || transObj.hinglish || transObj.hi || transObj.en,
        deep_bhashya: bhashyaObj[lang] || bhashyaObj.hinglish || bhashyaObj.hi || fallbackVedic.sampradaya_notes.universal,
        practical_insight: insightObj[lang] || insightObj.hinglish || insightObj.hi || fallbackVedic.practical_insight.hinglish,
        anvaya_tokens: fallbackVedic.anvaya_tokens.map(t => ({
          word: t.word,
          iast: t.iast,
          dhatu: t.dhatu || '-',
          vibhakti: t.vibhakti || '-',
          meaning: (t.meaning as Record<string, string>)[lang] || (t.meaning as Record<string, string>).hinglish || '-'
        }))
      }
    });

  } catch (error) {
    console.error('Shloka API Fatal Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error while retrieving shloka data' },
      { status: 500 }
    );
  }
}
