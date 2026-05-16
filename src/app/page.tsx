import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BellPlus,
  Search,
  ShieldCheck,
  UserCog,
  UsersRound,
} from "lucide-react";
import "./home.css";

export default function HomePage(): React.JSX.Element {
  return (
    <main className="home-page">
      <div className="home-wrap">
        <section className="home-hero">
          <div className="home-hero-card">
            <div className="home-badge">
              <span className="home-badge-dot" />
              Hackathon 2026 campus platform
            </div>

            <h1 className="home-title">
              Connect campus life in one <span>beautiful</span> workspace.
            </h1>

            <p className="home-subtitle">
              CampusConnect telebeleri, muellimleri ve adminleri birlesdiren
              modern platformdur. Elanlar, eventler, lost & found ve komanda
              tapmaq funksiyalari tek yerde.
            </p>

            <div className="home-actions">
              <Link href="/student" className="home-primary">
                Open student panel
                <ArrowRight size={19} />
              </Link>
              <Link href="/register" className="home-secondary">
                Create account
              </Link>
            </div>

            <div className="home-metrics">
              <div className="metric-box">
                <p className="metric-value">3</p>
                <p className="metric-label">User roles</p>
              </div>
              <div className="metric-box">
                <p className="metric-value">24</p>
                <p className="metric-label">Active teams</p>
              </div>
              <div className="metric-box">
                <p className="metric-value">12</p>
                <p className="metric-label">Found items</p>
              </div>
            </div>
          </div>

          <div className="home-visual">
            <div className="visual-panel">
              <div className="visual-top">
                <div className="visual-logo">
                  <span className="visual-logo-mark" />
                  CampusConnect
                </div>
                <span className="visual-pill">Live preview</span>
              </div>

              <div className="visual-hero">
                <p>Student Portal</p>
                <h2>Campus life, organized beautifully.</h2>
              </div>

              <div className="visual-grid">
                <div className="visual-mini">
                  <strong>24</strong>
                  <span>Active teams</span>
                </div>
                <div className="visual-mini">
                  <strong>12</strong>
                  <span>Found items</span>
                </div>
                <div className="visual-mini">
                  <strong>8</strong>
                  <span>Teacher events</span>
                </div>
                <div className="visual-mini">
                  <strong>36</strong>
                  <span>Announcements</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section">
          <div className="section-heading">
            <h2>Choose your workspace</h2>
            <p>
              Layihə üç əsas rola bölünüb: admin idarə edir, müəllim elan və
              event yaradır, tələbə isə campus funksiyalarından istifadə edir.
            </p>
          </div>

          <div className="role-grid">
            <Link href="/student" className="role-card student">
              <div className="role-icon">
                <UsersRound size={23} />
              </div>
              <h3>Student</h3>
              <p>Dashboard, Lost & Found və Team Finder funksiyaları.</p>
            </Link>

            <Link href="/login" className="role-card teacher">
              <div className="role-icon">
                <BellPlus size={23} />
              </div>
              <h3>Teacher</h3>
              <p>Elan yaratmaq və event əlavə etmək üçün müəllim girişi.</p>
            </Link>

            <Link href="/admin" className="role-card admin">
              <div className="role-icon">
                <UserCog size={23} />
              </div>
              <h3>Admin</h3>
              <p>User list, elan approve/sil və statistik dashboard.</p>
            </Link>
          </div>
        </section>

        <section className="home-section">
          <div className="section-heading">
            <h2>Core features</h2>
            <p>
              Hackathon təqdimatı üçün sadə deyil, real məhsul hissi verən
              funksional və təmiz başlanğıc ekranı.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Search size={23} />
              </div>
              <h3>Lost & Found</h3>
              <p>İtirilmiş və tapılmış əşyaları sürətli izləmə.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <ShieldCheck size={23} />
              </div>
              <h3>Role based</h3>
              <p>Admin, müəllim və tələbə üçün ayrı iş axınları.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <BarChart3 size={23} />
              </div>
              <h3>Statistics</h3>
              <p>Admin panel üçün ölçülə bilən dashboard göstəriciləri.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
