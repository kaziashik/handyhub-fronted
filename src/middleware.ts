import { dashboardPath } from "@/lib/role-redirect";
import type { Role } from "@/types";
import { NextResponse, type NextRequest } from "next/server";

const roles: Role[] = ["CUSTOMER", "TECHNICIAN", "ADMIN"];

function isRole(value: string | null | undefined): value is Role {
  return roles.some((role) => role === value);
}

function roleFromAccessToken(token: string | undefined) {
  if (!token) return null;
  const payload = token.split(".")[1];
  if (!payload) return null;
  try {
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = JSON.parse(atob(normalized)) as { role?: string };
    return isRole(json.role) ? json.role : null;
  } catch {
    return null;
  }
}

function allowed(pathname: string, role: Role) {
  if (pathname.startsWith("/admin")) return role === "ADMIN";
  if (pathname.startsWith("/technician")) return role === "TECHNICIAN";
  if (pathname.startsWith("/customer") || pathname.startsWith("/dashboard")) {
    return role === "CUSTOMER";
  }
  return true;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role =
    roleFromAccessToken(request.cookies.get("accessToken")?.value) ??
    request.cookies.get("handyhub-role")?.value;

  if (!isRole(role)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = `?next=${encodeURIComponent(pathname + request.nextUrl.search)}`;
    return NextResponse.redirect(url);
  }

  if (!allowed(pathname, role)) {
    return NextResponse.redirect(new URL(dashboardPath(role), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/technician/:path*",
    "/customer/:path*",
    "/dashboard/:path*",
    "/change-password",
  ],
};
