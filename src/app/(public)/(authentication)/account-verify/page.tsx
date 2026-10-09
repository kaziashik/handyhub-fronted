import VerifyEmailForm from "@/components/form/verify-email-form";

export default async function AccountVerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <VerifyEmailForm email={email ?? ""} />
    </div>
  );
}
