"use client";

import { createSchedule } from "@/api/schedule.api";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast, toastError } from "@/lib/toast";
import { createScheduleSchema } from "@/validation";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { FetchError } from "ofetch";
import { useState } from "react";

const fields = [
  { name: "startDateTime", label: "Start", type: "datetime-local" },
  { name: "endDateTime", label: "End", type: "datetime-local" },
  { name: "meetingLink", label: "Meeting link", type: "url" },
] as const;

function createErrorMessage(error: unknown) {
  if (error instanceof FetchError) {
    const body = error.data as { message?: string } | undefined;
    return body?.message ?? "Could not create the schedule";
  }
  return "Could not create the schedule";
}

export function CreateScheduleForm() {
  const queryClient = useQueryClient();
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      startDateTime: "",
      endDateTime: "",
      meetingLink: "",
    },
    validators: {
      onSubmit: createScheduleSchema,
    },
    onSubmit: async ({ value }) => {
      setErrorMessage(null);
      setPending(true);
      try {
        await createSchedule({
          startDateTime: new Date(value.startDateTime).toISOString(),
          endDateTime: new Date(value.endDateTime).toISOString(),
          meetingLink: value.meetingLink.trim(),
        });
        await queryClient.invalidateQueries({ queryKey: ["my-schedules"] });
        await queryClient.invalidateQueries({ queryKey: ["technician-analytics"] });
        form.reset();
        toast.success("Schedule created successfully");
      } catch (error) {
        setErrorMessage(toastError(createErrorMessage(error)));
      } finally {
        setPending(false);
      }
    },
  });

  return (
    <form
      className="flex max-w-sm flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
    >
      <h2 className="font-medium">New schedule</h2>
      <FieldGroup>
        {fields.map((item) => (
          <form.Field key={item.name} name={item.name}>
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>{item.label}</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={item.type}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={isInvalid}
                    disabled={pending}
                  />
                  {isInvalid ? (
                    <FieldError errors={field.state.meta.errors} />
                  ) : null}
                </Field>
              );
            }}
          </form.Field>
        ))}
      </FieldGroup>
      {errorMessage ? (
        <p className="text-sm text-destructive">{errorMessage}</p>
      ) : null}
      <Button type="submit" className="w-fit" disabled={pending}>
        {pending ? "Creating..." : "Create schedule"}
      </Button>
    </form>
  );
}
