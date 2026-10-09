import { CreateScheduleForm } from "@/components/form/create-schedule-form";
import { PageTitle } from "@/components/modules/page-title";
import { MySchedules } from "@/components/modules/schedules/my-schedules";
import { Suspense } from "react";

export default function TechnicianSchedulesPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageTitle
        title="My schedules"
        detail="Draft and published times customers can book."
      />
      <CreateScheduleForm />
      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">Loading schedules...</p>
        }
      >
        <MySchedules />
      </Suspense>
    </div>
  );
}
