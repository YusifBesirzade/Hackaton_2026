export interface User {
  id: string;
  fullName: string;
  email: string;
  userName: string;
  isActive: boolean;
  phoneNumber?: string;
  createdAt?: string;
  roles: string[]; // API-dan gələn rollar massivi
}

export interface UserResponse {
  succeeded: boolean;
  message: string | null;
  errors: any[];
  data: {
    items: User[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
import { api } from "@/utils/api"

export const getUsers = async (page: number = 1, pageSize: number = 10, search: string = ""): Promise<UserResponse> => {
  const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const token = userStr ? JSON.parse(userStr)?.accessToken : null;

  const res = await api.get<UserResponse>("/Admin/users", {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, pageSize, search },
  });
  return res.data;
};