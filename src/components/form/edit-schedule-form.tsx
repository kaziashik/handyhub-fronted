"use client";

import { updateSchedule } from "@/api/schedule.api";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { TechnicianSchedule } from "@/types";
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

function toDateTimeLocal(value: string) {
  const date = new Date(value);
  const pad = (part: number) => String(part).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function editErrorMessage(error: unknown) {
  if (error instanceof FetchError) {
    const body = error.data as { message?: string } | undefined;
    return body?.message ?? "Could not update the schedule";
  }
  return "Could not update the schedule";
}

export function EditScheduleForm({
  schedule,
  onClose,
}: {
  schedule: TechnicianSchedule;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      startDateTime: toDateTimeLocal(schedule.startDateTime),
      endDateTime: toDateTimeLocal(schedule.endDateTime),
      meetingLink: schedule.meetingLink,
    },
    validators: {
      onSubmit: createScheduleSchema,
    },
    onSubmit: async ({ value }) => {
      setErrorMessage(null);
      setPending(true);
      try {
        await updateSchedule(schedule.id, {
          startDateTime: new Date(value.startDateTime).toISOString(),
          endDateTime: new Date(value.endDateTime).toISOString(),
          meetingLink: value.meetingLink.trim(),
        });
        await queryClient.invalidateQueries({ queryKey: ["my-schedules"] });
        await queryClient.invalidateQueries({
          queryKey: ["technician-analytics"],
        });
        onClose();
      } catch (error) {
        setErrorMessage(editErrorMessage(error));
        setPending(false);
      }
    },
  });

  return (
    <form
      className="mt-3 flex max-w-sm flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        {fields.map((item) => (
          <form.Field key={item.name} name={item.name}>
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={`${schedule.id}-${field.name}`}>
                    {item.label}
                  </FieldLabel>
                  <Input
                    id={`${schedule.id}-${field.name}`}
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
      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save"}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={pending}
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </form>
  );
}
