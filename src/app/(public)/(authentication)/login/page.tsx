import LoginForm from "@/components/form/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <div className="flex flex-1 flex-col bg-muted/40 px-4 py-8">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border bg-background p-5 shadow-sm md:p-7">
          <LoginForm nextPath={next} />
        </div>
      </div>
    </div>
  );
}
