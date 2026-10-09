"use client";

import { getTodaysSchedules } from "@/api/schedule.api";
import { Button } from "@/components/ui/button";
import { useMe } from "@/hooks/use-me";
import { apiErrorMessage } from "@/lib/api-error";
import { bookEntryPath } from "@/lib/role-redirect";
import type { TodaySchedule } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

function scheduleErrorMessage(error: unknown) {
  return apiErrorMessage(error, "Could not load today's schedules");
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatFee(fee: TodaySchedule["techinician"]["consultationFee"]) {
  if (fee === null || fee === "") return "Not set";
  const amount = Number(fee);
  if (Number.isNaN(amount)) return String(fee);
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function TodayScheduleList() {
  const me = useMe();
  const role = me.data?.data?.role;
  const schedules = useQuery({
    queryKey: ["todays-schedules"],
    queryFn: () =>
      getTodaysSchedules({
        limit: 50,
        sortBy: "startDateTime",
        sortOrder: "asc",
      }),
  });

  if (schedules.isPending) {
    return <p className="text-sm text-muted-foreground">Loading schedules...</p>;
  }

  if (schedules.isError) {
    return (
      <p className="text-sm text-destructive">
        {scheduleErrorMessage(schedules.error)}
      </p>
    );
  }

  const items = schedules.data?.data ?? [];

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No schedules are open today.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((schedule) => (
        <li key={schedule.id} className="rounded-lg border p-4">
          <p className="font-medium">{schedule.techinician.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatTime(schedule.startDateTime)} –{" "}
            {formatTime(schedule.endDateTime)}
          </p>
          <p className="text-sm">Fee {formatFee(schedule.techinician.consultationFee)}</p>
          <p className="text-sm">
            {schedule.availableSlots} open{" "}
            {schedule.availableSlots === 1 ? "slot" : "slots"}
          </p>
          <Button
            variant="outline"
            className="mt-3"
            disabled={me.isPending}
            nativeButton={me.isPending}
            render={
              me.isPending ? undefined : (
                <Link href={bookEntryPath(role, schedule.id)}>Book</Link>
              )
            }
          >
            Book
          </Button>
        </li>
      ))}
    </ul>
  );
}
