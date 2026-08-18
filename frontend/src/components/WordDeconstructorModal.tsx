'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnvayaToken } from '@/types/verse';
import { X, Sparkles } from 'lucide-react';

interface Props {
  token: AnvayaToken | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function WordDeconstructorModal({ token, isOpen, onClose }: Props) {
  if (!token) return null;

  const transliteration = token.iast || (token as unknown as { transliteration?: string }).transliteration || '';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-md bg-obsidian-900/95 border border-gold-400/30 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(223,168,55,0.15)] z-10 max-h-[85vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-obsidian-800 border border-gold-500/20 flex items-center justify-center text-gold-300/70 hover:text-gold-200 hover:border-gold-400/50 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header / Sanskrit Word */}
            <div className="flex flex-col items-center text-center mt-1 mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs text-gold-400/70 uppercase tracking-widest font-mono mb-2">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Anvaya Deconstruction</span>
              </div>
              <h3 className="text-4xl sm:text-5xl font-devanagari text-gold-100 mb-1">{token.word}</h3>
              {transliteration && (
                <p className="text-gold-300/80 italic font-serif text-lg">{transliteration}</p>
              )}
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent mb-6" />

            {/* Grammar and Meaning Grid */}
            <div className="space-y-4">
              {token.dhatu && token.dhatu !== '-' && (
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-obsidian-800/60 border border-white/5">
                  <span className="text-xl">🌱</span>
                  <div>
                    <div className="text-[11px] text-gold-400/70 uppercase tracking-wider font-mono font-semibold">Root (Dhātu)</div>
                    <div className="text-gold-100 font-medium text-base">{token.dhatu}</div>
                  </div>
                </div>
              )}
              
              {token.vibhakti && token.vibhakti !== '-' && (
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-obsidian-800/60 border border-white/5">
                  <span className="text-xl">📐</span>
                  <div>
                    <div className="text-[11px] text-gold-400/70 uppercase tracking-wider font-mono font-semibold">Grammar (Vibhakti / Case)</div>
                    <div className="text-gold-100 font-medium text-base">{token.vibhakti}</div>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-obsidian-800/60 border border-white/5">
                <span className="text-xl">🇬🇧</span>
                <div>
                  <div className="text-[11px] text-gold-400/70 uppercase tracking-wider font-mono font-semibold">English Contextual Meaning</div>
                  <div className="text-gold-50 font-medium text-base leading-relaxed">{token.meaning_en}</div>
                </div>
              </div>

              {token.meaning_hi && (
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-obsidian-800/60 border border-white/5">
                  <span className="text-xl">🇮🇳</span>
                  <div>
                    <div className="text-[11px] text-gold-400/70 uppercase tracking-wider font-mono font-semibold">हिंदी भावार्थ (Hindi Meaning)</div>
                    <div className="text-gold-100 font-devanagari text-base leading-relaxed">{token.meaning_hi}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-gold-500/10 text-center">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-gold-500/15 hover:bg-gold-500/25 border border-gold-400/30 text-gold-200 text-sm font-medium transition-all"
              >
                Close Deconstructor
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
