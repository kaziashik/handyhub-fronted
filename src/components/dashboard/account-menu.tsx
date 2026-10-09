"use client";

import { LogoutButton } from "@/components/auth/logout-button";
import { useMe } from "@/hooks/use-me";
import Link from "next/link";

export function AccountMenu() {
  const { data, isPending } = useMe();
  const user = data?.data;

  return (
    <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm">
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
