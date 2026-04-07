'use client';
import { UserPlus, FolderPlus, Video, ChevronRight } from 'lucide-react';

const actions = [
  { label: 'Add Student', icon: UserPlus, gradient: 'from-indigo-600 to-indigo-500', shadow: 'hover:shadow-indigo-500/30' },
  { label: 'Create Batch', icon: FolderPlus, gradient: 'from-violet-600 to-violet-500', shadow: 'hover:shadow-violet-500/30' },
  { label: 'Start Camera', icon: Video, gradient: 'from-sky-600 to-sky-500', shadow: 'hover:shadow-sky-500/30' },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border  border-white/[0.07] bg-[#0d0d1a]/80 backdrop-blur-sm p-6 flex flex-col gap-4">
      <div>
        <p className="text-slate-100 font-bold text-base">Quick Actions</p>
        <p className="text-slate-500 text-xs mt-0.5">Shortcuts to common tasks</p>
      </div>
      <div className="flex flex-col gap-2.5">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.label}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r ${a.gradient}
                text-white text-sm font-semibold
                hover:scale-[1.02] hover:shadow-lg ${a.shadow}
                active:scale-[0.99] transition-all duration-200`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {a.label}
              <ChevronRight className="w-4 h-4 ml-auto opacity-60" />
            </button>
          );
        })}
      </div>
    </div>
  );
}