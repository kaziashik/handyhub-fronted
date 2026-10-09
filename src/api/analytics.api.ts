import { api } from "@/lib/api-client";
import type {
  AdminAnalytics,
  ApiResponse,
  CustomerAnalytics,
  PublicOverview,
  TechnicianAnalytics,
} from "@/types";

export function getCustomerAnalytics() {
  return api<ApiResponse<CustomerAnalytics>>("/analytics/customer-analytics");
}

export function getTechnicianAnalytics() {
  return api<ApiResponse<TechnicianAnalytics>>("/analytics/techician-analytics");
}

export function getPublicOverview() {
  return api<ApiResponse<PublicOverview>>("/analytics/public-overview");
}

export function getAdminAnalytics() {
  return api<ApiResponse<AdminAnalytics>>("/analytics/admin-analytics");
}
