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
  const { data, isPending, isError } = useMe();
  const role = data?.data?.role;
  const allowKey = allow.join("|");

  useEffect(() => {
    if (isPending) return;
    if (isError || !role) {
      router.replace("/login");
      return;
    }
    if (!allowKey.split("|").includes(role)) {
      router.replace(dashboardPath(role));
    }
  }, [allowKey, isError, isPending, role, router]);

  if (isPending || !role || !allowKey.split("|").includes(role)) {
    return null;
  }

  return children;
}
