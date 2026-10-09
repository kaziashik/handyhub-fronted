"use client";

import { useMe } from "@/hooks/use-me";
import {
  adminRoutes,
  customerRoutes,
  technicianRoutes,
} from "@/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const { data } = useMe();
  const role = data?.data?.role;
  const links =
    role === "ADMIN"
      ? adminRoutes
      : role === "TECHNICIAN"
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
