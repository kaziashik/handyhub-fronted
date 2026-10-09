"use client";

import { getMe } from "@/api/auth.api";
import { useQuery } from "@tanstack/react-query";

export const meQueryKey = ["me"] as const;

export function useMe() {
  return useQuery({
    queryKey: meQueryKey,
    queryFn: getMe,
    retry: false,
  });
}
