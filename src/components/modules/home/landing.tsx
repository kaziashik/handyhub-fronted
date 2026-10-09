"use client";

import { getPublicOverview } from "@/api/analytics.api";
import { Button } from "@/components/ui/button";
import { guides } from "@/content/guides";
import { apiErrorMessage } from "@/lib/api-error";
import { useQuery } from "@tanstack/react-query";
import {
  BadgeCheck,
  CalendarCheck,
  ChevronDown,
  ClipboardList,
  Droplets,
  Refrigerator,
  Sparkles,
  UserRound,
  Users,
  Wallet,
  Wrench,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

const slides = [
  {
    title: "Book a verified technician today",
    detail: "See who is available, the fee, and how many slots are still open.",
  },
  {
    title: "Pay the visit with bKash",
    detail: "Checkout starts when you book. A pending visit can be paid again.",
  },
  {
    title: "Technicians publish their own hours",
    detail: "An approved technician publishes one schedule for the day customers can book.",
  },
];

const services = [
  {
    title: "Electrical",
    detail: "Wiring, lighting, and breaker visits from approved electricians.",
    href: "/technicians?specialization=Electrical",
    image: "/images/electrical.jpg",
    icon: Zap,
  },
  {
    title: "Plumbing",
    detail: "Leak, fixture, and pipe visits from approved plumbers.",
    href: "/technicians?specialization=Plumbing",
    image: "/images/plumbing.jpg",
    icon: Droplets,
  },
  {
    title: "Appliance repair",
    detail: "Home appliance visits with a published fee and time.",
    href: "/technicians?specialization=Appliance",
    image: "/images/appliance.jpg",
    icon: Refrigerator,
  },
  {
    title: "House cleaning",
    detail: "Home cleaning visits from an approved cleaner, with a published fee and time.",
    href: "/technicians?specialization=Cleaning",
    image: "/images/cleaning.jpg",
    icon: Sparkles,
  },
  {
    title: "General",
    detail: "General repair visits when the technician lists that specialty.",
    href: "/technicians?specialization=General",
    image: "/images/general.jpg",
    icon: Wrench,
  },
];

const steps = [
  {
    icon: UserRound,
    text: "Create a customer account and verify the email code.",
  },
  {
    icon: CalendarCheck,
    text: "Choose a published schedule that still has an open slot.",
  },
  {
    icon: Wallet,
    text: "Pay with bKash, then follow the visit from your appointments.",
  },
];

const questions = [
  {
    question: "Who can publish a schedule?",
    answer:
      "Only an approved technician. Customers can book that schedule after it is published.",
  },
  {
    question: "When can a visit be cancelled?",
    answer:
      "A customer or an admin can cancel before the visit is ongoing or completed.",
  },
  {
    question: "What does a technician application need?",
    answer:
      "A license number, experience, a resume, and a verified email before an admin reviews it.",
  },
];

const guideImages: Record<string, string> = {
  "book-a-visit": "/images/general.jpg",
  "pay-with-bkash": "/images/hero.jpg",
  "become-a-technician": "/images/electrical.jpg",
};

export function Landing({ schedules }: { schedules: ReactNode }) {
  const [slide, setSlide] = useState(0);
  const [openQuestion, setOpenQuestion] = useState(0);
  const overview = useQuery({
    queryKey: ["public-overview"],
    queryFn: getPublicOverview,
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const current = slides[slide] ?? slides[0];
  const numbers = overview.data?.data;
  const stats = [
    { label: "Approved technicians", value: numbers?.approvedTechnicians, icon: BadgeCheck },
    { label: "Customers", value: numbers?.customers, icon: Users },
    { label: "Appointments", value: numbers?.appointments, icon: CalendarCheck },
    { label: "Published schedules", value: numbers?.publishedSchedules, icon: ClipboardList },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative flex h-[65vh] min-h-[28rem] items-center overflow-hidden border-b">
        <img
          src="/images/hero.jpg"
          alt="Woman technician in a hard hat and safety vest"
          className="animate-hero absolute inset-0 h-full w-full object-cover object-[center_22%]"
        />
        <div className="absolute inset-0 bg-slate-950/60" />
        <div key={current.title} className="animate-rise relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 text-white">
          <p className="text-sm font-medium text-sky-200">HandyHub</p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight">{current.title}</h1>
          <p className="max-w-xl text-slate-100">{current.detail}</p>
          <div className="flex flex-wrap gap-3">
            <Button render={<Link href="/technicians">Browse technicians</Link>} nativeButton={false}>
              Browse technicians
            </Button>
            <Button
              variant="outline"
              className="border-white/40 bg-white/10 text-white hover:bg-white/20"
              render={<Link href="/apply">Apply to work</Link>}
              nativeButton={false}
            >
              Apply to work
            </Button>
          </div>
          <div className="flex gap-2" aria-label="Highlights">
            {slides.map((item, index) => (
              <button
                key={item.title}
                type="button"
                aria-label={item.title}
                aria-current={index === slide ? "true" : undefined}
                className={index === slide ? "h-2 w-8 rounded-full bg-white" : "h-2 w-8 rounded-full bg-white/40"}
                onClick={() => setSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-12 md:grid-cols-3">
        {steps.map((step, index) => (
          <article key={step.text} className="rounded-lg border p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <step.icon className="size-5 text-primary" aria-hidden />
            <p className="mt-3 text-sm text-primary">Step {index + 1}</p>
            <p className="mt-2 text-sm leading-6">{step.text}</p>
          </article>
        ))}
      </section>

      <section className="border-y bg-muted/40">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group flex h-full flex-col overflow-hidden rounded-lg border bg-background transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <img
                src={service.image}
                alt=""
                className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h2 className="flex items-center gap-2 font-medium">
                  <service.icon className="size-4 text-primary" aria-hidden />
                  {service.title}
                </h2>
                <p className="text-sm text-muted-foreground">{service.detail}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Open today</h2>
          <p className="text-sm text-muted-foreground">
            Published schedules that still have a slot later today.
          </p>
        </div>
        {schedules}
      </section>

      <section className="border-y">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {overview.isPending ? (
            <p className="text-sm text-muted-foreground">Loading platform numbers...</p>
          ) : overview.isError ? (
            <p className="text-sm text-destructive">
              {apiErrorMessage(overview.error, "Could not load platform numbers")}
            </p>
          ) : (
            stats.map((stat) => (
              <article key={stat.label} className="rounded-lg border p-4">
                <stat.icon className="size-5 text-primary" aria-hidden />
                <p className="mt-3 text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-semibold">{stat.value ?? 0}</p>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-12">
        <h2 className="text-2xl font-semibold">Questions</h2>
        {questions.map((item, index) => {
          const open = openQuestion === index;
          return (
            <div key={item.question} className="overflow-hidden rounded-lg border">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium"
                aria-expanded={open}
                onClick={() => setOpenQuestion(index)}
              >
                {item.question}
                <ChevronDown
                  className={`size-4 shrink-0 text-primary transition duration-300 ${open ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
              {open ? (
                <p className="px-4 pb-4 text-sm text-muted-foreground">{item.answer}</p>
              ) : null}
            </div>
          );
        })}
      </section>

      <section className="border-t bg-muted/40">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-12 md:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/blog/${guide.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-lg border bg-background transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <img
                src={guideImages[guide.slug] ?? "/images/general.jpg"}
                alt=""
                className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="flex flex-1 flex-col p-4">
                <h2 className="font-medium">{guide.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{guide.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img src="/images/plumbing.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-slate-950/65" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-4 px-4 py-16 text-white">
          <h2 className="text-2xl font-semibold">Ready for a visit?</h2>
          <p className="max-w-xl text-sm text-slate-100">
            Register as a customer, or apply if you already hold a trade license.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button render={<Link href="/register">Create an account</Link>} nativeButton={false}>
              Create an account
            </Button>
            <Button
              variant="outline"
              className="border-white/40 bg-white/10 text-white hover:bg-white/20"
              render={<Link href="/contact">Contact us</Link>}
              nativeButton={false}
            >
              Contact us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
