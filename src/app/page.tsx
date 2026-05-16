import React from 'react';
import Link from 'next/link';

export default function StudentDashboard(): React.JSX.Element {
  return (
    <div className="p-6 space-y-8 max-w-7xl w-full mx-auto">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <div className="p-1.5 bg-white rounded-lg shadow-sm border border-gray-100 flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-10 11V11a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 00-1-1h-2M10 20v-6m4 0V20" />
          </svg>
        </div>
        <div>
          <span className="font-semibold text-gray-800 block text-xs md:text-sm">CampusConnect</span>
          <span className="text-[10px] text-gray-400 block">Student panel</span>
        </div>
      </div>

      {/* Banner & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* Modern Gradient Banner */}
        <div className="lg:col-span-7 bg-gradient-to-tr from-[#A8E0F7] via-[#D8ECF8] to-[#FFF5E6] rounded-[28px] p-8 flex flex-col justify-between shadow-sm relative overflow-hidden min-h-[260px]">
          <div>
            <span className="text-xs font-bold text-gray-600 block uppercase tracking-wider mb-2">Student Portal</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight max-w-sm">
              Campus life, organized beautifully.
            </h1>
          </div>
          <Link href="/student/team-finder" className="mt-6 w-fit bg-[#0081A7] hover:bg-[#006F90] text-white font-semibold px-6 py-2.5 rounded-full transition-all flex items-center gap-2 text-sm shadow-sm group">
            Find team <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Stats Kartları (Yan-yana) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Active Teams */}
          <div className="bg-white/50 backdrop-blur-md border border-white rounded-[24px] p-6 flex flex-col justify-between shadow-sm group hover:shadow-md transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-600 mb-4 border border-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <span className="text-4xl font-black text-gray-900 block tracking-tight">24</span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Active teams</span>
            </div>
            <div className="mt-4">
              <svg className="w-full h-8 text-slate-400/60" viewBox="0 0 100 30" fill="none">
                <path d="M0 22C20 18 30 5 50 12C70 20 80 8 100 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Found Items */}
          <div className="bg-white/50 backdrop-blur-md border border-white rounded-[24px] p-6 flex flex-col justify-between shadow-sm group hover:shadow-md transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-600 mb-4 border border-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <span className="text-4xl font-black text-gray-900 block tracking-tight">12</span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Found items</span>
            </div>
            <div className="mt-4">
              <svg className="w-full h-8 text-[#0081A7]" viewBox="0 0 100 30" fill="none">
                <path d="M0 25C20 22 40 8 60 18C80 28 90 10 100 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

        </div>
      </div>

      {/* Workspace Bölməsi */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Workspace</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <Link href="/student/lost-found" className="bg-[#FCF6E9] rounded-[24px] p-6 flex items-center justify-between shadow-sm min-h-[140px] group border border-black/5 hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#0081A7] transition-colors flex items-center gap-2">
              Lost & Found <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
            </h3>
            <div className="text-xs bg-black/5 px-4 py-2 rounded-xl border border-dashed border-black/10 text-gray-500">
              Illustration
            </div>
          </Link>

          <Link href="/student/team-finder" className="bg-[#E4ECEF] rounded-[24px] p-6 flex items-center justify-between shadow-sm min-h-[140px] group border border-black/5 hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#0081A7] transition-colors flex items-center gap-2">
              Team Finder <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
            </h3>
            <div className="text-xs bg-black/5 px-4 py-2 rounded-xl border border-dashed border-black/10 text-gray-500">
              Illustration
            </div>
          </Link>

        </div>
      </div>

      {/* Alt İnfo */}
      <div className="bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm space-y-2">
        <h3 className="text-md font-bold text-gray-900">Student Workspace</h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          CampusConnect tələbə panelinə xoş gəlmisiniz. Lazımlı bölmələri seçərək campus əməliyyatlarını sürətlə idarə edin.
        </p>
      </div>

    </div>
  );
}