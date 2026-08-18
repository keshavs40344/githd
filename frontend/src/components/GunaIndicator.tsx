'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { GunaType } from '@/types/mentor';

interface GunaIndicatorProps {
  guna: GunaType;
}

export default function GunaIndicator({ guna }: GunaIndicatorProps) {
  const normalized = (guna?.toLowerCase() || 'sattva') as 'sattva' | 'rajas' | 'tamas';

  const config = {
    sattva: {
      color: 'bg-emerald-500',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
      label: 'Sattva (Clarity & Wisdom)',
    },
    rajas: {
      color: 'bg-amber-500',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      label: 'Rajas (Action & Restlessness)',
    },
    tamas: {
      color: 'bg-slate-400',
      text: 'text-slate-300',
      border: 'border-slate-400/30',
      bg: 'bg-slate-400/10',
      label: 'Tamas (Inertia & Delusion)',
    },
  }[normalized] || {
    color: 'bg-gold-500',
    text: 'text-gold-400',
    border: 'border-gold-500/30',
    bg: 'bg-gold-500/10',
    label: guna,
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium uppercase tracking-wider",
      config.border, config.bg, config.text
    )}>
      <span className="relative flex h-2 w-2">
        <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", config.color)}></span>
        <span className={cn("relative inline-flex rounded-full h-2 w-2", config.color)}></span>
      </span>
      {config.label}
    </div>
  );
}
