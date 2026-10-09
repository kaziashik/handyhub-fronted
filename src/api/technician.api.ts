import { api } from "@/lib/api-client";
import type {
  ApiResponse,
  ListQuery,
  PublicTechnician,
  TechnicianApplication,
} from "@/types";

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

export function getPublicTechnicians(
  query?: ListQuery & {
    searchTerm?: string;
    specialization?: string;
    minExperience?: string;
    maxFee?: string;
  },
) {
  return api<ApiResponse<PublicTechnician[]>>("/techinician/public", { query });
}

export function getPublicTechnician(techinicianId: string) {
  return api<
    ApiResponse<{ technician: PublicTechnician; related: PublicTechnician[] }>
  >(`/techinician/public/${techinicianId}`);
}

export function getAllTechnicians(
  query?: ListQuery & { verificationStatus?: string },
) {
  return api<ApiResponse<TechnicianApplication[]>>("/techinician/all-techinician", {
    query,
  });
}
