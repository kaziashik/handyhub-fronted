import { guides } from "@/content/guides";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8">
      <h1 className="text-2xl font-semibold">Guides</h1>
      <p className="text-sm text-muted-foreground">
        How booking, payment, and technician applications work on HandyHub.
      </p>
      <ul className="grid gap-4 md:grid-cols-3">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link href={`/blog/${guide.slug}`} className="flex h-full flex-col rounded-lg border p-4">
              <h2 className="font-medium">{guide.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{guide.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
