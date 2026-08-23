// 100% EXCLUSIVE ULTRA-HD SRI KRISHNA & RADHA ARTWORKS WITH INSTANT RENDERING

export interface KrishnaArt {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  category: 'yugal' | 'parthasarathi' | 'vishwaroop' | 'makhan_chor' | 'govardhan' | 'bansuri';
  tags: string[];
}

export const KRISHNA_ARTWORKS: KrishnaArt[] = [
  {
    id: 'radha_krishna_yugal',
    title: 'श्री राधा-कृष्ण युगल सरकार दिव्य दर्शन',
    subtitle: 'तप्तकाञ्चनगौराङ्गि राधे वृन्दावनेश्वरी — नित्य निकुंज रस एवं महारास दर्शन',
    url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    category: 'yugal',
    tags: ['राधा कृष्ण', 'युगल सरकार', 'वृन्दावन']
  },
  {
    id: 'parthasarathi_updesh',
    title: 'पार्थसारथी श्रीकृष्ण — कुरुक्षेत्र गीता उपदेश',
    subtitle: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत — कुरुक्षेत्र में अर्जुन को दिव्य अमृत ज्ञान',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    category: 'parthasarathi',
    tags: ['पार्थसारथी', 'गीता ज्ञान', 'कुरुक्षेत्र']
  },
  {
    id: 'vishwaroop_darshan',
    title: 'श्रीकृष्ण विश्वरूप विराट दर्शन',
    subtitle: 'दिवि सूर्यसहस्रस्य भवेद्युगपदुत्थिता — सहस्त्रों सूर्यों के तेज से युक्त ब्रह्मांडीय विराट रूप',
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    category: 'vishwaroop',
    tags: ['विश्वरूप', 'विराट रूप', 'परमब्रह्म']
  },
  {
    id: 'banke_bihari_venu',
    title: 'ठाकुर श्री बांके बिहारी — वेणु माधुरी',
    subtitle: 'अधरं मधुरं वदनं मधुरं — त्रिभंगी मुद्रा में मधुर बाँसुरी वादन और नयन कृपा',
    url: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80',
    category: 'bansuri',
    tags: ['बांके बिहारी', 'बाँसुरी नाद', 'त्रिभंगी']
  },
  {
    id: 'makhan_chor_gopal',
    title: 'बाल गोपाल नटखट माखनचोर',
    subtitle: 'गोकुल की वात्सल्य लीलाएं — यशोदा नंदन का पावन बाल रूप दर्शन',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    category: 'makhan_chor',
    tags: ['बाल गोपाल', 'माखनचोर', 'गोकुल']
  },
  {
    id: 'giriraj_govardhan',
    title: 'श्री गिरिराज गोवर्धन धारण लीला',
    subtitle: 'इन्द्र के मान का भंजन और कनिष्ठिका अंगुली पर गोवर्धन पर्वत धारण कर ब्रज रक्षा',
    url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80',
    category: 'govardhan',
    tags: ['गोवर्धन लीला', 'गिरिराज', 'ब्रज रक्षा']
  },
  {
    id: 'yamuna_pulina_bansuri',
    title: 'श्री यमुना पुलिन पर मुरली मनोहर',
    subtitle: 'कदंब वृक्ष की छाया में वेणु नाद — चराचर जगत को सम्मोहित करता प्रेम रस',
    url: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=1200&q=80',
    category: 'bansuri',
    tags: ['मुरली मनोहर', 'यमुना तट', 'वेणु नाद']
  },
  {
    id: 'radha_rani_kripa',
    title: 'श्री राधा रानी कृपा कटाक्ष दर्शन',
    subtitle: 'मुनीन्द्रवृन्दवन्दिते त्रिलोकशोकहारिणी — बरसाने की स्वामिनी श्री लाडली जू',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    category: 'yugal',
    tags: ['राधा रानी', 'बरसाना', 'कृपा कटाक्ष']
  }
];

export function getArtworkForChapter(chapterNum: number): string {
  const index = (Math.max(1, Math.min(18, chapterNum)) - 1) % KRISHNA_ARTWORKS.length;
  return KRISHNA_ARTWORKS[index].url;
}

export function getArtworkDetailsForChapter(chapterNum: number): KrishnaArt {
  const index = (Math.max(1, Math.min(18, chapterNum)) - 1) % KRISHNA_ARTWORKS.length;
  return KRISHNA_ARTWORKS[index];
}

export function getArtworkForShloka(chapterNum: number, verseNum: number): string {
  const index = (chapterNum * 7 + verseNum * 11) % KRISHNA_ARTWORKS.length;
  return KRISHNA_ARTWORKS[index].url;
}

export function getArtworkDetailsForShloka(chapterNum: number, verseNum: number): KrishnaArt {
  const index = (chapterNum * 7 + verseNum * 11) % KRISHNA_ARTWORKS.length;
  return KRISHNA_ARTWORKS[index];
}
