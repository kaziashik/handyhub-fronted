import { api } from "@/lib/api-client";
import type { ApiResponse, ListQuery, TechnicianApplication } from "@/types";

export function applyAsTechnician(body: FormData) {
  return api<ApiResponse<unknown>>("/techinician/apply-as-techinician", {
    method: "POST",
    body,
  });
}

export function verifyTechnicianEmail(body: { email: string; otp: string }) {
  return api<ApiResponse<unknown>>(
    "/techinician/apply-as-techinician/verify-email",
    { method: "POST", body },
  );
}

export function approveTechnician(body: {
  techinicianId: string;
  verificationStatus: "APPROVED" | "REJECTED";
  rejectionReason?: string;
}) {
  return api<ApiResponse<unknown>>("/techinician/approve-techinician", {
    method: "POST",
    body,
  });
}

export function getAllTechnicians(
  query?: ListQuery & { verificationStatus?: string },
) {
  return api<ApiResponse<TechnicianApplication[]>>("/techinician/all-techinician", {
    query,
  });
}
