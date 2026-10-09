import z from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password Must Minimum 8 Characters Long.")
  .regex(/[a-z]/, "Password must contain at least 1 Lowercase Letter")
  .regex(/[A-Z]/, "Password must contain at least 1 Uppercase Letter")
  .regex(/[0-9]/, "Password must contain at least 1 Number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least 1 Special Character",
  );

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z.email(),
  password: passwordSchema,
  phone: z.string().trim().optional(),
});

export const loginSchema = z.object({
  email: z.email(),
  password: passwordSchema,
});

export const verifyEmailSchema = z.object({
  email: z.email(),
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});
