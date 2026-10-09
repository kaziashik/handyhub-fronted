export default async function AccountVerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex max-w-sm flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Verify your email</h1>
        <p className="text-sm text-muted-foreground">
          {email
            ? `Enter the code sent to ${email}.`
            : "Enter the code sent to your email."}
        </p>
      </div>
    </div>
  );
}
