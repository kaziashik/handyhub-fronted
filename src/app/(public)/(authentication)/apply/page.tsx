import ApplyTechnicianForm from "@/components/form/apply-technician-form";
import Link from "next/link";

export default function ApplyPage() {
  return (
    <div className="flex min-h-svh flex-col gap-4 p-6 md:p-10">
      <div className="flex justify-center gap-2 md:justify-start">
        <Link href="/" className="font-medium">
          HandyHub
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <ApplyTechnicianForm />
      </div>
    </div>
  );
}
