import { PageTitle } from "@/components/modules/page-title";
import { AdminSchedules } from "@/components/modules/schedules/admin-schedules";
import { Suspense } from "react";

export default function AdminSchedulesPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageTitle title="Schedules" detail="Every technician schedule." />
      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">Loading schedules...</p>
        }
      >
        <AdminSchedules />
      </Suspense>
    </div>
  );
}
