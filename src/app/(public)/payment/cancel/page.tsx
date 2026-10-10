import { PaymentResult } from "@/components/modules/payments/payment-result";

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; error?: string }>;
}) {
  const { status, error } = await searchParams;
  const failed = status === "failure" || error === "payment-failed";

  return (
    <PaymentResult
      tone="error"
      title={failed ? "Payment failed" : "Payment cancelled"}
      detail={
        failed
          ? "bKash did not confirm the payment. The visit stays pending, and you can try again from Appointments."
          : "The bKash checkout was cancelled. The visit stays pending, and you can pay again from Appointments."
      }
    />
  );
}
