import { api } from "@/lib/api-client";
import type { ApiResponse, AuthUser } from "@/types";
import { FetchError } from "ofetch";

export function registerUser(
  body: {
    name: string;
    email: string;
    password: string;
    role: "CUSTOMER";
    phone?: string;
  },
  photo?: File | null,
) {
  if (!photo) {
    return api<ApiResponse<null>>("/auth/register", { method: "POST", body });
  }

  const form = new FormData();
  form.set("name", body.name);
  form.set("email", body.email);
  form.set("password", body.password);
  form.set("role", body.role);
  if (body.phone) form.set("phone", body.phone);
  form.set("profileImage", photo);

  return api<ApiResponse<null>>("/auth/register", { method: "POST", body: form });
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

function responseMessage(error: FetchError) {
  const body = error.data;
  if (
    body &&
    typeof body === "object" &&
    "message" in body &&
    typeof body.message === "string"
  ) {
    return body.message;
  }
  return error.message;
}

function shouldRefreshSession(error: unknown) {
  if (!(error instanceof FetchError) || !error.statusCode) {
    return false;
  }

  const message = responseMessage(error).toLowerCase();
  return (
    message.includes("jwt expired") ||
    message.includes("not logged in") ||
    message.includes("invalid token") ||
    message.includes("jwt malformed")
  );
}

async function readMe() {
  return api<ApiResponse<AuthUser>>("/auth/me");
}

export async function getMe() {
  try {
    return await readMe();
  } catch (error) {
    if (!shouldRefreshSession(error)) {
      if (error instanceof FetchError && error.statusCode) {
        return null;
      }
      throw error;
    }
  }

  try {
    await refreshSession();
    return await readMe();
  } catch (error) {
    if (error instanceof FetchError && error.statusCode) {
      return null;
    }
    throw error;
  }
}

let refreshRequest: Promise<
  ApiResponse<{ accessToken: string; refreshToken: string }>
> | null = null;

function refreshSession() {
  if (!refreshRequest) {
    refreshRequest = refreshToken().finally(() => {
      refreshRequest = null;
    });
  }
  return refreshRequest;
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
  return api<
    ApiResponse<{
      accessToken: string;
      refreshToken: string;
      user: AuthUser;
    }>
  >("/auth/google", {
    method: "POST",
    body,
  });
}
