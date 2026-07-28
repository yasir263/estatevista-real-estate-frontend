'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Phone, Mail, Award, CheckCircle2, MapPin, Building } from 'lucide-react';
import { agentAdapter } from '@/services/adapters/agentAdapter';
import { propertyAdapter } from '@/services/adapters/propertyAdapter';
import { Agent } from '@/types/agent';
import { Property } from '@/types/property';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function AgentProfileClient({ id }: { id: string }) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    agentAdapter.getAgentById(id).then(async (res) => {
      if (isMounted && res) {
        setAgent(res);
        const props = await propertyAdapter.getPropertiesByAgent(res.id);
        if (isMounted) {
          setProperties(props);
          setLoading(false);
        }
      } else {
        if (isMounted) setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <div className="pt-32 text-center">Loading advisor profile...</div>;
  if (!agent) return <div className="pt-32 text-center">Agent not found.</div>;

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-8 border border-[#E5E7EB] shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-[#B88746] flex-shrink-0">
          <Image src={agent.image} alt={agent.name} fill className="object-cover" />
        </div>
        <div className="space-y-3 flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <Badge variant="gold">{agent.title}</Badge>
            <span className="text-xs text-slate-500 font-medium">{agent.experienceYears} Years Experience</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#111827]">{agent.name}</h1>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">{agent.bio}</p>

          <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700 pt-2 justify-center md:justify-start">
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#B88746]" /> {agent.phone}</span>
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#B88746]" /> {agent.email}</span>
            <span className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-[#B88746]" /> {agent.agencyName}</span>
          </div>
        </div>
      </div>

      {/* Agent Active Listings */}
      <div className="space-y-6">
        <h3 className="text-2xl font-serif font-bold text-[#111827]">
          Active Exclusives Represented ({properties.length})
        </h3>

        {properties.length === 0 ? (
          <p className="text-slate-500 text-sm">No active public listings currently available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
