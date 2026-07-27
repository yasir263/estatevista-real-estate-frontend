import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'green' | 'dark' | 'outline' | 'slate';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'dark', className }) => {
  const variants = {
    gold: 'bg-[#B88746]/10 text-[#B88746] border border-[#B88746]/30',
    green: 'bg-[#2D6A5F]/10 text-[#2D6A5F] border border-[#2D6A5F]/30',
    dark: 'bg-[#111827] text-white',
    outline: 'bg-white/80 backdrop-blur-md text-[#111827] border border-[#E5E7EB]',
    slate: 'bg-slate-100 text-slate-700 border border-slate-200'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
