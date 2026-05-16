"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Calendar,
  LayoutDashboard,
  Megaphone,
  GraduationCap,
  Home,
  BookOpen,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/teacher",
    icon: LayoutDashboard,
  },
  {
    label: "Announcements",
    href: "/teacher/announcements",
    icon: Megaphone,
  },
  {
    label: "Events",
    href: "/teacher/events",
    icon: Calendar,
  },
    {
    label: "Sessions",
    href: "/teacher/sessions",
    icon: Calendar,
  },
];

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <section className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-slate-200">
      <div className="mx-auto flex w-full max-w-[1990px] gap-6 p-4 md:p-6 lg:p-8">
        
        {/* ─── SOFT DESKTOP SIDEBAR ─── */}
        <aside className="sticky top-6 hidden h-[calc(100vh-4rem)] w-64 shrink-0 flex-col rounded-2xl border border-slate-200/80 bg-white shadow-sm lg:flex">
          {/* Top Section: Avatar & Greeting */}
          <div className="flex flex-col items-center pt-8 pb-6 px-6 border-b border-slate-100">
            <div className="relative w-24 h-24 mb-4">
              <div className="w-full h-full rounded-full bg-slate-100 overflow-hidden border-2 border-slate-200/60 p-1">
                <div className="w-full h-full rounded-full bg-indigo-50 flex items-center justify-center text-[#5c85ee]">
                  <GraduationCap className="size-10" />
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Hello Teacher</h2>
              <div className="flex items-center justify-center gap-1 text-slate-400 text-xs font-semibold mt-0.5 uppercase tracking-wider">
                Workspace Panel
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/teacher" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                    isActive
                      ? "bg-[#5c85ee] text-white shadow-md shadow-blue-100"
                      : "text-slate-400 hover:bg-slate-50 hover:text-slate-700"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* ─── CONTENT AREA ─── */}
        <div className="min-w-0 flex-1 flex flex-col">
          
          {/* ─── SOFT MOBILE NAV ─── */}
          <div className="sticky top-4 z-20 mb-6 rounded-xl border border-slate-200/80 bg-white/95 p-4 shadow-sm backdrop-blur lg:hidden">
            <div className="flex items-center justify-between gap-3">
              <Link href="/teacher" className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-lg bg-slate-900 text-white shadow-sm">
                  <Home className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 leading-tight">CampusConnect</p>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Teacher</p>
                </div>
              </Link>
              <div className="rounded-md border border-indigo-100 bg-indigo-50/60 px-2.5 py-1 text-[10px] font-extrabold text-[#5c85ee] uppercase tracking-wider">
                Faculty
              </div>
            </div>

            <nav className="mt-4 grid grid-cols-3 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/teacher" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-lg px-2 text-center text-[11px] font-bold border transition-all ${
                      isActive
                        ? "bg-[#5c85ee] text-white border-[#5c85ee] shadow-sm shadow-blue-100"
                        : "bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="size-4" />
                    <span className="leading-tight">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* ─── MAIN CONTENT CARD ─── */}
          <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm flex-1 flex flex-col">
            
            

            {/* Sub-header Controls */}
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 bg-white px-6 py-4 sm:px-8 lg:px-10">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-slate-50 text-slate-500 border border-slate-200">
                  <Bell className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-slate-900">
                    Welcome back, teacher
                  </p>
                  <p className="truncate text-[11px] text-slate-400 font-medium">
                    Manage your announcements and events from this panel.
                  </p>
                </div>
              </div>

              <Link
                href="/teacher/announcements/create"
                className="hidden rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800 sm:inline-flex"
              >
                + New Announcement
              </Link>
            </div>

            {/* Dynamic Page Content */}
            <main className="min-h-[520px] bg-slate-50/30 p-6 sm:p-8 lg:p-10 flex-1">
              {children}
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}