'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Send, CheckCircle2 } from 'lucide-react';
import { Property } from '@/types/property';
import { Agent } from '@/types/agent';

interface PropertyInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
  agent?: Agent | null;
  mode?: 'inquiry' | 'tour';
}

export const PropertyInquiryModal: React.FC<PropertyInquiryModalProps> = ({
  isOpen,
  onClose,
  property,
  mode = 'inquiry'
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '10:00 AM',
    tourType: 'in-person',
    message: mode === 'tour' ? `I would like to schedule a private viewing for ${property.title}.` : `I am interested in learning more about ${property.title}.`
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={mode === 'tour' ? 'Schedule Private Viewing' : 'Request Property Dossier'}
      maxWidth="md"
    >
      {submitted ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h4 className="text-xl font-serif font-bold text-[#111827]">Request Received</h4>
          <p className="text-sm text-slate-500 max-w-xs mx-auto">
            Our luxury advisory team will contact you within 2 business hours to confirm your request for {property.title}.
          </p>
          <Button variant="primary" onClick={handleReset} className="w-full justify-center">
            Close Window
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-200 overflow-hidden relative flex-shrink-0">
              <Image src={property.images[0]} alt={property.title} fill className="object-cover" />
            </div>
            <div>
              <h5 className="text-xs font-serif font-bold text-[#111827] line-clamp-1">{property.title}</h5>
              <span className="text-[11px] text-[#B88746] font-semibold">{property.currency}{property.price.toLocaleString()}</span>
            </div>
          </div>

          {mode === 'tour' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Preferred Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Time Slot</label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                >
                  <option>10:00 AM</option>
                  <option>01:00 PM</option>
                  <option>04:00 PM</option>
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Lord Julian Sterling"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#B88746]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="name@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#B88746]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Phone Number</label>
              <input
                type="tel"
                required
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#B88746]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Notes / Special Requirements</label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#B88746]"
            />
          </div>

          <Button variant="gold" isLoading={loading} className="w-full justify-center py-3">
            <Send className="w-4 h-4 mr-2" /> Submit Request
          </Button>
        </form>
      )}
    </Modal>
  );
};
