"use client";

import { AccountDropdown } from "@/components/auth/account-dropdown";
import { useMe } from "@/hooks/use-me";
import Link from "next/link";

export function AccountMenu() {
  const { data, isPending } = useMe();
  const user = data?.data;

  if (user) {
    return <AccountDropdown />;
  }

  if (isPending) return null;

  return (
    <Link href="/login" className="text-sm">
      Login
    </Link>
  );
}
