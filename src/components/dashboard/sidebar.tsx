"use client";

import {
  adminRoutes,
  customerRoutes,
  technicianRoutes,
} from "@/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const links = pathname.startsWith("/admin")
    ? adminRoutes
    : pathname.startsWith("/technician")
      ? technicianRoutes
      : customerRoutes;

  return (
    <nav className="flex flex-col gap-2">
      {links.map((link) => (
        <Link
          key={link.url}
          href={link.url}
          className={pathname === link.url ? "font-semibold" : undefined}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
