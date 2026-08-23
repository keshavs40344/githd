'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Play, Pause, Search, Radio, ArrowRight, Sparkles,
  ChevronRight, Volume2, Download, Share2, Check,
  RefreshCw, Heart, ShieldCheck, Users, BookOpen,
  MessageSquare, Flame, Star, Clock, Globe2, Zap,
  Moon, Sun, HeartHandshake, Compass, Trophy, Bell,
  Music, Eye, TrendingUp, Lightbulb
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

// ── Helpers ──────────────────────────────────────────────────────────────────
const DN = ['०','१','२','३','४','५','६','७','८','९'];
const toDN = (n: number) => n.toString().split('').map(d => DN[+d]??d).join('');

// ── Live Stats ────────────────────────────────────────────────────────────────
const LIVE_STATS = [
  { label: 'सम्पूर्ण श्लोक', value: '७०० श्लोक', icon: '📖', sub: '18 Chapters • All Verses' },
  { label: 'शास्त्रीय भाष्य', value: '७ भाष्यकार', icon: '🕉️', sub: 'Shankaracharya + 6 More' },
  { label: 'जीवन समाधान', value: '१०८ समाधान', icon: '🎯', sub: 'Every Human Problem Solved' },
  { label: 'पूर्ण निःशुल्क', value: '१००% मुफ़्त', icon: '🪔', sub: 'Zero Ads • Zero Tracking' },
];

// ── Daily Featured Verses ─────────────────────────────────────────────────────
const DAILY_VERSES = [
  { chapter:2, verse:47, title:'कर्मण्येवाधिकारस्ते', theme:'निष्काम कर्म', tag:'करियर • कर्तव्य',
    hi:'तुम्हारा अधिकार केवल कर्म में है, फल में कभी नहीं। फल की वासना छोड़कर अनासक्त भाव से कर्म करो।'},
  { chapter:6, verse:35, title:'असंशयं महाबाहो', theme:'मन की एकाग्रता', tag:'ध्यान • फोकस',
    hi:'हे महाबाहो! निःसंदेह मन चंचल है, किन्तु निरंतर अभ्यास और वैराग्य से इसे वश में किया जा सकता है।'},
  { chapter:9, verse:22, title:'अनन्याश्चिन्तयन्तो मां', theme:'ईश्वर की कृपा', tag:'भक्ति • संरक्षण',
    hi:'जो अनन्य भाव से मेरा स्मरण करते हैं उन भक्तों के योग-क्षेम का भार मैं स्वयं वहन करता हूँ।'},
  { chapter:18, verse:66, title:'सर्वधर्मान्परित्यज्य', theme:'पूर्ण शरणागति', tag:'मोक्ष • मुक्ति',
    hi:'सभी धर्मों को छोड़कर केवल मेरी शरण में आ जाओ। मैं तुम्हें सभी पापों से मुक्त करूंगा।'},
  { chapter:2, verse:20, title:'न जायते म्रियते', theme:'आत्मा की अमरता', tag:'मृत्यु-भय • शांति',
    hi:'यह आत्मा न जन्म लेती है, न मरती है। यह अजन्मा, नित्य, शाश्वत और पुरातन है।'},
  { chapter:4, verse:7, title:'यदा यदा हि धर्मस्य', theme:'ईश्वर का अवतरण', tag:'युगधर्म • रक्षण',
    hi:'जब-जब धर्म की हानि होती है, तब-तब मैं स्वयं को प्रकट करता हूँ।'},
];

// ── Quick Healing Shortcuts ───────────────────────────────────────────────────
const QUICK_HEALS = [
  { label: 'चिंता व डर', icon: '🌧️', chapter: 2, verse: 14 },
  { label: 'क्रोध निवारण', icon: '🔥', chapter: 2, verse: 63 },
  { label: 'करियर असफलता', icon: '🎯', chapter: 6, verse: 40 },
  { label: 'दिल टूटना', icon: '💔', chapter: 2, verse: 62 },
  { label: 'एकाग्रता', icon: '🧘', chapter: 6, verse: 35 },
  { label: 'आत्मविश्वास', icon: '⚡', chapter: 4, verse: 39 },
  { label: 'परिवार झगड़ा', icon: '🏡', chapter: 17, verse: 15 },
  { label: 'मृत्यु भय', icon: '🕊️', chapter: 2, verse: 22 },
];

// ── Popular Chapter Paths ──────────────────────────────────────────────────────
const POPULAR_CHAPTERS = [2, 3, 6, 9, 12, 18];

export default function DharmaHomePage({ verses }: { verses?: any[] }) {
  const { currentTrack, isPlaying, playTrack, togglePlayPause, setIsSearchModalOpen } = useGlobalAudio();
  const [activeTab, setActiveTab] = useState<'scripture'|'dilemmas'|'family'|'healer'|'sadhana'|'mentor'|'why'>('scripture');
  const [dailyIdx, setDailyIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeDilemma, setActiveDilemma] = useState(HUNDRED_LIFE_DILEMMAS[0]);
  const searchRef = useRef<HTMLInputElement>(null);

  // Pick daily verse based on real day
  useEffect(() => {
    const day = Math.floor((Date.now() - new Date(new Date().getFullYear(),0,0).getTime()) / 86400000);
    setDailyIdx(day % DAILY_VERSES.length);
  }, []);

  // Ctrl+K opens search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setIsSearchModalOpen(true); }
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
    navigator.clipboard.writeText(`"${dv.hi}"\n— भगवद्गीता ${dv.chapter}.${dv.verse}\nhttps://githd.vercel.app/chapter/${dv.chapter}/${dv.verse}`);
    setCopied(true); sacredAudio.playNavChime(0.08);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredDilemmas = HUNDRED_LIFE_DILEMMAS.filter(d => {
    const matchCat = categoryFilter === 'all' || d.category === categoryFilter;
    const matchQ = !searchQuery || d.problem.toLowerCase().includes(searchQuery.toLowerCase()) || d.problemSummary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQ;
  });

  const TAB_DEFS = [
    { id:'scripture',  icon:'📖', label:'१८ अध्याय',      sub:'700 Shlokas' },
    { id:'dilemmas',   icon:'🎯', label:'१०८ समाधान',     sub:'Life Matrix' },
    { id:'healer',     icon:'❤️', label:'मानसिक शांति',   sub:'Crisis Healer' },
    { id:'family',     icon:'🪔', label:'परिवार मण्डल',   sub:'Sanskar Radio' },
    { id:'sadhana',    icon:'✨', label:'जप माला',        sub:'Daily Habit' },
    { id:'mentor',     icon:'💬', label:'कृष्ण AI',       sub:'Direct Dialog' },
    { id:'why',        icon:'👑', label:'क्यों हम?',      sub:'vs Google/AI' },
  ];

  const CAT_FILTERS = [
    { id:'all', label:'सभी' },
    { id:'mental', label:'🌧️ चिंता' },
    { id:'career', label:'🎯 करियर' },
    { id:'relationship', label:'💔 रिश्ते' },
    { id:'anger', label:'🔥 क्रोध' },
    { id:'duty', label:'🧭 कर्तव्य' },
    { id:'spiritual', label:'🪔 आत्मा' },
  ];

  return (
    <div className="min-h-screen bg-[#070810] text-[#f5eed9]">

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — LIVE ANIMATED HERO BANNER
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Deep cosmic background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0c1a] via-[#070810] to-[#0d0818] pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-6">
          
          {/* ── Live Status Bar ──────────────────────────────────────────── */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE • सर्वर सक्रिय</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-mono">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>२४x७ अखंड गीता रेडियो</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-mono">
              <ShieldCheck className="w-3 h-3" />
              <span>१००% विज्ञापन-मुक्त • Zero Tracking</span>
            </div>
          </div>

          {/* ── Hero Title ───────────────────────────────────────────────── */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-devanagari font-black leading-tight tracking-tight">
              <span className="text-[#f5eed9]">श्रीमद्</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">भगवद्गीता</span>
            </h1>
            <p className="text-base sm:text-xl text-[#f5eed9]/70 font-serif max-w-2xl mx-auto leading-relaxed">
              विश्व का सर्वश्रेष्ठ गीता अनुभव — ७०० श्लोक, शास्त्रीय स्वर, संस्कृत उच्चारण गुरु, <br className="hidden sm:block" />
              और आपकी हर जीवन-समस्या का प्रत्यक्ष गीता समाधान।
            </p>

            {/* CTA Row */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => { setIsSearchModalOpen(true); sacredAudio.playNavChime(0.06); }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-serif font-bold text-sm flex items-center gap-2 shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:scale-105 transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>अपनी समस्या खोजें</span>
                <kbd className="bg-black/20 text-[10px] px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
              </button>
              <button
                onClick={() => { playTrack(2, 47, 'कर्मण्येवाधिकारस्ते', 'Karma Yoga'); sacredAudio.playFluteChime(0.4); }}
                className="px-6 py-3 rounded-2xl bg-[#141624] border border-[#c5a059]/40 text-[#e6c687] font-serif text-sm flex items-center gap-2 hover:border-amber-400 hover:bg-[#1a1e30] transition-all cursor-pointer"
              >
                <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>अखंड रेडियो चालू करें</span>
              </button>
            </div>
          </div>

          {/* ── Live Stats Bar ───────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {LIVE_STATS.map((s, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#0f111c]/80 border border-[#c5a059]/20 hover:border-amber-400/50 transition-all text-center group">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xl font-devanagari font-bold text-amber-400">{s.value}</div>
                <div className="text-xs font-serif text-[#f5eed9]/80 font-bold">{s.label}</div>
                <div className="text-[10px] text-[#c5a059]/60 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* ── TODAY'S VERSE CARD ───────────────────────────────────────── */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#161830]/95 via-[#0e101c]/95 to-[#161830]/95 border-2 border-amber-400/40 p-5 sm:p-7 shadow-[0_10px_60px_rgba(245,158,11,0.15)] overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/8 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              
              {/* Artwork + Play Disc */}
              <div className="shrink-0 relative w-full lg:w-56">
                <div className="relative h-44 sm:h-52 lg:h-44 rounded-2xl overflow-hidden border border-[#c5a059]/30 shadow-xl group">
                  <SacredArtworkImage
                    src={getArtworkForShloka(dv.chapter, dv.verse)}
                    alt={`Shloka ${dv.chapter}.${dv.verse}`}
                    chapter={dv.chapter}
                    verse={dv.verse}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  {/* Chapter badge */}
                  <div className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-[10px] font-mono text-yellow-300 font-bold border border-amber-400/30">
                    ॥ {toDN(dv.chapter)}.{toDN(dv.verse)} ॥
                  </div>
                  {/* Play Button */}
                  <button
                    onClick={handlePlayDaily}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.7)] hover:scale-110 active:scale-95 transition-all border-2 border-white/30">
                      {isPlayingDv ? <Pause className="w-5 h-5 text-black fill-current" /> : <Play className="w-5 h-5 text-black fill-current ml-0.5" />}
                    </div>
                  </button>
                  {/* Audio live indicator */}
                  {isPlayingDv && (
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/80 text-black text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                      LIVE
                    </div>
                  )}
                </div>
                {/* Audio timestamp */}
                <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-[#c5a059]/70 px-1">
                  <span>⏱ {getMasterTimestampForVerse(dv.chapter, dv.verse).formattedStart}</span>
                  <span className="text-emerald-400">HD Audio ✓</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3 min-w-0">
                {/* Tag Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-serif flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    आज का पावन विचार • {dv.theme}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[#141624] border border-[#c5a059]/20 text-[#c5a059]/70 text-[10px] font-mono">
                    {dv.tag}
                  </span>
                  <button onClick={() => { setDailyIdx((dailyIdx+1)%DAILY_VERSES.length); sacredAudio.playNavChime(0.06); }}
                    className="ml-auto px-2.5 py-1 rounded-xl bg-[#141624] border border-[#c5a059]/20 text-[#c5a059]/70 hover:text-white text-[10px] font-serif flex items-center gap-1 cursor-pointer">
                    <RefreshCw className="w-3 h-3" /> अन्य श्लोक
                  </button>
                </div>

                {/* Sanskrit */}
                <p className="font-devanagari text-lg sm:text-2xl text-[#f5eed9] font-semibold leading-relaxed">
                  {dv.title}…
                </p>

                {/* Hindi Translation */}
                <div className="p-3 rounded-2xl bg-[#090b14]/80 border border-[#c5a059]/20">
                  <p className="text-xs sm:text-sm text-[#f5eed9]/85 font-serif leading-relaxed italic">
                    {dv.hi}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Link
                    href={`/chapter/${dv.chapter}/${dv.verse}`}
                    onClick={() => sacredAudio.playTempleBell(0.2)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-serif font-bold flex items-center gap-1.5 shadow-md hover:scale-102 transition-all cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> सम्पूर्ण अध्ययन खोलें <ArrowRight className="w-3 h-3" />
                  </Link>
                  <button onClick={handlePlayDaily}
                    className="px-3 py-2 rounded-xl bg-[#141624] border border-[#c5a059]/30 text-[#e6c687] text-xs font-serif flex items-center gap-1.5 cursor-pointer hover:border-amber-400">
                    {isPlayingDv ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isPlayingDv ? 'रोकें' : 'स्वर सुनें'}</span>
                  </button>
                  <button onClick={handleCopy}
                    className="p-2 rounded-xl bg-[#141624] border border-[#c5a059]/25 text-[#c5a059] hover:text-white cursor-pointer">
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Quick Healing Shortcut Chips ─────────────────────────────── */}
          <div className="mt-5 space-y-2">
            <p className="text-[11px] font-mono text-[#c5a059]/60 text-center uppercase tracking-widest">
              ⚡ जीवन की किसी भी समस्या का तुरंत गीता समाधान पाएं:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {QUICK_HEALS.map((q, i) => (
                <Link
                  key={i}
                  href={`/chapter/${q.chapter}/${q.verse}`}
                  onClick={() => sacredAudio.playNavChime(0.05)}
                  className="px-3 py-1.5 rounded-xl bg-[#141624] border border-[#c5a059]/20 hover:border-amber-400 hover:bg-[#1e2235] text-xs font-serif text-[#e6c687] flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>{q.icon}</span>
                  <span>{q.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — MAIN 7-TAB NAVIGATION HUB
      ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 bg-[#0d0f1c]/90 backdrop-blur-2xl p-3 rounded-3xl border-2 border-[#c5a059]/30 shadow-2xl">
          {TAB_DEFS.map(tab => {
            const sel = activeTab === tab.id;
            return (
              <button key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); sacredAudio.playNavChime(0.06); }}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                  sel
                    ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-black border-yellow-200 shadow-[0_4px_20px_rgba(245,158,11,0.4)] scale-[1.02] font-bold'
                    : 'bg-[#141624]/90 text-[#e6c687] border-[#c5a059]/20 hover:border-amber-400/50 hover:bg-[#1a1e33]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">{tab.icon}</span>
                  {sel && <span className="w-2 h-2 rounded-full bg-black/50" />}
                </div>
                <span className="text-[11px] font-devanagari font-bold leading-tight truncate">{tab.label}</span>
                <span className={`text-[9px] truncate ${sel ? 'text-black/70' : 'text-[#c5a059]/60'}`}>{tab.sub}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 — TAB CONTENT PANELS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">

        {/* ── TAB: SCRIPTURE (18 Chapters) ──────────────────────────────── */}
        {activeTab === 'scripture' && (
          <div className="space-y-6 animate-fade-in">
            {/* Search + Yoga Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#c5a059]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="अध्याय खोजें (नाम, संख्या, विषय)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#141624] border border-[#c5a059]/30 text-sm font-serif text-[#f5eed9] placeholder-[#c5a059]/40 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Popular Chapters Hero Row */}
            <div>
              <p className="text-xs font-mono text-[#c5a059]/60 uppercase tracking-widest mb-3">⭐ लोकप्रिय अध्याय:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {POPULAR_CHAPTERS.map(num => {
                  const ch = CHAPTERS.find(c => c.number === num)!;
                  if (!ch) return null;
                  const theme = getChapterTheme(num);
                  return (
                    <Link key={num} href={`/chapter/${num}`}
                      onClick={() => sacredAudio.playTempleBell(0.18)}
                      className="relative group p-4 rounded-2xl border-2 transition-all hover:scale-105 overflow-hidden"
                      style={{ borderColor: `${theme.primaryColor}60`, background: `linear-gradient(135deg, ${theme.glowColor}15, #0d0f1c)` }}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: `radial-gradient(circle at center, ${theme.glowColor}20, transparent 70%)` }} />
                      <div className="relative z-10">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md" style={{ color: theme.accentHex, background: `${theme.glowColor}25` }}>
                          अध्याय {toDN(num)}
                        </span>
                        <p className="font-devanagari font-bold text-sm text-[#f5eed9] mt-1.5 leading-tight">{ch.name_sanskrit}</p>
                        <p className="text-[10px] text-[#c5a059]/70 mt-0.5">{ch.verses_count} श्लोक</p>
                        <div className="flex items-center justify-end mt-2">
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" style={{ color: theme.accentHex }} />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* ALL 18 Chapters Grid */}
            <div>
              <p className="text-xs font-mono text-[#c5a059]/60 uppercase tracking-widest mb-3">📖 सम्पूर्ण १८ अध्याय:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {CHAPTERS
                  .filter(ch => {
                    if (!searchQuery) return true;
                    const q = searchQuery.toLowerCase();
                    return ch.name_sanskrit.toLowerCase().includes(q) ||
                      ch.name_en.toLowerCase().includes(q) ||
                      ch.number.toString() === searchQuery.trim();
                  })
                  .map(ch => {
                    const theme = getChapterTheme(ch.number);
                    return (
                      <Link key={ch.number} href={`/chapter/${ch.number}`}
                        onClick={() => sacredAudio.playTempleBell(0.15)}
                        className="group flex items-center gap-4 p-4 rounded-2xl border transition-all hover:scale-[1.01] hover:shadow-xl cursor-pointer"
                        style={{ borderColor: `${theme.primaryColor}40`, background: `linear-gradient(135deg, ${theme.glowColor}10, #0d0f1c 60%)` }}
                      >
                        {/* Number Badge */}
                        <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-lg font-devanagari font-black shadow-inner"
                          style={{ background: `${theme.glowColor}30`, color: theme.accentHex, border: `1.5px solid ${theme.primaryColor}50` }}>
                          {toDN(ch.number)}
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-devanagari font-bold text-sm text-[#f5eed9] truncate">{ch.name_sanskrit}</p>
                          <p className="text-[10px] text-[#c5a059]/70 mt-0.5">{ch.name_en} • {ch.verses_count} श्लोक</p>
                          {ch.summary_hi && (
                            <p className="text-[10px] text-[#f5eed9]/50 mt-1 line-clamp-1 font-serif">{ch.summary_hi}</p>
                          )}
                        </div>
                        <ChevronRight className="w-4 h-4 shrink-0 text-[#c5a059]/40 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: 108 DILEMMAS ─────────────────────────────────────────── */}
        {activeTab === 'dilemmas' && (
          <div className="space-y-5 animate-fade-in">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-devanagari font-bold">
                जीवन की हर समस्या का <span className="text-amber-400">गीता समाधान</span>
              </h2>
              <p className="text-xs text-[#c5a059]/80 font-serif">आप जिस भी परिस्थिति में हैं — नीचे से चुनें और भगवान का प्रत्यक्ष मार्गदर्शन पाएं।</p>
            </div>

            {/* Search + Cat Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#c5a059]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="अपनी समस्या लिखें..."
                  value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#141624] border border-[#c5a059]/30 text-sm font-serif text-[#f5eed9] placeholder-[#c5a059]/40 focus:outline-none focus:border-amber-400" />
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {CAT_FILTERS.map(f => (
                  <button key={f.id}
                    onClick={() => { setCategoryFilter(f.id); sacredAudio.playNavChime(0.04); }}
                    className={`px-3 py-2 rounded-xl text-xs font-serif shrink-0 transition-all cursor-pointer border ${
                      categoryFilter === f.id ? 'bg-amber-400 text-black font-bold border-yellow-200' : 'bg-[#141624] text-[#c5a059]/70 border-[#c5a059]/20 hover:border-amber-400'
                    }`}
                  >{f.label}</button>
                ))}
              </div>
            </div>

            {/* 2-col matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Problem List */}
              <div className="lg:col-span-5 space-y-2 max-h-[520px] overflow-y-auto pr-1">
                {filteredDilemmas.length === 0 && (
                  <div className="text-center py-10 text-sm font-serif text-[#c5a059]/60">
                    कोई परिणाम नहीं मिला। कृपया दूसरे शब्द आज़माएं।
                  </div>
                )}
                {filteredDilemmas.map(item => {
                  const sel = activeDilemma?.id === item.id;
                  return (
                    <div key={item.id}
                      onClick={() => { setActiveDilemma(item); sacredAudio.playNavChime(0.06); }}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        sel ? 'bg-amber-500/20 border-amber-400 shadow-lg' : 'bg-[#141624]/90 border-[#c5a059]/15 hover:border-amber-400/40 hover:bg-[#1a1e33]'
                      }`}
                    >
                      <div className="min-w-0 space-y-1">
                        <span className="text-[10px] font-mono text-amber-300 block">{item.categoryLabel}</span>
                        <p className="text-xs font-devanagari font-bold text-[#f5eed9] truncate">{item.problem}</p>
                        <p className="text-[11px] text-[#c5a059]/60 font-serif truncate">{item.problemSummary}</p>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${sel ? 'text-amber-400 translate-x-0.5' : 'text-[#c5a059]/30'}`} />
                    </div>
                  );
                })}
              </div>

              {/* Solution Altar */}
              <div className="lg:col-span-7">
                {activeDilemma ? (
                  <div className="rounded-3xl bg-[#090b14] border-2 border-amber-400/40 p-5 sm:p-7 space-y-5 shadow-xl h-full animate-fade-in">
                    <div className="space-y-1 pb-4 border-b border-[#c5a059]/20">
                      <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono inline-block">
                        {activeDilemma.categoryLabel}
                      </span>
                      <h3 className="text-base sm:text-lg font-devanagari font-bold text-[#f5eed9] mt-2">{activeDilemma.problem}</h3>
                    </div>

                    {/* Krishna Counsel */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-400/25">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-xs font-bold text-amber-300 font-serif">श्रीकृष्ण का दिव्य संदेश:</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#f5eed9]/90 font-serif leading-relaxed italic">"{activeDilemma.krishnaCounsel}"</p>
                    </div>

                    {/* Prescribed Shloka */}
                    <div className="p-4 rounded-2xl bg-[#141624] border border-[#c5a059]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded-lg bg-amber-400 text-black text-xs font-mono font-bold">
                            अध्याय {activeDilemma.prescribedChapter}.{activeDilemma.prescribedVerse}
                          </span>
                          <span className="text-xs font-devanagari text-yellow-300 truncate max-w-[200px]">{activeDilemma.shlokaSnippet}</span>
                        </div>
                        <p className="text-[11px] text-[#c5a059]/60">इस परिस्थिति के लिए निर्धारित श्लोक</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => { playTrack(activeDilemma.prescribedChapter, activeDilemma.prescribedVerse, activeDilemma.shlokaSnippet, activeDilemma.problem); sacredAudio.playNavChime(0.08); }}
                          className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-serif font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" /> सुनें
                        </button>
                        <Link href={`/chapter/${activeDilemma.prescribedChapter}/${activeDilemma.prescribedVerse}`}
                          onClick={() => sacredAudio.playTempleBell(0.2)}
                          className="px-3 py-1.5 rounded-xl bg-[#090b14] border border-[#c5a059]/25 text-xs font-serif text-[#e6c687] hover:text-white flex items-center gap-1 cursor-pointer">
                          पाठ <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>

                    {/* 3 Remedy Steps */}
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-[#e6c687] font-serif">३ तत्काल व्यावहारिक समाधान:</p>
                      {activeDilemma.remedySteps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#141624]/60 border border-[#c5a059]/12 text-xs text-[#f5eed9]/85 font-serif">
                          <div className="w-4 h-4 rounded-full bg-emerald-500/25 text-emerald-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{idx+1}</div>
                          <p className="leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center rounded-3xl bg-[#090b14]/50 border border-[#c5a059]/15 text-sm font-serif text-[#c5a059]/60 min-h-[200px]">
                    बाईं ओर कोई समस्या चुनें।
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: HEALER ───────────────────────────────────────────────── */}
        {activeTab === 'healer' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <EmotionalSanctuary />
          </div>
        )}

        {/* ── TAB: FAMILY ───────────────────────────────────────────────── */}
        {activeTab === 'family' && (
          <div className="max-w-5xl mx-auto animate-fade-in">
            <FamilyDevoteeSanctuary />
          </div>
        )}

        {/* ── TAB: SADHANA ──────────────────────────────────────────────── */}
        {activeTab === 'sadhana' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <SacredJapaMala />
          </div>
        )}

        {/* ── TAB: MENTOR ───────────────────────────────────────────────── */}
        {activeTab === 'mentor' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <KrishnaAIChat />
          </div>
        )}

        {/* ── TAB: WHY US ───────────────────────────────────────────────── */}
        {activeTab === 'why' && (
          <div className="max-w-5xl mx-auto animate-fade-in">
            <WhyChooseDharmaOS />
          </div>
        )}

      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — TRUST BAND
      ══════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-[#c5a059]/15 bg-[#07080d]/80 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />, label: '१००% विज्ञापन-मुक्त', sub: 'Zero Ads Forever' },
              { icon: <Globe2 className="w-5 h-5 text-blue-400" />, label: 'वेदोक्त प्रामाणिक', sub: '7 Classical Commentaries' },
              { icon: <Zap className="w-5 h-5 text-amber-400" />, label: 'तुरंत उत्तर', sub: 'Instant Gita Guidance' },
              { icon: <Heart className="w-5 h-5 text-red-400" />, label: 'भक्तिपूर्ण निर्मित', sub: 'Built with Devotion' },
            ].map((t, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#0f111c]/70 border border-[#c5a059]/15 hover:border-amber-400/30 transition-all">
                {t.icon}
                <span className="text-xs font-devanagari font-bold text-[#f5eed9]">{t.label}</span>
                <span className="text-[10px] text-[#c5a059]/60">{t.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
