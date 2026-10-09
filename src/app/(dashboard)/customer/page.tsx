import { AppointmentSection } from "@/components/modules/appointments/appointment-section";
import { PageTitle } from "@/components/modules/page-title";

export default function CustomerDashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageTitle title="Overview" detail="Your bookings, payments, and visits." />
      <AppointmentSection />
    </div>
  );
}
