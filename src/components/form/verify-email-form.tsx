"use client";

import { verifyEmail } from "@/api/auth.api";
import { meQueryKey } from "@/hooks/use-me";
import { dashboardPath } from "@/lib/role-redirect";
import { toast } from "@/lib/toast";
import { verifyEmailSchema } from "@/validation";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
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

export default function VerifyEmailForm({ email }: { email: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
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
        const result = await verifyEmail({
          email: value.email.trim(),
          otp: value.otp,
        });
        const user = result.data?.user;
        if (user) {
          queryClient.setQueryData(meQueryKey, {
            success: true,
            message: "Email verified successfully",
            data: user,
          });
        }
        toast.success("Email verified. Your account is ready.");
        router.push(user?.role ? dashboardPath(user.role) : "/customer");
      } catch (error) {
        setErrorMessage(verifyErrorMessage(error));
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
            ? `Enter the 6-digit code sent to ${email}.`
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
