import { Landing } from "@/components/modules/home/landing";
import { TodayScheduleList } from "@/components/modules/home/today-schedule-list";
import { Suspense } from "react";

export function HomeSection() {
  return (
    <Landing
      schedules={
        <Suspense
          fallback={
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }, (_, index) => (
                <li key={index} className="h-80 animate-pulse rounded-lg border bg-muted" />
              ))}
            </ul>
          }
        >
          <TodayScheduleList />
        </Suspense>
      }
    />
  );
}
