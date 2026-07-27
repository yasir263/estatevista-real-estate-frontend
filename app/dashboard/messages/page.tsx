'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Send, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function MessagesPage() {
  const [activeThread, setActiveThread] = useState(0);

  const threads = [
    {
      id: 1,
      advisor: 'Eleanor Vance',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      property: 'The Glass Pavilion Penthouse',
      messages: [
        { sender: 'them', text: 'Good afternoon Alexander, I have prepared the private financial dossier for the Central Park penthouse.' },
        { sender: 'me', text: 'Thank you Eleanor. Looking forward to our 10:00 AM inspection tomorrow.' }
      ]
    },
    {
      id: 2,
      advisor: 'Marcus Thorne',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
      property: 'Villa Solstice Ocean Estate',
      messages: [
        { sender: 'them', text: 'The seller has agreed to the private inspection window on Friday.' }
      ]
    }
  ];

  const current = threads[activeThread];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-serif font-bold text-[#111827]">Advisor Messages</h1>

      <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-sm grid grid-cols-1 md:grid-cols-3 h-[550px] overflow-hidden">
        {/* Threads List */}
        <div className="border-r border-slate-100 overflow-y-auto custom-scrollbar">
          {threads.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setActiveThread(idx)}
              className={`w-full p-4 text-left border-b border-slate-100 transition-colors flex items-center gap-3 ${
                idx === activeThread ? 'bg-[#B88746]/10 border-l-4 border-l-[#B88746]' : 'hover:bg-slate-50'
              }`}
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image src={t.avatar} alt={t.advisor} fill className="object-cover" />
              </div>
              <div className="overflow-hidden">
                <h5 className="text-xs font-bold text-[#111827] truncate">{t.advisor}</h5>
                <p className="text-[10px] text-slate-400 truncate">{t.property}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Chat Window */}
        <div className="md:col-span-2 flex flex-col justify-between bg-slate-50/50">
          <div className="p-4 bg-white border-b border-slate-100 font-serif font-bold text-sm text-[#111827]">
            Conversations with {current.advisor} ({current.property})
          </div>

          <div className="p-6 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
            {current.messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    m.sender === 'me'
                      ? 'bg-[#111827] text-white rounded-br-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              placeholder="Type message to advisor..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#B88746]"
            />
            <Button variant="gold" size="sm"><Send className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
