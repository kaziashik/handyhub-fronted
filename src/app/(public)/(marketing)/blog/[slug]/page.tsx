import { guideBySlug, guides } from "@/content/guides";
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

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-8">
      <Link href="/blog" className="text-sm text-primary">
        All guides
      </Link>
      <h1 className="text-2xl font-semibold">{guide.title}</h1>
      {guide.paragraphs.map((paragraph) => (
        <p key={paragraph} className="text-sm leading-6">
          {paragraph}
        </p>
      ))}
    </article>
  );
}
