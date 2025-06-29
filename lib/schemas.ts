import { DEFAULT_SITE_CONFIG } from "@/app/(main)/lib/constants";
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

export const createSiteSchema = z.object({
  slug: z.string().min(1, { message: "Slug is required" }),
  userId: z.string().min(1, { message: "User ID is required" }),
});

export type CreateSiteInput = z.infer<typeof createSiteSchema>;

export const updateSiteSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  version: z.number().default(0),
  userId: z.string().min(1, { message: "User ID is required" }),
  color: z.string().min(1, { message: "Color is required" }).default(DEFAULT_SITE_CONFIG.color),
  backgroundColor: z
    .string()
    .min(1, { message: "Background color is required" })
    .default(DEFAULT_SITE_CONFIG.backgroundColor),
  textAlign: z.enum(["left", "center", "right"]).default("left"),
  fontFamily: z
    .string()
    .min(1, { message: "Font family is required" })
    .default(DEFAULT_SITE_CONFIG.fontFamily),
  fontSize: z.enum(["S", "M", "L"]).default(DEFAULT_SITE_CONFIG.fontSize),
  content: z.string().min(1, { message: "Content is required" }),
  socialIcons: z
    .array(
      z.object({
        id: z.string().min(1, { message: "ID is required" }),
        platform: z.string().min(1, { message: "Platform is required" }),
        url: z.string().min(1, { message: "URL is required" }),
      })
    )
    .default([]),
  socialIconsAlignment: z
    .enum(["left", "center", "right"])
    .default(DEFAULT_SITE_CONFIG.socialIconsAlignment),
  image: z.string().nullable(),
  imageAlignment: z.enum(["left", "center", "right"]).default(DEFAULT_SITE_CONFIG.imageAlignment),
  imageFrame: z
    .string()
    .min(1, { message: "Image frame is required" })
    .default(DEFAULT_SITE_CONFIG.imageFrame),
});

export type UpdateSiteInput = z.infer<typeof updateSiteSchema>;
