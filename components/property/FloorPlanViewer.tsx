'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Layers, Bed, Bath, Maximize2 } from 'lucide-react';
import { FloorPlan } from '@/types/property';

export const FloorPlanViewer: React.FC<{ floorPlans?: FloorPlan[] }> = ({ floorPlans }) => {
  const [activePlan, setActivePlan] = useState<number>(0);

  if (!floorPlans || floorPlans.length === 0) return null;

  const current = floorPlans[activePlan] || floorPlans[0];

  return (
    <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
        <Layers className="w-5 h-5 text-[#B88746]" />
        <h3 className="text-xl font-serif font-bold text-[#111827]">Architectural Floor Plans</h3>
      </div>

      {/* Tabs Switcher */}
      <div className="flex gap-2 border-b border-slate-200 overflow-x-auto custom-scrollbar">
        {floorPlans.map((fp, idx) => (
          <button
            key={fp.id}
            onClick={() => setActivePlan(idx)}
            className={`pb-3 px-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
              idx === activePlan
                ? 'border-[#B88746] text-[#B88746]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {fp.name}
          </button>
        ))}
      </div>

      {/* Selected Floorplan Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <div className="space-y-4">
          <h4 className="text-lg font-serif font-bold text-[#111827]">{current.name}</h4>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-[#B88746]" />
              <span>Bedrooms: <strong>{current.beds}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-4 h-4 text-[#B88746]" />
              <span>Bathrooms: <strong>{current.baths}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-[#B88746]" />
              <span>Total Area: <strong>{current.sqft.toLocaleString()} sqft</strong></span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 relative h-80 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
          <Image
            src={current.image}
            alt={current.name}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};
