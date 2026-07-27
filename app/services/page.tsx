import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, Key, Compass, TrendingUp } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    { title: 'Off-Market Buyer Representation', desc: 'Access quiet listings and private sales not indexed on public MLS systems.', icon: Key },
    { title: 'Architectural Valuation & Underwriting', desc: 'Empirical price-per-square-foot modeling and replacement cost analysis.', icon: TrendingUp },
    { title: 'Discreet Seller Advisory', desc: 'Targeted high-net-worth marketing without public footprint exposure.', icon: ShieldCheck },
    { title: 'Global Relocation & Concierge', desc: 'Full legal, tax, and residency orientation in top financial hubs.', icon: Compass }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <Badge variant="gold">Bespoke Advisory Services</Badge>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#111827]">
          White-Glove Real Estate Solutions
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white rounded-3xl p-8 border border-[#E5E7EB] shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#B88746]/10 text-[#B88746] flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#111827]">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
