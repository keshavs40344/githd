import React from 'react';
import EpisodeExplorer from '@/components/EpisodeExplorer';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Radio } from 'lucide-react';

export const metadata = {
  title: 'इस्कॉन श्रीमद्भगवद्गीता यथारूप वीडियो एवं प्रवचन | ISKCON Bhagavad-gita As It Is',
  description: 'श्रील प्रभुपाद एवं इस्कॉन आचार्यों के प्रामाणिक गीता वीडियो, १८ सम्पूर्ण अध्याय और ७०० श्लोक यथारूप दर्शन।',
};

export default function EpisodesPage() {
  return (
    <main className="min-h-screen bg-[#070810] text-[#f5eed9] flex flex-col relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Nav Header */}
      <header className="w-full border-b border-[#c5a059]/20 bg-[#07080e]/95 backdrop-blur-2xl px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-2xl">
        <div className="flex items-center gap-3">
          <Link 
            href="/" 
            className="p-2 rounded-xl bg-[#121528] border border-amber-400/30 text-amber-300 hover:text-white hover:border-amber-400 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-600 flex items-center justify-center text-black font-bold shadow-md">
              🛕
            </div>
            <div>
              <span className="font-bold text-sm tracking-wider font-serif text-[#f5eed9]">
                श्री राधा-कृष्ण महामन्दिर
              </span>
              <span className="text-[10px] text-amber-400/80 ml-2 font-mono hidden sm:inline">
                इस्कॉन श्रीमद्भगवद्गीता यथारूप (ISKCON Gita As It Is)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/mentor"
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 text-black text-xs font-serif font-bold shadow-md transition-all cursor-pointer"
          >
            श्रीकृष्ण AI संवाद
          </Link>
        </div>
      </header>

      {/* Episodes Explorer Main */}
      <div className="flex-1 py-6">
        <EpisodeExplorer />
      </div>
    </main>
  );
}
