"use client";

import { AccountButton } from "@/components/auth/account-button";
import { SiteNav } from "@/components/layout/public/site-nav";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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
        variant="ghost"
        size="icon"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </Button>
      {open ? (
        <div className="fixed inset-x-0 top-16 z-30 border-b bg-background/95 px-3 py-3 shadow-lg backdrop-blur-md">
          <SiteNav stacked className="flex flex-col gap-1" />
          <div className="mt-3 flex flex-wrap gap-2 border-t px-1 pt-3">
            <AccountButton />
          </div>
        </div>
      ) : null}
    </div>
  );
}
