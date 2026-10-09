import { TechnicianDetail } from "@/components/modules/technicians/technician-detail";

export default async function TechnicianDetailPage({
  params,
}: {
  params: Promise<{ techinicianId: string }>;
}) {
  const { techinicianId } = await params;
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      <TechnicianDetail techinicianId={techinicianId} />
    </div>
  );
}
