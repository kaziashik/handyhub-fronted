import { AdminOverview } from "@/components/modules/analytics/admin-overview";
import { PageTitle } from "@/components/modules/page-title";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageTitle
        title="Overview"
        detail="Technicians, customers, appointments, revenue, and refunds."
      />
      <AdminOverview />
    </div>
  );
}
