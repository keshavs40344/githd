'use client';

import React, { useState } from 'react';
import { 
  BookOpen, HeartHandshake, Sparkles, MessageSquare, 
  HelpCircle, Compass, Flame, ArrowRight
} from 'lucide-react';
import ChapterEpisodeGrid from '@/components/ChapterEpisodeGrid';
import EmotionalSanctuary from '@/components/EmotionalSanctuary';
import SacredJapaMala from '@/components/SacredJapaMala';
import KrishnaAIMentor from '@/components/KrishnaAIMentor';
import WhyChooseDharmaOS from '@/components/WhyChooseDharmaOS';
import { sacredAudio } from '@/lib/sacredSounds';

interface MasterDharmaHubProps {
  verses?: any[];
}

export default function MasterDharmaHub({ verses }: MasterDharmaHubProps) {
  const [activeHubTab, setActiveHubTab] = useState<'scripture' | 'healer' | 'sadhana' | 'mentor' | 'why'>('scripture');

  const HUB_TABS = [
    {
      id: 'scripture',
      label: '१८ अध्याय व श्लोक',
      sublabel: '700 Verses & Chapters',
      icon: '📖'
    },
    {
      id: 'healer',
      label: 'मानसिक शांति व हीलर',
      sublabel: 'Emotional Crisis Sanctuary',
      icon: '❤️'
    },
    {
      id: 'sadhana',
      label: '१०८ जप माला व साधना',
      sublabel: 'Daily Habit & Streak',
      icon: '✨'
    },
    {
      id: 'mentor',
      label: 'कृष्ण AI मेंटर',
      sublabel: 'Direct Krishna Dialogue',
      icon: '💬'
    },
    {
      id: 'why',
      label: 'क्यों चुनें Dharma.OS?',
      sublabel: 'Why Us vs Google / AI',
      icon: '🪔'
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-32">
      
      {/* ── TOP GRAND SACRED NAVIGATION HUB TABS ───────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 bg-[#0d0f19]/90 backdrop-blur-2xl p-3 sm:p-4 rounded-3xl border-2 border-[#c5a059]/30 shadow-2xl">
        {HUB_TABS.map(tab => {
          const isSelected = activeHubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveHubTab(tab.id as any);
                sacredAudio.playNavChime(0.06);
              }}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1 ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black border-yellow-200 font-bold shadow-[0_4px_20px_rgba(245,158,11,0.4)] scale-102'
                  : 'bg-[#141624]/90 text-[#e6c687] border-[#c5a059]/20 hover:border-[#c5a059] hover:bg-[#1a1e33]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{tab.icon}</span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-black" />}
              </div>
              <span className="text-xs font-devanagari font-bold block truncate">
                {tab.label}
              </span>
              <span className={`text-[10px] block truncate ${isSelected ? 'text-black/80' : 'text-[#c5a059]/70'}`}>
                {tab.sublabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── ACTIVE HUB TAB CONTENT ─────────────────────────────────────────── */}
      <div className="animate-fade-in">
        {activeHubTab === 'scripture' && (
          <div className="space-y-8">
            <ChapterEpisodeGrid />
            <div className="pt-6">
              <WhyChooseDharmaOS />
            </div>
          </div>
        )}

        {activeHubTab === 'healer' && (
          <div className="max-w-4xl mx-auto">
            <EmotionalSanctuary />
          </div>
        )}

        {activeHubTab === 'sadhana' && (
          <div className="max-w-4xl mx-auto">
            <SacredJapaMala />
          </div>
        )}

        {activeHubTab === 'mentor' && (
          <div className="max-w-4xl mx-auto">
            <KrishnaAIMentor />
          </div>
        )}

        {activeHubTab === 'why' && (
          <div className="max-w-5xl mx-auto">
            <WhyChooseDharmaOS />
          </div>
        )}
      </div>

    </div>
  );
}
