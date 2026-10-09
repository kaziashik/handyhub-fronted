export type Role = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export type ApiMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: ApiMeta;
};

export type AuthUser = {
  id?: string;
  userId?: string;
  name: string;
  email: string;
  role: Role;
};

export type ListQuery = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
  status?: string;
};
