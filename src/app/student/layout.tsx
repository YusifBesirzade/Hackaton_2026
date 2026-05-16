"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Home,
  LayoutDashboard,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/student",
    icon: LayoutDashboard,
  },
  {
    label: "Lost & Found",
    href: "/student/lost-found",
    icon: Search,
  },
  {
    label: "Team Finder",
    href: "/student/team-finder",
    icon: Users,
  },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <section className="min-h-[calc(100vh-80px)] bg-[#f6f8fc] text-slate-950">
      <div className="mx-auto flex w-full max-w-[1600px] gap-5 px-4 py-4 sm:px-6 lg:px-8">
        <aside className="sticky top-4 hidden h-[calc(100vh-112px)] w-72 shrink-0 overflow-hidden rounded-[28px] border border-white/70 bg-slate-950 text-white shadow-2xl shadow-slate-200/70 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#3b82f6_0,transparent_32%),radial-gradient(circle_at_bottom_right,#14b8a6_0,transparent_30%)] opacity-35" />

          <div className="relative flex h-full flex-col p-5">
            <Link href="/student" className="group flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-2xl bg-white text-slate-950 shadow-lg shadow-blue-950/20">
                <Sparkles className="size-6" />
              </div>
              <div>
                <p className="text-lg font-black tracking-tight">
                  CampusConnect
                </p>
                <p className="text-xs font-medium text-slate-300">
                  Student workspace
                </p>
              </div>
            </Link>

            <nav className="mt-9 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

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
                          ? "text-blue-600"
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
                <div className="grid size-10 place-items-center rounded-2xl bg-emerald-400/20 text-emerald-200">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">Hackathon ready</p>
                  <p className="text-xs text-slate-300">
                    Lost items and teams in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="sticky top-3 z-20 mb-5 rounded-[24px] border border-white/80 bg-white/85 p-3 shadow-xl shadow-slate-200/60 backdrop-blur-xl lg:hidden">
            <div className="flex items-center justify-between gap-3">
              <Link href="/student" className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-2xl bg-slate-950 text-white">
                  <Home className="size-5" />
                </div>
                <div>
                  <p className="font-black leading-tight">CampusConnect</p>
                  <p className="text-xs font-medium text-slate-500">
                    Student panel
                  </p>
                </div>
              </Link>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">
                Live
              </div>
            </div>

            <nav className="mt-3 grid grid-cols-3 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

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

          <div className="overflow-hidden rounded-[30px] border border-white/80 bg-white shadow-2xl shadow-slate-200/70">
            <div className="relative overflow-hidden border-b border-slate-100 bg-slate-950 px-5 py-6 text-white sm:px-7 lg:px-9">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#38bdf8_0,transparent_30%),radial-gradient(circle_at_80%_0,#a78bfa_0,transparent_28%),linear-gradient(135deg,rgba(15,23,42,0),rgba(15,23,42,1))] opacity-70" />

              <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-slate-200 backdrop-blur">
                    Student Portal
                  </p>
                  <h1 className="mt-4 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                    Campus life, organized beautifully.
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                    Lost & Found elanlarını izlə, komanda tap və tələbə
                    fəaliyyətlərini bir paneldən idarə et.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                    <p className="text-2xl font-black">24</p>
                    <p className="text-xs font-medium text-slate-300">
                      Active teams
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                    <p className="text-2xl font-black">12</p>
                    <p className="text-xs font-medium text-slate-300">
                      Found items
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-slate-100 bg-white px-5 py-4 sm:px-7 lg:px-9">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                  <Bell className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">
                    Welcome back, student
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    Explore campus updates and collaboration opportunities.
                  </p>
                </div>
              </div>

              <Link
                href="/student/team-finder"
                className="hidden rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-blue-600 sm:inline-flex"
              >
                Find team
              </Link>
            </div>

            <main className="min-h-[520px] bg-[#fbfcff] p-5 sm:p-7 lg:p-9">
              {children}
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}
