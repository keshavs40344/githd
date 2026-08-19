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
    id: 'vrindavan-bansuri-studio',
    title: 'वृन्दावन मुरली अमृत (Vrindavan Studio Flute & Yamuna)',
    subtitle: 'Authentic 432Hz Bamboo Bansuri in Raga Yaman Kalyan with gentle Yamuna waters',
    category: 'दिव्य मुरली',
    raga: 'राग यमन कल्याण (Raga Yaman 432Hz)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=indian-spiritual-flute-14815.mp3',
    duration: '04:12',
    mood: 'परम शांति एवं कृष्ण प्रेम',
    isAiGenerated: false,
    baseFreq: 136.1,
    tags: ['Flute', 'Bansuri', 'Krishna', '432Hz', 'Yamuna']
  },
  {
    id: 'vedic-gita-shloka-recitation',
    title: 'श्रीमद्भगवद्गीता सम्पूर्ण पाठ (Vedic Gita Chanting & Tanpura)',
    subtitle: 'Pure Sanskrit Temple Chanting with 136.1Hz Acoustic Tanpura & Bronze Bells',
    category: 'वैदिक पाठ',
    raga: 'राग अहीर भैरव (Raga Ahir Bhairav)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=meditation-spiritual-112191.mp3',
    duration: '03:45',
    mood: 'आध्यात्मिक जाग्रति एवं ध्यान',
    isAiGenerated: false,
    baseFreq: 136.1,
    tags: ['Gita', 'Vedic', 'Tanpura', 'Sanskrit']
  },
  {
    id: 'kurukshetra-shankhnaad-epic',
    title: 'कुरुक्षेत्र शंखनाद एवं धर्मयुद्ध (Kurukshetra Conch & Battle Drums)',
    subtitle: 'Sacred Conch Invocations, Royal Pakhawaj & Heroic Vedic Chants',
    category: 'शौर्य नाद',
    raga: 'राग भैरव / शौर्य नाद (Raga Bhairav)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73526.mp3?filename=epic-cinematic-trailer-10900.mp3',
    duration: '03:20',
    mood: 'भय मुक्ति, आंतरिक बल एवं विजय',
    isAiGenerated: false,
    baseFreq: 96.0,
    tags: ['Shankh', 'Kurukshetra', 'Battle', 'Courage']
  },
  {
    id: 'krishna-govind-bhajan-melody',
    title: 'श्री कृष्ण गोविन्द हरे मुरारी (Devotional Harmonium & Sitar)',
    subtitle: 'Sweet Temple Bhajan with Acoustic Harmonium, Sitar and Sanctum Chimes',
    category: 'भजन माधुर्य',
    raga: 'राग भूपाली (Raga Bhupali)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_8f44d85207.mp3?filename=relaxing-indian-music-11756.mp3',
    duration: '05:08',
    mood: 'शरणागति एवं हृदय शुद्धि',
    isAiGenerated: false,
    baseFreq: 136.1,
    tags: ['Bhajan', 'Harmonium', 'Sitar', 'Surrender']
  },
  {
    id: 'om-namo-bhagavate-108-drone',
    title: 'ॐ नमो भगवते वासुदेवाय (108 Maha Mantra Meditation)',
    subtitle: 'Deep 108Hz Alpha Wave Drone with Tibetan Singing Bowls & Tanpura',
    category: 'महामंत्र साधना',
    raga: '१०८ हर्ट्ज़ नाद ब्रह्म (108Hz Drone)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=tibetan-singing-bowl-healing-meditation-122967.mp3',
    duration: '06:30',
    mood: 'समाधि, चक्र जाग्रति एवं आत्मज्ञान',
    isAiGenerated: false,
    baseFreq: 108.0,
    tags: ['Maha Mantra', '108Hz', 'Alpha Wave', 'Samadhi']
  },
  {
    id: 'classical-sitar-veena-peace',
    title: 'गीता माहात्म्य दिव्य सितार (Classical Sitar & Saraswati Veena)',
    subtitle: 'Soul-stirring classical Sitar improvisation in Raga Malkauns with Tabla',
    category: 'शास्त्रीय संगीत',
    raga: 'राग मालकौंस (Raga Malkauns)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/26/audio_d0c6ff1101.mp3?filename=relaxing-ambient-music-14400.mp3',
    duration: '04:45',
    mood: 'गहन चिंतन एवं मानसिक संतुलन',
    isAiGenerated: false,
    baseFreq: 144.0,
    tags: ['Sitar', 'Veena', 'Malkauns', 'Classical']
  },
  {
    id: 'brahma-muhurta-morning-peace',
    title: 'ब्रह्म मुहूर्त प्रभात ध्यान (Brahma Muhurta Dawn Awakening)',
    subtitle: 'Dawn birdsong ambient with Raga Bhairavi Bansuri and Bronze Temple Bells',
    category: 'प्रभात राग',
    raga: 'राग भैरवी (Raga Bhairavi)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_884fe92c21.mp3?filename=meditation-bowl-117565.mp3',
    duration: '05:30',
    mood: 'प्रातःकाल का ओज एवं नवचेतना',
    isAiGenerated: false,
    baseFreq: 136.1,
    tags: ['Morning', 'Bhairavi', 'Dawn', 'Bells']
  },
  {
    id: 'vishwarupa-cosmic-528hz',
    title: 'विश्वरूप दर्शन ५२८Hz नाद (Cosmic Vishwarupa Symphony)',
    subtitle: '528Hz DNA Frequency Healing Drone with Primordial OM and Celestial Strings',
    category: 'विश्वरूप नाद',
    raga: 'अनंत नाद ५२८ हर्ट्ज़ (528Hz Cosmic OM)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/11/01/audio_00ea7b9b18.mp3?filename=cosmic-glow-6703.mp3',
    duration: '06:15',
    mood: 'ब्रह्मांडीय चेतना एवं असीम प्रकाश',
    isAiGenerated: false,
    baseFreq: 528.0,
    tags: ['528Hz', 'Vishwarupa', 'Cosmic', 'OM']
  },
  {
    id: 'hare-krishna-mridanga-kirtan',
    title: 'महामंत्र दिव्य कीर्तन (Hare Krishna Mridanga & Flute Kirtan)',
    subtitle: 'Acoustic Indian Mridanga drums, Kartals, and Melodic Bansuri Call & Response',
    category: 'संकीर्तन',
    raga: 'राग पीलू (Raga Pilu)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c36398017c.mp3?filename=indian-meditation-ambient-10651.mp3',
    duration: '04:55',
    mood: 'आनंद एवं दिव्य उत्सव',
    isAiGenerated: false,
    baseFreq: 136.1,
    tags: ['Kirtan', 'Mridanga', 'Kartals', 'Joy']
  },
  {
    id: 'yamuna-madhurashtakam-flute',
    title: 'मधुराष्टकम् मुरली ध्यान (Madhurashtakam Flute Meditation)',
    subtitle: 'Sweet Bansuri flute playing the melodies of Adharam Madhuram by the riverbank',
    category: 'मधुराष्टकम्',
    raga: 'राग खमाज (Raga Khamaj)',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_34dbd0b7d3.mp3?filename=spiritual-moment-11444.mp3',
    duration: '05:10',
    mood: 'माधुर्य एवं आंतरिक विश्राम',
    isAiGenerated: false,
    baseFreq: 432.0,
    tags: ['Madhurashtakam', 'Flute', 'Sweetness', 'Peace']
  }
];

