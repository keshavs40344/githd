'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Server, Shield, Sparkles } from 'lucide-react';
import LiveServerMasterModal from '@/components/LiveServerMasterModal';

export default function ServerFloatingWidget() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-24 right-5 z-40 flex flex-col items-end gap-2 group">
        <div className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-orange-400/40 text-[10px] font-mono text-orange-300 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          🖥️ Dharma Server Command (Ctrl+Alt+S / F2)
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-black font-black shadow-[0_0_25px_rgba(245,158,11,0.5)] border-2 border-amber-300 hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
          title="Dharma.OS लाइव सर्वर कंट्रोल सेंटर खोलें (Ctrl+Alt+S)"
          aria-label="Open Live Server"
        >
          <Server className="w-5 h-5 animate-pulse text-black" />
        </button>
      </div>

      <LiveServerMasterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
