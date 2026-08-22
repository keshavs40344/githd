'use client';
import React from 'react';
import versesData from '@/data/gita-verses.json';
import type { GitaVerse } from '@/types/verse';
import DharmaHomePage from '@/components/DharmaHomePage';

export default function HomePage() {
  const verses = versesData as GitaVerse[];
  return <DharmaHomePage verses={verses} />;
}
