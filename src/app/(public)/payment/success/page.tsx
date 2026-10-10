import { PaymentResult } from "@/components/modules/payments/payment-result";

export default function PaymentSuccessPage() {
  return (
    <PaymentResult
      tone="success"
      title="Payment successful"
      detail="This appointment is confirmed. You can see the visit, time, and meeting link in Appointments."
    />
  );
}
