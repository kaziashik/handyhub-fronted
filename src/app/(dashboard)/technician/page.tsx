import { TechnicianOverview } from "@/components/modules/analytics/technician-overview";
import { PageTitle } from "@/components/modules/page-title";

export default function TechnicianDashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageTitle title="Overview" detail="Your schedules and booked visits." />
      <TechnicianOverview />
    </div>
  );
}
