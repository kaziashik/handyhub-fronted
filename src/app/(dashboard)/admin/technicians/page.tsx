import { PageTitle } from "@/components/modules/page-title";
import { TechnicianApplications } from "@/components/modules/technicians/technician-applications";
import { Suspense } from "react";

export default function AdminTechniciansPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageTitle
        title="Technicians"
        detail="Applications waiting for approval."
      />
      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">Loading technicians...</p>
        }
      >
        <TechnicianApplications />
      </Suspense>
    </div>
  );
}
