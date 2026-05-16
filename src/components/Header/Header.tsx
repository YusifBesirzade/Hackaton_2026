"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type UserType = {
  accessToken: string
  userName?: string
  email?: string
  roles?: string[]
}

export default function Header() {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)

  // ================= PARSE & SET USER =================
  const checkUser = () => {
    if (typeof window === "undefined") return
    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.log("USER PARSE ERROR:", error)
        localStorage.removeItem("user")
        setUser(null)
      }
    } else {
      setUser(null)
    }
  }

  useEffect(() => {
    // İlk yüklənmədə yoxla
    checkUser()

    // Digər tablardan gələn dəyişikliklər üçün
    window.addEventListener("storage", checkUser)
    
    // 🔥 EYNİ SƏHİFƏDƏ LOGİN OLAN AN ANINDA TUTMAQ ÜÇÜN CUSTOM EVENT
    window.addEventListener("userLoginSuccess", checkUser)

    return () => {
      window.removeEventListener("storage", checkUser)
      window.removeEventListener("userLoginSuccess", checkUser)
    }
  }, [])

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/login")
  }

  // ================= ROLE CHECK =================
  const isAdmin = user?.roles?.includes("Admin") || user?.roles?.includes("SuperAdmin")
  const isTeacher = user?.roles?.includes("Teacher")
  const isClient = user?.roles?.includes("Client")

  return (
    <header className="w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <div onClick={() => router.push("/")} className="text-xl font-bold text-slate-900 cursor-pointer">
          My App
        </div>

        {/* NAVIGATION */}
        <nav className="flex items-center gap-5 text-sm font-medium">
          <Link href="/" className="text-slate-700 hover:text-black transition">Home</Link>
          <Link href="/contact" className="text-slate-700 hover:text-black transition">Contact</Link>

          {/* USER LOGGED IN */}
          {user ? (
            <>
              {isAdmin && (
                <Link href="/admin" className="text-slate-700 hover:text-black transition">Admin Panel</Link>
              )}

              {isTeacher && (
                <Link href="/teacher" className="text-slate-700 hover:text-black transition">Teacher Panel</Link>
              )}

              {isClient && (
                <Link href="/profile" className="text-slate-700 hover:text-black transition">Profile</Link>
              )}

              {/* USER INFO */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold uppercase">
                  {user?.userName?.charAt(0) || "U"}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-900">{user?.userName}</span>
                  <span className="text-[10px] text-slate-500">{user?.roles?.join(", ")}</span>
                </div>
              </div>

              <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 rounded-lg bg-black text-white hover:bg-slate-800 transition">Login</Link>
              <Link href="/register" className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}