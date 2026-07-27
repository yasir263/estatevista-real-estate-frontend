'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <Badge variant="gold">Private Advisory Inquiry</Badge>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#111827]">Contact EstateVista</h1>
        <p className="text-xs text-slate-500">Reach our global headquarters or request a confidential phone briefing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4 md:col-span-1">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-3">
            <MapPin className="w-5 h-5 text-[#B88746]" />
            <h4 className="font-serif font-bold text-slate-900 text-sm">New York Flagship</h4>
            <p className="text-xs text-slate-500">450 Park Avenue, 28th Floor, New York, NY 10022</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-3">
            <Phone className="w-5 h-5 text-[#B88746]" />
            <h4 className="font-serif font-bold text-slate-900 text-sm">Direct Phone Line</h4>
            <p className="text-xs text-slate-500">+1 (800) 555-0199</p>
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-serif font-bold">Message Transmitted</h3>
              <p className="text-xs text-slate-500">A senior advisor will reach out within 2 hours.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Your Name</label>
                <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#B88746]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Email</label>
                  <input type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#B88746]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Phone</label>
                  <input type="tel" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#B88746]" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Message</label>
                <textarea rows={4} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#B88746]" />
              </div>
              <Button variant="gold" className="w-full justify-center">Send Confidential Message</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
