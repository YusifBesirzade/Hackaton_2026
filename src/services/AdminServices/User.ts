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

export const deleteUser = async (userId: string): Promise<void> => {
  const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const token = userStr ? JSON.parse(userStr)?.accessToken : null;

  await api.delete(`/Admin/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserById = async (userId: string): Promise<User> => {
  const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const token = userStr ? JSON.parse(userStr)?.accessToken : null;

  const res = await api.get<User>(`/Admin/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const assignRole = async (userId: string, roleName: string): Promise<void> => {
  const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const token = userStr ? JSON.parse(userStr)?.accessToken : null;

  await api.post("/Admin/assign-role", 
    { userId, roleName }, // Request Body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const removeRole = async (userId: string, roleName: string): Promise<void> => {
  const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const token = userStr ? JSON.parse(userStr)?.accessToken : null;

  await api.post(
    "/Admin/remove-role",
    { userId, roleName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const toggleUserActive = async (userId: string): Promise<void> => {
  const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const token = userStr ? JSON.parse(userStr)?.accessToken : null;

  await api.patch(
    `/Admin/users/${userId}/toggle-active`,
    {}, // body boşdur
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};