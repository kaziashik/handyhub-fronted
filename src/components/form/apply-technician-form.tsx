"use client";

import { applyAsTechnician } from "@/api/technician.api";
import { applyTechnicianSchema } from "@/validation";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { FetchError } from "ofetch";
import { useState } from "react";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

const textFields = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "specialization", label: "Specialization", type: "text" },
  { name: "licenseNumber", label: "License number", type: "text" },
  { name: "qualifications", label: "Qualifications", type: "text" },
  { name: "experienceYears", label: "Years of experience", type: "text" },
  { name: "consultationFee", label: "Consultation fee", type: "text" },
  { name: "contactNumber", label: "Contact number", type: "text" },
  { name: "address", label: "Address", type: "text" },
  { name: "bio", label: "Bio", type: "text" },
] as const;

function applyErrorMessage(error: unknown) {
  if (error instanceof FetchError) {
    const body = error.data as { message?: string } | undefined;
    return body?.message ?? "Could not submit the application";
  }
  return "Could not submit the application";
}

export default function ApplyTechnicianForm() {
  const [resume, setResume] = useState<File | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const [fileMessage, setFileMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      address: "",
      specialization: "",
      licenseNumber: "",
      qualifications: "",
      experienceYears: "",
      bio: "",
      consultationFee: "",
      contactNumber: "",
    },
    validators: {
      onSubmit: applyTechnicianSchema,
    },
    onSubmit: async ({ value }) => {
      setErrorMessage(null);
      setFileMessage(null);
      if (!resume) {
        setFileMessage("Resume is required");
        return;
      }
      if (additionalFiles.length > 10) {
        setFileMessage("You can attach up to 10 extra files");
        return;
      }

      const technician: Record<string, string | number> = {
        specialization: value.specialization.trim(),
        licenseNumber: value.licenseNumber.trim(),
        qualifications: value.qualifications.trim(),
        experienceYears: Number(value.experienceYears),
      };
      const address = value.address.trim();
      const bio = value.bio.trim();
      const contactNumber = value.contactNumber.trim();
      const consultationFee = value.consultationFee.trim();
      if (address) technician.address = address;
      if (bio) technician.bio = bio;
      if (contactNumber) technician.contactNumber = contactNumber;
      if (consultationFee) technician.consultationFee = Number(consultationFee);

      const body = new FormData();
      body.append(
        "data",
        JSON.stringify({
          user: {
            name: value.name.trim(),
            email: value.email.trim().toLowerCase(),
          },
          technician,
        }),
      );
      body.append("resume", resume);
      for (const file of additionalFiles) {
        body.append("additionalFiles", file);
      }

      setPending(true);
      try {
        await applyAsTechnician(body);
        setSentTo(value.email.trim().toLowerCase());
      } catch (error) {
        setErrorMessage(applyErrorMessage(error));
      } finally {
        setPending(false);
      }
    },
  });

  if (sentTo) {
    return (
      <div className="flex w-full max-w-md flex-col gap-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Application sent</h1>
        <p className="text-sm text-muted-foreground">
          A verification code was sent to {sentTo}.
        </p>
        <Link href="/" className="text-sm underline">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Apply as a technician
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Send your profile, a resume, and any extra files.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          {textFields.map((item) => (
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
          ))}

          <Field>
            <FieldLabel htmlFor="resume">Resume</FieldLabel>
            <Input
              id="resume"
              name="resume"
              type="file"
              onChange={(event) =>
                setResume(event.target.files?.[0] ?? null)
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="additionalFiles">
              Extra files (up to 10)
            </FieldLabel>
            <Input
              id="additionalFiles"
              name="additionalFiles"
              type="file"
              multiple
              onChange={(event) =>
                setAdditionalFiles(
                  [...(event.target.files ?? [])].slice(0, 10),
                )
              }
            />
          </Field>

          {fileMessage ? (
            <p className="text-sm text-destructive">{fileMessage}</p>
          ) : null}
          {errorMessage ? (
            <p className="text-sm text-destructive">{errorMessage}</p>
          ) : null}
          <Button type="submit" disabled={pending}>
            {pending ? "Sending..." : "Submit application"}
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
