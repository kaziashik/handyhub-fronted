import Link from "next/link";

export function AccountMenu() {
  return (
    <div className="flex gap-4 text-sm">
      <Link href="/change-password">Change password</Link>
      <Link href="/login">Login</Link>
    </div>
  );
}
