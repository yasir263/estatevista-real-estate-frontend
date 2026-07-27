'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#E5E7EB] shadow-xl space-y-6">
        <h1 className="text-2xl font-serif font-bold text-[#111827] text-center">Set New Password</h1>
        <form onSubmit={(e) => { e.preventDefault(); alert('Password updated!'); }} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">New Password</label>
            <input
              type="password"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
            />
          </div>
          <Button variant="gold" className="w-full justify-center">Update Password</Button>
        </form>
      </div>
    </div>
  );
}
