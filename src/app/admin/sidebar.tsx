"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Building2, 
  FolderTree, 
  CalendarDays, 
  MapPin, 
  PlayCircle, 
  UserPlus, 
  Wallet, 
  Banknote, 
  MessageSquare, 
  Mail, 
  Settings 
} from "lucide-react"

const Sidebar = () => {
  const pathname = usePathname()

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Elanlar", href: "/admin/announcements", icon: Building2 },
    { name: "Role", href: "/admin/role", icon: FolderTree },
    { name: "Statistika", href: "/admin/statistic", icon: CalendarDays },
    { name: "Teachers", href: "/admin/teacher", icon: UserPlus },
    { name: "Users", href: "/admin/users", icon: Wallet },
    { name: "Payroll", href: "/admin/payroll", icon: Banknote },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <aside className="w-65 h-[97vh] bg-white flex flex-col fixed left-4 top-4 rounded-2xl bottom-4 z-40 font-sans shadow-sm ">
      {/* Top Section: Logo & Greeting */}
      <div className="flex flex-col items-center pt-8 pb-6 px-6">
        <div className="relative w-32 h-32 mb-4">
          <div className="w-full h-full rounded-full bg-[#e5e7ff] overflow-hidden">
            <img 
              src="/logo.png" 
              alt="Admin" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold text-[#00145e]">Hello Admin</h2>
          <div className="flex items-center justify-center gap-1 text-slate-400 text-sm font-medium">
            <span>☀️</span> Good Morning
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-6 space-y-1 pb-10">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl text-[15px] font-semibold transition-all ${
                isActive
                  ? "bg-[#5c85ee] text-white shadow-lg shadow-blue-200"
                  : "text-[#94a3b8] hover:bg-slate-50 hover:text-slate-600"
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "text-white" : "text-[#94a3b8]"}`} />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar