import { TechnicianAppointments } from "@/components/modules/appointments/technician-appointments";
import { PageTitle } from "@/components/modules/page-title";
import { Suspense } from "react";

export default function TechnicianAppointmentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageTitle title="Appointments" detail="Visits booked with you." />
      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">Loading appointments...</p>
        }
      >
        <TechnicianAppointments />
      </Suspense>
    </div>
  );
}
