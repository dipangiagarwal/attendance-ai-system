"use client";

import { useState } from "react";
import { Users, ArrowRight, CheckCircle } from "lucide-react";

export default function AssignStudents() {
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isAssigning, setIsAssigning] = useState(false);

  // For demo purposes - replace with real data later
  const batches = [
    { id: "1", name: "Web Development Batch 2026" },
    { id: "2", name: "Advanced React & Next.js" },
    { id: "3", name: "UI/UX Design Masterclass" },
    { id: "4", name: "Python & Django Bootcamp" },
  ];

  const students = [
    { id: "s1", name: "Aarav Sharma", email: "aarav@example.com" },
    { id: "s2", name: "Priya Patel", email: "priya@example.com" },
    { id: "s3", name: "Rohan Mehta", email: "rohan@example.com" },
    { id: "s4", name: "Ananya Singh", email: "ananya@example.com" },
    { id: "s5", name: "Vikram Rao", email: "vikram@example.com" },
  ];

  const handleAssign = () => {
    if (selectedBatches.length === 0 || selectedStudents.length === 0) return;
    
    setIsAssigning(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Successfully assigned ${selectedStudents.length} students to ${selectedBatches.length} batches!`);
      setIsAssigning(false);
      // Reset selections after success
      setSelectedBatches([]);
      setSelectedStudents([]);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl">
        <div className="bg-zinc-900/80 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/50">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-white tracking-tight">
                Assign Students to Batches
              </h2>
              <p className="text-zinc-400 mt-1 text-lg">
                Select batches and students to assign
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Batches Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Select Batches
                </label>
                <span className="text-xs text-zinc-500">
                  {selectedBatches.length} selected
                </span>
              </div>
              
              <div className="bg-zinc-800/50 border border-white/10 rounded-3xl p-2 h-[420px] overflow-hidden">
                <div className="h-full overflow-y-auto custom-scrollbar space-y-1 p-2">
                  {batches.map((batch) => (
                    <label
                      key={batch.id}
                      className={`flex items-center gap-3 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-white/5 group
                        ${selectedBatches.includes(batch.id) 
                          ? 'bg-purple-500/10 border border-purple-500/30' 
                          : 'hover:border-white/10 border border-transparent'}`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedBatches.includes(batch.id)}
                        onChange={() => {
                          setSelectedBatches(prev =>
                            prev.includes(batch.id)
                              ? prev.filter(id => id !== batch.id)
                              : [...prev, batch.id]
                          );
                        }}className="w-5 h-5 accent-purple-600 rounded-lg"
                      />
                      <div>
                        <p className="text-white font-medium">{batch.name}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Students Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Select Students
                </label>
                <span className="text-xs text-zinc-500">
                  {selectedStudents.length} selected
                </span>
              </div>
              
              <div className="bg-zinc-800/50 border border-white/10 rounded-3xl p-2 h-[420px] overflow-hidden">
                <div className="h-full overflow-y-auto custom-scrollbar space-y-1 p-2">
                  {students.map((student) => (
                    <label
                      key={student.id}
                      className={`flex items-center gap-3 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-white/5 group
                        ${selectedStudents.includes(student.id) 
                          ? 'bg-purple-500/10 border border-purple-500/30' 
                          : 'hover:border-white/10 border border-transparent'}`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => {
                          setSelectedStudents(prev =>
                            prev.includes(student.id)
                              ? prev.filter(id => id !== student.id)
                              : [...prev, student.id]
                          );
                        }}
                        className="w-5 h-5 accent-purple-600 rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-white font-medium">{student.name}</p>
                        <p className="text-zinc-500 text-sm">{student.email}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleAssign}
            disabled={selectedBatches.length === 0 || selectedStudents.length === 0 || isAssigning}
            className="mt-10 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-500 hover:via-purple-500 hover:to-violet-500 disabled:from-zinc-700 disabled:to-zinc-700 text-white font-semibold text-lg py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-purple-500/40 hover:shadow-xl disabled:shadow-none disabled:cursor-not-allowed"
          >
            {isAssigning ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                Assigning Students...
              </>
            ) : (
              <>
                Assign Students
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </button>

          {selectedBatches.length > 0 && selectedStudents.length > 0 && (
            <p className="text-center text-emerald-400 text-sm mt-4 flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Ready to assign {selectedStudents.length} students to {selectedBatches.length} batches
            </p>
          )}
        </div>
      </div>
    </div>
  );
}