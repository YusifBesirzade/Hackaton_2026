"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Grid2X2, 
  Search, 
  UsersRound, 
  ShieldCheck 
} from "lucide-react";

const studentLinks = [
  {
    label: "Dashboard",
    href: "/student",
    icon: Grid2X2,
  },
  {
    label: "Lost & Found",
    href: "/student/lost-found",
    icon: Search,
  },
  {
    label: "Team Finder",
    href: "/student/team-finder",
    icon: UsersRound,
  },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <section className="min-h-screen bg-slate-50/50 flex p-4 font-sans relative">
      
      {/* ─── STUDENT SIDEBAR (ADMIN DİZAYNININ EYNİSİ) ─── */}
      <aside className="w-65 h-[93.5vh] bg-white flex flex-col fixed left-4 top-4 rounded-lg bottom-4 z-40 shadow-sm border border-slate-100">
        
        {/* Top Section: Student Profile Image & Greeting */}
        <div className="flex flex-col items-center pt-8 pb-6 px-6">
          <div className="relative w-32 h-32 mb-4">
            <div className="w-full h-full rounded-full bg-[#e5e7ff] overflow-hidden flex items-center justify-center border border-indigo-100">
              {/* Əgər profil şəkli yoxdursa, baş hərfi və ya n-mark vizualını bura yerləşdiririk */}
              <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-indigo-100/60 flex items-center justify-center text-3xl font-black text-[#5c85ee]">
                N
              </div>
            </div>
          </div>

          <div className="text-center space-y-0.5">
            <h2 className="text-xl font-bold text-[#00145e] tracking-tight">CampusConnect</h2>
            <div className="flex items-center justify-center gap-1 text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <span>Student workspace</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-6 space-y-1 overflow-y-auto">
          {studentLinks.map((item) => {
            const Icon = item.icon;
            // Next.js usePathname ilə tam uyğun aktivlik yoxlanışı
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg text-[15px] font-semibold transition-all ${
                  isActive
                    ? "bg-[#5c85ee] text-white shadow-lg shadow-blue-200"
                    : "text-[#94a3b8] hover:bg-slate-50 hover:text-slate-600"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-[#94a3b8]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section: Hackathon Ready Information Alert Box */}
        <div className="mx-6 mb-6 p-3.5 bg-slate-50/60 border border-slate-100 rounded-lg flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-900">Hackathon ready</p>
            <p className="text-[11px] text-slate-400 font-medium leading-tight">
              Lost items and teams in one place.
            </p>
          </div>
        </div>
      </aside>

      {/* ─── MAIN CONTENT AREA ─── */}
      <main className="flex-1 pl-[280px] min-h-[93.5vh]">
        <div className="w-full bg-white rounded-lg p-6 min-h-[93.5vh] border border-slate-100 shadow-sm">
          {children}
        </div>
      </main>

    </section>
  );
}