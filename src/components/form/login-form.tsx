"use client";

import { GoogleLoginButton } from "@/components/auth/google-login-button";
import { getMe, googleLogin, login } from "@/api/auth.api";
import { meQueryKey } from "@/hooks/use-me";
import { pathAfterLogin } from "@/lib/role-redirect";
import { loginSchema } from "@/validation";
import { DemoLogin } from "@/components/auth/demo-login";
import { takeDemoAccount, type DemoAccount } from "@/lib/demo-accounts";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { Eye, EyeClosed, House } from "lucide-react";
import { useRouter } from "next/navigation";
import { FetchError } from "ofetch";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

function loginErrorMessage(error: unknown) {
  if (error instanceof FetchError) {
    const body = error.data as { message?: string } | undefined;
    return body?.message ?? "Login failed";
  }
  return "Login failed";
}

export default function LoginForm({ nextPath }: { nextPath?: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  const openSession = useCallback(async () => {
    const me = await queryClient.fetchQuery({
      queryKey: meQueryKey,
      queryFn: getMe,
      staleTime: 0,
    });
    const role = me?.data?.role;
    if (!role) {
      setErrorMessage("Signed in, but the profile could not be loaded.");
      return;
    }
    router.push(pathAfterLogin(role, nextPath));
  }, [nextPath, queryClient, router]);

  const signInWithGoogle = useCallback(
    async (idToken: string) => {
      setErrorMessage(null);
      setPending(true);
      try {
        await googleLogin({ idToken });
        await openSession();
      } catch (error) {
        setErrorMessage(loginErrorMessage(error));
      } finally {
        setPending(false);
      }
    },
    [openSession],
  );

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      setErrorMessage(null);
      setPending(true);
      try {
        await login(value);
        await openSession();
      } catch (error) {
        setErrorMessage(loginErrorMessage(error));
      } finally {
        setPending(false);
      }
    },
  });

  function fillDemoAccount(account: DemoAccount) {
    form.setFieldValue("email", account.email);
    form.setFieldValue("password", account.password);
    setSelectedDemo(account.id);
    setErrorMessage(null);
  }

  useEffect(() => {
    const account = takeDemoAccount();
    if (!account) return;
    fillDemoAccount(account);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="sr-only">Sign in</h1>
      <DemoLogin selectedId={selectedDemo} onSelect={fillDemoAccount} />

      <div className="flex items-center gap-3 text-xs tracking-[0.16em] text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        OR SIGN IN WITH EMAIL
        <span className="h-px flex-1 bg-border" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
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
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                    className="h-11 rounded-full px-4"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
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
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                      className="h-11 rounded-full px-4 pr-10"
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
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

          <p className="text-right text-sm">
            <Link href="/forgot-password" className="text-muted-foreground hover:text-foreground">
              Forgot password
            </Link>
          </p>
          {errorMessage ? (
            <p className="text-sm text-destructive">{errorMessage}</p>
          ) : null}
          <Button type="submit" disabled={pending} className="h-11 w-full rounded-full text-base">
            {pending ? "Signing in..." : "Sign in"}
          </Button>
        </FieldGroup>
      </form>

      <div className="flex items-center gap-3 text-xs tracking-[0.16em] text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        OR CONTINUE WITH
        <span className="h-px flex-1 bg-border" />
      </div>
      <GoogleLoginButton disabled={pending} onCredential={signInWithGoogle} />
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-primary">
          Sign up
        </Link>
      </p>
      <Link
        href="/"
        className="flex items-center justify-center gap-2 text-sm font-medium text-primary"
      >
        <House className="size-4" aria-hidden />
        Continue browsing without signing in
      </Link>
    </div>
  );
}
