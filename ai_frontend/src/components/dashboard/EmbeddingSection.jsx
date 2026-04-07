'use client';
import { Cpu, Zap } from 'lucide-react';

const EMBEDDINGS = [
  { label: 'Face Detection', pct: 92, color: 'bg-indigo-500', status: 'Completed' },
  { label: 'Feature Extraction', pct: 78, color: 'bg-violet-500', status: 'Processing' },
  { label: 'Model Training', pct: 55, color: 'bg-fuchsia-500', status: 'Processing' },
  { label: 'Database Sync', pct: 100, color: 'bg-emerald-500', status: 'Completed' },
  { label: 'Verification Pass', pct: 88, color: 'bg-sky-500', status: 'Completed' },
];

export default function EmbeddingSection() {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d1a]/80 backdrop-blur-sm p-6 flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-fuchsia-500/15 flex items-center justify-center flex-shrink-0">
          <Cpu className="w-4.5 h-4.5 text-fuchsia-400" />
        </div>
        <div>
          <p className="text-slate-100 font-bold text-base">AI Embedding Pipeline</p>
          <p className="text-slate-500 text-xs">Face recognition processing status</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {EMBEDDINGS.map((e) => (
          <div key={e.label} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 text-sm font-medium">{e.label}</span>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full
                  ${e.status === 'Completed'
                    ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                    : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'}`}>
                  {e.status}
                </span>
                <span className="text-xs text-slate-400 font-mono w-8 text-right">{e.pct}%</span>
              </div>
            </div>
            <div className="h-2 w-full rounded-full bg-white/[0.05] overflow-hidden">
              <div
                className={`h-full rounded-full ${e.color} transition-all duration-700`}
                style={{ width: `${e.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500 border-t border-white/[0.05] pt-3">
        <Zap className="w-3.5 h-3.5 text-fuchsia-400" />
        <span>GPU: RTX 4090 · Batch size: 64 · Model: FaceNet v3</span>
      </div>
    </div>
  );
}