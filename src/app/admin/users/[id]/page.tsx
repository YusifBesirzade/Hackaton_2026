"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { 
  ArrowLeft, Mail, BadgeCheck, 
  ShieldAlert, Fingerprint, 
  ShieldCheck, Activity, 
  User as UserIcon, Loader2,
  CalendarDays, Hash, Sparkles
} from "lucide-react"
import { getUserById, User } from "@/services/AdminServices/User"

const UserDetail = () => {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = useCallback(async () => {
    if (!params.id) return
    setLoading(true)
    try {
      // API response strukturuna görə buranı tənzimləyirik
      const response = await getUserById(params.id as string)
      // Əgər API direkt obyekti qaytarırsa response, yoxsa response.data istifadə et
      setUser(response)
    } catch (error) {
      console.error("User fetching error:", error)
    } finally {
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
        <p className="text-slate-400 font-medium animate-pulse tracking-tight">Sistem məlumatları sinxronlaşdırılır...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC] p-6">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-slate-200/50 text-center space-y-6 max-w-sm border border-slate-100">
            <div className="mx-auto w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center">
                <ShieldAlert size={40} />
            </div>
            <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Profil Tapılmadı</h2>
                <p className="text-slate-500 text-sm font-medium">Daxil etdiyiniz identifikasiya nömrəsi sistemdə mövcut deyil.</p>
            </div>
            <button onClick={() => router.back()} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
                Geri qayıt
            </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-10 lg:p-16 bg-[#F8FAFC] min-h-screen font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* NAVIGATION & ACTION BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <button 
            onClick={() => router.back()}
            className="group flex items-center gap-3 text-slate-500 hover:text-slate-900 transition-all font-bold text-sm"
          >
            <div className="p-3 bg-white border border-slate-200 rounded-2xl group-hover:shadow-md group-hover:border-slate-300 transition-all">
              <ArrowLeft size={20} />
            </div>
            Geri qayıt
          </button>

          <div className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600/5 border border-indigo-100 rounded-2xl">
            <Fingerprint size={16} className="text-indigo-400" />
            <span className="text-[11px] font-mono text-indigo-600 font-bold tracking-tighter uppercase">Security ID: {user.id}</span>
          </div>
        </div>

        {/* HERO SECTION / IDENTITY CARD */}
        <div className="bg-white border border-slate-200/60 rounded-[3.5rem] p-8 md:p-14 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px]" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px]" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-10">
                {/* Visual Identity */}
                <div className="relative">
                    <div className="h-40 w-40 rounded-[3rem] bg-slate-900 text-white flex items-center justify-center text-5xl font-black shadow-2xl shadow-slate-300 ring-8 ring-slate-50 transition-transform hover:scale-105 duration-500">
                        {user.fullName?.[0].toUpperCase()}
                    </div>
                    {user.isActive && (
                        <div className="absolute -bottom-2 -right-2 p-2 bg-emerald-500 text-white rounded-2xl ring-4 ring-white">
                            <BadgeCheck size={24} />
                        </div>
                    )}
                </div>

                {/* Core Info */}
                <div className="flex-1 text-center lg:text-left space-y-6">
                    <div>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-3">
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">{user.fullName}</h1>
                            <div className={`px-4 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-widest ${user.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                {user.isActive ? 'Verified System Access' : 'Access Restricted'}
                            </div>
                        </div>
                        <p className="text-indigo-600 text-lg font-bold tracking-tight italic">@{user.userName}</p>
                    </div>

                    {/* Roles Badges */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                        {user.roles?.map((role, idx) => (
                            <div key={idx} className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.1em] shadow-lg shadow-slate-200">
                                <ShieldCheck size={14} className="text-indigo-400" />
                                {role}
                            </div>
                        ))}
                        <div className="px-5 py-2 bg-slate-50 text-slate-400 border border-slate-200 rounded-2xl text-[11px] font-bold uppercase tracking-widest">
                           Lvl. 04 Clearance
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-100 to-transparent my-12" />

            {/* METRIC GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <div className="p-8 bg-slate-50/50 border border-slate-100 rounded-[2.5rem] group hover:bg-white hover:shadow-xl hover:border-indigo-100 transition-all duration-300">
                    <div className="p-3 bg-white w-fit rounded-2xl shadow-sm text-indigo-600 mb-5 group-hover:scale-110 transition-transform">
                        <Mail size={24} />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Primary Endpoint</p>
                    <p className="font-bold text-slate-800 break-all">{user.email}</p>
                </div>

                <div className="p-8 bg-slate-50/50 border border-slate-100 rounded-[2.5rem] group hover:bg-white hover:shadow-xl hover:border-emerald-100 transition-all duration-300">
                    <div className="p-3 bg-white w-fit rounded-2xl shadow-sm text-emerald-600 mb-5 group-hover:scale-110 transition-transform">
                        <Activity size={24} />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Traffic Analysis</p>
                    <p className="font-bold text-slate-800">100% Reliable Connection</p>
                </div>

                <div className="p-8 bg-slate-50/50 border border-slate-100 rounded-[2.5rem] group hover:bg-white hover:shadow-xl hover:border-amber-100 transition-all duration-300">
                    <div className="p-3 bg-white w-fit rounded-2xl shadow-sm text-amber-600 mb-5 group-hover:scale-110 transition-transform">
                        <CalendarDays size={24} />
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Registration Cycle</p>
                    <p className="font-bold text-slate-800">Account Synchronized</p>
                </div>
            </div>
        </div>

        {/* BOTTOM UTILITY BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-10">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400">
                    <Sparkles size={20} />
                </div>
                <div>
                    <p className="text-xs font-black text-slate-900 uppercase">System Insights</p>
                    <p className="text-[11px] text-slate-400 font-medium italic">Data is encrypted with Phantom AES-256 Protocol</p>
                </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-10 py-4 bg-white border border-slate-200 rounded-[1.5rem] text-sm font-black text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95">
                    GENERATE LOGS
                </button>
                <button className="flex-1 md:flex-none px-10 py-4 bg-slate-900 text-white rounded-[1.5rem] text-sm font-black hover:bg-indigo-600 transition-all active:scale-95 shadow-2xl shadow-indigo-100">
                    MODIFY ACCESS
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetail