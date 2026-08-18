'use client';

import React, { useState, useEffect } from 'react';
import { X, BookMarked, Edit3, Trash2, Download, Copy, Check } from 'lucide-react';
import type { GitaVerse } from '@/types/verse';

interface SavedVersesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVerse: (chapter: number, verse: number) => void;
  verses: GitaVerse[];
}

export default function SavedVersesDrawer({ isOpen, onClose, onSelectVerse, verses }: SavedVersesDrawerProps) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const saved = JSON.parse(localStorage.getItem('dharma_saved_verses') || '[]');
      const savedNotes = JSON.parse(localStorage.getItem('dharma_verse_notes') || '{}');
      setSavedIds(saved);
      setNotes(savedNotes);
    }
  }, [isOpen]);

  const saveNotes = (newNotes: Record<string, string>) => {
    setNotes(newNotes);
    localStorage.setItem('dharma_verse_notes', JSON.stringify(newNotes));
  };

  const removeSaved = (id: string) => {
    const newSaved = savedIds.filter(x => x !== id);
    setSavedIds(newSaved);
    localStorage.setItem('dharma_saved_verses', JSON.stringify(newSaved));
  };

  const exportJournal = () => {
    const savedVersesData = savedIds.map(id => {
      const [ch, v] = id.split('-');
      const verse = verses.find(x => x.chapter === parseInt(ch) && x.verse === parseInt(v));
      return verse ? `## Chapter ${ch}, Verse ${v}\n\n**Sanskrit:**\n${verse.devanagari}\n\n**Translation:**\n${verse.translation_en}\n\n**My Contemplation:**\n${notes[id] || 'No notes yet.'}\n\n---\n` : '';
    }).join('\n');

    const blob = new Blob([`# My Dharma Journal\n\n${savedVersesData}`], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Dharma_Journal.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyVerse = (verse: GitaVerse, id: string) => {
    navigator.clipboard.writeText(`Ch ${verse.chapter}, Verse ${verse.verse}\n${verse.devanagari}\n${verse.translation_en}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  const savedVersesFull = savedIds.map(id => {
    const [ch, v] = id.split('-');
    return {
      id,
      verseData: verses.find(x => x.chapter === parseInt(ch) && x.verse === parseInt(v))
    };
  }).filter(x => x.verseData) as { id: string, verseData: GitaVerse }[];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full md:w-96 bg-[#111] border-l border-[#D4AF37]/20 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        <div className="p-4 border-b border-[#D4AF37]/20 flex justify-between items-center bg-[#1A1A1A]">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <BookMarked size={20} />
            <h2 className="font-semibold text-lg">Contemplation Journal</h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {savedVersesFull.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              <p>No verses saved yet.</p>
              <p className="text-sm mt-2">Bookmark verses to contemplate later.</p>
            </div>
          ) : (
            savedVersesFull.map(({ id, verseData }) => (
              <div key={id} className="bg-[#1A1A1A] rounded-xl border border-[#D4AF37]/20 overflow-hidden">
                <div className="p-3 bg-[#D4AF37]/5 flex justify-between items-center border-b border-[#D4AF37]/10">
                  <button 
                    onClick={() => { onSelectVerse(verseData.chapter, verseData.verse); onClose(); }}
                    className="text-[#D4AF37] font-medium text-sm hover:underline"
                  >
                    Chapter {verseData.chapter}, Verse {verseData.verse}
                  </button>
                  <div className="flex gap-2">
                    <button onClick={() => copyVerse(verseData, id)} className="text-gray-400 hover:text-white">
                      {copiedId === id ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                    <button onClick={() => removeSaved(id)} className="text-gray-400 hover:text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="p-3">
                  <p className="text-gray-300 text-sm mb-3 line-clamp-3">{verseData.translation_en}</p>
                  
                  <div className="relative">
                    {editingId === id ? (
                      <textarea
                        autoFocus
                        className="w-full bg-black/50 border border-[#D4AF37]/30 rounded-lg p-2 text-sm text-gray-200 focus:outline-none focus:border-[#D4AF37] resize-none"
                        rows={3}
                        value={notes[id] || ''}
                        onChange={(e) => saveNotes({ ...notes, [id]: e.target.value })}
                        onBlur={() => setEditingId(null)}
                      />
                    ) : (
                      <div 
                        onClick={() => setEditingId(id)}
                        className="w-full bg-black/30 border border-transparent hover:border-[#D4AF37]/20 rounded-lg p-2 text-sm text-gray-400 cursor-text min-h-[60px] flex items-start gap-2"
                      >
                        <Edit3 size={14} className="mt-0.5 opacity-50 shrink-0" />
                        <span className={notes[id] ? "text-gray-300" : "italic opacity-50"}>
                          {notes[id] || "Add a contemplation note..."}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {savedVersesFull.length > 0 && (
          <div className="p-4 border-t border-[#D4AF37]/20 bg-[#1A1A1A]">
            <button 
              onClick={exportJournal}
              className="w-full py-2.5 bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors"
            >
              <Download size={18} />
              Export Journal
            </button>
          </div>
        )}
      </div>
    </>
  );
}
