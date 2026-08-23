'use client';

import React, { useState, useEffect } from 'react';
import {
  Users, Shield, Cpu, Sparkles, CheckCircle2, Zap, RefreshCw,
  X, Layers, Activity, Lock, Terminal, Award, Radio, Play
} from 'lucide-react';
import { swarmEngine, SwarmAgent, SWARM_AGENTS } from '@/lib/autonomousSwarmEngine';
import { sacredAudio } from '@/lib/sacredSounds';

const DEPARTMENTS = [
  { id: 'all', label: 'सभी ३२ AI अभियंता (All 32 Agents)', icon: '👑' },
  { id: 'ui_design', label: '🎨 UI एवं दृश्य कला (6)', icon: '🎨' },
  { id: 'ux_devotee', label: '🧘 UX एवं साधक अनुभव (6)', icon: '🧘' },
  { id: 'cyber_sec', label: '🛡️ साइबर सुरक्षा व एंटी-हैकिंग (5)', icon: '🛡️' },
  { id: 'perf_wasm', label: '⚡ परफॉरमेंस व C++ DSP (5)', icon: '⚡' },
  { id: 'spiritual_cbt', label: '🦚 आध्यात्मिक AI व CBT (5)', icon: '🦚' },
  { id: 'evolution', label: '🚀 स्वतः विकास व SRE (5)', icon: '🚀' },
];

export default function AutonomousSwarmModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDept, setActiveDept] = useState('all');
  const [agents, setAgents] = useState<SwarmAgent[]>(SWARM_AGENTS);
  const [isTriggering, setIsTriggering] = useState(false);
  const [triggerMsg, setTriggerMsg] = useState<string | null>(null);

  useEffect(() => {
    swarmEngine.init();
    const interval = setInterval(() => {
      setAgents([...swarmEngine.getAgents()]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const filteredAgents = activeDept === 'all'
    ? agents
    : agents.filter(a => a.department === activeDept);

  const handleTriggerSwarm = () => {
    setIsTriggering(true);
    sacredAudio.playNavChime(0.08);

    setTimeout(() => {
      const res = swarmEngine.runAllDiagnostics();
      setAgents([...swarmEngine.getAgents()]);
      setIsTriggering(false);
      sacredAudio.playTempleBell(0.2);
      setTriggerMsg(`✅ समस्त ३२ AI इंजीनियरों ने संपूर्ण सिस्टम का स्व-उपचार पूर्ण किया! (कुल टास्क: ${res.totalTasks.toLocaleString()})`);

      setTimeout(() => setTriggerMsg(null), 5000);
    }, 800);
  };

  return (
    <>
      {/* ── FLOATING TRIGGER BADGE & HEADER BUTTON ────────────────────────── */}
      <button
        onClick={() => {
          sacredAudio.playNavChime(0.06);
          setIsOpen(true);
        }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-400/20 via-teal-400/20 to-amber-500/20 hover:from-amber-400/30 hover:to-teal-400/30 border-2 border-amber-400/40 text-amber-300 hover:text-white text-xs font-serif font-bold shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-103 active:scale-95 transition-all cursor-pointer"
        title="३२ स्वायत्त AI अभियंता दल कमांड सेंटर खोलें"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-sm">🤖</span>
        <span>३२ AI अभियंता दल (24x7 Active)</span>
      </button>

      {/* ── 32-AGENT COMMAND CENTER MODAL ─────────────────────────────────── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fade-in">
          <div className="relative w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-3xl bg-gradient-to-b from-[#0e1224] via-[#080a14] to-[#040508] border-2 border-amber-400/50 shadow-[0_25px_100px_rgba(0,0,0,0.98)] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-amber-400/20 bg-[#060810]/95 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-teal-400 to-amber-600 flex items-center justify-center text-xl text-black font-bold shadow-lg">
                  🤖
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 font-bold">
                      ● 32 SDE AI Swarm Active
                    </span>
                    <span className="text-[10px] font-mono text-amber-300 font-bold">₹०.०० टोकन खर्च (100% Free Forever)</span>
                  </div>
                  <h3 className="text-sm sm:text-lg font-devanagari font-black text-amber-300 drop-shadow-sm">
                    श्री धर्म AI स्वायत्त अभियंता दल — ३२ विशेषज्ञ AI एजेंट्स
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleTriggerSwarm}
                  disabled={isTriggering}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 text-black font-serif font-bold text-xs flex items-center gap-1.5 shadow-lg active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTriggering ? 'animate-spin' : ''}`} />
                  <span>{isTriggering ? '३२ एजेंट्स कार्यरत...' : '🚀 संपूर्ण दल से स्व-उपचार चलाएं'}</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-amber-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Success Alert */}
            {triggerMsg && (
              <div className="mx-6 mt-4 p-3 rounded-2xl bg-emerald-950/70 border border-emerald-400 text-emerald-200 text-xs font-serif flex items-center gap-2 animate-bounce">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{triggerMsg}</span>
              </div>
            )}

            {/* Department Navigation Tabs */}
            <div className="px-5 py-3 border-b border-amber-400/15 bg-[#080b18] flex items-center gap-2 overflow-x-auto custom-scrollbar">
              {DEPARTMENTS.map(dept => (
                <button
                  key={dept.id}
                  onClick={() => {
                    sacredAudio.playNavChime(0.04);
                    setActiveDept(dept.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeDept === dept.id
                      ? 'bg-amber-400 text-black shadow-md scale-103'
                      : 'bg-[#121528] border border-amber-400/20 text-[#f5eed9]/80 hover:text-white hover:border-amber-400/40'
                  }`}
                >
                  <span>{dept.label}</span>
                </button>
              ))}
            </div>

            {/* 32 Agents Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 custom-scrollbar">
              {filteredAgents.map(agent => (
                <div
                  key={agent.id}
                  className="p-4 rounded-2xl bg-gradient-to-b from-[#111428] to-[#0a0c16] border-2 border-amber-400/20 hover:border-amber-400/50 shadow-md hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] transition-all space-y-3 text-left flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    {/* Card Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{agent.icon}</span>
                        <div>
                          <h4 className="text-xs sm:text-sm font-devanagari font-bold text-amber-300">
                            {agent.nameHindi}
                          </h4>
                          <span className="text-[10px] font-mono text-teal-300/80">{agent.name}</span>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[9px] font-mono font-bold border border-emerald-400/30">
                        ACTIVE
                      </span>
                    </div>

                    {/* Role Description */}
                    <p className="text-[11px] font-serif text-[#f5eed9]/80 leading-relaxed">
                      {agent.role}
                    </p>
                  </div>

                  {/* Bottom Metrics & Last Action */}
                  <div className="space-y-1.5 pt-2 border-t border-white/10 text-[10px] font-mono">
                    <div className="flex items-center justify-between text-amber-300/90">
                      <span>मेट्रिक: {agent.metric}</span>
                      <span className="text-teal-300 font-bold">{agent.tasksCompleted} टास्क</span>
                    </div>
                    <p className="text-amber-200/60 truncate font-serif">
                      ⚡ {agent.lastAction}
                    </p>
                  </div>

                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-amber-400/20 bg-[#060810] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-amber-300/80">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>३२ स्वायत्त अभियंता दल पूर्णतः सक्रिय • २४x७ स्वतः-समाधान मोड</span>
              </span>
              <span>₹०.०० लाइफटाइम फ्री (100% Client-Side WebAssembly Architecture)</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
