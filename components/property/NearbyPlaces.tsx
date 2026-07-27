import React from 'react';
import { Compass, GraduationCap, Stethoscope, ShoppingBag, Bus, Utensils, Trees } from 'lucide-react';
import { NearbyPlace } from '@/types/property';

export const NearbyPlaces: React.FC<{ places?: NearbyPlace[] }> = ({ places }) => {
  if (!places || places.length === 0) return null;

  const getIcon = (category: string) => {
    switch (category) {
      case 'School': return <GraduationCap className="w-4 h-4 text-emerald-600" />;
      case 'Hospital': return <Stethoscope className="w-4 h-4 text-rose-600" />;
      case 'Shopping': return <ShoppingBag className="w-4 h-4 text-[#B88746]" />;
      case 'Transit': return <Bus className="w-4 h-4 text-blue-600" />;
      case 'Dining': return <Utensils className="w-4 h-4 text-amber-600" />;
      default: return <Trees className="w-4 h-4 text-teal-600" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
        <Compass className="w-5 h-5 text-[#B88746]" />
        <h3 className="text-xl font-serif font-bold text-[#111827]">WalkScore & Neighborhood Map</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {places.map((place, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white shadow-sm">{getIcon(place.category)}</div>
              <div>
                <h5 className="text-xs font-semibold text-slate-800">{place.name}</h5>
                <span className="text-[10px] text-slate-400 uppercase font-sans tracking-wider">{place.category}</span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-[#B88746] bg-[#B88746]/10 px-2.5 py-1 rounded-full">
              {place.distance}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
