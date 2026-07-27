'use client';

import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { SearchFiltersSidebar } from './SearchFiltersSidebar';
import { PropertyFilterState } from '@/types/filter';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: PropertyFilterState;
  onChange: (updated: Partial<PropertyFilterState>) => void;
  onReset: () => void;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onChange,
  onReset
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto p-4">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <span className="font-serif font-bold text-lg text-[#111827]">Filters</span>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>
        <SearchFiltersSidebar filters={filters} onChange={onChange} onReset={onReset} />
      </div>
    </div>
  );
};
