'use client';
import { RefreshCw, Eye, WifiOff } from 'lucide-react';

const CAMERAS = [
  { id: 1, name: 'Main Gate', location: 'Block A', status: 'Online', fps: '30fps', feed: '1920×1080' },
  { id: 2, name: 'Lab 101', location: 'Block B', status: 'Online', fps: '24fps', feed: '1280×720' },
  { id: 3, name: 'Cafeteria', location: 'Block C', status: 'Offline', fps: '--', feed: '--' },
  { id: 4, name: 'Library', location: 'Block A', status: 'Online', fps: '30fps', feed: '1920×1080' },
  { id: 5, name: 'Admin Block', location: 'Block D', status: 'Online', fps: '24fps', feed: '1280×720' },
  { id: 6, name: 'Parking Area', location: 'Block E', status: 'Offline', fps: '--', feed: '--' },
];

export default function CameraGrid() {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d1a]/80 backdrop-blur-sm p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-100 font-bold text-base">Camera Status</p>
          <p className="text-slate-500 text-xs mt-0.5">18 of 20 cameras online</p>
        </div>
        <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 border border-white/[0.08] hover:border-indigo-500/40 px-3 py-1.5 rounded-lg transition-all duration-200">
          <RefreshCw className="w-3 h-3" /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {CAMERAS.map((cam) => {
          const online = cam.status === 'Online';
          return (
            <div
              key={cam.id}
              className={`rounded-xl border p-4 flex flex-col gap-3 hover:scale-[1.02] transition-all duration-200 cursor-default
                ${online
                  ? 'border-white/[0.06] bg-white/[0.03] hover:border-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/10'
                  : 'border-red-500/10 bg-red-500/[0.03] hover:border-red-500/25'}`}
            >
              {/* Preview placeholder */}
              <div className={`w-full h-20 rounded-lg flex items-center justify-center relative overflow-hidden
                ${online ? 'bg-indigo-500/[0.07]' : 'bg-red-500/[0.05]'}`}>
                {online ? (
                  <>
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(99,102,241,0.03)_2px,rgba(99,102,241,0.03)_4px)]" />
                    <Eye className="w-6 h-6 text-indigo-400/40" />
                  </>
                ) : (
                  <WifiOff className="w-6 h-6 text-red-400/40" />
                )}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-200 text-sm font-semibold">{cam.name}</p>
                  <p className="text-slate-600 text-xs">{cam.location}</p>
                </div>
                <span className={`flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-full
                  ${online
                    ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                    : 'text-red-400 bg-red-500/10 border border-red-500/20'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${online ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                  {cam.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-600 border-t border-white/[0.05] pt-2">
                <span>{cam.feed}</span>
                <span>{cam.fps}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}