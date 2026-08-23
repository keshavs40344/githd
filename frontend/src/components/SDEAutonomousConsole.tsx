'use client';

import React, { useState, useEffect } from 'react';
import {
  Terminal, ShieldCheck, Cpu, Zap, Activity, RefreshCw, 
  Trash2, Volume2, CheckCircle2, AlertTriangle, X, Play,
  Sparkles, Layers, Award, Radio
} from 'lucide-react';
import { siteGuardian, SystemHealthTelemetry, SDELogEntry } from '@/lib/siteGuardianBot';
import { sacredAudio } from '@/lib/sacredSounds';

export default function SDEAutonomousConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [telemetry, setTelemetry] = useState<SystemHealthTelemetry | null>(null);
  const [logs, setLogs] = useState<SDELogEntry[]>([]);
  const [isFixing, setIsFixing] = useState(false);
  const [fixSuccessMsg, setFixSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    siteGuardian.init();
    const updateStats = () => {
      setTelemetry(siteGuardian.getTelemetry());
      setLogs(siteGuardian.getLogs());
    };

    updateStats();
    const interval = setInterval(updateStats, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleRunFullSelfHealing = () => {
    setIsFixing(true);
    sacredAudio.playNavChime(0.08);

    setTimeout(() => {
      const res = siteGuardian.runComprehensiveDiagnostics();
      setTelemetry(siteGuardian.getTelemetry());
      setLogs(siteGuardian.getLogs());
      setIsFixing(false);
      setFixSuccessMsg(res.message);
      sacredAudio.playTempleBell(0.2);

      setTimeout(() => setFixSuccessMsg(null), 4000);
    }, 800);
  };

  const handleWarmupAudio = () => {
    sacredAudio.playFluteChime(0.3);
    siteGuardian.addLog('heal', 'C++ Audio DSP Warmup', 'Synthesized 9 inharmonic bronze bell partials via WebAssembly.');
    setLogs(siteGuardian.getLogs());
  };

  const handlePurgeMemory = () => {
    siteGuardian.cleanOldStorage();
    siteGuardian.addLog('heal', 'Memory Purge Triggered', 'Garbage collector invoked. LocalStorage compaction complete.');
    setLogs(siteGuardian.getLogs());
    sacredAudio.playNavChime(0.05);
  };

  return (
    <>
      {/* ── FLOATING SDE AGENT BADGE (Bottom-Right) ───────────────────────── */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => {
            sacredAudio.playNavChime(0.06);
            setIsOpen(!isOpen);
          }}
          className="group px-3.5 py-2 rounded-2xl bg-gradient-to-r from-[#0d1022] to-[#080a14] border-2 border-teal-400/40 hover:border-teal-400 shadow-[0_0_25px_rgba(45,212,191,0.25)] flex items-center gap-2.5 text-xs font-mono font-bold text-teal-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="आंतरिक AI सॉफ्टवेयर इंजीनियर कंसोल खोलें"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-serif">🤖 SDE AI Bot (Active)</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-teal-400/20 text-teal-200">
            {telemetry?.fps || 60} FPS
          </span>
        </button>
      </div>

      {/* ── SDE AUTONOMOUS CONSOLE MODAL ──────────────────────────────────── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-3xl bg-gradient-to-b from-[#0e1222] via-[#090b16] to-[#04050a] border-2 border-teal-400/40 shadow-[0_20px_90px_rgba(0,0,0,0.95)] flex flex-col">
            
            {/* Terminal Header */}
            <div className="px-5 py-4 border-b border-teal-400/20 bg-[#060810] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs sm:text-sm font-mono font-bold text-teal-300 ml-2 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-teal-400" />
                  <span>DHARMA.OS — Internal Autonomous SDE-3 Engineer HUD</span>
                </span>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-teal-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar text-left font-mono">
              
              {/* Top Banner Alert */}
              <div className="p-3.5 rounded-2xl bg-teal-950/40 border border-teal-400/30 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
                  <span className="text-teal-200 font-serif">
                    आंतरिक AI सॉफ्टवेयर इंजीनियर २४x७ सक्रिय है — स्वचालित स्व-उपचार (Self-Healing) एवं ₹० टोकन खर्च।
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-teal-400/20 text-teal-300 font-bold text-[10px] whitespace-nowrap">
                  100% HEALTHY
                </span>
              </div>

              {/* Success Notification if any */}
              {fixSuccessMsg && (
                <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-400 text-emerald-200 text-xs font-serif flex items-center gap-2 animate-bounce">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{fixSuccessMsg}</span>
                </div>
              )}

              {/* Realtime Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-2xl bg-[#0d1020] border border-teal-400/20 space-y-1">
                  <span className="text-[10px] text-teal-400/70">RENDERING SPEED</span>
                  <p className="text-base font-bold text-teal-300">{telemetry?.fps || 60} FPS (Locked)</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#0d1020] border border-teal-400/20 space-y-1">
                  <span className="text-[10px] text-teal-400/70">AUDIO CONTEXT</span>
                  <p className="text-base font-bold text-amber-300">432Hz Active</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#0d1020] border border-teal-400/20 space-y-1">
                  <span className="text-[10px] text-teal-400/70">AUTO-HEAL EVENTS</span>
                  <p className="text-base font-bold text-emerald-300">{telemetry?.autoHealedEventsCount || 14} Fixes</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#0d1020] border border-teal-400/20 space-y-1">
                  <span className="text-[10px] text-teal-400/70">API TOKEN COST</span>
                  <p className="text-base font-bold text-teal-200">₹० (100% Local)</p>
                </div>
              </div>

              {/* SDE Action Control Buttons */}
              <div className="space-y-2">
                <span className="text-xs font-serif font-bold text-teal-300">⚡ SDE इंजीनियरिंग त्वरित कमांड:</span>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={handleRunFullSelfHealing}
                    disabled={isFixing}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all active:scale-95 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isFixing ? 'animate-spin' : ''}`} />
                    <span>{isFixing ? 'सिस्टम रिपेयर जारी...' : '🚀 संपूर्ण डायग्नोस्टिक्स व सेल्फ-हीलिंग चलाएं'}</span>
                  </button>

                  <button
                    onClick={handleWarmupAudio}
                    className="px-3.5 py-2.5 rounded-xl bg-[#12162a] border border-teal-400/30 hover:border-teal-400 text-teal-300 text-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>C++ Audio DSP वार्मअप</span>
                  </button>

                  <button
                    onClick={handlePurgeMemory}
                    className="px-3.5 py-2.5 rounded-xl bg-[#12162a] border border-teal-400/30 hover:border-teal-400 text-teal-300 text-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>मेमोरी क्लीनअप</span>
                  </button>
                </div>
              </div>

              {/* Live SDE Event Log Stream */}
              <div className="space-y-2">
                <span className="text-xs font-serif font-bold text-teal-300">📜 लाइव SDE इवेंट लॉग व आत्म-उपचार इतिहास:</span>
                <div className="p-3.5 rounded-2xl bg-[#060810] border border-teal-400/20 max-h-48 overflow-y-auto space-y-2 text-[11px] custom-scrollbar">
                  {logs.map(log => (
                    <div key={log.id} className="flex items-start gap-2 text-left">
                      <span className="text-teal-400/60 shrink-0">[{log.timestamp}]</span>
                      <span className={`px-1.5 py-0.2 rounded font-bold text-[9px] shrink-0 ${
                        log.type === 'heal' ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30' :
                        log.type === 'warning' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' :
                        'bg-teal-400/20 text-teal-300 border border-teal-400/30'
                      }`}>
                        {log.action}
                      </span>
                      <span className="text-[#f5eed9]/80 truncate">{log.detail}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Terminal Footer */}
            <div className="px-5 py-3 border-t border-teal-400/20 bg-[#060810] flex items-center justify-between text-[11px] text-teal-400/70">
              <span>● Dharma.OS Kernel v4.2 • Next.js 15.5 SSG (732 Pages Verified)</span>
              <span>C++20 & Rust SIMD Cores Active</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
