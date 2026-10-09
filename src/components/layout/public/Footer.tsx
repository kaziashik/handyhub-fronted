import { Mail, MapPin } from "lucide-react";
import Link from "next/link";

const columns = [
  {
    title: "Explore",
    links: [
      { name: "Home", url: "/" },
      { name: "Technicians", url: "/technicians" },
      { name: "Blog", url: "/blog" },
      { name: "Help", url: "/help" },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "Login", url: "/login" },
      { name: "Register", url: "/register" },
      { name: "Apply as a technician", url: "/apply" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About us", url: "/about-us" },
      { name: "Contact", url: "/contact" },
      { name: "Privacy", url: "/privacy" },
      { name: "Terms", url: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-background">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((column) => (
          <div key={column.title} className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold">{column.title}</h2>
            {column.links.map((link) => (
              <Link key={link.url} href={link.url} className="text-sm text-muted-foreground">
                {link.name}
              </Link>
            ))}
          </div>
        ))}
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold">Contact</h2>
          <a className="inline-flex items-center gap-2 text-sm text-muted-foreground" href="mailto:support@handyhub.app">
            <Mail className="size-4" aria-hidden />
            support@handyhub.app
          </a>
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4" aria-hidden />
            Dhaka, Bangladesh
          </p>
          <a
            className="text-sm text-muted-foreground"
            href="https://github.com/kaziashik/handyhub"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
      <p className="border-t px-4 py-4 text-center text-sm text-muted-foreground">
        HandyHub. Book a verified technician.
      </p>
    </footer>
  );
}
