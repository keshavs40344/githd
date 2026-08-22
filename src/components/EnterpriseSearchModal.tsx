'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, Sparkles, ArrowRight, X, BookOpen, Flame, 
  Heart, Compass, Brain, Shield, Crosshair, HelpCircle 
} from 'lucide-react';
import { useGlobalAudio } from '@/context/GlobalAudioContext';
import { CHAPTERS } from '@/types/verse';
import { sacredAudio } from '@/lib/sacredSounds';

interface CrisisTopic {
  id: string;
  title: string;
  emoji: string;
  category: string;
  targetChapter: number;
  targetVerse: number;
  description: string;
}

const CRISIS_TOPICS: CrisisTopic[] = [
  {
    id: 'anger',
    title: 'क्रोध व मानसिक असंतुलन (Anger & Rage)',
    emoji: '🔥',
    category: 'भावनात्मक नियंत्रण',
    targetChapter: 2,
    targetVerse: 63,
    description: 'क्रोधाद्भवति संमोहः संमोहात्स्मृतिविभ्रमः — क्रोध से सम्मोह और बुद्धि का विनाश होता है।'
  },
  {
    id: 'depression',
    title: 'उदासी, अवसाद व विषाद (Depression & Grief)',
    emoji: '🌧️',
    category: 'मानसिक शांति',
    targetChapter: 2,
    targetVerse: 14,
    description: 'मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः — सुख-दुःख अनित्य हैं, उन्हें सहन करना सीखो।'
  },
  {
    id: 'career_anxiety',
    title: 'कर्म, परिणाम व भविष्य का भय (Career & Outcome Anxiety)',
    emoji: '🎯',
    category: 'कर्म योग',
    targetChapter: 2,
    targetVerse: 47,
    description: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन — तुम्हारा अधिकार केवल कर्म में है, फल में कभी नहीं।'
  },
  {
    id: 'mind_focus',
    title: 'मन की चंचलता व भटकाव (Focus & Mind Wandering)',
    emoji: '🧘',
    category: 'ध्यान योग',
    targetChapter: 6,
    targetVerse: 35,
    description: 'अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते — नियमित अभ्यास और वैराग्य से मन वश में होता है।'
  },
  {
    id: 'confidence',
    title: 'आत्मविश्वास की कमी व संशय (Low Confidence & Doubt)',
    emoji: '⚡',
    category: 'आत्म-शक्ति',
    targetChapter: 4,
    targetVerse: 40,
    description: 'संशयात्मा विनश्यति — संशय से मुक्त होकर ज्ञान रूपी खड्ग से संशय को काटो।'
  },
  {
    id: 'fear_surrender',
    title: 'परम सुरक्षा व आत्म-समर्पण (Fear & Divine Surrender)',
    emoji: '🪔',
    category: 'मोक्ष योग',
    targetChapter: 18,
    targetVerse: 66,
    description: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज — सम्पूर्ण चिंताओं को छोड़कर मेरी शरण में आओ, मैं मुक्त करूँगा।'
  },
  {
    id: 'duty_indecision',
    title: 'कर्तव्य व अनिर्णय का द्वंद्व (Indecision & Conflict)',
    emoji: '⚖️',
    category: 'धर्म पथ',
    targetChapter: 3,
    targetVerse: 35,
    description: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् — दूसरों के श्रेष्ठ धर्म से अपना स्वधर्म ही उत्तम है।'
  },
  {
    id: 'greed_desire',
    title: 'लोभ, वासना व वासनाओं का जाल (Greed & Attachment)',
    emoji: '⛓️',
    category: 'विवेक',
    targetChapter: 16,
    targetVerse: 21,
    description: 'त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः — काम, क्रोध और लोभ आत्मा के पतन के तीन द्वार हैं।'
  }
];

export default function EnterpriseSearchModal() {
  const router = useRouter();
  const { isSearchModalOpen, setIsSearchModalOpen, playTrack } = useGlobalAudio();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const filteredTopics = CRISIS_TOPICS.filter(t => 
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.description.toLowerCase().includes(query.toLowerCase()) ||
    t.category.toLowerCase().includes(query.toLowerCase()) ||
    `${t.targetChapter}.${t.targetVerse}`.includes(query.trim())
  );

  const handleSelect = (topic: CrisisTopic) => {
    sacredAudio.playTempleBell(0.3);
    setIsSearchModalOpen(false);
    router.push(`/chapter/${topic.targetChapter}/${topic.targetVerse}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-[#0d0f1a] border-2 border-[#c5a059]/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Search Input */}
        <div className="relative p-4 sm:p-5 border-b border-[#c5a059]/20 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#c5a059]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="अपनी समस्या, भाव या श्लोक खोजें (उदा. क्रोध, डिप्रेशन, 2.47)..."
            className="w-full bg-transparent text-sm sm:text-base font-serif text-[#f5eed9] placeholder-[#c5a059]/50 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-[#c5a059]/60 hover:text-[#f5eed9]">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1.5 rounded-xl bg-[#141624] text-[#c5a059] hover:text-[#f5eed9] border border-[#c5a059]/30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-3 bg-[#111322] border-b border-[#c5a059]/15 flex items-center gap-2 overflow-x-auto custom-scrollbar">
          <span className="text-[11px] font-serif text-[#c5a059]/70 shrink-0">लोकप्रिय समाधान:</span>
          {['क्रोध', 'डिप्रेशन', 'करियर', 'एकाग्रता', '2.47', '18.66'].map(term => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-0.5 rounded-lg bg-[#181b2e] hover:bg-[#c5a059] hover:text-black border border-[#c5a059]/25 text-[11px] font-serif text-[#e6c687] shrink-0 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="p-3 sm:p-5 overflow-y-auto space-y-3 flex-1 custom-scrollbar">
          {filteredTopics.length > 0 ? (
            filteredTopics.map(topic => (
              <div
                key={topic.id}
                onClick={() => handleSelect(topic)}
                className="group p-3.5 sm:p-4 rounded-2xl bg-[#131626] hover:bg-[#1c2038] border border-[#c5a059]/20 hover:border-[#c5a059] transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 shadow-md hover:-translate-y-0.5"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{topic.emoji}</span>
                    <h4 className="text-sm font-devanagari font-bold text-[#f5eed9] group-hover:text-[#e6c687] transition-colors truncate">
                      {topic.title}
                    </h4>
                    <span className="px-2 py-0.5 rounded-md bg-[#090b14] border border-[#c5a059]/30 text-[10px] font-mono text-amber-300">
                      श्लोक {topic.targetChapter}.{topic.targetVerse}
                    </span>
                  </div>
                  <p className="text-xs text-[#c5a059]/80 font-serif line-clamp-1">
                    {topic.description}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-xl bg-[#c5a059]/15 group-hover:bg-[#c5a059] group-hover:text-black text-[#e6c687] flex items-center justify-center shrink-0 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 space-y-2">
              <p className="text-sm font-serif text-[#c5a059]">
                कोई परिणाम नहीं मिला। कृपया दूसरा शब्द या श्लोक संख्या खोजें।
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#0a0c16] border-t border-[#c5a059]/15 text-center">
          <span className="text-[11px] font-mono text-[#c5a059]/60">
            Tip: Press <kbd className="px-1 py-0.5 rounded bg-[#141624] border border-[#c5a059]/30 text-[10px]">Ctrl+K</kbd> to open search anywhere
          </span>
        </div>

      </div>
    </div>
  );
}
