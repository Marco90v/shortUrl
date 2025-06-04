import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(30),
})

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirm: z.string().min(8),
}).refine((data) => data.password === data.confirm, {
  message: "Passwords don't match",
  path: ["confirm"],
}).refine((data) => /[a-z]/.test(data.password), {
  message: "Password must contain at least one lowercase letter",
  path: ["password"],
}).refine((data) => /[A-Z]/.test(data.password), {
  message: "Password must contain at least one uppercase letter",
  path: ["password"],
}).refine((data) => /[0-9]/.test(data.password), {
  message: "Password must contain at least one number",
  path: ["password"],
}).refine((data) => /[!¡@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(data.password), {
  message: "Password must contain at least one special character",
  path: ["password"],
});

export const searchSchema = z.object({
  search: z.string(),
});

export const linkSchema = z.object({
  url: z.string().url(),
  alias: z.string().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(8).max(30),
  newPassword: z.string().min(8).max(30),
  confirmPassword: z.string().min(8).max(30),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});