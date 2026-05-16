"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Grid2X2,
  Home,
  Menu,
  Search,
  UsersRound,
} from "lucide-react";

// Keçmiş mini qrafik strukturunun saxlanılması (Soft rənglərlə)
function MiniChart({ color = "#5c85ee" }: { color?: string }) {
  return (
    <svg className="w-full h-10 mt-2 opacity-80" viewBox="0 0 160 48" fill="none">
      <path
        d="M3 38C18 25 31 20 45 29C58 37 68 39 78 18C88 -3 100 38 116 23C130 10 144 27 157 17"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Mövcud Lost & Found Art elementinin soft Tailwind vizualı
function LostFoundArt() {
  return (
    <div className="relative w-full h-24 bg-slate-50 border border-slate-100 rounded-lg overflow-hidden flex items-center justify-center mt-4">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
      <div className="flex -space-x-3 items-end bottom-2 relative">
        <div className="w-8 h-12 bg-slate-800 rounded-t-lg shadow-sm" />
        <div className="w-8 h-14 bg-amber-500 rounded-t-lg shadow-sm z-10 border-t border-amber-400" />
      </div>
      <div className="absolute top-2 right-2 w-5 h-5 bg-amber-50 text-amber-600 rounded-md border border-amber-100 flex items-center justify-center text-[10px] font-black animate-pulse">
        !
      </div>
    </div>
  );
}

// Mövcud Team Art elementinin soft Tailwind vizualı
function TeamArt() {
  return (
    <div className="relative w-full h-24 bg-slate-50 border border-slate-100 rounded-lg overflow-hidden flex items-center justify-center mt-4">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent" />
      <div className="flex -space-x-2 items-end bottom-2 relative">
        <div className="w-6 h-10 bg-indigo-400/60 rounded-t-md" />
        <div className="w-7 h-12 bg-slate-100 border border-slate-200 rounded-t-md z-10" />
        <div className="w-6 h-11 bg-indigo-500 rounded-t-md z-20" />
        <div className="w-6 h-9 bg-slate-800 rounded-t-md" />
      </div>
      <div className="absolute top-2 right-2 w-7 h-4 bg-white border border-slate-200/80 shadow-sm rounded text-[8px] font-bold text-slate-400 flex items-center justify-center">
        DOC
      </div>
    </div>
  );
}

export default function StudentDashboard(): React.JSX.Element {
  const pathname = usePathname();

  return (
    <div className="space-y-6 font-sans max-h-[calc(100vh-140px)] overflow-y-auto pr-1">
      
      {/* ─── HEADER SECTION ─── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-50 border border-indigo-100 text-[#5c85ee] rounded-lg flex items-center justify-center shadow-sm">
            <Home size={16} />
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-slate-900">CampusConnect</h1>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tələbə Paneli</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-[11px] font-bold text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Aktiv Tələbə
          </div>
          <button className="p-1.5 text-slate-400 hover:text-slate-600 bg-slate-50 border border-slate-200 rounded-lg transition-all sm:hidden cursor-type">
            <Menu size={15} />
          </button>
        </div>
      </div>

      {/* ─── MOBILE RESPONSIVE NAVIGATION ─── */}
      <nav className="flex sm:hidden gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200/60">
        <Link href="/student" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-[11px] font-bold bg-white text-slate-900 border border-slate-200/80 shadow-sm">
          <Grid2X2 size={13} />
          Dashboard
        </Link>
        <Link href="/student/lost-found" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-[11px] font-bold text-slate-400 hover:text-slate-600">
          <Search size={13} />
          Lost
        </Link>
        <Link href="/student/team-finder" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-[11px] font-bold text-slate-400 hover:text-slate-600">
          <UsersRound size={13} />
          Teams
        </Link>
      </nav>

      {/* ─── HERO & STATS COMBINED SECTION ─── */}
      <section className="grid gap-4 md:grid-cols-3">
        {/* Hero Banner Area */}
        <div className="md:col-span-2 rounded-xl border border-slate-200/80 bg-white p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-transparent pointer-events-none" />
          <div className="relative space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5c85ee] bg-indigo-50 px-2 py-0.5 rounded">
              Student Portal
            </span>
            <h2 className="text-base font-black tracking-tight text-slate-900 sm:text-lg max-w-sm leading-snug">
              Kampus həyatı, mükəmməl şəkildə təşkil olundu.
            </h2>
          </div>

          <div className="mt-6 relative z-10">
            <Link href="/student/team-finder" className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg shadow-sm transition-all group cursor-pointer">
              <span>Komanda Tap</span>
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Dynamic Metric Grid Columns */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          {/* Stat Item 1 */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Aktiv Komandalar</span>
              <div className="text-[#5c85ee] bg-indigo-50 p-1.5 rounded-lg border border-indigo-100">
                <UsersRound size={13} />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-black text-slate-900 tracking-tight">24</span>
              <MiniChart color="#5c85ee" />
            </div>
          </div>

          {/* Stat Item 2 */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Tapılan Əşyalar</span>
              <div className="text-amber-600 bg-amber-50 p-1.5 rounded-lg border border-amber-100">
                <Search size={13} />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-black text-slate-900 tracking-tight">12</span>
              <MiniChart color="#d97706" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTERACTIVE WORKSPACE CARDS ─── */}
      <section className="space-y-3">
        <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">İş Sahəsi (Workspace)</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Lost & Found Card */}
          <Link href="/student/lost-found" className="group relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors flex items-center gap-1.5">
                  <span>Lost & Found</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </h4>
                <span className="text-[9px] font-extrabold text-amber-600 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded uppercase">Tapıntı</span>
              </div>
              <LostFoundArt />
            </div>
          </Link>

          {/* Team Finder Card */}
          <Link href="/student/team-finder" className="group relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold tracking-tight text-slate-900 group-hover:text-[#5c85ee] transition-colors flex items-center gap-1.5">
                  <span>Team Finder</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </h4>
                <span className="text-[9px] font-extrabold text-[#5c85ee] bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded uppercase">Hekaton</span>
              </div>
              <TeamArt />
            </div>
          </Link>
        </div>
      </section>

      {/* ─── BOTTOM ACCENT FOOTER INFO CARD ─── */}
      <section className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 shadow-inner">
        <div className="flex flex-col gap-1">
          <h4 className="text-xs font-bold text-slate-700">Tələbə Məlumat Mərkəzi</h4>
          <p className="text-[11px] font-medium leading-relaxed text-slate-400">
            CampusConnect tələbə panelinə xoş gəlmisiniz. Sol və ya yuxarı menyudan lazımi bölmələri seçərək kampus daxili əməliyyatlarınızı və komanda tapşırıqlarınızı dərhal, operativ şəkildə idarə edə bilərsiniz.
          </p>
        </div>
      </section>

    </div>
  );
}