import { PageSkeleton } from "@/components/ui/page-skeleton";

export default function MarketingLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <PageSkeleton />
    </div>
  );
}
