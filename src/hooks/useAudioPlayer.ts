'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import type { PlaybackSpeed } from '@/lib/constants';

interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  speed: PlaybackSpeed;
  isAvailable: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  seek: (time: number) => void;
  setSpeed: (speed: PlaybackSpeed) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export function useAudioPlayer(src: string): AudioPlayerState {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeedState] = useState<PlaybackSpeed>(1.0);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = src;
    audio.load();
    setIsPlaying(false);
    setCurrentTime(0);

    const onLoadedMetadata = () => setDuration(audio.duration);
    const onTimeUpdate = () => setCurrentTime(audio.duration ? audio.currentTime : 0);
    const onEnded = () => setIsPlaying(false);
    const onError = () => setIsAvailable(false);
    const onCanPlay = () => setIsAvailable(true);

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    audio.addEventListener('canplay', onCanPlay);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('canplay', onCanPlay);
    };
  }, [src]);

  const play = useCallback(() => { audioRef.current?.play(); setIsPlaying(true); }, []);
  const pause = useCallback(() => { audioRef.current?.pause(); setIsPlaying(false); }, []);
  const toggle = useCallback(() => { isPlaying ? pause() : play(); }, [isPlaying, play, pause]);
  const seek = useCallback((time: number) => { if (audioRef.current) audioRef.current.currentTime = time; }, []);
  const setSpeed = useCallback((s: PlaybackSpeed) => { setSpeedState(s); if (audioRef.current) audioRef.current.playbackRate = s; }, []);

  return { isPlaying, currentTime, duration, speed, isAvailable, play, pause, toggle, seek, setSpeed, audioRef };
}
