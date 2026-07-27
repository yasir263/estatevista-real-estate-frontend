'use client';

import React from 'react';
import { X } from 'lucide-react';
import { PropertyFilterState } from '@/types/filter';

interface ActiveFilterChipsProps {
  filters: PropertyFilterState;
  onRemove: (key: keyof PropertyFilterState, value?: unknown) => void;
  onReset: () => void;
}

export const ActiveFilterChips: React.FC<ActiveFilterChipsProps> = ({ filters, onRemove, onReset }) => {
  const chips: { label: string; key: keyof PropertyFilterState; value?: unknown }[] = [];

  if (filters.purpose && filters.purpose !== 'all') {
    chips.push({ label: `Purpose: ${filters.purpose}`, key: 'purpose' });
  }

  if (filters.type && filters.type !== 'all') {
    chips.push({ label: `Type: ${filters.type}`, key: 'type' });
  }

  if (filters.city) {
    chips.push({ label: `City: ${filters.city}`, key: 'city' });
  }

  if (filters.priceMin) {
    chips.push({ label: `Min $: ${filters.priceMin.toLocaleString()}`, key: 'priceMin' });
  }

  if (filters.priceMax) {
    chips.push({ label: `Max $: ${filters.priceMax.toLocaleString()}`, key: 'priceMax' });
  }

  if (filters.bedrooms) {
    chips.push({ label: `Beds: ${filters.bedrooms}+`, key: 'bedrooms' });
  }

  if (filters.verified) {
    chips.push({ label: 'Verified', key: 'verified' });
  }

  if (filters.virtualTour) {
    chips.push({ label: 'Virtual Tour', key: 'virtualTour' });
  }

  if (filters.amenities && filters.amenities.length > 0) {
    filters.amenities.forEach((amenity) => {
      chips.push({ label: amenity, key: 'amenities', value: amenity });
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      <span className="text-xs text-slate-400 font-medium">Active Filters:</span>
      {chips.map((chip, idx) => (
        <span
          key={idx}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111827] text-white text-xs font-medium"
        >
          {chip.label}
          <button
            onClick={() => onRemove(chip.key, chip.value)}
            className="hover:text-[#B88746] transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <button
        onClick={onReset}
        className="text-xs text-rose-500 hover:underline font-medium ml-2"
      >
        Clear All
      </button>
    </div>
  );
};
