'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'interactive';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl bg-obsidian-800/60 backdrop-blur-xl border border-white/5',
          {
            'shadow-lg': variant === 'elevated',
            'transition-all hover:border-gold-500/50 cursor-pointer': variant === 'interactive',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';
