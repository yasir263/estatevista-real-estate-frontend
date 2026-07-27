import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    { title: 'Standard Representation', price: '3%', desc: 'Full traditional marketing and advisory representation.', features: ['Global MLS Exposure', 'High-Res Digital Photography', 'Standard Advisory Team'] },
    { title: 'Signature Exclusivity', price: '4.5%', desc: 'Off-market confidential buyer matching & 3D virtual production.', features: ['Matterport 3D Scanning', 'Drone Videography', 'Off-Market Quiet Representation', 'Dedicated Managing Director'] }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <Badge variant="gold">Listing Packages</Badge>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#111827]">Sellers Commission & Tiered Services</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {plans.map((p, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-8 border border-[#E5E7EB] shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-bold text-[#111827]">{p.title}</h3>
              <div className="text-4xl font-bold text-[#B88746] font-serif">{p.price} <span className="text-xs text-slate-400 font-sans font-normal">commission rate</span></div>
              <p className="text-xs text-slate-500">{p.desc}</p>
              <ul className="space-y-2 text-xs text-slate-700 pt-4 border-t border-slate-100">
                {p.features.map((f, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B88746]" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <Button variant="gold" className="w-full justify-center">Consult Valuation Director</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
