'use client';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ stat }) {
  const Icon = stat.icon;
  const TrendIcon = stat.up ? TrendingUp : TrendingDown;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0a17]/90 backdrop-blur-xl p-6 flex flex-col gap-5 hover:scale-[1.03] transition-all duration-300 hover:shadow-2xl group">
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-50 group-hover:opacity-70 transition-opacity`} />
      
      <div className="relative flex items-start justify-between">
        <div className={`w-12 h-12 rounded-2xl ${stat.iconBg} flex items-center justify-center ring-1 ring-white/10`}>
          <Icon className={`w-6 h-6 ${stat.iconColor}`} />
        </div>
        <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full 
          ${stat.up ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30' : 'text-red-400 bg-red-500/10 border border-red-500/30'}`}>
          <TrendIcon className="w-3.5 h-3.5" />
          {stat.trend}
        </span>
      </div>

      <div className="relative">
        <p className="text-slate-400 text-sm font-medium tracking-widest">{stat.title}</p>
        <p className="text-4xl font-bold text-white tracking-tighter mt-1">{stat.value}</p>
      </div>
    </div>
  );
}