"use client";

import { sendContactMessage } from "@/api/user.api";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/lib/toast";
import { CircleCheck, CircleAlert } from "lucide-react";
import { FetchError } from "ofetch";
import { FormEvent, useState } from "react";

type Status = { kind: "success" | "error"; text: string };

function contactErrorMessage(error: unknown) {
  if (error instanceof FetchError) {
    const body = error.data as { message?: string } | undefined;
    return body?.message ?? "Could not send the message";
  }
  return "Could not send the message";
}

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus(null);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const note = String(data.get("message") ?? "").trim();
    if (name.length < 3) {
      setStatus({ kind: "error", text: "Name must be at least 3 characters." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ kind: "error", text: "Enter a valid email." });
      return;
    }
    if (note.length < 10) {
      setStatus({ kind: "error", text: "Message must be at least 10 characters." });
      return;
    }

    setPending(true);
    try {
      const result = await sendContactMessage({ name, email, message: note });
      form.reset();
      toast.success("Message sent. We will reply by email.");
      setStatus({
        kind: "success",
        text: result.message || "Message sent. We will reply by email.",
      });
    } catch (error) {
      setStatus({ kind: "error", text: contactErrorMessage(error) });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Field>
        <FieldLabel htmlFor="contact-name">Name</FieldLabel>
        <Input id="contact-name" name="name" required className="h-10" autoComplete="name" />
      </Field>
      <Field>
        <FieldLabel htmlFor="contact-email">Email</FieldLabel>
        <Input
          id="contact-email"
          name="email"
          type="email"
          required
          className="h-10"
          autoComplete="email"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="contact-message">Message</FieldLabel>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          placeholder="Tell us what you need help with."
          className="min-h-36 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
        />
      </Field>
      {status ? (
        <p
          className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-sm ${
            status.kind === "success"
              ? "border-primary/30 bg-primary/10 text-primary"
              : "border-destructive/30 bg-destructive/10 text-destructive"
          }`}
          role={status.kind === "error" ? "alert" : "status"}
        >
          {status.kind === "success" ? (
            <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
          ) : (
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          )}
          {status.text}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} className="h-10">
        {pending ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
