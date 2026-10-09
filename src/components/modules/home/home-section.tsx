import { TodayScheduleList } from "@/components/modules/home/today-schedule-list";

export function HomeSection() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">HandyHub</h1>
        <p className="text-sm text-muted-foreground">
          Book a technician from today&apos;s published schedules.
        </p>
      </div>
      <TodayScheduleList />
    </section>
  );
}
