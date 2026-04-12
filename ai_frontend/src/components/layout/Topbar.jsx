"use client";

import { useState } from "react";
import {
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Shield,
} from "lucide-react";
  import { useLogout, useAdmin } from "@/hooks/useRegister";


export default function Topbar({ onMenuToggle }) {

  const { mutate: logout } = useLogout();

const { data } = useAdmin();


  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="h-16 bg-[#0d0d14] border-b border-white/10 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
      {/* Left: Mobile menu toggle + Page title */}
      <div className="flex items-center gap-3">
        {/* Mobile Logo instead of menu */}
  <div className="md:hidden flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
      <Shield size={16} className="text-white" />
    </div>
    <span className="text-sm font-semibold text-white">
      AI Attendance
    </span>
  </div>


   {/* Desktop Search
  <div
    className={`hidden sm:flex items-center gap-2 bg-white/5 border rounded-xl px-3 py-2 transition-all duration-200 ${
      searchFocused
        ? "border-indigo-500/50 bg-indigo-500/5 w-64"
        : "border-white/10 w-48"
    }`}
  >
    <Search size={14} className="text-gray-500 shrink-0" />
    <input
      type="text"
      placeholder="Search..."
      onFocus={() => setSearchFocused(true)}
      onBlur={() => setSearchFocused(false)}
      className="bg-transparent text-sm text-gray-300 placeholder:text-gray-600 outline-none w-full"
    />
  </div>    */}
  

        {/* Search bar — hidden on small mobile, visible md+ */}
        <div
          className={`hidden sm:flex items-center gap-2 bg-white/5 border rounded-xl px-3 py-2 transition-all duration-200 ${
            searchFocused
              ? "border-indigo-500/50 bg-indigo-500/5 w-64"
              : "border-white/10 w-48"
          }`}
        >
          <Search size={14} className="text-gray-500 shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="bg-transparent text-sm text-gray-300 placeholder:text-gray-600 outline-none w-full"
          />
          {searchFocused && (
            <kbd className="text-[10px] text-gray-600 bg-white/5 px-1.5 py-0.5 rounded font-mono">
              ⌘K
            </kbd>
          )}
        </div>  


      </div>

      {/* Right: Actions + Profile */}
      <div className="flex items-center gap-2">
        {/* Mobile search icon */}
        <button className="sm:hidden w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white/5 hover:text-white transition">
          <Search size={18} />
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white/5 hover:text-white transition">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-[#0d0d14]" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-white/10 mx-1" />

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 pl-1 pr-2.5 py-1.5 rounded-xl hover:bg-white/5 transition group"
          >
            {/* Avatar */}
            <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center">
              <Shield size={14} className="text-indigo-400" />
            </div>

            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-white leading-tight">
               {data?.message }
              </p>
             
            </div>

            <ChevronDown
              size={14}
              className={`text-gray-500 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-30"
                onClick={() => setDropdownOpen(false)}
              />
 {/* Dropdown */}
    <div className="absolute right-0 top-full mt-2 w-52 bg-[#13131e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2 duration-150">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-sm font-semibold text-white"> {data?.admin_email?.split("@")[0] || "Admin"}</p>
                  <p className="text-xs text-gray-500">{data?.admin_email || "admin@email.com"}</p>
                </div>

                {/* Logout */}
                <div className="p-1.5 border-t border-white/10">
                  <button
                    onClick={() => logout()}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition text-sm">
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
