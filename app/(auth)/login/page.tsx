'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building2, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email || 'alexander.w@example.com');
      setLoading(false);
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#E5E7EB] shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#B88746] text-white mx-auto flex items-center justify-center shadow-md">
            <Building2 className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#111827]">Welcome Back</h1>
          <p className="text-xs text-slate-500">Sign in to your private EstateVista portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alexander@example.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#B88746]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-600">Password</label>
              <Link href="/forgot-password" className="text-xs text-[#B88746] hover:underline font-semibold">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#B88746]"
              />
            </div>
          </div>

          <Button variant="gold" isLoading={loading} className="w-full justify-center py-3">
            Sign In to Portal <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </form>

        <p className="text-xs text-center text-slate-500 pt-2 border-t border-slate-100">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-[#B88746] font-bold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
