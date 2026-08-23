import { NextResponse } from 'next/server';
import versesData from '@/data/gita-verses.json';
import type { GitaVerse } from '@/types/verse';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({ total: (versesData as GitaVerse[]).length });
}
