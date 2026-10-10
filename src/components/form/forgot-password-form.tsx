"use client";

import { forgotPassword } from "@/api/auth.api";
import { toast, toastError } from "@/lib/toast";
import { forgotPasswordSchema } from "@/validation";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { FetchError } from "ofetch";
import { useState } from "react";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

function forgotPasswordErrorMessage(error: unknown) {
  if (error instanceof FetchError) {
    const body = error.data as { message?: string } | undefined;
    return body?.message ?? "Could not send the code";
  }
  return "Could not send the code";
}

export default function ForgotPasswordForm() {
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: forgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      setErrorMessage(null);
      setSentTo(null);
      setPending(true);
      const email = value.email.trim().toLowerCase();
      try {
        await forgotPassword({ email });
        setSentTo(email);
        toast.success("Reset code sent. Check your email.");
      } catch (error) {
        setErrorMessage(toastError(forgotPasswordErrorMessage(error)));
      } finally {
        setPending(false);
      }
    },
  });

  return (
    <div className="flex w-full max-w-xs flex-col gap-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Forgot password</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email and we will send a 6-digit code.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
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
                    onChange={(event) => field.handleChange(event.target.value)}
                    autoComplete="email"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {sentTo ? (
            <p className="text-sm">
              A 6-digit code was sent to {sentTo}.{" "}
              <Link
                href={`/reset-password?email=${encodeURIComponent(sentTo)}`}
                className="underline"
              >
                Reset password
              </Link>
            </p>
          ) : null}
          {errorMessage ? (
            <p className="text-sm text-destructive">{errorMessage}</p>
          ) : null}
          <Button type="submit" disabled={pending}>
            {pending ? "Sending..." : "Send code"}
          </Button>
        </FieldGroup>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}
