"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BookOpen,
  Calendar,
  GraduationCap,
  Home,
  LayoutDashboard,
  Megaphone,
  ShieldCheck,
  Sparkles,
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
];

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <section className="min-h-[calc(100vh-80px)] bg-[#f6f8fc] text-slate-950">
      <div className="mx-auto flex w-full max-w-[1600px] gap-5 px-4 py-4 sm:px-6 lg:px-8">
        {/* ─── DESKTOP SIDEBAR ─── */}
        <aside className="sticky top-4 hidden h-[calc(100vh-112px)] w-72 shrink-0 overflow-hidden rounded-[28px] border border-white/70 bg-slate-950 text-white shadow-2xl shadow-slate-200/70 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#f59e0b_0,transparent_32%),radial-gradient(circle_at_bottom_right,#8b5cf6_0,transparent_30%)] opacity-35" />

          <div className="relative flex h-full flex-col p-5">
            <Link href="/teacher" className="group flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-2xl bg-white text-slate-950 shadow-lg shadow-amber-950/20">
                <GraduationCap className="size-6" />
              </div>
              <div>
                <p className="text-lg font-black tracking-tight">
                  CampusConnect
                </p>
                <p className="text-xs font-medium text-slate-300">
                  Teacher workspace
                </p>
              </div>
            </Link>

            <nav className="mt-9 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/teacher" &&
                    pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-white text-slate-950 shadow-xl shadow-black/10"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`size-5 ${
                        isActive
                          ? "text-amber-600"
                          : "text-slate-400 group-hover:text-white"
                      }`}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-2xl bg-amber-400/20 text-amber-200">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">Teacher Panel</p>
                  <p className="text-xs text-slate-300">
                    Manage announcements &amp; events
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ─── CONTENT AREA ─── */}
        <div className="min-w-0 flex-1">
          {/* ─── MOBILE NAV ─── */}
          <div className="sticky top-3 z-20 mb-5 rounded-[24px] border border-white/80 bg-white/85 p-3 shadow-xl shadow-slate-200/60 backdrop-blur-xl lg:hidden">
            <div className="flex items-center justify-between gap-3">
              <Link href="/teacher" className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-2xl bg-slate-950 text-white">
                  <Home className="size-5" />
                </div>
                <div>
                  <p className="font-black leading-tight">CampusConnect</p>
                  <p className="text-xs font-medium text-slate-500">
                    Teacher panel
                  </p>
                </div>
              </Link>
              <div className="rounded-2xl border border-amber-100 bg-amber-50 px-3 py-2 text-xs font-black text-amber-700">
                Teacher
              </div>
            </div>

            <nav className="mt-3 grid grid-cols-3 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/teacher" &&
                    pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl px-2 text-center text-[11px] font-bold transition ${
                      isActive
                        ? "bg-slate-950 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Icon className="size-4" />
                    <span className="leading-tight">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* ─── MAIN CARD ─── */}
          <div className="overflow-hidden rounded-[30px] border border-white/80 bg-white shadow-2xl shadow-slate-200/70">
            {/* Banner */}
            <div className="relative overflow-hidden border-b border-slate-100 bg-slate-950 px-5 py-6 text-white sm:px-7 lg:px-9">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#f59e0b_0,transparent_30%),radial-gradient(circle_at_80%_0,#8b5cf6_0,transparent_28%),linear-gradient(135deg,rgba(15,23,42,0),rgba(15,23,42,1))] opacity-70" />

              <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-slate-200 backdrop-blur">
                    Teacher Portal
                  </p>
                  <h1 className="mt-4 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                    Shape the campus experience.
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                    Share announcements, create events, and deliver
                    valuable information to students.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                    <p className="text-2xl font-black">
                      <BookOpen className="inline size-6 mr-1 -mt-1" />
                    </p>
                    <p className="text-xs font-medium text-slate-300">
                      Announcements
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                    <p className="text-2xl font-black">
                      <Calendar className="inline size-6 mr-1 -mt-1" />
                    </p>
                    <p className="text-xs font-medium text-slate-300">
                      Events
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-header */}
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 bg-white px-5 py-4 sm:px-7 lg:px-9">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-amber-50 text-amber-600">
                  <Bell className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">
                    Welcome back, teacher
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    Manage your announcements and events from this panel.
                  </p>
                </div>
              </div>

              <Link
                href="/teacher/announcements/create"
                className="hidden rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-amber-600 sm:inline-flex"
              >
                + New Announcement
              </Link>
            </div>

            {/* Page content */}
            <main className="min-h-[520px] bg-[#fbfcff] p-5 sm:p-7 lg:p-9">
              {children}
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}
