"use client";

import { RequireRole } from "@/components/auth/require-role";
import type { Role } from "@/types";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const signedInRoles: Role[] = ["CUSTOMER", "TECHNICIAN", "ADMIN"];

function rolesForPath(pathname: string): Role[] {
  if (pathname.startsWith("/admin")) return ["ADMIN"];
  if (pathname.startsWith("/technician")) return ["TECHNICIAN"];
  if (pathname.startsWith("/customer")) return ["CUSTOMER"];
  if (pathname.startsWith("/dashboard/my-appointments")) return ["CUSTOMER"];
  return signedInRoles;
}

export function DashboardGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <RequireRole allow={rolesForPath(pathname)}>{children}</RequireRole>;
}
