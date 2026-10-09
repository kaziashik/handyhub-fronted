"use client";

import { getAppointment } from "@/api/appointment.api";
import { apiErrorMessage } from "@/lib/api-error";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

function detailErrorMessage(error: unknown) {
  return apiErrorMessage(error, "Could not load appointment");
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

export function AppointmentDetailView({
  appointmentId,
}: {
  appointmentId: string;
}) {
  const appointment = useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: () => getAppointment(appointmentId),
  });

  if (appointment.isPending) {
    return <p className="text-sm text-muted-foreground">Loading appointment...</p>;
  }

  if (appointment.isError) {
    return (
      <p className="text-sm text-destructive">
        {detailErrorMessage(appointment.error)}
      </p>
    );
  }

  const visit = appointment.data?.data;
  if (!visit) {
    return <p className="text-sm text-muted-foreground">Appointment was not returned.</p>;
  }

  const payment = visit.payment;

  return (
    <div className="flex flex-col gap-4">
      <Link href="/customer/appointments" className="text-sm underline-offset-4 hover:underline">
        Back to appointments
      </Link>
      <section className="rounded-lg border p-4">
        <h2 className="font-medium">Status</h2>
        <p className="text-sm">{label(visit.status)}</p>
      </section>
      <section className="rounded-lg border p-4">
        <h2 className="font-medium">Technician</h2>
        <p className="text-sm">{visit.techinician.name}</p>
        <p className="text-sm text-muted-foreground">
          {visit.techinician.specialization}
        </p>
      </section>
      <section className="rounded-lg border p-4">
        <h2 className="font-medium">Schedule</h2>
        <p className="text-sm">
          {formatTime(visit.schedule.startDateTime)} –{" "}
          {formatTime(visit.schedule.endDateTime)}
        </p>
        {visit.schedule.meetingLink ? (
          <a
            className="text-sm underline-offset-4 hover:underline"
            href={visit.schedule.meetingLink}
          >
            Meeting link
          </a>
        ) : null}
      </section>
      <section className="rounded-lg border p-4">
        <h2 className="font-medium">Payment</h2>
        {payment ? (
          <div className="flex flex-col gap-1 text-sm">
            <p>
              {formatAmount(payment.amount)} {payment.currency} · {label(payment.status)}
            </p>
            {payment.paidAt ? <p>Paid {payment.paidAt}</p> : null}
            {payment.refundAmount != null ? (
              <p>
                Refunded {formatAmount(payment.refundAmount)} {payment.currency}
              </p>
            ) : null}
            {payment.refundReason ? <p>{payment.refundReason}</p> : null}
            {payment.refundedAt ? <p>Refunded {payment.refundedAt}</p> : null}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No payment.</p>
        )}
      </section>
    </div>
  );
}
