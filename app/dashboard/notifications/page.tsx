'use client';

import React from 'react';
import { Bell, TrendingDown, Calendar } from 'lucide-react';

export default function NotificationsPage() {
  const notifications = [
    { title: 'Price Reduction Alert', text: 'The Sovereign Manor in Mayfair reduced listing price by $500,000.', time: '2 hours ago' },
    { title: 'Viewing Appointment Confirmed', text: 'Eleanor Vance confirmed your viewing for The Glass Pavilion.', time: '1 day ago' },
    { title: 'New Off-Market Listing', text: 'A new 8,000 sqft oceanfront villa in Miami Beach was added to Star Island portfolio.', time: '3 days ago' }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-serif font-bold text-[#111827]">Notifications Center</h1>

      <div className="space-y-3">
        {notifications.map((n, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-4 border border-[#E5E7EB] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#B88746]/10 text-[#B88746]">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#111827]">{n.title}</h5>
                <p className="text-xs text-slate-500">{n.text}</p>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
