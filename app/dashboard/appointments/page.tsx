'use client';

import React from 'react';
import { Calendar, Clock, Video, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export default function AppointmentsPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-serif font-bold text-[#111827]">Viewing Appointments</h1>
      <div className="space-y-4">
        <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB] space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <Badge variant="gold">In-Person Inspection</Badge>
            <span className="text-xs text-slate-400 font-mono">ID: APT-9021</span>
          </div>
          <h4 className="text-lg font-serif font-bold text-[#111827]">The Glass Pavilion Penthouse</h4>
          <p className="text-xs text-slate-500 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#B88746]" /> 2026-07-28 at 10:00 AM • Advisor: Eleanor Vance
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB] space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <Badge variant="green">Live Video Walkthrough</Badge>
            <span className="text-xs text-slate-400 font-mono">ID: APT-9024</span>
          </div>
          <h4 className="text-lg font-serif font-bold text-[#111827]">Villa Solstice Ocean Estate</h4>
          <p className="text-xs text-slate-500 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#B88746]" /> 2026-07-30 at 02:00 PM • Advisor: Marcus Thorne
          </p>
        </div>
      </div>
    </div>
  );
}
