"use client";

import { verifyTechnicianEmail } from "@/api/technician.api";
import { toast, toastError } from "@/lib/toast";
import { verifyEmailSchema } from "@/validation";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { FetchError } from "ofetch";
import { useState } from "react";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

function verifyErrorMessage(error: unknown) {
  if (error instanceof FetchError) {
    const body = error.data as { message?: string } | undefined;
    return body?.message ?? "Verification failed";
  }
  return "Verification failed";
}

export default function VerifyTechnicianForm({ email }: { email: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email,
      otp: "",
    },
    validators: {
      onSubmit: verifyEmailSchema,
    },
    onSubmit: async ({ value }) => {
      setErrorMessage(null);
      setPending(true);
      try {
        await verifyTechnicianEmail({
          email: value.email.trim().toLowerCase(),
          otp: value.otp,
        });
        toast.success("Email verified. Your application is with the admin.");
        router.push("/apply/success");
      } catch (error) {
        setErrorMessage(toastError(verifyErrorMessage(error)));
      } finally {
        setPending(false);
      }
    },
  });

  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Verify your email</h1>
        <p className="text-balance text-sm text-muted-foreground">
          {email
            ? `Enter the 6-digit code sent to ${email}. An admin can review the application after this.`
            : "Enter the 6-digit code sent to your email."}
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          {email ? null : (
            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          )}

          <form.Field name="otp">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Verification code</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                      field.handleChange(
                        event.target.value.replace(/\D/g, "").slice(0, 6),
                      )
                    }
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {errorMessage ? (
            <p className="text-sm text-destructive">{errorMessage}</p>
          ) : null}
          <Button type="submit" disabled={pending}>
            {pending ? "Verifying..." : "Verify"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
