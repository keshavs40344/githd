'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Play, Pause, Search, Radio, ArrowRight, Sparkles,
  ChevronRight, Volume2, Download, Share2, Check,
  RefreshCw, Heart, ShieldCheck, Users, BookOpen,
  MessageSquare, Flame, Star, Clock, Globe2, Zap,
  Moon, Sun, HeartHandshake, Compass, Trophy, Bell,
  Music, Eye, TrendingUp, Lightbulb, Flower2
} from 'lucide-react';

import { CHAPTERS } from '@/types/verse';
import { getChapterTheme } from '@/data/chapterThemes';
import { getMasterTimestampForVerse } from '@/data/gitaMasterAudioTimestamps';
import { getArtworkForShloka } from '@/data/krishnaArtworks';
import { sacredAudio } from '@/lib/sacredSounds';
import { useGlobalAudio } from '@/context/GlobalAudioContext';
import SacredArtworkImage from '@/components/SacredArtworkImage';
import EmotionalSanctuary from '@/components/EmotionalSanctuary';
import SacredJapaMala from '@/components/SacredJapaMala';
import KrishnaAIChat from '@/components/KrishnaAIChat';
import FamilyDevoteeSanctuary from '@/components/FamilyDevoteeSanctuary';
import WhyChooseDharmaOS from '@/components/WhyChooseDharmaOS';
import { HUNDRED_LIFE_DILEMMAS } from '@/data/hundredLifeDilemmas';
import LiveOnlineRadioModal from '@/components/LiveOnlineRadioModal';
import InteractiveTempleAltar from '@/components/InteractiveTempleAltar';
import KrishnaWallpaperGallery from '@/components/KrishnaWallpaperGallery';
import IskconDevoteeSanctuaryModal from '@/components/IskconDevoteeSanctuaryModal';

// ── Helpers ──────────────────────────────────────────────────────────────────
const DN = ['०','१','२','३','४','५','६','७','८','९'];
const toDN = (n: number) => n.toString().split('').map(d => DN[+d]??d).join('');

// ── Live Sacred Stats ─────────────────────────────────────────────────────────
const LIVE_STATS = [
  { label: 'सम्पूर्ण श्लोक', value: '७०० श्लोक', icon: '📖', sub: '१८ अध्याय • सम्पूर्ण भाष्य' },
  { label: 'शास्त्रीय भाष्यकार', value: '७ भाष्य', icon: '🕉️', sub: 'शंकराचार्य, रामानुजाचार्य आदि' },
  { label: 'जीवन समाधान', value: '१०८ समाधान', icon: '🎯', sub: 'हर मानवीय द्वन्द्व का निवारण' },
  { label: 'आजीवन निःशुल्क', value: '१००% मुफ़्त', icon: '🪔', sub: 'विशुद्ध सनातन ज्ञान सेवा' },
];

// ── Daily Featured Verses ─────────────────────────────────────────────────────
const DAILY_VERSES = [
  { chapter:2, verse:47, title:'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन', theme:'निष्काम कर्म योग', tag:'करियर • कर्तव्य • तनाव मुक्ति',
    hi:'तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। अतः फल की आसक्ति त्यागकर निष्काम भाव से श्रेष्ठ कर्म करो।'},
  { chapter:6, verse:35, title:'असंशयं महाबाहो मनो दुर्निग्रहं चलम्', theme:'मन की एकाग्रता', tag:'ध्यान • फोकस • शांति',
    hi:'हे महाबाहो! निःसंदेह मन चंचल और कठिनता से वश में आने वाला है, किन्तु निरंतर अभ्यास और वैराग्य से इसे पूर्ण वश में किया जा सकता है।'},
  { chapter:9, verse:22, title:'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते', theme:'ईश्वर का संरक्षण', tag:'भक्ति • अभय • योगक्षेम',
    hi:'जो अनन्य भाव से निरंतर मेरा चिंतन और भजन करते हैं, उन नित्य-युक्त भक्तों के योग-क्षेम का संपूर्ण भार मैं स्वयं वहन करता हूँ।'},
  { chapter:18, verse:66, title:'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज', theme:'पूर्ण शरणागति', tag:'मोक्ष • अभयदान • कृपा',
    hi:'सम्पूर्ण सांसारिक आश्रयों को छोड़कर केवल मेरी अनन्य शरण में आ जाओ। मैं तुम्हें समस्त पापों व भयों से मुक्त कर दूँगा, शोक मत करो।'},
  { chapter:2, verse:20, title:'न जायते म्रियते वा कदाचिन्', theme:'आत्मा की अमरता', tag:'मृत्यु-भय • आत्म-ज्ञान',
    hi:'यह आत्मा न कभी जन्म लेती है और न कभी मरती है। यह अजन्मा, नित्य, शाश्वत और पुरातन है। शरीर के नष्ट होने पर भी आत्मा कभी नष्ट नहीं होती।'},
  { chapter:4, verse:7, title:'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत', theme:'ईश्वर का दिव्य अवतरण', tag:'धर्म-संस्थापन • रक्षण',
    hi:'हे भारत! जब-जब धर्म की हानि और अधर्म की वृद्धि होती है, तब-तब मैं साधुओं की रक्षा और धर्म की स्थापना हेतु स्वयं को प्रकट करता हूँ।'},
];

// ── Quick Healing Shortcuts ───────────────────────────────────────────────────
const QUICK_HEALS = [
  { label: 'चिंता व घबराहट', icon: '🌧️', chapter: 2, verse: 14 },
  { label: 'क्रोध व अशांति', icon: '🔥', chapter: 2, verse: 63 },
  { label: 'करियर व असफलता', icon: '🎯', chapter: 6, verse: 40 },
  { label: 'दिल टूटना व अकेलापन', icon: '💔', chapter: 2, verse: 62 },
  { label: 'एकाग्रता व फोकस', icon: '🧘', chapter: 6, verse: 35 },
  { label: 'आत्मविश्वास की कमी', icon: '⚡', chapter: 4, verse: 39 },
  { label: 'पारिवारिक कलह', icon: '🏡', chapter: 17, verse: 15 },
  { label: 'मृत्यु व अनजाना भय', icon: '🕊️', chapter: 2, verse: 22 },
];

export default function DharmaHomePage({ verses }: { verses?: any[] }) {
  const { currentTrack, isPlaying, playTrack, togglePlayPause, setIsSearchModalOpen } = useGlobalAudio();
  const [activeTab, setActiveTab] = useState<'scripture'|'dilemmas'|'healer'|'sadhana'|'mentor'|'wallpapers'>('scripture');
  const [dailyIdx, setDailyIdx] = useState(0);
  const [chapterYogaFilter, setChapterYogaFilter] = useState<'all' | 'karma' | 'bhakti' | 'jnana'>('all');
  const [chapterSearchQuery, setChapterSearchQuery] = useState('');

  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeDilemma, setActiveDilemma] = useState(HUNDRED_LIFE_DILEMMAS[0]);

  useEffect(() => {
    const day = Math.floor((Date.now() - new Date(new Date().getFullYear(),0,0).getTime()) / 86400000);
    setDailyIdx(day % DAILY_VERSES.length);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { 
        e.preventDefault(); 
        setIsSearchModalOpen(true); 
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setIsSearchModalOpen]);

  const dv = DAILY_VERSES[dailyIdx];
  const isPlayingDv = currentTrack?.chapter === dv.chapter && currentTrack?.verse === dv.verse && isPlaying;

  const handlePlayDaily = () => {
    if (isPlayingDv) togglePlayPause();
    else { playTrack(dv.chapter, dv.verse, dv.title, dv.hi); sacredAudio.playFluteChime(0.3); }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${dv.hi}"\n— श्रीमद्भगवद्गीता ${dv.chapter}.${dv.verse}\nhttps://githd.vercel.app/chapter/${dv.chapter}/${dv.verse}`);
    setCopied(true); sacredAudio.playNavChime(0.08);
    setTimeout(() => setCopied(false), 2000);
  };

  // Chapter filtering by Yoga & Search Query
  const filteredChapters = CHAPTERS.filter(ch => {
    if (chapterYogaFilter === 'karma' && (ch.number < 1 || ch.number > 6)) return false;
    if (chapterYogaFilter === 'bhakti' && (ch.number < 7 || ch.number > 12)) return false;
    if (chapterYogaFilter === 'jnana' && (ch.number < 13 || ch.number > 18)) return false;
    
    if (chapterSearchQuery.trim()) {
      const q = chapterSearchQuery.toLowerCase().trim();
      return (
        ch.number.toString() === q ||
        ch.name_sanskrit.toLowerCase().includes(q) ||
        ch.name_en.toLowerCase().includes(q) ||
        ch.summary_hi.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredDilemmas = HUNDRED_LIFE_DILEMMAS.filter(d => {
    const matchCat = categoryFilter === 'all' || d.category === categoryFilter;
    const matchQ = !searchQuery || d.problem.toLowerCase().includes(searchQuery.toLowerCase()) || d.problemSummary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQ;
  });

  const TAB_DEFS = [
    { id:'scripture',  icon:'📖', label:'१८ अध्याय',      sub:'७०० सम्पूर्ण श्लोक' },
    { id:'dilemmas',   icon:'🎯', label:'१०८ जीवन समाधान', sub:'हर समस्या का हल' },
    { id:'mentor',     icon:'💬', label:'श्रीकृष्ण AI संवाद', sub:'प्रत्यक्ष मार्गदर्शन' },
    { id:'sadhana',    icon:'📿', label:'दैनिक जप माला',    sub:'१०८ नाम साधना' },
    { id:'healer',     icon:'❤️', label:'मानसिक शांति',   sub:'तनाव-मुक्ति केंद्र' },
    { id:'wallpapers', icon:'🖼️', label:'4K कृष्ण गैलरी', sub:'निःशुल्क वॉलपेपर्स' },
  ];

  return (
    <div className="min-h-screen bg-[#070810] text-[#f5eed9] selection:bg-amber-500/30 selection:text-white">

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — ROYAL DIVINE TEMPLE HERO BANNER
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-4 pb-8">
        {/* Background Sacred Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1224] via-[#070812] to-[#05060b] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-amber-500/15 via-yellow-500/5 to-transparent blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* ── Sacred Top Aura Badges ───────────────────────────────────── */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-serif shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <span className="text-base">🦚</span>
              <span className="font-bold">श्री राधा-कृष्ण दिव्य महामन्दिर</span>
            </div>
            
            <div 
              onClick={() => { sacredAudio.playTempleBell(0.6); }} 
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-400/40 text-orange-300 text-xs font-serif cursor-pointer hover:border-orange-400 hover:scale-103 transition-all shadow-sm"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse text-orange-400" />
              <span className="font-bold">२४x७ अखण्ड कृष्ण भजन व मुरली रेडियो</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-serif">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>१००% प्रामाणिक • निःशुल्क ज्ञान सेवा</span>
            </div>
          </div>

          {/* ── Main Hero Title & Royal Sanskrit Blessing ────────────────── */}
          <div className="text-center space-y-4 mb-8">
            <div className="inline-block">
              <span className="text-xs sm:text-sm font-devanagari font-bold text-[#c5a059] tracking-widest uppercase block mb-1">
                ॥ यतो धर्मस्ततो जयः • सर्वभूतहिते रताः ॥
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-devanagari font-black leading-tight tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
                <span className="text-[#f5eed9]">श्रीमद्</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">भगवद्गीता</span>
              </h1>
            </div>

            <p className="text-sm sm:text-lg text-[#f5eed9]/85 font-serif max-w-2xl mx-auto leading-relaxed">
              भगवान श्रीकृष्ण के दिव्य मुखारविन्द से निःसृत शाश्वत अमृत वाणी — सम्पूर्ण ७०० श्लोक, 
              शास्त्रीय स्वर, और जीवन के प्रत्येक द्वन्द्व का प्रत्यक्ष कल्याणकारी समाधान।
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => { setIsSearchModalOpen(true); sacredAudio.playNavChime(0.06); }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-serif font-bold text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>अपनी समस्या का गीता समाधान खोजें</span>
                <kbd className="bg-black/20 text-[10px] px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
              </button>

              <IskconDevoteeSanctuaryModal />

              <button
                onClick={() => { sacredAudio.playTempleBell(0.6); }}
                className="px-5 py-3 rounded-2xl bg-[#141628] border-2 border-amber-400/40 text-amber-300 font-serif text-sm font-bold flex items-center gap-2 hover:border-amber-400 hover:bg-[#1e2238] transition-all cursor-pointer shadow-md"
              >
                <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>२४x७ अखण्ड रेडियो</span>
              </button>
            </div>
          </div>

          {/* ── 4 Essential Devotional Stats ─────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
            {LIVE_STATS.map((s, i) => (
              <div key={i} className="p-4 rounded-2xl bg-gradient-to-b from-[#101326]/90 to-[#090b14]/90 border border-amber-400/25 hover:border-amber-400/60 shadow-lg transition-all text-center group">
                <div className="text-2xl mb-1.5 group-hover:scale-110 transition-transform">{s.icon}</div>
                <div className="text-lg sm:text-xl font-devanagari font-bold text-amber-300">{s.value}</div>
                <div className="text-xs font-serif text-[#f5eed9]/90 font-bold mt-0.5">{s.label}</div>
                <div className="text-[10px] text-[#c5a059]/70 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* ── TODAY'S SACRED VERSE SPOTLIGHT ────────────────────────────── */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#14172e] via-[#0c0e1a] to-[#14172e] border-2 border-amber-400/40 p-5 sm:p-7 shadow-[0_15px_60px_rgba(0,0,0,0.8)] overflow-hidden mb-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              
              {/* Artwork + Play Disc */}
              <div className="shrink-0 relative w-full lg:w-56">
                <div className="relative h-44 sm:h-52 lg:h-44 rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-xl group">
                  <SacredArtworkImage
                    src={getArtworkForShloka(dv.chapter, dv.verse)}
                    alt={`Shloka ${dv.chapter}.${dv.verse}`}
                    chapter={dv.chapter}
                    verse={dv.verse}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Chapter badge */}
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-mono text-amber-300 font-bold border border-amber-400/40">
                    ॥ अध्याय {toDN(dv.chapter)} • श्लोक {toDN(dv.verse)} ॥
                  </div>

                  {/* Play Button */}
                  <button
                    onClick={handlePlayDaily}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.8)] hover:scale-110 active:scale-95 transition-all border-2 border-white/40">
                      {isPlayingDv ? <Pause className="w-5 h-5 text-black fill-current" /> : <Play className="w-5 h-5 text-black fill-current ml-0.5" />}
                    </div>
                  </button>
                </div>

                <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-amber-300/80 px-1">
                  <span>⏱ {getMasterTimestampForVerse(dv.chapter, dv.verse).formattedStart}</span>
                  <span className="text-emerald-400 font-bold">HD Audio ✓</span>
                </div>
              </div>

              {/* Verse Content */}
              <div className="flex-1 space-y-3 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-serif flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <strong>आज का दिव्य विचार:</strong> {dv.theme}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#141624] border border-[#c5a059]/30 text-amber-200/70 text-[10px] font-mono">
                    {dv.tag}
                  </span>
                  <button 
                    onClick={() => { setDailyIdx((dailyIdx+1)%DAILY_VERSES.length); sacredAudio.playNavChime(0.06); }}
                    className="ml-auto px-2.5 py-1 rounded-xl bg-[#141624] border border-amber-400/20 text-amber-300 hover:text-white text-[10px] font-serif flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> अन्य श्लोक
                  </button>
                </div>

                <p className="font-devanagari text-lg sm:text-2xl text-[#f5eed9] font-bold leading-relaxed">
                  {dv.title}…
                </p>

                <div className="p-3.5 rounded-2xl bg-[#090b14]/90 border border-amber-400/20">
                  <p className="text-xs sm:text-sm text-[#f5eed9]/90 font-serif leading-relaxed italic">
                    "{dv.hi}"
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Link
                    href={`/chapter/${dv.chapter}/${dv.verse}`}
                    onClick={() => sacredAudio.playTempleBell(0.2)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-serif font-bold flex items-center gap-1.5 shadow-md hover:scale-102 transition-all cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> सम्पूर्ण श्लोक व ७ भाष्य खोलें <ArrowRight className="w-3 h-3" />
                  </Link>
                  <button 
                    onClick={handlePlayDaily}
                    className="px-3.5 py-2 rounded-xl bg-[#141624] border border-amber-400/30 text-amber-300 text-xs font-serif flex items-center gap-1.5 cursor-pointer hover:border-amber-400"
                  >
                    {isPlayingDv ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isPlayingDv ? 'रोकें' : 'संस्कृत स्वर सुनें'}</span>
                  </button>
                  <button 
                    onClick={handleCopy}
                    className="p-2 rounded-xl bg-[#141624] border border-amber-400/25 text-amber-300 hover:text-white cursor-pointer"
                    title="श्लोक कॉपी करें"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* ── Quick Problem-Solving Pills ──────────────────────────────── */}
          <div className="space-y-2">
            <p className="text-[11px] font-serif text-[#c5a059]/80 text-center uppercase tracking-wider font-bold">
              ⚡ किसी भी मानवीय द्वन्द्व का सीधा गीता समाधान:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {QUICK_HEALS.map((q, i) => (
                <Link
                  key={i}
                  href={`/chapter/${q.chapter}/${q.verse}`}
                  onClick={() => sacredAudio.playNavChime(0.04)}
                  className="px-3 py-1.5 rounded-xl bg-[#101324] hover:bg-[#1c223c] border border-amber-400/25 hover:border-amber-400 text-xs font-serif text-[#f5eed9]/90 hover:text-amber-300 flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <span>{q.icon}</span>
                  <span>{q.label}</span>
                  <span className="text-[10px] text-amber-400/70 font-mono">({q.chapter}.{q.verse})</span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — SACRED TEMPLE ALTAR (DARSHAN, DIYA, AARTI & PRASAD)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 my-8">
        <InteractiveTempleAltar />
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 — CORE SANCTUARY TABS NAVIGATION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 my-10" id="scripture">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 custom-scrollbar">
          {TAB_DEFS.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                sacredAudio.playNavChime(0.05);
                setActiveTab(tab.id as any);
              }}
              className={`px-4 py-2.5 rounded-2xl font-serif text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-103'
                  : 'bg-[#101324] border border-amber-400/20 text-[#f5eed9]/80 hover:text-white hover:border-amber-400/40'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.label}</span>
              <span className={`text-[10px] font-mono ml-1 ${activeTab === tab.id ? 'text-black/70' : 'text-amber-400/60'}`}>
                ({tab.sub})
              </span>
            </button>
          ))}
        </div>

        {/* ── TAB 1: SCRIPTURE 18 CHAPTERS GRID WITH YOGA FILTERS & SEARCH ── */}
        {activeTab === 'scripture' && (
          <div className="space-y-6 pt-4 animate-fade-in">
            
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-400/20 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base">📖</span>
                  <h3 className="text-xl sm:text-2xl font-devanagari font-black text-amber-300">
                    सम्पूर्ण १८ अध्याय • वैदिक महाग्रंथ
                  </h3>
                </div>
                <p className="text-xs text-[#c5a059]/90 font-serif mt-0.5">
                  कर्मयोग (१-६), भक्तियोग (७-१२) एवं ज्ञानयोग (१३-१८) का शाश्वत त्रिवेणी संगम
                </p>
              </div>

              {/* Search & Yoga Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                
                {/* Yoga Division Filter Buttons */}
                <div className="p-1 rounded-2xl bg-[#101324] border border-amber-400/30 flex items-center gap-1 text-xs">
                  {[
                    { id: 'all', label: 'सभी १८ अध्याय' },
                    { id: 'karma', label: 'कर्मयोग (१-६)' },
                    { id: 'bhakti', label: 'भक्तियोग (७-१२)' },
                    { id: 'jnana', label: 'ज्ञानयोग (१३-१८)' }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setChapterYogaFilter(f.id as any);
                        sacredAudio.playNavChime(0.04);
                      }}
                      className={`px-3 py-1 rounded-xl transition-all cursor-pointer font-serif ${
                        chapterYogaFilter === f.id
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold shadow-sm'
                          : 'text-[#f5eed9]/70 hover:text-white'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Chapter Quick Search */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-amber-400/60 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={chapterSearchQuery}
                    onChange={(e) => setChapterSearchQuery(e.target.value)}
                    placeholder="अध्याय खोजें..."
                    className="pl-8 pr-3 py-1.5 rounded-xl bg-[#101324] border border-amber-400/30 text-xs font-serif text-amber-200 placeholder-amber-400/40 focus:outline-none focus:border-amber-400 w-36 sm:w-48"
                  />
                </div>

              </div>
            </div>

            {/* Chapters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredChapters.map(ch => {
                const theme = getChapterTheme(ch.number);
                const yogaBadge = 
                  ch.number <= 6 ? { name: 'कर्मयोग खण्ड', color: 'text-amber-400 bg-amber-400/10 border-amber-400/30' } :
                  ch.number <= 12 ? { name: 'भक्तियोग खण्ड', color: 'text-orange-400 bg-orange-400/10 border-orange-400/30' } :
                  { name: 'ज्ञानयोग खण्ड', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30' };

                return (
                  <Link
                    key={ch.number}
                    href={`/chapter/${ch.number}`}
                    onClick={() => sacredAudio.playTempleBell(0.15)}
                    className="p-5 rounded-3xl bg-gradient-to-b from-[#121528] to-[#090b16] border-2 border-amber-400/25 hover:border-amber-400 hover:shadow-[0_12px_35px_rgba(245,158,11,0.25)] transition-all group block space-y-3 relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center font-devanagari font-black text-amber-300 text-lg group-hover:scale-110 transition-transform shadow-sm">
                          {toDN(ch.number)}
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${yogaBadge.color} font-bold`}>
                          {yogaBadge.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded-xl bg-black/50 border border-amber-400/20 text-amber-300 font-bold">
                        {ch.verses_count} श्लोक
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-devanagari font-black text-[#f5eed9] group-hover:text-amber-300 transition-colors">
                        {ch.name_sanskrit}
                      </h4>
                      <p className="text-xs text-amber-200/70 font-serif line-clamp-1 mt-0.5">
                        {ch.name_en}
                      </p>
                    </div>

                    <p className="text-xs text-[#f5eed9]/80 font-serif line-clamp-2 leading-relaxed">
                      {ch.summary_hi}
                    </p>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-serif text-amber-300 group-hover:text-yellow-200 font-bold">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>सम्पूर्ण अध्याय व श्लोक खोलें</span>
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {filteredChapters.length === 0 && (
              <div className="p-8 text-center rounded-3xl bg-[#101324] border border-amber-400/20 space-y-2">
                <p className="text-amber-300 font-serif font-bold text-base">कोई अध्याय नहीं मिला</p>
                <p className="text-xs text-amber-200/70">कृपया अन्य खोज शब्द अथवा योग खण्ड चुनें।</p>
              </div>
            )}

          </div>
        )}

        {/* ── TAB 2: 108 LIFE DILEMMAS ──────────────────────────────────── */}
        {activeTab === 'dilemmas' && (
          <div className="space-y-6 pt-4 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-devanagari font-bold text-amber-300">
                  १०८ मानवीय समस्याओं का प्रत्यक्ष गीता समाधान
                </h3>
                <p className="text-xs text-[#c5a059]/80 font-serif">
                  करियर, चिंता, डिप्रेशन, रिश्ते या कर्तव्य — अपनी समस्या चुनें और भगवान श्रीकृष्ण का उपदेश प्राप्त करें।
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDilemmas.slice(0, 18).map(d => (
                <div
                  key={d.id}
                  className="p-5 rounded-3xl bg-[#101326] border-2 border-amber-400/20 hover:border-amber-400/60 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold">
                      {d.category.toUpperCase()}
                    </span>
                    <h4 className="text-base font-devanagari font-bold text-amber-200">
                      {d.problem}
                    </h4>
                    <p className="text-xs font-serif text-[#f5eed9]/80 leading-relaxed">
                      {d.problemSummary}
                    </p>
                  </div>

                  <Link
                    href={`/chapter/${d.prescribedChapter}/${d.prescribedVerse}`}
                    onClick={() => sacredAudio.playTempleBell(0.2)}
                    className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-serif text-amber-300 font-bold hover:text-yellow-200"
                  >
                    <span>समाधान श्लोक देखें ({d.prescribedChapter}.{d.prescribedVerse})</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 3: KRISHNA AI MENTOR ──────────────────────────────────── */}
        {activeTab === 'mentor' && (
          <div className="max-w-4xl mx-auto pt-4 animate-fade-in">
            <KrishnaAIChat />
          </div>
        )}

        {/* ── TAB 4: JAPA MALA SADHANA ──────────────────────────────────── */}
        {activeTab === 'sadhana' && (
          <div className="max-w-4xl mx-auto pt-4 animate-fade-in">
            <SacredJapaMala />
          </div>
        )}

        {/* ── TAB 5: CRISIS & EMOTIONAL HEALER ──────────────────────────── */}
        {activeTab === 'healer' && (
          <div className="max-w-4xl mx-auto pt-4 animate-fade-in">
            <EmotionalSanctuary />
          </div>
        )}

        {/* ── TAB 6: 4K WALLPAPERS ──────────────────────────────────────── */}
        {activeTab === 'wallpapers' && (
          <div className="pt-4 animate-fade-in">
            <KrishnaWallpaperGallery />
          </div>
        )}

      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — SACRED DEVOTEE TRUST FOOTER BAND
      ══════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-[#c5a059]/20 bg-[#07080e] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />, label: '१००% प्रामाणिक व शुद्ध', sub: 'Universal Vedic Sanctum' },
              { icon: <Globe2 className="w-5 h-5 text-blue-400" />, label: '७ शास्त्रीय भाष्यकार', sub: 'Shankaracharya & Masters' },
              { icon: <Zap className="w-5 h-5 text-amber-400" />, label: '०-विलंबता सुपरकंप्यूटिंग', sub: 'Instant Local Inference' },
              { icon: <Heart className="w-5 h-5 text-rose-400" />, label: 'आजीवन निःशुल्क सेवा', sub: 'Built with Pure Bhakti' },
            ].map((t, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#0f1224]/80 border border-amber-400/20 hover:border-amber-400/40 transition-all">
                {t.icon}
                <span className="text-xs font-devanagari font-bold text-[#f5eed9]">{t.label}</span>
                <span className="text-[10px] text-[#c5a059]/70">{t.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LiveOnlineRadioModal />
    </div>
  );
}
