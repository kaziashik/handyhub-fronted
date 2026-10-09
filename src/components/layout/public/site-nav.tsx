"use client";

import { useMe } from "@/hooks/use-me";
import { dashboardPath } from "@/lib/role-redirect";
import { publicRoutes } from "@/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function useSiteLinks() {
  const { data } = useMe();
  const role = data?.data?.role;

  if (!role) return publicRoutes;

  return [
    { name: "Home", url: "/" },
    { name: "Technicians", url: "/technicians" },
    { name: "Dashboard", url: dashboardPath(role) },
    { name: "Blog", url: "/blog" },
    { name: "Help", url: "/help" },
    { name: "Contact", url: "/contact" },
  ];
}

export function SiteNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const links = useSiteLinks();

  return (
    <nav className={className}>
      {links.map((route) => {
        const current =
          route.url === "/"
            ? pathname === "/"
            : pathname === route.url || pathname.startsWith(`${route.url}/`);
        return (
          <Link
            key={route.url}
            href={route.url}
            className={current ? "font-semibold text-primary" : undefined}
          >
            {route.name}
          </Link>
        );
      })}
    </nav>
  );
}
