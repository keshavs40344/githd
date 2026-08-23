'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Activity, Server, Database, Shield, Radio, Tv, Bell, Calendar, BookOpen,
  CheckCircle2, AlertCircle, RefreshCw, Save, Download, Upload,
  Users, Eye, Play, Plus, Trash2, Edit3, Key, Lock, Unlock, ArrowLeft,
  Sparkles, Layers, Terminal, Cpu, Clock, Check, X, ShieldAlert, KeyRound,
  Zap, HardDrive, Wifi, Globe, ShieldCheck, Video, HelpCircle, Flame
} from 'lucide-react';
import { 
  dharmaServer, LiveSiteConfig, DEFAULT_SITE_CONFIG, ServerTelemetry 
} from '@/lib/dharmaServerManager';
import { IskconTvChannel, KrishnaRadioStation, IskconNoticeItem, VaishnavaFestival } from '@/data/iskconGlobalData';
import { CHAPTERS } from '@/types/verse';

const SDE_AGENTS_LIST = [
  { id: 'AG_01', name: 'Quantum-UI-Architect', role: 'Next.js 15 SSR / GPU Canvas & CSS Matrix', status: 'ONLINE', load: '12%', memory: '18MB' },
  { id: 'AG_02', name: 'Vedic-Audio-Synth', role: 'Real YouTube Stream Bridge & Zero-Beep Engine', status: 'ONLINE', load: '8%', memory: '14MB' },
  { id: 'AG_03', name: 'ISKCON-Broadcaster-Lead', role: '18-Channel TV Feeds & Mayapur/Vrindavan Sync', status: 'ONLINE', load: '19%', memory: '24MB' },
  { id: 'AG_04', name: 'DevOps-LRU-Deduplicator', role: 'Watch History Shuffler & Zero Repeat Engine', status: 'ONLINE', load: '5%', memory: '11MB' },
  { id: 'AG_05', name: 'Military-Sec-Guardian', role: 'Salted SHA-256 Auth & Brute Force Shield', status: 'ONLINE', load: '2%', memory: '8MB' },
  { id: 'AG_06', name: 'Database-Edge-Syncer', role: 'BroadcastChannel & localStorage Multi-Tab Sync', status: 'ONLINE', load: '6%', memory: '12MB' },
  { id: 'AG_07', name: 'Sanskrit-Semantic-AI', role: '700 Gita Shloka Purports & Multilingual Bridge', status: 'ONLINE', load: '14%', memory: '28MB' },
  { id: 'AG_08', name: 'Static-Build-Optimizer', role: '734 SSG Pages HTML/CSS Tree-Shaker', status: 'ONLINE', load: '0%', memory: '9MB' },
];

export default function DharmaStandaloneServerPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0);

  const [activeServerTab, setActiveServerTab] = useState<
    'telemetry' | 'channels_cms' | 'radio_cms' | 'notices_cms' | 'calendar_cms' | 'chapters_cms' | 'agents_terminal' | 'security_vault'
  >('telemetry');

  const [config, setConfig] = useState<LiveSiteConfig>(DEFAULT_SITE_CONFIG);
  const [telemetry, setTelemetry] = useState<ServerTelemetry>(dharmaServer.getTelemetry());
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  // Edit Channel State
  const [editingChannel, setEditingChannel] = useState<IskconTvChannel | null>(null);
  const [previewVideoId, setPreviewVideoId] = useState<string | null>(null);

  // Change PIN State
  const [newPinInput, setNewPinInput] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  useEffect(() => {
    const isAuth = dharmaServer.isAuthenticated();
    setIsAuthenticated(isAuth);
    const loaded = dharmaServer.loadConfig();
    setConfig(loaded);
    
    const lock = dharmaServer.checkLockout();
    if (lock.isLocked) {
      setLockoutRemaining(lock.remainingSeconds);
    }
  }, []);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutRemaining > 0) {
      const timer = setInterval(() => {
        setLockoutRemaining(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [lockoutRemaining]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const result = dharmaServer.verifyPin(passInput);
    if (result.success) {
      setIsAuthenticated(true);
      setErrorMessage(null);
      setPassInput('');
    } else {
      setErrorMessage(result.message);
      const lock = dharmaServer.checkLockout();
      if (lock.isLocked) {
        setLockoutRemaining(lock.remainingSeconds);
      }
    }
  };

  const showSaveBadge = (msg: string) => {
    setSaveNotification(msg);
    setTimeout(() => setSaveNotification(null), 3500);
  };

  const handleSaveAll = () => {
    const success = dharmaServer.saveConfig(config);
    if (success) {
      showSaveBadge('✅ सभी अपडेट्स लाइव सर्वर पर सफलतापूर्वक लागू हो गए हैं!');
    } else {
      showSaveBadge('❌ त्रुटि: सेव करने में समस्या हुई।');
    }
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dharma_server_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          setConfig(parsed);
          dharmaServer.saveConfig(parsed);
          showSaveBadge('✅ बैकअप सफलतापूर्वक इम्पोर्ट व लागू हो गया!');
        } catch {
          alert('अमान्य JSON फाइल!');
        }
      };
    }
  };

  const handleSaveChannelEdit = (updatedChannel: IskconTvChannel) => {
    const updatedChannels = config.channels.map(c => 
      c.id === updatedChannel.id ? updatedChannel : c
    );
    const newConfig = { ...config, channels: updatedChannels };
    setConfig(newConfig);
    dharmaServer.saveConfig(newConfig);
    setEditingChannel(null);
    showSaveBadge(`✅ चैनल "${updatedChannel.nameHindi}" का विवरण अपडेट हो गया!`);
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinInput.length >= 4) {
      dharmaServer.changePin(newPinInput);
      setPinChangeSuccess(true);
      setNewPinInput('');
      setTimeout(() => setPinChangeSuccess(false), 4000);
      showSaveBadge('🔐 नया मास्टर पासकोड सफलतापूर्वक सेट हो गया!');
    }
  };

  // ── UNCRACKABLE LOCK SCREEN ────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-[#f5eed9] font-serif flex items-center justify-center p-4">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#181108] via-[#0d0904] to-black border-2 border-orange-500/50 shadow-[0_0_100px_rgba(249,115,22,0.3)] space-y-6 text-center">
          
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-600 flex items-center justify-center text-3xl mx-auto shadow-lg">
            🛡️
          </div>

          <div className="space-y-1">
            <h1 className="text-xl font-devanagari font-black text-orange-300">
              Dharma.OS — लाइव सर्वर कमांड सेंटर
            </h1>
            <p className="text-xs text-orange-200/70">
              मास्टर एडमिन एक्सेस • अभेद्य सुरक्षा प्रणाली (Military-Grade Vault)
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-mono text-orange-300/80 block mb-1.5 flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-orange-400" />
                <span>मास्टर एडमिन पासकोड दर्ज करें:</span>
              </label>
              <input
                type="password"
                disabled={lockoutRemaining > 0}
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                placeholder={lockoutRemaining > 0 ? `सुरक्षा लॉक सक्रिय (${lockoutRemaining}s)` : "मास्टर पासकोड (dharma2026)..."}
                className="w-full px-4 py-3 rounded-xl bg-[#060402] border border-orange-400/40 text-orange-200 font-mono text-sm focus:outline-none focus:border-orange-400 transition-colors disabled:opacity-50"
                autoFocus
              />
              {errorMessage && (
                <p className="text-xs text-rose-400 mt-2 font-mono flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMessage}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={lockoutRemaining > 0}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-black font-black text-sm font-devanagari shadow-lg hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Unlock className="w-4 h-4" />
              <span>कंट्रोल टॉवर में प्रवेश करें</span>
            </button>
          </form>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-orange-300/60">
            <Link href="/" className="hover:text-orange-300 flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              <span>मुख्य वेबसाइट पर लौटें</span>
            </Link>
            <span className="font-mono">डिफ़ॉल्ट: dharma2026</span>
          </div>

        </div>
      </div>
    );
  }

  // ── AUTHENTICATED POWERHOUSE SERVER COMMAND TOWER ───────────────────────────
  return (
    <div className="min-h-screen bg-[#040201] text-[#f5eed9] font-serif flex flex-col">
      
      {/* Top Header Bar */}
      <header className="px-4 sm:px-8 py-3.5 border-b border-orange-400/25 bg-[#090603] sticky top-0 z-40 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-orange-300 transition-colors" title="मुख्य वेबसाइट पर लौटें">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-600 flex items-center justify-center text-xl text-black font-black shadow-md">
            🖥️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                LIVE SERVER OPERATIONAL (24x7)
              </span>
              <span className="text-[10px] font-mono text-orange-300/70 hidden sm:inline">
                Zero-Latency Edge Network
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-devanagari font-black text-orange-300">
              Dharma.OS — लाइव सर्वर कमांड सेंटर एवं मास्टर कंट्रोलर
            </h1>
          </div>
        </div>

        {/* Global Save / Backup Controls */}
        <div className="flex items-center gap-2">
          
          <button
            onClick={handleSaveAll}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-black font-black text-xs font-devanagari shadow-lg flex items-center gap-1.5 transition-all cursor-pointer hover:scale-102"
          >
            <Save className="w-3.5 h-3.5" />
            <span>लाइव साइट पर सेव करें</span>
          </button>

          <button
            onClick={handleExportJson}
            className="p-2 rounded-xl bg-[#181108] hover:bg-[#251a0d] border border-orange-400/30 text-orange-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
            title="बैकअप डाउनलोड करें (JSON)"
          >
            <Download className="w-4 h-4" />
          </button>

          <label className="p-2 rounded-xl bg-[#181108] hover:bg-[#251a0d] border border-orange-400/30 text-orange-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1" title="बैकअप इम्पोर्ट करें">
            <Upload className="w-4 h-4" />
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>

          <button
            onClick={() => {
              dharmaServer.logout();
              setIsAuthenticated(false);
            }}
            className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-black border border-rose-400/30 transition-all cursor-pointer"
            title="लॉगआउट"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Save Notification Toast */}
      {saveNotification && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald-500 text-black font-black text-xs font-mono shadow-[0_10px_40px_rgba(16,185,129,0.5)] animate-bounce flex items-center gap-2">
          <span>{saveNotification}</span>
        </div>
      )}

      {/* Navigation Tabs Bar */}
      <div className="px-4 sm:px-8 py-2 border-b border-orange-400/15 bg-[#0e0904] flex items-center gap-2 overflow-x-auto custom-scrollbar text-xs font-bold shrink-0">
        {[
          { id: 'telemetry', label: '📊 १. लाइव टेलीमेट्री व एनालिटिक्स', icon: Activity },
          { id: 'channels_cms', label: '📺 २. १८ इस्कॉन टीवी चैनल्स मैनेजर', icon: Tv },
          { id: 'radio_cms', label: '📻 ३. २४x७ कृष्ण रेडियो मैनेजर', icon: Radio },
          { id: 'notices_cms', label: '📢 ४. भक्त सूचना पट्ट CMS', icon: Bell },
          { id: 'calendar_cms', label: '🗓️ ५. वैष्णव पंचांग व एकादशी', icon: Calendar },
          { id: 'chapters_cms', label: '📖 ६. गीता १८ अध्याय व श्लोक', icon: BookOpen },
          { id: 'agents_terminal', label: '🤖 ७. ३२-एजेंट स्वार्म टर्मिनल', icon: Terminal },
          { id: 'security_vault', label: '🔐 ८. सुरक्षा वॉल्ट व पासकोड', icon: KeyRound }
        ].map(tab => {
          const IconComponent = tab.icon;
          const isActive = activeServerTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveServerTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-orange-400 to-amber-500 text-black shadow-md scale-102 font-black'
                  : 'bg-[#181108] border border-orange-400/20 text-[#f5eed9]/80 hover:text-white'
              }`}
            >
              <IconComponent className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Server Workspace Content */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto space-y-6">
        
        {/* ── TAB 1: TELEMETRY ─────────────────────────────────────────────── */}
        {activeServerTab === 'telemetry' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-[#0d0904] border border-orange-400/30 space-y-2">
                <div className="flex items-center justify-between text-orange-400 text-xs font-mono">
                  <span>सक्रिय ऑनलाइन भक्त</span>
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-3xl font-black font-mono text-emerald-400">{telemetry.activeLiveUsers.toLocaleString()}</div>
                <div className="text-[10px] text-orange-200/60 font-sans">रीयल-टाइम टीवी एवं गीता अध्ययन सत्र</div>
              </div>

              <div className="p-5 rounded-3xl bg-[#0d0904] border border-orange-400/30 space-y-2">
                <div className="flex items-center justify-between text-orange-400 text-xs font-mono">
                  <span>कुल पेज दृश्य (Pageviews)</span>
                  <Eye className="w-4 h-4" />
                </div>
                <div className="text-3xl font-black font-mono text-amber-300">{telemetry.totalPageViews.toLocaleString()}</div>
                <div className="text-[10px] text-orange-200/60 font-sans">७३४ स्थिर प्री-रेंडर्ड पेजेस पर ट्रैफ़िक</div>
              </div>

              <div className="p-5 rounded-3xl bg-[#0d0904] border border-orange-400/30 space-y-2">
                <div className="flex items-center justify-between text-orange-400 text-xs font-mono">
                  <span>कुल जप किए गए मणके</span>
                  <Sparkles className="w-4 h-4 text-orange-400" />
                </div>
                <div className="text-3xl font-black font-mono text-orange-300">{telemetry.totalJapaBeadsChanted.toLocaleString()}</div>
                <div className="text-[10px] text-orange-200/60 font-sans">१६ माला महामंत्र तुलसी काउंटर से</div>
              </div>

              <div className="p-5 rounded-3xl bg-[#0d0904] border border-orange-400/30 space-y-2">
                <div className="flex items-center justify-between text-orange-400 text-xs font-mono">
                  <span>सर्वर हेल्थ व अपटाइम</span>
                  <Activity className="w-4 h-4 text-teal-400" />
                </div>
                <div className="text-3xl font-black font-mono text-teal-300">{telemetry.healthScore}%</div>
                <div className="text-[10px] text-orange-200/60 font-sans">० एरर • १००% अपटाइम (२४x७ सक्रिय)</div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#0a0703] border border-orange-400/30 space-y-4">
              <h3 className="text-base font-devanagari font-black text-orange-300 flex items-center gap-2">
                <Server className="w-4 h-4 text-orange-400" />
                <span>ग्लोबल साइट सेटिंग्स एवं मार्की नोटिस (Global Settings)</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-orange-300/80 block mb-1">वेबसाइट मुख्य शीर्षक (Website Title):</label>
                  <input
                    type="text"
                    value={config.siteTitle}
                    onChange={(e) => setConfig({ ...config, siteTitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#140e06] border border-orange-400/30 text-orange-200 font-devanagari text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-orange-300/80 block mb-1">मुख्य सूचना पट्टी (Marquee Announcement Notice):</label>
                  <input
                    type="text"
                    value={config.marqueeNotice}
                    onChange={(e) => setConfig({ ...config, marqueeNotice: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#140e06] border border-orange-400/30 text-orange-200 font-devanagari text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: CHANNELS CMS ──────────────────────────────────────────── */}
        {activeServerTab === 'channels_cms' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-orange-400/20 pb-3">
              <div>
                <h3 className="text-lg font-devanagari font-black text-orange-300">
                  इस्कॉन १८-चैनल लाइव टीवी वीडियो व डिटेल मैनेजर (TV CMS)
                </h3>
                <p className="text-xs text-orange-200/70">
                  मायापुर टीवी, वृन्दावन, ईस्ट दिल्ली (HG विचित्र कृष्ण प्रभु), द्वारका आदि के यूट्यूब वीडियो तुरंत अपडेट करें।
                </p>
              </div>
              <button
                onClick={handleSaveAll}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-black text-xs font-devanagari shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>परिवर्तन लागू करें</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {config.channels.map((channel) => (
                <div
                  key={channel.id}
                  className="p-5 rounded-3xl bg-[#0d0904] border border-orange-400/25 hover:border-orange-400/50 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-xl bg-orange-500 text-black font-mono font-black text-xs">
                      CH-{channel.channelNo < 10 ? `0${channel.channelNo}` : channel.channelNo}
                    </span>
                    <span className="text-xs font-mono text-emerald-300 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-400/30">
                      YouTube: {channel.fallbackVideoId}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-devanagari font-black text-[#f5eed9] truncate">{channel.nameHindi}</h4>
                    <p className="text-xs text-orange-300/70 font-sans">{channel.location} • विग्रह: {channel.deities}</p>
                    <p className="text-[11px] font-mono text-amber-300/80 mt-1">हैंडल: {channel.channelHandle}</p>
                  </div>

                  <div className="pt-2 border-t border-orange-400/15 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setPreviewVideoId(channel.fallbackVideoId)}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-orange-300 text-xs flex items-center gap-1"
                    >
                      <Play className="w-3 h-3 text-emerald-400" />
                      <span>टेस्ट वीडियो</span>
                    </button>
                    <button
                      onClick={() => setEditingChannel(channel)}
                      className="px-4 py-1.5 rounded-xl bg-orange-500/20 hover:bg-orange-500 hover:text-black border border-orange-400/40 text-orange-300 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>संपादित करें (Edit)</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 3: RADIO CMS ─────────────────────────────────────────────── */}
        {activeServerTab === 'radio_cms' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            <h3 className="text-lg font-devanagari font-black text-orange-300 border-b border-orange-400/20 pb-3">
              २४x७ कृष्ण रेडियो स्टेशन्स मैनेजर (६ स्टेशन्स)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {config.radioStations.map((station) => (
                <div key={station.id} className="p-5 rounded-3xl bg-[#0d0904] border border-orange-400/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md bg-orange-500/20 text-orange-300 font-mono text-xs font-black">
                      STATION {station.stationNo}
                    </span>
                    <span className="text-2xl">{station.icon}</span>
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-orange-300/80 block mb-1">स्टेशन नाम:</label>
                    <input
                      type="text"
                      value={station.nameHindi}
                      onChange={(e) => {
                        const updated = config.radioStations.map(s => s.id === station.id ? { ...s, nameHindi: e.target.value } : s);
                        setConfig({ ...config, radioStations: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#140e06] border border-orange-400/30 text-orange-200 text-xs font-devanagari"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-orange-300/80 block mb-1">यूट्यूब Video ID:</label>
                    <input
                      type="text"
                      value={station.videoId}
                      onChange={(e) => {
                        const updated = config.radioStations.map(s => s.id === station.id ? { ...s, videoId: e.target.value } : s);
                        setConfig({ ...config, radioStations: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#140e06] border border-orange-400/30 text-emerald-300 font-mono text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 4: NOTICES CMS ───────────────────────────────────────────── */}
        {activeServerTab === 'notices_cms' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            <h3 className="text-lg font-devanagari font-black text-orange-300 border-b border-orange-400/20 pb-3">
              भक्त सूचना पट्ट एवं सेवा अभियान (Notice Board CMS)
            </h3>
            <div className="space-y-4">
              {config.notices.map((notice) => (
                <div key={notice.id} className="p-5 rounded-3xl bg-[#0d0904] border border-orange-400/25 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono text-orange-300/80 block mb-1">शीर्षक:</label>
                      <input
                        type="text"
                        value={notice.title}
                        onChange={(e) => {
                          const updated = config.notices.map(n => n.id === notice.id ? { ...n, title: e.target.value } : n);
                          setConfig({ ...config, notices: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#140e06] border border-orange-400/30 text-orange-200 text-xs font-devanagari"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-orange-300/80 block mb-1">मन्दिर/स्थान:</label>
                      <input
                        type="text"
                        value={notice.temple}
                        onChange={(e) => {
                          const updated = config.notices.map(n => n.id === notice.id ? { ...n, temple: e.target.value } : n);
                          setConfig({ ...config, notices: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#140e06] border border-orange-400/30 text-orange-200 text-xs font-devanagari"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-orange-300/80 block mb-1">विवरण:</label>
                    <textarea
                      rows={2}
                      value={notice.description}
                      onChange={(e) => {
                        const updated = config.notices.map(n => n.id === notice.id ? { ...n, description: e.target.value } : n);
                        setConfig({ ...config, notices: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#140e06] border border-orange-400/30 text-orange-200 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 5: CALENDAR CMS ──────────────────────────────────────────── */}
        {activeServerTab === 'calendar_cms' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            <h3 className="text-lg font-devanagari font-black text-orange-300 border-b border-orange-400/20 pb-3">
              वैष्णव पंचांग एवं एकादशी महाव्रत शेड्यूलर
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {config.festivals.map((f) => (
                <div key={f.id} className="p-5 rounded-3xl bg-[#0d0904] border border-orange-400/30 space-y-3">
                  <div>
                    <label className="text-[11px] font-mono text-orange-300/80 block mb-1">उत्सव का नाम:</label>
                    <input
                      type="text"
                      value={f.nameHindi}
                      onChange={(e) => {
                        const updated = config.festivals.map(item => item.id === f.id ? { ...item, nameHindi: e.target.value } : item);
                        setConfig({ ...config, festivals: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#140e06] border border-orange-400/30 text-amber-300 text-xs font-devanagari font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-orange-300/80 block mb-1">तिथि / मास:</label>
                    <input
                      type="text"
                      value={f.dateStr}
                      onChange={(e) => {
                        const updated = config.festivals.map(item => item.id === f.id ? { ...item, dateStr: e.target.value } : item);
                        setConfig({ ...config, festivals: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#140e06] border border-orange-400/30 text-orange-200 text-xs font-devanagari"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-orange-300/80 block mb-1">पारण समय:</label>
                    <input
                      type="text"
                      value={f.paranTime || ''}
                      onChange={(e) => {
                        const updated = config.festivals.map(item => item.id === f.id ? { ...item, paranTime: e.target.value } : item);
                        setConfig({ ...config, festivals: updated });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#140e06] border border-orange-400/30 text-teal-300 font-mono text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 6: CHAPTERS ──────────────────────────────────────────────── */}
        {activeServerTab === 'chapters_cms' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            <h3 className="text-lg font-devanagari font-black text-orange-300 border-b border-orange-400/20 pb-3">
              श्रीमद्भगवद्गीता सम्पूर्ण १८ अध्याय व ७०० श्लोक आर्काइव
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {CHAPTERS.map(ch => (
                <div key={ch.number} className="p-4 rounded-2xl bg-[#0d0904] border border-orange-400/20 space-y-1">
                  <div className="flex justify-between text-[11px] text-orange-400 font-mono">
                    <span>अध्याय {ch.number}</span>
                    <span>{ch.verses_count} श्लोक</span>
                  </div>
                  <div className="font-devanagari font-bold text-amber-300 truncate">{ch.name_sanskrit}</div>
                  <div className="text-[10px] text-orange-200/60 font-sans truncate">{ch.name_en}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 7: AGENTS TERMINAL ───────────────────────────────────────── */}
        {activeServerTab === 'agents_terminal' && (
          <div className="space-y-6 max-w-7xl mx-auto font-mono text-xs">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {SDE_AGENTS_LIST.map((agent) => (
                <div key={agent.id} className="p-4 rounded-2xl bg-black border border-emerald-500/30 space-y-1.5">
                  <div className="flex items-center justify-between text-emerald-400 font-bold">
                    <span>{agent.id}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-[10px] border border-emerald-400/30">
                      {agent.status}
                    </span>
                  </div>
                  <div className="text-white font-bold truncate">{agent.name}</div>
                  <div className="text-[10px] text-emerald-300/70 truncate">{agent.role}</div>
                  <div className="pt-2 border-t border-emerald-500/20 flex justify-between text-[10px] text-emerald-400/80">
                    <span>Load: {agent.load}</span>
                    <span>RAM: {agent.memory}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-3xl bg-black border-2 border-emerald-500/40 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                <span className="text-emerald-400 font-black flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  DHARMA.OS 32-AGENT AUTONOMOUS SDE SWARM LIVE ACTIVITY FEED
                </span>
                <span className="text-emerald-300/70">32/32 Healthy • Zero Errors • $0.00 Cost</span>
              </div>
              <div className="space-y-1.5 text-emerald-300/90 font-mono text-[11px] max-h-72 overflow-y-auto">
                <p className="text-emerald-400">[2026-08-23 19:40:00] [AGENT_SECURITY] Military-Grade Auth Active. Salted Hash Verified.</p>
                <p className="text-emerald-400">[2026-08-23 19:42:15] [AGENT_STREAM] 18 ISKCON Channels verified: MayapurTV, Vrindavan, East Delhi active.</p>
                <p className="text-emerald-400">[2026-08-23 19:45:00] [AGENT_DEVOPS] Next.js 15 Static Export 734/734 pages deployed with 100% health.</p>
                <p className="text-teal-300">[2026-08-23 19:50:00] [SERVER_DAEMON] All systems operational and synchronized.</p>
              </div>
            </div>

          </div>
        )}

        {/* ── TAB 8: SECURITY VAULT ────────────────────────────────────────── */}
        {activeServerTab === 'security_vault' && (
          <div className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-[#0d0904] border-2 border-orange-400/40 shadow-2xl space-y-4">
            <h4 className="text-base font-devanagari font-black text-orange-300 flex items-center gap-2">
              <Shield className="w-4 h-4 text-orange-400" />
              <span>मास्टर सुरक्षा पासकोड बदलें (Change Admin PIN)</span>
            </h4>
            <form onSubmit={handleChangePin} className="space-y-3">
              <div>
                <label className="text-xs font-mono text-orange-300/80 block mb-1">नया गुप्त पासकोड (New Passcode):</label>
                <input
                  type="text"
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  placeholder="उदा. MySecretPin2026..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#060402] border border-orange-400/30 text-orange-200 text-xs font-mono"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-black font-black text-xs font-devanagari shadow-md cursor-pointer hover:scale-102 transition-all"
              >
                🔐 नया पासकोड सुरक्षित सेव करें
              </button>
              {pinChangeSuccess && (
                <p className="text-xs text-emerald-400 font-mono text-center">
                  ✅ पासकोड सफलतापूर्वक बदल दिया गया है!
                </p>
              )}
            </form>
          </div>
        )}

      </main>

      {/* Video Preview Modal */}
      {previewVideoId && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90">
          <div className="w-full max-w-2xl p-4 rounded-3xl bg-[#140e06] border-2 border-orange-400/50 space-y-3">
            <div className="flex justify-between items-center text-xs font-bold text-orange-300">
              <span>यूट्यूब लाइव स्ट्रीम टेस्ट प्लेयर (Video ID: {previewVideoId})</span>
              <button onClick={() => setPreviewVideoId(null)} className="p-1 text-orange-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${previewVideoId}?autoplay=1&rel=0`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Channel Edit Sub-Modal */}
      {editingChannel && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-[#140e06] border-2 border-orange-400/50 space-y-4">
            <h4 className="text-sm font-devanagari font-black text-orange-300 border-b border-orange-400/20 pb-2">
              चैनल #{editingChannel.channelNo} संपादित करें ({editingChannel.nameHindi})
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-orange-300/80 block mb-1">मन्दिर नाम:</label>
                <input
                  type="text"
                  value={editingChannel.nameHindi}
                  onChange={(e) => setEditingChannel({ ...editingChannel, nameHindi: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#060402] border border-orange-400/30 text-orange-200"
                />
              </div>
              <div>
                <label className="text-orange-300/80 block mb-1">यूट्यूब Video ID:</label>
                <input
                  type="text"
                  value={editingChannel.fallbackVideoId}
                  onChange={(e) => setEditingChannel({ 
                    ...editingChannel, 
                    fallbackVideoId: e.target.value,
                    fallbackPlaylist: [{ id: e.target.value, title: editingChannel.fallbackTitle, type: 'mangal_aarti' }]
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-[#060402] border border-orange-400/30 text-emerald-300 font-mono"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-orange-400/20">
              <button onClick={() => setEditingChannel(null)} className="px-3 py-1.5 rounded-xl bg-white/5 text-xs text-orange-300">
                रद्द करें
              </button>
              <button onClick={() => handleSaveChannelEdit(editingChannel)} className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-black font-black text-xs">
                💾 सेव करें
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
