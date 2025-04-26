import { loginSchema, registerSchema } from "@/schema/schemas";

export type typeLoginSchema = z.infer<typeof loginSchema>;

export type typeRegisterSchema = z.infer<typeof registerSchema>;
