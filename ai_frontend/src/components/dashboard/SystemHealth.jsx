'use client';
import { Shield } from 'lucide-react';

const metrics = [
  { label: 'CPU', val: '34%', color: 'bg-indigo-500' },
  { label: 'RAM', val: '61%', color: 'bg-violet-500' },
  { label: 'GPU', val: '87%', color: 'bg-fuchsia-500' },
  { label: 'Storage', val: '42%', color: 'bg-sky-500' },
];

export default function SystemHealth() {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d1a]/80 backdrop-blur-sm px-6  py-5 flex flex-wrap items-center gap-6">
      <div className="flex items-center gap-2 flex-shrink-0">
        <Shield className="w-4 h-4 text-emerald-400" />
        <span className="text-slate-300 text-sm font-semibold">System Health</span>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold ml-1">
          Healthy
        </span>
      </div>
      <div className="flex flex-wrap gap-6 flex-1">
        {metrics.map((m) => (
          <div key={m.label} className="flex flex-col gap-1.5 min-w-[80px]">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-500">{m.label}</span>
              <span className="text-slate-300 font-mono font-medium">{m.val}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/[0.05]">
              <div className={`h-full rounded-full ${m.color}`} style={{ width: m.val }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}