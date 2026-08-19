'use client';

import React, { useState, useEffect } from 'react';
import { Download, Sparkles, X, Smartphone, Check } from 'lucide-react';
import { sacredAudio } from '@/lib/sacredSounds';

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
        return;
      }

      const handler = (e: any) => {
        e.preventDefault();
        setDeferredPrompt(e);
        const dismissed = localStorage.getItem('dharma_pwa_dismissed');
        if (!dismissed) {
          setShowBanner(true);
        }
      };

      window.addEventListener('beforeinstallprompt', handler);
      return () => window.removeEventListener('beforeinstallprompt', handler);
    }
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    sacredAudio.playNavChime(0.15);
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setShowBanner(false);
      sacredAudio.playTempleBell(0.35);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('dharma_pwa_dismissed', 'true');
  };

  if (!showBanner || isInstalled) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-3 left-3 sm:left-auto sm:right-6 max-w-sm z-50 animate-in slide-in-from-bottom duration-300">
      <div className="bg-gradient-to-r from-obsidian-900 via-obsidian-900 to-amber-950/70 border border-gold-500/40 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center justify-between gap-3">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center text-obsidian-950 font-bold text-lg shrink-0 shadow-[0_0_12px_rgba(232,163,32,0.5)]">
            ॐ
          </div>
          <div>
            <h4 className="text-xs font-bold text-gold-100 font-cinzel">
              ऐप इंस्टॉल करें (Install App)
            </h4>
            <p className="text-[10px] text-gold-400/80 font-sans">
              1-Click Fast Native App Access
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleInstallClick}
            className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-gold-400 to-amber-500 text-obsidian-950 font-bold text-xs font-sans shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            इंस्टॉल
          </button>
          <button
            onClick={handleDismiss}
            className="p-1.5 text-gold-400/50 hover:text-gold-200 cursor-pointer"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
