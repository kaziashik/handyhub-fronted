import { PageTitle } from "@/components/modules/page-title";
import { TechnicianDirectory } from "@/components/modules/technicians/technician-directory";
import { Suspense } from "react";

export default function TechniciansPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8">
      <PageTitle
        title="Technicians"
        detail="Approved technicians you can filter by specialty and experience."
      />
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading technicians...</p>}>
        <TechnicianDirectory />
      </Suspense>
    </div>
  );
}
