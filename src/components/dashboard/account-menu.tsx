import { LogoutButton } from "@/components/auth/logout-button";
import Link from "next/link";

export function AccountMenu() {
  return (
    <div className="flex items-center gap-4 text-sm">
      <Link href="/change-password">Change password</Link>
      <LogoutButton />
    </div>
  );
}
