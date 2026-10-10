"use client";

import { getMe } from "@/api/auth.api";
import { writeSessionRole } from "@/lib/session-role";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const meQueryKey = ["me"] as const;

export function useMe() {
  const query = useQuery({
    queryKey: meQueryKey,
    queryFn: getMe,
    retry: false,
    meta: { silent: true },
  });

  useEffect(() => {
    const role = query.data?.data?.role;
    if (role) writeSessionRole(role);
  }, [query.data]);

  return query;
}
