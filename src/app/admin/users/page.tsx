"use client"

import { useEffect, useState, useCallback } from "react"
import { 
  Search, ChevronLeft, ChevronRight, 
  MoreVertical, Mail, BadgeCheck, 
  ShieldAlert, User as UserIcon, 
  Download, Filter, ArrowUpDown
} from "lucide-react"
import { getUsers, User, UserResponse } from "@/services/AdminServices/User"

const AdminUsers = () => {
  const [response, setResponse] = useState<UserResponse["data"] | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getUsers(page, 10, search)
      if (res.succeeded) {
        setResponse(res.data)
      }
    } catch (error) {
      console.error("Fetch Error:", error)
    } finally {
      setLoading(false)
    }
  }, [page, search])

  useEffect(() => {
    const timer = setTimeout(() => fetchUsers(), 400)
    return () => clearTimeout(timer)
  }, [fetchUsers])

  // Rol rəngləri üçün helper
  const getRoleStyle = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'bg-rose-50 text-rose-600 border-rose-100';
      case 'teacher': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'student': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  }

  return (
    <div className="p-6 lg:p-10 bg-[#FAFBFF] min-h-screen space-y-8">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Member Directory</h1>
          <p className="text-slate-500 font-medium mt-1 italic">
            Sistemdə <span className="text-slate-900 font-bold">{response?.totalCount || 0}</span> qeydiyyatlı profil mövcuddur.
          </p>
        </div>
        {/* <div className="flex items-center gap-3">
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={20} />
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
            <Filter size={18} /> Filters
          </button>
        </div> */}
      </div>

      {/* SEARCH BAR */}
      <div className="relative group max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
        <input 
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.5rem] text-sm outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-sm"
          placeholder="İstifadəçi adı, ad və ya email ilə axtar..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      {/* TABLE CARD */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Profile Info</th>
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Roles / Status</th>
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Contact</th>
                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Account UID</th>
                <th className="px-8 py-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-8 py-8 h-24 bg-slate-50/5"></td>
                  </tr>
                ))
              ) : response?.items.map((user: User) => (
                <tr key={user.id} className="hover:bg-blue-50/30 transition-all group">
                  {/* Profile Info */}
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shadow-lg group-hover:scale-110 transition-transform">
                        {user.fullName ? user.fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() : '?'}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-slate-900">{user.fullName}</span>
                        <span className="text-xs font-bold text-blue-600 italic">@{user.userName}</span>
                      </div>
                    </div>
                  </td>

                  {/* Roles & Status */}
                  <td className="px-8 py-5">
                    <div className="flex flex-wrap gap-2 items-center">
                      {user.roles?.map((role: string, idx: number) => (
                        <span key={idx} className={`px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider ${getRoleStyle(role)}`}>
                          {role}
                        </span>
                      ))}
                      {user.isActive ? (
                        <BadgeCheck size={18} className="text-emerald-500" />
                      ) : (
                        <ShieldAlert size={18} className="text-rose-500"  />
                      )}
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-slate-500 font-bold group-hover:text-slate-900 transition-colors">
                      <Mail size={16} className="text-slate-300" />
                      {user.email}
                    </div>
                  </td>

                  {/* UID */}
                  <td className="px-8 py-5">
                    <code className="text-[10px] font-mono bg-slate-100 text-slate-500 px-2 py-1 rounded">
                      {user.id.split('-')[0]}...
                    </code>
                  </td>

                  {/* Actions */}
                  <td className="px-8 py-5 text-right">
                    <button className="p-2.5 hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 rounded-xl transition-all">
                      <MoreVertical size={18} className="text-slate-400 group-hover:text-slate-900" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {!loading && response?.items.length === 0 && (
            <div className="p-20 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <UserIcon size={32} className="text-slate-200" />
              </div>
              <p className="text-slate-400 font-bold">Uyğun istifadəçi tapılmadı.</p>
            </div>
          )}
        </div>

        {/* PAGINATION FOOTER */}
        <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Showing <span className="text-slate-900">{response?.items.length || 0}</span> of {response?.totalCount || 0} Records
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              disabled={!response?.hasPreviousPage || loading}
              onClick={() => setPage(p => p - 1)}
              className="p-3 bg-white border border-slate-200 rounded-2xl disabled:opacity-30 hover:shadow-md transition-all active:scale-95"
            >
              <ChevronLeft size={20} className="text-slate-600" />
            </button>
            
            <div className="flex gap-1">
              {[...Array(response?.totalPages || 0)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-10 h-10 rounded-2xl text-xs font-bold transition-all ${
                    page === i + 1 ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              disabled={!response?.hasNextPage || loading}
              onClick={() => setPage(p => p + 1)}
              className="p-3 bg-white border border-slate-200 rounded-2xl disabled:opacity-30 hover:shadow-md transition-all active:scale-95"
            >
              <ChevronRight size={20} className="text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers