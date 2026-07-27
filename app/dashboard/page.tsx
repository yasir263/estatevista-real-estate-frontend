'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/stores/useAuthStore';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import {
  User,
  Heart,
  Calendar,
  Bookmark,
  MessageSquare,
  Bell,
  Settings,
  ArrowRight,
  Clock,
  MapPin
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);

  const stats = [
    { title: 'Saved Favorites', count: favoriteIds.length, icon: Heart, color: 'text-rose-500', href: '/favorites' },
    { title: 'Saved Search Alerts', count: 3, icon: Bookmark, color: 'text-amber-500', href: '/dashboard/saved-searches' },
    { title: 'Upcoming Viewings', count: 2, icon: Calendar, color: 'text-blue-500', href: '/dashboard/appointments' },
    { title: 'Unread Messages', count: 4, icon: MessageSquare, color: 'text-emerald-500', href: '/dashboard/messages' },
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Dashboard Top User Header */}
      <div className="bg-[#0B1220] rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#B88746] flex items-center justify-center font-bold text-2xl">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-serif font-bold">{user?.name || 'Alexander Wright'}</h1>
              <Badge variant="gold">Verified Buyer</Badge>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{user?.email}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link href="/dashboard/profile">
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              <User className="w-4 h-4 mr-1.5" /> Profile
            </Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              <Settings className="w-4 h-4 mr-1.5" /> Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link key={idx} href={stat.href}>
              <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB] hover:shadow-lg transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                  <span className="text-2xl font-serif font-bold text-[#111827]">{stat.count}</span>
                </div>
                <h4 className="text-sm font-semibold text-slate-700">{stat.title}</h4>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Scheduled Appointments Preview */}
        <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-lg font-serif font-bold text-[#111827]">Scheduled Private Viewings</h3>
            <Link href="/dashboard/appointments" className="text-xs text-[#B88746] font-semibold hover:underline">
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="space-y-1">
                <h5 className="text-xs font-bold text-[#111827]">The Glass Pavilion Penthouse</h5>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#B88746]" /> Tomorrow at 10:00 AM (In-person)
                </span>
              </div>
              <Badge variant="gold">Confirmed</Badge>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="space-y-1">
                <h5 className="text-xs font-bold text-[#111827]">Villa Solstice Ocean Estate</h5>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#B88746]" /> Friday at 02:00 PM (Video Tour)
                </span>
              </div>
              <Badge variant="green">Pending Agent</Badge>
            </div>
          </div>
        </div>

        {/* Saved Search Alerts */}
        <div className="bg-white rounded-3xl p-6 border border-[#E5E7EB] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-lg font-serif font-bold text-[#111827]">Active Saved Search Alerts</h3>
            <Link href="/dashboard/saved-searches" className="text-xs text-[#B88746] font-semibold hover:underline">
              Manage Alerts →
            </Link>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-[#111827]">Manhattan Penthouses ($10M+)</h5>
                <span className="text-[11px] text-slate-500">Alerts: Daily email digest</span>
              </div>
              <Badge variant="dark">3 New Matches</Badge>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-bold text-[#111827]">Miami Star Island Waterfront</h5>
                <span className="text-[11px] text-slate-500">Alerts: Instant notifications</span>
              </div>
              <Badge variant="dark">1 New Match</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
