"use client"

import { useEffect, useState } from "react"
import { 
  Users, Megaphone, Calendar, Search, 
  Users2, Clock, TrendingUp, Activity, 
  ShieldCheck, Globe, Zap 
} from "lucide-react"
import { getAdminDashboard } from "@/services/AdminServices/Dashboard"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell
} from "recharts"

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  console.log(stats);
  

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAdminDashboard()
        if (response.succeeded) {
          setStats(response.data)
        }
      } catch (error) {
        console.error("Xəta:", error)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])

  if (loading) return (
    <div className="p-8 flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  )

  // Real dataya əsaslanan diaqram məlumatları
  const distributionData = [
    { name: "Users", count: stats?.totalUsers || 0, color: "#3b82f6" },
    { name: "Events", count: stats?.totalEvents || 0, color: "#a855f7" },
    { name: "Announce", count: stats?.totalAnnouncements || 0, color: "#f59e0b" },
    { name: "Lost/Found", count: stats?.totalLostFoundPosts || 0, color: "#ef4444" },
    { name: "Team", count: stats?.totalTeamFinderPosts || 0, color: "#10b981" },
  ]

  const cards = [
    { title: "Total Users", value: stats?.totalUsers, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Active Events", value: stats?.totalEvents, icon: Calendar, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Announcements", value: stats?.totalAnnouncements, icon: Megaphone, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Pending Review", value: stats?.pendingAnnouncements, icon: Clock, color: "text-rose-600", bg: "bg-rose-50" },
  ]

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen space-y-8">
      {/* 1. TOP HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">DASHBOARD OVERVIEW</h1>
          <p className="text-slate-500 font-medium">Sistemdəki real-vaxt məlumatları və statistika</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
          <div className="px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 rounded-lg flex items-center gap-2">
            <Zap size={16} /> Live Status
          </div>
          <span className="pr-4 text-xs font-bold text-slate-400 uppercase tracking-widest">v 2.4.0</span>
        </div>
      </div>

      {/* 2. STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`${card.bg} ${card.color} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
                <card.icon size={24} />
              </div>
              <span className="text-[10px] font-black bg-slate-100 px-2 py-1 rounded-full text-slate-500 uppercase">Real Time</span>
            </div>
            <h3 className="text-3xl font-black text-slate-900">{card.value || 0}</h3>
            <p className="text-slate-500 font-bold text-sm mt-1">{card.title}</p>
          </div>
        ))}
      </div>

      {/* 3. CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Real Data Distribution Bar Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Activity className="text-blue-600" /> Data Distribution
            </h3>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                   cursor={{fill: '#f8fafc'}}
                   contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} 
                />
                <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={50}>
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Status Panel */}
        <div className="bg-[#1e293b] p-8 rounded-[32px] text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-6">Platform Health</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="text-sm font-medium">Auth System</span>
                </div>
                <span className="text-xs bg-green-500 px-2 py-1 rounded-md font-bold text-white">UP</span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                    <Globe size={20} />
                  </div>
                  <span className="text-sm font-medium">Public API</span>
                </div>
                <span className="text-xs bg-blue-500 px-2 py-1 rounded-md font-bold text-white">STABLE</span>
              </div>

              <div className="pt-4">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Announcement Queue</p>
                <div className="flex items-end gap-2">
                   <span className="text-4xl font-black">{stats?.pendingAnnouncements}</span>
                   <span className="text-slate-400 pb-1 text-sm font-bold">Pending Items</span>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative background circle */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-20"></div>
        </div>
      </div>

      {/* 4. RECENT POSTS SUMMARY (REAL DATA) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-[24px] border border-slate-100 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl"><Search /></div>
              <div>
                 <h4 className="font-bold text-slate-900">Lost & Found Posts</h4>
                 <p className="text-xs text-slate-500">Currently active on platform</p>
              </div>
           </div>
           <span className="text-2xl font-black text-slate-900">{stats?.totalLostFoundPosts}</span>
        </div>
        <div className="bg-white p-6 rounded-[24px] border border-slate-100 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="bg-green-50 text-green-600 p-4 rounded-2xl"><Users2 /></div>
              <div>
                 <h4 className="font-bold text-slate-900">Team Finder</h4>
                 <p className="text-xs text-slate-500">Active group requests</p>
              </div>
           </div>
           <span className="text-2xl font-black text-slate-900">{stats?.totalTeamFinderPosts}</span>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard