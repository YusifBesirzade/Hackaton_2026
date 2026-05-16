import Link from "next/link";
import {
  ArrowRight,
  Grid2X2,
  Home,
  Menu,
  Search,
  UsersRound,
} from "lucide-react";

function MiniChart({ color = "#1f334c" }: { color?: string }) {
  return (
    <svg className="student-chart" viewBox="0 0 160 48" fill="none">
      <path
        d="M3 38C18 25 31 20 45 29C58 37 68 39 78 18C88 -3 100 38 116 23C130 10 144 27 157 17"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LostFoundArt() {
  return (
    <div className="people-art">
      <div className="person person-one body-dark" />
      <div className="head head-one" />
      <div className="person person-two body-cyan" />
      <div className="head head-two" />
      <div className="alert-bubble">!</div>
    </div>
  );
}

function TeamArt() {
  return (
    <div className="people-art">
      <div className="person person-one body-cyan" />
      <div className="head head-one" />
      <div className="person person-three body-light" />
      <div className="head head-three" />
      <div className="person person-four body-cyan" />
      <div className="head head-four" />
      <div className="person person-five body-dark" />
      <div className="head head-five" />
      <div className="paper-card" />
    </div>
  );
}

export default function StudentDashboard(): React.JSX.Element {
  return (
    <div className="student-page">
      <div className="student-page-header">
        <div className="student-title-row">
          <div className="student-home-icon">
            <Home />
          </div>
          <div>
            <p className="student-page-title">CampusConnect</p>
            <p className="student-page-subtitle">Student panel</p>
          </div>
        </div>

        <div className="student-status-row">
          <div className="student-status-pill">
            <span className="student-status-dot" />
            Current Student
          </div>
          <button className="student-menu-button" type="button">
            <Menu />
          </button>
        </div>
      </div>

      <nav className="student-mobile-nav">
        <Link href="/student" className="student-mobile-link active">
          <Grid2X2 />
          Dashboard
        </Link>
        <Link href="/student/lost-found" className="student-mobile-link">
          <Search />
          Lost & Found
        </Link>
        <Link href="/student/team-finder" className="student-mobile-link">
          <UsersRound />
          Team Finder
        </Link>
      </nav>

      <section className="student-hero">
        <div className="student-hero-grid">
          <div className="student-hero-copy">
            <div>
              <p className="student-kicker">Student Portal</p>
              <h1 className="student-hero-title">
                Campus life, organized beautifully.
              </h1>
            </div>

            <Link href="/student/team-finder" className="student-cta">
              Find team
              <ArrowRight />
            </Link>
          </div>

          <div className="student-stat-grid">
            <div className="student-stat-card">
              <div className="student-stat-icon">
                <UsersRound />
              </div>
              <p className="student-stat-value">24</p>
              <p className="student-stat-label">Active teams</p>
              <MiniChart />
            </div>

            <div className="student-stat-card">
              <div className="student-stat-icon">
                <Search />
              </div>
              <p className="student-stat-value">12</p>
              <p className="student-stat-label">Found items</p>
              <MiniChart color="#2aa6bf" />
            </div>
          </div>
        </div>
      </section>

      <section className="student-workspace">
        <h2 className="student-section-title">Workspace</h2>

        <div className="student-workspace-grid">
          <Link href="/student/lost-found" className="workspace-card lost">
            <div className="workspace-inner-border" />
            <h3 className="workspace-title">
              Lost & Found
              <ArrowRight />
            </h3>
            <LostFoundArt />
          </Link>

          <Link href="/student/team-finder" className="workspace-card team">
            <div className="workspace-inner-border" />
            <h3 className="workspace-title">
              Team Finder
              <ArrowRight />
            </h3>
            <TeamArt />
          </Link>
        </div>
      </section>

      <section className="student-info-card">
        <h2 className="student-info-title">Student Workspace</h2>
        <p className="student-info-text">
          CampusConnect telebe paneline xos gelmisiniz. Lazimli bolmeleri
          secerek campus emeliyyatlarini suretle idare edin.
        </p>
      </section>
    </div>
  );
}
