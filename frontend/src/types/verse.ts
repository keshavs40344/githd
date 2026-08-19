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
}

export const CHAPTERS: Chapter[] = [
  { number: 1, name_en: 'Arjuna\'s Dilemma', name_sanskrit: 'अर्जुनविषादयोग', verse_count: 47 },
  { number: 2, name_en: 'Transcendent Knowledge', name_sanskrit: 'सांख्ययोग', verse_count: 72 },
  { number: 3, name_en: 'The Yoga of Action', name_sanskrit: 'कर्मयोग', verse_count: 43 },
  { number: 4, name_en: 'The Yoga of Knowledge', name_sanskrit: 'ज्ञानकर्मसंन्यासयोग', verse_count: 42 },
  { number: 5, name_en: 'The Yoga of Renunciation', name_sanskrit: 'कर्मसंन्यासयोग', verse_count: 29 },
  { number: 6, name_en: 'The Yoga of Meditation', name_sanskrit: 'ध्यानयोग', verse_count: 47 },
  { number: 7, name_en: 'Knowledge & Wisdom', name_sanskrit: 'ज्ञानविज्ञानयोग', verse_count: 30 },
  { number: 8, name_en: 'The Imperishable Brahman', name_sanskrit: 'अक्षरब्रह्मयोग', verse_count: 28 },
  { number: 9, name_en: 'Sovereign Knowledge', name_sanskrit: 'राजविद्याराजगुह्ययोग', verse_count: 34 },
  { number: 10, name_en: 'Divine Manifestations', name_sanskrit: 'विभूतियोग', verse_count: 42 },
  { number: 11, name_en: 'The Universal Form', name_sanskrit: 'विश्वरूपदर्शनयोग', verse_count: 55 },
  { number: 12, name_en: 'The Yoga of Devotion', name_sanskrit: 'भक्तियोग', verse_count: 20 },
  { number: 13, name_en: 'The Field & Knower', name_sanskrit: 'क्षेत्रक्षेत्रज्ञविभागयोग', verse_count: 34 },
  { number: 14, name_en: 'The Three Gunas', name_sanskrit: 'गुणत्रयविभागयोग', verse_count: 27 },
  { number: 15, name_en: 'The Supreme Person', name_sanskrit: 'पुरुषोत्तमयोग', verse_count: 20 },
  { number: 16, name_en: 'Divine & Demonic Natures', name_sanskrit: 'दैवासुरसम्पद्विभागयोग', verse_count: 24 },
  { number: 17, name_en: 'Three Divisions of Faith', name_sanskrit: 'श्रद्धात्रयविभागयोग', verse_count: 28 },
  { number: 18, name_en: 'Liberation Through Renunciation', name_sanskrit: 'मोक्षसंन्यासयोग', verse_count: 78 },
];
