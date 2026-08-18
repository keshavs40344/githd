import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-obsidian-950 text-gold-100 flex-col space-y-6">
      <h1 className="text-4xl font-devanagari text-gold-400">मार्गः न प्राप्तः</h1>
      <h2 className="text-2xl">Page Not Found</h2>
      <p className="text-obsidian-500 max-w-md text-center">
        The path you are seeking does not exist in this realm. Return to the center.
      </p>
      <Link href="/" className="px-6 py-2 border border-gold-500/30 text-gold-400 rounded-md hover:bg-gold-500/10 transition">
        Return to Home
      </Link>
    </div>
  );
}
