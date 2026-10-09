import { api } from "@/lib/api-client";
import type { ApiResponse, CustomerAnalytics, TechnicianAnalytics } from "@/types";

export function getCustomerAnalytics() {
  return api<ApiResponse<CustomerAnalytics>>("/analytics/customer-analytics");
}

export function getTechnicianAnalytics() {
  return api<ApiResponse<TechnicianAnalytics>>("/analytics/techician-analytics");
}

export function getAdminAnalytics() {
  return api<ApiResponse<unknown>>("/analytics/admin-analytics");
}
