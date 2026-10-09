import { AdminAppointments } from "@/components/modules/appointments/admin-appointments";
import { PageTitle } from "@/components/modules/page-title";
import { Suspense } from "react";

export default function AdminAppointmentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageTitle title="Appointments" detail="Every visit in the system." />
      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">Loading appointments...</p>
        }
      >
        <AdminAppointments />
      </Suspense>
    </div>
  );
}
