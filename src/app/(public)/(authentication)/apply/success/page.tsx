import Link from "next/link";

export default function ApplicationSuccessPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Application received
        </h1>
        <p className="text-sm text-muted-foreground">
          Wait for an admin to approve your application. After it is
          approved, use Forgot password to set a password, then log in.
        </p>
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/forgot-password" className="underline">
            Forgot password
          </Link>
          <Link href="/login" className="underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
