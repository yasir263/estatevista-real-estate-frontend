'use client';

import React from 'react';
import Link from 'next/link';
import { MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#E5E7EB] shadow-xl text-center space-y-4">
        <MailCheck className="w-12 h-12 text-[#B88746] mx-auto" />
        <h1 className="text-2xl font-serif font-bold text-[#111827]">Verify Your Email</h1>
        <p className="text-xs text-slate-500">
          We have sent a verification code to your email address. Please click the link inside to activate your account.
        </p>
        <Link href="/login">
          <Button variant="gold" className="w-full justify-center mt-2">Proceed to Login</Button>
        </Link>
      </div>
    </div>
  );
}
