import VerifyTechnicianForm from "@/components/form/verify-technician-form";
import { BrandLink } from "@/components/layout/brand-link";

export default async function VerifyTechnicianPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <div className="flex min-h-svh flex-col gap-4 p-6 md:p-10">
      <div className="flex justify-center gap-2 md:justify-start">
        <BrandLink />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <VerifyTechnicianForm email={email ?? ""} />
      </div>
    </div>
  );
}
