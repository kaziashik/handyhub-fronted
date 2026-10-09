import Image from "next/image";
import Link from "next/link";

export function BrandLink() {
  return (
    <Link href="/" className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight">
      <Image src="/logo.svg" alt="" width={32} height={32} className="size-8" />
      HandyHub
    </Link>
  );
}
