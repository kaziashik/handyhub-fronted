import { AccountButton } from "@/components/auth/account-button";
import { MobileNav } from "@/components/layout/public/mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { publicRoutes } from "@/routes";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full h-16 border-b">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto px-4">
        <Link href="/" className="flex items-center gap-2 font-medium">
          <Image src="/logo.svg" alt="" width={28} height={28} />
          HandyHub
        </Link>
        <nav className="hidden gap-5 md:flex">
          {publicRoutes.map((route) => (
            <Link key={route.url} href={route.url}>
              {route.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden items-center gap-2 md:flex">
            <AccountButton />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
