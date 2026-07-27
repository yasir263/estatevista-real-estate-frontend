import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4 space-y-4">
      <h1 className="text-8xl font-serif font-bold text-[#B88746]">404</h1>
      <h2 className="text-2xl font-serif font-bold text-[#111827]">Residence Not Found</h2>
      <p className="text-sm text-slate-500 max-w-sm">
        The luxury estate or page you requested may have been archived or privatized.
      </p>
      <Link href="/">
        <Button variant="gold">Return to Home</Button>
      </Link>
    </div>
  );
}
