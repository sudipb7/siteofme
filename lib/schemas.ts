import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Email is invalid" }),
  password: z.string().min(6, { message: "Password should be at least 6 characters" }),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const signUpSchema = signInSchema.extend({
  username: z
    .string()
    .min(5, { message: "5 characters look better as username 🖐" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "You are already so special, why a special character? 😉",
    }),
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
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Email is invalid" }),
  image: z.string().optional(),
  password: z.string().optional(),
});

export type UserInput = z.infer<typeof userSchema>;
