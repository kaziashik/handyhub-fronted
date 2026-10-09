import z from "zod";

export const applyTechnicianSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email address"),
  address: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || value.length >= 5,
      "Address must be at least 5 characters long",
    ),
  specialization: z.string().trim().min(2, "Specialization is required"),
  licenseNumber: z.string().trim().min(3, "License number is required"),
  qualifications: z.string().trim().min(2, "Qualifications are required"),
  experienceYears: z
    .string()
    .trim()
    .regex(/^\d+$/, "Experience years must be an integer"),
  bio: z.string().trim().max(1000, "Bio cannot exceed 1000 characters"),
  consultationFee: z
    .string()
    .trim()
    .refine((value) => {
      if (value === "") return true;
      const amount = Number(value);
      return Number.isFinite(amount) && amount >= 0;
    }, "Consultation fee cannot be negative"),
  contactNumber: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || value.length >= 5,
      "Contact number is invalid",
    ),
});
