'use client';

import React from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';
import { Property } from '@/types/property';
import { formatPrice } from '@/lib/utils';

interface PropertyMapProps {
  properties: Property[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  selectedId,
  onSelect,
  className = 'h-[600px]'
}) => {
  return (
    <div className={`relative w-full rounded-3xl overflow-hidden bg-[#0B1220] border border-white/10 ${className}`}>
      {/* Decorative Simulated Interactive Map Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

      {/* Map Control Badges */}
      <div className="absolute top-4 left-4 z-10 bg-[#0B1220]/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-white text-xs flex items-center gap-2">
        <Compass className="w-4 h-4 text-[#B88746] animate-spin-slow" />
        <span>Map View ({properties.length} Properties Located)</span>
      </div>

      {/* Interactive Markers Grid */}
      <div className="absolute inset-0 p-8 flex flex-wrap items-center justify-around overflow-auto custom-scrollbar">
        {properties.map((p, idx) => {
          const isSelected = p.id === selectedId;
          return (
            <button
              key={p.id}
              onClick={() => onSelect?.(p.id)}
              style={{
                transform: `translate(${(idx * 17) % 60}px, ${(idx * 23) % 80}px)`
              }}
              className={`m-4 relative group transition-all duration-300 ${
                isSelected ? 'scale-110 z-20' : 'hover:scale-105 z-10'
              }`}
            >
              <div
                className={`px-3 py-1.5 rounded-full font-serif text-xs font-bold shadow-2xl border transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#B88746] text-white border-white'
                    : 'bg-[#111827] text-slate-100 border-white/20 group-hover:border-[#B88746] group-hover:bg-[#0B1220]'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-[#B88746]" />
                <span>{formatPrice(p.price, p.currency, p.period)}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom info bar */}
      <div className="absolute bottom-4 right-4 z-10 bg-[#0B1220]/90 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-slate-300 text-xs flex items-center gap-2">
        <Navigation className="w-3.5 h-3.5 text-[#B88746]" />
        <span>Click pin to inspect property details</span>
      </div>
    </div>
  );
};
