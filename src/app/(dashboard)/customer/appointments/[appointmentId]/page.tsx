import { AppointmentDetailView } from "@/components/modules/appointments/appointment-detail";
import { PageTitle } from "@/components/modules/page-title";

export default async function CustomerAppointmentDetailPage({
  params,
}: {
  params: Promise<{ appointmentId: string }>;
}) {
  const { appointmentId } = await params;

  return (
    <div className="flex flex-col gap-4">
      <PageTitle
        title="Appointment"
        detail="Schedule, technician, payment, and status."
      />
      <AppointmentDetailView appointmentId={appointmentId} />
    </div>
  );
}
