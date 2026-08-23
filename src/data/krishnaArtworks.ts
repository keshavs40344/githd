// 100% EXCLUSIVE LORD SRI KRISHNA & SRI RADHA-KRISHNA ULTRA-HD ARTWORKS
// Curated for Royal Vedic Aesthetics, Mobile/PC Wallpapers & Visual Darshan

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
    id: 'radha_krishna_yugal_darshan',
    title: 'श्री राधा-कृष्ण युगल दिव्य दर्शन',
    subtitle: 'तप्तकाञ्चनगौराङ्गि राधे वृन्दावनेश्वरि — वृन्दावन महारास एवं नित्य निकुंज लीला',
    url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1600&q=85',
    category: 'yugal',
    tags: ['राधा कृष्ण', 'युगल सरकार', 'वृन्दावन']
  },
  {
    id: 'parthasarathi_gita_updesh',
    title: 'पार्थसारथी श्रीकृष्ण — कुरुक्षेत्र गीता उपदेश',
    subtitle: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत — कुरुक्षेत्र में रथ पर अर्जुन को दिव्य ज्ञान',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85',
    category: 'parthasarathi',
    tags: ['पार्थसारथी', 'गीता उपदेश', 'कुरुक्षेत्र']
  },
  {
    id: 'vishwaroop_ananta_darshan',
    title: 'श्रीकृष्ण विश्वरूप विराट दर्शन',
    subtitle: 'दिवि सूर्यसहस्रस्य भवेद्युगपदुत्थिता — अनंत भुजाओं, नयनों और ब्रह्मांडीय रूपों का तेज',
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=85',
    category: 'vishwaroop',
    tags: ['विश्वरूप', 'विराट दर्शन', 'परमब्रह्म']
  },
  {
    id: 'banke_bihari_venu_madhuri',
    title: 'ठाकुर श्री बांके बिहारी — वेणु माधुरी',
    subtitle: 'अधरं मधुरं वदनं मधुरं — श्रीमुख पर मंद मुस्कान और त्रिभंगी मुद्रा',
    url: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1600&q=85',
    category: 'bansuri',
    tags: ['बांके बिहारी', 'बाँसुरी', 'त्रिभंगी']
  },
  {
    id: 'makhan_chor_bal_gopal',
    title: 'बाल गोपाल नटखट माखनचोर',
    subtitle: 'दधिमन्थन लीला एवं यशोदा नंदन — गोकुल की पावन वात्सल्य बाल लीलाएं',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=85',
    category: 'makhan_chor',
    tags: ['बाल गोपाल', 'माखनचोर', 'गोकुल लीला']
  },
  {
    id: 'shri_giriraj_govardhan_dharan',
    title: 'श्री गिरिराज गोवर्धन धारण लीला',
    subtitle: 'इन्द्र के अभिमान का मर्दन और कनिष्ठिका उंगली पर गिरिराज पर्वत का धारण',
    url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1600&q=85',
    category: 'govardhan',
    tags: ['गोवर्धन लीला', 'गिरिराज', 'ब्रज रक्षा']
  },
  {
    id: 'yamuna_kinare_bansuri_dhun',
    title: 'श्री यमुना पुलिन पर दिव्य वेणु नाद',
    subtitle: 'कदंब की छांव में मधुर वंशी वादन — समस्त ब्रजवासियों को सम्मोहित करता सुर',
    url: 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=1600&q=85',
    category: 'bansuri',
    tags: ['यमुना तट', 'कदंब वृक्ष', 'मुरली मनोहर']
  },
  {
    id: 'shri_radha_rani_kripa_kataksha',
    title: 'श्री राधा रानी कृपा कटाक्ष दर्शन',
    subtitle: 'मुनीन्द्रवृन्दवन्दिते त्रिलोकशोकहारिणी — बरसाने की स्वामिनी श्री लाडली जू',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=85',
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
