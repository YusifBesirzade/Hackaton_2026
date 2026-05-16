import { api } from "@/utils/api"

// 1. API-dan gələn real "data" obyektinin strukturu
export interface DashboardStats {
  pendingAnnouncements: number
  totalAnnouncements: number
  totalEvents: number
  totalLostFoundPosts: number
  totalTeamFinderPosts: number
  totalUsers: number
}

// 2. API-nın ümumi cavab (Response) strukturu
export interface DashboardResponse {
  succeeded: boolean
  message: string | null
  errors: any[]
  data: DashboardStats // Rəqəmlər buradadır
}

// ================= TOKEN =================
const getToken = (): string | null => {
  if (typeof window === "undefined") return null

  const user = localStorage.getItem("user")
  if (!user) return null

  try {
    const parsedUser = JSON.parse(user)
    return parsedUser?.accessToken || null
  } catch (error) {
    return null
  }
}

// ================= AUTH HEADER =================
const authHeader = () => ({
  Authorization: `Bearer ${getToken()}`,
})

// ================= GET ADMIN DASHBOARD =================
/**
 * Admin Dashboard məlumatlarını gətirir.
 * Geriyə DashboardResponse tipində obyekt döndərir.
 */
export const getAdminDashboard = async (): Promise<DashboardResponse> => {
  const res = await api.get<DashboardResponse>("/Admin/dashboard", {
    headers: authHeader(),
  })

  return res.data
}