import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="gold">Our Legacy</Badge>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#111827]">
          Redefining Global Luxury Real Estate
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          EstateVista was founded on a commitment to architectural distinction, uncompromising privacy, and empirical valuation modeling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative h-96 rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="EstateVista Architecture"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-serif font-bold text-[#111827]">
            Empowering Discerning Buyers & Sovereign Investors
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our private advisory firm works with family offices, tech founders, and architectural enthusiasts. We represent properties that transcend standard residential real estate—buildings that stand as true works of art.
          </p>
          <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-6">
            <div>
              <span className="text-3xl font-serif font-bold text-[#B88746]">$4.2B+</span>
              <span className="text-xs text-slate-500 block">Career Transactions</span>
            </div>
            <div>
              <span className="text-3xl font-serif font-bold text-[#B88746]">12</span>
              <span className="text-xs text-slate-500 block">Metropolitan Capitals</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
