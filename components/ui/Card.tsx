import React from 'react';
import { cn } from '@/lib/utils';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('bg-white rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden', className)}>
    {children}
  </div>
);

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('p-6 pb-4 border-b border-slate-100', className)}>{children}</div>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('p-6', className)}>{children}</div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('p-6 pt-4 border-t border-slate-100 bg-slate-50/50', className)}>{children}</div>
);
