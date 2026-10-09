"use client";

import { getTodaysSchedules } from "@/api/schedule.api";
import { TechnicianPortrait } from "@/components/modules/technicians/technician-card";
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
    return (
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <li key={index} className="h-80 animate-pulse rounded-lg border bg-muted" />
        ))}
      </ul>
    );
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
        <ul className="grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((schedule) => {
            const technician = schedule.techinician;
            const imageUrl = technician.user?.imageUrl;
            return (
              <li key={schedule.id} className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <TechnicianPortrait
                  name={technician.name}
                  imageUrl={imageUrl}
                  specialization={technician.specialization}
                />
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h3 className="font-medium">{technician.name}</h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {technician.bio || technician.specialization || "Published visit for today."}
                  </p>
                  <p className="text-sm">
                    {formatTime(schedule.startDateTime)} – {formatTime(schedule.endDateTime)}
                  </p>
                  <p className="text-sm">Fee {formatFee(technician.consultationFee)}</p>
                  <p className="text-sm">
                    {schedule.availableSlots} open {schedule.availableSlots === 1 ? "slot" : "slots"}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-3">
                    <Button
                      variant="outline"
                      render={<Link href={`/technicians/${technician.id}`}>View details</Link>}
                      nativeButton={false}
                    >
                      View details
                    </Button>
                    <Button
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
                  </div>
                </div>
              </li>
            );
          })}
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
