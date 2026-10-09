import { ContactForm } from "@/components/form/contact-form";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import Link from "next/link";

const details = [
  {
    icon: Mail,
    title: "Email",
    text: "support@handyhub.app",
    href: "mailto:support@handyhub.app",
  },
  {
    icon: MapPin,
    title: "Office",
    text: "Dhaka, Bangladesh",
  },
  {
    icon: MessageSquare,
    title: "Reply",
    text: "We reply to the email you enter on the form.",
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <section className="border-b">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-12 lg:grid-cols-2">
          <div className="animate-rise flex flex-col gap-5">
            <p className="text-sm font-medium text-primary">Contact</p>
            <h1 className="text-4xl font-semibold tracking-tight">Send a message to HandyHub.</h1>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              Ask about a booking, an application, or a payment. We reply to the email you enter.
            </p>
            <ul className="flex flex-col gap-3">
              {details.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="size-5" aria-hidden />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-medium">{item.title}</span>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-sm text-muted-foreground">{item.text}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <img
            src="/images/hero.jpg"
            alt="Technician in a hard hat and safety vest"
            className="h-80 w-full rounded-2xl object-cover object-[center_22%] shadow-md"
          />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl items-start gap-6 px-4 py-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-xl border p-5 shadow-sm">
          <h2 className="text-lg font-medium">Write to us</h2>
          <p className="mt-1 mb-5 text-sm text-muted-foreground">
            Use the email you want the reply sent to.
          </p>
          <ContactForm />
        </div>
        <aside className="flex flex-col gap-4 rounded-xl border bg-muted/40 p-5">
          <h2 className="text-lg font-medium">Before you write</h2>
          <p className="text-sm leading-6 text-muted-foreground">
            Booking steps, cancellation, and technician approval are already answered on the help page.
          </p>
          <Link href="/help" className="text-sm font-medium text-primary">
            Open help
          </Link>
        </aside>
      </section>
    </div>
  );
}
