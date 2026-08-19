export interface YouTubePlaylistItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'gita_english' | 'bhagwat_katha' | 'bhajan' | 'relaxing_meditation' | 'kirtan';
  categoryLabel: string;
  youtubeId: string; // Video ID or Playlist ID
  isPlaylist: boolean;
  thumbnailUrl: string;
  episodeCount?: string;
  duration?: string;
  raga?: string;
  description: string;
  tags: string[];
}

export const SACRED_YOUTUBE_PLAYLISTS: YouTubePlaylistItem[] = [
  // ── 1. BHAGAVAD GITA IN ENGLISH (भगवद्गीता अंग्रेजी व्याख्या एवं पाठ) ─────────
  {
    id: 'yt-gita-english-series',
    title: 'Srimad Bhagavad Gita in English (Full 18 Chapters Series)',
    subtitle: 'Complete Chapter-by-Chapter Verse Commentary, Meaning & Recitation',
    category: 'gita_english',
    categoryLabel: 'Gita in English',
    youtubeId: 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP',
    isPlaylist: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=700&auto=format&fit=crop&q=80',
    episodeCount: 'All 18 Chapters',
    duration: 'Full Playlist Audio',
    raga: 'Vedic English Discourse',
    description: 'Comprehensive chapter-by-chapter philosophical discourse and recitation of the entire 700 verses of Bhagavad Gita in clear English.',
    tags: ['Bhagavad Gita', 'English', '18 Chapters', 'Philosophy', 'Karma Yoga', 'Bhakti']
  },

  // ── 2. SAMPURNA BHAGAVAT MAHAPURAN KATHA (सम्पूर्ण भागवत कथा धारावाहिक) ───
  {
    id: 'yt-bhagwat-katha-series',
    title: 'सम्पूर्ण श्रीमद्भागवत महापुराण कथा (Sampurna Bhagavat Katha Episodes)',
    subtitle: 'All Episodes: Shri Krishna Janma, Leela, Uddhava Gita & Moksha Katha',
    category: 'bhagwat_katha',
    categoryLabel: 'Bhagavat Katha',
    youtubeId: 'PL5A5QJkW7MkvYslAbg7_rFij8yVEeiEwF',
    isPlaylist: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=700&auto=format&fit=crop&q=80',
    episodeCount: 'Full Episode Series',
    duration: 'Complete Katha Playlist',
    raga: 'कथा रस एवं भक्ति',
    description: 'The monumental sacred narration of Shrimad Bhagavata Mahapuran: From Suka-Parikshit Samvad to Lord Krishna’s divine pastimes in Vrindavan and Mathura.',
    tags: ['Bhagavat Purana', 'Katha', 'Krishna Leela', 'Vrindavan', 'Uddhava Gita']
  },

  // ── 3. BHAJAN SECTION (परम पावन कृष्ण भजन एवं OFI भजन) ───────────────────────
  {
    id: 'yt-bhajan-master-collection-1',
    title: 'परम पावन कृष्ण भजन अमृत (Devotional Krishna Bhajans Vol. 1)',
    subtitle: 'Heart-touching classical bhajans, harmonium melodies & temple bells',
    category: 'bhajan',
    categoryLabel: 'Krishna Bhajans',
    youtubeId: 'PL57FdneUw7RIO-hHlnFWKUccdKFsD4QgX',
    isPlaylist: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=700&auto=format&fit=crop&q=80',
    episodeCount: 'Top Devotional Bhajans',
    duration: 'Sacred Playlist',
    raga: 'राग भूपाली व यमन',
    description: 'Soulful Krishna bhajans celebrating divine surrender, Govinda vandana, and the sweet names of Hari.',
    tags: ['Bhajan', 'Krishna', 'Surrender', 'Harmonium', 'Govinda']
  },
  {
    id: 'yt-bhajan-master-collection-2',
    title: 'श्री कृष्ण गोविन्द हरे मुरारी भजन संकलन (Krishna Bhajans Vol. 2)',
    subtitle: 'Meditative surrender bhajans for emotional peace and inner harmony',
    category: 'bhajan',
    categoryLabel: 'Krishna Bhajans',
    youtubeId: 'PL2YSr1wL53INq90_tGktMNsATzi6BxbOj',
    isPlaylist: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=700&auto=format&fit=crop&q=80',
    episodeCount: 'Melodic Bhajan Stream',
    duration: 'Continuous Audio',
    raga: 'राग दरबारी व मालकौंस',
    description: 'Calming devotional bhajans that relieve mental stress and reconnect the consciousness with the lotus feet of Krishna.',
    tags: ['Krishna Govind', 'Acoustic Bhajan', 'Peace', 'Vandana']
  },
  {
    id: 'yt-ofi-bhajan-special',
    title: 'दिव्य स्तुति एवं भक्ति भजन (OFI Sacred Bhajans & Stutis)',
    subtitle: 'Soul-stirring devotional stutis, aartis and devotional hymns',
    category: 'bhajan',
    categoryLabel: 'OFI Devotional',
    youtubeId: 'PLuH-I1ovyzeioJ_j4DcQgoxtAbgBc3YD2',
    isPlaylist: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=700&auto=format&fit=crop&q=80',
    episodeCount: 'Curated Stutis & Bhajans',
    duration: 'Sacred Playlist',
    raga: 'भक्ति रस',
    description: 'Deeply expressive devotional songs, sacred mantras and prayers that invoke divine blessings and clarity.',
    tags: ['OFI Bhajans', 'Stutis', 'Devotional Songs', 'Sanctum Audio']
  },
  {
    id: 'yt-ultimate-krishna-bhajans',
    title: 'सर्वश्रेष्ठ कृष्ण भजन अमृत धारा (Ultimate Krishna Bhajans Collection)',
    subtitle: 'Achyutam Keshavam, Radhe Krishna, Madhurashtakam & Aarti',
    category: 'bhajan',
    categoryLabel: 'Krishna Bhajans',
    youtubeId: 'PLBO8vPt12vLdn6AmhpfMT1d28lbzE_HMB',
    isPlaylist: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=700&auto=format&fit=crop&q=80',
    episodeCount: 'Full Devotional Series',
    duration: 'Complete Playlist',
    raga: 'राग खमाज व भूपाली',
    description: 'Grand collection of beloved Krishna bhajans with acoustic sitar, flute, harmonium, and traditional choir.',
    tags: ['Achyutam Keshavam', 'Radhe Radhe', 'Madhurashtakam', 'Choir']
  },

  // ── 4. MIND RELAXING & 432Hz MEDITATION MUSIC (मन शांति एवं ध्यान संगीत) ───
  {
    id: 'yt-relaxing-live-stream',
    title: '२४/७ कृष्ण बाँसुरी एवं ध्यान संगीत (24/7 Mind Relaxing Krishna Flute)',
    subtitle: 'Live 432Hz Bamboo Bansuri with Sacred River & Binaural Peace',
    category: 'relaxing_meditation',
    categoryLabel: 'Mind Relaxing 432Hz',
    youtubeId: 'PnRFjKgiWWU',
    isPlaylist: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&auto=format&fit=crop&q=80',
    duration: '24/7 Live Stream',
    raga: '४३२ हर्ट्ज़ नाद (432Hz Peace)',
    description: 'Pure 432Hz meditative bamboo flute with flowing water and gentle ambient drone for instant anxiety relief and concentration.',
    tags: ['432Hz', 'Flute', 'Live Stream', 'Sleep', 'Deep Focus', 'Meditation']
  },
  {
    id: 'yt-relaxing-spiritual-music',
    title: 'गहन ध्यान एवं चक्र जाग्रति संगीत (Deep Spiritual Healing & Relaxation)',
    subtitle: 'Tibetan singing bowls, Tanpura drones and peaceful Indian Classical Ragas',
    category: 'relaxing_meditation',
    categoryLabel: 'Healing Meditation',
    youtubeId: 'PLM3TSQaW_spN7_X2Iez04X0naC8K3rHNh',
    isPlaylist: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=700&auto=format&fit=crop&q=80',
    episodeCount: 'Healing Frequency Playlist',
    duration: 'Multi-Track Audio',
    raga: '५२८Hz डीएनए हीलिंग',
    description: 'Carefully curated soothing soundscapes and alpha wave frequencies for pranayama, yoga sadhana, and deep restful sleep.',
    tags: ['528Hz', 'Alpha Waves', 'Relaxation', 'Pranayama', 'Chakra']
  },

  // ── 5. KIRTAN SECTION (महासंकीर्तन, नाम जप एवं अखंड कीर्तन) ─────────────────
  {
    id: 'yt-kirtan-collection-1',
    title: 'हरे कृष्ण महासंकीर्तन धारा (Ecstatic Mahamantra Kirtans Part 1)',
    subtitle: 'Traditional Mridanga, Kartals and joyful congregational chanting',
    category: 'kirtan',
    categoryLabel: 'Maha Kirtan',
    youtubeId: 'PL1jVQ7Hzg9gk_oSTIiBF62DAC_y3sjFzb',
    isPlaylist: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=700&auto=format&fit=crop&q=80',
    episodeCount: 'High Energy Kirtan Series',
    duration: 'Full Kirtan Playlist',
    raga: 'संकीर्तन ताल',
    description: 'Soul-uplifting Hare Krishna Mahamantra kirtans that fill the atmosphere with devotion, joy, and divine energy.',
    tags: ['Hare Krishna', 'Maha Mantra', 'Kirtan', 'Mridanga', 'Kartals']
  },
  {
    id: 'yt-kirtan-collection-2',
    title: 'वृन्दावन दिव्य नाम संकीर्तन (Vrindavan Sweet Kirtan Melodies Part 2)',
    subtitle: 'Melodic call-and-response kirtans from the holy temples of Braj',
    category: 'kirtan',
    categoryLabel: 'Vrindavan Kirtan',
    youtubeId: 'PLCjL13auTbr9MqL_i4L3XS-TnVkBP06QK',
    isPlaylist: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=700&auto=format&fit=crop&q=80',
    episodeCount: 'Temple Kirtan Melodies',
    duration: 'Non-stop Chanting',
    raga: 'राग पीलू व भैरवी',
    description: 'Heart-melting kirtans recorded in the sacred ambiance of Vrindavan temples, invoking deep peace and devotion.',
    tags: ['Vrindavan Kirtan', 'Braj Melodies', 'Chanting', 'Joy']
  },
  {
    id: 'yt-kirtan-collection-3',
    title: 'अखंड नाम जप एवं मृदंग नाद (Akhand Namasankirtan & Drums Part 3)',
    subtitle: 'Traditional Bengali & Braj style classical pakhawaj and mridanga kirtans',
    category: 'kirtan',
    categoryLabel: 'Akhand Kirtan',
    youtubeId: 'PLhtmKWc6vRTDu2bivBOJejQvbWgO-sS1z',
    isPlaylist: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=700&auto=format&fit=crop&q=80',
    episodeCount: 'Traditional Kirtan Stream',
    duration: 'Continuous Audio',
    raga: 'पारंपरिक संकीर्तन',
    description: 'Sacred rhythmic chanting of Lord Hari’s holy names with acoustic percussion that cleanses the heart (Ceto-darpana-marjanam).',
    tags: ['Akhand Kirtan', 'Pakhawaj', 'Hari Nama', 'Braj']
  },
  {
    id: 'yt-kirtan-collection-4',
    title: 'श्री राधा गोविंद महासंकीर्तन (Shri Radha Govind Mahakirtan Part 4)',
    subtitle: 'Blissful choir chants, flute interludes and devotional celebrations',
    category: 'kirtan',
    categoryLabel: 'Radha Govind Kirtan',
    youtubeId: 'PL85YVpg0rX2QJXZELyY-FCZjd35l5oa_u',
    isPlaylist: true,
    thumbnailUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=700&auto=format&fit=crop&q=80',
    episodeCount: 'Complete Kirtan Series',
    duration: 'Sacred Audio Playlist',
    raga: 'राग पहाड़ी व भूपाली',
    description: 'Sublime kirtan tracks celebrating the eternal glory of Radha and Krishna with soaring melodies and acoustic accompaniment.',
    tags: ['Radha Govind', 'Mahakirtan', 'Ecstasy', 'Flute Interlude']
  }
];
