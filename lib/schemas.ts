import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .min(1, { message: "Email is required" })
    .email({ message: "Email is invalid" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password should be at least 6 characters" }),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const signUpSchema = signInSchema.extend({
  username: z
    .string({ required_error: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9]+$/, { message: "Username must contain only letters and numbers" }),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const setPasswordSchema = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string({ required_error: "Confirm password is required" }),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SetPasswordInput = z.infer<typeof setPasswordSchema>;

export const userSchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  email: z.string({ required_error: "Email is required" }).email({ message: "Email is invalid" }),
  image: z.string().optional(),
  password: z.string().optional(),
});

export type UserInput = z.infer<typeof userSchema>;
