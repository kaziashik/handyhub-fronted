import { PageTitle } from "@/components/modules/page-title";
import { ScheduleSection } from "@/components/modules/schedules/schedule-section";

export default function TechnicianDashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageTitle title="Technician" detail="Your schedules and booked visits." />
      <ScheduleSection />
    </div>
  );
}
