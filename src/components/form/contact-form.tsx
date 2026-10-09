"use client";

import { sendContactMessage } from "@/api/user.api";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FetchError } from "ofetch";
import { FormEvent, useState } from "react";

function contactErrorMessage(error: unknown) {
  if (error instanceof FetchError) {
    const body = error.data as { message?: string } | undefined;
    return body?.message ?? "Could not send the message";
  }
  return "Could not send the message";
}

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setErrorMessage(null);
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const note = String(form.get("message") ?? "").trim();
    if (name.length < 3) {
      setErrorMessage("Name must be at least 3 characters.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Enter a valid email.");
      return;
    }
    if (note.length < 10) {
      setErrorMessage("Message must be at least 10 characters.");
      return;
    }

    setPending(true);
    try {
      const result = await sendContactMessage({ name, email, message: note });
      setMessage(result.message);
      event.currentTarget.reset();
    } catch (error) {
      setErrorMessage(contactErrorMessage(error));
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="flex max-w-lg flex-col gap-4" onSubmit={handleSubmit}>
      <Field>
        <FieldLabel htmlFor="contact-name">Name</FieldLabel>
        <Input id="contact-name" name="name" required />
      </Field>
      <Field>
        <FieldLabel htmlFor="contact-email">Email</FieldLabel>
        <Input id="contact-email" name="email" type="email" required />
      </Field>
      <Field>
        <FieldLabel htmlFor="contact-message">Message</FieldLabel>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          className="min-h-32 rounded-lg border bg-background px-3 py-2 text-sm"
        />
      </Field>
      {errorMessage ? <FieldError>{errorMessage}</FieldError> : null}
      {message ? <p className="text-sm text-primary">{message}</p> : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
