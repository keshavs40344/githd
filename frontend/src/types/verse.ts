export interface AnvayaToken {
  word: string;
  iast: string;
  dhatu: string;
  vibhakti: string;
  meaning_en: string;
  meaning_hi: string;
}

export interface GitaVerse {
  chapter: number;
  verse: number;
  devanagari: string;
  iast: string;
  translation_en: string;
  translation_hi: string;
  practical_insight: string;
  anvaya_tokens: AnvayaToken[];
}

export interface Chapter {
  number: number;
  name_en: string;
  name_sanskrit: string;
  verse_count: number;
  verses_count: number;
  summary_hi: string;
}

export type ChapterInfo = Chapter;

export const CHAPTERS: Chapter[] = [
  { number: 1, name_en: "Arjuna's Dilemma", name_sanskrit: 'अर्जुनविषादयोग', verse_count: 47, verses_count: 47, summary_hi: 'कुरुक्षेत्र की रणभूमि में अर्जुन का विषाद, मोह और श्रीकृष्ण से शरणागति का प्रथम संवाद।' },
  { number: 2, name_en: 'Transcendent Knowledge', name_sanskrit: 'सांख्ययोग', verse_count: 72, verses_count: 72, summary_hi: 'आत्मा की अमरता, निष्काम कर्मयोग का सिद्धान्त और स्थितप्रज्ञ के लक्षण।' },
  { number: 3, name_en: 'The Yoga of Action', name_sanskrit: 'कर्मयोग', verse_count: 43, verses_count: 43, summary_hi: 'कर्म की अनिवार्यता, यज्ञ चक्र और अनासक्त भाव से श्रेष्ठ कर्म का मार्ग।' },
  { number: 4, name_en: 'The Yoga of Knowledge', name_sanskrit: 'ज्ञानकर्मसंन्यासयोग', verse_count: 42, verses_count: 42, summary_hi: 'अवतार का दिव्य रहस्य, ज्ञान की अग्नि और कर्म संन्यास का समन्वय।' },
  { number: 5, name_en: 'The Yoga of Renunciation', name_sanskrit: 'कर्मसंन्यासयोग', verse_count: 29, verses_count: 29, summary_hi: 'संन्यास और कर्मयोग की एकता तथा आत्म-साक्षात्कार से परम शांति की प्राप्ति।' },
  { number: 6, name_en: 'The Yoga of Meditation', name_sanskrit: 'ध्यानयोग', verse_count: 47, verses_count: 47, summary_hi: 'अष्टांग ध्यान साधना, मन पर नियंत्रण और योगी की दिव्य अवस्था।' },
  { number: 7, name_en: 'Knowledge & Wisdom', name_sanskrit: 'ज्ञानविज्ञानयोग', verse_count: 30, verses_count: 30, summary_hi: 'ईश्वर की परा और अपरा प्रकृति तथा चार प्रकार के भक्तों का वर्णन।' },
  { number: 8, name_en: 'The Imperishable Brahman', name_sanskrit: 'अक्षरब्रह्मयोग', verse_count: 28, verses_count: 28, summary_hi: 'अक्षर ब्रह्म की प्राप्ति, ॐ का ध्यान और प्रयाणकाल (अंतिम समय) का स्मरण।' },
  { number: 9, name_en: 'Sovereign Knowledge', name_sanskrit: 'राजविद्याराजगुह्ययोग', verse_count: 34, verses_count: 34, summary_hi: 'परम गोपनीय राजविद्या, भक्ति का महात्म्य और योगक्षेम वहन करने का वचन।' },
  { number: 10, name_en: 'Divine Manifestations', name_sanskrit: 'विभूतियोग', verse_count: 42, verses_count: 42, summary_hi: 'समस्त ब्रह्मांड में भगवान श्रीकृष्ण की अलौकिक विभूतियों का भव्य दर्शन।' },
  { number: 11, name_en: 'The Universal Form', name_sanskrit: 'विश्वरूपदर्शनयोग', verse_count: 55, verses_count: 55, summary_hi: 'दिव्य चक्षु द्वारा भगवान के काल स्वरूप विराट विश्वरूप का साक्षात् दर्शन।' },
  { number: 12, name_en: 'The Yoga of Devotion', name_sanskrit: 'भक्तियोग', verse_count: 20, verses_count: 20, summary_hi: 'सगुण और निर्गुण भक्ति तथा श्रीकृष्ण के सबसे प्रिय भक्त के दिव्य लक्षण।' },
  { number: 13, name_en: 'The Field & Knower', name_sanskrit: 'क्षेत्रक्षेत्रज्ञविभागयोग', verse_count: 34, verses_count: 34, summary_hi: 'प्रकृति (क्षेत्र) और आत्मा (क्षेत्रज्ञ) का वैज्ञानिक व आध्यात्मिक भेद।' },
  { number: 14, name_en: 'The Three Gunas', name_sanskrit: 'गुणत्रयविभागयोग', verse_count: 27, verses_count: 27, summary_hi: 'सत्त्व, रज और तम तीनों गुणों का बंधन और गुणातीत बनने का मार्ग।' },
  { number: 15, name_en: 'The Supreme Person', name_sanskrit: 'पुरुषोत्तमयोग', verse_count: 20, verses_count: 20, summary_hi: 'उलटे संसार रूपी अश्वत्थ वृक्ष का छेदन और पुरुषोत्तम तत्व का रहस्य।' },
  { number: 16, name_en: 'Divine & Demonic Natures', name_sanskrit: 'दैवासुरसम्पद्विभागयोग', verse_count: 24, verses_count: 24, summary_hi: 'दैवी और आसुरी प्रवृत्तियों का वर्गीकरण तथा काम-क्रोध-लोभ के नरक द्वार।' },
  { number: 17, name_en: 'Three Divisions of Faith', name_sanskrit: 'श्रद्धात्रयविभागयोग', verse_count: 28, verses_count: 28, summary_hi: 'त्रिविध श्रद्धा, आहार, यज्ञ, तप, दान और ॐ तत् सत् का मन्त्र महात्म्य।' },
  { number: 18, name_en: 'Liberation Through Renunciation', name_sanskrit: 'मोक्षसंन्यासयोग', verse_count: 78, verses_count: 78, summary_hi: 'त्याग और संन्यास का पूर्ण सार, सर्वधर्मान्परित्यज्य और शरणागति का महा-संदेश।' },
];
