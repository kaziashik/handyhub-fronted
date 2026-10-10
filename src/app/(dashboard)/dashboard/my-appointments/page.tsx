import { MyAppointments } from "@/components/modules/appointments/my-appointments";
import { PageTitle } from "@/components/modules/page-title";
import { Suspense } from "react";

export default function DashboardMyAppointmentsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageTitle
        title="Appointments"
        detail="Visits you have booked, paid, or cancelled."
      />
      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">Loading appointments...</p>
        }
      >
        <MyAppointments />
      </Suspense>
    </div>
  );
}
