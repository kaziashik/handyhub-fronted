"use client";

import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { useMe } from "@/hooks/use-me";
import { profilePath } from "@/lib/role-redirect";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function AccountDropdown() {
  const pathname = usePathname();
  const { data } = useMe();
  const user = data?.data;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!user) return null;

  return (
    <div className="relative">
      <Button
        type="button"
        variant="outline"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        {user.name}
      </Button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-40 mt-2 flex w-48 flex-col rounded-lg border bg-background p-2 shadow-sm"
        >
          <Link className="rounded-md px-3 py-2 text-sm hover:bg-muted" href={profilePath(user.role)} role="menuitem">
            Profile
          </Link>
          <Link className="rounded-md px-3 py-2 text-sm hover:bg-muted" href="/change-password" role="menuitem">
            Change password
          </Link>
          <div className="px-1 py-1">
            <LogoutButton />
          </div>
        </div>
      ) : null}
    </div>
  );
}
