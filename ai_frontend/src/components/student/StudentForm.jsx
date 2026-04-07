"use client";

import { useState } from "react";
import { useCreateStudent } from "@/hooks/useStudents";
import { useRouter } from "next/navigation";
import { 
  User, Mail, Phone, Users, Calendar, Upload, Plus, Camera 
} from "lucide-react";
import Image from "next/image";

export default function StudentForm() {
  const router = useRouter();
  const { mutate, isPending } = useCreateStudent();
 
  const [form, setForm] = useState({
    name: "",
    email: "",
    student_phone: "",
    parent_phone: "",
    class_name: "",
    joining_date: "",
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (file) => {
    if (file && file.type.startsWith("image/")) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handlePhotoChange(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) fd.append(key, value);
    });
    if (photo) fd.append("photo", photo);

    mutate(fd, {
      onSuccess: () => {
        router.push("/dashboard/students");
      },
    });
  };

  const iconMap = {
    name: User,
    email: Mail,
    student_phone: Phone,
    parent_phone: Users,
    class_name: Users,
    joining_date: Calendar,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black py-12 px-4">
      <div className="max-w-[680px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-3xl mb-6 shadow-xl shadow-indigo-500/30">
            <Plus className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-semibold text-white tracking-tight">Add New Student</h1>
          <p className="text-zinc-400 mt-3 text-lg">Fill in the details to register a new student</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Photo Upload */}
            <div className="flex flex-col items-center">
              <div 
                className={`relative w-40 h-40 rounded-full border-4 border-white/10 overflow-hidden transition-all duration-300
                  ${dragActive ? "border-indigo-500 scale-105" : "hover:border-indigo-500/50"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {photoPreview ? (
                  <Image 
                    src={photoPreview} 
                    alt="Student Preview" 
                    fill 
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                    <User size={60} className="text-zinc-600" />
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <label className="cursor-pointer flex flex-col items-center">
                    <Camera size={28} className="text-white mb-1" />
                    <span className="text-xs text-white font-medium">Change Photo</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handlePhotoChange(e.target.files[0])}
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>

              <p className="text-xs text-zinc-500 mt-4">Click or drag photo to upload • JPG, PNG</p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(form).map((key) => {
                const Icon = iconMap[key];
                return (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400 capitalize flex items-center gap-2">
                      {Icon && <Icon size={18} />}
                      {key.replace("_", " ")}
                    </label>
                    
                    <div className="relative group">
                      <input
                        type={key === "joining_date" ? "date" : "text"}
                        name={key}
                        value={form[key]}
                        onChange={handleInputChange}
                        placeholder={`Enter ${key.replace("_", " ")}`}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 pl-12 
                                 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 
                                 transition-all duration-300 focus:ring-2 focus:ring-indigo-500/20"
                      />
                      {Icon && (
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
                          <Icon size={20} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-8 bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-600 
                       hover:from-indigo-500 hover:via-violet-500 hover:to-indigo-500 
                       py-4.5 rounded-2xl font-semibold text-lg text-white shadow-xl 
                       shadow-indigo-500/30 transition-all duration-300 
                       disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3
                       active:scale-[0.985]"
            >
              {isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Adding Student...
                </>
              ) : (
                <>
                  <Plus size={24} />
                  Add Student
                </>
              )}
            </button>
          </form>
        </div>

        {/* Helper Footer */}
        <p className="text-center text-zinc-500 text-sm mt-8">
          All fields are required • Photo is recommended
        </p>
      </div>
    </div>
  );
}