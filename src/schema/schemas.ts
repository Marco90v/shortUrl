import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(30),
})

export const registerSchema = z.object({
  email: z.string().email(),
  Password: z.string().min(8).max(30),
  Confirm: z.string().min(8).max(30),
}).refine((data) => data.Password === data.Confirm, {
  message: "Passwords don't match",
  path: ["Confirm"],
});

export const linkSchema = z.object({
  url: z.string().url(),
  alias: z.string().optional(),
});