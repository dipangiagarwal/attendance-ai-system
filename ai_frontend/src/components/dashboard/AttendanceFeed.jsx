'use client';
import { Clock, ChevronRight } from 'lucide-react';

const ATTENDANCE_FEED = [
  { id: 1, name: 'Aryan Sharma', time: '09:02 AM', status: 'Present', avatar: 'AS' },
  { id: 2, name: 'Priya Mehta', time: '09:05 AM', status: 'Present', avatar: 'PM' },
  { id: 3, name: 'Rohan Verma', time: '09:10 AM', status: 'Absent', avatar: 'RV' },
  { id: 4, name: 'Sneha Kapoor', time: '09:13 AM', status: 'Present', avatar: 'SK' },
  { id: 5, name: 'Dev Patel', time: '09:17 AM', status: 'Present', avatar: 'DP' },
  { id: 6, name: 'Kavya Nair', time: '09:21 AM', status: 'Absent', avatar: 'KN' },
  { id: 7, name: 'Aditya Singh', time: '09:24 AM', status: 'Present', avatar: 'AS' },
];

export default function AttendanceFeed() {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d1a]/80 backdrop-blur-sm p-6 flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-100 font-bold text-base">Live Attendance Feed</p>
          <p className="text-slate-500 text-xs mt-0.5">Real-time recognition events</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      </div>

      <div className="flex flex-col divide-y divide-white/[0.04]">
        {ATTENDANCE_FEED.map((s) => (
          <div key={s.id} className="flex items-center gap-3 py-2.5 group hover:bg-white/[0.02] rounded-xl px-2 transition-colors duration-150">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-bold text-indigo-300">{s.avatar}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-200 text-sm font-medium truncate">{s.name}</p>
              <p className="text-slate-600 text-xs flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" /> {s.time}
              </p>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${s.status === 'Present' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-red-400 bg-red-500/10 border border-red-500/20'}`}>
              {s.status}
            </span>
          </div>
        ))}
      </div>

      <button className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 mt-1 font-medium transition-colors duration-150">
        View all records <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}