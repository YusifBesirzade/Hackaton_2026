import { api } from "@/utils/api";

/* =========================
   TYPES
========================= */

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  isApproved: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AnnouncementResponse {
  succeeded: boolean;
  message: string | null;
  errors: any[];
  data: {
    items: Announcement[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

/* =========================
   TOKEN HELPER
========================= */

const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr)?.accessToken : null;
};

/* =========================
   GET ANNOUNCEMENTS
========================= */

export const getAnnouncements = async (
  page: number = 1,
  pageSize: number = 10,
  category?: string,
  isApproved?: boolean
): Promise<AnnouncementResponse> => {
  const token = getToken();

  const res = await api.get<AnnouncementResponse>("/Admin/announcements", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      pageSize,
      category,
      isApproved,
    },
  });

  return res.data;
};

/* =========================
   APPROVE ANNOUNCEMENT
========================= */

export const approveAnnouncement = async (id: string): Promise<void> => {
  const token = getToken();

  await api.patch(
    `/Admin/announcements/${id}/approve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

/* =========================
   DELETE ANNOUNCEMENT
========================= */

export const deleteAnnouncement = async (id: string): Promise<void> => {
  const token = getToken();

  await api.delete(`/Admin/announcements/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};