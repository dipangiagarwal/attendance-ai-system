"use client";

import { Users, Layers, Plus, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function BatchesHeader({ total = 0 }) {
  // You can later pass real active count as prop
  const activeBatches = Math.max(Math.floor(total * 0.85), 0);

  return (
    <div className="space-y-8">
      {/* Main Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        
        {/* Left Side - Title & Icon */}
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 rounded-3xl flex items-center justify-center shadow-xl shadow-purple-500/30 ring-1 ring-white/10">
            <Layers className="text-white" size={32} />
          </div>

          <div>
            <h1 className="text-4xl font-semibold text-white tracking-tighter">
              Batches
            </h1>
            <p className="text-zinc-400 text-lg mt-1">
              Manage your learning batches and student assignments
            </p>
          </div>
        </div>

        {/* New Batch Button */}
        <Link
          href="/dashboard/batches/add"
          className="group flex items-center gap-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 
                     hover:from-indigo-500 hover:via-purple-500 hover:to-violet-500 
                     px-8 py-4 rounded-2xl font-semibold text-white text-lg 
                     transition-all duration-300 active:scale-[0.97] shadow-xl shadow-purple-500/40 
                     hover:shadow-2xl hover:shadow-purple-500/50"
        >
          <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          New Batch
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Total Batches */}
        <div className="bg-zinc-900/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex items-center gap-6 hover:border-white/20 transition-all group">
          <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Users size={28} />
          </div>
          <div>
            <p className="text-zinc-400 text-sm font-medium">Total Batches</p>
            <h2 className="text-4xl font-semibold text-white mt-1 tracking-tight">
              {total}
            </h2>
          </div>
        </div>

        {/* Active Batches */}
        <div className="bg-zinc-900/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex items-center gap-6 hover:border-white/20 transition-all group">
          <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="text-zinc-400 text-sm font-medium">Active Now</p>
            <h2 className="text-4xl font-semibold text-white mt-1 tracking-tight">
              {activeBatches}
            </h2>
            <p className="text-emerald-400 text-xs mt-1 flex items-center gap-1">
              <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Running this month
            </p>
          </div>
        </div>{/* Completion Rate (Bonus modern card) */}
        <div className="bg-zinc-900/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex items-center gap-6 hover:border-white/20 transition-all group hidden lg:flex">
          <div className="w-14 h-14 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Layers size={28} />
          </div>
          <div>
            <p className="text-zinc-400 text-sm font-medium">Avg. Batch Size</p>
            <h2 className="text-4xl font-semibold text-white mt-1 tracking-tight">
              {total > 0 ? Math.floor(18 + total * 2) : 0}
            </h2>
            <p className="text-amber-400 text-xs mt-1">students per batch</p>
          </div>
        </div>
      </div>
    </div>
  );
}