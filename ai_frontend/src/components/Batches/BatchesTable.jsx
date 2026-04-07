"use client";

import { useState } from "react";
import { useDeleteBatch } from "@/hooks/useBatches";
import { Trash2, Users, Clock, Edit2, MoreVertical } from "lucide-react";

export default function BatchesTable({ batches = [], isLoading }) {
  const { mutate: deleteBatch, isPending: isDeleting } = useDeleteBatch();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = (id, name) => {
    if (!confirm(`Delete batch "${name}"? This action cannot be undone.`))
      return;

    setDeletingId(id);
    deleteBatch(id, {
      onSuccess: () => setDeletingId(null),
      onError: () => setDeletingId(null),
    });
  };

  if (isLoading) {
    return (
      <div className="bg-zinc-900/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-4 border-zinc-700 border-t-purple-500 rounded-full animate-spin mb-4" />
        <p className="text-zinc-400">Loading batches...</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/70 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      {/* Table Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between bg-zinc-950/50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-violet-500/10 rounded-2xl flex items-center justify-center">
            <Users className="text-violet-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              All Batches
            </h2>
            <p className="text-zinc-400 text-sm">
              {batches.length} total batches
            </p>
          </div>
        </div>

        {batches.length > 0 && (
          <div className="text-xs px-4 py-2 bg-white/5 rounded-full text-zinc-400 border border-white/10">
            {batches.length} records
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10 bg-zinc-950/80">
              <th className="px-8 py-5 text-left text-xs font-medium text-zinc-400 uppercase tracking-widest">
                Batch Name
              </th>
              <th className="px-8 py-5 text-left text-xs font-medium text-zinc-400 uppercase tracking-widest">
                Class
              </th>
              <th className="px-8 py-5 text-left text-xs font-medium text-zinc-400 uppercase tracking-widest">
                Start Time
              </th>
              <th className="px-8 py-5 text-left text-xs font-medium text-zinc-400 uppercase tracking-widest">
                End Time
              </th>
              <th className="px-8 py-5 text-center text-xs font-medium text-zinc-400 uppercase tracking-widest">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {batches.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-20 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mb-4">
                      <Users className="text-zinc-500" size={32} />
                    </div>
                    <p className="text-zinc-400 text-lg">No batches found</p>
                    <p className="text-zinc-500 text-sm mt-1">
                      Create your first batch to get started
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              batches.map((batch) => (
                <tr
                  key={batch.id}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="font-medium text-white">
                      {batch.batch_name}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-white/90">{batch.class_name}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <Clock size={16} />
                      {batch.start_time}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-rose-400">
                      <Clock size={16} />
                      {batch.end_time}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex items-center justify-center gap-3 opacity-70 group-hover:opacity-100 transition-opacity">
                      {/* Edit Button (optional - you can connect later) */}
                      <button
                        className="p-2 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-colors"
                        title="Edit Batch"
                      >
                        <Edit2 size={18} />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(batch.id, batch.batch_name)}
                        disabled={deletingId === batch.id}
                        className="p-2 hover:bg-red-500/10 rounded-xl text-red-400 hover:text-red-500 transition-colors disabled:opacity-50"
                        title="Delete Batch"
                      >
                        {deletingId === batch.id ? (
                          <div className="w-4 h-4 border-2 border-red-400 border-t-transparent animate-spin rounded-full" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {batches.length > 0 && (
        <div className="p-6 border-t border-white/10 bg-zinc-950/50 text-xs text-zinc-500 flex justify-between items-center">
          <p>Showing all {batches.length} batches</p>
          <p className="text-emerald-400">
            Click on a row to view details (coming soon)
          </p>
        </div>
      )}
    </div>
  );
}