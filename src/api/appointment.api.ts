import { api } from "@/lib/api-client";
import type {
  ApiResponse,
  AppointmentDetail,
  CustomerAppointment,
  ListQuery,
  TechnicianAppointment,
} from "@/types";

export function bookAppointment(body: { scheduleId: string }) {
  return api<ApiResponse<{ paymentUrl: string }>>(
    "/appointment/book-appointment",
    { method: "POST", body },
  );
}

export function payAppointment(body: { appointmentId: string }) {
  return api<ApiResponse<{ paymentUrl: string }>>(
    "/appointment/pay-appointment",
    { method: "POST", body },
  );
}

export function cancelAppointment(body: { appointmentId: string }) {
  return api<ApiResponse<unknown>>("/appointment/cancel-appointment", {
    method: "POST",
    body,
  });
}

export function getMyAppointments(query?: ListQuery) {
  return api<ApiResponse<CustomerAppointment[]>>("/appointment/my-appointments", {
    query,
  });
}

export function getTechnicianAppointments(query?: ListQuery) {
  return api<ApiResponse<TechnicianAppointment[]>>(
    "/appointment/doctor-appointments",
    { query },
  );
}

export function getAllAppointments(query?: ListQuery) {
  return api<ApiResponse<unknown[]>>("/appointment/all-appointments", {
    query,
  });
}

export function getAppointment(appointmentId: string) {
  return api<ApiResponse<AppointmentDetail>>(
    `/appointment/${encodeURIComponent(appointmentId)}`,
  );
}

export function updateAppointmentStatus(
  appointmentId: string,
  body: { status: "ONGOING" | "COMPLETED" },
) {
  return api<ApiResponse<unknown>>(
    `/appointment/update-status/${encodeURIComponent(appointmentId)}`,
    { method: "PATCH", body },
  );
}
