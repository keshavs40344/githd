'use client';

import React from 'react';
import type { GitaVerse } from '@/types/verse';
import ChapterEpisodeGrid from '@/components/ChapterEpisodeGrid';

interface ScriptureWorkspaceProps {
  verses?: GitaVerse[];
  initialChapter?: number;
  initialVerse?: number;
}

export default function ScriptureWorkspace({
  verses
}: ScriptureWorkspaceProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6">
      <ChapterEpisodeGrid />
    </div>
  );
}
