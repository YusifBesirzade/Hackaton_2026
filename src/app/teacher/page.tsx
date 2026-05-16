"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Calendar,
  Megaphone,
  PlusCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const cards = [
  {
    title: "Announcements",
    description: "Tələbələr üçün yeni elanlar yaradın, redaktə edin və paylaşın.",
    href: "/teacher/announcements",
    bgStyle: "bg-indigo-50/60 text-[#5c85ee] border-indigo-100",
    icon: Megaphone,
    badge: "12 Aktiv"
  },
  {
    title: "Events",
    description: "Kampus daxili və onlayn tədbirləri planlaşdırın və idarə edin.",
    href: "/teacher/events",
    bgStyle: "bg-amber-50/60 text-amber-600 border-amber-100",
    icon: Calendar,
    badge: "3 Gözləyən"
  },
  {
    title: "Create Announcement",
    description: "Tələbələri dərhal məlumatlandırmaq üçün yeni bir elan yaradın.",
    href: "/teacher/announcements/create",
    bgStyle: "bg-emerald-50/60 text-emerald-600 border-emerald-100",
    icon: PlusCircle,
    badge: "Sürətli"
  },
  {
    title: "Create Event",
    description: "Tələbə və müəllim heyəti üçün yeni bir kampus tədbiri planlaşdırın.",
    href: "/teacher/events/create",
    bgStyle: "bg-rose-50/60 text-rose-600 border-rose-100",
    icon: PlusCircle,
    badge: "Yeni"
  },
];

export default function TeacherDashboardPage() {
  return (
    <div className="space-y-6 font-sans">
      
      {/* ─── HEADER SECTION ─── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5c85ee] bg-indigo-50 px-2 py-0.5 rounded">
              Workspace
            </span>
            <span className="text-slate-300 text-xs">•</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Overview
            </span>
          </div>
          <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
            Müəllim İdarəetmə Paneli
          </h2>
          <p className="max-w-2xl text-xs font-medium leading-relaxed text-slate-400">
            Sistem daxili elanlarınızı təşkil edin, yeni dərslər və tədbirlər qurun və tələbələrlə olan interaktivliyi bir nöqtədən nəzarətdə saxlayın.
          </p>
        </div>
      </div>

      {/* ─── QUICK OPERATIONAL HERO ACCENT ─── */}
      <div className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 flex items-center gap-4 shadow-sm">
        <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-[#5c85ee] border border-indigo-100 shrink-0">
          <Sparkles size={16} />
        </div>
        <div className="min-w-0">
          <h3 className="text-xs font-bold text-slate-900">Xoş gördük, Müəllim</h3>
          <p className="text-[11px] font-medium text-slate-400 truncate mt-0.5">Aşağıdakı soft kartlar vasitəsilə dərhal əməliyyatlara başlaya bilərsiniz.</p>
        </div>
      </div>

      {/* ─── CARDS GRID (8px - 12px Soft Radius) ─── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              href={card.href}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
            >
              <div>
                {/* Card Top Control Section */}
                <div className="relative flex items-center justify-between gap-4">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center border shadow-sm ${card.bgStyle}`}
                  >
                    <Icon className="size-4.5" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 uppercase tracking-wide">
                      {card.badge}
                    </span>
                    <div className="w-7 h-7 rounded-lg border border-slate-100 bg-slate-50 text-slate-400 transition-all group-hover:bg-slate-900 group-hover:text-white flex items-center justify-center">
                      <ArrowUpRight className="size-3.5" />
                    </div>
                  </div>
                </div>

                {/* Card Content Section */}
                <div className="mt-4">
                  <h3 className="text-sm font-bold tracking-tight text-slate-900 group-hover:text-[#5c85ee] transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-slate-400 max-w-sm">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Action Label */}
              <div className="mt-5 pt-3 border-t border-slate-50 flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-slate-600 transition-colors">
                <span>İdarəetməyə keç</span>
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}