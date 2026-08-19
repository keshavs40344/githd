'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface MindfulBreathworkProps {
  techniqueName: string;
  instructionText: string;
}

export default function MindfulBreathwork({ techniqueName, instructionText }: MindfulBreathworkProps) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState(0); // 0: Inhale, 1: Hold, 2: Exhale, 3: Hold

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setPhase((prev) => (prev + 1) % 4);
      }, 4000);
    }
    
    return () => clearInterval(interval);
  }, [isActive]);

  const toggleBreathwork = () => {
    if (!isActive) {
      setPhase(0); // Start at inhale
    }
    setIsActive(!isActive);
  };

  const getPhaseText = () => {
    switch (phase) {
      case 0: return 'श्वास अंदर लें... / Inhale...';
      case 1: return 'श्वास रोकें... / Hold...';
      case 2: return 'श्वास छोड़ें... / Exhale...';
      case 3: return 'मौन में ठहरें... / Stillness...';
      default: return '';
    }
  };

  const getPhaseScale = () => {
    if (!isActive) return 'scale-100';
    switch (phase) {
      case 0: return 'scale-150'; // Expand
      case 1: return 'scale-150'; // Hold expanded
      case 2: return 'scale-100'; // Contract
      case 3: return 'scale-100'; // Hold contracted
      default: return 'scale-100';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-zinc-900/80 rounded-xl border border-yellow-700/30">
      <h3 className="text-xl font-medium text-amber-500 mb-2">{techniqueName}</h3>
      <p className="text-zinc-400 text-sm mb-8 text-center">{instructionText}</p>
      
      <div className="relative w-48 h-48 flex items-center justify-center mb-8">
        <div 
          className={`absolute inset-0 rounded-full border-2 border-amber-600/40 bg-amber-500/10 transition-transform duration-[4000ms] ease-in-out ${getPhaseScale()}`}
        />
        <div className="absolute inset-4 rounded-full border border-amber-500/30" />
        <div className="absolute inset-8 rounded-full border border-amber-400/20" />
        
        <div className="z-10 text-center">
          <p className="text-amber-300 font-medium whitespace-pre-line">
            {isActive ? getPhaseText() : 'Ready'}
          </p>
        </div>
      </div>
      
      <button 
        onClick={toggleBreathwork}
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-500 text-black font-semibold transition-colors"
      >
        {isActive ? (
          <>
            <Pause size={18} />
            <span>Pause Breathwork</span>
          </>
        ) : (
          <>
            <Play size={18} />
            <span>Start Breathwork</span>
          </>
        )}
      </button>
    </div>
  );
}
