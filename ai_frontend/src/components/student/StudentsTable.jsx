"use client";

import { useState, useMemo, useCallback } from "react";
import { useStudents, useDeleteStudent } from "@/hooks/useStudents";
import {
  Trash2,
  Edit2,
  Search,
  Users,
  Plus,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function StudentsTable() {
  const { data, isLoading } = useStudents();

  const students = useMemo(() => {
    return data || [];
  }, [data]);

  const { mutate: deleteStudent, isPending: isDeleting } = useDeleteStudent();

  const [searchTerm, setSearchTerm] = useState("");

  // 🔥 Optimized search (memoized)
  const filteredStudents = useMemo(() => {
    if (!searchTerm) return students;

    const lower = searchTerm.toLowerCase();

    return students.filter(
      (student) =>
        student.name?.toLowerCase().includes(lower) ||
        student.email?.toLowerCase().includes(lower) ||
        student.class_name?.toLowerCase().includes(lower)
    );
  }, [students, searchTerm]);

  // 🔥 Memoized initials function
  const getInitials = useCallback((name) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, []);

  // 🔥 Delete handler (safe + clean)
  const handleDelete = useCallback(
    (student) => {
      if (!student?.id) return;

      const confirmed = confirm(`Delete student ${student.name}?`);
      if (!confirmed) return;

      deleteStudent(student.id);
    },
    [deleteStudent]
  );

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-8">
        <div className="flex items-center justify-center py-12 md:py-20">
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <div className="w-8 h-8 md:w-10 md:h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-zinc-400 text-sm md:text-base">Loading students...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5  bg-red-500 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="p-4 md:p-6 lg:p-8 pb-4 md:pb-6 border-b border-white/10">
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Title Row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0">
                <Users className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white tracking-tight">
                  All Students
                </h2>
                <p className="text-zinc-400 text-sm md:text-base lg:text-lg">
                  {filteredStudents.length}{" "}
                  {filteredStudents.length === 1 ? "student" : "students"}
                </p>
              </div>
            </div>

            {/* Mobile Add Button */}
            <Link
              href="/dashboard/students/add"
              className="md:hidden flex items-center justify-center bg-gradient-to-r from-indigo-600 to-violet-600 
                       hover:from-indigo-500 hover:to-violet-500 p-3 rounded-xl font-semibold 
                       transition-all active:scale-95"
            >
              <Plus size={20} />
            </Link>
          </div>

          {/* Search + Add Button Row */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="relative flex-1 md:max-w-md lg:max-w-lg">
              <Search
                className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 pl-10 md:pl-12 pr-4 py-3 md:py-3.5 rounded-xl md:rounded-2xl 
                         text-sm md:text-base text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Desktop Add Button */}
            <Link
              href="/dashboard/students/add"
              className="hidden md:flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 
                       hover:from-indigo-500 hover:to-violet-500 px-5 lg:px-6 py-3 md:py-3.5 rounded-xl md:rounded-2xl font-semibold 
                       transition-all active:scale-95 whitespace-nowrap text-sm md:text-base"
            >
              <Plus size={20} />
              Add Student
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      {filteredStudents.length === 0 ? (
        <div className="py-16 md:py-24 flex flex-col items-center justify-center text-center px-4 md:px-6">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-2xl md:rounded-3xl flex items-center justify-center mb-4 md:mb-6">
            <Users size={40} className="text-zinc-600 md:w-12 md:h-12" />
          </div>
          <h3 className="text-xl md:text-2xl font-medium text-white mb-2">
            No students found
          </h3>
          <p className="text-sm md:text-base text-zinc-400 max-w-xs mb-6 md:mb-8">
            {searchTerm
              ? "No matching students found for your search."
              : "You haven't added any students yet."}
          </p>
          <Link
            href="/dashboard/students/add"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-5 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-medium transition-colors text-sm md:text-base"
          >
            <Plus size={20} />
            Add First Student
          </Link>
        </div>
      ) : (
        <>
          {/* Mobile & Tablet Card View (Hidden on Large Screens) */}
          <div className="lg:hidden divide-y divide-white/10">
            {filteredStudents.map((student) => (
              <div
                key={student?.id || student?._id}
                className="p-4 md:p-5 hover:bg-white/5 transition-all"
              >
                <div className="flex gap-3 md:gap-4">
                  {/* Photo */}
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 flex-shrink-0">
                    {student.photo_url ? (
                      <Image
                        src={student.photo_url}
                        alt={student.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
                        <span className="text-lg md:text-xl font-semibold text-zinc-400">
                          {getInitials(student.name)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2 md:mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-semibold text-white truncate">
                          {student.name}
                        </h3>
                        <p className="text-xs md:text-sm text-zinc-500 font-mono">
                          ID: {student.id}
                        </p>
                      </div>
                      <span className="inline-flex px-2.5 md:px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs md:text-sm font-medium rounded-full whitespace-nowrap flex-shrink-0">
                        {student.class_name}
                      </span>
                    </div>

                    <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
                      <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-400">
                        <Mail size={14} className="flex-shrink-0" />
                        <span className="truncate">{student.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-400">
                        <Phone size={14} className="flex-shrink-0" />
                        <span>{student.student_phone}</span>
                      </div>
                      {student.parent_phone && (
                        <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-400">
                          <Users size={14} className="flex-shrink-0" />
                          <span>{student.parent_phone}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          alert(`Edit student ${student.name} - Coming soon`)
                        }
                        className="flex-1 flex items-center justify-center gap-1.5 md:gap-2 p-2.5 md:p-3 bg-white/5 hover:bg-white/10 rounded-lg md:rounded-xl text-amber-400 hover:text-amber-300 transition-colors text-xs md:text-sm font-medium"
                      >
                        <Edit2 size={16} />
                        Edit
                      </button>

                      <button
                        disabled={isDeleting}
                        onClick={() => handleDelete(student)}
                        className="flex-1 flex items-center justify-center gap-1.5 md:gap-2 p-2.5 md:p-3 bg-white/5 hover:bg-white/10 rounded-lg md:rounded-xl text-red-400 hover:text-red-300 transition-colors disabled:opacity-50 text-xs md:text-sm font-medium"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View (Hidden on Small/Medium Screens) */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-zinc-950/50">
                  <th className="py-5 xl:py-6 px-4 xl:px-8 text-left text-zinc-400 font-medium text-sm">
                    ID
                  </th>
                  <th className="py-5 xl:py-6 px-4 xl:px-8 text-left text-zinc-400 font-medium text-sm">
                    Photo
                  </th>
                  <th className="py-5 xl:py-6 px-4 xl:px-8 text-left text-zinc-400 font-medium text-sm">
                    Name
                  </th>
                  <th className="py-5 xl:py-6 px-4 xl:px-8 text-left text-zinc-400 font-medium text-sm">
                    Email
                  </th>
                  <th className="py-5 xl:py-6 px-4 xl:px-8 text-left text-zinc-400 font-medium text-sm">
                    Student Phone
                  </th>
                  <th className="py-5 xl:py-6 px-4 xl:px-8 text-left text-zinc-400 font-medium text-sm">
                    Parent Phone
                  </th>
                  <th className="py-5 xl:py-6 px-4 xl:px-8 text-left text-zinc-400 font-medium text-sm">
                    Class
                  </th>
                  <th className="py-5 xl:py-6 px-4 xl:px-8 text-center text-zinc-400 font-medium text-sm">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {filteredStudents.map((student) => (
                  <tr
                    key={student?.id || student?._id}
                    className="group hover:bg-white/5 transition-all duration-200"
                  >
                    <td className="py-5 xl:py-6 px-4 xl:px-8 font-mono text-zinc-400 text-xs xl:text-sm">
                      {student.id}
                    </td>

                    <td className="py-5 xl:py-6 px-4 xl:px-8">
                      <div className="w-11 h-11 xl:w-12 xl:h-12 rounded-xl xl:rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 ring-1 ring-white/5 flex-shrink-0">
                        {student.photo_url ? (
                          <Image
                            src={student.photo_url}
                            alt={student.name}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
                            <span className="text-base xl:text-lg font-semibold text-zinc-400">
                              {getInitials(student.name)}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="py-5 xl:py-6 px-4 xl:px-8 font-semibold text-white text-sm xl:text-base">
                      {student.name}
                    </td>
                    <td className="py-5 xl:py-6 px-4 xl:px-8 text-zinc-400 text-sm xl:text-base">
                      {student.email}
                    </td>
                    <td className="py-5 xl:py-6 px-4 xl:px-8 text-zinc-400 font-medium text-sm xl:text-base">
                      {student.student_phone}
                    </td>
                    <td className="py-5 xl:py-6 px-4 xl:px-8 text-zinc-400 font-medium text-sm xl:text-base">
                      {student.parent_phone}
                    </td>

                    <td className="py-5 xl:py-6 px-4 xl:px-8">
                      <span className="inline-flex px-3 xl:px-4 py-1 xl:py-1.5 bg-indigo-500/10 text-indigo-400 text-xs xl:text-sm font-medium rounded-full">
                        {student.class_name}
                      </span>
                    </td>

                    <td className="py-5 xl:py-6 px-4 xl:px-8">
                      <div className="flex items-center justify-center gap-2 opacity-70 group-hover:opacity-100 transition-all">
                        <button
                          onClick={() =>
                            alert(`Edit student ${student.name} - Coming soon`)
                          }
                          className="p-2.5 xl:p-3 hover:bg-white/10 rounded-lg xl:rounded-xl text-amber-400 hover:text-amber-300 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>

                        <button
                          disabled={isDeleting}
                          onClick={() => handleDelete(student)}
                          className="p-2.5 xl:p-3 hover:bg-white/10 rounded-lg xl:rounded-xl text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}