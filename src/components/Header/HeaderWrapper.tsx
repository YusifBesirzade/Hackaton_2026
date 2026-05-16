"use client"

import { usePathname } from "next/navigation"
import Header from "./Header" // Sənin mövcud Header komponentin

export const HeaderWrapper = () => {
  const pathname = usePathname()
  
  // Əgər URL "/admin" ilə başlayırsa (və ya tam admin-dirsə) Header-i gizlət
  const isAdminPage = pathname.startsWith("/admin") || pathname.startsWith("/teacher") || pathname.startsWith("/student") // Əgər müəllim və tələbə səhifələrində də gizlətmək istəyirsənsə, onları da əlavə et

  if (isAdminPage) return null

  return <Header />
}

