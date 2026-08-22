'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Sparkles, CheckCircle2, Award, RefreshCw } from 'lucide-react';
import { sacredAudio } from '@/lib/sacredSounds';

interface ShlokaPronunciationTrainerProps {
  devanagari: string;
  iast: string;
  chapter: number;
  verse: number;
}

export default function ShlokaPronunciationTrainer({
  devanagari,
  iast,
  chapter,
  verse
}: ShlokaPronunciationTrainerProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [wordMatches, setWordMatches] = useState<{ word: string; matched: boolean }[]>([]);
  const [supported, setSupported] = useState(true);
  
  const recognitionRef = useRef<any>(null);

  // Clean words for comparison
  const targetWords = devanagari
    .replace(/[।॥,.]/g, ' ')
    .split(/\s+/)
    .filter(w => w.trim().length > 0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setSupported(false);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'hi-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
        setScore(null);
        setFeedback(null);
      };

      recognition.onresult = (event: any) => {
        const spokenText = event.results[0][0].transcript;
        setTranscript(spokenText);
        evaluatePronunciation(spokenText);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error !== 'no-speech') {
          setFeedback('ध्वनि स्पष्ट नहीं सुनी जा सकी। कृपया पुनः प्रयास करें।');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [devanagari]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      sacredAudio.playNavChime(0.06);
    } else {
      try {
        recognitionRef.current.start();
        sacredAudio.playTempleBell(0.2);
      } catch (err) {
        recognitionRef.current.stop();
        setTimeout(() => recognitionRef.current.start(), 200);
      }
    }
  };

  const evaluatePronunciation = (spoken: string) => {
    const spokenWords = spoken
      .replace(/[।॥,.]/g, ' ')
      .split(/\s+/)
      .map(w => w.trim().toLowerCase())
      .filter(w => w.length > 0);

    let matchCount = 0;
    const matches = targetWords.map(target => {
      const tClean = target.toLowerCase();
      const isMatched = spokenWords.some(sw => sw.includes(tClean) || tClean.includes(sw) || sw.slice(0, 3) === tClean.slice(0, 3));
      if (isMatched) matchCount++;
      return { word: target, matched: isMatched };
    });

    setWordMatches(matches);

    const rawScore = Math.min(100, Math.round((matchCount / Math.max(1, targetWords.length)) * 100) + 15);
    const finalScore = Math.min(99, Math.max(40, rawScore));
    setScore(finalScore);

    if (finalScore >= 85) {
      setFeedback('उत्तमम्! (Superb!) आपका उच्चारण अत्यंत शुद्ध और प्रामाणिक है।');
      sacredAudio.playTempleBell(0.3);
    } else if (finalScore >= 65) {
      setFeedback('शोभनम्! (Good!) उच्चारण उत्तम है, कठिन अक्षरों पर थोड़ा और ध्यान दें।');
      sacredAudio.playNavChime(0.1);
    } else {
      setFeedback('प्रयास जारी रखें! संस्कृत पदों का धीमी गति में एक-एक कर उच्चारण करें।');
    }
  };

  return (
    <div className="rounded-3xl bg-[#0f111c]/90 backdrop-blur-xl border border-[#c5a059]/30 p-5 sm:p-6 shadow-xl space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#c5a059]/20 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#c5a059]" />
          <div>
            <h3 className="text-sm font-serif font-bold text-[#f5eed9]">
              AI संस्कृत शुद्ध उच्चारण परीक्षक (Pronunciation Trainer)
            </h3>
            <span className="text-[10px] text-[#c5a059]/80 font-sans">
              माइक चालू करें और श्लोक बोलकर अपना शुद्धता स्कोर देखें
            </span>
          </div>
        </div>

        {score !== null && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-xs font-mono font-bold text-amber-300">
            <Award className="w-3.5 h-3.5" />
            <span>{score}% शुद्ध</span>
          </div>
        )}
      </div>

      {/* Target Shloka Interactive Words */}
      <div className="p-4 rounded-2xl bg-[#141624]/90 border border-[#c5a059]/20 space-y-3">
        <span className="text-[10px] font-sans font-bold text-[#c5a059] uppercase tracking-wider block">
          उच्चारण हेतु मूल श्लोक:
        </span>

        <div className="flex flex-wrap items-center gap-2">
          {(wordMatches.length > 0 ? wordMatches : targetWords.map(w => ({ word: w, matched: false }))).map((item, idx) => (
            <span
              key={idx}
              className={`px-2.5 py-1 rounded-xl text-xs sm:text-sm font-devanagari transition-all ${
                score !== null
                  ? item.matched
                    ? 'bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 font-bold'
                    : 'bg-amber-500/20 border border-amber-400/40 text-amber-200'
                  : 'bg-[#0a0c16] border border-[#c5a059]/20 text-[#f5eed9]'
              }`}
            >
              {item.word}
            </span>
          ))}
        </div>
      </div>

      {/* Live Mic Action & Result */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
        
        {/* Mic Button */}
        <button
          onClick={toggleListening}
          className={`h-11 px-5 rounded-full text-xs font-serif font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
            isListening
              ? 'bg-red-500 text-white animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.6)]'
              : 'bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-amber-600 text-black hover:scale-105 active:scale-95'
          }`}
        >
          {isListening ? (
            <>
              <MicOff className="w-4 h-4" />
              <span>सुन रहा हूँ... श्लोक बोलिए</span>
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              <span>🎤 माइक चालू करें और उच्चारण करें</span>
            </>
          )}
        </button>

        {/* Live Feedback Message */}
        {feedback && (
          <div className="flex items-center gap-2 text-xs font-serif text-[#e6c687] bg-[#141624] px-4 py-2 rounded-2xl border border-[#c5a059]/20">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

      </div>

      {/* Spoken Text Display */}
      {transcript && (
        <div className="p-3 rounded-xl bg-[#090b14] border border-[#c5a059]/20 text-xs font-serif text-[#c5a059]/90 italic">
          <span className="font-sans font-bold text-[10px] text-[#c5a059] uppercase block mb-0.5">
            आपकी ध्वनि (Captured):
          </span>
          &ldquo;{transcript}&rdquo;
        </div>
      )}

    </div>
  );
}
