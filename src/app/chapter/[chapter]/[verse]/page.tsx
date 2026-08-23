import versesData from '@/data/gita-verses.json';
import VersePageClient from './VersePageClient';

export function generateStaticParams() {
  return (versesData as any[]).map(v => ({
    chapter: v.chapter.toString(),
    verse: v.verse.toString(),
  }));
}

export default function VersePage() {
  return <VersePageClient />;
}
