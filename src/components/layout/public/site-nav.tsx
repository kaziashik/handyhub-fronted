"use client";

import { useMe } from "@/hooks/use-me";
import { dashboardPath } from "@/lib/role-redirect";
import { publicRoutes } from "@/routes";
import { cn } from "cn";
import {
  CircleHelp,
  House,
  Info,
  LayoutDashboard,
  Mail,
  Newspaper,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const linkIcons: Record<string, LucideIcon> = {
  "/": House,
  "/technicians": Wrench,
  "/about-us": Info,
  "/help": CircleHelp,
  "/contact": Mail,
  "/blog": Newspaper,
};

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

export function SiteNav({
  className,
  stacked = false,
}: {
  className?: string;
  stacked?: boolean;
}) {
  const pathname = usePathname();
  const links = useSiteLinks();

  return (
    <nav className={className}>
      {links.map((route) => {
        const current =
          route.url === "/"
            ? pathname === "/"
            : pathname === route.url || pathname.startsWith(`${route.url}/`);
        const Icon = linkIcons[route.url] ?? LayoutDashboard;
        return (
          <Link
            key={route.url}
            href={route.url}
            aria-current={current ? "page" : undefined}
            className={cn(
              "inline-flex items-center gap-1.5 whitespace-nowrap text-sm transition duration-200",
              stacked ? "w-full rounded-lg px-3 py-2" : "shrink-0 rounded-full px-2.5 py-1.5",
              current
                ? "bg-primary/15 font-medium text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            {route.name}
          </Link>
        );
      })}
    </nav>
  );
}
