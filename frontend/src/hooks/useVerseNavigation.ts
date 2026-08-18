'use client';
import { useState, useCallback, useMemo } from 'react';
import type { GitaVerse } from '@/types/verse';
import { CHAPTERS } from '@/types/verse';

interface VerseNavigation {
  currentChapter: number;
  currentVerse: number;
  setChapter: (chapter: number) => void;
  setVerse: (verse: number) => void;
  jumpTo: (chapter: number, verse: number) => void;
  nextVerse: () => void;
  prevVerse: () => void;
  nextChapter: () => void;
  prevChapter: () => void;
  currentVerseData: GitaVerse | undefined;
  versesInCurrentChapter: GitaVerse[];
  canGoNext: boolean;
  canGoPrev: boolean;
}

export function useVerseNavigation(allVerses: GitaVerse[] = []): VerseNavigation {
  const [currentChapter, setCurrentChapter] = useState(2);
  const [currentVerse, setCurrentVerse] = useState(47);

  const versesInCurrentChapter = useMemo(
    () => allVerses.filter((v) => v.chapter === currentChapter),
    [allVerses, currentChapter]
  );

  const currentVerseData = useMemo(
    () => allVerses.find((v) => v.chapter === currentChapter && v.verse === currentVerse) ||
          allVerses.find((v) => v.chapter === currentChapter) ||
          allVerses[0],
    [allVerses, currentChapter, currentVerse]
  );

  const maxVerseInChapter = CHAPTERS.find(c => c.number === currentChapter)?.verse_count ?? 47;

  const canGoNext = currentChapter < 18 || currentVerse < maxVerseInChapter;
  const canGoPrev = currentChapter > 1 || currentVerse > 1;

  const nextVerse = useCallback(() => {
    // If we have next available verse in our loaded dataset for this chapter
    const currentChapterVerses = allVerses.filter(v => v.chapter === currentChapter).sort((a, b) => a.verse - b.verse);
    const higherVerses = currentChapterVerses.filter(v => v.verse > currentVerse);
    
    if (higherVerses.length > 0) {
      setCurrentVerse(higherVerses[0].verse);
    } else if (currentVerse < maxVerseInChapter) {
      setCurrentVerse(v => v + 1);
    } else if (currentChapter < 18) {
      const nextCh = currentChapter + 1;
      setCurrentChapter(nextCh);
      const nextChVerses = allVerses.filter(v => v.chapter === nextCh).sort((a, b) => a.verse - b.verse);
      setCurrentVerse(nextChVerses.length > 0 ? nextChVerses[0].verse : 1);
    }
  }, [allVerses, currentChapter, currentVerse, maxVerseInChapter]);

  const prevVerse = useCallback(() => {
    const currentChapterVerses = allVerses.filter(v => v.chapter === currentChapter).sort((a, b) => a.verse - b.verse);
    const lowerVerses = currentChapterVerses.filter(v => v.verse < currentVerse);
    
    if (lowerVerses.length > 0) {
      setCurrentVerse(lowerVerses[lowerVerses.length - 1].verse);
    } else if (currentVerse > 1) {
      setCurrentVerse(v => v - 1);
    } else if (currentChapter > 1) {
      const prevCh = currentChapter - 1;
      const prevMax = CHAPTERS.find(c => c.number === prevCh)?.verse_count ?? 1;
      setCurrentChapter(prevCh);
      const prevChVerses = allVerses.filter(v => v.chapter === prevCh).sort((a, b) => a.verse - b.verse);
      setCurrentVerse(prevChVerses.length > 0 ? prevChVerses[prevChVerses.length - 1].verse : prevMax);
    }
  }, [allVerses, currentChapter, currentVerse]);

  const nextChapter = useCallback(() => {
    if (currentChapter < 18) {
      const nextCh = currentChapter + 1;
      setCurrentChapter(nextCh);
      const nextChVerses = allVerses.filter(v => v.chapter === nextCh).sort((a, b) => a.verse - b.verse);
      setCurrentVerse(nextChVerses.length > 0 ? nextChVerses[0].verse : 1);
    }
  }, [allVerses, currentChapter]);

  const prevChapter = useCallback(() => {
    if (currentChapter > 1) {
      const prevCh = currentChapter - 1;
      setCurrentChapter(prevCh);
      const prevChVerses = allVerses.filter(v => v.chapter === prevCh).sort((a, b) => a.verse - b.verse);
      setCurrentVerse(prevChVerses.length > 0 ? prevChVerses[0].verse : 1);
    }
  }, [allVerses, currentChapter]);

  const jumpTo = useCallback((chapter: number, verse: number) => {
    setCurrentChapter(chapter);
    setCurrentVerse(verse);
  }, []);

  return {
    currentChapter,
    currentVerse,
    setChapter: (ch: number) => {
      setCurrentChapter(ch);
      const chVerses = allVerses.filter(v => v.chapter === ch).sort((a, b) => a.verse - b.verse);
      setCurrentVerse(chVerses.length > 0 ? chVerses[0].verse : 1);
    },
    setVerse: setCurrentVerse,
    jumpTo,
    nextVerse,
    prevVerse,
    nextChapter,
    prevChapter,
    currentVerseData,
    versesInCurrentChapter,
    canGoNext,
    canGoPrev,
  };
}
