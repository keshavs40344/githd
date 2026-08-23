'use client';

import React, { useEffect, useState, useRef } from 'react';
import { sacredAudio } from '@/lib/sacredSounds';

// ── Floating OM particles ──
function OmParticle({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <div className="absolute bottom-0 pointer-events-none select-none"
      style={{
        left: `${x}%`,
        animation: `omFloat ${8 + Math.random() * 6}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        opacity: 0,
      }}>
      <span style={{ fontSize: `${size}px`, color: `rgba(245,158,11,${0.08 + Math.random() * 0.1})` }}
        className="font-devanagari">ॐ</span>
    </div>
  );
}

// ── Single diya flame ──
function Diya({ x, y, scale = 1, delay = 0 }: { x: string; y: string; scale?: number; delay?: number }) {
  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y, transform: `scale(${scale})`, animationDelay: `${delay}s` }}>
      {/* Bowl */}
      <div className="relative flex flex-col items-center">
        {/* Flame layers */}
        <div className="relative w-3 h-5 flex flex-col items-center" style={{ marginBottom: '-2px' }}>
          {/* Inner flame (white-gold core) */}
          <div className="absolute bottom-0 w-1.5 h-3 rounded-full animate-diya-flame"
            style={{ background: 'radial-gradient(ellipse at bottom, #fff 0%, #fef08a 40%, #f59e0b 100%)' }} />
          {/* Outer flame (orange aura) */}
          <div className="absolute bottom-0 w-2.5 h-4 rounded-full animate-diya-flicker"
            style={{ background: 'radial-gradient(ellipse at bottom, #fef08a 0%, #f97316 50%, transparent 100%)', animationDelay: `${delay}s` }} />
          {/* Glow */}
          <div className="absolute bottom-0 w-6 h-6 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)', transform: 'translateY(50%)' }} />
        </div>
        {/* Wick */}
        <div className="w-0.5 h-1 bg-amber-900 rounded-full" />
        {/* Diya body (clay pot) */}
        <div className="w-5 h-2 rounded-b-full rounded-t-sm"
          style={{ background: 'linear-gradient(180deg, #c2410c 0%, #9a3412 100%)' }} />
      </div>
    </div>
  );
}

// ── Incense smoke ──
function IncenseSmoke({ x }: { x: string }) {
  return (
    <div className="absolute bottom-0 pointer-events-none" style={{ left: x }}>
      {/* Stick */}
      <div className="w-0.5 h-16 bg-amber-900/60 rounded-full relative">
        {/* Burning tip glow */}
        <div className="absolute top-0 w-1.5 h-1.5 rounded-full -translate-x-0.5 -translate-y-0.5 bg-orange-500 shadow-[0_0_4px_rgba(249,115,22,0.8)]" />
        {/* Smoke wisps */}
        {[0, 1, 2].map(i => (
          <div key={i} className="absolute -top-1 left-0 w-px"
            style={{
              animation: `smokeRise ${2.5 + i * 0.7}s ease-out infinite`,
              animationDelay: `${i * 0.8}s`,
              height: '40px',
              background: 'linear-gradient(to top, rgba(245,158,11,0.25), transparent)',
              borderRadius: '50%',
              transform: `translateX(${(i - 1) * 3}px)`,
            }} />
        ))}
      </div>
    </div>
  );
}

// ── Main TempleAtmosphere component ──
export default function TempleAtmosphere({ enableAudio = false }: { enableAudio?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [omOn, setOmOn] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (enableAudio && mounted) {
      const t = setTimeout(() => {
        sacredAudio.startOmAmbient(0.04);
        setOmOn(true);
      }, 1500);
      return () => { clearTimeout(t); sacredAudio.stopOmAmbient(); };
    }
  }, [enableAudio, mounted]);

  if (!mounted) return null;

  const OM_PARTICLES = Array.from({ length: 12 }, (_, i) => ({
    x: 5 + Math.random() * 90,
    delay: i * 1.2,
    size: 14 + Math.random() * 18,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* ── Warm Temple Glow Background ── */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(180,83,9,0.06) 0%, transparent 70%)' }} />

      {/* ── Floating OM Particles ── */}
      {OM_PARTICLES.map((p, i) => (
        <OmParticle key={i} x={p.x} delay={p.delay} size={p.size} />
      ))}

      {/* ── Diyas — bottom left row ── */}
      <Diya x="2%" y="calc(100% - 60px)" scale={0.7} delay={0} />
      <Diya x="6%" y="calc(100% - 55px)" scale={0.6} delay={0.4} />
      <Diya x="10%" y="calc(100% - 62px)" scale={0.75} delay={0.8} />

      {/* ── Diyas — bottom right row ── */}
      <Diya x="87%" y="calc(100% - 60px)" scale={0.7} delay={0.2} />
      <Diya x="91%" y="calc(100% - 55px)" scale={0.6} delay={0.6} />
      <Diya x="95%" y="calc(100% - 62px)" scale={0.75} delay={1.0} />

      {/* ── Incense sticks ── */}
      <IncenseSmoke x="15%" />
      <IncenseSmoke x="82%" />

      {/* ── Top temple arch decoration ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl">
        <div className="flex justify-center gap-4 pt-1 opacity-20">
          {['ॐ', '🪷', '॰', '🪷', 'ॐ'].map((s, i) => (
            <span key={i} className="font-devanagari text-amber-400 text-xs animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
