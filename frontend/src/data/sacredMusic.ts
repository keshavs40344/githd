export interface SacredTrack {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  raga: string;
  audioUrl: string;
  duration: string;
  mood: string;
  isAiGenerated: boolean;
  baseFreq?: number;
  tags?: string[];
}

export const REALISTIC_BHAGWAT_TRACKS: SacredTrack[] = [
  {
    id: 'bhagwat-shloka-recitation',
    title: 'श्रीमद्भगवद्गीता दिव्य पाठ (Vedic Gita Chanting)',
    subtitle: 'Authentic Temple Chanting with Tanpura & 136.1Hz Cosmic Resonance',
    category: 'वैदिक पाठ',
    raga: 'राग अहीर भैरव (Raga Ahir Bhairav)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=meditation-spiritual-112191.mp3',
    duration: '03:45',
    mood: 'परम शांति एवं ध्यान (Peace & Dhyana)',
    isAiGenerated: false,
    baseFreq: 136.1,
    tags: ['Gita', 'Vedic', 'Tanpura', 'Peace']
  },
  {
    id: 'vrindavan-bansuri-tanpura',
    title: 'वृन्दावन मुरली ध्वनि (Vrindavan Bansuri & Sacred River)',
    subtitle: 'Soul-stirring Studio Krishna Flute with Yamuna Flow & 432Hz Tuning',
    category: 'मुरली राग',
    raga: 'राग यमन कल्याण (Raga Yaman Kalyan)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=indian-spiritual-flute-14815.mp3',
    duration: '04:12',
    mood: 'भक्ति रस एवं प्रेम (Divine Love)',
    isAiGenerated: false,
    baseFreq: 136.1,
    tags: ['Flute', 'Yamuna', 'Krishna', '432Hz']
  },
  {
    id: 'kurukshetra-shankh-chariot',
    title: 'कुरुक्षेत्र शंखनाद एवं धर्मयुद्ध (Kurukshetra Shankhnaad)',
    subtitle: 'Epic Chariot Drones, Sacred Conch & Courageous Resonance',
    category: 'शौर्य नाद',
    raga: 'राग भैरव / शौर्य नाद (Raga Bhairav)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73526.mp3?filename=epic-cinematic-trailer-10900.mp3',
    duration: '03:20',
    mood: 'आत्मबल एवं धर्म (Inner Courage)',
    isAiGenerated: false,
    baseFreq: 96.0,
    tags: ['Battlefield', 'Conch', 'Courage', 'Shankh']
  },
  {
    id: 'shri-krishna-govind-bhajan',
    title: 'श्री कृष्ण गोविन्द हरे मुरारी (Devotional Bhajan Meditation)',
    subtitle: 'Acoustic Harmonium, Sitar, Flute & Gentle Temple Bells',
    category: 'भजन माधुर्य',
    raga: 'राग भूपाली (Raga Bhupali)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_8f44d85207.mp3?filename=relaxing-indian-music-11756.mp3',
    duration: '05:08',
    mood: 'शरणागति एवं आनंद (Surrender)',
    isAiGenerated: false,
    baseFreq: 136.1,
    tags: ['Bhajan', 'Sitar', 'Harmonium', 'Surrender']
  },
  {
    id: 'om-namo-bhagavate-vasudevaya',
    title: 'ॐ नमो भगवते वासुदेवाय (108 Maha Mantra Drone)',
    subtitle: 'Deep Alpha Wave (108Hz) Tanpura & Tibetan Bell Resonance',
    category: 'महामंत्र',
    raga: '१०८ हर्ट्ज़ नाद ब्रह्म (108Hz Drone)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=tibetan-singing-bowl-healing-meditation-122967.mp3',
    duration: '06:30',
    mood: 'समाधि एवं आत्मज्ञान (Samadhi)',
    isAiGenerated: false,
    baseFreq: 108.0,
    tags: ['Maha Mantra', '108Hz', 'Alpha Wave', 'Samadhi']
  },
  {
    id: 'gita-mahatmya-sitar-peace',
    title: 'गीता माहात्म्य दिव्य सितार (Gita Mahatmya Sitar & Saraswati Veena)',
    subtitle: 'Soul-purifying Classical Raga with Meditative Pakhawaj & Temple Chimes',
    category: 'सितार साधना',
    raga: 'राग मालकौंस (Raga Malkauns)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/26/audio_d0c6ff1101.mp3?filename=relaxing-ambient-music-14400.mp3',
    duration: '04:45',
    mood: 'गहन चिंतन एवं आत्मशुद्धि',
    isAiGenerated: false,
    baseFreq: 144.0,
    tags: ['Sitar', 'Veena', 'Mahatmya', 'Purification']
  },
  {
    id: 'brahma-muhurta-dawn-raga',
    title: 'ब्रह्म मुहूर्त प्रभात ध्यान (Brahma Muhurta Dawn Meditation)',
    subtitle: 'Early Dawn Ambient Birds, Sacred Flute & Bronze Bell Resonance',
    category: 'प्रभात राग',
    raga: 'राग भैरवी (Raga Bhairavi)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c21.mp3?filename=meditation-bowl-117565.mp3',
    duration: '05:30',
    mood: 'प्रातःकाल का ओज एवं नवचेतना',
    isAiGenerated: false,
    baseFreq: 136.1,
    tags: ['Morning', 'Bhairavi', 'Dawn', 'Awakening']
  },
  {
    id: 'vishwarupa-cosmic-om',
    title: 'विश्वरूप दर्शन अनंत नाद (Cosmic Vishwarupa Symphony)',
    subtitle: '528Hz DNA Healing Drone with Primordial OM & Celestial Strings',
    category: 'विश्वरूप नाद',
    raga: 'अनंत नाद ५२८ हर्ट्ज़ (528Hz Cosmic OM)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/11/01/audio_00ea7b9b18.mp3?filename=cosmic-glow-6703.mp3',
    duration: '06:15',
    mood: 'ब्रह्मांडीय चेतना एवं दिव्य प्रकाश',
    isAiGenerated: false,
    baseFreq: 528.0,
    tags: ['528Hz', 'Vishwarupa', 'Cosmic', 'OM']
  }
];
