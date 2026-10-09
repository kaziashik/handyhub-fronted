import { AccountButton } from "@/components/auth/account-button";
import { MobileNav } from "@/components/layout/public/mobile-nav";
import { SiteNav } from "@/components/layout/public/site-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center gap-4 px-4">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 text-[15px] font-semibold tracking-tight">
          <Image src="/logo.svg" alt="" width={32} height={32} className="size-8" />
          HandyHub
        </Link>
        <SiteNav className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex" />
        <div className="ml-auto flex shrink-0 items-center gap-1.5">
          <ThemeToggle />
          <div className="hidden items-center gap-1.5 md:flex">
            <AccountButton />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
