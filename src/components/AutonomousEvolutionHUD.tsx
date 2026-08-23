'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles, ShieldAlert, CheckCircle2, ArrowRight, Eye,
  RefreshCw, MessageSquare, Send, X, Sun, Moon, Sunrise, Sunset,
  Flame, Bell, Layers, Cpu
} from 'lucide-react';
import { evolutionEngine, EscalationNotice, AmbientTheme } from '@/lib/autonomousEvolutionEngine';
import { sacredAudio } from '@/lib/sacredSounds';

export default function AutonomousEvolutionHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<AmbientTheme | null>(null);
  const [notices, setNotices] = useState<EscalationNotice[]>([]);
  const [liveToast, setLiveToast] = useState<EscalationNotice | null>(null);
  const [feedbackInput, setFeedbackInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    evolutionEngine.init();
    setTheme(evolutionEngine.getCurrentTheme());
    setNotices(evolutionEngine.getNotices());

    const unsubscribe = evolutionEngine.subscribe((newTheme, newNotice) => {
      setTheme(newTheme);
      setNotices([...evolutionEngine.getNotices()]);
      if (newNotice) {
        setLiveToast(newNotice);
        sacredAudio.playNavChime(0.04);
        setTimeout(() => setLiveToast(null), 6000);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmitDevoteeNeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackInput.trim() || isSubmitting) return;

    const userText = feedbackInput.trim();
    setFeedbackInput('');
    setIsSubmitting(true);
    sacredAudio.playNavChime(0.08);

    setTimeout(() => {
      evolutionEngine.reportDissatisfaction(
        `साधक की सीधी प्रार्थना/आवश्यकता: "${userText}"`,
        userText,
        'seeking_more'
      );
      setIsSubmitting(false);
      setSubmitSuccess(true);
      sacredAudio.playTempleBell(0.2);

      setTimeout(() => setSubmitSuccess(false), 4000);
    }, 600);
  };

  return (
    <>
      {/* ── LIVE FLOATING AUTO-RESOLUTION TOAST NOTIFICATION ─────────────── */}
      {liveToast && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-md w-full p-4 rounded-3xl bg-[#0a0d1e]/95 border-2 border-emerald-400/60 shadow-[0_10px_40px_rgba(16,185,129,0.35)] backdrop-blur-xl animate-fade-in text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>आंतरिक AI स्वतः-अनुकूलन सक्रिय</span>
            </span>
            <button
              onClick={() => setLiveToast(null)}
              className="text-white/60 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1">
            <h5 className="text-xs font-devanagari font-bold text-amber-300">
              {liveToast.observedTrigger}
            </h5>
            <p className="text-[11px] font-serif text-emerald-200/90 leading-relaxed">
              ⚡ {liveToast.appliedFix}
            </p>
          </div>
        </div>
      )}

      {/* ── FLOATING ESCALATION WATCHDOG TRIGGER (Bottom-Left) ────────────── */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          onClick={() => {
            sacredAudio.playNavChime(0.06);
            setIsOpen(!isOpen);
          }}
          className="group px-3.5 py-2 rounded-2xl bg-gradient-to-r from-[#12162b] to-[#080a14] border-2 border-amber-400/40 hover:border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.25)] flex items-center gap-2 text-xs font-serif font-bold text-amber-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="साधक आवश्यकता संज्ञान एवं स्वतः-सुधार केंद्र खोलें"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">साधक संज्ञान प्रहरी</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-400/20 text-amber-200 font-mono">
            {theme?.nameHindi.split(' ')[0] || '🌅'}
          </span>
        </button>
      </div>

      {/* ── FULLSCREEN ESCALATION & AUTO-DESIGN MODAL ─────────────────────── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-gradient-to-b from-[#0e1224] via-[#090b16] to-[#040508] border-2 border-amber-400/50 shadow-[0_25px_100px_rgba(0,0,0,0.98)] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-amber-400/20 bg-[#060810]/95 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-rose-400 to-amber-600 flex items-center justify-center text-xl text-black font-bold shadow-lg">
                  👁️
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold">
                      ● Active Devotee Telemetry
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">Hierarchical SDE Cascade</span>
                  </div>
                  <h3 className="text-sm sm:text-lg font-devanagari font-black text-amber-300">
                    साधक आवश्यकता संज्ञान एवं त्वरित स्वतः-अनुकूलन केंद्र
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-amber-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar text-left">
              
              {/* Current Ambient Time Theme */}
              {theme && (
                <div className="p-4 rounded-2xl bg-[#111428] border-2 border-amber-400/30 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center text-2xl">
                      {theme.nameHindi.split(' ')[0]}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-amber-400/80">सक्रिय वैदिक काल चक्र (Time-Adaptive Aesthetics):</span>
                      <h4 className="text-sm font-devanagari font-bold text-[#f5eed9]">{theme.nameHindi}</h4>
                    </div>
                  </div>
                  <span className="text-xs font-serif text-amber-300/90 font-bold px-3 py-1 rounded-xl bg-black/40 border border-amber-400/30">
                    ✨ आभा-दीप्ति स्वतः संतुलित
                  </span>
                </div>
              )}

              {/* Direct Devotee Feedback Form */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-transparent border border-amber-400/30 space-y-3">
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-devanagari font-bold text-amber-300 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                    <span>आपको क्या चाहिए या क्या समस्या आ रही है? (वरिष्ठ AI दल को तुरंत सूचित करें):</span>
                  </h4>
                  <p className="text-[11px] font-serif text-[#f5eed9]/70">
                    यदि कोई फीचर नहीं मिल रहा या कोई डिज़ाइन सुधार चाहते हैं, तो यहाँ लिखें — आंतरिक सीनियर AI एजेंट तुरंत संज्ञान लेकर साइट में सुधार करेगा।
                  </p>
                </div>

                <form onSubmit={handleSubmitDevoteeNeed} className="flex gap-2">
                  <input
                    type="text"
                    value={feedbackInput}
                    onChange={e => setFeedbackInput(e.target.value)}
                    placeholder="उदा. 'राधा रानी के और भजन जोड़ें', 'फ़ॉन्ट थोड़ा बड़ा करें', 'ध्यान हेतु शांत मोड'..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#090b16] border border-amber-400/30 text-xs font-serif text-[#f5eed9] placeholder-amber-400/40 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    disabled={!feedbackInput.trim() || isSubmitting}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 text-black font-serif font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'प्रेषित...' : 'AI को सूचित करें'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                {submitSuccess && (
                  <p className="text-xs font-serif text-emerald-300 flex items-center gap-1.5 pt-1 animate-bounce">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>आपकी प्रार्थना वरिष्ठ AI अभियंता दल तक पहुँच गई है और अनुकूलन प्रारंभ हो गया है!</span>
                  </p>
                )}
              </div>

              {/* Live Escalation & Resolution Feed */}
              <div className="space-y-3">
                <h4 className="text-xs font-serif font-bold text-amber-300 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>लाइव असंतोष संज्ञान एवं स्वतः-समाधान इतिहास (Live Resolution Stream):</span>
                </h4>

                <div className="space-y-3">
                  {notices.map(notice => (
                    <div
                      key={notice.id}
                      className="p-4 rounded-2xl bg-[#0a0c18] border border-amber-400/20 space-y-2 hover:border-amber-400/40 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-amber-400/70">{notice.timestamp}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[9px] font-mono font-bold border border-emerald-400/30">
                          {notice.impactScore}
                        </span>
                      </div>

                      <h5 className="text-xs font-devanagari font-bold text-amber-300">
                        {notice.observedTrigger}
                      </h5>

                      <div className="p-2.5 rounded-xl bg-[#121528] text-[11px] font-serif text-[#f5eed9]/90 space-y-1">
                        <p className="text-teal-300 font-bold">🛠️ वरिष्ठ एजेंट का समाधान:</p>
                        <p>{notice.appliedFix}</p>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-amber-400/20 bg-[#060810] flex items-center justify-between text-[11px] font-mono text-amber-300/80">
              <span>● 24x7 Active Devotee Telemetry Cascade</span>
              <span>100% Free Client-Side Adaptive Intelligence</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
