// ==================== ANNOUNCEMENT TYPES ====================

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  isApproved: boolean;
  createdAt: string;
  createdBy?: string;
  creatorFullName?: string;
}

export interface CreateAnnouncementDto {
  title: string;
  content: string;
  category: string;
}

export interface UpdateAnnouncementDto {
  title: string;
  content: string;
  category: string;
}

// ==================== EVENT TYPES ====================

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  createdAt?: string;
  createdBy?: string;
  creatorFullName?: string;
}

export interface CreateEventDto {
  title: string;
  description: string;
  date: string;
}

export interface UpdateEventDto {
  title: string;
  description: string;
  date: string;
}

// ==================== PAGINATED RESPONSE ====================

export interface PaginatedResponse<T> {
  succeeded: boolean;
  message: string | null;
  errors: string[];
  data: {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface SingleResponse<T> {
  succeeded: boolean;
  message: string | null;
  errors: string[];
  data: T;
}

export interface ApiResponse {
  succeeded: boolean;
  message: string | null;
  errors: string[];
}
