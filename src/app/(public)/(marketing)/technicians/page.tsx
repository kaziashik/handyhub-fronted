import { PageTitle } from "@/components/modules/page-title";
import { TechnicianSection } from "@/components/modules/technicians/technician-section";

export default function TechniciansPage() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <PageTitle title="Technicians" detail="People customers can book today." />
      <TechnicianSection />
    </div>
  );
}
