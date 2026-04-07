'use client';

import { User, Mail, Lock, Eye, EyeOff, ShieldCheck, Cpu, BarChart3, Fingerprint } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { useRegister } from '@/hooks/useRegister';
import { showError } from '@/utils/toast';

export default function AdminRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const {mutate,isPending}=useRegister();

  const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
});



  const handleRegister = (e) => {
     e.preventDefault(); 
  if (!form.name || !form.email || !form.password) {
    return showError("All fields are required"); 
  }

  mutate(form);
};

  return (
    <div className="min-h-screen w-full bg-[#07070f] flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      {/* Glow orbs */}
      <div className="absolute top-[-120px] right-[-80px] w-[480px] h-[480px] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-60px] w-[380px] h-[380px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[960px] grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-white/[0.06] shadow-[0_32px_80px_rgba(0,0,0,0.7)] bg-[#0d0d1a]/90 backdrop-blur-xl">

        {/* LEFT: Form */}
        <div className="flex flex-col justify-center px-8 py-12 sm:px-12">

          {/* Badge */}
          <div className="flex items-center gap-2 w-fit px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 mb-8">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[10px] font-semibold tracking-widest uppercase text-indigo-300">
              Admin Portal
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-slate-100 tracking-tight mb-3">
            Create Your <br />
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Admin Account
            </span>
          </h1>
          <p className="text-sm text-slate-500 mb-9 leading-relaxed">
            Sign up to manage your platform with AI-powered attendance tools.
          </p>

          {/* Fields */}
          <form onSubmit={handleRegister} className="flex flex-col gap-4">

            {/* Username */}
            <div className="relative group">
            
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors duration-200 pointer-events-none" />
              <input
                type="text"
                placeholder="Admin Name"
                  value={form.name}
  onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-200 text-sm placeholder:text-slate-600 outline-none focus:border-indigo-500/60 focus:bg-indigo-500/[0.06] focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors duration-200 pointer-events-none" />
              <input
                type="email"
                placeholder="Email Address"
                 value={form.email}
  onChange={(e) =>
    setForm({ ...form, email: e.target.value })
  }
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-200 text-sm placeholder:text-slate-600 outline-none focus:border-indigo-500/60 focus:bg-indigo-500/[0.06] focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors duration-200 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                  value={form.password}
  onChange={(e) =>
    setForm({ ...form, password: e.target.value })
  }
                className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-200 text-sm placeholder:text-slate-600 outline-none focus:border-indigo-500/60 focus:bg-indigo-500/[0.06] focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-400 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2.5 mt-1">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 rounded accent-indigo-500 cursor-pointer shrink-0"
              />
              <label htmlFor="terms" className="text-xs text-slate-500 cursor-pointer leading-relaxed">
                I agree to the{' '}
                <span className="text-indigo-400 hover:underline cursor-pointer">
                  Terms & Conditions
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-1 py-3.5 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm tracking-wide shadow-[0_4px_24px_rgba(99,102,241,0.35)] hover:shadow-[0_8px_32px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
               {isPending ? "Registering..." : "Register to Dashboard"}
            </button>
         
         
         
         
         
         
         
          </form >

          {/* Login link */}
          <p className="mt-7 text-center text-xs text-slate-600">
            Already have an account?{' '}
            <Link href="/dashboardlogin" className="text-indigo-400 font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>

        {/* RIGHT: Visual Panel */}
        <div className="hidden lg:flex flex-col items-center justify-center gap-7 px-10 py-12 bg-indigo-500/3 border-l border-white/[0.06] relative overflow-hidden text-center">

          {/* Decorative rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-indigo-500/10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full border border-indigo-500/[0.07] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-indigo-500/[0.04] pointer-events-none" />

          {/* Image / placeholder box */}
          <div className="relative z-10 w-47.5 h-47.5 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.07] shadow-[0_0_48px_rgba(99,102,241,0.18)] overflow-hidden flex items-center justify-center">
            <Fingerprint className="w-16 h-16 text-indigo-400/40" />
{/*             
            <Image
              src="/AI_attendance_system.png"
              width={190}
              height={190}
              alt="AI Attendance System"
              className="w-full h-full object-cover"
              priority
            />
            */}
          </div>

          {/* Title & description */}
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-slate-200 leading-snug tracking-tight mb-2">
              AI-Powered <br /> Attendance System
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-60 mx-auto">
              Automate tracking with facial recognition, smart analytics, and real-time insights — all in one dashboard.
            </p>
          </div>

          {/* Feature chips */}
          <div className="relative z-10 flex flex-wrap gap-2 justify-center">
            {[
              { icon: <Fingerprint className="w-3 h-3" />, label: 'Face Recognition' },
              { icon: <BarChart3 className="w-3 h-3" />, label: 'Live Analytics' },
              { icon: <Cpu className="w-3 h-3" />, label: 'Smart Reports' },
              { icon: <ShieldCheck className="w-3 h-3" />, label: 'Secure Access' },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20"
              >
                {icon}
                {label}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}