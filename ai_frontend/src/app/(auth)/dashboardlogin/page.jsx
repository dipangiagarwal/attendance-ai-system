'use client';

import { HiEye, HiEyeOff, HiMail, HiLockClosed } from 'react-icons/hi';
import { ShieldCheck, ArrowRight, Fingerprint, BarChart3, Cpu } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useLogin } from "@/hooks/useRegister";
import { showError } from "@/utils/toast";

export default function AdminLogin() {
  const { mutate, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

const [form, setForm] = useState({
  email: "",
  password: "",
});



const handleLogin = (e) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    return showError("All fields are required");
  }

  mutate(form);
};

  return (
    <div className="min-h-screen w-full bg-[#07070f] flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-size-[48px_48px] pointer-events-none" />

      {/* Glow orbs */}
      <div className="absolute top-[-100px] left-[-80px] w-[420px] h-[420px] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-60px] w-[380px] h-[380px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[960px] grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-white/[0.06] shadow-[0_32px_80px_rgba(0,0,0,0.7)] bg-[#0d0d1a]/90 backdrop-blur-xl">

        {/* LEFT: Visual Panel */}
        <div className="hidden lg:flex flex-col items-center justify-center gap-7 px-10 py-14 bg-indigo-500/[0.03] border-r border-white/[0.06] relative overflow-hidden text-center">

          {/* Decorative rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-indigo-500/10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full border border-indigo-500/[0.07] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full border border-indigo-500/[0.04] pointer-events-none" />

          {/* Icon box */}
          <div className="relative z-10 w-[180px] h-[180px] rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.07] shadow-[0_0_48px_rgba(99,102,241,0.18)] flex items-center justify-center">
            <ShieldCheck className="w-20 h-20 text-indigo-400/50" />
          </div>

          {/* Text */}
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-slate-200 leading-snug tracking-tight mb-2">
              Secure Admin <br /> Access
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[230px] mx-auto">
              Your AI-powered attendance dashboard awaits. Sign in to monitor, manage, and analyze with ease.
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

        {/* RIGHT: Form */}
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
            Welcome Back, <br />
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Admin
            </span>
          </h1>
          <p className="text-sm text-slate-500 mb-9 leading-relaxed">
            Secure access to your administration panel.
          </p>

          {/* Fields */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase ml-1">
                Email or Mobile
              </label>
              <div className="relative group">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors duration-200 pointer-events-none" />
                <input
                  type="text"
                  placeholder="admin@company.com"
                   value={form.email}
  onChange={(e) =>
    setForm({ ...form, email: e.target.value })
  }
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-200 text-sm placeholder:text-slate-600 outline-none focus:border-indigo-500/60 focus:bg-indigo-500/[0.06] focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between ml-1 mr-1">
                <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
                  Password
                </label>
                <span className="text-xs text-indigo-400 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <div className="relative group">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors duration-200 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
  onChange={(e) =>
    setForm({ ...form, password: e.target.value })
  }
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-200 text-sm placeholder:text-slate-600 outline-none focus:border-indigo-500/60 focus:bg-indigo-500/[0.06] focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-400 transition-colors duration-200"
                >
                  {showPassword ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5 mt-1">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded accent-indigo-500 cursor-pointer flex-shrink-0"
              />
              <label htmlFor="remember" className="text-xs text-slate-500 cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}

              className="w-full mt-1 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm tracking-wide shadow-[0_4px_24px_rgba(99,102,241,0.35)] hover:shadow-[0_8px_32px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>{isPending ? "Signing in..." : "Sign In to Dashboard"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-xs text-slate-600">or</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Register link */}
          <p className="text-center text-xs text-slate-600">
            New to Admin Portal?{' '}
            <Link href="/dashboardregister" className="text-indigo-400 font-semibold hover:underline">
              Create an account
            </Link>
          </p>

          {/* Footer note */}
          <p className="mt-8 text-center text-[11px] text-slate-700">
            © {new Date().getFullYear()} Admin Portal. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
}