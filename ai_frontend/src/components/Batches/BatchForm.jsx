"use client";

import { useState } from "react";
import { Plus, Calendar, Clock, Users } from "lucide-react";
import { useCreateBatch } from "@/hooks/useBatches";
import { useRouter } from "next/navigation";

export default function BatchForm() {
  const { mutate, isPending } = useCreateBatch();
  const router = useRouter();

  const [form, setForm] = useState({
    batch_name: "",
    class_name: "",
    start_time: "",
    end_time: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: (data) => {
        router.push(`/dashboard/batches/assign?batchId=${data.id}`);
      },
    });
  };

  return (
    <div className=" flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl">
        {/* Card Container */}
        <div className="bg-zinc-900/80 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/50">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14  bg-linear-to-r from-indigo-600 to-violet-600 
                         hover:from-indigo-500 hover:to-violet-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Plus className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-white tracking-tight">
                Create New Batch
              </h2>
              <p className="text-zinc-400 mt-1 text-lg">
                Set up a new learning batch
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Batch Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Batch Name
                </label>
                <input
                  name="batch_name"
                  placeholder="e.g. Web Dev Batch 2026"
                  value={form.batch_name}
                  onChange={handleChange}
                  className="w-full bg-zinc-800/50 border border-white/10 focus:border-purple-500 rounded-2xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none transition-all duration-300 text-lg"
                  required
                />
              </div>

              {/* Class Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Class Name
                </label>
                <input
                  name="class_name"
                  placeholder="e.g. Advanced React"
                  value={form.class_name}
                  onChange={handleChange}
                  className="w-full bg-zinc-800/50 border border-white/10 focus:border-purple-500 rounded-2xl px-5 py-4 text-white placeholder-zinc-500 focus:outline-none transition-all duration-300 text-lg"
                  required
                />
              </div>
 {/* Start Time */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Start Time
                </label>
                <input
                  type="time"
                  name="start_time"
                  value={form.start_time}
                  onChange={handleChange}
                  className="w-full bg-zinc-800/50 border border-white/10 focus:border-purple-500 rounded-2xl px-5 py-4 text-white focus:outline-none transition-all duration-300 text-lg"
                  required
                />
              </div>

              {/* End Time */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  End Time
                </label>
                <input
                  type="time"
                  name="end_time"
                  value={form.end_time}
                  onChange={handleChange}
                  className="w-full bg-zinc-800/50 border border-white/10 focus:border-purple-500 rounded-2xl px-5 py-4 text-white focus:outline-none transition-all duration-300 text-lg"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-8  bg-linear-to-r from-indigo-600 to-violet-600 
                         hover:from-indigo-500 hover:to-violet-500  text-white font-semibold text-lg py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg cursor-pointer"
            >
              {isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                  Creating Batch...
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6" />
                  Create Batch
                </>
              )}
            </button>
          </form>
        </div>

        {/* Subtle footer hint */}
        <p className="text-center text-zinc-500 text-sm mt-6">
          All batches are created with secure access control
        </p>
      </div>
    </div>
  );
}