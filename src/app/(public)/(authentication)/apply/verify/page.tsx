import VerifyTechnicianForm from "@/components/form/verify-technician-form";

export default async function VerifyTechnicianPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <div className="flex flex-1 items-center justify-center p-6 md:p-10">
      <VerifyTechnicianForm email={email ?? ""} />
    </div>
  );
}
