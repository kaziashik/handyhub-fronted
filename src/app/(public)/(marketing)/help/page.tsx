import { HelpQuestions } from "@/components/modules/help/help-questions";
import { Button } from "@/components/ui/button";
import { guides } from "@/content/guides";
import { BadgeCheck, CalendarCheck, KeyRound, Mail, UserRound, Wallet } from "lucide-react";
import Link from "next/link";

const paths = [
  {
    title: "Customers",
    icon: UserRound,
    text: "Register here, verify the email code, then book a published visit.",
    href: "/register",
    action: "Create an account",
    steps: [
      { icon: Mail, text: "Create an account and enter the email code HandyHub sends." },
      { icon: CalendarCheck, text: "Open a schedule published for today that still has an open slot." },
      { icon: Wallet, text: "Pay the fee with bKash, then follow the visit from your appointments." },
    ],
  },
  {
    title: "Technicians",
    icon: BadgeCheck,
    text: "Apply with a license. After approval, set a password and publish your hours.",
    href: "/apply",
    action: "Apply to work",
    steps: [
      { icon: BadgeCheck, text: "Send your license, experience, and resume on the apply form." },
      { icon: Mail, text: "Verify the email code so an admin can review the application." },
      { icon: KeyRound, text: "After approval, use Forgot password to set a password and sign in." },
    ],
  },
];

const guideImages: Record<string, string> = {
  "book-a-visit": "/images/general.jpg",
  "pay-with-bkash": "/images/hero.jpg",
  "become-a-technician": "/images/electrical.jpg",
};

export default function HelpPage() {
  return (
    <div className="flex flex-col">
      <section className="border-b">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-12 lg:grid-cols-2">
          <div className="animate-rise flex flex-col gap-5">
            <p className="text-sm font-medium text-primary">Help</p>
            <h1 className="text-4xl font-semibold tracking-tight">
              Book a visit, or start working on HandyHub.
            </h1>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              Customers register here. Technicians apply, then set a password after approval.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button render={<Link href="/register">Create an account</Link>} nativeButton={false}>
                Create an account
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
            src="/images/electrical.jpg"
            alt="Electrician working on a home visit"
            className="h-80 w-full rounded-2xl object-cover shadow-md"
          />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-12 lg:grid-cols-2">
        {paths.map((path) => (
          <article
            key={path.title}
            className="flex h-full flex-col gap-5 rounded-xl border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <path.icon className="size-5" aria-hidden />
              </span>
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-medium">{path.title}</h2>
                <p className="text-sm leading-6 text-muted-foreground">{path.text}</p>
              </div>
            </div>
            <ol className="flex flex-col gap-3">
              {path.steps.map((step, index) => (
                <li key={step.text} className="flex items-start gap-3 text-sm leading-6">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{step.text}</span>
                </li>
              ))}
            </ol>
            <Button
              variant="outline"
              className="mt-auto w-fit"
              render={<Link href={path.href}>{path.action}</Link>}
              nativeButton={false}
            >
              {path.action}
            </Button>
          </article>
        ))}
      </section>

      <section className="border-y bg-muted/40">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Common questions</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              Short answers for booking, payment, and technician approval.
            </p>
          </div>
          <HelpQuestions />
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Guides</h2>
          <p className="text-sm text-muted-foreground">
            Longer notes on booking, bKash, and applying to work.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/blog/${guide.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-xl border transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <img
                src={guideImages[guide.slug] ?? "/images/general.jpg"}
                alt=""
                className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="font-medium">{guide.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{guide.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-4 px-4 py-12">
          <h2 className="text-2xl font-semibold">Still need a hand?</h2>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Send a message and HandyHub replies to the email you enter.
          </p>
          <Button render={<Link href="/contact">Contact us</Link>} nativeButton={false}>
            Contact us
          </Button>
        </div>
      </section>
    </div>
  );
}
