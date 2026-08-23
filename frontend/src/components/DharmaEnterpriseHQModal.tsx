'use client';

import React, { useState } from 'react';
import {
  Building2, TrendingUp, Users, DollarSign, Award, ShieldCheck,
  CheckCircle2, Sparkles, ArrowRight, Share2, Copy, Check, X,
  Briefcase, HeartHandshake, Compass, Layers, Globe
} from 'lucide-react';
import { CORPORATE_DEPARTMENTS, CorporateDepartment } from '@/data/dharmaEnterpriseHQ';
import { sacredAudio } from '@/lib/sacredSounds';

export default function DharmaEnterpriseHQModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDeptId, setActiveDeptId] = useState<string>('executive_strategy');
  const [copiedCard, setCopiedCard] = useState(false);

  const activeDept = CORPORATE_DEPARTMENTS.find(d => d.id === activeDeptId) || CORPORATE_DEPARTMENTS[0];

  const handleCopyCard = () => {
    sacredAudio.playNavChime(0.08);
    navigator.clipboard.writeText(
      '🦚 Dharma.OS — विश्व का प्रथम स्वायत्त श्रीमद्भगवद्गीता एवं वैदिक कॉग्निटिव प्लेटफॉर्म\n\n🌐 लाइव दर्शन एवं स्वाध्याय करें: https://keshavs40344.github.io/githd/'
    );
    setCopiedCard(true);
    setTimeout(() => setCopiedCard(false), 3000);
  };

  return (
    <>
      {/* ── HEADER / FOOTER ENTERPRISE TRIGGER BUTTON ────────────────────── */}
      <button
        onClick={() => {
          sacredAudio.playNavChime(0.06);
          setIsOpen(true);
        }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-400/20 via-yellow-400/20 to-amber-500/20 hover:from-amber-400/30 hover:to-yellow-400/30 border-2 border-amber-400/40 text-amber-300 hover:text-white text-xs font-serif font-bold shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-103 active:scale-95 transition-all cursor-pointer"
        title="धर्म.OS कॉर्पोरेट मुख्यालय एवं बिजनेस मॉडल देखें"
      >
        <Building2 className="w-3.5 h-3.5 text-amber-400" />
        <span>धर्म.OS एंटरप्राइज HQ & व्यापार मॉडल</span>
      </button>

      {/* ── ENTERPRISE HQ FULLSCREEN COMMAND CENTER ──────────────────────── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-2xl animate-fade-in">
          <div className="relative w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-3xl bg-gradient-to-b from-[#0e1224] via-[#080a14] to-[#040508] border-2 border-amber-400/50 shadow-[0_25px_100px_rgba(0,0,0,0.98)] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-amber-400/20 bg-[#060810]/95 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-teal-400 to-amber-600 flex items-center justify-center text-xl text-black font-bold shadow-lg">
                  🏛️
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold">
                      ● Global Enterprise Ecosystem
                    </span>
                    <span className="text-[10px] font-mono text-teal-300 font-bold">Dharma.OS Corp v4.2</span>
                  </div>
                  <h3 className="text-sm sm:text-lg font-devanagari font-black text-amber-300">
                    श्री धर्म.OS स्वायत्त वैश्विक कॉर्पोरेट एवं बिजनेस मुख्यालय
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCard}
                  className="px-3.5 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-black font-serif font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedCard ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedCard ? 'लिंक कॉपी हो गया!' : 'शेयर / ग्राहक आमंत्रण'}</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-amber-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Department Navigation Grid */}
            <div className="px-5 py-3 border-b border-amber-400/15 bg-[#080b18] flex items-center gap-2 overflow-x-auto custom-scrollbar">
              {CORPORATE_DEPARTMENTS.map(dept => (
                <button
                  key={dept.id}
                  onClick={() => {
                    sacredAudio.playNavChime(0.04);
                    setActiveDeptId(dept.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeDeptId === dept.id
                      ? 'bg-amber-400 text-black shadow-md scale-103'
                      : 'bg-[#121528] border border-amber-400/20 text-[#f5eed9]/80 hover:text-white hover:border-amber-400/40'
                  }`}
                >
                  <span>{dept.icon}</span>
                  <span>{dept.nameHindi.split(' ')[1]}</span>
                </button>
              ))}
            </div>

            {/* Active Department Strategic Deep Dive */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar text-left">
              
              {/* Department Hero Banner */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-teal-500/10 to-transparent border-2 border-amber-400/30 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{activeDept.icon}</span>
                    <div>
                      <h4 className="text-base sm:text-xl font-devanagari font-black text-amber-300">
                        {activeDept.nameHindi}
                      </h4>
                      <span className="text-xs font-mono text-teal-300">{activeDept.cxoRole}</span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-xs font-mono font-bold">
                    ● 100% OPERATIONAL
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-serif text-[#f5eed9]/90 leading-relaxed">
                  {activeDept.mission}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {activeDept.growthMetrics.map((metric, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#0e1124] border border-amber-400/20 space-y-1">
                    <span className="text-[10px] font-mono text-amber-400/70">{metric.label}</span>
                    <p className="text-lg font-mono font-bold text-teal-300">{metric.value}</p>
                  </div>
                ))}
              </div>

              {/* Strategy & Initiatives Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Strategic Initiatives */}
                <div className="p-5 rounded-2xl bg-[#0c0e1e] border border-amber-400/20 space-y-3">
                  <h5 className="text-xs font-serif font-bold text-amber-300 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-amber-400" />
                    <span>प्रमुख रणनीतिक पहल (Key Strategic Initiatives):</span>
                  </h5>
                  <ul className="space-y-2">
                    {activeDept.strategicInitiatives.map((init, i) => (
                      <li key={i} className="text-xs font-serif text-[#f5eed9]/85 flex items-start gap-2">
                        <span className="text-amber-400 font-bold shrink-0">✦</span>
                        <span>{init}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Customer Acquisition & Growth Funnel */}
                <div className="p-5 rounded-2xl bg-[#0c0e1e] border border-teal-400/20 space-y-3">
                  <h5 className="text-xs font-serif font-bold text-teal-300 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-teal-400" />
                    <span>ग्राहक/साधक आकर्षण रणनीति (Acquisition Funnel):</span>
                  </h5>
                  <p className="text-xs font-serif text-[#f5eed9]/85 leading-relaxed">
                    {activeDept.customerAcquisitionStrategy}
                  </p>
                  <div className="p-3 rounded-xl bg-black/40 border border-teal-400/20 text-[11px] font-mono text-teal-200">
                    💡 <span className="font-bold">वायरल ग्रोथ लूप:</span> हर साधक जब कृष्ण रेडियो या श्लोक शेयर करता है, तो औसतन 4 नए भक्त सीधे जुड़ते हैं।
                  </div>
                </div>

              </div>

              {/* Complete Vedic Business Model Matrix */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-[#101428] to-[#080a14] border-2 border-amber-400/30 space-y-3">
                <h5 className="text-xs sm:text-sm font-devanagari font-bold text-amber-300 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <span>धर्म.OS का पारदर्शी व्यापार मॉडल (The Vedic Business & Revenue Model):</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-serif">
                  <div className="p-3 rounded-xl bg-black/40 border border-amber-400/20 space-y-1">
                    <span className="font-bold text-amber-300">१. B2C साधक मंडल:</span>
                    <p className="text-[11px] text-[#f5eed9]/70">१००% निःशुल्क आजीवन गीता स्वाध्याय + स्वेच्छा से गुरु दक्षिणा व डिजिटल सेवा।</p>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-teal-400/20 space-y-1">
                    <span className="font-bold text-teal-300">२. B2B कॉर्पोरेट लीडरशिप:</span>
                    <p className="text-[11px] text-[#f5eed9]/70">फॉर्च्यून ५०० कंपनियों हेतु गीता आधारित निष्काम कर्म तनाव-मुक्ति वर्कशॉप्स।</p>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-purple-400/20 space-y-1">
                    <span className="font-bold text-purple-300">३. डिजिटल मंदिर मर्चेंडाइज:</span>
                    <p className="text-[11px] text-[#f5eed9]/70">अल्ट्रा HD 4K कृष्ण आर्टवर्क्स, वैदिक बुक्स व मेडिटेशन ऑडियो का वैश्विक प्रसार।</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-amber-400/20 bg-[#060810] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-amber-300/80">
              <span>● Dharma.OS Enterprise Framework v4.2 • 6 Corporate Departments Active</span>
              <span>100% Shastra & Ethics Sanctioned</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
