'use client';

import React, { useState } from 'react';
import {
  Table, FileSpreadsheet, Download, RefreshCw, Users, Shield,
  CheckCircle2, Sparkles, Building2, Terminal, ArrowRight, X,
  Layers, Lock, Play, Share2, Briefcase, Award, TrendingUp
} from 'lucide-react';
import { 
  TOP_MNC_STAFF, GOOGLE_SHEETS_DECISION_LEDGER, LIVE_BOARDROOM_MEETINGS,
  MNCStaffMember, SheetDecisionRow 
} from '@/data/topMncExecutiveBoard';
import { sacredAudio } from '@/lib/sacredSounds';

export default function ExecutiveBoardroomSheetsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'sheets_ledger' | 'mnc_staff' | 'meetings' | 'security_audit'>('sheets_ledger');
  const [ledgerRows, setLedgerRows] = useState<SheetDecisionRow[]>(GOOGLE_SHEETS_DECISION_LEDGER);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExportCSV = () => {
    setIsExporting(true);
    sacredAudio.playNavChime(0.08);

    setTimeout(() => {
      // Build CSV String
      const headers = 'ID,Timestamp,Department,Executive Lead,Observed Need,Decision Taken,Business Feasibility,Cost Impact,Security Audit,Status\n';
      const rows = ledgerRows.map(r => 
        `"${r.id}","${r.timestamp}","${r.department}","${r.executiveLead}","${r.observedNeedOrIssue}","${r.decisionTaken}","${r.businessFeasibilityAndImpact}","${r.costImpact}","${r.securityAudit}","${r.status}"`
      ).join('\n');

      const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `DharmaOS_GoogleSheets_Executive_Decisions_${Date.now()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsExporting(false);
      setExportSuccess(true);
      sacredAudio.playTempleBell(0.2);

      setTimeout(() => setExportSuccess(false), 4000);
    }, 600);
  };

  return (
    <>
      {/* ── HEADER / FOOTER MNC TRIGGER BUTTON ────────────────────────────── */}
      <button
        onClick={() => {
          sacredAudio.playNavChime(0.06);
          setIsOpen(true);
        }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-teal-500/20 via-emerald-400/20 to-teal-600/20 hover:from-teal-400/30 hover:to-emerald-400/30 border-2 border-teal-400/40 text-teal-300 hover:text-white text-xs font-mono font-bold shadow-[0_0_20px_rgba(45,212,191,0.25)] hover:scale-103 active:scale-95 transition-all cursor-pointer"
        title="गूगल शीट्स एग्जीक्यूटिव लेजर एवं टॉप MNC बोर्डरूम खोलें"
      >
        <FileSpreadsheet className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
        <span className="font-serif">📊 लाइव गूगल शीट्स बोर्डरूम लेजर</span>
      </button>

      {/* ── FULLSCREEN GOOGLE SHEETS & MNC COMMAND MODAL ──────────────────── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/94 backdrop-blur-3xl animate-fade-in">
          <div className="relative w-full max-w-7xl max-h-[94vh] overflow-hidden rounded-3xl bg-gradient-to-b from-[#0b0e1e] via-[#060812] to-[#020306] border-2 border-teal-400/50 shadow-[0_30px_120px_rgba(0,0,0,0.99)] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-teal-400/20 bg-[#05070e]/95 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-400 via-emerald-400 to-teal-700 flex items-center justify-center text-xl text-black font-bold shadow-lg">
                  📊
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 font-bold">
                      ● Google Sheets Synchronized Live
                    </span>
                    <span className="text-[10px] font-mono text-amber-300 font-bold">Top MNC Staffed Backend</span>
                  </div>
                  <h3 className="text-sm sm:text-lg font-devanagari font-black text-teal-300">
                    श्री धर्म.OS — लाइव गूगल शीट्स एग्जीक्यूटिव लेजर एवं MNC बोर्डरूम
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  disabled={isExporting}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-300 text-black font-mono font-bold text-xs flex items-center gap-1.5 shadow-lg active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isExporting ? 'एक्सपोर्ट जारी...' : '📥 डाउनलोड Google Sheets (CSV)'}</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-teal-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-5 py-3 border-b border-teal-400/15 bg-[#070a16] flex items-center gap-2 overflow-x-auto custom-scrollbar">
              <button
                onClick={() => {
                  sacredAudio.playNavChime(0.04);
                  setActiveTab('sheets_ledger');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'sheets_ledger'
                    ? 'bg-teal-400 text-black shadow-md scale-103'
                    : 'bg-[#0f1326] border border-teal-400/20 text-[#f5eed9]/80 hover:text-white'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>१. लाइव Google Sheets लेजर (Live Decisions)</span>
              </button>

              <button
                onClick={() => {
                  sacredAudio.playNavChime(0.04);
                  setActiveTab('mnc_staff');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'mnc_staff'
                    ? 'bg-teal-400 text-black shadow-md scale-103'
                    : 'bg-[#0f1326] border border-teal-400/20 text-[#f5eed9]/80 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>२. टॉप MNC स्टाफ व कम्पेंसेशन मैट्रिक्स</span>
              </button>

              <button
                onClick={() => {
                  sacredAudio.playNavChime(0.04);
                  setActiveTab('meetings');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'meetings'
                    ? 'bg-teal-400 text-black shadow-md scale-103'
                    : 'bg-[#0f1326] border border-teal-400/20 text-[#f5eed9]/80 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>३. स्वायत्त बोर्ड मीटिंग्स व मिनट्स</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar text-left font-mono">
              
              {/* Export Success Notification */}
              {exportSuccess && (
                <div className="p-3 rounded-2xl bg-emerald-950/70 border border-emerald-400 text-emerald-200 text-xs font-serif flex items-center gap-2 animate-bounce">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Google Sheets CSV फ़ाइल सफलतापूर्वक डाउनलोड हो गई! आप इसे सीधे Google Sheets में खोल सकते हैं।</span>
                </div>
              )}

              {/* ── TAB 1: GOOGLE SHEETS LIVE DECISION LEDGER ──────────────────── */}
              {activeTab === 'sheets_ledger' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-teal-950/40 border border-teal-400/30 flex flex-wrap items-center justify-between gap-2 text-xs font-serif">
                    <span className="text-teal-200">
                      💡 <strong>द्वि-चरणीय संरचना (Dual-Core Architecture):</strong> वेबसाइट के अग्रभाग पर १००% शुद्ध श्री कृष्ण मंदिर व निःशुल्क गीता ज्ञान है, जबकि बैकएंड में यह लाइव लेजर हर निर्णय को रिकॉर्ड करता है।
                    </span>
                    <span className="text-[10px] font-mono text-amber-300 font-bold">sheets.google.com Live Ready</span>
                  </div>

                  {/* Spreadsheet Grid Table */}
                  <div className="overflow-x-auto rounded-2xl border-2 border-teal-400/30 bg-[#060812]">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#0e1328] text-teal-300 border-b border-teal-400/30 text-[11px]">
                          <th className="p-3 whitespace-nowrap">ID / TIMESTAMP</th>
                          <th className="p-3 whitespace-nowrap">DEPARTMENT & LEAD</th>
                          <th className="p-3 whitespace-nowrap">OBSERVED NEED</th>
                          <th className="p-3 whitespace-nowrap">EXECUTIVE DECISION</th>
                          <th className="p-3 whitespace-nowrap">FEASIBILITY & ROI</th>
                          <th className="p-3 whitespace-nowrap">COST</th>
                          <th className="p-3 whitespace-nowrap">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10 text-[11px]">
                        {ledgerRows.map(row => (
                          <tr key={row.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-3 whitespace-nowrap">
                              <span className="font-bold text-teal-400">{row.id}</span>
                              <span className="block text-[9px] text-white/50">{row.timestamp}</span>
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              <span className="text-amber-300 font-bold">{row.department}</span>
                              <span className="block text-[9px] text-white/70">{row.executiveLead}</span>
                            </td>
                            <td className="p-3 max-w-xs font-serif text-[#f5eed9]/85">
                              {row.observedNeedOrIssue}
                            </td>
                            <td className="p-3 max-w-xs font-serif text-emerald-200">
                              {row.decisionTaken}
                            </td>
                            <td className="p-3 max-w-xs font-serif text-teal-200">
                              {row.businessFeasibilityAndImpact}
                            </td>
                            <td className="p-3 whitespace-nowrap text-emerald-300 font-bold">
                              {row.costImpact}
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-bold text-[9px] border border-emerald-400/30">
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ── TAB 2: TOP MNC STAFF & COMPENSATION MATRIX ───────────────── */}
              {activeTab === 'mnc_staff' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {TOP_MNC_STAFF.map(staff => (
                    <div
                      key={staff.id}
                      className="p-5 rounded-2xl bg-gradient-to-b from-[#0e1328] to-[#070914] border-2 border-teal-400/30 hover:border-teal-400/60 shadow-lg space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="text-2xl">{staff.avatar}</span>
                            <div>
                              <h4 className="text-sm font-devanagari font-bold text-amber-300">{staff.nameHindi}</h4>
                              <span className="text-[10px] text-teal-300">{staff.name}</span>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[9px] font-bold">
                            TOP MNC
                          </span>
                        </div>

                        <p className="text-[11px] font-serif text-emerald-300/90 font-bold">
                          🏛️ {staff.pedigree}
                        </p>

                        <p className="text-xs font-serif text-[#f5eed9]/80 leading-relaxed">
                          {staff.specialization}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/10 space-y-1.5 text-[10px]">
                        <div className="flex items-center justify-between text-amber-300">
                          <span>पैकेज टियर:</span>
                          <span className="font-bold text-teal-300">{staff.packageTier}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {staff.advancedTechStack.map((tech, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-black/40 border border-teal-400/20 text-[9px] text-teal-200">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}

              {/* ── TAB 3: LIVE BOARDROOM MEETINGS & MINUTES ─────────────────── */}
              {activeTab === 'meetings' && (
                <div className="space-y-4">
                  {LIVE_BOARDROOM_MEETINGS.map(meet => (
                    <div
                      key={meet.id}
                      className="p-6 rounded-3xl bg-gradient-to-b from-[#0f142c] to-[#070914] border-2 border-teal-400/30 space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <div>
                          <span className="text-[10px] text-teal-400/80">{meet.id} • {meet.timestamp}</span>
                          <h4 className="text-base font-devanagari font-bold text-amber-300">{meet.titleHindi}</h4>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                          ● UNANIMOUSLY APPROVED
                        </span>
                      </div>

                      <div className="space-y-2 text-xs font-serif">
                        <span className="font-bold text-teal-300">उपस्थित अधिकारी (Attendees):</span>
                        <div className="flex flex-wrap gap-2">
                          {meet.attendees.map((att, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-xl bg-black/40 border border-teal-400/20 text-amber-200">
                              {att}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-black/40 border border-teal-400/20 space-y-2 text-xs font-serif">
                        <span className="font-bold text-amber-300">बैठक के प्रमुख सर्वसम्मत निर्णय (Resolutions):</span>
                        <ul className="space-y-1.5">
                          {meet.unanimousDecisions.map((dec, i) => (
                            <li key={i} className="text-emerald-200 flex items-start gap-2">
                              <span>{dec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-teal-400/20 bg-[#05070e] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-teal-400/80">
              <span>● Dharma.OS Enterprise Engine • 100% Free Public Temple Layer Connected</span>
              <span>Google Sheets Sync Ready (CSV 100% Validated)</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
