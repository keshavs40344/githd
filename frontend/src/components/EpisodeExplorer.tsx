'use client';

import React, { useState, useEffect, useRef } from 'react';
import { EPISODES } from '@/data/episodes';
import { getArtworkForChapter } from '@/data/krishnaArtworks';
import type { Episode, EpisodeTheme } from '@/types/episode';
import EpisodeDetailModal from './EpisodeDetailModal';
import { 
  Sparkles, CheckCircle, Circle, Play, Pause, Search, Filter, 
  BookOpen, Compass, Award, RefreshCw, Volume2, ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

import { sacredAudio } from '@/lib/sacredSounds';

const THEMES: ('All' | EpisodeTheme)[] = [
  'All',
  'Inner Conflict',
  'Self-Mastery',
  'Supreme Knowledge',
  'Cosmic Vision',
  'Devotion & Love',
  'Liberation'
];

export default function EpisodeExplorer() {
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<'All' | EpisodeTheme>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in_progress'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [playingEpisodeId, setPlayingEpisodeId] = useState<number | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Load completed IDs from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('dharma_completed_episodes');
        if (saved) {
          setCompletedIds(JSON.parse(saved));
        }
      } catch {
        // ignore
      }
    }
  }, []);

  // Save to localStorage whenever completedIds changes
  const toggleComplete = (id: number) => {
    setCompletedIds((prev) => {
      const isFinishing = !prev.includes(id);
      if (isFinishing) {
        sacredAudio.playTempleBell(0.3);
      } else {
        sacredAudio.playNavChime(0.12);
      }
      const next = isFinishing ? [...prev, id] : prev.filter((item) => item !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('dharma_completed_episodes', JSON.stringify(next));
      }
      return next;
    });
  };


  const markAllDone = () => {
    const allIds = EPISODES.map(e => e.id);
    setCompletedIds(allIds);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dharma_completed_episodes', JSON.stringify(allIds));
    }
  };

  const resetAllProgress = () => {
    setCompletedIds([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dharma_completed_episodes');
    }
  };

  // Audio Raga Synthesizer for Episode Tunes
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const stopAudio = () => {
    oscillatorsRef.current.forEach((osc) => {
      try { osc.stop(); } catch {}
      try { osc.disconnect(); } catch {}
    });
    oscillatorsRef.current = [];
    if (gainNodeRef.current) {
      try { gainNodeRef.current.disconnect(); } catch {}
      gainNodeRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingEpisodeId(null);
  };

  const playEpisodeTune = (episode: Episode) => {
    if (playingEpisodeId === episode.id) {
      stopAudio();
      return;
    }

    stopAudio();
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    setPlayingEpisodeId(episode.id);

    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    masterGain.gain.value = 0.12;
    gainNodeRef.current = masterGain;

    const baseFreq = episode.tune_freq || 136.1;
    const freqs = [baseFreq, baseFreq * 1.5, baseFreq * 2.0];

    freqs.forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = freq * 3;
      filter.Q.value = 1.2;

      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.35;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 7;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.detune);
      lfo.start();

      osc.connect(filter);
      filter.connect(masterGain);
      osc.start();

      oscillatorsRef.current.push(osc, lfo);
    });

    // Voice recitation of Key Shloka & Title
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `${episode.title_devanagari}. ${episode.key_shloka.sanskrit}. Shri Krishna says: ${episode.krishna_counsel}`
      );
      utterance.rate = 0.82;
      utterance.pitch = 0.8;

      const voices = window.speechSynthesis.getVoices();
      const divineVoice = voices.find(v => v.lang.includes('IN')) || voices.find(v => v.lang.includes('hi')) || voices[0];
      if (divineVoice) utterance.voice = divineVoice;

      utterance.onend = () => stopAudio();
      utterance.onerror = () => stopAudio();
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    return () => stopAudio();
  }, []);

  // Filter episodes
  const filteredEpisodes = EPISODES.filter((episode) => {
    const matchesTheme = selectedTheme === 'All' || episode.theme === selectedTheme;
    const isComp = completedIds.includes(episode.id);
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && isComp) ||
      (statusFilter === 'in_progress' && !isComp);
    
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      episode.title_devanagari.toLowerCase().includes(query) ||
      episode.title_en.toLowerCase().includes(query) ||
      episode.subtitle.toLowerCase().includes(query) ||
      episode.summary.toLowerCase().includes(query) ||
      episode.chapter.toString() === query;

    return matchesTheme && matchesStatus && matchesSearch;
  });

  const completionPercent = Math.round((completedIds.length / EPISODES.length) * 100);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 z-10 relative">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-obsidian-900 via-obsidian-800 to-amber-950/30 border border-gold-500/25 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Decorative OM */}
        <div className="absolute top-4 right-6 text-7xl text-gold-500/5 font-cinzel select-none pointer-events-none">ॐ</div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>18 Divine Chapters · Quest of Wisdom</span>
              </span>
            </div>
            <h1 className="font-devanagari text-2xl sm:text-4xl font-bold text-gold-100 tracking-tight text-glow-gold">
              श्रीकृष्ण लीला एवं भगवद्गीता के १८ अध्याय
            </h1>
            <p className="text-xs sm:text-sm text-gold-300/70 font-sans leading-relaxed">
              Explore all 18 divine episodes of the Gita. Track your spiritual mastery, listen to consecrated Raga melodies, and unlock Krishna's psychological counsel for every human conflict.
            </p>
          </div>

          {/* Progress Tracker Card */}
          <div className="bg-obsidian-950/80 border border-gold-500/25 rounded-2xl p-5 min-w-[260px] space-y-3 shadow-xl flex-shrink-0">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-gold-300 font-bold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-gold-400" />
                <span>Journey Progress</span>
              </span>
              <span className="text-gold-400 font-bold">{completionPercent}%</span>
            </div>

            {/* Progress Bar */}
            <div className="h-2.5 w-full bg-obsidian-800 rounded-full overflow-hidden p-0.5 border border-gold-500/20">
              <div 
                className="h-full bg-gradient-to-r from-gold-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(223,168,55,0.5)]"
                style={{ width: `${completionPercent}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[11px] font-mono text-gold-400/70 pt-1">
              <span>{completedIds.length} / {EPISODES.length} Episodes Mastered</span>
              <button 
                onClick={completedIds.length === EPISODES.length ? resetAllProgress : markAllDone}
                className="hover:text-gold-200 underline cursor-pointer"
              >
                {completedIds.length === EPISODES.length ? 'Reset All' : 'Mark All Done'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-4 bg-obsidian-900/80 border border-gold-500/20 rounded-3xl p-5 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gold-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by chapter, topic, or keyword..."
              className="w-full bg-obsidian-800/90 border border-gold-500/20 rounded-xl pl-9 pr-4 py-2 text-xs text-gold-100 placeholder:text-obsidian-400 focus:border-gold-400/60 outline-none font-sans"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
            {[
              { key: 'all', label: 'All (18)' },
              { key: 'in_progress', label: `In Progress (${18 - completedIds.length})` },
              { key: 'completed', label: `Completed (${completedIds.length})` },
            ].map((st) => (
              <button
                key={st.key}
                onClick={() => setStatusFilter(st.key as typeof statusFilter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === st.key
                    ? 'bg-gold-500 text-obsidian-950 font-bold shadow-[0_0_12px_rgba(223,168,55,0.3)]'
                    : 'bg-obsidian-800 text-gold-400/70 hover:text-gold-200 border border-gold-500/15'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
          <Filter className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 ml-1" />
          {THEMES.map((theme) => (
            <button
              key={theme}
              onClick={() => setSelectedTheme(theme)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all flex-shrink-0 cursor-pointer whitespace-nowrap ${
                selectedTheme === theme
                  ? 'bg-gold-400/20 text-gold-200 border border-gold-400/50 font-bold'
                  : 'bg-obsidian-800/60 text-gold-400/60 hover:text-gold-200 border border-gold-500/10'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      {/* Episodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEpisodes.map((episode) => {
          const isDone = completedIds.includes(episode.id);
          const isPlaying = playingEpisodeId === episode.id;

          return (
            <div
              key={episode.id}
              className={`bg-obsidian-900/90 border rounded-3xl overflow-hidden flex flex-col justify-between shadow-xl backdrop-blur-xl card-hover ${
                isDone ? 'border-emerald-500/30' : 'border-gold-500/18'
              }`}
            >
              {/* Card Image Banner */}
              <div className="relative h-44 w-full overflow-hidden bg-obsidian-950">
                <img
                  src={getArtworkForChapter(episode.chapter) || episode.image_url}
                  alt={episode.title_en}
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 filter brightness-90 group-hover:brightness-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/40 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="font-cinzel text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-obsidian-900/90 text-gold-300 border border-gold-500/30 tracking-widest uppercase">
                    Ch. {episode.chapter}
                  </span>

                  {/* Quick Toggle Done/Undone */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleComplete(episode.id);
                    }}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-sans font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isDone
                        ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/60 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                        : 'bg-obsidian-900/90 text-gold-400/70 border border-gold-500/20 hover:border-gold-400 hover:text-gold-200'
                    }`}
                  >
                    {isDone ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Circle className="w-3.5 h-3.5" />}
                    <span>{isDone ? 'Done' : 'Mark Done'}</span>
                  </button>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-3 left-4 right-4 z-10">
                  <span className="text-[9px] font-sans font-medium text-gold-400/80 uppercase tracking-wider block mb-0.5">
                    {episode.theme}
                  </span>
                  <h3 className="font-devanagari text-base font-bold text-gold-100 line-clamp-1 text-glow-gold">
                    {episode.title_devanagari}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h4 className="font-display text-sm font-semibold text-gold-200/95 line-clamp-1">
                    {episode.title_en}
                  </h4>
                  <p className="text-xs text-gold-300/65 line-clamp-2 leading-relaxed font-sans">
                    {episode.subtitle}
                  </p>
                </div>

                {/* Key Shloka Snippet */}
                <div className="bg-obsidian-800/80 border border-gold-500/15 p-3 rounded-2xl space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gold-400/70">
                    <span>{episode.key_shloka.ref}</span>
                    <span>{episode.shloka_count} Shlokas</span>
                  </div>
                  <p className="text-xs font-devanagari text-gold-200 line-clamp-1">
                    {episode.key_shloka.sanskrit.split('\n')[0]}
                  </p>
                </div>

                {/* Actions Row */}
                <div className="pt-2 border-t border-gold-500/15 flex items-center justify-between gap-2">
                  {/* Tune Player Button */}
                  <button
                    onClick={() => playEpisodeTune(episode)}
                    className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-mono transition-all cursor-pointer ${
                      isPlaying
                        ? 'bg-gold-500 text-obsidian-950 border-gold-400 font-bold shadow-[0_0_12px_rgba(223,168,55,0.4)]'
                        : 'bg-obsidian-800 text-gold-300 border-gold-500/20 hover:border-gold-400/50'
                    }`}
                    title={episode.raga_tune}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span className="hidden sm:inline">{isPlaying ? 'Playing...' : 'Tune'}</span>
                  </button>

                  {/* Open Deep Explanation Modal */}
                  <button
                    onClick={() => setSelectedEpisode(episode)}
                    className="flex-1 py-2 px-3 bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-obsidian-950 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(223,168,55,0.25)] transition-all cursor-pointer"
                  >
                    <span>Read Explanation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEpisodes.length === 0 && (
        <div className="text-center py-16 bg-obsidian-900/60 border border-gold-500/20 rounded-3xl space-y-3">
          <BookOpen className="w-8 h-8 text-gold-400/40 mx-auto" />
          <h3 className="text-base font-bold text-gold-200">No Episodes Found</h3>
          <p className="text-xs text-gold-400/60">Try adjusting your search query or theme filters.</p>
        </div>
      )}

      {/* Deep Episode Modal */}
      {selectedEpisode && (
        <EpisodeDetailModal
          episode={selectedEpisode}
          isCompleted={completedIds.includes(selectedEpisode.id)}
          onToggleComplete={toggleComplete}
          onClose={() => setSelectedEpisode(null)}
          onPlayTune={playEpisodeTune}
          isPlayingTune={playingEpisodeId === selectedEpisode.id}
        />
      )}

    </div>
  );
}
