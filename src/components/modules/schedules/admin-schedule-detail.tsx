"use client";

import { getSchedule } from "@/api/schedule.api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FetchError } from "ofetch";

function detailErrorMessage(error: unknown) {
  if (error instanceof FetchError) {
    const body = error.data as { message?: string } | undefined;
    return body?.message ?? "Could not load the schedule";
  }
  return "Could not load the schedule";
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function label(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export function AdminScheduleDetail({ scheduleId }: { scheduleId: string }) {
  const schedule = useQuery({
    queryKey: ["schedule", scheduleId],
    queryFn: () => getSchedule(scheduleId),
  });

  if (schedule.isPending) {
    return <p className="text-sm text-muted-foreground">Loading schedule...</p>;
  }

  if (schedule.isError) {
    return (
      <p className="text-sm text-destructive">
        {detailErrorMessage(schedule.error)}
      </p>
    );
  }

  const visit = schedule.data?.data;
  if (!visit) {
    return <p className="text-sm text-muted-foreground">Schedule was not returned.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/admin/schedules"
        className="text-sm underline-offset-4 hover:underline"
      >
        Back to schedules
      </Link>
      <section className="rounded-lg border p-4">
        <h2 className="font-medium">Technician</h2>
        <p className="text-sm">{visit.techinician.name}</p>
        <p className="text-sm text-muted-foreground">{visit.techinician.email}</p>
        <p className="text-sm text-muted-foreground">
          {visit.techinician.specialization}
        </p>
      </section>
      <section className="rounded-lg border p-4">
        <h2 className="font-medium">Schedule</h2>
        <p className="text-sm">{label(visit.status)}</p>
        <p className="text-sm">
          {formatTime(visit.startDateTime)} – {formatTime(visit.endDateTime)}
        </p>
        <p className="text-sm text-muted-foreground">
          {visit.availableSlots} of {visit.totalSlots} slots open
        </p>
        {visit.meetingLink ? (
          <a
            className="text-sm underline-offset-4 hover:underline"
            href={visit.meetingLink}
          >
            Meeting link
          </a>
        ) : null}
      </section>
      <section className="rounded-lg border p-4">
        <h2 className="font-medium">Appointments</h2>
        {visit.appointments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No appointments.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {visit.appointments.map((appointment) => (
              <li key={appointment.id} className="text-sm">
                {appointment.customer.name} · {label(appointment.status)}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
