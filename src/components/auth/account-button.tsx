"use client";

import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { useMe } from "@/hooks/use-me";
import Link from "next/link";

export function AccountButton() {
  const { data, isPending } = useMe();
  const user = data?.data;

  if (user) {
    return (
      <>
        <span className="text-sm font-medium">{user.name}</span>
        <LogoutButton />
      </>
    );
  }

  if (isPending) {
    return null;
  }

  return (
    <>
      <Button
        variant="outline"
        render={<Link href="/apply">Apply</Link>}
        nativeButton={false}
      >
        Apply
      </Button>
      <Button
        variant="outline"
        render={<Link href="/login">Login</Link>}
        nativeButton={false}
      >
        Login
      </Button>
    </>
  );
}
