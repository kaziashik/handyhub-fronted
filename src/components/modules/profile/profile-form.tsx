"use client";

import { updateProfile } from "@/api/user.api";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { meQueryKey, useMe } from "@/hooks/use-me";
import { useQueryClient } from "@tanstack/react-query";
import { FetchError } from "ofetch";
import { FormEvent, useEffect, useState } from "react";

function profileErrorMessage(error: unknown) {
  if (error instanceof FetchError) {
    const body = error.data as { message?: string } | undefined;
    return body?.message ?? "Could not update the profile";
  }
  return "Could not update the profile";
}

export function ProfileForm() {
  const queryClient = useQueryClient();
  const { data } = useMe();
  const user = data?.data;
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setPhone(user.phone ?? "");
  }, [user]);

  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setErrorMessage(null);
    const nextName = name.trim();
    const nextPhone = phone.trim();
    if (nextName.length < 3) {
      setErrorMessage("Name must be at least 3 characters.");
      return;
    }
    if (nextPhone && !/^\d{11}$/.test(nextPhone)) {
      setErrorMessage("Phone must be 11 digits.");
      return;
    }

    setPending(true);
    try {
      await updateProfile({ name: nextName, phone: nextPhone });
      await queryClient.invalidateQueries({ queryKey: meQueryKey });
      setMessage("Profile updated.");
    } catch (error) {
      setErrorMessage(profileErrorMessage(error));
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
      <Field>
        <FieldLabel htmlFor="profile-name">Name</FieldLabel>
        <Input id="profile-name" value={name} onChange={(event) => setName(event.target.value)} required />
      </Field>
      <Field>
        <FieldLabel htmlFor="profile-phone">Phone</FieldLabel>
        <Input
          id="profile-phone"
          value={phone}
          inputMode="numeric"
          onChange={(event) => setPhone(event.target.value)}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="profile-email">Email</FieldLabel>
        <Input id="profile-email" value={user?.email ?? ""} readOnly />
      </Field>
      {errorMessage ? <FieldError>{errorMessage}</FieldError> : null}
      {message ? <p className="text-sm text-primary">{message}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save profile"}
      </Button>
    </form>
  );
}
