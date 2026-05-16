"use client"
import Footer from "./Footer"

import { usePathname } from "next/navigation"

export const FooterWrapper = () => {
  const pathname = usePathname()
  
  const isAdminPage = pathname.startsWith("/admin")

  if (isAdminPage) return null

  return <Footer/>
}