'use client';

import React, { useRef, useEffect, useState } from 'react';
import { X, Download, Copy, Sparkles, Check } from 'lucide-react';
import type { SevenLayerMentorDiagnosis } from '@/types/mentor';
import { Button } from './ui/Button';

interface WisdomCardModalProps {
  diagnosis: SevenLayerMentorDiagnosis;
  onClose: () => void;
}

const THEMES = {
  'Obsidian Gold': { bg1: '#070709', bg2: '#16141a', text: '#dfa837', accent: '#f59e0b', subtext: '#fef3c7' },
  'Sattvic Emerald': { bg1: '#04130c', bg2: '#0d2818', text: '#34d399', accent: '#10b981', subtext: '#d1fae5' },
  'Cosmic Indigo': { bg1: '#050816', bg2: '#0e1630', text: '#60a5fa', accent: '#3b82f6', subtext: '#dbeafe' }
};

type ThemeKey = keyof typeof THEMES;

export default function WisdomCardModal({ diagnosis, onClose }: WisdomCardModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [theme, setTheme] = useState<ThemeKey>('Obsidian Gold');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    drawCard();
  }, [diagnosis, theme]);

  const drawCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High resolution 1080x1080
    canvas.width = 1080;
    canvas.height = 1080;
    const colors = THEMES[theme];

    // Background Gradient
    const grad = ctx.createRadialGradient(540, 540, 100, 540, 540, 750);
    grad.addColorStop(0, colors.bg2);
    grad.addColorStop(1, colors.bg1);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1080);

    // Outer Decorative Border
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 1000, 1000);

    // Inner Subtle Border
    ctx.strokeStyle = `${colors.accent}40`;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(55, 55, 970, 970);

    // Header Emblem
    ctx.fillStyle = colors.text;
    ctx.font = 'bold 34px serif';
    ctx.textAlign = 'center';
    ctx.fillText('ॐ  DHARMA.OS  ॐ', 540, 120);

    ctx.font = '18px monospace';
    ctx.fillStyle = `${colors.text}90`;
    ctx.fillText('DIVINE KRISHNA GUIDANCE', 540, 155);

    // Divider Line
    ctx.strokeStyle = `${colors.accent}60`;
    ctx.beginPath();
    ctx.moveTo(340, 175);
    ctx.lineTo(740, 175);
    ctx.stroke();

    // Shloka Reference
    ctx.fillStyle = colors.accent;
    ctx.font = 'bold 26px monospace';
    ctx.fillText(`BHAGAVAD GITA ${diagnosis.shloka_meta.chapter}.${diagnosis.shloka_meta.verse}`, 540, 230);

    // Sanskrit Shloka
    ctx.font = 'bold 42px sans-serif';
    ctx.fillStyle = '#ffffff';
    wrapText(ctx, diagnosis.shloka_meta.sanskrit_devanagari, 540, 310, 880, 60);

    // English Translation
    ctx.font = 'italic 26px serif';
    ctx.fillStyle = colors.subtext;
    wrapText(ctx, `"${diagnosis.simple_translation}"`, 540, 500, 840, 40);

    // Shri Krishna Uvacha
    ctx.fillStyle = `${colors.accent}25`;
    ctx.beginPath();
    ctx.roundRect(100, 640, 880, 160, 20);
    ctx.fill();

    ctx.strokeStyle = `${colors.accent}50`;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = colors.text;
    ctx.font = 'bold 22px monospace';
    ctx.fillText('SHRI KRISHNA UVACHA', 540, 675);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'italic 22px serif';
    wrapText(ctx, `"${diagnosis.shri_krishna_uvacha.deep_counsel}"`, 540, 715, 820, 34);

    // Action Commitment
    ctx.fillStyle = colors.accent;
    ctx.font = 'bold 20px monospace';
    ctx.fillText(`DHARMA ACTION: ${diagnosis.shri_krishna_uvacha.immediate_24hr_dharma_action}`, 540, 860);

    // Guna Badge
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.roundRect(415, 910, 250, 44, 22);
    ctx.fill();

    ctx.fillStyle = '#050508';
    ctx.font = 'bold 18px monospace';
    ctx.fillText(`GUNA: ${diagnosis.psychological_telemetry.dominant_guna.toUpperCase()}`, 540, 938);

    // Watermark
    ctx.fillStyle = `${colors.text}60`;
    ctx.font = '16px monospace';
    ctx.fillText('calm-kepler • dharma-os.ai', 540, 1000);
  };

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, currentY);
  };

  const download = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `Krishna_Divine_Counsel_BG_${diagnosis.shloka_meta.chapter}_${diagnosis.shloka_meta.verse}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const copyToClipboard = async () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(async (blob) => {
      if (blob && navigator.clipboard) {
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          download();
        }
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
      <div className="bg-obsidian-900 border border-gold-500/30 p-5 sm:p-7 rounded-3xl max-w-xl w-full flex flex-col gap-5 max-h-[92vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <h2 className="text-base font-bold text-gold-100">Divine Wisdom Card</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-obsidian-400 hover:text-gold-200 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Picker */}
        <div className="flex gap-2">
          {(Object.keys(THEMES) as ThemeKey[]).map(t => (
            <button 
              key={t}
              onClick={() => setTheme(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                theme === t 
                  ? 'bg-gold-500 text-obsidian-950 font-bold shadow-[0_0_12px_rgba(223,168,55,0.4)]' 
                  : 'bg-obsidian-800 text-gold-300/80 hover:text-gold-100 border border-gold-500/20'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Canvas Card Preview */}
        <div className="w-full aspect-square relative rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl bg-black">
          <canvas ref={canvasRef} className="w-full h-full object-contain" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end pt-1">
          <Button 
            onClick={copyToClipboard} 
            variant="secondary" 
            size="sm" 
            className="rounded-xl text-xs gap-2 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied PNG!' : 'Copy Image'}</span>
          </Button>

          <Button 
            onClick={download} 
            variant="primary" 
            size="sm" 
            className="rounded-xl text-xs gap-2 shadow-[0_0_15px_rgba(223,168,55,0.35)] cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download HD (1080x1080)</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

