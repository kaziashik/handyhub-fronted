"use client";

import { getTodaysSchedules } from "@/api/schedule.api";
import { Button } from "@/components/ui/button";
import { useMe } from "@/hooks/use-me";
import { apiErrorMessage } from "@/lib/api-error";
import { bookEntryPath } from "@/lib/role-redirect";
import type { TodaySchedule } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const schedules = useQuery({
    queryKey: ["todays-schedules", page],
    queryFn: () =>
      getTodaysSchedules({
        page,
        limit: 10,
        sortBy: "startDateTime",
        sortOrder: "asc",
      }),
  });

  function setPage(nextPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextPage <= 1) params.delete("page");
    else params.set("page", String(nextPage));
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }

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
  const totalPages = Math.max(schedules.data?.meta?.totalPages ?? 0, 1);

  return (
    <div className="flex flex-col gap-4">
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No schedules are open today.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((schedule) => (
            <li key={schedule.id} className="rounded-lg border p-4">
              <p className="font-medium">{schedule.techinician.name}</p>
              <p className="text-sm text-muted-foreground">
                {formatTime(schedule.startDateTime)} –{" "}
                {formatTime(schedule.endDateTime)}
              </p>
              <p className="text-sm">
                Fee {formatFee(schedule.techinician.consultationFee)}
              </p>
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
      )}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <p className="text-sm text-muted-foreground">
          Page {schedules.data?.meta?.page ?? page} of {totalPages}
        </p>
        <Button
          type="button"
          variant="outline"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
