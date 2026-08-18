'use client';

import React, { useState, useEffect } from 'react';
import { Award, Sparkles, Flame, CheckCircle2, ChevronRight, X, Shield, Star } from 'lucide-react';

interface RankTier {
  name: string;
  sanskrit: string;
  minXp: number;
  badge: string;
  desc: string;
}

const RANK_TIERS: RankTier[] = [
  { name: 'Curious Seeker', sanskrit: 'जिज्ञासु', minXp: 0, badge: '🌱', desc: 'Beginning the inner quest of self-inquiry.' },
  { name: 'Dedicated Practitioner', sanskrit: 'अभ्यासी', minXp: 150, badge: '🪷', desc: 'Establishing consistency in daily Gita contemplation.' },
  { name: 'Spiritual Aspirant', sanskrit: 'साधक', minXp: 400, badge: '🔥', desc: 'Applying Nishkama Karma in daily career & relationships.' },
  { name: 'Master of Equanimity', sanskrit: 'स्थितप्रज्ञ', minXp: 900, badge: '⚡', desc: 'Unshakable in victory and defeat, joy and sorrow.' },
  { name: 'Beloved of Krishna', sanskrit: 'योगेश्वर प्रिय', minXp: 1800, badge: '👑', desc: 'Living in constant supreme awareness and divine grace.' }
];

export default function DharmaKarmaBadge() {
  const [xp, setXp] = useState(120);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = parseInt(localStorage.getItem('dharma_karma_xp') || '120', 10);
        setXp(saved);

        const handleStorage = () => {
          const updated = parseInt(localStorage.getItem('dharma_karma_xp') || '120', 10);
          setXp(updated);
        };

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
      } catch {}
    }
  }, []);

  // Determine current tier
  let currentTier = RANK_TIERS[0];
  let nextTier = RANK_TIERS[1];
  for (let i = RANK_TIERS.length - 1; i >= 0; i--) {
    if (xp >= RANK_TIERS[i].minXp) {
      currentTier = RANK_TIERS[i];
      nextTier = RANK_TIERS[i + 1] || RANK_TIERS[i];
      break;
    }
  }

  const currentLevelProgress = nextTier.minXp === currentTier.minXp 
    ? 100 
    : Math.min(100, Math.round(((xp - currentTier.minXp) / (nextTier.minXp - currentTier.minXp)) * 100));

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-obsidian-900/90 border border-gold-500/30 hover:border-gold-400/60 shadow-lg backdrop-blur-xl transition-all cursor-pointer group"
      >
        <span className="text-sm">{currentTier.badge}</span>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold font-mono text-gold-200 group-hover:text-gold-100 transition-colors">
              {currentTier.sanskrit}
            </span>
            <span className="text-[9px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded border border-amber-400/30">
              {xp} XP
            </span>
          </div>
          {/* Mini progress bar */}
          <div className="w-16 h-1 bg-obsidian-800 rounded-full overflow-hidden mt-0.5">
            <div 
              style={{ width: `${currentLevelProgress}%` }} 
              className="h-full bg-gradient-to-r from-gold-400 to-amber-500 rounded-full transition-all duration-500" 
            />
          </div>
        </div>
      </button>

      {/* Rank Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-obsidian-900 border border-gold-500/30 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-5 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-obsidian-800 text-obsidian-400 hover:text-gold-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(223,168,55,0.4)]">
                {currentTier.badge}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-gold-100 font-devanagari">
                    {currentTier.sanskrit} ({currentTier.name})
                  </h3>
                </div>
                <p className="text-xs text-gold-400/70 font-mono">
                  Current Spiritual Mastery: {xp} Dharma XP
                </p>
              </div>
            </div>

            {/* Next Level Goal */}
            <div className="p-4 rounded-2xl bg-obsidian-800/80 border border-gold-500/20 space-y-2">
              <div className="flex justify-between text-xs font-mono text-gold-300/80">
                <span>Next Rank: {nextTier.sanskrit}</span>
                <span className="text-gold-400 font-bold">{xp} / {nextTier.minXp} XP</span>
              </div>
              <div className="h-2 w-full bg-obsidian-950 rounded-full overflow-hidden border border-gold-500/20">
                <div 
                  style={{ width: `${currentLevelProgress}%` }} 
                  className="h-full bg-gradient-to-r from-gold-400 to-amber-500 rounded-full transition-all duration-500" 
                />
              </div>
              <p className="text-[11px] text-gold-200/70 font-sans leading-relaxed">
                "{currentTier.desc}"
              </p>
            </div>

            {/* How to Earn XP */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400 font-bold">
                Daily Dharma Quests & XP Rewards
              </h4>
              <div className="space-y-1.5 text-xs font-sans">
                <div className="p-2.5 rounded-xl bg-obsidian-800/50 border border-gold-500/10 flex items-center justify-between">
                  <span className="text-gold-200 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Complete Daily Sadhana</span>
                  </span>
                  <span className="font-mono text-gold-400 font-bold">+50 XP</span>
                </div>
                <div className="p-2.5 rounded-xl bg-obsidian-800/50 border border-gold-500/10 flex items-center justify-between">
                  <span className="text-gold-200 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Consult Krishna AI on a Dilemma</span>
                  </span>
                  <span className="font-mono text-gold-400 font-bold">+50 XP</span>
                </div>
                <div className="p-2.5 rounded-xl bg-obsidian-800/50 border border-gold-500/10 flex items-center justify-between">
                  <span className="text-gold-200 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Master an Episode & Mark Done</span>
                  </span>
                  <span className="font-mono text-gold-400 font-bold">+100 XP</span>
                </div>
                <div className="p-2.5 rounded-xl bg-obsidian-800/50 border border-gold-500/10 flex items-center justify-between">
                  <span className="text-gold-200 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Generate AI Shloka Wallpaper</span>
                  </span>
                  <span className="font-mono text-gold-400 font-bold">+30 XP</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-obsidian-950 font-bold font-mono text-xs cursor-pointer shadow-lg"
              >
                Continue Sadhana
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
