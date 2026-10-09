import ResetPasswordForm from "@/components/form/reset-password-form";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <div className="flex flex-1 items-center justify-center p-6 md:p-10">
      <ResetPasswordForm email={email ?? ""} />
    </div>
  );
}
