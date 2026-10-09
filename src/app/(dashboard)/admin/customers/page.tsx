import { CustomerList } from "@/components/modules/admin/customer-list";
import { PageTitle } from "@/components/modules/page-title";
import { Suspense } from "react";

export default function AdminCustomersPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageTitle title="Customers" detail="Search and page through customer accounts." />
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading customers...</p>}>
        <CustomerList />
      </Suspense>
    </div>
  );
}
