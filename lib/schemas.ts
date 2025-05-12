import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .min(1, { message: "Email is required" })
    .email({ message: "Email is invalid" }),
  password: z
    .string({ message: "Password is required", required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type AuthInput = z.infer<typeof authSchema>;
