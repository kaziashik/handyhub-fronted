import { DashboardGuard } from "@/components/auth/dashboard-guard";
import { AccountMenu } from "@/components/dashboard/account-menu";
import { DashboardMenu } from "@/components/dashboard/dashboard-menu";
import { Sidebar } from "@/components/dashboard/sidebar";
import Header from "@/components/layout/public/Header";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardGuard>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <aside className="hidden w-60 shrink-0 border-r bg-muted/20 p-3 md:block">
          <Sidebar />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="relative flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 md:justify-end md:px-6">
            <DashboardMenu />
            <AccountMenu />
          </header>
          <div className="min-w-0 flex-1 p-4 md:p-6">{children}</div>
        </div>
        </div>
      </div>
    </DashboardGuard>
  );
}
