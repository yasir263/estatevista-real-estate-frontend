'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Phone, Mail, Award, CheckCircle2 } from 'lucide-react';
import { agentAdapter } from '@/services/adapters/agentAdapter';
import { Agent } from '@/types/agent';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function AgentsDirectoryPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agentAdapter.getAgents().then(res => {
      setAgents(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <Badge variant="gold">Private Advisory Network</Badge>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#111827]">
          Elite Real Estate Agents
        </h1>
        <p className="text-sm text-slate-500 max-w-xl">
          Connect with top-producing estate directors, penthouse advisors, and private wealth specialists.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading agent directory...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-3xl p-6 border border-[#E5E7EB] hover:shadow-xl transition-all flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#B88746] flex-shrink-0">
                  <Image src={agent.image} alt={agent.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#111827]">{agent.name}</h3>
                  <span className="text-xs font-semibold text-[#B88746] block">{agent.title}</span>
                  <span className="text-[11px] text-slate-400 font-mono">{agent.agencyName}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {agent.bio}
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-600">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-slate-900">{agent.rating}</span>
                  <span className="text-slate-400">({agent.reviewsCount})</span>
                </div>
                <span>{agent.activeListingsCount} Active Listings</span>
              </div>

              <Link href={`/agents/${agent.id}`}>
                <Button variant="outline" className="w-full justify-center">
                  View Profile & Listings
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
