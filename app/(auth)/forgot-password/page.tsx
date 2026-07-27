'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#E5E7EB] shadow-xl space-y-6 text-center">
        <h1 className="text-2xl font-serif font-bold text-[#111827]">Reset Your Password</h1>
        <p className="text-xs text-slate-500">
          Enter your account email address and we will send you confidential password reset instructions.
        </p>

        {submitted ? (
          <div className="space-y-4 pt-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <p className="text-xs text-slate-600">Password reset link has been dispatched to your email.</p>
            <Link href="/login">
              <Button variant="gold" className="w-full justify-center">Return to Login</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            <input
              type="email"
              required
              placeholder="name@example.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#B88746]"
            />
            <Button variant="gold" className="w-full justify-center">Send Recovery Email</Button>
          </form>
        )}
      </div>
    </div>
  );
}
