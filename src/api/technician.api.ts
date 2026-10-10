import { api, apiUrl } from "@/lib/api-client";
import type {
  ApiResponse,
  ListQuery,
  PublicTechnician,
  TechnicianApplication,
} from "@/types";

export function applyAsTechnician(
  body: FormData,
  onProgress?: (percent: number) => void,
) {
  return new Promise<ApiResponse<unknown>>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("POST", apiUrl("/techinician/apply-as-techinician"));
    request.withCredentials = true;
    request.upload.onprogress = (event) => {
      if (!onProgress || !event.lengthComputable) return;
      onProgress(Math.min(100, Math.round((event.loaded / event.total) * 100)));
    };
    request.onerror = () => reject(new Error("Could not upload the application"));
    request.onload = () => {
      let payload: ApiResponse<unknown> | null = null;
      try {
        payload = JSON.parse(request.responseText) as ApiResponse<unknown>;
      } catch {
        payload = null;
      }
      if (request.status >= 200 && request.status < 300 && payload) {
        resolve(payload);
        return;
      }
      reject(new Error(payload?.message || "Could not submit the application"));
    };
    request.send(body);
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
