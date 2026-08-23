'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sparkles, Search, Radio, Heart, MessageSquare, 
  BookOpen, Download, Compass, ShieldCheck, Server 
} from 'lucide-react';
import { sacredAudio } from '@/lib/sacredSounds';
import { useGlobalAudio } from '@/context/GlobalAudioContext';
import LiveOnlineRadioModal from '@/components/LiveOnlineRadioModal';
import IskconDevoteeSanctuaryModal from '@/components/IskconDevoteeSanctuaryModal';
import LiveServerMasterModal from '@/components/LiveServerMasterModal';

export default function GlobalRoyalHeader() {
  const [isRadioModalOpen, setIsRadioModalOpen] = useState(false);
  const [isServerModalOpen, setIsServerModalOpen] = useState(false);
  const [omClickCount, setOmClickCount] = useState(0);

  const pathname = usePathname();
  const { setIsSearchModalOpen } = useGlobalAudio();

  // Keyboard shortcut Ctrl+Shift+S for Server Control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        setIsServerModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenRadio = () => {
    sacredAudio.playTripleGhanta(0.6);
    setIsRadioModalOpen(true);
  };

  const handleOpenServer = () => {
    setIsServerModalOpen(true);
  };

  // Secret Triple Click on Om logo to open server
  const handleOmClick = () => {
    const newCount = omClickCount + 1;
    setOmClickCount(newCount);
    if (newCount >= 3) {
      setIsServerModalOpen(true);
      setOmClickCount(0);
    }
    setTimeout(() => setOmClickCount(0), 1500);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#07080d]/95 backdrop-blur-2xl border-b border-[#c5a059]/25 px-3 sm:px-6 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)] transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* ── LOGO & BRANDING ───────────────────────────────────────────── */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={handleOmClick}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#c5a059] to-amber-700 p-0.5 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105 transition-all flex items-center justify-center cursor-pointer"
              title="श्री राधा-कृष्ण महामन्दिर (३-क्लिक मास्टर सर्वर)"
            >
              <span className="font-devanagari font-bold text-lg sm:text-xl text-[#07080d]">ॐ</span>
            </button>
            <Link href="/" className="group cursor-pointer">
              <span className="font-serif font-bold text-sm sm:text-base tracking-wider text-[#f5eed9] group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                <span>श्री राधा-कृष्ण महामन्दिर</span>
                <span className="text-amber-400 text-xs font-mono">Dharma.OS</span>
              </span>
              <span className="block text-[10px] font-devanagari text-[#c5a059]/80 -mt-0.5">
                श्रीमद्भगवद्गीता सनातन ज्ञान पीठ
              </span>
            </Link>
          </div>

          {/* ── CENTER SACRED NAVIGATION ─────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#0f111c]/90 border border-[#c5a059]/25 p-1 rounded-2xl">
            <Link
              href="/#scripture"
              className={`px-3 py-1.5 rounded-xl text-xs font-serif transition-colors ${
                pathname === '/' ? 'bg-amber-400/20 text-yellow-300 font-bold' : 'text-[#c5a059]/70 hover:text-white'
              }`}
            >
              १८ अध्याय
            </Link>
            <Link
              href="/episodes"
              className={`px-3 py-1.5 rounded-xl text-xs font-serif transition-colors ${
                pathname === '/episodes' ? 'bg-amber-400/20 text-yellow-300 font-bold' : 'text-[#c5a059]/70 hover:text-white'
              }`}
            >
              लीला एपिसोड्स
            </Link>
            <Link
              href="/mentor"
              className={`px-3 py-1.5 rounded-xl text-xs font-serif transition-colors ${
                pathname === '/mentor' ? 'bg-amber-400/20 text-yellow-300 font-bold' : 'text-[#c5a059]/70 hover:text-white'
              }`}
            >
              कृष्ण AI संवाद
            </Link>
            <Link
              href="/studio"
              className={`px-3 py-1.5 rounded-xl text-xs font-serif transition-colors ${
                pathname === '/studio' ? 'bg-amber-400/20 text-yellow-300 font-bold' : 'text-[#c5a059]/70 hover:text-white'
              }`}
            >
              वॉलपेपर स्टूडियो
            </Link>
            
            {/* Live Server Trigger */}
            <button
              onClick={handleOpenServer}
              className="px-3 py-1.5 rounded-xl text-xs font-serif transition-all flex items-center gap-1 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 font-bold cursor-pointer"
              title="लाइव सर्वर कमांड सेंटर एवं साइट कंट्रोलर (Ctrl+Shift+S)"
            >
              <Server className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>🖥️ लाइव सर्वर</span>
            </button>
          </nav>

          {/* ── RIGHT DEVOTIONAL ACTIONS ────────────────────────────────────── */}
          <div className="flex items-center gap-2">
            
            {/* ISKCON Global Sanctuary */}
            <IskconDevoteeSanctuaryModal />

            {/* 24/7 Akhanda Krishna Radio */}
            <button
              onClick={handleOpenRadio}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400/20 via-yellow-400/20 to-amber-500/20 hover:from-amber-400 hover:to-yellow-400 text-yellow-300 hover:text-black border border-amber-400/40 text-xs font-serif font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="२४x७ अखंड कृष्ण भजन व वेणु रेडियो चालू करें"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span className="hidden sm:inline">२४x७ रेडियो</span>
            </button>

            {/* Scripture Search */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 rounded-xl bg-[#0f111c] hover:bg-[#191c2e] border border-[#c5a059]/30 text-[#e6c687] hover:text-yellow-300 transition-all cursor-pointer shadow-sm"
              title="श्लोक एवं अध्याय खोजें (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Mobile Server Icon */}
            <button
              onClick={handleOpenServer}
              className="md:hidden p-2 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 transition-all cursor-pointer"
              title="लाइव सर्वर"
            >
              <Server className="w-4 h-4" />
            </button>

          </div>

        </div>

        {/* 24/7 Radio Modal */}
        <LiveOnlineRadioModal
          isOpen={isRadioModalOpen}
          onClose={() => setIsRadioModalOpen(false)}
        />
      </header>

      {/* Live Server Master Control Modal */}
      <LiveServerMasterModal
        isOpen={isServerModalOpen}
        onClose={() => setIsServerModalOpen(false)}
      />
    </>
  );
}
