'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, Play, Pause, Volume2, ArrowRight, 
  Download, MessageSquare, Share2, Check, Flame, RefreshCw 
} from 'lucide-react';
import { getMasterTimestampForVerse } from '@/data/gitaMasterAudioTimestamps';
import { getArtworkForShloka } from '@/data/krishnaArtworks';
import { getChapterTheme } from '@/data/chapterThemes';
import { sacredAudio } from '@/lib/sacredSounds';
import { useGlobalAudio } from '@/context/GlobalAudioContext';
import SacredArtworkImage from '@/components/SacredArtworkImage';

const FEATURED_DAILY_VERSES = [
  {
    chapter: 2,
    verse: 47,
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    iast: 'karmaṇy-evādhikāras te mā phaleṣu kadācana | mā karma-phala-hetur bhūr mā te saṅgo \'stv akarmaṇi ||',
    translation_hi: 'तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए कर्मफल की वासना से मुक्त होकर अनासक्त भाव से कर्तव्य का पालन करो।',
    theme: 'निष्काम कर्म व भयमुक्ति (Selfless Action & Fearlessness)'
  },
  {
    chapter: 6,
    verse: 35,
    sanskrit: 'असंशयं महाबाहो मनो दुर्निग्रहं चलम्।\nअभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते॥',
    iast: 'asaṁśayaṁ mahā-bāho mano durnigrahaṁ calam | abhyāsena tu kaunteya vairāgyeṇa ca gṛhyate ||',
    translation_hi: 'हे महाबाहो! निःसंदेह मन चंचल और कठिनता से वश में होने वाला है, परन्तु निरंतर अभ्यास और वैराग्य से इसे पूर्णतः वश में किया जा सकता है।',
    theme: 'मन की एकाग्रता व विजय (Mind Control & Focus)'
  },
  {
    chapter: 9,
    verse: 22,
    sanskrit: 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥',
    iast: 'ananyāś cintayanto māṁ ye janāḥ paryupāsate | teṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham ||',
    translation_hi: 'जो अनन्य भाव से मेरा स्मरण करते हुए निष्काम उपासना करते हैं, उन नित्य-युक्त भक्तों के योग और क्षेम (सुरक्षा व समृद्धि) का वहन मैं स्वयं करता हूँ।',
    theme: 'ईश्वर की अहैतुकी कृपा (Divine Protection & Grace)'
  },
  {
    chapter: 18,
    verse: 66,
    sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥',
    iast: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja | ahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ ||',
    translation_hi: 'सब प्रकार के धर्मों और बंधनों को मुझमें त्यागकर केवल मेरी शरण में आ जाओ। मैं तुम्हें समस्त पापों और बंधनों से मुक्त कर दूंगा, शोक मत करो।',
    theme: 'परम मोक्ष व आत्म-समर्पण (Ultimate Liberation & Surrender)'
  }
];

const DEVANAGARI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
function toDevanagariNum(num: number): string {
  return num.toString().split('').map(d => DEVANAGARI_DIGITS[parseInt(d, 10)] || d).join('');
}

export default function DailyVerseSpotlight() {
  const { currentTrack, isPlaying, playTrack, togglePlayPause, setActiveCardGeneratorVerse } = useGlobalAudio();
  const [verseIndex, setVerseIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Pick today's index deterministically based on date
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    setVerseIndex(dayOfYear % FEATURED_DAILY_VERSES.length);
  }, []);

  const v = FEATURED_DAILY_VERSES[verseIndex];
  const chapterTheme = getChapterTheme(v.chapter);
  const masterTs = getMasterTimestampForVerse(v.chapter, v.verse);
  const isPlayingThis = currentTrack?.chapter === v.chapter && currentTrack?.verse === v.verse && isPlaying;
  const artworkUrl = getArtworkForShloka(v.chapter, v.verse);

  const handleNextVerse = () => {
    setVerseIndex((verseIndex + 1) % FEATURED_DAILY_VERSES.length);
    sacredAudio.playNavChime(0.06);
  };

  const handleCopy = () => {
    const text = `आज का दिव्य गीता श्लोक (${v.chapter}.${v.verse})\n\n${v.sanskrit}\n\nअर्थ: ${v.translation_hi}\n\nhttps://githd.vercel.app/chapter/${v.chapter}/${v.verse}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    sacredAudio.playNavChime(0.08);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="relative rounded-3xl bg-gradient-to-r from-[#161829]/95 via-[#0e101a]/95 to-[#161829]/95 backdrop-blur-2xl border-2 border-amber-400/40 p-5 sm:p-8 shadow-2xl overflow-hidden transition-all duration-500 hover:border-amber-400"
      style={{ boxShadow: '0 10px 40px rgba(245, 158, 11, 0.2)' }}
    >
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
        
        {/* Left: HD Artwork & Quick Play Disc */}
        <div className="w-full lg:w-72 shrink-0 space-y-3">
          <div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden bg-black border border-[#c5a059]/30 shadow-xl group">
            <SacredArtworkImage
              src={artworkUrl}
              alt={`श्लोक ${v.chapter}.${v.verse}`}
              chapter={v.chapter}
              verse={v.verse}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            
            {/* Live Play Button Floating */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => {
                  if (isPlayingThis) {
                    togglePlayPause();
                  } else {
                    playTrack(v.chapter, v.verse, v.sanskrit, v.translation_hi);
                  }
                }}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 text-black flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.8)] hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white"
                title={isPlayingThis ? 'रोकें' : 'सस्वर शास्त्रीय वाचन सुनें'}
              >
                {isPlayingThis ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
              </button>
            </div>

            {/* Badge */}
            <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md border border-[#c5a059]/40 text-xs font-mono font-bold text-yellow-300">
              ॥ श्लोक {toDevanagariNum(v.chapter)}.{toDevanagariNum(v.verse)} ॥
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-[#c5a059]/80 px-1">
            <span>समय: {masterTs.formattedStart}</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>एचडी ऑडियो सक्रिय</span>
            </span>
          </div>
        </div>

        {/* Right: Shloka Content & Translation */}
        <div className="flex-1 space-y-4 text-center lg:text-left min-w-0">
          
          <div className="flex flex-wrap items-center justify-center lg:justify-between gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-xs font-serif text-yellow-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>आज का पावन विचार • {v.theme}</span>
            </div>

            {/* Next Shloka Switcher */}
            <button
              onClick={handleNextVerse}
              className="px-3 py-1 rounded-xl bg-[#141624] hover:bg-[#1e2238] border border-[#c5a059]/25 text-xs font-serif text-[#e6c687] flex items-center gap-1.5 cursor-pointer transition-colors"
              title="अन्य दैनिक श्लोक देखें"
            >
              <RefreshCw className="w-3 h-3 text-amber-400" />
              <span>अन्य श्लोक</span>
            </button>
          </div>

          {/* Sacred Sanskrit Verse */}
          <p className="font-devanagari text-lg sm:text-2xl text-[#f5eed9] font-medium leading-relaxed drop-shadow-md">
            {v.sanskrit.split('\n').map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </p>

          {/* Hindi Translation */}
          <div className="p-3.5 rounded-2xl bg-[#090b14]/90 border border-[#c5a059]/20 text-left">
            <span className="text-[10px] font-sans font-bold text-amber-400 uppercase tracking-wider block mb-1">
              सरल भावार्थ:
            </span>
            <p className="text-xs sm:text-sm text-[#f5eed9]/90 font-serif leading-relaxed">
              {v.translation_hi}
            </p>
          </div>

          {/* Action Deck */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            <Link
              href={`/chapter/${v.chapter}/${v.verse}`}
              onClick={() => sacredAudio.playTempleBell(0.2)}
              className="px-5 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black text-xs font-serif font-bold flex items-center gap-1.5 shadow-lg transition-transform hover:scale-102 cursor-pointer"
            >
              <span>सम्पूर्ण अध्ययन व उच्चारण खोलें</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => {
                setActiveCardGeneratorVerse({
                  chapter: v.chapter,
                  verse: v.verse,
                  devanagari: v.sanskrit,
                  iast: v.iast,
                  translation_hi: v.translation_hi
                } as any);
                sacredAudio.playNavChime(0.08);
              }}
              className="px-4 py-2 rounded-2xl bg-[#141624] hover:bg-[#1e2238] border border-[#c5a059]/30 text-xs font-serif text-[#e6c687] hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>वॉलपेपर कार्ड बनाएं</span>
            </button>

            <button
              onClick={handleCopy}
              className="p-2 rounded-2xl bg-[#141624] hover:bg-[#1e2238] border border-[#c5a059]/25 text-[#c5a059] hover:text-white cursor-pointer transition-colors"
              title="श्लोक कॉपी करें"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
