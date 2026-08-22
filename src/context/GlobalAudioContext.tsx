'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getMasterTimestampForVerse, MasterShlokaTimestamp, MASTER_VIDEO_ID } from '@/data/gitaMasterAudioTimestamps';
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
  playbackSpeed: number;
  autoPlayNext: boolean;
  sleepTimerRemaining: number | null;
  isSearchModalOpen: boolean;
  selectedLexiconWord: any | null;
  activeCardGeneratorVerse: any | null;
  currentTimeSec: number;
  
  // Actions
  playTrack: (chapter: number, verse: number, devanagari?: string, translation_hi?: string) => void;
  togglePlayPause: () => void;
  stopAudio: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setPlaybackSpeed: (speed: number) => void;
  setAutoPlayNext: (val: boolean) => void;
  setSleepTimer: (minutes: number | null) => void;
  setIsSearchModalOpen: (open: boolean) => void;
  setSelectedLexiconWord: (word: any | null) => void;
  setActiveCardGeneratorVerse: (verse: any | null) => void;
}

const GlobalAudioContext = createContext<GlobalAudioContextType | undefined>(undefined);

export function GlobalAudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<ActiveTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [autoPlayNext, setAutoPlayNext] = useState(true);
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState<number | null>(null);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  
  // Hidden background audio iframe container
  const [audioIframeSrc, setAudioIframeSrc] = useState<string | null>(null);

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

  // Track timer progress
  useEffect(() => {
    if (!isPlaying || !currentTrack) return;
    const interval = setInterval(() => {
      setCurrentTimeSec(prev => {
        if (prev >= currentTrack.timestamp.duration) {
          if (autoPlayNext) {
            nextTrack();
          } else {
            setIsPlaying(false);
          }
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, autoPlayNext]);

  // Global Keyboard Shortcuts (Ctrl+K for Search)
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
    translation_hi?: string
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
    setCurrentTimeSec(0);
    setIsPlaying(true);
    sacredAudio.playTempleBell(0.3);

    // Stream Pure Background Audio via YouTube Embed with zero UI clutter
    const src = `https://www.youtube.com/embed/${MASTER_VIDEO_ID}?start=${timestamp.startSeconds}&autoplay=1&enablejsapi=1&controls=0&playsinline=1`;
    setAudioIframeSrc(src);
  };

  const togglePlayPause = () => {
    if (!currentTrack) return;
    if (isPlaying) {
      setIsPlaying(false);
      setAudioIframeSrc(null);
    } else {
      setIsPlaying(true);
      const src = `https://www.youtube.com/embed/${MASTER_VIDEO_ID}?start=${currentTrack.timestamp.startSeconds + currentTimeSec}&autoplay=1&enablejsapi=1&controls=0&playsinline=1`;
      setAudioIframeSrc(src);
    }
    sacredAudio.playNavChime(0.06);
  };

  const stopAudio = () => {
    setIsPlaying(false);
    setAudioIframeSrc(null);
    setCurrentTimeSec(0);
  };

  const nextTrack = () => {
    if (!currentTrack) return;
    const chInfo = CHAPTERS.find(c => c.number === currentTrack.chapter) || CHAPTERS[0];
    if (currentTrack.verse < chInfo.verses_count) {
      playTrack(currentTrack.chapter, currentTrack.verse + 1, currentTrack.devanagari, currentTrack.translation_hi);
    } else if (currentTrack.chapter < 18) {
      playTrack(currentTrack.chapter + 1, 1);
    }
  };

  const prevTrack = () => {
    if (!currentTrack) return;
    if (currentTrack.verse > 1) {
      playTrack(currentTrack.chapter, currentTrack.verse - 1, currentTrack.devanagari, currentTrack.translation_hi);
    } else if (currentTrack.chapter > 1) {
      playTrack(currentTrack.chapter - 1, 1);
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
        playbackSpeed,
        autoPlayNext,
        sleepTimerRemaining,
        isSearchModalOpen,
        selectedLexiconWord,
        activeCardGeneratorVerse,
        currentTimeSec,
        playTrack,
        togglePlayPause,
        stopAudio,
        nextTrack,
        prevTrack,
        setPlaybackSpeed,
        setAutoPlayNext,
        setSleepTimer,
        setIsSearchModalOpen,
        setSelectedLexiconWord,
        setActiveCardGeneratorVerse
      }}
    >
      {children}
      
      {/* Hidden Pure Background YouTube Audio Stream Container */}
      {audioIframeSrc && (
        <div style={{ position: 'fixed', top: -9999, left: -9999, width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}>
          <iframe
            src={audioIframeSrc}
            title="Gita Chanting Audio Stream"
            allow="autoplay"
          />
        </div>
      )}
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
