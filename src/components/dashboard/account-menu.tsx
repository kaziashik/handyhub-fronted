"use client";

import { LogoutButton } from "@/components/auth/logout-button";
import { useMe } from "@/hooks/use-me";
import Link from "next/link";

export function AccountMenu() {
  const { data, isPending } = useMe();
  const user = data?.data;

  return (
    <div className="flex items-center gap-4 text-sm">
      <Link href="/change-password">Change password</Link>
      {user ? (
        <>
          <span className="font-medium">{user.name}</span>
          <LogoutButton />
        </>
      ) : isPending ? null : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
}
