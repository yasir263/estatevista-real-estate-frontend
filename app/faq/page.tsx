'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: 'How does EstateVista verify luxury properties?', a: 'Every property listed on EstateVista undergoes strict physical inspection, architectural title verification, and valuation underwriting by licensed estate directors.' },
    { q: 'What is an off-market private listing?', a: 'Off-market listings represent confidential sales where high-net-worth owners choose not to publicly index their properties on public MLS systems.' },
    { q: 'Can I request custom 3D virtual walkthroughs?', a: 'Yes, our media team coordinates 4K Matterport 3D spatial scans and guided live video walkthroughs for international buyers.' }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div className="text-center max-w-md mx-auto space-y-2">
        <Badge variant="gold">Knowledge Center</Badge>
        <h1 className="text-3xl font-serif font-bold text-[#111827]">Frequently Asked Questions</h1>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-5 text-left font-serif font-bold text-[#111827] text-sm flex items-center justify-between"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === idx && (
              <div className="p-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
