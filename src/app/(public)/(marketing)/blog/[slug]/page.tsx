import { Button } from "@/components/ui/button";
import { guideBySlug, guides } from "@/content/guides";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) notFound();

  const related = guides.filter((item) => item.slug !== guide.slug);

  return (
    <article className="flex flex-col">
      <section className="border-b">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-12 lg:grid-cols-2">
          <div className="animate-rise flex flex-col gap-5">
            <Link href="/blog" className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary">
              <ArrowLeft className="size-4" aria-hidden />
              All guides
            </Link>
            <h1 className="text-4xl font-semibold tracking-tight">{guide.title}</h1>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">{guide.summary}</p>
          </div>
          <img
            src={guide.image}
            alt=""
            className="h-80 w-full rounded-2xl object-cover shadow-md"
          />
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-12">
        {guide.paragraphs.map((paragraph, index) => (
          <div key={paragraph} className="flex items-start gap-4 rounded-xl border p-5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
              {index + 1}
            </span>
            <p className="text-sm leading-6 text-muted-foreground">{paragraph}</p>
          </div>
        ))}
      </section>

      <section className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-12">
          <h2 className="text-2xl font-semibold">More guides</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group overflow-hidden rounded-xl border transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <img
                  src={item.image}
                  alt=""
                  className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="flex flex-col gap-2 p-4">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{item.summary}</p>
                </div>
              </Link>
            ))}
          </div>
          <Button className="w-fit" render={<Link href="/help">Open help</Link>} nativeButton={false}>
            Open help
          </Button>
        </div>
      </section>
    </article>
  );
}
