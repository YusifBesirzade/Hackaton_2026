"use client"

import { registerUser } from "@/services/AuthServices/AuthServices"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, CheckCircle2, AlertCircle, X, Sparkles, User, Mail, UserCheck, KeyRound } from "lucide-react"

const Register = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | null }>({
    message: "",
    type: null,
  })

  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ message: "", type: null }), 5000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setToast({ message: "", type: null })

    try {
      const response = await registerUser(formData)

      if (response.succeeded) {
        setToast({ message: "Qeydiyyat uğurludur! Yönləndirilirsiniz...", type: "success" })
        
        setFormData({ firstName: "", lastName: "", email: "", userName: "", password: "" })

        setTimeout(() => {
          router.push("/login")
        }, 2500)
      } else {
        setToast({ message: response.errors[0] || "Qeydiyyat xətası baş verdi", type: "error" })
      }
    } catch (error: any) {
      setToast({ 
        message: error?.response?.data?.errors?.[0] || "Gözlənilməz bir xəta baş verdi", 
        type: "error" 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 antialiased px-4">
      
      {/* ─── TOAST NOTIFICATION ─── */}
      <AnimatePresence>
        {toast.message && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 20, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className={`fixed top-0 left-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-md min-w-[320px] border ${
              toast.type === "success" 
                ? "bg-white border-emerald-100 text-emerald-800" 
                : "bg-white border-rose-100 text-rose-800"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            )}
            <span className="text-xs font-semibold flex-1">{toast.message}</span>
            <button onClick={() => setToast({ message: "", type: null })} className="cursor-pointer">
              <X className="w-3 h-3 opacity-50 hover:opacity-100" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── REGISTER CARD ─── */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] bg-white p-8 rounded-lg border border-slate-200/80 shadow-sm space-y-6"
      >
        {/* Header Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 border border-indigo-100 rounded text-[11px] font-bold text-indigo-600 uppercase tracking-wider mx-auto">
            <Sparkles size={11} /> Yeni Hesab
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-950">Qeydiyyat</h1>
          <p className="text-xs text-slate-400 font-medium">Platformadan istifadə üçün məlumatlarınızı daxil edin</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Firstname & Lastname Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block ml-0.5">Ad</label>
              <div className="relative flex items-center">
                <User className="absolute left-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Nigar"
                  className="w-full border border-slate-200 pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-50/30 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-800"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block ml-0.5">Soyad</label>
              <div className="relative flex items-center">
                <User className="absolute left-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Həsənzadə"
                  className="w-full border border-slate-200 pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-50/30 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block ml-0.5">Email Ünvanı</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@domain.com"
                className="w-full border border-slate-200 pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-50/30 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-800"
              />
            </div>
          </div>

          {/* Username Input */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block ml-0.5">İstifadəçi Adı (Username)</label>
            <div className="relative flex items-center">
              <UserCheck className="absolute left-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="userName"
                required
                value={formData.userName}
                onChange={handleChange}
                placeholder="nigarhasanzade"
                className="w-full border border-slate-200 pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-50/30 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-800"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block ml-0.5">Şifrə</label>
            <div className="relative flex items-center">
              <KeyRound className="absolute left-3 w-4 h-4 text-slate-400" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border border-slate-200 pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-50/30 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-800"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5c85ee] hover:bg-[#4b74dd] text-white py-2.5 text-sm font-bold rounded-lg shadow-sm shadow-blue-100 hover:shadow-md transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Hesab yaradılır...
              </span>
            ) : (
              "Hesab yarat"
            )}
          </button>
        </form>

        {/* Footer Redirect Link */}
        <p className="text-center text-xs font-semibold text-slate-400 pt-2 border-t border-slate-100/80">
          Artıq hesabınız var?{" "}
          <button 
            onClick={() => router.push("/login")}
            className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline transition-colors ml-0.5 cursor-pointer"
          >
            Daxil olun
          </button>
        </p>
      </motion.div>
    </div>
  )
}

export default Register