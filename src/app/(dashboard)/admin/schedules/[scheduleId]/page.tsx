import { PageTitle } from "@/components/modules/page-title";
import { AdminScheduleDetail } from "@/components/modules/schedules/admin-schedule-detail";

export default async function AdminScheduleDetailPage({
  params,
}: {
  params: Promise<{ scheduleId: string }>;
}) {
  const { scheduleId } = await params;

  return (
    <div className="flex flex-col gap-4">
      <PageTitle title="Schedule" detail="Technician, time, and booked visits." />
      <AdminScheduleDetail scheduleId={scheduleId} />
    </div>
  );
}
