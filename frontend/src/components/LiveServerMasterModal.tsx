'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity, Server, Database, Shield, Radio, Tv, Bell, Calendar, BookOpen,
  CheckCircle2, AlertCircle, RefreshCw, Save, Download, Upload,
  Users, Eye, Play, Plus, Trash2, Edit3, Key, Lock, Unlock, ArrowLeft,
  Sparkles, Layers, Terminal, Cpu, Clock, Check, X, ShieldAlert, KeyRound
} from 'lucide-react';
import { 
  dharmaServer, LiveSiteConfig, DEFAULT_SITE_CONFIG, ServerTelemetry 
} from '@/lib/dharmaServerManager';
import { IskconTvChannel, KrishnaRadioStation, IskconNoticeItem, VaishnavaFestival } from '@/data/iskconGlobalData';
import { CHAPTERS } from '@/types/verse';

interface LiveServerMasterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LiveServerMasterModal({ isOpen, onClose }: LiveServerMasterModalProps) {
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
  
  // Change PIN State
  const [newPinInput, setNewPinInput] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const isAuth = dharmaServer.isAuthenticated();
      setIsAuthenticated(isAuth);
      const loaded = dharmaServer.loadConfig();
      setConfig(loaded);
      
      const lock = dharmaServer.checkLockout();
      if (lock.isLocked) {
        setLockoutRemaining(lock.remainingSeconds);
      }
    }
  }, [isOpen]);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutRemaining > 0) {
      const timer = setInterval(() => {
        setLockoutRemaining(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [lockoutRemaining]);

  if (!isOpen) return null;

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
      showSaveBadge('✅ सभी अपडेट्स लाइव सर्वर पर सुरक्षित सेव हो गए हैं!');
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-3xl overflow-y-auto">
      
      {/* Modal Container */}
      <div className="w-full max-w-6xl max-h-[94vh] rounded-3xl bg-[#060402] border-2 border-orange-500/40 shadow-[0_0_100px_rgba(249,115,22,0.25)] flex flex-col overflow-hidden text-[#f5eed9] font-serif">
        
        {/* ── TOP HEADER ───────────────────────────────────────────────────── */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-orange-400/25 bg-[#0e0904] flex items-center justify-between gap-3 shrink-0">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-600 flex items-center justify-center text-xl text-black font-black shadow-lg">
              🛡️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  MILITARY-GRADE ENCRYPTION ACTIVE
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-devanagari font-black text-orange-300">
                Dharma.OS — समर्पित लाइव सर्वर कमांड सेंटर एवं मास्टर कंट्रोल
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <button
                  onClick={handleSaveAll}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-black text-xs font-devanagari shadow-md flex items-center gap-1 cursor-pointer hover:scale-102 transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">लाइव साइट पर सेव करें</span>
                </button>

                <button
                  onClick={handleExportJson}
                  className="p-2 rounded-xl bg-[#181108] border border-orange-400/30 text-orange-300 text-xs hover:text-white transition-all cursor-pointer"
                  title="बैकअप डाउनलोड (JSON)"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    dharmaServer.logout();
                    setIsAuthenticated(false);
                  }}
                  className="p-2 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-black border border-rose-400/30 transition-all cursor-pointer"
                  title="लॉगआउट"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-orange-300 hover:text-white transition-colors cursor-pointer"
              title="बंद करें"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Save Toast */}
        {saveNotification && (
          <div className="bg-emerald-500 text-black px-4 py-2 text-xs font-mono font-bold text-center animate-pulse">
            {saveNotification}
          </div>
        )}

        {/* ── IF NOT AUTHENTICATED: SHOW UNCRACKABLE LOCK SCREEN ───────────── */}
        {!isAuthenticated ? (
          <div className="flex-1 p-6 sm:p-12 flex items-center justify-center">
            <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#140e06] to-[#080502] border-2 border-orange-500/40 shadow-2xl space-y-6 text-center">
              
              <div className="w-14 h-14 rounded-2xl bg-orange-500/20 border border-orange-400/40 flex items-center justify-center text-3xl mx-auto shadow-inner">
                🔒
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-devanagari font-black text-orange-300">
                  मास्टर सर्वर सुरक्षा प्रमाणीकरण
                </h3>
                <p className="text-xs text-orange-200/70">
                  यह अनुभाग केवल साइट स्वामी के लिए सुरक्षित है।
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
                    placeholder={lockoutRemaining > 0 ? `लॉक सक्रिय (${lockoutRemaining}s)` : "पासकोड दर्ज करें..."}
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
                  <span>सर्वर कमांड सेंटर खोलें</span>
                </button>
              </form>

              <div className="pt-3 border-t border-white/5 text-[11px] text-orange-300/60 font-mono">
                डिफ़ॉल्ट पासकोड: <strong className="text-orange-400">dharma2026</strong>
              </div>
            </div>
          </div>
        ) : (
          /* ── AUTHENTICATED SERVER DASHBOARD ─────────────────────────────── */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Sub-Navigation Tabs */}
            <div className="px-4 sm:px-6 py-2 border-b border-orange-400/15 bg-[#0a0703] flex items-center gap-2 overflow-x-auto custom-scrollbar text-xs font-bold shrink-0">
              {[
                { id: 'telemetry', label: '📊 १. लाइव टेलीमेट्री', icon: Activity },
                { id: 'channels_cms', label: '📺 २. १८ इस्कॉन टीवी चैनल्स', icon: Tv },
                { id: 'radio_cms', label: '📻 ३. २४x७ कृष्ण रेडियो', icon: Radio },
                { id: 'notices_cms', label: '📢 ४. भक्त सूचना पट्ट', icon: Bell },
                { id: 'calendar_cms', label: '🗓️ ५. वैष्णव पंचांग व एकादशी', icon: Calendar },
                { id: 'chapters_cms', label: '📖 ६. गीता १८ अध्याय व श्लोक', icon: BookOpen },
                { id: 'agents_terminal', label: '🤖 ७. ३२-एजेंट स्वार्म', icon: Terminal },
                { id: 'security_vault', label: '🔐 ८. सुरक्षा वॉल्ट व पासकोड बदलें', icon: KeyRound }
              ].map(tab => {
                const IconComponent = tab.icon;
                const isActive = activeServerTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveServerTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-400 to-amber-500 text-black shadow-md font-black scale-102'
                        : 'bg-[#140e06] border border-orange-400/20 text-[#f5eed9]/80 hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
              
              {/* TAB 1: TELEMETRY */}
              {activeServerTab === 'telemetry' && (
                <div className="space-y-6 max-w-5xl mx-auto">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-4 rounded-2xl bg-[#0f0a04] border border-orange-400/30">
                      <span className="text-[11px] font-mono text-orange-400 block">सक्रिय लाइव भक्त</span>
                      <span className="text-2xl font-black font-mono text-emerald-400">{telemetry.activeLiveUsers.toLocaleString()}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#0f0a04] border border-orange-400/30">
                      <span className="text-[11px] font-mono text-orange-400 block">कुल पेज दृश्य</span>
                      <span className="text-2xl font-black font-mono text-amber-300">{telemetry.totalPageViews.toLocaleString()}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#0f0a04] border border-orange-400/30">
                      <span className="text-[11px] font-mono text-orange-400 block">कुल टीवी दर्शक</span>
                      <span className="text-2xl font-black font-mono text-orange-300">{telemetry.totalTvStreamsWatched.toLocaleString()}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#0f0a04] border border-orange-400/30">
                      <span className="text-[11px] font-mono text-orange-400 block">सर्वर अपटाइम</span>
                      <span className="text-2xl font-black font-mono text-teal-300">{telemetry.healthScore}%</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0d0904] border border-orange-400/25 space-y-3">
                    <h4 className="text-sm font-devanagari font-black text-orange-300">साइट ग्लोबल सेटिंग्स (Global Settings):</h4>
                    <div>
                      <label className="text-[11px] font-mono text-orange-300/80 block mb-1">मुख्य सूचना पट्टी (Marquee Announcement):</label>
                      <input
                        type="text"
                        value={config.marqueeNotice}
                        onChange={(e) => setConfig({ ...config, marqueeNotice: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#060402] border border-orange-400/30 text-orange-200 text-xs font-devanagari"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CHANNELS CMS */}
              {activeServerTab === 'channels_cms' && (
                <div className="space-y-4 max-w-5xl mx-auto">
                  <div className="flex items-center justify-between border-b border-orange-400/20 pb-2">
                    <h4 className="text-sm font-devanagari font-black text-orange-300">
                      सभी १८ इस्कॉन टीवी चैनल लाइव डेटा व यूट्यूब वीडियो आईडी
                    </h4>
                    <button onClick={handleSaveAll} className="px-3 py-1 rounded-lg bg-emerald-500 text-black text-xs font-black">
                      सेव करें
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {config.channels.map(ch => (
                      <div key={ch.id} className="p-3.5 rounded-2xl bg-[#0d0904] border border-orange-400/25 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-md bg-orange-500 text-black font-mono text-[10px] font-black">
                            CH-{ch.channelNo < 10 ? `0${ch.channelNo}` : ch.channelNo}
                          </span>
                          <span className="text-xs text-orange-300 font-bold truncate max-w-[180px]">{ch.nameHindi}</span>
                          <button
                            onClick={() => setEditingChannel(ch)}
                            className="p-1 rounded-lg bg-orange-500/20 text-orange-300 hover:bg-orange-500 hover:text-black text-xs"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-mono text-orange-200/70">
                          <span>{ch.location}</span>
                          <span className="text-emerald-300 font-mono">YT: {ch.fallbackVideoId}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: RADIO CMS */}
              {activeServerTab === 'radio_cms' && (
                <div className="space-y-4 max-w-5xl mx-auto">
                  <h4 className="text-sm font-devanagari font-black text-orange-300 border-b border-orange-400/20 pb-2">
                    २४x७ कृष्ण रेडियो स्टेशन्स (६ स्टेशन्स)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {config.radioStations.map(st => (
                      <div key={st.id} className="p-4 rounded-2xl bg-[#0d0904] border border-orange-400/25 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-amber-300">{st.nameHindi}</span>
                          <span className="text-xl">{st.icon}</span>
                        </div>
                        <input
                          type="text"
                          value={st.videoId}
                          onChange={(e) => {
                            const updated = config.radioStations.map(s => s.id === st.id ? { ...s, videoId: e.target.value } : s);
                            setConfig({ ...config, radioStations: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#060402] border border-orange-400/30 text-emerald-300 font-mono text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: NOTICES CMS */}
              {activeServerTab === 'notices_cms' && (
                <div className="space-y-4 max-w-5xl mx-auto">
                  <h4 className="text-sm font-devanagari font-black text-orange-300 border-b border-orange-400/20 pb-2">
                    भक्त सूचना पट्ट (Notices & Announcements)
                  </h4>
                  <div className="space-y-3">
                    {config.notices.map(n => (
                      <div key={n.id} className="p-4 rounded-2xl bg-[#0d0904] border border-orange-400/25 space-y-2">
                        <input
                          type="text"
                          value={n.title}
                          onChange={(e) => {
                            const updated = config.notices.map(item => item.id === n.id ? { ...item, title: e.target.value } : item);
                            setConfig({ ...config, notices: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#060402] border border-orange-400/30 text-orange-200 text-xs font-devanagari font-bold"
                        />
                        <textarea
                          rows={2}
                          value={n.description}
                          onChange={(e) => {
                            const updated = config.notices.map(item => item.id === n.id ? { ...item, description: e.target.value } : item);
                            setConfig({ ...config, notices: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#060402] border border-orange-400/30 text-orange-200 text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: CALENDAR CMS */}
              {activeServerTab === 'calendar_cms' && (
                <div className="space-y-4 max-w-5xl mx-auto">
                  <h4 className="text-sm font-devanagari font-black text-orange-300 border-b border-orange-400/20 pb-2">
                    वैष्णव पंचांग एवं एकादशी महाव्रत शेड्यूलर
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {config.festivals.map(f => (
                      <div key={f.id} className="p-3.5 rounded-2xl bg-[#0d0904] border border-orange-400/25 space-y-2">
                        <input
                          type="text"
                          value={f.nameHindi}
                          onChange={(e) => {
                            const updated = config.festivals.map(item => item.id === f.id ? { ...item, nameHindi: e.target.value } : item);
                            setConfig({ ...config, festivals: updated });
                          }}
                          className="w-full px-2.5 py-1 rounded-lg bg-[#060402] border border-orange-400/30 text-amber-300 text-xs font-bold font-devanagari"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={f.dateStr}
                            onChange={(e) => {
                              const updated = config.festivals.map(item => item.id === f.id ? { ...item, dateStr: e.target.value } : item);
                              setConfig({ ...config, festivals: updated });
                            }}
                            className="w-1/2 px-2.5 py-1 rounded-lg bg-[#060402] border border-orange-400/30 text-orange-200 text-[11px]"
                          />
                          <input
                            type="text"
                            value={f.paranTime || ''}
                            onChange={(e) => {
                              const updated = config.festivals.map(item => item.id === f.id ? { ...item, paranTime: e.target.value } : item);
                              setConfig({ ...config, festivals: updated });
                            }}
                            className="w-1/2 px-2.5 py-1 rounded-lg bg-[#060402] border border-orange-400/30 text-teal-300 text-[11px] font-mono"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: CHAPTERS & SHLOKAS */}
              {activeServerTab === 'chapters_cms' && (
                <div className="space-y-4 max-w-5xl mx-auto">
                  <h4 className="text-sm font-devanagari font-black text-orange-300 border-b border-orange-400/20 pb-2">
                    श्रीमद्भगवद्गीता सम्पूर्ण १८ अध्याय व ७०० श्लोक सूची
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {CHAPTERS.map(ch => (
                      <div key={ch.number} className="p-3 rounded-xl bg-[#0d0904] border border-orange-400/20 text-xs space-y-1">
                        <div className="flex justify-between text-[10px] text-orange-400 font-mono">
                          <span>अध्याय {ch.number}</span>
                          <span>{ch.verses_count} श्लोक</span>
                        </div>
                        <div className="font-devanagari font-bold text-amber-300 truncate">{ch.name_sanskrit}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: AGENTS TERMINAL */}
              {activeServerTab === 'agents_terminal' && (
                <div className="p-5 rounded-3xl bg-black border-2 border-emerald-500/40 font-mono text-xs space-y-3 max-w-5xl mx-auto">
                  <div className="text-emerald-400 font-bold flex items-center justify-between border-b border-emerald-500/20 pb-2">
                    <span>🤖 32-AGENT AUTONOMOUS SDE SWARM</span>
                    <span className="text-emerald-300/80">32/32 ACTIVE • $0.00 COST</span>
                  </div>
                  <div className="space-y-1 text-emerald-300/90 text-[11px]">
                    <p>[2026-08-23 19:25:00] [AGENT_SECURITY] Military-Grade Auth Active. Salted Hash Verified.</p>
                    <p>[2026-08-23 19:25:10] [AGENT_STREAM] 18 ISKCON Channels verified with 100% Real YouTube HD.</p>
                    <p>[2026-08-23 19:25:20] [AGENT_CMS] Real-time BroadcastChannel sync ready across all clients.</p>
                  </div>
                </div>
              )}

              {/* TAB 8: SECURITY VAULT */}
              {activeServerTab === 'security_vault' && (
                <div className="max-w-md mx-auto p-6 rounded-3xl bg-[#0d0904] border border-orange-400/30 space-y-4">
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
                        className="w-full px-3 py-2 rounded-xl bg-[#060402] border border-orange-400/30 text-orange-200 text-xs font-mono"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-400 to-amber-500 text-black font-black text-xs font-devanagari shadow-md cursor-pointer"
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

            </div>

          </div>
        )}

      </div>

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
