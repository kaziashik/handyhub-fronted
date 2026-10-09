import { AccountMenu } from "@/components/dashboard/account-menu";
import { Sidebar } from "@/components/dashboard/sidebar";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r p-4">
        <Sidebar />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex justify-end border-b px-6 py-3">
          <AccountMenu />
        </header>
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  );
}
