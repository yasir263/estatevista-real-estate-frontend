'use client';

import React from 'react';
import { Bookmark, Trash2, Bell } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SavedSearchesPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-serif font-bold text-[#111827]">Saved Search Alerts</h1>
      <div className="space-y-4">
        <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB] flex items-center justify-between shadow-sm">
          <div>
            <h4 className="font-serif font-bold text-[#111827]">Manhattan Penthouses ($10M+)</h4>
            <span className="text-xs text-slate-500">Filter: Purpose=sale, Type=penthouse, City=New York</span>
          </div>
          <Button variant="outline" size="sm"><Trash2 className="w-4 h-4 text-rose-500" /></Button>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB] flex items-center justify-between shadow-sm">
          <div>
            <h4 className="font-serif font-bold text-[#111827]">Miami Beach Front Villas</h4>
            <span className="text-xs text-slate-500">Filter: Purpose=sale, Type=villa, City=Miami</span>
          </div>
          <Button variant="outline" size="sm"><Trash2 className="w-4 h-4 text-rose-500" /></Button>
        </div>
      </div>
    </div>
  );
}
