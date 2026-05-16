import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BellPlus,
  Search,
  ShieldCheck,
  UserCog,
  UsersRound,
  Calendar,
  Megaphone,
  Clock,
  Sparkles,
  MessageSquareCode,
  Activity,
  CheckCircle2,
  Server,
  Fingerprint
} from "lucide-react";

export default function HomePage(): React.JSX.Element {
  return (
    <main className="w-full min-h-screen bg-slate-50/50 text-slate-900 antialiased py-10">
      {/* Səhifə genişliyi 90% olaraq tənzimləndi */}
      <div className="w-[90%] mx-auto space-y-16">
        
        {/* ─── HERO & LIVE PREVIEW GRID ─── */}
        <section className="grid gap-8 lg:grid-cols-12 items-stretch">
          
          {/* Left Side: Hero Brand Card */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/20 via-transparent to-purple-50/10 pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-lg text-[11px] font-black text-indigo-600 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                <Sparkles size={12} className="inline mr-0.5" /> Hackathon 2026 Management System
              </div>

              <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl leading-[1.1]">
                Connect campus life in one <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">beautiful</span> workspace.
              </h1>

              <p className="text-sm sm:text-base text-slate-400 font-medium leading-relaxed max-w-2xl">
                CampusConnect telebeleri, muellimleri ve adminleri birlesdiren
                modern platformdur. Elanlar, eventler, lost & found ve komanda
                tapmaq funksiyalari tek yerde.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link 
                  href="/student" 
                  className="inline-flex items-center gap-2 px-5 py-3 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-sm transition-all group cursor-pointer"
                >
                  <span>Open student panel</span>
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link 
                  href="/register" 
                  className="inline-flex items-center px-5 py-3 bg-white border border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-50 font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  Create account
                </Link>
              </div>
            </div>

            {/* Bottom System Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-slate-100 max-w-md relative z-10">
              <div className="space-y-0.5">
                <p className="text-2xl font-black text-slate-950 tracking-tight">3</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">User roles</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-2xl font-black text-indigo-600 tracking-tight">24</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active teams</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-2xl font-black text-purple-600 tracking-tight">12</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Found items</p>
              </div>
            </div>
          </div>

          {/* Right Side: Live Interactive Analytics Preview */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
            <div className="space-y-5">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-md bg-indigo-600" />
                  <span className="text-xs font-black text-slate-950 uppercase tracking-wider">Live System Monitor</span>
                </div>
                <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md uppercase tracking-wider">Active</span>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Student Hub</p>
                <h2 className="text-lg font-black text-slate-950 tracking-tight leading-tight">Campus life, organized beautifully.</h2>
              </div>

              {/* Data Grid Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-indigo-50/40 border border-indigo-100/40 rounded-xl">
                  <strong className="text-lg font-black text-indigo-600 block">24</strong>
                  <span className="text-[11px] text-indigo-900/60 font-bold">Active teams</span>
                </div>
                <div className="p-3 bg-purple-50/40 border border-purple-100/40 rounded-xl">
                  <strong className="text-lg font-black text-purple-600 block">12</strong>
                  <span className="text-[11px] text-purple-900/60 font-bold">Found items</span>
                </div>
                <div className="p-3 bg-pink-50/40 border border-pink-100/40 rounded-xl">
                  <strong className="text-lg font-black text-pink-600 block">8</strong>
                  <span className="text-[11px] text-pink-900/60 font-bold">Teacher events</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <strong className="text-lg font-black text-slate-800 block">36</strong>
                  <span className="text-[11px] text-slate-400 font-bold">Announcements</span>
                </div>
              </div>
            </div>

            {/* Bottom Security / Role Indicator */}
            <div className="mt-4 p-3 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-bold flex items-center gap-1.5">
                <Fingerprint size={14} className="text-indigo-500" /> Security Token Active
              </span>
              <span className="font-mono text-slate-500 text-[10px]">#CC-2026-X9</span>
            </div>
          </div>
        </section>

        {/* ─── NEW SECTION: LIVE PULSE & CHAT STREAM (MORE PACKED) ─── */}
        <section className="grid gap-6 lg:grid-cols-3 items-stretch">
          
          {/* Column 1: Upcoming Events */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
                  <Calendar size={16} />
                </div>
                <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider">Events Schedule</h3>
              </div>
              <span className="text-[10px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md uppercase">Weekly</span>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-slate-50/60 border border-slate-100 rounded-xl space-y-1">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold text-slate-900">AI & Startup Hackathon 2026</p>
                  <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">Main</span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1"><Clock size={11} /> Akt zalı, 14:00</p>
              </div>
              <div className="p-3 bg-slate-50/60 border border-slate-100 rounded-xl space-y-1">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold text-slate-900">Frontend Code Review Seminar</p>
                  <span className="text-[9px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">Tech</span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1"><Clock size={11} /> Otaq 302, 11:30</p>
              </div>
            </div>
          </div>

          {/* Column 2: Recent Announcements */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                  <Megaphone size={16} />
                </div>
                <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider">Announcements</h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            </div>

            <div className="space-y-3">
              <div className="p-3 border border-l-4 border-l-amber-500 border-slate-200 rounded-xl bg-amber-50/10">
                <p className="text-xs font-bold text-slate-900 mb-0.5">Təqaüd sənədlərinin qəbulu uzadıldı</p>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Sənəd qəbulu ayın sonuna qədər aktiv olacaqdır.</p>
              </div>
              <div className="p-3 border border-l-4 border-l-indigo-500 border-slate-200 rounded-xl bg-indigo-50/10">
                <p className="text-xs font-bold text-slate-900 mb-0.5">Yeni Laboratoriya İstifadəyə Verildi</p>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Kompüter mühəndisliyi tələbələri üçün AI otağı hazırdır.</p>
              </div>
            </div>
          </div>

          {/* Column 3: Live Community Chat Simulation (Dolğunluq üçün) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <MessageSquareCode size={16} />
                </div>
                <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider">Campus Live Feed</h3>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 142 online
              </div>
            </div>

            <div className="space-y-2.5 overflow-hidden flex-1 max-h-[140px] pr-1">
              <div className="text-[11px] bg-slate-50 p-2 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-700 block mb-0.5">Nigar H. (Student)</span>
                <span className="text-slate-500 font-medium">Team Finder bölməsində hekaton qrupu yaratdım, baxarsınız.</span>
              </div>
              <div className="text-[11px] bg-indigo-50/50 p-2 rounded-lg border border-indigo-100/50">
                <span className="font-bold text-indigo-700 block mb-0.5">Aydın M. (Teacher)</span>
                <span className="text-slate-500 font-medium">Laboratoriya saatları elanlar bölməsinə əlavə edildi.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── WORKSPACE ROLES SECTION ─── */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider">Choose your workspace</h2>
            <p className="text-sm font-bold text-slate-900">
              Layihə üç əsas rola bölünüb: admin idarə edir, müəllim elan və event yaradır, tələbə isə istifadə edir.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {/* Student Card */}
            <Link href="/student" className="group p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                  <UsersRound size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-slate-950 group-hover:text-indigo-600 transition-colors">Student</h3>
                  <p className="text-xs font-medium text-slate-400 leading-relaxed">Dashboard, Lost & Found və Team Finder funksiyaları.</p>
                </div>
              </div>
            </Link>

            {/* Teacher Card */}
            <Link href="/login" className="group p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-purple-50 border border-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                  <BellPlus size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-slate-950 group-hover:text-purple-600 transition-colors">Teacher</h3>
                  <p className="text-xs font-medium text-slate-400 leading-relaxed">Elan yaratmaq və event əlavə etmək üçün müəllim girişi.</p>
                </div>
              </div>
            </Link>

            {/* Admin Card */}
            <Link href="/admin" className="group p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-pink-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-pink-50 border border-pink-100 text-pink-600 rounded-xl flex items-center justify-center">
                  <UserCog size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-slate-950 group-hover:text-pink-600 transition-colors">Admin</h3>
                  <p className="text-xs font-medium text-slate-400 leading-relaxed">User list, elan approve/sil və statistik dashboard.</p>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* ─── CORE FEATURES SECTION ─── */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-wider">Core features</h2>
            <p className="text-sm font-bold text-slate-900">Real məhsul hissi verən funksional və təmiz başlanğıc ekranı.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-5 bg-white border border-slate-200 rounded-xl flex gap-4 items-start shadow-sm">
              <div className="w-9 h-9 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl flex items-center justify-center shrink-0">
                <Search size={18} />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold text-slate-950">Lost & Found</h3>
                <p className="text-xs font-medium text-slate-400 leading-relaxed">İtirilmiş və tapılmış əşyaları sürətli izləmə.</p>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl flex gap-4 items-start shadow-sm">
              <div className="w-9 h-9 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold text-slate-950">Role based</h3>
                <p className="text-xs font-medium text-slate-400 leading-relaxed">Admin, müəllim və tələbə üçün ayrı iş axınları.</p>
              </div>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl flex gap-4 items-start shadow-sm">
              <div className="w-9 h-9 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl flex items-center justify-center shrink-0">
                <BarChart3 size={18} />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-bold text-slate-950">Statistics</h3>
                <p className="text-xs font-medium text-slate-400 leading-relaxed">Admin panel üçün ölçülə bilən dashboard göstəriciləri.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── BOTTOM PLATFORM INFRASTRUCTURE BAR (MORE PACKED EXTRA) ─── */}
        <section className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-xl text-indigo-400 border border-slate-700">
              <Server size={16} />
            </div>
            <div>
              <p className="text-xs font-bold tracking-wide">Infrastructure Node: Baku-East</p>
              <p className="text-[10px] text-slate-400 font-medium">All cloud systems and security workflows are fully operational.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl text-emerald-400">
            <Activity size={12} className="animate-pulse" />
            <CheckCircle2 size={12} className="text-emerald-400" /> SSL Secured & Encrypted
          </div>
        </section>

      </div>
    </main>
  );
}