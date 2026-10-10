"use client";

import { registerUser } from "@/api/auth.api";
import { DemoLogin } from "@/components/auth/demo-login";
import { rememberDemoAccount } from "@/lib/demo-accounts";
import { registerSchema } from "@/validation";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeClosed, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FetchError } from "ofetch";
import { useEffect, useState } from "react";
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
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  function choosePhoto(file: File | null) {
    if (!file) {
      setPhoto(null);
      setPhotoPreview(null);
      setPhotoError(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setPhotoError("Choose an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("Photo must be 2MB or smaller.");
      return;
    }
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
    setPhotoError(null);
  }

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
      if (photoError) return;
      setErrorMessage(null);
      setPending(true);
      const phone = value.phone.trim();
      try {
        await registerUser(
          {
            name: value.name.trim(),
            email: value.email.trim(),
            password: value.password,
            role: "CUSTOMER",
            ...(phone ? { phone } : {}),
          },
          photo,
        );
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
          <div className="flex items-center gap-4">
            <label className="relative flex size-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border bg-muted">
              {photoPreview ? (
                <img src={photoPreview} alt="" className="size-full object-cover" />
              ) : (
                <UserRound className="size-8 text-muted-foreground" aria-hidden />
              )}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(event) => choosePhoto(event.target.files?.[0] ?? null)}
              />
            </label>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">Profile photo</p>
              <p className="text-xs text-muted-foreground">
                Optional. JPG or PNG, up to 2MB.
              </p>
              {photo ? (
                <button
                  type="button"
                  className="w-fit text-xs font-medium text-primary"
                  onClick={() => choosePhoto(null)}
                >
                  Remove photo
                </button>
              ) : null}
              {photoError ? (
                <p className="text-xs text-destructive">{photoError}</p>
              ) : null}
            </div>
          </div>
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
                    className="h-11 rounded-full px-4"
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
                    className="h-11 rounded-full px-4"
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
                  className="h-11 rounded-full px-4"
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
                      className="h-11 rounded-full px-4 pr-10"
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
                  <p className="text-xs text-muted-foreground">
                    At least 8 characters, with an uppercase letter, a lowercase letter, a number, and a symbol.
                  </p>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {errorMessage ? (
            <p className="text-sm text-destructive">{errorMessage}</p>
          ) : null}
          <Button type="submit" disabled={pending} className="h-11 w-full rounded-full text-base">
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
