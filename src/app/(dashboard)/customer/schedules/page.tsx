import { TodayScheduleList } from "@/components/modules/home/today-schedule-list";
import { PageTitle } from "@/components/modules/page-title";

export default function CustomerSchedulesPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageTitle
        title="Schedules"
        detail="Today's published times you can book."
      />
      <TodayScheduleList />
    </div>
  );
}
