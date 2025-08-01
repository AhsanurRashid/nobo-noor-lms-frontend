import { z } from 'zod';

export const registerSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }).max(100),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100),
  role: z.enum(['student', 'instructor', 'admin'], {
    message: "Role must be one of 'student', 'instructor', or 'admin'.",
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;