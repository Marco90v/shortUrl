import { changePasswordSchema, linkSchema, loginSchema, registerSchema } from "@/schema/schemas";

export type typeLoginSchema = z.infer<typeof loginSchema>;

export type typeRegisterSchema = z.infer<typeof registerSchema>;

export type typeSearchSchema = z.infer<typeof searchSchema>;

export type typeLinkSchema = z.infer<typeof linkSchema>;

export type typeChangePasswordSchema = z.infer<typeof changePasswordSchema>;
