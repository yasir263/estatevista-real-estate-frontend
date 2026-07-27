import React from 'react';

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-serif font-bold text-[#111827]">Terms of Service</h1>
      <p className="text-xs text-slate-500">Effective Date: January 1, 2026</p>
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-4">
        <p>By accessing or utilizing the EstateVista digital platform, you agree to comply with all applicable international real estate licensing and anti-money laundering regulations.</p>
        <h3 className="text-sm font-serif font-bold text-slate-900">Proprietary Assets</h3>
        <p>All architectural imagery, floor plan diagrams, and market data remain intellectual property of EstateVista and its partner brokerages.</p>
      </div>
    </div>
  );
}
