import { api } from "@/lib/api-client";
import type { ApiResponse } from "@/types";

export function getCustomerAnalytics() {
  return api<ApiResponse<unknown>>("/analytics/customer-analytics");
}

export function getTechnicianAnalytics() {
  return api<ApiResponse<unknown>>("/analytics/techician-analytics");
}

export function getAdminAnalytics() {
  return api<ApiResponse<unknown>>("/analytics/admin-analytics");
}
