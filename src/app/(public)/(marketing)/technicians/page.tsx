import { PageTitle } from "@/components/modules/page-title";
import { TechnicianDirectory } from "@/components/modules/technicians/technician-directory";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

export default function TechniciansPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <PageTitle
          title="Technicians"
          detail="Approved technicians you can filter by specialty and experience."
        />
        <Button render={<Link href="/apply">Apply as a technician</Link>} nativeButton={false}>
          Apply as a technician
        </Button>
      </div>
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading technicians...</p>}>
        <TechnicianDirectory />
      </Suspense>
    </div>
  );
}
