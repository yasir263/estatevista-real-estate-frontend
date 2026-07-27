'use client';

import React from 'react';
import { MortgageForm } from '@/components/forms/MortgageForm';
import { Badge } from '@/components/ui/Badge';

export default function MortgageCalculatorPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <Badge variant="gold">Financial Advisory</Badge>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#111827]">
          Luxury Mortgage Calculator
        </h1>
        <p className="text-sm text-slate-500 max-w-xl">
          Estimate monthly debt obligations, principal amortization, taxes, and property insurance for high-value acquisitions.
        </p>
      </div>

      <MortgageForm initialPrice={7500000} />
    </div>
  );
}
