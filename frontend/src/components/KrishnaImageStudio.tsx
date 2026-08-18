'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, Download, Copy, RefreshCw, Wand2, Image as ImageIcon, 
  Palette, Layers, Check, Type, Eye, ShieldCheck 
} from 'lucide-react';
import { Button } from './ui/Button';

interface ArtPreset {
  id: string;
  name: string;
  sanskrit: string;
  description: string;
  imagePrompt: string;
  bgGrad: [string, string, string];
  symbol: string;
  defaultShloka: { sanskrit: string; ref: string };
}

const ART_PRESETS: ArtPreset[] = [
  {
    id: 'kurukshetra_parth',
    name: 'Parthasarathy (Chariot of Cosmic Truth)',
    sanskrit: 'पार्थसारथि रूप',
    description: 'Bhagavan Shri Krishna holding the golden reins on the chariot amidst the sacred mists of Kurukshetra.',
    imagePrompt: 'Majestic golden chariot on Kurukshetra battlefield, Bhagavan Shri Krishna holding white horses reins, cosmic golden aura, divine peacock feather, celestial starlight',
    bgGrad: ['#0f0b03', '#241705', '#080501'],
    symbol: '🪔',
    defaultShloka: {
      sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
      ref: 'BG 2.47'
    }
  },
  {
    id: 'vrindavan_murlidhar',
    name: 'Murlidhar (Flute of Eternal Love)',
    sanskrit: 'वेणुगोपाल रूप',
    description: 'Lord Krishna playing the divine flute under the blooming Kadamba tree near the gentle Yamuna river.',
    imagePrompt: 'Shri Krishna playing golden bansuri flute, vibrant sacred peacocks, Yamuna river reflections, lotus blossoms, ethereal moonlight, emerald forest',
    bgGrad: ['#03140e', '#08291b', '#020b07'],
    symbol: '🪈',
    defaultShloka: {
      sanskrit: 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥',
      ref: 'BG 9.22'
    }
  },
  {
    id: 'vishwarupa_cosmic',
    name: 'Vishwarupa (The Universal Multiverse)',
    sanskrit: 'विश्वरूप दर्शन',
    description: 'The infinite cosmic manifestation containing all galaxies, stars, time, and realms in one blazing divine vision.',
    imagePrompt: 'Infinite cosmic multiverse form of Shri Krishna, thousands of celestial suns, galaxies revolving, time continuum, divine aura, sacred sacred geometry',
    bgGrad: ['#070414', '#150930', '#030208'],
    symbol: '🌌',
    defaultShloka: {
      sanskrit: 'तस्मात्त्वमुत्तिष्ठ यशो लभस्व जित्वा शत्रून्भुङ्क्ष्व राज्यं समृद्धम्।\nनिमित्तमात्रं भव सव्यसाचिन्॥',
      ref: 'BG 11.33'
    }
  },
  {
    id: 'govardhana_leela',
    name: 'Giridhari (The Supreme Protector)',
    sanskrit: 'गोवर्धनधारी रूप',
    description: 'Shri Krishna gently lifting Mount Govardhana on His little finger to shelter all beings from the turbulent storms of life.',
    imagePrompt: 'Shri Krishna lifting sacred Govardhana mountain on little finger, golden aura protecting people from celestial rain, radiant smile of absolute grace',
    bgGrad: ['#140707', '#2e0f0f', '#090202'],
    symbol: '🏔️',
    defaultShloka: {
      sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥',
      ref: 'BG 18.66'
    }
  },
  {
    id: 'atman_meditation',
    name: 'Yogeshwara (The Lord of Inner Mastery)',
    sanskrit: 'योगेश्वर स्वरूप',
    description: 'The silent seated indwelling witness (Antaryamin), radiating pure golden peace in the cave of the spiritual heart.',
    imagePrompt: 'Serene meditative Lord Krishna in Padmasana lotus posture, 1000-petaled golden lotus, Sahasrara chakra illumination, profound stillness of consciousness',
    bgGrad: ['#0d1117', '#1c2538', '#07090d'],
    symbol: '🧘',
    defaultShloka: {
      sanskrit: 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥',
      ref: 'BG 2.48'
    }
  }
];

const STYLES = [
  { id: 'celestial_gold', name: 'Celestial Gold & Obsidian', accent: '#dfa837', glow: 'rgba(223, 168, 55, 0.4)' },
  { id: 'sattvic_emerald', name: 'Sattvic Emerald & Forest', accent: '#34d399', glow: 'rgba(52, 211, 153, 0.4)' },
  { id: 'cosmic_azure', name: 'Cosmic Multiverse Indigo', accent: '#60a5fa', glow: 'rgba(96, 165, 250, 0.4)' },
  { id: 'sacred_ruby', name: 'Sacred Ruby & Sunrise', accent: '#f87171', glow: 'rgba(248, 113, 113, 0.4)' }
];

export default function KrishnaImageStudio() {
  const [selectedPreset, setSelectedPreset] = useState<ArtPreset>(ART_PRESETS[0]);
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0]);
  const [includeShloka, setIncludeShloka] = useState(true);
  const [customText, setCustomText] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '9:16' | '16:9'>('1:1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    renderCanvasArt();
  }, [selectedPreset, selectedStyle, includeShloka, customText, aspectRatio]);

  const renderCanvasArt = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dimensions based on aspect ratio
    let width = 1080;
    let height = 1080;
    if (aspectRatio === '9:16') {
      width = 1080;
      height = 1920;
    } else if (aspectRatio === '16:9') {
      width = 1920;
      height = 1080;
    }

    canvas.width = width;
    canvas.height = height;

    // 1. Background Radial Gradient
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.max(width, height) * 0.75;

    const grad = ctx.createRadialGradient(centerX, centerY * 0.7, 50, centerX, centerY, maxRadius);
    grad.addColorStop(0, selectedPreset.bgGrad[1]);
    grad.addColorStop(0.5, selectedPreset.bgGrad[0]);
    grad.addColorStop(1, selectedPreset.bgGrad[2]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Sacred Geometry Mandala Background Rings
    ctx.strokeStyle = `${selectedStyle.accent}20`;
    ctx.lineWidth = 2;
    for (let r = 80; r <= Math.min(width, height) * 0.45; r += 45) {
      ctx.beginPath();
      ctx.arc(centerX, centerY * 0.65, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Sacred rays
    ctx.strokeStyle = `${selectedStyle.accent}12`;
    ctx.lineWidth = 1.5;
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 12) {
      ctx.beginPath();
      ctx.moveTo(centerX, centerY * 0.65);
      ctx.lineTo(
        centerX + Math.cos(angle) * (Math.min(width, height) * 0.5),
        centerY * 0.65 + Math.sin(angle) * (Math.min(width, height) * 0.5)
      );
      ctx.stroke();
    }

    // 3. Central Divine Halo Aura
    const auraGrad = ctx.createRadialGradient(centerX, centerY * 0.65, 20, centerX, centerY * 0.65, 260);
    auraGrad.addColorStop(0, `${selectedStyle.accent}80`);
    auraGrad.addColorStop(0.4, `${selectedStyle.accent}30`);
    auraGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY * 0.65, 260, 0, Math.PI * 2);
    ctx.fill();

    // 4. Central Emblem / Sacred Icon
    ctx.font = `${Math.round(width * 0.12)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(selectedPreset.symbol, centerX, centerY * 0.62);

    // 5. Header Title
    ctx.fillStyle = selectedStyle.accent;
    ctx.font = 'bold 36px serif';
    ctx.fillText('ॐ  श्रीकृष्ण  ॐ', centerX, 110);

    ctx.font = '18px monospace';
    ctx.fillStyle = '#ffffff90';
    ctx.fillText(selectedPreset.sanskrit.toUpperCase(), centerX, 155);

    // Subtle divider
    ctx.strokeStyle = `${selectedStyle.accent}60`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(centerX - 180, 175);
    ctx.lineTo(centerX + 180, 175);
    ctx.stroke();

    // Preset Name
    ctx.font = 'bold 32px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(selectedPreset.name, centerX, height * 0.44);

    // 6. Shloka / Custom Text Overlay
    if (includeShloka) {
      const shlokaText = customText.trim() || selectedPreset.defaultShloka.sanskrit;
      const shlokaRef = customText.trim() ? 'DHARMA CONTEMPLATION' : `BHAGAVAD GITA ${selectedPreset.defaultShloka.ref}`;

      // Shloka Card Box
      const boxY = height * 0.72;
      const boxWidth = width * 0.85;
      const boxHeight = height * 0.22;
      const boxX = (width - boxWidth) / 2;

      ctx.fillStyle = '#050508bb';
      ctx.beginPath();
      ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 24);
      ctx.fill();

      ctx.strokeStyle = `${selectedStyle.accent}60`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Ref Badge
      ctx.fillStyle = selectedStyle.accent;
      ctx.font = 'bold 20px monospace';
      ctx.fillText(shlokaRef, centerX, boxY + 45);

      // Shloka Text
      ctx.font = 'bold 30px sans-serif';
      ctx.fillStyle = '#ffffff';
      wrapCanvasText(ctx, shlokaText, centerX, boxY + 95, boxWidth - 60, 44);
    }

    // 7. Outer Ornate Golden Border
    ctx.strokeStyle = selectedStyle.accent;
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    ctx.strokeStyle = `${selectedStyle.accent}40`;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(45, 45, width - 90, height - 90);

    // 8. Watermark Footer
    ctx.font = '16px monospace';
    ctx.fillStyle = `${selectedStyle.accent}80`;
    ctx.fillText('Dharma.OS • Divine Sacred Art Studio', centerX, height - 60);
  };

  const wrapCanvasText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const lines = text.split('\n');
    let currentY = y;

    lines.forEach((lineText) => {
      const words = lineText.split(' ');
      let currentLine = '';

      for (let n = 0; n < words.length; n++) {
        const testLine = currentLine + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(currentLine.trim(), x, currentY);
          currentLine = words[n] + ' ';
          currentY += lineHeight;
        } else {
          currentLine = testLine;
        }
      }
      ctx.fillText(currentLine.trim(), x, currentY);
      currentY += lineHeight;
    });
  };

  const downloadHD = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `Shri_Krishna_${selectedPreset.id}_HD.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const copyImage = async () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(async (blob) => {
      if (blob && navigator.clipboard) {
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          downloadHD();
        }
      }
    });
  };

  const triggerAIGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      renderCanvasArt();
    }, 600);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 z-10 relative">
      
      {/* Studio Header */}
      <div className="bg-gradient-to-br from-obsidian-900 via-obsidian-800 to-amber-950/40 border border-gold-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-400 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/30 flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>AI Krishna Sacred Art & 4K Wallpaper Studio</span>
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-gold-100 font-devanagari tracking-tight">
          दिव्य श्रीकृष्ण चित्र एवं श्लोक कला केंद्र
        </h1>
        <p className="text-xs sm:text-sm text-gold-300/80 font-sans leading-relaxed max-w-3xl">
          Generate, customize, and export ultra-high-definition sacred wallpapers, Krishna Leela portraits, and customized Shloka art pieces for your mobile, desktop, or spiritual altar.
        </p>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Controls Panel (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Preset Selector */}
          <div className="bg-obsidian-900/90 border border-gold-500/20 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-3">
            <label className="block text-xs font-mono uppercase tracking-widest text-gold-400 font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-gold-400" />
              <span>1. Choose Divine Krishna Manifestation (स्वरूप चयन)</span>
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ART_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPreset(preset)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer space-y-1 ${
                    selectedPreset.id === preset.id
                      ? 'bg-gold-500/15 border-gold-400/60 text-gold-100 shadow-[0_0_15px_rgba(223,168,55,0.25)] font-bold'
                      : 'bg-obsidian-800/60 border-gold-500/15 text-gold-300/70 hover:text-gold-100 hover:bg-obsidian-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{preset.symbol}</span>
                    <span className="text-xs font-mono">{preset.sanskrit}</span>
                  </div>
                  <p className="text-xs text-gold-200/90 font-sans line-clamp-1">{preset.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Aesthetic Theme & Aspect Ratio */}
          <div className="bg-obsidian-900/90 border border-gold-500/20 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-gold-400 font-bold mb-2 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-gold-400" />
                <span>2. Sacred Color Palette (दिव्य आभा)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style)}
                    className={`p-2.5 rounded-xl border text-center text-xs font-mono transition-all cursor-pointer ${
                      selectedStyle.id === style.id
                        ? 'bg-gold-500 text-obsidian-950 font-bold shadow-[0_0_12px_rgba(223,168,55,0.4)]'
                        : 'bg-obsidian-800 text-gold-300/80 border-gold-500/20 hover:text-gold-100'
                    }`}
                  >
                    {style.name.split('&')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio */}
            <div className="pt-2 border-t border-gold-500/10">
              <label className="block text-xs font-mono uppercase tracking-widest text-gold-400 font-bold mb-2 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-gold-400" />
                <span>3. Wallpaper Dimensions</span>
              </label>
              <div className="flex gap-2">
                {[
                  { key: '1:1', label: '1:1 Square (Avatar / Card)' },
                  { key: '9:16', label: '9:16 Portrait (Mobile Wallpaper)' },
                  { key: '16:9', label: '16:9 Landscape (Desktop 4K)' },
                ].map((ar) => (
                  <button
                    key={ar.key}
                    onClick={() => setAspectRatio(ar.key as typeof aspectRatio)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      aspectRatio === ar.key
                        ? 'bg-gold-400/20 text-gold-200 border border-gold-400/60 font-bold'
                        : 'bg-obsidian-800 text-gold-400/60 border border-gold-500/15 hover:text-gold-200'
                    }`}
                  >
                    {ar.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Shloka & Custom Text Customizer */}
          <div className="bg-obsidian-900/90 border border-gold-500/20 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase tracking-widest text-gold-400 font-bold flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-gold-400" />
                <span>4. Sanskrit Shloka Overlay</span>
              </label>
              <button
                onClick={() => setIncludeShloka(!includeShloka)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  includeShloka
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                    : 'bg-obsidian-800 text-obsidian-400 border border-gold-500/20'
                }`}
              >
                {includeShloka ? 'Overlay Enabled' : 'Overlay Disabled'}
              </button>
            </div>

            {includeShloka && (
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder={selectedPreset.defaultShloka.sanskrit}
                rows={3}
                className="w-full bg-obsidian-800 border border-gold-500/20 rounded-2xl p-3 text-xs text-gold-100 placeholder:text-obsidian-400 focus:border-gold-400 outline-none resize-none font-devanagari"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={triggerAIGenerate}
              variant="primary"
              size="md"
              className="flex-1 rounded-2xl font-bold font-mono text-xs gap-2 shadow-[0_0_20px_rgba(223,168,55,0.35)] cursor-pointer"
            >
              {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              <span>{isGenerating ? 'Rendering Sacred Geometry...' : 'Render Sacred Art Canvas'}</span>
            </Button>
          </div>

        </div>

        {/* Right Canvas Live Preview Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-obsidian-900 border border-gold-500/30 rounded-3xl p-5 shadow-2xl space-y-4 sticky top-24">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-gold-200 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-gold-400" />
                <span>Live High-Definition Canvas (1080p+)</span>
              </span>
              <span className="text-[10px] font-mono text-gold-400/60">{aspectRatio}</span>
            </div>

            {/* Canvas Container */}
            <div className="w-full relative rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl bg-black flex items-center justify-center max-h-[500px]">
              <canvas ref={canvasRef} className="max-w-full max-h-[480px] object-contain shadow-2xl" />
            </div>

            {/* Export Actions */}
            <div className="flex gap-2.5 pt-1">
              <Button
                onClick={copyImage}
                variant="secondary"
                size="sm"
                className="flex-1 rounded-xl text-xs font-mono gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied PNG!' : 'Copy Image'}</span>
              </Button>

              <Button
                onClick={downloadHD}
                variant="primary"
                size="sm"
                className="flex-1 rounded-xl text-xs font-mono font-bold gap-1.5 shadow-[0_0_15px_rgba(223,168,55,0.3)] cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download HD</span>
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
