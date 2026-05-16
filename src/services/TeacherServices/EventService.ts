import { api } from "@/utils/api";
import type {
  EventItem,
  CreateEventDto,
  UpdateEventDto,
  PaginatedResponse,
  SingleResponse,
  ApiResponse,
} from "@/types/Teacher";

// ==================== GET ALL EVENTS ====================
export const getEvents = async (
  page = 1,
  pageSize = 10,
  search?: string,
  upcomingOnly = false
): Promise<PaginatedResponse<EventItem>> => {
  const params: Record<string, string | number | boolean> = {
    page,
    pageSize,
    upcomingOnly,
  };
  if (search) params.search = search;

  const res = await api.get<PaginatedResponse<EventItem>>("/Events", {
    params,
  });
  return res.data;
};

// ==================== GET TEACHER'S OWN EVENTS ====================
export const getTeacherEvents = async (
  page = 1,
  pageSize = 10
): Promise<PaginatedResponse<EventItem>> => {
  const res = await api.get<PaginatedResponse<EventItem>>(
    "/Events/teacher",
    { params: { page, pageSize } }
  );
  return res.data;
};

// ==================== GET SINGLE EVENT ====================
export const getEventById = async (
  id: string
): Promise<SingleResponse<EventItem>> => {
  const res = await api.get<SingleResponse<EventItem>>(`/Events/${id}`);
  return res.data;
};

// ==================== CREATE EVENT ====================
export const createEvent = async (
  data: CreateEventDto
): Promise<ApiResponse> => {
  const res = await api.post<ApiResponse>("/Events", data);
  return res.data;
};

// ==================== UPDATE EVENT ====================
export const updateEvent = async (
  id: string,
  data: UpdateEventDto
): Promise<ApiResponse> => {
  const res = await api.put<ApiResponse>(`/Events/${id}`, data);
  return res.data;
};

// ==================== DELETE EVENT ====================
export const deleteEvent = async (id: string): Promise<ApiResponse> => {
  const res = await api.delete<ApiResponse>(`/Events/${id}`);
  return res.data;
};
