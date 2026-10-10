import { Button } from "@/components/ui/button";
import { guides } from "@/content/guides";
import { BadgeCheck, CalendarCheck, Wallet } from "lucide-react";
import Link from "next/link";

const guideIcons = {
  "book-a-visit": CalendarCheck,
  "pay-with-bkash": Wallet,
  "become-a-technician": BadgeCheck,
};

export default function BlogPage() {
  return (
    <div className="flex flex-col">
      <section className="border-b">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-12 lg:grid-cols-2">
          <div className="animate-rise flex flex-col gap-5">
            <p className="text-sm font-medium text-primary">Blog</p>
            <h1 className="text-4xl font-semibold tracking-tight">
              Guides for booking, payment, and applying.
            </h1>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              How booking, payment, and technician applications work on HandyHub.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button render={<Link href="/technicians">Browse technicians</Link>} nativeButton={false}>
                Browse technicians
              </Button>
              <Button variant="outline" render={<Link href="/apply">Apply to work</Link>} nativeButton={false}>
                Apply to work
              </Button>
            </div>
          </div>
          <img
            src="/images/general.jpg"
            alt="Technician working on a home visit"
            className="h-80 w-full rounded-2xl object-cover shadow-md"
          />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-12 md:grid-cols-3">
        {guides.map((guide) => {
          const Icon = guideIcons[guide.slug as keyof typeof guideIcons] ?? CalendarCheck;
          return (
            <Link
              key={guide.slug}
              href={`/blog/${guide.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-xl border transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <img
                src={guide.image}
                alt=""
                className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="flex flex-1 flex-col gap-2 p-5">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h2 className="text-lg font-medium">{guide.title}</h2>
                <p className="text-sm leading-6 text-muted-foreground">{guide.summary}</p>
                <p className="mt-auto pt-3 text-sm font-medium text-primary">Read guide</p>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
