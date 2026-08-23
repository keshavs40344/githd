export interface YouTubeEpisodeItem {
  id: string;
  episodeNumber: number;
  title: string;
  subtitle?: string;
  duration?: string;
  videoId: string; // Specific video ID or playlist index
  playlistIndex?: number;
  raga?: string;
}

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
  episodes: YouTubeEpisodeItem[];
}

export const SACRED_YOUTUBE_PLAYLISTS: YouTubePlaylistItem[] = [
  // ── 1. BHAGAVAD GITA IN ENGLISH (All 18 Chapters) ────────────────────────
  {
    id: 'yt-gita-english-series',
    title: 'Srimad Bhagavad Gita in English (Full 18 Chapters Series)',
    subtitle: 'Complete Chapter-by-Chapter Verse Commentary, Meaning & Recitation',
    category: 'gita_english',
    categoryLabel: 'Gita in English',
    youtubeId: 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP',
    isPlaylist: true,
    thumbnailUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800"><defs><radialGradient id="g1" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="%23ffeed1"/><stop offset="50%" stop-color="%23d97706"/><stop offset="100%" stop-color="%230c0a09"/></radialGradient></defs><rect width="100%" height="100%" fill="url(%23g1)"/><circle cx="600" cy="360" r="220" fill="none" stroke="%23fef08a" stroke-width="4" opacity="0.6"/><text x="600" y="380" text-anchor="middle" font-family="serif" font-size="72" fill="%23fef08a">🪷 🦚 🕉️</text><text x="600" y="660" text-anchor="middle" font-family="serif" font-size="38" font-weight="bold" fill="%23fef08a">॥ श्रीमद्भगवद्गीता यथारूप ॥</text></svg>',
    episodeCount: '18 Chapters (Full Series)',
    duration: 'Full Playlist Audio',
    raga: 'Vedic English Discourse',
    description: 'Comprehensive chapter-by-chapter philosophical discourse and recitation of the entire 700 verses of Bhagavad Gita in clear English.',
    tags: ['Bhagavad Gita', 'English', '18 Chapters', 'Philosophy', 'Karma Yoga', 'Bhakti'],
    episodes: [
      { id: 'gita-ch-1',  episodeNumber: 1,  title: 'Chapter 1: Arjuna Vishada Yoga', subtitle: 'The Yoga of Arjuna\'s Dejection & Inner Dilemma', duration: '28:15', videoId: 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP', playlistIndex: 0, raga: 'Vedic Chant' },
      { id: 'gita-ch-2',  episodeNumber: 2,  title: 'Chapter 2: Sankhya Yoga', subtitle: 'The Yoga of Knowledge, Immortal Soul & Sthitaprajna', duration: '34:40', videoId: 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP', playlistIndex: 1, raga: 'राग अहीर भैरव' },
      { id: 'gita-ch-3',  episodeNumber: 3,  title: 'Chapter 3: Karma Yoga', subtitle: 'The Yoga of Selfless Action & Universal Duty', duration: '25:10', videoId: 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP', playlistIndex: 2, raga: 'राग भूपाली' },
      { id: 'gita-ch-4',  episodeNumber: 4,  title: 'Chapter 4: Jnana Karma Sanyasa Yoga', subtitle: 'Wisdom in Action & The Avatars of God', duration: '27:50', videoId: 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP', playlistIndex: 3, raga: 'राग यमन' },
      { id: 'gita-ch-5',  episodeNumber: 5,  title: 'Chapter 5: Karma Sanyasa Yoga', subtitle: 'Renunciation of Action & Absolute Peace', duration: '22:30', videoId: 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP', playlistIndex: 4, raga: 'राग दरबारी' },
      { id: 'gita-ch-6',  episodeNumber: 6,  title: 'Chapter 6: Dhyana Yoga', subtitle: 'The Yoga of Meditation, Mind Mastery & Equanimity', duration: '31:20', videoId: 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP', playlistIndex: 5, raga: 'राग मालकौंस' },
      { id: 'gita-ch-7',  episodeNumber: 7,  title: 'Chapter 7: Jnana Vijnana Yoga', subtitle: 'Knowledge of the Ultimate Reality & Creation', duration: '24:15', videoId: 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP', playlistIndex: 6, raga: 'राग केदार' },
      { id: 'gita-ch-8',  episodeNumber: 8,  title: 'Chapter 8: Akshara Brahma Yoga', subtitle: 'The Imperishable Brahman & Path to Liberation', duration: '26:45', videoId: 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP', playlistIndex: 7, raga: 'राग भैरवी' },
      { id: 'gita-ch-9',  episodeNumber: 9,  title: 'Chapter 9: Raja Vidya Raja Guhya Yoga', subtitle: 'The Sovereign Science & The Secret of Secrets', duration: '29:30', videoId: 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP', playlistIndex: 8, raga: 'राग बिहाग' },
      { id: 'gita-ch-10', episodeNumber: 10, title: 'Chapter 10: Vibhuti Yoga', subtitle: 'The Opulence of the Absolute Infinite Divine', duration: '30:10', videoId: 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP', playlistIndex: 9, raga: 'राग बागेश्री' },
      { id: 'gita-ch-11', episodeNumber: 11, title: 'Chapter 11: Vishwarupa Darshana Yoga', subtitle: 'The Cosmic Multiverse Vision of Shri Krishna', duration: '38:00', videoId: 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP', playlistIndex: 10, raga: 'विश्वरूप नाद' },
      { id: 'gita-ch-12', episodeNumber: 12, title: 'Chapter 12: Bhakti Yoga', subtitle: 'The Path of Pure Devotion & Unconditional Love', duration: '21:15', videoId: 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP', playlistIndex: 11, raga: 'राग पीलू' },
      { id: 'gita-ch-13', episodeNumber: 13, title: 'Chapter 13: Kshetra Kshetragjna Vibhaga', subtitle: 'The Field of Matter and the Knower of the Field', duration: '28:50', videoId: 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP', playlistIndex: 12, raga: 'राग खमाज' },
      { id: 'gita-ch-14', episodeNumber: 14, title: 'Chapter 14: Gunatraya Vibhaga Yoga', subtitle: 'The Three Modes of Material Nature (Sattva, Rajas, Tamas)', duration: '23:40', videoId: 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP', playlistIndex: 13, raga: 'राग सारंग' },
      { id: 'gita-ch-15', episodeNumber: 15, title: 'Chapter 15: Purushottama Yoga', subtitle: 'The Supreme Cosmic Being & The Tree of Life', duration: '24:20', videoId: 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP', playlistIndex: 14, raga: 'राग हंसध्वनि' },
      { id: 'gita-ch-16', episodeNumber: 16, title: 'Chapter 16: Daivasura Sampad Vibhaga', subtitle: 'The Divine and Demonic Natures of Humanity', duration: '22:10', videoId: 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP', playlistIndex: 15, raga: 'राग दुर्गा' },
      { id: 'gita-ch-17', episodeNumber: 17, title: 'Chapter 17: Shraddhatraya Vibhaga Yoga', subtitle: 'The Threefold Divisions of Faith & Sacred OM TAT SAT', duration: '25:30', videoId: 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP', playlistIndex: 16, raga: 'राग मारवा' },
      { id: 'gita-ch-18', episodeNumber: 18, title: 'Chapter 18: Moksha Sanyasa Yoga', subtitle: 'The Ultimate Liberation & Surrender to Shri Krishna', duration: '42:15', videoId: 'PL5A5QJkW7MksDFp4b0JYnV-R-tZTRHURP', playlistIndex: 17, raga: 'मोक्ष नाद' }
    ]
  },

  // ── 2. SAMPURNA BHAGAVAT MAHAPURAN KATHA (All Episodes) ───────────────────
  {
    id: 'yt-bhagwat-katha-series',
    title: 'सम्पूर्ण श्रीमद्भागवत महापुराण कथा (Sampurna Bhagavat Katha Episodes)',
    subtitle: 'All Episodes: Shri Krishna Janma, Leela, Uddhava Gita & Moksha Katha',
    category: 'bhagwat_katha',
    categoryLabel: 'Bhagavat Katha',
    youtubeId: 'PL5A5QJkW7MkvYslAbg7_rFij8yVEeiEwF',
    isPlaylist: true,
    thumbnailUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800"><defs><radialGradient id="g2" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="%23fef3c7"/><stop offset="50%" stop-color="%23ea580c"/><stop offset="100%" stop-color="%23050505"/></radialGradient></defs><rect width="100%" height="100%" fill="url(%23g2)"/><circle cx="600" cy="360" r="220" fill="none" stroke="%23fde047" stroke-width="4" opacity="0.6"/><text x="600" y="380" text-anchor="middle" font-family="serif" font-size="72" fill="%23fde047">🛕 🪔 📖</text><text x="600" y="660" text-anchor="middle" font-family="serif" font-size="38" font-weight="bold" fill="%23fde047">॥ श्री पार्थसारथी उपदेश ॥</text></svg>',
    episodeCount: '14 Katha Episodes',
    duration: 'Complete Katha Playlist',
    raga: 'कथा रस एवं भक्ति',
    description: 'The monumental sacred narration of Shrimad Bhagavata Mahapuran: From Suka-Parikshit Samvad to Lord Krishna’s divine pastimes in Vrindavan and Mathura.',
    tags: ['Bhagavat Purana', 'Katha', 'Krishna Leela', 'Vrindavan', 'Uddhava Gita'],
    episodes: [
      { id: 'katha-ep-1',  episodeNumber: 1,  title: 'प्रसंग १: भागवत महात्म्य एवं शुकदेव-परीक्षित संवाद', subtitle: 'श्रीमद्भागवत कथा का प्राकट्य एवं मोक्ष की जिज्ञासा', duration: '45:00', videoId: 'PL5A5QJkW7MkvYslAbg7_rFij8yVEeiEwF', playlistIndex: 0, raga: 'कथा रस' },
      { id: 'katha-ep-2',  episodeNumber: 2,  title: 'प्रसंग २: सृष्टि वर्णन एवं वाराह अवतार कथा', subtitle: 'ब्रह्मा जी की तपस्या एवं धर्म की पुनर्स्थापना', duration: '42:15', videoId: 'PL5A5QJkW7MkvYslAbg7_rFij8yVEeiEwF', playlistIndex: 1, raga: 'राग भूपाली' },
      { id: 'katha-ep-3',  episodeNumber: 3,  title: 'प्रसंग ३: कपिल-देवहूति संवाद एवं सांख्य उपदेश', subtitle: 'माता देवहूति को भगवान कपिल का आत्मज्ञान', duration: '38:40', videoId: 'PL5A5QJkW7MkvYslAbg7_rFij8yVEeiEwF', playlistIndex: 2, raga: 'राग मालकौंस' },
      { id: 'katha-ep-4',  episodeNumber: 4,  title: 'प्रसंग ४: भक्त ध्रुव एवं प्रह्लाद चरित्र', subtitle: 'अटूट भक्ति, नृसिंह अवतार एवं हिरण्यकशिपु उद्धार', duration: '50:10', videoId: 'PL5A5QJkW7MkvYslAbg7_rFij8yVEeiEwF', playlistIndex: 3, raga: 'राग भैरव' },
      { id: 'katha-ep-5',  episodeNumber: 5,  title: 'प्रसंग ५: गजेंद्र मोक्ष एवं समुद्र मंथन लीला', subtitle: 'दीन बंधु भगवान का शरणागत वत्सल रूप', duration: '44:30', videoId: 'PL5A5QJkW7MkvYslAbg7_rFij8yVEeiEwF', playlistIndex: 4, raga: 'राग दरबारी' },
      { id: 'katha-ep-6',  episodeNumber: 6,  title: 'प्रसंग ६: श्री कृष्ण जन्मोत्सव एवं गोकुल आगमन', subtitle: 'नंद के आनंद भयो जय कन्हैया लाल की — दिव्य जन्मोत्सव', duration: '55:00', videoId: 'PL5A5QJkW7MkvYslAbg7_rFij8yVEeiEwF', playlistIndex: 5, raga: 'आनंद रस' },
      { id: 'katha-ep-7',  episodeNumber: 7,  title: 'प्रसंग ७: बाल लीला, पूतना उद्धार एवं माखन चोरी', subtitle: 'यशोदा नंदन की मधुर बाल लीलाएं', duration: '48:20', videoId: 'PL5A5QJkW7MkvYslAbg7_rFij8yVEeiEwF', playlistIndex: 6, raga: 'राग यमन' },
      { id: 'katha-ep-8',  episodeNumber: 8,  title: 'प्रसंग ८: गोवर्धन धारण एवं इंद्र मानभंग', subtitle: 'प्रकृति पूजन एवं ब्रजवासियों की रक्षा', duration: '52:10', videoId: 'PL5A5QJkW7MkvYslAbg7_rFij8yVEeiEwF', playlistIndex: 7, raga: 'राग भूपाली' },
      { id: 'katha-ep-9',  episodeNumber: 9,  title: 'प्रसंग ९: महारास लीला एवं वेणुगीत', subtitle: 'जीवात्मा और परमात्मा का परम प्रेम मिलन', duration: '58:30', videoId: 'PL5A5QJkW7MkvYslAbg7_rFij8yVEeiEwF', playlistIndex: 8, raga: 'महारास नाद' },
      { id: 'katha-ep-10', episodeNumber: 10, title: 'प्रसंग १०: अक्रूर आगमन, मथुरा गमन एवं कंस वध', subtitle: 'दुराचारी कंस का अंत एवं धर्म की विजय', duration: '46:15', videoId: 'PL5A5QJkW7MkvYslAbg7_rFij8yVEeiEwF', playlistIndex: 9, raga: 'वीर रस' },
      { id: 'katha-ep-11', episodeNumber: 11, title: 'प्रसंग ११: रुक्मिणी विवाह एवं द्वारका लीला', subtitle: 'माता रुक्मिणी का पत्र एवं दिव्य पाणिग्रहण', duration: '51:40', videoId: 'PL5A5QJkW7MkvYslAbg7_rFij8yVEeiEwF', playlistIndex: 10, raga: 'राग खमाज' },
      { id: 'katha-ep-12', episodeNumber: 12, title: 'प्रसंग १२: सुदामा चरित्र एवं परम मैत्री', subtitle: 'भगवान श्री कृष्ण और सुदामा जी का अलौकिक मिलन', duration: '47:20', videoId: 'PL5A5QJkW7MkvYslAbg7_rFij8yVEeiEwF', playlistIndex: 11, raga: 'भक्ति रस' },
      { id: 'katha-ep-13', episodeNumber: 13, title: 'प्रसंग १३: उद्धव गीता — भगवान का अंतिम उपदेश', subtitle: 'उद्धव जी को श्री कृष्ण द्वारा सांख्य व योग का सार', duration: '49:10', videoId: 'PL5A5QJkW7MkvYslAbg7_rFij8yVEeiEwF', playlistIndex: 12, raga: 'ज्ञान रस' },
      { id: 'katha-ep-14', episodeNumber: 14, title: 'प्रसंग १४: भागवत पूर्णाहुति, आरती एवं मोक्ष प्राप्ति', subtitle: 'राजा परीक्षित का परम पद गमन एवं कथा विश्राम', duration: '40:00', videoId: 'PL5A5QJkW7MkvYslAbg7_rFij8yVEeiEwF', playlistIndex: 13, raga: 'मोक्ष नाद' }
    ]
  },

  // ── 3. BHAJAN SECTION (Individual Bhajan Tracks) ─────────────────────────
  {
    id: 'yt-bhajan-master-collection-1',
    title: 'परम पावन कृष्ण भजन अमृत (Devotional Krishna Bhajans Vol. 1)',
    subtitle: 'Heart-touching classical bhajans, harmonium melodies & temple bells',
    category: 'bhajan',
    categoryLabel: 'Krishna Bhajans',
    youtubeId: 'PL57FdneUw7RIO-hHlnFWKUccdKFsD4QgX',
    isPlaylist: true,
    thumbnailUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800"><defs><radialGradient id="g3" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="%23bae6fd"/><stop offset="50%" stop-color="%230284c7"/><stop offset="100%" stop-color="%23020617"/></radialGradient></defs><rect width="100%" height="100%" fill="url(%23g3)"/><circle cx="600" cy="360" r="220" fill="none" stroke="%2338bdf8" stroke-width="4" opacity="0.6"/><text x="600" y="380" text-anchor="middle" font-family="serif" font-size="72" fill="%2338bdf8">🎵 🪈 🌊</text><text x="600" y="660" text-anchor="middle" font-family="serif" font-size="38" font-weight="bold" fill="%23bae6fd">॥ श्री यमुना पुलिन मुरली वेणु नाद ॥</text></svg>',
    episodeCount: '10 Devotional Tracks',
    duration: 'Sacred Playlist',
    raga: 'राग भूपाली व यमन',
    description: 'Soulful Krishna bhajans celebrating divine surrender, Govinda vandana, and the sweet names of Hari.',
    tags: ['Bhajan', 'Krishna', 'Surrender', 'Harmonium', 'Govinda'],
    episodes: [
      { id: 'bhajan-1-1', episodeNumber: 1, title: 'अच्युतं केशवम् राम नारायणम् कृष्ण दामोदरम्', subtitle: 'मधुर नाम संकीर्तन एवं शरणागति', duration: '08:45', videoId: 'PL57FdneUw7RIO-hHlnFWKUccdKFsD4QgX', playlistIndex: 0, raga: 'राग भूपाली' },
      { id: 'bhajan-1-2', episodeNumber: 2, title: 'श्री कृष्ण गोविन्द हरे मुरारी हे नाथ नारायण वासुदेवा', subtitle: 'हृदय को शांति प्रदान करने वाला पावन भजन', duration: '12:30', videoId: 'PL57FdneUw7RIO-hHlnFWKUccdKFsD4QgX', playlistIndex: 1, raga: 'राग यमन' },
      { id: 'bhajan-1-3', episodeNumber: 3, title: 'राधे राधे जपो चले आएंगे बिहारी', subtitle: 'वृन्दावन रस एवं राधा नाम महिमा', duration: '09:15', videoId: 'PL57FdneUw7RIO-hHlnFWKUccdKFsD4QgX', playlistIndex: 2, raga: 'राग पीलू' },
      { id: 'bhajan-1-4', episodeNumber: 4, title: 'गोविन्द बोलो हरि गोपाल बोलो', subtitle: 'परम आनंदमय हरि नाम कीर्तन', duration: '07:50', videoId: 'PL57FdneUw7RIO-hHlnFWKUccdKFsD4QgX', playlistIndex: 3, raga: 'राग खमाज' },
      { id: 'bhajan-1-5', episodeNumber: 5, title: 'मधुराष्टकम् — अधरं मधुरं वदनं मधुरम्', subtitle: 'वल्लभाचार्य विरचित दिव्य स्तुति', duration: '11:20', videoId: 'PL57FdneUw7RIO-hHlnFWKUccdKFsD4QgX', playlistIndex: 4, raga: 'राग मालकौंस' },
      { id: 'bhajan-1-6', episodeNumber: 6, title: 'यशोमती मैया से बोले नंदलाला', subtitle: 'यशोदा नंदन का बाल भाव भजन', duration: '06:40', videoId: 'PL57FdneUw7RIO-hHlnFWKUccdKFsD4QgX', playlistIndex: 5, raga: 'राग पहाड़ी' },
      { id: 'bhajan-1-7', episodeNumber: 7, title: 'आरती कुंजबिहारी की श्री गिरिधर कृष्ण मुरारी की', subtitle: 'संध्याकालीन दिव्य मन्दिर आरती', duration: '08:15', videoId: 'PL57FdneUw7RIO-hHlnFWKUccdKFsD4QgX', playlistIndex: 6, raga: 'राग भूपाली' },
      { id: 'bhajan-1-8', episodeNumber: 8, title: 'छोटी छोटी गैया छोटे छोटे ग्वाल', subtitle: 'गोचारण लीला एवं मधुर बाल भजन', duration: '07:10', videoId: 'PL57FdneUw7RIO-hHlnFWKUccdKFsD4QgX', playlistIndex: 7, raga: 'राग पीलू' }
    ]
  },
  {
    id: 'yt-bhajan-master-collection-2',
    title: 'श्री कृष्ण गोविन्द हरे मुरारी भजन संकलन (Krishna Bhajans Vol. 2)',
    subtitle: 'Meditative surrender bhajans for emotional peace and inner harmony',
    category: 'bhajan',
    categoryLabel: 'Krishna Bhajans',
    youtubeId: 'PL2YSr1wL53INq90_tGktMNsATzi6BxbOj',
    isPlaylist: true,
    thumbnailUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800"><defs><radialGradient id="g1" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="%23ffeed1"/><stop offset="50%" stop-color="%23d97706"/><stop offset="100%" stop-color="%230c0a09"/></radialGradient></defs><rect width="100%" height="100%" fill="url(%23g1)"/><circle cx="600" cy="360" r="220" fill="none" stroke="%23fef08a" stroke-width="4" opacity="0.6"/><text x="600" y="380" text-anchor="middle" font-family="serif" font-size="72" fill="%23fef08a">🪷 🦚 🕉️</text><text x="600" y="660" text-anchor="middle" font-family="serif" font-size="38" font-weight="bold" fill="%23fef08a">॥ श्रीमद्भगवद्गीता यथारूप ॥</text></svg>',
    episodeCount: '8 Surrender Bhajans',
    duration: 'Continuous Audio',
    raga: 'राग दरबारी व मालकौंस',
    description: 'Calming devotional bhajans that relieve mental stress and reconnect the consciousness with the lotus feet of Krishna.',
    tags: ['Krishna Govind', 'Acoustic Bhajan', 'Peace', 'Vandana'],
    episodes: [
      { id: 'bhajan-2-1', episodeNumber: 1, title: 'हे नाथ नारायण वासुदेवा — अखंड ध्यान भजन', subtitle: 'गहन शरणागति एवं मानसिक शांति', duration: '15:20', videoId: 'PL2YSr1wL53INq90_tGktMNsATzi6BxbOj', playlistIndex: 0, raga: 'राग दरबारी' },
      { id: 'bhajan-2-2', episodeNumber: 2, title: 'जय माधव मदन मुरारी — हारमोनियम व बाँसुरी', subtitle: 'गोपियों का विरह एवं कृष्ण प्रेम', duration: '10:45', videoId: 'PL2YSr1wL53INq90_tGktMNsATzi6BxbOj', playlistIndex: 1, raga: 'राग यमन' },
      { id: 'bhajan-2-3', episodeNumber: 3, title: 'मेरो मन अनत कहाँ सुख पावे — सूरदास पद', subtitle: 'जैसे उड़ि जहाज को पंछी पुनि जहाज पै आवै', duration: '08:30', videoId: 'PL2YSr1wL53INq90_tGktMNsATzi6BxbOj', playlistIndex: 2, raga: 'राग भैरवी' },
      { id: 'bhajan-2-4', episodeNumber: 4, title: 'गोपाल सांवरिया मेरे — मधुर वंदना', subtitle: 'श्री कृष्ण के चरणों में प्रार्थना', duration: '09:15', videoId: 'PL2YSr1wL53INq90_tGktMNsATzi6BxbOj', playlistIndex: 3, raga: 'राग भूपाली' }
    ]
  },
  {
    id: 'yt-ofi-bhajan-special',
    title: 'दिव्य स्तुति एवं भक्ति भजन (OFI Sacred Bhajans & Stutis)',
    subtitle: 'Soul-stirring devotional stutis, aartis and devotional hymns',
    category: 'bhajan',
    categoryLabel: 'OFI Devotional',
    youtubeId: 'PLuH-I1ovyzeioJ_j4DcQgoxtAbgBc3YD2',
    isPlaylist: true,
    thumbnailUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800"><defs><radialGradient id="g2" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="%23fef3c7"/><stop offset="50%" stop-color="%23ea580c"/><stop offset="100%" stop-color="%23050505"/></radialGradient></defs><rect width="100%" height="100%" fill="url(%23g2)"/><circle cx="600" cy="360" r="220" fill="none" stroke="%23fde047" stroke-width="4" opacity="0.6"/><text x="600" y="380" text-anchor="middle" font-family="serif" font-size="72" fill="%23fde047">🛕 🪔 📖</text><text x="600" y="660" text-anchor="middle" font-family="serif" font-size="38" font-weight="bold" fill="%23fde047">॥ श्री पार्थसारथी उपदेश ॥</text></svg>',
    episodeCount: '6 Sacred Stutis',
    duration: 'Sacred Playlist',
    raga: 'भक्ति रस',
    description: 'Deeply expressive devotional songs, sacred mantras and prayers that invoke divine blessings and clarity.',
    tags: ['OFI Bhajans', 'Stutis', 'Devotional Songs', 'Sanctum Audio'],
    episodes: [
      { id: 'ofi-1', episodeNumber: 1, title: 'श्री कृष्ण अष्टकम् — वसुदेव सुतं देवं कंस चाणूर मर्दनम्', subtitle: 'आदि शंकराचार्य विरचित दिव्य अष्टक', duration: '07:45', videoId: 'PLuH-I1ovyzeioJ_j4DcQgoxtAbgBc3YD2', playlistIndex: 0, raga: 'संस्कृत स्तोत्र' },
      { id: 'ofi-2', episodeNumber: 2, title: 'दामोदर अष्टकम् — नमामीश्वरं सच्चिदानन्दरूपम्', subtitle: 'कार्तिक मास की परम पावन स्तुति', duration: '09:30', videoId: 'PLuH-I1ovyzeioJ_j4DcQgoxtAbgBc3YD2', playlistIndex: 1, raga: 'राग पीलू' },
      { id: 'ofi-3', episodeNumber: 3, title: 'गोविन्द दामोदर स्तोत्रम् — कराग्रे वसते लक्ष्मी', subtitle: 'प्रातःकाल स्मरण एवं शांति स्तोत्र', duration: '08:15', videoId: 'PLuH-I1ovyzeioJ_j4DcQgoxtAbgBc3YD2', playlistIndex: 2, raga: 'राग यमन' }
    ]
  },
  {
    id: 'yt-ultimate-krishna-bhajans',
    title: 'सर्वश्रेष्ठ कृष्ण भजन अमृत धारा (Ultimate Krishna Bhajans Collection)',
    subtitle: 'Achyutam Keshavam, Radhe Krishna, Madhurashtakam & Aarti',
    category: 'bhajan',
    categoryLabel: 'Krishna Bhajans',
    youtubeId: 'PLBO8vPt12vLdn6AmhpfMT1d28lbzE_HMB',
    isPlaylist: true,
    thumbnailUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800"><defs><radialGradient id="g3" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="%23bae6fd"/><stop offset="50%" stop-color="%230284c7"/><stop offset="100%" stop-color="%23020617"/></radialGradient></defs><rect width="100%" height="100%" fill="url(%23g3)"/><circle cx="600" cy="360" r="220" fill="none" stroke="%2338bdf8" stroke-width="4" opacity="0.6"/><text x="600" y="380" text-anchor="middle" font-family="serif" font-size="72" fill="%2338bdf8">🎵 🪈 🌊</text><text x="600" y="660" text-anchor="middle" font-family="serif" font-size="38" font-weight="bold" fill="%23bae6fd">॥ श्री यमुना पुलिन मुरली वेणु नाद ॥</text></svg>',
    episodeCount: 'Full Devotional Series',
    duration: 'Complete Playlist',
    raga: 'राग खमाज व भूपाली',
    description: 'Grand collection of beloved Krishna bhajans with acoustic sitar, flute, harmonium, and traditional choir.',
    tags: ['Achyutam Keshavam', 'Radhe Radhe', 'Madhurashtakam', 'Choir'],
    episodes: [
      { id: 'ult-1', episodeNumber: 1, title: 'अच्युतं केशवम् — अल्टीमेट डिवोशनल क्वायर', subtitle: 'पारंपरिक भारतीय वाद्य एवं मधुर स्वर', duration: '10:20', videoId: 'PLBO8vPt12vLdn6AmhpfMT1d28lbzE_HMB', playlistIndex: 0, raga: 'राग भूपाली' },
      { id: 'ult-2', episodeNumber: 2, title: 'राधा नाम संकीर्तन अमृत रस', subtitle: 'बरसाना एवं वृन्दावन की पावन धुन', duration: '14:10', videoId: 'PLBO8vPt12vLdn6AmhpfMT1d28lbzE_HMB', playlistIndex: 1, raga: 'राग खमाज' }
    ]
  },

  // ── 4. MIND RELAXING & 432Hz MEDITATION MUSIC ────────────────────────────
  {
    id: 'yt-relaxing-live-stream',
    title: '२४/७ कृष्ण बाँसुरी एवं ध्यान संगीत (24/7 Mind Relaxing Krishna Flute)',
    subtitle: 'Live 432Hz Bamboo Bansuri with Sacred River & Binaural Peace',
    category: 'relaxing_meditation',
    categoryLabel: 'Mind Relaxing 432Hz',
    youtubeId: 'PnRFjKgiWWU',
    isPlaylist: false,
    thumbnailUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800"><defs><radialGradient id="g1" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="%23ffeed1"/><stop offset="50%" stop-color="%23d97706"/><stop offset="100%" stop-color="%230c0a09"/></radialGradient></defs><rect width="100%" height="100%" fill="url(%23g1)"/><circle cx="600" cy="360" r="220" fill="none" stroke="%23fef08a" stroke-width="4" opacity="0.6"/><text x="600" y="380" text-anchor="middle" font-family="serif" font-size="72" fill="%23fef08a">🪷 🦚 🕉️</text><text x="600" y="660" text-anchor="middle" font-family="serif" font-size="38" font-weight="bold" fill="%23fef08a">॥ श्रीमद्भगवद्गीता यथारूप ॥</text></svg>',
    duration: '24/7 Live Stream',
    raga: '४३२ हर्ट्ज़ नाद (432Hz Peace)',
    description: 'Pure 432Hz meditative bamboo flute with flowing water and gentle ambient drone for instant anxiety relief and concentration.',
    tags: ['432Hz', 'Flute', 'Live Stream', 'Sleep', 'Deep Focus', 'Meditation'],
    episodes: [
      { id: 'live-flute-main', episodeNumber: 1, title: '२४/७ अखंड कृष्ण बाँसुरी एवं ध्यान नाद', subtitle: '४३२Hz बांसुरी, यमुना प्रवाह एवं शांत वातावरण', duration: '24/7 Live', videoId: 'PnRFjKgiWWU', raga: '४३२ हर्ट्ज़ नाद' }
    ]
  },
  {
    id: 'yt-relaxing-spiritual-music',
    title: 'गहन ध्यान एवं चक्र जाग्रति संगीत (Deep Spiritual Healing & Relaxation)',
    subtitle: 'Tibetan singing bowls, Tanpura drones and peaceful Indian Classical Ragas',
    category: 'relaxing_meditation',
    categoryLabel: 'Healing Meditation',
    youtubeId: 'PLM3TSQaW_spN7_X2Iez04X0naC8K3rHNh',
    isPlaylist: true,
    thumbnailUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800"><defs><radialGradient id="g2" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="%23fef3c7"/><stop offset="50%" stop-color="%23ea580c"/><stop offset="100%" stop-color="%23050505"/></radialGradient></defs><rect width="100%" height="100%" fill="url(%23g2)"/><circle cx="600" cy="360" r="220" fill="none" stroke="%23fde047" stroke-width="4" opacity="0.6"/><text x="600" y="380" text-anchor="middle" font-family="serif" font-size="72" fill="%23fde047">🛕 🪔 📖</text><text x="600" y="660" text-anchor="middle" font-family="serif" font-size="38" font-weight="bold" fill="%23fde047">॥ श्री पार्थसारथी उपदेश ॥</text></svg>',
    episodeCount: '6 Healing Soundscapes',
    duration: 'Multi-Track Audio',
    raga: '५२८Hz डीएनए हीलिंग',
    description: 'Carefully curated soothing soundscapes and alpha wave frequencies for pranayama, yoga sadhana, and deep restful sleep.',
    tags: ['528Hz', 'Alpha Waves', 'Relaxation', 'Pranayama', 'Chakra'],
    episodes: [
      { id: 'rel-1', episodeNumber: 1, title: '५२८Hz डीएनए हीलिंग एवं कृष्ण ध्यान संगीत', subtitle: 'कोशिकाओं का नवीनीकरण एवं आंतरिक शांति', duration: '30:00', videoId: 'PLM3TSQaW_spN7_X2Iez04X0naC8K3rHNh', playlistIndex: 0, raga: '५२८Hz हीलिंग' },
      { id: 'rel-2', episodeNumber: 2, title: 'ब्रह्म मुहूर्त अल्फा तरंगें एवं तानपुरा नाद', subtitle: 'प्रातःकालीन ध्यान एवं प्राणायाम साधना', duration: '25:40', videoId: 'PLM3TSQaW_spN7_X2Iez04X0naC8K3rHNh', playlistIndex: 1, raga: 'अल्फा नाद' }
    ]
  },

  // ── 5. KIRTAN SECTION (Ecstatic Kirtan Tracks) ───────────────────────────
  {
    id: 'yt-kirtan-collection-1',
    title: 'हरे कृष्ण महासंकीर्तन धारा (Ecstatic Mahamantra Kirtans Part 1)',
    subtitle: 'Traditional Mridanga, Kartals and joyful congregational chanting',
    category: 'kirtan',
    categoryLabel: 'Maha Kirtan',
    youtubeId: 'PL1jVQ7Hzg9gk_oSTIiBF62DAC_y3sjFzb',
    isPlaylist: true,
    thumbnailUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800"><defs><radialGradient id="g3" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="%23bae6fd"/><stop offset="50%" stop-color="%230284c7"/><stop offset="100%" stop-color="%23020617"/></radialGradient></defs><rect width="100%" height="100%" fill="url(%23g3)"/><circle cx="600" cy="360" r="220" fill="none" stroke="%2338bdf8" stroke-width="4" opacity="0.6"/><text x="600" y="380" text-anchor="middle" font-family="serif" font-size="72" fill="%2338bdf8">🎵 🪈 🌊</text><text x="600" y="660" text-anchor="middle" font-family="serif" font-size="38" font-weight="bold" fill="%23bae6fd">॥ श्री यमुना पुलिन मुरली वेणु नाद ॥</text></svg>',
    episodeCount: '8 Kirtan Tracks',
    duration: 'Full Kirtan Playlist',
    raga: 'संकीर्तन ताल',
    description: 'Soul-uplifting Hare Krishna Mahamantra kirtans that fill the atmosphere with devotion, joy, and divine energy.',
    tags: ['Hare Krishna', 'Maha Mantra', 'Kirtan', 'Mridanga', 'Kartals'],
    episodes: [
      { id: 'kirtan-1-1', episodeNumber: 1, title: 'हरे कृष्ण हरे राम महासंकीर्तन — अखंड ताल', subtitle: 'पारंपरिक मृदंग एवं करताल की पावन गूंज', duration: '20:15', videoId: 'PL1jVQ7Hzg9gk_oSTIiBF62DAC_y3sjFzb', playlistIndex: 0, raga: 'संकीर्तन' },
      { id: 'kirtan-1-2', episodeNumber: 2, title: 'गौरांग महाप्रभु संकीर्तन — भावावेश कीर्तन', subtitle: 'आनंदमय संकीर्तन रस', duration: '18:40', videoId: 'PL1jVQ7Hzg9gk_oSTIiBF62DAC_y3sjFzb', playlistIndex: 1, raga: 'राग पीलू' }
    ]
  },
  {
    id: 'yt-kirtan-collection-2',
    title: 'वृन्दावन दिव्य नाम संकीर्तन (Vrindavan Sweet Kirtan Melodies Part 2)',
    subtitle: 'Melodic call-and-response kirtans from the holy temples of Braj',
    category: 'kirtan',
    categoryLabel: 'Vrindavan Kirtan',
    youtubeId: 'PLCjL13auTbr9MqL_i4L3XS-TnVkBP06QK',
    isPlaylist: true,
    thumbnailUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800"><defs><radialGradient id="g1" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="%23ffeed1"/><stop offset="50%" stop-color="%23d97706"/><stop offset="100%" stop-color="%230c0a09"/></radialGradient></defs><rect width="100%" height="100%" fill="url(%23g1)"/><circle cx="600" cy="360" r="220" fill="none" stroke="%23fef08a" stroke-width="4" opacity="0.6"/><text x="600" y="380" text-anchor="middle" font-family="serif" font-size="72" fill="%23fef08a">🪷 🦚 🕉️</text><text x="600" y="660" text-anchor="middle" font-family="serif" font-size="38" font-weight="bold" fill="%23fef08a">॥ श्रीमद्भगवद्गीता यथारूप ॥</text></svg>',
    episodeCount: '6 Temple Melodies',
    duration: 'Non-stop Chanting',
    raga: 'राग पीलू व भैरवी',
    description: 'Heart-melting kirtans recorded in the sacred ambiance of Vrindavan temples, invoking deep peace and devotion.',
    tags: ['Vrindavan Kirtan', 'Braj Melodies', 'Chanting', 'Joy'],
    episodes: [
      { id: 'kirtan-2-1', episodeNumber: 1, title: 'वृन्दावन मन्दिर कीर्तन — श्री राधा रमण जी की जय', subtitle: 'ब्रज की मधुर संकीर्तन परंपरा', duration: '22:00', videoId: 'PLCjL13auTbr9MqL_i4L3XS-TnVkBP06QK', playlistIndex: 0, raga: 'राग भैरवी' }
    ]
  },
  {
    id: 'yt-kirtan-collection-3',
    title: 'अखंड नाम जप एवं मृदंग नाद (Akhand Namasankirtan & Drums Part 3)',
    subtitle: 'Traditional Bengali & Braj style classical pakhawaj and mridanga kirtans',
    category: 'kirtan',
    categoryLabel: 'Akhand Kirtan',
    youtubeId: 'PLhtmKWc6vRTDu2bivBOJejQvbWgO-sS1z',
    isPlaylist: true,
    thumbnailUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800"><defs><radialGradient id="g2" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="%23fef3c7"/><stop offset="50%" stop-color="%23ea580c"/><stop offset="100%" stop-color="%23050505"/></radialGradient></defs><rect width="100%" height="100%" fill="url(%23g2)"/><circle cx="600" cy="360" r="220" fill="none" stroke="%23fde047" stroke-width="4" opacity="0.6"/><text x="600" y="380" text-anchor="middle" font-family="serif" font-size="72" fill="%23fde047">🛕 🪔 📖</text><text x="600" y="660" text-anchor="middle" font-family="serif" font-size="38" font-weight="bold" fill="%23fde047">॥ श्री पार्थसारथी उपदेश ॥</text></svg>',
    episodeCount: 'Traditional Kirtan Stream',
    duration: 'Continuous Audio',
    raga: 'पारंपरिक संकीर्तन',
    description: 'Sacred rhythmic chanting of Lord Hari’s holy names with acoustic percussion that cleanses the heart (Ceto-darpana-marjanam).',
    tags: ['Akhand Kirtan', 'Pakhawaj', 'Hari Nama', 'Braj'],
    episodes: [
      { id: 'kirtan-3-1', episodeNumber: 1, title: 'अखंड हरि नाम कीर्तन — पखावज व करताल', subtitle: 'चित्त शुद्धि एवं परम शांति', duration: '25:30', videoId: 'PLhtmKWc6vRTDu2bivBOJejQvbWgO-sS1z', playlistIndex: 0, raga: 'संकीर्तन ताल' }
    ]
  },
  {
    id: 'yt-kirtan-collection-4',
    title: 'श्री राधा गोविंद महासंकीर्तन (Shri Radha Govind Mahakirtan Part 4)',
    subtitle: 'Blissful choir chants, flute interludes and devotional celebrations',
    category: 'kirtan',
    categoryLabel: 'Radha Govind Kirtan',
    youtubeId: 'PL85YVpg0rX2QJXZELyY-FCZjd35l5oa_u',
    isPlaylist: true,
    thumbnailUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800"><defs><radialGradient id="g3" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="%23bae6fd"/><stop offset="50%" stop-color="%230284c7"/><stop offset="100%" stop-color="%23020617"/></radialGradient></defs><rect width="100%" height="100%" fill="url(%23g3)"/><circle cx="600" cy="360" r="220" fill="none" stroke="%2338bdf8" stroke-width="4" opacity="0.6"/><text x="600" y="380" text-anchor="middle" font-family="serif" font-size="72" fill="%2338bdf8">🎵 🪈 🌊</text><text x="600" y="660" text-anchor="middle" font-family="serif" font-size="38" font-weight="bold" fill="%23bae6fd">॥ श्री यमुना पुलिन मुरली वेणु नाद ॥</text></svg>',
    episodeCount: 'Complete Kirtan Series',
    duration: 'Sacred Audio Playlist',
    raga: 'राग पहाड़ी व भूपाली',
    description: 'Sublime kirtan tracks celebrating the eternal glory of Radha and Krishna with soaring melodies and acoustic accompaniment.',
    tags: ['Radha Govind', 'Mahakirtan', 'Ecstasy', 'Flute Interlude'],
    episodes: [
      { id: 'kirtan-4-1', episodeNumber: 1, title: 'श्री राधा गोविंद जय जय — दिव्य उत्सव कीर्तन', subtitle: 'दिव्य आनंद एवं प्रेम रस', duration: '24:00', videoId: 'PL85YVpg0rX2QJXZELyY-FCZjd35l5oa_u', playlistIndex: 0, raga: 'राग पहाड़ी' }
    ]
  }
];
