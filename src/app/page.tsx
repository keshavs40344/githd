'use client';

import React from 'react';
import versesData from '@/data/gita-verses.json';
import type { GitaVerse } from '@/types/verse';
import MasterDharmaHub from '@/components/MasterDharmaHub';

export default function HomePage() {
  const verses = versesData as GitaVerse[];
  return <MasterDharmaHub verses={verses} />;
}


