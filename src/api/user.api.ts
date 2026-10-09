import { api } from "@/lib/api-client";
import type { ApiResponse } from "@/types";

export function uploadProfileImage(file: File) {
  const body = new FormData();
  body.append("profileImage", file);

  return api<ApiResponse<{ imageUrl: string }>>("/users/profile-image", {
    method: "PATCH",
    body,
  });
}
