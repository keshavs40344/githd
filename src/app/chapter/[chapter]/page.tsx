import ChapterPageClient from './ChapterPageClient';

export function generateStaticParams() {
  return Array.from({ length: 18 }, (_, i) => ({
    chapter: (i + 1).toString(),
  }));
}

export default function ChapterPage() {
  return <ChapterPageClient />;
}
