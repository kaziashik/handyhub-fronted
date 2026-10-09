import type { Role } from "@/types";

export function dashboardPath(role: Role) {
  if (role === "ADMIN") return "/admin";
  if (role === "TECHNICIAN") return "/technician";
  return "/customer";
}

export function profilePath(role: Role) {
  if (role === "ADMIN") return "/admin/settings";
  if (role === "TECHNICIAN") return "/technician/profile";
  return "/customer/profile";
}

export function bookPath(scheduleId: string) {
  return `/customer/book?scheduleId=${encodeURIComponent(scheduleId)}`;
}

export function bookEntryPath(role: Role | undefined, scheduleId: string) {
  const next = bookPath(scheduleId);
  if (role === "CUSTOMER") return next;
  if (!role) return `/login?next=${encodeURIComponent(next)}`;
  return dashboardPath(role);
}

export function pathAfterLogin(role: Role, nextPath?: string) {
  if (!nextPath || nextPath.includes("\\")) return dashboardPath(role);
  const path = nextPath.split("?")[0];
  if (role === "CUSTOMER" && path === "/customer/book") return nextPath;
  return dashboardPath(role);
}
