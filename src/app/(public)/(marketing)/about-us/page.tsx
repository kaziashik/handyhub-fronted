import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  CalendarCheck,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wallet,
  Wrench,
} from "lucide-react";
import Link from "next/link";

const roles = [
  {
    title: "Customers",
    icon: UserRound,
    text: "Browse the schedules published for today, see the technician, time, fee, and open slots, then book a visit.",
  },
  {
    title: "Technicians",
    icon: BadgeCheck,
    text: "Apply with a license and experience. After the email is verified and an admin approves the application, sign in and publish the times you can work.",
  },
  {
    title: "Admins",
    icon: ShieldCheck,
    text: "Review technician applications and keep the published schedules and bookings in order.",
  },
];

const steps = [
  {
    icon: CalendarCheck,
    title: "Pick an open slot",
    text: "Each approved technician publishes one schedule for the day customers can book.",
  },
  {
    icon: Wallet,
    title: "Pay with bKash",
    text: "Checkout starts when you book. A pending visit can be paid again.",
  },
  {
    icon: Wrench,
    title: "Follow the visit",
    text: "The appointment stays in your dashboard until it is completed or cancelled.",
  },
];

const trades = [
  { title: "Electrical", image: "/images/electrical.jpg" },
  { title: "Plumbing", image: "/images/plumbing.jpg" },
  { title: "House cleaning", image: "/images/cleaning.jpg" },
  { title: "Appliance repair", image: "/images/appliance.jpg" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="border-b">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-12 lg:grid-cols-2">
          <div className="animate-rise flex flex-col gap-5">
            <p className="text-sm font-medium text-primary">About us</p>
            <h1 className="text-4xl font-semibold tracking-tight">
              HandyHub connects customers with verified technicians.
            </h1>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              A customer books a published visit. A technician applies with a license. An admin approves that application before any hours go live.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button render={<Link href="/technicians">Browse technicians</Link>} nativeButton={false}>
                Browse technicians
              </Button>
              <Button
                variant="outline"
                render={<Link href="/apply">Apply to work</Link>}
                nativeButton={false}
              >
                Apply to work
              </Button>
            </div>
          </div>
          <img
            src="/images/hero.jpg"
            alt="Woman technician in a hard hat and safety vest"
            className="h-80 w-full rounded-2xl object-cover object-[center_22%] shadow-md"
          />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-12 md:grid-cols-3">
        {roles.map((role) => (
          <article
            key={role.title}
            className="flex h-full flex-col gap-3 rounded-xl border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <role.icon className="size-5" aria-hidden />
            </span>
            <h2 className="text-lg font-medium">{role.title}</h2>
            <p className="text-sm leading-6 text-muted-foreground">{role.text}</p>
          </article>
        ))}
      </section>

      <section className="border-y bg-muted/40">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">How a visit works</h2>
            <p className="text-sm text-muted-foreground">
              The same path a customer follows after an account is verified.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-xl border bg-background p-5">
                <step.icon className="size-5 text-primary" aria-hidden />
                <p className="mt-3 text-sm text-primary">Step {index + 1}</p>
                <h3 className="mt-1 font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-12">
        <div className="flex flex-col gap-2">
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <Sparkles className="size-5 text-primary" aria-hidden />
            Trades on HandyHub
          </h2>
          <p className="text-sm text-muted-foreground">
            Technicians list a specialization such as electrical, plumbing, house cleaning, or appliance repair.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trades.map((trade) => (
            <Link
              key={trade.title}
              href={`/technicians?specialization=${encodeURIComponent(trade.title === "House cleaning" ? "Cleaning" : trade.title)}`}
              className="group overflow-hidden rounded-xl border transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <img
                src={trade.image}
                alt=""
                className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <p className="p-4 text-sm font-medium">{trade.title}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
