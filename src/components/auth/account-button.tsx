"use client";

import { AccountDropdown } from "@/components/auth/account-dropdown";
import { Button } from "@/components/ui/button";
import { useMe } from "@/hooks/use-me";
import Link from "next/link";

export function AccountButton() {
  const { data, isPending } = useMe();
  const user = data?.data;

  if (user) {
    return <AccountDropdown />;
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
