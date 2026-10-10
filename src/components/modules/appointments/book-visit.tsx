"use client";

import { bookAppointment } from "@/api/appointment.api";
import { Button } from "@/components/ui/button";
import { toastError } from "@/lib/toast";
import { FetchError } from "ofetch";
import { useState } from "react";

function bookErrorMessage(error: unknown) {
  if (error instanceof FetchError) {
    const body = error.data as { message?: string } | undefined;
    return body?.message ?? "Could not start payment";
  }
  return "Could not start payment";
}

export function BookVisit({ scheduleId }: { scheduleId: string }) {
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleBook() {
    setErrorMessage(null);
    setPending(true);
    try {
      const result = await bookAppointment({ scheduleId });
      const paymentUrl = result.data?.paymentUrl;
      if (!paymentUrl) {
        setErrorMessage("Payment link was not returned");
        setPending(false);
        return;
      }
      window.location.assign(paymentUrl);
    } catch (error) {
      setErrorMessage(toastError(bookErrorMessage(error)));
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-3">
      {errorMessage ? (
        <p className="text-sm text-destructive">{errorMessage}</p>
      ) : null}
      <Button type="button" disabled={pending} onClick={handleBook}>
        {pending ? "Opening payment..." : "Continue to bKash"}
      </Button>
    </div>
  );
}
