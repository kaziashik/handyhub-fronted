"use client";

import { registerUser } from "@/api/auth.api";
import { DemoLogin } from "@/components/auth/demo-login";
import { rememberDemoAccount } from "@/lib/demo-accounts";
import { registerSchema } from "@/validation";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FetchError } from "ofetch";
import { useState } from "react";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

function registerErrorMessage(error: unknown) {
  if (error instanceof FetchError) {
    const body = error.data as { message?: string } | undefined;
    return body?.message ?? "Registration failed";
  }
  return "Registration failed";
}

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      setErrorMessage(null);
      setPending(true);
      const phone = value.phone.trim();
      try {
        await registerUser({
          name: value.name.trim(),
          email: value.email.trim(),
          password: value.password,
          role: "CUSTOMER",
          ...(phone ? { phone } : {}),
        });
        router.push(
          `/account-verify?email=${encodeURIComponent(value.email.trim())}`,
        );
      } catch (error) {
        setErrorMessage(registerErrorMessage(error));
      } finally {
        setPending(false);
      }
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Register as a customer. We will email you a verification code.
        </p>
      </div>

      <DemoLogin
        selectedId={selectedDemo}
        onSelect={(account) => {
          setSelectedDemo(account.id);
          rememberDemoAccount(account.id);
          router.push("/login");
        }}
      />

      <div className="flex items-center gap-3 text-xs tracking-wide text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        OR CREATE AN ACCOUNT
        <span className="h-px flex-1 bg-border" />
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

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
                    autoComplete="off"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="phone">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      autoComplete="new-password"
                      aria-invalid={isInvalid}
                    />
                    <button
                      className="absolute top-1/2 right-3 -translate-y-1/2"
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                    >
                      {showPassword ? (
                        <EyeClosed className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {errorMessage ? (
            <p className="text-sm text-destructive">{errorMessage}</p>
          ) : null}
          <Button type="submit" disabled={pending}>
            {pending ? "Creating account..." : "Register"}
          </Button>
        </FieldGroup>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Login
        </Link>
      </p>
    </div>
  );
}
