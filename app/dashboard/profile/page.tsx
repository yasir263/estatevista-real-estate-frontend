'use client';

import React from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { Button } from '@/components/ui/Button';

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-serif font-bold text-[#111827]">Member Profile</h1>
      <div className="bg-white rounded-3xl p-8 border border-[#E5E7EB] space-y-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Full Name</label>
            <input type="text" defaultValue={user?.name} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Email Address</label>
            <input type="email" defaultValue={user?.email} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Phone Number</label>
            <input type="tel" defaultValue={user?.phone || '+1 (555) 234-5678'} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Investor Role</label>
            <input type="text" defaultValue="Private Wealth Buyer" disabled className="w-full bg-slate-100 border border-slate-200 rounded-xl p-3 text-xs text-slate-500" />
          </div>
        </div>
        <Button variant="gold">Update Profile Information</Button>
      </div>
    </div>
  );
}
