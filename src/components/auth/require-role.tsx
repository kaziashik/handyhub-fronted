"use client";

import { useMe } from "@/hooks/use-me";
import { dashboardPath } from "@/lib/role-redirect";
import type { Role } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export function RequireRole({
  allow,
  children,
}: {
  allow: Role[];
  children: ReactNode;
}) {
  const router = useRouter();
  const { data, isLoading, isError } = useMe();
  const role = data?.data?.role;

  useEffect(() => {
    if (isLoading) return;
    if (isError || !role) {
      router.replace("/login");
      return;
    }
    if (!allow.includes(role)) {
      router.replace(dashboardPath(role));
    }
  }, [allow, isError, isLoading, role, router]);

  if (isLoading || !role || !allow.includes(role)) {
    return null;
  }

  return children;
}
