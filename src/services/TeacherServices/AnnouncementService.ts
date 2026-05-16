import { api } from "@/utils/api";
import type {
  Announcement,
  CreateAnnouncementDto,
  UpdateAnnouncementDto,
  PaginatedResponse,
  SingleResponse,
  ApiResponse,
} from "@/types/Teacher";

// ==================== GET ALL ANNOUNCEMENTS ====================
export const getAnnouncements = async (
  page = 1,
  pageSize = 10,
  category?: string,
  search?: string
): Promise<PaginatedResponse<Announcement>> => {
  const params: Record<string, string | number> = { page, pageSize };
  if (category) params.category = category;
  if (search) params.search = search;

  const res = await api.get<PaginatedResponse<Announcement>>(
    "/Announcements",
    { params }
  );
  return res.data;
};

// ==================== GET TEACHER'S OWN ANNOUNCEMENTS ====================
export const getTeacherAnnouncements = async (
  page = 1,
  pageSize = 10
): Promise<PaginatedResponse<Announcement>> => {
  const res = await api.get<PaginatedResponse<Announcement>>(
    "/Announcements/teacher",
    { params: { page, pageSize } }
  );
  return res.data;
};

// ==================== GET SINGLE ANNOUNCEMENT ====================
export const getAnnouncementById = async (
  id: string
): Promise<SingleResponse<Announcement>> => {
  const res = await api.get<SingleResponse<Announcement>>(
    `/Announcements/${id}`
  );
  return res.data;
};

// ==================== CREATE ANNOUNCEMENT ====================
export const createAnnouncement = async (
  data: CreateAnnouncementDto
): Promise<ApiResponse> => {
  const res = await api.post<ApiResponse>("/Announcements", data);
  return res.data;
};

// ==================== UPDATE ANNOUNCEMENT ====================
export const updateAnnouncement = async (
  id: string,
  data: UpdateAnnouncementDto
): Promise<ApiResponse> => {
  const res = await api.put<ApiResponse>(`/Announcements/${id}`, data);
  return res.data;
};

// ==================== DELETE ANNOUNCEMENT ====================
export const deleteAnnouncement = async (
  id: string
): Promise<ApiResponse> => {
  const res = await api.delete<ApiResponse>(`/Announcements/${id}`);
  return res.data;
};
