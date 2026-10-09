"use client";

import { applyAsTechnician } from "@/api/technician.api";
import { serviceCatalog } from "@/content/services";
import { applyTechnicianSchema } from "@/validation";
import { useForm } from "@tanstack/react-form";
import {
  BadgeCheck,
  Banknote,
  Clock,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Paperclip,
  Phone,
  UserRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FetchError } from "ofetch";
import { useState, type ReactNode } from "react";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

const specialties = serviceCatalog.map((service) => service.specialization);

type ApplyValues = {
  name: string;
  email: string;
  address: string;
  specialization: string;
  licenseNumber: string;
  qualifications: string;
  experienceYears: string;
  bio: string;
  consultationFee: string;
  contactNumber: string;
};

type FieldName = keyof ApplyValues;

const sections: {
  title: string;
  detail: string;
  icon: LucideIcon;
  fields: {
    name: FieldName;
    label: string;
    placeholder: string;
    hint?: string;
    optional?: boolean;
    icon: LucideIcon;
    inputMode?: "email" | "numeric" | "tel" | "text";
    multiline?: boolean;
  }[];
}[] = [
  {
    title: "About you",
    detail: "We use this to create the account and reach you.",
    icon: UserRound,
    fields: [
      {
        name: "name",
        label: "Full name",
        placeholder: "Your name",
        icon: UserRound,
      },
      {
        name: "email",
        label: "Email",
        placeholder: "you@email.com",
        hint: "The verification code is sent here.",
        icon: Mail,
        inputMode: "email",
      },
      {
        name: "contactNumber",
        label: "Contact number",
        placeholder: "01XXXXXXXXX",
        optional: true,
        icon: Phone,
        inputMode: "tel",
      },
      {
        name: "address",
        label: "Work area",
        placeholder: "Area, city",
        optional: true,
        icon: MapPin,
      },
    ],
  },
  {
    title: "Your trade",
    detail: "An admin checks the license before you can publish hours.",
    icon: Wrench,
    fields: [
      {
        name: "specialization",
        label: "Specialization",
        placeholder: "Electrical, plumbing, house cleaning",
        icon: Wrench,
      },
      {
        name: "licenseNumber",
        label: "License number",
        placeholder: "Certificate or license number",
        icon: BadgeCheck,
      },
      {
        name: "qualifications",
        label: "Qualifications",
        placeholder: "Diploma, certificate, or degree",
        icon: GraduationCap,
      },
      {
        name: "experienceYears",
        label: "Years of experience",
        placeholder: "3",
        icon: Clock,
        inputMode: "numeric",
      },
    ],
  },
  {
    title: "What customers see",
    detail: "These appear on your public profile after approval.",
    icon: Banknote,
    fields: [
      {
        name: "consultationFee",
        label: "Visit fee",
        placeholder: "500",
        hint: "Amount in taka. Leave blank if you will set it later.",
        optional: true,
        icon: Banknote,
        inputMode: "numeric",
      },
      {
        name: "bio",
        label: "Short bio",
        placeholder: "What kind of visits you take, and where you work.",
        optional: true,
        icon: UserRound,
        multiline: true,
      },
    ],
  },
];

const steps = [
  "Add your name, trade, and license.",
  "Attach a resume. Extra photos are optional.",
  "Confirm the email code, then wait for approval.",
];

function applyErrorMessage(error: unknown) {
  if (error instanceof FetchError) {
    const body = error.data as { message?: string } | undefined;
    return body?.message ?? "Could not submit the application";
  }
  return "Could not submit the application";
}

function readyCount(values: ApplyValues, resume: File | null) {
  const checks = [
    values.name.trim().length >= 2,
    values.email.includes("@"),
    values.specialization.trim().length >= 2,
    values.licenseNumber.trim().length >= 3,
    values.qualifications.trim().length >= 2,
    /^\d+$/.test(values.experienceYears.trim()),
    Boolean(resume),
  ];
  return checks.filter(Boolean).length;
}

export default function ApplyTechnicianForm() {
  const [resume, setResume] = useState<File | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const [fileMessage, setFileMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

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
    } satisfies ApplyValues,
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
      const email = value.email.trim().toLowerCase();
      try {
        await applyAsTechnician(body);
        router.push(`/apply/verify?email=${encodeURIComponent(email)}`);
      } catch (error) {
        setErrorMessage(applyErrorMessage(error));
      } finally {
        setPending(false);
      }
    },
  });

  return (
    <div className="animate-rise grid w-full gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <aside className="overflow-hidden rounded-2xl border bg-slate-950 text-white">
        <img
          src="/images/hero.jpg"
          alt="Woman technician in a hard hat and safety vest"
          className="h-44 w-full object-cover object-[center_22%] lg:h-52"
        />
        <div className="flex flex-col gap-4 p-5">
          <p className="text-sm font-medium text-sky-200">HandyHub</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Apply to work as a technician
          </h1>
          <p className="text-sm leading-6 text-slate-200">
            Share your license and resume. After the email code is confirmed, an admin reviews the application.
          </p>
          <ol className="flex flex-col gap-3">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm leading-6">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </aside>

      <form
        className="flex flex-col gap-6 rounded-2xl border bg-background p-5 shadow-sm md:p-8"
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Subscribe selector={(state) => state.values}>
          {(values) => {
            const ready = readyCount(values, resume);
            return (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <p className="font-medium">Required details</p>
                  <p className="text-muted-foreground">{ready} of 7 ready</p>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${(ready / 7) * 100}%` }}
                  />
                </div>
              </div>
            );
          }}
        </form.Subscribe>

        {sections.map((section) => (
          <section key={section.title} className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <section.icon className="size-4" aria-hidden />
              </span>
              <div>
                <h2 className="font-medium">{section.title}</h2>
                <p className="text-sm text-muted-foreground">{section.detail}</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {section.fields.map((item) => (
                <form.Field key={item.name} name={item.name}>
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    const control = item.multiline ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        placeholder={item.placeholder}
                        rows={4}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                        aria-invalid={isInvalid}
                        className="min-h-28 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
                      />
                    ) : (
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        placeholder={item.placeholder}
                        inputMode={item.inputMode}
                        className="h-10 px-3"
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                        aria-invalid={isInvalid}
                      />
                    );
                    return (
                      <Field
                        data-invalid={isInvalid}
                        className={item.multiline ? "md:col-span-2" : undefined}
                      >
                        <FieldLabel htmlFor={field.name} className="flex items-center gap-2">
                          <item.icon className="size-3.5 text-muted-foreground" aria-hidden />
                          {item.label}
                          {item.optional ? (
                            <span className="font-normal text-muted-foreground">Optional</span>
                          ) : null}
                        </FieldLabel>
                        {control}
                        {item.name === "specialization" ? (
                          <div className="flex flex-wrap gap-2">
                            {specialties.map((specialty) => (
                              <button
                                key={specialty}
                                type="button"
                                className={
                                  field.state.value === specialty
                                    ? "rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground"
                                    : "rounded-full border px-3 py-1 text-xs transition hover:border-primary hover:text-primary"
                                }
                                onClick={() => field.handleChange(specialty)}
                              >
                                {specialty}
                              </button>
                            ))}
                          </div>
                        ) : null}
                        {item.hint ? (
                          <p className="text-xs text-muted-foreground">{item.hint}</p>
                        ) : null}
                        {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                      </Field>
                    );
                  }}
                </form.Field>
              ))}
            </div>
          </section>
        ))}

        <section className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText className="size-4" aria-hidden />
            </span>
            <div>
              <h2 className="font-medium">Documents</h2>
              <p className="text-sm text-muted-foreground">
                A resume is required. Extra files can be certificates or work photos.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <FilePicker
              id="resume"
              icon={<FileText className="size-4" aria-hidden />}
              label="Resume"
              hint={resume ? resume.name : "PDF, image, or document"}
              filled={Boolean(resume)}
              onChange={(files) => setResume(files[0] ?? null)}
            />
            <FilePicker
              id="additionalFiles"
              icon={<Paperclip className="size-4" aria-hidden />}
              label="Extra files"
              hint={
                additionalFiles.length
                  ? `${additionalFiles.length} file${additionalFiles.length === 1 ? "" : "s"} selected`
                  : "Optional, up to 10"
              }
              filled={additionalFiles.length > 0}
              multiple
              onChange={(files) => setAdditionalFiles(files.slice(0, 10))}
            />
          </div>
          {additionalFiles.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {additionalFiles.map((file) => (
                <li key={`${file.name}-${file.size}`} className="rounded-full bg-muted px-3 py-1 text-xs">
                  {file.name}
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        {fileMessage ? <p className="text-sm text-destructive">{fileMessage}</p> : null}
        {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/login" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Back to login
          </Link>
          <Button type="submit" disabled={pending} className="h-10 px-6">
            {pending ? "Sending application..." : "Submit application"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function FilePicker({
  id,
  icon,
  label,
  hint,
  filled,
  multiple,
  onChange,
}: {
  id: string;
  icon: ReactNode;
  label: string;
  hint: string;
  filled: boolean;
  multiple?: boolean;
  onChange: (files: File[]) => void;
}) {
  return (
    <label
      htmlFor={id}
      className={
        filled
          ? "flex cursor-pointer flex-col gap-1 rounded-xl border border-primary bg-primary/5 p-4 transition"
          : "flex cursor-pointer flex-col gap-1 rounded-xl border border-dashed p-4 transition hover:-translate-y-0.5 hover:border-primary hover:bg-muted/40"
      }
    >
      <span className="flex items-center gap-2 text-sm font-medium">
        {icon}
        {label}
      </span>
      <span className="truncate text-xs text-muted-foreground">{hint}</span>
      <input
        id={id}
        name={id}
        type="file"
        multiple={multiple}
        className="sr-only"
        onChange={(event) => onChange([...(event.target.files ?? [])])}
      />
    </label>
  );
}
