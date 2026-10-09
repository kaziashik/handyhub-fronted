import { MyAppointments } from "@/components/modules/appointments/my-appointments";
import { PageTitle } from "@/components/modules/page-title";
import { Suspense } from "react";

function paymentReturnMessage(status?: string, error?: string) {
  if (status === "success") {
    return "Payment completed. This appointment is confirmed.";
  }
  if (status === "failure") {
    return "Payment failed. You can try again from a pending appointment.";
  }
  if (status === "cancel") {
    return "Payment was cancelled. You can try again from a pending appointment.";
  }
  if (error === "payment-failed") {
    return "Payment could not be completed.";
  }
  return null;
}

export default async function DashboardMyAppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; error?: string }>;
}) {
  const { status, error } = await searchParams;
  const message = paymentReturnMessage(status, error);

  return (
    <div className="flex flex-col gap-4">
      <PageTitle
        title="Appointments"
        detail="Visits you have booked, paid, or cancelled."
      />
      {message ? (
        <p
          className={
            status === "success"
              ? "text-sm"
              : "text-sm text-destructive"
          }
        >
          {message}
        </p>
      ) : null}
      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">Loading appointments...</p>
        }
      >
        <MyAppointments />
      </Suspense>
    </div>
  );
}
