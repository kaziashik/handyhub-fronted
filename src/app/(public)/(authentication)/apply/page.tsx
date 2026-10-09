import ApplyTechnicianForm from "@/components/form/apply-technician-form";
import Link from "next/link";

export default function ApplyPage() {
  return (
    <div className="min-h-svh bg-muted/30">
      <div className="mx-auto flex min-h-svh w-full max-w-6xl flex-col gap-6 px-4 py-6 md:px-8 md:py-10">
        <Link href="/" className="w-fit font-medium">
          HandyHub
        </Link>
        <ApplyTechnicianForm />
      </div>
    </div>
  );
}
