import type { Role } from "@/types";

const cookieName = "handyhub-role";

export function writeSessionRole(role: Role) {
  document.cookie = `${cookieName}=${role}; Path=/; Max-Age=${60 * 60 * 24}; SameSite=Lax`;
}

export function clearSessionRole() {
  document.cookie = `${cookieName}=; Path=/; Max-Age=0; SameSite=Lax`;
}
