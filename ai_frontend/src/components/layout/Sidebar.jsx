"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  CalendarCheck,
  BrainCircuit,
  Camera,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Students",
    href: "/dashboard/students",
    icon: GraduationCap,
    badge: null,
  },
  {
    name: "Batches",
    href: "/dashboard/batches",
    icon: Users,
    badge: null,
  },
  {
    name: "Attendance",
    href: "/dashboard/attendance",
    icon: CalendarCheck,
    badge: "Live",
  },
  {
    name: "Embeddings",
    href: "/dashboard/embeddings",
    icon: BrainCircuit,
    badge: null,
  },
  {
    name: "Cameras",
    href: "/dashboard/cameras",
    icon: Camera,
    badge: null,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Overlay (hidden on desktop) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0  bg-[#0d0d14] border-t border-white/10 flex items-center justify-around px-2 py-5 z-50 ">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-indigo-400"
                  : "text-white hover:text-gray-300"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[8px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col relative h-screen bg-[#0d0d14] border-r border-white/10 transition-all duration-300 ease-in-out ${
          collapsed ? "w-18" : "w-64"
        }`}
      >
        {/* Logo */}
        <div
          className={`flex items-center gap-3 px-4 h-16 border-b border-white/10 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
            <Sparkles size={16} className="text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-sm font-semibold text-white leading-tight">
                AI Attendance
              </h1>
              <p className="text-[10px] text-gray-500 leading-tight">
                Smart System
              </p>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {!collapsed && (
            <p className="text-[10px] uppercase text-gray-600 tracking-widest font-semibold px-3 mb-3">
              Main Menu
            </p>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                title={collapsed ? item.name : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                  collapsed ? "justify-center" : ""
                } ${
                  isActive
                    ? "bg-indigo-600/20 text-indigo-400"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {/* Active indicator line */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-400 rounded-r-full" />
                )}

                <Icon
                  size={18}
                  strokeWidth={isActive ? 2 : 1.5}
                  className={`shrink-0 transition-colors ${
                    isActive
                      ? "text-indigo-400"
                      : "group-hover:text-white text-gray-500"
                  }`}
                />

                {!collapsed && (
                  <>
                    <span className="text-xl font-medium flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}

                {/* Tooltip when collapsed */}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-gray-800 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity duration-150 border border-white/10">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        {!collapsed && (
          <div className="px-3 pb-4">
            <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-xl p-3">
              <p className="text-xs text-indigo-300 font-medium mb-0.5">
                System Active
              </p>
              <p className="text-[11px] text-gray-500">
                Face recognition running
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-emerald-400">Online</span>
              </div>
            </div>
          </div>
        )}

        {/* Collapse Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-[#0d0d14] border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500/50 transition-all duration-200 z-10"
        >
          {collapsed ? (
            <ChevronRight size={12} />
          ) : (
            <ChevronLeft size={12} />
          )}
        </button>
      </aside>
    </>
  );
}
