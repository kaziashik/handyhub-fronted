import ForgotPasswordForm from "@/components/form/forgot-password-form";
import { BrandLink } from "@/components/layout/brand-link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-svh flex-col gap-4 p-6 md:p-10">
      <div className="flex justify-center gap-2 md:justify-start">
        <BrandLink />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
