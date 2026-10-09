import { api } from "@/lib/api-client";
import type { ApiResponse, AuthUser, CustomerAccount, ListQuery } from "@/types";

export function updateProfile(body: { name: string; phone?: string }) {
  return api<ApiResponse<AuthUser>>("/users/profile", {
    method: "PATCH",
    body,
  });
}

export function getCustomers(query?: ListQuery & { searchTerm?: string }) {
  return api<ApiResponse<CustomerAccount[]>>("/users/customers", { query });
}

export function sendContactMessage(body: {
  name: string;
  email: string;
  message: string;
}) {
  return api<ApiResponse<null>>("/contact", { method: "POST", body });
}

export function uploadProfileImage(file: File) {
  const body = new FormData();
  body.append("profileImage", file);

  return api<ApiResponse<{ imageUrl: string }>>("/users/profile-image", {
    method: "PATCH",
    body,
  });
}
