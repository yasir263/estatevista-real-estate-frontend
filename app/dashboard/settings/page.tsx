'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-serif font-bold text-[#111827]">Account Settings</h1>
      <div className="bg-white rounded-3xl p-8 border border-[#E5E7EB] space-y-6 shadow-sm">
        <div className="space-y-4">
          <h3 className="text-lg font-serif font-bold text-[#111827]">Email & SMS Alert Preferences</h3>
          <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
            <span>Send instant notifications when saved search matches are published</span>
            <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#B88746]" />
          </label>
          <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
            <span>Quarterly Global Luxury Market Report newsletter</span>
            <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#B88746]" />
          </label>
        </div>
        <Button variant="gold">Save Preferences</Button>
      </div>
    </div>
  );
}
