'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4 space-y-4">
      <h2 className="text-3xl font-serif font-bold text-[#111827]">An Unexpected Error Occurred</h2>
      <p className="text-sm text-slate-500 max-w-sm">
        We encountered an error loading this private page. Please try refreshing.
      </p>
      <Button variant="gold" onClick={reset}>Try Again</Button>
    </div>
  );
}
