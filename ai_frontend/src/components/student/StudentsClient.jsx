// "use client";

// import { useState } from "react";
// import { useStudents, useCreateStudent, useDeleteStudent } from "@/hooks/useStudents";
// import { Trash2, Plus, Edit2, User } from "lucide-react";
// import Image from "next/image";

// export default function StudentsClient() {
//   const { data: students = [], isLoading } = useStudents();
//   const { mutate: addStudent, isPending } = useCreateStudent();
//   const { mutate: removeStudent } = useDeleteStudent();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     student_phone: "",
//     parent_phone: "",
//     class_name: "",
//     joining_date: "",
//   });

//   const [photo, setPhoto] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const fd = new FormData();
//     Object.keys(form).forEach((key) => fd.append(key, form[key]));
//     if (photo) fd.append("photo", photo);
//     addStudent(fd);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="space-y-8 p-4 max-w-7xl mx-auto">
//       {/* Add Student Form - Modern Card */}
//       <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-3xl p-8 shadow-xl">
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-10 h-10 bg-indigo-600/10 rounded-2xl flex items-center justify-center">
//             <Plus className="text-indigo-400" size={24} />
//           </div>
//           <h2 className="text-2xl font-semibold text-white">Add New Student</h2>
//         </div>

//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {Object.keys(form).map((key) => (
//             <div key={key} className="space-y-2">
//               <label className="text-sm text-zinc-400 capitalize">
//                 {key.replace("_", " ")}
//               </label>
//               <input
//                 type={key === "joining_date" ? "date" : "text"}
//                 name={key}
//                 placeholder={`Enter ${key.replace("_", " ")}`}
//                 value={form[key]}
//                 onChange={handleInputChange}
//                 className="w-full px-5 py-3.5 bg-zinc-900 border border-white/10 rounded-2xl 
//                          text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 
//                          transition-all duration-200"
//               />
//             </div>
//           ))}

//           {/* Photo Upload */}
//           <div className="md:col-span-2 space-y-2">
//             <label className="text-sm text-zinc-400">Student Photo</label>
//             <div className="flex items-center gap-4">
//               <label className="flex-1 cursor-pointer">
//                 <div className="border border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-indigo-500 transition-colors">
//                   <User size={40} className="mx-auto text-zinc-500 mb-3" />
//                   <p className="text-sm text-zinc-400">
//                     Click to upload photo <span className="text-indigo-400">(JPG, PNG)</span>
//                   </p>
//                 </div>
//                 <input
//                   type="file"
//                   onChange={(e) => setPhoto(e.target.files?.[0] || null)}
//                   className="hidden"
//                   accept="image/*"
//                 />
//               </label>

//               {photo && (
//                 <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/10">
//                   <Image
//                     src={URL.createObjectURL(photo)}
//                     alt="Preview"
//                     width={96}
//                     height={96}
//                     className="object-cover"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>

//           <button
//             disabled={isPending}
//             type="submit"
//             className="md:col-span-2 mt-4 bg-gradient-to-r from-indigo-600 to-violet-600 
//                      hover:from-indigo-500 hover:to-violet-500 py-4 rounded-2xl font-semibold 
//                      text-lg transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
//           >
//             {isPending ? "Adding Student..." : "Add Student"}
//           </button>
//         </form>
//       </div>

//       {/* Students Table - Modern Design */}
//       <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-3xl p-8 shadow-xl">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-3">
//             <h2 className="text-2xl font-semibold text-white">All Students</h2>
//             <div className="px-4 py-1.5 bg-white/10 text-white text-sm font-medium rounded-full">
//               {students.length}
//             </div>
//           </div>
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center py-12">
//             <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full" />
//           </div>
//         ) : students.length === 0 ? (
//           <div className="text-center py-16 text-zinc-500">
//             No students found. Add your first student above.
//           </div>
//         ) : (
//           <div className="overflow-x-auto rounded-2xl">
//             <table className="w-full min-w-full">
//               <thead>
//                 <tr className="border-b border-white/10">
//                   <th className="py-5 px-6 text-left text-zinc-400 font-medium w-12">ID</th>
//                   <th className="py-5 px-6 text-left text-zinc-400 font-medium">Photo</th>
//                   <th className="py-5 px-6 text-left text-zinc-400 font-medium">Name</th>
//                   <th className="py-5 px-6 text-left text-zinc-400 font-medium">Email</th>
//                   <th className="py-5 px-6 text-left text-zinc-400 font-medium">Student Phone</th>
//                   <th className="py-5 px-6 text-left text-zinc-400 font-medium">Parent Phone</th>
//                   <th className="py-5 px-6 text-left text-zinc-400 font-medium">Class</th>
//                   <th className="py-5 px-6 text-center text-zinc-400 font-medium w-28">Actions</th>
//                 </tr>
//               </thead> 




//               <tbody className="divide-y divide-white/10">
//                 {students.map((s) => (
//                   <tr key={s.id} className="hover:bg-white/5 transition-colors group">
//                     <td className="py-5 px-6 text-zinc-400 font-mono">{s.id}</td>

//                     {/* Photo */}
//                     <td className="py-5 px-6">
//                       <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 bg-zinc-800">
//                         {s.photo ? (
//                           <Image
//                             src={s.photo}
//                             alt={s.name}
//                             width={48}
//                             height={48}
//                             className="object-cover"
//                           />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center">
//                             <User size={24} className="text-zinc-600" />
//                           </div>
//                         )}
//                       </div>
//                     </td>

//                     <td className="py-5 px-6 font-medium text-white">{s.name}</td>
//                     <td className="py-5 px-6 text-zinc-400">{s.email}</td>
//                     <td className="py-5 px-6 text-zinc-400">{s.student_phone}</td>
//                     <td className="py-5 px-6 text-zinc-400">{s.parent_phone}</td>
//                     <td className="py-5 px-6">
//                       <span className="inline-block px-4 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-medium rounded-full">
//                         {s.class_name}
//                       </span>
//                     </td>

//                     {/* Actions */}
//                     <td className="py-5 px-6">
//                       <div className="flex items-center justify-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
//                         <button
//                           onClick={() => alert(`Edit student ${s.name} - Coming soon`)}
//                           className="text-amber-400 hover:text-amber-300 transition-colors p-2 hover:bg-white/10 rounded-xl"
//                         >
//                           <Edit2 size={18} />
//                         </button>
//                         <button
//                           onClick={() => removeStudent(s.id)}
//                           className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-white/10 rounded-xl"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// "use client";

// import StudentForm from "./StudentForm";
// import StudentsTable from "./StudentsTable";

// export default function StudentsClient() {
//   return (
//     <div className="space-y-5 p-4 max-w-6xl mx-auto">
//       <StudentForm />
//       <StudentsTable />
//     </div>
//   );
// }  


