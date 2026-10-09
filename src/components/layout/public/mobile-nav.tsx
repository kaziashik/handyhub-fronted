"use client";

import { AccountButton } from "@/components/auth/account-button";
import { Button } from "@/components/ui/button";
import { publicRoutes } from "@/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden">
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}
      </Button>
      {open ? (
        <nav className="fixed inset-x-0 top-16 z-30 flex flex-col gap-3 border-b bg-background px-4 py-4">
          {publicRoutes.map((route) => (
            <Link key={route.url} href={route.url}>
              {route.name}
            </Link>
          ))}
          <div className="flex flex-wrap gap-2">
            <AccountButton />
          </div>
        </nav>
      ) : null}
    </div>
  );
}
