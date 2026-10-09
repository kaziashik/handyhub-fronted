import { AccountButton } from "@/components/auth/account-button";
import { MobileNav } from "@/components/layout/public/mobile-nav";
import { SiteNav } from "@/components/layout/public/site-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-medium">
          <Image src="/logo.svg" alt="" width={28} height={28} />
          HandyHub
        </Link>
        <SiteNav className="hidden items-center gap-5 md:flex" />
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
