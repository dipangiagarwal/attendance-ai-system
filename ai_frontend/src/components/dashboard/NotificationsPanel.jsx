'use client';
import { AlertTriangle, CheckCircle2, Bell, XCircle } from 'lucide-react';

const NOTIFICATIONS = [
  { id: 1, type: 'warning', icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', msg: 'Camera 3 (Cafeteria) went offline', time: '2m ago' },
  { id: 2, type: 'success', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', msg: 'Batch CSE-A attendance marked successfully', time: '8m ago' },
  { id: 3, type: 'info', icon: Bell, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', msg: 'Embedding model retrained with 340 new faces', time: '15m ago' },
  { id: 4, type: 'error', icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', msg: 'Failed to sync 6 records — retrying…', time: '22m ago' },
];

export default function NotificationsPanel() {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d1a]/80 backdrop-blur-sm p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-slate-100 font-bold text-base">Notifications</p>
        <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
          4 new
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {NOTIFICATIONS.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              className={`flex items-start gap-3 rounded-xl p-3 border ${n.bg} ${n.border} hover:scale-[1.01] transition-all duration-150 cursor-default`}
            >
              <div className={`w-7 h-7 rounded-lg ${n.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Icon className={`w-3.5 h-3.5 ${n.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-300 text-xs leading-relaxed">{n.msg}</p>
                <p className="text-slate-600 text-[10px] mt-0.5">{n.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}