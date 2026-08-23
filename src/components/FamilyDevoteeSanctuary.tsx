'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Radio, Play, Pause, Heart, Sparkles, Sun, Moon, 
  Baby, Users, Volume2, ShieldCheck, Check, ArrowRight, Flame
} from 'lucide-react';
import { sacredAudio } from '@/lib/sacredSounds';
import { useGlobalAudio } from '@/context/GlobalAudioContext';

const FAMILY_RITUALS = [
  {
    id: 'morning',
    title: 'प्रातःकाल ५ मिनट पारिवारिक गीता पाठ (Morning Sanskar)',
    time: 'प्रातः ५:०० - ८:०० बजे',
    icon: '☀️',
    desc: 'दिन की शुरुआत सकारात्मक ऊर्जा, कर्मयोग सूत्र और आत्म-विश्वास के साथ करें।',
    verses: [
      { chapter: 2, verse: 47, label: 'कर्मण्येवाधिकारस्ते (कर्तव्य निष्ठा)' },
      { chapter: 4, verse: 38, label: 'न हि ज्ञानेन सदृशं (ज्ञान की पवित्रता)' },
      { chapter: 6, verse: 5, label: 'उद्धरेदात्मनात्मानं (आत्म-उत्थान)' }
    ]
  },
  {
    id: 'evening',
    title: 'संध्याकालीन मानसिक शांति व ध्यान (Evening Calm)',
    time: 'सायं ६:०० - ८:०० बजे',
    icon: '🪔',
    desc: 'दिन भर की थकान, तनाव और चिंताओं को श्रीकृष्ण के चरणों में समर्पित करें।',
    verses: [
      { chapter: 2, verse: 14, label: 'मात्रास्पर्शास्तु कौन्तेय (सहनशीलता)' },
      { chapter: 9, verse: 22, label: 'अनन्याश्चिन्तयन्तो मां (भगवान का संरक्षण)' },
      { chapter: 18, verse: 66, label: 'सर्वधर्मान्परित्यज्य (पूर्ण शरणागति)' }
    ]
  },
  {
    id: 'kids',
    title: 'बाल संस्कार व युवा प्रेरणा (Kids & Youth Moral Wisdom)',
    time: 'विद्यार्थी एवं युवा वर्ग',
    icon: '🌱',
    desc: 'एकाग्रता, परीक्षा का भय दूर करना, क्रोध नियंत्रण और चरित्र निर्माण।',
    verses: [
      { chapter: 6, verse: 35, label: 'अभ्यासेन तु कौन्तेय (एकाग्रता की कुंजी)' },
      { chapter: 2, verse: 62, label: 'ध्यायतो विषयान्पुंसः (इंद्रिय संयम)' },
      { chapter: 16, verse: 1, label: 'अभयं सत्त्वसंशुद्धिः (निर्भयता व सत्य)' }
    ]
  },
  {
    id: 'night',
    title: 'रात्रि विश्राम व कृष्ण मुरली अमृत (Bedtime Deep Sleep)',
    time: 'रात्रि ९:०० बजे के बाद',
    icon: '🌙',
    desc: '४३२Hz दिव्य बांसुरी धुन व शांत श्लोक पाठ, अनिद्रा व बेचैनी से मुक्ति।',
    verses: [
      { chapter: 8, verse: 5, label: 'अन्तकाले च मामेव (शांतिदायक स्मरण)' },
      { chapter: 12, verse: 15, label: 'यस्मान्नोद्विजते लोको (भयमुक्त मन)' },
      { chapter: 15, verse: 15, label: 'सर्वस्य चाहं हृदि सन्निविष्टो (परम चेतना)' }
    ]
  }
];

export default function FamilyDevoteeSanctuary() {
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = useGlobalAudio();
  const [activeRitual, setActiveRitual] = useState<'morning' | 'evening' | 'kids' | 'night'>('morning');
  const [isPlayingFluteRadio, setIsPlayingFluteRadio] = useState(false);

  const selectedRitualData = FAMILY_RITUALS.find(r => r.id === activeRitual) || FAMILY_RITUALS[0];

  const handleToggleRadio = () => {
    sacredAudio.playFluteChime(0.4);
    setIsPlayingFluteRadio(!isPlayingFluteRadio);
    if (!isPlayingFluteRadio) {
      playTrack(2, 47, 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन', '२४x७ अखंड गीता रसामृत व दिव्य मुरली नाद');
    } else {
      togglePlayPause();
    }
  };

  return (
    <div className="rounded-3xl bg-gradient-to-b from-[#141624]/95 via-[#0d0f19]/95 to-[#090a12]/95 backdrop-blur-2xl border-2 border-amber-400/40 p-5 sm:p-8 shadow-2xl space-y-6">
      
      {/* ── HEADER: PURE AD-FREE PROMISE ─────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#090b14]/90 p-5 sm:p-6 rounded-3xl border border-[#c5a059]/30">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-serif">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>प्रामाणिक व शुद्ध ज्ञान • सुरक्षित पारिवारिक वातावरण • शून्य भटकाव</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-devanagari font-bold text-[#f5eed9]">
            परिवार एवं भक्त कल्याण <span className="text-amber-400">मण्डल</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#f5eed9]/80 font-serif max-w-xl leading-relaxed">
            YouTube के विज्ञापनों, फालतू वीडियो और भटकाव से दूर — आपके घर, बच्चों और बुजुर्गों के लिए विशुद्ध पावन गीता रसामृत और दैनिक संस्कार।
          </p>
        </div>

        {/* 24/7 Akhanda Radio Pill */}
        <div className="shrink-0 flex flex-col items-center gap-2">
          <button
            onClick={handleToggleRadio}
            className={`px-6 py-3.5 rounded-2xl font-serif font-bold text-xs sm:text-sm flex items-center gap-2.5 shadow-2xl transition-all cursor-pointer hover:scale-102 ${
              isPlayingFluteRadio
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-black border border-white'
                : 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black border border-yellow-200'
            }`}
          >
            <Radio className={`w-4 h-4 ${isPlayingFluteRadio ? 'animate-pulse' : ''}`} />
            <span>{isPlayingFluteRadio ? 'अखंड रसामृत बज रहा है (Pause)' : '२४x७ अखंड गीता व मुरली धुन (Play)'}</span>
          </button>
          <span className="text-[10px] font-mono text-[#c5a059]/70">Pure Focus • High-Fidelity 432Hz Sound</span>
        </div>
      </div>

      {/* ── 4 FAMILY RITUAL TABS ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {FAMILY_RITUALS.map(r => {
          const isSelected = activeRitual === r.id;
          return (
            <button
              key={r.id}
              onClick={() => {
                setActiveRitual(r.id as any);
                sacredAudio.playNavChime(0.06);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                isSelected
                  ? 'bg-amber-400 text-black border-yellow-200 font-bold shadow-lg scale-102'
                  : 'bg-[#141624] text-[#e6c687] border-[#c5a059]/20 hover:border-amber-400 hover:bg-[#1a1e33]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{r.icon}</span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-black" />}
              </div>
              <span className="text-xs font-devanagari font-bold block leading-tight">
                {r.title.split('(')[0]}
              </span>
              <span className={`text-[10px] font-mono block ${isSelected ? 'text-black/80' : 'text-[#c5a059]/70'}`}>
                {r.time}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── ACTIVE RITUAL CARD ────────────────────────────────────────────── */}
      <div className="p-5 sm:p-7 rounded-3xl bg-[#090b14]/95 border-2 border-[#c5a059]/30 shadow-xl space-y-5 animate-fade-in">
        
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{selectedRitualData.icon}</span>
            <h3 className="text-base sm:text-lg font-devanagari font-bold text-[#f5eed9]">
              {selectedRitualData.title}
            </h3>
          </div>
          <p className="text-xs font-serif text-[#c5a059] italic">
            {selectedRitualData.desc}
          </p>
        </div>

        {/* 3 Prescribed Shlokas for this Ritual */}
        <div className="space-y-3">
          <span className="text-xs font-serif font-bold text-[#e6c687] block">
            नित्य पाठ के लिए निर्धारित विशेष श्लोक:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {selectedRitualData.verses.map((v, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#141624] border border-[#c5a059]/20 hover:border-amber-400 flex flex-col justify-between space-y-2 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                      अध्याय {v.chapter}.{v.verse}
                    </span>
                    <Flame className="w-3 h-3 text-amber-400/50 group-hover:text-amber-400" />
                  </div>
                  <p className="text-xs font-devanagari font-bold text-[#f5eed9] mt-2 group-hover:text-amber-300 transition-colors">
                    {v.label}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#c5a059]/15 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      playTrack(v.chapter, v.verse, v.label, 'पारिवारिक नित्य पाठ');
                      sacredAudio.playNavChime(0.08);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#090b14] hover:bg-amber-500 hover:text-black border border-[#c5a059]/30 text-[11px] font-serif text-[#e6c687] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>स्वर सुनें</span>
                  </button>

                  <Link
                    href={`/chapter/${v.chapter}/${v.verse}`}
                    onClick={() => sacredAudio.playTempleBell(0.2)}
                    className="text-[11px] text-[#c5a059] hover:text-white font-serif flex items-center gap-0.5"
                  >
                    <span>पाठ खोलें</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
