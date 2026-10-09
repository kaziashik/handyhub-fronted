"use client";

import { useMe } from "@/hooks/use-me";
import { adminRoutes, customerRoutes, technicianRoutes } from "@/routes";
import { cn } from "cn";
import {
  CalendarCheck,
  CalendarDays,
  House,
  LayoutDashboard,
  Settings,
  UserRound,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const icons: Record<string, LucideIcon> = {
  "/customer": LayoutDashboard,
  "/customer/schedules": CalendarDays,
  "/customer/appointments": CalendarCheck,
  "/customer/profile": UserRound,
  "/technician": LayoutDashboard,
  "/technician/schedules": CalendarDays,
  "/technician/appointments": CalendarCheck,
  "/technician/profile": UserRound,
  "/admin": LayoutDashboard,
  "/admin/technicians": Wrench,
  "/admin/customers": Users,
  "/admin/appointments": CalendarCheck,
  "/admin/schedules": CalendarDays,
  "/admin/settings": Settings,
};

function linkIsCurrent(pathname: string, url: string) {
  if (url === "/customer" || url === "/technician" || url === "/admin") {
    return pathname === url;
  }
  return pathname === url || pathname.startsWith(`${url}/`);
}

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
    <nav className="flex h-full flex-col gap-1">
      <Link
        href="/"
        className="mb-3 flex items-center gap-2 rounded-lg px-2 py-1.5 font-semibold tracking-tight"
      >
        <Image src="/logo.svg" alt="" width={32} height={32} className="size-8" />
        HandyHub
      </Link>
      <SidebarLink href="/" icon={House} current={pathname === "/"}>
        Home
      </SidebarLink>
      <p className="px-3 pt-4 pb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Dashboard
      </p>
      {links.map((link) => {
        const Icon = icons[link.url] ?? LayoutDashboard;
        return (
          <SidebarLink
            key={link.url}
            href={link.url}
            icon={Icon}
            current={linkIsCurrent(pathname, link.url)}
          >
            {link.name}
          </SidebarLink>
        );
      })}
    </nav>
  );
}

function SidebarLink({
  href,
  icon: Icon,
  current,
  children,
}: {
  href: string;
  icon: LucideIcon;
  current: boolean;
  children: string;
}) {
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition duration-200",
        current
          ? "bg-primary/15 font-medium text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon className="size-4 shrink-0" aria-hidden />
      {children}
    </Link>
  );
}
