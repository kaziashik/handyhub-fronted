import type { Role } from "@/types";

export function dashboardPath(role: Role) {
  if (role === "ADMIN") return "/admin";
  if (role === "TECHNICIAN") return "/technician";
  return "/customer";
}
