'use client';

import React, { useState } from 'react';
import type { Episode } from '@/types/episode';
import { X, CheckCircle, Circle, Play, Pause, Sparkles, BookOpen, Compass, Heart, ArrowRight, Volume2 } from 'lucide-react';
import { Button } from './ui/Button';
import Link from 'next/link';

interface EpisodeDetailModalProps {
  episode: Episode;
  isCompleted: boolean;
  onToggleComplete: (id: number) => void;
  onClose: () => void;
  onPlayTune: (episode: Episode) => void;
  isPlayingTune: boolean;
}

export default function EpisodeDetailModal({
  episode,
  isCompleted,
  onToggleComplete,
  onClose,
  onPlayTune,
  isPlayingTune,
}: EpisodeDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'explanation' | 'krishna_counsel' | 'shloka' | 'practice'>('explanation');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-obsidian-900 border border-gold-500/30 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative">
        
        {/* Hero Header with Artwork */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden flex-shrink-0 bg-obsidian-950">
          <img 
            src={episode.image_url} 
            alt={episode.title_en}
            className="w-full h-full object-cover opacity-40 scale-105 transition-transform duration-700 hover:scale-100" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/60 to-transparent" />
          
          {/* Close & Action Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={() => onToggleComplete(episode.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isCompleted 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-[0_0_12px_rgba(16,185,129,0.3)]' 
                  : 'bg-obsidian-800/90 text-gold-300 border border-gold-500/30 hover:border-gold-400'
              }`}
            >
              {isCompleted ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Circle className="w-3.5 h-3.5" />}
              <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
            </button>

            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-obsidian-800/80 hover:bg-obsidian-700 text-obsidian-300 hover:text-gold-200 transition-colors border border-gold-500/20 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-5 right-5 z-10">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/40 uppercase tracking-widest">
                Chapter {episode.chapter} • Episode {episode.id}
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-obsidian-800/80 text-gold-400/80 border border-gold-500/20">
                {episode.theme}
              </span>
              <span className="text-[10px] font-mono text-gold-400/60">
                {episode.shloka_count} Shlokas • ~{episode.duration_mins} mins
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-gold-100 font-devanagari leading-snug">
              {episode.title_devanagari}
            </h2>
            <p className="text-xs sm:text-sm text-gold-300/80 font-sans line-clamp-1">
              {episode.title_en}
            </p>
          </div>
        </div>

        {/* Tune & Audio Bar */}
        <div className="bg-obsidian-950/80 border-y border-gold-500/15 px-5 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onPlayTune(episode)}
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 flex items-center justify-center text-obsidian-950 font-bold shadow-[0_0_12px_rgba(223,168,55,0.3)] transition-all cursor-pointer"
            >
              {isPlayingTune ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
            </button>
            <div>
              <p className="text-xs font-bold text-gold-200 flex items-center gap-1.5 font-mono">
                <Volume2 className="w-3.5 h-3.5 text-gold-400" />
                <span>{episode.raga_tune}</span>
              </p>
              <p className="text-[10px] text-gold-400/60 font-mono">
                {episode.tune_freq} Hz Sacred Drone & Flute Resonance
              </p>
            </div>
          </div>

          <Link
            href={`/mentor?query=${encodeURIComponent(`I want Shri Krishna's divine guidance on Chapter ${episode.chapter} (${episode.title_en}): ${episode.subtitle}`)}`}
            className="text-xs font-mono text-gold-400 hover:text-gold-200 flex items-center gap-1 bg-obsidian-800/80 px-3 py-1.5 rounded-xl border border-gold-500/20 hover:border-gold-400/40 transition-all cursor-pointer"
          >
            <span>Consult Krishna</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gold-500/15 px-5 bg-obsidian-900/90 overflow-x-auto custom-scrollbar">
          {[
            { key: 'explanation', label: '📖 Full Explanation' },
            { key: 'krishna_counsel', label: '🪔 Shri Krishna Uvacha' },
            { key: 'shloka', label: '📜 Core Shloka' },
            { key: 'practice', label: '🧘 Contemplation & Pranayama' },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as typeof activeTab)}
              className={`px-4 py-3 text-xs font-mono transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === t.key
                  ? 'border-gold-400 text-gold-200 font-bold bg-gold-400/5'
                  : 'border-transparent text-gold-400/60 hover:text-gold-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 bg-obsidian-900/60">
          
          {/* TAB 1: Explanation */}
          {activeTab === 'explanation' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-obsidian-800/80 border border-gold-500/20">
                <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400 font-bold mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-gold-400" />
                  <span>The Context of Kurukshetra</span>
                </h4>
                <p className="text-sm text-gold-100/90 leading-relaxed font-sans">
                  {episode.summary}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-obsidian-800/60 border border-gold-500/15">
                <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400 font-bold mb-1.5 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-gold-400" />
                  <span>Modern Life Application</span>
                </h4>
                <p className="text-sm text-gold-200/90 leading-relaxed font-sans">
                  {episode.life_application}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Shri Krishna Uvacha */}
          {activeTab === 'krishna_counsel' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/40 via-obsidian-900 to-obsidian-800 border border-gold-500/30 shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400 font-bold">
                    श्रीभगवानुवाच (Supreme Counsel)
                  </h4>
                </div>
                <p className="text-base sm:text-lg text-gold-100 font-serif leading-relaxed italic border-l-2 border-gold-400 pl-4 py-1">
                  "{episode.krishna_counsel}"
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Core Shloka */}
          {activeTab === 'shloka' && (
            <div className="space-y-4 animate-in fade-in text-center">
              <div className="p-6 rounded-3xl bg-obsidian-800/80 border border-gold-500/25 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/30">
                  {episode.key_shloka.ref}
                </span>
                
                <p className="text-xl sm:text-2xl font-devanagari font-bold text-gold-100 leading-relaxed whitespace-pre-line">
                  {episode.key_shloka.sanskrit}
                </p>
                <p className="text-xs sm:text-sm font-serif italic text-gold-300/80 whitespace-pre-line">
                  {episode.key_shloka.iast}
                </p>
                
                <div className="p-4 rounded-2xl bg-obsidian-900/90 border border-gold-500/15 text-left mt-4">
                  <h5 className="text-[10px] font-mono uppercase tracking-widest text-gold-400 font-bold mb-1">
                    Direct Meaning
                  </h5>
                  <p className="text-sm text-gold-100/95 font-serif leading-relaxed">
                    {episode.key_shloka.meaning}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Practice & Breathwork */}
          {activeTab === 'practice' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-obsidian-800/80 border border-gold-500/20">
                <h4 className="text-xs font-mono uppercase tracking-widest text-gold-400 font-bold mb-2 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-gold-400" />
                  <span>Daily Contemplation Prompt</span>
                </h4>
                <p className="text-sm text-gold-100 font-sans leading-relaxed">
                  {episode.contemplation_prompt}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-obsidian-800/80 border border-gold-500/20">
                <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">
                  🌬️ Pranayama (Breathwork Guidance)
                </h4>
                <p className="text-sm text-gold-200/90 font-sans leading-relaxed">
                  {episode.breathwork_guidance}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Footer Actions */}
        <div className="p-4 bg-obsidian-950 border-t border-gold-500/15 flex items-center justify-between gap-3">
          <button
            onClick={() => onToggleComplete(episode.id)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
              isCompleted 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50' 
                : 'bg-gold-500 text-obsidian-950 hover:bg-gold-400 shadow-[0_0_15px_rgba(223,168,55,0.3)]'
            }`}
          >
            {isCompleted ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4" />}
            <span>{isCompleted ? 'Episode Completed (Click to Undo)' : 'Mark Episode as Completed'}</span>
          </button>

          <Button onClick={onClose} variant="secondary" size="sm" className="rounded-xl text-xs cursor-pointer">
            Close
          </Button>
        </div>

      </div>
    </div>
  );
}
