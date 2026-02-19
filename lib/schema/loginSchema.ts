import z from "zod";

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
    message: "Enter a valid email address",
  })
  .transform((email) => email.trim().toLowerCase());

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password must be less than 64 characters")
  .regex(/[a-z]/, "Must contain a lowercase letter")
  .regex(/[A-Z]/, "Must contain an uppercase letter")
  .regex(/[0-9]/, "Must contain a number")
  .regex(/[^a-zA-Z0-9]/, "Must contain a special character")
  .refine((val) => !/\s/.test(val), {
    message: "Password must not contain spaces",
  });

export const loginSchema = z.object({
  password: passwordSchema,
  email: emailSchema,
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
