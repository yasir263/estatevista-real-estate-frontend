'use client';

import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { PropertyFilterState } from '@/types/filter';
import { PropertyType, FurnishingStatus } from '@/types/property';

interface FilterSidebarProps {
  filters: PropertyFilterState;
  onChange: (updated: Partial<PropertyFilterState>) => void;
  onReset: () => void;
}

const PROPERTY_TYPES: { label: string; value: PropertyType | 'all' }[] = [
  { label: 'All Types', value: 'all' },
  { label: 'Villa', value: 'villa' },
  { label: 'Apartment', value: 'apartment' },
  { label: 'Penthouse', value: 'penthouse' },
  { label: 'Townhouse', value: 'townhouse' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Land', value: 'land' },
  { label: 'New Dev', value: 'new-development' }
];

const AMENITIES_OPTIONS = [
  'Infinity Pool',
  'Private Dock',
  'Home Cinema',
  'Wine Cellar',
  'Spa & Sauna',
  'Smart Home Automation',
  'Helipad',
  'Tennis Court',
  'Gym & Fitness Suite',
  'Garage (4+ Cars)'
];

export const SearchFiltersSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset
}) => {
  const toggleAmenity = (amenity: string) => {
    const current = filters.amenities || [];
    if (current.includes(amenity)) {
      onChange({ amenities: current.filter(a => a !== amenity) });
    } else {
      onChange({ amenities: [...current, amenity] });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 space-y-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-[#B88746]" />
          <h3 className="text-base font-serif font-bold text-[#111827]">Refine Search</h3>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-[#B88746] flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset All
        </button>
      </div>

      {/* Purpose Tabs */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Purpose</label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-full">
          {(['all', 'sale', 'rent'] as const).map((p) => (
            <button
              key={p}
              onClick={() => onChange({ purpose: p })}
              className={`py-1.5 text-xs font-medium capitalize rounded-full transition-all ${
                filters.purpose === p || (!filters.purpose && p === 'all')
                  ? 'bg-[#111827] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Location City */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Location City</label>
        <select
          value={filters.city || ''}
          onChange={(e) => onChange({ city: e.target.value || undefined })}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#B88746]"
        >
          <option value="">All Cities</option>
          <option value="New York">New York</option>
          <option value="Miami">Miami</option>
          <option value="London">London</option>
          <option value="Beverly Hills">Beverly Hills</option>
          <option value="Geneva">Geneva</option>
          <option value="Los Angeles">Los Angeles</option>
        </select>
      </div>

      {/* Property Type */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Property Type</label>
        <select
          value={filters.type || 'all'}
          onChange={(e) => onChange({ type: e.target.value as PropertyType | 'all' })}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#B88746]"
        >
          {PROPERTY_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Price Range ($)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min Price"
            value={filters.priceMin || ''}
            onChange={(e) => onChange({ priceMin: e.target.value ? Number(e.target.value) : undefined })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#B88746]"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.priceMax || ''}
            onChange={(e) => onChange({ priceMax: e.target.value ? Number(e.target.value) : undefined })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#B88746]"
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Bedrooms</label>
        <div className="flex gap-1.5">
          {['all', '1', '2', '3', '4', '5+'].map((b) => (
            <button
              key={b}
              onClick={() => onChange({ bedrooms: b === 'all' ? undefined : b })}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                (filters.bedrooms === b || (!filters.bedrooms && b === 'all'))
                  ? 'border-[#B88746] bg-[#B88746]/10 text-[#B88746]'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Furnishing Status */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Furnishing</label>
        <select
          value={filters.furnishing || 'all'}
          onChange={(e) => onChange({ furnishing: e.target.value as FurnishingStatus | 'all' })}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#B88746]"
        >
          <option value="all">Any Furnishing</option>
          <option value="furnished">Furnished</option>
          <option value="semi-furnished">Semi-Furnished</option>
          <option value="unfurnished">Unfurnished</option>
        </select>
      </div>

      {/* Amenities Checkboxes */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Amenities</label>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
          {AMENITIES_OPTIONS.map((amenity) => {
            const isChecked = filters.amenities?.includes(amenity);
            return (
              <label
                key={amenity}
                className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-black py-0.5 select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleAmenity(amenity)}
                  className="rounded border-slate-300 text-[#B88746] focus:ring-[#B88746]"
                />
                <span>{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Special Feature Toggles */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="flex items-center justify-between text-xs font-medium text-slate-700 cursor-pointer">
          <span>Verified Properties Only</span>
          <input
            type="checkbox"
            checked={Boolean(filters.verified)}
            onChange={(e) => onChange({ verified: e.target.checked })}
            className="rounded border-slate-300 text-[#B88746] focus:ring-[#B88746]"
          />
        </label>
        <label className="flex items-center justify-between text-xs font-medium text-slate-700 cursor-pointer">
          <span>3D Virtual Tour Available</span>
          <input
            type="checkbox"
            checked={Boolean(filters.virtualTour)}
            onChange={(e) => onChange({ virtualTour: e.target.checked })}
            className="rounded border-slate-300 text-[#B88746] focus:ring-[#B88746]"
          />
        </label>
      </div>
    </div>
  );
};
