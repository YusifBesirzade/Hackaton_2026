import Link from "next/link";
import type { ReactNode } from "react";
import { Grid2X2, Search, ShieldCheck, UsersRound } from "lucide-react";
import "./student.css";

const studentLinks = [
  {
    label: "Dashboard",
    href: "/student",
    icon: Grid2X2,
    active: true,
  },
  {
    label: "Lost & Found",
    href: "/student/lost-found",
    icon: Search,
    active: false,
  },
  {
    label: "Team Finder",
    href: "/student/team-finder",
    icon: UsersRound,
    active: false,
  },
];

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <section className="student-shell">
      <aside className="student-sidebar">
        <div className="student-brand">
          <div className="student-brand-mark" />
          <div>
            <h2 className="student-brand-title">CampusConnect</h2>
            <p className="student-brand-subtitle">Student workspace</p>
          </div>
        </div>

        <nav className="student-nav">
          {studentLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`student-nav-link ${item.active ? "active" : ""}`}
              >
                <Icon />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="student-ready">
          <ShieldCheck />
          <div>
            <p className="student-ready-title">Hackathon ready</p>
            <p className="student-ready-text">
              Lost items and teams in one place.
            </p>
          </div>
        </div>

        <div className="student-sidebar-footer">
          <div className="student-n-mark">N</div>
        </div>
      </aside>

      <main className="student-main">{children}</main>
    </section>
  );
}
