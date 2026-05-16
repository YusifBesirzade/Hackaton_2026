"use client"

import { usePathname } from "next/navigation"
import Header from "./Header" // Sənin mövcud Header komponentin

export const HeaderWrapper = () => {
  const pathname = usePathname()
  
  // Əgər URL "/admin" ilə başlayırsa (və ya tam admin-dirsə) Header-i gizlət
  const isAdminPage = pathname.startsWith("/admin")

  if (isAdminPage) return null

  return <Header />
}

