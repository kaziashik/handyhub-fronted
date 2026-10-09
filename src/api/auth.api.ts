import { api } from "@/lib/api-client";
import type { ApiResponse, AuthUser } from "@/types";
import { FetchError } from "ofetch";

export function registerUser(body: {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER";
  phone?: string;
}) {
  return api<ApiResponse<null>>("/auth/register", { method: "POST", body });
}

export function verifyEmail(body: { email: string; otp: string }) {
  return api<ApiResponse<{ user: AuthUser }>>("/auth/verify-email", {
    method: "POST",
    body,
  });
}

export function login(body: { email: string; password: string }) {
  return api<ApiResponse<{ accessToken: string; refreshToken: string }>>(
    "/auth/login",
    { method: "POST", body },
  );
}

export async function getMe() {
  try {
    return await api<ApiResponse<AuthUser>>("/auth/me");
  } catch (error) {
    if (error instanceof FetchError && error.statusCode) {
      return null;
    }
    throw error;
  }
}

export function refreshToken() {
  return api<ApiResponse<{ accessToken: string; refreshToken: string }>>(
    "/auth/refresh-token",
    { method: "POST" },
  );
}

export function logout() {
  return api<ApiResponse<null>>("/auth/logout", { method: "POST" });
}

export function forgotPassword(body: { email: string }) {
  return api<ApiResponse<null>>("/auth/forgot-password", {
    method: "POST",
    body,
  });
}

export function resetPassword(body: {
  email: string;
  otp: string;
  newPassword: string;
}) {
  return api<ApiResponse<null>>("/auth/reset-password", {
    method: "POST",
    body,
  });
}

export function googleLogin(body: { idToken: string }) {
  return api<ApiResponse<{ user: AuthUser }>>("/auth/google", {
    method: "POST",
    body,
  });
}
