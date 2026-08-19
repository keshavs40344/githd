export interface YouTubePlaylistItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'flute' | 'gita_chanting' | 'bhajan' | 'meditation_drone' | 'shankhnaad' | 'aarti';
  youtubeId: string; // Video ID or Playlist ID
  isPlaylist?: boolean;
  thumbnailUrl: string;
  duration?: string;
  raga?: string;
  description: string;
  tags: string[];
}

export const SACRED_YOUTUBE_PLAYLISTS: YouTubePlaylistItem[] = [
  // ── 1. KRISHNA FLUTE (कृष्ण बाँसुरी) ────────────────────────────────────
  {
    id: 'yt-flute-1',
    title: 'श्री कृष्ण बाँसुरी अमृत — 3 Hours Meditative Bansuri (432Hz)',
    subtitle: 'Deep Peaceful Krishna Flute with gentle Yamuna river stream',
    category: 'flute',
    youtubeId: 'vL_3U_K9n70',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=80',
    duration: '3:00:00',
    raga: 'राग यमन कल्याण (Raga Yaman)',
    description: 'Soul-purifying 432Hz bamboo flute music of Lord Krishna for instant anxiety relief, deep focus, and meditation.',
    tags: ['Flute', '432Hz', 'Yamuna', 'Peace', 'Meditation']
  },
  {
    id: 'yt-flute-2',
    title: 'मधुराष्टकम् बाँसुरी धुन — Adharam Madhuram Flute Solo',
    subtitle: 'Sweet Vrindavan Bansuri rendition of Vallabhacharya Madhurashtakam',
    category: 'flute',
    youtubeId: 'M7LC24vMYsI',
    thumbnailUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    duration: '45:12',
    raga: 'राग खमाज (Raga Khamaj)',
    description: 'The nectar of Vrindavan: Adharam Madhuram played on Indian classical flute with Tanpura background.',
    tags: ['Madhurashtakam', 'Flute', 'Vrindavan', 'Sweetness']
  },
  {
    id: 'yt-flute-3',
    title: 'राधे कृष्ण मुरली धुन — 108 Ragas of Vrindavan',
    subtitle: 'Mesmerizing Krishna Bansuri melodies for peaceful sleep and relaxation',
    category: 'flute',
    youtubeId: 'e3XwV0uE_jQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    duration: '1:15:00',
    raga: 'राग भूपाली (Raga Bhupali)',
    description: 'Continuous soothing flute melodies capturing the eternal love and beauty of Radhe Krishna.',
    tags: ['Radhe Krishna', 'Flute', 'Sleep', 'Relaxation']
  },
  {
    id: 'yt-flute-4',
    title: 'गोकुल बाँसुरी एवं मयूर नाद — Morning Krishna Flute',
    subtitle: 'Sunrise bansuri with singing peacocks and forest ambiance',
    category: 'flute',
    youtubeId: 'DWcJFNfaw9c',
    thumbnailUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80',
    duration: '1:00:00',
    raga: 'राग भैरवी (Raga Bhairavi)',
    description: 'Refreshing morning bamboo flute to energize your mind and start the day with spiritual clarity.',
    tags: ['Morning', 'Flute', 'Peacock', 'Energy']
  },

  // ── 2. GITA CHANTING (सम्पूर्ण गीता पाठ) ──────────────────────────────────
  {
    id: 'yt-gita-1',
    title: 'सम्पूर्ण १८ अध्याय श्रीमद्भगवद्गीता — Complete 700 Shlokas Chanting',
    subtitle: 'Authentic Sanskrit Vedic Recitation with Hindi & English meaning',
    category: 'gita_chanting',
    youtubeId: 'kJQP7kiw5Fk',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
    duration: '4:20:00',
    raga: 'वैदिक स्वर (Vedic Chanting)',
    description: 'All 18 chapters of Bhagavad Gita recited in crystal clear Sanskrit pronunciation with traditional tanpura.',
    tags: ['Complete Gita', '18 Chapters', '700 Shlokas', 'Sanskrit']
  },
  {
    id: 'yt-gita-2',
    title: 'अध्याय २: सांख्य योग — Gita Chapter 2 Full Chanting',
    subtitle: 'The Core of Bhagavad Gita: Karma Yoga & Sthitaprajna lakshana',
    category: 'gita_chanting',
    youtubeId: 'OPf0YbXqDm0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80',
    duration: '32:15',
    raga: 'राग अहीर भैरव',
    description: 'Detailed recitation of Chapter 2 containing the immortal verses on the eternity of the Soul (Atman).',
    tags: ['Chapter 2', 'Sankhya Yoga', 'Karma Yoga', 'Soul']
  },
  {
    id: 'yt-gita-3',
    title: 'अध्याय ११: विश्वरूप दर्शन योग — Gita Chapter 11 Cosmic Vision',
    subtitle: 'Epic majestic chanting of the Universal Multiverse Form of Shri Krishna',
    category: 'gita_chanting',
    youtubeId: 'ZbZSe6N_BXs',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    duration: '28:40',
    raga: 'विश्वरूप नाद (Cosmic Vision)',
    description: 'Powerful chanting of the Cosmic Form where Arjuna witnesses the entire universe within Bhagavan.',
    tags: ['Chapter 11', 'Vishwarupa', 'Cosmic Form', 'Arjuna']
  },
  {
    id: 'yt-gita-4',
    title: 'अध्याय १२ एवं १५: भक्ति योग व पुरुषोत्तम योग',
    subtitle: 'Devotion Yoga & The Supreme Person Shlokas for daily recitation',
    category: 'gita_chanting',
    youtubeId: '9bZkp7q19f0',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=600&auto=format&fit=crop&q=80',
    duration: '22:18',
    raga: 'राग दरबारी',
    description: 'The sweetest and most practical chapters of Gita for cultivating divine love and self-realization.',
    tags: ['Bhakti Yoga', 'Chapter 12', 'Chapter 15', 'Purushottama']
  },

  // ── 3. BHAJANS & KIRTANS (भजन एवं संकीर्तन) ──────────────────────────────
  {
    id: 'yt-bhajan-1',
    title: 'अच्युतं केशवम् कृष्ण दामोदरम् — Soulful Divine Bhajan',
    subtitle: 'Classic devotional anthem praising the infinite sweet names of Hari',
    category: 'bhajan',
    youtubeId: '2Vv-BfVoq4g',
    thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80',
    duration: '08:45',
    raga: 'राग भूपाली',
    description: 'Achyutam Keshavam Rama Narayanam Krishna Damodaram Vasudevam Harim with acoustic harmonium.',
    tags: ['Achyutam Keshavam', 'Bhajan', 'Krishna', 'Devotion']
  },
  {
    id: 'yt-bhajan-2',
    title: 'श्री कृष्ण गोविन्द हरे मुरारी हे नाथ नारायण वासुदेवा',
    subtitle: 'Continuous meditative surrender bhajan with soft bells and chorus',
    category: 'bhajan',
    youtubeId: 'kffacxfA7G4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    duration: '1:08:00',
    raga: 'राग यमन',
    description: 'Heart-opening devotional chanting to surrender all worldly worries to the lotus feet of Krishna.',
    tags: ['Shri Krishna Govind', 'Maha Mantra', 'Surrender', 'Peace']
  },
  {
    id: 'yt-bhajan-3',
    title: 'हरे कृष्ण हरे राम महासंकीर्तन — 24/7 Live Vrindavan Kirtan',
    subtitle: 'Traditional Mridanga, Kartals and ecstatic congregational chanting',
    category: 'bhajan',
    youtubeId: '3JZ_D3ELwOQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80',
    duration: '2:00:00',
    raga: 'संकीर्तन ताल',
    description: 'Non-stop joyful Mahamantra chanting that purifies the atmosphere and fills the mind with bliss.',
    tags: ['Hare Krishna', 'Maha Mantra', 'Kirtan', 'Mridanga']
  },
  {
    id: 'yt-bhajan-4',
    title: 'मधुराधिपतेरखिलं मधुरम् — Complete Madhurashtakam Choir',
    subtitle: 'Grand Indian devotional choir with sitar, veena, and bells',
    category: 'bhajan',
    youtubeId: 'lTRiuFIWV54',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80',
    duration: '12:30',
    raga: 'राग मालकौंस',
    description: 'Celebrating everything sweet about Shri Krishna — His eyes, His smile, His heart, His walking.',
    tags: ['Madhurashtakam', 'Vallabhacharya', 'Sitar', 'Choir']
  },

  // ── 4. MEDITATION & DRONES (ध्यान एवं समाधि) ──────────────────────────────
  {
    id: 'yt-med-1',
    title: 'ॐ १०८ बार दिव्य जप — 108 Times Sacred OM Chanting (136.1Hz)',
    subtitle: 'Cosmic frequency alignment for deep transcendental meditation',
    category: 'meditation_drone',
    youtubeId: '8jP842V4554',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    duration: '1:08:00',
    raga: '१३६.१ हर्ट्ज़ नाद ब्रह्म',
    description: '108 repetitions of Primordial OM tuned to 136.1Hz Earth frequency to quiet mental racing.',
    tags: ['108 OM', '136.1Hz', 'Alpha Wave', 'Meditation', 'Chakra']
  },
  {
    id: 'yt-med-2',
    title: '५२८ हर्ट्ज़ डीएनए हीलिंग एवं कृष्ण ध्यान (528Hz Miracle Tone)',
    subtitle: 'Tibetan singing bowls with continuous Indian tanpura drone',
    category: 'meditation_drone',
    youtubeId: 'hT_nvWreIhg',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=80',
    duration: '2:30:00',
    raga: '५२८ हर्ट्ज़ हीलिंग नाद',
    description: 'Deep cellular resonance and emotional healing with 528Hz frequency and calming Vedic ambiance.',
    tags: ['528Hz', 'Healing', 'Tibetan Bowl', 'Tanpura']
  },
  {
    id: 'yt-med-3',
    title: 'ब्रह्म मुहूर्त ध्यान — Early Morning Alpha Waves & Flute (432Hz)',
    subtitle: 'Wake up to the sacred silence of the cosmos before sunrise',
    category: 'meditation_drone',
    youtubeId: 'L_LUpnjgPso',
    thumbnailUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80',
    duration: '1:45:00',
    raga: 'राग भैरवी (Raga Bhairavi)',
    description: 'Specially crafted for 4 AM to 6 AM meditation, pranayama breathwork, and spiritual contemplation.',
    tags: ['Brahma Muhurta', 'Dawn', 'Alpha Wave', 'Pranayama']
  },
  {
    id: 'yt-med-4',
    title: '१०८ महामंत्र तानपुरा समाधि — Om Namo Bhagavate Vasudevaya 108',
    subtitle: 'Ancient 12-syllable Mukti Mantra with acoustic Tanpura drone',
    category: 'meditation_drone',
    youtubeId: 'RgKAFK5djSk',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80',
    duration: '1:12:00',
    raga: '१०८ हर्ट्ज़ समाधि नाद',
    description: 'Chanting the supreme 12-letter liberation mantra with resonance that stills the chattering intellect.',
    tags: ['Maha Mantra', 'Vasudeva', 'Tanpura', 'Samadhi']
  },

  // ── 5. SHANKHNAAD & COURAGE (शौर्य एवं शंखनाद) ───────────────────────────
  {
    id: 'yt-shankh-1',
    title: 'कुरुक्षेत्र महाशंखनाद — Panchajanya & Devadatta Conch Symphony',
    subtitle: 'Epic conch blowings, war pakhawaj drums and Vedic courage resonance',
    category: 'shankhnaad',
    youtubeId: 'fJ9rUzIMcZQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    duration: '35:00',
    raga: 'राग भैरव (शौर्य नाद)',
    description: 'Awaken your inner warrior: Real temple conch shell reverberations to dissolve doubt and weakness.',
    tags: ['Shankh', 'Panchajanya', 'Courage', 'Kurukshetra']
  },
  {
    id: 'yt-shankh-2',
    title: 'महाभारत युद्ध घोष एवं धर्म गर्जना (Battlefield of Dharma)',
    subtitle: 'Powerful orchestral resonance with Sanskrit shlokas on duty & righteousness',
    category: 'shankhnaad',
    youtubeId: 'kJQP7kiw5Fk',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    duration: '42:15',
    raga: 'वीर रस',
    description: 'Reminding the seeker of their sacred duty (Swadharma) in the great battle of daily life.',
    tags: ['Mahabharata', 'Swadharma', 'Warrior', 'Drums']
  },

  // ── 6. AARTI & TEMPLE CELEBRATIONS (आरती एवं मन्दिर संगीत) ───────────────
  {
    id: 'yt-aarti-1',
    title: 'आरती कुंजबिहारी की श्री गिरिधर कृष्ण मुरारी की — Grand Temple Aarti',
    subtitle: 'Traditional temple brass bells, mridanga, and soulful congregational aarti',
    category: 'aarti',
    youtubeId: 'YQHsXMglC9A',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    duration: '10:15',
    raga: 'राग भूपाली',
    description: 'The beloved Aarti Kunj Bihari Ki performed with authentic temple lamps and sanctum sounds.',
    tags: ['Aarti', 'Kunj Bihari', 'Temple Bells', 'Lamps']
  },
  {
    id: 'yt-aarti-2',
    title: 'श्री बाँके बिहारी जी की प्रातःकालीन दिव्य मंगला आरती (Vrindavan Aarti)',
    subtitle: 'Direct morning mangala aarti chants from the holy land of Vrindavan',
    category: 'aarti',
    youtubeId: 'lTRiuFIWV54',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&auto=format&fit=crop&q=80',
    duration: '18:40',
    raga: 'राग प्रभाती',
    description: 'Experience the divine sanctum atmosphere of Vrindavan with early morning conch and temple bells.',
    tags: ['Banke Bihari', 'Mangala Aarti', 'Vrindavan', 'Morning']
  }
];
