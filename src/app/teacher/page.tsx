"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Calendar,
  Megaphone,
  PlusCircle,
} from "lucide-react";

const cards = [
  {
    title: "Announcements",
    description:
      "Create, edit, and share announcements with students.",
    href: "/teacher/announcements",
    accent: "from-amber-500 to-orange-400",
    icon: Megaphone,
  },
  {
    title: "Events",
    description:
      "Plan and manage campus events.",
    href: "/teacher/events",
    accent: "from-violet-600 to-purple-400",
    icon: Calendar,
  },
  {
    title: "Create Announcement",
    description:
      "Create a new announcement to inform students.",
    href: "/teacher/announcements/create",
    accent: "from-emerald-500 to-teal-400",
    icon: PlusCircle,
  },
  {
    title: "Create Event",
    description: "Create a new campus event.",
    href: "/teacher/events/create",
    accent: "from-rose-500 to-pink-400",
    icon: PlusCircle,
  },
];

export default function TeacherDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">
            Dashboard
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Teacher workspace
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Share announcements, create events, and deliver valuable
            information to students. Manage all your operations from this panel.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              href={card.href}
              className="group relative overflow-hidden rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200"
            >
              <div
                className={`absolute -right-16 -top-16 size-40 rounded-full bg-gradient-to-br ${card.accent} opacity-15 blur-2xl transition group-hover:opacity-30`}
              />

              <div className="relative flex items-start justify-between gap-4">
                <div
                  className={`grid size-13 place-items-center rounded-2xl bg-gradient-to-br ${card.accent} text-white shadow-lg shadow-slate-200`}
                >
                  <Icon className="size-6" />
                </div>
                <div className="grid size-10 place-items-center rounded-full bg-slate-100 text-slate-500 transition group-hover:bg-slate-950 group-hover:text-white">
                  <ArrowUpRight className="size-5" />
                </div>
              </div>

              <div className="relative mt-7">
                <h2 className="text-xl font-black tracking-tight text-slate-950">
                  {card.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {card.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
