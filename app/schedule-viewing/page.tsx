'use client';

import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, User, Building } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MOCK_PROPERTIES, MOCK_AGENTS } from '@/services/mock/data';

export default function ScheduleViewingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPropId, setSelectedPropId] = useState(MOCK_PROPERTIES[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8">
      <div className="space-y-2 border-b border-slate-200 pb-6 text-center">
        <Badge variant="gold">Private Appointment</Badge>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#111827]">
          Schedule a Private Inspection
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Reserve an exclusive in-person or live video tour with a designated estate advisor.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-slate-200 shadow-md">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#111827]">Appointment Confirmed</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Your viewing request has been assigned to a managing director. A calendar confirmation will be sent shortly.
          </p>
          <Button variant="primary" onClick={() => setSubmitted(false)}>
            Schedule Another Tour
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-[#E5E7EB] shadow-sm space-y-6">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">Select Property</label>
            <select
              value={selectedPropId}
              onChange={(e) => setSelectedPropId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-[#B88746]"
            >
              {MOCK_PROPERTIES.slice(0, 10).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} - ${p.price.toLocaleString()} ({p.location.city})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">Preferred Date</label>
              <input
                type="date"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#B88746]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">Time Window</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#B88746]">
                <option>Morning (10:00 AM - 12:00 PM)</option>
                <option>Afternoon (01:00 PM - 03:00 PM)</option>
                <option>Late Afternoon (04:00 PM - 06:00 PM)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="Lord Julian Sterling"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#B88746]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-1">Phone Number</label>
              <input
                type="tel"
                required
                placeholder="+1 (555) 019-2831"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#B88746]"
              />
            </div>
          </div>

          <Button variant="gold" isLoading={loading} className="w-full justify-center py-3.5 text-base">
            Confirm Private Inspection Appointment
          </Button>
        </form>
      )}
    </div>
  );
}
