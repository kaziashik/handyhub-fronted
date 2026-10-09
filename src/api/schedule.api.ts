import { api } from "@/lib/api-client";
import type {
  ApiResponse,
  ListQuery,
  TechnicianSchedule,
  TodaySchedule,
} from "@/types";

export function createSchedule(body: {
  startDateTime: string;
  endDateTime: string;
  meetingLink: string;
}) {
  return api<ApiResponse<unknown>>("/schedule/create-schedule", {
    method: "POST",
    body,
  });
}

export function getMySchedules(query?: ListQuery) {
  return api<ApiResponse<TechnicianSchedule[]>>("/schedule/my-schedules", {
    query,
  });
}

export function getAllSchedules(query?: ListQuery) {
  return api<ApiResponse<unknown[]>>("/schedule/all-schedules", { query });
}

export function getTodaysSchedules(query?: ListQuery) {
  return api<ApiResponse<TodaySchedule[]>>("/schedule/todays-schedule", {
    query,
  });
}

export function getSchedule(scheduleId: string) {
  return api<ApiResponse<unknown>>(`/schedule/${scheduleId}`);
}

export function updateSchedule(
  scheduleId: string,
  body: {
    startDateTime?: string;
    endDateTime?: string;
    meetingLink?: string;
  },
) {
  return api<ApiResponse<unknown>>(
    `/schedule/update-schedule/${encodeURIComponent(scheduleId)}`,
    {
      method: "PATCH",
      body,
    },
  );
}

export function publishSchedule(scheduleId: string) {
  return api<ApiResponse<unknown>>(
    `/schedule/publish-schedule/${encodeURIComponent(scheduleId)}`,
    { method: "PATCH" },
  );
}

export function deleteSchedule(scheduleId: string) {
  return api<ApiResponse<unknown>>(`/schedule/${scheduleId}`, {
    method: "DELETE",
  });
}
