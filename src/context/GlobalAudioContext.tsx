'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getMasterTimestampForVerse, MasterShlokaTimestamp } from '@/data/gitaMasterAudioTimestamps';
import { getArtworkDetailsForShloka, KrishnaArt } from '@/data/krishnaArtworks';
import { getSpeakerForVerse, SpeakerInfo } from '@/lib/universalVedicEngine';
import { CHAPTERS } from '@/types/verse';
import { sacredAudio } from '@/lib/sacredSounds';

export interface ActiveTrack {
  chapter: number;
  verse: number;
  devanagari?: string;
  translation_hi?: string;
  speaker: SpeakerInfo;
  timestamp: MasterShlokaTimestamp;
  artwork: KrishnaArt;
}

interface GlobalAudioContextType {
  currentTrack: ActiveTrack | null;
  isPlaying: boolean;
  audioMode: 'vedic_voice' | 'youtube_master' | 'flute_bgm' | 'none';
  playbackSpeed: number;
  autoPlayNext: boolean;
  sleepTimerRemaining: number | null; // seconds remaining
  isSearchModalOpen: boolean;
  selectedLexiconWord: any | null;
  activeCardGeneratorVerse: any | null;
  
  // Actions
  playTrack: (chapter: number, verse: number, devanagari?: string, translation_hi?: string, mode?: 'vedic_voice' | 'youtube_master' | 'flute_bgm') => void;
  togglePlayPause: () => void;
  stopAudio: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setPlaybackSpeed: (speed: number) => void;
  setAutoPlayNext: (val: boolean) => void;
  setSleepTimer: (minutes: number | null) => void;
  setAudioMode: (mode: 'vedic_voice' | 'youtube_master' | 'flute_bgm' | 'none') => void;
  setIsSearchModalOpen: (open: boolean) => void;
  setSelectedLexiconWord: (word: any | null) => void;
  setActiveCardGeneratorVerse: (verse: any | null) => void;
}

const GlobalAudioContext = createContext<GlobalAudioContextType | undefined>(undefined);

export function GlobalAudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<ActiveTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMode, setAudioMode] = useState<'vedic_voice' | 'youtube_master' | 'flute_bgm' | 'none'>('none');
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [autoPlayNext, setAutoPlayNext] = useState(true);
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState<number | null>(null);
  
  // Enterprise UI Drawers State
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedLexiconWord, setSelectedLexiconWord] = useState<any | null>(null);
  const [activeCardGeneratorVerse, setActiveCardGeneratorVerse] = useState<any | null>(null);

  // Sleep Timer Countdown
  useEffect(() => {
    if (sleepTimerRemaining === null) return;
    if (sleepTimerRemaining <= 0) {
      stopAudio();
      setSleepTimerRemaining(null);
      return;
    }
    const timer = setInterval(() => {
      setSleepTimerRemaining(prev => (prev !== null && prev > 0 ? prev - 1 : null));
    }, 1000);
    return () => clearInterval(timer);
  }, [sleepTimerRemaining]);

  // Global Keyboard Shortcuts (Ctrl+K for Search, Space for Audio)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const playTrack = (
    chapter: number,
    verse: number,
    devanagari?: string,
    translation_hi?: string,
    mode: 'vedic_voice' | 'youtube_master' | 'flute_bgm' = 'vedic_voice'
  ) => {
    const timestamp = getMasterTimestampForVerse(chapter, verse);
    const artwork = getArtworkDetailsForShloka(chapter, verse);
    const speaker = getSpeakerForVerse(chapter, verse);

    const track: ActiveTrack = {
      chapter,
      verse,
      devanagari,
      translation_hi,
      speaker,
      timestamp,
      artwork
    };

    setCurrentTrack(track);
    setAudioMode(mode);
    setIsPlaying(true);
    sacredAudio.playTempleBell(0.3);

    if (mode === 'vedic_voice' && typeof window !== 'undefined' && devanagari) {
      window.speechSynthesis.cancel();
      const textToSpeak = `${devanagari}. अर्थ: ${translation_hi || ''}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.85 * playbackSpeed;
      utterance.onend = () => {
        if (autoPlayNext) {
          nextTrack();
        } else {
          setIsPlaying(false);
        }
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const togglePlayPause = () => {
    if (!currentTrack) return;
    if (isPlaying) {
      if (typeof window !== 'undefined') window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (audioMode === 'vedic_voice' && currentTrack.devanagari) {
        playTrack(currentTrack.chapter, currentTrack.verse, currentTrack.devanagari, currentTrack.translation_hi, 'vedic_voice');
      }
    }
    sacredAudio.playNavChime(0.06);
  };

  const stopAudio = () => {
    if (typeof window !== 'undefined') window.speechSynthesis.cancel();
    setIsPlaying(false);
    setAudioMode('none');
  };

  const nextTrack = () => {
    if (!currentTrack) return;
    const chInfo = CHAPTERS.find(c => c.number === currentTrack.chapter) || CHAPTERS[0];
    if (currentTrack.verse < chInfo.verses_count) {
      playTrack(currentTrack.chapter, currentTrack.verse + 1, currentTrack.devanagari, currentTrack.translation_hi, audioMode === 'none' ? 'vedic_voice' : audioMode);
    } else if (currentTrack.chapter < 18) {
      playTrack(currentTrack.chapter + 1, 1, undefined, undefined, audioMode === 'none' ? 'vedic_voice' : audioMode);
    }
  };

  const prevTrack = () => {
    if (!currentTrack) return;
    if (currentTrack.verse > 1) {
      playTrack(currentTrack.chapter, currentTrack.verse - 1, currentTrack.devanagari, currentTrack.translation_hi, audioMode === 'none' ? 'vedic_voice' : audioMode);
    } else if (currentTrack.chapter > 1) {
      playTrack(currentTrack.chapter - 1, 1, undefined, undefined, audioMode === 'none' ? 'vedic_voice' : audioMode);
    }
  };

  const setSleepTimer = (minutes: number | null) => {
    if (minutes === null) {
      setSleepTimerRemaining(null);
    } else {
      setSleepTimerRemaining(minutes * 60);
      sacredAudio.playTempleBell(0.2);
    }
  };

  return (
    <GlobalAudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        audioMode,
        playbackSpeed,
        autoPlayNext,
        sleepTimerRemaining,
        isSearchModalOpen,
        selectedLexiconWord,
        activeCardGeneratorVerse,
        playTrack,
        togglePlayPause,
        stopAudio,
        nextTrack,
        prevTrack,
        setPlaybackSpeed,
        setAutoPlayNext,
        setSleepTimer,
        setAudioMode,
        setIsSearchModalOpen,
        setSelectedLexiconWord,
        setActiveCardGeneratorVerse
      }}
    >
      {children}
    </GlobalAudioContext.Provider>
  );
}

export function useGlobalAudio() {
  const context = useContext(GlobalAudioContext);
  if (!context) {
    throw new Error('useGlobalAudio must be used within a GlobalAudioProvider');
  }
  return context;
}
