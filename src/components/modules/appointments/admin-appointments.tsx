"use client";

import { cancelAppointment, getAllAppointments } from "@/api/appointment.api";
import { Button } from "@/components/ui/button";
import type { AppointmentStatus } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FetchError } from "ofetch";
import { useState } from "react";

const statuses: AppointmentStatus[] = [
  "PENDING",
  "CONFIRMED",
  "ONGOING",
  "COMPLETED",
  "CANCELLED",
];

function listErrorMessage(error: unknown) {
  if (error instanceof FetchError) {
    const body = error.data as { message?: string } | undefined;
    return body?.message ?? "Could not load appointments";
  }
  return "Could not load appointments";
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatAmount(amount: string | number) {
  const value = Number(amount);
  if (Number.isNaN(value)) return String(amount);
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

function label(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function cancelErrorMessage(error: unknown) {
  if (error instanceof FetchError) {
    const body = error.data as { message?: string } | undefined;
    return body?.message ?? "Could not cancel appointment";
  }
  return "Could not cancel appointment";
}

export function AdminAppointments() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const appointmentStatus = searchParams.get("appointmentStatus") ?? "";
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [cancelError, setCancelError] = useState<{
    id: string;
    message: string;
  } | null>(null);

  async function handleCancel(appointmentId: string) {
    setCancelError(null);
    setCancellingId(appointmentId);
    try {
      await cancelAppointment({ appointmentId });
      await queryClient.invalidateQueries({ queryKey: ["all-appointments"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-analytics"] });
    } catch (error) {
      setCancelError({
        id: appointmentId,
        message: cancelErrorMessage(error),
      });
    } finally {
      setCancellingId(null);
    }
  }

  const appointments = useQuery({
    queryKey: ["all-appointments", page, appointmentStatus],
    queryFn: () =>
      getAllAppointments({
        page,
        limit: 10,
        ...(appointmentStatus ? { status: appointmentStatus } : {}),
      }),
  });

  function setListQuery(next: { page?: number; appointmentStatus?: string }) {
    const params = new URLSearchParams(searchParams.toString());
    const nextPage = next.page ?? page;
    const nextStatus = next.appointmentStatus ?? appointmentStatus;
    if (nextPage <= 1) params.delete("page");
    else params.set("page", String(nextPage));
    if (!nextStatus) params.delete("appointmentStatus");
    else params.set("appointmentStatus", nextStatus);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="flex w-fit flex-col gap-1 text-sm">
        Status
        <select
          className="h-8 rounded-lg border bg-background px-2"
          value={appointmentStatus}
          onChange={(event) =>
            setListQuery({
              appointmentStatus: event.target.value,
              page: 1,
            })
          }
        >
          <option value="">All</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {label(status)}
            </option>
          ))}
        </select>
      </label>

      {appointments.isPending ? (
        <p className="text-sm text-muted-foreground">Loading appointments...</p>
      ) : appointments.isError ? (
        <p className="text-sm text-destructive">
          {listErrorMessage(appointments.error)}
        </p>
      ) : (appointments.data?.data.length ?? 0) === 0 ? (
        <p className="text-sm text-muted-foreground">No appointments.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {appointments.data?.data.map((appointment) => (
            <li key={appointment.id} className="rounded-lg border p-4">
              <p className="font-medium">{appointment.customer.name}</p>
              <p className="text-sm text-muted-foreground">
                {appointment.customer.email}
              </p>
              <p className="text-sm">{appointment.techinician.name}</p>
              <p className="text-sm text-muted-foreground">
                {appointment.techinician.specialization}
              </p>
              <p className="text-sm">
                {formatTime(appointment.schedule.startDateTime)} –{" "}
                {formatTime(appointment.schedule.endDateTime)}
              </p>
              <p className="text-sm">{label(appointment.status)}</p>
              {appointment.payment ? (
                <p className="text-sm">
                  {formatAmount(appointment.payment.amount)}{" "}
                  {appointment.payment.currency} · {label(appointment.payment.status)}
                </p>
              ) : null}
              {appointment.status === "PENDING" ||
              appointment.status === "CONFIRMED" ? (
                <div className="mt-3 flex flex-col items-start gap-2">
                  {cancelError?.id === appointment.id ? (
                    <p className="text-sm text-destructive">
                      {cancelError.message}
                    </p>
                  ) : null}
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={cancellingId !== null}
                    onClick={() => handleCancel(appointment.id)}
                  >
                    {cancellingId === appointment.id ? "Cancelling..." : "Cancel"}
                  </Button>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      {!appointments.isPending && !appointments.isError ? (
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={page <= 1}
            onClick={() => setListQuery({ page: page - 1 })}
          >
            Previous
          </Button>
          <p className="text-sm text-muted-foreground">
            Page {appointments.data?.meta?.page ?? page} of{" "}
            {Math.max(appointments.data?.meta?.totalPages ?? 0, 1)}
          </p>
          <Button
            type="button"
            variant="outline"
            disabled={
              page >= Math.max(appointments.data?.meta?.totalPages ?? 0, 1)
            }
            onClick={() => setListQuery({ page: page + 1 })}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
}
